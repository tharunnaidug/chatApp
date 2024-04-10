import jwt from "jsonwebtoken";
import User from '../models/user.model.js'
import genarateJwtToken from '../utils/token.js';



export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ error: "username Doesnot Exists" })
        }
        const checkpassword=()=>{
            if(user?.password==password){
                return false
            }
            return true
        }
        if(checkpassword()){ return res.status(400).json({ error: "Inccorect Password" })}

        let token=await genarateJwtToken(user._id,res)

        

        res.status(200).json({
            _id: user._id,
            username: user.username,
            name:user.name,
            profilepic: user.profilepic,
            token:token
        })


    } catch (error) {
        console.log("ERROR Logging In ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}


export const logout = async (req, res) => {
    res.clearCookie("jwt").json({ msg: "loggedout" })
}


export const register = async (req, res) => {
    try {
        const { name, username, password, gender,email } = req.body;

        const user = await User.findOne({ username:name })

        if (user) {
            console.log(user)
            return res.status(400).json({ error: "username already Exists" })
        }

        const getNum = () => {
            return Math.round(Math.random() * 3)
        }
        const boy = `https://xsgames.co/randomusers/assets/avatars/male/${getNum()}.jpg`
        const girl = `https://xsgames.co/randomusers/assets/avatars/female/${getNum()}.jpg`

        const newUser = new User({
            name: name,
            username,
            password,
            gender,
            email,
            profilepic: gender == "true" ? boy : girl
        })
        genarateJwtToken(newUser._id, res)
        await newUser.save()

        res.status(200).json({
            _id: newUser._id,
            name:newUser.name,
            username: newUser.username,
            profilepic: newUser.profilepic
        })

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
        console.log("error singing up ", error)
    }
}

// const genarateJwtToken = (userId, res) => {
//     const token = jwt.sign({ userId }, process.env.JWT_Secret, {
//         expiresIn: '15d'
//     })
//     res.cookie("jwt", token, {
//         maxAge: 15 * 24 * 60 * 60 * 1000,
//         httpOnly: true,
//         sameSite: "strict"
//     })
//     return token;
// }
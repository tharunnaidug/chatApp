import user from "../models/user.model.js";

export const getUser=async (req,res)=>{
  try {
    const loggedinuser = req.user._id;

    const otherUsers=await user.find({_id:{$ne:loggedinuser}}).select("-password")

    res.status(200).json(otherUsers)

  } catch (error) {
    console.log("ERROR Fetching Users ", error)
        res.status(500).json({ error: "Internal Server Error" })
  }
}
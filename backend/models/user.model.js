import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    profilepic: {
        type: String
    }
},{timestamps:true})

const user = mongoose.model("User", userSchema)
export default user;
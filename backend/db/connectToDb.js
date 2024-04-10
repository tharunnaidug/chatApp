import mongoose from "mongoose";

export const connetDb=async ()=>{

    try {
      await  mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to DB")
    } catch (error) {
        console.log("There was Some Problem conneting to DB ",error )
    }
}
export default connetDb;

import path from 'path';
import express from 'express';
import { config } from 'dotenv';
//import connetDb from './db/connecttodb.js';
import authroutes from './routes/auth.routes.js';
import msgroutes from './routes/msg.routes.js';
import userroutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { app, server } from './socket/socket.js';
import mongoose from "mongoose";


const __dirname=path.resolve()
const corsOptions ={
    origin: ['http://localhost:5173','*'], 
   credentials:true,         
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
config()

const port = process.env.PORT || 3000

// app.get("/", (req, res) => {
//     res.send("Backend")
// })

app.use('/auth', authroutes);
app.use('/msg', msgroutes);
app.use('/user', userroutes);

app.use(express.static(path.join(__dirname,'/frontend/dist')));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

const connetDb=async ()=>{

    try {
      await  mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to DB")
    } catch (error) {
        console.log("There was Some Problem conneting to DB ",error )
    }
}

server.listen(port, () => { 
    await connetDb()
    console.log(`Listening on Port :${port}`)
})

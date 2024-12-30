import { Server } from "socket.io";
import http from 'http';
import  express from "express";

const app=express()

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"], 
        methods:["GET","POST"]
    }
})

export const getReceiverId=(receiverId)=>{
    return userSocketMap[receiverId];
}

const userSocketMap={}
const userIdToSocket=new Map();
const socketTouserId=new Map();

io.on("connection",(socket)=>{
    console.log("user connected ",socket.id)
    
    const userId=socket.handshake.query.userId;
    if(userId != "undefined"){ userSocketMap[userId]=socket.id;}

    console.log(userId)
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        console.log("User disconnected",socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
    
    //for Video calls
    socket.on("join-room",(data)=>{
        const{roomId,userId}=data;
        console.log("user ",userId," Joined room ",roomId);
        userIdToSocket.set(userId,socket.id);
        socketTouserId.set(socket.id,userId);
        socket.join(roomId);
        socket.emit("joined-room",{roomId});
        socket.broadcast.to(roomId).emit('user-joined',{userId});
    })
    socket.on('call-user',(data)=>{
        const{userId,offer}=data;
        const fromuserId=socketTouserId.get(socket.id)
        const socketId=userIdToSocket.get(userId);
        socket.to(socketId).emit('incoming-call',{from:fromuserId,offer});
    })
   
    socket.on('call-accepted',(data)=>{
        const{userId,ans}=data;
        const socketId=userIdToSocket.get(userId);
        socket.to(socketId).emit('call-accepted',{ans})
    })

    
})

export {app,io,server}
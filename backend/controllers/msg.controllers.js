import Conversation from "../models/conversation.model.js";
import Message from "../models/msg.model.js";
import { getReceiverId, io } from "../socket/socket.js";

export const sendmsg = async (req, res) => {
    try {
        const { message } = req.body;
        const RecevierId = req.params.id;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, RecevierId] }
        })
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, RecevierId]
            });
        }
        const newMessage = new Message({
            senderId: senderId,
            recevierId: RecevierId,
            message: message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()])

        //Socket Io here
       const receiverSocketId=getReceiverId(RecevierId)
       if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage)
       }

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("ERROR Sending Msg ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getmsg = async (req, res) => {
    try {
        const RecevierId = req.params.id;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, RecevierId] }
        }).populate("messages")

        if (!conversation) {
            return res.status(200).json([])
        }

        res.status(200).json(conversation.messages)

    } catch (error) {
        console.log("ERROR Fetching Msg ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}
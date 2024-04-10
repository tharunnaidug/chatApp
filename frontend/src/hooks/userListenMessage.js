import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import userConversation from '../zustand/userConverstion'
import notification from '../assets/sounds/notification.mp3'

const userListenMessage = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = userConversation()
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake=true;
            const sound =new Audio(notification)
            sound.play();
            setMessages([...messages, newMessage])
        })
        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages])

}

export default userListenMessage
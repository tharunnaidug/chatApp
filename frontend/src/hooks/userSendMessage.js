import React, { useState } from 'react'
import { toast } from 'react-toastify'
import userConversation from '../zustand/userConverstion'

const userSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages,selectedConversation, setSelectedConversation } = userConversation()

    const sendMessage = async (message) => {
        try {
            const res = await fetch(`/msg/send/${selectedConversation._id}`, {
                method: "POST",
                credentials: "include",
                headers: { 'Content-Type': "application/json", },
                body: JSON.stringify({ message })

              })
              const data=await res.json()
              if (data.error) { throw new Error(data.error) }

              setMessages([...messages,data]);

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {sendMessage,loading};
}

export default userSendMessage

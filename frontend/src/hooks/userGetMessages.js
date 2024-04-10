import { useEffect, useState } from "react"
import userConversation from "../zustand/userConverstion"
import { toast } from "react-toastify"

const userGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages,selectedConversation}=userConversation()

    useEffect(()=>{
        const getMessages=async()=>{
            setLoading(true)
        try {
            const res = await fetch(`/msg/${selectedConversation._id}`, {
                method: "GET",
                credentials: "include"
              })
              const data=await res.json()
              if (data.error) { throw new Error(data.error) }

              setMessages(data)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
        }
        if(selectedConversation?._id) getMessages()

    },[selectedConversation?._id,setMessages])
 return{loading,messages}
}

export default userGetMessages
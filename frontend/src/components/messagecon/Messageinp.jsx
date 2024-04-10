import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import userSendMessage from '../../hooks/userSendMessage';

const Messageinp = () => {
    const[message,setMessage]=useState()
    const{loading,sendMessage}=userSendMessage()

    const handelSubmit=async (e)=>{
        e.preventDefault()
      if(!message) return;
      await sendMessage(message)
      setMessage("")
     }
    return (
        <form className="px-4 my-3" onSubmit={handelSubmit}>
            <div className="w-full relative">
                <textarea className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white text-wrap' placeholder='Type a Message..' 
                value={message} onChange={(e)=>setMessage(e.target.value)} />
                <button type="submit" className='absolute inset-y-0 end-0 pe-3 flex items-center'>
                   {loading?<div className='loading loading-spinner'></div>:<IoSend />}
                </button>
            </div>
        </form>
    )
}

export default Messageinp;
import React from 'react'
import userConversation from '../../zustand/userConverstion'
import { useSocketContext } from '../../context/SocketContext';


const Conversation = ({ converstion, lastIdx }) => {
    const { selectedConversation, setSelectedConversation } = userConversation()
    const isSelected = selectedConversation?._id === converstion._id;
    const { onlineUsers } = useSocketContext()
    const isOnline=onlineUsers.includes(converstion._id)

    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded px-2 py-1  cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
                onClick={() => { setSelectedConversation(converstion) }}>
                <div className={`avatar ${isOnline ? "online" :""}`}>
                    <div className="w-12 rounded-full ">
                        <img src={converstion.profilepic} alt="User Avthar" />
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <p className='font-bold text-gray-200'>{converstion.name}</p>
                </div>
            </div>
            {!lastIdx && <div className='divider mx-0 px-0 h-1'></div>}
        </>
    )
}

export default Conversation
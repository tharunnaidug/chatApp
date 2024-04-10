import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import userConversation from '../../zustand/userConverstion'
import { extractTime } from '../../utils/extractTime'

const Message = ({message}) => {
  const{authUser}=useAuthContext()
  const { messages, setMessages,selectedConversation}=userConversation()
  const isFromMe=message.senderId=== authUser._id;
  const chatClassname= isFromMe? 'chat-end' :'chat-start';
  const chatProfilePic= isFromMe? authUser.profilepic :selectedConversation?.profilepic;
  const bgColor=isFromMe? 'bg-green-500' :"";
  const time= extractTime(message.createdAt);
const shake= message.shouldShake ?"shake" :"";

  return (
    <div className={`chat ${chatClassname}`}>
        <div className="avatar chat-image">
            <div className="w-10 rounded-full">
                <img src={chatProfilePic} alt="User" />
            </div>
        </div>
        <div className={`text-white chat-bubble bg-blue-500 text-wrap ${bgColor} ${shake} `}>{message.message}</div>
        <div className="flex chat-footer opacity-50 gap-1 ">{time}</div>
    </div>
  )
}

export default Message
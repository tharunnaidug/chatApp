import React, { useEffect } from 'react'
import Messages from './Messages'
import Messageinp from './Messageinp'
import userConversation from '../../zustand/userConverstion'
import { useAuthContext } from '../../context/AuthContext'

const Messagecon = () => {
  const { selectedConversation, setSelectedConversation } = userConversation()
  
  // useEffect(()=>{
  //   return()=>setSelectedConversation(null)
  // },[selectedConversation]);
  
  return (
    <div className='md:min-w-[450px] flex flex-col'>
      {!selectedConversation ? (
        <NoChatSel />
      ) : (
        <>
          <div className="px-4 py-2 mb-2 bg-zinc-200">
            <span className="label-text text-rose-500 text-lg">To: </span>
            <span className="font-bold text-green-700 text-xl">{selectedConversation.name}</span>
          </div>
          <Messages />
          <Messageinp />
        </>
      )}
    </div>
  )
}

export default Messagecon


const NoChatSel = () => {
  const { authUser } = useAuthContext()
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-300 flex flex-col gap-2">
        <p>Welcome <span className='text-green-300 capitalize'>{authUser.name}</span></p>
        <p>Start Messaging...</p>
      </div>
    </div>
  )
}


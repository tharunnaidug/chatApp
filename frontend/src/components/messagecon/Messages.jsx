import React, { useEffect, useRef } from 'react'
import Message from './Message'
import userGetMessages from '../../hooks/userGetMessages'
import userListenMessage from '../../hooks/userListenMessage'

const Messages = () => {
  const{loading,messages}=userGetMessages()
  userListenMessage();
  const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 10);
	}, [messages]);


  return (
    <div className='overflow-auto px-4 flex-1 '>
       {loading && (<div className="text-xl text-center">Fetching Messages</div>)}
       {!loading && messages.length===0 && (<div className="text-xl text-center">Start a Converstion..</div>)}

      {!loading && messages.length>0 && messages.map((message)=>(
        <div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
      ))}
    </div>
    
  )
}

export default Messages
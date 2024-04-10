import React from 'react'
import Conversation from './Conversation'
import userGetConverstion from '../../hooks/userGetConverstion'

const Conversations = () => {

  const{loading,converstions}=userGetConverstion()
  console.log(converstions)
  return (
    <div className='py-2 flex flex-col overflow-auto'>
       {converstions.map((converstion,idx)=>(
        <Conversation key={converstion._id} converstion={converstion} lastIdx={idx === converstions.length - 1} />
       ))}
    </div>
  )
}

export default Conversations
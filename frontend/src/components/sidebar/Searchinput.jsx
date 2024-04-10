import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import userConversation from '../../zustand/userConverstion';
import userGetConverstion from '../../hooks/userGetConverstion';
import { toast } from 'react-toastify';

const Searchinput = () => {
  const[search,setSearch]=useState("")
  const{setSelectedConversation}=userConversation()
 const{converstions} =userGetConverstion();

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!search) return;
    if(search.length<3){
      return toast.error("Search Must be aleast 3 characters Long")
    }
    const conversation = converstions.find((c) => c.name.toLowerCase().includes(search.toLowerCase()));

    if(conversation){
      setSelectedConversation(conversation)
      setSearch("")
    }else{
      toast.error("User Not Found")
    }

  }

  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <input type="text" name="" id="" className='input input-bordered rounded-full' placeholder='Search' onChange={(e)=>setSearch(e.target.value)} value={search} />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
         <IoMdSearch className='w-6 h-6 outline-none' />
        </button>
    </form>
  )
}

export default Searchinput
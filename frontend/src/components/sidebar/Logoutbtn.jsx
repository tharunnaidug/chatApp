import React from 'react'
import { SlLogout } from "react-icons/sl";
import userLogout from '../../hooks/userLogout';

const Logoutbtn = () => {
    const{loading,logout}=userLogout()
    return (
        <div className='mt-auto'>
            <SlLogout className='text-white w-6 h-6 cursor-pointer'onClick={logout} />
        </div>
    )
}

export default Logoutbtn
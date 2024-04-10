import React, { useState } from 'react'
import userLogin from '../../hooks/userLogin'

const Login = () => {

    const{loading,login}=userLogin()

    const[username,setUsername]=useState("")
    const[password,setPassword]=useState("")

    const handelSubmit=async (e)=>{
        e.preventDefault()
        await login(username,password)
     }

  return (
    <div className='flex felx-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop:blur-lg bg-opacity-0'>
            <h1 className="text-3xl font-semibold text-center text-gray-300 cursor-default">
               Login
            </h1>
            <form action="" onSubmit={handelSubmit}>
                <div>
                    <label htmlFor="username" className="label p-2">
                        <span className="label-text text-base">Username:</span>
                    </label>
                    <input type="text" name="username" id="username" className='w-full input input-bordered h-10' placeholder='Username'
                    value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="password" className="label p-2">
                        <span className="label-text text-base">Password:</span>
                    </label>
                    <input type="password" name="password" id="password" className='w-full input input-bordered h-10' placeholder='Password'
                    value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <a href="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">Don't Have account?</a>
                <div>
                    <button className="btn btn-block btn-sm mt-2 bg-green-600 hover:bg-green-400 text-black" disabled={loading}>Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
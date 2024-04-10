import React, { useState } from 'react'
import userSignup from '../../hooks/userSignup'

const SignUp = () => {
    const [inputs,setInputs]=useState({
        name:'',
        username:'',
        email:'',
        password:'',
        cpassword:'',
        gender:''
    })
   const{loading,signUp}= userSignup()

const handelSubmit=async (e)=>{
   e.preventDefault()
   await signUp(inputs)
   console.log(inputs)
}

    return (
        <div className='flex felx-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop:blur-lg bg-opacity-0'>
                <h1 className="text-3xl font-semibold text-center text-gray-300 cursor-default">
                    SignUp
                </h1>
                <form  onSubmit={handelSubmit}>
                <div>
                    <label htmlFor="name" className="label p-2">
                        <span className="label-text text-base">Name:</span>
                    </label>
                    <input type="text" name="name" id="name" className='w-full input input-bordered h-10' placeholder='Name'
                    value={inputs.name} onChange={(e)=>setInputs({...inputs,name:e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="email" className="label p-2">
                        <span className="label-text text-base">Email:</span>
                    </label>
                    <input type="email" name="email" id="email" className='w-full input input-bordered h-10' placeholder='Email'
                    value={inputs.email} onChange={(e)=>setInputs({...inputs,email:e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="username" className="label p-2">
                        <span className="label-text text-base">Username:</span>
                    </label>
                    <input type="text" name="username" id="username" className='w-full input input-bordered h-10' placeholder='Username'
                    value={inputs.username} onChange={(e)=>setInputs({...inputs,username:e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="password" className="label p-2">
                        <span className="label-text text-base">Password:</span>
                    </label>
                    <input type="password" name="password" id="password" className='w-full input input-bordered h-10' placeholder='Password'
                    value={inputs.password} onChange={(e)=>setInputs({...inputs,password:e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="Cpassword" className="label p-2">
                        <span className="label-text text-base">Confirm Password:</span>
                    </label>
                    <input type="text" name="Cpassword" id="Cpassword" className='w-full input input-bordered h-10' placeholder='Confirm Password'
                    value={inputs.cpassword} onChange={(e)=>setInputs({...inputs,cpassword:e.target.value})}/>
                </div>
                <div className='flex'>
                    <label htmlFor="male" className="label p-2">
                        <span className="label-text text-base">Male:</span>
                    </label>
                    <input type="radio" name="gender" id="male" className='' value="true" onChange={(e)=>setInputs({...inputs,gender:e.target.value})} />
                    <label htmlFor="female" className="label p-2">
                        <span className="label-text text-base">Female:</span>
                    </label>
                    <input type="radio" name="gender" id="female" className='' value="false" onChange={(e)=>setInputs({...inputs,gender:e.target.value})} />
                </div>
                <a href="/login" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">Already Have Account?</a>
                <div>
                    <button className="btn btn-block btn-sm mt-2 bg-green-600 text-black  hover:bg-green-400" type='submit'>Signup</button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
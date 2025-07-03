import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
      setEmail('');
      setPassword('');  
      console.log('Email:', email);
      console.log('Password:', password);
    }
  return (
    <div>
      <div className='bg-cover bg-center w-full h-screen flex flex-col justify-start items-center  p-4'>
        <img className="w-14" src="https://pngimg.com/d/uber_PNG24.png" alt="" />
        <div className='bg-white w-full flex flex-col bg-opacity-50 backdrop-blur-md p-4 rounded-lg text-center gap-4'>
          <h2 className='font-bold text-2xl'>Login <br /> Welcome back!</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" placeholder='email@example.com' className='p-3 border-2 border-black  rounded-lg' />
            <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" 
            placeholder='Password' className='p-3 rounded-lg border-2 border-black' />
            <p className='text-md '>Forgot Password? <a href="/reset-password" className='text-blue-500 text-md'>Reset</a></p>
            <button type='submit' className='bg-black text-white text-lg p-3 rounded-lg'>Login</button>
          </form>
          <p className='text-sm'>Don't have an account? <a href="/captain-signup" className='text-blue-500'>Sign Up</a></p>
          
          <div className='flex items-center justify-between gap-2'>
            <hr className='border-t border-gray-800 my-4 w-full' />
            <p className='text-lg'>or</p>
            <hr className='border-t border-gray-800 my-4 w-full' />
          </div>
          <button className='bg-blue-500 text-white text-lg p-3 rounded-lg'>Login with Google</button>
          <Link to="/user-login" className='bg-blue-800 text-white text-lg p-3 rounded-lg'>Sing in as user</Link>
          
          
        </div>
      </div>
    </div>
  )
}

export default CaptainLogin
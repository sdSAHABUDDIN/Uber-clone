import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='bg-[url(car.jpg)] bg-cover bg-center w-full h-screen flex flex-col justify-between items-center  p-4'>
        <img  className="w-20  "src="https://pngimg.com/d/uber_PNG24.png"alt="" />
        <div className='bg-white w-full flex flex-col bg-opacity-20 backdrop-blur-md p-4 rounded-lg text-center gap-4'>
          <h2 className='font-bold text-2xl '>Get Started with Uber</h2>
          <Link className='bg-black text-white text-lg p-3 rounded-lg '>Register</Link>
        </div>
      </div>
    </div>
      
  )
}

export default Home
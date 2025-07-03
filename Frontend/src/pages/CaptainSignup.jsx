import React from 'react'
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = (e) => {
      e.preventDefault();
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setPassword("");
      
    };
  return (
    <div>
      <div className="bg-cover bg-center w-full h-screen flex flex-col justify-start items-center  p-4">
              <img
                className="w-20"
                src="https://pngimg.com/d/uber_PNG24.png"
                alt=""
              />
              <div className="bg-white w-full flex flex-col bg-opacity-50 backdrop-blur-md p-4 rounded-lg text-center gap-4">
                <h2 className="font-bold text-2xl">Signup </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder="Enter Your First Name"
                    className="p-3 border-2 border-black  rounded-lg"
                  />
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder="Enter Your Last Name"
                    className="p-3 border-2 border-black  rounded-lg"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your Email"
                    className="p-3 border-2 border-black  rounded-lg"
                  />
                  <div className="relative w-full">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="w-full px-4 p-3 border-2 border-black rounded-lg"
                    />
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                  </div>
      
                  <button
                    type="submit"
                    className="bg-black text-white text-lg p-3 rounded-lg"
                  >
                    Login
                  </button>
                </form>
                <p className="text-md">
                 Already have an account?{" "}
                  <a href="/captain-login" className="text-blue-500">
                   Login
                  </a>
                </p>
      
                <div className="flex items-center justify-between gap-2">
                  <hr className="border-t border-gray-800 my-4 w-full" />
                  <p className="text-lg">or</p>
                  <hr className="border-t border-gray-800 my-4 w-full" />
                </div>
                <button className="border-2 border-black text-black text-lg p-3 rounded-lg">
                  Login with Google
                </button>
                
              </div>
            </div>
    </div>
  )
}

export default CaptainSignup
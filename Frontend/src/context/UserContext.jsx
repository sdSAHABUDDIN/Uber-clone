import React from 'react'
import { createContext } from 'react'

const UserDataContext = createContext()

const UserContext = ({children}) => {
  const userData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    setFirstName: () => {},
    setLastName: () => {},
    setEmail: () => {},
    setPassword: () => {}
  }
  return (
    <UserDataContext.Provider value={userData}>
      <UserContextProvider>
        {children}
      </UserContextProvider>
    </UserDataContext.Provider>
  )
}

export default UserContext
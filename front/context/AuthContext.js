import {createContext, useState, useEffect} from 'react'
import {useRouter} from 'next/router'

import {API_URL} from '@/config/index'

// Create our context
const AuthContext = createContext()

// Need a provider to wrap our application

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  // Register user

  const register = async (user) => {
    console.log('register - user', user)
  }

  // Login user

  const login = async ({email: identifier, password}) => {}

  // Logout User

  const logout = async () => {
    console.log('Logout')
  }

  // Check if user is logged in

  const checkUserLoggedIn = async () => {
    console.log('check')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

import { createContext, useState, useEffect } from 'react'

type AuthContextType = {
  isAuthenticated: boolean
  logIn: (token: string) => void
  logOut: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken') || null
    console.log('---')
    console.log(token)
    console.log("useEffect")
    if (token) {
      setIsAuthenticated(true)
    } else {
      localStorage.removeItem('authToken')
    }
  }, [])

  const logIn = (token: string) => {
    localStorage.setItem('authToken', token)
    setIsAuthenticated(true)
  }

  const logOut = () => {
    localStorage.removeItem('authToken')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}
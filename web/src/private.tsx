import React, { useContext } from 'react'
import { AuthContext } from './context/auth'
import { Navigate } from 'react-router-dom'

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

export default PrivateRoute

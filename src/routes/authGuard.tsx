import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

const AuthGuard: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default AuthGuard
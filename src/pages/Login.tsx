// src/pages/Login.tsx
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { login } from '../app/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.auth.error)
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    dispatch(login({ username, password }))
    navigate('/')
  }

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
    <h1 className="mb-5 fw-bold text-dark">Collaborative Document Editor</h1>
  
    <div className="card shadow p-4 w-100" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4 fw-semibold">Login</h2>
  
      {/* Username Field */}
      <div className="mb-3 input-group">
        <span className="input-group-text bg-white"><i className="bi bi-person-fill"></i></span>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
        />
      </div>
  
      {/* Password Field */}
      <div className="mb-3 input-group">
        <span className="input-group-text bg-white"><i className="bi bi-lock-fill"></i></span>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
  
      {/* Error Message */}
      {error && <div className="alert alert-danger text-center py-2">{error}</div>}
  
      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="btn btn-primary w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
      >
        <i className="bi bi-box-arrow-in-right"></i>
        Login
      </button>
    </div>
  </div>
  

  
  

  )
}

export default Login

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { users } from '../../../../src/constants/users'

interface AuthState {
  user: typeof users[number] | null
  isAuthenticated: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; password: string }>) => {
      const foundUser = users.find(
        u => u.username === action.payload.username && u.password === action.payload.password
      )
      if (foundUser) {
        state.user = foundUser
        state.isAuthenticated = true
        state.error = null
      } else {
        state.error = 'Invalid credentials'
      }
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
    }
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

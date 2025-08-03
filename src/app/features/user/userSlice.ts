import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Role = 'Editor' | 'Reviewer' | 'Viewer'

interface UserState {
  name: string
  role: Role
  isOffline: boolean
}

const initialState: UserState = {
  name: 'You',
  role: 'Editor',
  isOffline: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload
    },
    toggleOffline: (state) => {
      state.isOffline = !state.isOffline
    },
  },
})

export const { setRole, toggleOffline } = userSlice.actions
export default userSlice.reducer

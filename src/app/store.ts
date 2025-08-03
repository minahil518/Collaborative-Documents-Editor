import { configureStore } from '@reduxjs/toolkit'
import documentReducer from './features/document/documentSlice'
import userReducer from './features/user/userSlice'
import commentReducer from './features/comment/commentSlice'
import authReducer from './features/auth/authSlice' 

export const store = configureStore({
  reducer: {
    document: documentReducer,
    user: userReducer,
    comments: commentReducer,
    auth: authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

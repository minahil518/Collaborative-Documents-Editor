import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface Document {
  id: string
  title: string
  content: string
}

interface DocumentState {
  documents: Document[]
  activeDocumentId: string | null
  content: string
  error: string | null
}

const initialState: DocumentState = {
  documents: [],
  activeDocumentId: null,
  content: '',
  error: null,
}

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload
    },
    setActiveDocument: (state, action: PayloadAction<string>) => {
      const doc = state.documents.find(d => d.id === action.payload)
      if (doc) {
        state.activeDocumentId = doc.id
        state.content = doc.content
      }
    }
  },
})

export const {
  setContent,
  setActiveDocument,
} = documentSlice.actions

export default documentSlice.reducer

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface Document {
  id: string
  title: string
  content: string
}

interface DocumentState {
  selectedDocument: any
  documents: Document[]
  activeDocumentId: string | null
  content: string
  offlineQueue: string[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: DocumentState = {
  documents: [],
  activeDocumentId: null,
  content: '',
  offlineQueue: [],
  status: 'idle',
  error: null,
  selectedDocument: undefined
}

export const fetchDocuments = createAsyncThunk('documents/fetchAll', async () => {

  const res = await fetch('https://api.liveblocks.io/v2/rooms', {
    headers: {
      'Authorization': `Bearer ${'sk_dev_DwpoDSvFpWGnrRfTeCFMtRC-n6HPfFjM-2KXDSVSDXzyOJQ9lkg4g8BR8WY1dB6P'}`,
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  debugger;
  return data.data;
})

export const createDocument = createAsyncThunk('documents/create', async () => {
  const res = await fetch('/api/documents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Untitled Document', content: '' })
  })

  if (!res.ok) {
    throw new Error('Failed to create document')
  }

  return await res.json()
})

// Save (create or update) a document
export const saveDocument = createAsyncThunk(
  'documents/save',
  async ({ id, title, content }: { id?: string, title: string, content: string }) => {
    const method = id ? 'PUT' : 'POST'
    const url = id ? `/api/documents/${id}` : `/api/documents`
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
    return await res.json()
  }
)

// Load one document into editor
export const loadDocument = createAsyncThunk('documents/load', async (id: string) => {
  const res = await fetch(`/api/documents/${id}`)
  return await res.json()
})

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload
    },
    queueEdit: (state, action: PayloadAction<string>) => {
      state.offlineQueue.push(action.payload)
    },
    applyQueue: (state) => {
      state.content += '\n' + state.offlineQueue.join('\n')
      state.offlineQueue = []
    },
    setActiveDocument: (state, action: PayloadAction<string>) => {
      const doc = state.documents.find(d => d.id === action.payload)
      if (doc) {
        state.activeDocumentId = doc.id
        state.content = doc.content
      }
    },
    setTitle: (state, action: PayloadAction<string>) => {
      const doc = state.documents.find(d => d.id === state.activeDocumentId)
      if (doc) {
        doc.title = action.payload
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.documents = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch documents.'
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        const newDoc = action.payload
        state.documents.push(newDoc)
        state.activeDocumentId = newDoc.id
        state.content = newDoc.content
        state.status = 'succeeded'
      })
      .addCase(saveDocument.fulfilled, (state, action) => {
        const index = state.documents.findIndex(d => d.id === action.payload.id)
        if (index !== -1) {
          state.documents[index] = action.payload
        } else {
          state.documents.push(action.payload)
        }
        state.activeDocumentId = action.payload.id
        state.content = action.payload.content
      })
      .addCase(loadDocument.fulfilled, (state, action) => {
        state.activeDocumentId = action.payload.id
        state.content = action.payload.content
      })
  }
})

export const {
  setContent,
  queueEdit,
  applyQueue,
  setActiveDocument,
  setTitle
} = documentSlice.actions

export default documentSlice.reducer

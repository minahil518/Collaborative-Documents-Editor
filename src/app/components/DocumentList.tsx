// src/components/DocumentList.tsx
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  fetchDocuments,
  loadDocument,
  setActiveDocument
} from '../features/document/documentSlice'

const DocumentList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { documents, activeDocumentId } = useAppSelector(state => state.document)

  useEffect(() => {
    dispatch(fetchDocuments())
  }, [dispatch])

  return (
    <div className="bg-white p-2 rounded shadow mb-4 w-full">
      <h2 className="text-lg font-bold mb-2">Your Documents</h2>
      <ul className="space-y-1">
        {documents.map(doc => (
          <li key={doc.id}>
            <button
              onClick={() => {
                dispatch(loadDocument(doc.id))
                dispatch(setActiveDocument(doc.id))
              }}
              className={`w-full text-left px-2 py-1 rounded ${
                doc.id === activeDocumentId ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100'
              }`}
            >
              {doc.title || 'Untitled'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DocumentList

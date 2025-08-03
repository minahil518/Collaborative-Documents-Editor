
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import DocumentEditor from './pages/DocumentEditor'
import Login from './pages/Login'
import AuthGuard from './routes/authGuard'
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import "./app/global.css";

const App: React.FC = () => {
  return (
    <DocumentEditor />
  )
}

export default App

// import React, { useEffect, useState } from 'react'
// import Editor from './app/components/Editor'
// import RoleSelector from './app/components/RoleSelector'
// import Comments from './app/components/Comments'
// import PresenceAvatars from './app/components/PresenceAvatars'
// import OfflineBanner from './app/components/OfflineBanner'
// import { useAppDispatch, useAppSelector } from './app/hooks'
// import { applyQueue, createDocument, saveDocument } from './app/features/document/documentSlice'
// import DocumentList from './app/components/DocumentList'

// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import Home from '../src/pages/Home'
// import DocumentEditor from '../src/pages/DocumentEditor'
// import { login } from './app/features/auth/authSlice'


// const App: React.FC = () => {
//   return (
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/documents/:id" element={<DocumentEditor />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </Router>
//   )
// }


// // const App: React.FC = () => {
// //   const dispatch = useAppDispatch()
// //   const isOffline = useAppSelector(state => state.user.isOffline)
// //   const role = useAppSelector(state => state.user.role)

// //   const [isCreating, setIsCreating] = useState(false)
// //   const { activeDocumentId, content, documents } = useAppSelector(state => state.document)

// //   // Sync offline changes when going back online
// //   useEffect(() => {
// //     if (!isOffline) {
// //       dispatch(applyQueue())
// //     }
// //   }, [isOffline, dispatch])


// //   const handleSave = () => {
// //     const activeDoc = documents.find(doc => doc.id === activeDocumentId)

// //     debugger;

// //     if (!activeDoc) return
    
// //     dispatch(saveDocument({
// //       id: activeDoc.id,
// //       title: activeDoc.title,
// //       content
// //     }))

// //     setIsCreating(false)
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-4 font-sans">
// //       <OfflineBanner />

// //       <div className="flex justify-between items-center mb-4">
// //       <h1 className="text-2xl font-bold text-center">Collaborative Document Editor</h1>
// //       <div className="space-x-2">
// //       <button
// //           className="btn btn-primary px-4 py-2 fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
// //           onClick={() => {
// //             dispatch(createDocument())
// //             setIsCreating(true)
// //           }}
// //         >
// //           <span className="fs-5">+</span>
// //           Create Document
// //         </button>
// //           {/* <RoleSelector /> */}
// //         </div>
// //       </div>

// //       <div className="flex gap-4">
// //         <div className="">
// //         {(isCreating || activeDocumentId) ? (
// //           <>
// //             <div className="d-flex justify-content-center">
// //               <h2 className="text-xl font-semibold mb-2">
// //                 {isCreating ? 'New Document' : 'Edit Document'}
// //               </h2>
// //             </div>
// //             <Editor />
// //           </>
// //         ) : role === 'Viewer' ? (
// //           <div className="text-gray-500">You are in read-only mode.</div>
// //         ) : (
// //           <div className="text-gray-500">Select or create a document to edit.</div>
// //         )}

// //         </div>
// //       </div>
// //       <div className="w-1/4 space-y-4">
// //           <DocumentList />
// //           <Comments />
// //         </div>
// //       {/* <PresenceAvatars /> */}
// //     </div>
    
// //   )
// // }

// export default App

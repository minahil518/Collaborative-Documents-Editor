
import React from 'react'
import DocumentEditor from './pages/DocumentEditor'
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import "./app/global.css";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <DocumentEditor />
    </React.StrictMode>
  )
}
export default App

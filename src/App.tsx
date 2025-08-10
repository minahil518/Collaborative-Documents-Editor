
import React from 'react'
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import "./app/assets/styles/global.css";
import DocumentEditor from "./pages/DocumentEditor"

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <DocumentEditor />
    </React.StrictMode>
  )
}
export default App


import React from 'react'
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DocumentEditor from "./app/pages/DocumentEditor";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <DocumentEditor />
    </React.StrictMode>
  )
}
export default App

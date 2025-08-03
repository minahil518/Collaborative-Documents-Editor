import React from 'react'
import { Editor } from '@tiptap/react'

interface ToolbarProps {
  editor: Editor | null;
  userRole: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {

  
  if (!editor) return null

  return (
    <div className="btn-toolbar mb-3" role="toolbar">
      <div className="btn-group me-2" role="group">
        <button
          className={`btn btn-sm btn-outline-secondary ${editor.isActive('bold') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </button>

        <button
          className={`btn btn-sm btn-outline-secondary ${editor.isActive('italic') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <em>I</em>
        </button>
        <button
          className={`btn btn-sm btn-outline-secondary ${editor.isActive('heading', { level: 1 }) ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          H1
        </button>

        <button
          className={`btn btn-sm btn-outline-secondary ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </button>

        <button
          className={`btn btn-sm btn-outline-secondary ${editor.isActive('bulletList') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </button>

        <button
          className={`btn btn-sm btn-outline-secondary ${editor.isActive('orderedList') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>
      </div>
    </div>
  )
}

export default Toolbar

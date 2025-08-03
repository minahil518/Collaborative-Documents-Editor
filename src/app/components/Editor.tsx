import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setContent } from '../features/document/documentSlice'
import Toolbar from './ToolBar'
import { useLiveblocksExtension, FloatingToolbar } from "@liveblocks/react-tiptap"
import { Threads } from './Threads'
interface EditorProps {
  userRole: string;
}


const Editor: React.FC<EditorProps> = ({ userRole }) => {
  const dispatch = useAppDispatch()
  const { content } = useAppSelector(state => state.document)
  const liveblocks = useLiveblocksExtension()

  const editor = useEditor({
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose min-h-[300px] p-2 outline-none',
      },
    },
  })

  useEffect(() => {
    if (editor) {
      dispatch(setContent(editor.getHTML()))
    }
  }, [editor, dispatch])

  return (
    <div className="container my-4">
      <div className="mb-2 text-end text-muted">
        <strong>Role:</strong> {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
      </div>

      {userRole === 'editor' && (
        <Toolbar editor={editor} userRole={userRole} />
      )}

      <div className="bg-white shadow p-4 rounded border" style={{ minHeight: '1000px' }}>
        <EditorContent editor={editor} />
        {['editor', 'reviewer'].includes(userRole) && (
          <Threads editor={editor} />
        )}

        {userRole === 'editor' && (
          <FloatingToolbar editor={editor} />

        )}
      </div>
    </div>
  )
}
export default Editor

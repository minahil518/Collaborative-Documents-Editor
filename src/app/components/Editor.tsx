import React, { useEffect, useState } from 'react'
import StarterKit from '@tiptap/starter-kit'
import { useLiveblocksExtension, FloatingToolbar, Toolbar } from "@liveblocks/react-tiptap"
import { useEditor, EditorContent } from '@tiptap/react'
import { useRoom, useStatus } from "@liveblocks/react";
import { useAppDispatch, useAppSelector } from '../hooks'
import { setContent } from '../features/document/documentSlice'
import { COLORS } from '../constants/cursorColors'
import Toolbars from './ToolBar'
import Threads  from './Threads'
import useLiveCursors from './LiveCursor'
import Cursor from './Cursor'
import EditGuard from './EditGuard'
import OfflineToggle from './OfflineToggle'

interface EditorProps {
  userRole: string;
}

const Editor: React.FC<EditorProps> = ({ userRole }) => {
  const room = useRoom();
  const liveblocks = useLiveblocksExtension();
  const cursors = useLiveCursors();
  const dispatch = useAppDispatch();
  const { content } = useAppSelector(state => state.document);
  const connectionStatus = useStatus();
  const [manualOffline, setManualOffline] = useState(false);
  const isConnected = connectionStatus === "connected";
  const isOffline = manualOffline || !isConnected;
  const canEdit = userRole === "editor" || userRole === "reviewer";

  const goOffline = () => { setManualOffline(true); room.disconnect(); };
  const goOnline = () => { setManualOffline(false); room.connect(); };
  
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
        class: `prose min-h-[300px] p-2 outline-none ${userRole === 'viewer' ? 'cursor-not-allowed select-none' : ''
          }`,
        style: userRole === 'viewer' ? 'caret-color: transparent;' : '',
      },
    },
    editable: canEdit,
  })

  useEffect(() => {
    if (editor) {
      dispatch(setContent(editor.getHTML()))
    }
  }, [editor, dispatch])

  useEffect(() => {
    editor?.setEditable(canEdit)
  }, [editor, canEdit])


  return (
    <>
<div className="d-flex align-items-center gap-2 w-100">
  <OfflineToggle
    isOffline={isOffline}
    onToggle={(next) => (next ? goOffline() : goOnline())}
  />

  {isOffline && (
    <div
      className="alert alert-warning mb-0 flex-grow-1 py-1 px-2"
      role="alert"
    >
      Changes made to the document will be shown to other users only when you are online.
    </div>
  )}
</div>
      <div className="container my-4 editor-page">
        <div className="mb-2 text-end text-muted">
          <strong>Role:</strong> {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
        </div>
        {userRole === 'editor' && (
          <Toolbars editor={editor} userRole={userRole} />
        )}
        <div className="bg-white shadow p-4 rounded border" style={{ minHeight: '1000px' }}>
          <EditGuard locked={userRole === 'reviewer'}>
            <EditorContent editor={editor} />
          </EditGuard>
          {['editor', 'reviewer'].includes(userRole) && (
            <Threads editor={editor} />
          )}
          {userRole === 'editor' && (
            <FloatingToolbar editor={editor} />
          )}
          {userRole === 'reviewer' && (
            <FloatingToolbar editor={editor}>
              <Toolbar.SectionCollaboration />
            </FloatingToolbar>
          )}
        </div>
      </div>
      {cursors.map(({ x, y, connectionId }) => (
        <Cursor
          key={connectionId}
          color={COLORS[connectionId % COLORS.length]}
          x={x}
          y={y}
        />
      ))}
    </>
  )
}
export default Editor

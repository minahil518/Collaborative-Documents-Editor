import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { setActiveDocument } from '../app/features/document/documentSlice'
import Editor from '../app/components/Editor'
import RoleSelector from '../app/components/RoleSelector'
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
  useMyPresence,
} from '@liveblocks/react/suspense'
import { faker } from '@faker-js/faker'


const DocumentEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()

  const { documents } = useSelector((state: RootState) => state.document)
  const doc = documents.find(d => d.id === id)

  useEffect(() => {
    if (doc && id) {
      dispatch(setActiveDocument(id))
    }
  }, [id, dispatch, doc])

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container-fluid">
        <div className="d-flex justify-content-center mb-4">
          <div className="w-100 text-center" style={{ maxWidth: '600px' }}>
            <h2 className="fw-bold text-secondary cursor-pointer">
              Collaborative Document Editor
            </h2>
          </div>
        </div>
        <LiveblocksProvider
          publicApiKey={process.env.REACT_APP_LIVEBLOCKS_PUBLIC_KEY || ''}
          resolveUsers={async ({ userIds }) => {
            return userIds.map((userId) => ({
              id: userId,
              name: faker.person.firstName(),
              color: faker.color.rgb(),
              avatar: faker.image.avatar(),
            }))
          }}
        >
          <RoomProvider id={id || 'new-room'} initialPresence={{
            cursor: null,
          }}>
            <div className="d-flex justify-content-end pe-4 mb-3">
              <RoleSelector />
            </div>
            <div className="d-flex justify-content-center gap-4 px-3">
              <div
                className="bg-white p-4 rounded shadow-sm w-100"
                style={{ maxWidth: '900px', minHeight: '1000px' }}
              >
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                  <EditorWithRoleBasedAccess />
                </ClientSideSuspense>
              </div>
            </div>
          </RoomProvider>
        </LiveblocksProvider>
      </div>
    </div>
  )
}

const EditorWithRoleBasedAccess = () => {
  const [myPresence] = useMyPresence();
  const presence = myPresence || {};
  const role = (presence as { role?: string }).role || 'editor';
  return <Editor userRole={role} />;
};

export default DocumentEditor

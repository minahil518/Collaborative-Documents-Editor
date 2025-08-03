import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

import { WebrtcProvider } from 'y-webrtc'

const ydoc = new Y.Doc();

// Use a shared room name for collaboration
const roomId = 'tiptap-dev-room';
const provider = new WebrtcProvider('quill-demo-room', ydoc);

export { ydoc, provider };
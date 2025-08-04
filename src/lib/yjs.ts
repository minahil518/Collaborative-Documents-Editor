import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc'

const ydoc = new Y.Doc();

const roomId = 'tiptap-dev-room';
const provider = new WebrtcProvider('quill-demo-room', ydoc);

export { ydoc, provider };
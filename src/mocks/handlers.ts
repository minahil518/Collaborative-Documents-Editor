import { http } from 'msw'
import { v4 as uuidv4 } from 'uuid'
import { mockDocuments } from '../constants/documents'

// Reset to mock data on each server start or page reload
const getFreshDocuments = () => [...mockDocuments]

let documents = getFreshDocuments()

export const handlers = [
  http.post('/api/sync', () => {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }),

  http.get('/api/presence', () => {
    return new Response(
      JSON.stringify([
        { name: 'Alice', color: 'red' },
        { name: 'Bob', color: 'blue' },
        { name: 'Clara', color: 'green' }
      ]),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }),

  http.get('/api/documents', () => {
    // Reset documents each time this endpoint is called
    documents = getFreshDocuments()
    return new Response(JSON.stringify(documents), {
      headers: { 'Content-Type': 'application/json' }
    })
  }),

  http.post('/api/documents', async ({ request }) => {
    const { title, content } = await request.json() as { title: string; content: string }
    const newDoc = { id: uuidv4(), title, content }
    documents.push(newDoc)
    return new Response(JSON.stringify(newDoc), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })
  }),

  http.put('/api/documents/:id', async ({ params, request }) => {
    const id = params.id as string
    const { title, content } = await request.json() as { title: string; content: string }

    const index = documents.findIndex(doc => doc.id.toString() === id)

    if (index === -1) {
      const newDoc = { id, title, content }
      documents.push(newDoc)
      return new Response(JSON.stringify(newDoc), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    documents[index] = { ...documents[index], title, content }
    return new Response(JSON.stringify(documents[index]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }),

  http.get('/api/documents/:id', ({ params }) => {
    const id = params.id as string
    const doc = documents.find(d => d.id.toString() === id)
    if (!doc) {
      return new Response('Not found', { status: 404 })
    }
    return new Response(JSON.stringify(doc), {
      headers: { 'Content-Type': 'application/json' }
    })
  })
]

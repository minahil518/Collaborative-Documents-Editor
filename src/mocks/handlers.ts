import { http } from 'msw'

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
  })
]

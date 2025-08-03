import React, { useEffect, useState } from 'react'

const mockUsers = [
  { name: 'Alice', color: 'red' },
  { name: 'Bob', color: 'blue' },
  { name: 'Clara', color: 'green' },
]

const PresenceAvatars: React.FC = () => {
  const [users, setUsers] = useState(mockUsers)

  useEffect(() => {
    const interval = setInterval(() => {
      setUsers([...mockUsers]) // simulate activity
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex mt-4 space-x-4">
      {users.map(user => (
        <div key={user.name} className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: user.color }}></div>
          <span className="text-sm">{user.name}</span>
        </div>
      ))}
    </div>
  )
}

export default PresenceAvatars

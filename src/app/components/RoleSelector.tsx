import React, { useState } from 'react'
import { useUpdateMyPresence } from '@liveblocks/react'

const RoleSelector: React.FC<{ onChange?: (role: string) => void }> = ({ onChange }) => {
  const [role, setRole] = useState('editor')
  const updateMyPresence = useUpdateMyPresence()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value
    setRole(selectedRole)
    updateMyPresence({ role: selectedRole })
    onChange?.(selectedRole)
  }

  return (
    <div className="d-flex justify-content-end pe-4 mb-3">
      <div className="bg-white p-3 rounded shadow-sm" style={{ minWidth: '280px' }}>
        <label htmlFor="role-select" className="form-label fw-semibold mb-2 text-secondary">
          Select Your Role
        </label>
        <select
          id="role-select"
          className="form-select"
          value={role}
          onChange={handleChange}
        >
          <option value="editor">Editor</option>
          <option value="reviewer">Reviewer</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>
    </div>
  )
}

export default RoleSelector

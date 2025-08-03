import React from 'react'
import { useAppSelector } from '../hooks'

const OfflineBanner: React.FC = () => {
  const isOffline = useAppSelector(state => state.user.isOffline)

  if (!isOffline) return null

  return (
    <div className="bg-yellow-200 text-yellow-900 p-2 text-center font-semibold">
      You are in Offline Mode. Changes will sync when reconnected.
    </div>
  )
}

export default OfflineBanner

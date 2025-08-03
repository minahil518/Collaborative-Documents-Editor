import { useEffect } from 'react';
import { useMyPresence } from '@liveblocks/react';

const SimulatedUserActivity = () => {
  const [, updateMyPresence] = useMyPresence();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const interval = setInterval(() => {
      const x = Math.floor(Math.random() * window.innerWidth);
      const y = Math.floor(Math.random() * window.innerHeight);
      const isTyping = Math.random() < 0.5;

      updateMyPresence({
        cursor: { x, y },
        isTyping,
        role: 'editor',
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [updateMyPresence]);

  return null;
};

export default SimulatedUserActivity;

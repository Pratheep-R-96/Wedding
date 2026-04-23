import { useState, useEffect } from 'react'

function calcDiff(target) {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isOver: diff === 0,
  }
}

export default function useCountdown(targetDate) {
  const [time, setTime] = useState(() => calcDiff(targetDate))

  useEffect(() => {
    const id = setInterval(() => {
      const next = calcDiff(targetDate)
      setTime(next)
      if (next.isOver) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return time
}

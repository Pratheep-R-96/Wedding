import { useRef, useState, useEffect, useCallback } from 'react'

const PREF_KEY = 'music-pref'
const FADE_MS = 600
const FADE_IN_MS = 800
const TARGET_VOL = 0.4

export default function useBackgroundMusic(src) {
  const audioRef = useRef(null)
  const fadeRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0
    audio.preload = 'none'  // defer network request until user explicitly plays
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
      cancelAnimationFrame(fadeRef.current)
    }
  }, [src])

  const fadeTo = useCallback((targetVol, onDone) => {
    cancelAnimationFrame(fadeRef.current)
    const audio = audioRef.current
    if (!audio) return

    const startVol = audio.volume
    const startTime = performance.now()

    function step(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / FADE_MS, 1)
      audio.volume = startVol + (targetVol - startVol) * progress
      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(step)
      } else if (onDone) {
        onDone()
      }
    }

    fadeRef.current = requestAnimationFrame(step)
  }, [])

  const fadeToMs = useCallback((targetVol, durationMs, onDone) => {
    cancelAnimationFrame(fadeRef.current)
    const audio = audioRef.current
    if (!audio) return

    const startVol = audio.volume
    const startTime = performance.now()

    function step(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / durationMs, 1)
      audio.volume = startVol + (targetVol - startVol) * progress
      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(step)
      } else if (onDone) {
        onDone()
      }
    }

    fadeRef.current = requestAnimationFrame(step)
  }, [])

  const fadeIn = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.play().then(() => {
      audio.volume = 0
      fadeToMs(TARGET_VOL, FADE_IN_MS)
      setIsPlaying(true)
      localStorage.setItem(PREF_KEY, 'on')
    }).catch(() => {})
  }, [fadeToMs])

  const fadeOut = useCallback(() => {
    fadeTo(0, () => {
      audioRef.current?.pause()
      setIsPlaying(false)
      localStorage.setItem(PREF_KEY, 'off')
    })
  }, [fadeTo])

  const toggle = useCallback(() => {
    if (isPlaying) {
      fadeOut()
    } else {
      fadeIn()
    }
  }, [isPlaying, fadeIn, fadeOut])

  return { isPlaying, toggle, fadeIn, fadeOut }
}

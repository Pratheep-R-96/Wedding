import { useRef, useState, useEffect, useCallback } from 'react'

const PREF_KEY = 'music-pref'
const FADE_MS = 600
const FADE_IN_MS = 800
const TARGET_VOL = 0.4

const audioCache = new Map()

function getOrCreateAudio(src) {
  const cached = audioCache.get(src)
  if (cached?.audio) {
    cached.refs += 1
    return cached.audio
  }

  const audio = new Audio(src)
  audio.loop = true
  audio.volume = 0
  audio.preload = 'none' // defer network request until user explicitly plays

  audioCache.set(src, { audio, refs: 1 })
  return audio
}

function releaseAudio(src) {
  const cached = audioCache.get(src)
  if (!cached) return

  cached.refs -= 1
  if (cached.refs <= 0) {
    cached.audio.pause()
    cached.audio.src = ''
    audioCache.delete(src)
  }
}

export default function useBackgroundMusic(src) {
  const audioRef = useRef(null)
  const fadeRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = getOrCreateAudio(src)
    audioRef.current = audio

    const sync = () => setIsPlaying(!audio.paused)
    sync()
    audio.addEventListener('play', sync)
    audio.addEventListener('pause', sync)

    return () => {
      cancelAnimationFrame(fadeRef.current)
      audio.removeEventListener('play', sync)
      audio.removeEventListener('pause', sync)
      releaseAudio(src)
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
      localStorage.setItem(PREF_KEY, 'on')
    }).catch(() => {})
  }, [fadeToMs])

  const fadeOut = useCallback(() => {
    fadeTo(0, () => {
      audioRef.current?.pause()
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

  const getCurrentTime = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return 0
    return audio.currentTime || 0
  }, [])

  return { isPlaying, toggle, fadeIn, fadeOut, getCurrentTime }
}

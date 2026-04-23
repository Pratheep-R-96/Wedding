import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false)

  return (
    <button
      onClick={() => setPlaying(!playing)}
      aria-label="Toggle music"
      className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory/80 shadow-soft backdrop-blur-sm border border-gold/20 text-gold transition-all hover:shadow-glow hover:scale-105"
    >
      {playing ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </button>
  )
}

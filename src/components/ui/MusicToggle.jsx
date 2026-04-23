import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false)

  return (
    <button onClick={() => setPlaying(!playing)} aria-label="Toggle music">
      {playing ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </button>
  )
}

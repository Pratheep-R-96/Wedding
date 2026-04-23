import { useEffect, useState } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import MusicToggle from '../ui/MusicToggle'
import ReadingProgress from '../ui/ReadingProgress'
import FloatingDecor from '../ui/FloatingDecor'
import IntroOverlay from './IntroOverlay'
import useBackgroundMusic from '../../hooks/useBackgroundMusic'

export default function PageShell({ children }) {
  const [entered, setEntered] = useState(() => {
    try {
      return sessionStorage.getItem('entered') === 'true'
    } catch {
      return false
    }
  })

  const [heroStart, setHeroStart] = useState(false)
  const { fadeIn } = useBackgroundMusic('/audio/background.mp3')

  useEffect(() => {
    if (entered) setHeroStart(true)
  }, [entered])

  function handleEnter() {
    fadeIn()
    setEntered(true)
    setHeroStart(false)
    setTimeout(() => setHeroStart(true), 1000)
  }

  return (
    <>
      {!entered && <IntroOverlay onEnter={handleEnter} />}
      <ReadingProgress />
      <Nav />
      <main>{typeof children === 'function' ? children({ heroStart }) : children}</main>
      <Footer />

      <FloatingDecor />

      <div className="fixed bottom-6 right-6 z-50">
        <MusicToggle />
      </div>
    </>
  )
}

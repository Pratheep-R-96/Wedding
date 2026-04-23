import Nav from './Nav'
import Footer from './Footer'
import MusicToggle from '../ui/MusicToggle'
import ReadingProgress from '../ui/ReadingProgress'
import FloatingDecor from '../ui/FloatingDecor'

export default function PageShell({ children }) {
  return (
    <>
      <ReadingProgress />
      <Nav />
      <main>{children}</main>
      <Footer />

      <FloatingDecor />

      <div className="fixed bottom-6 right-6 z-50">
        <MusicToggle />
      </div>
    </>
  )
}

import Nav from './Nav'
import Footer from './Footer'
import MusicToggle from '../ui/MusicToggle'

export default function PageShell({ children }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />

      <div className="fixed bottom-6 right-6 z-50">
        <MusicToggle />
      </div>
    </>
  )
}

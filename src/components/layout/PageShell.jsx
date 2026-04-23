import Nav from './Nav'
import Footer from './Footer'

export default function PageShell({ children }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}

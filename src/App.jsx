import PageShell from './components/layout/PageShell'
import Hero from './components/sections/Hero'
import { NAV_LINKS } from './lib/constants'

export default function App() {
  return (
    <PageShell>
      <Hero />

      {NAV_LINKS.map((link) => (
        <section
          key={link.id}
          id={link.id}
          className="flex min-h-screen items-center justify-center"
        >
          <h2 className="heading-serif text-3xl text-muted/40">{link.label}</h2>
        </section>
      ))}
    </PageShell>
  )
}

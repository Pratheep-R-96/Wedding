import PageShell from './components/layout/PageShell'
import { NAV_LINKS } from './lib/constants'

const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  ...NAV_LINKS,
]

export default function App() {
  return (
    <PageShell>
      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="flex min-h-screen items-center justify-center"
        >
          <h2 className="heading-serif text-3xl text-muted/40">{section.label}</h2>
        </section>
      ))}
    </PageShell>
  )
}

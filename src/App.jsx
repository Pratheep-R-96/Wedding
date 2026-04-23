import PageShell from './components/layout/PageShell'
import Hero from './components/sections/Hero'
import OurStory from './components/sections/OurStory'
import Events from './components/sections/Events'
import Countdown from './components/sections/Countdown'
import Gallery from './components/sections/Gallery'
import VenueMap from './components/sections/Map'
import { NAV_LINKS } from './lib/constants'

const BUILT = ['hero', 'story', 'events', 'countdown', 'gallery', 'map']

export default function App() {
  return (
    <PageShell>
      <Hero />
      <OurStory />
      <Events />
      <Countdown />
      <Gallery />
      <VenueMap />

      {NAV_LINKS.filter((l) => !BUILT.includes(l.id)).map((link) => (
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

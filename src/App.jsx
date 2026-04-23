import PageShell from './components/layout/PageShell'
import LoadOverlay from './components/ui/LoadOverlay'
import Hero from './components/sections/Hero'
import OurStory from './components/sections/OurStory'
import Events from './components/sections/Events'
import Countdown from './components/sections/Countdown'
import Gallery from './components/sections/Gallery'
import VenueMap from './components/sections/Map'
import Blessings from './components/sections/Blessings'

export default function App() {
  return (
    <>
      <LoadOverlay />
      <PageShell>
        <Hero />
        <OurStory />
        <Events />
        <Countdown />
        <Gallery />
        <VenueMap />
        <Blessings />
      </PageShell>
    </>
  )
}

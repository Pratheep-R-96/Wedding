import { lazy, Suspense } from 'react'
import PageShell from './components/layout/PageShell'
import LoadOverlay from './components/ui/LoadOverlay'
import Hero from './components/sections/Hero'
import OurStory from './components/sections/OurStory'
import Events from './components/sections/Events'
import SectionShimmer from './components/ui/SectionShimmer'

// Heavy sections deferred until the user scrolls toward them
const Gallery = lazy(() => import('./components/sections/Gallery'))
const VenueMap = lazy(() => import('./components/sections/Map'))

export default function App() {
  return (
    <>
      <LoadOverlay />
      <PageShell>
        <Hero />
        <OurStory />
        <Events />
        <Suspense fallback={<SectionShimmer minHeight="min-h-[700px]" />}>
          <Gallery />
        </Suspense>
        <Suspense fallback={<SectionShimmer minHeight="min-h-[600px]" />}>
          <VenueMap />
        </Suspense>
      </PageShell>
    </>
  )
}

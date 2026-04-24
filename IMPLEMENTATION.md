# Implementation (page/section wise)

This project is a single-page wedding website built with React + Vite. The UI is composed of “sections” that render sequentially inside `App.jsx`.

## App entry / overall flow

- **Entry**
  - `src/main.jsx` mounts the React app.
  - `src/App.jsx` composes the page sections.

- **Composition order** (`src/App.jsx`)
  - `Hero`
  - `OurStory`
  - `Events`
  - `Map` (lazy-loaded)

- **Layout wrapper**
  - `src/components/layout/PageShell.jsx` wraps the full experience:
    - Intro overlay gating first entry
    - Navigation
    - Main content
    - Footer
    - Music toggle (floating button)
    - Reading progress indicator
    - Floating decorative elements

## Layout (global)

### Navigation

- **Component**: `src/components/layout/Nav.jsx`
- **Purpose**:
  - Renders the top navigation bar (desktop) and full-screen menu (mobile)
  - Smooth-scrolls to section IDs via `scrollIntoView`
- **Data source**:
  - `NAV_LINKS` from `src/lib/constants.js`

### Intro overlay

- **Component**: `src/components/layout/IntroOverlay.jsx`
- **Purpose**:
  - First-entry overlay that requires user interaction before the hero animation/music starts
- **State**:
  - Uses `sessionStorage` flag `entered` (managed in `PageShell.jsx`)

### Footer

- **Component**: `src/components/layout/Footer.jsx`
- **Purpose**:
  - Closing footer content for the site

## Sections (page wise)

### 1) Hero section

- **Component**: `src/components/sections/Hero.jsx`
- **Section ID**: `hero`
- **Purpose**:
  - Landing experience (background image, couple names, date banner, tagline)
  - Countdown display
  - Scroll indicator to move to “Our Story”
- **Key inputs**:
  - `COUPLE` from `src/lib/constants.js`
  - `WEDDING_DATE` from `src/lib/constants.js`
  - `useCountdown` from `src/hooks/useCountdown`
- **Animations**:
  - Uses Framer Motion (`useScroll`, `useTransform`, variants)
 - **Current hero date text**:
  - `SATURDAY • 09 MAY 2026`

### 2) Our Story section

- **Component**: `src/components/sections/OurStory.jsx`
- **Section ID**: `story`
- **Purpose**:
  - Timeline/story milestones with text + images
- **Data source**:
  - `STORY_MILESTONES` from `src/lib/constants.js`

### 3) Events section

- **Component**: `src/components/sections/Events.jsx`
- **Section ID**: `events`
- **Purpose**:
  - Displays wedding event cards (ceremony/reception items)
- **Data source**:
  - `EVENTS` from `src/lib/constants.js`
- **Key UI**:
  - `src/components/ui/EventCard.jsx`

### 4) Venues / Map section

- **Component**: `src/components/sections/Map.jsx`
- **Section ID**: `map`
- **Purpose**:
  - Venue/map related section
- **Loading strategy**:
  - Lazy-loaded in `src/App.jsx` using `React.lazy` + `Suspense`
  - Fallback skeleton is `src/components/ui/SectionShimmer.jsx`

## Shared UI components

- **`src/components/ui/Picture.jsx`**
  - Responsive image rendering helper

- **`src/components/ui/SectionShimmer.jsx`**
  - Placeholder shimmer used as `Suspense` fallback for heavy sections

- **`src/components/ui/LoadOverlay.jsx`**
  - Loading overlay for initial app load

- **`src/components/ui/ReadingProgress.jsx`**
  - Reading/progress indicator tied to scroll

- **`src/components/ui/MusicToggle.jsx`**
  - Floating music toggle button
  - Works with `useBackgroundMusic`

- **`src/components/ui/FloatingDecor.jsx`**
  - Decorative floating elements over the page

## Data/constants

- **File**: `src/lib/constants.js`
- **Contains**:
  - `COUPLE`
  - `WEDDING_DATE`
  - `STORY_MILESTONES`
  - `EVENTS`
  - `NAV_LINKS`

## Notes (current state)

- Gallery/carousel section is present in the repo (`src/components/sections/Gallery.jsx`) but is currently **not rendered** in `src/App.jsx`.
- The navigation item is removed from `NAV_LINKS` in `src/lib/constants.js`.

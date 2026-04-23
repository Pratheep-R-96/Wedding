// TODO: Replace localStorage with Supabase/Firestore backend for persistence across devices.
// The API shape (getBlessings / addBlessing) stays the same — just swap the implementation.

const STORAGE_KEY = 'wedding-blessings'

const SEED = [
  {
    id: 'seed-1',
    name: 'Uncle Thomas',
    relationship: 'Family',
    message: 'May the Lord bless your union abundantly. As you walk together in faith, may His grace be your guide and His love your foundation. We are so proud of you both!',
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'seed-2',
    name: 'Priya & Samuel',
    relationship: 'Church friends',
    message: 'What a beautiful testimony of God\'s faithfulness! We\'ve watched your love grow from that first Sunday, and our hearts are overflowing. Congratulations, dear ones!',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'seed-3',
    name: 'Aunt Grace',
    relationship: 'Family',
    message: 'Fanny, you are radiant. Pratheep, you are blessed. Together, you reflect the love of Christ. Praying Psalm 128 over your home — may you see the goodness of the Lord all your days.',
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'seed-4',
    name: 'Daniel M.',
    relationship: 'College friend',
    message: 'Bro, you found the one God had for you! So happy for you both. May your home be filled with laughter, worship, and way too much biryani. 🙏',
    createdAt: Date.now() - 3600000,
  },
]

export function getBlessings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // fall through to seed
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED))
  return SEED
}

export function addBlessing({ name, relationship, message }) {
  const blessings = getBlessings()
  const entry = {
    id: `b-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    relationship: relationship || '',
    message,
    createdAt: Date.now(),
  }
  const updated = [entry, ...blessings]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return entry
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function formatDate(date) {
  const y = date.getUTCFullYear()
  const m = pad(date.getUTCMonth() + 1)
  const d = pad(date.getUTCDate())
  const h = pad(date.getUTCHours())
  const min = pad(date.getUTCMinutes())
  return `${y}${m}${d}T${h}${min}00Z`
}

export function generateIcs(event) {
  const start = new Date('2026-05-09T04:30:00Z')
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000)

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PratheepFannyWedding//EN',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(start)}`,
    `DTEND:${formatDate(end)}`,
    `SUMMARY:${event.title} — ${event.kind}`,
    `LOCATION:${event.venue}\\, ${event.address}`,
    `DESCRIPTION:Join us for the ${event.kind} of Pratheep & Fanny Praiselin at ${event.venue}.`,
    'STATUS:CONFIRMED',
    `UID:${event.id}@pratheep-fanny-wedding`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${event.id}-wedding.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

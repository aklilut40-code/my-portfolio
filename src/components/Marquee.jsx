import { Sparkles } from 'lucide-react'
import { skillGroups } from '../data/skills.js'
import { profile } from '../data/profile.js'

const techWords = skillGroups.flatMap((g) => g.items)
const phraseWords = [
  'Technology',
  'Discipline',
  'Continuous Growth',
  ...profile.heroKeywords,
  'Problem Solving',
]

function Row({ items, reverse = false, variant = '' }) {
  // The list is rendered twice so the CSS loop is seamless; the copy is hidden from screen readers.
  return (
    <div className={`marquee__row ${variant}`}>
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          className={`marquee__track ${reverse ? 'marquee__track--reverse' : ''}`}
          aria-hidden={copy === 1}
        >
          {items.map((w) => (
            <li key={`${copy}-${w}`} className="marquee__item">
              <Sparkles size={14} aria-hidden="true" />
              {w}
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marquee" aria-label="Technologies and focus areas">
      <Row items={phraseWords} variant="marquee__row--big" />
      <Row items={techWords} reverse />
    </div>
  )
}

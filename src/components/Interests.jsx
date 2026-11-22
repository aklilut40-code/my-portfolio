import { Lightbulb, Brain, Dumbbell, BookOpen, Mic, Sprout } from 'lucide-react'
import Reveal from './Reveal.jsx'

const interests = [
  { icon: Lightbulb, label: 'Technology & Innovation' },
  { icon: Brain, label: 'Artificial Intelligence' },
  { icon: Dumbbell, label: 'Fitness & Physical Development' },
  { icon: BookOpen, label: 'Reading & Personal Development' },
  { icon: Mic, label: 'Public Speaking' },
  { icon: Sprout, label: 'Continuous Learning' },
]

export default function Interests() {
  return (
    <section id="interests" className="section interests">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="section__eyebrow">Beyond Code</p>
          <h2 className="section__title">Personal interests</h2>
        </Reveal>

        <ul className="interests__grid">
          {interests.map(({ icon: Icon, label }) => (
            <li key={label} className="interests__item" data-reveal>
              <Icon size={20} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

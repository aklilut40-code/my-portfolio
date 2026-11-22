import { GraduationCap, Terminal, Server, Layers, Brain } from 'lucide-react'
import { journeySteps as steps } from '../data/journey.js'
import Reveal from './Reveal.jsx'

const icons = { GraduationCap, Terminal, Server, Layers, Brain }

export default function Journey() {
  return (
    <section id="journey" className="section journey">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="section__eyebrow">Education &amp; Journey</p>
          <h2 className="section__title">An evolving path</h2>
        </Reveal>

        <ol className="timeline">
          {steps.map(({ icon, title, place, text }, idx) => {
            const Icon = icons[icon]
            return (
            <li key={title} className={`timeline__item ${idx % 2 ? 'timeline__item--right' : ''}`} data-reveal>
              <span className="timeline__dot"><Icon size={16} /></span>
              <div className="card timeline__card">
                <p className="timeline__place">{place}</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

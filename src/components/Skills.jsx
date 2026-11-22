import { Code2, Layout, Server, Database, Wrench } from 'lucide-react'
import { skillGroups } from '../data/skills.js'
import Reveal from './Reveal.jsx'

const icons = { Code2, Layout, Server, Database, Wrench }

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="section__eyebrow">Skills &amp; Technologies</p>
          <h2 className="section__title">Tools I learn and build with</h2>
          <p className="section__sub">
            Technologies I am actively learning and using in my projects.
          </p>
        </Reveal>

        <div className="skills__grid">
          {skillGroups.map((group) => {
            const Icon = icons[group.icon] || Code2
            return (
              <article key={group.category} className="card tilt skills__card" data-reveal>
                <div className="skills__card-head">
                  <span className="icon-badge"><Icon size={20} /></span>
                  <h3>{group.category}</h3>
                </div>
                <ul className="skills__chips">
                  {group.items.map((item) => (
                    <li key={item} className="chip">{item}</li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

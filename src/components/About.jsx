import { GraduationCap, Rocket, BookOpen, Target, Compass, Quote } from 'lucide-react'
import { profile } from '../data/profile.js'
import Reveal from './Reveal.jsx'

const cards = [
  {
    icon: GraduationCap,
    title: 'Education',
    text: `Studying ${profile.degree} at ${profile.university}, building a solid foundation in programming, software design and problem solving.`,
  },
  {
    icon: Rocket,
    title: 'Software Engineering Interests',
    text: 'Backend systems, REST APIs, full-stack web development, and how Artificial Intelligence and Machine Learning can be applied to real problems.',
  },
  {
    icon: BookOpen,
    title: 'Continuous Learning',
    text: 'I learn by building: reading documentation, practicing consistently and turning what I study into working projects.',
  },
  {
    icon: Target,
    title: 'Ambitions',
    text: 'To grow into a capable backend and full-stack developer and build software that creates real value for people.',
  },
  {
    icon: Compass,
    title: 'Philosophy',
    text: 'Discipline, curiosity and steady improvement - small, consistent steps compound into meaningful growth.',
  },
]

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="section__eyebrow">About Me</p>
          <h2 className="section__title">Developing with purpose</h2>
        </Reveal>

        <div className="about__layout">
          <div className="about__intro">
            <p className="about__lead">{profile.bio}</p>
            <blockquote className="about__quote" data-reveal>
              <Quote size={28} className="about__quote-icon" aria-hidden="true" />
              <p>{profile.statement}</p>
            </blockquote>
          </div>

          <div className="about__cards">
            {cards.map(({ icon: Icon, title, text }) => (
              <article key={title} className="card about__card" data-reveal>
                <span className="icon-badge"><Icon size={20} /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

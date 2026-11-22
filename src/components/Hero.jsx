import { useRef } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { profile } from '../data/profile.js'
import Typewriter from './Typewriter.jsx'
import { activeSocials, socialIconMap, isExternal } from './socialIcons.js'

export default function Hero() {
  const root = useRef(null)

  // Cursor parallax: updates CSS variables that move the orbs and photo frame slightly.
  const onMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = root.current.getBoundingClientRect()
    root.current.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
    root.current.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
  }

  return (
    <section id="home" className="hero" ref={root} onPointerMove={onMove}>
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__orb hero__orb--1" />
        <span className="hero__orb hero__orb--2" />
        <span className="hero__grid" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content hero__enter">
          <p className="hero__hello">HELLO, I&apos;M</p>
          <h1 className="hero__name">{profile.brandName}</h1>
          <p className="hero__title">{profile.title}</p>
          <p className="hero__focus">
            Focused on <Typewriter words={profile.heroKeywords} />
          </p>
          <p className="hero__bio">{profile.bio}</p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              Explore My Work <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn--ghost">
              <Mail size={18} /> Get In Touch
            </a>
          </div>

          <ul className="hero__socials" aria-label="Social media">
            {activeSocials.map((s) => {
              const Icon = socialIconMap[s.id]
              const ext = isExternal(s.url)
              return (
                <li key={s.id}>
                  <a
                    href={s.url}
                    aria-label={s.label}
                    title={s.label}
                    {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Icon size={20} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="hero__visual">
          <div className="hero__frame">
            <img
              src={profile.photo}
              alt={profile.photoAlt}
              className="hero__photo"
              width="480"
              height="600"
              fetchPriority="high"
            />
          </div>
          <span className="hero__chip hero__chip--1">Node.js</span>
          <span className="hero__chip hero__chip--2">React</span>
          <span className="hero__chip hero__chip--3">AI / ML</span>
          <span className="hero__badge">
            <span className="hero__badge-dot" /> {profile.degree} · {profile.university}
          </span>
        </div>
      </div>
    </section>
  )
}

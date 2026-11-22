import { ArrowUpRight, Mail } from 'lucide-react'
import { email } from '../data/profile.js'
import { activeSocials, socialIconMap, isExternal } from './socialIcons.js'
import Reveal from './Reveal.jsx'

export default function SocialLinks() {
  return (
    <section id="contact" className="section social">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="section__eyebrow">Contact</p>
          <h2 className="section__title">Let&apos;s connect</h2>
          <p className="section__sub">
            I&apos;m open to learning opportunities, collaboration and conversations about software
            and technology. Reach out on any platform below.
          </p>
        </Reveal>

        <ul className="social__grid">
          {activeSocials.map((s) => {
            const Icon = socialIconMap[s.id]
            const ext = isExternal(s.url)
            return (
              <li key={s.id} data-reveal>
                <a
                  className="card social__card"
                  href={s.url}
                  {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className="icon-badge icon-badge--lg"><Icon size={22} /></span>
                  <span className="social__text">
                    <strong>{s.label}</strong>
                    {s.handle && <small>{s.handle}</small>}
                  </span>
                  <ArrowUpRight size={18} className="social__arrow" aria-hidden="true" />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="social__cta">
          <a href={`mailto:${email}`} className="btn btn--primary">
            <Mail size={18} /> Say hello
          </a>
        </div>
      </div>
    </section>
  )
}

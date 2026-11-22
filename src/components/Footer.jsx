import { ArrowUp } from 'lucide-react'
import { profile } from '../data/profile.js'
import { activeSocials, socialIconMap, isExternal } from './socialIcons.js'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="navbar__monogram">{profile.monogram}</span>
            <strong>{profile.fullName}</strong>
          </div>
          <p>{profile.tagline}</p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`}>{l.label}</a>
          ))}
        </nav>

        <ul className="footer__socials" aria-label="Social media">
          {activeSocials.map((s) => {
            const Icon = socialIconMap[s.id]
            return (
              <li key={s.id}>
                <a
                  href={s.url}
                  aria-label={s.label}
                  title={s.label}
                  {...(isExternal(s.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Icon size={18} />
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} {profile.fullName}. All rights reserved.</p>
        <a href="#home" className="footer__top" aria-label="Back to top">
          Back to top <ArrowUp size={16} />
        </a>
      </div>
    </footer>
  )
}

import { useEffect, useState } from 'react'
import { Menu, X, LayoutDashboard } from 'lucide-react'
import { useDashboard } from '../context/DashboardContext.jsx'
import { profile } from '../data/profile.js'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const { open: openDashboard } = useDashboard()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = () => setOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner container" aria-label="Main navigation">
        <a href="#home" className="navbar__brand" onClick={go}>
          <span className="navbar__monogram">{profile.monogram}</span>
          <span className="navbar__name">{profile.brandName}</span>
        </a>

        <ul className={`navbar__links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={go}
                className={active === l.id ? 'is-active' : ''}
                aria-current={active === l.id ? 'page' : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="navbar__dash"
              onClick={() => {
                setOpen(false)
                openDashboard('home')
              }}
            >
              <LayoutDashboard size={16} /> Dashboard
            </button>
          </li>
          <li className="navbar__cta-item">
            <a href="#contact" className="btn btn--primary btn--sm" onClick={go}>
              Let&apos;s Talk
            </a>
          </li>
        </ul>

        <button
          className="navbar__toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
    </header>
  )
}

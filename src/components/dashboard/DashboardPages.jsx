import {
  User, Code2, Briefcase, Github, Route, Mail, ExternalLink, ChevronRight, Star,
  GraduationCap, Terminal, Server, Layers, Brain, ImageIcon, ArrowUpRight,
} from 'lucide-react'
import { profile, github, email } from '../../data/profile.js'
import { skillGroups } from '../../data/skills.js'
import { projects } from '../../data/projects.js'
import { journeySteps } from '../../data/journey.js'
import { useGithubRepos } from '../../hooks/useGithubRepos.js'
import { activeSocials, socialIconMap, isExternal } from '../socialIcons.js'
import { useDashboard } from '../../context/DashboardContext.jsx'

const stepIcons = { GraduationCap, Terminal, Server, Layers, Brain }

/** Metadata for the hub tiles and page titles. */
export const dashboardPages = [
  { id: 'about', label: 'About', icon: User, desc: 'Who I am & what drives me' },
  { id: 'skills', label: 'Skills', icon: Code2, desc: 'Technologies I work with' },
  { id: 'projects', label: 'Projects', icon: Briefcase, desc: 'What I have built' },
  { id: 'github', label: 'GitHub', icon: Github, desc: 'My repositories, live' },
  { id: 'journey', label: 'Journey', icon: Route, desc: 'My path so far' },
  { id: 'contact', label: 'Contact', icon: Mail, desc: 'Let\'s connect' },
]

function SeeOnSite({ id }) {
  const { goToSection } = useDashboard()
  return (
    <button className="btn btn--ghost btn--sm dash__site" onClick={() => goToSection(id)}>
      View this on the main page <ArrowUpRight size={15} />
    </button>
  )
}

function AboutPage() {
  return (
    <>
      <p className="dash__lead">{profile.bio}</p>
      <blockquote className="dash__quote">{profile.statement}</blockquote>
      <div className="dash__panel">
        <span className="icon-badge"><GraduationCap size={20} /></span>
        <div>
          <h3>Education</h3>
          <p>{profile.degree} at {profile.university}</p>
        </div>
      </div>
      <div className="dash__panel">
        <span className="icon-badge"><Brain size={20} /></span>
        <div>
          <h3>Interests</h3>
          <p>Backend systems, full-stack development, Artificial Intelligence and Machine Learning.</p>
        </div>
      </div>
      <SeeOnSite id="about" />
    </>
  )
}

function SkillsPage() {
  return (
    <>
      {skillGroups.map((g) => (
        <div key={g.category} className="dash__panel dash__panel--col">
          <h3>{g.category}</h3>
          <ul className="skills__chips">
            {g.items.map((i) => <li key={i} className="chip">{i}</li>)}
          </ul>
        </div>
      ))}
      <SeeOnSite id="skills" />
    </>
  )
}

function ProjectsPage() {
  return (
    <>
      {projects.map((p) => (
        <article key={p.id} className="dash__project">
          <div className="dash__project-media">
            {p.image ? (
              <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" />
            ) : (
              <div className="project__placeholder"><ImageIcon size={28} /></div>
            )}
          </div>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <ul className="project__tech">
            {p.tech.map((t) => <li key={t} className="chip chip--sm">{t}</li>)}
          </ul>
          <div className="project__actions">
            {p.github ? (
              <a className="btn btn--ghost btn--sm" href={p.github} target="_blank" rel="noopener noreferrer">
                <Github size={16} /> GitHub
              </a>
            ) : (
              <button className="btn btn--ghost btn--sm" disabled><Github size={16} /> GitHub soon</button>
            )}
            {p.demo && (
              <a className="btn btn--primary btn--sm" href={p.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </article>
      ))}
      <SeeOnSite id="projects" />
    </>
  )
}

function GithubPage() {
  const { status, repos } = useGithubRepos(github.username)
  const list = status === 'error' ? github.fallbackRepos : repos
  return (
    <>
      {status === 'loading' && <p className="dash__muted">Loading repositories...</p>}
      {status === 'error' && (
        <p className="dash__muted">Couldn&apos;t reach GitHub right now. Showing saved repositories.</p>
      )}
      {list.map((r) => (
        <a key={r.id} className="dash__row" href={r.url} target="_blank" rel="noopener noreferrer">
          <span className="icon-badge"><Github size={18} /></span>
          <span className="dash__row-text">
            <strong>{r.name}</strong>
            <small>{r.description || 'Open the repository to explore the code.'}</small>
            <small className="dash__row-meta">
              {r.language && <span>{r.language}</span>}
              <span><Star size={12} /> {r.stars}</span>
            </small>
          </span>
          <ChevronRight size={18} aria-hidden="true" />
        </a>
      ))}
      <a className="btn btn--primary" href={github.profileUrl} target="_blank" rel="noopener noreferrer">
        <Github size={18} /> Open my GitHub profile
      </a>
    </>
  )
}

function JourneyPage() {
  return (
    <>
      <ol className="dash__timeline">
        {journeySteps.map(({ icon, title, place, text }) => {
          const Icon = stepIcons[icon]
          return (
            <li key={title}>
              <span className="timeline__dot"><Icon size={16} /></span>
              <div>
                <p className="timeline__place">{place}</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          )
        })}
      </ol>
      <SeeOnSite id="journey" />
    </>
  )
}

function ContactPage() {
  return (
    <>
      <p className="dash__lead">
        Open to learning opportunities, collaboration and conversations about software and technology.
      </p>
      {activeSocials.map((s) => {
        const Icon = socialIconMap[s.id]
        return (
          <a
            key={s.id}
            className="dash__row"
            href={s.url}
            {...(isExternal(s.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <span className="icon-badge"><Icon size={18} /></span>
            <span className="dash__row-text">
              <strong>{s.label}</strong>
              {s.handle && <small>{s.handle}</small>}
            </span>
            <ChevronRight size={18} aria-hidden="true" />
          </a>
        )
      })}
      <a className="btn btn--primary" href={`mailto:${email}`}>
        <Mail size={18} /> Send me an email
      </a>
    </>
  )
}

export const pageComponents = {
  about: AboutPage,
  skills: SkillsPage,
  projects: ProjectsPage,
  github: GithubPage,
  journey: JourneyPage,
  contact: ContactPage,
}

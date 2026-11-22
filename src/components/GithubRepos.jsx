import { useMemo, useState } from 'react'
import { Github, Star, GitFork, Search, ExternalLink, RefreshCw, Pin } from 'lucide-react'
import { github } from '../data/profile.js'
import { useGithubRepos } from '../hooks/useGithubRepos.js'
import Reveal from './Reveal.jsx'
import CountUp from './CountUp.jsx'

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  'C++': '#f34b7d',
  C: '#8c8c8c',
  HTML: '#e34c26',
  CSS: '#7c5fd4',
  Java: '#b07219',
  Shell: '#89e051',
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
const isPinned = (repo) => github.pinned.some((k) => norm(repo.name).includes(norm(k)))
// "habesha-fitness" -> "habesha fitness" (kept hyphen after a single leading letter, e.g. "E-COMMERCES")
const prettyName = (name) => name.replace(/^([a-z])[-_]/i, '$1\u0001').replace(/[-_]+/g, ' ').replace('\u0001', '-')

function timeAgo(iso) {
  if (!iso) return null
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (days < 1) return 'today'
  if (days < 30) return `${days}d ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

function RepoCard({ repo, index }) {
  const ago = timeAgo(repo.updated)
  return (
    <Reveal delay={Math.min(index, 5) * 70}>
      <a
        className="card tilt repo"
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${repo.name} on GitHub`}
      >
        <div className="repo__top">
          <span className="icon-badge"><Github size={18} /></span>
          {repo.pinned && (
            <span className="repo__pin"><Pin size={12} /> Featured</span>
          )}
          <ExternalLink size={16} className="repo__ext" aria-hidden="true" />
        </div>

        <h3 className="repo__name">{prettyName(repo.name)}</h3>
        <p className="repo__desc">
          {repo.description || 'No description yet - open the repository to explore the code.'}
        </p>

        {repo.topics.length > 0 && (
          <ul className="repo__topics">
            {repo.topics.slice(0, 4).map((t) => (
              <li key={t} className="chip chip--sm">{t}</li>
            ))}
          </ul>
        )}

        <div className="repo__meta">
          {repo.language && (
            <span className="repo__lang">
              <i style={{ background: LANG_COLORS[repo.language] || 'var(--accent-2)' }} />
              {repo.language}
            </span>
          )}
          <span title="Stars"><Star size={14} /> {repo.stars}</span>
          <span title="Forks"><GitFork size={14} /> {repo.forks}</span>
          {ago && <span className="repo__ago">Updated {ago}</span>}
        </div>
      </a>
    </Reveal>
  )
}

export default function GithubRepos() {
  const { status, repos: live } = useGithubRepos(github.username)
  const [query, setQuery] = useState('')
  const [lang, setLang] = useState('All')
  const [showAll, setShowAll] = useState(false)

  const offline = status === 'error'
  const source = offline ? github.fallbackRepos : live

  const repos = useMemo(() => {
    return source
      .map((r) => ({ ...r, pinned: isPinned(r) }))
      .sort((a, b) => Number(b.pinned) - Number(a.pinned))
  }, [source])

  const languages = useMemo(
    () => ['All', ...new Set(repos.map((r) => r.language).filter(Boolean))],
    [repos]
  )

  const filtered = repos.filter((r) => {
    const q = query.trim().toLowerCase()
    const okQuery =
      !q || r.name.toLowerCase().includes(q) || (r.description || '').toLowerCase().includes(q)
    const okLang = lang === 'All' || r.language === lang
    return okQuery && okLang
  })

  const LIMIT = 6
  const visible = showAll ? filtered : filtered.slice(0, LIMIT)
  const totalStars = repos.reduce((n, r) => n + r.stars, 0)

  return (
    <section id="github" className="section gh">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="section__eyebrow">Open Source &amp; Code</p>
          <h2 className="section__title">My GitHub repositories</h2>
          <p className="section__sub">
            Live from my GitHub profile <strong>@{github.username}</strong> - browse the code behind my
            projects, including my E-Commerce, Marketplace and Habesha Fitness work.
          </p>
        </Reveal>

        {status === 'ready' && repos.length > 0 && (
          <Reveal className="gh__stats">
            <div className="gh__stat"><strong><CountUp value={repos.length} /></strong><span>Public repos</span></div>
            <div className="gh__stat"><strong><CountUp value={languages.length - 1} /></strong><span>Languages</span></div>
            <div className="gh__stat"><strong><CountUp value={totalStars} /></strong><span>Stars earned</span></div>
          </Reveal>
        )}

        {offline && (
          <div className="gh__notice" role="status">
            <span>Couldn&apos;t reach GitHub right now (network or rate limit). Showing what&apos;s saved offline.</span>
            <button className="btn btn--ghost btn--sm" onClick={() => window.location.reload()}>
              <RefreshCw size={14} /> Retry
            </button>
          </div>
        )}

        {repos.length > 1 && (
          <div className="gh__controls">
            <label className="gh__search">
              <Search size={16} aria-hidden="true" />
              <input
                type="search"
                placeholder="Search repositories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search repositories"
              />
            </label>
            <div className="gh__filters" role="group" aria-label="Filter by language">
              {languages.map((l) => (
                <button
                  key={l}
                  className={`gh__filter ${lang === l ? 'is-active' : ''}`}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        )}

        {status === 'loading' ? (
          <div className="gh__grid" aria-busy="true" aria-label="Loading repositories">
            {[0, 1, 2].map((i) => (
              <div key={i} className="card repo repo--skeleton">
                <span /><span /><span />
              </div>
            ))}
          </div>
        ) : visible.length > 0 ? (
          <div className="gh__grid">
            {visible.map((r, i) => (
              <RepoCard key={r.id} repo={r} index={i} />
            ))}
          </div>
        ) : (
          <p className="gh__empty">No repositories match your search.</p>
        )}

        <div className="gh__footer">
          {filtered.length > LIMIT && (
            <button className="btn btn--ghost" onClick={() => setShowAll((s) => !s)}>
              {showAll ? 'Show fewer' : `Show all ${filtered.length} repositories`}
            </button>
          )}
          <a className="btn btn--primary" href={github.profileUrl} target="_blank" rel="noopener noreferrer">
            <Github size={18} /> View my GitHub profile
          </a>
        </div>
      </div>
    </section>
  )
}

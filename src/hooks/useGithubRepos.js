import { useEffect, useState } from 'react'

const TTL = 10 * 60 * 1000 // cache for 10 minutes to stay within GitHub's rate limit
const inflight = new Map() // so several components asking at once trigger only one request

const pick = (r) => ({
  id: r.id,
  name: r.name,
  description: r.description,
  url: r.html_url,
  language: r.language,
  stars: r.stargazers_count,
  forks: r.forks_count,
  homepage: r.homepage,
  updated: r.pushed_at || r.updated_at,
  topics: r.topics || [],
})

function readCache(key) {
  try {
    const cached = JSON.parse(sessionStorage.getItem(key))
    if (cached && Date.now() - cached.t < TTL) return cached.repos
  } catch {
    /* storage unavailable */
  }
  return null
}

function load(username) {
  const key = `gh-repos:${username}`
  const cached = readCache(key)
  if (cached) return Promise.resolve(cached)
  if (!inflight.has(username)) {
    const p = fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub responded ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const repos = data.filter((r) => !r.fork).map(pick)
        try {
          sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), repos }))
        } catch {
          /* ignore */
        }
        return repos
      })
      .finally(() => inflight.delete(username))
    inflight.set(username, p)
  }
  return inflight.get(username)
}

/** Loads a user's public, non-fork repositories live from the GitHub API. */
export function useGithubRepos(username) {
  const [state, setState] = useState(() => {
    const cached = readCache(`gh-repos:${username}`)
    return cached ? { status: 'ready', repos: cached } : { status: 'loading', repos: [] }
  })

  useEffect(() => {
    let cancelled = false
    load(username)
      .then((repos) => !cancelled && setState({ status: 'ready', repos }))
      .catch(() => !cancelled && setState({ status: 'error', repos: [] }))
    return () => {
      cancelled = true
    }
  }, [username])

  return state
}

// ===========================================================
//  CENTRAL PERSONAL INFORMATION
//  Edit this file to update your name, bio, photo and links.
//  Leave a social URL as '' (empty) to hide that link.
// ===========================================================

export const profile = {
  fullName: 'Aklilu Tesfay',
  brandName: 'AKLILU TESFAY',
  monogram: 'AT',
  title: 'Software Engineering Student | Backend & Full-Stack Developer',
  tagline: 'Building my future through technology, discipline, and continuous growth.',
  bio:
    "I'm a Software Engineering student passionate about building meaningful digital solutions. I enjoy exploring backend systems, full-stack development, and emerging technologies while continuously improving my technical and personal skills.",
  statement:
    'Technology is more than writing code. It is about solving problems, creating opportunities, and building something meaningful.',
  university: 'Mekelle University',
  degree: 'Software Engineering',
  photo: `${import.meta.env.BASE_URL}images/profile.jpg`,
  photoAlt: 'Portrait of Aklilu Tesfay',
  heroKeywords: [
    'Backend Development',
    'Full-Stack Development',
    'Artificial Intelligence',
    'Machine Learning',
  ],
}

// GitHub repositories section.
// Repos are loaded LIVE from GitHub for this username, so new repos appear automatically.
// `pinned` are keywords matched against repo names (ignoring case, dashes and spaces):
// any repo whose name contains one of them is shown first with a "Featured" badge.
export const github = {
  username: 'aklilut40-code',
  profileUrl: 'https://github.com/aklilut40-code',
  pinned: ['ecommerce', 'habeshafitness', 'marketplace', 'habit'],
  // Shown only if GitHub cannot be reached (offline / rate limited).
  fallbackRepos: [
    {
      id: 'fallback-marketplace',
      name: 'marketplace',
      description: 'Full-stack marketplace application (React, Node.js, Express, MongoDB).',
      url: 'https://github.com/aklilut40-code/marketplace',
      language: 'JavaScript',
      stars: 0,
      forks: 0,
      updated: null,
      topics: [],
    },
  ],
}

// Social + contact links. `url` is used as the link target.
export const socials = [
  {
    id: 'github',
    label: 'GitHub',
    handle: 'aklilut40-code',
    // Taken from your saved GitHub username - change if needed.
    url: 'https://github.com/aklilut40-code',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    handle: 'aklilu.tesfay.276795',
    url: 'https://www.facebook.com/aklilu.tesfay.276795',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    handle: '@Akesoftware',
    url: 'https://t.me/Akesoftware',
  },
  {
    id: 'x',
    label: 'X (Twitter)',
    handle: '@NigroTesfay',
    url: 'https://x.com/NigroTesfay',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: '',
    url: '', // <-- add your LinkedIn profile URL here
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'aklilut40@gmail.com',
    url: 'mailto:aklilut40@gmail.com',
  },
]

export const email = 'aklilut40@gmail.com'

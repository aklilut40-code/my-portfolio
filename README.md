# Aklilu Tesfay - Personal Portfolio

A premium dark single-page portfolio built with **React + Vite** and plain CSS. Frontend only - no backend.

## Folder structure

```
aklilu-portfolio/
├── public/
│   ├── images/
│   │   ├── profile.jpg        <- your photo
│   │   └── projects/          <- project screenshots
│   └── favicon.svg
├── src/
│   ├── components/   Navbar, Hero, Marquee, About, Skills, Projects, GithubRepos, Journey, Interests, SocialLinks, Footer
│   ├── hooks/        useGithubRepos, useInView, useScrollReveal, useInteractiveCards
│   ├── data/         profile.js, projects.js, skills.js   <- edit these to change content
│   ├── styles/       one CSS file per section + global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html        SEO + Open Graph metadata
└── package.json
```

## Install and run

Requires Node.js 18+.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Replace your profile photo

Overwrite `public/images/profile.jpg` with your image (portrait, ideally 4:5, around 800x1000px). Keep the same file name, or change `photo` in `src/data/profile.js`.

## GitHub repositories section

The **GitHub** section loads your public repos live from `https://api.github.com/users/aklilut40-code/repos`, so new repos appear automatically (forks are hidden). It shows repo count, languages, stars, a search box and language filters.

- Change the account or pinned repos in `src/data/profile.js` -> `github`.
- `pinned` holds keywords matched against repo names (case, dashes and spaces ignored). Repos matching e.g. `ecommerce`, `habeshafitness`, `marketplace` or `habit` are shown first with a **Featured** badge.
- If GitHub can't be reached, a short offline fallback list (`fallbackRepos`) is shown with a Retry button.
- Give each repo a description and topics on GitHub - they are shown on the cards.

## Mobile / Android experience and Dashboard

- On phones (<= 768px) an Android-style **bottom tab bar** appears: Home, Projects, **Dashboard**, GitHub, Contact. On desktop the same Dashboard opens from the **Dashboard** button in the top menu.
- The **Dashboard** is an app-style hub with your photo, quick stats and six pages: About, Skills, Projects, GitHub, Journey, Contact. Tapping a tile opens that page full screen; the phone's **Back** button goes back one page, then closes the dashboard.
- Page content comes from the same files as the main site (`profile.js`, `skills.js`, `projects.js`, `journey.js`), so you only edit things once. Code is in `src/components/dashboard/`.
- Phones respect notches / gesture bars (safe-area insets), use 44px+ touch targets, and the site has a web app manifest, so in Chrome on Android you can use **menu -> Add to Home screen** to open it like an app. Icons are in `public/icons/` (replace them with your own if you like).

## Interactive effects

Typing text in the hero, floating tech chips, cursor parallax, a scrolling text band under the hero, scroll-reveal animations, a scroll progress bar, card spotlight/tilt on hover, and animated counters. All motion is switched off for visitors who prefer reduced motion. Styles live in `src/styles/effects.css`.

## Add / change social links

Open `src/data/profile.js` and edit the `socials` array. Any entry with an empty `url` is hidden automatically.
**LinkedIn is empty right now** - paste your profile URL into its `url` field and it will appear everywhere (hero, contact, footer).

## Update projects

Open `src/data/projects.js`. For each project set:
- `github`: repository URL (button is disabled while empty)
- `demo`: live URL (button only appears when filled)
- `image`: e.g. `'/images/projects/ecommerce.png'` after placing the file in `public/images/projects/`

## Build and deploy

```bash
npm run build      # outputs to dist/
npm run preview    # test the production build locally
```

**Vercel:** push the project to GitHub, import the repo on vercel.com. Vercel detects Vite automatically (build command `npm run build`, output `dist`).
**Netlify:** build command `npm run build`, publish directory `dist`.

Remember to update the `og:image` / page URL in `index.html` once you have your final domain.

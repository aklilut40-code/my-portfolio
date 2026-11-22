import { profile } from './profile.js'

// Journey steps. `icon` is a name resolved in the components (see Journey.jsx / DashboardPages.jsx).
export const journeySteps = [
  {
    icon: 'GraduationCap',
    title: `${profile.degree} Studies`,
    place: profile.university,
    text: 'Studying software engineering and building a strong foundation in how software is designed and built.',
  },
  {
    icon: 'Terminal',
    title: 'Personal Programming Journey',
    place: 'Self-directed learning',
    text: 'Practicing JavaScript, Python and C++ and learning by building real things.',
  },
  {
    icon: 'Server',
    title: 'Backend Development',
    place: 'Node.js · Express · MongoDB',
    text: 'Learning to design REST APIs, work with databases and structure server-side applications.',
  },
  {
    icon: 'Layers',
    title: 'Full-Stack Projects',
    place: 'React · Node.js',
    text: 'Combining frontend and backend skills in complete applications such as an e-commerce platform and a marketplace.',
  },
  {
    icon: 'Brain',
    title: 'Looking Ahead: AI & Machine Learning',
    place: 'Next chapter',
    text: 'Growing interest in Artificial Intelligence and Machine Learning as the next area to explore.',
  },
]

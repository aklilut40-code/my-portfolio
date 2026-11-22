import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import './styles/navbar.css'
import './styles/hero.css'
import './styles/about.css'
import './styles/skills.css'
import './styles/projects.css'
import './styles/journey.css'
import './styles/interests.css'
import './styles/social.css'
import './styles/footer.css'
import './styles/github.css'
import './styles/effects.css'
import './styles/dashboard.css'
import './styles/mobile.css'

// Lets CSS hide .reveal elements only when JavaScript is running.
document.documentElement.classList.add('js')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

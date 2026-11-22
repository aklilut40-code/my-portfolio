import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import GithubRepos from './components/GithubRepos.jsx'
import Journey from './components/Journey.jsx'
import Interests from './components/Interests.jsx'
import SocialLinks from './components/SocialLinks.jsx'
import Footer from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import BottomNav from './components/BottomNav.jsx'
import { DashboardProvider } from './context/DashboardContext.jsx'
import { useInteractiveCards } from './hooks/useInteractiveCards.js'
import { useScrollReveal } from './hooks/useScrollReveal.js'

export default function App() {
  useInteractiveCards()
  useScrollReveal()
  return (
    <DashboardProvider>
      <a href="#home" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <GithubRepos />
        <Journey />
        <Interests />
        <SocialLinks />
      </main>
      <Footer />
      <BottomNav />
      <Dashboard />
    </DashboardProvider>
  )
}

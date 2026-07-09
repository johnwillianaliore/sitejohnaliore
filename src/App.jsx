import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import LiveProjects from './components/LiveProjects'
import ProjectDeck from './components/ProjectDeck'
import Hosting from './components/Hosting'
import Contact from './components/Contact'
import WhatsAppFloat from './components/WhatsAppFloat'

function App() {
  return (
    <main className="noise">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Projects />
      <LiveProjects />
      <ProjectDeck />
      <Hosting />
      <Contact />
      <WhatsAppFloat />
    </main>
  )
}

export default App

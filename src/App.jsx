import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import StatsStrip from './components/StatsStrip.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Career from './components/Career.jsx';
import Projects from './components/Projects.jsx';
import Honors from './components/Honors.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import useReveal from './components/useReveal.js';
import { resume } from './data/resume.js';

export default function App() {
  useReveal();

  return (
    <>
      <div className="ambient" aria-hidden="true" />

      <Nav />

      <main>
        <Hero resume={resume} />
        <StatsStrip stats={resume.stats} />
        <About resume={resume} />
        <Skills skills={resume.skills} />
        <Career experience={resume.experience} />
        <Projects projects={resume.projects} />
        <Honors honors={resume.honors} />
        <Contact contact={resume.contact} />
      </main>

      <Footer />
    </>
  );
}

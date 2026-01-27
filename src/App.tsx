import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SectionDivider } from './components/layout/SectionDivider';
import { Hero } from './components/sections/Hero';
import { TechnicalTalk } from './components/sections/TechnicalTalk';
import { Experience } from './components/sections/Experience';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Certifications } from './components/sections/Certifications';
import { Publications } from './components/sections/Publications';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { useActiveSection } from './hooks/useActiveSection';
import { navItems } from './data/portfolioData';

const App: React.FC = () => {
  const sectionIds = navItems.map(item => item.href.slice(1));
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <SectionDivider />
        <TechnicalTalk />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Publications />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
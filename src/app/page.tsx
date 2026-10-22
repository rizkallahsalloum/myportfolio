import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';

export default function Home() {
  return (
    <>
      <main className="full-width-container">
        <Navbar />
        <Hero />
        <Services />
        <Work />
        <About />
        <Contact />
      </main>
    </>
  );
}

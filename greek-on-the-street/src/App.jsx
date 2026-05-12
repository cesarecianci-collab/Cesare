import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Formulas from './components/Formulas'
import About from './components/About'
import Reviews from './components/Reviews'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <Formulas />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Reviews />
        <div className="section-divider" />
        <FAQ />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

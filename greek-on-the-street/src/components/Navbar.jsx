import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Formules', href: '#formules' },
  { label: 'Over Ons', href: '#over-ons' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-black/50' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <img src="/Cesare/logo.svg" alt="Greek On The Street" className="w-12 h-12" />
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-tight">GREEK ON</p>
              <p className="text-sm leading-tight font-bold" style={{ color: '#c9a84c' }}>THE STREET</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#c9a84c' }} />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+32476242361"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:bg-white/10"
              style={{ borderColor: 'rgba(201,168,76,0.4)', color: '#c9a84c' }}
            >
              <Phone size={14} />
              0476 24 23 61
            </a>
            <a href="#contact" className="btn-gold px-5 py-2.5 rounded-full text-sm">
              Offerte Aanvragen
            </a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/98 backdrop-blur-md border-t"
            style={{ borderColor: 'rgba(201,168,76,0.2)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-white py-2 text-base font-medium border-b transition-colors"
                  style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                >
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="btn-gold px-6 py-3 rounded-full text-center mt-2">
                Offerte Aanvragen
              </a>
              <a href="tel:+32476242361" className="text-center py-2 font-medium" style={{ color: '#c9a84c' }}>
                📞 0476 24 23 61
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

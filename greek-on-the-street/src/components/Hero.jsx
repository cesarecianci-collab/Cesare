import { motion } from 'framer-motion'
import { ChevronDown, Star, Users, Calendar, MapPin } from 'lucide-react'

const stats = [
  { icon: Star, value: '5.0★', label: 'Google Rating' },
  { icon: Users, value: '500+', label: 'Tevreden klanten' },
  { icon: Calendar, value: '100+', label: 'Evenementen' },
  { icon: MapPin, value: 'België', label: 'NL & FR' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 100%)' }}
    >
      {/* Background Greek pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, rgba(201,168,76,0.3) 0px, rgba(201,168,76,0.3) 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(90deg, rgba(201,168,76,0.3) 0px, rgba(201,168,76,0.3) 1px, transparent 1px, transparent 40px)`,
          }}
        />
      </div>

      {/* Glow effects */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, #c9a84c, transparent)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-6"
        >
          <img src="/Cesare/logo.svg" alt="Greek On The Street" className="w-28 h-28 sm:w-36 sm:h-36" />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border"
          style={{
            background: 'rgba(201,168,76,0.1)',
            borderColor: 'rgba(201,168,76,0.3)',
            color: '#c9a84c',
          }}
        >
          🇬🇷 Authentieke Griekse Catering voor elk evenement
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6"
        >
          Proef{' '}
          <span className="gold-text">Griekenland</span>
          <br />
          op jouw feest
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Van bruiloften en communies tot bedrijfsfeesten en festivals — Greek On The Street zorgt
          voor authentieke smaken, verse ingrediënten en een onvergetelijke beleving.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <a href="#contact" className="btn-gold px-8 py-4 rounded-full text-lg w-full sm:w-auto">
            Gratis Offerte Aanvragen →
          </a>
          <a
            href="https://wa.me/32476242361"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold border w-full sm:w-auto justify-center transition-all duration-200 hover:bg-white/5"
            style={{ borderColor: 'rgba(201,168,76,0.4)', color: 'white' }}
          >
            💬 WhatsApp ons
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="card-dark rounded-2xl p-4 text-center"
            >
              <p className="text-2xl font-black mb-1" style={{ color: '#c9a84c' }}>{value}</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={28} style={{ color: '#c9a84c' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

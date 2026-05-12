import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Star } from 'lucide-react'

const formulas = [
  {
    name: '🥗 Snacksto & Dips',
    price: '€10',
    unit: 'per persoon',
    description: 'Perfecte aperitief voor elk evenement',
    items: ['🥖 Broodstokjes', '🧀 Feta kaas', '🥒 Tzatziki', '🌶️ Pikante fetadip (chtipiti)', '🫒 Olijven', '🍠 Rode bietendip', '🍃 Dolmadakia'],
    badge: null,
    highlight: false,
  },
  {
    name: '🌯 Broodjesformule',
    price: '€15',
    unit: 'per persoon · à volonté 2u',
    description: 'Onbeperkt genieten van verse Griekse broodjes',
    items: ['🥩 Gyros', '🍢 Kip souvlaki', '🍢 Varkenssouvlaki', '🥩 Kefte', '🥦 Vegetarische optie', '🍅 Tomaat · 🧅 Ui · 🍟 Frietjes', '🥒 Tzatziki of saus naar keuze'],
    badge: null,
    highlight: false,
  },
  {
    name: '🌯 Broodjes & Snacksto',
    price: '€20',
    unit: 'per persoon · à volonté 2u',
    description: 'De combinatie van dips én broodjes',
    items: ['🥗 Alle dips & starters', '🥖 Broodstokjes + 🧀 Feta + 🥒 Tzatziki', '🥩 Gyros · 🍢 Kip · 🍢 Varkenssouvlaki', '🥩 Kefte · 🥦 Vegetarisch', '🍟 Frietjes inbegrepen', '🍃 Dolmadakia + 🫒 Olijven', '🥣 Alle sauzen naar keuze'],
    badge: 'Populair',
    highlight: true,
  },
  {
    name: '🍽️ Classic Buffet',
    price: '€25',
    unit: 'per persoon · à volonté 2u',
    description: 'Een volledig Grieks buffet voor elk feest',
    items: ['🥩 Gyros', '🍢 Souvlaki varken', '🍢 Kip souvlaki', '🥩 Kefte', '🍟 Frietjes', '🫓 Pitabrood', '🥗 Salade + 🥒 Tzatziki'],
    badge: null,
    highlight: false,
  },
  {
    name: '⭐ Deluxe Buffet',
    price: '€28',
    unit: 'per persoon · à volonté 2u',
    description: 'Uitgebreider met vis en extra sides',
    items: ['🥩 Gyros · 🍢 Souvlaki · 🍢 Kip souvlaki', '🥩 Kefte + 🦑 Gefrituurde calamari', '🍟 Frietjes + 🫓 Pitabrood', '🍝 Griekse pasta', '🥦 Gegrilde groenten', '🥗 Salade + 🥒 Tzatziki', '🍠 Rode bietendip + 🌶️ Chtipiti'],
    badge: null,
    highlight: false,
  },
  {
    name: '👑 Buffet Royale',
    price: '€35',
    unit: 'per persoon · à volonté 2u',
    description: 'Het ultieme Griekse feestmaal',
    items: ['🥩 Gyros · 🍢 Souvlaki · 🍢 Kip · 🥩 Kefte', '🌭 Worst + 🥩 Lamskotelet', '🦑 Gefrituurde calamari', '🍝 Griekse pasta + 🥦 Gegrilde groenten', '🥒 Tzatziki · 🌶️ Chtipiti · 🍠 Rode bietensalade', '🥗 Spinaziesalade + 🥗 Griekse koolsalade', '🍟 Frietjes + 🫓 Pitabrood'],
    badge: 'Premium',
    highlight: false,
  },
  {
    name: '🔥 BBQ Pakket',
    price: '€12',
    unit: 'per persoon',
    description: 'Genieten van een Griekse BBQ aan huis',
    items: ['🥩 1 lamskotelet', '🥩 2 keftedes', '🍢 1 kip souvlaki', '🍢 1 varkenssouvlaki', '🌭 1 worst', '🥒 Potje tzatziki', '🚚 Vers gemarineerd vlees — geleverd op locatie'],
    badge: 'Aan huis',
    highlight: false,
  },
]

function FormulaCard({ formula, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`card-dark rounded-3xl p-6 flex flex-col relative overflow-hidden ${formula.highlight ? 'ring-2' : ''}`}
      style={formula.highlight ? { ringColor: '#c9a84c', boxShadow: '0 0 40px rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.5)' } : {}}
    >
      {formula.highlight && (
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #c9a84c, #e8c96a)' }} />
      )}

      {formula.badge && (
        <span
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
          style={{
            background: formula.highlight ? 'linear-gradient(135deg,#c9a84c,#e8c96a)' : 'rgba(201,168,76,0.15)',
            color: formula.highlight ? '#000' : '#c9a84c',
            border: formula.highlight ? 'none' : '1px solid rgba(201,168,76,0.3)',
          }}
        >
          {formula.badge}
        </span>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-1">{formula.name}</h3>
        <p className="text-gray-400 text-sm">{formula.description}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-black" style={{ color: '#c9a84c' }}>{formula.price}</span>
        <span className="text-gray-400 text-sm ml-2">{formula.unit}</span>
      </div>

      <ul className="flex-1 space-y-2 mb-6">
        {formula.items.map(item => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
            <Check size={14} className="mt-0.5 shrink-0" style={{ color: '#c9a84c' }} />
            {item}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`block text-center py-3 px-6 rounded-full font-semibold text-sm transition-all duration-200 ${
          formula.highlight ? 'btn-gold' : 'border hover:bg-white/5'
        }`}
        style={!formula.highlight ? { borderColor: 'rgba(201,168,76,0.4)', color: '#c9a84c' } : {}}
      >
        Offerte aanvragen
      </a>
    </motion.div>
  )
}

export default function Formulas() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="formules" className="py-24 px-4 sm:px-6" style={{ background: '#0d0d0d' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#c9a84c' }}>Onze Formules</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 mb-4">
            Voor elk budget<br />
            <span className="gold-text">een perfecte formule</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Van een snelle snack tot een royaal buffet — wij zorgen voor verse, authentieke Griekse smaken.
            Minimum 20 volwassenen. Geen aanrijkosten binnen 60 km van Genk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {formulas.map((formula, i) => (
            <FormulaCard key={formula.name} formula={formula} index={i} />
          ))}
        </div>

        {/* Extra info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 card-dark rounded-2xl p-6 sm:p-8"
        >
          <h3 className="text-lg font-bold text-white mb-4">ℹ️ Praktische Info</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-400">
            <div className="flex gap-2">
              <span style={{ color: '#c9a84c' }}>✓</span>
              <span>Losse souvlaki: €2,50/stuk</span>
            </div>
            <div className="flex gap-2">
              <span style={{ color: '#c9a84c' }}>✓</span>
              <span>Extra keftedes: €2,50/2 stuks</span>
            </div>
            <div className="flex gap-2">
              <span style={{ color: '#c9a84c' }}>✓</span>
              <span>Bamboe borden & bestek: +€1/persoon</span>
            </div>
            <div className="flex gap-2">
              <span style={{ color: '#c9a84c' }}>✓</span>
              <span>Kilometer na 60km van Genk: €0,50/km</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            * Extra's dienen op voorhand doorgegeven te worden. Op aanvraag kunnen ook gerechten buiten het standaardmenu voorzien worden.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

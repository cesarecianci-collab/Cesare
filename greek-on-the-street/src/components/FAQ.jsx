import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Wat is het minimum aantal personen?',
    a: 'Wij komen op locatie vanaf 20 volwassenen. Voor kleinere groepen kan je contact opnemen voor een aangepaste oplossing.',
  },
  {
    q: 'Zijn er aanrijkosten?',
    a: 'Wij rekenen geen aanrijkosten aan. Enkel bij afstanden vanaf 60 km vanuit Genk wordt een kilometervergoeding van €0,50 per km aangerekend.',
  },
  {
    q: 'Kunnen jullie ook gerechten maken die niet op het menu staan?',
    a: 'Ja! Op aanvraag kunnen wij ook gerechten voorzien die niet op ons standaardmenu staan. Neem contact op om de mogelijkheden te bespreken.',
  },
  {
    q: 'Voorzien jullie borden en bestek?',
    a: 'Ja, wegwerp bamboe borden en bestek kunnen door ons voorzien worden aan €1 extra per persoon (aankoopprijs).',
  },
  {
    q: 'Hoe ver op voorhand moet ik reserveren?',
    a: 'Wij raden aan om minstens 2-4 weken op voorhand te reserveren, zeker voor grote evenementen. In het hoogseizoen (lente/zomer) is vroeger reserveren aangeraden.',
  },
  {
    q: 'Zijn er vegetarische opties?',
    a: 'Ja! In onze broodjesformules bieden wij altijd een vegetarische optie aan. Ook in onze buffetten kunnen wij vegetarische gerechten voorzien op aanvraag.',
  },
  {
    q: 'Waar zijn jullie actief?',
    a: 'Wij zijn actief in heel België, maar ook in Nederland, Noord-Frankrijk en Duitsland. De basis is Genk. Bij afstanden boven 60 km rekenen we een kleine kilometervergoeding.',
  },
  {
    q: 'Kan ik een extra\'s bestellen na reservatie?',
    a: 'Extra\'s (losse souvlaki, keftedes, friet) dienen op voorhand doorgegeven te worden. Het is niet mogelijk om extra\'s te voorzien tijdens het evenement zelf.',
  },
]

function FAQItem({ faq, i, inView }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: i * 0.06 }}
      className="card-dark rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 transition-colors hover:bg-white/5"
      >
        <span className="text-white font-medium">{faq.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} style={{ color: '#c9a84c' }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="faq" className="py-24 px-4 sm:px-6" style={{ background: '#111111' }}>
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#c9a84c' }}>FAQ</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 mb-4">
            Veelgestelde vragen
          </h2>
          <p className="text-gray-400">
            Staat je vraag er niet bij? Bel of WhatsApp ons gerust!
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} faq={faq} i={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-400 mb-4">Nog vragen? Neem contact op!</p>
          <div className="flex justify-center gap-3">
            <a href="tel:+32476242361" className="btn-gold px-6 py-3 rounded-full text-sm">
              📞 Bel ons
            </a>
            <a
              href="https://wa.me/32476242361"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-sm font-semibold border transition-all hover:bg-white/5"
              style={{ borderColor: 'rgba(201,168,76,0.4)', color: '#c9a84c' }}
            >
              💬 WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

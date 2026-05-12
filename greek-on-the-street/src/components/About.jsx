import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Heart, Flame, Award, Users } from 'lucide-react'

const values = [
  { icon: Flame, title: 'Authentiek', desc: 'Traditionele recepten en pure ingrediënten uit Griekenland' },
  { icon: Heart, title: 'Vers & Huisgemaakt', desc: 'Alles dagvers bereid met liefde en passie' },
  { icon: Award, title: 'Professioneel', desc: 'Betrouwbare service voor elk evenement, van klein tot groot' },
  { icon: Users, title: 'Gastvrij', desc: 'Een warme beleving die iedereen het gevoel geeft welkom te zijn' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="over-ons" className="py-24 px-4 sm:px-6" style={{ background: '#111111' }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#c9a84c' }}>Over Ons</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 mb-6">
              Vasili & Manoli —<br />
              <span className="gold-text">Vrienden met passie</span>
            </h2>

            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Welkom bij <strong className="text-white">Greek On The Street!</strong> Wij zijn Vasili en Manoli — twee vrienden met een grote liefde voor lekker eten, gezelligheid en de échte Griekse keuken.
              </p>
              <p>
                Samen hebben we iets moois opgebouwd: een plek waar passie, vriendschap en authentieke smaken samenkomen. Bij ons proef je Griekenland zoals het hoort — alles is <strong className="text-white">authentiek, vers en huisgemaakt</strong>, bereid met traditionele recepten en pure ingrediënten.
              </p>
              <p>
                De smaken, de geuren en de sfeer brengen je meteen naar de levendige straten van Griekenland. Wij staan klaar voor alle evenementen — van feesten en festivals tot bedrijfsfeesten en privévieringen.
              </p>
              <p className="font-medium" style={{ color: '#c9a84c' }}>
                Kom langs, proef de passie en beleef Griekenland… samen met ons op straat! 🇬🇷
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="btn-gold px-6 py-3 rounded-full">
                Neem Contact Op
              </a>
              <a
                href="https://wa.me/32476242361"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border font-semibold transition-all hover:bg-white/5"
                style={{ borderColor: 'rgba(201,168,76,0.4)', color: '#c9a84c' }}
              >
                💬 WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Values grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="card-dark rounded-2xl p-6"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(201,168,76,0.15)' }}
                >
                  <Icon size={20} style={{ color: '#c9a84c' }} />
                </div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}

            {/* Evenementen badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="col-span-2 rounded-2xl p-5 text-center"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
            >
              <p className="text-gray-400 text-sm mb-2">Wij verzorgen catering voor</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Bruiloften 💍', 'Communies ⛪', 'Verjaardagen 🎂', 'Bedrijfsfeesten 🏢', 'Festivals 🎪', 'Privéfeesten 🎉'].map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Sarah V.',
    event: 'Bruiloft · 120 personen',
    stars: 5,
    text: 'Absoluut fenomenaal! Het Buffet Royale was een voltreffer. Iedereen was onder de indruk van de kwaliteit en de hoeveelheid. Vasili en Manoli zijn echte professionals — altijd vriendelijk en punctueel. Een aanrader voor elk feest!',
    avatar: 'SV',
  },
  {
    name: 'Thomas D.',
    event: 'Bedrijfsfeest · 60 personen',
    stars: 5,
    text: 'Greek On The Street heeft ons bedrijfsfeest naar een hoger niveau getild. De Deluxe Buffet was heerlijk — verse calamari, perfecte gyros en de tzatziki was hemels. De service was vlekkeloos. Absoluut terug boeken!',
    avatar: 'TD',
  },
  {
    name: 'Nathalie B.',
    event: 'Communiefeest · 45 personen',
    stars: 5,
    text: 'We kozen de Broodjes & Snacksto formule voor het communiefeest van onze dochter. Geweldig eten, kinderen én volwassenen waren lyrisch. De dolmadakia waren een grote hit! Super vriendelijk team, aanrader!',
    avatar: 'NB',
  },
  {
    name: 'Kevin M.',
    event: 'Verjaardag · 30 personen',
    stars: 5,
    text: 'Besteld voor mijn 40ste verjaardag en het overtrof alle verwachtingen. De souvlaki was perfect gemarineerd, de frietjes vers gebakken. Iedereen vroeg naar de contactgegevens. Boek ze, je zal het niet betreuren!',
    avatar: 'KM',
  },
  {
    name: 'Els V.',
    event: 'Festival · 200 personen',
    stars: 5,
    text: 'Greek On The Street was de ster van het festival. De rij stond de hele dag lang voor hun truck. Snel, vriendelijk en heerlijk eten. De gyros waren verrukkelijk en de porties groot. Tot volgend jaar!',
    avatar: 'EV',
  },
  {
    name: 'Pieter L.',
    event: 'BBQ thuis · gezin',
    stars: 5,
    text: 'Het BBQ pakket aan huis is geweldig! Vers gemarineerd vlees geleverd op locatie — de lamskoteletten waren de ster van de avond. Perfecte service, alles op tijd geleverd. Echt een aanrader voor thuis grillen!',
    avatar: 'PL',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="#c9a84c" style={{ color: '#c9a84c' }} />
      ))}
    </div>
  )
}

export default function Reviews() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#c9a84c' }}>Reviews</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 mb-4">
            Wat onze klanten zeggen
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Stars count={5} />
            <span className="text-white font-bold">5.0</span>
            <span className="text-gray-400">· 100+ reviews</span>
          </div>
          <p className="text-gray-400 text-lg">
            Meer dan 500 tevreden klanten in België, Nederland en Frankrijk
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-dark rounded-2xl p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-black"
                    style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96a)' }}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{review.name}</p>
                    <p className="text-gray-500 text-xs">{review.event}</p>
                  </div>
                </div>
                <Quote size={18} style={{ color: 'rgba(201,168,76,0.3)' }} />
              </div>

              <Stars count={review.stars} />

              <p className="text-gray-400 text-sm leading-relaxed mt-3 flex-1">
                "{review.text}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Social proof banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm mb-4">Volg ons op sociale media</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://instagram.com/greekonthestreetbe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all hover:bg-white/5"
              style={{ borderColor: 'rgba(201,168,76,0.3)', color: '#c9a84c' }}
            >
              📸 Instagram
            </a>
            <a
              href="https://facebook.com/greekonthestreetbe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all hover:bg-white/5"
              style={{ borderColor: 'rgba(201,168,76,0.3)', color: '#c9a84c' }}
            >
              👍 Facebook
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

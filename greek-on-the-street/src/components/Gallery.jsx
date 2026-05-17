import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const photos = [
  {
    src: '/Cesare/images/team.jpeg',
    alt: 'Het Greek On The Street team met de foodtrucks',
    caption: 'Ons team — klaar voor elk evenement 🇬🇷',
    span: 'col-span-2',
  },
  {
    src: '/Cesare/images/buffet.jpeg',
    alt: 'Griekse dips en salades buffet',
    caption: 'Vers Grieks buffet 🍽️',
    span: '',
  },
  {
    src: '/Cesare/images/salade.jpeg',
    alt: 'Authentieke Griekse salade met feta',
    caption: 'Authentieke Griekse salade 🥗',
    span: '',
  },
  {
    src: '/Cesare/images/halloumi.jpeg',
    alt: 'Gegrilde halloumi schotel',
    caption: 'Gegrilde halloumi 🍋',
    span: '',
  },
  {
    src: '/Cesare/images/foodtruck-promo.jpeg',
    alt: 'Greek On The Street foodtruck bij nacht',
    caption: 'Greek On The Street Foodtruck 🚚',
    span: 'col-span-2',
  },
  {
    src: '/Cesare/images/team-selfie.jpeg',
    alt: 'Het Greek On The Street team',
    caption: 'Ons team 🇬🇷',
    span: '',
  },
  {
    src: '/Cesare/images/event-crowd.jpeg',
    alt: 'Druk evenement met de Greek On The Street foodtruck',
    caption: 'Onvergetelijke evenementen 🎉',
    span: '',
  },
]

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="galerij" className="py-24 px-4 sm:px-6" style={{ background: '#0d0d0d' }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#c9a84c' }}>Galerij</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 mb-4">
            Bekijk onze<br />
            <span className="gold-text">foodtrucks & gerechten</span>
          </h2>
          <p className="text-gray-400">Twee professionele foodtrucks, één doel: jouw evenement onvergetelijk maken.</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer ${photo.span || ''}`}
              style={{ aspectRatio: photo.span ? '16/7' : '4/3' }}
              onClick={() => setLightbox(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Fallback placeholder */}
              <div
                className="w-full h-full items-center justify-center text-4xl"
                style={{ display: 'none', background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.2)' }}
              >
                📸
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium">{photo.caption}</p>
              </div>
              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-opacity-60 transition-all duration-300" style={{ borderColor: 'rgba(201,168,76,0)' }} />
            </motion.div>
          ))}
        </div>

        {/* Social CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-400 text-sm mb-4">Meer foto's & video's op onze socials</p>
          <a
            href="https://instagram.com/greekonthestreetbe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border transition-all hover:bg-white/5"
            style={{ borderColor: 'rgba(201,168,76,0.4)', color: '#c9a84c' }}
          >
            📸 Volg ons op Instagram @greekonthestreetbe
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-4xl w-full relative" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} className="w-full rounded-2xl shadow-2xl" />
            <p className="text-center text-gray-300 mt-3 text-sm">{lightbox.caption}</p>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center text-lg hover:bg-white/20"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Zap, ShoppingBag, Gauge, BarChart3, MessageSquare, ChevronRight, Shield, TrendingUp, Bell, Star } from 'lucide-react'

function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const steps = 50
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            setCount(target)
            clearInterval(timer)
          } else {
            setCount(Math.floor(current))
          }
        }, duration / steps)
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count.toLocaleString('nl-BE')}{suffix}</span>
}

const features = [
  {
    icon: Search,
    title: 'VIN HistoryCheck',
    desc: 'Volledige historiek van elke wagen in seconden. Schadehistoriek, km-manipulatie detectie, aantal eigenaars en meer.',
    color: '#3b82f6',
    path: '/vin-check',
    badge: 'Populairste feature'
  },
  {
    icon: Zap,
    title: 'TuningLab',
    desc: 'Stage 1, 2 en 3 vermogenswinst voor jouw exacte auto. Kosten, risico-inschatting en erkende tuners in jouw buurt.',
    color: '#f97316',
    path: '/tuning',
    badge: null
  },
  {
    icon: ShoppingBag,
    title: 'PartMarket',
    desc: 'Bodykits, velgen, uitlaatsystemen en meer. Gefilterd op jouw auto met fitment-garantie en prijsvergelijking.',
    color: '#22c55e',
    path: '/parts',
    badge: null
  },
  {
    icon: Gauge,
    title: 'Mijn Garage',
    desc: 'Beheer al je wagens op één plek. Onderhoudshistoriek, APK-reminders en realtime marktwaarde tracking.',
    color: '#a855f7',
    path: '/garage',
    badge: null
  },
  {
    icon: BarChart3,
    title: 'Dyno Database',
    desc: 'Community-gedreven database van echte dynamomeetresultaten. Zie wat een bepaalde tune werkelijk oplevert.',
    color: '#ef4444',
    path: '/dyno',
    badge: null
  },
  {
    icon: MessageSquare,
    title: 'AI Aankoopcoach',
    desc: 'Plak een AutoScout of 2dehands advertentielink. AI analyseert prijs, risico\'s en geeft koopadvies.',
    color: '#06b6d4',
    path: '/coach',
    badge: 'Nieuw'
  },
]

const stats = [
  { value: 58000, suffix: '+', label: 'VIN rapporten', icon: Shield },
  { value: 2400, suffix: '+', label: 'Tuningcombinaties', icon: Zap },
  { value: 12000, suffix: '+', label: 'Parts in database', icon: ShoppingBag },
  { value: 3200, suffix: '+', label: 'Dyno runs', icon: BarChart3 },
]

const testimonials = [
  {
    name: "Jens V.",
    location: "Antwerpen",
    car: "Golf 8 GTI Stage 2",
    text: "Dankzij RevCheck vond ik de perfecte tuner voor mijn Golf. Het stage overzicht is goud waard — precies geweten wat ik nodig had voor Stage 2.",
    rating: 5
  },
  {
    name: "Sarah K.",
    location: "Gent",
    car: "Audi S3 — 2dehands aankoop",
    text: "VIN check toonde dat de kilomerstand gemanipuleerd was. Heeft me duizenden euro's bespaard. Absolute must voor elke tweedehandskopers.",
    rating: 5
  },
  {
    name: "Mike D.",
    location: "Rotterdam",
    text: "Beste auto-platform dat ik ooit gebruikt heb. Alles op één plek, Nederlandstalig en gefocust op onze markt. Eindelijk!",
    car: "BMW M340i",
    rating: 5
  },
]

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <div className="relative overflow-hidden" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(249,115,22,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(239,68,68,0.06) 0%, transparent 50%)'
        }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', color: '#f97316' }}>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              🇧🇪 🇳🇱  Gemaakt voor de Belgische en Nederlandse markt
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-6">
              Ken je auto<br />
              <span className="gradient-text">van binnen en buiten</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed">
              Het enige platform dat <strong className="text-white">historiek check</strong>,{' '}
              <strong className="text-white">tuningadvies op maat</strong> en een{' '}
              <strong className="text-white">parts marketplace</strong> combineert.
              Carfax + Dyno + Marketplace — maar dan lokaal en in het Nederlands.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/vin-check" className="btn-primary flex items-center gap-2 text-base">
                <Search size={18} />
                Check een auto gratis
                <ChevronRight size={16} />
              </Link>
              <Link to="/tuning" className="btn-secondary flex items-center gap-2 text-base">
                <Zap size={18} />
                Bekijk TuningLab
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield size={16} className="text-green-500" />
                Gratis basischeck
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Star size={16} className="text-yellow-500" />
                4.9/5 op basis van 2.400+ reviews
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Bell size={16} className="text-blue-500" />
                Diefstaldetectie inbegrepen
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ background: '#0d0e12', borderTop: '1px solid #1e2028', borderBottom: '1px solid #1e2028' }}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, suffix, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <Icon size={24} className="mx-auto mb-2" style={{ color: '#f97316' }} />
                <div className="text-3xl font-black text-white">
                  <CountUp target={value} suffix={suffix} />
                </div>
                <div className="text-sm text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Alles wat je nodig hebt als autoliefhebber
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Zes krachtige tools, één platform. Klaar om jouw auto-leven te transformeren.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc, color, path, badge }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={path} className="card block p-6 h-full transition-all duration-200 group"
                style={{ textDecoration: 'none' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
                    <Icon size={22} style={{ color }} />
                  </div>
                  {badge && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full"
                      style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}>
                      {badge}
                    </span>
                  )}
                </div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-medium" style={{ color }}>
                  Ontdek meer <ChevronRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: '#0d0e12', borderTop: '1px solid #1e2028', borderBottom: '1px solid #1e2028' }}>
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Hoe werkt het?</h2>
            <p className="text-gray-400 text-lg">In drie stappen van zero naar hero</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Vul kenteken of VIN in', desc: 'Geef het kenteken of VIN-nummer in van de auto die je wilt checken of kopen.' },
              { step: '02', title: 'Ontvang volledig rapport', desc: 'Binnen seconden zie je de volledige historiek, schadedata en koopadvies.' },
              { step: '03', title: 'Tuning & parts vinden', desc: 'Bekijk Stage 1/2/3 opties voor jouw auto en vind de beste parts direct via RevCheck.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="text-6xl font-black mb-4" style={{ color: 'rgba(249,115,22,0.2)' }}>{step}</div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Wat zeggen onze gebruikers?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, location, car, text, rating }) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#f97316" color="#f97316" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">"{text}"</p>
              <div>
                <div className="text-white font-semibold text-sm">{name}</div>
                <div className="text-gray-500 text-xs">{location} · {car}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="rounded-2xl p-10 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(239,68,68,0.1))', border: '1px solid rgba(249,115,22,0.2)' }}>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Klaar om je auto echt te kennen?
          </h2>
          <p className="text-gray-400 mb-8 text-lg max-w-xl mx-auto">
            Gratis basischeck. Volledig rapport voor slechts €4,99. Geen abonnement vereist.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/vin-check" className="btn-primary flex items-center gap-2 text-base">
              <Search size={18} />
              Start gratis check
            </Link>
            <Link to="/tuning" className="btn-secondary flex items-center gap-2 text-base">
              <Zap size={18} />
              Bekijk TuningLab
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

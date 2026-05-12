import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react'

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const contactInfo = [
  { Icon: Phone, label: 'Telefoon', value: '+32 476 24 23 61', href: 'tel:+32476242361' },
  { Icon: Mail, label: 'E-mail', value: 'greekonthestreetbe@gmail.com', href: 'mailto:greekonthestreetbe@gmail.com' },
  { Icon: InstagramIcon, label: 'Instagram', value: '@greekonthestreetbe', href: 'https://instagram.com/greekonthestreetbe' },
  { Icon: FacebookIcon, label: 'Facebook', value: 'greekonthestreetbe', href: 'https://facebook.com/greekonthestreetbe' },
  { Icon: MapPin, label: 'Regio', value: 'Genk — heel België, NL & FR', href: null },
]

const eventTypes = [
  'Bruiloft', 'Communie', 'Verjaardag', 'Bedrijfsfeest', 'Festival', 'BBQ thuis', 'Anders',
]

const formulas = [
  'Snacksto & Dips (€10/p)',
  'Broodjesformule (€15/p)',
  'Broodjes & Snacksto (€20/p)',
  'Classic Buffet (€25/p)',
  'Deluxe Buffet (€28/p)',
  'Buffet Royale (€35/p)',
  'BBQ Pakket (€12/p)',
  'Nog niet zeker',
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', eventType: '', formula: '', persons: '', date: '', message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Build mailto link
    const subject = `Offerte aanvraag — ${form.eventType} (${form.formula})`
    const body = `Naam: ${form.name}
Email: ${form.email}
Telefoon: ${form.phone}
Evenement: ${form.eventType}
Formule: ${form.formula}
Aantal personen: ${form.persons}
Datum: ${form.date}

Bericht:
${form.message}`
    window.location.href = `mailto:greekonthestreetbe@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6" style={{ background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#c9a84c' }}>Contact</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 mb-4">
            Vraag een gratis<br />
            <span className="gold-text">offerte aan</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Vertel ons over jouw evenement en wij sturen je zo snel mogelijk een voorstel op maat.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="card-dark rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-5">Contactgegevens</h3>
              <div className="space-y-4">
                {contactInfo.map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(201,168,76,0.15)' }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">{label}</p>
                      {href ? (
                        <a href={href} className="text-white text-sm hover:underline" target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                          {value}
                        </a>
                      ) : (
                        <p className="text-white text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/32476242361?text=Hallo!%20Ik%20ben%20ge%C3%AFnteresseerd%20in%20een%20catering%20offerte."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white transition-all hover:scale-105"
              style={{ background: '#25d366', boxShadow: '0 4px 20px rgba(37,211,102,0.3)' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Direct WhatsApp
            </a>

            {/* Quick call */}
            <a
              href="tel:+32476242361"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold border transition-all hover:bg-white/5"
              style={{ borderColor: 'rgba(201,168,76,0.4)', color: '#c9a84c' }}
            >
              <Phone size={18} />
              0476 24 23 61
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="card-dark rounded-2xl p-6 sm:p-8">
              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle size={52} className="mx-auto mb-4" style={{ color: '#c9a84c' }} />
                  <h3 className="text-white font-bold text-xl mb-2">Bedankt!</h3>
                  <p className="text-gray-400">Je e-mailprogramma is geopend. Verstuur de e-mail om je aanvraag af te ronden.</p>
                  <button onClick={() => setSent(false)} className="mt-6 text-sm underline" style={{ color: '#c9a84c' }}>
                    Nog een aanvraag
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5">Naam *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Jouw naam"
                        className="w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-opacity-60 transition-colors"
                        style={{ borderColor: 'rgba(201,168,76,0.2)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5">Telefoon *</label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+32 ..."
                        className="w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none transition-colors"
                        style={{ borderColor: 'rgba(201,168,76,0.2)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">E-mail</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="jouw@email.com"
                      className="w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none transition-colors"
                      style={{ borderColor: 'rgba(201,168,76,0.2)' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5">Type evenement *</label>
                      <select
                        required
                        value={form.eventType}
                        onChange={e => setForm({ ...form, eventType: e.target.value })}
                        className="w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                        style={{ borderColor: 'rgba(201,168,76,0.2)', background: '#1a1a1a' }}
                      >
                        <option value="" className="text-gray-400">Kies type...</option>
                        {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5">Formule</label>
                      <select
                        value={form.formula}
                        onChange={e => setForm({ ...form, formula: e.target.value })}
                        className="w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                        style={{ borderColor: 'rgba(201,168,76,0.2)', background: '#1a1a1a' }}
                      >
                        <option value="">Kies formule...</option>
                        {formulas.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5">Aantal personen *</label>
                      <input
                        required
                        type="number"
                        min="20"
                        value={form.persons}
                        onChange={e => setForm({ ...form, persons: e.target.value })}
                        placeholder="Min. 20"
                        className="w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none transition-colors"
                        style={{ borderColor: 'rgba(201,168,76,0.2)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5">Datum evenement</label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={e => setForm({ ...form, date: e.target.value })}
                        className="w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                        style={{ borderColor: 'rgba(201,168,76,0.2)', colorScheme: 'dark' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Extra info / wensen</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Vertel ons meer over je evenement, locatie, speciale wensen..."
                      className="w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none transition-colors resize-none"
                      style={{ borderColor: 'rgba(201,168,76,0.2)' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                    />
                  </div>

                  <button type="submit" className="btn-gold w-full py-4 rounded-xl flex items-center justify-center gap-2 text-base">
                    <Send size={18} />
                    Offerte Aanvragen
                  </button>

                  <p className="text-center text-gray-500 text-xs">
                    Wij antwoorden normaal gezien binnen 24 uur. Of bel ons direct op 0476 24 23 61.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

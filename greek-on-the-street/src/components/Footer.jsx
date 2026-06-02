import { Phone, Mail, Heart } from 'lucide-react'

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

export default function Footer() {
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#c9a84c' }}>
                <span className="text-lg font-black" style={{ color: '#c9a84c' }}>GS</span>
              </div>
              <div>
                <p className="text-white font-black text-sm">GREEK ON THE STREET</p>
                <p className="text-gray-500 text-xs">Authentieke Griekse Catering</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Vasili en Manoli brengen de échte smaken van Griekenland naar jouw evenement.
              Vers, authentiek en met passie bereid. 🇬🇷
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://instagram.com/greekonthestreetbe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all hover:bg-white/5"
                style={{ borderColor: 'rgba(201,168,76,0.3)' }}
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com/greekonthestreetbe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all hover:bg-white/5"
                style={{ borderColor: 'rgba(201,168,76,0.3)' }}
              >
                <FacebookIcon />
              </a>
              <a
                href="https://wa.me/32476242361"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all hover:bg-white/5"
                style={{ borderColor: 'rgba(201,168,76,0.3)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#c9a84c">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Navigatie</h4>
            <ul className="space-y-2">
              {[
                ['Home', '#home'],
                ['Formules & Prijzen', '#formules'],
                ['Over Ons', '#over-ons'],
                ['Reviews', '#reviews'],
                ['FAQ', '#faq'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-gray-400 text-sm hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+32476242361" className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors">
                  <Phone size={13} style={{ color: '#c9a84c' }} />
                  0476 24 23 61
                </a>
              </li>
              <li>
                <a href="mailto:greekonthestreetbe@gmail.com" className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors">
                  <Mail size={13} style={{ color: '#c9a84c' }} />
                  greekonthestreetbe@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-5">
              <p className="text-xs text-gray-500 mb-2">Actief in</p>
              <div className="flex flex-wrap gap-1.5">
                {['🇧🇪 België', '🇳🇱 Nederland', '🇫🇷 Frankrijk', '🇩🇪 Duitsland'].map(c => (
                  <span key={c} className="text-xs px-2 py-1 rounded-md" style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c' }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Greek On The Street. Alle rechten voorbehouden. · BTW BE0781.797.531
          </p>
          <p className="text-gray-600 text-xs flex items-center gap-1">
            Gemaakt met <Heart size={11} fill="#c9a84c" style={{ color: '#c9a84c' }} /> in België
          </p>
        </div>
      </div>
    </footer>
  )
}

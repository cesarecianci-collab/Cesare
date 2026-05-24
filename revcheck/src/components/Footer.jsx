import { NavLink } from 'react-router-dom'
import { Car, Code2, AtSign, Share2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#0a0b0d', borderTop: '1px solid #1e2028' }} className="mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}
                className="w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">RC</span>
              </div>
              <span className="font-black text-white text-xl">Rev<span style={{ color: '#f97316' }}>Check</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              De ultieme auto-companion voor Belgische en Nederlandse autoliefhebbers.
              Historiek check, tuningadvies, parts marketplace — alles in één.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="p-2 rounded-lg text-gray-500 hover:text-orange-500 transition-colors" style={{ background: '#111318' }}>
                <AtSign size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg text-gray-500 hover:text-orange-500 transition-colors" style={{ background: '#111318' }}>
                <Share2 size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg text-gray-500 hover:text-orange-500 transition-colors" style={{ background: '#111318' }}>
                <Code2 size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
            <ul className="space-y-2">
              {[
                { to: '/vin-check', label: 'VIN HistoryCheck' },
                { to: '/tuning', label: 'TuningLab' },
                { to: '/parts', label: 'PartMarket' },
                { to: '/garage', label: 'Mijn Garage' },
                { to: '/dyno', label: 'Dyno Database' },
                { to: '/coach', label: 'AI Aankoopcoach' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} className="text-gray-400 text-sm hover:text-orange-500 transition-colors">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Info</h4>
            <ul className="space-y-2">
              {['Over RevCheck', 'Prijzen', 'Privacy Policy', 'Voorwaarden', 'Contact', 'API voor bedrijven'].map(item => (
                <li key={item}>
                  <a href="#" className="text-gray-400 text-sm hover:text-orange-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1e2028' }} className="mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2025 RevCheck. Gebouwd voor autoliefhebbers in België & Nederland.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>🇧🇪 België</span>
            <span>🇳🇱 Nederland</span>
            <span>Alle prijzen incl. BTW</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

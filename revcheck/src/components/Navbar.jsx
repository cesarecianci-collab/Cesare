import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Car, Search, Zap, ShoppingBag, Gauge, BarChart3, MessageSquare, Menu, X } from 'lucide-react'

const navItems = [
  { path: '/', label: 'Home', icon: Car, exact: true },
  { path: '/vin-check', label: 'VIN Check', icon: Search },
  { path: '/tuning', label: 'TuningLab', icon: Zap },
  { path: '/parts', label: 'PartMarket', icon: ShoppingBag },
  { path: '/garage', label: 'Mijn Garage', icon: Gauge },
  { path: '/dyno', label: 'Dyno DB', icon: BarChart3 },
  { path: '/coach', label: 'AI Coach', icon: MessageSquare },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav style={{ background: 'rgba(10, 11, 13, 0.95)', borderBottom: '1px solid #1e2028', backdropFilter: 'blur(10px)' }}
        className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/" className="flex items-center gap-2">
              <div style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}
                className="w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">RC</span>
              </div>
              <span className="font-black text-white text-lg tracking-tight">Rev<span style={{ color: '#f97316' }}>Check</span></span>
            </NavLink>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-orange-500 bg-orange-500/10'
                        : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
                    }`
                  }
                >
                  <Icon size={15} />
                  {label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <NavLink to="/vin-check"
                className="hidden md:flex btn-primary text-sm py-2 px-4 rounded-lg font-semibold items-center gap-2">
                <Search size={14} />
                Check een auto
              </NavLink>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors">
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ background: '#0a0b0d', borderTop: '1px solid #1e2028' }} className="lg:hidden">
            <div className="px-4 py-3 space-y-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-orange-500 bg-orange-500/10'
                        : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
                    }`
                  }
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  )
}

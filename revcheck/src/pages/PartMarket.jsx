import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Star, ExternalLink, Filter, Search, CheckCircle, Package } from 'lucide-react'
import { partsData, partsCategories } from '../data/partsData'

const categoryIcons = {
  all: '🔧',
  bodykit: '🚗',
  velgen: '⚙️',
  uitlaat: '💨',
  intercooler: '❄️',
  remmen: '🛑',
  vering: '🔩',
  interieur: '🪑',
}

function ProductCard({ part }) {
  const discount = part.originalPrice
    ? Math.round(((part.originalPrice - part.price) / part.originalPrice) * 100)
    : 0

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="card overflow-hidden flex flex-col transition-all duration-200"
    >
      {/* Image placeholder */}
      <div className="h-44 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #111318, #1a1b21)' }}>
        <div className="text-center">
          <span className="text-4xl">{categoryIcons[part.category] || '🔧'}</span>
          {part.tags?.includes('sale') && (
            <div className="mt-2 text-xs font-bold text-white px-2 py-0.5 rounded-full"
              style={{ background: '#ef4444' }}>
              -{discount}%
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <div className="text-xs text-gray-500 font-medium">{part.brand}</div>
            <h3 className="text-white font-semibold text-sm leading-tight mt-0.5">{part.name}</h3>
          </div>
          {part.inStock
            ? <span className="shrink-0 text-xs text-green-500 flex items-center gap-1 mt-1"><CheckCircle size={11} />Op voorraad</span>
            : <span className="shrink-0 text-xs text-gray-500 mt-1">Bestelling</span>
          }
        </div>

        <div className="flex flex-wrap gap-1 my-2">
          {part.compatibility.slice(0, 2).map(c => (
            <span key={c} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: '#1a1b21', color: '#9ca3af', border: '1px solid #2d2d35' }}>
              {c}
            </span>
          ))}
          {part.compatibility.length > 2 && (
            <span className="text-xs px-2 py-0.5 rounded-full text-gray-500"
              style={{ background: '#1a1b21', border: '1px solid #2d2d35' }}>
              +{part.compatibility.length - 2}
            </span>
          )}
        </div>

        <div className="text-xs text-gray-500 mb-2">{part.material}</div>

        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              fill={i < Math.floor(part.rating) ? '#f97316' : 'none'}
              color={i < Math.floor(part.rating) ? '#f97316' : '#4b5563'}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">{part.rating} ({part.reviews})</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-black text-white">€{part.price.toLocaleString('nl-BE')}</span>
            {part.originalPrice && (
              <span className="text-sm text-gray-500 line-through">€{part.originalPrice}</span>
            )}
          </div>

          {part.fitmentGuarantee && (
            <div className="text-xs text-green-500 flex items-center gap-1 mb-3">
              <CheckCircle size={11} /> Fitment garantie
            </div>
          )}

          <a
            href="#"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold transition-all"
            style={{ background: '#1a1b21', border: '1px solid #2d2d35', color: '#f1f5f9' }}
            onMouseEnter={e => { e.target.style.borderColor = '#f97316'; e.target.style.color = '#f97316' }}
            onMouseLeave={e => { e.target.style.borderColor = '#2d2d35'; e.target.style.color = '#f1f5f9' }}
          >
            <ExternalLink size={14} />
            Bekijk op {part.shop}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function PartMarket() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')

  const filtered = partsData.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory
    const matchesSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.compatibility.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesPrice = priceFilter === 'all' ||
      (priceFilter === 'under500' && p.price < 500) ||
      (priceFilter === '500-1500' && p.price >= 500 && p.price <= 1500) ||
      (priceFilter === 'over1500' && p.price > 1500)
    return matchesCat && matchesSearch && matchesPrice
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-3">
            Part<span className="gradient-text">Market</span>
          </h1>
          <p className="text-gray-400 text-lg">Bodykits, velgen, uitlaat en meer — gefilterd op jouw auto</p>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Zoek op naam, merk of auto..."
                className="pl-10"
              />
            </div>
            <select
              value={priceFilter}
              onChange={e => setPriceFilter(e.target.value)}
              style={{ width: 'auto', minWidth: '180px' }}
            >
              <option value="all">Alle prijzen</option>
              <option value="under500">Onder €500</option>
              <option value="500-1500">€500 — €1.500</option>
              <option value="over1500">Boven €1.500</option>
            </select>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {partsCategories.map(({ id, name }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: activeCategory === id ? 'rgba(249,115,22,0.15)' : '#111318',
                color: activeCategory === id ? '#f97316' : '#9ca3af',
                border: activeCategory === id ? '1px solid rgba(249,115,22,0.4)' : '1px solid #1e2028'
              }}
            >
              <span>{categoryIcons[id]}</span>
              {name}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-gray-400 text-sm">
            <span className="text-white font-semibold">{filtered.length}</span> producten gevonden
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Package size={13} />
            Prijzen incl. BTW · Links naar officiële webshops
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={48} className="mx-auto mb-4 text-gray-700" />
            <p className="text-gray-500">Geen producten gevonden voor deze filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(part => (
              <ProductCard key={part.id} part={part} />
            ))}
          </div>
        )}

        {/* CTA to list */}
        <div className="mt-12 card p-6 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(249,115,22,0.05))', border: '1px solid rgba(34,197,94,0.2)' }}>
          <h3 className="text-white font-bold text-lg mb-2">Webshop of tuner?</h3>
          <p className="text-gray-400 text-sm mb-4">
            Lijst jouw producten op RevCheck en bereik duizenden autoliefhebbers in België en Nederland.
          </p>
          <button className="btn-primary">Neem contact op — B2B partnerships</button>
        </div>
      </motion.div>
    </div>
  )
}

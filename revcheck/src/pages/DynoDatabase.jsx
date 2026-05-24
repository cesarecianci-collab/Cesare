import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Heart, MessageSquare, BadgeCheck, MapPin, Fuel, Upload, Search, ChevronUp } from 'lucide-react'
import { dynoRuns } from '../data/dynoData'

function DynoCard({ run }) {
  const [liked, setLiked] = useState(false)
  const powerGain = run.dynoPower - run.stockPower
  const torqueGain = run.dynoTorque - run.stockTorque
  const powerPct = Math.round((powerGain / run.stockPower) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="card overflow-hidden transition-all"
    >
      {/* Header strip */}
      <div className="px-5 py-3 flex items-center justify-between"
        style={{ background: '#0d0e12', borderBottom: '1px solid #1e2028' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}>
            {run.avatar}
          </div>
          <div>
            <span className="text-white text-sm font-semibold">{run.user}</span>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin size={10} />
              {run.location} · {run.date}
            </div>
          </div>
        </div>
        {run.verified && (
          <div className="flex items-center gap-1 text-xs text-blue-400">
            <BadgeCheck size={14} />
            Geverifieerd
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-white font-bold text-lg">{run.car} <span className="text-gray-500 font-normal">{run.year}</span></h3>
          <p className="text-gray-400 text-sm">{run.tune}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#1a1b21', color: '#9ca3af', border: '1px solid #2d2d35' }}>
              {run.dynoType}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: '#1a1b21', color: '#9ca3af', border: '1px solid #2d2d35' }}>
              <Fuel size={10} /> {run.fuel}
            </span>
          </div>
        </div>

        {/* Power comparison */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Vermogen (pk)</div>
            <div className="space-y-1.5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Stock</span>
                  <span className="text-gray-400">{run.stockPower}</span>
                </div>
                <div className="power-bar-track">
                  <div style={{ height: '6px', width: `${(run.stockPower / run.dynoPower) * 100}%`, background: '#374151', borderRadius: '999px' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-orange-400 font-medium">Tuned</span>
                  <span className="text-white font-semibold">{run.dynoPower}</span>
                </div>
                <div className="power-bar-track">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ height: '6px', background: 'linear-gradient(90deg, #f97316, #ef4444)', borderRadius: '999px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Koppel (Nm)</div>
            <div className="space-y-1.5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Stock</span>
                  <span className="text-gray-400">{run.stockTorque}</span>
                </div>
                <div className="power-bar-track">
                  <div style={{ height: '6px', width: `${(run.stockTorque / run.dynoTorque) * 100}%`, background: '#374151', borderRadius: '999px' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-orange-400 font-medium">Tuned</span>
                  <span className="text-white font-semibold">{run.dynoTorque}</span>
                </div>
                <div className="power-bar-track">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                    style={{ height: '6px', background: 'linear-gradient(90deg, #a855f7, #ec4899)', borderRadius: '999px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gains */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-2 rounded-lg" style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)' }}>
            <div className="text-orange-400 font-black text-xl">+{powerGain} <span className="text-sm font-normal">pk</span></div>
            <div className="text-xs text-gray-400">+{powerPct}% vermogen</div>
          </div>
          <div className="text-center p-2 rounded-lg" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}>
            <div className="font-black text-xl" style={{ color: '#a855f7' }}>+{torqueGain} <span className="text-sm font-normal">Nm</span></div>
            <div className="text-xs text-gray-400">koppelwinst</div>
          </div>
        </div>

        {run.notes && (
          <p className="text-gray-400 text-xs italic mb-4 leading-relaxed">"{run.notes}"</p>
        )}

        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #1e2028' }}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-1.5 text-sm transition-colors"
              style={{ color: liked ? '#f97316' : '#6b7280' }}
            >
              <Heart size={15} fill={liked ? '#f97316' : 'none'} />
              {run.likes + (liked ? 1 : 0)}
            </button>
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <MessageSquare size={15} />
              {run.comments}
            </span>
          </div>
          <div className="text-xs text-gray-600">Tuner: {run.tuner}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function DynoDatabase() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('recent')

  const filtered = dynoRuns.filter(r =>
    !search || r.car.toLowerCase().includes(search.toLowerCase()) ||
    r.tune.toLowerCase().includes(search.toLowerCase()) ||
    r.tuner.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'gain') return (b.dynoPower - b.stockPower) - (a.dynoPower - a.stockPower)
    if (sortBy === 'power') return b.dynoPower - a.dynoPower
    if (sortBy === 'likes') return b.likes - a.likes
    return new Date(b.date) - new Date(a.date)
  })

  const totalRuns = dynoRuns.length
  const avgGain = Math.round(dynoRuns.reduce((s, r) => s + (r.dynoPower - r.stockPower), 0) / totalRuns)
  const maxPower = Math.max(...dynoRuns.map(r => r.dynoPower))

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-3">
            Dyno <span className="gradient-text">Database</span>
          </h1>
          <p className="text-gray-400 text-lg">Echte dynamomeetresultaten van de community</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Totaal dynoruns', value: `${totalRuns}+` },
            { label: 'Gemiddelde pk-winst', value: `+${avgGain} pk` },
            { label: 'Hoogste dyno', value: `${maxPower} pk` },
          ].map(({ label, value }) => (
            <div key={label} className="card p-4 text-center">
              <div className="text-2xl font-black text-white">{value}</div>
              <div className="text-gray-500 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Zoek op auto, tune of tuner..."
                className="pl-10"
              />
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: 'auto', minWidth: '180px' }}>
              <option value="recent">Meest recent</option>
              <option value="gain">Hoogste pk-winst</option>
              <option value="power">Hoogste vermogen</option>
              <option value="likes">Meeste likes</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <p className="text-gray-400 text-sm">
            <span className="text-white font-semibold">{filtered.length}</span> dynoruns gevonden
          </p>
          <button className="btn-primary flex items-center gap-2 text-sm py-2 px-4">
            <Upload size={14} />
            Upload jouw dynorun
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(run => (
            <DynoCard key={run.id} run={run} />
          ))}
        </div>

        <div className="mt-8 card p-6 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(249,115,22,0.05))', border: '1px solid rgba(239,68,68,0.2)' }}>
          <ChevronUp size={24} className="mx-auto mb-2 text-red-400" />
          <h3 className="text-white font-bold text-lg mb-2">Jouw dynorun toevoegen</h3>
          <p className="text-gray-400 text-sm mb-4 max-w-md mx-auto">
            Deel jouw dynamomeetresultaten met de community. Uploaden is gratis en helpt andere autoliefhebbers.
          </p>
          <button className="btn-primary">Upload dynorun — gratis</button>
        </div>
      </motion.div>
    </div>
  )
}

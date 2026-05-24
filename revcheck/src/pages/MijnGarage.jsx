import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gauge, Plus, Car, Wrench, Bell, TrendingUp, TrendingDown, Zap, ShoppingBag, X, Calendar, Fuel } from 'lucide-react'
import { Link } from 'react-router-dom'

const demoGarage = [
  {
    id: 1,
    merk: 'Volkswagen',
    model: 'Golf 8 GTI',
    jaar: 2022,
    kleur: '#1a1a2e',
    colorName: 'Nardo Grey',
    km: 67500,
    brandstof: 'Benzine',
    kenteken: '1-ORA-459',
    volgendeBeurt: '2025-03-14',
    volgendeBeurtkm: 75000,
    apkDatum: '2025-08-22',
    marktwaarde: 32500,
    aankoopprijs: 41900,
    tuningStage: 'Stage 2 — Revo',
    pk: 338,
    services: [
      { datum: '2024-01-15', werk: 'Olie wissel + filters', km: 55000, kost: 189 },
      { datum: '2023-06-20', werk: 'Remblokken voor + remschijven', km: 42000, kost: 420 },
      { datum: '2022-11-08', werk: 'Grote beurt', km: 30000, kost: 680 },
    ],
    reminders: [
      { type: 'Olie wissel', daysLeft: 23, urgent: false },
      { type: 'APK keuring', daysLeft: 89, urgent: false },
    ]
  },
  {
    id: 2,
    merk: 'BMW',
    model: 'M340i G20',
    jaar: 2021,
    kleur: '#0f3460',
    colorName: 'Portimao Blue',
    km: 48200,
    brandstof: 'Benzine',
    kenteken: '1-BLU-223',
    volgendeBeurt: '2025-06-01',
    volgendeBeurtkm: 55000,
    apkDatum: '2026-01-15',
    marktwaarde: 54900,
    aankoopprijs: 62000,
    tuningStage: 'Stage 1 — MHD',
    pk: 440,
    services: [
      { datum: '2024-03-10', werk: 'Olie wissel BMW Long Life', km: 40000, kost: 245 },
      { datum: '2023-09-22', werk: 'Remblokken + vloeistoffen', km: 32000, kost: 580 },
    ],
    reminders: [
      { type: 'Koelvloeistof check', daysLeft: 5, urgent: true },
    ]
  }
]

function AddCarModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ merk: '', model: '', jaar: '', km: '', kenteken: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({
      id: Date.now(),
      ...form,
      jaar: parseInt(form.jaar),
      km: parseInt(form.km),
      kleur: '#1a1a1a',
      colorName: 'Onbekend',
      brandstof: 'Benzine',
      volgendeBeurt: '2025-06-01',
      volgendeBeurtkm: parseInt(form.km) + 10000,
      apkDatum: '2026-01-01',
      marktwaarde: 0,
      aankoopprijs: 0,
      tuningStage: 'Stock',
      pk: 0,
      services: [],
      reminders: []
    })
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="card w-full max-w-md p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-lg">Wagen toevoegen</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Merk</label>
              <input value={form.merk} onChange={e => setForm({ ...form, merk: e.target.value })}
                placeholder="bv. Volkswagen" required />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Model</label>
              <input value={form.model} onChange={e => setForm({ ...form, model: e.target.value })}
                placeholder="bv. Golf 8 GTI" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Bouwjaar</label>
              <input type="number" value={form.jaar} onChange={e => setForm({ ...form, jaar: e.target.value })}
                placeholder="2022" min="1990" max="2025" required />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Km-stand</label>
              <input type="number" value={form.km} onChange={e => setForm({ ...form, km: e.target.value })}
                placeholder="45000" required />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Kenteken</label>
            <input value={form.kenteken} onChange={e => setForm({ ...form, kenteken: e.target.value.toUpperCase() })}
              placeholder="1-ABC-234" />
          </div>
          <div className="flex gap-3 mt-5">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Annuleren</button>
            <button type="submit" className="btn-primary flex-1">Toevoegen</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

function CarCard({ car, onSelect, isSelected }) {
  const waardeDaling = car.aankoopprijs > 0
    ? Math.round(((car.aankoopprijs - car.marktwaarde) / car.aankoopprijs) * 100)
    : 0

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onSelect}
      className="card cursor-pointer transition-all"
      style={{
        borderColor: isSelected ? '#f97316' : undefined,
        boxShadow: isSelected ? '0 0 20px rgba(249,115,22,0.15)' : undefined
      }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: car.kleur + '40', border: `2px solid ${car.kleur}` }}>
              <Car size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold">{car.merk} {car.model}</h3>
              <p className="text-gray-500 text-xs">{car.jaar} · {car.colorName}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">{car.kenteken}</div>
            <div className="text-sm font-semibold text-orange-500">{car.pk} pk</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 rounded-lg" style={{ background: '#1a1b21' }}>
            <div className="text-white font-bold text-sm">{(car.km / 1000).toFixed(1)}k</div>
            <div className="text-gray-500 text-xs">km</div>
          </div>
          <div className="text-center p-2 rounded-lg" style={{ background: '#1a1b21' }}>
            <div className="text-white font-bold text-sm">€{(car.marktwaarde / 1000).toFixed(0)}k</div>
            <div className="text-gray-500 text-xs flex items-center justify-center gap-0.5">
              {waardeDaling > 0
                ? <><TrendingDown size={10} className="text-red-400" /> -{waardeDaling}%</>
                : <span>Waarde</span>
              }
            </div>
          </div>
          <div className="text-center p-2 rounded-lg" style={{ background: '#1a1b21' }}>
            <div className="text-white font-bold text-sm">{car.tuningStage.split('—')[0].trim()}</div>
            <div className="text-gray-500 text-xs">Tune</div>
          </div>
        </div>

        {car.reminders.length > 0 && (
          <div className="space-y-1">
            {car.reminders.map(r => (
              <div key={r.type}
                className="flex items-center justify-between text-xs p-2 rounded-lg"
                style={{
                  background: r.urgent ? 'rgba(239,68,68,0.1)' : 'rgba(234,179,8,0.08)',
                  border: `1px solid ${r.urgent ? 'rgba(239,68,68,0.3)' : 'rgba(234,179,8,0.2)'}`
                }}>
                <span className="flex items-center gap-1" style={{ color: r.urgent ? '#ef4444' : '#eab308' }}>
                  <Bell size={11} />
                  {r.type}
                </span>
                <span style={{ color: r.urgent ? '#ef4444' : '#eab308' }}>
                  over {r.daysLeft} dagen
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function MijnGarage() {
  const [cars, setCars] = useState(demoGarage)
  const [selectedCar, setSelectedCar] = useState(demoGarage[0])
  const [showAddModal, setShowAddModal] = useState(false)
  const [activeTab, setActiveTab] = useState('service')

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-white mb-1">
              Mijn <span className="gradient-text">Garage</span>
            </h1>
            <p className="text-gray-400">{cars.length} wagen{cars.length !== 1 ? 's' : ''} in jouw garage</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
            <Plus size={16} />
            Wagen toevoegen
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Car list */}
          <div className="space-y-4">
            {cars.map(car => (
              <CarCard
                key={car.id}
                car={car}
                isSelected={selectedCar?.id === car.id}
                onSelect={() => setSelectedCar(car)}
              />
            ))}
          </div>

          {/* Detail panel */}
          {selectedCar && (
            <div className="lg:col-span-2 space-y-4">
              <div className="card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: selectedCar.kleur + '40', border: `2px solid ${selectedCar.kleur}` }}>
                    <Car size={22} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white">{selectedCar.merk} {selectedCar.model}</h2>
                    <p className="text-gray-400 text-sm">{selectedCar.jaar} · {selectedCar.kenteken} · {selectedCar.brandstof}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Km-stand', value: `${selectedCar.km.toLocaleString('nl-BE')} km`, icon: Gauge },
                    { label: 'Vermogen', value: `${selectedCar.pk} pk`, icon: Zap },
                    { label: 'APK t/m', value: selectedCar.apkDatum, icon: Calendar },
                    { label: 'Tune', value: selectedCar.tuningStage, icon: Wrench },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="p-3 rounded-lg text-center" style={{ background: '#1a1b21' }}>
                      <Icon size={16} className="mx-auto mb-1 text-orange-500" />
                      <div className="text-white font-semibold text-sm">{value}</div>
                      <div className="text-gray-500 text-xs">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2">
                {[
                  { id: 'service', label: 'Onderhoud' },
                  { id: 'waarde', label: 'Waarde tracker' },
                  { id: 'quick', label: 'Snelle links' },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: activeTab === id ? 'rgba(249,115,22,0.15)' : '#111318',
                      color: activeTab === id ? '#f97316' : '#9ca3af',
                      border: activeTab === id ? '1px solid rgba(249,115,22,0.4)' : '1px solid #1e2028'
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {activeTab === 'service' && (
                <div className="card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold flex items-center gap-2">
                      <Wrench size={16} className="text-orange-500" />
                      Onderhoudshistoriek
                    </h3>
                    <div className="text-xs text-gray-500">
                      Volgende beurt: <span className="text-white">{selectedCar.volgendeBeurtkm.toLocaleString('nl-BE')} km</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {selectedCar.services.map((s, i) => (
                      <div key={i} className="flex items-start justify-between p-3 rounded-lg"
                        style={{ background: '#1a1b21', border: '1px solid #2d2d35' }}>
                        <div>
                          <div className="text-white text-sm font-medium">{s.werk}</div>
                          <div className="text-gray-500 text-xs mt-0.5">{s.datum} · {s.km.toLocaleString('nl-BE')} km</div>
                        </div>
                        <div className="text-orange-400 font-semibold text-sm shrink-0 ml-3">€{s.kost}</div>
                      </div>
                    ))}
                  </div>
                  <button className="btn-secondary w-full mt-4 text-sm flex items-center justify-center gap-2">
                    <Plus size={14} />
                    Onderhoud toevoegen
                  </button>
                </div>
              )}

              {activeTab === 'waarde' && (
                <div className="card p-5">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <TrendingUp size={16} className="text-orange-500" />
                    Marktwaarde tracker
                  </h3>
                  <div className="grid grid-cols-3 gap-4 mb-5">
                    <div className="text-center p-3 rounded-lg" style={{ background: '#1a1b21' }}>
                      <div className="text-gray-400 text-xs mb-1">Aankoopprijs</div>
                      <div className="text-white font-bold">€{selectedCar.aankoopprijs.toLocaleString('nl-BE')}</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: '#1a1b21' }}>
                      <div className="text-gray-400 text-xs mb-1">Huidige waarde</div>
                      <div className="text-white font-bold">€{selectedCar.marktwaarde.toLocaleString('nl-BE')}</div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)' }}>
                      <div className="text-gray-400 text-xs mb-1">Waardevermindering</div>
                      <div className="text-red-400 font-bold">
                        -€{(selectedCar.aankoopprijs - selectedCar.marktwaarde).toLocaleString('nl-BE')}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg text-sm"
                    style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
                    <p className="text-gray-300">
                      De markt voor de {selectedCar.model} is stabiel. Beste verkooptijd: voorjaar (maart-mei).
                      Tuning (Stage 2) kan de wederverkoopwaarde bij goed gedocumenteerde tuners licht verhogen.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'quick' && (
                <div className="card p-5">
                  <h3 className="text-white font-bold mb-4">Snelle acties voor de {selectedCar.model}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Link to="/vin-check"
                      className="p-4 rounded-lg flex items-center gap-3 transition-all"
                      style={{ background: '#1a1b21', border: '1px solid #2d2d35', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#3b82f6'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#2d2d35'}
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.2)' }}>
                        <Gauge size={18} style={{ color: '#3b82f6' }} />
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold">VIN check</div>
                        <div className="text-gray-500 text-xs">Controleer historiek</div>
                      </div>
                    </Link>
                    <Link to="/tuning"
                      className="p-4 rounded-lg flex items-center gap-3 transition-all"
                      style={{ background: '#1a1b21', border: '1px solid #2d2d35', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#f97316'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#2d2d35'}
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.2)' }}>
                        <Zap size={18} className="text-orange-500" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold">TuningLab</div>
                        <div className="text-gray-500 text-xs">Stage opties bekijken</div>
                      </div>
                    </Link>
                    <Link to="/parts"
                      className="p-4 rounded-lg flex items-center gap-3 transition-all"
                      style={{ background: '#1a1b21', border: '1px solid #2d2d35', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#22c55e'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#2d2d35'}
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.2)' }}>
                        <ShoppingBag size={18} style={{ color: '#22c55e' }} />
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold">PartMarket</div>
                        <div className="text-gray-500 text-xs">Parts voor deze auto</div>
                      </div>
                    </Link>
                    <Link to="/dyno"
                      className="p-4 rounded-lg flex items-center gap-3 transition-all"
                      style={{ background: '#1a1b21', border: '1px solid #2d2d35', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#ef4444'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#2d2d35'}
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.2)' }}>
                        <Fuel size={18} style={{ color: '#ef4444' }} />
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold">Dyno Database</div>
                        <div className="text-gray-500 text-xs">Dynoruns voor dit model</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showAddModal && (
          <AddCarModal
            onClose={() => setShowAddModal(false)}
            onAdd={car => setCars([...cars, car])}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

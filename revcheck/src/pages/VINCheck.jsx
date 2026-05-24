import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Shield, AlertTriangle, XCircle, CheckCircle, Clock, Users, Wrench, Globe, Car, TrendingDown, Lock, ChevronDown } from 'lucide-react'

const demoReport = {
  vin: 'WVWZZZ8PZMU012345',
  kenteken: '1-ABC-234',
  merk: 'Volkswagen',
  model: 'Golf 8 GTI',
  bouwjaar: 2021,
  kleur: 'Nardo Grey',
  brandstof: 'Benzine',
  cilinderinhoud: '1984cc',
  vermogen: '245pk',
  transmissie: 'DSG 7-traps',
  aantalEigenaars: 2,
  eersteInschrijving: '14-03-2021',
  landInschrijving: 'België',
  score: 78,
  verdict: 'Kopen',
  verdictColor: '#22c55e',
  kmStand: [
    { datum: '2021-03-14', km: 0, bron: 'Nieuwe inschrijving' },
    { datum: '2022-01-08', km: 18450, bron: 'Onderhoud dealer' },
    { datum: '2022-09-14', km: 35200, bron: 'APK keuring' },
    { datum: '2023-07-20', km: 58900, bron: 'Onderhoud dealer' },
    { datum: '2024-03-01', km: 79400, bron: 'Eigenaar wissel' },
    { datum: '2024-11-15', km: 94200, bron: 'Meest recente check' },
  ],
  checks: [
    { label: 'Gestolen voertuig', status: 'ok', detail: 'Niet geregistreerd als gestolen in EU-database' },
    { label: 'Km-manipulatie', status: 'ok', detail: 'Kilometerstand consistent — geen manipulatie gedetecteerd' },
    { label: 'Schadehistoriek', status: 'warning', detail: '1 schademelding gevonden — lichte aanrijding rechts voor (2022)' },
    { label: 'Technische keuring', status: 'ok', detail: 'Geslaagd voor laatste keuring — geldig tot 14-03-2025' },
    { label: 'Financiering/schuld', status: 'ok', detail: 'Geen openstaande financiering of beslagen gevonden' },
    { label: 'Recalls', status: 'warning', detail: '1 openstaande recall: software update airbag module (gratis dealer)' },
    { label: 'Fabrieksgarantie', status: 'warning', detail: 'Garantie vervallen — overschreden 3-jaar limiet' },
    { label: 'Import / export', status: 'ok', detail: 'Origineel Belgisch voertuig, nooit geëxporteerd' },
    { label: 'Watervoertuig / vloed', status: 'ok', detail: 'Geen indicatie van waterschade' },
    { label: 'Total loss registratie', status: 'ok', detail: 'Niet geregistreerd als total loss in EU database' },
  ],
  onderhoud: [
    { datum: '2022-01-08', km: 18450, werk: 'Kleine beurt — olie en filters', dealer: 'VW Antwerpen Noord' },
    { datum: '2023-02-14', km: 47200, werk: 'Grote beurt — olie, filters, bougies, remvloeistof', dealer: 'VW Dealer' },
    { datum: '2023-07-20', km: 58900, werk: 'Remblokken voor vervangen', dealer: 'VW Dealer' },
    { datum: '2024-01-09', km: 84100, werk: 'Olie wissel + luchtfilter', dealer: 'Onbekend garage' },
  ],
  vragen: [
    'Waarom werd de auto na 79.400 km verkocht?',
    'Is de recall voor de airbag module al uitgevoerd?',
    'Wat was de exacte schade aan rechts voor in 2022?',
    'Is de auto ooit op een circuit of trackday geweest?',
  ]
}

function StatusIcon({ status }) {
  if (status === 'ok') return <CheckCircle size={18} color="#22c55e" />
  if (status === 'warning') return <AlertTriangle size={18} color="#eab308" />
  return <XCircle size={18} color="#ef4444" />
}

function ScoreRing({ score }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference
  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444'

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="130" height="130" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="65" cy="65" r={radius} fill="none" stroke="#1e2028" strokeWidth="10" />
        <motion.circle
          cx="65" cy="65" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-black text-white">{score}</div>
        <div className="text-xs text-gray-400">/100</div>
      </div>
    </div>
  )
}

export default function VINCheck() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState(null)
  const [activeSection, setActiveSection] = useState('overview')

  const handleCheck = async (e) => {
    e.preventDefault()
    if (!input.trim() && !report) {
      setReport(demoReport)
      return
    }
    setLoading(true)
    setReport(null)
    await new Promise(r => setTimeout(r, 2200))
    setLoading(false)
    setReport(demoReport)
  }

  const handleDemo = () => {
    setInput('WVWZZZ8PZMU012345')
    setLoading(true)
    setReport(null)
    setTimeout(() => {
      setLoading(false)
      setReport(demoReport)
    }, 2200)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-3">VIN <span className="gradient-text">HistoryCheck</span></h1>
          <p className="text-gray-400 text-lg">Geef het VIN-nummer of kenteken in en ontdek de volledige geschiedenis</p>
        </div>

        <div className="card p-6 mb-8 glow-orange">
          <form onSubmit={handleCheck} className="flex gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value.toUpperCase())}
                placeholder="VIN bijv. WVWZZZ8PZMU012345 of kenteken 1-ABC-234"
                className="pl-11 font-mono tracking-wider"
                style={{ fontSize: '15px' }}
              />
            </div>
            <button type="submit" className="btn-primary px-6 whitespace-nowrap">
              {loading ? 'Controleren...' : 'Controleer'}
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <button onClick={handleDemo} className="text-sm text-orange-500 hover:text-orange-400 underline">
              Probeer demo rapport
            </button>
            <span className="text-gray-600 text-sm">·</span>
            <span className="text-gray-500 text-sm flex items-center gap-1"><Shield size={13} /> Gratis basischeck · Volledig rapport €4,99</span>
          </div>
        </div>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card p-10 text-center"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-16 h-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 rounded-full border-2 border-t-orange-500"
                  style={{ borderColor: '#1e2028', borderTopColor: '#f97316' }}
                />
                <Search size={20} className="absolute inset-0 m-auto text-orange-500" />
              </div>
              <div className="space-y-2">
                <p className="text-white font-semibold">Historiek wordt gecheckt...</p>
                {['Gestolen voertuigenregister', 'Schadehistoriek EU', 'Kilometerstand verificatie', 'Technische keuringen', 'Financiële beslagen'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.35 }}
                    className="text-sm text-gray-400 flex items-center gap-2 justify-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {report && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Header */}
              <div className="card p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1 font-mono">{report.vin}</div>
                    <h2 className="text-2xl font-black text-white">{report.merk} {report.model} {report.bouwjaar}</h2>
                    <div className="flex flex-wrap gap-3 mt-3">
                      {[
                        report.kleur,
                        report.brandstof,
                        report.vermogen,
                        report.transmissie
                      ].map(tag => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full"
                          style={{ background: '#1e2028', color: '#9ca3af' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <ScoreRing score={report.score} />
                    <div className="mt-2">
                      <span className="text-sm font-bold px-3 py-1 rounded-full"
                        style={{ background: `${report.verdictColor}20`, color: report.verdictColor, border: `1px solid ${report.verdictColor}40` }}>
                        ✓ {report.verdict}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nav tabs */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'overview', label: 'Overzicht' },
                  { id: 'km', label: 'Km-verloop' },
                  { id: 'onderhoud', label: 'Onderhoud' },
                  { id: 'vragen', label: 'Stel deze vragen' },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: activeSection === id ? 'rgba(249,115,22,0.15)' : '#111318',
                      color: activeSection === id ? '#f97316' : '#9ca3af',
                      border: activeSection === id ? '1px solid rgba(249,115,22,0.4)' : '1px solid #1e2028'
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {activeSection === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.checks.map(({ label, status, detail }) => (
                    <div key={label} className="card p-4 flex items-start gap-3">
                      <StatusIcon status={status} />
                      <div>
                        <div className="text-white text-sm font-semibold">{label}</div>
                        <div className="text-gray-400 text-xs mt-0.5">{detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'km' && (
                <div className="card p-6">
                  <h3 className="text-white font-bold mb-5 flex items-center gap-2">
                    <TrendingDown size={18} className="text-orange-500" />
                    Kilometerstand verloop
                  </h3>
                  <div className="space-y-4">
                    {report.kmStand.map(({ datum, km, bron }, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-32 text-xs text-gray-500 shrink-0">{datum}</div>
                        <div className="flex-1 relative">
                          <div className="power-bar-track">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(km / 100000) * 100}%` }}
                              transition={{ duration: 0.8, delay: i * 0.1 }}
                              style={{ height: '8px', background: 'linear-gradient(90deg, #f97316, #ef4444)', borderRadius: '999px' }}
                            />
                          </div>
                        </div>
                        <div className="text-right w-28 shrink-0">
                          <div className="text-white text-sm font-semibold">{km.toLocaleString('nl-BE')} km</div>
                          <div className="text-gray-500 text-xs">{bron}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'onderhoud' && (
                <div className="card p-6">
                  <h3 className="text-white font-bold mb-5 flex items-center gap-2">
                    <Wrench size={18} className="text-orange-500" />
                    Onderhoudshistoriek
                  </h3>
                  <div className="space-y-3">
                    {report.onderhoud.map(({ datum, km, werk, dealer }, i) => (
                      <div key={i} className="p-4 rounded-lg flex items-start gap-4" style={{ background: '#1a1b21', border: '1px solid #2d2d35' }}>
                        <Wrench size={16} className="text-orange-500 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">{werk}</div>
                          <div className="text-gray-500 text-xs mt-1">{dealer}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-gray-400 text-xs">{datum}</div>
                          <div className="text-gray-500 text-xs">{km.toLocaleString('nl-BE')} km</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'vragen' && (
                <div className="card p-6">
                  <h3 className="text-white font-bold mb-5">Stel deze vragen aan de verkoper</h3>
                  <div className="space-y-3">
                    {report.vragen.map((vraag, i) => (
                      <div key={i} className="p-4 rounded-lg flex items-start gap-3"
                        style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.2)' }}>
                        <span className="text-orange-500 font-bold text-sm shrink-0">{i + 1}.</span>
                        <span className="text-gray-300 text-sm">{vraag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA unlock */}
              <div className="card p-6 text-center"
                style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(239,68,68,0.05))', border: '1px solid rgba(249,115,22,0.2)' }}>
                <Lock size={32} className="mx-auto mb-3 text-orange-500" />
                <h3 className="text-white font-bold text-lg mb-2">Ontgrendel het volledige rapport</h3>
                <p className="text-gray-400 text-sm mb-4 max-w-md mx-auto">
                  Inclusief alle verzekeringsdata, gedetailleerde schadefotos, originele technische keuringsdocumenten en meer.
                </p>
                <button className="btn-primary mx-auto">
                  Volledig rapport — €4,99
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

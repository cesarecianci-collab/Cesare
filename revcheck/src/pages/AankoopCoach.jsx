import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Link2, AlertTriangle, CheckCircle, XCircle, Lightbulb, TrendingDown, HelpCircle, Star } from 'lucide-react'

const demoAnalysis = {
  url: 'https://www.2dehands.be/auto/volkswagen/golf/...',
  car: 'Volkswagen Golf 8 GTI',
  vraagprijs: 35900,
  marktwaarde: 33500,
  prijsoordeel: 'Te duur',
  prijsColor: '#eab308',
  overallScore: 65,
  verdict: 'Opletten',
  verdictColor: '#eab308',
  samenvatting: 'Deze Golf 8 GTI heeft een vraagprijs die iets boven de huidige marktwaarde ligt. Er zijn een paar gele vlaggen die je aandacht vragen voor je beslist. De wagen heeft echter een goede servicekeuring en documenten. Probeer te onderhandelen naar €32.500-€33.000.',
  positief: [
    'Volledige servicehistoriek aanwezig',
    'Originele koffermatjes en handboeken',
    'Slechts 1 vorige eigenaar',
    'Niet-roken voertuig',
    'Meeste originele fabrieksopties'
  ],
  negatief: [
    'Vraagprijs 7% boven marktwaarde',
    'Advertentie staat al 45 dagen online — verminderde vraag',
    'Geen keuring uitgevoerd voor verkoop',
    '1 kleine schademelding aanwezig (bumper)'
  ],
  rodeVlaggen: [
    'De km-stand is moeilijk te verifiëren zonder VIN check',
    'Verkoper wil liefst snel verkopen — vraag naar reden'
  ],
  vragen: [
    'Kunt u de originele aankoopfactuur tonen?',
    'Is de schade aan de bumper professioneel hersteld? Mogen wij de herstelfactuur zien?',
    'Waarom verkoopt u de wagen na slechts 3 jaar?',
    'Bent u bereid een keuring te laten uitvoeren voor de aankoop?',
    'Is de vraagprijs onderhandelbaar?',
    'Was de auto ooit geleased of zakelijk gebruikt?',
  ],
  onderhandelTips: [
    'Begin met €31.500 — dit geeft ruimte tot een deal rond €32.500-€33.000',
    'Vermeld de schademelding als onderhandelingsargument',
    'Verwijs naar de lange tijd online (45 dagen) als bewijs van weinig interesse',
    'Stel voor dat de seller de APK laat uitvoeren als onderdeel van de deal',
  ],
  vergelijkbare: [
    { prijs: 32900, km: 58000, jaar: 2022, opmerking: 'Gelijkaardige spec, lager geprijsd' },
    { prijs: 34500, km: 44000, jaar: 2021, opmerking: 'Lagere km, iets ouder' },
    { prijs: 31800, km: 71000, jaar: 2021, opmerking: 'Meer km, goed geprijsd' },
  ]
}

function ScoreMeter({ score }) {
  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444'
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-16 h-16">
        <svg width="64" height="64" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="32" cy="32" r="26" fill="none" stroke="#1e2028" strokeWidth="6" />
          <motion.circle
            cx="32" cy="32" r="26"
            fill="none" stroke={color} strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 26}
            initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - score / 100) }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-black text-sm">{score}</span>
        </div>
      </div>
    </div>
  )
}

export default function AankoopCoach() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [activeTab, setActiveTab] = useState('overzicht')

  const handleAnalyze = async (e) => {
    e.preventDefault()
    setLoading(true)
    setAnalysis(null)
    await new Promise(r => setTimeout(r, 3000))
    setLoading(false)
    setAnalysis(demoAnalysis)
  }

  const handleDemo = () => {
    setUrl('https://www.2dehands.be/auto/volkswagen/golf/demo')
    setLoading(true)
    setAnalysis(null)
    setTimeout(() => {
      setLoading(false)
      setAnalysis(demoAnalysis)
    }, 3000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-3">
            AI <span className="gradient-text">Aankoopcoach</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Plak een advertentielink van AutoScout24, 2dehands.be of Marktplaats.<br />
            Onze AI analyseert de wagen en geeft eerlijk koopadvies.
          </p>
        </div>

        {/* Input */}
        <div className="card p-6 mb-8">
          <form onSubmit={handleAnalyze} className="flex gap-3">
            <div className="relative flex-1">
              <Link2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="Plak advertentielink: autoscout24.be/... of 2dehands.be/..."
                className="pl-10"
              />
            </div>
            <button type="submit" className="btn-primary px-6 whitespace-nowrap">
              {loading ? 'Analyseren...' : 'Analyseer'}
            </button>
          </form>
          <div className="flex flex-wrap gap-4 mt-3">
            <button onClick={handleDemo} className="text-sm text-orange-500 hover:text-orange-400 underline">
              Probeer met demo advertentie
            </button>
            <span className="text-gray-600 text-sm">·</span>
            <span className="text-gray-500 text-sm">Werkt met AutoScout24, 2dehands, Marktplaats en meer</span>
          </div>
        </div>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-10 text-center">
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-full border-2"
                style={{ borderColor: '#1e2028', borderTopColor: '#f97316' }}
              />
              <p className="text-white font-semibold">AI analyseert de advertentie...</p>
              {['Advertentie ophalen en lezen', 'Prijs vergelijken met markt', 'Rode vlaggen identificeren', 'Onderhandelstrategie opstellen', 'Rapport genereren'].map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.5 }}
                  className="text-sm text-gray-400 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  {step}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {analysis && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">

              {/* Score header */}
              <div className="card p-5">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <ScoreMeter score={analysis.overallScore} />
                    <div>
                      <h2 className="text-xl font-black text-white">{analysis.car}</h2>
                      <p className="text-gray-400 text-sm mt-0.5">{analysis.url.substring(0, 50)}...</p>
                      <span
                        className="inline-block mt-2 text-sm font-bold px-3 py-1 rounded-full"
                        style={{ background: `${analysis.verdictColor}20`, color: analysis.verdictColor, border: `1px solid ${analysis.verdictColor}40` }}
                      >
                        ⚠ {analysis.verdict}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 rounded-lg" style={{ background: '#1a1b21' }}>
                      <div className="text-white font-bold">€{analysis.vraagprijs.toLocaleString('nl-BE')}</div>
                      <div className="text-gray-500 text-xs">Vraagprijs</div>
                    </div>
                    <div className="text-center p-3 rounded-lg"
                      style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.2)' }}>
                      <div className="font-bold" style={{ color: '#eab308' }}>€{analysis.marktwaarde.toLocaleString('nl-BE')}</div>
                      <div className="text-gray-500 text-xs">{analysis.prijsoordeel}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg text-sm text-gray-300 leading-relaxed"
                  style={{ background: '#1a1b21', border: '1px solid #2d2d35' }}>
                  {analysis.samenvatting}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'overzicht', label: 'Overzicht' },
                  { id: 'vragen', label: 'Vragen voor verkoper' },
                  { id: 'onderhandel', label: 'Onderhandelen' },
                  { id: 'vergelijk', label: 'Vergelijkbare wagens' },
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

              {activeTab === 'overzicht' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="card p-5">
                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Positieve punten
                    </h3>
                    <ul className="space-y-2">
                      {analysis.positief.map(p => (
                        <li key={p} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card p-5">
                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                      <AlertTriangle size={16} className="text-yellow-500" />
                      Aandachtspunten
                    </h3>
                    <ul className="space-y-2">
                      {analysis.negatief.map(n => (
                        <li key={n} className="flex items-start gap-2 text-sm text-gray-300">
                          <AlertTriangle size={14} className="text-yellow-500 shrink-0 mt-0.5" />
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card p-5 md:col-span-2"
                    style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                      <XCircle size={16} className="text-red-500" />
                      Rode vlaggen — verifieer dit voor je koopt
                    </h3>
                    <ul className="space-y-2">
                      {analysis.rodeVlaggen.map(r => (
                        <li key={r} className="flex items-start gap-2 text-sm" style={{ color: '#fca5a5' }}>
                          <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'vragen' && (
                <div className="card p-5">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <HelpCircle size={16} className="text-orange-500" />
                    Stel deze vragen aan de verkoper
                  </h3>
                  <div className="space-y-3">
                    {analysis.vragen.map((v, i) => (
                      <div key={i} className="p-4 rounded-lg flex items-start gap-3"
                        style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)' }}>
                        <span className="text-orange-500 font-bold text-sm shrink-0 w-5">{i + 1}.</span>
                        <p className="text-gray-300 text-sm">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'onderhandel' && (
                <div className="card p-5">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Lightbulb size={16} className="text-orange-500" />
                    Onderhandelingstrategie
                  </h3>
                  <div className="mb-4 p-4 rounded-lg"
                    style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
                    <div className="text-sm text-gray-300">
                      <strong className="text-white">Doelpijs:</strong> €32.500 — €33.000<br />
                      <strong className="text-white">Openingsbod:</strong> €31.500
                    </div>
                  </div>
                  <div className="space-y-3">
                    {analysis.onderhandelTips.map((tip, i) => (
                      <div key={i} className="p-3 rounded-lg flex items-start gap-3"
                        style={{ background: '#1a1b21', border: '1px solid #2d2d35' }}>
                        <span className="font-bold text-orange-500 shrink-0">{i + 1}</span>
                        <p className="text-gray-300 text-sm">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'vergelijk' && (
                <div className="card p-5">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <TrendingDown size={16} className="text-orange-500" />
                    Vergelijkbare wagens op de markt
                  </h3>
                  <div className="space-y-3">
                    {analysis.vergelijkbare.map((v, i) => (
                      <div key={i} className="p-4 rounded-lg flex items-center justify-between"
                        style={{ background: '#1a1b21', border: '1px solid #2d2d35' }}>
                        <div>
                          <div className="text-white font-semibold">€{v.prijs.toLocaleString('nl-BE')}</div>
                          <div className="text-gray-400 text-xs mt-0.5">{v.jaar} · {v.km.toLocaleString('nl-BE')} km</div>
                        </div>
                        <div className="text-gray-500 text-xs text-right">{v.opmerking}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 text-xs mt-3">Gebaseerd op actuele marktdata BE/NL</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!analysis && !loading && (
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto mb-4 text-orange-500 opacity-40" />
            <p className="text-gray-500">Plak een advertentielink om te beginnen</p>
            <p className="text-gray-600 text-sm mt-1">Werkt met AutoScout24, 2dehands.be en Marktplaats.nl</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

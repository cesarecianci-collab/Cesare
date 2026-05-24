import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, AlertTriangle, Clock, Euro, Wrench, ChevronRight, Info } from 'lucide-react'
import { tuningData } from '../data/tuningData'

const riskColors = {
  'laag': '#22c55e',
  'laag-gemiddeld': '#84cc16',
  'gemiddeld': '#eab308',
  'gemiddeld-hoog': '#f97316',
  'hoog': '#ef4444',
}

function PowerBar({ label, value, max, color }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-400">
        <span>{label}</span>
        <span className="text-white font-semibold">{value}</span>
      </div>
      <div className="power-bar-track">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ height: '8px', background: color, borderRadius: '999px' }}
        />
      </div>
    </div>
  )
}

function StageCard({ stage, data, stock, isSelected, onClick }) {
  const stageColors = { 1: '#3b82f6', 2: '#f97316', 3: '#ef4444' }
  const color = stageColors[stage]
  const powerGain = data.power - stock.power
  const torqueGain = data.torque - stock.torque
  const maxPower = Math.max(stock.power, data.power) * 1.1

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="card cursor-pointer transition-all"
      style={{
        borderColor: isSelected ? color : undefined,
        boxShadow: isSelected ? `0 0 20px ${color}25` : undefined
      }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
              style={{ background: `${color}20`, color }}>
              {stage}
            </div>
            <span className="text-white font-bold">Stage {stage}</span>
          </div>
          <span className="text-xs font-semibold px-2 py-1 rounded-full"
            style={{ background: `${riskColors[data.risk]}15`, color: riskColors[data.risk], border: `1px solid ${riskColors[data.risk]}30` }}>
            Risico: {data.risk}
          </span>
        </div>

        <p className="text-gray-400 text-xs mb-4">{data.description}</p>

        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">Stock</span>
              <span className="text-gray-400">{stock.power} pk</span>
            </div>
            <PowerBar label="Vermogen" value={data.power} max={maxPower} color={color} />
            <div className="text-xs text-right mt-0.5" style={{ color }}>+{powerGain} pk</div>
          </div>
          <div>
            <PowerBar label="Koppel" value={data.torque} max={stock.torque * 1.5} color={color} />
            <div className="text-xs text-right mt-0.5" style={{ color }}>+{torqueGain} Nm</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #1e2028' }}>
          <div>
            <div className="text-xs text-gray-500">Totale investering</div>
            <div className="text-white font-bold">€{data.cost.total.toLocaleString('nl-BE')}</div>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock size={12} />
            {data.timeToInstall}
          </div>
        </div>
      </div>

      {isSelected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="px-5 pb-5"
          style={{ borderTop: '1px solid #1e2028' }}
        >
          <div className="pt-4 space-y-4">
            {data.hardware.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Benodigde hardware</div>
                <ul className="space-y-1">
                  {data.hardware.map(hw => (
                    <li key={hw} className="text-sm text-gray-300 flex items-center gap-2">
                      <ChevronRight size={12} style={{ color }} />
                      {hw}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Kostenverdeling</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg text-center" style={{ background: '#1a1b21' }}>
                  <div className="text-white font-bold text-sm">€{data.cost.tune}</div>
                  <div className="text-gray-500 text-xs">Tune</div>
                </div>
                <div className="p-2 rounded-lg text-center" style={{ background: '#1a1b21' }}>
                  <div className="text-white font-bold text-sm">€{data.cost.hardware.toLocaleString('nl-BE')}</div>
                  <div className="text-gray-500 text-xs">Hardware</div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
              <div className="flex items-start gap-2">
                <Info size={14} className="text-orange-500 shrink-0 mt-0.5" />
                <span className="text-gray-300">{data.notes}</span>
              </div>
            </div>

            {data.reversible && (
              <div className="flex items-center gap-2 text-xs text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Volledig reversibel — originele software kan hersteld worden
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function TuningLab() {
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedStage, setSelectedStage] = useState(null)

  const brands = Object.keys(tuningData)
  const brandData = selectedBrand ? tuningData[selectedBrand] : null
  const models = brandData ? Object.keys(brandData.models) : []
  const modelData = (brandData && selectedModel) ? brandData.models[selectedModel] : null

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-3">
            <span className="gradient-text">Tuning</span>Lab
          </h1>
          <p className="text-gray-400 text-lg">Kies je auto en zie exact wat elke stage oplevert</p>
        </div>

        {/* Car selector */}
        <div className="card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Merk</label>
              <select
                value={selectedBrand}
                onChange={e => { setSelectedBrand(e.target.value); setSelectedModel(''); setSelectedStage(null) }}
              >
                <option value="">— Selecteer merk —</option>
                {brands.map(b => (
                  <option key={b} value={b}>
                    {tuningData[b].emoji} {tuningData[b].name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Model</label>
              <select
                value={selectedModel}
                onChange={e => { setSelectedModel(e.target.value); setSelectedStage(null) }}
                disabled={!selectedBrand}
              >
                <option value="">— Selecteer model —</option>
                {models.map(m => (
                  <option key={m} value={m}>{brandData.models[m].name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {modelData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Model header */}
              <div className="card p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black text-white">{brandData.name} {modelData.name}</h2>
                    <div className="text-gray-400 text-sm mt-1">{modelData.engine} · {modelData.year}</div>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-black text-white">{modelData.stock.power} <span className="text-sm font-normal text-gray-400">pk</span></div>
                      <div className="text-xs text-gray-500">Stock vermogen</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-white">{modelData.stock.torque} <span className="text-sm font-normal text-gray-400">Nm</span></div>
                      <div className="text-xs text-gray-500">Stock koppel</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage cards */}
              <div>
                <h3 className="text-white font-bold mb-4 text-lg">Klik op een stage voor details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(modelData.stages).map(([stage, data]) => (
                    <StageCard
                      key={stage}
                      stage={parseInt(stage)}
                      data={data}
                      stock={modelData.stock}
                      isSelected={selectedStage === parseInt(stage)}
                      onClick={() => setSelectedStage(selectedStage === parseInt(stage) ? null : parseInt(stage))}
                    />
                  ))}
                </div>
              </div>

              {/* Comparison table */}
              <div className="card p-5">
                <h3 className="text-white font-bold mb-4 text-lg">Vergelijking overzicht</h3>
                <div className="overflow-x-auto">
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #1e2028' }}>
                        {['', 'Stock', 'Stage 1', 'Stage 2', 'Stage 3'].map(h => (
                          <th key={h} className="text-left py-2 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          label: 'Vermogen (pk)',
                          values: [modelData.stock.power, ...Object.values(modelData.stages).map(s => s.power)]
                        },
                        {
                          label: 'Koppel (Nm)',
                          values: [modelData.stock.torque, ...Object.values(modelData.stages).map(s => s.torque)]
                        },
                        {
                          label: 'Totale kost',
                          values: ['—', ...Object.values(modelData.stages).map(s => `€${s.cost.total.toLocaleString('nl-BE')}`)]
                        },
                        {
                          label: 'Risico',
                          values: ['—', ...Object.values(modelData.stages).map(s => s.risk)]
                        },
                      ].map(({ label, values }) => (
                        <tr key={label} style={{ borderBottom: '1px solid #1a1b21' }}>
                          <td className="py-3 pr-4 text-sm text-gray-400">{label}</td>
                          {values.map((v, i) => (
                            <td key={i} className="py-3 pr-4 text-sm font-semibold text-white">{v}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Erkende tuners */}
              <div className="card p-5">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Wrench size={18} className="text-orange-500" />
                  Erkende tuners voor de {modelData.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {modelData.popularTuners.map(tuner => (
                    <div key={tuner} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300"
                      style={{ background: '#1a1b21', border: '1px solid #2d2d35' }}>
                      {tuner}
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 text-xs mt-3">Tuner locaties in jouw regio beschikbaar in de premium versie</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedBrand && (
          <div className="text-center py-16">
            <Zap size={48} className="mx-auto mb-4 text-orange-500 opacity-50" />
            <p className="text-gray-500">Selecteer een merk en model om te beginnen</p>
            <p className="text-gray-600 text-sm mt-1">8 merken · 20+ modellen · Stage 1/2/3 data</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

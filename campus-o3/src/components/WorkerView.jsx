import { useState, useEffect } from 'react'
import { QUESTIONS, TOPICS, OPTION_LABELS, UI } from '../data/translations'
import { LANGUAGES } from '../data/languages'

async function translateWithRetry(text, langCode) {
  if (!text || text.trim() === '') return text
  if (langCode === 'nl') return text
  for (let attempt = 1; attempt <= 2; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langCode}|nl`,
        { signal: controller.signal }
      )
      clearTimeout(timer)
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const data = await res.json()
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        return data.responseData.translatedText
      }
      return null
    } catch (e) {
      clearTimeout(timer)
      if (attempt < 2 && e.name !== 'AbortError') {
        await new Promise(r => setTimeout(r, 1500))
      }
    }
  }
  return null
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
  }
  // Fallback for HTTP
  const el = document.createElement('textarea')
  el.value = text
  el.style.position = 'fixed'
  el.style.opacity = '0'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  return Promise.resolve()
}

// Compute initial translations state synchronously (no flash on first render)
function buildInitialState(questions, answers, langCode) {
  const translations = {}
  const statuses = {}

  for (const q of questions) {
    const raw = answers[q.id]

    if (!raw) {
      statuses[q.id] = 'done'
      continue
    }

    if (q.type === 'select') {
      translations[q.id] = OPTION_LABELS[raw]?.nl || raw
      statuses[q.id] = 'done'
      continue
    }

    if (q.type === 'number' || langCode === 'nl') {
      translations[q.id] = raw
      statuses[q.id] = 'done'
      continue
    }

    // Foreign-language free text — will be translated via API
    statuses[q.id] = 'translating'
  }

  return { translations, statuses }
}

export default function WorkerView({ language, topic, answers, onNewConversation }) {
  // Derive stable values before useState so lazy initialisers can use them
  const questions = QUESTIONS[topic] || []
  const topicData = TOPICS.find((t) => t.key === topic)
  const langData  = LANGUAGES.find((l) => l.code === language?.code)
  const langCode  = language?.code || 'nl'

  // Single lazy init — runs once synchronously at mount, no first-render flash
  const [txState, setTxState] = useState(
    () => buildInitialState(questions, answers, langCode)
  )
  const { translations, statuses } = txState
  const [copied, setCopied] = useState(false)

  // Timestamp at mount
  const [timestamp] = useState(() => {
    const now = new Date()
    return `${now.toLocaleDateString('nl-BE')} ${now.toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' })}`
  })

  // Translate a single question by ID
  const translateQuestion = (qId) => {
    const q = questions.find((q) => q.id === qId)
    if (!q) return
    const raw = answers[q.id]
    if (!raw) return

    setTxState((prev) => ({
      ...prev,
      statuses: { ...prev.statuses, [qId]: 'translating' },
    }))

    translateWithRetry(raw, langCode).then((result) => {
      if (result !== null) {
        setTxState((prev) => ({
          translations: { ...prev.translations, [qId]: result },
          statuses: { ...prev.statuses, [qId]: 'done' },
        }))
      } else {
        setTxState((prev) => ({
          ...prev,
          statuses: { ...prev.statuses, [qId]: 'error' },
        }))
      }
    })
  }

  // Retry a single question that errored
  const retryQuestion = (qId) => {
    translateQuestion(qId)
  }

  // Fire async API translations after mount
  useEffect(() => {
    for (const q of questions) {
      const raw = answers[q.id]
      if (!raw || q.type === 'select' || q.type === 'number' || langCode === 'nl') continue

      translateWithRetry(raw, langCode).then((result) => {
        if (result !== null) {
          setTxState((prev) => ({
            translations: { ...prev.translations, [q.id]: result },
            statuses: { ...prev.statuses, [q.id]: 'done' },
          }))
        } else {
          setTxState((prev) => ({
            ...prev,
            statuses: { ...prev.statuses, [q.id]: 'error' },
          }))
        }
      })
    }
  }, []) // intentionally empty — props are stable after mount

  const handleCopy = () => {
    const lines = [
      '═══════════════════════════════════════',
      '   CAMPUS O3 – Gesprekssamenvatting',
      '═══════════════════════════════════════',
      `Taal gezin : ${langData?.name || '?'} (${langData?.nativeName || '?'})`,
      `Onderwerp  : ${topicData?.label.nl || topic}`,
      `Datum      : ${timestamp}`,
      '───────────────────────────────────────',
      '',
      ...questions.map((q) => {
        const raw = answers[q.id]
        if (!raw) return `▸ ${q.text.nl}\n  → (geen antwoord)`
        const dutch  = translations[q.id]
        const status = statuses[q.id]
        // Use Dutch translation if available; if still loading/error, show original with note
        const display = dutch
          ?? (status === 'error' ? `[niet vertaald] ${raw}` : raw)
        return `▸ ${q.text.nl}\n  → ${display}`
      }),
    ]

    copyToClipboard(lines.join('\n'))
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500) })
      .catch(() => { /* silent — clipboard unavailable */ })
  }

  return (
    <div className="fade-in">
      {/* Worker header banner */}
      <div className="bg-green-700 text-white rounded-2xl shadow-md p-5 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">📋</span>
          <h2 className="text-xl font-bold">{UI.worker_title}</h2>
        </div>
        <p className="text-green-300 text-xs mb-3">{timestamp}</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="bg-green-600 rounded-lg px-3 py-1.5">
            <span className="text-green-200 mr-1">{UI.worker_language}:</span>
            <span className="font-semibold">
              {langData?.flag} {langData?.name}
              {langData?.nativeName !== langData?.name ? ` (${langData?.nativeName})` : ''}
            </span>
          </div>
          <div className="bg-green-600 rounded-lg px-3 py-1.5">
            <span className="text-green-200 mr-1">{UI.worker_topic}:</span>
            <span className="font-semibold">
              {topicData?.emoji} {topicData?.label.nl}
            </span>
          </div>
        </div>
      </div>

      {/* Answers */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Antwoorden — vertaald naar het Nederlands
        </h3>

        <div className="border-t border-gray-200 pt-3">
          {questions.map((q) => {
            const raw    = answers[q.id]
            const dutch  = translations[q.id]
            const status = statuses[q.id] || 'done'

            return (
              <div key={q.id} className="border-b border-gray-100 last:border-0 py-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  ▶ {q.text.nl}
                </p>

                {!raw ? (
                  <p className="text-gray-400 italic text-sm">{UI.no_answer}</p>
                ) : status === 'translating' ? (
                  <div className="flex items-center gap-2 text-blue-500 text-sm">
                    <svg className="animate-spin h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {UI.worker_translating}
                  </div>
                ) : status === 'done' && dutch ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                    <p className="text-gray-900 font-semibold text-base">{dutch}</p>
                    {/* Show original below for free-text questions */}
                    {q.type !== 'select' && q.type !== 'number' && langCode !== 'nl' && (
                      <p className="text-gray-400 text-xs mt-1">
                        <span className="font-medium">{UI.worker_original}:</span> {raw}
                      </p>
                    )}
                  </div>
                ) : status === 'error' ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                    <p className="text-amber-700 text-sm font-bold text-base mb-1">{raw}</p>
                    <p className="text-amber-600 text-xs italic mb-2">{UI.worker_translation_error}</p>
                    <button
                      type="button"
                      onClick={() => retryQuestion(q.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Probeer opnieuw
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-400 italic text-sm">{UI.no_answer}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3.5 rounded-xl transition-all"
        >
          {copied ? (
            <>✓ {UI.copied}</>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 10h6a2 2 0 002-2v-8a2 2 0 00-2-2h-6a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {UI.copy_summary}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-3.5 rounded-xl transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          {UI.print}
        </button>

        <button
          type="button"
          onClick={onNewConversation}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {UI.new_conversation}
        </button>
      </div>
    </div>
  )
}

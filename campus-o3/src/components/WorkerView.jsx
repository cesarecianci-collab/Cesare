import { useState, useEffect } from 'react'
import { QUESTIONS, TOPICS, OPTION_LABELS, UI } from '../data/translations'
import { LANGUAGES } from '../data/languages'

async function translateToNL(text, langCode) {
  if (!text || text.trim() === '') return text
  if (langCode === 'nl') return text
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langCode}|nl`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    if (data.responseStatus === 200) return data.responseData.translatedText
    return null
  } catch {
    return null
  }
}

// Status per question: 'idle' | 'translating' | 'done' | 'error'
function statusIcon(status) {
  if (status === 'translating') return (
    <svg className="animate-spin h-4 w-4 text-blue-500 inline mr-1" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
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

export default function WorkerView({ language, topic, answers, onNewConversation }) {
  const [copied, setCopied] = useState(false)
  const [translations, setTranslations] = useState({})   // { [qId]: string }
  const [statuses, setStatuses] = useState({})            // { [qId]: status }

  const questions = QUESTIONS[topic] || []
  const topicData = TOPICS.find((t) => t.key === topic)
  const langData = LANGUAGES.find((l) => l.code === language?.code)
  const langCode = language?.code || 'nl'

  // Resolve all translations when the view mounts
  useEffect(() => {
    const initialStatuses = {}
    const initialTranslations = {}

    for (const q of questions) {
      const raw = answers[q.id]

      if (!raw) {
        initialStatuses[q.id] = 'done'
        continue
      }

      // Select options: Dutch label is already known
      if (q.type === 'select') {
        initialStatuses[q.id] = 'done'
        initialTranslations[q.id] = OPTION_LABELS[raw]?.nl || raw
        continue
      }

      // Numbers: no translation needed
      if (q.type === 'number') {
        initialStatuses[q.id] = 'done'
        initialTranslations[q.id] = raw
        continue
      }

      // Dutch text: no translation needed
      if (langCode === 'nl') {
        initialStatuses[q.id] = 'done'
        initialTranslations[q.id] = raw
        continue
      }

      // Foreign text: needs API translation
      initialStatuses[q.id] = 'translating'
    }

    setTranslations(initialTranslations)
    setStatuses(initialStatuses)

    // Fire async translations
    for (const q of questions) {
      const raw = answers[q.id]
      if (!raw || q.type === 'select' || q.type === 'number' || langCode === 'nl') continue

      translateToNL(raw, langCode).then((result) => {
        setTranslations((prev) => ({ ...prev, [q.id]: result ?? undefined }))
        setStatuses((prev) => ({ ...prev, [q.id]: result ? 'done' : 'error' }))
      })
    }
  }, []) // run once on mount — answers and questions are stable

  const handleCopy = () => {
    const lines = [
      '═══════════════════════════════════════',
      '   CAMPUS O3 – Gesprekssamenvatting',
      '═══════════════════════════════════════',
      `Taal gezin : ${langData?.name || '?'} (${langData?.nativeName || '?'})`,
      `Onderwerp  : ${topicData?.label.nl || topic}`,
      `Datum      : ${new Date().toLocaleDateString('nl-BE')} ${new Date().toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' })}`,
      '───────────────────────────────────────',
      '',
      ...questions.map((q) => {
        const raw = answers[q.id]
        if (!raw) return `▸ ${q.text.nl}\n  → (geen antwoord)`
        const dutch = translations[q.id]
        const status = statuses[q.id]
        const display = dutch ?? (status === 'error' ? `[niet vertaald] ${raw}` : raw)
        return `▸ ${q.text.nl}\n  → ${display}`
      }),
    ]

    copyToClipboard(lines.join('\n'))
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500) })
      .catch(() => { /* silent fail */ })
  }

  return (
    <div className="fade-in">
      {/* Worker header banner */}
      <div className="bg-green-700 text-white rounded-2xl shadow-md p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">📋</span>
          <h2 className="text-xl font-bold">{UI.worker_title}</h2>
        </div>
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

        {questions.map((q) => {
          const raw = answers[q.id]
          const dutch = translations[q.id]
          const status = statuses[q.id] || 'idle'

          return (
            <div key={q.id} className="border-b border-gray-100 last:border-0 py-4">
              {/* Dutch question label */}
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                {q.text.nl}
              </p>

              {!raw ? (
                <p className="text-gray-400 italic text-sm">{UI.no_answer}</p>
              ) : (
                <>
                  {status === 'translating' ? (
                    <div className="flex items-center gap-2 text-blue-500 text-sm">
                      {statusIcon('translating')}
                      {UI.worker_translating}
                    </div>
                  ) : dutch ? (
                    <p className="text-gray-900 font-semibold text-base">{dutch}</p>
                  ) : (
                    <p className="text-amber-600 text-sm italic">{UI.worker_translation_error}</p>
                  )}

                  {/* Show original foreign text below (text type only) */}
                  {q.type !== 'select' && q.type !== 'number' && langCode !== 'nl' && raw && (
                    <p className="text-gray-400 text-xs mt-1">
                      <span className="font-medium">{UI.worker_original}:</span> {raw}
                    </p>
                  )}
                </>
              )}
            </div>
          )
        })}
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

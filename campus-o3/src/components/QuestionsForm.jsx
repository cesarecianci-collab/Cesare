import { useState } from 'react'
import { QUESTIONS, TOPICS, OPTION_LABELS, UI } from '../data/translations'

function QuestionCard({ question, lang, value, onChange, index, total }) {
  const text = question.text[lang] || question.text.en

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 fade-in">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 bg-blue-600 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center">
          {index + 1}
        </span>
        <p className="text-gray-800 font-semibold text-base leading-snug">{text}</p>
      </div>

      {question.type === 'select' && (
        <div className="grid grid-cols-1 gap-2">
          {question.options.map((optKey) => {
            const label = OPTION_LABELS[optKey]?.[lang] || OPTION_LABELS[optKey]?.en || optKey
            const isSelected = value === optKey
            return (
              <button
                key={optKey}
                type="button"
                onClick={() => onChange(isSelected ? '' : optKey)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition-all duration-150 text-sm ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <span className="mr-2">{isSelected ? '✓' : '○'}</span>
                {label}
              </button>
            )
          })}
        </div>
      )}

      {question.type === 'text' && (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={UI.answer_placeholder[lang] || UI.answer_placeholder.en}
          rows={3}
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm resize-none focus:outline-none focus:border-blue-400 focus:bg-blue-50 transition-colors placeholder-gray-300"
        />
      )}

      {question.type === 'number' && (
        <input
          type="number"
          min="0"
          max="99"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="w-32 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-xl font-bold text-center focus:outline-none focus:border-blue-400 focus:bg-blue-50 transition-colors"
        />
      )}
    </div>
  )
}

export default function QuestionsForm({ language, topic, onSubmit }) {
  const lang = language?.code || 'nl'
  const questions = QUESTIONS[topic] || []
  const topicData = TOPICS.find((t) => t.key === topic)
  const [answers, setAnswers] = useState({})

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(answers)
  }

  return (
    <div className="fade-in" dir={language?.dir || 'ltr'}>
      {/* Topic header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-5 flex items-center gap-4">
        <span className="text-4xl">{topicData?.emoji}</span>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            {UI.questions_about[lang] || UI.questions_about.en}
          </p>
          <p className="text-xl font-bold text-gray-800">
            {topicData?.label[lang] || topicData?.label.en}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 mb-6">
          {questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              question={q}
              lang={lang}
              value={answers[q.id] || ''}
              onChange={(val) => handleChange(q.id, val)}
              index={i}
              total={questions.length}
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-lg py-4 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg"
        >
          {UI.submit[lang] || UI.submit.en} →
        </button>
      </form>
    </div>
  )
}

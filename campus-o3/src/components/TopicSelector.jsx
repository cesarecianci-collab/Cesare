import { TOPICS, UI } from '../data/translations'

export default function TopicSelector({ language, onSelect }) {
  const lang = language?.code || 'nl'

  return (
    <div className="fade-in" dir={language?.dir || 'ltr'}>
      {/* Instruction */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6 text-center">
        <p className="text-2xl font-bold text-gray-800">
          🗂️ {UI.select_topic[lang]}
        </p>
        <p className="text-gray-500 text-sm mt-1">{UI.select_topic_subtitle[lang]}</p>
      </div>

      {/* Topic grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {TOPICS.map((topic) => (
          <button
            type="button"
            key={topic.key}
            onClick={() => onSelect(topic.key)}
            className={`group border-2 ${topic.color} rounded-2xl p-5 flex flex-col items-center gap-3 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 min-h-[100px]`}
          >
            <span className="text-5xl" role="img" aria-label={topic.label[lang]}>
              {topic.emoji}
            </span>
            <span className="font-bold text-gray-700 text-center text-sm leading-tight group-hover:text-gray-900">
              {topic.label[lang]}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

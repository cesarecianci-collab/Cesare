import { LANGUAGES } from '../data/languages'

const STEPS = ['LANGUAGE', 'TOPIC', 'QUESTIONS', 'WORKER']
const STEP_LABELS = ['Taal', 'Onderwerp', 'Vragen', 'Overzicht']

export default function Header({ currentStep, onBack, language }) {
  const stepIndex = STEPS.indexOf(currentStep)
  const langData = language ? LANGUAGES.find((l) => l.code === language.code) : null

  return (
    <header className="bg-blue-700 text-white shadow-md no-print">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-blue-100 hover:text-white hover:bg-blue-600 transition-colors text-sm font-medium min-h-[44px] py-2 px-3 rounded-lg"
            aria-label="Terug"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Terug
          </button>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {langData?.flag && (
              <span className="text-xl" role="img" aria-label={langData.name}>{langData.flag}</span>
            )}
            <span className="text-xl font-bold tracking-tight">Campus O3</span>
            <span className="text-blue-200 text-sm font-light">Vertaalassistent</span>
          </div>
        </div>
        {/* Step indicator - only visible to social worker */}
        <div className="hidden sm:flex items-center gap-1">
          {STEP_LABELS.map((label, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-colors ${
                i < stepIndex ? 'bg-blue-500 text-white' :
                i === stepIndex ? 'bg-white text-blue-700' :
                'bg-blue-800/50 text-blue-300'
              }`}>
                {i < stepIndex ? '✓' : i + 1}
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div className={`w-4 h-0.5 ${i < stepIndex ? 'bg-blue-500' : 'bg-blue-800/50'}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}

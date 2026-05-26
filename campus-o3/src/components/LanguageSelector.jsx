import { LANGUAGES } from '../data/languages'
import { UI } from '../data/translations'

export default function LanguageSelector({ onSelect }) {
  return (
    <div className="fade-in">
      {/* Welcome banner */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 text-center">
        <div className="text-5xl mb-3">👋</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Welkom bij Campus O3</h1>
        <p className="text-gray-500 text-sm">Genk</p>
      </div>

      {/* Instruction in multiple languages */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-6 text-center">
        <p className="text-blue-800 font-semibold text-base">
          {UI.select_language.nl}
        </p>
        <p className="text-blue-600 text-sm mt-1">
          Select your language • Sélectionnez votre langue • اختر لغتك • Dilinizi seçin
        </p>
      </div>

      {/* Language grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang)}
            className="group bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 rounded-xl p-4 flex flex-col items-center gap-2 transition-all duration-200 hover:shadow-md active:scale-95"
          >
            <span className="text-4xl" role="img" aria-label={lang.name}>
              {lang.flag}
            </span>
            <div className="text-center">
              <div className="font-bold text-gray-800 text-sm group-hover:text-blue-700">
                {lang.nativeName}
              </div>
              <div className="text-xs text-gray-400">
                {lang.name}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

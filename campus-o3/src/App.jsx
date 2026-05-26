import { useState } from 'react'
import Header from './components/Header'
import LanguageSelector from './components/LanguageSelector'
import TopicSelector from './components/TopicSelector'
import QuestionsForm from './components/QuestionsForm'
import WorkerView from './components/WorkerView'

const STEPS = {
  LANGUAGE: 'LANGUAGE',
  TOPIC: 'TOPIC',
  QUESTIONS: 'QUESTIONS',
  WORKER: 'WORKER',
}

export default function App() {
  const [step, setStep] = useState(STEPS.LANGUAGE)
  const [language, setLanguage] = useState(null)
  const [topic, setTopic] = useState(null)
  const [answers, setAnswers] = useState({})

  const handleLanguageSelect = (lang) => {
    setLanguage(lang)
    setStep(STEPS.TOPIC)
  }

  const handleTopicSelect = (topicKey) => {
    setTopic(topicKey)
    setAnswers({})
    setStep(STEPS.QUESTIONS)
  }

  const handleAnswersSubmit = (answersData) => {
    setAnswers(answersData)
    setStep(STEPS.WORKER)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleNewConversation = () => {
    setStep(STEPS.LANGUAGE)
    setLanguage(null)
    setTopic(null)
    setAnswers({})
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const backHandlers = {
    [STEPS.TOPIC]:     () => setStep(STEPS.LANGUAGE),
    [STEPS.QUESTIONS]: () => setStep(STEPS.TOPIC),
    [STEPS.WORKER]:    () => setStep(STEPS.QUESTIONS),
  }

  return (
    <div
      className="min-h-screen bg-gray-100"
      dir={step !== STEPS.LANGUAGE && language?.dir === 'rtl' ? 'rtl' : 'ltr'}
    >
      <Header currentStep={step} onBack={backHandlers[step] || null} />

      <main className="max-w-2xl mx-auto px-4 py-6">
        {step === STEPS.LANGUAGE && (
          <LanguageSelector onSelect={handleLanguageSelect} />
        )}
        {step === STEPS.TOPIC && (
          <TopicSelector language={language} onSelect={handleTopicSelect} />
        )}
        {step === STEPS.QUESTIONS && (
          <QuestionsForm
            language={language}
            topic={topic}
            initialAnswers={answers}
            onSubmit={handleAnswersSubmit}
          />
        )}
        {step === STEPS.WORKER && (
          <WorkerView
            language={language}
            topic={topic}
            answers={answers}
            onNewConversation={handleNewConversation}
          />
        )}
      </main>

      {/* Print styles */}
      <style>{`
        @media print {
          header, button { display: none !important; }
          main { padding: 0 !important; }
          .bg-green-700 { background-color: #065f46 !important; -webkit-print-color-adjust: exact; }
        }
      `}</style>
    </div>
  )
}

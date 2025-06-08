import React, { useState, useEffect } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { 
  Brain, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  ArrowRight,
  RotateCcw,
  Trophy
} from 'lucide-react'
import { quizApi, Category, Quiz, Question } from '../../lib/api'

interface QuizSectionProps {
  language: 'DE' | 'EN' | 'LA'
}

const translations = {
  DE: {
    title: 'Interaktive Quizzes',
    subtitle: 'Teste Dein Wissen Über Macrobius Und Die Antike',
    loading: 'Lade...',
    loadingQuizzes: 'Lade Quizzes...',
    loadingQuestions: 'Lade Fragen...',
    selectCategory: 'Wähle Eine Kategorie',
    selectQuiz: 'Wähle Ein Quiz',
    startQuiz: 'Quiz Starten',
    nextQuestion: 'Nächste Frage',
    tryAgain: 'Erneut Versuchen',
    quizComplete: 'Quiz Abgeschlossen!',
    yourScore: 'Deine Punktzahl',
    correctAnswers: 'Richtige Antworten',
    backToQuizzes: 'Zurück Zu Den Quizzes',
    noQuizzes: 'Keine Quizzes Verfügbar',
    noQuestions: 'Keine Fragen Verfügbar',
    error: 'Fehler Beim Laden Der Daten',
    connectionError: 'Verbindung Zum Server Fehlgeschlagen'
  },
  EN: {
    title: 'Interactive Quizzes',
    subtitle: 'Test Your Knowledge About Macrobius And Antiquity',
    loading: 'Loading...',
    loadingQuizzes: 'Loading Quizzes...',
    loadingQuestions: 'Loading Questions...',
    selectCategory: 'Select A Category',
    selectQuiz: 'Select A Quiz',
    startQuiz: 'Start Quiz',
    nextQuestion: 'Next Question',
    tryAgain: 'Try Again',
    quizComplete: 'Quiz Complete!',
    yourScore: 'Your Score',
    correctAnswers: 'Correct Answers',
    backToQuizzes: 'Back To Quizzes',
    noQuizzes: 'No Quizzes Available',
    noQuestions: 'No Questions Available',
    error: 'Error Loading Data',
    connectionError: 'Failed To Connect To Server'
  },
  LA: {
    title: 'Quaestionaria Interactiva',
    subtitle: 'Scientiam Tuam De Macrobio Et Antiquitate Proba',
    loading: 'Cargando...',
    loadingQuizzes: 'Quaestionaria Cargando...',
    loadingQuestions: 'Quaestiones Cargando...',
    selectCategory: 'Categoriam Elige',
    selectQuiz: 'Quaestionarium Elige',
    startQuiz: 'Quaestionarium Incipere',
    nextQuestion: 'Quaestio Sequens',
    tryAgain: 'Iterum Temptare',
    quizComplete: 'Quaestionarium Completum!',
    yourScore: 'Numerus Tuus',
    correctAnswers: 'Responsiones Rectae',
    backToQuizzes: 'Ad Quaestionaria Redire',
    noQuizzes: 'Nulla Quaestionaria Disponibilia',
    noQuestions: 'Nullae Quaestiones Disponibiliae',
    error: 'Error In Datis Cargando',
    connectionError: 'Connexio Ad Servum Defecit'
  }
}

function QuizSection({ language }: QuizSectionProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const t = translations[language]

  // Load categories on component mount
  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoading(true)
    setError(null)
    
    const response = await quizApi.getCategories()
    if (response.status === 'success' && response.data) {
      setCategories(response.data.categories)
    } else {
      setError(response.error || t.connectionError)
    }
    
    setLoading(false)
  }

  const loadQuizzes = async (categoryId: number) => {
    setLoading(true)
    setError(null)
    
    const response = await quizApi.getQuizzes(categoryId, language.toLowerCase())
    if (response.status === 'success' && response.data) {
      setQuizzes(response.data.quizzes)
    } else {
      setError(response.error || t.connectionError)
      setQuizzes([])
    }
    
    setLoading(false)
  }

  const loadQuestions = async (quizId: number) => {
    setLoading(true)
    setError(null)
    
    const response = await quizApi.getQuestions(quizId, language.toLowerCase())
    if (response.status === 'success' && response.data) {
      setQuestions(response.data.questions)
      if (response.data.questions.length > 0) {
        setSelectedAnswers(new Array(response.data.questions.length).fill(-1))
        setCurrentQuestion(0)
        setScore(0)
        setQuizCompleted(false)
      }
    } else {
      setError(response.error || t.connectionError)
      setQuestions([])
    }
    
    setLoading(false)
  }

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
    setSelectedQuiz(null)
    setQuestions([])
    setQuizCompleted(false)
    loadQuizzes(category.id)
  }

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz)
    loadQuestions(quiz.id)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz completed - calculate score
      let correctCount = 0
      questions.forEach((question, index) => {
        const selectedAnswerIndex = selectedAnswers[index]
        if (selectedAnswerIndex >= 0 && question.answers[selectedAnswerIndex]?.is_correct) {
          correctCount++
        }
      })
      setScore(correctCount)
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setSelectedCategory(null)
    setSelectedQuiz(null)
    setQuestions([])
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setScore(0)
    setQuizCompleted(false)
    setQuizzes([])
  }

  const getCurrentQuestionText = (question: Question): string => {
    switch (language) {
      case 'DE': return question.text_de
      case 'LA': return question.text_la
      default: return question.text_en
    }
  }

  const getCurrentAnswerText = (answer: any): string => {
    switch (language) {
      case 'DE': return answer.text_de
      case 'LA': return answer.text_la
      default: return answer.text_en
    }
  }

  if (loading) {
    return (
      <section id="quiz" className="py-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-rose-500 mx-auto mb-4" />
            <p className="text-gray-600">{t.loading}</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="quiz" className="py-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={loadCategories} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              {t.tryAgain}
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="quiz" className="py-20 bg-gradient-to-b from-rose-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Quiz Completed */}
          {quizCompleted && (
            <Card className="p-8 text-center mb-8">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.quizComplete}</h3>
              <div className="flex justify-center items-center space-x-8 mb-6">
                <div>
                  <div className="text-3xl font-bold text-rose-600">{score}</div>
                  <div className="text-sm text-gray-600">{t.yourScore}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-600">{questions.length}</div>
                  <div className="text-sm text-gray-600">{t.correctAnswers}</div>
                </div>
              </div>
              <Button onClick={resetQuiz} className="bg-rose-500 hover:bg-rose-600">
                {t.backToQuizzes}
              </Button>
            </Card>
          )}

          {/* Category Selection */}
          {!selectedCategory && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t.selectCategory}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Card 
                    key={category.id} 
                    className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleCategorySelect(category)}
                  >
                    <Brain className="h-8 w-8 text-rose-500 mb-3" />
                    <h4 className="font-bold text-lg mb-2">{category.name}</h4>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Quiz Selection */}
          {selectedCategory && !selectedQuiz && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{t.selectQuiz}</h3>
                <Button variant="outline" onClick={resetQuiz}>
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  {t.selectCategory}
                </Button>
              </div>
              
              {quizzes.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-gray-600">{t.noQuizzes}</p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quizzes.map((quiz) => (
                    <Card 
                      key={quiz.id} 
                      className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleQuizSelect(quiz)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-lg">{quiz.title}</h4>
                        <Badge variant="secondary">{quiz.difficulty}</Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{quiz.description}</p>
                      <Button size="sm" className="w-full">
                        {t.startQuiz}
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Question Display */}
          {selectedQuiz && questions.length > 0 && !quizCompleted && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <Badge variant="outline">
                  {currentQuestion + 1} / {questions.length}
                </Badge>
                <Button variant="outline" onClick={resetQuiz}>
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  {t.backToQuizzes}
                </Button>
              </div>

              <Card className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {getCurrentQuestionText(questions[currentQuestion])}
                </h3>

                <div className="space-y-3 mb-8">
                  {questions[currentQuestion].answers.map((answer, index) => (
                    <button
                      key={index}
                      className={`w-full p-4 text-left border rounded-lg transition-colors ${ 
                        selectedAnswers[currentQuestion] === index
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      {getCurrentAnswerText(answer)}
                    </button>
                  ))}
                </div>

                <Button 
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuestion] === -1}
                  className="w-full bg-rose-500 hover:bg-rose-600"
                >
                  {currentQuestion < questions.length - 1 ? t.nextQuestion : t.quizComplete}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            </div>
          )}

          {/* No Questions Available */}
          {selectedQuiz && questions.length === 0 && !loading && (
            <Card className="p-8 text-center">
              <p className="text-gray-600 mb-4">{t.noQuestions}</p>
              <Button variant="outline" onClick={() => setSelectedQuiz(null)}>
                {t.selectQuiz}
              </Button>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}

// Export both named and default for compatibility
export { QuizSection };
export default QuizSection;
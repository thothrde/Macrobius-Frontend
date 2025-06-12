import React, { useState } from 'react';

interface QuizSectionProps {
  isActive: boolean;
  t: (key: string) => string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

function QuizSection({ isActive, t }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Mock quiz questions
  const questions: Question[] = [
    {
      id: 1,
      question: "Wie hieß der berühmte Traum, den Macrobius kommentierte?",
      options: ["Scipios Traum", "Caesars Traum", "Ciceros Traum", "Augustinus' Traum"],
      correctAnswer: 0,
      explanation: "Das 'Somnium Scipionis' war ein berühmter Text von Cicero, den Macrobius ausführlich kommentierte."
    },
    {
      id: 2,
      question: "In welchem Werk beschreibt Macrobius gelehrte Gespräche während der Saturnalien?",
      options: ["Commentarii", "Saturnalia", "De Re Publica", "Confessiones"],
      correctAnswer: 1,
      explanation: "Die 'Saturnalia' sind Macrobius' berühmtes Werk über gelehrte Gespräche während des römischen Festes."
    },
    {
      id: 3,
      question: "Welche Rolle spielte Macrobius im spätrömischen Reich?",
      options: ["Kaiser", "Verwaltungsbeamter", "Soldat", "Händler"],
      correctAnswer: 1,
      explanation: "Macrobius war ein hoher Verwaltungsbeamter und Gelehrter im spätrömischen Reich."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (!isActive) return null;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-yellow-400 mb-8">
            Macrobius Quiz
          </h2>
          <p className="text-xl text-white/90">
            Teste dein Wissen über den antiken Gelehrten
          </p>
        </div>

        {!quizCompleted ? (
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8">
            {/* Progress */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-white/70">
                Frage {currentQuestion + 1} von {questions.length}
              </span>
              <div className="w-48 bg-white/20 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h3 className="text-2xl font-bold text-white mb-8">
              {questions[currentQuestion].question}
            </h3>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {questions[currentQuestion].options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === questions[currentQuestion].correctAnswer;
                const isIncorrect = showResult && isSelected && !isCorrect;
                const shouldHighlight = showResult && isCorrect;
                
                return (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                      isIncorrect
                        ? 'border-red-500 bg-red-500/20 text-white'
                        : shouldHighlight
                        ? 'border-green-500 bg-green-500/20 text-white'
                        : isSelected
                        ? 'border-yellow-400 bg-yellow-400/20 text-white'
                        : 'border-white/30 hover:border-white/50 text-white/90 hover:bg-white/10'
                    }`}
                  >
                    <span className="font-medium">
                      {String.fromCharCode(65 + index)}) {option}
                    </span>
                    {showResult && isCorrect && (
                      <span className="ml-2 text-green-400">✓</span>
                    )}
                    {isIncorrect && (
                      <span className="ml-2 text-red-400">✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Result and Next Button */}
            {showResult && (
              <div className="mb-6 p-4 bg-white/10 rounded-lg border border-white/20">
                <p className="text-white/90 mb-4">
                  <strong>Erklärung:</strong> {questions[currentQuestion].explanation}
                </p>
              </div>
            )}

            {/* Action Button */}
            <div className="text-center">
              {!showResult ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-colors"
                >
                  Antwort prüfen
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors"
                >
                  {currentQuestion < questions.length - 1 ? 'Nächste Frage' : 'Quiz beenden'}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Quiz Completed */
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 text-center">
            <div className="text-6xl mb-6">
              {score === questions.length ? '🏆' : score >= questions.length / 2 ? '🎉' : '📚'}
            </div>
            <h3 className="text-3xl font-bold text-yellow-400 mb-4">
              Quiz abgeschlossen!
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Du hast <span className="font-bold text-yellow-400">{score}</span> von <span className="font-bold">{questions.length}</span> Fragen richtig beantwortet.
            </p>
            
            {/* Score Message */}
            <div className="mb-8">
              {score === questions.length && (
                <p className="text-green-400 font-semibold">Perfekt! Du kennst dich ausgezeichnet mit Macrobius aus! 🌟</p>
              )}
              {score >= questions.length / 2 && score < questions.length && (
                <p className="text-yellow-400 font-semibold">Gut gemacht! Du hast solide Kenntnisse über Macrobius! 👍</p>
              )}
              {score < questions.length / 2 && (
                <p className="text-blue-400 font-semibold">Noch Raum für Verbesserungen. Schau dir gerne mehr über Macrobius an! 📖</p>
              )}
            </div>

            <button
              onClick={resetQuiz}
              className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors"
            >
              Quiz wiederholen
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Export both named and default for compatibility
export { QuizSection };
export default QuizSection;
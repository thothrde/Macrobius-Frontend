import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  ArrowRight,
  Trophy,
  Filter,
  Star,
  Zap,
  BookOpen,
  Clock,
  Database,
  Lightbulb,
  Globe,
  AlertCircle,
  Target
} from 'lucide-react';

// Import our working Oracle Cloud API client
import { 
  macrobiusApi, 
  useOracleCloudConnection, 
  OracleCloudError 
} from '../../utils/macrobiusApi';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  source_passage: string;
  cultural_context: string;
  difficulty: string;
}

interface QuizSectionProps {
  isActive: boolean;
  t: (key: string) => string;
  language?: 'DE' | 'EN' | 'LA';
}

function QuizSection({ isActive, t: _t, language = 'DE' }: QuizSectionProps) {
  // Oracle Cloud connection status
  const { isConnected, isLoading: connectionLoading, connectionError } = useOracleCloudConnection();
  
  // Quiz state
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Settings
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [questionCount, setQuestionCount] = useState(5);
  const [availableThemes, setAvailableThemes] = useState<string[]>([]);
  
  // Timer
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  const [quizEndTime, setQuizEndTime] = useState<number>(0);

  // Load available cultural themes
  useEffect(() => {
    const loadThemes = async () => {
      if (!isConnected) return;
      
      try {
        const themes = await macrobiusApi.getCulturalThemes();
        setAvailableThemes(themes.map(theme => theme.name));
      } catch (err) {
        console.error('Failed to load themes:', err);
        // Fallback themes
        setAvailableThemes([
          'Religious Practices',
          'Social Customs', 
          'Philosophy',
          'Education',
          'Roman History',
          'Literature',
          'Law',
          'Astronomy',
          'General'
        ]);
      }
    };

    loadThemes();
  }, [isConnected]);

  // Generate quiz questions
  const generateQuiz = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const questions = await macrobiusApi.generateQuizQuestions(
        selectedTheme || undefined,
        selectedDifficulty,
        questionCount
      );
      
      setCurrentQuestions(questions);
      setCurrentQuestion(0);
      setSelectedAnswers(new Array(questions.length).fill(-1));
      setScore(0);
      setQuizCompleted(false);
      setShowAnswer(false);
      setQuizStartTime(Date.now());
      setQuizEndTime(0);
    } catch (err) {
      console.error('Failed to generate quiz:', err);
      setError('Failed to generate quiz from Oracle Cloud');
      
      // Fallback quiz questions for demonstration
      const fallbackQuestions: QuizQuestion[] = [
        {
          id: 'fallback-1',
          question: 'Was war das Saturnalia-Fest im antiken Rom?',
          options: [
            'Ein militärisches Fest zu Ehren des Mars',
            'Ein Fest der Umkehrung sozialer Normen zu Ehren Saturns',
            'Ein Fest der Ernte im Spätsommer',
            'Ein religiöses Fest nur für Priester'
          ],
          correct_answer: 1,
          explanation: 'Das Saturnalia war ein römisches Fest zu Ehren des Gottes Saturn, bei dem soziale Rollen temporär umgekehrt wurden - Sklaven speisten mit ihren Herren.',
          source_passage: 'Saturnalia 1.7.26',
          cultural_context: 'Dieses Fest zeigt die römische Fähigkeit, soziale Spannungen durch rituelle Umkehrung zu bewältigen.',
          difficulty: 'Intermediate'
        },
        {
          id: 'fallback-2',
          question: 'Welche Rolle spielte Bildung (doctrina) in Macrobius\' Werk?',
          options: [
            'Sie war nur für die Elite wichtig',
            'Sie war ein zentrales Element des convivium',
            'Sie wurde als gefährlich angesehen',
            'Sie spielte keine besondere Rolle'
          ],
          correct_answer: 1,
          explanation: 'Bildung war ein zentraler Bestandteil der römischen Gastmähler (convivia), wo gelehrte Diskussionen stattfanden.',
          source_passage: 'Saturnalia 1.1.5',
          cultural_context: 'Bildung war ein sozialer Marker und ein Mittel zur Pflege kultureller Traditionen.',
          difficulty: 'Advanced'
        },
        {
          id: 'fallback-3',
          question: 'Was bedeutete virtus für die Römer?',
          options: [
            'Nur militärische Tapferkeit',
            'Nur moralische Reinheit',
            'Exzellenz in allen Lebensbereichen',
            'Religiöse Frömmigkeit'
          ],
          correct_answer: 2,
          explanation: 'Virtus umfasste für die Römer Exzellenz in allen Bereichen: militärisch, moralisch, intellektuell und sozial.',
          source_passage: 'Saturnalia 3.14.6',
          cultural_context: 'Virtus war das Ideal römischer Männlichkeit und gesellschaftlicher Vollkommenheit.',
          difficulty: 'Beginner'
        }
      ];
      
      const filteredQuestions = fallbackQuestions.filter(q => 
        q.difficulty === selectedDifficulty
      );
      
      const questionsToUse = filteredQuestions.length > 0 ? filteredQuestions : fallbackQuestions;
      setCurrentQuestions(questionsToUse.slice(0, questionCount));
      setCurrentQuestion(0);
      setSelectedAnswers(new Array(questionsToUse.length).fill(-1));
      setScore(0);
      setQuizCompleted(false);
      setShowAnswer(false);
      setQuizStartTime(Date.now());
    } finally {
      setLoading(false);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowAnswer(true);
    
    // Update score if correct
    if (answerIndex === currentQuestions[currentQuestion].correct_answer) {
      setScore(prev => prev + 1);
    }
  };

  // Move to next question
  const handleNextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
    } else {
      completeQuiz();
    }
  };

  // Move to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowAnswer(selectedAnswers[currentQuestion - 1] !== -1);
    }
  };

  // Complete the quiz
  const completeQuiz = () => {
    setQuizCompleted(true);
    setQuizEndTime(Date.now());
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setScore(0);
    setQuizCompleted(false);
    setShowAnswer(false);
    setQuizStartTime(0);
    setQuizEndTime(0);
    setError(null);
  };

  // Calculate metrics
  const getTimeSpent = () => {
    if (quizStartTime && quizEndTime) {
      return Math.round((quizEndTime - quizStartTime) / 1000);
    }
    return 0;
  };

  const getAccuracy = () => {
    if (currentQuestions.length > 0) {
      return Math.round((score / currentQuestions.length) * 100);
    }
    return 0;
  };

  // Connection status component
  const ConnectionStatus = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg mb-6 ${
        connectionLoading 
          ? 'bg-blue-500/20 border border-blue-400/50' 
          : isConnected 
            ? 'bg-green-500/20 border border-green-400/50'
            : 'bg-red-500/20 border border-red-400/50'
      }`}
    >
      {connectionLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
          <span className="text-blue-300 text-sm">Connecting to Oracle Cloud...</span>
        </>
      ) : isConnected ? (
        <>
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-green-300 text-sm">Oracle Cloud Connected</span>
          <Database className="w-4 h-4 text-green-400" />
          <span className="text-green-300 text-sm">Cultural insights available</span>
        </>
      ) : (
        <>
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span className="text-red-300 text-sm">
            Oracle Cloud offline - Using sample questions
          </span>
        </>
      )}
    </motion.div>
  );

  if (!isActive) return null;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Brain className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl font-bold text-yellow-400">Macrobius Quiz</h2>
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
            
            <p className="text-xl text-white/90 mb-6">
              Teste dein Wissen über römische Kultur und Macrobius' Werke
            </p>
            
            <ConnectionStatus />
          </motion.div>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/20 border border-red-400/50 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-300 font-semibold">Error:</span>
              </div>
              <p className="text-red-200 mt-2">{error}</p>
            </motion.div>
          )}

          {/* Quiz Completed */}
          {quizCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8 text-center mb-8"
            >
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-yellow-400 mb-6">Quiz abgeschlossen!</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-400">{score}</div>
                  <div className="text-sm text-white/70">Richtige Antworten</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-400">{currentQuestions.length}</div>
                  <div className="text-sm text-white/70">Gesamtfragen</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-purple-400">{getAccuracy()}%</div>
                  <div className="text-sm text-white/70">Genauigkeit</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-orange-400">{getTimeSpent()}s</div>
                  <div className="text-sm text-white/70">Zeit</div>
                </div>
              </div>

              <button
                onClick={resetQuiz}
                className="px-8 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all flex items-center space-x-2 mx-auto"
              >
                <Zap className="w-5 h-5" />
                <span>Neues Quiz starten</span>
              </button>
            </motion.div>
          )}

          {/* Quiz Setup */}
          {currentQuestions.length === 0 && !loading && (
            <div className="space-y-6">
              {/* Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Theme Selection */}
                <div>
                  <label className="block text-white/80 text-sm mb-2">Kulturelles Thema:</label>
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white"
                  >
                    <option value="">Alle Themen</option>
                    {availableThemes.map(theme => (
                      <option key={theme} value={theme}>{theme}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-white/80 text-sm mb-2">Schwierigkeit:</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value as 'Beginner' | 'Intermediate' | 'Advanced')}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white"
                  >
                    <option value="Beginner">Anfänger</option>
                    <option value="Intermediate">Fortgeschritten</option>
                    <option value="Advanced">Experte</option>
                  </select>
                </div>

                {/* Question Count */}
                <div>
                  <label className="block text-white/80 text-sm mb-2">Anzahl Fragen:</label>
                  <select
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white"
                  >
                    <option value={3}>3 Fragen</option>
                    <option value={5}>5 Fragen</option>
                    <option value={10}>10 Fragen</option>
                    <option value={15}>15 Fragen</option>
                  </select>
                </div>
              </div>

              {/* Generate Quiz Button */}
              <div className="text-center">
                <button
                  onClick={generateQuiz}
                  disabled={loading}
                  className="px-8 py-4 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-3 mx-auto text-lg font-semibold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Quiz wird generiert...</span>
                    </>
                  ) : (
                    <>
                      <Target className="w-6 h-6" />
                      <span>Quiz generieren</span>
                    </>
                  )}
                </button>
              </div>

              {/* Information Card */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-6"
              >
                <h4 className="text-lg font-semibold text-blue-300 mb-3 flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>🧠 Intelligente Quiz-Generierung</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/90">
                  <div>
                    <p><strong>Oracle Cloud:</strong> 1.401 authentische Passagen</p>
                    <p><strong>Kulturelle Einsichten:</strong> 16 Themen verfügbar</p>
                    <p><strong>Adaptive Fragen:</strong> Basierend auf echtem Content</p>
                  </div>
                  <div>
                    <p><strong>Schwierigkeitsgrad:</strong> Anpassbar nach Niveau</p>
                    <p><strong>Themen:</strong> Alle Bereiche der römischen Kultur</p>
                    <p><strong>Erklärungen:</strong> Mit kulturellem Kontext</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-yellow-400 mx-auto mb-4" />
              <p className="text-white/80">Generiere Quiz mit Oracle Cloud...</p>
            </div>
          )}

          {/* Active Quiz */}
          {currentQuestions.length > 0 && !quizCompleted && (
            <div className="space-y-6">
              {/* Progress Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 bg-blue-400/20 text-blue-300 rounded-full text-sm font-medium">
                    Frage {currentQuestion + 1} von {currentQuestions.length}
                  </span>
                  <span className="px-3 py-1 bg-purple-400/20 text-purple-300 rounded-full text-sm font-medium">
                    {currentQuestions[currentQuestion].difficulty}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {Math.round((Date.now() - quizStartTime) / 1000)}s
                  </span>
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white/10 rounded-lg border border-white/20 p-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  {currentQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-3 mb-6">
                  {currentQuestions[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedAnswers[currentQuestion] === index;
                    const isCorrect = index === currentQuestions[currentQuestion].correct_answer;
                    
                    let buttonClass = "w-full p-4 text-left border rounded-lg transition-all ";
                    
                    if (showAnswer) {
                      if (isSelected && isCorrect) {
                        buttonClass += 'border-green-400 bg-green-400/20 text-green-100';
                      } else if (isSelected && !isCorrect) {
                        buttonClass += 'border-red-400 bg-red-400/20 text-red-100';
                      } else if (isCorrect) {
                        buttonClass += 'border-green-400 bg-green-400/20 text-green-100';
                      } else {
                        buttonClass += 'border-white/30 text-white/70';
                      }
                    } else {
                      if (isSelected) {
                        buttonClass += 'border-yellow-400 bg-yellow-400/20 text-white';
                      } else {
                        buttonClass += 'border-white/30 text-white hover:border-yellow-400/60 hover:bg-white/10';
                      }
                    }

                    return (
                      <button
                        key={index}
                        className={buttonClass}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showAnswer}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            {showAnswer && isSelected && (
                              isCorrect ? 
                                <CheckCircle className="w-5 h-5 text-green-400" /> :
                                <XCircle className="w-5 h-5 text-red-400" />
                            )}
                            {showAnswer && !isSelected && isCorrect && (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            )}
                          </div>
                          <span className="flex-1">{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-4 mb-6"
                    >
                      <h4 className="font-semibold text-blue-300 mb-2 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Erklärung
                      </h4>
                      <p className="text-white/90 mb-3">
                        {currentQuestions[currentQuestion].explanation}
                      </p>
                      <div className="border-t border-blue-400/30 pt-3">
                        <h5 className="font-medium text-blue-300 mb-1">🏛️ Kultureller Kontext:</h5>
                        <p className="text-white/80 text-sm mb-2">
                          {currentQuestions[currentQuestion].cultural_context}
                        </p>
                        <p className="text-white/60 text-xs">
                          <strong>📜 Quelle:</strong> {currentQuestions[currentQuestion].source_passage}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    <span>Zurück</span>
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswers[currentQuestion] === -1}
                    className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
                  >
                    <span>
                      {currentQuestion < currentQuestions.length - 1 ? 'Weiter' : 'Quiz beenden'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Oracle Cloud Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-6 mt-8"
          >
            <h4 className="text-lg font-semibold text-blue-300 mb-3 flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>🌐 Oracle Cloud Quiz-System</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/90">
              <div>
                <p><strong>Backend:</strong> Oracle Cloud Free Tier</p>
                <p><strong>Endpunkt:</strong> 152.70.184.232:8080</p>
                <p><strong>Status:</strong> {isConnected ? '✅ Operational' : '❌ Fallback Mode'}</p>
              </div>
              <div>
                <p><strong>Content:</strong> 1.401 authentische Passagen</p>
                <p><strong>Quiz-Engine:</strong> KI-gestützte Fragenerstellung</p>
                <p><strong>Features:</strong> Adaptive Schwierigkeit, kultureller Kontext</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default QuizSection;
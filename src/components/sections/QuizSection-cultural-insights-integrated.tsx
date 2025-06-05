import React, { useState, useEffect } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { MacrobiusAPI, CulturalTheme, CulturalInsight } from '../../lib/enhanced-api-client'
import { 
  Brain, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  ArrowRight,
  RotateCcw,
  Trophy,
  Filter,
  Star,
  Zap,
  Crown,
  BookOpen,
  Clock,
  Database,
  Lightbulb,
  Users,
  Scroll,
  Globe
} from 'lucide-react'

interface QuizSectionProps {
  language: 'DE' | 'EN' | 'LA'
}

interface CulturalQuestion {
  id: string;
  text: string;
  answers: Array<{
    id: string;
    text: string;
    is_correct: boolean;
    explanation: string;
  }>;
  cultural_context: string;
  source_insight: string;
  difficulty: string;
  theme: string;
}

interface GeneratedQuiz {
  quiz_id: string;
  questions: CulturalQuestion[];
  insights_used: CulturalInsight[];
  themes_covered: string[];
  difficulty_level: string;
}

const translations = {
  DE: {
    title: 'Macrobius Quiz-System',
    subtitle: 'Kulturelle Einsichten durch dynamische Quizgenerierung (16 Insights verfügbar)',
    loading: 'Lade...',
    selectTheme: 'Wähle ein kulturelles Thema',
    selectInsights: 'Wähle kulturelle Einsichten',
    generateQuiz: 'Quiz generieren',
    startQuiz: 'Quiz starten',
    nextQuestion: 'Nächste Frage',
    previousQuestion: 'Vorherige Frage',
    tryAgain: 'Erneut versuchen',
    quizComplete: 'Quiz abgeschlossen!',
    yourScore: 'Deine Punktzahl',
    correctAnswers: 'Richtige Antworten',
    backToSelection: 'Zurück zur Auswahl',
    noInsights: 'Keine Einsichten verfügbar',
    noQuestions: 'Keine Fragen verfügbar',
    error: 'Fehler beim Laden der Daten',
    connectionError: 'Verbindung zum Server fehlgeschlagen',
    explanation: 'Erklärung',
    culturalContext: 'Kultureller Kontext',
    sourceInsight: 'Quelle der Einsicht',
    timeSpent: 'Benötigte Zeit',
    accuracy: 'Genauigkeit',
    difficulty: {
      all: 'Alle Schwierigkeiten',
      beginner: 'Anfänger',
      intermediate: 'Fortgeschritten',
      advanced: 'Fortgeschritten'
    },
    themes: {
      'Religious Practices': 'Religiöse Praktiken',
      'Social Customs': 'Gesellschaftliche Bräuche',
      'Philosophy': 'Philosophie',
      'Education': 'Bildung',
      'Roman History': 'Römische Geschichte',
      'Literature': 'Literatur',
      'Law': 'Recht',
      'Astronomy': 'Astronomie',
      'General': 'Allgemein'
    },
    filterBy: 'Filtern nach',
    reviewIncorrect: 'Falsche Antworten wiederholen',
    showExplanation: 'Erklärung anzeigen',
    backendStatus: 'Backend-Status',
    connected: 'Verbunden mit Oracle Cloud',
    availableInsights: 'Verfügbare Einsichten',
    culturalThemes: 'Kulturelle Themen',
    quizGeneration: 'Quiz-Generierung',
    dynamicContent: 'Dynamischer Inhalt',
    insightBased: 'Basierend auf kulturellen Einsichten',
    questionsGenerated: 'Fragen generiert',
    themesUsed: 'Verwendete Themen'
  },
  EN: {
    title: 'Macrobius Quiz System',
    subtitle: 'Cultural Insights through Dynamic Quiz Generation (16 Insights Available)',
    loading: 'Loading...',
    selectTheme: 'Select a Cultural Theme',
    selectInsights: 'Select Cultural Insights',
    generateQuiz: 'Generate Quiz',
    startQuiz: 'Start Quiz',
    nextQuestion: 'Next Question',
    previousQuestion: 'Previous Question',
    tryAgain: 'Try Again',
    quizComplete: 'Quiz Complete!',
    yourScore: 'Your Score',
    correctAnswers: 'Correct Answers',
    backToSelection: 'Back to Selection',
    noInsights: 'No Insights Available',
    noQuestions: 'No Questions Available',
    error: 'Error Loading Data',
    connectionError: 'Failed to Connect to Server',
    explanation: 'Explanation',
    culturalContext: 'Cultural Context',
    sourceInsight: 'Source Insight',
    timeSpent: 'Time Spent',
    accuracy: 'Accuracy',
    difficulty: {
      all: 'All Difficulties',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced'
    },
    themes: {
      'Religious Practices': 'Religious Practices',
      'Social Customs': 'Social Customs',
      'Philosophy': 'Philosophy',
      'Education': 'Education',
      'Roman History': 'Roman History',
      'Literature': 'Literature',
      'Law': 'Law',
      'Astronomy': 'Astronomy',
      'General': 'General'
    },
    filterBy: 'Filter By',
    reviewIncorrect: 'Review Incorrect Answers',
    showExplanation: 'Show Explanation',
    backendStatus: 'Backend Status',
    connected: 'Connected to Oracle Cloud',
    availableInsights: 'Available Insights',
    culturalThemes: 'Cultural Themes',
    quizGeneration: 'Quiz Generation',
    dynamicContent: 'Dynamic Content',
    insightBased: 'Based on Cultural Insights',
    questionsGenerated: 'Questions Generated',
    themesUsed: 'Themes Used'
  },
  LA: {
    title: 'Systema Quaestionum de Macrobio',
    subtitle: 'Intellectus Culturales per Generationem Dynamicam (16 Intellectus Disponibiles)',
    loading: 'Oneratur...',
    selectTheme: 'Thema Culturale Elige',
    selectInsights: 'Intellectus Culturales Elige',
    generateQuiz: 'Quaestionarium Generare',
    startQuiz: 'Quaestionarium Incipere',
    nextQuestion: 'Quaestio Sequens',
    previousQuestion: 'Quaestio Prior',
    tryAgain: 'Iterum Temptare',
    quizComplete: 'Quaestionarium Completum!',
    yourScore: 'Numerus Tuus',
    correctAnswers: 'Responsiones Rectae',
    backToSelection: 'Ad Selectionem Redire',
    noInsights: 'Nulli Intellectus Disponibiles',
    noQuestions: 'Nullae Quaestiones Disponibiliae',
    error: 'Error in Datis Onerando',
    connectionError: 'Connexio ad Servum Defecit',
    explanation: 'Explicatio',
    culturalContext: 'Contextus Culturalis',
    sourceInsight: 'Fons Intellectus',
    timeSpent: 'Tempus Consumptum',
    accuracy: 'Accuratio',
    difficulty: {
      all: 'Omnes Difficultates',
      beginner: 'Incipiens',
      intermediate: 'Medius',
      advanced: 'Provectus'
    },
    themes: {
      'Religious Practices': 'Pratices Religiosae',
      'Social Customs': 'Consuetudines Sociales',
      'Philosophy': 'Philosophia',
      'Education': 'Educatio',
      'Roman History': 'Historia Romana',
      'Literature': 'Literatura',
      'Law': 'Ius',
      'Astronomy': 'Astronomia',
      'General': 'Generalis'
    },
    filterBy: 'Filtrare Per',
    reviewIncorrect: 'Responsiones Falsas Repetere',
    showExplanation: 'Explicationem Monstrare',
    backendStatus: 'Status Systematis',
    connected: 'Connexum ad Oracle Cloud',
    availableInsights: 'Intellectus Disponibiles',
    culturalThemes: 'Themata Culturalia',
    quizGeneration: 'Generatio Quaestionum',
    dynamicContent: 'Contentus Dynamicus',
    insightBased: 'Basatus in Intellectibus Culturalibus',
    questionsGenerated: 'Quaestiones Generatae',
    themesUsed: 'Themata Usata'
  }
}

export function QuizSection({ language }: QuizSectionProps) {
  // State management
  const [culturalThemes, setCulturalThemes] = useState<CulturalTheme[]>([]);
  const [culturalInsights, setCulturalInsights] = useState<CulturalInsight[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<CulturalTheme | null>(null);
  const [selectedInsights, setSelectedInsights] = useState<CulturalInsight[]>([]);
  const [generatedQuiz, setGeneratedQuiz] = useState<GeneratedQuiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'connected' | 'error' | 'loading'>('loading');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('intermediate');
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  const [quizEndTime, setQuizEndTime] = useState<number>(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const t = translations[language];

  // Load cultural themes and insights from backend
  useEffect(() => {
    const loadCulturalData = async () => {
      setLoading(true);
      try {
        // Check backend health
        const healthResponse = await MacrobiusAPI.system.healthCheck();
        if (healthResponse.status === 'success') {
          setBackendStatus('connected');
          
          // Load cultural themes
          const themesResponse = await MacrobiusAPI.cultural.getThemes();
          if (themesResponse.status === 'success' && themesResponse.data) {
            setCulturalThemes(themesResponse.data.themes);
          }
          
          // Load cultural insights
          const insightsResponse = await MacrobiusAPI.cultural.getInsights();
          if (insightsResponse.status === 'success' && insightsResponse.data) {
            setCulturalInsights(insightsResponse.data.insights);
          }
        } else {
          setBackendStatus('error');
          setError('Backend connection failed');
        }
      } catch (err) {
        console.error('Failed to load cultural data:', err);
        setBackendStatus('error');
        setError('Network error');
      }
      setLoading(false);
    };

    loadCulturalData();
  }, []);

  // Filter insights by selected theme and difficulty
  const filteredInsights = culturalInsights.filter(insight => {
    const difficultyMatch = selectedDifficulty === 'all' || insight.difficulty_level === selectedDifficulty;
    const themeMatch = !selectedTheme || insight.related_passages.some(passage => 
      // This would ideally check against passage themes, for now we'll use a simple match
      true
    );
    return difficultyMatch && themeMatch;
  });

  // Generate quiz from selected insights
  const generateQuiz = async () => {
    if (selectedInsights.length === 0) return;
    
    setLoading(true);
    try {
      const insightIds = selectedInsights.map(insight => insight.id);
      const response = await MacrobiusAPI.quiz.generateCulturalQuiz(
        insightIds,
        selectedDifficulty,
        Math.min(selectedInsights.length * 2, 10) // 2 questions per insight, max 10
      );
      
      if (response.status === 'success' && response.data) {
        const quiz: GeneratedQuiz = {
          quiz_id: response.data.quiz_id,
          questions: response.data.questions.map(q => ({
            id: q.id,
            text: q.text,
            answers: q.answers,
            cultural_context: q.cultural_context,
            source_insight: q.source_insight,
            difficulty: selectedDifficulty,
            theme: selectedTheme?.name || 'Mixed'
          })),
          insights_used: selectedInsights,
          themes_covered: selectedTheme ? [selectedTheme.name] : ['Mixed'],
          difficulty_level: selectedDifficulty
        };
        
        setGeneratedQuiz(quiz);
        setSelectedAnswers(new Array(quiz.questions.length).fill(''));
        setCurrentQuestion(0);
        setScore(0);
        setQuizCompleted(false);
        setShowExplanation(false);
        setIncorrectQuestions([]);
      } else {
        setError('Failed to generate quiz');
      }
    } catch (err) {
      console.error('Quiz generation failed:', err);
      setError('Quiz generation failed');
    }
    setLoading(false);
  };

  const handleThemeSelect = (theme: CulturalTheme) => {
    setSelectedTheme(theme);
    setSelectedInsights([]);
    setGeneratedQuiz(null);
  };

  const handleInsightToggle = (insight: CulturalInsight) => {
    setSelectedInsights(prev => {
      const isSelected = prev.some(i => i.id === insight.id);
      if (isSelected) {
        return prev.filter(i => i.id !== insight.id);
      } else {
        return [...prev, insight];
      }
    });
  };

  const handleAnswerSelect = (answerId: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerId;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (!generatedQuiz) return;
    
    if (currentQuestion < generatedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      completeQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(selectedAnswers[currentQuestion - 1] !== '');
    }
  };

  const completeQuiz = () => {
    if (!generatedQuiz) return;
    
    let correctCount = 0;
    const incorrect: number[] = [];
    
    generatedQuiz.questions.forEach((question, index) => {
      const selectedAnswerId = selectedAnswers[index];
      const correctAnswer = question.answers.find(a => a.is_correct);
      
      if (selectedAnswerId === correctAnswer?.id) {
        correctCount++;
      } else {
        incorrect.push(index);
      }
    });
    
    setScore(correctCount);
    setIncorrectQuestions(incorrect);
    setQuizEndTime(Date.now());
    setQuizCompleted(true);
    
    // Submit results to backend
    if (generatedQuiz.quiz_id) {
      const answers: Record<string, string> = {};
      generatedQuiz.questions.forEach((question, index) => {
        answers[question.id] = selectedAnswers[index] || '';
      });
      MacrobiusAPI.quiz.submitQuizResults(generatedQuiz.quiz_id, answers);
    }
  };

  const resetQuiz = () => {
    setSelectedTheme(null);
    setSelectedInsights([]);
    setGeneratedQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setScore(0);
    setQuizCompleted(false);
    setShowExplanation(false);
    setIncorrectQuestions([]);
    setError(null);
  };

  const startQuiz = () => {
    setQuizStartTime(Date.now());
    setCurrentQuestion(0);
    setShowExplanation(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return <Star className="h-3 w-3" />;
      case 'intermediate': return <Zap className="h-3 w-3" />;
      case 'advanced': return <Brain className="h-3 w-3" />;
      default: return <Star className="h-3 w-3" />;
    }
  };

  const getBackendStatusColor = () => {
    switch (backendStatus) {
      case 'connected': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getTimeSpent = () => {
    if (quizStartTime && quizEndTime) {
      return Math.round((quizEndTime - quizStartTime) / 1000);
    }
    return 0;
  };

  const getAccuracy = () => {
    if (generatedQuiz) {
      return Math.round((score / generatedQuiz.questions.length) * 100);
    }
    return 0;
  };

  return (
    <section id="quiz" className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Backend Status */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-4">
            {t.subtitle}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className={`flex items-center space-x-2 ${getBackendStatusColor()}`}>
              <Database className="w-4 h-4" />
              <span className="font-medium">
                {backendStatus === 'connected' ? t.connected : 
                 backendStatus === 'error' ? 'Backend Offline' : 'Connecting...'}
              </span>
            </div>
            {culturalInsights.length > 0 && (
              <>
                <div className="text-white/70">•</div>
                <div className="text-white/70">
                  {culturalInsights.length} {t.availableInsights}
                </div>
              </>
            )}
            {culturalThemes.length > 0 && (
              <>
                <div className="text-white/70">•</div>
                <div className="text-white/70">
                  {culturalThemes.length} {t.culturalThemes}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Error Display */}
          {error && (
            <Card className="p-6 mb-8 bg-red-50 border-red-200">
              <div className="flex items-center space-x-3 text-red-700">
                <XCircle className="w-6 h-6" />
                <span className="font-medium">{error}</span>
              </div>
            </Card>
          )}

          {/* Loading State */}
          {loading && (
            <Card className="p-8 text-center mb-8 bg-white/10 backdrop-blur-sm border border-gold/30">
              <Loader2 className="h-12 w-12 text-gold mx-auto mb-4 animate-spin" />
              <p className="text-white/80">{t.loading}</p>
            </Card>
          )}

          {/* Quiz Completed */}
          {quizCompleted && generatedQuiz && (
            <Card className="p-8 text-center mb-8 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.quizComplete}</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl font-bold text-green-600">{score}</div>
                  <div className="text-sm text-gray-600">{t.correctAnswers}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl font-bold text-blue-600">{generatedQuiz.questions.length}</div>
                  <div className="text-sm text-gray-600">{t.questionsGenerated}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl font-bold text-purple-600">{getAccuracy()}%</div>
                  <div className="text-sm text-gray-600">{t.accuracy}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl font-bold text-orange-600">{getTimeSpent()}s</div>
                  <div className="text-sm text-gray-600">{t.timeSpent}</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">{t.themesUsed}:</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {generatedQuiz.themes_covered.map(theme => (
                    <Badge key={theme} variant="outline" className="bg-blue-100 text-blue-700">
                      {t.themes[theme as keyof typeof t.themes] || theme}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={resetQuiz} className="bg-purple-600 hover:bg-purple-700 text-white">
                  {t.backToSelection}
                </Button>
                {incorrectQuestions.length > 0 && (
                  <Button 
                    onClick={() => {
                      setCurrentQuestion(incorrectQuestions[0]);
                      setQuizCompleted(false);
                      setShowExplanation(true);
                    }}
                    variant="outline"
                    className="border-orange-500 text-orange-600 hover:bg-orange-50"
                  >
                    {t.reviewIncorrect} ({incorrectQuestions.length})
                  </Button>
                )}
              </div>
            </Card>
          )}

          {/* Theme Selection */}
          {!selectedTheme && !generatedQuiz && backendStatus === 'connected' && (
            <div>
              <h3 className="text-2xl font-bold text-gold mb-6 text-center">{t.selectTheme}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {culturalThemes.map((theme) => (
                  <Card 
                    key={theme.id} 
                    className="p-6 cursor-pointer hover:shadow-lg transition-all bg-white/10 backdrop-blur-sm border border-gold/30 hover:border-gold/60"
                    onClick={() => handleThemeSelect(theme)}
                  >
                    <Globe className="h-8 w-8 text-gold mb-3" />
                    <h4 className="font-bold text-lg mb-2 text-white">
                      {t.themes[theme.name as keyof typeof t.themes] || theme.name}
                    </h4>
                    <p className="text-white/70 text-sm mb-3">{theme.description}</p>
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>{theme.passage_count} passages</span>
                      <Badge variant="outline" className="border-gold/50 text-gold">
                        {theme.educational_level}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
              
              {/* Option to generate mixed quiz */}
              <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border border-gold/30">
                <Lightbulb className="h-8 w-8 text-gold mx-auto mb-3" />
                <h4 className="font-bold text-lg mb-2 text-white">Mixed Cultural Quiz</h4>
                <p className="text-white/70 mb-4">Generate a quiz from all available cultural insights</p>
                <Button 
                  onClick={() => setSelectedInsights(culturalInsights.slice(0, 5))}
                  className="bg-gold hover:bg-gold/80 text-black"
                >
                  Select All Insights
                </Button>
              </Card>
            </div>
          )}

          {/* Insight Selection */}
          {selectedTheme && !generatedQuiz && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gold">{t.selectInsights}</h3>
                <Button variant="outline" onClick={() => setSelectedTheme(null)} className="border-gold text-gold hover:bg-gold/10">
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  {t.selectTheme}
                </Button>
              </div>
              
              {/* Difficulty Filter */}
              <Card className="p-4 mb-6 bg-white/10 backdrop-blur-sm border border-gold/30">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gold" />
                    <span className="text-sm font-medium text-white">{t.filterBy}:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(t.difficulty).map(([key, label]) => (
                      <Button
                        key={key}
                        variant={selectedDifficulty === key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDifficulty(key)}
                        className="text-xs"
                      >
                        {getDifficultyIcon(key)}
                        <span className="ml-1">{label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
              
              {/* Available Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {filteredInsights.map((insight) => {
                  const isSelected = selectedInsights.some(i => i.id === insight.id);
                  return (
                    <Card 
                      key={insight.id} 
                      className={`p-4 cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-gold/20 border-gold' 
                          : 'bg-white/10 border-gold/30 hover:border-gold/60'
                      } backdrop-blur-sm`}
                      onClick={() => handleInsightToggle(insight)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-bold text-white text-sm">{insight.title}</h4>
                        <Badge className={getDifficultyColor(insight.difficulty_level)}>
                          {insight.difficulty_level}
                        </Badge>
                      </div>
                      <p className="text-white/70 text-xs mb-3 line-clamp-3">{insight.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/60">{insight.educational_value}</span>
                        {isSelected && <CheckCircle className="h-4 w-4 text-gold" />}
                      </div>
                    </Card>
                  );
                })}
              </div>
              
              {/* Generate Quiz Button */}
              {selectedInsights.length > 0 && (
                <div className="text-center">
                  <Button 
                    onClick={generateQuiz}
                    disabled={loading}
                    className="bg-wine-red hover:bg-wine-red/80 text-gold px-8 py-3"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t.loading}
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        {t.generateQuiz} ({selectedInsights.length} insights)
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Generated Quiz Display */}
          {generatedQuiz && !quizCompleted && (
            <div>
              {!quizStartTime ? (
                /* Quiz Preview */
                <Card className="p-8 text-center bg-white/10 backdrop-blur-sm border border-gold/30">
                  <Brain className="h-16 w-16 text-gold mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">{t.quizGeneration}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-black/20 p-4 rounded">
                      <div className="text-2xl font-bold text-gold">{generatedQuiz.questions.length}</div>
                      <div className="text-sm text-white/70">{t.questionsGenerated}</div>
                    </div>
                    <div className="bg-black/20 p-4 rounded">
                      <div className="text-2xl font-bold text-gold">{generatedQuiz.insights_used.length}</div>
                      <div className="text-sm text-white/70">{t.availableInsights}</div>
                    </div>
                    <div className="bg-black/20 p-4 rounded">
                      <div className="text-2xl font-bold text-gold">{generatedQuiz.themes_covered.length}</div>
                      <div className="text-sm text-white/70">{t.themesUsed}</div>
                    </div>
                    <div className="bg-black/20 p-4 rounded">
                      <Badge className={getDifficultyColor(generatedQuiz.difficulty_level)} >
                        {generatedQuiz.difficulty_level}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button onClick={resetQuiz} variant="outline" className="border-gold text-gold">
                      {t.backToSelection}
                    </Button>
                    <Button onClick={startQuiz} className="bg-wine-red hover:bg-wine-red/80 text-gold">
                      {t.startQuiz}
                    </Button>
                  </div>
                </Card>
              ) : (
                /* Question Display */
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {currentQuestion + 1} / {generatedQuiz.questions.length}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-white/60" />
                      <span className="text-sm text-white/60">
                        {Math.round((Date.now() - quizStartTime) / 1000)}s
                      </span>
                    </div>
                    <Button variant="outline" onClick={resetQuiz} className="border-gold text-gold">
                      <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                      {t.backToSelection}
                    </Button>
                  </div>

                  <Card className="p-8 bg-white/10 backdrop-blur-sm border border-gold/30">
                    <div className="mb-6">
                      <Badge className={getDifficultyColor(generatedQuiz.questions[currentQuestion].difficulty)}>
                        {generatedQuiz.questions[currentQuestion].difficulty}
                      </Badge>
                      <Badge variant="outline" className="ml-2 border-gold text-gold">
                        {generatedQuiz.questions[currentQuestion].theme}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-6">
                      {generatedQuiz.questions[currentQuestion].text}
                    </h3>

                    <div className="space-y-3 mb-8">
                      {generatedQuiz.questions[currentQuestion].answers.map((answer) => {
                        const isSelected = selectedAnswers[currentQuestion] === answer.id;
                        let buttonClass = "w-full p-4 text-left border rounded-lg transition-all ";
                        
                        if (isSelected) {
                          if (showExplanation) {
                            buttonClass += answer.is_correct 
                              ? 'border-green-500 bg-green-500/20 text-green-100' 
                              : 'border-red-500 bg-red-500/20 text-red-100';
                          } else {
                            buttonClass += 'border-gold bg-gold/20 text-white';
                          }
                        } else if (showExplanation && answer.is_correct) {
                          buttonClass += 'border-green-500 bg-green-500/20 text-green-100';
                        } else {
                          buttonClass += 'border-white/30 text-white hover:border-gold/60 hover:bg-white/10';
                        }

                        return (
                          <button
                            key={answer.id}
                            className={buttonClass}
                            onClick={() => handleAnswerSelect(answer.id)}
                            disabled={showExplanation}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-1">
                                {showExplanation && isSelected && (
                                  answer.is_correct ? 
                                    <CheckCircle className="h-5 w-5 text-green-400" /> :
                                    <XCircle className="h-5 w-5 text-red-400" />
                                )}
                                {showExplanation && !isSelected && answer.is_correct && (
                                  <CheckCircle className="h-5 w-5 text-green-400" />
                                )}
                              </div>
                              <span className="flex-1">{answer.text}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {showExplanation && (
                      <div className="bg-blue-900/40 p-4 rounded-lg mb-6 border border-blue-400/30">
                        <h4 className="font-semibold text-gold mb-2 flex items-center">
                          <BookOpen className="h-4 w-4 mr-2" />
                          {t.explanation}
                        </h4>
                        <p className="text-white/90 mb-3">
                          {generatedQuiz.questions[currentQuestion].answers.find(a => a.is_correct)?.explanation}
                        </p>
                        <div className="border-t border-blue-400/30 pt-3">
                          <h5 className="font-medium text-gold mb-1">{t.culturalContext}:</h5>
                          <p className="text-white/80 text-sm mb-2">
                            {generatedQuiz.questions[currentQuestion].cultural_context}
                          </p>
                          <p className="text-white/60 text-xs">
                            <strong>{t.sourceInsight}:</strong> {generatedQuiz.questions[currentQuestion].source_insight}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <Button 
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestion === 0}
                        variant="outline"
                        className="border-gold text-gold"
                      >
                        <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                        {t.previousQuestion}
                      </Button>

                      <Button 
                        onClick={handleNextQuestion}
                        disabled={selectedAnswers[currentQuestion] === ''}
                        className="bg-wine-red hover:bg-wine-red/80 text-gold"
                      >
                        {currentQuestion < generatedQuiz.questions.length - 1 ? t.nextQuestion : t.quizComplete}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* No Data States */}
          {!loading && backendStatus === 'connected' && culturalInsights.length === 0 && (
            <Card className="p-8 text-center bg-white/10 backdrop-blur-sm border border-gold/30">
              <Brain className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/60 text-lg">{t.noInsights}</p>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

export default QuizSection;
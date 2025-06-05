'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MacrobiusAPI, MacrobiusVocabulary, MacrobiusPassage } from '../../lib/enhanced-api-client';
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Target, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Zap,
  Star,
  Award,
  Timer,
  Volume2,
  Database,
  TrendingUp,
  Eye,
  Scroll,
  Hash,
  Lightbulb,
  Users,
  Globe
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
}

interface LearningSession {
  correct: number;
  incorrect: number;
  streak: number;
  startTime: number;
  wordsStudied: Set<string>;
}

interface VocabularyStats {
  totalWords: number;
  totalInstances: number;
  difficultyDistribution: Record<string, number>;
  mostFrequentWords: MacrobiusVocabulary[];
}

interface VocabularyTrainerSectionProps {
  language: Language;
}

const VocabularyTrainerSection: React.FC<VocabularyTrainerSectionProps> = ({ language }) => {
  // Enhanced State Management
  const [currentMode, setCurrentMode] = useState<'practice' | 'quiz' | 'review' | 'explore'>('practice');
  const [currentWord, setCurrentWord] = useState<MacrobiusVocabulary | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [session, setSession] = useState<LearningSession>({
    correct: 0,
    incorrect: 0,
    streak: 0,
    startTime: Date.now(),
    wordsStudied: new Set()
  });
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(5); // 1-10 scale
  const [selectedFrequency, setSelectedFrequency] = useState<number>(10); // minimum frequency
  const [vocabularyPool, setVocabularyPool] = useState<MacrobiusVocabulary[]>([]);
  const [reviewWords, setReviewWords] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [backendStatus, setBackendStatus] = useState<'connected' | 'error' | 'loading'>('loading');
  const [vocabularyStats, setVocabularyStats] = useState<VocabularyStats | null>(null);
  const [relatedPassages, setRelatedPassages] = useState<MacrobiusPassage[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [expandedInfo, setExpandedInfo] = useState<boolean>(false);

  // Enhanced Translations
  const translations = {
    de: {
      title: 'Macrobius Vokabeltrainer',
      subtitle: 'Authentisches Lateinvokabular aus dem kompletten Korpus (235K+ Zeichen)',
      modes: {
        practice: 'Üben',
        quiz: 'Quiz',
        review: 'Wiederholen',
        explore: 'Erkunden'
      },
      difficulty: {
        all: 'Alle Schwierigkeiten',
        easy: 'Einfach (1-3)',
        medium: 'Mittel (4-7)',
        hard: 'Schwer (8-10)'
      },
      frequency: {
        high: 'Häufig (50+)',
        medium: 'Mittel (10-49)',
        low: 'Selten (1-9)',
        all: 'Alle'
      },
      actions: {
        start: 'Training beginnen',
        next: 'Nächstes Wort',
        check: 'Antwort prüfen',
        showAnswer: 'Antwort zeigen',
        correct: 'Richtig',
        incorrect: 'Falsch',
        restart: 'Neustart',
        loadVocabulary: 'Vokabular laden',
        exploreCorpus: 'Korpus erkunden',
        showPassages: 'Textstellen anzeigen'
      },
      stats: {
        correct: 'Richtig',
        incorrect: 'Falsch',
        streak: 'Serie',
        accuracy: 'Genauigkeit',
        time: 'Zeit',
        studied: 'Gelernt'
      },
      labels: {
        frequency: 'Häufigkeit',
        passages: 'Fundstellen',
        forms: 'Grammatische Formen',
        contexts: 'Semantische Kontexte',
        significance: 'Kulturelle Bedeutung',
        cognates: 'Moderne Verwandte',
        difficulty: 'Schwierigkeit',
        corpusStats: 'Korpus-Statistiken',
        totalWords: 'Gesamtwörter',
        totalInstances: 'Gesamtvorkommen',
        mostFrequent: 'Häufigste Wörter',
        backendStatus: 'Backend-Status',
        connected: 'Verbunden mit Oracle Cloud',
        searchCorpus: 'Korpus durchsuchen'
      }
    },
    en: {
      title: 'Macrobius Vocabulary Trainer',
      subtitle: 'Authentic Latin Vocabulary from Complete Corpus (235K+ Characters)',
      modes: {
        practice: 'Practice',
        quiz: 'Quiz',
        review: 'Review',
        explore: 'Explore'
      },
      difficulty: {
        all: 'All Difficulties',
        easy: 'Easy (1-3)',
        medium: 'Medium (4-7)',
        hard: 'Hard (8-10)'
      },
      frequency: {
        high: 'High (50+)',
        medium: 'Medium (10-49)',
        low: 'Low (1-9)',
        all: 'All'
      },
      actions: {
        start: 'Start Training',
        next: 'Next Word',
        check: 'Check Answer',
        showAnswer: 'Show Answer',
        correct: 'Correct',
        incorrect: 'Incorrect',
        restart: 'Restart',
        loadVocabulary: 'Load Vocabulary',
        exploreCorpus: 'Explore Corpus',
        showPassages: 'Show Passages'
      },
      stats: {
        correct: 'Correct',
        incorrect: 'Incorrect',
        streak: 'Streak',
        accuracy: 'Accuracy',
        time: 'Time',
        studied: 'Studied'
      },
      labels: {
        frequency: 'Frequency',
        passages: 'Found in Passages',
        forms: 'Grammatical Forms',
        contexts: 'Semantic Contexts',
        significance: 'Cultural Significance',
        cognates: 'Modern Cognates',
        difficulty: 'Difficulty Rating',
        corpusStats: 'Corpus Statistics',
        totalWords: 'Total Words',
        totalInstances: 'Total Instances',
        mostFrequent: 'Most Frequent Words',
        backendStatus: 'Backend Status',
        connected: 'Connected to Oracle Cloud',
        searchCorpus: 'Search Corpus'
      }
    },
    la: {
      title: 'Exercitator Vocabulorum Macrobii',
      subtitle: 'Vocabularium Latinum Authenticum ex Corpore Completo (235K+ Characteres)',
      modes: {
        practice: 'Exercitium',
        quiz: 'Quaestiones',
        review: 'Repetitio',
        explore: 'Exploratio'
      },
      difficulty: {
        all: 'Omnes Difficultates',
        easy: 'Facile (1-3)',
        medium: 'Medium (4-7)',
        hard: 'Difficile (8-10)'
      },
      frequency: {
        high: 'Frequens (50+)',
        medium: 'Medius (10-49)',
        low: 'Rarus (1-9)',
        all: 'Omnes'
      },
      actions: {
        start: 'Exercitium Incipere',
        next: 'Verbum Sequens',
        check: 'Responsionem Probare',
        showAnswer: 'Responsionem Monstrare',
        correct: 'Rectum',
        incorrect: 'Falsum',
        restart: 'Iterum Incipere',
        loadVocabulary: 'Vocabularium Onerare',
        exploreCorpus: 'Corpus Explorare',
        showPassages: 'Loca Monstrare'
      },
      stats: {
        correct: 'Recta',
        incorrect: 'Falsa',
        streak: 'Series',
        accuracy: 'Accuratio',
        time: 'Tempus',
        studied: 'Studita'
      },
      labels: {
        frequency: 'Frequentia',
        passages: 'In Locis Inventa',
        forms: 'Formae Grammaticae',
        contexts: 'Contextus Semantici',
        significance: 'Significatio Culturalis',
        cognates: 'Cognata Moderna',
        difficulty: 'Gradus Difficultatis',
        corpusStats: 'Statisticae Corporis',
        totalWords: 'Verba Totalia',
        totalInstances: 'Instantiae Totales',
        mostFrequent: 'Verba Frequentissima',
        backendStatus: 'Status Systematis',
        connected: 'Connexum ad Oracle Cloud',
        searchCorpus: 'Corpus Quaerere'
      }
    }
  };

  const t = translations[language.code as keyof typeof translations] || translations.en;

  // Load vocabulary and backend connection
  useEffect(() => {
    const loadVocabularyData = async () => {
      setLoading(true);
      try {
        // Check backend health
        const healthResponse = await MacrobiusAPI.system.healthCheck();
        if (healthResponse.status === 'success') {
          setBackendStatus('connected');
          
          // Load vocabulary statistics
          const statsResponse = await MacrobiusAPI.vocabulary.getVocabularyStatistics();
          if (statsResponse.status === 'success' && statsResponse.data) {
            setVocabularyStats(statsResponse.data);
          }
          
          // Load initial vocabulary pool (high frequency words)
          await loadVocabularyPool();
        } else {
          setBackendStatus('error');
          setError('Backend connection failed');
        }
      } catch (err) {
        console.error('Failed to load vocabulary data:', err);
        setBackendStatus('error');
        setError('Network error');
      }
      setLoading(false);
    };

    loadVocabularyData();
  }, []);

  // Load vocabulary pool based on filters
  const loadVocabularyPool = async () => {
    setLoading(true);
    try {
      const response = await MacrobiusAPI.vocabulary.getHighFrequencyWords(100);
      if (response.status === 'success' && response.data) {
        const filteredWords = response.data.vocabulary.filter(word => 
          word.difficulty_rating <= selectedDifficulty && 
          word.frequency >= selectedFrequency
        );
        setVocabularyPool(filteredWords);
        
        // Set initial word
        if (filteredWords.length > 0 && !currentWord) {
          setCurrentWord(filteredWords[Math.floor(Math.random() * filteredWords.length)]);
        }
      }
    } catch (err) {
      console.error('Failed to load vocabulary pool:', err);
      setError('Failed to load vocabulary');
    }
    setLoading(false);
  };

  // Search vocabulary by query
  const searchVocabulary = async (query: string) => {
    if (!query.trim()) {
      await loadVocabularyPool();
      return;
    }
    
    setLoading(true);
    try {
      const response = await MacrobiusAPI.vocabulary.searchVocabulary(query, {
        difficulty: selectedDifficulty,
        frequency_min: selectedFrequency,
        limit: 50
      });
      
      if (response.status === 'success' && response.data) {
        setVocabularyPool(response.data.vocabulary);
      }
    } catch (err) {
      console.error('Vocabulary search failed:', err);
      setError('Search failed');
    }
    setLoading(false);
  };

  // Load passages for current word
  const loadWordPassages = async (word: MacrobiusVocabulary) => {
    if (word.passages_found.length === 0) return;
    
    try {
      // Get first few passages where this word appears
      const passagePromises = word.passages_found.slice(0, 3).map(passageId => 
        MacrobiusAPI.passages.getPassage(passageId)
      );
      
      const responses = await Promise.all(passagePromises);
      const passages = responses
        .filter(r => r.status === 'success' && r.data)
        .map(r => r.data as MacrobiusPassage);
      
      setRelatedPassages(passages);
    } catch (err) {
      console.error('Failed to load passages:', err);
    }
  };

  // Get next word from pool
  const getNextWord = () => {
    if (vocabularyPool.length === 0) return null;
    
    // Avoid recently studied words
    const availableWords = vocabularyPool.filter(word => 
      !session.wordsStudied.has(word.id) || session.wordsStudied.size >= vocabularyPool.length
    );
    
    const pool = availableWords.length > 0 ? availableWords : vocabularyPool;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  };

  // Start new session
  const startNewSession = () => {
    setSession({
      correct: 0,
      incorrect: 0,
      streak: 0,
      startTime: Date.now(),
      wordsStudied: new Set()
    });
    setCurrentWord(getNextWord());
    setUserAnswer('');
    setShowAnswer(false);
    setError(null);
  };

  // Check answer
  const checkAnswer = () => {
    if (!currentWord) return;
    
    // Create multiple acceptable answers from translations and forms
    const acceptableAnswers = [
      ...(currentWord.modern_cognates || []),
      // Add basic translation logic here based on language
    ].map(answer => answer.toLowerCase().trim());
    
    const userAnswerClean = userAnswer.toLowerCase().trim();
    const isCorrect = acceptableAnswers.some(answer => 
      userAnswerClean === answer || 
      userAnswerClean.includes(answer) || 
      answer.includes(userAnswerClean)
    );
    
    // Update session
    setSession(prev => ({
      ...prev,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: isCorrect ? prev.incorrect : prev.incorrect + 1,
      streak: isCorrect ? prev.streak + 1 : 0,
      wordsStudied: new Set([...prev.wordsStudied, currentWord.id])
    }));
    
    // Add to review if incorrect
    if (!isCorrect) {
      setReviewWords(prev => [...prev, currentWord.id]);
    }
    
    setShowAnswer(true);
    loadWordPassages(currentWord);
  };

  // Next word
  const nextWord = () => {
    setCurrentWord(getNextWord());
    setUserAnswer('');
    setShowAnswer(false);
    setRelatedPassages([]);
    setExpandedInfo(false);
  };

  // Calculate accuracy
  const accuracy = session.correct + session.incorrect > 0 
    ? Math.round((session.correct / (session.correct + session.incorrect)) * 100) 
    : 0;

  // Calculate session time
  const sessionTime = Math.floor((Date.now() - session.startTime) / 1000);

  // Filter vocabulary pool on parameter change
  useEffect(() => {
    if (backendStatus === 'connected') {
      loadVocabularyPool();
    }
  }, [selectedDifficulty, selectedFrequency]);

  // Search on query change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (backendStatus === 'connected') {
        searchVocabulary(searchQuery);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const getDifficultyColor = (rating: number) => {
    if (rating <= 3) return 'bg-green-100 text-green-700 border-green-200';
    if (rating <= 7) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  const getFrequencyColor = (frequency: number) => {
    if (frequency >= 50) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (frequency >= 10) return 'bg-purple-100 text-purple-700 border-purple-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getBackendStatusColor = () => {
    switch (backendStatus) {
      case 'connected': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const renderPracticeMode = () => (
    <div className="space-y-6">
      {currentWord ? (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-blue-800">
                {currentWord.latin_word}
              </CardTitle>
              <div className="flex space-x-2">
                <Badge className={getDifficultyColor(currentWord.difficulty_rating)}>
                  {t.labels.difficulty}: {currentWord.difficulty_rating}/10
                </Badge>
                <Badge className={getFrequencyColor(currentWord.frequency)}>
                  {t.labels.frequency}: {currentWord.frequency}
                </Badge>
              </div>
            </div>
            <CardDescription className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Hash className="w-4 h-4" />
                <span>{currentWord.passages_found.length} {t.labels.passages}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>{currentWord.grammatical_forms.length} {t.labels.forms}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Enter meaning or translation:
                </label>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Enter ${language.code === 'de' ? 'German' : 'English'} meaning...`}
                  disabled={showAnswer}
                  onKeyPress={(e) => e.key === 'Enter' && !showAnswer && checkAnswer()}
                />
              </div>
              
              <div className="flex space-x-3">
                {!showAnswer ? (
                  <>
                    <Button onClick={checkAnswer} disabled={!userAnswer.trim()}>
                      <Target className="w-4 h-4 mr-2" />
                      {t.actions.check}
                    </Button>
                    <Button variant="outline" onClick={() => setShowAnswer(true)}>
                      {t.actions.showAnswer}
                    </Button>
                  </>
                ) : (
                  <Button onClick={nextWord}>
                    <Zap className="w-4 h-4 mr-2" />
                    {t.actions.next}
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={() => setExpandedInfo(!expandedInfo)}
                  className="ml-auto"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {expandedInfo ? 'Hide Info' : 'Show More'}
                </Button>
              </div>
              
              {showAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-white rounded-lg border border-slate-200"
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      {/* We'll implement a more sophisticated check later */}
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                      <span className="font-semibold">
                        Word Analysis Complete
                      </span>
                    </div>
                    
                    {/* Cultural Significance */}
                    {currentWord.cultural_significance && (
                      <div>
                        <h4 className="font-medium text-slate-700">{t.labels.significance}:</h4>
                        <p className="text-sm text-slate-600">{currentWord.cultural_significance}</p>
                      </div>
                    )}
                    
                    {/* Semantic Contexts */}
                    {currentWord.semantic_contexts.length > 0 && (
                      <div>
                        <h4 className="font-medium text-slate-700">{t.labels.contexts}:</h4>
                        <div className="flex flex-wrap gap-1">
                          {currentWord.semantic_contexts.map((context, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {context}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Modern Cognates */}
                    {currentWord.modern_cognates.length > 0 && (
                      <div>
                        <h4 className="font-medium text-slate-700">{t.labels.cognates}:</h4>
                        <div className="flex flex-wrap gap-1">
                          {currentWord.modern_cognates.map((cognate, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-green-50">
                              {cognate}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
              
              {/* Expanded Information */}
              {expandedInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 bg-slate-50 rounded-lg border"
                >
                  <h4 className="font-semibold mb-3">Detailed Analysis</h4>
                  
                  {/* Grammatical Forms */}
                  <div className="mb-3">
                    <h5 className="font-medium text-sm text-slate-700 mb-1">{t.labels.forms}:</h5>
                    <div className="flex flex-wrap gap-1">
                      {currentWord.grammatical_forms.map((form, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {form}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Related Passages */}
                  {relatedPassages.length > 0 && (
                    <div>
                      <h5 className="font-medium text-sm text-slate-700 mb-2">Example Passages:</h5>
                      <div className="space-y-2">
                        {relatedPassages.map((passage, idx) => (
                          <div key={idx} className="text-xs bg-white p-2 rounded border">
                            <p className="italic text-slate-600 mb-1">
                              {passage.latin_text.substring(0, 150)}...
                            </p>
                            <p className="text-slate-500">
                              {passage.work_type} {passage.book_number}.{passage.chapter_number}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">
              {vocabularyPool.length === 0 
                ? 'No vocabulary words found for the selected criteria.'
                : 'Loading vocabulary...'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <section id="vocabulary" className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Backend Status */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
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
                {backendStatus === 'connected' ? t.labels.connected : 
                 backendStatus === 'error' ? 'Backend Offline' : 'Connecting...'}
              </span>
            </div>
            {vocabularyStats && (
              <>
                <div className="text-white/70">•</div>
                <div className="text-white/70">
                  {vocabularyStats.totalWords?.toLocaleString()} {t.labels.totalWords}
                </div>
                <div className="text-white/70">•</div>
                <div className="text-white/70">
                  {vocabularyStats.totalInstances?.toLocaleString()} instances
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <Card className="p-6 mb-8 bg-red-50 border-red-200 max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 text-red-700">
              <XCircle className="w-6 h-6" />
              <span className="font-medium">{error}</span>
            </div>
          </Card>
        )}

        {/* Controls */}
        <div className="max-w-4xl mx-auto mb-8">
          {/* Search and Filters */}
          <Card className="p-6 bg-white/10 backdrop-blur-sm border border-gold/30 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">{t.labels.searchCorpus}:</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Latin words..."
                  className="w-full px-3 py-2 bg-white/20 border border-gold/30 rounded text-white placeholder-white/60"
                  disabled={backendStatus !== 'connected'}
                />
              </div>
              
              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Max {t.labels.difficulty}:</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white/20 border border-gold/30 rounded text-white"
                >
                  <option value={3}>Easy (1-3)</option>
                  <option value={7}>Medium (4-7)</option>
                  <option value={10}>Hard (8-10)</option>
                </select>
              </div>
              
              {/* Frequency Filter */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Min {t.labels.frequency}:</label>
                <select
                  value={selectedFrequency}
                  onChange={(e) => setSelectedFrequency(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white/20 border border-gold/30 rounded text-white"
                >
                  <option value={1}>All (1+)</option>
                  <option value={5}>Common (5+)</option>
                  <option value={10}>Frequent (10+)</option>
                  <option value={25}>Very Frequent (25+)</option>
                  <option value={50}>Extremely Frequent (50+)</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-400">{session.correct}</p>
                <p className="text-xs text-white/70">{t.stats.correct}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-4 text-center">
                <XCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-400">{session.incorrect}</p>
                <p className="text-xs text-white/70">{t.stats.incorrect}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-4 text-center">
                <Zap className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="text-2xl font-bold text-gold">{session.streak}</p>
                <p className="text-xs text-white/70">{t.stats.streak}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-4 text-center">
                <Trophy className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-400">{accuracy}%</p>
                <p className="text-xs text-white/70">{t.stats.accuracy}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-4 text-center">
                <Timer className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-400">{sessionTime}s</p>
                <p className="text-xs text-white/70">{t.stats.time}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-400">{session.wordsStudied.size}</p>
                <p className="text-xs text-white/70">{t.stats.studied}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {loading && (
            <Card className="p-8 text-center mb-8 bg-white/10 backdrop-blur-sm border border-gold/30">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <Brain className="h-12 w-12 text-gold mx-auto mb-4" />
              </motion.div>
              <p className="text-white/80">Loading vocabulary from corpus...</p>
            </Card>
          )}

          <Tabs value={currentMode} onValueChange={(value) => setCurrentMode(value as any)}>
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="practice" className="text-white">
                <Brain className="w-4 h-4 mr-2" />
                {t.modes.practice}
              </TabsTrigger>
              <TabsTrigger value="quiz" className="text-white">
                <Target className="w-4 h-4 mr-2" />
                {t.modes.quiz}
              </TabsTrigger>
              <TabsTrigger value="review" className="text-white">
                <RotateCcw className="w-4 h-4 mr-2" />
                {t.modes.review}
              </TabsTrigger>
              <TabsTrigger value="explore" className="text-white">
                <Globe className="w-4 h-4 mr-2" />
                {t.modes.explore}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="practice">
              {renderPracticeMode()}
            </TabsContent>
            
            <TabsContent value="quiz">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <Trophy className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Timed Vocabulary Quiz</h3>
                  <p className="text-white/70 mb-4">Challenge yourself with corpus-based vocabulary!</p>
                  <Button className="bg-wine-red hover:bg-wine-red/80 text-gold">
                    Start Quiz (Coming Soon)
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="review">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <Star className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Review Difficult Words</h3>
                  <p className="text-white/70 mb-4">
                    Review {reviewWords.length} words you've had difficulty with.
                  </p>
                  {reviewWords.length > 0 ? (
                    <Button 
                      onClick={() => {
                        setCurrentMode('practice');
                        // Filter for review words
                      }}
                      className="bg-wine-red hover:bg-wine-red/80 text-gold"
                    >
                      Start Review ({reviewWords.length} words)
                    </Button>
                  ) : (
                    <p className="text-white/60">No words in review queue yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="explore">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <Scroll className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Explore Corpus Vocabulary</h3>
                  <p className="text-white/70 mb-4">
                    Browse and analyze the complete Macrobius vocabulary database.
                  </p>
                  {vocabularyStats && (
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                      <div className="bg-black/20 p-3 rounded">
                        <div className="text-2xl font-bold text-gold">
                          {vocabularyStats.totalWords?.toLocaleString()}
                        </div>
                        <div className="text-sm text-white/70">{t.labels.totalWords}</div>
                      </div>
                      <div className="bg-black/20 p-3 rounded">
                        <div className="text-2xl font-bold text-gold">
                          {vocabularyStats.totalInstances?.toLocaleString()}
                        </div>
                        <div className="text-sm text-white/70">{t.labels.totalInstances}</div>
                      </div>
                    </div>
                  )}
                  <Button className="bg-wine-red hover:bg-wine-red/80 text-gold">
                    {t.actions.exploreCorpus} (Coming Soon)
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              onClick={startNewSession}
              className="border-gold text-gold hover:bg-gold/10"
              disabled={backendStatus !== 'connected'}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t.actions.restart}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VocabularyTrainerSection;
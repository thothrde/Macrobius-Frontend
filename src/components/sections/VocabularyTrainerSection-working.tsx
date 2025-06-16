'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Timer,
  Database,
  TrendingUp,
  Eye,
  Scroll,
  Hash,
  Users,
  Globe,
  Loader2,
  AlertCircle
} from 'lucide-react';

// Import our working Oracle Cloud API client
import { 
  macrobiusApi, 
  useOracleCloudConnection, 
  useOracleCloudData,
  OracleCloudError 
} from '../../utils/macrobiusApi';

interface VocabularyWord {
  latin_word: string;
  english_meaning: string;
  cultural_context: string;
  source_passage: string;
  frequency: number;
  difficulty: string;
}

interface LearningSession {
  correct: number;
  incorrect: number;
  streak: number;
  startTime: number;
  wordsStudied: Set<string>;
}

interface VocabularyTrainerSectionProps {
  isActive: boolean;
  t: (key: string) => string;
  language?: 'DE' | 'EN' | 'LA';
}

function VocabularyTrainerSection({ isActive, t: _t, language = 'DE' }: VocabularyTrainerSectionProps) {
  // Oracle Cloud connection status
  const { isConnected, isLoading: connectionLoading, connectionError } = useOracleCloudConnection();
  
  // Learning state
  const [currentMode, setCurrentMode] = useState<'practice' | 'quiz' | 'review' | 'explore'>('practice');
  const [currentWord, setCurrentWord] = useState<VocabularyWord | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [session, setSession] = useState<LearningSession>({
    correct: 0,
    incorrect: 0,
    streak: 0,
    startTime: Date.now(),
    wordsStudied: new Set()
  });
  
  // Filters and settings
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [vocabularyPool, setVocabularyPool] = useState<VocabularyWord[]>([]);
  const [reviewWords, setReviewWords] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedInfo, setExpandedInfo] = useState<boolean>(false);
  const [totalWords, setTotalWords] = useState<number>(0);

  // Load vocabulary from Oracle Cloud
  const loadVocabularyData = useCallback(async () => {
    if (!isConnected) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const vocabulary = await macrobiusApi.getVocabulary(selectedDifficulty, undefined, 50);
      setVocabularyPool(vocabulary);
      setTotalWords(vocabulary.length);
      
      // Set first word if none selected
      if (vocabulary.length > 0 && !currentWord) {
        setCurrentWord(vocabulary[Math.floor(Math.random() * vocabulary.length)]);
      }
    } catch (err) {
      console.error('Failed to load vocabulary:', err);
      setError('Failed to load vocabulary from Oracle Cloud');
      
      // Fallback vocabulary for demonstration
      const fallbackVocabulary: VocabularyWord[] = [
        {
          latin_word: 'virtus',
          english_meaning: 'virtue, excellence, courage',
          cultural_context: 'Central concept in Roman ethics and philosophy',
          source_passage: 'Saturnalia 1.2.3',
          frequency: 45,
          difficulty: 'Intermediate'
        },
        {
          latin_word: 'sapientia',
          english_meaning: 'wisdom, knowledge',
          cultural_context: 'Philosophical virtue highly valued in ancient Rome',
          source_passage: 'Commentarii 2.1.5',
          frequency: 32,
          difficulty: 'Advanced'
        },
        {
          latin_word: 'convivium',
          english_meaning: 'banquet, feast, social gathering',
          cultural_context: 'Important social institution in Roman culture',
          source_passage: 'Saturnalia 1.1.1',
          frequency: 28,
          difficulty: 'Intermediate'
        },
        {
          latin_word: 'doctrina',
          english_meaning: 'learning, teaching, education',
          cultural_context: 'Educational concept central to Roman intellectual life',
          source_passage: 'Saturnalia 3.4.2',
          frequency: 25,
          difficulty: 'Beginner'
        },
        {
          latin_word: 'auctoritas',
          english_meaning: 'authority, influence, credibility',
          cultural_context: 'Key political and social concept in Roman society',
          source_passage: 'Saturnalia 2.3.1',
          frequency: 38,
          difficulty: 'Advanced'
        }
      ];
      
      const filteredVocab = fallbackVocabulary.filter(word => word.difficulty === selectedDifficulty);
      setVocabularyPool(filteredVocab.length > 0 ? filteredVocab : fallbackVocabulary);
      setTotalWords(fallbackVocabulary.length);
      
      if (!currentWord && fallbackVocabulary.length > 0) {
        setCurrentWord(fallbackVocabulary[0]);
      }
    } finally {
      setLoading(false);
    }
  }, [isConnected, selectedDifficulty, currentWord]);

  // Load vocabulary when connected or difficulty changes
  useEffect(() => {
    loadVocabularyData();
  }, [loadVocabularyData]);

  // Get next random word
  const getNextWord = useCallback(() => {
    if (vocabularyPool.length === 0) return null;
    
    // Avoid recently studied words
    const availableWords = vocabularyPool.filter(word => 
      !session.wordsStudied.has(word.latin_word) || session.wordsStudied.size >= vocabularyPool.length
    );
    
    const pool = availableWords.length > 0 ? availableWords : vocabularyPool;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  }, [vocabularyPool, session.wordsStudied]);

  // Check user's answer
  const checkAnswer = () => {
    if (!currentWord || !userAnswer.trim()) return;
    
    const userAnswerClean = userAnswer.toLowerCase().trim();
    const acceptableAnswers = currentWord.english_meaning
      .toLowerCase()
      .split(/[,;]/)
      .map(answer => answer.trim());
    
    const isCorrect = acceptableAnswers.some(answer => 
      userAnswerClean.includes(answer) || 
      answer.includes(userAnswerClean) ||
      userAnswerClean === answer
    );
    
    // Update session stats
    setSession(prev => ({
      ...prev,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: isCorrect ? prev.incorrect : prev.incorrect + 1,
      streak: isCorrect ? prev.streak + 1 : 0,
      wordsStudied: new Set([...Array.from(prev.wordsStudied), currentWord.latin_word])
    }));
    
    // Add to review if incorrect
    if (!isCorrect) {
      setReviewWords(prev => [...prev, currentWord.latin_word]);
    }
    
    setShowAnswer(true);
  };

  // Move to next word
  const nextWord = () => {
    const next = getNextWord();
    setCurrentWord(next);
    setUserAnswer('');
    setShowAnswer(false);
    setExpandedInfo(false);
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
    setReviewWords([]);
  };

  // Calculate session metrics
  const accuracy = session.correct + session.incorrect > 0 
    ? Math.round((session.correct / (session.correct + session.incorrect)) * 100) 
    : 0;

  const sessionTime = Math.floor((Date.now() - session.startTime) / 1000);

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
          <span className="text-green-300 text-sm">{totalWords} words available</span>
        </>
      ) : (
        <>
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span className="text-red-300 text-sm">
            Oracle Cloud offline - Using fallback vocabulary
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
              <h2 className="text-4xl font-bold text-yellow-400">Vokabeltrainer</h2>
              <BookOpen className="w-8 h-8 text-yellow-400" />
            </div>
            
            <p className="text-xl text-white/90 mb-6">
              Authentisches Lateinvokabular aus dem kompletten Macrobius-Korpus
            </p>
            
            <ConnectionStatus />
          </motion.div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Difficulty Setting */}
            <div>
              <label className="block text-white/80 text-sm mb-2">Schwierigkeitsgrad:</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as 'Beginner' | 'Intermediate' | 'Advanced')}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white"
                disabled={loading}
              >
                <option value="Beginner">Anfänger</option>
                <option value="Intermediate">Fortgeschritten</option>
                <option value="Advanced">Experte</option>
              </select>
            </div>

            {/* Mode Selection */}
            <div>
              <label className="block text-white/80 text-sm mb-2">Lernmodus:</label>
              <select
                value={currentMode}
                onChange={(e) => setCurrentMode(e.target.value as any)}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white"
              >
                <option value="practice">Üben</option>
                <option value="quiz">Quiz</option>
                <option value="review">Wiederholen</option>
                <option value="explore">Erkunden</option>
              </select>
            </div>

            {/* Action Button */}
            <div className="flex items-end">
              <button
                onClick={startNewSession}
                disabled={loading || !isConnected}
                className="w-full px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Neue Session</span>
              </button>
            </div>
          </div>

          {/* Statistics Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-400">{session.correct}</p>
              <p className="text-xs text-white/70">Richtig</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <XCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-400">{session.incorrect}</p>
              <p className="text-xs text-white/70">Falsch</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-400">{session.streak}</p>
              <p className="text-xs text-white/70">Serie</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Trophy className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-400">{accuracy}%</p>
              <p className="text-xs text-white/70">Genauigkeit</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Timer className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-400">{sessionTime}s</p>
              <p className="text-xs text-white/70">Zeit</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Users className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-400">{session.wordsStudied.size}</p>
              <p className="text-xs text-white/70">Gelernt</p>
            </div>
          </div>

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

          {/* Main Learning Interface */}
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-yellow-400 mx-auto mb-4" />
              <p className="text-white/80">Loading vocabulary from Oracle Cloud...</p>
            </div>
          ) : currentWord ? (
            <div className="space-y-6">
              {/* Word Card */}
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Word Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-bold text-yellow-400 mb-2">
                      {currentWord.latin_word}
                    </h3>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-blue-400/20 text-blue-300 rounded-full text-sm font-medium">
                        {currentWord.difficulty}
                      </span>
                      <span className="px-3 py-1 bg-purple-400/20 text-purple-300 rounded-full text-sm font-medium">
                        Häufigkeit: {currentWord.frequency}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedInfo(!expandedInfo)}
                    className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{expandedInfo ? 'Weniger' : 'Mehr Info'}</span>
                  </button>
                </div>

                {/* Answer Input */}
                <div className="mb-4">
                  <label className="block text-white/80 text-sm mb-2">
                    Geben Sie die deutsche Bedeutung ein:
                  </label>
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-lg"
                    placeholder="Deutsche Bedeutung eingeben..."
                    disabled={showAnswer}
                    onKeyPress={(e) => e.key === 'Enter' && !showAnswer && checkAnswer()}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mb-4">
                  {!showAnswer ? (
                    <>
                      <button
                        onClick={checkAnswer}
                        disabled={!userAnswer.trim()}
                        className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
                      >
                        <Target className="w-4 h-4" />
                        <span>Prüfen</span>
                      </button>
                      <button
                        onClick={() => setShowAnswer(true)}
                        className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all"
                      >
                        Antwort zeigen
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={nextWord}
                      className="px-6 py-2 bg-green-400 text-black rounded-lg hover:bg-green-500 transition-all flex items-center space-x-2"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Nächstes Wort</span>
                    </button>
                  )}
                </div>

                {/* Answer Reveal */}
                <AnimatePresence>
                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/20 rounded-lg p-4 mb-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-6 h-6 text-green-400" />
                          <span className="font-semibold text-green-300">Richtige Antwort:</span>
                        </div>
                        <p className="text-lg font-medium text-white">{currentWord.english_meaning}</p>
                        
                        {currentWord.cultural_context && (
                          <div>
                            <h4 className="font-medium text-white/80 text-sm">🏛️ Kultureller Kontext:</h4>
                            <p className="text-white/70 text-sm">{currentWord.cultural_context}</p>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="font-medium text-white/80 text-sm">📜 Fundstelle:</h4>
                          <p className="text-white/70 text-sm">{currentWord.source_passage}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded Information */}
                <AnimatePresence>
                  {expandedInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white/10 rounded-lg p-4 border border-white/20"
                    >
                      <h4 className="font-semibold mb-3 text-yellow-300">📚 Detaillierte Analyse</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h5 className="font-medium text-white/80 mb-1">Häufigkeit:</h5>
                          <p className="text-white/70">{currentWord.frequency} Vorkommen im Korpus</p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-white/80 mb-1">Schwierigkeit:</h5>
                          <p className="text-white/70">{currentWord.difficulty}</p>
                        </div>
                        
                        <div className="md:col-span-2">
                          <h5 className="font-medium text-white/80 mb-1">Verwendung im Text:</h5>
                          <p className="text-white/70 italic">{currentWord.cultural_context}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <p className="text-white/60">
                Keine Vokabeln für die gewählten Kriterien gefunden.
              </p>
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
              <span>🌐 Oracle Cloud Integration</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/90">
              <div>
                <p><strong>Backend:</strong> Oracle Cloud Free Tier</p>
                <p><strong>Endpunkt:</strong> 152.70.184.232:8080</p>
                <p><strong>Status:</strong> {isConnected ? '✅ Operational' : '❌ Fallback Mode'}</p>
              </div>
              <div>
                <p><strong>Korpus:</strong> 1.401 authentische Passagen</p>
                <p><strong>Vokabular:</strong> Aus {totalWords} Wörtern</p>
                <p><strong>Features:</strong> Kontextbasiertes Lernen</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default VocabularyTrainerSection;
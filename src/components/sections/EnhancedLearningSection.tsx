import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Brain, Target, Search, TrendingUp, Trophy, Zap, Star, Clock, Award } from 'lucide-react';

interface EnhancedLearningSectionProps {
  isActive: boolean;
  t: (key: string) => string;
}

interface LearningStats {
  totalExperience: number;
  level: number;
  vocabularyMastered: number;
  grammarTopicsCompleted: number;
  textsAnalyzed: number;
  quizzesCompleted: number;
  currentStreak: number;
  expEarnedToday: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export default function EnhancedLearningSection({ isActive, t }: EnhancedLearningSectionProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'vocabulary' | 'grammar' | 'textanalysis' | 'quiz' | 'progress'>('overview');
  const [learningStats, setLearningStats] = useState<LearningStats>({
    totalExperience: 2840,
    level: 15,
    vocabularyMastered: 127,
    grammarTopicsCompleted: 8,
    textsAnalyzed: 23,
    quizzesCompleted: 12,
    currentStreak: 7,
    expEarnedToday: 180
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_steps',
      name: 'Erste Schritte',
      description: 'Beginne deine Lernreise mit Macrobius',
      icon: '🎯',
      unlocked: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: 'vocabulary_novice',
      name: 'Vokabel-Neuling',
      description: 'Lerne 25 lateinische Begriffe',
      icon: '📚',
      unlocked: true,
      progress: 25,
      maxProgress: 25
    },
    {
      id: 'grammar_explorer',
      name: 'Grammatik-Entdecker',
      description: 'Beherrsche 5 Grammatikthemen',
      icon: '🧠',
      unlocked: true,
      progress: 5,
      maxProgress: 5
    },
    {
      id: 'text_analyzer',
      name: 'Text-Analytiker',
      description: 'Analysiere 20 Macrobius-Texte',
      icon: '🔍',
      unlocked: true,
      progress: 20,
      maxProgress: 20
    },
    {
      id: 'quiz_master',
      name: 'Quiz-Meister',
      description: 'Bestehe 10 Quiz ohne Fehler',
      icon: '🏆',
      unlocked: false,
      progress: 7,
      maxProgress: 10
    },
    {
      id: 'scholar',
      name: 'Gelehrter',
      description: 'Erreiche Level 20',
      icon: '🎓',
      unlocked: false,
      progress: 15,
      maxProgress: 20
    }
  ]);

  const learningModules = [
    {
      id: 'vocabulary',
      title: 'Vocabulary Trainer',
      description: 'Master Latin vocabulary from authentic Macrobius texts',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-300',
      progress: 65,
      features: [
        'Corpus-integrated vocabulary',
        'Spaced repetition system', 
        'Contextual learning',
        'Progress tracking'
      ]
    },
    {
      id: 'grammar',
      title: 'Grammar Explorer',
      description: 'Comprehensive Latin grammar analysis and exercises',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      borderColor: 'border-purple-300',
      progress: 42,
      features: [
        'Interactive grammar rules',
        'Real text examples',
        'Progressive difficulty',
        'Detailed explanations'
      ]
    },
    {
      id: 'textanalysis',
      title: 'Text Processor',
      description: 'Advanced search and analysis of Macrobius corpus',
      icon: <Search className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      borderColor: 'border-green-300',
      progress: 78,
      features: [
        'Full-text search',
        'Cultural theme analysis',
        'Backend integration',
        'Educational insights'
      ]
    },
    {
      id: 'quiz',
      title: 'Interactive Quiz',
      description: 'Test your knowledge with culturally-enriched questions',
      icon: <Target className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-600',
      borderColor: 'border-orange-300',
      progress: 88,
      features: [
        'Cultural insights',
        'Adaptive difficulty',
        'Instant feedback',
        'Performance analytics'
      ]
    }
  ];

  useEffect(() => {
    if (!isActive) {
      setActiveTab('overview');
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center px-4 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-300 mb-4">
            {t('section_learning')}
          </h1>
          <p className="text-lg md:text-xl text-yellow-100/90 max-w-3xl mx-auto leading-relaxed">
            {t('learning_tools')}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20">
            <div className="flex space-x-2">
              {[
                { id: 'overview', label: 'Übersicht', icon: '🏠' },
                { id: 'vocabulary', label: 'Vokabeln', icon: '📚' },
                { id: 'grammar', label: 'Grammatik', icon: '🧠' },
                { id: 'textanalysis', label: 'Textanalyse', icon: '🔍' },
                { id: 'quiz', label: 'Quiz', icon: '🎯' },
                { id: 'progress', label: 'Fortschritt', icon: '📊' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-yellow-400 text-gray-800 shadow-lg'
                      : 'text-white/80 hover:bg-white/20'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Stats Overview */}
              <div className="bg-gradient-to-r from-amber-900/30 to-amber-950/30 rounded-xl p-6 border border-yellow-500/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-yellow-100 mb-6 text-center">
                  📊 Deine Lernstatistiken
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white/10 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-300">{learningStats.level}</div>
                    <div className="text-sm text-yellow-200/80">Level</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-300">{learningStats.totalExperience}</div>
                    <div className="text-sm text-yellow-200/80">Erfahrung</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-300">{learningStats.vocabularyMastered}</div>
                    <div className="text-sm text-yellow-200/80">Vokabeln</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-300">{learningStats.currentStreak}</div>
                    <div className="text-sm text-yellow-200/80">Aktuelle Serie</div>
                  </div>
                </div>
              </div>

              {/* Learning Modules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningModules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    className={`bg-gradient-to-br from-amber-900/40 to-amber-950/40 rounded-xl border-2 ${module.borderColor} backdrop-blur-sm p-6 cursor-pointer hover:scale-105 transition-all duration-300`}
                    onClick={() => setActiveTab(module.id as any)}
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${module.color} text-white mr-4`}>
                        {module.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-yellow-100">{module.title}</h3>
                        <p className="text-yellow-200/80 text-sm">{module.description}</p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-yellow-200/80">Fortschritt</span>
                        <span className="text-sm font-semibold text-yellow-300">{module.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${module.color}`}
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Features */}
                    <ul className="space-y-1">
                      {module.features.map((feature, idx) => (
                        <li key={idx} className="text-yellow-200/70 text-sm flex items-center">
                          <div className="w-1 h-1 bg-yellow-400 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* Recent Achievements */}
              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-500/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-blue-200 mb-6 flex items-center">
                  <Trophy className="w-6 h-6 mr-2" />
                  🏆 Erfolge & Fortschritte
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {achievements.slice(0, 3).map((achievement, index) => (
                    <div key={achievement.id} className={`p-4 rounded-lg border-2 ${
                      achievement.unlocked 
                        ? 'bg-green-500/10 border-green-400/30' 
                        : 'bg-gray-500/10 border-gray-400/30'
                    }`}>
                      <div className="text-2xl mb-2">{achievement.icon}</div>
                      <h4 className={`font-semibold ${
                        achievement.unlocked ? 'text-green-200' : 'text-gray-400'
                      }`}>{achievement.name}</h4>
                      <p className={`text-sm mb-2 ${
                        achievement.unlocked ? 'text-green-300/80' : 'text-gray-500'
                      }`}>{achievement.description}</p>
                      
                      {!achievement.unlocked && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-600/30 rounded-full h-1.5">
                            <div 
                              className="h-1.5 rounded-full bg-blue-400"
                              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {achievement.progress}/{achievement.maxProgress}
                          </div>
                        </div>
                      )}
                      
                      {achievement.unlocked && (
                        <div className="text-xs text-green-400 font-semibold mt-2">
                          ✓ FREIGESCHALTET!
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'vocabulary' && (
            <motion.div
              key="vocabulary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-900/40 to-blue-950/40 rounded-xl p-8 border border-blue-500/20 backdrop-blur-sm"
            >
              <h3 className="text-3xl font-bold text-blue-200 mb-6 flex items-center">
                <BookOpen className="w-8 h-8 mr-3" />
                📚 Vocabulary Trainer
              </h3>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚧</div>
                <p className="text-blue-100/80 text-lg mb-4">
                  Der erweiterte Vokabeltrainer wird in der nächsten Version integriert.
                </p>
                <p className="text-blue-200/60 text-sm">
                  Verfügbare Features: Corpus-integrierte Vokabeln, Spaced Repetition, Kontextuelles Lernen
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'grammar' && (
            <motion.div
              key="grammar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 rounded-xl p-8 border border-purple-500/20 backdrop-blur-sm"
            >
              <h3 className="text-3xl font-bold text-purple-200 mb-6 flex items-center">
                <Brain className="w-8 h-8 mr-3" />
                🧠 Grammar Explorer
              </h3>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚧</div>
                <p className="text-purple-100/80 text-lg mb-4">
                  Der erweiterte Grammatik-Explorer wird in der nächsten Version integriert.
                </p>
                <p className="text-purple-200/60 text-sm">
                  Verfügbare Features: Interaktive Grammatikregeln, Echte Textbeispiele, Progressive Schwierigkeit
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'textanalysis' && (
            <motion.div
              key="textanalysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-green-900/40 to-green-950/40 rounded-xl p-8 border border-green-500/20 backdrop-blur-sm"
            >
              <h3 className="text-3xl font-bold text-green-200 mb-6 flex items-center">
                <Search className="w-8 h-8 mr-3" />
                🔍 Text Processor
              </h3>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚧</div>
                <p className="text-green-100/80 text-lg mb-4">
                  Der erweiterte Text-Processor wird in der nächsten Version integriert.
                </p>
                <p className="text-green-200/60 text-sm">
                  Verfügbare Features: Volltext-Suche, Kulturelle Themenanalyse, Backend-Integration
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-orange-900/40 to-orange-950/40 rounded-xl p-8 border border-orange-500/20 backdrop-blur-sm"
            >
              <h3 className="text-3xl font-bold text-orange-200 mb-6 flex items-center">
                <Target className="w-8 h-8 mr-3" />
                🎯 Interactive Quiz
              </h3>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚧</div>
                <p className="text-orange-100/80 text-lg mb-4">
                  Das erweiterte Quiz-System wird in der nächsten Version integriert.
                </p>
                <p className="text-orange-200/60 text-sm">
                  Verfügbare Features: Kulturelle Einsichten, Adaptive Schwierigkeit, Sofortiges Feedback
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Level Progress */}
              <div className="bg-gradient-to-r from-indigo-900/40 to-indigo-950/40 rounded-xl p-6 border border-indigo-500/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-indigo-200 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  📈 Level & Erfahrung
                </h3>
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-indigo-300 mb-2">Level {learningStats.level}</div>
                  <div className="text-lg text-indigo-200">{learningStats.totalExperience} XP</div>
                  <div className="w-full bg-indigo-800/30 rounded-full h-3 mt-4 max-w-md mx-auto">
                    <div className="bg-indigo-400 h-3 rounded-full" style={{ width: '68%' }} />
                  </div>
                  <div className="text-sm text-indigo-300/80 mt-2">320 XP bis Level {learningStats.level + 1}</div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-indigo-500/10 rounded-lg">
                    <div className="text-xl font-bold text-indigo-300">{learningStats.expEarnedToday}</div>
                    <div className="text-xs text-indigo-400">Heute verdient</div>
                  </div>
                  <div className="text-center p-3 bg-indigo-500/10 rounded-lg">
                    <div className="text-xl font-bold text-indigo-300">{learningStats.currentStreak}</div>
                    <div className="text-xs text-indigo-400">Tage in Folge</div>
                  </div>
                  <div className="text-center p-3 bg-indigo-500/10 rounded-lg">
                    <div className="text-xl font-bold text-indigo-300">{learningStats.quizzesCompleted}</div>
                    <div className="text-xs text-indigo-400">Quiz bestanden</div>
                  </div>
                  <div className="text-center p-3 bg-indigo-500/10 rounded-lg">
                    <div className="text-xl font-bold text-indigo-300">{learningStats.textsAnalyzed}</div>
                    <div className="text-xs text-indigo-400">Texte analysiert</div>
                  </div>
                </div>
              </div>

              {/* All Achievements */}
              <div className="bg-gradient-to-r from-yellow-900/40 to-yellow-950/40 rounded-xl p-6 border border-yellow-500/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-yellow-200 mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-2" />
                  🏆 Alle Erfolge
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className={`p-4 rounded-lg border-2 ${
                      achievement.unlocked 
                        ? 'bg-yellow-500/10 border-yellow-400/30' 
                        : 'bg-gray-500/10 border-gray-400/30'
                    }`}>
                      <div className="text-3xl mb-3">{achievement.icon}</div>
                      <h4 className={`font-semibold mb-2 ${
                        achievement.unlocked ? 'text-yellow-200' : 'text-gray-400'
                      }`}>{achievement.name}</h4>
                      <p className={`text-sm mb-3 ${
                        achievement.unlocked ? 'text-yellow-300/80' : 'text-gray-500'
                      }`}>{achievement.description}</p>
                      
                      {!achievement.unlocked && (
                        <div>
                          <div className="w-full bg-gray-600/30 rounded-full h-2 mb-2">
                            <div 
                              className="h-2 rounded-full bg-yellow-400"
                              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-400">
                            {achievement.progress}/{achievement.maxProgress}
                          </div>
                        </div>
                      )}
                      
                      {achievement.unlocked && (
                        <div className="text-sm text-yellow-400 font-semibold flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          FREIGESCHALTET!
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Indicator */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-full px-6 py-3 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-200 text-sm font-medium">
              🚀 Erweiterte Lernplattform - Bereit für nächste Integrationsstufe
            </span>
            <Zap className="w-4 h-4 text-green-400" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
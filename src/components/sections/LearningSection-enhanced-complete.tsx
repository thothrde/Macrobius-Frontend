import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { BookOpen, Brain, Trophy, ArrowRight, Target, TrendingUp, Award, Flame, Scroll, Zap } from 'lucide-react';

// Import Enhanced Components
import { QuizSection } from './QuizSection-enhanced';
import VocabularyTrainerSection from './VocabularyTrainerSection';
import MacrobiusGrammarExplainer from './GrammarExplainer-enhanced';
import MacrobiusTextProcessor from './MacrobiusTextProcessor-enhanced';

// Mock Language Context
const useLanguage = () => ({
  language: 'EN',
  t: (key: string) => key
});

// Mock ProgressTracker Component
const ProgressTracker = ({ userId, language, onGoalCompleted }: any) => (
  <div className="p-6">
    <h3 className="text-2xl font-bold mb-4">Progress Tracking</h3>
    <div className="space-y-4">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h4 className="font-semibold">Learning Progress</h4>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">75% Complete</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-100 p-3 rounded">
          <div className="text-lg font-bold">127</div>
          <div className="text-sm">Words Learned</div>
        </div>
        <div className="bg-purple-100 p-3 rounded">
          <div className="text-lg font-bold">18</div>
          <div className="text-sm">Current Level</div>
        </div>
      </div>
    </div>
  </div>
);

// Mock AchievementSystem Component
const AchievementSystem = ({ userId, language, userStats, onAchievementUnlocked }: any) => (
  <div className="p-6">
    <h3 className="text-2xl font-bold mb-4">Achievements & Awards</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { name: 'Quiz Master', description: 'Complete 10 quizzes', unlocked: true, icon: '🎯' },
        { name: 'Vocabulary Expert', description: 'Learn 100 words', unlocked: true, icon: '📚' },
        { name: 'Grammar Guru', description: 'Master all grammar topics', unlocked: false, icon: '🧠' },
        { name: 'Perfect Streak', description: 'Get 20 answers in a row', unlocked: true, icon: '⚡' },
        { name: 'Text Explorer', description: 'Search 50 texts', unlocked: false, icon: '🔍' },
        { name: 'Scholar', description: 'Reach level 25', unlocked: false, icon: '🎓' }
      ].map((achievement, index) => (
        <div key={index} className={`p-4 rounded-lg border-2 ${
          achievement.unlocked ? 'bg-yellow-50 border-yellow-300' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="text-2xl mb-2">{achievement.icon}</div>
          <h4 className="font-semibold">{achievement.name}</h4>
          <p className="text-sm text-gray-600">{achievement.description}</p>
          {achievement.unlocked && (
            <div className="mt-2 text-xs text-yellow-600 font-semibold">UNLOCKED!</div>
          )}
        </div>
      ))}
    </div>
  </div>
);

// Mock ExperienceSystem Component
const ExperienceSystem = ({ userId, language, userStats, onLevelUp }: any) => (
  <div className="p-6">
    <h3 className="text-2xl font-bold mb-4">Experience & Level</h3>
    <div className="space-y-6">
      <div className="text-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
        <div className="text-4xl font-bold mb-2">Level {userStats.level}</div>
        <div className="text-lg">{userStats.totalExperience} XP</div>
        <div className="w-full bg-white bg-opacity-30 rounded-full h-3 mt-4">
          <div className="bg-white h-3 rounded-full" style={{ width: '60%' }}></div>
        </div>
        <div className="text-sm mt-2">240 XP to next level</div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <div className="text-xl font-bold text-blue-600">{userStats.expFromQuizzes}</div>
          <div className="text-sm">Quiz XP</div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <div className="text-xl font-bold text-green-600">{userStats.expFromVocabulary}</div>
          <div className="text-sm">Vocabulary XP</div>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg text-center">
          <div className="text-xl font-bold text-purple-600">{userStats.expFromGrammar}</div>
          <div className="text-sm">Grammar XP</div>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg text-center">
          <div className="text-xl font-bold text-orange-600">{userStats.expFromTextAnalysis}</div>
          <div className="text-sm">Text XP</div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">Next Level Benefits:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Unlock advanced grammar exercises</li>
          <li>• Access to bonus vocabulary sets</li>
          <li>• New achievement badges</li>
          <li>• Priority support features</li>
        </ul>
      </div>
    </div>
  </div>
);

// Enhanced Learning Section with ALL improved educational components
export function LearningSection() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'quiz' | 'vocabulary' | 'grammar' | 'textprocessor' | 'progress' | 'achievements' | 'experience'>('overview');
  const [userStats, setUserStats] = useState({
    totalExperience: 3240,
    level: 18,
    perfectQuizzes: 5,
    speedChallenges: 3,
    maxStreak: 18,
    vocabularyMastered: {
      total: 127,
      latin: 65,
      philosophy: 31,
      astronomy: 31
    },
    categoriesCompleted: 6,
    consecutivePerfect: 4,
    expEarnedToday: 180,
    expFromQuizzes: 1240,
    expFromVocabulary: 890,
    expFromGrammar: 650,
    expFromTextAnalysis: 460,
    expFromAchievements: 200
  });

  const handleAchievementUnlocked = (achievement: any) => {
    console.log('Achievement unlocked:', achievement);
    setUserStats(prev => ({
      ...prev,
      totalExperience: prev.totalExperience + achievement.rewards.points,
      expFromAchievements: (prev.expFromAchievements || 0) + achievement.rewards.points
    }));
  };

  const handleLevelUp = (newLevel: number, benefits: string[]) => {
    console.log('Level up!', newLevel, benefits);
  };

  const handleGoalCompleted = (goal: any) => {
    console.log('Goal completed:', goal);
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center py-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          {language === 'DE' ? 'Willkommen im erweiterten Lernzentrum' : 
           language === 'LA' ? 'Salve in Centro Discendi Aucto' : 
           'Welcome to the Enhanced Learning Center'}
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto mb-4">
          {language === 'DE' ? 'Erkunde alle vier verbesserten Bildungskomponenten mit umfassenden Macrobius-Inhalten, fortgeschrittener Analyse und interaktiven Funktionen.' :
           language === 'LA' ? 'Omnes quattuor melioratas partes educationis cum contentis Macrobii comprehensis, analysi provecta et functionibus interactivis explora.' :
           'Explore all four enhanced educational components with comprehensive Macrobius content, advanced analysis, and interactive features.'}
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Scroll className="w-4 h-4" />
          <span>
            {language === 'DE' ? 'Hochwertige Bildungsplattform mit authentischen Macrobius-Texten' :
             language === 'LA' ? 'Suggestus educationis excellens cum textibus Macrobii authenticis' :
             'Premium educational platform with authentic Macrobius texts'}
          </span>
        </div>
      </div>

      {/* Enhanced Feature Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-blue-200 hover:border-blue-400" onClick={() => setActiveTab('quiz')}>
          <Target className="h-12 w-12 text-blue-500 mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'DE' ? 'Macrobius Quiz-System' : language === 'LA' ? 'Systema Quaestionum' : 'Macrobius Quiz System'}
          </h4>
          <p className="text-gray-600 mb-4 text-sm">
            {language === 'DE' ? '30+ authentische Fragen mit umfassender Analyse' : 
             language === 'LA' ? '30+ quaestiones authenticae cum analysi comprehensa' : 
             '30+ authentic questions with comprehensive analysis'}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {language === 'DE' ? 'Erweitert' : language === 'LA' ? 'Auctum' : 'Enhanced'}
            </div>
            <div className="flex items-center text-blue-600 font-semibold text-sm">
              {language === 'DE' ? 'Quiz starten' : language === 'LA' ? 'Incipere' : 'Start Quiz'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-green-200 hover:border-green-400" onClick={() => setActiveTab('vocabulary')}>
          <BookOpen className="h-12 w-12 text-green-500 mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'DE' ? 'Vokabeltrainer' : language === 'LA' ? 'Exercitator Vocabulorum' : 'Vocabulary Trainer'}
          </h4>
          <p className="text-gray-600 mb-4 text-sm">
            {language === 'DE' ? '27+ Begriffe aus Macrobius-Texten' : 
             language === 'LA' ? '27+ vocabula ex textibus Macrobii' : 
             '27+ terms from Macrobius texts'}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {language === 'DE' ? 'Umfassend' : language === 'LA' ? 'Comprehensum' : 'Comprehensive'}
            </div>
            <div className="flex items-center text-green-600 font-semibold text-sm">
              {language === 'DE' ? 'Lernen beginnen' : language === 'LA' ? 'Discere' : 'Start Learning'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-purple-200 hover:border-purple-400" onClick={() => setActiveTab('grammar')}>
          <Brain className="h-12 w-12 text-purple-500 mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'DE' ? 'Grammatik-Explorer' : language === 'LA' ? 'Explorator Grammaticus' : 'Grammar Explorer'}
          </h4>
          <p className="text-gray-600 mb-4 text-sm">
            {language === 'DE' ? 'Fortgeschrittene lateinische Grammatikanalyse' : 
             language === 'LA' ? 'Analysis grammatica Latina provecta' : 
             'Advanced Latin grammar analysis'}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {language === 'DE' ? 'Neu!' : language === 'LA' ? 'Novum!' : 'New!'}
            </div>
            <div className="flex items-center text-purple-600 font-semibold text-sm">
              {language === 'DE' ? 'Grammatik erkunden' : language === 'LA' ? 'Explorare' : 'Explore Grammar'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-orange-200 hover:border-orange-400" onClick={() => setActiveTab('textprocessor')}>
          <Scroll className="h-12 w-12 text-orange-500 mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'DE' ? 'Text-Processor' : language === 'LA' ? 'Processor Textuum' : 'Text Processor'}
          </h4>
          <p className="text-gray-600 mb-4 text-sm">
            {language === 'DE' ? 'Erweiterte Textsuche und -analyse' : 
             language === 'LA' ? 'Quaestio et analysis textuum provecta' : 
             'Advanced text search and analysis'}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {language === 'DE' ? 'Erweitert' : language === 'LA' ? 'Auctum' : 'Enhanced'}
            </div>
            <div className="flex items-center text-orange-600 font-semibold text-sm">
              {language === 'DE' ? 'Texte durchsuchen' : language === 'LA' ? 'Quaerere' : 'Search Texts'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-indigo-200 hover:border-indigo-400" onClick={() => setActiveTab('progress')}>
          <TrendingUp className="h-12 w-12 text-indigo-500 mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'DE' ? 'Fortschrittsverfolgung' : language === 'LA' ? 'Progressus Sequendus' : 'Progress Tracking'}
          </h4>
          <p className="text-gray-600 mb-4 text-sm">
            {language === 'DE' ? 'Überwache deinen Lernfortschritt' : 
             language === 'LA' ? 'Progressum discendi tuum observa' : 
             'Monitor your learning progress'}
          </p>
          <div className="flex items-center text-indigo-600 font-semibold text-sm">
            {language === 'DE' ? 'Fortschritt anzeigen' : language === 'LA' ? 'Monstrare' : 'View Progress'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-yellow-200 hover:border-yellow-400" onClick={() => setActiveTab('achievements')}>
          <Trophy className="h-12 w-12 text-yellow-500 mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'DE' ? 'Erfolge & Auszeichnungen' : language === 'LA' ? 'Victoriae et Praemia' : 'Achievements & Awards'}
          </h4>
          <p className="text-gray-600 mb-4 text-sm">
            {language === 'DE' ? '25+ Erfolge zum Freischalten' : 
             language === 'LA' ? '25+ victoriae liberandae' : 
             '25+ achievements to unlock'}
          </p>
          <div className="flex items-center text-yellow-600 font-semibold text-sm">
            {language === 'DE' ? 'Erfolge anzeigen' : language === 'LA' ? 'Victorias' : 'View Achievements'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-red-200 hover:border-red-400" onClick={() => setActiveTab('experience')}>
          <Flame className="h-12 w-12 text-red-500 mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'DE' ? 'Erfahrung & Level' : language === 'LA' ? 'Experientia et Gradus' : 'Experience & Level'}
          </h4>
          <p className="text-gray-600 mb-4 text-sm">
            {language === 'DE' ? 'Level aufsteigen und Vorteile freischalten' : 
             language === 'LA' ? 'Gradus ascendere et beneficia liberare' : 
             'Level up and unlock benefits'}
          </p>
          <div className="flex items-center text-red-600 font-semibold text-sm">
            {language === 'DE' ? 'Level anzeigen' : language === 'LA' ? 'Gradum' : 'View Level'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <Award className="h-12 w-12 text-blue-600 mb-4" />
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'DE' ? 'Neue Verbesserungen!' : language === 'LA' ? 'Meliorationes Novae!' : 'New Enhancements!'}
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>🎯 {language === 'DE' ? 'Erweiterte Quiz-Funktionen' : language === 'LA' ? 'Functiones quaestionum auctae' : 'Enhanced quiz features'}</li>
            <li>📚 {language === 'DE' ? 'Grammatik-Explorer' : language === 'LA' ? 'Explorator grammaticus' : 'Grammar explorer'}</li>
            <li>🔍 {language === 'DE' ? 'Text-Processor-System' : language === 'LA' ? 'Systema processor textuum' : 'Text processor system'}</li>
            <li>📊 {language === 'DE' ? 'Umfassende Analyse' : language === 'LA' ? 'Analysis comprehensa' : 'Comprehensive analysis'}</li>
          </ul>
        </Card>
      </div>

      {/* Current Stats Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h4 className="text-xl font-bold mb-4">
          {language === 'DE' ? 'Deine aktuelle Statistik' : language === 'LA' ? 'Statisticae tuae currentes' : 'Your Current Stats'}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.level}</div>
            <div className="text-sm opacity-80">{language === 'DE' ? 'Level' : language === 'LA' ? 'Gradus' : 'Level'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.totalExperience}</div>
            <div className="text-sm opacity-80">{language === 'DE' ? 'Erfahrung' : language === 'LA' ? 'Experientia' : 'Experience'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.vocabularyMastered.total}</div>
            <div className="text-sm opacity-80">{language === 'DE' ? 'Vokabeln' : language === 'LA' ? 'Vocabula' : 'Vocabulary'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.maxStreak}</div>
            <div className="text-sm opacity-80">{language === 'DE' ? 'Max. Serie' : language === 'LA' ? 'Series Max.' : 'Max Streak'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.expEarnedToday}</div>
            <div className="text-sm opacity-80">{language === 'DE' ? 'Heute verdient' : language === 'LA' ? 'Hodie merita' : 'Earned Today'}</div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
        <h4 className="text-xl font-bold mb-4 text-gray-900">
          {language === 'DE' ? '🎉 Alle 4 Bildungskomponenten verbessert!' : 
           language === 'LA' ? '🎉 Omnes 4 partes educationis melioratae!' : 
           '🎉 All 4 Educational Components Enhanced!'}
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-semibold text-green-700 mb-2">
              {language === 'DE' ? 'Neue Funktionen:' : language === 'LA' ? 'Functiones novae:' : 'New Features:'}
            </h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>🎯 {language === 'DE' ? 'Macrobius-spezifische Quiz-Inhalte' : 'Quiz content specific to Macrobius'}</li>
              <li>📚 {language === 'DE' ? 'Umfassende Vokabelsammlung' : 'Comprehensive vocabulary collection'}</li>
              <li>🧠 {language === 'DE' ? 'Fortgeschrittene Grammatikanalyse' : 'Advanced grammar analysis'}</li>
              <li>🔍 {language === 'DE' ? 'Leistungsstarke Textsuche' : 'Powerful text search'}</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-blue-700 mb-2">
              {language === 'DE' ? 'Verbesserte Analyse:' : language === 'LA' ? 'Analysis meliorata:' : 'Enhanced Analysis:'}
            </h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>📊 {language === 'DE' ? 'Detaillierte Erklärungen' : 'Detailed explanations'}</li>
              <li>🎨 {language === 'DE' ? 'Interaktive Übungen' : 'Interactive exercises'}</li>
              <li>📈 {language === 'DE' ? 'Fortschrittsverfolgung' : 'Progress tracking'}</li>
              <li>🏆 {language === 'DE' ? 'Erfolge und Belohnungen' : 'Achievements and rewards'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="learning" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {language === 'DE' ? 'Vollständig erweiterte Lernplattform' : 
             language === 'LA' ? 'Suggestus Discendi Omnino Auctus' : 
             'Fully Enhanced Learning Platform'}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {language === 'DE' ? 'Alle vier Bildungskomponenten vollständig verbessert mit authentischen Macrobius-Inhalten, fortgeschrittener Analyse und umfassender Funktionalität' :
             language === 'LA' ? 'Omnes quattuor partes educationis omnino melioratae cum contentis Macrobii authenticis, analysi provecta et functionalitate comprehensa' :
             'All four educational components fully enhanced with authentic Macrobius content, advanced analysis, and comprehensive functionality'}
          </p>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          <div className="flex flex-wrap bg-white rounded-lg shadow-lg p-1 gap-1">
            {[
              { id: 'overview', icon: '🏠', label: language === 'DE' ? 'Übersicht' : language === 'LA' ? 'Conspectus' : 'Overview' },
              { id: 'quiz', icon: '🎯', label: language === 'DE' ? 'Quiz' : language === 'LA' ? 'Quaestiones' : 'Quiz' },
              { id: 'vocabulary', icon: '📖', label: language === 'DE' ? 'Vokabeln' : language === 'LA' ? 'Vocabula' : 'Vocabulary' },
              { id: 'grammar', icon: '🧠', label: language === 'DE' ? 'Grammatik' : language === 'LA' ? 'Grammatica' : 'Grammar' },
              { id: 'textprocessor', icon: '🔍', label: language === 'DE' ? 'Text-Suche' : language === 'LA' ? 'Quaestio' : 'Text Search' },
              { id: 'progress', icon: '📊', label: language === 'DE' ? 'Fortschritt' : language === 'LA' ? 'Progressus' : 'Progress' },
              { id: 'achievements', icon: '🏆', label: language === 'DE' ? 'Erfolge' : language === 'LA' ? 'Victoriae' : 'Achievements' },
              { id: 'experience', icon: '⚡', label: language === 'DE' ? 'Erfahrung' : language === 'LA' ? 'Experientia' : 'Experience' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 text-sm ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && renderOverview()}
          
          {activeTab === 'quiz' && (
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <QuizSection language={language} />
            </div>
          )}
          
          {activeTab === 'vocabulary' && (
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <VocabularyTrainerSection 
                language={{ code: language.toLowerCase(), name: language }} 
              />
            </div>
          )}

          {activeTab === 'grammar' && (
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <MacrobiusGrammarExplainer language={language} />
            </div>
          )}

          {activeTab === 'textprocessor' && (
            <div className="rounded-lg shadow-xl overflow-hidden">
              <MacrobiusTextProcessor language={language.toLowerCase()} />
            </div>
          )}
          
          {activeTab === 'progress' && (
            <div className="bg-white rounded-lg shadow-xl p-6">
              <ProgressTracker 
                userId="demo-user"
                language={language}
                onGoalCompleted={handleGoalCompleted}
              />
            </div>
          )}
          
          {activeTab === 'achievements' && (
            <div className="bg-white rounded-lg shadow-xl p-6">
              <AchievementSystem 
                userId="demo-user"
                language={language}
                userStats={userStats}
                onAchievementUnlocked={handleAchievementUnlocked}
              />
            </div>
          )}
          
          {activeTab === 'experience' && (
            <div className="bg-white rounded-lg shadow-xl p-6">
              <ExperienceSystem 
                userId="demo-user"
                language={language}
                userStats={userStats}
                onLevelUp={handleLevelUp}
              />
            </div>
          )}
        </div>

        {/* Enhanced Platform Status */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">
                {language === 'DE' ? 'Alle 4 Bildungskomponenten vollständig verbessert!' : 
                 language === 'LA' ? 'Omnes 4 partes educationis omnino melioratae!' : 
                 'All 4 Educational Components Fully Enhanced!'}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <Zap className="w-4 h-4" />
              <span>
                {language === 'DE' ? 'Produktionsbereit' : 
                 language === 'LA' ? 'Productioni parata' : 
                 'Production Ready'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LearningSection;
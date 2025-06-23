/**
 * 🎯 PERSONALIZED LEARNING PATHS SECTION
 * AI-Powered Adaptive Cultural Education Interface
 * FIXED: Removed problematic imports and created self-contained component
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Play, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Star, 
  Book,
  Brain,
  Zap,
  Globe,
  Users,
  Award,
  ChevronRight,
  Plus,
  Settings,
  Calendar,
  Lightbulb,
  Map,
  Trophy,
  RefreshCw,
  Pause,
  ArrowRight,
  BarChart3
} from 'lucide-react';

// Simple interfaces for the component
interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  progress: {
    overallCompletion: number;
    timeSpent: number;
    modulesCompleted: number;
    averageScore: number;
    studyStreak: number;
    currentModule?: string;
  };
  modules: LearningModule[];
  milestones: LearningMilestone[];
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  culturalThemes: string[];
  completed: boolean;
  comprehensionScore: number;
}

interface LearningMilestone {
  id: string;
  title: string;
  description: string;
  badgeIcon: string;
  achieved: boolean;
  progress: number;
  achievedDate?: Date;
}

interface PathGenerationOptions {
  studySchedule: 'casual' | 'regular' | 'intensive';
  preferredDifficulty: 'adaptive' | 'beginner' | 'intermediate' | 'advanced';
  learningStyle: 'mixed' | 'visual' | 'auditory' | 'reading' | 'kinesthetic';
  modernConnections: boolean;
  assessmentFrequency: 'low' | 'medium' | 'high';
  peerInteraction: boolean;
  culturalDepth: 'survey' | 'focused' | 'comprehensive';
}

interface CulturalCompetency {
  theme: string;
  proficiencyLevel: number;
  knowledge: number;
  comprehension: number;
  application: number;
  analysis: number;
  synthesis: number;
  strengthAreas: string[];
  improvementAreas: string[];
  passagesStudied: number;
  activitiesCompleted: number;
}

interface PathProgress {
  overallCompletion: number;
  modulesCompleted: number;
  timeSpent: number;
  studyStreak: number;
  culturalCompetencies: CulturalCompetency[];
  currentModule?: string;
}

interface LearningPathsProps {
  className?: string;
  language?: 'DE' | 'EN' | 'LA';
}

// Sample data
const CulturalThemes = [
  'Religious Practices',
  'Social Customs', 
  'Philosophy',
  'Education',
  'Roman History',
  'Literature',
  'Law',
  'Astronomy',
  'Architecture'
];

const samplePaths: LearningPath[] = [
  {
    id: 'path_1',
    title: 'Roman Cultural Foundations',
    description: 'Explore the fundamental aspects of Roman culture through Macrobius\' insights',
    difficulty: 'intermediate',
    progress: {
      overallCompletion: 65,
      timeSpent: 420, // minutes
      modulesCompleted: 4,
      averageScore: 78,
      studyStreak: 12,
      currentModule: 'module_5'
    },
    modules: [
      {
        id: 'module_1',
        title: 'Religious Practices in Late Antiquity',
        description: 'Understanding Roman religious customs and rituals',
        estimatedTime: 45,
        difficulty: 'beginner',
        culturalThemes: ['Religious Practices', 'Social Customs'],
        completed: true,
        comprehensionScore: 85
      },
      {
        id: 'module_2', 
        title: 'Social Hierarchies and Customs',
        description: 'Roman social structure and daily life practices',
        estimatedTime: 60,
        difficulty: 'intermediate',
        culturalThemes: ['Social Customs', 'Roman History'],
        completed: true,
        comprehensionScore: 72
      },
      {
        id: 'module_3',
        title: 'Philosophical Traditions',
        description: 'Neo-Platonic thought and Roman philosophical synthesis',
        estimatedTime: 75,
        difficulty: 'advanced',
        culturalThemes: ['Philosophy', 'Literature'],
        completed: true,
        comprehensionScore: 91
      },
      {
        id: 'module_4',
        title: 'Educational Methods',
        description: 'How knowledge was transmitted in Roman society',
        estimatedTime: 50,
        difficulty: 'intermediate',
        culturalThemes: ['Education', 'Literature'],
        completed: true,
        comprehensionScore: 88
      },
      {
        id: 'module_5',
        title: 'Astronomical Knowledge',
        description: 'Roman understanding of celestial mechanics and cosmic philosophy',
        estimatedTime: 90,
        difficulty: 'advanced',
        culturalThemes: ['Astronomy', 'Philosophy'],
        completed: false,
        comprehensionScore: 0
      }
    ],
    milestones: [
      {
        id: 'milestone_1',
        title: 'Cultural Foundation',
        description: 'Mastered basic Roman cultural concepts',
        badgeIcon: '🏛️',
        achieved: true,
        progress: 100,
        achievedDate: new Date('2024-01-15')
      },
      {
        id: 'milestone_2',
        title: 'Philosophical Insights',
        description: 'Understood key philosophical concepts',
        badgeIcon: '🧠',
        achieved: true,
        progress: 100,
        achievedDate: new Date('2024-02-01')
      },
      {
        id: 'milestone_3',
        title: 'Advanced Scholar',
        description: 'Demonstrated mastery of complex cultural analysis',
        badgeIcon: '📚',
        achieved: false,
        progress: 75
      }
    ]
  }
];

const sampleCompetencies: CulturalCompetency[] = [
  {
    theme: 'Religious Practices',
    proficiencyLevel: 85,
    knowledge: 90,
    comprehension: 85,
    application: 80,
    analysis: 85,
    synthesis: 75,
    strengthAreas: ['Ritual Understanding', 'Historical Context'],
    improvementAreas: ['Comparative Analysis', 'Modern Connections'],
    passagesStudied: 45,
    activitiesCompleted: 12
  },
  {
    theme: 'Philosophy',
    proficiencyLevel: 78,
    knowledge: 85,
    comprehension: 80,
    application: 75,
    analysis: 85,
    synthesis: 70,
    strengthAreas: ['Neo-Platonic Concepts', 'Logical Analysis'],
    improvementAreas: ['Synthesis Skills', 'Critical Evaluation'],
    passagesStudied: 38,
    activitiesCompleted: 9
  }
];

// Translation system
const translations = {
  DE: {
    title: 'Personalisierte Lernpfade',
    subtitle: 'KI-gesteuerte adaptive Kulturbildung',
    description: 'Revolutionäres KI-System, das individuelle Lernreisen erstellt, die auf Ihre Ziele, Interessen und Ihren Lernstil zugeschnitten sind und sich in Echtzeit an Ihren Fortschritt anpassen.',
    loading: 'Lade Ihre Lernpfade...',
    overview: 'Übersicht',
    createPath: 'Pfad erstellen',
    myProgress: 'Mein Fortschritt',
    competencies: 'Kompetenzen',
    welcome: 'Willkommen beim KI-gesteuerten Lernen',
    welcomeDescription: 'Erstellen Sie Ihren ersten personalisierten Lernpfad und erleben Sie revolutionäres KI-gesteuertes Lernen, das sich an Ihren einzigartigen Lernstil und Ihre Ziele anpasst.',
    createFirst: 'Erstellen Sie Ihren ersten Lernpfad',
    yourPaths: 'Ihre Lernpfade',
    newPath: 'Neuer Pfad',
    progress: 'Fortschritt',
    complete: 'Vollständig',
    modulesDone: 'Module erledigt',
    timeSpent: 'Zeit verbracht',
    avgScore: 'Durchschn. Bewertung',
    dayStreak: 'Tage-Serie',
    currentlyActive: 'Derzeit aktiv',
    overallProgress: 'Gesamtfortschritt',
    modulesCompleted: 'Module abgeschlossen',
    timeStudied: 'Lernzeit',
    learningGoals: 'Was sind Ihre Lernziele?',
    culturalInterests: 'Wählen Sie Ihre kulturellen Interessen:',
    learningPreferences: 'Lernpräferenzen',
    studySchedule: 'Lernplan',
    difficultyPreference: 'Schwierigkeitsgrad',
    learningStyle: 'Lernstil',
    advancedOptions: 'Erweiterte Optionen',
    timeCommitment: 'Zeitaufwand (Stunden pro Woche)',
    modernConnections: 'Moderne Verbindungen einbeziehen',
    peerInteractions: 'Peer-Interaktionen ermöglichen',
    culturalDepth: 'Kulturelle Tiefe',
    generatePath: 'KI-Lernpfad generieren',
    generating: 'Generiere KI-Lernpfad...',
    selectGoalsAndInterests: 'Bitte wählen Sie mindestens ein Lernziel und ein kulturelles Interesse.',
    learningModules: 'Lernmodule',
    continue: 'Weiter',
    completed: 'Abgeschlossen',
    culturalThemes: 'Kulturelle Themen',
    difficulty: 'Schwierigkeit',
    performance: 'Leistung',
    learningMilestones: 'Lernmeilensteine',
    achieved: 'Erreicht!',
    culturalCompetencies: 'Kulturelle Kompetenzen',
    proficient: 'Kenntnisstand',
    knowledge: 'Wissen',
    comprehension: 'Verständnis',
    application: 'Anwendung',
    analysis: 'Analyse',
    synthesis: 'Synthese',
    strengthAreas: 'Stärkebereiche',
    improvementAreas: 'Verbesserungsbereiche',
    noCompetencies: 'Noch keine Kompetenzen',
    noCompetenciesDesc: 'Schließen Sie einige Lernmodule ab, um Ihre kulturelle Kompetenzentwicklung zu sehen.',
    aiReady: 'KI-gesteuertes Lernen bereit - Oracle Cloud-Integration verfügbar'
  },
  EN: {
    title: 'Personalized Learning Paths',
    subtitle: 'AI-Powered Adaptive Cultural Education',
    description: 'Revolutionary AI system that creates custom learning journeys tailored to your goals, interests, and learning style, adapting in real-time based on your progress.',
    loading: 'Loading your learning paths...',
    overview: 'Overview',
    createPath: 'Create Path',
    myProgress: 'My Progress', 
    competencies: 'Competencies',
    welcome: 'Welcome to AI-Powered Learning',
    welcomeDescription: 'Create your first personalized learning path and experience revolutionary AI-driven education that adapts to your unique learning style and goals.',
    createFirst: 'Create Your First Learning Path',
    yourPaths: 'Your Learning Paths',
    newPath: 'New Path',
    progress: 'Progress',
    complete: 'Complete',
    modulesDone: 'Modules Done',
    timeSpent: 'Time Spent',
    avgScore: 'Avg Score',
    dayStreak: 'Day Streak',
    currentlyActive: 'Currently Active',
    overallProgress: 'Overall Progress',
    modulesCompleted: 'Modules Completed',
    timeStudied: 'Time Studied',
    learningGoals: 'What are your learning goals?',
    culturalInterests: 'Select your cultural interests:',
    learningPreferences: 'Learning Preferences',
    studySchedule: 'Study Schedule',
    difficultyPreference: 'Difficulty Preference',
    learningStyle: 'Learning Style',
    advancedOptions: 'Advanced Options',
    timeCommitment: 'Time Commitment (hours per week)',
    modernConnections: 'Include modern connections',
    peerInteractions: 'Enable peer interactions',
    culturalDepth: 'Cultural Depth',
    generatePath: 'Generate AI Learning Path',
    generating: 'Generating AI Learning Path...',
    selectGoalsAndInterests: 'Please select at least one learning goal and one cultural interest.',
    learningModules: 'Learning Modules',
    continue: 'Continue',
    completed: 'Completed',
    culturalThemes: 'Cultural Themes',
    difficulty: 'Difficulty',
    performance: 'Performance',
    learningMilestones: 'Learning Milestones',
    achieved: 'Achieved!',
    culturalCompetencies: 'Cultural Competencies',
    proficient: 'Proficient',
    knowledge: 'Knowledge',
    comprehension: 'Comprehension',
    application: 'Application',
    analysis: 'Analysis',
    synthesis: 'Synthesis',
    strengthAreas: 'Strength Areas',
    improvementAreas: 'Improvement Areas',
    noCompetencies: 'No Competencies Yet',
    noCompetenciesDesc: 'Complete some learning modules to see your cultural competency development.',
    aiReady: 'AI-Powered Learning Ready - Oracle Cloud Integration Available'
  },
  LA: {
    title: 'Semitae Discendi Personalizatae',
    subtitle: 'Educatio Culturalis Adaptiva per AI',
    description: 'Systema AI revolutionarium quod itinera discendi propria creat, ad tua proposita, studia, et modum discendi accommodata, tempore reali secundum progressum tuum adaptans.',
    loading: 'Semitae tuae discendi onerantur...',
    overview: 'Conspectus',
    createPath: 'Semitam Creare',
    myProgress: 'Progressus Meus',
    competencies: 'Competentiae',
    welcome: 'Salve ad Discendum per AI',
    welcomeDescription: 'Crea primam semitam discendi personalizatam et experire educationem AI-motam revolutionariam quae ad tuum modum discendi unicum et proposita tua se accommodat.',
    createFirst: 'Crea Primam Semitam Discendi',
    yourPaths: 'Tuae Semitae Discendi',
    newPath: 'Nova Semita',
    progress: 'Progressus',
    complete: 'Completus',
    modulesDone: 'Moduli Perfecti',
    timeSpent: 'Tempus Impensum',
    avgScore: 'Nota Media',
    dayStreak: 'Series Dierum',
    currentlyActive: 'Nunc Activus',
    overallProgress: 'Progressus Generalis',
    modulesCompleted: 'Moduli Completi',
    timeStudied: 'Tempus Studiorum',
    learningGoals: 'Quae sunt proposita tua discendi?',
    culturalInterests: 'Elige studia tua culturalia:',
    learningPreferences: 'Praeferentiae Discendi',
    studySchedule: 'Ordo Studiorum',
    difficultyPreference: 'Praeferentia Difficultatis',
    learningStyle: 'Modus Discendi',
    advancedOptions: 'Optiones Progressae',
    timeCommitment: 'Tempus Destinatum (horae per hebdomadam)',
    modernConnections: 'Connexiones modernas includere',
    peerInteractions: 'Interactiones inter pares facere',
    culturalDepth: 'Profunditas Culturalis',
    generatePath: 'Semitam AI Discendi Generare',
    generating: 'Semita AI Discendi generatur...',
    selectGoalsAndInterests: 'Quaeso elige saltem unum propositum discendi et unum studium culturale.',
    learningModules: 'Moduli Discendi',
    continue: 'Pergere',
    completed: 'Perfectus',
    culturalThemes: 'Themata Culturalia',
    difficulty: 'Difficultas',
    performance: 'Effectus',
    learningMilestones: 'Lapides Discendi',
    achieved: 'Adeptus!',
    culturalCompetencies: 'Competentiae Culturales',
    proficient: 'Peritus',
    knowledge: 'Scientia',
    comprehension: 'Comprehensio',
    application: 'Applicatio',
    analysis: 'Analysis',
    synthesis: 'Synthesis',
    strengthAreas: 'Areae Fortitudinis',
    improvementAreas: 'Areae Meliorandae',
    noCompetencies: 'Nullae Competentiae Adhuc',
    noCompetenciesDesc: 'Aliquos modulos discendi complete ut tuam culturalium competentiarum evolutionem videas.',
    aiReady: 'Discendum per AI Paratum - Integratio Oracle Cloud Disponibilis'
  }
};

export default function PersonalizedLearningPathsSection({ className = '', language = 'EN' }: LearningPathsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'generator' | 'progress' | 'competencies'>('overview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [culturalInterests, setCulturalInterests] = useState<string[]>([]);
  const [generationOptions, setGenerationOptions] = useState<PathGenerationOptions>({
    studySchedule: 'regular',
    preferredDifficulty: 'adaptive',
    learningStyle: 'mixed',
    modernConnections: true,
    assessmentFrequency: 'medium',
    peerInteraction: false,
    culturalDepth: 'focused'
  });
  const [timeCommitment, setTimeCommitment] = useState(10);
  const [userPaths, setUserPaths] = useState<LearningPath[]>(samplePaths);
  const [currentPath, setCurrentPath] = useState<LearningPath | null>(samplePaths[0] || null);
  const [pathProgress, setPathProgress] = useState<PathProgress | null>({
    overallCompletion: 65,
    modulesCompleted: 4,
    timeSpent: 420,
    studyStreak: 12,
    culturalCompetencies: sampleCompetencies,
    currentModule: 'module_5'
  });

  const t = (key: string) => {
    return translations[language]?.[key as keyof typeof translations[typeof language]] || translations.EN[key as keyof typeof translations.EN] || key;
  };

  const learningGoals = [
    'Understand Roman Cultural Values',
    'Master Classical Latin Texts',
    'Analyze Historical Context',
    'Connect Ancient and Modern Ideas',
    'Explore Religious Practices',
    'Study Social Hierarchies',
    'Examine Philosophical Concepts',
    'Learn Educational Methods',
    'Investigate Legal Systems',
    'Discover Astronomical Knowledge'
  ];

  const handleGeneratePath = async () => {
    if (selectedGoals.length === 0 || culturalInterests.length === 0) return;

    setIsGenerating(true);
    try {
      // Simulate AI path generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create a new learning path based on selections
      const newPath: LearningPath = {
        id: `path_${Date.now()}`,
        title: `Custom Path: ${selectedGoals.slice(0, 2).join(' & ')}`,
        description: `Personalized learning journey focusing on ${culturalInterests.join(', ')}`,
        difficulty: generationOptions.preferredDifficulty === 'adaptive' ? 'intermediate' : generationOptions.preferredDifficulty,
        progress: {
          overallCompletion: 0,
          timeSpent: 0,
          modulesCompleted: 0,
          averageScore: 0,
          studyStreak: 0,
          currentModule: 'module_1'
        },
        modules: [
          {
            id: 'module_1',
            title: `Introduction to ${culturalInterests[0]}`,
            description: `Basic concepts and foundations of ${culturalInterests[0]}`,
            estimatedTime: 30,
            difficulty: 'beginner',
            culturalThemes: culturalInterests.slice(0, 2),
            completed: false,
            comprehensionScore: 0
          },
          {
            id: 'module_2',
            title: `Advanced ${culturalInterests[0]} Studies`,
            description: `Deep dive into ${culturalInterests[0]} with practical applications`,
            estimatedTime: 60,
            difficulty: 'intermediate',
            culturalThemes: culturalInterests,
            completed: false,
            comprehensionScore: 0
          }
        ],
        milestones: [
          {
            id: 'milestone_1',
            title: 'Getting Started',
            description: 'Completed your first module',
            badgeIcon: '🎯',
            achieved: false,
            progress: 0
          }
        ]
      };
      
      setUserPaths(prev => [...prev, newPath]);
      setCurrentPath(newPath);
      setActiveTab('progress');
      
      // Reset form
      setSelectedGoals([]);
      setCulturalInterests([]);
    } catch (error) {
      console.error('Path generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const toggleCulturalInterest = (theme: string) => {
    setCulturalInterests(prev => 
      prev.includes(theme) 
        ? prev.filter(t => t !== theme)
        : [...prev, theme]
    );
  };

  const selectPath = (pathId: string) => {
    const path = userPaths.find(p => p.id === pathId);
    if (path) {
      setCurrentPath(path);
      setActiveTab('progress');
    }
  };

  const getCompetencyColor = (level: number) => {
    if (level >= 80) return 'text-green-600 bg-green-100';
    if (level >= 60) return 'text-blue-600 bg-blue-100';
    if (level >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (isLoading) {
    return (
      <div className="py-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <RefreshCw className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">{t('loading')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`py-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 ${className}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-4">
              <Target className="h-12 w-12 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-5xl font-bold text-gray-900 mb-2">
                {t('title')}
              </h2>
              <p className="text-xl text-green-600 font-semibold">
                {t('subtitle')}
              </p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white rounded-xl p-2 shadow-lg border border-gray-200">
            {[
              { id: 'overview', label: t('overview'), icon: Map },
              { id: 'generator', label: t('createPath'), icon: Plus },
              { id: 'progress', label: t('myProgress'), icon: TrendingUp },
              { id: 'competencies', label: t('competencies'), icon: Award }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === id
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {userPaths.length === 0 ? (
                /* Welcome State */
                <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-200 text-center">
                  <Target className="h-20 w-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {t('welcome')}
                  </h3>
                  <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    {t('welcomeDescription')}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                      <Brain className="h-10 w-10 text-green-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">AI Path Generation</h4>
                      <p className="text-sm text-gray-600">Custom learning journeys created by advanced AI based on your goals and interests</p>
                    </div>
                    
                    <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                      <TrendingUp className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Adaptive Learning</h4>
                      <p className="text-sm text-gray-600">Real-time adjustments based on your progress, engagement, and comprehension</p>
                    </div>
                    
                    <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                      <Globe className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Cultural Mastery</h4>
                      <p className="text-sm text-gray-600">Deep understanding of Roman culture with modern applications and connections</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('generator')}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 text-lg"
                  >
                    <Plus className="h-6 w-6 mr-3" />
                    {t('createFirst')}
                  </button>
                </div>
              ) : (
                /* Existing Paths Overview */
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">{t('yourPaths')}</h3>
                      <button
                        onClick={() => setActiveTab('generator')}
                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        {t('newPath')}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {userPaths.map((path) => (
                        <div key={path.id} className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                             onClick={() => selectPath(path.id)}>
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-1">{path.title}</h4>
                              <p className="text-sm text-gray-600">{path.description}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              path.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                              path.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                              path.difficulty === 'advanced' ? 'bg-orange-100 text-orange-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {path.difficulty}
                            </span>
                          </div>

                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>{t('progress')}</span>
                              <span>{Math.round(path.progress.overallCompletion)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${path.progress.overallCompletion}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {formatTime(path.progress.timeSpent)}
                            </div>
                            <div className="flex items-center">
                              <Book className="h-4 w-4 mr-1" />
                              {path.progress.modulesCompleted}/{path.modules.length} modules
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-1" />
                              {Math.round(path.progress.averageScore)}%
                            </div>
                          </div>

                          {path.id === currentPath?.id && (
                            <div className="mt-3 flex items-center text-green-600 text-sm font-medium">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              {t('currentlyActive')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  {pathProgress && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {Math.round(pathProgress.overallCompletion)}%
                        </div>
                        <div className="text-sm text-gray-600">{t('overallProgress')}</div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {pathProgress.modulesCompleted}
                        </div>
                        <div className="text-sm text-gray-600">{t('modulesCompleted')}</div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          {formatTime(pathProgress.timeSpent)}
                        </div>
                        <div className="text-sm text-gray-600">{t('timeStudied')}</div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-2">
                          {pathProgress.studyStreak}
                        </div>
                        <div className="text-sm text-gray-600">{t('dayStreak')}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Path Generator Tab */}
          {activeTab === 'generator' && (
            <motion.div
              key="generator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <div className="flex items-center mb-8">
                  <Zap className="h-8 w-8 text-green-500 mr-3" />
                  <h3 className="text-3xl font-bold text-gray-900">AI Learning Path Generator</h3>
                </div>

                <div className="space-y-8">
                  {/* Learning Goals Selection */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('learningGoals')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {learningGoals.map((goal) => (
                        <button
                          key={goal}
                          onClick={() => toggleGoal(goal)}
                          className={`p-3 text-left rounded-lg border-2 transition-all duration-300 ${
                            selectedGoals.includes(goal)
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                          }`}
                        >
                          <div className="flex items-center">
                            {selectedGoals.includes(goal) ? (
                              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-300 rounded mr-2" />
                            )}
                            <span className="font-medium">{goal}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cultural Interests */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('culturalInterests')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {CulturalThemes.map((theme) => (
                        <button
                          key={theme}
                          onClick={() => toggleCulturalInterest(theme)}
                          className={`p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                            culturalInterests.includes(theme)
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex items-center">
                            {culturalInterests.includes(theme) ? (
                              <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-300 rounded mr-3" />
                            )}
                            <div>
                              <div className="font-medium">{theme}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                {theme === 'Religious Practices' && 'Roman religious rituals and beliefs'}
                                {theme === 'Social Customs' && 'Roman social hierarchies and customs'}
                                {theme === 'Philosophy' && 'Neo-Platonic and Roman philosophical thought'}
                                {theme === 'Education' && 'Roman learning methods and knowledge transmission'}
                                {theme === 'Roman History' && 'Historical events and cultural development'}
                                {theme === 'Literature' && 'Literary criticism and cultural commentary'}
                                {theme === 'Law' && 'Legal principles and Roman jurisprudence'}
                                {theme === 'Astronomy' && 'Celestial observations and cosmic philosophy'}
                                {theme === 'Architecture' && 'Roman architectural principles and engineering'}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Learning Preferences */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('learningPreferences')}</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{t('studySchedule')}</label>
                          <select
                            value={generationOptions.studySchedule}
                            onChange={(e) => setGenerationOptions(prev => ({ ...prev, studySchedule: e.target.value as any }))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="casual">Casual (1-3 hours/week)</option>
                            <option value="regular">Regular (4-8 hours/week)</option>
                            <option value="intensive">Intensive (9+ hours/week)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{t('difficultyPreference')}</label>
                          <select
                            value={generationOptions.preferredDifficulty}
                            onChange={(e) => setGenerationOptions(prev => ({ ...prev, preferredDifficulty: e.target.value as any }))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="adaptive">Adaptive (AI adjusts difficulty)</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{t('learningStyle')}</label>
                          <select
                            value={generationOptions.learningStyle}
                            onChange={(e) => setGenerationOptions(prev => ({ ...prev, learningStyle: e.target.value as any }))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="mixed">Mixed (Balanced approach)</option>
                            <option value="visual">Visual (Images, diagrams, charts)</option>
                            <option value="auditory">Auditory (Audio content, discussions)</option>
                            <option value="reading">Reading/Writing (Text-based learning)</option>
                            <option value="kinesthetic">Kinesthetic (Interactive activities)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('advancedOptions')}</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('timeCommitment')}: {timeCommitment}
                          </label>
                          <input
                            type="range"
                            min="2"
                            max="20"
                            value={timeCommitment}
                            onChange={(e) => setTimeCommitment(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>2h</span>
                            <span>20h</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={generationOptions.modernConnections}
                              onChange={(e) => setGenerationOptions(prev => ({ ...prev, modernConnections: e.target.checked }))}
                              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{t('modernConnections')}</span>
                          </label>

                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={generationOptions.peerInteraction}
                              onChange={(e) => setGenerationOptions(prev => ({ ...prev, peerInteraction: e.target.checked }))}
                              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{t('peerInteractions')}</span>
                          </label>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{t('culturalDepth')}</label>
                          <select
                            value={generationOptions.culturalDepth}
                            onChange={(e) => setGenerationOptions(prev => ({ ...prev, culturalDepth: e.target.value as any }))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="survey">Survey (Broad overview)</option>
                            <option value="focused">Focused (Targeted exploration)</option>
                            <option value="comprehensive">Comprehensive (Deep dive)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <div className="text-center pt-6">
                    <button
                      onClick={handleGeneratePath}
                      disabled={selectedGoals.length === 0 || culturalInterests.length === 0 || isGenerating}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-lg"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-6 w-6 mr-3 animate-spin" />
                          {t('generating')}
                        </>
                      ) : (
                        <>
                          <Brain className="h-6 w-6 mr-3" />
                          {t('generatePath')}
                        </>
                      )}
                    </button>
                    
                    {(selectedGoals.length === 0 || culturalInterests.length === 0) && (
                      <p className="text-sm text-red-600 mt-2">
                        {t('selectGoalsAndInterests')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && currentPath && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Current Path Overview */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{currentPath.title}</h3>
                    <p className="text-gray-600 mt-1">{currentPath.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">
                      {Math.round(currentPath.progress.overallCompletion)}%
                    </div>
                    <div className="text-sm text-gray-600">{t('complete')}</div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${currentPath.progress.overallCompletion}%` }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{currentPath.progress.modulesCompleted}</div>
                    <div className="text-sm text-gray-600">{t('modulesDone')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{formatTime(currentPath.progress.timeSpent)}</div>
                    <div className="text-sm text-gray-600">{t('timeSpent')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{Math.round(currentPath.progress.averageScore)}%</div>
                    <div className="text-sm text-gray-600">{t('avgScore')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{currentPath.progress.studyStreak}</div>
                    <div className="text-sm text-gray-600">{t('dayStreak')}</div>
                  </div>
                </div>
              </div>

              {/* Learning Modules */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('learningModules')}</h3>
                
                <div className="space-y-4">
                  {currentPath.modules.map((module, index) => (
                    <div key={module.id} className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                      module.completed 
                        ? 'border-green-200 bg-green-50' 
                        : currentPath.progress.currentModule === module.id
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                            module.completed 
                              ? 'bg-green-500 text-white' 
                              : currentPath.progress.currentModule === module.id
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            {module.completed ? (
                              <CheckCircle className="h-6 w-6" />
                            ) : (
                              <span className="font-bold">{index + 1}</span>
                            )}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{module.title}</h4>
                            <p className="text-sm text-gray-600">{module.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {formatTime(module.estimatedTime)}
                            </div>
                            <div className="text-xs text-gray-500">Estimated</div>
                          </div>
                          
                          {!module.completed && currentPath.progress.currentModule === module.id && (
                            <button
                              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                              <Play className="h-4 w-4 mr-2" />
                              {t('continue')}
                            </button>
                          )}
                          
                          {module.completed && (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-5 w-5 mr-1" />
                              <span className="text-sm font-medium">{t('completed')}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Module Progress Details */}
                      {(module.completed || currentPath.progress.currentModule === module.id) && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <div className="text-sm text-gray-600 mb-1">{t('culturalThemes')}</div>
                              <div className="flex flex-wrap gap-1">
                                {module.culturalThemes.map((theme) => (
                                  <span key={theme} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                    {theme}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-gray-600 mb-1">{t('difficulty')}</div>
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                module.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                                module.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                                module.difficulty === 'advanced' ? 'bg-orange-100 text-orange-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {module.difficulty}
                              </span>
                            </div>
                            
                            {module.completed && (
                              <div>
                                <div className="text-sm text-gray-600 mb-1">{t('performance')}</div>
                                <div className="text-lg font-bold text-green-600">
                                  {Math.round(module.comprehensionScore)}%
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              {currentPath.milestones.length > 0 && (
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('learningMilestones')}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentPath.milestones.map((milestone) => (
                      <div key={milestone.id} className={`p-6 rounded-lg border-2 ${
                        milestone.achieved 
                          ? 'border-yellow-200 bg-yellow-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="flex items-center mb-4">
                          <div className={`text-2xl mr-3 ${milestone.achieved ? 'opacity-100' : 'opacity-40'}`}>
                            {milestone.badgeIcon}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{milestone.title}</h4>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                          </div>
                        </div>
                        
                        {milestone.achieved ? (
                          <div className="flex items-center text-yellow-600">
                            <Trophy className="h-5 w-5 mr-2" />
                            <span className="font-medium">{t('achieved')}</span>
                            {milestone.achievedDate && (
                              <span className="text-sm text-gray-500 ml-2">
                                {milestone.achievedDate.toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>{t('progress')}</span>
                              <span>{Math.round(milestone.progress)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${milestone.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Competencies Tab */}
          {activeTab === 'competencies' && pathProgress && (
            <motion.div
              key="competencies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('culturalCompetencies')}</h3>
                
                {pathProgress.culturalCompetencies.length > 0 ? (
                  <div className="space-y-6">
                    {pathProgress.culturalCompetencies.map((competency) => (
                      <div key={competency.theme} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">{competency.theme}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCompetencyColor(competency.proficiencyLevel)}`}>
                            {competency.proficiencyLevel}% {t('proficient')}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                          {[
                            { label: t('knowledge'), value: competency.knowledge },
                            { label: t('comprehension'), value: competency.comprehension },
                            { label: t('application'), value: competency.application },
                            { label: t('analysis'), value: competency.analysis },
                            { label: t('synthesis'), value: competency.synthesis }
                          ].map(({ label, value }) => (
                            <div key={label} className="text-center">
                              <div className="text-lg font-bold text-gray-900">{value}%</div>
                              <div className="text-xs text-gray-600">{label}</div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                                  style={{ width: `${value}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">{t('strengthAreas')}</h5>
                            <div className="flex flex-wrap gap-2">
                              {competency.strengthAreas.map((area) => (
                                <span key={area} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">{t('improvementAreas')}</h5>
                            <div className="flex flex-wrap gap-2">
                              {competency.improvementAreas.map((area) => (
                                <span key={area} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="text-sm text-gray-600">
                            <strong>{t('progress')}:</strong> {competency.passagesStudied} passages studied, {competency.activitiesCompleted} activities completed
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{t('noCompetencies')}</h4>
                    <p className="text-gray-600">{t('noCompetenciesDesc')}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Oracle Cloud Integration Status */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-full">
            <Clock className="h-5 w-5 text-green-600 mr-3" />
            <span className="text-green-700 font-medium">
              {t('aiReady')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
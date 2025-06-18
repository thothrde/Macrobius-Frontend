'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  Timer,
  Database,
  TrendingUp,
  Eye,
  Scroll,
  Hash,
  Users,
  Globe,
  Award,
  Flame,
  Calendar,
  BarChart3,
  Crown,
  Medal,
  Sparkles
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
}

// 🧠 SRS (Spaced Repetition System) Data Structures
interface SRSData {
  word_id: string;
  repetition_count: number;
  easiness_factor: number; // 2.5 default (SM-2 algorithm)
  next_review_date: Date;
  last_interval: number; // days
  total_reviews: number;
  last_performance: number; // 0-5 scale
  retention_score: number; // calculated retention percentage
  created_at: Date;
  mastery_level: 'learning' | 'reviewing' | 'mastered';
}

// 🎮 Gamification & Learning Goals
interface DailyGoals {
  words_target: number;
  time_target: number; // minutes
  accuracy_target: number; // percentage
  streak_current: number;
  streak_best: number;
  experience_points: number;
  level: number;
  daily_words_completed: number;
  daily_time_spent: number; // seconds
  goals_completed_today: number;
  last_study_date: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlock_date?: Date;
  requirement: {
    type: 'streak' | 'words' | 'accuracy' | 'time' | 'level';
    value: number;
  };
}

interface LearningSession {
  correct: number;
  incorrect: number;
  streak: number;
  startTime: number;
  wordsStudied: Set<string>;
  totalReviews: number;
  averageResponseTime: number;
  difficultyProgression: number;
  srs_updates: SRSData[];
  experience_gained: number;
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
  // Enhanced State Management with SRS
  const [currentMode, setCurrentMode] = useState<'practice' | 'quiz' | 'review' | 'explore' | 'analytics'>('practice');
  const [currentWord, setCurrentWord] = useState<MacrobiusVocabulary | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [answerStartTime, setAnswerStartTime] = useState<number>(0);
  
  // SRS State
  const [srsData, setSrsData] = useState<Map<string, SRSData>>(new Map());
  const [reviewQueue, setReviewQueue] = useState<string[]>([]);
  const [newWords, setNewWords] = useState<MacrobiusVocabulary[]>([]);
  const [learningWords, setLearningWords] = useState<string[]>([]);
  
  // Gamification State
  const [dailyGoals, setDailyGoals] = useState<DailyGoals>({
    words_target: 20,
    time_target: 30,
    accuracy_target: 75,
    streak_current: 0,
    streak_best: 0,
    experience_points: 0,
    level: 1,
    daily_words_completed: 0,
    daily_time_spent: 0,
    goals_completed_today: 0,
    last_study_date: new Date().toISOString().split('T')[0]
  });
  
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showAchievementUnlock, setShowAchievementUnlock] = useState<Achievement | null>(null);
  const [showLevelUp, setShowLevelUp] = useState<boolean>(false);
  
  // Enhanced Session State
  const [session, setSession] = useState<LearningSession>({
    correct: 0,
    incorrect: 0,
    streak: 0,
    startTime: Date.now(),
    wordsStudied: new Set(),
    totalReviews: 0,
    averageResponseTime: 0,
    difficultyProgression: 0,
    srs_updates: [],
    experience_gained: 0
  });
  
  // Existing State
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(5);
  const [selectedFrequency, setSelectedFrequency] = useState<number>(10);
  const [vocabularyPool, setVocabularyPool] = useState<MacrobiusVocabulary[]>([]);
  const [reviewWords, setReviewWords] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [backendStatus, setBackendStatus] = useState<'connected' | 'error' | 'loading'>('loading');
  const [vocabularyStats, setVocabularyStats] = useState<VocabularyStats | null>(null);
  const [relatedPassages, setRelatedPassages] = useState<MacrobiusPassage[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [expandedInfo, setExpandedInfo] = useState<boolean>(false);

  // 🏆 Achievement Definitions
  const ACHIEVEMENT_TEMPLATES: Omit<Achievement, 'unlocked' | 'unlock_date'>[] = [
    {
      id: 'fire_starter',
      name: '🔥 Fire Starter',
      description: 'Study for 3 consecutive days',
      icon: '🔥',
      requirement: { type: 'streak', value: 3 }
    },
    {
      id: 'scholar',
      name: '📚 Scholar',
      description: 'Maintain a 7-day study streak',
      icon: '📚',
      requirement: { type: 'streak', value: 7 }
    },
    {
      id: 'classicist',
      name: '🏛️ Classicist',
      description: 'Study consistently for 14 days',
      icon: '🏛️',
      requirement: { type: 'streak', value: 14 }
    },
    {
      id: 'latin_master',
      name: '⭐ Latin Master',
      description: 'Achieve a 30-day study streak',
      icon: '⭐',
      requirement: { type: 'streak', value: 30 }
    },
    {
      id: 'vocabulary_novice',
      name: '🌱 Vocabulary Novice',
      description: 'Learn 50 new words',
      icon: '🌱',
      requirement: { type: 'words', value: 50 }
    },
    {
      id: 'word_collector',
      name: '📖 Word Collector',
      description: 'Master 200 vocabulary words',
      icon: '📖',
      requirement: { type: 'words', value: 200 }
    },
    {
      id: 'precision_master',
      name: '🎯 Precision Master',
      description: 'Achieve 90% accuracy in a session',
      icon: '🎯',
      requirement: { type: 'accuracy', value: 90 }
    },
    {
      id: 'time_scholar',
      name: '⏰ Time Scholar',
      description: 'Study for 2 hours total',
      icon: '⏰',
      requirement: { type: 'time', value: 120 }
    }
  ];

  // Enhanced Translations with SRS terminology
  const translations = {
    de: {
      title: 'Macrobius Vokabeltrainer',
      subtitle: 'Intelligentes Lernsystem mit Spaced Repetition (SRS) - 235K+ Zeichen authentisches Latein',
      modes: {
        practice: 'Üben',
        quiz: 'Quiz',
        review: 'Wiederholen',
        explore: 'Erkunden',
        analytics: 'Statistiken'
      },
      srs: {
        dueForReview: 'Zur Wiederholung fällig',
        learningPhase: 'Lernphase',
        masteryLevel: 'Beherrschungsgrad',
        retentionScore: 'Behaltensrate',
        nextReview: 'Nächste Wiederholung',
        interval: 'Intervall',
        easinessFactor: 'Leichtigkeitsfaktor'
      },
      gamification: {
        level: 'Level',
        xp: 'Erfahrungspunkte',
        dailyGoal: 'Tagesziel',
        streak: 'Lernserie',
        achievements: 'Erfolge',
        rewards: 'Belohnungen',
        progress: 'Fortschritt',
        levelUp: 'Level erreicht!',
        achievementUnlocked: 'Erfolg freigeschaltet!'
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
        showPassages: 'Textstellen anzeigen',
        reviewDue: 'Wiederholungen starten',
        learnNew: 'Neue Wörter lernen'
      },
      stats: {
        correct: 'Richtig',
        incorrect: 'Falsch',
        streak: 'Serie',
        accuracy: 'Genauigkeit',
        time: 'Zeit',
        studied: 'Gelernt',
        reviews: 'Wiederholungen',
        avgResponseTime: 'Ø Antwortzeit',
        retentionRate: 'Behaltensrate'
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
      subtitle: 'Intelligent Learning System with Spaced Repetition (SRS) - 235K+ Characters of Authentic Latin',
      modes: {
        practice: 'Practice',
        quiz: 'Quiz',
        review: 'Review',
        explore: 'Explore',
        analytics: 'Analytics'
      },
      srs: {
        dueForReview: 'Due for Review',
        learningPhase: 'Learning Phase',
        masteryLevel: 'Mastery Level',
        retentionScore: 'Retention Score',
        nextReview: 'Next Review',
        interval: 'Interval',
        easinessFactor: 'Easiness Factor'
      },
      gamification: {
        level: 'Level',
        xp: 'Experience Points',
        dailyGoal: 'Daily Goal',
        streak: 'Study Streak',
        achievements: 'Achievements',
        rewards: 'Rewards',
        progress: 'Progress',
        levelUp: 'Level Up!',
        achievementUnlocked: 'Achievement Unlocked!'
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
        showPassages: 'Show Passages',
        reviewDue: 'Start Reviews',
        learnNew: 'Learn New Words'
      },
      stats: {
        correct: 'Correct',
        incorrect: 'Incorrect',
        streak: 'Streak',
        accuracy: 'Accuracy',
        time: 'Time',
        studied: 'Studied',
        reviews: 'Reviews',
        avgResponseTime: 'Avg. Response Time',
        retentionRate: 'Retention Rate'
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
      subtitle: 'Systema Docendi Intelligens cum Repetitione Spatiata (SRS) - 235K+ Characteres Latini Authentici',
      modes: {
        practice: 'Exercitium',
        quiz: 'Quaestiones',
        review: 'Repetitio',
        explore: 'Exploratio',
        analytics: 'Analytica'
      },
      srs: {
        dueForReview: 'Ad Repetitionem Debitum',
        learningPhase: 'Gradus Discendi',
        masteryLevel: 'Gradus Magisterii',
        retentionScore: 'Nota Retentionis',
        nextReview: 'Repetitio Sequens',
        interval: 'Intervallum',
        easinessFactor: 'Factor Facilitatis'
      },
      gamification: {
        level: 'Gradus',
        xp: 'Puncta Experientiae',
        dailyGoal: 'Propositum Diei',
        streak: 'Series Studiorum',
        achievements: 'Res Gestae',
        rewards: 'Praemia',
        progress: 'Progressus',
        levelUp: 'Gradus Adeptus!',
        achievementUnlocked: 'Res Gesta Liberata!'
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
        showPassages: 'Loca Monstrare',
        reviewDue: 'Repetitiones Incipere',
        learnNew: 'Nova Verba Discere'
      },
      stats: {
        correct: 'Recta',
        incorrect: 'Falsa',
        streak: 'Series',
        accuracy: 'Accuratio',
        time: 'Tempus',
        studied: 'Studita',
        reviews: 'Repetitiones',
        avgResponseTime: 'Tempus Resp. Med.',
        retentionRate: 'Ratio Retentionis'
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

  // 🧠 SRS Algorithm Implementation (SM-2)
  const calculateNextInterval = (performance: number, current: SRSData): number => {
    // SM-2 Algorithm for Spaced Repetition
    // Performance: 0-5 scale (0=blackout, 5=perfect)
    
    let newEasinessFactor = current.easiness_factor;
    let newInterval = current.last_interval;
    
    if (performance >= 3) {
      // Correct response
      if (current.repetition_count === 0) {
        newInterval = 1;
      } else if (current.repetition_count === 1) {
        newInterval = 6;
      } else {
        newInterval = Math.round(current.last_interval * current.easiness_factor);
      }
      
      // Update easiness factor based on performance
      newEasinessFactor = Math.max(1.3, 
        current.easiness_factor + (0.1 - (5 - performance) * (0.08 + (5 - performance) * 0.02))
      );
    } else {
      // Incorrect response - reset interval but don't change easiness factor drastically
      newInterval = 1;
      newEasinessFactor = Math.max(1.3, current.easiness_factor - 0.2);
    }
    
    return newInterval;
  };
  
  const updateSRSData = (wordId: string, performance: number): SRSData => {
    const current = srsData.get(wordId) || {
      word_id: wordId,
      repetition_count: 0,
      easiness_factor: 2.5,
      next_review_date: new Date(),
      last_interval: 0,
      total_reviews: 0,
      last_performance: performance,
      retention_score: 100,
      created_at: new Date(),
      mastery_level: 'learning' as const
    };
    
    const newInterval = calculateNextInterval(performance, current);
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);
    
    // Update retention score based on performance
    const newRetentionScore = Math.max(0, 
      (current.retention_score * current.total_reviews + (performance / 5) * 100) / (current.total_reviews + 1)
    );
    
    // Determine mastery level
    let masteryLevel: 'learning' | 'reviewing' | 'mastered' = 'learning';
    if (current.total_reviews >= 3 && newRetentionScore >= 85) {
      masteryLevel = current.repetition_count >= 5 ? 'mastered' : 'reviewing';
    }
    
    const newSRSData: SRSData = {
      ...current,
      repetition_count: performance >= 3 ? current.repetition_count + 1 : 0,
      easiness_factor: Math.max(1.3, 
        current.easiness_factor + (0.1 - (5 - performance) * (0.08 + (5 - performance) * 0.02))
      ),
      next_review_date: nextReviewDate,
      last_interval: newInterval,
      total_reviews: current.total_reviews + 1,
      last_performance: performance,
      retention_score: newRetentionScore,
      mastery_level: masteryLevel
    };
    
    return newSRSData;
  };
  
  // 🎮 Gamification Functions
  const calculateXPGain = (isCorrect: boolean, difficulty: number, responseTime: number): number => {
    let baseXP = isCorrect ? 10 : 2;
    
    // Difficulty multiplier
    const difficultyMultiplier = 1 + (difficulty / 10);
    
    // Speed bonus (if answered within 30 seconds)
    const speedBonus = responseTime < 30000 ? 1.5 : 1;
    
    // Streak bonus
    const streakMultiplier = 1 + (session.streak * 0.1);
    
    return Math.round(baseXP * difficultyMultiplier * speedBonus * streakMultiplier);
  };
  
  const calculateLevel = (totalXP: number): number => {
    // Level calculation: exponential growth
    return Math.floor(Math.sqrt(totalXP / 100)) + 1;
  };
  
  const getXPForNextLevel = (currentLevel: number): number => {
    return (currentLevel * currentLevel) * 100;
  };
  
  const checkAchievements = (updatedGoals: DailyGoals): Achievement[] => {
    const newUnlocks: Achievement[] = [];
    
    achievements.forEach(achievement => {
      if (!achievement.unlocked) {
        let shouldUnlock = false;
        
        switch (achievement.requirement.type) {
          case 'streak':
            shouldUnlock = updatedGoals.streak_current >= achievement.requirement.value;
            break;
          case 'words':
            shouldUnlock = updatedGoals.daily_words_completed >= achievement.requirement.value;
            break;
          case 'accuracy':
            const currentAccuracy = session.correct + session.incorrect > 0 
              ? (session.correct / (session.correct + session.incorrect)) * 100 
              : 0;
            shouldUnlock = currentAccuracy >= achievement.requirement.value;
            break;
          case 'time':
            shouldUnlock = (updatedGoals.daily_time_spent / 60) >= achievement.requirement.value;
            break;
          case 'level':
            shouldUnlock = updatedGoals.level >= achievement.requirement.value;
            break;
        }
        
        if (shouldUnlock) {
          const unlockedAchievement = {
            ...achievement,
            unlocked: true,
            unlock_date: new Date()
          };
          newUnlocks.push(unlockedAchievement);
        }
      }
    });
    
    return newUnlocks;
  };
  
  // Load data and initialize achievements
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
          
          // Load initial vocabulary pool
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

    // Initialize achievements
    const initAchievements = ACHIEVEMENT_TEMPLATES.map(template => ({
      ...template,
      unlocked: false
    }));
    setAchievements(initAchievements);
    
    // Load saved data from localStorage
    const savedGoals = localStorage.getItem('macrobius-daily-goals');
    const savedSRS = localStorage.getItem('macrobius-srs-data');
    
    if (savedGoals) {
      try {
        const goals = JSON.parse(savedGoals);
        // Check if it's a new day
        const today = new Date().toISOString().split('T')[0];
        if (goals.last_study_date !== today) {
          // Reset daily counters but preserve streaks and totals
          setDailyGoals({
            ...goals,
            daily_words_completed: 0,
            daily_time_spent: 0,
            goals_completed_today: 0,
            last_study_date: today
          });
        } else {
          setDailyGoals(goals);
        }
      } catch (e) {
        console.error('Failed to load saved goals:', e);
      }
    }
    
    if (savedSRS) {
      try {
        const srsMap = new Map(JSON.parse(savedSRS));
        setSrsData(srsMap);
        
        // Build review queue from SRS data
        const today = new Date();
        const dueWords: string[] = [];
        srsMap.forEach((data, wordId) => {
          if (new Date(data.next_review_date) <= today) {
            dueWords.push(wordId);
          }
        });
        setReviewQueue(dueWords);
      } catch (e) {
        console.error('Failed to load saved SRS data:', e);
      }
    }

    loadVocabularyData();
  }, []);
  
  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('macrobius-daily-goals', JSON.stringify(dailyGoals));
  }, [dailyGoals]);
  
  useEffect(() => {
    localStorage.setItem('macrobius-srs-data', JSON.stringify(Array.from(srsData.entries())));
  }, [srsData]);

  // Load vocabulary pool based on filters
  const loadVocabularyPool = useCallback(async () => {
    setLoading(true);
    try {
      const response = await MacrobiusAPI.vocabulary.getHighFrequencyWords(100);
      if (response.status === 'success' && response.data) {
        const filteredWords = response.data.vocabulary.filter(word => 
          word.difficulty_rating <= selectedDifficulty && 
          word.frequency >= selectedFrequency
        );
        setVocabularyPool(filteredWords);
        setNewWords(filteredWords.filter(word => !srsData.has(word.id.toString())));
        
        // Set initial word only if no current word exists
        if (filteredWords.length > 0 && !currentWord) {
          setCurrentWord(getOptimalNextWord(filteredWords));
        }
      }
    } catch (err) {
      console.error('Failed to load vocabulary pool:', err);
      setError('Failed to load vocabulary');
    }
    setLoading(false);
  }, [selectedDifficulty, selectedFrequency, currentWord, srsData]);

  // Smart word selection based on SRS
  const getOptimalNextWord = (pool: MacrobiusVocabulary[]): MacrobiusVocabulary | null => {
    if (pool.length === 0) return null;
    
    // Prioritize review words that are due
    const today = new Date();
    const dueReviews = pool.filter(word => {
      const srsInfo = srsData.get(word.id.toString());
      return srsInfo && new Date(srsInfo.next_review_date) <= today;
    });
    
    if (dueReviews.length > 0) {
      // Select overdue word with highest priority
      return dueReviews.sort((a, b) => {
        const srsA = srsData.get(a.id.toString())!;
        const srsB = srsData.get(b.id.toString())!;
        const overdueDaysA = Math.floor((today.getTime() - new Date(srsA.next_review_date).getTime()) / (1000 * 60 * 60 * 24));
        const overdueDaysB = Math.floor((today.getTime() - new Date(srsB.next_review_date).getTime()) / (1000 * 60 * 60 * 24));
        return overdueDaysB - overdueDaysA; // Most overdue first
      })[0];
    }
    
    // Select new words to learn
    const newWordsAvailable = pool.filter(word => !srsData.has(word.id.toString()));
    if (newWordsAvailable.length > 0) {
      // Prefer words with moderate difficulty for progressive learning
      return newWordsAvailable.sort((a, b) => {
        const diffA = Math.abs(a.difficulty_rating - 5); // Distance from medium difficulty
        const diffB = Math.abs(b.difficulty_rating - 5);
        return diffA - diffB;
      })[0];
    }
    
    // Fallback to random selection
    return pool[Math.floor(Math.random() * pool.length)];
  };

  // Enhanced answer checking with SRS update
  const checkAnswer = () => {
    if (!currentWord) return;
    
    const responseTime = Date.now() - answerStartTime;
    
    // Create multiple acceptable answers
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
    
    // Convert boolean to SM-2 performance scale (0-5)
    // For now, simple mapping: correct = 5, incorrect = 2
    // TODO: Add more nuanced performance assessment
    const performance = isCorrect ? 5 : 2;
    
    // Update SRS data
    const updatedSRS = updateSRSData(currentWord.id.toString(), performance);
    setSrsData(prev => new Map(prev).set(currentWord.id.toString(), updatedSRS));
    
    // Calculate XP gain
    const xpGain = calculateXPGain(isCorrect, currentWord.difficulty_rating, responseTime);
    
    // Update session
    setSession(prev => {
      const newSession = {
        ...prev,
        correct: isCorrect ? prev.correct + 1 : prev.correct,
        incorrect: isCorrect ? prev.incorrect : prev.incorrect + 1,
        streak: isCorrect ? prev.streak + 1 : 0,
        wordsStudied: new Set([...Array.from(prev.wordsStudied), currentWord.id.toString()]),
        totalReviews: prev.totalReviews + 1,
        averageResponseTime: (prev.averageResponseTime * prev.totalReviews + responseTime) / (prev.totalReviews + 1),
        difficultyProgression: prev.difficultyProgression + (isCorrect ? currentWord.difficulty_rating : 0),
        srs_updates: [...prev.srs_updates, updatedSRS],
        experience_gained: prev.experience_gained + xpGain
      };
      return newSession;
    });
    
    // Update daily goals
    setDailyGoals(prev => {
      const newLevel = calculateLevel(prev.experience_points + xpGain);
      const leveledUp = newLevel > prev.level;
      
      if (leveledUp) {
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
      }
      
      const updatedGoals = {
        ...prev,
        daily_words_completed: prev.daily_words_completed + 1,
        daily_time_spent: prev.daily_time_spent + Math.floor(responseTime / 1000),
        streak_current: isCorrect ? prev.streak_current : prev.streak_current, // Streak updated separately
        experience_points: prev.experience_points + xpGain,
        level: newLevel
      };
      
      // Check for achievement unlocks
      const newAchievements = checkAchievements(updatedGoals);
      if (newAchievements.length > 0) {
        setAchievements(prevAchievements => 
          prevAchievements.map(achievement => {
            const unlock = newAchievements.find(unlock => unlock.id === achievement.id);
            return unlock || achievement;
          })
        );
        // Show first achievement unlock
        setShowAchievementUnlock(newAchievements[0]);
        setTimeout(() => setShowAchievementUnlock(null), 4000);
      }
      
      return updatedGoals;
    });
    
    // Add to review if incorrect
    if (!isCorrect) {
      setReviewWords(prev => [...prev, currentWord.id.toString()]);
    }
    
    setShowAnswer(true);
    loadWordPassages(currentWord);
  };

  // Load passages for current word
  const loadWordPassages = async (word: MacrobiusVocabulary) => {
    if (word.passages_found.length === 0) return;
    
    try {
      const passagePromises = word.passages_found.slice(0, 3).map(passageId => 
        MacrobiusAPI.passages.getPassage(passageId)
      );
      
      const responses = await Promise.all(passagePromises);
      const passages = responses
        .filter(r => r.status === 'success' && r.data)
        .map(r => r.data!.passage);
      
      setRelatedPassages(passages);
    } catch (err) {
      console.error('Failed to load passages:', err);
    }
  };

  // Start new session
  const startNewSession = () => {
    setSession({
      correct: 0,
      incorrect: 0,
      streak: 0,
      startTime: Date.now(),
      wordsStudied: new Set(),
      totalReviews: 0,
      averageResponseTime: 0,
      difficultyProgression: 0,
      srs_updates: [],
      experience_gained: 0
    });
    setCurrentWord(getOptimalNextWord(vocabularyPool));
    setUserAnswer('');
    setShowAnswer(false);
    setAnswerStartTime(Date.now());
    setError(null);
  };

  // Next word with SRS consideration
  const nextWord = () => {
    setCurrentWord(getOptimalNextWord(vocabularyPool));
    setUserAnswer('');
    setShowAnswer(false);
    setRelatedPassages([]);
    setExpandedInfo(false);
    setAnswerStartTime(Date.now());
  };

  // Search vocabulary by query
  const searchVocabulary = useCallback(async (query: string) => {
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
  }, [selectedDifficulty, selectedFrequency, loadVocabularyPool]);

  // Calculate statistics
  const accuracy = session.correct + session.incorrect > 0 
    ? Math.round((session.correct / (session.correct + session.incorrect)) * 100) 
    : 0;

  const sessionTime = Math.floor((Date.now() - session.startTime) / 1000);
  const averageResponseTime = session.averageResponseTime > 0 
    ? Math.round(session.averageResponseTime / 1000) 
    : 0;
    
  const currentWordSRS = currentWord ? srsData.get(currentWord.id.toString()) : null;
  const nextLevelXP = getXPForNextLevel(dailyGoals.level);
  const xpProgress = ((dailyGoals.experience_points % 100) / 100) * 100;
  
  // Filter vocabulary pool on parameter change
  useEffect(() => {
    if (backendStatus === 'connected') {
      loadVocabularyPool();
    }
  }, [backendStatus, selectedDifficulty, selectedFrequency, loadVocabularyPool]);

  // Search on query change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (backendStatus === 'connected') {
        searchVocabulary(searchQuery);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [backendStatus, searchQuery, searchVocabulary]);

  // Set answer start time when word changes
  useEffect(() => {
    if (currentWord && !showAnswer) {
      setAnswerStartTime(Date.now());
    }
  }, [currentWord, showAnswer]);

  // Utility functions
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
  
  const getMasteryLevelColor = (level: string) => {
    switch (level) {
      case 'learning': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'reviewing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'mastered': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
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
                {currentWordSRS && (
                  <Badge className={getMasteryLevelColor(currentWordSRS.mastery_level)}>
                    {t.srs.masteryLevel}: {currentWordSRS.mastery_level}
                  </Badge>
                )}
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
              {currentWordSRS && (
                <>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>{Math.round(currentWordSRS.retention_score)}% retention</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Reviews: {currentWordSRS.total_reviews}</span>
                  </div>
                </>
              )}
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
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                      <span className="font-semibold">
                        Word Analysis Complete
                      </span>
                      {currentWordSRS && (
                        <Badge className="ml-auto">
                          Next Review: {new Date(currentWordSRS.next_review_date).toLocaleDateString()}
                        </Badge>
                      )}
                    </div>
                    
                    {/* SRS Information */}
                    {currentWordSRS && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                        <div className="bg-blue-50 p-2 rounded">
                          <div className="font-medium">{t.srs.retentionScore}:</div>
                          <div>{Math.round(currentWordSRS.retention_score)}%</div>
                        </div>
                        <div className="bg-purple-50 p-2 rounded">
                          <div className="font-medium">{t.srs.interval}:</div>
                          <div>{currentWordSRS.last_interval} days</div>
                        </div>
                        <div className="bg-green-50 p-2 rounded">
                          <div className="font-medium">{t.srs.easinessFactor}:</div>
                          <div>{currentWordSRS.easiness_factor.toFixed(1)}</div>
                        </div>
                        <div className="bg-yellow-50 p-2 rounded">
                          <div className="font-medium">Total Reviews:</div>
                          <div>{currentWordSRS.total_reviews}</div>
                        </div>
                      </div>
                    )}
                    
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
  
  const renderAnalyticsMode = () => (
    <div className="space-y-6">
      {/* Learning Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Trophy className="w-5 h-5 mr-2" />
              {t.gamification.level} {dailyGoals.level}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>XP Progress</span>
                  <span>{dailyGoals.experience_points % 100}/100</span>
                </div>
                <Progress value={xpProgress} className="h-2" />
              </div>
              <div className="text-2xl font-bold text-green-600">
                {dailyGoals.experience_points.toLocaleString()} XP
              </div>
              <div className="text-sm text-green-600">
                {dailyGoals.experience_points - (dailyGoals.level - 1) * 100} XP this level
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800">
              <Flame className="w-5 h-5 mr-2" />
              {t.gamification.streak}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600">
                {dailyGoals.streak_current}
              </div>
              <div className="text-sm text-orange-600">
                Best: {dailyGoals.streak_best} days
              </div>
              <div className="text-xs text-orange-500">
                Keep going! Next milestone: {dailyGoals.streak_current < 7 ? '7 days' : '14 days'}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <Star className="w-5 h-5 mr-2" />
              {t.gamification.achievements}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">
                {achievements.filter(a => a.unlocked).length}/{achievements.length}
              </div>
              <div className="text-sm text-purple-600">
                Unlocked achievements
              </div>
              <div className="flex space-x-1">
                {achievements.slice(0, 4).map((achievement, idx) => (
                  <div
                    key={idx}
                    className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                      achievement.unlocked ? 'bg-purple-200' : 'bg-gray-200'
                    }`}
                  >
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* SRS Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>🧠 Spaced Repetition Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{srsData.size}</div>
              <div className="text-sm text-gray-600">Words in SRS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Array.from(srsData.values()).filter(d => d.mastery_level === 'mastered').length}
              </div>
              <div className="text-sm text-gray-600">Mastered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {Array.from(srsData.values()).filter(d => d.mastery_level === 'reviewing').length}
              </div>
              <div className="text-sm text-gray-600">Reviewing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{reviewQueue.length}</div>
              <div className="text-sm text-gray-600">Due for Review</div>
            </div>
          </div>
          
          {srsData.size > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-3">Average Retention Rate</h4>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(
                  Array.from(srsData.values()).reduce((sum, data) => sum + data.retention_score, 0) / srsData.size
                )}%
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Daily Goals Progress */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Daily Goals Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Words Studied ({t.gamification.dailyGoal}: {dailyGoals.words_target})</span>
                <span>{dailyGoals.daily_words_completed}/{dailyGoals.words_target}</span>
              </div>
              <Progress value={(dailyGoals.daily_words_completed / dailyGoals.words_target) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Study Time ({t.gamification.dailyGoal}: {dailyGoals.time_target}min)</span>
                <span>{Math.round(dailyGoals.daily_time_spent / 60)}/{dailyGoals.time_target}min</span>
              </div>
              <Progress value={(dailyGoals.daily_time_spent / 60 / dailyGoals.time_target) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Accuracy Target: {dailyGoals.accuracy_target}%</span>
                <span>{accuracy}%</span>
              </div>
              <Progress value={(accuracy / dailyGoals.accuracy_target) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Achievement Gallery */}
      <Card>
        <CardHeader>
          <CardTitle>🏆 Achievement Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border text-center ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-gold/20 to-yellow-100 border-gold/30' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="text-2xl mb-2">
                  {achievement.unlocked ? achievement.icon : '🔒'}
                </div>
                <div className={`font-medium text-sm ${
                  achievement.unlocked ? 'text-gold' : 'text-gray-500'
                }`}>
                  {achievement.name}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {achievement.description}
                </div>
                {achievement.unlocked && achievement.unlock_date && (
                  <div className="text-xs text-green-600 mt-1">
                    Unlocked: {achievement.unlock_date.toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
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
        
        {/* Gamification Notifications */}
        <AnimatePresence>
          {showLevelUp && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
            >
              <Card className="bg-gradient-to-r from-gold to-yellow-400 border-gold shadow-2xl">
                <CardContent className="p-6 text-center">
                  <Crown className="w-12 h-12 text-white mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-white mb-1">{t.gamification.levelUp}</h3>
                  <p className="text-white/90">Level {dailyGoals.level} Achieved!</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
          {showAchievementUnlock && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed top-20 right-4 z-50"
            >
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 border-purple-400 shadow-2xl">
                <CardContent className="p-4 text-center">
                  <Sparkles className="w-8 h-8 text-white mx-auto mb-2" />
                  <h4 className="font-bold text-white mb-1">{t.gamification.achievementUnlocked}</h4>
                  <div className="text-2xl mb-1">{showAchievementUnlock.icon}</div>
                  <p className="text-white text-sm">{showAchievementUnlock.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Controls */}
        <div className="max-w-4xl mx-auto mb-8">
          {/* Quick Actions */}
          <div className="flex justify-center space-x-4 mb-6">
            <Button 
              onClick={() => {
                setCurrentMode('practice');
                setCurrentWord(getOptimalNextWord(vocabularyPool));
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={backendStatus !== 'connected'}
            >
              <Brain className="w-4 h-4 mr-2" />
              Smart Practice
            </Button>
            
            {reviewQueue.length > 0 && (
              <Button 
                onClick={() => {
                  setCurrentMode('practice');
                  // Set word from review queue
                  const reviewWord = vocabularyPool.find(w => reviewQueue.includes(w.id.toString()));
                  if (reviewWord) setCurrentWord(reviewWord);
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {t.actions.reviewDue} ({reviewQueue.length})
              </Button>
            )}
            
            {newWords.length > 0 && (
              <Button 
                onClick={() => {
                  setCurrentMode('practice');
                  setCurrentWord(newWords[0]);
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {t.actions.learnNew} ({newWords.length})
              </Button>
            )}
          </div>
          
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

          {/* Enhanced Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-8 gap-3 mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-3 text-center">
                <CheckCircle className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <p className="text-xl font-bold text-green-400">{session.correct}</p>
                <p className="text-xs text-white/70">{t.stats.correct}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-3 text-center">
                <XCircle className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <p className="text-xl font-bold text-red-400">{session.incorrect}</p>
                <p className="text-xs text-white/70">{t.stats.incorrect}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-3 text-center">
                <Zap className="w-5 h-5 text-gold mx-auto mb-1" />
                <p className="text-xl font-bold text-gold">{session.streak}</p>
                <p className="text-xs text-white/70">{t.stats.streak}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-3 text-center">
                <Trophy className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <p className="text-xl font-bold text-blue-400">{accuracy}%</p>
                <p className="text-xs text-white/70">{t.stats.accuracy}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-3 text-center">
                <Timer className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                <p className="text-xl font-bold text-purple-400">{sessionTime}s</p>
                <p className="text-xs text-white/70">{t.stats.time}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-3 text-center">
                <Users className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                <p className="text-xl font-bold text-orange-400">{session.wordsStudied.size}</p>
                <p className="text-xs text-white/70">{t.stats.studied}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-3 text-center">
                <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                <p className="text-xl font-bold text-yellow-400">{dailyGoals.level}</p>
                <p className="text-xs text-white/70">{t.gamification.level}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-3 text-center">
                <Flame className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <p className="text-xl font-bold text-red-400">{dailyGoals.streak_current}</p>
                <p className="text-xs text-white/70">{t.gamification.streak}</p>
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
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/10 backdrop-blur-sm">
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
              <TabsTrigger value="analytics" className="text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                {t.modes.analytics}
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
            
            <TabsContent value="analytics">
              {renderAnalyticsMode()}
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
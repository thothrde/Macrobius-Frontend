'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
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
  Calendar,
  Flame,
  BarChart3,
  Settings,
  Gift,
  Clock
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
}

// 🎯 **TIER 2 SRS INTERFACES - IMPLEMENTED**
interface SRSData {
  word_id: string;
  repetition_count: number;
  easiness_factor: number; // 2.5 default
  next_review_date: Date;
  last_interval: number;
  last_review_date: Date;
  review_history: Array<{
    date: Date;
    performance: number; // 0-5 scale
    response_time: number;
  }>;
}

interface DailyGoals {
  words_target: number;
  time_target: number; // minutes
  streak_current: number;
  streak_best: number;
  rewards_unlocked: string[];
  daily_progress: {
    words_reviewed: number;
    time_spent: number; // seconds
    accuracy_today: number;
    goals_completed: number;
  };
}

interface LearningSession {
  correct: number;
  incorrect: number;
  streak: number;
  startTime: number;
  wordsStudied: Set<string>;
  srs_reviews: number;
  average_response_time: number;
  performance_trend: number[]; // Last 10 performances
  experience_points: number;
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

// 🎖️ **REWARD MILESTONES - IMPLEMENTED**
const REWARD_MILESTONES = {
  3: { icon: '🔥', title: 'Fire Starter', description: '3-day streak!' },
  7: { icon: '📚', title: 'Scholar', description: '1 week of dedication!' },
  14: { icon: '🏛️', title: 'Classicist', description: '2 weeks of learning!' },
  30: { icon: '⭐', title: 'Latin Master', description: '30 days of excellence!' },
  50: { icon: '👑', title: 'Vocabulary King', description: '50-day streak!' },
  100: { icon: '🏆', title: 'Century Champion', description: '100 days strong!' },
  365: { icon: '💎', title: 'Annual Achiever', description: 'One full year!' }
};

const EXPERIENCE_REWARDS = {
  100: { icon: '🌟', title: 'Rising Scholar', points: 100 },
  500: { icon: '📖', title: 'Dedicated Learner', points: 500 },
  1000: { icon: '🎓', title: 'Latin Graduate', points: 1000 },
  2500: { icon: '🏛️', title: 'Classical Expert', points: 2500 },
  5000: { icon: '👨‍🏫', title: 'Latin Professor', points: 5000 }
};

const VocabularyTrainerSection: React.FC<VocabularyTrainerSectionProps> = ({ language }) => {
  // Enhanced State Management with SRS
  const [currentMode, setCurrentMode] = useState<'practice' | 'quiz' | 'review' | 'srs' | 'goals'>('practice');
  const [currentWord, setCurrentWord] = useState<MacrobiusVocabulary | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [answerStartTime, setAnswerStartTime] = useState<number>(Date.now());
  const [session, setSession] = useState<LearningSession>({
    correct: 0,
    incorrect: 0,
    streak: 0,
    startTime: Date.now(),
    wordsStudied: new Set(),
    srs_reviews: 0,
    average_response_time: 0,
    performance_trend: [],
    experience_points: 0
  });
  
  // 🎯 **SRS STATE MANAGEMENT**
  const [srsData, setSrsData] = useState<Record<string, SRSData>>({});
  const [dailyGoals, setDailyGoals] = useState<DailyGoals>({
    words_target: 20,
    time_target: 15, // minutes
    streak_current: 0,
    streak_best: 0,
    rewards_unlocked: [],
    daily_progress: {
      words_reviewed: 0,
      time_spent: 0,
      accuracy_today: 0,
      goals_completed: 0
    }
  });
  const [reviewQueue, setReviewQueue] = useState<string[]>([]);
  const [newWordsToday, setNewWordsToday] = useState<number>(0);
  const [showRewardModal, setShowRewardModal] = useState<{show: boolean, reward?: any}>({show: false});
  
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

  // Enhanced Translations
  const translations = {
    de: {
      title: 'Macrobius Vokabeltrainer SRS',
      subtitle: 'Intelligentes Spaced-Repetition-System mit 1,401 authentischen Passagen',
      modes: {
        practice: 'Üben',
        quiz: 'Quiz',
        review: 'Wiederholen',
        srs: 'SRS Training',
        goals: 'Tagesziele'
      },
      srs: {
        title: 'Spaced Repetition System',
        subtitle: 'Optimierte Wiederholung für langfristiges Lernen',
        reviewDue: 'Zur Wiederholung',
        newWords: 'Neue Wörter',
        interval: 'Intervall',
        nextReview: 'Nächste Wiederholung',
        easiness: 'Leichtigkeit',
        performance: 'Leistung'
      },
      goals: {
        title: 'Tägliche Lernziele',
        subtitle: 'Verfolge deinen Fortschritt und erreiche Meilensteine',
        wordsTarget: 'Wörter-Ziel',
        timeTarget: 'Zeit-Ziel',
        currentStreak: 'Aktuelle Serie',
        bestStreak: 'Beste Serie',
        todayProgress: 'Heutiger Fortschritt',
        experiencePoints: 'Erfahrungspunkte',
        rewards: 'Belohnungen',
        achievements: 'Erfolge'
      },
      performance: {
        again: 'Nochmal (0)',
        hard: 'Schwer (1)',
        good: 'Gut (2)',
        easy: 'Einfach (3)',
        perfect: 'Perfekt (4)'
      },
      actions: {
        startSRS: 'SRS Training starten',
        checkGoals: 'Ziele prüfen',
        claimReward: 'Belohnung abholen',
        setGoals: 'Ziele setzen'
      }
    },
    en: {
      title: 'Macrobius Vocabulary Trainer SRS',
      subtitle: 'Intelligent Spaced Repetition System with 1,401 Authentic Passages',
      modes: {
        practice: 'Practice',
        quiz: 'Quiz',
        review: 'Review',
        srs: 'SRS Training',
        goals: 'Daily Goals'
      },
      srs: {
        title: 'Spaced Repetition System',
        subtitle: 'Optimized review for long-term retention',
        reviewDue: 'Due for Review',
        newWords: 'New Words',
        interval: 'Interval',
        nextReview: 'Next Review',
        easiness: 'Easiness',
        performance: 'Performance'
      },
      goals: {
        title: 'Daily Learning Goals',
        subtitle: 'Track your progress and achieve milestones',
        wordsTarget: 'Words Target',
        timeTarget: 'Time Target',
        currentStreak: 'Current Streak',
        bestStreak: 'Best Streak',
        todayProgress: 'Today\'s Progress',
        experiencePoints: 'Experience Points',
        rewards: 'Rewards',
        achievements: 'Achievements'
      },
      performance: {
        again: 'Again (0)',
        hard: 'Hard (1)',
        good: 'Good (2)',
        easy: 'Easy (3)',
        perfect: 'Perfect (4)'
      },
      actions: {
        startSRS: 'Start SRS Training',
        checkGoals: 'Check Goals',
        claimReward: 'Claim Reward',
        setGoals: 'Set Goals'
      }
    },
    la: {
      title: 'Exercitator Vocabulorum Macrobii SRS',
      subtitle: 'Systema Repetitionis Spatiatum cum 1,401 Passibus Authenticis',
      modes: {
        practice: 'Exercitium',
        quiz: 'Quaestiones',
        review: 'Repetitio',
        srs: 'Exercitium SRS',
        goals: 'Proposita Diurna'
      },
      srs: {
        title: 'Systema Repetitionis Spatiatum',
        subtitle: 'Repetitio optimizata ad memoriam diuturnam',
        reviewDue: 'Repetendrum',
        newWords: 'Verba Nova',
        interval: 'Intervallum',
        nextReview: 'Repetitio Sequens',
        easiness: 'Facilitas',
        performance: 'Effectus'
      },
      goals: {
        title: 'Proposita Diurna Discendi',
        subtitle: 'Progressum sequere et terminos assequere',
        wordsTarget: 'Verborum Proposita',
        timeTarget: 'Temporis Proposita',
        currentStreak: 'Series Actualis',
        bestStreak: 'Series Optima',
        todayProgress: 'Progressus Hodiernus',
        experiencePoints: 'Puncta Experientiae',
        rewards: 'Praemia',
        achievements: 'Res Gestae'
      },
      performance: {
        again: 'Iterum (0)',
        hard: 'Difficile (1)',
        good: 'Bene (2)',
        easy: 'Facile (3)',
        perfect: 'Perfecte (4)'
      },
      actions: {
        startSRS: 'Exercitium SRS Incipere',
        checkGoals: 'Proposita Inspicere',
        claimReward: 'Praemium Capere',
        setGoals: 'Proposita Statuere'
      }
    }
  };

  const t = translations[language.code as keyof typeof translations] || translations.en;

  // 🧠 **SM-2 SPACED REPETITION ALGORITHM - IMPLEMENTED**
  const calculateNextInterval = useCallback((performance: number, current: SRSData) => {
    let newEasiness = current.easiness_factor;
    let newInterval = current.last_interval;
    let newRepetition = current.repetition_count;

    // SM-2 Algorithm Implementation
    if (performance >= 3) {
      // Correct response
      if (newRepetition === 0) {
        newInterval = 1;
      } else if (newRepetition === 1) {
        newInterval = 6;
      } else {
        newInterval = Math.round(current.last_interval * current.easiness_factor);
      }
      newRepetition += 1;
    } else {
      // Incorrect response - reset repetition
      newRepetition = 0;
      newInterval = 1;
    }

    // Update easiness factor
    newEasiness = current.easiness_factor + (0.1 - (5 - performance) * (0.08 + (5 - performance) * 0.02));
    if (newEasiness < 1.3) newEasiness = 1.3;

    return {
      interval: newInterval,
      easiness: newEasiness,
      repetition: newRepetition
    };
  }, []);

  // 🎯 **UPDATE SRS DATA AFTER REVIEW**
  const updateSRSData = useCallback((wordId: string, performance: number, responseTime: number) => {
    setSrsData(prev => {
      const current = prev[wordId] || {
        word_id: wordId,
        repetition_count: 0,
        easiness_factor: 2.5,
        next_review_date: new Date(),
        last_interval: 0,
        last_review_date: new Date(),
        review_history: []
      };

      const result = calculateNextInterval(performance, current);
      const nextReviewDate = new Date();
      nextReviewDate.setDate(nextReviewDate.getDate() + result.interval);

      const updated: SRSData = {
        ...current,
        repetition_count: result.repetition,
        easiness_factor: result.easiness,
        last_interval: result.interval,
        next_review_date: nextReviewDate,
        last_review_date: new Date(),
        review_history: [
          ...current.review_history,
          {
            date: new Date(),
            performance,
            response_time: responseTime
          }
        ].slice(-10) // Keep last 10 reviews
      };

      return {
        ...prev,
        [wordId]: updated
      };
    });
  }, [calculateNextInterval]);

  // 🏆 **DAILY GOALS AND REWARDS SYSTEM**
  const updateDailyProgress = useCallback((wordsReviewed: number, timeSpent: number, isCorrect: boolean) => {
    setDailyGoals(prev => {
      const newWordsReviewed = prev.daily_progress.words_reviewed + wordsReviewed;
      const newTimeSpent = prev.daily_progress.time_spent + timeSpent;
      const totalAnswers = session.correct + session.incorrect + 1;
      const newAccuracy = isCorrect 
        ? Math.round(((session.correct + 1) / totalAnswers) * 100)
        : Math.round((session.correct / totalAnswers) * 100);
      
      let goalsCompleted = prev.daily_progress.goals_completed;
      
      // Check if goals are met
      if (newWordsReviewed >= prev.words_target && newTimeSpent >= prev.time_target * 60) {
        goalsCompleted = Math.max(goalsCompleted, 1);
      }
      
      return {
        ...prev,
        daily_progress: {
          words_reviewed: newWordsReviewed,
          time_spent: newTimeSpent,
          accuracy_today: newAccuracy,
          goals_completed: goalsCompleted
        }
      };
    });
  }, [session.correct, session.incorrect]);

  // 🔥 **STREAK AND REWARDS MANAGEMENT**
  const checkForRewards = useCallback((currentStreak: number, experiencePoints: number) => {
    // Check streak rewards
    if (REWARD_MILESTONES[currentStreak as keyof typeof REWARD_MILESTONES]) {
      const reward = REWARD_MILESTONES[currentStreak as keyof typeof REWARD_MILESTONES];
      setDailyGoals(prev => {
        if (!prev.rewards_unlocked.includes(`streak_${currentStreak}`)) {
          setShowRewardModal({
            show: true,
            reward: { ...reward, type: 'streak', value: currentStreak }
          });
          return {
            ...prev,
            rewards_unlocked: [...prev.rewards_unlocked, `streak_${currentStreak}`]
          };
        }
        return prev;
      });
    }

    // Check experience point rewards
    const xpMilestone = Object.keys(EXPERIENCE_REWARDS)
      .map(Number)
      .find(milestone => experiencePoints >= milestone && experiencePoints < milestone + 50);
    
    if (xpMilestone) {
      const reward = EXPERIENCE_REWARDS[xpMilestone as keyof typeof EXPERIENCE_REWARDS];
      setDailyGoals(prev => {
        if (!prev.rewards_unlocked.includes(`xp_${xpMilestone}`)) {
          setShowRewardModal({
            show: true,
            reward: { ...reward, type: 'experience', value: xpMilestone }
          });
          return {
            ...prev,
            rewards_unlocked: [...prev.rewards_unlocked, `xp_${xpMilestone}`]
          };
        }
        return prev;
      });
    }
  }, []);

  // 📊 **GET WORDS DUE FOR REVIEW**
  const getReviewDueWords = useCallback(() => {
    const now = new Date();
    return Object.values(srsData)
      .filter(data => data.next_review_date <= now)
      .map(data => data.word_id);
  }, [srsData]);

  // 🎯 **PERFORMANCE RATING SYSTEM**
  const handlePerformanceRating = (rating: number) => {
    if (!currentWord) return;
    
    const responseTime = Date.now() - answerStartTime;
    const wordId = currentWord.id.toString();
    
    // Update SRS data
    updateSRSData(wordId, rating, responseTime);
    
    // Update session stats
    setSession(prev => {
      const isCorrect = rating >= 3;
      const newCorrect = isCorrect ? prev.correct + 1 : prev.correct;
      const newIncorrect = isCorrect ? prev.incorrect : prev.incorrect + 1;
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const totalTime = prev.performance_trend.length > 0 
        ? (prev.average_response_time * prev.performance_trend.length + responseTime) / (prev.performance_trend.length + 1)
        : responseTime;
      
      const experienceGained = rating * 10 + (newStreak >= 5 ? 25 : 0);
      const newXP = prev.experience_points + experienceGained;
      
      // Check for rewards
      checkForRewards(newStreak, newXP);
      
      return {
        ...prev,
        correct: newCorrect,
        incorrect: newIncorrect,
        streak: newStreak,
        srs_reviews: prev.srs_reviews + 1,
        average_response_time: totalTime,
        performance_trend: [...prev.performance_trend, rating].slice(-10),
        experience_points: newXP,
        wordsStudied: new Set([...Array.from(prev.wordsStudied), wordId])
      };
    });
    
    // Update daily progress
    updateDailyProgress(1, responseTime / 1000, rating >= 3);
    
    // Move to next word
    setTimeout(() => {
      nextWord();
    }, 1500);
  };

  // Initialize data on component mount
  useEffect(() => {
    const loadVocabularyData = async () => {
      setLoading(true);
      try {
        const healthResponse = await MacrobiusAPI.system.healthCheck();
        if (healthResponse.status === 'success') {
          setBackendStatus('connected');
          
          const statsResponse = await MacrobiusAPI.vocabulary.getVocabularyStatistics();
          if (statsResponse.status === 'success' && statsResponse.data) {
            setVocabularyStats(statsResponse.data);
          }
          
          await loadVocabularyPool();
          loadDailyGoalsFromStorage();
          loadSRSDataFromStorage();
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

  // Load data from localStorage (persistent)
  const loadDailyGoalsFromStorage = () => {
    try {
      const stored = localStorage.getItem('macrobius_daily_goals');
      if (stored) {
        const parsed = JSON.parse(stored);
        const today = new Date().toDateString();
        
        // Reset daily progress if it's a new day
        if (parsed.lastUpdate !== today) {
          setDailyGoals(prev => ({
            ...prev,
            daily_progress: {
              words_reviewed: 0,
              time_spent: 0,
              accuracy_today: 0,
              goals_completed: 0
            }
          }));
        } else {
          setDailyGoals(parsed.goals);
        }
      }
    } catch (err) {
      console.error('Failed to load daily goals:', err);
    }
  };

  const loadSRSDataFromStorage = () => {
    try {
      const stored = localStorage.getItem('macrobius_srs_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const converted: Record<string, SRSData> = {};
        Object.entries(parsed).forEach(([key, value]: [string, any]) => {
          converted[key] = {
            ...value,
            next_review_date: new Date(value.next_review_date),
            last_review_date: new Date(value.last_review_date),
            review_history: value.review_history.map((h: any) => ({
              ...h,
              date: new Date(h.date)
            }))
          };
        });
        setSrsData(converted);
      }
    } catch (err) {
      console.error('Failed to load SRS data:', err);
    }
  };

  // Save data to localStorage
  useEffect(() => {
    try {
      const today = new Date().toDateString();
      localStorage.setItem('macrobius_daily_goals', JSON.stringify({
        goals: dailyGoals,
        lastUpdate: today
      }));
    } catch (err) {
      console.error('Failed to save daily goals:', err);
    }
  }, [dailyGoals]);

  useEffect(() => {
    try {
      localStorage.setItem('macrobius_srs_data', JSON.stringify(srsData));
    } catch (err) {
      console.error('Failed to save SRS data:', err);
    }
  }, [srsData]);

  // Update review queue when SRS data changes
  useEffect(() => {
    const dueWords = getReviewDueWords();
    setReviewQueue(dueWords);
  }, [srsData, getReviewDueWords]);

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
        
        if (filteredWords.length > 0 && !currentWord) {
          setCurrentWord(filteredWords[Math.floor(Math.random() * filteredWords.length)]);
          setAnswerStartTime(Date.now());
        }
      }
    } catch (err) {
      console.error('Failed to load vocabulary pool:', err);
      setError('Failed to load vocabulary');
    }
    setLoading(false);
  }, [selectedDifficulty, selectedFrequency, currentWord]);

  const nextWord = () => {
    let nextWord: MacrobiusVocabulary | null = null;
    
    if (currentMode === 'srs' && reviewQueue.length > 0) {
      // Prioritize SRS review words
      const reviewWordId = reviewQueue[0];
      nextWord = vocabularyPool.find(word => word.id.toString() === reviewWordId) || null;
      setReviewQueue(prev => prev.slice(1));
    } else {
      // Get random word from pool
      const availableWords = vocabularyPool.filter(word => 
        !session.wordsStudied.has(word.id.toString()) || session.wordsStudied.size >= vocabularyPool.length
      );
      const pool = availableWords.length > 0 ? availableWords : vocabularyPool;
      if (pool.length > 0) {
        nextWord = pool[Math.floor(Math.random() * pool.length)];
      }
    }
    
    setCurrentWord(nextWord);
    setUserAnswer('');
    setShowAnswer(false);
    setRelatedPassages([]);
    setExpandedInfo(false);
    setAnswerStartTime(Date.now());
  };

  const startNewSession = () => {
    setSession({
      correct: 0,
      incorrect: 0,
      streak: 0,
      startTime: Date.now(),
      wordsStudied: new Set(),
      srs_reviews: 0,
      average_response_time: 0,
      performance_trend: [],
      experience_points: 0
    });
    nextWord();
    setError(null);
  };

  // Calculate progress percentages
  const wordsProgress = Math.min((dailyGoals.daily_progress.words_reviewed / dailyGoals.words_target) * 100, 100);
  const timeProgress = Math.min((dailyGoals.daily_progress.time_spent / (dailyGoals.time_target * 60)) * 100, 100);
  const reviewDueCount = reviewQueue.length;
  const avgResponseTime = Math.round(session.average_response_time / 1000);

  // 🎊 **SRS MODE RENDERING**
  const renderSRSMode = () => (
    <div className="space-y-6">
      {/* SRS Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2" />
            <p className="text-2xl font-bold">{reviewDueCount}</p>
            <p className="text-xs opacity-90">{t.srs.reviewDue}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-6 h-6 mx-auto mb-2" />
            <p className="text-2xl font-bold">{newWordsToday}</p>
            <p className="text-xs opacity-90">{t.srs.newWords}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 text-center">
            <Timer className="w-6 h-6 mx-auto mb-2" />
            <p className="text-2xl font-bold">{avgResponseTime}s</p>
            <p className="text-xs opacity-90">Avg Response</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4 text-center">
            <Star className="w-6 h-6 mx-auto mb-2" />
            <p className="text-2xl font-bold">{session.experience_points}</p>
            <p className="text-xs opacity-90">XP Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Word Review */}
      {currentWord && (
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-100 border-indigo-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold text-indigo-800">
                {currentWord.latin_word}
              </CardTitle>
              <div className="flex space-x-2">
                {srsData[currentWord.id.toString()] && (
                  <Badge className="bg-blue-100 text-blue-700">
                    Rep: {srsData[currentWord.id.toString()].repetition_count}
                  </Badge>
                )}
                <Badge className={`${
                  currentWord.difficulty_rating <= 3 ? 'bg-green-100 text-green-700' :
                  currentWord.difficulty_rating <= 7 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  Level {currentWord.difficulty_rating}
                </Badge>
              </div>
            </div>
            <CardDescription>
              {currentWord.semantic_contexts.slice(0, 3).join(' • ')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Answer Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What does this word mean?
                </label>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter meaning..."
                  onKeyPress={(e) => e.key === 'Enter' && setShowAnswer(true)}
                />
              </div>
              
              {!showAnswer ? (
                <Button 
                  onClick={() => setShowAnswer(true)} 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Show Answer & Rate Performance
                </Button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Answer Display */}
                  <div className="p-4 bg-white rounded-lg border border-slate-200">
                    <h4 className="font-semibold mb-2">Meanings & Context:</h4>
                    <div className="space-y-2">
                      {currentWord.modern_cognates.length > 0 && (
                        <div>
                          <span className="font-medium">Modern cognates: </span>
                          {currentWord.modern_cognates.join(', ')}
                        </div>
                      )}
                      {currentWord.cultural_significance && (
                        <div>
                          <span className="font-medium">Cultural significance: </span>
                          {currentWord.cultural_significance}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Performance Rating Buttons */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-center">How well did you know this word?</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      <Button
                        onClick={() => handlePerformanceRating(0)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        {t.performance.again}
                      </Button>
                      <Button
                        onClick={() => handlePerformanceRating(1)}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        {t.performance.hard}
                      </Button>
                      <Button
                        onClick={() => handlePerformanceRating(2)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        {t.performance.good}
                      </Button>
                      <Button
                        onClick={() => handlePerformanceRating(3)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {t.performance.easy}
                      </Button>
                      <Button
                        onClick={() => handlePerformanceRating(4)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {t.performance.perfect}
                      </Button>
                    </div>
                  </div>
                  
                  {/* SRS Information */}
                  {srsData[currentWord.id.toString()] && (
                    <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="font-medium">{t.srs.interval}: </span>
                          {srsData[currentWord.id.toString()].last_interval} days
                        </div>
                        <div>
                          <span className="font-medium">{t.srs.easiness}: </span>
                          {srsData[currentWord.id.toString()].easiness_factor.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  // 🏆 **GOALS MODE RENDERING**
  const renderGoalsMode = () => (
    <div className="space-y-6">
      {/* Goals Overview */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-amber-600" />
            <span>{t.goals.title}</span>
          </CardTitle>
          <CardDescription>{t.goals.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Words Goal */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{t.goals.wordsTarget}</span>
                <span className="text-sm text-slate-600">
                  {dailyGoals.daily_progress.words_reviewed} / {dailyGoals.words_target}
                </span>
              </div>
              <Progress value={wordsProgress} className="h-2" />
              <div className="text-xs text-slate-500">
                {Math.max(0, dailyGoals.words_target - dailyGoals.daily_progress.words_reviewed)} words remaining
              </div>
            </div>
            
            {/* Time Goal */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{t.goals.timeTarget}</span>
                <span className="text-sm text-slate-600">
                  {Math.round(dailyGoals.daily_progress.time_spent / 60)} / {dailyGoals.time_target} min
                </span>
              </div>
              <Progress value={timeProgress} className="h-2" />
              <div className="text-xs text-slate-500">
                {Math.max(0, Math.round(dailyGoals.time_target - dailyGoals.daily_progress.time_spent / 60))} minutes remaining
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Streak & Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-red-50 to-pink-100 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Flame className="w-6 h-6 text-red-500" />
              <span>Streak Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div>
                <p className="text-3xl font-bold text-red-600">{dailyGoals.streak_current}</p>
                <p className="text-sm text-slate-600">{t.goals.currentStreak}</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-red-400">{dailyGoals.streak_best}</p>
                <p className="text-xs text-slate-500">{t.goals.bestStreak}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-100 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-purple-500" />
              <span>Experience Points</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div>
                <p className="text-3xl font-bold text-purple-600">{session.experience_points}</p>
                <p className="text-sm text-slate-600">{t.goals.experiencePoints}</p>
              </div>
              <div className="space-y-1">
                {Object.entries(EXPERIENCE_REWARDS)
                  .filter(([points]) => Number(points) > session.experience_points)
                  .slice(0, 1)
                  .map(([points, reward]) => (
                    <div key={points} className="text-xs text-slate-500">
                      Next: {reward.title} at {points} XP
                    </div>
                  ))
                }
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Grid */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-green-600" />
            <span>{t.goals.achievements}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(REWARD_MILESTONES).map(([streak, reward]) => {
              const unlocked = dailyGoals.rewards_unlocked.includes(`streak_${streak}`);
              const currentStreak = dailyGoals.streak_current;
              const isNext = Number(streak) === Object.keys(REWARD_MILESTONES)
                .map(Number)
                .find(s => s > currentStreak);
              
              return (
                <div
                  key={streak}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    unlocked
                      ? 'bg-green-100 border-green-300 text-green-800'
                      : isNext
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <div className="text-2xl mb-1">{reward.icon}</div>
                  <div className="font-medium text-sm">{reward.title}</div>
                  <div className="text-xs">{streak} days</div>
                  {isNext && (
                    <div className="text-xs mt-1 font-medium text-blue-600">Next Goal!</div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Goal Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-6 h-6" />
            <span>Goal Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Daily Words Target</label>
              <input
                type="number"
                value={dailyGoals.words_target}
                onChange={(e) => setDailyGoals(prev => ({
                  ...prev,
                  words_target: Number(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-slate-300 rounded"
                min={1}
                max={100}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Daily Time Target (minutes)</label>
              <input
                type="number"
                value={dailyGoals.time_target}
                onChange={(e) => setDailyGoals(prev => ({
                  ...prev,
                  time_target: Number(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-slate-300 rounded"
                min={1}
                max={120}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // 🎊 **REWARD MODAL**
  const RewardModal = () => (
    showRewardModal.show && showRewardModal.reward && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setShowRewardModal({show: false})}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-xl p-8 max-w-md mx-4 text-center"
          onClick={e => e.stopPropagation()}
        >
          <div className="text-6xl mb-4">{showRewardModal.reward.icon}</div>
          <h2 className="text-2xl font-bold mb-2">{showRewardModal.reward.title}</h2>
          <p className="text-slate-600 mb-6">{showRewardModal.reward.description}</p>
          <Button
            onClick={() => setShowRewardModal({show: false})}
            className="bg-gradient-to-r from-gold to-yellow-400 text-wine-red font-bold"
          >
            <Gift className="w-4 h-4 mr-2" />
            {t.actions.claimReward}
          </Button>
        </motion.div>
      </motion.div>
    )
  );

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
                <Badge className={`${
                  currentWord.difficulty_rating <= 3 ? 'bg-green-100 text-green-700' :
                  currentWord.difficulty_rating <= 7 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  Level: {currentWord.difficulty_rating}/10
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  Freq: {currentWord.frequency}
                </Badge>
              </div>
            </div>
            <CardDescription className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Hash className="w-4 h-4" />
                <span>{currentWord.passages_found.length} passages</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>{currentWord.grammatical_forms.length} forms</span>
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
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter meaning..."
                  disabled={showAnswer}
                  onKeyPress={(e) => e.key === 'Enter' && !showAnswer && setShowAnswer(true)}
                />
              </div>
              
              <div className="flex space-x-3">
                {!showAnswer ? (
                  <Button onClick={() => setShowAnswer(true)}>
                    <Target className="w-4 h-4 mr-2" />
                    Check Answer
                  </Button>
                ) : (
                  <Button onClick={nextWord}>
                    <Zap className="w-4 h-4 mr-2" />
                    Next Word
                  </Button>
                )}
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
                      <span className="font-semibold">Word Analysis Complete</span>
                    </div>
                    
                    {currentWord.cultural_significance && (
                      <div>
                        <h4 className="font-medium text-slate-700">Cultural Significance:</h4>
                        <p className="text-sm text-slate-600">{currentWord.cultural_significance}</p>
                      </div>
                    )}
                    
                    {currentWord.modern_cognates.length > 0 && (
                      <div>
                        <h4 className="font-medium text-slate-700">Modern Cognates:</h4>
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
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">Loading vocabulary...</p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <section id="vocabulary-srs" className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            <div className={`flex items-center space-x-2 ${
              backendStatus === 'connected' ? 'text-green-400' :
              backendStatus === 'error' ? 'text-red-400' : 'text-yellow-400'
            }`}>
              <Database className="w-4 h-4" />
              <span className="font-medium">
                {backendStatus === 'connected' ? 'Oracle Cloud Connected' : 
                 backendStatus === 'error' ? 'Backend Offline' : 'Connecting...'}
              </span>
            </div>
            {vocabularyStats && (
              <>
                <div className="text-white/70">•</div>
                <div className="text-white/70">
                  {vocabularyStats.totalWords?.toLocaleString()} Total Words
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Enhanced Stats Dashboard */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-400">{session.correct}</p>
                <p className="text-xs text-white/70">Correct</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-4 text-center">
                <Flame className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-400">{dailyGoals.streak_current}</p>
                <p className="text-xs text-white/70">Streak</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="text-2xl font-bold text-gold">{session.experience_points}</p>
                <p className="text-xs text-white/70">XP</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-400">{reviewDueCount}</p>
                <p className="text-xs text-white/70">Due for Review</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-400">{Math.round(wordsProgress)}%</p>
                <p className="text-xs text-white/70">Daily Goal</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-400">{session.wordsStudied.size}</p>
                <p className="text-xs text-white/70">Studied</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="p-6 mb-8 bg-red-50 border-red-200 max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 text-red-700">
              <XCircle className="w-6 h-6" />
              <span className="font-medium">{error}</span>
            </div>
          </Card>
        )}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Tabs value={currentMode} onValueChange={(value) => setCurrentMode(value as any)}>
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="practice" className="text-white">
                <Brain className="w-4 h-4 mr-2" />
                Practice
              </TabsTrigger>
              <TabsTrigger value="srs" className="text-white">
                <Clock className="w-4 h-4 mr-2" />
                SRS
              </TabsTrigger>
              <TabsTrigger value="goals" className="text-white">
                <Trophy className="w-4 h-4 mr-2" />
                Goals
              </TabsTrigger>
              <TabsTrigger value="quiz" className="text-white">
                <Target className="w-4 h-4 mr-2" />
                Quiz
              </TabsTrigger>
              <TabsTrigger value="review" className="text-white">
                <RotateCcw className="w-4 h-4 mr-2" />
                Review
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="practice">
              {renderPracticeMode()}
            </TabsContent>
            
            <TabsContent value="srs">
              {renderSRSMode()}
            </TabsContent>
            
            <TabsContent value="goals">
              {renderGoalsMode()}
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
                  <RotateCcw className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Review Mode</h3>
                  <p className="text-white/70 mb-4">Review words you've had difficulty with</p>
                  <Button className="bg-wine-red hover:bg-wine-red/80 text-gold">
                    Start Review (Coming Soon)
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
              New Session
            </Button>
          </div>
        </div>
      </div>
      
      {/* Reward Modal */}
      <RewardModal />
    </section>
  );
};

export default VocabularyTrainerSection;
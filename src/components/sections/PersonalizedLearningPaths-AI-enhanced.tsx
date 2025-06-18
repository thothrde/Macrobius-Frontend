'use client';

/**
 * 🎯 PERSONALIZED LEARNING PATHS SECTION - TIER 2 AI ENHANCED
 * Advanced AI-Powered Adaptive Cultural Education Interface
 * Cross-Component Integration with SRS and Grammar Explainer
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
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
  Award,
  Plus,
  Map,
  Trophy,
  RefreshCw,
  Calendar,
  BarChart3,
  AlertTriangle,
  Users,
  Lightbulb,
  Eye,
  MessageCircle,
  Timer,
  Database,
  Sparkles,
  GraduationCap,
  BookOpen,
  TrendingDown,
  Flame,
  Settings,
  Filter
} from 'lucide-react';

interface LearningPathsProps {
  className?: string;
  language: string;
}

// 🎯 **TIER 2 AI INTERFACES - IMPLEMENTED**
interface DailyLearningPlan {
  date: Date;
  available_time: number; // minutes
  difficulty_adjustment: number;
  focus_areas: string[];
  micro_lessons: MicroLesson[];
  cultural_themes: string[]; // From existing 9 themes
  vocabulary_reviews: string[]; // Integration with SRS system
  grammar_exercises: string[]; // Integration with Grammar Explainer
  estimated_completion: number; // percentage
  adaptive_recommendations: string[];
}

interface MicroLesson {
  id: string;
  type: 'vocabulary' | 'grammar' | 'reading' | 'cultural' | 'review';
  title: string;
  description: string;
  duration: number; // minutes
  content_source: string; // From existing 1,401 passages
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  srs_integration: boolean; // Connect to Vocabulary SRS
  prerequisite_skills: string[];
  learning_objectives: string[];
  cultural_context: string;
  modern_relevance: string;
  completion_criteria: string[];
}

interface KnowledgeGap {
  area: string;
  severity: 'minor' | 'moderate' | 'critical';
  related_concepts: string[];
  recommended_focus_time: number;
  passages_for_practice: string[]; // From 1,401 corpus
  cultural_context: string; // From existing cultural insights
  srs_words_affected: string[]; // Integration with SRS system
  suggested_exercises: GrammarExercise[]; // Integration with Grammar Explainer
  performance_data: {
    srs_performance: number;
    grammar_performance: number;
    reading_comprehension: number;
    cultural_understanding: number;
  };
  improvement_timeline: string;
  success_metrics: string[];
}

interface GrammarExercise {
  id: string;
  type: string;
  difficulty: string;
  concept: string;
  estimated_time: number;
}

interface CrossComponentAnalytics {
  srs_data: {
    total_words: number;
    known_words: number;
    difficult_words: number;
    average_performance: number;
    recent_trend: 'improving' | 'stable' | 'declining';
    study_streak: number;
  };
  grammar_data: {
    concepts_mastered: number;
    total_concepts: number;
    average_score: number;
    weak_areas: string[];
    recent_exercises: number;
    success_rate: number;
  };
  reading_data: {
    passages_read: number;
    comprehension_score: number;
    preferred_difficulty: string;
    cultural_themes_explored: string[];
    time_spent_reading: number;
  };
  overall_progress: {
    learning_velocity: number;
    engagement_score: number;
    consistency_rating: number;
    predicted_completion: Date;
  };
}

interface LearningInsight {
  id: string;
  type: 'strength' | 'opportunity' | 'recommendation' | 'milestone';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action_items: string[];
  supporting_data: any;
  timeline: string;
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

const translations = {
  en: {
    title: 'AI Learning Paths',
    subtitle: 'Intelligent Adaptive Education with Cross-Component Integration',
    tabs: {
      overview: 'Overview',
      dailyPlans: 'Daily Plans',
      knowledgeGaps: 'Knowledge Gaps',
      analytics: 'Analytics',
      insights: 'AI Insights'
    },
    dailyPlans: {
      title: 'AI-Generated Daily Learning Plans',
      subtitle: 'Personalized micro-lessons based on your progress and available time',
      todaysPlan: 'Today\'s Learning Plan',
      availableTime: 'Available Time',
      estimatedCompletion: 'Estimated Completion',
      focusAreas: 'Focus Areas',
      microLessons: 'Micro Lessons',
      srsIntegration: 'SRS Integration',
      grammarIntegration: 'Grammar Integration',
      adaptiveRecommendations: 'AI Recommendations',
      generatePlan: 'Generate Today\'s Plan',
      planGenerated: 'Plan Generated',
      noTimeSet: 'Set your available study time to generate a plan'
    },
    knowledgeGaps: {
      title: 'AI Knowledge Gap Analysis',
      subtitle: 'Cross-component analysis to identify learning opportunities',
      analysisComplete: 'Analysis Complete',
      gapsDetected: 'Gaps Detected',
      severity: 'Severity',
      focusTime: 'Recommended Focus Time',
      srsWords: 'SRS Words Affected',
      grammarConcepts: 'Grammar Concepts',
      culturalContext: 'Cultural Context',
      improvementTimeline: 'Improvement Timeline',
      successMetrics: 'Success Metrics',
      performanceData: 'Performance Data',
      runAnalysis: 'Run AI Analysis',
      analyzing: 'Analyzing your learning data...'
    },
    analytics: {
      title: 'Cross-Component Learning Analytics',
      subtitle: 'Comprehensive analysis across all learning components',
      srsPerformance: 'SRS Performance',
      grammarProgress: 'Grammar Progress',
      readingComprehension: 'Reading Comprehension',
      overallProgress: 'Overall Progress',
      learningVelocity: 'Learning Velocity',
      engagementScore: 'Engagement Score',
      consistencyRating: 'Consistency Rating',
      predictedCompletion: 'Predicted Completion',
      recentTrend: 'Recent Trend',
      weakAreas: 'Weak Areas',
      studyStreak: 'Study Streak',
      timeSpent: 'Time Spent'
    },
    insights: {
      title: 'AI Learning Insights',
      subtitle: 'Intelligent recommendations based on your learning patterns',
      strengths: 'Strengths',
      opportunities: 'Opportunities',
      recommendations: 'Recommendations',
      milestones: 'Milestones',
      actionItems: 'Action Items',
      impact: 'Impact',
      timeline: 'Timeline',
      noInsights: 'Continue learning to generate AI insights'
    },
    common: {
      loading: 'Loading...',
      generating: 'Generating...',
      analyzing: 'Analyzing...',
      complete: 'Complete',
      inProgress: 'In Progress',
      notStarted: 'Not Started',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      minutes: 'minutes',
      hours: 'hours',
      days: 'days',
      weeks: 'weeks'
    }
  },
  de: {
    title: 'KI-Lernpfade',
    subtitle: 'Intelligente adaptive Bildung mit komponentenübergreifender Integration',
    tabs: {
      overview: 'Überblick',
      dailyPlans: 'Tagespläne',
      knowledgeGaps: 'Wissenslücken',
      analytics: 'Analytik',
      insights: 'KI-Erkenntnisse'
    },
    dailyPlans: {
      title: 'KI-generierte tägliche Lernpläne',
      subtitle: 'Personalisierte Mikro-Lektionen basierend auf Ihrem Fortschritt und verfügbarer Zeit',
      todaysPlan: 'Heutiger Lernplan',
      availableTime: 'Verfügbare Zeit',
      estimatedCompletion: 'Geschätzte Vollendung',
      focusAreas: 'Schwerpunktbereiche',
      microLessons: 'Mikro-Lektionen',
      srsIntegration: 'SRS-Integration',
      grammarIntegration: 'Grammatik-Integration',
      adaptiveRecommendations: 'KI-Empfehlungen',
      generatePlan: 'Heutigen Plan generieren',
      planGenerated: 'Plan generiert',
      noTimeSet: 'Setzen Sie Ihre verfügbare Lernzeit, um einen Plan zu generieren'
    },
    knowledgeGaps: {
      title: 'KI-Wissenslückenanalyse',
      subtitle: 'Komponentenübergreifende Analyse zur Identifikation von Lernmöglichkeiten',
      analysisComplete: 'Analyse vollständig',
      gapsDetected: 'Lücken erkannt',
      severity: 'Schweregrad',
      focusTime: 'Empfohlene Fokuszeit',
      srsWords: 'Betroffene SRS-Wörter',
      grammarConcepts: 'Grammatikkonzepte',
      culturalContext: 'Kultureller Kontext',
      improvementTimeline: 'Verbesserungszeitplan',
      successMetrics: 'Erfolgsmetriken',
      performanceData: 'Leistungsdaten',
      runAnalysis: 'KI-Analyse ausführen',
      analyzing: 'Analysiere Ihre Lerndaten...'
    },
    analytics: {
      title: 'Komponentenübergreifende Lernanalytik',
      subtitle: 'Umfassende Analyse aller Lernkomponenten',
      srsPerformance: 'SRS-Leistung',
      grammarProgress: 'Grammatikfortschritt',
      readingComprehension: 'Leseverständnis',
      overallProgress: 'Gesamtfortschritt',
      learningVelocity: 'Lerngeschwindigkeit',
      engagementScore: 'Engagement-Score',
      consistencyRating: 'Konsistenzbewertung',
      predictedCompletion: 'Vorhergesagte Vollendung',
      recentTrend: 'Aktueller Trend',
      weakAreas: 'Schwachstellen',
      studyStreak: 'Lernserie',
      timeSpent: 'Verbrachte Zeit'
    },
    insights: {
      title: 'KI-Lernerkenntnisse',
      subtitle: 'Intelligente Empfehlungen basierend auf Ihren Lernmustern',
      strengths: 'Stärken',
      opportunities: 'Chancen',
      recommendations: 'Empfehlungen',
      milestones: 'Meilensteine',
      actionItems: 'Aktionspunkte',
      impact: 'Auswirkung',
      timeline: 'Zeitplan',
      noInsights: 'Lernen Sie weiter, um KI-Erkenntnisse zu generieren'
    },
    common: {
      loading: 'Laden...',
      generating: 'Generieren...',
      analyzing: 'Analysieren...',
      complete: 'Vollständig',
      inProgress: 'In Bearbeitung',
      notStarted: 'Nicht begonnen',
      high: 'Hoch',
      medium: 'Mittel',
      low: 'Niedrig',
      beginner: 'Anfänger',
      intermediate: 'Fortgeschrittene',
      advanced: 'Experte',
      minutes: 'Minuten',
      hours: 'Stunden',
      days: 'Tage',
      weeks: 'Wochen'
    }
  },
  la: {
    title: 'Itinera AI Discendi',
    subtitle: 'Educatio Intelligens Adaptiva cum Integratione Trans-Componentibus',
    tabs: {
      overview: 'Synopsis',
      dailyPlans: 'Consilia Diurna',
      knowledgeGaps: 'Lacunae Scientiae',
      analytics: 'Analytica',
      insights: 'Intelligentia AI'
    },
    dailyPlans: {
      title: 'Consilia Diurna AI-Generata',
      subtitle: 'Micro-lectiones personalizatae ex progressu et tempore disponibili',
      todaysPlan: 'Consilium Hodiernum',
      availableTime: 'Tempus Disponibile',
      estimatedCompletion: 'Aestimata Completio',
      focusAreas: 'Areae Focus',
      microLessons: 'Micro-Lectiones',
      srsIntegration: 'Integratio SRS',
      grammarIntegration: 'Integratio Grammaticae',
      adaptiveRecommendations: 'Commendationes AI',
      generatePlan: 'Consilium Hodie Generare',
      planGenerated: 'Consilium Generatum',
      noTimeSet: 'Tempus studii disponibile pone ad consilium generandum'
    },
    knowledgeGaps: {
      title: 'Lacunae Scientiae AI Analysis',
      subtitle: 'Analysis trans-componentibus ad opportunitates discendi identificandas',
      analysisComplete: 'Analysis Completa',
      gapsDetected: 'Lacunae Detectae',
      severity: 'Gravitas',
      focusTime: 'Tempus Focus Commendatum',
      srsWords: 'Verba SRS Affecta',
      grammarConcepts: 'Conceptus Grammatici',
      culturalContext: 'Contextus Culturalis',
      improvementTimeline: 'Tempus Meliorationis',
      successMetrics: 'Metrices Successus',
      performanceData: 'Data Effectus',
      runAnalysis: 'AI Analysis Exsequere',
      analyzing: 'Data discendi tua analyzando...'
    },
    analytics: {
      title: 'Analytica Discendi Trans-Componentium',
      subtitle: 'Analysis comprehensiva omnium componentium discendi',
      srsPerformance: 'Effectus SRS',
      grammarProgress: 'Progressus Grammaticae',
      readingComprehension: 'Comprehensio Lectionis',
      overallProgress: 'Progressus Generalis',
      learningVelocity: 'Velocitas Discendi',
      engagementScore: 'Punctum Obligationis',
      consistencyRating: 'Aestimatio Constantiae',
      predictedCompletion: 'Completio Praedicta',
      recentTrend: 'Tendentia Recens',
      weakAreas: 'Areae Infirmae',
      studyStreak: 'Series Studii',
      timeSpent: 'Tempus Impensum'
    },
    insights: {
      title: 'Intelligentia AI Discendi',
      subtitle: 'Commendationes intelligentes ex modis discendi tuis',
      strengths: 'Fortitudines',
      opportunities: 'Opportunitates',
      recommendations: 'Commendationes',
      milestones: 'Scopuli Itineris',
      actionItems: 'Res Agendae',
      impact: 'Effectus',
      timeline: 'Tempus',
      noInsights: 'Perge discere ad AI intelligentias generandas'
    },
    common: {
      loading: 'Cargando...',
      generating: 'Generando...',
      analyzing: 'Analyzando...',
      complete: 'Completum',
      inProgress: 'In Processu',
      notStarted: 'Non Inceptum',
      high: 'Altum',
      medium: 'Medium',
      low: 'Humile',
      beginner: 'Incipiens',
      intermediate: 'Intermedius',
      advanced: 'Provectus',
      minutes: 'minuta',
      hours: 'horae',
      days: 'dies',
      weeks: 'hebdomadae'
    }
  }
};

export default function PersonalizedLearningPathsAIEnhanced({ className = '', language }: LearningPathsProps) {
  // Enhanced State Management
  const [activeTab, setActiveTab] = useState<'overview' | 'dailyPlans' | 'knowledgeGaps' | 'analytics' | 'insights'>('overview');
  const [dailyPlan, setDailyPlan] = useState<DailyLearningPlan | null>(null);
  const [knowledgeGaps, setKnowledgeGaps] = useState<KnowledgeGap[]>([]);
  const [crossComponentAnalytics, setCrossComponentAnalytics] = useState<CrossComponentAnalytics | null>(null);
  const [learningInsights, setLearningInsights] = useState<LearningInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [availableStudyTime, setAvailableStudyTime] = useState(30); // minutes
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  // SRS Integration State
  const [srsData, setSrsData] = useState<Record<string, any>>({});
  const [grammarData, setGrammarData] = useState<Record<string, any>>({});
  const [userProfile, setUserProfile] = useState<{
    known_words: Set<string>;
    difficult_words: Set<string>;
    performance_scores: Record<string, number>;
    grammar_concepts: Record<string, number>;
    reading_preferences: any;
  }>({ 
    known_words: new Set(), 
    difficult_words: new Set(), 
    performance_scores: {},
    grammar_concepts: {},
    reading_preferences: {}
  });

  const t = translations[language as keyof typeof translations] || translations.en;

  // 📊 **LOAD CROSS-COMPONENT DATA**
  useEffect(() => {
    const loadCrossComponentData = () => {
      try {
        // Load SRS data
        const storedSRS = localStorage.getItem('macrobius_srs_data');
        if (storedSRS) {
          const parsedSRS = JSON.parse(storedSRS);
          setSrsData(parsedSRS);
          
          // Build user profile from SRS data
          const knownWords = new Set<string>();
          const difficultWords = new Set<string>();
          const performanceScores: Record<string, number> = {};
          
          Object.entries(parsedSRS).forEach(([wordId, data]: [string, any]) => {
            if (data.repetition_count >= 3 && data.easiness_factor > 2.0) {
              knownWords.add(wordId);
            }
            if (data.easiness_factor < 1.8) {
              difficultWords.add(wordId);
            }
            
            if (data.review_history && data.review_history.length > 0) {
              const avgPerformance = data.review_history
                .slice(-5)
                .reduce((sum: number, review: any) => sum + review.performance, 0) / Math.min(5, data.review_history.length);
              performanceScores[wordId] = avgPerformance;
            }
          });
          
          setUserProfile(prev => ({
            ...prev,
            known_words: knownWords,
            difficult_words: difficultWords,
            performance_scores: performanceScores
          }));
        }
        
        // Load Grammar data (would come from Grammar Explainer)
        const storedGrammar = localStorage.getItem('macrobius_grammar_progress');
        if (storedGrammar) {
          const parsedGrammar = JSON.parse(storedGrammar);
          setGrammarData(parsedGrammar);
          
          setUserProfile(prev => ({
            ...prev,
            grammar_concepts: parsedGrammar.concept_scores || {}
          }));
        }
        
        // Generate initial analytics
        generateCrossComponentAnalytics();
      } catch (err) {
        console.error('Failed to load cross-component data:', err);
      }
    };
    
    loadCrossComponentData();
  }, []);

  // Utility and calculation functions
  const calculateSRSPerformance = (): number => {
    const scores = Object.values(userProfile.performance_scores);
    return scores.length > 0 ? (scores.reduce((sum, score) => sum + score, 0) / scores.length) * 20 : 50;
  };

  const calculateGrammarPerformance = (): number => {
    const scores = Object.values(userProfile.grammar_concepts);
    return scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 50;
  };

  const calculateStudyStreak = (): number => {
    return 5; // Placeholder - would calculate from actual SRS data
  };

  const generateCrossComponentAnalytics = useCallback(() => {
    try {
      const srsStats = {
        total_words: Object.keys(srsData).length,
        known_words: userProfile.known_words.size,
        difficult_words: userProfile.difficult_words.size,
        average_performance: calculateSRSPerformance(),
        recent_trend: 'stable' as const,
        study_streak: calculateStudyStreak()
      };
      
      const grammarStats = {
        concepts_mastered: Object.values(userProfile.grammar_concepts).filter(score => score >= 80).length,
        total_concepts: Object.keys(userProfile.grammar_concepts).length,
        average_score: calculateGrammarPerformance(),
        weak_areas: Object.entries(userProfile.grammar_concepts)
          .filter(([, score]) => score < 60)
          .map(([concept]) => concept),
        recent_exercises: 0,
        success_rate: Object.values(userProfile.grammar_concepts).length > 0 
          ? (Object.values(userProfile.grammar_concepts).filter(score => score >= 70).length / Object.values(userProfile.grammar_concepts).length) * 100 
          : 0
      };
      
      const readingStats = {
        passages_read: 0,
        comprehension_score: 75,
        preferred_difficulty: 'intermediate',
        cultural_themes_explored: ['Philosophy', 'Roman History'],
        time_spent_reading: 0
      };
      
      const overallStats = {
        learning_velocity: (srsStats.average_performance + grammarStats.average_score + readingStats.comprehension_score) / 3,
        engagement_score: Math.min((srsStats.study_streak * 10) + (grammarStats.recent_exercises * 5), 100),
        consistency_rating: srsStats.study_streak >= 7 ? 90 : srsStats.study_streak * 15,
        predicted_completion: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      };
      
      setCrossComponentAnalytics({
        srs_data: srsStats,
        grammar_data: grammarStats,
        reading_data: readingStats,
        overall_progress: overallStats
      });
    } catch (error) {
      console.error('Failed to generate analytics:', error);
    }
  }, [srsData, userProfile]);

  const generateDailyPlan = useCallback(async () => {
    if (availableStudyTime < 5) return;
    
    setLoading(true);
    
    try {
      const timePerLesson = Math.min(Math.max(availableStudyTime / 4, 5), 15);
      const numLessons = Math.floor(availableStudyTime / timePerLesson);
      
      // Simple focus area identification
      const focusAreas: string[] = [];
      if (userProfile.difficult_words.size > userProfile.known_words.size * 0.3) {
        focusAreas.push('vocabulary_review');
      }
      const avgGrammarScore = Object.values(userProfile.grammar_concepts).length > 0 
        ? Object.values(userProfile.grammar_concepts).reduce((sum, score) => sum + score, 0) / Object.values(userProfile.grammar_concepts).length 
        : 0;
      if (avgGrammarScore < 70) {
        focusAreas.push('grammar_fundamentals');
      }
      focusAreas.push('reading_comprehension');
      if (avgGrammarScore > 60 && userProfile.known_words.size > 50) {
        focusAreas.push('cultural_context');
      }
      
      // Generate micro lessons
      const microLessons: MicroLesson[] = [];
      for (let i = 0; i < numLessons; i++) {
        const focusArea = focusAreas[i % focusAreas.length];
        microLessons.push({
          id: `lesson_${i + 1}_${focusArea}`,
          type: focusArea.includes('vocabulary') ? 'vocabulary' : 
                focusArea.includes('grammar') ? 'grammar' : 
                focusArea.includes('cultural') ? 'cultural' : 'reading',
          title: `${focusArea.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Session ${i + 1}`,
          description: `Targeted practice for ${focusArea.replace('_', ' ')}`,
          duration: timePerLesson,
          content_source: 'Macrobius Corpus (1,401 passages)',
          difficulty: avgGrammarScore < 40 ? 'beginner' : avgGrammarScore < 70 ? 'intermediate' : 'advanced',
          srs_integration: focusArea.includes('vocabulary'),
          prerequisite_skills: ['Basic Latin alphabet'],
          learning_objectives: ['Improve Latin skills'],
          cultural_context: 'Roman culture',
          modern_relevance: 'Ancient wisdom applied to modern learning',
          completion_criteria: ['Complete all activities']
        });
      }
      
      const plan: DailyLearningPlan = {
        date: new Date(),
        available_time: availableStudyTime,
        difficulty_adjustment: (calculateSRSPerformance() + calculateGrammarPerformance()) / 2,
        focus_areas: focusAreas.slice(0, 3),
        micro_lessons: microLessons,
        cultural_themes: ['Philosophy', 'Roman History'],
        vocabulary_reviews: Object.keys(srsData).slice(0, 10),
        grammar_exercises: Object.entries(userProfile.grammar_concepts)
          .filter(([, score]) => score < 70)
          .map(([concept]) => concept)
          .slice(0, 3),
        estimated_completion: Math.min(Math.round((microLessons.length * timePerLesson / availableStudyTime) * 100), 100),
        adaptive_recommendations: [
          'Focus on high-frequency words with low SRS scores',
          'Practice grammar patterns in authentic contexts',
          'Start with shorter passages and build complexity'
        ]
      };
      
      setDailyPlan(plan);
    } catch (error) {
      console.error('Failed to generate daily plan:', error);
    }
    
    setLoading(false);
  }, [availableStudyTime, srsData, userProfile]);

  const runKnowledgeGapAnalysis = useCallback(async () => {
    setAnalyzing(true);
    setAnalysisProgress(0);
    
    try {
      const gaps: KnowledgeGap[] = [];
      
      setAnalysisProgress(25);
      
      // Analyze SRS gaps
      if (userProfile.difficult_words.size > 10) {
        gaps.push({
          area: 'Vocabulary Retention',
          severity: userProfile.difficult_words.size > 20 ? 'critical' : 'moderate',
          related_concepts: ['Word memory', 'Spaced repetition'],
          recommended_focus_time: Math.min(userProfile.difficult_words.size * 2, 60),
          passages_for_practice: ['Selected passages with difficult vocabulary'],
          cultural_context: 'Focus on culturally significant vocabulary',
          srs_words_affected: Array.from(userProfile.difficult_words).slice(0, 10),
          suggested_exercises: [],
          performance_data: {
            srs_performance: calculateSRSPerformance(),
            grammar_performance: 0,
            reading_comprehension: 0,
            cultural_understanding: 0
          },
          improvement_timeline: userProfile.difficult_words.size > 20 ? '4-6 weeks' : '2-3 weeks',
          success_metrics: ['Reduce difficult words by 50%', 'Improve average SRS score to 3.5+']
        });
      }
      
      setAnalysisProgress(50);
      
      // Analyze grammar gaps
      const weakConcepts = Object.entries(userProfile.grammar_concepts)
        .filter(([, score]) => score < 60)
        .map(([concept]) => concept);
      
      if (weakConcepts.length > 0) {
        gaps.push({
          area: 'Grammar Fundamentals',
          severity: weakConcepts.length > 5 ? 'critical' : 'moderate',
          related_concepts: weakConcepts,
          recommended_focus_time: weakConcepts.length * 10,
          passages_for_practice: ['Grammar-focused passages'],
          cultural_context: 'Grammar in cultural context',
          srs_words_affected: [],
          suggested_exercises: weakConcepts.map(concept => ({
            id: `exercise_${concept}`,
            type: 'grammar',
            difficulty: 'intermediate',
            concept,
            estimated_time: 10
          })),
          performance_data: {
            srs_performance: 0,
            grammar_performance: calculateGrammarPerformance(),
            reading_comprehension: 0,
            cultural_understanding: 0
          },
          improvement_timeline: '3-4 weeks',
          success_metrics: ['Achieve 80%+ on all grammar concepts']
        });
      }
      
      setAnalysisProgress(75);
      
      // Sort by severity
      const sortedGaps = gaps.sort((a, b) => {
        const severityWeight = { critical: 3, moderate: 2, minor: 1 };
        return severityWeight[b.severity] - severityWeight[a.severity];
      });
      
      setAnalysisProgress(100);
      setKnowledgeGaps(sortedGaps);
      
      // Generate insights
      const insights: LearningInsight[] = [];
      
      gaps.forEach(gap => {
        if (gap.severity === 'critical') {
          insights.push({
            id: `insight_${gap.area}`,
            type: 'opportunity',
            title: `Critical Gap: ${gap.area}`,
            description: `Immediate attention needed in ${gap.area.toLowerCase()}`,
            impact: 'high',
            action_items: [`Focus ${gap.recommended_focus_time} minutes daily on ${gap.area}`],
            supporting_data: gap.performance_data,
            timeline: gap.improvement_timeline
          });
        }
      });
      
      if (userProfile.known_words.size > 100) {
        insights.push({
          id: 'strength_vocabulary',
          type: 'strength',
          title: 'Strong Vocabulary Foundation',
          description: `You have mastered ${userProfile.known_words.size} words`,
          impact: 'high',
          action_items: ['Continue building on this strength'],
          supporting_data: { vocabulary_count: userProfile.known_words.size },
          timeline: 'ongoing'
        });
      }
      
      setLearningInsights(insights);
    } catch (error) {
      console.error('Knowledge gap analysis failed:', error);
    }
    
    setAnalyzing(false);
  }, [userProfile]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'minor': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'medium': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength': return <Trophy className="w-5 h-5 text-green-600" />;
      case 'opportunity': return <Target className="w-5 h-5 text-orange-600" />;
      case 'recommendation': return <Lightbulb className="w-5 h-5 text-blue-600" />;
      case 'milestone': return <Award className="w-5 h-5 text-purple-600" />;
      default: return <Brain className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <section className={`py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 min-h-screen ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-4">
            {t.subtitle}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2 text-purple-400">
              <Brain className="w-4 h-4" />
              <span className="font-medium">AI-Powered Learning Analytics</span>
            </div>
            <div className="text-white/70">•</div>
            <div className="flex items-center space-x-2 text-blue-400">
              <Database className="w-4 h-4" />
              <span className="font-medium">Cross-Component Integration</span>
            </div>
            <div className="text-white/70">•</div>
            <div className="flex items-center space-x-2 text-green-400">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">Adaptive Recommendations</span>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Tab Navigation */}
        <div className="max-w-4xl mx-auto mb-12">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="overview" className="text-white">
                <Map className="w-4 h-4 mr-2" />
                {t.tabs.overview}
              </TabsTrigger>
              <TabsTrigger value="dailyPlans" className="text-white">
                <Calendar className="w-4 h-4 mr-2" />
                {t.tabs.dailyPlans}
              </TabsTrigger>
              <TabsTrigger value="knowledgeGaps" className="text-white">
                <AlertTriangle className="w-4 h-4 mr-2" />
                {t.tabs.knowledgeGaps}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                {t.tabs.analytics}
              </TabsTrigger>
              <TabsTrigger value="insights" className="text-white">
                <Brain className="w-4 h-4 mr-2" />
                {t.tabs.insights}
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center">
                    <Target className="w-6 h-6 mr-3" />
                    AI Learning Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-400/30">
                      <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-purple-300 mb-2">AI Daily Plans</h3>
                      <p className="text-white/80 text-sm">Personalized micro-lessons based on your progress and available time</p>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-lg border border-orange-400/30">
                      <AlertTriangle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-orange-300 mb-2">Knowledge Gaps</h3>
                      <p className="text-white/80 text-sm">AI analysis to identify learning opportunities across all components</p>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-lg border border-green-400/30">
                      <BarChart3 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-300 mb-2">Smart Analytics</h3>
                      <p className="text-white/80 text-sm">Cross-component insights from SRS, Grammar, and Reading performance</p>
                    </div>
                  </div>
                  
                  {/* Quick Stats */}
                  {crossComponentAnalytics && (
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-black/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">{crossComponentAnalytics.srs_data.known_words}</div>
                        <div className="text-sm text-white/70">Words Mastered</div>
                      </div>
                      <div className="text-center p-4 bg-black/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">{crossComponentAnalytics.grammar_data.concepts_mastered}</div>
                        <div className="text-sm text-white/70">Grammar Concepts</div>
                      </div>
                      <div className="text-center p-4 bg-black/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400">{Math.round(crossComponentAnalytics.overall_progress.learning_velocity)}</div>
                        <div className="text-sm text-white/70">Learning Velocity</div>
                      </div>
                      <div className="text-center p-4 bg-black/20 rounded-lg">
                        <div className="text-2xl font-bold text-orange-400">{crossComponentAnalytics.srs_data.study_streak}</div>
                        <div className="text-sm text-white/70">Study Streak</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Daily Plans Tab */}
            <TabsContent value="dailyPlans" className="mt-8">
              <div className="space-y-6">
                {/* Time Selection */}
                <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                  <CardHeader>
                    <CardTitle className="text-gold flex items-center">
                      <Timer className="w-6 h-6 mr-3" />
                      {t.dailyPlans.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          {t.dailyPlans.availableTime}: {availableStudyTime} {t.common.minutes}
                        </label>
                        <input
                          type="range"
                          min="5"
                          max="120"
                          value={availableStudyTime}
                          onChange={(e) => setAvailableStudyTime(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-white/60 mt-1">
                          <span>5 min</span>
                          <span>120 min</span>
                        </div>
                      </div>
                      
                      <Button
                        onClick={generateDailyPlan}
                        disabled={loading || availableStudyTime < 5}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            {t.common.generating}
                          </>
                        ) : (
                          <>
                            <Brain className="w-4 h-4 mr-2" />
                            {t.dailyPlans.generatePlan}
                          </>
                        )}
                      </Button>
                      
                      {availableStudyTime < 5 && (
                        <p className="text-sm text-red-400">{t.dailyPlans.noTimeSet}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Generated Plan Display */}
                {dailyPlan && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-400/30">
                      <CardHeader>
                        <CardTitle className="text-green-300 flex items-center">
                          <CheckCircle className="w-6 h-6 mr-3" />
                          {t.dailyPlans.todaysPlan}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{dailyPlan.available_time}</div>
                            <div className="text-sm text-white/70">{t.dailyPlans.availableTime}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">{dailyPlan.estimated_completion}%</div>
                            <div className="text-sm text-white/70">{t.dailyPlans.estimatedCompletion}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">{dailyPlan.micro_lessons.length}</div>
                            <div className="text-sm text-white/70">{t.dailyPlans.microLessons}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-400">{dailyPlan.focus_areas.length}</div>
                            <div className="text-sm text-white/70">{t.dailyPlans.focusAreas}</div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-white mb-2">{t.dailyPlans.focusAreas}:</h4>
                            <div className="flex flex-wrap gap-2">
                              {dailyPlan.focus_areas.map(area => (
                                <Badge key={area} className="bg-blue-600/20 text-blue-300 border-blue-400">
                                  {area.replace('_', ' ')}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-white mb-2">{t.dailyPlans.adaptiveRecommendations}:</h4>
                            <ul className="space-y-1">
                              {dailyPlan.adaptive_recommendations.map((rec, idx) => (
                                <li key={idx} className="flex items-start space-x-2 text-sm text-white/80">
                                  <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Micro Lessons */}
                    <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                      <CardHeader>
                        <CardTitle className="text-gold">{t.dailyPlans.microLessons}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {dailyPlan.micro_lessons.map((lesson, idx) => (
                            <div key={lesson.id} className="p-4 bg-black/20 rounded-lg border border-white/10">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                    {idx + 1}
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-white">{lesson.title}</h5>
                                    <p className="text-sm text-white/70">{lesson.description}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium text-white">{lesson.duration} min</div>
                                  <Badge className={`text-xs ${
                                    lesson.difficulty === 'beginner' ? 'bg-green-600/20 text-green-300' :
                                    lesson.difficulty === 'intermediate' ? 'bg-yellow-600/20 text-yellow-300' :
                                    'bg-red-600/20 text-red-300'
                                  }`}>
                                    {lesson.difficulty}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-white/80">Learning Objectives:</span>
                                  <ul className="text-white/70 text-xs mt-1">
                                    {lesson.learning_objectives.map((obj, i) => (
                                      <li key={i}>• {obj}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <span className="font-medium text-white/80">Cultural Context:</span>
                                  <p className="text-white/70 text-xs mt-1">{lesson.cultural_context}</p>
                                </div>
                              </div>
                              
                              {lesson.srs_integration && (
                                <div className="mt-3 flex items-center text-purple-400 text-sm">
                                  <Users className="w-4 h-4 mr-2" />
                                  <span>Integrated with SRS system</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </TabsContent>
            
            {/* Knowledge Gaps Tab */}
            <TabsContent value="knowledgeGaps" className="mt-8">
              <div className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                  <CardHeader>
                    <CardTitle className="text-gold flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-3" />
                      {t.knowledgeGaps.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-white/80">{t.knowledgeGaps.subtitle}</p>
                      
                      <Button
                        onClick={runKnowledgeGapAnalysis}
                        disabled={analyzing}
                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white"
                      >
                        {analyzing ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            {t.knowledgeGaps.analyzing}
                          </>
                        ) : (
                          <>
                            <Brain className="w-4 h-4 mr-2" />
                            {t.knowledgeGaps.runAnalysis}
                          </>
                        )}
                      </Button>
                      
                      {analyzing && (
                        <div className="space-y-2">
                          <Progress value={analysisProgress} className="h-2" />
                          <div className="text-sm text-white/70 text-center">
                            {analysisProgress}% {t.common.complete}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Knowledge Gaps Results */}
                {knowledgeGaps.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-orange-300 mb-2">
                        {t.knowledgeGaps.analysisComplete}
                      </h3>
                      <p className="text-white/70">
                        {knowledgeGaps.length} {t.knowledgeGaps.gapsDetected}
                      </p>
                    </div>
                    
                    {knowledgeGaps.map((gap, idx) => (
                      <Card key={`gap_${idx}`} className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-400/30">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-orange-300">{gap.area}</CardTitle>
                            <Badge className={getSeverityColor(gap.severity)}>
                              {gap.severity} {t.knowledgeGaps.severity}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <h5 className="font-semibold text-white mb-2">{t.knowledgeGaps.focusTime}:</h5>
                                <div className="flex items-center space-x-2">
                                  <Timer className="w-4 h-4 text-blue-400" />
                                  <span className="text-white/80">{gap.recommended_focus_time} {t.common.minutes} daily</span>
                                </div>
                              </div>
                              
                              <div>
                                <h5 className="font-semibold text-white mb-2">{t.knowledgeGaps.improvementTimeline}:</h5>
                                <span className="text-white/80">{gap.improvement_timeline}</span>
                              </div>
                              
                              {gap.srs_words_affected.length > 0 && (
                                <div>
                                  <h5 className="font-semibold text-white mb-2">{t.knowledgeGaps.srsWords}:</h5>
                                  <div className="flex flex-wrap gap-1">
                                    {gap.srs_words_affected.slice(0, 5).map(word => (
                                      <Badge key={word} className="text-xs bg-purple-600/20 text-purple-300">
                                        {word}
                                      </Badge>
                                    ))}
                                    {gap.srs_words_affected.length > 5 && (
                                      <Badge className="text-xs bg-gray-600/20 text-gray-300">
                                        +{gap.srs_words_affected.length - 5}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <h5 className="font-semibold text-white mb-2">{t.knowledgeGaps.performanceData}:</h5>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-white/70">SRS Performance:</span>
                                    <span className="text-white">{Math.round(gap.performance_data.srs_performance)}%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-white/70">Grammar Performance:</span>
                                    <span className="text-white">{Math.round(gap.performance_data.grammar_performance)}%</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h5 className="font-semibold text-white mb-2">{t.knowledgeGaps.successMetrics}:</h5>
                                <ul className="space-y-1">
                                  {gap.success_metrics.map((metric, i) => (
                                    <li key={i} className="flex items-start space-x-2 text-sm text-white/80">
                                      <Target className="w-3 h-3 text-green-400 mt-1 flex-shrink-0" />
                                      <span>{metric}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          {gap.cultural_context && (
                            <div className="mt-4 pt-4 border-t border-orange-400/30">
                              <h5 className="font-semibold text-white mb-2">{t.knowledgeGaps.culturalContext}:</h5>
                              <p className="text-white/80 text-sm">{gap.cultural_context}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </motion.div>
                )}
              </div>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-8">
              {crossComponentAnalytics ? (
                <div className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                    <CardHeader>
                      <CardTitle className="text-gold flex items-center">
                        <BarChart3 className="w-6 h-6 mr-3" />
                        {t.analytics.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/80 mb-6">{t.analytics.subtitle}</p>
                      
                      {/* Overview Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="text-center p-4 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-lg border border-green-400/30">
                          <div className="text-3xl font-bold text-green-400 mb-2">
                            {Math.round(crossComponentAnalytics.overall_progress.learning_velocity)}
                          </div>
                          <div className="text-sm text-white/70">{t.analytics.learningVelocity}</div>
                        </div>
                        
                        <div className="text-center p-4 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-lg border border-blue-400/30">
                          <div className="text-3xl font-bold text-blue-400 mb-2">
                            {Math.round(crossComponentAnalytics.overall_progress.engagement_score)}
                          </div>
                          <div className="text-sm text-white/70">{t.analytics.engagementScore}</div>
                        </div>
                        
                        <div className="text-center p-4 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-400/30">
                          <div className="text-3xl font-bold text-purple-400 mb-2">
                            {Math.round(crossComponentAnalytics.overall_progress.consistency_rating)}
                          </div>
                          <div className="text-sm text-white/70">{t.analytics.consistencyRating}</div>
                        </div>
                        
                        <div className="text-center p-4 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-lg border border-orange-400/30">
                          <div className="text-3xl font-bold text-orange-400 mb-2">
                            {crossComponentAnalytics.srs_data.study_streak}
                          </div>
                          <div className="text-sm text-white/70">{t.analytics.studyStreak}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Detailed Analytics Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* SRS Analytics */}
                    <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-400/30">
                      <CardHeader>
                        <CardTitle className="text-purple-300 flex items-center">
                          <Users className="w-5 h-5 mr-2" />
                          {t.analytics.srsPerformance}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-white/70">Known Words:</span>
                            <span className="font-bold text-green-400">{crossComponentAnalytics.srs_data.known_words}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Difficult Words:</span>
                            <span className="font-bold text-red-400">{crossComponentAnalytics.srs_data.difficult_words}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Average Performance:</span>
                            <span className="font-bold text-blue-400">{Math.round(crossComponentAnalytics.srs_data.average_performance)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">{t.analytics.recentTrend}:</span>
                            <span className="font-bold text-yellow-400">→ Stable</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Grammar Analytics */}
                    <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-400/30">
                      <CardHeader>
                        <CardTitle className="text-blue-300 flex items-center">
                          <Book className="w-5 h-5 mr-2" />
                          {t.analytics.grammarProgress}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-white/70">Concepts Mastered:</span>
                            <span className="font-bold text-green-400">{crossComponentAnalytics.grammar_data.concepts_mastered}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Total Concepts:</span>
                            <span className="font-bold text-blue-400">{crossComponentAnalytics.grammar_data.total_concepts}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Average Score:</span>
                            <span className="font-bold text-purple-400">{Math.round(crossComponentAnalytics.grammar_data.average_score)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Success Rate:</span>
                            <span className="font-bold text-orange-400">{Math.round(crossComponentAnalytics.grammar_data.success_rate)}%</span>
                          </div>
                          
                          {crossComponentAnalytics.grammar_data.weak_areas.length > 0 && (
                            <div>
                              <span className="text-white/70 text-sm">{t.analytics.weakAreas}:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {crossComponentAnalytics.grammar_data.weak_areas.slice(0, 3).map(area => (
                                  <Badge key={area} className="text-xs bg-red-600/20 text-red-300">
                                    {area}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Reading Analytics */}
                    <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-400/30">
                      <CardHeader>
                        <CardTitle className="text-green-300 flex items-center">
                          <BookOpen className="w-5 h-5 mr-2" />
                          {t.analytics.readingComprehension}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-white/70">Passages Read:</span>
                            <span className="font-bold text-green-400">{crossComponentAnalytics.reading_data.passages_read}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Comprehension Score:</span>
                            <span className="font-bold text-blue-400">{Math.round(crossComponentAnalytics.reading_data.comprehension_score)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Preferred Level:</span>
                            <span className="font-bold text-purple-400">{crossComponentAnalytics.reading_data.preferred_difficulty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">{t.analytics.timeSpent}:</span>
                            <span className="font-bold text-orange-400">{crossComponentAnalytics.reading_data.time_spent_reading}h</span>
                          </div>
                          
                          <div>
                            <span className="text-white/70 text-sm">Cultural Themes:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {crossComponentAnalytics.reading_data.cultural_themes_explored.map(theme => (
                                <Badge key={theme} className="text-xs bg-green-600/20 text-green-300">
                                  {theme}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                  <CardContent className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">Loading analytics data...</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* AI Insights Tab */}
            <TabsContent value="insights" className="mt-8">
              {learningInsights.length > 0 ? (
                <div className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                    <CardHeader>
                      <CardTitle className="text-gold flex items-center">
                        <Sparkles className="w-6 h-6 mr-3" />
                        {t.insights.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/80">{t.insights.subtitle}</p>
                    </CardContent>
                  </Card>
                  
                  {/* Categorized Insights */}
                  <div className="space-y-4">
                    {['strength', 'opportunity', 'recommendation', 'milestone'].map(type => {
                      const typeInsights = learningInsights.filter(insight => insight.type === type);
                      if (typeInsights.length === 0) return null;
                      
                      return (
                        <div key={type}>
                          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            {getInsightIcon(type)}
                            <span className="ml-2">{t.insights[type as keyof typeof t.insights] || type}</span>
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {typeInsights.map(insight => (
                              <Card key={insight.id} className={`bg-gradient-to-br ${
                                type === 'strength' ? 'from-green-900/20 to-emerald-900/20 border-green-400/30' :
                                type === 'opportunity' ? 'from-orange-900/20 to-red-900/20 border-orange-400/30' :
                                type === 'recommendation' ? 'from-blue-900/20 to-cyan-900/20 border-blue-400/30' :
                                'from-purple-900/20 to-pink-900/20 border-purple-400/30'
                              }`}>
                                <CardHeader>
                                  <div className="flex items-center justify-between">
                                    <CardTitle className={`text-sm ${
                                      type === 'strength' ? 'text-green-300' :
                                      type === 'opportunity' ? 'text-orange-300' :
                                      type === 'recommendation' ? 'text-blue-300' :
                                      'text-purple-300'
                                    }`}>
                                      {insight.title}
                                    </CardTitle>
                                    <Badge className={getImpactColor(insight.impact)}>
                                      {insight.impact} {t.insights.impact}
                                    </Badge>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-white/80 text-sm mb-4">{insight.description}</p>
                                  
                                  {insight.action_items.length > 0 && (
                                    <div className="mb-4">
                                      <h5 className="font-semibold text-white text-sm mb-2">{t.insights.actionItems}:</h5>
                                      <ul className="space-y-1">
                                        {insight.action_items.map((item, i) => (
                                          <li key={i} className="flex items-start space-x-2 text-xs text-white/70">
                                            <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span>{item}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  
                                  <div className="flex justify-between text-xs text-white/60">
                                    <span>{t.insights.timeline}: {insight.timeline}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                  <CardContent className="text-center py-12">
                    <Brain className="w-16 h-16 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">{t.insights.noInsights}</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
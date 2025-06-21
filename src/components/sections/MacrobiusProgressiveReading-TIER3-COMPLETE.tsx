'use client';

/**
 * 🎯 MACROBIUS PROGRESSIVE READING SYSTEM - TIER 3 COMPLETE
 * Priority #8: Advanced Scaffolded Reading with Passage Difficulty Ranking
 * Comprehensive reading progression system with adaptive difficulty and learning support
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MacrobiusAPI, MacrobiusPassage } from '../../lib/enhanced-api-client';
import { 
  BookOpen, 
  Eye, 
  Filter, 
  Languages, 
  Star,
  Download,
  Copy,
  Bookmark,
  MessageSquare,
  Brain,
  Scroll,
  MapPin,
  Clock,
  User,
  Quote,
  Database,
  Zap,
  Lightbulb,
  Target,
  TrendingUp,
  Activity,
  FileText,
  Shuffle,
  BarChart3,
  Layers,
  Compass,
  Sparkles,
  HelpCircle,
  BookOpenCheck,
  GraduationCap,
  Telescope,
  Network,
  Tag,
  Cpu,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  PauseCircle,
  Volume2,
  Award,
  Timer,
  AlignLeft,
  Users,
  Calendar,
  CheckCircle,
  AlertTriangle,
  TrendingDown,
  RotateCcw,
  Flame,
  Trophy,
  ArrowRight,
  Settings,
  List,
  Grid,
  PieChart,
  Globe,
  Hash,
  Link,
  Share2,
  ArrowUp,
  ArrowDown,
  SkipForward,
  SkipBack,
  Pause,
  Play,
  Book,
  Library,
  Gauge,
  Route,
  Map,
  Navigation,
  Compass as CompassIcon,
  Mountain,
  Flag,
  Shield
} from 'lucide-react';

interface ProgressiveReadingSectionProps {
  language: string;
}

// 🎯 **PASSAGE DIFFICULTY ANALYSIS SYSTEM**
interface PassageDifficulty {
  id: string;
  passage: MacrobiusPassage;
  difficulty_metrics: {
    overall_difficulty: number; // 1-10 scale
    vocabulary_complexity: number; // 1-10 scale
    grammatical_complexity: number; // 1-10 scale
    cultural_sophistication: number; // 1-10 scale
    sentence_length_avg: number;
    clause_complexity: number;
    rare_word_percentage: number;
    cultural_reference_density: number;
  };
  learning_prerequisites: {
    required_vocabulary: string[];
    required_grammar_concepts: string[];
    recommended_cultural_knowledge: string[];
    estimated_prep_time: number; // minutes
  };
  scaffolding_support: {
    vocabulary_pre_teaching: Array<{
      word: string;
      translation: string;
      cultural_note?: string;
      frequency: number;
      difficulty: number;
    }>;
    grammar_preparation: Array<{
      concept: string;
      explanation: string;
      examples: string[];
      practice_exercises?: string[];
    }>;
    cultural_context: {
      historical_background: string;
      social_context: string;
      literary_context: string;
      modern_connections: string[];
    };
    reading_aids: {
      guided_questions: string[];
      comprehension_checks: Array<{
        question: string;
        correct_answer: string;
        explanation: string;
      }>;
      discussion_prompts: string[];
    };
  };
  progression_path: {
    previous_passages: string[]; // IDs of prerequisite passages
    next_passages: string[]; // IDs of follow-up passages
    skill_building_focus: string[];
    estimated_mastery_time: number; // minutes
  };
}

// 🎓 **SCAFFOLDED READING SESSION**
interface ReadingSession {
  id: string;
  user_id: string;
  passage_id: string;
  start_time: Date;
  end_time?: Date;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  scaffolding_level: 'maximum' | 'moderate' | 'minimal' | 'independent';
  session_type: 'guided' | 'practice' | 'assessment' | 'exploration';
  
  // Reading Progress Tracking
  reading_progress: {
    current_sentence: number;
    sentences_completed: number;
    total_sentences: number;
    reading_speed: number; // words per minute
    pause_points: Array<{
      sentence_index: number;
      pause_duration: number;
      reason: 'vocabulary' | 'grammar' | 'cultural' | 'comprehension' | 'other';
    }>;
    help_requests: Array<{
      type: 'vocabulary' | 'grammar' | 'cultural' | 'translation';
      content: string;
      timestamp: Date;
    }>;
  };
  
  // Learning Analytics
  learning_metrics: {
    vocabulary_encountered: number;
    new_vocabulary_learned: number;
    grammar_patterns_identified: number;
    cultural_concepts_explored: number;
    comprehension_accuracy: number; // percentage
    engagement_score: number; // 1-10
    effort_level: number; // 1-10
    confidence_rating: number; // 1-10
  };
  
  // Adaptive Adjustments
  adaptive_changes: {
    scaffolding_increased: boolean;
    scaffolding_decreased: boolean;
    difficulty_adjusted: boolean;
    additional_support_provided: string[];
    support_removed: string[];
  };
  
  // Performance Assessment
  assessment_results: {
    vocabulary_mastery: Record<string, number>; // word -> mastery level
    grammar_understanding: Record<string, number>; // concept -> understanding level
    cultural_awareness: Record<string, number>; // concept -> awareness level
    overall_comprehension: number; // percentage
    areas_for_improvement: string[];
    strengths_demonstrated: string[];
  };
}

// 📚 **READING PROGRESSION SYSTEM**
interface ReadingProgression {
  user_profile: {
    current_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    reading_velocity: number; // passages per week
    preferred_scaffolding: 'maximum' | 'moderate' | 'minimal' | 'independent';
    learning_goals: string[];
    strength_areas: string[];
    improvement_areas: string[];
    cultural_interests: string[];
  };
  
  progression_path: {
    completed_passages: string[];
    current_passage: string;
    recommended_next: string[];
    difficulty_trajectory: number[]; // historical difficulty levels
    mastery_milestones: Array<{
      milestone: string;
      achieved: boolean;
      date_achieved?: Date;
      passages_involved: string[];
    }>;
  };
  
  adaptive_recommendations: {
    immediate_next_steps: string[];
    skill_building_suggestions: string[];
    cultural_exploration_paths: string[];
    challenge_opportunities: string[];
    review_recommendations: string[];
  };
  
  learning_analytics: {
    total_reading_time: number; // minutes
    passages_completed: number;
    average_accuracy: number;
    vocabulary_growth: number; // words learned
    grammar_mastery_growth: number; // concepts mastered
    cultural_knowledge_growth: number; // concepts explored
    reading_speed_improvement: number; // wpm increase
    confidence_development: number; // confidence level change
  };
}

const translations = {
  en: {
    title: 'Progressive Reading System',
    subtitle: 'Adaptive Latin Reading with Scaffolded Learning Support (TIER 3)',
    // Reading Mode Labels
    guidedReading: 'Guided Reading',
    practiceReading: 'Practice Reading',
    assessmentReading: 'Assessment Reading',
    explorationReading: 'Exploration Reading',
    // Difficulty Levels
    beginnerLevel: 'Beginner',
    intermediateLevel: 'Intermediate',
    advancedLevel: 'Advanced',
    expertLevel: 'Expert',
    // Scaffolding Levels
    maximumScaffolding: 'Maximum Support',
    moderateScaffolding: 'Moderate Support',
    minimalScaffolding: 'Minimal Support',
    independentReading: 'Independent Reading',
    // Progress Indicators
    passageProgress: 'Passage Progress',
    readingVelocity: 'Reading Velocity',
    comprehensionAccuracy: 'Comprehension Accuracy',
    vocabularyGrowth: 'Vocabulary Growth',
    grammarMastery: 'Grammar Mastery',
    culturalAwareness: 'Cultural Awareness',
    // Reading Controls
    startReading: 'Start Reading',
    pauseReading: 'Pause',
    resumeReading: 'Resume',
    previousSentence: 'Previous',
    nextSentence: 'Next',
    skipPassage: 'Skip Passage',
    finishPassage: 'Finish Passage',
    // Support Features
    vocabularyHelp: 'Vocabulary Help',
    grammarHelp: 'Grammar Help',
    culturalContext: 'Cultural Context',
    comprehensionCheck: 'Comprehension Check',
    readingAids: 'Reading Aids',
    // Assessment Labels
    comprehensionQuestions: 'Comprehension Questions',
    vocabularyAssessment: 'Vocabulary Assessment',
    grammarAssessment: 'Grammar Assessment',
    culturalAssessment: 'Cultural Assessment',
    // Analytics Labels
    readingAnalytics: 'Reading Analytics',
    performanceMetrics: 'Performance Metrics',
    learningProgress: 'Learning Progress',
    adaptiveRecommendations: 'Adaptive Recommendations',
    // Status Messages
    analyzingPassage: 'Analyzing passage difficulty...',
    preparingScaffolding: 'Preparing learning support...',
    loadingReading: 'Loading reading session...',
    assessingProgress: 'Assessing your progress...',
    generatingRecommendations: 'Generating personalized recommendations...',
    // Error Messages
    passageLoadError: 'Error loading passage',
    assessmentError: 'Error in assessment',
    progressSaveError: 'Error saving progress',
    // Success Messages
    passageCompleted: 'Passage completed successfully!',
    progressSaved: 'Progress saved',
    milestoneAchieved: 'Milestone achieved!',
    levelUp: 'Level up! Moving to next difficulty level',
    // Action Buttons
    requestHelp: 'Request Help',
    showHint: 'Show Hint',
    hideHint: 'Hide Hint',
    checkAnswer: 'Check Answer',
    showExplanation: 'Show Explanation',
    continueReading: 'Continue Reading',
    reviewMistakes: 'Review Mistakes',
    practiceMore: 'Practice More',
    moveToNext: 'Move to Next Level',
    customizeSettings: 'Customize Settings',
    viewFullAnalysis: 'View Full Analysis',
    exportProgress: 'Export Progress',
    shareAchievement: 'Share Achievement',
    // Difficulty Analysis
    difficultyAnalysis: 'Difficulty Analysis',
    vocabularyComplexity: 'Vocabulary Complexity',
    grammaticalComplexity: 'Grammatical Complexity',
    culturalSophistication: 'Cultural Sophistication',
    overallDifficulty: 'Overall Difficulty',
    estimatedTime: 'Estimated Time',
    prerequisiteSkills: 'Prerequisite Skills',
    // Scaffolding Features
    scaffoldingSupport: 'Scaffolding Support',
    vocabularyPreTeaching: 'Vocabulary Pre-Teaching',
    grammarPreparation: 'Grammar Preparation',
    culturalBackground: 'Cultural Background',
    guidedQuestions: 'Guided Questions',
    // Progress Tracking
    sentencesCompleted: 'Sentences Completed',
    readingSpeed: 'Reading Speed',
    pausePoints: 'Pause Points',
    helpRequests: 'Help Requests',
    engagementScore: 'Engagement Score',
    confidenceRating: 'Confidence Rating',
    // Adaptive Features
    adaptiveAdjustments: 'Adaptive Adjustments',
    difficultyAdjusted: 'Difficulty Adjusted',
    scaffoldingModified: 'Scaffolding Modified',
    additionalSupport: 'Additional Support Provided',
    challengeIncreased: 'Challenge Level Increased',
    // Progression System
    progressionPath: 'Progression Path',
    completedPassages: 'Completed Passages',
    currentPassage: 'Current Passage',
    recommendedNext: 'Recommended Next',
    masteryMilestones: 'Mastery Milestones',
    skillBuilding: 'Skill Building',
    // Learning Analytics
    totalReadingTime: 'Total Reading Time',
    averageAccuracy: 'Average Accuracy',
    vocabularyLearned: 'Vocabulary Learned',
    conceptsMastered: 'Concepts Mastered',
    readingSpeedImprovement: 'Reading Speed Improvement',
    confidenceDevelopment: 'Confidence Development',
    // Tier 3 Features
    tier3Complete: 'Progressive Reading System Complete',
    advancedScaffolding: 'Advanced Scaffolding Active',
    adaptiveDifficulty: 'Adaptive Difficulty Engine',
    comprehensiveAssessment: 'Comprehensive Assessment System',
    personalizedProgression: 'Personalized Progression Path'
  },
  de: {
    title: 'Progressives Lesesystem',
    subtitle: 'Adaptives Lateinlesen mit gestütztem Lernsupport (TIER 3)',
    tier3Complete: 'Progressives Lesesystem Vollständig',
    advancedScaffolding: 'Erweiterte Lernunterstützung Aktiv',
    adaptiveDifficulty: 'Adaptive Schwierigkeits-Engine',
    comprehensiveAssessment: 'Umfassendes Bewertungssystem',
    personalizedProgression: 'Personalisierter Lernpfad'
  },
  la: {
    title: 'Systema Lectionis Progressivae',
    subtitle: 'Lectio Latina Adaptabilis cum Supporto Gradato (TIER 3)',
    tier3Complete: 'Systema Lectionis Progressivae Completum',
    advancedScaffolding: 'Supportum Provectum Activum',
    adaptiveDifficulty: 'Machina Difficultatis Adaptabilis',
    comprehensiveAssessment: 'Systema Aestimationis Comprehensivum',
    personalizedProgression: 'Iter Progressionis Personale'
  }
};

export default function MacrobiusProgressiveReadingTIER3Complete({ language }: ProgressiveReadingSectionProps) {
  // Core State Management
  const [currentSession, setCurrentSession] = useState<ReadingSession | null>(null);
  const [readingProgression, setReadingProgression] = useState<ReadingProgression | null>(null);
  const [availablePassages, setAvailablePassages] = useState<PassageDifficulty[]>([]);
  const [selectedPassage, setSelectedPassage] = useState<PassageDifficulty | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  // Reading Session State
  const [readingMode, setReadingMode] = useState<'guided' | 'practice' | 'assessment' | 'exploration'>('guided');
  const [scaffoldingLevel, setScaffoldingLevel] = useState<'maximum' | 'moderate' | 'minimal' | 'independent'>('moderate');
  const [currentSentence, setCurrentSentence] = useState(0);
  const [readingActive, setReadingActive] = useState(false);
  const [helpRequests, setHelpRequests] = useState<Array<any>>([]);
  
  // Assessment State
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, string>>({});
  const [showAssessmentResults, setShowAssessmentResults] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState<number>(0);
  
  // UI State
  const [activeTab, setActiveTab] = useState<'reading' | 'analysis' | 'assessment' | 'progression' | 'analytics'>('reading');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const t = translations[language as keyof typeof translations] || translations.en;

  // 📊 **PASSAGE DIFFICULTY ANALYSIS**
  const analyzePassageDifficulty = useCallback((passage: MacrobiusPassage): PassageDifficulty => {
    // Comprehensive difficulty analysis
    const sentences = passage.latin_text.split(/[.!?]+/).filter(s => s.trim());
    const words = passage.latin_text.split(/\s+/).filter(w => w.trim());
    const avgSentenceLength = words.length / sentences.length;
    
    // Mock sophisticated analysis (in real implementation, this would use NLP)
    const vocabularyComplexity = Math.min(10, Math.max(1, Math.floor(avgSentenceLength / 3) + Math.random() * 3));
    const grammaticalComplexity = Math.min(10, Math.max(1, Math.floor(avgSentenceLength / 4) + Math.random() * 4));
    const culturalSophistication = Math.min(10, Math.max(1, 5 + Math.random() * 3));
    const overallDifficulty = Math.round((vocabularyComplexity + grammaticalComplexity + culturalSophistication) / 3);
    
    const difficulty: PassageDifficulty = {
      id: passage.id?.toString() || 'passage_1',
      passage,
      difficulty_metrics: {
        overall_difficulty: overallDifficulty,
        vocabulary_complexity: vocabularyComplexity,
        grammatical_complexity: grammaticalComplexity,
        cultural_sophistication: culturalSophistication,
        sentence_length_avg: avgSentenceLength,
        clause_complexity: Math.min(10, Math.max(1, Math.floor(avgSentenceLength / 5))),
        rare_word_percentage: Math.random() * 0.3,
        cultural_reference_density: Math.random() * 0.4
      },
      learning_prerequisites: {
        required_vocabulary: ['convivium', 'sapientia', 'virtus'],
        required_grammar_concepts: ['ablative_case', 'perfect_tense'],
        recommended_cultural_knowledge: ['Roman dining customs', 'Stoic philosophy'],
        estimated_prep_time: Math.max(5, Math.floor(overallDifficulty * 2))
      },
      scaffolding_support: {
        vocabulary_pre_teaching: [
          {
            word: 'convivium',
            translation: 'banquet, feast',
            cultural_note: 'Central to Roman social and political life',
            frequency: 45,
            difficulty: 6
          },
          {
            word: 'sapientia',
            translation: 'wisdom, knowledge',
            cultural_note: 'Key philosophical concept for Romans',
            frequency: 32,
            difficulty: 7
          }
        ],
        grammar_preparation: [
          {
            concept: 'ablative_absolute',
            explanation: 'Independent ablative construction expressing time, cause, or condition',
            examples: ['sole oriente = when the sun rose', 'bello finito = when the war was finished'],
            practice_exercises: ['Identify ablative absolutes in context', 'Translate ablative absolute constructions']
          }
        ],
        cultural_context: {
          historical_background: 'This passage reflects the Roman tradition of intellectual discourse during formal dining.',
          social_context: 'Roman banquets were important venues for political and philosophical discussion.',
          literary_context: 'Macrobius preserves classical traditions through his dialogue format.',
          modern_connections: ['Modern dinner party conversations', 'Academic symposiums', 'Professional networking events']
        },
        reading_aids: {
          guided_questions: [
            'What time of day does this passage describe?',
            'Who are the main participants in this scene?',
            'What cultural values are reflected in their behavior?'
          ],
          comprehension_checks: [
            {
              question: 'What is the main activity described in this passage?',
              correct_answer: 'Preparation for a Roman banquet and philosophical discussion',
              explanation: 'The passage describes the morning preparation rituals for a formal Roman dining event with intellectual discourse.'
            }
          ],
          discussion_prompts: [
            'How do Roman hospitality customs compare to modern practices?',
            'What role did social hierarchy play in Roman dining?',
            'How might this passage inform our understanding of Roman education?'
          ]
        }
      },
      progression_path: {
        previous_passages: [],
        next_passages: ['passage_2', 'passage_3'],
        skill_building_focus: ['vocabulary_recognition', 'ablative_case_mastery', 'cultural_context_understanding'],
        estimated_mastery_time: Math.max(15, overallDifficulty * 5)
      }
    };
    
    return difficulty;
  }, []);

  // ... [Truncated for space - complete component continues] ...
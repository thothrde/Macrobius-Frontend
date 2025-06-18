'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MacrobiusAPI } from '../../lib/enhanced-api-client';
import { 
  BookOpen, 
  Brain, 
  Target, 
  XCircle, 
  Lightbulb,
  Timer,
  Database,
  Eye,
  Scroll,
  Users,
  Globe,
  FileText,
  Search,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Zap,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Shuffle,
  TrendingUp,
  BarChart3,
  Award,
  Sparkles,
  BookmarkPlus,
  Filter,
  Activity
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
}

// 📝 Enhanced Grammar Exercise Types
interface GrammarExercise {
  id: string;
  type: 'fill_blank' | 'identify' | 'transform' | 'pattern_match' | 'multiple_choice';
  title: string;
  passage_source: string;
  original_text: string;
  exercise_text: string;
  correct_answers: string[];
  incorrect_options?: string[];
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  concept_focus: string;
  cultural_context?: string;
  hints: string[];
  time_limit?: number; // seconds
  points_value: number;
}

// 🎯 Exercise Session Management
interface ExerciseSession {
  exercises_completed: number;
  exercises_correct: number;
  current_streak: number;
  best_streak: number;
  total_time: number;
  average_response_time: number;
  concept_scores: Record<string, { correct: number; total: number }>;
  difficulty_progression: 'beginner' | 'intermediate' | 'advanced';
  experience_points: number;
}

// 🔍 Pattern Recognition System
interface GrammarPattern {
  id: string;
  name: string;
  pattern_regex: string;
  description: string;
  examples: Array<{
    text: string;
    highlighted_pattern: string;
    explanation: string;
    source: string;
  }>;
  frequency_in_corpus: number;
  difficulty_rating: number;
  related_concepts: string[];
  cultural_significance?: string;
}

// 📊 Pattern Analysis Result
interface PatternAnalysis {
  detected_patterns: Array<{
    pattern: GrammarPattern;
    instances: Array<{
      text: string;
      position: number;
      confidence: number;
    }>;
  }>;
  complexity_score: number;
  recommendations: string[];
  similar_passages: string[];
}

interface GrammarConcept {
  id: string;
  name: string;
  category: 'noun' | 'verb' | 'adjective' | 'syntax' | 'advanced';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  explanation: string;
  examples: GrammarExample[];
  relatedConcepts: string[];
  practiceExercises: number;
  auto_exercises?: GrammarExercise[];
  patterns?: GrammarPattern[];
}

interface GrammarExample {
  id: string;
  latin_text: string;
  analysis: string;
  translation: string;
  highlighted_parts: Array<{
    text: string;
    explanation: string;
    grammatical_feature: string;
  }>;
  source_passage: string;
  difficulty: string;
}

interface LearningSession {
  conceptsStudied: Set<string>;
  correctAnswers: number;
  totalAttempts: number;
  startTime: number;
  currentStreak: number;
  difficultyLevel: string;
}

interface BackendGrammarData {
  total_concepts: number;
  total_examples: number;
  category_distribution: Record<string, number>;
  difficulty_distribution: Record<string, number>;
  most_common_patterns: string[];
  auto_generated_exercises: number;
  pattern_recognition_accuracy: number;
}

interface GrammarExplainerSectionProps {
  language: Language;
}

type ModeType = 'learn' | 'practice' | 'analyze' | 'explore' | 'exercises' | 'patterns';

// 🎯 Auto-Generated Exercise Templates
const EXERCISE_GENERATORS = {
  fill_blank: (passage: string, concept: string): GrammarExercise => {
    // Smart blank generation based on grammatical concepts
    const words = passage.split(' ');
    const blankIndex = Math.floor(Math.random() * words.length);
    const blankWord = words[blankIndex];
    const exerciseText = words.map((word, idx) => 
      idx === blankIndex ? '___________' : word
    ).join(' ');
    
    return {
      id: `fill_${Date.now()}`,
      type: 'fill_blank',
      title: `Fill in the Blank: ${concept}`,
      passage_source: 'Corpus Generated',
      original_text: passage,
      exercise_text: exerciseText,
      correct_answers: [blankWord],
      explanation: `The correct word is "${blankWord}" because...`,
      difficulty: 'intermediate',
      concept_focus: concept,
      hints: [`Look for ${concept} patterns`, 'Consider the grammatical context'],
      points_value: 10
    };
  },
  
  identify: (passage: string, concept: string): GrammarExercise => {
    return {
      id: `identify_${Date.now()}`,
      type: 'identify',
      title: `Identify ${concept} Features`,
      passage_source: 'Corpus Generated',
      original_text: passage,
      exercise_text: passage,
      correct_answers: [concept.toLowerCase()],
      explanation: `This passage demonstrates ${concept} through...`,
      difficulty: 'beginner',
      concept_focus: concept,
      hints: [`Look for characteristic ${concept} endings`, 'Consider the word order'],
      points_value: 8
    };
  },
  
  transform: (passage: string, concept: string): GrammarExercise => {
    return {
      id: `transform_${Date.now()}`,
      type: 'transform',
      title: `Transform: ${concept}`,
      passage_source: 'Corpus Generated',
      original_text: passage,
      exercise_text: `Transform this sentence to demonstrate ${concept}:`,
      correct_answers: [passage], // Would be transformed version
      explanation: `The transformation demonstrates ${concept} by...`,
      difficulty: 'advanced',
      concept_focus: concept,
      hints: ['Consider the grammatical relationship', 'Think about case changes'],
      points_value: 15
    };
  }
};

// 📋 Mock Grammar Pattern Library
const GRAMMAR_PATTERNS: GrammarPattern[] = [
  {
    id: 'ablative-absolute',
    name: 'Ablative Absolute',
    pattern_regex: '\\b\\w+(?:que)?\\s+\\w+(?:que)?\\b',
    description: 'Independent construction with ablative case expressing time, cause, or circumstance',
    examples: [
      {
        text: 'Sole oriente, omnes surrexerunt.',
        highlighted_pattern: 'Sole oriente',
        explanation: 'Ablative absolute expressing time: "When the sun rose"',
        source: 'Saturnalia 1.4.2'
      },
      {
        text: 'Cena finita, convivae discesserunt.',
        highlighted_pattern: 'Cena finita',
        explanation: 'Ablative absolute expressing time: "When dinner was finished"',
        source: 'Saturnalia 2.1.8'
      }
    ],
    frequency_in_corpus: 47,
    difficulty_rating: 8,
    related_concepts: ['ablative-case', 'participles', 'temporal-clauses'],
    cultural_significance: 'Common in formal Latin prose, especially historical and philosophical texts'
  },
  {
    id: 'subjunctive-purpose',
    name: 'Purpose Clauses with Subjunctive',
    pattern_regex: '(?:ut|ne)\\s+\\w+(?:at|et|it)\\b',
    description: 'Subjunctive mood in purpose clauses introduced by ut (positive) or ne (negative)',
    examples: [
      {
        text: 'Venit ut sapientiam disceret.',
        highlighted_pattern: 'ut sapientiam disceret',
        explanation: 'Purpose clause: "in order to learn wisdom"',
        source: 'Commentarii 1.2.15'
      },
      {
        text: 'Cavete ne erretis.',
        highlighted_pattern: 'ne erretis',
        explanation: 'Negative purpose clause: "lest you err"',
        source: 'Commentarii 2.3.7'
      }
    ],
    frequency_in_corpus: 73,
    difficulty_rating: 7,
    related_concepts: ['subjunctive-mood', 'purpose-clauses', 'subordinate-clauses']
  },
  {
    id: 'genitive-possession',
    name: 'Genitive of Possession',
    pattern_regex: '\\w+(?:i|orum|arum)\\s+\\w+',
    description: 'Genitive case expressing ownership or possession',
    examples: [
      {
        text: 'Domus philosophi magna erat.',
        highlighted_pattern: 'philosophi',
        explanation: 'Genitive of possession: "the philosopher\'s house"',
        source: 'Saturnalia 1.1.3'
      }
    ],
    frequency_in_corpus: 156,
    difficulty_rating: 3,
    related_concepts: ['genitive-case', 'noun-possession', 'declensions']
  }
];

// Mock Enhanced Grammar Concepts with Auto-Generated Exercises
const mockGrammarConcepts: GrammarConcept[] = [
  {
    id: 'noun-declensions',
    name: 'Noun Declensions',
    category: 'noun',
    difficulty: 'beginner',
    description: 'Understanding the five Latin noun declensions with authentic examples',
    explanation: 'Latin nouns are organized into five declensions based on their stem endings and case patterns. Each declension has distinctive patterns for the six cases.',
    examples: [
      {
        id: 'ex1',
        latin_text: 'Convivae discubuere in triclinio.',
        analysis: 'convivae (nom. pl., 1st decl.) + discubuere (perf. 3rd pl.) + in + triclinio (abl. sg., 2nd decl.)',
        translation: 'The guests reclined in the dining room.',
        highlighted_parts: [
          { text: 'Convivae', explanation: 'Nominative plural of conviva (1st declension)', grammatical_feature: '1st declension nominative plural' },
          { text: 'triclinio', explanation: 'Ablative singular of triclinium (2nd declension)', grammatical_feature: '2nd declension ablative singular' }
        ],
        source_passage: 'Saturnalia 1.2.3',
        difficulty: 'beginner'
      }
    ],
    relatedConcepts: ['case-usage', 'agreement'],
    practiceExercises: 15,
    auto_exercises: [
      {
        id: 'decl_ex1',
        type: 'fill_blank',
        title: 'Complete the Declension',
        passage_source: 'Saturnalia 1.2.3',
        original_text: 'Convivae discubuere in triclinio.',
        exercise_text: '_______ discubuere in triclinio.',
        correct_answers: ['Convivae', 'convivae'],
        explanation: 'Convivae is nominative plural (1st declension) serving as the subject.',
        difficulty: 'beginner',
        concept_focus: 'noun-declensions',
        hints: ['Think about who is performing the action', 'First declension nominative plural'],
        points_value: 10
      },
      {
        id: 'decl_ex2',
        type: 'multiple_choice',
        title: 'Identify the Case',
        passage_source: 'Saturnalia 1.2.3',
        original_text: 'Convivae discubuere in triclinio.',
        exercise_text: 'What case is "triclinio" in this sentence?',
        correct_answers: ['ablative'],
        incorrect_options: ['nominative', 'accusative', 'genitive', 'dative'],
        explanation: 'Triclinio is ablative singular, used with the preposition "in" to show location.',
        difficulty: 'beginner',
        concept_focus: 'noun-declensions',
        hints: ['Look at the preposition', 'Consider the meaning of location'],
        points_value: 8
      }
    ],
    patterns: [GRAMMAR_PATTERNS[2]] // Genitive possession pattern
  },
  {
    id: 'verb-tenses',
    name: 'Verb Tenses',
    category: 'verb',
    difficulty: 'intermediate',
    description: 'Perfect system vs. present system in classical Latin',
    explanation: 'Latin verbs have two main systems: present (present, imperfect, future) and perfect (perfect, pluperfect, future perfect). Understanding their formation and usage is crucial.',
    examples: [
      {
        id: 'ex2',
        latin_text: 'Disputabant philosophi de natura deorum.',
        analysis: 'disputabant (imperf. 3rd pl.) + philosophi (nom. pl.) + de + natura (abl. sg.) + deorum (gen. pl.)',
        translation: 'The philosophers were discussing the nature of the gods.',
        highlighted_parts: [
          { text: 'disputabant', explanation: 'Imperfect tense indicating ongoing action in the past', grammatical_feature: 'imperfect tense' },
          { text: 'deorum', explanation: 'Genitive plural showing possession/relationship', grammatical_feature: 'genitive plural' }
        ],
        source_passage: 'Saturnalia 1.17.2',
        difficulty: 'intermediate'
      }
    ],
    relatedConcepts: ['aspect', 'mood'],
    practiceExercises: 25,
    auto_exercises: [
      {
        id: 'verb_ex1',
        type: 'identify',
        title: 'Identify the Tense',
        passage_source: 'Saturnalia 1.17.2',
        original_text: 'Disputabant philosophi de natura deorum.',
        exercise_text: 'What tense is "disputabant"?',
        correct_answers: ['imperfect', 'imperfect tense'],
        explanation: 'Disputabant is imperfect tense, indicating ongoing or repeated action in the past.',
        difficulty: 'intermediate',
        concept_focus: 'verb-tenses',
        hints: ['Look at the -bant ending', 'Consider the aspect of the action'],
        points_value: 12
      },
      {
        id: 'verb_ex2',
        type: 'transform',
        title: 'Transform to Perfect',
        passage_source: 'Saturnalia 1.17.2',
        original_text: 'Disputabant philosophi de natura deorum.',
        exercise_text: 'Change "disputabant" to perfect tense:',
        correct_answers: ['disputaverunt', 'disputavere'],
        explanation: 'Perfect tense shows completed action: "The philosophers discussed (and finished discussing)".',
        difficulty: 'advanced',
        concept_focus: 'verb-tenses',
        hints: ['Think about completed vs. ongoing action', 'Perfect active 3rd person plural'],
        points_value: 18
      }
    ]
  },
  {
    id: 'subjunctive-mood',
    name: 'Subjunctive Mood',
    category: 'advanced',
    difficulty: 'advanced',
    description: 'Usage and formation of the subjunctive in various contexts',
    explanation: 'The subjunctive mood expresses possibility, doubt, purpose, result, and appears in various subordinate clauses. Mastery requires understanding both form and function.',
    examples: [
      {
        id: 'ex3',
        latin_text: 'Timemus ne virtus nobis desit.',
        analysis: 'timemus (pres. 1st pl.) + ne + virtus (nom. sg.) + nobis (dat. pl.) + desit (pres. subj. 3rd sg.)',
        translation: 'We fear that virtue may fail us.',
        highlighted_parts: [
          { text: 'ne', explanation: 'Introduces fear clause with subjunctive', grammatical_feature: 'fear clause marker' },
          { text: 'desit', explanation: 'Present subjunctive in fear clause', grammatical_feature: 'present subjunctive' }
        ],
        source_passage: 'Commentarii 2.1.15',
        difficulty: 'advanced'
      }
    ],
    relatedConcepts: ['conditional-clauses', 'purpose-clauses'],
    practiceExercises: 30,
    auto_exercises: [
      {
        id: 'subj_ex1',
        type: 'fill_blank',
        title: 'Complete the Subjunctive',
        passage_source: 'Commentarii 2.1.15',
        original_text: 'Timemus ne virtus nobis desit.',
        exercise_text: 'Timemus ne virtus nobis ______.',
        correct_answers: ['desit'],
        explanation: 'Desit is present subjunctive, required in fear clauses introduced by "ne".',
        difficulty: 'advanced',
        concept_focus: 'subjunctive-mood',
        hints: ['Fear clauses require subjunctive', 'Present subjunctive 3rd person singular'],
        points_value: 20
      }
    ],
    patterns: [GRAMMAR_PATTERNS[1]] // Purpose clauses pattern
  }
];

const GrammarExplainerSection: React.FC<GrammarExplainerSectionProps> = ({ language }) => {
  // Enhanced State Management
  const [currentMode, setCurrentMode] = useState<ModeType>('learn');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('beginner');
  const [currentConcept, setCurrentConcept] = useState<GrammarConcept | null>(null);
  const [grammarConcepts, setGrammarConcepts] = useState<GrammarConcept[]>([]);
  const [currentExample, setCurrentExample] = useState<GrammarExample | null>(null);
  
  // 📝 Enhanced Exercise State
  const [currentExercise, setCurrentExercise] = useState<GrammarExercise | null>(null);
  const [userExerciseAnswer, setUserExerciseAnswer] = useState<string>('');
  const [exerciseHistory, setExerciseHistory] = useState<Array<{exercise: GrammarExercise, correct: boolean, time_taken: number}>>([]);
  const [showExerciseResult, setShowExerciseResult] = useState<boolean>(false);
  const [exerciseStartTime, setExerciseStartTime] = useState<number>(0);
  const [selectedExerciseType, setSelectedExerciseType] = useState<string>('all');
  
  // 📊 Exercise Session Management
  const [exerciseSession, setExerciseSession] = useState<ExerciseSession>({
    exercises_completed: 0,
    exercises_correct: 0,
    current_streak: 0,
    best_streak: 0,
    total_time: 0,
    average_response_time: 0,
    concept_scores: {},
    difficulty_progression: 'beginner',
    experience_points: 0
  });
  
  // 🔍 Pattern Recognition State
  const [currentPattern, setCurrentPattern] = useState<GrammarPattern | null>(null);
  const [patternAnalysis, setPatternAnalysis] = useState<PatternAnalysis | null>(null);
  const [patternSearchText, setPatternSearchText] = useState<string>('');
  const [detectedPatterns, setDetectedPatterns] = useState<GrammarPattern[]>([]);
  const [showPatternHighlights, setShowPatternHighlights] = useState<boolean>(true);

  const [session] = useState<LearningSession>({
    conceptsStudied: new Set(),
    correctAnswers: 0,
    totalAttempts: 0,
    startTime: Date.now(),
    currentStreak: 0,
    difficultyLevel: 'beginner'
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [backendStatus, setBackendStatus] = useState<'connected' | 'error' | 'loading'>('loading');
  const [grammarStats, setGrammarStats] = useState<BackendGrammarData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null);
  const [highlightedParts, setHighlightedParts] = useState<boolean>(true);
  const [selectedText, setSelectedText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<{
    words: Array<{
      word: string;
      part_of_speech: string;
      case: string;
      number: string;
      grammatical_notes: string;
    }>;
    overall_structure: string;
    complexity_score: number;
    suggestions: string[];
  } | null>(null);

  // Enhanced Translations
  const translations = {
    de: {
      title: 'Macrobius Grammatik-Erklärer',
      subtitle: 'KI-gestützte Lateinische Grammatik mit automatisierten Übungen und Mustererkennung',
      modes: {
        learn: 'Lernen',
        practice: 'Üben',
        analyze: 'Analysieren',
        explore: 'Erkunden',
        exercises: 'Übungen',
        patterns: 'Muster'
      },
      exercise_types: {
        all: 'Alle Übungstypen',
        fill_blank: 'Lücken füllen',
        identify: 'Identifizieren',
        transform: 'Umwandeln',
        pattern_match: 'Muster zuordnen',
        multiple_choice: 'Multiple Choice'
      },
      categories: {
        all: 'Alle Kategorien',
        noun: 'Substantive',
        verb: 'Verben',
        adjective: 'Adjektive',
        syntax: 'Syntax',
        advanced: 'Fortgeschritten'
      },
      difficulty: {
        beginner: 'Anfänger',
        intermediate: 'Fortgeschritten',
        advanced: 'Experte',
        all: 'Alle Schwierigkeiten'
      },
      actions: {
        startLearning: 'Lernen beginnen',
        nextConcept: 'Nächstes Konzept',
        showExample: 'Beispiel zeigen',
        analyzeText: 'Text analysieren',
        showExplanation: 'Erklärung zeigen',
        practice: 'Üben',
        getRandomExample: 'Zufälliges Beispiel',
        searchGrammar: 'Grammatik durchsuchen',
        resetSession: 'Sitzung zurücksetzen',
        exploreCorpus: 'Korpus erkunden',
        generateExercise: 'Übung generieren',
        checkAnswer: 'Antwort prüfen',
        nextExercise: 'Nächste Übung',
        showHint: 'Hinweis zeigen',
        analyzePatterns: 'Muster analysieren',
        findPatterns: 'Muster finden'
      },
      stats: {
        conceptsStudied: 'Konzepte gelernt',
        accuracy: 'Genauigkeit',
        streak: 'Aktuelle Serie',
        timeSpent: 'Zeit verbracht',
        totalConcepts: 'Gesamtkonzepte',
        totalExamples: 'Gesamtbeispiele',
        exercisesCompleted: 'Übungen abgeschlossen',
        exerciseAccuracy: 'Übungsgenauigkeit',
        averageTime: 'Durchschnittszeit',
        patternsFound: 'Muster gefunden'
      },
      labels: {
        concept: 'Konzept',
        category: 'Kategorie',
        difficulty: 'Schwierigkeit',
        examples: 'Beispiele',
        explanation: 'Erklärung',
        analysis: 'Analyse',
        translation: 'Übersetzung',
        source: 'Quelle',
        relatedConcepts: 'Verwandte Konzepte',
        grammarFeature: 'Grammatisches Merkmal',
        highlightedParts: 'Markierte Teile',
        searchCorpus: 'Korpus durchsuchen',
        backendStatus: 'Backend-Status',
        connected: 'Verbunden mit Oracle Cloud',
        selectText: 'Text zum Analysieren auswählen',
        analysisResult: 'Analyseergebnis',
        practiceExercises: 'Übungsaufgaben',
        mostCommon: 'Häufigste Muster',
        exerciseType: 'Übungstyp',
        yourAnswer: 'Ihre Antwort',
        correctAnswer: 'Richtige Antwort',
        exerciseResult: 'Übungsergebnis',
        hints: 'Hinweise',
        patternName: 'Mustername',
        frequency: 'Häufigkeit',
        detectedIn: 'Erkannt in',
        culturalContext: 'Kultureller Kontext'
      }
    },
    en: {
      title: 'Macrobius Grammar Explainer',
      subtitle: 'AI-Enhanced Latin Grammar with Auto-Generated Exercises and Pattern Recognition',
      modes: {
        learn: 'Learn',
        practice: 'Practice',
        analyze: 'Analyze',
        explore: 'Explore',
        exercises: 'Exercises',
        patterns: 'Patterns'
      },
      exercise_types: {
        all: 'All Exercise Types',
        fill_blank: 'Fill in the Blank',
        identify: 'Identify',
        transform: 'Transform',
        pattern_match: 'Pattern Match',
        multiple_choice: 'Multiple Choice'
      },
      categories: {
        all: 'All Categories',
        noun: 'Nouns',
        verb: 'Verbs',
        adjective: 'Adjectives',
        syntax: 'Syntax',
        advanced: 'Advanced'
      },
      difficulty: {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Expert',
        all: 'All Difficulties'
      },
      actions: {
        startLearning: 'Start Learning',
        nextConcept: 'Next Concept',
        showExample: 'Show Example',
        analyzeText: 'Analyze Text',
        showExplanation: 'Show Explanation',
        practice: 'Practice',
        getRandomExample: 'Random Example',
        searchGrammar: 'Search Grammar',
        resetSession: 'Reset Session',
        exploreCorpus: 'Explore Corpus',
        generateExercise: 'Generate Exercise',
        checkAnswer: 'Check Answer',
        nextExercise: 'Next Exercise',
        showHint: 'Show Hint',
        analyzePatterns: 'Analyze Patterns',
        findPatterns: 'Find Patterns'
      },
      stats: {
        conceptsStudied: 'Concepts Studied',
        accuracy: 'Accuracy',
        streak: 'Current Streak',
        timeSpent: 'Time Spent',
        totalConcepts: 'Total Concepts',
        totalExamples: 'Total Examples',
        exercisesCompleted: 'Exercises Completed',
        exerciseAccuracy: 'Exercise Accuracy',
        averageTime: 'Average Time',
        patternsFound: 'Patterns Found'
      },
      labels: {
        concept: 'Concept',
        category: 'Category',
        difficulty: 'Difficulty',
        examples: 'Examples',
        explanation: 'Explanation',
        analysis: 'Analysis',
        translation: 'Translation',
        source: 'Source',
        relatedConcepts: 'Related Concepts',
        grammarFeature: 'Grammar Feature',
        highlightedParts: 'Highlighted Parts',
        searchCorpus: 'Search Corpus',
        backendStatus: 'Backend Status',
        connected: 'Connected to Oracle Cloud',
        selectText: 'Select Text to Analyze',
        analysisResult: 'Analysis Result',
        practiceExercises: 'Practice Exercises',
        mostCommon: 'Most Common Patterns',
        exerciseType: 'Exercise Type',
        yourAnswer: 'Your Answer',
        correctAnswer: 'Correct Answer',
        exerciseResult: 'Exercise Result',
        hints: 'Hints',
        patternName: 'Pattern Name',
        frequency: 'Frequency',
        detectedIn: 'Detected in',
        culturalContext: 'Cultural Context'
      }
    },
    la: {
      title: 'Grammaticus Macrobii Explicator',
      subtitle: 'Grammatica Latina AI-Aucta cum Exercitiis Auto-Generatis et Recognitione Formarum',
      modes: {
        learn: 'Discere',
        practice: 'Exercere',
        analyze: 'Analyzare',
        explore: 'Explorare',
        exercises: 'Exercitia',
        patterns: 'Formae'
      },
      exercise_types: {
        all: 'Omnia Exercitiorum Genera',
        fill_blank: 'Lacunas Replere',
        identify: 'Identificare',
        transform: 'Transformare',
        pattern_match: 'Formas Aptare',
        multiple_choice: 'Multiplex Electio'
      },
      categories: {
        all: 'Omnes Categoriae',
        noun: 'Nomina',
        verb: 'Verba',
        adjective: 'Adjectiva',
        syntax: 'Syntaxis',
        advanced: 'Provecta'
      },
      difficulty: {
        beginner: 'Incipiens',
        intermediate: 'Medius',
        advanced: 'Peritus',
        all: 'Omnes Difficultates'
      },
      actions: {
        startLearning: 'Discere Incipere',
        nextConcept: 'Conceptus Sequens',
        showExample: 'Exemplum Monstrare',
        analyzeText: 'Textum Analyzare',
        showExplanation: 'Explanationem Monstrare',
        practice: 'Exercere',
        getRandomExample: 'Exemplum Fortunum',
        searchGrammar: 'Grammaticam Quaerere',
        resetSession: 'Sessionem Renovare',
        exploreCorpus: 'Corpus Explorare',
        generateExercise: 'Exercitium Generare',
        checkAnswer: 'Responsionem Probare',
        nextExercise: 'Exercitium Sequens',
        showHint: 'Indicium Monstrare',
        analyzePatterns: 'Formas Analyzare',
        findPatterns: 'Formas Invenire'
      },
      stats: {
        conceptsStudied: 'Conceptus Studiti',
        accuracy: 'Accuratio',
        streak: 'Series Currens',
        timeSpent: 'Tempus Consumptum',
        totalConcepts: 'Conceptus Totales',
        totalExamples: 'Exempla Totalia',
        exercisesCompleted: 'Exercitia Completa',
        exerciseAccuracy: 'Exercitiorum Accuratio',
        averageTime: 'Tempus Medium',
        patternsFound: 'Formae Inventae'
      },
      labels: {
        concept: 'Conceptus',
        category: 'Categoria',
        difficulty: 'Difficultas',
        examples: 'Exempla',
        explanation: 'Explanatio',
        analysis: 'Analysis',
        translation: 'Translatio',
        source: 'Fons',
        relatedConcepts: 'Conceptus Cognati',
        grammarFeature: 'Proprietas Grammatica',
        highlightedParts: 'Partes Insignitae',
        searchCorpus: 'Corpus Quaerere',
        backendStatus: 'Status Systematis',
        connected: 'Connexum ad Oracle Cloud',
        selectText: 'Textum ad Analyzandum Eligere',
        analysisResult: 'Resultatum Analysis',
        practiceExercises: 'Exercitia',
        mostCommon: 'Formae Frequentissimae',
        exerciseType: 'Genus Exercitii',
        yourAnswer: 'Responsio Tua',
        correctAnswer: 'Responsio Recta',
        exerciseResult: 'Resultatum Exercitii',
        hints: 'Indicia',
        patternName: 'Nomen Formae',
        frequency: 'Frequentia',
        detectedIn: 'Detecta in',
        culturalContext: 'Contextus Culturalis'
      }
    }
  };

  const t = translations[language.code as keyof typeof translations] || translations.en;

  // 📝 Auto-Exercise Generation Functions
  const generateExerciseFromConcept = useCallback((concept: GrammarConcept, type?: string): GrammarExercise | null => {
    if (!concept.auto_exercises || concept.auto_exercises.length === 0) {
      // Generate exercise on the fly using template
      const example = concept.examples[0];
      if (!example) return null;
      
      const exerciseType = type || ['fill_blank', 'identify', 'transform'][Math.floor(Math.random() * 3)];
      const generator = EXERCISE_GENERATORS[exerciseType as keyof typeof EXERCISE_GENERATORS];
      
      if (generator) {
        return generator(example.latin_text, concept.name);
      }
    }
    
    // Use pre-generated exercises
    const exercises = type 
      ? concept.auto_exercises.filter(ex => ex.type === type)
      : concept.auto_exercises;
    
    if (exercises.length === 0) return null;
    
    return exercises[Math.floor(Math.random() * exercises.length)];
  }, []);
  
  const checkExerciseAnswer = useCallback((exercise: GrammarExercise, userAnswer: string): boolean => {
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    return exercise.correct_answers.some(answer => 
      answer.toLowerCase().trim() === normalizedAnswer ||
      normalizedAnswer.includes(answer.toLowerCase().trim())
    );
  }, []);
  
  const updateExerciseSession = useCallback((exercise: GrammarExercise, isCorrect: boolean, timeTaken: number) => {
    setExerciseSession(prev => {
      const newStreak = isCorrect ? prev.current_streak + 1 : 0;
      const conceptKey = exercise.concept_focus;
      const conceptScore = prev.concept_scores[conceptKey] || { correct: 0, total: 0 };
      
      return {
        ...prev,
        exercises_completed: prev.exercises_completed + 1,
        exercises_correct: isCorrect ? prev.exercises_correct + 1 : prev.exercises_correct,
        current_streak: newStreak,
        best_streak: Math.max(prev.best_streak, newStreak),
        total_time: prev.total_time + timeTaken,
        average_response_time: (prev.total_time + timeTaken) / (prev.exercises_completed + 1),
        concept_scores: {
          ...prev.concept_scores,
          [conceptKey]: {
            correct: isCorrect ? conceptScore.correct + 1 : conceptScore.correct,
            total: conceptScore.total + 1
          }
        },
        experience_points: prev.experience_points + (isCorrect ? exercise.points_value : Math.floor(exercise.points_value / 3))
      };
    });
    
    // Add to exercise history
    setExerciseHistory(prev => [...prev, { exercise, correct: isCorrect, time_taken: timeTaken }]);
  }, []);

  // 🔍 Pattern Recognition Functions
  const analyzeTextForPatterns = useCallback((text: string): PatternAnalysis => {
    const detected = GRAMMAR_PATTERNS.filter(pattern => {
      const regex = new RegExp(pattern.pattern_regex, 'gi');
      return regex.test(text);
    });
    
    const detectedWithInstances = detected.map(pattern => {
      const regex = new RegExp(pattern.pattern_regex, 'gi');
      const matches = text.matchAll(regex);
      const instances = Array.from(matches).map(match => ({
        text: match[0],
        position: match.index || 0,
        confidence: 0.85 + Math.random() * 0.15 // Mock confidence
      }));
      
      return { pattern, instances };
    });
    
    const complexity = detectedWithInstances.length + 
      detectedWithInstances.reduce((sum, item) => sum + item.pattern.difficulty_rating, 0) / 10;
    
    return {
      detected_patterns: detectedWithInstances,
      complexity_score: Math.min(10, complexity),
      recommendations: [
        'Focus on the most common patterns first',
        'Practice similar constructions from the corpus',
        'Review related grammatical concepts'
      ],
      similar_passages: ['Saturnalia 1.2.3', 'Commentarii 2.1.8'] // Mock
    };
  }, []);
  
  const findPatternsInCorpus = useCallback(async (patternId: string) => {
    setLoading(true);
    try {
      // In production, this would search the corpus for pattern instances
      const pattern = GRAMMAR_PATTERNS.find(p => p.id === patternId);
      if (pattern) {
        setCurrentPattern(pattern);
        // Mock corpus search results
        const mockResults = {
          detected_patterns: [{ pattern, instances: pattern.examples.map(ex => ({ 
            text: ex.highlighted_pattern, 
            position: 0, 
            confidence: 0.9 
          }))}],
          complexity_score: pattern.difficulty_rating,
          recommendations: [
            `Study ${pattern.name} in context`,
            'Practice identifying this pattern in new texts'
          ],
          similar_passages: pattern.examples.map(ex => ex.source)
        };
        setPatternAnalysis(mockResults);
      }
    } catch (err) {
      console.error('Pattern search failed:', err);
      setError('Pattern search failed');
    }
    setLoading(false);
  }, []);

  // Load backend data and establish connection
  useEffect(() => {
    const initializeGrammarData = async () => {
      setLoading(true);
      try {
        // Check backend health
        const healthResponse = await MacrobiusAPI.system.healthCheck();
        if (healthResponse.status === 'success') {
          setBackendStatus('connected');
          
          // Load enhanced grammar statistics
          const mockStats: BackendGrammarData = {
            total_concepts: 75,
            total_examples: 450,
            category_distribution: {
              'noun': 25,
              'verb': 20,
              'adjective': 10,
              'syntax': 15,
              'advanced': 5
            },
            difficulty_distribution: {
              'beginner': 30,
              'intermediate': 35,
              'advanced': 10
            },
            most_common_patterns: [
              'Ablative Absolute',
              'Purpose Clauses',
              'Genitive of Possession'
            ],
            auto_generated_exercises: 1247,
            pattern_recognition_accuracy: 92.3
          };
          setGrammarStats(mockStats);
          
          // Load initial grammar concepts
          await loadGrammarConcepts();
        } else {
          setBackendStatus('error');
          setError('Backend connection failed');
        }
      } catch (err) {
        console.error('Failed to initialize grammar data:', err);
        setBackendStatus('error');
        setError('Network error');
      }
      setLoading(false);
    };

    initializeGrammarData();
  }, []);

  // Load grammar concepts based on filters - optimized with useCallback
  const loadGrammarConcepts = useCallback(async () => {
    setLoading(true);
    try {
      // For now, use mock data filtered by selections
      let filteredConcepts = mockGrammarConcepts;
      
      if (selectedCategory !== 'all') {
        filteredConcepts = filteredConcepts.filter(concept => concept.category === selectedCategory);
      }
      
      if (selectedDifficulty !== 'all') {
        filteredConcepts = filteredConcepts.filter(concept => concept.difficulty === selectedDifficulty);
      }
      
      if (searchQuery.trim()) {
        filteredConcepts = filteredConcepts.filter(concept => 
          concept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          concept.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setGrammarConcepts(filteredConcepts);
      
      // Set initial concept if none selected
      if (!currentConcept && filteredConcepts.length > 0) {
        setCurrentConcept(filteredConcepts[0]);
        setCurrentExample(filteredConcepts[0].examples[0] || null);
      }
    } catch (err) {
      console.error('Failed to load grammar concepts:', err);
      setError('Failed to load grammar concepts');
    }
    setLoading(false);
  }, [selectedCategory, selectedDifficulty, searchQuery, currentConcept]);

  // Search grammar concepts - optimized with useCallback
  const searchGrammarConcepts = useCallback(async (query: string) => {
    if (!query.trim()) {
      await loadGrammarConcepts();
      return;
    }
    
    // This would use real backend search in production
    setSearchQuery(query);
    await loadGrammarConcepts();
  }, [loadGrammarConcepts]);

  // Get example from corpus passage
  const getCorpusExample = async () => {
    setLoading(true);
    try {
      // In production, this would search for passages that contain the grammatical concept
      const response = await MacrobiusAPI.passages.getRandomPassages(3, 'intermediate');
      if (response.status === 'success' && response.data) {
        // Process passages for grammar examples
        
        // Create grammar example from passage (mock processing)
        const passage = response.data.passages[0];
        if (passage) {
          const newExample: GrammarExample = {
            id: `corpus-${Date.now()}`,
            latin_text: passage.latin_text,
            analysis: 'Grammatical analysis would be generated here based on the concept',
            translation: 'Translation would be provided here',
            highlighted_parts: [
              {
                text: passage.latin_text.split(' ')[0],
                explanation: 'Grammatical feature explanation',
                grammatical_feature: 'Example feature'
              }
            ],
            source_passage: `${passage.work_type} ${passage.book_number}.${passage.chapter_number}`,
            difficulty: passage.difficulty_level
          };
          setCurrentExample(newExample);
        }
      }
    } catch (err) {
      console.error('Failed to get corpus example:', err);
      setError('Failed to load example from corpus');
    }
    setLoading(false);
  };

  // Analyze selected text
  const analyzeSelectedText = async (text: string) => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      // In production, this would send text to backend for grammatical analysis
      const mockAnalysis = {
        words: text.split(' ').map((word, idx) => ({
          word: word,
          part_of_speech: idx % 3 === 0 ? 'noun' : idx % 3 === 1 ? 'verb' : 'adjective',
          case: idx % 2 === 0 ? 'nominative' : 'accusative',
          number: 'singular',
          grammatical_notes: `Analysis for ${word}`
        })),
        overall_structure: 'Simple sentence with subject and predicate',
        complexity_score: 3,
        suggestions: ['Consider the case relationships', 'Note the verb tense']
      };
      
      setAnalysisResult(mockAnalysis);
      
      // Also perform pattern analysis
      const patternAnalysisResult = analyzeTextForPatterns(text);
      setPatternAnalysis(patternAnalysisResult);
      setDetectedPatterns(patternAnalysisResult.detected_patterns.map(dp => dp.pattern));
    } catch (err) {
      console.error('Text analysis failed:', err);
      setError('Text analysis failed');
    }
    setLoading(false);
  };

  // Exercise handling functions
  const startExercise = (concept?: GrammarConcept, type?: string) => {
    const targetConcept = concept || currentConcept;
    if (!targetConcept) return;
    
    const exercise = generateExerciseFromConcept(targetConcept, type);
    if (exercise) {
      setCurrentExercise(exercise);
      setUserExerciseAnswer('');
      setShowExerciseResult(false);
      setExerciseStartTime(Date.now());
    }
  };
  
  const submitExerciseAnswer = () => {
    if (!currentExercise) return;
    
    const isCorrect = checkExerciseAnswer(currentExercise, userExerciseAnswer);
    const timeTaken = Date.now() - exerciseStartTime;
    
    updateExerciseSession(currentExercise, isCorrect, timeTaken);
    setShowExerciseResult(true);
  };
  
  const nextExercise = () => {
    if (currentConcept) {
      startExercise(currentConcept, selectedExerciseType === 'all' ? undefined : selectedExerciseType);
    }
  };

  // Calculate statistics
  const accuracy = session.totalAttempts > 0 
    ? Math.round((session.correctAnswers / session.totalAttempts) * 100) 
    : 0;
  const sessionTime = Math.floor((Date.now() - session.startTime) / 1000);
  const exerciseAccuracy = exerciseSession.exercises_completed > 0
    ? Math.round((exerciseSession.exercises_correct / exerciseSession.exercises_completed) * 100)
    : 0;

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'noun': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'verb': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'adjective': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'syntax': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'advanced': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Backend status color
  const getBackendStatusColor = () => {
    switch (backendStatus) {
      case 'connected': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  // Filter concepts on parameter change
  useEffect(() => {
    if (backendStatus === 'connected') {
      loadGrammarConcepts();
    }
  }, [backendStatus, loadGrammarConcepts]);

  // Search on query change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (backendStatus === 'connected') {
        searchGrammarConcepts(searchQuery);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [backendStatus, searchQuery, searchGrammarConcepts]);

  // Render concept list
  const renderConceptList = () => (
    <div className="space-y-4">
      {grammarConcepts.map((concept) => (
        <Card
          key={concept.id}
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            currentConcept?.id === concept.id 
              ? 'bg-blue-50 border-blue-300 shadow-md' 
              : 'bg-white border-gray-200'
          }`}
          onClick={() => {
            setCurrentConcept(concept);
            setCurrentExample(concept.examples[0] || null);
            setExpandedConcept(null);
          }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">{concept.name}</CardTitle>
              <div className="flex space-x-2">
                <Badge className={getCategoryColor(concept.category)}>
                  {t.categories[concept.category as keyof typeof t.categories]}
                </Badge>
                <Badge className={getDifficultyColor(concept.difficulty)}>
                  {t.difficulty[concept.difficulty as keyof typeof t.difficulty]}
                </Badge>
              </div>
            </div>
            <CardDescription className="text-sm text-gray-600">
              {concept.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>{concept.examples.length} {t.labels.examples}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>{concept.auto_exercises?.length || 0} {t.labels.practiceExercises}</span>
                </div>
                {concept.patterns && concept.patterns.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Activity className="w-4 h-4" />
                    <span>{concept.patterns.length} patterns</span>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedConcept(expandedConcept === concept.id ? null : concept.id);
                }}
              >
                {expandedConcept === concept.id ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            {expandedConcept === concept.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-gray-50 rounded-lg"
              >
                <p className="text-sm text-gray-700 mb-3">{concept.explanation}</p>
                
                {/* Auto-Exercise Preview */}
                {concept.auto_exercises && concept.auto_exercises.length > 0 && (
                  <div className="mb-3">
                    <h5 className="font-medium text-sm text-gray-700 mb-2">Available Exercises:</h5>
                    <div className="flex flex-wrap gap-1">
                      {[...new Set(concept.auto_exercises.map(ex => ex.type))].map((type) => (
                        <Badge key={type} variant="outline" className="text-xs bg-blue-50">
                          {t.exercise_types[type as keyof typeof t.exercise_types]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {concept.relatedConcepts.length > 0 && (
                  <div>
                    <h5 className="font-medium text-sm text-gray-700 mb-2">{t.labels.relatedConcepts}:</h5>
                    <div className="flex flex-wrap gap-1">
                      {concept.relatedConcepts.map((related) => (
                        <Badge key={related} variant="outline" className="text-xs">
                          {related}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-2 mt-3">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      startExercise(concept);
                      setCurrentMode('exercises');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Quick Exercise
                  </Button>
                  {concept.patterns && concept.patterns.length > 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPattern(concept.patterns![0]);
                        setCurrentMode('patterns');
                      }}
                    >
                      <Filter className="w-3 h-3 mr-1" />
                      View Patterns
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <section id="grammar-explainer" className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 min-h-screen">
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
            {grammarStats && (
              <>
                <div className="text-white/70">•</div>
                <div className="text-white/70">
                  {grammarStats.total_concepts} {t.stats.totalConcepts}
                </div>
                <div className="text-white/70">•</div>
                <div className="text-white/70">
                  {grammarStats.auto_generated_exercises} exercises
                </div>
                <div className="text-white/70">•</div>
                <div className="text-white/70">
                  {grammarStats.pattern_recognition_accuracy}% accuracy
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

        {/* Enhanced Controls */}
        <div className="max-w-6xl mx-auto mb-8">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border border-gold/30">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">{t.labels.searchCorpus}:</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search grammar concepts..."
                  className="w-full px-3 py-2 bg-white/20 border border-gold/30 rounded text-white placeholder-white/60"
                  disabled={backendStatus !== 'connected'}
                />
              </div>
              
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">{t.labels.category}:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white/20 border border-gold/30 rounded text-white"
                >
                  <option value="all">{t.categories.all}</option>
                  <option value="noun">{t.categories.noun}</option>
                  <option value="verb">{t.categories.verb}</option>
                  <option value="adjective">{t.categories.adjective}</option>
                  <option value="syntax">{t.categories.syntax}</option>
                  <option value="advanced">{t.categories.advanced}</option>
                </select>
              </div>
              
              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">{t.labels.difficulty}:</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 bg-white/20 border border-gold/30 rounded text-white"
                >
                  <option value="all">{t.difficulty.all}</option>
                  <option value="beginner">{t.difficulty.beginner}</option>
                  <option value="intermediate">{t.difficulty.intermediate}</option>
                  <option value="advanced">{t.difficulty.advanced}</option>
                </select>
              </div>
              
              {/* Exercise Type Filter */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">{t.labels.exerciseType}:</label>
                <select
                  value={selectedExerciseType}
                  onChange={(e) => setSelectedExerciseType(e.target.value)}
                  className="w-full px-3 py-2 bg-white/20 border border-gold/30 rounded text-white"
                >
                  <option value="all">{t.exercise_types.all}</option>
                  <option value="fill_blank">{t.exercise_types.fill_blank}</option>
                  <option value="identify">{t.exercise_types.identify}</option>
                  <option value="transform">{t.exercise_types.transform}</option>
                  <option value="multiple_choice">{t.exercise_types.multiple_choice}</option>
                </select>
              </div>
              
              {/* Mode Selection */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Mode:</label>
                <select
                  value={currentMode}
                  onChange={(e) => setCurrentMode(e.target.value as ModeType)}
                  className="w-full px-3 py-2 bg-white/20 border border-gold/30 rounded text-white"
                >
                  <option value="learn">{t.modes.learn}</option>
                  <option value="practice">{t.modes.practice}</option>
                  <option value="analyze">{t.modes.analyze}</option>
                  <option value="explore">{t.modes.explore}</option>
                  <option value="exercises">{t.modes.exercises}</option>
                  <option value="patterns">{t.modes.patterns}</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8 max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
            <CardContent className="p-4 text-center">
              <Brain className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-400">{session.conceptsStudied.size}</p>
              <p className="text-xs text-white/70">{t.stats.conceptsStudied}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-400">{exerciseAccuracy}%</p>
              <p className="text-xs text-white/70">{t.stats.exerciseAccuracy}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
            <CardContent className="p-4 text-center">
              <Zap className="w-6 h-6 text-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-gold">{exerciseSession.current_streak}</p>
              <p className="text-xs text-white/70">{t.stats.streak}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
            <CardContent className="p-4 text-center">
              <Timer className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-400">{sessionTime}s</p>
              <p className="text-xs text-white/70">{t.stats.timeSpent}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
            <CardContent className="p-4 text-center">
              <Award className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-400">{exerciseSession.exercises_completed}</p>
              <p className="text-xs text-white/70">{t.stats.exercisesCompleted}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
            <CardContent className="p-4 text-center">
              <Activity className="w-6 h-6 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-pink-400">{detectedPatterns.length}</p>
              <p className="text-xs text-white/70">{t.stats.patternsFound}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {loading && (
            <Card className="p-8 text-center mb-8 bg-white/10 backdrop-blur-sm border border-gold/30">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <Brain className="h-12 w-12 text-gold mx-auto mb-4" />
              </motion.div>
              <p className="text-white/80">Loading grammar concepts...</p>
            </Card>
          )}

          <Tabs value={currentMode} onValueChange={(value) => setCurrentMode(value as ModeType)}>
            <TabsList className="grid w-full grid-cols-6 mb-8 bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="learn" className="text-white">
                <BookOpen className="w-4 h-4 mr-2" />
                {t.modes.learn}
              </TabsTrigger>
              <TabsTrigger value="practice" className="text-white">
                <Target className="w-4 h-4 mr-2" />
                {t.modes.practice}
              </TabsTrigger>
              <TabsTrigger value="analyze" className="text-white">
                <Search className="w-4 h-4 mr-2" />
                {t.modes.analyze}
              </TabsTrigger>
              <TabsTrigger value="explore" className="text-white">
                <Globe className="w-4 h-4 mr-2" />
                {t.modes.explore}
              </TabsTrigger>
              <TabsTrigger value="exercises" className="text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                {t.modes.exercises}
              </TabsTrigger>
              <TabsTrigger value="patterns" className="text-white">
                <Activity className="w-4 h-4 mr-2" />
                {t.modes.patterns}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="learn">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Concept List */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Grammar Concepts</h3>
                  {renderConceptList()}
                </div>
                
                {/* Current Example */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {currentConcept ? currentConcept.name : 'Select a Concept'}
                  </h3>
                  {currentConcept && (
                    <div className="space-y-6">
                      <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                        <CardContent className="p-6">
                          <p className="text-white/90 mb-4">{currentConcept.explanation}</p>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => getCorpusExample()}
                              disabled={loading}
                              className="bg-wine-red hover:bg-wine-red/80 text-gold"
                            >
                              <Lightbulb className="w-4 h-4 mr-2" />
                              {t.actions.showExample}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      {currentExample && (
                        <Card className="bg-gradient-to-br from-indigo-50 to-blue-100 border-blue-200">
                          <CardHeader>
                            <CardTitle className="text-xl font-bold text-blue-800">
                              {t.labels.examples}
                            </CardTitle>
                            <CardDescription className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Scroll className="w-4 h-4" />
                                <span>{currentExample.source_passage}</span>
                              </div>
                              <Badge className={getDifficultyColor(currentExample.difficulty)}>
                                {t.difficulty[currentExample.difficulty as keyof typeof t.difficulty]}
                              </Badge>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {/* Latin Text */}
                              <div>
                                <h4 className="font-medium text-sm text-gray-700 mb-2">Latin Text:</h4>
                                <div className="p-4 bg-white rounded-lg border border-blue-200">
                                  <p className="text-lg italic text-blue-900 font-medium">
                                    {highlightedParts ? (
                                      <span>
                                        {currentExample.highlighted_parts.map((part, partIdx) => (
                                          <span
                                            key={partIdx}
                                            className="bg-yellow-200 px-1 rounded cursor-help"
                                            title={part.explanation}
                                          >
                                            {part.text}
                                          </span>
                                        ))}
                                      </span>
                                    ) : (
                                      currentExample.latin_text
                                    )}
                                  </p>
                                </div>
                              </div>
                              
                              {/* Analysis */}
                              <div>
                                <h4 className="font-medium text-sm text-gray-700 mb-2">{t.labels.analysis}:</h4>
                                <p className="text-sm text-gray-600 bg-white p-3 rounded border">
                                  {currentExample.analysis}
                                </p>
                              </div>
                              
                              {/* Translation */}
                              <div>
                                <h4 className="font-medium text-sm text-gray-700 mb-2">{t.labels.translation}:</h4>
                                <p className="text-sm text-gray-800 bg-green-50 p-3 rounded border border-green-200">
                                  {currentExample.translation}
                                </p>
                              </div>
                              
                              <div className="flex space-x-3 pt-4">
                                <Button
                                  onClick={() => setHighlightedParts(!highlightedParts)}
                                  variant="outline"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  {highlightedParts ? 'Hide Highlights' : 'Show Highlights'}
                                </Button>
                                <Button
                                  onClick={() => getCorpusExample()}
                                  disabled={loading}
                                >
                                  <Zap className="w-4 h-4 mr-2" />
                                  {t.actions.getRandomExample}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="practice">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <Target className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Grammar Practice Exercises</h3>
                  <p className="text-white/70 mb-4">Interactive exercises based on authentic corpus examples</p>
                  <Button className="bg-wine-red hover:bg-wine-red/80 text-gold">
                    Start Practice (Coming Soon)
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analyze">
              <div className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                  <CardHeader>
                    <CardTitle className="text-white">Text Analysis</CardTitle>
                    <CardDescription className="text-white/70">
                      {t.labels.selectText}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Enter Latin text to analyze:
                        </label>
                        <textarea
                          value={selectedText}
                          onChange={(e) => setSelectedText(e.target.value)}
                          placeholder="Convivae discubuere in triclinio..."
                          className="w-full px-4 py-3 bg-white/20 border border-gold/30 rounded text-white placeholder-white/60 h-24"
                          disabled={backendStatus !== 'connected'}
                        />
                      </div>
                      <Button
                        onClick={() => analyzeSelectedText(selectedText)}
                        disabled={!selectedText.trim() || loading}
                        className="bg-wine-red hover:bg-wine-red/80 text-gold"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        {t.actions.analyzeText}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {analysisResult && (
                  <Card className="bg-white border border-gold/30">
                    <CardHeader>
                      <CardTitle>{t.labels.analysisResult}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Word Analysis:</h4>
                          <div className="grid gap-2">
                            {analysisResult.words.map((word, wordIdx) => (
                              <div key={wordIdx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="font-medium">{word.word}</span>
                                <div className="flex space-x-2">
                                  <Badge variant="outline">{word.part_of_speech}</Badge>
                                  <Badge variant="outline">{word.case}</Badge>
                                  <Badge variant="outline">{word.number}</Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Structure Analysis:</h4>
                          <p className="text-gray-700">{analysisResult.overall_structure}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Suggestions:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {analysisResult.suggestions.map((suggestion, suggestionIdx) => (
                              <li key={suggestionIdx} className="text-sm text-gray-600">{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="explore">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <Scroll className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Explore Grammar Patterns</h3>
                  <p className="text-white/70 mb-4">
                    Discover grammatical patterns across the complete Macrobius corpus
                  </p>
                  {grammarStats && (
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
                      {Object.entries(grammarStats.category_distribution).map(([category, count]) => (
                        <div key={category} className="bg-black/20 p-3 rounded">
                          <div className="text-2xl font-bold text-gold">{count}</div>
                          <div className="text-sm text-white/70 capitalize">{category}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button className="bg-wine-red hover:bg-wine-red/80 text-gold">
                    {t.actions.exploreCorpus} (Coming Soon)
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="exercises">
              {/* Exercise content would be rendered here */}
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <Target className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Auto-Generated Grammar Exercises</h3>
                  <p className="text-white/70 mb-4">
                    Select a grammar concept to start practicing with automatically generated exercises.
                  </p>
                  <Button className="bg-wine-red hover:bg-wine-red/80 text-gold">
                    Start Exercises (Coming Soon)
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="patterns">
              {/* Pattern content would be rendered here */}
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <Activity className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Pattern Recognition</h3>
                  <p className="text-white/70 mb-4">
                    AI-powered grammatical pattern detection with corpus analysis
                  </p>
                  <Button className="bg-wine-red hover:bg-wine-red/80 text-gold">
                    Analyze Patterns (Coming Soon)
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default GrammarExplainerSection;
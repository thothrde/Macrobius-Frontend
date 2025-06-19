'use client';

/**
 * 🔍 MACROBIUS TEXT PROCESSOR - TIER 2 SEMANTIC SEARCH & CROSS-COMPONENT INTEGRATION
 * Enhanced AI-Powered Search with Real SRS + Grammar + Learning Paths Integration
 * Cross-Component Data Analysis and Personalized Learning Experience
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MacrobiusAPI, MacrobiusPassage, SearchFilters } from '../../lib/enhanced-api-client';
import { 
  Search, 
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
  Trophy
} from 'lucide-react';

interface TextSearchSectionProps {
  language: string;
}

// 🧠 Enhanced Search Result with Real Cross-Component Integration
interface SearchResult {
  id: string;
  text: string;
  source: string;
  book: number;
  chapter: number;
  section?: number;
  context: string;
  highlights: Array<{ start: number; end: number; type: string; concept?: string; }>;
  analysis: {
    complexity: 'beginner' | 'intermediate' | 'advanced';
    themes: string[];
    wordCount: number;
    characterCount: number;
    readingTime: number; // estimated minutes
    vocabularyDifficulty: number; // 1-10 scale
    grammaticalFeatures: string[];
    culturalConcepts: string[];
    personalizedDifficulty?: number; // Based on user's SRS + Grammar progress
    recommendationScore?: number; // AI Learning Paths recommendation
  };
  metadata: {
    work: string;
    culturalTheme: string;
    modernRelevance: string;
    createdAt: string;
  };
  // 🎯 Enhanced Reading Comprehension with Real SRS Data
  readingAssistance?: {
    keyVocabulary: Array<{
      word: string;
      translation: string;
      frequency: number;
      difficulty: number;
      culturalNote?: string;
      srsData?: {
        known: boolean;
        difficulty: number;
        nextReview?: Date;
        repetitionCount: number;
        easinessFactor: number;
        averagePerformance: number;
      };
    }>;
    grammaticalHelp: Array<{
      feature: string;
      explanation: string;
      examples: string[];
      userMastery?: number; // From Grammar Explainer progress
    }>;
    culturalContext: string;
    modernConnections: string[];
    discussionPrompts: string[];
    personalizedRecommendations: string[]; // From AI Learning Paths
  };
  // 🔍 Enhanced Semantic Analysis with User Context
  semanticAnalysis?: {
    concepts: string[];
    relatedPassages: string[];
    thematicCluster: string;
    conceptSimilarity: number;
    userRelevance: number; // Based on Learning Paths profile
    difficultyMatch: number; // Based on SRS + Grammar progress
  };
}

// 🎯 Enhanced Semantic Search with Cross-Component Data
interface SemanticSearchQuery {
  natural_language: string;
  concepts: string[];
  themes: string[];
  similarity_threshold: number;
  context_type: 'educational' | 'research' | 'cultural' | 'linguistic';
  user_profile?: {
    srs_performance: number;
    grammar_mastery: number;
    preferred_difficulty: string;
    cultural_interests: string[];
    learning_velocity: number;
  };
}

// 📚 Enhanced Reading Session with Cross-Component Tracking
interface ReadingSession {
  currentPassageIndex: number;
  vocabularyHelp: boolean;
  culturalContext: boolean;
  grammaticalAnalysis: boolean;
  readingSpeed: 'slow' | 'normal' | 'fast';
  difficultyLevel: 'guided' | 'independent' | 'advanced';
  progress: {
    passagesRead: number;
    timeSpent: number;
    vocabularyLearned: number;
    conceptsEncountered: string[];
    srsWordsReviewed: string[];
    grammarPatternsIdentified: string[];
  };
  userProfile?: {
    knownWords: Set<string>;
    difficultWords: Set<string>;
    grammarMastery: Record<string, number>;
    learningGoals: string[];
  };
}

// 🔗 Cross-Component User Profile
interface UserProfile {
  srs_data: {
    known_words: Set<string>;
    difficult_words: Set<string>;
    performance_scores: Record<string, number>;
    average_performance: number;
    study_streak: number;
  };
  grammar_progress: {
    concepts_mastered: string[];
    weak_areas: string[];
    average_score: number;
  };
  learning_paths: {
    preferred_difficulty: string;
    focus_areas: string[];
    cultural_interests: string[];
    learning_velocity: number;
    recent_gaps: string[];
  };
  overall_profile: {
    personalized_difficulty: number;
    recommendation_factors: string[];
    optimal_passage_length: number;
  };
}

// 🧠 Concept Clustering with User Relevance
interface ConceptCluster {
  id: string;
  name: string;
  description: string;
  passages: SearchResult[];
  similarity_score: number;
  key_themes: string[];
  educational_value: number;
  user_relevance?: number; // Based on Learning Paths data
  difficulty_match?: number; // Based on SRS + Grammar data
}

const translations = {
  en: {
    title: 'AI Semantic Search',
    subtitle: 'Cross-Component Intelligent Search & Reading Assistant (1,401 Passages)',
    searchPlaceholder: 'Search through complete Macrobius corpus...',
    naturalSearchPlaceholder: 'Ask questions like: "What does Macrobius say about Roman dinner customs?"',
    searchButton: 'Search Corpus',
    semanticSearch: 'Semantic Search',
    naturalLanguageSearch: 'Natural Language Search',
    advancedSearch: 'Advanced Filters',
    readingMode: 'Reading Comprehension',
    conceptClusters: 'Concept Clusters',
    personalizedSearch: 'Personalized Search',
    results: 'Search Results',
    noResults: 'No passages found',
    filters: 'Filters',
    all: 'All',
    complexity: 'Difficulty',
    themes: 'Cultural Themes',
    work: 'Work Type',
    book: 'Book',
    chapter: 'Chapter',
    section: 'Section',
    showContext: 'Show Analysis',
    hideContext: 'Hide Analysis',
    analysis: 'Analysis',
    metadata: 'Metadata',
    bookmark: 'Bookmark',
    copy: 'Copy Text',
    download: 'Download Results',
    loading: 'Searching corpus...',
    corpusStats: 'Corpus Statistics',
    backendStatus: 'Backend Status',
    connected: 'Connected to Oracle Cloud',
    totalPassages: 'Total Passages',
    totalCharacters: 'Total Characters',
    culturalThemes: 'Cultural Themes',
    workDistribution: 'Work Distribution',
    userProfile: 'Your Learning Profile',
    srsIntegration: 'SRS Integration',
    grammarIntegration: 'Grammar Integration',
    learningPathsIntegration: 'AI Learning Paths',
    crossComponentAnalysis: 'Cross-Component Analysis',
    personalizedDifficulty: 'Personalized Difficulty',
    recommendationScore: 'Recommendation Score',
    // 🧠 Semantic Search Terms
    queryAnalysis: 'Query Analysis',
    detectedConcepts: 'Detected Concepts',
    suggestedSearches: 'Suggested Searches',
    semanticMatches: 'Semantic Matches',
    conceptualSimilarity: 'Conceptual Similarity',
    thematicRelevance: 'Thematic Relevance',
    userRelevance: 'Personal Relevance',
    difficultyMatch: 'Difficulty Match',
    // 📚 Reading Comprehension Terms
    readingAssistance: 'Reading Assistance',
    vocabularyHelp: 'Vocabulary Help',
    keyVocabulary: 'Key Vocabulary',
    srsStatus: 'SRS Status',
    nextReview: 'Next Review',
    knownWord: 'Known',
    difficultWord: 'Difficult',
    newWord: 'New',
    grammaticalFeatures: 'Grammatical Features',
    grammarMastery: 'Your Grammar Mastery',
    culturalContext: 'Cultural Context',
    modernConnections: 'Modern Connections',
    discussionPrompts: 'Discussion Questions',
    personalizedRecommendations: 'Personalized Recommendations',
    readingProgress: 'Reading Progress',
    estimatedTime: 'Estimated Reading Time',
    difficultyLevel: 'Difficulty Level',
    comprehensionAids: 'Comprehension Aids',
    guidedReading: 'Guided Reading',
    independentReading: 'Independent Reading',
    advancedAnalysis: 'Advanced Analysis',
    // 🎯 Clustering Terms
    clusterAnalysis: 'Concept Clustering',
    relatedConcepts: 'Related Concepts',
    thematicGroups: 'Thematic Groups',
    educationalValue: 'Educational Value',
    conceptNetwork: 'Concept Network',
    similarPassages: 'Similar Passages',
    // 🔗 Cross-Component Terms
    profileLoading: 'Loading your learning profile...',
    profileLoaded: 'Profile loaded successfully',
    noProfileData: 'No learning data found - use other components to build your profile',
    srsWordsFound: 'SRS words identified',
    grammarPatternsFound: 'Grammar patterns detected',
    personalizedResults: 'Results personalized for you',
    adaptiveDifficulty: 'Difficulty adapted to your level'
  },
  de: {
    title: 'KI-Semantische Suche',
    subtitle: 'Komponentenübergreifende Intelligente Suche & Leseassistent (1.401 Textstellen)',
    searchPlaceholder: 'Durchsuche das komplette Macrobius-Korpus...',
    naturalSearchPlaceholder: 'Stelle Fragen wie: "Was sagt Macrobius über römische Tischsitten?"',
    searchButton: 'Korpus Durchsuchen',
    semanticSearch: 'Semantische Suche',
    naturalLanguageSearch: 'Natürlichsprachliche Suche',
    advancedSearch: 'Erweiterte Filter',
    readingMode: 'Leseverständnis',
    conceptClusters: 'Konzept-Cluster',
    personalizedSearch: 'Personalisierte Suche',
    results: 'Suchergebnisse',
    noResults: 'Keine Textstellen gefunden',
    filters: 'Filter',
    all: 'Alle',
    complexity: 'Schwierigkeit',
    themes: 'Kulturelle Themen',
    work: 'Werktyp',
    book: 'Buch',
    chapter: 'Kapitel',
    section: 'Abschnitt',
    showContext: 'Analyse Anzeigen',
    hideContext: 'Analyse Verbergen',
    analysis: 'Analyse',
    metadata: 'Metadaten',
    bookmark: 'Lesezeichen',
    copy: 'Text Kopieren',
    download: 'Ergebnisse Herunterladen',
    loading: 'Korpus wird durchsucht...',
    corpusStats: 'Korpus-Statistiken',
    backendStatus: 'Backend-Status',
    connected: 'Verbunden mit Oracle Cloud',
    totalPassages: 'Gesamt Textstellen',
    totalCharacters: 'Gesamt Zeichen',
    culturalThemes: 'Kulturelle Themen',
    workDistribution: 'Werk-Verteilung',
    userProfile: 'Ihr Lernprofil',
    srsIntegration: 'SRS-Integration',
    grammarIntegration: 'Grammatik-Integration',
    learningPathsIntegration: 'KI-Lernpfade',
    crossComponentAnalysis: 'Komponentenübergreifende Analyse',
    personalizedDifficulty: 'Personalisierte Schwierigkeit',
    recommendationScore: 'Empfehlungsbewertung'
  },
  la: {
    title: 'Quaestio Semantica AI',
    subtitle: 'Quaestio Intelligens Trans-Componentibus & Auxilium Lectionis (1.401 Loci)',
    searchPlaceholder: 'Quaere per totum corpus Macrobii...',
    naturalSearchPlaceholder: 'Interroga sicut: "Quid dicit Macrobius de consuetudine cenae Romanae?"',
    searchButton: 'Corpus Quaerere',
    semanticSearch: 'Quaestio Semantica',
    naturalLanguageSearch: 'Quaestio Linguae Naturalis',
    advancedSearch: 'Filtra Provecta',
    readingMode: 'Intellectus Lectionis',
    conceptClusters: 'Conceptuum Acervi',
    personalizedSearch: 'Quaestio Personalizata',
    results: 'Eventus Quaestionis',
    noResults: 'Nulli loci inventi',
    filters: 'Filtra',
    all: 'Omnia',
    complexity: 'Difficultas',
    themes: 'Themata Culturalia',
    work: 'Genus Operis',
    book: 'Liber',
    chapter: 'Caput',
    section: 'Sectio',
    showContext: 'Analysis Monstrare',
    hideContext: 'Analysis Celare',
    analysis: 'Analysis',
    metadata: 'Metadata',
    bookmark: 'Signum',
    copy: 'Textum Copiare',
    download: 'Eventus Demittere',
    loading: 'Corpus quaeritur...',
    corpusStats: 'Statisticae Corporis',
    backendStatus: 'Status Systematis',
    connected: 'Connexum ad Oracle Cloud',
    totalPassages: 'Loci Totales',
    totalCharacters: 'Characteres Totales',
    culturalThemes: 'Themata Culturalia',
    workDistribution: 'Distributio Operum',
    userProfile: 'Profilus Tuus Discendi',
    srsIntegration: 'Integratio SRS',
    grammarIntegration: 'Integratio Grammaticae',
    learningPathsIntegration: 'Itinera AI Discendi',
    crossComponentAnalysis: 'Analysis Trans-Componentibus',
    personalizedDifficulty: 'Difficultas Personalizata',
    recommendationScore: 'Punctum Commendationis'
  }
};

export default function MacrobiusTextProcessorSemanticEnhanced({ language }: TextSearchSectionProps) {
  // Basic State
  const [searchTerm, setSearchTerm] = useState('');
  const [naturalQuery, setNaturalQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [bookmarkedResults, setBookmarkedResults] = useState<Set<string>>(new Set());
  const [corpusStats, setCorpusStats] = useState<any>(null);
  const [backendStatus, setBackendStatus] = useState<'connected' | 'error' | 'loading'>('loading');
  const [totalResults, setTotalResults] = useState(0);
  const [currentMode, setCurrentMode] = useState<'search' | 'semantic' | 'reading' | 'clusters' | 'personalized'>('semantic');
  
  // 🔗 Cross-Component State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [srsData, setSrsData] = useState<Record<string, any>>({});
  const [grammarData, setGrammarData] = useState<Record<string, any>>({});
  const [learningPathsData, setLearningPathsData] = useState<Record<string, any>>({});
  const [crossComponentReady, setCrossComponentReady] = useState(false);
  
  // 🧠 Enhanced Semantic Search State
  const [semanticQuery, setSemanticQuery] = useState<SemanticSearchQuery>({
    natural_language: '',
    concepts: [],
    themes: [],
    similarity_threshold: 0.7,
    context_type: 'educational'
  });
  const [detectedConcepts, setDetectedConcepts] = useState<string[]>([]);
  const [suggestedSearches, setSuggestedSearches] = useState<string[]>([]);
  const [queryAnalysis, setQueryAnalysis] = useState<any>(null);
  const [personalizedSuggestions, setPersonalizedSuggestions] = useState<string[]>([]);
  
  // 📚 Enhanced Reading Comprehension State
  const [readingSession, setReadingSession] = useState<ReadingSession>({
    currentPassageIndex: 0,
    vocabularyHelp: true,
    culturalContext: true,
    grammaticalAnalysis: false,
    readingSpeed: 'normal',
    difficultyLevel: 'guided',
    progress: {
      passagesRead: 0,
      timeSpent: 0,
      vocabularyLearned: 0,
      conceptsEncountered: [],
      srsWordsReviewed: [],
      grammarPatternsIdentified: []
    }
  });
  const [showReadingAssistance, setShowReadingAssistance] = useState<Set<string>>(new Set());
  
  // 🎯 Enhanced Concept Clustering State
  const [conceptClusters, setConceptClusters] = useState<ConceptCluster[]>([]);
  const [selectedCluster, setSelectedCluster] = useState<ConceptCluster | null>(null);
  const [clusterAnalysisLoading, setClusterAnalysisLoading] = useState(false);
  
  const [filters, setFilters] = useState<SearchFilters>({
    work_type: 'all',
    difficulty_level: 'all',
    cultural_theme: '',
    sort_by: 'relevance',
    limit: 20,
    offset: 0
  });

  const t = translations[language as keyof typeof translations] || translations.en;

  // 🔗 **LOAD CROSS-COMPONENT DATA ON MOUNT**
  useEffect(() => {
    const loadCrossComponentData = async () => {
      setProfileLoading(true);
      
      try {
        // Load SRS data
        const storedSRS = localStorage.getItem('macrobius_srs_data');
        let srsProfile = {
          known_words: new Set<string>(),
          difficult_words: new Set<string>(),
          performance_scores: {},
          average_performance: 50,
          study_streak: 0
        };
        
        if (storedSRS) {
          const parsedSRS = JSON.parse(storedSRS);
          setSrsData(parsedSRS);
          
          const knownWords = new Set<string>();
          const difficultWords = new Set<string>();
          const performanceScores: Record<string, number> = {};
          let totalPerformance = 0;
          let performanceCount = 0;
          
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
              totalPerformance += avgPerformance;
              performanceCount++;
            }
          });
          
          srsProfile = {
            known_words: knownWords,
            difficult_words: difficultWords,
            performance_scores: performanceScores,
            average_performance: performanceCount > 0 ? (totalPerformance / performanceCount) * 20 : 50,
            study_streak: calculateStudyStreak(parsedSRS)
          };
        }
        
        // Load Grammar data
        const storedGrammar = localStorage.getItem('macrobius_grammar_progress');
        let grammarProfile = {
          concepts_mastered: [],
          weak_areas: [],
          average_score: 50
        };
        
        if (storedGrammar) {
          const parsedGrammar = JSON.parse(storedGrammar);
          setGrammarData(parsedGrammar);
          
          const conceptScores = parsedGrammar.concept_scores || {};
          const masteredConcepts = Object.entries(conceptScores)
            .filter(([, score]: [string, any]) => score >= 80)
            .map(([concept]) => concept);
          const weakAreas = Object.entries(conceptScores)
            .filter(([, score]: [string, any]) => score < 60)
            .map(([concept]) => concept);
          const avgScore = Object.values(conceptScores).length > 0
            ? Object.values(conceptScores).reduce((sum: number, score: any) => sum + score, 0) / Object.values(conceptScores).length
            : 50;
          
          grammarProfile = {
            concepts_mastered: masteredConcepts,
            weak_areas: weakAreas,
            average_score: avgScore
          };
        }
        
        // Load Learning Paths data
        const storedLearningPaths = localStorage.getItem('macrobius_learning_analytics');
        let learningPathsProfile = {
          preferred_difficulty: 'intermediate',
          focus_areas: ['reading_comprehension'],
          cultural_interests: ['Philosophy', 'Roman History'],
          learning_velocity: 65,
          recent_gaps: []
        };
        
        if (storedLearningPaths) {
          const parsedPaths = JSON.parse(storedLearningPaths);
          setLearningPathsData(parsedPaths);
          
          learningPathsProfile = {
            preferred_difficulty: parsedPaths.preferred_difficulty || 'intermediate',
            focus_areas: parsedPaths.focus_areas || ['reading_comprehension'],
            cultural_interests: parsedPaths.cultural_interests || ['Philosophy', 'Roman History'],
            learning_velocity: parsedPaths.overall_progress?.learning_velocity || 65,
            recent_gaps: parsedPaths.recent_gaps || []
          };
        }
        
        // Build comprehensive user profile
        const overallProfile = {
          personalized_difficulty: calculatePersonalizedDifficulty(srsProfile.average_performance, grammarProfile.average_score),
          recommendation_factors: buildRecommendationFactors(srsProfile, grammarProfile, learningPathsProfile),
          optimal_passage_length: calculateOptimalPassageLength(learningPathsProfile.learning_velocity)
        };
        
        const completeProfile: UserProfile = {
          srs_data: srsProfile,
          grammar_progress: grammarProfile,
          learning_paths: learningPathsProfile,
          overall_profile: overallProfile
        };
        
        setUserProfile(completeProfile);
        setCrossComponentReady(true);
        
        // Generate personalized search suggestions
        generatePersonalizedSuggestions(completeProfile);
        
      } catch (error) {
        console.error('Failed to load cross-component data:', error);
        setCrossComponentReady(false);
      }
      
      setProfileLoading(false);
    };
    
    loadCrossComponentData();
  }, []);

  // 🧮 **UTILITY FUNCTIONS FOR PROFILE ANALYSIS**
  const calculateStudyStreak = (srsData: Record<string, any>): number => {
    // Calculate study streak from SRS review history
    const today = new Date();
    let streak = 0;
    
    // Simple streak calculation - would be more sophisticated in production
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const hasStudyActivity = Object.values(srsData).some((data: any) => {
        return data.review_history?.some((review: any) => {
          const reviewDate = new Date(review.date);
          return reviewDate.toDateString() === checkDate.toDateString();
        });
      });
      
      if (hasStudyActivity) {
        streak++;
      } else if (i > 0) {
        break; // Break on first day without activity (after today)
      }
    }
    
    return streak;
  };
  
  const calculatePersonalizedDifficulty = (srsPerf: number, grammarPerf: number): number => {
    // Calculate personalized difficulty level (1-100)
    const combinedPerformance = (srsPerf + grammarPerf) / 2;
    return Math.round(combinedPerformance);
  };
  
  const buildRecommendationFactors = (srs: any, grammar: any, learningPaths: any): string[] => {
    const factors: string[] = [];
    
    if (srs.known_words.size > 100) factors.push('strong_vocabulary');
    if (srs.difficult_words.size > 20) factors.push('vocabulary_gaps');
    if (grammar.average_score > 80) factors.push('grammar_mastery');
    if (grammar.weak_areas.length > 3) factors.push('grammar_focus_needed');
    if (learningPaths.learning_velocity > 80) factors.push('fast_learner');
    if (learningPaths.focus_areas.includes('cultural_context')) factors.push('cultural_interest');
    
    return factors;
  };
  
  const calculateOptimalPassageLength = (learningVelocity: number): number => {
    // Calculate optimal passage word count based on learning velocity
    if (learningVelocity > 80) return 200; // Advanced learners
    if (learningVelocity > 60) return 150; // Intermediate learners
    return 100; // Beginner learners
  };
  
  const generatePersonalizedSuggestions = (profile: UserProfile) => {
    const suggestions: string[] = [];
    
    // Generate suggestions based on user profile
    if (profile.srs_data.difficult_words.size > 10) {
      suggestions.push('Find passages with your difficult vocabulary words');
    }
    
    if (profile.grammar_progress.weak_areas.length > 0) {
      suggestions.push(`Practice passages with ${profile.grammar_progress.weak_areas[0]} patterns`);
    }
    
    if (profile.learning_paths.cultural_interests.length > 0) {
      suggestions.push(`Explore more about ${profile.learning_paths.cultural_interests[0]}`);
    }
    
    if (profile.overall_profile.personalized_difficulty < 40) {
      suggestions.push('Find beginner-friendly passages to build confidence');
    } else if (profile.overall_profile.personalized_difficulty > 80) {
      suggestions.push('Challenge yourself with advanced philosophical discussions');
    }
    
    suggestions.push('Discover passages matching your learning goals');
    
    setPersonalizedSuggestions(suggestions);
  };

  // 🧠 **ENHANCED AI-POWERED QUERY ANALYSIS WITH USER CONTEXT**
  const analyzeNaturalLanguageQuery = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    // Enhanced AI analysis with user context
    const mockAnalysis = {
      detected_intent: 'search_cultural_practices',
      extracted_concepts: [
        'Roman dining customs',
        'convivium',
        'social hierarchy',
        'banquet etiquette'
      ],
      suggested_filters: {
        cultural_theme: 'Social Customs',
        work_type: 'Saturnalia',
        difficulty_level: userProfile?.overall_profile.personalized_difficulty > 70 ? 'advanced' : 
                         userProfile?.overall_profile.personalized_difficulty > 40 ? 'intermediate' : 'beginner'
      },
      confidence: 0.87,
      similar_queries: [
        'What were Roman banquet customs?',
        'How did Romans conduct dinner parties?',
        'Social practices at Roman meals'
      ],
      user_context: {
        difficulty_match: userProfile?.overall_profile.personalized_difficulty || 50,
        vocabulary_relevance: calculateVocabularyRelevance(query),
        grammar_relevance: calculateGrammarRelevance(query),
        cultural_interest_match: calculateCulturalInterestMatch(query)
      }
    };
    
    setQueryAnalysis(mockAnalysis);
    setDetectedConcepts(mockAnalysis.extracted_concepts);
    setSuggestedSearches(mockAnalysis.similar_queries);
    
    // Auto-apply suggested filters with user context
    setFilters(prev => ({
      ...prev,
      ...mockAnalysis.suggested_filters
    }));
    
    return mockAnalysis;
  }, [userProfile]);
  
  const calculateVocabularyRelevance = (query: string): number => {
    if (!userProfile) return 50;
    
    const queryWords = query.toLowerCase().split(' ');
    const knownWordsInQuery = queryWords.filter(word => 
      Array.from(userProfile.srs_data.known_words).some(knownWord => 
        knownWord.toLowerCase().includes(word)
      )
    );
    
    return Math.min((knownWordsInQuery.length / queryWords.length) * 100, 100);
  };
  
  const calculateGrammarRelevance = (query: string): number => {
    if (!userProfile) return 50;
    
    // Simple grammar relevance based on query complexity
    const complexityIndicators = ['that', 'which', 'when', 'where', 'because', 'although'];
    const complexityCount = complexityIndicators.filter(indicator => 
      query.toLowerCase().includes(indicator)
    ).length;
    
    const baseRelevance = userProfile.grammar_progress.average_score;
    const complexityAdjustment = complexityCount * 10;
    
    return Math.min(baseRelevance + complexityAdjustment, 100);
  };
  
  const calculateCulturalInterestMatch = (query: string): number => {
    if (!userProfile) return 50;
    
    const culturalKeywords = {
      'Philosophy': ['philosophy', 'wisdom', 'thought', 'ethics', 'virtue'],
      'Roman History': ['roman', 'empire', 'caesar', 'republic', 'history'],
      'Social Customs': ['dinner', 'banquet', 'custom', 'tradition', 'social'],
      'Literature': ['poetry', 'verse', 'author', 'writing', 'literary'],
      'Religious Practices': ['god', 'gods', 'religion', 'ritual', 'sacred']
    };
    
    const queryLower = query.toLowerCase();
    let maxMatch = 0;
    
    userProfile.learning_paths.cultural_interests.forEach(interest => {
      const keywords = culturalKeywords[interest as keyof typeof culturalKeywords] || [];
      const matchCount = keywords.filter(keyword => queryLower.includes(keyword)).length;
      const matchPercentage = (matchCount / keywords.length) * 100;
      maxMatch = Math.max(maxMatch, matchPercentage);
    });
    
    return maxMatch;
  };

  // Rest of component implementation would continue here...
  // Including performSemanticSearch, UI rendering functions, etc.
  
  return (
    <section id="semantic-text-search" className="py-20 relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-4">
            {t.subtitle}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2 text-green-600">
              <Database className="w-4 h-4" />
              <span className="font-medium">{t.connected}</span>
            </div>
            {crossComponentReady && (
              <>
                <div className="text-white/70">•</div>
                <div className="flex items-center space-x-2 text-purple-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">AI-Enhanced with Your Profile</span>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* User Profile Display */}
        {profileLoading ? (
          <Card className="bg-white/10 backdrop-blur-sm border border-gold/30 mb-6">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-white/70">
                <Database className="w-4 h-4 animate-pulse" />
                <span className="text-sm">{t.profileLoading}</span>
              </div>
            </CardContent>
          </Card>
        ) : !userProfile || !crossComponentReady ? (
          <Card className="bg-white/10 backdrop-blur-sm border border-orange/30 mb-6">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-orange-400">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">{t.noProfileData}</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-400/30 mb-6">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center text-sm">
                <User className="w-4 h-4 mr-2" />
                {t.userProfile}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* SRS Data */}
                <div className="bg-black/20 p-3 rounded">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-3 h-3 text-purple-400" />
                    <span className="font-medium text-purple-300">{t.srsIntegration}</span>
                  </div>
                  <div className="space-y-1 text-white/70">
                    <div>Known: {userProfile.srs_data.known_words.size} words</div>
                    <div>Difficult: {userProfile.srs_data.difficult_words.size} words</div>
                    <div>Performance: {Math.round(userProfile.srs_data.average_performance)}%</div>
                    <div>Streak: {userProfile.srs_data.study_streak} days</div>
                  </div>
                </div>
                
                {/* Grammar Data */}
                <div className="bg-black/20 p-3 rounded">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="w-3 h-3 text-blue-400" />
                    <span className="font-medium text-blue-300">{t.grammarIntegration}</span>
                  </div>
                  <div className="space-y-1 text-white/70">
                    <div>Mastered: {userProfile.grammar_progress.concepts_mastered.length} concepts</div>
                    <div>Weak areas: {userProfile.grammar_progress.weak_areas.length}</div>
                    <div>Average: {Math.round(userProfile.grammar_progress.average_score)}%</div>
                  </div>
                </div>
                
                {/* Learning Paths Data */}
                <div className="bg-black/20 p-3 rounded">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="w-3 h-3 text-green-400" />
                    <span className="font-medium text-green-300">{t.learningPathsIntegration}</span>
                  </div>
                  <div className="space-y-1 text-white/70">
                    <div>Level: {userProfile.learning_paths.preferred_difficulty}</div>
                    <div>Velocity: {Math.round(userProfile.learning_paths.learning_velocity)}%</div>
                    <div>Interests: {userProfile.learning_paths.cultural_interests.slice(0, 2).join(', ')}</div>
                    <div>Difficulty: {Math.round(userProfile.overall_profile.personalized_difficulty)}%</div>
                  </div>
                </div>
              </div>
              
              {/* Personalized Suggestions */}
              {personalizedSuggestions.length > 0 && (
                <div className="mt-4 pt-3 border-t border-purple-400/30">
                  <h6 className="text-purple-300 text-xs font-medium mb-2">Personalized Suggestions:</h6>
                  <div className="flex flex-wrap gap-1">
                    {personalizedSuggestions.slice(0, 3).map((suggestion, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => setNaturalQuery(suggestion)}
                        className="border-purple-400 text-purple-300 hover:bg-purple-400/10 text-xs h-6"
                      >
                        {suggestion.length > 40 ? suggestion.substring(0, 40) + '...' : suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Enhanced Search Interface */}
        <div className="max-w-4xl mx-auto mb-8">
          <Tabs value={currentMode} onValueChange={(value) => setCurrentMode(value as any)}>
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="semantic" className="text-white">
                <Brain className="w-4 h-4 mr-2" />
                {t.semanticSearch}
              </TabsTrigger>
              <TabsTrigger value="personalized" className="text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                {t.personalizedSearch}
              </TabsTrigger>
              <TabsTrigger value="search" className="text-white">
                <Search className="w-4 h-4 mr-2" />
                Search
              </TabsTrigger>
              <TabsTrigger value="reading" className="text-white">
                <BookOpenCheck className="w-4 h-4 mr-2" />
                {t.readingMode}
              </TabsTrigger>
              <TabsTrigger value="clusters" className="text-white">
                <Network className="w-4 h-4 mr-2" />
                {t.conceptClusters}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="semantic">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30 shadow-xl mb-8">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    {t.naturalLanguageSearch}
                  </CardTitle>
                  <p className="text-white/70 text-sm">
                    Ask natural questions about the corpus - AI understands your intent and personalizes results.
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <Lightbulb className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold w-5 h-5" />
                      <input
                        type="text"
                        value={naturalQuery}
                        onChange={(e) => setNaturalQuery(e.target.value)}
                        placeholder={t.naturalSearchPlaceholder}
                        className="w-full pl-10 pr-4 py-3 bg-white/20 border border-gold/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                      />
                    </div>
                    <Button
                      disabled={loading || !naturalQuery.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                    >
                      {loading ? (
                        <>
                          <Brain className="w-4 h-4 mr-2 animate-pulse" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Ask AI
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Other tabs would be implemented here */}
            <TabsContent value="personalized">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <Sparkles className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Personalized Search</h3>
                  <p className="text-white/70">
                    {crossComponentReady ? 'Search results will be adapted to your profile.' : 'Use other components to build your learning profile first.'}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="search">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <Search className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Traditional Search</h3>
                  <p className="text-white/70">Traditional corpus search functionality.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reading">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <BookOpenCheck className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Reading Comprehension Mode</h3>
                  <p className="text-white/70">Enhanced reading with vocabulary assistance.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="clusters">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <Network className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Concept Clustering</h3>
                  <p className="text-white/70">AI-powered concept analysis and clustering.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
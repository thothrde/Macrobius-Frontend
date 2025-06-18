'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
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
  Download,
  Copy,
  Bookmark,
  Quote,
  Database,
  Zap,
  Brain,
  MessageCircle,
  HelpCircle,
  Lightbulb,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  BarChart3,
  Users,
  Globe,
  Sparkles,
  BookMarked,
  GraduationCap
} from 'lucide-react';

interface TextSearchSectionProps {
  language: string;
}

// 🎯 **TIER 2 SEMANTIC SEARCH INTERFACES - IMPLEMENTED**
interface SemanticSearchQuery {
  natural_language: string;
  concepts: string[];
  themes: string[];
  similarity_threshold: number;
  cultural_context: boolean;
  difficulty_filter: number;
  include_analysis: boolean;
}

interface SemanticSearchResult {
  passage: MacrobiusPassage;
  relevance_score: number;
  concept_matches: string[];
  theme_matches: string[];
  semantic_analysis: {
    key_concepts: string[];
    cultural_significance: string;
    difficulty_indicators: string[];
    vocabulary_complexity: number;
  };
}

interface ReadingAssistant {
  vocabulary_help: VocabularyHelp[];
  difficulty_analysis: DifficultyAnalysis;
  cultural_context: CulturalContext;
  guided_questions: string[];
  comprehension_check: ComprehensionQuestion[];
  srs_integration: SRSIntegration;
}

interface VocabularyHelp {
  word: string;
  position: { start: number; end: number };
  difficulty_level: number;
  translations: string[];
  srs_status?: {
    known: boolean;
    last_reviewed: Date;
    next_review: Date;
    performance_score: number;
  };
  grammatical_info: string;
  cultural_context: string;
}

interface DifficultyAnalysis {
  overall_level: 'beginner' | 'intermediate' | 'advanced';
  vocabulary_complexity: number;
  syntax_complexity: number;
  cultural_complexity: number;
  recommended_prerequisites: string[];
  estimated_reading_time: number;
}

interface CulturalContext {
  primary_themes: string[];
  historical_background: string;
  modern_relevance: string;
  related_concepts: string[];
  visual_aids: string[];
}

interface ComprehensionQuestion {
  id: string;
  type: 'multiple_choice' | 'short_answer' | 'analysis';
  question: string;
  options?: string[];
  correct_answer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface SRSIntegration {
  vocabulary_to_review: string[];
  new_words_learned: string[];
  performance_impact: number;
  suggested_study_time: number;
}

interface SearchResult {
  id: string;
  text: string;
  source: string;
  book: number;
  chapter: number;
  section?: number;
  context: string;
  highlights: Array<{ start: number; end: number; type: string; }>;
  analysis: {
    complexity: 'beginner' | 'intermediate' | 'advanced';
    themes: string[];
    wordCount: number;
    characterCount: number;
  };
  metadata: {
    work: string;
    culturalTheme: string;
    modernRelevance: string;
    createdAt: string;
  };
  // 🚀 NEW: Semantic and Reading Assistant Features
  semantic_data?: SemanticSearchResult;
  reading_assistant?: ReadingAssistant;
}

const translations = {
  en: {
    title: 'MacrobiusTextProcessor AI',
    subtitle: 'AI-Enhanced Semantic Search & Reading Comprehension Assistant',
    searchPlaceholder: 'Ask anything about Macrobius in natural language...',
    semanticSearchPlaceholder: 'e.g., "What does Macrobius say about Roman festivals?"',
    searchButton: 'Smart Search',
    semanticSearch: 'Semantic Search',
    basicSearch: 'Basic Search',
    readingAssistant: 'Reading Assistant',
    vocabularyHelp: 'Vocabulary Help',
    culturalContext: 'Cultural Context',
    comprehensionCheck: 'Comprehension',
    advancedSearch: 'Advanced Filters',
    results: 'Search Results',
    noResults: 'No passages found',
    semanticResults: 'Semantic Matches',
    conceptMatches: 'Concept Matches',
    themeMatches: 'Theme Matches',
    relevanceScore: 'Relevance',
    difficultyAnalysis: 'Difficulty Analysis',
    vocabularyComplexity: 'Vocabulary',
    syntaxComplexity: 'Syntax',
    culturalComplexity: 'Cultural Context',
    readingTime: 'Est. Reading Time',
    prerequisites: 'Prerequisites',
    guidedQuestions: 'Guided Questions',
    srsIntegration: 'SRS Integration',
    wordsToReview: 'Words to Review',
    newWordsLearned: 'New Words',
    studyTime: 'Suggested Study Time',
    performanceImpact: 'Performance Impact',
    comprehensionQuestions: 'Check Understanding',
    showVocabHelp: 'Show Vocabulary Help',
    hideVocabHelp: 'Hide Vocabulary Help',
    enableReadingAssistant: 'Enable Reading Assistant',
    disableReadingAssistant: 'Disable Reading Assistant',
    semanticMode: 'AI Semantic Mode',
    basicMode: 'Traditional Search',
    loading: 'Processing with AI...',
    analyzingPassage: 'Analyzing passage...',
    generatingQuestions: 'Generating comprehension questions...',
    loadingVocabulary: 'Loading vocabulary assistance...',
    corpusStats: 'Corpus Statistics',
    backendStatus: 'Backend Status',
    connected: 'AI-Enhanced Oracle Cloud',
    aiFeatures: 'AI Features Active',
    totalPassages: 'Total Passages',
    totalCharacters: 'Total Characters',
    culturalThemes: 'Cultural Themes',
    workDistribution: 'Work Distribution'
  },
  de: {
    title: 'MacrobiusTextProcessor AI',
    subtitle: 'KI-gestützte semantische Suche & Leseverständnis-Assistent',
    searchPlaceholder: 'Fragen Sie alles über Macrobius in natürlicher Sprache...',
    semanticSearchPlaceholder: 'z.B. "Was sagt Macrobius über römische Feste?"',
    searchButton: 'Intelligente Suche',
    semanticSearch: 'Semantische Suche',
    basicSearch: 'Grundsuche',
    readingAssistant: 'Lese-Assistent',
    vocabularyHelp: 'Vokabelhilfe',
    culturalContext: 'Kultureller Kontext',
    comprehensionCheck: 'Verständnisprüfung',
    advancedSearch: 'Erweiterte Filter',
    results: 'Suchergebnisse',
    noResults: 'Keine Textstellen gefunden',
    semanticResults: 'Semantische Treffer',
    conceptMatches: 'Konzept-Treffer',
    themeMatches: 'Themen-Treffer',
    relevanceScore: 'Relevanz',
    difficultyAnalysis: 'Schwierigkeitsanalyse',
    vocabularyComplexity: 'Vokabular',
    syntaxComplexity: 'Syntax',
    culturalComplexity: 'Kultureller Kontext',
    readingTime: 'Geschätzte Lesezeit',
    prerequisites: 'Voraussetzungen',
    guidedQuestions: 'Leitfragen',
    srsIntegration: 'SRS-Integration',
    wordsToReview: 'Zu wiederholende Wörter',
    newWordsLearned: 'Neue Wörter',
    studyTime: 'Empfohlene Lernzeit',
    performanceImpact: 'Leistungseinfluss',
    comprehensionQuestions: 'Verständnis prüfen',
    showVocabHelp: 'Vokabelhilfe anzeigen',
    hideVocabHelp: 'Vokabelhilfe verbergen',
    enableReadingAssistant: 'Lese-Assistent aktivieren',
    disableReadingAssistant: 'Lese-Assistent deaktivieren',
    semanticMode: 'KI-Semantik-Modus',
    basicMode: 'Traditionelle Suche',
    loading: 'KI-Verarbeitung...',
    analyzingPassage: 'Textstelle wird analysiert...',
    generatingQuestions: 'Verständnisfragen werden generiert...',
    loadingVocabulary: 'Vokabelhilfe wird geladen...',
    corpusStats: 'Korpus-Statistiken',
    backendStatus: 'Backend-Status',
    connected: 'KI-verstärkte Oracle Cloud',
    aiFeatures: 'KI-Features Aktiv',
    totalPassages: 'Gesamt Textstellen',
    totalCharacters: 'Gesamt Zeichen',
    culturalThemes: 'Kulturelle Themen',
    workDistribution: 'Werk-Verteilung'
  },
  la: {
    title: 'MacrobiusTextProcessor AI',
    subtitle: 'Quaestio Semantica AI-aucta & Adiutor Lectionis',
    searchPlaceholder: 'Quaere quidlibet de Macrobio lingua naturali...',
    semanticSearchPlaceholder: 'e.g. "Quid dicit Macrobius de festis Romanis?"',
    searchButton: 'Quaestio Prudens',
    semanticSearch: 'Quaestio Semantica',
    basicSearch: 'Quaestio Simplex',
    readingAssistant: 'Adiutor Lectionis',
    vocabularyHelp: 'Auxilium Vocabulorum',
    culturalContext: 'Contextus Culturalis',
    comprehensionCheck: 'Probatio Intellectus',
    advancedSearch: 'Filtra Provecta',
    results: 'Eventus Quaestionis',
    noResults: 'Nulli loci inventi',
    semanticResults: 'Concordantiae Semanticae',
    conceptMatches: 'Concordantiae Conceptuum',
    themeMatches: 'Concordantiae Thematum',
    relevanceScore: 'Momenti Gradus',
    difficultyAnalysis: 'Analysis Difficultatis',
    vocabularyComplexity: 'Vocabulorum',
    syntaxComplexity: 'Syntaxis',
    culturalComplexity: 'Contextus Culturalis',
    readingTime: 'Tempus Lectionis Aest.',
    prerequisites: 'Praerequisita',
    guidedQuestions: 'Quaestiones Ducentes',
    srsIntegration: 'Integratio SRS',
    wordsToReview: 'Verba Repetenda',
    newWordsLearned: 'Verba Nova',
    studyTime: 'Tempus Studii Suggestum',
    performanceImpact: 'Effectus in Effectum',
    comprehensionQuestions: 'Intellectum Probare',
    showVocabHelp: 'Auxilium Vocabulorum Monstrare',
    hideVocabHelp: 'Auxilium Vocabulorum Celare',
    enableReadingAssistant: 'Adiutorem Lectionis Facere',
    disableReadingAssistant: 'Adiutorem Lectionis Tollere',
    semanticMode: 'Modus AI Semanticus',
    basicMode: 'Quaestio Traditionalis',
    loading: 'AI processus...',
    analyzingPassage: 'Locus analysitur...',
    generatingQuestions: 'Quaestiones intellectus generantur...',
    loadingVocabulary: 'Auxilium vocabulorum cargatur...',
    corpusStats: 'Statisticae Corporis',
    backendStatus: 'Status Systematis',
    connected: 'Oracle Cloud AI-auctum',
    aiFeatures: 'AI Facultates Activae',
    totalPassages: 'Loci Totales',
    totalCharacters: 'Characteres Totales',
    culturalThemes: 'Themata Culturalia',
    workDistribution: 'Distributio Operum'
  }
};

export default function MacrobiusTextProcessorSemanticEnhanced({ language }: TextSearchSectionProps) {
  // Enhanced State Management
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [semanticMode, setSemanticMode] = useState(true); // Default to semantic search
  const [readingAssistantEnabled, setReadingAssistantEnabled] = useState(true);
  const [vocabularyHelpEnabled, setVocabularyHelpEnabled] = useState(true);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [expandedVocabulary, setExpandedVocabulary] = useState<Set<string>>(new Set());
  const [bookmarkedResults, setBookmarkedResults] = useState<Set<string>>(new Set());
  const [corpusStats, setCorpusStats] = useState<{
    total_passages?: number;
    total_characters?: number;
    work_distribution?: Record<string, number>;
    ai_features_active?: boolean;
  } | null>(null);
  const [backendStatus, setBackendStatus] = useState<'connected' | 'error' | 'loading'>('loading');
  const [totalResults, setTotalResults] = useState(0);
  const [currentAnalysisStage, setCurrentAnalysisStage] = useState<string>('');
  
  // SRS Integration State
  const [srsData, setSrsData] = useState<Record<string, any>>({});
  const [userVocabularyProfile, setUserVocabularyProfile] = useState<{
    known_words: Set<string>;
    difficult_words: Set<string>;
    performance_scores: Record<string, number>;
  }>({ known_words: new Set(), difficult_words: new Set(), performance_scores: {} });
  
  const [filters, setFilters] = useState<SearchFilters & {
    semantic_threshold?: number;
    include_cultural_context?: boolean;
    difficulty_preference?: 'adaptive' | 'challenging' | 'comfortable';
  }>({
    work_type: 'all',
    difficulty_level: 'all',
    cultural_theme: '',
    sort_by: 'relevance',
    limit: 20,
    offset: 0,
    semantic_threshold: 0.7,
    include_cultural_context: true,
    difficulty_preference: 'adaptive'
  });

  const t = translations[language as keyof typeof translations] || translations.en;

  // Load SRS data on component mount
  useEffect(() => {
    const loadSRSData = () => {
      try {
        const stored = localStorage.getItem('macrobius_srs_data');
        if (stored) {
          const parsed = JSON.parse(stored);
          setSrsData(parsed);
          
          // Build user vocabulary profile from SRS data
          const knownWords = new Set<string>();
          const difficultWords = new Set<string>();
          const performanceScores: Record<string, number> = {};
          
          Object.entries(parsed).forEach(([wordId, data]: [string, any]) => {
            if (data.repetition_count >= 3 && data.easiness_factor > 2.0) {
              knownWords.add(wordId);
            }
            if (data.easiness_factor < 1.8) {
              difficultWords.add(wordId);
            }
            
            // Calculate average performance from review history
            if (data.review_history && data.review_history.length > 0) {
              const avgPerformance = data.review_history
                .slice(-5) // Last 5 reviews
                .reduce((sum: number, review: any) => sum + review.performance, 0) / Math.min(5, data.review_history.length);
              performanceScores[wordId] = avgPerformance;
            }
          });
          
          setUserVocabularyProfile({ known_words: knownWords, difficult_words: difficultWords, performance_scores: performanceScores });
        }
      } catch (err) {
        console.error('Failed to load SRS data:', err);
      }
    };
    
    loadSRSData();
  }, []);

  // Check backend connection and load corpus statistics
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const healthResponse = await MacrobiusAPI.system.healthCheck();
        if (healthResponse.status === 'success') {
          setBackendStatus('connected');
          
          // Load corpus statistics
          const statsResponse = await MacrobiusAPI.passages.getCorpusStatistics();
          if (statsResponse.status === 'success') {
            setCorpusStats({
              ...statsResponse.data,
              ai_features_active: true
            });
          }
        } else {
          setBackendStatus('error');
        }
      } catch (error) {
        console.error('Backend connection error:', error);
        setBackendStatus('error');
      }
    };

    checkBackendStatus();
  }, []);

  // 🧠 **SEMANTIC SEARCH IMPLEMENTATION**
  const performSemanticSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setCurrentAnalysisStage(t.loading);
    
    try {
      // Extract concepts and themes from natural language query
      const concepts = extractConcepts(query);
      const themes = mapToExistingThemes(query);
      
      const semanticQuery: SemanticSearchQuery = {
        natural_language: query,
        concepts,
        themes,
        similarity_threshold: filters.semantic_threshold || 0.7,
        cultural_context: filters.include_cultural_context || true,
        difficulty_filter: getDifficultyFilterValue(),
        include_analysis: readingAssistantEnabled
      };
      
      setCurrentAnalysisStage('Processing semantic query...');
      
      // Call semantic search API (simulated for now, would be real backend endpoint)
      const response = await performAdvancedSemanticSearch(semanticQuery);
      
      if (response.status === 'success' && response.data) {
        setCurrentAnalysisStage(t.analyzingPassage);
        
        // Process results with reading assistant if enabled
        const enhancedResults: SearchResult[] = await Promise.all(
          response.data.passages.map(async (semanticResult: SemanticSearchResult) => {
            const passage = semanticResult.passage;
            
            let readingAssistant: ReadingAssistant | undefined;
            if (readingAssistantEnabled) {
              setCurrentAnalysisStage(t.loadingVocabulary);
              readingAssistant = await generateReadingAssistant(passage, userVocabularyProfile);
            }
            
            return {
              id: passage.id.toString(),
              text: passage.latin_text,
              source: passage.work_type,
              book: passage.book_number,
              chapter: passage.chapter_number,
              section: passage.section_number,
              context: passage.modern_relevance,
              highlights: generateSemanticHighlights(passage.latin_text, concepts, themes),
              analysis: {
                complexity: passage.difficulty_level as 'beginner' | 'intermediate' | 'advanced',
                themes: [passage.cultural_theme],
                wordCount: passage.word_count,
                characterCount: passage.character_count
              },
              metadata: {
                work: passage.work_type,
                culturalTheme: passage.cultural_theme,
                modernRelevance: passage.modern_relevance,
                createdAt: passage.created_at
              },
              semantic_data: semanticResult,
              reading_assistant: readingAssistant
            };
          })
        );
        
        setResults(enhancedResults);
        setTotalResults(response.data.total || 0);
      } else {
        console.error('Semantic search error:', response.error);
        setResults([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error('Semantic search failed:', error);
      setResults([]);
      setTotalResults(0);
    }
    
    setLoading(false);
    setCurrentAnalysisStage('');
  };

  // 🎯 **CONCEPT AND THEME EXTRACTION**
  const extractConcepts = (query: string): string[] => {
    const conceptKeywords = {
      'festival': ['festival', 'celebration', 'feast', 'holiday', 'ceremony'],
      'philosophy': ['philosophy', 'wisdom', 'truth', 'knowledge', 'virtue'],
      'astronomy': ['astronomy', 'stars', 'cosmos', 'celestial', 'heaven'],
      'banquet': ['banquet', 'dinner', 'feast', 'meal', 'dining'],
      'religion': ['religion', 'god', 'divine', 'sacred', 'ritual'],
      'culture': ['culture', 'custom', 'tradition', 'practice', 'society'],
      'education': ['education', 'learning', 'teaching', 'school', 'study'],
      'literature': ['literature', 'poetry', 'writing', 'text', 'author']
    };
    
    const concepts: string[] = [];
    const queryLower = query.toLowerCase();
    
    Object.entries(conceptKeywords).forEach(([concept, keywords]) => {
      if (keywords.some(keyword => queryLower.includes(keyword))) {
        concepts.push(concept);
      }
    });
    
    return concepts;
  };

  const mapToExistingThemes = (query: string): string[] => {
    const themeKeywords = {
      'Religious Practices': ['religion', 'god', 'divine', 'sacred', 'ritual', 'prayer'],
      'Social Customs': ['custom', 'tradition', 'society', 'social', 'practice'],
      'Philosophy': ['philosophy', 'wisdom', 'truth', 'virtue', 'ethics'],
      'Education': ['education', 'learning', 'teaching', 'knowledge', 'study'],
      'Roman History': ['history', 'roman', 'empire', 'ancient', 'past'],
      'Literature': ['literature', 'poetry', 'writing', 'text', 'author'],
      'Law': ['law', 'legal', 'justice', 'court', 'rule'],
      'Astronomy': ['astronomy', 'stars', 'cosmos', 'celestial', 'heaven'],
      'General': ['general', 'common', 'universal', 'broad']
    };
    
    const themes: string[] = [];
    const queryLower = query.toLowerCase();
    
    Object.entries(themeKeywords).forEach(([theme, keywords]) => {
      if (keywords.some(keyword => queryLower.includes(keyword))) {
        themes.push(theme);
      }
    });
    
    return themes.length > 0 ? themes : ['General'];
  };

  // 🔍 **ADVANCED SEMANTIC SEARCH API CALL**
  const performAdvancedSemanticSearch = async (semanticQuery: SemanticSearchQuery) => {
    // This would be a real API call to the enhanced backend
    // For now, we'll simulate it by calling the existing API with enhanced processing
    
    try {
      const response = await MacrobiusAPI.passages.searchPassages(semanticQuery.natural_language, {
        work_type: filters.work_type,
        difficulty_level: filters.difficulty_level,
        cultural_theme: semanticQuery.themes.join(','),
        sort_by: 'relevance',
        limit: filters.limit,
        offset: filters.offset
      });
      
      if (response.status === 'success' && response.data) {
        // Enhance results with semantic analysis
        const enhancedData = {
          ...response.data,
          passages: response.data.passages.map((passage: MacrobiusPassage) => ({
            passage,
            relevance_score: calculateRelevanceScore(passage, semanticQuery),
            concept_matches: semanticQuery.concepts.filter(concept => 
              passage.latin_text.toLowerCase().includes(concept) ||
              passage.cultural_theme.toLowerCase().includes(concept)
            ),
            theme_matches: semanticQuery.themes.filter(theme => 
              passage.cultural_theme === theme
            ),
            semantic_analysis: {
              key_concepts: extractPassageConcepts(passage),
              cultural_significance: passage.modern_relevance,
              difficulty_indicators: getDifficultyIndicators(passage),
              vocabulary_complexity: calculateVocabularyComplexity(passage)
            }
          }))
        };
        
        return { status: 'success' as const, data: enhancedData };
      }
      
      return response;
    } catch (error) {
      console.error('Advanced semantic search error:', error);
      return { status: 'error' as const, error: 'Semantic search failed' };
    }
  };

  // 📖 **READING ASSISTANT GENERATION**
  const generateReadingAssistant = async (passage: MacrobiusPassage, vocabularyProfile: typeof userVocabularyProfile): Promise<ReadingAssistant> => {
    setCurrentAnalysisStage(t.generatingQuestions);
    
    // Generate vocabulary help
    const vocabularyHelp = await generateVocabularyHelp(passage, vocabularyProfile);
    
    // Analyze difficulty
    const difficultyAnalysis: DifficultyAnalysis = {
      overall_level: passage.difficulty_level as 'beginner' | 'intermediate' | 'advanced',
      vocabulary_complexity: calculateVocabularyComplexity(passage),
      syntax_complexity: calculateSyntaxComplexity(passage),
      cultural_complexity: calculateCulturalComplexity(passage),
      recommended_prerequisites: getRecommendedPrerequisites(passage),
      estimated_reading_time: Math.ceil(passage.word_count / 100) // Words per minute estimate
    };
    
    // Generate cultural context
    const culturalContext: CulturalContext = {
      primary_themes: [passage.cultural_theme],
      historical_background: passage.modern_relevance,
      modern_relevance: passage.modern_relevance,
      related_concepts: extractPassageConcepts(passage),
      visual_aids: [] // Would be populated with relevant images/diagrams
    };
    
    // Generate comprehension questions
    const comprehensionCheck = generateComprehensionQuestions(passage);
    
    // Generate guided questions
    const guidedQuestions = generateGuidedQuestions(passage);
    
    // SRS Integration
    const srsIntegration: SRSIntegration = {
      vocabulary_to_review: vocabularyHelp
        .filter(vh => vh.srs_status && !vh.srs_status.known)
        .map(vh => vh.word),
      new_words_learned: vocabularyHelp
        .filter(vh => !vocabularyProfile.known_words.has(vh.word))
        .map(vh => vh.word),
      performance_impact: calculatePerformanceImpact(vocabularyHelp, vocabularyProfile),
      suggested_study_time: Math.ceil(vocabularyHelp.length * 0.5) // Minutes per word
    };
    
    return {
      vocabulary_help: vocabularyHelp,
      difficulty_analysis: difficultyAnalysis,
      cultural_context: culturalContext,
      guided_questions: guidedQuestions,
      comprehension_check: comprehensionCheck,
      srs_integration: srsIntegration
    };
  };

  // 📚 **VOCABULARY HELP GENERATION**
  const generateVocabularyHelp = async (passage: MacrobiusPassage, vocabularyProfile: typeof userVocabularyProfile): Promise<VocabularyHelp[]> => {
    const words = passage.latin_text.split(/\s+/);
    const vocabularyHelp: VocabularyHelp[] = [];
    
    let position = 0;
    for (const word of words) {
      const cleanWord = word.replace(/[.,;:!?]/g, '');
      const wordStart = passage.latin_text.indexOf(word, position);
      const wordEnd = wordStart + word.length;
      
      // Check if word needs help based on difficulty and SRS data
      const needsHelp = shouldProvideHelp(cleanWord, vocabularyProfile);
      
      if (needsHelp) {
        const srsStatus = srsData[cleanWord] ? {
          known: vocabularyProfile.known_words.has(cleanWord),
          last_reviewed: new Date(srsData[cleanWord].last_review_date),
          next_review: new Date(srsData[cleanWord].next_review_date),
          performance_score: vocabularyProfile.performance_scores[cleanWord] || 0
        } : undefined;
        
        vocabularyHelp.push({
          word: cleanWord,
          position: { start: wordStart, end: wordEnd },
          difficulty_level: getDifficultyLevel(cleanWord),
          translations: await getWordTranslations(cleanWord),
          srs_status: srsStatus,
          grammatical_info: await getGrammaticalInfo(cleanWord),
          cultural_context: await getCulturalContext(cleanWord)
        });
      }
      
      position = wordEnd;
    }
    
    return vocabularyHelp;
  };

  // 🎯 **UTILITY FUNCTIONS**
  const calculateRelevanceScore = (passage: MacrobiusPassage, query: SemanticSearchQuery): number => {
    let score = 0;
    
    // Text matching
    const textMatch = passage.latin_text.toLowerCase().includes(query.natural_language.toLowerCase()) ? 0.3 : 0;
    
    // Concept matching
    const conceptMatch = query.concepts.length > 0 ? 
      query.concepts.filter(concept => 
        passage.latin_text.toLowerCase().includes(concept) ||
        passage.cultural_theme.toLowerCase().includes(concept)
      ).length / query.concepts.length * 0.4 : 0;
    
    // Theme matching
    const themeMatch = query.themes.includes(passage.cultural_theme) ? 0.3 : 0;
    
    return Math.min(textMatch + conceptMatch + themeMatch, 1.0);
  };

  const shouldProvideHelp = (word: string, vocabularyProfile: typeof userVocabularyProfile): boolean => {
    // Provide help for unknown words or words with low performance
    return !vocabularyProfile.known_words.has(word) || 
           vocabularyProfile.difficult_words.has(word) ||
           (vocabularyProfile.performance_scores[word] || 0) < 3;
  };

  const getDifficultyLevel = (word: string): number => {
    // Simple heuristic - would be enhanced with real linguistic analysis
    const complexity = word.length > 8 ? 3 : word.length > 5 ? 2 : 1;
    return Math.min(complexity + (word.includes('qu') ? 1 : 0), 5);
  };

  const getWordTranslations = async (word: string): Promise<string[]> => {
    // Would call vocabulary API
    const commonTranslations: Record<string, string[]> = {
      'deus': ['god', 'deity'],
      'homo': ['man', 'human'],
      'vita': ['life'],
      'amor': ['love'],
      'tempus': ['time'],
      'veritas': ['truth'],
      'sapientia': ['wisdom']
    };
    
    return commonTranslations[word.toLowerCase()] || ['translation available'];
  };

  const getGrammaticalInfo = async (word: string): Promise<string> => {
    // Simplified grammatical analysis
    if (word.endsWith('us')) return 'Noun, masculine, nominative singular';
    if (word.endsWith('a')) return 'Noun, feminine, nominative singular';
    if (word.endsWith('um')) return 'Noun, neuter, nominative singular';
    return 'See grammar guide for details';
  };

  const getCulturalContext = async (word: string): Promise<string> => {
    // Would provide cultural context for culturally significant words
    const culturalWords: Record<string, string> = {
      'deus': 'Roman gods played central roles in daily life and state affairs',
      'paterfamilias': 'The male head of a Roman household with absolute authority',
      'senatus': 'The Roman Senate, governing body of the Republic and Empire'
    };
    
    return culturalWords[word.toLowerCase()] || 'Standard Latin vocabulary';
  };

  const calculateVocabularyComplexity = (passage: MacrobiusPassage): number => {
    // Simple heuristic based on word length and frequency
    return Math.min(passage.word_count / 50, 10);
  };

  const calculateSyntaxComplexity = (passage: MacrobiusPassage): number => {
    // Heuristic based on sentence length and structure
    const avgSentenceLength = passage.character_count / Math.max(passage.latin_text.split('.').length, 1);
    return Math.min(avgSentenceLength / 20, 10);
  };

  const calculateCulturalComplexity = (passage: MacrobiusPassage): number => {
    const culturalThemeComplexity: Record<string, number> = {
      'Philosophy': 9,
      'Astronomy': 8,
      'Religious Practices': 7,
      'Literature': 6,
      'Education': 5,
      'Social Customs': 4,
      'Roman History': 4,
      'Law': 6,
      'General': 3
    };
    
    return culturalThemeComplexity[passage.cultural_theme] || 5;
  };

  const extractPassageConcepts = (passage: MacrobiusPassage): string[] => {
    // Extract key concepts from the passage
    const conceptIndicators = {
      'wisdom': ['sapientia', 'prudentia'],
      'virtue': ['virtus', 'honestus'],
      'knowledge': ['scientia', 'cognitio'],
      'divine': ['divinus', 'deus'],
      'nature': ['natura', 'naturalis']
    };
    
    const concepts: string[] = [];
    const textLower = passage.latin_text.toLowerCase();
    
    Object.entries(conceptIndicators).forEach(([concept, indicators]) => {
      if (indicators.some(indicator => textLower.includes(indicator))) {
        concepts.push(concept);
      }
    });
    
    return concepts;
  };

  const getDifficultyIndicators = (passage: MacrobiusPassage): string[] => {
    const indicators: string[] = [];
    
    if (passage.word_count > 100) indicators.push('Long passage');
    if (passage.cultural_theme === 'Philosophy') indicators.push('Abstract concepts');
    if (passage.latin_text.includes('subjunctive')) indicators.push('Complex grammar');
    
    return indicators;
  };

  const getRecommendedPrerequisites = (passage: MacrobiusPassage): string[] => {
    const prerequisites: string[] = [];
    
    switch (passage.difficulty_level) {
      case 'advanced':
        prerequisites.push('Intermediate Latin grammar', 'Roman cultural knowledge');
        break;
      case 'intermediate':
        prerequisites.push('Basic Latin vocabulary', 'Elementary grammar');
        break;
      default:
        prerequisites.push('Latin alphabet', 'Basic pronunciation');
    }
    
    return prerequisites;
  };

  const generateComprehensionQuestions = (passage: MacrobiusPassage): ComprehensionQuestion[] => {
    // Generate contextual questions based on passage content
    const questions: ComprehensionQuestion[] = [
      {
        id: '1',
        type: 'multiple_choice',
        question: `What is the main theme of this passage from ${passage.work_type}?`,
        options: [passage.cultural_theme, 'Roman Politics', 'Military Strategy', 'Economic Theory'],
        correct_answer: passage.cultural_theme,
        explanation: `This passage focuses on ${passage.cultural_theme}, as indicated by the cultural context.`,
        difficulty: 'easy'
      },
      {
        id: '2',
        type: 'short_answer',
        question: 'How does this passage reflect Roman cultural values?',
        correct_answer: passage.modern_relevance,
        explanation: 'The passage demonstrates Roman values through its cultural context and themes.',
        difficulty: 'medium'
      }
    ];
    
    return questions;
  };

  const generateGuidedQuestions = (passage: MacrobiusPassage): string[] => {
    const questions = [
      'What cultural theme is being explored in this passage?',
      'How does this relate to modern understanding?',
      'What key vocabulary should you focus on?',
      'What grammatical structures do you notice?'
    ];
    
    return questions;
  };

  const calculatePerformanceImpact = (vocabularyHelp: VocabularyHelp[], vocabularyProfile: typeof userVocabularyProfile): number => {
    const unknownWords = vocabularyHelp.filter(vh => !vocabularyProfile.known_words.has(vh.word));
    return Math.min(unknownWords.length / vocabularyHelp.length * 10, 10);
  };

  const getDifficultyFilterValue = (): number => {
    switch (filters.difficulty_preference) {
      case 'challenging': return 8;
      case 'comfortable': return 3;
      default: return 5; // adaptive
    }
  };

  // Enhanced search function
  const performSearch = async () => {
    if (!searchTerm.trim()) return;
    
    if (semanticMode) {
      await performSemanticSearch(searchTerm);
    } else {
      // Use existing basic search functionality
      await performBasicSearch();
    }
  };

  const performBasicSearch = async () => {
    // Existing basic search implementation (simplified)
    setLoading(true);
    
    try {
      const response = await MacrobiusAPI.passages.searchPassages(searchTerm, filters);
      
      if (response.status === 'success' && response.data) {
        const searchResults: SearchResult[] = response.data.passages.map((passage: MacrobiusPassage) => ({
          id: passage.id.toString(),
          text: passage.latin_text,
          source: passage.work_type,
          book: passage.book_number,
          chapter: passage.chapter_number,
          section: passage.section_number,
          context: passage.modern_relevance,
          highlights: generateHighlights(passage.latin_text, searchTerm),
          analysis: {
            complexity: passage.difficulty_level as 'beginner' | 'intermediate' | 'advanced',
            themes: [passage.cultural_theme],
            wordCount: passage.word_count,
            characterCount: passage.character_count
          },
          metadata: {
            work: passage.work_type,
            culturalTheme: passage.cultural_theme,
            modernRelevance: passage.modern_relevance,
            createdAt: passage.created_at
          }
        }));
        
        setResults(searchResults);
        setTotalResults(response.data.total || 0);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
      setTotalResults(0);
    }
    
    setLoading(false);
  };

  const generateHighlights = (text: string, searchTerm: string): Array<{ start: number; end: number; type: string; }> => {
    const highlights: Array<{ start: number; end: number; type: string; }> = [];
    const searchLower = searchTerm.toLowerCase();
    const textLower = text.toLowerCase();
    
    let index = 0;
    while ((index = textLower.indexOf(searchLower, index)) !== -1) {
      highlights.push({
        start: index,
        end: index + searchTerm.length,
        type: 'match'
      });
      index += searchTerm.length;
    }
    
    return highlights;
  };

  const generateSemanticHighlights = (text: string, concepts: string[], themes: string[]): Array<{ start: number; end: number; type: string; }> => {
    const highlights: Array<{ start: number; end: number; type: string; }> = [];
    const textLower = text.toLowerCase();
    
    // Highlight concept matches
    concepts.forEach(concept => {
      let index = 0;
      while ((index = textLower.indexOf(concept.toLowerCase(), index)) !== -1) {
        highlights.push({
          start: index,
          end: index + concept.length,
          type: 'concept'
        });
        index += concept.length;
      }
    });
    
    // Highlight theme-related words
    themes.forEach(theme => {
      const themeWords = getThemeWords(theme);
      themeWords.forEach(word => {
        let index = 0;
        while ((index = textLower.indexOf(word.toLowerCase(), index)) !== -1) {
          highlights.push({
            start: index,
            end: index + word.length,
            type: 'theme'
          });
          index += word.length;
        }
      });
    });
    
    return highlights;
  };

  const getThemeWords = (theme: string): string[] => {
    const themeWordMap: Record<string, string[]> = {
      'Religious Practices': ['deus', 'sacrum', 'religiosus'],
      'Philosophy': ['sapientia', 'veritas', 'virtus'],
      'Social Customs': ['mos', 'consuetudo', 'traditio'],
      'Education': ['disciplina', 'eruditio', 'doctrina']
    };
    
    return themeWordMap[theme] || [];
  };

  const highlightText = (text: string, highlights: Array<{ start: number; end: number; type: string; }>) => {
    if (!highlights.length) return text;
    
    let result = '';
    let lastIndex = 0;
    
    highlights.forEach(highlight => {
      result += text.substring(lastIndex, highlight.start);
      
      const className = highlight.type === 'concept' 
        ? 'bg-blue-300 text-blue-900 px-1 rounded font-semibold'
        : highlight.type === 'theme'
        ? 'bg-green-300 text-green-900 px-1 rounded font-semibold'
        : 'bg-yellow-300 text-black px-1 rounded font-semibold';
      
      result += `<mark class="${className}">${text.substring(highlight.start, highlight.end)}</mark>`;
      lastIndex = highlight.end;
    });
    result += text.substring(lastIndex);
    
    return result;
  };

  const toggleExpanded = (resultId: string) => {
    const newExpanded = new Set(expandedResults);
    if (newExpanded.has(resultId)) {
      newExpanded.delete(resultId);
    } else {
      newExpanded.add(resultId);
    }
    setExpandedResults(newExpanded);
  };

  const toggleVocabularyExpanded = (resultId: string) => {
    const newExpanded = new Set(expandedVocabulary);
    if (newExpanded.has(resultId)) {
      newExpanded.delete(resultId);
    } else {
      newExpanded.add(resultId);
    }
    setExpandedVocabulary(newExpanded);
  };

  const toggleBookmark = (resultId: string) => {
    const newBookmarks = new Set(bookmarkedResults);
    if (newBookmarks.has(resultId)) {
      newBookmarks.delete(resultId);
    } else {
      newBookmarks.add(resultId);
    }
    setBookmarkedResults(newBookmarks);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadResults = () => {
    const resultsText = results.map(result => 
      `${result.source} ${result.book}.${result.chapter}.${result.section}\n${result.text}\nModern Relevance: ${result.context}\n\n`
    ).join('');
    
    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `macrobius-ai-search-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getBackendStatusColor = () => {
    switch (backendStatus) {
      case 'connected': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-100 text-green-700';
    if (score >= 0.6) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <section id="text-search-ai" className="py-20 relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header with AI Status */}
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
            <div className={`flex items-center space-x-2 ${getBackendStatusColor()}`}>
              <Database className="w-4 h-4" />
              <span className="font-medium">
                {backendStatus === 'connected' ? t.connected : 
                 backendStatus === 'error' ? 'Backend Offline' : 'Connecting...'}
              </span>
            </div>
            {corpusStats?.ai_features_active && (
              <>
                <div className="text-white/70">•</div>
                <div className="flex items-center space-x-2 text-purple-400">
                  <Brain className="w-4 h-4" />
                  <span className="font-medium">{t.aiFeatures}</span>
                </div>
              </>
            )}
            {corpusStats && (
              <>
                <div className="text-white/70">•</div>
                <div className="text-white/70">
                  {corpusStats.total_passages?.toLocaleString()} passages
                </div>
                <div className="text-white/70">•</div>
                <div className="text-white/70">
                  {Math.round((corpusStats.total_characters || 0) / 1000)}K characters
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Enhanced Search Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Main Search with AI Toggle */}
          <div className="lg:col-span-3">
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30 shadow-xl">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Search Mode Toggle */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      <Button
                        variant={semanticMode ? "default" : "outline"}
                        onClick={() => setSemanticMode(true)}
                        className={semanticMode ? "bg-purple-600 text-white" : "border-purple-400 text-purple-300"}
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        {t.semanticMode}
                      </Button>
                      <Button
                        variant={!semanticMode ? "default" : "outline"}
                        onClick={() => setSemanticMode(false)}
                        className={!semanticMode ? "bg-blue-600 text-white" : "border-blue-400 text-blue-300"}
                      >
                        <Search className="w-4 h-4 mr-2" />
                        {t.basicMode}
                      </Button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setReadingAssistantEnabled(!readingAssistantEnabled)}
                        className={readingAssistantEnabled ? "border-green-400 text-green-300" : "border-gray-400 text-gray-300"}
                      >
                        <GraduationCap className="w-4 h-4 mr-1" />
                        {readingAssistantEnabled ? t.disableReadingAssistant : t.enableReadingAssistant}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setVocabularyHelpEnabled(!vocabularyHelpEnabled)}
                        className={vocabularyHelpEnabled ? "border-blue-400 text-blue-300" : "border-gray-400 text-gray-300"}
                      >
                        <BookMarked className="w-4 h-4 mr-1" />
                        {vocabularyHelpEnabled ? t.hideVocabHelp : t.showVocabHelp}
                      </Button>
                    </div>
                  </div>

                  {/* Search Input */}
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      {semanticMode ? (
                        <Brain className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                      ) : (
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold w-5 h-5" />
                      )}
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={semanticMode ? t.semanticSearchPlaceholder : t.searchPlaceholder}
                        className="w-full pl-10 pr-4 py-3 bg-white/20 border border-gold/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                        disabled={backendStatus !== 'connected'}
                      />
                    </div>
                    <Button
                      onClick={performSearch}
                      disabled={loading || !searchTerm.trim() || backendStatus !== 'connected'}
                      className={semanticMode ? "bg-purple-600 hover:bg-purple-700 text-white px-8 py-3" : "bg-wine-red hover:bg-wine-red/80 text-gold px-8 py-3"}
                    >
                      {loading ? (
                        <>
                          <Zap className="w-4 h-4 mr-2 animate-spin" />
                          {currentAnalysisStage || t.loading}
                        </>
                      ) : (
                        <>
                          {semanticMode ? <Brain className="w-4 h-4 mr-2" /> : <Search className="w-4 h-4 mr-2" />}
                          {t.searchButton}
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Advanced Search Toggle */}
                  <Button
                    variant="ghost"
                    onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                    className="text-white/80 hover:text-white"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {t.advancedSearch}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Corpus Statistics with AI Features */}
          <div className="space-y-4">
            {corpusStats && (
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardHeader>
                  <CardTitle className="text-gold text-sm flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    {t.corpusStats}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2 text-xs text-white/80">
                    <div className="flex justify-between">
                      <span>{t.totalPassages}:</span>
                      <span className="font-bold text-gold">{corpusStats.total_passages?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.totalCharacters}:</span>
                      <span className="font-bold text-gold">{corpusStats.total_characters?.toLocaleString()}</span>
                    </div>
                    {corpusStats.ai_features_active && (
                      <div className="pt-2 border-t border-white/20">
                        <div className="flex items-center space-x-2 text-purple-400">
                          <Sparkles className="w-3 h-3" />
                          <span className="font-medium text-xs">AI Enhanced</span>
                        </div>
                        <div className="text-xs text-white/60 mt-1">
                          • Semantic Search
                        </div>
                        <div className="text-xs text-white/60">
                          • Reading Assistant
                        </div>
                        <div className="text-xs text-white/60">
                          • SRS Integration
                        </div>
                      </div>
                    )}
                    <div className="pt-2 border-t border-white/20">
                      <span className="font-medium">{t.workDistribution}:</span>
                      {corpusStats.work_distribution && Object.entries(corpusStats.work_distribution).map(([work, count]: [string, number]) => (
                        <div key={work} className="flex justify-between mt-1">
                          <span>{work}:</span>
                          <span className="font-bold">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* SRS Integration Status */}
            {Object.keys(srsData).length > 0 && (
              <Card className="bg-white/10 backdrop-blur-sm border border-purple-400/30">
                <CardHeader>
                  <CardTitle className="text-purple-400 text-sm flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {t.srsIntegration}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2 text-xs text-white/80">
                    <div className="flex justify-between">
                      <span>Known Words:</span>
                      <span className="font-bold text-green-400">{userVocabularyProfile.known_words.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Difficult Words:</span>
                      <span className="font-bold text-red-400">{userVocabularyProfile.difficult_words.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Tracked:</span>
                      <span className="font-bold text-purple-400">{Object.keys(srsData).length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Enhanced Advanced Filters */}
        {showAdvancedSearch && (
          <Card className="mb-8 bg-white/10 backdrop-blur-sm border border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Advanced AI Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm text-white/80 mb-2">Work Type</label>
                  <select
                    value={filters.work_type}
                    onChange={(e) => setFilters({...filters, work_type: e.target.value as any})}
                    className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white"
                  >
                    <option value="all">All Works</option>
                    <option value="Saturnalia">Saturnalia</option>
                    <option value="Commentarii">Commentarii</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-white/80 mb-2">Difficulty</label>
                  <select
                    value={filters.difficulty_level}
                    onChange={(e) => setFilters({...filters, difficulty_level: e.target.value as any})}
                    className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">Cultural Theme</label>
                  <input
                    type="text"
                    value={filters.cultural_theme || ''}
                    onChange={(e) => setFilters({...filters, cultural_theme: e.target.value})}
                    placeholder="Enter theme..."
                    className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white placeholder-white/60"
                  />
                </div>

                {semanticMode && (
                  <>
                    <div>
                      <label className="block text-sm text-white/80 mb-2">Semantic Threshold</label>
                      <select
                        value={filters.semantic_threshold}
                        onChange={(e) => setFilters({...filters, semantic_threshold: Number(e.target.value)})}
                        className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white"
                      >
                        <option value={0.5}>Loose (50%)</option>
                        <option value={0.7}>Moderate (70%)</option>
                        <option value={0.8}>Strict (80%)</option>
                        <option value={0.9}>Very Strict (90%)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-white/80 mb-2">Difficulty Preference</label>
                      <select
                        value={filters.difficulty_preference}
                        onChange={(e) => setFilters({...filters, difficulty_preference: e.target.value as any})}
                        className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white"
                      >
                        <option value="adaptive">Adaptive</option>
                        <option value="comfortable">Comfortable</option>
                        <option value="challenging">Challenging</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Header */}
        {results.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gold flex items-center">
              {semanticMode ? <Brain className="w-6 h-6 mr-2" /> : <BookOpen className="w-6 h-6 mr-2" />}
              {semanticMode ? t.semanticResults : t.results} ({totalResults.toLocaleString()})
            </h3>
            <div className="flex space-x-2">
              <Button
                onClick={downloadResults}
                variant="outline"
                size="sm"
                className="border-gold text-gold hover:bg-gold hover:text-black"
              >
                <Download className="w-4 h-4 mr-2" />
                Download AI Results
              </Button>
            </div>
          </div>
        )}

        {/* No Results */}
        {results.length === 0 && searchTerm && !loading && (
          <div className="text-center py-12">
            {semanticMode ? <Brain className="w-16 h-16 text-white/40 mx-auto mb-4" /> : <BookOpen className="w-16 h-16 text-white/40 mx-auto mb-4" />}
            <p className="text-white/60 text-lg">{t.noResults}</p>
            <p className="text-white/40 text-sm mt-2">
              {backendStatus === 'connected' ? 
                (semanticMode ? 'Try rephrasing your question or adjusting semantic threshold' : 'Try adjusting your search terms or filters') : 
                'Please check backend connection'}
            </p>
          </div>
        )}

        {/* Enhanced Search Results */}
        <div className="space-y-6">
          {results.map((result) => (
            <Card key={result.id} className="bg-white/10 backdrop-blur-sm border border-gold/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                {/* Enhanced Result Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-lg font-semibold text-gold">
                      {result.source} - Book {result.book}, Chapter {result.chapter}
                      {result.section && `.${result.section}`}
                    </h4>
                    <Badge className={getDifficultyColor(result.analysis.complexity)}>
                      {result.analysis.complexity}
                    </Badge>
                    <Badge variant="outline" className="border-blue-400 text-blue-300">
                      {result.metadata.culturalTheme}
                    </Badge>
                    {result.semantic_data && (
                      <Badge className={getRelevanceColor(result.semantic_data.relevance_score)}>
                        {Math.round(result.semantic_data.relevance_score * 100)}% {t.relevanceScore}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(result.id)}
                      className={bookmarkedResults.has(result.id) ? 'text-gold' : 'text-white/60'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(result.text)}
                      className="text-white/60 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    {vocabularyHelpEnabled && result.reading_assistant && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleVocabularyExpanded(result.id)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <BookMarked className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(result.id)}
                      className="text-white/60 hover:text-white"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Semantic Analysis Summary */}
                {result.semantic_data && (
                  <div className="mb-4 p-3 bg-purple-900/20 rounded border border-purple-400/30">
                    <div className="flex flex-wrap gap-2 text-sm">
                      {result.semantic_data.concept_matches.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <span className="text-purple-300 font-medium">{t.conceptMatches}:</span>
                          {result.semantic_data.concept_matches.map(concept => (
                            <Badge key={concept} className="bg-purple-600/20 text-purple-300 border-purple-400">
                              {concept}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {result.semantic_data.theme_matches.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-300 font-medium">{t.themeMatches}:</span>
                          {result.semantic_data.theme_matches.map(theme => (
                            <Badge key={theme} className="bg-blue-600/20 text-blue-300 border-blue-400">
                              {theme}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Latin Text with Enhanced Highlights */}
                <div className="mb-4">
                  <p 
                    className="text-white/90 text-lg leading-relaxed font-serif italic"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightText(result.text, result.highlights) 
                    }}
                  />
                </div>

                {/* Modern Relevance */}
                <div className="text-sm text-white/70 italic mb-4 bg-black/20 p-3 rounded">
                  <strong>Modern Relevance:</strong> {result.context}
                </div>

                {/* Vocabulary Help Panel */}
                {vocabularyHelpEnabled && result.reading_assistant && expandedVocabulary.has(result.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-4 p-4 bg-blue-900/20 rounded border border-blue-400/30"
                  >
                    <h5 className="font-semibold text-blue-300 mb-3 flex items-center">
                      <BookMarked className="w-4 h-4 mr-2" />
                      {t.vocabularyHelp}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {result.reading_assistant.vocabulary_help.slice(0, 6).map((vocab, idx) => (
                        <div key={idx} className="text-sm bg-black/20 p-2 rounded">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-blue-300">{vocab.word}</span>
                            <div className="flex items-center space-x-1">
                              <Badge className="text-xs px-1">
                                Level {vocab.difficulty_level}
                              </Badge>
                              {vocab.srs_status && (
                                <Badge className={vocab.srs_status.known ? "bg-green-600/20 text-green-300" : "bg-red-600/20 text-red-300"}>
                                  {vocab.srs_status.known ? 'Known' : 'Review'}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-white/70 text-xs">
                            {vocab.translations.join(', ')}
                          </div>
                          {vocab.grammatical_info && (
                            <div className="text-white/60 text-xs italic mt-1">
                              {vocab.grammatical_info}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* SRS Integration Summary */}
                    {result.reading_assistant.srs_integration && (
                      <div className="mt-3 pt-3 border-t border-blue-400/30">
                        <div className="grid grid-cols-3 gap-4 text-xs">
                          <div className="text-center">
                            <div className="font-bold text-red-400">{result.reading_assistant.srs_integration.vocabulary_to_review.length}</div>
                            <div className="text-white/60">{t.wordsToReview}</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-green-400">{result.reading_assistant.srs_integration.new_words_learned.length}</div>
                            <div className="text-white/60">{t.newWordsLearned}</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-purple-400">{result.reading_assistant.srs_integration.suggested_study_time}m</div>
                            <div className="text-white/60">{t.studyTime}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Reading Assistant Panel */}
                {readingAssistantEnabled && result.reading_assistant && expandedResults.has(result.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="border-t border-gold/30 pt-4 space-y-4"
                  >
                    <Tabs defaultValue="difficulty" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 bg-black/20">
                        <TabsTrigger value="difficulty" className="text-white">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          {t.difficultyAnalysis}
                        </TabsTrigger>
                        <TabsTrigger value="cultural" className="text-white">
                          <Globe className="w-4 h-4 mr-1" />
                          {t.culturalContext}
                        </TabsTrigger>
                        <TabsTrigger value="questions" className="text-white">
                          <HelpCircle className="w-4 h-4 mr-1" />
                          {t.guidedQuestions}
                        </TabsTrigger>
                        <TabsTrigger value="comprehension" className="text-white">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {t.comprehensionCheck}
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="difficulty" className="mt-4">
                        <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-4 rounded border border-yellow-400/30">
                          <h6 className="font-semibold text-yellow-300 mb-3">{t.difficultyAnalysis}</h6>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-white/70">{t.vocabularyComplexity}:</span>
                              <div className="mt-1">
                                <Progress value={result.reading_assistant.difficulty_analysis.vocabulary_complexity * 10} className="h-2" />
                                <span className="text-xs text-yellow-300">{result.reading_assistant.difficulty_analysis.vocabulary_complexity}/10</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-white/70">{t.syntaxComplexity}:</span>
                              <div className="mt-1">
                                <Progress value={result.reading_assistant.difficulty_analysis.syntax_complexity * 10} className="h-2" />
                                <span className="text-xs text-yellow-300">{result.reading_assistant.difficulty_analysis.syntax_complexity}/10</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-white/70">{t.culturalComplexity}:</span>
                              <div className="mt-1">
                                <Progress value={result.reading_assistant.difficulty_analysis.cultural_complexity * 10} className="h-2" />
                                <span className="text-xs text-yellow-300">{result.reading_assistant.difficulty_analysis.cultural_complexity}/10</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-white/70">{t.readingTime}:</span>
                              <div className="font-bold text-yellow-300">{result.reading_assistant.difficulty_analysis.estimated_reading_time}m</div>
                            </div>
                          </div>
                          {result.reading_assistant.difficulty_analysis.recommended_prerequisites.length > 0 && (
                            <div className="mt-3">
                              <span className="text-white/70 text-sm">{t.prerequisites}:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {result.reading_assistant.difficulty_analysis.recommended_prerequisites.map(prereq => (
                                  <Badge key={prereq} variant="outline" className="border-yellow-400 text-yellow-300 text-xs">
                                    {prereq}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="cultural" className="mt-4">
                        <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-4 rounded border border-green-400/30">
                          <h6 className="font-semibold text-green-300 mb-3">{t.culturalContext}</h6>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="font-medium text-green-300">Historical Background:</span>
                              <p className="text-white/80 mt-1">{result.reading_assistant.cultural_context.historical_background}</p>
                            </div>
                            <div>
                              <span className="font-medium text-green-300">Modern Relevance:</span>
                              <p className="text-white/80 mt-1">{result.reading_assistant.cultural_context.modern_relevance}</p>
                            </div>
                            {result.reading_assistant.cultural_context.related_concepts.length > 0 && (
                              <div>
                                <span className="font-medium text-green-300">Related Concepts:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {result.reading_assistant.cultural_context.related_concepts.map(concept => (
                                    <Badge key={concept} variant="outline" className="border-green-400 text-green-300 text-xs">
                                      {concept}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="questions" className="mt-4">
                        <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-4 rounded border border-blue-400/30">
                          <h6 className="font-semibold text-blue-300 mb-3">{t.guidedQuestions}</h6>
                          <div className="space-y-2">
                            {result.reading_assistant.guided_questions.map((question, idx) => (
                              <div key={idx} className="flex items-start space-x-2">
                                <MessageCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                <span className="text-white/80 text-sm">{question}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="comprehension" className="mt-4">
                        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-4 rounded border border-purple-400/30">
                          <h6 className="font-semibold text-purple-300 mb-3">{t.comprehensionQuestions}</h6>
                          <div className="space-y-3">
                            {result.reading_assistant.comprehension_check.map((question, idx) => (
                              <div key={question.id} className="bg-black/20 p-3 rounded">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-purple-300 text-sm">Question {idx + 1}</span>
                                  <Badge className={`text-xs ${
                                    question.difficulty === 'easy' ? 'bg-green-600/20 text-green-300' :
                                    question.difficulty === 'medium' ? 'bg-yellow-600/20 text-yellow-300' :
                                    'bg-red-600/20 text-red-300'
                                  }`}>
                                    {question.difficulty}
                                  </Badge>
                                </div>
                                <p className="text-white/80 text-sm mb-2">{question.question}</p>
                                {question.options && (
                                  <div className="space-y-1 mb-2">
                                    {question.options.map(option => (
                                      <div key={option} className="text-xs text-white/60 pl-2">
                                        • {option}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <details className="text-xs">
                                  <summary className="text-purple-300 cursor-pointer">Show Answer & Explanation</summary>
                                  <div className="mt-2 p-2 bg-black/30 rounded">
                                    <div className="text-green-300 font-medium">Answer: {question.correct_answer}</div>
                                    <div className="text-white/70 mt-1">{question.explanation}</div>
                                  </div>
                                </details>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </motion.div>
                )}

                {/* Basic Info */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-400">
                    {result.analysis.wordCount} words
                  </Badge>
                  <Badge variant="secondary" className="bg-indigo-600/20 text-indigo-300 border-indigo-400">
                    {result.analysis.characterCount} chars
                  </Badge>
                  {result.analysis.themes.map(theme => (
                    <Badge key={theme} variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-400">
                      {theme}
                    </Badge>
                  ))}
                  {result.semantic_data && (
                    <Badge variant="secondary" className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 border-purple-400">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Enhanced
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {results.length > 0 && results.length < totalResults && (
          <div className="text-center mt-8">
            <Button
              onClick={() => {
                setFilters(prev => ({ ...prev, offset: prev.offset! + prev.limit! }));
                performSearch();
              }}
              className={semanticMode ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-wine-red hover:bg-wine-red/80 text-gold"}
              disabled={loading}
            >
              {loading ? 'Loading...' : `Load More AI Results (${totalResults - results.length} remaining)`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
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
  AlignLeft
} from 'lucide-react';

interface TextSearchSectionProps {
  language: string;
}

// 🧠 Enhanced Search Result with AI Analysis
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
  };
  metadata: {
    work: string;
    culturalTheme: string;
    modernRelevance: string;
    createdAt: string;
  };
  // 🎯 New Reading Comprehension Features
  readingAssistance?: {
    keyVocabulary: Array<{
      word: string;
      translation: string;
      frequency: number;
      difficulty: number;
      culturalNote?: string;
    }>;
    grammaticalHelp: Array<{
      feature: string;
      explanation: string;
      examples: string[];
    }>;
    culturalContext: string;
    modernConnections: string[];
    discussionPrompts: string[];
  };
  // 🔍 Semantic Analysis
  semanticAnalysis?: {
    concepts: string[];
    relatedPassages: string[];
    thematicCluster: string;
    conceptSimilarity: number;
  };
}

// 🎯 Semantic Search Configuration
interface SemanticSearchQuery {
  natural_language: string;
  concepts: string[];
  themes: string[];
  similarity_threshold: number;
  context_type: 'educational' | 'research' | 'cultural' | 'linguistic';
}

// 📚 Reading Comprehension Mode State
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
  };
}

// 🧠 Concept Clustering
interface ConceptCluster {
  id: string;
  name: string;
  description: string;
  passages: SearchResult[];
  similarity_score: number;
  key_themes: string[];
  educational_value: number;
}

const translations = {
  en: {
    title: 'MacrobiusTextProcessor',
    subtitle: 'AI-Enhanced Semantic Search & Reading Comprehension (1,401 Passages)',
    searchPlaceholder: 'Search through complete Macrobius corpus...',
    naturalSearchPlaceholder: 'Ask questions like: "What does Macrobius say about Roman dinner customs?"',
    searchButton: 'Search Corpus',
    semanticSearch: 'Semantic Search',
    naturalLanguageSearch: 'Natural Language Search',
    advancedSearch: 'Advanced Filters',
    readingMode: 'Reading Comprehension',
    conceptClusters: 'Concept Clusters',
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
    // 🧠 Semantic Search Terms
    queryAnalysis: 'Query Analysis',
    detectedConcepts: 'Detected Concepts',
    suggestedSearches: 'Suggested Searches',
    semanticMatches: 'Semantic Matches',
    conceptualSimilarity: 'Conceptual Similarity',
    thematicRelevance: 'Thematic Relevance',
    // 📚 Reading Comprehension Terms
    readingAssistance: 'Reading Assistance',
    vocabularyHelp: 'Vocabulary Help',
    keyVocabulary: 'Key Vocabulary',
    grammaticalFeatures: 'Grammatical Features',
    culturalContext: 'Cultural Context',
    modernConnections: 'Modern Connections',
    discussionPrompts: 'Discussion Questions',
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
    similarPassages: 'Similar Passages'
  },
  de: {
    title: 'MacrobiusTextProcessor',
    subtitle: 'KI-Erweiterte Semantische Suche & Leseverständnis (1.401 Textstellen)',
    searchPlaceholder: 'Durchsuche das komplette Macrobius-Korpus...',
    naturalSearchPlaceholder: 'Stelle Fragen wie: "Was sagt Macrobius über römische Tischsitten?"',
    searchButton: 'Korpus Durchsuchen',
    semanticSearch: 'Semantische Suche',
    naturalLanguageSearch: 'Natürlichsprachliche Suche',
    advancedSearch: 'Erweiterte Filter',
    readingMode: 'Leseverständnis',
    conceptClusters: 'Konzept-Cluster',
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
    // 🧠 Semantic Search Terms
    queryAnalysis: 'Anfrage-Analyse',
    detectedConcepts: 'Erkannte Konzepte',
    suggestedSearches: 'Vorgeschlagene Suchen',
    semanticMatches: 'Semantische Treffer',
    conceptualSimilarity: 'Konzeptuelle Ähnlichkeit',
    thematicRelevance: 'Thematische Relevanz',
    // 📚 Reading Comprehension Terms
    readingAssistance: 'Lesehilfe',
    vocabularyHelp: 'Vokabelhilfe',
    keyVocabulary: 'Schlüsselvokabular',
    grammaticalFeatures: 'Grammatische Merkmale',
    culturalContext: 'Kultureller Kontext',
    modernConnections: 'Moderne Verbindungen',
    discussionPrompts: 'Diskussionsfragen',
    readingProgress: 'Lesefortschritt',
    estimatedTime: 'Geschätzte Lesezeit',
    difficultyLevel: 'Schwierigkeitsgrad',
    comprehensionAids: 'Verständnishilfen',
    guidedReading: 'Geführtes Lesen',
    independentReading: 'Selbständiges Lesen',
    advancedAnalysis: 'Erweiterte Analyse',
    // 🎯 Clustering Terms
    clusterAnalysis: 'Konzept-Clustering',
    relatedConcepts: 'Verwandte Konzepte',
    thematicGroups: 'Thematische Gruppen',
    educationalValue: 'Bildungswert',
    conceptNetwork: 'Konzept-Netzwerk',
    similarPassages: 'Ähnliche Passagen'
  },
  la: {
    title: 'MacrobiusTextProcessor',
    subtitle: 'Quaestio Semantica AI-Aucta & Intellectus Lectionis (1.401 Loci)',
    searchPlaceholder: 'Quaere per totum corpus Macrobii...',
    naturalSearchPlaceholder: 'Interroga sicut: "Quid dicit Macrobius de consuetudine cenae Romanae?"',
    searchButton: 'Corpus Quaerere',
    semanticSearch: 'Quaestio Semantica',
    naturalLanguageSearch: 'Quaestio Linguae Naturalis',
    advancedSearch: 'Filtra Provecta',
    readingMode: 'Intellectus Lectionis',
    conceptClusters: 'Conceptuum Acervi',
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
    // 🧠 Semantic Search Terms
    queryAnalysis: 'Analysis Quaestionis',
    detectedConcepts: 'Conceptus Detecti',
    suggestedSearches: 'Quaestiones Suggestae',
    semanticMatches: 'Concordantiae Semanticae',
    conceptualSimilarity: 'Similitudo Conceptualis',
    thematicRelevance: 'Relevantia Thematica',
    // 📚 Reading Comprehension Terms
    readingAssistance: 'Auxilium Lectionis',
    vocabularyHelp: 'Auxilium Vocabularii',
    keyVocabulary: 'Vocabularium Principale',
    grammaticalFeatures: 'Proprietates Grammaticae',
    culturalContext: 'Contextus Culturalis',
    modernConnections: 'Nexus Moderni',
    discussionPrompts: 'Stimuli Disputationis',
    readingProgress: 'Progressus Lectionis',
    estimatedTime: 'Tempus Aestimatum',
    difficultyLevel: 'Gradus Difficultatis',
    comprehensionAids: 'Auxilia Intellectus',
    guidedReading: 'Lectio Ducta',
    independentReading: 'Lectio Libera',
    advancedAnalysis: 'Analysis Provecta',
    // 🎯 Clustering Terms
    clusterAnalysis: 'Analysis Acervorum',
    relatedConcepts: 'Conceptus Cognati',
    thematicGroups: 'Coetus Thematici',
    educationalValue: 'Valor Educationis',
    conceptNetwork: 'Rete Conceptuum',
    similarPassages: 'Loci Similes'
  }
};

export default function MacrobiusTextProcessor({ language }: TextSearchSectionProps) {
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
  const [currentMode, setCurrentMode] = useState<'search' | 'semantic' | 'reading' | 'clusters'>('search');
  
  // 🧠 Semantic Search State
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
  
  // 📚 Reading Comprehension State
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
      conceptsEncountered: []
    }
  });
  const [showReadingAssistance, setShowReadingAssistance] = useState<Set<string>>(new Set());
  
  // 🎯 Concept Clustering State
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

  // 🧠 AI-Powered Query Analysis
  const analyzeNaturalLanguageQuery = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    // Mock AI analysis - in production this would use real NLP
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
        difficulty_level: 'intermediate'
      },
      confidence: 0.87,
      similar_queries: [
        'What were Roman banquet customs?',
        'How did Romans conduct dinner parties?',
        'Social practices at Roman meals'
      ]
    };
    
    setQueryAnalysis(mockAnalysis);
    setDetectedConcepts(mockAnalysis.extracted_concepts);
    setSuggestedSearches(mockAnalysis.similar_queries);
    
    // Auto-apply suggested filters
    setFilters(prev => ({
      ...prev,
      ...mockAnalysis.suggested_filters
    }));
    
    return mockAnalysis;
  }, []);
  
  // 🎯 Semantic Search Implementation
  const performSemanticSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    
    try {
      // Analyze the natural language query
      await analyzeNaturalLanguageQuery(query);
      
      // Convert natural language to semantic search parameters
      const semanticParams: SemanticSearchQuery = {
        natural_language: query,
        concepts: detectedConcepts,
        themes: [],
        similarity_threshold: 0.7,
        context_type: 'educational'
      };
      
      // In production, this would call a real semantic search API
      // For now, we'll enhance the regular search with semantic features
      const enhancedFilters = {
        ...filters,
        semantic_query: query,
        concept_matching: true
      };
      
      const response = await MacrobiusAPI.passages.searchPassages(query, enhancedFilters);
      
      if (response.status === 'success' && response.data) {
        const enhancedResults: SearchResult[] = response.data.passages.map((passage: MacrobiusPassage) => {
          const baseResult = createSearchResult(passage, query);
          
          // Add semantic analysis
          baseResult.semanticAnalysis = {
            concepts: detectedConcepts.filter(() => Math.random() > 0.3), // Mock concept matching
            relatedPassages: ['1.2.3', '2.4.1', '3.1.5'], // Mock related passages
            thematicCluster: 'Roman Social Customs',
            conceptSimilarity: 0.75 + Math.random() * 0.2
          };
          
          // Enhanced reading assistance
          baseResult.readingAssistance = generateReadingAssistance(passage);
          
          return baseResult;
        });
        
        setResults(enhancedResults);
        setTotalResults(response.data.total || 0);
        
        // Generate concept clusters
        await generateConceptClusters(enhancedResults);
      }
    } catch (error) {
      console.error('Semantic search failed:', error);
      setResults([]);
      setTotalResults(0);
    }
    
    setLoading(false);
  }, [detectedConcepts, filters, analyzeNaturalLanguageQuery]);
  
  // 📚 Reading Assistance Generation
  const generateReadingAssistance = useCallback((passage: MacrobiusPassage): SearchResult['readingAssistance'] => {
    // Mock generation - in production this would use NLP and vocabulary analysis
    const words = passage.latin_text.split(' ');
    const keyVocabulary = words.slice(0, 5).map((word, idx) => ({
      word: word.replace(/[^a-zA-Z]/g, ''),
      translation: ['guest', 'dining room', 'magnificent', 'they reclined', 'conversation'][idx] || 'unknown',
      frequency: Math.floor(Math.random() * 100) + 1,
      difficulty: Math.floor(Math.random() * 10) + 1,
      culturalNote: idx === 0 ? 'In Roman culture, guests (convivae) had specific social roles and expectations' : undefined
    }));
    
    return {
      keyVocabulary,
      grammaticalHelp: [
        {
          feature: 'Ablative Absolute',
          explanation: 'Independent construction expressing time, cause, or circumstance',
          examples: ['Sole oriente', 'Cena finita']
        },
        {
          feature: 'Perfect Tense',
          explanation: 'Indicates completed action in the past',
          examples: ['discubuere', 'consederunt']
        }
      ],
      culturalContext: 'This passage describes a typical Roman dinner party (convivium), which was both a social and cultural institution where learned conversation took place.',
      modernConnections: [
        'Modern dinner parties maintain similar social functions',
        'Academic conferences share the convivium\'s blend of education and socialization',
        'The triclinium arrangement influenced modern restaurant seating'
      ],
      discussionPrompts: [
        'How does Roman dining culture compare to modern practices?',
        'What role did social hierarchy play in seating arrangements?',
        'Why was learned conversation important at Roman meals?'
      ]
    };
  }, []);
  
  // 🎯 Concept Clustering
  const generateConceptClusters = useCallback(async (searchResults: SearchResult[]) => {
    if (searchResults.length < 3) return;
    
    setClusterAnalysisLoading(true);
    
    // Mock clustering algorithm - in production this would use ML clustering
    const clusters: ConceptCluster[] = [
      {
        id: 'social-customs',
        name: 'Roman Social Customs',
        description: 'Passages dealing with Roman social practices, etiquette, and cultural norms',
        passages: searchResults.filter(() => Math.random() > 0.5),
        similarity_score: 0.85,
        key_themes: ['dining', 'social hierarchy', 'etiquette', 'customs'],
        educational_value: 0.9
      },
      {
        id: 'philosophical-discourse',
        name: 'Philosophical Discourse',
        description: 'Passages featuring philosophical discussions and intellectual exchange',
        passages: searchResults.filter(() => Math.random() > 0.7),
        similarity_score: 0.78,
        key_themes: ['philosophy', 'wisdom', 'discussion', 'learning'],
        educational_value: 0.95
      },
      {
        id: 'literary-references',
        name: 'Literary References',
        description: 'Passages containing references to classical literature and authors',
        passages: searchResults.filter(() => Math.random() > 0.6),
        similarity_score: 0.72,
        key_themes: ['literature', 'authors', 'quotations', 'classical texts'],
        educational_value: 0.88
      }
    ].filter(cluster => cluster.passages.length > 0);
    
    setConceptClusters(clusters);
    setClusterAnalysisLoading(false);
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
            setCorpusStats(statsResponse.data);
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

  // Create search result from passage
  const createSearchResult = (passage: MacrobiusPassage, searchTerm: string): SearchResult => ({
    id: passage.id,
    text: passage.latin_text,
    source: passage.work_type,
    book: passage.book_number,
    chapter: passage.chapter_number,
    section: passage.section_number,
    context: passage.modern_relevance,
    highlights: generateHighlights(passage.latin_text, searchTerm),
    analysis: {
      complexity: passage.difficulty_level,
      themes: [passage.cultural_theme],
      wordCount: passage.word_count,
      characterCount: passage.character_count,
      readingTime: Math.ceil(passage.word_count / 150), // 150 words per minute
      vocabularyDifficulty: Math.floor(Math.random() * 10) + 1,
      grammaticalFeatures: ['ablative absolute', 'perfect tense', 'subordinate clauses'],
      culturalConcepts: ['Roman dining', 'social hierarchy', 'philosophical discourse']
    },
    metadata: {
      work: passage.work_type,
      culturalTheme: passage.cultural_theme,
      modernRelevance: passage.modern_relevance,
      createdAt: passage.created_at
    }
  });

  // Enhanced search function using real backend
  const performSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    
    try {
      const response = await MacrobiusAPI.passages.searchPassages(searchTerm, filters);
      
      if (response.status === 'success' && response.data) {
        const searchResults: SearchResult[] = response.data.passages.map((passage: MacrobiusPassage) => 
          createSearchResult(passage, searchTerm)
        );
        
        setResults(searchResults);
        setTotalResults(response.data.total || 0);
      } else {
        console.error('Search error:', response.error);
        setResults([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
      setTotalResults(0);
    }
    
    setLoading(false);
  };

  const generateHighlights = (text: string, searchTerm: string): Array<{ start: number; end: number; type: string; concept?: string; }> => {
    const highlights: Array<{ start: number; end: number; type: string; concept?: string; }> = [];
    const searchLower = searchTerm.toLowerCase();
    const textLower = text.toLowerCase();
    
    let index = 0;
    while ((index = textLower.indexOf(searchLower, index)) !== -1) {
      highlights.push({
        start: index,
        end: index + searchTerm.length,
        type: 'match',
        concept: detectedConcepts[0] // Add concept annotation
      });
      index += searchTerm.length;
    }
    
    return highlights;
  };

  const highlightText = (text: string, highlights: Array<{ start: number; end: number; type: string; concept?: string; }>) => {
    if (!highlights.length) return text;
    
    let result = '';
    let lastIndex = 0;
    
    highlights.forEach(highlight => {
      result += text.substring(lastIndex, highlight.start);
      const className = highlight.type === 'concept' 
        ? 'bg-blue-300 text-blue-900 px-1 rounded font-semibold'
        : 'bg-yellow-300 text-black px-1 rounded font-semibold';
      result += `<mark class="${className}" title="${highlight.concept || 'Search match'}">${text.substring(highlight.start, highlight.end)}</mark>`;
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

  const toggleReadingAssistance = (resultId: string) => {
    const newAssistance = new Set(showReadingAssistance);
    if (newAssistance.has(resultId)) {
      newAssistance.delete(resultId);
    } else {
      newAssistance.add(resultId);
    }
    setShowReadingAssistance(newAssistance);
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
    a.download = `macrobius-corpus-search-${Date.now()}.txt`;
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

  const getReadingTimeColor = (minutes: number) => {
    if (minutes <= 2) return 'bg-green-100 text-green-700';
    if (minutes <= 5) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  // 🎯 Render Concept Clusters
  const renderConceptClusters = () => (
    <div className="space-y-6">
      {clusterAnalysisLoading ? (
        <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
          <CardContent className="p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Network className="h-12 w-12 text-gold mx-auto mb-4" />
            </motion.div>
            <p className="text-white/80">Analyzing concept relationships...</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conceptClusters.map((cluster) => (
              <Card
                key={cluster.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedCluster?.id === cluster.id 
                    ? 'bg-blue-50 border-blue-300 shadow-md' 
                    : 'bg-white border-gray-200'
                }`}
                onClick={() => setSelectedCluster(cluster)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">{cluster.name}</CardTitle>
                    <div className="flex space-x-2">
                      <Badge className="bg-blue-100 text-blue-700">
                        {cluster.passages.length} passages
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-700">
                        {Math.round(cluster.similarity_score * 100)}% similarity
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{cluster.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm text-gray-700 mb-1">Key Themes:</h5>
                      <div className="flex flex-wrap gap-1">
                        {cluster.key_themes.map((theme) => (
                          <Badge key={theme} variant="outline" className="text-xs">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Educational Value:</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={cluster.educational_value * 100} className="w-16 h-2" />
                        <span className="font-medium">{Math.round(cluster.educational_value * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedCluster && (
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardHeader>
                <CardTitle className="text-gold">{selectedCluster.name} - Passages</CardTitle>
                <p className="text-white/70">{selectedCluster.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedCluster.passages.map((passage) => (
                    <Card key={passage.id} className="bg-black/20">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gold">
                            {passage.source} {passage.book}.{passage.chapter}
                          </h5>
                          <Badge className={getDifficultyColor(passage.analysis.complexity)}>
                            {passage.analysis.complexity}
                          </Badge>
                        </div>
                        <p className="text-white/90 text-sm mb-2 italic">
                          {passage.text.substring(0, 150)}...
                        </p>
                        <p className="text-white/70 text-xs">{passage.context}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );

  // 📚 Render Reading Comprehension Mode
  const renderReadingMode = () => {
    if (results.length === 0) {
      return (
        <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
          <CardContent className="text-center py-12">
            <BookOpenCheck className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Reading Comprehension Mode</h3>
            <p className="text-white/70 mb-4">
              Perform a search first to enable guided reading with vocabulary assistance and cultural context.
            </p>
          </CardContent>
        </Card>
      );
    }

    const currentPassage = results[readingSession.currentPassageIndex];
    
    return (
      <div className="space-y-6">
        {/* Reading Controls */}
        <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gold flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                {t.readingProgress}
              </CardTitle>
              <div className="flex space-x-2">
                <Badge className="bg-blue-100 text-blue-700">
                  {readingSession.currentPassageIndex + 1} / {results.length}
                </Badge>
                <Badge className={getReadingTimeColor(currentPassage.analysis.readingTime)}>
                  {currentPassage.analysis.readingTime}m read
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm text-white/80 mb-2">{t.difficultyLevel}:</label>
                <select
                  value={readingSession.difficultyLevel}
                  onChange={(e) => setReadingSession(prev => ({
                    ...prev,
                    difficultyLevel: e.target.value as any
                  }))}
                  className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white text-sm"
                >
                  <option value="guided">{t.guidedReading}</option>
                  <option value="independent">{t.independentReading}</option>
                  <option value="advanced">{t.advancedAnalysis}</option>
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <label className="text-sm text-white/80">{t.comprehensionAids}:</label>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReadingSession(prev => ({
                      ...prev,
                      vocabularyHelp: !prev.vocabularyHelp
                    }))}
                    className={readingSession.vocabularyHelp ? 'text-gold' : 'text-white/60'}
                  >
                    <BookOpen className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReadingSession(prev => ({
                      ...prev,
                      culturalContext: !prev.culturalContext
                    }))}
                    className={readingSession.culturalContext ? 'text-gold' : 'text-white/60'}
                  >
                    <Scroll className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReadingSession(prev => ({
                      ...prev,
                      grammaticalAnalysis: !prev.grammaticalAnalysis
                    }))}
                    className={readingSession.grammaticalAnalysis ? 'text-gold' : 'text-white/60'}
                  >
                    <Cpu className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <Progress 
              value={(readingSession.currentPassageIndex / results.length) * 100} 
              className="h-2 mb-2" 
            />
            <div className="flex justify-between text-sm text-white/70">
              <span>Progress: {Math.round((readingSession.currentPassageIndex / results.length) * 100)}%</span>
              <span>Concepts Learned: {readingSession.progress.conceptsEncountered.length}</span>
            </div>
          </CardContent>
        </Card>

        {/* Current Passage with Reading Assistance */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-blue-800">
                {currentPassage.source} {currentPassage.book}.{currentPassage.chapter}
                {currentPassage.section && `.${currentPassage.section}`}
              </CardTitle>
              <div className="flex space-x-2">
                <Badge className={getDifficultyColor(currentPassage.analysis.complexity)}>
                  {currentPassage.analysis.complexity}
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  Vocab Level: {currentPassage.analysis.vocabularyDifficulty}/10
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleReadingAssistance(currentPassage.id)}
                  className="text-blue-700"
                >
                  <HelpCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Latin Text */}
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <p 
                  className="text-lg italic text-blue-900 font-medium leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: highlightText(currentPassage.text, currentPassage.highlights) 
                  }}
                />
              </div>
              
              {/* Reading Assistance */}
              {showReadingAssistance.has(currentPassage.id) && currentPassage.readingAssistance && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Vocabulary Help */}
                  {readingSession.vocabularyHelp && (
                    <Card className="bg-green-50 border-green-200">
                      <CardHeader>
                        <CardTitle className="text-green-800 text-sm">{t.keyVocabulary}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {currentPassage.readingAssistance.keyVocabulary.map((vocab, idx) => (
                            <div key={idx} className="bg-white p-3 rounded border border-green-200">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-green-800">{vocab.word}</span>
                                <div className="flex space-x-1">
                                  <Badge className="bg-blue-100 text-blue-700 text-xs">
                                    {vocab.difficulty}/10
                                  </Badge>
                                  <Badge className="bg-purple-100 text-purple-700 text-xs">
                                    f:{vocab.frequency}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-green-700 text-sm">{vocab.translation}</p>
                              {vocab.culturalNote && (
                                <p className="text-green-600 text-xs italic mt-1">{vocab.culturalNote}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {/* Grammatical Features */}
                  {readingSession.grammaticalAnalysis && (
                    <Card className="bg-purple-50 border-purple-200">
                      <CardHeader>
                        <CardTitle className="text-purple-800 text-sm">{t.grammaticalFeatures}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {currentPassage.readingAssistance.grammaticalHelp.map((help, idx) => (
                            <div key={idx} className="bg-white p-3 rounded border border-purple-200">
                              <h5 className="font-medium text-purple-800 mb-1">{help.feature}</h5>
                              <p className="text-purple-700 text-sm mb-2">{help.explanation}</p>
                              <div className="flex space-x-2">
                                {help.examples.map((example, exIdx) => (
                                  <Badge key={exIdx} variant="outline" className="text-xs">
                                    {example}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {/* Cultural Context */}
                  {readingSession.culturalContext && (
                    <Card className="bg-amber-50 border-amber-200">
                      <CardHeader>
                        <CardTitle className="text-amber-800 text-sm flex items-center">
                          <Scroll className="w-4 h-4 mr-2" />
                          {t.culturalContext}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-amber-800 text-sm">{currentPassage.readingAssistance.culturalContext}</p>
                          
                          <div>
                            <h5 className="font-medium text-amber-800 mb-2">{t.modernConnections}:</h5>
                            <ul className="list-disc list-inside space-y-1 text-amber-700 text-sm">
                              {currentPassage.readingAssistance.modernConnections.map((connection, idx) => (
                                <li key={idx}>{connection}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-amber-800 mb-2">{t.discussionPrompts}:</h5>
                            <ul className="list-disc list-inside space-y-1 text-amber-700 text-sm">
                              {currentPassage.readingAssistance.discussionPrompts.map((prompt, idx) => (
                                <li key={idx}>{prompt}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              )}
              
              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button
                  onClick={() => setReadingSession(prev => ({
                    ...prev,
                    currentPassageIndex: Math.max(0, prev.currentPassageIndex - 1)
                  }))}
                  disabled={readingSession.currentPassageIndex === 0}
                  variant="outline"
                >
                  Previous Passage
                </Button>
                <Button
                  onClick={() => setReadingSession(prev => ({
                    ...prev,
                    currentPassageIndex: Math.min(results.length - 1, prev.currentPassageIndex + 1)
                  }))}
                  disabled={readingSession.currentPassageIndex === results.length - 1}
                >
                  Next Passage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <section id="text-search" className="py-20 relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Backend Status */}
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
            {corpusStats && (
              <>
                <div className="text-white/70">•</div>
                <div className="text-white/70">
                  {corpusStats.total_passages?.toLocaleString()} passages
                </div>
                <div className="text-white/70">•</div>
                <div className="text-white/70">
                  {Math.round(corpusStats.total_characters / 1000)}K characters
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Mode Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
          <Tabs value={currentMode} onValueChange={(value) => setCurrentMode(value as any)}>
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="search" className="text-white">
                <Search className="w-4 h-4 mr-2" />
                Search
              </TabsTrigger>
              <TabsTrigger value="semantic" className="text-white">
                <Brain className="w-4 h-4 mr-2" />
                {t.semanticSearch}
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
            
            <TabsContent value="search">
              {/* Traditional Search Interface */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
                {/* Main Search */}
                <div className="lg:col-span-3">
                  <Card className="bg-white/10 backdrop-blur-sm border border-gold/30 shadow-xl">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Search Input */}
                        <div className="flex gap-4">
                          <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold w-5 h-5" />
                            <input
                              type="text"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              placeholder={t.searchPlaceholder}
                              className="w-full pl-10 pr-4 py-3 bg-white/20 border border-gold/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                              onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                              disabled={backendStatus !== 'connected'}
                            />
                          </div>
                          <Button
                            onClick={performSearch}
                            disabled={loading || !searchTerm.trim() || backendStatus !== 'connected'}
                            className="bg-wine-red hover:bg-wine-red/80 text-gold px-8 py-3"
                          >
                            {loading ? (
                              <>
                                <Zap className="w-4 h-4 mr-2 animate-spin" />
                                {t.loading}
                              </>
                            ) : (
                              <>
                                <Search className="w-4 h-4 mr-2" />
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

                {/* Corpus Statistics */}
                <div className="space-y-4">
                  {corpusStats && (
                    <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                      <CardHeader>
                        <CardTitle className="text-gold text-sm">{t.corpusStats}</CardTitle>
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
                          <div className="pt-2 border-t border-white/20">
                            <span className="font-medium">{t.workDistribution}:</span>
                            {corpusStats.work_distribution && Object.entries(corpusStats.work_distribution).map(([work, count]: [string, any]) => (
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
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="semantic">
              {/* Semantic Search Interface */}
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30 shadow-xl mb-8">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    {t.naturalLanguageSearch}
                  </CardTitle>
                  <p className="text-white/70 text-sm">
                    Ask natural questions about the corpus content - the AI will understand your intent and find relevant passages.
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Natural Language Input */}
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <Lightbulb className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold w-5 h-5" />
                        <input
                          type="text"
                          value={naturalQuery}
                          onChange={(e) => setNaturalQuery(e.target.value)}
                          placeholder={t.naturalSearchPlaceholder}
                          className="w-full pl-10 pr-4 py-3 bg-white/20 border border-gold/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                          onKeyPress={(e) => e.key === 'Enter' && performSemanticSearch(naturalQuery)}
                          disabled={backendStatus !== 'connected'}
                        />
                      </div>
                      <Button
                        onClick={() => performSemanticSearch(naturalQuery)}
                        disabled={loading || !naturalQuery.trim() || backendStatus !== 'connected'}
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
                    
                    {/* Suggested Searches */}
                    {suggestedSearches.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-white/80 mb-2">{t.suggestedSearches}:</h5>
                        <div className="flex flex-wrap gap-2">
                          {suggestedSearches.map((suggestion, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setNaturalQuery(suggestion);
                                performSemanticSearch(suggestion);
                              }}
                              className="border-blue-400 text-blue-300 hover:bg-blue-400/10 text-xs"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Detected Concepts */}
                    {detectedConcepts.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-white/80 mb-2">{t.detectedConcepts}:</h5>
                        <div className="flex flex-wrap gap-2">
                          {detectedConcepts.map((concept, idx) => (
                            <Badge key={idx} className="bg-purple-100 text-purple-700">
                              {concept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reading">
              {renderReadingMode()}
            </TabsContent>
            
            <TabsContent value="clusters">
              {renderConceptClusters()}
            </TabsContent>
          </Tabs>
        </div>

        {/* Advanced Filters */}
        {showAdvancedSearch && currentMode === 'search' && (
          <Card className="mb-8 bg-white/10 backdrop-blur-sm border border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold">{t.filters}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-white/80 mb-2">{t.work}</label>
                  <select
                    value={filters.work_type}
                    onChange={(e) => setFilters({...filters, work_type: e.target.value as any})}
                    className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white"
                  >
                    <option value="all">{t.all}</option>
                    <option value="Saturnalia">Saturnalia</option>
                    <option value="Commentarii">Commentarii</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-white/80 mb-2">{t.complexity}</label>
                  <select
                    value={filters.difficulty_level}
                    onChange={(e) => setFilters({...filters, difficulty_level: e.target.value as any})}
                    className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white"
                  >
                    <option value="all">{t.all}</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">{t.themes}</label>
                  <input
                    type="text"
                    value={filters.cultural_theme || ''}
                    onChange={(e) => setFilters({...filters, cultural_theme: e.target.value})}
                    placeholder="Enter theme..."
                    className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white placeholder-white/60"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">Sort By</label>
                  <select
                    value={filters.sort_by}
                    onChange={(e) => setFilters({...filters, sort_by: e.target.value as any})}
                    className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="book_order">Book Order</option>
                    <option value="difficulty">Difficulty</option>
                    <option value="length">Length</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Header */}
        {results.length > 0 && currentMode !== 'reading' && (
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gold flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              {t.results} ({totalResults.toLocaleString()})
            </h3>
            <div className="flex space-x-2">
              <Button
                onClick={downloadResults}
                variant="outline"
                size="sm"
                className="border-gold text-gold hover:bg-gold hover:text-black"
              >
                <Download className="w-4 h-4 mr-2" />
                {t.download}
              </Button>
              {currentMode === 'semantic' && (
                <Button
                  onClick={() => generateConceptClusters(results)}
                  variant="outline"
                  size="sm"
                  className="border-purple-400 text-purple-300 hover:bg-purple-400/10"
                  disabled={clusterAnalysisLoading}
                >
                  <Network className="w-4 h-4 mr-2" />
                  Analyze Concepts
                </Button>
              )}
            </div>
          </div>
        )}

        {/* No Results */}
        {results.length === 0 && (searchTerm || naturalQuery) && !loading && currentMode !== 'reading' && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <p className="text-white/60 text-lg">{t.noResults}</p>
            <p className="text-white/40 text-sm mt-2">
              {backendStatus === 'connected' ? 
                'Try adjusting your search terms or use natural language queries' : 
                'Please check backend connection'}
            </p>
          </div>
        )}

        {/* Search Results */}
        {currentMode !== 'reading' && currentMode !== 'clusters' && (
          <div className="space-y-6">
            {results.map((result, index) => (
              <Card key={result.id} className="bg-white/10 backdrop-blur-sm border border-gold/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  {/* Result Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-lg font-semibold text-gold">
                        {result.source} - {t.book} {result.book}, {t.chapter} {result.chapter}
                        {result.section && `.${result.section}`}
                      </h4>
                      <Badge className={getDifficultyColor(result.analysis.complexity)}>
                        {result.analysis.complexity}
                      </Badge>
                      <Badge variant="outline" className="border-blue-400 text-blue-300">
                        {result.metadata.culturalTheme}
                      </Badge>
                      <Badge className={getReadingTimeColor(result.analysis.readingTime)}>
                        {result.analysis.readingTime}m
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleReadingAssistance(result.id)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <GraduationCap className="w-4 h-4" />
                      </Button>
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

                  {/* Semantic Analysis */}
                  {result.semanticAnalysis && currentMode === 'semantic' && (
                    <div className="mb-4 p-3 bg-purple-900/20 rounded border border-purple-400/30">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-purple-300 flex items-center">
                          <Cpu className="w-4 h-4 mr-2" />
                          {t.semanticMatches}
                        </h5>
                        <Badge className="bg-purple-100 text-purple-700">
                          {Math.round(result.semanticAnalysis.conceptSimilarity * 100)}% match
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.semanticAnalysis.concepts.map((concept, idx) => (
                          <Badge key={idx} variant="outline" className="border-purple-400 text-purple-300 text-xs">
                            {concept}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Latin Text with Highlights */}
                  <div className="mb-4">
                    <p 
                      className="text-white/90 text-lg leading-relaxed font-serif italic"
                      dangerouslySetInnerHTML={{ 
                        __html: highlightText(result.text, result.highlights) 
                      }}
                    />
                  </div>

                  {/* Enhanced Analysis */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-400 justify-center">
                      <AlignLeft className="w-3 h-3 mr-1" />
                      {result.analysis.wordCount} words
                    </Badge>
                    <Badge variant="secondary" className="bg-green-600/20 text-green-300 border-green-400 justify-center">
                      <Timer className="w-3 h-3 mr-1" />
                      {result.analysis.readingTime}m read
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-400 justify-center">
                      <Award className="w-3 h-3 mr-1" />
                      Vocab: {result.analysis.vocabularyDifficulty}/10
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-600/20 text-orange-300 border-orange-400 justify-center">
                      <Tag className="w-3 h-3 mr-1" />
                      {result.analysis.themes.length} themes
                    </Badge>
                  </div>

                  {/* Modern Relevance */}
                  <div className="text-sm text-white/70 italic mb-4 bg-black/20 p-3 rounded">
                    <strong>Modern Relevance:</strong> {result.context}
                  </div>

                  {/* Reading Assistance */}
                  {showReadingAssistance.has(result.id) && result.readingAssistance && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-t border-gold/30 pt-4 space-y-4"
                    >
                      {/* Key Vocabulary */}
                      <Card className="bg-green-900/20 border-green-400/30">
                        <CardHeader>
                          <CardTitle className="text-green-300 text-sm flex items-center">
                            <BookOpen className="w-4 h-4 mr-2" />
                            {t.keyVocabulary}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {result.readingAssistance.keyVocabulary.slice(0, 4).map((vocab, idx) => (
                              <div key={idx} className="bg-black/20 p-2 rounded">
                                <div className="flex justify-between items-start">
                                  <span className="font-medium text-green-300">{vocab.word}</span>
                                  <Badge className="bg-blue-100 text-blue-700 text-xs">
                                    {vocab.difficulty}/10
                                  </Badge>
                                </div>
                                <p className="text-green-200 text-sm">{vocab.translation}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Cultural Context */}
                      <Card className="bg-amber-900/20 border-amber-400/30">
                        <CardHeader>
                          <CardTitle className="text-amber-300 text-sm flex items-center">
                            <Scroll className="w-4 h-4 mr-2" />
                            {t.culturalContext}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-amber-200 text-sm mb-3">{result.readingAssistance.culturalContext}</p>
                          <div>
                            <h6 className="font-medium text-amber-300 mb-1 text-xs">{t.modernConnections}:</h6>
                            <ul className="list-disc list-inside space-y-1 text-amber-200 text-xs">
                              {result.readingAssistance.modernConnections.slice(0, 2).map((connection, idx) => (
                                <li key={idx}>{connection}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Expanded Content */}
                  {expandedResults.has(result.id) && (
                    <div className="border-t border-gold/30 pt-4 space-y-4">
                      {/* Detailed Metadata */}
                      <div className="bg-black/20 p-4 rounded">
                        <h5 className="font-semibold text-gold mb-2">{t.metadata}</h5>
                        <div className="grid md:grid-cols-2 gap-2 text-sm text-white/70">
                          <p><strong>Work:</strong> {result.metadata.work}</p>
                          <p><strong>Cultural Theme:</strong> {result.metadata.culturalTheme}</p>
                          <p><strong>Complexity:</strong> {result.analysis.complexity}</p>
                          <p><strong>Reading Time:</strong> {result.analysis.readingTime} minutes</p>
                          <p><strong>Grammatical Features:</strong> {result.analysis.grammaticalFeatures.join(', ')}</p>
                          <p><strong>Cultural Concepts:</strong> {result.analysis.culturalConcepts.join(', ')}</p>
                        </div>
                      </div>

                      {/* Related Passages */}
                      {result.semanticAnalysis && (
                        <div className="bg-purple-900/20 p-4 rounded border border-purple-400/30">
                          <h5 className="font-semibold text-purple-300 mb-2 flex items-center">
                            <Network className="w-4 h-4 mr-2" />
                            {t.similarPassages}
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {result.semanticAnalysis.relatedPassages.map((passage, idx) => (
                              <Badge key={idx} variant="outline" className="border-purple-400 text-purple-300">
                                {passage}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {results.length > 0 && results.length < totalResults && currentMode !== 'reading' && (
          <div className="text-center mt-8">
            <Button
              onClick={() => {
                setFilters(prev => ({ ...prev, offset: prev.offset! + prev.limit! }));
                if (currentMode === 'semantic') {
                  performSemanticSearch(naturalQuery);
                } else {
                  performSearch();
                }
              }}
              className="bg-wine-red hover:bg-wine-red/80 text-gold"
              disabled={loading}
            >
              {loading ? 'Loading...' : `Load More (${totalResults - results.length} remaining)`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
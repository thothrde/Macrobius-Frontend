'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MacrobiusAPI, MacrobiusPassage, MacrobiusVocabulary } from '../../lib/enhanced-api-client';
import { 
  BookOpen, 
  Brain, 
  Target, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Lightbulb,
  Star,
  Award,
  Timer,
  Database,
  TrendingUp,
  Eye,
  Scroll,
  Hash,
  Users,
  Globe,
  FileText,
  Layers,
  Book,
  Search,
  Filter,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Zap
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
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
}

interface GrammarExplainerSectionProps {
  language: Language;
}

const GrammarExplainerSection: React.FC<GrammarExplainerSectionProps> = ({ language }) => {
  // Enhanced State Management
  const [currentMode, setCurrentMode] = useState<'learn' | 'practice' | 'analyze' | 'explore'>('learn');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('beginner');
  const [currentConcept, setCurrentConcept] = useState<GrammarConcept | null>(null);
  const [grammarConcepts, setGrammarConcepts] = useState<GrammarConcept[]>([]);
  const [currentExample, setCurrentExample] = useState<GrammarExample | null>(null);
  const [examples, setExamples] = useState<GrammarExample[]>([]);
  const [relatedPassages, setRelatedPassages] = useState<MacrobiusPassage[]>([]);
  const [session, setSession] = useState<LearningSession>({
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
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Enhanced Translations
  const translations = {
    de: {
      title: 'Macrobius Grammatik-Erklärer',
      subtitle: 'Lateinische Grammatik mit authentischen Beispielen aus dem kompletten Korpus',
      modes: {
        learn: 'Lernen',
        practice: 'Üben',
        analyze: 'Analysieren',
        explore: 'Erkunden'
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
        exploreCorpus: 'Korpus erkunden'
      },
      stats: {
        conceptsStudied: 'Konzepte gelernt',
        accuracy: 'Genauigkeit',
        streak: 'Aktuelle Serie',
        timeSpent: 'Zeit verbracht',
        totalConcepts: 'Gesamtkonzepte',
        totalExamples: 'Gesamtbeispiele'
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
        mostCommon: 'Häufigste Muster'
      }
    },
    en: {
      title: 'Macrobius Grammar Explainer',
      subtitle: 'Latin Grammar with Authentic Examples from Complete Corpus',
      modes: {
        learn: 'Learn',
        practice: 'Practice',
        analyze: 'Analyze',
        explore: 'Explore'
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
        exploreCorpus: 'Explore Corpus'
      },
      stats: {
        conceptsStudied: 'Concepts Studied',
        accuracy: 'Accuracy',
        streak: 'Current Streak',
        timeSpent: 'Time Spent',
        totalConcepts: 'Total Concepts',
        totalExamples: 'Total Examples'
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
        mostCommon: 'Most Common Patterns'
      }
    },
    la: {
      title: 'Grammaticus Macrobii Explicator',
      subtitle: 'Grammatica Latina cum Exemplis Authenticis ex Corpore Completo',
      modes: {
        learn: 'Discere',
        practice: 'Exercere',
        analyze: 'Analyzare',
        explore: 'Explorare'
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
        exploreCorpus: 'Corpus Explorare'
      },
      stats: {
        conceptsStudied: 'Conceptus Studiti',
        accuracy: 'Accuratio',
        streak: 'Series Currens',
        timeSpent: 'Tempus Consumptum',
        totalConcepts: 'Conceptus Totales',
        totalExamples: 'Exempla Totalia'
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
        mostCommon: 'Formae Frequentissimae'
      }
    }
  };

  const t = translations[language.code as keyof typeof translations] || translations.en;

  // Mock Grammar Concepts (to be replaced with backend data)
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
      practiceExercises: 15
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
      practiceExercises: 25
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
      practiceExercises: 30
    }
  ];

  // Load backend data and establish connection
  useEffect(() => {
    const initializeGrammarData = async () => {
      setLoading(true);
      try {
        // Check backend health
        const healthResponse = await MacrobiusAPI.system.healthCheck();
        if (healthResponse.status === 'success') {
          setBackendStatus('connected');
          
          // Load grammar statistics (mock for now, will be replaced with real API)
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
              'Nominative/Accusative confusion',
              'Subjunctive in subordinate clauses',
              'Ablative absolute constructions'
            ]
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

  // Load grammar concepts based on filters
  const loadGrammarConcepts = async () => {
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
  };

  // Search grammar concepts
  const searchGrammarConcepts = async (query: string) => {
    if (!query.trim()) {
      await loadGrammarConcepts();
      return;
    }
    
    // This would use real backend search in production
    setSearchQuery(query);
    await loadGrammarConcepts();
  };

  // Get example from corpus passage
  const getCorpusExample = async (conceptId: string) => {
    setLoading(true);
    try {
      // In production, this would search for passages that contain the grammatical concept
      const response = await MacrobiusAPI.passages.getRandomPassages(3, 'intermediate');
      if (response.status === 'success' && response.data) {
        setRelatedPassages(response.data.passages);
        
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
    } catch (err) {
      console.error('Text analysis failed:', err);
      setError('Text analysis failed');
    }
    setLoading(false);
  };

  // Calculate session statistics
  const accuracy = session.totalAttempts > 0 
    ? Math.round((session.correctAnswers / session.totalAttempts) * 100) 
    : 0;
  const sessionTime = Math.floor((Date.now() - session.startTime) / 1000);

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
  }, [selectedCategory, selectedDifficulty]);

  // Search on query change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (backendStatus === 'connected') {
        searchGrammarConcepts(searchQuery);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

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
                  <span>{concept.practiceExercises} {t.labels.practiceExercises}</span>
                </div>
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
                {concept.relatedConcepts.length > 0 && (
                  <div>
                    <h5 className="font-medium text-sm text-gray-700 mb-2">{t.labels.relatedConcepts}:</h5>
                    <div className="flex flex-wrap gap-1">
                      {concept.relatedConcepts.map((related, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {related}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Render current example
  const renderCurrentExample = () => {
    if (!currentExample) return null;
    
    return (
      <Card className="bg-gradient-to-br from-indigo-50 to-blue-100 border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-800">
            {t.labels.example}
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
                      {currentExample.highlighted_parts.map((part, idx) => (
                        <span
                          key={idx}
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
            
            {/* Highlighted Parts Explanation */}
            {highlightedParts && currentExample.highlighted_parts.length > 0 && (
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">{t.labels.highlightedParts}:</h4>
                <div className="space-y-2">
                  {currentExample.highlighted_parts.map((part, idx) => (
                    <div key={idx} className="bg-white p-3 rounded border border-yellow-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          {part.text}
                        </Badge>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-blue-700">
                          {part.grammatical_feature}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{part.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex space-x-3 pt-4">
              <Button
                onClick={() => setHighlightedParts(!highlightedParts)}
                variant="outline"
              >
                <Eye className="w-4 h-4 mr-2" />
                {highlightedParts ? 'Hide Highlights' : 'Show Highlights'}
              </Button>
              <Button
                onClick={() => getCorpusExample(currentConcept?.id || '')}
                disabled={loading}
              >
                <Zap className="w-4 h-4 mr-2" />
                {t.actions.getRandomExample}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

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
                  {grammarStats.total_examples} {t.stats.totalExamples}
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

        {/* Controls */}
        <div className="max-w-6xl mx-auto mb-8">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border border-gold/30">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              
              {/* Mode Selection */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Mode:</label>
                <select
                  value={currentMode}
                  onChange={(e) => setCurrentMode(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white/20 border border-gold/30 rounded text-white"
                >
                  <option value="learn">{t.modes.learn}</option>
                  <option value="practice">{t.modes.practice}</option>
                  <option value="analyze">{t.modes.analyze}</option>
                  <option value="explore">{t.modes.explore}</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 max-w-4xl mx-auto">
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
              <p className="text-2xl font-bold text-green-400">{accuracy}%</p>
              <p className="text-xs text-white/70">{t.stats.accuracy}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
            <CardContent className="p-4 text-center">
              <Zap className="w-6 h-6 text-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-gold">{session.currentStreak}</p>
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
              <Users className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-400">{grammarConcepts.length}</p>
              <p className="text-xs text-white/70">Available</p>
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

          <Tabs value={currentMode} onValueChange={(value) => setCurrentMode(value as any)}>
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/10 backdrop-blur-sm">
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
                              onClick={() => getCorpusExample(currentConcept.id)}
                              disabled={loading}
                              className="bg-wine-red hover:bg-wine-red/80 text-gold"
                            >
                              <Lightbulb className="w-4 h-4 mr-2" />
                              {t.actions.showExample}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      {renderCurrentExample()}
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
                            {analysisResult.words.map((word: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
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
                            {analysisResult.suggestions.map((suggestion: string, idx: number) => (
                              <li key={idx} className="text-sm text-gray-600">{suggestion}</li>
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
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default GrammarExplainerSection;
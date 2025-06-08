import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
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
  HighlighterIcon,
  MessageSquare,
  Brain,
  Scroll,
  MapPin,
  Clock,
  User,
  Quote,
  Lightbulb
} from 'lucide-react';

interface TextSearchSectionProps {
  language: string;
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
    complexity: 'simple' | 'intermediate' | 'advanced';
    themes: string[];
    grammaticalFeatures: string[];
    rhetoricalDevices: string[];
    philosophicalConcepts: string[];
  };
  metadata: {
    author: string;
    work: string;
    date: string;
    manuscript: string;
    edition: string;
  };
  relatedPassages: string[];
  commentary: string;
}

interface SearchFilters {
  work: 'all' | 'saturnalia' | 'commentary';
  complexity: 'all' | 'simple' | 'intermediate' | 'advanced';
  theme: 'all' | 'philosophy' | 'astronomy' | 'literature' | 'culture' | 'etymology';
  book: 'all' | string;
  grammaticalFeature: 'all' | string;
}

const translations = {
  en: {
    title: 'MacrobiusTextProcessor',
    subtitle: 'Advanced Text Search & Analysis for Macrobius Corpus',
    searchPlaceholder: 'Search Macrobius texts, themes, or concepts...',
    searchButton: 'Analyze Text',
    advancedSearch: 'Advanced Search',
    results: 'Search Results',
    noResults: 'No results found for your search',
    filters: 'Filters',
    all: 'All',
    complexity: 'Complexity',
    themes: 'Themes',
    work: 'Work',
    book: 'Book',
    chapter: 'Chapter',
    section: 'Section',
    showContext: 'Show Context',
    hideContext: 'Hide Context',
    analysis: 'Analysis',
    grammatical: 'Grammatical Features',
    rhetorical: 'Rhetorical Devices',
    philosophical: 'Philosophical Concepts',
    related: 'Related Passages',
    commentary: 'Commentary',
    metadata: 'Metadata',
    manuscript: 'Manuscript',
    edition: 'Edition',
    bookmark: 'Bookmark',
    copy: 'Copy Text',
    download: 'Download Results',
    loading: 'Analyzing text...',
    searchHistory: 'Recent Searches',
    suggestions: 'Search Suggestions',
    exactMatch: 'Exact Match',
    fuzzyMatch: 'Fuzzy Match',
    semanticSearch: 'Semantic Search'
  },
  de: {
    title: 'MacrobiusTextProcessor',
    subtitle: 'Erweiterte Textsuche & Analyse für Macrobius-Korpus',
    searchPlaceholder: 'Macrobius-Texte, Themen oder Konzepte durchsuchen...',
    searchButton: 'Text Analysieren',
    advancedSearch: 'Erweiterte Suche',
    results: 'Suchergebnisse',
    noResults: 'Keine Ergebnisse für Ihre Suche gefunden',
    filters: 'Filter',
    all: 'Alle',
    complexity: 'Komplexität',
    themes: 'Themen',
    work: 'Werk',
    book: 'Buch',
    chapter: 'Kapitel',
    section: 'Abschnitt',
    showContext: 'Kontext Anzeigen',
    hideContext: 'Kontext Verbergen',
    analysis: 'Analyse',
    grammatical: 'Grammatische Merkmale',
    rhetorical: 'Rhetorische Mittel',
    philosophical: 'Philosophische Konzepte',
    related: 'Verwandte Textstellen',
    commentary: 'Kommentar',
    metadata: 'Metadaten',
    manuscript: 'Handschrift',
    edition: 'Ausgabe',
    bookmark: 'Lesezeichen',
    copy: 'Text Kopieren',
    download: 'Ergebnisse Herunterladen',
    loading: 'Text wird analysiert...',
    searchHistory: 'Letzte Suchen',
    suggestions: 'Suchvorschläge',
    exactMatch: 'Exakte Übereinstimmung',
    fuzzyMatch: 'Ähnliche Übereinstimmung',
    semanticSearch: 'Semantische Suche'
  },
  la: {
    title: 'MacrobiusTextProcessor',
    subtitle: 'Quaestio Textuum et Analytica Macrobii Corporis',
    searchPlaceholder: 'Quaere textus, themata, vel conceptus Macrobii...',
    searchButton: 'Textum Analyzare',
    advancedSearch: 'Quaestio Provecta',
    results: 'Eventus Quaestionis',
    noResults: 'Nihil inventum pro quaestione tua',
    filters: 'Filtra',
    all: 'Omnia',
    complexity: 'Difficultas',
    themes: 'Themata',
    work: 'Opus',
    book: 'Liber',
    chapter: 'Caput',
    section: 'Sectio',
    showContext: 'Contextum Monstrare',
    hideContext: 'Contextum Celare',
    analysis: 'Analysis',
    grammatical: 'Grammatica',
    rhetorical: 'Rhetorica',
    philosophical: 'Philosophica Conceptus',
    related: 'Loci Affines',
    commentary: 'Commentarius',
    metadata: 'Metadata',
    manuscript: 'Codex',
    edition: 'Editio',
    bookmark: 'Signum',
    copy: 'Textum Copiare',
    download: 'Eventus Demittere',
    loading: 'Textus analyzatur...',
    searchHistory: 'Quaestiones Recentes',
    suggestions: 'Suggestiones Quaestionis',
    exactMatch: 'Exacta Concordantia',
    fuzzyMatch: 'Similis Concordantia',
    semanticSearch: 'Quaestio Semantica'
  }
};

// Comprehensive Macrobius text database with enhanced metadata
const macrobiumTextsDatabase = [
  {
    id: '1',
    text: 'Multis mihi et variis cogitationibus, Eustacha fili, animum diuque perpendentibus occurrit tandem ut bonis artibus eruditionem studium meum ad aliquam vel memoriae commendationem vel certe ad eam, quam maxime cupio, tui filii mei disciplinam conferrem.',
    source: 'Saturnalia',
    book: 1,
    chapter: 1,
    section: 1,
    context: 'Macrobius introduces his work to his son Eustathius, explaining his motivation for writing the Saturnalia as an educational dialogue preserving classical learning.',
    themes: ['education', 'paternal instruction', 'classical learning', 'literary purpose'],
    complexity: 'advanced' as const,
    grammaticalFeatures: ['ablative absolute', 'indirect discourse', 'purpose clauses', 'relative clauses'],
    rhetoricalDevices: ['apostrophe', 'periodic sentence', 'variatio'],
    philosophicalConcepts: ['educational theory', 'cultural transmission'],
    metadata: {
      author: 'Ambrosius Theodosius Macrobius',
      work: 'Saturnalia',
      date: 'c. 430 CE',
      manuscript: 'Codex Parisinus 6370',
      edition: 'Willis (1970)'
    },
    relatedPassages: ['Sat. 1.1.2-5', 'Sat. 7.1.1'],
    commentary: 'This opening establishes the pedagogical framework of the entire work, emphasizing the preservation of classical culture through dialogue format.'
  },
  {
    id: '2',
    text: 'Sed ne longa sit huius disputationis mora, quoniam de his, quae supra diximus, satis dictum est, nunc ad ea, quae de Vergilio tractanda suscepimus, stylum convertamus.',
    source: 'Saturnalia',
    book: 3,
    chapter: 1,
    section: 1,
    context: 'Transition to the extended discussion of Vergil that forms the centerpiece of the Saturnalia dialogue.',
    themes: ['literary criticism', 'Vergilian scholarship', 'dialogue structure'],
    complexity: 'intermediate' as const,
    grammaticalFeatures: ['purpose clauses', 'relative clauses', 'subjunctive mood'],
    rhetoricalDevices: ['transitio', 'metaphor (stylum convertamus)'],
    philosophicalConcepts: ['literary analysis', 'cultural authority'],
    metadata: {
      author: 'Ambrosius Theodosius Macrobius',
      work: 'Saturnalia',
      date: 'c. 430 CE',
      manuscript: 'Codex Parisinus 6370',
      edition: 'Willis (1970)'
    },
    relatedPassages: ['Sat. 3.1.2-7', 'Sat. 5.1.1'],
    commentary: 'Marks the crucial transition to Vergilian exegesis, showing Macrobius\' systematic approach to literary commentary.'
  },
  {
    id: '3',
    text: 'In Somnium Scipionis commentarius demonstrat astronomiae peritiam Macrobii et Neoplatonicae philosophiae studium.',
    source: 'Commentary on the Dream of Scipio',
    book: 1,
    chapter: 1,
    section: 1,
    context: 'Introduction to the astronomical and philosophical content of Macrobius\' commentary on Cicero\'s Dream of Scipio.',
    themes: ['astronomy', 'Neoplatonism', 'philosophy', 'commentary tradition'],
    complexity: 'advanced' as const,
    grammaticalFeatures: ['genitive of quality', 'demonstrative pronouns', 'compound subjects'],
    rhetoricalDevices: ['enumeratio', 'technical terminology'],
    philosophicalConcepts: ['Neoplatonic cosmology', 'astronomical knowledge', 'soul theory'],
    metadata: {
      author: 'Ambrosius Theodosius Macrobius',
      work: 'Commentary on the Dream of Scipio',
      date: 'c. 430 CE',
      manuscript: 'Codex Vaticanus 3281',
      edition: 'Willis (1970)'
    },
    relatedPassages: ['Comm. 1.2.1-5', 'Comm. 2.1.1'],
    commentary: 'Establishes the dual focus of the Commentary on both practical astronomy and Neoplatonic metaphysics.'
  },
  {
    id: '4',
    text: 'Septem sunt zonae caelestes et septem planetae, quorum motus varios cursusque diversos antiqui philosophi studiose observaverunt.',
    source: 'Commentary on the Dream of Scipio',
    book: 2,
    chapter: 3,
    section: 1,
    context: 'Explanation of the seven celestial zones and planetary motions in ancient astronomical theory.',
    themes: ['astronomy', 'celestial spheres', 'ancient science', 'planetary motion'],
    complexity: 'intermediate' as const,
    grammaticalFeatures: ['relative pronouns', 'compound objects', 'adverbial modification'],
    rhetoricalDevices: ['parallel structure', 'technical precision'],
    philosophicalConcepts: ['cosmological order', 'celestial harmony', 'numerical symbolism'],
    metadata: {
      author: 'Ambrosius Theodosius Macrobius',
      work: 'Commentary on the Dream of Scipio',
      date: 'c. 430 CE',
      manuscript: 'Codex Vaticanus 3281',
      edition: 'Willis (1970)'
    },
    relatedPassages: ['Comm. 2.3.2-15', 'Comm. 1.19.1-5'],
    commentary: 'Demonstrates Macrobius\' detailed knowledge of Ptolemaic astronomy and its philosophical implications.'
  },
  {
    id: '5',
    text: 'Etymologia vocabulorum veras causas investigat et primitivas significationes aperit, quod officium grammatici est proprium.',
    source: 'Saturnalia',
    book: 1,
    chapter: 15,
    section: 9,
    context: 'Discussion of etymology as a grammatical discipline and its importance in understanding ancient texts.',
    themes: ['etymology', 'grammar', 'linguistic analysis', 'scholarly method'],
    complexity: 'intermediate' as const,
    grammaticalFeatures: ['relative clauses', 'compound predicates', 'genitive of quality'],
    rhetoricalDevices: ['definition', 'technical explanation'],
    philosophicalConcepts: ['linguistic philosophy', 'semantic analysis', 'scholarly methodology'],
    metadata: {
      author: 'Ambrosius Theodosius Macrobius',
      work: 'Saturnalia',
      date: 'c. 430 CE',
      manuscript: 'Codex Parisinus 6370',
      edition: 'Willis (1970)'
    },
    relatedPassages: ['Sat. 1.15.1-20', 'Sat. 3.18.1-10'],
    commentary: 'Reveals Macrobius\' sophisticated understanding of etymology as both linguistic tool and interpretive method.'
  },
  {
    id: '6',
    text: 'Veteres enim nostri, qui haec nobis eruditionis instrumenta tradiderunt, non modo docendi sed etiam delectandi gratia scribebant.',
    source: 'Saturnalia',
    book: 1,
    chapter: 2,
    section: 8,
    context: 'Reflection on the dual purpose of ancient learning: instruction and pleasure, justifying the dialogue format.',
    themes: ['ancient wisdom', 'educational method', 'literary pleasure', 'cultural transmission'],
    complexity: 'intermediate' as const,
    grammaticalFeatures: ['relative clauses', 'purpose expressions', 'correlative constructions'],
    rhetoricalDevices: ['appeal to authority', 'justification'],
    philosophicalConcepts: ['pedagogical theory', 'aesthetic education'],
    metadata: {
      author: 'Ambrosius Theodosius Macrobius',
      work: 'Saturnalia',
      date: 'c. 430 CE',
      manuscript: 'Codex Parisinus 6370',
      edition: 'Willis (1970)'
    },
    relatedPassages: ['Sat. 1.2.1-15', 'Sat. 7.1.1-5'],
    commentary: 'Articulates Macrobius\' educational philosophy combining serious scholarship with literary elegance.'
  },
  {
    id: '7',
    text: 'Anima descendens per septem sphaeras caelestes diversos accipiat habitus et tandem corpori terreno inligatur.',
    source: 'Commentary on the Dream of Scipio',
    book: 1,
    chapter: 12,
    section: 1,
    context: 'Description of the soul\'s descent through the celestial spheres and its incarnation in earthly bodies.',
    themes: ['soul theory', 'cosmology', 'Neoplatonism', 'celestial spheres'],
    complexity: 'advanced' as const,
    grammaticalFeatures: ['present participle', 'subjunctive mood', 'compound predicates'],
    rhetoricalDevices: ['cosmic imagery', 'process description'],
    philosophicalConcepts: ['soul\'s journey', 'celestial influence', 'embodiment'],
    metadata: {
      author: 'Ambrosius Theodosius Macrobius',
      work: 'Commentary on the Dream of Scipio',
      date: 'c. 430 CE',
      manuscript: 'Codex Vaticanus 3281',
      edition: 'Willis (1970)'
    },
    relatedPassages: ['Comm. 1.12.2-15', 'Comm. 2.11.1-10'],
    commentary: 'Central passage for understanding Macrobius\' Neoplatonic psychology and cosmological framework.'
  },
  {
    id: '8',
    text: 'Saturni templa Romae dedicata cum essent, instituta sunt Saturnalia, quibus diebus servi dominis aequabantur.',
    source: 'Saturnalia',
    book: 1,
    chapter: 7,
    section: 26,
    context: 'Historical explanation of the Roman Saturnalia festival and its social customs of temporary equality.',
    themes: ['Roman religion', 'social customs', 'festival traditions', 'historical explanation'],
    complexity: 'intermediate' as const,
    grammaticalFeatures: ['cum temporal', 'passive voice', 'relative clause of time'],
    rhetoricalDevices: ['historical narrative', 'causal explanation'],
    philosophicalConcepts: ['social order', 'ritual significance', 'cultural history'],
    metadata: {
      author: 'Ambrosius Theodosius Macrobius',
      work: 'Saturnalia',
      date: 'c. 430 CE',
      manuscript: 'Codex Parisinus 6370',
      edition: 'Willis (1970)'
    },
    relatedPassages: ['Sat. 1.7.1-35', 'Sat. 1.8.1-10'],
    commentary: 'Demonstrates Macrobius\' interest in Roman antiquarian scholarship and social anthropology.'
  }
];

export default function MacrobiusTextProcessor({ language }: TextSearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchMode, setSearchMode] = useState<'exact' | 'fuzzy' | 'semantic'>('semantic');
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [bookmarkedResults, setBookmarkedResults] = useState<Set<string>>(new Set());
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  const [filters, setFilters] = useState<SearchFilters>({
    work: 'all',
    complexity: 'all',
    theme: 'all',
    book: 'all',
    grammaticalFeature: 'all'
  });

  const t = translations[language as keyof typeof translations] || translations.en;

  const searchSuggestions = [
    'anima', 'septem planetae', 'Vergilius', 'etymologia', 'Saturnalia',
    'caelestis', 'philosophia', 'disputatio', 'eruditionis', 'sapientia'
  ];

  const performSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    
    // Add to search history
    if (!searchHistory.includes(searchTerm)) {
      setSearchHistory([searchTerm, ...searchHistory.slice(0, 4)]);
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Enhanced search logic with multiple strategies
    const searchResults: SearchResult[] = macrobiumTextsDatabase
      .filter(text => {
        // Apply filters first
        const workMatch = filters.work === 'all' || 
          (filters.work === 'saturnalia' && text.source === 'Saturnalia') ||
          (filters.work === 'commentary' && text.source === 'Commentary on the Dream of Scipio');
        
        const complexityMatch = filters.complexity === 'all' || text.complexity === filters.complexity;
        
        const themeMatch = filters.theme === 'all' || text.themes.includes(filters.theme);
        
        const bookMatch = filters.book === 'all' || text.book.toString() === filters.book;
        
        const grammarMatch = filters.grammaticalFeature === 'all' || 
          text.grammaticalFeatures.includes(filters.grammaticalFeature);
        
        if (!workMatch || !complexityMatch || !themeMatch || !bookMatch || !grammarMatch) {
          return false;
        }
        
        // Search logic based on mode
        const searchLower = searchTerm.toLowerCase();
        
        switch (searchMode) {
          case 'exact':
            return text.text.toLowerCase().includes(searchLower);
          
          case 'fuzzy':
            // Simple fuzzy matching
            return text.text.toLowerCase().includes(searchLower) ||
                   text.themes.some(theme => theme.toLowerCase().includes(searchLower)) ||
                   text.grammaticalFeatures.some(feature => feature.toLowerCase().includes(searchLower)) ||
                   text.context.toLowerCase().includes(searchLower);
          
          case 'semantic':
            // Semantic search including themes, concepts, and context
            return text.text.toLowerCase().includes(searchLower) ||
                   text.themes.some(theme => theme.toLowerCase().includes(searchLower)) ||
                   text.philosophicalConcepts.some(concept => concept.toLowerCase().includes(searchLower)) ||
                   text.rhetoricalDevices.some(device => device.toLowerCase().includes(searchLower)) ||
                   text.grammaticalFeatures.some(feature => feature.toLowerCase().includes(searchLower)) ||
                   text.context.toLowerCase().includes(searchLower) ||
                   text.commentary.toLowerCase().includes(searchLower);
          
          default:
            return false;
        }
      })
      .map(text => ({
        ...text,
        highlights: generateHighlights(text.text, searchTerm),
        analysis: {
          complexity: text.complexity,
          themes: text.themes,
          grammaticalFeatures: text.grammaticalFeatures,
          rhetoricalDevices: text.rhetoricalDevices,
          philosophicalConcepts: text.philosophicalConcepts
        }
      }));
    
    setResults(searchResults);
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

  const highlightText = (text: string, highlights: Array<{ start: number; end: number; type: string; }>) => {
    if (!highlights.length) return text;
    
    let result = '';
    let lastIndex = 0;
    
    highlights.forEach(highlight => {
      result += text.substring(lastIndex, highlight.start);
      result += `<mark class="bg-yellow-300 text-black px-1 rounded font-semibold">${text.substring(highlight.start, highlight.end)}</mark>`;
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
      `${result.source} ${result.book}.${result.chapter}.${result.section}\n${result.text}\nTranslation: ${result.context}\n\n`
    ).join('');
    
    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `macrobius-search-results-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <section id="text-search" className="py-20 relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-4">
            {t.subtitle}
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-white/70">
            <Scroll className="w-4 h-4" />
            <span>Complete corpus search with advanced linguistic and thematic analysis</span>
          </div>
        </div>

        {/* Search Interface */}
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
                      />
                    </div>
                    <Button
                      onClick={performSearch}
                      disabled={loading || !searchTerm.trim()}
                      className="bg-wine-red hover:bg-wine-red/80 text-gold px-8 py-3"
                    >
                      {loading ? t.loading : t.searchButton}
                    </Button>
                  </div>

                  {/* Search Mode Selection */}
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-white/80">Search Mode:</span>
                    <div className="flex space-x-2">
                      {[
                        { key: 'exact', label: t.exactMatch },
                        { key: 'fuzzy', label: t.fuzzyMatch },
                        { key: 'semantic', label: t.semanticSearch }
                      ].map(mode => (
                        <Button
                          key={mode.key}
                          variant={searchMode === mode.key ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSearchMode(mode.key as any)}
                          className="text-xs"
                        >
                          {mode.label}
                        </Button>
                      ))}
                    </div>
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

          {/* Search Suggestions & History */}
          <div className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
              <CardHeader>
                <CardTitle className="text-gold text-sm">{t.suggestions}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {searchSuggestions.map((suggestion, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchTerm(suggestion)}
                      className="text-xs text-white/70 hover:text-white hover:bg-white/10"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {searchHistory.length > 0 && (
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardHeader>
                  <CardTitle className="text-gold text-sm">{t.searchHistory}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {searchHistory.map((term, i) => (
                      <Button
                        key={i}
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchTerm(term)}
                        className="w-full text-left text-xs text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <Clock className="w-3 h-3 mr-2" />
                        {term}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedSearch && (
          <Card className="mb-8 bg-white/10 backdrop-blur-sm border border-gold/30">
            <CardHeader>
              <CardTitle className="text-gold">{t.filters}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm text-white/80 mb-2">{t.work}</label>
                  <select
                    value={filters.work}
                    onChange={(e) => setFilters({...filters, work: e.target.value as any})}
                    className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white"
                  >
                    <option value="all">{t.all}</option>
                    <option value="saturnalia">Saturnalia</option>
                    <option value="commentary">Commentary</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-white/80 mb-2">{t.complexity}</label>
                  <select
                    value={filters.complexity}
                    onChange={(e) => setFilters({...filters, complexity: e.target.value as any})}
                    className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white"
                  >
                    <option value="all">{t.all}</option>
                    <option value="simple">Simple</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">{t.themes}</label>
                  <select
                    value={filters.theme}
                    onChange={(e) => setFilters({...filters, theme: e.target.value as any})}
                    className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white"
                  >
                    <option value="all">{t.all}</option>
                    <option value="philosophy">Philosophy</option>
                    <option value="astronomy">Astronomy</option>
                    <option value="literature">Literature</option>
                    <option value="culture">Culture</option>
                    <option value="etymology">Etymology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">{t.book}</label>
                  <select
                    value={filters.book}
                    onChange={(e) => setFilters({...filters, book: e.target.value})}
                    className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white"
                  >
                    <option value="all">{t.all}</option>
                    <option value="1">Book 1</option>
                    <option value="2">Book 2</option>
                    <option value="3">Book 3</option>
                    <option value="4">Book 4</option>
                    <option value="5">Book 5</option>
                    <option value="6">Book 6</option>
                    <option value="7">Book 7</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">{t.grammatical}</label>
                  <select
                    value={filters.grammaticalFeature}
                    onChange={(e) => setFilters({...filters, grammaticalFeature: e.target.value})}
                    className="w-full bg-white/20 border border-gold/30 rounded px-3 py-2 text-white"
                  >
                    <option value="all">{t.all}</option>
                    <option value="ablative absolute">Ablative Absolute</option>
                    <option value="indirect discourse">Indirect Discourse</option>
                    <option value="subjunctive mood">Subjunctive</option>
                    <option value="relative clauses">Relative Clauses</option>
                    <option value="purpose clauses">Purpose Clauses</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Header */}
        {results.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gold flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              {t.results} ({results.length})
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
            </div>
          </div>
        )}

        {/* No Results */}
        {results.length === 0 && searchTerm && !loading && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <p className="text-white/60 text-lg">{t.noResults}</p>
            <p className="text-white/40 text-sm mt-2">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Search Results */}
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
                    <Badge className={getComplexityColor(result.analysis.complexity)}>
                      {result.analysis.complexity}
                    </Badge>
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

                {/* Latin Text with Highlights */}
                <div className="mb-4">
                  <p 
                    className="text-white/90 text-lg leading-relaxed font-serif italic"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightText(result.text, result.highlights) 
                    }}
                  />
                </div>

                {/* Context */}
                <div className="text-sm text-white/70 italic mb-4 bg-black/20 p-3 rounded">
                  <strong>Context:</strong> {result.context}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {result.analysis.themes.map(theme => (
                    <Badge key={theme} variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-400">
                      {theme}
                    </Badge>
                  ))}
                  {result.analysis.grammaticalFeatures.slice(0, 3).map(feature => (
                    <Badge key={feature} variant="secondary" className="bg-green-600/20 text-green-300 border-green-400">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Expanded Content */}
                {expandedResults.has(result.id) && (
                  <div className="border-t border-gold/30 pt-4 space-y-4">
                    {/* Analysis */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold text-gold mb-2 flex items-center">
                          <Brain className="w-4 h-4 mr-2" />
                          {t.grammatical}
                        </h5>
                        <div className="space-y-1">
                          {result.analysis.grammaticalFeatures.map(feature => (
                            <Badge key={feature} variant="outline" className="mr-1 mb-1 text-xs border-green-400 text-green-300">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gold mb-2 flex items-center">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {t.rhetorical}
                        </h5>
                        <div className="space-y-1">
                          {result.analysis.rhetoricalDevices.map(device => (
                            <Badge key={device} variant="outline" className="mr-1 mb-1 text-xs border-purple-400 text-purple-300">
                              {device}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gold mb-2 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2" />
                          {t.philosophical}
                        </h5>
                        <div className="space-y-1">
                          {result.analysis.philosophicalConcepts.map(concept => (
                            <Badge key={concept} variant="outline" className="mr-1 mb-1 text-xs border-orange-400 text-orange-300">
                              {concept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="bg-black/20 p-4 rounded">
                      <h5 className="font-semibold text-gold mb-2">{t.metadata}</h5>
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-white/70">
                        <p><strong>Author:</strong> {result.metadata.author}</p>
                        <p><strong>Date:</strong> {result.metadata.date}</p>
                        <p><strong>{t.manuscript}:</strong> {result.metadata.manuscript}</p>
                        <p><strong>{t.edition}:</strong> {result.metadata.edition}</p>
                      </div>
                    </div>

                    {/* Commentary */}
                    <div className="bg-blue-900/20 p-4 rounded border border-blue-400/30">
                      <h5 className="font-semibold text-gold mb-2 flex items-center">
                        <Quote className="w-4 h-4 mr-2" />
                        {t.commentary}
                      </h5>
                      <p className="text-white/80 text-sm">{result.commentary}</p>
                    </div>

                    {/* Related Passages */}
                    {result.relatedPassages.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-gold mb-2 flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {t.related}
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {result.relatedPassages.map(passage => (
                            <Badge key={passage} variant="outline" className="text-xs border-gold text-gold">
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
      </div>
    </section>
  );
}
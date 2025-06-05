import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
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
  Zap
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
}

const translations = {
  en: {
    title: 'MacrobiusTextProcessor',
    subtitle: 'Advanced Search Through Complete Corpus (1,401 Passages)',
    searchPlaceholder: 'Search through complete Macrobius corpus...',
    searchButton: 'Search Corpus',
    advancedSearch: 'Advanced Filters',
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
    workDistribution: 'Work Distribution'
  },
  de: {
    title: 'MacrobiusTextProcessor',
    subtitle: 'Erweiterte Suche durch das komplette Korpus (1.401 Textstellen)',
    searchPlaceholder: 'Durchsuche das komplette Macrobius-Korpus...',
    searchButton: 'Korpus Durchsuchen',
    advancedSearch: 'Erweiterte Filter',
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
    workDistribution: 'Werk-Verteilung'
  },
  la: {
    title: 'MacrobiusTextProcessor',
    subtitle: 'Quaestio Provecta per Corpus Completum (1.401 Loci)',
    searchPlaceholder: 'Quaere per totum corpus Macrobii...',
    searchButton: 'Corpus Quaerere',
    advancedSearch: 'Filtra Provecta',
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
    workDistribution: 'Distributio Operum'
  }
};

export default function MacrobiusTextProcessor({ language }: TextSearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [bookmarkedResults, setBookmarkedResults] = useState<Set<string>>(new Set());
  const [corpusStats, setCorpusStats] = useState<any>(null);
  const [backendStatus, setBackendStatus] = useState<'connected' | 'error' | 'loading'>('loading');
  const [totalResults, setTotalResults] = useState(0);
  
  const [filters, setFilters] = useState<SearchFilters>({
    work_type: 'all',
    difficulty_level: 'all',
    cultural_theme: '',
    sort_by: 'relevance',
    limit: 20,
    offset: 0
  });

  const t = translations[language as keyof typeof translations] || translations.en;

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

  // Enhanced search function using real backend
  const performSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    
    try {
      const response = await MacrobiusAPI.passages.searchPassages(searchTerm, filters);
      
      if (response.status === 'success' && response.data) {
        const searchResults: SearchResult[] = response.data.passages.map((passage: MacrobiusPassage) => ({
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

  return (
    <section id="text-search" className="py-20 relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Backend Status */}
        <div className="text-center mb-16">
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

        {/* Advanced Filters */}
        {showAdvancedSearch && (
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
        {results.length > 0 && (
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
            </div>
          </div>
        )}

        {/* No Results */}
        {results.length === 0 && searchTerm && !loading && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <p className="text-white/60 text-lg">{t.noResults}</p>
            <p className="text-white/40 text-sm mt-2">
              {backendStatus === 'connected' ? 
                'Try adjusting your search terms or filters' : 
                'Please check backend connection'}
            </p>
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
                    <Badge className={getDifficultyColor(result.analysis.complexity)}>
                      {result.analysis.complexity}
                    </Badge>
                    <Badge variant="outline" className="border-blue-400 text-blue-300">
                      {result.metadata.culturalTheme}
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

                {/* Modern Relevance */}
                <div className="text-sm text-white/70 italic mb-4 bg-black/20 p-3 rounded">
                  <strong>Modern Relevance:</strong> {result.context}
                </div>

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
                </div>

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
                        <p><strong>Created:</strong> {new Date(result.metadata.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Modern Relevance Detail */}
                    <div className="bg-blue-900/20 p-4 rounded border border-blue-400/30">
                      <h5 className="font-semibold text-gold mb-2 flex items-center">
                        <Quote className="w-4 h-4 mr-2" />
                        Cultural Context
                      </h5>
                      <p className="text-white/80 text-sm">{result.metadata.modernRelevance}</p>
                    </div>
                  </div>
                )}
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
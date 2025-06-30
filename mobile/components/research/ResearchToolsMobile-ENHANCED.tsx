import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Search, 
  BookOpen, 
  Target, 
  BarChart3, 
  TrendingUp,
  Eye,
  Filter,
  Download,
  Share,
  Bookmark,
  Star,
  Clock,
  Zap,
  Brain,
  Settings,
  FileText,
  Database,
  Microscope,
  Network,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react';

// KWIC (Keywords in Context) Interface
interface KWICResult {
  id: string;
  keyword: string;
  leftContext: string;
  rightContext: string;
  source: string;
  book: number;
  chapter: number;
  section: number;
  culturalTheme: string;
  frequency: number;
}

// Concordance Analysis
interface ConcordanceData {
  term: string;
  totalOccurrences: number;
  contexts: KWICResult[];
  collocations: Collocation[];
  culturalSignificance: string;
  semanticField: string[];
  relatedTerms: string[];
}

interface Collocation {
  word: string;
  frequency: number;
  significance: number;
  distance: number;
}

// Advanced Search Parameters
interface SearchParameters {
  query: string;
  searchType: 'exact' | 'lemma' | 'semantic' | 'proximity';
  culturalTheme?: string;
  difficulty?: string;
  textType?: 'Saturnalia' | 'Commentarii' | 'Both';
  dateRange?: [number, number];
  grammarFeatures?: string[];
  proximityDistance?: number;
  caseSensitive: boolean;
  wholeWords: boolean;
}

// Statistical Analysis
interface TextStatistics {
  totalWords: number;
  uniqueWords: number;
  averageWordsPerSentence: number;
  lexicalDiversity: number;
  typeTokenRatio: number;
  topWords: { word: string; frequency: number; percentage: number }[];
  culturalTermsFrequency: { theme: string; count: number; percentage: number }[];
  grammarDistribution: { feature: string; count: number }[];
}

// Research Session
interface ResearchSession {
  id: string;
  title: string;
  created: number;
  lastModified: number;
  queries: SearchParameters[];
  results: KWICResult[];
  notes: string;
  bookmarks: string[];
  exportFormats: string[];
}

// Mock Macrobius corpus data for KWIC analysis
const MOCK_CORPUS_DATA: KWICResult[] = [
  {
    id: 'kwic-1',
    keyword: 'convivium',
    leftContext: 'Multis mihi et variis delectionibus oblectatum animum ad Saturnaliorum hilaritatem provehere decrevi, cum et tempus festum et doctorum hominum',
    rightContext: 'invitaret, ut inter pocula et iocos severitas quoque studiorum haberet locum.',
    source: 'Saturnalia I.1.1',
    book: 1,
    chapter: 1,
    section: 1,
    culturalTheme: 'Social',
    frequency: 23
  },
  {
    id: 'kwic-2',
    keyword: 'sapientia',
    leftContext: 'Nam et vitae nostrae ratio et doctrinarum omnium disciplina ex',
    rightContext: 'nascitur, et haec ipsa quam colimus et sequimur philosophia sapientiae studium est.',
    source: 'Commentarii I.2.3',
    book: 1,
    chapter: 2,
    section: 3,
    culturalTheme: 'Philosophy',
    frequency: 31
  },
  {
    id: 'kwic-3',
    keyword: 'pietas',
    leftContext: 'Virtutum omnium fundamento',
    rightContext: 'erga deos patriamque et parentes constituta est, quae solida vita bonis moribus instruitur.',
    source: 'Saturnalia III.14.2',
    book: 3,
    chapter: 14,
    section: 2,
    culturalTheme: 'Religious',
    frequency: 18
  },
  {
    id: 'kwic-4',
    keyword: 'mundus',
    leftContext: 'Totius huius',
    rightContext: 'machinam, quam videmus, ratione divina perfectam esse demonstratur numerorum concordia.',
    source: 'Commentarii II.1.14',
    book: 2,
    chapter: 1,
    section: 14,
    culturalTheme: 'Astronomy',
    frequency: 42
  },
  {
    id: 'kwic-5',
    keyword: 'doctrina',
    leftContext: 'Omnium artium',
    rightContext: 'ex antiquorum sapientum traditionibus haustas ad nostram aetatem transmittere studemus.',
    source: 'Saturnalia Praefatio',
    book: 0,
    chapter: 0,
    section: 1,
    culturalTheme: 'Education',
    frequency: 27
  },
  {
    id: 'kwic-6',
    keyword: 'virtus',
    leftContext: 'Romana',
    rightContext: 'non in bellica tantum gloria consistit, sed in omni vitae ratione pietate, gravitate, constantia elucet.',
    source: 'Saturnalia III.14.1',
    book: 3,
    chapter: 14,
    section: 1,
    culturalTheme: 'Social',
    frequency: 35
  },
  {
    id: 'kwic-7',
    keyword: 'somnium',
    leftContext: 'Quale illud Scipionis',
    rightContext: 'non ad quietem refertur sed ad divinationis speciem, cum animus ex corporis vinculis relaxatus futura praecognoscit.',
    source: 'Commentarii I.3.4',
    book: 1,
    chapter: 3,
    section: 4,
    culturalTheme: 'Philosophy',
    frequency: 15
  },
  {
    id: 'kwic-8',
    keyword: 'harmonia',
    leftContext: 'Caelestis',
    rightContext: 'ex planetarum motibus vario concentu generatur, quae sensibus nostris propter magnitudinem non percipitur.',
    source: 'Commentarii II.4.6',
    book: 2,
    chapter: 4,
    section: 6,
    culturalTheme: 'Astronomy',
    frequency: 12
  }
];

// Generate mock statistics
const MOCK_STATISTICS: TextStatistics = {
  totalWords: 48750,
  uniqueWords: 8420,
  averageWordsPerSentence: 18.3,
  lexicalDiversity: 0.827,
  typeTokenRatio: 0.173,
  topWords: [
    { word: 'et', frequency: 1847, percentage: 3.79 },
    { word: 'in', frequency: 1523, percentage: 3.12 },
    { word: 'est', frequency: 1205, percentage: 2.47 },
    { word: 'quod', frequency: 987, percentage: 2.02 },
    { word: 'cum', frequency: 865, percentage: 1.77 },
    { word: 'non', frequency: 743, percentage: 1.52 },
    { word: 'ut', frequency: 689, percentage: 1.41 },
    { word: 'ad', frequency: 634, percentage: 1.30 }
  ],
  culturalTermsFrequency: [
    { theme: 'Philosophy', count: 412, percentage: 24.3 },
    { theme: 'Social', count: 387, percentage: 22.8 },
    { theme: 'Religious', count: 298, percentage: 17.6 },
    { theme: 'Astronomy', count: 245, percentage: 14.4 },
    { theme: 'Education', count: 203, percentage: 12.0 },
    { theme: 'Literature', count: 150, percentage: 8.9 }
  ],
  grammarDistribution: [
    { feature: 'Ablative Absolute', count: 156 },
    { feature: 'Subordinate Clauses', count: 298 },
    { feature: 'Participial Constructions', count: 187 },
    { feature: 'Indirect Discourse', count: 134 },
    { feature: 'Conditional Sentences', count: 89 }
  ]
};

interface ResearchToolsMobileProps {
  onBackPress: () => void;
  language: 'DE' | 'EN' | 'LA';
}

const ResearchToolsMobile: React.FC<ResearchToolsMobileProps> = ({
  onBackPress,
  language = 'DE'
}) => {
  // State management
  const [activeTab, setActiveTab] = useState<'kwic' | 'concordance' | 'statistics' | 'sessions'>('kwic');
  const [searchParams, setSearchParams] = useState<SearchParameters>({
    query: '',
    searchType: 'exact',
    caseSensitive: false,
    wholeWords: true
  });
  const [kwicResults, setKwicResults] = useState<KWICResult[]>([]);
  const [concordanceData, setConcordanceData] = useState<ConcordanceData | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedResult, setSelectedResult] = useState<KWICResult | null>(null);
  const [bookmarkedResults, setBookmarkedResults] = useState<string[]>([]);
  const [researchSessions, setResearchSessions] = useState<ResearchSession[]>([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'txt'>('csv');

  // Perform KWIC search
  const performKWICSearch = async () => {
    if (!searchParams.query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Filter mock data based on search parameters
    const results = MOCK_CORPUS_DATA.filter(result => {
      const queryMatch = searchParams.caseSensitive
        ? result.keyword.includes(searchParams.query)
        : result.keyword.toLowerCase().includes(searchParams.query.toLowerCase());
      
      const themeMatch = !searchParams.culturalTheme || 
        result.culturalTheme === searchParams.culturalTheme;
      
      return queryMatch && themeMatch;
    });
    
    setKwicResults(results);
    setIsSearching(false);
  };

  // Generate concordance analysis
  const generateConcordance = async (term: string) => {
    setIsSearching(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const termResults = MOCK_CORPUS_DATA.filter(result => 
      result.keyword.toLowerCase() === term.toLowerCase()
    );
    
    const concordance: ConcordanceData = {
      term,
      totalOccurrences: termResults.length * 3, // Simulate more occurrences
      contexts: termResults,
      collocations: [
        { word: 'doctorum', frequency: 8, significance: 0.87, distance: 2 },
        { word: 'hominum', frequency: 6, significance: 0.72, distance: 3 },
        { word: 'festum', frequency: 5, significance: 0.65, distance: 1 },
        { word: 'tempus', frequency: 4, significance: 0.58, distance: 4 }
      ],
      culturalSignificance: `The term "${term}" appears ${termResults.length * 3} times in Macrobius' corpus, primarily in contexts related to ${termResults[0]?.culturalTheme.toLowerCase()} discourse.`,
      semanticField: ['social gathering', 'intellectual discourse', 'Roman customs', 'festive occasions'],
      relatedTerms: ['convivium', 'symposium', 'sermo', 'colloquium', 'congressus']
    };
    
    setConcordanceData(concordance);
    setIsSearching(false);
  };

  // Toggle bookmark
  const toggleBookmark = (resultId: string) => {
    setBookmarkedResults(prev => 
      prev.includes(resultId)
        ? prev.filter(id => id !== resultId)
        : [...prev, resultId]
    );
  };

  // Export results
  const exportResults = () => {
    const data = kwicResults.map(result => ({
      keyword: result.keyword,
      leftContext: result.leftContext,
      rightContext: result.rightContext,
      source: result.source,
      culturalTheme: result.culturalTheme
    }));
    
    let content = '';
    let filename = '';
    
    switch (exportFormat) {
      case 'csv':
        content = `Keyword,Left Context,Right Context,Source,Cultural Theme\n${data.map(row => 
          Object.values(row).map(val => `"${val}"`).join(',')
        ).join('\n')}`;
        filename = 'macrobius-kwic-results.csv';
        break;
      case 'json':
        content = JSON.stringify(data, null, 2);
        filename = 'macrobius-kwic-results.json';
        break;
      case 'txt':
        content = data.map(row => 
          `${row.keyword}: ${row.leftContext} [${row.keyword}] ${row.rightContext} (${row.source})`
        ).join('\n\n');
        filename = 'macrobius-kwic-results.txt';
        break;
    }
    
    // Simulate file download
    console.log('Exporting:', { filename, content });
  };

  // KWIC Search Interface
  const KWICSearchTab = () => (
    <div className="space-y-6">
      {/* Search Interface */}
      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h3 className="font-bold text-xl mb-4 flex items-center space-x-2">
          <Search className="w-6 h-6 text-blue-400" />
          <span>KWIC Search</span>
        </h3>
        
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter search term..."
              value={searchParams.query}
              onChange={(e) => setSearchParams(prev => ({ ...prev, query: e.target.value }))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-blue-400"
              onKeyPress={(e) => e.key === 'Enter' && performKWICSearch()}
            />
            <button
              onClick={performKWICSearch}
              disabled={!searchParams.query.trim() || isSearching}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {/* Search Options */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Search Type</label>
              <select
                value={searchParams.searchType}
                onChange={(e) => setSearchParams(prev => ({ ...prev, searchType: e.target.value as any }))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                <option value="exact">Exact Match</option>
                <option value="lemma">Lemma Search</option>
                <option value="semantic">Semantic</option>
                <option value="proximity">Proximity</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Cultural Theme</label>
              <select
                value={searchParams.culturalTheme || ''}
                onChange={(e) => setSearchParams(prev => ({ ...prev, culturalTheme: e.target.value || undefined }))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                <option value="">All Themes</option>
                <option value="Social">Social</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Religious">Religious</option>
                <option value="Astronomy">Astronomy</option>
                <option value="Education">Education</option>
              </select>
            </div>
          </div>
          
          {/* Advanced Options Toggle */}
          <button
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Advanced Options</span>
          </button>
          
          {/* Advanced Options */}
          <AnimatePresence>
            {showAdvancedOptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white/5 rounded-lg p-4 border border-white/10"
              >
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={searchParams.caseSensitive}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, caseSensitive: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm">Case Sensitive</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={searchParams.wholeWords}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, wholeWords: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm">Whole Words Only</span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results */}
      {kwicResults.length > 0 && (
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-lg">Results ({kwicResults.length})</h4>
            <div className="flex items-center space-x-2">
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as any)}
                className="px-3 py-1 bg-white/10 border border-white/20 rounded text-sm"
              >
                <option value="csv">CSV</option>
                <option value="json">JSON</option>
                <option value="txt">TXT</option>
              </select>
              <button
                onClick={exportResults}
                className="flex items-center space-x-1 px-3 py-1 bg-green-500 rounded text-sm hover:bg-green-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {kwicResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      result.culturalTheme === 'Philosophy' ? 'bg-blue-500/30 text-blue-300' :
                      result.culturalTheme === 'Social' ? 'bg-green-500/30 text-green-300' :
                      result.culturalTheme === 'Religious' ? 'bg-purple-500/30 text-purple-300' :
                      result.culturalTheme === 'Astronomy' ? 'bg-orange-500/30 text-orange-300' :
                      'bg-gray-500/30 text-gray-300'
                    }`}>
                      {result.culturalTheme}
                    </span>
                    <span className="text-xs text-white/60">{result.source}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => toggleBookmark(result.id)}
                      className="p-1 hover:bg-white/20 rounded transition-colors"
                    >
                      <Bookmark 
                        className={`w-4 h-4 ${
                          bookmarkedResults.includes(result.id) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-white/60'
                        }`} 
                      />
                    </button>
                    <button
                      onClick={() => generateConcordance(result.keyword)}
                      className="p-1 hover:bg-white/20 rounded transition-colors"
                    >
                      <BarChart3 className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                </div>
                
                <div className="font-mono text-sm leading-relaxed">
                  <span className="text-white/70">{result.leftContext}</span>
                  <span className="bg-yellow-400/30 text-yellow-200 px-1 rounded font-bold">
                    {result.keyword}
                  </span>
                  <span className="text-white/70">{result.rightContext}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Concordance Analysis Tab
  const ConcordanceTab = () => (
    <div className="space-y-6">
      {concordanceData ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Term Overview */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-400/30">
            <h3 className="font-bold text-2xl text-blue-300 mb-2">
              Concordance: "{concordanceData.term}"
            </h3>
            <p className="text-white/90 mb-4">{concordanceData.culturalSignificance}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-300">{concordanceData.totalOccurrences}</div>
                <div className="text-sm text-white/70">Total Occurrences</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-300">{concordanceData.collocations.length}</div>
                <div className="text-sm text-white/70">Collocations</div>
              </div>
            </div>
          </div>

          {/* Collocations */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h4 className="font-bold text-lg mb-4 flex items-center space-x-2">
              <Network className="w-5 h-5 text-green-400" />
              <span>Frequent Collocations</span>
            </h4>
            <div className="space-y-3">
              {concordanceData.collocations.map((collocation, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{collocation.word}</span>
                    <span className="text-sm text-white/60">±{collocation.distance} words</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-green-300">×{collocation.frequency}</span>
                    <div className="w-16 bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full"
                        style={{ width: `${collocation.significance * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Field */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h4 className="font-bold text-lg mb-4 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <span>Semantic Field</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {concordanceData.semanticField.map((term, index) => (
                <span key={index} className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm">
                  {term}
                </span>
              ))}
            </div>
          </div>

          {/* Related Terms */}
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h4 className="font-bold text-lg mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-400" />
              <span>Related Terms</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {concordanceData.relatedTerms.map((term, index) => (
                <button
                  key={index}
                  onClick={() => generateConcordance(term)}
                  className="px-3 py-1 bg-orange-500/30 text-orange-200 rounded-full text-sm hover:bg-orange-500/50 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <Microscope className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No Concordance Analysis</h3>
          <p className="text-white/60 mb-6">Perform a KWIC search and click the analysis button on any result.</p>
          <button
            onClick={() => setActiveTab('kwic')}
            className="px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors"
          >
            Start KWIC Search
          </button>
        </div>
      )}
    </div>
  );

  // Statistics Tab
  const StatisticsTab = () => (
    <div className="space-y-6">
      {/* Basic Statistics */}
      <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl p-6 border border-green-400/30">
        <h3 className="font-bold text-xl text-green-300 mb-4 flex items-center space-x-2">
          <BarChart3 className="w-6 h-6" />
          <span>Corpus Statistics</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-300">{MOCK_STATISTICS.totalWords.toLocaleString()}</div>
            <div className="text-sm text-white/70">Total Words</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-300">{MOCK_STATISTICS.uniqueWords.toLocaleString()}</div>
            <div className="text-sm text-white/70">Unique Words</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-300">{MOCK_STATISTICS.averageWordsPerSentence}</div>
            <div className="text-sm text-white/70">Avg Words/Sentence</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-300">{MOCK_STATISTICS.lexicalDiversity}</div>
            <div className="text-sm text-white/70">Lexical Diversity</div>
          </div>
        </div>
      </div>

      {/* Top Words */}
      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h4 className="font-bold text-lg mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <span>Most Frequent Words</span>
        </h4>
        <div className="space-y-2">
          {MOCK_STATISTICS.topWords.map((word, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                <span className="font-medium">{word.word}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-white/70">{word.frequency}</span>
                <span className="text-sm text-blue-300">{word.percentage}%</span>
                <div className="w-20 bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-blue-400 h-2 rounded-full"
                    style={{ width: `${(word.percentage / 3.79) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Terms Distribution */}
      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h4 className="font-bold text-lg mb-4 flex items-center space-x-2">
          <PieChart className="w-5 h-5 text-purple-400" />
          <span>Cultural Terms Distribution</span>
        </h4>
        <div className="space-y-3">
          {MOCK_STATISTICS.culturalTermsFrequency.map((theme, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="font-medium">{theme.theme}</span>
              <div className="flex items-center space-x-2 flex-1 ml-4">
                <div className="flex-1 bg-white/20 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      theme.theme === 'Philosophy' ? 'bg-blue-400' :
                      theme.theme === 'Social' ? 'bg-green-400' :
                      theme.theme === 'Religious' ? 'bg-purple-400' :
                      theme.theme === 'Astronomy' ? 'bg-orange-400' :
                      theme.theme === 'Education' ? 'bg-yellow-400' :
                      'bg-pink-400'
                    }`}
                    style={{ width: `${(theme.percentage / 24.3) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-white/70 w-12 text-right">{theme.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBackPress}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
            <span>Back</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold">🔬 Research Tools</h1>
            <p className="text-sm text-gray-400">KWIC & Concordance Analysis</p>
          </div>
          
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Share className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-black/30 border-b border-white/10">
        <div className="flex overflow-x-auto">
          {[
            { id: 'kwic', label: 'KWIC Search', icon: Search },
            { id: 'concordance', label: 'Concordance', icon: Network },
            { id: 'statistics', label: 'Statistics', icon: BarChart3 },
            { id: 'sessions', label: 'Sessions', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-400 text-blue-300 bg-blue-500/10'
                    : 'border-transparent text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'kwic' && <KWICSearchTab />}
            {activeTab === 'concordance' && <ConcordanceTab />}
            {activeTab === 'statistics' && <StatisticsTab />}
            {activeTab === 'sessions' && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60">Research sessions feature coming soon</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResearchToolsMobile;
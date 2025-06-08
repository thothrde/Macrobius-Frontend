// MacrobiusTextProcessor - Advanced text search and analysis
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, BookOpen, Eye, Filter, Languages, Star } from 'lucide-react';

interface TextSearchSectionProps {
  language: string;
}

interface SearchResult {
  id: string;
  text: string;
  source: string;
  book: number;
  chapter: number;
  context: string;
  highlights: Array<{ start: number; end: number; type: string; }>;
  analysis: {
    complexity: 'simple' | 'intermediate' | 'advanced';
    themes: string[];
    grammaticalFeatures: string[];
  };
}

const translations = {
  en: {
    title: 'MacrobiusTextProcessor',
    subtitle: 'Advanced Text Search & Analysis',
    searchPlaceholder: 'Search Macrobius texts...',
    searchButton: 'Analyze Text',
    results: 'Search Results',
    noResults: 'No results found',
    filters: 'Filters',
    all: 'All Books',
    complexity: 'Complexity',
    themes: 'Themes',
    book: 'Book',
    chapter: 'Chapter',
    showContext: 'Show Context',
    analysis: 'Analysis',
    grammatical: 'Grammatical Features',
    loading: 'Analyzing text...'
  },
  de: {
    title: 'MacrobiusTextProcessor',
    subtitle: 'Erweiterte Textsuche & Analyse',
    searchPlaceholder: 'Macrobius-Texte durchsuchen...',
    searchButton: 'Text Analysieren',
    results: 'Suchergebnisse',
    noResults: 'Keine Ergebnisse gefunden',
    filters: 'Filter',
    all: 'Alle Bücher',
    complexity: 'Komplexität',
    themes: 'Themen',
    book: 'Buch',
    chapter: 'Kapitel',
    showContext: 'Kontext Anzeigen',
    analysis: 'Analyse',
    grammatical: 'Grammatische Merkmale',
    loading: 'Text wird analysiert...'
  },
  la: {
    title: 'MacrobiusTextProcessor',
    subtitle: 'Quaestio Textuum et Analytica',
    searchPlaceholder: 'Quaere textus Macrobii...',
    searchButton: 'Textum Analysa',
    results: 'Eventus Quaestionis',
    noResults: 'Nihil inventum',
    filters: 'Filtra',
    all: 'Omnes Libri',
    complexity: 'Difficultas',
    themes: 'Themata',
    book: 'Liber',
    chapter: 'Caput',
    showContext: 'Contextum Monstra',
    analysis: 'Analysis',
    grammatical: 'Grammatica',
    loading: 'Textus analyzatur...'
  }
};

// Mock Macrobius text database
const macrobiumTexts = [
  {
    id: '1',
    text: 'Sed ne longa sit huius disputationis mora, quoniam de his, quae supra diximus, satis dictum est...',
    source: 'Saturnalia',
    book: 1,
    chapter: 1,
    context: 'Introduction to the Saturnalia dialogue where Macrobius sets the scene for the learned conversation.',
    themes: ['philosophy', 'education', 'dialogue'],
    complexity: 'intermediate' as const,
    grammaticalFeatures: ['subjunctive', 'ablative absolute', 'indirect discourse']
  },
  {
    id: '2', 
    text: 'Veteres enim nostri, qui haec nobis eruditionis instrumenta tradiderunt...',
    source: 'Saturnalia',
    book: 1,
    chapter: 2,
    context: 'Discussion of ancient traditions and learning methods.',
    themes: ['tradition', 'education', 'antiquity'],
    complexity: 'advanced' as const,
    grammaticalFeatures: ['relative clauses', 'perfect passive participle', 'dative of advantage']
  },
  {
    id: '3',
    text: 'In Somnium Scipionis commentarius demonstrat astronomiae peritiam...',
    source: 'Commentary on the Dream of Scipio',
    book: 1,
    chapter: 1,
    context: 'Introduction to astronomical knowledge in the Commentary.',
    themes: ['astronomy', 'philosophy', 'dreams'],
    complexity: 'advanced' as const,
    grammaticalFeatures: ['genitive of quality', 'demonstrative pronouns']
  }
];

function TextSearchSection({ language }: TextSearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');
  const [showAnalysis, setShowAnalysis] = useState(false);

  const t = translations[language as keyof typeof translations] || translations.en;

  const performSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock search logic
    const searchResults: SearchResult[] = macrobiumTexts
      .filter(text => {
        const matchesSearch = text.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            text.themes.some(theme => theme.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesBook = selectedBook === 'all' || text.book.toString() === selectedBook;
        const matchesComplexity = selectedComplexity === 'all' || text.complexity === selectedComplexity;
        
        return matchesSearch && matchesBook && matchesComplexity;
      })
      .map(text => ({
        ...text,
        highlights: [{
          start: text.text.toLowerCase().indexOf(searchTerm.toLowerCase()),
          end: text.text.toLowerCase().indexOf(searchTerm.toLowerCase()) + searchTerm.length,
          type: 'match'
        }].filter(h => h.start >= 0),
        analysis: {
          complexity: text.complexity,
          themes: text.themes,
          grammaticalFeatures: text.grammaticalFeatures
        }
      }));
    
    setResults(searchResults);
    setLoading(false);
  };

  const highlightText = (text: string, highlights: Array<{ start: number; end: number; type: string; }>) => {
    if (!highlights.length) return text;
    
    let highlighted = text;
    highlights.forEach(highlight => {
      if (highlight.start >= 0) {
        const before = text.substring(0, highlight.start);
        const match = text.substring(highlight.start, highlight.end);
        const after = text.substring(highlight.end);
        highlighted = before + `<mark class="bg-yellow-300 text-black px-1 rounded">${match}</mark>` + after;
      }
    });
    
    return highlighted;
  };

  return (
    <section id="text-search" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 layer-visualization">
          <div className="layer-base">
            <div className="golden-accent p-8 rounded-xl">
              <h2 className="text-4xl font-bold text-gradient mb-4 animate-text-reveal">
                {t.title}
              </h2>
              <p className="text-xl text-white/90 animate-text-reveal">
                {t.subtitle}
              </p>
            </div>
          </div>
          <div className="layer-overlay"></div>
        </div>

        {/* Search Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Search Bar */}
          <div className="lg:col-span-3">
            <div className="card-hover p-6 rounded-xl">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gold/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                  />
                </div>
                <Button
                  onClick={performSearch}
                  disabled={loading || !searchTerm.trim()}
                  className="btn-wine px-6 py-3"
                >
                  {loading ? t.loading : t.searchButton}
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="card-hover p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gold mb-4 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              {t.filters}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/80 mb-2">{t.book}</label>
                <select
                  value={selectedBook}
                  onChange={(e) => setSelectedBook(e.target.value)}
                  className="w-full bg-white/10 border border-gold/30 rounded px-3 py-2 text-white"
                >
                  <option value="all">{t.all}</option>
                  <option value="1">Book 1</option>
                  <option value="2">Book 2</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-white/80 mb-2">{t.complexity}</label>
                <select
                  value={selectedComplexity}
                  onChange={(e) => setSelectedComplexity(e.target.value)}
                  className="w-full bg-white/10 border border-gold/30 rounded px-3 py-2 text-white"
                >
                  <option value="all">All Levels</option>
                  <option value="simple">Simple</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gold flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              {t.results} ({results.length})
            </h3>
            <Button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="btn-wine"
            >
              <Eye className="w-4 h-4 mr-2" />
              {t.analysis}
            </Button>
          </div>

          {results.length === 0 && searchTerm && !loading && (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">{t.noResults}</p>
            </div>
          )}

          {results.map((result, index) => (
            <Card key={result.id} className="card-hover p-6 animate-staggered-reveal golden-glow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gold">
                    {result.source} - {t.book} {result.book}, {t.chapter} {result.chapter}
                  </h4>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      result.analysis.complexity === 'simple' ? 'bg-green-600 text-white' :
                      result.analysis.complexity === 'intermediate' ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {result.analysis.complexity}
                    </span>
                    {result.analysis.themes.map(theme => (
                      <span key={theme} className="px-2 py-1 bg-blue-600 text-white rounded text-xs">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
                <Star className="w-5 h-5 text-gold" />
              </div>

              <div className="mb-4">
                <p 
                  className="text-white/90 text-lg leading-relaxed latin-text"
                  dangerouslySetInnerHTML={{ 
                    __html: highlightText(result.text, result.highlights) 
                  }}
                />
              </div>

              <div className="text-sm text-white/70 italic mb-4">
                {result.context}
              </div>

              {showAnalysis && (
                <div className="border-t border-gold/30 pt-4 animate-dialog-fade">
                  <h5 className="font-semibold text-gold mb-2">{t.grammatical}:</h5>
                  <div className="flex flex-wrap gap-2">
                    {result.analysis.grammaticalFeatures.map(feature => (
                      <span key={feature} className="px-2 py-1 bg-wine-red text-gold rounded text-xs border border-gold">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Export both named and default for compatibility
export { TextSearchSection };
export default TextSearchSection;
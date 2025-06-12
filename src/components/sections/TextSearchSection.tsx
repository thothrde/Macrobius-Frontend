import React, { useState } from 'react';

interface TextSearchSectionProps {
  isActive: boolean;
  t: (key: string) => string;
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

// Mock Macrobius text database
const macrobiumTexts = [
  {
    id: '1',
    text: 'Sed ne longa sit huius disputationis mora, quoniam de his, quae supra diximus, satis dictum est...',
    source: 'Saturnalia',
    book: 1,
    chapter: 1,
    context: 'Einführung in den Saturnalia-Dialog, wo Macrobius die Szene für das gelehrte Gespräch setzt.',
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
    context: 'Diskussion über antike Traditionen und Lernmethoden.',
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
    context: 'Einführung in das astronomische Wissen im Kommentar.',
    themes: ['astronomy', 'philosophy', 'dreams'],
    complexity: 'advanced' as const,
    grammaticalFeatures: ['genitive of quality', 'demonstrative pronouns']
  }
];

function TextSearchSection({ isActive, t }: TextSearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');
  const [showAnalysis, setShowAnalysis] = useState(false);

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

  if (!isActive) return null;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">
            MacrobiusTextProcessor
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Erweiterte Textsuche & Analyse
          </p>
        </div>

        {/* Search Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Search Bar */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400">
                    🔍
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Macrobius-Texte durchsuchen..."
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-yellow-400/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                  />
                </div>
                <button
                  onClick={performSearch}
                  disabled={loading || !searchTerm.trim()}
                  className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-colors"
                >
                  {loading ? 'Analysiere...' : 'Text Analysieren'}
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center">
              🔧 Filter
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/80 mb-2">Buch</label>
                <select
                  value={selectedBook}
                  onChange={(e) => setSelectedBook(e.target.value)}
                  className="w-full bg-white/10 border border-yellow-400/30 rounded px-3 py-2 text-white"
                >
                  <option value="all">Alle Bücher</option>
                  <option value="1">Buch 1</option>
                  <option value="2">Buch 2</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-white/80 mb-2">Komplexität</label>
                <select
                  value={selectedComplexity}
                  onChange={(e) => setSelectedComplexity(e.target.value)}
                  className="w-full bg-white/10 border border-yellow-400/30 rounded px-3 py-2 text-white"
                >
                  <option value="all">Alle Level</option>
                  <option value="simple">Einfach</option>
                  <option value="intermediate">Mittel</option>
                  <option value="advanced">Fortgeschritten</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-yellow-400 flex items-center">
              📚 Suchergebnisse ({results.length})
            </h3>
            <button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
            >
              👁️ Analyse {showAnalysis ? 'ausblenden' : 'anzeigen'}
            </button>
          </div>

          {results.length === 0 && searchTerm && !loading && (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">Keine Ergebnisse gefunden</p>
            </div>
          )}

          {results.map((result, index) => (
            <div key={result.id} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400">
                    {result.source} - Buch {result.book}, Kapitel {result.chapter}
                  </h4>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      result.analysis.complexity === 'simple' ? 'bg-green-600 text-white' :
                      result.analysis.complexity === 'intermediate' ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {result.analysis.complexity === 'simple' ? 'Einfach' :
                       result.analysis.complexity === 'intermediate' ? 'Mittel' : 'Fortgeschritten'}
                    </span>
                    {result.analysis.themes.map(theme => (
                      <span key={theme} className="px-2 py-1 bg-blue-600 text-white rounded text-xs">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
                ⭐
              </div>

              <div className="mb-4">
                <p 
                  className="text-white/90 text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: highlightText(result.text, result.highlights) 
                  }}
                />
              </div>

              <div className="text-sm text-white/70 italic mb-4">
                {result.context}
              </div>

              {showAnalysis && (
                <div className="border-t border-yellow-400/30 pt-4">
                  <h5 className="font-semibold text-yellow-400 mb-2">Grammatische Merkmale:</h5>
                  <div className="flex flex-wrap gap-2">
                    {result.analysis.grammaticalFeatures.map(feature => (
                      <span key={feature} className="px-2 py-1 bg-yellow-600/20 text-yellow-200 rounded text-xs border border-yellow-400/50">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Export both named and default for compatibility
export { TextSearchSection };
export default TextSearchSection;
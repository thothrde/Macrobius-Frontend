import React, { useState } from 'react';

interface TextSearchSectionProps {
  isActive: boolean;
  t: (key: string) => string;
  language?: 'DE' | 'EN' | 'LA';
}

function TextSearchSection({ isActive, t, language = 'DE' }: TextSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Placeholder for Oracle Cloud API integration
    try {
      // TODO: Replace with actual Oracle Cloud API call
      // const response = await fetch(`http://152.70.184.232:8080/api/passages?query=${encodeURIComponent(query)}`);
      // const data = await response.json();
      
      // Mock results for now
      const mockResults = [
        {
          id: 1,
          text: "Macrobius beschreibt die Sphärenharmonie der Himmelskörper...",
          source: "Commentarii in Somnium Scipionis, Buch II",
          theme: "Astronomie",
          relevance: 95
        },
        {
          id: 2,
          text: "In den Saturnalia diskutieren die Gelehrten über antike Bräuche der Römer...",
          source: "Saturnalia, Buch I",
          theme: "Römische Kultur",
          relevance: 88
        }
      ];
      
      setSearchResults(mockResults);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  if (!isActive) return null;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8">
          <h2 className="text-4xl font-bold text-yellow-400 mb-8">
            🔍 Textsuche
          </h2>
          
          <p className="text-xl text-white/90 mb-8">
            Durchsuche die authentischen Macrobius-Texte
          </p>
          
          <div className="bg-orange-500/20 border border-orange-400/50 rounded-lg p-6 mb-8">
            <div className="text-white/90 space-y-4">
              <p className="text-lg font-semibold">🚧 Oracle Cloud Integration bereit!</p>
              <div className="text-left space-y-2">
                <p><strong>Verfügbare Daten:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>1.401 lateinische Textpassagen</li>
                  <li>235.237 Zeichen authentischer Inhalte</li>
                  <li>9 kulturelle Themen kategorisiert</li>
                  <li>16 kulturelle Einsichten</li>
                  <li>16 Lehrmodule</li>
                </ul>
                <p><strong>API-Endpunkt:</strong> <code className="text-yellow-300">http://152.70.184.232:8080/api</code></p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                placeholder="Suche in Macrobius-Texten... (z.B. 'Saturnus', 'convivium', 'philosophia')"
                className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <button
                onClick={() => handleSearch(searchQuery)}
                disabled={isSearching}
                className="absolute right-2 top-2 px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 disabled:opacity-50 transition-all"
              >
                {isSearching ? '🔍...' : '🔍 Suchen'}
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-yellow-400">Suchergebnisse</h3>
                {searchResults.map((result) => (
                  <div key={result.id} className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 text-left">
                    <div className="flex justify-between items-start mb-3">
                      <span className="px-3 py-1 bg-yellow-400/20 text-yellow-300 rounded-full text-sm font-medium">
                        {result.theme}
                      </span>
                      <span className="text-white/60 text-sm">
                        Relevanz: {result.relevance}%
                      </span>
                    </div>
                    <p className="text-white/90 mb-3">{result.text}</p>
                    <p className="text-white/60 text-sm italic">{result.source}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-300 mb-3">📚 Nächste Schritte für Integration:</h4>
              <div className="text-left text-white/90 space-y-2 text-sm">
                <p>1. <strong>API-Client erstellen:</strong> Verbindung zu Oracle Cloud Backend</p>
                <p>2. <strong>Suchfunktionen implementieren:</strong> Volltext-Suche durch 1.401 Passagen</p>
                <p>3. <strong>Themen-Filter hinzufügen:</strong> Suche nach 9 kulturellen Themen</p>
                <p>4. <strong>Erweiterte Features:</strong> Sortierung, Paginierung, Kontextsuche</p>
                <p>5. <strong>Bildungstools verknüpfen:</strong> Integration mit Vokabeltrainer und Grammatik</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TextSearchSection;
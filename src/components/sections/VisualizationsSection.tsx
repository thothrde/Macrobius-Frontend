import React, { useState } from 'react';

interface VisualizationsSectionProps {
  isActive: boolean;
  t: (key: string) => string;
}

function VisualizationsSection({ isActive, t }: VisualizationsSectionProps) {
  const [selectedViz, setSelectedViz] = useState<string | null>(null);

  if (!isActive) return null;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-yellow-400 mb-8">
            Visualisierungen
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Interaktive Darstellungen antiker Weisheit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/20 transition-all cursor-pointer"
               onClick={() => setSelectedViz('timeline')}>
            <h3 className="text-xl font-bold text-yellow-400 mb-4">📅 Zeitleiste</h3>
            <p className="text-white/70">Historische Entwicklung der Macrobius-Rezeption</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/20 transition-all cursor-pointer"
               onClick={() => setSelectedViz('network')}>
            <h3 className="text-xl font-bold text-yellow-400 mb-4">🕸️ Charakternetzwerk</h3>
            <p className="text-white/70">Beziehungen zwischen den Gesprächspartnern</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/20 transition-all cursor-pointer"
               onClick={() => setSelectedViz('heatmap')}>
            <h3 className="text-xl font-bold text-yellow-400 mb-4">🗺️ Thematische Heatmap</h3>
            <p className="text-white/70">Verteilung der Themen in den Texten</p>
          </div>
        </div>

        {selectedViz && (
          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              {selectedViz === 'timeline' && 'Historische Zeitleiste'}
              {selectedViz === 'network' && 'Charakternetzwerk'}
              {selectedViz === 'heatmap' && 'Thematische Verteilung'}
            </h3>
            <div className="text-white/70">
              <p>🚧 Diese Visualisierung wird in der nächsten Version implementiert.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default VisualizationsSection;
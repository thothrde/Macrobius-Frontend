import React, { useState } from 'react';

interface CosmosSectionProps {
  isActive: boolean;
  t: (key: string) => string;
}

interface CelestialBody {
  id: string;
  name: string;
  radius: number;
  color: string;
  description: string;
  distance: number;
}

function CosmosSection({ isActive, t }: CosmosSectionProps) {
  const [selectedBody, setSelectedBody] = useState<CelestialBody | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [showOrbits, setShowOrbits] = useState(true);

  const celestialBodies: CelestialBody[] = [
    {
      id: 'saturn',
      name: 'Saturn - Äußerste Sphäre',
      radius: 8,
      color: '#8B7355',
      description: 'Die äußerste und langsamste Sphäre, Symbol für Zeit und Weisheit.',
      distance: 180
    },
    {
      id: 'jupiter',
      name: 'Jupiter - Königssphäre',
      radius: 12,
      color: '#D4AF37',
      description: 'Die Sphäre der Könige und Herrscher, Symbol für Gerechtigkeit.',
      distance: 150
    },
    {
      id: 'mars',
      name: 'Mars - Kriegersphäre',
      radius: 6,
      color: '#CD5C5C',
      description: 'Die Sphäre des Krieges und der Tapferkeit.',
      distance: 120
    },
    {
      id: 'sun',
      name: 'Sonne - Zentrale Sphäre',
      radius: 20,
      color: '#FFD700',
      description: 'Das zentrale Licht, das alle anderen Körper erleuchtet.',
      distance: 100
    },
    {
      id: 'venus',
      name: 'Venus - Liebessphäre',
      radius: 8,
      color: '#FF69B4',
      description: 'Die Sphäre der Liebe und Schönheit.',
      distance: 80
    },
    {
      id: 'mercury',
      name: 'Merkur - Botensphäre',
      radius: 5,
      color: '#C0C0C0',
      description: 'Die schnellste Sphäre, Bote der Götter.',
      distance: 60
    },
    {
      id: 'moon',
      name: 'Mond - Irdische Sphäre',
      radius: 8,
      color: '#F5F5DC',
      description: 'Die nächste Sphäre zur Erde, Grenze zwischen Himmel und Erde.',
      distance: 40
    }
  ];

  if (!isActive) return null;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-yellow-400 mb-8">
            Macrobius' Kosmos
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Die Struktur des Universums nach dem Kommentar zum Somnium Scipionis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cosmos Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-yellow-100 flex items-center">
                  ⭐ Orbium Caelestium
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsRotating(!isRotating)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      isRotating 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {isRotating ? '⏸️' : '▶️'} Rotieren
                  </button>
                  <button
                    onClick={() => setShowOrbits(!showOrbits)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      showOrbits 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    🌌 Orbits
                  </button>
                </div>
              </div>

              {/* Celestial Spheres Visualization */}
              <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-black rounded-xl p-8 min-h-96 overflow-hidden">
                {/* Stars Background */}
                <div className="absolute inset-0">
                  {[...Array(50)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Central Coordinate System */}
                <div className="relative w-full h-96 flex items-center justify-center">
                  {/* Earth at Center */}
                  <div 
                    className="absolute w-6 h-6 bg-blue-500 rounded-full border-2 border-green-400 z-20 cursor-pointer hover:scale-110 transition-transform flex items-center justify-center"
                    title="Erde - Zentrum"
                  >
                    🌍
                  </div>

                  {/* Orbital Spheres */}
                  {celestialBodies.map((body, index) => {
                    const angle = (index * 45) % 360;
                    const x = Math.cos((angle * Math.PI) / 180) * (body.distance * 0.8);
                    const y = Math.sin((angle * Math.PI) / 180) * (body.distance * 0.6);

                    return (
                      <div key={body.id}>
                        {/* Orbit Ring */}
                        {showOrbits && (
                          <div 
                            className="absolute border border-gray-400 border-opacity-30 rounded-full"
                            style={{
                              width: `${body.distance * 1.6}px`,
                              height: `${body.distance * 1.2}px`,
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)'
                            }}
                          />
                        )}

                        {/* Planet/Celestial Body */}
                        <div
                          className={`absolute rounded-full cursor-pointer transition-all duration-300 hover:scale-125 z-10 ${
                            selectedBody?.id === body.id ? 'ring-2 ring-white ring-opacity-50' : ''
                          } ${isRotating ? 'animate-pulse' : ''}`}
                          style={{
                            width: `${body.radius}px`,
                            height: `${body.radius}px`,
                            backgroundColor: body.color,
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                            transform: 'translate(-50%, -50%)',
                            boxShadow: `0 0 ${body.radius}px ${body.color}40`
                          }}
                          onClick={() => setSelectedBody(body)}
                          title={body.name}
                        />
                      </div>
                    )
                  })}
                </div>

                {/* Control Hint */}
                <div className="absolute bottom-4 right-4 text-white text-xs opacity-70">
                  Klicken Sie auf die Planeten für Details
                </div>
              </div>

              {/* Selected Body Information */}
              {selectedBody && (
                <div className="mt-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-lg mb-2 flex items-center text-yellow-100">
                        <div 
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: selectedBody.color }}
                        />
                        {selectedBody.name}
                      </h4>
                      <p className="text-white/80">{selectedBody.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Concepts Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-yellow-100 mb-6 flex items-center">
                ⭐ Kosmische Konzepte
              </h3>
              <div className="space-y-4">
                <div className="border-b border-white/20 pb-4">
                  <h4 className="font-semibold text-yellow-200 mb-2">🎵 Sphärenmusik</h4>
                  <p className="text-sm text-white/70">Die Bewegung der Planeten erzeugt eine himmlische Harmonie.</p>
                </div>
                <div className="border-b border-white/20 pb-4">
                  <h4 className="font-semibold text-yellow-200 mb-2">👻 Seelenwanderung</h4>
                  <p className="text-sm text-white/70">Seelen steigen durch die Sphären auf und ab.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-200 mb-2">🌍 Geozentrisches System</h4>
                  <p className="text-sm text-white/70">Die Erde steht im Zentrum des Universums.</p>
                </div>
              </div>
            </div>

            {/* Celestial Bodies List */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <h4 className="font-bold text-yellow-100 mb-4">Die Himmlischen Sphären</h4>
              <div className="space-y-2">
                {celestialBodies.map((body) => (
                  <div 
                    key={body.id}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                      selectedBody?.id === body.id ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedBody(body)}
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: body.color }}
                      />
                      <span className="text-sm font-medium text-white">{body.name.split(' - ')[0]}</span>
                    </div>
                    <span className="text-xs text-white/60">{body.distance}px</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CosmosSection;
import React, { useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { 
  Stars, 
  Sun, 
  Moon, 
  Circle,
  RotateCw,
  Orbit,
  Globe,
  Eye
} from 'lucide-react'

interface CosmosSectionProps {
  language: 'DE' | 'EN' | 'LA'
}

const translations = {
  DE: {
    title: 'Macrobius\' Kosmos',
    subtitle: 'Die Struktur Des Universums Nach Dem Kommentar Zum Somnium Scipionis',
    description: 'Entdecke Macrobius\' Verständnis der himmlischen Sphären, der Planetenbewegungen und der kosmischen Harmonie.',
    spheres: {
      title: 'Die Himmlischen Sphären',
      saturn: 'Saturn - Äußerste Sphäre',
      jupiter: 'Jupiter - Königssphäre',
      mars: 'Mars - Kriegersphäre',
      sun: 'Sonne - Zentrale Sphäre',
      venus: 'Venus - Liebessphäre',
      mercury: 'Merkur - Botensphäre',
      moon: 'Mond - Irdische Sphäre',
      earth: 'Erde - Zentrum'
    },
    concepts: {
      harmony: 'Sphärenmusik',
      harmonyDesc: 'Die Bewegung der Planeten erzeugt eine himmlische Harmonie.',
      souls: 'Seelenwanderung',
      soulsDesc: 'Seelen steigen durch die Sphären auf und ab.',
      geocentric: 'Geozentrisches System',
      geocentricDesc: 'Die Erde steht im Zentrum des Universums.'
    },
    controls: {
      rotate: 'Rotieren',
      zoom: 'Zoomen',
      info: 'Information',
      reset: 'Zurücksetzen'
    },
    details: 'Details Anzeigen'
  },
  EN: {
    title: 'Macrobius\' Cosmos',
    subtitle: 'The Structure Of The Universe According To The Commentary On Scipio\'s Dream',
    description: 'Discover Macrobius\' understanding of celestial spheres, planetary movements, and cosmic harmony.',
    spheres: {
      title: 'The Celestial Spheres',
      saturn: 'Saturn - Outermost Sphere',
      jupiter: 'Jupiter - Royal Sphere',
      mars: 'Mars - Warrior Sphere',
      sun: 'Sun - Central Sphere',
      venus: 'Venus - Love Sphere',
      mercury: 'Mercury - Messenger Sphere',
      moon: 'Moon - Earthly Sphere',
      earth: 'Earth - Center'
    },
    concepts: {
      harmony: 'Music of the Spheres',
      harmonyDesc: 'The movement of planets creates celestial harmony.',
      souls: 'Journey of Souls',
      soulsDesc: 'Souls ascend and descend through the spheres.',
      geocentric: 'Geocentric System',
      geocentricDesc: 'Earth stands at the center of the universe.'
    },
    controls: {
      rotate: 'Rotate',
      zoom: 'Zoom',
      info: 'Information',
      reset: 'Reset'
    },
    details: 'Show Details'
  },
  LA: {
    title: 'Cosmos Macrobii',
    subtitle: 'Structura Universi Secundum Commentarium In Somnium Scipionis',
    description: 'Intellectum Macrobii sphaerarum caelestium, motuum planetarum, et harmoniae cosmicae disce.',
    spheres: {
      title: 'Sphaerae Caelestes',
      saturn: 'Saturnus - Sphaera Extrema',
      jupiter: 'Iuppiter - Sphaera Regalis',
      mars: 'Mars - Sphaera Bellicosa',
      sun: 'Sol - Sphaera Centralis',
      venus: 'Venus - Sphaera Amoris',
      mercury: 'Mercurius - Sphaera Nuntii',
      moon: 'Luna - Sphaera Terrestris',
      earth: 'Terra - Centrum'
    },
    concepts: {
      harmony: 'Musica Sphaerarum',
      harmonyDesc: 'Motus planetarum harmoniam caelestem creat.',
      souls: 'Iter Animarum',
      soulsDesc: 'Animae per sphaeras ascendunt et descendunt.',
      geocentric: 'Systema Geocentricum',
      geocentricDesc: 'Terra in centro universistat.'
    },
    controls: {
      rotate: 'Rotare',
      zoom: 'Amplificare',
      info: 'Informatio',
      reset: 'Restituere'
    },
    details: 'Particularia Monstrare'
  }
}

interface CelestialBody {
  id: string
  name: string
  radius: number
  color: string
  description: string
  distance: number
}

function CosmosSection({ language }: CosmosSectionProps) {
  const [selectedBody, setSelectedBody] = useState<CelestialBody | null>(null)
  const [isRotating, setIsRotating] = useState(false)
  const [showOrbits, setShowOrbits] = useState(true)
  
  const t = translations[language]

  const celestialBodies: CelestialBody[] = [
    {
      id: 'saturn',
      name: t.spheres.saturn,
      radius: 8,
      color: '#8B7355',
      description: 'Die äußerste und langsamste Sphäre, Symbol für Zeit und Weisheit.',
      distance: 180
    },
    {
      id: 'jupiter',
      name: t.spheres.jupiter,
      radius: 12,
      color: '#D4AF37',
      description: 'Die Sphäre der Könige und Herrscher, Symbol für Gerechtigkeit.',
      distance: 150
    },
    {
      id: 'mars',
      name: t.spheres.mars,
      radius: 6,
      color: '#CD5C5C',
      description: 'Die Sphäre des Krieges und der Tapferkeit.',
      distance: 120
    },
    {
      id: 'sun',
      name: t.spheres.sun,
      radius: 20,
      color: '#FFD700',
      description: 'Das zentrale Licht, das alle anderen Körper erleuchtet.',
      distance: 100
    },
    {
      id: 'venus',
      name: t.spheres.venus,
      radius: 8,
      color: '#FF69B4',
      description: 'Die Sphäre der Liebe und Schönheit.',
      distance: 80
    },
    {
      id: 'mercury',
      name: t.spheres.mercury,
      radius: 5,
      color: '#C0C0C0',
      description: 'Die schnellste Sphäre, Bote der Götter.',
      distance: 60
    },
    {
      id: 'moon',
      name: t.spheres.moon,
      radius: 8,
      color: '#F5F5DC',
      description: 'Die nächste Sphäre zur Erde, Grenze zwischen Himmel und Erde.',
      distance: 40
    }
  ]

  const concepts = [
    {
      title: t.concepts.harmony,
      description: t.concepts.harmonyDesc,
      icon: Stars
    },
    {
      title: t.concepts.souls,
      description: t.concepts.soulsDesc,
      icon: Circle
    },
    {
      title: t.concepts.geocentric,
      description: t.concepts.geocentricDesc,
      icon: Globe
    }
  ]

  return (
    <section id="cosmos" className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            {t.subtitle}
          </p>
          <p className="text-gray-700 max-w-4xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Cosmos Visualization */}
            <div className="xl:col-span-2">
              <Card className="p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Stars className="h-6 w-6 mr-2 text-purple-500" />
                    Orbium Caelestium
                  </h3>
                  <div className="flex space-x-2">
                    <Button
                      variant={isRotating ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsRotating(!isRotating)}
                      className={isRotating ? 'bg-purple-500' : ''}
                    >
                      <RotateCw className={`h-4 w-4 mr-1 ${isRotating ? 'animate-spin' : ''}`} />
                      {t.controls.rotate}
                    </Button>
                    <Button
                      variant={showOrbits ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowOrbits(!showOrbits)}
                      className={showOrbits ? 'bg-purple-500' : ''}
                    >
                      <Orbit className="h-4 w-4 mr-1" />
                      Orbits
                    </Button>
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
                          animationDelay: `${Math.random() * 3}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* Central Coordinate System */}
                  <div className="relative w-full h-96 flex items-center justify-center">
                    {/* Earth at Center */}
                    <div 
                      className="absolute w-6 h-6 bg-blue-500 rounded-full border-2 border-green-400 z-20 cursor-pointer hover:scale-110 transition-transform"
                      title={t.spheres.earth}
                    >
                      <Globe className="w-3 h-3 text-white m-0.5" />
                    </div>

                    {/* Orbital Spheres */}
                    {celestialBodies.map((body, index) => {
                      const angle = (index * 45 + (isRotating ? 0 : 0)) % 360
                      const x = Math.cos((angle * Math.PI) / 180) * (body.distance * 0.8)
                      const y = Math.sin((angle * Math.PI) / 180) * (body.distance * 0.6)

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
                          >
                            {body.id === 'sun' && (
                              <Sun className="w-4 h-4 text-orange-100 m-2" />
                            )}
                            {body.id === 'moon' && (
                              <Moon className="w-3 h-3 text-gray-600 m-1" />
                            )}
                          </div>
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
                  <Card className="mt-4 p-4 border-l-4" style={{ borderLeftColor: selectedBody.color }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-lg mb-2 flex items-center">
                          <div 
                            className="w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: selectedBody.color }}
                          />
                          {selectedBody.name}
                        </h4>
                        <p className="text-gray-600">{selectedBody.description}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        {t.details}
                      </Button>
                    </div>
                  </Card>
                )}
              </Card>
            </div>

            {/* Concepts Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Stars className="h-5 w-5 mr-2 text-purple-500" />
                  Kosmische Konzepte
                </h3>
                <div className="space-y-4">
                  {concepts.map((concept, index) => {
                    const Icon = concept.icon
                    return (
                      <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                            <Icon className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">{concept.title}</h4>
                            <p className="text-sm text-gray-600">{concept.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>

              {/* Celestial Bodies List */}
              <Card className="p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4">{t.spheres.title}</h4>
                <div className="space-y-2">
                  {celestialBodies.map((body) => (
                    <div 
                      key={body.id}
                      className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                        selectedBody?.id === body.id ? 'bg-purple-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedBody(body)}
                    >
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: body.color }}
                        />
                        <span className="text-sm font-medium">{body.name.split(' - ')[0]}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {body.distance}px
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Export both named and default for compatibility
export { CosmosSection };
export default CosmosSection;
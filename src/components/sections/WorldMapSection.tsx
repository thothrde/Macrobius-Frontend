import React, { useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { 
  Map, 
  Globe, 
  MapPin, 
  Info, 
  Navigation,
  Compass,
  Mountain,
  Waves
} from 'lucide-react'

interface WorldMapSectionProps {
  language: 'DE' | 'EN' | 'LA'
}

const translations = {
  DE: {
    title: 'Macrobius\' Weltkarte',
    subtitle: 'Erkunde Die Antike Geographie Und Kosmographie',
    description: 'Entdecke Macrobius\' Verständnis der Welt durch seine geografischen Beschreibungen und kosmographischen Konzepte.',
    regions: {
      title: 'Bekannte Regionen',
      europe: 'Europa',
      asia: 'Asien',
      africa: 'Afrika',
      oceanus: 'Okeanos'
    },
    features: {
      climate: 'Klimazonen',
      inhabited: 'Bewohnte Gebiete',
      unknown: 'Unbekannte Länder',
      sacred: 'Heilige Orte'
    },
    info: {
      spherical: 'Sphärische Erde',
      sphericalDesc: 'Macrobius beschrieb die Erde als Kugel, geteilt in klimatische Zonen.',
      zones: 'Fünf Zonen',
      zonesDesc: 'Zwei polare, zwei gemäßigte und eine äquatoriale Zone.',
      antipodes: 'Antipoden',
      antipodesDesc: 'Theorie über Bewohner auf der gegenüberliegenden Seite der Erde.'
    },
    explore: 'Region Erkunden',
    learnMore: 'Mehr Erfahren'
  },
  EN: {
    title: 'Macrobius\' World Map',
    subtitle: 'Explore Ancient Geography And Cosmography',
    description: 'Discover Macrobius\' understanding of the world through his geographical descriptions and cosmographical concepts.',
    regions: {
      title: 'Known Regions',
      europe: 'Europe',
      asia: 'Asia',
      africa: 'Africa',
      oceanus: 'Oceanus'
    },
    features: {
      climate: 'Climate Zones',
      inhabited: 'Inhabited Areas',
      unknown: 'Unknown Lands',
      sacred: 'Sacred Places'
    },
    info: {
      spherical: 'Spherical Earth',
      sphericalDesc: 'Macrobius described the Earth as a sphere, divided into climatic zones.',
      zones: 'Five Zones',
      zonesDesc: 'Two polar, two temperate, and one equatorial zone.',
      antipodes: 'Antipodes',
      antipodesDesc: 'Theory about inhabitants on the opposite side of the Earth.'
    },
    explore: 'Explore Region',
    learnMore: 'Learn More'
  },
  LA: {
    title: 'Mappa Mundi Macrobii',
    subtitle: 'Geographiam Antiquam Et Cosmographiam Explora',
    description: 'Intellectum Macrobii mundi per descriptiones geographicas et conceptus cosmographicos disce.',
    regions: {
      title: 'Regiones Notae',
      europe: 'Europa',
      asia: 'Asia',
      africa: 'Africa',
      oceanus: 'Oceanus'
    },
    features: {
      climate: 'Zonae Climaticae',
      inhabited: 'Loca Habitata',
      unknown: 'Terrae Ignotae',
      sacred: 'Loca Sacra'
    },
    info: {
      spherical: 'Terra Sphaerica',
      sphericalDesc: 'Macrobius Terram ut sphaeram descripsit, in zonas climaticas divisam.',
      zones: 'Quinque Zonae',
      zonesDesc: 'Duae polares, duae temperatae, et una aequatorialis zona.',
      antipodes: 'Antipodes',
      antipodesDesc: 'Theoria de habitatoribus in opposita parte Terrae.'
    },
    explore: 'Regionem Explorare',
    learnMore: 'Plura Discere'
  }
}

interface MapRegion {
  id: string
  name: string
  description: string
  color: string
  coordinates: { x: number; y: number }
}

function WorldMapSection({ language }: WorldMapSectionProps) {
  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(null)
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  
  const t = translations[language]

  const regions: MapRegion[] = [
    {
      id: 'europe',
      name: t.regions.europe,
      description: 'Die nördliche bewohnte Region mit gemäßigtem Klima.',
      color: '#3B82F6',
      coordinates: { x: 45, y: 35 }
    },
    {
      id: 'asia',
      name: t.regions.asia,
      description: 'Die große östliche Landmasse mit verschiedenen Klimazonen.',
      color: '#10B981',
      coordinates: { x: 65, y: 35 }
    },
    {
      id: 'africa',
      name: t.regions.africa,
      description: 'Die südliche Region, teilweise durch die heiße Zone getrennt.',
      color: '#F59E0B',
      coordinates: { x: 50, y: 55 }
    },
    {
      id: 'oceanus',
      name: t.regions.oceanus,
      description: 'Der große Ozean, der die bewohnte Welt umgibt.',
      color: '#06B6D4',
      coordinates: { x: 50, y: 50 }
    }
  ]

  const features = [
    { id: 'climate', name: t.features.climate, icon: Mountain, color: 'bg-blue-500' },
    { id: 'inhabited', name: t.features.inhabited, icon: MapPin, color: 'bg-green-500' },
    { id: 'unknown', name: t.features.unknown, icon: Compass, color: 'bg-gray-500' },
    { id: 'sacred', name: t.features.sacred, icon: Navigation, color: 'bg-purple-500' }
  ]

  const concepts = [
    {
      title: t.info.spherical,
      description: t.info.sphericalDesc,
      icon: Globe
    },
    {
      title: t.info.zones,
      description: t.info.zonesDesc,
      icon: Waves
    },
    {
      title: t.info.antipodes,
      description: t.info.antipodesDesc,
      icon: Navigation
    }
  ]

  return (
    <section id="worldmap" className="py-20 bg-gradient-to-b from-blue-50 to-white">
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
            {/* Interactive Map */}
            <div className="xl:col-span-2">
              <Card className="p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Map className="h-6 w-6 mr-2 text-blue-500" />
                    Orbis Terrarum
                  </h3>
                  <div className="flex space-x-2">
                    {features.map((feature) => {
                      const Icon = feature.icon
                      return (
                        <Button
                          key={feature.id}
                          variant={activeFeature === feature.id ? "default" : "outline"}
                          size="sm"
                          className={`${activeFeature === feature.id ? feature.color : ''}`}
                          onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                        >
                          <Icon className="h-4 w-4 mr-1" />
                          {feature.name}
                        </Button>
                      )
                    })}
                  </div>
                </div>

                {/* Stylized World Map */}
                <div className="relative bg-gradient-to-b from-blue-100 to-blue-200 rounded-xl p-8 min-h-96">
                  {/* Ocean Background */}
                  <div className="absolute inset-4 bg-gradient-to-br from-blue-300 to-blue-400 rounded-lg opacity-30" />
                  
                  {/* Continents */}
                  <svg viewBox="0 0 100 70" className="w-full h-full relative z-10">
                    {/* Europe */}
                    <path
                      d="M35 25 Q45 20 55 25 Q60 30 55 35 Q45 40 35 35 Q30 30 35 25"
                      fill={selectedRegion?.id === 'europe' ? '#2563EB' : '#4ADE80'}
                      stroke="#1F2937"
                      strokeWidth="0.5"
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedRegion(regions.find(r => r.id === 'europe') || null)}
                    />
                    
                    {/* Asia */}
                    <path
                      d="M55 25 Q75 20 85 30 Q80 40 70 35 Q60 30 55 25"
                      fill={selectedRegion?.id === 'asia' ? '#2563EB' : '#10B981'}
                      stroke="#1F2937"
                      strokeWidth="0.5"
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedRegion(regions.find(r => r.id === 'asia') || null)}
                    />
                    
                    {/* Africa */}
                    <path
                      d="M40 35 Q50 30 60 40 Q55 55 45 50 Q35 45 40 35"
                      fill={selectedRegion?.id === 'africa' ? '#2563EB' : '#F59E0B'}
                      stroke="#1F2937"
                      strokeWidth="0.5"
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedRegion(regions.find(r => r.id === 'africa') || null)}
                    />

                    {/* Climate Zone Lines */}
                    {activeFeature === 'climate' && (
                      <g>
                        <line x1="0" y1="15" x2="100" y2="15" stroke="#EF4444" strokeWidth="1" strokeDasharray="2,2" />
                        <line x1="0" y1="30" x2="100" y2="30" stroke="#22C55E" strokeWidth="1" strokeDasharray="2,2" />
                        <line x1="0" y1="45" x2="100" y2="45" stroke="#EF4444" strokeWidth="1" strokeDasharray="2,2" />
                        <line x1="0" y1="55" x2="100" y2="55" stroke="#EF4444" strokeWidth="1" strokeDasharray="2,2" />
                      </g>
                    )}

                    {/* Region Markers */}
                    {regions.map((region) => (
                      <g key={region.id}>
                        <circle
                          cx={region.coordinates.x}
                          cy={region.coordinates.y}
                          r="2"
                          fill={region.color}
                          className="cursor-pointer hover:r-3 transition-all"
                          onClick={() => setSelectedRegion(region)}
                        />
                        {selectedRegion?.id === region.id && (
                          <circle
                            cx={region.coordinates.x}
                            cy={region.coordinates.y}
                            r="4"
                            fill="none"
                            stroke={region.color}
                            strokeWidth="2"
                            className="animate-ping"
                          />
                        )}
                      </g>
                    ))}
                  </svg>

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-2">{t.regions.title}</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {regions.slice(0, 3).map((region) => (
                        <div key={region.id} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: region.color }}
                          />
                          <span>{region.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selected Region Info */}
                {selectedRegion && (
                  <Card className="mt-4 p-4 border-l-4" style={{ borderLeftColor: selectedRegion.color }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-lg mb-2">{selectedRegion.name}</h4>
                        <p className="text-gray-600">{selectedRegion.description}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        {t.explore}
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
                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                  Macrobius' Konzepte
                </h3>
                <div className="space-y-4">
                  {concepts.map((concept, index) => {
                    const Icon = concept.icon
                    return (
                      <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                            <Icon className="h-4 w-4 text-blue-600" />
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

              {/* Quick Stats */}
              <Card className="p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4">Geographische Daten</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Klimazonen</span>
                    <Badge variant="secondary">5</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Bekannte Kontinente</span>
                    <Badge variant="secondary">3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Erdumfang</span>
                    <Badge variant="outline">~250k Stadien</Badge>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  {t.learnMore}
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Export both named and default for compatibility
export { WorldMapSection };
export default WorldMapSection;
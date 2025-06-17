import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Globe, Clock, BookOpen, Search, ArrowUp, ArrowDown, Music, Eye, Brain } from 'lucide-react';
import Image from 'next/image';

interface CosmosSectionProps {
  isActive: boolean;
  t: (key: string) => string;
  language?: 'DE' | 'EN' | 'LA';
}

interface CelestialSphere {
  id: string;
  name: string;
  latinName: string;
  radius: number;
  color: string;
  culturalSignificance: string;
  macrobiusQuote: string;
  translation: string;
  distance: number;
  rotationSpeed: number;
  sound?: string;
  culturalContext: string;
  tychoBraheConnection?: string;
  symbol: string;
}

interface CosmologicalConcept {
  id: string;
  title: string;
  description: string;
  macrobiusText: string;
  modernConnection: string;
  tychoRelevance?: string;
}

function EnhancedCosmosSection({ isActive, t, language = 'DE' }: CosmosSectionProps) {
  const [selectedSphere, setSelectedSphere] = useState<CelestialSphere | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [showOrbits, setShowOrbits] = useState(true);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [showTychoComparison, setShowTychoComparison] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'intro' | 'spheres' | 'harmony'>('intro');

  // The Nine Celestial Spheres according to Macrobius - ENHANCED with symbols and bigger size
  const celestialSpheres: CelestialSphere[] = [
    {
      id: 'stellatum',
      name: 'Fixsterne',
      latinName: 'Caelum Stellatum',
      radius: 18, // ENHANCED: Bigger planets
      color: '#E6E6FA',
      culturalSignificance: 'Die äußerste Sphäre der Fixsterne - Symbol für die ewige Ordnung',
      macrobiusQuote: 'Stellarum caelum quod vocamus apteron, id est sine pennis',
      translation: 'Der Sternenhimmel, den wir "ohne Flügel" nennen',
      distance: 220,
      rotationSpeed: 0.1,
      sound: 'Tiefster Ton',
      culturalContext: 'Für Macrobius repräsentierte die Fixsternsphäre die unveränderliche göttliche Ordnung, die als Grundlage aller kosmischen Harmonie diente. Diese Vorstellung prägte das mittelalterliche Weltbild nachhaltig.',
      tychoBraheConnection: 'Tycho Brahe revolutionierte diese Vorstellung durch seine präzisen Beobachtungen der "neuen Sterne" (Supernovae), die zeigten, dass selbst die Fixsternsphäre Veränderungen unterworfen ist.',
      symbol: '✨' // ENHANCED: Added symbols
    },
    {
      id: 'saturnus',
      name: 'Saturn',
      latinName: 'Stella Saturni',
      radius: 16,
      color: '#8B7355',
      culturalSignificance: 'Planet der Zeit und Weisheit - Beschützer der Saturnalien',
      macrobiusQuote: 'Saturnus temporum pater et sapientiae custos',
      translation: 'Saturn, Vater der Zeiten und Hüter der Weisheit',
      distance: 190,
      rotationSpeed: 0.2,
      sound: 'Sehr tiefer Ton',
      culturalContext: 'Saturn war nicht nur astronomisches Objekt, sondern kultureller Mittelpunkt der römischen Festkultur. Die Saturnalien feierten die mythische Goldene Zeit unter Saturns Herrschaft.',
      tychoBraheConnection: 'Tychos Beobachtungen Saturns zeigten erstmals seine wahre Umlaufzeit von etwa 29 Jahren, weit genauer als antike Schätzungen.',
      symbol: '♄'
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      latinName: 'Stella Iovis',
      radius: 17,
      color: '#D4AF37',
      culturalSignificance: 'König der Planeten - Symbol für Gerechtigkeit und Herrschaft',
      macrobiusQuote: 'Iuppiter rex planetarum, iustitiae moderator',
      translation: 'Jupiter, König der Planeten, Lenker der Gerechtigkeit',
      distance: 160,
      rotationSpeed: 0.3,
      sound: 'Tiefer Ton',
      culturalContext: 'Jupiter verkörperte die ideale Herrschaft - gerecht, weise und dem Gemeinwohl verpflichtet. Römische Kaiser sahen sich als irdische Stellvertreter dieser kosmischen Ordnung.',
      tychoBraheConnection: 'Tycho dokumentierte Jupiters Oppositionen mit bis dahin unerreichter Genauigkeit und legte den Grundstein für Keplers spätere Bahnberechnungen.',
      symbol: '♃'
    },
    {
      id: 'mars',
      name: 'Mars',
      latinName: 'Stella Martis',
      radius: 14,
      color: '#CD5C5C',
      culturalSignificance: 'Kriegsplanet - Symbol für Mut und militärische Tugend',
      macrobiusQuote: 'Mars virtutis et belli fortissimus dux',
      translation: 'Mars, stärkster Führer der Tapferkeit und des Krieges',
      distance: 130,
      rotationSpeed: 0.4,
      sound: 'Mittlerer Ton',
      culturalContext: 'Mars war mehr als Kriegsgott - er symbolisierte die disziplinierte Kraft, die Zivilisation erst ermöglicht. Römische Militärtugend (virtus) war kosmisch begründet.',
      tychoBraheConnection: 'Mars\'s unregelmäßige Bewegung frustrierte antike Astronomen. Tychos präzise Mars-Beobachtungen ermöglichten Kepler die Entdeckung elliptischer Bahnen.',
      symbol: '♂'
    },
    {
      id: 'sol',
      name: 'Sonne',
      latinName: 'Sol Invictus',
      radius: 22, // ENHANCED: Biggest for the sun
      color: '#FFD700',
      culturalSignificance: 'Das zentrale Licht - Quelle aller Erkenntnis und Wahrheit',
      macrobiusQuote: 'Sol est mens mundi et temperatio, lux et origo luminis',
      translation: 'Die Sonne ist der Geist der Welt und ihre Mäßigung, Licht und Ursprung des Lichts',
      distance: 100,
      rotationSpeed: 0.5,
      sound: 'Zentraler Ton',
      culturalContext: 'Für Macrobius war die Sonne nicht nur physisches Zentrum, sondern metaphysischer Ursprung aller Erkenntnis. Sol Invictus verkörperte die aufklärerische Kraft des Wissens.',
      tychoBraheConnection: 'Obwohl Tycho das geozentrische System beibehielt, erkannte er die Sonne als wahres Zentrum der Planetenbewegungen - ein wichtiger Schritt zur heliozentrischen Revolution.',
      symbol: '☉'
    },
    {
      id: 'venus',
      name: 'Venus',
      latinName: 'Stella Veneris',
      radius: 15,
      color: '#FF69B4',
      culturalSignificance: 'Morgenstern und Abendstern - Symbol für Schönheit und Harmonie',
      macrobiusQuote: 'Venus pulchritudinis et concordiae stella',
      translation: 'Venus, Stern der Schönheit und Eintracht',
      distance: 80,
      rotationSpeed: 0.6,
      sound: 'Hoher Ton',
      culturalContext: 'Venus als Doppelstern (Morgen-/Abendstern) symbolisierte die Einheit der Gegensätze - ein zentrales Thema neuplatonischer Philosophie, die Macrobius stark beeinflusste.',
      tychoBraheConnection: 'Tychos Venus-Beobachtungen zeigten ihre Phasen, ein starker Hinweis auf das heliozentrische System, den aber erst Galilei voll ausnutzte.',
      symbol: '♀'
    },
    {
      id: 'mercurius',
      name: 'Merkur',
      latinName: 'Stella Mercurii',
      radius: 12,
      color: '#C0C0C0',
      culturalSignificance: 'Götterbote - Symbol für Kommunikation und Handel',
      macrobiusQuote: 'Mercurius nuntius deorum, eloquentiae magister',
      translation: 'Merkur, Bote der Götter, Meister der Beredsamkeit',
      distance: 60,
      rotationSpeed: 0.8,
      sound: 'Sehr hoher Ton',
      culturalContext: 'Merkur verkörperte die Geschwindigkeit des Geistes und die Kraft der Sprache - essentiell für die römische Rhetorikkultur, die Bildung und Politik durchdrang.',
      tychoBraheConnection: 'Merkurs schwer beobachtbare Bahn stellte Tycho vor große Herausforderungen, aber seine Daten wurden später fundamental für Keplers Gesetze.',
      symbol: '☿'
    },
    {
      id: 'luna',
      name: 'Mond',
      latinName: 'Luna',
      radius: 14,
      color: '#F5F5DC',
      culturalSignificance: 'Grenze zwischen Himmlischem und Irdischem',
      macrobiusQuote: 'Luna confinium caeli et terrae, mutabilitatis imago',
      translation: 'Der Mond, Grenze zwischen Himmel und Erde, Bild der Veränderlichkeit',
      distance: 40,
      rotationSpeed: 1.0,
      sound: 'Höchster Ton',
      culturalContext: 'Die Mondsphäre markierte für Macrobius die Grenze zwischen der perfekten Himmelswelt und der vergänglichen Erdenwelt - eine Vorstellung, die das mittelalterliche Denken prägte.',
      tychoBraheConnection: 'Tychos detaillierte Mondbeobachtungen und Finsternisvorhersagen zeigten die mechanische Präzision himmlischer Bewegungen.',
      symbol: '☽'
    }
  ];

  const cosmologicalConcepts: CosmologicalConcept[] = [
    {
      id: 'musica_universalis',
      title: 'Musica Universalis - Die Sphärenharmonie',
      description: 'Macrobius beschreibt, wie die Planetenbewegungen eine kosmische Musik erzeugen, die nur die reine Seele hören kann.',
      macrobiusText: '"Ex his septem orbibus fit illa caelestis modulatio, quam musicam mundanam vocamus"',
      modernConnection: 'Moderne Physik bestätigt Schwingungen im Kosmos: von Gravitationswellen bis zu Pulsaren - das Universum "singt" tatsächlich.',
      tychoRelevance: 'Tychos präzise Messungen planetarischer Zyklen legten den Grundstein für die mathematische Beschreibung kosmischer "Harmonien".'
    },
    {
      id: 'anima_mundi',
      title: 'Anima Mundi - Die Weltseele',
      description: 'Die Seele durchdringt nach Macrobius den gesamten Kosmos und schafft die Verbindung zwischen allen Sphären.',
      macrobiusText: '"Anima mundi per omnes caelestis machinae partes fusa atque diffusa"',
      modernConnection: 'Ähnlich wie dunkle Energie das Universum durchdringt und seine Struktur bestimmt.',
      tychoRelevance: 'Tycho erkannte die unsichtbaren Kräfte, die Planetenbahnen bestimmen - ein Schritt zur Gravitationstheorie.'
    },
    {
      id: 'descensus_ascensus',
      title: 'Descensus et Ascensus Animarum',
      description: 'Seelen steigen durch die Sphären ab zur Geburt und kehren nach dem Tod zu ihrer himmlischen Heimat zurück.',
      macrobiusText: '"Animae per septem caelos descendunt et rursum ascendunt"',
      modernConnection: 'Wie Energie in verschiedenen Formen durch das Universum wandert und schließlich zu ihrem Ursprung zurückkehrt.',
      tychoRelevance: 'Tychos Kometenbeobachtungen zeigten, dass auch himmlische Objekte "wandern" - Vorläufer unseres Verständnisses kosmischer Zyklen.'
    }
  ];

  useEffect(() => {
    if (!isActive) return;
    
    const timer1 = setTimeout(() => setAnimationPhase('spheres'), 2000);
    const timer2 = setTimeout(() => setAnimationPhase('harmony'), 5000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* ENHANCED: Background with cosmic themed image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black" />
        {/* ENHANCED: Add Macrobius Universe background image */}
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/Macrobius-universe.jpg" 
            alt="Macrobius Universe"
            fill
            className="object-cover"
            style={{
              filter: 'brightness(0.4) contrast(1.2) hue-rotate(30deg)',
              mixBlendMode: 'overlay'
            }}
          />
        </div>
      </div>
      
      {/* Animated Stellar Background */}
      <div className="absolute inset-0">
        {[...Array(200)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-8xl mx-auto">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-300 mb-6">
            Macrobius' Kosmos
          </h1>
          <h2 className="text-2xl md:text-3xl text-yellow-200 mb-8">
            Die Neun Himmlischen Sphären
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
            Im 5. Jahrhundert nach Christus dokumentierte Macrobius in seinem Kommentar zu Scipios Traum eine 
            kosmologische Vision, die das mittelalterliche Weltbild prägte und tausend Jahre später Tycho Brahe 
            zu revolutionären astronomischen Beobachtungen inspirierte.
          </p>
          
          {/* Cultural Context Introduction */}
          <motion.div
            className="bg-gradient-to-br from-amber-900/20 to-amber-950/20 rounded-xl border border-amber-500/20 p-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-amber-200 mb-4">🏛️ Kultureller Kontext</h3>
            <p className="text-amber-100/90 leading-relaxed">
              Macrobius' Kosmologie war mehr als Astronomie - sie war Kulturphilosophie. Seine neun Sphären 
              repräsentierten nicht nur Himmelskörper, sondern die gesamte Ordnung der spätrömischen Gesellschaft: 
              Von der unveränderlichen Fixsternsphäre (göttliche Ordnung) bis zur wandelbaren Mondsphäre 
              (irdische Vergänglichkeit). Diese Vision überlebte den Untergang Roms und inspirierte mittelalterliche 
              Gelehrte sowie Renaissance-Astronomen wie Tycho Brahe.
            </p>
          </motion.div>
        </motion.div>

        {/* ENHANCED: Better grid layout to prevent sidebar intersection */}
        <div className="grid grid-cols-1 xl:grid-cols-6 gap-8">
          {/* ENHANCED: Reduced left sidebar width and improved spacing */}
          <div className="xl:col-span-1 order-1 xl:order-1 space-y-6">
            <motion.div
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <h3 className="text-lg font-bold text-yellow-100 mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Kosmische Konzepte
              </h3>
              <div className="space-y-3">
                {cosmologicalConcepts.map((concept, index) => (
                  <button
                    key={concept.id}
                    onClick={() => setSelectedConcept(selectedConcept === concept.id ? null : concept.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-300 ${
                      selectedConcept === concept.id
                        ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-100'
                        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <h4 className="font-semibold mb-1 text-xs">{concept.title}</h4>
                    <p className="text-xs opacity-80 leading-relaxed">{concept.description}</p>
                    
                    {selectedConcept === concept.id && (
                      <motion.div
                        className="mt-3 pt-3 border-t border-white/20"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="space-y-2">
                          <div>
                            <h5 className="text-xs font-semibold text-yellow-300 mb-1">Macrobius:</h5>
                            <p className="text-xs italic text-yellow-100">"{concept.macrobiusText}"</p>
                          </div>
                          <div>
                            <h5 className="text-xs font-semibold text-green-300 mb-1">Moderne Verbindung:</h5>
                            <p className="text-xs text-green-100">{concept.modernConnection}</p>
                          </div>
                          {concept.tychoRelevance && (
                            <div>
                              <h5 className="text-xs font-semibold text-blue-300 mb-1">Tycho Brahe:</h5>
                              <p className="text-xs text-blue-100">{concept.tychoRelevance}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ENHANCED: Central visualization with improved spacing */}
          <div className="xl:col-span-4 order-2 xl:order-2">
            <motion.div
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-yellow-100 flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  Orbium Caelestium Harmonia
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsRotating(!isRotating)}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      isRotating 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {isRotating ? <Music className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                    {isRotating ? 'Harmonisiert' : 'Harmonisieren'}
                  </button>
                  <button
                    onClick={() => setShowTychoComparison(!showTychoComparison)}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      showTychoComparison 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Search className="w-4 h-4" />
                    Tycho
                  </button>
                </div>
              </div>

              {/* ENHANCED: Improved celestial visualization with better spacing */}
              <div className="relative bg-gradient-to-br from-indigo-950 via-purple-950 to-black rounded-xl p-8 min-h-[700px] overflow-hidden">
                {/* Cosmic Background Effects */}
                <div className="absolute inset-0">
                  {[...Array(100)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.8 + 0.2,
                      }}
                    />
                  ))}
                </div>

                {/* Earth at Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-full border-2 border-white/50 z-30 flex items-center justify-center text-2xl shadow-lg"
                    animate={{ rotate: isRotating ? 360 : 0 }}
                    transition={{ duration: 20, repeat: isRotating ? Infinity : 0, ease: "linear" }}
                    title="Terra - Zentrum der Welt"
                  >
                    🌍
                  </motion.div>
                </div>

                {/* ENHANCED: Celestial Spheres with symbols and bigger size */}
                {celestialSpheres.map((sphere, index) => {
                  const angle = (index * 40 + (isRotating ? Date.now() * sphere.rotationSpeed * 0.001 : 0)) % 360;
                  // ENHANCED: Better positioning to avoid sidebar overlap
                  const x = Math.cos((angle * Math.PI) / 180) * (sphere.distance * 0.9);
                  const y = Math.sin((angle * Math.PI) / 180) * (sphere.distance * 0.7);

                  return (
                    <div key={sphere.id}>
                      {/* Orbital Path */}
                      {showOrbits && (
                        <motion.div 
                          className="absolute border border-yellow-400/20 rounded-full"
                          style={{
                            width: `${sphere.distance * 1.8}px`,
                            height: `${sphere.distance * 1.4}px`,
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: animationPhase === 'spheres' ? 0.3 : 0 }}
                          transition={{ delay: index * 0.2 }}
                        />
                      )}

                      {/* ENHANCED: Celestial Body with symbol and bigger size */}
                      <motion.div
                        className={`absolute rounded-full cursor-pointer transition-all duration-500 hover:scale-125 z-20 flex items-center justify-center ${
                          selectedSphere?.id === sphere.id ? 'ring-4 ring-white/50 ring-offset-2 ring-offset-black' : ''
                        }`}
                        style={{
                          width: `${sphere.radius}px`,
                          height: `${sphere.radius}px`,
                          backgroundColor: sphere.color,
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: 'translate(-50%, -50%)',
                          boxShadow: `0 0 ${sphere.radius * 2}px ${sphere.color}60, inset 0 0 ${sphere.radius/2}px rgba(255,255,255,0.3)`,
                          fontSize: `${Math.max(12, sphere.radius * 0.6)}px`
                        }}
                        onClick={() => setSelectedSphere(sphere)}
                        title={sphere.name}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: animationPhase === 'spheres' ? 1 : 0.7, 
                          opacity: animationPhase === 'spheres' ? 1 : 0.7 
                        }}
                        transition={{ delay: index * 0.3, duration: 0.8 }}
                        whileHover={{ 
                          scale: 1.4,
                          boxShadow: `0 0 ${sphere.radius * 3}px ${sphere.color}80`
                        }}
                      >
                        {/* ENHANCED: Display planetary symbols */}
                        <span style={{ color: sphere.id === 'sol' ? '#000' : '#fff', fontWeight: 'bold' }}>
                          {sphere.symbol}
                        </span>
                      </motion.div>

                      {/* Sphere Label */}
                      {selectedSphere?.id === sphere.id && (
                        <motion.div
                          className="absolute pointer-events-none z-25"
                          style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y - 35}px)`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap border border-yellow-400/30">
                            {sphere.name}
                            <div className="text-yellow-300 text-xs">{sphere.latinName}</div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}

                {/* Harmony Visualization */}
                {isRotating && animationPhase === 'harmony' && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 2 }}
                  >
                    {celestialSpheres.map((sphere, index) => (
                      <motion.div
                        key={`harmony-${sphere.id}`}
                        className="absolute rounded-full border-2 border-yellow-300/30"
                        style={{ 
                          width: `${sphere.distance * 2.0}px`,
                          height: `${sphere.distance * 1.6}px`,
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                        animate={{ 
                          scale: [1, 1.05, 1],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                          duration: 2 / sphere.rotationSpeed,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Selected Sphere Details */}
              <AnimatePresence>
                {selectedSphere && (
                  <motion.div
                    className="mt-6 p-6 bg-gradient-to-br from-amber-900/20 to-amber-950/20 rounded-xl border border-amber-500/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: selectedSphere.color }}
                        >
                          {selectedSphere.symbol}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-amber-100">{selectedSphere.name}</h4>
                          <p className="text-amber-300/80 text-sm italic">{selectedSphere.latinName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-amber-200 text-sm">Sphärenmusik</div>
                        <div className="text-amber-300/80 text-xs">{selectedSphere.sound}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-amber-200 mb-2">Kulturelle Bedeutung</h5>
                        <p className="text-amber-100/90 text-sm leading-relaxed">{selectedSphere.culturalSignificance}</p>
                      </div>
                      
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                        <h5 className="font-semibold text-amber-200 mb-2">Macrobius' Originaltext</h5>
                        <blockquote className="text-amber-100 italic text-sm mb-2">
                          "{selectedSphere.macrobiusQuote}"
                        </blockquote>
                        <p className="text-amber-200/80 text-xs">{selectedSphere.translation}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-amber-200 mb-2">Kultureller Kontext</h5>
                        <p className="text-amber-100/90 text-sm leading-relaxed">{selectedSphere.culturalContext}</p>
                      </div>
                      
                      {showTychoComparison && selectedSphere.tychoBraheConnection && (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                          <h5 className="font-semibold text-blue-200 mb-2 flex items-center gap-2">
                            <Search className="w-4 h-4" />
                            Tycho Brahe Verbindung
                          </h5>
                          <p className="text-blue-100/90 text-sm leading-relaxed">{selectedSphere.tychoBraheConnection}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ENHANCED: Right Sidebar with improved spacing */}
          <div className="xl:col-span-1 order-3 xl:order-3 space-y-6">
            {/* Spheres List */}
            <motion.div
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <h4 className="font-bold text-yellow-100 mb-4 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Die Neun Sphären
              </h4>
              <div className="space-y-2">
                {celestialSpheres.map((sphere, index) => (
                  <button
                    key={sphere.id}
                    className={`w-full flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedSphere?.id === sphere.id 
                        ? 'bg-white/20 border border-white/30' 
                        : 'bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20'
                    }`}
                    onClick={() => setSelectedSphere(sphere)}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full flex items-center justify-center text-xs"
                        style={{ backgroundColor: sphere.color }}
                      >
                        <span style={{ color: sphere.id === 'sol' ? '#000' : '#fff' }}>
                          {sphere.symbol}
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-medium text-white">{sphere.name}</div>
                        <div className="text-xs text-white/60">{sphere.latinName}</div>
                      </div>
                    </div>
                    <div className="text-xs text-white/50">{8 - index}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Cultural Legacy Section */}
            <motion.div
              className="bg-gradient-to-br from-emerald-900/20 to-emerald-950/20 rounded-xl border border-emerald-500/20 p-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              <h4 className="font-bold text-emerald-200 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Kulturelles Erbe
              </h4>
              <div className="space-y-3 text-xs text-emerald-100/90 leading-relaxed">
                <p>
                  <strong className="text-emerald-200">Mittelalterlicher Einfluss:</strong> Macrobius' kosmologische Vision 
                  prägte über 1000 Jahre das europäische Weltbild und inspirierte Denker von Boethius bis Dante.
                </p>
                <p>
                  <strong className="text-emerald-200">Renaissance-Revolution:</strong> Als Tycho Brahe 1597 
                  Pontanus' Macrobius-Edition las, erkannte er die Verbindung zwischen antiker Weisheit 
                  und moderner Beobachtung.
                </p>
                <p>
                  <strong className="text-emerald-200">Moderne Resonanz:</strong> Die Idee kosmischer Harmonie 
                  findet sich heute in Quantenfeldern, Gravitationswellen und der Suche nach einer 
                  "Theorie von Allem".
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Cultural Summary */}
        <motion.div
          className="mt-16 bg-gradient-to-br from-purple-900/20 to-purple-950/20 rounded-xl border border-purple-500/20 p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <h3 className="text-2xl font-bold text-purple-200 mb-6 text-center">🌌 Von der Antike zur Moderne</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🏛️</div>
              <h4 className="font-semibold text-purple-200 mb-2">Macrobius (400 n.Chr.)</h4>
              <p className="text-purple-100/80 text-sm leading-relaxed">
                Dokumentiert die spätantike Kosmologie als kulturelle Flaschenpost für zukünftige Generationen
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔭</div>
              <h4 className="font-semibold text-purple-200 mb-2">Tycho Brahe (1597)</h4>
              <p className="text-purple-100/80 text-sm leading-relaxed">
                Vereint Macrobius' Weisheit mit präzisen Beobachtungen und begründet die moderne Astronomie
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h4 className="font-semibold text-purple-200 mb-2">Heute (2025)</h4>
              <p className="text-purple-100/80 text-sm leading-relaxed">
                Entdecken kosmische Harmonien in Gravitationswellen und Quantenfeldern - die Sphärenmusik lebt weiter
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default EnhancedCosmosSection;
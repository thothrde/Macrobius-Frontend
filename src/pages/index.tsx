/**
 * 🏛️ MACROBIUS - EINE ANTIKE FLASCHENPOST
 * Enhanced Astronomical Design - Advanced Visual Effects & Interactions
 * Message in a Bottle from Antiquity to the Future
 */

import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

// Translation system for multilingual support
const translations = {
  DE: {
    title: "Eine antike Flaschenpost",
    intro: "Eine Nachricht aus der Antike an die Zukunft",
    section_intro: "Einführung",
    section_quiz: "Quiz",
    section_worldmap: "Weltkarte", 
    section_cosmos: "Kosmos",
    section_banquet: "Gastmahl",
    section_search: "Textsuche",
    section_learning: "Lernen",
    section_visualizations: "Visualisierungen",
    story: `Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius, ein führender Verwaltungsbeamter und Gelehrter im Norden Italiens, eine Flaschenpost an die Zukunft an. Diese Flaschenpost bestand aus zwei Texten: Einer ungezwungenen Gesprächsrunde gebildeter Römer und einem Traumkommentar. In beidem versuchte Macrobius das, was ihm an der untergehenden Zivilisation der Antike wichtig war, in einer Weise zu verpacken, die die heranziehenden dunklen Jahrhunderte überstand und zukünftige Leser anregte, den Zivilisationsprozess wieder in Gang zu setzen mit der Erinnerung an die antike Zivilisation als Ermutigung und Materialquelle. Vor 500 Jahren begann dieser Neuanfang. In Dänemark durch astronomische Beobachtungen Tycho Brahes, der damit den Grundstein für Keplers Arbeit und das Entstehen moderner Naturwissenschaften legte. Ein Assistent Tychos erinnerte sich an Macrobius Flaschenpost und stellte erstmals eine zuverlässige und kommentierte Gesamtausgabe zusammen. Dieses Buch kam in meine Hände und auf die Idee, eine kleine App für euch zu dieser Geschichte zu basteln.... Viel Spaß!`,
    explore_texts: "Erkunden Sie die Texte",
    about_macrobius: "Mehr über Macrobius",
    search_placeholder: "Suche in Macrobius-Texten...",
    quiz_question: "Wie hieß der berühmte Traum, den Macrobius kommentierte?",
    quiz_a: "A) Scipios Traum",
    quiz_b: "B) Caesars Traum", 
    quiz_c: "C) Ciceros Traum",
    timeline: "Zeitleiste",
    interactive_map: "Interaktive Karte",
    character_network: "Charakternetzwerk",
    thematic_heatmap: "Thematische Heatmap"
  },
  EN: {
    title: "An Ancient Message in a Bottle",
    intro: "A Message from Antiquity to the Future",
    section_intro: "Introduction",
    section_quiz: "Quiz",
    section_worldmap: "World Map",
    section_cosmos: "Cosmos", 
    section_banquet: "Banquet",
    section_search: "Text Search",
    section_learning: "Learning",
    section_visualizations: "Visualizations",
    story: `1500 years ago, as the Roman Empire was facing its decline, Macrobius, a leading administrative official and scholar in northern Italy, created a message in a bottle to the future. This message consisted of two texts: a casual conversation among educated Romans and a dream commentary. In both, Macrobius tried to package what was important to him about the declining civilization of antiquity in a way that would survive the approaching dark centuries and inspire future readers to restart the civilization process with the memory of ancient civilization as encouragement and source material. 500 years ago this new beginning started. In Denmark through astronomical observations by Tycho Brahe, who thus laid the foundation for Kepler's work and the emergence of modern natural sciences. An assistant of Tycho remembered Macrobius's message in a bottle and compiled the first reliable and annotated complete edition. This book came into my hands and gave me the idea to create a small app for you about this story.... Have fun!`,
    explore_texts: "Explore the Texts",
    about_macrobius: "About Macrobius",
    search_placeholder: "Search in Macrobius texts...",
    quiz_question: "What was the name of the famous dream that Macrobius commented on?",
    quiz_a: "A) Scipio's Dream",
    quiz_b: "B) Caesar's Dream",
    quiz_c: "C) Cicero's Dream",
    timeline: "Timeline",
    interactive_map: "Interactive Map",
    character_network: "Character Network",
    thematic_heatmap: "Thematic Heatmap"
  },
  LA: {
    title: "Antiqua Epistula in Ampulla",
    intro: "Nuntius ex Antiquitate ad Futurum",
    section_intro: "Introductio",
    section_quiz: "Quaestiones",
    section_worldmap: "Mappa Mundi",
    section_cosmos: "Cosmographia",
    section_banquet: "Convivium", 
    section_search: "Quaestio Textuum",
    section_learning: "Discere",
    section_visualizations: "Visualizationes",
    story: `Ante annos mille quingentos, cum Imperium Romanum interitu appropinquante laboraret, Macrobius, praefectus principalis et eruditus in Italia septentrionali, epistulam in ampulla ad futurum fecit. Haec epistula ex duobus textibus constabat: sermone inter Romanos eruditos et commentario somnii. In utrisque Macrobius id quod de civilizatione antiqua occidenti sibi carum erat, ita colligere conatus est ut saecula tenebrosa ventura superaret et lectores futuros ad processum civilizationis renovandum cum memoria civilizationis antiquae ut solatio et fonte materiae incitaret. Ante annos quingentos hic novus exortus coepit. In Dania per observationes astronomicas Tychonis Brahe, qui sic fundamentum posuit operibus Kepleri et ortui scientiarum naturalium modernarum. Adjutor Tychonis epistulae Macrobii in ampulla recordatus est et primam fidelem annotatamque editionem completam composuit. Hic liber in manus meas venit et mihi ideam deam parvam applicationem vobis de hac historia facere.... Bene fruimini!`,
    explore_texts: "Explora Textus",
    about_macrobius: "De Macrobio",
    search_placeholder: "Quaere in textibus Macrobii...",
    quiz_question: "Quod nomen erat celebris somnii quod Macrobius commentatus est?",
    quiz_a: "A) Somnium Scipionis",
    quiz_b: "B) Somnium Caesaris",
    quiz_c: "C) Somnium Ciceronis",
    timeline: "Temporum Ordo",
    interactive_map: "Mappa Interactiva",
    character_network: "Rete Personarum",
    thematic_heatmap: "Mappa Thermica"
  }
};

export default function EnhancedMacrobiusApp() {
  const [language, setLanguage] = useState('DE');
  const [activeSection, setActiveSection] = useState('intro');
  const [astrolabRotation, setAstrolabRotation] = useState(0);
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [constellations, setConstellations] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const t = (key) => translations[language][key];

  // Enhanced star generation with different types and sizes
  useEffect(() => {
    const newStars = [];
    const newConstellations = [];
    
    // Generate main stars (smaller, numerous)
    for (let i = 0; i < 120; i++) {
      newStars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.5 + 0.8,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 2,
        intensity: Math.random() * 0.6 + 0.4,
        type: 'normal'
      });
    }

    // Generate brighter guide stars (larger, fewer)
    for (let i = 120; i < 135; i++) {
      newStars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 2,
        delay: Math.random() * 8,
        duration: Math.random() * 5 + 3,
        intensity: Math.random() * 0.4 + 0.7,
        type: 'bright'
      });
    }

    // Generate constellation connections
    for (let i = 0; i < 8; i++) {
      const constellation = [];
      const numStars = Math.floor(Math.random() * 4) + 3;
      for (let j = 0; j < numStars; j++) {
        constellation.push({
          x: Math.random() * 100,
          y: Math.random() * 100
        });
      }
      newConstellations.push(constellation);
    }

    setStars(newStars);
    setConstellations(newConstellations);
  }, []);

  // Generate shooting stars occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 8 seconds
        const shootingStar = {
          id: Date.now(),
          startX: Math.random() * 100,
          startY: Math.random() * 30,
          endX: Math.random() * 100,
          endY: Math.random() * 70 + 30,
          duration: Math.random() * 2 + 1
        };
        
        setShootingStars(prev => [...prev, shootingStar]);
        
        // Remove shooting star after animation
        setTimeout(() => {
          setShootingStars(prev => prev.filter(star => star.id !== shootingStar.id));
        }, shootingStar.duration * 1000 + 500);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Track mouse movement for subtle parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Enhanced section change with smoother astrolab rotation
  const handleSectionChange = useCallback((section) => {
    if (section !== activeSection) {
      setActiveSection(section);
      setAstrolabRotation(prev => prev + 45);
    }
  }, [activeSection]);

  const sections = [
    { id: 'intro', label: t('section_intro'), icon: '📜' },
    { id: 'quiz', label: t('section_quiz'), icon: '❓' },
    { id: 'worldmap', label: t('section_worldmap'), icon: '🗺️' },
    { id: 'cosmos', label: t('section_cosmos'), icon: '🌌' },
    { id: 'banquet', label: t('section_banquet'), icon: '🍷' },
    { id: 'search', label: t('section_search'), icon: '🔍' },
    { id: 'learning', label: t('section_learning'), icon: '📚' },
    { id: 'visualizations', label: t('section_visualizations'), icon: '📈' }
  ];

  return (
    <>
      <Head>
        <title>{t('title')} - Macrobius Platform</title>
        <meta name="description" content="Eine antike Flaschenpost - Macrobius' Nachricht aus der Antike an die Zukunft" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div 
        className="min-h-screen relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #007BC7 0%, #004080 50%, #005A9C 100%)'
        }}
      >
        {/* Enhanced animated stars with different types */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {stars.map(star => (
            <div
              key={star.id}
              className={`absolute rounded-full ${star.type === 'bright' ? 'bg-yellow-200' : 'bg-white'}`}
              style={{
                left: `${star.left + mousePosition.x * 0.02}%`,
                top: `${star.top + mousePosition.y * 0.02}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.intensity,
                animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
                boxShadow: star.type === 'bright' ? '0 0 8px rgba(255, 255, 255, 0.8)' : 'none'
              }}
            />
          ))}
        </div>

        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          {constellations.map((constellation, idx) => (
            <g key={idx}>
              {constellation.map((star, starIdx) => {
                if (starIdx < constellation.length - 1) {
                  const nextStar = constellation[starIdx + 1];
                  return (
                    <line
                      key={starIdx}
                      x1={`${star.x}%`}
                      y1={`${star.y}%`}
                      x2={`${nextStar.x}%`}
                      y2={`${nextStar.y}%`}
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="1"
                      style={{
                        animation: `fadeInOut ${Math.random() * 10 + 5}s ease-in-out infinite`
                      }}
                    />
                  );
                }
                return null;
              })}
            </g>
          ))}
        </svg>

        {/* Shooting stars */}
        <AnimatePresence>
          {shootingStars.map(star => (
            <motion.div
              key={star.id}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${star.startX}%`,
                top: `${star.startY}%`,
                boxShadow: '0 0 6px #fff, 0 0 12px #fff, 0 0 18px #87CEEB'
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: typeof window !== 'undefined' ? `${(star.endX - star.startX) * window.innerWidth / 100}px` : '0px',
                y: typeof window !== 'undefined' ? `${(star.endY - star.startY) * window.innerHeight / 100}px` : '0px'
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: star.duration, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>

        {/* Enhanced rotating astrolab with parallax */}
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-contain transition-transform duration-700 ease-out"
          style={{
            backgroundImage: 'url(/Astrolab.jpg)',
            opacity: 0.15,
            transform: `rotate(${astrolabRotation}deg) translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(1.1)`,
            filter: 'sepia(20%) hue-rotate(200deg)'
          }}
        />

        {/* Enhanced language selector */}
        <div className="absolute top-6 right-6 z-50">
          <motion.select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 bg-white/95 backdrop-blur-md border-2 border-yellow-400 rounded-lg shadow-xl font-semibold text-gray-800 hover:bg-white transition-all duration-300 hover:shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <option value="DE">🇩🇪 Deutsch</option>
            <option value="EN">🇬🇧 English</option>
            <option value="LA">🏛️ Latina</option>
          </motion.select>
        </div>

        {/* Enhanced navigation with improved styling */}
        <nav className="absolute top-6 left-6 z-40 bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/30 shadow-2xl">
          <div className="flex flex-col space-y-3">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-500 ${
                  activeSection === section.id 
                    ? 'shadow-xl transform scale-105' 
                    : 'hover:bg-white/20 hover:scale-102'
                }`}
                style={{
                  backgroundColor: activeSection === section.id ? '#722F37' : 'transparent',
                  color: activeSection === section.id ? '#FFD700' : 'white',
                  border: activeSection === section.id ? '2px solid #FFD700' : '2px solid transparent',
                  textShadow: activeSection === section.id ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none'
                }}
                whileHover={{ 
                  x: activeSection === section.id ? 0 : 5,
                  boxShadow: activeSection === section.id ? 
                    '0 0 25px rgba(255, 215, 0, 0.4)' : 
                    '0 5px 15px rgba(255, 255, 255, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="mr-3 text-lg filter drop-shadow-sm">{section.icon}</span>
                <span className="text-sm font-semibold">{section.label}</span>
              </motion.button>
            ))}
          </div>
        </nav>

        {/* Enhanced main content area */}
        <div className="relative z-30 min-h-screen flex items-center justify-center p-8">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          >
            {/* Enhanced floating bottle with improved animation */}
            <motion.div
              className="mb-12 flex justify-center relative"
              animate={{ 
                y: [0, -25, 0],
                rotate: [0, 3, -3, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <img 
                  src="/MacrobiusBottle.jpg"
                  alt="Macrobius Bottle"
                  className="w-52 h-52 object-cover rounded-full shadow-2xl border-4 border-yellow-400 relative z-10"
                  onError={(e) => e.target.style.display = 'none'}
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))'
                  }}
                />
                {/* Magical aura effect */}
                <div 
                  className="absolute inset-0 rounded-full border-2 border-yellow-300 opacity-50"
                  style={{
                    animation: 'pulse 3s ease-in-out infinite',
                    transform: 'scale(1.1)'
                  }}
                />
                <div 
                  className="absolute inset-0 rounded-full border-2 border-yellow-200 opacity-30"
                  style={{
                    animation: 'pulse 3s ease-in-out infinite 1.5s',
                    transform: 'scale(1.2)'
                  }}
                />
              </div>
            </motion.div>

            {/* Enhanced main title with text effects */}
            <motion.h1 
              className="text-7xl font-bold mb-8 text-center relative"
              style={{ 
                color: '#FFD700',
                textShadow: '0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.3)',
                fontFamily: 'serif'
              }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              {t('title')}
              {/* Sparkle effects around title */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full opacity-70 animate-ping" />
              <div className="absolute top-4 -left-4 w-3 h-3 bg-yellow-200 rounded-full opacity-60 animate-pulse" />
              <div className="absolute -bottom-1 right-8 w-2 h-2 bg-yellow-400 rounded-full opacity-80 animate-bounce" />
            </motion.h1>

            {/* Enhanced subtitle */}
            <motion.p 
              className="text-2xl mb-12 text-white/95 font-medium leading-relaxed"
              style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {t('intro')}
            </motion.p>

            {/* Enhanced content sections with better transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="bg-white/15 backdrop-blur-md rounded-3xl p-8 border border-white/25 shadow-2xl relative overflow-hidden"
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-200 via-transparent to-blue-200 animate-pulse" />
                </div>

                {/* Section content based on activeSection */}
                {activeSection === 'intro' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-6">
                        <motion.img 
                          src="/Rome-under.jpg" 
                          alt="Fall of Rome"
                          className="w-full rounded-xl shadow-xl transition-transform duration-300 hover:scale-105"
                          onError={(e) => e.target.style.display = 'none'}
                          whileHover={{ scale: 1.02 }}
                        />
                        <motion.img 
                          src="/Macrobius-and-Eustachius.jpg"
                          alt="Macrobius and Eustachius" 
                          className="w-full rounded-xl shadow-xl transition-transform duration-300 hover:scale-105"
                          onError={(e) => e.target.style.display = 'none'}
                          whileHover={{ scale: 1.02 }}
                        />
                      </div>
                      <div className="space-y-6">
                        <motion.img 
                          src="/TychoAssistent.jpg"
                          alt="Tycho's Assistant"
                          className="w-full rounded-xl shadow-xl transition-transform duration-300 hover:scale-105"
                          onError={(e) => e.target.style.display = 'none'}
                          whileHover={{ scale: 1.02 }}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <motion.img 
                            src="/MacrobiI.JPG"
                            alt="Macrobius Book"
                            className="w-full rounded-xl shadow-xl transition-transform duration-300 hover:scale-105"
                            onError={(e) => e.target.style.display = 'none'}
                            whileHover={{ scale: 1.05 }}
                          />
                          <motion.img 
                            src="/MacrobiRegal.jpg"
                            alt="Book on Shelf"
                            className="w-full rounded-xl shadow-xl transition-transform duration-300 hover:scale-105"
                            onError={(e) => e.target.style.display = 'none'}
                            whileHover={{ scale: 1.05 }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-lg text-white leading-relaxed text-justify max-w-4xl mx-auto" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}>
                      {t('story')}
                    </p>
                  </motion.div>
                )}

                {activeSection === 'visualizations' && (
                  <motion.div 
                    className="text-center space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl font-bold text-yellow-400 mb-8">{t('section_visualizations')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { icon: '📈', label: t('timeline') },
                        { icon: '🗺️', label: t('interactive_map') },
                        { icon: '👥', label: t('character_network') },
                        { icon: '🔥', label: t('thematic_heatmap') }
                      ].map((viz, index) => (
                        <motion.div 
                          key={index}
                          className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -5 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          <div className="text-3xl mb-4">{viz.icon}</div>
                          <h3 className="text-lg font-semibold text-yellow-400 mb-2">{viz.label}</h3>
                          <p className="text-white/80 text-sm">Interaktive Darstellung kultureller Zusammenhänge</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeSection === 'cosmos' && (
                  <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl font-bold text-yellow-400 mb-8">Macrobius' Kosmos</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <motion.img 
                        src="/Macrobius-universe.jpg"
                        alt="Macrobius Universe"
                        className="w-full rounded-xl shadow-xl"
                        onError={(e) => e.target.style.display = 'none'}
                        whileHover={{ scale: 1.02 }}
                      />
                      <motion.img 
                        src="/Macrobius-Zeichnung-Eklipse.jpg"
                        alt="Eclipse Drawing"
                        className="w-full rounded-xl shadow-xl"
                        onError={(e) => e.target.style.display = 'none'}
                        whileHover={{ scale: 1.02 }}
                      />
                    </div>
                    <p className="text-white text-lg leading-relaxed max-w-3xl mx-auto">
                      Die Struktur des Universums nach dem Kommentar zu Scipios Traum. Entdecken Sie Macrobius' Verständnis von Himmelssphären, Planetenbewegungen und kosmischer Harmonie.
                    </p>
                  </motion.div>
                )}

                {/* Add other sections with similar enhanced styling */}
                {activeSection === 'worldmap' && (
                  <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl font-bold text-yellow-400 mb-8">Macrobius' Weltkarte</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <motion.img 
                        src="/Macrobius-Erdkarte.jpg"
                        alt="Macrobius Earth Map"
                        className="w-full rounded-xl shadow-xl"
                        onError={(e) => e.target.style.display = 'none'}
                        whileHover={{ scale: 1.02 }}
                      />
                      <motion.img 
                        src="/mappa-mundi.jpg"
                        alt="Medieval World Map"
                        className="w-full rounded-xl shadow-xl"
                        onError={(e) => e.target.style.display = 'none'}
                        whileHover={{ scale: 1.02 }}
                      />
                    </div>
                    <p className="text-white text-lg leading-relaxed max-w-3xl mx-auto">
                      Entdecken Sie Macrobius' Verständnis der Welt durch seine geografischen Beschreibungen und kosmografischen Konzepte.
                    </p>
                  </motion.div>
                )}

                {activeSection === 'banquet' && (
                  <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl font-bold text-yellow-400 mb-8">Saturnalia Symposion</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <motion.img 
                        src="/WandSymposion.jpg"
                        alt="Wall Symposium"
                        className="w-full rounded-xl shadow-xl"
                        onError={(e) => e.target.style.display = 'none'}
                        whileHover={{ scale: 1.02 }}
                      />
                      <motion.img 
                        src="/Symposion-2.jpg"
                        alt="Banquet Scene"
                        className="w-full rounded-xl shadow-xl"
                        onError={(e) => e.target.style.display = 'none'}
                        whileHover={{ scale: 1.02 }}
                      />
                    </div>
                    <p className="text-white text-lg leading-relaxed max-w-3xl mx-auto">
                      Erleben Sie das Gastmahl des Macrobius. Darstellung und Analyse der Gastmahlszenen mit mehrsprachigen Textpassagen.
                    </p>
                  </motion.div>
                )}

                {activeSection === 'quiz' && (
                  <motion.div 
                    className="text-center space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl font-bold text-yellow-400">Interaktives Quiz</h2>
                    <p className="text-white text-lg">Testen Sie Ihr Wissen über Macrobius und die antike Kultur.</p>
                    <div className="bg-white/10 rounded-xl p-6">
                      <p className="text-white mb-4">{t('quiz_question')}</p>
                      <div className="space-y-3">
                        {[t('quiz_a'), t('quiz_b'), t('quiz_c')].map((answer, index) => (
                          <motion.button 
                            key={index}
                            className="block w-full p-3 rounded-lg transition-all duration-300 text-white"
                            style={{ backgroundColor: '#722F37' }}
                            whileHover={{ 
                              scale: 1.02,
                              backgroundColor: '#FFD700',
                              color: '#722F37'
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {answer}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'search' && (
                  <motion.div 
                    className="text-center space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl font-bold text-yellow-400">Textsuche</h2>
                    <p className="text-white text-lg">Fortgeschrittene Textanalyse und Suchfunktionen in verschiedenen Sprachen.</p>
                    <div className="bg-white/10 rounded-xl p-6">
                      <input 
                        type="text"
                        placeholder={t('search_placeholder')}
                        className="w-full p-4 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 transition-all duration-300"
                      />
                    </div>
                  </motion.div>
                )}

                {activeSection === 'learning' && (
                  <motion.div 
                    className="text-center space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl font-bold text-yellow-400">Lernwerkzeuge</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div 
                        className="bg-white/10 rounded-xl p-6"
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">📚 Vokabeltrainer</h3>
                        <p className="text-white">Lernen Sie lateinische Vokabeln aus den authentischen Macrobius-Texten.</p>
                      </motion.div>
                      <motion.div 
                        className="bg-white/10 rounded-xl p-6"
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">📖 Grammatik-Erklärer</h3>
                        <p className="text-white">Verstehen Sie lateinische Grammatik anhand echter Textbeispiele.</p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Enhanced action buttons */}
            <motion.div 
              className="mt-12 flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[t('explore_texts'), t('about_macrobius')].map((buttonText, index) => (
                <motion.button 
                  key={index}
                  className="px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300 backdrop-blur-sm"
                  style={{ 
                    backgroundColor: '#722F37',
                    color: '#FFD700',
                    borderColor: '#FFD700',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: '#FFD700',
                    color: '#722F37',
                    borderColor: '#722F37',
                    boxShadow: '0 10px 25px rgba(255, 215, 0, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.9 }}
                >
                  {buttonText}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced CSS animations */}
        <style jsx>{`
          @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(1); }
            100% { opacity: 1; transform: scale(1.3); }
          }
          
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.4; }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.05); opacity: 0.3; }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    </>
  );
}
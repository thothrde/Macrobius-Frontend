/**
 * 🏛️ MACROBIUS - EINE ANTIKE FLASCHENPOST
 * Astronomical Design Implementation - Complete Visual Transformation
 * Message in a Bottle from Antiquity to the Future
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

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
    story: `Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius, ein führender Verwaltungsbeamter und Gelehrter im Norden Italiens, eine Flaschenpost an die Zukunft an. Diese Flaschenpost bestand aus zwei Texten: Einer ungezwungenen Gesprächsrunde gebildeter Römer und einem Traumkommentar. In beidem versuchte Macrobius das, was ihm an der untergehenden Zivilisation der Antike wichtig war, in einer Weise zu verpacken, die die heranziehenden dunklen Jahrhunderte überstand und zukünftige Leser anregte, den Zivilisationsprozess wieder in Gang zu setzen mit der Erinnerung an die antike Zivilisation als Ermutigung und Materialquelle. Vor 500 Jahren begann dieser Neuanfang. In Dänemark durch astronomische Beobachtungen Tycho Brahes, der damit den Grundstein für Keplers Arbeit und das Entstehen moderner Naturwissenschaften legte. Ein Assistent Tychos erinnerte sich an Macrobius Flaschenpost und stellte erstmals eine zuverlässige und kommentierte Gesamtausgabe zusammen. Dieses Buch kam in meine Hände und auf die Idee, eine kleine App für euch zu dieser Geschichte zu basteln.... Viel Spaß!`,
    explore_texts: "Erkunden Sie die Texte",
    about_macrobius: "Mehr über Macrobius",
    search_placeholder: "Suche in Macrobius-Texten...",
    quiz_question: "Wie hieß der berühmte Traum, den Macrobius kommentierte?",
    quiz_a: "A) Scipios Traum",
    quiz_b: "B) Caesars Traum", 
    quiz_c: "C) Ciceros Traum"
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
    story: `1500 years ago, as the Roman Empire was facing its decline, Macrobius, a leading administrative official and scholar in northern Italy, created a message in a bottle to the future. This message consisted of two texts: a casual conversation among educated Romans and a dream commentary. In both, Macrobius tried to package what was important to him about the declining civilization of antiquity in a way that would survive the approaching dark centuries and inspire future readers to restart the civilization process with the memory of ancient civilization as encouragement and source material. 500 years ago this new beginning started. In Denmark through astronomical observations by Tycho Brahe, who thus laid the foundation for Kepler's work and the emergence of modern natural sciences. An assistant of Tycho remembered Macrobius's message in a bottle and compiled the first reliable and annotated complete edition. This book came into my hands and gave me the idea to create a small app for you about this story.... Have fun!`,
    explore_texts: "Explore the Texts",
    about_macrobius: "About Macrobius",
    search_placeholder: "Search in Macrobius texts...",
    quiz_question: "What was the name of the famous dream that Macrobius commented on?",
    quiz_a: "A) Scipio's Dream",
    quiz_b: "B) Caesar's Dream",
    quiz_c: "C) Cicero's Dream"
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
    story: `Ante annos mille quingentos, cum Imperium Romanum interitu appropinquante laboraret, Macrobius, praefectus principalis et eruditus in Italia septentrionali, epistulam in ampulla ad futurum fecit. Haec epistula ex duobus textibus constabat: sermone inter Romanos eruditos et commentario somnii. In utrisque Macrobius id quod de civilizatione antiqua occidenti sibi carum erat, ita colligere conatus est ut saecula tenebrosa ventura superaret et lectores futuros ad processum civilizationis renovandum cum memoria civilizationis antiquae ut solatio et fonte materiae incitaret. Ante annos quingentos hic novus exortus coepit. In Dania per observationes astronomicas Tychonis Brahe, qui sic fundamentum posuit operibus Kepleri et ortui scientiarum naturalium modernarum. Adjutor Tychonis epistulae Macrobii in ampulla recordatus est et primam fidelem annotatamque editionem completam composuit. Hic liber in manus meas venit et mihi ideam deam parvam applicationem vobis de hac historia facere.... Bene fruimini!`,
    explore_texts: "Explora Textus",
    about_macrobius: "De Macrobio",
    search_placeholder: "Quaere in textibus Macrobii...",
    quiz_question: "Quod nomen erat celebris somnii quod Macrobius commentatus est?",
    quiz_a: "A) Somnium Scipionis",
    quiz_b: "B) Somnium Caesaris",
    quiz_c: "C) Somnium Ciceronis"
  }
};

export default function MacrobiusAstronomicalApp() {
  const [language, setLanguage] = useState('DE');
  const [activeSection, setActiveSection] = useState('intro');
  const [astrolabRotation, setAstrolabRotation] = useState(0);
  const [stars, setStars] = useState([]);

  const t = (key) => translations[language][key];

  // Generate animated stars (150 total)
  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 150; i++) {
      newStars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2
      });
    }
    setStars(newStars);
  }, []);

  // Handle section changes with astrolab rotation (45° per change)
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setAstrolabRotation(prev => prev + 45);
  };

  const sections = [
    { id: 'intro', label: t('section_intro'), icon: '📜' },
    { id: 'quiz', label: t('section_quiz'), icon: '❓' },
    { id: 'worldmap', label: t('section_worldmap'), icon: '🗺️' },
    { id: 'cosmos', label: t('section_cosmos'), icon: '🌌' },
    { id: 'banquet', label: t('section_banquet'), icon: '🍷' },
    { id: 'search', label: t('section_search'), icon: '🔍' },
    { id: 'learning', label: t('section_learning'), icon: '📚' }
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
          background: 'linear-gradient(135deg, #007BC7 0%, #005A9C 100%)'
        }}
      >
        {/* Animated Stars (150 pieces) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {stars.map(star => (
            <div
              key={star.id}
              className="absolute bg-white rounded-full opacity-80"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`
              }}
            />
          ))}
        </div>

        {/* Rotating Astrolab Background */}
        <div 
          className="absolute inset-0 opacity-20 bg-center bg-no-repeat bg-contain transition-transform duration-500 ease-in-out"
          style={{
            backgroundImage: 'url(/Astrolab.jpg)',
            transform: `rotate(${astrolabRotation}deg)`
          }}
        />

        {/* Language Selector */}
        <div className="absolute top-6 right-6 z-50">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-yellow-400 rounded-lg shadow-lg font-semibold text-gray-800 hover:bg-white transition-all duration-300"
          >
            <option value="DE">🇩🇪 Deutsch</option>
            <option value="EN">🇬🇧 English</option>
            <option value="LA">🏛️ Latina</option>
          </select>
        </div>

        {/* Navigation with Wine-colored buttons */}
        <nav className="absolute top-6 left-6 z-40 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex flex-col space-y-3">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  activeSection === section.id 
                    ? 'shadow-lg transform scale-105' 
                    : 'hover:bg-white/20'
                }`}
                style={{
                  backgroundColor: activeSection === section.id ? '#722F37' : 'transparent',
                  color: activeSection === section.id ? '#FFD700' : 'white',
                  border: activeSection === section.id ? '2px solid #FFD700' : '2px solid transparent'
                }}
              >
                <span className="mr-3 text-lg">{section.icon}</span>
                <span className="text-sm font-semibold">{section.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="relative z-30 min-h-screen flex items-center justify-center p-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Floating Bottle Image */}
            <motion.div
              className="mb-12 flex justify-center"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img 
                src="/MacrobiusBottle.jpg"
                alt="Macrobius Bottle"
                className="w-48 h-48 object-cover rounded-full shadow-2xl border-4 border-yellow-400"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Main Title - Golden (#FFD700) */}
            <motion.h1 
              className="text-6xl font-bold mb-6 text-center"
              style={{ color: '#FFD700' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('title')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-2xl mb-12 text-white/90 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('intro')}
            </motion.p>

            {/* Content Sections */}
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl"
            >
              {activeSection === 'intro' && (
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                      <img 
                        src="/Rome-under.jpg" 
                        alt="Fall of Rome"
                        className="w-full rounded-lg shadow-lg"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                      <img 
                        src="/Macrobius-and-Eustachius.jpg"
                        alt="Macrobius and Eustachius" 
                        className="w-full rounded-lg shadow-lg"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    </div>
                    <div className="space-y-6">
                      <img 
                        src="/TychoAssistent.jpg"
                        alt="Tycho's Assistant"
                        className="w-full rounded-lg shadow-lg"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <img 
                          src="/MacrobiI.JPG"
                          alt="Macrobius Book"
                          className="w-full rounded-lg shadow-lg"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                        <img 
                          src="/MacrobiRegal.jpg"
                          alt="Book on Shelf"
                          className="w-full rounded-lg shadow-lg"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-lg text-white leading-relaxed text-justify">
                    {t('story')}
                  </p>
                </div>
              )}

              {activeSection === 'worldmap' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6">Macrobius' Weltkarte</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <img 
                      src="/Macrobius-Erdkarte.jpg"
                      alt="Macrobius Earth Map"
                      className="w-full rounded-lg shadow-lg"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                    <img 
                      src="/mappa-mundi.jpg"
                      alt="Medieval World Map"
                      className="w-full rounded-lg shadow-lg"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                  <p className="text-white text-lg">
                    Entdecken Sie Macrobius' Verständnis der Welt durch seine geografischen Beschreibungen und kosmografischen Konzepte.
                  </p>
                </div>
              )}

              {activeSection === 'cosmos' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6">Macrobius' Kosmos</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <img 
                      src="/Macrobius-universe.jpg"
                      alt="Macrobius Universe"
                      className="w-full rounded-lg shadow-lg"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                    <img 
                      src="/Macrobius-Zeichnung-Eklipse.jpg"
                      alt="Eclipse Drawing"
                      className="w-full rounded-lg shadow-lg"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                  <p className="text-white text-lg">
                    Die Struktur des Universums nach dem Kommentar zu Scipios Traum. Entdecken Sie Macrobius' Verständnis von Himmelssphären, Planetenbewegungen und kosmischer Harmonie.
                  </p>
                </div>
              )}

              {activeSection === 'banquet' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6">Saturnalia Symposion</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <img 
                      src="/WandSymposion.jpg"
                      alt="Wall Symposium"
                      className="w-full rounded-lg shadow-lg"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                    <img 
                      src="/Symposion-2.jpg"
                      alt="Banquet Scene"
                      className="w-full rounded-lg shadow-lg"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                  <p className="text-white text-lg">
                    Erleben Sie das Gastmahl des Macrobius. Darstellung und Analyse der Gastmahlszenen mit mehrsprachigen Textpassagen.
                  </p>
                </div>
              )}

              {activeSection === 'learning' && (
                <div className="text-center space-y-6">
                  <h2 className="text-3xl font-bold text-yellow-400">Lernwerkzeuge</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/10 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">📚 Vokabeltrainer</h3>
                      <p className="text-white">Lernen Sie lateinische Vokabeln aus den authentischen Macrobius-Texten.</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">📖 Grammatik-Erklärer</h3>
                      <p className="text-white">Verstehen Sie lateinische Grammatik anhand echter Textbeispiele.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'search' && (
                <div className="text-center space-y-6">
                  <h2 className="text-3xl font-bold text-yellow-400">Textsuche</h2>
                  <p className="text-white text-lg">Fortgeschrittene Textanalyse und Suchfunktionen in verschiedenen Sprachen.</p>
                  <div className="bg-white/10 rounded-lg p-6">
                    <input 
                      type="text"
                      placeholder={t('search_placeholder')}
                      className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>
              )}

              {activeSection === 'quiz' && (
                <div className="text-center space-y-6">
                  <h2 className="text-3xl font-bold text-yellow-400">Interaktives Quiz</h2>
                  <p className="text-white text-lg">Testen Sie Ihr Wissen über Macrobius und die antike Kultur.</p>
                  <div className="bg-white/10 rounded-lg p-6">
                    <p className="text-white mb-4">{t('quiz_question')}</p>
                    <div className="space-y-2">
                      <button 
                        className="block w-full p-3 rounded-lg transition-all duration-300 text-white hover:scale-105"
                        style={{ backgroundColor: '#722F37' }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#FFD700';
                          e.target.style.color = '#722F37';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#722F37';
                          e.target.style.color = 'white';
                        }}
                      >
                        {t('quiz_a')}
                      </button>
                      <button 
                        className="block w-full p-3 rounded-lg transition-all duration-300 text-white hover:scale-105"
                        style={{ backgroundColor: '#722F37' }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#FFD700';
                          e.target.style.color = '#722F37';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#722F37';
                          e.target.style.color = 'white';
                        }}
                      >
                        {t('quiz_b')}
                      </button>
                      <button 
                        className="block w-full p-3 rounded-lg transition-all duration-300 text-white hover:scale-105"
                        style={{ backgroundColor: '#722F37' }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#FFD700';
                          e.target.style.color = '#722F37';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#722F37';
                          e.target.style.color = 'white';
                        }}
                      >
                        {t('quiz_c')}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Wine-colored Action Buttons with Golden Text */}
            <motion.div 
              className="mt-12 flex justify-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button 
                className="px-8 py-3 rounded-lg font-semibold border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ 
                  backgroundColor: '#722F37',
                  color: '#FFD700',
                  borderColor: '#FFD700'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#FFD700';
                  e.target.style.color = '#722F37';
                  e.target.style.borderColor = '#722F37';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#722F37';
                  e.target.style.color = '#FFD700';
                  e.target.style.borderColor = '#FFD700';
                }}
              >
                {t('explore_texts')}
              </button>
              <button 
                className="px-8 py-3 rounded-lg font-semibold border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ 
                  backgroundColor: '#722F37',
                  color: '#FFD700',
                  borderColor: '#FFD700'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#FFD700';
                  e.target.style.color = '#722F37';
                  e.target.style.borderColor = '#722F37';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#722F37';
                  e.target.style.color = '#FFD700';
                  e.target.style.borderColor = '#FFD700';
                }}
              >
                {t('about_macrobius')}
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(1); }
            100% { opacity: 1; transform: scale(1.2); }
          }
        `}</style>
      </div>
    </>
  );
}
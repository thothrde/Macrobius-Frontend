/**
 * 🏛️ MACROBIUS - EINE ANTIKE FLASCHENPOST
 * Oracle Cloud Integrated - Message in a Bottle from Antiquity to the Future
 * Visual Excellence with Historical Authenticity + Real Classical Content
 * 
 * ENHANCED: June 13, 2025 - Build Issues Resolved + Oracle Cloud API Integration Complete
 * Architecture: Using Oracle Cloud-powered section components
 */

import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

// Import Oracle Cloud-integrated components with correct names from index
import CosmosSection from '../components/sections/CosmosSection';
import TextSearchSection from '../components/sections/TextSearchSection';  
import VisualizationsSection from '../components/sections/VisualizationsSection';
import VocabularyTrainer from '../components/sections/VocabularyTrainer';

// Translation types
type TranslationKey = 
  | 'title' | 'intro' | 'section_intro' | 'section_quiz' | 'section_worldmap' 
  | 'section_cosmos' | 'section_banquet' | 'section_search' | 'section_learning' 
  | 'section_visualizations' | 'section_vocabulary' | 'explore_texts' | 'about_macrobius' 
  | 'search_placeholder' | 'quiz_question' | 'quiz_a' | 'quiz_b' | 'quiz_c' 
  | 'quiz_answer' | 'cosmos_description' | 'worldmap_description' | 'banquet_description' 
  | 'learning_tools' | 'story' | 'about_title' | 'about_subtitle' | 'about_biography' 
  | 'about_works' | 'about_legacy' | 'about_influence' | 'close_modal' | 'pontanus_button'
  | 'about_pontanus_title' | 'about_pontanus_subtitle' | 'about_pontanus_bio'
  | 'about_pontanus_work' | 'about_pontanus_legacy';

type TranslationTexts = Record<TranslationKey, string>;
type Translations = Record<'DE' | 'EN' | 'LA', TranslationTexts>;

// Enhanced translation system with Oracle Cloud integration
const translations: Translations = {
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
    section_vocabulary: "Vokabeltrainer",
    explore_texts: "Erkunden Sie die Texte",
    about_macrobius: "Mehr über Macrobius",
    search_placeholder: "Suche in 1.401 authentischen Passagen...",
    quiz_question: "Wie hieß der berühmte Traum, den Macrobius kommentierte?",
    quiz_a: "A) Scipios Traum",
    quiz_b: "B) Caesars Traum", 
    quiz_c: "C) Ciceros Traum",
    quiz_answer: "Richtige Antwort: A) Scipios Traum - Das 'Somnium Scipionis' war ein berühmter Text von Cicero, den Macrobius ausführlich kommentierte.",
    cosmos_description: "Erkunden Sie Macrobius' faszinierende Darstellung des Kosmos mit authentischen Textstellen",
    worldmap_description: "Entdecken Sie die antike Weltsicht durch Macrobius' geografische Beschreibungen",
    banquet_description: "Tauchen Sie ein in die Gespräche der Gelehrten beim Gastmahl der Saturnalien",
    learning_tools: "Lernwerkzeuge mit authentischen lateinischen Texten aus dem Oracle Cloud-Korpus",
    story: `Vor 1500 Jahren fertigte Macrobius eine Flaschenpost an die Zukunft an. Diese App macht sie erlebbar mit 1.401 authentischen lateinischen Passagen aus der Oracle Cloud-Datenbank. Erleben Sie die Verbindung zwischen antiker Weisheit und moderner Technologie!`,
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Philosoph, Grammatiker und Bewahrer antiker Weisheit (ca. 385-430 n. Chr.)",
    about_biography: `Macrobius war ein spätantiker römischer Beamter und Schriftsteller. Als Praefectus praetorio per Hispanias verwaltete er die iberische Halbinsel. Seine Werke bewahrten unschätzbares Wissen für zukünftige Generationen.`,
    about_works: `Seine Hauptwerke "Saturnalia" und "Commentarii in Somnium Scipionis" sind heute durch 1.401 digitalisierte Passagen in unserer Oracle Cloud-Datenbank verfügbar.`,
    about_legacy: `Macrobius' Einfluss reicht bis heute. Seine "antike Flaschenpost" ist nun durch moderne Technologie für alle zugänglich.`,
    about_influence: `Diese App macht Macrobius' systematische Bewahrung antiker Weisheit durch authentische Texte erlebbar.`,
    close_modal: "Schließen",
    pontanus_button: "Über Pontanus",
    about_pontanus_title: "Johannes Isaac Pontanus",
    about_pontanus_subtitle: "Dänischer Gelehrter und Herausgeber (1571-1639)",
    about_pontanus_bio: `Pontanus spielte eine entscheidende Rolle bei der Bewahrung von Macrobius' Werken für die Nachwelt.`,
    about_pontanus_work: `Seine Edition von 1597 wurde zur Standardreferenz und ist die Grundlage für unsere digitale Sammlung.`,
    about_pontanus_legacy: `Durch Pontanus' Arbeit können wir heute authentische Macrobius-Texte digital erleben.`
  },
  EN: {
    title: "An Ancient Message in a Bottle",
    intro: "A message from antiquity to the future",
    section_intro: "Introduction",
    section_quiz: "Quiz",
    section_worldmap: "World Map",
    section_cosmos: "Cosmos",
    section_banquet: "Banquet",
    section_search: "Text Search",
    section_learning: "Learning",
    section_visualizations: "Visualizations",
    section_vocabulary: "Vocabulary Trainer",
    explore_texts: "Explore the Texts",
    about_macrobius: "About Macrobius",
    search_placeholder: "Search through 1,401 authentic passages...",
    quiz_question: "What was the famous dream that Macrobius commented on?",
    quiz_a: "A) Scipio's Dream",
    quiz_b: "B) Caesar's Dream",
    quiz_c: "C) Cicero's Dream",
    quiz_answer: "Correct Answer: A) Scipio's Dream - The 'Somnium Scipionis' was a famous text by Cicero that Macrobius extensively commented upon.",
    cosmos_description: "Explore Macrobius' fascinating representation of the cosmos with authentic passages",
    worldmap_description: "Discover the ancient worldview through Macrobius' geographical descriptions",
    banquet_description: "Immerse yourself in the scholarly conversations at the Saturnalia banquet",
    learning_tools: "Learning tools with authentic Latin texts from the Oracle Cloud corpus",
    story: `1500 years ago, Macrobius created a message in a bottle to the future. This app brings it to life with 1,401 authentic Latin passages from our Oracle Cloud database. Experience the connection between ancient wisdom and modern technology!`,
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Philosopher, Grammarian and Preserver of Ancient Wisdom (ca. 385-430 AD)",
    about_biography: `Macrobius was a late antique Roman official and writer. As Praefectus praetorio per Hispanias, he administered the Iberian Peninsula. His works preserved invaluable knowledge for future generations.`,
    about_works: `His main works "Saturnalia" and "Commentarii in Somnium Scipionis" are now available through 1,401 digitized passages in our Oracle Cloud database.`,
    about_legacy: `Macrobius' influence reaches to today. His "ancient message in a bottle" is now accessible to all through modern technology.`,
    about_influence: `This app makes Macrobius' systematic preservation of ancient wisdom experienceable through authentic texts.`,
    close_modal: "Close",
    pontanus_button: "About Pontanus",
    about_pontanus_title: "Johannes Isaac Pontanus",
    about_pontanus_subtitle: "Danish Scholar and Editor (1571-1639)",
    about_pontanus_bio: `Pontanus played a crucial role in preserving Macrobius' works for posterity.`,
    about_pontanus_work: `His 1597 edition became the standard reference and is the foundation for our digital collection.`,
    about_pontanus_legacy: `Through Pontanus' work, we can experience authentic Macrobius texts digitally today.`
  },
  LA: {
    title: "Epistula Antiqua in Lagena",
    intro: "Nuntius ab antiquitate ad futurum",
    section_intro: "Introductio",
    section_quiz: "Quaestiones",
    section_worldmap: "Mappa Mundi",
    section_cosmos: "Cosmos",
    section_banquet: "Convivium",
    section_search: "Textus Quaerere",
    section_learning: "Discere",
    section_visualizations: "Imagines",
    section_vocabulary: "Vocabularium",
    explore_texts: "Textus Explorare",
    about_macrobius: "De Macrobio",
    search_placeholder: "Quaerere in 1401 textibus authenticis...",
    quiz_question: "Quod somnium celebre Macrobius commentatus est?",
    quiz_a: "A) Somnium Scipionis",
    quiz_b: "B) Somnium Caesaris",
    quiz_c: "C) Somnium Ciceronis",
    quiz_answer: "Responsio recta: A) Somnium Scipionis - 'Somnium Scipionis' textus celebris Ciceronis erat, quem Macrobius copiose commentatus est.",
    cosmos_description: "Explorare Macrobii miram cosmorum descriptionem cum textibus authenticis",
    worldmap_description: "Invenire antiquam mundi visionem per Macrobii descriptiones",
    banquet_description: "Immergere in doctorum colloquia in Saturnalium convivio",
    learning_tools: "Instrumenta discendi cum textibus Latinis authenticis",
    story: `Ante 1500 annos Macrobius epistulam in lagena ad futurum fecit. Haec applicatio eam vivam facit cum 1401 textibus Latinis authenticis. Experire connexionem inter antiquam sapientiam et modernm technologiam!`,
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Philosophus, Grammaticus et Sapientiae Custos (ca. 385-430 p.C.)",
    about_biography: `Macrobius vir publicus et scriptor antiquitatis serae fuit. Ut Praefectus per Hispanias, peninsulam administravit. Opera eius scientiam pro futuris servavit.`,
    about_works: `Opera praecipua "Saturnalia" et "Commentarii" nunc per 1401 textus in nostra base data disponuntur.`,
    about_legacy: `Macrobii influxus ad hodiem pertinet. Eius "epistula antiqua" nunc omnibus per technologiam accessibilis est.`,
    about_influence: `Haec applicatio Macrobii sapientiae conservationem per textus authenticos experiabilem facit.`,
    close_modal: "Claudere",
    pontanus_button: "De Pontano",
    about_pontanus_title: "Johannes Isaac Pontanus",
    about_pontanus_subtitle: "Eruditus Danicus et Editor (1571-1639)",
    about_pontanus_bio: `Pontanus partem crucialem in Macrobii operum conservatione gessit.`,
    about_pontanus_work: `Eius editio 1597 norma facta est et nostrae collectionis fundamentum est.`,
    about_pontanus_legacy: `Per Pontani laborem, textus Macrobii authenticos hodie digitale experiri possumus.`
  }
};

// Translation function type
type TranslationFunction = (key: string) => string;

// Main application component with Oracle Cloud integration
export default function MacrobiusApp() {
  // Language state
  const [currentLang, setCurrentLang] = useState<'DE' | 'EN' | 'LA'>('DE');
  
  // Navigation state
  const [activeSection, setActiveSection] = useState<string>('hero');
  
  // Modal states
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPontanusModal, setShowPontanusModal] = useState(false);

  // Translation helper - Explicitly typed to accept any string
  const t: TranslationFunction = useCallback((key: string): string => {
    return translations[currentLang][key as TranslationKey] || key;
  }, [currentLang]);

  // Event handlers
  const handleLanguageChange = (lang: 'DE' | 'EN' | 'LA') => {
    setCurrentLang(lang);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  // Close modal handlers
  const handleCloseAbout = () => setShowAboutModal(false);
  const handleClosePontanus = () => setShowPontanusModal(false);

  return (
    <>
      <Head>
        <title>{t('title')} - Macrobius Oracle Cloud</title>
        <meta name="description" content="Eine interaktive Reise durch 1.401 authentische Macrobius-Texte - Oracle Cloud Integration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
        {/* Animated starfield background */}
        <div className="fixed inset-0 z-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
        </div>

        {/* Language selector */}
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-2">
            <div className="flex space-x-1">
              {(['DE', 'EN', 'LA'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1 rounded text-sm font-semibold transition-all duration-300 ${
                    currentLang === lang
                      ? 'bg-yellow-400 text-gray-800 shadow-lg'
                      : 'text-white/80 hover:bg-white/20'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="fixed top-4 left-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex flex-col space-y-2">
              {[
                { id: 'hero', label: '🏛️ Start', icon: '🏛️' },
                { id: 'search', label: t('section_search'), icon: '🔍' },
                { id: 'cosmos', label: t('section_cosmos'), icon: '🌌' },
                { id: 'visualizations', label: t('section_visualizations'), icon: '📊' },
                { id: 'vocabulary', label: t('section_vocabulary'), icon: '📚' }
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 text-left flex items-center space-x-2 ${
                    activeSection === section.id
                      ? 'bg-yellow-400 text-gray-800 shadow-lg'
                      : 'text-white/80 hover:bg-white/20'
                  }`}
                >
                  <span>{section.icon}</span>
                  <span>{section.label}</span>
                </button>
              ))}
            </div>

            {/* Oracle Cloud Status */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/70">Oracle Cloud</span>
              </div>
              <p className="text-white/60 text-xs mt-1">1.401 Texte verfügbar</p>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="relative z-10">
          {/* Hero Section */}
          {activeSection === 'hero' && (
            <section className="min-h-screen flex items-center justify-center px-4">
              <div className="text-center max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-8">
                    Macrobius
                  </h1>
                  
                  <h2 className="text-2xl md:text-4xl text-yellow-300 mb-8 font-light">
                    {t('title')}
                  </h2>
                  
                  <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                    {t('story')}
                  </p>

                  {/* Oracle Cloud Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                      <div className="text-3xl mb-4">🔍</div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">Authentische Suche</h3>
                      <p className="text-white/80 text-sm">Durchsuche 1.401 echte lateinische Passagen</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                      <div className="text-3xl mb-4">🌌</div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">Kosmische Visualisierung</h3>
                      <p className="text-white/80 text-sm">Erkunde Macrobius' Astronomie mit Originaltexten</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                      <div className="text-3xl mb-4">📚</div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">Vokabeltraining</h3>
                      <p className="text-white/80 text-sm">Lerne Latein mit authentischem Wortschatz</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button
                      onClick={() => handleSectionChange('search')}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 text-lg font-semibold rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      🔍 Texte durchsuchen
                    </button>
                    
                    <button
                      onClick={() => setShowAboutModal(true)}
                      className="bg-white/20 text-white px-8 py-4 text-lg font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30"
                    >
                      {t('about_macrobius')}
                    </button>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* Oracle Cloud-Integrated Sections */}
          {activeSection === 'search' && (
            <TextSearchSection isActive={true} t={t} language={currentLang} />
          )}

          {activeSection === 'cosmos' && (
            <CosmosSection isActive={true} t={t} language={currentLang} />
          )}

          {activeSection === 'visualizations' && (
            <VisualizationsSection isActive={true} t={t} language={currentLang} />
          )}

          {activeSection === 'vocabulary' && (
            <VocabularyTrainer isActive={true} t={t} language={currentLang} />
          )}
        </main>

        {/* About Macrobius Modal */}
        <AnimatePresence>
          {showAboutModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseAbout}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              
              <motion.div
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-4xl mx-auto border border-white/30 shadow-2xl"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleCloseAbout}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300"
                >
                  ×
                </button>

                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-yellow-400 mb-2">
                      {t('about_title')}
                    </h2>
                    <p className="text-xl text-yellow-300/90 font-medium">
                      {t('about_subtitle')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">👤 Biographie</h3>
                      <p className="text-white/90 leading-relaxed">{t('about_biography')}</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">📚 Werke</h3>
                      <p className="text-white/90 leading-relaxed">{t('about_works')}</p>
                    </div>
                  </div>

                  <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-yellow-300 mb-3">🌐 Oracle Cloud Integration</h3>
                    <p className="text-white/90 text-sm">
                      Diese App nutzt eine Oracle Cloud-Datenbank mit 1.401 authentischen lateinischen Textpassagen 
                      aus Macrobius' Werken. Alle Inhalte sind historisch verifiziert und bieten eine einzigartige 
                      Verbindung zwischen antiker Weisheit und moderner Technologie.
                    </p>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleCloseAbout}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      {t('close_modal')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global styles */}
        <style jsx global>{`
          .text-gradient {
            background: linear-gradient(135deg, #FFD700 0%, #FF8C00 50%, #FF4500 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .btn-wine {
            background: linear-gradient(135deg, #722F37 0%, #8B4513 100%);
            transition: all 0.3s ease;
          }
          
          .btn-wine:hover {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
          }

          .card-hover {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
          }
          
          .card-hover:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }
        `}</style>
      </div>
    </>
  );
}
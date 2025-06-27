/**
 * 🏛️ MACROBIUS - COMPLETE FIX FOR ALL ISSUES
 * ✅ FIXED: Navigation showing German text (not translation keys)
 * ✅ FIXED: Runtime stack overflow error (simplified translation logic)
 * ✅ FIXED: Optimized stars animation (fewer stars, occasional movement)
 */

import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Eye, Maximize } from 'lucide-react';
import Image from 'next/image';

// Enhanced Image System
import ImageModal from '../components/ui/ImageModal';
import { getImagesBySection, ImageInfo } from '../data/imageData';

// Oracle Cloud-integrated components - CULTURAL FOCUS
import CosmosSection from '../components/sections/CosmosSection';
import TextSearchSection from '../components/sections/TextSearchSection';  
import VisualizationsSection from '../components/sections/VisualizationsSection';
import BanquetSection from '../components/sections/BanquetSection';
import WorldMapSection from '../components/sections/WorldMapSection';
import LearningSection from '../components/sections/LearningSection-enhanced-complete';
import QuizSection from '../components/sections/QuizSection';

// AI Systems Components
import AICulturalAnalysisSection from '../components/sections/AICulturalAnalysisSection';
import PersonalizedLearningPathsSection from '../components/sections/PersonalizedLearningPathsSection';
import AITutoringSystemSection from '../components/sections/AITutoringSystemSection';
import AdvancedCulturalModulesSection from '../components/sections/AdvancedCulturalModulesSection';

// SIMPLIFIED: Direct translation object (no hooks to avoid stack overflow)
const translations = {
  DE: {
    // Navigation translations - DIRECT German text
    nav_intro: 'Einführung',
    nav_quiz: 'Quiz', 
    nav_worldmap: 'Weltkarte',
    nav_cosmos: 'Kosmos',
    nav_banquet: 'Gastmahl',
    nav_textsearch: 'Textsuche',
    nav_learning: 'Lernen',
    nav_visualizations: 'Visualisierungen',
    nav_ai_systems: 'KI-SYSTEME',
    nav_ai_cultural: 'KI-Kulturanalyse',
    nav_ai_learning: 'Lernpfade',
    nav_ai_tutoring: 'KI-Tutor',
    nav_ai_modules: 'Kulturmodule',
    nav_oracle_status: '1.401 Kulturelle Texte',
    
    // Content translations
    hero_title: 'Eine antike Flaschenpost',
    hero_subtitle: 'Eine Nachricht aus der Antike an die Zukunft',
    cultural_treasures: 'Kulturelle Schätze entdecken',
    click_images_info: 'Klicken Sie auf die Bilder für detaillierte kulturelle Hintergründe und historische Zusammenhänge',
    explore_works: 'ERKUNDEN SIE DIE ZWEI WERKE DES MACROBIUS',
    more_about_macrobius: 'Mehr über Macrobius',
    more_about_pontanus: 'Mehr über Pontanus',
    close_modal: 'Schließen',
    
    // Cultural story
    cultural_story_1: 'Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius eine Flaschenpost an die Zukunft an. Diese "Flaschenpost" waren seine beiden großen Werke: die "Saturnalia" und der "Kommentar zu Scipios Traum". In ihnen bewahrte er das Beste der antiken Kultur - von Ciceros Rhetorik bis zu den Geheimnissen der Astronomie. Seine Mission: das kulturelle Erbe für kommende Generationen zu retten.',
    cultural_story_2: 'Diese App ist unsere moderne Antwort auf Macrobius\' Vision: Durch KI-gestützte Textanalyse, interaktive Visualisierungen und multilinguale Zugänge machen wir seine "Flaschenpost" für das 21. Jahrhundert erlebbar. Entdecken Sie, wie ein spätantiker Gelehrter zur Brücke zwischen der antiken und der modernen Welt wurde.',
    
    // Modal content
    about_title: 'Macrobius Ambrosius Theodosius',
    about_subtitle: 'Kultureller Bewahrer der spätantiken Welt (ca. 385-430 n. Chr.)',
    declining_rome_title: 'Das untergehende Römische Reich',
    declining_rome_subtitle: 'Kultureller Niedergang und die Mission der Gelehrten',
    pontanus_title: 'Johannes Isaac Pontanus & Tycho Brahe',
    pontanus_subtitle: 'Astronomische Renaissance und die Wiederentdeckung antiker Weisheit'
  },
  EN: {
    nav_intro: 'Introduction',
    nav_quiz: 'Quiz',
    nav_worldmap: 'World Map',
    nav_cosmos: 'Cosmos',
    nav_banquet: 'Banquet',
    nav_textsearch: 'Text Search',
    nav_learning: 'Learning',
    nav_visualizations: 'Visualizations',
    nav_ai_systems: 'AI SYSTEMS',
    nav_ai_cultural: 'AI Cultural Analysis',
    nav_ai_learning: 'Learning Paths',
    nav_ai_tutoring: 'AI Tutor',
    nav_ai_modules: 'Cultural Modules',
    nav_oracle_status: '1,401 Cultural Texts',
    
    hero_title: 'An ancient message in a bottle',
    hero_subtitle: 'A message from antiquity to the future',
    cultural_treasures: 'Discover Cultural Treasures',
    click_images_info: 'Click on the images for detailed cultural backgrounds and historical connections',
    explore_works: 'EXPLORE MACROBIUS\' TWO MAJOR WORKS',
    more_about_macrobius: 'More about Macrobius',
    more_about_pontanus: 'More about Pontanus',
    close_modal: 'Close',
    
    cultural_story_1: '1500 years ago, as the Roman Empire approached its end, Macrobius created a message in a bottle to the future. This "message in a bottle" consisted of his two great works: the "Saturnalia" and the "Commentary on Scipio\'s Dream". In them, he preserved the best of ancient culture - from Cicero\'s rhetoric to the secrets of astronomy. His mission: to save the cultural heritage for future generations.',
    cultural_story_2: 'This app is our modern response to Macrobius\' vision: Through AI-powered text analysis, interactive visualizations and multilingual access, we make his "message in a bottle" accessible for the 21st century. Discover how a late antique scholar became the bridge between the ancient and modern worlds.',
    
    about_title: 'Macrobius Ambrosius Theodosius',
    about_subtitle: 'Cultural Preserver of the Late Antique World (ca. 385-430 AD)',
    declining_rome_title: 'The Declining Roman Empire',
    declining_rome_subtitle: 'Cultural Decline and the Mission of Scholars',
    pontanus_title: 'Johannes Isaac Pontanus & Tycho Brahe',
    pontanus_subtitle: 'Astronomical Renaissance and the Rediscovery of Ancient Wisdom'
  },
  LA: {
    nav_intro: 'Introductio',
    nav_quiz: 'Quaestiones',
    nav_worldmap: 'Mappa Mundi',
    nav_cosmos: 'Cosmos',
    nav_banquet: 'Convivium',
    nav_textsearch: 'Quaestio Textuum',
    nav_learning: 'Discere',
    nav_visualizations: 'Visualizationes',
    nav_ai_systems: 'SYSTEMATA AI',
    nav_ai_cultural: 'AI Analysis Culturalis',
    nav_ai_learning: 'Semitae Discendi',
    nav_ai_tutoring: 'AI Praeceptor',
    nav_ai_modules: 'Moduli Culturales',
    nav_oracle_status: '1.401 Textus Culturales',
    
    hero_title: 'Epistula antiqua in lagena',
    hero_subtitle: 'Nuntius ab antiquitate ad futurum',
    cultural_treasures: 'Thesauros Culturales Invenire',
    click_images_info: 'Clicca imagines pro contextu culturali et connexionibus historicis',
    explore_works: 'DUO OPERA MACROBII EXPLORARE',
    more_about_macrobius: 'Magis de Macrobio',
    more_about_pontanus: 'Magis de Pontano',
    close_modal: 'Claudere',
    
    cultural_story_1: 'Ante 1500 annos, cum Imperium Romanum fini appropinquaret, Macrobius epistulam in lagena ad futurum creavit. Haec "epistula in lagena" duo opera magna eius erant: "Saturnalia" et "Commentarius de Somnio Scipionis". In his optimum culturae antiquae servavit - a rhetorica Ciceronis ad secreta astronomiae. Eius missio: patrimonium culturale generationibus futuris servare.',
    cultural_story_2: 'Haec aplicatio nostra responsio moderna ad visionem Macrobii est: Per analysim textus AI adiutam, visualizationes interactivas et accessum multilingualem, eius "epistulam in lagena" pro saeculo XXI accessibilem facimus. Invenite quomodo eruditus antiquitatis serae pons inter mundum antiquum et modernum factus sit.',
    
    about_title: 'Macrobius Ambrosius Theodosius',
    about_subtitle: 'Custos Culturae Mundi Antiquitatis Serae (ca. 385-430 p. Chr.)',
    declining_rome_title: 'Imperium Romanum Cadens',
    declining_rome_subtitle: 'Declinatio Culturalis et Missio Eruditorum',
    pontanus_title: 'Johannes Isaac Pontanus et Tycho Brahe',
    pontanus_subtitle: 'Renascentia Astronomica et Inventio Nova Sapientiae Antiquae'
  }
};

// SIMPLE translation function (no hooks, no recursion)
const getTranslation = (key: string, language: string = 'DE'): string => {
  try {
    const langTranslations = translations[language as keyof typeof translations];
    return langTranslations?.[key as keyof typeof langTranslations] || key;
  } catch (error) {
    console.error('Translation error:', error);
    return key;
  }
};

// Clickable Image Component
interface ClickableImageProps {
  imageInfo: ImageInfo;
  onClick: (imageInfo: ImageInfo) => void;
  className?: string;
  fullSize?: boolean;
}

const ClickableImage: React.FC<ClickableImageProps> = ({ imageInfo, onClick, className = '', fullSize = false }) => {
  return (
    <motion.div
      className={`relative group cursor-pointer overflow-hidden rounded-xl border border-white/20 shadow-lg ${className}`}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(imageInfo)}
    >
      <div className="relative">
        <Image
          src={imageInfo.src}
          alt={imageInfo.title}
          width={fullSize ? 600 : 300}
          height={fullSize ? 450 : 200}
          className={`${fullSize ? 'w-full h-auto' : 'w-full h-48'} object-${fullSize ? 'contain' : 'cover'} transition-transform duration-500 group-hover:scale-110`}
          style={fullSize ? { 
            objectFit: 'contain',
            width: '100%',
            height: 'auto',
            maxHeight: '450px'
          } : {}}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg mb-1">{imageInfo.title}</h3>
            {imageInfo.subtitle && (
              <p className="text-white/90 text-sm">{imageInfo.subtitle}</p>
            )}
          </div>
        </div>
        
        {/* Click Indicator */}
        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Maximize className="w-4 h-4 text-white" />
        </div>
      </div>
      
      {/* Bottom Info */}
      <div className="p-3 bg-white/10 backdrop-blur-sm">
        <p className="text-white/80 text-xs line-clamp-2">{imageInfo.description}</p>
      </div>
    </motion.div>
  );
};

// Main CULTURAL EDUCATION application with COMPLETE FIXES
export default function MacrobiusCulturalApp() {
  // SIMPLIFIED: Direct state management (no complex hooks)
  const [currentLang, setCurrentLang] = useState<'DE' | 'EN' | 'LA'>('DE');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [astrolabeRotation, setAstrolabeRotation] = useState<number>(0);
  
  // Modal states
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPontanusModal, setShowPontanusModal] = useState(false);
  const [showRomeModal, setShowRomeModal] = useState(false);
  
  // Image modal state
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // SIMPLE translation function (no recursion risk)
  const t = (key: string): string => {
    return getTranslation(key, currentLang);
  };

  // Event handlers
  const handleLanguageChange = (lang: 'DE' | 'EN' | 'LA') => {
    setCurrentLang(lang);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setAstrolabeRotation(prev => prev + 45);
  };

  const handleImageClick = (imageInfo: ImageInfo) => {
    setSelectedImage(imageInfo);
    setShowImageModal(true);
  };

  const handleImageModalClose = () => {
    setShowImageModal(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  };

  return (
    <>
      <Head>
        <title>Macrobius - Kulturelle Schätze der Antike</title>
        <meta name="description" content="Entdecken Sie die Kulturschätze der Antike" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Enhanced Evening Sky Gradient Background */}
      <div className="min-h-screen relative overflow-x-hidden" style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 15%, #16213e 30%, #0d1b2a 50%, #0c1821 70%, #0a0e1a 100%)'
      }}>
        {/* OPTIMIZED: Fewer stars with occasional movement */}
        <div className="fixed inset-0 z-0">
          {/* Static stars (30 stars that don't move) */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`static-star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
          
          {/* Some larger static stars (10 stars) */}
          {[...Array(10)].map((_, i) => (
            <div
              key={`large-static-star-${i}`}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${4 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
          
          {/* Few slowly moving stars (only 2) */}
          {[...Array(2)].map((_, i) => (
            <div
              key={`moving-star-${i}`}
              className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `slowMove ${60 + Math.random() * 30}s linear infinite`,
                animationDelay: `${Math.random() * 20}s`,
              }}
            />
          ))}
          
          {/* Rare shooting star (only 1) */}
          <div
            className="shooting-star opacity-30"
            style={{
              top: `${30 + Math.random() * 40}%`,
              animationDelay: `${15 + Math.random() * 10}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
            }}
          />
        </div>

        {/* ENHANCED: More Subtle Rotating Astrolabe Background */}
        <div className="fixed inset-0 z-1 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="opacity-40"
            animate={{ 
              rotate: astrolabeRotation,
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              rotate: { duration: 2, ease: "easeInOut" },
              scale: { duration: 10, ease: "easeInOut", repeat: Infinity }
            }}
          >
            <div className="w-[2000px] h-[2000px]">
              <Image 
                src="/Astrolab.jpg" 
                alt="Historical Astrolabe"
                width={2000}
                height={2000}
                className="w-full h-full object-contain"
                style={{
                  filter: 'hue-rotate(220deg) saturate(0.6) brightness(0.5) contrast(1.2)',
                  mixBlendMode: 'overlay'
                }}
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Floating Macrobius Circle */}
        {activeSection === 'hero' && (
          <motion.div 
            className="fixed top-16 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
            animate={{ 
              y: [0, -15, 0],
              x: [0, -8, 8, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 8,
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          >
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl bg-gradient-to-br from-yellow-400 to-orange-500">
              <Image 
                src="/MacrobiusBottle.jpg" 
                alt="Macrobius with Bottle"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Language Selector */}
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

        {/* FIXED: Navigation Sidebar with Direct German Text */}
        <nav className="fixed top-4 left-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex flex-col space-y-2">
              {/* Core Sections - FIXED: Direct German text */}
              {[
                { id: 'hero', text: t('nav_intro'), icon: '🏛️' },
                { id: 'quiz', text: t('nav_quiz'), icon: '📝' },
                { id: 'worldmap', text: t('nav_worldmap'), icon: '🗺️' },
                { id: 'cosmos', text: t('nav_cosmos'), icon: '🌌' },
                { id: 'banquet', text: t('nav_banquet'), icon: '🍷' },
                { id: 'search', text: t('nav_textsearch'), icon: '🔍' },
                { id: 'learning', text: t('nav_learning'), icon: '📚' },
                { id: 'visualizations', text: t('nav_visualizations'), icon: '📊' }
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 text-left flex items-center space-x-2 btn-wine ${
                    activeSection === section.id
                      ? 'bg-yellow-400 text-gray-800 shadow-lg'
                      : 'text-yellow-300 hover:bg-white/20'
                  }`}
                  style={{
                    backgroundColor: activeSection === section.id ? '#FFD700' : '#722F37',
                    color: activeSection === section.id ? '#1a1a1a' : '#FFD700',
                  }}
                >
                  <span>{section.icon}</span>
                  <span>{section.text}</span>
                </button>
              ))}
              
              {/* AI Systems Separator */}
              <div className="border-t border-white/20 pt-2 mt-2">
                <p className="text-yellow-200/60 text-xs px-2 mb-2">
                  {t('nav_ai_systems')}
                </p>
                {[
                  { id: 'ai-cultural', text: t('nav_ai_cultural'), icon: '🧠' },
                  { id: 'ai-learning', text: t('nav_ai_learning'), icon: '🎯' },
                  { id: 'ai-tutoring', text: t('nav_ai_tutoring'), icon: '📖' },
                  { id: 'ai-modules', text: t('nav_ai_modules'), icon: '✨' }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 text-left flex items-center space-x-2 btn-wine ${
                      activeSection === section.id
                        ? 'bg-blue-400 text-gray-800 shadow-lg'
                        : 'text-blue-300 hover:bg-white/20'
                    }`}
                    style={{
                      backgroundColor: activeSection === section.id ? '#60A5FA' : 'rgba(59, 130, 246, 0.2)',
                      color: activeSection === section.id ? '#1a1a1a' : '#93C5FD',
                    }}
                  >
                    <span>{section.icon}</span>
                    <span>{section.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Oracle Cloud Status */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/70">Oracle Cloud</span>
              </div>
              <p className="text-white/60 text-xs mt-1">
                {t('nav_oracle_status')}
              </p>
            </div>

            {/* Prominent Pontanus Button */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <button
                onClick={() => setShowPontanusModal(true)}
                className="w-full px-3 py-2 text-xs font-medium rounded-lg btn-wine transition-all duration-300 mb-2"
                style={{
                  backgroundColor: '#722F37',
                  color: '#FFD700',
                }}
              >
                {t('more_about_pontanus')}
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10">
          {/* FIXED: Hero Section with Perfect German Text Display */}
          {activeSection === 'hero' && (
            <section className="min-h-screen flex items-center justify-center px-4" style={{ paddingTop: '200px' }}>
              <div className="text-center max-w-7xl mx-auto">
                {/* Main content rectangle */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 mb-8">
                  
                  {/* FIXED: Title and intro text with perfect German translations */}
                  <div className="mb-8">
                    <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                      Macrobius
                    </h1>
                    
                    <h2 className="text-2xl md:text-4xl text-yellow-300 mb-6 font-light">
                      {t('hero_title')}
                    </h2>
                    
                    <h3 className="text-lg md:text-xl text-yellow-200 mb-8 font-medium">
                      {t('hero_subtitle')}
                    </h3>
                  </div>

                  {/* Picture gallery */}
                  <div className="mb-8">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                      <ImageIcon className="w-6 h-6 text-yellow-300" />
                      <h4 className="text-xl font-semibold text-yellow-200">
                        {t('cultural_treasures')}
                      </h4>
                      <Eye className="w-6 h-6 text-yellow-300" />
                    </div>
                    
                    {/* Better grid layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                      {/* "Das untergehende Rom" */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="md:col-span-2 lg:col-span-1"
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-orange-400/60 shadow-2xl"
                          whileHover={{ scale: 1.02, y: -8 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowRomeModal(true)}
                        >
                          <div className="relative">
                            <Image
                              src="/Rome-under.jpg"
                              alt={t('declining_rome_title')}
                              width={400}
                              height={300}
                              className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                              style={{ 
                                objectPosition: 'center 30%'
                              }}
                            />
                            
                            {/* Minimal info overlay ONLY on hover */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="p-4">
                                <h3 className="text-white font-bold text-xl mb-1">
                                  {t('declining_rome_title')}
                                </h3>
                                <p className="text-white/95 text-sm">
                                  {t('declining_rome_subtitle')}
                                </p>
                              </div>
                            </div>
                            
                            <div className="absolute top-3 right-3 bg-orange-500/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Maximize className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                      
                      {/* Macrobius Portrait */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-yellow-400/60 shadow-xl"
                          whileHover={{ scale: 1.02, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowAboutModal(true)}
                        >
                          <div className="relative">
                            <div className="w-full relative overflow-hidden" style={{ minHeight: '320px' }}>
                              <Image
                                src="/MacrobiusBottle.jpg"
                                alt={t('about_title')}
                                width={400}
                                height={500}
                                className="w-full h-auto object-contain"
                                style={{
                                  objectFit: 'contain',
                                  width: '100%',
                                  height: 'auto',
                                  minHeight: '320px'
                                }}
                              />
                            </div>
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-white font-bold text-lg mb-1">
                                  {t('about_title')}
                                </h3>
                                <p className="text-white/90 text-sm">
                                  {t('about_subtitle')}
                                </p>
                              </div>
                            </div>
                            
                            <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Maximize className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Tycho & Pontanus */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-blue-400/60 shadow-xl"
                          whileHover={{ scale: 1.02, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowPontanusModal(true)}
                        >
                          <div className="relative">
                            <div className="w-full relative overflow-hidden" style={{ minHeight: '320px' }}>
                              <Image
                                src="/TychoAssistent.jpg"
                                alt={t('pontanus_title')}
                                width={400}
                                height={500}
                                className="w-full h-auto object-contain"
                                style={{
                                  objectFit: 'contain',
                                  width: '100%',
                                  height: 'auto',
                                  minHeight: '320px'
                                }}
                              />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-white font-bold text-lg mb-1">
                                  {t('pontanus_title')}
                                </h3>
                                <p className="text-white/90 text-sm">
                                  {t('pontanus_subtitle')}
                                </p>
                              </div>
                            </div>
                          </div>
                            
                            <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Maximize className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    {/* Display Macrobius and Son picture */}
                    <div className="mt-8 flex justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="max-w-2xl"
                      >
                        <ClickableImage
                          imageInfo={{
                            id: 'macrobius-eustachius',
                            src: '/Macrobius-and-Eustachius.jpg',
                            title: currentLang === 'DE' ? 'Macrobius und sein Sohn Eustachius' :
                                   currentLang === 'EN' ? 'Macrobius and his son Eustachius' :
                                   'Macrobius et filius eius Eustachius',
                            subtitle: currentLang === 'DE' ? 'Familiäre Überlieferung des Wissens' :
                                      currentLang === 'EN' ? 'Familial transmission of knowledge' :
                                      'Traditio familiaris scientiae',
                            description: currentLang === 'DE' ? 'Macrobius mit seinem Sohn, dem er seine Werke widmete' :
                                         currentLang === 'EN' ? 'Macrobius with his son, to whom he dedicated his works' :
                                         'Macrobius cum filio suo, cui opera sua dedicavit',
                            section: 'intro'
                          }}
                          onClick={handleImageClick}
                          className="max-w-2xl border-2 border-amber-400/60 shadow-xl"
                          fullSize={true}
                        />
                      </motion.div>
                    </div>
                    
                    <p className="text-yellow-200/80 text-sm mt-6 italic">
                      📸 {t('click_images_info')}
                    </p>
                  </div>

                  {/* FIXED: Complete cultural story text with proper German display */}
                  <div className="max-w-4xl mx-auto mb-8">
                    <p className="text-base md:text-lg text-white/90 leading-relaxed text-justify mb-6">
                      {t('cultural_story_1')}
                    </p>
                    
                    <p className="text-base md:text-lg text-yellow-100/80 leading-relaxed text-justify">
                      {t('cultural_story_2')}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => handleSectionChange('banquet')}
                    className="btn-wine px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                    }}
                  >
                    {t('explore_works')}
                  </button>
                  
                  <button
                    onClick={() => setShowAboutModal(true)}
                    className="btn-wine px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                    }}
                  >
                    {t('more_about_macrobius')}
                  </button>

                  <button
                    onClick={() => setShowPontanusModal(true)}
                    className="btn-wine px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                    }}
                  >
                    {t('more_about_pontanus')}
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Other sections */}
          {activeSection === 'search' && (
            <TextSearchSection isActive={true} t={t} language={currentLang} />
          )}

          {activeSection === 'cosmos' && (
            <CosmosSection isActive={true} t={t} language={currentLang} />
          )}

          {activeSection === 'banquet' && (
            <BanquetSection isActive={true} t={t} language={currentLang} />
          )}

          {activeSection === 'worldmap' && (
            <WorldMapSection isActive={true} t={t} language={currentLang} />
          )}

          {activeSection === 'quiz' && (
            <QuizSection isActive={true} language={currentLang} />
          )}

          {activeSection === 'learning' && (
            <LearningSection />
          )}

          {activeSection === 'visualizations' && (
            <VisualizationsSection isActive={true} t={t} language={currentLang} />
          )}

          {/* AI Systems Sections */}
          {activeSection === 'ai-cultural' && (
            <AICulturalAnalysisSection language={currentLang} />
          )}

          {activeSection === 'ai-learning' && (
            <PersonalizedLearningPathsSection language={currentLang} />
          )}

          {activeSection === 'ai-tutoring' && (
            <AITutoringSystemSection language={currentLang} />
          )}

          {activeSection === 'ai-modules' && (
            <AdvancedCulturalModulesSection language={currentLang} />
          )}
        </main>

        {/* Enhanced Image Modal */}
        <ImageModal
          imageInfo={selectedImage}
          isOpen={showImageModal}
          onClose={handleImageModalClose}
          language={currentLang}
        />

        {/* About Macrobius Modal */}
        <AnimatePresence>
          {showAboutModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAboutModal(false)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              
              <motion.div
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-6xl mx-auto border border-white/30 shadow-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300 z-10"
                >
                  ×
                </button>

                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-yellow-400 mb-2">
                      {t('about_title')}
                    </h2>
                    <p className="text-xl text-yellow-300/90 font-medium">
                      {t('about_subtitle')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="relative">
                      <Image 
                        src="/MacrobiusBottle.jpg" 
                        alt="Macrobius Portrait"
                        width={256}
                        height={320}
                        className="w-full h-80 object-cover rounded-xl border-4 border-yellow-400 shadow-xl"
                      />
                    </div>
                    
                    <div className="relative">
                      <Image 
                        src="/MacrobI.JPG" 
                        alt="Macrobius Book Volume I"
                        width={256}
                        height={320}
                        className="w-full h-80 object-cover rounded-xl border-4 border-amber-400 shadow-xl"
                      />
                    </div>
                    
                    <div className="relative">
                      <Image 
                        src="/MacrobiRegal.jpg" 
                        alt="Macrobius Books on Shelf"
                        width={256}
                        height={320}
                        className="w-full h-80 object-cover rounded-xl border-4 border-amber-400 shadow-xl"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setShowAboutModal(false)}
                      className="btn-wine px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: '#722F37',
                        color: '#FFD700',
                      }}
                    >
                      {t('close_modal')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Combined Pontanus & Tycho Modal */}
        <AnimatePresence>
          {showPontanusModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPontanusModal(false)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              
              <motion.div
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-6xl mx-auto border border-white/30 shadow-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowPontanusModal(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300 z-10"
                >
                  ×
                </button>

                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-blue-400 mb-2">
                      {t('pontanus_title')}
                    </h2>
                    <p className="text-xl text-blue-300/90 font-medium">
                      {t('pontanus_subtitle')}
                    </p>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setShowPontanusModal(false)}
                      className="btn-wine px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: '#722F37',
                        color: '#FFD700',
                      }}
                    >
                      {t('close_modal')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* "Das untergehende Rom" Modal */}
        <AnimatePresence>
          {showRomeModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRomeModal(false)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              
              <motion.div
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-6xl mx-auto border border-white/30 shadow-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowRomeModal(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300 z-10"
                >
                  ×
                </button>

                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-red-400 mb-2">
                      {t('declining_rome_title')}
                    </h2>
                    <p className="text-xl text-red-300/90 font-medium">
                      {t('declining_rome_subtitle')}
                    </p>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setShowRomeModal(false)}
                      className="btn-wine px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: '#722F37',
                        color: '#FFD700',
                      }}
                    >
                      {t('close_modal')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced CSS Styles */}
        <style jsx global>{`
          .btn-wine {
            background: linear-gradient(135deg, #722F37 0%, #8B4513 100%);
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(114, 47, 55, 0.3);
          }
          
          .btn-wine:hover {
            background: linear-gradient(135deg, #8B4513 0%, #722F37 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* FIXED: Static star twinkling animation */
          @keyframes twinkle {
            0%, 100% { 
              opacity: 0.3; 
              transform: scale(0.8); 
            }
            50% { 
              opacity: 1; 
              transform: scale(1.2); 
            }
          }

          /* FIXED: Slow moving star animation */
          @keyframes slowMove {
            0% { 
              transform: translateX(0) translateY(0);
              opacity: 0.3; 
            }
            25% { 
              opacity: 0.8;
            }
            50% { 
              transform: translateX(-30px) translateY(-15px);
              opacity: 0.6;
            }
            75% { 
              opacity: 0.9;
            }
            100% { 
              transform: translateX(-60px) translateY(-30px);
              opacity: 0.3; 
            }
          }
        `}</style>
      </div>
    </>
  );
}
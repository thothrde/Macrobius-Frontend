/**
 * 🏛️ MACROBIUS - CULTURAL EDUCATION PLATFORM
 * Late Antiquity Cultural Wisdom through Complete Corpus
 * ENHANCED: Rich Clickable Image System + AI Systems + Cultural Education Focus
 * 
 * MISSION: Transform components to teach what Macrobius reveals about late antiquity culture (PRIMARY)
 * with Latin as supporting tool (SECONDARY)
 */

import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Image as ImageIcon, Book, Star, Eye, Maximize, Brain, Target, BookOpen, Sparkles } from 'lucide-react';

// Enhanced Image System
import ImageModal from '../components/ui/ImageModal';
import { imageDatabase, getImagesBySection, ImageInfo } from '../data/imageData';

// Oracle Cloud-integrated components - CULTURAL FOCUS
import CosmosSection from '../components/sections/CosmosSection';
import TextSearchSection from '../components/sections/TextSearchSection';  
import VisualizationsSection from '../components/sections/VisualizationsSection';
import VocabularyTrainer from '../components/sections/VocabularyTrainer';
import BanquetSection from '../components/sections/BanquetSection';
import WorldMapSection from '../components/sections/WorldMapSection';
import LearningSection from '../components/sections/LearningSection-enhanced-complete';
// Fix: Import correct QuizSection
import QuizSection from '../components/sections/QuizSection';

// AI Systems Components
import AICulturalAnalysisSection from '../components/sections/AICulturalAnalysisSection';
import PersonalizedLearningPathsSection from '../components/sections/PersonalizedLearningPathsSection';
import AITutoringSystemSection from '../components/sections/AITutoringSystemSection';
import AdvancedCulturalModulesSection from '../components/sections/AdvancedCulturalModulesSection';

// Language type - Fix TypeScript issues
type Language = 'DE' | 'EN' | 'LA';

// Translation types
type TranslationKey = 
  | 'title' | 'intro' | 'section_intro' | 'section_quiz' | 'section_worldmap' 
  | 'section_cosmos' | 'section_banquet' | 'section_search' | 'section_learning' 
  | 'section_visualizations' | 'section_vocabulary' | 'explore_texts' | 'about_macrobius' 
  | 'search_placeholder' | 'cultural_story' | 'cultural_focus' | 'late_antiquity_wisdom'
  | 'about_title' | 'about_subtitle' | 'about_biography' | 'about_works' | 'about_legacy' 
  | 'close_modal' | 'pontanus_button' | 'about_pontanus_title' | 'about_pontanus_subtitle' 
  | 'about_pontanus_bio' | 'about_pontanus_work' | 'about_pontanus_legacy'
  | 'section_ai_cultural' | 'section_ai_learning' | 'section_ai_tutoring' | 'section_ai_modules';

type TranslationTexts = Record<TranslationKey, string>;
type Translations = Record<Language, TranslationTexts>;

// Enhanced CULTURAL EDUCATION translation system
const translations: Translations = {
  DE: {
    title: "Eine antike Flaschenpost",
    intro: "Kulturelle Bildung durch das vollständige Macrobius-Korpus",
    section_intro: "🏛️ EINFÜHRUNG", 
    section_quiz: "📝 QUIZ",
    section_worldmap: "🗺️ WELTKARTE",
    section_cosmos: "🌌 KOSMOS",
    section_banquet: "🍷 GASTMAHL", 
    section_search: "🔍 TEXTSUCHE",
    section_learning: "📚 LERNEN",
    section_visualizations: "📊 VISUALISIERUNGEN",
    section_vocabulary: "📖 VOKABELN",
    section_ai_cultural: "🧠 KI-KULTURANALYSE",
    section_ai_learning: "🎯 LERNPFADE",
    section_ai_tutoring: "📖 KI-TUTOR",
    section_ai_modules: "✨ KULTURMODULE",
    explore_texts: "Erkunden Sie die Texte",
    about_macrobius: "Über Macrobius",
    search_placeholder: "Suche in 1.401 authentischen Passagen...",
    cultural_story: `Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius, ein führender Verwaltungsbeamter und Gelehrter im Norden Italiens, eine Flaschenpost an die Zukunft an. Diese Flaschenpost bestand aus zwei Texten: Einer ungezwungenen Gesprächsrunde gebildeter Römer und einem Traumkommentar. In beidem versuchte Macrobius das, was ihm an der untergehenden Zivilisation der Antike wichtig war, in einer Weise zu verpacken, die die heranziehenden dunklen Jahrhunderte überstand und zukünftige Leser anregte, den Zivilisationsprozess wieder in Gang zu setzen mit der Erinnerung an die antike Zivilisation als Ermutigung und Materialquelle. Vor 500 Jahren begann dieser Neuanfang. In Dänemark durch astronomische Beobachtungen Tycho Brahes, der damit den Grundstein für Keplers Arbeit und das Entstehen moderner Naturwissenschaften legte. Ein Assistent Tychos erinnerte sich an Macrobius Flaschenpost und stellte erstmals eine zuverlässige und kommentierte Gesamtausgabe zusammen. Dieses Buch kam in meine Hände und ich auf die Idee, eine kleine App für euch zu dieser Geschichte zu basteln.... Viel Spaß!`,
    cultural_focus: "Was Macrobius über die spätantike Kultur lehrt",
    late_antiquity_wisdom: "Spätantike Weisheit für die moderne Welt",
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Kultureller Bewahrer der spätantiken Welt (ca. 385-430 n. Chr.)",
    about_biography: `Macrobius war ein spätantiker römischer Beamter, der als Praefectus praetorio per Hispanias die iberische Halbinsel verwaltete. Als Gelehrter und Kulturbewahrer dokumentierte er die reichhaltige Bildungskultur der untergehenden römischen Zivilisation.`,
    about_works: `Seine Hauptwerke "Saturnalia" und "Commentarii in Somnium Scipionis" bewahren unschätzbares Wissen über römische Kultur, Philosophie, Astronomie und Gesellschaft. Heute verfügbar durch 1.401 digitalisierte Passagen.`,
    about_legacy: `Macrobius' kulturelle "Flaschenpost" überlebte das dunkle Zeitalter und inspirierte die Renaissance. Seine systematische Bewahrung antiker Weisheit macht ihn zu einem der wichtigsten Kulturvermittler der Geschichte.`,
    close_modal: "Schließen",
    pontanus_button: "Über Pontanus",
    about_pontanus_title: "Johannes Isaac Pontanus",
    about_pontanus_subtitle: "Dänischer Gelehrter und Tycho Brahes Assistent (1571-1639)",
    about_pontanus_bio: `Pontanus war Assistent des berühmten Astronomen Tycho Brahe und erinnerte sich an Macrobius' Bedeutung für die Astronomie. Er erkannte die Verbindung zwischen antiker Weisheit und moderner Naturwissenschaft.`,
    about_pontanus_work: `Seine kommentierte Gesamtausgabe von 1597 wurde zur Standardreferenz und ermöglichte es, Macrobius' Kulturwissen für die Neuzeit zu erschließen.`,
    about_pontanus_legacy: `Durch Pontanus' Arbeit wurde die Brücke zwischen antiker Kultur und Renaissance-Gelehrsamkeit geschlagen. Seine Edition ist die Grundlage unserer digitalen Sammlung.`
  },
  EN: {
    title: "An Ancient Message in a Bottle",
    intro: "Cultural Education through the Complete Macrobius Corpus",
    section_intro: "🏛️ INTRODUCTION",
    section_quiz: "📝 QUIZ", 
    section_worldmap: "🗺️ WORLD MAP",
    section_cosmos: "🌌 COSMOS",
    section_banquet: "🍷 BANQUET",
    section_search: "🔍 TEXT SEARCH", 
    section_learning: "📚 LEARNING",
    section_visualizations: "📊 VISUALIZATIONS",
    section_vocabulary: "📖 VOCABULARY",
    section_ai_cultural: "🧠 AI CULTURAL ANALYSIS",
    section_ai_learning: "🎯 LEARNING PATHS",
    section_ai_tutoring: "📖 AI TUTOR",
    section_ai_modules: "✨ CULTURAL MODULES",
    explore_texts: "Explore the Texts",
    about_macrobius: "About Macrobius", 
    search_placeholder: "Search through 1,401 authentic passages...",
    cultural_story: `1500 years ago, as the Roman Empire approached its end, Macrobius, a leading administrative official and scholar in northern Italy, created a message in a bottle to the future. This message consisted of two texts: an informal conversation among educated Romans and a dream commentary. In both, Macrobius tried to package what was important to him about the declining civilization of antiquity in a way that would survive the approaching dark centuries and inspire future readers to restart the process of civilization with the memory of ancient civilization as encouragement and material source. 500 years ago this new beginning started. In Denmark through astronomical observations by Tycho Brahe, who thus laid the foundation for Kepler's work and the emergence of modern natural sciences. An assistant of Tycho's remembered Macrobius' message in a bottle and compiled the first reliable and annotated complete edition. This book came into my hands and I had the idea to create a small app for you about this story.... Have fun!`,
    cultural_focus: "What Macrobius Teaches About Late Antique Culture",
    late_antiquity_wisdom: "Late Antique Wisdom for the Modern World",
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Cultural Preserver of the Late Antique World (ca. 385-430 AD)",
    about_biography: `Macrobius was a late antique Roman official who administered the Iberian Peninsula as Praefectus praetorio per Hispanias. As a scholar and cultural preserver, he documented the rich educational culture of the declining Roman civilization.`,
    about_works: `His main works "Saturnalia" and "Commentarii in Somnium Scipionis" preserve invaluable knowledge about Roman culture, philosophy, astronomy, and society. Now available through 1,401 digitized passages.`,
    about_legacy: `Macrobius' cultural "message in a bottle" survived the dark ages and inspired the Renaissance. His systematic preservation of ancient wisdom makes him one of history's most important cultural mediators.`,
    close_modal: "Close",
    pontanus_button: "About Pontanus",
    about_pontanus_title: "Johannes Isaac Pontanus", 
    about_pontanus_subtitle: "Danish Scholar and Tycho Brahe's Assistant (1571-1639)",
    about_pontanus_bio: `Pontanus was an assistant to the famous astronomer Tycho Brahe and remembered Macrobius' significance for astronomy. He recognized the connection between ancient wisdom and modern natural science.`,
    about_pontanus_work: `His annotated complete edition of 1597 became the standard reference and made it possible to unlock Macrobius' cultural knowledge for the modern era.`,
    about_pontanus_legacy: `Through Pontanus' work, the bridge between ancient culture and Renaissance scholarship was built. His edition is the foundation of our digital collection.`
  },
  LA: {
    title: "Epistula Antiqua in Lagena",
    intro: "Educatio Culturalis per Corpus Macrobii Completum",
    section_intro: "🏛️ INTRODUCTIO",
    section_quiz: "📝 QUAESTIONES",
    section_worldmap: "🗺️ MAPPA MUNDI", 
    section_cosmos: "🌌 COSMOS",
    section_banquet: "🍷 CONVIVIUM",
    section_search: "🔍 TEXTUS QUAERERE",
    section_learning: "📚 DISCERE",
    section_visualizations: "📊 IMAGINES",
    section_vocabulary: "📖 VOCABULARIUM",
    section_ai_cultural: "🧠 AI ANALYSIS CULTURALIS",
    section_ai_learning: "🎯 SEMITAE DISCENDI",
    section_ai_tutoring: "📖 AI PRAECEPTOR",
    section_ai_modules: "✨ MODULI CULTURALES",
    explore_texts: "Textus Explorare",
    about_macrobius: "De Macrobio",
    search_placeholder: "Quaerere in 1401 textibus authenticis...",
    cultural_story: `Ante 1500 annos, cum Imperium Romanum fini appropinquaret, Macrobius, praefectus et eruditus in Italia septentrionali, epistulam in lagena ad futurum condidit. Haec epistula ex duobus textibus constabat: colloquio informali eruditorum Romanorum et commentario somnii. In utrisque Macrobius id quod de civilizatione antiqua cadente sibi carum erat, ita componere studuit ut saecula tenebrosa superaret et lectores futuros ad civilizationis processum renovandum incitaret. Ante 500 annos hoc renovamen incepit. In Dania per observationes astronomicas Tychonis Brahe, qui fundamenta Kepleri operis et scientiarum naturalium modernarum posuit. Tychonis adiutor Macrobii epistulam recordatus primam editionem completam et annotatam composuit. Hic liber in manus meas venit et mihi idea venit hanc parvam applicationem de hac historia facere.... Gaude!`,
    cultural_focus: "Quid Macrobius de Cultura Antiquitatis Serae Doceat",
    late_antiquity_wisdom: "Sapientia Antiquitatis Serae pro Mundo Moderno",
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Culturae Custos Mundi Antiquitatis Serae (ca. 385-430 p.C.)",
    about_biography: `Macrobius vir publicus antiquitatis serae fuit qui Hispanias ut Praefectus administravit. Ut eruditus et culturae custos, divitem culturam educationalem civilizationis Romanae cadentis documentavit.`,
    about_works: `Opera praecipua "Saturnalia" et "Commentarii in Somnium Scipionis" scientiam inestimabilem de cultura, philosophia, astronomia et societate Romana servant. Nunc per 1401 textus digitales disponuntur.`,
    about_legacy: `Macrobii culturalis "epistula in lagena" saecula tenebrosa superavit et Renascentiam inspiravit. Eius systematica conservatio sapientiae antiquae eum inter praecipuos culturae mediatores facit.`,
    close_modal: "Claudere",
    pontanus_button: "De Pontano",
    about_pontanus_title: "Johannes Isaac Pontanus",
    about_pontanus_subtitle: "Eruditus Danicus et Tychonis Adiutor (1571-1639)",
    about_pontanus_bio: `Pontanus adiutor celebris astronomi Tychonis Brahe fuit et Macrobii momentum pro astronomia recordatus est. Connexionem inter sapientiam antiquam et scientiam naturalem modernam cognovit.`,
    about_pontanus_work: `Eius editio completa annotata 1597 norma facta est et Macrobii scientiam culturalem pro aetate moderna aperire permisit.`,
    about_pontanus_legacy: `Per Pontani laborem, pons inter culturam antiquam et eruditionem Renascentiae aedificatus est. Eius editio fundamentum nostrae collectionis digitalis est.`
  }
};

// Clickable Image Component
interface ClickableImageProps {
  imageInfo: ImageInfo;
  onClick: (imageInfo: ImageInfo) => void;
  className?: string;
}

const ClickableImage: React.FC<ClickableImageProps> = ({ imageInfo, onClick, className = '' }) => {
  return (
    <motion.div
      className={`relative group cursor-pointer overflow-hidden rounded-xl border border-white/20 shadow-lg ${className}`}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(imageInfo)}
    >
      <div className="relative">
        <img
          src={imageInfo.src}
          alt={imageInfo.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
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

// Main CULTURAL EDUCATION application
export default function MacrobiusCulturalApp() {
  // Language state - Fix TypeScript by being explicit about the type
  const [currentLang, setCurrentLang] = useState<Language>('DE');
  
  // Navigation state
  const [activeSection, setActiveSection] = useState<string>('hero');
  
  // Modal states
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPontanusModal, setShowPontanusModal] = useState(false);
  
  // Image modal state
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // Mouse position for parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Translation helper
  const t = useCallback((key: TranslationKey): string => {
    return translations[currentLang][key] || key;
  }, [currentLang]);

  // Type adapter for components - Fix the type issue
  const tAdapter = useCallback((key: string): string => {
    if (key in translations[currentLang]) {
      return translations[currentLang][key as TranslationKey];
    }
    return key;
  }, [currentLang]);

  // Image click handler - Fixed: Ensures consistent behavior
  const handleImageClick = useCallback((imageInfo: ImageInfo) => {
    setSelectedImage(imageInfo);
    setShowImageModal(true);
  }, []);

  // Image modal close handler - Fixed: Proper state cleanup
  const handleImageModalClose = useCallback(() => {
    setShowImageModal(false);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  }, []);

  // Mouse move handler for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Event handlers
  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  // Get images for different sections
  const introImages = getImagesBySection('intro');
  const cosmosImages = getImagesBySection('cosmos') || [];
  const worldmapImages = getImagesBySection('worldmap') || [];
  const banquetImages = getImagesBySection('banquet') || [];
  const visualizationImages = getImagesBySection('visualizations') || [];

  return (
    <>
      <Head>
        <title>{t('title')} - Macrobius Cultural Education</title>
        <meta name="description" content="Kulturelle Bildung durch das vollständige Macrobius-Korpus - Spätantike Weisheit für die moderne Welt" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* RESTORED: Authentic Azure Evening Gradient Background */}
      <div className="min-h-screen relative overflow-x-hidden" style={{
        background: 'linear-gradient(135deg, #007BC7 0%, #005A9C 50%, #004080 100%)'
      }}>
        {/* Enhanced Animated Starfield with Parallax */}
        <div className="fixed inset-0 z-0">
          {[...Array(150)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.8 + 0.2,
                transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`,
                transition: 'transform 0.5s ease-out',
              }}
            />
          ))}
          {/* Moving stars from right to left */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`moving-${i}`}
              className="absolute w-2 h-2 bg-yellow-200 rounded-full animate-pulse"
              style={{
                left: `${100 + (i * 50)}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animation: `moveStars 20s linear infinite, pulse 2s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* Astrolabe Background Motif */}
        <div className="fixed inset-0 z-0 opacity-10">
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-yellow-400 rounded-full"
            style={{
              transform: `translate(-50%, -50%) rotate(${activeSection === 'cosmos' ? '45deg' : '0deg'})`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            <div className="absolute inset-4 border border-yellow-400 rounded-full">
              <div className="absolute inset-4 border border-yellow-400 rounded-full">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-yellow-400"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-yellow-400"></div>
              </div>
            </div>
          </div>
        </div>

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

        {/* ENHANCED: Navigation Sidebar with AI Systems */}
        <nav className="fixed top-4 left-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex flex-col space-y-2">
              {/* Core Sections */}
              {[
                { id: 'hero', label: t('section_intro'), icon: '🏛️' },
                { id: 'quiz', label: t('section_quiz'), icon: '📝' },
                { id: 'worldmap', label: t('section_worldmap'), icon: '🗺️' },
                { id: 'cosmos', label: t('section_cosmos'), icon: '🌌' },
                { id: 'banquet', label: t('section_banquet'), icon: '🍷' },
                { id: 'search', label: t('section_search'), icon: '🔍' },
                { id: 'learning', label: t('section_learning'), icon: '📚' },
                { id: 'visualizations', label: t('section_visualizations'), icon: '📊' }
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
                  <span>{section.label}</span>
                </button>
              ))}
              
              {/* AI Systems Separator */}
              <div className="border-t border-white/20 pt-2 mt-2">
                <p className="text-yellow-200/60 text-xs px-2 mb-2">KI-SYSTEME</p>
                {[
                  { id: 'ai-cultural', label: t('section_ai_cultural'), icon: '🧠' },
                  { id: 'ai-learning', label: t('section_ai_learning'), icon: '🎯' },
                  { id: 'ai-tutoring', label: t('section_ai_tutoring'), icon: '📖' },
                  { id: 'ai-modules', label: t('section_ai_modules'), icon: '✨' }
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
                    <span>{section.label}</span>
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
              <p className="text-white/60 text-xs mt-1">1.401 Kulturelle Texte</p>
            </div>

            {/* Pontanus Button */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <button
                onClick={() => setShowPontanusModal(true)}
                className="w-full px-3 py-2 text-xs font-medium rounded-lg btn-wine transition-all duration-300"
                style={{
                  backgroundColor: '#722F37',
                  color: '#FFD700',
                }}
              >
                {t('pontanus_button')}
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10">
          {/* Enhanced Hero Section with Clickable Images */}
          {activeSection === 'hero' && (
            <section className="min-h-screen flex items-center justify-center px-4">
              <div className="text-center max-w-7xl mx-auto">
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
                  
                  <h3 className="text-xl md:text-2xl text-yellow-200 mb-12 font-medium">
                    {t('cultural_focus')}
                  </h3>
                  
                  <div className="max-w-4xl mx-auto mb-12">
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                      {t('cultural_story')}
                    </p>
                  </div>

                  {/* Enhanced Clickable Image Gallery */}
                  <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <div className="flex items-center justify-center space-x-3 mb-8">
                      <ImageIcon className="w-6 h-6 text-yellow-300" />
                      <h4 className="text-xl font-semibold text-yellow-200">Kulturelle Schätze entdecken</h4>
                      <Eye className="w-6 h-6 text-yellow-300" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                      {introImages.map((image, index) => (
                        <motion.div
                          key={image.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + (index * 0.1), duration: 0.6 }}
                        >
                          <ClickableImage
                            imageInfo={image}
                            onClick={handleImageClick}
                            className="h-64"
                          />
                        </motion.div>
                      ))}
                    </div>
                    
                    <p className="text-yellow-200/80 text-sm mt-6 italic">
                      📸 Klicken Sie auf die Bilder für detaillierte kulturelle Hintergründe
                    </p>
                  </motion.div>

                  {/* Cultural Education Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 card-hover">
                      <div className="text-4xl mb-4">🏛️</div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">Römische Kultur</h3>
                      <p className="text-white/80 text-sm">Was Macrobius über spätantike Gesellschaft und Bildung lehrt</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 card-hover">
                      <div className="text-4xl mb-4">🌌</div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">Antike Kosmologie</h3>
                      <p className="text-white/80 text-sm">Himmelskunde und Philosophie der späten Antike</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 card-hover">
                      <div className="text-4xl mb-4">🍷</div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">Gelehrte Gespräche</h3>
                      <p className="text-white/80 text-sm">Bildungskultur und Wissensvermittlung bei Römern</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button
                      onClick={() => handleSectionChange('banquet')}
                      className="btn-wine px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      style={{
                        backgroundColor: '#722F37',
                        color: '#FFD700',
                      }}
                    >
                      🍷 Kulturelle Entdeckung beginnen
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

          {/* Oracle Cloud-Integrated Sections - CULTURAL FOCUS - Fix: Pass language prop correctly */}
          {activeSection === 'search' && (
            <TextSearchSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}

          {activeSection === 'cosmos' && (
            <div>
              <CosmosSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
              {/* Add clickable images to Cosmos section */}
              {cosmosImages.length > 0 && (
                <div className="fixed bottom-4 right-4 z-40">
                  <motion.div
                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex flex-col space-y-2">
                      <h4 className="text-yellow-200 text-sm font-semibold">🌌 Kosmos Bilder</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {cosmosImages.slice(0, 4).map((image, index) => (
                          <img
                            key={image.id}
                            src={image.src}
                            alt={image.title}
                            className="w-12 h-12 object-cover rounded cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => handleImageClick(image)}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'banquet' && (
            <div>
              <BanquetSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
              {/* Add clickable images to Banquet section */}
              {banquetImages.length > 0 && (
                <div className="fixed bottom-4 right-4 z-40">
                  <motion.div
                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex flex-col space-y-2">
                      <h4 className="text-yellow-200 text-sm font-semibold">🍷 Gastmahl Bilder</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {banquetImages.slice(0, 4).map((image, index) => (
                          <img
                            key={image.id}
                            src={image.src}
                            alt={image.title}
                            className="w-12 h-12 object-cover rounded cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => handleImageClick(image)}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'worldmap' && (
            <div>
              <WorldMapSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
              {/* Add clickable images to WorldMap section */}
              {worldmapImages.length > 0 && (
                <div className="fixed bottom-4 right-4 z-40">
                  <motion.div
                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex flex-col space-y-2">
                      <h4 className="text-yellow-200 text-sm font-semibold">🗺️ Weltkarte Bilder</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {worldmapImages.slice(0, 4).map((image, index) => (
                          <img
                            key={image.id}
                            src={image.src}
                            alt={image.title}
                            className="w-12 h-12 object-cover rounded cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => handleImageClick(image)}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'quiz' && (
            <QuizSection isActive={true} t={tAdapter} />
          )}

          {activeSection === 'learning' && (
            <LearningSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}

          {activeSection === 'visualizations' && (
            <div>
              <VisualizationsSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
              {/* Add clickable images to Visualizations section */}
              {visualizationImages.length > 0 && (
                <div className="fixed bottom-4 right-4 z-40">
                  <motion.div
                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex flex-col space-y-2">
                      <h4 className="text-yellow-200 text-sm font-semibold">📊 Visualisierungen</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {visualizationImages.slice(0, 4).map((image, index) => (
                          <img
                            key={image.id}
                            src={image.src}
                            alt={image.title}
                            className="w-12 h-12 object-cover rounded cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => handleImageClick(image)}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}

          {/* AI Systems Sections */}
          {activeSection === 'ai-cultural' && (
            <AICulturalAnalysisSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}

          {activeSection === 'ai-learning' && (
            <PersonalizedLearningPathsSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}

          {activeSection === 'ai-tutoring' && (
            <AITutoringSystemSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}

          {activeSection === 'ai-modules' && (
            <AdvancedCulturalModulesSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}
        </main>

        {/* Enhanced Image Modal - Fixed Issues */}
        <ImageModal
          imageInfo={selectedImage}
          isOpen={showImageModal}
          onClose={handleImageModalClose}
          language={currentLang}
        />

        {/* About Macrobius Modal - CULTURAL FOCUS */}
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
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-4xl mx-auto border border-white/30 shadow-2xl"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowAboutModal(false)}
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
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">🏛️ Kultureller Kontext</h3>
                      <p className="text-white/90 leading-relaxed">{t('about_biography')}</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">📚 Kulturelle Werke</h3>
                      <p className="text-white/90 leading-relaxed">{t('about_works')}</p>
                    </div>
                  </div>

                  <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-yellow-300 mb-3">🌐 Kulturelle Bildung</h3>
                    <p className="text-white/90 text-sm">
                      Diese App nutzt das vollständige Macrobius-Korpus mit 1.401 authentischen Passagen 
                      zur kulturellen Bildung. Entdecke, was Macrobius über spätantike Kultur, Gesellschaft, 
                      Philosophie und Bildung lehrt - eine Brücke zwischen antiker Weisheit und moderner Welt.
                    </p>
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

        {/* Pontanus Modal */}
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
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-3xl mx-auto border border-white/30 shadow-2xl"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowPontanusModal(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300"
                >
                  ×
                </button>

                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                      {t('about_pontanus_title')}
                    </h2>
                    <p className="text-lg text-yellow-300/90 font-medium">
                      {t('about_pontanus_subtitle')}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-3">👨‍🔬 Wissenschaftlicher Kontext</h3>
                      <p className="text-white/90 leading-relaxed">{t('about_pontanus_bio')}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-3">📖 Editorische Leistung</h3>
                      <p className="text-white/90 leading-relaxed">{t('about_pontanus_work')}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-3">🌉 Kulturelle Brücke</h3>
                      <p className="text-white/90 leading-relaxed">{t('about_pontanus_legacy')}</p>
                    </div>
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

        {/* Enhanced Styles */}
        <style jsx global>{`
          @keyframes moveStars {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-100vw);
            }
          }
          
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

          .card-hover {
            transition: all 0.3s ease;
          }
          
          .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </>
  );
}
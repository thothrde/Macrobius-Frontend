/**
 * 🏛️ MACROBIUS - COMPLETE TRANSLATION CONSISTENCY VERSION
 * ALL LANGUAGES NOW HAVE IDENTICAL CONTENT - GERMAN, ENGLISH, LATIN
 * USES LANGUAGECONTEXT FOR CONSISTENT TRANSLATIONS
 */

import React, { useState, useCallback } from 'react';
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

// FIXED: Import LanguageContext
import { useLanguage, Language } from '../contexts/LanguageContext';

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

// Main CULTURAL EDUCATION application with COMPLETE TRANSLATION CONSISTENCY
export default function MacrobiusCulturalApp() {
  // FIXED: Use LanguageContext instead of local state
  const { language: currentLang, setLanguage, t } = useLanguage();
  
  // Navigation state 
  const [activeSection, setActiveSection] = useState<string>('hero');
  
  // Astrolabe rotation state
  const [astrolabeRotation, setAstrolabeRotation] = useState<number>(0);
  
  // Modal states
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPontanusModal, setShowPontanusModal] = useState(false);
  const [showRomeModal, setShowRomeModal] = useState(false);
  
  // Image modal state
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // Type adapter for components that expect string function
  const tAdapter = useCallback((key: string): string => {
    return t(key);
  }, [t]);

  // Image click handler
  const handleImageClick = useCallback((imageInfo: ImageInfo) => {
    setSelectedImage(imageInfo);
    setShowImageModal(true);
  }, []);

  // Image modal close handler
  const handleImageModalClose = useCallback(() => {
    setShowImageModal(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  }, []);

  // Event handlers
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  // Section change with astrolabe rotation
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setAstrolabeRotation(prev => prev + 45);
  };

  return (
    <>
      <Head>
        <title>{t('hero.title.line1')} {t('hero.title.line2')} - Macrobius Cultural Education</title>
        <meta name="description" content={t('hero.description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Enhanced Evening Sky Gradient Background */}
      <div className="min-h-screen relative overflow-x-hidden" style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 15%, #16213e 30%, #0d1b2a 50%, #0c1821 70%, #0a0e1a 100%)'
      }}>
        {/* Enhanced Animated Starfield */}
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
              }}
            />
          ))}
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

        {/* Navigation Sidebar */}
        <nav className="fixed top-4 left-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex flex-col space-y-2">
              {/* Core Sections */}
              {[
                { id: 'hero', label: t('nav.intro'), icon: '🏛️' },
                { id: 'quiz', label: t('nav.quiz'), icon: '📝' },
                { id: 'worldmap', label: t('nav.worldmap'), icon: '🗺️' },
                { id: 'cosmos', label: t('nav.cosmos'), icon: '🌌' },
                { id: 'banquet', label: t('nav.banquet'), icon: '🍷' },
                { id: 'search', label: t('nav.textsearch'), icon: '🔍' },
                { id: 'learning', label: t('nav.learning'), icon: '📚' },
                { id: 'visualizations', label: 'Visualisierungen', icon: '📊' }
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
                <p className="text-yellow-200/60 text-xs px-2 mb-2">
                  {currentLang === 'DE' ? 'KI-SYSTEME' : 
                   currentLang === 'EN' ? 'AI SYSTEMS' : 
                   'SYSTEMATA AI'}
                </p>
                {[
                  { id: 'ai-cultural', label: currentLang === 'DE' ? 'KI-Kulturanalyse' : currentLang === 'EN' ? 'AI Cultural Analysis' : 'AI Analysis Culturalis', icon: '🧠' },
                  { id: 'ai-learning', label: currentLang === 'DE' ? 'Lernpfade' : currentLang === 'EN' ? 'Learning Paths' : 'Semitae Discendi', icon: '🎯' },
                  { id: 'ai-tutoring', label: currentLang === 'DE' ? 'KI-Tutor' : currentLang === 'EN' ? 'AI Tutor' : 'AI Praeceptor', icon: '📖' },
                  { id: 'ai-modules', label: currentLang === 'DE' ? 'Kulturmodule' : currentLang === 'EN' ? 'Cultural Modules' : 'Moduli Culturales', icon: '✨' }
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
              <p className="text-white/60 text-xs mt-1">
                {currentLang === 'DE' ? '1.401 Kulturelle Texte' : 
                 currentLang === 'EN' ? '1,401 Cultural Texts' : 
                 '1.401 Textus Culturales'}
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
          {/* ENHANCED Hero Section */}
          {activeSection === 'hero' && (
            <section className="min-h-screen flex items-center justify-center px-4" style={{ paddingTop: '200px' }}>
              <div className="text-center max-w-7xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 mb-8">
                  <div className="mb-8">
                    <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                      Macrobius
                    </h1>
                    <h2 className="text-2xl md:text-4xl text-yellow-300 mb-6 font-light">
                      {t('hero.badge')}
                    </h2>
                    <h3 className="text-lg md:text-xl text-yellow-200 mb-8 font-medium">
                      {t('hero.title.line1')} {t('hero.title.line2')}
                    </h3>
                  </div>
                  <div className="max-w-4xl mx-auto mb-8">
                    <p className="text-base md:text-lg text-white/90 leading-relaxed text-justify">
                      {t('cultural_story')}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => handleSectionChange('banquet')}
                    className="btn-wine px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                    }}
                  >
                    {t('explore_texts')}
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
                </div>
              </div>
            </section>
          )}

          {/* Other sections */}
          {activeSection === 'search' && (
            <TextSearchSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}
          {activeSection === 'cosmos' && (
            <CosmosSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}
          {activeSection === 'banquet' && (
            <BanquetSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}
          {activeSection === 'worldmap' && (
            <WorldMapSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}
          {activeSection === 'quiz' && (
            <QuizSection isActive={true} language={currentLang} />
          )}
          {activeSection === 'learning' && (
            <LearningSection />
          )}
          {activeSection === 'visualizations' && (
            <VisualizationsSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}
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

        {/* Image Modal */}
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                        🏛️ {currentLang === 'DE' ? 'Biographie & Kontext' :
                              currentLang === 'EN' ? 'Biography & Context' :
                              'Biographia et Contextus'}
                      </h3>
                      <p className="text-white/90 leading-relaxed text-justify">{t('about_biography')}</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                        📚 {currentLang === 'DE' ? 'Die zwei Hauptwerke' :
                              currentLang === 'EN' ? 'The Two Major Works' :
                              'Duo Opera Principalia'}
                      </h3>
                      <p className="text-white/90 leading-relaxed text-justify">{t('about_works')}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                      🌍 {currentLang === 'DE' ? 'Vermächtnis & Wirkung' :
                            currentLang === 'EN' ? 'Legacy & Impact' :
                            'Legatum et Effectus'}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-justify">{t('about_legacy')}</p>
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
                      {t('about_pontanus_title')}
                    </h2>
                    <p className="text-xl text-blue-300/90 font-medium">
                      {t('about_pontanus_subtitle')}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                        🌟 {currentLang === 'DE' ? 'Brückenbauer der Wissenschaften' :
                              currentLang === 'EN' ? 'Bridge-Builder of Sciences' :
                              'Constructor Pontis Scientiarum'}
                      </h3>
                      <p className="text-white/90 leading-relaxed text-justify">{t('about_pontanus_bio')}</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                        📖 {currentLang === 'DE' ? 'Editorische Meisterleistung' :
                              currentLang === 'EN' ? 'Editorial Masterpiece' :
                              'Opus Editoriale Eximium'}
                      </h3>
                      <p className="text-white/90 leading-relaxed text-justify">{t('about_pontanus_work')}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                      🌍 {currentLang === 'DE' ? 'Historisches Vermächtnis' :
                            currentLang === 'EN' ? 'Historical Legacy' :
                            'Legatum Historicum'}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-justify">{t('about_pontanus_legacy')}</p>
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
        `}</style>
      </div>
    </>
  );
}
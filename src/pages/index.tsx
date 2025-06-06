// MACROBIUS EDUCATIONAL PLATFORM - COMPLETE WITH ALL SECTIONS
// Enhanced with functional multilingual support and all educational modules

import React from 'react';
import Head from 'next/head';

// Import sections
import HeroSection from '../components/sections/HeroSection';
import { IntroSection } from '../components/sections/IntroSection';
import LearningSection from '../components/sections/LearningSection-enhanced-complete';
import { CosmosSection } from '../components/sections/CosmosSection';
import BanquetSection from '../components/sections/BanquetSection';
import { WorldMapSection } from '../components/sections/WorldMapSection';
import { TextSearchSection } from '../components/sections/TextSearchSection';
import { useLanguage, Language } from '../contexts/LanguageContext';

export default function HomePage() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
      <Head>
        <title>Eine antike Flaschenpost - {language === 'DE' ? 'Macrobius Texte' : language === 'LA' ? 'Textus Macrobii' : 'Macrobius Texts'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        {/* Language Selector */}
        <div className="fixed top-4 right-4 z-50">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="px-4 py-2 border-2 border-gold rounded-lg bg-white/90 backdrop-blur-sm shadow-lg text-black font-semibold hover:bg-white transition-all duration-300"
          >
            <option value="EN">🇬🇧 English</option>
            <option value="DE">🇩🇪 Deutsch</option>
            <option value="LA">🏛️ Latina</option>
          </select>
        </div>

        {/* Enhanced Navigation Menu */}
        <nav className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-gold/30">
          <div className="flex flex-col space-y-2">
            <a href="#hero" className="px-3 py-2 rounded-lg hover:bg-blue-100 text-sm font-semibold text-black transition-all duration-300">
              🏠 {t('nav.home')}
            </a>
            <a href="#intro" className="px-3 py-2 rounded-lg hover:bg-blue-100 text-sm font-semibold text-black transition-all duration-300">
              📖 {t('nav.intro')}
            </a>
            <a href="#learning" className="px-3 py-2 rounded-lg hover:bg-blue-100 text-sm font-semibold text-black transition-all duration-300">
              🎯 {t('nav.learning')}
            </a>
            <a href="#cosmos" className="px-3 py-2 rounded-lg hover:bg-blue-100 text-sm font-semibold text-black transition-all duration-300">
              🌌 {t('nav.cosmos')}
            </a>
            <a href="#worldmap" className="px-3 py-2 rounded-lg hover:bg-blue-100 text-sm font-semibold text-black transition-all duration-300">
              🗺️ {t('nav.worldmap')}
            </a>
            <a href="#banquet" className="px-3 py-2 rounded-lg hover:bg-blue-100 text-sm font-semibold text-black transition-all duration-300">
              🍷 {t('nav.banquet')}
            </a>
            <a href="#text-search" className="px-3 py-2 rounded-lg hover:bg-blue-100 text-sm font-semibold text-black transition-all duration-300">
              🔍 {t('nav.textsearch')}
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center">
          <HeroSection />
        </section>
        
        {/* Intro Section */}
        <section id="intro" className="py-24">
          <IntroSection language={language} />
        </section>
        
        {/* Learning Section - FULLY ENHANCED with 4 Major Educational Components:
           1. MacrobiusQuiz (30+ questions with comprehensive analysis)
           2. VocabularyTrainer (27+ terms with etymology and examples)
           3. GrammarExplainer (Advanced Latin grammar analysis)
           4. TextProcessor (Advanced search with semantic analysis)
           Plus: Progress Tracking, Achievements, Experience System */}
        <LearningSection />
        
        {/* Cosmos Section - Interactive Astronomy and Cosmology */}
        <CosmosSection language={language} />
        
        {/* World Map Section - Interactive Ancient Geography */}
        <WorldMapSection language={language} />
        
        {/* Banquet Section - Interactive Saturnalia Symposium */}
        <BanquetSection language={{ code: language.toLowerCase(), name: language }} />
        
        {/* Text Search Section - Advanced Text Analysis */}
        <TextSearchSection language={language.toLowerCase()} />
        
        {/* Content Overview */}
        <section className="py-20 bg-gradient-to-r from-blue-800 via-purple-800 to-indigo-800">
          <div className="max-w-6xl mx-auto px-4 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">📜 Macrobius Texte und Materialien</h2>
            <p className="text-xl mb-8">
              {language === 'DE' && 'Eine Sammlung von Materialien zu Macrobius und seinen Werken für Interessierte und Studierende.'}
              {language === 'LA' && 'Collectio materialium de Macrobio et operibus eius pro studiosis et discipulis.'}
              {language === 'EN' && 'A collection of materials about Macrobius and his works for interested readers and students.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <p className="font-semibold">📚 {language === 'DE' ? 'Quiz zu Macrobius' : language === 'LA' ? 'Quaestiones de Macrobio' : 'Quiz about Macrobius'}</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <p className="font-semibold">📝 {language === 'DE' ? 'Vokabelsammlung' : language === 'LA' ? 'Vocabularium' : 'Vocabulary Collection'}</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <p className="font-semibold">📏 {language === 'DE' ? 'Grammatik-Hilfe' : language === 'LA' ? 'Auxilium Grammaticum' : 'Grammar Help'}</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <p className="font-semibold">🌌 {language === 'DE' ? 'Kosmologie-Darstellungen' : language === 'LA' ? 'Repraesentationes Cosmologicae' : 'Cosmology Representations'}</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <p className="font-semibold">🗺️ {language === 'DE' ? 'Historische Karten' : language === 'LA' ? 'Mappae Historicae' : 'Historical Maps'}</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <p className="font-semibold">🍷 {language === 'DE' ? 'Saturnalia-Texte' : language === 'LA' ? 'Textus Saturnaliorum' : 'Saturnalia Texts'}</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <p className="font-semibold">🔍 {language === 'DE' ? 'Textsuche' : language === 'LA' ? 'Quaestio Textuum' : 'Text Search'}</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <p className="font-semibold">🌍 {language === 'DE' ? 'Mehrsprachige Inhalte' : language === 'LA' ? 'Contenta Multilingua' : 'Multilingual Content'}</p>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-black/20 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">📜 Inhalte</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gold mb-2">📚 Lernmaterialien</h4>
                  <p className="text-sm">{language === 'DE' ? 'Quiz, Vokabeln und Grammatik-Hilfen zu den Texten von Macrobius' : 'Quiz, vocabulary and grammar aids for Macrobius texts'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gold mb-2">🏛️ Kultureller Kontext</h4>
                  <p className="text-sm">{language === 'DE' ? 'Astronomie, Geographie und Symposiums-Tradition der Antike' : 'Ancient astronomy, geography and symposium traditions'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gold mb-2">🔍 Textanalyse</h4>
                  <p className="text-sm">{language === 'DE' ? 'Suchfunktionen für die Texte von Macrobius' : 'Search functions for Macrobius texts'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
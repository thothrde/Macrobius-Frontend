/**
 * 🍷 BANQUET SECTION - FIXED WITH IMAGE AND LANGUAGE IMPROVEMENTS
 * Interactive exploration of Roman dining culture through Macrobius
 * FIXED: WandSymposion.jpg without heavy overlay + Language integration
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Wine, 
  Users, 
  Crown, 
  Sparkles, 
  Clock, 
  Globe, 
  BookOpen, 
  Star,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Zap,
  Heart,
  Trophy,
  Music
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BanquetCharacter {
  id: string;
  name: string;
  role: string;
  description: string;
  quote: string;
  position: { x: number; y: number };
}

interface BanquetTopic {
  id: string;
  title: string;
  description: string;
  participants: string[];
  culturalSignificance: string;
  modernRelevance: string;
}

interface BanquetProps {
  className?: string;
}

export default function BanquetSection({ className = '' }: BanquetProps) {
  const { language, t } = useLanguage();
  const [activeCharacter, setActiveCharacter] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'characters' | 'topics' | 'culture'>('characters');

  // Dynamic characters based on language
  const characters: BanquetCharacter[] = [
    {
      id: 'macrobius',
      name: 'Macrobius',
      role: language === 'DE' ? 'Gelehrter Gastgeber' : language === 'LA' ? 'Hospes Doctus' : 'Scholarly Host',
      description: language === 'DE' ? 'Führt durch die intellektuellen Diskussionen' : language === 'LA' ? 'Disputationes intellectuales ducit' : 'Guides the intellectual discussions',
      quote: language === 'DE' ? '"Lasst uns Weisheit mit Wein mischen"' : language === 'LA' ? '"Sapientiam cum vino misceamus"' : '"Let us mix wisdom with wine"',
      position: { x: 50, y: 30 }
    },
    {
      id: 'symmachus',
      name: 'Symmachus',
      role: language === 'DE' ? 'Römischer Senator' : language === 'LA' ? 'Senator Romanus' : 'Roman Senator',
      description: language === 'DE' ? 'Verteidiger der traditionellen Werte' : language === 'LA' ? 'Defensor morum traditionalium' : 'Defender of traditional values',
      quote: language === 'DE' ? '"Die alten Wege sind die besten"' : language === 'LA' ? '"Veteres viae optimae sunt"' : '"The old ways are the best ways"',
      position: { x: 25, y: 60 }
    },
    {
      id: 'praetextatus',
      name: 'Praetextatus',
      role: language === 'DE' ? 'Philosophischer Denker' : language === 'LA' ? 'Cogitator Philosophicus' : 'Philosophical Thinker',
      description: language === 'DE' ? 'Bringt neo-platonische Einsichten ein' : language === 'LA' ? 'Perspectus neo-platonicos adfert' : 'Brings Neo-Platonic insights',
      quote: language === 'DE' ? '"Tugend ist ihre eigene Belohnung"' : language === 'LA' ? '"Virtus est praemium suum"' : '"Virtue is its own reward"',
      position: { x: 75, y: 45 }
    },
    {
      id: 'avienus',
      name: 'Avienus',
      role: language === 'DE' ? 'Dichter & Übersetzer' : language === 'LA' ? 'Poeta et Interpres' : 'Poet & Translator',
      description: language === 'DE' ? 'Experte für literarische Traditionen' : language === 'LA' ? 'Peritus traditionum literariarum' : 'Expert in literary traditions',
      quote: language === 'DE' ? '"Dichtung offenbart die Wahrheit"' : language === 'LA' ? '"Poesis veritatem revelat"' : '"Poetry reveals truth"',
      position: { x: 40, y: 75 }
    }
  ];

  // Dynamic topics based on language
  const banquetTopics: BanquetTopic[] = [
    {
      id: 'astronomy',
      title: language === 'DE' ? 'Himmlische Harmonie' : language === 'LA' ? 'Harmonia Caelestis' : 'Celestial Harmony',
      description: language === 'DE' ? 'Diskussion über Planetenbewegungen und kosmische Musik' : language === 'LA' ? 'Disputatio de motibus planetarum et musica cosmica' : 'Discussion of planetary motions and cosmic music',
      participants: ['Macrobius', 'Praetextatus'],
      culturalSignificance: language === 'DE' ? 'Verbindung von Wissenschaft und Spiritualität' : language === 'LA' ? 'Nexus scientiae et spiritualitatis' : 'Connection of science and spirituality',
      modernRelevance: language === 'DE' ? 'Moderne Astrophysik und Kosmologie' : language === 'LA' ? 'Astrophysica et cosmologia moderna' : 'Modern astrophysics and cosmology'
    },
    {
      id: 'virtue',
      title: language === 'DE' ? 'Die Natur der Tugend' : language === 'LA' ? 'Natura Virtutis' : 'The Nature of Virtue',
      description: language === 'DE' ? 'Philosophische Untersuchung moralischer Exzellenz' : language === 'LA' ? 'Investigatio philosophica excellentiae moralis' : 'Philosophical examination of moral excellence',
      participants: ['Praetextatus', 'Symmachus'],
      culturalSignificance: language === 'DE' ? 'Römische Werte und Ethik' : language === 'LA' ? 'Valores Romani et ethica' : 'Roman values and ethics',
      modernRelevance: language === 'DE' ? 'Zeitgenössische Ethik und Führung' : language === 'LA' ? 'Ethica et ducatus contemporaneus' : 'Contemporary ethics and leadership'
    },
    {
      id: 'literature',
      title: language === 'DE' ? 'Dichterische Inspiration' : language === 'LA' ? 'Inspiratio Poetica' : 'Poetic Inspiration',
      description: language === 'DE' ? 'Die Rolle der Literatur in der Gesellschaft' : language === 'LA' ? 'Munus literaturae in societate' : 'The role of literature in society',
      participants: ['Avienus', 'Macrobius'],
      culturalSignificance: language === 'DE' ? 'Kulturelle Überlieferung durch Kunst' : language === 'LA' ? 'Traditio culturalis per artem' : 'Cultural transmission through art',
      modernRelevance: language === 'DE' ? 'Digitale Literatur und Storytelling' : language === 'LA' ? 'Literatura digitalis et narratio' : 'Digital literature and storytelling'
    }
  ];

  // Language-specific titles and content
  const getTitle = () => {
    return t('banquet_title') || 
           (language === 'DE' ? 'Gelehrtes Gastmahl' : 
            language === 'LA' ? 'Convivium Doctorum' : 
            'Scholarly Banquet');
  };

  const getSubtitle = () => {
    return t('banquet_subtitle') || 
           (language === 'DE' ? 'Macrobius\' Saturnalia und Commentarii' : 
            language === 'LA' ? 'Saturnalia et Commentarii Macrobii' : 
            'Macrobius\' Saturnalia and Commentarii');
  };

  const getDescription = () => {
    return t('banquet_description') || 
           (language === 'DE' ? 'Treten Sie ein in die Welt der römischen Gelehrsamkeit, wo intellektuelle Diskussionen bei festlichen Mahlzeiten stattfanden. Entdecken Sie, wie kulturelles Wissen in geselligen Zusammenkünften weitergegeben wurde.' : 
            language === 'LA' ? 'Ingredere in mundum eruditionis Romanae, ubi disputationes intellectuales in conviviis festis habebantur. Discooperi quomodo scientia culturalis in coetibus socialibus tradebatur.' : 
            'Step into the world of Roman scholarship, where intellectual discussions flourished during festive meals. Discover how cultural knowledge was transmitted through social gatherings.');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTopic((prev) => (prev + 1) % banquetTopics.length);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isPlaying, banquetTopics.length]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTour = () => {
    setCurrentTopic(0);
    setIsPlaying(false);
    setActiveCharacter(null);
  };

  return (
    <section className={`relative py-24 overflow-hidden ${className}`}>
      {/* Background with FIXED WandSymposion.jpg - No Heavy Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-70">
          <Image 
            src="/WandSymposion.jpg" 
            alt={language === 'DE' ? 'Wandmalerei Symposion - Römisches Gastmahl' : language === 'LA' ? 'Pictura Parietis Symposii - Convivium Romanum' : 'Wall Painting Symposium - Roman Banquet'}
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* MINIMAL overlay for readability only */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-orange-900/15 to-amber-950/25" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mr-4 shadow-lg">
              <Wine className="h-12 w-12 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {getTitle()}
              </h2>
              <p className="text-xl text-amber-200 font-semibold drop-shadow-md">
                {getSubtitle()}
              </p>
            </div>
          </div>
          
          <p className="text-xl text-amber-100 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
            {getDescription()}
          </p>

          {/* Enhanced Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={togglePlayback}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg ${
                isPlaying 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-5 w-5 mr-2" />
                  {language === 'DE' ? 'Pausieren' : language === 'LA' ? 'Pausare' : 'Pause Tour'}
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  {language === 'DE' ? 'Tour starten' : language === 'LA' ? 'Iter incipere' : 'Start Tour'}
                </>
              )}
            </button>
            
            <button
              onClick={resetTour}
              className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-300 shadow-lg"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              {language === 'DE' ? 'Zurücksetzen' : language === 'LA' ? 'Renovare' : 'Reset'}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg ${
                isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-black/30 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-amber-500/30">
            {[
              { id: 'characters', label: language === 'DE' ? 'Charaktere' : language === 'LA' ? 'Personae' : 'Characters', icon: Users },
              { id: 'topics', label: language === 'DE' ? 'Themen' : language === 'LA' ? 'Themata' : 'Topics', icon: BookOpen },
              { id: 'culture', label: language === 'DE' ? 'Kultur' : language === 'LA' ? 'Cultura' : 'Culture', icon: Crown }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedTab(id as any)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedTab === id
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'text-amber-200 hover:text-white hover:bg-amber-500/30'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Characters Tab */}
          {selectedTab === 'characters' && (
            <motion.div
              key="characters"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {characters.map((character) => (
                <motion.div
                  key={character.id}
                  className={`bg-black/40 backdrop-blur-sm border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                    activeCharacter === character.id 
                      ? 'border-amber-400 shadow-lg shadow-amber-500/20 scale-105' 
                      : 'border-amber-600/30 hover:border-amber-400/60 hover:scale-102'
                  }`}
                  onClick={() => setActiveCharacter(activeCharacter === character.id ? null : character.id)}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-100 mb-1">{character.name}</h3>
                    <p className="text-amber-300 text-sm font-medium">{character.role}</p>
                  </div>
                  
                  <p className="text-amber-200 text-sm leading-relaxed mb-4">{character.description}</p>
                  
                  <AnimatePresence>
                    {activeCharacter === character.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-amber-600/30 pt-4"
                      >
                        <div className="flex items-start">
                          <Sparkles className="h-4 w-4 text-amber-400 mr-2 mt-1 flex-shrink-0" />
                          <p className="text-amber-100 text-sm italic">{character.quote}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Topics Tab */}
          {selectedTab === 'topics' && (
            <motion.div
              key="topics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {banquetTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  className={`bg-black/40 backdrop-blur-sm border rounded-xl p-8 transition-all duration-500 ${
                    currentTopic === index 
                      ? 'border-amber-400 shadow-lg shadow-amber-500/20 scale-102' 
                      : 'border-amber-600/30'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          currentTopic === index ? 'bg-amber-500' : 'bg-amber-600/50'
                        }`}>
                          <BookOpen className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-amber-100">{topic.title}</h3>
                        {currentTopic === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-3 w-3 h-3 bg-amber-400 rounded-full animate-pulse"
                          />
                        )}
                      </div>
                      <p className="text-amber-200 text-lg leading-relaxed mb-4">{topic.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-amber-300 font-semibold mb-2 flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            {language === 'DE' ? 'Teilnehmer' : language === 'LA' ? 'Participes' : 'Participants'}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {topic.participants.map((participant) => (
                              <span key={participant} className="bg-amber-500/20 text-amber-200 px-3 py-1 rounded-full text-sm">
                                {participant}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-amber-300 font-semibold mb-2 flex items-center">
                            <Star className="h-4 w-4 mr-2" />
                            {language === 'DE' ? 'Kulturelle Bedeutung' : language === 'LA' ? 'Significatio Culturalis' : 'Cultural Significance'}
                          </h4>
                          <p className="text-amber-200 text-sm">{topic.culturalSignificance}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <h4 className="text-amber-300 font-semibold mb-2 flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          {language === 'DE' ? 'Moderne Relevanz' : language === 'LA' ? 'Relevantia Moderna' : 'Modern Relevance'}
                        </h4>
                        <p className="text-amber-200 text-sm">{topic.modernRelevance}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Culture Tab */}
          {selectedTab === 'culture' && (
            <motion.div
              key="culture"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Roman Banquet Customs */}
              <div className="bg-black/40 backdrop-blur-sm border border-amber-600/30 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <Trophy className="h-8 w-8 text-amber-400 mr-3" />
                  <h3 className="text-2xl font-bold text-amber-100">
                    {language === 'DE' ? 'Römische Gastmahl-Traditionen' : language === 'LA' ? 'Traditiones Convivii Romani' : 'Roman Banquet Traditions'}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-amber-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-amber-300 font-semibold mb-1">
                        {language === 'DE' ? 'Zeitliche Struktur' : language === 'LA' ? 'Structura Temporalis' : 'Temporal Structure'}
                      </h4>
                      <p className="text-amber-200 text-sm">
                        {language === 'DE' ? 'Gastmähler folgten strengen zeitlichen Abläufen mit verschiedenen Gängen und Diskussionsthemen.' : language === 'LA' ? 'Convivia ordines temporales strictos sequebantur cum diversis cursibus et argumentis disputationum.' : 'Banquets followed strict temporal sequences with different courses and discussion topics.'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Crown className="h-5 w-5 text-amber-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-amber-300 font-semibold mb-1">
                        {language === 'DE' ? 'Soziale Hierarchie' : language === 'LA' ? 'Hierarchia Socialis' : 'Social Hierarchy'}
                      </h4>
                      <p className="text-amber-200 text-sm">
                        {language === 'DE' ? 'Sitzordnung und Gesprächsführung spiegelten den gesellschaftlichen Status wider.' : language === 'LA' ? 'Ordo sedendi et moderatio colloquii statum socialem reflectebant.' : 'Seating arrangements and conversation leadership reflected social status.'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Music className="h-5 w-5 text-amber-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-amber-300 font-semibold mb-1">
                        {language === 'DE' ? 'Kulturelle Funktionen' : language === 'LA' ? 'Functiones Culturales' : 'Cultural Functions'}
                      </h4>
                      <p className="text-amber-200 text-sm">
                        {language === 'DE' ? 'Gastmähler dienten der Wissensvermittlung, Netzwerkbildung und kulturellen Kontinuität.' : language === 'LA' ? 'Convivia traditionis scientiae, retis socialis, et continuitatis culturalis serviebant.' : 'Banquets served knowledge transmission, networking, and cultural continuity.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modern Connections */}
              <div className="bg-black/40 backdrop-blur-sm border border-amber-600/30 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <Zap className="h-8 w-8 text-amber-400 mr-3" />
                  <h3 className="text-2xl font-bold text-amber-100">
                    {language === 'DE' ? 'Moderne Parallelen' : language === 'LA' ? 'Parallela Moderna' : 'Modern Parallels'}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/30">
                    <h4 className="text-blue-300 font-semibold mb-2">
                      {language === 'DE' ? 'Akademische Konferenzen' : language === 'LA' ? 'Conventus Academici' : 'Academic Conferences'}
                    </h4>
                    <p className="text-blue-200 text-sm">
                      {language === 'DE' ? 'Moderne Konferenzen kombinieren Networking mit intellektuellem Austausch, ähnlich römischen Gastmählern.' : language === 'LA' ? 'Conventus moderni retes sociales cum commercio intellectuali combinant, similes conviviis Romanis.' : 'Modern conferences combine networking with intellectual exchange, similar to Roman banquets.'}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg border border-green-400/30">
                    <h4 className="text-green-300 font-semibold mb-2">
                      {language === 'DE' ? 'Business-Dinner' : language === 'LA' ? 'Cena Negotialis' : 'Business Dinners'}
                    </h4>
                    <p className="text-green-200 text-sm">
                      {language === 'DE' ? 'Geschäftsessen nutzen die gleichen sozialen Dynamiken für berufliche Beziehungen.' : language === 'LA' ? 'Cenae negotiales easdem dynamicas sociales pro relationibus professionalibus utuntur.' : 'Business dinners use the same social dynamics for professional relationships.'}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30">
                    <h4 className="text-purple-300 font-semibold mb-2">
                      {language === 'DE' ? 'Think Tanks' : language === 'LA' ? 'Cogitatoriums' : 'Think Tanks'}
                    </h4>
                    <p className="text-purple-200 text-sm">
                      {language === 'DE' ? 'Moderne Think Tanks fördern Ideenaustausch in strukturierten sozialen Umgebungen.' : language === 'LA' ? 'Cogitatoriums moderna commercium idearum in ambientibus socialibus structis fovent.' : 'Modern think tanks promote idea exchange in structured social environments.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Progress Indicator */}
        {isPlaying && (
          <motion.div 
            className="fixed bottom-8 right-8 bg-black/60 backdrop-blur-sm border border-amber-500/50 rounded-xl p-4 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Heart className="h-5 w-5 text-red-400 mr-2 animate-pulse" />
                <span className="text-amber-200 text-sm font-medium">
                  {language === 'DE' ? 'Tour läuft' : language === 'LA' ? 'Iter procedit' : 'Tour Active'}
                </span>
              </div>
              <div className="flex space-x-1">
                {banquetTopics.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTopic ? 'bg-amber-400' : 'bg-amber-600/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wine, Crown, Scroll, Users, Clock, Book, Star, Globe, MessageCircle, Play, Pause } from 'lucide-react';

// Fix: Add language prop to interface
interface BanquetSectionProps {
  isActive: boolean;
  t: (key: string) => string;
  language: 'DE' | 'EN' | 'LA';
}

interface Character {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar: string;
  position: { x: number; y: number };
  wisdom: string[];
  personality: string;
  historicalNote: string;
}

interface ConversationTopic {
  id: string;
  theme: string;
  title: string;
  participants: string[];
  content: {
    speaker: string;
    text: string;
    translation?: string;
    culturalNote?: string;
  }[];
  modernRelevance: string;
}

const CHARACTERS: Character[] = [
  {
    id: 'macrobius',
    name: 'Macrobius',
    title: 'Magister Convivii',
    description: 'Our learned host and chronicler of these scholarly conversations',
    avatar: '🏛️',
    position: { x: 50, y: 20 },
    wisdom: [
      'Saturni sacrum diem festum esse universa Romani imperii provincia novit',
      'In convivio doctorum virorum sermones eruditos audire licet',
      'Sapientia antiqua modernos quoque docere potest'
    ],
    personality: 'Wise chronicler who preserves the conversations of learned men',
    historicalNote: 'Author of the Saturnalia, our window into Roman intellectual life'
  },
  {
    id: 'praetextatus',
    name: 'Vettius Agorius Praetextatus',
    title: 'Pontifex Maximus',
    description: 'Distinguished senator and religious authority',
    avatar: '⚖️',
    position: { x: 20, y: 40 },
    wisdom: [
      'Religio est quae deorum cultu pio continetur',
      'Traditiones maiorum custodiendae sunt',
      'Sacrorum memoria et observantia civitatis fundamentum est'
    ],
    personality: 'Authoritative voice on religious matters and Roman traditions',
    historicalNote: 'Prominent pagan politician and philosopher of the 4th century'
  },
  {
    id: 'symmachus',
    name: 'Quintus Aurelius Symmachus',
    title: 'Orator Clarissimus',
    description: 'Renowned orator and defender of Roman traditions',
    avatar: '🎭',
    position: { x: 80, y: 40 },
    wisdom: [
      'Eloquentia virtutis comes est',
      'Veritas per eloquentiam magis elucet',
      'Romana dignitas in verbis quoque conservanda est'
    ],
    personality: 'Passionate defender of Roman culture and masterful speaker',
    historicalNote: 'Famous for his defense of the Altar of Victory in the Senate'
  },
  {
    id: 'servius',
    name: 'Servius',
    title: 'Grammaticus Doctissimus',
    description: 'Master grammarian and interpreter of Virgil',
    avatar: '📚',
    position: { x: 50, y: 60 },
    wisdom: [
      'Vergilii carmina omnem sapientiam continent',
      'Grammatica est scientiarum fundamentum',
      'Poetae antiqui mysteria naturae revelaverunt'
    ],
    personality: 'Scholarly and methodical, devoted to preserving literary traditions',
    historicalNote: 'His commentary on Virgil survived and influenced medieval education'
  },
  {
    id: 'avienius',
    name: 'Avienius',
    title: 'Poeta et Consularis',
    description: 'Poet and former consul with deep knowledge of astronomy',
    avatar: '🌟',
    position: { x: 20, y: 70 },
    wisdom: [
      'Astra regunt hominum fata',
      'Poeta est vates naturae mysteriorum',
      'Sapientia caelestis terrestrem illuminat'
    ],
    personality: 'Mystical and contemplative, bridging poetry and cosmic wisdom',
    historicalNote: 'Known for his astronomical poem "Aratea" and other didactic works'
  },
  {
    id: 'albinus',
    name: 'Caecina Albinus',
    title: 'Philosophus',
    description: 'Philosophical mind questioning the nature of existence',
    avatar: '🤔',
    position: { x: 80, y: 70 },
    wisdom: [
      'Quid est vita nisi mors dilata?',
      'Sapientia in dubitatione incipit',
      'Veritas quaerenda est, non assumenda'
    ],
    personality: 'Inquisitive philosopher who challenges assumptions',
    historicalNote: 'Representative of the intellectual curiosity of the late Roman elite'
  }
];

const CONVERSATION_TOPICS: ConversationTopic[] = [
  {
    id: 'saturnalia_origins',
    theme: 'Religious Practices',
    title: 'The Origins and Meaning of Saturnalia',
    participants: ['praetextatus', 'macrobius'],
    content: [
      {
        speaker: 'praetextatus',
        text: 'Saturni festum antiquissimum est et ad Italiae indigenas spectat',
        translation: 'The festival of Saturn is most ancient and relates to the native peoples of Italy',
        culturalNote: 'Praetextatus emphasizes the deep historical roots of Roman religion'
      },
      {
        speaker: 'macrobius',
        text: 'Quomodo igitur tantam reverentiam meruit haec solemnitas?',
        translation: 'How then did this celebration earn such great reverence?',
        culturalNote: 'Macrobius often asks probing questions to draw out deeper explanations'
      },
      {
        speaker: 'praetextatus',
        text: 'Quia tempus erat quo omnes aequales erant, dominus et servus',
        translation: 'Because it was a time when all were equal, master and slave',
        culturalNote: 'The temporary social inversion during Saturnalia reflected ideals of a golden age'
      }
    ],
    modernRelevance: 'Modern festivals often serve similar functions - creating temporary communities where normal social hierarchies are suspended, allowing for renewal and reflection.'
  },
  {
    id: 'vergil_wisdom',
    theme: 'Literature',
    title: 'The Hidden Wisdom in Virgil\'s Poetry',
    participants: ['servius', 'avienius'],
    content: [
      {
        speaker: 'servius',
        text: 'Vergilius non solum poeta, sed etiam philosophus fuit',
        translation: 'Virgil was not only a poet, but also a philosopher',
        culturalNote: 'Roman education saw poetry as a vehicle for transmitting wisdom and values'
      },
      {
        speaker: 'avienius',
        text: 'Aeneidem totam astronomiae mysteria continere arbitror',
        translation: 'I believe the entire Aeneid contains the mysteries of astronomy',
        culturalNote: 'Ancient readers often found multiple layers of meaning in classical texts'
      },
      {
        speaker: 'servius',
        text: 'Sic poeta docet sine doctrina ostentata',
        translation: 'Thus the poet teaches without ostentatious display of learning',
        culturalNote: 'The ideal of teaching through beauty and narrative rather than dry instruction'
      }
    ],
    modernRelevance: 'Contemporary educators still debate how to embed deep learning in engaging formats - from educational games to narrative-based learning.'
  },
  {
    id: 'dream_cosmology',
    theme: 'Astronomy',
    title: 'Scipio\'s Dream and the Music of the Spheres',
    participants: ['avienius', 'albinus', 'macrobius'],
    content: [
      {
        speaker: 'avienius',
        text: 'Somnium Scipionis caelestis harmoniae mysterium revelat',
        translation: 'Scipio\'s Dream reveals the mystery of celestial harmony',
        culturalNote: 'Ancient cosmology often connected mathematical ratios with musical harmony'
      },
      {
        speaker: 'albinus',
        text: 'Sed quomodo spherae cantare possunt?',
        translation: 'But how can the spheres sing?',
        culturalNote: 'Philosophical skepticism was valued even in accepting ancient wisdom'
      },
      {
        speaker: 'macrobius',
        text: 'Non auribus sed mente audienda est haec musica',
        translation: 'This music must be heard not with ears but with the mind',
        culturalNote: 'Distinction between physical and intellectual perception in ancient philosophy'
      }
    ],
    modernRelevance: 'Modern physics\'s "cosmic microwave background" and gravitational waves echo ancient intuitions about cosmic harmony and vibration.'
  },
  {
    id: 'education_philosophy',
    theme: 'Education',
    title: 'The Proper Education of Youth',
    participants: ['symmachus', 'servius', 'praetextatus'],
    content: [
      {
        speaker: 'symmachus',
        text: 'Iuvenes nostri Graeca et Latina pariter discere debent',
        translation: 'Our young people should learn both Greek and Latin equally',
        culturalNote: 'Bilingual education was the mark of the Roman elite'
      },
      {
        speaker: 'servius',
        text: 'Grammatica prima est omnium artium',
        translation: 'Grammar is the first of all arts',
        culturalNote: 'Language study was seen as the foundation of all learning'
      },
      {
        speaker: 'praetextatus',
        text: 'Sed virtus sine doctrina inanis est',
        translation: 'But virtue without learning is empty',
        culturalNote: 'The integration of moral and intellectual education in Roman thought'
      }
    ],
    modernRelevance: 'Debates about classical education, critical thinking, and character formation remain central to educational philosophy today.'
  }
];

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onClick: () => void;
  isHighlighted: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, isSelected, onClick, isHighlighted }) => {
  return (
    <motion.div
      className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
        isHighlighted ? 'z-20' : 'z-10'
      }`}
      style={{
        left: `${character.position.x}%`,
        top: `${character.position.y}%`,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      animate={{
        scale: isSelected ? 1.2 : 1,
        boxShadow: isHighlighted 
          ? '0 0 30px rgba(255, 215, 0, 0.6)' 
          : isSelected 
          ? '0 0 20px rgba(255, 215, 0, 0.4)'
          : '0 0 10px rgba(255, 215, 0, 0.2)'
      }}
      transition={{ duration: 0.3 }}
    >
      <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full border-3 ${
        isSelected 
          ? 'border-yellow-300 bg-gradient-to-br from-amber-800/80 to-amber-900/80' 
          : isHighlighted
          ? 'border-yellow-400 bg-gradient-to-br from-amber-700/70 to-amber-800/70'
          : 'border-yellow-500/60 bg-gradient-to-br from-amber-900/60 to-amber-950/60'
      } backdrop-blur-sm flex items-center justify-center text-2xl md:text-3xl transition-all duration-300`}>
        {character.avatar}
        
        {/* Pulsing indicator for highlighted characters */}
        {isHighlighted && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-yellow-300/60"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
      
      {/* Character name tooltip */}
      <motion.div
        className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/80 text-yellow-100 px-2 py-1 rounded text-xs transition-opacity duration-300 ${
          isSelected || isHighlighted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {character.name}
        <div className="text-yellow-300/80 text-xs">{character.title}</div>
      </motion.div>
    </motion.div>
  );
};

interface ConversationPanelProps {
  topic: ConversationTopic;
  onClose: () => void;
  characters: Character[];
}

const ConversationPanel: React.FC<ConversationPanelProps> = ({ topic, onClose, characters }) => {
  const [currentExchange, setCurrentExchange] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentExchange < topic.content.length - 1) {
      interval = setInterval(() => {
        setCurrentExchange(prev => prev + 1);
      }, 4000);
    } else if (currentExchange >= topic.content.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentExchange, topic.content.length]);

  const getCharacterByName = (speakerId: string) => {
    return characters.find(char => char.id === speakerId) || characters[0];
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-amber-900/90 to-amber-950/90 rounded-xl border border-yellow-500/30 max-w-4xl w-full max-h-[80vh] overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-yellow-500/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-yellow-100">{topic.title}</h3>
              <p className="text-yellow-300/80 text-sm">Theme: {topic.theme}</p>
            </div>
            <button
              onClick={onClose}
              className="text-yellow-300 hover:text-yellow-100 text-2xl transition-colors"
            >
              ×
            </button>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg border border-yellow-500/30 text-yellow-100 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`px-4 py-2 rounded-lg border border-yellow-500/30 transition-colors ${
                showTranslation 
                  ? 'bg-yellow-600/30 text-yellow-100' 
                  : 'bg-transparent text-yellow-300'
              }`}
            >
              Show Translations
            </button>
            
            <div className="text-yellow-300/60 text-sm">
              {currentExchange + 1} / {topic.content.length}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExchange}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {topic.content.slice(0, currentExchange + 1).map((exchange, index) => {
                const speaker = getCharacterByName(exchange.speaker);
                const isCurrentExchange = index === currentExchange;
                
                return (
                  <motion.div
                    key={index}
                    className={`mb-6 ${isCurrentExchange ? 'opacity-100' : 'opacity-70'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isCurrentExchange ? 1 : 0.7, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-800/60 to-amber-900/60 border border-yellow-500/30 flex items-center justify-center text-lg backdrop-blur-sm">
                          {speaker.avatar}
                        </div>
                        <div className="text-center mt-1">
                          <div className="text-yellow-200 text-xs font-medium">{speaker.name}</div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <blockquote className="text-lg text-yellow-100 italic leading-relaxed mb-2">
                          "{exchange.text}"
                        </blockquote>
                        
                        {showTranslation && exchange.translation && (
                          <p className="text-yellow-200/80 mb-2">
                            "{exchange.translation}"
                          </p>
                        )}
                        
                        {exchange.culturalNote && (
                          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mt-3">
                            <p className="text-yellow-300/90 text-sm leading-relaxed">
                              <span className="font-medium">Cultural Context:</span> {exchange.culturalNote}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
          
          {/* Modern Relevance */}
          {currentExchange >= topic.content.length - 1 && (
            <motion.div
              className="mt-8 p-6 bg-gradient-to-br from-blue-900/20 to-blue-950/20 rounded-xl border border-blue-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h4 className="text-lg font-semibold text-blue-200 mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Modern Relevance
              </h4>
              <p className="text-blue-100/80 leading-relaxed">
                {topic.modernRelevance}
              </p>
            </motion.div>
          )}
        </div>
        
        {/* Navigation */}
        <div className="p-4 border-t border-yellow-500/20 flex justify-between items-center">
          <button
            onClick={() => setCurrentExchange(Math.max(0, currentExchange - 1))}
            disabled={currentExchange === 0}
            className="px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg border border-yellow-500/30 text-yellow-100 transition-colors"
          >
            Previous
          </button>
          
          <div className="flex gap-2">
            {topic.content.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentExchange ? 'bg-yellow-400' : 'bg-yellow-500/30'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={() => setCurrentExchange(Math.min(topic.content.length - 1, currentExchange + 1))}
            disabled={currentExchange >= topic.content.length - 1}
            className="px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg border border-yellow-500/30 text-yellow-100 transition-colors"
          >
            Next
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Fix: Add language prop to component signature
export default function BanquetSection({ isActive, t, language }: BanquetSectionProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<ConversationTopic | null>(null);
  const [highlightedCharacters, setHighlightedCharacters] = useState<string[]>([]);
  const [banquetPhase, setBanquetPhase] = useState<'arrival' | 'conversation' | 'reflection'>('arrival');

  useEffect(() => {
    if (!isActive) {
      setSelectedCharacter(null);
      setSelectedTopic(null);
      setBanquetPhase('arrival');
      return;
    }

    // Simulate banquet progression
    const timer1 = setTimeout(() => setBanquetPhase('conversation'), 3000);
    const timer2 = setTimeout(() => setBanquetPhase('reflection'), 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isActive]);

  const handleTopicSelect = (topic: ConversationTopic) => {
    setSelectedTopic(topic);
    setHighlightedCharacters(topic.participants);
  };

  const selectedCharacterData = selectedCharacter 
    ? CHARACTERS.find(char => char.id === selectedCharacter)
    : null;

  if (!isActive) return null;

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          >
            {i % 3 === 0 ? <Wine className="w-6 h-6" /> : 
             i % 3 === 1 ? <Scroll className="w-6 h-6" /> : 
             <Star className="w-6 h-6" />}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-300 mb-4">
            {t('banquet_title') || (language === 'LA' ? 'Convivium Doctorum' : language === 'EN' ? 'Scholarly Banquet' : 'Gelehrtes Gastmahl')}
          </h1>
          <p className="text-lg md:text-xl text-yellow-100/90 max-w-3xl mx-auto leading-relaxed">
            {t('banquet_subtitle') || (language === 'LA' ? 'Sermones eruditi in convivio Romano' : language === 'EN' ? 'Learned conversations at a Roman banquet' : 'Gelehrte Gespräche bei einem römischen Gastmahl')}
          </p>
          
          <motion.div
            className="mt-6 flex items-center justify-center gap-4 text-yellow-300/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <Clock className="w-5 h-5" />
            <span className="text-sm">
              {banquetPhase === 'arrival' && (language === 'LA' ? 'Adventus' : language === 'EN' ? 'Arrival' : 'Ankunft')}
              {banquetPhase === 'conversation' && (language === 'LA' ? 'Colloquium' : language === 'EN' ? 'Conversation' : 'Gespräch')}
              {banquetPhase === 'reflection' && (language === 'LA' ? 'Meditatio' : language === 'EN' ? 'Reflection' : 'Reflexion')}
            </span>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Character Interaction Area */}
          <div className="lg:col-span-2">
            <motion.div
              className="relative h-96 md:h-[500px] bg-gradient-to-br from-amber-800/30 to-amber-900/30 rounded-xl border border-yellow-500/20 backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Banquet Table (Visual Element) */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-24 md:w-64 md:h-32 bg-gradient-to-br from-amber-700/40 to-amber-800/40 rounded-full border border-yellow-500/30 backdrop-blur-sm" />
              
              {/* Characters */}
              {CHARACTERS.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  isSelected={selectedCharacter === character.id}
                  onClick={() => setSelectedCharacter(
                    selectedCharacter === character.id ? null : character.id
                  )}
                  isHighlighted={highlightedCharacters.includes(character.id)}
                />
              ))}
              
              {/* Instructions */}
              <motion.div
                className="absolute top-4 left-4 bg-black/60 text-yellow-100 px-4 py-2 rounded-lg text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: banquetPhase === 'conversation' ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {language === 'LA' ? 'Personae tangere' : language === 'EN' ? 'Click on characters to learn about them' : 'Klicken Sie auf Charaktere, um mehr zu erfahren'}
              </motion.div>
            </motion.div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Character Details */}
            <AnimatePresence>
              {selectedCharacterData && (
                <motion.div
                  className="bg-gradient-to-br from-amber-900/40 to-amber-950/40 rounded-xl border border-yellow-500/20 backdrop-blur-sm p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-800/60 to-amber-900/60 border border-yellow-500/30 flex items-center justify-center text-2xl">
                      {selectedCharacterData.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-100">{selectedCharacterData.name}</h3>
                      <p className="text-yellow-300/80 text-sm">{selectedCharacterData.title}</p>
                    </div>
                  </div>
                  
                  <p className="text-yellow-200/90 text-sm leading-relaxed mb-4">
                    {selectedCharacterData.description}
                  </p>
                  
                  <div className="text-xs text-yellow-300/70 leading-relaxed">
                    <strong>Historical Note:</strong> {selectedCharacterData.historicalNote}
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-yellow-200 mb-2">Sample Wisdom:</h4>
                    <blockquote className="text-yellow-100/80 italic text-sm border-l-2 border-yellow-500/30 pl-3">
                      "{selectedCharacterData.wisdom[0]}"
                    </blockquote>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Conversation Topics */}
            <motion.div
              className="bg-gradient-to-br from-amber-900/40 to-amber-950/40 rounded-xl border border-yellow-500/20 backdrop-blur-sm p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-lg font-semibold text-yellow-100 mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                {language === 'LA' ? 'Colloquia Docta' : language === 'EN' ? 'Scholarly Conversations' : 'Gelehrte Gespräche'}
              </h3>
              
              <div className="space-y-3">
                {CONVERSATION_TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicSelect(topic)}
                    className="w-full text-left p-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 hover:border-yellow-500/30 rounded-lg transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-yellow-100 font-medium text-sm group-hover:text-yellow-50">
                        {topic.title}
                      </span>
                      <span className="text-yellow-400/60 text-xs">
                        {topic.theme}
                      </span>
                    </div>
                    <div className="text-yellow-200/70 text-xs">
                      {language === 'LA' ? 'Participes' : language === 'EN' ? 'Participants' : 'Teilnehmer'}: {topic.participants.map(id => 
                        CHARACTERS.find(char => char.id === id)?.name
                      ).join(', ')}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Cultural Context */}
            <motion.div
              className="bg-gradient-to-br from-blue-900/20 to-blue-950/20 rounded-xl border border-blue-500/20 backdrop-blur-sm p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <h3 className="text-lg font-semibold text-blue-200 mb-3 flex items-center gap-2">
                <Book className="w-5 h-5" />
                {language === 'LA' ? 'Contextus Culturalis' : language === 'EN' ? 'Cultural Context' : 'Kultureller Kontext'}
              </h3>
              <p className="text-blue-100/80 text-sm leading-relaxed">
                {language === 'LA' ? 'Saturnalia Macrobii convivium doctorum virorum in villa Romana describit. Hic sermones eruditi de religione, literatura, astronomia, et philosophia habentur.' 
                : language === 'EN' ? 'Macrobius\' Saturnalia describes a gathering of learned men at a Roman villa. Here scholarly conversations about religion, literature, astronomy, and philosophy take place.'
                : 'Macrobius\' Saturnalia beschreibt eine Versammlung gelehrter Männer in einer römischen Villa. Hier finden gelehrte Gespräche über Religion, Literatur, Astronomie und Philosophie statt.'}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Conversation Modal */}
      <AnimatePresence>
        {selectedTopic && (
          <ConversationPanel
            topic={selectedTopic}
            onClose={() => {
              setSelectedTopic(null);
              setHighlightedCharacters([]);
            }}
            characters={CHARACTERS}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
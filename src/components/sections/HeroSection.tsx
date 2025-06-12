import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Star, Scroll, Globe, Users, Clock } from 'lucide-react';

interface HeroSectionProps {
  isActive: boolean;
  t: (key: string) => string;
  onNavigateToSection: (section: string) => void;
}

interface FloatingScrollProps {
  delay: number;
  duration: number;
}

const FloatingScroll: React.FC<FloatingScrollProps> = ({ delay, duration }) => {
  return (
    <motion.div
      className="absolute w-8 h-8 text-yellow-400/30"
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{ 
        y: [0, -10, 0], 
        opacity: [0.3, 0.7, 0.3],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Scroll className="w-full h-full" />
    </motion.div>
  );
};

interface AncientQuoteProps {
  isVisible: boolean;
}

const AncientQuote: React.FC<AncientQuoteProps> = ({ isVisible }) => {
  const quotes = [
    {
      latin: "Saturni sacrum diem festum esse universa Romani imperii provincia novit",
      translation: "The entire province of the Roman Empire knows that Saturn's day is a sacred festival",
      context: "Saturnalia - Book I"
    },
    {
      latin: "Somnia, quae vera esse creduntur, in commentariis Scipionis exposita sunt",
      translation: "Dreams that are believed to be true are explained in the Commentary on Scipio's Dream",
      context: "Commentarii - Introduction"
    },
    {
      latin: "Convivium doctorum virorum sermones continet eruditos",
      translation: "The banquet contains the learned conversations of scholarly men",
      context: "Saturnalia - Scholarly Discourse"
    }
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isVisible, quotes.length]);

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentQuote}
        className="text-center max-w-4xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
      >
        <blockquote className="text-xl md:text-2xl font-light text-yellow-100 italic mb-4 leading-relaxed">
          "{quotes[currentQuote].latin}"
        </blockquote>
        <p className="text-base md:text-lg text-yellow-200/80 mb-2">
          "{quotes[currentQuote].translation}"
        </p>
        <cite className="text-sm text-yellow-300/60 font-medium">
          — {quotes[currentQuote].context}
        </cite>
      </motion.div>
    </AnimatePresence>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  t: (key: string) => string;
  index: number;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, titleKey, descriptionKey, t, index, onClick }) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-900/20 to-amber-950/40 backdrop-blur-sm border border-yellow-500/20 p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-amber-800/30 hover:to-amber-900/50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-400/5 to-yellow-500/0 group-hover:via-yellow-400/10 transition-all duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border border-yellow-400/30 mb-4 group-hover:from-yellow-400/30 group-hover:to-amber-500/30 transition-all duration-300">
          <div className="text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300">
            {icon}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-yellow-100 mb-3 group-hover:text-yellow-50 transition-colors duration-300">
          {t(titleKey)}
        </h3>
        
        <p className="text-yellow-200/80 text-sm leading-relaxed group-hover:text-yellow-100/90 transition-colors duration-300">
          {t(descriptionKey)}
        </p>
        
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border border-yellow-400/40 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-yellow-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function HeroSection({ isActive, t, onNavigateToSection }: HeroSectionProps) {
  const [showQuote, setShowQuote] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const quoteTimer = setTimeout(() => setShowQuote(true), 2000);
    const featuresTimer = setTimeout(() => setShowFeatures(true), 3500);

    return () => {
      clearTimeout(quoteTimer);
      clearTimeout(featuresTimer);
    };
  }, [isActive]);

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      titleKey: 'hero_feature_texts_title',
      descriptionKey: 'hero_feature_texts_desc',
      section: 'textsearch'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      titleKey: 'hero_feature_worldmap_title', 
      descriptionKey: 'hero_feature_worldmap_desc',
      section: 'worldmap'
    },
    {
      icon: <Star className="w-6 h-6" />,
      titleKey: 'hero_feature_cosmos_title',
      descriptionKey: 'hero_feature_cosmos_desc', 
      section: 'cosmos'
    },
    {
      icon: <Users className="w-6 h-6" />,
      titleKey: 'hero_feature_banquet_title',
      descriptionKey: 'hero_feature_banquet_desc',
      section: 'banquet'
    },
    {
      icon: <Scroll className="w-6 h-6" />,
      titleKey: 'hero_feature_learning_title',
      descriptionKey: 'hero_feature_learning_desc',
      section: 'learning'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      titleKey: 'hero_feature_quiz_title',
      descriptionKey: 'hero_feature_quiz_desc',
      section: 'quiz'
    }
  ];

  if (!isActive) return null;

  return (
    <motion.section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Floating Scrolls Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <FloatingScroll 
              delay={i * 0.5} 
              duration={4 + Math.random() * 2}
            />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Hero Title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-300 mb-6 leading-tight">
            {t('hero_title_line1')}
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl font-light italic text-yellow-200/90">
              {t('hero_title_line2')}
            </span>
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-6" />
          
          <p className="text-lg md:text-xl lg:text-2xl text-yellow-100/90 font-light leading-relaxed max-w-4xl mx-auto">
            {t('hero_subtitle')}
          </p>
        </motion.div>

        {/* Ancient Quote Rotation */}
        <AncientQuote isVisible={showQuote} />

        {/* Call to Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <button
            onClick={() => onNavigateToSection('intro')}
            className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-yellow-500/30"
          >
            {t('hero_cta_start')}
          </button>
          
          <button
            onClick={() => onNavigateToSection('textsearch')}
            className="px-8 py-4 bg-transparent border-2 border-yellow-400/60 text-yellow-100 hover:bg-yellow-400/10 hover:border-yellow-300 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            {t('hero_cta_explore')}
          </button>
        </motion.div>

        {/* Feature Grid */}
        <AnimatePresence>
          {showFeatures && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.section}
                  icon={feature.icon}
                  titleKey={feature.titleKey}
                  descriptionKey={feature.descriptionKey}
                  t={t}
                  index={index}
                  onClick={() => onNavigateToSection(feature.section)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <motion.div
            className="flex flex-col items-center text-yellow-300/60 cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => onNavigateToSection('intro')}
          >
            <span className="text-sm font-medium mb-2">{t('hero_scroll_discover')}</span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-current rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-yellow-500/10 via-transparent to-transparent rounded-full" />
      </div>
    </motion.section>
  );
}
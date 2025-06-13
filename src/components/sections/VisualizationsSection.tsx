import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Timeline, Map, Users2, Activity, TrendingUp, Globe, Play, Pause, RotateCcw } from 'lucide-react';

interface VisualizationsSectionProps {
  isActive: boolean;
  t: (key: string) => string;
  language?: 'DE' | 'EN' | 'LA';
}

interface VisualizationTool {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  category: 'timeline' | 'network' | 'geographic' | 'thematic';
  interactive: boolean;
  dataPoints?: number;
  culturalContext: string;
}

const VISUALIZATION_TOOLS: VisualizationTool[] = [
  {
    id: 'timeline',
    icon: <Timeline className="w-8 h-8" />,
    title: 'Historische Zeitleiste',
    subtitle: 'Macrobius im Kontext seiner Zeit',
    description: 'Interaktive Zeitleiste der Spätantike mit kulturellen, politischen und intellektuellen Ereignissen',
    category: 'timeline',
    interactive: true,
    dataPoints: 50,
    culturalContext: 'Zeigt Macrobius\' Leben im Kontext des Untergangs des Weströmischen Reiches'
  },
  {
    id: 'network',
    icon: <Users2 className="w-8 h-8" />,
    title: 'Charakternetzwerk',
    subtitle: 'Verbindungen der Gesprächspartner',
    description: 'Visualisierung der Beziehungen zwischen den Teilnehmern der Saturnalia-Gespräche',
    category: 'network',
    interactive: true,
    dataPoints: 25,
    culturalContext: 'Zeigt das intellektuelle Netzwerk der spätantiken römischen Elite'
  },
  {
    id: 'heatmap',
    icon: <Activity className="w-8 h-8" />,
    title: 'Thematische Heatmap',
    subtitle: 'Verteilung kultureller Themen',
    description: 'Häufigkeitsverteilung verschiedener Kulturthemen in Macrobius\' Werken',
    category: 'thematic',
    interactive: true,
    dataPoints: 100,
    culturalContext: 'Analysiert die Schwerpunkte von Macrobius\' kultureller Dokumentation'
  },
  {
    id: 'map',
    icon: <Map className="w-8 h-8" />,
    title: 'Interaktive Karte',
    subtitle: 'Römische Welt der Spätantike',
    description: 'Geografische Darstellung der römischen Welt zur Zeit von Macrobius',
    category: 'geographic',
    interactive: true,
    dataPoints: 75,
    culturalContext: 'Zeigt die geografische Ausdehnung römischer Kultur'
  },
  {
    id: 'relations',
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Themen-Beziehungen',
    subtitle: 'Verbindungen zwischen Kulturthemen',
    description: 'Analyse der Beziehungen zwischen verschiedenen kulturellen und philosophischen Themen',
    category: 'thematic',
    interactive: true,
    dataPoints: 60,
    culturalContext: 'Zeigt, wie Macrobius verschiedene Wissensgebiete verknüpft'
  },
  {
    id: 'flow',
    icon: <Globe className="w-8 h-8" />,
    title: 'Kulturfluss-Diagramm',
    subtitle: 'Übertragung antiker Weisheit',
    description: 'Visualisierung der Übertragung antiker Kultur durch die Jahrhunderte',
    category: 'timeline',
    interactive: true,
    dataPoints: 40,
    culturalContext: 'Zeigt den Weg antiker Weisheit von Macrobius zur Renaissance'
  }
];

interface VisualizationCardProps {
  tool: VisualizationTool;
  isSelected: boolean;
  onClick: () => void;
  language: 'DE' | 'EN' | 'LA';
}

const VisualizationCard: React.FC<VisualizationCardProps> = ({ tool, isSelected, onClick, language }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'timeline': return 'from-blue-500/20 to-blue-600/20 border-blue-500/30';
      case 'network': return 'from-green-500/20 to-green-600/20 border-green-500/30';
      case 'geographic': return 'from-purple-500/20 to-purple-600/20 border-purple-500/30';
      case 'thematic': return 'from-orange-500/20 to-orange-600/20 border-orange-500/30';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
    }
  };

  return (
    <motion.div
      className={`relative p-6 rounded-xl border backdrop-blur-sm cursor-pointer transition-all duration-300 ${
        isSelected 
          ? `bg-gradient-to-br ${getCategoryColor(tool.category)} shadow-lg` 
          : 'bg-white/10 border-white/20 hover:bg-white/20'
      }`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-lg ${
          isSelected ? 'bg-white/20' : 'bg-yellow-500/20'
        }`}>
          <div className={isSelected ? 'text-white' : 'text-yellow-400'}>
            {tool.icon}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{tool.title}</h3>
          <p className="text-yellow-200/80 text-sm">{tool.subtitle}</p>
        </div>
        {tool.interactive && (
          <div className="text-green-400">
            <Play className="w-5 h-5" />
          </div>
        )}
      </div>
      
      <p className="text-white/80 text-sm leading-relaxed mb-4">
        {tool.description}
      </p>
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-yellow-300/60">
          {tool.dataPoints} {language === 'LA' ? 'Puncta' : language === 'EN' ? 'Data Points' : 'Datenpunkte'}
        </span>
        <span className={`px-2 py-1 rounded ${
          tool.interactive ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'
        }`}>
          {tool.interactive 
            ? (language === 'LA' ? 'Interactivum' : language === 'EN' ? 'Interactive' : 'Interaktiv')
            : (language === 'LA' ? 'Staticum' : language === 'EN' ? 'Static' : 'Statisch')
          }
        </span>
      </div>
      
      {/* Cultural Context */}
      {isSelected && (
        <motion.div
          className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-sm font-semibold text-yellow-200 mb-2">Kultureller Kontext:</h4>
          <p className="text-white/80 text-xs leading-relaxed">{tool.culturalContext}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

interface DemoVisualizationProps {
  tool: VisualizationTool;
  onClose: () => void;
  language: 'DE' | 'EN' | 'LA';
}

const DemoVisualization: React.FC<DemoVisualizationProps> = ({ tool, onClose, language }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsAnimating(false);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  const handleStart = () => {
    setProgress(0);
    setIsAnimating(true);
  };

  const handleReset = () => {
    setProgress(0);
    setIsAnimating(false);
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
        className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 rounded-xl border border-white/20 max-w-4xl w-full max-h-[80vh] overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-yellow-500/20">
                <div className="text-yellow-400">
                  {tool.icon}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{tool.title}</h2>
                <p className="text-yellow-200/80">{tool.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-2xl transition-colors"
            >
              ×
            </button>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleStart}
              disabled={isAnimating}
              className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 disabled:opacity-50 rounded-lg border border-green-500/30 text-green-100 transition-colors"
            >
              <Play className="w-4 h-4" />
              {language === 'LA' ? 'Incipere' : language === 'EN' ? 'Start Demo' : 'Demo starten'}
            </button>
            
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg border border-blue-500/30 text-blue-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            
            <div className="text-white/60 text-sm">
              {Math.round(progress)}% {language === 'LA' ? 'completum' : language === 'EN' ? 'complete' : 'abgeschlossen'}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-white/80 leading-relaxed mb-4">{tool.description}</p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <h4 className="text-yellow-200 font-semibold mb-2">Kultureller Kontext:</h4>
              <p className="text-yellow-100/80 text-sm leading-relaxed">{tool.culturalContext}</p>
            </div>
          </div>
          
          {/* Demo Visualization Area */}
          <div className="bg-black/40 rounded-lg p-6 border border-white/10 min-h-[300px]">
            <div className="text-center">
              <div className="text-6xl mb-4 opacity-50">
                {tool.category === 'timeline' && '📅'}
                {tool.category === 'network' && '🕸️'}
                {tool.category === 'geographic' && '🗺️'}
                {tool.category === 'thematic' && '📊'}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">
                {language === 'LA' ? 'Demonstratio Interactiva' : language === 'EN' ? 'Interactive Demo' : 'Interaktive Demonstration'}
              </h3>
              
              {/* Progress Bar */}
              <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                <motion.div
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              
              {/* Sample Data Points */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="p-3 bg-white/5 rounded border border-white/10"
                    initial={{ opacity: 0.3 }}
                    animate={{ 
                      opacity: progress > (i * 12.5) ? 1 : 0.3,
                      scale: progress > (i * 12.5) ? 1 : 0.95
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-sm text-white/60">
                      {language === 'LA' ? 'Datum' : language === 'EN' ? 'Data' : 'Daten'} {i + 1}
                    </div>
                    <div className="text-lg font-semibold text-white">
                      {Math.round((progress / 100) * (i + 1) * 10)}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 text-white/60 text-sm">
                🚧 {language === 'LA' 
                  ? 'Haec visualizatio in versione proxima implementabitur cum datis realibus ex 1.401 passagibus.' 
                  : language === 'EN' 
                  ? 'This visualization will be implemented in the next version with real data from 1,401 passages.'
                  : 'Diese Visualisierung wird in der nächsten Version mit echten Daten aus 1.401 Passagen implementiert.'}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function VisualizationsSection({ isActive, t, language = 'DE' }: VisualizationsSectionProps) {
  const [selectedTool, setSelectedTool] = useState<VisualizationTool | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  if (!isActive) return null;

  const handleToolSelect = (tool: VisualizationTool) => {
    setSelectedTool(selectedTool?.id === tool.id ? null : tool);
  };

  const handleDemoOpen = (tool: VisualizationTool) => {
    setSelectedTool(tool);
    setShowDemo(true);
  };

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          >
            {i % 4 === 0 ? <BarChart3 className="w-8 h-8" /> : 
             i % 4 === 1 ? <Timeline className="w-8 h-8" /> : 
             i % 4 === 2 ? <Users2 className="w-8 h-8" /> :
             <Activity className="w-8 h-8" />}
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
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white mb-4">
            {language === 'LA' ? 'Visualizationes' : language === 'EN' ? 'Visualizations' : 'Visualisierungen'}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {language === 'LA' 
              ? 'Imagines interactivae sapientiae antiquae' 
              : language === 'EN' 
              ? 'Interactive representations of ancient wisdom'
              : 'Interaktive Darstellungen antiker Weisheit'}
          </p>
          
          <motion.div
            className="mt-6 text-yellow-300/80 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            📊 {language === 'LA' 
              ? 'Instrumenta analytica pro comprehensione culturae antiquae' 
              : language === 'EN' 
              ? 'Analytical tools for understanding ancient culture'
              : 'Analytische Werkzeuge zum Verständnis antiker Kultur'}
          </motion.div>
        </motion.div>

        {/* Visualization Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VISUALIZATION_TOOLS.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
            >
              <VisualizationCard
                tool={tool}
                isSelected={selectedTool?.id === tool.id}
                onClick={() => handleToolSelect(tool)}
                language={language}
              />
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        {selectedTool && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => handleDemoOpen(selectedTool)}
              className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-black font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {language === 'LA' ? 'Demonstrationem Videre' : language === 'EN' ? 'View Demo' : 'Demo ansehen'}
            </button>
            
            <p className="text-white/60 text-sm mt-4">
              {language === 'LA' 
                ? 'Demonstratio interactiva cum datis exemplaribus' 
                : language === 'EN' 
                ? 'Interactive demonstration with sample data'
                : 'Interaktive Demonstration mit Beispieldaten'}
            </p>
          </motion.div>
        )}

        {/* Oracle Cloud Integration Notice */}
        <motion.div
          className="mt-12 p-6 bg-gradient-to-br from-blue-900/30 to-blue-950/30 rounded-xl border border-blue-500/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h3 className="text-lg font-semibold text-blue-200 mb-3 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Oracle Cloud Integration
          </h3>
          <p className="text-blue-100/80 text-sm leading-relaxed">
            {language === 'LA' 
              ? 'Hae visualizationes in versione proxima cum datis realibus ex 1.401 passagibus authenticis e nube Oracle implementabuntur. Status: 152.70.184.232:8080 operationalis.' 
              : language === 'EN' 
              ? 'These visualizations will be implemented in the next version with real data from 1,401 authentic passages from Oracle Cloud. Status: 152.70.184.232:8080 operational.'
              : 'Diese Visualisierungen werden in der nächsten Version mit echten Daten aus 1.401 authentischen Passagen von Oracle Cloud implementiert. Status: 152.70.184.232:8080 betriebsbereit.'}
          </p>
        </motion.div>
      </div>

      {/* Demo Modal */}
      <AnimatePresence>
        {showDemo && selectedTool && (
          <DemoVisualization
            tool={selectedTool}
            onClose={() => setShowDemo(false)}
            language={language}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
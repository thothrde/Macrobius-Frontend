import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Search, 
  BookOpen, 
  Brain, 
  Lightbulb, 
  Target, 
  Eye,
  Zap,
  BarChart3,
  Filter,
  Download,
  Settings,
  Play,
  Pause,
  SkipForward,
  Volume2,
  Bookmark,
  Share,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';

// Enhanced Text Analysis Interface
interface TextPassage {
  id: string;
  title: string;
  latin: string;
  german?: string;
  english?: string;
  source: string;
  book: number;
  chapter: number;
  section: number;
  culturalTheme: 'Religious' | 'Social' | 'Philosophy' | 'Astronomy' | 'Literature' | 'Education';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Scholar';
  wordCount: number;
  estimatedReadingTime: number;
  grammarFeatures: string[];
  culturalContext: string;
  modernRelevance: string;
  vocabulary: VocabularyItem[];
}

interface VocabularyItem {
  word: string;
  lemma: string;
  partOfSpeech: string;
  definition: string;
  difficulty: 'Common' | 'Intermediate' | 'Advanced';
  frequency: number;
  culturalSignificance: string;
}

// Semantic Analysis Result
interface SemanticAnalysis {
  mainThemes: string[];
  rhetoricalDevices: string[];
  culturalReferences: string[];
  philosophicalConcepts: string[];
  grammarComplexity: number;
  readabilityScore: number;
  keyTerms: string[];
  structuralAnalysis: string;
}

// Reading Progress Interface
interface ReadingProgress {
  passageId: string;
  timeSpent: number;
  completionPercentage: number;
  vocabularyLearned: string[];
  notesCount: number;
  difficultyRating: number;
  lastAccessed: number;
  bookmarked: boolean;
}

// AI-Powered Reading Assistance
interface ReadingAssistance {
  suggestedFocus: string[];
  grammarHelp: string[];
  culturalInsights: string[];
  connections: string[];
  nextSteps: string[];
}

// Mock authentic Macrobius passages
const SAMPLE_PASSAGES: TextPassage[] = [
  {
    id: 'sat-1-1',
    title: 'The Invitation to the Saturnalia',
    latin: 'Multis mihi et variis delectionibus oblectatum animum ad Saturnaliorum hilaritatem provehere decrevi, cum et tempus festum et doctorum hominum conversatio invitaret.',
    german: 'Nachdem mein Geist durch viele und verschiedene Vergnügungen erfreut worden ist, beschloss ich, ihn zur Heiterkeit der Saturnalien zu führen, da sowohl die festliche Zeit als auch der Umgang mit gelehrten Männern dazu einlud.',
    english: 'Having delighted my mind with many and various pleasures, I decided to lead it to the cheerfulness of the Saturnalia, since both the festive season and the company of learned men invited this.',
    source: 'Saturnalia I.1.1',
    book: 1,
    chapter: 1,
    section: 1,
    culturalTheme: 'Social',
    difficulty: 'Intermediate',
    wordCount: 28,
    estimatedReadingTime: 3,
    grammarFeatures: ['Ablative Absolute', 'Temporal cum clause', 'Subjunctive mood'],
    culturalContext: 'This opening establishes the social and intellectual context of Roman winter festivals, where educated elites gathered for learned discourse.',
    modernRelevance: 'Similar to modern academic conferences or literary salons where intellectuals gather to share ideas.',
    vocabulary: [
      {
        word: 'delectionibus',
        lemma: 'delectatio',
        partOfSpeech: 'noun',
        definition: 'pleasure, delight, enjoyment',
        difficulty: 'Intermediate',
        frequency: 15,
        culturalSignificance: 'Represents the Roman appreciation for refined pleasures and intellectual satisfaction'
      },
      {
        word: 'hilaritatem',
        lemma: 'hilaritas',
        partOfSpeech: 'noun',
        definition: 'cheerfulness, merriment, joy',
        difficulty: 'Advanced',
        frequency: 8,
        culturalSignificance: 'Characteristic mood of Saturnalia festivals, representing temporary social liberation'
      }
    ]
  },
  {
    id: 'comm-1-3',
    title: 'The Nature of Dreams',
    latin: 'Somnium vero quale illud Scipionis non ad quietem refertur sed ad divinationis speciem, cum animus ex corporis vinculis relaxatus futura praecognoscit.',
    german: 'Ein Traum wie der des Scipio bezieht sich nicht auf Ruhe, sondern auf eine Art der Wahrsagung, wenn der Geist, von den Fesseln des Körpers befreit, die Zukunft vorherkennt.',
    english: 'A dream such as that of Scipio is not related to rest, but to a form of divination, when the mind, released from the bonds of the body, perceives the future.',
    source: 'Commentarii I.3.4',
    book: 1,
    chapter: 3,
    section: 4,
    culturalTheme: 'Philosophy',
    difficulty: 'Advanced',
    wordCount: 22,
    estimatedReadingTime: 4,
    grammarFeatures: ['Ablative Absolute', 'Temporal cum clause', 'Passive periphrastic'],
    culturalContext: 'Reflects Neoplatonic beliefs about the soul\'s capacity for divine knowledge when freed from bodily constraints.',
    modernRelevance: 'Relates to modern discussions about consciousness, dreams, and altered states of awareness.',
    vocabulary: [
      {
        word: 'divinationis',
        lemma: 'divinatio',
        partOfSpeech: 'noun',
        definition: 'prophecy, divination, supernatural knowledge',
        difficulty: 'Advanced',
        frequency: 12,
        culturalSignificance: 'Central to Roman religious and philosophical thought about accessing divine knowledge'
      },
      {
        word: 'vinculis',
        lemma: 'vinculum',
        partOfSpeech: 'noun',
        definition: 'bond, chain, fetter',
        difficulty: 'Intermediate',
        frequency: 18,
        culturalSignificance: 'Metaphor for the soul\'s imprisonment in the physical body, common in Platonic thought'
      }
    ]
  },
  {
    id: 'sat-3-14',
    title: 'Roman Values and Character',
    latin: 'Virtus Romana non in bellica tantum gloria consistit, sed in omni vitae ratione pietate, gravitate, constantia elucet.',
    german: 'Die römische Tugend besteht nicht nur in kriegerischem Ruhm, sondern leuchtet in der ganzen Lebensführung durch Frömmigkeit, Würde und Beständigkeit hervor.',
    english: 'Roman virtue does not consist only in military glory, but shines forth in every aspect of life through piety, dignity, and constancy.',
    source: 'Saturnalia III.14.2',
    book: 3,
    chapter: 14,
    section: 2,
    culturalTheme: 'Social',
    difficulty: 'Beginner',
    wordCount: 18,
    estimatedReadingTime: 2,
    grammarFeatures: ['Ablative of manner', 'Chiasmus', 'Hendiadys'],
    culturalContext: 'Articulates core Roman values that distinguished Roman character and justified their dominance.',
    modernRelevance: 'Parallels modern discussions about character education and civic virtues in society.',
    vocabulary: [
      {
        word: 'pietate',
        lemma: 'pietas',
        partOfSpeech: 'noun',
        definition: 'duty, devotion, loyalty (to gods, family, state)',
        difficulty: 'Common',
        frequency: 25,
        culturalSignificance: 'Fundamental Roman virtue encompassing religious, familial, and civic obligations'
      },
      {
        word: 'gravitate',
        lemma: 'gravitas',
        partOfSpeech: 'noun',
        definition: 'weight, dignity, seriousness, moral authority',
        difficulty: 'Intermediate',
        frequency: 20,
        culturalSignificance: 'Essential quality of Roman leadership and social standing'
      }
    ]
  }
];

interface TextProcessorMobileProps {
  onBackPress: () => void;
  language: 'DE' | 'EN' | 'LA';
}

const TextProcessorMobile: React.FC<TextProcessorMobileProps> = ({
  onBackPress,
  language = 'DE'
}) => {
  // State management
  const [selectedPassage, setSelectedPassage] = useState<TextPassage | null>(null);
  const [activeTab, setActiveTab] = useState<'read' | 'analyze' | 'vocabulary' | 'notes'>('read');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState<ReadingProgress[]>([]);
  const [bookmarkedPassages, setBookmarkedPassages] = useState<string[]>([]);
  const [analysisResults, setAnalysisResults] = useState<SemanticAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [readingMode, setReadingMode] = useState<'latin' | 'parallel' | 'translation'>('latin');
  const [showVocabularyHelp, setShowVocabularyHelp] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  // Filter passages based on search
  const filteredPassages = useMemo(() => {
    if (!searchQuery) return SAMPLE_PASSAGES;
    return SAMPLE_PASSAGES.filter(passage => 
      passage.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      passage.latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      passage.culturalTheme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      passage.source.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Simulate semantic analysis
  const performSemanticAnalysis = async (passage: TextPassage) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysis: SemanticAnalysis = {
      mainThemes: [
        passage.culturalTheme,
        'Classical literature',
        'Roman culture',
        'Late antiquity'
      ],
      rhetoricalDevices: [
        'Periodic sentences',
        'Metaphorical language',
        'Formal register',
        'Classical allusions'
      ],
      culturalReferences: [
        'Roman social customs',
        'Religious practices',
        'Philosophical traditions',
        'Educational methods'
      ],
      philosophicalConcepts: [
        'Virtue ethics',
        'Cultural transmission',
        'Knowledge preservation',
        'Social harmony'
      ],
      grammarComplexity: passage.difficulty === 'Advanced' ? 8.5 : 
                        passage.difficulty === 'Intermediate' ? 6.5 : 4.5,
      readabilityScore: passage.difficulty === 'Advanced' ? 7.2 : 
                       passage.difficulty === 'Intermediate' ? 5.8 : 3.5,
      keyTerms: passage.vocabulary.map(v => v.word),
      structuralAnalysis: `This passage demonstrates ${passage.grammarFeatures.join(', ').toLowerCase()} typical of classical Latin prose. The sentence structure reflects the formal register appropriate for ${passage.culturalTheme.toLowerCase()} discourse.`
    };
    
    setAnalysisResults(analysis);
    setIsAnalyzing(false);
  };

  // Handle passage selection
  const handlePassageSelect = (passage: TextPassage) => {
    setSelectedPassage(passage);
    setAnalysisResults(null);
  };

  // Toggle bookmark
  const toggleBookmark = (passageId: string) => {
    setBookmarkedPassages(prev => 
      prev.includes(passageId) 
        ? prev.filter(id => id !== passageId)
        : [...prev, passageId]
    );
  };

  // Get theme color
  const getThemeColor = (theme: string) => {
    switch (theme) {
      case 'Religious': return 'from-purple-500 to-indigo-600';
      case 'Social': return 'from-green-500 to-teal-600';
      case 'Philosophy': return 'from-blue-500 to-cyan-600';
      case 'Astronomy': return 'from-orange-500 to-red-600';
      case 'Literature': return 'from-pink-500 to-rose-600';
      case 'Education': return 'from-yellow-500 to-amber-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  // Passage List Component
  const PassageList = () => (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
        <input
          type="text"
          placeholder="Search passages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Filter Options */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-white/60 flex-shrink-0" />
        {['All', 'Social', 'Philosophy', 'Religious', 'Astronomy'].map((filter) => (
          <button
            key={filter}
            className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm whitespace-nowrap hover:bg-white/20 transition-colors"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Passage Cards */}
      {filteredPassages.map((passage) => (
        <motion.div
          key={passage.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-4 border cursor-pointer transition-all duration-300 ${
            selectedPassage?.id === passage.id
              ? 'bg-blue-500/20 border-blue-400'
              : 'bg-white/10 border-white/20 hover:bg-white/15'
          }`}
          onClick={() => handlePassageSelect(passage)}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">{passage.title}</h3>
              <p className="text-white/70 text-sm">{passage.source}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(passage.id);
              }}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <Bookmark 
                className={`w-5 h-5 ${
                  bookmarkedPassages.includes(passage.id) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-white/60'
                }`} 
              />
            </button>
          </div>

          <div className="flex items-center space-x-4 text-xs text-white/60 mb-3">
            <span className={`px-2 py-1 rounded-full bg-gradient-to-r ${getThemeColor(passage.culturalTheme)}`}>
              {passage.culturalTheme}
            </span>
            <span className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>{passage.difficulty}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{passage.estimatedReadingTime}m</span>
            </span>
          </div>

          <p className="text-white/80 text-sm line-clamp-2">
            {passage.latin.length > 100 
              ? passage.latin.substring(0, 100) + '...' 
              : passage.latin}
          </p>
        </motion.div>
      ))}
    </div>
  );

  // Reading Interface Component
  const ReadingInterface = () => {
    if (!selectedPassage) return null;

    return (
      <div className="space-y-6">
        {/* Reading Header */}
        <div className={`bg-gradient-to-r ${getThemeColor(selectedPassage.culturalTheme)} rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">{selectedPassage.title}</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleBookmark(selectedPassage.id)}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <Bookmark 
                  className={`w-5 h-5 ${
                    bookmarkedPassages.includes(selectedPassage.id) 
                      ? 'text-yellow-300 fill-current' 
                      : 'text-white'
                  }`} 
                />
              </button>
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Share className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          
          <p className="text-white/90 mb-4">{selectedPassage.source}</p>
          
          <div className="flex items-center space-x-4 text-sm">
            <span className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>{selectedPassage.wordCount} words</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{selectedPassage.estimatedReadingTime} min read</span>
            </span>
            <span className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{selectedPassage.difficulty}</span>
            </span>
          </div>
        </div>

        {/* Reading Controls */}
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Reading Mode</span>
            </div>
            <div className="flex items-center space-x-1">
              <button className="px-2 py-1 text-xs bg-white/10 rounded">
                A-
              </button>
              <span className="text-sm">{fontSize}px</span>
              <button className="px-2 py-1 text-xs bg-white/10 rounded">
                A+
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {['latin', 'parallel', 'translation'].map((mode) => (
              <button
                key={mode}
                onClick={() => setReadingMode(mode as any)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  readingMode === mode
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {mode === 'latin' ? 'Latin Only' :
                 mode === 'parallel' ? 'Side by Side' : 'Translation'}
              </button>
            ))}
          </div>
        </div>

        {/* Text Content */}
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          {readingMode === 'latin' && (
            <div 
              className="text-white leading-relaxed"
              style={{ fontSize: `${fontSize}px` }}
            >
              {selectedPassage.latin.split(' ').map((word, index) => (
                <span
                  key={index}
                  className={`cursor-pointer hover:bg-blue-500/30 rounded px-1 transition-colors ${
                    selectedWord === word ? 'bg-blue-500/50' : ''
                  }`}
                  onClick={() => setSelectedWord(word)}
                >
                  {word}{' '}
                </span>
              ))}
            </div>
          )}
          
          {readingMode === 'parallel' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-blue-300 mb-3">Latin</h4>
                <div 
                  className="text-white leading-relaxed"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {selectedPassage.latin}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-green-300 mb-3">
                  {language === 'DE' ? 'German' : 'English'}
                </h4>
                <div 
                  className="text-white/90 leading-relaxed"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {language === 'DE' ? selectedPassage.german : selectedPassage.english}
                </div>
              </div>
            </div>
          )}
          
          {readingMode === 'translation' && (
            <div 
              className="text-white leading-relaxed"
              style={{ fontSize: `${fontSize}px` }}
            >
              {language === 'DE' ? selectedPassage.german : selectedPassage.english}
            </div>
          )}
        </div>

        {/* Audio Controls */}
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                {isPlaying ? 
                  <Pause className="w-5 h-5 text-white" /> : 
                  <Play className="w-5 h-5 text-white ml-1" />
                }
              </button>
              <button className="p-2 text-white/60 hover:text-white transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/60 hover:text-white transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-white/70">Speed:</span>
              <select 
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white"
              >
                <option value={0.75}>0.75x</option>
                <option value={1.0}>1.0x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Analysis Tab Component
  const AnalysisTab = () => {
    if (!selectedPassage) return null;

    return (
      <div className="space-y-6">
        {/* Analysis Trigger */}
        <div className="text-center">
          <button
            onClick={() => performSemanticAnalysis(selectedPassage)}
            disabled={isAnalyzing || !!analysisResults}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:from-purple-600 hover:to-pink-700"
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing...</span>
              </div>
            ) : analysisResults ? (
              'Analysis Complete'
            ) : (
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Analyze Text</span>
              </div>
            )}
          </button>
        </div>

        {/* Analysis Results */}
        {analysisResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Main Themes */}
            <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-400/30">
              <h4 className="font-bold text-blue-300 mb-3 flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Main Themes</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysisResults.mainThemes.map((theme, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-500/30 rounded-full text-sm">
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Complexity Scores */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-500/20 rounded-xl p-4 border border-green-400/30">
                <h5 className="font-semibold text-green-300 mb-2">Grammar Complexity</h5>
                <div className="text-2xl font-bold text-green-200">
                  {analysisResults.grammarComplexity}/10
                </div>
              </div>
              <div className="bg-orange-500/20 rounded-xl p-4 border border-orange-400/30">
                <h5 className="font-semibold text-orange-300 mb-2">Readability</h5>
                <div className="text-2xl font-bold text-orange-200">
                  {analysisResults.readabilityScore}/10
                </div>
              </div>
            </div>

            {/* Structural Analysis */}
            <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-400/30">
              <h4 className="font-bold text-purple-300 mb-3 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Structural Analysis</span>
              </h4>
              <p className="text-white/90 leading-relaxed">
                {analysisResults.structuralAnalysis}
              </p>
            </div>

            {/* Cultural Context */}
            <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-400/30">
              <h4 className="font-bold text-yellow-300 mb-3 flex items-center space-x-2">
                <Lightbulb className="w-5 h-5" />
                <span>Cultural Insights</span>
              </h4>
              <div className="space-y-2">
                <p className="text-white/90 text-sm leading-relaxed">
                  <span className="font-medium">Context:</span> {selectedPassage.culturalContext}
                </p>
                <p className="text-white/90 text-sm leading-relaxed">
                  <span className="font-medium">Modern Relevance:</span> {selectedPassage.modernRelevance}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  // Vocabulary Tab Component
  const VocabularyTab = () => {
    if (!selectedPassage) return null;

    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl p-4 border border-green-400/30">
          <h3 className="font-bold text-green-300 mb-3">Key Vocabulary</h3>
          <p className="text-white/80 text-sm">
            Tap any word in the text to see its definition and cultural significance.
          </p>
        </div>

        {selectedPassage.vocabulary.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-lg text-blue-300">{item.word}</h4>
              <span className={`px-2 py-1 rounded-full text-xs ${
                item.difficulty === 'Advanced' ? 'bg-red-500/30 text-red-300' :
                item.difficulty === 'Intermediate' ? 'bg-yellow-500/30 text-yellow-300' :
                'bg-green-500/30 text-green-300'
              }`}>
                {item.difficulty}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <p className="text-white/90">
                <span className="font-medium text-purple-300">Lemma:</span> {item.lemma}
              </p>
              <p className="text-white/90">
                <span className="font-medium text-purple-300">Part of Speech:</span> {item.partOfSpeech}
              </p>
              <p className="text-white/90">
                <span className="font-medium text-purple-300">Definition:</span> {item.definition}
              </p>
              <p className="text-white/80 leading-relaxed">
                <span className="font-medium text-yellow-300">Cultural Significance:</span> {item.culturalSignificance}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBackPress}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
            <span>Back</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold">📚 Text Processor</h1>
            <p className="text-sm text-gray-400">AI-Enhanced Reading</p>
          </div>
          
          <Settings className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {!selectedPassage ? (
          <PassageList />
        ) : (
          <div>
            {/* Tab Navigation */}
            <div className="bg-black/30 rounded-xl mb-6 border border-white/10">
              <div className="flex overflow-x-auto">
                {[
                  { id: 'read', label: 'Read', icon: BookOpen },
                  { id: 'analyze', label: 'Analyze', icon: Brain },
                  { id: 'vocabulary', label: 'Vocabulary', icon: Zap },
                  { id: 'notes', label: 'Notes', icon: Bookmark }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'text-blue-300 bg-blue-500/20'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'read' && <ReadingInterface />}
                {activeTab === 'analyze' && <AnalysisTab />}
                {activeTab === 'vocabulary' && <VocabularyTab />}
                {activeTab === 'notes' && (
                  <div className="text-center py-12">
                    <Bookmark className="w-12 h-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">Notes feature coming soon</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextProcessorMobile;
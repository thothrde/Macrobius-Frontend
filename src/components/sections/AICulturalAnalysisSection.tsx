/**
 * 🏛️ AI CULTURAL ANALYSIS SECTION
 * Revolutionary interface for AI-powered cultural theme detection and analysis
 * Processes authentic Macrobius content with intelligent pattern recognition
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Search, 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  Globe, 
  Zap,
  BarChart3,
  Filter,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Target
} from 'lucide-react';
import { 
  aiCulturalAnalysisEngine, 
  CulturalTheme, 
  MacrobiusPassage, 
  CulturalAnalysisResult,
  AnalysisFilters 
} from '@/lib/ai-cultural-analysis-engine';

interface AnalysisProps {
  className?: string;
}

export default function AICulturalAnalysisSection({ className = '' }: AnalysisProps) {
  const [analysisText, setAnalysisText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<CulturalAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [culturalThemes, setCulturalThemes] = useState<CulturalTheme[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<MacrobiusPassage[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<'EN' | 'DE' | 'LA'>('EN');
  const [activeTab, setActiveTab] = useState<'analyze' | 'explore' | 'statistics'>('analyze');
  const [statistics, setStatistics] = useState<any>(null);

  useEffect(() => {
    // Load cultural themes and statistics
    const themes = aiCulturalAnalysisEngine.getCulturalThemes(currentLanguage);
    setCulturalThemes(themes);
    
    const stats = aiCulturalAnalysisEngine.getAnalysisStatistics();
    setStatistics(stats);
  }, [currentLanguage]);

  const handleAnalyzeText = async () => {
    if (!analysisText.trim()) return;

    setIsAnalyzing(true);
    try {
      const result = await aiCulturalAnalysisEngine.analyzePassage(analysisText);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleThemeFilter = (themeId: string) => {
    setSelectedThemes(prev => 
      prev.includes(themeId) 
        ? prev.filter(id => id !== themeId)
        : [...prev, themeId]
    );
  };

  const handleSearchPassages = () => {
    const filters: AnalysisFilters = {
      themes: selectedThemes.length > 0 ? selectedThemes : undefined,
      language: currentLanguage
    };
    
    const results = aiCulturalAnalysisEngine.searchPassages(filters);
    setSearchResults(results);
  };

  const sampleTexts = [
    'Saturni autem stella, quae φαίνων dicitur, quod φαεινή sit, id est lucida, triginta fere annis cursum suum conficit',
    'Convivium autem nostrum non solum voluptatis causa, sed maxime virtutis exercendae gratia celebramus',
    'Philosophia enim, quae est mater omnium bonarum artium, nihil aliud docet quam ut recte vivamus'
  ];

  return (
    <section className={`py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ${className}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4">
              <Brain className="h-12 w-12 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-5xl font-bold text-gray-900 mb-2">
                AI Cultural Analysis Engine
              </h2>
              <p className="text-xl text-blue-600 font-semibold">
                Intelligent Cultural Theme Detection & Pattern Recognition
              </p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Revolutionary AI system that analyzes Latin texts to identify cultural themes, 
            detect historical patterns, and establish connections to modern applications.
          </p>

          {/* Language Selector */}
          <div className="flex justify-center mt-8">
            <div className="flex bg-white rounded-lg p-1 shadow-lg border border-gray-200">
              {(['EN', 'DE', 'LA'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLanguage(lang)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentLanguage === lang
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {lang === 'EN' ? '🇬🇧 English' : lang === 'DE' ? '🇩🇪 Deutsch' : '🏛️ Latina'}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white rounded-xl p-2 shadow-lg border border-gray-200">
            {[
              { id: 'analyze', label: 'AI Analysis', icon: Brain },
              { id: 'explore', label: 'Theme Explorer', icon: Search },
              { id: 'statistics', label: 'Statistics', icon: BarChart3 }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* AI Analysis Tab */}
          {activeTab === 'analyze' && (
            <motion.div
              key="analyze"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Analysis Input */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <div className="flex items-center mb-6">
                  <Zap className="h-6 w-6 text-blue-500 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Text Analysis Engine</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Latin text for cultural analysis:
                    </label>
                    <textarea
                      value={analysisText}
                      onChange={(e) => setAnalysisText(e.target.value)}
                      placeholder="Paste Latin text here for AI-powered cultural analysis..."
                      className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Sample Texts */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Or try these sample texts:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {sampleTexts.map((text, index) => (
                        <button
                          key={index}
                          onClick={() => setAnalysisText(text)}
                          className="p-3 text-left text-sm bg-gray-50 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                        >
                          {text.substring(0, 60)}...
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleAnalyzeText}
                    disabled={!analysisText.trim() || isAnalyzing}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="h-5 w-5 mr-2" />
                        Analyze with AI
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Analysis Results */}
              {analysisResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl p-8 shadow-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">Analysis Results</h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Target className="h-4 w-4 mr-1" />
                      Confidence: {Math.round(analysisResult.confidence * 100)}%
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Cultural Themes */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Detected Cultural Themes</h4>
                      <div className="space-y-3">
                        {analysisResult.themes.map((theme) => (
                          <div key={theme.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">{theme.name}</span>
                              <span 
                                className="px-2 py-1 text-xs rounded-full text-white"
                                style={{ backgroundColor: theme.color }}
                              >
                                {theme.passages} passages
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{theme.description}</p>
                            <p className="text-xs text-blue-600 mt-2">{theme.modernRelevance}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Modern Connections */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Modern Connections</h4>
                      <div className="space-y-3">
                        {analysisResult.modernConnections.map((connection) => (
                          <div key={connection.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">{connection.ancientConcept}</span>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                {Math.round(connection.confidence * 100)}% match
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{connection.explanation}</p>
                            <p className="text-sm font-medium text-green-700">{connection.modernApplication}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Insights and Recommendations */}
                  <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Cultural Insights</h4>
                      <ul className="space-y-2">
                        {analysisResult.insights.map((insight, index) => (
                          <li key={index} className="flex items-start">
                            <Sparkles className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {analysisResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Theme Explorer Tab */}
          {activeTab === 'explore' && (
            <motion.div
              key="explore"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Theme Filter */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <div className="flex items-center mb-6">
                  <Filter className="h-6 w-6 text-blue-500 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Cultural Theme Explorer</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {culturalThemes.map((theme) => (
                    <div
                      key={theme.id}
                      onClick={() => handleThemeFilter(theme.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        selectedThemes.includes(theme.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{theme.name}</span>
                        <span 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.color }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{theme.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {theme.passages} passages ({Math.round(theme.prevalence * 100)}%)
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSearchPassages}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search Passages
                </button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Found {searchResults.length} passages
                  </h3>
                  
                  <div className="space-y-4">
                    {searchResults.slice(0, 5).map((passage) => (
                      <div key={passage.id} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className="text-sm font-medium text-blue-600">
                              {passage.workType} {passage.bookNumber}.{passage.chapterNumber}.{passage.sectionNumber}
                            </span>
                            <span className={`ml-3 text-xs px-2 py-1 rounded-full ${
                              passage.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                              passage.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                              passage.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {passage.difficulty}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">Relevance</div>
                            <div className="text-sm font-medium">{Math.round(passage.relevanceScore * 100)}%</div>
                          </div>
                        </div>
                        
                        <p className="text-gray-800 mb-3 italic">"{passage.latinText}"</p>
                        <p className="text-sm text-gray-600 mb-2">{passage.modernRelevance}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {passage.keywords.map((keyword, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Statistics Tab */}
          {activeTab === 'statistics' && statistics && (
            <motion.div
              key="statistics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <div className="flex items-center mb-6">
                  <BarChart3 className="h-6 w-6 text-blue-500 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Analysis Statistics</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{statistics.totalPassages}</div>
                    <div className="text-sm text-gray-600">Total Passages</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {Math.round(statistics.averageRelevanceScore * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Avg. Relevance Score</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {Object.keys(statistics.themeDistribution).length}
                    </div>
                    <div className="text-sm text-gray-600">Cultural Themes</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Theme Distribution */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Theme Distribution</h4>
                    <div className="space-y-3">
                      {Object.entries(statistics.themeDistribution).map(([theme, count]) => {
                        const percentage = Math.round((count / statistics.totalPassages) * 100);
                        return (
                          <div key={theme} className="flex items-center">
                            <div className="w-24 text-sm text-gray-600 capitalize">{theme}</div>
                            <div className="flex-1 mx-3">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                            <div className="text-sm font-medium text-gray-900 w-16">{count} ({percentage}%)</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Difficulty Distribution */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Difficulty Distribution</h4>
                    <div className="space-y-3">
                      {Object.entries(statistics.difficultyDistribution).map(([difficulty, count]) => {
                        const percentage = Math.round((count / statistics.totalPassages) * 100);
                        const colors = {
                          'Beginner': 'bg-green-500',
                          'Intermediate': 'bg-blue-500', 
                          'Advanced': 'bg-orange-500',
                          'Expert': 'bg-red-500'
                        };
                        return (
                          <div key={difficulty} className="flex items-center">
                            <div className="w-24 text-sm text-gray-600">{difficulty}</div>
                            <div className="flex-1 mx-3">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`${colors[difficulty as keyof typeof colors]} h-2 rounded-full`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                            <div className="text-sm font-medium text-gray-900 w-16">{count} ({percentage}%)</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Oracle Cloud Integration Status */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full">
            <Clock className="h-5 w-5 text-blue-600 mr-3" />
            <span className="text-blue-700 font-medium">
              Ready for Oracle Cloud Integration - 1,401 Passages Available
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
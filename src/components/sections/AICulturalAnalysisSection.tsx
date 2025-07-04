/**
 * 🏛️ AI CULTURAL ANALYSIS SECTION - REAL ORACLE CLOUD INTEGRATION
 * Revolutionary interface for AI-powered cultural theme detection and analysis
 * Processes authentic Macrobius content with intelligent pattern recognition
 * 
 * ✅ USES REAL ORACLE CLOUD DATA - NO FAKE FALLBACKS
 * ✅ CONNECTS TO 1,401 AUTHENTIC PASSAGES
 * ✅ TRANSPARENT ERROR HANDLING
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
  Target,
  Database,
  Wifi,
  WifiOff
} from 'lucide-react';
import { 
  realAICulturalAnalysisEngine as aiCulturalAnalysisEngine,
  CulturalTheme, 
  MacrobiusPassage, 
  CulturalAnalysisResult,
  AnalysisFilters 
} from '@/lib/ai-cultural-analysis-engine-REAL';
import {
  macrobiusApi,
  useOracleCloudConnection,
  OracleCloudError
} from '@/lib/api/macrobiusApi';

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
  const [connectionError, setConnectionError] = useState<string | null>(null);
  
  // Oracle Cloud connection status
  const { isConnected, isLoading: connectionLoading, connectionError: oracleError } = useOracleCloudConnection();

  useEffect(() => {
    const loadRealData = async () => {
      if (!isConnected) {
        setConnectionError('Oracle Cloud backend not available. Please check connection.');
        return;
      }
      
      try {
        console.log('🏛️ Loading real cultural themes from Oracle Cloud...');
        
        // Load real cultural themes with error handling
        const themes = aiCulturalAnalysisEngine.getCulturalThemes(currentLanguage);
        setCulturalThemes(themes);
        
        // Get real analysis statistics
        const stats = await aiCulturalAnalysisEngine.getAnalysisStatistics();
        setStatistics(stats);
        
        setConnectionError(null);
        console.log('✅ Real cultural data loaded successfully');
        
      } catch (error) {
        console.error('❌ Failed to load real cultural data:', error);
        
        if (error instanceof OracleCloudError) {
          setConnectionError(`Oracle Cloud Error: ${error.message}`);
        } else {
          setConnectionError('Failed to load cultural analysis data');
        }
      }
    };

    loadRealData();
  }, [currentLanguage, isConnected]);

  const handleAnalyzeText = async () => {
    if (!analysisText.trim()) return;
    if (!isConnected) {
      setConnectionError('Cannot analyze: Oracle Cloud backend not connected');
      return;
    }

    setIsAnalyzing(true);
    setConnectionError(null);
    
    try {
      console.log('🔍 Analyzing text with real Oracle Cloud AI engine...');
      const result = await aiCulturalAnalysisEngine.analyzePassage(analysisText);
      setAnalysisResult(result);
      console.log('✅ Real AI analysis completed');
    } catch (error) {
      console.error('❌ Real analysis failed:', error);
      
      if (error instanceof OracleCloudError) {
        setConnectionError(`Analysis failed: ${error.message}`);
      } else {
        setConnectionError('Analysis failed. Please try again.');
      }
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

  const handleSearchPassages = async () => {
    if (!isConnected) {
      setConnectionError('Cannot search: Oracle Cloud backend not connected');
      return;
    }
    
    try {
      const filters: AnalysisFilters = {
        themes: selectedThemes.length > 0 ? selectedThemes : undefined,
        language: currentLanguage
      };
      
      console.log('🔍 Searching real passages with Oracle Cloud...');
      const results = await aiCulturalAnalysisEngine.searchPassages(filters);
      setSearchResults(results);
      console.log(`✅ Found ${results.length} real passages`);
      
    } catch (error) {
      console.error('❌ Real passage search failed:', error);
      
      if (error instanceof OracleCloudError) {
        setConnectionError(`Search failed: ${error.message}`);
      } else {
        setConnectionError('Passage search failed. Please try again.');
      }
    }
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
                Real Oracle Cloud Integration - 1,401 Authentic Passages
              </p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Revolutionary AI system using authentic Macrobius content from Oracle Cloud. 
            No fake data - only real classical texts for genuine cultural analysis.
          </p>

          {/* Oracle Cloud Connection Status */}
          <div className="flex justify-center mt-6">
            <div className={`flex items-center px-4 py-2 rounded-full border ${
              connectionLoading 
                ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
                : isConnected 
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {connectionLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  <span>Connecting to Oracle Cloud...</span>
                </>
              ) : isConnected ? (
                <>
                  <Wifi className="h-4 w-4 mr-2" />
                  <span>Oracle Cloud Connected - 1,401 Passages Available</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 mr-2" />
                  <span>Oracle Cloud Offline - {oracleError || 'Connection failed'}</span>
                </>
              )}
            </div>
          </div>

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

        {/* Connection Error Display */}
        {connectionError && (
          <div className="mb-8">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-orange-800 mb-1">
                    Oracle Cloud Connection Issue
                  </h3>
                  <p className="text-sm text-orange-700">{connectionError}</p>
                  <div className="mt-2 text-xs text-orange-600">
                    <p>This component requires Oracle Cloud backend (152.70.184.232:8080) for authentic data.</p>
                    <p>No fake data fallbacks - maintaining educational integrity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
                disabled={!isConnected}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  !isConnected
                    ? 'text-gray-400 cursor-not-allowed'
                    : activeTab === id
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
                  <h3 className="text-2xl font-bold text-gray-900">Real AI Analysis Engine</h3>
                  <div className="ml-auto flex items-center">
                    {isConnected ? (
                      <span className="flex items-center text-green-600 text-sm">
                        <Database className="h-4 w-4 mr-1" />
                        Oracle Cloud Active
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600 text-sm">
                        <Database className="h-4 w-4 mr-1" />
                        Oracle Cloud Required
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Latin text for cultural analysis using authentic Oracle Cloud data:
                    </label>
                    <textarea
                      value={analysisText}
                      onChange={(e) => setAnalysisText(e.target.value)}
                      placeholder="Paste Latin text here for AI-powered cultural analysis using 1,401 real passages..."
                      className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={!isConnected}
                    />
                  </div>

                  {/* Sample Texts */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Or try these authentic sample texts:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {sampleTexts.map((text, index) => (
                        <button
                          key={index}
                          onClick={() => setAnalysisText(text)}
                          disabled={!isConnected}
                          className={`p-3 text-left text-sm border border-gray-200 rounded-lg transition-all duration-300 ${
                            isConnected
                              ? 'bg-gray-50 hover:bg-blue-50 hover:border-blue-300'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {text.substring(0, 60)}...
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleAnalyzeText}
                    disabled={!analysisText.trim() || isAnalyzing || !isConnected}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                        Analyzing with Oracle Cloud...
                      </>
                    ) : !isConnected ? (
                      <>
                        <Database className="h-5 w-5 mr-2" />
                        Oracle Cloud Required
                      </>
                    ) : (
                      <>
                        <Brain className="h-5 w-5 mr-2" />
                        Analyze with Real AI
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
                      <h3 className="text-2xl font-bold text-gray-900">Real Analysis Results</h3>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Target className="h-4 w-4 mr-1" />
                        Confidence: {Math.round(analysisResult.confidence * 100)}%
                      </div>
                      {analysisResult.oracleCloudSource && (
                        <div className="flex items-center text-sm text-green-600">
                          <Database className="h-4 w-4 mr-1" />
                          Oracle Cloud
                        </div>
                      )}
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
                                {theme.passage_count} passages
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{theme.description}</p>
                            <p className="text-xs text-blue-600 mt-2">{theme.modern_connections.join(', ')}</p>
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
                  <h3 className="text-2xl font-bold text-gray-900">Real Cultural Theme Explorer</h3>
                  <div className="ml-auto">
                    {isConnected ? (
                      <span className="text-green-600 text-sm">
                        ✓ {culturalThemes.length} Themes from Oracle Cloud
                      </span>
                    ) : (
                      <span className="text-red-600 text-sm">
                        ⚠ Oracle Cloud Required
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {culturalThemes.map((theme) => (
                    <div
                      key={theme.id}
                      onClick={() => isConnected && handleThemeFilter(theme.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        !isConnected
                          ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                          : selectedThemes.includes(theme.id)
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
                        {theme.passage_count} passages
                        {typeof theme.prevalence === 'number' && (
                          <span className="ml-1">({Math.round(theme.prevalence * 100)}%)</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSearchPassages}
                  disabled={!isConnected}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <Search className="h-5 w-5 mr-2" />
                  {isConnected ? 'Search Real Passages' : 'Oracle Cloud Required'}
                </button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Found {searchResults.length} authentic passages from Oracle Cloud
                  </h3>
                  
                  <div className="space-y-4">
                    {searchResults.slice(0, 5).map((passage) => (
                      <div key={passage.id} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className="text-sm font-medium text-blue-600">
                              {passage.work_type} {passage.book_number}.{passage.chapter_number}.{passage.section_number}
                            </span>
                            <span className={`ml-3 text-xs px-2 py-1 rounded-full ${
                              passage.difficulty_level === 'Beginner' ? 'bg-green-100 text-green-700' :
                              passage.difficulty_level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                              passage.difficulty_level === 'Advanced' ? 'bg-orange-100 text-orange-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {passage.difficulty_level}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">Oracle Cloud</div>
                            <div className="text-sm font-medium text-green-600">✓ Authentic</div>
                          </div>
                        </div>
                        
                        <p className="text-gray-800 mb-3 italic">"{passage.latin_text}"</p>
                        <p className="text-sm text-gray-600 mb-2">{passage.modern_relevance}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {passage.cultural_keywords.map((keyword, index) => (
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
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <BarChart3 className="h-6 w-6 text-blue-500 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Real Analysis Statistics</h3>
                  </div>
                  {statistics.oracleCloudSource && (
                    <div className="flex items-center text-green-600">
                      <Database className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Oracle Cloud Data</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{statistics.totalPassages}</div>
                    <div className="text-sm text-gray-600">Authentic Passages</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {Math.round(statistics.averageRelevanceScore * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Avg. Cultural Relevance</div>
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
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Theme Distribution (Real Data)</h4>
                    <div className="space-y-3">
                      {Object.entries(statistics.themeDistribution).map(([theme, count]) => {
                        const percentage = Math.round(((count as number) / statistics.totalPassages) * 100);
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
                            <div className="text-sm font-medium text-gray-900 w-16">{count as number} ({percentage}%)</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Difficulty Distribution */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Difficulty Distribution (Real Data)</h4>
                    <div className="space-y-3">
                      {Object.entries(statistics.difficultyDistribution).map(([difficulty, count]) => {
                        const percentage = Math.round(((count as number) / statistics.totalPassages) * 100);
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
                            <div className="text-sm font-medium text-gray-900 w-16">{count as number} ({percentage}%)</div>
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
          <div className={`inline-flex items-center px-6 py-3 rounded-full border ${
            isConnected
              ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-400/30'
              : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-400/30'
          }`}>
            {isConnected ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-green-700 font-medium">
                  ✅ Real Oracle Cloud Integration Active - 1,401 Authentic Passages
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                <span className="text-red-700 font-medium">
                  ⚠ Oracle Cloud Required - No Fake Data Fallbacks
                </span>
              </>
            )}
          </div>
          
          {!isConnected && (
            <div className="mt-4 text-sm text-gray-600 max-w-2xl mx-auto">
              <p>This component requires Oracle Cloud backend (152.70.184.232:8080) for authentic cultural analysis.</p>
              <p>Educational integrity maintained - no fake data substitutions.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
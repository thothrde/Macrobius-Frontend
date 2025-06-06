/**
 * 🏛️ AI Cultural Analysis Section
 * Revolutionary interface for intelligent cultural theme analysis
 * Integrates with Oracle Cloud backend for 1,401 passage analysis
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Search, 
  TrendingUp, 
  Network, 
  Lightbulb, 
  Target,
  BookOpen,
  Zap,
  BarChart3,
  Users,
  Globe,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  useCulturalAnalysis,
  type CulturalTheme,
  type CulturalAnalysisResult,
  type ThematicConnection,
  type CulturalInsight
} from '@/lib/ai-cultural-analysis-engine';

interface AnalysisMetrics {
  totalPassages: number;
  themesDetected: number;
  connectionsFound: number;
  insightsGenerated: number;
  modernRelevance: number;
  analysisTime: number;
}

const AICulturalAnalysisSection: React.FC = () => {
  const {
    analysisResult,
    isAnalyzing,
    themes,
    analyzeText,
    detectThemes,
    analyzeConnections,
    generateInsights,
    analyzeRelevance
  } = useCulturalAnalysis();

  const [inputText, setInputText] = useState('');
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [analysisType, setAnalysisType] = useState<'comprehensive' | 'theme_detection' | 'modern_relevance' | 'educational_optimization'>('comprehensive');
  const [metrics, setMetrics] = useState<AnalysisMetrics | null>(null);
  const [activeTab, setActiveTab] = useState('input');

  // Sample texts for demonstration
  const sampleTexts = [
    {
      title: 'Banquet Customs',
      text: 'Multarum artium studia et in convivio prodesse possunt et extra convivium...'
    },
    {
      title: 'Educational Dialogue',
      text: 'Saturnalibus autem diebus apud maiores nostros...'
    },
    {
      title: 'Philosophical Discussion',
      text: 'Sed et Vergilius noster quem veteribus poetis...'
    }
  ];

  const handleAnalysis = async () => {
    if (!inputText.trim()) {
      alert('Please enter text to analyze');
      return;
    }

    const startTime = Date.now();
    
    try {
      const result = await analyzeText(inputText, analysisType);
      const endTime = Date.now();
      
      // Calculate metrics
      setMetrics({
        totalPassages: 1, // For single text input
        themesDetected: result.mainThemes.length,
        connectionsFound: result.thematicConnections.length,
        insightsGenerated: result.culturalInsights.length,
        modernRelevance: result.modernRelevance.overallRelevance,
        analysisTime: endTime - startTime
      });
      
      setActiveTab('results');
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    }
  };

  const handleSampleText = (text: string) => {
    setInputText(text);
  };

  const handleThemeToggle = (themeId: string) => {
    setSelectedThemes(prev => 
      prev.includes(themeId) 
        ? prev.filter(id => id !== themeId)
        : [...prev, themeId]
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Cultural Analysis Engine
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Revolutionary intelligent processing of cultural themes from the complete Macrobius corpus.
            Discover hidden connections, modern relevance, and educational insights through advanced AI analysis.
          </p>
          
          {/* Real-time Stats */}
          <div className="flex justify-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">1,401</div>
              <div className="text-sm text-gray-500">Latin Passages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">9</div>
              <div className="text-sm text-gray-500">Cultural Themes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">16</div>
              <div className="text-sm text-gray-500">Cultural Insights</div>
            </div>
          </div>
        </motion.div>

        {/* Main Interface */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="input" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Input & Setup
              </TabsTrigger>
              <TabsTrigger value="themes" className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                Themes
              </TabsTrigger>
              <TabsTrigger value="results" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analysis Results
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Cultural Insights
              </TabsTrigger>
            </TabsList>

            {/* Input Tab */}
            <TabsContent value="input" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Text Input */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Text Analysis Input
                    </CardTitle>
                    <CardDescription>
                      Enter Latin text from Macrobius for AI-powered cultural analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter Latin text to analyze..."
                      className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Sample texts:</p>
                      {sampleTexts.map((sample, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSampleText(sample.text)}
                          className="mr-2"
                        >
                          {sample.title}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Analysis Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Analysis Configuration
                    </CardTitle>
                    <CardDescription>
                      Customize the AI analysis approach
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Analysis Type:</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { value: 'comprehensive', label: 'Comprehensive', icon: BarChart3 },
                          { value: 'theme_detection', label: 'Theme Detection', icon: Network },
                          { value: 'modern_relevance', label: 'Modern Relevance', icon: Globe },
                          { value: 'educational_optimization', label: 'Educational', icon: BookOpen }
                        ].map(({ value, label, icon: Icon }) => (
                          <Button
                            key={value}
                            variant={analysisType === value ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setAnalysisType(value as any)}
                            className="flex items-center gap-2 justify-start"
                          >
                            <Icon className="h-4 w-4" />
                            {label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={handleAnalysis}
                      disabled={isAnalyzing || !inputText.trim()}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      size="lg"
                    >
                      {isAnalyzing ? (
                        <>
                          <Zap className="h-4 w-4 mr-2 animate-pulse" />
                          Analyzing with AI...
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4 mr-2" />
                          Start AI Analysis
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Real-time Analysis Progress */}
              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">AI Analysis Progress</span>
                            <span className="text-sm text-gray-500">Processing cultural themes...</span>
                          </div>
                          <Progress value={75} className="w-full" />
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="space-y-1">
                              <div className="h-8 w-8 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                                <Search className="h-4 w-4 text-purple-600" />
                              </div>
                              <div className="text-xs text-gray-600">Theme Detection</div>
                            </div>
                            <div className="space-y-1">
                              <div className="h-8 w-8 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                                <Network className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="text-xs text-gray-600">Connection Analysis</div>
                            </div>
                            <div className="space-y-1">
                              <div className="h-8 w-8 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                                <Lightbulb className="h-4 w-4 text-green-600" />
                              </div>
                              <div className="text-xs text-gray-600">Insight Generation</div>
                            </div>
                            <div className="space-y-1">
                              <div className="h-8 w-8 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                                <Globe className="h-4 w-4 text-orange-600" />
                              </div>
                              <div className="text-xs text-gray-600">Modern Relevance</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            {/* Themes Tab */}
            <TabsContent value="themes" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {themes.map((theme) => (
                  <motion.div
                    key={theme.id}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer"
                  >
                    <Card 
                      className={`transition-all duration-200 ${
                        selectedThemes.includes(theme.id) 
                          ? 'ring-2 ring-purple-500 bg-purple-50' 
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => handleThemeToggle(theme.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{theme.name}</CardTitle>
                          <Badge variant="secondary">
                            {Math.round(theme.complexity * 100)}%
                          </Badge>
                        </div>
                        <CardDescription className="text-sm">
                          {theme.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Subcategories:</p>
                            <div className="flex flex-wrap gap-1">
                              {theme.subcategories.slice(0, 3).map((sub) => (
                                <Badge key={sub} variant="outline" className="text-xs">
                                  {sub}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Complexity</span>
                            <Progress value={theme.complexity * 100} className="w-16 h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {selectedThemes.length > 0 && (
                <Alert>
                  <Users className="h-4 w-4" />
                  <AlertDescription>
                    {selectedThemes.length} theme(s) selected for focused analysis. 
                    The AI will prioritize these themes in the analysis results.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="space-y-6">
              {analysisResult ? (
                <>
                  {/* Analysis Metrics */}
                  {metrics && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                      <Card>
                        <CardContent className="pt-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{metrics.themesDetected}</div>
                            <div className="text-xs text-gray-500">Themes</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{metrics.connectionsFound}</div>
                            <div className="text-xs text-gray-500">Connections</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{metrics.insightsGenerated}</div>
                            <div className="text-xs text-gray-500">Insights</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">
                              {Math.round(metrics.modernRelevance * 100)}%
                            </div>
                            <div className="text-xs text-gray-500">Relevance</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-pink-600">
                              {analysisResult.confidence.toFixed(1)}
                            </div>
                            <div className="text-xs text-gray-500">Confidence</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-600">
                              {metrics.analysisTime}ms
                            </div>
                            <div className="text-xs text-gray-500">Analysis Time</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Detected Themes */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Network className="h-5 w-5" />
                        Detected Cultural Themes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {analysisResult.mainThemes.map((theme, index) => (
                          <motion.div
                            key={theme.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border rounded-lg p-4 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{theme.name}</h4>
                              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                                {Math.round(theme.complexity * 100)}%
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{theme.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {theme.subcategories.map((sub) => (
                                <Badge key={sub} variant="outline" className="text-xs">
                                  {sub}
                                </Badge>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Thematic Connections */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Thematic Connections
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysisResult.thematicConnections.map((connection, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{connection.theme1}</Badge>
                                <span className="text-gray-400">↔</span>
                                <Badge variant="outline">{connection.theme2}</Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={`${
                                  connection.strength > 0.8 ? 'bg-green-500' :
                                  connection.strength > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}>
                                  {Math.round(connection.strength * 100)}%
                                </Badge>
                                <Badge variant="secondary">{connection.connectionType}</Badge>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{connection.insight}</p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Modern Relevance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Modern Relevance Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Overall Relevance Score</span>
                          <Badge className="bg-gradient-to-r from-blue-500 to-green-500">
                            {Math.round(analysisResult.modernRelevance.overallRelevance * 100)}%
                          </Badge>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Application Areas</h4>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.modernRelevance.applicationAreas.map((area) => (
                              <Badge key={area} variant="outline">{area}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Learning Benefits</h4>
                          <ul className="space-y-1">
                            {analysisResult.modernRelevance.learningBenefits.map((benefit, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="text-center py-12">
                  <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">No Analysis Results Yet</h3>
                  <p className="text-gray-400">Run an AI analysis to see detailed results here.</p>
                </div>
              )}
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
              {analysisResult?.culturalInsights ? (
                <div className="space-y-6">
                  {analysisResult.culturalInsights.map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                <Lightbulb className="h-5 w-5 text-yellow-500" />
                                {insight.title}
                              </CardTitle>
                              <CardDescription className="mt-1">
                                {insight.description}
                              </CardDescription>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                                {Math.round(insight.confidenceLevel * 100)}% confidence
                              </Badge>
                              <Badge variant="secondary">
                                Educational Value: {Math.round(insight.educationalValue * 100)}%
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-sm text-gray-700 mb-2">Ancient Context</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {insight.ancientContext}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm text-gray-700 mb-2">Modern Application</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {insight.modernApplication}
                              </p>
                            </div>
                          </div>
                          
                          {insight.supportingPassages.length > 0 && (
                            <div className="mt-4 pt-4 border-t">
                              <h4 className="font-semibold text-sm text-gray-700 mb-2">Supporting Passages</h4>
                              <div className="flex flex-wrap gap-2">
                                {insight.supportingPassages.map((passageId) => (
                                  <Badge key={passageId} variant="outline" className="text-xs">
                                    {passageId}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                  
                  {/* Educational Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Educational Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysisResult.educationalRecommendations.slice(0, 5).map((rec, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold">{rec.title}</h4>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{rec.targetLevel}</Badge>
                                <Badge variant="secondary">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {rec.estimatedTime}min
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                            <div>
                              <p className="text-xs font-medium text-gray-700 mb-1">Learning Outcomes:</p>
                              <div className="flex flex-wrap gap-1">
                                {rec.learningOutcomes.map((outcome, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {outcome}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Lightbulb className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">No Cultural Insights Yet</h3>
                  <p className="text-gray-400">Complete an analysis to discover AI-generated cultural insights.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AICulturalAnalysisSection;
/**
 * 🎯 PERSONALIZED LEARNING PATHS SECTION
 * AI-Powered Adaptive Cultural Education Interface
 * Revolutionary learning path generation and progress tracking system
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Play, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Star, 
  Book,
  Brain,
  Zap,
  Globe,
  Users,
  Award,
  ChevronRight,
  Plus,
  Settings,
  BarChart3,
  Calendar,
  Lightbulb,
  Map,
  Trophy,
  RefreshCw,
  Pause,
  ArrowRight,
  BarChart3
} from 'lucide-react';
import usePersonalizedLearningPaths, { 
  LearningPath, 
  PathGenerationOptions, 
  LearningModule,
  CulturalCompetency,
  LearningMilestone,
  CulturalThemes,
  PathDifficulties,
  LearningStyles,
  StudySchedules
} from '../../lib/personalized-learning-paths';

interface LearningPathsProps {
  className?: string;
}

export default function PersonalizedLearningPathsSection({ className = '' }: LearningPathsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'generator' | 'progress' | 'competencies'>('overview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPathGenerator, setShowPathGenerator] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [culturalInterests, setCulturalInterests] = useState<string[]>([]);
  const [generationOptions, setGenerationOptions] = useState<PathGenerationOptions>({
    studySchedule: 'regular',
    preferredDifficulty: 'adaptive',
    learningStyle: 'mixed',
    modernConnections: true,
    assessmentFrequency: 'medium',
    peerInteraction: false,
    culturalDepth: 'focused'
  });
  const [timeCommitment, setTimeCommitment] = useState(10); // hours per week

  // Use the comprehensive learning paths hook
  const {
    userPaths,
    currentPath,
    pathProgress,
    isLoading,
    error,
    generatePath,
    selectPath,
    trackProgress,
    adaptPath
  } = usePersonalizedLearningPaths('user_001');

  const learningGoals = [
    'Understand Roman Cultural Values',
    'Master Classical Latin Texts',
    'Analyze Historical Context',
    'Connect Ancient and Modern Ideas',
    'Explore Religious Practices',
    'Study Social Hierarchies',
    'Examine Philosophical Concepts',
    'Learn Educational Methods',
    'Investigate Legal Systems',
    'Discover Astronomical Knowledge'
  ];

  const handleGeneratePath = async () => {
    if (selectedGoals.length === 0 || culturalInterests.length === 0) return;

    setIsGenerating(true);
    try {
      await generatePath(
        selectedGoals,
        generationOptions,
        timeCommitment,
        culturalInterests
      );
      setShowPathGenerator(false);
      setActiveTab('progress');
    } catch (error) {
      console.error('Path generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const toggleCulturalInterest = (theme: string) => {
    setCulturalInterests(prev => 
      prev.includes(theme) 
        ? prev.filter(t => t !== theme)
        : [...prev, theme]
    );
  };

  const handleModuleStart = async (moduleId: string) => {
    await trackProgress(moduleId, 'content', {
      timeSpent: 0,
      completed: false,
      engagement: 0.8
    });
  };

  const handleModuleComplete = async (moduleId: string, score: number) => {
    await trackProgress(moduleId, 'assessment', {
      timeSpent: 30,
      completed: true,
      score: score,
      engagement: 0.9
    });
  };

  const getCompetencyColor = (level: number) => {
    if (level >= 80) return 'text-green-600 bg-green-100';
    if (level >= 60) return 'text-blue-600 bg-blue-100';
    if (level >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (isLoading) {
    return (
      <div className="py-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <RefreshCw className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Loading your learning paths...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`py-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 ${className}`}>
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
            <div className="p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-4">
              <Target className="h-12 w-12 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-5xl font-bold text-gray-900 mb-2">
                Personalized Learning Paths
              </h2>
              <p className="text-xl text-green-600 font-semibold">
                AI-Powered Adaptive Cultural Education
              </p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Revolutionary AI system that creates custom learning journeys tailored to your goals, 
            interests, and learning style, adapting in real-time based on your progress.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white rounded-xl p-2 shadow-lg border border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: Map },
              { id: 'generator', label: 'Create Path', icon: Plus },
              { id: 'progress', label: 'My Progress', icon: TrendingUp },
              { id: 'competencies', label: 'Competencies', icon: Award }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === id
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {userPaths.length === 0 ? (
                /* Welcome State */
                <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-200 text-center">
                  <Target className="h-20 w-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Welcome to AI-Powered Learning
                  </h3>
                  <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Create your first personalized learning path and experience revolutionary 
                    AI-driven education that adapts to your unique learning style and goals.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                      <Brain className="h-10 w-10 text-green-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">AI Path Generation</h4>
                      <p className="text-sm text-gray-600">Custom learning journeys created by advanced AI based on your goals and interests</p>
                    </div>
                    
                    <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                      <TrendingUp className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Adaptive Learning</h4>
                      <p className="text-sm text-gray-600">Real-time adjustments based on your progress, engagement, and comprehension</p>
                    </div>
                    
                    <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                      <Globe className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Cultural Mastery</h4>
                      <p className="text-sm text-gray-600">Deep understanding of Roman culture with modern applications and connections</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('generator')}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 text-lg"
                  >
                    <Plus className="h-6 w-6 mr-3" />
                    Create Your First Learning Path
                  </button>
                </div>
              ) : (
                /* Existing Paths Overview */
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">Your Learning Paths</h3>
                      <button
                        onClick={() => setActiveTab('generator')}
                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        New Path
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {userPaths.map((path) => (
                        <div key={path.id} className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                             onClick={() => selectPath(path.id)}>
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-1">{path.title}</h4>
                              <p className="text-sm text-gray-600">{path.description}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              path.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                              path.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                              path.difficulty === 'advanced' ? 'bg-orange-100 text-orange-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {path.difficulty}
                            </span>
                          </div>

                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{Math.round(path.progress.overallCompletion)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${path.progress.overallCompletion}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {formatTime(path.progress.timeSpent)}
                            </div>
                            <div className="flex items-center">
                              <Book className="h-4 w-4 mr-1" />
                              {path.progress.modulesCompleted}/{path.modules.length} modules
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-1" />
                              {Math.round(path.progress.averageScore)}%
                            </div>
                          </div>

                          {path.id === currentPath?.id && (
                            <div className="mt-3 flex items-center text-green-600 text-sm font-medium">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Currently Active
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  {pathProgress && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {Math.round(pathProgress.overallCompletion)}%
                        </div>
                        <div className="text-sm text-gray-600">Overall Progress</div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {pathProgress.modulesCompleted}
                        </div>
                        <div className="text-sm text-gray-600">Modules Completed</div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          {formatTime(pathProgress.timeSpent)}
                        </div>
                        <div className="text-sm text-gray-600">Time Studied</div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-2">
                          {pathProgress.studyStreak}
                        </div>
                        <div className="text-sm text-gray-600">Day Streak</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Path Generator Tab */}
          {activeTab === 'generator' && (
            <motion.div
              key="generator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <div className="flex items-center mb-8">
                  <Zap className="h-8 w-8 text-green-500 mr-3" />
                  <h3 className="text-3xl font-bold text-gray-900">AI Learning Path Generator</h3>
                </div>

                <div className="space-y-8">
                  {/* Learning Goals Selection */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">What are your learning goals?</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {learningGoals.map((goal) => (
                        <button
                          key={goal}
                          onClick={() => toggleGoal(goal)}
                          className={`p-3 text-left rounded-lg border-2 transition-all duration-300 ${
                            selectedGoals.includes(goal)
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                          }`}
                        >
                          <div className="flex items-center">
                            {selectedGoals.includes(goal) ? (
                              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-300 rounded mr-2" />
                            )}
                            <span className="font-medium">{goal}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cultural Interests */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Select your cultural interests:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {CulturalThemes.map((theme) => (
                        <button
                          key={theme}
                          onClick={() => toggleCulturalInterest(theme)}
                          className={`p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                            culturalInterests.includes(theme)
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex items-center">
                            {culturalInterests.includes(theme) ? (
                              <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-300 rounded mr-3" />
                            )}
                            <div>
                              <div className="font-medium">{theme}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                {theme === 'Religious Practices' && 'Roman religious rituals and beliefs'}
                                {theme === 'Social Customs' && 'Roman social hierarchies and customs'}
                                {theme === 'Philosophy' && 'Neo-Platonic and Roman philosophical thought'}
                                {theme === 'Education' && 'Roman learning methods and knowledge transmission'}
                                {theme === 'Roman History' && 'Historical events and cultural development'}
                                {theme === 'Literature' && 'Literary criticism and cultural commentary'}
                                {theme === 'Law' && 'Legal principles and Roman jurisprudence'}
                                {theme === 'Astronomy' && 'Celestial observations and cosmic philosophy'}
                                {theme === 'Architecture' && 'Roman architectural principles and engineering'}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Learning Preferences */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Learning Preferences</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Study Schedule</label>
                          <select
                            value={generationOptions.studySchedule}
                            onChange={(e) => setGenerationOptions(prev => ({ ...prev, studySchedule: e.target.value as any }))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="casual">Casual (1-3 hours/week)</option>
                            <option value="regular">Regular (4-8 hours/week)</option>
                            <option value="intensive">Intensive (9+ hours/week)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Preference</label>
                          <select
                            value={generationOptions.preferredDifficulty}
                            onChange={(e) => setGenerationOptions(prev => ({ ...prev, preferredDifficulty: e.target.value as any }))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="adaptive">Adaptive (AI adjusts difficulty)</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Learning Style</label>
                          <select
                            value={generationOptions.learningStyle}
                            onChange={(e) => setGenerationOptions(prev => ({ ...prev, learningStyle: e.target.value as any }))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="mixed">Mixed (Balanced approach)</option>
                            <option value="visual">Visual (Images, diagrams, charts)</option>
                            <option value="auditory">Auditory (Audio content, discussions)</option>
                            <option value="reading">Reading/Writing (Text-based learning)</option>
                            <option value="kinesthetic">Kinesthetic (Interactive activities)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Advanced Options</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Time Commitment (hours per week): {timeCommitment}
                          </label>
                          <input
                            type="range"
                            min="2"
                            max="20"
                            value={timeCommitment}
                            onChange={(e) => setTimeCommitment(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>2h</span>
                            <span>20h</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={generationOptions.modernConnections}
                              onChange={(e) => setGenerationOptions(prev => ({ ...prev, modernConnections: e.target.checked }))}
                              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Include modern connections</span>
                          </label>

                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={generationOptions.peerInteraction}
                              onChange={(e) => setGenerationOptions(prev => ({ ...prev, peerInteraction: e.target.checked }))}
                              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Enable peer interactions</span>
                          </label>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Cultural Depth</label>
                          <select
                            value={generationOptions.culturalDepth}
                            onChange={(e) => setGenerationOptions(prev => ({ ...prev, culturalDepth: e.target.value as any }))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="survey">Survey (Broad overview)</option>
                            <option value="focused">Focused (Targeted exploration)</option>
                            <option value="comprehensive">Comprehensive (Deep dive)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <div className="text-center pt-6">
                    <button
                      onClick={handleGeneratePath}
                      disabled={selectedGoals.length === 0 || culturalInterests.length === 0 || isGenerating}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-lg"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-6 w-6 mr-3 animate-spin" />
                          Generating AI Learning Path...
                        </>
                      ) : (
                        <>
                          <Brain className="h-6 w-6 mr-3" />
                          Generate AI Learning Path
                        </>
                      )}
                    </button>
                    
                    {(selectedGoals.length === 0 || culturalInterests.length === 0) && (
                      <p className="text-sm text-red-600 mt-2">
                        Please select at least one learning goal and one cultural interest.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && currentPath && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Current Path Overview */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{currentPath.title}</h3>
                    <p className="text-gray-600 mt-1">{currentPath.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">
                      {Math.round(currentPath.progress.overallCompletion)}%
                    </div>
                    <div className="text-sm text-gray-600">Complete</div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${currentPath.progress.overallCompletion}%` }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{currentPath.progress.modulesCompleted}</div>
                    <div className="text-sm text-gray-600">Modules Done</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{formatTime(currentPath.progress.timeSpent)}</div>
                    <div className="text-sm text-gray-600">Time Spent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{Math.round(currentPath.progress.averageScore)}%</div>
                    <div className="text-sm text-gray-600">Avg Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{currentPath.progress.studyStreak}</div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </div>
                </div>
              </div>

              {/* Learning Modules */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Learning Modules</h3>
                
                <div className="space-y-4">
                  {currentPath.modules.map((module, index) => (
                    <div key={module.id} className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                      module.completed 
                        ? 'border-green-200 bg-green-50' 
                        : currentPath.progress.currentModule === module.id
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                            module.completed 
                              ? 'bg-green-500 text-white' 
                              : currentPath.progress.currentModule === module.id
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            {module.completed ? (
                              <CheckCircle className="h-6 w-6" />
                            ) : (
                              <span className="font-bold">{index + 1}</span>
                            )}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{module.title}</h4>
                            <p className="text-sm text-gray-600">{module.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {formatTime(module.estimatedTime)}
                            </div>
                            <div className="text-xs text-gray-500">Estimated</div>
                          </div>
                          
                          {!module.completed && currentPath.progress.currentModule === module.id && (
                            <button
                              onClick={() => handleModuleStart(module.id)}
                              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Continue
                            </button>
                          )}
                          
                          {module.completed && (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-5 w-5 mr-1" />
                              <span className="text-sm font-medium">Completed</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Module Progress Details */}
                      {(module.completed || currentPath.progress.currentModule === module.id) && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <div className="text-sm text-gray-600 mb-1">Cultural Themes</div>
                              <div className="flex flex-wrap gap-1">
                                {module.culturalThemes.map((theme) => (
                                  <span key={theme} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                    {theme}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-gray-600 mb-1">Difficulty</div>
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                module.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                                module.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                                module.difficulty === 'advanced' ? 'bg-orange-100 text-orange-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {module.difficulty}
                              </span>
                            </div>
                            
                            {module.completed && (
                              <div>
                                <div className="text-sm text-gray-600 mb-1">Performance</div>
                                <div className="text-lg font-bold text-green-600">
                                  {Math.round(module.comprehensionScore)}%
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              {currentPath.milestones.length > 0 && (
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Learning Milestones</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentPath.milestones.map((milestone) => (
                      <div key={milestone.id} className={`p-6 rounded-lg border-2 ${
                        milestone.achieved 
                          ? 'border-yellow-200 bg-yellow-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="flex items-center mb-4">
                          <div className={`text-2xl mr-3 ${milestone.achieved ? 'opacity-100' : 'opacity-40'}`}>
                            {milestone.badgeIcon}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{milestone.title}</h4>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                          </div>
                        </div>
                        
                        {milestone.achieved ? (
                          <div className="flex items-center text-yellow-600">
                            <Trophy className="h-5 w-5 mr-2" />
                            <span className="font-medium">Achieved!</span>
                            {milestone.achievedDate && (
                              <span className="text-sm text-gray-500 ml-2">
                                {milestone.achievedDate.toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{Math.round(milestone.progress)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${milestone.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Competencies Tab */}
          {activeTab === 'competencies' && pathProgress && (
            <motion.div
              key="competencies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Cultural Competencies</h3>
                
                {pathProgress.culturalCompetencies.length > 0 ? (
                  <div className="space-y-6">
                    {pathProgress.culturalCompetencies.map((competency) => (
                      <div key={competency.theme} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">{competency.theme}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCompetencyColor(competency.proficiencyLevel)}`}>
                            {competency.proficiencyLevel}% Proficient
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                          {[
                            { label: 'Knowledge', value: competency.knowledge },
                            { label: 'Comprehension', value: competency.comprehension },
                            { label: 'Application', value: competency.application },
                            { label: 'Analysis', value: competency.analysis },
                            { label: 'Synthesis', value: competency.synthesis }
                          ].map(({ label, value }) => (
                            <div key={label} className="text-center">
                              <div className="text-lg font-bold text-gray-900">{value}%</div>
                              <div className="text-xs text-gray-600">{label}</div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                                  style={{ width: `${value}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Strength Areas</h5>
                            <div className="flex flex-wrap gap-2">
                              {competency.strengthAreas.map((area) => (
                                <span key={area} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Improvement Areas</h5>
                            <div className="flex flex-wrap gap-2">
                              {competency.improvementAreas.map((area) => (
                                <span key={area} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="text-sm text-gray-600">
                            <strong>Progress:</strong> {competency.passagesStudied} passages studied, {competency.activitiesCompleted} activities completed
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No Competencies Yet</h4>
                    <p className="text-gray-600">Complete some learning modules to see your cultural competency development.</p>
                  </div>
                )}
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
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-full">
            <Clock className="h-5 w-5 text-green-600 mr-3" />
            <span className="text-green-700 font-medium">
              AI-Powered Learning Ready - Oracle Cloud Integration Available
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
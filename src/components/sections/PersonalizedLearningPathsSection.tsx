/**
 * 🎤 Personalized Learning Paths Section
 * AI-driven adaptive cultural education progression interface
 * Integrates with Oracle Cloud backend and AI systems
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Route, 
  Target, 
  TrendingUp, 
  Clock, 
  Award, 
  BookOpen,
  Brain,
  CheckCircle,
  Circle,
  Star,
  Users,
  Settings,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  BarChart3,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  usePersonalizedLearningPaths,
  type LearningPath,
  type PathProgress,
  type LearningModule
} from '@/lib/personalized-learning-paths';
import { useAILearning } from '@/lib/ai-learning-engine';

interface PathCreationFormData {
  goals: string[];
  culturalInterests: string[];
  timeCommitment: number;
  studySchedule: 'intensive' | 'regular' | 'casual';
  preferredDifficulty: 'adaptive' | 'beginner' | 'intermediate' | 'advanced';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'mixed';
}

const PersonalizedLearningPathsSection: React.FC = () => {
  const { profile } = useAILearning('user-demo'); // Demo user ID
  const {
    userPaths,
    currentPath,
    pathProgress,
    isGenerating,
    generatePath,
    adaptPath,
    trackProgress,
    selectPath
  } = usePersonalizedLearningPaths('user-demo');

  const [activeTab, setActiveTab] = useState('overview');
  const [showPathCreation, setShowPathCreation] = useState(false);
  const [formData, setFormData] = useState<PathCreationFormData>({
    goals: [],
    culturalInterests: [],
    timeCommitment: 5,
    studySchedule: 'regular',
    preferredDifficulty: 'adaptive',
    learningStyle: 'mixed'
  });
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);

  // Sample options for path creation
  const goalOptions = [
    'Understand Roman Social Structure',
    'Master Latin Grammar Through Cultural Context',
    'Explore Roman Religious Practices',
    'Analyze Roman Philosophical Thought',
    'Study Roman Educational Systems',
    'Examine Roman Legal Traditions',
    'Investigate Roman Literary Culture',
    'Connect Ancient and Modern Practices'
  ];

  const culturalInterestOptions = [
    'Religious Practices',
    'Social Customs',
    'Philosophy',
    'Education',
    'Roman History',
    'Literature',
    'Law',
    'Astronomy',
    'Architecture',
    'Politics'
  ];

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleCulturalInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      culturalInterests: prev.culturalInterests.includes(interest)
        ? prev.culturalInterests.filter(i => i !== interest)
        : [...prev.culturalInterests, interest]
    }));
  };

  const handleCreatePath = async () => {
    if (formData.goals.length === 0 || formData.culturalInterests.length === 0) {
      alert('Please select at least one goal and one cultural interest.');
      return;
    }

    try {
      await generatePath(
        formData.goals,
        {
          studySchedule: formData.studySchedule,
          preferredDifficulty: formData.preferredDifficulty,
          learningStyle: formData.learningStyle
        },
        formData.timeCommitment,
        formData.culturalInterests
      );
      
      setShowPathCreation(false);
      setActiveTab('current-path');
    } catch (error) {
      console.error('Failed to create learning path:', error);
      alert('Failed to create learning path. Please try again.');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      case 'expert': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
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
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-4">
              <Route className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Personalized Learning Paths
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            AI-driven adaptive cultural education tailored to your goals, interests, and learning style.
            Experience dynamic paths that evolve with your progress through the Macrobius cultural universe.
          </p>
          
          {/* Path Statistics */}
          <div className="flex justify-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userPaths.length}</div>
              <div className="text-sm text-gray-500">Active Paths</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {pathProgress ? Math.round(pathProgress.overallCompletion) : 0}%
              </div>
              <div className="text-sm text-gray-500">Current Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {pathProgress ? Math.round(pathProgress.timeSpent / 60) : 0}h
              </div>
              <div className="text-sm text-gray-500">Study Time</div>
            </div>
          </div>
        </motion.div>

        {/* Main Interface */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="current-path" className="flex items-center gap-2">
                <Route className="h-4 w-4" />
                Current Path
              </TabsTrigger>
              <TabsTrigger value="modules" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Modules
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Progress
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {userPaths.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <Route className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">Create Your First Learning Path</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Start your personalized journey through Roman culture with Macrobius.
                    Our AI will create a path tailored specifically to your interests and goals.
                  </p>
                  <Button
                    onClick={() => setShowPathCreation(true)}
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  >
                    <Brain className="h-5 w-5 mr-2" />
                    Create AI-Powered Learning Path
                  </Button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userPaths.map((path, index) => (
                    <motion.div
                      key={path.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="cursor-pointer"
                      onClick={() => {
                        selectPath(path.id);
                        setActiveTab('current-path');
                      }}
                    >
                      <Card className={`transition-all duration-200 hover:shadow-lg ${
                        currentPath?.id === path.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                      }`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-2">{path.title}</CardTitle>
                              <CardDescription className="text-sm">
                                {path.description}
                              </CardDescription>
                            </div>
                            <Badge className={getDifficultyColor(path.difficulty)}>
                              {path.difficulty}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Progress */}
                            <div>
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{Math.round(path.progress.overallCompletion)}%</span>
                              </div>
                              <Progress 
                                value={path.progress.overallCompletion} 
                                className="h-2"
                              />
                            </div>
                            
                            {/* Cultural Focus */}
                            <div>
                              <p className="text-xs text-gray-500 mb-2">Cultural Focus:</p>
                              <div className="flex flex-wrap gap-1">
                                {path.culturalFocus.slice(0, 3).map((focus) => (
                                  <Badge key={focus} variant="outline" className="text-xs">
                                    {focus}
                                  </Badge>
                                ))}
                                {path.culturalFocus.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{path.culturalFocus.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                {path.modules.length} modules
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {path.estimatedDuration}h
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                  
                  {/* Add New Path Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: userPaths.length * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer"
                    onClick={() => setShowPathCreation(true)}
                  >
                    <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all duration-200">
                      <CardContent className="flex items-center justify-center h-full min-h-[200px]">
                        <div className="text-center">
                          <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Route className="h-6 w-6 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-500 mb-2">Create New Path</p>
                          <p className="text-xs text-gray-400">Add another personalized learning journey</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              )}
            </TabsContent>

            {/* Current Path Tab */}
            <TabsContent value="current-path" className="space-y-6">
              {currentPath ? (
                <>
                  {/* Path Header */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl mb-2">{currentPath.title}</CardTitle>
                          <CardDescription className="text-base">
                            {currentPath.description}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getDifficultyColor(currentPath.difficulty)} size="lg">
                            {currentPath.difficulty}
                          </Badge>
                          <div className="text-right text-sm text-gray-500">
                            <div>{currentPath.estimatedDuration} hours total</div>
                            <div>{Math.round(pathProgress?.estimatedTimeRemaining || 0)} hours remaining</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Overall Progress */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Overall Progress</span>
                            <span className="text-lg font-bold text-blue-600">
                              {Math.round(pathProgress?.overallCompletion || 0)}%
                            </span>
                          </div>
                          <Progress 
                            value={pathProgress?.overallCompletion || 0} 
                            className="h-3"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{pathProgress?.modulesCompleted || 0} of {pathProgress?.totalModules || 0} modules</span>
                            <span>{Math.round((pathProgress?.timeSpent || 0) / 60)}h studied</span>
                          </div>
                        </div>
                        
                        {/* Learning Goals */}
                        <div>
                          <h4 className="font-medium mb-2">Learning Goals</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {currentPath.learningGoals.map((goal, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <Target className="h-4 w-4 text-blue-500" />
                                {goal}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Cultural Focus Areas */}
                        <div>
                          <h4 className="font-medium mb-2">Cultural Focus Areas</h4>
                          <div className="flex flex-wrap gap-2">
                            {currentPath.culturalFocus.map((focus) => (
                              <Badge key={focus} variant="secondary">
                                {focus}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Module Progress */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Module Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {currentPath.modules.map((module, index) => {
                          const isCurrentModule = pathProgress?.currentModule === module.id;
                          const isCompleted = module.completed;
                          
                          return (
                            <motion.div
                              key={module.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                                isCurrentModule ? 'bg-blue-50 border-blue-200' : 
                                isCompleted ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50'
                              }`}
                              onClick={() => setSelectedModule(module)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                    isCompleted ? 'bg-green-500' :
                                    isCurrentModule ? 'bg-blue-500' : 'bg-gray-300'
                                  }`}>
                                    {isCompleted ? (
                                      <CheckCircle className="h-5 w-5 text-white" />
                                    ) : isCurrentModule ? (
                                      <Play className="h-4 w-4 text-white" />
                                    ) : (
                                      <Circle className="h-4 w-4 text-white" />
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-medium">{module.title}</h4>
                                    <p className="text-sm text-gray-600">{module.description}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {module.estimatedTime}min
                                  </Badge>
                                  <ChevronRight className="h-4 w-4 text-gray-400" />
                                </div>
                              </div>
                              
                              {module.culturalThemes.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {module.culturalThemes.map((theme) => (
                                    <Badge key={theme} variant="outline" className="text-xs">
                                      {theme}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="text-center py-12">
                  <Route className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">No Active Learning Path</h3>
                  <p className="text-gray-400 mb-6">Create a personalized learning path to get started.</p>
                  <Button
                    onClick={() => setShowPathCreation(true)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Create Learning Path
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Modules Tab */}
            <TabsContent value="modules" className="space-y-6">
              {selectedModule ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{selectedModule.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {selectedModule.description}
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedModule(null)}
                      >
                        Back to List
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Module Content */}
                      <div>
                        <h4 className="font-semibold mb-3">Module Content</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedModule.content.map((content, index) => (
                            <div key={content.id} className="border rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {content.type}
                                </Badge>
                                <span className="text-sm text-gray-500">
                                  {content.estimatedReadTime}min
                                </span>
                              </div>
                              <h5 className="font-medium">{content.title}</h5>
                              <p className="text-sm text-gray-600 mt-1">
                                {content.culturalContext}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Activities */}
                      <div>
                        <h4 className="font-semibold mb-3">Learning Activities</h4>
                        <div className="space-y-3">
                          {selectedModule.activities.map((activity, index) => (
                            <div key={activity.id} className="border rounded-lg p-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h5 className="font-medium">{activity.title}</h5>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {activity.description}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {activity.type}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {activity.timeAllocation}min
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Assessments */}
                      <div>
                        <h4 className="font-semibold mb-3">Assessments</h4>
                        <div className="space-y-3">
                          {selectedModule.assessments.map((assessment, index) => (
                            <div key={assessment.id} className="border rounded-lg p-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h5 className="font-medium">{assessment.title}</h5>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {assessment.competencies.map((comp) => (
                                      <Badge key={comp} variant="outline" className="text-xs">
                                        {comp}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <Badge className="bg-gradient-to-r from-green-500 to-blue-500">
                                  {assessment.type}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">Select a Module</h3>
                  <p className="text-gray-400">Choose a module from your current learning path to view details.</p>
                </div>
              )}
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-6">
              {pathProgress ? (
                <>
                  {/* Progress Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">
                            {Math.round(pathProgress.overallCompletion)}%
                          </div>
                          <div className="text-sm text-gray-500">Completion</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600">
                            {pathProgress.modulesCompleted}
                          </div>
                          <div className="text-sm text-gray-500">Modules Done</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">
                            {Math.round(pathProgress.timeSpent / 60)}h
                          </div>
                          <div className="text-sm text-gray-500">Time Spent</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-orange-600">
                            {pathProgress.milestones.filter(m => m.achieved).length}
                          </div>
                          <div className="text-sm text-gray-500">Milestones</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Milestones */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Learning Milestones
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pathProgress.milestones.map((milestone, index) => (
                          <motion.div
                            key={milestone.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`border rounded-lg p-4 ${
                              milestone.achieved ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                  milestone.achieved ? 'bg-green-500' : 'bg-gray-300'
                                }`}>
                                  {milestone.achieved ? (
                                    <Award className="h-5 w-5 text-white" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-white" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-medium">{milestone.title}</h4>
                                  <p className="text-sm text-gray-600">{milestone.description}</p>
                                  <p className="text-xs text-gray-500 mt-1">{milestone.culturalSignificance}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant={milestone.achieved ? 'default' : 'outline'}>
                                  {milestone.reward}
                                </Badge>
                                {milestone.achievedDate && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {milestone.achievedDate.toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="text-center py-12">
                  <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">No Progress Data</h3>
                  <p className="text-gray-400">Start a learning path to track your progress.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Path Creation Modal */}
        <AnimatePresence>
          {showPathCreation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Create Personalized Learning Path</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPathCreation(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Learning Goals */}
                    <div>
                      <h4 className="font-semibold mb-3">What are your learning goals?</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {goalOptions.map((goal) => (
                          <Button
                            key={goal}
                            variant={formData.goals.includes(goal) ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleGoalToggle(goal)}
                            className="text-left justify-start h-auto py-3 px-4"
                          >
                            {goal}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Cultural Interests */}
                    <div>
                      <h4 className="font-semibold mb-3">Which cultural themes interest you most?</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                        {culturalInterestOptions.map((interest) => (
                          <Button
                            key={interest}
                            variant={formData.culturalInterests.includes(interest) ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleCulturalInterestToggle(interest)}
                            className="text-center"
                          >
                            {interest}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Study Preferences */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Weekly Time Commitment</h4>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-600">
                            {formData.timeCommitment} hours per week
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="20"
                            value={formData.timeCommitment}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              timeCommitment: Number(e.target.value)
                            }))}
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Study Schedule</h4>
                        <div className="space-y-2">
                          {(['intensive', 'regular', 'casual'] as const).map((schedule) => (
                            <Button
                              key={schedule}
                              variant={formData.studySchedule === schedule ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setFormData(prev => ({ ...prev, studySchedule: schedule }))}
                              className="w-full justify-start"
                            >
                              {schedule.charAt(0).toUpperCase() + schedule.slice(1)}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Learning Style</h4>
                        <div className="space-y-2">
                          {(['visual', 'auditory', 'kinesthetic', 'reading', 'mixed'] as const).map((style) => (
                            <Button
                              key={style}
                              variant={formData.learningStyle === style ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setFormData(prev => ({ ...prev, learningStyle: style }))}
                              className="w-full justify-start"
                            >
                              {style.charAt(0).toUpperCase() + style.slice(1)}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={() => setShowPathCreation(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreatePath}
                        disabled={isGenerating || formData.goals.length === 0 || formData.culturalInterests.length === 0}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                      >
                        {isGenerating ? (
                          <>
                            <Brain className="h-4 w-4 mr-2 animate-pulse" />
                            Generating Path...
                          </>
                        ) : (
                          <>
                            <Route className="h-4 w-4 mr-2" />
                            Create Learning Path
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PersonalizedLearningPathsSection;
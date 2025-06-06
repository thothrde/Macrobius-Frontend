/**
 * 🤖 AI Tutoring System Section
 * Contextual AI assistance for cultural concept understanding
 * Integrates with Oracle Cloud backend and learning systems
 */

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  MessageCircle, 
  Brain, 
  Lightbulb, 
  HelpCircle, 
  BookOpen,
  Send,
  Mic,
  MicOff,
  Star,
  Users,
  Clock,
  TrendingUp,
  Target,
  Zap,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  useAITutoring,
  type TutorSession,
  type TutorResponse,
  type TutorInteraction,
  type LearningContext
} from '@/lib/ai-tutoring-system';
import { useAILearning } from '@/lib/ai-learning-engine';

interface ChatMessage {
  id: string;
  type: 'user' | 'tutor';
  content: string;
  timestamp: Date;
  response?: TutorResponse;
  feedback?: 'positive' | 'negative';
}

interface TutorSettings {
  responseStyle: 'concise' | 'detailed' | 'socratic';
  culturalEmphasis: 'high' | 'medium' | 'low';
  modernConnections: boolean;
  difficultyAdaptation: 'auto' | 'manual';
  hintFrequency: 'frequent' | 'moderate' | 'minimal';
}

const AITutoringSystemSection: React.FC = () => {
  const { profile } = useAILearning('user-demo'); // Demo user ID
  const {
    currentSession,
    sessionHistory,
    isActive,
    lastResponse,
    startSession,
    askQuestion,
    getHint,
    explainConcept,
    endSession,
    getGuidance,
    assessUnderstanding
  } = useAITutoring('user-demo');

  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [tutorSettings, setTutorSettings] = useState<TutorSettings>({
    responseStyle: 'detailed',
    culturalEmphasis: 'high',
    modernConnections: true,
    difficultyAdaptation: 'auto',
    hintFrequency: 'moderate'
  });
  const [isTyping, setIsTyping] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<string>('');
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cultural concepts for quick access
  const culturalConcepts = [
    'Roman Banquets',
    'Social Hierarchy',
    'Religious Practices',
    'Educational Methods',
    'Legal Traditions',
    'Literary Culture',
    'Philosophical Schools',
    'Political Structures',
    'Family Relations',
    'Economic Systems'
  ];

  // Sample learning contexts
  const learningContexts = [
    {
      name: 'Beginner Introduction',
      context: {
        culturalTheme: 'Roman Social Customs',
        difficulty: 0.3,
        userStruggleAreas: [],
        recentPerformance: [],
        timeInSession: 0,
        engagementLevel: 0.8
      }
    },
    {
      name: 'Advanced Analysis',
      context: {
        culturalTheme: 'Philosophical Discourse',
        difficulty: 0.8,
        userStruggleAreas: ['abstract concepts'],
        recentPerformance: [],
        timeInSession: 0,
        engagementLevel: 0.7
      }
    },
    {
      name: 'Cultural Connections',
      context: {
        culturalTheme: 'Modern Relevance',
        difficulty: 0.6,
        userStruggleAreas: ['modern applications'],
        recentPerformance: [],
        timeInSession: 0,
        engagementLevel: 0.9
      }
    }
  ];

  useEffect(() => {
    if (currentSession && currentSession.interactions.length > chatMessages.length) {
      // Update chat messages from session interactions
      const newMessages: ChatMessage[] = [];
      
      currentSession.interactions.forEach((interaction, index) => {
        if (interaction.userInput) {
          newMessages.push({
            id: `user-${index}`,
            type: 'user',
            content: interaction.userInput,
            timestamp: interaction.timestamp
          });
        }
        
        newMessages.push({
          id: `tutor-${index}`,
          type: 'tutor',
          content: interaction.tutorResponse.content,
          timestamp: interaction.timestamp,
          response: interaction.tutorResponse
        });
      });
      
      setChatMessages(newMessages);
    }
  }, [currentSession, chatMessages.length]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleStartSession = async (contextIndex: number = 0) => {
    try {
      const context = learningContexts[contextIndex].context;
      await startSession(
        context,
        ['Understand cultural concepts', 'Make modern connections'],
        tutorSettings.responseStyle
      );
      setActiveTab('chat');
    } catch (error) {
      console.error('Failed to start tutoring session:', error);
      alert('Failed to start session. Please try again.');
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !isActive) return;
    
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    try {
      const response = await askQuestion(inputMessage);
      
      const tutorMessage: ChatMessage = {
        id: `tutor-${Date.now()}`,
        type: 'tutor',
        content: response.content,
        timestamp: new Date(),
        response
      };
      
      setChatMessages(prev => [...prev, tutorMessage]);
    } catch (error) {
      console.error('Failed to get tutor response:', error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        type: 'tutor',
        content: 'I apologize, but I encountered an issue. Please try rephrasing your question.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleGetHint = async (strugglingWith: string) => {
    setIsTyping(true);
    try {
      const response = await getHint(strugglingWith, tutorSettings.hintFrequency === 'frequent' ? 'direct' : 'moderate');
      
      const hintMessage: ChatMessage = {
        id: `hint-${Date.now()}`,
        type: 'tutor',
        content: `💡 Hint: ${response.content}`,
        timestamp: new Date(),
        response
      };
      
      setChatMessages(prev => [...prev, hintMessage]);
    } catch (error) {
      console.error('Failed to get hint:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleExplainConcept = async (concept: string) => {
    setIsTyping(true);
    try {
      const response = await explainConcept(concept, tutorSettings.modernConnections);
      
      const explanationMessage: ChatMessage = {
        id: `explanation-${Date.now()}`,
        type: 'tutor',
        content: response.content,
        timestamp: new Date(),
        response
      };
      
      setChatMessages(prev => [...prev, explanationMessage]);
    } catch (error) {
      console.error('Failed to get explanation:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleEndSession = async () => {
    if (!isActive) return;
    
    try {
      const summary = await endSession('Great session!');
      
      const summaryMessage: ChatMessage = {
        id: `summary-${Date.now()}`,
        type: 'tutor',
        content: `Session completed! We explored ${summary.topicsExplored.length} topics and made ${summary.culturalConnectionsMade} cultural connections. ${summary.recommendedNextSteps.join(' ')}.`,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, summaryMessage]);
    } catch (error) {
      console.error('Failed to end session:', error);
    }
  };

  const handleMessageFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    setChatMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback } : msg
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
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
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-4">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              AI Tutoring System
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get personalized, contextual guidance from your AI tutor. Ask questions, explore cultural concepts,
            and discover connections between ancient Roman culture and modern life through intelligent conversation.
          </p>
          
          {/* Session Stats */}
          <div className="flex justify-center mt-8 space-x-8">
            <div className="text-center">
              <div className={`text-2xl font-bold ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                {isActive ? 'ACTIVE' : 'INACTIVE'}
              </div>
              <div className="text-sm text-gray-500">Session Status</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {sessionHistory.length}
              </div>
              <div className="text-sm text-gray-500">Total Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {chatMessages.length}
              </div>
              <div className="text-sm text-gray-500">Messages</div>
            </div>
          </div>
        </motion.div>

        {/* Main Interface */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="concepts" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Concepts
              </TabsTrigger>
              <TabsTrigger value="guidance" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Guidance
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>

            {/* Chat Tab */}
            <TabsContent value="chat" className="space-y-6">
              {!isActive ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">Start Your AI Tutoring Session</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Choose a learning context to begin your personalized tutoring experience with our AI cultural guide.
                  </p>
                  
                  {/* Context Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
                    {learningContexts.map((ctx, index) => (
                      <motion.div
                        key={ctx.name}
                        whileHover={{ scale: 1.02 }}
                        className="cursor-pointer"
                        onClick={() => handleStartSession(index)}
                      >
                        <Card className="transition-all duration-200 hover:shadow-lg border-2 hover:border-green-300">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg">{ctx.name}</CardTitle>
                            <CardDescription>
                              {ctx.context.culturalTheme}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Difficulty:</span>
                                <Badge variant="outline">
                                  {ctx.context.difficulty < 0.4 ? 'Beginner' : 
                                   ctx.context.difficulty < 0.7 ? 'Intermediate' : 'Advanced'}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Focus:</span>
                                <span className="text-gray-600">{ctx.context.culturalTheme}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                  
                  <Button
                    onClick={() => handleStartSession(0)}
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Brain className="h-5 w-5 mr-2" />
                    Start Quick Session
                  </Button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Chat Interface */}
                  <div className="lg:col-span-3">
                    <Card className="h-[600px] flex flex-col">
                      <CardHeader className="flex-shrink-0 border-b">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                              AI Cultural Tutor
                            </CardTitle>
                            <CardDescription>
                              {currentSession?.context.culturalTheme} • 
                              {currentSession?.interactions.length || 0} interactions
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowSettings(!showSettings)}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleEndSession}
                            >
                              End Session
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      
                      {/* Chat Messages */}
                      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                        <AnimatePresence>
                          {chatMessages.map((message, index) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`flex ${
                                message.type === 'user' ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              <div className={`max-w-[80%] rounded-lg p-4 ${
                                message.type === 'user' 
                                  ? 'bg-green-500 text-white ml-4'
                                  : 'bg-gray-100 text-gray-800 mr-4'
                              }`}>
                                <div className="mb-2">{message.content}</div>
                                
                                {/* Cultural Connections */}
                                {message.response?.culturalConnections && message.response.culturalConnections.length > 0 && (
                                  <div className="mt-3 pt-3 border-t border-gray-200">
                                    <div className="text-sm font-medium mb-2">Cultural Connections:</div>
                                    {message.response.culturalConnections.map((connection, idx) => (
                                      <div key={idx} className="text-sm bg-white rounded p-2 mb-1">
                                        <strong>{connection.ancientConcept}</strong> → {connection.modernParallel}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                
                                {/* Modern Examples */}
                                {message.response?.modernExamples && message.response.modernExamples.length > 0 && (
                                  <div className="mt-2">
                                    <div className="text-sm font-medium mb-1">Modern Examples:</div>
                                    <div className="flex flex-wrap gap-1">
                                      {message.response.modernExamples.map((example, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs">
                                          {example}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                <div className="flex items-center justify-between mt-3 pt-2 border-t">
                                  <div className="text-xs text-gray-500">
                                    {formatTimestamp(message.timestamp)}
                                  </div>
                                  
                                  {message.type === 'tutor' && (
                                    <div className="flex items-center gap-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`h-6 w-6 p-0 ${
                                          message.feedback === 'positive' ? 'text-green-600' : 'text-gray-400'
                                        }`}
                                        onClick={() => handleMessageFeedback(message.id, 'positive')}
                                      >
                                        <ThumbsUp className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`h-6 w-6 p-0 ${
                                          message.feedback === 'negative' ? 'text-red-600' : 'text-gray-400'
                                        }`}
                                        onClick={() => handleMessageFeedback(message.id, 'negative')}
                                      >
                                        <ThumbsDown className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                          
                          {/* Typing Indicator */}
                          {isTyping && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex justify-start"
                            >
                              <div className="bg-gray-100 rounded-lg p-4 mr-4">
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div ref={chatEndRef} />
                      </CardContent>
                      
                      {/* Message Input */}
                      <div className="border-t p-4">
                        <div className="flex items-center gap-2">
                          <input
                            ref={inputRef}
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about Roman culture, request explanations, or get hints..."
                            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            disabled={!isActive || isTyping}
                          />
                          <Button
                            onClick={handleSendMessage}
                            disabled={!inputMessage.trim() || !isActive || isTyping}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setIsListening(!isListening)}
                            className={isListening ? 'bg-red-50 border-red-200' : ''}
                          >
                            {isListening ? <Mic className="h-4 w-4 text-red-500" /> : <MicOff className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  {/* Quick Actions Sidebar */}
                  <div className="space-y-4">
                    {/* Quick Concepts */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Quick Concepts</CardTitle>
                        <CardDescription>
                          Click to get instant explanations
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {culturalConcepts.slice(0, 5).map((concept) => (
                            <Button
                              key={concept}
                              variant="outline"
                              size="sm"
                              onClick={() => handleExplainConcept(concept)}
                              className="w-full justify-start text-sm"
                              disabled={!isActive || isTyping}
                            >
                              <BookOpen className="h-3 w-3 mr-2" />
                              {concept}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Quick Hints */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Need Help?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGetHint('understanding concepts')}
                            className="w-full justify-start"
                            disabled={!isActive || isTyping}
                          >
                            <Lightbulb className="h-4 w-4 mr-2" />
                            Get a Hint
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGetHint('making connections')}
                            className="w-full justify-start"
                            disabled={!isActive || isTyping}
                          >
                            <Zap className="h-4 w-4 mr-2" />
                            Cultural Connections
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGetHint('modern relevance')}
                            className="w-full justify-start"
                            disabled={!isActive || isTyping}
                          >
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Modern Examples
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Session Info */}
                    {currentSession && (
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Session Info</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="font-medium">Theme:</span>
                              <div className="text-gray-600">{currentSession.context.culturalTheme}</div>
                            </div>
                            <div>
                              <span className="font-medium">Difficulty:</span>
                              <Progress value={currentSession.context.difficulty * 100} className="mt-1" />
                            </div>
                            <div>
                              <span className="font-medium">Engagement:</span>
                              <Progress value={currentSession.context.engagementLevel * 100} className="mt-1" />
                            </div>
                            <div>
                              <span className="font-medium">Interactions:</span>
                              <div className="text-gray-600">{currentSession.interactions.length}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Other tabs would be implemented similarly... */}
            <TabsContent value="concepts" className="space-y-6">
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">Cultural Concepts Explorer</h3>
                <p className="text-gray-400">Browse and learn about Roman cultural concepts (Coming Soon)</p>
              </div>
            </TabsContent>

            <TabsContent value="guidance" className="space-y-6">
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">Learning Guidance</h3>
                <p className="text-gray-400">Personalized learning recommendations (Coming Soon)</p>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <div className="text-center py-12">
                <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">Session History</h3>
                <p className="text-gray-400">Review past tutoring sessions (Coming Soon)</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AITutoringSystemSection;
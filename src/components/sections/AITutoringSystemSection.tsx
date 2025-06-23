/**
 * 🤖 AI TUTORING SYSTEM SECTION
 * Intelligent Learning Assistant Interface
 * Context-aware AI tutor providing personalized guidance and cultural explanations
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Clock, 
  Target, 
  TrendingUp,
  Lightbulb,
  Globe,
  Settings,
  BarChart3,
  AlertCircle,
  Play,
  Pause,
  Square,
  RefreshCw
} from 'lucide-react';
import { 
  aiTutoringSystem, 
  TutorSession, 
  TutorInteraction
} from '@/lib/ai-tutoring-system';
import { useLanguage } from '@/contexts/LanguageContext';

interface TutoringProps {
  className?: string;
}

export default function AITutoringSystemSection({ className = '' }: TutoringProps) {
  const { t, language } = useLanguage();
  const [currentSession, setCurrentSession] = useState<TutorSession | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'progress' | 'settings'>('chat');
  const [selectedTopic, setSelectedTopic] = useState('Philosophy');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'DE' | 'LA'>('EN');
  const [sessionTime, setSessionTime] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSession?.interactions]);

  useEffect(() => {
    if (isSessionActive && timerRef.current === null) {
      timerRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    } else if (!isSessionActive && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isSessionActive]);

  // Sync selectedLanguage with global language context
  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const topicKeys = [
    'topic.philosophy',
    'topic.religious.practices', 
    'topic.social.customs',
    'topic.education', 
    'topic.roman.history', 
    'topic.literature', 
    'topic.astronomy', 
    'topic.law'
  ];

  const difficultyKeys = [
    'difficulty.beginner',
    'difficulty.intermediate',
    'difficulty.advanced',
    'difficulty.expert'
  ];

  const startSession = async () => {
    try {
      const session = await aiTutoringSystem.startTutoringSession(
        'user_001',
        {
          culturalTheme: selectedTopic,
          difficulty: selectedDifficulty === 'Beginner' ? 0.3 : selectedDifficulty === 'Intermediate' ? 0.6 : selectedDifficulty === 'Advanced' ? 0.8 : 0.9,
          userStruggleAreas: [],
          recentPerformance: [],
          timeInSession: 0,
          engagementLevel: 0.8
        },
        [`Learn about ${selectedTopic}`, 'Understand cultural context', 'Connect to modern relevance']
      );
      
      setCurrentSession(session);
      setIsSessionActive(true);
      setSessionTime(0);
      setActiveTab('chat');
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const endSession = async () => {
    if (currentSession) {
      try {
        await aiTutoringSystem.endTutoringSession(currentSession.userId);
        setCurrentSession(null);
        setIsSessionActive(false);
        setSessionTime(0);
      } catch (error) {
        console.error('Failed to end session:', error);
      }
    }
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || !currentSession || isTyping) return;

    const userMessage = chatInput;
    setChatInput('');
    setIsTyping(true);

    try {
      const response = await aiTutoringSystem.processUserQuestion(
        currentSession.userId,
        userMessage,
        { culturalTheme: selectedTopic }
      );

      // Create interaction object
      const interaction: TutorInteraction = {
        id: `interaction-${Date.now()}`,
        timestamp: new Date(),
        type: 'question',
        userInput: userMessage,
        tutorResponse: response,
        culturalContext: selectedTopic,
        effectiveness: response.confidence,
        followUpNeeded: false
      };

      // Update session in state
      setCurrentSession(prev => {
        if (!prev) return null;
        return {
          ...prev,
          interactions: [...prev.interactions, interaction]
        };
      });

    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const getHint = async () => {
    if (!currentSession) return;

    try {
      const hint = await aiTutoringSystem.provideContextualHint(
        currentSession.userId,
        chatInput || selectedTopic,
        'moderate'
      );

      if (hint) {
        setChatInput(hint.content);
      }
    } catch (error) {
      console.error('Failed to get hint:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <section className={`py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 ${className}`}>
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
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-5xl font-bold text-gray-900 mb-2">
                {t('ai.tutor.title')}
              </h2>
              <p className="text-xl text-purple-600 font-semibold">
                {t('ai.tutor.subtitle')}
              </p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('ai.tutor.description')}
          </p>
        </motion.div>

        {/* Session Status Bar */}
        {currentSession && (
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${isSessionActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-sm font-medium text-gray-700">
                    {isSessionActive ? t('ai.tutor.session.active') : t('ai.tutor.session.paused')}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatTime(sessionTime)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Target className="h-4 w-4 mr-1" />
                  {t(`topic.${currentSession.context.culturalTheme.toLowerCase().replace(' ', '.')}`)} - {t(`difficulty.${selectedDifficulty.toLowerCase()}`)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {currentSession.interactions.length} {t('ai.tutor.interactions')}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsSessionActive(!isSessionActive)}
                  className={`p-2 rounded-lg ${isSessionActive ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'} hover:opacity-80`}
                >
                  {isSessionActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  onClick={endSession}
                  className="p-2 rounded-lg bg-red-100 text-red-600 hover:opacity-80"
                >
                  <Square className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-xl p-2 shadow-lg border border-gray-200">
            {[
              { id: 'chat', label: t('ai.tutor.tab.chat'), icon: MessageCircle },
              { id: 'progress', label: t('ai.tutor.tab.progress'), icon: BarChart3 },
              { id: 'settings', label: t('ai.tutor.tab.settings'), icon: Settings }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as 'chat' | 'progress' | 'settings')}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === id
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {!currentSession ? (
                /* Start Session UI */
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
                  <Bot className="h-16 w-16 text-purple-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t('ai.tutor.ready.title')}
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    {t('ai.tutor.ready.description')}
                  </p>
                  <button
                    onClick={startSession}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-lg"
                  >
                    <Play className="h-6 w-6 mr-3" />
                    {t('ai.tutor.start.session')}
                  </button>
                </div>
              ) : (
                /* Chat Interface */
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  {/* Chat Header */}
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bot className="h-8 w-8 mr-3" />
                        <div>
                          <h3 className="text-xl font-bold">{t('ai.tutor.chat.header.title')}</h3>
                          <p className="text-purple-100 text-sm">
                            {t('ai.tutor.chat.header.exploring')} {t(`topic.${currentSession.context.culturalTheme.toLowerCase().replace(' ', '.')}`)} • {selectedLanguage}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-purple-100">{t('ai.tutor.chat.progress')}</div>
                        <div className="text-lg font-semibold">
                          {Math.round(currentSession.context.engagementLevel * 100)}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="h-96 overflow-y-auto p-6 space-y-4">
                    {currentSession.interactions.map((interaction) => (
                      <div
                        key={interaction.id}
                        className={`flex ${interaction.userInput ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-3xl ${interaction.userInput ? 'order-2' : 'order-1'}`}>
                          {/* User Message */}
                          {interaction.userInput && (
                            <div className="flex items-start justify-end mb-2">
                              <div className="bg-purple-500 text-white rounded-lg px-4 py-2 mr-2">
                                {interaction.userInput}
                              </div>
                              <User className="h-8 w-8 bg-purple-100 text-purple-600 rounded-full p-2 flex-shrink-0" />
                            </div>
                          )}
                          
                          {/* AI Response */}
                          <div className="flex items-start">
                            <Bot className="h-8 w-8 bg-purple-100 text-purple-600 rounded-full p-2 flex-shrink-0 mr-2" />
                            <div className="bg-gray-100 rounded-lg px-4 py-2 flex-1">
                              <p className="text-gray-800">{interaction.tutorResponse.content}</p>
                              
                              {/* Cultural References */}
                              {interaction.tutorResponse.culturalConnections.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {interaction.tutorResponse.culturalConnections.map((conn, index) => (
                                    <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                      {conn.ancientConcept}
                                    </span>
                                  ))}
                                </div>
                              )}
                              
                              {/* Modern Examples */}
                              {interaction.tutorResponse.modernExamples.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-xs text-gray-500 mb-2">{t('ai.tutor.modern.connections')}:</p>
                                  <div className="space-y-1">
                                    {interaction.tutorResponse.modernExamples.map((example, index) => (
                                      <div key={index} className="text-xs text-green-600">
                                        • {example}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                                <span>{t('ai.tutor.confidence')}: {Math.round(interaction.tutorResponse.confidence * 100)}%</span>
                                <span>{interaction.timestamp.toLocaleTimeString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex items-start">
                        <Bot className="h-8 w-8 bg-purple-100 text-purple-600 rounded-full p-2 flex-shrink-0 mr-2" />
                        <div className="bg-gray-100 rounded-lg px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input */}
                  <div className="border-t border-gray-200 p-4">
                    <div className="flex items-end space-x-3">
                      <button
                        onClick={getHint}
                        className="p-3 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title={t('ai.tutor.hint.title')}
                      >
                        <Lightbulb className="h-5 w-5" />
                      </button>
                      
                      <div className="flex-1">
                        <textarea
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                          placeholder={t('ai.tutor.input.placeholder')}
                          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          rows={2}
                        />
                      </div>
                      
                      <button
                        onClick={sendMessage}
                        disabled={!chatInput.trim() || isTyping}
                        className="p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && currentSession && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('ai.tutor.progress.title')}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {Math.round(currentSession.context.engagementLevel * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">{t('ai.tutor.engagement.level')}</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {currentSession.learningGoals.length}
                    </div>
                    <div className="text-sm text-gray-600">{t('ai.tutor.learning.goals')}</div>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {currentSession.interactions.length}
                    </div>
                    <div className="text-sm text-gray-600">{t('ai.tutor.total.interactions')}</div>
                  </div>
                </div>

                {/* Learning Goals Progress */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('ai.tutor.learning.goals.header')}</h4>
                  <div className="space-y-3">
                    {currentSession.learningGoals.map((goal, index) => {
                      const isActive = index < currentSession.interactions.length;
                      
                      return (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                          {isActive ? (
                            <RefreshCw className="h-5 w-5 text-blue-500 mr-3" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-gray-400 mr-3" />
                          )}
                          <span className={`flex-1 text-gray-700`}>
                            {goal}
                          </span>
                          {isActive && <span className="text-xs text-blue-600 font-medium">{t('ai.tutor.status.active')}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Session Statistics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('ai.tutor.session.statistics')}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('ai.tutor.total.interactions')}:</span>
                        <span className="font-medium">{currentSession.interactions.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('ai.tutor.average.confidence')}:</span>
                        <span className="font-medium">
                          {currentSession.interactions.length > 0 
                            ? Math.round(currentSession.interactions.reduce((sum, int) => sum + int.tutorResponse.confidence, 0) / currentSession.interactions.length * 100)
                            : 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('ai.tutor.cultural.focus')}:</span>
                        <span className="font-medium">{currentSession.culturalFocus.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('ai.tutor.session.duration')}:</span>
                        <span className="font-medium">{formatTime(sessionTime)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('ai.tutor.engagement.level')}:</span>
                        <span className="font-medium">{Math.round(currentSession.context.engagementLevel * 100)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('ai.tutor.cultural.focus')}</h4>
                    <div className="space-y-2">
                      {currentSession.culturalFocus.map((focus, index) => (
                        <span key={index} className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('ai.tutor.settings.title')}</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Topic Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t('ai.tutor.topic.selection')}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {topicKeys.map((topicKey) => {
                        const topicValue = topicKey.replace('topic.', '').replace('.', ' ');
                        const isSelected = selectedTopic.toLowerCase().replace(' ', '') === topicValue.replace(' ', '');
                        
                        return (
                          <button
                            key={topicKey}
                            onClick={() => setSelectedTopic(topicValue.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))}
                            className={`p-3 text-left rounded-lg border-2 transition-all duration-300 ${
                              isSelected
                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                            }`}
                          >
                            <div className="font-medium">{t(topicKey)}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Difficulty Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t('ai.tutor.difficulty.level')}
                    </label>
                    <div className="space-y-3">
                      {(['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const).map((level) => (
                        <button
                          key={level}
                          onClick={() => setSelectedDifficulty(level)}
                          className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-300 ${
                            selectedDifficulty === level
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                          }`}
                        >
                          <div className="font-medium">{t(`difficulty.${level.toLowerCase()}`)}</div>
                          <div className="text-sm text-gray-500">
                            {t(`ai.tutor.difficulty.${level.toLowerCase()}`)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Language Selection */}
                <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {t('ai.tutor.interface.language')}
                  </label>
                  <div className="flex space-x-4">
                    {(['EN', 'DE', 'LA'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                          selectedLanguage === lang
                            ? 'bg-purple-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                        }`}
                      >
                        {t(`language.${lang === 'EN' ? 'english' : lang === 'DE' ? 'german' : 'latin'}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Start Session Button */}
                <div className="mt-8 text-center">
                  {!currentSession ? (
                    <button
                      onClick={startSession}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-lg"
                    >
                      <Play className="h-6 w-6 mr-3" />
                      {t('ai.tutor.start.session')}
                    </button>
                  ) : (
                    <div className="text-gray-600">
                      {t('ai.tutor.session.active.note')}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature Highlights */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <MessageCircle className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('ai.tutor.feature.dialogue.title')}</h4>
            <p className="text-gray-600">
              {t('ai.tutor.feature.dialogue.description')}
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <Globe className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('ai.tutor.feature.bridge.title')}</h4>
            <p className="text-gray-600">
              {t('ai.tutor.feature.bridge.description')}
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <TrendingUp className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('ai.tutor.feature.adaptive.title')}</h4>
            <p className="text-gray-600">
              {t('ai.tutor.feature.adaptive.description')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
/**
 * 🤖 KI-RAG-ASSISTENT SECTION - AI-Powered Chat Interface
 * Complete web implementation of the RAG (Retrieval-Augmented Generation) system
 * 
 * Features:
 * - Modern chat interface with message history
 * - Integration with Oracle Cloud RAG backend
 * - Source citations with similarity scores
 * - Connection status monitoring
 * - Example queries in multiple languages
 * - Responsive design for web and mobile
 * - Real-time typing indicators
 * - Error handling and offline support
 */

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MessageCircle, 
  Send, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  BookOpen, 
  Clock,
  AlertCircle,
  CheckCircle,
  Bot,
  User
} from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: Array<{
    passage_id: string;
    text: string;
    similarity_score: number;
    book_chapter_section: string;
  }>;
}

interface KIRAGAssistentSectionProps {
  isActive: boolean;
  onProgressUpdate?: (progress: any) => void;
}

const KIRAGAssistentSection: React.FC<KIRAGAssistentSectionProps> = ({
  isActive,
  onProgressUpdate
}) => {
  // State Management
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'offline' | 'error'>('checking');
  const [showExamples, setShowExamples] = useState(true);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Example queries in multiple languages
  const exampleQueries = [
    {
      de: "Was sagt Macrobius über die Harmonie der Sphären?",
      en: "What does Macrobius say about the harmony of the spheres?",
      la: "Quid Macrobius de harmonia sphaerarum dicit?",
      category: "Philosophie"
    },
    {
      de: "Wie sieht Macrobius die römische Religion?",
      en: "How does Macrobius view Roman religion?",
      la: "Quomodo Macrobius religionem Romanam spectat?",
      category: "Religion"
    },
    {
      de: "Was lehrt Macrobius über Träume und deren Interpretation?",
      en: "What does Macrobius teach about dreams and their interpretation?",
      la: "Quid Macrobius de somniis eorumque interpretatione docet?",
      category: "Traumdeutung"
    },
    {
      de: "Welche Rolle spielt Bildung in Macrobius' Werk?",
      en: "What role does education play in Macrobius' work?",
      la: "Quam partem educatio in opere Macrobii agit?",
      category: "Bildung"
    }
  ];

  // Initialize component
  useEffect(() => {
    if (isActive) {
      initializeChat();
      checkConnectionStatus();
    }
  }, [isActive]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeChat = async () => {
    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      text: `Willkommen beim KI-RAG-Assistenten! 🏛️

Ich kann Ihnen dabei helfen, Fragen zu Macrobius zu beantworten, basierend auf authentischen lateinischen Texten aus unserer Sammlung von 1.401 Passagen.

Stellen Sie mir gerne Fragen über:
• Philosophie und Kosmologie
• Römische Religion und Bräuche
• Träume und deren Interpretation
• Literatur und Bildung
• Astronomie und Mathematik
• Gastmahl-Traditionen

Jede Antwort wird mit Quellenangaben aus den originalen Texten unterstützt.`,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  };

  const checkConnectionStatus = async () => {
    try {
      setConnectionStatus('checking');
      
      const response = await fetch('http://152.70.184.232:8082/api/health', {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });
      
      if (response.ok) {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      console.error('Connection check failed:', error);
      setConnectionStatus('error');
    }
  };

  const sendMessage = async (query: string) => {
    if (!query.trim()) return;

    // Hide examples after first message
    setShowExamples(false);
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: query,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Check connection first
      if (connectionStatus !== 'connected') {
        await checkConnectionStatus();
        if (connectionStatus !== 'connected') {
          throw new Error('Keine Verbindung zum Server');
        }
      }

      const response = await fetch('http://152.70.184.232:8082/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
        signal: AbortSignal.timeout(30000)
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      // Add AI response
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        text: data.response || 'Entschuldigung, ich konnte keine Antwort generieren.',
        isUser: false,
        timestamp: new Date(),
        sources: data.sources || []
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Report progress
      if (onProgressUpdate) {
        onProgressUpdate({
          type: 'rag_query',
          query: query,
          response_length: data.response?.length || 0,
          sources_count: data.sources?.length || 0,
          timestamp: new Date()
        });
      }
      
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        text: `Entschuldigung, es gab einen Fehler: ${error.message}. Bitte versuchen Sie es später erneut oder überprüfen Sie Ihre Internetverbindung.`,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleQuery = (example: any) => {
    setInputText(example.de);
    inputRef.current?.focus();
  };

  const clearChat = () => {
    setMessages([]);
    setShowExamples(true);
    initializeChat();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const renderConnectionStatus = () => {
    const statusConfig = {
      checking: { icon: RefreshCw, color: 'text-blue-500', text: 'Verbindung prüfen...', spin: true },
      connected: { icon: CheckCircle, color: 'text-green-500', text: 'Verbunden', spin: false },
      offline: { icon: WifiOff, color: 'text-red-500', text: 'Offline', spin: false },
      error: { icon: AlertCircle, color: 'text-red-500', text: 'Verbindungsfehler', spin: false }
    };

    const config = statusConfig[connectionStatus];
    const IconComponent = config.icon;

    return (
      <div className="flex items-center gap-2">
        <IconComponent 
          className={`w-4 h-4 ${config.color} ${config.spin ? 'animate-spin' : ''}`} 
        />
        <span className={`text-sm ${config.color}`}>{config.text}</span>
      </div>
    );
  };

  const renderMessage = (message: ChatMessage) => {
    return (
      <div key={message.id} className={`mb-6 ${message.isUser ? 'ml-12' : 'mr-12'}`}>
        <div className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Avatar */}
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            message.isUser 
              ? 'bg-blue-500 text-white' 
              : 'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
          }`}>
            {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>
          
          {/* Message Content */}
          <div className={`flex-1 ${message.isUser ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block max-w-full p-4 rounded-lg ${
              message.isUser 
                ? 'bg-blue-500 text-white' 
                : 'bg-white border border-amber-200 text-gray-800'
            }`}>
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.text}
              </div>
              
              {/* Sources */}
              {message.sources && message.sources.length > 0 && (
                <div className="mt-4 pt-3 border-t border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-800">Quellen:</span>
                  </div>
                  <div className="space-y-2">
                    {message.sources.map((source, index) => (
                      <div key={index} className="bg-amber-50 p-3 rounded border border-amber-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-amber-700">
                            📖 {source.book_chapter_section}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {Math.round(source.similarity_score * 100)}% Ähnlichkeit
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-600 italic">
                          "{source.text.substring(0, 150)}..."
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Timestamp */}
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {message.timestamp.toLocaleTimeString('de-DE', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderExamples = () => {
    if (!showExamples) return null;

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Beispielfragen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exampleQueries.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 text-left justify-start hover:bg-amber-50 hover:border-amber-300 transition-colors"
                onClick={() => handleExampleQuery(example)}
              >
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">{example.de}</div>
                  <Badge variant="secondary" className="text-xs">
                    {example.category}
                  </Badge>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (!isActive) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Bot className="w-16 h-16 text-amber-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">KI-RAG-Assistent</h3>
          <p className="text-gray-600">Bereit, Ihre Fragen zu Macrobius zu beantworten</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">KI-RAG-Assistent</h1>
          <p className="text-gray-600">Stellen Sie Fragen zu Macrobius basierend auf 1.401 authentischen Textpassagen</p>
        </div>
        <div className="flex items-center gap-4">
          {renderConnectionStatus()}
          <Button
            variant="outline"
            size="sm"
            onClick={clearChat}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Neu starten
          </Button>
        </div>
      </div>

      {/* Connection Error Alert */}
      {connectionStatus === 'error' && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Verbindung zum RAG-Server fehlgeschlagen. Bitte überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später erneut.
          </AlertDescription>
        </Alert>
      )}

      {/* Chat Container */}
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="h-96 overflow-y-auto p-6">
            {messages.map(renderMessage)}
            {renderExamples()}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <div className="flex items-center gap-2 text-amber-600">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="text-sm">KI denkt nach...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* Input Area */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Stellen Sie eine Frage über Macrobius... (Enter zum Senden, Shift+Enter für neue Zeile)"
              className="flex-1 resize-none"
              rows={3}
              maxLength={1000}
            />
            <Button
              onClick={() => sendMessage(inputText)}
              disabled={!inputText.trim() || isLoading || connectionStatus !== 'connected'}
              className="px-6 bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <span>Zeichen: {inputText.length}/1000</span>
            <span>Enter zum Senden, Shift+Enter für neue Zeile</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KIRAGAssistentSection;
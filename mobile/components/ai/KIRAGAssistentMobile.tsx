/**
 * 🤖 KI-RAG-ASSISTENT MOBILE - AI-Powered Chat Interface
 * Complete mobile implementation of the RAG (Retrieval-Augmented Generation) system
 * 
 * Features:
 * - Native React Native chat interface
 * - Integration with Oracle Cloud RAG backend
 * - Source citations with similarity scores
 * - Connection status monitoring
 * - Example queries in multiple languages
 * - Mobile-optimized responsive design
 * - Error handling for offline scenarios
 * - Seamless navigation integration
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const colors = {
  primary: '#8B5A3C',
  secondary: '#D4A574',
  accent: '#C8102E',
  background: '#FDF6E3',
  surface: '#FFFFFF',
  text: '#3C2A1E',
  textSecondary: '#8B7355',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  aiMessage: '#F0F8FF',
  userMessage: '#E8F5E8',
  citation: '#FFF8DC'
};

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

interface KIRAGAssistentMobileProps {
  isOnline: boolean;
  navigation?: any;
}

const KIRAGAssistentMobile: React.FC<KIRAGAssistentMobileProps> = ({
  isOnline,
  navigation
}) => {
  // State Management
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [showExamples, setShowExamples] = useState(true);
  
  // Refs
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);

  // Example queries in multiple languages
  const exampleQueries = [
    {
      de: "Was sagt Macrobius über die Harmonie der Sphären?",
      en: "What does Macrobius say about the harmony of the spheres?",
      la: "Quid Macrobius de harmonia sphaerarum dicit?"
    },
    {
      de: "Wie sieht Macrobius die römische Religion?",
      en: "How does Macrobius view Roman religion?",
      la: "Quomodo Macrobius religionem Romanam spectat?"
    },
    {
      de: "Was lehrt Macrobius über Träume?",
      en: "What does Macrobius teach about dreams?",
      la: "Quid Macrobius de somniis docet?"
    }
  ];

  // Initialize component
  useEffect(() => {
    initializeChat();
  }, []);

  // Check connection status
  useEffect(() => {
    checkConnectionStatus();
  }, [isOnline]);

  const initializeChat = async () => {
    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      text: "Willkommen beim KI-RAG-Assistenten! Ich kann Ihnen dabei helfen, Fragen zu Macrobius zu beantworten, basierend auf authentischen lateinischen Texten aus der Sammlung von 1.401 Passagen.\n\nStellen Sie mir gerne Fragen über:\n• Philosophie und Kosmologie\n• Römische Religion und Bräuche\n• Träume und deren Interpretation\n• Literatur und Bildung\n• Astronomie und Mathematik",
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  };

  const checkConnectionStatus = async () => {
    if (!isOnline) {
      setConnectionStatus('offline');
      return;
    }

    try {
      setConnectionStatus('checking');
      
      const response = await fetch('http://152.70.184.232:8082/api/health', {
        method: 'GET',
        timeout: 5000
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
        body: JSON.stringify({ query })
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
      
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        text: `Entschuldigung, es gab einen Fehler: ${error.message}. Bitte versuchen Sie es später erneut.`,
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
    Alert.alert(
      'Chat löschen',
      'Möchten Sie wirklich alle Nachrichten löschen?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        { 
          text: 'Löschen', 
          style: 'destructive',
          onPress: () => {
            setMessages([]);
            setShowExamples(true);
            initializeChat();
          }
        }
      ]
    );
  };

  const renderConnectionStatus = () => {
    let statusColor = colors.textSecondary;
    let statusText = 'Verbindung prüfen...';
    let statusIcon = 'sync';

    switch (connectionStatus) {
      case 'connected':
        statusColor = colors.success;
        statusText = 'Verbunden';
        statusIcon = 'wifi';
        break;
      case 'offline':
        statusColor = colors.error;
        statusText = 'Offline';
        statusIcon = 'wifi-off';
        break;
      case 'error':
        statusColor = colors.error;
        statusText = 'Verbindungsfehler';
        statusIcon = 'error';
        break;
    }

    return (
      <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
        <Icon name={statusIcon} size={14} color={colors.surface} />
        <Text style={styles.statusText}>{statusText}</Text>
      </View>
    );
  };

  const renderMessage = (message: ChatMessage) => {
    return (
      <View key={message.id} style={styles.messageContainer}>
        <View style={[
          styles.messageBubble,
          message.isUser ? styles.userMessage : styles.aiMessage
        ]}>
          <Text style={[
            styles.messageText,
            message.isUser ? styles.userMessageText : styles.aiMessageText
          ]}>
            {message.text}
          </Text>
          
          {/* Sources */}
          {message.sources && message.sources.length > 0 && (
            <View style={styles.sourcesContainer}>
              <Text style={styles.sourcesTitle}>Quellen:</Text>
              {message.sources.map((source, index) => (
                <View key={index} style={styles.sourceItem}>
                  <Text style={styles.sourceText}>
                    📖 {source.book_chapter_section} ({Math.round(source.similarity_score * 100)}% Ähnlichkeit)
                  </Text>
                  <Text style={styles.sourcePreview}>
                    "{source.text.substring(0, 100)}..."
                  </Text>
                </View>
              ))}
            </View>
          )}
          
          <Text style={styles.messageTime}>
            {message.timestamp.toLocaleTimeString('de-DE', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
        </View>
      </View>
    );
  };

  const renderExamples = () => {
    if (!showExamples) return null;

    return (
      <View style={styles.examplesContainer}>
        <Text style={styles.examplesTitle}>Beispielfragen:</Text>
        {exampleQueries.map((example, index) => (
          <TouchableOpacity
            key={index}
            style={styles.exampleButton}
            onPress={() => handleExampleQuery(example)}
          >
            <Text style={styles.exampleText}>{example.de}</Text>
            <Icon name="arrow-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={styles.headerTitle}>
                <Icon name="smart-toy" size={24} color={colors.surface} />
                <Text style={styles.headerText}>KI-RAG-Assistent</Text>
              </View>
              <View style={styles.headerActions}>
                {renderConnectionStatus()}
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={clearChat}
                >
                  <Icon name="refresh" size={20} color={colors.surface} />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(renderMessage)}
          {renderExamples()}
          
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.loadingText}>KI denkt nach...</Text>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Stellen Sie eine Frage über Macrobius..."
              placeholderTextColor={colors.textSecondary}
              multiline
              maxLength={500}
              returnKeyType="send"
              onSubmitEditing={() => sendMessage(inputText)}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                { opacity: inputText.trim() ? 1 : 0.5 }
              ]}
              onPress={() => sendMessage(inputText)}
              disabled={!inputText.trim() || isLoading}
            >
              <Icon name="send" size={20} color={colors.surface} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    height: 80
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.surface
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4
  },
  statusText: {
    fontSize: 12,
    color: colors.surface,
    fontWeight: '500'
  },
  clearButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  chatContent: {
    paddingVertical: 20,
    paddingBottom: 100
  },
  messageContainer: {
    marginBottom: 16
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 4
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.userMessage,
    borderBottomRightRadius: 4
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.aiMessage,
    borderBottomLeftRadius: 4
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4
  },
  userMessageText: {
    color: colors.text
  },
  aiMessageText: {
    color: colors.text
  },
  messageTime: {
    fontSize: 12,
    color: colors.textSecondary,
    alignSelf: 'flex-end'
  },
  sourcesContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: colors.citation,
    borderRadius: 8
  },
  sourcesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4
  },
  sourceItem: {
    marginBottom: 4
  },
  sourceText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500'
  },
  sourcePreview: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 2
  },
  examplesContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12
  },
  examplesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12
  },
  exampleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 8,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondary
  },
  exampleText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginRight: 8
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8
  },
  loadingText: {
    fontSize: 14,
    color: colors.textSecondary
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
    padding: 16
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
    maxHeight: 100
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export { KIRAGAssistentMobile };
/**
 * 🤖 KI-RAG-ASSISTENT MOBILE - AI-Powered Latin Learning Assistant
 * React Native component for mobile RAG (Retrieval-Augmented Generation) system
 * 
 * Features:
 * - Chat interface with AI assistant for complex Macrobius questions
 * - Authentic Latin text passages from 1,401 passage corpus
 * - Source citations with similarity scores
 * - Connection status monitoring
 * - Example queries for easy interaction
 * - Responsive mobile design
 * - Oracle Cloud Free Tier integration (port 8082)
 * - $0.00/month operational cost
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

// Types
interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sources?: Source[];
}

interface Source {
  text: string;
  source: string;
  theme: string;
  similarity: number;
}

interface RAGResponse {
  response: string;
  sources: Source[];
  query: string;
  timestamp: string;
}

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
  purple: '#8A2BE2',
  blue: '#4169E1',
  gray: '#6B7280',
  lightGray: '#F3F4F6',
  border: '#E5E7EB'
};

// Props interface
interface KIRAGAssistentMobileProps {
  navigation: any;
  isOnline: boolean;
}

export default function KIRAGAssistentMobile({ navigation, isOnline }: KIRAGAssistentMobileProps) {
  // State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [refreshing, setRefreshing] = useState(false);
  
  // Refs
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);

  // API endpoint for RAG system
  const RAG_API_URL = 'http://152.70.184.232:8082/api';

  // Example queries
  const exampleQueries = [
    "Was sagt Macrobius über Träume?",
    "Harmonie der Sphären?",
    "Römische Religion bei Macrobius?",
    "Natur der Seele?",
    "Gastmahl der Gelehrten?"
  ];

  // Effects
  useEffect(() => {
    checkConnectionStatus();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Methods
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const checkConnectionStatus = async () => {
    try {
      setConnectionStatus('checking');
      const response = await fetch(`${RAG_API_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('disconnected');
      }
    } catch (error) {
      console.error('Connection check failed:', error);
      setConnectionStatus('disconnected');
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${RAG_API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage.content
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: RAGResponse = await response.json();

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response,
        timestamp: new Date(),
        sources: data.sources
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Entschuldigung, es ist ein Fehler aufgetreten. Bitte überprüfen Sie die Verbindung zum RAG-System.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      setConnectionStatus('disconnected');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleQuery = (query: string) => {
    setInputValue(query);
    inputRef.current?.focus();
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await checkConnectionStatus();
    setRefreshing(false);
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Connection Status Component
  const ConnectionStatusIndicator = () => {
    const getStatusConfig = () => {
      switch (connectionStatus) {
        case 'connected':
          return { icon: 'check-circle', color: colors.success, text: 'Verbunden' };
        case 'disconnected':
          return { icon: 'error', color: colors.error, text: 'Getrennt' };
        case 'checking':
          return { icon: 'schedule', color: colors.warning, text: 'Prüfung...' };
        default:
          return { icon: 'help', color: colors.gray, text: 'Unbekannt' };
      }
    };

    const { icon, color, text } = getStatusConfig();

    return (
      <View style={styles.statusContainer}>
        <Icon name={icon} size={16} color={color} />
        <Text style={[styles.statusText, { color }]}>{text}</Text>
      </View>
    );
  };

  // Header Component
  const renderHeader = () => (
    <View style={styles.header}>
      <LinearGradient
        colors={[colors.purple, colors.blue]}
        style={styles.headerGradient}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View style={styles.headerTitle}>
              <Icon name="smart-toy" size={24} color={colors.surface} />
              <Text style={styles.headerTitleText}>KI-RAG-Assistent</Text>
            </View>
            <Text style={styles.headerSubtitle}>
              Fragen Sie alles über Macrobius
            </Text>
            <ConnectionStatusIndicator />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );

  // Example Queries Component
  const renderExampleQueries = () => (
    <View style={styles.exampleQueriesContainer}>
      <Text style={styles.sectionTitle}>Beispielfragen</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.exampleQueriesScroll}>
          {exampleQueries.map((query, index) => (
            <TouchableOpacity
              key={index}
              style={styles.exampleQueryCard}
              onPress={() => handleExampleQuery(query)}
              disabled={isLoading}
            >
              <Text style={styles.exampleQueryText}>{query}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  // Messages Component
  const renderMessages = () => (
    <ScrollView
      ref={scrollViewRef}
      style={styles.messagesContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
    >
      {messages.length === 0 && (
        <View style={styles.emptyState}>
          <Icon name="smart-toy" size={64} color={colors.gray} />
          <Text style={styles.emptyStateTitle}>Beginnen Sie eine Unterhaltung</Text>
          <Text style={styles.emptyStateText}>
            Stellen Sie eine Frage über Macrobius oder nutzen Sie eine der Beispielfragen oben.
          </Text>
        </View>
      )}

      {messages.map((message) => (
        <View key={message.id} style={styles.messageWrapper}>
          <View style={[
            styles.messageContainer,
            message.type === 'user' ? styles.userMessage : styles.aiMessage
          ]}>
            <View style={styles.messageHeader}>
              <Icon 
                name={message.type === 'user' ? 'person' : 'smart-toy'} 
                size={16} 
                color={message.type === 'user' ? colors.surface : colors.purple} 
              />
              <Text style={[
                styles.messageTimestamp,
                { color: message.type === 'user' ? colors.surface : colors.gray }
              ]}>
                {formatTimestamp(message.timestamp)}
              </Text>
            </View>
            
            <Text style={[
              styles.messageContent,
              { color: message.type === 'user' ? colors.surface : colors.text }
            ]}>
              {message.content}
            </Text>

            {/* Sources */}
            {message.sources && message.sources.length > 0 && (
              <View style={styles.sourcesContainer}>
                <Text style={styles.sourcesTitle}>Quellen:</Text>
                {message.sources.map((source, index) => (
                  <View key={index} style={styles.sourceCard}>
                    <Text style={styles.sourceReference}>📖 {source.source}</Text>
                    <Text style={styles.sourceText}>{source.text}</Text>
                    <View style={styles.sourceMetadata}>
                      <Text style={styles.sourceTheme}>Thema: {source.theme}</Text>
                      <Text style={styles.sourceSimilarity}>
                        Relevanz: {(source.similarity * 100).toFixed(1)}%
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      ))}

      {isLoading && (
        <View style={styles.messageWrapper}>
          <View style={[styles.messageContainer, styles.aiMessage]}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.purple} />
              <Text style={styles.loadingText}>Denkt nach...</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );

  // Input Component
  const renderInput = () => (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          ref={inputRef}
          style={styles.textInput}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Fragen Sie etwas über Macrobius..."
          placeholderTextColor={colors.textSecondary}
          multiline
          maxLength={500}
          editable={!isLoading && connectionStatus === 'connected'}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!inputValue.trim() || isLoading || connectionStatus === 'disconnected') && styles.sendButtonDisabled
          ]}
          onPress={handleSendMessage}
          disabled={!inputValue.trim() || isLoading || connectionStatus === 'disconnected'}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.surface} />
          ) : (
            <Icon name="send" size={20} color={colors.surface} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  // System Info Component
  const renderSystemInfo = () => (
    <View style={styles.systemInfoContainer}>
      <View style={styles.systemInfoHeader}>
        <Icon name="info" size={16} color={colors.primary} />
        <Text style={styles.systemInfoTitle}>System-Info</Text>
      </View>
      <View style={styles.systemInfoGrid}>
        <View style={styles.systemInfoItem}>
          <Text style={styles.systemInfoLabel}>Korpus:</Text>
          <Text style={styles.systemInfoValue}>1.401 Passagen</Text>
        </View>
        <View style={styles.systemInfoItem}>
          <Text style={styles.systemInfoLabel}>Kosten:</Text>
          <Text style={[styles.systemInfoValue, { color: colors.success }]}>$0.00/Monat</Text>
        </View>
      </View>
    </View>
  );

  // Main render
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.purple} barStyle="light-content" />
      
      {renderHeader()}
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.contentContainer}>
          {renderExampleQueries()}
          {renderMessages()}
          {renderSystemInfo()}
        </View>
        
        {renderInput()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  headerGradient: {
    paddingVertical: 16
  },
  headerContent: {
    paddingHorizontal: 20
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.surface,
    marginLeft: 8
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.surface,
    opacity: 0.9,
    marginBottom: 8
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4
  },
  keyboardAvoidingView: {
    flex: 1
  },
  contentContainer: {
    flex: 1
  },
  exampleQueriesContainer: {
    paddingVertical: 16,
    paddingLeft: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12
  },
  exampleQueriesScroll: {
    flexDirection: 'row',
    paddingRight: 20
  },
  exampleQueryCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
    maxWidth: 180
  },
  exampleQueryText: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center'
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20
  },
  messageWrapper: {
    marginBottom: 16
  },
  messageContainer: {
    maxWidth: '85%',
    borderRadius: 16,
    padding: 12
  },
  userMessage: {
    backgroundColor: colors.blue,
    alignSelf: 'flex-end',
    marginLeft: '15%'
  },
  aiMessage: {
    backgroundColor: colors.surface,
    alignSelf: 'flex-start',
    marginRight: '15%',
    borderWidth: 1,
    borderColor: colors.border
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  messageTimestamp: {
    fontSize: 10,
    marginLeft: 6
  },
  messageContent: {
    fontSize: 14,
    lineHeight: 20
  },
  sourcesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  sourcesTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8
  },
  sourceCard: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8
  },
  sourceReference: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.blue,
    marginBottom: 4
  },
  sourceText: {
    fontSize: 10,
    color: colors.text,
    marginBottom: 4
  },
  sourceMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sourceTheme: {
    fontSize: 9,
    color: colors.textSecondary
  },
  sourceSimilarity: {
    fontSize: 9,
    color: colors.textSecondary
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8
  },
  systemInfoContainer: {
    margin: 20,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  systemInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  systemInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8
  },
  systemInfoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  systemInfoItem: {
    flex: 1
  },
  systemInfoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4
  },
  systemInfoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text
  },
  inputContainer: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 20,
    paddingVertical: 12
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    maxHeight: 100,
    paddingVertical: 8
  },
  sendButton: {
    backgroundColor: colors.blue,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8
  },
  sendButtonDisabled: {
    backgroundColor: colors.gray,
    opacity: 0.5
  }
});

export { KIRAGAssistentMobile };
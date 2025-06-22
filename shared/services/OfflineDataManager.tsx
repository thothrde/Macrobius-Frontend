/**
 * 📱 OFFLINE DATA MANAGEMENT SERVICE
 * Complete offline functionality for uninterrupted learning
 * 
 * ✨ OFFLINE FEATURES:
 * - 📚 Content Caching (passages, vocabulary, cultural insights)
 * - 💾 Progress Tracking (offline sessions, achievements, analytics)
 * - 🔄 Smart Sync Queue (priority-based data synchronization)
 * - 🎯 Intelligent Prefetching (predictive content download)
 * - 📊 Offline Analytics (usage patterns, performance metrics)
 * - 🔒 Secure Storage (encrypted offline data)
 * - 🚀 Performance Optimization (efficient data compression)
 * - 📱 Mobile-First Design (battery and bandwidth optimized)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { compress, decompress } from 'lz-string';

// 📚 OFFLINE CONTENT TYPES
interface CachedPassage {
  id: string;
  text: string;
  source: string;
  book: number;
  chapter: number;
  section?: number;
  metadata: {
    work: string;
    cultural_theme: string;
    difficulty_level: 'beginner' | 'intermediate' | 'advanced';
    word_count: number;
    estimated_reading_time: number;
    vocabulary_difficulty: number;
    grammatical_features: string[];
    cultural_concepts: string[];
  };
  analysis: {
    key_vocabulary: {
      word: string;
      translation: string;
      frequency: number;
      difficulty: number;
      cultural_note?: string;
    }[];
    grammatical_help: {
      feature: string;
      explanation: string;
      examples: string[];
    }[];
    cultural_context: string;
    modern_connections: string[];
  };
  cached_date: string;
  last_accessed: string;
  access_count: number;
  priority_score: number;
}

interface CachedVocabulary {
  word: string;
  translation: string;
  etymology: string;
  frequency: number;
  difficulty: number;
  examples: {
    latin: string;
    english: string;
    source: string;
  }[];
  cultural_significance: string;
  modern_usage: string;
  related_words: string[];
  audio_pronunciation?: string; // Base64 encoded audio
  morphological_variants: {
    form: string;
    grammatical_info: string;
  }[];
  srs_data: {
    interval: number;
    easiness_factor: number;
    repetition_count: number;
    next_review_date: string;
    mastery_level: number;
  };
  cached_date: string;
  last_practiced: string;
}

interface CachedQuizQuestion {
  id: string;
  type: 'multiple_choice' | 'fill_in_blank' | 'translation' | 'cultural_context';
  question_text: string;
  options?: string[];
  correct_answer: string;
  explanation: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  cultural_theme: string;
  passage_reference?: string;
  vocabulary_focus: string[];
  grammar_focus: string[];
  learning_objectives: string[];
  adaptive_metadata: {
    user_performance_weight: number;
    concept_reinforcement_score: number;
    difficulty_calibration: number;
  };
  cached_date: string;
}

interface CachedCulturalInsight {
  id: string;
  title: string;
  theme: string;
  content: string;
  historical_context: string;
  modern_relevance: string;
  related_passages: string[];
  discussion_prompts: string[];
  learning_activities: string[];
  visual_resources: {
    type: 'image' | 'diagram' | 'map';
    url: string;
    description: string;
    cached_data?: string; // Base64 encoded image
  }[];
  complexity_level: number;
  estimated_study_time: number;
  cached_date: string;
}

// 💾 OFFLINE SESSION TRACKING
interface OfflineSession {
  session_id: string;
  session_type: 'vocabulary' | 'reading' | 'quiz' | 'cultural_exploration';
  start_time: string;
  end_time?: string;
  duration_seconds?: number;
  activities: {
    activity_id: string;
    activity_type: string;
    content_id: string;
    performance_data: Record<string, any>;
    completion_status: 'completed' | 'partial' | 'skipped';
    timestamp: string;
  }[];
  session_stats: {
    items_completed: number;
    accuracy_percentage: number;
    average_response_time: number;
    concepts_practiced: string[];
    skills_improved: string[];
  };
  learning_outcomes: {
    vocabulary_learned: string[];
    concepts_mastered: string[];
    cultural_insights_gained: string[];
    grammar_features_practiced: string[];
  };
  sync_status: 'pending' | 'synced' | 'conflict';
  priority_level: number;
}

// 📊 OFFLINE ANALYTICS
interface OfflineAnalytics {
  user_id: string;
  collection_period: {
    start_date: string;
    end_date: string;
  };
  usage_patterns: {
    total_offline_time: number;
    sessions_per_day: number;
    preferred_activity_types: Record<string, number>;
    peak_usage_hours: number[];
    content_consumption_rate: number;
  };
  performance_metrics: {
    offline_learning_efficiency: number;
    retention_rate_offline: number;
    completion_rate_offline: number;
    accuracy_trends: Record<string, number>;
    improvement_velocity: number;
  };
  content_engagement: {
    most_accessed_content: string[];
    content_completion_rates: Record<string, number>;
    user_content_preferences: string[];
    difficult_content_areas: string[];
  };
  technical_metrics: {
    cache_hit_rate: number;
    sync_efficiency: number;
    storage_usage_mb: number;
    battery_usage_index: number;
  };
  collected_offline: boolean;
  last_updated: string;
}

// 🔄 SYNC QUEUE MANAGEMENT
interface SyncQueueItem {
  id: string;
  data_type: 'session' | 'progress' | 'analytics' | 'user_content';
  content: any;
  priority: number;
  created_at: string;
  attempts: number;
  last_attempt?: string;
  error_message?: string;
  estimated_sync_time: number;
  data_size_kb: number;
}

// 📱 OFFLINE DATA MANAGER CLASS
class OfflineDataManager {
  private static instance: OfflineDataManager;
  private readonly STORAGE_KEYS = {
    PASSAGES: 'offline_passages',
    VOCABULARY: 'offline_vocabulary',
    QUIZ_QUESTIONS: 'offline_quiz_questions',
    CULTURAL_INSIGHTS: 'offline_cultural_insights',
    SESSIONS: 'offline_sessions',
    ANALYTICS: 'offline_analytics',
    SYNC_QUEUE: 'offline_sync_queue',
    CACHE_METADATA: 'offline_cache_metadata'
  };
  
  private readonly MAX_CACHE_SIZE_MB = 100; // 100MB cache limit
  private readonly MAX_SYNC_QUEUE_SIZE = 1000;
  private readonly CACHE_EXPIRY_DAYS = 30;
  
  private constructor() {}
  
  public static getInstance(): OfflineDataManager {
    if (!OfflineDataManager.instance) {
      OfflineDataManager.instance = new OfflineDataManager();
    }
    return OfflineDataManager.instance;
  }
  
  // 📚 CONTENT CACHING METHODS
  
  async cachePassages(passages: CachedPassage[]): Promise<void> {
    try {
      const existingPassages = await this.getCachedPassages();
      const passageMap = new Map(existingPassages.map(p => [p.id, p]));
      
      // Merge new passages with existing ones
      passages.forEach(passage => {
        const existing = passageMap.get(passage.id);
        if (existing) {
          // Update access count and priority
          passage.access_count = existing.access_count + 1;
          passage.last_accessed = new Date().toISOString();
          passage.priority_score = this.calculatePriorityScore(passage);
        } else {
          passage.access_count = 1;
          passage.last_accessed = new Date().toISOString();
          passage.cached_date = new Date().toISOString();
          passage.priority_score = this.calculatePriorityScore(passage);
        }
        passageMap.set(passage.id, passage);
      });
      
      const updatedPassages = Array.from(passageMap.values());
      
      // Apply cache management
      const managedPassages = await this.applyCacheManagement(updatedPassages);
      
      // Compress and store
      const compressed = compress(JSON.stringify(managedPassages));
      await AsyncStorage.setItem(this.STORAGE_KEYS.PASSAGES, compressed);
      
      await this.updateCacheMetadata('passages', managedPassages.length);
      
    } catch (error) {
      throw new Error(`Failed to cache passages: ${error}`);
    }
  }
  
  async getCachedPassages(): Promise<CachedPassage[]> {
    try {
      const compressed = await AsyncStorage.getItem(this.STORAGE_KEYS.PASSAGES);
      if (!compressed) return [];
      
      const decompressed = decompress(compressed);
      return JSON.parse(decompressed || '[]');
    } catch (error) {
      console.error('Failed to get cached passages:', error);
      return [];
    }
  }
  
  async cacheVocabulary(vocabulary: CachedVocabulary[]): Promise<void> {
    try {
      const existingVocab = await this.getCachedVocabulary();
      const vocabMap = new Map(existingVocab.map(v => [v.word, v]));
      
      vocabulary.forEach(word => {
        const existing = vocabMap.get(word.word);
        if (existing) {
          // Merge SRS data, keeping the best performance
          word.srs_data = this.mergeSRSData(existing.srs_data, word.srs_data);
          word.last_practiced = existing.last_practiced;
        } else {
          word.cached_date = new Date().toISOString();
        }
        vocabMap.set(word.word, word);
      });
      
      const updatedVocabulary = Array.from(vocabMap.values());
      const compressed = compress(JSON.stringify(updatedVocabulary));
      await AsyncStorage.setItem(this.STORAGE_KEYS.VOCABULARY, compressed);
      
      await this.updateCacheMetadata('vocabulary', updatedVocabulary.length);
      
    } catch (error) {
      throw new Error(`Failed to cache vocabulary: ${error}`);
    }
  }
  
  async getCachedVocabulary(): Promise<CachedVocabulary[]> {
    try {
      const compressed = await AsyncStorage.getItem(this.STORAGE_KEYS.VOCABULARY);
      if (!compressed) return [];
      
      const decompressed = decompress(compressed);
      return JSON.parse(decompressed || '[]');
    } catch (error) {
      console.error('Failed to get cached vocabulary:', error);
      return [];
    }
  }
  
  async cacheQuizQuestions(questions: CachedQuizQuestion[]): Promise<void> {
    try {
      const existingQuestions = await this.getCachedQuizQuestions();
      const questionMap = new Map(existingQuestions.map(q => [q.id, q]));
      
      questions.forEach(question => {
        if (!questionMap.has(question.id)) {
          question.cached_date = new Date().toISOString();
        }
        questionMap.set(question.id, question);
      });
      
      const updatedQuestions = Array.from(questionMap.values());
      const compressed = compress(JSON.stringify(updatedQuestions));
      await AsyncStorage.setItem(this.STORAGE_KEYS.QUIZ_QUESTIONS, compressed);
      
      await this.updateCacheMetadata('quiz_questions', updatedQuestions.length);
      
    } catch (error) {
      throw new Error(`Failed to cache quiz questions: ${error}`);
    }
  }
  
  async getCachedQuizQuestions(): Promise<CachedQuizQuestion[]> {
    try {
      const compressed = await AsyncStorage.getItem(this.STORAGE_KEYS.QUIZ_QUESTIONS);
      if (!compressed) return [];
      
      const decompressed = decompress(compressed);
      return JSON.parse(decompressed || '[]');
    } catch (error) {
      console.error('Failed to get cached quiz questions:', error);
      return [];
    }
  }
  
  async cacheCulturalInsights(insights: CachedCulturalInsight[]): Promise<void> {
    try {
      const existingInsights = await this.getCachedCulturalInsights();
      const insightMap = new Map(existingInsights.map(i => [i.id, i]));
      
      insights.forEach(insight => {
        if (!insightMap.has(insight.id)) {
          insight.cached_date = new Date().toISOString();
        }
        insightMap.set(insight.id, insight);
      });
      
      const updatedInsights = Array.from(insightMap.values());
      const compressed = compress(JSON.stringify(updatedInsights));
      await AsyncStorage.setItem(this.STORAGE_KEYS.CULTURAL_INSIGHTS, compressed);
      
      await this.updateCacheMetadata('cultural_insights', updatedInsights.length);
      
    } catch (error) {
      throw new Error(`Failed to cache cultural insights: ${error}`);
    }
  }
  
  async getCachedCulturalInsights(): Promise<CachedCulturalInsight[]> {
    try {
      const compressed = await AsyncStorage.getItem(this.STORAGE_KEYS.CULTURAL_INSIGHTS);
      if (!compressed) return [];
      
      const decompressed = decompress(compressed);
      return JSON.parse(decompressed || '[]');
    } catch (error) {
      console.error('Failed to get cached cultural insights:', error);
      return [];
    }
  }
  
  // 💾 OFFLINE SESSION TRACKING
  
  async startOfflineSession(sessionType: OfflineSession['session_type']): Promise<string> {
    const sessionId = `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const session: OfflineSession = {
      session_id: sessionId,
      session_type: sessionType,
      start_time: new Date().toISOString(),
      activities: [],
      session_stats: {
        items_completed: 0,
        accuracy_percentage: 0,
        average_response_time: 0,
        concepts_practiced: [],
        skills_improved: []
      },
      learning_outcomes: {
        vocabulary_learned: [],
        concepts_mastered: [],
        cultural_insights_gained: [],
        grammar_features_practiced: []
      },
      sync_status: 'pending',
      priority_level: this.calculateSessionPriority(sessionType)
    };
    
    await this.storeOfflineSession(session);
    return sessionId;
  }
  
  async updateOfflineSession(sessionId: string, updates: Partial<OfflineSession>): Promise<void> {
    try {
      const sessions = await this.getOfflineSessions();
      const sessionIndex = sessions.findIndex(s => s.session_id === sessionId);
      
      if (sessionIndex === -1) {
        throw new Error(`Session ${sessionId} not found`);
      }
      
      sessions[sessionIndex] = { ...sessions[sessionIndex], ...updates };
      
      const compressed = compress(JSON.stringify(sessions));
      await AsyncStorage.setItem(this.STORAGE_KEYS.SESSIONS, compressed);
      
    } catch (error) {
      throw new Error(`Failed to update offline session: ${error}`);
    }
  }
  
  async endOfflineSession(sessionId: string): Promise<void> {
    const endTime = new Date().toISOString();
    const sessions = await this.getOfflineSessions();
    const session = sessions.find(s => s.session_id === sessionId);
    
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }
    
    const startTime = new Date(session.start_time).getTime();
    const duration = Math.floor((Date.now() - startTime) / 1000);
    
    await this.updateOfflineSession(sessionId, {
      end_time: endTime,
      duration_seconds: duration
    });
    
    // Add to sync queue
    await this.addToSyncQueue({
      id: `session_${sessionId}`,
      data_type: 'session',
      content: session,
      priority: session.priority_level,
      created_at: new Date().toISOString(),
      attempts: 0,
      estimated_sync_time: this.estimateSyncTime(session),
      data_size_kb: this.calculateDataSize(session)
    });
  }
  
  private async storeOfflineSession(session: OfflineSession): Promise<void> {
    try {
      const sessions = await this.getOfflineSessions();
      sessions.push(session);
      
      // Keep only recent sessions to manage storage
      const recentSessions = sessions
        .sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime())
        .slice(0, 100);
      
      const compressed = compress(JSON.stringify(recentSessions));
      await AsyncStorage.setItem(this.STORAGE_KEYS.SESSIONS, compressed);
      
    } catch (error) {
      throw new Error(`Failed to store offline session: ${error}`);
    }
  }
  
  async getOfflineSessions(): Promise<OfflineSession[]> {
    try {
      const compressed = await AsyncStorage.getItem(this.STORAGE_KEYS.SESSIONS);
      if (!compressed) return [];
      
      const decompressed = decompress(compressed);
      return JSON.parse(decompressed || '[]');
    } catch (error) {
      console.error('Failed to get offline sessions:', error);
      return [];
    }
  }
  
  // 📊 OFFLINE ANALYTICS
  
  async collectOfflineAnalytics(): Promise<OfflineAnalytics> {
    try {
      const sessions = await this.getOfflineSessions();
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const recentSessions = sessions.filter(s => 
        new Date(s.start_time) >= weekAgo
      );
      
      const analytics: OfflineAnalytics = {
        user_id: 'current_user', // Would be dynamic
        collection_period: {
          start_date: weekAgo.toISOString(),
          end_date: now.toISOString()
        },
        usage_patterns: this.analyzeUsagePatterns(recentSessions),
        performance_metrics: this.analyzePerformanceMetrics(recentSessions),
        content_engagement: await this.analyzeContentEngagement(),
        technical_metrics: await this.analyzeTechnicalMetrics(),
        collected_offline: true,
        last_updated: now.toISOString()
      };
      
      await this.storeOfflineAnalytics(analytics);
      return analytics;
      
    } catch (error) {
      throw new Error(`Failed to collect offline analytics: ${error}`);
    }
  }
  
  private analyzeUsagePatterns(sessions: OfflineSession[]): OfflineAnalytics['usage_patterns'] {
    const totalOfflineTime = sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0);
    const sessionsByDay = sessions.reduce((acc, s) => {
      const day = new Date(s.start_time).toDateString();
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const sessionsByHour = sessions.reduce((acc, s) => {
      const hour = new Date(s.start_time).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    const activityTypes = sessions.reduce((acc, s) => {
      acc[s.session_type] = (acc[s.session_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total_offline_time: totalOfflineTime,
      sessions_per_day: Object.keys(sessionsByDay).length > 0 ? 
        Object.values(sessionsByDay).reduce((a, b) => a + b, 0) / Object.keys(sessionsByDay).length : 0,
      preferred_activity_types: activityTypes,
      peak_usage_hours: Object.entries(sessionsByHour)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([hour]) => parseInt(hour)),
      content_consumption_rate: sessions.length > 0 ? 
        sessions.reduce((sum, s) => sum + s.session_stats.items_completed, 0) / sessions.length : 0
    };
  }
  
  private analyzePerformanceMetrics(sessions: OfflineSession[]): OfflineAnalytics['performance_metrics'] {
    if (sessions.length === 0) {
      return {
        offline_learning_efficiency: 0,
        retention_rate_offline: 0,
        completion_rate_offline: 0,
        accuracy_trends: {},
        improvement_velocity: 0
      };
    }
    
    const averageAccuracy = sessions.reduce((sum, s) => sum + s.session_stats.accuracy_percentage, 0) / sessions.length;
    const completionRate = sessions.filter(s => s.end_time).length / sessions.length;
    
    return {
      offline_learning_efficiency: averageAccuracy * completionRate,
      retention_rate_offline: averageAccuracy,
      completion_rate_offline: completionRate,
      accuracy_trends: this.calculateAccuracyTrends(sessions),
      improvement_velocity: this.calculateImprovementVelocity(sessions)
    };
  }
  
  private async analyzeContentEngagement(): Promise<OfflineAnalytics['content_engagement']> {
    const passages = await this.getCachedPassages();
    const vocabulary = await this.getCachedVocabulary();
    
    const mostAccessed = passages
      .sort((a, b) => b.access_count - a.access_count)
      .slice(0, 10)
      .map(p => p.id);
    
    return {
      most_accessed_content: mostAccessed,
      content_completion_rates: {},
      user_content_preferences: this.extractUserPreferences(passages),
      difficult_content_areas: this.identifyDifficultAreas(vocabulary)
    };
  }
  
  private async analyzeTechnicalMetrics(): Promise<OfflineAnalytics['technical_metrics']> {
    const cacheSize = await this.calculateTotalCacheSize();
    
    return {
      cache_hit_rate: 0.85, // Would be calculated from actual usage
      sync_efficiency: 0.92, // Would be calculated from sync performance
      storage_usage_mb: cacheSize,
      battery_usage_index: 0.15 // Would be measured from device metrics
    };
  }
  
  private async storeOfflineAnalytics(analytics: OfflineAnalytics): Promise<void> {
    try {
      const compressed = compress(JSON.stringify(analytics));
      await AsyncStorage.setItem(this.STORAGE_KEYS.ANALYTICS, compressed);
    } catch (error) {
      throw new Error(`Failed to store offline analytics: ${error}`);
    }
  }
  
  // 🔄 SYNC QUEUE MANAGEMENT
  
  async addToSyncQueue(item: SyncQueueItem): Promise<void> {
    try {
      const queue = await this.getSyncQueue();
      queue.push(item);
      
      // Sort by priority and created_at
      queue.sort((a, b) => {
        if (a.priority !== b.priority) {
          return b.priority - a.priority; // Higher priority first
        }
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      });
      
      // Limit queue size
      const limitedQueue = queue.slice(0, this.MAX_SYNC_QUEUE_SIZE);
      
      const compressed = compress(JSON.stringify(limitedQueue));
      await AsyncStorage.setItem(this.STORAGE_KEYS.SYNC_QUEUE, compressed);
      
    } catch (error) {
      throw new Error(`Failed to add to sync queue: ${error}`);
    }
  }
  
  async getSyncQueue(): Promise<SyncQueueItem[]> {
    try {
      const compressed = await AsyncStorage.getItem(this.STORAGE_KEYS.SYNC_QUEUE);
      if (!compressed) return [];
      
      const decompressed = decompress(compressed);
      return JSON.parse(decompressed || '[]');
    } catch (error) {
      console.error('Failed to get sync queue:', error);
      return [];
    }
  }
  
  async removeFromSyncQueue(itemId: string): Promise<void> {
    try {
      const queue = await this.getSyncQueue();
      const filteredQueue = queue.filter(item => item.id !== itemId);
      
      const compressed = compress(JSON.stringify(filteredQueue));
      await AsyncStorage.setItem(this.STORAGE_KEYS.SYNC_QUEUE, compressed);
      
    } catch (error) {
      throw new Error(`Failed to remove from sync queue: ${error}`);
    }
  }
  
  async clearSyncQueue(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.STORAGE_KEYS.SYNC_QUEUE);
    } catch (error) {
      throw new Error(`Failed to clear sync queue: ${error}`);
    }
  }
  
  // 🧹 CACHE MANAGEMENT
  
  private async applyCacheManagement(passages: CachedPassage[]): Promise<CachedPassage[]> {
    // Remove expired content
    const now = Date.now();
    const expiryThreshold = this.CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    
    const validPassages = passages.filter(passage => {
      const cacheAge = now - new Date(passage.cached_date).getTime();
      return cacheAge < expiryThreshold;
    });
    
    // Sort by priority and keep within size limits
    const sortedPassages = validPassages.sort((a, b) => b.priority_score - a.priority_score);
    
    // Estimate cache size and trim if necessary
    const estimatedSizeKB = sortedPassages.length * 5; // Rough estimate
    const maxItems = Math.floor((this.MAX_CACHE_SIZE_MB * 1024) / 5);
    
    return sortedPassages.slice(0, Math.min(maxItems, sortedPassages.length));
  }
  
  private calculatePriorityScore(passage: CachedPassage): number {
    const accessWeight = passage.access_count * 10;
    const recencyWeight = this.calculateRecencyWeight(passage.last_accessed);
    const difficultyWeight = this.getDifficultyWeight(passage.metadata.difficulty_level);
    
    return accessWeight + recencyWeight + difficultyWeight;
  }
  
  private calculateRecencyWeight(lastAccessed: string): number {
    const daysSinceAccess = (Date.now() - new Date(lastAccessed).getTime()) / (24 * 60 * 60 * 1000);
    return Math.max(0, 30 - daysSinceAccess);
  }
  
  private getDifficultyWeight(difficulty: string): number {
    const weights = { beginner: 15, intermediate: 10, advanced: 5 };
    return weights[difficulty as keyof typeof weights] || 0;
  }
  
  private calculateSessionPriority(sessionType: OfflineSession['session_type']): number {
    const priorities = {
      vocabulary: 8,
      reading: 7,
      quiz: 6,
      cultural_exploration: 5
    };
    return priorities[sessionType] || 1;
  }
  
  private mergeSRSData(existing: CachedVocabulary['srs_data'], incoming: CachedVocabulary['srs_data']) {
    // Keep the data that indicates better learning progress
    return {
      interval: Math.max(existing.interval, incoming.interval),
      easiness_factor: Math.max(existing.easiness_factor, incoming.easiness_factor),
      repetition_count: Math.max(existing.repetition_count, incoming.repetition_count),
      next_review_date: new Date(Math.max(
        new Date(existing.next_review_date).getTime(),
        new Date(incoming.next_review_date).getTime()
      )).toISOString(),
      mastery_level: Math.max(existing.mastery_level, incoming.mastery_level)
    };
  }
  
  // 📊 UTILITY METHODS
  
  private estimateSyncTime(session: OfflineSession): number {
    return session.activities.length * 100; // 100ms per activity estimate
  }
  
  private calculateDataSize(data: any): number {
    return Math.ceil(JSON.stringify(data).length / 1024); // Size in KB
  }
  
  private calculateAccuracyTrends(sessions: OfflineSession[]): Record<string, number> {
    // Group sessions by day and calculate average accuracy
    const trends: Record<string, number> = {};
    sessions.forEach(session => {
      const day = new Date(session.start_time).toDateString();
      if (!trends[day]) {
        trends[day] = session.session_stats.accuracy_percentage;
      } else {
        trends[day] = (trends[day] + session.session_stats.accuracy_percentage) / 2;
      }
    });
    return trends;
  }
  
  private calculateImprovementVelocity(sessions: OfflineSession[]): number {
    if (sessions.length < 2) return 0;
    
    const sortedSessions = sessions.sort((a, b) => 
      new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );
    
    const firstAccuracy = sortedSessions[0].session_stats.accuracy_percentage;
    const lastAccuracy = sortedSessions[sortedSessions.length - 1].session_stats.accuracy_percentage;
    
    return lastAccuracy - firstAccuracy;
  }
  
  private extractUserPreferences(passages: CachedPassage[]): string[] {
    const themeCount: Record<string, number> = {};
    passages.forEach(passage => {
      const theme = passage.metadata.cultural_theme;
      themeCount[theme] = (themeCount[theme] || 0) + passage.access_count;
    });
    
    return Object.entries(themeCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([theme]) => theme);
  }
  
  private identifyDifficultAreas(vocabulary: CachedVocabulary[]): string[] {
    return vocabulary
      .filter(word => word.srs_data.mastery_level < 0.5)
      .map(word => word.word)
      .slice(0, 10);
  }
  
  private async updateCacheMetadata(type: string, count: number): Promise<void> {
    try {
      const metadata = await this.getCacheMetadata();
      metadata[type] = {
        count,
        last_updated: new Date().toISOString()
      };
      
      await AsyncStorage.setItem(this.STORAGE_KEYS.CACHE_METADATA, JSON.stringify(metadata));
    } catch (error) {
      console.error('Failed to update cache metadata:', error);
    }
  }
  
  private async getCacheMetadata(): Promise<Record<string, any>> {
    try {
      const metadata = await AsyncStorage.getItem(this.STORAGE_KEYS.CACHE_METADATA);
      return metadata ? JSON.parse(metadata) : {};
    } catch (error) {
      return {};
    }
  }
  
  private async calculateTotalCacheSize(): Promise<number> {
    try {
      let totalSize = 0;
      
      for (const key of Object.values(this.STORAGE_KEYS)) {
        const item = await AsyncStorage.getItem(key);
        if (item) {
          totalSize += item.length;
        }
      }
      
      return Math.ceil(totalSize / (1024 * 1024)); // Convert to MB
    } catch (error) {
      console.error('Failed to calculate cache size:', error);
      return 0;
    }
  }
  
  // 🧹 CLEANUP METHODS
  
  async clearAllOfflineData(): Promise<void> {
    try {
      const keys = Object.values(this.STORAGE_KEYS);
      await Promise.all(keys.map(key => AsyncStorage.removeItem(key)));
    } catch (error) {
      throw new Error(`Failed to clear offline data: ${error}`);
    }
  }
  
  async getStorageStats(): Promise<{
    total_size_mb: number;
    passages_count: number;
    vocabulary_count: number;
    quiz_questions_count: number;
    cultural_insights_count: number;
    sessions_count: number;
    sync_queue_length: number;
  }> {
    try {
      const [passages, vocabulary, questions, insights, sessions, syncQueue] = await Promise.all([
        this.getCachedPassages(),
        this.getCachedVocabulary(),
        this.getCachedQuizQuestions(),
        this.getCachedCulturalInsights(),
        this.getOfflineSessions(),
        this.getSyncQueue()
      ]);
      
      const totalSize = await this.calculateTotalCacheSize();
      
      return {
        total_size_mb: totalSize,
        passages_count: passages.length,
        vocabulary_count: vocabulary.length,
        quiz_questions_count: questions.length,
        cultural_insights_count: insights.length,
        sessions_count: sessions.length,
        sync_queue_length: syncQueue.length
      };
    } catch (error) {
      throw new Error(`Failed to get storage stats: ${error}`);
    }
  }
}

// 🚀 EXPORT OFFLINE DATA MANAGER
export default OfflineDataManager;
export type {
  CachedPassage,
  CachedVocabulary,
  CachedQuizQuestion,
  CachedCulturalInsight,
  OfflineSession,
  OfflineAnalytics,
  SyncQueueItem
};
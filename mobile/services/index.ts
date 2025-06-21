/**
 * 📱 MOBILE SERVICES LAYER - Core Infrastructure
 * Essential services that power all mobile components
 * 
 * Services:
 * - OfflineStorageService: Local data persistence
 * - AudioService: Text-to-speech and pronunciation
 * - APIService: Enhanced backend integration
 * - NotificationService: Learning reminders and achievements
 * - SyncService: Data synchronization
 * - AnalyticsService: Learning progress tracking
 * - CacheService: Performance optimization
 * - SecurityService: Data protection
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';
import CryptoJS from 'crypto-js';

// Types
interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface SyncStatus {
  lastSync: Date;
  pendingUploads: string[];
  failedSyncs: string[];
  isOnline: boolean;
}

interface LearningProgress {
  userId: string;
  sessionId: string;
  component: string;
  action: string;
  data: any;
  timestamp: Date;
  synced: boolean;
}

interface NotificationConfig {
  id: string;
  title: string;
  body: string;
  trigger: {
    type: 'time' | 'interval' | 'location';
    value: any;
  };
  data?: any;
}

/**
 * 🗄️ OFFLINE STORAGE SERVICE
 * Handles all local data persistence with encryption and compression
 */
export class OfflineStorageService {
  private static readonly ENCRYPTION_KEY = 'macrobius_mobile_key_v1';
  private static readonly MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB

  static async setItem(key: string, value: any, encrypt: boolean = false): Promise<void> {
    try {
      let dataToStore = JSON.stringify(value);
      
      if (encrypt) {
        dataToStore = CryptoJS.AES.encrypt(dataToStore, this.ENCRYPTION_KEY).toString();
      }
      
      await AsyncStorage.setItem(key, dataToStore);
      await this.updateCacheMetadata(key, dataToStore.length);
    } catch (error) {
      console.error('OfflineStorageService.setItem error:', error);
      throw new Error(`Failed to store item: ${key}`);
    }
  }

  static async getItem<T>(key: string, decrypt: boolean = false): Promise<T | null> {
    try {
      const storedData = await AsyncStorage.getItem(key);
      
      if (!storedData) {
        return null;
      }
      
      let dataToReturn = storedData;
      
      if (decrypt) {
        const bytes = CryptoJS.AES.decrypt(storedData, this.ENCRYPTION_KEY);
        dataToReturn = bytes.toString(CryptoJS.enc.Utf8);
      }
      
      return JSON.parse(dataToReturn);
    } catch (error) {
      console.error('OfflineStorageService.getItem error:', error);
      return null;
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
      await this.removeCacheMetadata(key);
    } catch (error) {
      console.error('OfflineStorageService.removeItem error:', error);
    }
  }

  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('OfflineStorageService.clear error:', error);
    }
  }

  static async getCacheSize(): Promise<number> {
    try {
      const metadata = await this.getItem<Record<string, number>>('cache_metadata') || {};
      return Object.values(metadata).reduce((total, size) => total + size, 0);
    } catch (error) {
      console.error('OfflineStorageService.getCacheSize error:', error);
      return 0;
    }
  }

  static async cleanupOldCache(): Promise<void> {
    try {
      const cacheSize = await this.getCacheSize();
      
      if (cacheSize > this.MAX_CACHE_SIZE) {
        const allKeys = await AsyncStorage.getAllKeys();
        const timestampedKeys = await Promise.all(
          allKeys.map(async (key) => {
            const metadata = await this.getItem<any>(`${key}_meta`);
            return {
              key,
              timestamp: metadata?.timestamp || 0
            };
          })
        );
        
        // Sort by timestamp and remove oldest items
        timestampedKeys.sort((a, b) => a.timestamp - b.timestamp);
        const keysToRemove = timestampedKeys.slice(0, Math.floor(timestampedKeys.length * 0.3));
        
        await Promise.all(keysToRemove.map(({ key }) => this.removeItem(key)));
      }
    } catch (error) {
      console.error('OfflineStorageService.cleanupOldCache error:', error);
    }
  }

  private static async updateCacheMetadata(key: string, size: number): Promise<void> {
    try {
      const metadata = await this.getItem<Record<string, number>>('cache_metadata') || {};
      metadata[key] = size;
      await AsyncStorage.setItem('cache_metadata', JSON.stringify(metadata));
    } catch (error) {
      console.error('OfflineStorageService.updateCacheMetadata error:', error);
    }
  }

  private static async removeCacheMetadata(key: string): Promise<void> {
    try {
      const metadata = await this.getItem<Record<string, number>>('cache_metadata') || {};
      delete metadata[key];
      await AsyncStorage.setItem('cache_metadata', JSON.stringify(metadata));
    } catch (error) {
      console.error('OfflineStorageService.removeCacheMetadata error:', error);
    }
  }
}

/**
 * 🔊 AUDIO SERVICE
 * Handles text-to-speech, pronunciation, and audio content
 */
export class AudioService {
  private static audioInstance: Audio.Sound | null = null;
  private static isInitialized = false;

  static async initialize(): Promise<void> {
    try {
      if (!this.isInitialized) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
        this.isInitialized = true;
      }
    } catch (error) {
      console.error('AudioService.initialize error:', error);
    }
  }

  static async playAudio(uri: string): Promise<void> {
    try {
      await this.initialize();
      
      // Stop any currently playing audio
      await this.stopAudio();
      
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      
      this.audioInstance = sound;
      
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          this.stopAudio();
        }
      });
    } catch (error) {
      console.error('AudioService.playAudio error:', error);
      throw new Error('Failed to play audio');
    }
  }

  static async playTextToSpeech(text: string, language: string = 'la'): Promise<void> {
    try {
      // Implement text-to-speech using Expo Speech or similar
      // This is a placeholder for TTS implementation
      console.log(`Playing TTS for: ${text} in language: ${language}`);
    } catch (error) {
      console.error('AudioService.playTextToSpeech error:', error);
    }
  }

  static async stopAudio(): Promise<void> {
    try {
      if (this.audioInstance) {
        await this.audioInstance.stopAsync();
        await this.audioInstance.unloadAsync();
        this.audioInstance = null;
      }
    } catch (error) {
      console.error('AudioService.stopAudio error:', error);
    }
  }

  static async pauseAudio(): Promise<void> {
    try {
      if (this.audioInstance) {
        await this.audioInstance.pauseAsync();
      }
    } catch (error) {
      console.error('AudioService.pauseAudio error:', error);
    }
  }

  static async resumeAudio(): Promise<void> {
    try {
      if (this.audioInstance) {
        await this.audioInstance.playAsync();
      }
    } catch (error) {
      console.error('AudioService.resumeAudio error:', error);
    }
  }

  static async setVolume(volume: number): Promise<void> {
    try {
      if (this.audioInstance) {
        await this.audioInstance.setVolumeAsync(Math.max(0, Math.min(1, volume)));
      }
    } catch (error) {
      console.error('AudioService.setVolume error:', error);
    }
  }

  static async getPlaybackStatus(): Promise<any> {
    try {
      if (this.audioInstance) {
        return await this.audioInstance.getStatusAsync();
      }
      return null;
    } catch (error) {
      console.error('AudioService.getPlaybackStatus error:', error);
      return null;
    }
  }
}

/**
 * 🌐 API SERVICE
 * Enhanced backend integration with fallback systems
 */
export class APIService {
  private static readonly BASE_URL = 'http://152.70.184.232:8080';
  private static readonly TIMEOUT = 10000; // 10 seconds
  private static readonly MAX_RETRIES = 3;

  static async request<T>(
    endpoint: string,
    options: RequestInit = {},
    useCache: boolean = true
  ): Promise<T> {
    const cacheKey = `api_${endpoint}_${JSON.stringify(options)}`;
    
    try {
      // Check cache first
      if (useCache) {
        const cachedData = await this.getCachedResponse<T>(cacheKey);
        if (cachedData) {
          return cachedData;
        }
      }
      
      // Check network connectivity
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        throw new Error('No network connection');
      }
      
      const url = `${this.BASE_URL}${endpoint}`;
      const requestOptions: RequestInit = {
        timeout: this.TIMEOUT,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };
      
      let lastError: Error | null = null;
      
      // Retry logic
      for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
        try {
          const response = await fetch(url, requestOptions);
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          const data = await response.json();
          
          // Cache successful response
          if (useCache) {
            await this.cacheResponse(cacheKey, data);
          }
          
          return data;
        } catch (error) {
          lastError = error as Error;
          
          if (attempt < this.MAX_RETRIES) {
            // Exponential backoff
            await new Promise(resolve => 
              setTimeout(resolve, Math.pow(2, attempt) * 1000)
            );
          }
        }
      }
      
      throw lastError || new Error('Request failed after retries');
    } catch (error) {
      console.error(`APIService.request error for ${endpoint}:`, error);
      
      // Try to return fallback data
      const fallbackData = await this.getFallbackData<T>(endpoint);
      if (fallbackData) {
        return fallbackData;
      }
      
      throw error;
    }
  }

  static async searchPassages(query: string, filters: any = {}): Promise<any> {
    return this.request('/api/passages/search', {
      method: 'POST',
      body: JSON.stringify({ query, filters })
    });
  }

  static async getCulturalInsights(theme?: string): Promise<any> {
    const endpoint = theme ? `/api/cultural/insights?theme=${theme}` : '/api/cultural/insights';
    return this.request(endpoint);
  }

  static async getVocabulary(level?: string): Promise<any> {
    const endpoint = level ? `/api/vocabulary?level=${level}` : '/api/vocabulary';
    return this.request(endpoint);
  }

  static async submitLearningProgress(progress: LearningProgress): Promise<any> {
    return this.request('/api/progress', {
      method: 'POST',
      body: JSON.stringify(progress)
    }, false); // Don't cache progress submissions
  }

  private static async getCachedResponse<T>(cacheKey: string): Promise<T | null> {
    try {
      const cached = await OfflineStorageService.getItem<CacheItem<T>>(cacheKey);
      
      if (cached && cached.expiresAt > Date.now()) {
        return cached.data;
      }
      
      // Remove expired cache
      if (cached) {
        await OfflineStorageService.removeItem(cacheKey);
      }
      
      return null;
    } catch (error) {
      console.error('APIService.getCachedResponse error:', error);
      return null;
    }
  }

  private static async cacheResponse<T>(cacheKey: string, data: T): Promise<void> {
    try {
      const cacheItem: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      
      await OfflineStorageService.setItem(cacheKey, cacheItem);
    } catch (error) {
      console.error('APIService.cacheResponse error:', error);
    }
  }

  private static async getFallbackData<T>(endpoint: string): Promise<T | null> {
    try {
      // Return cached fallback data based on endpoint
      const fallbackMap: Record<string, string> = {
        '/api/passages/search': 'fallback_passages',
        '/api/cultural/insights': 'fallback_cultural_insights',
        '/api/vocabulary': 'fallback_vocabulary'
      };
      
      const fallbackKey = fallbackMap[endpoint.split('?')[0]];
      if (fallbackKey) {
        return await OfflineStorageService.getItem<T>(fallbackKey);
      }
      
      return null;
    } catch (error) {
      console.error('APIService.getFallbackData error:', error);
      return null;
    }
  }
}

/**
 * 🔔 NOTIFICATION SERVICE
 * Learning reminders and achievement notifications
 */
export class NotificationService {
  private static isInitialized = false;

  static async initialize(): Promise<void> {
    try {
      if (!this.isInitialized) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        
        if (finalStatus !== 'granted') {
          throw new Error('Notification permissions not granted');
        }
        
        // Configure notification behavior
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          }),
        });
        
        this.isInitialized = true;
      }
    } catch (error) {
      console.error('NotificationService.initialize error:', error);
    }
  }

  static async scheduleNotification(config: NotificationConfig): Promise<string | null> {
    try {
      await this.initialize();
      
      let trigger: any;
      
      switch (config.trigger.type) {
        case 'time':
          trigger = { date: new Date(config.trigger.value) };
          break;
        case 'interval':
          trigger = { seconds: config.trigger.value };
          break;
        default:
          throw new Error(`Unsupported trigger type: ${config.trigger.type}`);
      }
      
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: config.title,
          body: config.body,
          data: config.data,
        },
        trigger,
      });
      
      return notificationId;
    } catch (error) {
      console.error('NotificationService.scheduleNotification error:', error);
      return null;
    }
  }

  static async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error('NotificationService.cancelNotification error:', error);
    }
  }

  static async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('NotificationService.cancelAllNotifications error:', error);
    }
  }

  static async scheduleDaily RemindNotification(hour: number, minute: number): Promise<string | null> {
    return this.scheduleNotification({
      id: 'daily_reminder',
      title: 'Time for Latin!',
      body: 'Continue your journey through ancient Roman wisdom',
      trigger: {
        type: 'time',
        value: new Date().setHours(hour, minute, 0, 0)
      },
      data: { type: 'daily_reminder' }
    });
  }

  static async showAchievementNotification(achievement: any): Promise<void> {
    try {
      await this.initialize();
      
      await Notifications.presentNotificationAsync({
        title: 'Achievement Unlocked! 🏆',
        body: `${achievement.title}: ${achievement.description}`,
        data: { type: 'achievement', achievement }
      });
    } catch (error) {
      console.error('NotificationService.showAchievementNotification error:', error);
    }
  }
}

/**
 * 🔄 SYNC SERVICE
 * Data synchronization between device and backend
 */
export class SyncService {
  private static syncInProgress = false;
  private static readonly SYNC_INTERVAL = 5 * 60 * 1000; // 5 minutes

  static async syncUserProgress(userId: string): Promise<SyncStatus> {
    if (this.syncInProgress) {
      throw new Error('Sync already in progress');
    }
    
    try {
      this.syncInProgress = true;
      
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        throw new Error('No network connection');
      }
      
      // Get pending progress items
      const pendingProgress = await OfflineStorageService.getItem<LearningProgress[]>(
        `pending_progress_${userId}`
      ) || [];
      
      const successfulUploads: string[] = [];
      const failedUploads: string[] = [];
      
      // Upload pending progress
      for (const progress of pendingProgress) {
        try {
          await APIService.submitLearningProgress(progress);
          successfulUploads.push(progress.sessionId);
        } catch (error) {
          failedUploads.push(progress.sessionId);
          console.error('Failed to sync progress:', error);
        }
      }
      
      // Remove successfully uploaded items
      const remainingProgress = pendingProgress.filter(
        p => !successfulUploads.includes(p.sessionId)
      );
      
      await OfflineStorageService.setItem(
        `pending_progress_${userId}`,
        remainingProgress
      );
      
      // Update sync status
      const syncStatus: SyncStatus = {
        lastSync: new Date(),
        pendingUploads: remainingProgress.map(p => p.sessionId),
        failedSyncs: failedUploads,
        isOnline: netInfo.isConnected || false
      };
      
      await OfflineStorageService.setItem(`sync_status_${userId}`, syncStatus);
      
      return syncStatus;
    } catch (error) {
      console.error('SyncService.syncUserProgress error:', error);
      throw error;
    } finally {
      this.syncInProgress = false;
    }
  }

  static async addPendingProgress(userId: string, progress: LearningProgress): Promise<void> {
    try {
      const pendingProgress = await OfflineStorageService.getItem<LearningProgress[]>(
        `pending_progress_${userId}`
      ) || [];
      
      pendingProgress.push({
        ...progress,
        timestamp: new Date(),
        synced: false
      });
      
      await OfflineStorageService.setItem(
        `pending_progress_${userId}`,
        pendingProgress
      );
    } catch (error) {
      console.error('SyncService.addPendingProgress error:', error);
    }
  }

  static async startAutoSync(userId: string): Promise<void> {
    setInterval(async () => {
      try {
        await this.syncUserProgress(userId);
      } catch (error) {
        console.error('Auto sync failed:', error);
      }
    }, this.SYNC_INTERVAL);
  }

  static async getSyncStatus(userId: string): Promise<SyncStatus | null> {
    return OfflineStorageService.getItem<SyncStatus>(`sync_status_${userId}`);
  }
}

/**
 * 📊 ANALYTICS SERVICE
 * Learning progress tracking and analytics
 */
export class AnalyticsService {
  static async trackEvent(
    userId: string,
    event: string,
    properties: Record<string, any> = {}
  ): Promise<void> {
    try {
      const analyticsEvent = {
        userId,
        event,
        properties: {
          ...properties,
          timestamp: new Date().toISOString(),
          platform: 'mobile'
        }
      };
      
      // Store locally for batching
      const events = await OfflineStorageService.getItem<any[]>('analytics_events') || [];
      events.push(analyticsEvent);
      
      // Keep only last 1000 events
      if (events.length > 1000) {
        events.splice(0, events.length - 1000);
      }
      
      await OfflineStorageService.setItem('analytics_events', events);
      
      // Try to send immediately if online
      const netInfo = await NetInfo.fetch();
      if (netInfo.isConnected) {
        await this.flushEvents();
      }
    } catch (error) {
      console.error('AnalyticsService.trackEvent error:', error);
    }
  }

  static async flushEvents(): Promise<void> {
    try {
      const events = await OfflineStorageService.getItem<any[]>('analytics_events') || [];
      
      if (events.length === 0) {
        return;
      }
      
      // Send events to backend
      await APIService.request('/api/analytics/events', {
        method: 'POST',
        body: JSON.stringify({ events })
      }, false);
      
      // Clear sent events
      await OfflineStorageService.removeItem('analytics_events');
    } catch (error) {
      console.error('AnalyticsService.flushEvents error:', error);
    }
  }

  static async trackLearningSession(
    userId: string,
    component: string,
    duration: number,
    performance: Record<string, any>
  ): Promise<void> {
    await this.trackEvent(userId, 'learning_session_completed', {
      component,
      duration,
      performance
    });
  }

  static async trackAchievement(
    userId: string,
    achievementId: string,
    points: number
  ): Promise<void> {
    await this.trackEvent(userId, 'achievement_unlocked', {
      achievementId,
      points
    });
  }
}

/**
 * 🔒 SECURITY SERVICE
 * Data protection and secure storage
 */
export class SecurityService {
  private static readonly SECRET_KEY = 'macrobius_security_key_v1';

  static encrypt(data: string): string {
    try {
      return CryptoJS.AES.encrypt(data, this.SECRET_KEY).toString();
    } catch (error) {
      console.error('SecurityService.encrypt error:', error);
      return data; // Fallback to unencrypted
    }
  }

  static decrypt(encryptedData: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('SecurityService.decrypt error:', error);
      return encryptedData; // Fallback to assuming it's unencrypted
    }
  }

  static async secureStore(key: string, value: any): Promise<void> {
    const encryptedValue = this.encrypt(JSON.stringify(value));
    await OfflineStorageService.setItem(`secure_${key}`, encryptedValue);
  }

  static async secureRetrieve<T>(key: string): Promise<T | null> {
    try {
      const encryptedValue = await OfflineStorageService.getItem<string>(`secure_${key}`);
      
      if (!encryptedValue) {
        return null;
      }
      
      const decryptedValue = this.decrypt(encryptedValue);
      return JSON.parse(decryptedValue);
    } catch (error) {
      console.error('SecurityService.secureRetrieve error:', error);
      return null;
    }
  }

  static validateUserData(userData: any): boolean {
    // Implement data validation logic
    return userData && 
           typeof userData.id === 'string' && 
           userData.id.length > 0;
  }
}

// Export all services
export {
  OfflineStorageService,
  AudioService,
  APIService,
  NotificationService,
  SyncService,
  AnalyticsService,
  SecurityService
};
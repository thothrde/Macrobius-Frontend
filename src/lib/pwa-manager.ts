/**
 * Progressive Web App Manager
 * Handles offline functionality, caching, and app-like experience
 */

import React from 'react';

interface CacheConfig {
  name: string;
  version: string;
  urls: string[];
  maxAge: number;
}

interface OfflineData {
  quizCategories: any[];
  languages: any[];
  userProgress: any;
  achievements: any[];
  learningPaths: any[];
  culturalAnalysis: any[];
  cachedAt: number;
}

interface InstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{outcome: 'accepted' | 'dismissed'}>;
  prompt(): Promise<void>;
}

interface PWAStats {
  isInstalled: boolean;
  canInstall: boolean;
  isOnline: boolean;
  cacheSize: number;
  lastSync: number;
  offlineCapabilities: string[];
}

export class PWAManager {
  private swRegistration: ServiceWorkerRegistration | null = null;
  private installPrompt: InstallPromptEvent | null = null;
  private isOnline = navigator.onLine;
  private syncInProgress = false;
  private cacheConfig: CacheConfig = {
    name: 'macrobius-cache',
    version: 'v2.0.0',
    urls: [
      '/',
      '/offline',
      '/_next/static/chunks/pages/_app.js',
      '/_next/static/chunks/main.js',
      '/_next/static/css/main.css',
      '/manifest.json',
      '/icons/icon-192.png',
      '/icons/icon-512.png'
    ],
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  constructor() {
    this.initializeServiceWorker();
    this.setupEventListeners();
    this.checkInstallability();
  }

  private async initializeServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        this.swRegistration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
        
        console.log('🔧 Service Worker registered successfully');
        
        // Listen for updates
        this.swRegistration.addEventListener('updatefound', () => {
          const newWorker = this.swRegistration!.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New version available
                this.notifyAppUpdate();
              }
            });
          }
        });
        
        // Handle messages from service worker
        navigator.serviceWorker.addEventListener('message', (event) => {
          this.handleServiceWorkerMessage(event.data);
        });
        
      } catch (error) {
        console.error('❌ Service Worker registration failed:', error);
      }
    }
  }

  private setupEventListeners(): void {
    // Online/offline detection
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.handleOnline();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.handleOffline();
    });
    
    // Install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.installPrompt = e as InstallPromptEvent;
      console.log('📱 App install prompt available');
    });
    
    // App installed
    window.addEventListener('appinstalled', () => {
      console.log('✅ PWA was installed');
      this.installPrompt = null;
      this.notifyInstallationComplete();
    });
    
    // Visibility change for background sync
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isOnline) {
        this.performBackgroundSync();
      }
    });
  }

  private checkInstallability(): void {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('📱 App is running in standalone mode');
    }
  }

  private handleOnline(): void {
    console.log('🌐 App is online');
    this.syncOfflineData();
    this.notifyConnectionChange(true);
    
    // Emit custom event
    window.dispatchEvent(new CustomEvent('pwa-online', {
      detail: { timestamp: Date.now() }
    }));
  }

  private handleOffline(): void {
    console.log('🔌 App is offline');
    this.notifyConnectionChange(false);
    
    // Emit custom event
    window.dispatchEvent(new CustomEvent('pwa-offline', {
      detail: { timestamp: Date.now() }
    }));
  }

  private async syncOfflineData(): Promise<void> {
    if (this.syncInProgress) return;
    
    this.syncInProgress = true;
    
    try {
      const offlineData = await this.getOfflineData();
      if (offlineData) {
        // Sync different types of data
        await Promise.all([
          this.syncUserProgress(offlineData.userProgress),
          this.syncLearningPaths(offlineData.learningPaths),
          this.syncCulturalAnalysis(offlineData.culturalAnalysis)
        ]);
        
        console.log('✅ Offline data synced successfully');
      }
    } catch (error) {
      console.error('❌ Failed to sync offline data:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  private async performBackgroundSync(): Promise<void> {
    if (this.swRegistration && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        await this.swRegistration.sync.register('background-sync');
        console.log('🔄 Background sync scheduled');
      } catch (error) {
        console.error('❌ Background sync failed:', error);
      }
    }
  }

  private handleServiceWorkerMessage(data: any): void {
    switch (data.type) {
      case 'SYNC_COMPLETE':
        console.log('✅ Background sync completed');
        break;
      case 'CACHE_UPDATE':
        console.log('📦 Cache updated');
        break;
      case 'ERROR':
        console.error('❌ Service Worker error:', data.error);
        break;
    }
  }

  private notifyAppUpdate(): void {
    // Notify user that app update is available
    const event = new CustomEvent('pwa-update-available', {
      detail: { timestamp: Date.now() }
    });
    window.dispatchEvent(event);
  }

  private notifyInstallationComplete(): void {
    const event = new CustomEvent('pwa-installed', {
      detail: { timestamp: Date.now() }
    });
    window.dispatchEvent(event);
  }

  private notifyConnectionChange(online: boolean): void {
    const event = new CustomEvent('pwa-connection-change', { 
      detail: { online, timestamp: Date.now() } 
    });
    window.dispatchEvent(event);
  }

  // Public methods
  async installApp(): Promise<boolean> {
    if (!this.installPrompt) {
      console.warn('⚠️ Install prompt not available');
      return false;
    }
    
    try {
      await this.installPrompt.prompt();
      const { outcome } = await this.installPrompt.userChoice;
      this.installPrompt = null;
      
      console.log(`📱 Install prompt result: ${outcome}`);
      return outcome === 'accepted';
    } catch (error) {
      console.error('❌ Install prompt failed:', error);
      return false;
    }
  }

  canInstall(): boolean {
    return this.installPrompt !== null;
  }

  isInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true;
  }

  async cacheEssentialData(data: Partial<OfflineData>): Promise<void> {
    try {
      const offlineData: OfflineData = {
        quizCategories: data.quizCategories || [],
        languages: data.languages || [],
        userProgress: data.userProgress || {},
        achievements: data.achievements || [],
        learningPaths: data.learningPaths || [],
        culturalAnalysis: data.culturalAnalysis || [],
        cachedAt: Date.now()
      };
      
      // Store in both localStorage and IndexedDB
      localStorage.setItem('macrobius-offline-data', JSON.stringify(offlineData));
      await this.storeInIndexedDB('offline-data', offlineData);
      
      console.log('💾 Essential data cached successfully');
    } catch (error) {
      console.error('❌ Failed to cache essential data:', error);
    }
  }

  async getOfflineData(): Promise<OfflineData | null> {
    try {
      // Try IndexedDB first, fallback to localStorage
      let data = await this.getFromIndexedDB('offline-data');
      
      if (!data) {
        const cached = localStorage.getItem('macrobius-offline-data');
        if (cached) {
          data = JSON.parse(cached);
        }
      }
      
      if (!data) return null;
      
      // Check if data is still valid
      if (Date.now() - data.cachedAt > this.cacheConfig.maxAge) {
        await this.clearOfflineData();
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('❌ Failed to get offline data:', error);
      return null;
    }
  }

  async clearOfflineData(): Promise<void> {
    try {
      localStorage.removeItem('macrobius-offline-data');
      await this.deleteFromIndexedDB('offline-data');
      console.log('🗑️ Offline data cleared');
    } catch (error) {
      console.error('❌ Failed to clear offline data:', error);
    }
  }

  async syncUserProgress(progressData: any): Promise<void> {
    if (!progressData || !this.isOnline) return;
    
    try {
      // This would sync with the Oracle Cloud backend
      const response = await fetch('/api/sync-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          progress: progressData,
          timestamp: Date.now()
        })
      });
      
      if (response.ok) {
        console.log('✅ User progress synced with Oracle Cloud');
      }
    } catch (error) {
      console.error('❌ Failed to sync user progress:', error);
    }
  }

  async syncLearningPaths(pathsData: any): Promise<void> {
    if (!pathsData || !this.isOnline) return;
    
    try {
      const response = await fetch('/api/sync-learning-paths', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paths: pathsData,
          timestamp: Date.now()
        })
      });
      
      if (response.ok) {
        console.log('✅ Learning paths synced with Oracle Cloud');
      }
    } catch (error) {
      console.error('❌ Failed to sync learning paths:', error);
    }
  }

  async syncCulturalAnalysis(analysisData: any): Promise<void> {
    if (!analysisData || !this.isOnline) return;
    
    try {
      const response = await fetch('/api/sync-cultural-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          analysis: analysisData,
          timestamp: Date.now()
        })
      });
      
      if (response.ok) {
        console.log('✅ Cultural analysis synced with Oracle Cloud');
      }
    } catch (error) {
      console.error('❌ Failed to sync cultural analysis:', error);
    }
  }

  async updateApp(): Promise<void> {
    if (this.swRegistration && this.swRegistration.waiting) {
      // Tell the waiting service worker to skip waiting and become active
      this.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Reload the page to use the new service worker
      window.location.reload();
    }
  }

  async checkForUpdates(): Promise<boolean> {
    if (this.swRegistration) {
      await this.swRegistration.update();
      return this.swRegistration.waiting !== null;
    }
    return false;
  }

  getConnectionStatus(): boolean {
    return this.isOnline;
  }

  // Notification API
  async requestNotificationPermission(): Promise<boolean> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  async showNotification(title: string, options?: NotificationOptions): Promise<void> {
    if ('Notification' in window && Notification.permission === 'granted') {
      if (this.swRegistration) {
        await this.swRegistration.showNotification(title, {
          badge: '/icons/icon-192.png',
          icon: '/icons/icon-192.png',
          ...options
        });
      } else {
        new Notification(title, options);
      }
    }
  }

  // IndexedDB operations
  private async storeInIndexedDB(key: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('MacrobiusDB', 1);
      
      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['data'], 'readwrite');
        const store = transaction.objectStore('data');
        
        store.put({ key, data, timestamp: Date.now() });
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      };
      
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('data')) {
          db.createObjectStore('data', { keyPath: 'key' });
        }
      };
    });
  }

  private async getFromIndexedDB(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('MacrobiusDB', 1);
      
      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['data'], 'readonly');
        const store = transaction.objectStore('data');
        const getRequest = store.get(key);
        
        getRequest.onsuccess = () => {
          resolve(getRequest.result?.data || null);
        };
        getRequest.onerror = () => reject(getRequest.error);
      };
    });
  }

  private async deleteFromIndexedDB(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('MacrobiusDB', 1);
      
      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['data'], 'readwrite');
        const store = transaction.objectStore('data');
        
        store.delete(key);
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      };
    });
  }

  // Statistics and info
  async getStats(): Promise<PWAStats> {
    const offlineData = await this.getOfflineData();
    
    return {
      isInstalled: this.isInstalled(),
      canInstall: this.canInstall(),
      isOnline: this.isOnline,
      cacheSize: offlineData ? JSON.stringify(offlineData).length : 0,
      lastSync: offlineData?.cachedAt || 0,
      offlineCapabilities: [
        'Quiz taking',
        'Learning path progress',
        'Cultural analysis viewing',
        'Achievement tracking',
        'Basic navigation'
      ]
    };
  }

  // Background sync registration
  async scheduleBackgroundSync(tag: string): Promise<void> {
    if (this.swRegistration && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        await this.swRegistration.sync.register(tag);
        console.log(`🔄 Background sync scheduled: ${tag}`);
      } catch (error) {
        console.error('❌ Background sync registration failed:', error);
      }
    }
  }

  // Cleanup
  destroy(): void {
    // Cleanup would go here if needed
    console.log('🧹 PWA Manager destroyed');
  }
}

// Export singleton instance
export const pwaManager = new PWAManager();

// React Hook for PWA functionality
export function usePWA() {
  const [isInstalled, setIsInstalled] = React.useState(pwaManager.isInstalled());
  const [canInstall, setCanInstall] = React.useState(pwaManager.canInstall());
  const [isOnline, setIsOnline] = React.useState(pwaManager.getConnectionStatus());
  const [updateAvailable, setUpdateAvailable] = React.useState(false);
  const [stats, setStats] = React.useState<PWAStats | null>(null);

  React.useEffect(() => {
    // Update stats
    pwaManager.getStats().then(setStats);

    // Event listeners
    const handleInstall = () => {
      setIsInstalled(true);
      setCanInstall(false);
    };

    const handleUpdateAvailable = () => {
      setUpdateAvailable(true);
    };

    const handleConnectionChange = (event: CustomEvent) => {
      setIsOnline(event.detail.online);
    };

    window.addEventListener('pwa-installed', handleInstall);
    window.addEventListener('pwa-update-available', handleUpdateAvailable);
    window.addEventListener('pwa-connection-change', handleConnectionChange as EventListener);

    return () => {
      window.removeEventListener('pwa-installed', handleInstall);
      window.removeEventListener('pwa-update-available', handleUpdateAvailable);
      window.removeEventListener('pwa-connection-change', handleConnectionChange as EventListener);
    };
  }, []);

  return {
    isInstalled,
    canInstall,
    isOnline,
    updateAvailable,
    stats,
    installApp: pwaManager.installApp.bind(pwaManager),
    updateApp: pwaManager.updateApp.bind(pwaManager),
    checkForUpdates: pwaManager.checkForUpdates.bind(pwaManager),
    cacheEssentialData: pwaManager.cacheEssentialData.bind(pwaManager),
    requestNotificationPermission: pwaManager.requestNotificationPermission.bind(pwaManager),
    showNotification: pwaManager.showNotification.bind(pwaManager),
    scheduleBackgroundSync: pwaManager.scheduleBackgroundSync.bind(pwaManager)
  };
}

export default PWAManager;
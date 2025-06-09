// Progressive Web App Manager
// Handles offline functionality, caching, and app-like experience

// Extended types for Background Sync API
interface SyncManager {
  register(tag: string): Promise<void>;
  getTags(): Promise<string[]>;
}

interface ServiceWorkerRegistrationWithSync extends ServiceWorkerRegistration {
  sync: SyncManager;
}

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
  cachedAt: number;
}

interface InstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{outcome: 'accepted' | 'dismissed'}>;
  prompt(): Promise<void>;
}

export class PWAManager {
  private swRegistration: ServiceWorkerRegistration | null = null;
  private installPrompt: InstallPromptEvent | null = null;
  private isOnline = navigator.onLine;
  private cacheConfig: CacheConfig = {
    name: 'macrobius-cache',
    version: 'v1.0.0',
    urls: [
      '/',
      '/offline',
      '/static/js/bundle.js',
      '/static/css/main.css',
      '/manifest.json'
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
        
        console.log('Service Worker registered successfully');
        
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
        
      } catch (error) {
        console.error('Service Worker registration failed:', error);
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
    });
    
    // App installed
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      this.installPrompt = null;
    });
  }

  private checkInstallability(): void {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('App is running in standalone mode');
    }
  }

  private handleOnline(): void {
    console.log('App is online');
    this.syncOfflineData();
    this.notifyConnectionChange(true);
  }

  private handleOffline(): void {
    console.log('App is offline');
    this.notifyConnectionChange(false);
  }

  private async syncOfflineData(): Promise<void> {
    try {
      const offlineData = await this.getOfflineData();
      if (offlineData && offlineData.userProgress) {
        // Sync user progress, quiz results, etc.
        await this.syncUserProgress(offlineData.userProgress);
      }
    } catch (error) {
      console.error('Failed to sync offline data:', error);
    }
  }

  private notifyAppUpdate(): void {
    // Notify user that app update is available
    const event = new CustomEvent('app-update-available');
    window.dispatchEvent(event);
  }

  private notifyConnectionChange(online: boolean): void {
    const event = new CustomEvent('connection-change', { detail: { online } });
    window.dispatchEvent(event);
  }

  // Public methods
  async installApp(): Promise<boolean> {
    if (!this.installPrompt) {
      return false;
    }
    
    try {
      await this.installPrompt.prompt();
      const { outcome } = await this.installPrompt.userChoice;
      this.installPrompt = null;
      return outcome === 'accepted';
    } catch (error) {
      console.error('Install prompt failed:', error);
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
        cachedAt: Date.now()
      };
      
      localStorage.setItem('macrobius-offline-data', JSON.stringify(offlineData));
    } catch (error) {
      console.error('Failed to cache essential data:', error);
    }
  }

  async getOfflineData(): Promise<OfflineData | null> {
    try {
      const cached = localStorage.getItem('macrobius-offline-data');
      if (!cached) return null;
      
      const data: OfflineData = JSON.parse(cached);
      
      // Check if data is still valid
      if (Date.now() - data.cachedAt > this.cacheConfig.maxAge) {
        localStorage.removeItem('macrobius-offline-data');
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Failed to get offline data:', error);
      return null;
    }
  }

  async syncUserProgress(progressData: any): Promise<void> {
    // This would sync with the backend when online
    console.log('Syncing user progress:', progressData);
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
          badge: '/icon-192.png',
          icon: '/icon-192.png',
          ...options
        });
      } else {
        new Notification(title, options);
      }
    }
  }

  // Background sync
  async scheduleBackgroundSync(tag: string): Promise<void> {
    if (this.swRegistration && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        // Type assertion for Background Sync API
        const syncRegistration = this.swRegistration as ServiceWorkerRegistrationWithSync;
        await syncRegistration.sync.register(tag);
      } catch (error) {
        console.error('Background sync registration failed:', error);
      }
    }
  }
}

// Export singleton instance
export const pwaManager = new PWAManager();

// Service Worker code (to be saved as public/sw.js)
export const serviceWorkerCode = `
const CACHE_NAME = 'macrobius-cache-v1.0.0';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/offline.html',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request).catch(() => {
          // If network fails, show offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'user-progress-sync') {
    event.waitUntil(syncUserProgress());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/icon-192.png',
    badge: '/icon-192.png'
  };
  
  event.waitUntil(
    self.registration.showNotification('Macrobius', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Message handling
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

async function syncUserProgress() {
  // Sync user progress with backend
  try {
    const response = await fetch('/api/sync-progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Get stored progress data
      })
    });
    
    if (response.ok) {
      console.log('User progress synced successfully');
    }
  } catch (error) {
    console.error('Failed to sync user progress:', error);
  }
}
`;
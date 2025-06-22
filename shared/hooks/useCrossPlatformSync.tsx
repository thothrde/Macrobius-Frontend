/**
 * 🔄 CROSS-PLATFORM SYNC REACT HOOK
 * Easy-to-use React hook for cross-platform data synchronization
 * 
 * ✨ HOOK FEATURES:
 * - 🚀 Automatic sync on app start and focus
 * - 📊 Real-time sync status monitoring
 * - 🔄 Manual sync triggers
 * - 💾 Offline queue management
 * - 🎯 Conflict resolution handling
 * - 📱 Platform-specific optimizations
 * - ⚡ Performance metrics tracking
 * - 🔒 Error handling and recovery
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import CrossPlatformSyncManager, { SyncResult, SyncUtils } from '../services/CrossPlatformSync';

interface SyncStatus {
  isLoading: boolean;
  lastSync: string | null;
  pendingChanges: boolean;
  conflictsDetected: number;
  networkStatus: 'online' | 'offline';
  syncInProgress: boolean;
  error: string | null;
  performanceMetrics: {
    totalSyncTime: number;
    itemsSynchronized: number;
    dataTransferredKB: number;
    averageSyncDuration: number;
  };
}

interface SyncConfig {
  autoSyncEnabled: boolean;
  syncInterval: number; // minutes
  syncOnAppFocus: boolean;
  syncOnNetworkReconnect: boolean;
  offlineQueueEnabled: boolean;
  conflictNotifications: boolean;
}

interface UseCrossPlatformSyncReturn {
  syncStatus: SyncStatus;
  syncConfig: SyncConfig;
  syncNow: () => Promise<SyncResult[]>;
  updateSyncConfig: (newConfig: Partial<SyncConfig>) => void;
  clearSyncCache: () => Promise<void>;
  resolvePendingConflicts: () => Promise<void>;
  getSyncHistory: () => SyncResult[];
  exportSyncData: () => Promise<string>;
}

// 🔄 CROSS-PLATFORM SYNC HOOK
export function useCrossPlatformSync(): UseCrossPlatformSyncReturn {
  // 📊 SYNC STATUS STATE
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isLoading: true,
    lastSync: null,
    pendingChanges: false,
    conflictsDetected: 0,
    networkStatus: 'online',
    syncInProgress: false,
    error: null,
    performanceMetrics: {
      totalSyncTime: 0,
      itemsSynchronized: 0,
      dataTransferredKB: 0,
      averageSyncDuration: 0
    }
  });

  // ⚙️ SYNC CONFIGURATION STATE
  const [syncConfig, setSyncConfig] = useState<SyncConfig>({
    autoSyncEnabled: true,
    syncInterval: 30, // 30 minutes
    syncOnAppFocus: true,
    syncOnNetworkReconnect: true,
    offlineQueueEnabled: true,
    conflictNotifications: true
  });

  // 📈 SYNC HISTORY STATE
  const [syncHistory, setSyncHistory] = useState<SyncResult[]>([]);

  // 🔧 REFS
  const syncManagerRef = useRef<CrossPlatformSyncManager>();
  const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const appStateRef = useRef<AppStateStatus>('active');

  // 🚀 INITIALIZE SYNC MANAGER
  useEffect(() => {
    const initializeSyncManager = async () => {
      try {
        setSyncStatus(prev => ({ ...prev, isLoading: true, error: null }));
        
        syncManagerRef.current = CrossPlatformSyncManager.getInstance();
        
        // Load initial sync status
        const initialStatus = await SyncUtils.checkSyncStatus();
        setSyncStatus(prev => ({
          ...prev,
          lastSync: initialStatus.lastSync,
          pendingChanges: initialStatus.pendingChanges,
          conflictsDetected: initialStatus.conflictsDetected,
          networkStatus: initialStatus.networkStatus,
          isLoading: false
        }));
        
        // Perform initial sync if auto-sync is enabled
        if (syncConfig.autoSyncEnabled) {
          await performSync();
        }
        
      } catch (error) {
        setSyncStatus(prev => ({
          ...prev,
          isLoading: false,
          error: `Sync initialization failed: ${error}`
        }));
      }
    };
    
    initializeSyncManager();
  }, []);

  // 📱 APP STATE MONITORING
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      const previousAppState = appStateRef.current;
      appStateRef.current = nextAppState;
      
      // Sync when app comes to foreground
      if (
        previousAppState.match(/inactive|background/) &&
        nextAppState === 'active' &&
        syncConfig.syncOnAppFocus &&
        syncConfig.autoSyncEnabled
      ) {
        performSync();
      }
    };
    
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      subscription?.remove();
    };
  }, [syncConfig.syncOnAppFocus, syncConfig.autoSyncEnabled]);

  // ⏰ PERIODIC SYNC SETUP
  useEffect(() => {
    if (syncConfig.autoSyncEnabled && syncConfig.syncInterval > 0) {
      syncIntervalRef.current = setInterval(() => {
        performSync();
      }, syncConfig.syncInterval * 60 * 1000); // Convert minutes to milliseconds
    }
    
    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
        syncIntervalRef.current = null;
      }
    };
  }, [syncConfig.autoSyncEnabled, syncConfig.syncInterval]);

  // 🔄 PERFORM SYNCHRONIZATION
  const performSync = useCallback(async (): Promise<SyncResult[]> => {
    if (!syncManagerRef.current) {
      throw new Error('Sync manager not initialized');
    }
    
    setSyncStatus(prev => ({ ...prev, syncInProgress: true, error: null }));
    const syncStartTime = Date.now();
    
    try {
      const results = await syncManagerRef.current.performFullSync();
      
      // Calculate performance metrics
      const syncDuration = Date.now() - syncStartTime;
      const totalItems = results.reduce((sum, result) => sum + result.performance_metrics.items_synchronized, 0);
      const totalDataKB = results.reduce((sum, result) => sum + result.performance_metrics.data_transferred_kb, 0);
      
      // Update sync history
      setSyncHistory(prev => [...prev.slice(-19), ...results]); // Keep last 20 sync results
      
      // Update sync status
      setSyncStatus(prev => {
        const newMetrics = {
          totalSyncTime: prev.performanceMetrics.totalSyncTime + syncDuration,
          itemsSynchronized: prev.performanceMetrics.itemsSynchronized + totalItems,
          dataTransferredKB: prev.performanceMetrics.dataTransferredKB + totalDataKB,
          averageSyncDuration: (prev.performanceMetrics.totalSyncTime + syncDuration) / (syncHistory.length + results.length)
        };
        
        return {
          ...prev,
          syncInProgress: false,
          lastSync: new Date().toISOString(),
          pendingChanges: results.some(r => !r.success),
          conflictsDetected: results.reduce((sum, r) => sum + r.conflicts_resolved, 0),
          performanceMetrics: newMetrics,
          error: results.some(r => r.errors.length > 0) ? 
            results.flatMap(r => r.errors).join('; ') : null
        };
      });
      
      return results;
      
    } catch (error) {
      setSyncStatus(prev => ({
        ...prev,
        syncInProgress: false,
        error: `Sync failed: ${error}`
      }));
      throw error;
    }
  }, [syncHistory.length]);

  // 🎯 MANUAL SYNC TRIGGER
  const syncNow = useCallback(async (): Promise<SyncResult[]> => {
    return await performSync();
  }, [performSync]);

  // ⚙️ UPDATE SYNC CONFIGURATION
  const updateSyncConfig = useCallback((newConfig: Partial<SyncConfig>) => {
    setSyncConfig(prev => {
      const updated = { ...prev, ...newConfig };
      
      // Save config to storage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('sync_config', JSON.stringify(updated));
      }
      
      return updated;
    });
  }, []);

  // 🧹 CLEAR SYNC CACHE
  const clearSyncCache = useCallback(async (): Promise<void> => {
    try {
      setSyncHistory([]);
      setSyncStatus(prev => ({
        ...prev,
        lastSync: null,
        pendingChanges: false,
        conflictsDetected: 0,
        performanceMetrics: {
          totalSyncTime: 0,
          itemsSynchronized: 0,
          dataTransferredKB: 0,
          averageSyncDuration: 0
        }
      }));
      
      // Clear storage
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('sync_history');
        localStorage.removeItem('sync_status');
      }
      
    } catch (error) {
      setSyncStatus(prev => ({
        ...prev,
        error: `Failed to clear sync cache: ${error}`
      }));
    }
  }, []);

  // 🔧 RESOLVE PENDING CONFLICTS
  const resolvePendingConflicts = useCallback(async (): Promise<void> => {
    try {
      setSyncStatus(prev => ({ ...prev, syncInProgress: true }));
      
      // Force a full sync to resolve conflicts
      await performSync();
      
      setSyncStatus(prev => ({
        ...prev,
        conflictsDetected: 0,
        syncInProgress: false
      }));
      
    } catch (error) {
      setSyncStatus(prev => ({
        ...prev,
        syncInProgress: false,
        error: `Failed to resolve conflicts: ${error}`
      }));
    }
  }, [performSync]);

  // 📊 GET SYNC HISTORY
  const getSyncHistory = useCallback((): SyncResult[] => {
    return syncHistory;
  }, [syncHistory]);

  // 📤 EXPORT SYNC DATA
  const exportSyncData = useCallback(async (): Promise<string> => {
    try {
      const exportData = {
        syncStatus,
        syncConfig,
        syncHistory,
        exportedAt: new Date().toISOString(),
        platform: 'mobile' // Could be detected dynamically
      };
      
      return JSON.stringify(exportData, null, 2);
      
    } catch (error) {
      throw new Error(`Failed to export sync data: ${error}`);
    }
  }, [syncStatus, syncConfig, syncHistory]);

  // 🔄 NETWORK STATUS MONITORING
  useEffect(() => {
    const updateNetworkStatus = () => {
      const isOnline = navigator.onLine;
      setSyncStatus(prev => {
        const newStatus = isOnline ? 'online' : 'offline';
        
        // Trigger sync when coming back online
        if (prev.networkStatus === 'offline' && newStatus === 'online' && 
            syncConfig.syncOnNetworkReconnect && syncConfig.autoSyncEnabled) {
          setTimeout(() => performSync(), 1000); // Small delay to ensure connectivity
        }
        
        return { ...prev, networkStatus: newStatus };
      });
    };
    
    // Web platform network monitoring
    if (typeof window !== 'undefined') {
      window.addEventListener('online', updateNetworkStatus);
      window.addEventListener('offline', updateNetworkStatus);
      
      return () => {
        window.removeEventListener('online', updateNetworkStatus);
        window.removeEventListener('offline', updateNetworkStatus);
      };
    }
  }, [syncConfig.syncOnNetworkReconnect, syncConfig.autoSyncEnabled, performSync]);

  // 💾 PERSIST SYNC DATA
  useEffect(() => {
    // Save sync history to storage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('sync_history', JSON.stringify(syncHistory));
      localStorage.setItem('sync_status', JSON.stringify(syncStatus));
    }
  }, [syncHistory, syncStatus]);

  // 🔄 LOAD PERSISTED DATA
  useEffect(() => {
    const loadPersistedData = () => {
      try {
        if (typeof localStorage !== 'undefined') {
          const persistedHistory = localStorage.getItem('sync_history');
          const persistedStatus = localStorage.getItem('sync_status');
          const persistedConfig = localStorage.getItem('sync_config');
          
          if (persistedHistory) {
            setSyncHistory(JSON.parse(persistedHistory));
          }
          
          if (persistedConfig) {
            setSyncConfig(JSON.parse(persistedConfig));
          }
        }
      } catch (error) {
        console.error('Failed to load persisted sync data:', error);
      }
    };
    
    loadPersistedData();
  }, []);

  return {
    syncStatus,
    syncConfig,
    syncNow,
    updateSyncConfig,
    clearSyncCache,
    resolvePendingConflicts,
    getSyncHistory,
    exportSyncData
  };
}

// 🔧 SYNC STATUS UTILITIES
export const SyncStatusUtils = {
  isSyncHealthy: (status: SyncStatus): boolean => {
    return (
      !status.error &&
      status.networkStatus === 'online' &&
      !status.syncInProgress &&
      status.conflictsDetected === 0
    );
  },
  
  getSyncStatusColor: (status: SyncStatus): string => {
    if (status.error) return '#EF4444'; // Red
    if (status.syncInProgress) return '#F59E0B'; // Amber
    if (status.conflictsDetected > 0) return '#F97316'; // Orange
    if (status.networkStatus === 'offline') return '#6B7280'; // Gray
    return '#22C55E'; // Green
  },
  
  getSyncStatusMessage: (status: SyncStatus): string => {
    if (status.error) return `Sync Error: ${status.error}`;
    if (status.syncInProgress) return 'Synchronizing...';
    if (status.conflictsDetected > 0) return `${status.conflictsDetected} conflicts detected`;
    if (status.networkStatus === 'offline') return 'Offline - sync paused';
    if (status.lastSync) {
      const lastSyncDate = new Date(status.lastSync);
      const timeDiff = Date.now() - lastSyncDate.getTime();
      const minutesAgo = Math.floor(timeDiff / 60000);
      return `Last sync: ${minutesAgo < 1 ? 'Just now' : `${minutesAgo}m ago`}`;
    }
    return 'Ready to sync';
  }
};

export default useCrossPlatformSync;
/**
 * Advanced Cache Management System
 * Provides sophisticated caching strategies for optimal performance
 */

import React from 'react';

interface CacheItem<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  accessCount: number;
  lastAccessed: number;
  size: number;
  tags: string[];
}

interface CacheConfig {
  defaultTTL: number;
  maxSize: number;
  maxItems: number;
  cleanupInterval: number;
  persistToDisk: boolean;
  compressionEnabled: boolean;
}

interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
  totalItems: number;
  totalSize: number;
  averageAccessTime: number;
  evictions: number;
}

type CacheStrategy = 'lru' | 'lfu' | 'fifo' | 'priority' | 'smart';

class AdvancedCacheManager {
  private cache: Map<string, CacheItem>;
  private config: CacheConfig;
  private stats: CacheStats;
  private cleanupTimer: NodeJS.Timeout | null = null;
  private strategy: CacheStrategy = 'smart';
  private observers: ((event: string, key: string, data?: any) => void)[] = [];

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      defaultTTL: 5 * 60 * 1000, // 5 minutes
      maxSize: 50 * 1024 * 1024, // 50MB
      maxItems: 1000,
      cleanupInterval: 60 * 1000, // 1 minute
      persistToDisk: true,
      compressionEnabled: true,
      ...config
    };

    this.cache = new Map();
    this.stats = {
      hits: 0,
      misses: 0,
      hitRate: 0,
      totalItems: 0,
      totalSize: 0,
      averageAccessTime: 0,
      evictions: 0
    };

    this.initializeCache();
  }

  private initializeCache(): void {
    // Load from disk if persistence is enabled
    if (this.config.persistToDisk && typeof window !== 'undefined') {
      this.loadFromDisk();
    }

    // Start cleanup timer
    this.startCleanupTimer();

    // Handle page unload for persistence
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        if (this.config.persistToDisk) {
          this.saveToDisk();
        }
      });
    }
  }

  private startCleanupTimer(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  private calculateSize(data: any): number {
    try {
      return new Blob([JSON.stringify(data)]).size;
    } catch {
      // Fallback estimation
      return JSON.stringify(data).length * 2;
    }
  }

  private compress(data: any): any {
    if (!this.config.compressionEnabled) return data;
    
    try {
      // Simple compression using JSON stringify with replacer
      const compressed = JSON.stringify(data, (key, value) => {
        if (typeof value === 'string' && value.length > 100) {
          // Implement simple compression for long strings
          return this.simpleCompress(value);
        }
        return value;
      });
      return { __compressed: true, data: compressed };
    } catch {
      return data;
    }
  }

  private decompress(data: any): any {
    if (!data || !data.__compressed) return data;
    
    try {
      return JSON.parse(data.data, (key, value) => {
        if (typeof value === 'string' && value.startsWith('__compressed__')) {
          return this.simpleDecompress(value);
        }
        return value;
      });
    } catch {
      return data;
    }
  }

  private simpleCompress(str: string): string {
    // Simple run-length encoding for demonstration
    return '__compressed__' + str.replace(/(.)

+/g, (match, char) => {
      return match.length > 3 ? `${char}${match.length}` : match;
    });
  }

  private simpleDecompress(str: string): string {
    return str.replace(/^__compressed__/, '').replace(/(.)
d+/g, (match, char) => {
      const count = parseInt(match.slice(1));
      return char.repeat(count);
    });
  }

  public set<T>(
    key: string, 
    data: T, 
    options: {
      ttl?: number;
      priority?: 'low' | 'medium' | 'high' | 'critical';
      tags?: string[];
    } = {}
  ): boolean {
    const startTime = performance.now();
    
    try {
      const ttl = options.ttl || this.config.defaultTTL;
      const priority = options.priority || 'medium';
      const tags = options.tags || [];
      const compressedData = this.compress(data);
      const size = this.calculateSize(compressedData);

      // Check if we need to evict items
      this.makeSpace(size);

      const item: CacheItem<T> = {
        data: compressedData,
        timestamp: Date.now(),
        ttl,
        priority,
        accessCount: 0,
        lastAccessed: Date.now(),
        size,
        tags
      };

      const existingItem = this.cache.get(key);
      if (existingItem) {
        this.stats.totalSize -= existingItem.size;
      } else {
        this.stats.totalItems++;
      }

      this.cache.set(key, item);
      this.stats.totalSize += size;
      
      this.notifyObservers('set', key, { size, priority, tags });
      this.updateAverageAccessTime(performance.now() - startTime);
      
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  public get<T>(key: string): T | null {
    const startTime = performance.now();
    const item = this.cache.get(key);

    if (!item) {
      this.stats.misses++;
      this.updateHitRate();
      this.updateAverageAccessTime(performance.now() - startTime);
      return null;
    }

    // Check TTL
    if (Date.now() - item.timestamp > item.ttl) {
      this.delete(key);
      this.stats.misses++;
      this.updateHitRate();
      this.updateAverageAccessTime(performance.now() - startTime);
      return null;
    }

    // Update access statistics
    item.accessCount++;
    item.lastAccessed = Date.now();
    
    this.stats.hits++;
    this.updateHitRate();
    this.updateAverageAccessTime(performance.now() - startTime);
    
    this.notifyObservers('get', key, { accessCount: item.accessCount });
    
    return this.decompress(item.data) as T;
  }

  public delete(key: string): boolean {
    const item = this.cache.get(key);
    if (item) {
      this.stats.totalSize -= item.size;
      this.stats.totalItems--;
      this.cache.delete(key);
      this.notifyObservers('delete', key);
      return true;
    }
    return false;
  }

  public has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    
    // Check TTL
    if (Date.now() - item.timestamp > item.ttl) {
      this.delete(key);
      return false;
    }
    
    return true;
  }

  public clear(): void {
    this.cache.clear();
    this.stats = {
      hits: 0,
      misses: 0,
      hitRate: 0,
      totalItems: 0,
      totalSize: 0,
      averageAccessTime: 0,
      evictions: 0
    };
    this.notifyObservers('clear', '');
  }

  public invalidateByTag(tag: string): number {
    let count = 0;
    const entries = Array.from(this.cache.entries());
    for (let i = 0; i < entries.length; i++) {
      const [key, item] = entries[i];
      if (item.tags.includes(tag)) {
        this.delete(key);
        count++;
      }
    }
    this.notifyObservers('invalidate', tag, { count });
    return count;
  }

  public invalidateByPattern(pattern: RegExp): number {
    let count = 0;
    const keys = Array.from(this.cache.keys());
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (pattern.test(key)) {
        this.delete(key);
        count++;
      }
    }
    return count;
  }

  public getStats(): CacheStats {
    return { ...this.stats };
  }

  public getItemInfo(key: string): Partial<CacheItem> | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    return {
      timestamp: item.timestamp,
      ttl: item.ttl,
      priority: item.priority,
      accessCount: item.accessCount,
      lastAccessed: item.lastAccessed,
      size: item.size,
      tags: [...item.tags]
    };
  }

  public getAllKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  public getKeysByTag(tag: string): string[] {
    const keys: string[] = [];
    const entries = Array.from(this.cache.entries());
    for (let i = 0; i < entries.length; i++) {
      const [key, item] = entries[i];
      if (item.tags.includes(tag)) {
        keys.push(key);
      }
    }
    return keys;
  }

  private makeSpace(requiredSize: number): void {
    // Check if we need to evict items
    while (
      (this.stats.totalSize + requiredSize > this.config.maxSize) ||
      (this.stats.totalItems >= this.config.maxItems)
    ) {
      const keyToEvict = this.selectEvictionKey();
      if (!keyToEvict) break;
      
      this.delete(keyToEvict);
      this.stats.evictions++;
    }
  }

  private selectEvictionKey(): string | null {
    if (this.cache.size === 0) return null;

    const entries = Array.from(this.cache.entries());
    
    switch (this.strategy) {
      case 'lru':
        return this.selectLRU(entries);
      case 'lfu':
        return this.selectLFU(entries);
      case 'fifo':
        return this.selectFIFO(entries);
      case 'priority':
        return this.selectByPriority(entries);
      case 'smart':
      default:
        return this.selectSmart(entries);
    }
  }

  private selectLRU(entries: [string, CacheItem][]): string {
    return entries.reduce((oldest, [key, item]) => {
      const [oldestKey, oldestItem] = oldest;
      return item.lastAccessed < oldestItem.lastAccessed ? [key, item] : oldest;
    })[0];
  }

  private selectLFU(entries: [string, CacheItem][]): string {
    return entries.reduce((least, [key, item]) => {
      const [leastKey, leastItem] = least;
      return item.accessCount < leastItem.accessCount ? [key, item] : least;
    })[0];
  }

  private selectFIFO(entries: [string, CacheItem][]): string {
    return entries.reduce((oldest, [key, item]) => {
      const [oldestKey, oldestItem] = oldest;
      return item.timestamp < oldestItem.timestamp ? [key, item] : oldest;
    })[0];
  }

  private selectByPriority(entries: [string, CacheItem][]): string {
    const priorityOrder = { low: 0, medium: 1, high: 2, critical: 3 };
    return entries.reduce((lowest, [key, item]) => {
      const [lowestKey, lowestItem] = lowest;
      return priorityOrder[item.priority] < priorityOrder[lowestItem.priority] 
        ? [key, item] : lowest;
    })[0];
  }

  private selectSmart(entries: [string, CacheItem][]): string {
    // Smart eviction considers multiple factors
    const now = Date.now();
    const priorityWeights = { low: 0.1, medium: 0.3, high: 0.6, critical: 1.0 };
    
    return entries.reduce((candidate, [key, item]) => {
      const [candidateKey, candidateItem] = candidate;
      
      // Calculate score (lower is more likely to be evicted)
      const itemScore = this.calculateEvictionScore(item, now, priorityWeights);
      const candidateScore = this.calculateEvictionScore(candidateItem, now, priorityWeights);
      
      return itemScore < candidateScore ? [key, item] : candidate;
    })[0];
  }

  private calculateEvictionScore(
    item: CacheItem, 
    now: number, 
    priorityWeights: Record<string, number>
  ): number {
    const age = now - item.timestamp;
    const timeSinceAccess = now - item.lastAccessed;
    const priority = priorityWeights[item.priority];
    
    // Combine factors: older, less accessed, lower priority = lower score
    return (priority * 1000) + (item.accessCount * 100) - (age * 0.01) - (timeSinceAccess * 0.005);
  }

  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    const entries = Array.from(this.cache.entries());
    for (let i = 0; i < entries.length; i++) {
      const [key, item] = entries[i];
      if (now - item.timestamp > item.ttl) {
        keysToDelete.push(key);
      }
    }
    
    keysToDelete.forEach(key => this.delete(key));
    
    if (keysToDelete.length > 0) {
      this.notifyObservers('cleanup', '', { expired: keysToDelete.length });
    }
  }

  private updateHitRate(): void {
    const total = this.stats.hits + this.stats.misses;
    this.stats.hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0;
  }

  private updateAverageAccessTime(accessTime: number): void {
    const total = this.stats.hits + this.stats.misses;
    this.stats.averageAccessTime = 
      (this.stats.averageAccessTime * (total - 1) + accessTime) / total;
  }

  private saveToDisk(): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    
    try {
      const cacheData = {
        cache: Array.from(this.cache.entries()),
        stats: this.stats,
        timestamp: Date.now()
      };
      
      localStorage.setItem('macrobius-cache', JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to save cache to disk:', error);
    }
  }

  private loadFromDisk(): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    
    try {
      const saved = localStorage.getItem('macrobius-cache');
      if (!saved) return;
      
      const cacheData = JSON.parse(saved);
      const now = Date.now();
      
      // Only load if saved recently (within 1 hour)
      if (now - cacheData.timestamp < 60 * 60 * 1000) {
        this.cache = new Map(cacheData.cache);
        this.stats = cacheData.stats;
        
        // Clean up expired items
        this.cleanup();
      }
    } catch (error) {
      console.warn('Failed to load cache from disk:', error);
    }
  }

  public setStrategy(strategy: CacheStrategy): void {
    this.strategy = strategy;
    this.notifyObservers('strategy-change', '', { strategy });
  }

  public onCacheEvent(callback: (event: string, key: string, data?: any) => void): () => void {
    this.observers.push(callback);
    return () => {
      const index = this.observers.indexOf(callback);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }

  private notifyObservers(event: string, key: string, data?: any): void {
    this.observers.forEach(callback => {
      try {
        callback(event, key, data);
      } catch (error) {
        console.error('Cache observer error:', error);
      }
    });
  }

  public export(): string {
    return JSON.stringify({
      cache: Array.from(this.cache.entries()),
      stats: this.stats,
      config: this.config,
      strategy: this.strategy,
      timestamp: Date.now()
    }, null, 2);
  }

  public import(data: string): boolean {
    try {
      const imported = JSON.parse(data);
      this.cache = new Map(imported.cache);
      this.stats = imported.stats;
      this.strategy = imported.strategy || 'smart';
      this.cleanup();
      this.notifyObservers('import', '', { items: this.cache.size });
      return true;
    } catch (error) {
      console.error('Cache import error:', error);
      return false;
    }
  }

  public destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
    
    if (this.config.persistToDisk) {
      this.saveToDisk();
    }
    
    this.clear();
    this.observers = [];
  }
}

// Singleton instances for different cache types
export const apiCache = new AdvancedCacheManager({
  defaultTTL: 10 * 60 * 1000, // 10 minutes
  maxSize: 20 * 1024 * 1024, // 20MB
  maxItems: 500
});

export const resourceCache = new AdvancedCacheManager({
  defaultTTL: 60 * 60 * 1000, // 1 hour
  maxSize: 100 * 1024 * 1024, // 100MB
  maxItems: 2000
});

export const userDataCache = new AdvancedCacheManager({
  defaultTTL: 24 * 60 * 60 * 1000, // 24 hours
  maxSize: 10 * 1024 * 1024, // 10MB
  maxItems: 100,
  persistToDisk: true
});

// React Hook for cache management
export function useAdvancedCache(cacheInstance: AdvancedCacheManager = apiCache) {
  const [stats, setStats] = React.useState(cacheInstance.getStats());
  
  React.useEffect(() => {
    const unsubscribe = cacheInstance.onCacheEvent(() => {
      setStats(cacheInstance.getStats());
    });
    
    return unsubscribe;
  }, [cacheInstance]);
  
  return {
    stats,
    set: cacheInstance.set.bind(cacheInstance),
    get: cacheInstance.get.bind(cacheInstance),
    delete: cacheInstance.delete.bind(cacheInstance),
    has: cacheInstance.has.bind(cacheInstance),
    clear: cacheInstance.clear.bind(cacheInstance),
    invalidateByTag: cacheInstance.invalidateByTag.bind(cacheInstance),
    invalidateByPattern: cacheInstance.invalidateByPattern.bind(cacheInstance),
    export: cacheInstance.export.bind(cacheInstance),
    import: cacheInstance.import.bind(cacheInstance)
  };
}

export default AdvancedCacheManager;
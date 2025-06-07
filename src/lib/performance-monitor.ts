/**
 * Advanced Performance Monitoring System
 * Provides comprehensive performance tracking, optimization, and analytics
 */

import React from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  bundleSize: number;
  cacheHitRate: number;
  memoryUsage: number;
  networkLatency: number;
  userInteractionLatency: number;
  coreWebVitals: {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
    fcp: number; // First Contentful Paint
    ttfb: number; // Time to First Byte
  };
  frameRate: number;
  domNodes: number;
  bundleLoadTime: number;
}

interface OptimizationSuggestion {
  type: 'critical' | 'warning' | 'info';
  category: 'bundle' | 'cache' | 'render' | 'network' | 'memory' | 'performance';
  message: string;
  action: string;
  impact: 'high' | 'medium' | 'low';
  priority: number;
}

interface PerformanceReport {
  timestamp: string;
  userAgent: string;
  metrics: PerformanceMetrics;
  suggestions: OptimizationSuggestion[];
  deviceInfo: {
    type: string;
    memory: number;
    cores: number;
    connection: string;
  };
  score: {
    overall: number;
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics;
  private observers: PerformanceObserver[];
  private isMonitoring: boolean = false;
  private callbacks: ((metrics: PerformanceMetrics) => void)[] = [];
  private frameRateCallback: number | null = null;
  private startTime: number = performance.now();
  private interactionTimes: number[] = [];

  constructor() {
    this.metrics = {
      loadTime: 0,
      renderTime: 0,
      bundleSize: 0,
      cacheHitRate: 0,
      memoryUsage: 0,
      networkLatency: 0,
      userInteractionLatency: 0,
      coreWebVitals: {
        lcp: 0,
        fid: 0,
        cls: 0,
        fcp: 0,
        ttfb: 0
      },
      frameRate: 0,
      domNodes: 0,
      bundleLoadTime: 0
    };
    this.observers = [];
    this.initializeMonitoring();
  }

  private initializeMonitoring(): void {
    if (this.isMonitoring || typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    this.observeCoreWebVitals();
    
    // Monitor Resource Loading
    this.observeResourceTiming();
    
    // Monitor User Interactions
    this.observeUserTiming();
    
    // Monitor Memory Usage
    this.observeMemoryUsage();
    
    // Monitor Frame Rate
    this.observeFrameRate();
    
    // Monitor DOM complexity
    this.observeDOMComplexity();
    
    // Monitor Network Quality
    this.observeNetworkQuality();

    this.isMonitoring = true;
    console.log('📊 Performance monitoring initialized');
  }

  private observeCoreWebVitals(): void {
    if (!('PerformanceObserver' in window)) {
      console.warn('⚠️ PerformanceObserver not supported');
      return;
    }

    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.coreWebVitals.lcp = lastEntry.startTime;
        this.notifyCallbacks();
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    } catch (e) {
      console.warn('⚠️ LCP observation not supported');
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.metrics.coreWebVitals.fid = entry.processingStart - entry.startTime;
          this.notifyCallbacks();
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    } catch (e) {
      console.warn('⚠️ FID observation not supported');
    }

    // Cumulative Layout Shift (CLS)
    try {
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.coreWebVitals.cls = clsValue;
        this.notifyCallbacks();
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (e) {
      console.warn('⚠️ CLS observation not supported');
    }

    // First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.coreWebVitals.fcp = entry.startTime;
            this.notifyCallbacks();
          }
        });
      });
      
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(fcpObserver);
    } catch (e) {
      console.warn('⚠️ FCP observation not supported');
    }
  }

  private observeResourceTiming(): void {
    if (!('PerformanceObserver' in window)) return;

    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      let totalSize = 0;
      let totalDuration = 0;
      let cacheHits = 0;
      let bundleLoadTime = 0;

      entries.forEach((entry: any) => {
        totalSize += entry.transferSize || 0;
        totalDuration += entry.duration;
        
        // Check if resource was served from cache
        if (entry.transferSize === 0 && entry.decodedBodySize > 0) {
          cacheHits++;
        }
        
        // Track bundle load times
        if (entry.name.includes('_next/static') || entry.name.includes('bundle')) {
          bundleLoadTime = Math.max(bundleLoadTime, entry.duration);
        }
        
        // Calculate TTFB for main document
        if (entry.entryType === 'navigation') {
          this.metrics.coreWebVitals.ttfb = entry.responseStart - entry.requestStart;
        }
      });

      this.metrics.bundleSize = totalSize;
      this.metrics.networkLatency = entries.length > 0 ? totalDuration / entries.length : 0;
      this.metrics.cacheHitRate = entries.length > 0 ? (cacheHits / entries.length) * 100 : 0;
      this.metrics.bundleLoadTime = bundleLoadTime;
      this.notifyCallbacks();
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource', 'navigation'] });
      this.observers.push(resourceObserver);
    } catch (e) {
      console.warn('⚠️ Resource timing observation not supported');
    }
  }

  private observeUserTiming(): void {
    if (!('PerformanceObserver' in window)) return;

    const userTimingObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (entry.name.includes('interaction')) {
          this.interactionTimes.push(entry.duration);
          this.metrics.userInteractionLatency = this.calculateAverageInteractionTime();
        } else if (entry.name.includes('render')) {
          this.metrics.renderTime = entry.duration;
        }
      });
      this.notifyCallbacks();
    });

    try {
      userTimingObserver.observe({ entryTypes: ['measure'] });
      this.observers.push(userTimingObserver);
    } catch (e) {
      console.warn('⚠️ User timing observation not supported');
    }
  }

  private calculateAverageInteractionTime(): number {
    if (this.interactionTimes.length === 0) return 0;
    
    // Keep only recent interactions (last 10)
    if (this.interactionTimes.length > 10) {
      this.interactionTimes = this.interactionTimes.slice(-10);
    }
    
    const sum = this.interactionTimes.reduce((a, b) => a + b, 0);
    return sum / this.interactionTimes.length;
  }

  private observeMemoryUsage(): void {
    if (typeof window === 'undefined' || !('performance' in window) || !('memory' in (window as any).performance)) {
      return;
    }

    const updateMemoryMetrics = () => {
      const memory = (window as any).performance.memory;
      this.metrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
      this.notifyCallbacks();
    };

    // Update memory metrics every 5 seconds
    setInterval(updateMemoryMetrics, 5000);
    updateMemoryMetrics();
  }

  private observeFrameRate(): void {
    let frames = 0;
    let lastTime = performance.now();
    
    const measureFrameRate = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        this.metrics.frameRate = Math.round((frames * 1000) / (currentTime - lastTime));
        frames = 0;
        lastTime = currentTime;
        this.notifyCallbacks();
      }
      
      this.frameRateCallback = requestAnimationFrame(measureFrameRate);
    };
    
    this.frameRateCallback = requestAnimationFrame(measureFrameRate);
  }

  private observeDOMComplexity(): void {
    const updateDOMMetrics = () => {
      this.metrics.domNodes = document.querySelectorAll('*').length;
      this.notifyCallbacks();
    };

    // Update DOM metrics every 10 seconds
    setInterval(updateDOMMetrics, 10000);
    updateDOMMetrics();
    
    // Also update on major DOM changes
    if ('MutationObserver' in window) {
      const domObserver = new MutationObserver(() => {
        // Throttle updates
        setTimeout(updateDOMMetrics, 1000);
      });
      
      domObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  private observeNetworkQuality(): void {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const updateNetworkMetrics = () => {
        // Estimate network quality based on connection type
        const effectiveType = connection.effectiveType;
        let estimatedLatency = 0;
        
        switch (effectiveType) {
          case 'slow-2g': estimatedLatency = 2000; break;
          case '2g': estimatedLatency = 1400; break;
          case '3g': estimatedLatency = 400; break;
          case '4g': estimatedLatency = 100; break;
          default: estimatedLatency = 50;
        }
        
        this.metrics.networkLatency = estimatedLatency;
        this.notifyCallbacks();
      };
      
      connection.addEventListener('change', updateNetworkMetrics);
      updateNetworkMetrics();
    }
  }

  public measurePageLoad(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      const loadTime = performance.now() - this.startTime;
      this.metrics.loadTime = loadTime;
      this.notifyCallbacks();
    });
  }

  public measureInteraction(name: string, fn: () => void | Promise<void>): void {
    const startTime = performance.now();
    
    const measure = () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      performance.measure(`interaction-${name}`, { start: startTime, end: endTime });
      this.interactionTimes.push(duration);
      this.metrics.userInteractionLatency = this.calculateAverageInteractionTime();
      this.notifyCallbacks();
    };

    try {
      const result = fn();
      if (result instanceof Promise) {
        result.finally(measure);
      } else {
        measure();
      }
    } catch (error) {
      measure();
      throw error;
    }
  }

  public measureRender(componentName: string, fn: () => void): void {
    const startTime = performance.now();
    
    try {
      fn();
    } finally {
      const endTime = performance.now();
      const duration = endTime - startTime;
      performance.measure(`render-${componentName}`, { start: startTime, end: endTime });
      this.metrics.renderTime = duration;
      this.notifyCallbacks();
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public getOptimizationSuggestions(): OptimizationSuggestion[] {
    const suggestions: OptimizationSuggestion[] = [];

    // Bundle size suggestions
    if (this.metrics.bundleSize > 2 * 1024 * 1024) { // > 2MB
      suggestions.push({
        type: 'critical',
        category: 'bundle',
        message: 'Bundle size is very large (>2MB)',
        action: 'Implement code splitting, tree shaking, and dynamic imports',
        impact: 'high',
        priority: 1
      });
    } else if (this.metrics.bundleSize > 1024 * 1024) { // > 1MB
      suggestions.push({
        type: 'warning',
        category: 'bundle',
        message: 'Bundle size is large (>1MB)',
        action: 'Consider code splitting and lazy loading',
        impact: 'medium',
        priority: 3
      });
    }

    // Cache hit rate suggestions
    if (this.metrics.cacheHitRate < 70) {
      suggestions.push({
        type: 'warning',
        category: 'cache',
        message: 'Low cache hit rate detected',
        action: 'Improve caching strategy and add proper cache headers',
        impact: 'medium',
        priority: 4
      });
    }

    // Core Web Vitals suggestions
    if (this.metrics.coreWebVitals.lcp > 2500) {
      suggestions.push({
        type: 'critical',
        category: 'performance',
        message: 'Largest Contentful Paint is slow (>2.5s)',
        action: 'Optimize critical resources, images, and reduce render blocking',
        impact: 'high',
        priority: 1
      });
    }

    if (this.metrics.coreWebVitals.fid > 100) {
      suggestions.push({
        type: 'warning',
        category: 'performance',
        message: 'First Input Delay is high (>100ms)',
        action: 'Reduce JavaScript execution time and optimize event handlers',
        impact: 'medium',
        priority: 2
      });
    }

    if (this.metrics.coreWebVitals.cls > 0.1) {
      suggestions.push({
        type: 'warning',
        category: 'render',
        message: 'Cumulative Layout Shift detected (>0.1)',
        action: 'Set explicit dimensions for images and avoid dynamic content insertion',
        impact: 'medium',
        priority: 3
      });
    }

    if (this.metrics.coreWebVitals.fcp > 1800) {
      suggestions.push({
        type: 'warning',
        category: 'performance',
        message: 'First Contentful Paint is slow (>1.8s)',
        action: 'Optimize critical CSS and reduce render blocking resources',
        impact: 'medium',
        priority: 2
      });
    }

    // Memory usage suggestions
    if (this.metrics.memoryUsage > 150) { // > 150MB
      suggestions.push({
        type: 'critical',
        category: 'memory',
        message: 'High memory usage detected (>150MB)',
        action: 'Check for memory leaks and optimize data structures',
        impact: 'high',
        priority: 1
      });
    } else if (this.metrics.memoryUsage > 100) { // > 100MB
      suggestions.push({
        type: 'warning',
        category: 'memory',
        message: 'Moderate memory usage (>100MB)',
        action: 'Monitor memory usage and optimize heavy components',
        impact: 'medium',
        priority: 4
      });
    }

    // Frame rate suggestions
    if (this.metrics.frameRate < 30) {
      suggestions.push({
        type: 'critical',
        category: 'performance',
        message: 'Low frame rate detected (<30fps)',
        action: 'Optimize animations and reduce CPU-intensive operations',
        impact: 'high',
        priority: 2
      });
    } else if (this.metrics.frameRate < 50) {
      suggestions.push({
        type: 'warning',
        category: 'performance',
        message: 'Suboptimal frame rate (<50fps)',
        action: 'Consider optimizing animations and DOM manipulations',
        impact: 'medium',
        priority: 5
      });
    }

    // DOM complexity suggestions
    if (this.metrics.domNodes > 3000) {
      suggestions.push({
        type: 'warning',
        category: 'render',
        message: 'High DOM complexity (>3000 nodes)',
        action: 'Implement virtualization for large lists and optimize DOM structure',
        impact: 'medium',
        priority: 4
      });
    }

    // Network latency suggestions
    if (this.metrics.networkLatency > 1000) {
      suggestions.push({
        type: 'warning',
        category: 'network',
        message: 'High network latency detected',
        action: 'Optimize API calls, use CDN, and implement request batching',
        impact: 'medium',
        priority: 3
      });
    }

    // User interaction latency
    if (this.metrics.userInteractionLatency > 200) {
      suggestions.push({
        type: 'warning',
        category: 'performance',
        message: 'High user interaction latency (>200ms)',
        action: 'Optimize event handlers and reduce blocking operations',
        impact: 'medium',
        priority: 2
      });
    }

    // Sort by priority
    return suggestions.sort((a, b) => a.priority - b.priority);
  }

  public calculatePerformanceScore(): number {
    const metrics = this.metrics;
    let score = 100;

    // LCP scoring (25 points max)
    if (metrics.coreWebVitals.lcp > 4000) score -= 25;
    else if (metrics.coreWebVitals.lcp > 2500) score -= 15;
    else if (metrics.coreWebVitals.lcp > 1200) score -= 5;

    // FID scoring (25 points max)
    if (metrics.coreWebVitals.fid > 300) score -= 25;
    else if (metrics.coreWebVitals.fid > 100) score -= 15;
    else if (metrics.coreWebVitals.fid > 50) score -= 5;

    // CLS scoring (25 points max)
    if (metrics.coreWebVitals.cls > 0.25) score -= 25;
    else if (metrics.coreWebVitals.cls > 0.1) score -= 15;
    else if (metrics.coreWebVitals.cls > 0.05) score -= 5;

    // Bundle size scoring (15 points max)
    if (metrics.bundleSize > 3 * 1024 * 1024) score -= 15;
    else if (metrics.bundleSize > 1 * 1024 * 1024) score -= 10;
    else if (metrics.bundleSize > 500 * 1024) score -= 5;

    // Frame rate scoring (10 points max)
    if (metrics.frameRate < 20) score -= 10;
    else if (metrics.frameRate < 40) score -= 5;
    else if (metrics.frameRate < 55) score -= 2;

    return Math.max(0, Math.min(100, score));
  }

  public onMetricsUpdate(callback: (metrics: PerformanceMetrics) => void): () => void {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  private notifyCallbacks(): void {
    this.callbacks.forEach(callback => {
      try {
        callback(this.metrics);
      } catch (error) {
        console.error('❌ Performance monitor callback error:', error);
      }
    });
  }

  public generateReport(): PerformanceReport {
    const metrics = this.getMetrics();
    const suggestions = this.getOptimizationSuggestions();
    const score = this.calculatePerformanceScore();
    
    return {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      metrics,
      suggestions,
      deviceInfo: {
        type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
        memory: (navigator as any).deviceMemory || 4,
        cores: navigator.hardwareConcurrency || 4,
        connection: (navigator as any).connection?.effectiveType || 'unknown'
      },
      score: {
        overall: score,
        performance: score,
        accessibility: 95, // Placeholder - would need separate analysis
        bestPractices: 90, // Placeholder
        seo: 85 // Placeholder
      }
    };
  }

  public exportMetrics(): void {
    const report = this.generateReport();
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `macrobius-performance-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('📊 Performance report exported');
  }

  public destroy(): void {
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        console.warn('⚠️ Error disconnecting observer:', error);
      }
    });
    
    if (this.frameRateCallback) {
      cancelAnimationFrame(this.frameRateCallback);
    }
    
    this.observers = [];
    this.callbacks = [];
    this.isMonitoring = false;
    
    console.log('🧹 Performance monitor destroyed');
  }
}

// Singleton instance for global use
export const performanceMonitor = new PerformanceMonitor();

// React Hook for using performance monitoring
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = React.useState<PerformanceMetrics>(performanceMonitor.getMetrics());
  const [suggestions, setSuggestions] = React.useState<OptimizationSuggestion[]>([]);
  const [score, setScore] = React.useState<number>(0);

  React.useEffect(() => {
    const unsubscribe = performanceMonitor.onMetricsUpdate((newMetrics) => {
      setMetrics(newMetrics);
      setSuggestions(performanceMonitor.getOptimizationSuggestions());
      setScore(performanceMonitor.calculatePerformanceScore());
    });

    performanceMonitor.measurePageLoad();

    return unsubscribe;
  }, []);

  return {
    metrics,
    suggestions,
    score,
    measureInteraction: performanceMonitor.measureInteraction.bind(performanceMonitor),
    measureRender: performanceMonitor.measureRender.bind(performanceMonitor),
    exportMetrics: performanceMonitor.exportMetrics.bind(performanceMonitor),
    generateReport: performanceMonitor.generateReport.bind(performanceMonitor)
  };
}

// HOC for measuring component render performance
export function withPerformanceMonitoring<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) {
  return React.forwardRef<any, P>((props, ref) => {
    const renderStartTime = React.useRef<number>(0);

    React.useLayoutEffect(() => {
      renderStartTime.current = performance.now();
    });

    React.useEffect(() => {
      const renderTime = performance.now() - renderStartTime.current;
      performance.measure(`render-${componentName}`, { 
        start: renderStartTime.current, 
        end: performance.now() 
      });
    });

    return <WrappedComponent {...props} ref={ref} />;
  });
}

export type { PerformanceMetrics, OptimizationSuggestion, PerformanceReport };
export default performanceMonitor;
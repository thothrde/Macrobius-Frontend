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
  };
}

interface OptimizationSuggestion {
  type: 'critical' | 'warning' | 'info';
  category: 'bundle' | 'cache' | 'render' | 'network' | 'memory';
  message: string;
  action: string;
  impact: 'high' | 'medium' | 'low';
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics;
  private observers: PerformanceObserver[];
  private isMonitoring: boolean = false;
  private callbacks: ((metrics: PerformanceMetrics) => void)[] = [];

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
        cls: 0
      }
    };
    this.observers = [];
    this.initializeMonitoring();
  }

  private initializeMonitoring(): void {
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    this.observeCoreWebVitals();
    
    // Monitor Resource Loading
    this.observeResourceTiming();
    
    // Monitor User Interactions
    this.observeUserTiming();
    
    // Monitor Memory Usage
    this.observeMemoryUsage();

    this.isMonitoring = true;
  }

  private observeCoreWebVitals(): void {
    if (!('PerformanceObserver' in window)) return;

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      this.metrics.coreWebVitals.lcp = lastEntry.startTime;
      this.notifyCallbacks();
    });
    
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    } catch (e) {
      console.warn('LCP observation not supported');
    }

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        this.metrics.coreWebVitals.fid = entry.processingStart - entry.startTime;
        this.notifyCallbacks();
      });
    });
    
    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    } catch (e) {
      console.warn('FID observation not supported');
    }

    // Cumulative Layout Shift (CLS)
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
    
    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (e) {
      console.warn('CLS observation not supported');
    }
  }

  private observeResourceTiming(): void {
    if (!('PerformanceObserver' in window)) return;

    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      let totalSize = 0;
      let totalDuration = 0;
      let cacheHits = 0;

      entries.forEach((entry: any) => {
        totalSize += entry.transferSize || 0;
        totalDuration += entry.duration;
        
        // Check if resource was served from cache
        if (entry.transferSize === 0 && entry.decodedBodySize > 0) {
          cacheHits++;
        }
      });

      this.metrics.bundleSize = totalSize;
      this.metrics.networkLatency = totalDuration / entries.length;
      this.metrics.cacheHitRate = entries.length > 0 ? (cacheHits / entries.length) * 100 : 0;
      this.notifyCallbacks();
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);
    } catch (e) {
      console.warn('Resource timing observation not supported');
    }
  }

  private observeUserTiming(): void {
    if (!('PerformanceObserver' in window)) return;

    const userTimingObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (entry.name.includes('interaction')) {
          this.metrics.userInteractionLatency = entry.duration;
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
      console.warn('User timing observation not supported');
    }
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

  public measurePageLoad(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      const loadTime = performance.now();
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
      this.metrics.userInteractionLatency = duration;
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
    if (this.metrics.bundleSize > 1024 * 1024) { // > 1MB
      suggestions.push({
        type: 'critical',
        category: 'bundle',
        message: 'Bundle size is large',
        action: 'Consider code splitting and lazy loading',
        impact: 'high'
      });
    }

    // Cache hit rate suggestions
    if (this.metrics.cacheHitRate < 80) {
      suggestions.push({
        type: 'warning',
        category: 'cache',
        message: 'Low cache hit rate detected',
        action: 'Improve caching strategy',
        impact: 'medium'
      });
    }

    // Core Web Vitals suggestions
    if (this.metrics.coreWebVitals.lcp > 2500) {
      suggestions.push({
        type: 'critical',
        category: 'render',
        message: 'Largest Contentful Paint is slow',
        action: 'Optimize critical resources and images',
        impact: 'high'
      });
    }

    if (this.metrics.coreWebVitals.fid > 100) {
      suggestions.push({
        type: 'warning',
        category: 'render',
        message: 'First Input Delay is high',
        action: 'Reduce JavaScript execution time',
        impact: 'medium'
      });
    }

    if (this.metrics.coreWebVitals.cls > 0.1) {
      suggestions.push({
        type: 'warning',
        category: 'render',
        message: 'Cumulative Layout Shift detected',
        action: 'Set explicit dimensions for images and ads',
        impact: 'medium'
      });
    }

    // Memory usage suggestions
    if (this.metrics.memoryUsage > 100) { // > 100MB
      suggestions.push({
        type: 'warning',
        category: 'memory',
        message: 'High memory usage detected',
        action: 'Check for memory leaks and optimize data structures',
        impact: 'medium'
      });
    }

    // Network latency suggestions
    if (this.metrics.networkLatency > 500) {
      suggestions.push({
        type: 'warning',
        category: 'network',
        message: 'High network latency',
        action: 'Optimize API calls and use CDN',
        impact: 'medium'
      });
    }

    return suggestions;
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
        console.error('Performance monitor callback error:', error);
      }
    });
  }

  public generateReport(): string {
    const metrics = this.getMetrics();
    const suggestions = this.getOptimizationSuggestions();
    
    const report = {
      timestamp: new Date().toISOString(),
      performance: {
        loadTime: `${metrics.loadTime.toFixed(2)}ms`,
        renderTime: `${metrics.renderTime.toFixed(2)}ms`,
        bundleSize: `${(metrics.bundleSize / 1024).toFixed(2)}KB`,
        cacheHitRate: `${metrics.cacheHitRate.toFixed(1)}%`,
        memoryUsage: `${metrics.memoryUsage.toFixed(2)}MB`,
        networkLatency: `${metrics.networkLatency.toFixed(2)}ms`,
        userInteractionLatency: `${metrics.userInteractionLatency.toFixed(2)}ms`
      },
      coreWebVitals: {
        lcp: `${metrics.coreWebVitals.lcp.toFixed(2)}ms`,
        fid: `${metrics.coreWebVitals.fid.toFixed(2)}ms`,
        cls: metrics.coreWebVitals.cls.toFixed(3)
      },
      suggestions: suggestions.map(s => ({
        type: s.type,
        category: s.category,
        message: s.message,
        action: s.action,
        impact: s.impact
      }))
    };

    return JSON.stringify(report, null, 2);
  }

  public exportMetrics(): void {
    const report = this.generateReport();
    const blob = new Blob([report], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `macrobius-performance-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  public destroy(): void {
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        console.warn('Error disconnecting observer:', error);
      }
    });
    this.observers = [];
    this.callbacks = [];
    this.isMonitoring = false;
  }
}

// Singleton instance for global use
export const performanceMonitor = new PerformanceMonitor();

// React Hook for using performance monitoring
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = React.useState<PerformanceMetrics>(performanceMonitor.getMetrics());
  const [suggestions, setSuggestions] = React.useState<OptimizationSuggestion[]>([]);

  React.useEffect(() => {
    const unsubscribe = performanceMonitor.onMetricsUpdate((newMetrics) => {
      setMetrics(newMetrics);
      setSuggestions(performanceMonitor.getOptimizationSuggestions());
    });

    performanceMonitor.measurePageLoad();

    return unsubscribe;
  }, []);

  return {
    metrics,
    suggestions,
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
): React.ComponentType<P> {
  const PerformanceWrappedComponent = React.forwardRef<any, P>((props, ref) => {
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
  
  PerformanceWrappedComponent.displayName = `withPerformanceMonitoring(${componentName})`;
  
  return PerformanceWrappedComponent as React.ComponentType<P>;
}

export default performanceMonitor;
/**
 * Advanced Mobile Optimization System
 * Provides comprehensive mobile experience enhancements
 */

import React from 'react';

interface DeviceInfo {
  type: 'desktop' | 'tablet' | 'mobile';
  screenSize: { width: number; height: number };
  orientation: 'portrait' | 'landscape';
  touchSupport: boolean;
  connectionType: 'slow-2g' | '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  memory: number; // GB
  cores: number;
  battery: {
    level: number;
    charging: boolean;
  } | null;
}

interface MobileOptimizationConfig {
  enableLazyLoading: boolean;
  enableImageOptimization: boolean;
  enableTouchOptimizations: boolean;
  enableReducedMotion: boolean;
  enableDataSaver: boolean;
  adaptiveLoading: boolean;
  preloadCriticalResources: boolean;
}

interface TouchGesture {
  type: 'tap' | 'double-tap' | 'long-press' | 'swipe' | 'pinch' | 'rotate';
  element: HTMLElement;
  callback: (event: TouchEvent | MouseEvent, data?: any) => void;
  options?: {
    threshold?: number;
    timeout?: number;
    preventDefault?: boolean;
  };
}

class MobileOptimization {
  private deviceInfo: DeviceInfo;
  private config: MobileOptimizationConfig;
  private touchGestures: Map<string, TouchGesture> = new Map();
  private observers: {
    intersection?: IntersectionObserver;
    resize?: ResizeObserver;
    mutation?: MutationObserver;
  } = {};
  private isInitialized = false;

  constructor(config: Partial<MobileOptimizationConfig> = {}) {
    this.config = {
      enableLazyLoading: true,
      enableImageOptimization: true,
      enableTouchOptimizations: true,
      enableReducedMotion: false,
      enableDataSaver: false,
      adaptiveLoading: true,
      preloadCriticalResources: true,
      ...config
    };

    this.deviceInfo = this.detectDevice();
    this.initialize();
  }

  private detectDevice(): DeviceInfo {
    const userAgent = navigator.userAgent.toLowerCase();
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    
    // Device type detection
    let type: 'desktop' | 'tablet' | 'mobile' = 'desktop';
    if (/mobile|android|iphone|ipod|blackberry|opera mini/i.test(userAgent)) {
      type = 'mobile';
    } else if (/tablet|ipad/i.test(userAgent) || (screenWidth <= 1024 && 'ontouchstart' in window)) {
      type = 'tablet';
    }

    // Screen orientation
    const orientation = screenWidth > screenHeight ? 'landscape' : 'portrait';

    // Connection type detection
    let connectionType: DeviceInfo['connectionType'] = 'unknown';
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connectionType = connection.effectiveType || 'unknown';
    }

    // Hardware detection
    const memory = (navigator as any).deviceMemory || 4; // Default to 4GB
    const cores = navigator.hardwareConcurrency || 4; // Default to 4 cores

    // Battery API
    let battery: DeviceInfo['battery'] = null;
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((batteryManager: any) => {
        battery = {
          level: batteryManager.level,
          charging: batteryManager.charging
        };
      }).catch(() => {
        // Battery API not supported or permission denied
      });
    }

    return {
      type,
      screenSize: { width: screenWidth, height: screenHeight },
      orientation,
      touchSupport: 'ontouchstart' in window,
      connectionType,
      memory,
      cores,
      battery
    };
  }

  private initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    // Apply mobile-specific optimizations
    this.setupViewport();
    this.setupTouchOptimizations();
    this.setupLazyLoading();
    this.setupImageOptimization();
    this.setupAdaptiveLoading();
    this.setupAccessibilityEnhancements();
    this.setupOrientationHandling();
    this.setupDataSaver();

    // Listen for device changes
    this.setupEventListeners();

    this.isInitialized = true;
  }

  private setupViewport(): void {
    // Ensure proper viewport meta tag
    let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';

    // Prevent zoom on input focus for iOS
    if (this.deviceInfo.type === 'mobile' && /ios|iphone|ipad/i.test(navigator.userAgent)) {
      document.addEventListener('focusin', (e) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
          viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        }
      });
      
      document.addEventListener('focusout', () => {
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
      });
    }
  }

  private setupTouchOptimizations(): void {
    if (!this.config.enableTouchOptimizations || !this.deviceInfo.touchSupport) return;

    // Add touch feedback styles
    const style = document.createElement('style');
    style.textContent = `
      .touch-feedback {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
        -webkit-touch-callout: none;
      }
      
      .touch-target {
        min-height: 44px;
        min-width: 44px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      
      .no-touch-select {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    `;
    document.head.appendChild(style);

    // Apply touch optimizations to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea');
    interactiveElements.forEach(element => {
      element.classList.add('touch-feedback');
      
      // Ensure minimum touch target size
      const rect = element.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        element.classList.add('touch-target');
      }
    });
  }

  private setupLazyLoading(): void {
    if (!this.config.enableLazyLoading) return;

    // Use Intersection Observer for lazy loading
    this.observers.intersection = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            this.loadElement(element);
            this.observers.intersection?.unobserve(element);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    // Observe lazy-loadable elements
    this.observeLazyElements();
  }

  private observeLazyElements(): void {
    const lazyElements = document.querySelectorAll('[data-lazy], img[data-src], [data-background-image]');
    lazyElements.forEach(element => {
      this.observers.intersection?.observe(element);
    });
  }

  private loadElement(element: HTMLElement): void {
    if (element instanceof HTMLImageElement) {
      const src = element.dataset.src;
      if (src) {
        element.src = src;
        element.classList.add('loaded');
        delete element.dataset.src;
      }
    } else {
      const backgroundImage = element.dataset.backgroundImage;
      if (backgroundImage) {
        element.style.backgroundImage = `url(${backgroundImage})`;
        element.classList.add('loaded');
        delete element.dataset.backgroundImage;
      }
    }

    // Trigger custom lazy load event
    element.dispatchEvent(new CustomEvent('lazyLoaded'));
  }

  private setupImageOptimization(): void {
    if (!this.config.enableImageOptimization) return;

    // Add loading="lazy" to images
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      (img as HTMLImageElement).loading = 'lazy';
    });

    // Optimize images based on device capabilities
    this.optimizeImagesForDevice();
  }

  private optimizeImagesForDevice(): void {
    const images = document.querySelectorAll('img[data-optimize]');
    
    images.forEach(img => {
      const imageElement = img as HTMLImageElement;
      const originalSrc = imageElement.src;
      
      if (!originalSrc) return;

      let optimizedSrc = originalSrc;
      
      // Adjust image quality based on connection speed
      if (this.deviceInfo.connectionType === 'slow-2g' || this.deviceInfo.connectionType === '2g') {
        optimizedSrc = this.getOptimizedImageUrl(originalSrc, { quality: 30, format: 'webp' });
      } else if (this.deviceInfo.connectionType === '3g') {
        optimizedSrc = this.getOptimizedImageUrl(originalSrc, { quality: 50, format: 'webp' });
      } else {
        optimizedSrc = this.getOptimizedImageUrl(originalSrc, { quality: 80, format: 'webp' });
      }
      
      // Adjust size based on device pixel ratio and screen size
      const dpr = window.devicePixelRatio || 1;
      const maxWidth = Math.min(this.deviceInfo.screenSize.width * dpr, 1920);
      
      optimizedSrc = this.getOptimizedImageUrl(optimizedSrc, { width: maxWidth });
      
      imageElement.src = optimizedSrc;
    });
  }

  private getOptimizedImageUrl(url: string, options: {
    quality?: number;
    width?: number;
    height?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png';
  }): string {
    // This would integrate with your image optimization service
    // For now, return the original URL
    return url;
  }

  private setupAdaptiveLoading(): void {
    if (!this.config.adaptiveLoading) return;

    // Adjust loading strategy based on device capabilities
    const loadingStrategy = this.determineLoadingStrategy();
    
    if (loadingStrategy === 'progressive') {
      this.enableProgressiveLoading();
    } else if (loadingStrategy === 'conservative') {
      this.enableConservativeLoading();
    }
  }

  private determineLoadingStrategy(): 'aggressive' | 'progressive' | 'conservative' {
    const { connectionType, memory, cores } = this.deviceInfo;
    
    // Conservative loading for low-end devices or slow connections
    if (
      connectionType === 'slow-2g' || 
      connectionType === '2g' || 
      memory < 2 || 
      cores < 2
    ) {
      return 'conservative';
    }
    
    // Progressive loading for mid-range devices
    if (
      connectionType === '3g' || 
      memory < 4 || 
      cores < 4
    ) {
      return 'progressive';
    }
    
    // Aggressive loading for high-end devices
    return 'aggressive';
  }

  private enableProgressiveLoading(): void {
    // Implement progressive loading logic
    const criticalElements = document.querySelectorAll('[data-critical]');
    const nonCriticalElements = document.querySelectorAll('[data-non-critical]');
    
    // Load critical elements first
    criticalElements.forEach(element => {
      this.loadElement(element as HTMLElement);
    });
    
    // Load non-critical elements after a delay
    setTimeout(() => {
      nonCriticalElements.forEach(element => {
        this.loadElement(element as HTMLElement);
      });
    }, 1000);
  }

  private enableConservativeLoading(): void {
    // Only load elements when they're about to be visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadElement(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '10px 0px', // Smaller margin for conservative loading
        threshold: 0.1
      }
    );
    
    const lazyElements = document.querySelectorAll('[data-conservative-load]');
    lazyElements.forEach(element => observer.observe(element));
  }

  private setupAccessibilityEnhancements(): void {
    // Enhanced focus management for mobile
    this.setupMobileFocusManagement();
    
    // Screen reader optimizations
    this.setupScreenReaderOptimizations();
    
    // Reduced motion support
    this.setupReducedMotionSupport();
  }

  private setupMobileFocusManagement(): void {
    // Improve focus visibility on mobile
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        *:focus {
          outline: 2px solid #007bff;
          outline-offset: 2px;
        }
        
        .skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #000;
          color: #fff;
          padding: 8px;
          text-decoration: none;
          transition: top 0.3s;
          z-index: 10000;
        }
        
        .skip-link:focus {
          top: 6px;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Add skip links if they don't exist
    if (!document.querySelector('.skip-link')) {
      const skipLink = document.createElement('a');
      skipLink.className = 'skip-link';
      skipLink.href = '#main-content';
      skipLink.textContent = 'Skip to main content';
      document.body.insertBefore(skipLink, document.body.firstChild);
    }
  }

  private setupScreenReaderOptimizations(): void {
    // Add screen reader specific styles
    const style = document.createElement('style');
    style.textContent = `
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      
      .sr-only:focus {
        position: static;
        width: auto;
        height: auto;
        padding: inherit;
        margin: inherit;
        overflow: visible;
        clip: auto;
        white-space: normal;
      }
    `;
    document.head.appendChild(style);
  }

  private setupReducedMotionSupport(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const updateMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches || this.config.enableReducedMotion) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    };
    
    // Initial setup
    if (prefersReducedMotion.matches || this.config.enableReducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    }
    
    prefersReducedMotion.addEventListener('change', updateMotionPreference);
    
    // Add reduced motion styles
    const style = document.createElement('style');
    style.textContent = `
      .reduce-motion *,
      .reduce-motion *::before,
      .reduce-motion *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);
  }

  private setupOrientationHandling(): void {
    const handleOrientationChange = () => {
      // Update device info
      this.deviceInfo.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
      this.deviceInfo.screenSize = {
        width: window.screen.width,
        height: window.screen.height
      };
      
      // Emit orientation change event
      window.dispatchEvent(new CustomEvent('mobileOrientationChange', {
        detail: {
          orientation: this.deviceInfo.orientation,
          screenSize: this.deviceInfo.screenSize
        }
      }));
      
      // Re-optimize images for new orientation
      setTimeout(() => {
        this.optimizeImagesForDevice();
      }, 100);
    };
    
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
  }

  private setupDataSaver(): void {
    if (!this.config.enableDataSaver) return;

    const connection = (navigator as any).connection;
    if (connection && (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
      document.documentElement.classList.add('data-saver-mode');
      
      // Add data saver styles
      const style = document.createElement('style');
      style.textContent = `
        .data-saver-mode [data-background-image] {
          background-image: none !important;
        }
        
        .data-saver-mode video {
          display: none;
        }
        
        .data-saver-mode .data-heavy {
          display: none;
        }
      `;
      document.head.appendChild(style);
    }
  }

  private setupEventListeners(): void {
    // Listen for network changes
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', () => {
        this.deviceInfo.connectionType = connection.effectiveType;
        this.optimizeImagesForDevice();
      });
    }
    
    // Listen for battery changes
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBatteryInfo = () => {
          this.deviceInfo.battery = {
            level: battery.level,
            charging: battery.charging
          };
          
          // Enable power saving mode when battery is low
          if (battery.level < 0.2 && !battery.charging) {
            this.enablePowerSavingMode();
          }
        };
        
        battery.addEventListener('levelchange', updateBatteryInfo);
        battery.addEventListener('chargingchange', updateBatteryInfo);
        updateBatteryInfo();
      });
    }
  }

  private enablePowerSavingMode(): void {
    document.documentElement.classList.add('power-saving-mode');
    
    // Add power saving styles
    const style = document.createElement('style');
    style.textContent = `
      .power-saving-mode * {
        animation-play-state: paused !important;
      }
      
      .power-saving-mode [data-non-essential] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Touch gesture handling
  public addTouchGesture(id: string, gesture: TouchGesture): void {
    this.touchGestures.set(id, gesture);
    this.bindTouchGesture(gesture);
  }

  public removeTouchGesture(id: string): void {
    const gesture = this.touchGestures.get(id);
    if (gesture) {
      this.unbindTouchGesture(gesture);
      this.touchGestures.delete(id);
    }
  }

  private bindTouchGesture(gesture: TouchGesture): void {
    const { type, element, callback, options = {} } = gesture;
    
    switch (type) {
      case 'tap':
        this.bindTapGesture(element, callback, options);
        break;
      case 'double-tap':
        this.bindDoubleTapGesture(element, callback, options);
        break;
      case 'long-press':
        this.bindLongPressGesture(element, callback, options);
        break;
      case 'swipe':
        this.bindSwipeGesture(element, callback, options);
        break;
      // Add more gesture types as needed
    }
  }

  private bindTapGesture(element: HTMLElement, callback: Function, options: any): void {
    let startTime: number;
    let startPos: { x: number; y: number };
    
    const onTouchStart = (e: TouchEvent) => {
      startTime = Date.now();
      const touch = e.touches[0];
      startPos = { x: touch.clientX, y: touch.clientY };
    };
    
    const onTouchEnd = (e: TouchEvent) => {
      const endTime = Date.now();
      const touch = e.changedTouches[0];
      const endPos = { x: touch.clientX, y: touch.clientY };
      
      const distance = Math.sqrt(
        Math.pow(endPos.x - startPos.x, 2) + Math.pow(endPos.y - startPos.y, 2)
      );
      
      const duration = endTime - startTime;
      
      if (duration < (options.timeout || 200) && distance < (options.threshold || 10)) {
        if (options.preventDefault) {
          e.preventDefault();
        }
        callback(e);
      }
    };
    
    element.addEventListener('touchstart', onTouchStart, { passive: !options.preventDefault });
    element.addEventListener('touchend', onTouchEnd, { passive: !options.preventDefault });
  }

  private bindDoubleTapGesture(element: HTMLElement, callback: Function, options: any): void {
    let lastTap = 0;
    
    const onTouchEnd = (e: TouchEvent) => {
      const currentTime = Date.now();
      const tapLength = currentTime - lastTap;
      
      if (tapLength < (options.timeout || 300) && tapLength > 0) {
        if (options.preventDefault) {
          e.preventDefault();
        }
        callback(e);
      }
      
      lastTap = currentTime;
    };
    
    element.addEventListener('touchend', onTouchEnd, { passive: !options.preventDefault });
  }

  private bindLongPressGesture(element: HTMLElement, callback: Function, options: any): void {
    let pressTimer: number;
    
    const onTouchStart = (e: TouchEvent) => {
      pressTimer = window.setTimeout(() => {
        if (options.preventDefault) {
          e.preventDefault();
        }
        callback(e);
      }, options.timeout || 500);
    };
    
    const onTouchEnd = () => {
      clearTimeout(pressTimer);
    };
    
    element.addEventListener('touchstart', onTouchStart, { passive: !options.preventDefault });
    element.addEventListener('touchend', onTouchEnd);
    element.addEventListener('touchmove', onTouchEnd);
  }

  private bindSwipeGesture(element: HTMLElement, callback: Function, options: any): void {
    let startPos: { x: number; y: number };
    
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startPos = { x: touch.clientX, y: touch.clientY };
    };
    
    const onTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const endPos = { x: touch.clientX, y: touch.clientY };
      
      const deltaX = endPos.x - startPos.x;
      const deltaY = endPos.y - startPos.y;
      
      const threshold = options.threshold || 50;
      
      let direction: string | null = null;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > threshold) {
          direction = deltaX > 0 ? 'right' : 'left';
        }
      } else {
        if (Math.abs(deltaY) > threshold) {
          direction = deltaY > 0 ? 'down' : 'up';
        }
      }
      
      if (direction) {
        if (options.preventDefault) {
          e.preventDefault();
        }
        callback(e, { direction, deltaX, deltaY });
      }
    };
    
    element.addEventListener('touchstart', onTouchStart, { passive: !options.preventDefault });
    element.addEventListener('touchend', onTouchEnd, { passive: !options.preventDefault });
  }

  private unbindTouchGesture(gesture: TouchGesture): void {
    // Remove all event listeners for the gesture
    // This is a simplified implementation
    const events = ['touchstart', 'touchend', 'touchmove'];
    events.forEach(event => {
      gesture.element.removeEventListener(event, () => {});
    });
  }

  // Public API
  public getDeviceInfo(): DeviceInfo {
    return { ...this.deviceInfo };
  }

  public updateConfig(newConfig: Partial<MobileOptimizationConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Re-initialize with new config
    this.initialize();
  }

  public forceReoptimize(): void {
    this.optimizeImagesForDevice();
    this.observeLazyElements();
  }

  public destroy(): void {
    // Clean up observers
    Object.values(this.observers).forEach(observer => {
      observer?.disconnect();
    });
    
    // Clean up touch gestures
    this.touchGestures.forEach((gesture) => {
      this.unbindTouchGesture(gesture);
    });
    this.touchGestures.clear();
    
    this.isInitialized = false;
  }
}

// Singleton instance
export const mobileOptimization = new MobileOptimization();

// React Hook for mobile optimization
export function useMobileOptimization() {
  const [deviceInfo, setDeviceInfo] = React.useState(mobileOptimization.getDeviceInfo());
  
  React.useEffect(() => {
    const handleOrientationChange = (e: CustomEvent) => {
      setDeviceInfo(mobileOptimization.getDeviceInfo());
    };
    
    window.addEventListener('mobileOrientationChange', handleOrientationChange as EventListener);
    
    return () => {
      window.removeEventListener('mobileOrientationChange', handleOrientationChange as EventListener);
    };
  }, []);
  
  return {
    deviceInfo,
    addTouchGesture: mobileOptimization.addTouchGesture.bind(mobileOptimization),
    removeTouchGesture: mobileOptimization.removeTouchGesture.bind(mobileOptimization),
    forceReoptimize: mobileOptimization.forceReoptimize.bind(mobileOptimization),
    updateConfig: mobileOptimization.updateConfig.bind(mobileOptimization)
  };
}

export default MobileOptimization;
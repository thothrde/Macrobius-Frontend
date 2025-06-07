/**
 * Advanced Accessibility Enhancement System
 * Provides comprehensive WCAG compliance and accessibility optimizations
 */

import React from 'react';

interface AccessibilityConfig {
  enableScreenReaderOptimizations: boolean;
  enableKeyboardNavigation: boolean;
  enableFocusManagement: boolean;
  enableColorContrastChecking: boolean;
  enableAriaEnhancements: boolean;
  enableReducedMotion: boolean;
  enableHighContrast: boolean;
  verboseDescriptions: boolean;
}

interface AccessibilityReport {
  timestamp: string;
  violations: AccessibilityViolation[];
  score: number;
  wcagLevel: 'A' | 'AA' | 'AAA';
  recommendations: AccessibilityRecommendation[];
}

interface AccessibilityViolation {
  type: 'critical' | 'serious' | 'moderate' | 'minor';
  rule: string;
  description: string;
  element: string;
  impact: 'high' | 'medium' | 'low';
  wcagReference: string;
}

interface AccessibilityRecommendation {
  category: 'navigation' | 'content' | 'forms' | 'media' | 'structure';
  message: string;
  action: string;
  priority: number;
}

interface FocusableElement {
  element: HTMLElement;
  tabIndex: number;
  isVisible: boolean;
  rect: DOMRect;
}

class AccessibilityEnhancer {
  private config: AccessibilityConfig;
  private isInitialized = false;
  private focusManager: FocusManager;
  private ariaManager: AriaManager;
  private colorContrastChecker: ColorContrastChecker;
  private keyboardNavigation: KeyboardNavigationManager;
  private announcer: ScreenReaderAnnouncer;

  constructor(config: Partial<AccessibilityConfig> = {}) {
    this.config = {
      enableScreenReaderOptimizations: true,
      enableKeyboardNavigation: true,
      enableFocusManagement: true,
      enableColorContrastChecking: true,
      enableAriaEnhancements: true,
      enableReducedMotion: true,
      enableHighContrast: false,
      verboseDescriptions: false,
      ...config
    };

    this.focusManager = new FocusManager();
    this.ariaManager = new AriaManager();
    this.colorContrastChecker = new ColorContrastChecker();
    this.keyboardNavigation = new KeyboardNavigationManager();
    this.announcer = new ScreenReaderAnnouncer();

    this.initialize();
  }

  private initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    console.log('♿ Initializing accessibility enhancements');

    // Apply base accessibility styles
    this.applyAccessibilityStyles();
    
    // Initialize components based on config
    if (this.config.enableFocusManagement) {
      this.focusManager.initialize();
    }
    
    if (this.config.enableAriaEnhancements) {
      this.ariaManager.initialize();
    }
    
    if (this.config.enableKeyboardNavigation) {
      this.keyboardNavigation.initialize();
    }
    
    if (this.config.enableScreenReaderOptimizations) {
      this.announcer.initialize();
    }
    
    // Setup user preference detection
    this.setupUserPreferences();
    
    // Setup mutation observer for dynamic content
    this.setupDynamicContentObserver();

    this.isInitialized = true;
  }

  private applyAccessibilityStyles(): void {
    const style = document.createElement('style');
    style.id = 'accessibility-enhancements';
    style.textContent = `
      /* Enhanced focus indicators */
      *:focus {
        outline: 2px solid #4A90E2 !important;
        outline-offset: 2px !important;
      }
      
      /* Skip links */
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px 12px;
        text-decoration: none;
        transition: top 0.3s;
        z-index: 10000;
        border-radius: 4px;
        font-weight: bold;
      }
      
      .skip-link:focus {
        top: 6px;
      }
      
      /* Screen reader only content */
      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }
      
      .sr-only:focus {
        position: static !important;
        width: auto !important;
        height: auto !important;
        padding: inherit !important;
        margin: inherit !important;
        overflow: visible !important;
        clip: auto !important;
        white-space: normal !important;
      }
      
      /* High contrast mode */
      .high-contrast {
        filter: contrast(150%) !important;
      }
      
      .high-contrast * {
        background: #000 !important;
        color: #fff !important;
        border-color: #fff !important;
      }
      
      /* Reduced motion */
      .reduce-motion *,
      .reduce-motion *::before,
      .reduce-motion *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
      
      /* Focus trap indicator */
      .focus-trap {
        position: relative;
      }
      
      .focus-trap::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border: 2px dashed #4A90E2;
        pointer-events: none;
        z-index: -1;
      }
      
      /* Touch target enhancement */
      .touch-target {
        min-height: 44px;
        min-width: 44px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      
      /* Error announcement styling */
      .error-announcement {
        background: #d32f2f;
        color: white;
        padding: 12px;
        border-radius: 4px;
        margin: 8px 0;
        font-weight: bold;
      }
      
      /* Success announcement styling */
      .success-announcement {
        background: #388e3c;
        color: white;
        padding: 12px;
        border-radius: 4px;
        margin: 8px 0;
        font-weight: bold;
      }
    `;
    
    document.head.appendChild(style);
  }

  private setupUserPreferences(): void {
    // Detect and apply user preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyReducedMotion = (matches: boolean) => {
      if (matches || this.config.enableReducedMotion) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    };
    
    const applyHighContrast = (matches: boolean) => {
      if (matches || this.config.enableHighContrast) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    };
    
    prefersReducedMotion.addListener((e) => applyReducedMotion(e.matches));
    prefersHighContrast.addListener((e) => applyHighContrast(e.matches));
    
    // Apply initial preferences
    applyReducedMotion(prefersReducedMotion.matches);
    applyHighContrast(prefersHighContrast.matches);
  }

  private setupDynamicContentObserver(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.enhanceElement(node as HTMLElement);
            }
          });
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private enhanceElement(element: HTMLElement): void {
    // Enhance newly added elements
    this.ariaManager.enhanceElement(element);
    this.focusManager.registerElement(element);
    
    // Add touch targets for mobile
    if (this.isTouchDevice() && this.isInteractiveElement(element)) {
      const rect = element.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        element.classList.add('touch-target');
      }
    }
  }

  private isTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  private isInteractiveElement(element: HTMLElement): boolean {
    const interactiveTags = ['button', 'a', 'input', 'textarea', 'select'];
    return interactiveTags.includes(element.tagName.toLowerCase()) ||
           element.hasAttribute('tabindex') ||
           element.getAttribute('role') === 'button';
  }

  // Public API
  public announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    this.announcer.announce(message, priority);
  }

  public createFocusTrap(container: HTMLElement): () => void {
    return this.focusManager.createFocusTrap(container);
  }

  public enhanceForm(form: HTMLFormElement): void {
    this.ariaManager.enhanceForm(form);
  }

  public checkColorContrast(element: HTMLElement): { ratio: number; passes: boolean } {
    return this.colorContrastChecker.check(element);
  }

  public generateAccessibilityReport(): AccessibilityReport {
    const violations: AccessibilityViolation[] = [];
    const recommendations: AccessibilityRecommendation[] = [];
    
    // Check common accessibility issues
    this.checkImages(violations, recommendations);
    this.checkHeadings(violations, recommendations);
    this.checkLinks(violations, recommendations);
    this.checkForms(violations, recommendations);
    this.checkColorContrasts(violations, recommendations);
    
    // Calculate score
    const score = this.calculateAccessibilityScore(violations);
    const wcagLevel = this.determineWCAGLevel(violations);
    
    return {
      timestamp: new Date().toISOString(),
      violations,
      score,
      wcagLevel,
      recommendations
    };
  }

  private checkImages(violations: AccessibilityViolation[], recommendations: AccessibilityRecommendation[]): void {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      if (!img.alt && !img.getAttribute('aria-label')) {
        violations.push({
          type: 'serious',
          rule: 'image-alt',
          description: 'Image missing alternative text',
          element: img.outerHTML.substring(0, 100),
          impact: 'high',
          wcagReference: 'WCAG 1.1.1'
        });
      }
    });
  }

  private checkHeadings(violations: AccessibilityViolation[], recommendations: AccessibilityRecommendation[]): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1));
      
      if (level - previousLevel > 1) {
        violations.push({
          type: 'moderate',
          rule: 'heading-sequence',
          description: 'Heading levels should not skip',
          element: heading.outerHTML.substring(0, 100),
          impact: 'medium',
          wcagReference: 'WCAG 1.3.1'
        });
      }
      
      previousLevel = level;
    });
  }

  private checkLinks(violations: AccessibilityViolation[], recommendations: AccessibilityRecommendation[]): void {
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
      const text = link.textContent?.trim();
      if (!text || text.length < 3) {
        violations.push({
          type: 'serious',
          rule: 'link-text',
          description: 'Link text is too short or missing',
          element: link.outerHTML.substring(0, 100),
          impact: 'high',
          wcagReference: 'WCAG 2.4.4'
        });
      }
    });
  }

  private checkForms(violations: AccessibilityViolation[], recommendations: AccessibilityRecommendation[]): void {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach((input) => {
      if (!this.hasLabel(input as HTMLInputElement)) {
        violations.push({
          type: 'serious',
          rule: 'form-label',
          description: 'Form control missing label',
          element: input.outerHTML.substring(0, 100),
          impact: 'high',
          wcagReference: 'WCAG 1.3.1'
        });
      }
    });
  }

  private hasLabel(input: HTMLInputElement): boolean {
    return !!(input.labels?.length || 
             input.getAttribute('aria-label') || 
             input.getAttribute('aria-labelledby') ||
             input.getAttribute('title'));
  }

  private checkColorContrasts(violations: AccessibilityViolation[], recommendations: AccessibilityRecommendation[]): void {
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button');
    textElements.forEach((element) => {
      const result = this.colorContrastChecker.check(element as HTMLElement);
      if (!result.passes) {
        violations.push({
          type: 'moderate',
          rule: 'color-contrast',
          description: `Color contrast ratio is ${result.ratio.toFixed(2)}, should be at least 4.5:1`,
          element: element.outerHTML.substring(0, 100),
          impact: 'medium',
          wcagReference: 'WCAG 1.4.3'
        });
      }
    });
  }

  private calculateAccessibilityScore(violations: AccessibilityViolation[]): number {
    let score = 100;
    
    violations.forEach((violation) => {
      switch (violation.type) {
        case 'critical': score -= 20; break;
        case 'serious': score -= 10; break;
        case 'moderate': score -= 5; break;
        case 'minor': score -= 2; break;
      }
    });
    
    return Math.max(0, score);
  }

  private determineWCAGLevel(violations: AccessibilityViolation[]): 'A' | 'AA' | 'AAA' {
    const criticalViolations = violations.filter(v => v.type === 'critical').length;
    const seriousViolations = violations.filter(v => v.type === 'serious').length;
    
    if (criticalViolations > 0 || seriousViolations > 5) return 'A';
    if (seriousViolations > 0 || violations.length > 10) return 'AA';
    return 'AAA';
  }

  public updateConfig(newConfig: Partial<AccessibilityConfig>): void {
    this.config = { ...this.config, ...newConfig };
    // Re-initialize with new config
    this.initialize();
  }

  public destroy(): void {
    this.focusManager.destroy();
    this.ariaManager.destroy();
    this.keyboardNavigation.destroy();
    this.announcer.destroy();
    
    // Remove styles
    const style = document.getElementById('accessibility-enhancements');
    if (style) {
      style.remove();
    }
    
    this.isInitialized = false;
    console.log('🧹 Accessibility enhancer destroyed');
  }
}

// Supporting classes
class FocusManager {
  private focusableElements: FocusableElement[] = [];
  private focusTraps: Set<HTMLElement> = new Set();

  initialize(): void {
    this.updateFocusableElements();
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  private updateFocusableElements(): void {
    const selector = 'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
    
    this.focusableElements = Array.from(elements).map(el => ({
      element: el,
      tabIndex: el.tabIndex,
      isVisible: this.isVisible(el),
      rect: el.getBoundingClientRect()
    }));
  }

  private isVisible(element: HTMLElement): boolean {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  }

  private handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      this.handleTabNavigation(event);
    }
  }

  private handleTabNavigation(event: KeyboardEvent): void {
    // Handle focus trapping logic here
    for (const trap of this.focusTraps) {
      if (trap.contains(document.activeElement)) {
        const focusableInTrap = trap.querySelectorAll('a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        const firstFocusable = focusableInTrap[0] as HTMLElement;
        const lastFocusable = focusableInTrap[focusableInTrap.length - 1] as HTMLElement;
        
        if (event.shiftKey && document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        } else if (!event.shiftKey && document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
        break;
      }
    }
  }

  createFocusTrap(container: HTMLElement): () => void {
    container.classList.add('focus-trap');
    this.focusTraps.add(container);
    
    // Focus first focusable element
    const firstFocusable = container.querySelector('a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])') as HTMLElement;
    if (firstFocusable) {
      firstFocusable.focus();
    }
    
    return () => {
      container.classList.remove('focus-trap');
      this.focusTraps.delete(container);
    };
  }

  registerElement(element: HTMLElement): void {
    this.updateFocusableElements();
  }

  destroy(): void {
    document.removeEventListener('keydown', this.handleKeydown.bind(this));
    this.focusTraps.clear();
  }
}

class AriaManager {
  initialize(): void {
    this.enhanceExistingElements();
  }

  private enhanceExistingElements(): void {
    // Add missing ARIA labels to common elements
    const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    buttons.forEach(button => {
      if (!button.textContent?.trim()) {
        button.setAttribute('aria-label', 'Button');
      }
    });
    
    // Enhance navigation
    const navs = document.querySelectorAll('nav:not([aria-label])');
    navs.forEach((nav, index) => {
      nav.setAttribute('aria-label', `Navigation ${index + 1}`);
    });
  }

  enhanceElement(element: HTMLElement): void {
    // Add appropriate ARIA attributes to new elements
    if (element.tagName.toLowerCase() === 'button' && !element.getAttribute('aria-label')) {
      if (!element.textContent?.trim()) {
        element.setAttribute('aria-label', 'Button');
      }
    }
  }

  enhanceForm(form: HTMLFormElement): void {
    // Add form-specific ARIA enhancements
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      if (!this.hasAriaLabel(input as HTMLInputElement)) {
        const label = this.findAssociatedLabel(input as HTMLInputElement);
        if (label) {
          const labelId = label.id || `label-${Date.now()}-${Math.random()}`;
          label.id = labelId;
          input.setAttribute('aria-labelledby', labelId);
        }
      }
    });
  }

  private hasAriaLabel(element: HTMLInputElement): boolean {
    return !!(element.getAttribute('aria-label') || element.getAttribute('aria-labelledby'));
  }

  private findAssociatedLabel(input: HTMLInputElement): HTMLLabelElement | null {
    // Try to find label by 'for' attribute
    if (input.id) {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (label) return label as HTMLLabelElement;
    }
    
    // Try to find parent label
    const parentLabel = input.closest('label');
    if (parentLabel) return parentLabel as HTMLLabelElement;
    
    return null;
  }

  destroy(): void {
    // Cleanup if needed
  }
}

class ColorContrastChecker {
  check(element: HTMLElement): { ratio: number; passes: boolean } {
    const style = window.getComputedStyle(element);
    const backgroundColor = this.parseColor(style.backgroundColor);
    const textColor = this.parseColor(style.color);
    
    const ratio = this.calculateContrastRatio(backgroundColor, textColor);
    const passes = ratio >= 4.5; // WCAG AA standard
    
    return { ratio, passes };
  }

  private parseColor(colorStr: string): [number, number, number] {
    // Simplified color parsing - would need more robust implementation
    const rgb = colorStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgb) {
      return [parseInt(rgb[1]), parseInt(rgb[2]), parseInt(rgb[3])];
    }
    return [255, 255, 255]; // Default to white
  }

  private calculateContrastRatio(color1: [number, number, number], color2: [number, number, number]): number {
    const l1 = this.getLuminance(color1);
    const l2 = this.getLuminance(color2);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  private getLuminance([r, g, b]: [number, number, number]): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }
}

class KeyboardNavigationManager {
  initialize(): void {
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  private handleKeydown(event: KeyboardEvent): void {
    // Handle custom keyboard shortcuts
    if (event.altKey && event.key === 'h') {
      // Jump to main heading
      const mainHeading = document.querySelector('h1');
      if (mainHeading) {
        (mainHeading as HTMLElement).focus();
        event.preventDefault();
      }
    }
    
    if (event.altKey && event.key === 'n') {
      // Jump to navigation
      const nav = document.querySelector('nav');
      if (nav) {
        const firstLink = nav.querySelector('a');
        if (firstLink) {
          (firstLink as HTMLElement).focus();
          event.preventDefault();
        }
      }
    }
  }

  destroy(): void {
    document.removeEventListener('keydown', this.handleKeydown.bind(this));
  }
}

class ScreenReaderAnnouncer {
  private announcer: HTMLElement | null = null;

  initialize(): void {
    this.createAnnouncer();
  }

  private createAnnouncer(): void {
    this.announcer = document.createElement('div');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    this.announcer.className = 'sr-only';
    this.announcer.id = 'screen-reader-announcer';
    document.body.appendChild(this.announcer);
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!this.announcer) return;
    
    this.announcer.setAttribute('aria-live', priority);
    this.announcer.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      if (this.announcer) {
        this.announcer.textContent = '';
      }
    }, 1000);
  }

  destroy(): void {
    if (this.announcer) {
      this.announcer.remove();
      this.announcer = null;
    }
  }
}

// Export singleton instance
export const accessibilityEnhancer = new AccessibilityEnhancer();

// React Hook for accessibility features
export function useAccessibility() {
  const [report, setReport] = React.useState<AccessibilityReport | null>(null);
  
  React.useEffect(() => {
    // Generate initial report
    const initialReport = accessibilityEnhancer.generateAccessibilityReport();
    setReport(initialReport);
  }, []);
  
  return {
    report,
    announceToScreenReader: accessibilityEnhancer.announceToScreenReader.bind(accessibilityEnhancer),
    createFocusTrap: accessibilityEnhancer.createFocusTrap.bind(accessibilityEnhancer),
    enhanceForm: accessibilityEnhancer.enhanceForm.bind(accessibilityEnhancer),
    checkColorContrast: accessibilityEnhancer.checkColorContrast.bind(accessibilityEnhancer),
    generateReport: () => {
      const newReport = accessibilityEnhancer.generateAccessibilityReport();
      setReport(newReport);
      return newReport;
    },
    updateConfig: accessibilityEnhancer.updateConfig.bind(accessibilityEnhancer)
  };
}

export type { AccessibilityConfig, AccessibilityReport, AccessibilityViolation, AccessibilityRecommendation };
export default AccessibilityEnhancer;
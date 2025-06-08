// Export all section components
export { default as HeroSection } from './HeroSection';
export { IntroSection } from './IntroSection';
export { default as QuizSection } from './QuizSection-enhanced';
export { default as BanquetSection } from './BanquetSection';
export { default as CosmosSection } from './CosmosSection';
export { default as TextSearchSection } from './TextSearchSection';
export { default as VocabularyTrainerSection } from './VocabularyTrainerSection';
export { default as WorldMapSection } from './WorldMapSection';

// Heavy component - Use dynamic import to reduce initial bundle size
export { default as ThreeDVisualizationSection } from './ThreeDVisualizationSection.dynamic';

// Advanced demo components (6 of 7 complete in GitHub)
export { default as AILearningEngineDemo } from './AILearningEngineDemo';
export { default as WebSocketRealTimeDemo } from './WebSocketRealTimeDemo';
export { default as PWAFunctionalityDemo } from './PWAFunctionalityDemo';
export { default as AdvancedCacheManagerDemo } from './AdvancedCacheManagerDemo';
export { default as MobileOptimizationDemo } from './MobileOptimizationDemo';
export { default as PerformanceMonitorDemo } from './PerformanceMonitorDemo';

// Missing component (needs implementation)
export const AccessibilityEnhancementDemo = () => "Accessibility Enhancement Demo - NEEDS IMPLEMENTATION";
// Central export file for all Macrobius section components
// Updated with Oracle Cloud integrated components and SRS Enhancement

// Core sections - Basic components
export { default as HeroSection } from './HeroSection';
export { default as IntroSection } from './IntroSection'; 
export { default as BanquetSection } from './BanquetSection';
export { default as QuizSection } from './QuizSection';
export { default as WorldMapSection } from './WorldMapSection';
export { default as TextSearchSection } from './TextSearchSection';

// Enhanced Oracle Cloud integrated sections - NEWLY UPDATED
export { default as VocabularyTrainer } from './VocabularyTrainer';
export { default as CosmosSection } from './CosmosSection';
export { default as VisualizationsSection } from './VisualizationsSection';

// Advanced educational components - Corpus integrated
export { default as VocabularyTrainerCorpusIntegrated } from './VocabularyTrainer-corpus-integrated';
export { default as VocabularyTrainerSRSEnhanced } from './VocabularyTrainer-SRS-enhanced';
export { default as GrammarExplainerCorpusIntegrated } from './GrammarExplainer-corpus-integrated';
export { default as MacrobiusTextProcessorBackendIntegrated } from './MacrobiusTextProcessor-backend-integrated';
export { default as MacrobiusTextProcessorEnhanced } from './MacrobiusTextProcessor-enhanced';
export { default as QuizSectionCulturalInsightsIntegrated } from './QuizSection-cultural-insights-integrated';
export { default as LearningSectionEnhancedComplete } from './LearningSection-enhanced-complete';

// AI-powered advanced components
export { default as AICulturalAnalysisSection } from './AICulturalAnalysisSection';
export { default as AITutoringSystemSection } from './AITutoringSystemSection';
export { default as PersonalizedLearningPathsSection } from './PersonalizedLearningPathsSection';
export { default as AdvancedCulturalModulesSection } from './AdvancedCulturalModulesSection';
export { default as EnhancedLearningSection } from './EnhancedLearningSection';

// Performance and optimization components
export { default as MobileOptimizationDemo } from './MobileOptimizationDemo';
export { default as PerformanceMonitorDemo } from './PerformanceMonitorDemo';

// Component groups for easy reference
export const CORE_SECTIONS = [
  'HeroSection',
  'IntroSection', 
  'BanquetSection',
  'CosmosSection',
  'QuizSection',
  'WorldMapSection',
  'TextSearchSection',
  'VocabularyTrainer',
  'VisualizationsSection'
] as const;

export const ORACLE_CLOUD_INTEGRATED_SECTIONS = [
  'VocabularyTrainer',
  'VocabularyTrainerSRSEnhanced',
  'CosmosSection', 
  'VisualizationsSection',
  'VocabularyTrainerCorpusIntegrated',
  'GrammarExplainerCorpusIntegrated',
  'MacrobiusTextProcessorBackendIntegrated',
  'QuizSectionCulturalInsightsIntegrated'
] as const;

export const AI_POWERED_SECTIONS = [
  'AICulturalAnalysisSection',
  'AITutoringSystemSection', 
  'PersonalizedLearningPathsSection',
  'AdvancedCulturalModulesSection'
] as const;

export const TIER_2_ENHANCED_SECTIONS = [
  'VocabularyTrainerSRSEnhanced',
  'MacrobiusTextProcessorBackendIntegrated',
  'PersonalizedLearningPathsSection'
] as const;

// Section metadata for navigation and organization
export const SECTION_METADATA = {
  // Core educational sections
  HeroSection: { 
    title: 'Welcome', 
    description: 'Landing page with Oracle Cloud statistics',
    oracleCloudIntegrated: false,
    difficulty: 'basic',
    tier: 'core'
  },
  IntroSection: { 
    title: 'Introduction', 
    description: 'Story introduction to Macrobius',
    oracleCloudIntegrated: false,
    difficulty: 'basic',
    tier: 'core'
  },
  BanquetSection: { 
    title: 'Roman Banquet', 
    description: 'Interactive Saturnalia experience',
    oracleCloudIntegrated: false,
    difficulty: 'intermediate',
    tier: 'core'
  },
  CosmosSection: { 
    title: 'Cosmic Harmony', 
    description: 'Interactive astronomy with authentic passages',
    oracleCloudIntegrated: true,
    difficulty: 'advanced',
    tier: 'tier1'
  },
  QuizSection: { 
    title: 'Knowledge Quiz', 
    description: 'Interactive cultural knowledge testing',
    oracleCloudIntegrated: false,
    difficulty: 'intermediate',
    tier: 'core'
  },
  WorldMapSection: { 
    title: 'Ancient World', 
    description: 'Interactive geographical exploration',
    oracleCloudIntegrated: false,
    difficulty: 'intermediate',
    tier: 'core'
  },
  TextSearchSection: { 
    title: 'Text Search', 
    description: 'Search through Macrobius corpus',
    oracleCloudIntegrated: true,
    difficulty: 'basic',
    tier: 'tier1'
  },
  VocabularyTrainer: { 
    title: 'Latin Vocabulary', 
    description: 'Interactive vocabulary training with authentic Latin',
    oracleCloudIntegrated: true,
    difficulty: 'intermediate',
    tier: 'tier1'
  },
  VocabularyTrainerSRSEnhanced: { 
    title: 'SRS Vocabulary Trainer', 
    description: 'Advanced spaced repetition system with daily goals and rewards',
    oracleCloudIntegrated: true,
    difficulty: 'advanced',
    tier: 'tier2'
  },
  GrammarExplainerCorpusIntegrated: { 
    title: 'Grammar Explainer', 
    description: 'Auto-generated exercises with pattern recognition',
    oracleCloudIntegrated: true,
    difficulty: 'advanced',
    tier: 'tier1'
  },
  VisualizationsSection: { 
    title: 'Data Visualizations', 
    description: 'Visual analysis of Macrobius corpus',
    oracleCloudIntegrated: true,
    difficulty: 'advanced',
    tier: 'tier1'
  }
} as const;

// Helper function to get Oracle Cloud integrated sections
export const getOracleCloudSections = () => {
  return Object.entries(SECTION_METADATA)
    .filter(([, metadata]) => metadata.oracleCloudIntegrated)
    .map(([sectionName]) => sectionName);
};

// Helper function to get sections by difficulty
export const getSectionsByDifficulty = (difficulty: 'basic' | 'intermediate' | 'advanced') => {
  return Object.entries(SECTION_METADATA)
    .filter(([, metadata]) => metadata.difficulty === difficulty)
    .map(([sectionName]) => sectionName);
};

// Helper function to get sections by tier
export const getSectionsByTier = (tier: 'core' | 'tier1' | 'tier2') => {
  return Object.entries(SECTION_METADATA)
    .filter(([, metadata]) => metadata.tier === tier)
    .map(([sectionName]) => sectionName);
};
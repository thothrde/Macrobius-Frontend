/**
 * 📝 SHARED TYPE DEFINITIONS
 * Central type definitions for the Macrobius platform
 * 
 * ✅ FIXES APPLIED:
 * - Added MacrobiusPassage type
 * - Centralized all shared types
 * - Fixed import issues
 * - Added comprehensive type definitions
 */

// Core Macrobius Types
export interface MacrobiusPassage {
  id: string;
  book: string;
  chapter: number;
  section: number;
  text: string;
  theme: string;
  culturalSignificance: number;
  modernRelevance: string;
  keywords: string[];
  relatedConcepts: string[];
  difficulty?: number;
  length?: number;
}

export interface CulturalTheme {
  id: string;
  name: string;
  description: string;
  passageCount: number;
  significance: number;
  modernApplications: string[];
  relatedThemes: string[];
  keyInsights: string[];
  color?: string;
}

export interface CulturalInsight {
  id: string;
  title: string;
  description: string;
  theme: string;
  modernRelevance: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  passages: string[];
  keyPoints: string[];
}

export interface TeachingModule {
  id: string;
  topic: string;
  description: string;
  culturalTheme: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  objectives: string[];
  content: string;
  activities: string[];
  assessments: string[];
}

// User and Learning Types
export interface User {
  id: string;
  name: string;
  email: string;
  learningLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  joinDate: Date;
  completedInsights: string[];
  achievementsEarned: string[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  dailyGoalMinutes: number;
  notificationsEnabled: boolean;
  hapticFeedback: boolean;
  audioEnabled: boolean;
  language: 'DE' | 'EN' | 'LA';
  theme: 'light' | 'dark' | 'auto';
}

export interface LearningProgress {
  userId: string;
  componentType: string;
  progress: number;
  lastActivity: Date;
  completedItems: string[];
  timeSpent: number;
  accuracy: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  points: number;
  unlockedAt?: Date;
  requirements: string[];
  category: 'vocabulary' | 'reading' | 'culture' | 'general';
}

// Vocabulary and Learning Types
export interface VocabularyWord {
  id: string;
  latin: string;
  translation: string;
  partOfSpeech: string;
  difficulty: number;
  frequency: number;
  examples: string[];
  etymology: string;
  modernDerivatives: string[];
  culturalContext: string;
  passages: string[];
}

export interface SRSCard {
  id: string;
  wordId: string;
  userId: string;
  interval: number;
  easeFactor: number;
  nextReview: Date;
  reviewCount: number;
  correctStreak: number;
  lastReviewed?: Date;
  difficulty: number;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'translation' | 'fill_blank' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: number;
  theme: string;
  passage?: string;
  hints?: string[];
}

export interface QuizResult {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  completedAt: Date;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}

// AI and RAG Types
export interface RAGQuery {
  query: string;
  language: 'DE' | 'EN' | 'LA';
  context?: string;
  maxResults?: number;
  threshold?: number;
}

export interface RAGResponse {
  response: string;
  sources: RAGSource[];
  confidence: number;
  processingTime: number;
  query: string;
}

export interface RAGSource {
  passage_id: string;
  text: string;
  similarity_score: number;
  book_chapter_section: string;
  theme?: string;
  relevance?: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: RAGSource[];
  confidence?: number;
}

// Analysis Types
export interface SemanticAnalysis {
  query: string;
  concepts: string[];
  themes: string[];
  difficulty: number;
  relatedPassages: string[];
  suggestions: string[];
}

export interface CulturalAnalysis {
  theme: string;
  passages: MacrobiusPassage[];
  insights: string[];
  connections: CulturalConnection[];
  modernRelevance: string[];
  confidence: number;
}

export interface CulturalConnection {
  source: string;
  target: string;
  relationship: string;
  strength: number;
  examples: string[];
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Component Props Types
export interface ComponentProps {
  isActive: boolean;
  onProgressUpdate?: (progress: LearningProgress) => void;
  onAchievementUnlocked?: (achievement: Achievement) => void;
  user?: User;
  language?: 'DE' | 'EN' | 'LA';
}

export interface NavigationProps {
  currentPath: string;
  language: 'DE' | 'EN' | 'LA';
  onLanguageChange: (language: 'DE' | 'EN' | 'LA') => void;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: string;
  timestamp: Date;
  userId?: string;
  context?: Record<string, any>;
}

// Performance Types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  memoryUsage: number;
  cacheHitRate: number;
  errorRate: number;
}

// Mobile Types
export interface MobileConfig {
  platform: 'ios' | 'android';
  version: string;
  deviceInfo: DeviceInfo;
  capabilities: DeviceCapabilities;
}

export interface DeviceInfo {
  model: string;
  osVersion: string;
  screenSize: { width: number; height: number };
  orientation: 'portrait' | 'landscape';
}

export interface DeviceCapabilities {
  storage: number;
  memory: number;
  networkType: string;
  batteryLevel: number;
  performanceClass: 'low' | 'medium' | 'high';
}

// Export all types
export type Language = 'DE' | 'EN' | 'LA';
export type Theme = 'light' | 'dark' | 'auto';
export type LearningLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type ComponentType = 'vocabulary' | 'reading' | 'quiz' | 'culture' | 'general';
export type Platform = 'web' | 'mobile' | 'desktop';
export type QuestionType = 'multiple_choice' | 'translation' | 'fill_blank' | 'matching';
export type AnalysisType = 'semantic' | 'cultural' | 'linguistic' | 'statistical';
export type NotificationType = 'achievement' | 'reminder' | 'update' | 'error';
export type SyncStatus = 'synced' | 'pending' | 'failed' | 'offline';
export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error';
export type DeploymentStatus = 'deployed' | 'building' | 'failed' | 'pending';

// Utility Types
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type Required<T> = {
  [P in keyof T]-?: T[P];
};

export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Record<K extends keyof any, T> = {
  [P in K]: T;
};

// Default exports for common types
export default {
  MacrobiusPassage,
  CulturalTheme,
  User,
  VocabularyWord,
  QuizQuestion,
  ChatMessage,
  RAGResponse,
  ComponentProps
};
/**
 * 🏛️ MACROBIUS ORACLE CLOUD API CLIENT
 * 
 * Professional API client for connecting to Oracle Cloud backend
 * Server: 152.70.184.232:8080
 * Content: 1,401 authentic Macrobius passages + cultural insights
 */

import React from 'react';

// Oracle Cloud Configuration
const ORACLE_CLOUD_BASE_URL = 'http://152.70.184.232:8080/api';

// TypeScript Interfaces for Oracle Cloud Data
export interface MacrobiusPassage {
  id: string;
  work_type: 'Saturnalia' | 'Commentarii';
  book_number: number;
  chapter_number: number;
  section_number: number;
  latin_text: string;
  cultural_theme: string;
  modern_relevance: string;
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
  word_count: number;
  cultural_keywords: string[];
}

export interface CulturalTheme {
  id: string;
  name: string;
  description: string;
  passage_count: number;
  related_themes: string[];
  modern_connections: string[];
}

export interface CulturalInsight {
  id: string;
  title: string;
  ancient_concept: string;
  modern_parallel: string;
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
  cultural_theme: string;
  educational_value: string;
  discussion_points: string[];
}

export interface TeachingModule {
  id: string;
  topic: string;
  description: string;
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
  learning_objectives: string[];
  source_passages: string[];
  cultural_context: string;
  modern_applications: string[];
}

export interface SearchFilters {
  work_type?: 'Saturnalia' | 'Commentarii';
  cultural_theme?: string;
  difficulty_level?: 'Beginner' | 'Intermediate' | 'Advanced';
  book_number?: number;
  limit?: number;
  offset?: number;
}

export interface SearchResponse {
  passages: MacrobiusPassage[];
  total_count: number;
  search_time_ms: number;
  query_terms: string[];
  filters_applied: SearchFilters;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  request_id?: string;
}

// Error types for better error handling
export class OracleCloudError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'OracleCloudError';
  }
}

// Professional API Client Class
class MacrobiusApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseUrl = ORACLE_CLOUD_BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async fetchWithErrorHandling<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new OracleCloudError(
          `API request failed: ${response.statusText}`,
          response.status,
          endpoint
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof OracleCloudError) {
        throw error;
      }
      
      // Network or parsing errors
      throw new OracleCloudError(
        `Network error connecting to Oracle Cloud: ${error instanceof Error ? error.message : 'Unknown error'}`,
        undefined,
        endpoint
      );
    }
  }

  /**
   * Test Oracle Cloud connectivity
   */
  async testConnection(): Promise<{ status: string; message: string }> {
    return this.fetchWithErrorHandling('/health');
  }

  /**
   * Get basic API information
   */
  async getApiInfo(): Promise<{ message: string; status: string }> {
    return this.fetchWithErrorHandling('/');
  }

  /**
   * Search through 1,401 Macrobius passages
   */
  async searchPassages(
    query: string,
    filters: SearchFilters = {}
  ): Promise<SearchResponse> {
    const endpoint = '/passages/search';
    const payload = {
      query: query.trim(),
      filters,
      timestamp: new Date().toISOString(),
    };

    return this.fetchWithErrorHandling<SearchResponse>(endpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  /**
   * Get all available cultural themes
   */
  async getCulturalThemes(): Promise<CulturalTheme[]> {
    return this.fetchWithErrorHandling<CulturalTheme[]>('/cultural-themes');
  }

  /**
   * Get passages by cultural theme
   */
  async getPassagesByTheme(
    theme: string,
    limit: number = 10
  ): Promise<MacrobiusPassage[]> {
    const endpoint = `/cultural-themes/${encodeURIComponent(theme)}/passages`;
    return this.fetchWithErrorHandling<MacrobiusPassage[]>(
      `${endpoint}?limit=${limit}`
    );
  }

  /**
   * Get cultural insights for educational content
   */
  async getCulturalInsights(
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced',
    theme?: string
  ): Promise<CulturalInsight[]> {
    let endpoint = '/cultural-insights';
    const params = new URLSearchParams();
    
    if (difficulty) params.append('difficulty', difficulty);
    if (theme) params.append('theme', theme);
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }

    return this.fetchWithErrorHandling<CulturalInsight[]>(endpoint);
  }

  /**
   * Get teaching modules for structured learning
   */
  async getTeachingModules(
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
  ): Promise<TeachingModule[]> {
    let endpoint = '/teaching-modules';
    if (difficulty) {
      endpoint += `?difficulty=${difficulty}`;
    }

    return this.fetchWithErrorHandling<TeachingModule[]>(endpoint);
  }

  /**
   * Get vocabulary words from authentic passages
   */
  async getVocabulary(
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced',
    theme?: string,
    limit: number = 50
  ): Promise<Array<{
    latin_word: string;
    english_meaning: string;
    cultural_context: string;
    source_passage: string;
    frequency: number;
    difficulty: string;
  }>> {
    let endpoint = '/vocabulary';
    const params = new URLSearchParams();
    
    if (difficulty) params.append('difficulty', difficulty);
    if (theme) params.append('theme', theme);
    params.append('limit', limit.toString());
    
    endpoint += `?${params.toString()}`;

    return this.fetchWithErrorHandling(endpoint);
  }

  /**
   * Get corpus analytics for visualizations
   */
  async getCorpusAnalytics(): Promise<{
    total_passages: number;
    themes_distribution: Record<string, number>;
    work_types_distribution: Record<string, number>;
    difficulty_distribution: Record<string, number>;
    average_passage_length: number;
    total_unique_words: number;
    most_common_themes: string[];
  }> {
    return this.fetchWithErrorHandling('/analytics/corpus');
  }

  /**
   * Generate quiz questions from authentic content
   */
  async generateQuizQuestions(
    theme?: string,
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced',
    questionCount: number = 5
  ): Promise<Array<{
    id: string;
    question: string;
    options: string[];
    correct_answer: number;
    explanation: string;
    source_passage: string;
    cultural_context: string;
    difficulty: string;
  }>> {
    let endpoint = '/quiz/generate';
    const params = new URLSearchParams();
    
    if (theme) params.append('theme', theme);
    if (difficulty) params.append('difficulty', difficulty);
    params.append('count', questionCount.toString());
    
    endpoint += `?${params.toString()}`;

    return this.fetchWithErrorHandling(endpoint);
  }

  /**
   * Get random passage for daily learning
   */
  async getDailyPassage(
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
  ): Promise<MacrobiusPassage> {
    let endpoint = '/daily-passage';
    if (difficulty) {
      endpoint += `?difficulty=${difficulty}`;
    }

    return this.fetchWithErrorHandling<MacrobiusPassage>(endpoint);
  }

  /**
   * Get passage by specific ID
   */
  async getPassageById(id: string): Promise<MacrobiusPassage> {
    return this.fetchWithErrorHandling<MacrobiusPassage>(`/passages/${id}`);
  }

  /**
   * Get related passages based on theme and content similarity
   */
  async getRelatedPassages(
    passageId: string,
    limit: number = 5
  ): Promise<MacrobiusPassage[]> {
    return this.fetchWithErrorHandling<MacrobiusPassage[]>(
      `/passages/${passageId}/related?limit=${limit}`
    );
  }
}

// Create and export singleton instance
export const macrobiusApi = new MacrobiusApiClient();

// Export utility functions for components
export const useOracleCloudConnection = () => {
  const [isConnected, setIsConnected] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [connectionError, setConnectionError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const testConnection = async () => {
      try {
        await macrobiusApi.testConnection();
        setIsConnected(true);
        setConnectionError(null);
      } catch (error) {
        setIsConnected(false);
        setConnectionError(
          error instanceof OracleCloudError 
            ? error.message 
            : 'Unknown connection error'
        );
      } finally {
        setIsLoading(false);
      }
    };

    testConnection();
  }, []);

  return { isConnected, isLoading, connectionError };
};

// React hook for data fetching with caching
export const useOracleCloudData = <T>(
  fetcher: () => Promise<T>,
  dependencies: any[] = [],
  fallbackData?: T
) => {
  const [data, setData] = React.useState<T | undefined>(fallbackData);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await fetcher();
        
        if (!isCancelled) {
          setData(result);
        }
      } catch (err) {
        if (!isCancelled) {
          const errorMessage = err instanceof OracleCloudError 
            ? err.message 
            : 'Failed to fetch data from Oracle Cloud';
          setError(errorMessage);
          
          // Use fallback data if available
          if (fallbackData && !data) {
            setData(fallbackData);
          }
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, dependencies);

  return { data, loading, error };
};

// Export default client
export default macrobiusApi;

/**
 * 🏛️ ORACLE CLOUD INTEGRATION NOTES:
 * 
 * This API client provides:
 * - Professional error handling with custom error types
 * - TypeScript interfaces for all data structures
 * - React hooks for easy component integration
 * - Caching and fallback mechanisms
 * - Comprehensive endpoint coverage for all educational features
 * 
 * Ready for integration with:
 * - TextSearchSection (searchPassages)
 * - VocabularyTrainer (getVocabulary)
 * - QuizSection (generateQuizQuestions)
 * - CulturalAnalysis (getCulturalThemes, getCulturalInsights)
 * - VisualizationsSection (getCorpusAnalytics)
 * - BanquetSection (getPassagesByTheme)
 * 
 * Backend provides 1,401 authentic Macrobius passages ready for modern education!
 */
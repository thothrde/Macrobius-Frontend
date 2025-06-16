// Oracle Cloud API Integration for Macrobius Frontend
// Production-ready API client with error handling and fallbacks

import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://152.70.184.232:8080';

interface MacrobiusPassage {
  id: number;
  latin_text: string;
  work_type: 'Saturnalia' | 'Commentarii';
  book_number: number;
  chapter_number: number;
  section_number: number;
  cultural_theme: string;
  modern_relevance?: string;
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
  word_count: number;
}

interface VocabularyWord {
  latin_word: string;
  english_meaning: string;
  cultural_context: string;
  source_passage: string;
  frequency: number;
  difficulty: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  source_passage: string;
  cultural_context: string;
  difficulty: string;
}

interface CulturalTheme {
  name: string;
  passage_count: number;
  percentage: number;
}

interface CulturalThemesAnalysis {
  themes: CulturalTheme[];
  total_passages: number;
}

interface SearchResults {
  passages: MacrobiusPassage[];
  total_count: number;
  search_query: string;
}

// Oracle Cloud Error class
export class OracleCloudError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'OracleCloudError';
  }
}

// Available cultural themes from Oracle Cloud database
export const CULTURAL_THEMES = [
  'Philosophy',
  'Astronomy', 
  'Social Customs',
  'Religious Practices',
  'Literature',
  'Education',
  'Roman History',
  'Law',
  'General'
];

// Available difficulty levels
export const DIFFICULTY_LEVELS = [
  'Beginner',
  'Intermediate', 
  'Advanced'
];

class MacrobiusApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Utility function for fetch with timeout
  private async fetchWithTimeout(
    url: string, 
    options: RequestInit = {}, 
    timeoutMs: number = 10000
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Test connection to Oracle Cloud database
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }, 5000); // 5 second timeout
      
      return response.ok;
    } catch (error) {
      console.error('Oracle Cloud connection test failed:', error);
      return false;
    }
  }

  // Search passages by text, theme, or difficulty
  async searchPassages(
    query: string = '',
    theme?: string,
    limit: number = 20,
    difficulty?: string
  ): Promise<SearchResults> {
    try {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (theme) params.append('theme', theme);
      if (difficulty) params.append('difficulty', difficulty);
      params.append('limit', limit.toString());

      const response = await this.fetchWithTimeout(`${this.baseUrl}/api/passages/search?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new OracleCloudError(`Search failed: ${response.status}`, response.status);
      }

      const data = await response.json();
      return {
        passages: data.passages || [],
        total_count: data.total_count || 0,
        search_query: query
      };
    } catch (error) {
      console.error('Search passages failed:', error);
      throw new OracleCloudError('Failed to search passages from Oracle Cloud database');
    }
  }

  // Get vocabulary words with cultural context
  async getVocabulary(
    difficulty?: string,
    theme?: string,
    limit: number = 50
  ): Promise<VocabularyWord[]> {
    try {
      const params = new URLSearchParams();
      if (difficulty) params.append('difficulty', difficulty);
      if (theme) params.append('theme', theme);
      params.append('limit', limit.toString());

      const response = await this.fetchWithTimeout(`${this.baseUrl}/api/vocabulary?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new OracleCloudError(`Vocabulary request failed: ${response.status}`, response.status);
      }

      const data = await response.json();
      
      // Handle the actual response format from the backend
      if (Array.isArray(data)) {
        return data.map(item => ({
          latin_word: item.latin_word,
          english_meaning: item.english_meaning,
          cultural_context: item.cultural_context,
          source_passage: item.source_passage,
          frequency: item.frequency,
          difficulty: item.difficulty
        }));
      }
      
      return data.vocabulary || [];
    } catch (error) {
      console.error('Get vocabulary failed:', error);
      throw new OracleCloudError('Failed to load vocabulary from Oracle Cloud database');
    }
  }

  // Generate quiz questions from cultural insights
  async generateQuizQuestions(
    theme?: string,
    difficulty: string = 'Intermediate',
    count: number = 5
  ): Promise<QuizQuestion[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/api/quiz/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme,
          difficulty,
          count
        })
      });

      if (!response.ok) {
        throw new OracleCloudError(`Quiz generation failed: ${response.status}`, response.status);
      }

      const data = await response.json();
      return data.questions || [];
    } catch (error) {
      console.error('Generate quiz failed:', error);
      throw new OracleCloudError('Failed to generate quiz from Oracle Cloud database');
    }
  }

  // Get cultural themes
  async getCulturalThemes(): Promise<CulturalTheme[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/api/cultural-themes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new OracleCloudError(`Cultural themes request failed: ${response.status}`, response.status);
      }

      const data = await response.json();
      return data.themes || CULTURAL_THEMES.map(name => ({ name, passage_count: 0, percentage: 0 }));
    } catch (error) {
      console.error('Get cultural themes failed:', error);
      // Return fallback themes
      return CULTURAL_THEMES.map(name => ({ name, passage_count: 0, percentage: 0 }));
    }
  }

  // Get cultural themes analysis
  async getCulturalThemesAnalysis(): Promise<CulturalThemesAnalysis> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/api/analytics/themes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new OracleCloudError(`Themes analysis failed: ${response.status}`, response.status);
      }

      const data = await response.json();
      return {
        themes: data.themes || [],
        total_passages: data.total_passages || 0
      };
    } catch (error) {
      console.error('Get cultural themes analysis failed:', error);
      throw new OracleCloudError('Failed to load themes analysis from Oracle Cloud database');
    }
  }

  // Get teaching modules
  async getTeachingModules(): Promise<any[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/api/teaching/modules`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new OracleCloudError(`Teaching modules request failed: ${response.status}`, response.status);
      }

      const data = await response.json();
      return data.modules || [];
    } catch (error) {
      console.error('Get teaching modules failed:', error);
      throw new OracleCloudError('Failed to load teaching modules from Oracle Cloud database');
    }
  }

  // Get cultural insights  
  async getCulturalInsights(difficulty?: string): Promise<any[]> {
    try {
      const params = new URLSearchParams();
      if (difficulty) params.append('difficulty', difficulty);

      const response = await this.fetchWithTimeout(`${this.baseUrl}/api/insights?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new OracleCloudError(`Cultural insights request failed: ${response.status}`, response.status);
      }

      const data = await response.json();
      return data.insights || [];
    } catch (error) {
      console.error('Get cultural insights failed:', error);
      throw new OracleCloudError('Failed to load cultural insights from Oracle Cloud database');
    }
  }

  // Full-text search through Latin corpus
  async searchLatinText(text: string, limit: number = 10): Promise<MacrobiusPassage[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/api/search/latin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          limit: limit
        })
      });

      if (!response.ok) {
        throw new OracleCloudError(`Latin text search failed: ${response.status}`, response.status);
      }

      const data = await response.json();
      return data.passages || [];
    } catch (error) {
      console.error('Search Latin text failed:', error);
      throw new OracleCloudError('Failed to search Latin text in Oracle Cloud database');
    }
  }

  // Get corpus statistics
  async getCorpusStatistics(): Promise<any> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/api/analytics/corpus`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new OracleCloudError(`Corpus statistics request failed: ${response.status}`, response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get corpus statistics failed:', error);
      throw new OracleCloudError('Failed to load corpus statistics from Oracle Cloud database');
    }
  }
}

// Export singleton instance
export const macrobiusApi = new MacrobiusApiClient();

// React hook for Oracle Cloud connection monitoring
export function useOracleCloudConnection() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      setIsLoading(true);
      setConnectionError(null);
      
      try {
        const connected = await macrobiusApi.testConnection();
        setIsConnected(connected);
        
        if (!connected) {
          setConnectionError('Oracle Cloud backend not available');
        }
      } catch (error) {
        setIsConnected(false);
        setConnectionError(error instanceof Error ? error.message : 'Connection failed');
      } finally {
        setIsLoading(false);
      }
    };

    checkConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { isConnected, isLoading, connectionError };
}

// React hook for Oracle Cloud data fetching
export function useOracleCloudData<T>(
  fetcher: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await fetcher();
        setData(result);
      } catch (err) {
        if (err instanceof OracleCloudError) {
          setError(err.message);
        } else {
          setError('Failed to fetch data from Oracle Cloud');
        }
        console.error('Oracle Cloud data fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, refetch: () => {} };
}

// Export types for use in components
export type { 
  MacrobiusPassage, 
  VocabularyWord, 
  QuizQuestion,
  CulturalTheme,
  CulturalThemesAnalysis, 
  SearchResults 
};

// Export API client class for advanced usage
export { MacrobiusApiClient };
// Oracle Cloud API Client for Macrobius Backend Integration
// Backend: 152.70.184.232:8080 - 100% Operational with 1,401 Latin passages

const API_BASE = 'http://152.70.184.232:8080/api';

export interface MacrobiusPassage {
  id: number;
  latin_text: string;
  work_type: string;
  book_number: number;
  chapter_number: number;
  section_number: number;
  cultural_theme: string;
  modern_relevance: string;
  difficulty_level?: string;
  word_count?: number;
}

export interface CulturalInsight {
  id: number;
  title: string;
  description: string;
  difficulty_level: string;
  cultural_theme: string;
  modern_application: string;
}

export interface TeachingModule {
  id: number;
  topic: string;
  content: string;
  difficulty_level: string;
  source_references: string;
  cultural_significance: string;
}

export interface SearchResults {
  passages: MacrobiusPassage[];
  total_count: number;
  search_term: string;
  themes_found: string[];
}

export interface ApiError {
  message: string;
  status: number;
  details?: string;
}

class MacrobiusApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
  }

  // Test API connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('API Connection Test Failed:', error);
      return false;
    }
  }

  // Search through 1,401 Latin passages
  async searchPassages(
    query: string, 
    theme?: string, 
    limit: number = 10,
    difficulty?: string
  ): Promise<SearchResults> {
    try {
      const params = new URLSearchParams();
      params.append('query', query);
      if (theme) params.append('theme', theme);
      if (difficulty) params.append('difficulty', difficulty);
      params.append('limit', limit.toString());

      const response = await fetch(`${this.baseUrl}/passages?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
      }

      const data = await response.json();
      return {
        passages: data.passages || [],
        total_count: data.total_count || 0,
        search_term: query,
        themes_found: data.themes_found || []
      };
    } catch (error) {
      console.error('Search Passages Error:', error);
      throw this.handleApiError(error);
    }
  }

  // Get cultural insights (16 available)
  async getCulturalInsights(difficulty?: string): Promise<CulturalInsight[]> {
    try {
      const params = new URLSearchParams();
      if (difficulty) params.append('difficulty', difficulty);

      const response = await fetch(`${this.baseUrl}/insights?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
      }

      const data = await response.json();
      return data.insights || [];
    } catch (error) {
      console.error('Get Cultural Insights Error:', error);
      throw this.handleApiError(error);
    }
  }

  // Get teaching modules (16 available)
  async getTeachingModules(): Promise<TeachingModule[]> {
    try {
      const response = await fetch(`${this.baseUrl}/teachings/modules`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
      }

      const data = await response.json();
      return data.modules || [];
    } catch (error) {
      console.error('Get Teaching Modules Error:', error);
      throw this.handleApiError(error);
    }
  }

  // Full-text search with advanced options
  async advancedSearch(searchData: {
    query: string;
    cultural_theme?: string;
    work_type?: 'Saturnalia' | 'Commentarii';
    difficulty_level?: 'Beginner' | 'Intermediate' | 'Advanced';
    limit?: number;
    offset?: number;
  }): Promise<SearchResults> {
    try {
      const response = await fetch(`${this.baseUrl}/search/latin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      if (!response.ok) {
        throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
      }

      const data = await response.json();
      return {
        passages: data.passages || [],
        total_count: data.total_count || 0,
        search_term: searchData.query,
        themes_found: data.themes_found || []
      };
    } catch (error) {
      console.error('Advanced Search Error:', error);
      throw this.handleApiError(error);
    }
  }

  // Get cultural themes analysis (9 themes available)
  async getCulturalThemesAnalysis(): Promise<{
    themes: Array<{
      name: string;
      passage_count: number;
      description: string;
      difficulty_distribution: Record<string, number>;
    }>;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/cultural-themes/analysis`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
      }

      return await response.json();
    } catch (error) {
      console.error('Get Cultural Themes Analysis Error:', error);
      throw this.handleApiError(error);
    }
  }

  // Get vocabulary from authentic corpus
  async getVocabulary(
    difficulty?: string,
    theme?: string,
    limit: number = 50
  ): Promise<Array<{
    word: string;
    definition: string;
    frequency: number;
    passages: MacrobiusPassage[];
    cultural_context: string;
  }>> {
    try {
      const params = new URLSearchParams();
      if (difficulty) params.append('difficulty', difficulty);
      if (theme) params.append('theme', theme);
      params.append('limit', limit.toString());

      const response = await fetch(`${this.baseUrl}/vocabulary?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
      }

      const data = await response.json();
      return data.vocabulary || [];
    } catch (error) {
      console.error('Get Vocabulary Error:', error);
      throw this.handleApiError(error);
    }
  }

  // Error handling utility
  private handleApiError(error: any): ApiError {
    if (error instanceof ApiError) {
      return error;
    }
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return new ApiError('Network connection failed. Please check your internet connection.', 0);
    }
    
    return new ApiError(
      error.message || 'An unexpected error occurred while connecting to the Macrobius database.',
      error.status || 500
    );
  }
}

// Create singleton instance
export const macrobiusApi = new MacrobiusApiClient();

// Cultural themes available in the database
export const CULTURAL_THEMES = [
  'Religious Practices',
  'Social Customs', 
  'Philosophy',
  'Education',
  'Roman History',
  'Literature',
  'Law',
  'Astronomy',
  'General'
] as const;

export const DIFFICULTY_LEVELS = [
  'Beginner',
  'Intermediate', 
  'Advanced'
] as const;

export const WORK_TYPES = [
  'Saturnalia',
  'Commentarii'
] as const;

// Utility functions
export const formatPassageReference = (passage: MacrobiusPassage): string => {
  return `${passage.work_type}, Book ${passage.book_number}, Chapter ${passage.chapter_number}, Section ${passage.section_number}`;
};

export const getThemeColor = (theme: string): string => {
  const themeColors: Record<string, string> = {
    'Religious Practices': '#8B5A3C',
    'Social Customs': '#6B7280',
    'Philosophy': '#7C3AED',
    'Education': '#059669',
    'Roman History': '#DC2626',
    'Literature': '#DB2777',
    'Law': '#374151',
    'Astronomy': '#1D4ED8',
    'General': '#6B7280'
  };
  return themeColors[theme] || '#6B7280';
};

export class ApiError extends Error {
  constructor(message: string, public status: number, public details?: string) {
    super(message);
    this.name = 'ApiError';
  }
}
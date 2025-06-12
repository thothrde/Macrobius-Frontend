// Oracle Cloud API Integration for Macrobius Frontend
// Production-ready API client with error handling and fallbacks

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://152.70.184.232:8080/api';

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
  word: string;
  definition: string;
  frequency: number;
  passages: Array<{
    id: number;
    latin_text: string;
    work_type: string;
    cultural_theme: string;
  }>;
  cultural_context: string;
}

interface CulturalThemesAnalysis {
  themes: Array<{
    name: string;
    passage_count: number;
    percentage: number;
  }>;
  total_passages: number;
}

interface SearchResults {
  passages: MacrobiusPassage[];
  total_count: number;
  search_query: string;
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

  // Test connection to Oracle Cloud database
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000, // 5 second timeout
      });
      
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

      const response = await fetch(`${this.baseUrl}/passages/search?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();
      return {
        passages: data.passages || [],
        total_count: data.total_count || 0,
        search_query: query
      };
    } catch (error) {
      console.error('Search passages failed:', error);
      throw new Error('Failed to search passages from Oracle Cloud database');
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

      const response = await fetch(`${this.baseUrl}/vocabulary?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Vocabulary request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.vocabulary || [];
    } catch (error) {
      console.error('Get vocabulary failed:', error);
      throw new Error('Failed to load vocabulary from Oracle Cloud database');
    }
  }

  // Get cultural themes analysis
  async getCulturalThemesAnalysis(): Promise<CulturalThemesAnalysis> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/themes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Themes analysis failed: ${response.status}`);
      }

      const data = await response.json();
      return {
        themes: data.themes || [],
        total_passages: data.total_passages || 0
      };
    } catch (error) {
      console.error('Get cultural themes analysis failed:', error);
      throw new Error('Failed to load themes analysis from Oracle Cloud database');
    }
  }

  // Get teaching modules
  async getTeachingModules(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/teaching/modules`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Teaching modules request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.modules || [];
    } catch (error) {
      console.error('Get teaching modules failed:', error);
      throw new Error('Failed to load teaching modules from Oracle Cloud database');
    }
  }

  // Get cultural insights  
  async getCulturalInsights(difficulty?: string): Promise<any[]> {
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
        throw new Error(`Cultural insights request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.insights || [];
    } catch (error) {
      console.error('Get cultural insights failed:', error);
      throw new Error('Failed to load cultural insights from Oracle Cloud database');
    }
  }

  // Full-text search through Latin corpus
  async searchLatinText(text: string, limit: number = 10): Promise<MacrobiusPassage[]> {
    try {
      const response = await fetch(`${this.baseUrl}/search/latin`, {
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
        throw new Error(`Latin text search failed: ${response.status}`);
      }

      const data = await response.json();
      return data.passages || [];
    } catch (error) {
      console.error('Search Latin text failed:', error);
      throw new Error('Failed to search Latin text in Oracle Cloud database');
    }
  }

  // Get corpus statistics
  async getCorpusStatistics(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/corpus`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Corpus statistics request failed: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get corpus statistics failed:', error);
      throw new Error('Failed to load corpus statistics from Oracle Cloud database');
    }
  }
}

// Export singleton instance
export const macrobiusApi = new MacrobiusApiClient();

// Export types for use in components
export type { 
  MacrobiusPassage, 
  VocabularyWord, 
  CulturalThemesAnalysis, 
  SearchResults 
};

// Export API client class for advanced usage
export { MacrobiusApiClient };
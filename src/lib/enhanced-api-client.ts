// ENHANCED API CLIENT - ORACLE CLOUD BACKEND INTEGRATION
// Complete Macrobius corpus (1,401 passages) + Cultural analysis ready

// Oracle Cloud Backend Configuration (100% Operational)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://152.70.184.232:8080'

// Enhanced API Response Types for Complete Backend
export interface ApiResponse<T> {
  data?: T
  error?: string
  status: 'success' | 'error'
  total?: number
  page?: number
  limit?: number
}

// Complete Macrobius Passage Interface (1,401 passages available)
export interface MacrobiusPassage {
  id: string
  work_type: 'Saturnalia' | 'Commentarii'
  book_number: number
  chapter_number: number
  section_number?: number
  latin_text: string
  cultural_theme: string
  modern_relevance: string
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  word_count: number
  character_count: number
  created_at: string
  updated_at: string
}

// Cultural Theme Interface (9 themes available)
export interface CulturalTheme {
  id: string
  name: string
  description: string
  passage_count: number
  representative_passages: string[]
  modern_applications: string[]
  educational_level: string
}

// Cultural Insight Interface (16 insights available)
export interface CulturalInsight {
  id: string
  title: string
  description: string
  ancient_context: string
  modern_relevance: string
  related_passages: string[]
  difficulty_level: string
  educational_value: string
  cross_references: string[]
}

// Teaching Module Interface (16 modules available)
export interface TeachingModule {
  id: string
  topic: string
  description: string
  learning_objectives: string[]
  source_passages: string[]
  difficulty_progression: string[]
  interactive_elements: string[]
  assessment_questions: string[]
  cultural_connections: string[]
}

// Vocabulary Interface (extracted from 235K+ characters)
export interface MacrobiusVocabulary {
  id: string
  latin_word: string
  frequency: number
  passages_found: string[]
  grammatical_forms: string[]
  semantic_contexts: string[]
  cultural_significance: string
  modern_cognates: string[]
  difficulty_rating: number
}

// Enhanced Search Filters
export interface SearchFilters {
  work_type?: 'Saturnalia' | 'Commentarii' | 'all'
  cultural_theme?: string
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced' | 'all'
  book_range?: { start: number; end: number }
  word_count_range?: { min: number; max: number }
  modern_relevance?: string
  sort_by?: 'relevance' | 'book_order' | 'difficulty' | 'length'
  limit?: number
  offset?: number
}

// API Helper Function with Enhanced Error Handling
async function apiRequest<T>(
  endpoint: string, 
  options?: RequestInit,
  retries: number = 3
): Promise<ApiResponse<T>> {
  let lastError: Error | null = null
  
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return { 
        data, 
        status: 'success',
        total: data.total,
        page: data.page,
        limit: data.limit
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error')
      
      // Wait before retry (exponential backoff)
      if (attempt < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
      }
    }
  }

  console.error('API Error after retries:', lastError)
  return { 
    error: lastError?.message || 'Network error',
    status: 'error' 
  }
}

// COMPLETE MACROBIUS CORPUS API (1,401 passages)
export const passagesApi = {
  // Search through complete corpus
  searchPassages: (query: string, filters?: SearchFilters) => {
    const params = new URLSearchParams()
    params.append('query', query)
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== 'all') {
          if (typeof value === 'object') {
            params.append(key, JSON.stringify(value))
          } else {
            params.append(key, value.toString())
          }
        }
      })
    }
    
    return apiRequest<{
      passages: MacrobiusPassage[]
      total: number
      cultural_themes: string[]
      difficulty_distribution: Record<string, number>
    }>(`/passages/search?${params.toString()}`)
  },

  // Get passage by ID
  getPassage: (passageId: string) => 
    apiRequest<MacrobiusPassage>(`/passages/${passageId}`),

  // Get passages by work type
  getPassagesByWork: (workType: 'Saturnalia' | 'Commentarii', limit: number = 50, offset: number = 0) =>
    apiRequest<{ passages: MacrobiusPassage[], total: number }>(
      `/passages/work/${workType}?limit=${limit}&offset=${offset}`
    ),

  // Get passages by cultural theme
  getPassagesByTheme: (theme: string, limit: number = 50, offset: number = 0) =>
    apiRequest<{ passages: MacrobiusPassage[], total: number }>(
      `/passages/theme/${theme}?limit=${limit}&offset=${offset}`
    ),

  // Get random passages for practice
  getRandomPassages: (count: number = 10, difficulty?: string) => {
    const params = difficulty ? `?difficulty=${difficulty}` : ''
    return apiRequest<{ passages: MacrobiusPassage[] }>(
      `/passages/random/${count}${params}`
    )
  },

  // Get passage statistics
  getCorpusStatistics: () =>
    apiRequest<{
      total_passages: number
      total_characters: number
      work_distribution: Record<string, number>
      theme_distribution: Record<string, number>
      difficulty_distribution: Record<string, number>
    }>('/passages/statistics')
}

// CULTURAL ANALYSIS API (9 themes + 16 insights)
export const culturalApi = {
  // Get all cultural themes
  getThemes: () =>
    apiRequest<{ themes: CulturalTheme[] }>('/cultural/themes'),

  // Get specific theme with passages
  getTheme: (themeId: string) =>
    apiRequest<CulturalTheme>(`/cultural/themes/${themeId}`),

  // Get all cultural insights  
  getInsights: () =>
    apiRequest<{ insights: CulturalInsight[] }>('/cultural/insights'),

  // Get specific insight
  getInsight: (insightId: string) =>
    apiRequest<CulturalInsight>(`/cultural/insights/${insightId}`),

  // Get insights by difficulty
  getInsightsByDifficulty: (difficulty: string) =>
    apiRequest<{ insights: CulturalInsight[] }>(`/cultural/insights/difficulty/${difficulty}`),

  // Search cultural content
  searchCultural: (query: string, type?: 'themes' | 'insights' | 'all') => {
    const params = new URLSearchParams()
    params.append('query', query)
    if (type) params.append('type', type)
    
    return apiRequest<{
      themes: CulturalTheme[]
      insights: CulturalInsight[]
      total: number
    }>(`/cultural/search?${params.toString()}`)
  }
}

// TEACHING MODULES API (16 modules)
export const teachingApi = {
  // Get all teaching modules
  getModules: () =>
    apiRequest<{ modules: TeachingModule[] }>('/teachings/modules'),

  // Get specific module
  getModule: (moduleId: string) =>
    apiRequest<TeachingModule>(`/teachings/modules/${moduleId}`),

  // Get modules by difficulty progression
  getModulesByProgression: (level: string) =>
    apiRequest<{ modules: TeachingModule[] }>(`/teachings/progression/${level}`),

  // Get module with related passages
  getModuleWithPassages: (moduleId: string) =>
    apiRequest<{
      module: TeachingModule
      passages: MacrobiusPassage[]
      cultural_context: CulturalInsight[]
    }>(`/teachings/modules/${moduleId}/complete`)
}

// VOCABULARY API (extracted from 235K+ characters)
export const vocabularyApi = {
  // Search vocabulary from corpus
  searchVocabulary: (query: string, filters?: {
    difficulty?: number
    frequency_min?: number
    cultural_theme?: string
    limit?: number
  }) => {
    const params = new URLSearchParams()
    params.append('query', query)
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString())
        }
      })
    }
    
    return apiRequest<{
      vocabulary: MacrobiusVocabulary[]
      total: number
      frequency_distribution: Record<string, number>
    }>(`/vocabulary/search?${params.toString()}`)
  },

  // Get vocabulary by frequency
  getHighFrequencyWords: (limit: number = 100) =>
    apiRequest<{ vocabulary: MacrobiusVocabulary[] }>(`/vocabulary/frequency/top/${limit}`),

  // Get vocabulary for specific passage
  getPassageVocabulary: (passageId: string) =>
    apiRequest<{ vocabulary: MacrobiusVocabulary[] }>(`/vocabulary/passage/${passageId}`),

  // Get vocabulary statistics
  getVocabularyStatistics: () =>
    apiRequest<{
      total_unique_words: number
      total_word_instances: number
      difficulty_distribution: Record<string, number>
      most_frequent_words: MacrobiusVocabulary[]
    }>('/vocabulary/statistics')
}

// QUIZ GENERATION API (from cultural insights)
export const quizApi = {
  // Generate quiz from cultural insights
  generateCulturalQuiz: (
    insightIds: string[], 
    difficulty: string = 'intermediate',
    questionCount: number = 10
  ) =>
    apiRequest<{
      quiz_id: string
      questions: Array<{
        id: string
        text: string
        answers: Array<{
          id: string
          text: string
          is_correct: boolean
          explanation: string
        }>
        cultural_context: string
        source_insight: string
      }>
    }>('/quiz/generate/cultural', {
      method: 'POST',
      body: JSON.stringify({
        insight_ids: insightIds,
        difficulty,
        question_count: questionCount
      })
    }),

  // Generate quiz from passages
  generatePassageQuiz: (
    passageIds: string[],
    questionTypes: string[] = ['comprehension', 'vocabulary', 'grammar']
  ) =>
    apiRequest('/quiz/generate/passages', {
      method: 'POST',
      body: JSON.stringify({
        passage_ids: passageIds,
        question_types: questionTypes
      })
    }),

  // Submit quiz results
  submitQuizResults: (quizId: string, answers: Record<string, string>) =>
    apiRequest('/quiz/submit', {
      method: 'POST',
      body: JSON.stringify({
        quiz_id: quizId,
        answers
      })
    })
}

// HEALTH CHECK & SYSTEM STATUS
export const systemApi = {
  // Backend health check
  healthCheck: () => apiRequest('/health'),
  
  // Database connection status
  databaseStatus: () => apiRequest('/status/database'),
  
  // System statistics
  getSystemStats: () => apiRequest<{
    total_passages: number
    total_cultural_themes: number
    total_insights: number
    total_teaching_modules: number
    backend_version: string
    last_updated: string
  }>('/status/stats')
}

// Export configuration
export { API_BASE_URL }

// Export default unified API client
export const MacrobiusAPI = {
  passages: passagesApi,
  cultural: culturalApi,
  teaching: teachingApi,
  vocabulary: vocabularyApi,
  quiz: quizApi,
  system: systemApi
}

export default MacrobiusAPI
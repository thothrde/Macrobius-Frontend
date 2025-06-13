// API Configuration and Utilities for Macrobius Backend Integration

// Backend API Base URL (Oracle Cloud Integration)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://152.70.184.232:8080'

// API Response Types
export interface ApiResponse<T> {
  data?: T
  error?: string
  status: 'success' | 'error'
}

export interface Category {
  id: number
  name: string
  description: string
}

export interface Quiz {
  id: number
  title: string
  description: string
  category_id: number
  difficulty: string
  language: string
}

export interface Question {
  id: number
  text_la: string
  text_de: string
  text_en: string
  answers: Answer[]
}

export interface Answer {
  id: number
  text_la: string
  text_de: string
  text_en: string
  is_correct: boolean
  explanation?: string
}

export interface TextSearchResult {
  id: number
  title: string
  content: string
  language: string
  category: string
  excerpt: string
}

export interface Language {
  code: string
  name: string
}

// API Helper Function
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return { data, status: 'success' }
  } catch (error) {
    console.error('API Error:', error)
    return { 
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 'error' 
    }
  }
}

// Quiz API Functions
export const quizApi = {
  // Get all quiz categories
  getCategories: () => apiRequest<{ categories: Category[] }>('/quiz/categories'),
  
  // Get quizzes by category
  getQuizzes: (categoryId?: number, language?: string) => {
    const params = new URLSearchParams()
    if (categoryId) params.append('category_id', categoryId.toString())
    if (language) params.append('language', language)
    const query = params.toString() ? `?${params.toString()}` : ''
    return apiRequest<{ quizzes: Quiz[] }>(`/quiz/quizzes${query}`)
  },
  
  // Get questions for a specific quiz
  getQuestions: (quizId: number, language?: string) => {
    const params = language ? `?language=${language}` : ''
    return apiRequest<{ questions: Question[] }>(`/quiz/quizzes/${quizId}/questions${params}`)
  },
  
  // Get user results
  getResults: (userId: number, quizId: number) => {
    return apiRequest(`/quiz/results?user_id=${userId}&quiz_id=${quizId}`)
  }
}

// Text API Functions
export const textApi = {
  // Get available languages
  getLanguages: () => apiRequest<Language[]>('/text/languages'),
  
  // Get text categories
  getCategories: (language?: string) => {
    const params = language ? `?language=${language}` : ''
    return apiRequest<{ categories: Category[] }>(`/text/categories${params}`)
  },
  
  // Search texts
  searchTexts: (query: string, language?: string, category?: string, page: number = 1) => {
    const params = new URLSearchParams()
    params.append('query', query)
    if (language) params.append('language', language)
    if (category) params.append('category', category)
    params.append('page', page.toString())
    return apiRequest<{ results: TextSearchResult[], total: number }>(`/text/search?${params.toString()}`)
  },
  
  // Get text by ID
  getText: (textId: number, language?: string) => {
    const params = language ? `?language=${language}` : ''
    return apiRequest<TextSearchResult>(`/text/text/${textId}${params}`)
  }
}

// Health Check
export const healthCheck = () => apiRequest('/text/health')

// Export the base URL for direct use if needed
export { API_BASE_URL }
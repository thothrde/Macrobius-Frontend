/**
 * 🚀 ADVANCED API CLIENT SERVICE
 * Complete integration with Oracle Cloud advanced endpoints
 * 
 * ✨ ADVANCED API FEATURES:
 * - 🧠 Semantic Query Analysis (AI-powered natural language processing)
 * - 📚 Corpus Vocabulary Analysis (2000+ words from 1,401 passages)
 * - 📖 Progressive Reading Analysis (difficulty ranking and scaffolding)
 * - 🔍 KWIC Research Analysis (Keywords in Context for scholarly research)
 * - 📱 Mobile Sync Optimization (bandwidth and battery optimized)
 * - ⚡ Performance Monitoring (response time tracking and optimization)
 * - 🔄 Intelligent Caching (API response caching with TTL)
 * - 🛡️ Error Handling (robust retry logic and fallback strategies)
 */

interface APIConfig {
  baseURL: string;
  timeout: number;
  retryAttempts: number;
  cacheEnabled: boolean;
  cacheTTL: number;
  mobileOptimizations: boolean;
}

interface SemanticQueryRequest {
  query: string;
  user_context: {
    learning_level: 'beginner' | 'intermediate' | 'advanced';
    cultural_interests: string[];
    recent_topics: string[];
    performance_profile: Record<string, number>;
  };
  search_parameters: {
    max_results: number;
    include_related_concepts: boolean;
    expand_synonyms: boolean;
    filter_by_difficulty: boolean;
  };
  mobile_optimization: {
    compress_response: boolean;
    limit_metadata: boolean;
    prioritize_cache: boolean;
  };
}

interface SemanticQueryResponse {
  query_analysis: {
    original_query: string;
    extracted_concepts: string[];
    latin_synonyms: string[];
    cultural_expansions: string[];
    difficulty_assessment: number;
    learning_intent: string;
  };
  search_results: {
    passage_id: string;
    relevance_score: number;
    concept_match_score: number;
    difficulty_match_score: number;
    cultural_relevance: number;
    passage_preview: string;
    highlighted_terms: Array<{ term: string; start: number; end: number; type: string; }>;
  }[];
  personalized_recommendations: {
    suggested_queries: string[];
    related_topics: string[];
    difficulty_progression: string[];
    cultural_connections: string[];
  };
  performance_metrics: {
    processing_time_ms: number;
    concepts_analyzed: number;
    passages_evaluated: number;
    cache_hit_rate: number;
  };
}

interface CorpusAnalysisResponse {
  vocabulary_statistics: {
    total_unique_words: number;
    words_by_frequency: Array<{
      word: string;
      frequency: number;
      passages_found: number;
      difficulty_rating: number;
      cultural_significance: number;
    }>;
    words_by_difficulty: Record<string, Array<{
      word: string;
      translation: string;
      examples: string[];
      cultural_context: string;
    }>>;
    morphological_analysis: {
      noun_declensions: Record<string, number>;
      verb_conjugations: Record<string, number>;
      adjective_patterns: Record<string, number>;
      syntax_complexity: Record<string, number>;
    };
  };
  cultural_themes: {
    theme: string;
    vocabulary_count: number;
    key_concepts: string[];
    difficulty_progression: string[];
    modern_relevance_score: number;
  }[];
  learning_pathways: {
    beginner_vocabulary: string[];
    intermediate_vocabulary: string[];
    advanced_vocabulary: string[];
    suggested_learning_order: Array<{
      word: string;
      prerequisites: string[];
      learning_priority: number;
    }>;
  };
  etymology_insights: {
    latin_roots: Record<string, string[]>;
    modern_derivatives: Record<string, string[]>;
    cross_cultural_connections: Record<string, string[]>;
  };
}

interface ProgressiveAnalysisRequest {
  user_profile: {
    current_level: number;
    vocabulary_mastery: Record<string, number>;
    grammar_familiarity: Record<string, number>;
    cultural_knowledge: Record<string, number>;
    reading_speed: number;
    comprehension_scores: Record<string, number>;
  };
  content_preferences: {
    preferred_themes: string[];
    optimal_passage_length: number;
    difficulty_tolerance: number;
    scaffolding_preferences: string[];
  };
  analysis_parameters: {
    include_all_passages: boolean;
    focus_on_gaps: boolean;
    progressive_difficulty: boolean;
    cultural_context_priority: boolean;
  };
}

interface ProgressiveAnalysisResponse {
  difficulty_rankings: {
    passage_id: string;
    overall_difficulty: number;
    vocabulary_complexity: number;
    grammatical_complexity: number;
    cultural_sophistication: number;
    recommended_for_user: boolean;
    prerequisite_skills: string[];
  }[];
  learning_progression: {
    current_level_passages: string[];
    next_level_passages: string[];
    skill_building_sequence: Array<{
      step: number;
      focus_area: string;
      recommended_passages: string[];
      learning_objectives: string[];
      estimated_time: number;
    }>;
  };
  personalized_scaffolding: {
    vocabulary_support_needed: string[];
    grammar_concepts_to_review: string[];
    cultural_background_required: string[];
    reading_strategies: string[];
  };
  adaptive_recommendations: {
    immediate_next_steps: string[];
    weekly_learning_plan: Array<{
      day: number;
      focus: string;
      passages: string[];
      activities: string[];
    }>;
    long_term_goals: string[];
  };
}

interface KWICAnalysisRequest {
  search_term: string;
  context_window: number;
  analysis_type: 'concordance' | 'collocation' | 'semantic_field' | 'frequency';
  filters: {
    cultural_themes: string[];
    difficulty_levels: string[];
    passage_sources: string[];
    time_periods: string[];
  };
  output_format: {
    include_statistics: boolean;
    include_visualizations: boolean;
    scholarly_citations: boolean;
    export_format: 'json' | 'csv' | 'xml' | 'latex';
  };
}

interface KWICAnalysisResponse {
  concordance_lines: {
    passage_id: string;
    left_context: string;
    keyword: string;
    right_context: string;
    cultural_theme: string;
    difficulty_level: string;
    source_citation: string;
    semantic_classification: string;
  }[];
  collocation_analysis: {
    word: string;
    collocates: Array<{
      term: string;
      frequency: number;
      mi_score: number;
      t_score: number;
      semantic_relation: string;
    }>;
    pattern_strength: number;
  }[];
  frequency_statistics: {
    total_occurrences: number;
    frequency_per_1000_words: number;
    distribution_by_theme: Record<string, number>;
    distribution_by_difficulty: Record<string, number>;
    chronological_distribution: Record<string, number>;
  };
  semantic_analysis: {
    primary_meanings: string[];
    semantic_field: string;
    related_concepts: string[];
    cultural_connotations: string[];
    usage_patterns: string[];
  };
  scholarly_data: {
    citations_generated: string[];
    academic_references: string[];
    research_applications: string[];
    export_data: string;
  };
}

interface MobileSyncRequest {
  device_info: {
    platform: 'ios' | 'android';
    app_version: string;
    os_version: string;
    device_capabilities: {
      storage_available: number;
      network_type: string;
      battery_level: number;
      performance_class: 'low' | 'medium' | 'high';
    };
  };
  sync_data: {
    user_profile: any;
    learning_progress: any;
    offline_sessions: any[];
    cached_content_metadata: any;
  };
  sync_preferences: {
    compress_data: boolean;
    incremental_sync: boolean;
    priority_content_types: string[];
    bandwidth_limit: number;
  };
}

interface MobileSyncResponse {
  sync_status: {
    success: boolean;
    conflicts_resolved: number;
    data_merged: boolean;
    errors: string[];
  };
  optimized_data: {
    compressed_size_kb: number;
    original_size_kb: number;
    compression_ratio: number;
    content_priority_applied: boolean;
  };
  mobile_optimizations: {
    battery_usage_optimized: boolean;
    network_usage_minimized: boolean;
    storage_usage_optimized: boolean;
    ui_performance_enhanced: boolean;
  };
  next_sync_recommendations: {
    optimal_sync_time: string;
    content_to_prefetch: string[];
    cache_cleanup_suggested: boolean;
    estimated_duration: number;
  };
}

// 🚀 ADVANCED API CLIENT CLASS
class AdvancedAPIClient {
  private static instance: AdvancedAPIClient;
  private config: APIConfig;
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();
  private requestQueue: Array<{ request: Promise<any>; timestamp: number }> = [];
  private performanceMetrics: {
    totalRequests: number;
    averageResponseTime: number;
    cacheHitRate: number;
    errorRate: number;
  } = {
    totalRequests: 0,
    averageResponseTime: 0,
    cacheHitRate: 0,
    errorRate: 0
  };

  private constructor(config: Partial<APIConfig> = {}) {
    this.config = {
      baseURL: 'http://152.70.184.232:8080',
      timeout: 30000,
      retryAttempts: 3,
      cacheEnabled: true,
      cacheTTL: 300000, // 5 minutes
      mobileOptimizations: true,
      ...config
    };
  }

  public static getInstance(config?: Partial<APIConfig>): AdvancedAPIClient {
    if (!AdvancedAPIClient.instance) {
      AdvancedAPIClient.instance = new AdvancedAPIClient(config);
    }
    return AdvancedAPIClient.instance;
  }

  // 🧠 SEMANTIC QUERY ANALYSIS
  async analyzeSemanticQuery(request: SemanticQueryRequest): Promise<SemanticQueryResponse> {
    const endpoint = '/api/semantic/analyze-query';
    const cacheKey = `semantic_${JSON.stringify(request).slice(0, 100)}`;
    
    try {
      // Check cache first
      if (this.config.cacheEnabled) {
        const cached = this.getFromCache(cacheKey);
        if (cached) {
          this.updatePerformanceMetrics(0, true);
          return cached;
        }
      }
      
      const startTime = Date.now();
      
      const response = await this.makeRequest<SemanticQueryResponse>(endpoint, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json',
          'X-Mobile-Optimized': this.config.mobileOptimizations.toString()
        }
      });
      
      const responseTime = Date.now() - startTime;
      this.updatePerformanceMetrics(responseTime, false);
      
      // Cache successful response
      if (this.config.cacheEnabled) {
        this.setCache(cacheKey, response, this.config.cacheTTL);
      }
      
      return response;
      
    } catch (error) {
      console.error('Semantic query analysis failed:', error);
      this.updatePerformanceMetrics(0, false, true);
      
      // Return fallback response
      return this.getFallbackSemanticResponse(request);
    }
  }

  // 📚 CORPUS VOCABULARY ANALYSIS
  async analyzeCorpusVocabulary(filters?: {
    themes?: string[];
    difficulty_levels?: string[];
    frequency_threshold?: number;
  }): Promise<CorpusAnalysisResponse> {
    const endpoint = '/api/vocabulary/corpus-analysis';
    const queryParams = filters ? `?${new URLSearchParams(filters as any).toString()}` : '';
    const cacheKey = `corpus_analysis_${queryParams}`;
    
    try {
      // Check cache first
      if (this.config.cacheEnabled) {
        const cached = this.getFromCache(cacheKey);
        if (cached) {
          this.updatePerformanceMetrics(0, true);
          return cached;
        }
      }
      
      const startTime = Date.now();
      
      const response = await this.makeRequest<CorpusAnalysisResponse>(`${endpoint}${queryParams}`, {
        method: 'GET',
        headers: {
          'X-Mobile-Optimized': this.config.mobileOptimizations.toString()
        }
      });
      
      const responseTime = Date.now() - startTime;
      this.updatePerformanceMetrics(responseTime, false);
      
      // Cache with longer TTL for vocabulary data
      if (this.config.cacheEnabled) {
        this.setCache(cacheKey, response, this.config.cacheTTL * 2);
      }
      
      return response;
      
    } catch (error) {
      console.error('Corpus vocabulary analysis failed:', error);
      this.updatePerformanceMetrics(0, false, true);
      
      // Return fallback response
      return this.getFallbackCorpusResponse();
    }
  }

  // 📖 PROGRESSIVE READING ANALYSIS
  async analyzeProgressiveReading(request: ProgressiveAnalysisRequest): Promise<ProgressiveAnalysisResponse> {
    const endpoint = '/api/reading/progressive-analysis';
    const cacheKey = `progressive_${JSON.stringify(request.user_profile).slice(0, 50)}`;
    
    try {
      // Check cache first
      if (this.config.cacheEnabled) {
        const cached = this.getFromCache(cacheKey);
        if (cached) {
          this.updatePerformanceMetrics(0, true);
          return cached;
        }
      }
      
      const startTime = Date.now();
      
      const response = await this.makeRequest<ProgressiveAnalysisResponse>(endpoint, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json',
          'X-Mobile-Optimized': this.config.mobileOptimizations.toString()
        }
      });
      
      const responseTime = Date.now() - startTime;
      this.updatePerformanceMetrics(responseTime, false);
      
      // Cache with medium TTL for personalized data
      if (this.config.cacheEnabled) {
        this.setCache(cacheKey, response, this.config.cacheTTL / 2);
      }
      
      return response;
      
    } catch (error) {
      console.error('Progressive reading analysis failed:', error);
      this.updatePerformanceMetrics(0, false, true);
      
      // Return fallback response
      return this.getFallbackProgressiveResponse();
    }
  }

  // 🔍 KWIC RESEARCH ANALYSIS
  async analyzeKWIC(request: KWICAnalysisRequest): Promise<KWICAnalysisResponse> {
    const endpoint = '/api/research/kwic-analysis';
    const cacheKey = `kwic_${request.search_term}_${request.analysis_type}`;
    
    try {
      // Check cache first
      if (this.config.cacheEnabled) {
        const cached = this.getFromCache(cacheKey);
        if (cached) {
          this.updatePerformanceMetrics(0, true);
          return cached;
        }
      }
      
      const startTime = Date.now();
      
      const response = await this.makeRequest<KWICAnalysisResponse>(endpoint, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json',
          'X-Mobile-Optimized': this.config.mobileOptimizations.toString()
        }
      });
      
      const responseTime = Date.now() - startTime;
      this.updatePerformanceMetrics(responseTime, false);
      
      // Cache with longer TTL for research data
      if (this.config.cacheEnabled) {
        this.setCache(cacheKey, response, this.config.cacheTTL * 3);
      }
      
      return response;
      
    } catch (error) {
      console.error('KWIC analysis failed:', error);
      this.updatePerformanceMetrics(0, false, true);
      
      // Return fallback response
      return this.getFallbackKWICResponse(request);
    }
  }

  // 📱 MOBILE SYNC OPTIMIZATION
  async optimizedMobileSync(request: MobileSyncRequest): Promise<MobileSyncResponse> {
    const endpoint = '/api/mobile/sync';
    
    try {
      const startTime = Date.now();
      
      // Apply mobile-specific optimizations
      const optimizedRequest = this.applyMobileOptimizations(request);
      
      const response = await this.makeRequest<MobileSyncResponse>(endpoint, {
        method: 'POST',
        body: JSON.stringify(optimizedRequest),
        headers: {
          'Content-Type': 'application/json',
          'X-Device-Info': JSON.stringify(request.device_info),
          'X-Mobile-Sync': 'true'
        }
      });
      
      const responseTime = Date.now() - startTime;
      this.updatePerformanceMetrics(responseTime, false);
      
      return response;
      
    } catch (error) {
      console.error('Mobile sync failed:', error);
      this.updatePerformanceMetrics(0, false, true);
      
      // Return fallback response
      return this.getFallbackSyncResponse(request);
    }
  }

  // 🛠️ PRIVATE HELPER METHODS
  
  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit
  ): Promise<T> {
    const url = `${this.config.baseURL}${endpoint}`;
    
    // Implement retry logic
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data as T;
        
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < this.config.retryAttempts) {
          // Exponential backoff
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError || new Error('Request failed after all retry attempts');
  }
  
  private applyMobileOptimizations(request: MobileSyncRequest): MobileSyncRequest {
    const optimized = { ...request };
    
    // Compress data if requested and device supports it
    if (request.sync_preferences.compress_data) {
      // Apply compression logic (would use a compression library)
      optimized.sync_data = this.compressData(request.sync_data);
    }
    
    // Limit data based on device performance
    if (request.device_info.device_capabilities.performance_class === 'low') {
      optimized.sync_preferences.bandwidth_limit = Math.min(
        request.sync_preferences.bandwidth_limit,
        1024 // 1MB limit for low-performance devices
      );
    }
    
    return optimized;
  }
  
  private compressData(data: any): any {
    // Placeholder for data compression
    // In real implementation, would use LZ compression or similar
    return data;
  }
  
  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }
  
  private setCache(key: string, data: any, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
    
    // Cleanup old cache entries
    if (this.cache.size > 100) {
      const oldestKey = Array.from(this.cache.keys())[0];
      this.cache.delete(oldestKey);
    }
  }
  
  private updatePerformanceMetrics(responseTime: number, cacheHit: boolean, error = false): void {
    this.performanceMetrics.totalRequests++;
    
    if (error) {
      this.performanceMetrics.errorRate = 
        (this.performanceMetrics.errorRate * (this.performanceMetrics.totalRequests - 1) + 1) / 
        this.performanceMetrics.totalRequests;
    }
    
    if (cacheHit) {
      this.performanceMetrics.cacheHitRate = 
        (this.performanceMetrics.cacheHitRate * (this.performanceMetrics.totalRequests - 1) + 1) / 
        this.performanceMetrics.totalRequests;
    }
    
    if (responseTime > 0) {
      this.performanceMetrics.averageResponseTime = 
        (this.performanceMetrics.averageResponseTime * (this.performanceMetrics.totalRequests - 1) + responseTime) / 
        this.performanceMetrics.totalRequests;
    }
  }
  
  // 🔄 FALLBACK RESPONSES
  
  private getFallbackSemanticResponse(request: SemanticQueryRequest): SemanticQueryResponse {
    return {
      query_analysis: {
        original_query: request.query,
        extracted_concepts: [],
        latin_synonyms: [],
        cultural_expansions: [],
        difficulty_assessment: 5,
        learning_intent: 'general_search'
      },
      search_results: [],
      personalized_recommendations: {
        suggested_queries: [],
        related_topics: [],
        difficulty_progression: [],
        cultural_connections: []
      },
      performance_metrics: {
        processing_time_ms: 0,
        concepts_analyzed: 0,
        passages_evaluated: 0,
        cache_hit_rate: 0
      }
    };
  }
  
  private getFallbackCorpusResponse(): CorpusAnalysisResponse {
    return {
      vocabulary_statistics: {
        total_unique_words: 0,
        words_by_frequency: [],
        words_by_difficulty: {},
        morphological_analysis: {
          noun_declensions: {},
          verb_conjugations: {},
          adjective_patterns: {},
          syntax_complexity: {}
        }
      },
      cultural_themes: [],
      learning_pathways: {
        beginner_vocabulary: [],
        intermediate_vocabulary: [],
        advanced_vocabulary: [],
        suggested_learning_order: []
      },
      etymology_insights: {
        latin_roots: {},
        modern_derivatives: {},
        cross_cultural_connections: {}
      }
    };
  }
  
  private getFallbackProgressiveResponse(): ProgressiveAnalysisResponse {
    return {
      difficulty_rankings: [],
      learning_progression: {
        current_level_passages: [],
        next_level_passages: [],
        skill_building_sequence: []
      },
      personalized_scaffolding: {
        vocabulary_support_needed: [],
        grammar_concepts_to_review: [],
        cultural_background_required: [],
        reading_strategies: []
      },
      adaptive_recommendations: {
        immediate_next_steps: [],
        weekly_learning_plan: [],
        long_term_goals: []
      }
    };
  }
  
  private getFallbackKWICResponse(request: KWICAnalysisRequest): KWICAnalysisResponse {
    return {
      concordance_lines: [],
      collocation_analysis: [],
      frequency_statistics: {
        total_occurrences: 0,
        frequency_per_1000_words: 0,
        distribution_by_theme: {},
        distribution_by_difficulty: {},
        chronological_distribution: {}
      },
      semantic_analysis: {
        primary_meanings: [],
        semantic_field: '',
        related_concepts: [],
        cultural_connotations: [],
        usage_patterns: []
      },
      scholarly_data: {
        citations_generated: [],
        academic_references: [],
        research_applications: [],
        export_data: ''
      }
    };
  }
  
  private getFallbackSyncResponse(request: MobileSyncRequest): MobileSyncResponse {
    return {
      sync_status: {
        success: false,
        conflicts_resolved: 0,
        data_merged: false,
        errors: ['Sync service unavailable - cached offline']
      },
      optimized_data: {
        compressed_size_kb: 0,
        original_size_kb: 0,
        compression_ratio: 0,
        content_priority_applied: false
      },
      mobile_optimizations: {
        battery_usage_optimized: false,
        network_usage_minimized: false,
        storage_usage_optimized: false,
        ui_performance_enhanced: false
      },
      next_sync_recommendations: {
        optimal_sync_time: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        content_to_prefetch: [],
        cache_cleanup_suggested: false,
        estimated_duration: 0
      }
    };
  }
  
  // 📊 PUBLIC PERFORMANCE METHODS
  
  public getPerformanceMetrics() {
    return { ...this.performanceMetrics };
  }
  
  public clearCache(): void {
    this.cache.clear();
  }
  
  public updateConfig(newConfig: Partial<APIConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// 🚀 EXPORT ADVANCED API CLIENT
export default AdvancedAPIClient;
export type {
  APIConfig,
  SemanticQueryRequest,
  SemanticQueryResponse,
  CorpusAnalysisResponse,
  ProgressiveAnalysisRequest,
  ProgressiveAnalysisResponse,
  KWICAnalysisRequest,
  KWICAnalysisResponse,
  MobileSyncRequest,
  MobileSyncResponse
};
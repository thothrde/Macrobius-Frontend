# 🏛️ MACROBIUS BACKEND ENDPOINTS - SEMANTIC SEARCH & READING COMPREHENSION

## 🎯 IMPLEMENTATION REQUIRED ON ORACLE CLOUD (152.70.184.232:8080)

These endpoints need to be implemented on the Oracle Cloud backend to complete the **Semantic Search Integration** and **Reading Comprehension Assistant** features.

---

## 🧠 SEMANTIC SEARCH ENDPOINTS

### 1. Analyze Natural Language Query
```python
@app.route('/api/semantic/analyze-query', methods=['POST'])
def analyze_natural_language_query():
    """
    Analyze natural language queries to extract concepts and suggest filters
    
    Request:
    {
        "query": "What does Macrobius say about Roman dinner customs?",
        "context_type": "educational",
        "language": "latin",
        "timestamp": "2025-06-18T..."
    }
    
    Response:
    {
        "detected_intent": "search_cultural_practices",
        "extracted_concepts": ["Roman dining customs", "convivium", "social hierarchy"],
        "suggested_filters": {
            "cultural_theme": "Social Customs",
            "work_type": "Saturnalia",
            "difficulty_level": "intermediate"
        },
        "confidence": 0.87,
        "similar_queries": ["What were Roman banquet customs?", "How did Romans conduct dinner parties?"],
        "semantic_context": "Roman cultural practices and social customs",
        "educational_focus": ["cultural_understanding", "historical_context"]
    }
    """
    data = request.json
    query = data.get('query', '')
    
    # Implement NLP analysis here
    # Use existing MACROBIUS_COMPLETE_TEXTS to find concept patterns
    # Return structured analysis
    
    analysis = analyze_query_semantics(query)
    return jsonify(analysis)

def analyze_query_semantics(query):
    """Extract concepts and suggest educational filters"""
    # Implementation using existing corpus data
    # Could use keyword matching, pattern recognition, or simple NLP
    pass
```

### 2. Semantic Search
```python
@app.route('/api/semantic/search', methods=['POST'])
def semantic_search():
    """
    Perform semantic search with concept matching
    
    Request:
    {
        "semantic_query": {
            "natural_language": "Roman dining customs",
            "concepts": ["convivium", "Roman dining"],
            "themes": ["Social Customs"],
            "similarity_threshold": 0.7,
            "context_type": "educational"
        },
        "filters": {
            "work_type": "Saturnalia",
            "difficulty_level": "intermediate"
        },
        "ranking_mode": "educational_relevance"
    }
    
    Response:
    {
        "passages": [...],  # Enhanced MacrobiusPassage objects
        "semantic_matches": [
            {
                "passage_id": "sat_1_2_3",
                "similarity_score": 0.85,
                "concept_matches": ["convivium", "dining"],
                "thematic_relevance": 0.92,
                "educational_value": 0.88
            }
        ],
        "total": 23
    }
    """
    data = request.json
    semantic_query = data.get('semantic_query', {})
    filters = data.get('filters', {})
    
    # Use existing database to find semantically relevant passages
    results = perform_semantic_matching(semantic_query, filters)
    return jsonify(results)

def perform_semantic_matching(semantic_query, filters):
    """Match passages based on semantic similarity"""
    # Implementation using existing MACROBIUS_COMPLETE_TEXTS
    # Enhance search with concept matching and thematic relevance
    pass
```

### 3. Concept Clustering
```python
@app.route('/api/semantic/cluster-concepts', methods=['POST'])
def cluster_concepts():
    """
    Generate concept clusters from passages
    
    Request:
    {
        "passage_ids": ["sat_1_2_3", "sat_2_1_4"],
        "clustering_mode": "educational",
        "min_cluster_size": 3,
        "similarity_threshold": 0.7
    }
    
    Response:
    {
        "clusters": [
            {
                "id": "social-customs",
                "name": "Roman Social Customs",
                "description": "Passages dealing with Roman social practices",
                "passages": ["sat_1_2_3", "sat_2_1_4"],
                "similarity_score": 0.85,
                "key_themes": ["dining", "social hierarchy"],
                "educational_value": 0.9,
                "complexity_level": "intermediate",
                "related_clusters": ["philosophical-discourse"]
            }
        ]
    }
    """
    data = request.json
    passage_ids = data.get('passage_ids', [])
    
    # Group passages by thematic similarity
    clusters = generate_concept_clusters(passage_ids)
    return jsonify({'clusters': clusters})

def generate_concept_clusters(passage_ids):
    """Group passages into thematic clusters"""
    # Implementation using existing cultural themes and passage analysis
    pass
```

---

## 📚 READING COMPREHENSION ENDPOINTS

### 4. Generate Reading Assistance
```python
@app.route('/api/reading-assistance/generate', methods=['POST'])
def generate_reading_assistance():
    """
    Generate comprehensive reading assistance for a passage
    
    Request:
    {
        "passage_id": "sat_1_2_3",
        "difficulty_level": "guided",
        "focus_areas": ["vocabulary", "grammar", "culture"],
        "language_pair": "latin-english",
        "cultural_context": true
    }
    
    Response:
    {
        "keyVocabulary": [
            {
                "word": "convivae",
                "translation": "guests",
                "frequency": 45,
                "difficulty": 6,
                "culturalNote": "Roman dinner guests had specific social roles",
                "grammatical_info": {
                    "part_of_speech": "noun",
                    "inflection": "nominative plural",
                    "etymology": "From con- + vivere (to live together)"
                }
            }
        ],
        "grammaticalHelp": [
            {
                "feature": "Ablative Absolute",
                "explanation": "Independent construction expressing circumstance",
                "examples": ["Sole oriente", "Cena finita"],
                "difficulty": "intermediate",
                "learning_tips": ["Look for participial phrases"]
            }
        ],
        "culturalContext": "Roman dinner parties were social and educational institutions",
        "modernConnections": ["Modern dinner parties serve similar social functions"],
        "discussionPrompts": ["How does Roman dining compare to modern practices?"],
        "readingStrategy": {
            "recommended_approach": "guided_reading_with_context",
            "focus_areas": ["vocabulary_building", "cultural_understanding"],
            "estimated_time": 8
        }
    }
    """
    data = request.json
    passage_id = data.get('passage_id')
    
    # Get passage from database
    passage = get_passage_by_id(passage_id)
    if not passage:
        return jsonify({'error': 'Passage not found'}), 404
    
    # Generate comprehensive reading assistance
    assistance = create_reading_assistance(passage, data)
    return jsonify(assistance)

def create_reading_assistance(passage, options):
    """Create comprehensive reading assistance"""
    # Extract vocabulary from Latin text
    # Analyze grammatical patterns
    # Generate cultural context explanations
    # Create discussion prompts
    pass
```

### 5. Analyze Grammatical Patterns
```python
@app.route('/api/grammar/analyze-patterns', methods=['POST'])
def analyze_grammatical_patterns():
    """
    Analyze grammatical patterns in Latin text
    
    Request:
    {
        "latin_text": "Convivae igitur considerant...",
        "analysis_depth": "intermediate",
        "include_examples": true,
        "cultural_context": true
    }
    
    Response:
    {
        "patterns": [
            {
                "feature": "Perfect Tense",
                "explanation": "Indicates completed action",
                "examples": ["discubuere", "consederunt"],
                "difficulty": "beginner",
                "learning_tips": ["Look for -erunt endings"]
            }
        ]
    }
    """
    data = request.json
    latin_text = data.get('latin_text', '')
    
    # Analyze grammatical patterns in the text
    patterns = extract_grammatical_patterns(latin_text)
    return jsonify({'patterns': patterns})

def extract_grammatical_patterns(text):
    """Extract and analyze grammatical patterns"""
    # Pattern recognition for common Latin constructions
    # Could use regex patterns or simple morphological analysis
    pass
```

### 6. Extract Vocabulary
```python
@app.route('/api/vocabulary/extract', methods=['POST'])
def extract_vocabulary():
    """
    Extract and analyze vocabulary from Latin text
    
    Request:
    {
        "latin_text": "Convivae igitur considerant...",
        "difficulty_filter": "intermediate",
        "include_cultural_notes": true,
        "max_items": 20,
        "sort_by": "difficulty"
    }
    
    Response:
    {
        "vocabulary": [
            {
                "word": "convivae",
                "translation": "guests",
                "frequency": 45,
                "difficulty": 6,
                "culturalNote": "Roman dinner guests had specific social roles",
                "grammatical_info": {
                    "part_of_speech": "noun",
                    "inflection": "nominative plural"
                }
            }
        ]
    }
    """
    data = request.json
    latin_text = data.get('latin_text', '')
    
    # Extract vocabulary items from text
    vocabulary = analyze_vocabulary(latin_text, data)
    return jsonify({'vocabulary': vocabulary})

def analyze_vocabulary(text, options):
    """Extract and analyze vocabulary from Latin text"""
    # Word extraction and analysis
    # Could use existing vocabulary database or build from corpus
    pass
```

---

## 🛠️ IMPLEMENTATION STRATEGY

### Database Enhancements
```sql
-- Add tables for semantic search
CREATE TABLE SEMANTIC_CONCEPTS (
    concept_id VARCHAR2(50) PRIMARY KEY,
    concept_name VARCHAR2(200),
    theme_category VARCHAR2(100),
    related_passages CLOB, -- JSON array of passage IDs
    frequency_score NUMBER,
    educational_value NUMBER
);

CREATE TABLE VOCABULARY_ANALYSIS (
    word_id VARCHAR2(50) PRIMARY KEY,
    latin_word VARCHAR2(100),
    english_translation VARCHAR2(200),
    frequency_in_corpus NUMBER,
    difficulty_rating NUMBER,
    grammatical_info CLOB, -- JSON object
    cultural_context CLOB,
    source_passages CLOB -- JSON array
);

CREATE TABLE GRAMMATICAL_PATTERNS (
    pattern_id VARCHAR2(50) PRIMARY KEY,
    pattern_name VARCHAR2(100),
    description CLOB,
    difficulty_level VARCHAR2(20),
    examples CLOB, -- JSON array
    learning_tips CLOB -- JSON array
);
```

### Processing Functions
```python
def build_semantic_index():
    """Build semantic search index from existing corpus"""
    # Process all 1,401 passages to extract concepts
    # Build keyword and theme mappings
    # Create similarity matrices
    pass

def build_vocabulary_database():
    """Extract vocabulary from complete corpus"""
    # Process Latin text from all passages
    # Calculate word frequencies
    # Assign difficulty ratings
    # Add cultural context
    pass

def identify_grammatical_patterns():
    """Identify common grammatical patterns in corpus"""
    # Pattern recognition across all passages
    # Categorize by difficulty level
    # Create learning examples
    pass
```

---

## 📊 IMPLEMENTATION PRIORITY

### Phase 1: Basic Semantic Search (Immediate)
1. **Query Analysis Endpoint** - Extract concepts from natural language
2. **Enhanced Search** - Add concept matching to existing search
3. **Basic Clustering** - Group passages by existing cultural themes

### Phase 2: Reading Comprehension (Next)
1. **Vocabulary Extraction** - Build from existing corpus
2. **Grammar Pattern Recognition** - Identify common constructions
3. **Cultural Context Generation** - Use existing insights

### Phase 3: Advanced Features (Future)
1. **Machine Learning Integration** - Real semantic similarity
2. **Advanced Grammar Analysis** - Morphological parsing
3. **Personalized Learning Paths** - User progress tracking

---

## 🎯 IMMEDIATE DEVELOPMENT TASKS

1. **Create basic endpoints** with fallback to keyword matching
2. **Enhance existing search** to support concept-based filtering
3. **Build vocabulary extraction** from existing passage corpus
4. **Implement basic grammar pattern recognition** using regex
5. **Add cultural context generation** using existing insights

### Quick Implementation Using Existing Data
```python
# Use existing MACROBIUS_COMPLETE_TEXTS for semantic features
def quick_semantic_search(query, filters):
    # Enhance existing search with keyword matching
    # Use CULTURAL_THEME for concept grouping
    # Use MODERN_RELEVANCE for educational context
    pass

def quick_vocabulary_extraction(latin_text):
    # Split text into words
    # Use frequency analysis from corpus
    # Assign difficulty based on word length/complexity
    pass
```

**This provides a roadmap for implementing the backend endpoints needed to complete the Semantic Search and Reading Comprehension features in the Macrobius frontend!** 🏛️✨
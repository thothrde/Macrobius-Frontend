// Quiz API Implementation for Macrobius Educational Platform
// Note: Currently using mock data - API integration available when needed

// Quiz data types
export interface Category {
  id: number;
  name: string;
  description: string;
  slug: string;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  categoryId: number;
  questionCount: number;
  timeLimit?: number;
  isActive: boolean;
}

export interface Question {
  id: number;
  text_en: string;
  text_de: string;
  text_la: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank';
  difficulty: string;
  answers: Answer[];
  explanation?: string;
}

export interface Answer {
  id: number;
  text_en: string;
  text_de: string;
  text_la: string;
  is_correct: boolean;
  explanation?: string;
}

export interface QuizResult {
  quizId: number;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  completedAt: string;
}

// API Response wrapper
export interface APIResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: string;
  message?: string;
}

// Mock data for development/testing
const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Macrobius Basics',
    description: 'Fundamental concepts about Macrobius and his works',
    slug: 'macrobius-basics'
  },
  {
    id: 2,
    name: 'Saturnalia',
    description: 'Questions about the Saturnalia dialogues',
    slug: 'saturnalia'
  },
  {
    id: 3,
    name: 'Commentary on the Dream of Scipio',
    description: 'Questions about Macrobius\' commentary on Cicero\'s work',
    slug: 'commentary-scipio'
  },
  {
    id: 4,
    name: 'Philosophy and Neoplatonism',
    description: 'Philosophical concepts in Macrobius\' works',
    slug: 'philosophy-neoplatonism'
  }
];

const mockQuizzes: Quiz[] = [
  {
    id: 1,
    title: 'Introduction to Macrobius',
    description: 'Basic questions about Macrobius\' life and works',
    difficulty: 'Beginner',
    categoryId: 1,
    questionCount: 10,
    timeLimit: 600,
    isActive: true
  },
  {
    id: 2,
    title: 'Saturnalia Characters',
    description: 'Identify the characters in the Saturnalia dialogues',
    difficulty: 'Intermediate',
    categoryId: 2,
    questionCount: 15,
    timeLimit: 900,
    isActive: true
  },
  {
    id: 3,
    title: 'Dream of Scipio Analysis',
    description: 'Deep analysis of Macrobius\' commentary',
    difficulty: 'Advanced',
    categoryId: 3,
    questionCount: 20,
    timeLimit: 1200,
    isActive: true
  }
];

const mockQuestions: Question[] = [
  {
    id: 1,
    text_en: 'In which century did Macrobius live?',
    text_de: 'In welchem Jahrhundert lebte Macrobius?',
    text_la: 'Quo saeculo vixit Macrobius?',
    type: 'multiple_choice',
    difficulty: 'Beginner',
    answers: [
      {
        id: 1,
        text_en: '4th-5th century CE',
        text_de: '4.-5. Jahrhundert n. Chr.',
        text_la: 'Saeculo IV-V post Christum',
        is_correct: true,
        explanation: 'Macrobius lived during the late Roman Empire period'
      },
      {
        id: 2,
        text_en: '2nd-3rd century CE',
        text_de: '2.-3. Jahrhundert n. Chr.',
        text_la: 'Saeculo II-III post Christum',
        is_correct: false
      },
      {
        id: 3,
        text_en: '6th-7th century CE',
        text_de: '6.-7. Jahrhundert n. Chr.',
        text_la: 'Saeculo VI-VII post Christum',
        is_correct: false
      }
    ]
  },
  {
    id: 2,
    text_en: 'What is the main topic of the Saturnalia?',
    text_de: 'Was ist das Hauptthema der Saturnalia?',
    text_la: 'Quid est argumentum principale Saturnaliorum?',
    type: 'multiple_choice',
    difficulty: 'Intermediate',
    answers: [
      {
        id: 4,
        text_en: 'Philosophical discussions during the Saturnalia festival',
        text_de: 'Philosophische Diskussionen während des Saturnalia-Festes',
        text_la: 'Disputationes philosophicae tempore festi Saturnaliorum',
        is_correct: true,
        explanation: 'The Saturnalia presents learned discussions held during the Roman festival'
      },
      {
        id: 5,
        text_en: 'Military campaigns of the Roman Empire',
        text_de: 'Militärkampagnen des Römischen Reiches',
        text_la: 'Expeditiones militares Imperii Romani',
        is_correct: false
      },
      {
        id: 6,
        text_en: 'Agricultural practices in ancient Rome',
        text_de: 'Landwirtschaftliche Praktiken im antiken Rom',
        text_la: 'Usus agriculturae in Roma antiqua',
        is_correct: false
      }
    ]
  }
];

// Quiz API implementation
export const quizApi = {
  // Get all categories
  async getCategories(): Promise<APIResponse<{ categories: Category[] }>> {
    try {
      // In production, this would call the actual API
      // const response = await api.content.getCategories();
      
      // For now, return mock data
      return {
        status: 'success',
        data: { categories: mockCategories }
      };
    } catch (error) {
      return {
        status: 'error',
        error: 'Failed to fetch categories'
      };
    }
  },

  // Get quizzes for a category
  async getQuizzes(categoryId: number, language: string = 'en'): Promise<APIResponse<{ quizzes: Quiz[] }>> {
    try {
      // In production, this would call the actual API
      // const response = await api.quiz.getAvailableQuizzes({ categoryId, language });
      
      // For now, return mock data filtered by category
      const filteredQuizzes = mockQuizzes.filter(quiz => quiz.categoryId === categoryId);
      
      return {
        status: 'success',
        data: { quizzes: filteredQuizzes }
      };
    } catch (error) {
      return {
        status: 'error',
        error: 'Failed to fetch quizzes'
      };
    }
  },

  // Get questions for a quiz
  async getQuestions(quizId: number, language: string = 'en'): Promise<APIResponse<{ questions: Question[] }>> {
    try {
      // In production, this would call the actual API
      // const response = await api.quiz.getQuiz(quizId.toString());
      
      // For now, return mock questions
      // In a real implementation, questions would be filtered by quizId
      return {
        status: 'success',
        data: { questions: mockQuestions }
      };
    } catch (error) {
      return {
        status: 'error',
        error: 'Failed to fetch questions'
      };
    }
  },

  // Submit quiz answers
  async submitQuizAnswers(quizId: number, answers: number[], userId: string): Promise<APIResponse<QuizResult>> {
    try {
      // In production, this would call the actual API
      // const response = await api.quiz.submitQuizAnswers(quizId.toString(), { answers, userId });
      
      // For now, calculate a mock result
      const totalQuestions = mockQuestions.length;
      const correctAnswers = answers.filter((answerIndex, questionIndex) => {
        const question = mockQuestions[questionIndex];
        return question && question.answers[answerIndex]?.is_correct;
      }).length;
      
      const result: QuizResult = {
        quizId,
        userId,
        score: Math.round((correctAnswers / totalQuestions) * 100),
        totalQuestions,
        correctAnswers,
        timeSpent: 300, // Mock time spent in seconds
        completedAt: new Date().toISOString()
      };
      
      return {
        status: 'success',
        data: result
      };
    } catch (error) {
      return {
        status: 'error',
        error: 'Failed to submit quiz answers'
      };
    }
  },

  // Get quiz results
  async getQuizResults(quizId: number, userId: string): Promise<APIResponse<QuizResult[]>> {
    try {
      // In production, this would call the actual API
      // const response = await api.quiz.getQuizResults(quizId.toString(), userId);
      
      // For now, return mock results
      return {
        status: 'success',
        data: []
      };
    } catch (error) {
      return {
        status: 'error',
        error: 'Failed to fetch quiz results'
      };
    }
  },

  // Get user's quiz statistics
  async getUserQuizStats(userId: string): Promise<APIResponse<any>> {
    try {
      // In production, this would call the actual API
      // const response = await api.analytics.getUserAnalytics(userId);
      
      // For now, return mock stats
      return {
        status: 'success',
        data: {
          totalQuizzes: 5,
          averageScore: 78,
          totalTimeSpent: 1800,
          streak: 3,
          lastActivity: new Date().toISOString()
        }
      };
    } catch (error) {
      return {
        status: 'error',
        error: 'Failed to fetch user statistics'
      };
    }
  }
};

export default quizApi;
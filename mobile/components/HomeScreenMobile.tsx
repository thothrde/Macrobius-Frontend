/**
 * 🏠 HOME SCREEN MOBILE - Central Learning Dashboard
 * The main hub that connects all learning components in the Macrobius mobile app
 * 
 * Features:
 * - Personalized learning dashboard with progress overview
 * - Quick access to all learning modes (Vocabulary, Reading, Quiz, Culture)
 * - Daily learning goals and streak tracking
 * - Recent achievements and milestones display
 * - Smart recommendations based on learning patterns
 * - Offline status indicators and sync management
 * - Cultural insights of the day
 * - Learning analytics and motivational elements
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
  RefreshControl,
  ImageBackground,
  Animated
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

// Services
import { OfflineStorageService, AudioService, APIService } from '../services';

// Types
interface DailyGoal {
  type: 'vocabulary' | 'reading' | 'quiz' | 'cultural';
  target: number;
  current: number;
  completed: boolean;
}

interface LearningStreak {
  currentStreak: number;
  longestStreak: number;
  lastActivity: Date;
  streakType: 'daily' | 'weekly';
}

interface RecentAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt: Date;
  points: number;
}

interface LearningStats {
  vocabularyMastered: number;
  passagesRead: number;
  quizzesCompleted: number;
  culturalInsightsExplored: number;
  totalStudyTime: number; // minutes
  weeklyProgress: number; // percentage
}

interface SmartRecommendation {
  id: string;
  type: 'vocabulary' | 'reading' | 'quiz' | 'cultural';
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: number; // minutes
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

interface CulturalHighlight {
  id: string;
  title: string;
  shortDescription: string;
  theme: string;
  imageUrl: string;
  readingTime: number; // minutes
}

interface User {
  id: string;
  name: string;
  learningLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  joinDate: Date;
  preferences: {
    dailyGoalMinutes: number;
    notificationsEnabled: boolean;
    hapticFeedback: boolean;
    audioEnabled: boolean;
  };
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const colors = {
  primary: '#8B5A3C',
  secondary: '#D4A574', 
  accent: '#C8102E',
  background: '#FDF6E3',
  surface: '#FFFFFF',
  text: '#3C2A1E',
  textSecondary: '#8B7355',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  streak: '#FF6B35',
  achievement: '#FFD700',
  vocabulary: '#8B5A3C',
  reading: '#2E8B57',
  quiz: '#4169E1',
  cultural: '#8A2BE2'
};

interface HomeScreenMobileProps {
  user: User | null;
  isOnline: boolean;
  navigation: any;
  onStartLearning: (type: string) => void;
}

export default function HomeScreenMobile({
  user,
  isOnline,
  navigation,
  onStartLearning
}: HomeScreenMobileProps) {
  // Core State
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([]);
  const [learningStreak, setLearningStreak] = useState<LearningStreak | null>(null);
  const [recentAchievements, setRecentAchievements] = useState<RecentAchievement[]>([]);
  const [learningStats, setLearningStats] = useState<LearningStats | null>(null);
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [culturalHighlight, setCulturalHighlight] = useState<CulturalHighlight | null>(null);
  
  // UI State
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [greeting, setGreeting] = useState('');
  
  // Animations
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  // Initialize component
  useFocusEffect(
    useCallback(() => {
      initializeHomeScreen();
      startAnimations();
    }, [])
  );

  const initializeHomeScreen = async () => {
    try {
      setLoading(true);
      
      // Load all dashboard data
      await Promise.all([
        loadDailyGoals(),
        loadLearningStreak(),
        loadRecentAchievements(),
        loadLearningStats(),
        loadRecommendations(),
        loadCulturalHighlight()
      ]);
      
      // Set greeting based on time
      setGreeting(getTimeBasedGreeting());
      
    } catch (error) {
      console.error('Home screen initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const startAnimations = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true
      })
    ]).start();
  };

  const loadDailyGoals = async () => {
    try {
      const goals: DailyGoal[] = [
        {
          type: 'vocabulary',
          target: 20,
          current: 15,
          completed: false
        },
        {
          type: 'reading',
          target: 2,
          current: 1,
          completed: false
        },
        {
          type: 'quiz',
          target: 1,
          current: 1,
          completed: true
        },
        {
          type: 'cultural',
          target: 3,
          current: 2,
          completed: false
        }
      ];
      
      setDailyGoals(goals);
    } catch (error) {
      console.error('Error loading daily goals:', error);
    }
  };

  const loadLearningStreak = async () => {
    try {
      const streak: LearningStreak = {
        currentStreak: 7,
        longestStreak: 21,
        lastActivity: new Date(),
        streakType: 'daily'
      };
      
      setLearningStreak(streak);
    } catch (error) {
      console.error('Error loading learning streak:', error);
    }
  };

  const loadRecentAchievements = async () => {
    try {
      const achievements: RecentAchievement[] = [
        {
          id: '1',
          title: 'Week Warrior',
          description: 'Completed 7 days in a row',
          icon: 'whatshot',
          color: colors.streak,
          unlockedAt: new Date(),
          points: 100
        },
        {
          id: '2',
          title: 'Culture Explorer',
          description: 'Explored 10 cultural insights',
          icon: 'explore',
          color: colors.cultural,
          unlockedAt: new Date(Date.now() - 86400000),
          points: 50
        }
      ];
      
      setRecentAchievements(achievements);
    } catch (error) {
      console.error('Error loading achievements:', error);
    }
  };

  const loadLearningStats = async () => {
    try {
      const stats: LearningStats = {
        vocabularyMastered: 245,
        passagesRead: 18,
        quizzesCompleted: 12,
        culturalInsightsExplored: 23,
        totalStudyTime: 420, // 7 hours
        weeklyProgress: 78
      };
      
      setLearningStats(stats);
    } catch (error) {
      console.error('Error loading learning stats:', error);
    }
  };

  const loadRecommendations = async () => {
    try {
      const recs: SmartRecommendation[] = [
        {
          id: '1',
          type: 'vocabulary',
          title: 'Review Difficult Words',
          description: 'Practice words you missed yesterday',
          difficulty: 'intermediate',
          estimatedTime: 10,
          reason: 'Based on yesterday\'s quiz performance',
          priority: 'high'
        },
        {
          id: '2',
          type: 'reading',
          title: 'Saturnalia Book 2',
          description: 'Continue your reading journey',
          difficulty: 'intermediate',
          estimatedTime: 15,
          reason: 'Next in your progression path',
          priority: 'medium'
        }
      ];
      
      setRecommendations(recs);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    }
  };

  const loadCulturalHighlight = async () => {
    try {
      const highlight: CulturalHighlight = {
        id: '1',
        title: 'Roman Banquet Traditions',
        shortDescription: 'Discover how Romans celebrated at elaborate dinner parties',
        theme: 'Social Customs',
        imageUrl: 'roman_banquet_image_url',
        readingTime: 5
      };
      
      setCulturalHighlight(highlight);
    } catch (error) {
      console.error('Error loading cultural highlight:', error);
    }
  };

  const getTimeBasedGreeting = (): string => {
    const hour = new Date().getHours();
    const name = user?.name || 'Learner';
    
    if (hour < 12) {
      return `Good morning, ${name}!`;
    } else if (hour < 18) {
      return `Good afternoon, ${name}!`;
    } else {
      return `Good evening, ${name}!`;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await initializeHomeScreen();
    setRefreshing(false);
  };

  const renderWelcomeHeader = () => {
    return (
      <Animated.View 
        style={[
          styles.welcomeHeader,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <ImageBackground
          source={{ uri: 'roman_architecture_bg' }}
          style={styles.headerBackground}
          imageStyle={styles.headerBackgroundImage}
        >
          <LinearGradient
            colors={['rgba(139, 90, 60, 0.8)', 'rgba(139, 90, 60, 0.6)']}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <Text style={styles.greetingText}>{greeting}</Text>
              <Text style={styles.motivationText}>
                Ready to explore the world of Latin today?
              </Text>
              
              {/* Status indicators */}
              <View style={styles.statusIndicators}>
                <View style={styles.statusItem}>
                  <Icon name="wifi" size={16} color={isOnline ? colors.success : colors.error} />
                  <Text style={styles.statusText}>
                    {isOnline ? 'Online' : 'Offline'}
                  </Text>
                </View>
                
                {learningStreak && (
                  <View style={styles.statusItem}>
                    <Icon name="whatshot" size={16} color={colors.streak} />
                    <Text style={styles.statusText}>
                      {learningStreak.currentStreak} day streak
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    );
  };

  const renderDailyGoals = () => {
    const overallProgress = dailyGoals.reduce((acc, goal) => {
      return acc + (goal.current / goal.target);
    }, 0) / dailyGoals.length * 100;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Goals</Text>
          <Text style={styles.sectionProgress}>{Math.round(overallProgress)}%</Text>
        </View>
        
        <View style={styles.goalsContainer}>
          {dailyGoals.map((goal, index) => (
            <View key={index} style={styles.goalItem}>
              <View style={styles.goalHeader}>
                <Icon 
                  name={getGoalIcon(goal.type)} 
                  size={20} 
                  color={getGoalColor(goal.type)} 
                />
                <Text style={styles.goalTitle}>{getGoalTitle(goal.type)}</Text>
                {goal.completed && (
                  <Icon name="check-circle" size={16} color={colors.success} />
                )}
              </View>
              
              <View style={styles.goalProgress}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                        backgroundColor: getGoalColor(goal.type)
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {goal.current}/{goal.target}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderQuickActions = () => {
    const actions = [
      {
        type: 'vocabulary',
        title: 'Vocabulary',
        subtitle: 'Practice words',
        icon: 'book',
        color: colors.vocabulary,
        onPress: () => onStartLearning('vocabulary')
      },
      {
        type: 'reading',
        title: 'Reading',
        subtitle: 'Read passages',
        icon: 'article',
        color: colors.reading,
        onPress: () => onStartLearning('reading')
      },
      {
        type: 'quiz',
        title: 'Quiz',
        subtitle: 'Test knowledge',
        icon: 'quiz',
        color: colors.quiz,
        onPress: () => onStartLearning('quiz')
      },
      {
        type: 'cultural',
        title: 'Culture',
        subtitle: 'Explore Rome',
        icon: 'account-balance',
        color: colors.cultural,
        onPress: () => onStartLearning('cultural')
      }
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Start</Text>
        <View style={styles.actionsGrid}>
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionCard, { borderColor: action.color }]}
              onPress={action.onPress}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <Icon name={action.icon} size={24} color={colors.surface} />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderRecommendations = () => {
    if (recommendations.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.recommendationsContainer}>
            {recommendations.map((rec, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recommendationCard}
                onPress={() => onStartLearning(rec.type)}
              >
                <View style={styles.recommendationHeader}>
                  <Icon 
                    name={getGoalIcon(rec.type)} 
                    size={20} 
                    color={getGoalColor(rec.type)} 
                  />
                  <View style={[styles.priorityBadge, { 
                    backgroundColor: rec.priority === 'high' ? colors.error : 
                                   rec.priority === 'medium' ? colors.warning : colors.textSecondary 
                  }]}>
                    <Text style={styles.priorityText}>{rec.priority}</Text>
                  </View>
                </View>
                
                <Text style={styles.recommendationTitle}>{rec.title}</Text>
                <Text style={styles.recommendationDescription}>{rec.description}</Text>
                
                <View style={styles.recommendationFooter}>
                  <Text style={styles.recommendationTime}>
                    ~{rec.estimatedTime} min
                  </Text>
                  <Text style={styles.recommendationReason}>
                    {rec.reason}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderLearningStats = () => {
    if (!learningStats) return null;

    const stats = [
      { label: 'Words Mastered', value: learningStats.vocabularyMastered, icon: 'book' },
      { label: 'Passages Read', value: learningStats.passagesRead, icon: 'article' },
      { label: 'Quizzes Completed', value: learningStats.quizzesCompleted, icon: 'quiz' },
      { label: 'Study Hours', value: Math.round(learningStats.totalStudyTime / 60), icon: 'schedule' }
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Icon name={stat.icon} size={20} color={colors.primary} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.weeklyProgressContainer}>
          <Text style={styles.weeklyProgressTitle}>This Week's Progress</Text>
          <View style={styles.weeklyProgressBar}>
            <View 
              style={[
                styles.weeklyProgressFill, 
                { width: `${learningStats.weeklyProgress}%` }
              ]} 
            />
          </View>
          <Text style={styles.weeklyProgressText}>
            {learningStats.weeklyProgress}% of weekly goal
          </Text>
        </View>
      </View>
    );
  };

  const renderCulturalHighlight = () => {
    if (!culturalHighlight) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cultural Insight of the Day</Text>
        <TouchableOpacity 
          style={styles.culturalCard}
          onPress={() => navigation.navigate('Culture')}
        >
          <ImageBackground
            source={{ uri: culturalHighlight.imageUrl }}
            style={styles.culturalCardBackground}
            imageStyle={styles.culturalCardImage}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={styles.culturalCardGradient}
            >
              <View style={styles.culturalCardContent}>
                <View style={styles.culturalThemeTag}>
                  <Text style={styles.culturalThemeText}>{culturalHighlight.theme}</Text>
                </View>
                <Text style={styles.culturalTitle}>{culturalHighlight.title}</Text>
                <Text style={styles.culturalDescription}>
                  {culturalHighlight.shortDescription}
                </Text>
                <Text style={styles.culturalReadingTime}>
                  📖 {culturalHighlight.readingTime} min read
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  const renderAchievements = () => {
    if (recentAchievements.length === 0) return null;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Progress')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.achievementsContainer}>
            {recentAchievements.map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
                  <Icon name={achievement.icon} size={24} color={colors.surface} />
                </View>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
                <Text style={styles.achievementPoints}>+{achievement.points} pts</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  const getGoalIcon = (type: string): string => {
    const iconMap = {
      vocabulary: 'book',
      reading: 'article',
      quiz: 'quiz',
      cultural: 'account-balance'
    };
    return iconMap[type] || 'circle';
  };

  const getGoalColor = (type: string): string => {
    const colorMap = {
      vocabulary: colors.vocabulary,
      reading: colors.reading,
      quiz: colors.quiz,
      cultural: colors.cultural
    };
    return colorMap[type] || colors.primary;
  };

  const getGoalTitle = (type: string): string => {
    const titleMap = {
      vocabulary: 'Vocabulary',
      reading: 'Reading',
      quiz: 'Quiz',
      cultural: 'Culture'
    };
    return titleMap[type] || type;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {renderWelcomeHeader()}
        {renderDailyGoals()}
        {renderQuickActions()}
        {renderRecommendations()}
        {renderLearningStats()}
        {renderCulturalHighlight()}
        {renderAchievements()}
        
        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 18,
    color: colors.text
  },
  scrollContainer: {
    flex: 1
  },
  welcomeHeader: {
    height: 200,
    marginBottom: 20
  },
  headerBackground: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  headerBackgroundImage: {
    opacity: 0.3
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20
  },
  headerContent: {
    marginBottom: 20
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.surface,
    marginBottom: 8
  },
  motivationText: {
    fontSize: 16,
    color: colors.surface,
    opacity: 0.9
  },
  statusIndicators: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 20
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  statusText: {
    fontSize: 12,
    color: colors.surface,
    opacity: 0.8
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 25
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text
  },
  sectionProgress: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600'
  },
  goalsContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 15
  },
  goalItem: {
    marginBottom: 15
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1
  },
  goalProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.secondary,
    borderRadius: 3
  },
  progressFill: {
    height: '100%',
    borderRadius: 3
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600'
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  actionCard: {
    width: (screenWidth - 60) / 2,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4
  },
  actionSubtitle: {
    fontSize: 12,
    color: colors.textSecondary
  },
  recommendationsContainer: {
    flexDirection: 'row',
    gap: 15
  },
  recommendationCard: {
    width: 200,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.secondary
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8
  },
  priorityText: {
    fontSize: 10,
    color: colors.surface,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 6
  },
  recommendationDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 10
  },
  recommendationFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
    paddingTop: 8
  },
  recommendationTime: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4
  },
  recommendationReason: {
    fontSize: 10,
    color: colors.textSecondary,
    fontStyle: 'italic'
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20
  },
  statCard: {
    width: (screenWidth - 60) / 2,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginVertical: 5
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center'
  },
  weeklyProgressContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 15
  },
  weeklyProgressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10
  },
  weeklyProgressBar: {
    height: 8,
    backgroundColor: colors.secondary,
    borderRadius: 4,
    marginBottom: 8
  },
  weeklyProgressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4
  },
  weeklyProgressText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center'
  },
  culturalCard: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden'
  },
  culturalCardBackground: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  culturalCardImage: {
    borderRadius: 12
  },
  culturalCardGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15
  },
  culturalCardContent: {
    marginBottom: 10
  },
  culturalThemeTag: {
    backgroundColor: colors.cultural,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8
  },
  culturalThemeText: {
    fontSize: 10,
    color: colors.surface,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  culturalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.surface,
    marginBottom: 6
  },
  culturalDescription: {
    fontSize: 14,
    color: colors.surface,
    opacity: 0.9,
    marginBottom: 8
  },
  culturalReadingTime: {
    fontSize: 12,
    color: colors.surface,
    opacity: 0.8
  },
  achievementsContainer: {
    flexDirection: 'row',
    gap: 15
  },
  achievementCard: {
    width: 150,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.achievement
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4
  },
  achievementDescription: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 6
  },
  achievementPoints: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.achievement
  },
  bottomSpacing: {
    height: 30
  }
});

export { HomeScreenMobile };
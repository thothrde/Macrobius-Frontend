/**
 * 📱 MACROBIUS MOBILE APP - Main Application Entry Point
 * Complete React Native app for Latin learning with Roman cultural integration
 * 
 * Features:
 * - Navigation between all learning components
 * - User authentication and progress tracking
 * - Offline capability with data synchronization
 * - Audio and haptic feedback integration
 * - Achievement and notification systems
 * - Modern UI with smooth animations
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Alert
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';

// Components
import HomeScreenMobile from './components/HomeScreenMobile';
import { VocabularyTrainerMobile } from './components/VocabularyTrainerMobile';
import { ProgressiveReaderMobile } from './components/reading/ProgressiveReaderMobile';
import { SmartQuizMobile } from './components/quiz/SmartQuizMobile';
import { CulturalExplorerMobile } from './components/cultural/CulturalExplorerMobile';

// Services
import {
  OfflineStorageService,
  AudioService,
  APIService,
  NotificationService,
  SyncService,
  AnalyticsService,
  SecurityService
} from './services';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  learningLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  joinDate: Date;
  completedInsights: string[];
  achievementsEarned: string[];
  preferences: {
    dailyGoalMinutes: number;
    notificationsEnabled: boolean;
    hapticFeedback: boolean;
    audioEnabled: boolean;
  };
}

interface AppState {
  user: User | null;
  isOnline: boolean;
  isInitialized: boolean;
  currentLearningSession: any;
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const colors = {
  primary: '#8B5A3C',
  secondary: '#D4A574',
  accent: '#C8102E',
  background: '#FDF6E3',
  surface: '#FFFFFF',
  text: '#3C2A1E',
  textSecondary: '#8B7355',
  vocabulary: '#8B5A3C',
  reading: '#2E8B57',
  quiz: '#4169E1',
  cultural: '#8A2BE2'
};

// Tab Navigator Component
function MainTabNavigator({ user, isOnline, onStartLearning }: any) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Vocabulary':
              iconName = 'book';
              break;
            case 'Reading':
              iconName = 'article';
              break;
            case 'Quiz':
              iconName = 'quiz';
              break;
            case 'Culture':
              iconName = 'account-balance';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.secondary,
          paddingTop: 5,
          paddingBottom: 5,
          height: 60
        },
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTintColor: colors.surface,
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      })}
    >
      <Tab.Screen 
        name="Home" 
        options={{ title: 'Dashboard' }}
      >
        {(props) => (
          <HomeScreenMobile
            {...props}
            user={user}
            isOnline={isOnline}
            onStartLearning={onStartLearning}
          />
        )}
      </Tab.Screen>
      
      <Tab.Screen 
        name="Vocabulary" 
        options={{ title: 'Vocabulary' }}
      >
        {(props) => (
          <VocabularyTrainerMobile
            {...props}
            user={user}
            isOnline={isOnline}
          />
        )}
      </Tab.Screen>
      
      <Tab.Screen 
        name="Reading" 
        options={{ title: 'Reading' }}
      >
        {(props) => (
          <ProgressiveReaderMobile
            {...props}
            user={user}
            isOnline={isOnline}
          />
        )}
      </Tab.Screen>
      
      <Tab.Screen 
        name="Quiz" 
        options={{ title: 'Quiz' }}
      >
        {(props) => (
          <SmartQuizMobile
            {...props}
            user={user}
            isOnline={isOnline}
          />
        )}
      </Tab.Screen>
      
      <Tab.Screen 
        name="Culture" 
        options={{ title: 'Culture' }}
      >
        {(props) => (
          <CulturalExplorerMobile
            {...props}
            user={user}
            isOnline={isOnline}
            onProgressUpdate={handleProgressUpdate}
            onAchievementUnlocked={handleAchievementUnlocked}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function MacrobiusMobileApp() {
  // App State
  const [appState, setAppState] = useState<AppState>({
    user: null,
    isOnline: false,
    isInitialized: false,
    currentLearningSession: null
  });

  // Initialize app
  useEffect(() => {
    initializeApp();
  }, []);

  // Network monitoring
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setAppState(prev => ({
        ...prev,
        isOnline: state.isConnected || false
      }));
    });

    return unsubscribe;
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize services
      await Promise.all([
        AudioService.initialize(),
        NotificationService.initialize()
      ]);

      // Load user data
      const userData = await loadUserData();
      
      // Check network status
      const netInfo = await NetInfo.fetch();
      
      // Initialize sync if user exists
      if (userData) {
        SyncService.startAutoSync(userData.id);
      }

      setAppState({
        user: userData,
        isOnline: netInfo.isConnected || false,
        isInitialized: true,
        currentLearningSession: null
      });

      // Track app launch
      if (userData) {
        await AnalyticsService.trackEvent(userData.id, 'app_launched');
      }

    } catch (error) {
      console.error('App initialization error:', error);
      Alert.alert(
        'Initialization Error',
        'There was a problem starting the app. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const loadUserData = async (): Promise<User | null> => {
    try {
      // Try to load from secure storage first
      let userData = await SecurityService.secureRetrieve<User>('user_data');
      
      if (!userData) {
        // Create demo user for development
        userData = {
          id: 'demo_user_001',
          name: 'Latin Learner',
          email: 'learner@macrobius.app',
          learningLevel: 'intermediate',
          joinDate: new Date(),
          completedInsights: [],
          achievementsEarned: [],
          preferences: {
            dailyGoalMinutes: 30,
            notificationsEnabled: true,
            hapticFeedback: true,
            audioEnabled: true
          }
        };
        
        // Save demo user
        await SecurityService.secureStore('user_data', userData);
      }
      
      return userData;
    } catch (error) {
      console.error('Error loading user data:', error);
      return null;
    }
  };

  const handleStartLearning = async (type: string) => {
    try {
      if (appState.user) {
        // Track learning session start
        await AnalyticsService.trackEvent(
          appState.user.id,
          'learning_session_started',
          { component: type }
        );
        
        // Set current session
        setAppState(prev => ({
          ...prev,
          currentLearningSession: {
            type,
            startTime: new Date(),
            userId: appState.user?.id
          }
        }));
      }
    } catch (error) {
      console.error('Error starting learning session:', error);
    }
  };

  const handleProgressUpdate = async (progress: any) => {
    try {
      if (appState.user) {
        // Add to pending sync
        await SyncService.addPendingProgress(appState.user.id, {
          userId: appState.user.id,
          sessionId: appState.currentLearningSession?.id || 'unknown',
          component: progress.type,
          action: 'progress_update',
          data: progress,
          timestamp: new Date(),
          synced: false
        });
        
        // Track analytics
        await AnalyticsService.trackEvent(
          appState.user.id,
          'progress_updated',
          progress
        );
      }
    } catch (error) {
      console.error('Error handling progress update:', error);
    }
  };

  const handleAchievementUnlocked = async (achievement: any) => {
    try {
      if (appState.user) {
        // Show notification
        await NotificationService.showAchievementNotification(achievement);
        
        // Update user achievements
        const updatedUser = {
          ...appState.user,
          achievementsEarned: [...appState.user.achievementsEarned, achievement.id]
        };
        
        await SecurityService.secureStore('user_data', updatedUser);
        
        setAppState(prev => ({
          ...prev,
          user: updatedUser
        }));
        
        // Track analytics
        await AnalyticsService.trackAchievement(
          appState.user.id,
          achievement.id,
          achievement.points
        );
      }
    } catch (error) {
      console.error('Error handling achievement unlock:', error);
    }
  };

  // Show loading screen if not initialized
  if (!appState.isInitialized) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <View style={styles.loadingContent}>
          <Icon name="account-balance" size={64} color={colors.primary} />
          {/* Add loading spinner or animation here */}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Main">
          {(props) => (
            <MainTabNavigator
              {...props}
              user={appState.user}
              isOnline={appState.isOnline}
              onStartLearning={handleStartLearning}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContent: {
    alignItems: 'center'
  }
});

// Helper function to handle global errors
function handleGlobalError(error: Error, errorInfo: any) {
  console.error('Global app error:', error, errorInfo);
  
  // Log to analytics if user exists
  // This would typically be wrapped in an error boundary
}
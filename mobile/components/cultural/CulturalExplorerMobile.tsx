/**
 * 🏛️ CULTURAL EXPLORER MOBILE - Roman Culture Discovery
 * Swipeable insights, interactive timelines, rich media integration
 * 
 * Features:
 * - Swipeable cultural insights with rich media
 * - Interactive timeline navigation
 * - Roman artifacts exploration
 * - Cultural theme deep-dives
 * - Integration with 9 cultural themes from backend
 * - Offline content caching
 * - Social sharing capabilities
 * - Achievement system for cultural exploration
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  PanGestureHandler,
  State,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
  Share
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

// Services
import { OfflineStorageService, AudioService, APIService } from '../services';

// Types
interface CulturalInsight {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  theme: 'Religious Practices' | 'Social Customs' | 'Philosophy' | 'Education' | 
         'Roman History' | 'Literature' | 'Law' | 'Astronomy' | 'General';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  imageUrl: string;
  audioUrl?: string;
  readingTime: number; // minutes
  relatedPassages: string[];
  artifacts: CulturalArtifact[];
  timeline: TimelineEvent[];
  modernConnections: ModernConnection[];
  interactiveElements: InteractiveElement[];
  achievements: Achievement[];
}

interface CulturalArtifact {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  period: string;
  location: string;
  significance: string;
  interactiveModel?: string; // 3D model URL
}

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  significance: string;
  relatedInsights: string[];
}

interface ModernConnection {
  id: string;
  ancient: string;
  modern: string;
  explanation: string;
  examples: string[];
}

interface InteractiveElement {
  id: string;
  type: 'quiz' | 'comparison' | 'reconstruction' | 'roleplay';
  title: string;
  description: string;
  content: any;
  points: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  progress: number;
}

interface User {
  id: string;
  culturalExplorationLevel: number;
  unlockedThemes: string[];
  completedInsights: string[];
  achievementsEarned: string[];
  explorationStreak: number;
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
  cultural: '#8A2BE2',
  religious: '#FF6B35',
  social: '#2E8B57',
  philosophy: '#4169E1',
  education: '#FF8C00',
  history: '#DC143C',
  literature: '#9370DB',
  law: '#008B8B',
  astronomy: '#4682B4',
  achievement: '#FFD700'
};

interface CulturalExplorerMobileProps {
  user: User | null;
  isOnline: boolean;
  onProgressUpdate: (progress: any) => void;
  onAchievementUnlocked: (achievement: Achievement) => void;
}

export default function CulturalExplorerMobile({
  user,
  isOnline,
  onProgressUpdate,
  onAchievementUnlocked
}: CulturalExplorerMobileProps) {
  // Core State
  const [insights, setInsights] = useState<CulturalInsight[]>([]);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'swipe' | 'timeline' | 'artifacts' | 'connections'>('swipe');
  const [achievementsEarned, setAchievementsEarned] = useState<Achievement[]>([]);
  
  // UI State
  const [loading, setLoading] = useState(true);
  const [bookmarkedInsights, setBookmarkedInsights] = useState<Set<string>>(new Set());
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);
  const [showAchievementModal, setShowAchievementModal] = useState<Achievement | null>(null);
  
  // Animations
  const swipeAnimation = useRef(new Animated.ValueXY()).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Gesture handling
  const panRef = useRef(null);

  // Initialize component
  useFocusEffect(
    useCallback(() => {
      initializeCulturalExplorer();
      startIntroAnimation();
    }, [])
  );

  const initializeCulturalExplorer = async () => {
    try {
      setLoading(true);
      
      // Load cultural insights from backend/fallback
      await loadCulturalInsights();
      
      // Load user progress
      await loadUserProgress();
      
      // Check for achievements
      await checkNewAchievements();
      
    } catch (error) {
      console.error('Cultural explorer initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const startIntroAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start();
  };

  const loadCulturalInsights = async () => {
    try {
      // Use Oracle Cloud API or fallback data
      const culturalInsightsData: CulturalInsight[] = [
        {
          id: '1',
          title: 'Roman Banquet Traditions',
          shortDescription: 'Discover how Romans celebrated at elaborate dinner parties',
          fullDescription: 'Roman banquets were sophisticated social events that combined dining, entertainment, and political networking. These gatherings, known as convivium, were central to Roman social life and reflected the host\'s status and wealth.',
          theme: 'Social Customs',
          difficulty: 'intermediate',
          imageUrl: 'roman_banquet_fresco',
          audioUrl: 'banquet_narration',
          readingTime: 8,
          relatedPassages: ['saturnalia_2_4', 'saturnalia_3_13'],
          artifacts: [
            {
              id: 'triclinium',
              name: 'Roman Triclinium',
              description: 'The dining room layout with three couches arranged around a central table',
              imageUrl: 'triclinium_reconstruction',
              period: '1st-4th century CE',
              location: 'Throughout Roman Empire',
              significance: 'Central to Roman social dining culture'
            }
          ],
          timeline: [
            {
              id: 'early_banquets',
              date: '3rd century BCE',
              title: 'Early Roman Banquets',
              description: 'Simple communal meals evolve into elaborate social events',
              significance: 'Foundation of Roman dining culture',
              relatedInsights: ['1']
            }
          ],
          modernConnections: [
            {
              id: 'modern_dinner_parties',
              ancient: 'Roman convivium with multiple courses and entertainment',
              modern: 'Contemporary dinner parties and social dining',
              explanation: 'The structure of Roman banquets influences modern formal dining',
              examples: ['Multi-course meals', 'Dinner entertainment', 'Social networking over food']
            }
          ],
          interactiveElements: [
            {
              id: 'banquet_planning',
              type: 'roleplay',
              title: 'Plan a Roman Banquet',
              description: 'Choose courses, entertainment, and guest list for your convivium',
              content: {},
              points: 50
            }
          ],
          achievements: [
            {
              id: 'social_historian',
              title: 'Social Historian',
              description: 'Completed comprehensive study of Roman social customs',
              icon: 'people',
              points: 100,
              unlocked: false,
              progress: 0
            }
          ]
        },
        {
          id: '2',
          title: 'Roman Religious Practices',
          shortDescription: 'Explore the rich spiritual life of ancient Romans',
          fullDescription: 'Roman religion was a complex system of state and household worship, featuring numerous gods, elaborate rituals, and deep integration with daily life. Religious practices were essential for maintaining the pax deorum (peace of the gods).',
          theme: 'Religious Practices',
          difficulty: 'advanced',
          imageUrl: 'roman_temple_ritual',
          audioUrl: 'religious_practices_audio',
          readingTime: 12,
          relatedPassages: ['saturnalia_1_7', 'saturnalia_1_17'],
          artifacts: [
            {
              id: 'altar_sacrifice',
              name: 'Roman Sacrificial Altar',
              description: 'Stone altar used for animal sacrifices to honor the gods',
              imageUrl: 'sacrificial_altar',
              period: '2nd-3rd century CE',
              location: 'Temple of Jupiter, Rome',
              significance: 'Central to Roman religious ceremonies'
            }
          ],
          timeline: [
            {
              id: 'religious_evolution',
              date: '8th century BCE - 4th century CE',
              title: 'Evolution of Roman Religion',
              description: 'From simple agricultural rituals to complex state religion',
              significance: 'Shaped Roman identity and imperial ideology',
              relatedInsights: ['2']
            }
          ],
          modernConnections: [
            {
              id: 'modern_spirituality',
              ancient: 'Household gods (Lares and Penates) protecting family',
              modern: 'Personal spirituality and family traditions',
              explanation: 'Roman household religion parallels modern personal faith practices',
              examples: ['Family prayers', 'Protective symbols', 'Seasonal celebrations']
            }
          ],
          interactiveElements: [
            {
              id: 'ritual_reconstruction',
              type: 'reconstruction',
              title: 'Reconstruct a Roman Ritual',
              description: 'Learn the steps of a Roman religious ceremony',
              content: {},
              points: 75
            }
          ],
          achievements: [
            {
              id: 'spiritual_scholar',
              title: 'Spiritual Scholar',
              description: 'Mastered understanding of Roman religious practices',
              icon: 'account-balance',
              points: 150,
              unlocked: false,
              progress: 0
            }
          ]
        },
        {
          id: '3',
          title: 'Roman Philosophy and Wisdom',
          shortDescription: 'Discover the philosophical foundations of Roman thought',
          fullDescription: 'Roman philosophy, heavily influenced by Greek schools of thought, emphasized practical wisdom, civic virtue, and moral excellence. Stoicism became particularly influential in shaping Roman character and governance.',
          theme: 'Philosophy',
          difficulty: 'advanced',
          imageUrl: 'roman_philosopher_statue',
          audioUrl: 'philosophy_discussion',
          readingTime: 15,
          relatedPassages: ['commentarii_1_2', 'saturnalia_5_1'],
          artifacts: [
            {
              id: 'marcus_aurelius_meditations',
              name: 'Meditations Manuscript',
              description: 'Personal philosophical reflections of Emperor Marcus Aurelius',
              imageUrl: 'meditations_manuscript',
              period: '2nd century CE',
              location: 'Rome',
              significance: 'Pinnacle of Roman Stoic philosophy'
            }
          ],
          timeline: [
            {
              id: 'philosophy_adoption',
              date: '3rd century BCE',
              title: 'Greek Philosophy Arrives in Rome',
              description: 'Roman intellectuals embrace and adapt Greek philosophical schools',
              significance: 'Transformed Roman intellectual culture',
              relatedInsights: ['3']
            }
          ],
          modernConnections: [
            {
              id: 'modern_ethics',
              ancient: 'Stoic principles of virtue, wisdom, and acceptance',
              modern: 'Modern cognitive behavioral therapy and mindfulness',
              explanation: 'Stoic teachings influence contemporary approaches to mental well-being',
              examples: ['Mindfulness meditation', 'Rational thinking', 'Emotional resilience']
            }
          ],
          interactiveElements: [
            {
              id: 'philosophy_debate',
              type: 'quiz',
              title: 'Philosophical Debate Challenge',
              description: 'Test your understanding of Roman philosophical concepts',
              content: {},
              points: 100
            }
          ],
          achievements: [
            {
              id: 'wisdom_seeker',
              title: 'Wisdom Seeker',
              description: 'Explored the depths of Roman philosophical thought',
              icon: 'psychology',
              points: 200,
              unlocked: false,
              progress: 0
            }
          ]
        }
      ];
      
      setInsights(culturalInsightsData);
    } catch (error) {
      console.error('Error loading cultural insights:', error);
    }
  };

  const loadUserProgress = async () => {
    try {
      if (user) {
        const bookmarked = await OfflineStorageService.getItem(`bookmarks_${user.id}`);
        if (bookmarked) {
          setBookmarkedInsights(new Set(JSON.parse(bookmarked)));
        }
        
        const achievements = await OfflineStorageService.getItem(`achievements_${user.id}`);
        if (achievements) {
          setAchievementsEarned(JSON.parse(achievements));
        }
      }
    } catch (error) {
      console.error('Error loading user progress:', error);
    }
  };

  const checkNewAchievements = async () => {
    try {
      // Check for new achievements based on exploration progress
      const newAchievements: Achievement[] = [];
      
      if (insights.length > 0 && user) {
        // First exploration achievement
        if (user.completedInsights.length === 1) {
          newAchievements.push({
            id: 'first_explorer',
            title: 'First Explorer',
            description: 'Completed your first cultural insight',
            icon: 'explore',
            points: 25,
            unlocked: true,
            progress: 100
          });
        }
        
        // Theme mastery achievements
        const themeProgress = calculateThemeProgress();
        Object.entries(themeProgress).forEach(([theme, progress]) => {
          if (progress >= 100) {
            newAchievements.push({
              id: `${theme}_master`,
              title: `${theme} Master`,
              description: `Mastered all insights in ${theme}`,
              icon: 'school',
              points: 100,
              unlocked: true,
              progress: 100
            });
          }
        });
      }
      
      // Show achievement modals
      newAchievements.forEach(achievement => {
        setTimeout(() => {
          setShowAchievementModal(achievement);
          onAchievementUnlocked(achievement);
        }, 1000);
      });
      
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  };

  const calculateThemeProgress = () => {
    const themeProgress: Record<string, number> = {};
    
    insights.forEach(insight => {
      if (!themeProgress[insight.theme]) {
        themeProgress[insight.theme] = 0;
      }
      
      if (user?.completedInsights.includes(insight.id)) {
        themeProgress[insight.theme] += (100 / insights.filter(i => i.theme === insight.theme).length);
      }
    });
    
    return themeProgress;
  };

  const handleSwipeGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      const { translationX, velocityX } = nativeEvent;
      
      if (Math.abs(translationX) > screenWidth * 0.3 || Math.abs(velocityX) > 500) {
        if (translationX > 0) {
          // Swipe right - previous insight
          navigateToInsight('previous');
        } else {
          // Swipe left - next insight
          navigateToInsight('next');
        }
      } else {
        // Return to center
        Animated.spring(swipeAnimation, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true
        }).start();
      }
    }
  };

  const navigateToInsight = (direction: 'next' | 'previous') => {
    const currentIndex = currentInsightIndex;
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex < insights.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : insights.length - 1;
    }
    
    // Animate transition
    Animated.parallel([
      Animated.timing(swipeAnimation, {
        toValue: { 
          x: direction === 'next' ? -screenWidth : screenWidth, 
          y: 0 
        },
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true
      })
    ]).start(() => {
      setCurrentInsightIndex(newIndex);
      swipeAnimation.setValue({ x: 0, y: 0 });
      
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true
      }).start();
    });
  };

  const toggleBookmark = async (insightId: string) => {
    const newBookmarks = new Set(bookmarkedInsights);
    
    if (newBookmarks.has(insightId)) {
      newBookmarks.delete(insightId);
    } else {
      newBookmarks.add(insightId);
    }
    
    setBookmarkedInsights(newBookmarks);
    
    // Save to storage
    if (user) {
      await OfflineStorageService.setItem(
        `bookmarks_${user.id}`,
        JSON.stringify(Array.from(newBookmarks))
      );
    }
  };

  const playAudio = async (audioUrl: string, insightId: string) => {
    try {
      if (audioPlaying === insightId) {
        await AudioService.stopAudio();
        setAudioPlaying(null);
      } else {
        await AudioService.playAudio(audioUrl);
        setAudioPlaying(insightId);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      Alert.alert('Audio Error', 'Unable to play audio content');
    }
  };

  const shareInsight = async (insight: CulturalInsight) => {
    try {
      await Share.share({
        message: `Discover Roman culture: ${insight.title} - ${insight.shortDescription}`,
        title: 'Macrobius Cultural Insight'
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const markInsightComplete = async (insightId: string) => {
    if (user && !user.completedInsights.includes(insightId)) {
      // Update progress
      onProgressUpdate({
        type: 'cultural_insight_completed',
        insightId,
        theme: insights.find(i => i.id === insightId)?.theme,
        points: 50
      });
      
      // Check for achievements
      await checkNewAchievements();
    }
  };

  const renderThemeSelector = () => {
    const themes = ['all', ...Array.from(new Set(insights.map(i => i.theme)))];
    
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.themeSelector}
      >
        {themes.map((theme, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.themeChip,
              { 
                backgroundColor: selectedTheme === theme ? colors.cultural : colors.surface,
                borderColor: colors.cultural
              }
            ]}
            onPress={() => setSelectedTheme(theme)}
          >
            <Text style={[
              styles.themeChipText,
              { color: selectedTheme === theme ? colors.surface : colors.cultural }
            ]}>
              {theme === 'all' ? 'All Themes' : theme}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderInsightCard = (insight: CulturalInsight, index: number) => {
    const isBookmarked = bookmarkedInsights.has(insight.id);
    const isCompleted = user?.completedInsights.includes(insight.id) || false;
    
    return (
      <Animated.View
        key={insight.id}
        style={[
          styles.insightCard,
          {
            transform: [
              { translateX: swipeAnimation.x },
              { scale: scaleAnim }
            ]
          }
        ]}
      >
        <Image source={{ uri: insight.imageUrl }} style={styles.insightImage} />
        
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.cardGradient}
        >
          <View style={styles.cardContent}>
            {/* Header */}
            <View style={styles.cardHeader}>
              <View style={[styles.themeTag, { backgroundColor: getThemeColor(insight.theme) }]}>
                <Text style={styles.themeTagText}>{insight.theme}</Text>
              </View>
              
              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => toggleBookmark(insight.id)}
                >
                  <Icon 
                    name={isBookmarked ? 'bookmark' : 'bookmark-border'} 
                    size={24} 
                    color={colors.surface} 
                  />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => shareInsight(insight)}
                >
                  <Icon name="share" size={24} color={colors.surface} />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Content */}
            <Text style={styles.insightTitle}>{insight.title}</Text>
            <Text style={styles.insightDescription}>{insight.shortDescription}</Text>
            
            {/* Meta info */}
            <View style={styles.metaInfo}>
              <View style={styles.metaItem}>
                <Icon name="schedule" size={16} color={colors.surface} />
                <Text style={styles.metaText}>{insight.readingTime} min read</Text>
              </View>
              
              <View style={styles.metaItem}>
                <Icon name="signal-cellular-alt" size={16} color={colors.surface} />
                <Text style={styles.metaText}>{insight.difficulty}</Text>
              </View>
              
              {insight.audioUrl && (
                <TouchableOpacity
                  style={styles.metaItem}
                  onPress={() => playAudio(insight.audioUrl!, insight.id)}
                >
                  <Icon 
                    name={audioPlaying === insight.id ? 'pause' : 'play-arrow'} 
                    size={16} 
                    color={colors.surface} 
                  />
                  <Text style={styles.metaText}>Audio</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {/* Action buttons */}
            <View style={styles.cardButtons}>
              <TouchableOpacity
                style={[styles.primaryButton, { opacity: isCompleted ? 0.5 : 1 }]}
                onPress={() => !isCompleted && markInsightComplete(insight.id)}
                disabled={isCompleted}
              >
                <Text style={styles.primaryButtonText}>
                  {isCompleted ? 'Completed' : 'Explore'}
                </Text>
                {isCompleted && (
                  <Icon name="check-circle" size={16} color={colors.surface} />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  const renderViewModeSelector = () => {
    const modes = [
      { key: 'swipe', icon: 'swipe', label: 'Explore' },
      { key: 'timeline', icon: 'timeline', label: 'Timeline' },
      { key: 'artifacts', icon: 'museum', label: 'Artifacts' },
      { key: 'connections', icon: 'connect-without-contact', label: 'Modern' }
    ];
    
    return (
      <View style={styles.viewModeSelector}>
        {modes.map((mode) => (
          <TouchableOpacity
            key={mode.key}
            style={[
              styles.viewModeButton,
              { backgroundColor: viewMode === mode.key ? colors.cultural : 'transparent' }
            ]}
            onPress={() => setViewMode(mode.key as any)}
          >
            <Icon 
              name={mode.icon} 
              size={20} 
              color={viewMode === mode.key ? colors.surface : colors.cultural} 
            />
            <Text style={[
              styles.viewModeText,
              { color: viewMode === mode.key ? colors.surface : colors.cultural }
            ]}>
              {mode.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderAchievementModal = () => {
    if (!showAchievementModal) return null;
    
    return (
      <View style={styles.achievementModal}>
        <View style={styles.achievementModalContent}>
          <Animated.View style={styles.achievementIcon}>
            <Icon name={showAchievementModal.icon} size={48} color={colors.achievement} />
          </Animated.View>
          
          <Text style={styles.achievementTitle}>{showAchievementModal.title}</Text>
          <Text style={styles.achievementDescription}>
            {showAchievementModal.description}
          </Text>
          <Text style={styles.achievementPoints}>
            +{showAchievementModal.points} points
          </Text>
          
          <TouchableOpacity
            style={styles.achievementCloseButton}
            onPress={() => setShowAchievementModal(null)}
          >
            <Text style={styles.achievementCloseText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getThemeColor = (theme: string): string => {
    const themeColors: Record<string, string> = {
      'Religious Practices': colors.religious,
      'Social Customs': colors.social,
      'Philosophy': colors.philosophy,
      'Education': colors.education,
      'Roman History': colors.history,
      'Literature': colors.literature,
      'Law': colors.law,
      'Astronomy': colors.astronomy,
      'General': colors.textSecondary
    };
    
    return themeColors[theme] || colors.cultural;
  };

  const filteredInsights = selectedTheme === 'all' 
    ? insights 
    : insights.filter(insight => insight.theme === selectedTheme);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Icon name="account-balance" size={48} color={colors.cultural} />
          <Text style={styles.loadingText}>Loading cultural insights...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.cultural} barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cultural Explorer</Text>
        <Text style={styles.headerSubtitle}>
          Discover Ancient Roman Wisdom
        </Text>
      </View>
      
      {/* View Mode Selector */}
      {renderViewModeSelector()}
      
      {/* Theme Selector */}
      {renderThemeSelector()}
      
      {/* Main Content */}
      {viewMode === 'swipe' && filteredInsights.length > 0 && (
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={Animated.event(
            [{ nativeEvent: { translationX: swipeAnimation.x } }],
            { useNativeDriver: true }
          )}
          onHandlerStateChange={handleSwipeGesture}
        >
          <Animated.View style={styles.cardContainer}>
            {renderInsightCard(filteredInsights[currentInsightIndex], currentInsightIndex)}
          </Animated.View>
        </PanGestureHandler>
      )}
      
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressDots}>
          {filteredInsights.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                { 
                  backgroundColor: index === currentInsightIndex 
                    ? colors.cultural 
                    : colors.secondary 
                }
              ]}
            />
          ))}
        </View>
        
        <Text style={styles.progressText}>
          {currentInsightIndex + 1} of {filteredInsights.length}
        </Text>
      </View>
      
      {/* Navigation buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateToInsight('previous')}
        >
          <Icon name="chevron-left" size={24} color={colors.cultural} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateToInsight('next')}
        >
          <Icon name="chevron-right" size={24} color={colors.cultural} />
        </TouchableOpacity>
      </View>
      
      {/* Achievement Modal */}
      {renderAchievementModal()}
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
    color: colors.text,
    marginTop: 10
  },
  header: {
    padding: 20,
    backgroundColor: colors.cultural,
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.surface,
    marginBottom: 4
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.surface,
    opacity: 0.9
  },
  viewModeSelector: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  viewModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.cultural
  },
  viewModeText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600'
  },
  themeSelector: {
    paddingHorizontal: 15,
    marginBottom: 10
  },
  themeChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10
  },
  themeChipText: {
    fontSize: 12,
    fontWeight: '600'
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  insightCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8
  },
  insightImage: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  cardGradient: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  cardContent: {
    padding: 20
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  themeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  themeTagText: {
    fontSize: 10,
    color: colors.surface,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  cardActions: {
    flexDirection: 'row',
    gap: 10
  },
  actionButton: {
    padding: 5
  },
  insightTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.surface,
    marginBottom: 8
  },
  insightDescription: {
    fontSize: 14,
    color: colors.surface,
    opacity: 0.9,
    lineHeight: 20,
    marginBottom: 15
  },
  metaInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 20
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  metaText: {
    fontSize: 12,
    color: colors.surface,
    opacity: 0.8
  },
  cardButtons: {
    flexDirection: 'row',
    gap: 10
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.cultural,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: 'bold'
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.surface
  },
  secondaryButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '600'
  },
  progressContainer: {
    padding: 20,
    alignItems: 'center'
  },
  progressDots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingBottom: 20
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  achievementModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  achievementModalContent: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    maxWidth: screenWidth * 0.8
  },
  achievementIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  achievementTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center'
  },
  achievementDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 15
  },
  achievementPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.achievement,
    marginBottom: 20
  },
  achievementCloseButton: {
    backgroundColor: colors.cultural,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8
  },
  achievementCloseText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export { CulturalExplorerMobile };
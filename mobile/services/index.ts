/**
 * 🔧 MOBILE SERVICES LAYER - Core Infrastructure for Macrobius Mobile App
 * Essential services that power all mobile learning components
 * 
 * Services Included:
 * - OfflineStorageService: Local data persistence and synchronization
 * - AudioService: Text-to-speech and pronunciation features  
 * - NotificationService: Smart learning reminders and achievements
 * - APIService: Backend communication and data fetching
 * - LocationService: Context-aware cultural content
 */

// Export all services
export { OfflineStorageService } from './OfflineStorageService';
export { AudioService } from './AudioService';
export { NotificationService } from './NotificationService';
export { APIService } from './APIService';
export { LocationService } from './LocationService';

// Service initialization helper
export const initializeMobileServices = async () => {
  try {
    // Initialize all services
    await OfflineStorageService.initialize();
    await AudioService.initialize();
    
    // Configure notifications
    NotificationService.configure({
      onNotification: (notification) => {
        console.log('Notification received:', notification);
      },
      onAction: (action, notification) => {
        console.log('Notification action:', action, notification);
      }
    });
    
    // Initialize API service
    APIService.initialize({
      baseURL: 'https://your-backend-api.com',
      timeout: 10000
    });
    
    console.log('All mobile services initialized successfully');
  } catch (error) {
    console.error('Error initializing mobile services:', error);
  }
};
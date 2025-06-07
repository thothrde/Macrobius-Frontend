/**
 * Real-time WebSocket Manager for Oracle Cloud Backend Integration
 * Handles live quiz sessions, real-time leaderboards, and user interactions
 */

interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: number;
  sessionId?: string;
  userId?: string;
}

interface LiveQuizSession {
  id: string;
  hostId: string;
  title: string;
  participants: string[];
  currentQuestion: number;
  totalQuestions: number;
  status: 'waiting' | 'active' | 'paused' | 'completed';
  startTime?: number;
  endTime?: number;
  category: string;
  difficulty: string;
}

interface LiveParticipant {
  userId: string;
  username: string;
  score: number;
  currentStreak: number;
  isConnected: boolean;
  joinedAt: number;
  level: number;
  avatar?: string;
}

type MessageHandler = (message: WebSocketMessage) => void;
type ConnectionStateHandler = (connected: boolean) => void;
type ErrorHandler = (error: Error) => void;

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private backendUrl: string;
  private userId: string | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 1000;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private messageQueue: WebSocketMessage[] = [];
  private isIntentionallyClosed = false;
  
  // Event handlers
  private messageHandlers: Map<string, MessageHandler[]> = new Map();
  private connectionStateHandlers: ConnectionStateHandler[] = [];
  private errorHandlers: ErrorHandler[] = [];
  
  // Connection state
  private connectionState: 'disconnected' | 'connecting' | 'connected' | 'reconnecting' = 'disconnected';
  
  constructor() {
    this.backendUrl = (process.env.NEXT_PUBLIC_WS_URL || 'ws://152.70.184.232:8080').replace('http', 'ws');
  }

  /**
   * Connect to WebSocket server
   */
  async connect(userId: string): Promise<void> {
    if (this.connectionState === 'connected' || this.connectionState === 'connecting') {
      return;
    }

    this.userId = userId;
    this.isIntentionallyClosed = false;
    this.connectionState = 'connecting';
    this.notifyConnectionState(false);

    return new Promise((resolve, reject) => {
      try {
        const wsUrl = `${this.backendUrl}/ws?userId=${encodeURIComponent(userId)}`;
        this.ws = new WebSocket(wsUrl);
        
        this.ws.onopen = () => {
          console.log('🔗 WebSocket connected to Oracle Cloud Backend');
          this.connectionState = 'connected';
          this.reconnectAttempts = 0;
          this.reconnectDelay = 1000;
          
          this.startHeartbeat();
          this.processMessageQueue();
          this.notifyConnectionState(true);
          
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('❌ Error parsing WebSocket message:', error);
          }
        };

        this.ws.onclose = (event) => {
          console.log('🔌 WebSocket connection closed:', event.code, event.reason);
          this.connectionState = 'disconnected';
          this.stopHeartbeat();
          this.notifyConnectionState(false);
          
          if (!this.isIntentionallyClosed) {
            this.scheduleReconnect();
          }
        };

        this.ws.onerror = (error) => {
          console.error('❌ WebSocket error:', error);
          this.notifyError(new Error('WebSocket connection error'));
          reject(error);
        };
        
        // Timeout for connection
        setTimeout(() => {
          if (this.connectionState === 'connecting') {
            reject(new Error('⏰ WebSocket connection timeout'));
          }
        }, 10000);
        
      } catch (error) {
        console.error('💥 Failed to create WebSocket connection:', error);
        reject(error);
      }
    });
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect(): void {
    this.isIntentionallyClosed = true;
    this.stopHeartbeat();
    
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close(1000, 'Client disconnecting');
    }
    
    this.ws = null;
    this.connectionState = 'disconnected';
    this.notifyConnectionState(false);
  }

  /**
   * Send message to server
   */
  send(type: string, data: any, sessionId?: string): void {
    const message: WebSocketMessage = {
      type,
      data,
      timestamp: Date.now(),
      sessionId,
      userId: this.userId || undefined
    };

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      // Queue message for when connection is restored
      this.messageQueue.push(message);
      console.warn('📮 WebSocket not connected, message queued:', type);
    }
  }

  // Event handler registration
  on(messageType: string, handler: MessageHandler): void {
    if (!this.messageHandlers.has(messageType)) {
      this.messageHandlers.set(messageType, []);
    }
    this.messageHandlers.get(messageType)!.push(handler);
  }

  off(messageType: string, handler: MessageHandler): void {
    const handlers = this.messageHandlers.get(messageType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  onConnectionState(handler: ConnectionStateHandler): void {
    this.connectionStateHandlers.push(handler);
  }

  onError(handler: ErrorHandler): void {
    this.errorHandlers.push(handler);
  }

  // Live Quiz Methods
  createLiveQuiz(title: string, category: string, difficulty: string): void {
    this.send('create_live_quiz', {
      title,
      category,
      difficulty,
      hostId: this.userId
    });
  }

  joinLiveQuiz(sessionId: string): void {
    this.send('join_live_quiz', { sessionId });
  }

  leaveLiveQuiz(sessionId: string): void {
    this.send('leave_live_quiz', { sessionId });
  }

  startLiveQuiz(sessionId: string): void {
    this.send('start_live_quiz', { sessionId });
  }

  submitLiveAnswer(sessionId: string, questionId: string, answer: any, timeSpent: number): void {
    this.send('submit_live_answer', {
      sessionId,
      questionId,
      answer,
      timeSpent
    });
  }

  // Real-time Leaderboard
  subscribeToLeaderboard(category: string, timeframe: string): void {
    this.send('subscribe_leaderboard', { category, timeframe });
  }

  unsubscribeFromLeaderboard(): void {
    this.send('unsubscribe_leaderboard', {});
  }

  // Challenge System
  challengeUser(targetUserId: string, category: string): void {
    this.send('challenge_user', {
      targetUserId,
      category,
      challengerId: this.userId
    });
  }

  acceptChallenge(challengeId: string): void {
    this.send('accept_challenge', { challengeId });
  }

  declineChallenge(challengeId: string): void {
    this.send('decline_challenge', { challengeId });
  }

  // AI Learning Path Synchronization
  syncLearningProgress(pathId: string, progress: any): void {
    this.send('sync_learning_progress', {
      pathId,
      progress,
      timestamp: Date.now()
    });
  }

  subscribeToAIUpdates(systemType: string): void {
    this.send('subscribe_ai_updates', { systemType });
  }

  // Cultural Analysis Real-time Updates
  requestCulturalAnalysis(text: string, options: any): void {
    this.send('analyze_cultural_content', {
      text,
      options,
      requestId: `analysis_${Date.now()}`
    });
  }

  // Collaborative Learning Features
  joinStudyGroup(groupId: string): void {
    this.send('join_study_group', { groupId });
  }

  leaveStudyGroup(groupId: string): void {
    this.send('leave_study_group', { groupId });
  }

  shareProgress(groupId: string, progressData: any): void {
    this.send('share_progress', {
      groupId,
      progressData,
      timestamp: Date.now()
    });
  }

  // Private methods
  private handleMessage(message: WebSocketMessage): void {
    // Handle special system messages
    switch (message.type) {
      case 'pong':
        // Heartbeat response
        break;
      case 'system_notification':
        this.handleSystemNotification(message.data);
        break;
      case 'user_joined':
      case 'user_left':
        this.handleUserPresenceUpdate(message);
        break;
      default:
        // Handle custom message handlers
        const handlers = this.messageHandlers.get(message.type);
        if (handlers) {
          handlers.forEach(handler => {
            try {
              handler(message);
            } catch (error) {
              console.error('❌ Error in message handler:', error);
            }
          });
        }
        break;
    }
  }

  private handleSystemNotification(data: any): void {
    console.log('🔔 System notification:', data);
    
    // Emit custom event for UI components to handle
    window.dispatchEvent(new CustomEvent('ws-system-notification', {
      detail: data
    }));
  }

  private handleUserPresenceUpdate(message: WebSocketMessage): void {
    console.log('👥 User presence update:', message.type, message.data);
    
    // Emit custom event for presence indicators
    window.dispatchEvent(new CustomEvent('ws-user-presence', {
      detail: {
        type: message.type,
        data: message.data
      }
    }));
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('💀 Max reconnection attempts reached');
      this.notifyError(new Error('Failed to reconnect to Oracle Cloud server'));
      return;
    }

    this.connectionState = 'reconnecting';
    this.reconnectAttempts++;
    
    console.log(`🔄 Scheduling reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${this.reconnectDelay}ms`);
    
    setTimeout(() => {
      if (!this.isIntentionallyClosed && this.userId) {
        console.log(`🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
        this.connect(this.userId).catch(error => {
          console.error('💥 Reconnection failed:', error);
          this.reconnectDelay = Math.min(this.reconnectDelay * 2, 30000); // Max 30 seconds
          this.scheduleReconnect();
        });
      }
    }, this.reconnectDelay);
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.send('ping', { timestamp: Date.now() });
      }
    }, 30000); // Every 30 seconds
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private processMessageQueue(): void {
    console.log(`📤 Processing ${this.messageQueue.length} queued messages`);
    
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()!;
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(message));
      } else {
        // Put message back if connection lost
        this.messageQueue.unshift(message);
        break;
      }
    }
  }

  private notifyConnectionState(connected: boolean): void {
    this.connectionStateHandlers.forEach(handler => {
      try {
        handler(connected);
      } catch (error) {
        console.error('❌ Error in connection state handler:', error);
      }
    });

    // Emit global connection state event
    window.dispatchEvent(new CustomEvent('ws-connection-state', {
      detail: {
        connected,
        state: this.connectionState,
        queuedMessages: this.messageQueue.length
      }
    }));
  }

  private notifyError(error: Error): void {
    this.errorHandlers.forEach(handler => {
      try {
        handler(error);
      } catch (handlerError) {
        console.error('❌ Error in error handler:', handlerError);
      }
    });

    // Emit global error event
    window.dispatchEvent(new CustomEvent('ws-error', {
      detail: { error: error.message }
    }));
  }

  // Getters
  get isConnected(): boolean {
    return this.connectionState === 'connected';
  }

  get currentState(): string {
    return this.connectionState;
  }

  get queuedMessages(): number {
    return this.messageQueue.length;
  }

  get connectionInfo() {
    return {
      state: this.connectionState,
      connected: this.isConnected,
      userId: this.userId,
      queuedMessages: this.messageQueue.length,
      reconnectAttempts: this.reconnectAttempts,
      backendUrl: this.backendUrl
    };
  }

  // Utility methods
  getStatistics() {
    return {
      connectionState: this.connectionState,
      reconnectAttempts: this.reconnectAttempts,
      queuedMessages: this.messageQueue.length,
      registeredHandlers: this.messageHandlers.size,
      connectionStateHandlers: this.connectionStateHandlers.length,
      errorHandlers: this.errorHandlers.length
    };
  }

  clearMessageQueue(): void {
    this.messageQueue = [];
    console.log('🗑️ Message queue cleared');
  }

  // Cleanup
  destroy(): void {
    this.disconnect();
    this.messageHandlers.clear();
    this.connectionStateHandlers = [];
    this.errorHandlers = [];
    this.clearMessageQueue();
    console.log('🧹 WebSocket manager destroyed');
  }
}

// Export singleton instance
export const wsManager = new WebSocketManager();

// React Hook for WebSocket functionality
export function useWebSocket(userId?: string) {
  const [connectionState, setConnectionState] = React.useState(wsManager.currentState);
  const [isConnected, setIsConnected] = React.useState(wsManager.isConnected);
  const [queuedMessages, setQueuedMessages] = React.useState(wsManager.queuedMessages);

  React.useEffect(() => {
    const handleConnectionState = (event: CustomEvent) => {
      setConnectionState(event.detail.state);
      setIsConnected(event.detail.connected);
      setQueuedMessages(event.detail.queuedMessages);
    };

    window.addEventListener('ws-connection-state', handleConnectionState as EventListener);

    // Auto-connect if userId provided
    if (userId && !wsManager.isConnected) {
      wsManager.connect(userId).catch(console.error);
    }

    return () => {
      window.removeEventListener('ws-connection-state', handleConnectionState as EventListener);
    };
  }, [userId]);

  return {
    connectionState,
    isConnected,
    queuedMessages,
    connect: wsManager.connect.bind(wsManager),
    disconnect: wsManager.disconnect.bind(wsManager),
    send: wsManager.send.bind(wsManager),
    on: wsManager.on.bind(wsManager),
    off: wsManager.off.bind(wsManager),
    // Quiz features
    createLiveQuiz: wsManager.createLiveQuiz.bind(wsManager),
    joinLiveQuiz: wsManager.joinLiveQuiz.bind(wsManager),
    // AI features
    syncLearningProgress: wsManager.syncLearningProgress.bind(wsManager),
    requestCulturalAnalysis: wsManager.requestCulturalAnalysis.bind(wsManager),
    // Utility
    getStatistics: wsManager.getStatistics.bind(wsManager),
    connectionInfo: wsManager.connectionInfo
  };
}

// Export types
export type { 
  WebSocketMessage, 
  LiveQuizSession, 
  LiveParticipant, 
  MessageHandler, 
  ConnectionStateHandler, 
  ErrorHandler 
};
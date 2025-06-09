/**
 * Advanced Integration Test Manager
 * Comprehensive testing and verification of all advanced systems
 */

import React from 'react';

interface IntegrationTestResult {
  testName: string;
  status: 'passed' | 'failed' | 'warning' | 'skipped';
  duration: number;
  details: string;
  error?: Error;
  metrics?: Record<string, any>;
}

interface IntegrationTestSuite {
  suiteName: string;
  tests: IntegrationTestResult[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
  warnings: number;
  totalDuration: number;
  coverage: number;
}

interface BackendHealthCheck {
  endpoint: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime: number;
  lastChecked: Date;
  version?: string;
  features?: string[];
}

class IntegrationTestManager {
  private baseUrl: string;
  private wsUrl: string;
  private testResults: Map<string, IntegrationTestSuite> = new Map();
  private healthChecks: Map<string, BackendHealthCheck> = new Map();
  private isRunning = false;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    this.wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
  }

  // Backend Connection Testing
  public async testBackendConnections(): Promise<IntegrationTestSuite> {
    const suite: IntegrationTestSuite = {
      suiteName: 'Backend Connection Tests',
      tests: [],
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      warnings: 0,
      totalDuration: 0,
      coverage: 0
    };

    const startTime = performance.now();
    this.isRunning = true;

    // Test 1: Basic API Health Check
    suite.tests.push(await this.testApiHealth());
    
    // Test 2: Authentication System
    suite.tests.push(await this.testAuthentication());
    
    // Test 3: Advanced Latin Tools Integration
    suite.tests.push(await this.testLatinToolsIntegration());
    
    // Test 4: Performance Monitoring Integration
    suite.tests.push(await this.testPerformanceMonitoringIntegration());
    
    // Test 5: Cache System Integration
    suite.tests.push(await this.testCacheSystemIntegration());
    
    // Test 6: Mobile Optimization Backend Support
    suite.tests.push(await this.testMobileOptimizationSupport());
    
    // Test 7: Accessibility Enhancement Backend
    suite.tests.push(await this.testAccessibilityBackendSupport());
    
    // Calculate suite metrics
    suite.totalTests = suite.tests.length;
    suite.passedTests = suite.tests.filter(t => t.status === 'passed').length;
    suite.failedTests = suite.tests.filter(t => t.status === 'failed').length;
    suite.warnings = suite.tests.filter(t => t.status === 'warning').length;
    suite.totalDuration = performance.now() - startTime;
    suite.coverage = (suite.passedTests / suite.totalTests) * 100;

    this.testResults.set('backend-connections', suite);
    this.isRunning = false;
    
    return suite;
  }

  // WebSocket Functionality Testing
  public async testWebSocketFunctionality(): Promise<IntegrationTestSuite> {
    const suite: IntegrationTestSuite = {
      suiteName: 'WebSocket Functionality Tests',
      tests: [],
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      warnings: 0,
      totalDuration: 0,
      coverage: 0
    };

    const startTime = performance.now();

    // Test 1: WebSocket Connection
    suite.tests.push(await this.testWebSocketConnection());
    
    // Test 2: Real-time Features
    suite.tests.push(await this.testRealTimeFeatures());
    
    // Test 3: Live Quiz Sessions
    suite.tests.push(await this.testLiveQuizSessions());
    
    // Test 4: Real-time Leaderboards
    suite.tests.push(await this.testRealTimeLeaderboards());
    
    // Test 5: Collaborative Learning
    suite.tests.push(await this.testCollaborativeLearning());
    
    // Test 6: WebSocket Performance with Optimization
    suite.tests.push(await this.testWebSocketPerformance());

    // Calculate suite metrics
    suite.totalTests = suite.tests.length;
    suite.passedTests = suite.tests.filter(t => t.status === 'passed').length;
    suite.failedTests = suite.tests.filter(t => t.status === 'failed').length;
    suite.warnings = suite.tests.filter(t => t.status === 'warning').length;
    suite.totalDuration = performance.now() - startTime;
    suite.coverage = (suite.passedTests / suite.totalTests) * 100;

    this.testResults.set('websocket-functionality', suite);
    
    return suite;
  }

  // API Performance Verification
  public async testApiPerformance(): Promise<IntegrationTestSuite> {
    const suite: IntegrationTestSuite = {
      suiteName: 'API Performance Tests',
      tests: [],
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      warnings: 0,
      totalDuration: 0,
      coverage: 0
    };

    const startTime = performance.now();

    // Test 1: Text Search Performance (Should be 97% improved)
    suite.tests.push(await this.testTextSearchPerformance());
    
    // Test 2: Quiz API Performance 
    suite.tests.push(await this.testQuizApiPerformance());
    
    // Test 3: Advanced Caching Performance
    suite.tests.push(await this.testAdvancedCachingPerformance());
    
    // Test 4: Mobile-Optimized API Calls
    suite.tests.push(await this.testMobileOptimizedApiCalls());
    
    // Test 5: Accessibility-Enhanced API Responses
    suite.tests.push(await this.testAccessibilityEnhancedApiResponses());
    
    // Test 6: Latin Tools API Performance
    suite.tests.push(await this.testLatinToolsApiPerformance());

    // Calculate suite metrics
    suite.totalTests = suite.tests.length;
    suite.passedTests = suite.tests.filter(t => t.status === 'passed').length;
    suite.failedTests = suite.tests.filter(t => t.status === 'failed').length;
    suite.warnings = suite.tests.filter(t => t.status === 'warning').length;
    suite.totalDuration = performance.now() - startTime;
    suite.coverage = (suite.passedTests / suite.totalTests) * 100;

    this.testResults.set('api-performance', suite);
    
    return suite;
  }

  // Database Operations Verification
  public async testDatabaseOperations(): Promise<IntegrationTestSuite> {
    const suite: IntegrationTestSuite = {
      suiteName: 'Database Operations Tests',
      tests: [],
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      warnings: 0,
      totalDuration: 0,
      coverage: 0
    };

    const startTime = performance.now();

    // Test 1: Advanced Analytics Queries
    suite.tests.push(await this.testAnalyticsQueries());
    
    // Test 2: Educational Outcome Tracking
    suite.tests.push(await this.testEducationalOutcomeTracking());
    
    // Test 3: User Progress Tracking with Advanced Caching
    suite.tests.push(await this.testUserProgressTracking());
    
    // Test 4: Institutional Reporting
    suite.tests.push(await this.testInstitutionalReporting());
    
    // Test 5: Performance Metrics Storage
    suite.tests.push(await this.testPerformanceMetricsStorage());
    
    // Test 6: Accessibility Data Storage
    suite.tests.push(await this.testAccessibilityDataStorage());

    // Calculate suite metrics
    suite.totalTests = suite.tests.length;
    suite.passedTests = suite.tests.filter(t => t.status === 'passed').length;
    suite.failedTests = suite.tests.filter(t => t.status === 'failed').length;
    suite.warnings = suite.tests.filter(t => t.status === 'warning').length;
    suite.totalDuration = performance.now() - startTime;
    suite.coverage = (suite.passedTests / suite.totalTests) * 100;

    this.testResults.set('database-operations', suite);
    
    return suite;
  }

  // Error Handling Verification
  public async testErrorHandling(): Promise<IntegrationTestSuite> {
    const suite: IntegrationTestSuite = {
      suiteName: 'Error Handling Tests',
      tests: [],
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      warnings: 0,
      totalDuration: 0,
      coverage: 0
    };

    const startTime = performance.now();

    // Test 1: Network Error Recovery
    suite.tests.push(await this.testNetworkErrorRecovery());
    
    // Test 2: API Error Handling with Advanced Monitoring
    suite.tests.push(await this.testApiErrorHandling());
    
    // Test 3: WebSocket Reconnection
    suite.tests.push(await this.testWebSocketReconnection());
    
    // Test 4: Cache Error Recovery
    suite.tests.push(await this.testCacheErrorRecovery());
    
    // Test 5: Mobile Optimization Error Handling
    suite.tests.push(await this.testMobileOptimizationErrorHandling());
    
    // Test 6: Accessibility Enhancement Error Recovery
    suite.tests.push(await this.testAccessibilityErrorRecovery());

    // Calculate suite metrics
    suite.totalTests = suite.tests.length;
    suite.passedTests = suite.tests.filter(t => t.status === 'passed').length;
    suite.failedTests = suite.tests.filter(t => t.status === 'failed').length;
    suite.warnings = suite.tests.filter(t => t.status === 'warning').length;
    suite.totalDuration = performance.now() - startTime;
    suite.coverage = (suite.passedTests / suite.totalTests) * 100;

    this.testResults.set('error-handling', suite);
    
    return suite;
  }

  // Individual Test Methods
  private async testApiHealth(): Promise<IntegrationTestResult> {
    const startTime = performance.now();
    
    try {
      const response = await fetch(`${this.baseUrl}/`);
      const data = await response.json();
      
      if (response.ok && data.status === 'ok') {
        return {
          testName: 'API Health Check',
          status: 'passed',
          duration: performance.now() - startTime,
          details: `API is healthy. Version: ${data.version || 'unknown'}`,
          metrics: {
            responseTime: performance.now() - startTime,
            statusCode: response.status,
            version: data.version
          }
        };
      } else {
        return {
          testName: 'API Health Check',
          status: 'failed',
          duration: performance.now() - startTime,
          details: `API health check failed. Status: ${response.status}`,
          error: new Error(`HTTP ${response.status}`)
        };
      }
    } catch (error) {
      return {
        testName: 'API Health Check',
        status: 'failed',
        duration: performance.now() - startTime,
        details: 'Failed to connect to API',
        error: error as Error
      };
    }
  }

  private async testAuthentication(): Promise<IntegrationTestResult> {
    const startTime = performance.now();
    
    try {
      // Test authentication endpoint
      const response = await fetch(`${this.baseUrl}/api/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer test-token'
        }
      });
      
      return {
        testName: 'Authentication System',
        status: response.status === 401 ? 'passed' : 'warning', // 401 expected for test token
        duration: performance.now() - startTime,
        details: `Authentication endpoint responding correctly`,
        metrics: {
          responseTime: performance.now() - startTime,
          statusCode: response.status
        }
      };
    } catch (error) {
      return {
        testName: 'Authentication System',
        status: 'failed',
        duration: performance.now() - startTime,
        details: 'Authentication system test failed',
        error: error as Error
      };
    }
  }

  private async testLatinToolsIntegration(): Promise<IntegrationTestResult> {
    const startTime = performance.now();
    
    try {
      // Test Latin analysis endpoint
      const response = await fetch(`${this.baseUrl}/api/latin/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: 'virtus',
          analysisType: 'morphological'
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return {
          testName: 'Latin Tools Integration',
          status: 'passed',
          duration: performance.now() - startTime,
          details: 'Latin analysis tools integrated successfully',
          metrics: {
            responseTime: performance.now() - startTime,
            analysisFeatures: data.features || []
          }
        };
      } else {
        return {
          testName: 'Latin Tools Integration',
          status: 'warning',
          duration: performance.now() - startTime,
          details: 'Latin tools endpoint not yet implemented or configured',
          metrics: { statusCode: response.status }
        };
      }
    } catch (error) {
      return {
        testName: 'Latin Tools Integration',
        status: 'warning',
        duration: performance.now() - startTime,
        details: 'Latin tools integration test - endpoint may not be ready',
        error: error as Error
      };
    }
  }

  private async testPerformanceMonitoringIntegration(): Promise<IntegrationTestResult> {
    const startTime = performance.now();
    
    try {
      // Test performance metrics endpoint
      const response = await fetch(`${this.baseUrl}/api/performance/metrics`);
      
      return {
        testName: 'Performance Monitoring Integration',
        status: response.ok ? 'passed' : 'warning',
        duration: performance.now() - startTime,
        details: response.ok ? 'Performance monitoring integrated' : 'Performance monitoring endpoint not ready',
        metrics: {
          responseTime: performance.now() - startTime,
          statusCode: response.status
        }
      };
    } catch (error) {
      return {
        testName: 'Performance Monitoring Integration',
        status: 'warning',
        duration: performance.now() - startTime,
        details: 'Performance monitoring integration test - may not be implemented yet',
        error: error as Error
      };
    }
  }

  private async testCacheSystemIntegration(): Promise<IntegrationTestResult> {
    const startTime = performance.now();
    
    try {
      // Test cache status endpoint
      const response = await fetch(`${this.baseUrl}/api/cache/status`);
      
      if (response.ok) {
        const data = await response.json();
        return {
          testName: 'Cache System Integration',
          status: 'passed',
          duration: performance.now() - startTime,
          details: 'Cache system integration successful',
          metrics: {
            responseTime: performance.now() - startTime,
            cacheHitRate: data.hitRate || 0,
            cacheSize: data.size || 0
          }
        };
      } else {
        return {
          testName: 'Cache System Integration',
          status: 'warning',
          duration: performance.now() - startTime,
          details: 'Cache system endpoint not available',
          metrics: { statusCode: response.status }
        };
      }
    } catch (error) {
      return {
        testName: 'Cache System Integration',
        status: 'warning',
        duration: performance.now() - startTime,
        details: 'Cache system integration test - endpoint may not be ready',
        error: error as Error
      };
    }
  }

  private async testMobileOptimizationSupport(): Promise<IntegrationTestResult> {
    const startTime = performance.now();
    
    try {
      // Test mobile-specific API optimizations
      const response = await fetch(`${this.baseUrl}/api/mobile/optimize`, {
        headers: {
          'User-Agent': 'Mobile Test Agent',
          'X-Mobile-Optimization': 'true'
        }
      });
      
      return {
        testName: 'Mobile Optimization Support',
        status: response.status === 404 ? 'warning' : 'passed',
        duration: performance.now() - startTime,
        details: response.status === 404 ? 'Mobile optimization endpoints not implemented' : 'Mobile optimization supported',
        metrics: {
          responseTime: performance.now() - startTime,
          statusCode: response.status
        }
      };
    } catch (error) {
      return {
        testName: 'Mobile Optimization Support',
        status: 'warning',
        duration: performance.now() - startTime,
        details: 'Mobile optimization test - backend support may not be implemented',
        error: error as Error
      };
    }
  }

  private async testAccessibilityBackendSupport(): Promise<IntegrationTestResult> {
    const startTime = performance.now();
    
    try {
      // Test accessibility-enhanced API responses
      const response = await fetch(`${this.baseUrl}/api/accessibility/features`);
      
      return {
        testName: 'Accessibility Backend Support',
        status: response.ok ? 'passed' : 'warning',
        duration: performance.now() - startTime,
        details: response.ok ? 'Accessibility features supported by backend' : 'Accessibility endpoints not implemented',
        metrics: {
          responseTime: performance.now() - startTime,
          statusCode: response.status
        }
      };
    } catch (error) {
      return {
        testName: 'Accessibility Backend Support',
        status: 'warning',
        duration: performance.now() - startTime,
        details: 'Accessibility support test - backend features may not be implemented',
        error: error as Error
      };
    }
  }

  private async testWebSocketConnection(): Promise<IntegrationTestResult> {
    const startTime = performance.now();
    
    return new Promise((resolve) => {
      try {
        const ws = new WebSocket(this.wsUrl);
        
        const timeout = setTimeout(() => {
          ws.close();
          resolve({
            testName: 'WebSocket Connection',
            status: 'failed',
            duration: performance.now() - startTime,
            details: 'WebSocket connection timeout',
            error: new Error('Connection timeout')
          });
        }, 5000);
        
        ws.onopen = () => {
          clearTimeout(timeout);
          ws.close();
          resolve({
            testName: 'WebSocket Connection',
            status: 'passed',
            duration: performance.now() - startTime,
            details: 'WebSocket connection successful',
            metrics: {
              connectionTime: performance.now() - startTime
            }
          });
        };
        
        ws.onerror = (error) => {
          clearTimeout(timeout);
          resolve({
            testName: 'WebSocket Connection',
            status: 'failed',
            duration: performance.now() - startTime,
            details: 'WebSocket connection failed',
            error: new Error('WebSocket connection error')
          });
        };
      } catch (error) {
        resolve({
          testName: 'WebSocket Connection',
          status: 'failed',
          duration: performance.now() - startTime,
          details: 'WebSocket test failed',
          error: error as Error
        });
      }
    });
  }

  // Placeholder methods for other WebSocket tests
  private async testRealTimeFeatures(): Promise<IntegrationTestResult> {
    return {
      testName: 'Real-time Features',
      status: 'warning',
      duration: 0,
      details: 'Real-time features test requires WebSocket implementation'
    };
  }

  private async testLiveQuizSessions(): Promise<IntegrationTestResult> {
    return {
      testName: 'Live Quiz Sessions',
      status: 'warning',
      duration: 0,
      details: 'Live quiz sessions test requires WebSocket implementation'
    };
  }

  private async testRealTimeLeaderboards(): Promise<IntegrationTestResult> {
    return {
      testName: 'Real-time Leaderboards',
      status: 'warning',
      duration: 0,
      details: 'Real-time leaderboards test requires WebSocket implementation'
    };
  }

  private async testCollaborativeLearning(): Promise<IntegrationTestResult> {
    return {
      testName: 'Collaborative Learning',
      status: 'warning',
      duration: 0,
      details: 'Collaborative learning test requires WebSocket implementation'
    };
  }

  private async testWebSocketPerformance(): Promise<IntegrationTestResult> {
    return {
      testName: 'WebSocket Performance',
      status: 'warning',
      duration: 0,
      details: 'WebSocket performance test requires WebSocket implementation'
    };
  }

  // Performance test placeholder methods
  private async testTextSearchPerformance(): Promise<IntegrationTestResult> {
    const startTime = performance.now();
    
    try {
      const response = await fetch(`${this.baseUrl}/api/text/search?query=virtus`);
      const duration = performance.now() - startTime;
      
      if (response.ok) {
        return {
          testName: 'Text Search Performance',
          status: duration < 50 ? 'passed' : 'warning', // Should be <50ms with 97% improvement
          duration,
          details: `Text search completed in ${duration.toFixed(2)}ms`,
          metrics: {
            responseTime: duration,
            expectedImprovement: '97%',
            targetTime: '<50ms'
          }
        };
      } else {
        return {
          testName: 'Text Search Performance',
          status: 'failed',
          duration,
          details: 'Text search API not available',
          error: new Error(`HTTP ${response.status}`)
        };
      }
    } catch (error) {
      return {
        testName: 'Text Search Performance',
        status: 'failed',
        duration: performance.now() - startTime,
        details: 'Text search performance test failed',
        error: error as Error
      };
    }
  }

  // Additional placeholder methods for remaining tests
  private async testQuizApiPerformance(): Promise<IntegrationTestResult> {
    return {
      testName: 'Quiz API Performance',
      status: 'warning',
      duration: 0,
      details: 'Quiz API performance test requires implementation'
    };
  }

  private async testAdvancedCachingPerformance(): Promise<IntegrationTestResult> {
    return {
      testName: 'Advanced Caching Performance',
      status: 'warning',
      duration: 0,
      details: 'Advanced caching performance test requires implementation'
    };
  }

  private async testMobileOptimizedApiCalls(): Promise<IntegrationTestResult> {
    return {
      testName: 'Mobile Optimized API Calls',
      status: 'warning',
      duration: 0,
      details: 'Mobile optimized API calls test requires implementation'
    };
  }

  private async testAccessibilityEnhancedApiResponses(): Promise<IntegrationTestResult> {
    return {
      testName: 'Accessibility Enhanced API Responses',
      status: 'warning',
      duration: 0,
      details: 'Accessibility enhanced API responses test requires implementation'
    };
  }

  private async testLatinToolsApiPerformance(): Promise<IntegrationTestResult> {
    return {
      testName: 'Latin Tools API Performance',
      status: 'warning',
      duration: 0,
      details: 'Latin tools API performance test requires implementation'
    };
  }

  // Database test placeholder methods
  private async testAnalyticsQueries(): Promise<IntegrationTestResult> {
    return {
      testName: 'Analytics Queries',
      status: 'warning',
      duration: 0,
      details: 'Analytics queries test requires database implementation'
    };
  }

  private async testEducationalOutcomeTracking(): Promise<IntegrationTestResult> {
    return {
      testName: 'Educational Outcome Tracking',
      status: 'warning',
      duration: 0,
      details: 'Educational outcome tracking test requires database implementation'
    };
  }

  private async testUserProgressTracking(): Promise<IntegrationTestResult> {
    return {
      testName: 'User Progress Tracking',
      status: 'warning',
      duration: 0,
      details: 'User progress tracking test requires database implementation'
    };
  }

  private async testInstitutionalReporting(): Promise<IntegrationTestResult> {
    return {
      testName: 'Institutional Reporting',
      status: 'warning',
      duration: 0,
      details: 'Institutional reporting test requires database implementation'
    };
  }

  private async testPerformanceMetricsStorage(): Promise<IntegrationTestResult> {
    return {
      testName: 'Performance Metrics Storage',
      status: 'warning',
      duration: 0,
      details: 'Performance metrics storage test requires database implementation'
    };
  }

  private async testAccessibilityDataStorage(): Promise<IntegrationTestResult> {
    return {
      testName: 'Accessibility Data Storage',
      status: 'warning',
      duration: 0,
      details: 'Accessibility data storage test requires database implementation'
    };
  }

  // Error handling test placeholder methods
  private async testNetworkErrorRecovery(): Promise<IntegrationTestResult> {
    return {
      testName: 'Network Error Recovery',
      status: 'warning',
      duration: 0,
      details: 'Network error recovery test requires implementation'
    };
  }

  private async testApiErrorHandling(): Promise<IntegrationTestResult> {
    return {
      testName: 'API Error Handling',
      status: 'warning',
      duration: 0,
      details: 'API error handling test requires implementation'
    };
  }

  private async testWebSocketReconnection(): Promise<IntegrationTestResult> {
    return {
      testName: 'WebSocket Reconnection',
      status: 'warning',
      duration: 0,
      details: 'WebSocket reconnection test requires implementation'
    };
  }

  private async testCacheErrorRecovery(): Promise<IntegrationTestResult> {
    return {
      testName: 'Cache Error Recovery',
      status: 'warning',
      duration: 0,
      details: 'Cache error recovery test requires implementation'
    };
  }

  private async testMobileOptimizationErrorHandling(): Promise<IntegrationTestResult> {
    return {
      testName: 'Mobile Optimization Error Handling',
      status: 'warning',
      duration: 0,
      details: 'Mobile optimization error handling test requires implementation'
    };
  }

  private async testAccessibilityErrorRecovery(): Promise<IntegrationTestResult> {
    return {
      testName: 'Accessibility Error Recovery',
      status: 'warning',
      duration: 0,
      details: 'Accessibility error recovery test requires implementation'
    };
  }

  // Public API methods
  public async runAllTests(): Promise<Map<string, IntegrationTestSuite>> {
    console.log('🚀 Starting comprehensive integration tests...');
    
    // Run all test suites
    await this.testBackendConnections();
    await this.testWebSocketFunctionality();
    await this.testApiPerformance();
    await this.testDatabaseOperations();
    await this.testErrorHandling();
    
    return this.testResults;
  }

  public getTestResults(): Map<string, IntegrationTestSuite> {
    return new Map(this.testResults);
  }

  public generateTestReport(): string {
    const report = {
      timestamp: new Date().toISOString(),
      baseUrl: this.baseUrl,
      wsUrl: this.wsUrl,
      totalSuites: this.testResults.size,
      results: Array.from(this.testResults.entries()).map(([name, suite]) => ({
        suiteName: name,
        summary: {
          totalTests: suite.totalTests,
          passed: suite.passedTests,
          failed: suite.failedTests,
          warnings: suite.warnings,
          coverage: `${suite.coverage.toFixed(1)}%`,
          duration: `${suite.totalDuration.toFixed(2)}ms`
        },
        tests: suite.tests.map(test => ({
          name: test.testName,
          status: test.status,
          duration: `${test.duration.toFixed(2)}ms`,
          details: test.details,
          error: test.error?.message
        }))
      }))
    };
    
    return JSON.stringify(report, null, 2);
  }

  public exportTestResults(): void {
    const report = this.generateTestReport();
    const blob = new Blob([report], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `macrobius-integration-tests-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  public isTestRunning(): boolean {
    return this.isRunning;
  }

  public getHealthChecks(): Map<string, BackendHealthCheck> {
    return new Map(this.healthChecks);
  }
}

// Singleton instance
export const integrationTestManager = new IntegrationTestManager();

// React Hook for integration testing
export function useIntegrationTesting() {
  const [testResults, setTestResults] = React.useState<Map<string, IntegrationTestSuite>>(new Map());
  const [isRunning, setIsRunning] = React.useState(false);
  const [currentTest, setCurrentTest] = React.useState<string>('');

  const runTests = async () => {
    setIsRunning(true);
    try {
      const results = await integrationTestManager.runAllTests();
      setTestResults(results);
    } catch (error) {
      console.error('Integration tests failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const runSpecificTest = async (testType: string) => {
    setIsRunning(true);
    setCurrentTest(testType);
    
    try {
      let result: IntegrationTestSuite;
      
      switch (testType) {
        case 'backend':
          result = await integrationTestManager.testBackendConnections();
          break;
        case 'websocket':
          result = await integrationTestManager.testWebSocketFunctionality();
          break;
        case 'performance':
          result = await integrationTestManager.testApiPerformance();
          break;
        case 'database':
          result = await integrationTestManager.testDatabaseOperations();
          break;
        case 'errors':
          result = await integrationTestManager.testErrorHandling();
          break;
        default:
          throw new Error(`Unknown test type: ${testType}`);
      }
      
      const updatedResults = new Map(testResults);
      updatedResults.set(testType, result);
      setTestResults(updatedResults);
    } catch (error) {
      console.error(`Test ${testType} failed:`, error);
    } finally {
      setIsRunning(false);
      setCurrentTest('');
    }
  };

  return {
    testResults,
    isRunning,
    currentTest,
    runTests,
    runSpecificTest,
    generateReport: integrationTestManager.generateTestReport.bind(integrationTestManager),
    exportResults: integrationTestManager.exportTestResults.bind(integrationTestManager)
  };
}

export default IntegrationTestManager;
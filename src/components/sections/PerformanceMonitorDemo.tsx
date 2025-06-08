/**
 * ⚡ PERFORMANCE MONITOR DEMONSTRATION COMPONENT
 * Real-time performance tracking and optimization showcase
 */

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Activity, 
  Zap, 
  Clock, 
  Monitor, 
  Cpu,
  HardDrive,
  Wifi,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface PerformanceMetrics {
  fps: number;
  loadTime: number;
  memoryUsage: number;
  networkLatency: number;
  bundleSize: number;
  cacheHitRate: number;
}

export default function PerformanceMonitorDemo() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    loadTime: 1200,
    memoryUsage: 45,
    networkLatency: 120,
    bundleSize: 850,
    cacheHitRate: 85
  });
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [performanceScore, setPerformanceScore] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMonitoring) {
      interval = setInterval(() => {
        setMetrics(prev => ({
          fps: Math.max(30, Math.min(60, prev.fps + (Math.random() - 0.5) * 10)),
          loadTime: Math.max(500, Math.min(3000, prev.loadTime + (Math.random() - 0.5) * 200)),
          memoryUsage: Math.max(20, Math.min(80, prev.memoryUsage + (Math.random() - 0.5) * 10)),
          networkLatency: Math.max(50, Math.min(500, prev.networkLatency + (Math.random() - 0.5) * 50)),
          bundleSize: prev.bundleSize,
          cacheHitRate: Math.max(70, Math.min(95, prev.cacheHitRate + (Math.random() - 0.5) * 5))
        }));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMonitoring]);

  useEffect(() => {
    // Calculate performance score
    let score = 0;
    if (metrics.fps >= 55) score += 25;
    else if (metrics.fps >= 45) score += 15;
    else if (metrics.fps >= 30) score += 5;
    
    if (metrics.loadTime <= 1000) score += 25;
    else if (metrics.loadTime <= 2000) score += 15;
    else if (metrics.loadTime <= 3000) score += 5;
    
    if (metrics.memoryUsage <= 40) score += 20;
    else if (metrics.memoryUsage <= 60) score += 10;
    
    if (metrics.networkLatency <= 100) score += 15;
    else if (metrics.networkLatency <= 200) score += 8;
    
    if (metrics.cacheHitRate >= 90) score += 15;
    else if (metrics.cacheHitRate >= 80) score += 10;
    else if (metrics.cacheHitRate >= 70) score += 5;
    
    setPerformanceScore(score);
  }, [metrics]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return { icon: CheckCircle, text: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 60) return { icon: AlertTriangle, text: 'Good', color: 'bg-yellow-100 text-yellow-800' };
    return { icon: AlertTriangle, text: 'Needs Improvement', color: 'bg-red-100 text-red-800' };
  };

  const scoreStatus = getScoreStatus(performanceScore);
  const StatusIcon = scoreStatus.icon;

  const performanceCards = [
    {
      id: 'fps',
      icon: Activity,
      title: 'Frame Rate',
      value: `${metrics.fps.toFixed(0)} FPS`,
      description: 'Smooth animations and interactions',
      status: metrics.fps >= 55 ? 'excellent' : metrics.fps >= 45 ? 'good' : 'poor',
      target: '60 FPS'
    },
    {
      id: 'load',
      icon: Clock,
      title: 'Load Time',
      value: `${metrics.loadTime.toFixed(0)}ms`,
      description: 'Initial page loading performance',
      status: metrics.loadTime <= 1000 ? 'excellent' : metrics.loadTime <= 2000 ? 'good' : 'poor',
      target: '< 1000ms'
    },
    {
      id: 'memory',
      icon: HardDrive,
      title: 'Memory Usage',
      value: `${metrics.memoryUsage.toFixed(0)}%`,
      description: 'Browser memory consumption',
      status: metrics.memoryUsage <= 40 ? 'excellent' : metrics.memoryUsage <= 60 ? 'good' : 'poor',
      target: '< 40%'
    },
    {
      id: 'network',
      icon: Wifi,
      title: 'Network Latency',
      value: `${metrics.networkLatency.toFixed(0)}ms`,
      description: 'API response times',
      status: metrics.networkLatency <= 100 ? 'excellent' : metrics.networkLatency <= 200 ? 'good' : 'poor',
      target: '< 100ms'
    },
    {
      id: 'bundle',
      icon: Monitor,
      title: 'Bundle Size',
      value: `${metrics.bundleSize}KB`,
      description: 'Total JavaScript bundle size',
      status: metrics.bundleSize <= 500 ? 'excellent' : metrics.bundleSize <= 1000 ? 'good' : 'poor',
      target: '< 500KB'
    },
    {
      id: 'cache',
      icon: TrendingUp,
      title: 'Cache Hit Rate',
      value: `${metrics.cacheHitRate.toFixed(0)}%`,
      description: 'Content delivery efficiency',
      status: metrics.cacheHitRate >= 90 ? 'excellent' : metrics.cacheHitRate >= 80 ? 'good' : 'poor',
      target: '> 90%'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="performance-monitor" className="py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <Activity size={32} color="white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">
                Performance Monitor
              </h2>
              <p className="text-purple-600 font-semibold">Real-time Optimization Tracking</p>
            </div>
          </div>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Monitor and optimize your learning experience with real-time performance metrics, 
            ensuring smooth interactions and fast loading times across all devices.
          </p>
        </div>

        {/* Performance Overview */}
        <Card className="p-8 mb-8 bg-white/90 backdrop-blur-sm border-2 border-violet-200 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center">
              <Zap size={24} color="#8b5cf6" className="mr-2" />
              Performance Dashboard
            </h3>
            <div className="flex items-center gap-4">
              <Badge className={scoreStatus.color}>
                <StatusIcon size={14} className="mr-1" />
                {scoreStatus.text}
              </Badge>
              <Button 
                onClick={() => setIsMonitoring(!isMonitoring)}
                className={isMonitoring ? 'bg-red-600 hover:bg-red-700' : 'bg-violet-600 hover:bg-violet-700'}
              >
                {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {performanceCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.id} className="p-6 bg-white/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Icon size={20} color="#8b5cf6" className="mr-2" />
                      <h4 className="font-semibold text-slate-900">{card.title}</h4>
                    </div>
                    <Badge className={getStatusColor(card.status)}>
                      {card.status}
                    </Badge>
                  </div>
                  <div className="mb-2">
                    <span className={`text-2xl font-bold ${getScoreColor(
                      card.status === 'excellent' ? 90 : card.status === 'good' ? 70 : 40
                    )}`}>
                      {card.value}
                    </span>
                    <span className="text-sm text-slate-500 ml-2">Target: {card.target}</span>
                  </div>
                  <p className="text-sm text-slate-600">{card.description}</p>
                  
                  {isMonitoring && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            card.status === 'excellent' ? 'bg-green-500' : 
                            card.status === 'good' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ 
                            width: `${card.status === 'excellent' ? 100 : card.status === 'good' ? 70 : 40}%` 
                          }}
                        />
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <div className="bg-slate-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-slate-900">Overall Performance Score</h4>
              <span className={`text-3xl font-bold ${getScoreColor(performanceScore)}`}>
                {performanceScore}/100
              </span>
            </div>
            <Progress value={performanceScore} className="h-4 mb-2" />
            <p className="text-sm text-slate-600">
              {performanceScore >= 80 ? 'Excellent performance! Your platform is highly optimized.' :
               performanceScore >= 60 ? 'Good performance with room for improvement in some areas.' :
               'Performance needs optimization. Consider the recommendations below.'}
            </p>
          </div>
        </Card>

        {/* Optimization Recommendations */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <TrendingUp size={24} color="#8b5cf6" className="mr-2" />
            Optimization Recommendations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">✅ Active Optimizations:</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Code splitting for reduced bundle size</li>
                <li>• Image optimization and lazy loading</li>
                <li>• Service worker caching strategy</li>
                <li>• CDN for static asset delivery</li>
                <li>• Gzip compression enabled</li>
                <li>• Database query optimization</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">🚀 Potential Improvements:</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Implement HTTP/3 for faster connections</li>
                <li>• Add edge caching for global users</li>
                <li>• Optimize CSS delivery (critical path)</li>
                <li>• Enable browser resource hints</li>
                <li>• Implement virtual scrolling for large lists</li>
                <li>• Add performance budgets to CI/CD</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-violet-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Cpu size={16} color="#8b5cf6" className="mr-2" />
              <span className="font-semibold text-slate-900">Pro Tip:</span>
            </div>
            <p className="text-sm text-slate-600">
              Performance monitoring helps identify bottlenecks before they impact users. 
              The Macrobius platform uses real-time metrics to automatically optimize 
              content delivery and user experience.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
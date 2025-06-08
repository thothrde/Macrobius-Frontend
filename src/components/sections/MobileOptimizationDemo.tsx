/**
 * 📱 MOBILE OPTIMIZATION DEMONSTRATION COMPONENT
 * Mobile-first design and touch interaction showcase
 */

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Hand, 
  Zap,
  Wifi,
  Battery,
  Settings,
  Maximize,
  CheckCircle,
  AlertTriangle,
  Activity
} from 'lucide-react';

interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop';
  screenWidth: number;
  screenHeight: number;
  touchSupport: boolean;
  connectionType: string;
}

export default function MobileOptimizationDemo() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: 'desktop',
    screenWidth: 1920,
    screenHeight: 1080,
    touchSupport: false,
    connectionType: 'wifi'
  });
  const [touchEvents, setTouchEvents] = useState<string[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    interactionDelay: 0,
    batteryOptimized: false
  });
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape');

  useEffect(() => {
    // Detect device type and capabilities
    const detectDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      if (width <= 768) deviceType = 'mobile';
      else if (width <= 1024) deviceType = 'tablet';
      
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const connectionType = connection ? connection.effectiveType || 'wifi' : 'wifi';
      
      setDeviceInfo({
        type: deviceType,
        screenWidth: width,
        screenHeight: height,
        touchSupport: hasTouch,
        connectionType: connectionType
      });
      
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    // Performance metrics simulation
    const measurePerformance = () => {
      const loadTime = Math.random() * 1000 + 500; // 500-1500ms
      const renderTime = Math.random() * 100 + 50; // 50-150ms
      const interactionDelay = Math.random() * 50 + 10; // 10-60ms
      
      setPerformanceMetrics({
        loadTime: Math.round(loadTime),
        renderTime: Math.round(renderTime),
        interactionDelay: Math.round(interactionDelay),
        batteryOptimized: loadTime < 1000 && renderTime < 100
      });
    };

    detectDevice();
    measurePerformance();
    
    const handleResize = () => detectDevice();
    const handleOrientationChange = () => {
      setTimeout(detectDevice, 100); // Delay to get accurate dimensions
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  const handleTouchDemo = (eventType: string) => {
    const newEvent = `${eventType} at ${new Date().toLocaleTimeString()}`;
    setTouchEvents(prev => [newEvent, ...prev.slice(0, 4)]);
  };

  const getDeviceIcon = () => {
    switch (deviceInfo.type) {
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      default: return Monitor;
    }
  };

  const getOptimizationScore = () => {
    let score = 0;
    if (deviceInfo.type === 'mobile') score += 25;
    if (deviceInfo.touchSupport) score += 20;
    if (performanceMetrics.loadTime < 1000) score += 25;
    if (performanceMetrics.interactionDelay < 50) score += 15;
    if (performanceMetrics.batteryOptimized) score += 15;
    return Math.min(score, 100);
  };

  const DeviceIcon = getDeviceIcon();
  const optimizationScore = getOptimizationScore();

  const mobileFeatures = [
    {
      id: 'responsive',
      icon: Maximize,
      title: 'Responsive Design',
      description: 'Adapts seamlessly to any screen size',
      status: deviceInfo.type === 'mobile' ? 'Optimized' : 'Desktop Mode',
      active: true
    },
    {
      id: 'touch',
      icon: Hand,
      title: 'Touch Interactions',
      description: 'Native touch gestures and haptic feedback',
      status: deviceInfo.touchSupport ? 'Supported' : 'Mouse Only',
      active: deviceInfo.touchSupport
    },
    {
      id: 'performance',
      icon: Zap,
      title: 'Performance',
      description: 'Optimized for mobile processors and battery life',
      status: performanceMetrics.batteryOptimized ? 'Optimized' : 'Standard',
      active: performanceMetrics.batteryOptimized
    },
    {
      id: 'offline',
      icon: Wifi,
      title: 'Network Aware',
      description: 'Adapts content based on connection quality',
      status: deviceInfo.connectionType.toUpperCase(),
      active: deviceInfo.connectionType !== 'slow-2g'
    }
  ];

  return (
    <section id="mobile-optimization" className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <DeviceIcon size={32} color="white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-teal-700 bg-clip-text text-transparent">
                Mobile Optimization
              </h2>
              <p className="text-teal-600 font-semibold">Touch-First Learning Experience</p>
            </div>
          </div>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Experience seamless learning on any device with our mobile-first design, 
            touch optimizations, and performance enhancements tailored for smartphones and tablets.
          </p>
        </div>

        {/* Device Detection Status */}
        <Card className="p-8 mb-8 bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center">
              <DeviceIcon size={24} color="#10b981" className="mr-2" />
              Device Analysis
            </h3>
            <Badge className={`${optimizationScore >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {optimizationScore}% Optimized
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <DeviceIcon size={32} color="#10b981" className="mx-auto mb-2" />
              <h4 className="font-semibold text-slate-900">{deviceInfo.type.charAt(0).toUpperCase() + deviceInfo.type.slice(1)}</h4>
              <p className="text-sm text-slate-600">{deviceInfo.screenWidth} × {deviceInfo.screenHeight}</p>
            </div>
            <div className="text-center">
              <Hand size={32} color={deviceInfo.touchSupport ? '#10b981' : '#6b7280'} className="mx-auto mb-2" />
              <h4 className="font-semibold text-slate-900">Touch Support</h4>
              <p className="text-sm text-slate-600">{deviceInfo.touchSupport ? 'Available' : 'Not Available'}</p>
            </div>
            <div className="text-center">
              <Activity size={32} color="#10b981" className="mx-auto mb-2" />
              <h4 className="font-semibold text-slate-900">Orientation</h4>
              <p className="text-sm text-slate-600">{orientation.charAt(0).toUpperCase() + orientation.slice(1)}</p>
            </div>
            <div className="text-center">
              <Wifi size={32} color="#10b981" className="mx-auto mb-2" />
              <h4 className="font-semibold text-slate-900">Connection</h4>
              <p className="text-sm text-slate-600">{deviceInfo.connectionType.toUpperCase()}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Mobile Optimization Score</span>
              <span className="text-sm text-slate-600">{optimizationScore}%</span>
            </div>
            <Progress value={optimizationScore} className="h-3" />
          </div>
        </Card>

        {/* Mobile Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {mobileFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.id} className="p-6 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    feature.active ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <Icon size={24} color={feature.active ? '#10b981' : '#6b7280'} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-slate-900">{feature.title}</h4>
                    <p className="text-slate-600 text-sm">{feature.description}</p>
                  </div>
                  <Badge className={`${
                    feature.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {feature.status}
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Touch Interaction Demo */}
        {deviceInfo.touchSupport && (
          <Card className="p-8 mb-8 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <Hand size={24} color="#10b981" className="mr-2" />
              <h3 className="text-2xl font-bold text-slate-900">Touch Interaction Demo</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Button 
                onTouchStart={() => handleTouchDemo('Touch Start')}
                onTouchEnd={() => handleTouchDemo('Touch End')}
                className="bg-green-600 hover:bg-green-700 h-16"
              >
                Tap Me
              </Button>
              <Button 
                onTouchStart={() => handleTouchDemo('Long Press')}
                className="bg-blue-600 hover:bg-blue-700 h-16"
                variant="outline"
              >
                Hold Me
              </Button>
              <Button 
                onTouchStart={() => handleTouchDemo('Swipe')}
                className="bg-purple-600 hover:bg-purple-700 h-16"
                variant="outline"
              >
                Swipe
              </Button>
              <Button 
                onTouchStart={() => handleTouchDemo('Pinch')}
                className="bg-orange-600 hover:bg-orange-700 h-16"
                variant="outline"
              >
                Pinch
              </Button>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Touch Events Log:</h4>
              {touchEvents.length > 0 ? (
                <div className="space-y-1">
                  {touchEvents.map((event, index) => (
                    <div key={index} className="text-sm text-slate-600 font-mono">
                      {event}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">Touch any button above to see events</p>
              )}
            </div>
          </Card>
        )}

        {/* Performance Metrics */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center">
              <Zap size={24} color="#10b981" className="mr-2" />
              Performance Metrics
            </h3>
            <div className="flex items-center">
              {performanceMetrics.batteryOptimized ? (
                <Battery size={20} color="#10b981" className="mr-2" />
              ) : (
                <AlertTriangle size={20} color="#f59e0b" className="mr-2" />
              )}
              <span className={`font-semibold ${performanceMetrics.batteryOptimized ? 'text-green-600' : 'text-yellow-600'}`}>
                {performanceMetrics.batteryOptimized ? 'Battery Optimized' : 'Standard Mode'}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={24} color="#3b82f6" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Load Time</h4>
              <p className="text-2xl font-bold text-blue-600 mb-1">{performanceMetrics.loadTime}ms</p>
              <p className="text-sm text-slate-600">Initial page load</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity size={24} color="#10b981" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Render Time</h4>
              <p className="text-2xl font-bold text-green-600 mb-1">{performanceMetrics.renderTime}ms</p>
              <p className="text-sm text-slate-600">Component rendering</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hand size={24} color="#8b5cf6" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Touch Response</h4>
              <p className="text-2xl font-bold text-purple-600 mb-1">{performanceMetrics.interactionDelay}ms</p>
              <p className="text-sm text-slate-600">Interaction delay</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center mb-3">
              <CheckCircle size={16} color="#10b981" className="mr-2" />
              <span className="font-semibold text-slate-900">Mobile Optimizations Active:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600">
              <div>• Adaptive image loading based on screen density</div>
              <div>• Touch-friendly interactive elements (44px minimum)</div>
              <div>• Reduced animations for battery conservation</div>
              <div>• Optimized fonts for mobile readability</div>
              <div>• Lazy loading for off-screen content</div>
              <div>• Compressed assets for faster loading</div>
            </div>
          </div>
        </Card>

        {/* Mobile Best Practices */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Mobile-First Design Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Hand, title: 'Touch-Friendly', desc: '44px minimum touch targets for accessibility' },
              { icon: Zap, title: 'Fast Loading', desc: 'Optimized for slow connections and limited data' },
              { icon: Battery, title: 'Battery Aware', desc: 'Reduced animations and efficient processing' },
              { icon: Maximize, title: 'Responsive', desc: 'Fluid layouts that work on any screen size' }
            ].map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div key={index} className="text-center">
                  <Icon size={32} color="#10b981" className="mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-900 mb-2">{principle.title}</h4>
                  <p className="text-sm text-slate-600">{principle.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
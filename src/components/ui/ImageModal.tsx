/**
 * Enhanced Image Modal System
 * Fixes: 
 * 1. Click issues - ensures modal works on every click, not just first
 * 2. Scrolling issues - proper scroll handling in modal windows
 * 3. Rich background information with cultural context
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, Share2, BookOpen, Star, Clock } from 'lucide-react';

interface ImageInfo {
  id: string;
  src: string;
  title: string;
  subtitle?: string;
  description: string;
  culturalContext: string;
  historicalPeriod: string;
  macrobiusConnection?: string;
  tychoConnection?: string;
  modernRelevance?: string;
  latinQuote?: string;
  translation?: string;
  tags?: string[];
  relatedImages?: string[];
  timeline?: {
    title: string;
    events: Array<{
      year: string;
      event: string;
      description: string;
      category?: string;
    }>;
  };
}

interface ImageModalProps {
  imageInfo: ImageInfo | null;
  isOpen: boolean;
  onClose: () => void;
  language?: 'DE' | 'EN' | 'LA';
}

// Fixed: Ensures modal state resets properly on every open/close cycle
const ImageModal: React.FC<ImageModalProps> = ({ imageInfo, isOpen, onClose, language: _language = 'DE' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [activeTab, setActiveTab] = useState<'info' | 'cultural' | 'connections'>('info');
  const [_scrollPosition, setScrollPosition] = useState(0);

  // Fixed: Reset modal state on every open to prevent click issues
  useEffect(() => {
    if (isOpen && imageInfo) {
      setIsLoading(true);
      setZoom(1);
      setRotation(0);
      setActiveTab('info');
      setScrollPosition(0);
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when modal closes
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, imageInfo]);

  // Fixed: Proper cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Fixed: Improved event handling for consistent behavior
  const handleClose = useCallback(() => {
    setIsLoading(true);
    setZoom(1);
    setRotation(0);
    setActiveTab('info');
    setScrollPosition(0);
    onClose();
  }, [onClose]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => prev + 90);
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  // Fixed: Proper scroll handling in modal content
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollTop);
  };

  if (!isOpen || !imageInfo) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        />

        {/* Modal Container - Fixed: Proper positioning and scroll handling */}
        <motion.div
          className="relative w-full max-w-7xl mx-4 h-[90vh] bg-white/95 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20 bg-gradient-to-r from-amber-50 to-yellow-50">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">{imageInfo.title}</h2>
              {imageInfo.subtitle && (
                <p className="text-lg text-amber-700 font-medium">{imageInfo.subtitle}</p>
              )}
            </div>
            
            {/* Image Controls */}
            <div className="flex items-center space-x-2 mr-4">
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-lg bg-white/80 hover:bg-white transition-colors"
                title="Verkleinern"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomIn}
                className="p-2 rounded-lg bg-white/80 hover:bg-white transition-colors"
                title="Vergrößern"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleRotate}
                className="p-2 rounded-lg bg-white/80 hover:bg-white transition-colors"
                title="Drehen"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="p-2 rounded-lg bg-white/80 hover:bg-white transition-colors"
                title="Zurücksetzen"
              >
                <Star className="w-4 h-4" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition-colors"
              title="Schließen"
            >
              <X className="w-5 h-5 text-red-600" />
            </button>
          </div>

          {/* Content Grid */}
          <div className="flex h-[calc(100%-4rem)]">
            {/* Image Panel */}
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8">
              <div className="relative max-w-full max-h-full">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <motion.img
                  src={imageInfo.src}
                  alt={imageInfo.title}
                  className="max-w-full max-h-full object-contain shadow-lg rounded-lg"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                    transition: 'transform 0.3s ease-out'
                  }}
                  onLoad={handleImageLoad}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoading ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Information Panel - Fixed: Proper scroll handling */}
            <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200">
                {[
                  { id: 'info', label: 'Info', icon: BookOpen },
                  { id: 'cultural', label: 'Kultur', icon: Star },
                  { id: 'connections', label: 'Verbindungen', icon: Share2 }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as 'info' | 'cultural' | 'connections')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
                      activeTab === id
                        ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-500'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content - Fixed: Proper scrolling with event handling */}
              <div 
                className="flex-1 overflow-y-auto p-6 space-y-6"
                onScroll={handleScroll}
                style={{ scrollBehavior: 'smooth' }}
              >
                {activeTab === 'info' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Beschreibung</h3>
                      <p className="text-gray-600 leading-relaxed">{imageInfo.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Historische Einordnung</h3>
                      <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                        <p className="text-sm text-amber-800 font-medium mb-2">Zeitperiode</p>
                        <p className="text-amber-700">{imageInfo.historicalPeriod}</p>
                      </div>
                    </div>

                    {imageInfo.tags && imageInfo.tags.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Schlagwörter</h3>
                        <div className="flex flex-wrap gap-2">
                          {imageInfo.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {imageInfo.latinQuote && (
                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <h3 className="text-lg font-semibold text-purple-800 mb-3">Lateinisches Zitat</h3>
                        <blockquote className="text-purple-700 italic mb-2">
                          "{imageInfo.latinQuote}"
                        </blockquote>
                        {imageInfo.translation && (
                          <p className="text-sm text-purple-600">{imageInfo.translation}</p>
                        )}
                      </div>
                    )}

                    {/* Historical Timeline Section */}
                    {imageInfo?.timeline && (
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <Clock className="h-5 w-5 mr-2" />
                          {imageInfo.timeline.title}
                        </h4>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {imageInfo.timeline.events.map((event, index) => (
                            <div key={index} className="border-l-4 border-amber-400 pl-4 py-2 bg-amber-50 rounded-r-lg">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900 text-sm">{event.year}</div>
                                  <div className="font-medium text-gray-800 text-sm mt-1">{event.event}</div>
                                  <div className="text-gray-600 text-xs mt-1 leading-relaxed">{event.description}</div>
                                </div>
                                {event.category && (
                                  <span className={`text-xs px-2 py-1 rounded-full ml-2 ${
                                    event.category === 'cultural' ? 'bg-purple-100 text-purple-700' :
                                    event.category === 'military' ? 'bg-red-100 text-red-700' :
                                    event.category === 'political' ? 'bg-blue-100 text-blue-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {event.category}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'cultural' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Kultureller Kontext</h3>
                      <p className="text-gray-600 leading-relaxed">{imageInfo.culturalContext}</p>
                    </div>

                    {imageInfo.macrobiusConnection && (
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h3 className="text-lg font-semibold text-green-800 mb-3">🏛️ Macrobius-Verbindung</h3>
                        <p className="text-green-700 leading-relaxed">{imageInfo.macrobiusConnection}</p>
                      </div>
                    )}

                    {imageInfo.modernRelevance && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h3 className="text-lg font-semibold text-blue-800 mb-3">🌐 Moderne Relevanz</h3>
                        <p className="text-blue-700 leading-relaxed">{imageInfo.modernRelevance}</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'connections' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {imageInfo.tychoConnection && (
                      <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                        <h3 className="text-lg font-semibold text-indigo-800 mb-3">🔭 Tycho Brahe Verbindung</h3>
                        <p className="text-indigo-700 leading-relaxed">{imageInfo.tychoConnection}</p>
                      </div>
                    )}

                    {imageInfo.relatedImages && imageInfo.relatedImages.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Verwandte Bilder</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {imageInfo.relatedImages.map((relatedImg, index) => (
                            <div key={index} className="bg-gray-100 rounded-lg p-3 text-center">
                              <div className="w-full h-20 bg-gray-200 rounded mb-2 flex items-center justify-center">
                                <span className="text-gray-500 text-xs">Vorschau</span>
                              </div>
                              <p className="text-xs text-gray-600">{relatedImg}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm">
                        <Share2 className="w-4 h-4" />
                        <span>Teilen</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;
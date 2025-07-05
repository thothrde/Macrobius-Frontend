/**
 * 🤖 KI-RAG-ASSISTENT PAGE - AI-Powered Question Answering
 * Complete page implementation for the RAG (Retrieval-Augmented Generation) system
 * 
 * Features:
 * - Integration with Oracle Cloud RAG backend
 * - Full-screen chat interface
 * - Multilingual support (DE/EN/LA)
 * - Source citations with similarity scores
 * - Connection status monitoring
 * - Responsive design for all devices
 * - SEO optimization
 * - Progress tracking integration
 */

import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import KIRAGAssistentSection from '@/components/sections/KIRAGAssistentSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bot, 
  MessageCircle, 
  BookOpen, 
  Zap, 
  Shield, 
  Globe,
  Info,
  CheckCircle
} from 'lucide-react';

interface KIRAGAssistentPageProps {
  // Props would be passed from getServerSideProps if needed
}

const KIRAGAssistentPage: NextPage<KIRAGAssistentPageProps> = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [pageMetrics, setPageMetrics] = useState({
    totalQueries: 0,
    successfulResponses: 0,
    averageResponseTime: 0,
    sourcesProvided: 0
  });

  useEffect(() => {
    // Initialize page
    setIsLoading(false);
    
    // Load any saved metrics
    const savedMetrics = localStorage.getItem('rag-metrics');
    if (savedMetrics) {
      try {
        setPageMetrics(JSON.parse(savedMetrics));
      } catch (error) {
        console.error('Error loading metrics:', error);
      }
    }
  }, []);

  const handleProgressUpdate = (progress: any) => {
    if (progress.type === 'rag_query') {
      setPageMetrics(prev => {
        const updated = {
          ...prev,
          totalQueries: prev.totalQueries + 1,
          successfulResponses: prev.successfulResponses + (progress.response_length > 0 ? 1 : 0),
          sourcesProvided: prev.sourcesProvided + (progress.sources_count || 0)
        };
        
        // Save to localStorage
        localStorage.setItem('rag-metrics', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const renderFeatureCards = () => {
    const features = [
      {
        icon: Bot,
        title: 'KI-gesteuerte Antworten',
        description: 'Modernste AI-Technologie für präzise Antworten zu Macrobius',
        color: 'text-blue-600'
      },
      {
        icon: BookOpen,
        title: '1.401 Authentische Quellen',
        description: 'Basiert auf vollständiger Sammlung lateinischer Originalpassagen',
        color: 'text-green-600'
      },
      {
        icon: Zap,
        title: 'Schnelle Antworten',
        description: 'Optimiert für schnelle und relevante Textanalyse',
        color: 'text-yellow-600'
      },
      {
        icon: Shield,
        title: 'Zuverlässige Quellen',
        description: 'Jede Antwort mit Quellenangaben und Ähnlichkeitsscores',
        color: 'text-purple-600'
      },
      {
        icon: Globe,
        title: 'Mehrsprachig',
        description: 'Unterstützt Deutsch, Englisch und Latein',
        color: 'text-indigo-600'
      },
      {
        icon: MessageCircle,
        title: 'Interaktiver Chat',
        description: 'Natürliche Gespräche über komplexe Themen',
        color: 'text-red-600'
      }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gray-50`}>
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderMetrics = () => {
    const metrics = [
      {
        label: 'Gesamtanfragen',
        value: pageMetrics.totalQueries,
        icon: MessageCircle,
        color: 'text-blue-600'
      },
      {
        label: 'Erfolgreiche Antworten',
        value: pageMetrics.successfulResponses,
        icon: CheckCircle,
        color: 'text-green-600'
      },
      {
        label: 'Quellen bereitgestellt',
        value: pageMetrics.sourcesProvided,
        icon: BookOpen,
        color: 'text-amber-600'
      },
      {
        label: 'Erfolgsrate',
        value: pageMetrics.totalQueries > 0 
          ? `${Math.round((pageMetrics.successfulResponses / pageMetrics.totalQueries) * 100)}%`
          : '0%',
        icon: Zap,
        color: 'text-purple-600'
      }
    ];

    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <div className="flex justify-center mb-2">
                  <IconComponent className={`w-8 h-8 ${metric.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600">
                  {metric.label}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Bot className="w-16 h-16 text-amber-600 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">KI-RAG-Assistent wird geladen...</h3>
            <p className="text-gray-600">Bitte warten Sie einen Moment</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>KI-RAG-Assistent - Macrobius AI-gesteuerte Textanalyse</title>
        <meta 
          name="description" 
          content="Stellen Sie Fragen zu Macrobius und erhalten Sie AI-gesteuerte Antworten basierend auf 1.401 authentischen lateinischen Textpassagen. Vollständige Quellenangaben inklusive." 
        />
        <meta name="keywords" content="Macrobius, KI, RAG, Textanalyse, Latein, AI-Assistent, Quellenangaben" />
        <meta name="author" content="Macrobius Learning Platform" />
        
        {/* Open Graph */}
        <meta property="og:title" content="KI-RAG-Assistent - Macrobius AI-Textanalyse" />
        <meta property="og:description" content="AI-gesteuerte Antworten zu Macrobius mit vollständigen Quellenangaben" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://macrobius.app/ki-rag-assistent" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="KI-RAG-Assistent - Macrobius AI-Textanalyse" />
        <meta name="twitter:description" content="AI-gesteuerte Antworten zu Macrobius mit authentischen Quellenangaben" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "KI-RAG-Assistent",
              "description": "AI-gesteuerte Textanalyse für Macrobius mit 1.401 authentischen Quellen",
              "url": "https://macrobius.app/ki-rag-assistent",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR"
              }
            })
          }}
        />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gray-50">
          {/* Page Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    KI-RAG-Assistent
                  </h1>
                  <p className="text-lg text-gray-600 max-w-3xl">
                    Stellen Sie komplexe Fragen zu Macrobius und erhalten Sie präzise, 
                    AI-gesteuerte Antworten basierend auf 1.401 authentischen lateinischen Textpassagen.
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ✓ Kostenlos
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    ✓ Keine Registrierung
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Info Alert */}
            <Alert className="mb-8 border-amber-200 bg-amber-50">
              <Info className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Tipp:</strong> Stellen Sie spezifische Fragen zu Philosophie, Religion, Träumen, 
                Astronomie oder anderen Themen aus Macrobius' Werken. Jede Antwort wird mit 
                authentischen Quellenangaben belegt.
              </AlertDescription>
            </Alert>

            {/* Session Metrics */}
            {pageMetrics.totalQueries > 0 && renderMetrics()}

            {/* Feature Cards */}
            {pageMetrics.totalQueries === 0 && renderFeatureCards()}

            {/* RAG Assistant Component */}
            <KIRAGAssistentSection 
              isActive={true}
              onProgressUpdate={handleProgressUpdate}
            />

            {/* Usage Guidelines */}
            <div className="mt-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Nutzungshinweise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Optimale Fragestellung:</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Spezifische Fragen zu philosophischen Konzepten</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Fragen zu römischen Bräuchen und Religion</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Interpretationen von Träumen und Visionen</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Astronomische und mathematische Konzepte</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Technische Details:</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Basiert auf Chroma Vector Database</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Verwendet Ollama Llama 3.1:8b LLM</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Sentence-Transformers für Embeddings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>100% kostenlos und Open Source</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default KIRAGAssistentPage;
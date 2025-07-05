/**
 * 🧭 MAIN NAVIGATION - Enhanced with KI-RAG Integration
 * Central navigation component with complete RAG system integration
 * 
 * ENHANCEMENTS:
 * - Added KI-RAG-Assistent to KI-SYSTEME section
 * - Multilingual support for navigation items
 * - Mobile-responsive design
 * - Active state management
 * - Icon integration with lucide-react
 * - Smooth transitions and animations
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  Home, 
  Book, 
  Globe, 
  Users, 
  MessageCircle, 
  Brain, 
  Target, 
  GraduationCap, 
  Sparkles, 
  Bot,
  ChevronDown,
  ChevronRight,
  Settings,
  User
} from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  isActive?: boolean;
  children?: NavigationItem[];
}

interface MainNavigationProps {
  currentPath: string;
  language: 'DE' | 'EN' | 'LA';
  onLanguageChange: (lang: 'DE' | 'EN' | 'LA') => void;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ 
  currentPath, 
  language = 'DE', 
  onLanguageChange 
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['ki-systeme']);
  const router = useRouter();

  // Navigation translations
  const translations = {
    DE: {
      dashboard: 'Dashboard',
      intro: 'Einführung',
      weltkarte: 'Weltkarte',
      kosmos: 'Kosmos',
      gastmahl: 'Gastmahl',
      textsuche: 'Textsuche',
      lernen: 'Lernen',
      visualisierungen: 'Visualisierungen',
      kiSysteme: 'KI-SYSTEME',
      kiKulturanalyse: 'KI-Kulturanalyse',
      lernpfade: 'Lernpfade',
      kiTutor: 'KI-Tutor',
      kulturmodule: 'Kulturmodule',
      kiRagAssistent: 'KI-RAG-Assistent',
      settings: 'Einstellungen',
      profile: 'Profil'
    },
    EN: {
      dashboard: 'Dashboard',
      intro: 'Introduction',
      weltkarte: 'World Map',
      kosmos: 'Cosmos',
      gastmahl: 'Banquet',
      textsuche: 'Text Search',
      lernen: 'Learning',
      visualisierungen: 'Visualizations',
      kiSysteme: 'AI SYSTEMS',
      kiKulturanalyse: 'AI Cultural Analysis',
      lernpfade: 'Learning Paths',
      kiTutor: 'AI Tutor',
      kulturmodule: 'Cultural Modules',
      kiRagAssistent: 'AI-RAG Assistant',
      settings: 'Settings',
      profile: 'Profile'
    },
    LA: {
      dashboard: 'Tabula',
      intro: 'Introductio',
      weltkarte: 'Mappa Mundi',
      kosmos: 'Cosmos',
      gastmahl: 'Convivium',
      textsuche: 'Textus Investigatio',
      lernen: 'Discere',
      visualisierungen: 'Visualizationes',
      kiSysteme: 'SYSTEMATA INTELLIGENTIAE',
      kiKulturanalyse: 'Analysis Culturalis',
      lernpfade: 'Semitae Discendi',
      kiTutor: 'Tutor Intelligentiae',
      kulturmodule: 'Moduli Culturales',
      kiRagAssistent: 'Intelligentia-RAG',
      settings: 'Optiones',
      profile: 'Profilus'
    }
  };

  const t = translations[language];

  // Main navigation structure
  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: t.dashboard,
      icon: Home,
      href: '/dashboard',
      isActive: currentPath === '/dashboard'
    },
    {
      id: 'intro',
      label: t.intro,
      icon: Book,
      href: '/intro',
      isActive: currentPath === '/intro'
    },
    {
      id: 'weltkarte',
      label: t.weltkarte,
      icon: Globe,
      href: '/weltkarte',
      isActive: currentPath === '/weltkarte'
    },
    {
      id: 'kosmos',
      label: t.kosmos,
      icon: Sparkles,
      href: '/kosmos',
      isActive: currentPath === '/kosmos'
    },
    {
      id: 'gastmahl',
      label: t.gastmahl,
      icon: Users,
      href: '/gastmahl',
      isActive: currentPath === '/gastmahl'
    },
    {
      id: 'textsuche',
      label: t.textsuche,
      icon: MessageCircle,
      href: '/textsuche',
      isActive: currentPath === '/textsuche'
    },
    {
      id: 'lernen',
      label: t.lernen,
      icon: GraduationCap,
      href: '/lernen',
      isActive: currentPath === '/lernen'
    },
    {
      id: 'visualisierungen',
      label: t.visualisierungen,
      icon: Target,
      href: '/visualisierungen',
      isActive: currentPath === '/visualisierungen'
    }
  ];

  // KI-SYSTEME subsection
  const kiSystemeItems: NavigationItem[] = [
    {
      id: 'ki-kulturanalyse',
      label: t.kiKulturanalyse,
      icon: Brain,
      href: '/ki-kulturanalyse',
      isActive: currentPath === '/ki-kulturanalyse'
    },
    {
      id: 'lernpfade',
      label: t.lernpfade,
      icon: Target,
      href: '/lernpfade',
      isActive: currentPath === '/lernpfade'
    },
    {
      id: 'ki-tutor',
      label: t.kiTutor,
      icon: GraduationCap,
      href: '/ki-tutor',
      isActive: currentPath === '/ki-tutor'
    },
    {
      id: 'kulturmodule',
      label: t.kulturmodule,
      icon: Sparkles,
      href: '/kulturmodule',
      isActive: currentPath === '/kulturmodule'
    },
    {
      id: 'ki-rag-assistent',
      label: t.kiRagAssistent,
      icon: Bot,
      href: '/ki-rag-assistent',
      isActive: currentPath === '/ki-rag-assistent'
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const NavigationLink = ({ item }: { item: NavigationItem }) => {
    const IconComponent = item.icon;
    const isActive = item.isActive || currentPath === item.href;
    
    return (
      <Link
        href={item.href}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-amber-50 group ${
          isActive 
            ? 'bg-amber-100 text-amber-800 font-medium border-l-4 border-amber-600' 
            : 'text-gray-700 hover:text-amber-700'
        }`}
      >
        <IconComponent className={`w-5 h-5 transition-colors ${
          isActive ? 'text-amber-600' : 'text-gray-500 group-hover:text-amber-600'
        }`} />
        <span className="text-sm">{item.label}</span>
      </Link>
    );
  };

  const LanguageSelector = () => {
    return (
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="text-xs font-medium text-gray-500 mb-2">Sprache / Language</div>
        <div className="flex gap-1">
          {['DE', 'EN', 'LA'].map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang as 'DE' | 'EN' | 'LA')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                language === lang
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg flex items-center justify-center">
            <Book className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Macrobius</h1>
            <p className="text-xs text-gray-500">Latin Learning Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {/* Main Navigation Items */}
          {navigationItems.map((item) => (
            <NavigationLink key={item.id} item={item} />
          ))}
          
          {/* KI-SYSTEME Section */}
          <div className="pt-4">
            <button
              onClick={() => toggleSection('ki-systeme')}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-gray-500" />
                <span>{t.kiSysteme}</span>
              </div>
              {expandedSections.includes('ki-systeme') ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </button>
            
            {/* KI-SYSTEME Subsection */}
            {expandedSections.includes('ki-systeme') && (
              <div className="ml-4 mt-2 space-y-1">
                {kiSystemeItems.map((item) => (
                  <NavigationLink key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Language Selector */}
      <LanguageSelector />

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <Link
            href="/settings"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>{t.settings}</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <User className="w-4 h-4" />
            <span>{t.profile}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
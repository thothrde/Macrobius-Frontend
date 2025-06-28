/**
 * 🌐 LANGUAGE CONTEXT - EXTENDED WITH AI COMPONENT SUPPORT
 * Comprehensive multilingual support for all Macrobius app components
 * UPDATED: Added complete AI component translations
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'DE' | 'EN' | 'LA';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | null;
}

interface LanguageProviderProps {
  children: ReactNode;
}

// Comprehensive translations with AI component support
const translations = {
  DE: {
    // Navigation
    'nav.intro': 'Einführung',
    'nav.quiz': 'Quiz',
    'nav.worldmap': 'Weltkarte',
    'nav.cosmos': 'Kosmos',
    'nav.banquet': 'Gastmahl',
    'nav.textprocessor': 'Textsuche',
    'nav.learning': 'Lernen',
    'nav.visualizations': 'Visualisierungen',
    
    // Intro Section
    'intro.welcome': 'Willkommen zur digitalen Reise durch Macrobius\' Welt',
    'intro.description': 'Entdecken Sie die reiche kulturelle Landschaft des spätrömischen Gelehrten Macrobius durch interaktive Erkundung seiner Werke Saturnalia und Commentarii in Somnium Scipionis.',
    'intro.explore': 'Entdecken beginnen',
    'intro.interactive': 'Interaktive Erkundung',
    'intro.multilingual': 'Mehrsprachige Unterstützung',
    'intro.scholarly': 'Wissenschaftliche Tiefe',
    
    // Quiz Section
    'quiz.title': 'Interaktives Macrobius-Quiz',
    'quiz.subtitle': 'Testen Sie Ihr Wissen über römische Kultur',
    'quiz.description': 'Herausfordernde Fragen zu Macrobius\' Werken, römischer Kultur und antiker Weisheit.',
    'quiz.start': 'Quiz starten',
    'quiz.next': 'Weiter',
    'quiz.finish': 'Quiz beenden',
    'quiz.score': 'Ihr Ergebnis',
    'quiz.correct': 'Richtig',
    'quiz.incorrect': 'Falsch',
    
    // World Map Section
    'worldmap.title': 'Interaktive Macrobius-Weltkarte',
    'worldmap.subtitle': 'Geografische Kenntnisse der Antike',
    'worldmap.description': 'Erkunden Sie die Welt, wie sie Macrobius und seine Zeitgenossen kannten.',
    'worldmap.explore': 'Karte erkunden',
    
    // Cosmos Section
    'cosmos.title': 'Macrobius-Kosmos',
    'cosmos.subtitle': 'Antike Astronomie und Kosmologie',
    'cosmos.description': 'Entdecken Sie Macrobius\' Verständnis des Universums und der Himmelssphären.',
    'cosmos.explore': 'Kosmos erkunden',
    
    // Banquet Section
    'banquet_title': 'Gelehrtes Gastmahl',
    'banquet_subtitle': 'Macrobius\' Saturnalia und Commentarii',
    'banquet_description': 'Treten Sie ein in die Welt der römischen Gelehrsamkeit, wo intellektuelle Diskussionen bei festlichen Mahlzeiten stattfanden. Entdecken Sie, wie kulturelles Wissen in geselligen Zusammenkünften weitergegeben wurde.',
    
    // Text Processor Section
    'textprocessor.title': 'Macrobius-Textprozessor',
    'textprocessor.subtitle': 'Erweiterte Textanalyse und -suche',
    'textprocessor.description': 'Durchsuchen und analysieren Sie den gesamten Macrobius-Korpus mit fortschrittlichen Werkzeugen.',
    'textprocessor.search': 'Text durchsuchen',
    
    // Learning Section
    'learning.title': 'Lernen',
    'learning.vocabulary': 'Vokabeltrainer',
    'learning.grammar': 'Grammatik-Erklärungen',
    'learning.description': 'Interaktive Lernwerkzeuge für lateinische Sprache und römische Kultur.',
    
    // Visualizations
    'viz.timeline': 'Zeitleiste',
    'viz.network': 'Charakternetzwerk',
    'viz.heatmap': 'Thematische Heatmap',
    'viz.relationships': 'Themen-Beziehungen',
    
    // AI Cultural Analysis Component
    'ai.cultural.title': 'KI-Kulturanalyse-Engine',
    'ai.cultural.subtitle': 'Intelligente Kulturthemen-Erkennung & Mustererkennung',
    'ai.cultural.description': 'Revolutionäres KI-System, das lateinische Texte analysiert, um kulturelle Themen zu identifizieren, historische Muster zu erkennen und Verbindungen zu modernen Anwendungen herzustellen.',
    'ai.cultural.tab.analyze': 'KI-Analyse',
    'ai.cultural.tab.explore': 'Themen-Explorer',
    'ai.cultural.tab.statistics': 'Statistiken',
    'ai.cultural.engine.title': 'Textanalyse-Engine',
    'ai.cultural.input.label': 'Lateinischen Text zur Kulturanalyse eingeben:',
    'ai.cultural.input.placeholder': 'Lateinischen Text hier für KI-gestützte Kulturanalyse einfügen...',
    'ai.cultural.samples.label': 'Oder versuchen Sie diese Beispieltexte:',
    'ai.cultural.analyzing': 'Analysiert...',
    'ai.cultural.analyze.button': 'Mit KI analysieren',
    'ai.cultural.results.title': 'Analyseergebnisse',
    'ai.cultural.confidence': 'Vertrauen',
    'ai.cultural.themes.detected': 'Erkannte kulturelle Themen',
    'ai.cultural.passages': 'Passagen',
    'ai.cultural.connections.modern': 'Moderne Verbindungen',
    'ai.cultural.match': 'Übereinstimmung',
    'ai.cultural.insights': 'Kulturelle Einsichten',
    'ai.cultural.recommendations': 'Empfehlungen',
    'ai.cultural.explorer.title': 'Kulturthemen-Explorer',
    'ai.cultural.search.passages': 'Passagen suchen',
    'ai.cultural.found': 'Gefunden',
    'ai.cultural.relevance': 'Relevanz',
    'ai.cultural.statistics.title': 'Analyse-Statistiken',
    'ai.cultural.total.passages': 'Gesamt Passagen',
    'ai.cultural.avg.relevance': 'Durchschn. Relevanz-Score',
    'ai.cultural.cultural.themes': 'Kulturelle Themen',
    'ai.cultural.theme.distribution': 'Themen-Verteilung',
    'ai.cultural.difficulty.distribution': 'Schwierigkeits-Verteilung',
    'ai.cultural.oracle.status': 'Bereit für Oracle Cloud Integration - 1.401 Passagen verfügbar',
    
    // AI Tutor Component
    'ai.tutor.title': 'KI-Tutorsystem',
    'ai.tutor.subtitle': 'Intelligenter Lernassistent',
    'ai.tutor.description': 'Ein fortschrittliches KI-System, das kontextbewusste Anleitung und personalisierte kulturelle Erklärungen bietet, um Ihr Verständnis der römischen Kultur durch Macrobius zu vertiefen.',
    'ai.tutor.setup.title': 'Sitzung einrichten',
    'ai.tutor.select.topic': 'Thema auswählen',
    'ai.tutor.select.difficulty': 'Schwierigkeit wählen',
    'ai.tutor.start.session': 'Sitzung starten',
    'ai.tutor.difficulty': 'Schwierigkeit',
    'ai.tutor.session.time': 'Sitzungszeit',
    'ai.tutor.end.session': 'Beenden',
    'ai.tutor.you': 'Sie',
    'ai.tutor.ai.tutor': 'KI-Tutor',
    'ai.tutor.confidence': 'Vertrauen',
    'ai.tutor.modern.examples': 'Moderne Beispiele',
    'ai.tutor.suggested.followup': 'Vorgeschlagene Folgefragen',
    'ai.tutor.type.message': 'Nachricht eingeben...',
    'ai.tutor.send': 'Senden',
    'ai.tutor.thinking': 'Denkt nach...',
    'ai.tutor.connection.status': 'Verbindungsstatus',
    'ai.tutor.oracle.connected': 'Mit Oracle Cloud KI verbunden',
    'ai.tutor.mock.mode': 'Demo-Modus aktiv',
    'ai.tutor.plotinus.quote': '"Die Seele, die zur Erkenntnis gelangt ist, kehrt zu ihrer Quelle zurück." - Plotinus',
    
    // Common
    'common.loading': 'Wird geladen...',
    'common.error': 'Fehler',
    'common.retry': 'Erneut versuchen',
    'common.close': 'Schließen',
    'common.open': 'Öffnen',
    'common.back': 'Zurück',
    'common.next': 'Weiter',
    'common.previous': 'Zurück',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.delete': 'Löschen',
    'common.edit': 'Bearbeiten',
    'common.view': 'Ansehen',
    'common.download': 'Herunterladen',
    'common.share': 'Teilen'
  },
  
  EN: {
    // Navigation
    'nav.intro': 'Introduction',
    'nav.quiz': 'Quiz',
    'nav.worldmap': 'World Map',
    'nav.cosmos': 'Cosmos',
    'nav.banquet': 'Banquet',
    'nav.textprocessor': 'Text Search',
    'nav.learning': 'Learning',
    'nav.visualizations': 'Visualizations',
    
    // Intro Section
    'intro.welcome': 'Welcome to the Digital Journey Through Macrobius\' World',
    'intro.description': 'Discover the rich cultural landscape of the late Roman scholar Macrobius through interactive exploration of his works Saturnalia and Commentarii in Somnium Scipionis.',
    'intro.explore': 'Begin Exploration',
    'intro.interactive': 'Interactive Exploration',
    'intro.multilingual': 'Multilingual Support',
    'intro.scholarly': 'Scholarly Depth',
    
    // Quiz Section
    'quiz.title': 'Interactive Macrobius Quiz',
    'quiz.subtitle': 'Test Your Knowledge of Roman Culture',
    'quiz.description': 'Challenging questions about Macrobius\' works, Roman culture, and ancient wisdom.',
    'quiz.start': 'Start Quiz',
    'quiz.next': 'Next',
    'quiz.finish': 'Finish Quiz',
    'quiz.score': 'Your Score',
    'quiz.correct': 'Correct',
    'quiz.incorrect': 'Incorrect',
    
    // World Map Section
    'worldmap.title': 'Interactive Macrobius World Map',
    'worldmap.subtitle': 'Ancient Geographical Knowledge',
    'worldmap.description': 'Explore the world as Macrobius and his contemporaries knew it.',
    'worldmap.explore': 'Explore Map',
    
    // Cosmos Section
    'cosmos.title': 'Macrobius Cosmos',
    'cosmos.subtitle': 'Ancient Astronomy and Cosmology',
    'cosmos.description': 'Discover Macrobius\' understanding of the universe and celestial spheres.',
    'cosmos.explore': 'Explore Cosmos',
    
    // Banquet Section
    'banquet_title': 'Scholarly Banquet',
    'banquet_subtitle': 'Macrobius\' Saturnalia and Commentarii',
    'banquet_description': 'Step into the world of Roman scholarship, where intellectual discussions flourished during festive meals. Discover how cultural knowledge was transmitted through social gatherings.',
    
    // Text Processor Section
    'textprocessor.title': 'Macrobius Text Processor',
    'textprocessor.subtitle': 'Advanced Text Analysis and Search',
    'textprocessor.description': 'Search and analyze the complete Macrobius corpus with advanced tools.',
    'textprocessor.search': 'Search Text',
    
    // Learning Section
    'learning.title': 'Learning',
    'learning.vocabulary': 'Vocabulary Trainer',
    'learning.grammar': 'Grammar Explanations',
    'learning.description': 'Interactive learning tools for Latin language and Roman culture.',
    
    // Visualizations
    'viz.timeline': 'Timeline',
    'viz.network': 'Character Network',
    'viz.heatmap': 'Thematic Heatmap',
    'viz.relationships': 'Theme Relationships',
    
    // AI Cultural Analysis Component
    'ai.cultural.title': 'AI Cultural Analysis Engine',
    'ai.cultural.subtitle': 'Intelligent Cultural Theme Detection & Pattern Recognition',
    'ai.cultural.description': 'Revolutionary AI system that analyzes Latin texts to identify cultural themes, detect historical patterns, and establish connections to modern applications.',
    'ai.cultural.tab.analyze': 'AI Analysis',
    'ai.cultural.tab.explore': 'Theme Explorer',
    'ai.cultural.tab.statistics': 'Statistics',
    'ai.cultural.engine.title': 'Text Analysis Engine',
    'ai.cultural.input.label': 'Enter Latin text for cultural analysis:',
    'ai.cultural.input.placeholder': 'Paste Latin text here for AI-powered cultural analysis...',
    'ai.cultural.samples.label': 'Or try these sample texts:',
    'ai.cultural.analyzing': 'Analyzing...',
    'ai.cultural.analyze.button': 'Analyze with AI',
    'ai.cultural.results.title': 'Analysis Results',
    'ai.cultural.confidence': 'Confidence',
    'ai.cultural.themes.detected': 'Detected Cultural Themes',
    'ai.cultural.passages': 'passages',
    'ai.cultural.connections.modern': 'Modern Connections',
    'ai.cultural.match': 'match',
    'ai.cultural.insights': 'Cultural Insights',
    'ai.cultural.recommendations': 'Recommendations',
    'ai.cultural.explorer.title': 'Cultural Theme Explorer',
    'ai.cultural.search.passages': 'Search Passages',
    'ai.cultural.found': 'Found',
    'ai.cultural.relevance': 'Relevance',
    'ai.cultural.statistics.title': 'Analysis Statistics',
    'ai.cultural.total.passages': 'Total Passages',
    'ai.cultural.avg.relevance': 'Avg. Relevance Score',
    'ai.cultural.cultural.themes': 'Cultural Themes',
    'ai.cultural.theme.distribution': 'Theme Distribution',
    'ai.cultural.difficulty.distribution': 'Difficulty Distribution',
    'ai.cultural.oracle.status': 'Ready for Oracle Cloud Integration - 1,401 Passages Available',
    
    // AI Tutor Component
    'ai.tutor.title': 'AI Tutoring System',
    'ai.tutor.subtitle': 'Intelligent Learning Assistant',
    'ai.tutor.description': 'An advanced AI system that provides context-aware guidance and personalized cultural explanations to deepen your understanding of Roman culture through Macrobius.',
    'ai.tutor.setup.title': 'Setup Your Session',
    'ai.tutor.select.topic': 'Select Topic',
    'ai.tutor.select.difficulty': 'Select Difficulty',
    'ai.tutor.start.session': 'Start Tutoring Session',
    'ai.tutor.difficulty': 'Difficulty',
    'ai.tutor.session.time': 'Session Time',
    'ai.tutor.end.session': 'End Session',
    'ai.tutor.you': 'You',
    'ai.tutor.ai.tutor': 'AI Tutor',
    'ai.tutor.confidence': 'confidence',
    'ai.tutor.modern.examples': 'Modern Examples',
    'ai.tutor.suggested.followup': 'Suggested Follow-up',
    'ai.tutor.type.message': 'Type your message...',
    'ai.tutor.send': 'Send',
    'ai.tutor.thinking': 'Thinking...',
    'ai.tutor.connection.status': 'Connection Status',
    'ai.tutor.oracle.connected': 'Connected to Oracle Cloud AI',
    'ai.tutor.mock.mode': 'Demo Mode Active',
    'ai.tutor.plotinus.quote': '"The soul that has attained knowledge returns to its source." - Plotinus',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.retry': 'Retry',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.download': 'Download',
    'common.share': 'Share'
  },
  
  LA: {
    // Navigation
    'nav.intro': 'Introductio',
    'nav.quiz': 'Quaestiones',
    'nav.worldmap': 'Mappa Mundi',
    'nav.cosmos': 'Cosmos',
    'nav.banquet': 'Convivium',
    'nav.textprocessor': 'Inquisitio Textuum',
    'nav.learning': 'Discenda',
    'nav.visualizations': 'Repraesentationes',
    
    // Intro Section
    'intro.welcome': 'Salve in Iter Digitale per Mundum Macrobii',
    'intro.description': 'Discoveri divitem culturam tardi eruditi Romani Macrobii per explorationem interactivam operum Saturnalia et Commentarii in Somnium Scipionis.',
    'intro.explore': 'Explorationem Incipere',
    'intro.interactive': 'Exploratio Interactiva',
    'intro.multilingual': 'Auxilium Multilinguae',
    'intro.scholarly': 'Profunditas Scholastica',
    
    // Quiz Section
    'quiz.title': 'Quaestiones Interactivae Macrobianae',
    'quiz.subtitle': 'Proba Scientiam Tuam Culturae Romanae',
    'quiz.description': 'Quaestiones difficiles de operibus Macrobii, cultura Romana, et sapientia antiqua.',
    'quiz.start': 'Quaestiones Incipere',
    'quiz.next': 'Sequens',
    'quiz.finish': 'Quaestiones Finire',
    'quiz.score': 'Tuum Pretium',
    'quiz.correct': 'Rectum',
    'quiz.incorrect': 'Falsum',
    
    // World Map Section
    'worldmap.title': 'Mappa Mundi Interactiva Macrobiana',
    'worldmap.subtitle': 'Scientia Geographica Antiqua',
    'worldmap.description': 'Explora mundum sicut Macrobius et coaevi eius noverunt.',
    'worldmap.explore': 'Mappam Explorare',
    
    // Cosmos Section
    'cosmos.title': 'Cosmos Macrobianus',
    'cosmos.subtitle': 'Astronomia et Cosmologia Antiqua',
    'cosmos.description': 'Discoperi intellectum Macrobii universi et sphaerarum caelestium.',
    'cosmos.explore': 'Cosmum Explorare',
    
    // Banquet Section
    'banquet_title': 'Convivium Doctorum',
    'banquet_subtitle': 'Saturnalia et Commentarii Macrobii',
    'banquet_description': 'Ingredere in mundum eruditionis Romanae, ubi disputationes intellectuales in conviviis festis habebantur. Discooperi quomodo scientia culturalis in coetibus socialibus tradebatur.',
    
    // Text Processor Section
    'textprocessor.title': 'Processor Textuum Macrobianus',
    'textprocessor.subtitle': 'Analysis Textuum Provecta et Inquisitio',
    'textprocessor.description': 'Inquire et analysa completum corpus Macrobianum instrumentis provectis.',
    'textprocessor.search': 'Textum Inquirere',
    
    // Learning Section
    'learning.title': 'Discenda',
    'learning.vocabulary': 'Exercitator Vocabularii',
    'learning.grammar': 'Explanationes Grammaticae',
    'learning.description': 'Instrumenta discendi interactiva pro lingua Latina et cultura Romana.',
    
    // Visualizations
    'viz.timeline': 'Linea Temporis',
    'viz.network': 'Rete Personarum',
    'viz.heatmap': 'Mappa Thermica Thematica',
    'viz.relationships': 'Relationes Thematum',
    
    // AI Cultural Analysis Component
    'ai.cultural.title': 'Machina Analyseos Culturalis AI',
    'ai.cultural.subtitle': 'Cognitio Thematum Culturalium et Recognitio Formarum Intelligens',
    'ai.cultural.description': 'Systema AI revolutionarium quod textus Latinos analysat ad themata culturalia identificanda, formas historicas cognoscendas et nexus cum applicationibus modernis stabiliendos.',
    'ai.cultural.tab.analyze': 'Analysis AI',
    'ai.cultural.tab.explore': 'Explorator Thematum',
    'ai.cultural.tab.statistics': 'Statistica',
    'ai.cultural.engine.title': 'Machina Analyseos Textuum',
    'ai.cultural.input.label': 'Textum Latinum ad analysim culturalem inserere:',
    'ai.cultural.input.placeholder': 'Textum Latinum hic ad analysim culturalem AI inserere...',
    'ai.cultural.samples.label': 'Vel hos textus exemplares temptare:',
    'ai.cultural.analyzing': 'Analysat...',
    'ai.cultural.analyze.button': 'Cum AI analysare',
    'ai.cultural.results.title': 'Resultata Analysis',
    'ai.cultural.confidence': 'Fiducia',
    'ai.cultural.themes.detected': 'Themata Culturalia Detecta',
    'ai.cultural.passages': 'passus',
    'ai.cultural.connections.modern': 'Nexus Moderni',
    'ai.cultural.match': 'concordia',
    'ai.cultural.insights': 'Perspectus Culturales',
    'ai.cultural.recommendations': 'Commendationes',
    'ai.cultural.explorer.title': 'Explorator Thematum Culturalium',
    'ai.cultural.search.passages': 'Passus quaerere',
    'ai.cultural.found': 'Inventum',
    'ai.cultural.relevance': 'Relevantia',
    'ai.cultural.statistics.title': 'Statistica Analyseos',
    'ai.cultural.total.passages': 'Passus Totales',
    'ai.cultural.avg.relevance': 'Scorum Relevantiae Medium',
    'ai.cultural.cultural.themes': 'Themata Culturalia',
    'ai.cultural.theme.distribution': 'Distributio Thematum',
    'ai.cultural.difficulty.distribution': 'Distributio Difficultatis',
    'ai.cultural.oracle.status': 'Paratum ad integrationem Oracle Cloud - 1.401 passus disponibiles',
    
    // AI Tutor Component
    'ai.tutor.title': 'Systema Tutoris AI',
    'ai.tutor.subtitle': 'Auxilium Intelligens Discendi',
    'ai.tutor.description': 'Systema AI provectum quod directionem contextualem et explicationes culturales personalizatas praebet ad intellegentiam tuam culturae Romanae per Macrobium profundandam.',
    'ai.tutor.setup.title': 'Sessionem Constituere',
    'ai.tutor.select.topic': 'Argumentum Eligere',
    'ai.tutor.select.difficulty': 'Difficultatem Eligere',
    'ai.tutor.start.session': 'Sessionem Incipere',
    'ai.tutor.difficulty': 'Difficultas',
    'ai.tutor.session.time': 'Tempus Sessionis',
    'ai.tutor.end.session': 'Finire',
    'ai.tutor.you': 'Tu',
    'ai.tutor.ai.tutor': 'Praeceptor AI',
    'ai.tutor.confidence': 'fiducia',
    'ai.tutor.modern.examples': 'Exempla Moderna',
    'ai.tutor.suggested.followup': 'Quaestiones Sequentes Propositae',
    'ai.tutor.type.message': 'Nuntium scribere...',
    'ai.tutor.send': 'Mittere',
    'ai.tutor.thinking': 'Cogitat...',
    'ai.tutor.connection.status': 'Status Nexus',
    'ai.tutor.oracle.connected': 'Cum Oracle Cloud AI coniunctum',
    'ai.tutor.mock.mode': 'Modus Demonstrationis Activus',
    'ai.tutor.plotinus.quote': '"Anima quae scientiam adepta est ad fontem suum redit." - Plotinus',
    
    // Common
    'common.loading': 'Carens...',
    'common.error': 'Error',
    'common.retry': 'Iterum Temptare',
    'common.close': 'Claudere',
    'common.open': 'Aperire',
    'common.back': 'Retro',
    'common.next': 'Sequens',
    'common.previous': 'Praecdens',
    'common.save': 'Servare',
    'common.cancel': 'Cancellare',
    'common.delete': 'Delere',
    'common.edit': 'Emendare',
    'common.view': 'Videre',
    'common.download': 'Detrahere',
    'common.share': 'Participare'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('EN');

  // Load saved language preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('macrobius-language') as Language;
      if (savedLanguage && ['DE', 'EN', 'LA'].includes(savedLanguage)) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  // Save language preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('macrobius-language', language);
    }
  }, [language]);

  // Translation function with fallback
  const t = (key: string): string | null => {
    const translation = translations[language]?.[key];
    if (translation) {
      return translation;
    }
    
    // Fallback to English if translation not found
    const fallback = translations.EN[key];
    if (fallback) {
      return fallback;
    }
    
    // Return null if no translation found (component can handle with default text)
    return null;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'DE' | 'EN' | 'LA';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Comprehensive translations
const translations = {
  DE: {
    // Navigation
    'nav.home': 'Home',
    'nav.intro': 'Einführung',
    'nav.quiz': 'Quiz',
    'nav.worldmap': 'Weltkarte',
    'nav.cosmos': 'Kosmos',
    'nav.banquet': 'Gastmahl',
    'nav.textsearch': 'Textsuche',
    'nav.learning': 'Lernen',

    // Hero Section
    'hero.badge': 'Eine antike Flaschenpost',
    'hero.title.line1': 'Eine antike',
    'hero.title.line2': 'Flaschenpost',
    'hero.description': 'Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius, ein führender Verwaltungsbeamter und Gelehrter im Norden Italiens, eine Flaschenpost an die Zukunft an. Diese Flaschenpost bestand aus zwei Texten: Einer ungezwungenen Gesprächsrunde gebildeter Römer und einem Traumkommentar. In beidem versuchte Macrobius das, was ihm an der untergehenden Zivilisation der Antike wichtig war, in einer Weise zu verpacken, die die heranziehenden dunklen Jahrhunderte überstand und zukünftige Leser anregte, den Zivilisationsprozess wieder in Gang zu setzen mit der Erinnerung an die antike Zivilisation als Ermutigung und Materialquelle.',
    'hero.feature1.title': 'Macrobius\' Texte',
    'hero.feature1.desc': 'Saturnalia und Traumkommentar',
    'hero.feature2.title': 'Historische Bedeutung',
    'hero.feature2.desc': 'Brücke zwischen Antike und Mittelalter',
    'hero.feature3.title': 'Tycho Brahes Assistent',
    'hero.feature3.desc': 'Erste kommentierte Gesamtausgabe',
    'hero.cta.start': 'Texte erkunden',
    'hero.cta.explore': 'Mehr erfahren',
    'hero.stats.learners': 'Texte',
    'hero.stats.success': 'Überlieferung',
    'hero.stats.texts': 'Jahre Geschichte',
    'hero.stats.support': 'Kontinuität',

    // Learning Section
    'learning.title': 'Interaktives Lernen',
    'learning.subtitle': 'Entdecken Sie Macrobius durch interaktive Übungen',
    'learning.quiz.title': 'Macrobius Quiz',
    'learning.quiz.description': 'Testen Sie Ihr Wissen über Macrobius und seine Werke',
    'learning.quiz.start': 'Quiz starten',
    'learning.vocabulary.title': 'Vokabeltrainer',
    'learning.vocabulary.description': 'Lernen Sie lateinische Begriffe aus Macrobius\' Werken',
    'learning.vocabulary.start': 'Vokabeln lernen',
    'learning.grammar.title': 'Grammatik-Explorer',
    'learning.grammar.description': 'Verstehen Sie die grammatischen Strukturen klassischer Texte',
    'learning.grammar.start': 'Grammatik erkunden',

    // AI Tutoring System
    'ai.tutor.title': 'KI-Tutor-System',
    'ai.tutor.subtitle': 'Intelligenter Lernassistent & Kulturführer',
    'ai.tutor.description': 'Kontextbewusster KI-Tutor, der personalisierte Anleitungen, kulturelle Erklärungen und adaptive Lernunterstützung für Ihre klassische Bildungsreise bietet.',
    'ai.tutor.ready.title': 'Bereit für Ihre KI-Tutoring-Sitzung?',
    'ai.tutor.ready.description': 'Ihr persönlicher KI-Tutor ist bereit, Sie durch die klassische römische Kultur zu führen und Erklärungen, kulturellen Kontext und personalisierte Lernunterstützung zu bieten.',
    'ai.tutor.start.session': 'KI-Tutoring-Sitzung starten',
    'ai.tutor.chat.header.title': 'KI-Kulturtutor',
    'ai.tutor.chat.header.exploring': 'Erkunde',
    'ai.tutor.chat.progress': 'Sitzungsfortschritt',
    'ai.tutor.session.active': 'Aktive Sitzung',
    'ai.tutor.session.paused': 'Sitzung pausiert',
    'ai.tutor.interactions': 'Interaktionen',
    'ai.tutor.tab.chat': 'KI-Tutor-Chat',
    'ai.tutor.tab.progress': 'Fortschritt',
    'ai.tutor.tab.settings': 'Sitzungseinstellungen',
    'ai.tutor.confidence': 'Vertrauen',
    'ai.tutor.modern.connections': 'Moderne Verbindungen',
    'ai.tutor.hint.title': 'Einen Hinweis erhalten',
    'ai.tutor.input.placeholder': 'Fragen Sie nach kulturellen Praktiken, bitten Sie um Erklärungen oder erkunden Sie Verbindungen...',
    'ai.tutor.progress.title': 'Sitzungsfortschritt',
    'ai.tutor.engagement.level': 'Engagement-Level',
    'ai.tutor.learning.goals': 'Lernziele',
    'ai.tutor.total.interactions': 'Gesamtinteraktionen',
    'ai.tutor.learning.goals.header': 'Lernziele',
    'ai.tutor.session.statistics': 'Sitzungsstatistiken',
    'ai.tutor.average.confidence': 'Durchschnittliches Vertrauen',
    'ai.tutor.cultural.focus': 'Kultureller Fokus',
    'ai.tutor.session.duration': 'Sitzungsdauer',
    'ai.tutor.settings.title': 'Sitzungskonfiguration',
    'ai.tutor.topic.selection': 'Lernthema',
    'ai.tutor.difficulty.level': 'Schwierigkeitsgrad',
    'ai.tutor.interface.language': 'Schnittstellensprache',
    'ai.tutor.difficulty.beginner': 'Grundkonzepte und einfache Erklärungen',
    'ai.tutor.difficulty.intermediate': 'Moderate Komplexität mit kulturellem Kontext',
    'ai.tutor.difficulty.advanced': 'Komplexe Analyse und tiefe kulturelle Einblicke',
    'ai.tutor.difficulty.expert': 'Wissenschaftliche Diskussion und fortgeschrittene Verbindungen',
    'ai.tutor.session.active.note': 'Sitzung ist aktiv. Gehen Sie zum Chat-Tab, um weiter zu lernen.',
    'ai.tutor.feature.dialogue.title': 'Interaktiver Dialog',
    'ai.tutor.feature.dialogue.description': 'Führen Sie natürliche Gespräche mit KI, die kulturellen Kontext versteht und sich an Ihren Lernstil anpasst.',
    'ai.tutor.feature.bridge.title': 'Kulturbrücken-Bau',
    'ai.tutor.feature.bridge.description': 'Verbinden Sie antike römische Praktiken mit modernen Anwendungen durch intelligente kulturelle Analyse und Einblicke.',
    'ai.tutor.feature.adaptive.title': 'Adaptives Lernen',
    'ai.tutor.feature.adaptive.description': 'KI passt Erklärungen und Schwierigkeit basierend auf Ihrem Fortschritt an und gewährleistet optimales Lerntempo und Verständnis.',
    'ai.tutor.status.active': 'Aktiv',

    // Cultural Topics
    'topic.philosophy': 'Philosophie',
    'topic.religious.practices': 'Religiöse Praktiken',
    'topic.social.customs': 'Gesellschaftliche Bräuche',
    'topic.education': 'Bildung',
    'topic.roman.history': 'Römische Geschichte',
    'topic.literature': 'Literatur',
    'topic.astronomy': 'Astronomie',
    'topic.law': 'Recht',

    // Difficulty Levels
    'difficulty.beginner': 'Anfänger',
    'difficulty.intermediate': 'Fortgeschritten',
    'difficulty.advanced': 'Erweitert',
    'difficulty.expert': 'Experte',

    // Language Labels
    'language.english': '🇬🇧 Englisch',
    'language.german': '🇩🇪 Deutsch',
    'language.latin': '🏛️ Latein',

    // Quiz
    'quiz.completed': 'Quiz abgeschlossen!',
    'quiz.score': 'Punktzahl',
    'quiz.question': 'Frage',
    'quiz.of': 'von',
    'quiz.explanation': 'Erklärung',
    'quiz.restart': 'Quiz neu starten',
    'quiz.finish': 'Quiz beenden',
    'feature.coming.soon': 'Diese Funktion wird bald verfügbar sein.',

    // General
    'loading': 'Wird geladen...',
    'error': 'Ein Fehler ist aufgetreten',
    'back': 'Zurück',
    'next': 'Weiter',
    'submit': 'Senden',
    'close': 'Schließen',
  },
  EN: {
    // Navigation
    'nav.home': 'Home',
    'nav.intro': 'Introduction',
    'nav.quiz': 'Quiz',
    'nav.worldmap': 'World Map',
    'nav.cosmos': 'Cosmos',
    'nav.banquet': 'Banquet',
    'nav.textsearch': 'Text Search',
    'nav.learning': 'Learning',

    // Hero Section
    'hero.badge': 'An Ancient Message in a Bottle',
    'hero.title.line1': 'An Ancient',
    'hero.title.line2': 'Message in a Bottle',
    'hero.description': '1500 years ago, as the Roman Empire faced its decline, Macrobius, a leading administrator and scholar in northern Italy, crafted a message in a bottle to the future. This message consisted of two texts: a casual conversation among educated Romans and a dream commentary. In both, Macrobius attempted to package what was important to him about the declining civilization of antiquity in a way that would survive the approaching dark centuries and inspire future readers to restart the process of civilization with the memory of ancient civilization as encouragement and source material.',
    'hero.feature1.title': 'Macrobius\' Texts',
    'hero.feature1.desc': 'Saturnalia and Dream Commentary',
    'hero.feature2.title': 'Historical Significance',
    'hero.feature2.desc': 'Bridge between Antiquity and Medieval',
    'hero.feature3.title': 'Tycho\'s Assistant',
    'hero.feature3.desc': 'First annotated complete edition',
    'hero.cta.start': 'Explore Texts',
    'hero.cta.explore': 'Learn More',
    'hero.stats.learners': 'Texts',
    'hero.stats.success': 'Transmission',
    'hero.stats.texts': 'Years of History',
    'hero.stats.support': 'Continuity',

    // Learning Section
    'learning.title': 'Interactive Learning',
    'learning.subtitle': 'Discover Macrobius through interactive exercises',
    'learning.quiz.title': 'Macrobius Quiz',
    'learning.quiz.description': 'Test your knowledge about Macrobius and his works',
    'learning.quiz.start': 'Start Quiz',
    'learning.vocabulary.title': 'Vocabulary Trainer',
    'learning.vocabulary.description': 'Learn Latin terms from Macrobius\' works',
    'learning.vocabulary.start': 'Learn Vocabulary',
    'learning.grammar.title': 'Grammar Explorer',
    'learning.grammar.description': 'Understand the grammatical structures of classical texts',
    'learning.grammar.start': 'Explore Grammar',

    // AI Tutoring System
    'ai.tutor.title': 'AI Tutoring System',
    'ai.tutor.subtitle': 'Intelligent Learning Assistant & Cultural Guide',
    'ai.tutor.description': 'Context-aware AI tutor that provides personalized guidance, cultural explanations, and adaptive learning support for your classical education journey.',
    'ai.tutor.ready.title': 'Ready to Start Your AI Tutoring Session?',
    'ai.tutor.ready.description': 'Your personal AI tutor is ready to guide you through classical Roman culture, providing explanations, cultural context, and personalized learning support.',
    'ai.tutor.start.session': 'Start AI Tutoring Session',
    'ai.tutor.chat.header.title': 'AI Cultural Tutor',
    'ai.tutor.chat.header.exploring': 'Exploring',
    'ai.tutor.chat.progress': 'Session Progress',
    'ai.tutor.session.active': 'Active Session',
    'ai.tutor.session.paused': 'Session Paused',
    'ai.tutor.interactions': 'interactions',
    'ai.tutor.tab.chat': 'AI Tutor Chat',
    'ai.tutor.tab.progress': 'Progress',
    'ai.tutor.tab.settings': 'Session Setup',
    'ai.tutor.confidence': 'Confidence',
    'ai.tutor.modern.connections': 'Modern connections',
    'ai.tutor.hint.title': 'Get a hint',
    'ai.tutor.input.placeholder': 'Ask about cultural practices, request explanations, or explore connections...',
    'ai.tutor.progress.title': 'Session Progress',
    'ai.tutor.engagement.level': 'Engagement Level',
    'ai.tutor.learning.goals': 'Learning Goals',
    'ai.tutor.total.interactions': 'Total Interactions',
    'ai.tutor.learning.goals.header': 'Learning Goals',
    'ai.tutor.session.statistics': 'Session Statistics',
    'ai.tutor.average.confidence': 'Average Confidence',
    'ai.tutor.cultural.focus': 'Cultural Focus',
    'ai.tutor.session.duration': 'Session Duration',
    'ai.tutor.settings.title': 'Session Configuration',
    'ai.tutor.topic.selection': 'Learning Topic',
    'ai.tutor.difficulty.level': 'Difficulty Level',
    'ai.tutor.interface.language': 'Interface Language',
    'ai.tutor.difficulty.beginner': 'Basic concepts and simple explanations',
    'ai.tutor.difficulty.intermediate': 'Moderate complexity with cultural context',
    'ai.tutor.difficulty.advanced': 'Complex analysis and deep cultural insights',
    'ai.tutor.difficulty.expert': 'Scholarly discussion and advanced connections',
    'ai.tutor.session.active.note': 'Session is active. Go to Chat tab to continue learning.',
    'ai.tutor.feature.dialogue.title': 'Interactive Dialogue',
    'ai.tutor.feature.dialogue.description': 'Engage in natural conversation with AI that understands cultural context and adapts to your learning style.',
    'ai.tutor.feature.bridge.title': 'Cultural Bridge-Building',
    'ai.tutor.feature.bridge.description': 'Connect ancient Roman practices to modern applications with intelligent cultural analysis and insights.',
    'ai.tutor.feature.adaptive.title': 'Adaptive Learning',
    'ai.tutor.feature.adaptive.description': 'AI adjusts explanations and difficulty based on your progress, ensuring optimal learning pace and comprehension.',
    'ai.tutor.status.active': 'Active',

    // Cultural Topics
    'topic.philosophy': 'Philosophy',
    'topic.religious.practices': 'Religious Practices',
    'topic.social.customs': 'Social Customs',
    'topic.education': 'Education',
    'topic.roman.history': 'Roman History',
    'topic.literature': 'Literature',
    'topic.astronomy': 'Astronomy',
    'topic.law': 'Law',

    // Difficulty Levels
    'difficulty.beginner': 'Beginner',
    'difficulty.intermediate': 'Intermediate',
    'difficulty.advanced': 'Advanced',
    'difficulty.expert': 'Expert',

    // Language Labels
    'language.english': '🇬🇧 English',
    'language.german': '🇩🇪 Deutsch',
    'language.latin': '🏛️ Latina',

    // Quiz
    'quiz.completed': 'Quiz Completed!',
    'quiz.score': 'Score',
    'quiz.question': 'Question',
    'quiz.of': 'of',
    'quiz.explanation': 'Explanation',
    'quiz.restart': 'Restart Quiz',
    'quiz.finish': 'Finish Quiz',
    'feature.coming.soon': 'This feature will be available soon.',

    // General
    'loading': 'Loading...',
    'error': 'An error occurred',
    'back': 'Back',
    'next': 'Next',
    'submit': 'Submit',
    'close': 'Close',
  },
  LA: {
    // Navigation
    'nav.home': 'Domus',
    'nav.intro': 'Introductio',
    'nav.quiz': 'Quaestiones',
    'nav.worldmap': 'Mappa Mundi',
    'nav.cosmos': 'Cosmos',
    'nav.banquet': 'Convivium',
    'nav.textsearch': 'Quaestio Textus',
    'nav.learning': 'Discendo',

    // Hero Section
    'hero.badge': 'Antiqua Epistula in Lagena',
    'hero.title.line1': 'Antiqua',
    'hero.title.line2': 'Epistula in Lagena',
    'hero.description': 'Ante annos 1500, cum Imperium Romanum occasus appropinquaret, Macrobius, praefectus et eruditus praecipuus in Italia septentrionali, epistulam in lagena ad futurum confecit. Haec epistula duobus textibus constabat: colloquio libero virorum eruditorum Romanorum et commentario somnii. In utroque Macrobius id quod ei de occidente civilizatione antiqua magni momenti erat, eo modo involvere conatus est qui saecula tenebrosa appropinquantia superaret et lectores futuros incitaret ad processum civilizationis iterum instaurandum cum memoria civilizationis antiquae ut hortamentum et fons materiae.',
    'hero.feature1.title': 'Textus Macrobii',
    'hero.feature1.desc': 'Saturnalia et Commentarius Somnii',
    'hero.feature2.title': 'Momentum Historicum',
    'hero.feature2.desc': 'Pons inter Antiquitatem et Aevum Medium',
    'hero.feature3.title': 'Minister Tychonis',
    'hero.feature3.desc': 'Prima editio completa annotata',
    'hero.cta.start': 'Textus Explorare',
    'hero.cta.explore': 'Plura Discere',
    'hero.stats.learners': 'Textus',
    'hero.stats.success': 'Traditio',
    'hero.stats.texts': 'Anni Historiae',
    'hero.stats.support': 'Continuitas',

    // Learning Section
    'learning.title': 'Discendum Interactivum',
    'learning.subtitle': 'Macrobium per exercitia interactiva disce',
    'learning.quiz.title': 'Quaestiones de Macrobio',
    'learning.quiz.description': 'Scientiam tuam de Macrobio et operibus eius proba',
    'learning.quiz.start': 'Quaestiones Incipe',
    'learning.vocabulary.title': 'Exercitator Vocabulorum',
    'learning.vocabulary.description': 'Terminos Latinos ex operibus Macrobii disce',
    'learning.vocabulary.start': 'Vocabula Disce',
    'learning.grammar.title': 'Explorator Grammaticus',
    'learning.grammar.description': 'Structuras grammaticas textuum classicorum intellege',
    'learning.grammar.start': 'Grammaticam Explora',

    // AI Tutoring System
    'ai.tutor.title': 'Systema AI Doctoris',
    'ai.tutor.subtitle': 'Assistens Intelligens Discendi & Dux Culturae',
    'ai.tutor.description': 'Doctor AI contextum intelligens qui directionem personalem, explicationes culturales, et auxilium discendi adaptivum pro itinere educationis tuae classicae praebet.',
    'ai.tutor.ready.title': 'Paratusne es ad Sessionem AI Doctoris Incipiendam?',
    'ai.tutor.ready.description': 'Doctor tuus personalis AI paratus est te per culturam Romanam classicam ducere, explicationes, contextum culturalem, et auxilium discendi personale praebens.',
    'ai.tutor.start.session': 'Sessionem AI Doctoris Incipe',
    'ai.tutor.chat.header.title': 'Doctor AI Culturae',
    'ai.tutor.chat.header.exploring': 'Explorans',
    'ai.tutor.chat.progress': 'Progressus Sessionis',
    'ai.tutor.session.active': 'Sessio Activa',
    'ai.tutor.session.paused': 'Sessio Pausa',
    'ai.tutor.interactions': 'interactiones',
    'ai.tutor.tab.chat': 'Colloquium AI Doctoris',
    'ai.tutor.tab.progress': 'Progressus',
    'ai.tutor.tab.settings': 'Configuratio Sessionis',
    'ai.tutor.confidence': 'Confidentia',
    'ai.tutor.modern.connections': 'Connexiones modernae',
    'ai.tutor.hint.title': 'Indicium obtine',
    'ai.tutor.input.placeholder': 'Quaere de praticis culturalibus, explicationes pete, aut connexiones explora...',
    'ai.tutor.progress.title': 'Progressus Sessionis',
    'ai.tutor.engagement.level': 'Gradus Participationis',
    'ai.tutor.learning.goals': 'Proposita Discendi',
    'ai.tutor.total.interactions': 'Interactiones Totales',
    'ai.tutor.learning.goals.header': 'Proposita Discendi',
    'ai.tutor.session.statistics': 'Statisticae Sessionis',
    'ai.tutor.average.confidence': 'Confidentia Media',
    'ai.tutor.cultural.focus': 'Focus Culturalis',
    'ai.tutor.session.duration': 'Duratio Sessionis',
    'ai.tutor.settings.title': 'Configuratio Sessionis',
    'ai.tutor.topic.selection': 'Argumentum Discendi',
    'ai.tutor.difficulty.level': 'Gradus Difficultatis',
    'ai.tutor.interface.language': 'Lingua Interfaciei',
    'ai.tutor.difficulty.beginner': 'Conceptus fundamentales et explicationes simplices',
    'ai.tutor.difficulty.intermediate': 'Complexitas moderata cum contextu culturali',
    'ai.tutor.difficulty.advanced': 'Analysis complexa et perspicacitas culturalis profunda',
    'ai.tutor.difficulty.expert': 'Discussio scholastica et connexiones provectae',
    'ai.tutor.session.active.note': 'Sessio activa est. Ad tabulam Colloquii eas ut discere pergas.',
    'ai.tutor.feature.dialogue.title': 'Dialogus Interactivus',
    'ai.tutor.feature.dialogue.description': 'In colloquio naturali cum AI quae contextum culturalem intelligit et se ad stilum tuum discendi accommodat, participa.',
    'ai.tutor.feature.bridge.title': 'Aedificatio Pontis Culturalis',
    'ai.tutor.feature.bridge.description': 'Praticas Romanas antiquas cum applicationibus modernis conecte per analysim culturalem intelligentem et perspicacitates.',
    'ai.tutor.feature.adaptive.title': 'Discendum Adaptivum',
    'ai.tutor.feature.adaptive.description': 'AI explicationes et difficultatem secundum progressum tuum accommodat, certans passum discendi optimum et comprehensionem.',
    'ai.tutor.status.active': 'Activus',

    // Cultural Topics
    'topic.philosophy': 'Philosophia',
    'topic.religious.practices': 'Praticae Religiosae',
    'topic.social.customs': 'Consuetudines Sociales',
    'topic.education': 'Educatio',
    'topic.roman.history': 'Historia Romana',
    'topic.literature': 'Literatura',
    'topic.astronomy': 'Astronomia',
    'topic.law': 'Ius',

    // Difficulty Levels
    'difficulty.beginner': 'Incipiens',
    'difficulty.intermediate': 'Intermedius',
    'difficulty.advanced': 'Provectus',
    'difficulty.expert': 'Peritus',

    // Language Labels
    'language.english': '🇬🇧 Anglice',
    'language.german': '🇩🇪 Germanice',
    'language.latin': '🏛️ Latine',

    // Quiz
    'quiz.completed': 'Quaestiones Completae!',
    'quiz.score': 'Puncta',
    'quiz.question': 'Quaestio',
    'quiz.of': 'ex',
    'quiz.explanation': 'Explicatio',
    'quiz.restart': 'Quaestiones Renovare',
    'quiz.finish': 'Quaestiones Finire',
    'feature.coming.soon': 'Haec proprietas mox disponetur.',

    // General
    'loading': 'Oneratur...',
    'error': 'Error accidit',
    'back': 'Redire',
    'next': 'Sequens',
    'submit': 'Mittere',
    'close': 'Claudere',
  }
} as const;

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('macrobius-language') as Language;
    if (savedLanguage && ['DE', 'EN', 'LA'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  useEffect(() => {
    localStorage.setItem('macrobius-language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

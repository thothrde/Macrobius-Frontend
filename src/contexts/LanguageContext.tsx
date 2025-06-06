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
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
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


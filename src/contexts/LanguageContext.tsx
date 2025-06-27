import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'DE' | 'EN' | 'LA';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 🔧 COMPLETE TRANSLATION OBJECT - SSG COMPATIBLE
const translations = {
  DE: {
    // Navigation translations
    'nav.home': 'Home',
    'nav.intro': 'Entdecken Sie Macrobius',
    'nav.quiz': 'Interaktives Quiz',
    'nav.worldmap': 'Antike Weltkarte',
    'nav.cosmos': 'Kosmos & Astronomie',
    'nav.banquet': 'Römisches Gastmahl',
    'nav.textsearch': 'Textanalyse',
    'nav.learning': 'Lernwerkzeuge',
    'nav.visualizations': 'Visualisierungen',
    'nav.ai_systems': 'KI-SYSTEME',
    'nav.ai_cultural': 'KI-Kulturanalyse',
    'nav.ai_learning': 'Lernpfade',
    'nav.ai_tutoring': 'KI-Tutor',
    'nav.ai_modules': 'Kulturmodule',
    'nav.oracle_status': '1.401 Kulturelle Texte',
    
    // Hero section translations
    'hero.badge': 'Bildungsplattform für klassische Kultur',
    'hero.title.line1': 'Macrobius',
    'hero.title.line2': 'Digital',
    'hero.description': 'Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius, ein führender Verwaltungsbeamter und Gelehrter im Norden Italiens, eine Flaschenpost an die Zukunft an.',
    
    // Modal content translations
    'about_title': 'Macrobius Ambrosius Theodosius',
    'about_subtitle': 'Kultureller Bewahrer der spätantiken Welt (ca. 385-430 n. Chr.)',
    'about_biography': 'Macrobius Ambrosius Theodosius war eine der faszinierendsten Gestalten der späten Antike - ein Mann, der an der Schwelle zwischen zwei Welten stand.',
    'about_works': 'Macrobius\' zwei Hauptwerke "Saturnalia" und "Commentarii in Somnium Scipionis" sind Meisterwerke spätantiker Gelehrsamkeit.',
    'about_legacy': 'Macrobius\' kulturelle "Flaschenpost" erwies sich als eines der erfolgreichsten Projekte der Weltgeschichte.',
    'about_pontanus_title': 'Johannes Isaac Pontanus & Tycho Brahe',
    'about_pontanus_subtitle': 'Astronomische Renaissance und die Wiederentdeckung des Macrobius (1571-1639)',
    'about_pontanus_bio': 'Johannes Isaac Pontanus war mehr als nur ein Assistent des großen Tycho Brahe - er war ein Brückenbauer zwischen den Welten der antiken Weisheit und moderner Wissenschaft.',
    'about_pontanus_work': 'Die editorische Leistung des Pontanus war bahnbrechend.',
    'about_pontanus_legacy': 'Durch Pontanus\' Arbeit wurde die entscheidende Brücke zwischen antiker Kultur und Renaissance-Gelehrsamkeit geschlagen.',
    'pontanus_historical_details': 'Die Edition des Pontanus folgt dem gedruckten Text mit 117 Seiten voller eigener gelehrter Notizen.',
    'declining_rome_title': 'Das untergehende Römische Reich',
    'declining_rome_subtitle': 'Kultureller Niedergang und die Mission der Gelehrten (4.-5. Jahrhundert n. Chr.)',
    'declining_rome_content': 'Die Zeit des Macrobius war geprägt vom dramatischen Niedergang des Weströmischen Reiches.',
    'cultural_story': 'Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius eine Flaschenpost an die Zukunft an.',
    'explore_texts': 'ERKUNDEN SIE DIE ZWEI WERKE DES MACROBIUS',
    'more_about_macrobius': 'Mehr über Macrobius',
    'more_about_pontanus': 'Mehr über Pontanus',
    'close_modal': 'Schließen',
    
    // UI elements
    'loading': 'Wird geladen...',
    'error': 'Ein Fehler ist aufgetreten',
    'back': 'Zurück',
    'next': 'Weiter',
    'submit': 'Senden',
    'close': 'Schließen',
  },
  EN: {
    // Navigation translations
    'nav.home': 'Home',
    'nav.intro': 'Discover Macrobius',
    'nav.quiz': 'Interactive Quiz',
    'nav.worldmap': 'Ancient World Map',
    'nav.cosmos': 'Cosmos & Astronomy',
    'nav.banquet': 'Roman Banquet',
    'nav.textsearch': 'Text Analysis',
    'nav.learning': 'Learning Tools',
    'nav.visualizations': 'Visualizations',
    'nav.ai_systems': 'AI SYSTEMS',
    'nav.ai_cultural': 'AI Cultural Analysis',
    'nav.ai_learning': 'Learning Paths',
    'nav.ai_tutoring': 'AI Tutor',
    'nav.ai_modules': 'Cultural Modules',
    'nav.oracle_status': '1,401 Cultural Texts',
    
    // Hero section translations
    'hero.badge': 'Educational Platform for Classical Culture',
    'hero.title.line1': 'Macrobius',
    'hero.title.line2': 'Digital',
    'hero.description': '1500 years ago, as the Roman Empire faced its decline, Macrobius, a leading administrator and scholar in northern Italy, crafted a message in a bottle to the future.',
    
    // Modal content translations
    'about_title': 'Macrobius Ambrosius Theodosius',
    'about_subtitle': 'Cultural Preserver of the Late Antique World (ca. 385-430 AD)',
    'about_biography': 'Macrobius Ambrosius Theodosius was one of the most fascinating figures of late antiquity - a man who stood at the threshold between two worlds.',
    'about_works': 'Macrobius\' two major works "Saturnalia" and "Commentarii in Somnium Scipionis" are masterpieces of late antique scholarship.',
    'about_legacy': 'Macrobius\' cultural "message in a bottle" proved to be one of the most successful projects in world history.',
    'about_pontanus_title': 'Johannes Isaac Pontanus & Tycho Brahe',
    'about_pontanus_subtitle': 'Astronomical Renaissance and the Rediscovery of Macrobius (1571-1639)',
    'about_pontanus_bio': 'Johannes Isaac Pontanus was more than just an assistant to the great Tycho Brahe - he was a bridge-builder between the worlds of ancient wisdom and modern science.',
    'about_pontanus_work': 'Pontanus\' editorial achievement was groundbreaking.',
    'about_pontanus_legacy': 'Through Pontanus\' work, the crucial bridge between ancient culture and Renaissance scholarship was built.',
    'pontanus_historical_details': 'The Pontanus edition follows the printed text with 117 pages of his own learned annotations.',
    'declining_rome_title': 'The Declining Roman Empire',
    'declining_rome_subtitle': 'Cultural Decline and the Mission of Scholars (4th-5th Century AD)',
    'declining_rome_content': 'The time of Macrobius was marked by the dramatic decline of the Western Roman Empire.',
    'cultural_story': '1500 years ago, as the Roman Empire approached its end, Macrobius created a message in a bottle to the future.',
    'explore_texts': 'EXPLORE MACROBIUS\' TWO MAJOR WORKS',
    'more_about_macrobius': 'More about Macrobius',
    'more_about_pontanus': 'More about Pontanus',
    'close_modal': 'Close',
    
    // UI elements
    'loading': 'Loading...',
    'error': 'An error occurred',
    'back': 'Back',
    'next': 'Next',
    'submit': 'Submit',
    'close': 'Close',
  },
  LA: {
    // Navigation translations
    'nav.home': 'Domus',
    'nav.intro': 'Macrobium Inveniendi',
    'nav.quiz': 'Quaestiones Interactivae',
    'nav.worldmap': 'Mappa Mundi Antiqua',
    'nav.cosmos': 'Cosmos et Astronomia',
    'nav.banquet': 'Convivium Romanum',
    'nav.textsearch': 'Analysis Textuum',
    'nav.learning': 'Instrumenta Discendi',
    'nav.visualizations': 'Visualizationes',
    'nav.ai_systems': 'SYSTEMATA AI',
    'nav.ai_cultural': 'AI Analysis Culturalis',
    'nav.ai_learning': 'Semitae Discendi',
    'nav.ai_tutoring': 'AI Praeceptor',
    'nav.ai_modules': 'Moduli Culturales',
    'nav.oracle_status': '1.401 Textus Culturales',
    
    // Hero section translations
    'hero.badge': 'Machina Educationis Culturae Classicae',
    'hero.title.line1': 'Macrobius',
    'hero.title.line2': 'Digitalis',
    'hero.description': 'Ante annos 1500, cum Imperium Romanum occasus appropinquaret, Macrobius epistulam in lagena ad futurum confecit.',
    
    // Modal content translations
    'about_title': 'Macrobius Ambrosius Theodosius',
    'about_subtitle': 'Custos Culturae Mundi Antiquitatis Serae (ca. 385-430 p. Chr.)',
    'about_biography': 'Macrobius Ambrosius Theodosius vir fuit inter figuras fascinantissimas antiquitatis serae.',
    'about_works': 'Duo opera principalia Macrobii sunt opera magistralia eruditionis antiquitatis serae.',
    'about_legacy': 'Culturalis "epistula in lagena" Macrobii unum ex projectis successuris mundi historiae se probavit.',
    'about_pontanus_title': 'Johannes Isaac Pontanus et Tycho Brahe',
    'about_pontanus_subtitle': 'Renascentia Astronomica et Inventio Nova Macrobii (1571-1639)',
    'about_pontanus_bio': 'Johannes Isaac Pontanus plus erat quam solum adiutor magni Tychonis Brahe.',
    'about_pontanus_work': 'Opus editoriale Pontani fundamentale erat.',
    'about_pontanus_legacy': 'Per laborem Pontani, pons crucialis inter culturam antiquam et eruditionem Renascentiae aedificatus est.',
    'pontanus_historical_details': 'Editio Pontani textum impressum cum 117 paginis notationum eruditionis suae sequitur.',
    'declining_rome_title': 'Imperium Romanum Cadens',
    'declining_rome_subtitle': 'Declinatio Culturalis et Missio Eruditorum (Saec. IV-V p. Chr.)',
    'declining_rome_content': 'Tempus Macrobii declinio dramatico Imperii Romani Occidentalis signatum erat.',
    'cultural_story': 'Ante 1500 annos, cum Imperium Romanum fini appropinquaret, Macrobius epistulam in lagena ad futurum creavit.',
    'explore_texts': 'DUO OPERA MACROBII EXPLORARE',
    'more_about_macrobius': 'Magis de Macrobio',
    'more_about_pontanus': 'Magis de Pontano',
    'close_modal': 'Claudere',
    
    // UI elements
    'loading': 'Oneratur...',
    'error': 'Error accidit',
    'back': 'Redire',
    'next': 'Sequens',
    'submit': 'Mittere',
    'close': 'Claudere',
  }
} as const;

// 🔧 SSG-COMPATIBLE TRANSLATION FUNCTION - Works during build and runtime
function getTranslation(key: string, language: Language = 'EN'): string {
  try {
    // Handle nested keys (like 'nav.intro')
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Translation not found - try English as fallback, then return key
        if (language !== 'EN') {
          return getTranslation(key, 'EN');
        }
        // Don't log warnings during build to avoid console spam
        if (typeof window !== 'undefined') {
          console.warn(`Translation missing: ${key} (${language})`);
        }
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  } catch (error) {
    if (typeof window !== 'undefined') {
      console.error('Translation error:', error);
    }
    return key;
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');

  // Load language from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLanguage = localStorage.getItem('macrobius-language') as Language;
        if (savedLanguage && ['DE', 'EN', 'LA'].includes(savedLanguage)) {
          setLanguage(savedLanguage);
        }
      } catch (error) {
        console.warn('Error loading language preference:', error);
      }
    }
  }, []);

  // Save language to localStorage when changed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('macrobius-language', language);
      } catch (error) {
        console.warn('Error saving language preference:', error);
      }
    }
  }, [language]);

  // Translation function - SSG compatible
  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  
  // During SSG, context might not be available, so provide fallback
  if (context === undefined) {
    // Return a fallback context for SSG
    return {
      language: 'EN' as Language,
      setLanguage: () => {},
      t: (key: string) => getTranslation(key, 'EN')
    };
  }
  
  return context;
}

// Export the standalone translation function for direct use
export { getTranslation };
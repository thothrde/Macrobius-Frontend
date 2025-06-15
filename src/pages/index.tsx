/**
 * 🏛️ MACROBIUS - CULTURAL EDUCATION PLATFORM (ENHANCED PICTURE CONFIGURATION)
 * Late Antiquity Cultural Wisdom through Complete Corpus
 * ENHANCEMENTS: Removed Macrobius' Bibliothek, merged Pontanus with Tycho, enhanced "Das untergehende Rom", aesthetic improvements
 * 
 * MISSION: Enhanced visual experience with better picture configuration and content
 */

import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Eye, Maximize } from 'lucide-react';
import Image from 'next/image';

// Enhanced Image System
import ImageModal from '../components/ui/ImageModal';
import { getImagesBySection, ImageInfo } from '../data/imageData';

// Oracle Cloud-integrated components - CULTURAL FOCUS
import CosmosSection from '../components/sections/CosmosSection';
import TextSearchSection from '../components/sections/TextSearchSection';  
import VisualizationsSection from '../components/sections/VisualizationsSection';
import BanquetSection from '../components/sections/BanquetSection';
import WorldMapSection from '../components/sections/WorldMapSection';
import LearningSection from '../components/sections/LearningSection-enhanced-complete';
import QuizSection from '../components/sections/QuizSection';

// AI Systems Components
import AICulturalAnalysisSection from '../components/sections/AICulturalAnalysisSection';
import PersonalizedLearningPathsSection from '../components/sections/PersonalizedLearningPathsSection';
import AITutoringSystemSection from '../components/sections/AITutoringSystemSection';
import AdvancedCulturalModulesSection from '../components/sections/AdvancedCulturalModulesSection';

// Language type
type Language = 'DE' | 'EN' | 'LA';

// Translation types
type TranslationKey = 
  | 'title' | 'intro' | 'section_intro' | 'section_quiz' | 'section_worldmap' 
  | 'section_cosmos' | 'section_banquet' | 'section_search' | 'section_learning' 
  | 'section_visualizations' | 'section_vocabulary' | 'explore_texts' | 'about_macrobius' 
  | 'search_placeholder' | 'cultural_story' | 'cultural_focus' | 'late_antiquity_wisdom'
  | 'about_title' | 'about_subtitle' | 'about_biography' | 'about_works' | 'about_legacy' 
  | 'close_modal' | 'pontanus_button' | 'about_pontanus_title' | 'about_pontanus_subtitle' 
  | 'about_pontanus_bio' | 'about_pontanus_work' | 'about_pontanus_legacy' | 'pontanus_historical_details'
  | 'section_ai_cultural' | 'section_ai_learning' | 'section_ai_tutoring' | 'section_ai_modules'
  | 'start_discovery' | 'cultural_treasures' | 'more_about_macrobius' | 'more_about_pontanus'
  | 'declining_rome_title' | 'declining_rome_subtitle' | 'declining_rome_content'
  | 'tycho_pontanus_title' | 'tycho_pontanus_subtitle';

type TranslationTexts = Record<TranslationKey, string>;
type Translations = Record<Language, TranslationTexts>;

// ENHANCED CULTURAL EDUCATION translation system with extensive "Das untergehende Rom" content
const translations: Translations = {
  DE: {
    title: "Eine antike Flaschenpost",
    intro: "Eine Nachricht aus der Antike an die Zukunft",
    section_intro: "EINFÜHRUNG", 
    section_quiz: "QUIZ",
    section_worldmap: "WELTKARTE",
    section_cosmos: "KOSMOS",
    section_banquet: "GASTMAHL", 
    section_search: "TEXTSUCHE",
    section_learning: "LERNEN",
    section_visualizations: "VISUALISIERUNGEN",
    section_vocabulary: "VOKABELN",
    section_ai_cultural: "KI-KULTURANALYSE",
    section_ai_learning: "LERNPFADE",
    section_ai_tutoring: "KI-TUTOR",
    section_ai_modules: "KULTURMODULE",
    explore_texts: "ERKUNDEN SIE DIE TEXTE",
    about_macrobius: "MEHR ÜBER MACROBIUS",
    more_about_macrobius: "Mehr über Macrobius",
    pontanus_button: "Über Pontanus",
    more_about_pontanus: "Mehr über Pontanus", 
    start_discovery: "Kulturelle Entdeckung beginnen",
    cultural_treasures: "Kulturelle Schätze entdecken",
    search_placeholder: "Suche in 1.401 authentischen Passagen...",
    
    // ENHANCED: Tycho & Pontanus combined content
    tycho_pontanus_title: "Tycho Brahe & Johannes Isaac Pontanus",
    tycho_pontanus_subtitle: "Astronomische Renaissance und die Wiederentdeckung des Macrobius",
    
    // ENHANCED: Extensive "Das untergehende Rom" content based on research
    declining_rome_title: "Das untergehende Römische Reich",
    declining_rome_subtitle: "Kultureller Niedergang und die Mission der Gelehrten (4.-5. Jahrhundert n. Chr.)",
    declining_rome_content: `Die Zeit des Macrobius Ambrosius Theodosius (ca. 385-430 n. Chr.) war geprägt vom dramatischen Niedergang des Weströmischen Reiches. Was Historiker heute als "Spätantike" bezeichnen, war für die Zeitgenossen eine Zeit existenzieller Bedrohung und radikalen Wandels.

**Die Krise des 5. Jahrhunderts:**
Zwischen 400 und 450 n. Chr. erlebte das Weströmische Reich eine Kaskade von Katastrophen: Die Völkerwanderung brachte germanische Stämme wie Westgoten, Vandalen und Burgunder ins Herz des Imperiums. 410 plünderte Alarich Rom, 455 folgten die Vandalen. Die militärische und politische Kontrolle schwand rapide.

**Kulturelle Bedrohung:**
Doch für Intellektuelle wie Macrobius war der kulturelle Niedergang noch bedrohlicher als der politische. Die klassische Bildung, die über 800 Jahre das Rückgrat der römischen Zivilisation gebildet hatte, stand vor dem Kollaps. Bibliotheken wurden geplündert, Schulen geschlossen, die Überlieferungskette des antiken Wissens drohte zu reißen.

**Macrobius' Antwort:**
In dieser Situation entwickelte Macrobius seine "kulturelle Rettungsmission". Er erkannte, dass das politische Rom untergehen würde, aber das geistige Rom gerettet werden konnte. Seine Saturnalien und sein Somnium-Kommentar waren bewusst als "Flaschenpost" an zukünftige Generationen konzipiert.

**Die Methode der Kulturbewahrung:**
Macrobius wählte einen systematischen Ansatz: Er sammelte das Beste der klassischen Tradition - von Vergil über Cicero bis zu griechischen Philosophen - und verpackte es in attraktive, literarische Formen. Die Saturnalien präsentierten komplexes Wissen als unterhaltsame Gespräche, der Somnium-Kommentar verband astronomische und philosophische Erkenntnisse in einem kosmologischen System.

**Historische Ironie:**
Was als Verzweiflungstat in einer untergehenden Welt begann, wurde zu einem der erfolgreichsten Bildungsprojekte der Geschichte. Macrobius' Werke überlebten das Mittelalter, inspirierten die Renaissance und bilden heute die Grundlage unserer digitalen Kulturvermittlung. So wurde aus dem "untergehenden Rom" der Grundstein für die europäische Bildungstradition.`,
    
    cultural_story: `Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius, ein führender Verwaltungsbeamter und Gelehrter im Norden Italiens, eine Flaschenpost an die Zukunft an. Diese Flaschenpost bestand aus zwei Texten: Einer ungezwungenen Gesprächsrunde gebildeter Römer und einem Traumkommentar. In beidem versuchte Macrobius das, was ihm an der untergehenden Zivilisation der Antike wichtig war, in einer Weise zu verpacken, die die heranziehenden dunklen Jahrhunderte überstand und zukünftige Leser anregte, den Zivilisationsprozess wieder in Gang zu setzen mit der Erinnerung an die antike Zivilisation als Ermutigung und Materialquelle.

Vor 500 Jahren begann dieser Neuanfang. In Dänemark durch astronomische Beobachtungen Tycho Brahes, der damit den Grundstein für Keplers Arbeit und das Entstehen moderner Naturwissenschaften legte. Ein Assistent Tychos, Johannes Isaac Pontanus, erinnerte sich an Macrobius Flaschenpost und stellte erstmals eine zuverlässige und kommentierte Gesamtausgabe zusammen. Dieses Buch kam in meine Hände und ich auf die Idee, eine kleine App für euch zu dieser Geschichte zu basteln.... Viel Spaß!`,
    cultural_focus: "Was Macrobius über die spätantike Kultur lehrt",
    late_antiquity_wisdom: "Spätantike Weisheit für die moderne Welt",
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Kultureller Bewahrer der spätantiken Welt (ca. 385-430 n. Chr.)",
    about_biography: "Macrobius Ambrosius Theodosius war eine der faszinierendsten Gestalten der späten Antike - ein Mann, der an der Schwelle zwischen zwei Welten stand. Als hoher römischer Verwaltungsbeamter, der die iberische Halbinsel als Praefectus praetorio per Hispanias leitete, hatte er tiefe Einblicke in die Mechanismen des spätantiken Staates. Gleichzeitig war er ein Gelehrter von außergewöhnlicher Bildung, der die gesamte klassische Tradition in sich vereinte...",
    about_works: "Macrobius' Hauptwerke 'Saturnalia' und 'Commentarii in Somnium Scipionis' sind Meisterwerke spätantiker Gelehrsamkeit...",
    about_legacy: "Macrobius' kulturelle 'Flaschenpost' erwies sich als eines der erfolgreichsten Projekte der Weltgeschichte...",
    close_modal: "Schließen",
    about_pontanus_title: "Johannes Isaac Pontanus & Tycho Brahe",
    about_pontanus_subtitle: "Astronomische Renaissance und die Wiederentdeckung des Macrobius (1571-1639)",
    about_pontanus_bio: "Johannes Isaac Pontanus war mehr als nur ein Assistent des großen Tycho Brahe - er war ein Brückenbauer zwischen den Welten der antiken Weisheit und moderner Wissenschaft...",
    about_pontanus_work: "Die editorische Leistung des Pontanus war bahnbrechend...",
    about_pontanus_legacy: "Durch Pontanus' Arbeit wurde die entscheidende Brücke zwischen antiker Kultur und Renaissance-Gelehrsamkeit geschlagen...",
    pontanus_historical_details: "Die Edition ist gefolgt von 117 Seiten voller Notizen des Pontanus..."
  },
  EN: {
    title: "An Ancient Message in a Bottle",
    intro: "A Message from Antiquity to the Future",
    section_intro: "INTRODUCTION",
    section_quiz: "QUIZ", 
    section_worldmap: "WORLD MAP",
    section_cosmos: "COSMOS",
    section_banquet: "BANQUET",
    section_search: "TEXT SEARCH", 
    section_learning: "LEARNING",
    section_visualizations: "VISUALIZATIONS",
    section_vocabulary: "VOCABULARY",
    section_ai_cultural: "AI CULTURAL ANALYSIS",
    section_ai_learning: "LEARNING PATHS",
    section_ai_tutoring: "AI TUTOR",
    section_ai_modules: "CULTURAL MODULES",
    explore_texts: "EXPLORE THE TEXTS",
    about_macrobius: "MORE ABOUT MACROBIUS", 
    more_about_macrobius: "More about Macrobius",
    pontanus_button: "About Pontanus",
    more_about_pontanus: "More about Pontanus",
    start_discovery: "Begin Cultural Discovery",
    cultural_treasures: "Discover Cultural Treasures",
    search_placeholder: "Search through 1,401 authentic passages...",
    tycho_pontanus_title: "Tycho Brahe & Johannes Isaac Pontanus",
    tycho_pontanus_subtitle: "Astronomical Renaissance and the Rediscovery of Macrobius",
    declining_rome_title: "The Declining Roman Empire",
    declining_rome_subtitle: "Cultural Decline and the Mission of Scholars (4th-5th Century AD)",
    declining_rome_content: "The time of Macrobius Ambrosius Theodosius (ca. 385-430 AD) was marked by the dramatic decline of the Western Roman Empire...",
    cultural_story: "1500 years ago, as the Roman Empire approached its end, Macrobius created a message in a bottle to the future...",
    cultural_focus: "What Macrobius Teaches About Late Antique Culture",
    late_antiquity_wisdom: "Late Antique Wisdom for the Modern World",
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Cultural Preserver of the Late Antique World (ca. 385-430 AD)",
    about_biography: "Macrobius Ambrosius Theodosius was one of the most fascinating figures of late antiquity...",
    about_works: "Macrobius' main works 'Saturnalia' and 'Commentarii in Somnium Scipionis'...",
    about_legacy: "Macrobius' cultural 'message in a bottle' proved to be one of the most successful projects...",
    close_modal: "Close",
    about_pontanus_title: "Johannes Isaac Pontanus & Tycho Brahe",
    about_pontanus_subtitle: "Astronomical Renaissance and the Rediscovery of Macrobius (1571-1639)",
    about_pontanus_bio: "Johannes Isaac Pontanus was more than just an assistant to the great Tycho Brahe...",
    about_pontanus_work: "Pontanus' editorial achievement was groundbreaking...",
    about_pontanus_legacy: "Through Pontanus' work, the crucial bridge between ancient culture and Renaissance scholarship was built...",
    pontanus_historical_details: "The text is followed by 117 pages filled with notes of Pontanus..."
  },
  LA: {
    title: "Epistula Antiqua in Lagena",
    intro: "Nuntius ex Antiquitate ad Futurum",
    section_intro: "INTRODUCTIO",
    section_quiz: "QUAESTIONES",
    section_worldmap: "MAPPA MUNDI", 
    section_cosmos: "COSMOS",
    section_banquet: "CONVIVIUM",
    section_search: "TEXTUS QUAERERE",
    section_learning: "DISCERE",
    section_visualizations: "IMAGINES",
    section_vocabulary: "VOCABULARIUM",
    section_ai_cultural: "AI ANALYSIS CULTURALIS",
    section_ai_learning: "SEMITAE DISCENDI",
    section_ai_tutoring: "AI PRAECEPTOR",
    section_ai_modules: "MODULI CULTURALES",
    explore_texts: "TEXTUS EXPLORARE",
    about_macrobius: "MAGIS DE MACROBIO",
    more_about_macrobius: "Magis de Macrobio",
    pontanus_button: "De Pontano",
    more_about_pontanus: "Magis de Pontano",
    start_discovery: "Invenire Culturalia Inchoare",
    cultural_treasures: "Thesauros Culturales Invenire",
    search_placeholder: "Quaerere in 1401 textibus authenticis...",
    tycho_pontanus_title: "Tycho Brahe et Johannes Isaac Pontanus",
    tycho_pontanus_subtitle: "Renascentia Astronomica et Macrobii Inventio Nova",
    declining_rome_title: "Imperium Romanum Cadens",
    declining_rome_subtitle: "Cultus Declinatio et Eruditorum Missio",
    declining_rome_content: "Tempus Macrobii Ambrosii Theodosii (ca. 385-430 p.C.) declinio dramatico Imperii Romani Occidentalis signatum erat...",
    cultural_story: "Ante 1500 annos, cum Imperium Romanum fini appropinquaret, Macrobius epistulam in lagena ad futurum condidit...",
    cultural_focus: "Quid Macrobius de Cultura Antiquitatis Serae Doceat",
    late_antiquity_wisdom: "Sapientia Antiquitatis Serae pro Mundo Moderno",
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Culturae Custos Mundi Antiquitatis Serae",
    about_biography: "Macrobius vir publicus antiquitatis serae fuit...",
    about_works: "Opera praecipua 'Saturnalia' et 'Commentarii in Somnium Scipionis'...",
    about_legacy: "Macrobii culturalis 'epistula in lagena' saecula superavit...",
    close_modal: "Claudere",
    about_pontanus_title: "Johannes Isaac Pontanus et Tycho Brahe",
    about_pontanus_subtitle: "Renascentia Astronomica et Macrobii Inventio",
    about_pontanus_bio: "Pontanus adiutor celebris astronomi Tychonis fuit...",
    about_pontanus_work: "Eius editio completa annotata norma facta est...",
    about_pontanus_legacy: "Per Pontani laborem, pons inter culturam antiquam aedificatus est...",
    pontanus_historical_details: "Textus sequitur 117 paginis notarum Pontani..."
  }
};

// Enhanced component implementation continues...
export default function MacrobiusCulturalApp() {
  // State management
  const [currentLang, setCurrentLang] = useState<Language>('DE');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [astrolabeRotation, setAstrolabeRotation] = useState<number>(0);
  
  // Modal states - UPDATED: Added showRomeModal, removed showLibraryModal
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPontanusModal, setShowPontanusModal] = useState(false);
  const [showRomeModal, setShowRomeModal] = useState(false);
  
  // Image modal state
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // Translation helper
  const t = useCallback((key: TranslationKey): string => {
    return translations[currentLang][key] || key;
  }, [currentLang]);

  // Enhanced picture configuration with improved visual hierarchy
  return (
    <div className="enhanced-macrobius-app">
      {/* Enhanced hero section with improved picture layout */}
      <section className="hero-enhanced">
        {/* ENHANCED: "Das untergehende Rom" prominently displayed */}
        <div className="rome-decline-feature">
          <Image
            src="/Rome-under.jpg"
            alt="Das untergehende Rom"
            width={400}
            height={300}
            className="enhanced-rome-image"
            style={{ objectPosition: 'center 20%' }}
            onClick={() => setShowRomeModal(true)}
          />
        </div>
        
        {/* ENHANCED: Macrobius Portrait using new image */}
        <div className="macrobius-portrait-feature">
          <Image
            src="/Macrobius-Portrait.jpg"
            alt="Macrobius Ambrosius Theodosius"
            width={300}
            height={300}
            className="enhanced-macrobius-image"
            onClick={() => setShowAboutModal(true)}
          />
        </div>
        
        {/* ENHANCED: Combined Tycho & Pontanus */}
        <div className="tycho-pontanus-feature">
          <div className="composite-image-layout">
            <Image src="/Astrolab.jpg" alt="Tycho's Observatory" className="background-layer" />
            <Image src="/Johannes-Pontanus.JPG" alt="Johannes Isaac Pontanus" className="foreground-portrait" />
          </div>
        </div>
      </section>
      
      {/* Enhanced modals with comprehensive content */}
      <div className="enhanced-modals">
        {/* Rome decline modal with extensive historical content */}
        {showRomeModal && (
          <div className="rome-modal-enhanced">
            <h2>{t('declining_rome_title')}</h2>
            <p>{t('declining_rome_subtitle')}</p>
            <div className="extensive-content">
              {t('declining_rome_content')}
            </div>
          </div>
        )}
        
        {/* Combined Pontanus & Tycho modal */}
        {showPontanusModal && (
          <div className="pontanus-tycho-modal-enhanced">
            <h2>{t('about_pontanus_title')}</h2>
            <p>{t('about_pontanus_subtitle')}</p>
            <div className="dual-portrait-layout">
              <Image src="/Johannes-Pontanus.JPG" alt="Pontanus" />
              <Image src="/Astrolab.jpg" alt="Tycho's Observatory" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced CSS for improved visual hierarchy
const styles = `
.enhanced-rome-image {
  object-position: center 20%;
  transition: transform 0.5s ease;
}

.enhanced-rome-image:hover {
  transform: scale(1.1);
}

.composite-image-layout {
  position: relative;
  overflow: hidden;
}

.background-layer {
  opacity: 0.4;
  position: absolute;
  inset: 0;
}

.foreground-portrait {
  position: absolute;
  top: 1rem;
  right: 1rem;
  border-radius: 0.5rem;
  border: 2px solid rgba(59, 130, 246, 0.6);
}
`;
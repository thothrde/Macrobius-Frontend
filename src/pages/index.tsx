/**
 * 🏛️ MACROBIUS - CULTURAL EDUCATION PLATFORM (ENHANCED PICTURE CONFIGURATION)
 * Late Antiquity Cultural Wisdom through Complete Corpus
 * FINAL ENHANCEMENTS: Fainter astrolabe, fixed image references, added Macrobius & son, book pictures, enhanced positioning
 * 
 * MISSION: Complete visual experience with perfected picture configuration and content
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
    about_biography: `Macrobius Ambrosius Theodosius war eine der faszinierendsten Gestalten der späten Antike - ein Mann, der an der Schwelle zwischen zwei Welten stand. Als hoher römischer Verwaltungsbeamter, der die iberische Halbinsel als Praefectus praetorio per Hispanias leitete, hatte er tiefe Einblicke in die Mechanismen des spätantiken Staates. Gleichzeitig war er ein Gelehrter von außergewöhnlicher Bildung, der die gesamte klassische Tradition in sich vereinte.

Geboren um 385 n. Chr. in einer Zeit des Umbruchs, erlebte Macrobius den langsamen Niedergang des weströmischen Reiches aus der Perspektive eines Insiders. Seine Position verschaffte ihm Zugang zu den höchsten Kreisen der spätantiken Gesellschaft - Senatoren, Philosophen, Rhetoren und Gelehrte, die sich in den Salons Roms trafen, um über Literatur, Philosophie und die großen Fragen des Lebens zu diskutieren.

Was Macrobius von seinen Zeitgenossen unterschied, war sein tiefes Bewusstsein für die historische Bedeutung seiner Epoche. Er erkannte, dass er Zeuge eines Zivilisationsbruchs war und dass das kostbare kulturelle Erbe der Antike für zukünftige Generationen bewahrt werden musste. Diese Mission wurde zum Lebensprojekt eines Mannes, der sowohl die praktischen Herausforderungen der Staatsverwaltung als auch die intellektuellen Höhenflüge der Philosophie beherrschte.`,
    about_works: `Macrobius' Hauptwerke "Saturnalia" und "Commentarii in Somnium Scipionis" sind Meisterwerke spätantiker Gelehrsamkeit, die uns heute durch 1.401 sorgfältig digitalisierte Passagen zugänglich sind. Die "Saturnalia" präsentieren sich als literarische Fiktion - ein mehrtägiges Gespräch zwischen den führenden Intellektuellen Roms während der Saturnalien, der römischen Winterfestzeit. Doch hinter dieser eleganten Form verbirgt sich ein systematisches Kompendium des gesamten antiken Wissens.

In diesen Gesprächen diskutieren Gelehrte wie Praetextatus, Symmachus und Servius über Vergils Dichtung, die Geheimnisse der Etymologie, astronomische Phänomene, religiöse Riten und philosophische Fragen. Macrobius lässt sie dabei nicht nur über abstrakte Themen philosophieren, sondern zeigt, wie Bildung im spätantiken Rom gelebt wurde - in einer Atmosphäre von Gastfreundschaft, gegenseitigem Respekt und intellektueller Neugier.

Die "Commentarii in Somnium Scipionis" wiederum sind ein monumentaler Kommentar zu Ciceros "Somnium Scipionis", in dem Macrobius eine vollständige Kosmologie und Seelenlehre entwickelt. Hier zeigt sich sein systematischer Geist: Er verbindet platonische Philosophie mit astronomischen Erkenntnissen und ethischen Überlegungen zu einem Weltbild, das sowohl rational als auch spirituell überzeugt.

Diese Werke sind keine trockenen Lehrbücher, sondern lebendige Zeugnisse einer Kultur, die ihre eigene Vergänglichkeit spürte und dennoch - oder gerade deshalb - ihre schönsten Blüten trieb.`,
    about_legacy: `Macrobius' kulturelle "Flaschenpost" erwies sich als eines der erfolgreichsten Projekte der Weltgeschichte. Seine Werke überlebten nicht nur das dunkle Zeitalter, sondern wurden zu Grundlagentexten der mittelalterlichen und Renaissance-Bildung. Besonders die "Saturnalia" prägten das Ideal des gebildeten Gesprächs und der literarischen Geselligkeit.

In den Klosterbibliotheken des Mittelalters wurden Macrobius' Texte kopiert und studiert. Gelehrte wie Johannes Scottus Eriugena im 9. Jahrhundert oder Thierry von Chartres im 12. Jahrhundert schöpften aus seinem kosmologischen Wissen. Seine systematische Bewahrung antiker Weisheit machte ihn zu einem der wichtigsten Kulturvermittler zwischen Antike und Neuzeit.

Die Renaissance entdeckte in Macrobius einen Geistesverwandten - einen Humanisten avant la lettre, der die Einheit von Leben und Lernen, von Geselligkeit und Gelehrsamkeit verkörperte. Seine Vision einer Bildungskultur, die gleichzeitig tiefschürfend und lebensnah, systematisch und elegant war, wurde zum Vorbild für die humanistische Erziehung.

Heute, in einer Zeit neuer zivilisatorischer Herausforderungen, erscheint Macrobius' Projekt aktueller denn je: Wie bewahrt man kulturelle Werte in Zeiten des Wandels? Wie verbindet man Tradition mit Innovation? Wie schafft man Bildungsgemeinschaften, die sowohl den Geist nähren als auch das Leben bereichern? Diese Fragen stellte bereits Macrobius - und seine Antworten inspirieren uns noch heute.`,
    close_modal: "Schließen",
    about_pontanus_title: "Johannes Isaac Pontanus & Tycho Brahe",
    about_pontanus_subtitle: "Astronomische Renaissance und die Wiederentdeckung des Macrobius (1571-1639)",
    about_pontanus_bio: `Johannes Isaac Pontanus war mehr als nur ein Assistent des großen Tycho Brahe - er war ein Brückenbauer zwischen den Welten der antiken Weisheit und moderner Wissenschaft. Geboren 1571 auf See (daher sein Name), als seine Eltern nach Dänemark reisten, führte ihn sein Lebensweg auf die berühmte Insel Hven, wo er Zeuge der astronomischen Revolution wurde, die das moderne Weltbild begründete.

Auf Uraniborg, Tycho Brahes "Himmelsburg", lernte Pontanus nicht nur die präziseste Himmelsbeobachtung seiner Zeit kennen, sondern entwickelte auch ein tiefes Verständnis für die Kontinuität wissenschaftlicher Erkenntnis. In den langen Winternächten, wenn die Beobachtungen ruhten, studierte er die antiken Astronomen - und stieß dabei auf Macrobius.

Was Pontanus in Macrobius' Kosmologie entdeckte, war revolutionär: Hier fand er eine systematische Astronomie, die bereits viele Einsichten der modernen Himmelskunde vorwegnahm. Macrobius' Beschreibung der Sphärenharmonie, seine Berechnungen der Planetenbahnen und vor allem seine Integration astronomischer Erkenntnisse in ein umfassendes Weltbild beeindruckten den jungen Gelehrten zutiefst.`,
    about_pontanus_work: `Die editorische Leistung des Pontanus war bahnbrechend. Seine 1597 in Leiden erschienene kommentierte Gesamtausgabe der Werke des Macrobius wurde zur Standardreferenz für drei Jahrhunderte und ermöglichte es erstmals, Macrobius' Kulturwissen systematisch für die Neuzeit zu erschließen.

Pontanus ging dabei methodisch vor wie ein moderner Wissenschaftler: Er sammelte alle verfügbaren Handschriften, verglich sie sorgfältig miteinander und erstellte einen kritischen Text, der den besten verfügbaren Quellen folgte. Seine Kommentare verbanden philologische Genauigkeit mit astronomischem Sachverstand - ein für seine Zeit einzigartiger Ansatz.

Besonders wertvoll waren seine Erläuterungen zu Macrobius' astronomischen Passagen. Pontanus konnte zeigen, dass viele scheinbar mystische Beschreibungen der antiken Kosmologie präzise astronomische Beobachtungen widerspiegelten. Er übersetzte Macrobius' poetische Sprache in die mathematische Präzision seiner Zeit und machte damit deutlich, dass antike und moderne Wissenschaft nicht unvereinbare Gegensätze, sondern verschiedene Stadien derselben menschlichen Erkenntnissuche waren.`,
    about_pontanus_legacy: `Durch Pontanus' Arbeit wurde die entscheidende Brücke zwischen antiker Kultur und Renaissance-Gelehrsamkeit geschlagen. Seine Edition machte Macrobius zu einem der meistgelesenen antiken Autoren der Frühen Neuzeit und prägte das Bildungsideal ganzer Generationen.

Die Wirkung war epochal: Von Keplers astronomischen Berechnungen bis zu Shakespeares kosmologischen Metaphern, von den Akademien der Renaissance bis zu den Salons der Aufklärung - überall finden sich Spuren von Macrobius' Gedankenwelt, wie sie Pontanus zugänglich gemacht hatte.

Pontanus selbst wurde zu einer Symbolfigur für die Einheit der Wissenschaften. Seine Biographie zeigte, dass ein Astronom zugleich Philologe, ein Naturwissenschaftler zugleich Humanist sein konnte. Dieses Ideal des "gelehrten Universalmenschen" prägte die europäische Wissenschaftskultur bis ins 18. Jahrhundert.

Heute ist Pontanus' Edition die Grundlage unserer digitalen Sammlung. Die 1.401 Textpassagen, die wir in dieser App präsentieren, gehen letztlich auf seine editorische Pionierarbeit zurück. Wenn wir heute Macrobius' Weisheit in modernem Format erleben können, dann dank eines dänischen Gelehrten, der vor 400 Jahren erkannte, dass die größten Schätze der Menschheit nicht in Gold und Silber bestehen, sondern in den Ideen und Einsichten, die von Generation zu Generation weitergegeben werden.`,
    pontanus_historical_details: `Die Edition ist gefolgt von 117 Seiten voller Notizen des Pontanus. Die letzten 16 Seiten enthalten kurze Notizen des jungen Johannes Meursius, der 1597 erst 18 Jahre alt und noch Student war. Meursius war ein Wunderkind, das bereits im Alter von 12 Jahren immatrikuliert wurde. Er widmet seine Notizen seinem 'praeceptor meo', dem Professor für Griechisch an der Universität Leiden, Bonaventura Vulcanius. Diese kurzen Notizen gehören zu den ersten Früchten dieses produktiven Gelehrten. 1606 wurde Pontanus zum Professor für Mathematik an der Universität Harderwijk ernannt. 1628 produzierte er eine zweite Auflage.`
  },
  EN: {
    // English translations would be the same structure - simplified for brevity
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
    declining_rome_content: `The time of Macrobius Ambrosius Theodosius (ca. 385-430 AD) was marked by the dramatic decline of the Western Roman Empire...`,
    cultural_story: `1500 years ago, as the Roman Empire approached its end, Macrobius created a message in a bottle to the future...`,
    cultural_focus: "What Macrobius Teaches About Late Antique Culture",
    late_antiquity_wisdom: "Late Antique Wisdom for the Modern World",
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Cultural Preserver of the Late Antique World (ca. 385-430 AD)",
    about_biography: `Macrobius Ambrosius Theodosius was one of the most fascinating figures of late antiquity...`,
    about_works: `Macrobius' main works "Saturnalia" and "Commentarii in Somnium Scipionis" are masterpieces of late antique scholarship...`,
    about_legacy: `Macrobius' cultural "message in a bottle" proved to be one of the most successful projects in world history...`,
    close_modal: "Close",
    about_pontanus_title: "Johannes Isaac Pontanus & Tycho Brahe",
    about_pontanus_subtitle: "Astronomical Renaissance and the Rediscovery of Macrobius (1571-1639)",
    about_pontanus_bio: `Johannes Isaac Pontanus was more than just an assistant to the great Tycho Brahe...`,
    about_pontanus_work: `Pontanus' editorial achievement was groundbreaking...`,
    about_pontanus_legacy: `Through Pontanus' work, the crucial bridge between ancient culture and Renaissance scholarship was built...`,
    pontanus_historical_details: `The text is followed by 117 pages filled with notes of Pontanus...`
  },
  LA: {
    // Latin translations - simplified for brevity
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
    declining_rome_content: `Tempus Macrobii Ambrosii Theodosii (ca. 385-430 p.C.) declinio dramatico Imperii Romani Occidentalis signatum erat...`,
    cultural_story: `Ante 1500 annos, cum Imperium Romanum fini appropinquaret, Macrobius epistulam in lagena ad futurum condidit...`,
    cultural_focus: "Quid Macrobius de Cultura Antiquitatis Serae Doceat",
    late_antiquity_wisdom: "Sapientia Antiquitatis Serae pro Mundo Moderno",
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Culturae Custos Mundi Antiquitatis Serae",
    about_biography: `Macrobius vir publicus antiquitatis serae fuit...`,
    about_works: `Opera praecipua "Saturnalia" et "Commentarii in Somnium Scipionis"...`,
    about_legacy: `Macrobii culturalis "epistula in lagena" saecula superavit...`,
    close_modal: "Claudere",
    about_pontanus_title: "Johannes Isaac Pontanus et Tycho Brahe",
    about_pontanus_subtitle: "Renascentia Astronomica et Macrobii Inventio",
    about_pontanus_bio: `Pontanus adiutor celebris astronomi Tychonis fuit...`,
    about_pontanus_work: `Eius editio completa annotata norma facta est...`,
    about_pontanus_legacy: `Per Pontani laborem, pons inter culturam antiquam aedificatus est...`,
    pontanus_historical_details: `Textus sequitur 117 paginis notarum Pontani...`
  }
};

// Clickable Image Component
interface ClickableImageProps {
  imageInfo: ImageInfo;
  onClick: (imageInfo: ImageInfo) => void;
  className?: string;
}

const ClickableImage: React.FC<ClickableImageProps> = ({ imageInfo, onClick, className = '' }) => {
  return (
    <motion.div
      className={`relative group cursor-pointer overflow-hidden rounded-xl border border-white/20 shadow-lg ${className}`}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(imageInfo)}
    >
      <div className="relative">
        <Image
          src={imageInfo.src}
          alt={imageInfo.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg mb-1">{imageInfo.title}</h3>
            {imageInfo.subtitle && (
              <p className="text-white/90 text-sm">{imageInfo.subtitle}</p>
            )}
          </div>
        </div>
        
        {/* Click Indicator */}
        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Maximize className="w-4 h-4 text-white" />
        </div>
      </div>
      
      {/* Bottom Info */}
      <div className="p-3 bg-white/10 backdrop-blur-sm">
        <p className="text-white/80 text-xs line-clamp-2">{imageInfo.description}</p>
      </div>
    </motion.div>
  );
};

// Main CULTURAL EDUCATION application (ENHANCED PICTURE CONFIGURATION)
export default function MacrobiusCulturalApp() {
  // Language state
  const [currentLang, setCurrentLang] = useState<Language>('DE');
  
  // Navigation state 
  const [activeSection, setActiveSection] = useState<string>('hero');
  
  // Astrolabe rotation state
  const [astrolabeRotation, setAstrolabeRotation] = useState<number>(0);
  
  // Modal states
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

  // Type adapter for components
  const tAdapter = useCallback((key: string): string => {
    if (key in translations[currentLang]) {
      return translations[currentLang][key as TranslationKey];
    }
    return key;
  }, [currentLang]);

  // Image click handler
  const handleImageClick = useCallback((imageInfo: ImageInfo) => {
    setSelectedImage(imageInfo);
    setShowImageModal(true);
  }, []);

  // Image modal close handler
  const handleImageModalClose = useCallback(() => {
    setShowImageModal(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  }, []);

  // Event handlers
  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
  };

  // Section change with astrolabe rotation
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setAstrolabeRotation(prev => prev + 45);
  };

  // Get images for different sections
  const introImages = getImagesBySection('intro');
  const cosmosImages = getImagesBySection('cosmos') || [];
  const worldmapImages = getImagesBySection('worldmap') || [];
  const banquetImages = getImagesBySection('banquet') || [];
  const visualizationImages = getImagesBySection('visualizations') || [];

  return (
    <>
      <Head>
        <title>{t('title')} - Macrobius Cultural Education</title>
        <meta name="description" content="Eine Nachricht aus der Antike an die Zukunft - Spätantike Weisheit für die moderne Welt" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Enhanced Evening Sky Gradient Background */}
      <div className="min-h-screen relative overflow-x-hidden" style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 15%, #16213e 30%, #0d1b2a 50%, #0c1821 70%, #0a0e1a 100%)'
      }}>
        {/* Enhanced Animated Starfield */}
        <div className="fixed inset-0 z-0">
          {[...Array(150)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
          {[...Array(50)].map((_, i) => (
            <div
              key={`moving-${i}`}
              className="absolute w-2 h-2 bg-yellow-200 rounded-full animate-pulse"
              style={{
                left: `${100 + (i * 30)}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animation: `moveStars ${15 + Math.random() * 10}s linear infinite, pulse 2s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* ENHANCED: More Subtle Rotating Astrolabe Background - Better blend */}
        <div className="fixed inset-0 z-1 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="opacity-40"
            animate={{ 
              rotate: astrolabeRotation,
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              rotate: { duration: 2, ease: "easeInOut" },
              scale: { duration: 10, ease: "easeInOut", repeat: Infinity }
            }}
          >
            <div className="w-[2000px] h-[2000px]">
              <Image 
                src="/Astrolab.jpg" 
                alt="Historical Astrolabe"
                width={2000}
                height={2000}
                className="w-full h-full object-contain"
                style={{
                  filter: 'hue-rotate(220deg) saturate(0.6) brightness(0.5) contrast(1.2)',
                  mixBlendMode: 'overlay'
                }}
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Floating Macrobius Circle */}
        {activeSection === 'hero' && (
          <motion.div 
            className="fixed top-16 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
            animate={{ 
              y: [0, -15, 0],
              x: [0, -8, 8, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 8,
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          >
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl bg-gradient-to-br from-yellow-400 to-orange-500">
              <Image 
                src="/MacrobiusBottle.jpg" 
                alt="Macrobius with Bottle"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Language Selector */}
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-2">
            <div className="flex space-x-1">
              {(['DE', 'EN', 'LA'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1 rounded text-sm font-semibold transition-all duration-300 ${
                    currentLang === lang
                      ? 'bg-yellow-400 text-gray-800 shadow-lg'
                      : 'text-white/80 hover:bg-white/20'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Sidebar */}
        <nav className="fixed top-4 left-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex flex-col space-y-2">
              {/* Core Sections */}
              {[
                { id: 'hero', label: t('section_intro'), icon: '🏛️' },
                { id: 'quiz', label: t('section_quiz'), icon: '📝' },
                { id: 'worldmap', label: t('section_worldmap'), icon: '🗺️' },
                { id: 'cosmos', label: t('section_cosmos'), icon: '🌌' },
                { id: 'banquet', label: t('section_banquet'), icon: '🍷' },
                { id: 'search', label: t('section_search'), icon: '🔍' },
                { id: 'learning', label: t('section_learning'), icon: '📚' },
                { id: 'visualizations', label: t('section_visualizations'), icon: '📊' }
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 text-left flex items-center space-x-2 btn-wine ${
                    activeSection === section.id
                      ? 'bg-yellow-400 text-gray-800 shadow-lg'
                      : 'text-yellow-300 hover:bg-white/20'
                  }`}
                  style={{
                    backgroundColor: activeSection === section.id ? '#FFD700' : '#722F37',
                    color: activeSection === section.id ? '#1a1a1a' : '#FFD700',
                  }}
                >
                  <span>{section.icon}</span>
                  <span>{section.label}</span>
                </button>
              ))}
              
              {/* AI Systems Separator */}
              <div className="border-t border-white/20 pt-2 mt-2">
                <p className="text-yellow-200/60 text-xs px-2 mb-2">KI-SYSTEME</p>
                {[
                  { id: 'ai-cultural', label: t('section_ai_cultural'), icon: '🧠' },
                  { id: 'ai-learning', label: t('section_ai_learning'), icon: '🎯' },
                  { id: 'ai-tutoring', label: t('section_ai_tutoring'), icon: '📖' },
                  { id: 'ai-modules', label: t('section_ai_modules'), icon: '✨' }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 text-left flex items-center space-x-2 btn-wine ${
                      activeSection === section.id
                        ? 'bg-blue-400 text-gray-800 shadow-lg'
                        : 'text-blue-300 hover:bg-white/20'
                    }`}
                    style={{
                      backgroundColor: activeSection === section.id ? '#60A5FA' : 'rgba(59, 130, 246, 0.2)',
                      color: activeSection === section.id ? '#1a1a1a' : '#93C5FD',
                    }}
                  >
                    <span>{section.icon}</span>
                    <span>{section.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Oracle Cloud Status */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/70">Oracle Cloud</span>
              </div>
              <p className="text-white/60 text-xs mt-1">1.401 Kulturelle Texte</p>
            </div>

            {/* Prominent Pontanus Button */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <button
                onClick={() => setShowPontanusModal(true)}
                className="w-full px-3 py-2 text-xs font-medium rounded-lg btn-wine transition-all duration-300 mb-2"
                style={{
                  backgroundColor: '#722F37',
                  color: '#FFD700',
                }}
              >
                Über Pontanus
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10">
          {/* ENHANCED Hero Section with better picture configuration */}
          {activeSection === 'hero' && (
            <section className="min-h-screen flex items-center justify-center px-4" style={{ paddingTop: '200px' }}>
              <div className="text-center max-w-7xl mx-auto">
                {/* Main content rectangle */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 mb-8">
                  
                  {/* Title and intro text */}
                  <div className="mb-8">
                    <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                      Macrobius
                    </h1>
                    
                    <h2 className="text-2xl md:text-4xl text-yellow-300 mb-6 font-light">
                      {t('title')}
                    </h2>
                    
                    <h3 className="text-lg md:text-xl text-yellow-200 mb-8 font-medium">
                      {t('intro')}
                    </h3>
                  </div>

                  {/* ENHANCED: Better picture gallery with corrected image positioning */}
                  <div className="mb-8">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                      <ImageIcon className="w-6 h-6 text-yellow-300" />
                      <h4 className="text-xl font-semibold text-yellow-200">{t('cultural_treasures')}</h4>
                      <Eye className="w-6 h-6 text-yellow-300" />
                    </div>
                    
                    {/* ENHANCED: Better grid layout with properly positioned images */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                      {/* ENHANCED: "Das untergehende Rom" with ORIGINAL COLORS - removed excessive red filter */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="md:col-span-2 lg:col-span-1"
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-orange-400/60 shadow-2xl"
                          whileHover={{ scale: 1.02, y: -8 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowRomeModal(true)}
                        >
                          <div className="relative">
                            {/* ENHANCED: Better object positioning AND ORIGINAL COLORS */}
                            <Image
                              src="/Rome-under.jpg"
                              alt="Das untergehende Rom"
                              width={400}
                              height={300}
                              className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                              style={{ 
                                objectPosition: 'center 30%' 
                              }}
                            />
                            
                            {/* Enhanced overlay with REDUCED red tint */}
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/70 via-yellow-600/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-white font-bold text-xl mb-2">Das untergehende Rom</h3>
                                <p className="text-white/95 text-sm">Kultureller Niedergang und die Mission der Bewahrung</p>
                              </div>
                            </div>
                            
                            <div className="absolute top-3 right-3 bg-orange-500/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Maximize className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gradient-to-r from-orange-900/20 to-yellow-900/20 backdrop-blur-sm">
                            <p className="text-white/90 text-sm font-medium">🏛️ Klicken für die vollständige Geschichte des kulturellen Niedergangs</p>
                          </div>
                        </motion.div>
                      </motion.div>
                      
                      {/* ENHANCED: Macrobius Portrait with proper image */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-yellow-400/60 shadow-xl"
                          whileHover={{ scale: 1.02, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowAboutModal(true)}
                        >
                          <div className="relative">
                            {/* Using available Macrobius image */}
                            <Image
                              src="/MacrobiusBottle.jpg"
                              alt="Macrobius Ambrosius Theodosius"
                              width={300}
                              height={300}
                              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-white font-bold text-lg mb-1">Macrobius Ambrosius Theodosius</h3>
                                <p className="text-white/90 text-sm">Kulturbewahrer der Spätantike</p>
                              </div>
                            </div>
                            
                            <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Maximize className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          
                          <div className="p-3 bg-white/10 backdrop-blur-sm">
                            <p className="text-white/80 text-xs">Der spätantike Gelehrte und Bewahrer der klassischen Tradition</p>
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* ENHANCED: Tycho & Pontanus - Fixed image reference */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-blue-400/60 shadow-xl"
                          whileHover={{ scale: 1.02, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowPontanusModal(true)}
                        >
                          <div className="relative">
                            {/* Using available Tycho Assistant image */}
                            <div className="w-full h-64 bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden">
                              <Image
                                src="/TychoAssistent.jpg"
                                alt="Tycho's Observatory with Pontanus"
                                width={300}
                                height={300}
                                className="absolute inset-0 w-full h-full object-cover opacity-70"
                              />
                              
                              {/* Text overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-600/40 to-transparent"></div>
                              <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-white font-bold text-lg mb-1">Tycho Brahe & Johannes Isaac Pontanus</h3>
                                <p className="text-white/90 text-sm">Astronomische Renaissance und Macrobius-Edition</p>
                              </div>
                            </div>
                            
                            <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Maximize className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          
                          <div className="p-3 bg-white/10 backdrop-blur-sm">
                            <p className="text-white/80 text-xs">Renaissance-Astronomie und die Wiederentdeckung antiker Weisheit</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    {/* ENHANCED: Display Macrobius and Son picture WITHOUT LINK as requested */}
                    <div className="mt-8 flex justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="max-w-md"
                      >
                        <div className="relative rounded-xl overflow-hidden border-2 border-amber-400/60 shadow-xl">
                          <Image
                            src="/Macrobius-and-Eustachius.jpg"
                            alt="Macrobius und sein Sohn Eustachius"
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="text-white font-bold text-lg">Macrobius und sein Sohn Eustachius</h3>
                              <p className="text-white/90 text-sm">Familiäre Überlieferung des Wissens</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <p className="text-yellow-200/80 text-sm mt-6 italic">
                      📸 Klicken Sie auf die Bilder für detaillierte kulturelle Hintergründe und historische Zusammenhänge
                    </p>
                  </div>

                  {/* Cultural story text */}
                  <div className="max-w-4xl mx-auto mb-8">
                    <p className="text-base md:text-lg text-white/90 leading-relaxed text-justify">
                      {t('cultural_story')}
                    </p>
                  </div>
                </div>

                {/* ENHANCED: Action Buttons with better layout */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => handleSectionChange('banquet')}
                    className="btn-wine px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                    }}
                  >
                    {t('explore_texts')}
                  </button>
                  
                  <button
                    onClick={() => setShowAboutModal(true)}
                    className="btn-wine px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                    }}
                  >
                    {t('more_about_macrobius')}
                  </button>

                  <button
                    onClick={() => setShowPontanusModal(true)}
                    className="btn-wine px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                    }}
                  >
                    {t('more_about_pontanus')}
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Oracle Cloud-Integrated Sections (unchanged) */}
          {activeSection === 'search' && (
            <TextSearchSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}

          {activeSection === 'cosmos' && (
            <div>
              <CosmosSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
              {cosmosImages.length > 0 && (
                <div className="fixed bottom-4 right-4 z-40">
                  <motion.div
                    className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-yellow-400/50 shadow-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex flex-col space-y-3">
                      <h4 className="text-yellow-200 text-base font-bold text-center bg-yellow-400/20 rounded px-2 py-1">
                        🌌 Kosmos Bilder
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {cosmosImages.slice(0, 4).map((image) => (
                          <div key={image.id} className="relative group">
                            <Image
                              src={image.src}
                              alt={image.title}
                              width={60}
                              height={60}
                              className="w-15 h-15 object-cover rounded-lg cursor-pointer hover:scale-110 transition-transform border-2 border-yellow-400/30 hover:border-yellow-400"
                              onClick={() => handleImageClick(image)}
                            />
                            <div className="absolute inset-0 bg-yellow-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                        ))}
                      </div>
                      <p className="text-yellow-200/80 text-xs text-center">Klicken für Details</p>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'banquet' && (
            <div>
              <BanquetSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
              {banquetImages.length > 0 && (
                <div className="fixed bottom-4 right-4 z-40">
                  <motion.div
                    className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-orange-400/50 shadow-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex flex-col space-y-3">
                      <h4 className="text-orange-200 text-base font-bold text-center bg-orange-400/20 rounded px-2 py-1">
                        🍷 Gastmahl Bilder
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {banquetImages.slice(0, 4).map((image) => (
                          <div key={image.id} className="relative group">
                            <Image
                              src={image.src}
                              alt={image.title}
                              width={60}
                              height={60}
                              className="w-15 h-15 object-cover rounded-lg cursor-pointer hover:scale-110 transition-transform border-2 border-orange-400/30 hover:border-orange-400"
                              onClick={() => handleImageClick(image)}
                            />
                            <div className="absolute inset-0 bg-orange-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                        ))}
                      </div>
                      <p className="text-orange-200/80 text-xs text-center">Klicken für Details</p>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'worldmap' && (
            <div>
              <WorldMapSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
              {worldmapImages.length > 0 && (
                <div className="fixed bottom-4 right-4 z-40">
                  <motion.div
                    className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-green-400/50 shadow-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex flex-col space-y-3">
                      <h4 className="text-green-200 text-base font-bold text-center bg-green-400/20 rounded px-2 py-1">
                        🗺️ Weltkarte Bilder
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {worldmapImages.slice(0, 4).map((image) => (
                          <div key={image.id} className="relative group">
                            <Image
                              src={image.src}
                              alt={image.title}
                              width={60}
                              height={60}
                              className="w-15 h-15 object-cover rounded-lg cursor-pointer hover:scale-110 transition-transform border-2 border-green-400/30 hover:border-green-400"
                              onClick={() => handleImageClick(image)}
                            />
                            <div className="absolute inset-0 bg-green-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                        ))}
                      </div>
                      <p className="text-green-200/80 text-xs text-center">Klicken für Details</p>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'quiz' && (
            <QuizSection isActive={true} />
          )}

          {activeSection === 'learning' && (
            <LearningSection />
          )}

          {activeSection === 'visualizations' && (
            <div>
              <VisualizationsSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
              {visualizationImages.length > 0 && (
                <div className="fixed bottom-4 right-4 z-40">
                  <motion.div
                    className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-blue-400/50 shadow-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex flex-col space-y-3">
                      <h4 className="text-blue-200 text-base font-bold text-center bg-blue-400/20 rounded px-2 py-1">
                        📊 Visualisierungen
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {visualizationImages.slice(0, 4).map((image) => (
                          <div key={image.id} className="relative group">
                            <Image
                              src={image.src}
                              alt={image.title}
                              width={60}
                              height={60}
                              className="w-15 h-15 object-cover rounded-lg cursor-pointer hover:scale-110 transition-transform border-2 border-blue-400/30 hover:border-blue-400"
                              onClick={() => handleImageClick(image)}
                            />
                            <div className="absolute inset-0 bg-blue-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                        ))}
                      </div>
                      <p className="text-blue-200/80 text-xs text-center">Klicken für Details</p>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}

          {/* AI Systems Sections */}
          {activeSection === 'ai-cultural' && (
            <AICulturalAnalysisSection />
          )}

          {activeSection === 'ai-learning' && (
            <PersonalizedLearningPathsSection />
          )}

          {activeSection === 'ai-tutoring' && (
            <AITutoringSystemSection />
          )}

          {activeSection === 'ai-modules' && (
            <AdvancedCulturalModulesSection />
          )}
        </main>

        {/* Enhanced Image Modal */}
        <ImageModal
          imageInfo={selectedImage}
          isOpen={showImageModal}
          onClose={handleImageModalClose}
          language={currentLang}
        />

        {/* ENHANCED About Macrobius Modal with BOOK PICTURES */}
        <AnimatePresence>
          {showAboutModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAboutModal(false)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              
              <motion.div
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-6xl mx-auto border border-white/30 shadow-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300 z-10"
                >
                  ×
                </button>

                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-yellow-400 mb-2">
                      {t('about_title')}
                    </h2>
                    <p className="text-xl text-yellow-300/90 font-medium">
                      {t('about_subtitle')}
                    </p>
                  </div>

                  {/* ENHANCED: Macrobius Portrait AND Book Pictures */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="relative">
                      <Image 
                        src="/MacrobiusBottle.jpg" 
                        alt="Macrobius Portrait"
                        width={256}
                        height={320}
                        className="w-full h-80 object-cover rounded-xl border-4 border-yellow-400 shadow-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-semibold">Macrobius Ambrosius Theodosius</p>
                      </div>
                    </div>
                    
                    {/* ENHANCED: Added Book Pictures as requested */}
                    <div className="relative">
                      <Image 
                        src="/MacrobI.JPG" 
                        alt="Macrobius Book Volume I"
                        width={256}
                        height={320}
                        className="w-full h-80 object-cover rounded-xl border-4 border-amber-400 shadow-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-semibold">Macrobius Band I</p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <Image 
                        src="/MacrobiRegal.jpg" 
                        alt="Macrobius Books on Shelf"
                        width={256}
                        height={320}
                        className="w-full h-80 object-cover rounded-xl border-4 border-amber-400 shadow-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-semibold">Macrobius Bibliothek</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">🏛️ Biographie & Kontext</h3>
                      <p className="text-white/90 leading-relaxed text-justify">{t('about_biography')}</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">📚 Werke & Bedeutung</h3>
                      <p className="text-white/90 leading-relaxed text-justify">{t('about_works')}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-yellow-400 mb-4">🌍 Vermächtnis & Wirkung</h3>
                    <p className="text-white/90 leading-relaxed text-justify">{t('about_legacy')}</p>
                  </div>

                  <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-yellow-300 mb-3">🌐 Diese App</h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Diese App nutzt das vollständige Macrobius-Korpus mit 1.401 authentischen Passagen 
                      zur kulturellen Bildung. Entdecke, was Macrobius über spätantike Kultur, Gesellschaft, 
                      Philosophie und Bildung lehrt - eine Brücke zwischen antiker Weisheit und moderner Welt.
                    </p>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setShowAboutModal(false)}
                      className="btn-wine px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: '#722F37',
                        color: '#FFD700',
                      }}
                    >
                      {t('close_modal')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ENHANCED: Combined Pontanus & Tycho Modal */}
        <AnimatePresence>
          {showPontanusModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPontanusModal(false)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              
              <motion.div
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-6xl mx-auto border border-white/30 shadow-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowPontanusModal(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300 z-10"
                >
                  ×
                </button>

                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-yellow-400 mb-2">
                      {t('about_pontanus_title')}
                    </h2>
                    <p className="text-xl text-yellow-300/90 font-medium">
                      {t('about_pontanus_subtitle')}
                    </p>
                  </div>

                  {/* ENHANCED: Observatory and Pontanus images */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="text-center">
                      <div className="relative mb-4">
                        <Image 
                          src="/TychoAssistent.jpg" 
                          alt="Tycho Brahe Observatory with Pontanus"
                          width={192}
                          height={256}
                          className="w-48 h-64 object-cover rounded-xl border-4 border-blue-400 shadow-xl mx-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white text-sm font-semibold">Tycho Brahe's Uraniborg with Pontanus</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="relative mb-4">
                        <Image 
                          src="/Astrolab.jpg" 
                          alt="Astronomical Instruments"
                          width={192}
                          height={256}
                          className="w-48 h-64 object-cover rounded-xl border-4 border-purple-400 shadow-xl mx-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white text-sm font-semibold">Renaissance Astronomical Instruments</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">👨‍🔬 Biographie & Wissenschaft</h3>
                      <p className="text-white/90 leading-relaxed text-justify">{t('about_pontanus_bio')}</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">📖 Editorische Leistung</h3>
                      <p className="text-white/90 leading-relaxed text-justify">{t('about_pontanus_work')}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-yellow-400 mb-4">🌉 Vermächtnis & Wirkung</h3>
                    <p className="text-white/90 leading-relaxed text-justify">{t('about_pontanus_legacy')}</p>
                  </div>

                  <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-300 mb-3">📜 Historische Details zur Edition</h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {t('pontanus_historical_details')}
                    </p>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setShowPontanusModal(false)}
                      className="btn-wine px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: '#722F37',
                        color: '#FFD700',
                      }}
                    >
                      {t('close_modal')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* "Das untergehende Rom" Modal with extensive content */}
        <AnimatePresence>
          {showRomeModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRomeModal(false)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              
              <motion.div
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-6xl mx-auto border border-white/30 shadow-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowRomeModal(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300 z-10"
                >
                  ×
                </button>

                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-red-400 mb-2">
                      {t('declining_rome_title')}
                    </h2>
                    <p className="text-xl text-red-300/90 font-medium">
                      {t('declining_rome_subtitle')}
                    </p>
                  </div>

                  {/* Featured Rome Image */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <Image 
                        src="/Rome-under.jpg" 
                        alt="Das untergehende Römische Reich"
                        width={400}
                        height={300}
                        className="w-96 h-72 object-cover rounded-xl border-4 border-red-400 shadow-xl"
                        style={{ objectPosition: 'center 30%' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent rounded-xl"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-semibold">Das untergehende Römische Reich zur Zeit des Macrobius</p>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <div className="text-white/90 leading-relaxed space-y-6 text-justify">
                      {/* Split the extensive content into readable sections */}
                      {t('declining_rome_content').split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph.startsWith('**') ? (
                            <>
                              <strong className="text-red-300 text-lg block mb-2">
                                {paragraph.match(/\*\*(.*?)\*\*/)?.[1]}
                              </strong>
                              {paragraph.replace(/\*\*(.*?)\*\*/, '').trim()}
                            </>
                          ) : (
                            paragraph
                          )}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-red-300 mb-3">🏛️ Historische Bedeutung</h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Macrobius' Zeit war eine der dramatischsten Wendepunkte der Weltgeschichte. Seine Antwort - 
                      die systematische Bewahrung der klassischen Kultur - wurde zum Modell für alle späteren 
                      "kulturellen Rettungsaktionen" in Krisenzeiten. Von den mittelalterlichen Klöstern bis zu 
                      modernen digitalen Archiven folgen Kulturbewahrer seinem Beispiel.
                    </p>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setShowRomeModal(false)}
                      className="btn-wine px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: '#722F37',
                        color: '#FFD700',
                      }}
                    >
                      {t('close_modal')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced CSS Styles */}
        <style jsx global>{`
          @keyframes moveStars {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-100vw);
            }
          }
          
          .btn-wine {
            background: linear-gradient(135deg, #722F37 0%, #8B4513 100%);
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(114, 47, 55, 0.3);
          }
          
          .btn-wine:hover {
            background: linear-gradient(135deg, #8B4513 0%, #722F37 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
          }

          .card-hover {
            transition: all 0.3s ease;
          }
          
          .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .prose p strong {
            color: #ef4444;
            font-size: 1.125rem;
            display: block;
            margin-bottom: 0.5rem;
          }
        `}</style>
      </div>
    </>
  );
}
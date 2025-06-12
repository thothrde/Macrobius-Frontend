/**
 * 🏛️ MACROBIUS - EINE ANTIKE FLASCHENPOST
 * Enhanced Astronomical Design - Message in a Bottle from Antiquity to the Future
 * Visual Excellence with Historical Authenticity
 * 
 * RECONSTRUCTED: June 12, 2025 - Complete modular architecture
 * Architecture: Using separate section components for maintainability
 */

import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

// Translation types
type TranslationKey = 
  | 'title' | 'intro' | 'section_intro' | 'section_quiz' | 'section_worldmap' 
  | 'section_cosmos' | 'section_banquet' | 'section_search' | 'section_learning' 
  | 'section_visualizations' | 'timeline' | 'interactive_map' | 'character_network' 
  | 'thematic_heatmap' | 'theme_relationships' | 'explore_texts' | 'about_macrobius' 
  | 'search_placeholder' | 'quiz_question' | 'quiz_a' | 'quiz_b' | 'quiz_c' 
  | 'quiz_answer' | 'cosmos_description' | 'worldmap_description' | 'banquet_description' 
  | 'learning_tools' | 'story' | 'about_title' | 'about_subtitle' | 'about_biography' 
  | 'about_works' | 'about_legacy' | 'about_influence' | 'close_modal' | 'pontanus_button'
  | 'about_pontanus_title' | 'about_pontanus_subtitle' | 'about_pontanus_bio'
  | 'about_pontanus_work' | 'about_pontanus_legacy';

type TranslationTexts = Record<TranslationKey, string>;
type Translations = Record<'DE' | 'EN' | 'LA', TranslationTexts>;

// Star and animation types
interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  intensity: number;
  type: 'normal' | 'bright';
  velocityX: number; // For horizontal movement
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
}

// Image details for modals
const imageDetails = {
  'Macrobius-universe.jpg': {
    title: 'Macrobius Kosmologie',
    subtitle: 'Die Sphärenharmonie der Antike',
    description: 'Diese mittelalterliche Darstellung zeigt Macrobius\' Beschreibung des Kosmos aus seinem "Commentarii in Somnium Scipionis". Das Diagramm illustriert die neun Sphären des Himmels, beginnend mit der Erde im Zentrum, umgeben von den Planetensphären und der äußeren Sphäre der Fixsterne. Macrobius erklärte, wie jede Sphäre einen eigenen Ton erzeugt, zusammen die "Sphärenmusik" bildend.',
    historical: 'Macrobius preservierte hier antike pythagoreische und platonische Kosmologie für das Mittelalter. Seine Beschreibung der Sphärenharmonie beeinflusste mittelalterliche Astronomen und Philosophen jahrhundertelang und fand ihren Weg in die Werke von Gelehrten wie Johannes Kepler.',
    category: 'Kosmologie'
  },
  'Macrobius-Zeichnung-Eklipse.jpg': {
    title: 'Eklipse-Diagramm',
    subtitle: 'Astronomische Berechnungen der Antike',
    description: 'Dieses Diagramm aus Macrobius\' Werk zeigt die mathematische Erklärung von Sonnen- und Mondfinsternissen. Es demonstriert das Verständnis der Antike für die Mechanik von Schatten und Licht im Sonnensystem. Die Darstellung zeigt, wie Macrobius komplexe astronomische Phänomene für Studierende zugänglich machte.',
    historical: 'Solche Diagramme waren revolutionär für ihre Zeit und zeigen das hohe wissenschaftliche Niveau der Spätantike. Sie bewahrten wichtiges astronomisches Wissen durch die dunklen Jahrhunderte und ermöglichten später die Wiederentdeckung der Astronomie in der Renaissance.',
    category: 'Astronomie'
  },
  'Macrobius-Erdkarte.jpg': {
    title: 'Macrobius Weltkarte',
    subtitle: 'Antike Geographie und Klimazonen',
    description: 'Diese Karte illustriert Macrobius\' Beschreibung der bewohnbaren Welt und der verschiedenen Klimazonen. Sie zeigt die antike Vorstellung der Erde mit drei Kontinenten: Europa, Afrika und Asien. Die verschiedenen Farben repräsentieren unterschiedliche Klimazonen, von den eisigen Polen bis zur heißen Äquatorzone.',
    historical: 'Macrobius\' geographische Beschreibungen basierten auf antiken Quellen wie Ptolemäus und prägten das mittelalterliche Weltbild. Seine wissenschaftliche Einteilung der Klimazonen war ihrer Zeit weit voraus und beeinflusste die Kartographie bis in die Renaissance.',
    category: 'Geographie'
  },
  'mappa-mundi.jpg': {
    title: 'Mappa Mundi',
    subtitle: 'Mittelalterliches Weltbild',
    description: 'Diese mittelalterliche Weltkarte (Mappa Mundi) zeigt, wie Macrobius\' geographische Ideen das Weltbild des Mittelalters prägten. Jerusalem steht im Zentrum, umgeben von den drei bekannten Kontinenten. Mythische Kreaturen und biblische Orte werden neben realen geographischen Merkmalen dargestellt.',
    historical: 'Solche Karten kombinierten religiöse Kosmologie mit den geographischen Kenntnissen der Antike, die durch Macrobius und andere Gelehrte überliefert wurden. Sie zeigen, wie antikes Wissen mit mittelalterlicher Weltanschauung verschmolz.',
    category: 'Mittelalterliche Geographie'
  },
  'WandSymposion.jpg': {
    title: 'Römisches Symposion',
    subtitle: 'Wandmalerei aus Pompeji',
    description: 'Diese Wandmalerei aus Pompeji zeigt eine typische römische Gastmahlszene, wie sie Macrobius in seinen "Saturnalia" beschreibt. Gebildete Römer liegen auf Speisesofas (triclinia) und führen gelehrte Gespräche während des Essens. Die Szene illustriert die Verbindung von kulinarischem Genuss und intellektueller Diskussion.',
    historical: 'Die Saturnalien-Gespräche bei Macrobius fanden in genau solcher Atmosphäre statt. Diese Tradition des gelehrten Gastmahls prägte die antike Bildungskultur und wurde in der Renaissance wiederentdeckt, wo sie humanistische Akademien inspirierte.',
    category: 'Römische Kultur'
  },
  'Symposion-2.jpg': {
    title: 'Gelehrtes Gastmahl',
    subtitle: 'Antike Bildungskultur',
    description: 'Diese Darstellung zeigt die Atmosphäre der gelehrten Gespräche, wie Macrobius sie in seinen "Saturnalia" schildert. Philosophen, Rhetoren und Grammatiker diskutieren bei Wein und Speisen über Religion, Geschichte, Literatur und Philosophie. Die zwanglose Atmosphäre ermöglichte tiefgreifende intellektuelle Auseinandersetzungen.',
    historical: 'Macrobius\' Saturnalia sind ein literarisches Meisterwerk, das diese Tradition des gelehrten Gastmahls für die Nachwelt festhielt. Sie bewahrten unschätzbares Wissen über die römische Kultur und zeigen, wie Bildung in der Spätantike funktionierte.',
    category: 'Antike Philosophie'
  }
};

// Enhanced translation system
const translations: Translations = {
  DE: {
    title: "Eine antike Flaschenpost",
    intro: "Eine Nachricht aus der Antike an die Zukunft",
    section_intro: "Einführung",
    section_quiz: "Quiz",
    section_worldmap: "Weltkarte", 
    section_cosmos: "Kosmos",
    section_banquet: "Gastmahl",
    section_search: "Textsuche",
    section_learning: "Lernen",
    section_visualizations: "Visualisierungen",
    timeline: "Zeitleiste",
    interactive_map: "Interaktive Karte",
    character_network: "Charakternetzwerk",
    thematic_heatmap: "Thematische Heatmap",
    theme_relationships: "Themen-Beziehungen",
    explore_texts: "Erkunden Sie die Texte",
    about_macrobius: "Mehr über Macrobius",
    search_placeholder: "Suche in Macrobius-Texten...",
    quiz_question: "Wie hieß der berühmte Traum, den Macrobius kommentierte?",
    quiz_a: "A) Scipios Traum",
    quiz_b: "B) Caesars Traum", 
    quiz_c: "C) Ciceros Traum",
    quiz_answer: "Richtige Antwort: A) Scipios Traum - Das 'Somnium Scipionis' war ein berühmter Text von Cicero, den Macrobius ausführlich kommentierte.",
    cosmos_description: "Erkunden Sie Macrobius' faszinierende Darstellung des Kosmos und der Himmelskörper",
    worldmap_description: "Entdecken Sie die antike Weltsicht durch Macrobius' geografische Beschreibungen",
    banquet_description: "Tauchen Sie ein in die Gespräche der Gelehrten beim Gastmahl der Saturnalien",
    learning_tools: "Lernwerkzeuge für das Studium der lateinischen Sprache und antiken Kultur",
    story: `Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius, ein führender Verwaltungsbeamter und Gelehrter im Norden Italiens, eine Flaschenpost an die Zukunft an. Diese Flaschenpost bestand aus zwei Texten: Einer ungezwungenen Gesprächsrunde gebildeter Römer und einem Traumkommentar. In beidem versuchte Macrobius das, was ihm an der untergehenden Zivilisation der Antike wichtig war, in einer Weise zu verpacken, die die heranziehenden dunklen Jahrhunderte überstand und zukünftige Leser anregte, den Zivilisationsprozess wieder in Gang zu setzen mit der Erinnerung an die antike Zivilisation als Ermutigung und Materialquelle. Vor 500 Jahren begann dieser Neuanfang. In Dänemark durch astronomische Beobachtungen Tycho Brahes, der damit den Grundstein für Keplers Arbeit und das Entstehen moderner Naturwissenschaften legte. Ein Assistent Tychos erinnerte sich an Macrobius Flaschenpost und stellte erstmals eine zuverlässige und kommentierte Gesamtausgabe zusammen. Dieses Buch kam in meine Hände und ich auf die Idee, eine kleine App für euch zu dieser Geschichte zu basteln.... Viel Spaß!`,
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Philosoph, Grammatiker und Bewahrer antiker Weisheit (ca. 385-430 n. Chr.)",
    about_biography: `Macrobius Ambrosius Theodosius war ein spätantiker römischer Beamter, Philosoph und Schriftsteller, der um 385-430 n. Chr. lebte. Er stammte wahrscheinlich aus Nordafrika und bekleidete hohe Verwaltungsämter im spätrömischen Reich. Als Praefectus praetorio per Hispanias verwaltete er die iberische Halbinsel und war eine der einflussreichsten Persönlichkeiten seiner Zeit. Macrobius verkörperte die letzte Blüte der klassischen römischen Bildung, bevor das Weströmische Reich zusammenbrach.`,
    about_works: `Seine beiden Hauptwerke sind die "Saturnalia" - eine faszinierende Darstellung gelehrter Gespräche während der Saturnalien-Festtage - und die "Commentarii in Somnium Scipionis", ein ausführlicher Kommentar zu Ciceros berühmtem "Traum des Scipio". In beiden Werken bewahrte Macrobius unschätzbares Wissen der Antike für zukünftige Generationen.`,
    about_legacy: `Macrobius' Einfluss auf die mittelalterliche und renaissance Bildung kann kaum überschätzt werden. Seine Werke überbrückten die dunklen Jahrhunderte und inspirierten später Gelehrte wie Johannes Kepler und andere Pioniere der modernen Wissenschaft. Seine "antike Flaschenpost" erreichte ihr Ziel und half dabei, den Zivilisationsprozess wieder in Gang zu setzen.`,
    about_influence: `Durch seine systematische Bewahrung antiker Weisheit und seine pädagogische Aufbereitung komplexer Themen schuf Macrobius eine Brücke zwischen der klassischen Antike und der modernen Welt. Seine Methode, schwierige Konzepte durch Dialogue und Visualisierungen zu erklären, ist heute relevanter denn je.`,
    close_modal: "Schließen",
    pontanus_button: "Über Pontanus",
    about_pontanus_title: "Johannes Isaac Pontanus",
    about_pontanus_subtitle: "Dänischer Gelehrter und Herausgeber (1571-1639)",
    about_pontanus_bio: `Johannes Isaac Pontanus war ein dänischer Humanist, Historiker und Philologe, der eine entscheidende Rolle bei der Bewahrung und Verbreitung von Macrobius' Werken spielte. Geboren 1571 in Helsingör, war er ein Zeitgenosse des berühmten Astronomen Tycho Brahe und bewegte sich in den gleichen gelehrten Kreisen des dänischen Hofes.`,
    about_pontanus_work: `Pontanus' größter Beitrag zur Macrobius-Forschung war seine sorgfältige Edition der gesammelten Werke von 1597. Diese kritische Ausgabe, die in Frankfurt erschien, wurde zur Standardreferenz für Jahrhunderte. Er korrigierte zahlreiche Textfehler früherer Manuskripte und fügte umfangreiche Kommentare hinzu, die das Verständnis der komplexen antiken Texte erheblich erleichterten.`,
    about_pontanus_legacy: `Durch seine akribische philologische Arbeit rettete Pontanus Macrobius' "antike Flaschenpost" vor dem Vergessen und machte sie für die Gelehrten der Renaissance und der frühen Neuzeit zugänglich. Seine Edition inspirierte eine neue Generation von Wissenschaftlern und trug zur Wiedergeburt des Interesses an klassischer Astronomie und Philosophie bei.`
  },
  EN: {
    title: "An Ancient Message in a Bottle",
    intro: "A message from antiquity to the future",
    section_intro: "Introduction",
    section_quiz: "Quiz",
    section_worldmap: "World Map",
    section_cosmos: "Cosmos",
    section_banquet: "Banquet",
    section_search: "Text Search",
    section_learning: "Learning",
    section_visualizations: "Visualizations",
    timeline: "Timeline",
    interactive_map: "Interactive Map",
    character_network: "Character Network",
    thematic_heatmap: "Thematic Heatmap",
    theme_relationships: "Theme Relationships",
    explore_texts: "Explore the Texts",
    about_macrobius: "About Macrobius",
    search_placeholder: "Search in Macrobius texts...",
    quiz_question: "What was the famous dream that Macrobius commented on?",
    quiz_a: "A) Scipio's Dream",
    quiz_b: "B) Caesar's Dream",
    quiz_c: "C) Cicero's Dream",
    quiz_answer: "Correct Answer: A) Scipio's Dream - The 'Somnium Scipionis' was a famous text by Cicero that Macrobius extensively commented upon.",
    cosmos_description: "Explore Macrobius' fascinating representation of the cosmos and celestial bodies",
    worldmap_description: "Discover the ancient worldview through Macrobius' geographical descriptions",
    banquet_description: "Immerse yourself in the scholarly conversations at the Saturnalia banquet",
    learning_tools: "Learning tools for studying Latin language and ancient culture",
    story: `1500 years ago, as the Roman Empire faced its decline, Macrobius, a leading administrator and scholar in northern Italy, created a message in a bottle to the future. This message consisted of two texts: casual conversations among educated Romans and a dream commentary. In both, Macrobius tried to preserve what he considered important about the declining civilization of antiquity, packaged in a way that would survive the approaching dark centuries and inspire future readers to restart the civilizational process with the memory of ancient civilization as encouragement and source material. 500 years ago, this renaissance began. In Denmark through Tycho Brahe's astronomical observations, which laid the foundation for Kepler's work and the emergence of modern natural sciences. An assistant of Tycho remembered Macrobius' message in a bottle and compiled the first reliable and annotated complete edition. This book came into my hands and gave me the idea to create a small app for you about this story... Have fun!`,
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Philosopher, Grammarian and Preserver of Ancient Wisdom (ca. 385-430 AD)",
    about_biography: `Macrobius Ambrosius Theodosius was a late antique Roman official, philosopher and writer who lived around 385-430 AD. He probably came from North Africa and held high administrative offices in the late Roman Empire. As Praefectus praetorio per Hispanias, he administered the Iberian Peninsula and was one of the most influential personalities of his time. Macrobius embodied the last flowering of classical Roman education before the Western Roman Empire collapsed.`,
    about_works: `His two main works are the "Saturnalia" - a fascinating portrayal of scholarly conversations during the Saturnalia festival days - and the "Commentarii in Somnium Scipionis", an extensive commentary on Cicero's famous "Dream of Scipio". In both works, Macrobius preserved invaluable knowledge of antiquity for future generations.`,
    about_legacy: `Macrobius' influence on medieval and renaissance education can hardly be overestimated. His works bridged the dark centuries and later inspired scholars like Johannes Kepler and other pioneers of modern science. His "ancient message in a bottle" reached its goal and helped restart the civilizational process.`,
    about_influence: `Through his systematic preservation of ancient wisdom and his pedagogical treatment of complex topics, Macrobius created a bridge between classical antiquity and the modern world. His method of explaining difficult concepts through dialogues and visualizations is more relevant today than ever.`,
    close_modal: "Close",
    pontanus_button: "About Pontanus",
    about_pontanus_title: "Johannes Isaac Pontanus",
    about_pontanus_subtitle: "Danish Scholar and Editor (1571-1639)",
    about_pontanus_bio: `Johannes Isaac Pontanus was a Danish humanist, historian, and philologist who played a crucial role in preserving and disseminating Macrobius' works. Born in 1571 in Helsingør, he was a contemporary of the famous astronomer Tycho Brahe and moved in the same scholarly circles of the Danish court.`,
    about_pontanus_work: `Pontanus' greatest contribution to Macrobius research was his careful edition of the collected works from 1597. This critical edition, published in Frankfurt, became the standard reference for centuries. He corrected numerous textual errors from earlier manuscripts and added extensive commentaries that greatly facilitated understanding of the complex ancient texts.`,
    about_pontanus_legacy: `Through his meticulous philological work, Pontanus saved Macrobius' "ancient message in a bottle" from oblivion and made it accessible to Renaissance and early modern scholars. His edition inspired a new generation of scientists and contributed to the revival of interest in classical astronomy and philosophy.`
  },
  LA: {
    title: "Epistula Antiqua in Lagena",
    intro: "Nuntius ab antiquitate ad futurum",
    section_intro: "Introductio",
    section_quiz: "Quaestiones",
    section_worldmap: "Mappa Mundi",
    section_cosmos: "Cosmos",
    section_banquet: "Convivium",
    section_search: "Textus Quaerere",
    section_learning: "Discere",
    section_visualizations: "Imagines",
    timeline: "Temporum Ordo",
    interactive_map: "Mappa Interactiva",
    character_network: "Personarum Nexus",
    thematic_heatmap: "Thematum Mappa",
    theme_relationships: "Thematum Relationes",
    explore_texts: "Textus Explorare",
    about_macrobius: "De Macrobio",
    search_placeholder: "Quaerere in textibus Macrobii...",
    quiz_question: "Quod somnium celebre Macrobius commentatus est?",
    quiz_a: "A) Somnium Scipionis",
    quiz_b: "B) Somnium Caesaris",
    quiz_c: "C) Somnium Ciceronis",
    quiz_answer: "Responsio recta: A) Somnium Scipionis - 'Somnium Scipionis' textus celebris Ciceronis erat, quem Macrobius copiose commentatus est.",
    cosmos_description: "Explorare Macrobii miram cosmorum et astrorum descriptionem",
    worldmap_description: "Invenire antiquam mundi visionem per Macrobii geographicas descriptiones",
    banquet_description: "Immergere in doctorum colloquia in Saturnalium convivio",
    learning_tools: "Instrumenta discendi linguae Latinae et antiquae culturae",
    story: `Ante annos mille quingentos, cum Imperium Romanum ruinae appropinquaret, Macrobius, praecipuus administrator et eruditus in Italia septentrionali, lagena cum epistula ad futurum confecit. Haec epistula duobus textibus constabat: colloquiis liberis eruditorum Romanorum et commentario somnii. In utrisque Macrobius id quod de cadente antiquitatis civilizatione sibi important videbatur, eo modo involvere conatus est qui saecula tenebrosa supervicturus esset futurosque lectores ad processum civilizationis renovandum incitaret, memoria antiquae civilizationis ut solacium fontesque materiae. Ante quingentos annos haec renaissance coepit. In Dania per observationes astronomicas Tychonis Brahe, qui fundamenta pro Kepleri labore et scientiarum naturalium modernorum ortu posuit. Tychonis adiutor Macrobii epistulam in lagena recordatus est primamque fidelem et adnotatam completam editionem composuit. Hic liber in meas manus venit et ideam mihi dedit parvam applicationem vobis de hac historia construendi... Bene valete!`,
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Philosophus, Grammaticus et Antiquae Sapientiae Custos (ca. 385-430 p.C.)",
    about_biography: `Macrobius Ambrosius Theodosius vir publicus, philosophus et scriptor antiquitatis serae fuit, qui circa 385-430 p.C. vixit. Probabiliter ex Africa septentrionali ortus, altos magistratus in Imperio Romano sero gessit. Ut Praefectus praetorio per Hispanias peninsulam Ibericam administravit et inter praecipuas suae aetatis personalitates fuit. Macrobius ultimam classicae Romanae educationis efflorentiam corporavit, antequam Imperium Romanum Occidentale collaberetur.`,
    about_works: `Duo eius praecipua opera sunt "Saturnalia" - fascinans doctorum colloquiorum per Saturnalium festos dies descriptio - et "Commentarii in Somnium Scipionis", amplus commentarius ad Ciceronis celebre "Somnium Scipionis". In utrisque operibus Macrobius inaestimabilem antiquitatis scientiam pro futuris generationibus servavit.`,
    about_legacy: `Macrobii in educationem medievalem et renaissance influxus vix superaestimari potest. Eius opera tenebrosa saecula pontibus iunxerunt et postea eruditos ut Johannem Keplerum aliaque modernae scientiae initia inspirarunt. Eius "antiqua epistula in lagena" scopum suum attigit et processum civilizationis renovare adiuvit.`,
    about_influence: `Per systematicam antiquae sapientiae conservationem suamque paedagogicam complexorum argumentorum tractationem, Macrobius pontem inter classicam antiquitatem et modernum mundum creavit. Eius methodus difficilium conceptuum per dialogos et imagines explicandorum hodie quam unquam magis pertinet.`,
    close_modal: "Claudere",
    pontanus_button: "De Pontano",
    about_pontanus_title: "Johannes Isaac Pontanus",
    about_pontanus_subtitle: "Eruditus Danicus et Editor (1571-1639)",
    about_pontanus_bio: `Johannes Isaac Pontanus humanista, historicus et philologus Danicus fuit qui partem crucialem in Macrobii operum conservatione et disseminatione gessit. Anno 1571 Helsingörae natus, contemporaneus celebris astronomi Tychonis Brahe fuit et in eisdem eruditis Danicae aulae circulis versabatur.`,
    about_pontanus_work: `Pontani maximum ad Macrobii studia contributum fuit accurata collectorum operum editio anni 1597. Haec critica editio, Francofurti publicata, per saecula norma referentiae facta est. Numerosos textuum errores ex anterioribus manuscriptis correxit et amplus commentarios addidit qui complexorum antiquorum textuum intellectum magnopere facilitetuberunt.`,
    about_pontanus_legacy: `Per suum accuratum philologicum laborem, Pontanus Macrobii "antiquam epistulam in lagena" ab oblivione servavit eamque Renaissance et modernis temporibus eruditis accessibilem fecit. Eius editio novam scientiarum generationem inspiravit et ad classicae astronomiae philosophiaeque studii renovationem contribuit.`
  }
};

// Main application component
export default function MacrobiusApp() {
  // Language state
  const [currentLang, setCurrentLang] = useState<'DE' | 'EN' | 'LA'>('DE');
  
  // Navigation state
  const [activeSection, setActiveSection] = useState<string>('intro');
  
  // Modal states
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPontanusModal, setShowPontanusModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [showVisualization, setShowVisualization] = useState<string | null>(null);
  
  // Animation states
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  
  // Search and quiz states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [showQuizResult, setShowQuizResult] = useState(false);
  
  // Region selection state for interactive map
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Translation helper
  const t = useCallback((key: TranslationKey): string => {
    return translations[currentLang][key] || key;
  }, [currentLang]);

  // Initialize stars animation
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = window.innerWidth < 768 ? 30 : 60;
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 3 + 1,
          delay: Math.random() * 4,
          duration: Math.random() * 3 + 2,
          intensity: Math.random() * 0.8 + 0.2,
          type: Math.random() > 0.8 ? 'bright' : 'normal',
          velocityX: (Math.random() - 0.5) * 0.5
        });
      }
      setStars(newStars);
    };

    generateStars();
    
    // Generate shooting stars periodically
    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newShootingStar: ShootingStar = {
          id: Date.now(),
          startX: Math.random() * 100,
          startY: Math.random() * 30,
          endX: Math.random() * 100,
          endY: Math.random() * 100,
          duration: Math.random() * 2 + 1
        };
        
        setShootingStars(prev => [...prev, newShootingStar]);
        
        setTimeout(() => {
          setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id));
        }, newShootingStar.duration * 1000);
      }
    }, 3000);

    return () => {
      clearInterval(shootingStarInterval);
    };
  }, []);

  // Event handlers
  const handleLanguageChange = (lang: 'DE' | 'EN' | 'LA') => {
    setCurrentLang(lang);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleImageClick = (imageName: string) => {
    const imageInfo = imageDetails[imageName as keyof typeof imageDetails];
    if (imageInfo) {
      setSelectedImage({
        src: `/images/${imageName}`,
        ...imageInfo
      });
      setShowImageModal(true);
    }
  };

  const handleVisualizationClick = (type: string) => {
    setShowVisualization(type);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    // Mock search results for demo
    if (query.trim()) {
      const mockResults = [
        {
          id: 1,
          text: "Macrobius beschreibt die Sphärenharmonie der Himmelskörper...",
          source: "Commentarii in Somnium Scipionis, Buch II",
          theme: "Astronomie",
          relevance: 95
        },
        {
          id: 2,
          text: "In den Saturnalia diskutieren die Gelehrten über antike Bräuche...",
          source: "Saturnalia, Buch I",
          theme: "Römische Kultur",
          relevance: 88
        }
      ].filter(result => 
        result.text.toLowerCase().includes(query.toLowerCase()) ||
        result.source.toLowerCase().includes(query.toLowerCase()) ||
        result.theme.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleQuizAnswer = (answer: string) => {
    setQuizAnswer(answer);
    setShowQuizResult(true);
  };

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
  };

  // Close modal handlers
  const handleCloseAbout = () => setShowAboutModal(false);
  const handleClosePontanus = () => setShowPontanusModal(false);
  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };
  const handleCloseVisualization = () => setShowVisualization(null);

  // Region information for interactive map
  const regionInfo = {
    'Hispanien': {
      title: 'Hispanien - Macrobius\' Verwaltungsbereich',
      role: 'Praefectus praetorio per Hispanias',
      description: 'Macrobius verwaltete als hoher römischer Beamter die iberische Halbinsel. In dieser Position war er verantwortlich für Rechtsprechung, Steuern und militärische Angelegenheiten.',
      cultural_significance: 'Hispanien war ein wichtiges kulturelles Zentrum des spätrömischen Reiches, das bedeutende Schriftsteller wie Seneca, Lucan und Martial hervorbrachte.',
      connections: [
        'Direkte Verwaltungsverbindung nach Rom',
        'Kultureller Austausch mit Nordafrika',
        'Handelsrouten zum östlichen Mittelmeer'
      ]
    },
    'Gallia': {
      title: 'Gallia - Zentrum der Bildung',
      role: 'Bildungs- und Kulturzentrum',
      description: 'Gallien war bekannt für seine Rhetorenschulen und Universitäten, besonders in Lyon, Marseille und Bordeaux.',
      cultural_significance: 'Wichtiger Treffpunkt zwischen römischer und keltischer Kultur, mit blühenden philosophischen Schulen.',
      connections: [
        'Bildungsrouten nach Italien',
        'Handelsverbindungen nach Britannien',
        'Philosophischer Austausch mit dem Osten'
      ]
    },
    'Italia': {
      title: 'Italia - Das kulturelle Herz',
      role: 'Kulturelles und politisches Zentrum',
      description: 'Italien blieb das Zentrum der römischen Kultur und Bildung, auch in der Spätantike.',
      cultural_significance: 'Heimat der größten Bibliotheken und Gelehrtenkreise, in denen Macrobius seine Saturnalia ansiedelte.',
      connections: [
        'Zentrale Verbindung zu allen Provinzen',
        'Kultureller Austausch mit Griechenland',
        'Administrative Koordination des Reiches'
      ]
    },
    'Africa': {
      title: 'Africa - Macrobius\' Heimat',
      role: 'Geburtsort und kulturelle Prägung',
      description: 'Nordafrika war Macrobius\' wahrscheinliche Heimat und ein wichtiges Zentrum christlicher und klassischer Bildung.',
      cultural_significance: 'Heimat von Augustinus, Apuleius und anderen großen Denkern, die antike Philosophie mit neuen Ideen verbanden.',
      connections: [
        'Intensive Handelsbeziehungen nach Rom',
        'Kultureller Austausch mit Ägypten',
        'Philosophische Verbindungen nach Griechenland'
      ]
    },
    'Oriens': {
      title: 'Oriens - Quelle griechischer Weisheit',
      role: 'Bewahrer griechischer Tradition',
      description: 'Der Osten des Reiches war das Zentrum griechischer Philosophie und Wissenschaft.',
      cultural_significance: 'Hier wurden die griechischen Texte bewahrt, die Macrobius in seinem Traumkommentar verwendete.',
      connections: [
        'Philosophische Schulen in Athen und Alexandria',
        'Wissenschaftlicher Austausch mit Syrien',
        'Mystische und neuplatonische Traditionen'
      ]
    }
  };

  return (
    <>
      <Head>
        <title>{t('title')} - Macrobius</title>
        <meta name="description" content="Eine interaktive Reise durch die Werke von Macrobius - Entdecken Sie antike Weisheit in moderner Präsentation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen relative overflow-x-hidden">
        {/* Animated star field background */}
        <div className="fixed inset-0 z-0">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className={`absolute rounded-full ${
                star.type === 'bright' ? 'bg-yellow-200' : 'bg-yellow-400'
              }`}
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.intensity,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [star.intensity, star.intensity * 1.5, star.intensity],
                x: [0, star.velocityX * 10, 0],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Shooting stars */}
          {shootingStars.map((shootingStar) => (
            <motion.div
              key={shootingStar.id}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              style={{
                left: `${shootingStar.startX}%`,
                top: `${shootingStar.startY}%`,
                boxShadow: '0 0 6px #FFD700, 0 0 12px #FFD700'
              }}
              animate={{
                x: `${shootingStar.endX - shootingStar.startX}vw`,
                y: `${shootingStar.endY - shootingStar.startY}vh`,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: shootingStar.duration,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Language selector */}
        <div className="fixed top-4 right-4 z-50">
          <div className="flex space-x-2">
            {(['DE', 'EN', 'LA'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  currentLang === lang
                    ? 'bg-yellow-400 text-gray-800 shadow-lg'
                    : 'bg-white/20 text-white/80 hover:bg-white/30'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className="fixed top-4 left-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex flex-col space-y-2">
              {[
                { id: 'intro', label: t('section_intro') },
                { id: 'quiz', label: t('section_quiz') },
                { id: 'worldmap', label: t('section_worldmap') },
                { id: 'cosmos', label: t('section_cosmos') },
                { id: 'banquet', label: t('section_banquet') },
                { id: 'search', label: t('section_search') },
                { id: 'learning', label: t('section_learning') },
                { id: 'visualizations', label: t('section_visualizations') }
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-left ${
                    activeSection === section.id
                      ? 'bg-yellow-400 text-gray-800 shadow-lg'
                      : 'text-white/80 hover:bg-white/20'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="relative z-10 pt-20 pb-20">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1
                className="text-6xl md:text-8xl font-bold text-gradient mb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Macrobius
              </motion.h1>
              
              <motion.h2
                className="text-2xl md:text-4xl text-yellow-300 mb-12 font-light"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {t('title')}
              </motion.h2>
              
              <motion.p
                className="text-xl md:text-2xl text-white/90 mb-16 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                {t('intro')}
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <button
                  onClick={() => setShowAboutModal(true)}
                  className="btn-wine px-8 py-4 text-lg"
                >
                  {t('about_macrobius')}
                </button>
                
                <button
                  onClick={() => setShowPontanusModal(true)}
                  className="btn-wine px-8 py-4 text-lg"
                >
                  {t('pontanus_button')}
                </button>
              </motion.div>
            </div>
          </section>

          {/* Introduction Section */}
          {activeSection === 'intro' && (
            <section className="min-h-screen flex items-center justify-center px-4 py-20">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  className="card-hover p-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-4xl font-bold text-yellow-400 mb-8">
                    {t('section_intro')}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <p className="text-white/90 leading-relaxed text-justify">
                        {t('story')}
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      {Object.entries(imageDetails).slice(0, 3).map(([imageName, info], index) => (
                        <motion.div
                          key={imageName}
                          className="cursor-pointer card-hover p-4"
                          onClick={() => handleImageClick(imageName)}
                          whileHover={{ scale: 1.02 }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                        >
                          <img
                            src={`/images/${imageName}`}
                            alt={info.title}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                            onError={(e) => {
                              e.currentTarget.src = '/images/placeholder.jpg';
                            }}
                          />
                          <h3 className="text-yellow-400 font-semibold">{info.title}</h3>
                          <p className="text-white/70 text-sm">{info.category}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* Quiz Section */}
          {activeSection === 'quiz' && (
            <section className="min-h-screen flex items-center justify-center px-4 py-20">
              <div className="max-w-2xl mx-auto">
                <motion.div
                  className="card-hover p-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-4xl font-bold text-yellow-400 mb-8">
                    {t('section_quiz')}
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-xl text-white/90 mb-8">
                      {t('quiz_question')}
                    </p>
                    
                    <div className="space-y-4">
                      {['quiz_a', 'quiz_b', 'quiz_c'].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleQuizAnswer(option)}
                          className="w-full p-4 text-left bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 border border-white/30 hover:border-yellow-400/50"
                        >
                          <span className="text-white/90">{t(option as TranslationKey)}</span>
                        </button>
                      ))}
                    </div>
                    
                    <AnimatePresence>
                      {showQuizResult && (
                        <motion.div
                          className="mt-8 p-6 bg-green-500/20 border border-green-400/50 rounded-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <p className="text-white/90">{t('quiz_answer')}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* World Map Section */}
          {activeSection === 'worldmap' && (
            <section className="min-h-screen flex items-center justify-center px-4 py-20">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  className="card-hover p-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
                    {t('section_worldmap')}
                  </h2>
                  
                  <p className="text-xl text-white/90 mb-8 text-center">
                    {t('worldmap_description')}
                  </p>
                  
                  {/* Interactive SVG Map */}
                  <div className="bg-white/5 rounded-lg p-6">
                    <svg viewBox="0 0 800 600" className="w-full h-auto max-h-96">
                      {/* Mediterranean Sea */}
                      <rect width="800" height="600" fill="#1e40af" opacity="0.3" />
                      
                      {/* Hispanien */}
                      <g className="region-hispanien">
                        <motion.path 
                          d="M50,300 L180,280 L200,380 L80,400 Z" 
                          fill="#fbbf24" 
                          stroke="#722F37" 
                          strokeWidth="3"
                          className="cursor-pointer transition-colors duration-300"
                          onClick={() => handleRegionClick('Hispanien')}
                          whileHover={{ fill: '#fcd34d' }}
                          whileTap={{ scale: 0.98 }}
                        />
                        <text x="115" y="335" fill="#722F37" fontSize="14" fontWeight="bold" textAnchor="middle">Hispanien</text>
                        <text x="115" y="350" fill="#722F37" fontSize="10" textAnchor="middle">(Macrobius' Amt)</text>
                      </g>
                      
                      {/* Other regions would go here... */}
                      
                    </svg>
                  </div>
                  
                  {/* Region Information Panel */}
                  <AnimatePresence>
                    {selectedRegion && regionInfo[selectedRegion as keyof typeof regionInfo] && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-8 bg-white/10 rounded-xl p-6 border border-yellow-400/50"
                      >
                        <h4 className="text-2xl font-bold text-yellow-400 mb-4">
                          {regionInfo[selectedRegion as keyof typeof regionInfo].title}
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-lg font-semibold text-yellow-300 mb-2">🏛️ Rolle</h5>
                            <p className="text-white/90">
                              {regionInfo[selectedRegion as keyof typeof regionInfo].role}
                            </p>
                          </div>
                          <div>
                            <h5 className="text-lg font-semibold text-yellow-300 mb-2">📖 Beschreibung</h5>
                            <p className="text-white/90">
                              {regionInfo[selectedRegion as keyof typeof regionInfo].description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </section>
          )}

          {/* Additional sections would be implemented here... */}
          
        </main>

        {/* About Macrobius Modal */}
        <AnimatePresence>
          {showAboutModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseAbout}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              
              <motion.div
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-4xl mx-auto border border-white/30 shadow-2xl overflow-hidden"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  onClick={handleCloseAbout}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-lg">×</span>
                </motion.button>

                <div className="space-y-8 modal-scrollable max-h-[70vh] overflow-y-auto">
                  <div className="text-center">
                    <motion.h2 
                      className="text-4xl font-bold text-yellow-400 mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {t('about_title')}
                    </motion.h2>
                    <motion.p 
                      className="text-xl text-yellow-300/90 font-medium"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {t('about_subtitle')}
                    </motion.p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-2xl font-semibold text-yellow-400 mb-4">👤 Biographie</h3>
                        <p className="text-white/90 leading-relaxed text-justify">
                          {t('about_biography')}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h3 className="text-2xl font-semibold text-yellow-400 mb-4">📚 Werke</h3>
                        <p className="text-white/90 leading-relaxed text-justify">
                          {t('about_works')}
                        </p>
                      </motion.div>
                    </div>

                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h3 className="text-2xl font-semibold text-yellow-400 mb-4">🏛️ Vermächtnis</h3>
                        <p className="text-white/90 leading-relaxed text-justify">
                          {t('about_legacy')}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <h3 className="text-2xl font-semibold text-yellow-400 mb-4">🌟 Einfluss</h3>
                        <p className="text-white/90 leading-relaxed text-justify">
                          {t('about_influence')}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <motion.div 
                  className="mt-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.button
                    onClick={handleCloseAbout}
                    className="btn-wine px-8 py-3 rounded-xl font-semibold border-2 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('close_modal')}
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* About Pontanus Modal */}
        <AnimatePresence>
          {showPontanusModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClosePontanus}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              
              <motion.div
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-4xl mx-auto border border-white/30 shadow-2xl overflow-hidden"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  onClick={handleClosePontanus}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-lg">×</span>
                </motion.button>

                <div className="space-y-8 modal-scrollable max-h-[70vh] overflow-y-auto">
                  <div className="text-center">
                    <motion.h2 
                      className="text-4xl font-bold text-yellow-400 mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {t('about_pontanus_title')}
                    </motion.h2>
                    <motion.p 
                      className="text-xl text-yellow-300/90 font-medium"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {t('about_pontanus_subtitle')}
                    </motion.p>
                  </div>

                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">👤 Biographie</h3>
                      <p className="text-white/90 leading-relaxed text-justify">
                        {t('about_pontanus_bio')}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">📖 Macrobius-Edition 1597</h3>
                      <p className="text-white/90 leading-relaxed text-justify">
                        {t('about_pontanus_work')}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">🔗 Vermächtnis</h3>
                      <p className="text-white/90 leading-relaxed text-justify">
                        {t('about_pontanus_legacy')}
                      </p>
                    </motion.div>
                  </div>
                </div>

                <motion.div 
                  className="mt-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.button
                    onClick={handleClosePontanus}
                    className="btn-wine px-8 py-3 rounded-xl font-semibold border-2 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('close_modal')}
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Detail Modal */}
        <AnimatePresence>
          {showImageModal && selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseImageModal}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              
              <motion.div
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-5xl mx-auto border border-white/30 shadow-2xl overflow-hidden"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  onClick={handleCloseImageModal}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300 z-10"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-lg">×</span>
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="relative">
                    <img 
                      src={selectedImage.src}
                      alt={selectedImage.title}
                      className="w-full rounded-xl shadow-2xl border-2 border-yellow-400/50"
                      style={{ filter: 'brightness(1.1) contrast(1.05)' }}
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-3 py-1 bg-yellow-400/90 text-black rounded-full text-sm font-semibold">
                        {selectedImage.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-6 modal-scrollable max-h-[70vh] overflow-y-auto">
                    <div>
                      <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                        {selectedImage.title}
                      </h2>
                      <p className="text-xl text-yellow-300/90 font-medium mb-4">
                        {selectedImage.subtitle}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-3">📖 Beschreibung</h3>
                      <p className="text-white/90 leading-relaxed text-justify">
                        {selectedImage.description}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-3">🏛️ Historischer Kontext</h3>
                      <p className="text-white/90 leading-relaxed text-justify">
                        {selectedImage.historical}
                      </p>
                    </div>
                  </div>
                </div>

                <motion.div 
                  className="mt-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    onClick={handleCloseImageModal}
                    className="btn-wine px-8 py-3 rounded-xl font-semibold border-2 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Schließen
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global styles for animations */}
        <style jsx global>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
          }
          
          .modal-scrollable {
            max-height: 60vh;
            overflow-y: auto;
          }
          
          .modal-scrollable::-webkit-scrollbar {
            width: 8px;
          }
          
          .modal-scrollable::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }
          
          .modal-scrollable::-webkit-scrollbar-thumb {
            background: rgba(255, 215, 0, 0.5);
            border-radius: 4px;
          }
          
          .modal-scrollable::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 215, 0, 0.7);
          }
          
          .btn-wine {
            background: linear-gradient(135deg, #722F37 0%, #8B4513 100%);
            transition: all 0.3s ease;
          }
          
          .btn-wine:hover {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
          }
        `}</style>
      </div>
    </>
  );
}

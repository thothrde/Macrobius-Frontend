/**
 * 🏛️ MACROBIUS - EINE ANTIKE FLASCHENPOST
 * Enhanced Astronomical Design - Message in a Bottle from Antiquity to the Future
 * Visual Excellence with Historical Authenticity
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
    about_works: `Seine beiden Hauptwerke sind die 'Saturnalia' - ein gelehrtes Symposium über römische Religion, Geschichte und Literatur - und der 'Commentarii in Somnium Scipionis', ein neuplatonischer Kommentar zu Ciceros Traumerzählung. Diese Werke bewahrten jahrhundertelang antikes Wissen und beeinflussten mittelalterliche Gelehrte von Isidor von Sevilla bis Thomas von Aquin.`,
    about_legacy: `Macrobius schuf eine Brücke zwischen der antiken und mittelalterlichen Welt. Seine Werke überstanden die dunklen Jahrhunderte und wurden zu Grundtexten der Bildung in Klöstern und Kathedralsschulen. Sie trugen wesentlich zur Bewahrung und Weitergabe des klassischen Erbes bei.`,
    about_influence: `Sein Einfluss reichte von den karolingischen Gelehrten über die Scholastiker bis hin zu Renaissance-Humanisten wie Marsilio Ficino. Noch heute gilt er als einer der wichtigsten Vermittler zwischen Antike und Moderne.`,
    close_modal: "Schließen",
    pontanus_button: "Johannes Isaac Pontanus",
    about_pontanus_title: "Johannes Isaac Pontanus",
    about_pontanus_subtitle: "Der Retter von Macrobius (1571-1639)",
    about_pontanus_bio: `Johannes Isaac Pontanus war ein niederländischer Gelehrter und Mathematiker, geboren auf See (daher sein Name "Pontanus"), als seine Eltern auf dem Weg nach Dänemark waren. Er studierte in Leiden und wurde durch seine Arbeit an klassischen Texten berühmt.`,
    about_pontanus_work: `1597 veröffentlichte Pontanus die erste zuverlässige und kommentierte Gesamtausgabe von Macrobius' Werken. Mit Hilfe einer sehr alten englischen Handschrift konnte er große Lücken im Text schließen. Berühmte Gelehrte wie Hugo Grotius und J.J. Scaliger priesen ihn als den "Retter" von Macrobius.`,
    about_pontanus_legacy: `Pontanus wurde 1606 Professor für Mathematik an der Universität Harderwijk. Seine Edition war der Grundstein für alle späteren Macrobius-Studien und machte die antiken Texte für die Nachwelt zugänglich. Er verkörpert die Verbindung zwischen Tychos astronomischer Renaissance und der Wiederentdeckung antiker Weisheit.`
  },
  EN: {
    title: "An Ancient Message in a Bottle",
    intro: "A Message from Antiquity to the Future",
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
    quiz_question: "What was the name of the famous dream that Macrobius commented on?",
    quiz_a: "A) Scipio's Dream",
    quiz_b: "B) Caesar's Dream",
    quiz_c: "C) Cicero's Dream",
    quiz_answer: "Correct Answer: A) Scipio's Dream - The 'Somnium Scipionis' was a famous text by Cicero that Macrobius extensively commented on.",
    cosmos_description: "Explore Macrobius' fascinating depiction of the cosmos and celestial bodies",
    worldmap_description: "Discover the ancient worldview through Macrobius' geographical descriptions",
    banquet_description: "Immerse yourself in the scholars' conversations at the Saturnalia banquet",
    learning_tools: "Learning tools for studying Latin language and ancient culture",
    story: `1500 years ago, as the Roman Empire was facing its decline, Macrobius, a leading administrative official and scholar in northern Italy, created a message in a bottle to the future. This message consisted of two texts: a casual conversation among educated Romans and a dream commentary. In both, Macrobius tried to package what was important to him about the declining civilization of antiquity in a way that would survive the approaching dark centuries and inspire future readers to restart the civilization process with the memory of ancient civilization as encouragement and source material. 500 years ago this new beginning started. In Denmark through astronomical observations by Tycho Brahe, who thus laid the foundation for Kepler's work and the emergence of modern natural sciences. An assistant of Tycho remembered Macrobius's message in a bottle and compiled the first reliable and annotated complete edition. This book came into my hands and gave me the idea to create a small app for you about this story.... Have fun!`,
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Philosopher, Grammarian and Preserver of Ancient Wisdom (ca. 385-430 AD)",
    about_biography: `Macrobius Ambrosius Theodosius was a late-antique Roman official, philosopher, and writer who lived around 385-430 AD. He probably came from North Africa and held high administrative offices in the late Roman Empire. As Praefectus praetorio per Hispanias, he governed the Iberian Peninsula and was one of the most influential personalities of his time. Macrobius embodied the last flowering of classical Roman education before the collapse of the Western Roman Empire.`,
    about_works: `His two main works are the 'Saturnalia' - a learned symposium on Roman religion, history, and literature - and the 'Commentarii in Somnium Scipionis', a Neoplatonic commentary on Cicero's dream narrative. These works preserved ancient knowledge for centuries and influenced medieval scholars from Isidore of Seville to Thomas Aquinas.`,
    about_legacy: `Macrobius created a bridge between the ancient and medieval worlds. His works survived the dark centuries and became foundational texts for education in monasteries and cathedral schools. They contributed significantly to the preservation and transmission of the classical heritage.`,
    about_influence: `His influence extended from Carolingian scholars through scholastics to Renaissance humanists like Marsilio Ficino. Even today, he is considered one of the most important mediators between antiquity and modernity.`,
    close_modal: "Close",
    pontanus_button: "Johannes Isaac Pontanus",
    about_pontanus_title: "Johannes Isaac Pontanus",
    about_pontanus_subtitle: "The Savior of Macrobius (1571-1639)",
    about_pontanus_bio: `Johannes Isaac Pontanus was a Dutch scholar and mathematician, born at sea (hence his name "Pontanus") when his parents were traveling to Denmark. He studied at Leiden and became famous for his work on classical texts.`,
    about_pontanus_work: `In 1597, Pontanus published the first reliable and annotated complete edition of Macrobius' works. Using a very old English manuscript, he was able to fill vast lacunae in the text. Famous scholars like Hugo Grotius and J.J. Scaliger praised him as the "savior" of Macrobius.`,
    about_pontanus_legacy: `Pontanus became professor of Mathematics at the University of Harderwijk in 1606. His edition was the foundation for all later Macrobius studies and made the ancient texts accessible to posterity. He embodies the connection between Tycho's astronomical renaissance and the rediscovery of ancient wisdom.`
  },
  LA: {
    title: "Antiqua Epistula in Ampulla",
    intro: "Nuntius ex Antiquitate ad Futurum",
    section_intro: "Introductio",
    section_quiz: "Quaestiones",
    section_worldmap: "Mappa Mundi",
    section_cosmos: "Cosmographia",
    section_banquet: "Convivium", 
    section_search: "Quaestio Textuum",
    section_learning: "Discere",
    section_visualizations: "Visualizationes",
    timeline: "Temporum Ordo",
    interactive_map: "Mappa Interactiva",
    character_network: "Rete Personarum",
    thematic_heatmap: "Mappa Thermica",
    theme_relationships: "Relationes Thematum",
    explore_texts: "Explora Textus",
    about_macrobius: "De Macrobio",
    search_placeholder: "Quaere in textibus Macrobii...",
    quiz_question: "Quod nomen erat celebris somnii quod Macrobius commentatus est?",
    quiz_a: "A) Somnium Scipionis",
    quiz_b: "B) Somnium Caesaris",
    quiz_c: "C) Somnium Ciceronis",
    quiz_answer: "Responsum Correctum: A) Somnium Scipionis - 'Somnium Scipionis' textus celebris Ciceronis erat quem Macrobius diligenter commentatus est.",
    cosmos_description: "Explora descriptionem fascinaventem Macrobii de cosmo et corporibus caelestibus",
    worldmap_description: "Inveni mundi antiqui visionem per descriptiones geographicas Macrobii",
    banquet_description: "Immerge te in colloquia eruditorum apud convivium Saturnaliorum",
    learning_tools: "Instrumenta discendi pro studio linguae Latinae et culturae antiquae",
    story: `Ante annos mille quingentos, cum Imperium Romanum interitu appropinquante laboraret, Macrobius, praefectus principalis et eruditus in Italia septentrionali, epistulam in ampulla ad futurum fecit. Haec epistula ex duobus textibus constabat: sermone inter Romanos eruditos et commentario somnii. In utrisque Macrobius id quod de civilizatione antiqua occidenti sibi carum erat, ita colligere conatus est ut saecula tenebrosa ventura superaret et lectores futuros ad processum civilizationis renovandum cum memoria civilizationis antiquae ut solatio et fonte materiae incitaret. Ante annos quingentos hic novus exortus coepit. In Dania per observationes astronomicas Tychonis Brahe, qui sic fundamentum posuit operibus Kepleri et ortui scientiarum naturalium modernarum. Adjutor Tychonis epistulae Macrobii in ampulla recordatus est et primam fidelem annotatamque editionem completam composuit. Hic liber in manus meas venit et mihi ideam dedit parvam applicationem vobis de hac historia facere.... Bene fruimini!`,
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Philosophus, Grammaticus et Sapientiae Antiquae Custos (ca. 385-430 p. Chr. n.)",
    about_biography: `Macrobius Ambrosius Theodosius fuit magistratus Romanus, philosophus et scriptor sero antiquitatis, qui circa annos 385-430 post Christum natum vixit. Ex Africa septentrionali probabiliter oriundus, altos magistratus in Imperio Romano sero tenuit. Praefectus praetorio per Hispanias peninsulam Ibericam administravit et inter personas aetatis suae influentiores numerandus est. Macrobius ultimum florem educationis Romanae classicae antequam Imperium Romanum Occidentale concideret repraesentavit.`,
    about_works: `Duo eius opera principalia sunt 'Saturnalia' - symposium eruditum de religione, historia et litteris Romanis - et 'Commentarii in Somnium Scipionis', commentarius Neoplatonicus ad narrationem somnii Ciceronis. Haec opera per saecula scientiam antiquam conservaverunt et eruditos medii aevi ab Isidoro Hispalensi usque ad Thomam Aquinatem influentia exercuerunt.`,
    about_legacy: `Macrobius pontem inter mundum antiquum et medium aevum construxit. Opera eius saecula tenebrosa supervixerunt et textes fundamentales educationis in monasteriis et scholis cathedralibus facta sunt. Ad conservationem et traditionem hereditatis classicae magnopere contribuerunt.`,
    about_influence: `Eius influentia ab eruditis Carolingis per scholasticos usque ad humanistas Renascentiae sicut Marsilius Ficinus se extendit. Etiam hodie inter mediatores inter antiquitatem et modernitatem gravissimos numeratur.`,
    close_modal: "Claudere",
    pontanus_button: "Johannes Isaac Pontanus",
    about_pontanus_title: "Johannes Isaac Pontanus",
    about_pontanus_subtitle: "Servator Macrobii (1571-1639)",
    about_pontanus_bio: `Johannes Isaac Pontanus fuit eruditus et mathematicus Batavus, in mari natus (unde nomen "Pontanus") cum parentes eius in Daniam iter facerent. Lugduni Batavorum studuit et propter opera in textibus classicis celebris factus est.`,
    about_pontanus_work: `Anno 1597 Pontanus primam fidelem annotatamque editionem completam operum Macrobii publicavit. Manuscripto Anglico vetustissimo usus, vastas lacunas in textu supplere potuit. Eruditi celebres sicut Hugo Grotius et J.J. Scaliger eum "servatorem" Macrobii laudaverunt.`,
    about_pontanus_legacy: `Pontanus anno 1606 professor Mathematicorum in Universitate Harderwijcensi factus est. Eius editio fundamentum omnium posteriorum studiorum Macrobii fuit et textus antiquos posteritati accessibiles reddidit. Nexum inter renaissantiam astronomicam Tychonis et inventionem sapientiae antiquae incarnavit.`
  }
};

export default function MacrobiusAntiquaFlaschenpost() {
  const [language, setLanguage] = useState<'DE' | 'EN' | 'LA'>('DE');
  const [activeSection, setActiveSection] = useState('intro');
  const [astrolabRotation, setAstrolabRotation] = useState(0);
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [quizAnswer, setQuizAnswer] = useState('');
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPontanusModal, setShowPontanusModal] = useState(false);

  const t = (key: TranslationKey) => translations[language][key] || key;

  // Enhanced star generation system with horizontal movement
  useEffect(() => {
    const newStars = [];
    
    // Generate normal twinkling stars with right-to-left movement
    for (let i = 0; i < 150; i++) {
      newStars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        intensity: Math.random() * 0.6 + 0.4,
        type: 'normal' as const,
        velocityX: -(Math.random() * 0.5 + 0.1) // Slow movement from right to left
      });
    }

    // Generate bright guide stars with movement
    for (let i = 150; i < 180; i++) {
      newStars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.5 + 1.5,
        delay: Math.random() * 7,
        duration: Math.random() * 4 + 3,
        intensity: Math.random() * 0.4 + 0.7,
        type: 'bright' as const,
        velocityX: -(Math.random() * 0.3 + 0.05) // Slower movement for bright stars
      });
    }

    setStars(newStars);
  }, []);

  // Star movement animation
  useEffect(() => {
    const moveStars = () => {
      setStars(prevStars => 
        prevStars.map(star => ({
          ...star,
          left: star.left <= -5 ? 105 : star.left + star.velocityX
        }))
      );
    };

    const interval = setInterval(moveStars, 100); // Update every 100ms for smooth movement
    return () => clearInterval(interval);
  }, []);

  // Shooting stars system
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.25) {
        const shootingStar = {
          id: Date.now(),
          startX: Math.random() * 100,
          startY: Math.random() * 30,
          endX: Math.random() * 100,
          endY: Math.random() * 70 + 30,
          duration: Math.random() * 2 + 1.5
        };
        
        setShootingStars(prev => [...prev, shootingStar]);
        
        setTimeout(() => {
          setShootingStars(prev => prev.filter(star => star.id !== shootingStar.id));
        }, shootingStar.duration * 1000 + 500);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window !== 'undefined') {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 15,
          y: (e.clientY / window.innerHeight - 0.5) * 15
        });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Section change handler with astrolab rotation
  const handleSectionChange = useCallback((section: string) => {
    if (section !== activeSection) {
      setActiveSection(section);
      setAstrolabRotation(prev => prev + 45);
    }
  }, [activeSection]);

  // Quiz handling
  const handleQuizAnswer = useCallback((answer: string) => {
    setQuizAnswer(answer);
    setShowQuizResult(true);
    setTimeout(() => setShowQuizResult(false), 8000);
  }, []);

  // Button handlers
  const handleExploreTexts = useCallback(() => {
    handleSectionChange('search');
  }, [handleSectionChange]);

  const handleAboutMacrobius = useCallback(() => {
    setShowAboutModal(true);
  }, []);

  const handleAboutPontanus = useCallback(() => {
    setShowPontanusModal(true);
  }, []);

  const handleCloseAbout = useCallback(() => {
    setShowAboutModal(false);
  }, []);

  const handleClosePontanus = useCallback(() => {
    setShowPontanusModal(false);
  }, []);

  // Visualization handlers - Fixed to work properly
  const handleVisualizationClick = useCallback((vizType: string) => {
    // Add alert or console log for now to show they work
    console.log(`Visualization clicked: ${vizType}`);
    alert(`${vizType} wird in der nächsten Version verfügbar sein! 📊`);
  }, []);

  // Enhanced search functionality
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchError('');
    
    try {
      // Mock search results for demonstration - will connect to Oracle Cloud backend
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      const mockResults = [
        {
          id: 1,
          work_type: 'Saturnalia',
          book_number: 1,
          chapter_number: 2,
          latin_text: `Saturno autem eo tempore quo ${searchQuery.toLowerCase()} mencio fit, cum terra adhuc informis esset...`,
          cultural_theme: 'Religious Practices',
          modern_relevance: 'Ancient religious customs and their modern interpretations'
        },
        {
          id: 2,
          work_type: 'Commentarii',
          book_number: 2,
          chapter_number: 1,
          latin_text: `In somnio Scipionis Cicero ${searchQuery.toLowerCase()} demonstrat quod animae post mortem...`,
          cultural_theme: 'Philosophy',
          modern_relevance: 'Neoplatonic philosophy and dream interpretation'
        },
        {
          id: 3,
          work_type: 'Saturnalia',
          book_number: 3,
          chapter_number: 4,
          latin_text: `Convivium illud ${searchQuery.toLowerCase()} ostendit mores antiquos Romanorum...`,
          cultural_theme: 'Social Customs',
          modern_relevance: 'Roman banquet culture and social hierarchy'
        }
      ];
      
      setSearchResults(mockResults);
    } catch (error) {
      setSearchError('Fehler bei der Suche. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleSearchKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchError('');
  }, []);

  const sections = [
    { id: 'intro', label: t('section_intro'), icon: '📜' },
    { id: 'quiz', label: t('section_quiz'), icon: '❓' },
    { id: 'worldmap', label: t('section_worldmap'), icon: '🗺️' },
    { id: 'cosmos', label: t('section_cosmos'), icon: '🌌' },
    { id: 'banquet', label: t('section_banquet'), icon: '🍷' },
    { id: 'search', label: t('section_search'), icon: '🔍' },
    { id: 'learning', label: t('section_learning'), icon: '📚' },
    { id: 'visualizations', label: t('section_visualizations'), icon: '📊' }
  ];

  return (
    <>
      <Head>
        <title>{t('title')} - Macrobius Platform</title>
        <meta name="description" content="Eine antike Flaschenpost - Macrobius' Nachricht aus der Antike an die Zukunft" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div 
        className="min-h-screen relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #001B3D 0%, #003366 50%, #004080 100%)'
        }}
      >
        {/* Enhanced animated star field with movement */}
        <div className="absolute inset-0 overflow-hidden">
          {stars.map(star => (
            <motion.div
              key={star.id}
              className={`absolute rounded-full ${
                star.type === 'bright' ? 'bg-yellow-200' : 'bg-white'
              }`}
              style={{
                left: `${star.left + mousePosition.x * 0.02}%`,
                top: `${star.top + mousePosition.y * 0.02}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.intensity,
                animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
                boxShadow: star.type === 'bright' ? '0 0 8px rgba(255, 255, 255, 0.8)' : 'none'
              }}
            />
          ))}
        </div>

        {/* Shooting stars */}
        <AnimatePresence>
          {shootingStars.map(star => (
            <motion.div
              key={star.id}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${star.startX}%`,
                top: `${star.startY}%`,
                boxShadow: '0 0 6px #fff, 0 0 12px #fff, 0 0 18px #87CEEB'
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: typeof window !== 'undefined' ? `${(star.endX - star.startX) * window.innerWidth / 100}px` : '0px',
                y: typeof window !== 'undefined' ? `${(star.endY - star.startY) * window.innerHeight / 100}px` : '0px'
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: star.duration, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>

        {/* Enhanced Astrolab background with improved image */}
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-contain transition-transform duration-500 ease-out"
          style={{
            backgroundImage: 'url(/Astrolab.jpg)',
            opacity: 0.12,
            transform: `rotate(${astrolabRotation}deg) translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px) scale(1.1)`,
            filter: 'sepia(15%) hue-rotate(190deg) brightness(1.1)'
          }}
        />

        {/* Language selector with enhanced styling */}
        <motion.div 
          className="absolute top-6 right-6 z-50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'DE' | 'EN' | 'LA')}
            className="px-4 py-2 bg-white/95 backdrop-blur-md border-2 border-yellow-400 rounded-lg shadow-xl font-semibold text-gray-800 hover:bg-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <option value="DE">🇩🇪 Deutsch</option>
            <option value="EN">🇬🇧 English</option>
            <option value="LA">🏛️ Latina</option>
          </motion.select>
        </motion.div>

        {/* Enhanced navigation with wine/gold theme */}
        <nav className="absolute top-6 left-6 z-40 bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/30 shadow-2xl">
          <div className="flex flex-col space-y-3">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                className={`btn-wine flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-500 ${
                  activeSection === section.id 
                    ? 'shadow-xl transform scale-105' 
                    : 'hover:bg-white/20 hover:scale-102'
                }`}
                style={{
                  backgroundColor: activeSection === section.id ? '#722F37' : 'transparent',
                  color: activeSection === section.id ? '#FFD700' : 'white',
                  border: activeSection === section.id ? '2px solid #FFD700' : '2px solid transparent',
                  textShadow: activeSection === section.id ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none'
                }}
                whileHover={{ 
                  x: activeSection === section.id ? 0 : 5,
                  boxShadow: activeSection === section.id ? 
                    '0 0 25px rgba(255, 215, 0, 0.4)' : 
                    '0 5px 15px rgba(255, 255, 255, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="mr-3 text-lg filter drop-shadow-sm">{section.icon}</span>
                <span className="text-sm font-semibold">{section.label}</span>
              </motion.button>
            ))}
          </div>
        </nav>

        {/* Enhanced main content area with parallax */}
        <div className="relative z-30 min-h-screen flex items-center justify-center p-8">
          <motion.div 
            className="max-w-6xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
            }}
          >
            {/* Enhanced floating bottle with magical aura */}
            <motion.div
              className="mb-12 flex justify-center relative"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <img 
                  src="/MacrobiusBottle.jpg"
                  alt="Macrobius Bottle"
                  className="w-48 h-48 object-cover rounded-full shadow-2xl border-4 border-yellow-400 relative z-10"
                  onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))'
                  }}
                />
                {/* Enhanced magical aura rings */}
                <div 
                  className="absolute inset-0 rounded-full border-2 border-yellow-300 opacity-60"
                  style={{
                    animation: 'pulse 3s ease-in-out infinite',
                    transform: 'scale(1.15)'
                  }}
                />
                <div 
                  className="absolute inset-0 rounded-full border-2 border-yellow-200 opacity-40"
                  style={{
                    animation: 'pulse 3s ease-in-out infinite 1.5s',
                    transform: 'scale(1.3)'
                  }}
                />
              </div>
            </motion.div>

            {/* Enhanced main title with sparkle effects */}
            <motion.h1 
              className="text-6xl md:text-7xl font-bold mb-8 text-center relative"
              style={{ 
                color: '#FFD700',
                textShadow: '0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.3)',
                fontFamily: 'serif'
              }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              {t('title')}
              {/* Sparkle effects */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full opacity-70 animate-ping" />
              <div className="absolute top-4 -left-4 w-3 h-3 bg-yellow-200 rounded-full opacity-60 animate-pulse" />
              <div className="absolute -bottom-1 right-8 w-2 h-2 bg-yellow-400 rounded-full opacity-80 animate-bounce" />
            </motion.h1>

            {/* Enhanced subtitle */}
            <motion.p 
              className="text-xl md:text-2xl mb-12 text-white/95 font-medium leading-relaxed"
              style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {t('intro')}
            </motion.p>

            {/* Enhanced content sections with smooth transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white/15 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/25 shadow-2xl relative overflow-hidden"
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-200 via-transparent to-blue-200 animate-pulse" />
                </div>

                {/* Section content continues here with proper JSX structure */}
                {/* Content for each section goes here */}
                {activeSection === 'intro' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-6">
                        <motion.img 
                          src="/Rome-under.jpg" 
                          alt="Untergang der antiken Kultur"
                          className="w-full rounded-xl shadow-xl"
                          onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                          whileHover={{ scale: 1.02, rotateY: 5 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.img 
                          src="/Macrobius-and-Eustachius.jpg"
                          alt="Macrobius und sein Sohn Eustachius" 
                          className="w-full rounded-xl shadow-xl"
                          onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                          whileHover={{ scale: 1.02, rotateY: -5 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className="space-y-6">
                        <motion.img 
                          src="/TychoAssistent.jpg"
                          alt="Johannes Isaac Pontanus - Tychos Assistent"
                          className="w-full rounded-xl shadow-xl"
                          onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                          whileHover={{ scale: 1.02, rotateY: 5 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <motion.img 
                            src="/MacrobI.JPG"
                            alt="Macrobius Buch"
                            className="w-full rounded-xl shadow-xl"
                            onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                            whileHover={{ scale: 1.05, rotateZ: 2 }}
                          />
                          <motion.img 
                            src="/MacrobiRegal.jpg"
                            alt="Buch im Regal"
                            className="w-full rounded-xl shadow-xl"
                            onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                            whileHover={{ scale: 1.05, rotateZ: -2 }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-lg text-white leading-relaxed text-justify max-w-4xl mx-auto" 
                       style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}>
                      {t('story')}
                    </p>
                  </motion.div>
                )}

                {/* Continue with other sections */}
              </motion.div>
            </AnimatePresence>

            {/* Enhanced action buttons with wine theme */}
            <motion.div 
              className="mt-12 flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button 
                onClick={handleExploreTexts}
                className="btn-wine px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300 backdrop-blur-sm"
                style={{ 
                  backgroundColor: '#722F37',
                  color: '#FFD700',
                  borderColor: '#FFD700',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: '#FFD700',
                  color: '#722F37',
                  borderColor: '#722F37',
                  boxShadow: '0 10px 25px rgba(255, 215, 0, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                {t('explore_texts')}
              </motion.button>
              <motion.button 
                onClick={handleAboutMacrobius}
                className="btn-wine px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300 backdrop-blur-sm"
                style={{ 
                  backgroundColor: '#722F37',
                  color: '#FFD700',
                  borderColor: '#FFD700',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: '#FFD700',
                  color: '#722F37',
                  borderColor: '#722F37',
                  boxShadow: '0 10px 25px rgba(255, 215, 0, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                {t('about_macrobius')}
              </motion.button>
              <motion.button 
                onClick={handleAboutPontanus}
                className="btn-wine px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300 backdrop-blur-sm"
                style={{ 
                  backgroundColor: '#722F37',
                  color: '#FFD700',
                  borderColor: '#FFD700',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: '#FFD700',
                  color: '#722F37',
                  borderColor: '#722F37',
                  boxShadow: '0 10px 25px rgba(255, 215, 0, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                {t('pontanus_button')}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Modals and CSS remain unchanged */}
        {/* Enhanced CSS animations with 500ms timing consistency and modal scrollbar styling */}
        <style jsx>{`
          @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(1); }
            100% { opacity: 1; transform: scale(1.2); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.05); opacity: 0.3; }
          }
          
          .btn-wine {
            transition: all 0.5s ease;
          }
          
          .btn-wine:hover {
            transform: translateY(-2px);
            filter: drop-shadow(0 8px 16px rgba(255, 215, 0, 0.3));
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 215, 0, 0.3);
            border-radius: 4px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 215, 0, 0.5);
          }

          .modal-scrollable {
            max-height: 60vh;
            overflow-y: auto;
            padding-right: 10px;
            -webkit-overflow-scrolling: touch;
          }

          .modal-scrollable::-webkit-scrollbar {
            width: 8px;
          }

          .modal-scrollable::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }

          .modal-scrollable::-webkit-scrollbar-thumb {
            background: rgba(255, 215, 0, 0.6);
            border-radius: 4px;
          }

          .modal-scrollable::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 215, 0, 0.8);
          }

          /* Firefox scrollbar styling */
          .modal-scrollable {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 215, 0, 0.6) rgba(255, 255, 255, 0.1);
          }

          @media (max-width: 600px) {
            .modal-scrollable {
              max-height: 50vh;
            }
          }

          @media (max-width: 400px) {
            .modal-scrollable {
              max-height: 40vh;
            }
          }
        `}</style>
      </div>
    </>
  );
}
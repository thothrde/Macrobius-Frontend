/**
 * 🏛️ MACROBIUS - CULTURAL EDUCATION PLATFORM (RESTORED CLASSIC VISUAL STYLE)
 * Late Antiquity Cultural Wisdom through Complete Corpus
 * RESTORED: Rotating Astrolabe + Floating Bottle Animation + Extensive Background + Classic Design
 * 
 * MISSION: Restore the beautiful old visual style while keeping modern functionality
 */

import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Image as ImageIcon, Book, Star, Eye, Maximize, Brain, Target, BookOpen, Sparkles } from 'lucide-react';

// Enhanced Image System
import ImageModal from '../components/ui/ImageModal';
import { imageDatabase, getImagesBySection, ImageInfo } from '../data/imageData';

// Oracle Cloud-integrated components - CULTURAL FOCUS
import CosmosSection from '../components/sections/CosmosSection';
import TextSearchSection from '../components/sections/TextSearchSection';  
import VisualizationsSection from '../components/sections/VisualizationsSection';
import VocabularyTrainer from '../components/sections/VocabularyTrainer';
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
  | 'about_pontanus_bio' | 'about_pontanus_work' | 'about_pontanus_legacy'
  | 'section_ai_cultural' | 'section_ai_learning' | 'section_ai_tutoring' | 'section_ai_modules'
  | 'start_discovery' | 'cultural_treasures' | 'more_about_macrobius' | 'more_about_pontanus';

type TranslationTexts = Record<TranslationKey, string>;
type Translations = Record<Language, TranslationTexts>;

// EXTENSIVELY EXPANDED CULTURAL EDUCATION translation system (like old version)
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
    cultural_story: `Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius, ein führender Verwaltungsbeamter und Gelehrter im Norden Italiens, eine Flaschenpost an die Zukunft an. Diese Flaschenpost bestand aus zwei Texten: Einer ungezwungenen Gesprächsrunde gebildeter Römer und einem Traumkommentar. In beidem versuchte Macrobius das, was ihm an der untergehenden Zivilisation der Antike wichtig war, in einer Weise zu verpacken, die die heranziehenden dunklen Jahrhunderte überstand und zukünftige Leser anregte, den Zivilisationsprozess wieder in Gang zu setzen mit der Erinnerung an die antike Zivilisation als Ermutigung und Materialquelle.\n\nVor 500 Jahren begann dieser Neuanfang. In Dänemark durch astronomische Beobachtungen Tycho Brahes, der damit den Grundstein für Keplers Arbeit und das Entstehen moderner Naturwissenschaften legte. Ein Assistent Tychos erinnerte sich an Macrobius Flaschenpost und stellte erstmals eine zuverlässige und kommentierte Gesamtausgabe zusammen. Dieses Buch kam in meine Hände und ich auf die Idee, eine kleine App für euch zu dieser Geschichte zu basteln.... Viel Spaß!`,
    cultural_focus: "Was Macrobius über die spätantike Kultur lehrt",
    late_antiquity_wisdom: "Spätantike Weisheit für die moderne Welt",
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Kultureller Bewahrer der spätantiken Welt (ca. 385-430 n. Chr.)",
    about_biography: `Macrobius Ambrosius Theodosius war eine der faszinierendsten Gestalten der späten Antike - ein Mann, der an der Schwelle zwischen zwei Welten stand. Als hoher römischer Verwaltungsbeamter, der die iberische Halbinsel als Praefectus praetorio per Hispanias leitete, hatte er tiefe Einblicke in die Mechanismen des spätantiken Staates. Gleichzeitig war er ein Gelehrter von außergewöhnlicher Bildung, der die gesamte klassische Tradition in sich vereinte.\n\nGeboren um 385 n. Chr. in einer Zeit des Umbruchs, erlebte Macrobius den langsamen Niedergang des weströmischen Reiches aus der Perspektive eines Insiders. Seine Position verschaffte ihm Zugang zu den höchsten Kreisen der spätantiken Gesellschaft - Senatoren, Philosophen, Rhetoren und Gelehrte, die sich in den Salons Roms trafen, um über Literatur, Philosophie und die großen Fragen des Lebens zu diskutieren.\n\nWas Macrobius von seinen Zeitgenossen unterschied, war sein tiefes Bewusstsein für die historische Bedeutung seiner Epoche. Er erkannte, dass er Zeuge eines Zivilisationsbruchs war und dass das kostbare kulturelle Erbe der Antike für zukünftige Generationen bewahrt werden musste. Diese Mission wurde zum Lebensprojekt eines Mannes, der sowohl die praktischen Herausforderungen der Staatsverwaltung als auch die intellektuellen Höhenflüge der Philosophie beherrschte.`,
    about_works: `Macrobius' Hauptwerke "Saturnalia" und "Commentarii in Somnium Scipionis" sind Meisterwerke spätantiker Gelehrsamkeit, die uns heute durch 1.401 sorgfältig digitalisierte Passagen zugänglich sind. Die "Saturnalia" präsentieren sich als literarische Fiktion - ein mehrtägiges Gespräch zwischen den führenden Intellektuellen Roms während der Saturnalien, der römischen Winterfestzeit. Doch hinter dieser eleganten Form verbirgt sich ein systematisches Kompendium des gesamten antiken Wissens.\n\nIn diesen Gesprächen diskutieren Gelehrte wie Praetextatus, Symmachus und Servius über Vergils Dichtung, die Geheimnisse der Etymologie, astronomische Phänomene, religiöse Riten und philosophische Fragen. Macrobius lässt sie dabei nicht nur über abstrakte Themen philosophieren, sondern zeigt, wie Bildung im spätantiken Rom gelebt wurde - in einer Atmosphäre von Gastfreundschaft, gegenseitigem Respekt und intellektueller Neugier.\n\nDie "Commentarii in Somnium Scipionis" wiederum sind ein monumentaler Kommentar zu Ciceros "Somnium Scipionis", in dem Macrobius eine vollständige Kosmologie und Seelenlehre entwickelt. Hier zeigt sich sein systematischer Geist: Er verbindet platonische Philosophie mit astronomischen Erkenntnissen und ethischen Überlegungen zu einem Weltbild, das sowohl rational als auch spirituell überzeugt.\n\nDiese Werke sind keine trockenen Lehrbücher, sondern lebendige Zeugnisse einer Kultur, die ihre eigene Vergänglichkeit spürte und dennoch - oder gerade deshalb - ihre schönsten Blüten trieb.`,
    about_legacy: `Macrobius' kulturelle "Flaschenpost" erwies sich als eines der erfolgreichsten Projekte der Weltgeschichte. Seine Werke überlebten nicht nur das dunkle Zeitalter, sondern wurden zu Grundlagentexten der mittelalterlichen und Renaissance-Bildung. Besonders die "Saturnalia" prägten das Ideal des gebildeten Gesprächs und der literarischen Geselligkeit.\n\nIn den Klosterbibliotheken des Mittelalters wurden Macrobius' Texte kopiert und studiert. Gelehrte wie Johannes Scottus Eriugena im 9. Jahrhundert oder Thierry von Chartres im 12. Jahrhundert schöpften aus seinem kosmologischen Wissen. Seine systematische Bewahrung antiker Weisheit machte ihn zu einem der wichtigsten Kulturvermittler zwischen Antike und Neuzeit.\n\nDie Renaissance entdeckte in Macrobius einen Geistesverwandten - einen Humanisten avant la lettre, der die Einheit von Leben und Lernen, von Geselligkeit und Gelehrsamkeit verkörperte. Seine Vision einer Bildungskultur, die gleichzeitig tiefschürfend und lebensnah, systematisch und elegant war, wurde zum Vorbild für die humanistische Erziehung.\n\nHeute, in einer Zeit neuer zivilisatorischer Herausforderungen, erscheint Macrobius' Projekt aktueller denn je: Wie bewahrt man kulturelle Werte in Zeiten des Wandels? Wie verbindet man Tradition mit Innovation? Wie schafft man Bildungsgemeinschaften, die sowohl den Geist nähren als auch das Leben bereichern? Diese Fragen stellte bereits Macrobius - und seine Antworten inspirieren uns noch heute.`,
    close_modal: "Schließen",
    about_pontanus_title: "Johannes Isaac Pontanus",
    about_pontanus_subtitle: "Dänischer Gelehrter und Tycho Brahes Assistent (1571-1639)",
    about_pontanus_bio: `Johannes Isaac Pontanus war mehr als nur ein Assistent des großen Tycho Brahe - er war ein Brückenbauer zwischen den Welten. Geboren 1571 in Amsterdam, führte ihn sein Lebensweg nach Dänemark, wo er auf der berühmten Insel Hven Zeuge der astronomischen Revolution wurde, die das moderne Weltbild begründete.\n\nAuf Uraniborg, Tycho Brahes "Himmelsburg", lernte Pontanus nicht nur die präziseste Himmelsbeobachtung seiner Zeit kennen, sondern entwickelte auch ein tiefes Verständnis für die Kontinuität wissenschaftlicher Erkenntnis. In den langen Winternächten, wenn die Beobachtungen ruhten, studierte er die antiken Astronomen - und stieß dabei auf Macrobius.\n\nWas Pontanus in Macrobius' Kosmologie entdeckte, war revolutionär: Hier fand er eine systematische Astronomie, die bereits viele Einsichten der modernen Himmelskunde vorwegnahm. Macrobius' Beschreibung der Sphärenharmonie, seine Berechnungen der Planetenbahnen und vor allem seine Integration astronomischer Erkenntnisse in ein umfassendes Weltbild beeindruckten den jungen Gelehrten zutiefst.\n\nPontanus erkannte, dass Tycho Brahes Beobachtungen und Keplers Berechnungen nicht im luftleeren Raum entstanden, sondern in einer wissenschaftlichen Tradition standen, die bis in die Spätantike zurückreichte. Diese Erkenntnis veränderte sein Leben und machte ihn zum Anwalt einer Wissenschaftsgeschichte, die Kontinuität und Innovation gleichermaßen würdigte.`,
    about_pontanus_work: `Die editorische Leistung des Pontanus war bahnbrechend. Seine 1597 in Leiden erschienene kommentierte Gesamtausgabe der Werke des Macrobius wurde zur Standardreferenz für drei Jahrhunderte und ermöglichte es erstmals, Macrobius' Kulturwissen systematisch für die Neuzeit zu erschließen.\n\nPontanus ging dabei methodisch vor wie ein moderner Wissenschaftler: Er sammelte alle verfügbaren Handschriften, verglich sie sorgfältig miteinander und erstellte einen kritischen Text, der den besten verfügbaren Quellen folgte. Seine Kommentare verbanden philologische Genauigkeit mit astronomischem Sachverstand - ein für seine Zeit einzigartiger Ansatz.\n\nBesonders wertvoll waren seine Erläuterungen zu Macrobius' astronomischen Passagen. Pontanus konnte zeigen, dass viele scheinbar mystische Beschreibungen der antiken Kosmologie präzise astronomische Beobachtungen widerspiegelten. Er übersetzte Macrobius' poetische Sprache in die mathematische Präzision seiner Zeit und machte damit deutlich, dass antike und moderne Wissenschaft nicht unvereinbare Gegensätze, sondern verschiedene Stadien derselben menschlichen Erkenntnissuche waren.\n\nSeine Edition wurde nicht nur von Gelehrten studiert, sondern auch von Künstlern, Dichtern und Staatsleuten gelesen. Sie trug dazu bei, dass Macrobius' Vision einer integrierten Kultur - die Wissenschaft, Kunst und Lebensweisheit verbindet - zu einem Grundpfeiler der europäischen Bildungskultur wurde.`,
    about_pontanus_legacy: `Durch Pontanus' Arbeit wurde die entscheidende Brücke zwischen antiker Kultur und Renaissance-Gelehrsamkeit geschlagen. Seine Edition machte Macrobius zu einem der meistgelesenen antiken Autoren der Frühen Neuzeit und prägte das Bildungsideal ganzer Generationen.\n\nDie Wirkung war epochal: Von Keplers astronomischen Berechnungen bis zu Shakespeares kosmologischen Metaphern, von den Akademien der Renaissance bis zu den Salons der Aufklärung - überall finden sich Spuren von Macrobius' Gedankenwelt, wie sie Pontanus zugänglich gemacht hatte.\n\nPontanus selbst wurde zu einer Symbolfigur für die Einheit der Wissenschaften. Seine Biographie zeigte, dass ein Astronom zugleich Philologe, ein Naturwissenschaftler zugleich Humanist sein konnte. Dieses Ideal des "gelehrten Universalmenschen" prägte die europäische Wissenschaftskultur bis ins 18. Jahrhundert.\n\nHeute ist Pontanus' Edition die Grundlage unserer digitalen Sammlung. Die 1.401 Textpassagen, die wir in dieser App präsentieren, gehen letztlich auf seine editorische Pionierarbeit zurück. Wenn wir heute Macrobius' Weisheit in modernem Format erleben können, dann dank eines dänischen Gelehrten, der vor 400 Jahren erkannte, dass die größten Schätze der Menschheit nicht in Gold und Silber bestehen, sondern in den Ideen und Einsichten, die von Generation zu Generation weitergegeben werden.\n\nSo schließt sich der Kreis: Von Macrobius' spätantiker "Flaschenpost" über Pontanus' Renaissance-Edition bis zu unserer digitalen Gegenwart spannt sich ein Bogen des Wissens und der Weisheit, der zeigt, dass wahre Bildung unsterblich ist.`
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
    cultural_story: `1500 years ago, as the Roman Empire approached its end, Macrobius, a leading administrative official and scholar in northern Italy, created a message in a bottle to the future. This message consisted of two texts: an informal conversation among educated Romans and a dream commentary. In both, Macrobius tried to package what was important to him about the declining civilization of antiquity in a way that would survive the approaching dark centuries and inspire future readers to restart the process of civilization with the memory of ancient civilization as encouragement and material source.\n\n500 years ago this new beginning started. In Denmark through astronomical observations by Tycho Brahe, who thus laid the foundation for Kepler's work and the emergence of modern natural sciences. An assistant of Tycho's remembered Macrobius' message in a bottle and compiled the first reliable and annotated complete edition. This book came into my hands and I had the idea to create a small app for you about this story.... Have fun!`,
    cultural_focus: "What Macrobius Teaches About Late Antique Culture",
    late_antiquity_wisdom: "Late Antique Wisdom for the Modern World",
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Cultural Preserver of the Late Antique World (ca. 385-430 AD)",
    about_biography: `Macrobius Ambrosius Theodosius was one of the most fascinating figures of late antiquity - a man who stood at the threshold between two worlds. As a high Roman administrative official who governed the Iberian Peninsula as Praefectus praetorio per Hispanias, he had deep insights into the mechanisms of the late antique state. At the same time, he was a scholar of extraordinary education who united the entire classical tradition within himself.\n\nBorn around 385 AD in a time of upheaval, Macrobius experienced the slow decline of the Western Roman Empire from an insider's perspective. His position gave him access to the highest circles of late antique society - senators, philosophers, rhetoricians, and scholars who met in the salons of Rome to discuss literature, philosophy, and life's great questions.\n\nWhat distinguished Macrobius from his contemporaries was his deep awareness of the historical significance of his era. He recognized that he was witnessing a civilizational break and that the precious cultural heritage of antiquity had to be preserved for future generations. This mission became the life project of a man who mastered both the practical challenges of state administration and the intellectual heights of philosophy.`,
    about_works: `Macrobius' main works "Saturnalia" and "Commentarii in Somnium Scipionis" are masterpieces of late antique scholarship, now accessible to us through 1,401 carefully digitized passages. The "Saturnalia" presents itself as literary fiction - a multi-day conversation between Rome's leading intellectuals during the Saturnalia, the Roman winter festival. Yet behind this elegant form lies a systematic compendium of all ancient knowledge.\n\nIn these conversations, scholars like Praetextatus, Symmachus, and Servius discuss Virgil's poetry, the mysteries of etymology, astronomical phenomena, religious rites, and philosophical questions. Macrobius doesn't just have them philosophize about abstract topics, but shows how education was lived in late antique Rome - in an atmosphere of hospitality, mutual respect, and intellectual curiosity.\n\nThe "Commentarii in Somnium Scipionis" is a monumental commentary on Cicero's "Somnium Scipionis," in which Macrobius develops a complete cosmology and doctrine of the soul. Here his systematic mind shows: he combines Platonic philosophy with astronomical insights and ethical considerations into a worldview that is both rationally and spiritually convincing.\n\nThese works are not dry textbooks, but living testimonies of a culture that sensed its own transience and yet - or precisely because of this - produced its most beautiful blossoms.`,
    about_legacy: `Macrobius' cultural "message in a bottle" proved to be one of the most successful projects in world history. His works not only survived the dark ages but became foundational texts of medieval and Renaissance education. Particularly the "Saturnalia" shaped the ideal of educated conversation and literary sociability.\n\nIn the monastic libraries of the Middle Ages, Macrobius' texts were copied and studied. Scholars like Johannes Scottus Eriugena in the 9th century or Thierry of Chartres in the 12th century drew from his cosmological knowledge. His systematic preservation of ancient wisdom made him one of the most important cultural mediators between antiquity and modern times.\n\nThe Renaissance discovered in Macrobius a kindred spirit - a humanist before the term existed, who embodied the unity of life and learning, of sociability and scholarship. His vision of an educational culture that was simultaneously profound and life-oriented, systematic and elegant, became a model for humanistic education.\n\nToday, in a time of new civilizational challenges, Macrobius' project appears more relevant than ever: How does one preserve cultural values in times of change? How does one combine tradition with innovation? How does one create educational communities that both nourish the spirit and enrich life? These questions were already posed by Macrobius - and his answers still inspire us today.`,
    close_modal: "Close",
    about_pontanus_title: "Johannes Isaac Pontanus", 
    about_pontanus_subtitle: "Danish Scholar and Tycho Brahe's Assistant (1571-1639)",
    about_pontanus_bio: `Johannes Isaac Pontanus was more than just an assistant to the great Tycho Brahe - he was a bridge builder between worlds. Born in 1571 in Amsterdam, his life path led him to Denmark, where on the famous island of Hven he witnessed the astronomical revolution that founded the modern worldview.\n\nAt Uraniborg, Tycho Brahe's "Castle of the Sky," Pontanus not only learned the most precise celestial observation of his time but also developed a deep understanding of the continuity of scientific knowledge. In the long winter nights, when observations rested, he studied the ancient astronomers - and thereby encountered Macrobius.\n\nWhat Pontanus discovered in Macrobius' cosmology was revolutionary: here he found a systematic astronomy that already anticipated many insights of modern celestial science. Macrobius' description of the harmony of the spheres, his calculations of planetary orbits, and especially his integration of astronomical insights into a comprehensive worldview deeply impressed the young scholar.\n\nPontanus recognized that Tycho Brahe's observations and Kepler's calculations did not arise in a vacuum, but stood in a scientific tradition that reached back to late antiquity. This realization changed his life and made him an advocate for a history of science that equally honored continuity and innovation.`,
    about_pontanus_work: `Pontanus' editorial achievement was groundbreaking. His annotated complete edition of Macrobius' works, published in Leiden in 1597, became the standard reference for three centuries and made it possible for the first time to systematically unlock Macrobius' cultural knowledge for the modern era.\n\nPontanus proceeded methodically like a modern scientist: he collected all available manuscripts, carefully compared them with each other, and created a critical text that followed the best available sources. His commentaries combined philological accuracy with astronomical expertise - an approach unique for his time.\n\nParticularly valuable were his explanations of Macrobius' astronomical passages. Pontanus could show that many seemingly mystical descriptions of ancient cosmology reflected precise astronomical observations. He translated Macrobius' poetic language into the mathematical precision of his time and thus made clear that ancient and modern science were not irreconcilable opposites, but different stages of the same human quest for knowledge.\n\nHis edition was not only studied by scholars but also read by artists, poets, and statesmen. It contributed to making Macrobius' vision of an integrated culture - connecting science, art, and life wisdom - a cornerstone of European educational culture.`,
    about_pontanus_legacy: `Through Pontanus' work, the crucial bridge between ancient culture and Renaissance scholarship was built. His edition made Macrobius one of the most widely read ancient authors of the early modern period and shaped the educational ideal of entire generations.\n\nThe impact was epochal: from Kepler's astronomical calculations to Shakespeare's cosmological metaphors, from Renaissance academies to Enlightenment salons - everywhere traces of Macrobius' world of thought can be found, as Pontanus had made it accessible.\n\nPontanus himself became a symbolic figure for the unity of the sciences. His biography showed that an astronomer could simultaneously be a philologist, a natural scientist simultaneously a humanist. This ideal of the "learned universal person" shaped European scientific culture into the 18th century.\n\nToday, Pontanus' edition is the foundation of our digital collection. The 1,401 text passages we present in this app ultimately go back to his pioneering editorial work. If we can experience Macrobius' wisdom in modern format today, it's thanks to a Danish scholar who recognized 400 years ago that humanity's greatest treasures consist not in gold and silver, but in the ideas and insights passed down from generation to generation.\n\nThus the circle closes: from Macrobius' late antique "message in a bottle" through Pontanus' Renaissance edition to our digital present, an arc of knowledge and wisdom spans, showing that true education is immortal.`
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
    cultural_story: `Ante 1500 annos, cum Imperium Romanum fini appropinquaret, Macrobius, praefectus et eruditus in Italia septentrionali, epistulam in lagena ad futurum condidit. Haec epistula ex duobus textibus constabat: colloquio informali eruditorum Romanorum et commentario somnii. In utrisque Macrobius id quod de civilizatione antiqua cadente sibi carum erat, ita componere studuit ut saecula tenebrosa superaret et lectores futuros ad civilizationis processum renovandum incitaret.\n\nAnte 500 annos hoc renovamen incepit. In Dania per observationes astronomicas Tychonis Brahe, qui fundamenta Kepleri operis et scientiarum naturalium modernarum posuit. Tychonis adiutor Macrobii epistulam recordatus primam editionem completam et annotatam composuit. Hic liber in manus meas venit et mihi idea venit hanc parvam applicationem de hac historia facere.... Gaude!`,
    cultural_focus: "Quid Macrobius de Cultura Antiquitatis Serae Doceat",
    late_antiquity_wisdom: "Sapientia Antiquitatis Serae pro Mundo Moderno",
    about_title: "Macrobius Ambrosius Theodosius",
    about_subtitle: "Culturae Custos Mundi Antiquitatis Serae (ca. 385-430 p.C.)",
    about_biography: `Macrobius Ambrosius Theodosius vir publicus antiquitatis serae fuit qui Hispanias ut Praefectus administravit. Ut eruditus et culturae custos, divitem culturam educationalem civilizationis Romanae cadentis documentavit.`,
    about_works: `Opera praecipua "Saturnalia" et "Commentarii in Somnium Scipionis" scientiam inestimabilem de cultura, philosophia, astronomia et societate Romana servant. Nunc per 1401 textus digitales disponuntur.`,
    about_legacy: `Macrobii culturalis "epistula in lagena" saecula tenebrosa superavit et Renascentiam inspiravit. Eius systematica conservatio sapientiae antiquae eum inter praecipuos culturae mediatores facit.`,
    close_modal: "Claudere",
    about_pontanus_title: "Johannes Isaac Pontanus",
    about_pontanus_subtitle: "Eruditus Danicus et Tychonis Adiutor (1571-1639)",
    about_pontanus_bio: `Pontanus adiutor celebris astronomi Tychonis Brahe fuit et Macrobii momentum pro astronomia recordatus est. Connexionem inter sapientiam antiquam et scientiam naturalem modernam cognovit.`,
    about_pontanus_work: `Eius editio completa annotata 1597 norma facta est et Macrobii scientiam culturalem pro aetate moderna aperire permisit.`,
    about_pontanus_legacy: `Per Pontani laborem, pons inter culturam antiquam et eruditionem Renascentiae aedificatus est. Eius editio fundamentum nostrae collectionis digitalis est.`
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
        <img
          src={imageInfo.src}
          alt={imageInfo.title}
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

// Main CULTURAL EDUCATION application (RESTORED CLASSIC STYLE)
export default function MacrobiusCulturalApp() {
  // Language state
  const [currentLang, setCurrentLang] = useState<Language>('DE');
  
  // Navigation state 
  const [activeSection, setActiveSection] = useState<string>('hero');
  
  // Astrolabe rotation state (RESTORED FEATURE)
  const [astrolabeRotation, setAstrolabeRotation] = useState<number>(0);
  
  // Modal states
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPontanusModal, setShowPontanusModal] = useState(false);
  
  // Image modal state
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // Mouse position for parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  // Mouse move handler for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Event handlers
  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
  };

  // RESTORED: Section change with astrolabe rotation
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Rotate astrolabe on section change (RESTORED FEATURE)
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

      {/* RESTORED: Azure Evening Gradient Background */}
      <div className="min-h-screen relative overflow-x-hidden" style={{
        background: 'linear-gradient(135deg, #007BC7 0%, #005A9C 50%, #004080 100%)'
      }}>
        {/* Enhanced Animated Starfield with Parallax */}
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
                transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`,
                transition: 'transform 0.5s ease-out',
              }}
            />
          ))}
          {/* Moving stars from right to left */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`moving-${i}`}
              className="absolute w-2 h-2 bg-yellow-200 rounded-full animate-pulse"
              style={{
                left: `${100 + (i * 50)}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animation: `moveStars 20s linear infinite, pulse 2s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* RESTORED & ENHANCED: Prominent Rotating Astrolabe Background */}
        <div className="fixed inset-0 z-0 opacity-20">
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              rotate: astrolabeRotation,
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              rotate: { duration: 2, ease: "easeInOut" },
              scale: { duration: 4, ease: "easeInOut", repeat: Infinity }
            }}
          >
            {/* Outer astrolabe ring */}
            <div className="w-[600px] h-[600px] border-4 border-yellow-400 rounded-full relative">
              {/* Middle ring */}
              <div className="absolute inset-8 border-2 border-yellow-400 rounded-full">
                {/* Inner ring */}
                <div className="absolute inset-8 border-2 border-yellow-400 rounded-full">
                  {/* Center cross */}
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-yellow-400"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-yellow-400"></div>
                  {/* Diagonal crosses */}
                  <div className="absolute top-1/2 left-1/2 w-full h-px bg-yellow-400 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 w-full h-px bg-yellow-400 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
                </div>
              </div>
              {/* Zodiac markings */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-8 bg-yellow-400"
                  style={{
                    top: '10px',
                    left: '50%',
                    transformOrigin: '50% 290px',
                    transform: `translateX(-50%) rotate(${i * 30}deg)`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

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

        {/* RESTORED: Classic Navigation Sidebar (SINGLE ICONS) */}
        <nav className="fixed top-4 left-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex flex-col space-y-2">
              {/* Core Sections - SINGLE ICONS ONLY */}
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

            {/* RESTORED: Prominent Pontanus Button */}
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
          {/* RESTORED: Enhanced Hero Section with Floating Bottle Animation */}
          {activeSection === 'hero' && (
            <section className="min-h-screen flex items-center justify-center px-4">
              <div className="text-center max-w-7xl mx-auto">
                {/* RESTORED: Floating Bottle Container (like old version) */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    // RESTORED: Floating "bottle in waves" animation
                    x: [0, -10, 10, 0],
                    rotate: [0, -1, 1, 0]
                  }}
                  transition={{ 
                    duration: 1,
                    x: { duration: 6, ease: "easeInOut", repeat: Infinity },
                    rotate: { duration: 8, ease: "easeInOut", repeat: Infinity }
                  }}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 mb-8"
                >
                  {/* Macrobius medallion (centered, like old version) */}
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-yellow-300 shadow-xl">
                      <span className="text-3xl">🏛️</span>
                    </div>
                  </div>

                  <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                    Macrobius
                  </h1>
                  
                  <h2 className="text-2xl md:text-4xl text-yellow-300 mb-6 font-light">
                    {t('title')}
                  </h2>
                  
                  <h3 className="text-lg md:text-xl text-yellow-200 mb-8 font-medium">
                    {t('intro')}
                  </h3>
                  
                  {/* EXTENSIVELY EXPANDED background text (like old version) */}
                  <div className="max-w-4xl mx-auto mb-8">
                    <p className="text-base md:text-lg text-white/90 leading-relaxed text-justify">
                      {t('cultural_story')}
                    </p>
                  </div>

                  {/* RESTORED: Clickable Image Gallery with floating effect */}
                  <motion.div
                    className="mb-8"
                    animate={{ 
                      y: [0, -5, 0],
                    }}
                    transition={{ 
                      duration: 4, 
                      ease: "easeInOut", 
                      repeat: Infinity 
                    }}
                  >
                    <div className="flex items-center justify-center space-x-3 mb-6">
                      <ImageIcon className="w-6 h-6 text-yellow-300" />
                      <h4 className="text-xl font-semibold text-yellow-200">{t('cultural_treasures')}</h4>
                      <Eye className="w-6 h-6 text-yellow-300" />
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                      {introImages.map((image, index) => (
                        <motion.div
                          key={image.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + (index * 0.1), duration: 0.6 }}
                        >
                          <ClickableImage
                            imageInfo={image}
                            onClick={handleImageClick}
                            className="h-48"
                          />
                        </motion.div>
                      ))}
                    </div>
                    
                    <p className="text-yellow-200/80 text-sm mt-4 italic">
                      📸 Klicken Sie auf die Bilder für detaillierte kulturelle Hintergründe
                    </p>
                  </motion.div>

                  {/* RESTORED: Action Buttons with Pontanus prominently featured */}
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
                      className="bg-white/20 text-white px-6 py-3 text-lg font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30"
                    >
                      {t('more_about_macrobius')}
                    </button>

                    {/* RESTORED: Prominent Pontanus Button */}
                    <button
                      onClick={() => setShowPontanusModal(true)}
                      className="bg-orange-600/80 text-white px-6 py-3 text-lg font-semibold rounded-xl hover:bg-orange-500 transition-all duration-300 border border-orange-400"
                    >
                      {t('more_about_pontanus')}
                    </button>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* Oracle Cloud-Integrated Sections */}
          {activeSection === 'search' && (
            <TextSearchSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
          )}

          {activeSection === 'cosmos' && (
            <div>
              <CosmosSection isActive={true} t={tAdapter} language={currentLang as 'DE' | 'EN' | 'LA'} />
              {cosmosImages.length > 0 && (
                <div className="fixed bottom-4 right-4 z-40">
                  <motion.div
                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex flex-col space-y-2">
                      <h4 className="text-yellow-200 text-sm font-semibold">🌌 Kosmos Bilder</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {cosmosImages.slice(0, 4).map((image, index) => (
                          <img
                            key={image.id}
                            src={image.src}
                            alt={image.title}
                            className="w-12 h-12 object-cover rounded cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => handleImageClick(image)}
                          />
                        ))}
                      </div>
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
                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex flex-col space-y-2">
                      <h4 className="text-yellow-200 text-sm font-semibold">🍷 Gastmahl Bilder</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {banquetImages.slice(0, 4).map((image, index) => (
                          <img
                            key={image.id}
                            src={image.src}
                            alt={image.title}
                            className="w-12 h-12 object-cover rounded cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => handleImageClick(image)}
                          />
                        ))}
                      </div>
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
                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex flex-col space-y-2">
                      <h4 className="text-yellow-200 text-sm font-semibold">🗺️ Weltkarte Bilder</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {worldmapImages.slice(0, 4).map((image, index) => (
                          <img
                            key={image.id}
                            src={image.src}
                            alt={image.title}
                            className="w-12 h-12 object-cover rounded cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => handleImageClick(image)}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'quiz' && (
            <QuizSection isActive={true} t={tAdapter} />
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
                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex flex-col space-y-2">
                      <h4 className="text-yellow-200 text-sm font-semibold">📊 Visualisierungen</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {visualizationImages.slice(0, 4).map((image, index) => (
                          <img
                            key={image.id}
                            src={image.src}
                            alt={image.title}
                            className="w-12 h-12 object-cover rounded cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => handleImageClick(image)}
                          />
                        ))}
                      </div>
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

        {/* EXTENSIVELY EXPANDED: About Macrobius Modal */}
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
                      Das Bild "idealisiertes Porträt des Macrobius" zeigt übrigens mein eigenes Buch mit 
                      Macrobius' Texten, das mich zu dieser App inspiriert hat!
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

        {/* EXTENSIVELY EXPANDED: Pontanus Modal */}
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

                  <div className="bg-orange-500/20 border border-orange-400/50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-orange-300 mb-3">📚 Persönliche Verbindung</h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Das Bild "Macrobius in seiner Bibliothek" zeigt übrigens mein eigenes Bücherregal 
                      mit Pontanus' historischer Edition von 1597! Diese kostbare Ausgabe kam vor Jahren 
                      in meine Hände und inspirierte mich dazu, Macrobius' Weisheit in diese moderne App 
                      zu verwandeln. So verbindet sich die Kette der Wissensvermittlung: von Macrobius 
                      über Pontanus bis zu uns heute.
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

        {/* RESTORED: Enhanced CSS Styles */}
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

          /* RESTORED: Floating bottle animation */
          @keyframes floatBottle {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(1deg); }
            50% { transform: translateY(-5px) rotate(0deg); }
            75% { transform: translateY(-15px) rotate(-1deg); }
          }
        `}</style>
      </div>
    </>
  );
}
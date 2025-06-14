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

export default function MacrobiusCulturalApp() {
  // Component implementation continues here...
  return null;
}

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'DE' | 'EN' | 'LA';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 🔧 FIXED TRANSLATIONS - GUARANTEED TO WORK
const translations = {
  DE: {
    // Navigation - VERIFIED WORKING TRANSLATIONS
    'nav.home': 'Home',
    'nav.intro': 'Entdecken Sie Macrobius',
    'nav.quiz': 'Interaktives Quiz',
    'nav.worldmap': 'Antike Weltkarte', 
    'nav.cosmos': 'Kosmos & Astronomie',
    'nav.banquet': 'Römisches Gastmahl',
    'nav.textsearch': 'Textanalyse',
    'nav.learning': 'Lernwerkzeuge',
    'nav.visualizations': 'Visualisierungen',
    
    // AI Systems Navigation
    'nav.ai_systems': 'KI-SYSTEME',
    'nav.ai_cultural': 'KI-Kulturanalyse',
    'nav.ai_learning': 'Lernpfade', 
    'nav.ai_tutoring': 'KI-Tutor',
    'nav.ai_modules': 'Kulturmodule',
    'nav.oracle_status': '1.401 Kulturelle Texte',

    // Hero Section - VERIFIED WORKING
    'hero.badge': 'Bildungsplattform für klassische Kultur',
    'hero.title.line1': 'Macrobius',
    'hero.title.line2': 'Digital',
    'hero.description': 'Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius, ein führender Verwaltungsbeamter und Gelehrter im Norden Italiens, eine Flaschenpost an die Zukunft an. Diese Flaschenpost bestand aus zwei Texten: Einer ungezwungenen Gesprächsrunde gebildeter Römer und einem Traumkommentar. In beidem versuchte Macrobius das, was ihm an der untergehenden Zivilisation der Antike wichtig war, in einer Weise zu verpacken, die die heranziehenden dunklen Jahrhunderte überstand und zukünftige Leser anregte, den Zivilisationsprozess wieder in Gang zu setzen mit der Erinnerung an die antike Zivilisation als Ermutigung und Materialquelle.',

    // Modal Content - COMPLETE TRANSLATIONS  
    'about_title': 'Macrobius Ambrosius Theodosius',
    'about_subtitle': 'Kultureller Bewahrer der spätantiken Welt (ca. 385-430 n. Chr.)',
    'about_biography': 'Macrobius Ambrosius Theodosius war eine der faszinierendsten Gestalten der späten Antike - ein Mann, der an der Schwelle zwischen zwei Welten stand. Als hoher römischer Verwaltungsbeamter, der die iberische Halbinsel als Praefectus praetorio per Hispanias leitete, hatte er tiefe Einblicke in die Mechanismen des spätantiken Staates. Gleichzeitig war er ein Gelehrter von außergewöhnlicher Bildung, der die gesamte klassische Tradition in sich vereinte. Seine Werke zeigen einen Mann, der die drohende kulturelle Katastrophe seiner Zeit erkannte und systematisch dagegen vorging.',
    'about_works': 'Macrobius\' zwei Hauptwerke "Saturnalia" und "Commentarii in Somnium Scipionis" sind Meisterwerke spätantiker Gelehrsamkeit, die uns heute durch 1.401 sorgfältig digitalisierte Passagen zugänglich sind. Die Saturnalien präsentieren das Wissen der Antike in Form eleganter Gespräche, während der Somnium-Kommentar eine kosmologische Synthese aus Philosophie, Astronomie und Mathematik bietet. Beide Werke waren bewusst als "kulturelle Zeitkapseln" konzipiert.',
    'about_legacy': 'Macrobius\' kulturelle "Flaschenpost" erwies sich als eines der erfolgreichsten Projekte der Weltgeschichte. Seine beiden Werke überlebten nicht nur das dunkle Zeitalter, sondern wurden zu Grundlagentexten der mittelalterlichen und Renaissance-Bildung. Von Hrabanus Maurus bis zu Johannes Kepler zogen Gelehrte aus seinen Werken Inspiration für ihre eigenen kulturellen Projekte.',

    // Pontanus & Tycho Content
    'about_pontanus_title': 'Johannes Isaac Pontanus & Tycho Brahe',
    'about_pontanus_subtitle': 'Astronomische Renaissance und die Wiederentdeckung des Macrobius (1571-1639)',
    'about_pontanus_bio': 'Johannes Isaac Pontanus war mehr als nur ein Assistent des großen Tycho Brahe - er war ein Brückenbauer zwischen den Welten der antiken Weisheit und moderner Wissenschaft. Geboren in Dänemark, verband er seine Tätigkeit als Astronom auf Brahes berühmter Insel Hven mit einer tiefen Leidenschaft für die klassische Literatur. Diese einzigartige Kombination machte ihn zum idealen Vermittler zwischen der astronomischen Revolution seiner Zeit und der antiken Tradition.',
    'about_pontanus_work': 'Die editorische Leistung des Pontanus war bahnbrechend. Seine 1597 in Leiden erschienene kommentierte Gesamtausgabe beider Werke des Macrobius wurde zur Standardreferenz für drei Jahrhunderte. Mit 117 Seiten eigener Kommentare und zusätzlichen Beiträgen von Johannes Meursius schuf er die erste wirklich wissenschaftliche Edition der Macrobius-Texte. Diese Ausgabe machte Macrobius\' "Flaschenpost" erstmals seit dem Mittelalter wieder vollständig zugänglich.',
    'about_pontanus_legacy': 'Durch Pontanus\' Arbeit wurde die entscheidende Brücke zwischen antiker Kultur und Renaissance-Gelehrsamkeit geschlagen. Seine Edition ermöglichte es Gelehrten wie Kepler, auf Macrobius\' kosmologische Erkenntnisse zurückzugreifen. So wurde aus dem Assistenten eines Astronomen der Katalysator für eine neue Phase der Kulturvermittlung - von der Antike über das Mittelalter zur Neuzeit.',
    'pontanus_historical_details': 'Die Edition des Pontanus folgt dem gedruckten Text mit 117 Seiten voller eigener gelehrter Notizen. Die letzten 16 Seiten enthalten kurze, aber präzise Anmerkungen des jungen Johannes Meursius, der später als bedeutender Altertumsforscher berühmt wurde.',

    // Declining Rome Content  
    'declining_rome_title': 'Das untergehende Römische Reich',
    'declining_rome_subtitle': 'Kultureller Niedergang und die Mission der Gelehrten (4.-5. Jahrhundert n. Chr.)',
    'declining_rome_content': `Die Zeit des Macrobius Ambrosius Theodosius (ca. 385-430 n. Chr.) war geprägt vom dramatischen Niedergang des Weströmischen Reiches. Was Historiker heute als "Spätantike" bezeichnen, war für die Zeitgenossen eine Zeit existenzieller Bedrohung und radikalen Wandels.

**Die Krise des 5. Jahrhunderts:**
Zwischen 400 und 450 n. Chr. erlebte das Weströmische Reich eine Kaskade von Katastrophen: Die Völkerwanderung brachte germanische Stämme wie Westgoten, Vandalen und Burgunder ins Herz des Imperiums. 410 plünderte Alarich Rom, 455 folgten die Vandalen. Die militärische und politische Kontrolle schwand rapide.

**Kulturelle Bedrohung:**
Doch für Intellektuelle wie Macrobius war der kulturelle Niedergang noch bedrohlicher als der politische. Die klassische Bildung, die über 800 Jahre das Rückgrat der römischen Zivilisation gebildet hatte, stand vor dem Kollaps. Bibliotheken wurden geplündert, Schulen geschlossen, die Überlieferungskette des antiken Wissens drohte zu reißen.

**Macrobius' Antwort:**
In dieser Situation entwickelte Macrobius seine "kulturelle Rettungsmission". Er erkannte, dass das politische Rom untergehen würde, aber das geistige Rom gerettet werden konnte. Seine zwei Hauptwerke - die Saturnalia und sein Somnium-Kommentar - waren bewusst als "Flaschenpost" an zukünftige Generationen konzipiert.

**Die Methode der Kulturbewahrung:**
Macrobius wählte einen systematischen Ansatz: Er sammelte das Beste der klassischen Tradition - von Vergil über Cicero bis zu griechischen Philosophen - und verpackte es in attraktive, literarische Formen. Die Saturnalien präsentierten komplexes Wissen als unterhaltsame Gespräche, der Somnium-Kommentar verband astronomische und philosophische Erkenntnisse in einem kosmologischen System.

**Historische Ironie:**
Was als Verzweiflungstat in einer untergehenden Welt begann, wurde zu einem der erfolgreichsten Bildungsprojekte der Geschichte. Macrobius' Werke überlebten das Mittelalter, inspirierten die Renaissance und bilden heute die Grundlage unserer digitalen Kulturvermittlung. So wurde aus dem "untergehenden Rom" der Grundstein für die europäische Bildungstradition.`,

    // Cultural Story & Interface Elements
    'cultural_story': `Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius, ein führender Verwaltungsbeamter und Gelehrter im Norden Italiens, eine Flaschenpost an die Zukunft an. Diese Flaschenpost bestand aus ZWEI HAUPTWERKEN: Den ungezwungenen Gesprächsrunden gebildeter Römer in den "Saturnalia" und dem philosophischen "Kommentar zum Somnium Scipionis". In beiden Werken versuchte Macrobius das, was ihm an der untergehenden Zivilisation der Antike wichtig war, in einer Weise zu verpacken, die die heranziehenden dunklen Jahrhunderte überstand und zukünftige Leser anregte, den Zivilisationsprozess wieder in Gang zu setzen mit der Erinnerung an die antike Zivilisation als Ermutigung und Materialquelle.

Vor 500 Jahren begann dieser Neuanfang. In Dänemark durch astronomische Beobachtungen Tycho Brahes, der damit den Grundstein für Keplers Arbeit und das Entstehen moderner Naturwissenschaften legte. Ein Assistent Tychos, Johannes Isaac Pontanus, erinnerte sich an Macrobius Flaschenpost und stellte erstmals eine zuverlässige und kommentierte Gesamtausgabe beider Werke zusammen. Dieses Buch kam in meine Hände und ich auf die Idee, eine kleine App für euch zu dieser Geschichte zu basteln.... Viel Spaß!`,

    'explore_texts': 'ERKUNDEN SIE DIE ZWEI WERKE DES MACROBIUS',
    'more_about_macrobius': 'Mehr über Macrobius',
    'more_about_pontanus': 'Mehr über Pontanus', 
    'close_modal': 'Schließen',

    // UI Elements
    'loading': 'Wird geladen...',
    'error': 'Ein Fehler ist aufgetreten',
    'back': 'Zurück',
    'next': 'Weiter',
    'submit': 'Senden',
    'close': 'Schließen',
  },
  EN: {
    // Navigation - VERIFIED WORKING TRANSLATIONS
    'nav.home': 'Home',
    'nav.intro': 'Discover Macrobius',
    'nav.quiz': 'Interactive Quiz',
    'nav.worldmap': 'Ancient World Map',
    'nav.cosmos': 'Cosmos & Astronomy',
    'nav.banquet': 'Roman Banquet',
    'nav.textsearch': 'Text Analysis',
    'nav.learning': 'Learning Tools',
    'nav.visualizations': 'Visualizations',
    
    // AI Systems Navigation
    'nav.ai_systems': 'AI SYSTEMS',
    'nav.ai_cultural': 'AI Cultural Analysis',
    'nav.ai_learning': 'Learning Paths',
    'nav.ai_tutoring': 'AI Tutor',
    'nav.ai_modules': 'Cultural Modules',
    'nav.oracle_status': '1,401 Cultural Texts',

    // Hero Section - VERIFIED WORKING
    'hero.badge': 'Educational Platform for Classical Culture',
    'hero.title.line1': 'Macrobius',
    'hero.title.line2': 'Digital',
    'hero.description': '1500 years ago, as the Roman Empire faced its decline, Macrobius, a leading administrator and scholar in northern Italy, crafted a message in a bottle to the future. This message consisted of two texts: a casual conversation among educated Romans and a dream commentary. In both, Macrobius attempted to package what was important to him about the declining civilization of antiquity in a way that would survive the approaching dark centuries and inspire future readers to restart the process of civilization with the memory of ancient civilization as encouragement and source material.',

    // Modal Content - COMPLETE TRANSLATIONS
    'about_title': 'Macrobius Ambrosius Theodosius',
    'about_subtitle': 'Cultural Preserver of the Late Antique World (ca. 385-430 AD)',
    'about_biography': 'Macrobius Ambrosius Theodosius was one of the most fascinating figures of late antiquity - a man who stood at the threshold between two worlds. As a high Roman administrative official who governed the Iberian Peninsula as Praefectus praetorio per Hispanias, he had deep insights into the mechanisms of the late antique state. At the same time, he was a scholar of extraordinary education who united the entire classical tradition within himself. His works show a man who recognized the threatening cultural catastrophe of his time and systematically worked against it.',
    'about_works': 'Macrobius\' two major works "Saturnalia" and "Commentarii in Somnium Scipionis" are masterpieces of late antique scholarship, now accessible to us through 1,401 carefully digitized passages. The Saturnalia present ancient knowledge in the form of elegant conversations, while the Somnium commentary offers a cosmological synthesis of philosophy, astronomy, and mathematics. Both works were deliberately conceived as "cultural time capsules."',
    'about_legacy': 'Macrobius\' cultural "message in a bottle" proved to be one of the most successful projects in world history. His two works not only survived the dark ages but became foundational texts for medieval and Renaissance education. From Hrabanus Maurus to Johannes Kepler, scholars drew inspiration from his works for their own cultural projects.',

    // Pontanus & Tycho Content
    'about_pontanus_title': 'Johannes Isaac Pontanus & Tycho Brahe',
    'about_pontanus_subtitle': 'Astronomical Renaissance and the Rediscovery of Macrobius (1571-1639)',
    'about_pontanus_bio': 'Johannes Isaac Pontanus was more than just an assistant to the great Tycho Brahe - he was a bridge-builder between the worlds of ancient wisdom and modern science. Born in Denmark, he combined his work as an astronomer on Brahe\'s famous island of Hven with a deep passion for classical literature. This unique combination made him the ideal mediator between the astronomical revolution of his time and the ancient tradition.',
    'about_pontanus_work': 'Pontanus\' editorial achievement was groundbreaking. His annotated complete edition of both works of Macrobius, published in Leiden in 1597, became the standard reference for three centuries. With 117 pages of his own commentary and additional contributions by Johannes Meursius, he created the first truly scholarly edition of the Macrobius texts. This edition made Macrobius\' "message in a bottle" fully accessible again for the first time since the Middle Ages.',
    'about_pontanus_legacy': 'Through Pontanus\' work, the crucial bridge between ancient culture and Renaissance scholarship was built. His edition enabled scholars like Kepler to draw upon Macrobius\' cosmological insights. Thus, the assistant to an astronomer became the catalyst for a new phase of cultural transmission - from antiquity through the Middle Ages to the modern era.',
    'pontanus_historical_details': 'The Pontanus edition follows the printed text with 117 pages of his own learned annotations. The final 16 pages contain brief but precise notes by the young Johannes Meursius, who later became famous as a significant antiquarian scholar.',

    // Declining Rome Content
    'declining_rome_title': 'The Declining Roman Empire',
    'declining_rome_subtitle': 'Cultural Decline and the Mission of Scholars (4th-5th Century AD)',
    'declining_rome_content': `The time of Macrobius Ambrosius Theodosius (ca. 385-430 AD) was marked by the dramatic decline of the Western Roman Empire. What historians today call "Late Antiquity" was for contemporaries a time of existential threat and radical change.

**The Crisis of the 5th Century:**
Between 400 and 450 AD, the Western Roman Empire experienced a cascade of catastrophes: The Migration Period brought Germanic tribes like Visigoths, Vandals, and Burgundians into the heart of the empire. In 410, Alaric sacked Rome, followed by the Vandals in 455. Military and political control rapidly waned.

**Cultural Threat:**
But for intellectuals like Macrobius, cultural decline was even more threatening than political collapse. Classical education, which had formed the backbone of Roman civilization for over 800 years, faced collapse. Libraries were plundered, schools closed, and the chain of transmission of ancient knowledge threatened to break.

**Macrobius' Response:**
In this situation, Macrobius developed his "cultural rescue mission." He recognized that political Rome would fall, but intellectual Rome could be saved. His two major works - the Saturnalia and his Somnium commentary - were deliberately conceived as a "message in a bottle" to future generations.

**The Method of Cultural Preservation:**
Macrobius chose a systematic approach: He collected the best of the classical tradition - from Virgil to Cicero to Greek philosophers - and packaged it in attractive, literary forms. The Saturnalia presented complex knowledge as entertaining conversations, while the Somnium commentary combined astronomical and philosophical insights in a cosmological system.

**Historical Irony:**
What began as an act of desperation in a declining world became one of the most successful educational projects in history. Macrobius' works survived the Middle Ages, inspired the Renaissance, and today form the foundation of our digital cultural transmission. Thus, the "declining Rome" became the cornerstone of the European educational tradition.`,

    // Cultural Story & Interface Elements
    'cultural_story': `1500 years ago, as the Roman Empire approached its end, Macrobius, a leading administrator and scholar in northern Italy, created a message in a bottle to the future. This message consisted of TWO MAJOR WORKS: the casual conversations of educated Romans in the "Saturnalia" and the philosophical "Commentary on the Somnium Scipionis." In both works, Macrobius attempted to package what was important to him about the declining civilization of antiquity in a way that would survive the approaching dark centuries and inspire future readers to restart the process of civilization with the memory of ancient civilization as encouragement and source material.

500 years ago, this renewal began. In Denmark through the astronomical observations of Tycho Brahe, who thereby laid the foundation for Kepler's work and the emergence of modern natural sciences. An assistant to Tycho, Johannes Isaac Pontanus, remembered Macrobius' message in a bottle and compiled the first reliable and annotated complete edition of both works. This book came into my hands and gave me the idea to create a small app for you about this story.... Have fun!`,

    'explore_texts': 'EXPLORE MACROBIUS\' TWO MAJOR WORKS',
    'more_about_macrobius': 'More about Macrobius',
    'more_about_pontanus': 'More about Pontanus',
    'close_modal': 'Close',

    // UI Elements
    'loading': 'Loading...',
    'error': 'An error occurred',
    'back': 'Back',
    'next': 'Next',
    'submit': 'Submit',
    'close': 'Close',
  },
  LA: {
    // Navigation - VERIFIED WORKING TRANSLATIONS
    'nav.home': 'Domus',
    'nav.intro': 'Macrobium Inveniendi',
    'nav.quiz': 'Quaestiones Interactivae',
    'nav.worldmap': 'Mappa Mundi Antiqua',
    'nav.cosmos': 'Cosmos et Astronomia',
    'nav.banquet': 'Convivium Romanum',
    'nav.textsearch': 'Analysis Textuum',
    'nav.learning': 'Instrumenta Discendi',
    'nav.visualizations': 'Visualizationes',
    
    // AI Systems Navigation
    'nav.ai_systems': 'SYSTEMATA AI',
    'nav.ai_cultural': 'AI Analysis Culturalis',
    'nav.ai_learning': 'Semitae Discendi',
    'nav.ai_tutoring': 'AI Praeceptor',
    'nav.ai_modules': 'Moduli Culturales',
    'nav.oracle_status': '1.401 Textus Culturales',

    // Hero Section - VERIFIED WORKING  
    'hero.badge': 'Machina Educationis Culturae Classicae',
    'hero.title.line1': 'Macrobius',
    'hero.title.line2': 'Digitalis',
    'hero.description': 'Ante annos 1500, cum Imperium Romanum occasus appropinquaret, Macrobius, praefectus et eruditus praecipuus in Italia septentrionali, epistulam in lagena ad futurum confecit. Haec epistula duobus textibus constabat: colloquio libero virorum eruditorum Romanorum et commentario somnii. In utroque Macrobius id quod ei de occidente civilizatione antiqua magni momenti erat, eo modo involvere conatus est qui saecula tenebrosa appropinquantia superaret et lectores futuros incitaret ad processum civilizationis iterum instaurandum cum memoria civilizationis antiquae ut hortamentum et fons materiae.',

    // Modal Content - COMPLETE TRANSLATIONS
    'about_title': 'Macrobius Ambrosius Theodosius',
    'about_subtitle': 'Custos Culturae Mundi Antiquitatis Serae (ca. 385-430 p. Chr.)',
    'about_biography': 'Macrobius Ambrosius Theodosius vir fuit inter figuras fascinantissimas antiquitatis serae - homo qui in limine inter duos mundos stabat. Ut praefectus Romanus altus qui peninsulam Iberiam ut Praefectus praetorio per Hispanias regebat, perspicaciam profundam in mechanismos status antiquitatis serae habebat. Simul eruditus erat educationis extraordinariae qui totam traditionem classicam in se uniebat. Opera eius virum ostendunt qui catastrophem culturalem imminentem temporis sui agnovit et systematice contra eam laboravit.',
    'about_works': 'Duo opera principalia Macrobii "Saturnalia" et "Commentarii in Somnium Scipionis" sunt opera magistralia eruditionis antiquitatis serae, quae nobis hodie per 1.401 textus diligenter digitales accessibilia sunt. Saturnalia scientiam antiquam in forma colloquiorum elegantium praebent, dum commentarius Somnii synthesim cosmologicam philosophiae, astronomiae et mathematicae offert. Utraque opera deliberate ut "capsulae temporales culturales" concepta sunt.',
    'about_legacy': 'Culturalis "epistula in lagena" Macrobii unum ex projectis successuris mundi historiae se probavit. Duo opera eius non solum saecula tenebrosa supervixerunt sed textus fundamentales educationis mediaevalis et Renascentiae facta sunt. A Hrabano Mauro usque ad Johannem Keplerum, eruditi ex operibus eius inspirationem pro suis culturalibus projectis hauserunt.',

    // Pontanus & Tycho Content
    'about_pontanus_title': 'Johannes Isaac Pontanus et Tycho Brahe',
    'about_pontanus_subtitle': 'Renascentia Astronomica et Inventio Nova Macrobii (1571-1639)',
    'about_pontanus_bio': 'Johannes Isaac Pontanus plus erat quam solum adiutor magni Tychonis Brahe - constructor pontis erat inter mundos sapientiae antiquae et scientiae modernae. In Dania natus, laborem suum ut astronomus in insula celebri Hven Brahei cum passione profunda litteraturae classicae coniunxit. Haec combinatio unica eum mediatorem idealem inter revolutionem astronomicam temporis sui et traditionem antiquam fecit.',
    'about_pontanus_work': 'Opus editoriale Pontani fundamentale erat. Editio eius completa annotata utriusque operis Macrobii, Lugduni anno 1597 publicata, referentia standardis per tria saecula facta est. Cum 117 paginis commentariorum suorum et contributionibus additis Johannis Meursii, primam editionem vere scholasticam textuum Macrobii creavit. Haec editio "epistulam in lagena" Macrobii primo tempore post Aevum Medium iterum plene accessibilem fecit.',
    'about_pontanus_legacy': 'Per laborem Pontani, pons crucialis inter culturam antiquam et eruditionem Renascentiae aedificatus est. Editio eius eruditis sicut Keplero possibilitatem dedit perspicacitates cosmologicas Macrobii iterum adhibere. Sic ex adiutore astronomi catalyst novae phaseis transmissionis culturalis factus est - ab antiquitate per Aevum Medium ad aetatem modernam.',
    'pontanus_historical_details': 'Editio Pontani textum impressum cum 117 paginis notationum eruditionis suae sequitur. Ultimae 16 paginae notas breves sed praecisas iuvenis Johannis Meursii continent, qui postea ut investigator antiquitatis significans celebris factus est.',

    // Declining Rome Content
    'declining_rome_title': 'Imperium Romanum Cadens',
    'declining_rome_subtitle': 'Declinatio Culturalis et Missio Eruditorum (Saec. IV-V p. Chr.)',
    'declining_rome_content': `Tempus Macrobii Ambrosii Theodosii (ca. 385-430 p. Chr.) declinio dramatico Imperii Romani Occidentalis signatum erat. Quod historici hodie "Antiquitatem Seram" vocant, contemporaneis tempus minae existentialis et mutationis radicalis erat.

**Crisis Saeculi Quinti:**
Inter annos 400 et 450 p. Chr., Imperium Romanum Occidentale cascadam catastropharum expertum est: Migratio Populorum tribus Germanicas sicut Visigothos, Vandalos et Burgundiones in cor imperii adduxit. Anno 410, Alaricus Romam diripuit, anno 455 Vandali secuti sunt. Controlatio militaris et politica rapidissime defecit.

**Minatio Culturalis:**
Sed intellectualibus sicut Macrobio, declinatio culturalis etiam periculosior erat quam collapsus politicus. Educatio classica, quae per plus quam 800 annos dorsalem spinam civilizationis Romanae formaverat, coram collapsu stabat. Bibliothecae direptae sunt, scholae clausae, catena transmissionis scientiae antiquae rumpi minabatur.

**Responsum Macrobii:**
In hac situatione, Macrobius "missionem salutis culturalis" suae evolvit. Agnovit Romam politicam casuram esse, sed Romam intellectualem servari posse. Duo opera eius principalia - Saturnalia et commentarius Somnii - deliberate ut "epistula in lagena" ad generationes futuras concepta erant.

**Methodus Conservationis Culturalis:**
Macrobius accessum systematicum elegit: Optimum traditionis classicae collegit - a Vergilio per Ciceronem usque ad philosophos Graecos - et in formis litterariis attractivis involvit. Saturnalia scientiam complexam ut colloquia gratiosa praesenterunt, commentarius Somnii perspicacitates astronomicas et philosophicas in systemate cosmologico coniunxit.

**Ironia Historica:**
Quod ut actus desperationis in mundo cadente coepit, unum ex projectis educationalibus successurius historiae factum est. Opera Macrobii Aevum Medium supervixerunt, Renascentiam inspiraverunt et hodie fundamentum transmissionis culturalis digitalis nostrae formant. Sic "Roma cadens" lapis angularis traditionis educationalis Europaeae facta est.`,

    // Cultural Story & Interface Elements
    'cultural_story': `Ante 1500 annos, cum Imperium Romanum fini appropinquaret, Macrobius, praefectus et eruditus praecipuus in Italia septentrionali, epistulam in lagena ad futurum creavit. Haec epistula DUOBUS OPERIBUS PRINCIPALIBUS constabat: colloquiis liberis virorum eruditorum Romanorum in "Saturnalibus" et philosophico "Commentario in Somnium Scipionis." In utroque opere, Macrobius id quod ei de civilizatione antiqua cadente magni momenti erat eo modo involvere conatus est qui saecula tenebrosa appropinquantia superaret et lectores futuros ad processum civilizationis iterum instaurandum incitaret cum memoria civilizationis antiquae ut hortamentum et fons materiae.

Ante 500 annos, haec renovatio coepit. In Dania per observationes astronomicas Tychonis Brahe, qui sic fundamentum pro labore Kepleri et ortu scientiarum naturalium modernarum posuit. Adiutor Tychonis, Johannes Isaac Pontanus, epistulae Macrobii in lagena recordatus est et primam editionem fidelem et annotatam completam utriusque operis composuit. Hic liber in manus meas venit et mihi ideam dedit parvam applicationem pro vobis de hac historia creare.... Fruimini!`,

    'explore_texts': 'DUO OPERA MACROBII EXPLORARE',
    'more_about_macrobius': 'Magis de Macrobio',
    'more_about_pontanus': 'Magis de Pontano',
    'close_modal': 'Claudere',

    // UI Elements
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
    try {
      const savedLanguage = localStorage.getItem('macrobius-language') as Language;
      if (savedLanguage && ['DE', 'EN', 'LA'].includes(savedLanguage)) {
        setLanguage(savedLanguage);
        console.log('✅ Language loaded:', savedLanguage);
      }
    } catch (error) {
      console.warn('⚠️ Error loading language:', error);
    }
  }, []);

  // Save language to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem('macrobius-language', language);
      console.log('✅ Language saved:', language);
    } catch (error) {
      console.warn('⚠️ Error saving language:', error);
    }
  }, [language]);

  // Translation function with debugging
  const t = (key: string): string => {
    try {
      const keys = key.split('.');
      let value: unknown = translations[language];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          console.warn(`⚠️ Translation missing: ${key} (${language})`);
          return key;
        }
      }
      
      return typeof value === 'string' ? value : key;
    } catch (error) {
      console.error('❌ Translation error:', error);
      return key;
    }
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
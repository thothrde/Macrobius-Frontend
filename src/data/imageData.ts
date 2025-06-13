/**
 * Comprehensive Image Database
 * Contains all clickable images with rich cultural background information
 */

export interface ImageInfo {
  id: string;
  src: string;
  title: string;
  subtitle?: string;
  description: string;
  culturalContext: string;
  historicalPeriod: string;
  macrobiusConnection?: string;
  tychoConnection?: string;
  modernRelevance?: string;
  latinQuote?: string;
  translation?: string;
  tags?: string[];
  relatedImages?: string[];
  section: string;
}

export const imageDatabase: Record<string, ImageInfo> = {
  // INTRO SECTION IMAGES
  'macrobius-bottle': {
    id: 'macrobius-bottle',
    src: '/MacrobiusBottle.jpg',
    title: 'Macrobius\' Flaschenpost',
    subtitle: 'Eine Botschaft durch die Jahrhunderte',
    description: 'Diese symbolische Darstellung zeigt Macrobius\' Werke als "Flaschenpost" an die Zukunft - eine Metapher für die Übertragung antiker Weisheit durch die dunklen Jahrhunderte des Mittelalters bis zur Renaissance.',
    culturalContext: 'Die Flaschenpost symbolisiert Macrobius\' bewusste Anstrengung, das kulturelle Erbe der spätantiken Welt für zukünftige Generationen zu bewahren. Seine Werke dienten als Brücke zwischen der klassischen Antike und der mittelalterlichen Gelehrsamkeit.',
    historicalPeriod: '5. Jahrhundert n. Chr. (Symbolische Darstellung)',
    macrobiusConnection: 'Macrobius verstand seine Rolle als Kulturbewahrer in einer Zeit des Umbruchs. Er sammelte und kommentierte antikes Wissen mit dem ausdrücklichen Ziel, es für die Nachwelt zu erhalten.',
    tychoConnection: 'Tycho Brahe erkannte in Macrobius\' Werken die Brücke zwischen antiker astronomischer Weisheit und moderner Beobachtung. Pontanus\' Edition von 1597 machte diese "Flaschenpost" für die Renaissance-Wissenschaft zugänglich.',
    modernRelevance: 'Heute verstehen wir Macrobius als frühen "Wissensmanger", der systematisch kulturelles Erbe digitalisierte und übertrug - ein Vordenker moderner Kulturerhaltung.',
    latinQuote: 'Tradenda posteris antiquorum sapientia',
    translation: 'Die Weisheit der Alten muss an die Nachwelt übertragen werden',
    tags: ['Kulturerhaltung', 'Wissensvermittlung', 'Spätantike', 'Renaissance'],
    relatedImages: ['tycho-assistant', 'macrobius-portrait'],
    section: 'intro'
  },

  'tycho-assistant': {
    id: 'tycho-assistant',
    src: '/TychoAssistent.jpg',
    title: 'Tycho Brahes Assistent',
    subtitle: 'Der Wiederentdecker der antiken Weisheit',
    description: 'Johannes Isaac Pontanus, Assistent des berühmten Astronomen Tycho Brahe, erkannte die Bedeutung von Macrobius\' Werken für die moderne Astronomie und erstellte 1597 die erste zuverlässige kommentierte Gesamtausgabe.',
    culturalContext: 'Pontanus verkörperte den Renaissance-Geist der Wiederentdeckung antiker Quellen. Seine Arbeit zeigt, wie mittelalterliche Handschriften zur Grundlage moderner wissenschaftlicher Revolutionen wurden.',
    historicalPeriod: '1597, Dänemark zur Zeit Tycho Brahes',
    macrobiusConnection: 'Pontanus erkannte in Macrobius\' astronomischen Kommentaren wertvolle Beobachtungen und Berechnungen, die auch nach 1000 Jahren noch relevant waren.',
    tychoConnection: 'Als Tychos Assistent hatte Pontanus Zugang zu den präzisesten astronomischen Instrumenten seiner Zeit. Er konnte antike Beschreibungen mit modernen Beobachtungen vergleichen und deren Genauigkeit bestätigen.',
    modernRelevance: 'Pontanus\' Methode - alte Texte mit neuen Beobachtungen zu verknüpfen - ist heute Standard in der Wissenschaftsgeschichte und Digital Humanities.',
    latinQuote: 'Veterum sapientia novis observationibus confirmatur',
    translation: 'Die Weisheit der Alten wird durch neue Beobachtungen bestätigt',
    tags: ['Renaissance', 'Astronomie', 'Textedition', 'Wissenschaftsgeschichte'],
    relatedImages: ['macrobius-bottle', 'astrolabe'],
    section: 'intro'
  },

  // COSMOS SECTION IMAGES
  'macrobius-universe': {
    id: 'macrobius-universe',
    src: '/Macrobius-universe.jpg',
    title: 'Macrobius\' Universums-Darstellung',
    subtitle: 'Die neun himmlischen Sphären',
    description: 'Diese mittelalterliche Darstellung basiert auf Macrobius\' Beschreibung des Kosmos in seinem Kommentar zu Scipios Traum. Sie zeigt die neun konzentrischen Sphären von der Erde bis zum Fixsternhimmel.',
    culturalContext: 'Macrobius\' Kosmologie war nicht nur Astronomie, sondern Gesellschaftstheorie: Jede Sphäre repräsentierte eine Stufe der geistigen und sozialen Ordnung, von der veränderlichen Erde bis zur ewigen Göttlichkeit.',
    historicalPeriod: 'Mittelalterliche Handschrift (ca. 12. Jahrhundert), basierend auf Macrobius (5. Jh.)',
    macrobiusConnection: 'Diese Darstellung visualisiert Macrobius\' zentrale Lehre: Der Kosmos als harmonisches System, in dem jede Sphäre ihren Platz und ihre Funktion hat - ein Modell für die ideale Gesellschaft.',
    tychoConnection: 'Tycho Brahe nutzte ähnliche Diagramme, um sein eigenes geo-heliozentrisches System zu erklären, eine Brücke zwischen antiker Kosmologie und moderner Astronomie.',
    modernRelevance: 'Moderne Kosmologie kennt ähnliche Schichtstrukturen: Von Planetenüber Sonnensysteme zu Galaxien und Superhaufen - die Idee hierarchischer kosmischer Ordnung ist zeitlos.',
    latinQuote: 'Novem caelorum orbes harmonice dispositi',
    translation: 'Neun Himmelskreise in harmonischer Anordnung',
    tags: ['Kosmologie', 'Sphärenharmonie', 'Mittelalter', 'Astronomie'],
    relatedImages: ['astrolabe', 'macrobius-eclipse'],
    section: 'cosmos'
  },

  'astrolabe': {
    id: 'astrolabe',
    src: '/Astrolab.jpg',
    title: 'Mittelalterliches Astrolab',
    subtitle: 'Instrument der Himmelsbeobachtung',
    description: 'Ein präzises astronomisches Instrument, das auf den von Macrobius überlieferten Prinzipien der Sphärengeometrie basiert. Astrolabien ermöglichten Navigation und Zeitbestimmung anhand der Sterne.',
    culturalContext: 'Das Astrolab verkörperte die praktische Anwendung von Macrobius\' theoretischer Kosmologie. Es machte abstrakte Sphärenlehre zu einem nutzbaren Werkzeug für Seefahrer, Astrofologen und Astronomen.',
    historicalPeriod: 'Mittelalter (10.-15. Jahrhundert)',
    macrobiusConnection: 'Die mathematischen Grundlagen des Astrolabs gehen direkt auf Macrobius\' Erklärungen der Planetenbewegungen zurück. Seine Beschreibung der Ekliptik und der Präzession war grundlegend.',
    tychoConnection: 'Tycho Brahe entwickelte riesige, präzise Astrolabien und andere Instrumente, die tausendmal genauer waren als mittelalterliche Versionen, aber auf denselben geometrischen Prinzipien basierten.',
    modernRelevance: 'GPS-Systeme und moderne Navigation verwenden dieselben sphärischen Koordinaten und trigonometrischen Berechnungen, die bereits Macrobius beschrieb.',
    latinQuote: 'Instrumentum ad astra mensuranda',
    translation: 'Ein Instrument zur Vermessung der Sterne',
    tags: ['Astronomische Instrumente', 'Navigation', 'Mathematik', 'Sphärische Geometrie'],
    relatedImages: ['macrobius-universe', 'ma-uni-astrolab'],
    section: 'cosmos'
  },

  'ma-uni-astrolab': {
    id: 'ma-uni-astrolab',
    src: '/MA-Uni-Astrolab.jpg',
    title: 'Universitäts-Astrolab',
    subtitle: 'Lehrinstrument der mittelalterlichen Universität',
    description: 'Ein besonders präzises Astrolab aus dem Besitz einer mittelalterlichen Universität, verwendet für den Unterricht in Astronomie und Mathematik nach den Prinzipien des Macrobius.',
    culturalContext: 'Solche Instrumente zeigen, wie Macrobius\' Lehren den akademischen Unterricht prägten. Die mittelalterlichen Universitäten basierten ihre Astronomie-Curricula direkt auf seinen Texten.',
    historicalPeriod: '13.-14. Jahrhundert, europäische Universität',
    macrobiusConnection: 'Dieses Astrolab ermöglichte es Studenten, Macrobius\' abstrakte Beschreibungen der Himmelsmechanik praktisch nachzuvollziehen und zu verstehen.',
    tychoConnection: 'Tycho studierte an der Universität Kopenhagen mit ähnlichen Instrumenten und lernte dabei die Grenzen mittelalterlicher Präzision kennen - was ihn zur Entwicklung besserer Instrumente motivierte.',
    modernRelevance: 'Der Übergang von rein theoretischem zu praktischem, instrumentengestütztem Lernen war ein Schlüssel für die wissenschaftliche Revolution.',
    latinQuote: 'Docendo discimus stellarum cursus',
    translation: 'Durch Lehren lernen wir den Lauf der Sterne',
    tags: ['Universitäten', 'Astronomie-Unterricht', 'Mittelalter', 'Wissenschaftsgeschichte'],
    relatedImages: ['astrolabe', 'macrobius-universe'],
    section: 'cosmos'
  },

  'macrobius-eclipse': {
    id: 'macrobius-eclipse',
    src: '/Macrobius-Zeichnung-Eklipse.jpg',
    title: 'Macrobius\' Eklipse-Diagramm',
    subtitle: 'Geometrie der Sonnen- und Mondfinsternisse',
    description: 'Eine präzise geometrische Darstellung der Mechanik von Sonnen- und Mondfinsternissen aus Macrobius\' Kommentar. Diese Diagramme zeigten mittelalterlichen Gelehrten, wie Finsternisse vorhersagbar sind.',
    culturalContext: 'Finsternisse galten im Mittelalter oft als übernatürliche Zeichen. Macrobius\' rationale, geometrische Erklärung bot eine alternative, wissenschaftliche Deutung dieser Ereignisse.',
    historicalPeriod: 'Mittelalterliche Handschrift (ca. 11. Jahrhundert), basierend auf Macrobius',
    macrobiusConnection: 'Macrobius erklärte Finsternisse als natürliche Folge der Planetenbewegungen - eine revolutionäre Sichtweise füer seine Zeit, die Aberglauben durch Wissenschaft ersetzte.',
    tychoConnection: 'Tycho Brahe nutzte ähnliche geometrische Methoden, um Finsternisse vorherzusagen, und bestätigte dabei die Genauigkeit von Macrobius\' grundlegenden Prinzipien.',
    modernRelevance: 'Die geometrischen Grundlagen der Finsternis-Berechnung sind heute noch dieselben. NASA-Berechnungen verwenden verfeinerte Versionen derselben mathematischen Prinzipien.',
    latinQuote: 'Eclipsis naturalis cursus, non prodigium',
    translation: 'Finsternisse sind natürliche Abläufe, keine Wunderzeichen',
    tags: ['Finsternisse', 'Geometrie', 'Wissenschaftlichkeit', 'Astronomie'],
    relatedImages: ['macrobius-universe', 'astrolabe'],
    section: 'cosmos'
  },

  // WORLD MAP SECTION IMAGES
  'macrobius-erdkarte': {
    id: 'macrobius-erdkarte',
    src: '/Macrobius-Erdkarte.jpg',
    title: 'Macrobius\' Erdkarte',
    subtitle: 'Die fünf Klimazonen der Erde',
    description: 'Diese Karte zeigt Macrobius\' Theorie der fünf Klimazonen: zwei kalte Polarzonen, zwei gemäßigte Zonen und eine heiße Äquatorzone. Eine bemerkenswert genaue Beschreibung für das 5. Jahrhundert.',
    culturalContext: 'Macrobius\' Klimatheorie beeinflusste die mittelalterliche Geographie und Ethnographie. Sie erklärte, warum verschiedene Völker unterschiedliche Körpertypen und Kulturen entwickelten.',
    historicalPeriod: '5. Jahrhundert n. Chr., überliefert in mittelalterlichen Handschriften',
    macrobiusConnection: 'Diese Karte basiert direkt auf Macrobius\' Text-Beschreibungen der Erdgeographie in seinem Somnium-Kommentar. Sie zeigt sein systematisches Verständnis globaler Klimasysteme.',
    tychoConnection: 'Tycho Brahe nutzte ähnliche Breitengrad-Messungen für seine präzisen astronomischen Beobachtungen und bestätigte dabei Macrobius\' geographische Prinzipien.',
    modernRelevance: 'Moderne Klimaforschung bestätigt Macrobius\' Grundeinteilung. Die Köppen-Klimaklassifikation basiert auf ähnlichen Temperatur- und Breitengrad-Prinzipien.',
    latinQuote: 'Quinque sunt climata terrae habitabilis',
    translation: 'Fünf sind die Klimazonen der bewohnbaren Erde',
    tags: ['Geographie', 'Klimazonen', 'Kartographie', 'Wissenschaft'],
    relatedImages: ['mappa-mundi', 'rome-under'],
    section: 'worldmap'
  },

  'mappa-mundi': {
    id: 'mappa-mundi',
    src: '/mappa-mundi.jpg',
    title: 'Mappa Mundi',
    subtitle: 'Mittelalterliche Weltkarte nach Macrobius',
    description: 'Eine typische mittelalterliche Weltkarte, die auf Macrobius\' geographischen Beschreibungen basiert. Jerusalem steht im Zentrum, umgeben von den drei bekannten Kontinenten.',
    culturalContext: 'Diese Karten vereinten wissenschaftliche Geographie mit christlicher Theologie. Macrobius\' rationale Klimatheorie wurde mit biblischer Weltgeschichte verknüpft.',
    historicalPeriod: 'Mittelalter (12.-14. Jahrhundert)',
    macrobiusConnection: 'Die wissenschaftlichen Grundlagen dieser Karte - Klimazonen, Kontinentgrenzen, Ozeanströmungen - stammen direkt aus Macrobius\' Texten.',
    tychoConnection: 'Tycho verwendete genauere Karten für seine Beobachtungen, aber die Grundprinzipien der Koordinaten-Systeme gingen auf Macrobius zurück.',
    modernRelevance: 'Moderne GPS-Systeme verwenden dieselben sphärischen Koordinaten-Prinzipien, die bereits Macrobius für die Kartographie entwickelte.',
    latinQuote: 'Orbis terrarum in tres partes divisus',
    translation: 'Die Erdkugel ist in drei Teile geteilt',
    tags: ['Mittelalterliche Kartographie', 'Weltbild', 'Geographie', 'Christentum'],
    relatedImages: ['macrobius-erdkarte', 'rome-under'],
    section: 'worldmap'
  },

  'rome-under': {
    id: 'rome-under',
    src: '/Rome-under.jpg',
    title: 'Das untergehende Rom',
    subtitle: 'Kultureller Niedergang und Bewahrung',
    description: 'Eine symbolische Darstellung des untergehenden römischen Reiches zur Zeit des Macrobius. Während das politische Rom verfiel, bewahrten Gelehrte wie Macrobius die kulturellen Schätze.',
    culturalContext: 'Macrobius lebte in einer Zeit des Umbruchs. Das weströmische Reich zerfiel politisch, aber die kulturelle Elite bemühte sich intensiv um die Erhaltung der klassischen Bildung.',
    historicalPeriod: '5. Jahrhundert n. Chr., Zeit der Völkerwanderung',
    macrobiusConnection: 'Macrobius verstand seine Mission als Kulturbewahrer. Seine Werke sollten das Beste der römischen Zivilisation für bessere Zeiten bewahren.',
    tychoConnection: 'Wie Macrobius in der Spätantike bewahrte Tycho in der Renaissance antikes Wissen und verband es mit neuen Entdeckungen.',
    modernRelevance: 'Kulturelle Kontinuität in Krisenzeiten ist ein zeitloses Thema. Digitale Archive heute erfüllen eine ähnliche Funktion wie Macrobius\' Texte damals.',
    latinQuote: 'In ruinis imperii, sapientia manet',
    translation: 'In den Ruinen des Reiches bleibt die Weisheit bestehen',
    tags: ['Spätantike', 'Kultureller Niedergang', 'Kulturbewahrung', 'Geschichtsphilosophie'],
    relatedImages: ['macrobius-portrait', 'byzanz-mosaik'],
    section: 'worldmap'
  },

  // BANQUET SECTION IMAGES
  'symposion': {
    id: 'symposion',
    src: '/Symposion.jpg',
    title: 'Römisches Symposion',
    subtitle: 'Gelehrtes Gastmahl der Saturnalien',
    description: 'Eine Darstellung des idealen römischen Gastmahls, wie es Macrobius in seinen Saturnalien beschreibt. Gelehrte Diskussion verbindet sich mit kultiviertem Genuss.',
    culturalContext: 'Das Symposion war der Höhepunkt römischer Bildungskultur. Hier trafen sich die geistigen Eliten, um in entspannter Atmosphäre über Philosophie, Literatur und Wissenschaft zu diskutieren.',
    historicalPeriod: '4.-5. Jahrhundert n. Chr., römische Oberschicht',
    macrobiusConnection: 'Macrobius\' Saturnalien sind das literarische Denkmal dieser Kultur. Er zeigt, wie Bildung durch gesellige Gespräche lebendig gehalten wurde.',
    tychoConnection: 'Renaissance-Gelehrte wie Tycho pflegten ähnliche Traditionen gelehrter Gespräche, oft inspiriert durch die Lektüre antiker Texte wie Macrobius.',
    modernRelevance: 'Moderne "Think Tanks" und akademische Kolloquien folgen ähnlichen Prinzipien: Informeller Austausch fördert kreatives Denken.',
    latinQuote: 'In convivio sapientia nascitur',
    translation: 'Im Gastmahl wird Weisheit geboren',
    tags: ['Symposion', 'Römische Kultur', 'Bildungsgesellschaft', 'Saturnalien'],
    relatedImages: ['symposion-2', 'wand-symposion'],
    section: 'banquet'
  },

  'symposion-2': {
    id: 'symposion-2',
    src: '/Symposion-2.jpg',
    title: 'Philosophisches Gespräch',
    subtitle: 'Gelehrte im Dialog',
    description: 'Eine weitere Szene aus einem römischen Gelehrtensymposion. Die Teilnehmer diskutieren komplexe philosophische Fragen in der lockeren Atmosphäre des Festmahls.',
    culturalContext: 'Diese Szenen zeigen, wie römische Bildungskultur funktionierte: Nicht durch formalen Unterricht, sondern durch lebendigen Austausch zwischen Gleichgesinnten verschiedener Generationen.',
    historicalPeriod: '4.-5. Jahrhundert n. Chr.',
    macrobiusConnection: 'Macrobius strukturierte seine Saturnalien genau nach solchen Gesprächsszenen. Jeder Teilnehmer repräsentiert einen anderen Aspekt römischer Gelehrsamkeit.',
    tychoConnection: 'Tycho Brahe lud regelmäßig Gelehrte zu ähnlichen Diskussionsrunden ein, wo antike Texte mit neuen Beobachtungen diskutiert wurden.',
    modernRelevance: 'Interdisziplinäre Forschung heute basiert auf ähnlichen Prinzipien: Verschiedene Experten treffen sich zum informellen, aber strukturierten Austausch.',
    latinQuote: 'Varietas doctorum, unitas sapientiae',
    translation: 'Vielfalt der Gelehrten, Einheit der Weisheit',
    tags: ['Philosophie', 'Diskussion', 'Interdispziplinarität', 'Römische Bildung'],
    relatedImages: ['symposion', 'wand-symposion'],
    section: 'banquet'
  },

  'wand-symposion': {
    id: 'wand-symposion',
    src: '/WandSymposion.jpg',
    title: 'Symposion-Wandmalerei',
    subtitle: 'Kunst und Gelehrsamkeit',
    description: 'Eine Wandmalerei, die ein gelehrtes Symposion darstellt. Solche Kunstwerke zierten die Häuser der römischen Bildungselite und zeigten ihre kulturellen Werte.',
    culturalContext: 'Diese Malereien waren mehr als Dekoration - sie waren Statements. Sie zeigten Besuchern, dass hier Menschen lebten, die sich der klassischen Bildungstradition verpflichtet fühlten.',
    historicalPeriod: '3.-5. Jahrhundert n. Chr., römische Villa',
    macrobiusConnection: 'Macrobius beschreibt in den Saturnalien genau solche Szenen. Die Kunstwerke und seine Texte dokumentieren dieselbe Kultur aus verschiedenen Perspektiven.',
    tychoConnection: 'Renaissance-Gelehrte wie Tycho ließen ihre Studien mit ähnlichen klassischen Motiven ausstatten, um ihre Verbindung zur antiken Tradition zu zeigen.',
    modernRelevance: 'Moderne Universitäten und Forschungseinrichtungen verwenden ähnliche symbolische Gestaltung, um ihre intellektuellen Traditionen zu kommunizieren.',
    latinQuote: 'Ars et scientia in concordia',
    translation: 'Kunst und Wissenschaft in Eintracht',
    tags: ['Römische Kunst', 'Wandmalerei', 'Kulturelle Identität', 'Bildungsideal'],
    relatedImages: ['symposion', 'symposion-2'],
    section: 'banquet'
  },

  // PORTRAIT IMAGES
  'macrobius-portrait': {
    id: 'macrobius-portrait',
    src: '/MacrobI.JPG',
    title: 'Macrobius Ambrosius Theodosius',
    subtitle: 'Der Kulturbewahrer der Spätantike',
    description: 'Ein idealisiertes Portrait des Macrobius aus einer mittelalterlichen Handschrift. Dargestellt als weiser Gelehrter mit den Attributen des Schreibers und Philosophen.',
    culturalContext: 'Mittelalterliche Künstler stellten Macrobius als Idealtyp des christlichen Gelehrten dar, der antike Weisheit mit christlicher Lehre versöhnte.',
    historicalPeriod: 'Mittelalterliche Darstellung (ca. 12. Jahrhundert) einer Figur des 5. Jahrhunderts',
    macrobiusConnection: 'Dieses Portrait zeigt, wie das Mittelalter Macrobius sah: Als Autorität für Kosmologie, Grammatik und Philosophie - einen der letzten großen Gelehrten der Antike.',
    tychoConnection: 'Tycho Brahe besass vermutlich ähnliche Portraits in seiner Bibliothek und sah in Macrobius einen Vordenker der Verbindung von Theorie und Beobachtung.',
    modernRelevance: 'Macrobius als "Wissensmanger" der Spätantike ist ein frühes Beispiel für systematische Wissenssicherung und -übertragung.',
    latinQuote: 'Sapientiae custos et traditor',
    translation: 'Hüter und Überlieferer der Weisheit',
    tags: ['Macrobius', 'Portrait', 'Mittelalterliche Buchmalerei', 'Gelehrtenideal'],
    relatedImages: ['macrobius-and-eustachius', 'macrobius-regal'],
    section: 'intro'
  },

  'macrobius-and-eustachius': {
    id: 'macrobius-and-eustachius',
    src: '/Macrobius-and-Eustachius.jpg',
    title: 'Macrobius und Eustachius',
    subtitle: 'Lehrer und Schüler im Dialog',
    description: 'Eine Darstellung des Macrobius im Gespräch mit seinem Sohn Eustachius, dem er seine Werke widmete. Diese Szene symbolisiert die Übertragung von Wissen von einer Generation zur nächsten.',
    culturalContext: 'Die Vater-Sohn-Beziehung in der römischen Bildungskultur war zentral. Väter waren verantwortlich für die intellektuelle Entwicklung ihrer Söhne.',
    historicalPeriod: 'Mittelalterliche Darstellung der Beziehung aus dem 5. Jahrhundert',
    macrobiusConnection: 'Macrobius schrieb seine Saturnalien explizit für seinen Sohn Eustachius, um ihm die beste römische Bildungstradition zu übermitteln.',
    tychoConnection: 'Tycho Brahe folgte einem ähnlichen Modell und bildete junge Astronomen aus, um sein Wissen weiterzugeben.',
    modernRelevance: 'Die Mentor-Schüler-Beziehung bleibt in der Wissenschaft fundamental - von der Doktorarbeit bis zur Forschungsgruppe.',
    latinQuote: 'Filio carissimo scientiam trado',
    translation: 'Dem liebsten Sohn übergebe ich das Wissen',
    tags: ['Bildung', 'Generationenwechsel', 'Vater-Sohn', 'Wissensvermittlung'],
    relatedImages: ['macrobius-portrait', 'macrobius-regal'],
    section: 'intro'
  },

  'macrobius-regal': {
    id: 'macrobius-regal',
    src: '/MacrobiRegal.jpg',
    title: 'Macrobius\' Bibliothek',
    subtitle: 'Die Sammlung antiker Weisheit',
    description: 'Eine Darstellung von Macrobius in seiner Bibliothek, umgeben von den Texten der klassischen Autoren. Seine Werke entstanden durch intensive Quellenarbeit.',
    culturalContext: 'Private Bibliotheken waren das Herzstück römischer Gelehrsamkeit. Hier wurde antikes Wissen gesammelt, kommentiert und für die Zukunft bewahrt.',
    historicalPeriod: 'Idealisierte Darstellung einer spätantiken Gelehrtenbibliothek',
    macrobiusConnection: 'Macrobius zitiert in seinen Werken hunderte von Autoren. Diese Bibliothek zeigt die Grundlage seiner enzyklopädischen Gelehrsamkeit.',
    tychoConnection: 'Tycho Brahe baute eine ähnliche Bibliothek auf Hven auf, wo er antike astronomische Texte mit seinen eigenen Beobachtungen verglich.',
    modernRelevance: 'Digitale Bibliotheken und Datenbanken erfüllen heute dieselbe Funktion: Sie ermöglichen den Zugang zu und die Synthese von Wissen.',
    latinQuote: 'Ex libris sapientia nascitur',
    translation: 'Aus Büchern wird Weisheit geboren',
    tags: ['Bibliothek', 'Quellenarbeit', 'Gelehrsamkeit', 'Textgeschichte'],
    relatedImages: ['macrobius-portrait', 'johannes-pontanus'],
    section: 'intro'
  },

  'johannes-pontanus': {
    id: 'johannes-pontanus',
    src: '/Johannes-Pontanus.JPG',
    title: 'Johannes Isaac Pontanus',
    subtitle: 'Der Renaissance-Editor',
    description: 'Portrait des Johannes Isaac Pontanus (1571-1639), des dänischen Gelehrten, der 1597 die erste kritische Gesamtausgabe von Macrobius\' Werken erstellte.',
    culturalContext: 'Pontanus verkörperte den Renaissance-Humanismus: die Verbindung von philologischer Genauigkeit mit wissenschaftlicher Innovation.',
    historicalPeriod: '1597, Dänemark zur Zeit Tycho Brahes',
    macrobiusConnection: 'Pontanus erkannte Macrobius als Schlüsselfigur für das Verständnis antiker Wissenschaft und machte seine Texte für die moderne Forschung zugänglich.',
    tychoConnection: 'Als enger Mitarbeiter Tycho Brahes verband Pontanus astronomische Beobachtung mit historisch-philologischer Forschung.',
    modernRelevance: 'Pontanus\' Methode - kritische Textedition kombiniert mit wissenschaftlicher Anwendung - ist heute Standard in den Digital Humanities.',
    latinQuote: 'Veterum monumenta novis studiis illustranda',
    translation: 'Die Denkmäler der Alten müssen durch neue Studien erhellt werden',
    tags: ['Renaissance', 'Textedition', 'Humanismus', 'Wissenschaftsgeschichte'],
    relatedImages: ['tycho-assistant', 'macrobius-regal'],
    section: 'intro'
  },

  'byzanz-mosaik': {
    id: 'byzanz-mosaik',
    src: '/Byzanz-Mosaik.jpeg',
    title: 'Byzantinisches Mosaik',
    subtitle: 'Kontinuität der antiken Bildung',
    description: 'Ein byzantinisches Mosaik, das die Fortsetzung der klassischen Bildungstradition im Oströmischen Reich zeigt. Hier überlebten viele antike Texte, die im Westen verloren gingen.',
    culturalContext: 'Byzanz bewahrte die griechisch-römische Bildungstradition über ein Jahrtausend. Macrobius\' Werke wurden hier kopiert und studiert.',
    historicalPeriod: '6.-10. Jahrhundert, Byzantinisches Reich',
    macrobiusConnection: 'Byzantinische Gelehrte kopierten und kommentierten Macrobius\' Texte, besonders seine astronomischen und mathematischen Abschnitte.',
    tychoConnection: 'Viele der antiken Texte, die Tycho studierte, waren nur dank byzantinischer Kopisten überliefert worden.',
    modernRelevance: 'Die byzantinische Rolle als "Kulturkonservator" zeigt, wie wichtig institutionelle Kontinuität für die Erhaltung von Wissen ist.',
    latinQuote: 'Oriens lux, occidens tenebrae',
    translation: 'Der Osten ist Licht, der Westen Finsternis',
    tags: ['Byzanz', 'Kulturkontinuität', 'Handschriften', 'Bildungsgeschichte'],
    relatedImages: ['rome-under', 'macrobius-portrait'],
    section: 'worldmap'
  }
};

// Helper functions for image integration
export const getImagesBySection = (section: string): ImageInfo[] => {
  return Object.values(imageDatabase).filter(image => image.section === section);
};

export const getImageById = (id: string): ImageInfo | undefined => {
  return imageDatabase[id];
};

export const getRelatedImages = (imageId: string): ImageInfo[] => {
  const image = imageDatabase[imageId];
  if (!image || !image.relatedImages) return [];
  
  return image.relatedImages
    .map(id => imageDatabase[id])
    .filter(img => img !== undefined);
};

export const searchImages = (query: string): ImageInfo[] => {
  const lowerQuery = query.toLowerCase();
  return Object.values(imageDatabase).filter(image => 
    image.title.toLowerCase().includes(lowerQuery) ||
    image.description.toLowerCase().includes(lowerQuery) ||
    image.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
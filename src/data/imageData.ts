export interface ImageInfo {
  id: string;
  title: string;
  subtitle?: string;
  src: string;
  description: string;
  section: string;
  tags: string[];
  culturalContext?: {
    period?: string;
    significance?: string;
    modernRelevance?: string;
  };
}

// Enhanced Image Database with Cultural Context
export const imageDatabase: ImageInfo[] = [
  {
    id: 'macrobius-portrait',
    title: 'Macrobius Idealportrait',
    subtitle: 'Mit der Flaschenpost in der Hand',
    src: '/Macrobius-Idealportrait.jpg',
    description: 'Idealisierte Darstellung des Macrobius als Kulturbewahrer - mit seiner symbolischen "Flaschenpost" voller antiker Weisheit für zukünftige Generationen.',
    section: 'intro',
    tags: ['portrait', 'macrobius', 'culture', 'antiquity'],
    culturalContext: {
      period: 'Spätantike (ca. 400 n.Chr.)',
      significance: 'Macrobius als Brückenbauer zwischen antikem und mittelalterlichem Wissen',
      modernRelevance: 'Symbol für die Bewahrung kultureller Werte in Zeiten des Wandels'
    }
  },
  {
    id: 'roman-ruins',
    title: 'Antike Ruinen',
    subtitle: 'Zeugnisse vergangener Größe',
    src: '/RoemischeRuinen.jpg',
    description: 'Römische Ruinenlandschaft als Symbol der untergehenden antiken Welt, die Macrobius zu bewahren suchte.',
    section: 'intro',
    tags: ['ruins', 'rome', 'antiquity', 'decline'],
    culturalContext: {
      period: 'Spätantike',
      significance: 'Zeugnis des kulturellen Umbruchs zur Zeit des Macrobius',
      modernRelevance: 'Mahnung zur Bewahrung kultureller Errungenschaften'
    }
  },
  {
    id: 'tycho-assistant',
    title: 'Tycho Brahes Assistent',
    subtitle: 'Pontanus bei astronomischen Beobachtungen',
    src: '/TychoAssistent.jpg',
    description: 'Johannes Isaac Pontanus als Assistent von Tycho Brahe - der Gelehrte, der Macrobius für die Neuzeit wiederentdeckte.',
    section: 'intro',
    tags: ['pontanus', 'tycho', 'astronomy', 'renaissance'],
    culturalContext: {
      period: 'Renaissance (ca. 1590)',
      significance: 'Wiederentdeckung antiker Weisheit durch moderne Wissenschaft',
      modernRelevance: 'Kontinuität wissenschaftlicher Erkenntnis durch die Jahrhunderte'
    }
  },
  {
    id: 'macrobius-library',
    title: 'Macrobius in seiner Bibliothek',
    subtitle: 'Pontanus Edition von 1597',
    src: '/MacrobiusBibliothek.jpg',
    description: 'Persönliche Verbindung: Die historische Pontanus-Edition von 1597 in der Bibliothek des App-Entwicklers.',
    section: 'intro',
    tags: ['library', 'books', 'pontanus', 'edition'],
    culturalContext: {
      period: 'Renaissance bis heute',
      significance: 'Kontinuität der Wissensvermittlung von der Renaissance bis zur digitalen Gegenwart',
      modernRelevance: 'Verbindung zwischen historischen Büchern und moderner Technologie'
    }
  },
  {
    id: 'ancient-banquet',
    title: 'Römisches Gastmahl',
    subtitle: 'Saturnalien-Fest',
    src: '/RoemischesGastmahl.jpg',
    description: 'Darstellung eines römischen Banketts zur Zeit der Saturnalien - der literarische Rahmen von Macrobius Hauptwerk.',
    section: 'banquet',
    tags: ['banquet', 'saturnalia', 'rome', 'feast'],
    culturalContext: {
      period: 'Klassische Antike',
      significance: 'Gesellige Bildungskultur als Ideal der Antike',
      modernRelevance: 'Vorbild für moderne Diskussionskultur und Bildungsgemeinschaften'
    }
  },
  {
    id: 'classical-scholars',
    title: 'Gelehrte im Gespräch',
    subtitle: 'Antike Diskussionskultur',
    src: '/GelehrteGespraech.jpg',
    description: 'Gelehrte Römer im Gespräch über Literatur und Philosophie - wie in Macrobius Saturnalien beschrieben.',
    section: 'banquet',
    tags: ['scholars', 'discussion', 'philosophy', 'education'],
    culturalContext: {
      period: 'Spätantike',
      significance: 'Ideale Bildungsgemeinschaft als Gegenmodell zum kulturellen Niedergang',
      modernRelevance: 'Inspiration für moderne Lerngemeinschaften und Bildungsideale'
    }
  },
  {
    id: 'ancient-world-map',
    title: 'Antike Weltkarte',
    subtitle: 'Geographisches Weltbild der Antike',
    src: '/AntikeWeltkarte.jpg',
    description: 'Mittelalterliche Weltkarte basierend auf antiken Quellen - zeigt das geographische Verständnis zur Zeit des Macrobius.',
    section: 'worldmap',
    tags: ['map', 'geography', 'world', 'knowledge'],
    culturalContext: {
      period: 'Spätantike/Mittelalter',
      significance: 'Bewahrung antiken geographischen Wissens',
      modernRelevance: 'Entwicklung wissenschaftlicher Weltbilder durch die Jahrhunderte'
    }
  },
  {
    id: 'cosmos-diagram',
    title: 'Kosmologisches Diagramm',
    subtitle: 'Macrobius Weltbild',
    src: '/KosmologieSchema.jpg',
    description: 'Diagramm der Sphärenharmonie nach Macrobius - Verbindung von Astronomie, Musik und Philosophie.',
    section: 'cosmos',
    tags: ['cosmos', 'spheres', 'harmony', 'astronomy'],
    culturalContext: {
      period: 'Spätantike',
      significance: 'Integration verschiedener Wissenschaftsbereiche zu einem Weltbild',
      modernRelevance: 'Vorbild für interdisziplinäre Wissenschaft'
    }
  },
  {
    id: 'medieval-manuscript',
    title: 'Mittelalterliche Handschrift',
    subtitle: 'Macrobius-Überlieferung',
    src: '/MittelalterlicheHandschrift.jpg',
    description: 'Mittelalterliche Handschrift der Macrobius-Werke - Zeugnis der kontinuierlichen Überlieferung antiker Bildung.',
    section: 'visualizations',
    tags: ['manuscript', 'medieval', 'preservation', 'tradition'],
    culturalContext: {
      period: 'Mittelalter',
      significance: 'Bewahrung antiker Texte durch mittelalterliche Gelehrte',
      modernRelevance: 'Wichtigkeit kultureller Überlieferung für die Zivilisation'
    }
  }
];

// Helper function to get images by section
export function getImagesBySection(section: string): ImageInfo[] {
  return imageDatabase.filter(image => image.section === section);
}

// Helper function to get image by ID
export function getImageById(id: string): ImageInfo | undefined {
  return imageDatabase.find(image => image.id === id);
}

// Helper function to search images by tags
export function searchImagesByTags(tags: string[]): ImageInfo[] {
  return imageDatabase.filter(image => 
    tags.some(tag => image.tags.includes(tag.toLowerCase()))
  );
}

// Helper function to get random images
export function getRandomImages(count: number): ImageInfo[] {
  const shuffled = [...imageDatabase].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
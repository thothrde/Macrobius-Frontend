export const supportedLanguages = ['DE', 'EN', 'LA'] as const;
export type Language = typeof supportedLanguages[number];

export const translations = {
  DE: {
    intro: 'Einführung',
    worldMap: 'Weltkarte',
    cosmos: 'Kosmos',
    banquet: 'Gastmahl',
    textSearch: 'Textsuche',
    loading: 'Wird geladen...',
    error: 'Ein Fehler ist aufgetreten',
  },
  EN: {
    intro: 'Introduction',
    worldMap: 'World Map',
    cosmos: 'Cosmos',
    banquet: 'Banquet',
    textSearch: 'Text Search',
    loading: 'Loading...',
    error: 'An error occurred',
  },
  LA: {
    intro: 'Introductio',
    worldMap: 'Mappa Mundi',
    cosmos: 'Cosmos',
    banquet: 'Convivium',
    textSearch: 'Quaestio Textus',
    loading: 'Oneratur...',
    error: 'Error accidit',
  },
} as const;
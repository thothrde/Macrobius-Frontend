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
    about_works: `Seine beiden Hauptwerke sin
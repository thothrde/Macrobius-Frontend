import React, { useState } from 'react';

interface VocabularyTrainerProps {
  isActive: boolean;
  t: (key: string) => string;
  language?: 'DE' | 'EN' | 'LA';
}

function VocabularyTrainer({ isActive, t, language = 'DE' }: VocabularyTrainerProps) {
  if (!isActive) return null;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8">
          <h2 className="text-4xl font-bold text-yellow-400 mb-8">
            📚 Vokabeltrainer
          </h2>
          
          <p className="text-xl text-white/90 mb-8">
            Lateinische Vokabeln mit authentischen Macrobius-Texten lernen
          </p>
          
          <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-6 mb-8">
            <div className="text-white/90 space-y-4">
              <p className="text-lg font-semibold">✅ Oracle Cloud Integration verfügbar!</p>
              <div className="text-left space-y-2">
                <p><strong>Lernmöglichkeiten:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Authentische lateinische Vokabeln aus 1.401 Passagen</li>
                  <li>Kultureller Kontext für jedes Wort</li>
                  <li>Häufigkeitsanalyse und Verwendungsbeispiele</li>
                  <li>Thematische Gruppierung nach 9 Kulturthemen</li>
                  <li>Progressive Schwierigkeitsstufen</li>
                </ul>
                <p><strong>Corpus-integrierte Version:</strong> <code className="text-yellow-300">VocabularyTrainer-corpus-integrated.tsx</code> verfügbar</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-purple-500/20 border border-purple-400/50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-purple-300 mb-3">🎯 Nächste Entwicklungsschritte:</h4>
              <div className="text-left text-white/90 space-y-2 text-sm">
                <p>1. <strong>Corpus-Integration aktivieren:</strong> VocabularyTrainer-corpus-integrated.tsx verwenden</p>
                <p>2. <strong>Quiz-Modus:</strong> Interaktive Vokabelabfrage implementieren</p>
                <p>3. <strong>Lernfortschritt:</strong> Benutzerfortschritt und Wiederholungsalgorithmus</p>
                <p>4. <strong>Kulturkontext:</strong> Historische Erklärungen zu jedem Wort</p>
                <p>5. <strong>Schwierigkeitsgrade:</strong> Anfänger bis Fortgeschrittene</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VocabularyTrainer;
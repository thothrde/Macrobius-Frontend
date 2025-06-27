#!/bin/bash

echo "🔧 SOFORTIGE TRANSLATION-REPARATUR"
echo "===================================="
echo ""
echo "❌ Problem: Meine Translation-Fixes haben NICHT funktioniert!"
echo "✅ Lösung: Komplette Cache-Bereinigung und Neustart"
echo ""

# Zum Repository-Verzeichnis wechseln
cd /Volumes/CLAUDE-DATA/Macrobius-Github/Current-Repository

echo "🧹 SCHRITT 1: Cache löschen..."
echo "-------------------------------"

# Next.js Cache komplett löschen
echo "📂 Lösche .next Cache..."
rm -rf .next

echo "📂 Lösche node_modules Cache..."
rm -rf node_modules/.cache

echo "📂 Lösche Vercel Cache..."
rm -rf .vercel

echo "📂 Lösche Service Worker..."
rm -rf public/sw.js*

echo "📂 Lösche Build-Logs..."
rm -f build_*.log

echo ""
echo "🔄 SCHRITT 2: Node Prozesse beenden..."
echo "--------------------------------------"

# Alle Node-Prozesse beenden (falls welche laufen)
pkill -f "next dev" 2>/dev/null || true
pkill -f "npm run dev" 2>/dev/null || true

echo ""
echo "⚡ SCHRITT 3: Development Server starten..."
echo "-------------------------------------------"

echo "🚀 Starte npm run dev..."
echo ""
echo "✅ ERWARTETE ERGEBNISSE:"
echo "   - Navigation zeigt 'Entdecken Sie Macrobius' (nicht 'nav.intro')"
echo "   - Hero zeigt 'Bildungsplattform für klassische Kultur' (nicht 'hero.badge')"
echo "   - Sprachschalter DE/EN/LA funktionieren"
echo ""
echo "🌐 Browser öffnen: http://localhost:3000"
echo "💡 Hard Refresh: Ctrl+Shift+R (Chrome/Edge) oder Ctrl+F5 (Firefox)"
echo ""

# Development Server starten
npm run dev
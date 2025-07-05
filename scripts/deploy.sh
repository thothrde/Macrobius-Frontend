#!/bin/bash

# 🚀 MACROBIUS VERCEL DEPLOYMENT SCRIPT
# Automatisches Deployment der Macrobius-Plattform auf Vercel

echo "🏛️ MACROBIUS VERCEL DEPLOYMENT SCRIPT"
echo "====================================="
echo ""

# Farben für bessere Lesbarkeit
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Schritt 1: Voraussetzungen prüfen
echo -e "${BLUE}📋 Schritt 1: Voraussetzungen prüfen...${NC}"

# Node.js Version prüfen
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js ist nicht installiert. Bitte installieren Sie Node.js >= 18.0.0${NC}"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d 'v' -f 2)
echo -e "${GREEN}✅ Node.js Version: $NODE_VERSION${NC}"

# NPM Version prüfen
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ NPM ist nicht installiert${NC}"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo -e "${GREEN}✅ NPM Version: $NPM_VERSION${NC}"

# Vercel CLI prüfen
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️ Vercel CLI nicht gefunden. Installiere...${NC}"
    npm install -g vercel
fi

echo -e "${GREEN}✅ Vercel CLI verfügbar${NC}"
echo ""

# Schritt 2: Dependencies installieren
echo -e "${BLUE}📦 Schritt 2: Dependencies installieren...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Fehler beim Installieren der Dependencies${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dependencies installiert${NC}"
echo ""

# Schritt 3: Lokaler Build-Test
echo -e "${BLUE}🔧 Schritt 3: Lokaler Build-Test...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build-Fehler gefunden. Bitte beheben Sie die Fehler vor dem Deployment${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build erfolgreich${NC}"
echo ""

# Schritt 4: TypeScript Check
echo -e "${BLUE}🔍 Schritt 4: TypeScript Check...${NC}"
npm run type-check
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ TypeScript-Fehler gefunden. Bitte beheben Sie die Fehler vor dem Deployment${NC}"
    exit 1
fi
echo -e "${GREEN}✅ TypeScript Check erfolgreich${NC}"
echo ""

# Schritt 5: Lint Check
echo -e "${BLUE}🧹 Schritt 5: Lint Check...${NC}"
npm run lint
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️ Lint-Warnungen gefunden. Deployment wird fortgesetzt...${NC}"
else
    echo -e "${GREEN}✅ Lint Check erfolgreich${NC}"
fi
echo ""

# Schritt 6: Oracle Cloud Connection Test
echo -e "${BLUE}🔌 Schritt 6: Oracle Cloud Connection Test...${NC}"
npm run oracle-test
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️ Oracle Cloud Connection Test fehlgeschlagen. RAG-System möglicherweise nicht verfügbar${NC}"
    echo -e "${YELLOW}Deployment wird fortgesetzt, aber RAG-Features funktionieren möglicherweise nicht${NC}"
else
    echo -e "${GREEN}✅ Oracle Cloud Connection erfolgreich${NC}"
fi
echo ""

# Schritt 7: Deployment-Typ auswählen
echo -e "${BLUE}🚀 Schritt 7: Deployment-Typ auswählen...${NC}"
echo "Welches Deployment möchten Sie durchführen?"
echo "1) Preview Deployment (zum Testen)"
echo "2) Production Deployment (Live-Version)"
echo "3) Abbrechen"
echo ""
read -p "Wählen Sie eine Option (1-3): " choice

case $choice in
    1)
        echo -e "${YELLOW}📋 Preview Deployment wird gestartet...${NC}"
        echo ""
        vercel
        if [ $? -eq 0 ]; then
            echo ""
            echo -e "${GREEN}🎉 Preview Deployment erfolgreich!${NC}"
            echo -e "${GREEN}🔗 Testen Sie Ihre App unter der angegebenen URL${NC}"
            echo -e "${GREEN}📋 Führen Sie nach dem Testen ein Production Deployment durch${NC}"
        else
            echo -e "${RED}❌ Preview Deployment fehlgeschlagen${NC}"
            exit 1
        fi
        ;;
    2)
        echo -e "${YELLOW}🚨 Production Deployment wird gestartet...${NC}"
        echo -e "${YELLOW}Dies wird Ihre Live-Website aktualisieren!${NC}"
        echo ""
        read -p "Sind Sie sicher? (y/N): " confirm
        if [[ $confirm =~ ^[Yy]$ ]]; then
            vercel --prod
            if [ $? -eq 0 ]; then
                echo ""
                echo -e "${GREEN}🎉🎉🎉 PRODUCTION DEPLOYMENT ERFOLGREICH! 🎉🎉🎉${NC}"
                echo -e "${GREEN}🌐 Ihre Macrobius-Plattform ist jetzt live!${NC}"
                echo -e "${GREEN}🔗 URL: https://macrobius.vercel.app${NC}"
                echo ""
                echo -e "${BLUE}📋 Nächste Schritte:${NC}"
                echo "   1. Testen Sie alle Features auf der Live-Website"
                echo "   2. Überprüfen Sie die Performance im Vercel Dashboard"
                echo "   3. Testen Sie besonders den KI-RAG-Assistenten"
                echo "   4. Teilen Sie die URL mit Ihren Nutzern!"
                echo ""
                echo -e "${GREEN}🏛️ Herzlichen Glückwunsch zum Launch Ihrer AI-gesteuerten Lateinlernplattform! 🏛️${NC}"
            else
                echo -e "${RED}❌ Production Deployment fehlgeschlagen${NC}"
                exit 1
            fi
        else
            echo -e "${YELLOW}Deployment abgebrochen${NC}"
            exit 0
        fi
        ;;
    3)
        echo -e "${YELLOW}Deployment abgebrochen${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}❌ Ungültige Option${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✨ Deployment-Script beendet ✨${NC}"
echo ""
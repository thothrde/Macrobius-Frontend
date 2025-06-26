#!/bin/bash

# 🔄 MACROBIUS WEB VERSION - FIX CACHE & RESTART
# Run this script to fix the translation display issue

echo "🏛️ MACROBIUS - Fixing Translation Display Issue"
echo "================================================"

# Stop any running development server
echo "1️⃣ Stopping development server..."
pkill -f "next dev" 2>/dev/null || true
pkill -f "npm run dev" 2>/dev/null || true

# Clear Next.js cache
echo "2️⃣ Clearing Next.js cache..."
rm -rf .next
rm -rf node_modules/.cache

# Clear browser cache instruction
echo "3️⃣ IMPORTANT: Clear your browser cache!"
echo "   - Chrome/Edge: Ctrl+Shift+R (hard refresh)"
echo "   - Firefox: Ctrl+F5"
echo "   - Safari: Cmd+Option+R"

# Restart development server
echo "4️⃣ Starting fresh development server..."
echo ""
echo "🚀 Run this command to start the server:"
echo "   npm run dev"
echo ""
echo "💡 If you still see technical keys like 'nav.intro':"
echo "   1. Hard refresh browser (Ctrl+Shift+R)"
echo "   2. Open DevTools and disable cache"
echo "   3. Check language selector (top right)"
echo ""
echo "✅ The translations should now work properly!"
echo "   German: 'Entdecken Sie Macrobius'"
echo "   English: 'Discover Macrobius'"
echo "   Latin: 'Macrobium Inveniendi'"

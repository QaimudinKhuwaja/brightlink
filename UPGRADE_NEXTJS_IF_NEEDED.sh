#!/bin/bash
# Run this script ONLY if output: standalone still fails

echo "Upgrading Next.js to fix build tracer bug..."

# Backup package.json
cp package.json package.json.backup

# Upgrade Next.js and React to latest stable
npm install next@latest react@latest react-dom@latest

# Test build locally
echo "Testing local build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✓ Local build successful!"
    echo "Ready to deploy to Vercel"
    echo ""
    echo "Next steps:"
    echo "1. git add package.json package-lock.json"
    echo "2. git commit -m 'chore: Upgrade Next.js to fix build tracer bug'"
    echo "3. git push origin main"
else
    echo "✗ Build failed - reverting changes"
    cp package.json.backup package.json
    npm install
fi

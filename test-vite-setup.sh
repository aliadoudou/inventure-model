#!/bin/bash
# Troubleshooting script for Step 2: React Project Setup

echo "====== Vite & React Setup Troubleshooting ======"
echo ""

# Check Node.js and npm versions
echo "Checking Node.js and npm versions..."
node -v
if [ $? -ne 0 ]; then
  echo "❌ Node.js is not installed or not working properly"
  exit 1
else
  echo "✅ Node.js is installed"
fi

npm -v
if [ $? -ne 0 ]; then
  echo "❌ npm is not installed or not working properly"
  exit 1
else
  echo "✅ npm is installed"
fi

# Check project structure
echo ""
echo "Checking project structure..."
if [ -f "package.json" ]; then
  echo "✅ package.json exists"
else
  echo "❌ package.json not found - Vite may not be set up correctly"
  exit 1
fi

if [ -f "vite.config.js" ]; then
  echo "✅ vite.config.js exists"
else
  echo "❌ vite.config.js not found - Vite may not be set up correctly"
  exit 1
fi

if [ -d "src" ]; then
  echo "✅ src directory exists"
else
  echo "❌ src directory not found - project structure may be incorrect"
  exit 1
fi

if [ -f "src/main.jsx" ]; then
  echo "✅ src/main.jsx exists"
else
  echo "❌ src/main.jsx not found - React entry point is missing"
  exit 1
fi

if [ -f "src/App.jsx" ]; then
  echo "✅ src/App.jsx exists"
else
  echo "❌ src/App.jsx not found - React app component is missing"
  exit 1
fi

# Check vite.config.js for base path setting
echo ""
echo "Checking vite.config.js configuration..."
if grep -q "base:" vite.config.js; then
  echo "✅ base path is set in vite.config.js"
else
  echo "❌ base path is not set in vite.config.js"
  echo "   Add 'base: '/inventure-model/',' to your vite.config.js"
fi

# Check package.json for homepage and deploy scripts
echo ""
echo "Checking package.json configuration..."
if grep -q "\"homepage\":" package.json; then
  echo "✅ homepage is set in package.json"
else
  echo "❌ homepage is not set in package.json"
  echo "   Add '\"homepage\": \"https://yourusername.github.io/inventure-model/\",' to your package.json"
fi

if grep -q "\"deploy\":" package.json; then
  echo "✅ deploy script is set in package.json"
else
  echo "❌ deploy script is not set in package.json"
  echo "   Add '\"deploy\": \"gh-pages -d dist\",' to your scripts in package.json"
fi

# Check dependencies
echo ""
echo "Checking dependencies..."
if grep -q "\"recharts\":" package.json; then
  echo "✅ recharts dependency is installed"
else
  echo "❌ recharts dependency is not installed"
  echo "   Run 'npm install recharts'"
fi

if grep -q "\"lucide-react\":" package.json; then
  echo "✅ lucide-react dependency is installed"
else
  echo "❌ lucide-react dependency is not installed"
  echo "   Run 'npm install lucide-react'"
fi

if grep -q "\"gh-pages\":" package.json; then
  echo "✅ gh-pages dependency is installed"
else
  echo "❌ gh-pages dependency is not installed"
  echo "   Run 'npm install --save-dev gh-pages'"
fi

# Test build
echo ""
echo "Testing build process..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build process failed"
  exit 1
else
  echo "✅ Build process completed successfully"
fi

if [ -d "dist" ]; then
  echo "✅ dist directory was created"
else
  echo "❌ dist directory was not created - build may have failed"
  exit 1
fi

# Check HTML file in dist for correct base path
echo ""
echo "Checking dist/index.html for correct paths..."
if grep -q "/inventure-model/assets" dist/index.html; then
  echo "✅ Base path is correctly applied in the built HTML"
else
  echo "❌ Base path is not applied in the built HTML"
  echo "   Check that 'base: '/inventure-model/'' is correctly set in vite.config.js"
fi

echo ""
echo "====== Troubleshooting Complete ======"
echo ""
echo "If all checks passed, your Vite React setup should be working correctly."
echo "If there were failures, fix those issues and run this script again."
echo ""
echo "To test your app locally, run: npm run dev"
echo "To deploy to GitHub Pages, run: npm run deploy"
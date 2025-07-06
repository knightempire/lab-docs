#!/bin/bash

echo "🚀 Setting up LEMS Documentation with VitePress..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Navigate to docs directory
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p public/images
mkdir -p .vitepress/dist

# Copy any existing images
if [ -d "../public/images" ]; then
    echo "🖼️ Copying images..."
    cp -r ../public/images/* public/images/ 2>/dev/null || true
fi

# Build the documentation
echo "🔨 Building documentation..."
npm run build

echo "✅ Setup complete!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "To build for production:"
echo "  npm run build"
echo ""
echo "To preview the built site:"
echo "  npm run preview"

#!/bin/bash

# Harmonic Dashboard Setup Script for Codespace

echo "🚀 Setting up Harmonic Dashboard..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building the application..."
npm run build

# Check if port 3000 is available
if ! lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Port 3000 is available"
else
    echo "⚠️  Port 3000 is in use, stopping existing process..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null || true
fi

# Start the development server in the background
echo "🌟 Starting development server..."
npm run dev &

# Wait a moment for the server to start
sleep 5

# Check if the server is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Harmonic Dashboard is running at http://localhost:3000"
    echo ""
    echo "🎉 Setup complete! You can now:"
    echo "   • Navigate to the Dashboard tab"
    echo "   • Use the Copilot Chat for code assistance"
    echo "   • Browse and create documentation"
    echo "   • Explore the integrated development environment"
    echo ""
    echo "📚 Check the README.md for more information"
else
    echo "❌ Failed to start the server. Check the logs above."
    exit 1
fi
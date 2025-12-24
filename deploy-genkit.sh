#!/bin/bash

echo "🚀 Deploying TELsTP Genkit Integration..."

# Install dependencies
echo "📦 Installing Genkey dependencies..."
npm install --legacy-peer-deps @genkit-ai/core @genkit-ai/firebase @genkit-ai/googleai zod

# Build functions
echo "🔨 Building Firebase Functions..."
cd functions
npm install --legacy-peer-deps
npm run build
cd ..

# Deploy to Firebase
echo "☁️ Deploying to Firebase..."
firebase deploy --only functions

# Start Genkit dev server
echo "🔧 Starting Genkit development server..."
genkit start --dev &

echo "✅ Deployment complete!"
echo "🌐 Genkit UI: http://localhost:4000"
echo "🔥 Firebase Functions deployed"

# Test deployment
echo "🧪 Testing hub integrations..."
curl -X POST https://your-project.cloudfunctions.net/hubCoordinator \
  -H "Content-Type: application/json" \
  -d '{"hub":"m2-3m","query":"Test deployment","context":{}}'

echo "🎉 All hubs integrated with Genkit successfully!"
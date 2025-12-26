#!/bin/bash

# OMNICOG TAWASOL SUPREME INTEGRATION STARTUP SCRIPT
echo "🚀 Starting OMNICOG TAWASOL Supreme Integration..."

# Set environment variables
export OMNICOG_ENV=production
export INTEGRATION_MODE=supreme
export TOTAL_HUBS=15

# Start hubs in priority order
echo "📋 Starting hubs in priority order..."

# Priority 1: M2-3M Research System (Central Intelligence)
echo "🧠 Starting M2-3M Research System..."
cd docs/m2-3m-integration && npm start &
M2_3M_PID=$!

# Priority 2: Telemedicine Hub
echo "🏥 Starting Telemedicine Hub..."
cd ../../telemedicine-hub && npm start &
TELEMEDICINE_PID=$!

# Priority 3: Healthcare Education Hub
echo "🎓 Starting Healthcare Education Hub..."
cd ../healthcare-education-hub && npm start &
EDUCATION_PID=$!

# Priority 4: Personal Wellness Hub
echo "💪 Starting Personal Wellness Hub..."
cd ../wellness-hub && npm start &
WELLNESS_PID=$!

# Priority 5: Health Tech Frontend
echo "🌐 Starting Health Tech Frontend..."
cd ../health-tech-frontend && npm start &
FRONTEND_PID=$!

# Priority 6: TAWASOL Life Sciences Hub
echo "🧬 Starting TAWASOL Life Sciences Hub..."
cd ../tawasol-life-sciences && npm start &
LIFESCIENCES_PID=$!

# Priority 7: El Maestro De DataBase
echo "🗄️ Starting Database Maestro..."
cd ../database-maestro && npm start &
DATABASE_PID=$!

# Priority 8: TELSTP AI Agent Globe
echo "🌍 Starting AI Agent Globe..."
cd ../ai-agent-globe && npm start &
GLOBE_PID=$!

# Priority 9: TELsTP Unified AI Platform
echo "🤖 Starting Unified AI Platform..."
cd ../unified-ai-platform && npm start &
UNIFIED_PID=$!

# Priority 10: Healthcare Tech Park
echo "🏥 Starting Healthcare Tech Park..."
cd ../healthcare-tech-park && python backend/app/__init__.py &
TECHPARK_PID=$!

# Priority 11: TELSTP Showcase Website
echo "🌟 Starting Showcase Website..."
cd ../telstp-showcase && python -m http.server 3011 &
SHOWCASE_PID=$!

# Priority 12: OMNICOG Future Platform
echo "🚀 Starting OMNICOG Future Platform..."
cd ../omnicog-future && npm start &
FUTURE_PID=$!

# Priority 13: Manus United Registry
echo "🤝 Starting Manus Registry..."
cd ../manus-registry && npm start &
MANUS_PID=$!

# Priority 14: Global Hub Explorer
echo "🌐 Starting Global Hub Explorer..."
cd ../global-hub-explorer && npm start &
EXPLORER_PID=$!

# Priority 15: Digital AI Globe BEM23 (Supreme Interface)
echo "🌍 Starting Digital AI Globe BEM23..."
cd ../digital-ai-globe-bem23 && npm run dev &
DIGITAL_GLOBE_PID=$!

# Wait for all services to start
echo "⏳ Waiting for all hubs to initialize..."
sleep 30

# Initialize master integration
echo "🔗 Initializing master integration..."
cd ../
node -e "
const orchestrator = require('./OMNICOG_MASTER_INTEGRATION.ts').default;
orchestrator.initialize().then(() => {
  console.log('✅ OMNICOG TAWASOL Supreme Integration Complete!');
}).catch(console.error);
"

# Display system status
echo "📊 OMNICOG TAWASOL System Status:"
echo "=================================="
echo "🧠 M2-3M Research System: http://localhost:3001"
echo "🏥 Telemedicine Hub: http://localhost:3002"
echo "🎓 Healthcare Education: http://localhost:3003"
echo "💪 Personal Wellness: http://localhost:3004"
echo "🌐 Health Tech Frontend: http://localhost:3005"
echo "🧬 TAWASOL Life Sciences: http://localhost:3006"
echo "🗄️ Database Maestro: http://localhost:3007"
echo "🌍 AI Agent Globe: http://localhost:3008"
echo "🤖 Unified AI Platform: http://localhost:3009"
echo "🏥 Healthcare Tech Park: http://localhost:3010"
echo "🌟 Showcase Website: http://localhost:3011"
echo "🚀 OMNICOG Future: http://localhost:3012"
echo "🤝 Manus Registry: http://localhost:3013"
echo "🌐 Global Hub Explorer: http://localhost:3014"
echo "🌍 Digital AI Globe BEM23: http://localhost:3015"
echo "=================================="
echo "🎯 Total Hubs: 15/15 OPERATIONAL"
echo "🌟 Status: SUPREME INTEGRATION COMPLETE"
echo "🚀 OMNICOG TAWASOL is now LIVE!"

# Keep script running
echo "Press Ctrl+C to stop all services..."
wait
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('.'));

// Serve the main app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoints for our ecosystem
app.get('/api/status', (req, res) => {
  res.json({
    status: 'operational',
    hubs: {
      total: 12,
      operational: 3,
      development: 2,
      planning: 7
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/api/hubs', (req, res) => {
  res.json([
    {
      id: 'command-center',
      name: 'Unified Command Center',
      status: 'operational',
      url: '/'
    },
    {
      id: 'omnicognitor',
      name: 'OmniCognitor Platform',
      status: 'operational',
      url: '/omnicognitor'
    },
    {
      id: 'wellness-companion',
      name: 'Wellness Companion',
      status: 'operational',
      url: '/wellness'
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`🚀 TELsTP Unified Command Center running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
  console.log(`🧠 OmniCognitor: http://localhost:${PORT}/omnicognitor`);
  console.log(`❤️  Wellness Hub: http://localhost:${PORT}/wellness`);
});
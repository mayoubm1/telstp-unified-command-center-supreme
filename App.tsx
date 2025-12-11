import React from 'react';
import HubRouter from './HubRouter';
import './index.css';

function App() {
  return (
    <div className="App">
      <HubRouter onBackToCommand={() => window.location.reload()} />
    </div>
  );
}

export default App;

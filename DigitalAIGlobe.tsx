import React from 'react';

export default function DigitalAIGlobe() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-4">🌍 Digital AI Globe BEM23</h1>
          <p className="text-xl">Advanced 3D AI Agent Visualization</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/20 border border-white/10 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Ibn Sina AI</h3>
            <p>Multi-character AI interface</p>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Stargate UI</h3>
            <p>Advanced visualization interface</p>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Automation</h3>
            <p>Workflow automation system</p>
          </div>
        </div>
      </div>
    </div>
  );
}
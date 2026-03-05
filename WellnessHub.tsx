import React from 'react';

export default function WellnessHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-4">💚 Personal Wellness Hub</h1>
          <p className="text-xl">AI-Powered Health Companion</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/20 border border-white/10 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Health Coach</h3>
            <p>Personalized wellness guidance</p>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Fitness Tracking</h3>
            <p>Monitor your health metrics</p>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Mental Health</h3>
            <p>Mindfulness and stress management</p>
          </div>
        </div>
      </div>
    </div>
  );
}
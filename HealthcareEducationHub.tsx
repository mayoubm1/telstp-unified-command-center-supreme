import React from 'react';

export default function HealthcareEducationHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-4">🎓 Healthcare Education Hub</h1>
          <p className="text-xl">AI-Powered Learning Platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/20 border border-white/10 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Virtual Labs</h3>
            <p>Interactive medical simulations</p>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">AI Partner</h3>
            <p>Personalized learning assistant</p>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Course Catalog</h3>
            <p>Comprehensive medical courses</p>
          </div>
        </div>
      </div>
    </div>
  );
}
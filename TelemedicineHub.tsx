import React from 'react';

export default function TelemedicineHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-4">🏥 Telemedicine Hub</h1>
          <p className="text-xl">My-WellnessAi & My-AssisstAi Portals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/20 border border-white/10 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">My-WellnessAi</h2>
            <p className="mb-4">AI-powered wellness companion for personalized health management</p>
            <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg">
              Launch Wellness Portal
            </button>
          </div>

          <div className="bg-black/20 border border-white/10 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">My-AssisstAi</h2>
            <p className="mb-4">Medical AI assistant for consultations and support</p>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg">
              Launch Medical Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
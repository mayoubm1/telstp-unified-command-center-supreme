import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import M2_3MResearchHub from './M2_3MResearchHub'
import TAWASOLLandingPage from './TAWASOLLandingPage'

interface HubRouterProps {
  onBackToCommand: () => void
}

const HubRouter: React.FC<HubRouterProps> = ({ onBackToCommand }) => {
  const [currentHub, setCurrentHub] = useState<string | null>(null)

  // If a specific hub is selected, render it
  if (currentHub === 'm2-3m-research') {
    return (
      <div>
        <div className="fixed top-4 left-4 z-50">
          <Button 
            onClick={() => setCurrentHub(null)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hubs
          </Button>
        </div>
        <M2_3MResearchHub />
      </div>
    )
  }

  if (currentHub === 'tawasol-landing') {
    return (
      <div>
        <div className="fixed top-4 left-4 z-50">
          <Button 
            onClick={() => setCurrentHub(null)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hubs
          </Button>
        </div>
        <TAWASOLLandingPage />
      </div>
    )
  }

  // Hub selection interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={onBackToCommand}
          className="mb-6 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Command Center
        </Button>
        
        <div className="text-center text-white mb-8">
          <h1 className="text-3xl font-bold mb-4">TELsTP Application Hubs</h1>
          <p className="text-blue-200">Select a hub to access its features</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            onClick={() => setCurrentHub('m2-3m-research')}
            className="bg-black/20 border border-white/10 rounded-lg p-6 cursor-pointer hover:bg-black/30 transition-all"
          >
            <h3 className="text-xl font-bold text-white mb-2">M2-3M Research Portal</h3>
            <p className="text-blue-200 mb-4">Advanced AI Research Assistant with quantum biology tools and global network</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-indigo-600 text-white text-xs rounded">Quantum Biology</span>
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Global Network</span>
              <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">AI Assistant</span>
            </div>
          </div>

          <div 
            onClick={() => setCurrentHub('tawasol-landing')}
            className="bg-black/20 border border-white/10 rounded-lg p-6 cursor-pointer hover:bg-black/30 transition-all"
          >
            <h3 className="text-xl font-bold text-white mb-2">TAWASOL Life Science Park</h3>
            <p className="text-blue-200 mb-4">Professional landing page with Chairman message and research facilities showcase</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Chairman Message</span>
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Research Facilities</span>
              <span className="px-2 py-1 bg-indigo-600 text-white text-xs rounded">M2-3M Integration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HubRouter
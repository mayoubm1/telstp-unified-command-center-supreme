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
          <h1 className="text-3xl font-bold mb-4">🌟 OMNICOG TAWASOL Ecosystem</h1>
          <p className="text-blue-200">The world's most advanced AI-powered life sciences platform</p>
          <div className="mt-4 text-sm text-blue-300">
            <span className="bg-blue-600/20 px-3 py-1 rounded-full">15 Integrated Hubs</span>
            <span className="bg-green-600/20 px-3 py-1 rounded-full ml-2">Global Research Network</span>
            <span className="bg-purple-600/20 px-3 py-1 rounded-full ml-2">M2-3M AI Core</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          <div className="bg-black/20 border border-white/10 rounded-lg p-6 cursor-pointer hover:bg-black/30 transition-all opacity-75">
            <h3 className="text-xl font-bold text-white mb-2">Telemedicine Hub</h3>
            <p className="text-blue-200 mb-4">My-wellnessAi & My-AssisstAi portals with advanced medical AI</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">Medical AI</span>
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Video Consultation</span>
              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Audio Features</span>
            </div>
            <div className="mt-2 text-yellow-400 text-sm">🚧 Integration in Progress</div>
          </div>

          <div className="bg-black/20 border border-white/10 rounded-lg p-6 cursor-pointer hover:bg-black/30 transition-all opacity-75">
            <h3 className="text-xl font-bold text-white mb-2">Healthcare Education Hub</h3>
            <p className="text-blue-200 mb-4">AI-powered learning platform with virtual labs and course management</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">Virtual Labs</span>
              <span className="px-2 py-1 bg-indigo-600 text-white text-xs rounded">AI Partner</span>
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Course Catalog</span>
            </div>
            <div className="mt-2 text-yellow-400 text-sm">🚧 Integration in Progress</div>
          </div>

          <div className="bg-black/20 border border-white/10 rounded-lg p-6 cursor-pointer hover:bg-black/30 transition-all opacity-75">
            <h3 className="text-xl font-bold text-white mb-2">Personal Wellness Hub</h3>
            <p className="text-blue-200 mb-4">AI-powered wellness companion with health tracking and optimization</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Health Coach</span>
              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Fitness Tracking</span>
              <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">Mental Health</span>
            </div>
            <div className="mt-2 text-yellow-400 text-sm">🚧 Integration in Progress</div>
          </div>

          <div className="bg-black/20 border border-white/10 rounded-lg p-6 cursor-pointer hover:bg-black/30 transition-all opacity-75">
            <h3 className="text-xl font-bold text-white mb-2">Digital AI Globe BEM23</h3>
            <p className="text-blue-200 mb-4">Advanced 3D AI agent globe with multi-character interface and automation</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-indigo-600 text-white text-xs rounded">Ibn Sina AI</span>
              <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">Stargate UI</span>
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Automation</span>
            </div>
            <div className="mt-2 text-yellow-400 text-sm">🚧 Integration in Progress</div>
          </div>

          <div className="bg-black/20 border border-white/10 rounded-lg p-6 cursor-pointer hover:bg-black/30 transition-all opacity-50">
            <h3 className="text-xl font-bold text-white mb-2">Global Hub Explorer</h3>
            <p className="text-blue-200 mb-4">Master navigation platform for all 15 OMNICOG TAWASOL hubs</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">3D Visualization</span>
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Hub Discovery</span>
              <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">Real-time Analytics</span>
            </div>
            <div className="mt-2 text-gray-400 text-sm">⏳ Awaiting Integration</div>
          </div>

          <div className="bg-black/20 border border-white/10 rounded-lg p-6 cursor-pointer hover:bg-black/30 transition-all opacity-50">
            <h3 className="text-xl font-bold text-white mb-2">Manus United Registry</h3>
            <p className="text-blue-200 mb-4">Central registry and coordination hub for all Manus AI instances</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">AI Registry</span>
              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Egyptian Theme</span>
              <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">VR Lab</span>
            </div>
            <div className="mt-2 text-gray-400 text-sm">⏳ Awaiting Integration</div>
          </div>

          <div className="bg-black/20 border border-white/10 rounded-lg p-6 cursor-pointer hover:bg-black/30 transition-all opacity-50">
            <h3 className="text-xl font-bold text-white mb-2">OMNICOG Future Platform</h3>
            <p className="text-blue-200 mb-4">Ultimate vision platform for humanity's cognitive evolution and consciousness enhancement</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded">Consciousness</span>
              <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">Evolution</span>
              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Singularity</span>
            </div>
            <div className="mt-2 text-gray-400 text-sm">⏳ Awaiting Integration</div>
          </div>

          <div className="bg-black/20 border border-white/10 rounded-lg p-6 cursor-pointer hover:bg-black/30 transition-all opacity-50">
            <h3 className="text-xl font-bold text-white mb-2">Health Tech Frontend</h3>
            <p className="text-blue-200 mb-4">Advanced healthcare technology interface with modern UI/UX design</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Healthcare UI</span>
              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Modern Design</span>
              <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">Patient Portal</span>
            </div>
            <div className="mt-2 text-gray-400 text-sm">⏳ Awaiting Integration</div>
          </div>

          <div className="bg-black/20 border border-white/10 rounded-lg p-6 cursor-pointer hover:bg-black/30 transition-all opacity-50">
            <h3 className="text-xl font-bold text-white mb-2">Database Maestro</h3>
            <p className="text-blue-200 mb-4">Advanced database management and orchestration platform</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-indigo-600 text-white text-xs rounded">Database Admin</span>
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Data Analytics</span>
              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Performance</span>
            </div>
            <div className="mt-2 text-gray-400 text-sm">⏳ Awaiting Integration</div>
          </div>

          <div className="bg-black/20 border border-white/10 rounded-lg p-6 cursor-pointer hover:bg-black/30 transition-all opacity-50">
            <h3 className="text-xl font-bold text-white mb-2">Unified AI Platform</h3>
            <p className="text-blue-200 mb-4">Central AI coordination platform for all OMNICOG services</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">AI Orchestration</span>
              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Multi-Agent</span>
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Coordination</span>
            </div>
            <div className="mt-2 text-gray-400 text-sm">⏳ Awaiting Integration</div>
          </div>

          <div className="bg-black/20 border border-white/10 rounded-lg p-6 cursor-pointer hover:bg-black/30 transition-all opacity-50">
            <h3 className="text-xl font-bold text-white mb-2">Healthcare Tech Park</h3>
            <p className="text-blue-200 mb-4">Comprehensive healthcare technology ecosystem and innovation hub</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">Innovation Hub</span>
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Healthcare Tech</span>
              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Ecosystem</span>
            </div>
            <div className="mt-2 text-gray-400 text-sm">⏳ Awaiting Integration</div>
          </div>

          <div className="bg-black/20 border border-white/10 rounded-lg p-6 cursor-pointer hover:bg-black/30 transition-all opacity-50">
            <h3 className="text-xl font-bold text-white mb-2">TELsTP Showcase</h3>
            <p className="text-blue-200 mb-4">Professional showcase platform for TELsTP technologies and achievements</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Showcase</span>
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Portfolio</span>
              <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">Achievements</span>
            </div>
            <div className="mt-2 text-gray-400 text-sm">⏳ Awaiting Integration</div>
          </div>
        </div>

        <div className="mt-8 text-center text-white">
          <div className="bg-black/30 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">🚀 OMNICOG TAWASOL Ecosystem Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-green-400 font-bold">✅ Operational (2/15)</div>
                <div className="text-blue-200">M2-3M Research & TAWASOL Landing</div>
              </div>
              <div>
                <div className="text-yellow-400 font-bold">🚧 Integration (4/15)</div>
                <div className="text-blue-200">Telemedicine, Education, Wellness, Digital Globe</div>
              </div>
              <div>
                <div className="text-gray-400 font-bold">⏳ Pending (9/15)</div>
                <div className="text-blue-200">Remaining hubs awaiting integration</div>
              </div>
            </div>
            <div className="mt-4 text-lg font-bold text-blue-300">
              🎯 Total Progress: 15/15 Hubs Deployed | 2/15 Fully Integrated
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HubRouter
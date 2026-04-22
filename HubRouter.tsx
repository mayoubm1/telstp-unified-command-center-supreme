import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, Globe, Brain, Heart, Zap } from 'lucide-react'

interface HubRouterProps {
  onBackToCommand: () => void
}

const HUB_DATA = [
  {
    id: 'unity-dashboard',
    name: 'Unity Dashboard',
    description: 'Central command for network health and ecosystem news.',
    url: 'https://telstp-unified-platform-production.vercel.app/',
    tags: ['Master Control', 'Real-time', 'Orchestration'],
    color: 'bg-gold-600',
    status: 'WORKING'
  },
  {
    id: 'm2-3m-research',
    name: 'M2-3M Research Portal',
    description: 'Quantum biology tools and global knowledge network.',
    url: 'https://m2-3m-telstp-jp993tq6p-tawasolnow.vercel.app/',
    tags: ['QuantumBiology', 'Research', 'AI'],
    color: 'bg-indigo-600',
    status: 'WORKING'
  },
  {
    id: 'telemedicine',
    name: 'Telemedicine Hub',
    description: 'My-wellnessAi & My-AssisstAi medical portals.',
    url: 'https://health-tech-ecosystem-frontend-3z3u-cw69gw4fd-tawasolnow.vercel.app/',
    tags: ['Medical AI', 'Consultation', 'Audio'],
    color: 'bg-red-600',
    status: 'WORKING'
  },
  {
    id: 'wellness-companion',
    name: 'Personal Wellness Companion',
    description: 'AI-powered wellness companion and health tracking.',
    url: 'https://wellness-portal-tau.vercel.app/',
    tags: ['Health Coach', 'Fitness', 'Mental Health'],
    color: 'bg-green-600',
    status: 'WORKING'
  },
  {
    id: 'digital-ai-globe',
    name: 'Digital AI Globe BEM23',
    description: 'Advanced 3D AI agent globe with multi-character interface.',
    url: 'https://digital-telstp-ai-agent-globe-bem-2.vercel.app/',
    tags: ['Ibn Sina', 'Stargate UI', '3D'],
    color: 'bg-blue-600',
    status: 'WORKING'
  },
  {
    id: 'tawasol-platform',
    name: 'TAWASOL Egypt Platform',
    description: 'Sovereign Life Science Technology Park landing page.',
    url: 'https://tawasol-egypt-platform-dvcvvr9uh-tawasolnow.vercel.app',
    tags: ['Chairman', 'Research', 'Regional'],
    color: 'bg-cyan-600',
    status: 'WORKING'
  },
  {
    id: 'manus-registry',
    name: 'Manus United Registry',
    description: 'Central coordination for all Manus AI instances.',
    url: 'https://manus-united-registry-telstp.vercel.app/',
    tags: ['AI Registry', 'Egyptian Theme', 'VR Lab'],
    color: 'bg-amber-600',
    status: 'WORKING'
  },
  {
    id: 'global-explorer',
    name: 'Global Hub Explorer',
    description: 'Master navigation for the 15-hub OMNICOG ecosystem.',
    url: 'https://tawasol-globe-app.vercel.app/',
    tags: ['Visualization', 'Navigation', 'Discovery'],
    color: 'bg-purple-600',
    status: 'WORKING'
  }
];

const HubRouter: React.FC<HubRouterProps> = ({ onBackToCommand }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button 
            onClick={onBackToCommand}
            className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Command Center
          </Button>

          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full text-green-400 text-xs border border-green-500/30">
              <Heart className="w-3 h-3" /> Hayat: ONLINE
            </div>
            <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full text-blue-400 text-xs border border-blue-500/30">
              <Brain className="w-3 h-3" /> Noura: ONLINE
            </div>
            <div className="flex items-center gap-2 bg-purple-500/20 px-3 py-1 rounded-full text-purple-400 text-xs border border-purple-500/30">
              <Zap className="w-3 h-3" /> Gemini: ONLINE
            </div>
          </div>
        </div>
        
        <div className="text-center text-white mb-12">
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">🌟 OMNICOG TAWASOL SUPREME</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">The Sovereign Digital Spine of the TELSTP Global Network. Orchestrating 58 hubs across the planetary health ecosystem.</p>
          <div className="mt-6 flex justify-center gap-4 text-sm">
            <span className="bg-blue-600/20 text-blue-300 px-4 py-1.5 rounded-full border border-blue-600/30">58 Unified Hubs</span>
            <span className="bg-indigo-600/20 text-indigo-300 px-4 py-1.5 rounded-full border border-indigo-600/30">Quantum Neural Link</span>
            <span className="bg-emerald-600/20 text-emerald-300 px-4 py-1.5 rounded-full border border-emerald-600/30">Sovereign Data</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HUB_DATA.map((hub) => (
            <a 
              key={hub.id}
              href={hub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-black/40 border border-white/10 rounded-xl p-6 transition-all hover:border-blue-500/50 hover:bg-black/60 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4 text-blue-400" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{hub.name}</h3>
              <p className="text-blue-200/70 text-sm mb-4 line-clamp-2">{hub.description}</p>
              
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {hub.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-white/5 text-white/50 text-[10px] rounded uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] font-bold text-green-400 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> {hub.status}
                </span>
                <Globe className="w-4 h-4 text-white/10 group-hover:text-blue-500/30 transition-colors" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12">
          <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Brain className="w-6 h-6 text-blue-400" /> System Neural Integration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="text-blue-400 font-bold uppercase tracking-widest text-xs">Database Layer</div>
                <div className="text-white text-sm">Dual-Supabase Bridge (Spine + Hubs)</div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[95%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-purple-400 font-bold uppercase tracking-widest text-xs">Neural Network</div>
                <div className="text-white text-sm">Gemini 2.5 Flash + Mistral Large</div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[88%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-emerald-400 font-bold uppercase tracking-widest text-xs">Sync Status</div>
                <div className="text-white text-sm">Planetary Health Sync: ACTIVE</div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[100%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HubRouter
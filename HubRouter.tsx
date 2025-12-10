import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink } from 'lucide-react';

// Import our hub components
import OmniCognitor from './OmniCognitor';
import WellnessCompanion from './WellnessCompanion';
import GlobalNetworkHub from './GlobalNetworkHub';
import AITutorSystem from './AITutorSystem';
import TelemedicineHub from './TelemedicineHub';

interface Hub {
  id: string;
  name: string;
  description: string;
  status: 'operational' | 'development' | 'planning';
  component?: React.ComponentType;
  icon: string;
  color: string;
}

interface HubRouterProps {
  onBackToCommand: () => void;
}

export default function HubRouter({ onBackToCommand }: HubRouterProps) {
  const [activeHub, setActiveHub] = useState<string | null>(null);

  const hubs: Hub[] = [
    {
      id: 'omnicognitor',
      name: 'OmniCognitor Platform',
      description: 'Multi-platform AI interface and coordination hub',
      status: 'operational',
      component: OmniCognitor,
      icon: '🧠',
      color: 'bg-purple-500'
    },
    {
      id: 'wellness-companion',
      name: 'Wellness Companion',
      description: 'Personal health and wellness management system',
      status: 'operational',
      component: WellnessCompanion,
      icon: '❤️',
      color: 'bg-pink-500'
    },
    {
      id: 'global-network',
      name: 'Global Network Hub',
      description: 'Worldwide connectivity and collaboration platform',
      status: 'operational',
      component: GlobalNetworkHub,
      icon: '🌐',
      color: 'bg-indigo-500'
    },
    {
      id: 'ai-tutor',
      name: 'AI Tutor System',
      description: 'Educational AI companion and learning platform',
      status: 'operational',
      component: AITutorSystem,
      icon: '🎓',
      color: 'bg-yellow-500'
    },
    {
      id: 'telemedicine',
      name: 'Telemedicine Hub',
      description: 'Advanced telemedicine and consultation platform',
      status: 'operational',
      component: TelemedicineHub,
      icon: '🏥',
      color: 'bg-blue-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'development': return 'bg-yellow-500';
      case 'planning': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational': return 'Operational';
      case 'development': return 'In Development';
      case 'planning': return 'Planning';
      default: return 'Unknown';
    }
  };

  // If a hub is selected and has a component, render it
  if (activeHub) {
    const hub = hubs.find(h => h.id === activeHub);
    if (hub?.component) {
      const HubComponent = hub.component;
      return (
        <div>
          {/* Hub Navigation Header */}
          <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveHub(null)}
                  className="text-white hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Hub Selection
                </Button>
                <div className="text-white">
                  <span className="text-lg font-semibold">{hub.name}</span>
                  <Badge className={`${getStatusColor(hub.status)} text-white ml-2`}>
                    {getStatusText(hub.status)}
                  </Badge>
                </div>
              </div>
              <Button 
                variant="ghost" 
                onClick={onBackToCommand}
                className="text-white hover:bg-white/10"
              >
                Command Center
              </Button>
            </div>
          </div>
          
          {/* Render the hub component */}
          <HubComponent />
        </div>
      );
    }
  }

  // Default hub selection view
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onBackToCommand}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Command Center
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">TELsTP Application Hubs</h1>
                <p className="text-sm text-blue-200">Select a hub to access its features</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hub Selection Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hubs.map((hub) => (
            <Card 
              key={hub.id} 
              className="bg-black/20 border-white/10 text-white hover:bg-black/30 transition-all cursor-pointer"
              onClick={() => {
                if (hub.component) {
                  setActiveHub(hub.id);
                }
              }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${hub.color} text-2xl`}>
                      {hub.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{hub.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(hub.status)}`}></div>
                        <span className="text-sm text-gray-300">{getStatusText(hub.status)}</span>
                      </div>
                    </div>
                  </div>
                  {hub.component && (
                    <ExternalLink className="h-4 w-4 text-blue-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">{hub.description}</p>
                <div className="flex justify-between items-center">
                  {hub.component ? (
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHub(hub.id);
                      }}
                    >
                      Launch Hub
                    </Button>
                  ) : (
                    <Badge variant="outline" className="border-white/20 text-gray-400">
                      Coming Soon
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Development Status */}
        <Card className="mt-8 bg-black/20 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Development Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Operational Hubs</span>
                <Badge className="bg-green-600 text-white">
                  {hubs.filter(h => h.status === 'operational').length} / {hubs.length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>In Development</span>
                <Badge className="bg-yellow-600 text-white">
                  {hubs.filter(h => h.status === 'development').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Planning Phase</span>
                <Badge className="bg-gray-600 text-white">
                  {hubs.filter(h => h.status === 'planning').length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
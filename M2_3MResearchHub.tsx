import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Microscope, Database, Users, Zap, Globe, Brain, Activity, TrendingUp } from 'lucide-react';
import { m2_3mEnhancedFlow } from './m2-3m-backend-integration';

interface ResearchProject {
  id: string;
  title: string;
  status: string;
  progress: number;
  next_milestone: string;
}

interface Dataset {
  id: string;
  name: string;
  size: string;
  type: string;
  sample_count: number;
}

export default function M2_3MResearchHub() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [systemStats, setSystemStats] = useState({
    activeProjects: 12,
    totalDatasets: 47,
    globalPartners: 47,
    researchHours: 15420
  });

  const [recentProjects] = useState<ResearchProject[]>([
    {
      id: 'QBP-2025-001',
      title: 'Quantum Biology Evolution Patterns',
      status: 'Active',
      progress: 78,
      next_milestone: 'Final validation phase'
    },
    {
      id: 'CNM-2024-003',
      title: 'Consciousness Neural Mapping',
      status: 'Active',
      progress: 65,
      next_milestone: 'Data collection phase'
    },
    {
      id: 'NIF-2024-007',
      title: 'Neural Interface Framework',
      status: 'Active',
      progress: 42,
      next_milestone: 'Prototype development'
    }
  ]);

  const [datasets] = useState<Dataset[]>([
    {
      id: 'QBP-Dataset-Alpha',
      name: 'Quantum Biology Primary Dataset',
      size: '15.7 TB',
      type: 'Quantum Coherence Measurements',
      sample_count: 847
    },
    {
      id: 'CNM-Dataset-Beta',
      name: 'Consciousness Neural Data',
      size: '23.4 TB',
      type: 'Neural Activity Patterns',
      sample_count: 1247
    }
  ]);

  const handleQuery = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse('');
    
    try {
      const result = await m2_3mEnhancedFlow({
        query,
        context: {
          user_id: 'current_user',
          research_area: 'quantum_biology',
          priority_level: 'medium'
        }
      });
      
      if (result && result.response) {
        setResponse(result.response);
      } else {
        setResponse('🤖 M2-3M: I received your query but encountered an issue processing it. Please try rephrasing your question.');
      }
    } catch (error) {
      console.error('M2-3M Query Error:', error);
      setResponse('🔧 M2-3M System: Currently experiencing connectivity issues. Please try again in a moment.');
    }
    
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Completed': return 'bg-blue-500';
      case 'Paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Microscope className="w-8 h-8 text-indigo-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">M2-3M Research Portal</h1>
                  <p className="text-sm text-indigo-200">Advanced AI Research Assistant - TAWASOL Integration</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500 text-white flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Research Active
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-black/20 border-white/10">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-indigo-600">Dashboard</TabsTrigger>
            <TabsTrigger value="projects" className="text-white data-[state=active]:bg-indigo-600">Projects</TabsTrigger>
            <TabsTrigger value="datasets" className="text-white data-[state=active]:bg-indigo-600">Datasets</TabsTrigger>
            <TabsTrigger value="research-tools" className="text-white data-[state=active]:bg-indigo-600">Research Tools</TabsTrigger>
            <TabsTrigger value="global-network" className="text-white data-[state=active]:bg-indigo-600">Global Network</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Research Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Database className="h-4 w-4 text-indigo-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.activeProjects}</div>
                  <p className="text-xs text-indigo-200">Research initiatives</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Global Datasets</CardTitle>
                  <Brain className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.totalDatasets}</div>
                  <p className="text-xs text-green-200">TB of research data</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Global Partners</CardTitle>
                  <Globe className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.globalPartners}</div>
                  <p className="text-xs text-blue-200">Institutions</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Research Hours</CardTitle>
                  <TrendingUp className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.researchHours.toLocaleString()}</div>
                  <p className="text-xs text-yellow-200">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* M2-3M Chat Interface */}
            <Card className="bg-black/20 border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-indigo-400" />
                  M2-3M Research Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleQuery();
                          }
                        }}
                        placeholder="Generate researcher profile, create media presentation, discuss quantum biology..."
                        className="flex-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 resize-none"
                        rows={3}
                      />
                      <div className="flex flex-col gap-2">
                        <Button 
                          onClick={handleQuery} 
                          disabled={loading || !query.trim()}
                          className="bg-indigo-600 hover:bg-indigo-700"
                        >
                          {loading ? 'Processing...' : 'Ask M2-3M'}
                        </Button>
                        <Button 
                          onClick={() => { setQuery(''); setResponse(''); }}
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {response && (
                    <Card className="bg-indigo-900/50 border-indigo-500/50">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-2">
                          <Brain className="h-5 w-5 text-indigo-400 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-medium text-indigo-200 mb-2">M2-3M Response:</h4>
                            <div className="text-white whitespace-pre-line">{response}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <Card key={project.id} className="bg-black/20 border-white/10 text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <p className="text-sm text-gray-300">Project ID: {project.id}</p>
                      </div>
                      <Badge className={`${getStatusColor(project.status)} text-white`}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <div className="text-sm text-gray-300">
                        <strong>Next Milestone:</strong> {project.next_milestone}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Datasets Tab */}
          <TabsContent value="datasets" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {datasets.map((dataset) => (
                <Card key={dataset.id} className="bg-black/20 border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="text-lg">{dataset.name}</CardTitle>
                    <p className="text-sm text-gray-300">ID: {dataset.id}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Size:</span>
                        <span>{dataset.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span>{dataset.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Samples:</span>
                        <span>{dataset.sample_count.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Research Tools Tab */}
          <TabsContent value="research-tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-400" />
                    Quantum Biology Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 mb-4">
                    Advanced quantum coherence measurement and biological significance analysis
                  </p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Launch Tool
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    Breakthrough Prediction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 mb-4">
                    AI-powered research breakthrough probability analysis
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Launch Tool
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-400" />
                    Collaboration Facilitator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 mb-4">
                    Global research network collaboration management
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Launch Tool
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Global Network Tab */}
          <TabsContent value="global-network" className="space-y-6">
            <Card className="bg-black/20 border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-indigo-400" />
                  Global Research Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Globe className="h-16 w-16 text-indigo-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">47+ Partner Institutions</h3>
                  <p className="text-gray-300 mb-6">
                    Connected to leading research institutions worldwide for collaborative research and data sharing
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="border-white/20 text-white">
                      MIT
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white">
                      Cambridge
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white">
                      Max Planck
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white">
                      View All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
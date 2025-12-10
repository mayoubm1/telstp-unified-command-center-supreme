import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Bot, Zap, Settings, Activity, MessageSquare, Network } from 'lucide-react';

interface AIProvider {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  responseTime: number;
  requestCount: number;
  capabilities: string[];
}

interface AIAgent {
  id: string;
  name: string;
  provider: string;
  mode: 'active' | 'listening' | 'processing';
  lastResponse: Date;
  totalInteractions: number;
}

export default function OmniCognitor() {
  const [aiProviders, setAiProviders] = useState<AIProvider[]>([
    {
      id: 'openai',
      name: 'OpenAI GPT',
      status: 'active',
      responseTime: 1200,
      requestCount: 156,
      capabilities: ['Text Generation', 'Code Analysis', 'Creative Writing']
    },
    {
      id: 'anthropic',
      name: 'Anthropic Claude',
      status: 'active',
      responseTime: 980,
      requestCount: 89,
      capabilities: ['Analysis', 'Research', 'Safety-focused Responses']
    },
    {
      id: 'google',
      name: 'Google Gemini',
      status: 'active',
      responseTime: 1450,
      requestCount: 67,
      capabilities: ['Multimodal', 'Code Generation', 'Data Analysis']
    }
  ]);

  const [aiAgents, setAiAgents] = useState<AIAgent[]>([
    {
      id: 'agent-001',
      name: 'Research Assistant',
      provider: 'openai',
      mode: 'active',
      lastResponse: new Date(),
      totalInteractions: 234
    },
    {
      id: 'agent-002',
      name: 'Code Reviewer',
      provider: 'anthropic',
      mode: 'listening',
      lastResponse: new Date(Date.now() - 300000),
      totalInteractions: 156
    },
    {
      id: 'agent-003',
      name: 'Data Analyst',
      provider: 'google',
      mode: 'processing',
      lastResponse: new Date(Date.now() - 120000),
      totalInteractions: 89
    }
  ]);

  const [systemStats, setSystemStats] = useState({
    totalProviders: 3,
    activeAgents: 3,
    totalInteractions: 479,
    avgResponseTime: 1210
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      case 'processing': return 'bg-blue-500';
      case 'listening': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const formatResponseTime = (ms: number) => {
    return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="w-8 h-8 text-purple-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">OmniCognitor Platform</h1>
                  <p className="text-sm text-purple-200">AI Coordination & Management Hub</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500 text-white flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Operational
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border-white/10">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-600">Overview</TabsTrigger>
            <TabsTrigger value="providers" className="text-white data-[state=active]:bg-purple-600">AI Providers</TabsTrigger>
            <TabsTrigger value="agents" className="text-white data-[state=active]:bg-purple-600">AI Agents</TabsTrigger>
            <TabsTrigger value="orchestration" className="text-white data-[state=active]:bg-purple-600">Orchestration</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Providers</CardTitle>
                  <Network className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.totalProviders}</div>
                  <p className="text-xs text-purple-200">Connected platforms</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                  <Bot className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.activeAgents}</div>
                  <p className="text-xs text-green-200">Running instances</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
                  <MessageSquare className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.totalInteractions}</div>
                  <p className="text-xs text-blue-200">Processed requests</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
                  <Zap className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatResponseTime(systemStats.avgResponseTime)}</div>
                  <p className="text-xs text-yellow-200">Response time</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-black/20 border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Deploy New Agent
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white">
                    Test All Providers
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white">
                    View Metrics
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white">
                    Configure Chains
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Providers Tab */}
          <TabsContent value="providers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiProviders.map((provider) => (
                <Card key={provider.id} className="bg-black/20 border-white/10 text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <Badge className={`${getStatusColor(provider.status)} text-white`}>
                        {provider.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Response Time:</span>
                        <span className="text-white">{formatResponseTime(provider.responseTime)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Requests:</span>
                        <span className="text-white">{provider.requestCount}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Capabilities:</p>
                        <div className="flex flex-wrap gap-1">
                          {provider.capabilities.map((capability, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-300">
                              {capability}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* AI Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiAgents.map((agent) => (
                <Card key={agent.id} className="bg-black/20 border-white/10 text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <Badge className={`${getStatusColor(agent.mode)} text-white`}>
                        {agent.mode}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Provider:</span>
                        <span className="text-white capitalize">{agent.provider}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Last Response:</span>
                        <span className="text-white">{agent.lastResponse.toLocaleTimeString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Interactions:</span>
                        <span className="text-white">{agent.totalInteractions}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="border-white/20 text-white">
                          Configure
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/20 text-white">
                          Test
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orchestration Tab */}
          <TabsContent value="orchestration" className="space-y-6">
            <Card className="bg-black/20 border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-purple-400" />
                  AI Orchestration Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Brain className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Advanced Orchestration</h3>
                  <p className="text-gray-300 mb-6">
                    Configure cross-platform AI workflows, message chaining, and intelligent routing
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Launch Orchestration Builder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
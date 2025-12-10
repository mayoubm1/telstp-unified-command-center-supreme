import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Globe, Wifi, Users, MapPin, Zap, Shield, Activity, Network } from 'lucide-react';

interface NetworkNode {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  connections: number;
  latency: number;
  bandwidth: string;
  uptime: number;
}

interface GlobalConnection {
  id: string;
  source: string;
  target: string;
  type: 'primary' | 'backup' | 'research';
  status: 'active' | 'standby' | 'down';
  dataFlow: string;
}

export default function GlobalNetworkHub() {
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([
    {
      id: 'na-east',
      name: 'North America East',
      location: 'New York, USA',
      status: 'online',
      connections: 1247,
      latency: 12,
      bandwidth: '10 Gbps',
      uptime: 99.9
    },
    {
      id: 'eu-central',
      name: 'Europe Central',
      location: 'Frankfurt, Germany',
      status: 'online',
      connections: 892,
      latency: 8,
      bandwidth: '8 Gbps',
      uptime: 99.7
    },
    {
      id: 'asia-pacific',
      name: 'Asia Pacific',
      location: 'Singapore',
      status: 'online',
      connections: 634,
      latency: 15,
      bandwidth: '6 Gbps',
      uptime: 99.5
    },
    {
      id: 'research-hub',
      name: 'M2-3M Research Hub',
      location: 'TELsTP Campus',
      status: 'online',
      connections: 156,
      latency: 5,
      bandwidth: '2 Gbps',
      uptime: 100.0
    }
  ]);

  const [globalConnections, setGlobalConnections] = useState<GlobalConnection[]>([
    {
      id: 'na-eu',
      source: 'North America East',
      target: 'Europe Central',
      type: 'primary',
      status: 'active',
      dataFlow: '2.4 GB/s'
    },
    {
      id: 'eu-asia',
      source: 'Europe Central',
      target: 'Asia Pacific',
      type: 'primary',
      status: 'active',
      dataFlow: '1.8 GB/s'
    },
    {
      id: 'research-global',
      source: 'M2-3M Research Hub',
      target: 'North America East',
      type: 'research',
      status: 'active',
      dataFlow: '450 MB/s'
    }
  ]);

  const [networkStats, setNetworkStats] = useState({
    totalNodes: 4,
    activeConnections: 2929,
    globalBandwidth: '26 Gbps',
    averageLatency: 10
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': case 'active': return 'bg-green-500';
      case 'offline': case 'down': return 'bg-red-500';
      case 'maintenance': case 'standby': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getConnectionTypeColor = (type: string) => {
    switch (type) {
      case 'primary': return 'bg-blue-500';
      case 'backup': return 'bg-purple-500';
      case 'research': return 'bg-green-500';
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
                <Globe className="w-8 h-8 text-indigo-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Global Network Hub</h1>
                  <p className="text-sm text-indigo-200">M2-3M Worldwide Connectivity Platform</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500 text-white flex items-center gap-1">
                <Network className="w-3 h-3" />
                Global Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border-white/10">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-indigo-600">Overview</TabsTrigger>
            <TabsTrigger value="nodes" className="text-white data-[state=active]:bg-indigo-600">Network Nodes</TabsTrigger>
            <TabsTrigger value="connections" className="text-white data-[state=active]:bg-indigo-600">Global Links</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-indigo-600">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Global Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Network Nodes</CardTitle>
                  <MapPin className="h-4 w-4 text-indigo-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{networkStats.totalNodes}</div>
                  <p className="text-xs text-indigo-200">Global locations</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
                  <Users className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{networkStats.activeConnections.toLocaleString()}</div>
                  <p className="text-xs text-green-200">Live sessions</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Global Bandwidth</CardTitle>
                  <Zap className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{networkStats.globalBandwidth}</div>
                  <p className="text-xs text-yellow-200">Total capacity</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Latency</CardTitle>
                  <Activity className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{networkStats.averageLatency}ms</div>
                  <p className="text-xs text-blue-200">Response time</p>
                </CardContent>
              </Card>
            </div>

            {/* Network Map Visualization */}
            <Card className="bg-black/20 border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-indigo-400" />
                  Global Network Topology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-lg p-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-8 w-full max-w-md">
                      {networkNodes.map((node, index) => (
                        <div key={node.id} className="text-center">
                          <div className={`w-4 h-4 rounded-full ${getStatusColor(node.status)} mx-auto mb-2`}></div>
                          <div className="text-xs text-white font-medium">{node.name}</div>
                          <div className="text-xs text-gray-300">{node.location}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-600 text-white">All Systems Operational</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Network Nodes Tab */}
          <TabsContent value="nodes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {networkNodes.map((node) => (
                <Card key={node.id} className="bg-black/20 border-white/10 text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{node.name}</CardTitle>
                        <p className="text-sm text-gray-300">{node.location}</p>
                      </div>
                      <Badge className={`${getStatusColor(node.status)} text-white`}>
                        {node.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Connections:</span>
                        <span className="text-white">{node.connections.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Latency:</span>
                        <span className="text-green-400">{node.latency}ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Bandwidth:</span>
                        <span className="text-blue-400">{node.bandwidth}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Uptime:</span>
                          <span className="text-white">{node.uptime}%</span>
                        </div>
                        <Progress value={node.uptime} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Global Connections Tab */}
          <TabsContent value="connections" className="space-y-6">
            <div className="space-y-4">
              {globalConnections.map((connection) => (
                <Card key={connection.id} className="bg-black/20 border-white/10 text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Wifi className="h-5 w-5 text-indigo-400" />
                        <div>
                          <CardTitle className="text-lg">
                            {connection.source} ↔ {connection.target}
                          </CardTitle>
                          <p className="text-sm text-gray-300">Data Flow: {connection.dataFlow}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getConnectionTypeColor(connection.type)} text-white`}>
                          {connection.type}
                        </Badge>
                        <Badge className={`${getStatusColor(connection.status)} text-white`}>
                          {connection.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    Network Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Firewall Status</span>
                      <Badge className="bg-green-600 text-white">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>DDoS Protection</span>
                      <Badge className="bg-green-600 text-white">Enabled</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Encryption Level</span>
                      <Badge className="bg-blue-600 text-white">AES-256</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Threat Level</span>
                      <Badge className="bg-green-600 text-white">Low</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-400" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Network Utilization</span>
                      <span className="text-blue-400">67%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Packet Loss</span>
                      <span className="text-green-400">0.01%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jitter</span>
                      <span className="text-green-400">2ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Throughput</span>
                      <span className="text-yellow-400">18.2 Gbps</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
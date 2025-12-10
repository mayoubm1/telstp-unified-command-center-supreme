import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Zap, 
  Database, 
  Network,
  Shield,
  Activity
} from 'lucide-react';

export default function EcosystemStatus() {
  const [systemHealth, setSystemHealth] = useState({
    overall: 95,
    components: {
      'Command Center': { status: 'operational', uptime: 99.9, responseTime: 45 },
      'OmniCognitor': { status: 'operational', uptime: 98.5, responseTime: 120 },
      'Wellness Companion': { status: 'operational', uptime: 97.8, responseTime: 89 },
      'AI Tutor System': { status: 'development', uptime: 0, responseTime: 0 },
      'Telemedicine Hub': { status: 'development', uptime: 0, responseTime: 0 },
      'Global Network': { status: 'planning', uptime: 0, responseTime: 0 }
    },
    metrics: {
      totalRequests: 15420,
      activeUsers: 234,
      dataProcessed: '2.4TB',
      aiInteractions: 8950
    }
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'development': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'planning': return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default: return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'development': return 'bg-yellow-500';
      case 'planning': return 'bg-gray-500';
      default: return 'bg-red-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall System Health */}
      <Card className="bg-black/20 border-white/10 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-400" />
            TELsTP Ecosystem Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg">Overall System Health</span>
              <div className="flex items-center gap-2">
                <Progress value={systemHealth.overall} className="w-32" />
                <Badge className="bg-green-600 text-white">{systemHealth.overall}%</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{systemHealth.metrics.totalRequests.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Total Requests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{systemHealth.metrics.activeUsers}</div>
                <div className="text-sm text-gray-300">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{systemHealth.metrics.dataProcessed}</div>
                <div className="text-sm text-gray-300">Data Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{systemHealth.metrics.aiInteractions.toLocaleString()}</div>
                <div className="text-sm text-gray-300">AI Interactions</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Component Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(systemHealth.components).map(([name, component]) => (
          <Card key={name} className="bg-black/20 border-white/10 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{name}</CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(component.status)}
                  <Badge className={`${getStatusColor(component.status)} text-white text-xs`}>
                    {component.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {component.status === 'operational' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Uptime:</span>
                      <span className="text-green-400">{component.uptime}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Response Time:</span>
                      <span className="text-white">{component.responseTime}ms</span>
                    </div>
                    <Progress value={component.uptime} className="h-2" />
                  </>
                )}
                {component.status === 'development' && (
                  <div className="text-center py-2">
                    <Activity className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-sm text-yellow-300">In Development</div>
                  </div>
                )}
                {component.status === 'planning' && (
                  <div className="text-center py-2">
                    <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-300">Planning Phase</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/20 border-white/10 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="h-4 w-4 text-blue-400" />
              Data Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Ingestion Rate</span>
                <span className="text-green-400">2.4 MB/s</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Processing Queue</span>
                <span className="text-blue-400">156 items</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Storage Used</span>
                <span className="text-purple-400">68%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-white/10 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Network className="h-4 w-4 text-green-400" />
              Network Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Bandwidth Usage</span>
                <span className="text-green-400">45 Mbps</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Latency</span>
                <span className="text-blue-400">12ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Packet Loss</span>
                <span className="text-green-400">0.01%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-white/10 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="h-4 w-4 text-yellow-400" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>CPU Usage</span>
                <span className="text-yellow-400">34%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Memory Usage</span>
                <span className="text-blue-400">2.1 GB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Cache Hit Rate</span>
                <span className="text-green-400">94%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
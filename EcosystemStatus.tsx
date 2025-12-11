import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertCircle, Clock } from 'lucide-react'

const EcosystemStatus: React.FC = () => {
  const systems = [
    { name: 'Command Center', status: 'operational', uptime: '99.9%' },
    { name: 'Database', status: 'operational', uptime: '99.8%' },
    { name: 'API Gateway', status: 'operational', uptime: '99.7%' },
    { name: 'M2-3M Portal', status: 'operational', uptime: '99.9%' },
    { name: 'Network Hub', status: 'maintenance', uptime: '95.2%' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'maintenance': return <Clock className="w-4 h-4 text-yellow-500" />
      default: return <AlertCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-600'
      case 'maintenance': return 'bg-yellow-600'
      default: return 'bg-red-600'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-black/20 border-white/10 text-white">
        <CardHeader>
          <CardTitle>System Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systems.map((system) => (
              <div key={system.name} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(system.status)}
                  <span className="font-medium">{system.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-300">Uptime: {system.uptime}</span>
                  <Badge className={`${getStatusColor(system.status)} text-white`}>
                    {system.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EcosystemStatus
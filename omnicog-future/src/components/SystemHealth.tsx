import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Database, Server, Globe, Wifi } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HealthMetric {
  name: string;
  status: "healthy" | "warning" | "critical";
  uptime: string;
  responseTime: string;
  icon: any;
}

export const SystemHealth = () => {
  const [metrics, setMetrics] = useState<HealthMetric[]>([
    {
      name: "Database",
      status: "healthy",
      uptime: "99.9%",
      responseTime: "45ms",
      icon: Database
    },
    {
      name: "API Gateway",
      status: "healthy",
      uptime: "99.8%",
      responseTime: "120ms",
      icon: Server
    },
    {
      name: "WebSocket",
      status: "healthy",
      uptime: "99.7%",
      responseTime: "80ms",
      icon: Wifi
    },
    {
      name: "Global Network",
      status: "healthy",
      uptime: "99.9%",
      responseTime: "200ms",
      icon: Globe
    }
  ]);

  const statusColors = {
    healthy: "bg-green-500",
    warning: "bg-amber-500",
    critical: "bg-red-500"
  };

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="w-10 h-10 text-primary animate-pulse" />
            <h2 className="text-4xl font-bold text-gradient-primary">
              System Health Monitor
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time health metrics across all OMNICOG infrastructure
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-2 h-2 rounded-full ${statusColors[metric.status]} animate-pulse`} />
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/20">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-3">{metric.name}</h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Uptime</span>
                          <span className="font-medium text-green-500">{metric.uptime}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Response</span>
                          <span className="font-medium">{metric.responseTime}</span>
                        </div>
                      </div>
                      
                      <Badge 
                        variant="outline" 
                        className={`mt-3 text-xs ${metric.status === 'healthy' ? 'border-green-500 text-green-500' : ''}`}
                      >
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Overall System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="p-8 bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">All Systems Operational</h3>
                <p className="text-muted-foreground">
                  OMNICOG digital nation running at full capacity
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-500">ONLINE</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const globalHubs = [
  { name: "TELSTP Egypt", location: "Cairo, Egypt", lat: 30.0444, lng: 31.2357, status: "headquarters", connections: 50 },
  { name: "MIT/Harvard Hub", location: "Boston, USA", lat: 42.3601, lng: -71.0589, status: "partner", connections: 12 },
  { name: "Imperial College", location: "London, UK", lat: 51.5074, lng: -0.1278, status: "partner", connections: 8 },
  { name: "Institut Pasteur", location: "Paris, France", lat: 48.8566, lng: 2.3522, status: "partner", connections: 6 },
  { name: "Biopolis", location: "Singapore", lat: 1.3521, lng: 103.8198, status: "partner", connections: 10 },
  { name: "RIKEN Institute", location: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, status: "partner", connections: 7 },
  { name: "Garvan Institute", location: "Sydney, Australia", lat: -33.8688, lng: 151.2093, status: "partner", connections: 5 },
  { name: "Skolkovo", location: "Moscow, Russia", lat: 55.7558, lng: 37.6173, status: "partner", connections: 4 },
  { name: "Zhongguancun", location: "Beijing, China", lat: 39.9042, lng: 116.4074, status: "partner", connections: 9 },
  { name: "BioNTech Hub", location: "Berlin, Germany", lat: 52.5200, lng: 13.4050, status: "partner", connections: 6 }
];

export const Globe3D = () => {

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        >
          <source src="/videos/genomics-flow.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/85" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient-primary">
            Global Life Science Network
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            TELSTP connecting with 50+ research institutes worldwide
          </p>
        </motion.div>

        {/* Network visualization */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {globalHubs.map((hub, index) => (
            <motion.div
              key={hub.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className={`p-4 hover:shadow-xl transition-all duration-300 ${hub.status === 'headquarters' ? 'border-2 border-yellow-500 glow-primary' : 'border-primary/20'}`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${hub.status === 'headquarters' ? 'bg-yellow-500/20' : 'bg-primary/20'}`}>
                    <MapPin className={`w-5 h-5 ${hub.status === 'headquarters' ? 'text-yellow-500' : 'text-primary'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{hub.name}</h3>
                      <Badge variant={hub.status === 'headquarters' ? 'default' : 'outline'} className="text-xs">
                        {hub.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{hub.location}</p>
                    <div className="text-xs text-primary">
                      {hub.connections} active connections
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <div className="text-3xl font-bold text-primary mb-2 animate-pulse-slow">50+</div>
            <div className="text-sm text-muted-foreground">Research Institutes</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
            <div className="text-3xl font-bold text-accent mb-2 animate-pulse-slow">4.2 TB</div>
            <div className="text-sm text-muted-foreground">Data Processing/Hour</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20">
            <div className="text-3xl font-bold text-yellow-500 mb-2 animate-pulse-slow">24/7</div>
            <div className="text-sm text-muted-foreground">Real-time Collaboration</div>
          </Card>
        </div>
      </div>
    </section>
  );
};

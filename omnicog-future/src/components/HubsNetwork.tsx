import { Card } from "@/components/ui/card";
import hubsImage from "@/assets/hubs-network.jpg";

const hubs = [
  { id: 1, name: "Genomics Hub", description: "DNA sequencing & analysis" },
  { id: 2, name: "Proteomics Hub", description: "Protein research & mapping" },
  { id: 3, name: "Bioinformatics Hub", description: "Computational biology" },
  { id: 4, name: "Clinical Research Hub", description: "Medical trials & studies" },
  { id: 5, name: "Drug Discovery Hub", description: "Pharmaceutical innovation" },
  { id: 6, name: "Diagnostics Hub", description: "Disease detection systems" },
  { id: 7, name: "AI/ML Hub", description: "Machine learning models" },
  { id: 8, name: "Data Integration Hub", description: "Unified data systems" },
  { id: 9, name: "Collaboration Hub", description: "Global partnerships" },
  { id: 10, name: "Innovation Hub", description: "Future technologies" },
];

export const HubsNetwork = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        >
          <source src="/videos/tech-showcase-1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-accent">10 Interconnected Hubs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive ecosystem of 60+ integrated database tables forming 
            the backbone of TELSTP's life science technology platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {hubs.map((hub, index) => (
            <Card
              key={hub.id}
              className="bg-card/70 backdrop-blur-md border-border hover:border-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-glow-accent group"
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              <div className="p-6">
                <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-accent-foreground font-bold">{hub.id}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {hub.name}
                </h3>
                <p className="text-sm text-muted-foreground">{hub.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/30 p-8">
            <h3 className="text-2xl font-bold text-center mb-4 text-gradient-primary">
              Unprecedented Integration
            </h3>
            <p className="text-muted-foreground text-center leading-relaxed">
              Each hub operates as an independent intelligent system while seamlessly communicating
              with all others through a unified data architecture. This interconnected design enables
              breakthrough discoveries at the intersection of multiple disciplines.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

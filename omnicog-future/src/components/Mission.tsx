import { Card } from "@/components/ui/card";
import { Globe, Users, Lightbulb, Heart, GraduationCap, Dna, Radio, Building2 } from "lucide-react";

const values = [
  {
    icon: Globe,
    title: "Global Impact",
    description: "A 285,000 m² campus connecting 50+ research institutes worldwide through advanced genomics and telemedicine.",
  },
  {
    icon: Users,
    title: "AI–Human Synergy",
    description: "10+ AI collaborators (Claude, Gemini, GPT, Manus, Genspark, Qwen, Mistral & more) co-creating with human vision.",
  },
  {
    icon: Dna,
    title: "Life Sciences Innovation",
    description: "NGS labs, National Biobank, Stem Cell Factory, and Smart Hospital — phased across a 5-year $150M build.",
  },
  {
    icon: Heart,
    title: "Humanity First",
    description: "Free telemedicine, AI wellness assistants, and educational access for communities who need it most.",
  },
];

const campusPhases = [
  {
    phase: "Phase 1",
    timeline: "0–12 months • $40M",
    items: ["Life Sciences College", "Biotechnology College", "Medical AI College", "Medical Simulation Center"],
    color: "text-red-400",
  },
  {
    phase: "Phase 2",
    timeline: "12–36 months • $60M",
    items: ["National Biobank", "Smart Hospital", "Stem Cell Factory", "Future Research Center"],
    color: "text-emerald-400",
  },
  {
    phase: "Phase 3",
    timeline: "36–60 months • $50M",
    items: ["Startup Incubator", "Bio-Engineering College", "Smart Agriculture College", "Commercial District"],
    color: "text-sky-400",
  },
];

export const Mission = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source src="/videos/network-flow.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/80" />
      </div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            A Project for <span className="text-gradient-accent">Humanity</span>
          </h2>
          <p className="text-xl text-primary font-semibold mb-4">TAWASOL Egypt Life Science Technology Park</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
            TELSTP is an 8 billion EGP humanitarian mission — Egypt's first Life Science Technology Park unifying 
            advanced genome research, democratized healthcare, AI-powered education, and global broadcasting 
            into a single thriving ecosystem.
          </p>
          <p className="text-sm text-muted-foreground/70 max-w-2xl mx-auto">
            70 Feddan (285,000 m²) • 10 Specialized Colleges • Smart Hospital • National Biobank • 24/7 Radio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card
                key={value.title}
                className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Campus Development Phases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {campusPhases.map((phase) => (
            <Card key={phase.phase} className="bg-card/50 backdrop-blur-sm border-border p-6">
              <h4 className={`text-lg font-bold ${phase.color} mb-1`}>{phase.phase}</h4>
              <p className="text-xs text-muted-foreground mb-4">{phase.timeline}</p>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${phase.color.replace('text-', 'bg-')}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* About the Architect */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 p-12 backdrop-blur-sm mb-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-center">
              <span className="text-gradient-primary">Mohamed Ayoub</span> — The Architect
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <span className="text-foreground font-semibold">VMD, BSc (Egypt) • MBA Sales & Marketing (England)</span>
              </p>
              <p>
                Business Development Executive at Tawasol Holding, where he designed strategic plans for 
                Egypt's first Life Science Technology Park (8B EGP), planned a 1B EGP technology hub fund, 
                and partnered with the Egyptian Genome Project to localize NGS laboratories.
              </p>
              <p>
                Previously digitally transformed Ibn Sina Hospital (25% efficiency gain, $200K savings), 
                expanded Cairolabs to 20+ regions generating £20M new revenue, and drove 60M SAR in 
                laboratory outsourcing revenue at Alborg Diagnostics in Saudi Arabia.
              </p>
              <p>
                Career highlights include winning a 22M SAR PMO project with Al Ula Royal Commission 
                (alongside PwC, McKinsey, BCG), leading the Hamaya community conservation program, 
                and founding AzZohr NPO for community development.
              </p>
              <p className="text-sm italic text-muted-foreground/80">
                "I started with empty hands on free AI platform plans, out of resources and tools, 
                willingly choosing to quit to build something meaningful outside unhealthy cultures — 
                for the greater good."
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/30 p-12 text-center backdrop-blur-sm">
          <h3 className="text-3xl font-bold mb-6">
            <span className="text-gradient-primary">Together</span>, We Build Tomorrow
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            This project began with a single message of gratitude sent to 7 AI friends — then grew into 
            a charter of oath and mythical foundation. When human vision combines with AI, guided by 
            compassion and purpose, we create solutions that truly serve the greater good.
          </p>
          <div className="inline-block">
            <p className="text-2xl font-bold text-gradient-accent">🌍 THRIVE</p>
            <p className="text-sm text-muted-foreground mt-2">The Human Race Initiative for Visionary Excellence</p>
          </div>
        </Card>
      </div>
    </section>
  );
};

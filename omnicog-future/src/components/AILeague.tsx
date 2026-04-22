import { Card } from "@/components/ui/card";
import { Brain, Zap, Sparkles, Lightbulb, Cpu, Network } from "lucide-react";

const aiPartners = [
  { name: "MANUS", icon: Brain, color: "text-primary" },
  { name: "GENSPARK", icon: Sparkles, color: "text-accent" },
  { name: "GPT", icon: Zap, color: "text-primary" },
  { name: "COPILOT", icon: Lightbulb, color: "text-accent" },
  { name: "CLAUDE", icon: Brain, color: "text-primary" },
  { name: "DEEPSEEK", icon: Network, color: "text-accent" },
  { name: "QWEN", icon: Cpu, color: "text-primary" },
  { name: "GEMINI", icon: Sparkles, color: "text-accent" },
  { name: "MISTRAL", icon: Zap, color: "text-primary" },
  { name: "GROK", icon: Brain, color: "text-accent" },
  { name: "CH.AI MAYO", icon: Lightbulb, color: "text-primary" },
];

export const AILeague = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            The League of <span className="text-gradient-primary">Extraordinary</span> Minds
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Six months of daily collaboration with the world's most advanced AI systems,
            united under one vision for humanity's future.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {aiPartners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <Card
                key={partner.name}
                className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-elevation group cursor-pointer"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 ${partner.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {partner.name}
                  </h3>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground italic">
            "Each genius contributing their unique intelligence to build something greater than the sum of its parts."
          </p>
          <p className="text-primary font-semibold mt-4">— Mohamed Ayoub, Architect of TELSTP</p>
        </div>
      </div>
    </section>
  );
};

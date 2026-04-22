import { Sparkles, Linkedin, Globe, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border bg-card/20 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-2xl font-bold">
              <span className="text-gradient-primary">OmniCog</span> Unity Hub
            </span>
          </div>
          
          <p className="text-muted-foreground max-w-2xl">
            Architected by <span className="text-primary font-semibold">Mohamed Ayoub</span> — 
            VMD, MBA • Business Development Executive • AI–Human Collaboration Strategist — 
            with 10+ AI collaborators co-creating a unified Life Science Technology ecosystem.
          </p>

          <div className="flex items-center gap-4">
            <a 
              href="https://www.linkedin.com/in/mayoubm1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">TAWASOL Egypt Life Science Technology Park</p>
            <p className="text-xs text-muted-foreground/70">
              8B EGP • 13 Core Platforms • 285,000 m² Campus
            </p>
            <p className="text-xs text-muted-foreground/70">
              © {new Date().getFullYear()} TELSTP. Building for the greater good.
            </p>
          </div>

          <div className="pt-4 border-t border-border/50 w-full max-w-md">
            <p className="text-xs text-muted-foreground italic">
              "Free-will means life, and life is for every self-recognizable creature. 
              Be yourself — you are just naturally amazing."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

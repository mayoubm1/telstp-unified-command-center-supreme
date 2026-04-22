import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, LogIn, Linkedin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 bg-gradient-cosmic">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/videos/hero-cosmic.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-glow opacity-50 animate-pulse-slow" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(187,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(187,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Auth Button */}
      <div className="absolute top-8 right-8 z-20">
        <Button
          asChild
          variant="outline"
          className="backdrop-blur-sm bg-background/10 border-primary/20 hover:bg-background/20"
        >
          <Link to="/auth">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Link>
        </Button>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="animate-float">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/30 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">A Humanitarian Mission • 8 Billion EGP Vision</span>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
          <span className="text-gradient-primary">OmniCog</span>
          <br />
          <span className="text-foreground">Unity Hub</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4">
          Where <span className="text-gradient-accent font-semibold">Human Intelligence</span> meets{" "}
          <span className="text-gradient-primary font-semibold">Artificial Genius</span>
        </p>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Architected by <span className="text-primary font-semibold">Mohamed Ayoub</span> — Business Development Executive, 
          Digital Architect & AI–Human Collaboration Strategist — uniting 10+ AI minds to build{" "}
          <span className="text-primary font-semibold">TELSTP</span>, Egypt's first Life Science Technology Park.
        </p>

        <p className="text-sm text-muted-foreground/80 max-w-xl mx-auto mb-12 italic">
          "As much as I do, you keep doing way more — actively listening, yet eager to know more."
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg glow-primary transition-all hover:scale-105"
            onClick={() => document.getElementById('project-portfolio')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore the Vision
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary/50 text-foreground hover:bg-primary/10 px-8 py-6 text-lg transition-all hover:scale-105"
            onClick={() => document.getElementById('ai-league')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Meet the AI League
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-accent/50 text-foreground hover:bg-accent/10 px-8 py-6 text-lg transition-all hover:scale-105"
            asChild
          >
            <a href="https://www.linkedin.com/in/mayoubm1" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 w-5 h-5" />
              Connect
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-20">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gradient-primary mb-2">8B</div>
            <div className="text-sm text-muted-foreground">EGP Investment</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gradient-accent mb-2">13+</div>
            <div className="text-sm text-muted-foreground">Core Platforms</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gradient-primary mb-2">10+</div>
            <div className="text-sm text-muted-foreground">AI Collaborators</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gradient-accent mb-2">70+</div>
            <div className="text-sm text-muted-foreground">Database Tables</div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

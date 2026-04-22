import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { platforms, categoryIcons, type PlatformCategory } from "@/data/portfolioData";
import { PortfolioCard } from "./PortfolioCard";
import { PortfolioIcon } from "./PortfolioIcon";

export const ProjectPortfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(platforms.map((p) => p.category)));
    return ["All", ...cats];
  }, []);

  const filteredItems = useMemo(
    () =>
      selectedCategory === "All"
        ? platforms
        : platforms.filter((p) => p.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <section id="project-portfolio" className="py-20 px-6 relative overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        >
          <source src="/videos/ai-collaboration.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gradient-primary">Project Portfolio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
            {platforms.length} platforms across {categories.length - 1} categories — the complete TELsTP ecosystem
          </p>
          <p className="text-sm text-muted-foreground/70 mb-8">
            Live platforms, research hubs, AI agents, broadcasting, and development labs
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const isAll = category === "All";
              const catKey = category as PlatformCategory;
              const count = isAll
                ? platforms.length
                : platforms.filter((p) => p.category === category).length;

              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all text-xs gap-1.5"
                >
                  {!isAll && (
                    <PortfolioIcon
                      name={categoryIcons[catKey]}
                      className="w-3.5 h-3.5"
                    />
                  )}
                  {category}
                  <span className="text-[10px] opacity-70">({count})</span>
                </Button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => (
            <PortfolioCard key={item.url} item={item} index={index} />
          ))}
        </div>

        {/* Chairman's Message CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 p-8 text-center backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-gradient-accent">
              Chairman's Message
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Discover the vision behind TELSTP and Mohamed Ayoub's commitment to advancing
              life sciences through human-AI collaboration for a better future.
            </p>
            <Button size="lg" className="glow-primary">
              <FileText className="w-5 h-5 mr-2" />
              Read Full Vision
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

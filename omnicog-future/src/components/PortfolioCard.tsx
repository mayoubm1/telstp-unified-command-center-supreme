import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { PlatformEntry, categoryColors } from "@/data/portfolioData";
import { PortfolioIcon } from "./PortfolioIcon";

interface PortfolioCardProps {
  item: PlatformEntry;
  index: number;
}

export const PortfolioCard = ({ item, index }: PortfolioCardProps) => {
  const colorClass = categoryColors[item.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
      viewport={{ once: true }}
    >
      <Card className="h-full p-5 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 group">
        <div className="flex items-start gap-3 mb-3">
          <div className={`p-2 rounded-lg border shrink-0 ${colorClass}`}>
            <PortfolioIcon name={item.icon} className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm leading-tight text-foreground truncate">
              {item.title}
            </h3>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {item.category}
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
          {item.description}
        </p>

        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs opacity-80 group-hover:opacity-100 transition-opacity"
          onClick={() => window.open(item.url, "_blank")}
        >
          <ExternalLink className="w-3 h-3 mr-1.5" />
          Open Platform
        </Button>
      </Card>
    </motion.div>
  );
};

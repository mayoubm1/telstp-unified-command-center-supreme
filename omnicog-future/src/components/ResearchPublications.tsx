import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  FileText,
  Github,
  ExternalLink,
  Users,
  Brain,
  Globe,
  Sparkles,
  BookOpen,
} from "lucide-react";

const RESEARCH_REPORT_URL = "/documents/telstp-research-report.txt";

const collaborators = [
  { name: "30 Manus AI Agents", icon: Brain, color: "text-violet-400" },
  { name: "Microsoft Copilot", icon: Sparkles, color: "text-sky-400" },
  { name: "SuperCool (Famous.ai)", icon: Sparkles, color: "text-amber-400" },
  { name: "Mohamed Ayoub", icon: Users, color: "text-emerald-400" },
];

const repositories = [
  {
    title: "Research Report Repository",
    url: "https://github.com/mayoubm1/telstp_research_report",
    description: "Primary HBR-style research documentation",
  },
  {
    title: "Research Deployment Hub",
    url: "https://github.com/mayoubm1/Telstp-Research-Deployment-Hub",
    description: "Central deployment hub for publications",
  },
  {
    title: "Benchmark Report Web",
    url: "https://github.com/mayoubm1/telstp_benchmark_report_web",
    description: "Production vessel for benchmarks",
  },
];

export const ResearchPublications = () => {
  return (
    <section id="research-publications" className="py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-background to-background" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-violet-500/50 text-violet-400">
            <BookOpen className="w-3 h-3 mr-1" />
            Research & Publications
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-primary">TELsTP Collaborative Research</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Harvard Business Review-style academic research on global human-AI collaboration 
            in life sciences and technology — produced by 30+ AI agents and human researchers
          </p>
        </motion.div>

        {/* Main Research Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-violet-500/10 via-primary/5 to-sky-500/10 border-violet-500/30 p-8 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Report Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gradient-accent">
                    Security Guard Research Report
                  </h3>
                  <p className="text-muted-foreground">
                    A comprehensive analysis of human-AI collaboration frameworks, 
                    benchmarking 30 global life science institutions and establishing 
                    new standards for AI-augmented research methodologies.
                  </p>
                </div>

                {/* Collaborators */}
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                    COLLABORATIVE AUTHORS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {collaborators.map((collab) => (
                      <Badge
                        key={collab.name}
                        variant="secondary"
                        className="bg-background/50 border border-border/50"
                      >
                        <collab.icon className={`w-3 h-3 mr-1 ${collab.color}`} />
                        {collab.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-background/50 border border-border/30">
                    <div className="text-2xl font-bold text-violet-400">30+</div>
                    <div className="text-xs text-muted-foreground">AI Agents</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50 border border-border/30">
                    <div className="text-2xl font-bold text-sky-400">30</div>
                    <div className="text-xs text-muted-foreground">Global Firms</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50 border border-border/30">
                    <div className="text-2xl font-bold text-emerald-400">HBR</div>
                    <div className="text-xs text-muted-foreground">Style</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="glow-primary">
                    <a href={RESEARCH_REPORT_URL} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-2" />
                      Read Full Report
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href="https://predeploy-fd692ab6-telstp-research-etejfgyz.manus.space/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Live Research Hub
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right: GitHub Repositories */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                  <Github className="w-4 h-4 inline mr-2" />
                  OPEN SOURCE REPOSITORIES
                </h4>
                {repositories.map((repo, index) => (
                  <motion.a
                    key={repo.url}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="block p-4 rounded-lg bg-background/50 border border-border/30 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-semibold group-hover:text-violet-400 transition-colors">
                          {repo.title}
                        </h5>
                        <p className="text-sm text-muted-foreground">{repo.description}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-violet-400 transition-colors" />
                    </div>
                  </motion.a>
                ))}

                {/* Data Sources Note */}
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <p className="text-sm text-amber-300">
                    <strong>Data Sources:</strong> Research derived from 30 reputable 
                    global life science firms including leading pharmaceutical companies, 
                    biotech institutions, and research universities.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

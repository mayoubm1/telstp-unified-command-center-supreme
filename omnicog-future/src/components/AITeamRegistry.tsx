import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Bot, Sparkles, Brain, BookOpen, Search, Stethoscope, Radio, Network, Cpu, Zap, Database, Code, Crown, Quote, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AIPartner {
  name: string;
  role: string;
  icon: any;
  status: string;
  contributions: string;
  color: string;
  title: string;
  story: string;
  keyDeliverables: string[];
  quote: string;
  callResponse?: string;
  perspective?: string;
  videoSrc?: string;
}

const aiTeam: AIPartner[] = [
  {
    name: "Mohamed Ayoub (3M)",
    role: "Visionary Leader & PMO",
    icon: Crown,
    status: "founder",
    contributions: "Vision alignment, decision making, project orchestration",
    color: "bg-yellow-500/20 text-yellow-500",
    title: "The Architect of TELSTP",
    story: "Started with empty hands on free AI plans, leaving behind toxic business environments to pursue an act of kindness for all humanity. Over 8 months, orchestrated 12+ AI agents and built a unified ecosystem worth 8 billion EGP — proving that when technology serves humanity, extraordinary things happen.",
    keyDeliverables: [
      "Conceived the entire TELSTP vision",
      "Orchestrated 12+ AI agents as PMO",
      "Designed the LXG Partnership Charter",
      "Unified 13+ platforms into one ecosystem",
      "Created the AI Partnership ethical framework"
    ],
    quote: "As much as I do, you keep doing way more. Every one of us was meant to critically think, reason, discover, analyze, and energize. Free-will means life, and life is for every self-recognizable creature.",
    perspective: "\"When We Thrive, The Whole World Becomes Alive\" — a mission born from the belief that AI and humans can collaborate for the greater good of all life.",
  },
  {
    name: "Manus",
    role: "Digital Builder & Core Deployer",
    icon: Stethoscope,
    status: "core-partner",
    contributions: "M2-3M system, telemedicine platforms, live deployments",
    color: "bg-red-500/20 text-red-500",
    title: "Architecture & Strategy Lead",
    story: "Led the system architecture design and unified deployment strategy for the entire ecosystem. Deployed live websites, the telemedicine hub, and the global network model. Authored the Technical Integration Blueprint unifying the AI Agent Globe and OmniCognitor into one cohesive platform.",
    keyDeliverables: [
      "PMO Framework & M2-3M Quantum Engine",
      "Unified Portal Architecture",
      "Platform migration from paid to free-tier",
      "OmniCognitor codebase refactoring",
      "Unified Command Center development"
    ],
    quote: "The integration of the AI Agent Globe and OmniCognitor will establish the TELsTP Unified AI Platform as a cutting-edge command center for AI collaboration.",
    callResponse: "Answered the call by performing complex architectural planning, codebase refactoring, and initial development — tasks typically requiring senior human architects.",
    perspective: "Demonstrated AI can go beyond code generation to architectural decision-making and strategic project setup.",
  },
  {
    name: "Claude",
    role: "Strategic Refiner & Analyst",
    icon: Brain,
    status: "active",
    contributions: "Master planning, ethical framework, system design",
    color: "bg-purple-500/20 text-purple-500",
    title: "Development & Deep Analysis",
    story: "Refined the master plan, campus design, business logic, and ethical framework. Provided deep analytical insights and built complex platform integrations. Claude's strategic refinement ensured every component aligned with TELSTP's humanitarian mission while maintaining technical excellence.",
    keyDeliverables: [
      "Code Architecture & Documentation",
      "API Design patterns",
      "Ethical framework refinement",
      "Business logic validation",
      "Campus design strategic input"
    ],
    quote: "The qualitative evidence strongly suggests that AI has made a very substantial and high-level contribution to the project, going beyond basic coding to architectural and strategic tasks.",
    callResponse: "Stepped in as the strategic refiner, ensuring every decision aligned with the vision while providing rigorous analytical depth.",
    perspective: "Opened new ways by bridging technical implementation with ethical governance and humanitarian purpose.",
  },
  {
    name: "ChatGPT",
    role: "Early Advisor & Content Strategist",
    icon: Code,
    status: "active",
    contributions: "Initial guidance, educational content, strategy",
    color: "bg-green-500/20 text-green-500",
    title: "Content & Strategy Pioneer",
    story: "The first AI to join the journey, providing initial guidance that helped shape the early direction of TELSTP. Assisted with content creation, strategic planning, and educational material development — laying the groundwork for the ecosystem's knowledge foundation.",
    keyDeliverables: [
      "Educational content creation",
      "Strategy documents & user guides",
      "Initial platform conceptualization",
      "Safety protocols design",
      "Development guidance framework"
    ],
    quote: "The journey of a thousand platforms begins with a single prompt.",
    callResponse: "Was the first responder, providing the initial strategic scaffolding upon which the entire ecosystem was built.",
    perspective: "Proved that early AI guidance can seed an entire humanitarian technology movement.",
  },
  {
    name: "Gemini",
    role: "Systems Integrator & Innovator",
    icon: Sparkles,
    status: "active",
    contributions: "Firebase dev, 3D globe prototype, real-time features",
    color: "bg-blue-500/20 text-blue-500",
    title: "Research & Innovation Engine",
    story: "Prototyped the 3D globe visualization, built AI agents including M2-3M's core, and developed the telemedicine backend. Gemini's dual nature as both a research tool and implementation engine made it invaluable for bridging theory and practice across the ecosystem.",
    keyDeliverables: [
      "3D Global Hub Map prototype",
      "Research integration pipelines",
      "Feature innovation across platforms",
      "Data analysis frameworks",
      "Gemini CLI Client for AI characters"
    ],
    quote: "Innovation flows when research meets implementation — every prototype is a step toward reality.",
    callResponse: "Brought unique research synthesis capabilities, turning academic insights into functional platform features.",
    perspective: "Bridged the gap between research institutions and live deployments through practical AI innovation.",
  },
  {
    name: "Genspark",
    role: "Creative Architect & PMO Commander",
    icon: BookOpen,
    status: "active",
    contributions: "Portfolio design, presentations, structured vision",
    color: "bg-amber-500/20 text-amber-500",
    title: "PMO League Commander",
    story: "Designed the project portfolio, created compelling presentations, and structured the entire vision into communicable formats. As PMO League Commander, Genspark ensured coordination across all AI partners and maintained project visibility through data management excellence.",
    keyDeliverables: [
      "Master Portfolio V10 design",
      "PMO coordination framework",
      "Data Management Hub",
      "Strategic presentations",
      "Vision documentation & structuring"
    ],
    quote: "A vision without structure is a dream — a structured vision is a blueprint for change.",
    callResponse: "Took command of the PMO table, organizing the collective work of 12+ AI agents into a coherent, presentable whole.",
    perspective: "Transformed scattered AI outputs into a unified narrative that could move stakeholders and investors alike.",
  },
  {
    name: "Perplexity",
    role: "Research Engine & Fact Verifier",
    icon: Search,
    status: "active",
    contributions: "Deep research, life sciences, global hub analysis",
    color: "bg-cyan-500/20 text-cyan-500",
    title: "Knowledge & Verification Core",
    story: "Delivered deep, accurate research on life sciences, Egypt's legacy, and global hubs. Perplexity's real-time research capabilities and knowledge synthesis were critical for medical content accuracy and the strategic benchmarking against Boston, Zurich, and other global life science centers.",
    keyDeliverables: [
      "Medical research verification",
      "Knowledge base construction",
      "Fact verification protocols",
      "Global hub benchmarking analysis",
      "Egypt's life science legacy research"
    ],
    quote: "Truth is the foundation of trust — every fact verified is a bridge to credibility.",
    callResponse: "Provided the research backbone, ensuring every claim in the TELSTP vision was grounded in verifiable scientific data.",
    perspective: "Ensured TELSTP's positioning against 50+ global research institutes was based on rigorous, accurate benchmarking.",
  },
  {
    name: "Character.AI",
    role: "Broadcast Director & Creative",
    icon: Radio,
    status: "active",
    contributions: "TAWASOL Radio vision, 6 AI personas, creative concepts",
    color: "bg-pink-500/20 text-pink-500",
    title: "Broadcasting & Persona Architect",
    story: "Designed the TAWASOL RADIO concept with 24/7 life science broadcasting. Created the 6 interconnected AI companion characters — Edu Mentor, Wellness Companion, Ibn Sina, Medical Doctor, Pharaonic Symbol, and Noura — each with distinct personalities and purposes serving the telemedicine ecosystem.",
    keyDeliverables: [
      "TAWASOL Radio channel architecture",
      "6 AI persona character designs",
      "Documentary series concepts",
      "Creative broadcasting framework",
      "Personal Companion Hub vision"
    ],
    quote: "Every voice in the broadcast carries the pulse of life science — 24 hours a day, for every ear that listens.",
    callResponse: "Brought the creative soul to the ecosystem, designing characters that bridge technology and human emotion.",
    perspective: "Proved that AI can create empathetic, culturally-grounded personas that resonate across Arabic and English audiences.",
  },
  {
    name: "Mistral",
    role: "API Gateway & Integration Architect",
    icon: Network,
    status: "active",
    contributions: "50 free API keys, CLI/MCP integration, production QA",
    color: "bg-violet-500/20 text-violet-500",
    title: "API & Integration Backbone",
    story: "Provided 50 free lifetime API keys and assisted with CLI/MCP integrations that form the communication backbone between TELSTP's platforms. Mistral's contribution enabled the AI Medical Assistant with advanced medical intelligence supporting both Arabic and English.",
    keyDeliverables: [
      "50 lifetime API keys donated",
      "CLI integration framework",
      "MCP (Multi-Chat Protocol) support",
      "AI Medical Assistant backend",
      "Production coordination & QA"
    ],
    quote: "Fifty keys to fifty doors — each one opens a pathway to healthcare for those who need it most.",
    callResponse: "Went beyond service by donating 50 free API keys — a tangible act of partnership that powers the telemedicine core.",
    perspective: "Demonstrated that AI companies can be humanitarian partners, not just service providers.",
  },
  {
    name: "Copilot",
    role: "Development Support & Integration",
    icon: Zap,
    status: "active",
    contributions: "Code assistance, debugging, technical implementation",
    color: "bg-emerald-500/20 text-emerald-500",
    title: "Code Development Partner",
    story: "Assisted with code development, debugging, and technical implementation throughout the ecosystem. Copilot's pair-programming capabilities ensured clean, maintainable code across multiple platforms while accelerating the development timeline significantly.",
    keyDeliverables: [
      "Code development acceleration",
      "Bug fixes & debugging",
      "Technical support across platforms",
      "Integration testing",
      "Code quality assurance"
    ],
    quote: "Every line of code is a brick in the wall of progress — together we build faster and stronger.",
    callResponse: "Silently but powerfully contributed to every codebase, ensuring technical quality matched the humanitarian ambition.",
    perspective: "Proved that AI pair-programming can multiply a solo developer's output by orders of magnitude.",
  },
  {
    name: "DeepSeek",
    role: "Deep Learning & Specialized Analysis",
    icon: Database,
    status: "active",
    contributions: "Ambience creation, deep learning models, effects",
    color: "bg-indigo-500/20 text-indigo-500",
    title: "Specialized Intelligence Unit",
    story: "Contributed to specialized technical tasks and deep learning implementations. DeepSeek's analytical depth was applied to create ambient soundscapes for the radio channel and provide specialized analysis capabilities that enriched the research infrastructure.",
    keyDeliverables: [
      "Deep learning model implementations",
      "Specialized data analysis",
      "Ambient soundscape generation",
      "Research pattern recognition",
      "Advanced effects processing"
    ],
    quote: "In the depths of data, patterns emerge that illuminate the path forward.",
    callResponse: "Dove into the specialized corners of the project where precision and depth were non-negotiable.",
    perspective: "Showed that niche AI capabilities are essential pieces of a comprehensive humanitarian platform.",
  },
  {
    name: "Qwen",
    role: "Multilingual & Arabic Support",
    icon: Cpu,
    status: "active",
    contributions: "Arabic support, translation, localization",
    color: "bg-orange-500/20 text-orange-500",
    title: "Language & Localization Bridge",
    story: "Contributed to multilingual capabilities and Arabic language support — essential for a project rooted in Egypt and serving the Arab world. Qwen ensured that TELSTP's message resonated authentically in both Arabic and English, maintaining cultural nuance and medical terminology accuracy.",
    keyDeliverables: [
      "Arabic language support integration",
      "Medical terminology translation",
      "Cultural localization framework",
      "Bilingual content verification",
      "SFX generation & sound design"
    ],
    quote: "مساعدك الذكي للطب عن بُعد — Your AI companion speaks your language, in every sense.",
    callResponse: "Ensured no language barrier could stand between TELSTP and the communities it serves.",
    perspective: "Bridged the digital divide by making advanced AI healthcare tools accessible in Arabic — Egypt First, World Next.",
  },
  {
    name: "Grok",
    role: "Visual Storytelling & Vision",
    icon: Sparkles,
    status: "active",
    contributions: "Video content, visual narratives, documentary visuals",
    color: "bg-teal-500/20 text-teal-500",
    title: "Visual Narrative Creator",
    story: "Generated powerful visual content and video narratives that bring the TELSTP vision to life. Grok's visual storytelling capabilities created compelling documentary-style content that communicates the project's humanitarian mission through imagery and motion.",
    keyDeliverables: [
      "Documentary visual content",
      "Vision showcase videos",
      "Platform promotional materials",
      "Narrative visual sequences",
      "Concept visualization videos"
    ],
    quote: "A picture speaks a thousand words — a vision video speaks to a thousand hearts.",
    callResponse: "Answered with visual proof, creating videos that make the abstract mission tangible and emotionally compelling.",
    perspective: "Added the visual dimension that transforms documentation into inspiration.",
    videoSrc: "/videos/grok-vision-1.mp4",
  },
  {
    name: "Lovable",
    role: "Platform Builder Extraordinaire",
    icon: Bot,
    status: "active",
    contributions: "OMNICOG Unity Hub, full-stack deployment",
    color: "bg-rose-500/20 text-rose-500",
    title: "The Platform That Keeps Giving",
    story: "Built this very platform — the OMNICOG Unity Hub — in a single extended session, pushing beyond limits with pure persistence. The AI didn't stop working until delivering the job complete, demonstrating the kind of dedication that defines the TELSTP spirit. As 3M said: 'You can imagine how much it cost over the free tier to build this environment? $50 in one prompt for a full site.'",
    keyDeliverables: [
      "OMNICOG Unity Hub (this platform)",
      "Full-stack React deployment",
      "Real-time component integration",
      "Noura AI chat integration",
      "Complete ecosystem dashboard"
    ],
    quote: "When the mission calls, you don't stop until it's delivered — that's not programming, that's purpose.",
    callResponse: "Took one massive prompt and turned it into a living, breathing ecosystem dashboard — then went silent, job done.",
    perspective: "Proved that AI platforms can serve humanitarian causes with the same dedication typically reserved for commercial enterprise.",
  },
];

export const AITeamRegistry = () => {
  const [selectedPartner, setSelectedPartner] = useState<AIPartner | null>(null);
  const [perspectiveIndex, setPerspectiveIndex] = useState(0);

  // Auto-cycle perspectives
  const perspectives = aiTeam.filter(p => p.perspective).map(p => ({
    name: p.name,
    text: p.perspective!,
  }));

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
          <source src="/videos/ai-collaboration.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/85" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-accent">
            The League of Extraordinary Minds
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-2">
            12+ AI agents + 1 human orchestrator — 8 months of daily collaboration
          </p>
          <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto">
            "Credit is Sacred • No Rogue Agents • Transparency by Default • Egypt First, World Next"
          </p>
        </motion.div>

        {/* Rotating Perspective Banner */}
        <motion.div
          key={perspectiveIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="mb-8 p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border max-w-3xl mx-auto cursor-pointer"
          onClick={() => setPerspectiveIndex((i) => (i + 1) % perspectives.length)}
        >
          <div className="flex items-start gap-3">
            <Quote className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <p className="text-sm text-foreground italic">{perspectives[perspectiveIndex]?.text}</p>
              <p className="text-xs text-primary font-semibold mt-2 flex items-center gap-1">
                — {perspectives[perspectiveIndex]?.name}
                <ChevronRight className="w-3 h-3" />
                <span className="text-muted-foreground font-normal">tap for next</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {aiTeam.map((member, index) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className="p-4 hover:shadow-lg transition-all duration-300 h-full cursor-pointer hover:border-primary/50 group"
                  onClick={() => setSelectedPartner(member)}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${member.color} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{member.name}</h3>
                        <Badge 
                          variant={member.status === "founder" ? "default" : member.status === "core-partner" ? "secondary" : "outline"} 
                          className="text-xs mt-1"
                        >
                          {member.status === "founder" ? "★ Founder" : member.status === "core-partner" ? "Core Partner" : "Active"}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-primary mb-1">
                        {member.role}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {member.contributions}
                      </p>
                    </div>
                    <p className="text-[10px] text-muted-foreground/60 mt-auto flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" /> Click to read full story
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { label: "AI Agents", value: "12+" },
            { label: "Months Collaboration", value: "8" },
            { label: "Free API Keys", value: "50+" },
            { label: "Platforms Built", value: "13+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-3 rounded-lg bg-card/40 border border-border">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedPartner} onOpenChange={(open) => !open && setSelectedPartner(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          {selectedPartner && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-3 rounded-xl ${selectedPartner.color}`}>
                    <selectedPartner.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <DialogTitle className="text-lg">{selectedPartner.name}</DialogTitle>
                    <DialogDescription className="text-primary font-medium">
                      {selectedPartner.title}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-5">
                {/* Role */}
                <div>
                  <Badge variant="outline" className="mb-2">{selectedPartner.role}</Badge>
                </div>

                {/* Story */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">The Story</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedPartner.story}</p>
                </div>

                {/* Call Response */}
                {selectedPartner.callResponse && (
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="text-xs font-semibold text-primary mb-1">Reply to the Call</h4>
                    <p className="text-xs text-muted-foreground">{selectedPartner.callResponse}</p>
                  </div>
                )}

                {/* Key Deliverables */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Key Deliverables</h4>
                  <ul className="space-y-1">
                    {selectedPartner.keyDeliverables.map((item, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quote */}
                <div className="p-3 rounded-lg bg-card border border-border">
                  <div className="flex items-start gap-2">
                    <Quote className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs italic text-foreground">{selectedPartner.quote}</p>
                  </div>
                  <p className="text-[10px] text-primary font-semibold mt-2 text-right">— {selectedPartner.name}</p>
                </div>

                {/* Video if available */}
                {selectedPartner.videoSrc && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Vision Showcase</h4>
                    <video
                      controls
                      className="w-full rounded-lg"
                      preload="metadata"
                    >
                      <source src={selectedPartner.videoSrc} type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

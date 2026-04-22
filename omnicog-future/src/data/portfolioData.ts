export type PlatformCategory =
  | "Command Centers"
  | "Healthcare & Wellness"
  | "Research & Innovation"
  | "Globe & Network"
  | "Education & Learning"
  | "AI Agents & Tools"
  | "Media & Broadcasting"
  | "Registries & Showcases"
  | "Strategic & Presentations"
  | "Development Labs"
  | "Open Source & GitHub";

export type PlatformIcon =
  | "layout-dashboard"
  | "heart-pulse"
  | "flask-conical"
  | "globe"
  | "graduation-cap"
  | "bot"
  | "radio"
  | "building-2"
  | "presentation"
  | "code-2"
  | "github"
  | "shield"
  | "satellite"
  | "brain"
  | "microscope"
  | "stethoscope"
  | "users"
  | "languages"
  | "database"
  | "monitor"
  | "rocket"
  | "sparkles"
  | "network"
  | "activity";

export interface PlatformEntry {
  title: string;
  description: string;
  url: string;
  icon: PlatformIcon;
  category: PlatformCategory;
}

export const platforms: PlatformEntry[] = [
  // ─── Command Centers ───
  {
    title: "OmniCog AI Harmony",
    description: "Central aggregation & orchestration dashboard for the entire TELSTP ecosystem",
    url: "https://omnicog-ai-harmony.lovable.app/",
    icon: "layout-dashboard",
    category: "Command Centers",
  },
  {
    title: "TELSTP Unified Platform",
    description: "Production unified command center connecting all ministries and services",
    url: "https://telstp-unified-platform-production.vercel.app/",
    icon: "monitor",
    category: "Command Centers",
  },
  {
    title: "TELSTP Operations Dashboard",
    description: "Real-time operational metrics and system oversight console",
    url: "https://telstp-xah794.manus.space/dashboard",
    icon: "activity",
    category: "Command Centers",
  },
  {
    title: "Confetti Dash",
    description: "Interactive analytics dashboard with live data visualizations",
    url: "https://dash-confetti-blast.vercel.app/",
    icon: "layout-dashboard",
    category: "Command Centers",
  },
  {
    title: "United Registry Platform",
    description: "Consolidated registry for all TELSTP entities and agents",
    url: "https://manus-united-registry-telstp.vercel.app/",
    icon: "building-2",
    category: "Command Centers",
  },

  // ─── Healthcare & Wellness ───
  {
    title: "Health Tech Ecosystem",
    description: "Digital healthcare and telemedicine platform with AI-powered diagnostics",
    url: "https://health-tech-ecosystem-frontend-3z3u-riyblq8p1-tawasolnow.vercel.app/",
    icon: "heart-pulse",
    category: "Healthcare & Wellness",
  },
  {
    title: "Healthcare Hub",
    description: "Centralized healthcare management and provider coordination portal",
    url: "https://healthcare-hub-frontend.vercel.app/",
    icon: "stethoscope",
    category: "Healthcare & Wellness",
  },
  {
    title: "MyWell Wellness Portal",
    description: "AI wellness companion for personalized health monitoring and guidance",
    url: "https://wellness-portal-tau.vercel.app/",
    icon: "heart-pulse",
    category: "Healthcare & Wellness",
  },
  {
    title: "MyAssistAI Portal",
    description: "AI-powered physician education and clinical decision support system",
    url: "https://assist-portal.vercel.app/",
    icon: "stethoscope",
    category: "Healthcare & Wellness",
  },

  // ─── Research & Innovation ───
  {
    title: "TELSTP Research Hub",
    description: "Comprehensive research management with publication tracking and collaboration",
    url: "https://predeploy-fd692ab6-telstp-research-etejfgyz.manus.space/",
    icon: "flask-conical",
    category: "Research & Innovation",
  },
  {
    title: "Research Report Repository",
    description: "HBR-style collaborative research on global human-AI collaboration in life sciences",
    url: "https://github.com/mayoubm1/telstp_research_report",
    icon: "github",
    category: "Research & Innovation",
  },
  {
    title: "Research Deployment Hub",
    description: "Central deployment hub for TELSTP research outputs and publications",
    url: "https://github.com/mayoubm1/Telstp-Research-Deployment-Hub",
    icon: "github",
    category: "Research & Innovation",
  },
  {
    title: "Benchmark Report Web",
    description: "Production-ready vessel for incubating new research benchmarks and analytics",
    url: "https://github.com/mayoubm1/telstp_benchmark_report_web",
    icon: "github",
    category: "Research & Innovation",
  },
  {
    title: "Research Innovation Global",
    description: "Global research innovation portal connecting institutes worldwide",
    url: "https://research-innovation-global-1.deploypad.app/",
    icon: "microscope",
    category: "Research & Innovation",
  },
  {
    title: "M2-3M Quantum Engine",
    description: "Advanced AI research engine processing 4.2TB/hour across 50+ institutes",
    url: "https://m2-3m-telstp-jp993tq6p-tawasolnow.vercel.app/",
    icon: "brain",
    category: "Research & Innovation",
  },
  {
    title: "Egypt Future Sciences Hub",
    description: "The original foundational platform — 8 months of continuous evolution",
    url: "https://egypt-future-sciences-hub.vercel.app/",
    icon: "rocket",
    category: "Research & Innovation",
  },
  {
    title: "Egypt Future Sciences (Lovable)",
    description: "Lovable-hosted mirror of the Future Sciences Hub with live updates",
    url: "https://egypt-future-sciences-hub.lovable.app",
    icon: "rocket",
    category: "Research & Innovation",
  },

  // ─── Globe & Network ───
  {
    title: "TELSTP Global Network",
    description: "3D interactive globe mapping 50+ partner research institutes worldwide",
    url: "https://telstp-global-network.lovable.app/",
    icon: "globe",
    category: "Globe & Network",
  },
  {
    title: "Life Science Voyager Globe",
    description: "Immersive 3D life-science exploration and institute discovery platform",
    url: "https://preview--life-science-voyager-globe.lovable.app/",
    icon: "globe",
    category: "Globe & Network",
  },
  {
    title: "Global Hub Explorer",
    description: "Interactive explorer for navigating TELSTP's worldwide hub network",
    url: "https://preview--global-hub-explorer.lovable.app/",
    icon: "globe",
    category: "Globe & Network",
  },
  {
    title: "AI Agent Globe v1",
    description: "3D globe visualization of distributed AI agent deployments",
    url: "https://digital-telstp-ai-agent-globe-bem-23-fs4fnfgpz-tawasolnow.vercel.app/",
    icon: "satellite",
    category: "Globe & Network",
  },
  {
    title: "AI Agent Globe v2",
    description: "Enhanced AI agent world map with real-time status indicators",
    url: "https://digital-telstp-ai-agent-globe-bem-2.vercel.app/",
    icon: "satellite",
    category: "Globe & Network",
  },
  {
    title: "Innovative Ecosystem Global",
    description: "Global view of the innovative ecosystem partnerships and connections",
    url: "https://preview-vg04hanj--innovative-ecosystem-global.deploypad.app/",
    icon: "network",
    category: "Globe & Network",
  },

  // ─── Education & Learning ───
  {
    title: "Education Portal",
    description: "Comprehensive learning management and course delivery system",
    url: "https://webapp-amber-eta.vercel.app/login",
    icon: "graduation-cap",
    category: "Education & Learning",
  },
  {
    title: "Adaptive Speech Learning",
    description: "AI-driven adaptive language and speech training platform",
    url: "https://adaptive-speech-learning.deploypad.app/",
    icon: "languages",
    category: "Education & Learning",
  },
  {
    title: "Adaptive Speech Learning (Preview)",
    description: "Preview build of the adaptive speech learning system",
    url: "https://preview-0msqhze4--adaptive-speech-learning.deploypad.app/",
    icon: "languages",
    category: "Education & Learning",
  },
  {
    title: "El Maestro De DataBase",
    description: "Open-source database mastery educational tool and reference guide",
    url: "https://mayoubm1.github.io/El-Maestro-De-DataBase/",
    icon: "database",
    category: "Education & Learning",
  },

  // ─── AI Agents & Tools ───
  {
    title: "AI Agents Hub",
    description: "Central management console for all TELSTP autonomous AI agents",
    url: "https://a-378058.vercel.app/agents",
    icon: "bot",
    category: "AI Agents & Tools",
  },
  {
    title: "TELSTP AI Engine",
    description: "Core artificial intelligence processing and inference engine",
    url: "https://telstp-ai-bwevh3xk.manus.space/",
    icon: "brain",
    category: "AI Agents & Tools",
  },
  {
    title: "Famous AI Dashboard",
    description: "Third-party AI analytics and model performance monitoring dashboard",
    url: "https://famous.ai/dashboard",
    icon: "sparkles",
    category: "AI Agents & Tools",
  },
  {
    title: "GenSpark Platform",
    description: "Generative AI workspace for prototyping and experimentation",
    url: "https://bscirjxt.gensparkspace.com/",
    icon: "sparkles",
    category: "AI Agents & Tools",
  },

  // ─── Media & Broadcasting ───
  {
    title: "Radio TELSTP",
    description: "24/7 life-science radio channel with AI-hosted broadcasts",
    url: "https://radio-telstp-c7e8xraaw-tawasolnow.vercel.app/",
    icon: "radio",
    category: "Media & Broadcasting",
  },
  {
    title: "Radio TELSTP (Git Build)",
    description: "Latest development build of Radio TELSTP with new features",
    url: "https://radio-telstp-git-dependabot-npmandyarnnpmandy-c686f4-tawasolnow.vercel.app/",
    icon: "radio",
    category: "Media & Broadcasting",
  },
  {
    title: "Multilingual Broadcast AI Hosts",
    description: "Multi-language AI broadcasting with localized content delivery",
    url: "https://multilingual-broadcast-aihosts.deploypad.app/",
    icon: "languages",
    category: "Media & Broadcasting",
  },
  {
    title: "Multilingual Broadcast (Preview)",
    description: "Preview deployment of the multilingual broadcast platform",
    url: "https://preview-al9zz3rk--multilingual-broadcast-aihosts.deploypad.app/",
    icon: "languages",
    category: "Media & Broadcasting",
  },

  // ─── Registries & Showcases ───
  {
    title: "Digital TELSTP Registry",
    description: "Unified digital registry for all platform entities and services",
    url: "https://digital-telstp-unified-registry-fem.vercel.app/",
    icon: "building-2",
    category: "Registries & Showcases",
  },
  {
    title: "TELSTP Showcase Website",
    description: "Public-facing showcase highlighting the technology park's capabilities",
    url: "https://telstp-showcase-website-hnjgci9w8-tawasolnow.vercel.app/",
    icon: "presentation",
    category: "Registries & Showcases",
  },
  {
    title: "TELSTP Showcase (v2)",
    description: "Updated showcase website with refreshed design and content",
    url: "https://telstp-showcase-website-k07vif7wo-tawasolnow.vercel.app/",
    icon: "presentation",
    category: "Registries & Showcases",
  },
  {
    title: "OmniCog Humanity's Future",
    description: "Vision-forward showcase of TELSTP's impact on humanity's future",
    url: "https://omnicog-humanity-s-future.vercel.app/",
    icon: "rocket",
    category: "Registries & Showcases",
  },

  // ─── Strategic & Presentations ───
  {
    title: "Proposal & Integration Deck",
    description: "Interactive strategic proposal and integration presentation for stakeholders",
    url: "https://presentation-proposal-integration-1.deploypad.app/",
    icon: "presentation",
    category: "Strategic & Presentations",
  },
  {
    title: "Security & WiFi Monitor",
    description: "Network security monitoring and infrastructure health dashboard",
    url: "https://preview-n3ijur2l--security-wifi-monitor.deploypad.app/",
    icon: "shield",
    category: "Strategic & Presentations",
  },

  // ─── Development Labs (Manus) ───
  {
    title: "Tawasol Collaboration Lab",
    description: "Tawasol team workspace for AI collaboration experiments",
    url: "https://tawasol-jm6vjj.manus.space/",
    icon: "code-2",
    category: "Development Labs",
  },
  {
    title: "TELSTP Unified (Staging)",
    description: "Staging build of the unified platform for QA testing",
    url: "https://telstp-unified-platform-production-3w7hcr2sa-tawasolnow.vercel.app/",
    icon: "code-2",
    category: "Development Labs",
  },
  {
    title: "Lab Alpha",
    description: "Manus development sandbox — prototype environment Alpha",
    url: "https://cjkkeczuizmopgri.manus-preview.space/",
    icon: "code-2",
    category: "Development Labs",
  },
  {
    title: "Lab Beta",
    description: "Manus development sandbox — prototype environment Beta",
    url: "https://pwyexxgrwasnbpdw.manus-preview.space/",
    icon: "code-2",
    category: "Development Labs",
  },
  {
    title: "Lab Gamma",
    description: "Manus development lab — experimental AI module testing",
    url: "https://lcbdfkmx.manus.space/",
    icon: "code-2",
    category: "Development Labs",
  },
  {
    title: "Lab Delta",
    description: "Manus development lab — integration testing environment",
    url: "https://frrirpqadhwyzsmz.manus-preview.space/",
    icon: "code-2",
    category: "Development Labs",
  },
  {
    title: "Lab Epsilon",
    description: "Manus development lab — data pipeline prototyping",
    url: "https://kkh7ikcnyg18.manus.space/",
    icon: "code-2",
    category: "Development Labs",
  },
  {
    title: "Lab Zeta",
    description: "Manus development lab — UI/UX exploration workspace",
    url: "https://uudtxyhr.manus.space/",
    icon: "code-2",
    category: "Development Labs",
  },
  {
    title: "Lab Eta",
    description: "Manus development lab — model benchmarking suite",
    url: "https://vqtrpxhw.manus.space/",
    icon: "code-2",
    category: "Development Labs",
  },
  {
    title: "Lab Theta",
    description: "Manus development lab — multi-agent orchestration testbed",
    url: "https://fzeqbaoc.manus.space/",
    icon: "code-2",
    category: "Development Labs",
  },
  {
    title: "Lab Iota",
    description: "Manus development lab — cross-platform sync testing",
    url: "https://dyh6i3c9o0ll.manus.space/",
    icon: "code-2",
    category: "Development Labs",
  },
  {
    title: "Lab Kappa",
    description: "Manus development lab — knowledge graph experiments",
    url: "https://zgisbiej.manus.space/",
    icon: "code-2",
    category: "Development Labs",
  },
  {
    title: "Lab Lambda",
    description: "Manus development lab — NLP pipeline sandbox",
    url: "https://yhyatksk.manus.space/",
    icon: "code-2",
    category: "Development Labs",
  },
  {
    title: "Lab Mu",
    description: "Manus development lab — real-time analytics prototype",
    url: "https://ibpiwfswkfeujbkx.manus-preview.space/",
    icon: "code-2",
    category: "Development Labs",
  },
  {
    title: "Lab Nu",
    description: "Manus development lab — edge computing experiments",
    url: "https://lfiopqvi.manus.space/",
    icon: "code-2",
    category: "Development Labs",
  },

  // ─── Open Source & GitHub ───
  {
    title: "GitHub — Mohamed Ayoub",
    description: "Open-source repositories, contributions, and project codebases",
    url: "https://github.com/mayoubm1",
    icon: "github",
    category: "Open Source & GitHub",
  },
  {
    title: "Research Innovation (Preview)",
    description: "Preview build of the global research innovation platform",
    url: "https://preview-76xfbqrn--research-innovation-global-1.deploypad.app/",
    icon: "flask-conical",
    category: "Research & Innovation",
  },
];

export const categoryIcons: Record<PlatformCategory, PlatformIcon> = {
  "Command Centers": "layout-dashboard",
  "Healthcare & Wellness": "heart-pulse",
  "Research & Innovation": "flask-conical",
  "Globe & Network": "globe",
  "Education & Learning": "graduation-cap",
  "AI Agents & Tools": "bot",
  "Media & Broadcasting": "radio",
  "Registries & Showcases": "building-2",
  "Strategic & Presentations": "presentation",
  "Development Labs": "code-2",
  "Open Source & GitHub": "github",
};

export const categoryColors: Record<PlatformCategory, string> = {
  "Command Centers": "bg-primary/20 text-primary border-primary/30",
  "Healthcare & Wellness": "bg-rose-500/20 text-rose-400 border-rose-500/30",
  "Research & Innovation": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  "Globe & Network": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Education & Learning": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "AI Agents & Tools": "bg-sky-500/20 text-sky-400 border-sky-500/30",
  "Media & Broadcasting": "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30",
  "Registries & Showcases": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "Strategic & Presentations": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Development Labs": "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
  "Open Source & GitHub": "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

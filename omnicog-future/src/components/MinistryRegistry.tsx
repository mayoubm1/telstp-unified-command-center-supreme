import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Users, Rocket, GraduationCap, Briefcase, Newspaper, Radio, Database, Stethoscope, Heart, Building2, BookOpen, Network, Dna } from "lucide-react";
import { motion } from "framer-motion";

const ministries = [
  {
    id: "omnicognator",
    name: "OmniCog Unity Hub",
    icon: Network,
    description: "Central aggregation & orchestration dashboard",
    url: "https://omnicog-ai-harmony.lovable.app/",
    status: "operational",
    color: "bg-yellow-500/20 text-yellow-500"
  },
  {
    id: "globe",
    name: "Global 3D Network",
    icon: Globe,
    description: "Interconnected life science hubs worldwide",
    url: "https://telstp-global-network.lovable.app/",
    status: "operational",
    color: "bg-blue-500/20 text-blue-500"
  },
  {
    id: "investor",
    name: "Investor Gateway",
    icon: Briefcase,
    description: "8 Billion EGP investment platform",
    status: "development",
    color: "bg-amber-500/20 text-amber-500"
  },
  {
    id: "genomics",
    name: "NGS Omics Hub",
    icon: Dna,
    description: "Genomics & precision medicine platform",
    url: "https://preview--egypt-omics-uber.lovable.app/",
    status: "operational",
    color: "bg-lime-500/20 text-lime-500"
  },
  {
    id: "incubator",
    name: "Project Incubator",
    icon: Rocket,
    description: "Innovation acceleration programs",
    status: "development",
    color: "bg-purple-500/20 text-purple-500"
  },
  {
    id: "student",
    name: "Student Portal",
    icon: GraduationCap,
    description: "Educational access and resources",
    url: "https://webapp-amber-eta.vercel.app/login",
    status: "operational",
    color: "bg-green-500/20 text-green-500"
  },
  {
    id: "recruitment",
    name: "Recruitment Portal",
    icon: Users,
    description: "12,000+ job opportunities",
    status: "planning",
    color: "bg-indigo-500/20 text-indigo-500"
  },
  {
    id: "news",
    name: "News & Blogs",
    icon: Newspaper,
    description: "Life science updates and insights",
    status: "planning",
    color: "bg-cyan-500/20 text-cyan-500"
  },
  {
    id: "radio",
    name: "Radio & Podcasts",
    icon: Radio,
    description: "24/7 life science broadcasting — 4 documentary episodes + 10 health sessions",
    url: "https://radio-te-ls-tp--mayoub3m.replit.app",
    status: "operational",
    color: "bg-pink-500/20 text-pink-500"
  },
  {
    id: "m23m",
    name: "M2-3M Research Engine",
    icon: Database,
    description: "4.2TB/hour quantum research processor",
    url: "https://m2-3m-telstp-jp993tq6p-tawasolnow.vercel.app/",
    status: "operational",
    color: "bg-red-500/20 text-red-500"
  },
  {
    id: "telemedicine",
    name: "Telemedicine Hub",
    icon: Stethoscope,
    description: "MyWell AI wellness + MyAssist AI physician education",
    url: "https://health-tech-ecosystem-frontend-3z3u-riyblq8p1-tawasolnow.vercel.app/",
    status: "operational",
    color: "bg-emerald-500/20 text-emerald-500"
  },
  {
    id: "companion",
    name: "Personal Companion",
    icon: Heart,
    description: "6 AI characters for wellness",
    status: "development",
    color: "bg-rose-500/20 text-rose-500"
  },
  {
    id: "employee",
    name: "Employee Portal",
    icon: Building2,
    description: "TELSTP & Tawasol Holding",
    status: "planning",
    color: "bg-orange-500/20 text-orange-500"
  },
  {
    id: "curriculum",
    name: "Curriculum Hub",
    icon: BookOpen,
    description: "M2-3M powered educational content",
    status: "development",
    color: "bg-violet-500/20 text-violet-500"
  }
];

const statusColors = {
  operational: "bg-green-500",
  development: "bg-amber-500",
  planning: "bg-slate-500"
};

export const MinistryRegistry = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient-primary">
            Digital Ministries
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            13 interconnected platforms forming the TELSTP digital nation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((ministry, index) => {
            const Icon = ministry.icon;
            return (
              <motion.div
                key={ministry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className={`p-6 hover:shadow-lg transition-all duration-300 border-2 ${ministry.url ? 'cursor-pointer hover:scale-105' : ''}`}
                  onClick={() => ministry.url && window.open(ministry.url, '_blank')}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${ministry.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{ministry.name}</h3>
                        <div className={`w-2 h-2 rounded-full ${statusColors[ministry.status]}`} />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {ministry.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {ministry.status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

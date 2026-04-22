import {
  LayoutDashboard,
  HeartPulse,
  FlaskConical,
  Globe,
  GraduationCap,
  Bot,
  Radio,
  Building2,
  Presentation,
  Code2,
  Github,
  Shield,
  Satellite,
  Brain,
  Microscope,
  Stethoscope,
  Users,
  Languages,
  Database,
  Monitor,
  Rocket,
  Sparkles,
  Network,
  Activity,
} from "lucide-react";
import type { PlatformIcon } from "@/data/portfolioData";

const iconMap: Record<PlatformIcon, React.ComponentType<{ className?: string }>> = {
  "layout-dashboard": LayoutDashboard,
  "heart-pulse": HeartPulse,
  "flask-conical": FlaskConical,
  globe: Globe,
  "graduation-cap": GraduationCap,
  bot: Bot,
  radio: Radio,
  "building-2": Building2,
  presentation: Presentation,
  "code-2": Code2,
  github: Github,
  shield: Shield,
  satellite: Satellite,
  brain: Brain,
  microscope: Microscope,
  stethoscope: Stethoscope,
  users: Users,
  languages: Languages,
  database: Database,
  monitor: Monitor,
  rocket: Rocket,
  sparkles: Sparkles,
  network: Network,
  activity: Activity,
};

interface PortfolioIconProps {
  name: PlatformIcon;
  className?: string;
}

export const PortfolioIcon = ({ name, className }: PortfolioIconProps) => {
  const Icon = iconMap[name];
  return <Icon className={className} />;
};

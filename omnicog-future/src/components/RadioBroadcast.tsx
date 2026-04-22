import { useState, useEffect, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Globe,
  Mic2,
  Music,
  Clock,
  Languages,
  Podcast,
  ExternalLink,
  Waves,
  Sparkles,
} from "lucide-react";

/* ─── Audio Tracks ─── */
interface Track {
  title: string;
  src: string;
  hostIndex: number;
}

const tracks: Track[] = [
  { title: "Morning Wellness Briefing", src: "/audio/1_1_2.mp3", hostIndex: 0 },
  { title: "Innovation Spotlight", src: "/audio/1_2_1.mp3", hostIndex: 1 },
  { title: "Research Deep Dive", src: "/audio/1_5_2.mp3", hostIndex: 2 },
  { title: "Medical Science Hour", src: "/audio/1_8_1.mp3", hostIndex: 3 },
  { title: "Global Health Digest", src: "/audio/1_9.mp3", hostIndex: 0 },
  { title: "Tech Horizons Live", src: "/audio/10_1.mp3", hostIndex: 1 },
  { title: "Evening Knowledge Café", src: "/audio/13_1.mp3", hostIndex: 2 },
  { title: "Bilingual Platform Tutorial", src: "/audio/bilingual_voice_over.mp3", hostIndex: 3 },
  { title: "Doc Direct Special", src: "/audio/doc_direct.mp3", hostIndex: 0 },
];

/* ─── AI Host Data ─── */
interface AIHost {
  name: string;
  title: string;
  languages: string[];
  specialization: string;
  personality: string;
  avatar: string;
  accentColor: string;
}

const aiHosts: AIHost[] = [
  {
    name: "Dr. Amira Hassan",
    title: "Health & Wellness Host",
    languages: ["Arabic", "English", "French"],
    specialization: "Health & Wellness",
    personality: "Warm, professional, empathetic",
    avatar: "🧕",
    accentColor: "from-rose-500 to-pink-600",
  },
  {
    name: "Dr. Ahmed Khalil",
    title: "Tech & Innovation Host",
    languages: ["Arabic", "English", "German"],
    specialization: "Technology & Innovation",
    personality: "Energetic, enthusiastic, tech-savvy",
    avatar: "👨‍🔬",
    accentColor: "from-cyan-500 to-blue-600",
  },
  {
    name: "Dr. Sarah Mitchell",
    title: "Research & Academia Host",
    languages: ["English", "French", "Spanish"],
    specialization: "Research & Academia",
    personality: "Clear, articulate, research-oriented",
    avatar: "👩‍🏫",
    accentColor: "from-violet-500 to-purple-600",
  },
  {
    name: "Dr. Omar Farouk",
    title: "Medical Science Host",
    languages: ["Arabic", "English", "Spanish"],
    specialization: "Medical Science & Patient Care",
    personality: "Calm, authoritative, reassuring",
    avatar: "👨‍⚕️",
    accentColor: "from-emerald-500 to-teal-600",
  },
];

/* ─── Program Schedule ─── */
const todaySchedule = [
  { title: "Morning Wellness Briefing", time: "06:00", host: "Dr. Amira Hassan", lang: "AR/EN", live: true },
  { title: "Innovation Spotlight", time: "08:00", host: "Dr. Ahmed Khalil", lang: "EN/DE" },
  { title: "Research Roundtable", time: "10:00", host: "Dr. Sarah Mitchell", lang: "EN/FR" },
  { title: "Medical Science Hour", time: "12:00", host: "Dr. Omar Farouk", lang: "AR/ES" },
  { title: "Global Health Digest", time: "14:00", host: "Dr. Amira Hassan", lang: "FR/AR" },
  { title: "Tech Horizons Live", time: "16:00", host: "Dr. Ahmed Khalil", lang: "EN" },
  { title: "Evening Knowledge Café", time: "19:00", host: "Dr. Sarah Mitchell", lang: "ES/EN" },
  { title: "Night Owl Science", time: "22:00", host: "Dr. Omar Farouk", lang: "AR/EN" },
];

const stats = [
  { label: "AI Hosts", value: "4", icon: Mic2 },
  { label: "Languages", value: "5", icon: Languages },
  { label: "Tracks", value: "9", icon: Podcast },
  { label: "24/7", value: "Live", icon: Radio },
];

/* ─── Waveform Visualizer ─── */
const WaveformVisualizer = ({ isPlaying }: { isPlaying: boolean }) => (
  <div className="flex items-end gap-[2px] h-8">
    {Array.from({ length: 32 }).map((_, i) => (
      <motion.div
        key={i}
        className="w-[3px] rounded-full bg-gradient-to-t from-primary to-accent"
        animate={
          isPlaying
            ? { height: [4, Math.random() * 28 + 4, 8, Math.random() * 24 + 6, 4] }
            : { height: 4 }
        }
        transition={
          isPlaying
            ? { duration: 0.6 + Math.random() * 0.4, repeat: Infinity, repeatType: "reverse", delay: i * 0.03 }
            : { duration: 0.3 }
        }
      />
    ))}
  </div>
);

const FloatingOrb = ({ isPlaying }: { isPlaying: boolean }) => (
  <motion.div
    className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20 blur-3xl pointer-events-none"
    style={{ background: "radial-gradient(circle, hsl(var(--primary)), hsl(var(--accent)), transparent)" }}
    animate={isPlaying ? { scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] } : { scale: 1, opacity: 0.1 }}
    transition={{ duration: 3, repeat: Infinity }}
  />
);

/* ─── Main Component ─── */
export const RadioBroadcast = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentTrackIndex];
  const currentHost = aiHosts[currentTrack.hostIndex];

  // Initialize audio
  useEffect(() => {
    const audio = new Audio(currentTrack.src);
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      // Auto-advance to next track
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
    };
  }, [currentTrackIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Play/pause sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Mute sync
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((i) => (i + 1) % tracks.length);
  }, []);

  const prevTrack = useCallback(() => {
    setCurrentTrackIndex((i) => (i - 1 + tracks.length) % tracks.length);
  }, []);

  const seekTo = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
  }, [duration]);

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "00:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <section id="radio-broadcast" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-fuchsia-950/10 to-background" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <img
              src="/images/telstp-logo.jpg"
              alt="TELsTP Logo"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-fuchsia-500/30 shadow-lg"
            />
          </div>
          <Badge variant="outline" className="mb-4 border-fuchsia-500/50 text-fuchsia-400">
            <Radio className="w-3 h-3 mr-1 animate-pulse" />
            24/7 Live Broadcasting
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-primary">Radio TELsTP</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            AI-powered multilingual broadcasting — 4 AI hosts delivering life science content
            across 5 languages, around the clock
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-card/50 border-border/30 p-4 text-center backdrop-blur-sm">
              <stat.icon className="w-5 h-5 mx-auto mb-2 text-fuchsia-400" />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* ─── LIVE PLAYER (3 cols) ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="relative bg-gradient-to-br from-fuchsia-500/10 via-card to-primary/5 border-fuchsia-500/30 overflow-hidden backdrop-blur-sm">
              <FloatingOrb isPlaying={isPlaying} />

              <div className="p-6 md:p-8 relative z-10">
                {/* On Air */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-red-500"
                      animate={isPlaying ? { opacity: [1, 0.3, 1] } : { opacity: 0.3 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
                      {isPlaying ? "On Air" : "Off Air"}
                    </span>
                  </div>
                  <Badge variant="secondary" className="bg-muted/50 font-mono text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {fmt(currentTime)} / {fmt(duration)}
                  </Badge>
                </div>

                {/* Current Host */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTrackIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-5 mb-6"
                  >
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentHost.accentColor} flex items-center justify-center text-4xl shadow-lg`}>
                      {currentHost.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-foreground">{currentHost.name}</h3>
                      <p className="text-sm text-muted-foreground">{currentHost.title}</p>
                      <p className="text-xs text-fuchsia-300 mt-1 truncate">
                        <Music className="w-3 h-3 inline mr-1" />
                        {currentTrack.title}
                      </p>
                      <div className="flex gap-1 mt-1.5">
                        {currentHost.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-fuchsia-500/40 text-fuchsia-300">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress Bar */}
                <div className="mb-2 cursor-pointer group" onClick={seekTo}>
                  <div className="h-2 rounded-full bg-muted/50 overflow-hidden relative">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-primary"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-foreground shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ left: `calc(${progress}% - 7px)` }}
                    />
                  </div>
                </div>

                {/* Waveform */}
                <div className="mb-5 flex items-center justify-center py-3 px-4 rounded-xl bg-background/40 border border-border/20">
                  <WaveformVisualizer isPlaying={isPlaying} />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="text-muted-foreground hover:text-foreground">
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>

                  <Button variant="ghost" size="icon" onClick={prevTrack} className="text-muted-foreground hover:text-foreground">
                    <SkipBack className="w-5 h-5" />
                  </Button>

                  <Button
                    size="lg"
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-500 to-primary text-primary-foreground shadow-lg hover:shadow-fuchsia-500/30 hover:scale-105 transition-all"
                  >
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                  </Button>

                  <Button variant="ghost" size="icon" onClick={nextTrack} className="text-muted-foreground hover:text-foreground">
                    <SkipForward className="w-5 h-5" />
                  </Button>

                  <Badge variant="secondary" className="bg-muted/30 text-[10px] px-2">
                    {currentTrackIndex + 1}/{tracks.length}
                  </Badge>
                </div>

                {/* Track List Mini */}
                <div className="mt-6 pt-4 border-t border-border/20">
                  <p className="text-[11px] text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Playlist</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-[140px] overflow-y-auto">
                    {tracks.map((track, i) => (
                      <button
                        key={track.src}
                        onClick={() => { setCurrentTrackIndex(i); setIsPlaying(true); }}
                        className={`text-left px-3 py-1.5 rounded-md text-xs transition-all flex items-center gap-2 ${
                          i === currentTrackIndex
                            ? "bg-fuchsia-500/15 text-fuchsia-300"
                            : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                        }`}
                      >
                        {i === currentTrackIndex && isPlaying ? (
                          <span className="w-3 h-3 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
                          </span>
                        ) : (
                          <span className="w-3 text-center text-[10px] opacity-50">{i + 1}</span>
                        )}
                        <span className="truncate">{track.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* External Links */}
                <div className="flex flex-wrap justify-center gap-3 mt-5 pt-4 border-t border-border/20">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://radio-telstp-c7e8xraaw-tawasolnow.vercel.app/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Radio App
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://multilingual-broadcast-aihosts.deploypad.app/" target="_blank" rel="noopener noreferrer">
                      <Globe className="w-3 h-3 mr-1" />
                      Multilingual Hub
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* ─── SCHEDULE & HOSTS (2 cols) ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Program Schedule */}
            <Card className="bg-card/50 border-border/30 backdrop-blur-sm overflow-hidden">
              <div className="p-4 border-b border-border/20 flex items-center gap-2">
                <Waves className="w-4 h-4 text-fuchsia-400" />
                <h4 className="font-semibold text-sm">Today's Schedule</h4>
              </div>
              <div className="max-h-[280px] overflow-y-auto">
                {todaySchedule.map((prog, i) => (
                  <div
                    key={i}
                    className={`px-4 py-3 flex items-center gap-3 border-b border-border/10 last:border-0 transition-colors ${
                      prog.live ? "bg-fuchsia-500/10 border-l-2 border-l-fuchsia-500" : "hover:bg-muted/30"
                    }`}
                  >
                    <span className="text-xs font-mono text-muted-foreground w-10 shrink-0">{prog.time}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-foreground">{prog.title}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{prog.host}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-[10px] shrink-0 ${
                        prog.live ? "border-red-500/50 text-red-400" : "border-border/40 text-muted-foreground"
                      }`}
                    >
                      {prog.live ? "LIVE" : prog.lang}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Host Roster */}
            <Card className="bg-card/50 border-border/30 backdrop-blur-sm">
              <div className="p-4 border-b border-border/20 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-fuchsia-400" />
                <h4 className="font-semibold text-sm">AI Host Roster</h4>
              </div>
              <div className="p-3 space-y-2">
                {aiHosts.map((host, i) => (
                  <motion.button
                    key={host.name}
                    onClick={() => {
                      const trackIdx = tracks.findIndex((t) => t.hostIndex === i);
                      if (trackIdx >= 0) { setCurrentTrackIndex(trackIdx); setIsPlaying(true); }
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all text-left ${
                      i === currentTrack.hostIndex
                        ? "bg-fuchsia-500/15 border border-fuchsia-500/30"
                        : "hover:bg-muted/30 border border-transparent"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${host.accentColor} flex items-center justify-center text-lg`}>
                      {host.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate text-foreground">{host.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{host.specialization}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {host.languages.map((l) => (
                        <span key={l} className="text-[9px] bg-muted/50 px-1 py-0.5 rounded text-muted-foreground">
                          {l.slice(0, 2).toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </div>
            </Card>

            {/* Languages */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-fuchsia-500/10 to-primary/10 border border-fuchsia-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Languages className="w-4 h-4 text-fuchsia-400" />
                <span className="text-sm font-semibold text-foreground">5 Languages</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["🇪🇬 Arabic", "🇬🇧 English", "🇫🇷 French", "🇪🇸 Spanish", "🇩🇪 German"].map((lang) => (
                  <Badge key={lang} variant="secondary" className="bg-background/50 border border-border/30 text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, ExternalLink, Play, Pause, Video } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const VISION_BOOK_VIEW_URL =
  "https://www.dropbox.com/scl/fi/nk9a9kdllhn0eel4dpbyw/egypt_life_sciences_hub_20250712025040-2.pdf?rlkey=xjugmrqvtt29fkb42voh2hsgi&st=adh0r0c7&dl=0";
const VISION_BOOK_DOWNLOAD_URL =
  "https://www.dropbox.com/scl/fi/nk9a9kdllhn0eel4dpbyw/egypt_life_sciences_hub_20250712025040-2.pdf?rlkey=xjugmrqvtt29fkb42voh2hsgi&st=adh0r0c7&dl=1";

export const VisionBook = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isVideoPlaying) {
      video.pause();
    } else {
      video.play().catch(() => setIsVideoPlaying(false));
    }
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      >
        <source src="/videos/telstp-overview.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            The Vision Book
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the complete 47-page strategic vision for TELSTP and the future of
            humanitarian life science technology
          </p>
        </motion.div>

        {/* ─── Chairman's Message ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="overflow-hidden backdrop-blur-sm bg-card/50 border-primary/20">
            <div className="relative aspect-video bg-background/80">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="/images/telstp-logo.jpg"
                onEnded={() => setIsVideoPlaying(false)}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                controls={isVideoPlaying}
              >
                <source src="/videos/chairman-message.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Play overlay */}
              {!isVideoPlaying && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm cursor-pointer group"
                  onClick={toggleVideo}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </motion.div>
                  <p className="mt-4 text-lg font-semibold text-foreground">Chairman's Message</p>
                  <p className="text-sm text-muted-foreground">Click to play</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 backdrop-blur-sm bg-card/50 border-primary/20 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">TELsTP Vision Book</h3>
                    <p className="text-muted-foreground">47-page comprehensive guide</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  A detailed exploration of the Tawasol Egypt Life Science Technology Park,
                  covering strategic planning, AI collaboration frameworks, research hubs,
                  and the path to global THRIVE impact.
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  asChild
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  <a href={VISION_BOOK_VIEW_URL} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View PDF
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-primary/20"
                >
                  <a href={VISION_BOOK_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 backdrop-blur-sm bg-card/50 border-primary/20 h-full">
              <h3 className="text-xl font-bold mb-4">Key Sections</h3>
              <ul className="space-y-3">
                {[
                  "Executive Summary & Mission",
                  "AI Collaboration Framework",
                  "Research & Innovation Hubs",
                  "Educational Platform Integration",
                  "Health Technology Ecosystem",
                  "Global Partnership Strategy",
                  "Financial Models & ROI Analysis",
                  "Implementation Roadmap",
                ].map((section, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0" />
                    <span className="text-muted-foreground">{section}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

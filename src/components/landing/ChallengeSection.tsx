import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const ChallengeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="challenge" className="min-h-[calc(100vh-3.5rem)] flex items-center relative overflow-hidden bg-secondary/30 py-6 sm:py-8 scroll-mt-14">
      <div className="section-container" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">
              The Challenge
            </span>
            <h2 className="heading-md text-foreground mb-3 sm:mb-4">
              Fragmented Networks,{" "}
              <span className="subtitle-muted">Missed Opportunities</span>
            </h2>
            <p className="body-lg text-balance">
              The affiliate marketing ecosystem is siloed. Advertisers struggle with disparate platforms and inefficient reporting, while publishers juggle multiple dashboards and subpar promotional tools. This disconnect hinders growth, complicates tracking, and leaves revenue on the table.
            </p>
          </motion.div>

          {/* Visual - Puzzle Pieces SVG */}
          <div className="flex items-center justify-center w-full">
            <div className="relative max-w-[220px] sm:max-w-[260px] lg:max-w-sm mx-auto">
              <svg
                viewBox="0 0 380 380"
                className="w-full h-auto"
                style={{ filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1))" }}
              >
                <defs>
                  {/* Piece 1 - Dark gray */}
                  <linearGradient id="puzzleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(220, 10%, 35%)" />
                    <stop offset="100%" stopColor="hsl(220, 10%, 25%)" />
                  </linearGradient>
                  <linearGradient id="puzzleHighlight1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(220, 10%, 50%)" />
                    <stop offset="100%" stopColor="hsl(220, 10%, 35%)" />
                  </linearGradient>
                  {/* Piece 2 - Medium gray */}
                  <linearGradient id="puzzleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(220, 8%, 55%)" />
                    <stop offset="100%" stopColor="hsl(220, 8%, 45%)" />
                  </linearGradient>
                  <linearGradient id="puzzleHighlight2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(220, 8%, 70%)" />
                    <stop offset="100%" stopColor="hsl(220, 8%, 55%)" />
                  </linearGradient>
                  {/* Piece 3 - Light gray */}
                  <linearGradient id="puzzleGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(220, 6%, 72%)" />
                    <stop offset="100%" stopColor="hsl(220, 6%, 62%)" />
                  </linearGradient>
                  <linearGradient id="puzzleHighlight3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(220, 6%, 85%)" />
                    <stop offset="100%" stopColor="hsl(220, 6%, 72%)" />
                  </linearGradient>
                  {/* Piece 4 - Charcoal */}
                  <linearGradient id="puzzleGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(220, 12%, 45%)" />
                    <stop offset="100%" stopColor="hsl(220, 12%, 35%)" />
                  </linearGradient>
                  <linearGradient id="puzzleHighlight4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(220, 12%, 60%)" />
                    <stop offset="100%" stopColor="hsl(220, 12%, 45%)" />
                  </linearGradient>
                </defs>
                
                {/* Piece 1 (top-left) */}
                <motion.g
                  initial={{ opacity: 0, x: -60, y: -60, rotate: -20 }}
                  animate={isInView ? { opacity: 1, x: -10, y: -10, rotate: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 80, damping: 15 }}
                >
                  <motion.g
                    animate={isInView ? { x: [0, -2, 0, 2, 0], y: [0, -3, 0, -1, 0] } : {}}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                  >
                    <path d="M 30 30 L 170 30 L 170 70 C 170 70 170 80 160 90 C 150 100 150 100 150 100 C 150 100 150 100 160 110 C 170 120 170 130 170 130 L 170 170 L 130 170 C 130 170 120 170 110 180 C 100 190 100 190 100 190 C 100 190 100 190 90 180 C 80 170 70 170 70 170 L 30 170 L 30 30 Z" fill="url(#puzzleGradient1)" stroke="hsl(220, 10%, 20%)" strokeWidth="1.5" />
                    <path d="M 35 35 L 165 35 L 165 68" fill="none" stroke="url(#puzzleHighlight1)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                  </motion.g>
                </motion.g>

                {/* Piece 2 (top-right) */}
                <motion.g
                  initial={{ opacity: 0, x: 60, y: -60, rotate: 20 }}
                  animate={isInView ? { opacity: 1, x: 10, y: -10, rotate: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.35, type: "spring", stiffness: 80, damping: 15 }}
                >
                  <motion.g
                    animate={isInView ? { x: [0, 2, 0, -2, 0], y: [0, -2, 0, -3, 0] } : {}}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <path d="M 170 30 L 310 30 L 310 170 L 270 170 C 270 170 260 170 250 160 C 240 150 240 150 240 150 C 240 150 240 150 230 160 C 220 170 210 170 210 170 L 170 170 L 170 130 C 170 130 170 120 160 110 C 150 100 150 100 150 100 C 150 100 150 100 160 90 C 170 80 170 70 170 70 L 170 30 Z" fill="url(#puzzleGradient2)" stroke="hsl(220, 8%, 40%)" strokeWidth="1.5" />
                    <path d="M 175 35 L 305 35 L 305 165" fill="none" stroke="url(#puzzleHighlight2)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                  </motion.g>
                </motion.g>

                {/* Piece 3 (bottom-left) */}
                <motion.g
                  initial={{ opacity: 0, x: -60, y: 60, rotate: -20 }}
                  animate={isInView ? { opacity: 1, x: -10, y: 10, rotate: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 80, damping: 15 }}
                >
                  <motion.g
                    animate={isInView ? { x: [0, -3, 0, 1, 0], y: [0, 2, 0, 3, 0] } : {}}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <path d="M 30 170 L 70 170 C 70 170 80 170 90 180 C 100 190 100 190 100 190 C 100 190 100 190 110 180 C 120 170 130 170 130 170 L 170 170 L 170 210 C 170 210 170 220 180 230 C 190 240 190 240 190 240 C 190 240 190 240 180 250 C 170 260 170 270 170 270 L 170 310 L 30 310 L 30 170 Z" fill="url(#puzzleGradient3)" stroke="hsl(220, 6%, 55%)" strokeWidth="1.5" />
                    <path d="M 35 175 L 35 305 L 165 305" fill="none" stroke="url(#puzzleHighlight3)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                  </motion.g>
                </motion.g>

                {/* Piece 4 (bottom-right) */}
                <motion.g
                  initial={{ opacity: 0, x: 60, y: 60, rotate: 20 }}
                  animate={isInView ? { opacity: 1, x: 10, y: 10, rotate: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.65, type: "spring", stiffness: 80, damping: 15 }}
                >
                  <motion.g
                    animate={isInView ? { x: [0, 3, 0, -1, 0], y: [0, 1, 0, 3, 0] } : {}}
                    transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  >
                    <path d="M 170 170 L 210 170 C 210 170 220 170 230 160 C 240 150 240 150 240 150 C 240 150 240 150 250 160 C 260 170 270 170 270 170 L 310 170 L 310 310 L 170 310 L 170 270 C 170 270 170 260 180 250 C 190 240 190 240 190 240 C 190 240 190 240 180 230 C 170 220 170 210 170 210 L 170 170 Z" fill="url(#puzzleGradient4)" stroke="hsl(220, 12%, 30%)" strokeWidth="1.5" />
                    <path d="M 305 175 L 305 305 L 175 305" fill="none" stroke="url(#puzzleHighlight4)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                  </motion.g>
                </motion.g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
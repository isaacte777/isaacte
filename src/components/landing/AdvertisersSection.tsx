import { motion } from "framer-motion";
import faviconImg from "@/assets/logo-white.png";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plug, LayoutDashboard, Users, LineChart, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Plug,
    title: "One-Click Integration",
    description: "Connect your existing platform with our robust API. Onboard your offers in minutes, not days.",
  },
  {
    icon: LayoutDashboard,
    title: "Unified Dashboard",
    description: "Gain a holistic view of performance across all your publisher activities in a single, intuitive interface.",
  },
  {
    icon: Users,
    title: "Attract Top Talent",
    description: "Offer your publishers the industry's best promotional tools, making your network more attractive and competitive.",
  },
  {
    icon: LineChart,
    title: "Advanced Reporting & Insights",
    description: "Make data-driven decisions with real-time analytics and consolidated reporting.",
  },
];

export const AdvertisersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="advertisers" className="min-h-[calc(100vh-3.5rem)] flex items-center relative overflow-hidden bg-secondary/30 py-6 sm:py-8 scroll-mt-14">
      <div className="section-container" ref={ref}>
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-8"
        >
          <span className="section-label">
            For Advertisers / Networks
          </span>
          <h2 className="heading-md text-foreground">
            Amplify Your Reach,{" "}
            <span className="subtitle-muted">Simplify Your Operations</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex gap-3 sm:gap-4"
                >
                  <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-foreground flex items-center justify-center touch-target">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-background" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground mb-0.5">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="group w-full sm:w-auto touch-target">
              Learn More for Advertisers
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Network Nodes Visualization */}
              <div className="aspect-square max-w-xs mx-auto relative">
                {/* Central Hub */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-foreground flex items-center justify-center shadow-2xl z-10 p-3"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <img src={faviconImg} alt="Unione Partners" className="w-full h-full object-contain" />
                </motion.div>

                {/* Orbiting Nodes */}
                {[0, 60, 120, 180, 240, 300].map((degree, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-12 h-12"
                    style={{
                      transform: `rotate(${degree}deg) translateX(100px) rotate(-${degree}deg) translate(-50%, -50%)`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  >
                    <div className="w-full h-full rounded-xl bg-background border-2 border-border shadow-lg flex items-center justify-center">
                      <div className="w-4 h-4 rounded-md bg-secondary" />
                    </div>
                  </motion.div>
                ))}

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="100"
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                    className="opacity-60"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Plug, Layers, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Plug,
    number: "01",
    title: "Integrate",
    description: "Advertisers connect their platform via our secure API.",
  },
  {
    icon: Layers,
    number: "02",
    title: "Unify",
    description: "Offers are aggregated into the Unione network.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Empower",
    description: "Publishers access the integrated offers and advanced promotional toolkit.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Grow",
    description: "Everyone enjoys streamlined operations, clearer insights, and increased revenue.",
  },
];

export const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="min-h-[calc(100vh-3.5rem)] flex items-center relative overflow-hidden bg-secondary/30 py-6 sm:py-8 scroll-mt-14">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-10"
        >
          <span className="section-label">
            How It Works
          </span>
          <h2 className="heading-md text-foreground">
            Four Simple Steps to{" "}
            <span className="subtitle-muted">Unified Success</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <div className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-5 h-full text-center border border-border hover:shadow-xl transition-shadow duration-300">
                {/* Step Number */}
                <div className="text-3xl sm:text-5xl font-bold text-secondary/80 absolute top-2 sm:top-3 right-2 sm:right-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 rounded-lg sm:rounded-xl bg-foreground flex items-center justify-center">
                  <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-background" />
                </div>

                {/* Content */}
                <h3 className="text-sm sm:text-lg font-bold text-foreground mb-1 sm:mb-2 relative z-10">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground relative z-10">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

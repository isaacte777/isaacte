import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, HeadphonesIcon, Rocket } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Technology-First",
    description: "Built on a secure, scalable, and lightning-fast infrastructure.",
  },
  {
    icon: Shield,
    title: "Fair & Transparent",
    description: "We believe in clear reporting and fair commission structures for all parties.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "Get help when you need it from our expert team.",
  },
  {
    icon: Rocket,
    title: "Designed for Growth",
    description: "Our features are built to scale with your business.",
  },
];

export const WhyChooseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-unione" className="min-h-[calc(100vh-3.5rem)] flex items-center relative overflow-hidden py-6 sm:py-8 scroll-mt-14">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-10"
        >
          <span className="section-label">
            Why Choose Us
          </span>
          <h2 className="heading-md text-foreground">
            Why Choose{" "}
            <span className="subtitle-muted">Unione Partners</span>?
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-secondary/50 rounded-xl sm:rounded-2xl p-3 sm:p-5 h-full text-center border border-border hover:bg-secondary transition-all duration-300">
                {/* Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 rounded-lg sm:rounded-xl bg-foreground flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <reason.icon className="w-4 h-4 sm:w-5 sm:h-5 text-background" />
                </div>

                {/* Content */}
                <h3 className="text-sm sm:text-lg font-bold text-foreground mb-1 sm:mb-2">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

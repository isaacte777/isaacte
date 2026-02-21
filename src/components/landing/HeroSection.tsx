import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center overflow-hidden py-6 sm:py-8 mt-14">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-background" />
      
      <div className="section-container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Large Typography - Improved hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-4 sm:mb-6"
          >
            <h1 className="heading-xl text-foreground mb-1 sm:mb-2">
              The Unified Gateway
            </h1>
            <h1 className="heading-xl subtitle-muted">
              for Affiliates
            </h1>
          </motion.div>

          {/* Subheadline - Clear visual separation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="body-lg max-w-2xl mx-auto mb-8 sm:mb-12 text-balance"
          >
            Seamlessly connect your revenue share and CPA platforms. Empower your publishers with elite tools. Maximize earnings, simplify management.
          </motion.p>

          {/* CTA Buttons - Enhanced prominence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
          >
            <a href="/contact" className="w-full sm:w-auto sm:min-w-[240px]">
              <Button variant="hero" size="lg" className="group w-full touch-target">
                Start Integrating Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto sm:min-w-[240px] border-foreground/20 hover:bg-foreground/5 touch-target"
            >
              Explore Publisher Tools
            </Button>
          </motion.div>

          {/* Stats Row - Mobile optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-12"
          >
            {[
              { value: "4.9", label: "average platform rating" },
              { value: "+500", label: "partner networks" },
              { value: "$2.5B+", label: "revenue tracked" },
              { value: "50+", label: "countries" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-2 sm:p-0">
                <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-foreground mb-0.5 sm:mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

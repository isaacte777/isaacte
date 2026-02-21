import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="min-h-[calc(100vh-3.5rem)] flex items-center relative overflow-hidden bg-foreground py-6 sm:py-8 scroll-mt-14">
      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="heading-md text-background mb-3 sm:mb-4">
            Ready to Unify Your{" "}
            <span className="text-background/60">Affiliate Ecosystem</span>?
          </h2>
          <p className="body-md text-background/70 max-w-2xl mx-auto mb-6 sm:mb-8 text-balance">
            Join the partners who are already streamlining their operations and boosting their revenue. Whether you're an Advertiser looking to expand your reach or a Publisher seeking better tools, Unione is your gateway.
          </p>

          {/* CTAs - Enhanced touch targets */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <a href="/contact" className="w-full sm:w-auto min-w-[180px] sm:min-w-[200px]">
              <Button variant="accent" size="lg" className="group w-full touch-target">
                Start Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>

          {/* Trust Badges - Mobile optimized */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {["Supported at all times", "Easy to integrate and operate", "Operational from minute 0"].map((badge, index) => (
              <div key={index} className="flex items-center gap-1.5 sm:gap-2 text-background/70">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

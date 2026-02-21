import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Wand2, Activity, TrendingUp, ArrowRight, Link2, Image, FileText, BarChart2 } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Centralized Commission Hub",
    description: "Access and manage all your campaigns from different advertisers in one place. Track your earnings from multiple sources seamlessly.",
  },
  {
    icon: Wand2,
    title: "Powerful Promotional Assets",
    description: "Get instant access to a suite of high-converting tools—smart links, banners, landing page builders, and tracking pixels.",
  },
  {
    icon: Activity,
    title: "Real-Time Performance Tracking",
    description: "See exactly what's working with live stats, click-through rates, and conversion data.",
  },
  {
    icon: TrendingUp,
    title: "Earn More",
    description: "With better tools and consolidated insights, you can optimize your strategies and maximize your commission earnings.",
  },
];

const tools = [
  { label: "Smart Links", icon: Link2 },
  { label: "Banner Ads", icon: Image },
  { label: "Landing Pages", icon: FileText },
  { label: "Tracking Pixels", icon: BarChart2 },
];

export const PublishersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="publishers" className="min-h-[calc(100vh-3.5rem)] flex items-center relative overflow-hidden py-6 sm:py-8 scroll-mt-14">
      <div className="section-container" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
          {/* Visual - Tools Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-[280px] sm:max-w-xs mx-auto">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group aspect-square rounded-xl bg-secondary/50 border border-border p-3 sm:p-4 flex flex-col items-center justify-center gap-2 sm:gap-3 cursor-pointer transition-all duration-300 hover:bg-foreground hover:border-foreground touch-target"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-foreground/5 flex items-center justify-center transition-colors duration-300 group-hover:bg-background/10">
                    <tool.icon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground transition-colors duration-300 group-hover:text-background" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-foreground text-center transition-colors duration-300 group-hover:text-background">{tool.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-3 sm:mt-4 mx-auto max-w-[280px] sm:max-w-xs"
            >
              <div className="bg-foreground rounded-xl p-3 sm:p-4 text-background">
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="text-[10px] sm:text-xs text-background/70">Today's Earnings</span>
                  <span className="text-[10px] sm:text-xs text-green-400 bg-green-400/20 px-1.5 sm:px-2 py-0.5 rounded-full font-medium">Live</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold mb-0.5 sm:mb-1">$2,847.50</div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-background/70">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400 font-medium">+18.5%</span>
                  <span>vs yesterday</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <span className="section-label">
              For Publishers / Affiliates
            </span>
            <h2 className="heading-md text-foreground mb-3 sm:mb-4">
              The Ultimate{" "}
              <span className="subtitle-muted">Promotion Toolkit</span> is Here
            </h2>

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
              Explore the Publisher Toolkit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

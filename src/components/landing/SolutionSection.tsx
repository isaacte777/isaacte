import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart3, Users, Zap, Globe } from "lucide-react";

export const SolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solution" className="min-h-[calc(100vh-3.5rem)] flex items-center relative overflow-hidden py-6 sm:py-8 scroll-mt-14">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-12"
        >
          <span className="section-label">
            Our Solution
          </span>
          <h2 className="heading-md text-foreground mb-4 sm:mb-6">
            Your Single Source of{" "}
            <span className="subtitle-muted">Truth & Performance</span>
          </h2>
          <p className="body-lg text-balance">
            Unione Partners is the powerful web application that bridges the gap. We provide the technological infrastructure for Advertisers to integrate their revenue share and CPA offers into a unified network. Simultaneously, we deliver a sophisticated, all-in-one toolkit for Publishers.
          </p>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="bg-foreground rounded-3xl p-2 shadow-2xl">
            <div className="bg-background rounded-2xl overflow-hidden">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-6 py-4 bg-secondary/50 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-secondary rounded-full px-4 py-2 text-sm text-muted-foreground max-w-md mx-auto text-center">
                    dashboard.unione.partners
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-4 sm:p-6 lg:p-8">
                {/* Top Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
                  {[
                    { icon: BarChart3, label: "Revenue", value: "$124,500", change: "+12.5%" },
                    { icon: Users, label: "Publishers", value: "1,284", change: "+8.2%" },
                    { icon: Zap, label: "Conversions", value: "8,459", change: "+23.1%" },
                    { icon: Globe, label: "Active Offers", value: "342", change: "+5.8%" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="bg-secondary/50 rounded-xl p-3 lg:p-4 border border-border"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <stat.icon className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground" />
                        <span className="text-xs lg:text-sm text-muted-foreground">{stat.label}</span>
                      </div>
                      <div className="text-xl lg:text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                      <div className="text-xs lg:text-sm text-green-600 font-medium">{stat.change}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="bg-secondary/30 rounded-xl p-4 lg:p-6 border border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 lg:mb-6">
                    <span className="font-semibold text-foreground text-sm lg:text-base">Performance Overview</span>
                    <div className="flex gap-3 lg:gap-4">
                      <span className="text-xs lg:text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-foreground" />
                        Revenue
                      </span>
                      <span className="text-xs lg:text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                        Conversions
                      </span>
                    </div>
                  </div>
                  {/* Chart Bars */}
                  <div className="flex items-end gap-2 sm:gap-2 lg:gap-3 h-28 lg:h-36">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-lg bg-foreground cursor-pointer origin-bottom"
                        initial={{ height: 0, opacity: 0, scaleX: 0.8 }}
                        animate={isInView ? { 
                          height: `${height}%`, 
                          opacity: 1, 
                          scaleX: 1,
                        } : {}}
                        transition={{ 
                          duration: 1, 
                          delay: 0.6 + i * 0.08,
                          ease: [0.34, 1.56, 0.64, 1] // Spring-like bounce
                        }}
                        whileHover={{ 
                          scaleY: 1.1, 
                          scaleX: 1.15,
                          backgroundColor: "hsl(0 84% 60%)",
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scaleY: 0.95 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

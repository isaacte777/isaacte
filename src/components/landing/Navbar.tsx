import { useState, useEffect, useRef, useCallback } from "react";
import logoBlack from "@/assets/logo-black.png";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, Target, Lightbulb, Megaphone, FileText, Settings, Star, Mail, Briefcase, Shield, ScrollText, Cookie, ChevronDown, type LucideIcon } from "lucide-react";
import { scrollToElement } from "@/hooks/useSmoothScroll";

const sectionTabs = [
  { label: "Challenge", href: "#challenge", id: "challenge", icon: Target },
  { label: "Solution", href: "#solution", id: "solution", icon: Lightbulb },
  { label: "Advertisers", href: "#advertisers", id: "advertisers", icon: Megaphone },
  { label: "Publishers", href: "#publishers", id: "publishers", icon: FileText },
  { label: "How It Works", href: "#how-it-works", id: "how-it-works", icon: Settings },
  { label: "Why Us", href: "#why-unione", id: "why-unione", icon: Star },
];

// Internal pages for dropdown - arranged so Contact is perfectly centered
const leftSecondary = { path: "/terms-of-service", title: "Terms of Service", icon: ScrollText };
const leftPrimary = { path: "/careers", title: "Careers", icon: Briefcase };
const centerPrimary = { path: "/contact", title: "Contact", icon: Mail }; // Center item - aligns with arrow
const rightPrimary = { path: "/privacy-policy", title: "P. Policy", icon: Shield };
const rightSecondary = { path: "/cookie-policy", title: "Cookie Policy", icon: Cookie };

// Mapping for internal pages (for page title display)
const internalPages: Record<string, { title: string; icon: LucideIcon }> = {
  "/contact": { title: "Contact", icon: Mail },
  "/careers": { title: "Careers", icon: Briefcase },
  "/privacy-policy": { title: "Privacy Policy", icon: Shield },
  "/terms-of-service": { title: "Terms of Service", icon: ScrollText },
  "/cookie-policy": { title: "Cookie Policy", icon: Cookie },
};

export const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [authOverlayUrl, setAuthOverlayUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null); // null = at hero/top
  const [isAtHero, setIsAtHero] = useState(true);
  const isManualClickRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Check if we're on an internal page
  const currentPage = internalPages[location.pathname];

  // Handle dropdown hover
  const handleDropdownEnter = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsDropdownOpen(true);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  }, []);

  // Scroll spy effect with hero detection
  useEffect(() => {
    const handleScroll = () => {
      // Ignore scroll events during manual navigation
      if (isManualClickRef.current) return;

      const sections = sectionTabs.map(tab => ({
        id: tab.id,
        label: tab.label,
        element: document.getElementById(tab.id)
      })).filter(s => s.element);

      const scrollPosition = window.scrollY + 120;
      
      // Check if we're at the hero section (top of page)
      const firstSection = sections[0]?.element;
      const heroThreshold = firstSection ? firstSection.offsetTop - 50 : 300;
      
      if (scrollPosition < heroThreshold) {
        setIsAtHero(true);
        setActiveTab(null);
        return;
      }
      
      setIsAtHero(false);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveTab(prev => prev !== section.label ? section.label : prev);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabClick = useCallback((label: string) => {
    // Clear any pending timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Lock scroll spy immediately
    isManualClickRef.current = true;
    
    // Set the active tab immediately for instant visual feedback
    setIsAtHero(false);
    setActiveTab(label);
    
    // Unlock scroll spy after Lenis scroll completes (1.2s duration + buffer)
    scrollTimeoutRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, 1400);
  }, []);

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    // Clear any pending timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Lock scroll spy immediately
    isManualClickRef.current = true;
    
    // Immediately show frame animation
    setIsAtHero(true);
    setActiveTab(null);
    
    // Scroll to top with Lenis smooth animation
    import('@/hooks/useSmoothScroll').then(({ getLenis }) => {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    
    // Unlock scroll spy after animation
    scrollTimeoutRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, 1400);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Premium glass effect background */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-b border-foreground/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/[0.02] to-transparent" />
      
      <div className="section-container relative">
        <nav className="flex items-center justify-between h-14 sm:h-16 relative">
          {/* Logo - Premium styling */}
          <a 
            href="#" 
            className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0"
            onClick={handleLogoClick}
          >
            <motion.img 
              src={logoBlack}
              alt="Unione Partners"
              className="h-8 sm:h-9 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </a>

          {/* Center - Premium Section Navigation or Page Title */}
          {currentPage ? (
            // Internal page title indicator with dropdown - same width as home nav
            <div 
              className="hidden lg:flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[420px]"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              {/* Title pill - centered */}
              <div className="flex items-center bg-foreground rounded-full px-6 py-2 shadow-lg relative">
                <currentPage.icon className="w-4 h-4 text-background" />
                <span className="text-sm font-semibold text-background ml-2">
                  {currentPage.title}
                </span>
              </div>
              
              {/* Arrow indicator - absolutely positioned below center */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 cursor-pointer z-10">
                <motion.div 
                  animate={{ y: isDropdownOpen ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ${
                      isDropdownOpen 
                        ? "bg-foreground shadow-lg" 
                        : "bg-foreground/80 hover:bg-foreground shadow-md"
                    }`}
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <ChevronDown 
                      className="w-3.5 h-3.5 text-background"
                      strokeWidth={2.5}
                    />
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Dropdown menu - full width centered */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.3, borderRadius: "50%" }}
                    animate={{ opacity: 1, scale: 1, borderRadius: "1rem" }}
                    exit={{ opacity: 0, scale: 0.3, borderRadius: "50%" }}
                    transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{ transformOrigin: "top center" }}
                    className="absolute top-[calc(100%+12px)] left-0 right-0 w-full bg-foreground shadow-2xl overflow-hidden z-50"
                  >
                    {/* Connector line - centered in the dropdown */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-foreground" />
                    
                    <div className="p-2.5 relative">
                      <div className="grid grid-cols-[1fr_78px_78px_78px_1fr] items-start justify-items-center gap-1">
                        {/* Left secondary - Terms of Service */}
                        {(() => {
                          const isActive = location.pathname === leftSecondary.path;
                          return (
                            <motion.div
                              className="mt-4"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1, duration: 0.2 }}
                            >
                              <Link
                                to={leftSecondary.path}
                                className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all duration-300 group ${
                                  isActive ? "text-background/60 bg-background/10" : "text-background/40 hover:text-background/70 hover:bg-background/10"
                                }`}
                              >
                                <leftSecondary.icon 
                                  size={14} 
                                  className={isActive ? "text-background/50" : "text-background/30 group-hover:text-background/60 transition-colors duration-300"}
                                />
                                <span className="text-[8px] font-medium text-center leading-tight whitespace-nowrap">
                                  {leftSecondary.title}
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })()}

                        {/* Left primary - Careers */}
                        {(() => {
                          const isActive = location.pathname === leftPrimary.path;
                          return (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.03, duration: 0.2 }}
                            >
                              <Link
                                to={leftPrimary.path}
                                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 group min-w-[75px] ${
                                  isActive ? "bg-background/15 text-background" : "text-background hover:bg-background/15"
                                }`}
                              >
                                <leftPrimary.icon 
                                  size={22} 
                                  className={`transition-transform duration-300 ${isActive ? "" : "group-hover:scale-110"}`}
                                />
                                <span className="text-xs font-semibold text-center leading-tight">
                                  {leftPrimary.title}
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })()}

                        {/* CENTER - Contact (aligned with arrow) */}
                        {(() => {
                          const isActive = location.pathname === centerPrimary.path;
                          return (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.06, duration: 0.2 }}
                            >
                              <Link
                                to={centerPrimary.path}
                                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 group min-w-[75px] ${
                                  isActive ? "bg-background/15 text-background" : "text-background hover:bg-background/15"
                                }`}
                              >
                                <centerPrimary.icon 
                                  size={22} 
                                  className={`transition-transform duration-300 ${isActive ? "" : "group-hover:scale-110"}`}
                                />
                                <span className="text-xs font-semibold text-center leading-tight">
                                  {centerPrimary.title}
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })()}

                        {/* Right primary - Privacy Policy */}
                        {(() => {
                          const isActive = location.pathname === rightPrimary.path;
                          return (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.09, duration: 0.2 }}
                            >
                              <Link
                                to={rightPrimary.path}
                                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 group min-w-[75px] ${
                                  isActive ? "bg-background/15 text-background" : "text-background hover:bg-background/15"
                                }`}
                              >
                                <rightPrimary.icon 
                                  size={22} 
                                  className={`transition-transform duration-300 ${isActive ? "" : "group-hover:scale-110"}`}
                                />
                                <span className="text-xs font-semibold text-center leading-tight">
                                  {rightPrimary.title}
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })()}

                        {/* Right secondary - Cookie Policy */}
                        {(() => {
                          const isActive = location.pathname === rightSecondary.path;
                          return (
                            <motion.div
                              className="mt-4"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.12, duration: 0.2 }}
                            >
                              <Link
                                to={rightSecondary.path}
                                className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all duration-300 group ${
                                  isActive ? "text-background/60 bg-background/10" : "text-background/40 hover:text-background/70 hover:bg-background/10"
                                }`}
                              >
                                <rightSecondary.icon 
                                  size={14} 
                                  className={isActive ? "text-background/50" : "text-background/30 group-hover:text-background/60 transition-colors duration-300"}
                                />
                                <span className="text-[8px] font-medium text-center leading-tight whitespace-nowrap">
                                  {rightSecondary.title}
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })()}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            // Home page section navigation with dropdown
            <div 
              className="hidden lg:flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              {/* Main navigation container */}
              <div 
                ref={navContainerRef}
                className="flex items-center gap-0 bg-foreground/[0.03] rounded-full px-1 py-1 relative border border-foreground/[0.06] shadow-sm"
              >
                {/* Frame indicator when at hero */}
                <AnimatePresence>
                  {isAtHero && (
                    <motion.span
                      layoutId="activeTabBg"
                      className="absolute inset-0 rounded-full border-2 border-foreground bg-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        type: "tween",
                        duration: 0.35,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                    />
                  )}
                </AnimatePresence>
                
                {sectionTabs.map((tab) => (
                  <a
                    key={tab.label}
                    href={tab.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabClick(tab.label);
                      scrollToElement(tab.id, -80);
                    }}
                    className="relative px-3 py-1 text-[11px] font-medium rounded-full transition-all duration-300"
                  >
                    {/* Animated background indicator */}
                    {!isAtHero && activeTab === tab.label && (
                      <motion.span
                        layoutId="activeTabBg"
                        className="absolute inset-0 bg-foreground rounded-full shadow-md"
                        transition={{ 
                          type: "tween",
                          duration: 0.35,
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                      />
                    )}
                    <span className={`relative z-10 transition-colors duration-300 ${
                      !isAtHero && activeTab === tab.label
                        ? "text-background font-semibold"
                        : "text-foreground/50 hover:text-foreground"
                    }`}>
                      {tab.label}
                    </span>
                  </a>
                ))}
              </div>
              
              {/* Arrow indicator - always visible, centered */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 cursor-pointer z-10">
                <motion.div
                  animate={{ y: isDropdownOpen ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ${
                      isDropdownOpen 
                        ? "bg-foreground shadow-lg" 
                        : "bg-foreground/80 hover:bg-foreground shadow-md"
                    }`}
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <ChevronDown 
                      className="w-3.5 h-3.5 text-background"
                      strokeWidth={2.5}
                    />
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Dropdown menu - extends from the navigation bar */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.3, borderRadius: "50%" }}
                    animate={{ opacity: 1, scale: 1, borderRadius: "1rem" }}
                    exit={{ opacity: 0, scale: 0.3, borderRadius: "50%" }}
                    transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{ transformOrigin: "top center" }}
                    className="absolute top-[calc(100%+12px)] left-0 right-0 w-full bg-foreground shadow-2xl overflow-hidden z-50"
                  >
                    {/* Connector line to make it look connected */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-foreground" />
                    
                    <div className="p-1.5 relative">
                      {/* All pages in one row: secondary | primary | secondary */}
                      <div className="grid grid-cols-[1fr_78px_78px_78px_1fr] items-start justify-items-center gap-1 mx-auto">
                        {/* Left secondary - Terms of Service */}
                        {(() => {
                          const isActive = location.pathname === leftSecondary.path;
                          return (
                            <motion.div
                              className="mt-4"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1, duration: 0.2 }}
                            >
                              <Link
                                to={leftSecondary.path}
                                className={`flex flex-col items-center gap-1 w-[70px] px-2 py-2 rounded-lg transition-all duration-300 group ${
                                  isActive ? "text-background/60 bg-background/10" : "text-background/40 hover:text-background/70 hover:bg-background/10"
                                }`}
                              >
                                <leftSecondary.icon 
                                  size={14} 
                                  className={isActive ? "text-background/50" : "text-background/30 group-hover:text-background/60 transition-colors duration-300"}
                                />
                                <span className="text-[8px] font-medium text-center leading-tight whitespace-nowrap">
                                  {leftSecondary.title}
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })()}

                        {/* Left primary - Careers */}
                        {(() => {
                          const isActive = location.pathname === leftPrimary.path;
                          return (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.03, duration: 0.2 }}
                            >
                              <Link
                                to={leftPrimary.path}
                                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 group min-w-[75px] ${
                                  isActive ? "bg-background/15 text-background" : "text-background hover:bg-background/15"
                                }`}
                              >
                                <leftPrimary.icon 
                                  size={22} 
                                  className={`transition-transform duration-300 ${isActive ? "" : "group-hover:scale-110"}`}
                                />
                                <span className="text-xs font-semibold text-center leading-tight">
                                  {leftPrimary.title}
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })()}

                        {/* CENTER - Contact (aligned with arrow) */}
                        {(() => {
                          const isActive = location.pathname === centerPrimary.path;
                          return (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.06, duration: 0.2 }}
                            >
                              <Link
                                to={centerPrimary.path}
                                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 group min-w-[75px] ${
                                  isActive ? "bg-background/15 text-background" : "text-background hover:bg-background/15"
                                }`}
                              >
                                <centerPrimary.icon 
                                  size={22} 
                                  className={`transition-transform duration-300 ${isActive ? "" : "group-hover:scale-110"}`}
                                />
                                <span className="text-xs font-semibold text-center leading-tight">
                                  {centerPrimary.title}
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })()}

                        {/* Right primary - Privacy Policy */}
                        {(() => {
                          const isActive = location.pathname === rightPrimary.path;
                          return (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.09, duration: 0.2 }}
                            >
                              <Link
                                to={rightPrimary.path}
                                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 group min-w-[75px] ${
                                  isActive ? "bg-background/15 text-background" : "text-background hover:bg-background/15"
                                }`}
                              >
                                <rightPrimary.icon 
                                  size={22} 
                                  className={`transition-transform duration-300 ${isActive ? "" : "group-hover:scale-110"}`}
                                />
                                <span className="text-xs font-semibold text-center leading-tight">
                                  {rightPrimary.title}
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })()}

                        {/* Right secondary - Cookie Policy */}
                        {(() => {
                          const isActive = location.pathname === rightSecondary.path;
                          return (
                            <motion.div
                              className="mt-4"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.12, duration: 0.2 }}
                            >
                              <Link
                                to={rightSecondary.path}
                                className={`flex flex-col items-center gap-1 w-[70px] px-2 py-2 rounded-lg transition-all duration-300 group ${
                                  isActive ? "text-background/60 bg-background/10" : "text-background/40 hover:text-background/70 hover:bg-background/10"
                                }`}
                              >
                                <rightSecondary.icon 
                                  size={14} 
                                  className={isActive ? "text-background/50" : "text-background/30 group-hover:text-background/60 transition-colors duration-300"}
                                />
                                <span className="text-[8px] font-medium text-center leading-tight whitespace-nowrap">
                                  {rightSecondary.title}
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })()}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Right - Premium CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setAuthOverlayUrl("https://dash.unione.partners/#/login?next=%2F")}
              className="text-[13px] font-medium text-foreground/50 hover:text-foreground transition-all duration-300 relative group"
            >
              <span>Log In</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
            </button>
            <Button
              variant="hero"
              size="sm"
              className="rounded-full px-5 h-9 text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setAuthOverlayUrl("https://dash.unione.partners/#/register")}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button - Premium */}
          <motion.button
            className="lg:hidden p-2.5 text-foreground/70 hover:text-foreground rounded-xl hover:bg-foreground/5 transition-all duration-300 touch-target border border-transparent hover:border-foreground/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </nav>
      </div>

      {/* Mobile Navigation - Premium Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 top-14 sm:top-16 bg-background/70 backdrop-blur-xl z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel - Premium */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed left-4 right-4 top-16 sm:top-[72px] z-50 bg-background/95 backdrop-blur-2xl border border-foreground/[0.08] rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.02] to-transparent pointer-events-none" />
              
              <div className="p-4 relative">
                {currentPage ? (
                  // Internal page - show page title indicator
                  <div className="flex items-center justify-center gap-3 py-4 bg-foreground rounded-xl shadow-lg">
                    <currentPage.icon className="w-5 h-5 text-background" />
                    <span className="text-sm font-semibold text-background">
                      {currentPage.title}
                    </span>
                  </div>
                ) : (
                  // Home page - Mobile Section Tabs - Premium Grid
                  <nav className="grid grid-cols-2 gap-2">
                    {sectionTabs.map((tab, index) => {
                      const IconComponent = tab.icon;
                      return (
                        <motion.a
                          key={tab.label}
                          href={tab.href}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: index * 0.04, duration: 0.25 }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleTabClick(tab.label);
                            scrollToElement(tab.id, -80);
                            setTimeout(() => setIsMenuOpen(false), 150);
                          }}
                          className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium transition-all duration-300 ${
                            !isAtHero && activeTab === tab.label
                              ? "bg-foreground text-background shadow-lg"
                              : "text-foreground/60 hover:text-foreground hover:bg-foreground/[0.04] border border-transparent hover:border-foreground/[0.08]"
                          }`}
                        >
                          <IconComponent 
                            size={15} 
                            className={`transition-all duration-300 ${
                              !isAtHero && activeTab === tab.label 
                                ? "text-background" 
                                : "text-foreground/40 group-hover:text-foreground"
                            }`}
                          />
                          <span className="font-medium">{tab.label}</span>
                        </motion.a>
                      );
                    })}
                  </nav>
                )}

                {/* Premium Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-4" />

                {/* Mobile Actions - Premium Row */}
                <div className="flex gap-3">
                  <button
                    onClick={() => { setAuthOverlayUrl("https://dash.unione.partners/#/login?next=%2F"); setIsMenuOpen(false); }}
                    className="flex-1 text-xs text-center py-3 text-foreground/50 hover:text-foreground font-medium rounded-xl border border-foreground/[0.08] hover:border-foreground/20 hover:bg-foreground/[0.02] transition-all duration-300"
                  >
                    Log In
                  </button>
                  <Button 
                    variant="hero" 
                    size="sm" 
                    className="flex-1 rounded-xl text-xs h-auto py-3 shadow-lg font-semibold"
                    onClick={() => { setAuthOverlayUrl("https://dash.unione.partners/#/register"); setIsMenuOpen(false); }}
                  >
                    <Sparkles className="w-3 h-3 mr-1.5" />
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Internal Pages Menu - Separate black panel below */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.98 }}
              transition={{ duration: 0.35, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed left-4 right-4 top-[340px] sm:top-[360px] z-50 bg-foreground rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-3">
                {/* Primary pages - bigger */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[leftPrimary, centerPrimary, rightPrimary].map((page, index) => {
                    const isCurrentPage = location.pathname === page.path;
                    return (
                      <motion.div
                        key={page.path}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.03, duration: 0.2 }}
                      >
                        <Link
                          to={page.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex flex-col items-center gap-2 px-3 py-3 rounded-xl transition-all duration-300 ${
                            isCurrentPage
                              ? "bg-background/20 text-background"
                              : "text-background/80 hover:text-background hover:bg-background/15"
                          }`}
                        >
                          <page.icon 
                            size={20} 
                            className={isCurrentPage ? "text-background" : "text-background/70"}
                          />
                          <span className="text-xs font-semibold text-center">
                            {page.title}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Divider */}
                <div className="h-px bg-background/10 mb-2" />
                
                {/* Secondary pages - smaller */}
                <div className="grid grid-cols-2 gap-1">
                  {[leftSecondary, rightSecondary].map((page, index) => {
                    const isCurrentPage = location.pathname === page.path;
                    return (
                      <motion.div
                        key={page.path}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + index * 0.03, duration: 0.2 }}
                      >
                        <Link
                          to={page.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-lg transition-all duration-300 ${
                            isCurrentPage
                              ? "bg-background/15 text-background/80"
                              : "text-background/40 hover:text-background/70 hover:bg-background/10"
                          }`}
                        >
                          <page.icon 
                            size={12} 
                            className={isCurrentPage ? "text-background/70" : "text-background/40"}
                          />
                          <span className="text-[10px] font-medium">
                            {page.title}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Overlay */}
      <AnimatePresence>
        {authOverlayUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-foreground/70 backdrop-blur-2xl flex items-center justify-center"
            onClick={() => setAuthOverlayUrl(null)}
          >
            <motion.div 
              className="flex flex-col items-center gap-2"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-[100vw] sm:w-[420px] h-[80vh] sm:h-[520px] overflow-hidden sm:rounded-xl relative" style={{ background: 'transparent' }}>
                <iframe
                  src={authOverlayUrl}
                  className="absolute inset-0 w-full border-none sm:rounded-xl"
                  title="Authentication"
                  style={{ height: '200%', top: '0', background: 'transparent' }}
                />
              </div>
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: 0.15, duration: 0.25 }}
                className="hidden sm:flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold bg-white/10 border border-white/15 text-white/80 hover:bg-white/20 hover:text-white hover:border-white/30 backdrop-blur-sm transition-all duration-300"
                onClick={() => setAuthOverlayUrl(null)}
              >
                <X className="w-3.5 h-3.5" />
                Back
              </motion.button>
              {/* Mobile back - centered below container */}
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: 0.15, duration: 0.25 }}
                className="sm:hidden flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold bg-foreground text-background shadow-xl mt-3"
                onClick={() => setAuthOverlayUrl(null)}
              >
                <X className="w-4 h-4" />
                Back
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
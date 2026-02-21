var lenis = null;

function initLenis() {
  if (typeof Lenis === 'undefined') return;

  lenis = new Lenis({
    duration: 1.2,
    easing: function(t) {
      return Math.min(1, 1.001 - Math.pow(2, -10 * t));
    },
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

initLenis();

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  var CONFIG = {
    navbarHeight: 56,
    scrollSpyOffset: 120,
    animationDelay: 1400,
    sections: ['challenge', 'solution', 'advertisers', 'publishers', 'how-it-works', 'why-unione']
  };

  var elements = {
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileMenu: document.getElementById('mobileMenu'),
    mobileMenuBackdrop: document.getElementById('mobileMenuBackdrop'),
    mobileInternalPages: document.getElementById('mobileInternalPages'),
    navTabs: document.querySelectorAll('.nav-tab'),
    mobileNavItems: document.querySelectorAll('.mobile-nav-item'),
    mobileInternalItems: document.querySelectorAll('.mobile-internal-item'),
    navIndicator: document.getElementById('navIndicator'),
    navTabsContainer: document.getElementById('navTabs'),
    navDropdownContainer: document.getElementById('navDropdownContainer'),
    navDropdownArrow: document.getElementById('navDropdownArrow'),
    navDropdownMenu: document.getElementById('navDropdownMenu')
  };

  var isScrolling = false;
  var isAtHero = true;
  var currentActiveSection = null;
  var scrollUnlockTimeout = null;
  var menuOpen = false;
  var dropdownOpen = false;
  var dropdownTimeout = null;

  function lockScrollSpy() {
    isScrolling = true;
    if (scrollUnlockTimeout) clearTimeout(scrollUnlockTimeout);
    scrollUnlockTimeout = setTimeout(function() {
      isScrolling = false;
    }, CONFIG.animationDelay);
  }

  // ── Mobile Menu ───────────────────────────────────────────

  function initMobileMenu() {
    var btn = elements.mobileMenuBtn;
    var menu = elements.mobileMenu;
    var backdrop = elements.mobileMenuBackdrop;

    if (!btn || !menu) return;

    function openMenu() {
      menuOpen = true;
      btn.classList.add('active');
      menu.classList.add('active');
      if (backdrop) backdrop.classList.add('active');
      if (elements.mobileInternalPages) elements.mobileInternalPages.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menuOpen = false;
      btn.classList.remove('active');
      menu.classList.remove('active');
      if (backdrop) backdrop.classList.remove('active');
      if (elements.mobileInternalPages) elements.mobileInternalPages.classList.remove('active');
      document.body.style.overflow = '';
    }

    function toggleMenu() {
      menuOpen ? closeMenu() : openMenu();
    }

    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    if (backdrop) {
      backdrop.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
      });
    }

    elements.mobileNavItems.forEach(function(item) {
      item.addEventListener('click', function() { setTimeout(closeMenu, 150); });
    });

    elements.mobileInternalItems.forEach(function(item) {
      item.addEventListener('click', function() { setTimeout(closeMenu, 150); });
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth >= 1024 && menuOpen) closeMenu();
    });
  }

  // ── Desktop Dropdown ──────────────────────────────────────

  function initDropdownMenu() {
    var container = elements.navDropdownContainer;
    var arrow = elements.navDropdownArrow;
    if (!container || !arrow) return;

    function openDropdown() {
      if (dropdownTimeout) clearTimeout(dropdownTimeout);
      dropdownOpen = true;
      container.classList.add('dropdown-open');
    }

    function closeDropdown() {
      dropdownTimeout = setTimeout(function() {
        dropdownOpen = false;
        container.classList.remove('dropdown-open');
      }, 150);
    }

    container.addEventListener('mouseenter', openDropdown);
    container.addEventListener('mouseleave', closeDropdown);

    arrow.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (dropdownOpen) {
        if (dropdownTimeout) clearTimeout(dropdownTimeout);
        dropdownOpen = false;
        container.classList.remove('dropdown-open');
      } else {
        openDropdown();
      }
    });
  }

  // ── Smooth Scroll ─────────────────────────────────────────

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        e.preventDefault();

        if (href === '#') {
          scrollToTop();
          return;
        }

        var targetElement = document.getElementById(href.substring(1));
        if (targetElement) {
          lockScrollSpy();
          if (lenis) {
            lenis.scrollTo(targetElement, { offset: -80, duration: 1.2 });
          } else {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.pageYOffset - 80,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    function isCurrentPageHome() {
      var path = window.location.pathname;
      // Check common home page paths
      if (path === '/' || path === '' || path === '/index.php' || path === '/index.html') return true;
      if (path.match(/\/public\/?$/) || path.match(/\/public\/index\.php$/)) return true;
      // If no /pages/ in path, likely home
      if (path.indexOf('/pages/') === -1 && !path.match(/\/(contact|careers|privacy|terms|cookie)/)) return true;
      return false;
    }

    document.querySelectorAll('a.logo, a.footer-logo').forEach(function(logo) {
      logo.addEventListener('click', function(e) {
        if (isCurrentPageHome()) {
          e.preventDefault();
          scrollToTop();
        }
      });
    });
  }

  function scrollToTop() {
    lockScrollSpy();
    isAtHero = true;
    currentActiveSection = null;
    updateIndicatorToFrame();

    elements.navTabs.forEach(function(tab) { tab.classList.remove('active'); });
    elements.mobileNavItems.forEach(function(item) { item.classList.remove('active'); });

    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // ── Navigation Indicator ──────────────────────────────────

  function updateIndicatorToFrame() {
    if (!elements.navIndicator || !elements.navTabsContainer) return;
    elements.navIndicator.classList.add('frame-mode');
  }

  function updateIndicatorToTab(activeTab) {
    if (!elements.navIndicator || !activeTab || !elements.navTabsContainer) return;
    elements.navIndicator.classList.remove('frame-mode');
    elements.navIndicator.style.left = activeTab.offsetLeft + 'px';
    elements.navIndicator.style.width = activeTab.offsetWidth + 'px';
  }

  function updateActiveTab(sectionId) {
    if (currentActiveSection === sectionId && !isAtHero) return;
    currentActiveSection = sectionId;
    isAtHero = false;

    elements.navTabs.forEach(function(tab) {
      if (tab.dataset.section === sectionId) {
        tab.classList.add('active');
        updateIndicatorToTab(tab);
      } else {
        tab.classList.remove('active');
      }
    });

    elements.mobileNavItems.forEach(function(item) {
      item.classList[item.dataset.section === sectionId ? 'add' : 'remove']('active');
    });
  }

  function initNavigation() {
    elements.navTabs.forEach(function(tab) { tab.classList.remove('active'); });
    elements.mobileNavItems.forEach(function(item) { item.classList.remove('active'); });
    updateIndicatorToFrame();

    elements.navTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        lockScrollSpy();
        updateActiveTab(this.dataset.section);
      });
    });

    elements.mobileNavItems.forEach(function(item) {
      item.addEventListener('click', function() {
        lockScrollSpy();
        updateActiveTab(this.dataset.section);
      });
    });
  }

  // ── Scroll Spy ────────────────────────────────────────────

  function handleScrollSpy() {
    if (isScrolling) return;

    var scrollPosition = window.scrollY + CONFIG.scrollSpyOffset;
    var firstSection = document.getElementById(CONFIG.sections[0]);
    var heroThreshold = firstSection ? firstSection.offsetTop - 50 : 300;

    if (scrollPosition < heroThreshold) {
      if (!isAtHero) {
        isAtHero = true;
        currentActiveSection = null;
        updateIndicatorToFrame();
        elements.navTabs.forEach(function(tab) { tab.classList.remove('active'); });
        elements.mobileNavItems.forEach(function(item) { item.classList.remove('active'); });
      }
      return;
    }

    for (var i = CONFIG.sections.length - 1; i >= 0; i--) {
      var section = document.getElementById(CONFIG.sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        updateActiveTab(CONFIG.sections[i]);
        break;
      }
    }
  }

  function initScrollSpy() {
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
  }

  // ── Scroll Animations ────────────────────────────────────

  function initScrollAnimations() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '-100px', threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(function(el) {
      observer.observe(el);
    });
  }

  function initResizeHandler() {
    var resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        var activeTab = document.querySelector('.nav-tab.active');
        if (activeTab) updateIndicatorToTab(activeTab);
      }, 100);
    });
  }

  // ── Section-Specific Animations ──────────────────────────

  function initPuzzleAnimation() {
    var puzzleSvg = document.querySelector('.puzzle-svg');
    if (!puzzleSvg) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3, rootMargin: '-50px' });

    observer.observe(puzzleSvg);
  }

  function initChartAnimation() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    var chartArea = document.querySelector('.chart-bars');
    if (chartArea) observer.observe(chartArea);
  }

  function initDashboardStatsAnimation() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.dashboard-stat.fade-in-up').forEach(function(stat) {
            stat.classList.add('visible');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    var dashboardStats = document.querySelector('.dashboard-stats');
    if (dashboardStats) observer.observe(dashboardStats);
  }

  function initStepCardsAnimation() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.step-card.fade-in-up').forEach(function(step, index) {
            setTimeout(function() { step.classList.add('visible'); }, index * 150);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    var stepsGrid = document.querySelector('.steps-grid');
    if (stepsGrid) observer.observe(stepsGrid);
  }

  function initReasonCardsAnimation() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reason-card.fade-in-up').forEach(function(reason, index) {
            setTimeout(function() { reason.classList.add('visible'); }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    var reasonsGrid = document.querySelector('.reasons-grid');
    if (reasonsGrid) observer.observe(reasonsGrid);
  }

  function initToolsAnimation() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.tool-card').forEach(function(tool, index) {
            tool.style.opacity = '0';
            tool.style.transform = 'translateY(20px) scale(0.9)';
            tool.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            tool.style.transitionDelay = (0.2 + index * 0.1) + 's';
            setTimeout(function() {
              tool.style.opacity = '1';
              tool.style.transform = 'translateY(0) scale(1)';
            }, 50);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    var toolsGrid = document.querySelector('.tools-grid');
    if (toolsGrid) observer.observe(toolsGrid);
  }

  function initEarningsCardAnimation() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(20px)';
          entry.target.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s';
          setTimeout(function() {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 50);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    var earningsCard = document.querySelector('.earnings-card');
    if (earningsCard) observer.observe(earningsCard);
  }

  function initNetworkHubAnimation() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    var networkVisual = document.querySelector('.network-visual');
    if (networkVisual) observer.observe(networkVisual);
  }

  function initFeatureItemsAnimation() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.feature-item').forEach(function(feature, index) {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
            feature.style.transition = 'all 0.5s ease';
            feature.style.transitionDelay = (0.2 + index * 0.1) + 's';
            setTimeout(function() {
              feature.style.opacity = '1';
              feature.style.transform = 'translateY(0)';
            }, 50);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.features-list').forEach(function(list) {
      observer.observe(list);
    });
  }


  // ── Init ──────────────────────────────────────────────────

  initMobileMenu();
  initDropdownMenu();
  initSmoothScroll();
  initNavigation();
  initScrollSpy();
  initScrollAnimations();
  initResizeHandler();
  initPuzzleAnimation();
  initChartAnimation();
  initDashboardStatsAnimation();
  initStepCardsAnimation();
  initReasonCardsAnimation();
  initToolsAnimation();
  initEarningsCardAnimation();
  initNetworkHubAnimation();
  initFeatureItemsAnimation();
});
document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // CONFIGURAÇÃO CENTRALIZADA DE CONTATOS
  // ==========================================
  const CONFIG_CONTATO = {
    whatsappUrl: "https://nextautomatik.com",
    phone: "(11) 99781-4253",
    email: "contato@jessicasouzanutri.com.br",
    instagram: "https://instagram.com/jessicasouzanutri"
  };

  // Atualiza dinamicamente todos os elementos com data-attributes
  document.querySelectorAll('[data-contact-wa-url]').forEach(el => el.href = CONFIG_CONTATO.whatsappUrl);
  document.querySelectorAll('[data-contact-phone]').forEach(el => el.textContent = CONFIG_CONTATO.phone);
  document.querySelectorAll('[data-contact-email]').forEach(el => el.textContent = CONFIG_CONTATO.email);
  document.querySelectorAll('[data-contact-instagram]').forEach(el => el.href = CONFIG_CONTATO.instagram);

  // ==========================================
  // 1. STICKY HEADER & NAV ACTIVE STATES
  // ==========================================
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const handleScroll = () => {
    const scrollY = window.pageYOffset;
    
    // Sticky Header toggle class
    if (scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
    
    // Active link highlighting on scroll
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // Offset for sticky header
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger initial check

  // ==========================================
  // 2. MOBILE MENU HAMBURGER TOGGLE
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // ==========================================
  // 3. GSAP INITIALIZATION & SCROLLSMOOTHER
  // ==========================================
  if (typeof gsap !== 'undefined') {
    // Determine which plugins are loaded and register them
    const pluginsToRegister = [];
    if (typeof ScrollTrigger !== 'undefined') pluginsToRegister.push(ScrollTrigger);
    if (typeof ScrollSmoother !== 'undefined') pluginsToRegister.push(ScrollSmoother);
    if (typeof SplitText !== 'undefined') pluginsToRegister.push(SplitText);
    if (typeof CustomEase !== 'undefined') pluginsToRegister.push(CustomEase);
    if (typeof ScrollToPlugin !== 'undefined') pluginsToRegister.push(ScrollToPlugin);

    gsap.registerPlugin(...pluginsToRegister);

    // Initialize ScrollSmoother if available
    let smoother = null;
    if (typeof ScrollSmoother !== 'undefined') {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true
      });
    }

    // Set initial state of scroll animated elements immediately to avoid layout flash
    gsap.set(".scroll-animate", { opacity: 0, y: 40 });

    // ==========================================
    // 4. GSAP & SPLITTEXT ANIMATIONS
    // ==========================================
    
    // SplitText animation for Hero Title
    if (typeof SplitText !== 'undefined') {
      const heroTitleSplit = new SplitText(".hero-title", { type: "words, chars" });
      gsap.from(heroTitleSplit.chars, {
        opacity: 0,
        y: 25,
        stagger: 0.02,
        duration: 0.8,
        ease: "back.out(1.5)"
      });

      // Section Titles animated word-by-word on scroll
      document.querySelectorAll('.section-title').forEach(title => {
        const split = new SplitText(title, { type: "words" });
        gsap.from(split.words, {
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          opacity: 0,
          y: 20,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out"
        });
      });
    } else {
      // Fallback Hero animation if SplitText is not loaded
      gsap.from(".hero-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out"
      });
    }

    // Fade-in hero subtitle and actions
    gsap.from(".hero-subtitle, .hero-actions", {
      opacity: 0,
      y: 20,
      duration: 1.2,
      stagger: 0.15,
      delay: 0.4,
      ease: "power3.out"
    });

    // 1. Sobre Section (Fade-in-up staggered)
    gsap.to(".sobre-col-left", {
      scrollTrigger: {
        trigger: ".sobre",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    });
    
    gsap.to(".sobre-col-right", {
      scrollTrigger: {
        trigger: ".sobre",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.15,
      ease: "power3.out"
    });

    // 2. Serviços Section Header & Cards Stagger
    gsap.to(".servicos center", {
      scrollTrigger: {
        trigger: ".servicos",
        start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    gsap.to(".servico-card", {
      scrollTrigger: {
        trigger: ".servicos-grid",
        start: "top 85%",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out"
    });

    // 3. Diferenciais Section Header & Cards Stagger
    gsap.to(".diferenciais center", {
      scrollTrigger: {
        trigger: ".diferenciais",
        start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    gsap.to(".diferencial-card", {
      scrollTrigger: {
        trigger: ".diferenciais-grid",
        start: "top 85%",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out"
    });

    // 4. Atendimento Section (Cards & Timeline/Process steps)
    // Cards themselves entry animation
    gsap.to(".atendimento-card", {
      scrollTrigger: {
        trigger: ".atendimento",
        start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.18,
      ease: "power3.out"
    });

    // Timeline items and steps entry
    gsap.to(".timeline-item", {
      scrollTrigger: {
        trigger: ".timeline",
        start: "top 85%",
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out"
    });

    gsap.to(".step-item", {
      scrollTrigger: {
        trigger: ".process-steps",
        start: "top 85%",
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out"
    });

    // 5. CTA Mid
    gsap.to(".cta-mid-wrapper", {
      scrollTrigger: {
        trigger: ".cta-mid",
        start: "top 85%",
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    });

    // 6. Contato Section Info & WhatsApp phone mockup entrance
    gsap.to(".contato-info", {
      scrollTrigger: {
        trigger: ".contato",
        start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from("#phone-mockup", {
      scrollTrigger: {
        trigger: ".mockup-col",
        start: "top 80%",
      },
      opacity: 0,
      scale: 0.95,
      y: 55,
      duration: 1.2,
      ease: "power3.out",
      onComplete: () => {
        // Trigger chat mockup inner animation class after mockup enters
        const phone = document.getElementById('phone-mockup');
        if (phone) phone.classList.add('animated');
      }
    });

    // 7. Especialidade Sub-pages Content
    gsap.to(".especialidade-texto", {
      scrollTrigger: {
        trigger: ".especialidade-conteudo",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.to(".especialidade-imagens", {
      scrollTrigger: {
        trigger: ".especialidade-conteudo",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.15,
      ease: "power3.out"
    });

    // Specialty Hero Content entry on load
    gsap.from(".especialidade-hero-content", {
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: "power3.out"
    });

    // ==========================================
    // 5. SMOOTH SCROLL OVERRIDE FOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          if (smoother) {
            // Use ScrollSmoother's scrollTo method
            smoother.scrollTo(target, true, "top 80px");
          } else if (typeof ScrollToPlugin !== 'undefined') {
            // Fallback to GSAP ScrollTo
            gsap.to(window, {
              duration: 1.2,
              scrollTo: { y: target, offsetY: 80 },
              ease: "power3.inOut"
            });
          }
        }
      });
    });
  } else {
    // Fallback if GSAP is blocked by extensions or fails to load
    const phoneMockup = document.getElementById('phone-mockup');
    if (phoneMockup) phoneMockup.classList.add('animated');
  }
});
// ========================================
// Minimal Academic Portfolio
// Subtle, smooth interactions inspired by stellalisy.com
// ========================================

(function() {
    'use strict';

    // ========================================
    // Smooth Navigation
    // ========================================
    
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    // Update navigation on scroll
    function updateNav() {
        const currentScrollY = window.scrollY;
        
        // Add subtle shadow on scroll
        if (currentScrollY > 10) {
            nav.style.borderBottom = '1px solid #e0e0e0';
            nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        } else {
            nav.style.borderBottom = '1px solid #eeeeee';
            nav.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    // Throttle scroll events
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateNav);
            ticking = true;
        }
    });
    
    // ========================================
    // Active Section Highlighting
    // ========================================
    
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    window.addEventListener('load', highlightNavigation);
    
    // ========================================
    // Smooth Scrolling
    // ========================================
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // Fade In on Scroll
    // ========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.project-card, .publication, .timeline-item, .interest-card').forEach(el => {
        observer.observe(el);
    });
    
    // ========================================
    // Minimal Card Interactions
    // ========================================
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add subtle hover effect with mouse position
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // ========================================
    // Photo Gallery Lightbox
    // ========================================
    
    window.openLightbox = function(src) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            lightbox.style.zIndex = '9999';
            lightbox.style.cursor = 'pointer';
            
            // Fade in
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.style.transition = 'opacity 0.3s ease';
                lightbox.style.opacity = '1';
            }, 10);
            
            document.body.style.overflow = 'hidden';
        }
    };
    
    window.closeLightbox = function() {
        const lightbox = document.getElementById('lightbox');
        
        if (lightbox) {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.style.display = 'none';
                lightbox.style.opacity = '';
            }, 300);
            
            document.body.style.overflow = '';
        }
    };
    
    // Close lightbox with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // ========================================
    // Subtle Link Animations
    // ========================================
    
    const textLinks = document.querySelectorAll('.text-link');
    
    textLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--accent-blue)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });
    
    // ========================================
    // Performance Optimization
    // ========================================
    
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimize resize events
    window.addEventListener('resize', debounce(() => {
        // Handle any resize-dependent functionality
    }, 250));
    
    // ========================================
    // Page Load Animations
    // ========================================
    
    window.addEventListener('load', function() {
        // Animate hero content on load
        const heroElements = document.querySelectorAll('.hero-name, .hero-title, .hero-description, .hero-links');
        
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
    
    // ========================================
    // Mobile Menu (if needed)
    // ========================================
    
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
                navLinksContainer.classList.remove('active');
            }
        });
    }
    
    // ========================================
    // Console Message
    // ========================================
    
    console.log('%c Jason Sun ', 'background: #000; color: #fff; padding: 5px 10px; font-size: 14px; font-weight: bold;');
    console.log('Building AI systems that amplify human expertise.');
    console.log('Get in touch: xsun90@jh.edu');
    
})();
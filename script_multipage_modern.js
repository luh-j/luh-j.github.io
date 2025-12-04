// ========================================
// Multi-Page Modern Portfolio
// Rich interactions and beautiful animations
// ========================================

(function() {
    'use strict';

    // ========================================
    // Page Load Animations
    // ========================================
    
    document.addEventListener('DOMContentLoaded', function() {
        document.body.classList.add('loaded');
        
        // Animate hero elements on load
        const heroElements = document.querySelectorAll('.hero-name, .hero-tagline, .hero-description, .quick-links');
        heroElements.forEach((el, index) => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
        
        // Add parallax effect to hero background
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            window.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;
                
                if (heroSection.querySelector('::before')) {
                    heroSection.style.setProperty('--mouse-x', `${x}px`);
                    heroSection.style.setProperty('--mouse-y', `${y}px`);
                }
            });
        }
    });

    // ========================================
    // Navigation Effects
    // ========================================
    
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    let isScrolling = false;
    
    // Dynamic navigation on scroll
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                // Add scrolled class for styling
                if (currentScroll > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                
                // Hide/show navigation
                if (currentScroll > lastScroll && currentScroll > 300) {
                    nav.style.transform = 'translateY(-100%)';
                } else {
                    nav.style.transform = 'translateY(0)';
                }
                
                lastScroll = currentScroll;
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    // Active section highlighting for single-page navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Only handle anchor links (starting with #)
        if (href && href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update URL without jumping
                    history.pushState(null, null, href);
                }
            });
        }

        // Add hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Highlight active section on scroll
    function highlightActiveSection() {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Call on scroll
    window.addEventListener('scroll', highlightActiveSection);

    // Call on page load
    highlightActiveSection();

    // ========================================
    // Card Interactions with 3D Effects
    // ========================================
    
    const cards = document.querySelectorAll('.project-card, .research-item, .focus-item, .partnership-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            
            // Add spotlight effect
            const spotlight = document.createElement('div');
            spotlight.className = 'spotlight';
            spotlight.style.cssText = `
                position: absolute;
                top: ${y}px;
                left: ${x}px;
                width: 100px;
                height: 100px;
                background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
                pointer-events: none;
                transform: translate(-50%, -50%);
                z-index: 0;
            `;
            
            if (!this.querySelector('.spotlight')) {
                this.style.position = 'relative';
                this.appendChild(spotlight);
            } else {
                const existingSpotlight = this.querySelector('.spotlight');
                existingSpotlight.style.top = `${y}px`;
                existingSpotlight.style.left = `${x}px`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            const spotlight = this.querySelector('.spotlight');
            if (spotlight) {
                spotlight.remove();
            }
        });
        
        // Click ripple effect
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(99, 102, 241, 0.5);
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
                transform: scale(0);
                animation: rippleEffect 0.6s ease;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ========================================
    // Intersection Observer for Animations
    // ========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(50px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Add class for additional animations
                        entry.target.classList.add('animated');
                    }, 50);
                }, index * 100);
                
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all major content elements
    const animatedElements = document.querySelectorAll(
        '.research-item, .experience-item, .project-card, .publication-item, ' +
        '.news-item, .focus-item, .partnership-item, .media-item'
    );
    
    animatedElements.forEach(el => {
        animateOnScroll.observe(el);
    });

    // ========================================
    // Number Counter Animation
    // ========================================
    
    const countUp = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };
    
    // Animate stats when visible
    const stats = document.querySelectorAll('.impact-item strong, .project-stats .stat strong');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (!isNaN(number)) {
                    countUp(element, number);
                }
                
                statsObserver.unobserve(element);
            }
        });
    });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ========================================
    // Tag Interactions
    // ========================================
    
    const tags = document.querySelectorAll('.tag, .tech-tag');
    
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Add click animation
        tag.addEventListener('click', function() {
            this.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });

    // ========================================
    // Link Button Interactions
    // ========================================
    
    const linkButtons = document.querySelectorAll('.link-button, .project-link, .pub-link');
    
    linkButtons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create gradient follow effect
            this.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(99, 102, 241, 0.1) 0%, transparent 70%)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });

    // ========================================
    // Citation Modal with Animation
    // ========================================
    
    const citations = {
        'sun2026chaos': `@inproceedings{sun2026chaos,
  title={From Chaos to Clarity: AI-Driven News Intelligence for NFL Front Offices},
  author={Sun, Xiaojian and Indukuri, Siva and Albayrak, Nahuel and Chen, Joyce and Murray, Kenton and Dahbura, Anton and Berkery, Tad},
  booktitle={MIT Sloan Sports Analytics Conference},
  year={2026}
}`,
        'gao2026guides': `@inproceedings{gao2026guides,
  title={GUIDES: Guidance Using Instructor-Distilled Embeddings for Robot Policy Enhancement},
  author={Gao, Minquan and Sun, Xiaojian and Yan, Qing and Li, Xinyi and Zhang, Xiaopan and Li, Jiachen and Huang, Chien-Ming},
  booktitle={IEEE International Conference on Robotics and Automation},
  year={2026}
}`,
        'sun2026adaptive': `@inproceedings{sun2026adaptive,
  title={Adaptive Teleoperation Motion Scaling Based on Human Performance Characterization},
  author={Sun, Xiaojian and Yu, Kaichen and Kazanzides, Peter and Munawar, Adnan},
  booktitle={IEEE International Conference on Robotics and Automation},
  year={2026}
}`,
        'sun2026batvision': `@inproceedings{sun2026batvision,
  title={BatVision: Regression-Calibrated Single-View Computer Vision Pipeline for Precise Baseball Bat Analysis and Quality Control},
  author={Sun, Xiaojian and Wu, Junlin and Dahbura, Anton},
  booktitle={MIT Sloan Sports Analytics Conference},
  year={2026}
}`
    };
    
    const citeButtons = document.querySelectorAll('.cite-btn');
    
    citeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const key = this.dataset.cite;
            const citation = citations[key];
            
            if (citation) {
                // Create modal if it doesn't exist
                let modal = document.getElementById('citation-modal');
                if (!modal) {
                    modal = document.createElement('div');
                    modal.id = 'citation-modal';
                    modal.className = 'citation-modal';
                    modal.innerHTML = `
                        <div class="citation-content">
                            <span class="close-citation">&times;</span>
                            <h3>BibTeX Citation</h3>
                            <pre id="citation-text"></pre>
                            <button id="copy-citation" class="copy-btn">
                                <i class="fas fa-copy"></i> Copy to Clipboard
                            </button>
                        </div>
                    `;
                    document.body.appendChild(modal);
                }
                
                const citationText = document.getElementById('citation-text');
                citationText.textContent = citation;
                
                // Show modal with animation
                modal.style.display = 'flex';
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.transition = 'opacity 0.3s ease';
                    modal.style.opacity = '1';
                }, 10);
                
                // Close button
                modal.querySelector('.close-citation').addEventListener('click', () => {
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        modal.style.display = 'none';
                    }, 300);
                });
                
                // Copy button
                modal.querySelector('#copy-citation').addEventListener('click', () => {
                    navigator.clipboard.writeText(citation).then(() => {
                        const btn = modal.querySelector('#copy-citation');
                        const originalHTML = btn.innerHTML;
                        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                        btn.style.background = '#10b981';
                        
                        setTimeout(() => {
                            btn.innerHTML = originalHTML;
                            btn.style.background = '';
                        }, 2000);
                    });
                });
                
                // Close on background click
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.style.opacity = '0';
                        setTimeout(() => {
                            modal.style.display = 'none';
                        }, 300);
                    }
                });
            }
        });
    });

    // ========================================
    // Smooth Page Transitions (for external pages like CV)
    // ========================================

    document.querySelectorAll('a[href$=".html"]:not([href^="#"])').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Don't apply transition for anchor links
            if (!href.startsWith('#')) {
                e.preventDefault();
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';

                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });

    // ========================================
    // Particle Background Effect
    // ========================================
    
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 20 + 10}s infinite ease-in-out;
            `;
            particlesContainer.appendChild(particle);
        }
        
        document.body.appendChild(particlesContainer);
    }
    
    // Add particles on desktop only
    if (window.innerWidth > 768) {
        createParticles();
    }

    // ========================================
    // Add CSS for Ripple Effect
    // ========================================
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .spotlight {
            transition: all 0.1s ease;
        }
        
        .particles div {
            opacity: 0.5;
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // Console Easter Egg
    // ========================================
    
    const styles = [
        'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'color: white',
        'padding: 10px 20px',
        'font-size: 16px',
        'font-weight: bold',
        'border-radius: 8px'
    ].join(';');
    
    console.log('%c 🚀 Jason Sun - AI Researcher ', styles);
    console.log('%c Building AI systems that amplify human expertise ', 'color: #667eea; font-size: 14px; font-weight: 500;');
    console.log('%c Get in touch: xsun90@jh.edu ', 'color: #764ba2; font-size: 12px;');

})();
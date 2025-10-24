// ========================================
// Mobile Navigation Toggle
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// ========================================
// Smooth Scroll with Active Link Highlighting
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Function to remove active class from all links
    function removeActiveClasses() {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    }
    
    // Function to add active class to current section link
    function addActiveClass(id) {
        removeActiveClasses();
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Intersection Observer for section highlighting
    const observerOptions = {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                addActiveClass(entry.target.id);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

// ========================================
// Navbar Scroll Effect
// ========================================

let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
    
    // Hide/show navbar on scroll (optional)
    if (window.scrollY > lastScrollY && window.scrollY > 300) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = window.scrollY;
});

// ========================================
// Fade In Animation on Scroll
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.research-card, .publication, .timeline-item, .news-item');
    
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
});

// ========================================
// Dynamic Year Update
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
});

// ========================================
// Research Card Hover Effects
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const researchCards = document.querySelectorAll('.research-card');
    
    researchCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(0, 102, 204, 0.05),
                    transparent
                )
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.background = '';
        });
    });
});

// ========================================
// Smooth Anchor Scrolling
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Publication Links Copy Citation
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Add copy citation functionality
    const publications = [
        {
            id: 1,
            bibtex: `@inproceedings{sun2026chaos,
  title={From Chaos to Clarity: AI-Driven News Intelligence for NFL Front Offices},
  author={Sun, Xiaojian and Indukuri, Siva and Albayrak, Nahuel and Chen, Joyce and Murray, Kenton and Dahbura, Anton and Berkery, Tad},
  booktitle={MIT Sloan Sports Analytics Conference},
  year={2026}
}`
        },
        {
            id: 2,
            bibtex: `@inproceedings{gao2026guides,
  title={GUIDES: Guidance Using Instructor-Distilled Embeddings for Robot Policy Enhancement},
  author={Gao, Minquan and Sun, Xiaojian and Yan, Qing and Li, Xinyi and Zhang, Xiaopan and Li, Jiachen and Huang, Chien-Ming},
  booktitle={IEEE International Conference on Robotics and Automation},
  year={2026}
}`
        },
        {
            id: 3,
            bibtex: `@inproceedings{sun2026adaptive,
  title={Adaptive Teleoperation Motion Scaling Based on Human Performance Characterization},
  author={Sun, Xiaojian and Yu, Kaichen and Kazanzides, Peter and Munawar, Adnan},
  booktitle={IEEE International Conference on Robotics and Automation},
  year={2026}
}`
        },
        {
            id: 4,
            bibtex: `@inproceedings{sun2026batvision,
  title={BatVision: Regression-Calibrated Computer Vision Pipeline for Precise Equipment Analysis},
  author={Sun, Xiaojian and Wu, Junlin and Dahbura, Anton},
  booktitle={MIT Sloan Sports Analytics Conference},
  year={2026}
}`
        }
    ];
    
    // You can add citation copy functionality here if needed
});

// ========================================
// Console Messages
// ========================================

console.log('Welcome to my website!');
console.log('I am always open to research collaborations and interesting discussions about AI and human expertise.');
console.log('Feel free to reach out at xsun90@jh.edu');

// ========================================
// Performance Optimization
// ========================================

// Debounce function for scroll events
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

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply optimization to scroll and resize events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations
}, 10));

window.addEventListener('resize', throttle(() => {
    // Resize-based adjustments
}, 200));

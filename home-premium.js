// Premium Home Page JavaScript with Advanced Features

document.addEventListener('DOMContentLoaded', function() {
    // ============================
    // 1. LOADING SCREEN
    // ============================
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 1000);
    });

    // ============================
    // 2. SCROLL PROGRESS BAR
    // ============================
    const scrollProgress = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = progress + '%';
    });

    // ============================
    // 3. NAVBAR SCROLL EFFECT
    // ============================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================
    // 4. MOBILE NAVIGATION
    // ============================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ============================
    // 5. SMOOTH SCROLLING
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================
    // 6. PARTICLES EFFECT
    // ============================
    const particlesContainer = document.getElementById('particles');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 25000);
    }

    // Create initial particles
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            setTimeout(createParticle, i * 200);
        }
        
        // Continue creating particles
        setInterval(createParticle, 1000);
    }

    // ============================
    // 7. TESTIMONIALS SLIDER
    // ============================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let testimonialInterval;

    function showSlide(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });

        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % testimonialCards.length;
        showSlide(next);
    }

    // Auto-advance testimonials
    function startTestimonialSlider() {
        testimonialInterval = setInterval(nextSlide, 5000);
    }

    function stopTestimonialSlider() {
        clearInterval(testimonialInterval);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopTestimonialSlider();
            startTestimonialSlider();
        });
    });

    // Start the slider
    if (testimonialCards.length > 0) {
        startTestimonialSlider();
    }

    // ============================
    // 8. BACK TO TOP BUTTON
    // ============================
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================
    // 9. SCROLL ANIMATIONS (AOS)
    // ============================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // ============================
    // 10. INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.service-card, .work-item, .feature-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // ============================
    // 11. COUNTER ANIMATION FOR STATS
    // ============================
    function animateCounter(element, target) {
        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;
        let current = 0;
        
        const isPercentage = element.textContent.includes('%');
        const isPlus = element.textContent.includes('+');
        const targetNum = parseInt(target);
        
        const increment = targetNum / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
                current = targetNum;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPercentage) {
                element.textContent = displayValue + '%';
            } else if (isPlus) {
                element.textContent = displayValue + '+';
            } else {
                element.textContent = displayValue;
            }
        }, stepDuration);
    }

    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    const text = statNumber.textContent;
                    const num = text.match(/\d+/);
                    if (num) {
                        animateCounter(statNumber, num[0]);
                        entry.target.classList.add('animated');
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });

    // ============================
    // 12. FORM ENHANCEMENTS
    // ============================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add focus effect
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    });

    // ============================
    // 13. LAZY LOADING IMAGES
    // ============================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================
    // 14. PARALLAX EFFECT
    // ============================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-shapes .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.2;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ============================
    // 15. ACTIVE NAV LINK ON SCROLL
    // ============================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ============================
    // 16. TYPING EFFECT (Optional Enhancement)
    // ============================
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // ============================
    // 17. CURSOR TRAIL EFFECT (Optional Premium Feature)
    // ============================
    const coords = { x: 0, y: 0 };
    const circles = [];
    const colors = ['#3b82f6', '#60a5fa', '#93c5fd'];

    // Create 20 circles for the trail
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.style.position = 'fixed';
        circle.style.width = '10px';
        circle.style.height = '10px';
        circle.style.borderRadius = '50%';
        circle.style.pointerEvents = 'none';
        circle.style.zIndex = '9998';
        circle.style.transition = 'background-color 0.3s ease';
        circle.style.opacity = (20 - i) / 20;
        circles.push(circle);
        document.body.appendChild(circle);
    }

    // Update cursor coordinates
    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    // Animate circles
    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach((circle, index) => {
            circle.style.left = x - 5 + 'px';
            circle.style.top = y - 5 + 'px';
            circle.style.backgroundColor = colors[index % colors.length];
            circle.style.transform = `scale(${(20 - index) / 20})`;

            const nextCircle = circles[index + 1] || circles[0];
            x += (parseInt(nextCircle.style.left || coords.x) - x) * 0.3;
            y += (parseInt(nextCircle.style.top || coords.y) - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    // Only enable cursor trail on desktop
    if (window.innerWidth > 768) {
        animateCircles();
    } else {
        circles.forEach(circle => circle.remove());
    }

    // ============================
    // 18. PERFORMANCE OPTIMIZATION
    // ============================
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

    // Apply debounce to scroll-heavy functions
    window.addEventListener('scroll', debounce(() => {
        // Your scroll-heavy operations here
    }, 10));

    // ============================
    // 19. CONSOLE EASTER EGG
    // ============================
    console.log('%c🚀 NextReach', 'font-size: 40px; font-weight: bold; background: linear-gradient(135deg, #3b82f6, #60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
    console.log('%cLooking for talented developers! 💼', 'font-size: 16px; color: #3b82f6;');
    console.log('%cEmail: nextreachtech379@gmail.com', 'font-size: 14px; color: #64748b;');

    // ============================
    // 20. ANALYTICS READY (Google Analytics, etc.)
    // ============================
    // Track button clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            // Send to analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'button_click', {
                    'event_category': 'engagement',
                    'event_label': buttonText
                });
            }
            console.log('Button clicked:', buttonText);
        });
    });
});

// ============================
// 21. SERVICE WORKER FOR PWA (Optional)
// ============================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service-worker.js is ready
        // navigator.serviceWorker.register('/service-worker.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

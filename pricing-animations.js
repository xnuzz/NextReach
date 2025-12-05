// Enhanced Pricing Page Animations
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });

    // Parallax effect on hero section
    const hero = document.querySelector('.pricing-hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.pricing-hero-content');
            if (heroContent && scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight);
            }
        });
    }

    // Pricing card interactive tilt effect
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // CTA button ripple effect
    document.querySelectorAll('.pricing-cta, .cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Price counter animation
    document.querySelectorAll('.pricing-amount, .price').forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = element.textContent;
                    const numbers = text.match(/\d+/g);
                    if (numbers) {
                        const targetNumber = parseInt(numbers[0]);
                        let currentNumber = 0;
                        const increment = targetNumber / 50;
                        const duration = 1000;
                        const stepTime = duration / 50;
                        
                        const counter = setInterval(() => {
                            currentNumber += increment;
                            if (currentNumber >= targetNumber) {
                                currentNumber = targetNumber;
                                clearInterval(counter);
                            }
                            element.textContent = text.replace(/\d+/, Math.floor(currentNumber));
                        }, stepTime);
                    }
                    observer.unobserve(element);
                }
            });
        });
        observer.observe(element);
    });

    // Floating animation for featured badge
    const featuredBadges = document.querySelectorAll('.featured-badge, .pricing-badge');
    featuredBadges.forEach((badge, index) => {
        badge.style.animation = `badgeFloat 3s ease-in-out infinite`;
        badge.style.animationDelay = `${index * 0.2}s`;
    });

    // Smooth scroll for CTA buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover sound effect (optional, muted by default)
    const addHoverSound = (selector) => {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjF+zPDTgjMGHm7A7+OZSBAJT6fn77BfGgc+ltzy0n8pBCR3yO/bk0IKFV6z6OyqVhQKRp/g8L5uIgUxf8zv04IzBh5uwO/jmUgQCU+n5++wXxoHPpbc8tJ/KQQkd8jv25NCChVes+jsqlYUCkaf4PC+biIFMX/M79OCMwYebsDv45lIEAlPp+fvsF8aBz6W3PLSfykEJHfI79uTQgoVXrPo7KpWFApGn+DwvG4iBTF/zO/TgjMGHm7A7+OZSBAJT6fn77BfGgc+ltzy0n8pBCR3yO/bk0IKFV6z6OyqVhQKRp/g8L5uIgUxf8zv04IzBh5uwO/jmUgQCU+n5++wXxoHPpbc8tJ/KQQkd8jv25NCChVes+jsqlYUCkaf4PC+biIFMX/M79OCMwYebsDv45lIEAlPp+fvsF8aBz6W3PLSfykEJHfI79uTQgoVXrPo7KpWFApGn+DwvG4iBTF/zO/TgjMGHm7A7+OZSBAJT6fn77BfGgc+ltzy0n8pBCR3yO/bk0IKFV6z6OyqVhQKRp/g8L5uIgUxf8zv04IzBh5uwO/jmUgQCU+n5++wXxoHPpbc8tJ/KQQkd8jv25NCChVes+jsqlYUCkaf4PC+biIFMX/M79OCMwYebsDv45lIEAlPp+fvsF8aBz6W3PLSfykEJHfI79uTQgoVXrPo7KpWFApGn+DwvG4iBTF/zO/TgjMGHm7A7+OZSBAJT6fn77BfGgc+ltzy0n8pBCR3yO/bk0IKFV6z6OyqVhQKRp/g8L5uIgUxf8zv04IzBh5uwO/jmUgQCU+n5++wXxoHPpbc8tJ/KQQkd8jv25NCChVes+jsqlYUCkaf4PC+biIFMX/M79OCMwYebsDv45lIEAlPp+fvsF8aBz6W3PLSfykEJHfI79uTQgoVXrPo7KpWFApGn+DwvG4iBTF/zO/TgjMGHm7A7+OZSBAJT6fn77BfGgc+ltzy0n8pBCR3yO/bk0IKFV6z6OyqVhQKRp/g8L5uIgUxf8zv04IzBh5uwO/jmUgQCU+n5++wXxoH');
        document.querySelectorAll(selector).forEach(el => {
            el.addEventListener('mouseenter', () => {
                // Muted by default - can be enabled by user preference
                // audio.volume = 0.1;
                // audio.play().catch(() => {}); // Ignore autoplay errors
            });
        });
    };
});

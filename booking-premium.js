/* ============================================
   BOOKING PAGE - PREMIUM FUNCTIONALITY
   ============================================ */

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Sticky Navigation
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initialize booking page features
    initBookingFeatures();
    initCalendlyTracking();
    initScrollAnimations();
    initContactButtons();
});

/* ============================================
   BOOKING FEATURES
   ============================================ */

function initBookingFeatures() {
    // Add smooth scroll to sections
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Animate hero features on load
    animateHeroFeatures();
    
    // Initialize countdown timer
    initCountdownEffect();
}

/* ============================================
   HERO ANIMATIONS
   ============================================ */

function animateHeroFeatures() {
    const features = document.querySelectorAll('.hero-features .feature');
    
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                feature.style.transition = 'all 0.5s ease-out';
                feature.style.opacity = '1';
                feature.style.transform = 'translateY(0)';
            }, 50);
        }, 400 + (index * 100));
    });
}

/* ============================================
   CALENDLY TRACKING
   ============================================ */

function initCalendlyTracking() {
    // Listen for Calendly events
    window.addEventListener('message', function(e) {
        if (e.data.event && e.data.event.indexOf('calendly') === 0) {
            handleCalendlyEvent(e.data.event);
        }
    });
}

function handleCalendlyEvent(event) {
    console.log('Calendly Event:', event);
    
    // Track different Calendly events
    switch(event) {
        case 'calendly.event_scheduled':
            onEventScheduled();
            break;
        case 'calendly.date_and_time_selected':
            onDateTimeSelected();
            break;
        case 'calendly.event_type_viewed':
            onEventTypeViewed();
            break;
    }
}

function onEventScheduled() {
    console.log('Event scheduled successfully!');
    
    // Show success message
    showSuccessNotification('🎉 Booking Confirmed! Check your email for details.');
    
    // Optional: Send confirmation to your backend
    sendBookingConfirmation();
    
    // Optional: Redirect to thank you page after delay
    setTimeout(() => {
        // window.location.href = 'booking-confirmation.html';
    }, 3000);
}

function onDateTimeSelected() {
    console.log('Date and time selected');
    // You can track this for analytics
}

function onEventTypeViewed() {
    console.log('Event type viewed');
    // Track initial engagement
}

/* ============================================
   NOTIFICATIONS
   ============================================ */

function showSuccessNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

/* ============================================
   BACKEND INTEGRATION
   ============================================ */

function sendBookingConfirmation() {
    // Send confirmation to your backend
    fetch('/api/booking-confirmation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            timestamp: new Date().toISOString(),
            source: 'calendly'
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Confirmation sent:', data);
    })
    .catch(error => {
        console.error('Error sending confirmation:', error);
    });
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe info cards
    const cards = document.querySelectorAll('.info-card, .testimonial-card, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 1rem;
        font-weight: 600;
    }
    
    .notification-content i {
        font-size: 1.5rem;
    }
`;
document.head.appendChild(style);

/* ============================================
   COUNTDOWN EFFECT
   ============================================ */

function initCountdownEffect() {
    const countdownElement = document.querySelector('.countdown span');
    if (!countdownElement) return;

    const messages = [
        'Limited slots available',
        'Book now - slots filling fast!',
        'Only 3 spots left today',
        'Schedule your call now'
    ];

    let currentIndex = 0;

    setInterval(() => {
        countdownElement.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % messages.length;
            countdownElement.textContent = messages[currentIndex];
            countdownElement.style.opacity = '1';
        }, 300);
    }, 4000);
}

/* ============================================
   CONTACT BUTTONS
   ============================================ */

function initContactButtons() {
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track contact button clicks
            const type = this.querySelector('i').classList.contains('fa-envelope') ? 'email' : 'phone';
            console.log(`Contact button clicked: ${type}`);
            
            // Add ripple effect
            addRippleEffect(this, e);
        });
    });
}

function addRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

/* ============================================
   CALENDLY LOADING STATE
   ============================================ */

// Add loading indicator for Calendly widget
window.addEventListener('load', function() {
    const calendarContainer = document.querySelector('.calendar-container');
    const calendlyWidget = document.querySelector('.calendly-inline-widget');
    
    if (calendlyWidget) {
        // Add loading state
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'calendly-loading';
        loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading calendar...</p>
        `;
        loadingDiv.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 1;
        `;
        
        if (calendarContainer) {
            calendarContainer.style.position = 'relative';
            calendarContainer.appendChild(loadingDiv);
            
            // Remove loading state after Calendly loads
            setTimeout(() => {
                loadingDiv.style.opacity = '0';
                loadingDiv.style.transition = 'opacity 0.5s';
                setTimeout(() => loadingDiv.remove(), 500);
            }, 2000);
        }
    }
});

// Loading spinner CSS
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(59, 130, 246, 0.1);
        border-top-color: #3b82f6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 15px;
    }
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
    
    .calendly-loading p {
        color: #6b7280;
        font-size: 1rem;
        font-weight: 500;
    }
`;
document.head.appendChild(loadingStyle);

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

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

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   ANALYTICS & TRACKING
   ============================================ */

function trackPageView() {
    console.log('Booking page viewed');
    // Add your analytics tracking here (Google Analytics, Mixpanel, etc.)
}

function trackCalendarEngagement() {
    console.log('User engaged with calendar');
    // Track calendar interactions
}

// Track page view on load
document.addEventListener('DOMContentLoaded', trackPageView);

/* ============================================
   SCROLL TO TOP BUTTON
   ============================================ */

// Add scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.pointerEvents = 'auto';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.pointerEvents = 'none';
    }
}, 200));

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.05)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
});

console.log('✅ Booking page loaded successfully');
console.log('📅 Calendly widget integrated');
console.log('🎯 All features initialized');

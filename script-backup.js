// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Check user authentication on page load
function checkUserAuth() {
    const sessionToken = localStorage.getItem('sessionToken');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    const navLoginBtn = document.getElementById('navLoginBtn');
    const navUserMenu = document.getElementById('navUserMenu');
    
    if (sessionToken && user) {
        // User is logged in
        if (navLoginBtn) navLoginBtn.style.display = 'none';
        if (navUserMenu) {
            navUserMenu.style.display = 'block';
            document.getElementById('navUserName').textContent = user.name.split(' ')[0];
            document.getElementById('navDropdownName').textContent = user.name;
            document.getElementById('navDropdownEmail').textContent = user.email;
        }
    } else {
        // User is logged out
        if (navLoginBtn) navLoginBtn.style.display = 'flex';
        if (navUserMenu) navUserMenu.style.display = 'none';
    }
}

// Toggle user dropdown
function toggleNavUserDropdown() {
    const navUserMenu = document.getElementById('navUserMenu');
    if (navUserMenu) {
        navUserMenu.classList.toggle('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const navUserMenu = document.getElementById('navUserMenu');
    const navUserBtn = document.querySelector('.nav-user-btn');
    
    if (navUserMenu && navUserBtn && !navUserMenu.contains(e.target)) {
        navUserMenu.classList.remove('active');
    }
});

// Logout function
async function navLogout(event) {
    event.preventDefault();
    
    try {
        const sessionToken = localStorage.getItem('sessionToken');
        if (sessionToken) {
            await fetch('http://localhost:3001/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${sessionToken}`
                }
            });
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
    
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('user');
    checkUserAuth();
    
    // Show notification
    showNotification('Logged out successfully!', 'success');
}

// Mobile menu toggle
function toggleMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

if (hamburger && navMenu) {
    hamburger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Check auth on page load
document.addEventListener('DOMContentLoaded', checkUserAuth);

// Enhanced navbar scroll effect with parallax
let lastScrollY = 0;
let ticking = false;

function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const heroLogo = document.querySelector('.hero-logo');
    const heroSection = document.querySelector('.hero');
    
    if (navbar) {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Add slight hide/show effect for better UX
        if (scrollY > lastScrollY && scrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Subtle parallax effect for hero logo
        if (heroLogo) {
            if (scrollY < window.innerHeight) {
                const parallaxSpeed = scrollY * 0.3;
                heroLogo.style.transform = `translateY(${parallaxSpeed}px) scale(${1 - scrollY * 0.0002})`;
            } else {
                // Reset transform when past hero section
                heroLogo.style.transform = '';
            }
        }
    }
    
    lastScrollY = scrollY;
    ticking = false;
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#dc2626' : type === 'success' ? '#16a34a' : 'var(--primary-color)'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Smooth scrolling for navigation links
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

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Testimonials Slider
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    if (testimonials.length === 0) return;
    
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (n >= testimonials.length) currentSlide = 0;
    if (n < 0) currentSlide = testimonials.length - 1;
    
    if (testimonials[currentSlide]) {
        testimonials[currentSlide].classList.add('active');
    }
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-play testimonials
if (testimonials.length > 0) {
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
}

// Registration Form Multi-Step Functionality
class RegistrationForm {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.form = document.getElementById('registrationForm');
        this.steps = document.querySelectorAll('.form-step');
        this.nextBtn = document.querySelector('.next-btn');
        this.prevBtn = document.querySelector('.prev-btn');
        this.submitBtn = document.querySelector('.submit-btn');
        this.progressFill = document.querySelector('.progress-fill');
        this.progressText = document.querySelector('.progress-text');
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextStep());
        }
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevStep());
        }
        this.form.addEventListener('submit', (e) => this.submitForm(e));
        
        // Add real-time validation
        this.addValidationListeners();
        
        // Phone number formatting
        this.addPhoneFormatting();
        
        // Package card interaction enhancement
        this.enhancePackageCards();
    }
    
    nextStep() {
        if (this.validateCurrentStep()) {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateStep();
            }
        }
    }
    
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStep();
        }
    }
    
    updateStep() {
        // Hide all steps
        this.steps.forEach(step => step.classList.remove('active'));
        
        // Show current step
        const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
        
        // Update progress bar
        const progress = (this.currentStep / this.totalSteps) * 100;
        if (this.progressFill) {
            this.progressFill.style.width = `${progress}%`;
        }
        if (this.progressText) {
            this.progressText.textContent = `Step ${this.currentStep} of ${this.totalSteps}`;
        }
        
        // Update navigation buttons
        if (this.prevBtn) {
            this.prevBtn.style.display = this.currentStep === 1 ? 'none' : 'inline-block';
        }
        if (this.nextBtn) {
            this.nextBtn.style.display = this.currentStep === this.totalSteps ? 'none' : 'inline-block';
        }
        if (this.submitBtn) {
            this.submitBtn.style.display = this.currentStep === this.totalSteps ? 'inline-block' : 'none';
        }
        
        // Scroll to form
        this.form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    validateCurrentStep() {
        const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
        if (!currentStepElement) return false;
        
        const requiredInputs = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            this.clearError(input);
            
            if (!this.validateInput(input)) {
                this.showError(input, this.getErrorMessage(input));
                isValid = false;
            }
        });
        
        // Additional validation for step 3 (goals)
        if (this.currentStep === 3) {
            const goals = currentStepElement.querySelectorAll('input[name="goals"]:checked');
            if (goals.length === 0) {
                const goalsGroup = currentStepElement.querySelector('.checkbox-group');
                if (goalsGroup) {
                    this.showError(goalsGroup, 'Please select at least one goal');
                    isValid = false;
                }
            }
        }
        
        return isValid;
    }
    
    validateInput(input) {
        const value = input.value.trim();
        
        switch (input.type) {
            case 'email':
                return this.validateEmail(value);
            case 'tel':
                return this.validatePhone(value);
            case 'radio':
                return input.checked || document.querySelector(`input[name="${input.name}"]:checked`);
            case 'checkbox':
                if (input.name === 'terms') {
                    return input.checked;
                }
                return true;
            case 'url':
                return !value || this.validateURL(value);
            default:
                return value.length > 0;
        }
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    validatePhone(phone) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    validateURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
    
    getErrorMessage(input) {
        const fieldName = input.previousElementSibling?.textContent?.replace(' *', '') || 'This field';
        
        switch (input.type) {
            case 'email':
                return 'Please enter a valid email address';
            case 'tel':
                return 'Please enter a valid phone number';
            case 'url':
                return 'Please enter a valid website URL';
            case 'radio':
                return 'Please select an option';
            case 'checkbox':
                if (input.name === 'terms') {
                    return 'You must agree to the terms and conditions';
                }
                return 'Please make a selection';
            default:
                return `${fieldName} is required`;
        }
    }
    
    showError(element, message) {
        const formGroup = element.closest('.form-group') || element.closest('.checkbox-group') || element.parentElement;
        if (!formGroup) return;
        
        formGroup.classList.add('error');
        
        // Remove existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }
    
    clearError(element) {
        const formGroup = element.closest('.form-group') || element.closest('.checkbox-group') || element.parentElement;
        if (!formGroup) return;
        
        formGroup.classList.remove('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    addValidationListeners() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required')) {
                    this.clearError(input);
                    if (!this.validateInput(input)) {
                        this.showError(input, this.getErrorMessage(input));
                    }
                }
            });
            
            input.addEventListener('input', () => {
                this.clearError(input);
            });
        });
    }
    
    addPhoneFormatting() {
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                } else if (value.length >= 3) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                }
                e.target.value = value;
            });
        }
    }
    
    enhancePackageCards() {
        // Add smooth interaction for package cards
        const packageCards = document.querySelectorAll('.package-card');
        packageCards.forEach(card => {
            const input = card.querySelector('input[type="radio"]');
            const cardInner = card.querySelector('.package-card-inner');
            
            if (input && cardInner) {
                // Handle card click
                card.addEventListener('click', (e) => {
                    // Don't trigger if clicking on inner elements
                    if (e.target === card || e.target === cardInner) {
                        input.checked = true;
                        input.dispatchEvent(new Event('change'));
                    }
                });
                
                // Handle radio change
                input.addEventListener('change', () => {
                    // Remove selected class from all cards
                    document.querySelectorAll('.package-card').forEach(c => {
                        c.classList.remove('selected');
                    });
                    
                    // Add selected class to current card
                    if (input.checked) {
                        card.classList.add('selected');
                    }
                });
                
                // Initialize selected state
                if (input.checked) {
                    card.classList.add('selected');
                }
            }
        });
    }
    
    submitForm(e) {
        e.preventDefault();
        
        if (!this.validateCurrentStep()) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.submitBtn;
        if (!submitBtn) return;
        
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        // Handle multiple checkbox values
        const goals = Array.from(this.form.querySelectorAll('input[name="goals"]:checked'))
            .map(cb => cb.value);
        data.goals = goals;
        
        // Simulate API call
        setTimeout(() => {
            this.showSuccessMessage();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Navigate to booking page after showing success message
            setTimeout(() => {
                this.navigateToBooking();
            }, 2000);
        }, 2000);
        
        // Log form data (replace with actual API call)
        console.log('Registration Data:', data);
    }
    
    showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message show';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <strong>Registration Successful!</strong>
            <p>Thank you for your interest! We'll get back to you within 24 hours with a personalized proposal.</p>
        `;
        
        this.form.insertBefore(successDiv, this.form.firstChild);
    }
    
    navigateToBooking() {
        // Hide all main sections
        const sections = ['home', 'packages', 'about', 'portfolio', 'reviews', 'register', 'contact'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) section.style.display = 'none';
        });
        
        // Show booking section
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
            bookingSection.style.display = 'block';
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Reset form after navigation
        setTimeout(() => {
            this.resetForm();
        }, 500);
    }
    
    resetForm() {
        this.form.reset();
        this.currentStep = 1;
        this.updateStep();
        
        // Clear all errors
        this.form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        this.form.querySelectorAll('.error-message').forEach(el => el.remove());
        this.form.querySelectorAll('.success-message').forEach(el => el.remove());
        
        // Reset labels
        this.form.querySelectorAll('.form-group label').forEach(label => {
            label.style.top = '1rem';
            label.style.fontSize = '1rem';
            label.style.color = 'var(--text-light)';
        });
    }
}

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (!submitButton) return;
        
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Reset form labels
            document.querySelectorAll('.contact-form .form-group label').forEach(label => {
                label.style.top = '1rem';
                label.style.fontSize = '1rem';
                label.style.color = 'var(--text-light)';
            });
        }, 2000);
    });
}

// Form field animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        const label = this.nextElementSibling;
        if (label && label.tagName === 'LABEL') {
            label.style.top = '-0.5rem';
            label.style.left = '0.75rem';
            label.style.fontSize = '0.875rem';
            label.style.color = 'var(--primary-color)';
            label.style.background = 'var(--white)';
            label.style.padding = '0 0.25rem';
        }
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            const label = this.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.top = '1rem';
                label.style.left = '1rem';
                label.style.fontSize = '1rem';
                label.style.color = 'var(--text-light)';
                label.style.background = 'transparent';
                label.style.padding = '0';
            }
        }
    });
});

// Modal functions for terms and privacy
function openTermsModal() {
    alert('Terms of Service modal would open here. This is a demo - implement your actual terms.');
}

function openPrivacyModal() {
    alert('Privacy Policy modal would open here. This is a demo - implement your actual privacy policy.');
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .testimonial, .contact-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        if (isNaN(target)) return;
        
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.includes('+') ? target + '+' : 
                                    counter.textContent.includes('%') ? target + '%' : target;
                clearInterval(timer);
            } else {
                const value = Math.floor(current);
                counter.textContent = counter.textContent.includes('+') ? value + '+' : 
                                    counter.textContent.includes('%') ? value + '%' : value;
            }
        }, 20);
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on escape
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Add focus styles for accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Initialize registration form
    new RegistrationForm();
    
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--primary-color)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});

// Performance optimization: Lazy load images when implemented
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Comment System
class CommentSystem {
    constructor() {
        this.comments = JSON.parse(localStorage.getItem('nextreach_comments')) || [];
        this.currentRating = 0;
        this.init();
    }

    init() {
        this.setupStarRating();
        this.setupCommentForm();
        this.displayComments();
        this.updateRatingSummary();
        this.addClearReviewsOption();
    }

    // Clear all stored reviews (for testing)
    clearAllReviews() {
        if (confirm('Are you sure you want to clear all reviews? This cannot be undone.')) {
            localStorage.removeItem('nextreach_comments');
            this.comments = [];
            this.displayComments();
            this.updateRatingSummary();
            this.showMessage('All reviews have been cleared!', 'success');
        }
    }

    addClearReviewsOption() {
        // Add a hidden clear button (double-click on rating summary to activate)
        const ratingSummary = document.querySelector('.rating-summary');
        if (ratingSummary) {
            ratingSummary.addEventListener('dblclick', () => {
                this.clearAllReviews();
            });
            ratingSummary.title = 'Double-click to clear all reviews (for testing)';
        }
    }

    setupStarRating() {
        const stars = document.querySelectorAll('.star-rating .star');
        const ratingDescription = document.getElementById('ratingDescription');
        const ratingDescriptions = {
            0: 'Select a rating',
            1: 'Poor - Very dissatisfied',
            2: 'Fair - Below expectations', 
            3: 'Good - Meets expectations',
            4: 'Very Good - Exceeds expectations',
            5: 'Excellent - Outstanding service'
        };
        
        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', () => {
                this.highlightStars(index + 1);
                if (ratingDescription) {
                    ratingDescription.textContent = ratingDescriptions[index + 1];
                    ratingDescription.className = 'rating-description active';
                }
            });
            
            star.addEventListener('mouseleave', () => {
                this.highlightStars(this.currentRating);
                if (ratingDescription) {
                    ratingDescription.textContent = ratingDescriptions[this.currentRating];
                    ratingDescription.className = this.currentRating > 0 ? 'rating-description selected' : 'rating-description';
                }
            });
            
            star.addEventListener('click', () => {
                this.currentRating = index + 1;
                this.highlightStars(this.currentRating);
                if (ratingDescription) {
                    ratingDescription.textContent = ratingDescriptions[this.currentRating];
                    ratingDescription.className = 'rating-description selected';
                }
                
                // Add a satisfying click effect
                star.style.animation = 'none';
                setTimeout(() => {
                    star.style.animation = 'starPop 0.3s ease-out';
                }, 10);
            });
        });
    }

    highlightStars(rating) {
        const stars = document.querySelectorAll('.star-rating .star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    setupCommentForm() {
        const form = document.getElementById('commentForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitComment();
            });
        }
    }

    submitComment() {
        const nameInput = document.getElementById('commentName');
        const companyInput = document.getElementById('commentCompany');
        const textInput = document.getElementById('commentText');
        const submitBtn = document.querySelector('.submit-comment-btn');

        if (!nameInput || !textInput || !submitBtn) return;

        const name = nameInput.value.trim();
        const company = companyInput ? companyInput.value.trim() : '';
        const text = textInput.value.trim();

        if (!name || !text || this.currentRating === 0) {
            this.showMessage('Please fill in all required fields and select a rating.', 'error');
            this.shakeForm();
            return;
        }

        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Submitting...';

        // Simulate API call delay for better UX
        setTimeout(() => {
            const comment = {
                id: Date.now(),
                name: name,
                company: company,
                text: text,
                rating: this.currentRating,
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            };

            this.comments.push(comment);
            this.saveComments();
            this.displayComments();
            this.updateRatingSummary();
            this.resetForm();
            
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<i class="fas fa-rocket"></i> Submit Review';
            
            this.showMessage('üéâ Thank you for your amazing review!', 'success');
            this.celebrateSuccess();

            // Scroll to the new comment
            setTimeout(() => {
                const newComment = document.querySelector('.comment-item:first-child');
                if (newComment) {
                    newComment.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    newComment.style.animation = 'none';
                    setTimeout(() => {
                        newComment.style.animation = 'highlightNew 2s ease-out';
                    }, 100);
                }
            }, 500);
        }, 1200);
    }

    resetForm() {
        const form = document.getElementById('commentForm');
        const ratingDescription = document.getElementById('ratingDescription');
        
        if (form) {
            form.reset();
        }
        
        this.currentRating = 0;
        this.highlightStars(0);
        
        if (ratingDescription) {
            ratingDescription.textContent = 'Select a rating';
            ratingDescription.className = 'rating-description';
        }
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.comment-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `comment-message ${type}`;
        messageDiv.textContent = message;
        
        // Add some basic styling
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
        `;

        document.body.appendChild(messageDiv);

        // Remove message after 3 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }, 3000);
    }

    displayComments() {
        const commentsList = document.getElementById('commentsList');
        const emptyComments = document.getElementById('emptyComments');
        
        if (!commentsList || !emptyComments) return;

        if (this.comments.length === 0) {
            commentsList.style.display = 'none';
            emptyComments.style.display = 'block';
            return;
        }

        commentsList.style.display = 'block';
        emptyComments.style.display = 'none';

        // Sort comments by date (newest first)
        const sortedComments = [...this.comments].sort((a, b) => b.id - a.id);

        commentsList.innerHTML = sortedComments.map(comment => `
            <div class="comment-item">
                <div class="comment-header">
                    <div class="comment-author">
                        <div class="comment-name">${this.escapeHtml(comment.name)}</div>
                        ${comment.company ? `<div class="comment-company">${this.escapeHtml(comment.company)}</div>` : ''}
                    </div>
                    <div class="comment-rating">
                        ${this.generateStarRating(comment.rating)}
                    </div>
                </div>
                <div class="comment-text">"${this.escapeHtml(comment.text)}"</div>
                <div class="comment-date">${comment.date}</div>
            </div>
        `).join('');
    }

    generateStarRating(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star" style="color: #d1d5db;"></i>';
            }
        }
        return stars;
    }

    updateRatingSummary() {
        const totalReviewsElement = document.getElementById('totalReviews');
        if (!totalReviewsElement) return;

        totalReviewsElement.textContent = this.comments.length;

        if (this.comments.length > 0) {
            const averageRating = this.comments.reduce((sum, comment) => sum + comment.rating, 0) / this.comments.length;
            const ratingNumberElement = document.querySelector('.rating-number');
            if (ratingNumberElement) {
                ratingNumberElement.textContent = averageRating.toFixed(1);
            }

            // Update stars in summary
            const summaryStars = document.querySelector('.rating-summary .stars');
            if (summaryStars) {
                summaryStars.innerHTML = this.generateStarRating(Math.round(averageRating));
            }
        }
    }

    saveComments() {
        localStorage.setItem('nextreach_comments', JSON.stringify(this.comments));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    shakeForm() {
        const form = document.querySelector('.add-comment-form');
        if (form) {
            form.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                form.style.animation = '';
            }, 500);
        }
    }

    celebrateSuccess() {
        // Create celebration confetti effect
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createConfetti();
            }, i * 100);
        }
    }

    createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}vw;
            width: 10px;
            height: 10px;
            background: ${['#4A90E2', '#FBBF24', '#8B5CF6', '#10B981'][Math.floor(Math.random() * 4)]};
            border-radius: 50%;
            z-index: 10001;
            pointer-events: none;
            animation: confettiFall 3s ease-out forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 3000);
    }
}

// Initialize comment system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CommentSystem();
});

// Add CSS animations for messages
const messageStyles = document.createElement('style');
messageStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(messageStyles);

// Booking Page Navigation
function closeBooking() {
    // Hide booking section
    const bookingSection = document.getElementById('booking');
    if (bookingSection) bookingSection.style.display = 'none';
    
    // Show all main sections
    const sections = ['home', 'packages', 'about', 'portfolio', 'reviews', 'register', 'contact'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) section.style.display = 'block';
    });
    
    // Reset booking page state
    const preBookingForm = document.getElementById('preBookingForm');
    const mainCalendar = document.getElementById('mainBookingCalendar');
    if (preBookingForm) preBookingForm.style.display = 'block';
    if (mainCalendar) mainCalendar.style.display = 'none';
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openBookingPage(event) {
    if (event) event.preventDefault();
    
    console.log('Opening booking page...');
    
    // Hide all main sections
    const sections = ['home', 'packages', 'about', 'portfolio', 'reviews', 'register', 'contact'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) section.style.display = 'none';
    });
    
    // Show booking section
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        bookingSection.style.display = 'block';
        
        // Ensure pre-booking form is shown and calendar is hidden
        const preBookingForm = document.getElementById('preBookingForm');
        const mainCalendar = document.getElementById('mainBookingCalendar');
        
        if (preBookingForm) {
            preBookingForm.style.display = 'block';
            console.log('Pre-booking form shown');
        }
        
        if (mainCalendar) {
            mainCalendar.style.display = 'none';
            console.log('Calendar hidden');
        }
        
        // Reset form to step 1
        currentPreBookingStep = 1;
        
        // Make sure first step is visible
        setTimeout(() => {
            updatePreBookingSteps();
            
            // Focus first input for better UX
            const firstInput = document.getElementById('pb-name');
            if (firstInput) {
                firstInput.focus();
                console.log('Focused first input');
            }
        }, 100);
    }
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Pre-Booking Form Multi-Step Logic
let currentPreBookingStep = 1;
let preBookingData = {};

function nextPreBookingStep() {
    const currentStep = document.querySelector(`.form-step[data-step="${currentPreBookingStep}"]`);
    const inputs = currentStep.querySelectorAll('input[required], select[required]');
    
    // Validate current step
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
            
            // Remove error styling after user starts typing
            input.addEventListener('input', function() {
                this.style.borderColor = '#e2e8f0';
            }, { once: true });
        }
    });
    
    if (!isValid) {
        // Shake animation for error
        currentStep.style.animation = 'shake 0.5s';
        setTimeout(() => {
            currentStep.style.animation = '';
        }, 500);
        return;
    }
    
    // Save current step data
    savePreBookingStepData();
    
    // Move to next step
    if (currentPreBookingStep < 3) {
        currentPreBookingStep++;
        updatePreBookingSteps();
    }
}

function prevPreBookingStep() {
    if (currentPreBookingStep > 1) {
        currentPreBookingStep--;
        updatePreBookingSteps();
    }
}

function updatePreBookingSteps() {
    // Update form steps visibility
    document.querySelectorAll('.form-step').forEach((step, index) => {
        step.classList.remove('active');
        if (index + 1 === currentPreBookingStep) {
            step.classList.add('active');
        }
    });
    
    // Update step indicators
    document.querySelectorAll('.step-dot').forEach((dot, index) => {
        dot.classList.remove('active');
        if (index + 1 === currentPreBookingStep) {
            dot.classList.add('active');
        }
    });
}

function savePreBookingStepData() {
    const currentStep = document.querySelector(`.form-step[data-step="${currentPreBookingStep}"]`);
    const inputs = currentStep.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            if (!preBookingData.goals) preBookingData.goals = [];
            if (input.checked && !preBookingData.goals.includes(input.value)) {
                preBookingData.goals.push(input.value);
            }
        } else {
            preBookingData[input.name] = input.value;
        }
    });
}

// Pre-Booking Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const preBookingForm = document.getElementById('preBookingFormElement');
    
    if (preBookingForm) {
        preBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Save final step data
            savePreBookingStepData();
            
            // Show loading state
            const submitBtn = this.querySelector('.btn-submit-prebooking');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate API call to save lead data
            setTimeout(() => {
                console.log('Pre-booking data:', preBookingData);
                
                // Show calendar with personalized welcome
                showPersonalizedCalendar();
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});

function showPersonalizedCalendar() {
    // Hide pre-booking form
    const preBookingForm = document.getElementById('preBookingForm');
    if (preBookingForm) {
        preBookingForm.style.display = 'none';
    }
    
    // Show calendar
    const mainCalendar = document.getElementById('mainBookingCalendar');
    if (mainCalendar) {
        mainCalendar.style.display = 'grid';
    }
    
    // Personalize welcome message
    const welcomeName = document.getElementById('welcomeName');
    const welcomeCompany = document.getElementById('welcomeCompany');
    const welcomeGoals = document.getElementById('welcomeGoals');
    
    if (welcomeName && preBookingData.name) {
        welcomeName.textContent = preBookingData.name.split(' ')[0]; // First name
    }
    
    if (welcomeCompany && preBookingData.company) {
        welcomeCompany.textContent = preBookingData.company;
    }
    
    if (welcomeGoals && preBookingData.goals && preBookingData.goals.length > 0) {
        welcomeGoals.innerHTML = preBookingData.goals.map(goal => {
            const goalLabels = {
                'increase-leads': 'üìà Increase Leads',
                'brand-awareness': 'üéØ Brand Awareness',
                'website-traffic': 'üöÄ Website Traffic',
                'social-media': 'üì± Social Media Growth',
                'sales': 'üí∞ Boost Sales',
                'seo': 'üîç SEO Ranking'
            };
            return `<span class="goal-badge">${goalLabels[goal] || goal}</span>`;
        }).join('');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Store lead data (you can send to your backend here)
    localStorage.setItem('latestLead', JSON.stringify(preBookingData));
}

// Skip to Calendar - Direct Booking without Form
function skipToCalendar() {
    // Hide pre-booking form
    const preBookingForm = document.getElementById('preBookingForm');
    if (preBookingForm) {
        preBookingForm.style.display = 'none';
    }
    
    // Show calendar without personalized welcome
    const mainCalendar = document.getElementById('mainBookingCalendar');
    if (mainCalendar) {
        mainCalendar.style.display = 'grid';
    }
    
    // Hide personalized welcome (since no form data)
    const personalizedWelcome = document.getElementById('personalizedWelcome');
    if (personalizedWelcome) {
        personalizedWelcome.style.display = 'none';
    }
    
    // Smooth scroll to calendar
    setTimeout(() => {
        window.scrollTo({ top: 400, behavior: 'smooth' });
    }, 100);
    
    // Track direct booking
    console.log('User skipped form - direct booking');
}

// Scroll to Calendly - Direct scroll to calendar widget
function scrollToCalendly() {
    // Hide pre-booking form
    const preBookingForm = document.getElementById('preBookingForm');
    if (preBookingForm) {
        preBookingForm.style.display = 'none';
    }
    
    // Show calendar
    const mainCalendar = document.getElementById('mainBookingCalendar');
    if (mainCalendar) {
        mainCalendar.style.display = 'grid';
    }
    
    // Hide personalized welcome (no form data)
    const personalizedWelcome = document.getElementById('personalizedWelcome');
    if (personalizedWelcome) {
        personalizedWelcome.style.display = 'none';
    }
    
    // Smooth scroll to Calendly widget
    setTimeout(() => {
        const calendlySection = document.getElementById('mainBookingCalendar');
        if (calendlySection) {
            calendlySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
    
    // Track direct Calendly booking
    console.log('User clicked quick action - scrolling to Calendly');
}

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.ceil(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(current);
        }
    }, 16);
}

// Initialize counters when booking page is visible
function initializeCounters() {
    const counters = document.querySelectorAll('.count-up');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        animateCounter(counter, target, 2000);
    });
}

// Run counters when booking page opens
document.addEventListener('DOMContentLoaded', () => {
    // Observer to trigger animation when booking section is visible
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initializeCounters();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(bookingSection);
    }
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

/* ========================================
   Cookie Consent Management
   ======================================== */

// Check if user has already consented
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        setTimeout(() => {
            const cookieBanner = document.getElementById('cookieConsent');
            if (cookieBanner) {
                cookieBanner.classList.add('show');
            }
        }, 2000); // Show after 2 seconds
    } else {
        applyCookiePreferences(JSON.parse(consent));
    }
}

// Accept all cookies
function acceptCookies() {
    const consent = {
        essential: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    hideCookieBanner();
    applyCookiePreferences(consent);
    showNotification('Cookie preferences saved!', 'success');
}

// Decline cookies
function declineCookies() {
    const consent = {
        essential: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    hideCookieBanner();
    applyCookiePreferences(consent);
    showNotification('Only essential cookies will be used.', 'info');
}

// Show cookie settings modal
function showCookieSettings() {
    const modal = document.getElementById('cookieSettings');
    if (modal) {
        modal.classList.add('show');
        
        // Load current preferences
        const consent = JSON.parse(localStorage.getItem('cookieConsent') || '{}');
        document.getElementById('cookieAnalytics').checked = consent.analytics || false;
        document.getElementById('cookieMarketing').checked = consent.marketing || false;
    }
}

// Close cookie settings modal
function closeCookieSettings() {
    const modal = document.getElementById('cookieSettings');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Save custom cookie preferences
function saveCustomCookies() {
    const consent = {
        essential: true,
        analytics: document.getElementById('cookieAnalytics').checked,
        marketing: document.getElementById('cookieMarketing').checked,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    closeCookieSettings();
    hideCookieBanner();
    applyCookiePreferences(consent);
    showNotification('Cookie preferences saved!', 'success');
}

// Hide cookie banner
function hideCookieBanner() {
    const cookieBanner = document.getElementById('cookieConsent');
    if (cookieBanner) {
        cookieBanner.classList.remove('show');
    }
}

// Apply cookie preferences
function applyCookiePreferences(consent) {
    if (consent.analytics) {
        // Enable analytics tracking (Google Analytics, etc.)
        console.log('Analytics cookies enabled');
    }
    if (consent.marketing) {
        // Enable marketing cookies (Facebook Pixel, etc.)
        console.log('Marketing cookies enabled');
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('cookieSettings');
    if (modal && e.target === modal) {
        closeCookieSettings();
    }
});

// Check cookie consent on page load
document.addEventListener('DOMContentLoaded', checkCookieConsent); 
 / /   = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =  
 / /   A I   C h a t   W i d g e t   S y s t e m  
 / /   = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =  
  
 c l a s s   A I C h a t   {  
         c o n s t r u c t o r ( )   {  
                 t h i s . a p i U r l   =   ' h t t p : / / l o c a l h o s t : 3 0 0 0 / a p i / c h a t ' ;  
                 t h i s . m e s s a g e s   =   [ ] ;  
                 t h i s . i s O p e n   =   f a l s e ;  
                 t h i s . c h a t W i d g e t   =   n u l l ;  
                 t h i s . m e s s a g e s C o n t a i n e r   =   n u l l ;  
                 t h i s . i n i t i a l i z e d   =   f a l s e ;  
         }  
  
         i n i t ( )   {  
                 i f   ( t h i s . i n i t i a l i z e d )   r e t u r n ;  
                  
                 t h i s . c h a t W i d g e t   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' c h a t W i d g e t ' ) ;  
                 t h i s . m e s s a g e s C o n t a i n e r   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' c h a t M e s s a g e s ' ) ;  
                  
                 i f   ( ! t h i s . c h a t W i d g e t   | |   ! t h i s . m e s s a g e s C o n t a i n e r )   {  
                         c o n s o l e . e r r o r ( ' C h a t   w i d g e t   e l e m e n t s   n o t   f o u n d ' ) ;  
                         r e t u r n ;  
                 }  
                  
                 t h i s . i n i t i a l i z e d   =   t r u e ;  
                  
                 / /   A d d   w e l c o m e   m e s s a g e   i f   n o   m e s s a g e s  
                 i f   ( t h i s . m e s s a g e s . l e n g t h   = = =   0 )   {  
                         t h i s . a d d M e s s a g e ( {  
                                 t y p e :   ' b o t ' ,  
                                 c o n t e n t :   `  x 9   H i !   I ' m   N e x t R e a c h   A I   A s s i s t a n t .   I   c a n   h e l p   y o u   w i t h :  
  
 ‚ ¨ ¢   L e a r n   a b o u t   o u r   s e r v i c e s   a n d   p r i c i n g  
 ‚ ¨ ¢   M a r k e t i n g   s t r a t e g i e s   f o r   y o u r   b u s i n e s s  
 ‚ ¨ ¢   W e b   d e v e l o p m e n t   q u e s t i o n s  
 ‚ ¨ ¢   S o c i a l   m e d i a   t i p s  
 ‚ ¨ ¢   S E O   o p t i m i z a t i o n   a d v i c e  
  
 W h a t   c a n   I   h e l p   y o u   w i t h   t o d a y ? `  
                         } ) ;  
                 }  
         }  
  
         t o g g l e C h a t ( )   {  
                 i f   ( ! t h i s . i n i t i a l i z e d )   {  
                         t h i s . i n i t ( ) ;  
                 }  
                  
                 t h i s . i s O p e n   =   ! t h i s . i s O p e n ;  
                  
                 i f   ( t h i s . c h a t W i d g e t )   {  
                         i f   ( t h i s . i s O p e n )   {  
                                 t h i s . c h a t W i d g e t . c l a s s L i s t . a d d ( ' a c t i v e ' ) ;  
                         }   e l s e   {  
                                 t h i s . c h a t W i d g e t . c l a s s L i s t . r e m o v e ( ' a c t i v e ' ) ;  
                         }  
                 }  
         }  
  
         a s y n c   s e n d M e s s a g e ( m e s s a g e )   {  
                 i f   ( ! m e s s a g e   | |   ! m e s s a g e . t r i m ( ) )   r e t u r n ;  
  
                 / /   A d d   u s e r   m e s s a g e  
                 t h i s . a d d M e s s a g e ( {  
                         t y p e :   ' u s e r ' ,  
                         c o n t e n t :   m e s s a g e  
                 } ) ;  
  
                 / /   C l e a r   i n p u t  
                 c o n s t   c h a t I n p u t   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' c h a t I n p u t ' ) ;  
                 i f   ( c h a t I n p u t )   {  
                         c h a t I n p u t . v a l u e   =   ' ' ;  
                 }  
  
                 / /   S h o w   t y p i n g   i n d i c a t o r  
                 t h i s . s h o w T y p i n g ( ) ;  
  
                 t r y   {  
                         / /   G e t   A I   r e s p o n s e  
                         c o n s t   r e s p o n s e   =   a w a i t   t h i s . g e t D e e p S e e k R e s p o n s e ( m e s s a g e ) ;  
                          
                         / /   H i d e   t y p i n g   i n d i c a t o r  
                         t h i s . h i d e T y p i n g ( ) ;  
                          
                         / /   A d d   b o t   r e s p o n s e  
                         t h i s . a d d M e s s a g e ( {  
                                 t y p e :   ' b o t ' ,  
                                 c o n t e n t :   r e s p o n s e  
                         } ) ;  
                 }   c a t c h   ( e r r o r )   {  
                         c o n s o l e . e r r o r ( ' E r r o r   g e t t i n g   A I   r e s p o n s e : ' ,   e r r o r ) ;  
                         t h i s . h i d e T y p i n g ( ) ;  
                         t h i s . a d d M e s s a g e ( {  
                                 t y p e :   ' b o t ' ,  
                                 c o n t e n t :   ' S o r r y ,   I   e n c o u n t e r e d   a n   e r r o r .   P l e a s e   t r y   a g a i n   l a t e r . '  
                         } ) ;  
                 }  
         }  
  
         a s y n c   g e t D e e p S e e k R e s p o n s e ( u s e r M e s s a g e )   {  
                 t r y   {  
                         c o n s t   r e s p o n s e   =   a w a i t   f e t c h ( t h i s . a p i U r l ,   {  
                                 m e t h o d :   ' P O S T ' ,  
                                 h e a d e r s :   {  
                                         ' C o n t e n t - T y p e ' :   ' a p p l i c a t i o n / j s o n '  
                                 } ,  
                                 b o d y :   J S O N . s t r i n g i f y ( {  
                                         m e s s a g e :   u s e r M e s s a g e ,  
                                         c o n v e r s a t i o n H i s t o r y :   t h i s . m e s s a g e s . s l i c e ( - 6 )  
                                 } )  
                         } ) ;  
  
                         i f   ( ! r e s p o n s e . o k )   {  
                                 t h r o w   n e w   E r r o r ( ` H T T P   e r r o r !   s t a t u s :   $ { r e s p o n s e . s t a t u s } ` ) ;  
                         }  
  
                         c o n s t   d a t a   =   a w a i t   r e s p o n s e . j s o n ( ) ;  
                         r e t u r n   d a t a . r e s p o n s e   | |   t h i s . g e t I n t e l l i g e n t R e s p o n s e ( u s e r M e s s a g e ) ;  
                 }   c a t c h   ( e r r o r )   {  
                         c o n s o l e . e r r o r ( ' D e e p S e e k   A P I   e r r o r : ' ,   e r r o r ) ;  
                         r e t u r n   t h i s . g e t I n t e l l i g e n t R e s p o n s e ( u s e r M e s s a g e ) ;  
                 }  
         }  
  
         g e t I n t e l l i g e n t R e s p o n s e ( m e s s a g e )   {  
                 c o n s t   l o w e r M e s s a g e   =   m e s s a g e . t o L o w e r C a s e ( ) ;  
                  
                 / /   P r i c i n g   r e l a t e d  
                 i f   ( l o w e r M e s s a g e . i n c l u d e s ( ' p r i c e ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' c o s t ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' p r i c i n g ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' p l a n ' ) )   {  
                         r e t u r n   ` G r e a t   q u e s t i o n   a b o u t   o u r   p r i c i n g !    x ∞  
  
 W e   o f f e r   f l e x i b l e   p l a n s   t o   s u i t   b u s i n e s s e s   o f   a l l   s i z e s :  
  
 * * S t a r t e r   P l a n * *   -   P e r f e c t   f o r   s m a l l   b u s i n e s s e s  
 ‚ ¨ ¢   S o c i a l   m e d i a   m a n a g e m e n t  
 ‚ ¨ ¢   B a s i c   w e b   d e v e l o p m e n t  
 ‚ ¨ ¢   E m a i l   m a r k e t i n g  
 ‚ ¨ ¢   S t a r t i n g   f r o m   $ 4 9 9 / m o n t h  
  
 * * G r o w t h   P l a n * *   -   F o r   e x p a n d i n g   b u s i n e s s e s  
 ‚ ¨ ¢   E v e r y t h i n g   i n   S t a r t e r  
 ‚ ¨ ¢   A d v a n c e d   S E O   o p t i m i z a t i o n  
 ‚ ¨ ¢   C o n t e n t   m a r k e t i n g   s t r a t e g y  
 ‚ ¨ ¢   C u s t o m   w e b   a p p l i c a t i o n s  
 ‚ ¨ ¢   S t a r t i n g   f r o m   $ 9 9 9 / m o n t h  
  
 * * E n t e r p r i s e   P l a n * *   -   F o r   e s t a b l i s h e d   c o m p a n i e s  
 ‚ ¨ ¢   E v e r y t h i n g   i n   G r o w t h  
 ‚ ¨ ¢   D e d i c a t e d   a c c o u n t   m a n a g e r  
 ‚ ¨ ¢   P r i o r i t y   s u p p o r t  
 ‚ ¨ ¢   C u s t o m   s o l u t i o n s  
 ‚ ¨ ¢   C o n t a c t   u s   f o r   p r i c i n g  
  
 W o u l d   y o u   l i k e   t o   s c h e d u l e   a   f r e e   c o n s u l t a t i o n   t o   d i s c u s s   w h i c h   p l a n   w o r k s   b e s t   f o r   y o u ? ` ;  
                 }  
  
                 / /   M a r k e t i n g   r e l a t e d  
                 i f   ( l o w e r M e s s a g e . i n c l u d e s ( ' m a r k e t ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' a d v e r t i s ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' p r o m o t ' ) )   {  
                         r e t u r n   ` I   c a n   h e l p   y o u   w i t h   m a r k e t i n g !    x ∆ 
  
 N e x t R e a c h   s p e c i a l i z e s   i n :  
  
 * * D i g i t a l   M a r k e t i n g   S e r v i c e s : * *  
 ‚ ¨ ¢   S o c i a l   m e d i a   m a r k e t i n g   &   m a n a g e m e n t  
 ‚ ¨ ¢   C o n t e n t   c r e a t i o n   &   s t r a t e g y  
 ‚ ¨ ¢   E m a i l   m a r k e t i n g   c a m p a i g n s  
 ‚ ¨ ¢   P P C   a d v e r t i s i n g   ( G o o g l e   A d s ,   F a c e b o o k   A d s )  
 ‚ ¨ ¢   I n f l u e n c e r   m a r k e t i n g  
 ‚ ¨ ¢   B r a n d   d e v e l o p m e n t  
  
 * * K e y   B e n e f i t s : * *  
 ‚ S®   D a t a - d r i v e n   s t r a t e g i e s  
 ‚ S®   R O I - f o c u s e d   c a m p a i g n s  
 ‚ S®   M u l t i - c h a n n e l   a p p r o a c h  
 ‚ S®   R e g u l a r   p e r f o r m a n c e   r e p o r t s  
  
 O u r   m a r k e t i n g   e x p e r t s   c a n   c r e a t e   a   c u s t o m i z e d   s t r a t e g y   f o r   y o u r   b u s i n e s s .   W o u l d   y o u   l i k e   t o   l e a r n   m o r e   a b o u t   a   s p e c i f i c   s e r v i c e ? ` ;  
                 }  
  
                 / /   W e b   d e v e l o p m e n t   r e l a t e d  
                 i f   ( l o w e r M e s s a g e . i n c l u d e s ( ' w e b ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' w e b s i t e ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' d e v e l o p ' ) )   {  
                         r e t u r n   ` L e t   m e   t e l l   y o u   a b o u t   o u r   w e b   d e v e l o p m e n t   s e r v i c e s !    x ª  
  
 * * W h a t   W e   B u i l d : * *  
 ‚ ¨ ¢   C u s t o m   b u s i n e s s   w e b s i t e s  
 ‚ ¨ ¢   E - c o m m e r c e   p l a t f o r m s  
 ‚ ¨ ¢   W e b   a p p l i c a t i o n s  
 ‚ ¨ ¢   L a n d i n g   p a g e s  
 ‚ ¨ ¢   P r o g r e s s i v e   W e b   A p p s   ( P W A s )  
  
 * * O u r   T e c h   S t a c k : * *  
 ‚ ¨ ¢   M o d e r n   f r a m e w o r k s   ( R e a c t ,   N e x t . j s ,   V u e )  
 ‚ ¨ ¢   R e s p o n s i v e   d e s i g n   ( m o b i l e - f i r s t )  
 ‚ ¨ ¢   S E O - o p t i m i z e d   c o d e  
 ‚ ¨ ¢   F a s t   l o a d i n g   s p e e d s  
 ‚ ¨ ¢   S e c u r e   &   s c a l a b l e   a r c h i t e c t u r e  
  
 * * P r o c e s s : * *  
 1 .   D i s c o v e r y   &   p l a n n i n g  
 2 .   D e s i g n   m o c k u p s  
 3 .   D e v e l o p m e n t  
 4 .   T e s t i n g   &   Q A  
 5 .   L a u n c h   &   s u p p o r t  
  
 A v e r a g e   p r o j e c t   t i m e l i n e :   4 - 8   w e e k s  
  
 W o u l d   y o u   l i k e   t o   d i s c u s s   y o u r   w e b   d e v e l o p m e n t   p r o j e c t ? ` ;  
                 }  
  
                 / /   S o c i a l   m e d i a   r e l a t e d  
                 i f   ( l o w e r M e s s a g e . i n c l u d e s ( ' s o c i a l ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' i n s t a g r a m ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' f a c e b o o k ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' t w i t t e r ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' l i n k e d i n ' ) )   {  
                         r e t u r n   ` S o c i a l   m e d i a   i s   o u r   s p e c i a l t y !    x ±  
  
 * * S o c i a l   M e d i a   M a n a g e m e n t   S e r v i c e s : * *  
 ‚ ¨ ¢   C o n t e n t   c r e a t i o n   &   s c h e d u l i n g  
 ‚ ¨ ¢   C o m m u n i t y   m a n a g e m e n t  
 ‚ ¨ ¢   E n g a g e m e n t   o p t i m i z a t i o n  
 ‚ ¨ ¢   A n a l y t i c s   &   r e p o r t i n g  
 ‚ ¨ ¢   P a i d   s o c i a l   a d v e r t i s i n g  
 ‚ ¨ ¢   I n f l u e n c e r   p a r t n e r s h i p s  
  
 * * P l a t f o r m s   W e   M a n a g e : * *  
 ‚ S   I n s t a g r a m  
 ‚ S   F a c e b o o k  
 ‚ S   L i n k e d I n  
 ‚ S   T w i t t e r / X  
 ‚ S   T i k T o k  
 ‚ S   P i n t e r e s t  
  
 * * W h a t   Y o u   G e t : * *  
  x `  M o n t h l y   c o n t e n t   c a l e n d a r  
  x}®   P r o f e s s i o n a l   g r a p h i c s   &   v i d e o s  
  x ¨   2 4 / 7   c o m m u n i t y   m o n i t o r i n g  
  x ∆  G r o w t h   s t r a t e g y  
  x ±   S t o r i e s   &   R e e l s   c r e a t i o n  
  
 W e   c a n   h e l p   g r o w   y o u r   s o c i a l   m e d i a   p r e s e n c e   a n d   e n g a g e m e n t .   W a n t   t o   s e e   s o m e   c a s e   s t u d i e s ? ` ;  
                 }  
  
                 / /   S E O   r e l a t e d  
                 i f   ( l o w e r M e s s a g e . i n c l u d e s ( ' s e o ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' s e a r c h ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' r a n k i n g ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' g o o g l e ' ) )   {  
                         r e t u r n   ` L e t   m e   e x p l a i n   o u r   S E O   s e r v i c e s !    x ç  
  
 * * S E O   O p t i m i z a t i o n   S e r v i c e s : * *  
 ‚ ¨ ¢   K e y w o r d   r e s e a r c h   &   s t r a t e g y  
 ‚ ¨ ¢   O n - p a g e   o p t i m i z a t i o n  
 ‚ ¨ ¢   T e c h n i c a l   S E O   a u d i t s  
 ‚ ¨ ¢   L i n k   b u i l d i n g   c a m p a i g n s  
 ‚ ¨ ¢   L o c a l   S E O   o p t i m i z a t i o n  
 ‚ ¨ ¢   C o n t e n t   o p t i m i z a t i o n  
  
 * * W h a t   W e   I m p r o v e : * *  
  x ∆  S e a r c h   e n g i n e   r a n k i n g s  
  x}Ø   O r g a n i c   t r a f f i c  
  x ∞   C o n v e r s i o n   r a t e s  
  xRç   O n l i n e   v i s i b i l i t y  
  x ±   M o b i l e   p e r f o r m a n c e  
  
 * * O u r   A p p r o a c h : * *  
 1 .   C o m p r e h e n s i v e   s i t e   a u d i t  
 2 .   C o m p e t i t o r   a n a l y s i s  
 3 .   C u s t o m   S E O   s t r a t e g y  
 4 .   I m p l e m e n t a t i o n   &   o p t i m i z a t i o n  
 5 .   M o n t h l y   r e p o r t i n g   &   a d j u s t m e n t s  
  
 * * R e s u l t s : * *  
 M o s t   c l i e n t s   s e e   i m p r o v e m e n t s   w i t h i n   3 - 6   m o n t h s ,   w i t h   s i g n i f i c a n t   r a n k i n g   b o o s t s   i n   6 - 1 2   m o n t h s .  
  
 W a n t   t o   s c h e d u l e   a   f r e e   S E O   a u d i t   f o r   y o u r   w e b s i t e ? ` ;  
                 }  
  
                 / /   C o n t a c t / b o o k i n g   r e l a t e d  
                 i f   ( l o w e r M e s s a g e . i n c l u d e s ( ' c o n t a c t ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' c a l l ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' m e e t ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' c o n s u l t a t i o n ' ) )   {  
                         r e t u r n   ` I ' d   l o v e   t o   h e l p   y o u   g e t   i n   t o u c h !    x ~ 
  
 * * C o n t a c t   O p t i o n s : * *  
  
  x ß   * * E m a i l : * *   h e l l o @ n e x t r e a c h . c o m  
  x ±   * * P h o n e : * *   ( 5 5 5 )   1 2 3 - 4 5 6 7  
  x ¨   * * L i v e   C h a t : * *   R i g h t   h e r e !  
  
 * * S c h e d u l e   a   F r e e   C o n s u l t a t i o n : * *  
 C l i c k   t h e   " B o o k   a   C a l l "   b u t t o n   t o   s c h e d u l e   a   3 0 - m i n u t e   c o n s u l t a t i o n   w i t h   o u r   t e a m .   W e ' l l   d i s c u s s :  
 ‚ ¨ ¢   Y o u r   b u s i n e s s   g o a l s  
 ‚ ¨ ¢   C u r r e n t   c h a l l e n g e s  
 ‚ ¨ ¢   H o w   N e x t R e a c h   c a n   h e l p  
 ‚ ¨ ¢   C u s t o m   s t r a t e g y   r e c o m m e n d a t i o n  
  
 * * O f f i c e   H o u r s : * *  
 M o n d a y   -   F r i d a y :   9   A M   -   6   P M   E S T  
 S a t u r d a y :   1 0   A M   -   4   P M   E S T  
 S u n d a y :   C l o s e d  
  
 W o u l d   y o u   l i k e   m e   t o   h e l p   y o u   b o o k   a   c o n s u l t a t i o n   n o w ? ` ;  
                 }  
  
                 / /   S e r v i c e s   o v e r v i e w  
                 i f   ( l o w e r M e s s a g e . i n c l u d e s ( ' s e r v i c e ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' w h a t   d o   y o u ' )   | |   l o w e r M e s s a g e . i n c l u d e s ( ' h e l p ' ) )   {  
                         r e t u r n   ` W e l c o m e   t o   N e x t R e a c h !   H e r e ' s   w h a t   w e   c a n   d o   f o r   y o u :    xa¨  
  
 * * O u r   C o r e   S e r v i c e s : * *  
  
  x}®   * * D i g i t a l   M a r k e t i n g * *  
 ‚ ¨ ¢   S o c i a l   m e d i a   m a n a g e m e n t  
 ‚ ¨ ¢   C o n t e n t   m a r k e t i n g  
 ‚ ¨ ¢   E m a i l   c a m p a i g n s  
 ‚ ¨ ¢   P P C   a d v e r t i s i n g  
  
  x ª   * * W e b   D e v e l o p m e n t * *  
 ‚ ¨ ¢   C u s t o m   w e b s i t e s  
 ‚ ¨ ¢   E - c o m m e r c e   p l a t f o r m s  
 ‚ ¨ ¢   W e b   a p p l i c a t i o n s  
 ‚ ¨ ¢   M a i n t e n a n c e   &   s u p p o r t  
  
  x ±   * * S o c i a l   M e d i a * *  
 ‚ ¨ ¢   C o n t e n t   c r e a t i o n  
 ‚ ¨ ¢   C o m m u n i t y   m a n a g e m e n t  
 ‚ ¨ ¢   I n f l u e n c e r   p a r t n e r s h i p s  
 ‚ ¨ ¢   A n a l y t i c s   &   r e p o r t i n g  
  
  x ç   * * S E O   O p t i m i z a t i o n * *  
 ‚ ¨ ¢   K e y w o r d   r e s e a r c h  
 ‚ ¨ ¢   O n - p a g e   o p t i m i z a t i o n  
 ‚ ¨ ¢   L i n k   b u i l d i n g  
 ‚ ¨ ¢   T e c h n i c a l   S E O  
  
  x `  * * A n a l y t i c s   &   R e p o r t i n g * *  
 ‚ ¨ ¢   P e r f o r m a n c e   t r a c k i n g  
 ‚ ¨ ¢   D a t a - d r i v e n   i n s i g h t s  
 ‚ ¨ ¢   M o n t h l y   r e p o r t s  
 ‚ ¨ ¢   S t r a t e g y   o p t i m i z a t i o n  
  
 W h a t   s e r v i c e   i n t e r e s t s   y o u   m o s t ? ` ;  
                 }  
  
                 / /   D e f a u l t   i n t e l l i g e n t   r e s p o n s e  
                 r e t u r n   ` T h a n k s   f o r   y o u r   m e s s a g e !   I ' m   h e r e   t o   h e l p .    x‹` 
  
 I   c a n   a s s i s t   y o u   w i t h   i n f o r m a t i o n   a b o u t :  
 ‚ ¨ ¢   * * P r i c i n g   &   P l a n s * *   -   O u r   s e r v i c e   p a c k a g e s  
 ‚ ¨ ¢   * * M a r k e t i n g * *   -   D i g i t a l   m a r k e t i n g   s t r a t e g i e s  
 ‚ ¨ ¢   * * W e b   D e v e l o p m e n t * *   -   C u s t o m   w e b s i t e s   &   a p p s  
 ‚ ¨ ¢   * * S o c i a l   M e d i a * *   -   C o n t e n t   &   m a n a g e m e n t  
 ‚ ¨ ¢   * * S E O * *   -   S e a r c h   o p t i m i z a t i o n  
 ‚ ¨ ¢   * * C o n t a c t * *   -   G e t   i n   t o u c h   w i t h   o u r   t e a m  
  
 W h a t   w o u l d   y o u   l i k e   t o   k n o w   m o r e   a b o u t ? ` ;  
         }  
  
         a d d M e s s a g e ( m e s s a g e )   {  
                 t h i s . m e s s a g e s . p u s h ( m e s s a g e ) ;  
                  
                 i f   ( ! t h i s . m e s s a g e s C o n t a i n e r )   r e t u r n ;  
                  
                 c o n s t   m e s s a g e E l   =   d o c u m e n t . c r e a t e E l e m e n t ( ' d i v ' ) ;  
                 m e s s a g e E l . c l a s s N a m e   =   ` m e s s a g e   $ { m e s s a g e . t y p e } - m e s s a g e ` ;  
                  
                 c o n s t   a v a t a r E l   =   d o c u m e n t . c r e a t e E l e m e n t ( ' d i v ' ) ;  
                 a v a t a r E l . c l a s s N a m e   =   ' m e s s a g e - a v a t a r ' ;  
                 a v a t a r E l . i n n e r H T M L   =   m e s s a g e . t y p e   = = =   ' b o t '   ?   ' < i   c l a s s = " f a s   f a - r o b o t " > < / i > '   :   ' < i   c l a s s = " f a s   f a - u s e r " > < / i > ' ;  
                  
                 c o n s t   c o n t e n t E l   =   d o c u m e n t . c r e a t e E l e m e n t ( ' d i v ' ) ;  
                 c o n t e n t E l . c l a s s N a m e   =   ' m e s s a g e - c o n t e n t ' ;  
                 c o n t e n t E l . i n n e r H T M L   =   t h i s . f o r m a t M e s s a g e ( m e s s a g e . c o n t e n t ) ;  
                  
                 m e s s a g e E l . a p p e n d C h i l d ( a v a t a r E l ) ;  
                 m e s s a g e E l . a p p e n d C h i l d ( c o n t e n t E l ) ;  
                  
                 t h i s . m e s s a g e s C o n t a i n e r . a p p e n d C h i l d ( m e s s a g e E l ) ;  
                 t h i s . s c r o l l T o B o t t o m ( ) ;  
         }  
  
         f o r m a t M e s s a g e ( t e x t )   {  
                 / /   C o n v e r t   m a r k d o w n - s t y l e   f o r m a t t i n g   t o   H T M L  
                 l e t   f o r m a t t e d   =   t e x t  
                         . r e p l a c e ( / \ * \ * ( . + ? ) \ * \ * / g ,   ' < s t r o n g > $ 1 < / s t r o n g > ' )  
                         . r e p l a c e ( / \ * ( . + ? ) \ * / g ,   ' < e m > $ 1 < / e m > ' )  
                         . r e p l a c e ( / \ n / g ,   ' < b r > ' )  
                         . r e p l a c e ( / ^ ‚ ¨ ¢   ( . + ) $ / g m ,   ' < l i > $ 1 < / l i > ' ) ;  
                  
                 / /   W r a p   l i s t   i t e m s   i n   u l  
                 i f   ( f o r m a t t e d . i n c l u d e s ( ' < l i > ' ) )   {  
                         f o r m a t t e d   =   f o r m a t t e d . r e p l a c e ( / ( < l i > . + < \ / l i > ) / s ,   ' < u l > $ 1 < / u l > ' ) ;  
                 }  
                  
                 r e t u r n   f o r m a t t e d ;  
         }  
  
         s h o w T y p i n g ( )   {  
                 i f   ( ! t h i s . m e s s a g e s C o n t a i n e r )   r e t u r n ;  
                  
                 c o n s t   t y p i n g E l   =   d o c u m e n t . c r e a t e E l e m e n t ( ' d i v ' ) ;  
                 t y p i n g E l . c l a s s N a m e   =   ' m e s s a g e   b o t - m e s s a g e   t y p i n g - i n d i c a t o r ' ;  
                 t y p i n g E l . i d   =   ' t y p i n g I n d i c a t o r ' ;  
                  
                 c o n s t   a v a t a r E l   =   d o c u m e n t . c r e a t e E l e m e n t ( ' d i v ' ) ;  
                 a v a t a r E l . c l a s s N a m e   =   ' m e s s a g e - a v a t a r ' ;  
                 a v a t a r E l . i n n e r H T M L   =   ' < i   c l a s s = " f a s   f a - r o b o t " > < / i > ' ;  
                  
                 c o n s t   d o t s E l   =   d o c u m e n t . c r e a t e E l e m e n t ( ' d i v ' ) ;  
                 d o t s E l . c l a s s N a m e   =   ' t y p i n g - d o t s ' ;  
                 d o t s E l . i n n e r H T M L   =   ' < s p a n   c l a s s = " t y p i n g - d o t " > < / s p a n > < s p a n   c l a s s = " t y p i n g - d o t " > < / s p a n > < s p a n   c l a s s = " t y p i n g - d o t " > < / s p a n > ' ;  
                  
                 t y p i n g E l . a p p e n d C h i l d ( a v a t a r E l ) ;  
                 t y p i n g E l . a p p e n d C h i l d ( d o t s E l ) ;  
                  
                 t h i s . m e s s a g e s C o n t a i n e r . a p p e n d C h i l d ( t y p i n g E l ) ;  
                 t h i s . s c r o l l T o B o t t o m ( ) ;  
         }  
  
         h i d e T y p i n g ( )   {  
                 c o n s t   t y p i n g I n d i c a t o r   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' t y p i n g I n d i c a t o r ' ) ;  
                 i f   ( t y p i n g I n d i c a t o r )   {  
                         t y p i n g I n d i c a t o r . r e m o v e ( ) ;  
                 }  
         }  
  
         s c r o l l T o B o t t o m ( )   {  
                 i f   ( t h i s . m e s s a g e s C o n t a i n e r )   {  
                         t h i s . m e s s a g e s C o n t a i n e r . s c r o l l T o p   =   t h i s . m e s s a g e s C o n t a i n e r . s c r o l l H e i g h t ;  
                 }  
         }  
 }  
  
 / /   G l o b a l   i n s t a n c e  
 c o n s t   a i C h a t   =   n e w   A I C h a t ( ) ;  
  
 / /   G l o b a l   f u n c t i o n s   f o r   H T M L   o n c l i c k   h a n d l e r s  
 f u n c t i o n   t o g g l e C h a t ( )   {  
         a i C h a t . t o g g l e C h a t ( ) ;  
 }  
  
 f u n c t i o n   s e n d C h a t M e s s a g e ( )   {  
         c o n s t   c h a t I n p u t   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' c h a t I n p u t ' ) ;  
         i f   ( c h a t I n p u t   & &   c h a t I n p u t . v a l u e . t r i m ( ) )   {  
                 a i C h a t . s e n d M e s s a g e ( c h a t I n p u t . v a l u e . t r i m ( ) ) ;  
         }  
 }  
  
 f u n c t i o n   h a n d l e C h a t K e y P r e s s ( e v e n t )   {  
         i f   ( e v e n t . k e y   = = =   ' E n t e r ' )   {  
                 s e n d C h a t M e s s a g e ( ) ;  
         }  
 }  
  
 f u n c t i o n   s e n d Q u i c k M e s s a g e ( m e s s a g e )   {  
         a i C h a t . s e n d M e s s a g e ( m e s s a g e ) ;  
 }  
  
 / /   I n i t i a l i z e   c h a t   w h e n   D O M   i s   r e a d y  
 d o c u m e n t . a d d E v e n t L i s t e n e r ( ' D O M C o n t e n t L o a d e d ' ,   ( )   = >   {  
         a i C h a t . i n i t ( ) ;  
 } ) ;  
 
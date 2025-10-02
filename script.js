// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

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
        
        // Hero section background parallax
        if (heroSection) {
            if (scrollY < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrollY * 0.1}px)`;
            } else {
                // Reset transform when past hero section
                heroSection.style.transform = '';
            }
        }
        
        lastScrollY = scrollY;
    }
    ticking = false;
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
            
            // Reset form after success
            setTimeout(() => {
                this.resetForm();
            }, 3000);
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
            
            this.showMessage('🎉 Thank you for your amazing review!', 'success');
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

// AI Chat System with DeepSeek Integration
class AIChat {
    constructor() {
        this.chatWidget = document.getElementById('aiChatWidget');
        this.chatToggle = document.getElementById('chatToggle');
        this.chatClose = document.getElementById('chatClose');
        this.chatInput = document.getElementById('chatInput');
        this.chatSend = document.getElementById('chatSend');
        this.chatMessages = document.getElementById('chatMessages');
        
        // DeepSeek API configuration - SECURE
        this.apiKey = null; // Will be set securely
        this.apiUrl = '/api/chat'; // Proxy endpoint for security
        this.maxRetries = 1;
        this.timeout = 30000; // 30 seconds for AI processing
        
        // Enhanced AI context - General AI with NextReach expertise
        this.systemPrompt = `You are an AI assistant for NextReach Digital Marketing Agency. You can help with any topic, but specialize in digital marketing, web development, social media, and business growth.

NextReach offers 3 packages:
- BASIC PRESENCE: FREE (originally $1,000) - 1-page website, basic SEO, social media setup
- PROFESSIONAL: $660 (70% OFF) - Multi-page website, social media, 1 video, advanced SEO  
- PREMIUM LAUNCH: $1,400 (65% OFF) - Custom website, all platforms, 3 videos, complete branding

Special: First package FREE to build portfolio. Be helpful and knowledgeable on all topics.`;
        
        this.init();
    }
    
    init() {
        if (!this.chatWidget) return;
        
        // Event listeners
        this.chatToggle?.addEventListener('click', () => this.toggleChat());
        this.chatClose?.addEventListener('click', () => this.closeChat());
        this.chatSend?.addEventListener('click', () => this.sendMessage());
        this.chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.chatInput.value = btn.dataset.question;
                this.sendMessage();
            });
        });
    }
    
    toggleChat() {
        this.chatWidget.classList.toggle('active');
        if (this.chatWidget.classList.contains('active')) {
            this.chatInput.focus();
        }
    }
    
    closeChat() {
        this.chatWidget.classList.remove('active');
    }
    
    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        // Disable input while processing
        this.chatInput.disabled = true;
        this.chatSend.disabled = true;
        
        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        
        // Show typing indicator
        this.showTyping();
        
        try {
            // Call DeepSeek API with your $5 credit
            console.log('🔄 Using DeepSeek AI with paid account...');
            const response = await this.getDeepSeekResponse(message);
            
            this.hideTyping();
            
            // Add response with DeepSeek AI indicator
            this.addMessage(`🤖 ${response}`, 'bot');
            console.log('✅ DeepSeek AI responded successfully!');
            
        } catch (error) {
            console.error('❌ DeepSeek API error:', error);
            this.hideTyping();
            
            // Fallback to intelligent local responses
            const fallbackResponse = this.getIntelligentResponse(message);
            this.addMessage(`🧠 ${fallbackResponse}\n\n*Note: Using local AI while DeepSeek reconnects*`, 'bot');
            console.log('🔄 Using fallback AI response');
        }
        
        // Re-enable input
        this.chatInput.disabled = false;
        this.chatSend.disabled = false;
        this.chatInput.focus();
    }
    
    async getDeepSeekResponse(userMessage) {
        console.log('🚀 Calling DeepSeek API with $5 credit...', { userMessage });
        
        try {
        const requestBody = {
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: this.systemPrompt
                },
                {
                    role: 'user',
                    content: userMessage
                }
            ],
            max_tokens: 1000,
            temperature: 0.7,
            top_p: 0.9
        };
        
        console.log('📤 Request body:', requestBody);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            console.log('⏰ Request timeout after 30 seconds');
            controller.abort();
        }, this.timeout);
        
        let response;
        try {
            response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody),
                signal: controller.signal
            });
            clearTimeout(timeoutId); // Clear timeout on successful response
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
        
        clearTimeout(timeoutId);
        
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ API Error Response:', errorText);
            throw new Error(`DeepSeek API error: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log('✅ DeepSeek API Response received!');
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            const aiResponse = data.choices[0].message.content.trim();
            console.log('🤖 Real AI Response generated!');
            return aiResponse;
        } else {
            console.error('❌ Unexpected API response structure:', data);
            throw new Error('Invalid response structure from DeepSeek API');
        }
        
        } catch (error) {
            console.error('❌ DeepSeek API call failed:', error);
            throw error;
        }
    }
    
    getIntelligentResponse(message) {
        const msg = message.toLowerCase();
        
        // NextReach-specific questions
        if (msg.includes('package') || msg.includes('nextreach') || msg.includes('service') || msg.includes('offer')) {
            return `🚀 NextReach offers 3 comprehensive digital transformation packages:

🎉 **Basic Presence** - FREE (was $1,000)
Complete starter package: website, social media setup, branding, SEO, analytics.

🔥 **Professional Package** - $660 (70% OFF from $2,200) 
Multi-page website, 3 social platforms, content calendar, lead forms, promotional video.

💎 **Premium Launch** - $1,400 (65% OFF from $4,000)
Full transformation: custom website, all social platforms, 3 videos, brand strategy.

The Basic package is completely FREE to help us build our portfolio! Which interests you? 🎉`;
        }
        
        // Pricing questions
        if (msg.includes('price') || msg.includes('cost') || msg.includes('much')) {
            return `💰 NextReach special launch pricing:

🎉 **Basic Presence**: FREE (Limited time!)
🔥 **Professional Package**: $660 (70% OFF)
💎 **Premium Launch**: $1,400 (65% OFF)

The first package is completely FREE - perfect for getting started with zero risk! Ready to claim it? 🚀`;
        }
        
        // Digital marketing questions
        if (msg.includes('digital marketing') || msg.includes('online presence') || msg.includes('website') || msg.includes('social media')) {
            return `🎯 Digital marketing is crucial for modern businesses! A strong online presence includes:

✅ **Professional website** - Your digital storefront
✅ **Social media presence** - Where your customers are
✅ **SEO optimization** - Be found on Google
✅ **Brand consistency** - Professional image across platforms
✅ **Analytics tracking** - Measure and improve performance

This is exactly what NextReach specializes in! Our packages handle everything from websites to social media to promotional videos. The Basic Presence package is FREE right now - perfect way to get started! 

What aspect of digital marketing interests you most? 🚀`;
        }
        
        // Technology questions
        if (msg.includes('ai') || msg.includes('technology') || msg.includes('programming') || msg.includes('code')) {
            return `🤖 I love discussing technology! AI, programming, and modern tech are fascinating fields.

For businesses, technology can be a game-changer - from AI-powered chatbots (like me!) to automated marketing systems, responsive websites, and data analytics.

If you're interested in leveraging technology for your business, NextReach integrates modern tech solutions into all our packages - responsive websites, SEO optimization, analytics tracking, and social media automation.

What specific technology topic would you like to explore? 💻`;
        }
        
        // Business questions
        if (msg.includes('business') || msg.includes('startup') || msg.includes('entrepreneur') || msg.includes('company')) {
            return `� Business strategy is one of my favorite topics! Whether you're starting up or scaling, success often comes down to:

� **Market positioning** - Finding your unique value
🎯 **Customer acquisition** - Reaching the right audience  
� **Brand building** - Creating trust and recognition
📊 **Performance tracking** - Measuring what matters

For modern businesses, digital presence is absolutely critical. NextReach helps businesses establish that professional online presence with complete packages that handle websites, social media, branding, and more.

What aspect of business are you working on? Happy to share insights! 🚀`;
        }
        
        // Specific knowledge questions
        if (msg.includes('quantum') || msg.includes('physics')) {
            return `🔬 Quantum physics is fascinating! It's the study of matter and energy at the smallest scales where particles behave very differently than in our everyday world.

Key concepts:
• **Superposition** - Particles can exist in multiple states simultaneously
• **Entanglement** - Particles can be mysteriously connected across vast distances  
• **Uncertainty Principle** - You can't know both position and momentum precisely
• **Wave-Particle Duality** - Matter exhibits both wave and particle properties

This field has led to technologies like lasers, MRI machines, and is driving quantum computing development!

What aspect of quantum physics interests you most? 🌌`;
        }
        
        if (msg.includes('ai') || msg.includes('artificial intelligence') || msg.includes('machine learning')) {
            return `� Artificial Intelligence is revolutionizing our world! Here's how it works:

**Machine Learning Types:**
• **Supervised Learning** - Learning from labeled examples
• **Unsupervised Learning** - Finding patterns in data without labels
• **Reinforcement Learning** - Learning through trial and reward
• **Deep Learning** - Neural networks with many layers (like this chat!)

**Current Applications:**
• Language models (like me!) for conversation and content
• Computer vision for image recognition and autonomous vehicles
• Recommendation systems for personalized experiences
• Medical diagnosis and drug discovery

AI is transforming businesses too - from automated customer service (like advanced chatbots) to data analytics for better decision making.

Curious about any specific AI application? �`;
        }
        
        if (msg.includes('blockchain') || msg.includes('cryptocurrency') || msg.includes('bitcoin')) {
            return `⛓️ Blockchain is a revolutionary distributed ledger technology! Here's how it works:

**Core Concepts:**
• **Decentralization** - No single point of control
• **Immutability** - Records can't be changed once added
• **Transparency** - All transactions are publicly verifiable
• **Consensus** - Network agrees on transaction validity

**Applications Beyond Crypto:**
• Supply chain tracking for authenticity
• Smart contracts for automated agreements
• Digital identity verification
• Voting systems for transparency
• NFTs for digital ownership

For businesses, blockchain can provide trust and transparency in transactions, which is valuable for building customer confidence - similar to how transparent pricing (like NextReach's clear package structure) builds trust!

What blockchain application interests you most? 💎`;
        }
        
        // General how/what/why questions
        if (msg.includes('how') || msg.includes('what') || msg.includes('why') || msg.includes('explain')) {
            // Try to extract the topic
            if (msg.includes('work') || msg.includes('function')) {
                return `🔧 I'd love to explain how things work! I can break down complex topics into understandable concepts:

**Technology & Science:** How computers, engines, biological systems, chemical processes work
**Business & Economics:** How markets, companies, marketing strategies, financial systems operate  
**Social & Psychological:** How human behavior, learning, motivation, relationships function
**Creative Processes:** How design, writing, problem-solving, innovation happen

The key to understanding "how" anything works is breaking it down into:
1. **Components** - What are the parts?
2. **Interactions** - How do parts work together?
3. **Purpose** - What's the intended outcome?
4. **Context** - What environment does it operate in?

What specific system or process would you like me to explain? Be as specific as possible! 🎯`;
            }
            
            return `🧠 I'd be happy to help explain that! I can provide detailed explanations on:

🔬 **Science & Technology** - Physics, chemistry, biology, computer science, engineering
📊 **Business & Economics** - Market dynamics, business models, financial systems
🎨 **Creative Fields** - Design principles, artistic techniques, creative processes
🌍 **History & Culture** - Historical events, cultural phenomena, social movements
💡 **Problem Solving** - Analytical thinking, decision frameworks, innovation methods

The more specific your question, the more detailed and helpful my explanation can be!

What would you like to understand better? 🎯`;
        }
        
        // Advanced topic analysis for more intelligent responses
        const topics = this.analyzeTopics(message);
        
        if (topics.isGreeting) {
            return `👋 Hello! I'm your advanced AI assistant. I can help you with virtually any topic - from complex scientific concepts to business strategy, creative problem-solving, and of course, NextReach's digital marketing services.

What's on your mind today? I'm here to provide detailed, helpful answers on any subject! 🚀`;
        }
        
        if (topics.isQuestion) {
            return this.generateDetailedAnswer(message, topics);
        }
        
        // Default comprehensive response
        return `🧠 I'm here to help with any topic you'd like to explore! I can provide detailed insights on:

**🔬 Science & Technology:** Physics, chemistry, biology, computer science, AI, engineering
**💼 Business & Strategy:** Marketing, management, economics, entrepreneurship, growth strategies  
**🎨 Creative & Arts:** Design, writing, music, visual arts, creative problem-solving
**📚 Education & Learning:** Academic subjects, study techniques, skill development
**🌍 World Knowledge:** History, geography, culture, current events, social sciences
**💡 Problem Solving:** Analytical thinking, decision-making, innovation methods

Plus I have deep expertise in NextReach's digital marketing services, including our completely FREE Basic Presence package!

What would you like to dive into? Be as specific as you'd like - I love detailed questions! 🎯`;
    }
    
    analyzeTopics(message) {
        const msg = message.toLowerCase();
        
        return {
            isGreeting: msg.match(/^(hi|hello|hey|good\s+(morning|afternoon|evening)|greetings)/),
            isQuestion: msg.includes('?') || msg.match(/^(what|how|why|when|where|who|which|can you|could you|would you|do you|is|are|does)/),
            isScience: msg.match(/(physics|chemistry|biology|quantum|science|scientific|research|experiment|theory)/),
            isTechnology: msg.match(/(ai|artificial intelligence|machine learning|programming|code|software|computer|tech|digital|blockchain|crypto)/),
            isBusiness: msg.match(/(business|marketing|strategy|startup|entrepreneur|company|profit|revenue|growth|sales|customer)/),
            isCreative: msg.match(/(design|art|creative|write|writing|music|visual|aesthetic|brand|logo)/),
            isEducational: msg.match(/(learn|study|education|explain|understand|teach|academic|school|university)/),
            isNextReach: msg.match(/(nextreach|package|pricing|website|social media|digital marketing|online presence)/)
        };
    }
    
    generateDetailedAnswer(message, topics) {
        const msg = message.toLowerCase();
        
        // Science questions
        if (topics.isScience || msg.includes('quantum') || msg.includes('physics')) {
            if (msg.includes('quantum')) {
                return `🌌 **Quantum Physics** is one of the most fascinating areas of science! Here's a comprehensive overview:

**Core Principles:**
• **Superposition** - Particles exist in multiple states simultaneously until measured
• **Entanglement** - Particles become mysteriously connected, instantly affecting each other regardless of distance
• **Uncertainty Principle** - You cannot precisely know both position and momentum of a particle
• **Wave-Particle Duality** - Matter exhibits both wave and particle characteristics

**Real-World Applications:**
• **Quantum Computing** - Using quantum properties for exponentially faster calculations
• **Quantum Cryptography** - Ultra-secure communication using quantum entanglement
• **MRI Machines** - Medical imaging using quantum properties of atoms
• **Lasers** - Precise light emission through quantum energy levels

**Mind-Bending Implications:**
The quantum world challenges our everyday understanding of reality. Einstein famously called entanglement "spooky action at a distance" because he was uncomfortable with its implications!

What specific aspect of quantum physics intrigues you most? 🔬`;
            }
            
            return `🔬 Science is incredible! I can provide detailed explanations on any scientific topic:

**Physics:** From quantum mechanics to relativity, thermodynamics to electromagnetism
**Chemistry:** Molecular interactions, organic/inorganic chemistry, biochemistry
**Biology:** Evolution, genetics, ecology, neuroscience, cellular processes
**Earth Sciences:** Climate, geology, oceanography, atmospheric science

What scientific concept would you like me to explain in detail? 🌟`;
        }
        
        // Technology questions
        if (topics.isTechnology) {
            if (msg.includes('ai') || msg.includes('artificial intelligence')) {
                return `🤖 **Artificial Intelligence** is revolutionizing everything! Let me break it down:

**Types of AI:**
• **Narrow AI** - Specialized for specific tasks (like me, chatbots, image recognition)
• **General AI** - Human-level intelligence across all domains (not yet achieved)
• **Superintelligence** - Beyond human capability (theoretical future possibility)

**How Modern AI Works:**
• **Machine Learning** - Algorithms that improve through experience
• **Neural Networks** - Brain-inspired computing systems with interconnected nodes
• **Deep Learning** - Multi-layered neural networks for complex pattern recognition
• **Natural Language Processing** - Understanding and generating human language

**Current Applications:**
• **Business Automation** - Customer service, data analysis, predictive modeling
• **Creative AI** - Art generation, music composition, writing assistance
• **Healthcare** - Diagnosis assistance, drug discovery, personalized treatment
• **Transportation** - Autonomous vehicles, route optimization, traffic management

**For Businesses:** AI can transform operations through automated customer service (like advanced chatbots), predictive analytics for better decisions, and personalized marketing - areas where digital presence becomes crucial!

What aspect of AI interests you most? 🚀`;
            }
            
            if (msg.includes('blockchain') || msg.includes('crypto')) {
                return `⛓️ **Blockchain Technology** is fascinating! Here's the complete picture:

**How It Works:**
• **Distributed Ledger** - No central authority, data stored across network
• **Cryptographic Hashing** - Each block linked to previous through unique fingerprints
• **Consensus Mechanisms** - Network agrees on transaction validity (Proof of Work, Proof of Stake)
• **Immutability** - Once recorded, extremely difficult to alter

**Beyond Cryptocurrency:**
• **Smart Contracts** - Self-executing contracts with terms directly written into code
• **Supply Chain** - Track products from origin to consumer for authenticity
• **Digital Identity** - Secure, decentralized identity verification
• **Voting Systems** - Transparent, tamper-proof electoral processes
• **Real Estate** - Streamlined property transfers and ownership records

**Business Implications:**
• **Trust Without Intermediaries** - Direct peer-to-peer transactions
• **Transparency** - All participants can verify transactions
• **Cost Reduction** - Eliminates middlemen in many processes
• **Global Accessibility** - 24/7 operations without geographic restrictions

What blockchain application interests you most? 💎`;
            }
            
            return `💻 Technology is shaping our future! I can explain:

**Programming & Software:** Languages, frameworks, development methodologies
**AI & Machine Learning:** Algorithms, neural networks, applications
**Blockchain & Crypto:** Distributed systems, cryptocurrencies, smart contracts
**Cybersecurity:** Protection methods, encryption, privacy technologies
**Cloud Computing:** Infrastructure, services, digital transformation

What technology topic would you like to explore? 🌐`;
        }
        
        // Business questions
        if (topics.isBusiness) {
            if (msg.includes('startup') || msg.includes('entrepreneur')) {
                return `🚀 **Starting a Business** is an exciting journey! Here's a comprehensive roadmap:

**Phase 1: Foundation**
• **Market Research** - Validate your idea, understand customer needs
• **Business Model** - How will you create and capture value?
• **Competitive Analysis** - What's your unique advantage?
• **Financial Planning** - Startup costs, runway, revenue projections

**Phase 2: Launch Preparation**
• **Legal Structure** - LLC, Corporation, Partnership decisions
• **Brand Development** - Name, logo, messaging, visual identity
• **Digital Presence** - Professional website, social media, online credibility
• **Operations Setup** - Systems, processes, tools, partnerships

**Phase 3: Market Entry**
• **Marketing Strategy** - How to reach your first customers cost-effectively
• **Sales Process** - Convert interest into revenue
• **Customer Feedback** - Iterate based on real user experience
• **Growth Metrics** - Track what matters for scaling

**Digital Presence is Critical:** In today's market, customers expect to find you online. A professional digital presence builds trust and credibility from day one.

This is exactly what NextReach specializes in - complete digital transformation packages that handle websites, social media, branding, and marketing materials. Our Basic Presence package is even FREE right now for startups!

What stage of your entrepreneurial journey are you in? 💡`;
            }
            
            if (msg.includes('marketing') || msg.includes('customers')) {
                return `📈 **Modern Marketing** is all about connecting with customers authentically:

**Digital Marketing Foundations:**
• **Content Marketing** - Valuable content that attracts and engages
• **Social Media** - Build community and brand awareness
• **SEO** - Be found when customers search for solutions
• **Email Marketing** - Nurture relationships and drive conversions
• **Paid Advertising** - Targeted campaigns for specific outcomes

**Customer Acquisition Strategy:**
• **Ideal Customer Profile** - Who exactly are you serving?
• **Value Proposition** - Why should they choose you over alternatives?
• **Customer Journey** - Map touchpoints from awareness to purchase
• **Conversion Optimization** - Improve at each stage of the funnel

**Budget-Friendly Approaches:**
• **Organic Social Media** - Consistent, valuable posts build following
• **Local SEO** - Dominate local search results
• **Referral Programs** - Turn customers into advocates
• **Content Creation** - Blog posts, videos, podcasts establish expertise

**Professional Digital Presence:** The foundation of all modern marketing is having a professional online presence that builds trust and showcases your value.

NextReach handles this completely - from websites to social media setup to promotional videos - everything you need to look professional and attract customers online.

What's your biggest marketing challenge right now? 🎯`;
            }
            
            return `💼 Business strategy is my expertise! I can help with:

**Strategy & Planning:** Market analysis, competitive positioning, growth strategies
**Marketing & Sales:** Customer acquisition, digital marketing, conversion optimization  
**Operations:** Process improvement, efficiency, scaling considerations
**Finance:** Business models, pricing strategies, financial planning
**Leadership:** Team building, decision-making, organizational development

What business challenge can I help you tackle? 📊`;
        }
        
        // Default detailed response for questions
        return `🎯 That's a great question! I'd love to provide a detailed answer. 

To give you the most helpful response, could you be a bit more specific about what aspect you're most interested in? The more details you provide, the more comprehensive and useful my answer can be.

For example:
• Are you looking for a basic explanation or advanced details?
• Is this for personal learning, business application, or academic purposes?
• What's your current level of knowledge on this topic?

I'm equipped to handle everything from beginner-friendly explanations to expert-level analysis across virtually any field! 🧠`;
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        // Format the message content
        const formattedText = this.formatMessage(text);
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
            </div>
            <div class="message-content">
                ${formattedText}
            </div>
        `;
        
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    formatMessage(text) {
        // Convert markdown-style formatting to HTML
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }
    
    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    hideTyping() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Initialize AI Chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIChat();
});
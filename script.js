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
        if (heroLogo && scrollY < window.innerHeight) {
            const parallaxSpeed = scrollY * 0.3;
            heroLogo.style.transform = `translateY(${parallaxSpeed}px) scale(${1 - scrollY * 0.0002})`;
        }
        
        // Hero section background parallax
        if (heroSection && scrollY < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrollY * 0.1}px)`;
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
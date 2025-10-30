// Contact Form Handler with Email Integration
// Sends emails to: nextreach374@gmail.com

class ContactFormHandler {
    constructor() {
        this.email = 'nextreach374@gmail.com';
        this.initializeForms();
    }
    
    initializeForms() {
        // Handle all contact forms on the page
        document.querySelectorAll('.contact-form, #contactForm, .booking-form').forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        });
        
        // Track CTA clicks
        document.querySelectorAll('a[href*="pricing"], a[href*="booking"], .cta-button, .btn-primary').forEach(button => {
            button.addEventListener('click', () => {
                this.trackConversion('CTA_Click', button.textContent.trim());
            });
        });
        
        // Track phone clicks
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            link.addEventListener('click', () => {
                this.trackConversion('Phone_Click', link.href);
            });
        });
        
        // Track email clicks
        document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
            link.addEventListener('click', () => {
                this.trackConversion('Email_Click', link.href);
            });
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            // Send via EmailJS (recommended - free tier available)
            await this.sendViaEmailJS(data, form);
            
            // Fallback: Send via FormSpree (alternative)
            // await this.sendViaFormSpree(data);
            
            // Show success message
            this.showSuccess(form);
            
            // Track conversion
            this.trackConversion('Form_Submission', form.id || 'contact_form');
            
            // Reset form
            form.reset();
            
            // Redirect to thank you page (optional)
            setTimeout(() => {
                // window.location.href = 'thank-you.html';
            }, 2000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError(form, 'Something went wrong. Please email us directly at nextreach374@gmail.com');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }
    
    async sendViaEmailJS(data, form) {
        // EmailJS Setup Instructions:
        // 1. Go to emailjs.com and create free account
        // 2. Add email service (Gmail: nextreach374@gmail.com)
        // 3. Create email template
        // 4. Get Service ID, Template ID, and Public Key
        // 5. Replace below values
        
        const serviceID = 'YOUR_SERVICE_ID'; // Replace
        const templateID = 'YOUR_TEMPLATE_ID'; // Replace
        const publicKey = 'YOUR_PUBLIC_KEY'; // Replace
        
        // EmailJS CDN should be loaded in HTML:
        // <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
        
        if (typeof emailjs === 'undefined') {
            console.warn('EmailJS not loaded. Using fallback method.');
            return this.sendViaFormSpree(data);
        }
        
        const templateParams = {
            to_email: 'nextreach374@gmail.com',
            from_name: data.name || `${data.firstName} ${data.lastName}`,
            from_email: data.email,
            phone: data.phone || 'Not provided',
            company: data.company || 'Not provided',
            message: data.message || data.additionalInfo || 'No message',
            service: data.service || 'General Inquiry',
            budget: data.budget || 'Not specified',
            timeline: data.timeline || 'Not specified',
            form_type: form.id || 'contact_form',
            submission_date: new Date().toLocaleString()
        };
        
        return emailjs.send(serviceID, templateID, templateParams, publicKey);
    }
    
    async sendViaFormSpree(data) {
        // FormSpree Setup (Alternative - easier but has limits):
        // 1. Go to formspree.io
        // 2. Create form with email: nextreach374@gmail.com
        // 3. Get form endpoint
        // 4. Replace below
        
        const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace
        
        const response = await fetch(formspreeEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...data,
                _replyto: data.email,
                _subject: `New Lead from NextReach Website - ${data.name || data.email}`,
                _to: 'nextreach374@gmail.com'
            })
        });
        
        if (!response.ok) {
            throw new Error('FormSpree submission failed');
        }
        
        return response.json();
    }
    
    sendViaMailto(data) {
        // Fallback: Open default email client
        const subject = encodeURIComponent('New Inquiry from Website');
        const body = encodeURIComponent(
            `Name: ${data.name || `${data.firstName} ${data.lastName}`}\n` +
            `Email: ${data.email}\n` +
            `Phone: ${data.phone || 'Not provided'}\n` +
            `Company: ${data.company || 'Not provided'}\n` +
            `Service: ${data.service || 'General Inquiry'}\n` +
            `Message:\n${data.message || data.additionalInfo || 'No message'}\n\n` +
            `Submitted: ${new Date().toLocaleString()}`
        );
        
        window.location.href = `mailto:nextreach374@gmail.com?subject=${subject}&body=${body}`;
    }
    
    showSuccess(form) {
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success-message';
        successMsg.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #10b981, #34d399);
                color: white;
                padding: 1.5rem;
                border-radius: 12px;
                text-align: center;
                margin: 1rem 0;
                animation: slideInDown 0.5s ease;
            ">
                <i class="fas fa-check-circle" style="font-size: 2.5rem; margin-bottom: 0.5rem;"></i>
                <h3 style="margin: 0.5rem 0;">Thank You!</h3>
                <p style="margin: 0.5rem 0;">We've received your message and will get back to you within 24 hours.</p>
                <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Check your email for confirmation.</p>
            </div>
        `;
        
        form.parentElement.insertBefore(successMsg, form);
        
        // Remove after 5 seconds
        setTimeout(() => successMsg.remove(), 5000);
    }
    
    showError(form, message) {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'form-error-message';
        errorMsg.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #ef4444, #f87171);
                color: white;
                padding: 1.5rem;
                border-radius: 12px;
                text-align: center;
                margin: 1rem 0;
                animation: shake 0.5s ease;
            ">
                <i class="fas fa-exclamation-circle" style="font-size: 2.5rem; margin-bottom: 0.5rem;"></i>
                <h3 style="margin: 0.5rem 0;">Oops!</h3>
                <p style="margin: 0;">${message}</p>
            </div>
        `;
        
        form.parentElement.insertBefore(errorMsg, form);
        
        // Remove after 5 seconds
        setTimeout(() => errorMsg.remove(), 5000);
    }
    
    trackConversion(event, label) {
        console.log(`📊 Conversion: ${event} - ${label}`);
        
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', event, {
                event_category: 'Conversion',
                event_label: label,
                value: 1
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', event, { label: label });
        }
        
        // Custom tracking
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                event: event,
                eventLabel: label,
                timestamp: new Date().toISOString()
            });
        }
    }
}

// Add animations
if (!document.getElementById('form-animations')) {
    const style = document.createElement('style');
    style.id = 'form-animations';
    style.textContent = `
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.contactFormHandler = new ContactFormHandler();
    });
} else {
    window.contactFormHandler = new ContactFormHandler();
}

console.log('📧 Contact Form Handler initialized - Emails will be sent to: nextreach374@gmail.com');

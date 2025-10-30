// Production Configuration for NextReach SMMA
// Email: nextreach374@gmail.com

const PRODUCTION_CONFIG = {
    // Business Contact Information
    contact: {
        email: 'nextreach374@gmail.com',
        phone: '+359879040107',
        businessName: 'NextReach',
        address: 'Marketing District',
        website: 'https://nextreach.agency'
    },
    
    // Email Service Configuration
    emailService: {
        provider: 'EmailJS', // or 'FormSpree', 'Netlify Forms'
        serviceID: 'YOUR_EMAILJS_SERVICE_ID', // Get from emailjs.com
        templateID: 'YOUR_EMAILJS_TEMPLATE_ID',
        publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
        toEmail: 'nextreach374@gmail.com'
    },
    
    // Analytics Configuration
    analytics: {
        googleAnalyticsID: 'G-XXXXXXXXXX', // Replace with your GA4 ID
        facebookPixelID: 'XXXXXXXXXXXXX',   // Replace with your FB Pixel
        hotjarID: 'XXXXXXX'                 // Replace with Hotjar ID
    },
    
    // Social Media Links
    socialMedia: {
        facebook: 'https://facebook.com/nextreach',
        instagram: 'https://instagram.com/nextreach',
        linkedin: 'https://linkedin.com/company/nextreach',
        twitter: 'https://twitter.com/nextreach',
        youtube: 'https://youtube.com/@nextreach'
    },
    
    // Calendly Integration
    calendly: {
        url: 'https://calendly.com/nextreach374',
        prefill: {
            email: '',
            firstName: '',
            lastName: '',
            name: ''
        }
    },
    
    // Business Hours
    businessHours: {
        timezone: 'Europe/Sofia',
        hours: {
            monday: '9:00 AM - 6:00 PM',
            tuesday: '9:00 AM - 6:00 PM',
            wednesday: '9:00 AM - 6:00 PM',
            thursday: '9:00 AM - 6:00 PM',
            friday: '9:00 AM - 6:00 PM',
            saturday: 'Closed',
            sunday: 'Closed'
        }
    },
    
    // Conversion Tracking Events
    conversionEvents: {
        formSubmit: 'form_submission',
        ctaClick: 'cta_click',
        bookingStarted: 'booking_started',
        bookingCompleted: 'booking_completed',
        pricingViewed: 'pricing_viewed',
        servicesViewed: 'services_viewed',
        portfolioViewed: 'portfolio_viewed',
        phoneClick: 'phone_click',
        emailClick: 'email_click',
        chatOpened: 'chat_opened',
        aiAssistantUsed: 'ai_assistant_used'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PRODUCTION_CONFIG;
}

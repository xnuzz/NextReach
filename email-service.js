// NextReach Email Service
// Uses EmailJS for sending transactional emails (free tier: 200 emails/month)

class EmailService {
    constructor() {
        // Initialize EmailJS
        // Get your keys from https://dashboard.emailjs.com
        this.serviceId = 'service_kombxdc'; // Your EmailJS service ID
        this.publicKey = '2RQkrWzuHEiEue4rC'; // Your EmailJS public key
        
        // Template IDs (create these in EmailJS dashboard)
        this.templates = {
            contactForm: 'YOUR_CONTACT_TEMPLATE_ID',
            bookingConfirmation: 'YOUR_BOOKING_TEMPLATE_ID',
            paymentSuccess: 'YOUR_PAYMENT_TEMPLATE_ID',
            welcomeEmail: 'YOUR_WELCOME_TEMPLATE_ID'
        };
        
        // Initialize if emailjs is available
        if (typeof emailjs !== 'undefined') {
            emailjs.init(this.publicKey);
            console.log('✅ EmailJS initialized');
        } else {
            console.error('❌ EmailJS library not loaded');
        }
    }
    
    /**
     * Send contact form submission
     */
    async sendContactForm(formData) {
        try {
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone || 'Not provided',
                message: formData.message,
                to_email: 'support@nextreach.com', // Your business email
                reply_to: formData.email
            };
            
            const response = await emailjs.send(
                this.serviceId,
                this.templates.contactForm,
                templateParams
            );
            
            console.log('✅ Contact form email sent:', response);
            return { success: true, response };
            
        } catch (error) {
            console.error('❌ Contact form email failed:', error);
            return { success: false, error };
        }
    }
    
    /**
     * Send booking confirmation
     */
    async sendBookingConfirmation(bookingData) {
        try {
            const templateParams = {
                customer_name: bookingData.name,
                customer_email: bookingData.email,
                booking_date: bookingData.date,
                booking_time: bookingData.time,
                service: bookingData.service || 'Strategy Call',
                confirmation_number: this.generateConfirmationNumber(),
                calendar_link: bookingData.calendarLink || '#',
                to_email: bookingData.email
            };
            
            const response = await emailjs.send(
                this.serviceId,
                this.templates.bookingConfirmation,
                templateParams
            );
            
            console.log('✅ Booking confirmation sent:', response);
            return { success: true, response };
            
        } catch (error) {
            console.error('❌ Booking confirmation failed:', error);
            return { success: false, error };
        }
    }
    
    /**
     * Send payment success notification
     */
    async sendPaymentConfirmation(orderData) {
        try {
            const templateParams = {
                customer_name: orderData.customerName,
                customer_email: orderData.customerEmail,
                order_id: orderData.orderId,
                package_name: orderData.packageName,
                amount_paid: `$${orderData.amountPaid.toFixed(2)}`,
                total_amount: `$${orderData.totalAmount.toFixed(2)}`,
                payment_plan: this.formatPaymentPlan(orderData.paymentPlan),
                order_date: new Date().toLocaleDateString(),
                to_email: orderData.customerEmail
            };
            
            const response = await emailjs.send(
                this.serviceId,
                this.templates.paymentSuccess,
                templateParams
            );
            
            console.log('✅ Payment confirmation sent:', response);
            
            // Also notify business
            await this.notifyBusinessNewOrder(orderData);
            
            return { success: true, response };
            
        } catch (error) {
            console.error('❌ Payment confirmation failed:', error);
            return { success: false, error };
        }
    }
    
    /**
     * Send welcome email (after payment)
     */
    async sendWelcomeEmail(customerData) {
        try {
            const templateParams = {
                customer_name: customerData.name,
                customer_email: customerData.email,
                package_name: customerData.package,
                portal_link: 'https://client.nextreach.com', // Your client portal URL
                onboarding_link: 'https://nextreach.com/onboarding',
                support_email: 'support@nextreach.com',
                to_email: customerData.email
            };
            
            const response = await emailjs.send(
                this.serviceId,
                this.templates.welcomeEmail,
                templateParams
            );
            
            console.log('✅ Welcome email sent:', response);
            return { success: true, response };
            
        } catch (error) {
            console.error('❌ Welcome email failed:', error);
            return { success: false, error };
        }
    }
    
    /**
     * Notify business of new order (internal notification)
     */
    async notifyBusinessNewOrder(orderData) {
        try {
            const templateParams = {
                to_email: 'admin@nextreach.com', // Your admin email
                customer_name: orderData.customerName,
                customer_email: orderData.customerEmail,
                customer_phone: orderData.customerPhone,
                package: orderData.packageName,
                amount: `$${orderData.amountPaid.toFixed(2)}`,
                order_id: orderData.orderId,
                timestamp: new Date().toLocaleString()
            };
            
            const response = await emailjs.send(
                this.serviceId,
                'admin_new_order_template', // Create this template in EmailJS
                templateParams
            );
            
            console.log('✅ Business notification sent:', response);
            return { success: true, response };
            
        } catch (error) {
            console.error('❌ Business notification failed:', error);
            return { success: false, error };
        }
    }
    
    /**
     * Send auto-responder for contact form
     */
    async sendAutoResponse(customerEmail, customerName) {
        try {
            const templateParams = {
                to_email: customerEmail,
                customer_name: customerName,
                response_time: '24 hours',
                support_email: 'support@nextreach.com'
            };
            
            const response = await emailjs.send(
                this.serviceId,
                'auto_response_template', // Create this template
                templateParams
            );
            
            console.log('✅ Auto-response sent:', response);
            return { success: true, response };
            
        } catch (error) {
            console.error('❌ Auto-response failed:', error);
            return { success: false, error };
        }
    }
    
    // Helper methods
    
    generateConfirmationNumber() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 7);
        return `NR-${timestamp}-${random}`.toUpperCase();
    }
    
    formatPaymentPlan(plan) {
        const plans = {
            '6month': '6 Monthly Payments',
            '3month': '3 Monthly Payments',
            'full': 'Paid in Full (10% Discount)'
        };
        return plans[plan] || plan;
    }
}

// Initialize email service
const emailService = new EmailService();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailService;
}

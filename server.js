const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');
const emailService = require('./email-service-server');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://js.stripe.com"],
            frameSrc: ["https://js.stripe.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://api.stripe.com"]
        }
    }
}));

// Rate limiting - prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.'
    }
});

// Chat-specific rate limiting
const chatLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 chat requests per minute
    message: {
        error: 'Too many chat requests, please slow down.'
    }
});

app.use(limiter);
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://yourdomain.com', 'https://www.yourdomain.com'] 
        : ['http://localhost:3000', 'http://localhost:5500', 'http://127.0.0.1:5500'],
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Input validation middleware
const validateChatInput = (req, res, next) => {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid messages format' });
    }
    
    // Check message length and content
    for (const message of messages) {
        if (!message.role || !message.content) {
            return res.status(400).json({ error: 'Invalid message structure' });
        }
        
        if (message.content.length > 2000) {
            return res.status(400).json({ error: 'Message too long' });
        }
        
        // Basic content filtering
        const forbidden = ['<script', 'javascript:', 'data:', 'vbscript:', 'onload=', 'onerror='];
        if (forbidden.some(term => message.content.toLowerCase().includes(term))) {
            return res.status(400).json({ error: 'Invalid content detected' });
        }
    }
    
    next();
};

// Secure API proxy endpoint
app.post('/api/chat', chatLimiter, validateChatInput, async (req, res) => {
    try {
        console.log('📥 Received chat request:', JSON.stringify(req.body, null, 2));
        const { messages, max_tokens = 1000, temperature = 0.7 } = req.body;
        
        // Validate API key exists
        if (!process.env.DEEPSEEK_API_KEY) {
            console.error('❌ DeepSeek API key not configured');
            return res.status(500).json({ 
                error: 'AI service temporarily unavailable',
                fallback: true 
            });
        }
        
        console.log('🚀 Proxying request to DeepSeek API...');
        console.log('📤 API Request payload:', JSON.stringify({
            model: 'deepseek-chat',
            messages: messages,
            max_tokens: Math.min(max_tokens, 1500),
            temperature: Math.max(0.1, Math.min(temperature, 1.0))
        }, null, 2));
        
        // Add timeout to server-side request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            console.log('⏰ Server request timeout after 25 seconds');
            controller.abort();
        }, 25000); // 25 seconds server timeout

        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: messages,
                max_tokens: Math.min(max_tokens, 1500), // Cap max tokens
                temperature: Math.max(0.1, Math.min(temperature, 1.0)), // Clamp temperature
                top_p: 0.9
            }),
            signal: controller.signal
        });
        
        clearTimeout(timeoutId); // Clear timeout on response
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ DeepSeek API error:', response.status, response.statusText);
            console.error('❌ Error details:', errorText);
            console.error('❌ Request headers:', response.headers);
            
            return res.status(500).json({ 
                error: 'AI service temporarily unavailable',
                fallback: true 
            });
        }
        
        const data = await response.json();
        console.log('✅ DeepSeek API response received');
        
        // Forward the response
        res.json(data);
        
    } catch (error) {
        console.error('❌ Server error:', error);
        res.status(500).json({ 
            error: 'AI service temporarily unavailable',
            fallback: true 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        secure: true 
    });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        console.log('📨 Contact form submission received');
        console.log('Request body:', req.body);
        
        const { name, email, phone, company, service, budget, message } = req.body;
        
        // Validate inputs
        if (!name || !email || !message) {
            console.log('❌ Validation failed: missing required fields');
            return res.status(400).json({ 
                success: false,
                error: 'Name, email, and message are required' 
            });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('❌ Validation failed: invalid email format');
            return res.status(400).json({ 
                success: false,
                error: 'Invalid email address' 
            });
        }
        
        console.log('📧 Sending contact form emails for:', { name, email, service });
        
        // Send emails (to both admin and customer)
        const results = await emailService.sendContactFormEmails({
            name,
            email,
            phone,
            company,
            service,
            budget,
            message
        });
        
        console.log('✅ Contact form emails sent successfully');
        console.log('Email results:', results);
        
        res.json({ 
            success: true, 
            message: 'Thank you! We\'ll be in touch within 24 hours.' 
        });
        
    } catch (error) {
        console.error('❌ Contact form error:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ 
            success: false,
            error: 'Failed to send message. Please try again or email us directly.' 
        });
    }
});

// Payment endpoint - Create Stripe payment intent
app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, package: packageType, paymentPlan, customerInfo } = req.body;
        
        // Validate inputs
        if (!amount || !packageType || !paymentPlan || !customerInfo) {
            return res.status(400).json({ error: 'Missing required payment information' });
        }
        
        if (!customerInfo.email || !customerInfo.name) {
            return res.status(400).json({ error: 'Customer information incomplete' });
        }
        
        // Validate amount is reasonable (between $100 and $3000)
        if (amount < 10000 || amount > 300000) { // in cents
            return res.status(400).json({ error: 'Invalid payment amount' });
        }
        
        console.log('💳 Creating payment intent for:', {
            amount: amount / 100,
            package: packageType,
            plan: paymentPlan,
            customer: customerInfo.email
        });
        
        // Check if Stripe is configured
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error('❌ Stripe secret key not configured');
            return res.status(500).json({ 
                error: 'Payment processing unavailable. Please contact support.' 
            });
        }
        
        // Create or retrieve customer
        let customer;
        try {
            const customers = await stripe.customers.list({
                email: customerInfo.email,
                limit: 1
            });
            
            if (customers.data.length > 0) {
                customer = customers.data[0];
                console.log('✅ Existing customer found:', customer.id);
            } else {
                customer = await stripe.customers.create({
                    email: customerInfo.email,
                    name: customerInfo.name,
                    phone: customerInfo.phone,
                    metadata: {
                        package: packageType,
                        paymentPlan: paymentPlan
                    }
                });
                console.log('✅ New customer created:', customer.id);
            }
        } catch (error) {
            console.error('❌ Error managing customer:', error);
            return res.status(500).json({ error: 'Customer creation failed' });
        }
        
        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            customer: customer.id,
            description: `NextReach ${packageType} Package - ${paymentPlan}`,
            metadata: {
                package: packageType,
                paymentPlan: paymentPlan,
                customerName: customerInfo.name,
                customerEmail: customerInfo.email,
                customerPhone: customerInfo.phone
            },
            receipt_email: customerInfo.email
        });
        
        console.log('✅ Payment intent created:', paymentIntent.id);
        
        // Send payment confirmation emails automatically
        // (Will be triggered by webhook when payment succeeds)
        
        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
        
    } catch (error) {
        console.error('❌ Payment intent creation error:', error);
        res.status(500).json({ 
            error: error.message || 'Payment processing failed' 
        });
    }
});

// Webhook endpoint for Stripe events (for future payment confirmations)
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        console.warn('⚠️  Stripe webhook secret not configured');
        return res.sendStatus(400);
    }
    
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('❌ Webhook signature verification failed:', err.message);
        return res.sendStatus(400);
    }
    
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('✅ Payment succeeded:', paymentIntent.id);
            
            // Send payment confirmation and welcome emails
            const orderData = {
                orderId: paymentIntent.id,
                customerName: paymentIntent.metadata.customerName,
                customerEmail: paymentIntent.metadata.customerEmail,
                customerPhone: paymentIntent.metadata.customerPhone,
                packageName: paymentIntent.metadata.package + ' Package',
                paymentPlan: paymentIntent.metadata.paymentPlan,
                amountPaid: paymentIntent.amount / 100,
                totalAmount: paymentIntent.amount / 100
            };
            
            // Send payment receipt and notification
            await emailService.sendPaymentEmails(orderData);
            
            // Send welcome email after 30 seconds
            setTimeout(async () => {
                await emailService.sendWelcomeEmail({
                    customerName: orderData.customerName,
                    customerEmail: orderData.customerEmail,
                    packageName: orderData.packageName
                });
            }, 30000);
            
            break;
            
        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            console.error('❌ Payment failed:', failedPayment.id);
            // TODO: Send failure notification
            break;
            
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }
    
    res.sendStatus(200);
});

// Static files middleware (AFTER API routes)
app.use(express.static('.', {
    setHeaders: (res, path) => {
        // Security headers for static files
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
    }
}));

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`🚀 NextReach server running securely on port ${PORT}`);
    console.log(`🔒 Security features enabled`);
    console.log(`🤖 AI proxy endpoint: /api/chat`);
    console.log(`💳 Payment endpoint: /create-payment-intent`);
    console.log(`📧 Contact endpoint: /api/contact`);
    
    if (!process.env.DEEPSEEK_API_KEY) {
        console.warn('⚠️  DEEPSEEK_API_KEY not set - AI features will use fallback');
    } else {
        console.log('✅ DeepSeek API key configured');
    }
    
    if (!process.env.STRIPE_SECRET_KEY) {
        console.warn('⚠️  STRIPE_SECRET_KEY not set - Payment processing unavailable');
    } else {
        console.log('✅ Stripe payment processing configured');
    }
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.warn('⚠️  EMAIL_USER or EMAIL_PASSWORD not set - Email service unavailable');
    } else {
        console.log('✅ Email service configured');
        console.log(`   Email: ${process.env.EMAIL_USER}`);
    }
});
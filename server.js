const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');
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
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"]
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
app.use(express.static('.', {
    setHeaders: (res, path) => {
        // Security headers for static files
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
    }
}));

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
    
    if (!process.env.DEEPSEEK_API_KEY) {
        console.warn('⚠️  DEEPSEEK_API_KEY not set - AI features will use fallback');
    } else {
        console.log('✅ DeepSeek API key configured');
    }
});
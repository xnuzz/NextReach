const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

// Enable CORS for your frontend
app.use(cors());
app.use(express.json());

// DeepSeek API endpoint
app.post('/api/chat', async (req, res) => {
    try {
        console.log('📤 Proxying request to DeepSeek API...');
        
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-6cf8ec9791054fbbbe627532301d154b'
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error('❌ DeepSeek API Error:', data);
            return res.status(response.status).json(data);
        }

        console.log('✅ Success - Sending response to client');
        res.json(data);

    } catch (error) {
        console.error('❌ Proxy Error:', error);
        res.status(500).json({ 
            error: 'Proxy server error', 
            message: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 DeepSeek Proxy Server running on http://localhost:${PORT}`);
    console.log(`📡 Frontend should connect to: http://localhost:${PORT}/api/chat`);
});

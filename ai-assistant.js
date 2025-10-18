// ================================================
// NEXTREACH AI ASSISTANT - PROFESSIONAL JAVASCRIPT
// Enterprise-Grade AI Chat Implementation
// ================================================

class NextReachAI {
    constructor() {
        // DOM Elements
        this.welcomeScreen = document.getElementById('welcomeScreen');
        this.messagesArea = document.getElementById('messagesArea');
        this.messagesContainer = document.getElementById('messagesContainer');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.newChatBtn = document.getElementById('newChatBtn');
        this.exportChatBtn = document.getElementById('exportChatBtn');
        this.themeToggle = document.getElementById('themeToggle');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.sidebar = document.getElementById('aiSidebar');
        
        // AI Configuration - OPTIMIZED FOR BEST PERFORMANCE
        this.apiUrl = '/api/chat';
        this.maxRetries = 3;
        this.timeout = 45000;
        this.currentChatId = this.generateChatId();
        this.temperature = 0.8; // Higher creativity for better responses
        this.maxTokens = 3000; // More comprehensive answers
        
        // Chat State
        this.messages = [];
        this.chatHistory = this.loadChatHistory();
        this.isProcessing = false;
        
        // AI System Prompt
        this.systemPrompt = `You are a professional AI assistant for NextReach Digital Marketing Agency. You can help with:

1. **NextReach Services**: Digital marketing, web development, social media management, SEO
   - Basic Presence: FREE (limited time)
   - Professional Package: $660 (70% OFF)
   - Premium Launch: $1,400 (65% OFF)

2. **General Knowledge**: Technology, business, science, programming, and more
3. **Technical Support**: Code assistance, debugging, explanations
4. **Creative Help**: Content creation, problem-solving, brainstorming

Be professional, helpful, and knowledgeable. Format responses with proper markdown when needed.`;

        this.init();
    }

    init() {
        console.log('🚀 NextReach AI Assistant initializing...');
        
        // Event Listeners
        this.setupEventListeners();
        
        // Initialize features
        this.initializeTheme();
        this.setupPromptButtons();
        this.setupTextareaAutoExpand();
        this.loadContextSettings();
        
        console.log('✅ AI Assistant ready!');
    }

    setupEventListeners() {
        // Send message
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Header buttons
        this.newChatBtn.addEventListener('click', () => this.startNewChat());
        this.exportChatBtn.addEventListener('click', () => this.exportChat());

        // Context settings
        document.getElementById('temperatureSlider')?.addEventListener('input', (e) => {
            document.getElementById('temperatureValue').textContent = e.target.value;
            this.saveSettings();
        });
        
        document.getElementById('maxTokensSlider')?.addEventListener('input', (e) => {
            document.getElementById('maxTokensValue').textContent = e.target.value;
            this.saveSettings();
        });

        // Context mode buttons
        document.querySelectorAll('.context-mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.context-mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.saveSettings();
            });
        });

        // Sidebar buttons
        document.getElementById('clearHistoryBtn')?.addEventListener('click', () => {
            if (confirm('Clear all chat history? This cannot be undone.')) {
                this.clearAllHistory();
            }
        });
    }

    setupPromptButtons() {
        document.querySelectorAll('.prompt-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const prompt = btn.dataset.prompt;
                this.messageInput.value = prompt;
                this.messageInput.focus();
                // Auto-send
                setTimeout(() => this.sendMessage(), 100);
            });
        });
    }

    setupTextareaAutoExpand() {
        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 200) + 'px';
        });
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || this.isProcessing) return;

        // Hide welcome screen
        if (this.welcomeScreen && !this.welcomeScreen.classList.contains('hidden')) {
            this.welcomeScreen.classList.add('hidden');
            this.messagesArea.classList.add('active');
        }

        // Disable input
        this.isProcessing = true;
        this.messageInput.disabled = true;
        this.sendBtn.disabled = true;

        // Add user message
        this.addMessage({
            role: 'user',
            content: message,
            timestamp: new Date()
        });

        // Clear input
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Get AI response
            const response = await this.getAIResponse(message);
            
            // Remove typing indicator
            this.hideTypingIndicator();
            
            // Add AI response
            this.addMessage({
                role: 'assistant',
                content: response,
                timestamp: new Date()
            });

            // Save chat
            this.saveCurrentChat();

        } catch (error) {
            console.error('❌ AI Error:', error);
            this.hideTypingIndicator();
            
            // Fallback response
            const fallbackResponse = this.getFallbackResponse(message);
            this.addMessage({
                role: 'assistant',
                content: `${fallbackResponse}\n\n*Note: Using local AI while DeepSeek reconnects*`,
                timestamp: new Date()
            });
        }

        // Re-enable input
        this.isProcessing = false;
        this.messageInput.disabled = false;
        this.sendBtn.disabled = false;
        this.messageInput.focus();
    }

    async getAIResponse(userMessage) {
        console.log('🔄 Calling DeepSeek AI...', { userMessage });

        const requestBody = {
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: this.systemPrompt
                },
                ...this.messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                }))
            ],
            max_tokens: this.maxTokens, // Optimized for best responses
            temperature: this.temperature, // Optimized for creativity
            top_p: 0.95 // Higher for better quality
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.choices && data.choices[0] && data.choices[0].message) {
                const aiResponse = data.choices[0].message.content.trim();
                console.log('✅ DeepSeek AI responded!');
                return aiResponse;
            } else {
                throw new Error('Invalid API response structure');
            }

        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    getFallbackResponse(message) {
        const msg = message.toLowerCase();

        // NextReach-specific
        if (msg.includes('package') || msg.includes('price') || msg.includes('nextreach')) {
            return `🚀 **NextReach Digital Transformation Packages:**

🎉 **Basic Presence** - **FREE** (Limited Time!)
• Professional 1-page website
• Social media setup (2 platforms)
• Basic SEO optimization
• Business email setup
• Analytics tracking

🔥 **Professional Package** - **$660** (70% OFF from $2,200)
• Multi-page custom website
• 3 social media platforms
• Content calendar (30 days)
• 1 promotional video
• Advanced SEO & lead generation

💎 **Premium Launch** - **$1,400** (65% OFF from $4,000)
• Custom full-stack website
• All major social platforms
• 3 professional videos
• Complete brand strategy
• 90-day content calendar

**Special Offer:** The Basic Presence package is completely FREE to build our portfolio! Zero risk, maximum value.

Which package interests you? I can provide more details! 🎯`;
        }

        // Digital marketing
        if (msg.includes('marketing') || msg.includes('seo') || msg.includes('social media')) {
            return `📈 **Digital Marketing Essentials:**

✅ **SEO (Search Engine Optimization)**
• Keyword research & optimization
• On-page and technical SEO
• Local SEO for businesses
• Link building strategies

✅ **Social Media Marketing**
• Content strategy & planning
• Platform-specific optimization
• Engagement & community building
• Analytics & performance tracking

✅ **Content Marketing**
• Blog posts & articles
• Video content
• Infographics & visuals
• Email campaigns

NextReach handles all of this in our packages! The Professional package ($660) includes comprehensive social media management and SEO optimization.

Want to learn more about a specific strategy? 🎯`;
        }

        // AI/Technology
        if (msg.includes('ai') || msg.includes('artificial intelligence')) {
            return `🤖 **Artificial Intelligence - Modern Overview:**

**Machine Learning Types:**
• **Supervised Learning**: Learning from labeled data (classification, regression)
• **Unsupervised Learning**: Finding patterns in unlabeled data (clustering)
• **Reinforcement Learning**: Learning through trial and reward
• **Deep Learning**: Neural networks with multiple layers (like this chat!)

**Current AI Applications:**
• 💬 Natural Language Processing (chatbots, translation)
• 👁️ Computer Vision (image recognition, autonomous vehicles)
• 🎯 Recommendation Systems (Netflix, Amazon)
• 🏥 Healthcare (diagnosis, drug discovery)
• 🎨 Creative AI (art generation, content creation)

**For Businesses:**
AI can automate customer service, analyze data for insights, personalize user experiences, and optimize operations.

What aspect of AI interests you most? 🚀`;
        }

        // Programming
        if (msg.includes('code') || msg.includes('programming') || msg.includes('python')) {
            return `💻 **Programming & Development:**

I can help with:
• **Code Examples**: Python, JavaScript, HTML/CSS, and more
• **Debugging**: Finding and fixing errors
• **Algorithms**: Data structures, optimization
• **Web Development**: Frontend & backend
• **APIs**: Integration and development
• **Best Practices**: Clean code, architecture

What programming challenge are you working on? Share your code or describe the problem! 🔧`;
        }

        // Business
        if (msg.includes('business') || msg.includes('startup') || msg.includes('entrepreneur')) {
            return `💼 **Business Strategy & Growth:**

**Key Success Factors:**
🎯 **Market Positioning**: Find your unique value proposition
📊 **Data-Driven Decisions**: Track KPIs and metrics
🚀 **Digital Presence**: Essential in 2025 (that's where NextReach helps!)
💡 **Innovation**: Stay ahead of trends
🤝 **Customer Focus**: Build relationships, not just transactions

**For Modern Businesses:**
Your online presence is your storefront. Customers research online before buying. A professional website, active social media, and SEO optimization are non-negotiable.

NextReach's packages handle all of this - from website to social media to video content. The Basic package is FREE to get you started!

What aspect of your business would you like to improve? 📈`;
        }

        // General fallback
        return `I'm here to help! I can assist with:

• **NextReach Services** - Digital marketing, websites, social media
• **Technology & Programming** - Code help, explanations, debugging
• **Business Strategy** - Growth tactics, marketing, operations
• **General Knowledge** - Science, history, current events, and more

Could you rephrase your question or ask about a specific topic? I'm ready to help! 💡`;
    }

    addMessage(messageData) {
        this.messages.push(messageData);

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${messageData.role}`;
        
        const timeString = this.formatTime(messageData.timestamp);
        const avatarContent = messageData.role === 'user' ? 'You' : '🤖';
        const nameContent = messageData.role === 'user' ? 'You' : 'NextReach AI';

        messageDiv.innerHTML = `
            <div class="message-header">
                <div class="message-avatar">${avatarContent}</div>
                <div class="message-info">
                    <div class="message-name">${nameContent}</div>
                    <div class="message-time">${timeString}</div>
                </div>
            </div>
            <div class="message-content">
                ${this.formatMessage(messageData.content)}
            </div>
        `;

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();

        // Apply code highlighting if present
        if (messageDiv.querySelectorAll('pre code').length > 0) {
            messageDiv.querySelectorAll('pre code').forEach(block => {
                if (typeof hljs !== 'undefined') {
                    hljs.highlightElement(block);
                }
            });
        }
    }

    formatMessage(content) {
        // Use marked.js for markdown if available
        if (typeof marked !== 'undefined') {
            return marked.parse(content);
        }
        
        // Basic formatting fallback
        return content
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/`(.+?)`/g, '<code>$1</code>');
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-header">
                <div class="message-avatar">🤖</div>
                <div class="message-info">
                    <div class="message-name">NextReach AI</div>
                    <div class="message-time">typing...</div>
                </div>
            </div>
            <div class="typing-indicator">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
    }

    formatTime(date) {
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    // ==================
    // CHAT MANAGEMENT
    // ==================

    startNewChat() {
        if (this.messages.length > 0) {
            this.saveCurrentChat();
        }

        this.currentChatId = this.generateChatId();
        this.messages = [];
        this.messagesContainer.innerHTML = '';
        this.welcomeScreen.classList.remove('hidden');
        this.messagesArea.classList.remove('active');
        
        console.log('🆕 New chat started');
    }

    saveCurrentChat() {
        if (this.messages.length === 0) return;

        const chatData = {
            id: this.currentChatId,
            messages: this.messages,
            timestamp: new Date().toISOString(),
            title: this.generateChatTitle()
        };

        this.chatHistory.unshift(chatData);
        if (this.chatHistory.length > 50) {
            this.chatHistory = this.chatHistory.slice(0, 50);
        }

        localStorage.setItem('nextreach_chat_history', JSON.stringify(this.chatHistory));
        this.updateHistorySidebar();
    }

    loadChatHistory() {
        try {
            const stored = localStorage.getItem('nextreach_chat_history');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading chat history:', error);
            return [];
        }
    }

    generateChatTitle() {
        if (this.messages.length === 0) return 'New Chat';
        const firstUserMessage = this.messages.find(m => m.role === 'user');
        if (!firstUserMessage) return 'New Chat';
        return firstUserMessage.content.substring(0, 40) + (firstUserMessage.content.length > 40 ? '...' : '');
    }

    generateChatId() {
        return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    updateHistorySidebar() {
        // Implementation for sidebar updates
        console.log('💾 Chat history updated');
    }

    clearAllHistory() {
        this.chatHistory = [];
        localStorage.removeItem('nextreach_chat_history');
        this.updateHistorySidebar();
        console.log('🗑️ All chat history cleared');
    }

    // ==================
    // EXPORT FUNCTIONALITY
    // ==================

    exportChat() {
        if (this.messages.length === 0) {
            alert('No messages to export!');
            return;
        }

        const chatText = this.messages.map(msg => {
            const role = msg.role === 'user' ? 'You' : 'NextReach AI';
            const time = new Date(msg.timestamp).toLocaleString();
            return `[${time}] ${role}:\n${msg.content}\n`;
        }).join('\n---\n\n');

        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nextreach-chat-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('💾 Chat exported');
    }

    // ==================
    // THEME MANAGEMENT
    // ==================

    initializeTheme() {
        const savedTheme = localStorage.getItem('nextreach_ai_theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            this.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('nextreach_ai_theme', newTheme);
        
        this.themeToggle.innerHTML = newTheme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        
        console.log(`🎨 Theme switched to ${newTheme}`);
    }

    toggleSidebar() {
        this.sidebar.classList.toggle('open');
    }

    loadContextSettings() {
        // Load saved settings from localStorage
        const savedSettings = localStorage.getItem('nextreach_ai_settings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                if (settings.temperature) {
                    const tempSlider = document.getElementById('temperatureSlider');
                    const tempValue = document.getElementById('temperatureValue');
                    if (tempSlider) tempSlider.value = settings.temperature;
                    if (tempValue) tempValue.textContent = settings.temperature;
                }
                if (settings.maxTokens) {
                    const tokensSlider = document.getElementById('maxTokensSlider');
                    const tokensValue = document.getElementById('maxTokensValue');
                    if (tokensSlider) tokensSlider.value = settings.maxTokens;
                    if (tokensValue) tokensValue.textContent = settings.maxTokens;
                }
                if (settings.contextMode) {
                    document.querySelectorAll('.context-mode-btn').forEach(btn => {
                        btn.classList.toggle('active', btn.dataset.mode === settings.contextMode);
                    });
                }
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        }
    }

    saveSettings() {
        const settings = {
            temperature: document.getElementById('temperatureSlider')?.value || 0.7,
            maxTokens: document.getElementById('maxTokensSlider')?.value || 2000,
            contextMode: document.querySelector('.context-mode-btn.active')?.dataset.mode || 'balanced'
        };
        localStorage.setItem('nextreach_ai_settings', JSON.stringify(settings));
        console.log('⚙️ Settings saved:', settings);
    }
}

// ==================
// INITIALIZE APP
// ==================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing NextReach AI Assistant...');
    
    // Wait for external libraries
    if (typeof marked === 'undefined') {
        console.warn('⚠️ marked.js not loaded, using basic formatting');
    }
    
    if (typeof hljs === 'undefined') {
        console.warn('⚠️ highlight.js not loaded, code highlighting disabled');
    }
    
    // Initialize AI Assistant
    window.nextReachAI = new NextReachAI();
    
    console.log('✅ NextReach AI Assistant ready!');
});

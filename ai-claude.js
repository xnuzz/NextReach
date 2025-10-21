// ================================================
// CLAUDE-STYLE AI ASSISTANT - NEXTREACH
// Clean, Minimalist Implementation
// ================================================

class ClaudeAI {
    constructor() {
        // DOM Elements
        this.menuBtn = document.getElementById('menuBtn');
        this.newChatBtn = document.getElementById('newChatBtn');
        this.sidebarNewChat = document.getElementById('sidebarNewChat');
        this.sidebar = document.getElementById('sidebar');
        this.sidebarOverlay = document.getElementById('sidebarOverlay');
        this.closeSidebar = document.getElementById('closeSidebar');
        this.welcomeScreen = document.getElementById('welcomeScreen');
        this.messagesContainer = document.getElementById('messagesContainer');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.chatHistory = document.getElementById('chatHistory');
        this.chatMain = document.querySelector('.chat-main');
        
        // AI Configuration - OPTIMIZED FOR BEST RESPONSES
        this.temperature = 0.8;
        this.maxTokens = 3000;
        this.timeout = 45000;
        
        // Chat State
        this.messages = [];
        this.isProcessing = false;
        this.sidebarOpen = true; // Sidebar open by default on desktop
        
        // System Prompt
        this.systemPrompt = `You are a professional AI assistant for NextReach Digital Marketing Agency. Provide helpful, accurate, and friendly responses.

NextReach Services:
- Basic Presence: FREE (limited time)
- Professional Package: $660 (70% OFF)
- Premium Launch: $1,400 (65% OFF)

Be conversational, clear, and helpful. Format responses with proper markdown.`;

        this.init();
    }

    init() {
        console.log('🚀 Claude-style AI Assistant initializing...');
        this.setupEventListeners();
        this.setupTextareaAutoExpand();
        this.checkScreenSize(); // Check if mobile or desktop
        console.log('✅ Ready!');
    }

    checkScreenSize() {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            this.sidebar.classList.add('hidden');
            this.chatMain.classList.add('full-width');
            this.sidebarOpen = false;
        } else {
            this.sidebar.classList.remove('hidden');
            this.chatMain.classList.remove('full-width');
            this.sidebarOpen = true;
        }
        
        // Add resize listener
        window.addEventListener('resize', () => {
            const isMobile = window.innerWidth < 768;
            if (isMobile && this.sidebarOpen) {
                this.sidebar.classList.add('hidden');
                this.chatMain.classList.add('full-width');
                this.sidebarOpen = false;
            } else if (!isMobile && !this.sidebarOpen) {
                this.sidebar.classList.remove('hidden');
                this.chatMain.classList.remove('full-width');
                this.sidebarOpen = true;
            }
        });
    }

    setupEventListeners() {
        // Menu & Sidebar
        this.menuBtn.addEventListener('click', () => this.toggleSidebar());
        this.closeSidebar.addEventListener('click', () => this.toggleSidebar());
        this.sidebarOverlay.addEventListener('click', () => this.toggleSidebar());
        
        // New Chat (both buttons)
        this.newChatBtn.addEventListener('click', () => this.startNewChat());
        if (this.sidebarNewChat) {
            this.sidebarNewChat.addEventListener('click', () => this.startNewChat());
        }
        
        // Send Message
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Suggestion Cards
        document.querySelectorAll('.suggestion-card').forEach(card => {
            card.addEventListener('click', () => {
                const prompt = card.dataset.prompt;
                this.messageInput.value = prompt;
                this.messageInput.focus();
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

    toggleSidebar() {
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            // Mobile: Toggle with overlay
            this.sidebar.classList.toggle('active');
            this.sidebarOverlay.classList.toggle('active');
        } else {
            // Desktop: Toggle sidebar and adjust main content
            this.sidebar.classList.toggle('hidden');
            this.chatMain.classList.toggle('full-width');
            this.sidebarOpen = !this.sidebarOpen;
        }
    }

    startNewChat() {
        if (confirm('Start a new chat? Current conversation will be saved.')) {
            this.messages = [];
            this.messagesContainer.innerHTML = '';
            this.messagesContainer.classList.remove('active');
            this.welcomeScreen.classList.remove('hidden');
            this.messageInput.value = '';
            console.log('🆕 New chat started');
        }
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || this.isProcessing) return;

        // Hide welcome screen
        if (this.welcomeScreen && !this.welcomeScreen.classList.contains('hidden')) {
            this.welcomeScreen.classList.add('hidden');
            this.messagesContainer.classList.add('active');
        }

        // Add user message
        this.addMessage('user', message);
        this.messages.push({ role: 'user', content: message });

        // Clear input
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';

        // Disable send button
        this.isProcessing = true;
        this.sendBtn.disabled = true;

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Get AI response
            const response = await this.getAIResponse(message);
            this.hideTypingIndicator();
            
            // Add AI message
            this.addMessage('assistant', response);
            this.messages.push({ role: 'assistant', content: response });
            
        } catch (error) {
            console.error('Error:', error);
            this.hideTypingIndicator();
            
            const errorMsg = 'I apologize, but I encountered an error. Please try again.';
            this.addMessage('assistant', errorMsg);
        }

        // Re-enable send button
        this.isProcessing = false;
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
            max_tokens: this.maxTokens,
            temperature: this.temperature,
            top_p: 0.95
        };

        try {
            console.log('📤 Sending request to DeepSeek API...');
            const response = await fetch('https://api.deepseek.com/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer sk-6cf8ec9791054fbbbe627532301d154b'
                },
                body: JSON.stringify(requestBody),
                signal: AbortSignal.timeout(this.timeout)
            });

            console.log('📥 Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('❌ API Error Details:', errorData);
                throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            console.log('✅ AI Response received:', data);

            return data.choices[0].message.content;

        } catch (error) {
            console.error('API Error:', error);
            
            // Fallback responses
            const fallbackResponses = {
                'nextreach': 'NextReach is a cutting-edge digital marketing agency specializing in AI-powered solutions, web development, and brand growth. We offer packages starting from FREE to help businesses establish their digital presence!',
                'services': 'We offer: 1) Basic Presence Package (FREE), 2) Professional Package ($660 - 70% OFF), and 3) Premium Launch ($1,400 - 65% OFF). Each includes web development, social media, and marketing tools.',
                'ai': 'AI can revolutionize your business through automation, personalized customer experiences, data-driven insights, and efficient marketing campaigns. Would you like to learn more about specific AI applications?',
                'default': 'I\'m here to help! I can assist you with information about NextReach services, digital marketing strategies, AI solutions, and general business advice. What would you like to know?'
            };

            const lowerMessage = userMessage.toLowerCase();
            if (lowerMessage.includes('nextreach')) return fallbackResponses.nextreach;
            if (lowerMessage.includes('service') || lowerMessage.includes('package')) return fallbackResponses.services;
            if (lowerMessage.includes('ai') || lowerMessage.includes('artificial')) return fallbackResponses.ai;
            
            return fallbackResponses.default;
        }
    }

    addMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        
        const roleLabel = role === 'user' ? 'You' : 'NextReach AI';
        const roleIcon = role === 'user' ? 'fa-user' : 'fa-robot';
        
        messageDiv.innerHTML = `
            <div class="message-role">
                <i class="fas ${roleIcon}"></i>
                ${roleLabel}
            </div>
            <div class="message-content">
                ${this.formatMessage(content)}
            </div>
        `;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Highlight code blocks if present
        if (typeof hljs !== 'undefined') {
            messageDiv.querySelectorAll('pre code').forEach(block => {
                hljs.highlightElement(block);
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
            <div class="message-role">
                <i class="fas fa-robot"></i>
                NextReach AI
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
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
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
}

// ==================
// INITIALIZE APP
// ==================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Claude-style AI Assistant...');
    
    // Wait for external libraries
    if (typeof marked === 'undefined') {
        console.warn('⚠️ marked.js not loaded, using basic formatting');
    }
    
    if (typeof hljs === 'undefined') {
        console.warn('⚠️ highlight.js not loaded, code highlighting disabled');
    }
    
    // Initialize AI Assistant
    window.claudeAI = new ClaudeAI();
    
    console.log('✅ Claude-style AI Assistant ready!');
});

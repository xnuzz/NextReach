// ================================================
// CLAUDE-STYLE AI ASSISTANT - NEXTREACH
// Clean, Minimalist Implementation with Chat Persistence
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
        
        // Chat State with Persistence
        this.currentChatId = null;
        this.chats = {}; // { chatId: { id, title, messages, createdAt, updatedAt } }
        this.messages = [];
        this.isProcessing = false;
        this.sidebarOpen = true; // Sidebar open by default on desktop
        
        // System Prompt
        this.systemPrompt = `You are a professional AI assistant for NextReach Digital Marketing Agency. Provide helpful, accurate, and friendly responses.

NextReach Pricing & Packages (Current 2025):

STARTER PACKAGE:
- Total: $697 (or $627 with 10% upfront discount)
- Payment: $349 deposit + $58/mo × 6 (0% interest)
- Or: $349 deposit + $116/mo × 3
- Includes: Modern 3-page website, mobile-responsive, basic SEO, contact form, Google Business Profile, 2 social media profiles, SSL & hosting, 30-day support
- Delivery: 7-10 days

PROFESSIONAL PACKAGE (MOST POPULAR):
- Total: $1,497 (or $1,347 with 10% upfront discount)
- Payment: $748 deposit + $125/mo × 6 (0% interest)
- Or: $748 deposit + $250/mo × 3
- Includes: Custom 7-page website, advanced SEO & analytics, blog with 3 articles, email marketing, AI chatbot assistant, 4 social media profiles, 1 professional promo video (30s), lead capture & CRM, Google Ads & Meta Pixel setup, 90-day priority support
- Delivery: 14-21 days

PREMIUM PACKAGE:
- Total: $2,000 (or $1,797 with 10% upfront discount)
- Payment: $998 deposit + $167/mo × 6 (0% interest)
- Or: $998 deposit + $333/mo × 3
- Includes: Unlimited pages, full SEO strategy, e-commerce (50 products), custom animations, advanced AI features, all social platforms + LinkedIn, 3 professional videos (60s each), complete brand identity, marketing automation, monthly strategy consultations, 6-month premium support
- Delivery: 21-30 days

KEY FEATURES:
- 0% interest payment plans
- 10% discount for full upfront payment
- No hidden fees
- Risk-share guarantee
- Flexible payment options available
- Enterprise projects ($5K+) available

Be conversational, clear, and helpful. Format responses with proper markdown. Always provide accurate pricing from above.`;

        this.init();
    }

    init() {
        console.log('🚀 Claude-style AI Assistant initializing...');
        this.loadChatsFromStorage(); // Load saved chats
        this.setupEventListeners();
        this.setupTextareaAutoExpand();
        this.checkScreenSize(); // Check if mobile or desktop
        this.renderChatHistory(); // Display saved chats
        
        // Auto-create first chat if none exist
        if (Object.keys(this.chats).length === 0) {
            this.createNewChat();
        } else {
            // Load the most recent chat
            const chatIds = Object.keys(this.chats).sort((a, b) => 
                this.chats[b].updatedAt - this.chats[a].updatedAt
            );
            this.loadChat(chatIds[0]);
        }
        
        console.log('✅ Ready! Chats loaded:', Object.keys(this.chats).length);
    }

    // ==================
    // CHAT PERSISTENCE - LOCALSTORAGE
    // ==================

    saveChatsToStorage() {
        try {
            localStorage.setItem('nextreach_ai_chats', JSON.stringify(this.chats));
            localStorage.setItem('nextreach_current_chat', this.currentChatId);
            console.log('💾 Chats saved to localStorage');
        } catch (error) {
            console.error('Error saving chats:', error);
        }
    }

    loadChatsFromStorage() {
        try {
            const savedChats = localStorage.getItem('nextreach_ai_chats');
            const currentChatId = localStorage.getItem('nextreach_current_chat');
            
            if (savedChats) {
                this.chats = JSON.parse(savedChats);
                this.currentChatId = currentChatId;
                console.log('📂 Loaded chats from storage:', Object.keys(this.chats).length);
            }
        } catch (error) {
            console.error('Error loading chats:', error);
            this.chats = {};
        }
    }

    createNewChat() {
        const chatId = 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        const newChat = {
            id: chatId,
            title: 'New Conversation',
            messages: [],
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        
        this.chats[chatId] = newChat;
        this.currentChatId = chatId;
        this.messages = [];
        
        this.saveChatsToStorage();
        this.renderChatHistory();
        
        // Show welcome screen
        this.messagesContainer.innerHTML = '';
        this.messagesContainer.classList.remove('active');
        this.welcomeScreen.classList.remove('hidden');
        
        console.log('✨ New chat created:', chatId);
        return chatId;
    }

    loadChat(chatId) {
        if (!this.chats[chatId]) {
            console.error('Chat not found:', chatId);
            return;
        }
        
        this.currentChatId = chatId;
        this.messages = [...this.chats[chatId].messages];
        
        // Clear and render messages
        this.messagesContainer.innerHTML = '';
        
        if (this.messages.length === 0) {
            // Show welcome screen
            this.welcomeScreen.classList.remove('hidden');
            this.messagesContainer.classList.remove('active');
        } else {
            // Hide welcome and show messages
            this.welcomeScreen.classList.add('hidden');
            this.messagesContainer.classList.add('active');
            
            // Render all messages
            this.messages.forEach(msg => {
                this.addMessage(msg.role, msg.content, false); // false = don't save
            });
        }
        
        this.saveChatsToStorage();
        this.renderChatHistory();
        
        console.log('📖 Loaded chat:', chatId, 'Messages:', this.messages.length);
    }

    deleteChat(chatId) {
        if (!confirm('Delete this conversation? This cannot be undone.')) {
            return;
        }
        
        delete this.chats[chatId];
        
        // If deleted current chat, create new one
        if (this.currentChatId === chatId) {
            const remainingChats = Object.keys(this.chats);
            if (remainingChats.length > 0) {
                this.loadChat(remainingChats[0]);
            } else {
                this.createNewChat();
            }
        }
        
        this.saveChatsToStorage();
        this.renderChatHistory();
        
        console.log('🗑️ Chat deleted:', chatId);
    }

    updateChatTitle(chatId, userMessage) {
        // Auto-generate title from first user message (first 50 chars)
        if (this.chats[chatId].title === 'New Conversation') {
            const title = userMessage.substring(0, 50).trim() + (userMessage.length > 50 ? '...' : '');
            this.chats[chatId].title = title;
            this.chats[chatId].updatedAt = Date.now();
            this.saveChatsToStorage();
            this.renderChatHistory();
        }
    }

    renderChatHistory() {
        if (Object.keys(this.chats).length === 0) {
            this.chatHistory.innerHTML = `
                <div class="empty-history">
                    <i class="fas fa-comments"></i>
                    <p>No chat history yet</p>
                    <p style="font-size: 0.8125rem; margin-top: 0.5rem;">Start a conversation to see it here</p>
                </div>
            `;
            return;
        }
        
        // Sort chats by most recent
        const sortedChats = Object.values(this.chats).sort((a, b) => 
            b.updatedAt - a.updatedAt
        );
        
        this.chatHistory.innerHTML = sortedChats.map(chat => {
            const date = new Date(chat.updatedAt);
            const timeAgo = this.getTimeAgo(date);
            const isActive = chat.id === this.currentChatId;
            
            return `
                <div class="history-item ${isActive ? 'active' : ''}" data-chat-id="${chat.id}">
                    <div class="history-title">${this.escapeHtml(chat.title)}</div>
                    <div class="history-date">
                        <i class="fas fa-clock"></i> ${timeAgo}
                    </div>
                    <button class="history-delete" onclick="claudeAI.deleteChat('${chat.id}'); event.stopPropagation();" title="Delete">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
        }).join('');
        
        // Add click listeners to history items
        document.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                const chatId = item.dataset.chatId;
                this.loadChat(chatId);
                
                // Close sidebar on mobile
                if (window.innerWidth < 768) {
                    this.toggleSidebar();
                }
            });
        });
    }

    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return Math.floor(seconds / 60) + ' min ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
        if (seconds < 604800) return Math.floor(seconds / 86400) + ' days ago';
        
        return date.toLocaleDateString();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
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
        
        // Export and Clear buttons
        const exportBtn = document.getElementById('exportChatBtn');
        const clearAllBtn = document.getElementById('clearAllChatsBtn');
        
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportCurrentChat());
        }
        
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => this.clearAllChats());
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

    exportCurrentChat() {
        if (!this.currentChatId || this.messages.length === 0) {
            alert('No conversation to export!');
            return;
        }
        
        const chat = this.chats[this.currentChatId];
        const exportData = {
            title: chat.title,
            createdAt: new Date(chat.createdAt).toLocaleString(),
            exportedAt: new Date().toLocaleString(),
            messages: chat.messages.map(msg => ({
                role: msg.role === 'user' ? 'You' : 'NextReach AI',
                content: msg.content
            }))
        };
        
        // Create text format
        let textContent = `NextReach AI - Chat Export\n`;
        textContent += `Title: ${exportData.title}\n`;
        textContent += `Created: ${exportData.createdAt}\n`;
        textContent += `Exported: ${exportData.exportedAt}\n`;
        textContent += `\n${'='.repeat(60)}\n\n`;
        
        exportData.messages.forEach((msg, i) => {
            textContent += `[${msg.role}]:\n${msg.content}\n\n${'-'.repeat(60)}\n\n`;
        });
        
        // Download as .txt file
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nextreach-chat-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('💾 Chat exported');
    }

    clearAllChats() {
        if (!confirm('Delete ALL conversations? This cannot be undone!')) {
            return;
        }
        
        if (!confirm('Are you absolutely sure? All chat history will be permanently deleted.')) {
            return;
        }
        
        this.chats = {};
        this.currentChatId = null;
        this.messages = [];
        
        localStorage.removeItem('nextreach_ai_chats');
        localStorage.removeItem('nextreach_current_chat');
        
        this.createNewChat();
        
        console.log('🗑️ All chats cleared');
        alert('All conversations have been deleted.');
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
        // Create new chat without confirmation if current is empty
        if (this.messages.length === 0) {
            return;
        }
        
        if (confirm('Start a new chat? Current conversation will be saved.')) {
            this.createNewChat();
            this.messageInput.focus();
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
        
        // Trigger AI Chatter achievement on first message
        if (this.messages.length === 1 && typeof achievementSystem !== 'undefined') {
            achievementSystem.onAIChat();
        }

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

    addMessage(role, content, shouldSave = true) {
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
        
        // Save message to current chat
        if (shouldSave && this.currentChatId) {
            this.chats[this.currentChatId].messages.push({ role, content });
            this.chats[this.currentChatId].updatedAt = Date.now();
            
            // Update title if this is first user message
            if (role === 'user' && this.chats[this.currentChatId].messages.length === 1) {
                this.updateChatTitle(this.currentChatId, content);
            }
            
            this.saveChatsToStorage();
            this.renderChatHistory();
        }
        
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

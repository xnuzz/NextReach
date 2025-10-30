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
        
        // USER-SPECIFIC CHAT STATE
        this.currentUser = null;
        this.currentChatId = null;
        this.chats = {}; // { chatId: { id, title, messages, createdAt, updatedAt, userId } }
        this.messages = [];
        this.isProcessing = false;
        this.sidebarOpen = true; // Sidebar open by default on desktop
        this.userPreferences = {}; // Store user preferences and context
        
        // Base System Prompt (will be enhanced with user context)
        this.baseSystemPrompt = `You are a professional AI assistant for NextReach Digital Marketing Agency. Provide helpful, accurate, and friendly responses.

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

    // Generate personalized system prompt based on user context
    getPersonalizedSystemPrompt() {
        let prompt = this.baseSystemPrompt;
        
        if (this.currentUser) {
            prompt += `\n\n=== USER CONTEXT ===\n`;
            prompt += `User Name: ${this.currentUser.name}\n`;
            prompt += `User Email: ${this.currentUser.email}\n`;
            prompt += `Account Created: ${new Date(this.currentUser.createdAt).toLocaleDateString()}\n`;
            
            if (this.userPreferences.businessName) {
                prompt += `Business Name: ${this.userPreferences.businessName}\n`;
            }
            
            if (this.userPreferences.industry) {
                prompt += `Industry: ${this.userPreferences.industry}\n`;
            }
            
            if (this.userPreferences.goals && this.userPreferences.goals.length > 0) {
                prompt += `User Goals: ${this.userPreferences.goals.join(', ')}\n`;
            }
            
            if (this.userPreferences.interests && this.userPreferences.interests.length > 0) {
                prompt += `Interests: ${this.userPreferences.interests.join(', ')}\n`;
            }
            
            if (this.userPreferences.pastQuestions && this.userPreferences.pastQuestions.length > 0) {
                prompt += `\nPast Topics Discussed:\n`;
                this.userPreferences.pastQuestions.slice(-5).forEach(q => {
                    prompt += `- ${q}\n`;
                });
            }
            
            prompt += `\nIMPORTANT: Address the user by name (${this.currentUser.name.split(' ')[0]}) when appropriate. Reference their past questions and preferences to provide personalized, contextual responses. Remember what they've asked before and build on previous conversations.`;
        }
        
        return prompt;
    }

    // Extract and save user preferences from conversations
    extractUserContext(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Extract business name
        if (message.includes('my business') || message.includes('my company')) {
            const businessMatch = message.match(/(?:business|company)\s+(?:is\s+)?(?:called\s+)?([a-zA-Z0-9\s]+)/);
            if (businessMatch && !this.userPreferences.businessName) {
                this.userPreferences.businessName = businessMatch[1].trim();
                console.log('💼 Detected business name:', this.userPreferences.businessName);
            }
        }
        
        // Extract industry
        const industries = ['restaurant', 'gym', 'salon', 'retail', 'ecommerce', 'consulting', 'real estate', 'healthcare', 'fitness', 'beauty', 'technology', 'education', 'finance'];
        for (const industry of industries) {
            if (message.includes(industry) && !this.userPreferences.industry) {
                this.userPreferences.industry = industry;
                console.log('🏢 Detected industry:', industry);
                break;
            }
        }
        
        // Extract goals
        const goalKeywords = ['want to', 'need to', 'looking to', 'goal is', 'trying to'];
        for (const keyword of goalKeywords) {
            if (message.includes(keyword)) {
                const goalMatch = message.match(new RegExp(keyword + '\\s+([^.!?]+)'));
                if (goalMatch) {
                    const goal = goalMatch[1].trim();
                    if (!this.userPreferences.goals.includes(goal) && goal.length < 100) {
                        this.userPreferences.goals.push(goal);
                        console.log('🎯 Detected goal:', goal);
                    }
                }
            }
        }
        
        // Extract interests (marketing topics)
        const interests = ['seo', 'social media', 'content marketing', 'email marketing', 'ppc', 'advertising', 'branding', 'website', 'video marketing', 'ai'];
        for (const interest of interests) {
            if (message.includes(interest) && !this.userPreferences.interests.includes(interest)) {
                this.userPreferences.interests.push(interest);
                console.log('💡 Detected interest:', interest);
            }
        }
        
        // Save past questions (keep last 10)
        if (userMessage.length > 10 && userMessage.length < 200) {
            this.userPreferences.pastQuestions.push(userMessage);
            if (this.userPreferences.pastQuestions.length > 10) {
                this.userPreferences.pastQuestions.shift();
            }
        }
        
        this.saveUserPreferences();
    }

    async init() {
        console.log('🚀 Claude-style AI Assistant initializing...');
        
        // Load current user
        await this.loadCurrentUser();
        
        if (!this.currentUser) {
            console.log('⚠️ No user logged in, using guest mode');
            this.showGuestModeWarning();
        } else {
            console.log('👤 User loaded:', this.currentUser.name, '(ID:', this.currentUser.id + ')');
            this.loadUserPreferences();
        }
        
        this.loadChatsFromStorage(); // Load saved chats for this user
        this.setupEventListeners();
        this.setupTextareaAutoExpand();
        this.checkScreenSize(); // Check if mobile or desktop
        this.updateUserContextPanel(); // Show user context in sidebar
        this.renderChatHistory(); // Display saved chats
        
        // Auto-create first chat if none exist for this user
        const userChats = this.getUserChats();
        if (userChats.length === 0) {
            this.createNewChat();
        } else {
            // Load the most recent chat for this user
            const sortedChats = userChats.sort((a, b) => b.updatedAt - a.updatedAt);
            this.loadChat(sortedChats[0].id);
        }
        
        console.log('✅ Ready! User chats loaded:', userChats.length);
    }

    async loadCurrentUser() {
        try {
            // Try to get user from session manager
            if (typeof SessionManager !== 'undefined' && SessionManager.getCurrentUser) {
                this.currentUser = SessionManager.getCurrentUser();
            }
            
            // Fallback to localStorage
            if (!this.currentUser) {
                const userData = localStorage.getItem('nextreach_current_user');
                if (userData) {
                    this.currentUser = JSON.parse(userData);
                }
            }
        } catch (error) {
            console.error('Error loading current user:', error);
            this.currentUser = null;
        }
    }

    showGuestModeWarning() {
        // Create a banner to show user they're in guest mode
        const banner = document.createElement('div');
        banner.className = 'guest-mode-banner';
        banner.innerHTML = `
            <div style="background: linear-gradient(135deg, #f59e0b, #f97316); color: white; padding: 1rem; text-align: center; position: sticky; top: 0; z-index: 1000; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <i class="fas fa-info-circle"></i>
                <strong>Guest Mode</strong> - Your chats won't be saved permanently. 
                <a href="login.html" style="color: white; text-decoration: underline; margin-left: 1rem;">Login</a> or 
                <a href="register.html" style="color: white; text-decoration: underline;">Create Account</a> to save your conversations.
            </div>
        `;
        document.body.insertBefore(banner, document.body.firstChild);
    }

    loadUserPreferences() {
        try {
            const key = `nextreach_user_prefs_${this.currentUser.id}`;
            const prefs = localStorage.getItem(key);
            if (prefs) {
                this.userPreferences = JSON.parse(prefs);
                console.log('📋 User preferences loaded:', this.userPreferences);
            } else {
                // Initialize default preferences
                this.userPreferences = {
                    industry: null,
                    businessName: null,
                    goals: [],
                    pastQuestions: [],
                    interests: []
                };
            }
        } catch (error) {
            console.error('Error loading user preferences:', error);
            this.userPreferences = {};
        }
    }

    saveUserPreferences() {
        if (!this.currentUser) return;
        
        try {
            const key = `nextreach_user_prefs_${this.currentUser.id}`;
            localStorage.setItem(key, JSON.stringify(this.userPreferences));
            console.log('💾 User preferences saved');
        } catch (error) {
            console.error('Error saving user preferences:', error);
        }
    }

    getUserChats() {
        // Return only chats belonging to current user
        const userId = this.currentUser ? this.currentUser.id : 'guest';
        return Object.values(this.chats).filter(chat => chat.userId === userId);
    }

    // ==================
    // CHAT PERSISTENCE - LOCALSTORAGE
    // ==================

    saveChatsToStorage() {
        try {
            // Save all chats (multi-user storage)
            localStorage.setItem('nextreach_ai_chats_all', JSON.stringify(this.chats));
            
            // Save current user's active chat
            if (this.currentUser) {
                const key = `nextreach_current_chat_${this.currentUser.id}`;
                localStorage.setItem(key, this.currentChatId);
            }
            
            console.log('💾 Chats saved to localStorage (User:', this.currentUser ? this.currentUser.name : 'Guest', ')');
        } catch (error) {
            console.error('Error saving chats:', error);
        }
    }

    loadChatsFromStorage() {
        try {
            // Load all chats
            const savedChats = localStorage.getItem('nextreach_ai_chats_all');
            
            if (savedChats) {
                this.chats = JSON.parse(savedChats);
                console.log('📂 Loaded all chats from storage:', Object.keys(this.chats).length);
            } else {
                this.chats = {};
            }
            
            // Load current user's active chat
            if (this.currentUser) {
                const key = `nextreach_current_chat_${this.currentUser.id}`;
                this.currentChatId = localStorage.getItem(key);
            }
        } catch (error) {
            console.error('Error loading chats:', error);
            this.chats = {};
        }
    }

    createNewChat() {
        const userId = this.currentUser ? this.currentUser.id : 'guest';
        const chatId = 'chat_' + userId + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        const newChat = {
            id: chatId,
            userId: userId,
            userName: this.currentUser ? this.currentUser.name : 'Guest',
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
        
        console.log('✨ New chat created for', newChat.userName, ':', chatId);
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
        this.updateWelcomeMessage();
        
        console.log('📖 Loaded chat:', chatId, 'Messages:', this.messages.length);
    }

    updateWelcomeMessage() {
        const welcomeTitle = document.getElementById('welcomeTitle');
        if (!welcomeTitle) return;
        
        if (this.currentUser) {
            const firstName = this.currentUser.name.split(' ')[0];
            const timeOfDay = new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening';
            
            if (this.userPreferences.businessName) {
                welcomeTitle.textContent = `Good ${timeOfDay}, ${firstName}! How can I help ${this.userPreferences.businessName} today?`;
            } else {
                welcomeTitle.textContent = `Good ${timeOfDay}, ${firstName}! How can I help you today?`;
            }
        } else {
            welcomeTitle.textContent = 'How can I help you today?';
        }
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
        // Get only this user's chats
        const userChats = this.getUserChats();
        
        if (userChats.length === 0) {
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
        const sortedChats = userChats.sort((a, b) => 
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

        // Extract user context from message
        if (this.currentUser) {
            this.extractUserContext(message);
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
            // Get AI response with personalized context
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
        console.log('🔄 Calling DeepSeek AI with user context...', { 
            user: this.currentUser ? this.currentUser.name : 'Guest',
            message: userMessage 
        });

        // Get personalized system prompt
        const systemPrompt = this.getPersonalizedSystemPrompt();

        const requestBody = {
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
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

    // Display user context in sidebar
    updateUserContextPanel() {
        const panel = document.getElementById('userContextPanel');
        if (!panel) return;
        
        if (!this.currentUser) {
            panel.style.display = 'none';
            return;
        }
        
        panel.style.display = 'block';
        
        const nameEl = document.getElementById('contextUserName');
        const emailEl = document.getElementById('contextUserEmail');
        const detailsEl = document.getElementById('contextDetails');
        
        if (nameEl) nameEl.textContent = this.currentUser.name;
        if (emailEl) emailEl.textContent = this.currentUser.email;
        
        if (detailsEl) {
            let details = [];
            
            if (this.userPreferences.businessName) {
                details.push(`🏢 Business: ${this.userPreferences.businessName}`);
            }
            
            if (this.userPreferences.industry) {
                details.push(`📊 Industry: ${this.userPreferences.industry}`);
            }
            
            if (this.userPreferences.goals && this.userPreferences.goals.length > 0) {
                details.push(`🎯 Goals: ${this.userPreferences.goals.length} saved`);
            }
            
            if (this.userPreferences.interests && this.userPreferences.interests.length > 0) {
                details.push(`💡 Interests: ${this.userPreferences.interests.join(', ')}`);
            }
            
            const userChats = this.getUserChats();
            details.push(`💬 Conversations: ${userChats.length}`);
            
            if (details.length === 0) {
                details.push('No context yet - start chatting!');
            }
            
            detailsEl.innerHTML = details.join('<br>');
        }
    }

    // Show modal to edit user preferences
    showUserPreferencesModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 1rem;
        `;
        
        modal.innerHTML = `
            <div style="background: white; border-radius: 16px; padding: 2rem; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h2 style="margin: 0; color: #1e293b;">Edit Your Profile</h2>
                    <button onclick="this.closest('div[style*=fixed]').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #64748b;">&times;</button>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #475569;">Business Name</label>
                    <input type="text" id="prefBusinessName" value="${this.userPreferences.businessName || ''}" placeholder="Your business name" style="width: 100%; padding: 0.75rem; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 1rem;">
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #475569;">Industry</label>
                    <select id="prefIndustry" style="width: 100%; padding: 0.75rem; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 1rem;">
                        <option value="">Select industry...</option>
                        <option value="restaurant" ${this.userPreferences.industry === 'restaurant' ? 'selected' : ''}>Restaurant</option>
                        <option value="gym" ${this.userPreferences.industry === 'gym' ? 'selected' : ''}>Gym / Fitness</option>
                        <option value="salon" ${this.userPreferences.industry === 'salon' ? 'selected' : ''}>Salon / Beauty</option>
                        <option value="retail" ${this.userPreferences.industry === 'retail' ? 'selected' : ''}>Retail</option>
                        <option value="ecommerce" ${this.userPreferences.industry === 'ecommerce' ? 'selected' : ''}>E-commerce</option>
                        <option value="consulting" ${this.userPreferences.industry === 'consulting' ? 'selected' : ''}>Consulting</option>
                        <option value="real estate" ${this.userPreferences.industry === 'real estate' ? 'selected' : ''}>Real Estate</option>
                        <option value="healthcare" ${this.userPreferences.industry === 'healthcare' ? 'selected' : ''}>Healthcare</option>
                        <option value="technology" ${this.userPreferences.industry === 'technology' ? 'selected' : ''}>Technology</option>
                        <option value="education" ${this.userPreferences.industry === 'education' ? 'selected' : ''}>Education</option>
                        <option value="finance" ${this.userPreferences.industry === 'finance' ? 'selected' : ''}>Finance</option>
                        <option value="other" ${this.userPreferences.industry === 'other' ? 'selected' : ''}>Other</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #475569;">Your Goals (comma-separated)</label>
                    <textarea id="prefGoals" placeholder="e.g., increase sales, improve online presence, grow social media" style="width: 100%; padding: 0.75rem; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 1rem; min-height: 80px; resize: vertical;">${this.userPreferences.goals ? this.userPreferences.goals.join(', ') : ''}</textarea>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #475569;">Marketing Interests</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${['SEO', 'Social Media', 'Content Marketing', 'Email Marketing', 'PPC', 'Branding', 'Video Marketing', 'AI'].map(interest => {
                            const checked = this.userPreferences.interests && this.userPreferences.interests.includes(interest.toLowerCase());
                            return `
                                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: ${checked ? '#667eea' : '#f1f5f9'}; color: ${checked ? 'white' : '#475569'}; border-radius: 20px; cursor: pointer; font-size: 0.875rem; font-weight: 600;">
                                    <input type="checkbox" value="${interest.toLowerCase()}" ${checked ? 'checked' : ''} style="margin: 0;">
                                    ${interest}
                                </label>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem;">
                    <button onclick="claudeAI.saveUserPreferencesFromModal(); this.closest('div[style*=fixed]').remove();" style="flex: 1; padding: 0.875rem; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer;">
                        <i class="fas fa-save"></i> Save Profile
                    </button>
                    <button onclick="this.closest('div[style*=fixed]').remove()" style="padding: 0.875rem 1.5rem; background: #e2e8f0; color: #475569; border: none; border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer;">
                        Cancel
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    saveUserPreferencesFromModal() {
        const businessName = document.getElementById('prefBusinessName')?.value.trim();
        const industry = document.getElementById('prefIndustry')?.value;
        const goalsText = document.getElementById('prefGoals')?.value.trim();
        
        if (businessName) {
            this.userPreferences.businessName = businessName;
        }
        
        if (industry) {
            this.userPreferences.industry = industry;
        }
        
        if (goalsText) {
            this.userPreferences.goals = goalsText.split(',').map(g => g.trim()).filter(g => g);
        }
        
        // Get selected interests
        const interestCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        this.userPreferences.interests = Array.from(interestCheckboxes).map(cb => cb.value);
        
        this.saveUserPreferences();
        this.updateUserContextPanel();
        
        console.log('✅ User preferences saved:', this.userPreferences);
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #34d399);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
            z-index: 10001;
            font-weight: 600;
            animation: slideInRight 0.3s ease;
        `;
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Profile updated! AI will remember your preferences.';
        document.body.appendChild(successMsg);
        
        setTimeout(() => successMsg.remove(), 3000);
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

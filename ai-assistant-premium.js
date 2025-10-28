// Premium AI Assistant JavaScript with DeepSeek Integration

document.addEventListener('DOMContentLoaded', function() {
    // ============================
    // ELEMENTS
    // ============================
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    const sendBtn = document.getElementById('sendBtn');
    const typingIndicator = document.getElementById('typingIndicator');
    const charCount = document.getElementById('charCount');
    const newChatBtn = document.getElementById('newChatBtn');
    const clearChatBtn = document.getElementById('clearChatBtn');
    const saveChatBtn = document.getElementById('saveChatBtn');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // ============================
    // MOBILE NAVIGATION
    // ============================
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // ============================
    // CHARACTER COUNTER
    // ============================
    messageInput.addEventListener('input', () => {
        const length = messageInput.value.length;
        charCount.textContent = length;
        
        // Auto-resize textarea
        messageInput.style.height = 'auto';
        messageInput.style.height = messageInput.scrollHeight + 'px';
        
        // Enable/disable send button
        sendBtn.disabled = length === 0;
    });

    // ============================
    // QUICK ACTION BUTTONS
    // ============================
    const quickBtns = document.querySelectorAll('.quick-btn');
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const message = btn.dataset.message;
            messageInput.value = message;
            messageInput.focus();
            messageInput.dispatchEvent(new Event('input'));
        });
    });

    // ============================
    // SUGGESTION CHIPS
    // ============================
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const message = chip.dataset.message;
            messageInput.value = message;
            chatForm.dispatchEvent(new Event('submit'));
        });
    });

    // ============================
    // SEND MESSAGE
    // ============================
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const message = messageInput.value.trim();
        if (!message) return;

        // Remove suggestions after first message
        const suggestions = document.querySelector('.suggestions');
        if (suggestions) suggestions.remove();

        // Add user message to chat
        addMessage(message, 'user');

        // Clear input
        messageInput.value = '';
        messageInput.style.height = 'auto';
        charCount.textContent = '0';
        sendBtn.disabled = true;

        // Show typing indicator
        showTypingIndicator();

        // Send to AI
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    conversationHistory: getConversationHistory()
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            hideTypingIndicator();

            // Add AI response
            if (data.response) {
                addMessage(data.response, 'ai');
            } else {
                addMessage('Sorry, I encountered an error. Please try again.', 'ai');
            }

        } catch (error) {
            console.error('Error:', error);
            hideTypingIndicator();
            addMessage('Sorry, I\'m having trouble connecting right now. Please try again in a moment.', 'ai');
        }
    });

    // ============================
    // ADD MESSAGE TO CHAT
    // ============================
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = type === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

        const content = document.createElement('div');
        content.className = 'message-content';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        
        // Format message (preserve line breaks, etc.)
        bubble.innerHTML = formatMessage(text);

        const time = document.createElement('span');
        time.className = 'message-time';
        time.textContent = getCurrentTime();

        content.appendChild(bubble);
        content.appendChild(time);

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        scrollToBottom();
    }

    // ============================
    // FORMAT MESSAGE
    // ============================
    function formatMessage(text) {
        // Convert markdown-style formatting
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>')  // Italic
            .replace(/\n/g, '<br>')  // Line breaks
            .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');  // Code blocks

        // Convert lists
        formatted = formatted.replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>');
        if (formatted.includes('<li>')) {
            formatted = '<ol>' + formatted + '</ol>';
        }

        return formatted;
    }

    // ============================
    // GET CURRENT TIME
    // ============================
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // ============================
    // TYPING INDICATOR
    // ============================
    function showTypingIndicator() {
        typingIndicator.style.display = 'block';
        scrollToBottom();
    }

    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }

    // ============================
    // SCROLL TO BOTTOM
    // ============================
    function scrollToBottom() {
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }

    // ============================
    // GET CONVERSATION HISTORY
    // ============================
    function getConversationHistory() {
        const messages = chatMessages.querySelectorAll('.message');
        const history = [];

        messages.forEach(msg => {
            const text = msg.querySelector('.message-bubble').textContent;
            const isAI = msg.classList.contains('ai-message');
            
            history.push({
                role: isAI ? 'assistant' : 'user',
                content: text
            });
        });

        return history.slice(-10);  // Keep last 10 messages for context
    }

    // ============================
    // NEW CHAT
    // ============================
    newChatBtn.addEventListener('click', () => {
        if (confirm('Start a new conversation? This will clear the current chat.')) {
            // Remove all messages except welcome
            const messages = chatMessages.querySelectorAll('.message');
            messages.forEach((msg, index) => {
                if (index > 0) msg.remove();  // Keep welcome message
            });

            // Add back suggestions
            if (!document.querySelector('.suggestions')) {
                const suggestions = createSuggestions();
                chatMessages.appendChild(suggestions);
            }

            scrollToBottom();
        }
    });

    // ============================
    // CREATE SUGGESTIONS
    // ============================
    function createSuggestions() {
        const div = document.createElement('div');
        div.className = 'suggestions';
        div.innerHTML = `
            <p class="suggestions-title">Try asking:</p>
            <button class="suggestion-chip" data-message="What services do you offer?">
                What services do you offer?
            </button>
            <button class="suggestion-chip" data-message="How much does a website cost?">
                How much does a website cost?
            </button>
            <button class="suggestion-chip" data-message="Can you help with social media marketing?">
                Can you help with social media?
            </button>
            <button class="suggestion-chip" data-message="Show me your success stories">
                Show me your success stories
            </button>
        `;

        // Re-attach event listeners
        div.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const message = chip.dataset.message;
                messageInput.value = message;
                chatForm.dispatchEvent(new Event('submit'));
            });
        });

        return div;
    }

    // ============================
    // CLEAR CHAT
    // ============================
    clearChatBtn.addEventListener('click', () => {
        if (confirm('Clear all messages? This cannot be undone.')) {
            const messages = chatMessages.querySelectorAll('.message');
            messages.forEach((msg, index) => {
                if (index > 0) msg.remove();
            });

            if (!document.querySelector('.suggestions')) {
                const suggestions = createSuggestions();
                chatMessages.appendChild(suggestions);
            }
        }
    });

    // ============================
    // SAVE CHAT
    // ============================
    saveChatBtn.addEventListener('click', () => {
        const messages = chatMessages.querySelectorAll('.message');
        let chatText = 'NextReach AI Assistant Chat\n';
        chatText += '='.repeat(40) + '\n\n';

        messages.forEach(msg => {
            const isAI = msg.classList.contains('ai-message');
            const text = msg.querySelector('.message-bubble').textContent;
            const time = msg.querySelector('.message-time')?.textContent || '';

            chatText += `${isAI ? 'AI' : 'You'} (${time}):\n${text}\n\n`;
        });

        // Download as text file
        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nextreach-chat-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // ============================
    // KEYBOARD SHORTCUTS
    // ============================
    messageInput.addEventListener('keydown', (e) => {
        // Send on Enter (without Shift)
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event('submit'));
        }
    });

    // ============================
    // CONTEXT MENU (Right-click)
    // ============================
    chatMessages.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.message-bubble')) {
            e.preventDefault();
            // Could add copy, delete, etc. options here
        }
    });

    // ============================
    // AUTO-FOCUS INPUT
    // ============================
    messageInput.focus();

    // ============================
    // WELCOME ANIMATION
    // ============================
    setTimeout(() => {
        const welcomeMsg = chatMessages.querySelector('.ai-message');
        if (welcomeMsg) {
            welcomeMsg.style.animation = 'fadeInUp 0.6s ease';
        }
    }, 500);
});

// 🏆 Achievement System - Gamification to Wow Customers
const achievementSystem = {
    achievements: {
        welcome: {
            id: 'welcome',
            title: 'Welcome Aboard! 🎉',
            description: 'Created your NextReach account',
            icon: '🎉',
            color: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
        },
        firstLogin: {
            id: 'firstLogin',
            title: 'First Steps 👋',
            description: 'Logged in for the first time',
            icon: '👋',
            color: 'linear-gradient(135deg, #10b981, #34d399)'
        },
        explorer: {
            id: 'explorer',
            title: 'Explorer 🗺️',
            description: 'Visited 3 different pages',
            icon: '🗺️',
            color: 'linear-gradient(135deg, #f59e0b, #ef4444)'
        },
        aiChatter: {
            id: 'aiChatter',
            title: 'AI Enthusiast 🤖',
            description: 'Started a conversation with AI',
            icon: '🤖',
            color: 'linear-gradient(135deg, #8b5cf6, #ec4899)'
        },
        bookingMade: {
            id: 'bookingMade',
            title: 'Ready to Grow 📞',
            description: 'Booked your first consultation',
            icon: '📞',
            color: 'linear-gradient(135deg, #06b6d4, #3b82f6)'
        },
        profileComplete: {
            id: 'profileComplete',
            title: 'All Set! ✨',
            description: 'Completed your profile 100%',
            icon: '✨',
            color: 'linear-gradient(135deg, #14b8a6, #10b981)'
        },
        earlyAdopter: {
            id: 'earlyAdopter',
            title: 'Early Adopter 🚀',
            description: 'Joined NextReach in its early days',
            icon: '🚀',
            color: 'linear-gradient(135deg, #f97316, #fb923c)'
        },
        loyalUser: {
            id: 'loyalUser',
            title: 'Loyal User 💎',
            description: 'Active for 7 days',
            icon: '💎',
            color: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
        }
    },

    init() {
        this.checkAndAwardAchievements();
    },

    checkAndAwardAchievements() {
        const user = this.getCurrentUser();
        if (!user) return;

        // Check for new achievements
        this.checkExplorer();
        this.checkEarlyAdopter();
        this.checkLoyalUser();
    },

    getCurrentUser() {
        const userData = localStorage.getItem('nextreach_user');
        return userData ? JSON.parse(userData) : null;
    },

    getUserAchievements() {
        return JSON.parse(localStorage.getItem('nextreach_achievements') || '[]');
    },

    hasAchievement(achievementId) {
        const achievements = this.getUserAchievements();
        return achievements.includes(achievementId);
    },

    unlockAchievement(achievementId) {
        // Check if already unlocked
        if (this.hasAchievement(achievementId)) return;

        // Add to user's achievements
        const achievements = this.getUserAchievements();
        achievements.push(achievementId);
        localStorage.setItem('nextreach_achievements', JSON.stringify(achievements));

        // Show achievement notification
        const achievement = this.achievements[achievementId];
        if (achievement) {
            this.showAchievementNotification(achievement);
        }
    },

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon" style="background: ${achievement.color}">
                    <span style="font-size: 2rem;">${achievement.icon}</span>
                </div>
                <div class="achievement-text">
                    <div class="achievement-badge">🏆 Achievement Unlocked!</div>
                    <div class="achievement-title">${achievement.title}</div>
                    <div class="achievement-description">${achievement.description}</div>
                </div>
            </div>
            <div class="achievement-progress"></div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);

        // Create confetti
        this.createAchievementConfetti();

        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 400);
        }, 5000);

        // Play sound (optional - can be added later)
        this.playAchievementSound();
    },

    createAchievementConfetti() {
        const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'achievement-confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }
    },

    playAchievementSound() {
        // Simple beep using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            // Audio not available, silently fail
        }
    },

    // Specific achievement checks
    checkExplorer() {
        if (this.hasAchievement('explorer')) return;

        const visitedPages = JSON.parse(localStorage.getItem('nextreach_visited_pages') || '[]');
        const currentPage = window.location.pathname.split('/').pop();
        
        if (!visitedPages.includes(currentPage)) {
            visitedPages.push(currentPage);
            localStorage.setItem('nextreach_visited_pages', JSON.stringify(visitedPages));
        }

        if (visitedPages.length >= 3) {
            this.unlockAchievement('explorer');
        }
    },

    checkEarlyAdopter() {
        if (this.hasAchievement('earlyAdopter')) return;

        const user = this.getCurrentUser();
        if (!user) return;

        // Award to users who join in the first month (customize as needed)
        const joinDate = new Date(user.createdAt);
        const cutoffDate = new Date('2024-12-31'); // Adjust this date

        if (joinDate < cutoffDate) {
            this.unlockAchievement('earlyAdopter');
        }
    },

    checkLoyalUser() {
        if (this.hasAchievement('loyalUser')) return;

        const user = this.getCurrentUser();
        if (!user) return;

        const joinDate = new Date(user.createdAt);
        const daysSinceJoin = Math.floor((Date.now() - joinDate) / (1000 * 60 * 60 * 24));

        if (daysSinceJoin >= 7) {
            this.unlockAchievement('loyalUser');
        }
    },

    // Manual triggers for specific actions
    onAIChat() {
        this.unlockAchievement('aiChatter');
    },

    onBooking() {
        this.unlockAchievement('bookingMade');
    },

    onProfileComplete() {
        this.unlockAchievement('profileComplete');
    }
};

// Add achievement styles
if (!document.getElementById('achievement-styles')) {
    const style = document.createElement('style');
    style.id = 'achievement-styles';
    style.textContent = `
        .achievement-notification {
            position: fixed;
            top: -200px;
            right: 20px;
            width: 380px;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
            z-index: 100000;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            overflow: hidden;
        }

        .achievement-notification.show {
            top: 20px;
        }

        .achievement-content {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.5rem;
        }

        .achievement-icon {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .achievement-text {
            flex: 1;
        }

        .achievement-badge {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #8b5cf6;
            margin-bottom: 0.25rem;
        }

        .achievement-title {
            font-size: 1.25rem;
            font-weight: 800;
            color: #1e293b;
            margin-bottom: 0.25rem;
        }

        .achievement-description {
            font-size: 0.875rem;
            color: #64748b;
        }

        .achievement-progress {
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
            animation: progressBar 5s linear;
        }

        @keyframes progressBar {
            from { width: 100%; }
            to { width: 0%; }
        }

        .achievement-confetti {
            position: fixed;
            width: 10px;
            height: 10px;
            top: -10px;
            border-radius: 2px;
            animation: confettiFall linear forwards;
            z-index: 99999;
        }

        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }

        @media (max-width: 768px) {
            .achievement-notification {
                width: calc(100% - 40px);
                left: 20px;
                right: 20px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => achievementSystem.init());
} else {
    achievementSystem.init();
}

// Make globally available
window.achievementSystem = achievementSystem;

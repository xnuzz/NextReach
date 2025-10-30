// Enhanced Session Manager with Profile Avatars & Welcome Animation
const sessionManager = {
    currentUser: null,
    
    init() {
        this.checkAuth();
        this.updateNavigation();
    },
    
    checkAuth() {
        const userData = localStorage.getItem('nextreach_user');
        if (userData) {
            try {
                this.currentUser = JSON.parse(userData);
            } catch (error) {
                console.error('Error parsing user data:', error);
                this.logout();
            }
        }
    },
    
    getCurrentUser() {
        if (!this.currentUser) {
            this.checkAuth();
        }
        return this.currentUser;
    },
    
    isLoggedIn() {
        return this.currentUser !== null;
    },
    
    updateNavigation() {
        const user = this.getCurrentUser();
        const loginBtn = document.getElementById('nav-login');
        const getStartedBtn = document.getElementById('nav-get-started');
        const profileBtn = document.getElementById('user-profile');
        const displayName = document.getElementById('user-display-name');
        const dropdownName = document.getElementById('dropdown-user-name');
        const dropdownEmail = document.getElementById('dropdown-user-email');
        
        if (user) {
            // User is logged in
            if (loginBtn) loginBtn.style.display = 'none';
            if (profileBtn) {
                profileBtn.style.display = 'flex';
                
                // Generate profile avatar with initials and color
                const avatar = profileBtn.querySelector('.user-avatar');
                if (avatar) {
                    const initials = this.getInitials(user);
                    const color = this.getAvatarColor(user);
                    avatar.innerHTML = `<span style="font-weight: 700; font-size: 1rem;">${initials}</span>`;
                    avatar.style.background = color;
                }
                
                // Update display name
                if (displayName) {
                    displayName.textContent = user.firstName;
                }
            }
            
            // Update dropdown info
            if (dropdownName) {
                dropdownName.textContent = `${user.firstName} ${user.lastName}`;
            }
            if (dropdownEmail) {
                dropdownEmail.textContent = user.email;
            }
            
            // Update dropdown avatar
            const dropdownAvatar = document.querySelector('.user-avatar-large');
            if (dropdownAvatar) {
                const initials = this.getInitials(user);
                const color = this.getAvatarColor(user);
                dropdownAvatar.innerHTML = `<span style="font-weight: 800; font-size: 1.8rem;">${initials}</span>`;
                dropdownAvatar.style.background = color;
            }
            
            // Change "Get Started" to "Dashboard" for logged-in users
            if (getStartedBtn) {
                getStartedBtn.href = 'dashboard.html';
                const btnText = getStartedBtn.querySelector('.nav-btn-text');
                const btnIcon = getStartedBtn.querySelector('i');
                if (btnText) btnText.textContent = 'Dashboard';
                if (btnIcon) btnIcon.className = 'fas fa-tachometer-alt';
            }
        } else {
            // User is not logged in
            if (loginBtn) loginBtn.style.display = 'flex';
            if (profileBtn) profileBtn.style.display = 'none';
            
            // Reset "Dashboard" back to "Get Started"
            if (getStartedBtn) {
                getStartedBtn.href = 'pricing.html';
                const btnText = getStartedBtn.querySelector('.nav-btn-text');
                const btnIcon = getStartedBtn.querySelector('i');
                if (btnText) btnText.textContent = 'Get Started';
                if (btnIcon) btnIcon.className = 'fas fa-rocket';
            }
        }
    },
    
    getInitials(user) {
        const firstInitial = user.firstName ? user.firstName.charAt(0).toUpperCase() : '';
        const lastInitial = user.lastName ? user.lastName.charAt(0).toUpperCase() : '';
        return firstInitial + lastInitial;
    },
    
    getAvatarColor(user) {
        // Generate consistent color based on user's name
        const colors = [
            'linear-gradient(135deg, #3b82f6, #8b5cf6)', // Blue to Purple
            'linear-gradient(135deg, #10b981, #34d399)', // Green
            'linear-gradient(135deg, #f59e0b, #ef4444)', // Orange to Red
            'linear-gradient(135deg, #8b5cf6, #ec4899)', // Purple to Pink
            'linear-gradient(135deg, #06b6d4, #3b82f6)', // Cyan to Blue
            'linear-gradient(135deg, #14b8a6, #10b981)', // Teal to Green
            'linear-gradient(135deg, #f97316, #fb923c)', // Orange
            'linear-gradient(135deg, #6366f1, #8b5cf6)', // Indigo to Purple
        ];
        
        // Use first character of name to determine color
        const charCode = user.firstName.charCodeAt(0) + user.lastName.charCodeAt(0);
        const colorIndex = charCode % colors.length;
        return colors[colorIndex];
    },
    
    logout() {
        localStorage.removeItem('nextreach_user');
        this.currentUser = null;
        
        // Show logout notification
        this.showNotification('👋 Logged out successfully', 'success');
        
        // Reload after short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    },
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1.25rem 1.75rem;
            background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #34d399)' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)'};
            color: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 100000;
            font-weight: 600;
            font-size: 1rem;
            animation: slideInRight 0.4s ease, fadeOut 0.4s ease 2.6s forwards;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        `;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}" style="font-size: 1.25rem;"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 3000);
    }
};

// Add notification animations
if (!document.getElementById('notification-animations')) {
    const style = document.createElement('style');
    style.id = 'notification-animations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateX(400px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Auto-initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => sessionManager.init());
} else {
    sessionManager.init();
}

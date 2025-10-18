// Session Manager - Handles user authentication state across the site
class SessionManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user is logged in
        this.checkAuth();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Update UI based on auth state
        this.updateUI();
    }

    checkAuth() {
        // Get current user from localStorage
        const userData = localStorage.getItem('nextreach_user');
        
        if (userData) {
            try {
                this.currentUser = JSON.parse(userData);
                document.body.classList.add('user-logged-in');
            } catch (error) {
                console.error('Error parsing user data:', error);
                this.logout();
            }
        } else {
            document.body.classList.remove('user-logged-in');
        }
    }

    updateUI() {
        if (this.currentUser) {
            // Update user profile display
            const userNameDisplay = document.getElementById('userNameDisplay');
            const userFullName = document.getElementById('userFullName');
            const userEmail = document.getElementById('userEmail');
            
            if (userNameDisplay) {
                userNameDisplay.textContent = this.currentUser.firstName;
            }
            
            if (userFullName) {
                userFullName.textContent = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
            }
            
            if (userEmail) {
                userEmail.textContent = this.currentUser.email;
            }
        }
    }

    setupEventListeners() {
        // Profile button toggle
        const profileBtn = document.getElementById('userProfileBtn');
        const dropdown = document.getElementById('userDropdown');
        
        if (profileBtn && dropdown) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                profileBtn.classList.toggle('active');
                dropdown.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
                    profileBtn.classList.remove('active');
                    dropdown.classList.remove('active');
                }
            });
        }
        
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
        
        // Profile link
        const profileLink = document.getElementById('profileLink');
        if (profileLink) {
            profileLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showProfile();
            });
        }
        
        // Settings link
        const settingsLink = document.getElementById('settingsLink');
        if (settingsLink) {
            settingsLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSettings();
            });
        }
    }

    logout() {
        // Clear user session
        localStorage.removeItem('nextreach_user');
        localStorage.removeItem('nextreach_remember');
        this.currentUser = null;
        
        // Update UI
        document.body.classList.remove('user-logged-in');
        
        // Show confirmation
        this.showNotification('Logged out successfully', 'success');
        
        // Reload page after a short delay
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    showProfile() {
        // Create and show profile modal
        const modal = this.createProfileModal();
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    createProfileModal() {
        const modal = document.createElement('div');
        modal.className = 'profile-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>My Profile</h2>
                    <button class="modal-close" onclick="this.closest('.profile-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="profile-info">
                        <div class="profile-avatar-large">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="profile-details">
                            <h3>${this.currentUser.firstName} ${this.currentUser.lastName}</h3>
                            <p class="profile-email">${this.currentUser.email}</p>
                            <p class="profile-joined">Member since ${new Date(this.currentUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>
                    
                    <div class="profile-section">
                        <h4>Business Information</h4>
                        <div class="info-grid">
                            <div class="info-item">
                                <i class="fas fa-briefcase"></i>
                                <div>
                                    <label>Business Type</label>
                                    <p>${this.formatBusinessType(this.currentUser.preferences?.businessType)}</p>
                                </div>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-users"></i>
                                <div>
                                    <label>Company Size</label>
                                    <p>${this.formatCompanySize(this.currentUser.preferences?.companySize)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="profile-section">
                        <h4>Account Statistics</h4>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <i class="fas fa-comments"></i>
                                <div>
                                    <p class="stat-number">${this.currentUser.chats?.length || 0}</p>
                                    <p class="stat-label">Saved Chats</p>
                                </div>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-robot"></i>
                                <div>
                                    <p class="stat-number">Premium</p>
                                    <p class="stat-label">AI Access</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="this.closest('.profile-modal').remove()">Close</button>
                </div>
            </div>
        `;
        
        // Close on overlay click
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.remove();
        });
        
        return modal;
    }

    showSettings() {
        // Create and show settings modal
        const modal = this.createSettingsModal();
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    createSettingsModal() {
        const modal = document.createElement('div');
        modal.className = 'profile-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Settings</h2>
                    <button class="modal-close" onclick="this.closest('.profile-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="settings-section">
                        <h4>Preferences</h4>
                        <div class="setting-item">
                            <div class="setting-info">
                                <i class="fas fa-envelope"></i>
                                <div>
                                    <label>Marketing Emails</label>
                                    <p>Receive tips, trends, and updates</p>
                                </div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" ${this.currentUser.preferences?.marketingEmails ? 'checked' : ''}>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="settings-section">
                        <h4>Account Actions</h4>
                        <button class="settings-btn" onclick="alert('Password change coming soon!')">
                            <i class="fas fa-key"></i>
                            <span>Change Password</span>
                        </button>
                        <button class="settings-btn danger" onclick="confirm('Are you sure you want to delete your account?') && alert('Account deletion coming soon!')">
                            <i class="fas fa-trash"></i>
                            <span>Delete Account</span>
                        </button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="this.closest('.profile-modal').remove()">Close</button>
                    <button class="btn btn-primary" onclick="alert('Settings saved!'); this.closest('.profile-modal').remove()">Save Changes</button>
                </div>
            </div>
        `;
        
        // Close on overlay click
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.remove();
        });
        
        return modal;
    }

    formatBusinessType(type) {
        const types = {
            'digital-marketing': 'Digital Marketing',
            'web-development': 'Web Development',
            'social-media': 'Social Media Management',
            'seo': 'SEO Services',
            'content-creation': 'Content Creation',
            'ecommerce': 'E-commerce',
            'ai-automation': 'AI & Automation',
            'consulting': 'Consulting',
            'general': 'General Business'
        };
        return types[type] || 'Not specified';
    }

    formatCompanySize(size) {
        const sizes = {
            'solo': 'Solo Entrepreneur',
            '2-10': '2-10 employees',
            '11-50': '11-50 employees',
            '51-200': '51-200 employees',
            '201+': '201+ employees'
        };
        return sizes[size] || 'Not specified';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize session manager when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.sessionManager = new SessionManager();
    });
} else {
    window.sessionManager = new SessionManager();
}

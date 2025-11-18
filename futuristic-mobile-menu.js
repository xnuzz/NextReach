/* ===============================================
   FUTURISTIC MOBILE MENU JAVASCRIPT
   Advanced functionality with all navbar buttons
   =============================================== */

class FuturisticMobileMenu {
    constructor() {
        // Prevent multiple instances (singleton pattern)
        if (window.futuristicMobileMenuInstance) {
            console.log('FuturisticMobileMenu instance already exists, returning existing instance');
            return window.futuristicMobileMenuInstance;
        }
        
        window.futuristicMobileMenuInstance = this;
        this.init();
    }

    init() {
        console.log('Initializing FuturisticMobileMenu...');
        try {
            console.log('Step 1: Creating mobile menu HTML...');
            this.createMobileMenuHTML();
            console.log('Step 2: Binding events...');
            this.bindEvents();
            console.log('Step 3: Updating user state...');
            this.updateUserState();
            console.log('Step 4: Handling active states...');
            this.handleActiveStates();
            console.log('FuturisticMobileMenu initialized successfully');
        } catch (error) {
            console.error('Error in init step:', error);
        }
    }

    createMobileMenuHTML() {
        // Remove existing mobile menu if it exists
        const existingMenu = document.querySelector('.mobile-menu-overlay');
        if (existingMenu) {
            existingMenu.remove();
        }

        // Create the futuristic mobile menu
        const mobileMenuHTML = `
            <div class="mobile-menu-overlay" id="mobile-menu-overlay">
                <div class="mobile-menu-content">
                    <!-- Header -->
                    <div class="mobile-menu-header">
                        <div class="mobile-menu-logo">
                            <img src="NextReach.svg" alt="NextReach" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div class="logo-fallback" style="display: none; font-size: 1.2rem; font-weight: 800; color: white; align-items: center; justify-content: center;">NR</div>
                        </div>
                        <h2 class="mobile-menu-title">NextReach</h2>
                        <p class="mobile-menu-subtitle">Your Complete Digital Partner</p>
                    </div>

                    <!-- Navigation Links -->
                    <div class="mobile-nav-section">
                        <div class="mobile-nav-section-title">Navigation</div>
                        <ul class="mobile-nav-links">
                            <li class="mobile-nav-item">
                                <a href="index.html" class="mobile-nav-link" data-page="home">
                                    <i class="fas fa-home"></i>
                                    <span>Home</span>
                                </a>
                            </li>
                            <li class="mobile-nav-item">
                                <a href="services.html" class="mobile-nav-link" data-page="services">
                                    <i class="fas fa-cogs"></i>
                                    <span>Services</span>
                                </a>
                            </li>
                            <li class="mobile-nav-item">
                                <a href="pricing.html" class="mobile-nav-link" data-page="pricing">
                                    <i class="fas fa-tag"></i>
                                    <span>Pricing</span>
                                </a>
                            </li>
                            <li class="mobile-nav-item">
                                <a href="about.html" class="mobile-nav-link" data-page="about">
                                    <i class="fas fa-info-circle"></i>
                                    <span>About</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Action Buttons -->
                    <div class="mobile-actions-section">
                        <div class="mobile-nav-section-title">Quick Actions</div>
                        <a href="ai-claude.html" class="mobile-action-btn ai">
                            <i class="fas fa-robot"></i>
                            <span>AI Assistant</span>
                        </a>
                        <a href="booking.html" class="mobile-action-btn book">
                            <i class="fas fa-calendar-check"></i>
                            <span>Book Call</span>
                        </a>
                        <a href="login.html" class="mobile-action-btn login" id="mobile-login-btn">
                            <i class="fas fa-sign-in-alt"></i>
                            <span>Login</span>
                        </a>
                        <a href="pricing.html" class="mobile-action-btn primary" id="mobile-get-started-btn">
                            <i class="fas fa-rocket"></i>
                            <span>Get Started</span>
                        </a>
                    </div>

                    <!-- User Profile Section (hidden by default) -->
                    <div class="mobile-user-section" id="mobile-user-section">
                        <div class="mobile-user-info">
                            <div class="mobile-user-avatar" id="mobile-user-avatar">
                                U
                            </div>
                            <div class="mobile-user-details">
                                <h3 id="mobile-user-name">User Name</h3>
                                <p id="mobile-user-email">user@example.com</p>
                            </div>
                        </div>
                        <div class="mobile-user-actions">
                            <a href="#" class="mobile-user-action" id="mobile-edit-profile">
                                <i class="fas fa-edit"></i> Profile
                            </a>
                            <a href="#" class="mobile-user-action" id="mobile-logout">
                                <i class="fas fa-sign-out-alt"></i> Logout
                            </a>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="mobile-menu-footer">
                        <p>&copy; 2025 NextReach. All rights reserved.</p>
                    </div>
                </div>
            </div>
        `;

        // Insert the mobile menu into the DOM
        document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
    }

    bindEvents() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        const body = document.body;

        if (!hamburger) {
            console.warn('Hamburger button not found, retrying in 100ms...');
            setTimeout(() => this.bindEvents(), 100);
            return;
        }
        
        if (!mobileMenuOverlay) {
            console.warn('Mobile menu overlay not found');
            return;
        }

        // Check if hamburger already has our event listener
        if (hamburger.dataset.listenerAttached === 'true') {
            console.log('Event listener already attached, skipping');
            return;
        }
        
        // Hamburger click event
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked - calling toggleMenu');
            this.toggleMenu();
        });
        
        // Mark that we've attached the listener
        hamburger.dataset.listenerAttached = 'true';

        // Click outside to close
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                this.closeMenu();
            }
        });

        // Close menu when clicking on links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-action-btn');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
                this.closeMenu();
                hamburger.focus();
            }
        });

        // User actions
        this.bindUserActions();

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                this.closeMenu();
            }
        });
    }

    bindUserActions() {
        // Mobile logout
        const mobileLogout = document.getElementById('mobile-logout');
        if (mobileLogout) {
            mobileLogout.addEventListener('click', (e) => {
                e.preventDefault();
                if (typeof sessionManager !== 'undefined') {
                    sessionManager.logout();
                    window.location.reload();
                } else {
                    // Fallback logout
                    localStorage.removeItem('nextreach_user');
                    window.location.reload();
                }
            });
        }

        // Mobile edit profile
        const mobileEditProfile = document.getElementById('mobile-edit-profile');
        if (mobileEditProfile) {
            mobileEditProfile.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeMenu();
                // Trigger edit profile modal if function exists
                if (typeof showEditProfileModal !== 'undefined') {
                    showEditProfileModal();
                }
            });
        }
    }

    toggleMenu() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        const body = document.body;

        if (!hamburger || !mobileMenuOverlay) return;

        const isActive = mobileMenuOverlay.classList.contains('active');
        console.log('Toggling menu, currently active:', isActive);
        if (isActive) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        const body = document.body;
        const html = document.documentElement;

        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenuOverlay.classList.add('active');
        body.classList.add('nav-open', 'mobile-menu-active');
        html.classList.add('mobile-menu-active');
        
        // Prevent all scrolling
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';

        // Focus management for accessibility
        setTimeout(() => {
            const firstLink = mobileMenuOverlay.querySelector('.mobile-nav-link');
            if (firstLink) firstLink.focus();
        }, 500);

        // Update user state when menu opens
        this.updateUserState();
    }

    closeMenu() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        const body = document.body;
        const html = document.documentElement;

        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('nav-open', 'mobile-menu-active');
        html.classList.remove('mobile-menu-active');
        
        // Restore scrolling
        body.style.overflow = '';
        html.style.overflow = '';
    }

    updateUserState() {
        const user = this.getCurrentUser();
        const mobileUserSection = document.getElementById('mobile-user-section');
        const mobileLoginBtn = document.getElementById('mobile-login-btn');
        const mobileGetStartedBtn = document.getElementById('mobile-get-started-btn');

        if (user) {
            // User is logged in
            if (mobileUserSection) {
                mobileUserSection.style.display = 'block';
                
                // Update user info
                const userAvatar = document.getElementById('mobile-user-avatar');
                const userName = document.getElementById('mobile-user-name');
                const userEmail = document.getElementById('mobile-user-email');

                if (userAvatar && user.firstName && user.lastName) {
                    userAvatar.textContent = user.firstName.charAt(0) + user.lastName.charAt(0);
                } else if (userAvatar && user.name) {
                    const names = user.name.split(' ');
                    userAvatar.textContent = names[0].charAt(0) + (names[1] ? names[1].charAt(0) : '');
                }

                if (userName) userName.textContent = user.name || `${user.firstName} ${user.lastName}`;
                if (userEmail) userEmail.textContent = user.email || '';
            }

            // Hide login button, keep get started
            if (mobileLoginBtn) mobileLoginBtn.style.display = 'none';
            if (mobileGetStartedBtn) {
                mobileGetStartedBtn.innerHTML = '<i class="fas fa-tachometer-alt"></i><span>Dashboard</span>';
                mobileGetStartedBtn.href = 'dashboard.html';
            }
        } else {
            // User is not logged in
            if (mobileUserSection) mobileUserSection.style.display = 'none';
            if (mobileLoginBtn) mobileLoginBtn.style.display = 'flex';
            if (mobileGetStartedBtn) {
                mobileGetStartedBtn.innerHTML = '<i class="fas fa-rocket"></i><span>Get Started</span>';
                mobileGetStartedBtn.href = 'pricing.html';
            }
        }
    }

    handleActiveStates() {
        // Get current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Remove active class from all links
        const allLinks = document.querySelectorAll('.mobile-nav-link');
        allLinks.forEach(link => link.classList.remove('active'));

        // Add active class to current page link
        const currentLink = document.querySelector(`[data-page="${this.getPageName(currentPage)}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }
    }

    getPageName(filename) {
        const pageMap = {
            'index.html': 'home',
            '': 'home',
            'services.html': 'services',
            'pricing.html': 'pricing',
            'about.html': 'about'
        };
        return pageMap[filename] || 'home';
    }

    getCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem('nextreach_user'));
        } catch (error) {
            return null;
        }
    }

    // Public method to refresh user state (can be called from outside)
    refreshUserState() {
        this.updateUserState();
    }
}

// Initialize the futuristic mobile menu when DOM is loaded (singleton pattern)
document.addEventListener('DOMContentLoaded', function() {
    // Prevent multiple instances
    if (window.futuristicMobileMenu) {
        console.log('FuturisticMobileMenu already exists, skipping initialization');
        return;
    }
    
    // Wait a bit to ensure other scripts have loaded
    setTimeout(() => {
        console.log('Creating single FuturisticMobileMenu instance');
        window.futuristicMobileMenu = new FuturisticMobileMenu();
    }, 100);
});

// Remove the window load fallback to prevent double initialization
// The DOMContentLoaded event is sufficient

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FuturisticMobileMenu;
}
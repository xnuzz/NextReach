// Universal Navbar Session Manager
// Handles user authentication state across all pages

(function() {
    'use strict';
    
    // Wait for DOM to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbarSession);
    } else {
        initNavbarSession();
    }
    
    function initNavbarSession() {
        // Check if sessionManager exists
        if (typeof sessionManager === 'undefined') {
            console.warn('Session manager not loaded');
            return;
        }
        
        const currentUser = sessionManager.getCurrentUser();
        
        if (currentUser) {
            updateNavbarForLoggedInUser(currentUser);
        }
        
        setupDropdownHandlers();
    }
    
    function updateNavbarForLoggedInUser(user) {
        // Hide login/get-started buttons
        const loginBtn = document.getElementById('nav-login');
        const getStartedBtn = document.getElementById('nav-get-started');
        
        if (loginBtn) loginBtn.style.display = 'none';
        if (getStartedBtn) getStartedBtn.style.display = 'none';
        
        // Show user profile button
        const profileBtn = document.getElementById('user-profile');
        if (profileBtn) {
            profileBtn.style.display = 'inline-flex';
            
            // Update user name
            const userName = document.getElementById('user-display-name');
            if (userName) {
                userName.textContent = user.firstName;
            }
            
            // Update avatar with initials
            const avatar = profileBtn.querySelector('.user-avatar');
            if (avatar && user.firstName && user.lastName) {
                const initials = user.firstName.charAt(0).toUpperCase() + 
                               user.lastName.charAt(0).toUpperCase();
                avatar.textContent = initials;
            }
        }
        
        // Update dropdown info
        const dropdownName = document.getElementById('dropdown-user-name');
        const dropdownEmail = document.getElementById('dropdown-user-email');
        const memberDate = document.getElementById('member-date');
        
        if (dropdownName) {
            dropdownName.textContent = `${user.firstName} ${user.lastName}`;
        }
        if (dropdownEmail) {
            dropdownEmail.textContent = user.email;
        }
        if (memberDate && user.memberSince) {
            const date = new Date(user.memberSince);
            memberDate.textContent = date.toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
            });
        }
        
        // Update avatar in dropdown header
        const avatarLarge = document.querySelector('.user-avatar-large');
        if (avatarLarge && user.firstName && user.lastName) {
            const initials = user.firstName.charAt(0).toUpperCase() + 
                           user.lastName.charAt(0).toUpperCase();
            avatarLarge.textContent = initials;
        }
    }
    
    function setupDropdownHandlers() {
        const profileBtn = document.getElementById('user-profile');
        const dropdown = document.getElementById('user-dropdown');
        
        if (profileBtn && dropdown) {
            // Toggle dropdown on button click
            profileBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const isVisible = dropdown.classList.contains('show');
                
                if (isVisible) {
                    dropdown.classList.remove('show');
                    dropdown.style.display = 'none';
                } else {
                    dropdown.classList.add('show');
                    dropdown.style.display = 'block';
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target) && !profileBtn.contains(e.target)) {
                    dropdown.classList.remove('show');
                    dropdown.style.display = 'none';
                }
            });
            
            // Prevent dropdown from closing when clicking inside
            dropdown.addEventListener('click', function(e) {
                if (!e.target.closest('.dropdown-item')) {
                    e.stopPropagation();
                }
            });
        }
        
        // Logout handler
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (typeof sessionManager !== 'undefined') {
                    sessionManager.logout();
                }
                
                // Redirect to home page
                window.location.href = 'index.html';
            });
        }
    }
})();

// Universal Profile Dropdown Handler
// Include this script on all pages for consistent dropdown behavior

(function() {
    'use strict';
    
    function initializeProfileDropdown() {
        const profileBtn = document.getElementById('user-profile');
        const dropdown = document.getElementById('user-dropdown');
        
        if (!profileBtn || !dropdown) return;
        
        // Toggle dropdown on profile button click
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isVisible = dropdown.style.display === 'block';
            dropdown.style.display = isVisible ? 'none' : 'block';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
        
        // Close dropdown when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            }
        });
        
        // Handle logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (typeof sessionManager !== 'undefined') {
                    sessionManager.logout();
                } else {
                    localStorage.removeItem('nextreach_user');
                    window.location.href = 'index.html';
                }
            });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeProfileDropdown);
    } else {
        initializeProfileDropdown();
    }
})();

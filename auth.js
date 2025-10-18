// ================================================
// NEXTREACH AI - AUTHENTICATION SYSTEM
// User Management & Personalized AI
// 
// NOTE: This system uses BOTH LocalStorage and IndexedDB
// - LocalStorage: Quick access and backward compatibility
// - IndexedDB: Better storage via database.js (auto-synced)
// ================================================

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        console.log('🔐 Auth System initializing...');
        
        // Check if user is logged in
        this.checkAuth();
        
        // Setup event listeners
        this.setupEventListeners();
        
        console.log('✅ Auth System ready!');
    }

    checkAuth() {
        const userData = localStorage.getItem('nextreach_user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            console.log('👤 User logged in:', this.currentUser.email);
        }
    }

    setupEventListeners() {
        // Login Form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Register Form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
            
            // Password strength checker
            const registerPassword = document.getElementById('registerPassword');
            if (registerPassword) {
                registerPassword.addEventListener('input', (e) => this.checkPasswordStrength(e));
            }
        }

        // Toggle password visibility
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', (e) => this.togglePasswordVisibility(e));
        });

        // Show register from login
        const showRegister = document.getElementById('showRegister');
        if (showRegister) {
            showRegister.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'register.html';
            });
        }

        // Social login buttons
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSocialLogin(e));
        });
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const remember = document.getElementById('rememberMe').checked;
        
        // Clear previous errors
        this.clearErrors();
        
        // Validate inputs
        if (!this.validateEmail(email)) {
            this.showError('emailError', 'Please enter a valid email address');
            return;
        }
        
        if (password.length < 6) {
            this.showError('passwordError', 'Password must be at least 6 characters');
            return;
        }
        
        // Show loading state
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        
        try {
            // Simulate API call (replace with your actual API)
            await this.simulateAPICall(1000);
            
            // Check credentials (replace with real authentication)
            const users = JSON.parse(localStorage.getItem('nextreach_users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Remove password before storing
                const userData = { ...user };
                delete userData.password;
                
                // Store user data
                localStorage.setItem('nextreach_user', JSON.stringify(userData));
                
                if (remember) {
                    localStorage.setItem('nextreach_remember', 'true');
                }
                
                this.currentUser = userData;
                
                // Show success
                this.showSuccess('Login successful! Redirecting...');
                
                // Redirect to main page
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
                
            } else {
                throw new Error('Invalid credentials');
            }
            
        } catch (error) {
            console.error('Login error:', error);
            this.showError('passwordError', 'Invalid email or password. Please try again.');
            
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const businessType = document.getElementById('businessType').value;
        const companySize = document.getElementById('companySize').value;
        const termsAgree = document.getElementById('termsAgree').checked;
        const marketingEmails = document.getElementById('marketingEmails').checked;
        
        // Clear previous errors
        this.clearErrors();
        
        // Validate inputs
        let hasError = false;
        
        if (firstName.length < 2) {
            this.showError('firstNameError', 'First name must be at least 2 characters');
            hasError = true;
        }
        
        if (lastName.length < 2) {
            this.showError('lastNameError', 'Last name must be at least 2 characters');
            hasError = true;
        }
        
        if (!this.validateEmail(email)) {
            this.showError('registerEmailError', 'Please enter a valid email address');
            hasError = true;
        }
        
        if (password.length < 8) {
            this.showError('registerPasswordError', 'Password must be at least 8 characters');
            hasError = true;
        }
        
        if (password !== confirmPassword) {
            this.showError('confirmPasswordError', 'Passwords do not match');
            hasError = true;
        }
        
        if (!businessType) {
            this.showError('businessTypeError', 'Please select your primary interest');
            hasError = true;
        }
        
        if (!termsAgree) {
            this.showError('termsError', 'You must agree to the Terms of Service');
            hasError = true;
        }
        
        if (hasError) return;
        
        // Show loading state
        const registerBtn = document.getElementById('registerBtn');
        registerBtn.classList.add('loading');
        registerBtn.disabled = true;
        
        try {
            // Simulate API call
            await this.simulateAPICall(1500);
            
            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('nextreach_users') || '[]');
            if (users.some(u => u.email === email)) {
                throw new Error('Email already registered');
            }
            
            // Create user object with preferences
            const user = {
                id: Date.now().toString(),
                firstName,
                lastName,
                email,
                password, // In production, this should be hashed
                preferences: {
                    businessType,
                    companySize,
                    marketingEmails
                },
                createdAt: new Date().toISOString(),
                chats: []
            };
            
            // Save user
            users.push(user);
            localStorage.setItem('nextreach_users', JSON.stringify(users));
            
            // Auto-login
            const userData = { ...user };
            delete userData.password;
            localStorage.setItem('nextreach_user', JSON.stringify(userData));
            
            this.currentUser = userData;
            
            // Show success
            this.showSuccess('Account created successfully! Redirecting...');
            
            // Redirect to main page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
            
        } catch (error) {
            console.error('Registration error:', error);
            
            if (error.message === 'Email already registered') {
                this.showError('registerEmailError', 'This email is already registered. Please sign in.');
            } else {
                this.showError('registerEmailError', 'Registration failed. Please try again.');
            }
            
            registerBtn.classList.remove('loading');
            registerBtn.disabled = false;
        }
    }

    checkPasswordStrength(e) {
        const password = e.target.value;
        const strengthBar = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        
        if (!strengthBar || !strengthText) return;
        
        let strength = 0;
        
        // Check length
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // Check for uppercase
        if (/[A-Z]/.test(password)) strength++;
        
        // Check for lowercase
        if (/[a-z]/.test(password)) strength++;
        
        // Check for numbers
        if (/[0-9]/.test(password)) strength++;
        
        // Check for special characters
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        // Update UI
        strengthBar.className = 'strength-fill';
        
        if (strength <= 2) {
            strengthBar.classList.add('weak');
            strengthText.textContent = 'Weak password';
        } else if (strength <= 4) {
            strengthBar.classList.add('medium');
            strengthText.textContent = 'Medium password';
        } else {
            strengthBar.classList.add('strong');
            strengthText.textContent = 'Strong password';
        }
    }

    togglePasswordVisibility(e) {
        const button = e.currentTarget;
        const targetId = button.dataset.target;
        const input = document.getElementById(targetId);
        const icon = button.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    handleSocialLogin(e) {
        const provider = e.currentTarget.classList.contains('google') ? 'Google' : 'Microsoft';
        alert(`${provider} login coming soon! This will integrate with ${provider} OAuth.`);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('active');
            
            // Mark input as error
            const input = errorElement.previousElementSibling;
            if (input && (input.tagName === 'INPUT' || input.tagName === 'SELECT')) {
                input.classList.add('error');
            }
        }
    }

    clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.classList.remove('active');
            el.textContent = '';
        });
        
        document.querySelectorAll('input.error, select.error').forEach(el => {
            el.classList.remove('error');
        });
    }

    showSuccess(message) {
        // You can create a custom success notification
        console.log('✅', message);
    }

    simulateAPICall(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Logout
    logout() {
        localStorage.removeItem('nextreach_user');
        localStorage.removeItem('nextreach_remember');
        this.currentUser = null;
        window.location.href = 'login.html';
    }
}

// Initialize Auth System
const authSystem = new AuthSystem();

// Make it globally available
window.authSystem = authSystem;

console.log('✅ Authentication System loaded!');

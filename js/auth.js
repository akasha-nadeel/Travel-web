// ========================================
// AUTHENTICATION SYSTEM
// ========================================

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = [];
        this.init();
    }

    init() {
        this.loadUsers();
        this.loadCurrentUser();
        this.createAuthModal();
        this.setupEventListeners();
        this.updateUI();
    }

    loadUsers() {
        const storedUsers = localStorage.getItem('users');
        this.users = storedUsers ? JSON.parse(storedUsers) : [];
    }

    loadCurrentUser() {
        const storedUser = localStorage.getItem('currentUser');
        this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    saveCurrentUser() {
        if (this.currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }

    createAuthModal() {
        const modalHTML = `
            <div class="auth-modal-overlay" id="authModal">
                <div class="auth-modal">
                    <div class="auth-modal-header">
                        <button class="auth-modal-close" id="closeAuthModal">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <svg class="auth-modal-logo" viewBox="0 0 40 40" fill="none">
                            <path d="M20 5L35 12.5V27.5L20 35L5 27.5V12.5L20 5Z" fill="currentColor" opacity="0.2"/>
                            <path d="M20 5L35 12.5V27.5L20 35L5 27.5V12.5L20 5Z" stroke="currentColor" stroke-width="2"/>
                            <circle cx="20" cy="20" r="6" fill="currentColor"/>
                        </svg>
                        <h2 class="auth-modal-title">Welcome Back</h2>
                        <p class="auth-modal-subtitle">Sign in to access your bookings and saved trips</p>
                    </div>
                    <div class="auth-modal-body">
                        <div class="auth-tabs">
                            <button class="auth-tab active" data-tab="login">Sign In</button>
                            <button class="auth-tab" data-tab="signup">Sign Up</button>
                        </div>

                        <div class="auth-success-message" id="authSuccessMessage"></div>

                        <!-- Login Form -->
                        <form class="auth-form active" id="loginForm">
                            <div class="auth-form-group">
                                <label class="auth-form-label" for="loginEmail">Email Address</label>
                                <input type="email" class="auth-form-input" id="loginEmail" placeholder="john@example.com" required>
                                <div class="auth-form-error" id="loginEmailError"></div>
                            </div>
                            <div class="auth-form-group">
                                <label class="auth-form-label" for="loginPassword">Password</label>
                                <div class="password-input-wrapper">
                                    <input type="password" class="auth-form-input" id="loginPassword" placeholder="Enter your password" required>
                                    <button type="button" class="password-toggle" data-target="loginPassword">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7Z" stroke="currentColor" stroke-width="2"/>
                                            <path d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z" stroke="currentColor" stroke-width="2"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="auth-form-error" id="loginPasswordError"></div>
                            </div>
                            <div class="auth-form-options">
                                <div class="auth-checkbox-wrapper">
                                    <input type="checkbox" class="auth-checkbox" id="rememberMe">
                                    <label class="auth-checkbox-label" for="rememberMe">Remember me</label>
                                </div>
                                <a href="#" class="auth-forgot-link">Forgot password?</a>
                            </div>
                            <button type="submit" class="auth-submit-btn">Sign In</button>
                        </form>

                        <!-- Signup Form -->
                        <form class="auth-form" id="signupForm">
                            <div class="auth-form-group">
                                <label class="auth-form-label" for="signupName">Full Name</label>
                                <input type="text" class="auth-form-input" id="signupName" placeholder="John Doe" required>
                                <div class="auth-form-error" id="signupNameError"></div>
                            </div>
                            <div class="auth-form-group">
                                <label class="auth-form-label" for="signupEmail">Email Address</label>
                                <input type="email" class="auth-form-input" id="signupEmail" placeholder="john@example.com" required>
                                <div class="auth-form-error" id="signupEmailError"></div>
                            </div>
                            <div class="auth-form-group">
                                <label class="auth-form-label" for="signupPassword">Password</label>
                                <div class="password-input-wrapper">
                                    <input type="password" class="auth-form-input" id="signupPassword" placeholder="Create a password" required>
                                    <button type="button" class="password-toggle" data-target="signupPassword">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7Z" stroke="currentColor" stroke-width="2"/>
                                            <path d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z" stroke="currentColor" stroke-width="2"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="auth-form-error" id="signupPasswordError"></div>
                            </div>
                            <div class="auth-form-group">
                                <label class="auth-form-label" for="signupConfirmPassword">Confirm Password</label>
                                <div class="password-input-wrapper">
                                    <input type="password" class="auth-form-input" id="signupConfirmPassword" placeholder="Confirm your password" required>
                                    <button type="button" class="password-toggle" data-target="signupConfirmPassword">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7Z" stroke="currentColor" stroke-width="2"/>
                                            <path d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z" stroke="currentColor" stroke-width="2"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="auth-form-error" id="signupConfirmPasswordError"></div>
                            </div>
                            <button type="submit" class="auth-submit-btn">Create Account</button>
                            <div class="auth-terms">
                                By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                            </div>
                        </form>

                        <div class="auth-divider">
                            <div class="auth-divider-line"></div>
                            <span class="auth-divider-text">OR</span>
                            <div class="auth-divider-line"></div>
                        </div>

                        <div class="auth-social-buttons">
                            <button class="auth-social-btn" id="googleLogin">
                                <svg viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Google
                            </button>
                            <button class="auth-social-btn" id="facebookLogin">
                                <svg viewBox="0 0 24 24">
                                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    setupEventListeners() {
        // Modal open/close
        const userBtn = document.getElementById('userBtn');
        if (userBtn) {
            userBtn.addEventListener('click', () => {
                if (this.currentUser) {
                    this.toggleUserDropdown();
                } else {
                    this.openAuthModal();
                }
            });
        }

        document.getElementById('closeAuthModal')?.addEventListener('click', () => this.closeAuthModal());
        document.getElementById('authModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'authModal') this.closeAuthModal();
        });

        // Tab switching
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Password toggle
        document.querySelectorAll('.password-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => this.togglePassword(e.currentTarget));
        });

        // Form submissions
        document.getElementById('loginForm')?.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signupForm')?.addEventListener('submit', (e) => this.handleSignup(e));

        // Social logins (mock)
        document.getElementById('googleLogin')?.addEventListener('click', () => this.handleSocialLogin('Google'));
        document.getElementById('facebookLogin')?.addEventListener('click', () => this.handleSocialLogin('Facebook'));
    }

    openAuthModal() {
        document.getElementById('authModal')?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeAuthModal() {
        document.getElementById('authModal')?.classList.remove('active');
        document.body.style.overflow = '';
        this.clearForms();
    }

    switchTab(tab) {
        // Update tabs
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');

        // Update forms
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        document.getElementById(`${tab}Form`)?.classList.add('active');

        // Update title
        const title = document.querySelector('.auth-modal-title');
        const subtitle = document.querySelector('.auth-modal-subtitle');

        if (tab === 'login') {
            title.textContent = 'Welcome Back';
            subtitle.textContent = 'Sign in to access your bookings and saved trips';
        } else {
            title.textContent = 'Create Account';
            subtitle.textContent = 'Join us to start planning your Sri Lankan adventure';
        }

        this.clearForms();
    }

    togglePassword(button) {
        const targetId = button.dataset.target;
        const input = document.getElementById(targetId);

        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    }

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    validatePassword(password) {
        return password.length >= 6;
    }

    showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        const inputElement = document.getElementById(fieldId);

        if (errorElement && inputElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
            inputElement.classList.add('error');
        }
    }

    clearError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        const inputElement = document.getElementById(fieldId);

        if (errorElement && inputElement) {
            errorElement.classList.remove('show');
            inputElement.classList.remove('error');
        }
    }

    clearForms() {
        document.querySelectorAll('.auth-form-error').forEach(e => e.classList.remove('show'));
        document.querySelectorAll('.auth-form-input').forEach(i => i.classList.remove('error'));
        document.getElementById('loginForm')?.reset();
        document.getElementById('signupForm')?.reset();
    }

    showSuccess(message) {
        const successElement = document.getElementById('authSuccessMessage');
        if (successElement) {
            successElement.textContent = message;
            successElement.classList.add('show');
            setTimeout(() => successElement.classList.remove('show'), 3000);
        }
    }

    handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Clear previous errors
        this.clearError('loginEmail');
        this.clearError('loginPassword');

        // Validate
        if (!this.validateEmail(email)) {
            this.showError('loginEmail', 'Please enter a valid email address');
            return;
        }

        if (!password) {
            this.showError('loginPassword', 'Please enter your password');
            return;
        }

        // Find user
        const user = this.users.find(u => u.email === email && u.password === password);

        if (user) {
            this.currentUser = { ...user };
            delete this.currentUser.password; // Don't store password in currentUser
            this.saveCurrentUser();
            this.updateUI();
            this.closeAuthModal();
            this.showSuccess('Welcome back!');
        } else {
            this.showError('loginPassword', 'Invalid email or password');
        }
    }

    handleSignup(e) {
        e.preventDefault();

        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;

        // Clear previous errors
        this.clearError('signupName');
        this.clearError('signupEmail');
        this.clearError('signupPassword');
        this.clearError('signupConfirmPassword');

        // Validate
        if (!name) {
            this.showError('signupName', 'Please enter your full name');
            return;
        }

        if (!this.validateEmail(email)) {
            this.showError('signupEmail', 'Please enter a valid email address');
            return;
        }

        // Check if email already exists
        if (this.users.find(u => u.email === email)) {
            this.showError('signupEmail', 'This email is already registered');
            return;
        }

        if (!this.validatePassword(password)) {
            this.showError('signupPassword', 'Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            this.showError('signupConfirmPassword', 'Passwords do not match');
            return;
        }

        // Create user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            avatar: name.charAt(0).toUpperCase(),
            memberSince: new Date().toISOString(),
            bookings: [],
            wishlist: [],
            savedTrips: []
        };

        this.users.push(newUser);
        this.saveUsers();

        // Auto login
        this.currentUser = { ...newUser };
        delete this.currentUser.password;
        this.saveCurrentUser();

        this.updateUI();
        this.closeAuthModal();
        this.showSuccess('Account created successfully!');
    }

    handleSocialLogin(provider) {
        // Mock social login
        const mockUser = {
            id: Date.now().toString(),
            name: `${provider} User`,
            email: `user@${provider.toLowerCase()}.com`,
            avatar: provider.charAt(0),
            memberSince: new Date().toISOString(),
            bookings: [],
            wishlist: [],
            savedTrips: []
        };

        this.currentUser = mockUser;
        this.saveCurrentUser();
        this.updateUI();
        this.closeAuthModal();
        this.showSuccess(`Signed in with ${provider}!`);
    }

    updateUI() {
        const userBtn = document.getElementById('userBtn');

        if (this.currentUser) {
            // User is logged in - show user dropdown
            if (userBtn && !userBtn.classList.contains('user-dropdown-btn')) {
                userBtn.outerHTML = `
                    <div class="user-dropdown" id="userDropdown">
                        <button class="user-dropdown-btn" id="userBtn">
                            <div class="user-avatar">${this.currentUser.avatar}</div>
                            <span class="user-name">${this.currentUser.name.split(' ')[0]}</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <div class="user-dropdown-menu" id="userDropdownMenu">
                            <div class="user-dropdown-header">
                                <div class="user-dropdown-name">${this.currentUser.name}</div>
                                <div class="user-dropdown-email">${this.currentUser.email}</div>
                            </div>
                            <a href="profile.html" class="user-dropdown-item">
                                <svg viewBox="0 0 20 20" fill="none">
                                    <circle cx="10" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                                    <path d="M3 18C3 14.134 6.134 11 10 11C13.866 11 17 14.134 17 18" stroke="currentColor" stroke-width="2"/>
                                </svg>
                                My Profile
                            </a>
                            <a href="#" class="user-dropdown-item" id="myBookingsLink">
                                <svg viewBox="0 0 20 20" fill="none">
                                    <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                                    <path d="M3 8H17" stroke="currentColor" stroke-width="2"/>
                                </svg>
                                My Bookings
                            </a>
                            <a href="trip-planner.html" class="user-dropdown-item">
                                <svg viewBox="0 0 20 20" fill="none">
                                    <path d="M10 2C6.68629 2 4 4.68629 4 8C4 12 10 18 10 18C10 18 16 12 16 8C16 4.68629 13.3137 2 10 2Z" stroke="currentColor" stroke-width="2"/>
                                </svg>
                                Saved Trips
                            </a>
                            <div class="user-dropdown-divider"></div>
                            <a href="#" class="user-dropdown-item" id="settingsLink">
                                <svg viewBox="0 0 20 20" fill="none">
                                    <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                                    <path d="M10 1V4M10 16V19M19 10H16M4 10H1M16.95 16.95L14.83 14.83M5.17 5.17L3.05 3.05M16.95 3.05L14.83 5.17M5.17 14.83L3.05 16.95" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                                Settings
                            </a>
                            <a href="#" class="user-dropdown-item logout" id="logoutBtn">
                                <svg viewBox="0 0 20 20" fill="none">
                                    <path d="M13 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H13M8 7L12 10L8 13M12 10H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Logout
                            </a>
                        </div>
                    </div>
                `;

                // Re-setup event listeners
                document.getElementById('userBtn')?.addEventListener('click', () => this.toggleUserDropdown());
                document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.logout();
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    const dropdown = document.getElementById('userDropdown');
                    if (dropdown && !dropdown.contains(e.target)) {
                        document.getElementById('userDropdownMenu')?.classList.remove('active');
                    }
                });
            }
        } else {
            // User is logged out - show login button
            const dropdown = document.getElementById('userDropdown');
            if (dropdown) {
                dropdown.outerHTML = `
                    <button class="btn-icon" id="userBtn" aria-label="User account">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                            <path d="M3 18C3 14.134 6.134 11 10 11C13.866 11 17 14.134 17 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                `;

                document.getElementById('userBtn')?.addEventListener('click', () => this.openAuthModal());
            }
        }
    }

    toggleUserDropdown() {
        const menu = document.getElementById('userDropdownMenu');
        menu?.classList.toggle('active');
    }

    logout() {
        this.currentUser = null;
        this.saveCurrentUser();
        this.updateUI();
        this.showSuccess('Logged out successfully');

        // Redirect to home if on profile page
        if (window.location.pathname.includes('profile.html')) {
            window.location.href = 'index.html';
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }
}

// Initialize auth system
const authSystem = new AuthSystem();

// Export for use in other files
window.authSystem = authSystem;

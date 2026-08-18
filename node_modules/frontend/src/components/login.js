/**
 * VibeMap Login Script
 * Handles authentication, form validation, and social login
 */

// ========================
// Initialize on DOM Load
// ========================
document.addEventListener('DOMContentLoaded', () => {
    initializePasswordToggle();
    initializeSocialLogin();
    initializeFormSubmit();
    loadSavedEmail();
});

// ========================
// PASSWORD TOGGLE
// ========================
function initializePasswordToggle() {
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = passwordToggle.querySelector('.material-symbols-outlined');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.textContent = 'visibility_off';
            } else {
                passwordInput.type = 'password';
                icon.textContent = 'visibility';
            }
        });
    }
}

// ========================
// SOCIAL LOGIN HANDLERS
// ========================
function initializeSocialLogin() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const provider = button.dataset.provider;
            handleSocialLogin(provider);
        });
    });
}

function handleSocialLogin(provider) {
    console.log(`Initiating ${provider} login...`);
    
    // Placeholder for actual OAuth implementation
    const providers = {
        google: {
            name: 'Google',
            url: 'https://accounts.google.com/o/oauth2/v2/auth'
        },
        apple: {
            name: 'Apple',
            url: 'https://appleid.apple.com/auth/authorize'
        },
        facebook: {
            name: 'Facebook',
            url: 'https://www.facebook.com/v12.0/dialog/oauth'
        }
    };

    const providerInfo = providers[provider];
    if (providerInfo) {
        showNotification(`${providerInfo.name} login feature coming soon!`, 'info');
        // TODO: Implement actual OAuth flow
        // window.location.href = providerInfo.url + '?client_id=YOUR_CLIENT_ID&...';
    }
}

// ========================
// FORM SUBMISSION
// ========================
function initializeFormSubmit() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmit();
        });
    }
}

function handleFormSubmit() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }

    // Save email if remember is checked
    if (remember) {
        localStorage.setItem('lastEmail', email);
        localStorage.setItem('rememberMe', 'true');
    } else {
        localStorage.removeItem('lastEmail');
        localStorage.removeItem('rememberMe');
    }

    console.log('Login attempt:', { email, remember });
    
    // Simulate loading state
    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';

    // TODO: Send login request to backend
    // Example:
    // loginUser(email, password).then(response => {
    //     if (response.success) {
    //         showNotification('Login successful!', 'success');
    //         setTimeout(() => {
    //             window.location.href = './dashboard.html';
    //         }, 1500);
    //     }
    // }).catch(error => {
    //     showNotification(error.message, 'error');
    //     submitBtn.disabled = false;
    //     submitBtn.textContent = originalText;
    // });

    // Simulate success for demo
    setTimeout(() => {
        showNotification('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            // window.location.href = './dashboard.html';
            console.log('Would redirect to dashboard');
        }, 1500);
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 1500);
}

// ========================
// VALIDATION FUNCTIONS
// ========================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========================
// NOTIFICATION SYSTEM
// ========================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-medium z-50 transition-all ${
        type === 'error' ? 'bg-red-500' : 
        type === 'success' ? 'bg-green-500' : 
        'bg-blue-500'
    }`;
    notification.textContent = message;
    notification.style.animation = 'slideInRight 0.3s ease-out';

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================
// LOAD SAVED EMAIL
// ========================
function loadSavedEmail() {
    const savedEmail = localStorage.getItem('lastEmail');
    const rememberMe = localStorage.getItem('rememberMe');

    if (savedEmail && rememberMe === 'true') {
        document.getElementById('email').value = savedEmail;
        document.getElementById('remember').checked = true;
    }
}

// ========================
// ANIMATIONS
// ========================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);
/**
 * VibeMap Register Page - JavaScript
 * Handles form interactions and validations
 */

document.addEventListener('DOMContentLoaded', function () {
    // ===== Form Validation =====
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.querySelector('input[type="text"]').value.trim();
            const email = document.querySelector('input[type="email"]').value.trim();
            const password = document.querySelectorAll('input[type="password"]')[0].value;
            const confirmPassword = document.querySelectorAll('input[type="password"]')[1].value;
            const termsAccepted = document.getElementById('terms').checked;
            
            // Validation
            if (!fullName) {
                showAlert('Please enter your full name', 'error');
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            if (!password || password.length < 8) {
                showAlert('Password must be at least 8 characters', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'error');
                return;
            }
            
            if (!termsAccepted) {
                showAlert('You must accept the Terms of Service and Privacy Policy', 'error');
                return;
            }
            
            // If all validations pass
            showAlert('Account created successfully!', 'success');
            console.log('Form submitted with:', { fullName, email });
            
            // Here you would typically send data to a backend server
            // submitFormData({ fullName, email, password });
        });
    }
    
    // ===== Social Sign-up Handlers =====
    const googleBtn = document.querySelectorAll('button')[form ? 4 : 3]; // Adjust index if needed
    const appleBtn = document.querySelectorAll('button')[form ? 5 : 4];
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Google sign-up clicked');
            handleSocialSignup('google');
        });
    }
    
    if (appleBtn) {
        appleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Apple sign-up clicked');
            handleSocialSignup('apple');
        });
    }
    
    // ===== Password Visibility Toggle =====
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach((input, index) => {
        const wrapper = input.parentElement;
        const toggleIcon = document.createElement('span');
        toggleIcon.className = 'material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors';
        toggleIcon.textContent = 'visibility_off';
        toggleIcon.style.fontSize = '20px';
        
        wrapper.style.position = 'relative';
        wrapper.appendChild(toggleIcon);
        
        toggleIcon.addEventListener('click', function () {
            if (input.type === 'password') {
                input.type = 'text';
                toggleIcon.textContent = 'visibility';
            } else {
                input.type = 'password';
                toggleIcon.textContent = 'visibility_off';
            }
        });
    });
    
    // ===== Sign In Link Navigation =====
    const signInLink = document.querySelector('a[href="#"]');
    if (signInLink && signInLink.textContent.includes('Sign In')) {
        signInLink.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Navigate to sign in page');
            // window.location.href = '/login';
        });
    }
});

/**
 * Email validation helper
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show alert messages
 */
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-semibold z-50 animate-fade-in transition-all ${
        type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500'
    }`;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.opacity = '0';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

/**
 * Handle social sign-up (placeholder for OAuth integration)
 */
function handleSocialSignup(provider) {
    console.log(`Signing up with ${provider}`);
    // TODO: Integrate OAuth flow for Google/Apple
    // This would typically redirect to OAuth provider or use SDK
    showAlert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} sign-up coming soon!`, 'info');
}

/**
 * Submit form data to backend
 */
function submitFormData(data) {
    // Example API call structure
    /*
    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Redirect to dashboard or email verification page
    })
    .catch((error) => {
        console.error('Error:', error);
        showAlert('Registration failed. Please try again.', 'error');
    });
    */
}

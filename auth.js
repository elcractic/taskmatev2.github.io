document.addEventListener('DOMContentLoaded', function() {
    // Form toggling
    const loginToggle = document.getElementById('login-toggle');
    const registerToggle = document.getElementById('register-toggle');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const toggleIndicator = document.querySelector('.toggle-indicator');
    
    // Set initial position of toggle indicator
    setToggleIndicator(loginToggle);
    
    // Toggle between login and register forms
    loginToggle.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.classList.contains('active')) return;
        
        toggleForms('login');
        setToggleIndicator(this);
    });
    
    registerToggle.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.classList.contains('active')) return;
        
        toggleForms('register');
        setToggleIndicator(this);
    });
    
    function toggleForms(activeForm) {
        // Update toggle buttons
        loginToggle.classList.toggle('active', activeForm === 'login');
        registerToggle.classList.toggle('active', activeForm === 'register');
        
        // Toggle forms with animation
        if (activeForm === 'login') {
            registerForm.classList.remove('active');
            setTimeout(() => {
                loginForm.classList.add('active');
            }, 10);
        } else {
            loginForm.classList.remove('active');
            setTimeout(() => {
                registerForm.classList.add('active');
            }, 10);
        }
    }
    
    function setToggleIndicator(activeButton) {
        const buttonRect = activeButton.getBoundingClientRect();
        const containerRect = activeButton.parentElement.getBoundingClientRect();
        
        toggleIndicator.style.left = (buttonRect.left - containerRect.left) + 'px';
        toggleIndicator.style.width = buttonRect.width + 'px';
    }
    
    // Password visibility toggle
    const passwordToggles = document.querySelectorAll('.toggle-password');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const isPassword = input.type === 'password';
            
            input.type = isPassword ? 'text' : 'password';
            this.classList.toggle('fa-eye-slash', isPassword);
            this.classList.toggle('fa-eye', !isPassword);
        });
    });
    
    // Password strength indicator
    const passwordInput = document.getElementById('register-password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthBars = document.querySelectorAll('.strength-bar');
            const strengthText = document.querySelector('.strength-text');
            
            // Reset all bars
            strengthBars.forEach(bar => {
                bar.style.background = 'rgba(255, 255, 255, 0.1)';
            });
            
            // Calculate strength
            let strength = 0;
            if (password.length > 0) strength = 1;
            if (password.length >= 8) strength = 2;
            if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password)) strength = 3;
            
            // Update UI
            for (let i = 0; i < strength; i++) {
                let color;
                if (strength === 1) color = '#ef4444';
                else if (strength === 2) color = '#f59e0b';
                else color = '#10b981';
                
                strengthBars[i].style.background = color;
            }
            
            // Update text
            const text = ['Weak', 'Medium', 'Strong'][strength - 1] || '';
            strengthText.textContent = text;
            strengthText.style.color = text === 'Weak' ? '#ef4444' : 
                                      text === 'Medium' ? '#f59e0b' : 
                                      text === 'Strong' ? '#10b981' : '';
        });
    }
    
    // Form submissions
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get all inputs
            const inputs = this.querySelectorAll('input');
            let isValid = true;
            
            // Simple validation
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.parentElement.classList.add('invalid');
                    isValid = false;
                } else {
                    input.parentElement.classList.remove('invalid');
                }
            });
            
            // Check password match for register form
            if (this.id === 'register-form') {
                const password = document.getElementById('register-password').value;
                const confirm = document.getElementById('register-confirm').value;
                
                if (password !== confirm) {
                    document.getElementById('register-confirm').parentElement.classList.add('invalid');
                    isValid = false;
                }
            }
            
            if (isValid) {
                // Simulate form submission
                const button = this.querySelector('button[type="submit"]');
                const originalText = button.innerHTML;
                
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                button.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    
                    // Show success message (in a real app, you'd redirect)
                    alert(this.id === 'login-form' ? 'Login successful!' : 'Account created successfully!');
                }, 1500);
            }
        });
    });
    
    // Add floating animation to decoration elements
    const circles = document.querySelectorAll('.decoration-circle');
    circles.forEach((circle, index) => {
        circle.style.animation = `float ${6 + index}s ease-in-out infinite`;
    });
});

// Add this to your existing auth.js to ensure inputs are visible on load
document.addEventListener('DOMContentLoaded', function() {
    // Force redraw of input elements to prevent any rendering issues
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.opacity = '1';
        input.style.visibility = 'visible';
    });
    
    // Rest of your existing JavaScript...
});

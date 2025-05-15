document.addEventListener('DOMContentLoaded', function() {
    // Service option selection
    const serviceOptions = document.querySelectorAll('.service-option');
    serviceOptions.forEach(option => {
        option.addEventListener('click', function() {
            serviceOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, this would fetch matching providers from an API
            simulateProviderResults(this.querySelector('span').textContent);
        });
    });

    // Simulate loading different provider results
    function simulateProviderResults(serviceType) {
        const resultsContainer = document.querySelector('.service-results');
        resultsContainer.innerHTML = '<div class="loading">Finding ' + serviceType + ' providers near you...</div>';
        
        // Simulate API delay
        setTimeout(() => {
            // This would be replaced with actual API results
            const sampleProviders = [
                {
                    name: serviceType === 'Tutor/Teacher' ? 'Alex Johnson' : 'Jamie Smith',
                    service: serviceType,
                    rating: (4.5 + Math.random() * 0.5).toFixed(1),
                    reviews: Math.floor(Math.random() * 100) + 20,
                    distance: (Math.random() * 2 + 0.5).toFixed(1),
                    featured: Math.random() > 0.7
                },
                {
                    name: serviceType === 'Tutor/Teacher' ? 'Maria Garcia' : 'Taylor Wilson',
                    service: serviceType,
                    rating: (4.5 + Math.random() * 0.5).toFixed(1),
                    reviews: Math.floor(Math.random() * 100) + 20,
                    distance: (Math.random() * 2 + 0.5).toFixed(1),
                    featured: false
                }
            ];
            
            renderProviderResults(sampleProviders);
        }, 800);
    }

    // Render provider results
    function renderProviderResults(providers) {
        const resultsContainer = document.querySelector('.service-results');
        resultsContainer.innerHTML = '';
        
        providers.forEach(provider => {
            const providerCard = document.createElement('div');
            providerCard.className = 'result-card' + (provider.featured ? ' featured' : '');
            
            providerCard.innerHTML = `
                ${provider.featured ? '<div class="provider-badge">AI RECOMMENDED</div>' : ''}
                <div class="provider-info">
                    <img src="https://randomuser.me/api/portraits/${provider.name === 'Alex Johnson' || provider.name === 'Jamie Smith' ? 'men' : 'women'}/${Math.floor(Math.random() * 50) + 20}.jpg" alt="${provider.name}">
                    <div>
                        <h5>${provider.name}</h5>
                        <span>${provider.service}</span>
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <span>${provider.rating} (${provider.reviews} reviews)</span>
                        </div>
                    </div>
                </div>
                <div class="provider-distance">
                    <i class="fas fa-location-dot"></i>
                    <span>${provider.distance} miles away</span>
                </div>
                <button class="connect-button">
                    <i class="fas fa-comment-dots"></i>
                    <span>Connect</span>
                </button>
            `;
            
            resultsContainer.appendChild(providerCard);
        });
        
        // Add click handlers to new connect buttons
        document.querySelectorAll('.connect-button').forEach(button => {
            button.addEventListener('click', function() {
                const providerName = this.parentElement.querySelector('h5').textContent;
                alert(`Connecting you to ${providerName}... This would open a chat interface in the full app.`);
            });
        });
    }

    // Initialize with default results
    simulateProviderResults('Tutor/Teacher');
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card, .service-category, .step');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .service-category, .step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});
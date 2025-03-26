document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const body = document.querySelector('body');
    
    if (hamburger) {
        // Create mobile nav elements
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        
        const closeNav = document.createElement('div');
        closeNav.className = 'close-nav';
        closeNav.innerHTML = '<i class="fas fa-times"></i>';
        
        const navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        
        // Clone nav links for mobile
        const navLinks = document.querySelector('.nav-links').cloneNode(true);
        
        // Append elements
        mobileNav.appendChild(closeNav);
        mobileNav.appendChild(navLinks);
        body.appendChild(mobileNav);
        body.appendChild(navOverlay);
        
        // Toggle mobile nav
        hamburger.addEventListener('click', function() {
            mobileNav.classList.add('active');
            navOverlay.classList.add('active');
            body.style.overflow = 'hidden';
        });
        
        // Close mobile nav
        closeNav.addEventListener('click', closeMobileNav);
        navOverlay.addEventListener('click', closeMobileNav);
        
        function closeMobileNav() {
            mobileNav.classList.remove('active');
            navOverlay.classList.remove('active');
            body.style.overflow = '';
        }
        
        // Close mobile nav when clicking on a link
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const formData = new FormData(contactForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Form submitted:', formValues);
            
            // Show success message
            contactForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                </div>
            `;
        });
    }
    
    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            console.log('Newsletter subscription:', email);
            
            // Show success message
            newsletterForm.innerHTML = `
                <div class="success-message">
                    <p>Thank you for subscribing!</p>
                </div>
            `;
        });
    }
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.card, .consulting-content, .about-content');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on page load
});

// Add CSS for reveal animations
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .card, .consulting-content, .about-content {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .card.revealed, .consulting-content.revealed, .about-content.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .success-message {
            text-align: center;
            padding: 30px;
        }
        
        .success-message i {
            font-size: 3rem;
            color: var(--success-color);
            margin-bottom: 15px;
        }
    </style>
`);

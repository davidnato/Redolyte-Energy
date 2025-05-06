document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.main-nav');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    hamburger.classList.remove('open');
                }
            }
        });
    });
    
    // Sticky Header
    const header = document.querySelector('.header');
    const scrollWatcher = document.createElement('div');
    
    scrollWatcher.setAttribute('data-scroll-watcher', '');
    header.before(scrollWatcher);
    
    const observer = new IntersectionObserver((entries) => {
        header.classList.toggle('sticky', !entries[0].isIntersecting);
    }, {rootMargin: "50px 0px 0px 0px"});
    
    observer.observe(scrollWatcher);
    
    // Form Validation for Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            let isValid = true;
            let errorMessage = '';
            
            if (name === '') {
                errorMessage += 'Please enter your name.\n';
                isValid = false;
            }
            
            if (email === '') {
                errorMessage += 'Please enter your email.\n';
                isValid = false;
            } else if (!isValidEmail(email)) {
                errorMessage += 'Please enter a valid email address.\n';
                isValid = false;
            }
            
            if (subject === '') {
                errorMessage += 'Please enter a subject.\n';
                isValid = false;
            }
            
            if (message === '') {
                errorMessage += 'Please enter your message.\n';
                isValid = false;
            }
            
            if (!isValid) {
                alert(errorMessage);
            } else {
                // Here you would typically send the form data to a server
                // For now, we'll just show a success message
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Animations on scroll
    const elementsToAnimate = document.querySelectorAll('.feature-card, .segment-card, .about-section, .cta-section');
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.2 });
    
    elementsToAnimate.forEach(element => {
        animateOnScroll.observe(element);
    });
});

// Add animation class to CSS
document.head.insertAdjacentHTML('beforeend', `
<style>
    .feature-card, .segment-card, .about-section, .cta-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .feature-card.animate, .segment-card.animate, .about-section.animate, .cta-section.animate {
        opacity: 1;
        transform: translateY(0);
    }
</style>
`);

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    const map = L.map('map').setView([0, 35], 5); // Center on East Africa
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add markers for key countries
    const countries = [
        { name: "Kenya", lat: -1.2921, lng: 36.8219, desc: "Our headquarters and primary market" },
        { name: "Uganda", lat: 0.3476, lng: 32.5825, desc: "Growing market with strong renewable energy potential" },
        { name: "Tanzania", lat: -6.7924, lng: 39.2083, desc: "Expanding presence in solar integration projects" },
        { name: "Rwanda", lat: -1.9403, lng: 29.8739, desc: "Emerging market with strong government support" }
    ];
    
    // Add markers to map
    countries.forEach(country => {
        const marker = L.marker([country.lat, country.lng]).addTo(map);
        marker.bindPopup(`<b>${country.name}</b><br>${country.desc}`);
    });
});

// Add Animation on Scroll functionality
const animateElements = document.querySelectorAll('.animate-on-scroll');

const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            animateObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

animateElements.forEach(element => {
    animateObserver.observe(element);
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}
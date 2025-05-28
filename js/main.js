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

// Gallery Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.querySelector('.modal-close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        modal.style.display = "block";
        modalImg.src = item.querySelector('.gallery-img').src;
        modalCaption.innerHTML = item.querySelector('.gallery-img').alt;
    });
});

modalClose.addEventListener('click', () => {
    modal.style.display = "none";
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.querySelector('.logo-container');
    const logoVideo = document.getElementById('logo-video');
    
    // Start playing video when hovering over logo
    logoContainer.addEventListener('mouseenter', function() {
        logoVideo.currentTime = 0; // Start from beginning
        logoVideo.play();
    });
    
    // Optional: Pause video when not hovering (saves resources)
    logoContainer.addEventListener('mouseleave', function() {
        logoVideo.pause();
    });
});

// Logo video hover effect
        document.addEventListener('DOMContentLoaded', function() {
            const logoContainer = document.querySelector('.logo-container');
            const logoVideo = document.getElementById('logo-video');
            
            logoContainer.addEventListener('mouseenter', function() {
                logoVideo.play();
            });
            
            logoContainer.addEventListener('mouseleave', function() {
                // Reset video to start when mouse leaves
                logoVideo.pause();
                logoVideo.currentTime = 0;
            });
            
            // Theme toggle functionality
            const themeToggleBtn = document.getElementById('themeToggle');
            const themeIcon = themeToggleBtn.querySelector('i');
            
            // Check for saved theme preference or use default
            const currentTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
            
            // Update icon based on current theme
            if (currentTheme === 'dark') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            
            // Toggle theme on button click
            themeToggleBtn.addEventListener('click', function() {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Toggle icon
                themeIcon.classList.toggle('fa-moon');
                themeIcon.classList.toggle('fa-sun');
            });
            
            // Hamburger menu functionality
            const hamburgerMenu = document.querySelector('.hamburger-menu');
            const mainNav = document.querySelector('.main-nav');
            
            hamburgerMenu.addEventListener('click', function() {
                this.classList.toggle('active');
                mainNav.classList.toggle('show');
            });
            
            // Scroll animation
            function animateOnScroll() {
                const elements = document.querySelectorAll('.animate-on-scroll');
                
                elements.forEach(function(element) {
                    const elementPosition = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (elementPosition < windowHeight - 100) {
                        element.classList.add('animate');
                    }
                });
            }
            
            // Initial check on page load
            animateOnScroll();
            
            // Check on scroll
            window.addEventListener('scroll', animateOnScroll);
        });

        // Preload the GIF for smoother transition
document.addEventListener('DOMContentLoaded', function() {
    const hoverLogo = new Image();
    hoverLogo.src = 'images/logo-anim.gif';
});

function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  }

document.querySelectorAll('.read-more').forEach(button => {
  button.addEventListener('click', function () {
    const blogPost = this.closest('.blog-post');
    const fullContent = blogPost.querySelector('.full-content').innerHTML;

    document.getElementById('modalBody').innerHTML = fullContent;
    document.getElementById('blogModal').style.display = 'block';
  });
});

function closeModal() {
  document.getElementById('blogModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get selected category
            const selectedCategory = button.getAttribute('data-category');
            
            // Filter products
            productCards.forEach(card => {
                if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.querySelector('.logo-container');
    const logoVideo = document.getElementById('logo-video');
    
    logoContainer.addEventListener('mouseenter', function() {
        logoVideo.play();
    });
    
    logoContainer.addEventListener('mouseleave', function() {
        // Optional: pause and reset the video when not hovering
        // logoVideo.pause();
        // logoVideo.currentTime = 0;
    });
});

    document.addEventListener('DOMContentLoaded', function() {
        const parallaxBg = document.querySelector('.parallax-bg');
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            // Adjust the divisor to control the parallax speed (higher = slower)
            const parallaxOffset = scrollPosition / 2;
            
            // Apply the transform to create parallax effect
            parallaxBg.style.transform = `translateY(${parallaxOffset}px)`;
        });
    });


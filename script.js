// ============================================
// 1. DARK MODE & THEME MANAGEMENT
// ============================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Icon Updater function
function updateIcon(isDark) {
    if (isDark) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Initial check
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || htmlElement.classList.contains('dark-mode')) {
    htmlElement.classList.add('dark-mode');
    updateIcon(true);
} else {
    updateIcon(false);
}

themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark-mode');
    const isDark = htmlElement.classList.contains('dark-mode');
    updateIcon(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ============================================
// 2. MOBILE NAVIGATION
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        toggleMenu();
    }
});

// ============================================
// 3. SCROLL SPY (Highlight Active Link)
// ============================================

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    for (const section of [...sections].reverse()) {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 150) { // Adjusted offset for floating nav
            current = section.getAttribute('id');
            break; 
        }
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.includes('#') && href.slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// 4. ANIMATION ON SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.glass-card, .about-text, .section-title, .timeline-item, .contact-info-col');

animatedElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
});

// ============================================
// 5. CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Thanks for the message! I'll get back to you soon.");
        contactForm.reset();
    });
}
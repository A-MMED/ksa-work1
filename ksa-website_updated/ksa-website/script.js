/* =============================================
   KSA WEBSITE — JAVASCRIPT
   ============================================= */

let currentLang = 'en';

// ---- LANGUAGE TOGGLE ----
function toggleLanguage() {
  if (currentLang === 'en') {
    setLanguage('ar');
  } else {
    setLanguage('en');
  }
}

function setLanguage(lang) {
  currentLang = lang;
  const html = document.getElementById('html-root');

  if (lang === 'ar') {
    html.setAttribute('lang', 'ar');
    html.setAttribute('dir', 'rtl');
    document.getElementById('langLabel').textContent = 'English';
  } else {
    html.setAttribute('lang', 'en');
    html.setAttribute('dir', 'ltr');
    document.getElementById('langLabel').textContent = 'العربية';
  }

  // Update all elements with data-en / data-ar attributes
  const elements = document.querySelectorAll('[data-en][data-ar]');
  elements.forEach(el => {
    const text = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    if (text) {
      el.textContent = text;
    }
  });

  // Update elements with innerHTML (those containing <strong> tags)
  const htmlElements = document.querySelectorAll('[data-en-html][data-ar-html]');
  htmlElements.forEach(el => {
    const html = lang === 'ar' ? el.getAttribute('data-ar-html') : el.getAttribute('data-en-html');
    if (html) {
      el.innerHTML = html;
    }
  });

  // Handle paragraph elements with data-en/data-ar that contain HTML
  const paragraphs = document.querySelectorAll('p[data-en], p[data-ar]');
  paragraphs.forEach(el => {
    const text = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    if (text) {
      el.innerHTML = text;
    }
  });

  // Store preference
  localStorage.setItem('ksa-lang', lang);
}

// ---- MOBILE MENU ----
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// Close menu on outside click
document.addEventListener('click', function(e) {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// ---- NAVBAR SCROLL EFFECT ----
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 60) {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
  } else {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
  }
});

// ---- SCROLL REVEAL ANIMATION ----
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', function() {
  // Add fade-in styles
  const style = document.createElement('style');
  style.textContent = `
    .info-card, .component-card, .belonging-item, .cel-item,
    .symbol-card, .timeline-item, .day-block, .flag-why {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .info-card.visible, .component-card.visible, .belonging-item.visible,
    .cel-item.visible, .symbol-card.visible, .timeline-item.visible,
    .day-block.visible, .flag-why.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const animatedElements = document.querySelectorAll(
    '.info-card, .component-card, .belonging-item, .cel-item, .symbol-card, .timeline-item, .day-block, .flag-why'
  );
  animatedElements.forEach((el, index) => {
    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    observer.observe(el);
  });

  // Load saved language preference
  const savedLang = localStorage.getItem('ksa-lang');
  if (savedLang && savedLang !== 'en') {
    setLanguage(savedLang);
  }
});

// ---- SMOOTH SCROLL FOR NAV LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.getElementById('navbar').offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ---- ACTIVE NAV LINK HIGHLIGHT ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

window.addEventListener('scroll', function() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.background = '';
    link.style.color = 'rgba(255,255,255,0.85)';
    if (link.getAttribute('href') === '#' + current) {
      link.style.background = 'rgba(255,255,255,0.2)';
      link.style.color = '#ffffff';
    }
  });
});

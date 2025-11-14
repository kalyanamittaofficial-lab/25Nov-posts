/* Note: We remove the 'DOMContentLoaded' listener because
  our main.js loader *is* the DOM loader. This code
  will run immediately after the post.html is injected.
*/

// --- 1. Mode Toggle (Light/Dark) ---
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;
// Check local storage *immediately* when this post is loaded
if (localStorage.getItem('mode') === 'dark') {
    body.classList.add('dark-mode');
    modeToggle.textContent = '☀️';
} else {
    // Ensure the shell is in light mode if that's what's saved
    body.classList.remove('dark-mode');
    modeToggle.textContent = '🌙';
}
modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        modeToggle.textContent = '☀️';
        localStorage.setItem('mode', 'dark');
    } else {
        modeToggle.textContent = '🌙';
        localStorage.setItem('mode', 'light');
    }
});

// --- 2. Language Toggle (Si/En) ---
const langToggle = document.getElementById('lang-toggle');
const contentSi = document.getElementById('content-si');
const contentEn = document.getElementById('content-en');

langToggle.addEventListener('click', () => {
    const isEnglish = contentEn.style.display === 'block';
    if (isEnglish) {
        // Switch to Sinhala
        contentEn.style.display = 'none';
        contentSi.style.display = 'block';
        langToggle.textContent = 'En';
        document.documentElement.lang = 'si';
    } else {
        // Switch to English
        contentSi.style.display = 'none';
        contentEn.style.display = 'block';
        langToggle.textContent = 'සිං';
        document.documentElement.lang = 'en';
    }
});

// --- 3. NEW: Circle Animation (Both Languages) ---
const circleToggles = document.querySelectorAll('.circle-wrapper');
circleToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.querySelector('.circle-container').classList.toggle('open');
    });
});

// --- 4. ADVANCED: Accordion Logic ---
const stepHeaders = document.querySelectorAll('.step-header');
stepHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isActive = header.classList.contains('active');

        if (isActive) {
            header.classList.remove('active');
            content.style.maxHeight = '0px';
        } else {
            header.classList.add('active');
            // Set max-height to the content's full scrollable height
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});

// --- 5. Scroll Animation (Intersection Observer) ---
/*
  We create a *new* observer for this post.
  This is better than trying to share one.
*/
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(el => observer.observe(el));
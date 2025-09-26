document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode Toggle Implementation
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.getElementById('page-body');

    // Check for user preference in local storage or system setting
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Change icon to sun
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Change icon to moon
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        
        // Update local storage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        // Update the icon
        themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // 2. Language Toggle Implementation (English <-> Arabic)
    const langToggle = document.getElementById('lang-toggle');
    const rootHtml = document.documentElement;

    // Check for language preference in local storage
    let currentLang = localStorage.getItem('lang') || 'en';

    // Function to apply language settings
    const applyLanguage = (lang) => {
        rootHtml.setAttribute('lang', lang);
        
        if (lang === 'ar') {
            rootHtml.setAttribute('dir', 'rtl'); // Right-to-left for Arabic
            langToggle.querySelector('span').textContent = 'EN';
            localStorage.setItem('lang', 'ar');
        } else {
            rootHtml.setAttribute('dir', 'ltr'); // Left-to-right for English
            langToggle.querySelector('span').textContent = 'AR';
            localStorage.setItem('lang', 'en');
        }

        // Update all elements with language data attributes
        document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
            const translationKey = `data-${lang}`;
            const fallbackKey = `data-${lang === 'en' ? 'ar' : 'en'}`;
            
            // Check if element is a button and use innerText
            if (element.tagName === 'BUTTON' || element.tagName === 'A') {
                 element.textContent = element.getAttribute(translationKey) || element.getAttribute(fallbackKey);
            } else {
                element.textContent = element.getAttribute(translationKey) || element.getAttribute(fallbackKey);
            }
        });
    };

    // Initialize the language on page load
    applyLanguage(currentLang);

    // Event listener for the language toggle button
    langToggle.addEventListener('click', () => {
        const newLang = rootHtml.getAttribute('lang') === 'en' ? 'ar' : 'en';
        applyLanguage(newLang);
    });

    // 3. Simple Interactive Animation (for buttons/icons)
    document.querySelectorAll('.button, .toggle-button').forEach(element => {
        element.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
            this.style.boxShadow = 'none';
        });
        element.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)'; // Reset if mouse leaves while pressed
        });
    });
});
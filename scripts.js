document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------
    // 1. Dark Mode Toggle Logic
    // ------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Load saved theme from local storage or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙'; // Set initial icon

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙'; // Change icon
    });

    // ------------------------------------
    // 2. Language Selector Logic (EN/AR)
    // ------------------------------------
    const langSelect = document.getElementById('language-select');

    if (langSelect) {
        // Load saved language or default to 'en'
        const savedLang = localStorage.getItem('lang') || 'en';
        langSelect.value = savedLang;
        
        // Apply initial language settings
        applyLanguage(savedLang);

        langSelect.addEventListener('change', (event) => {
            const newLang = event.target.value;
            localStorage.setItem('lang', newLang);
            applyLanguage(newLang);
        });
    }

    function applyLanguage(lang) {
        const isArabic = lang === 'ar';
        
        // 1. Set text direction for the body
        body.style.direction = isArabic ? 'rtl' : 'ltr';

        // 2. Update all elements that have data-en/data-ar attributes
        document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
            const englishText = element.getAttribute('data-en');
            const arabicText = element.getAttribute('data-ar');

            // Only update if both attributes exist and we're not dealing with an empty string
            if (englishText && arabicText) {
                element.textContent = isArabic ? arabicText : englishText;
            }
        });
        
        // 3. Optional: Update header navigation link text based on the language.
        // For simplicity, we assume primary links (Home, Clients, etc.) are mainly text and can be managed manually or kept consistent.
        // If complex translation is needed, the previous loop (step 2) is the best method.
    }
});
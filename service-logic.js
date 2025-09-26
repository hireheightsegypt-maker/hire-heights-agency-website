document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------
    // Accordion Toggle Logic (Used on clients.html)
    // ------------------------------------
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const content = header.nextElementSibling;
            
            // Check if this item is currently open
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Close all other open accordion items
            accordionHeaders.forEach(otherHeader => {
                const otherItem = otherHeader.parentElement;
                const otherContent = otherHeader.nextElementSibling;

                if (otherItem !== accordionItem && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherContent.style.maxHeight = null;
                }
            });

            // Toggle the clicked item
            if (!isExpanded) {
                // Open it
                accordionItem.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                // Set the max-height to the actual scroll height to enable the CSS transition
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                // Close it
                accordionItem.classList.remove('active');
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
            }
        });
    });
});
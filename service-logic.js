document.addEventListener('DOMContentLoaded', () => {
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        const header = item.querySelector('.service-header');
        const content = item.querySelector('.service-content');
        
        // Use a click listener on the header to toggle the content
        header.addEventListener('click', () => {
            
            // Check if the current item is already active
            const wasActive = item.classList.contains('active');

            // Optional: Close all other active items (Accordion behavior)
            serviceItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.service-content').style.maxHeight = '0';
            });
            
            // If it wasn't active, open it
            if (!wasActive) {
                item.classList.add('active');
                // Set max-height to scrollHeight to enable smooth CSS transition
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
        
        // Ensure content height is recalculated if window resizes or content changes
        window.addEventListener('resize', () => {
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});
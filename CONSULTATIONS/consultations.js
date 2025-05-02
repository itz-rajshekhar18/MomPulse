// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return; // Exit if toggle doesn't exist on this page

    // Check for saved dark mode preference and apply it immediately
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', isDarkMode);
    darkModeToggle.checked = isDarkMode;

    // Toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        const isDark = this.checked;
        document.body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('darkMode', isDark);
    });
}); 
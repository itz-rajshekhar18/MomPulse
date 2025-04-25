// JavaScript for enhancing interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to all cards
    const allCards = document.querySelectorAll('.resource-card, .suggestion-card');
    allCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('h3').textContent;
            console.log(`Clicked on: ${cardTitle}`);
            // In a real app, this would navigate to the respective page
            // window.location.href = `/topic/${cardTitle.toLowerCase().replace(/\s+/g, '-')}`;
            alert(`You selected: ${cardTitle}`);
        });
    });

    // Add event listener for zoom calls
    const zoomCards = document.querySelectorAll('.zoom-card');
    zoomCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            alert(`Joining Zoom call: ${title}`);
        });
    });

    // Health Tracking functionality
    const moodBtns = document.querySelectorAll('.mood-btn');
    moodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mood = this.textContent;
            alert(`Thank you for sharing your mood: ${mood}`);
            // In a real app, this would save the mood data
        });
    });

    // Emergency Resources
    const contactNumbers = document.querySelectorAll('.contact-number');
    contactNumbers.forEach(number => {
        number.addEventListener('click', function() {
            const phoneNumber = this.textContent;
            alert(`Calling ${phoneNumber}...`);
            // In a real app, this would initiate a phone call
        });
    });

    // Resource Buttons
    const resourceBtns = document.querySelectorAll('.resource-btn');
    resourceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const resourceType = this.closest('.wellbeing-card').querySelector('h3').textContent;
            alert(`Accessing ${resourceType} resources...`);
            // In a real app, this would navigate to the respective resource page
        });
    });

    // Progress bars animation
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width || '60%';
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });

    // Dark Mode Toggle
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = `
        <span>Dark Mode</span>
        <div class="toggle-switch">
            <input type="checkbox" id="dark-mode-toggle">
            <label for="dark-mode-toggle"></label>
        </div>
    `;
    document.body.appendChild(darkModeToggle);

    const darkModeCheckbox = document.getElementById('dark-mode-toggle');
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        darkModeCheckbox.checked = true;
        document.body.classList.add('dark-mode');
    }

    // Toggle dark mode
    darkModeCheckbox.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', this.checked);
    });
});
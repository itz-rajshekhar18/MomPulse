document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to article cards
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            console.log(`Selected article: ${title}`);
            // In a real app, this would navigate to the article page
            alert(`You selected: ${title}`);
        });
    });

    // Add click event listeners to video cards
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            console.log(`Selected video: ${title}`);
            // In a real app, this would play the video
            alert(`Playing video: ${title}`);
        });
    });

    // Add click event listeners to category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.querySelector('h3').textContent;
            console.log(`Selected category: ${category}`);
            // In a real app, this would filter content by category
            alert(`Filtering by category: ${category}`);
        });
    });

    // Add hover effect to read more links
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.querySelector('i').style.transform = 'translateX(5px)';
        });
        link.addEventListener('mouseleave', function() {
            this.querySelector('i').style.transform = 'translateX(0)';
        });
    });

    // Initialize video containers
    const videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach(container => {
        // Add loading state
        container.innerHTML = '<div class="video-loading">Loading video...</div>';
        
        // In a real app, this would load the actual video
        setTimeout(() => {
            container.innerHTML = '<iframe src="https://www.youtube.com/embed/example" frameborder="0" allowfullscreen></iframe>';
        }, 1000);
    });

    // Add search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search articles and videos...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        padding: 0.8rem 1.5rem;
        border: 2px solid var(--primary);
        border-radius: 30px;
        font-size: 1rem;
        width: 100%;
        max-width: 500px;
        margin: 2rem auto;
        display: block;
    `;

    const main = document.querySelector('main');
    main.insertBefore(searchInput, main.firstChild);

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const allCards = document.querySelectorAll('.article-card, .video-card');
        
        allCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Dark mode toggle
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

document.addEventListener('DOMContentLoaded', function() {
    // Toggle switches functionality
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    toggleSwitches.forEach(switchInput => {
        switchInput.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.backgroundColor = '#ff6b6b';
            } else {
                label.style.backgroundColor = '#ccc';
            }
        });
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

    // Profile picture edit button
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    editProfileBtn.addEventListener('click', function() {
        // Create file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const profilePic = document.querySelector('.profile-pic');
                    profilePic.src = e.target.result;
                    // Save to localStorage
                    localStorage.setItem('profilePicture', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
        
        fileInput.click();
    });

    // Load saved profile picture
    const savedProfilePic = localStorage.getItem('profilePicture');
    if (savedProfilePic) {
        document.querySelector('.profile-pic').src = savedProfilePic;
    }

    // Edit buttons functionality
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.closest('.profile-section');
            const infoItems = section.querySelectorAll('.info-item p');
            
            infoItems.forEach(item => {
                const currentValue = item.textContent;
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.className = 'edit-input';
                
                // Replace paragraph with input
                item.parentNode.replaceChild(input, item);
                
                // Focus on the input
                input.focus();
                
                // Save on Enter or blur
                const saveEdit = () => {
                    const newValue = input.value.trim();
                    const paragraph = document.createElement('p');
                    paragraph.textContent = newValue;
                    input.parentNode.replaceChild(paragraph, input);
                };
                
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        saveEdit();
                    }
                });
                
                input.addEventListener('blur', saveEdit);
            });
        });
    });

    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

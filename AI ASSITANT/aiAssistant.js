document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    const topicBtns = document.querySelectorAll('.topic-btn');

    // Initial greeting message
    addMessage("Hello! I'm your AI Health Assistant. How can I help you today?", false);

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

    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleAIResponse(userMessage) {
        // Simulated AI responses based on topics
        const responses = {
            'period': {
                title: 'Menstrual Health Information',
                content: 'Here are some important things to know about menstrual health:\n\n' +
                        '1. Track your cycle for better understanding\n' +
                        '2. Common symptoms and when to seek help\n' +
                        '3. Managing period pain and discomfort\n' +
                        '4. When to consult a healthcare provider'
            },
            'mental': {
                title: 'Mental Health Support',
                content: 'I understand you might be feeling stressed. Here are some coping strategies:\n\n' +
                        '1. Practice mindfulness and meditation\n' +
                        '2. Maintain a regular sleep schedule\n' +
                        '3. Stay connected with loved ones\n' +
                        '4. Consider professional counseling if needed'
            },
            'pregnancy': {
                title: 'Pregnancy Information',
                content: 'For pregnancy concerns, here are some important things to know:\n\n' +
                        '1. Regular prenatal care is essential\n' +
                        '2. Common pregnancy symptoms and remedies\n' +
                        '3. Warning signs to watch for\n' +
                        '4. Nutrition and exercise guidelines'
            },
            'postpartum': {
                title: 'Postpartum Care',
                content: 'Postpartum care is crucial. Here are some tips for recovery:\n\n' +
                        '1. Physical recovery timeline\n' +
                        '2. Emotional well-being support\n' +
                        '3. Breastfeeding guidance\n' +
                        '4. When to seek medical attention'
            }
        };

        let response = {
            title: 'General Health Information',
            content: "I'm here to help with your health questions. What would you like to know about?"
        };
        
        const message = userMessage.toLowerCase();
        if (message.includes('period')) {
            response = responses.period;
        } else if (message.includes('mental')) {
            response = responses.mental;
        } else if (message.includes('pregnancy')) {
            response = responses.pregnancy;
        } else if (message.includes('postpartum')) {
            response = responses.postpartum;
        }

        setTimeout(() => {
            addMessage(response.title, false);
            setTimeout(() => {
                addMessage(response.content, false);
            }, 500);
        }, 1000);
    }

    sendBtn.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            handleAIResponse(message);
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });

    topicBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const topic = btn.textContent.toLowerCase();
            addMessage(`I'd like to know more about ${topic}`, true);
            handleAIResponse(topic);
        });
    });

    // Add typing indicator
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message ai-message typing-indicator';
        indicator.textContent = 'AI is typing...';
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    }

    function removeTypingIndicator(indicator) {
        if (indicator && indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
    }
});

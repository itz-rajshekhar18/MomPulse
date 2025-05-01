document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    const topicBtns = document.querySelectorAll('.topic-btn');

    // API endpoint
    const API_URL = 'http://localhost:5000/api/chat';

    // --- Helper Functions ---

    /**
     * Adds a message bubble to the chat interface.
     * @param {string} text - The message content.
     * @param {boolean} [isUser=false] - True if the message is from the user, false for AI.
     */
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    /**
     * Shows a temporary "AI is typing..." indicator.
     * @returns {HTMLElement} The indicator element created.
     */
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message ai-message typing-indicator';
        indicator.textContent = 'AI is thinking...';
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    }

    /**
     * Removes a specific typing indicator element.
     * @param {HTMLElement} indicator - The indicator element to remove.
     */
    function removeTypingIndicator(indicator) {
        if (indicator && indicator.parentNode === chatMessages) {
            chatMessages.removeChild(indicator);
        }
    }

    /**
     * Sends the user's message to the backend API and displays the response.
     * @param {string} userMessage - The text message from the user.
     */
    async function sendMessageToAPI(userMessage) {
        const typingIndicator = showTypingIndicator();

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage })
            });

            removeTypingIndicator(typingIndicator);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.error) {
                addMessage(`Error: ${data.error}`, false);
            } else {
                addMessage(data.response, false);
            }
        } catch (error) {
            removeTypingIndicator(typingIndicator);
            addMessage('Sorry, I encountered an error. Please try again.', false);
            console.error('Error:', error);
        }
    }

    // --- Event Listeners ---

    // Send button click
    sendBtn.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            sendMessageToAPI(message);
            chatInput.value = '';
        }
    });

    // Enter key press in input field
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });

    // Quick topic button clicks
    topicBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const topicMessage = `Tell me more about ${btn.textContent}`;
            addMessage(topicMessage, true);
            sendMessageToAPI(topicMessage);
        });
    });

    // --- Initialization & Dark Mode ---

    // Initial greeting message (Keep this as it's from the frontend)
    addMessage("Hello! I'm your Mom Pulse AI Assistant. How can I help you today with pre-partum or post-partum topics? Remember, I cannot provide medical advice.", false);

    // Dark Mode Toggle (Keep your existing dark mode logic)
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        darkModeToggle.checked = true;
        body.classList.add('dark-mode');
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', this.checked);
    });

    // Optional: Add CSS for the typing indicator if you don't have it
    /*
    In aiAssistant.css, add:
    .typing-indicator {
        font-style: italic;
        color: #888;
    }
    body.dark-mode .typing-indicator {
        color: #bbb;
    }
    */

}); // End DOMContentLoaded
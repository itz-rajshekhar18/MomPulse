document.addEventListener('DOMContentLoaded', function() {
    const helpForm = document.getElementById('helpForm');
    const helpButtons = document.querySelectorAll('.help-btn');
    const categorySelect = document.getElementById('category');
    const messageTextarea = document.getElementById('message');
    const chatBtn = document.querySelector('.chat-btn');

    // Handle help button clicks
    helpButtons.forEach(button => {
        button.addEventListener('click', function() {
            const topic = this.textContent;
            categorySelect.value = getCategoryFromTopic(topic);
            messageTextarea.value = `I need help with ${topic.toLowerCase()}: `;
            messageTextarea.focus();
        });
    });

    // Handle form submission
    helpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show submission confirmation
        showConfirmation(data);
        
        // Reset form
        this.reset();
    });

    // Handle chat button click
    chatBtn.addEventListener('click', function() {
        // In a real application, this would open a chat widget
        alert('Live chat feature coming soon!');
    });

    // Helper function to map topics to categories
    function getCategoryFromTopic(topic) {
        const topicMap = {
            'Account Issues': 'account',
            'Technical Support': 'technical',
            'Pregnancy Questions': 'medical',
            'Postpartum Support': 'medical'
        };
        return topicMap[topic] || 'other';
    }

    // Show confirmation message
    function showConfirmation(data) {
        const confirmationHTML = `
            <div class="confirmation-message">
                <h3>Thank you for reaching out!</h3>
                <p>We've received your request and will respond to ${data.email} within 24 hours.</p>
                <p>Request Details:</p>
                <ul>
                    <li>Category: ${data.category}</li>
                    <li>Urgency: ${data.urgency}</li>
                </ul>
            </div>
        `;

        const confirmationDiv = document.createElement('div');
        confirmationDiv.className = 'confirmation-overlay';
        confirmationDiv.innerHTML = confirmationHTML;

        document.body.appendChild(confirmationDiv);

        // Remove confirmation after 5 seconds
        setTimeout(() => {
            confirmationDiv.remove();
        }, 5000);
    }

    // Add some CSS for the confirmation message
    const style = document.createElement('style');
    style.textContent = `
        .confirmation-overlay {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--accent);
            color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.5s ease-out;
        }

        .confirmation-message {
            max-width: 300px;
        }

        .confirmation-message h3 {
            margin-bottom: 10px;
        }

        .confirmation-message ul {
            margin-top: 10px;
            padding-left: 20px;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}); 
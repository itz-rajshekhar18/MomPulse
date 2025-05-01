document.addEventListener('DOMContentLoaded', function() {
    const breathingCircle = document.querySelector('.breathing-circle');
    const breathingText = document.querySelector('.breathing-text');
    const timer = document.querySelector('.timer');
    const startBtn = document.querySelector('.start-btn');
    let isRunning = false;
    let currentStep = 0;
    let countdown;

    const steps = [
        { text: 'Breathe In', duration: 4 },
        { text: 'Hold', duration: 4 },
        { text: 'Breathe Out', duration: 4 }
    ];

    function updateDisplay(step) {
        breathingText.textContent = step.text;
        timer.textContent = step.duration;
    }

    function startBreathing() {
        if (isRunning) return;
        
        isRunning = true;
        startBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Exercise';
        breathingCircle.classList.add('expand');
        
        function runStep() {
            if (!isRunning) return;
            
            const step = steps[currentStep];
            updateDisplay(step);
            
            let timeLeft = step.duration;
            timer.textContent = timeLeft;
            
            countdown = setInterval(() => {
                timeLeft--;
                timer.textContent = timeLeft;
                
                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    currentStep = (currentStep + 1) % steps.length;
                    breathingCircle.classList.toggle('expand');
                    setTimeout(runStep, 500);
                }
            }, 1000);
        }
        
        runStep();
    }

    function pauseBreathing() {
        isRunning = false;
        clearInterval(countdown);
        startBtn.innerHTML = '<i class="fas fa-play"></i> Continue Exercise';
        breathingCircle.classList.remove('expand');
    }

    function resetBreathing() {
        isRunning = false;
        clearInterval(countdown);
        currentStep = 0;
        updateDisplay(steps[0]);
        startBtn.innerHTML = '<i class="fas fa-play"></i> Start Exercise';
        breathingCircle.classList.remove('expand');
    }

    startBtn.addEventListener('click', function() {
        if (isRunning) {
            pauseBreathing();
        } else {
            startBreathing();
        }
    });

    // Reset button functionality
    const resetBtn = document.createElement('button');
    resetBtn.className = 'reset-btn';
    resetBtn.innerHTML = '<i class="fas fa-redo"></i> Reset';
    resetBtn.style.cssText = `
        background-color: var(--primary);
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 30px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-left: 1rem;
    `;
    resetBtn.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#ff6b6b';
    });
    resetBtn.addEventListener('mouseout', function() {
        this.style.backgroundColor = 'var(--primary)';
    });
    resetBtn.addEventListener('click', resetBreathing);
    
    startBtn.parentNode.appendChild(resetBtn);

    // Initialize display
    updateDisplay(steps[0]);
}); 
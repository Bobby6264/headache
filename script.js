// Fancy Birthday Surprise Website with Authentication and Multiple Messages

document.addEventListener('DOMContentLoaded', function() {
    initializeAuthentication();
});

// Authentication functionality
function initializeAuthentication() {
    const authInput = document.getElementById('auth-input');
    const authSubmit = document.getElementById('auth-submit');
    const authError = document.getElementById('auth-error');
    
    // Focus on input when page loads
    authInput.focus();
    
    // Handle Enter key press
    authInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAuthentication();
        }
    });
    
    // Handle button click
    authSubmit.addEventListener('click', checkAuthentication);
    
    function checkAuthentication() {
        const answer = authInput.value.trim().toLowerCase();
        
        if (answer === 'bubu') {
            // Correct answer - show success and load main content
            authSubmit.textContent = '✅ Welcome BUBU!';
            authSubmit.style.background = 'linear-gradient(45deg, #4caf50, #8bc34a)';
            
            // Create celebration sparkles
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * window.innerHeight;
                    createSparkle(x, y, '#4caf50');
                }, i * 100);
            }
            
            setTimeout(() => {
                document.getElementById('auth-modal').style.display = 'none';
                document.getElementById('main-content').classList.remove('hidden');
                initializeWebsite();
            }, 1500);
            
        } else {
            // Wrong answer - show error
            authError.classList.remove('hidden');
            authInput.value = '';
            authInput.focus();
            
            // Hide error after 3 seconds
            setTimeout(() => {
                authError.classList.add('hidden');
            }, 3000);
        }
    }
}

function initializeWebsite() {
    // Initialize message slider
    initializeMessageSlider();
    
    // Start background animations
    startBackgroundAnimations();
    
    // Add sparkle effects to buttons
    addButtonSparkles();
    
    // Auto-advance messages
    startAutoAdvance();
}

// Message Slider functionality
let currentMessage = 1;
const totalMessages = 4;

function initializeMessageSlider() {
    // Show first message
    showMessage(1);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            showMessage(currentMessage - 1);
        } else if (e.key === 'ArrowRight') {
            showMessage(currentMessage + 1);
        }
    });
    
    // Add touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    const messageContainer = document.querySelector('.message-container');
    
    if (messageContainer) {
        messageContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        messageContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        // Mouse drag support for desktop
        let isDragging = false;
        let startMouseX = 0;
        
        messageContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startMouseX = e.clientX;
            messageContainer.style.cursor = 'grabbing';
        });
        
        messageContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        messageContainer.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            messageContainer.style.cursor = 'grab';
            
            const endMouseX = e.clientX;
            const diff = startMouseX - endMouseX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    showMessage(currentMessage + 1);
                } else {
                    showMessage(currentMessage - 1);
                }
            }
        });
        
        messageContainer.addEventListener('mouseleave', () => {
            isDragging = false;
            messageContainer.style.cursor = 'grab';
        });
        
        messageContainer.style.cursor = 'grab';
    }
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            showMessage(currentMessage + 1); // Swipe left - next message
        } else {
            showMessage(currentMessage - 1); // Swipe right - previous message
        }
    }
}

function showMessage(messageNumber) {
    // Validate message number
    if (messageNumber < 1) messageNumber = totalMessages;
    if (messageNumber > totalMessages) messageNumber = 1;
    
    // Remove active class from all messages and dots
    document.querySelectorAll('.message').forEach(msg => msg.classList.remove('active'));
    document.querySelectorAll('.nav-dot').forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current message and dot
    const currentMsg = document.getElementById(`message${messageNumber}`);
    const currentDot = document.querySelectorAll('.nav-dot')[messageNumber - 1];
    
    if (currentMsg) currentMsg.classList.add('active');
    if (currentDot) currentDot.classList.add('active');
    
    // Update current message
    currentMessage = messageNumber;
    
    // Create sparkle effect
    createMessageSparkles();
}

// Surprise button functionality
function showSurprise(type) {
    // Hide all surprise messages first
    document.querySelectorAll('.surprise-message').forEach(msg => {
        msg.classList.remove('active');
    });
    
    // Show the selected surprise message
    const surpriseMsg = document.getElementById(`surprise-${type}`);
    if (surpriseMsg) {
        surpriseMsg.classList.add('active');
        
        // Create celebration effects
        createCelebrationEffects(type);
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            surpriseMsg.classList.remove('active');
        },15000);
    }
}

// Create celebration effects
function createCelebrationEffects(type) {
    // Create extra confetti
    createExtraConfetti();
    
    // Create sparkles
    createSparklesBurst();
    
    // Trigger specific effects based on type
    switch(type) {
        case 'love':
            createHeartsBurst();
            break;
        case 'gift':
            createGiftSparkles();
            break;
        case 'dance':
            createMusicNotes();
            break;
        case 'special':
            createMagicalEffects();
            break;
    }
}

// Background animations
function startBackgroundAnimations() {
    // Animate floating hearts
    animateFloatingHearts();
    
    // Animate sparkles
    animateSparkles();
    
    // Animate cake candles
    animateCakeCandles();
}

function animateFloatingHearts() {
    const hearts = document.querySelectorAll('.floating-hearts .heart');
    hearts.forEach((heart, index) => {
        setInterval(() => {
            const newLeft = Math.random() * 100;
            heart.style.left = newLeft + '%';
        }, 8000 + index * 1000);
    });
}

function animateSparkles() {
    const sparkles = document.querySelectorAll('.sparkles .sparkle');
    sparkles.forEach((sparkle, index) => {
        setInterval(() => {
            const newLeft = Math.random() * 100;
            sparkle.style.left = newLeft + '%';
        }, 10000 + index * 1500);
    });
}

function animateCakeCandles() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        setInterval(() => {
            flame.style.animationDuration = (Math.random() * 0.5 + 0.8) + 's';
        }, 2000);
    });
}

// Auto-advance messages
function startAutoAdvance() {
    setInterval(() => {
        showMessage(currentMessage + 1);
    }, 8000); // Change message every 8 seconds
}

// Sparkle effects
function createMessageSparkles() {
    const messageContainer = document.querySelector('.message-container');
    if (!messageContainer) return;
    
    const rect = messageContainer.getBoundingClientRect();
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            createSparkle(x, y, '#feca57');
        }, i * 100);
    }
}

function createSparklesBurst() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createSparkle(x, y, getRandomColor());
        }, i * 50);
    }
}

function createSparkle(x, y, color = '#feca57') {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '6px';
    sparkle.style.height = '6px';
    sparkle.style.background = color;
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkleEffect 1.5s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1500);
}

// Special effect functions
function createHeartsBurst() {
    const hearts = ['💖', '💕', '💗', '💝', '💘', '💓', '💞', '💟'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFloatingEmoji(hearts[Math.floor(Math.random() * hearts.length)]);
        }, i * 200);
    }
}

function createGiftSparkles() {
    const gifts = ['🎁', '🎀', '💝', '🎊', '🎉'];
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createFloatingEmoji(gifts[Math.floor(Math.random() * gifts.length)]);
        }, i * 300);
    }
}

function createMusicNotes() {
    const notes = ['🎵', '🎶', '🎼', '🎤', '🎧'];
    
    for (let i = 0; i < 18; i++) {
        setTimeout(() => {
            createFloatingEmoji(notes[Math.floor(Math.random() * notes.length)]);
        }, i * 150);
    }
}

function createMagicalEffects() {
    const magical = ['✨', '⭐', '🌟', '💫', '🌈', '👑', '💎', '🦄'];
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            createFloatingEmoji(magical[Math.floor(Math.random() * magical.length)]);
        }, i * 100);
    }
}

function createFloatingEmoji(emoji) {
    const element = document.createElement('div');
    element.textContent = emoji;
    element.style.position = 'fixed';
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 30 + 20) + 'px';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '999';
    element.style.animation = 'floatUp 4s ease-out forwards';
    
    document.body.appendChild(element);
    
    setTimeout(() => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }, 4000);
}

function createExtraConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#764ba2', '#32CD32'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '998';
            confetti.style.animation = 'confettiFall 3s linear forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 50);
    }
}

// Button sparkle effects
function addButtonSparkles() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('button') || e.target.matches('.nav-dot')) {
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const x = e.clientX + (Math.random() - 0.5) * 100;
                    const y = e.clientY + (Math.random() - 0.5) * 100;
                    createSparkle(x, y, getRandomColor());
                }, i * 80);
            }
        }
    });
}

// Utility functions
function getRandomColor() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#764ba2', '#32CD32', '#FFD700', '#FF69B4'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleEffect {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(15) rotate(180deg);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Fun console messages
console.log('🎉 Happy Birthday Surprise Website Loaded! 🎉');
console.log('💖 Made with love for someone special! 💖');
console.log('✨ Enjoy the magical experience! ✨');

// Add some interactive features
document.addEventListener('keydown', function(e) {
    // Easter eggs for fun
    if (e.key === 'h') {
        createHeartsBurst();
    } else if (e.key === 's') {
        createSparklesBurst();
    } else if (e.key === 'm') {
        createMusicNotes();
    } else if (e.key === 'g') {
        createGiftSparkles();
    }
});

// Click anywhere for sparkles
document.addEventListener('click', function(e) {
    if (!e.target.matches('button') && !e.target.matches('.nav-dot')) {
        createSparkle(e.clientX, e.clientY, getRandomColor());
    }
});

// Add hover effects to surprise buttons
document.addEventListener('DOMContentLoaded', function() {
    const surpriseButtons = document.querySelectorAll('.cute-btn');
    
    surpriseButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const rect = button.getBoundingClientRect();
                    const x = rect.left + Math.random() * rect.width;
                    const y = rect.top + Math.random() * rect.height;
                    createSparkle(x, y, '#feca57');
                }, i * 100);
            }
        });
    });
});

// Make balloons interactive
document.addEventListener('DOMContentLoaded', function() {
    const balloons = document.querySelectorAll('.balloon');
    
    balloons.forEach(balloon => {
        balloon.addEventListener('click', function() {
            createCelebrationEffects('special');
        });
    });
});

// Touch feedback for mobile
document.addEventListener('touchstart', function(e) {
    if (e.target.matches('.cute-btn') || e.target.matches('.nav-dot')) {
        const touch = e.touches[0];
        createSparkle(touch.clientX, touch.clientY, getRandomColor());
    }
});

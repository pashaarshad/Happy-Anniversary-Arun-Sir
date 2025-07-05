// Happy Anniversary Arun Sir - Surprise JavaScript

// Global Variables
window.currentPhoto = 1;
window.musicPlaying = false;
window.photoInterval = null;
window.isOpened = false;

// DOM Elements - Initialize after DOM is loaded
let loading, envelopeContainer, envelopeSection, photoGallery;
let photo1, photo2, caption1, caption2;
let musicControl, musicIcon, backgroundMusic;
let sparkles, floatingHearts, clickButton;

// Beautiful Messages for Arun Sir
const loveMessages = [
    "💖 Dear Arun Sir, You Are Amazing! 💖",
    "🌟 Every Day With You Is A Blessing 🌟",
    "💕 Your Smile Lights Up Our World 💕",
    "🎉 Celebrating You Today & Always 🎉",
    "💝 You Make Life More Beautiful 💝",
    "🌹 Thank You For Being Wonderful 🌹"
];

// Initialize DOM elements
function initializeElements() {
    loading = document.getElementById('loading');
    envelopeContainer = document.getElementById('envelopeContainer');
    envelopeSection = document.getElementById('envelopeSection');
    photoGallery = document.getElementById('photoGallery');
    photo1 = document.getElementById('photo1');
    photo2 = document.getElementById('photo2');
    caption1 = document.getElementById('caption1');
    caption2 = document.getElementById('caption2');
    musicControl = document.getElementById('musicControl');
    musicIcon = document.getElementById('musicIcon');
    backgroundMusic = document.getElementById('backgroundMusic');
    sparkles = document.getElementById('sparkles');
    floatingHearts = document.getElementById('floatingHearts');
    clickButton = document.getElementById('clickButton');
    
    // Try to start music immediately when DOM elements are initialized
    if (backgroundMusic) {
        backgroundMusic.volume = 1.0;
        backgroundMusic.play().then(() => {
            console.log('Music started during DOM initialization!');
            window.musicPlaying = true;
            if (musicIcon) musicIcon.textContent = '🎵';
        }).catch(e => {
            console.log('Music autoplay blocked, will retry on load event');
        });
    }
}

// Try to start music as soon as DOM is ready (even before images load)
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - trying to start music');
    const audio = document.getElementById('backgroundMusic');
    if (audio) {
        audio.volume = 1.0;
        audio.play().then(() => {
            console.log('Music started on DOMContentLoaded!');
            window.musicPlaying = true;
            const icon = document.getElementById('musicIcon');
            if (icon) icon.textContent = '🎵';
        }).catch(e => {
            console.log('Music autoplay blocked on DOMContentLoaded');
            // Try multiple times
            setTimeout(() => {
                if (!window.musicPlaying) {
                    audio.play().catch(err => console.log('Retry 1 failed:', err));
                }
            }, 100);
            
            setTimeout(() => {
                if (!window.musicPlaying) {
                    audio.play().catch(err => console.log('Retry 2 failed:', err));
                }
            }, 500);
            
            setTimeout(() => {
                if (!window.musicPlaying) {
                    audio.play().catch(err => console.log('Retry 3 failed:', err));
                }
            }, 1000);
        });
    }
});

// Initialize when page loads
window.addEventListener('load', () => {
    initializeElements();
    
    // Start music IMMEDIATELY when page loads - no delays!
    if (backgroundMusic) {
        backgroundMusic.volume = 1.0; // Full volume
        backgroundMusic.play().then(() => {
            console.log('Auto-play music started immediately!');
            window.musicPlaying = true;
            if (musicIcon) musicIcon.textContent = '🎵';
        }).catch(e => {
            console.log('Auto-play prevented by browser, will play on user interaction');
        });
    }
    
    setTimeout(() => {
        if (loading) loading.classList.add('hidden');
        createFloatingHearts();
        startHeartAnimation();
    }, 1000);
});

// Make functions available globally - moved to end of file

// Create floating hearts animation
function createFloatingHearts() {
    const hearts = ['💖', '💕', '💝', '💗', '💞', '💓', '💘', '❤️', '💜', '🧡', '💛', '💚'];
    
    setInterval(() => {
        if (!floatingHearts) return;
        
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        floatingHearts.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, 10000);
    }, 600);
}

// Create spectacular falling hearts when photos are shown
function createFallingHearts() {
    const hearts = ['💖', '💕', '💝', '💗', '💞', '💓', '💘', '❤️', '💜', '🧡', '💛', '💚'];
    
    setInterval(() => {
        if (!floatingHearts) return;
        
        // Create multiple hearts falling from top
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-fall';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = (Math.random() * 1) + 's';
            heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            floatingHearts.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) heart.remove();
            }, 4000);
        }
    }, 500);
}

// Start heart animations
function startHeartAnimation() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => {
        heart.style.animationPlayState = 'running';
    });
}

// Handle click button click
function handleClickButton() {
    if (window.isOpened) return;
    
    window.isOpened = true;
    
    // Add clicked animation to button
    if (clickButton) clickButton.classList.add('clicked');
    
    // Add opened class for envelope animation
    if (envelopeContainer) envelopeContainer.classList.add('opened');
    
    // Create spectacular sparkle effect
    createSparkles();
    
    // Show love message
    showLoveMessage();
    
    // Ensure music is playing at full volume
    setTimeout(() => {
        if (backgroundMusic) {
            backgroundMusic.volume = 1.0;
            backgroundMusic.play().catch(e => {
                console.log('Music play prevented by browser');
            });
            window.musicPlaying = true;
            if (musicIcon) musicIcon.textContent = '🎵';
        }
    }, 500);
    
    // Transition to photos with enhanced effects
    setTimeout(() => {
        if (envelopeSection) envelopeSection.classList.add('hidden');
        if (photoGallery) photoGallery.classList.add('active');
        if (musicControl) musicControl.classList.add('visible');
        createFallingHearts(); // Start falling hearts
        startPhotoSlideshow();
    }, 2000);
}

// Show beautiful love message
function showLoveMessage() {
    const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    const messageElement = document.createElement('div');
    messageElement.className = 'love-message';
    messageElement.textContent = message;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.remove();
    }, 4000);
}

// Create enhanced sparkle effect
function createSparkles() {
    if (!sparkles) return;
    
    const sparkleSymbols = ['✨', '⭐', '💫', '🌟', '💥', '🎆', '🎇', '🎊', '🎉', '💎'];
    
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
        
        const angle = (360 / 15) * i;
        const distance = 80 + Math.random() * 40;
        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.animationDelay = (i * 0.05) + 's';
        sparkle.style.fontSize = (Math.random() * 15 + 15) + 'px';
        
        sparkles.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) sparkle.remove();
        }, 2000);
    }
    
    sparkles.style.opacity = '1';
    
    // Create burst effect
    setTimeout(() => {
        createBurstEffect();
    }, 500);
}

// Create burst effect
function createBurstEffect() {
    const colors = ['#ff69b4', '#ff1493', '#d63384', '#ffd700', '#ff6347'];
    
    for (let i = 0; i < 20; i++) {
        const burst = document.createElement('div');
        burst.style.position = 'absolute';
        burst.style.top = '50%';
        burst.style.left = '50%';
        burst.style.width = '4px';
        burst.style.height = '4px';
        burst.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        burst.style.borderRadius = '50%';
        burst.style.pointerEvents = 'none';
        
        const angle = (360 / 20) * i;
        const distance = 100 + Math.random() * 50;
        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;
        
        burst.style.animation = `burstMove 1s ease-out forwards`;
        burst.style.animationDelay = (i * 0.02) + 's';
        
        sparkles.appendChild(burst);
        
        setTimeout(() => {
            burst.remove();
        }, 1000);
    }
}

// Add burst animation keyframes
const burstStyle = document.createElement('style');
burstStyle.textContent = `
    @keyframes burstMove {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(-50%, -50%) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1); opacity: 0; }
    }
`;
document.head.appendChild(burstStyle);

// Start photo slideshow
function startPhotoSlideshow() {
    // Show first photo
    showPhoto(1);
    
    // Start interval for automatic photo switching
    window.photoInterval = setInterval(() => {
        window.currentPhoto = window.currentPhoto === 1 ? 2 : 1;
        showPhoto(window.currentPhoto);
    }, 4000); // Changed to 4 seconds for better viewing
}

// Show specific photo with enhanced effects
function showPhoto(photoNumber) {
    // Hide all photos and captions
    if (photo1) photo1.classList.remove('active');
    if (photo2) photo2.classList.remove('active');
    if (caption1) caption1.classList.remove('active');
    if (caption2) caption2.classList.remove('active');
    
    // Show selected photo and caption with beautiful timing
    setTimeout(() => {
        if (photoNumber === 1) {
            if (photo1) photo1.classList.add('active');
            setTimeout(() => {
                if (caption1) caption1.classList.add('active');
            }, 800);
        } else {
            if (photo2) photo2.classList.add('active');
            setTimeout(() => {
                if (caption2) caption2.classList.add('active');
            }, 800);
        }
    }, 200);
    
    // Add some sparkles around the photo
    setTimeout(() => {
        createPhotoSparkles();
    }, 1000);
}

// Create sparkles around photos
function createPhotoSparkles() {
    if (!photoGallery) return;
    
    const sparkleSymbols = ['✨', '⭐', '💫'];
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
        sparkle.style.position = 'absolute';
        sparkle.style.color = '#ffd700';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '15';
        
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animation = 'sparkle 2s ease-out forwards';
        
        photoGallery.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) sparkle.remove();
        }, 2000);
    }
}
// Music control functions
function playMusic() {
    const audio = document.getElementById('backgroundMusic');
    if (audio && !window.musicPlaying) {
        audio.volume = 1.0; // Full volume
        audio.play().then(() => {
            console.log('Music started successfully!');
            window.musicPlaying = true;
            const icon = document.getElementById('musicIcon');
            if (icon) icon.textContent = '🎵';
        }).catch(e => {
            console.log('Music autoplay prevented by browser');
            // Try again after a short delay
            setTimeout(() => {
                if (!window.musicPlaying) {
                    audio.play().catch(err => {
                        console.log('Music retry failed:', err);
                    });
                }
            }, 100);
        });
    }
}

// Try to play music immediately when the script loads
setTimeout(() => {
    playMusic();
}, 50);

// Try again after a short delay
setTimeout(() => {
    if (!window.musicPlaying) {
        playMusic();
    }
}, 200);

// Try once more after DOM is more likely to be ready
setTimeout(() => {
    if (!window.musicPlaying) {
        playMusic();
    }
}, 500);

function toggleMusic() {
    const audio = document.getElementById('backgroundMusic');
    if (!audio) return;
    
    if (window.musicPlaying) {
        audio.pause();
        const icon = document.getElementById('musicIcon');
        if (icon) icon.textContent = '🔇';
        window.musicPlaying = false;
    } else {
        audio.volume = 1.0; // Full volume
        audio.play().then(() => {
            const icon = document.getElementById('musicIcon');
            if (icon) icon.textContent = '🎵';
            window.musicPlaying = true;
        }).catch(e => {
            console.log('Music play failed:', e);
        });
    }
}

// Add click effect anywhere on screen
function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.style.position = 'fixed';
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    effect.style.transform = 'translate(-50%, -50%)';
    effect.style.pointerEvents = 'none';
    effect.style.fontSize = '25px';
    effect.style.zIndex = '1000';
    effect.textContent = '💖';
    effect.style.animation = 'sparkle 1s ease-out forwards';
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 1000);
}

// Event Listeners
document.addEventListener('click', (e) => {
    // Try to start music on any click if not already playing
    if (!window.musicPlaying) {
        playMusic();
    }
    
    if (e.target !== clickButton && !envelopeContainer.contains(e.target)) {
        createClickEffect(e.clientX, e.clientY);
    }
});

// Also try to start music on any interaction
document.addEventListener('touchstart', () => {
    if (!window.musicPlaying) {
        playMusic();
    }
});

document.addEventListener('keydown', () => {
    if (!window.musicPlaying) {
        playMusic();
    }
});

// Music control click
musicControl.addEventListener('click', toggleMusic);

// Preload images for better performance
const img1 = new Image();
const img2 = new Image();
img1.src = 'img1.jpg';
img2.src = 'img2.jpg';

// Add magical touch - random compliments
const compliments = [
    "You're absolutely wonderful, Arun Sir! 🌟",
    "Your presence makes everything better! 💫",
    "You have such a beautiful soul! 💖",
    "Thank you for being amazing! 🎉",
    "You inspire us every day! 🌈",
    "Your kindness touches our hearts! 💕"
];

// Show random compliment every 30 seconds after photos appear
let complimentInterval;

function startCompliments() {
    complimentInterval = setInterval(() => {
        showCompliment();
    }, 30000);
}

function showCompliment() {
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    const complimentElement = document.createElement('div');
    complimentElement.style.position = 'fixed';
    complimentElement.style.bottom = '100px';
    complimentElement.style.left = '50%';
    complimentElement.style.transform = 'translateX(-50%)';
    complimentElement.style.fontFamily = 'Dancing Script, cursive';
    complimentElement.style.fontSize = '1.5rem';
    complimentElement.style.color = '#d63384';
    complimentElement.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
    complimentElement.style.background = 'rgba(255, 255, 255, 0.9)';
    complimentElement.style.padding = '15px 30px';
    complimentElement.style.borderRadius = '25px';
    complimentElement.style.zIndex = '1000';
    complimentElement.style.animation = 'fadeInUp 1s ease-out forwards';
    complimentElement.textContent = compliment;
    
    document.body.appendChild(complimentElement);
    
    setTimeout(() => {
        complimentElement.style.animation = 'fadeOutDown 1s ease-out forwards';
        setTimeout(() => {
            complimentElement.remove();
        }, 1000);
    }, 4000);
}

// Add fadeInUp and fadeOutDown animations
const complimentStyle = document.createElement('style');
complimentStyle.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateX(-50%) translateY(30px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    
    @keyframes fadeOutDown {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(-30px); }
    }
`;
document.head.appendChild(complimentStyle);

// Start compliments when photos begin
setTimeout(() => {
    if (window.isOpened) {
        startCompliments();
    }
}, 5000);

console.log('🎉 Happy Anniversary Surprise Script Loaded! 🎉');
console.log('💖 Made with love for Arun Sir 💖');

// Export functions globally for HTML button to use
window.createSparkles = createSparkles;
window.showLoveMessage = showLoveMessage;
window.createFallingHearts = createFallingHearts;
window.startPhotoSlideshow = startPhotoSlideshow;
window.jsHandleClickButton = handleClickButton;

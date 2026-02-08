// ============================================
// Bubu Dudu Valentine's Day Website JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const questionPage = document.getElementById('questionPage');
    const successPage = document.getElementById('successPage');
    const heartsContainer = document.getElementById('heartsContainer');
    const confettiCanvas = document.getElementById('confettiCanvas');
    const ctx = confettiCanvas.getContext('2d');
    const bgMusic = document.getElementById('bgMusic');
    const startOverlay = document.getElementById('startOverlay');
    const celebrationVideo = document.getElementById('celebrationVideo');

    // Set canvas size
    function resizeCanvas() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ============================================
    // Start Overlay - Click to begin & play music
    // ============================================
    startOverlay.addEventListener('click', () => {
        startOverlay.classList.add('hidden');
        // Start playing background music
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
    });

    // ============================================
    // Floating Hearts Generator
    // ============================================
    const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🩷', '🌸', '✨', '💐', '🌹'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 12000);
    }

    // Create hearts periodically
    setInterval(createHeart, 600);
    // Create initial hearts
    for (let i = 0; i < 12; i++) {
        setTimeout(createHeart, i * 200);
    }

    // ============================================
    // No Button - Moves away when clicked
    // ============================================
    const moveDistance = 100; // How far to move when clicked
    let currentBtnX = null;
    let currentBtnY = null;
    let hasMovedOnce = false;

    function moveNoButtonRandomly() {
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const padding = 20;
        
        // Get initial position if first time
        if (!hasMovedOnce) {
            const rect = noBtn.getBoundingClientRect();
            currentBtnX = rect.left;
            currentBtnY = rect.top;
            hasMovedOnce = true;
        }
        
        // Random angle
        const angle = Math.random() * Math.PI * 2;
        
        // Calculate new position
        let newX = currentBtnX + Math.cos(angle) * moveDistance;
        let newY = currentBtnY + Math.sin(angle) * moveDistance;
        
        // Keep within screen bounds (with wrapping)
        if (newX < -btnWidth / 2) {
            newX = screenWidth - btnWidth / 2;
        } else if (newX > screenWidth - btnWidth / 2) {
            newX = -btnWidth / 2 + padding;
        }
        
        if (newY < padding) {
            newY = screenHeight - btnHeight - padding;
        } else if (newY > screenHeight - btnHeight - padding) {
            newY = padding;
        }
        
        // Update position
        currentBtnX = newX;
        currentBtnY = newY;
        
        // Apply new position
        noBtn.style.position = 'fixed';
        noBtn.style.left = currentBtnX + 'px';
        noBtn.style.top = currentBtnY + 'px';
        noBtn.style.margin = '0';
        noBtn.style.zIndex = '50';
        noBtn.style.transition = 'left 0.2s ease-out, top 0.2s ease-out';
    }

    // No button click handler - just move away
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        moveNoButtonRandomly();
    });

    // Touch handler for mobile
    noBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        moveNoButtonRandomly();
    });

    // ============================================
    // Yes Button Click Handler
    // ============================================
    yesBtn.addEventListener('click', () => {
        // Pause background music so user can watch video
        bgMusic.pause();
        
        // Hide question page, show success page
        questionPage.classList.add('hidden');
        successPage.classList.remove('hidden');
        
        // Auto-play the video
        if (celebrationVideo) {
            celebrationVideo.muted = false;
            celebrationVideo.play().catch(e => {
                console.log('Video autoplay failed, trying muted:', e);
                celebrationVideo.muted = true;
                celebrationVideo.play();
            });
        }
        
        // Start confetti celebration
        startConfetti();
        
        // Create extra hearts for celebration
        for (let i = 0; i < 40; i++) {
            setTimeout(createHeart, i * 80);
        }
    });

    // ============================================
    // Confetti Animation
    // ============================================
    const confettiColors = ['#FF69B4', '#FF1493', '#C2185B', '#880E4F', '#E91E63', '#FF4D6D', '#FFB6C1', '#DDA0DD', '#FFD700', '#FF6B6B'];
    const confettiPieces = [];

    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * confettiCanvas.width;
            this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
            this.size = Math.random() * 12 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 4 - 2;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
            this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            this.shape = Math.random() > 0.5 ? 'circle' : 'rect';
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            if (this.y > confettiCanvas.height) {
                this.y = -this.size;
                this.x = Math.random() * confettiCanvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            
            if (this.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 2);
            }
            
            ctx.restore();
        }
    }

    let confettiAnimationId;
    let confettiRunning = false;

    function startConfetti() {
        if (confettiRunning) return;
        confettiRunning = true;
        
        for (let i = 0; i < 200; i++) {
            confettiPieces.push(new ConfettiPiece());
        }
        
        animateConfetti();
        
        setTimeout(() => {
            confettiRunning = false;
            cancelAnimationFrame(confettiAnimationId);
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            confettiPieces.length = 0;
        }, 10000);
    }

    function animateConfetti() {
        if (!confettiRunning) return;
        
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();
        });
        
        confettiAnimationId = requestAnimationFrame(animateConfetti);
    }

    // ============================================
    // Window resize handler
    // ============================================
    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    // ============================================
    // Sparkle effect on mouse/touch move
    // ============================================
    let lastSparkleTime = 0;
    const sparkleDelay = 100;
    
    function handleSparkle(x, y) {
        const now = Date.now();
        if (now - lastSparkleTime > sparkleDelay) {
            lastSparkleTime = now;
            createSparkle(x, y);
        }
    }
    
    document.addEventListener('mousemove', (e) => handleSparkle(e.clientX, e.clientY));
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            handleSparkle(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        const sparkleEmojis = ['✨', '💖', '💕', '⭐', '🌟'];
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        sparkle.style.cssText = `
            position: fixed;
            left: ${x + offsetX}px;
            top: ${y + offsetY}px;
            pointer-events: none;
            font-size: ${10 + Math.random() * 8}px;
            z-index: 1000;
            animation: sparkleAnim 0.6s ease-out forwards;
        `;
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 600);
    }

    // Sparkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleAnim {
            0% {
                opacity: 1;
                transform: scale(1) translate(0, 0) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: scale(0.3) translate(${Math.random() * 40 - 20}px, -30px) rotate(${Math.random() * 180}deg);
            }
        }
    `;
    document.head.appendChild(style);
});

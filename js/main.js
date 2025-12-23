// ================================
// GLOBAL VARIABLES
// ================================
const body = document.body;
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.getElementById('hamburger');
const themeToggle = document.getElementById('theme-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const loaderWrapper = document.querySelector('.loader-wrapper');

// ================================
// CUSTOM CURSOR WITH GLOW (Desktop Only)
// ================================
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

if (!isMobile) {
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const distX = mouseX - cursorX;
        const distY = mouseY - cursorY;
        
        cursorX += distX * 0.1;
        cursorY += distY * 0.1;
        
        if (cursorGlow) {
            cursorGlow.style.left = cursorX + 'px';
            cursorGlow.style.top = cursorY + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Enlarge cursor on hover over interactive elements
    document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorGlow) cursorGlow.style.transform = 'translate(-50%, -50%) scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            if (cursorGlow) cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
} else {
    // Remove custom cursor on mobile
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) cursorGlow.remove();
    document.body.style.cursor = 'auto';
}

// ================================
// MATRIX RAIN EFFECT (Optimized for Mobile)
// ================================
const matrixCanvas = document.getElementById('matrix-rain');
if (matrixCanvas && !isMobile) {
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|';
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        ctx.fillStyle = '#667eea';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);

    window.addEventListener('resize', () => {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    });
} else if (matrixCanvas) {
    // Reduce opacity on mobile for performance
    matrixCanvas.style.opacity = '0.02';
}

// ================================
// TERMINAL LOADING SCREEN
// ================================
function initTerminalLoader() {
    const terminalCommands = [
        {
            text: 'whoami',
            output: 'Mehdi Ebrahimzadeh - Software Engineer',
            delay: 50
        },
        {
            text: 'cat skills.txt',
            output: 'Full-Stack Development | Cloud Architecture | AI/ML',
            delay: 40
        },
        {
            text: 'npm run build-portfolio',
            output: '',
            delay: 30
        }
    ];

    let currentCommand = 0;
    let currentChar = 0;

    function typeTerminalText() {
        const command = terminalCommands[currentCommand];
        const textElement = document.getElementById(`terminal-text-${currentCommand + 1}`);
        const lineElement = document.getElementById(`terminal-line-${currentCommand + 2}`);
        const outputElement = document.getElementById(`terminal-output-${currentCommand + 1}`);
        
        if (!textElement) return;
        
        if (currentChar < command.text.length) {
            textElement.textContent += command.text[currentChar];
            currentChar++;
            setTimeout(typeTerminalText, command.delay);
        } else {
            // Command typed, show output
            if (lineElement) lineElement.style.display = 'flex';
            if (outputElement && command.output) {
                setTimeout(() => {
                    outputElement.textContent = command.output;
                    
                    // Move to next command
                    currentCommand++;
                    currentChar = 0;
                    
                    if (currentCommand < terminalCommands.length) {
                        const nextLine = document.getElementById(`terminal-line-${currentCommand + 2}`);
                        if (nextLine) {
                            setTimeout(() => {
                                nextLine.style.display = 'flex';
                                typeTerminalText();
                            }, 300);
                        }
                    } else {
                        // All commands done, show progress
                        setTimeout(showProgress, 500);
                    }
                }, 300);
            } else {
                // No output, show progress immediately
                setTimeout(showProgress, 500);
            }
        }
    }

    function showProgress() {
        const progressElement = document.getElementById('terminal-progress');
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        if (progressElement) {
            progressElement.style.display = 'block';
            
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 2;
                if (progressFill) progressFill.style.width = progress + '%';
                if (progressText) progressText.textContent = `Building portfolio... ${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        if (loaderWrapper) {
                            loaderWrapper.classList.add('fade-out');
                            setTimeout(() => {
                                loaderWrapper.style.display = 'none';
                                
                                // Show particles after terminal loader is completely hidden
                                const particlesContainer = document.getElementById('particles-js');
                                if (particlesContainer) {
                                    particlesContainer.style.display = 'block';
                                }
                            }, 500);
                        }
                    }, 500);
                }
            }, 20);
        }
    }

    // Start terminal animation after a short delay
    setTimeout(() => {
        typeTerminalText();
    }, 500);
}

// Initialize terminal loader when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTerminalLoader);
} else {
    initTerminalLoader();
}

// ================================
// PARTICLES.JS CONFIGURATION (Optimized)
// ================================
// Hide particles initially and show after terminal loader
if (typeof particlesJS !== 'undefined' && !isMobile) {
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        particlesContainer.style.display = 'none';
    }
    
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#667eea'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#667eea',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// ================================
// THEME TOGGLE
// ================================
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

if (currentTheme === 'dark') {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const theme = body.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    themeToggle.innerHTML = newTheme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
});

// ================================
// NAVBAR SCROLL EFFECT & PROGRESS BAR
// ================================
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Update progress bar
    if (scrollProgress) {
        scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
    }
    
    // Navbar scroll effect
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ================================
// MOBILE NAVIGATION
// ================================
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ================================
// ACTIVE NAV LINK ON SCROLL
// ================================
const sections = document.querySelectorAll('section[id]');

function activeNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href*=${sectionId}]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href*=${sectionId}]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activeNavLink);

// ================================
// TYPING ANIMATION WITH BACKSPACE
// ================================
const typingText = document.querySelector('.typing-text');
const texts = [
    'Software Engineer 💻',
    'Full-Stack Developer 🚀',
    'Cloud Architect ☁️',
    'Backend Specialist ⚡',
    'AI Enthusiast 🤖',
    'Open Source Contributor 🌟',
    'Problem Solver 🧩',
    'Code Ninja 🥷'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 30; // Faster delete
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80; // Faster typing
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1500; // Shorter pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 300; // Shorter pause before next word
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start typing after page load
setTimeout(typeText, 1000);

// ================================
// COUNTER ANIMATION
// ================================
function animateCounter(element, start, end, duration, isDecimal = false) {
    let startTime = null;
    
    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = start + (end - start) * progress;
        
        element.textContent = isDecimal ? value.toFixed(1) : Math.floor(value);
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// ================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate stats
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const isDecimal = entry.target.getAttribute('data-target').includes('.');
                animateCounter(entry.target, 0, target, 2000, isDecimal);
            }
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-progress')) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.setProperty('--progress', progress + '%');
                entry.target.classList.add('animated');
            }
        }
    });
}, observerOptions);

// Observe stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
});

// Observe skill bars
document.querySelectorAll('.skill-progress').forEach(skill => {
    observer.observe(skill);
});

// ================================
// AOS-LIKE ANIMATION (Custom Implementation)
// ================================
function handleScrollAnimation() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('aos-animate');
        }
    });
}

// Add CSS for AOS animations
const aosStyle = document.createElement('style');
aosStyle.textContent = `
    [data-aos] {
        opacity: 0;
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    [data-aos="fade-up"] {
        transform: translateY(30px);
    }
    
    [data-aos="fade-left"] {
        transform: translateX(-30px);
    }
    
    [data-aos="fade-right"] {
        transform: translateX(30px);
    }
    
    [data-aos].aos-animate {
        opacity: 1;
        transform: translateY(0) translateX(0);
    }
`;
document.head.appendChild(aosStyle);

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// ================================
// SMOOTH SCROLLING
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// FORM HANDLING
// ================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link
        const mailtoLink = `mailto:mehdi.ebr.work@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Opening your email client...');
        contactForm.reset();
    });
}

// ================================
// CURSOR TRAIL EFFECT (Optional)
// ================================
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.cursor-circle');

if (circles.length === 0 && window.innerWidth > 768) {
    // Create cursor circles
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'cursor-circle';
        document.body.appendChild(circle);
    }
    
    const cursorCircles = document.querySelectorAll('.cursor-circle');
    
    cursorCircles.forEach((circle, index) => {
        circle.x = 0;
        circle.y = 0;
        circle.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${8 - index * 0.3}px;
            height: ${8 - index * 0.3}px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            pointer-events: none;
            z-index: 9998;
            opacity: ${1 - index * 0.05};
            transition: opacity 0.3s;
        `;
    });
    
    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });
    
    function animateCircles() {
        let x = coords.x;
        let y = coords.y;
        
        cursorCircles.forEach((circle, index) => {
            circle.style.left = x - 4 + 'px';
            circle.style.top = y - 4 + 'px';
            circle.style.transform = `scale(${(cursorCircles.length - index) / cursorCircles.length})`;
            
            circle.x = x;
            circle.y = y;
            
            const nextCircle = cursorCircles[index + 1] || cursorCircles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });
        
        requestAnimationFrame(animateCircles);
    }
    
    animateCircles();
}

// ================================
// MAGNETIC BUTTON EFFECT
// ================================
const magneticElements = document.querySelectorAll('.magnetic-element, .magnetic-button');

magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.3;
        const moveY = y * 0.3;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
    });
});

// ================================
// RIPPLE EFFECT ON CLICK
// ================================
document.querySelectorAll('.ripple-effect').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        if (!document.querySelector('style[data-ripple]')) {
            rippleStyle.setAttribute('data-ripple', 'true');
            document.head.appendChild(rippleStyle);
        }
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ================================
// VANILLA TILT INITIALIZATION
// ================================
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        scale: 1.05
    });
}

// ================================
// CODE RAIN IN BACKGROUND (Desktop Only)
// ================================
function createCodeRain() {
    const container = document.getElementById('code-rain');
    if (!container || isMobile) return;
    
    const codes = ['HTML', 'CSS', 'JS', 'REACT', 'NODE', 'PYTHON', 'GO', 'C#', 'JAVA', '{', '}', '(', ')', ';', '0', '1'];
    
    setInterval(() => {
        if (container.children.length > 50) return;
        
        const code = document.createElement('div');
        code.textContent = codes[Math.floor(Math.random() * codes.length)];
        code.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: -20px;
            font-size: ${Math.random() * 20 + 10}px;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: fall ${Math.random() * 5 + 3}s linear forwards;
        `;
        
        container.appendChild(code);
        
        setTimeout(() => code.remove(), 8000);
    }, 200);
}

const fallAnimation = document.createElement('style');
fallAnimation.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fallAnimation);

if (!isMobile) {
    createCodeRain();
}

// ================================
// TOUCH SUPPORT FOR MOBILE
// ================================
if (isMobile) {
    // Add touch feedback to buttons
    document.querySelectorAll('.btn, .project-card, .social-link').forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        el.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Prevent double-tap zoom on buttons
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// ================================
// PARALLAX EFFECT
// ================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-image, .blob');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Parallax for floating shapes
    document.querySelectorAll('.shape').forEach((shape, index) => {
        const speed = 0.1 * (index + 1);
        shape.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });
});

// ================================
// SHOOTING STARS EFFECT
// ================================
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
        top: ${Math.random() * 50}%;
        left: ${Math.random() * 100}%;
        z-index: 1;
        animation: shoot 2s linear forwards;
    `;
    
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2000);
}

const shootStyle = document.createElement('style');
shootStyle.textContent = `
    @keyframes shoot {
        0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
        }
        100% {
            transform: translate(1000px, 1000px) rotate(45deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(shootStyle);

// Create shooting stars periodically (desktop only)
if (!isMobile) {
    setInterval(createShootingStar, 3000);
}

// ================================
// PARTICLE EXPLOSION ON CLICK
// ================================
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        createParticleExplosion(e.clientX, e.clientY);
    }
});

function createParticleExplosion(x, y) {
    const particleCount = 15;
    const colors = ['#667eea', '#764ba2', '#f093fb', '#00f3ff', '#ff00ff'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 100 + Math.random() * 50;
        
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 9999;
            box-shadow: 0 0 10px currentColor;
        `;
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });
        
        animation.onfinish = () => particle.remove();
    }
}

// ================================
// PROJECT CARD TILT EFFECT
// ================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ================================
// CONSOLE EASTER EGG WITH ASCII ART
// ================================
console.log('%c╔═══════════════════════════════════════════════════════════╗', 'color: #667eea; font-weight: bold;');
console.log('%c║                                                           ║', 'color: #667eea; font-weight: bold;');
console.log('%c║   🚀 WELCOME TO MEHDI\'S PORTFOLIO! 🚀                     ║', 'color: #667eea; font-size: 18px; font-weight: bold;');
console.log('%c║                                                           ║', 'color: #667eea; font-weight: bold;');
console.log('%c║   Hey there, fellow developer! 👋                         ║', 'color: #764ba2;');
console.log('%c║   Thanks for checking out my code!                        ║', 'color: #764ba2;');
console.log('%c║                                                           ║', 'color: #667eea; font-weight: bold;');
console.log('%c║   💼 Looking for a talented developer?                    ║', 'color: #667eea;');
console.log('%c║   📧 mehdi.ebr.work@gmail.com                            ║', 'color: #667eea;');
console.log('%c║   🔗 linkedin.com/in/mehdi-ebr                           ║', 'color: #667eea;');
console.log('%c║   💻 github.com/Mahd1exo                                 ║', 'color: #667eea;');
console.log('%c║                                                           ║', 'color: #667eea; font-weight: bold;');
console.log('%c║   ⭐ Fun Fact: This portfolio has:                        ║', 'color: #f093fb;');
console.log('%c║      • Matrix rain effect                                 ║', 'color: #f093fb;');
console.log('%c║      • Custom cursor with glow                            ║', 'color: #f093fb;');
console.log('%c║      • Magnetic buttons                                   ║', 'color: #f093fb;');
console.log('%c║      • Particle explosions                                ║', 'color: #f093fb;');
console.log('%c║      • Shooting stars                                     ║', 'color: #f093fb;');
console.log('%c║      • And much more! 🎨                                  ║', 'color: #f093fb;');
console.log('%c║                                                           ║', 'color: #667eea; font-weight: bold;');
console.log('%c╚═══════════════════════════════════════════════════════════╝', 'color: #667eea; font-weight: bold;');

console.log('\n%cTry typing: portfolio.showStats()', 'color: #00f3ff; font-style: italic;');

// Interactive console commands
window.portfolio = {
    showStats: () => {
        console.log('%c📊 Portfolio Statistics:', 'color: #667eea; font-size: 16px; font-weight: bold;');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎓 GPA: 4.0/4.0');
        console.log('💼 Years Experience: 4+');
        console.log('🚀 Projects: 20+');
        console.log('⚡ Uptime: 99.9%');
        console.log('🏆 Hackathon Wins: 3');
        console.log('💰 Scholarship: $29,000');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    },
    contact: () => {
        console.log('%c📱 Contact Information:', 'color: #764ba2; font-size: 16px; font-weight: bold;');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email: mehdi.ebr.work@gmail.com');
        console.log('📞 Phone: +1 514-550-5492');
        console.log('🔗 LinkedIn: linkedin.com/in/mehdi-ebr');
        console.log('💻 GitHub: github.com/Mahd1exo');
        console.log('🌐 Website: mahd1exo.github.io');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    },
    skills: () => {
        console.log('%c🛠️ Technical Skills:', 'color: #f093fb; font-size: 16px; font-weight: bold;');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Languages: C#, Python, Go, TypeScript, Java, C/C++');
        console.log('Frameworks: .NET Core, Node.js, React, Django');
        console.log('Tools: Docker, Kubernetes, AWS, Git, CI/CD');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    },
    easteregg: () => {
        console.log('%c🎉 YOU FOUND THE EASTER EGG! 🎉', 'color: #00f3ff; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
        console.log('%c🎊 Congratulations! You\'re a true developer! 🎊', 'color: #ff00ff; font-size: 16px;');
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createParticleExplosion(window.innerWidth / 2, window.innerHeight / 2);
            }, i * 200);
        }
    }
};

console.log('\n%c💡 Available commands:', 'color: #39ff14; font-weight: bold;');
console.log('  • portfolio.showStats()');
console.log('  • portfolio.contact()');
console.log('  • portfolio.skills()');
console.log('  • portfolio.easteregg()');
console.log('');

// ================================
// PERFORMANCE OPTIMIZATION
// ================================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ================================
// INITIALIZE
// ================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully! ✨');
    
    // Trigger initial animations
    handleScrollAnimation();
    activeNavLink();
    
    // Add text scramble effect to headings
    scrambleText();
    
    // Initialize wave effect on hover
    initWaveEffect();
});

// ================================
// TEXT SCRAMBLE EFFECT
// ================================
function scrambleText() {
    const elements = document.querySelectorAll('.section-title');
    
    elements.forEach(element => {
        const originalText = element.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !element.dataset.scrambled) {
                    element.dataset.scrambled = 'true';
                    let iteration = 0;
                    
                    const interval = setInterval(() => {
                        element.textContent = originalText
                            .split('')
                            .map((char, index) => {
                                if (index < iteration) {
                                    return originalText[index];
                                }
                                return chars[Math.floor(Math.random() * chars.length)];
                            })
                            .join('');
                        
                        if (iteration >= originalText.length) {
                            clearInterval(interval);
                        }
                        
                        iteration += 1/3;
                    }, 30);
                }
            });
        });
        
        observer.observe(element);
    });
}

// ================================
// WAVE EFFECT ON CARDS
// ================================
function initWaveEffect() {
    const cards = document.querySelectorAll('.project-card, .timeline-content, .skill-category');
    
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = `wave 0.5s ease ${index * 0.1}s`;
        });
        
        card.addEventListener('animationend', () => {
            card.style.animation = '';
        });
    });
    
    const waveStyle = document.createElement('style');
    waveStyle.textContent = `
        @keyframes wave {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(1deg); }
            50% { transform: translateY(-5px) rotate(-1deg); }
            75% { transform: translateY(-15px) rotate(0.5deg); }
        }
    `;
    document.head.appendChild(waveStyle);
}

// ================================
// SCROLL PROGRESS INDICATOR
// ================================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
    z-index: 10000;
    transition: width 0.1s;
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.8);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ================================
// FLOATING EMOJIS ON SCROLL (Desktop Only)
// ================================
let lastScrollY = window.pageYOffset;
let lastEmojiTime = 0;
const emojis = ['💻', '🚀', '⚡', '🎨', '🔥', '✨', '💡', '🎯', '🌟', '💪'];

if (!isMobile) {
    window.addEventListener('scroll', () => {
        const currentScrollY = window.pageYOffset;
        const currentTime = Date.now();
        
        // Only spawn emoji every 5 seconds and if scrolled enough
        if (Math.abs(currentScrollY - lastScrollY) > 150 && (currentTime - lastEmojiTime) > 5000) {
            // Spawn only 1-2 emojis
            const emojiCount = Math.random() > 0.5 ? 1 : 2;
            
            for (let i = 0; i < emojiCount; i++) {
                const emoji = document.createElement('div');
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * (window.innerWidth - 50)}px;
                    top: ${window.innerHeight / 2}px;
                    font-size: 30px;
                    pointer-events: none;
                    z-index: 9999;
                    animation: floatUp 2s ease-out forwards;
                `;
                
                document.body.appendChild(emoji);
                setTimeout(() => emoji.remove(), 2000);
            }
            
            lastScrollY = currentScrollY;
            lastEmojiTime = currentTime;
        }
    });
}

const floatUpStyle = document.createElement('style');
floatUpStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.9;
        }
        80% {
            opacity: 0.8;
        }
        100% {
            transform: translateY(-200px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatUpStyle);

// ================================
// BACK TO TOP BUTTON
// ================================
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 5px 25px rgba(102, 126, 234, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.transform = 'translateY(-5px) scale(1.1)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.transform = 'translateY(0) scale(1)';
});

// ================================
// PERFORMANCE OPTIMIZATIONS
// ================================

// Reduce animations when battery is low (if supported)
if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        if (battery.level < 0.2) {
            document.body.classList.add('low-power-mode');
            // Disable heavy animations
            document.querySelectorAll('.shape, #matrix-rain').forEach(el => {
                el.style.display = 'none';
            });
        }
    });
}

// Optimize scroll performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            activeNavLink();
            ticking = false;
        });
        ticking = true;
    }
});

// Preload critical fonts
if ('fonts' in document) {
    Promise.all([
        document.fonts.load('400 1em Poppins'),
        document.fonts.load('600 1em Poppins'),
        document.fonts.load('400 1em JetBrains Mono')
    ]).then(() => {
        document.body.classList.add('fonts-loaded');
    });
}

// Service Worker for offline support (optional)
if ('serviceWorker' in navigator && !isMobile) {
    window.addEventListener('load', () => {
        // Uncomment to enable offline support
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ================================
// ACCESSIBILITY IMPROVEMENTS
// ================================

// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Navigate sections with arrow keys (when focused)
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentSection = sections.find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
        });
        
        if (currentSection && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            const currentIndex = sections.indexOf(currentSection);
            const nextIndex = e.key === 'ArrowDown' 
                ? Math.min(currentIndex + 1, sections.length - 1)
                : Math.max(currentIndex - 1, 0);
            
            sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Announce page loads to screen readers
const announcement = document.createElement('div');
announcement.setAttribute('role', 'status');
announcement.setAttribute('aria-live', 'polite');
announcement.style.cssText = `
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
`;
document.body.appendChild(announcement);

setTimeout(() => {
    announcement.textContent = 'Portfolio loaded successfully. Welcome to Mehdi Ebrahimzadeh\'s portfolio.';
}, 2000);

// ================================
// THREE.JS 3D BACKGROUND
// ================================
function initThreeJS() {
    if (isMobile || !window.THREE) return;

    const container = document.getElementById('three-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create particle system
    const particleCount = 2000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;

        colors[i] = 0.4 + Math.random() * 0.6;
        colors[i + 1] = 0.49 + Math.random() * 0.51;
        colors[i + 2] = 0.92;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Add geometric shapes
    const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0x667eea,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    const icosahedronGeometry = new THREE.IcosahedronGeometry(8, 0);
    const icosahedronMaterial = new THREE.MeshBasicMaterial({
        color: 0x764ba2,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.position.set(20, 0, -10);
    scene.add(icosahedron);

    camera.position.z = 50;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);

        particleSystem.rotation.x += 0.0005;
        particleSystem.rotation.y += 0.001;

        torus.rotation.x += 0.005;
        torus.rotation.y += 0.008;
        torus.rotation.z += 0.003;

        icosahedron.rotation.x -= 0.003;
        icosahedron.rotation.y -= 0.005;

        camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 10 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ================================
// MOUSE TRAIL EFFECT
// ================================
function initMouseTrail() {
    if (isMobile) return;

    const canvas = document.getElementById('mouse-trail');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const trail = [];
    const maxTrailLength = 30;

    document.addEventListener('mousemove', (e) => {
        trail.push({
            x: e.clientX,
            y: e.clientY,
            life: 1
        });

        if (trail.length > maxTrailLength) {
            trail.shift();
        }
    });

    function drawTrail() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        trail.forEach((point, index) => {
            point.life -= 0.03;

            if (point.life > 0) {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 3 * point.life, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(102, 126, 234, ${point.life * 0.5})`;
                ctx.fill();

                // Connect points
                if (index > 0) {
                    ctx.beginPath();
                    ctx.moveTo(trail[index - 1].x, trail[index - 1].y);
                    ctx.lineTo(point.x, point.y);
                    ctx.strokeStyle = `rgba(118, 75, 162, ${point.life * 0.3})`;
                    ctx.lineWidth = 2 * point.life;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(drawTrail);
    }

    drawTrail();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ================================
// PROJECT CARD PARTICLES
// ================================
function initProjectParticles() {
    if (isMobile) return;

    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, cardIndex) => {
        const canvas = card.querySelector('.project-particles');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const rect = card.getBoundingClientRect();
        
        canvas.width = rect.width;
        canvas.height = rect.height;

        const particles = [];
        const particleCount = 40;

        // Create particles with unique colors per card
        const colors = [
            ['102, 126, 234', '118, 75, 162'],
            ['244, 92, 67', '249, 151, 0'],
            ['26, 188, 156', '22, 160, 133'],
            ['155, 89, 182', '142, 68, 173']
        ];

        const cardColors = colors[cardIndex % colors.length];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? cardColors[0] : cardColors[1]
            });
        }

        let animationId;
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color}, 0.6)`;
                ctx.fill();

                // Connect nearby particles
                particles.forEach((p2, j) => {
                    if (i !== j) {
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 80) {
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `rgba(${p.color}, ${0.2 * (1 - distance / 80)})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                });
            });

            animationId = requestAnimationFrame(animate);
        }

        // Only animate when card is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                } else {
                    if (animationId) cancelAnimationFrame(animationId);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(card);
    });
}

// ================================
// SOUND SYSTEM
// ================================
const soundSystem = {
    enabled: localStorage.getItem('soundEnabled') !== 'false',
    sounds: {},
    audioContext: null,
    
    init() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.loadSounds();
        this.setupToggle();
    },
    
    loadSounds() {
        this.sounds.click = () => {
            if (!this.enabled) return;
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        };
        
        this.sounds.hover = () => {
            if (!this.enabled) return;
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = 600;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.05);
        };
    },
    
    setupToggle() {
        const toggle = document.getElementById('sound-toggle');
        if (!toggle) return;
        
        const icon = toggle.querySelector('i');
        toggle.classList.toggle('muted', !this.enabled);
        
        if (!this.enabled) {
            icon.className = 'fas fa-volume-mute';
        }
        
        toggle.addEventListener('click', () => {
            this.enabled = !this.enabled;
            localStorage.setItem('soundEnabled', this.enabled);
            toggle.classList.toggle('muted', !this.enabled);
            
            if (this.enabled) {
                icon.className = 'fas fa-volume-up';
                this.sounds.click();
            } else {
                icon.className = 'fas fa-volume-mute';
            }
        });
    },
    
    play(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    }
};

function initSoundSystem() {
    soundSystem.init();
    
    // Add sound effects to interactive elements
    document.querySelectorAll('a, button, .project-card, .timeline-item').forEach(el => {
        el.addEventListener('mouseenter', () => soundSystem.play('hover'));
        el.addEventListener('click', () => soundSystem.play('click'));
    });
}

// ================================
// FPS MONITOR
// ================================
function initFPSMonitor() {
    const monitor = document.getElementById('fps-monitor');
    if (!monitor) return;

    let lastTime = performance.now();
    let frames = 0;
    let fps = 60;

    function updateFPS() {
        const currentTime = performance.now();
        frames++;

        if (currentTime >= lastTime + 1000) {
            fps = Math.round((frames * 1000) / (currentTime - lastTime));
            monitor.textContent = `${fps} FPS`;
            
            // Color code based on performance
            if (fps >= 55) {
                monitor.style.color = '#00ff00';
            } else if (fps >= 30) {
                monitor.style.color = '#ffff00';
            } else {
                monitor.style.color = '#ff0000';
            }
            
            frames = 0;
            lastTime = currentTime;
        }

        requestAnimationFrame(updateFPS);
    }

    updateFPS();

    // Toggle FPS monitor with Ctrl+F
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            monitor.style.display = monitor.style.display === 'none' ? 'block' : 'none';
        }
    });
}

// ================================
// SPLIT TEXT ANIMATION
// ================================
function initSplitText() {
    const splitElements = document.querySelectorAll('[data-splitting]');
    
    splitElements.forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.05}s`;
            el.appendChild(span);
        });
    });
}

// ================================
// ADVANCED HOVER EFFECTS
// ================================
function initAdvancedHoverEffects() {
    // Enhanced stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Timeline enhancements
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize all new features
setTimeout(() => {
    initThreeJS();
    initMouseTrail();
    initProjectParticles();
    initSoundSystem();
    initFPSMonitor();
    initSplitText();
    initAdvancedHoverEffects();
}, 100);

console.log('%c✨ Portfolio fully optimized and ready! ✨', 'color: #00ff00; font-size: 16px; font-weight: bold;');
console.log('%c🚀 Advanced features loaded:', 'color: #667eea; font-size: 14px; font-weight: bold;');
console.log('%c  • Three.js 3D Background', 'color: #764ba2; font-size: 12px;');
console.log('%c  • Mouse Trail Effect', 'color: #764ba2; font-size: 12px;');
console.log('%c  • Project Card Particles', 'color: #764ba2; font-size: 12px;');
console.log('%c  • Sound System (Toggle with button)', 'color: #764ba2; font-size: 12px;');
console.log('%c  • FPS Monitor (Ctrl+F to toggle)', 'color: #764ba2; font-size: 12px;');
console.log('%c  • Split Text Animations', 'color: #764ba2; font-size: 12px;');

// ================================
// PARALLAX SCROLLING EFFECT
// ================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.stars-small, .stars-medium, .stars-large');
    
    parallaxElements.forEach((el, index) => {
        const speed = (index + 1) * 0.3;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Move blobs on scroll
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.05;
        blob.style.transform = `translate(${Math.sin(scrolled * 0.001) * 50}px, ${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// ================================
// INTERACTIVE HOVER EXPLOSIONS
// ================================
function createHoverExplosion(x, y) {
    const colors = ['#667eea', '#764ba2', '#f45c43', '#1a8cff', '#f093fb'];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            box-shadow: 0 0 10px currentColor;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 12;
        const velocity = 2 + Math.random() * 3;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        function animate() {
            posX += vx;
            posY += vy;
            opacity -= 0.02;
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        animate();
    }
}

// Add hover explosions to project cards
document.querySelectorAll('.project-card, .skill-item, .btn').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
        if (!isMobile) {
            createHoverExplosion(e.clientX, e.clientY);
        }
    });
});

// ================================
// RAINBOW CURSOR TRAIL
// ================================
if (!isMobile) {
    const colors = ['#667eea', '#764ba2', '#f45c43', '#1a8cff', '#f093fb', '#4facfe'];
    let colorIndex = 0;
    
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.8) { // Only create trail occasionally for performance
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${colors[colorIndex % colors.length]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                box-shadow: 0 0 10px ${colors[colorIndex % colors.length]};
                animation: trail-fade 1s ease-out forwards;
            `;
            
            document.body.appendChild(trail);
            colorIndex++;
            
            setTimeout(() => trail.remove(), 1000);
        }
    });
}

// Trail fade animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trail-fade {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(trailStyle);

// ================================
// SECTION ENTRANCE ANIMATIONS (Skip Hero Section)
// ================================
const sectionElements = document.querySelectorAll('section:not(#home)');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'section-entrance 0.8s ease-out forwards';
        }
    });
}, { threshold: 0.1 });

sectionElements.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    sectionObserver.observe(section);
});

const sectionStyle = document.createElement('style');
sectionStyle.textContent = `
    @keyframes section-entrance {
        0% {
            opacity: 0;
            transform: translateY(50px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(sectionStyle);

// ================================
// FLOATING EMOJIS ON ACHIEVEMENT HOVER
// ================================
document.querySelectorAll('.highlight-item, .stat-item').forEach(item => {
    item.addEventListener('mouseenter', function(e) {
        if (isMobile) return;
        
        const emojis = ['✨', '🚀', '💫', '⭐', '🌟', '💥', '🎯', '🔥'];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        const span = document.createElement('span');
        span.textContent = emoji;
        span.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            font-size: 2rem;
            pointer-events: none;
            z-index: 1000;
            animation: float-away 2s ease-out forwards;
        `;
        
        this.style.position = 'relative';
        this.appendChild(span);
        
        setTimeout(() => span.remove(), 2000);
    });
});

const emojiStyle = document.createElement('style');
emojiStyle.textContent = `
    @keyframes float-away {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 0.9;
        }
        70% {
            opacity: 0.85;
        }
        100% {
            transform: translate(-50%, -200%) scale(1.5) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(emojiStyle);

// ================================
// LAZY LOADING WITH ANIMATIONS
// ================================
const lazyElements = document.querySelectorAll('.project-card, .timeline-item, .skill-item, .stat-item, .highlight-item');

const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.style.filter = 'blur(0)';
            }, index * 100); // Stagger animation
            lazyObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '50px'
});

lazyElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px) scale(0.95)';
    element.style.filter = 'blur(5px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    lazyObserver.observe(element);
});

// ================================
// PROGRESSIVE TEXT REVEAL (Skip Hero Section)
// ================================
const revealTexts = document.querySelectorAll('.section-subtitle, #about .about-text p');

const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            textObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (!isMobile) {
    revealTexts.forEach(text => {
        text.style.opacity = '0';
        text.style.transform = 'translateY(20px)';
        text.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        textObserver.observe(text);
    });
}

// ================================
// SKELETON LOADING FOR IMAGES
// ================================
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.style.backgroundColor = '#2d2d2d';
    img.style.animation = 'skeleton-pulse 1.5s ease-in-out infinite';
    
    img.addEventListener('load', function() {
        this.style.animation = 'none';
        this.style.backgroundColor = 'transparent';
        this.style.opacity = '0';
        setTimeout(() => {
            this.style.transition = 'opacity 0.5s ease';
            this.style.opacity = '1';
        }, 10);
    });
});

// Add skeleton pulse animation
const skeletonStyle = document.createElement('style');
skeletonStyle.textContent = `
    @keyframes skeleton-pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(skeletonStyle);

// ================================
// CONTENT PRELOADER
// ================================
const preloadContent = () => {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    
    // Force layout recalculation for smoother rendering
    document.body.offsetHeight;
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadContent);
} else {
    preloadContent();
}

// ================================
// MOBILE OPTIMIZATIONS
// ================================
if (isMobile) {
    // Reduce motion for better performance
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (reduceMotion.matches) {
        document.body.classList.add('reduce-motion');
    }
    
    // Passive event listeners for better scroll performance
    document.addEventListener('touchstart', function() {}, { passive: true });
    document.addEventListener('touchmove', function() {}, { passive: true });
    
    // Optimize viewport height for mobile browsers
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    // Prevent mobile pull-to-refresh interference
    let startY = 0;
    document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].pageY;
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        const y = e.touches[0].pageY;
        if (window.pageYOffset === 0 && y > startY) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && hamburger) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
}

// ================================
// INTERSECTION OBSERVER PERFORMANCE
// ================================
// Use requestIdleCallback for non-critical animations
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Initialize non-critical animations
        document.querySelectorAll('.project-card, .timeline-item').forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
    });
}

// ================================
// SMOOTH REVEAL ANIMATIONS
// ================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.stat-item, .highlight-item, .skill-card').forEach(el => {
    el.classList.add('reveal-element');
    revealObserver.observe(el);
});

// Add reveal animation styles
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .reveal-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .reveal-element.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
`;
document.head.appendChild(revealStyle);

// ================================
// PERFORMANCE MONITORING
// ================================
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 50 && !isMobile) {
                console.warn('Long task detected:', entry.duration);
            }
        }
    });
    
    try {
        perfObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
        // Long task API not supported
    }
}

// ================================
// ENHANCED BUTTON INTERACTIONS
// ================================
document.querySelectorAll('.btn, .social-link').forEach(button => {
    // Add haptic feedback on mobile
    button.addEventListener('click', () => {
        if ('vibrate' in navigator && isMobile) {
            navigator.vibrate(10);
        }
    });
    
    // Add pulse effect on focus for accessibility
    button.addEventListener('focus', function() {
        this.style.animation = 'pulse 0.5s ease';
    });
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(pulseStyle);

console.log('🚀 Portfolio loaded successfully!');
console.log('📱 Mobile device:', isMobile);
console.log('🎨 All effects initialized!');
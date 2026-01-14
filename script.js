// TG TELECOMM - Main JavaScript

// ============================================
// NAVIGATION
// ============================================

// Sticky header on scroll
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// Coverage form is now handled in the "COVERAGE CHECKER FUNCTIONALITY" section below

// ============================================
// FAQ ACCORDION
// ============================================

const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't already active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header ? header.offsetHeight : 60;
                // Add extra offset to ensure section headers are fully visible
                const extraOffset = -50; // Negative value scrolls down further
                const targetPosition = target.offsetTop - headerHeight - extraOffset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                }
            }
        }
    });
});

// ============================================
// ACTIVE SECTION HIGHLIGHTING ON SCROLL
// ============================================

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightActiveSection() {
    const headerHeight = header ? header.offsetHeight : 80;
    const scrollPosition = window.scrollY + headerHeight + 60;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
    
    // Highlight home when at top
    if (window.scrollY < 300) {
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#home') {
                item.classList.add('active');
            }
        });
    }
}

// Throttled scroll handler for active section
const throttledHighlight = throttle(highlightActiveSection, 100);
window.addEventListener('scroll', throttledHighlight);

// ============================================
// SPAM PROTECTION UTILITIES
// ============================================

// Track form interaction start time
const formStartTimes = new Map();

// Initialize form tracking when form is focused
function initFormTracking(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Track when user first interacts with form
    let hasInteracted = false;
    const startTime = Date.now();
    
    const trackInteraction = () => {
        if (!hasInteracted) {
            hasInteracted = true;
            formStartTimes.set(formId, startTime);
        }
    };
    
    // Track various interaction types
    form.addEventListener('focusin', trackInteraction, { once: true });
    form.addEventListener('input', trackInteraction, { once: true });
    form.addEventListener('change', trackInteraction, { once: true });
    form.addEventListener('click', trackInteraction, { once: true });
    form.addEventListener('keydown', trackInteraction, { once: true });
    
    // Also track when form becomes visible (in case user navigates to it)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackInteraction();
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(form);
}

// Check if form was filled too quickly (bot detection)
function checkFormTime(formId, minTimeSeconds = 3) {
    const startTime = formStartTimes.get(formId);
    if (!startTime) {
        // Form wasn't tracked, assume it's suspicious
        return false;
    }
    
    const timeOnForm = (Date.now() - startTime) / 1000;
    return timeOnForm >= minTimeSeconds;
}

// Check honeypot field
function checkHoneypot(form) {
    const honeypot = form.querySelector('input[name="website"], input#website');
    if (honeypot && honeypot.value.trim() !== '') {
        return false; // Bot filled honeypot
    }
    return true;
}

// Enhanced email validation
function validateEmail(email) {
    if (!email) return false;
    
    // Basic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    
    // Check for suspicious patterns
    const suspiciousPatterns = [
        /test@test/i,
        /example@example/i,
        /admin@admin/i,
        /123@123/i,
        /^[a-z0-9]+@[a-z0-9]+\.(test|local|example)$/i,
        /@(test|spam|fake|temp)\./i
    ];
    
    for (const pattern of suspiciousPatterns) {
        if (pattern.test(email)) return false;
    }
    
    // Check for too many repeated characters
    const repeatedChars = email.match(/(.)\1{4,}/);
    if (repeatedChars) return false;
    
    return true;
}

// Validate name for suspicious patterns
function validateName(name) {
    if (!name || name.trim().length < 2) return false;
    
    // Check for keyboard mashing (repeated characters)
    const repeatedChars = name.match(/(.)\1{3,}/i);
    if (repeatedChars) return false;
    
    // Check for suspicious patterns like "asdf", "qwerty", etc.
    const suspiciousNames = /^(asdf|qwerty|test|admin|user|guest|spam|bot)[0-9]*$/i;
    if (suspiciousNames.test(name.trim())) return false;
    
    // Check for too many numbers in name
    const numbers = name.match(/\d/g);
    if (numbers && numbers.length > name.length * 0.3) return false;
    
    return true;
}

// Validate message content
function validateMessage(message) {
    if (!message) return true; // Optional field
    
    const trimmed = message.trim();
    
    // Too short
    if (trimmed.length < 3) return false;
    
    // Check for too few spaces (keyboard mashing)
    const spaces = trimmed.match(/\s/g);
    if (spaces && trimmed.length > 20 && spaces.length < trimmed.length * 0.05) {
        return false; // Less than 5% spaces in long messages
    }
    
    // Check for extreme repeated characters (like "aaaaaaaa")
    const repeatedChars = trimmed.match(/(.)\1{10,}/i);
    if (repeatedChars) return false;
    
    // Check for suspicious patterns
    const suspiciousPatterns = [
        /^[a-z]{1,3}$/i, // Very short single word
        /^(.)\1+$/, // All same character
        /^[0-9]+$/, // All numbers
        /^(spam|test|asdf|qwerty)/i, // Suspicious starting words
    ];
    
    for (const pattern of suspiciousPatterns) {
        if (pattern.test(trimmed)) return false;
    }
    
    // Check for excessive special characters (spam links)
    const specialChars = trimmed.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g);
    if (specialChars && specialChars.length > trimmed.length * 0.2) {
        return false; // More than 20% special characters
    }
    
    return true;
}

// Rate limiting using localStorage
function checkRateLimit(formId, maxSubmissions = 1, timeWindowSeconds = 60) {
    const storageKey = `form_rate_limit_${formId}`;
    const now = Date.now();
    
    try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            const data = JSON.parse(stored);
            const submissions = data.submissions.filter(
                timestamp => (now - timestamp) < timeWindowSeconds * 1000
            );
            
            if (submissions.length >= maxSubmissions) {
                const timeLeft = Math.ceil((timeWindowSeconds * 1000 - (now - submissions[0])) / 1000);
                return {
                    allowed: false,
                    timeLeft: timeLeft
                };
            }
            
            submissions.push(now);
            localStorage.setItem(storageKey, JSON.stringify({ submissions }));
            return { allowed: true };
        } else {
            localStorage.setItem(storageKey, JSON.stringify({ submissions: [now] }));
            return { allowed: true };
        }
    } catch (e) {
        // If localStorage fails, allow submission (graceful degradation)
        console.warn('Rate limit check failed:', e);
        return { allowed: true };
    }
}

// Comprehensive spam check
function performSpamCheck(form, formId) {
    const errors = [];
    
    // 1. Check honeypot
    if (!checkHoneypot(form)) {
        console.log('Spam detected: Honeypot field filled');
        return { isSpam: true, reason: 'Invalid submission detected.' };
    }
    
    // 2. Check form time
    if (!checkFormTime(formId, 3)) {
        console.log('Spam detected: Form submitted too quickly');
        return { isSpam: true, reason: 'Please take your time filling out the form (minimum 3 seconds).' };
    }
    
    // 3. Rate limiting
    const rateLimit = checkRateLimit(formId, 1, 60);
    if (!rateLimit.allowed) {
        console.log('Spam detected: Rate limit exceeded');
        return { 
            isSpam: true, 
            reason: `Please wait ${rateLimit.timeLeft} seconds before submitting again.` 
        };
    }
    
    // 4. Validate email
    const emailInput = form.querySelector('input[type="email"], input#email, input#customerEmail');
    if (emailInput && emailInput.value) {
        if (!validateEmail(emailInput.value)) {
            errors.push('Please provide a valid email address.');
        }
    }
    
    // 5. Validate name
    const nameInput = form.querySelector('input#fullName, input#customerName, input[name="fullName"], input[name="customerName"]');
    if (nameInput && nameInput.value) {
        if (!validateName(nameInput.value)) {
            errors.push('Please provide a valid name.');
        }
    }
    
    // 6. Validate message (if present and has content)
    const messageInput = form.querySelector('textarea#message, textarea#description, textarea[name="message"], textarea[name="description"]');
    if (messageInput && messageInput.value && messageInput.value.trim()) {
        if (!validateMessage(messageInput.value)) {
            errors.push('Please provide a more detailed message.');
        }
    }
    
    // 7. Check for suspicious subject (ticket form)
    const subjectInput = form.querySelector('input#subject, input[name="subject"]');
    if (subjectInput && subjectInput.value) {
        if (!validateMessage(subjectInput.value)) {
            errors.push('Please provide a valid subject line.');
        }
    }
    
    if (errors.length > 0) {
        return { isSpam: true, reason: errors.join(' ') };
    }
    
    return { isSpam: false };
}

// Make functions globally available for ticket.html
if (typeof window !== 'undefined') {
    window.performSpamCheck = performSpamCheck;
    window.checkHoneypot = checkHoneypot;
    window.checkFormTime = checkFormTime;
    window.checkRateLimit = checkRateLimit;
    window.validateEmail = validateEmail;
    window.validateName = validateName;
    window.validateMessage = validateMessage;
}

// ============================================
// FORM HANDLING
// ============================================

// Initialize form tracking
document.addEventListener('DOMContentLoaded', () => {
    initFormTracking('contactForm');
    initFormTracking('ticketForm');
});

// Contact form submission with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Perform spam check
        const spamCheck = performSpamCheck(contactForm, 'contactForm');
        if (spamCheck.isSpam) {
            // Silently drop spam submissions (don't alert bots)
            console.log('Submission blocked:', spamCheck.reason);
            // Show generic error to user (don't reveal why it was blocked)
            const errorMessage = document.createElement('div');
            errorMessage.style.cssText = `
                margin-top: 1rem;
                padding: 1.5rem;
                background: rgba(231, 76, 60, 0.1);
                border: 2px solid var(--coral-red);
                border-radius: 12px;
                color: var(--dark-text);
                text-align: center;
                font-weight: 600;
            `;
            errorMessage.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚠️</div>
                <p style="margin: 0;">${spamCheck.reason}</p>
            `;
            
            // Remove any existing messages
            const existingMessage = contactForm.querySelector('.form-success, [style*="border: 2px solid"]');
            if (existingMessage) existingMessage.remove();
            
            contactForm.appendChild(errorMessage);
            setTimeout(() => errorMessage.remove(), 5000);
            return;
        }
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.innerHTML = '<span class="loading"></span> Sending...';
        submitButton.disabled = true;
        
        const submissionDate = new Date().toLocaleString('en-US', { 
            timeZone: 'America/New_York',
            dateStyle: 'full',
            timeStyle: 'short'
        });
        
        // Get plan interest text
        const planSelect = document.getElementById('planSelect');
        const planText = planSelect.options[planSelect.selectedIndex].text;
        
        // Prepare template parameters for EmailJS
        const templateParams = {
            from_name: document.getElementById('fullName').value,
            from_email: document.getElementById('email').value,
            phone_number: document.getElementById('phone').value,
            service_address: document.getElementById('address').value,
            plan_interest: planText,
            message: document.getElementById('message').value || 'No additional information provided',
            submission_date: submissionDate
        };
        
        // Send email using EmailJS
        emailjs.send('service_uyn9scb', 'template_kz9gwgh', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.style.cssText = `
                    margin-top: 1rem;
                    padding: 1.5rem;
                    background: rgba(78, 205, 196, 0.15);
                    border: 2px solid var(--aqua-teal);
                    border-radius: 12px;
                    color: var(--dark-text);
                    text-align: center;
                    font-weight: 600;
                `;
                successMessage.innerHTML = `
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">✅</div>
                    <p style="margin: 0;">Thank you! We'll contact you within 24 hours at <strong>${templateParams.from_email}</strong></p>
                `;
                
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, function(error) {
                console.error('FAILED...', error);
                
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.style.cssText = `
                    margin-top: 1rem;
                    padding: 1.5rem;
                    background: rgba(231, 76, 60, 0.1);
                    border: 2px solid var(--coral-red);
                    border-radius: 12px;
                    color: var(--dark-text);
                    text-align: center;
                    font-weight: 600;
                `;
                errorMessage.innerHTML = `
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">❌</div>
                    <p style="margin: 0;">Failed to send. Please call us at (305) 903-9600 or email sales@tgtelecomm.com</p>
                `;
                
                contactForm.appendChild(errorMessage);
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Remove error message after 5 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            });
    });
}

// ============================================
// PLAN SELECTION FROM URL
// ============================================

// Auto-select plan based on URL parameter
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');
    
    if (plan) {
        const planSelect = document.getElementById('planSelect');
        if (planSelect) {
            planSelect.value = plan;
        }
    }
});

// ============================================
// TESTIMONIAL CAROUSEL AUTO-SCROLL
// ============================================

const testimonialCarousel = document.getElementById('testimonialCarousel');
if (testimonialCarousel) {
    let isScrolling = false;
    let scrollInterval;
    
    const startAutoScroll = () => {
        scrollInterval = setInterval(() => {
            if (!isScrolling) {
                const scrollAmount = testimonialCarousel.scrollLeft + testimonialCarousel.offsetWidth;
                const maxScroll = testimonialCarousel.scrollWidth - testimonialCarousel.offsetWidth;
                
                if (scrollAmount >= maxScroll) {
                    testimonialCarousel.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    testimonialCarousel.scrollBy({ left: testimonialCarousel.offsetWidth, behavior: 'smooth' });
                }
            }
        }, 5000);
    };
    
    const stopAutoScroll = () => {
        clearInterval(scrollInterval);
    };
    
    // Start auto-scroll
    startAutoScroll();
    
    // Pause on user interaction
    testimonialCarousel.addEventListener('touchstart', () => {
        isScrolling = true;
        stopAutoScroll();
    });
    
    testimonialCarousel.addEventListener('touchend', () => {
        isScrolling = false;
        startAutoScroll();
    });
    
    testimonialCarousel.addEventListener('mouseenter', stopAutoScroll);
    testimonialCarousel.addEventListener('mouseleave', startAutoScroll);
}

// ============================================
// COVERAGE CHECKER FUNCTIONALITY
// ============================================

// Service ZIP codes - TG Telecomm coverage areas
const SERVICE_ZIP_CODES = [
    // Hialeah (10 ZIP codes)
    '33002', '33010', '33011', '33012', '33013', 
    '33014', '33015', '33016', '33017', '33018',
    // Medley (2 ZIP codes)
    '33166', '33178',
    // Doral (5 ZIP codes)
    '33122', '33126', '33166', '33172', '33178'
];

// Extract ZIP code from address string
function extractZipCode(address) {
    // Match 5-digit ZIP code
    const zipMatch = address.match(/\b\d{5}\b/);
    return zipMatch ? zipMatch[0] : null;
}

// Check if ZIP code is in service area
function isZipCodeServiced(zipCode) {
    return SERVICE_ZIP_CODES.includes(zipCode);
}

// Get city name from ZIP code
function getCityFromZip(zipCode) {
    const hialeahZips = ['33002', '33010', '33011', '33012', '33013', '33014', '33015', '33016', '33017', '33018'];
    const medleyZips = ['33166', '33178'];
    const doralZips = ['33122', '33126', '33166', '33172', '33178'];
    
    if (hialeahZips.includes(zipCode)) return 'Hialeah';
    if (medleyZips.includes(zipCode)) return 'Medley';
    if (doralZips.includes(zipCode)) return 'Doral';
    return 'your area';
}

// Handle coverage form submission
const coverageForm = document.getElementById('coverageForm');
if (coverageForm) {
    coverageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = coverageForm.querySelector('input');
        const address = input.value.trim();
        
        if (address) {
            displayCoverageResult(address);
        }
    });
}

// Display coverage result
function displayCoverageResult(address) {
    const resultContainer = document.getElementById('coverageResult');
    if (!resultContainer) return;
    
    // Show loading state
    resultContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 2rem; margin-bottom: 1rem;">🔍</div>
            <p style="color: var(--dark-text);">Checking coverage...</p>
        </div>
    `;
    
    // Extract ZIP code from address
    const zipCode = extractZipCode(address);
    
    setTimeout(() => {
        if (!zipCode) {
            // No ZIP code found in input
            resultContainer.innerHTML = `
                <div class="coverage-result" style="
                    margin-top: 2rem;
                    padding: 2rem;
                    background: var(--glass-bg);
                    backdrop-filter: blur(16px);
                    border: 2px solid var(--coral-red);
                    border-radius: 20px;
                    text-align: center;
                ">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">⚠️</div>
                    <h3 style="color: var(--coral-red); margin-bottom: 1rem;">
                        ZIP Code Required
                    </h3>
                    <p style="margin-bottom: 1.5rem; color: var(--dark-text);">
                        Please include a 5-digit ZIP code in your address to check coverage.
                    </p>
                    <p style="margin-bottom: 0; font-size: 0.9rem; color: var(--mid-gray);">
                        Example: "123 Main St, Miami, FL 33101"
                    </p>
                </div>
            `;
            return;
        }
        
        const isAvailable = isZipCodeServiced(zipCode);
        const cityName = getCityFromZip(zipCode);
        
        resultContainer.innerHTML = `
            <div class="coverage-result" style="
                margin-top: 2rem;
                padding: 2rem;
                background: var(--glass-bg);
                backdrop-filter: blur(16px);
                border: 2px solid ${isAvailable ? 'var(--aqua-teal)' : 'var(--coral-red)'};
                border-radius: 20px;
                text-align: center;
            ">
                <div style="font-size: 4rem; margin-bottom: 1rem;">
                    ${isAvailable ? '✅' : '📍'}
                </div>
                <h3 style="color: ${isAvailable ? 'var(--aqua-teal)' : 'var(--coral-red)'}; margin-bottom: 1rem;">
                    ${isAvailable ? 'Great News!' : 'Not Available Yet'}
                </h3>
                <p style="margin-bottom: 1rem; color: var(--dark-text); font-size: 1.1rem;">
                    ${isAvailable 
                        ? `✓ TG Telecomm services <strong>ZIP ${zipCode}</strong> in <strong>${cityName}</strong>!` 
                        : `We don't currently service <strong>ZIP ${zipCode}</strong>.`
                    }
                </p>
                ${isAvailable 
                    ? `
                        <p style="margin-bottom: 1.5rem; color: var(--mid-gray); font-size: 0.95rem;">
                            We can get you connected in as little as 24 hours!
                        </p>
                        <a href="#contact" class="btn btn-primary" style="margin-right: 1rem;">Get Started Now</a>
                        <a href="tel:+13059039600" class="btn btn-secondary">Call (305) 903-9600</a>
                    `
                    : `
                        <p style="margin-bottom: 1.5rem; color: var(--mid-gray); font-size: 0.95rem;">
                            We currently service Hialeah, Medley, and Doral areas only.<br>
                            Leave your info and we'll notify you when we expand to your area!
                        </p>
                        <a href="#contact" class="btn btn-secondary">Notify Me When Available</a>
                    `
                }
                ${isAvailable 
                    ? `
                        <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(0,0,0,0.1);">
                            <p style="font-size: 0.9rem; color: var(--mid-gray); margin: 0;">
                                ✓ No Contracts &nbsp;•&nbsp; ✓ Unlimited Bandwidth &nbsp;•&nbsp; ✓ Fast Installation
                            </p>
                        </div>
                    `
                    : `
                        <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(0,0,0,0.1);">
                            <p style="font-size: 0.875rem; color: var(--mid-gray); margin: 0;">
                                <strong>Current Service Areas:</strong><br>
                                Hialeah • Medley • Doral
                            </p>
                        </div>
                    `
                }
            </div>
        `;
        
        // Scroll to result
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 800);
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Preload critical resources
const preloadLinks = [
    'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap'
];

preloadLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add keyboard navigation for custom components
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
    
    // Tab trap for mobile menu when open
    if (navLinks.classList.contains('active') && e.key === 'Tab') {
        const focusableElements = navLinks.querySelectorAll('a, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// Announce page changes to screen readers
function announcePageChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

// ============================================
// ANALYTICS & TRACKING (Placeholder)
// ============================================

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        console.log('Button clicked:', buttonText);
        // Add actual analytics tracking here (Google Analytics, etc.)
    });
});

// Track form submissions
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        const formId = form.id || 'unknown';
        console.log('Form submitted:', formId);
        // Add actual analytics tracking here
    });
});

// ============================================
// UTILITIES
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized scroll handler
const handleScroll = throttle(() => {
    const scrollY = window.scrollY;
    // Add scroll-dependent logic here
}, 100);

window.addEventListener('scroll', handleScroll);

console.log('TG Telecomm - Website loaded successfully! 🚀');


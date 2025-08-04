// Portfolio Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize CV download functionality
    initCVDownload();
    
    // Initialize animations
    initScrollAnimations();
    
    // Initialize social media interactions
    initSocialMediaInteractions();
    
    // Initialize contact interactions
    initContactInteractions();
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// CV Download functionality
function initCVDownload() {
    const cvButton = document.querySelector('.cv-button');
    
    if (cvButton) {
        cvButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing CV...';
            this.disabled = true;
            
            // Simulate CV preparation/download
            setTimeout(() => {
                // Reset button state
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show success message
                showNotification('CV download would start here. Please upload your CV file to enable download.', 'info');
            }, 2000);
        });
    }
}

// Scroll animations for timeline and other elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        // Initial state
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        observer.observe(item);
    });
    
    // Observe bio section
    const bioContent = document.querySelector('.bio-content');
    if (bioContent) {
        bioContent.style.opacity = '0';
        bioContent.style.transform = 'translateY(30px)';
        bioContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(bioContent);
    }
}

// Social media interactions
function initSocialMediaInteractions() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.title;
            const message = `This would open ${platform}. Please update the href attributes with your actual social media profiles.`;
            
            showNotification(message, 'info');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add hover sound effect (visual feedback)
        link.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Contact interactions
function initContactInteractions() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-phone')) {
                // Handle phone number
                if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
                    window.location.href = `tel:${text}`;
                } else {
                    copyToClipboard(text, 'Phone number copied to clipboard!');
                }
            } else if (icon.classList.contains('fa-envelope')) {
                // Handle email
                window.location.href = `mailto:${text}`;
            } else if (icon.classList.contains('fa-map-marker-alt')) {
                // Handle address
                const encodedAddress = encodeURIComponent(text);
                window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
            }
        });
        
        // Add hover effect
        item.style.cursor = 'pointer';
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            this.style.borderRadius = '8px';
            this.style.padding = '8px';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.padding = '';
        });
    });
}

// Utility function to copy text to clipboard
function copyToClipboard(text, successMessage) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification(successMessage, 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text, successMessage);
        });
    } else {
        fallbackCopyToClipboard(text, successMessage);
    }
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification(successMessage, 'success');
    } catch (err) {
        showNotification('Could not copy to clipboard', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--space-16);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
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
        .notification-content {
            display: flex;
            align-items: center;
            gap: var(--space-12);
        }
        .notification-close {
            background: none;
            border: none;
            color: var(--color-text-secondary);
            cursor: pointer;
            margin-left: auto;
        }
        .notification--success { border-left: 4px solid var(--color-success); }
        .notification--error { border-left: 4px solid var(--color-error); }
        .notification--info { border-left: 4px solid var(--color-info); }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Get appropriate icon for notification type
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle',
        warning: 'exclamation-triangle'
    };
    return icons[type] || 'info-circle';
}

// Add typing effect to tagline
function initTypingEffect() {
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.borderRight = '2px solid rgba(255, 255, 255, 0.7)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    tagline.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Initialize page loading animations
window.addEventListener('load', function() {
    // Fade in profile picture
    const profilePicture = document.querySelector('.profile-picture');
    if (profilePicture) {
        profilePicture.style.opacity = '0';
        profilePicture.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            profilePicture.style.transition = 'all 0.8s ease';
            profilePicture.style.opacity = '1';
            profilePicture.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Initialize typing effect
    setTimeout(initTypingEffect, 800);
});
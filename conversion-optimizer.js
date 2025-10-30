// Conversion Optimization & Money-Making Features
// For NextReach SMMA - nextreach374@gmail.com

class ConversionOptimizer {
    constructor() {
        this.email = 'nextreach374@gmail.com';
        this.hasShownExitIntent = false;
        this.hasShownScrollPopup = false;
        this.init();
    }
    
    init() {
        console.log('💰 Conversion Optimizer loading...');
        
        // Exit Intent Popup
        this.initExitIntent();
        
        // Scroll-based popup (after 50% scroll)
        this.initScrollPopup();
        
        // Urgency timer
        this.initUrgencyTimer();
        
        // Social proof notifications
        this.initSocialProof();
        
        // Chat widget placeholder
        this.initChatWidget();
        
        // Track time on site
        this.trackTimeOnSite();
        
        // Track scroll depth
        this.trackScrollDepth();
        
        // Highlight phone numbers and email
        this.makeContactClickable();
        
        console.log('✅ Conversion Optimizer ready!');
    }
    
    // EXIT INTENT POPUP - Catches leaving visitors
    initExitIntent() {
        document.addEventListener('mouseout', (e) => {
            if (this.hasShownExitIntent) return;
            
            // If mouse leaves top of window
            if (e.clientY < 0) {
                this.hasShownExitIntent = true;
                this.showExitIntentPopup();
            }
        });
    }
    
    showExitIntentPopup() {
        const popup = document.createElement('div');
        popup.id = 'exit-intent-popup';
        popup.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 999999;
                animation: fadeIn 0.3s ease;
            " onclick="this.parentElement.remove()">
                <div style="
                    background: white;
                    padding: 3rem;
                    border-radius: 20px;
                    max-width: 500px;
                    text-align: center;
                    position: relative;
                    animation: slideUp 0.5s ease;
                " onclick="event.stopPropagation()">
                    <button onclick="this.closest('#exit-intent-popup').remove()" style="
                        position: absolute;
                        top: 1rem;
                        right: 1rem;
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        cursor: pointer;
                        color: #64748b;
                    ">&times;</button>
                    
                    <div style="
                        width: 80px;
                        height: 80px;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 1.5rem;
                    ">
                        <i class="fas fa-gift" style="font-size: 2.5rem; color: white;"></i>
                    </div>
                    
                    <h2 style="font-size: 2rem; margin-bottom: 1rem; color: #1e293b;">Wait! Before You Go...</h2>
                    <p style="font-size: 1.1rem; color: #64748b; margin-bottom: 2rem;">
                        Get a <strong style="color: #667eea;">FREE Strategy Session</strong> ($500 value) to discuss how we can transform your business!
                    </p>
                    
                    <div style="display: flex; gap: 1rem; flex-direction: column;">
                        <a href="#booking" onclick="this.closest('#exit-intent-popup').remove()" style="
                            background: linear-gradient(135deg, #667eea, #764ba2);
                            color: white;
                            padding: 1rem 2rem;
                            border-radius: 50px;
                            text-decoration: none;
                            font-weight: 700;
                            font-size: 1.1rem;
                            display: inline-block;
                        ">
                            <i class="fas fa-calendar-check"></i> Book Free Session Now
                        </a>
                        <button onclick="this.closest('#exit-intent-popup').remove()" style="
                            background: none;
                            border: none;
                            color: #94a3b8;
                            cursor: pointer;
                            font-size: 0.9rem;
                        ">No thanks, I'll pass on this opportunity</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        this.trackEvent('Exit_Intent_Shown');
    }
    
    // SCROLL POPUP - Engages interested visitors
    initScrollPopup() {
        let maxScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            maxScroll = Math.max(maxScroll, scrollPercent);
            
            if (!this.hasShownScrollPopup && maxScroll > 50) {
                this.hasShownScrollPopup = true;
                setTimeout(() => this.showScrollPopup(), 3000); // Show after 3 seconds at 50% scroll
            }
        });
    }
    
    showScrollPopup() {
        const popup = document.createElement('div');
        popup.id = 'scroll-popup';
        popup.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: white;
                padding: 2rem;
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                max-width: 350px;
                z-index: 99999;
                animation: slideInRight 0.5s ease;
            ">
                <button onclick="this.parentElement.remove()" style="
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #94a3b8;
                ">&times;</button>
                
                <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: #1e293b;">
                    <i class="fas fa-rocket" style="color: #667eea;"></i> Ready to Get Started?
                </h3>
                <p style="color: #64748b; margin-bottom: 1rem; font-size: 0.95rem;">
                    Join 500+ businesses that transformed their online presence with NextReach!
                </p>
                
                <a href="pricing.html" style="
                    display: block;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    padding: 0.875rem 1.5rem;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: 700;
                    text-align: center;
                    margin-bottom: 0.5rem;
                ">View Pricing & Packages</a>
                
                <a href="#booking" onclick="this.closest('#scroll-popup').remove()" style="
                    display: block;
                    text-align: center;
                    color: #667eea;
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 600;
                ">Or book a free consultation</a>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Auto-remove after 15 seconds
        setTimeout(() => {
            const el = document.getElementById('scroll-popup');
            if (el) el.remove();
        }, 15000);
        
        this.trackEvent('Scroll_Popup_Shown');
    }
    
    // URGENCY TIMER - Creates FOMO
    initUrgencyTimer() {
        const timerElements = document.querySelectorAll('.urgency-timer, [data-urgency-timer]');
        
        timerElements.forEach(element => {
            const endTime = this.getTimerEndTime();
            this.startTimer(element, endTime);
        });
    }
    
    getTimerEndTime() {
        // Check if timer exists in localStorage
        let endTime = localStorage.getItem('urgency_timer_end');
        
        if (!endTime) {
            // Set timer for 24 hours from now
            endTime = Date.now() + (24 * 60 * 60 * 1000);
            localStorage.setItem('urgency_timer_end', endTime);
        }
        
        return parseInt(endTime);
    }
    
    startTimer(element, endTime) {
        const updateTimer = () => {
            const now = Date.now();
            const remaining = Math.max(0, endTime - now);
            
            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
            
            element.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (remaining > 0) {
                setTimeout(updateTimer, 1000);
            } else {
                element.textContent = 'EXPIRED';
                // Reset timer
                localStorage.removeItem('urgency_timer_end');
            }
        };
        
        updateTimer();
    }
    
    // SOCIAL PROOF NOTIFICATIONS
    initSocialProof() {
        const notifications = [
            { name: 'John from Sofia', action: 'booked a strategy call', time: '2 minutes ago' },
            { name: 'Sarah from Plovdiv', action: 'purchased Complete Package', time: '15 minutes ago' },
            { name: 'Michael from Varna', action: 'started a project', time: '1 hour ago' },
            { name: 'Elena from Burgas', action: 'booked a consultation', time: '3 hours ago' }
        ];
        
        let currentIndex = 0;
        
        const showNotification = () => {
            const notification = notifications[currentIndex];
            currentIndex = (currentIndex + 1) % notifications.length;
            
            const popup = document.createElement('div');
            popup.className = 'social-proof-notification';
            popup.innerHTML = `
                <div style="
                    position: fixed;
                    bottom: 20px;
                    left: 20px;
                    background: white;
                    padding: 1rem 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    z-index: 99998;
                    animation: slideInLeft 0.5s ease, slideOutLeft 0.5s ease 4.5s;
                    max-width: 320px;
                ">
                    <div style="
                        width: 40px;
                        height: 40px;
                        background: linear-gradient(135deg, #10b981, #34d399);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                    ">
                        <i class="fas fa-check" style="color: white;"></i>
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: 700; color: #1e293b; font-size: 0.9rem;">${notification.name}</div>
                        <div style="color: #64748b; font-size: 0.85rem;">${notification.action}</div>
                        <div style="color: #94a3b8; font-size: 0.75rem;">${notification.time}</div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(popup);
            
            setTimeout(() => popup.remove(), 5000);
        };
        
        // Show first notification after 5 seconds
        setTimeout(() => {
            showNotification();
            // Then show every 30 seconds
            setInterval(showNotification, 30000);
        }, 5000);
    }
    
    // CHAT WIDGET PLACEHOLDER
    initChatWidget() {
        const widget = document.createElement('div');
        widget.id = 'chat-widget';
        widget.innerHTML = `
            <button style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
                z-index: 99997;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'" onclick="window.open('mailto:nextreach374@gmail.com?subject=Chat%20Inquiry', '_blank')">
                <i class="fas fa-comment-dots"></i>
            </button>
        `;
        
        document.body.appendChild(widget);
    }
    
    // TRACK TIME ON SITE
    trackTimeOnSite() {
        const startTime = Date.now();
        
        // Track every 30 seconds
        setInterval(() => {
            const timeOnSite = Math.floor((Date.now() - startTime) / 1000);
            this.trackEvent('Time_On_Site', timeOnSite);
        }, 30000);
        
        // Track on page leave
        window.addEventListener('beforeunload', () => {
            const totalTime = Math.floor((Date.now() - startTime) / 1000);
            this.trackEvent('Session_End', totalTime);
        });
    }
    
    // TRACK SCROLL DEPTH
    trackScrollDepth() {
        let maxScroll = 0;
        const milestones = [25, 50, 75, 100];
        const tracked = new Set();
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.floor((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            maxScroll = Math.max(maxScroll, scrollPercent);
            
            milestones.forEach(milestone => {
                if (maxScroll >= milestone && !tracked.has(milestone)) {
                    tracked.add(milestone);
                    this.trackEvent('Scroll_Depth', `${milestone}%`);
                }
            });
        });
    }
    
    // MAKE CONTACT CLICKABLE
    makeContactClickable() {
        // Add click tracking and formatting to contact info
        document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(link => {
            link.style.cursor = 'pointer';
            link.style.transition = 'all 0.3s ease';
            
            link.addEventListener('mouseenter', () => {
                link.style.color = '#667eea';
                link.style.transform = 'scale(1.05)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.color = '';
                link.style.transform = 'scale(1)';
            });
        });
    }
    
    // TRACK EVENTS
    trackEvent(event, label) {
        console.log(`📊 Event: ${event} - ${label}`);
        
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', event, {
                event_category: 'Engagement',
                event_label: label
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', event, { label: label });
        }
    }
}

// Add animations
if (!document.getElementById('conversion-animations')) {
    const style = document.createElement('style');
    style.id = 'conversion-animations';
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutLeft {
            to {
                opacity: 0;
                transform: translateX(-100px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.conversionOptimizer = new ConversionOptimizer();
    });
} else {
    window.conversionOptimizer = new ConversionOptimizer();
}

console.log('💰 Conversion Optimizer loaded - Ready to make money!');

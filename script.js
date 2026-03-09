/* ==========================================================================
   Turgut Atsız Boya Badana Hizmetleri - Interactive Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize AOS (Animate On Scroll) Library
    AOS.init({
        once: true,           // whether animation should happen only once - while scrolling down
        offset: 100,          // offset (in px) from the original trigger point
        duration: 800,        // values from 0 to 3000, with step 50ms
        easing: 'ease-out-cubic', // default easing for AOS animations
    });

    // Hero Video Sound Toggle
    const video = document.getElementById('heroBgVideo');
    const soundBtn = document.getElementById('heroSoundBtn');
    const soundIcon = document.getElementById('heroSoundIcon');

    if (video && soundBtn) {
        soundBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            soundIcon.className = video.muted
                ? 'fa-solid fa-volume-xmark'
                : 'fa-solid fa-volume-high';
        });
    }


    // 2. Loading Screen Hide
    const loader = document.querySelector('.loader-wrapper');
    // Minimum 1s display time for the cool animation, plus actual load time
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        // Reset AOS after loader disappears to ensure correct triggering
        setTimeout(() => {
            AOS.refresh();
        }, 500);
    }, 1500);


    // 3. Navbar scroll effect & Back to Top Button
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        // Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to Top Button
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // 4. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .scroll-down a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('mobile-active');
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for sticky header height
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top specific smooth scroll
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 5. Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavMenu() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavMenu);

    // 6. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('mobile-active');
        });
    }

    // 7. Accordion Functionality (Neden Biz Section)
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            accordionItems.forEach(acc => acc.classList.remove('active'));
            
            // Open clicked item if it wasn't already open
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 8. Parallax Effect on Mouse Move for Hero Images
    const heroImageContainer = document.querySelector('.hero-image-wrapper');
    const img1 = document.querySelector('.img-1');
    const img2 = document.querySelector('.img-2');
    const floatingBadge = document.querySelector('.floating-badge');
    
    if (heroImageContainer && img1 && img2 && window.innerWidth > 768) {
        heroImageContainer.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            // Calculate distance from center (normalized -1 to 1)
            const moveX = (clientX - centerX) / centerX;
            const moveY = (clientY - centerY) / centerY;
            
            // Apply subtle transformations
            img1.style.transform = `translate(${moveX * 10}px, ${moveY * 10}px)`;
            img2.style.transform = `translate(${moveX * -15}px, ${moveY * -15}px)`;
            if (floatingBadge) {
                floatingBadge.style.transform = `translate(${moveX * 20}px, ${moveY * 20}px)`;
            }
        });
        
        // Reset position when mouse leaves
        heroImageContainer.addEventListener('mouseleave', () => {
            img1.style.transform = 'translate(0, 0)';
            img2.style.transform = 'translate(0, 0)';
            if (floatingBadge) {
                // Keep the animation going, just reset the offset
                floatingBadge.style.transform = ''; 
            }
        });
    }
});

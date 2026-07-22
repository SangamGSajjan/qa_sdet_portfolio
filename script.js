// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle icon (bars to x)
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: observer.unobserve(entry.target) to only reveal once
        }
    });
};

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Initial trigger for elements already in view on load
window.addEventListener('load', () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        }
    });
});

// Certifications Filter
const filterButtons = document.querySelectorAll('.cert-filter-btn');
const certCards = document.querySelectorAll('.cert-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class
        filterButtons.forEach(button => button.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        certCards.forEach(card => {
            // Smooth fade out
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px) scale(0.98)';
            
            setTimeout(() => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hide');
                    // Smooth fade in
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.classList.add('hide');
                }
            }, 300);
        });
    });
});

// Certifications Modal Viewer
const certModal = document.getElementById('cert-modal');
const certModalImg = document.getElementById('cert-modal-img');
const certModalCaption = document.getElementById('cert-modal-caption');
const certModalClose = document.querySelector('.cert-modal-close');
const viewCertButtons = document.querySelectorAll('.view-cert-btn');
const certImgContainers = document.querySelectorAll('.cert-img-container');

// Function to open modal
const openCertModal = (imgSrc, titleText) => {
    certModalImg.src = imgSrc;
    certModalCaption.textContent = titleText;
    certModal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent page scroll
};

// Function to close modal
const closeCertModal = () => {
    certModal.classList.remove('open');
    document.body.style.overflow = ''; // Restore page scroll
    // Clear image src after transition to prevent flicker on next open
    setTimeout(() => {
        if (!certModal.classList.contains('open')) {
            certModalImg.src = '';
        }
    }, 300);
};

// Bind triggers to view buttons
viewCertButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const imgSrc = btn.getAttribute('data-src');
        const titleText = btn.getAttribute('data-title');
        openCertModal(imgSrc, titleText);
    });
});

// Bind triggers to thumbnail containers
certImgContainers.forEach(container => {
    container.addEventListener('click', () => {
        const img = container.querySelector('.cert-img-thumbnail');
        const imgSrc = img.getAttribute('src');
        const titleText = img.getAttribute('alt');
        openCertModal(imgSrc, titleText);
    });
});

// Close modal event listeners
certModalClose.addEventListener('click', closeCertModal);
certModal.addEventListener('click', (e) => {
    // Close only if clicking the background overlay, not the image or caption
    if (e.target === certModal || e.target.classList.contains('cert-modal-content-wrapper')) {
        closeCertModal();
    }
});

// Close modal on Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('open')) {
        closeCertModal();
    }
});

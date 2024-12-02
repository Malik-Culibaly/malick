// Sélection des éléments
const header = document.querySelector('header');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');

// Créer la barre de progression
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
document.body.appendChild(progressBar);

// Variables pour le scroll
let lastScrollTop = 0;
let isScrolling = false;

// Fonction pour mettre à jour la barre de progression
function updateProgressBar() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
}

// Fonction pour gérer le scroll
function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // Mise à jour de la barre de progression
    updateProgressBar();
    
    // Effet sticky header
    if (currentScroll > 100) {
        header.classList.add('sticky');
        
        // Hide/Show header on scroll
        if (currentScroll > lastScrollTop && currentScroll > 300) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    } else {
        header.classList.remove('sticky');
    }
    
    lastScrollTop = currentScroll;
    
    // Active section highlight
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - header.offsetHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
            
            // Mettre à jour les classes active
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === currentSection) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scroll pour les liens
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Fermer le menu mobile
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
            
            // Animation de scroll
            const headerOffset = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerOffset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Toggle menu mobile avec animations
menuIcon.onclick = () => {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x');
    
    // Animation des liens
    if (navbar.classList.contains('active')) {
        navLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, index * 100);
        });
    } else {
        navLinks.forEach(link => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(-20px)';
        });
    }
};

// Event Listeners avec optimisation
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            handleScroll();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    handleScroll();
    updateProgressBar();
}); 
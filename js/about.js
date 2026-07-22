/* ==========================================================
   Brainz Edu World - About Us Page Specific JS Script
========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Local Scroll Reveal Observer (Fade-in-up animations)
  const revealElements = document.querySelectorAll('.fade-up-element');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Animate once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Stats Counter Animation
  const statsSection = document.querySelector('.stats-section');
  const statNumbers = document.querySelectorAll('.stat-number-val');
  let statsAnimated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime >= duration) {
          stat.textContent = target + suffix;
        } else {
          const progress = elapsedTime / duration;
          // Ease out quad
          const value = Math.floor(progress * (2 - progress) * target);
          stat.textContent = value + suffix;
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        animateCounters();
        statsAnimated = true;
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // 4. Pedagogy Timeline Interactive Connector Glow
  const timelineNodes = document.querySelectorAll('.timeline-node');
  const nodeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -10% 0px'
  });

  timelineNodes.forEach(node => nodeObserver.observe(node));

  // 5. Parallax Hero Effect
  const heroBg = document.querySelector('.about-hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollVal = window.scrollY;
      // Gently translate the background coordinate to create high-end depth
      heroBg.style.transform = `translateY(${scrollVal * 0.4}px) scale(1.02)`;
    });
  }

  // 6. Smooth Scroll Indicator Click
  const scrollIndicator = document.getElementById('about-hero-scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const targetElement = document.querySelector('.about-intro-grid');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 7. 3D Card Tilt & Spotlight Effect
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.classList.add('spotlight-card');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;  
      
      // Update spotlight pointer variables
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation angles (max 8 degrees tilt)
      const rotateX = ((centerY - y) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = 'transform 0.05s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.4s ease';
    });
  });
});

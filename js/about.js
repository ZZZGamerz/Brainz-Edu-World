/* ==========================================================
   Brainz Edu World - About Us Page Specific JS Script
========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // (Note: Lucide icons, .fade-up-element scroll reveals, and stats counters are handled globally by main.js)


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

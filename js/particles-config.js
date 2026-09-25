/* ==========================================================
   Brainz Edu World - Particles.js Interactive Background
   ========================================================== */

particlesJS('particles-js', {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 900
      }
    },
    color: {
      value: ['#3B82F6', '#60A5FA', '#93C5FD', '#1E40AF', '#BFDBFE']
    },
    shape: {
      type: 'circle'
    },
    opacity: {
      value: 0.45,
      random: true,
      anim: {
        enable: true,
        speed: 0.6,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.5,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 160,
      color: '#3B82F6',
      opacity: 0.35,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 180,
        line_linked: {
          opacity: 0.7
        }
      },
      push: {
        particles_nb: 3
      }
    }
  },
  retina_detect: true
});

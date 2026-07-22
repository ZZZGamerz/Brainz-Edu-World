/* Brainz Edu World - Particles.js Configuration
   Elegantly designed modular configuration for interactive background.
*/
const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": isMobile ? 25 : 120,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#A0A0A0"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      }
    },
    "opacity": {
      "value": 0.28,
      "random": true,
      "anim": {
        "enable": !isMobile,
        "speed": 0.5,
        "opacity_min": 0.15,
        "sync": false
      }
    },
    "size": {
      "value": isMobile ? 2 : 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 4,
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": !isMobile,
      "distance": 160,
      "color": "#8A8A8A",
      "opacity": 0.24,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": isMobile ? 1.2 : 2.8,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": !isMobile,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": !isMobile,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false
      },
      "resize": true
    },
    "modes": {
      "repulse": {
        "distance": 100,
        "duration": 0.4
      }
    }
  },
  "retina_detect": !isMobile
});

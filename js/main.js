document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons globally on page load
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ==========================================
  // 1. Sticky Navbar & Active Link Observer
  // ==========================================
  const navbar = document.querySelector('.header-nav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const checkScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Initial call

  // Active navigation link tracking
  const activeLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.25, rootMargin: '-10% 0px -70% 0px' });

  sections.forEach(section => activeLinkObserver.observe(section));

  // ==========================================
  // 2. Mobile Drawer Navigation
  // ==========================================
  const hamburger = document.querySelector('.nav-hamburger');
  const drawer = document.querySelector('.mobile-menu-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    drawer.classList.toggle('active');
    document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Close mobile drawer on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && drawer.classList.contains('active')) {
      toggleMenu();
    }
  });

  // ==========================================
  // 3. Scroll Animations (Fade Up)
  // ==========================================
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animationObserver.unobserve(entry.target); // Trigger only once
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  const animatedElements = document.querySelectorAll('.fade-up-element');
  animatedElements.forEach(el => animationObserver.observe(el));

  // ==========================================
  // School Life Hero Typewriter Text-Loop
  // ==========================================
  const textLoopEl = document.getElementById('hero-shifter-subtitle') || document.querySelector('.text-loop-word');
  if (textLoopEl) {
    if (window.__brainzly_type_timer) {
      clearTimeout(window.__brainzly_type_timer);
    }

    // Ensure legacy inline opacity/transform styles don't conflict
    textLoopEl.style.opacity = '1';
    textLoopEl.style.transform = 'none';

    const rotatingTexts = ["Learning.", "Growing.", "Competing.", "Belonging.", "Thriving.", "Innovating.", "Excelling."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;    // Typing speed per char (ms)
    const deletingSpeed = 50;   // Backspacing speed per char (ms)
    const pauseDelay = 2200;    // Pause duration after typing word (ms)

    function typeLoop() {
      const currentWord = rotatingTexts[wordIndex];

      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          textLoopEl.textContent = currentWord.substring(0, charIndex + 1);
          charIndex++;
          window.__brainzly_type_timer = setTimeout(typeLoop, typingSpeed);
        } else {
          isDeleting = true;
          window.__brainzly_type_timer = setTimeout(typeLoop, pauseDelay);
        }
      } else {
        if (charIndex > 0) {
          const nextText = currentWord.substring(0, charIndex - 1);
          textLoopEl.textContent = nextText || '\u00A0';
          charIndex--;
          window.__brainzly_type_timer = setTimeout(typeLoop, deletingSpeed);
        } else {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % rotatingTexts.length;
          window.__brainzly_type_timer = setTimeout(typeLoop, 350);
        }
      }
    }

    window.__brainzly_type_timer = setTimeout(typeLoop, 350);
  }

  // ==========================================
  // 4. Statistics Counter Animation
  // ==========================================
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
  }, { threshold: 0.3 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // ==========================================
  // 5. Campus Life Gallery Lightbox
  // ==========================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');

    let currentGalleryIndex = 0;
    const galleryData = Array.from(galleryItems).map(item => ({
      src: item.getAttribute('data-src'),
      title: item.querySelector('.gallery-title').textContent,
      tag: item.querySelector('.gallery-tag').textContent
    }));

    const showLightbox = (index) => {
      currentGalleryIndex = index;
      const item = galleryData[index];
      lightboxImg.src = item.src;
      lightboxCaption.innerHTML = `${item.title} <span style="display:block; font-size:0.8rem; color:#F4B400; text-transform:uppercase; margin-top:4px;">${item.tag}</span>`;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    const prevImage = (e) => {
      e.stopPropagation();
      let index = currentGalleryIndex - 1;
      if (index < 0) index = galleryData.length - 1;
      showLightbox(index);
    };

    const nextImage = (e) => {
      e.stopPropagation();
      let index = currentGalleryIndex + 1;
      if (index >= galleryData.length) index = 0;
      showLightbox(index);
    };

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => showLightbox(index));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    // Keyboard navigation for Lightbox
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showLightbox((currentGalleryIndex - 1 + galleryData.length) % galleryData.length);
      if (e.key === 'ArrowRight') showLightbox((currentGalleryIndex + 1) % galleryData.length);
    });
  }

  // ==========================================
  // 6. Testimonials Slider
  // ==========================================
  const sliderWrapper = document.querySelector('.testimonials-wrapper');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-btn-prev');
  const nextBtn = document.querySelector('.slider-btn-next');

  let currentSlide = 0;
  const slideCount = slides.length;

  if (sliderWrapper && slideCount > 0) {
    // Generate Pagination Dots
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      if (idx === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const updateDots = () => {
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, idx) => {
        if (idx === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    const goToSlide = (idx) => {
      currentSlide = idx;
      sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
      updateDots();
    };

    const nextSlide = () => {
      let next = currentSlide + 1;
      if (next >= slideCount) next = 0;
      goToSlide(next);
    };

    const prevSlide = () => {
      let prev = currentSlide - 1;
      if (prev < 0) prev = slideCount - 1;
      goToSlide(prev);
    };

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto play every 8 seconds
    let slideInterval = setInterval(nextSlide, 8000);

    // Reset timer on user interaction
    const resetSliderInterval = () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 8000);
    };

    nextBtn.addEventListener('click', resetSliderInterval);
    prevBtn.addEventListener('click', resetSliderInterval);
    dotsContainer.addEventListener('click', resetSliderInterval);
  }

  // ==========================================
  // 7. Virtual Tour Modal
  // ==========================================
  const tourTrigger = document.querySelector('.tour-media-wrapper');
  const tourModal = document.querySelector('.tour-modal');
  const tourClose = document.querySelector('.tour-modal-close');
  const tourIframe = document.querySelector('.tour-modal-iframe');
  const tourVideo = document.querySelector('.tour-modal-video');

  if (tourTrigger) {
    tourTrigger.addEventListener('click', () => {
      const videoSrc = tourTrigger.getAttribute('data-video');
      if (videoSrc.toLowerCase().endsWith('.mp4')) {
        if (tourVideo) {
          tourVideo.src = videoSrc;
          tourVideo.style.display = 'block';
          tourVideo.play().catch(e => console.log('Auto-play blocked or error playing video: ', e));
        }
        if (tourIframe) tourIframe.style.display = 'none';
      } else {
        if (tourIframe) {
          tourIframe.src = videoSrc;
          tourIframe.style.display = 'block';
        }
        if (tourVideo) tourVideo.style.display = 'none';
      }
      tourModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    const closeTour = () => {
      tourModal.classList.remove('active');
      if (tourIframe) {
        tourIframe.src = '';
        tourIframe.style.display = 'none';
      }
      if (tourVideo) {
        tourVideo.pause();
        tourVideo.src = '';
        tourVideo.style.display = 'none';
      }
      document.body.style.overflow = '';
    };

    tourClose.addEventListener('click', closeTour);
    tourModal.addEventListener('click', (e) => {
      if (e.target === tourModal) {
        closeTour();
      }
    });
  }

  // ==========================================
  // 8. Premium Button Ripple Effect
  // ==========================================
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // ==========================================
  // 9. Gooey Text Morphing Component
  // ==========================================
  const text1 = document.getElementById("text1");
  const text2 = document.getElementById("text2");

  if (text1 && text2) {
    const morphWords = [
      "Innovation",
      "Excellence",
      "Creativity",
      "Discovery",
      "Leadership",
      "Success",
      "Knowledge",
      "Growth"
    ];

    const morphTime = 1.2;
    const cooldownTime = 2.0;

    let wordIndex = morphWords.length - 1;
    let timeVal = new Date();
    let morphVal = 0;
    let cooldownVal = cooldownTime;

    text1.textContent = morphWords[wordIndex % morphWords.length];
    text2.textContent = morphWords[(wordIndex + 1) % morphWords.length];

    function doMorph() {
      morphVal -= cooldownVal;
      cooldownVal = 0;

      let fraction = morphVal / morphTime;

      if (fraction > 1) {
        cooldownVal = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    }

    function setMorph(fraction) {
      text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      let fractionInverse = 1 - fraction;
      text1.style.filter = `blur(${Math.min(8 / fractionInverse - 8, 100)}px)`;
      text1.style.opacity = `${Math.pow(fractionInverse, 0.4) * 100}%`;

      text1.textContent = morphWords[wordIndex % morphWords.length];
      text2.textContent = morphWords[(wordIndex + 1) % morphWords.length];
    }

    function doCooldown() {
      morphVal = 0;
      text2.style.filter = "";
      text2.style.opacity = "100%";

      text1.style.filter = "";
      text1.style.opacity = "0%";
    }

    function animateGooey() {
      requestAnimationFrame(animateGooey);

      let newTime = new Date();
      let shouldIncrementIndex = cooldownVal > 0;
      let dt = (newTime - timeVal) / 1000;
      timeVal = newTime;

      cooldownVal -= dt;

      if (cooldownVal <= 0) {
        if (shouldIncrementIndex) {
          wordIndex++;
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    animateGooey();
  }

  // ==========================================
  // 10. Brainzly AI Assistant Chatbot
  // ==========================================
  const toggleBtn = document.getElementById('brainzly-toggle-btn');
  const chatWindow = document.getElementById('brainzly-chat-container');
  const closeBtn = document.getElementById('brainzly-close-chat');
  const chatFeed = document.getElementById('brainzly-chat-feed-div');
  const inputForm = document.getElementById('brainzly-input-form');
  const userInput = document.getElementById('brainzly-user-input');
  const sendBtn = document.getElementById('brainzly-send-btn');
  const splineContainer = document.getElementById('brainzly-spline-container');

  const GROQ_CONFIG = {
    apiKey: "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",
    model: "openai/gpt-oss-20b"
  };

  let conversationHistory = [];
  try {
    const storedHistory = sessionStorage.getItem('brainzly_chat_history');
    if (storedHistory) {
      conversationHistory = JSON.parse(storedHistory);
    }
  } catch (e) {
    console.error("Failed to load session history:", e);
  }
  let isSplineLoaded = false;
  let currentFileAttachment = null;

  // Dynamically inject File Upload elements if not present in HTML DOM
  if (inputForm) {
    let filePreview = document.getElementById('brainzly-file-preview');
    if (!filePreview) {
      filePreview = document.createElement('div');
      filePreview.id = 'brainzly-file-preview';
      filePreview.className = 'brainzly-file-preview';
      filePreview.style.display = 'none';
      inputForm.parentNode.insertBefore(filePreview, inputForm);
    }

    let fileInput = document.getElementById('brainzly-file-input');
    if (!fileInput) {
      fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.id = 'brainzly-file-input';
      fileInput.style.display = 'none';
      fileInput.accept = '.txt,.pdf,.doc,.docx,.csv,.md,.json,.html,image/*';
      document.body.appendChild(fileInput);
    }

    let fileBtn = document.getElementById('brainzly-file-btn');
    if (!fileBtn) {
      fileBtn = document.createElement('button');
      fileBtn.type = 'button';
      fileBtn.id = 'brainzly-file-btn';
      fileBtn.className = 'input-icon-btn';
      fileBtn.title = 'Attach file/document';
      fileBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`;
      inputForm.insertBefore(fileBtn, sendBtn);
    }

    fileBtn.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        currentFileAttachment = {
          name: file.name,
          size: file.size,
          type: file.type,
          content: evt.target.result
        };
        showFilePreview(file.name);
        sendBtn.disabled = false;
      };

      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });
  }

  function showFilePreview(fileName) {
    const filePreview = document.getElementById('brainzly-file-preview');
    if (filePreview) {
      filePreview.style.display = 'flex';
      filePreview.innerHTML = `
        <span class="brainzly-file-preview-name">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/></svg>
          ${fileName}
        </span>
        <button type="button" class="brainzly-file-preview-remove" id="brainzly-file-remove-btn" title="Remove file">&times;</button>
      `;
      document.getElementById('brainzly-file-remove-btn').addEventListener('click', clearFilePreview);
    }
  }

  function clearFilePreview() {
    currentFileAttachment = null;
    const filePreview = document.getElementById('brainzly-file-preview');
    if (filePreview) {
      filePreview.style.display = 'none';
      filePreview.innerHTML = '';
    }
    const fileInput = document.getElementById('brainzly-file-input');
    if (fileInput) fileInput.value = '';
    sendBtn.disabled = !userInput.value.trim();
  }

  // Forward window cursor movement events globally to the internal Spline WebGL canvas
  window.addEventListener('mousemove', (e) => {
    if (!chatWindow.classList.contains('active')) return;

    const viewer = splineContainer.querySelector('spline-viewer');
    if (viewer && viewer.shadowRoot) {
      const canvas = viewer.shadowRoot.querySelector('canvas');
      if (canvas) {
        const mouseEvent = new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX: e.clientX,
          clientY: e.clientY
        });
        canvas.dispatchEvent(mouseEvent);

        const pointerEvent = new PointerEvent('pointermove', {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX: e.clientX,
          clientY: e.clientY,
          pointerType: 'mouse'
        });
        canvas.dispatchEvent(pointerEvent);
      }
    }
  });

  window.addEventListener('touchmove', (e) => {
    if (!chatWindow.classList.contains('active')) return;
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const viewer = splineContainer.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        const canvas = viewer.shadowRoot.querySelector('canvas');
        if (canvas) {
          const pointerEvent = new PointerEvent('pointermove', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: touch.clientX,
            clientY: touch.clientY,
            pointerType: 'touch'
          });
          canvas.dispatchEvent(pointerEvent);
        }
      }
    }
  }, { passive: true });

  // Pre-load Spline viewer on initial load to ensure instant chatbot load
  const preloadSpline = () => {
    if (isSplineLoaded) return;
    isSplineLoaded = true;

    const isMobileDevice = window.innerWidth <= 768;
    if (isMobileDevice) {
      const avatarHTML = `
        <div class="mobile-chatbot-avatar" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle, rgba(10, 77, 140, 0.3) 0%, transparent 70%);">
          <div style="width: 65px; height: 65px; border-radius: 50%; background: rgba(255, 255, 255, 0.15); border: 2.5px solid var(--color-accent); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(212, 175, 55, 0.3); animation: float-slow 4s ease-in-out infinite;">
            <img src="assets/Home/Images/logo-modified.png" alt="Brainz Logo" style="width: 40px; height: 40px; object-fit: contain;">
          </div>
        </div>
      `;
      splineContainer.innerHTML = avatarHTML;
      return;
    }

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.0/build/spline-viewer.js';
    document.head.appendChild(script);

    const viewer = document.createElement('spline-viewer');
    viewer.setAttribute('url', 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode');
    splineContainer.appendChild(viewer);

    const hideWatermark = setInterval(() => {
      if (viewer.shadowRoot) {
        const logo = viewer.shadowRoot.querySelector('#logo');
        if (logo) {
          logo.style.display = 'none';
          clearInterval(hideWatermark);
        }
      }
    }, 100);
    setTimeout(() => clearInterval(hideWatermark), 10000);
  };

  if (splineContainer) {
    setTimeout(preloadSpline, 800);
  }

  toggleBtn.addEventListener('click', () => {
    chatWindow.classList.add('active');
    toggleBtn.style.display = 'none';
    sessionStorage.setItem('brainzly_chat_open', 'true');
  });

  closeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('active');
    toggleBtn.style.display = 'flex';
    sessionStorage.setItem('brainzly_chat_open', 'false');
  });

  userInput.addEventListener('input', () => {
    sendBtn.disabled = !userInput.value.trim() && !currentFileAttachment;
  });

  const voiceBtn = document.getElementById('brainzly-voice-btn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech recognition is not supported in this browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      voiceBtn.style.color = '#F4B400';

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        userInput.value = text;
        sendBtn.disabled = false;
      };

      recognition.onend = () => {
        voiceBtn.style.color = '';
      };

      recognition.start();
    });
  }

  const chips = document.querySelectorAll('.brainzly-chip-btn');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      handleUserMessage(chip.textContent.trim());
    });
  });

  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = userInput.value.trim();
    if (text || currentFileAttachment) {
      handleUserMessage(text);
    }
  });

  function formatMessageHTML(text) {
    if (!text) return '';

    // Escape basic HTML tags to avoid XSS
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Pre-processing markdown tables:
    const lines = html.split('\n');
    let inTable = false;
    let tableRows = [];
    let parsedLines = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      if (line.startsWith('|') && line.endsWith('|')) {
        if (/^[|\s\-:]+$/.test(line)) {
          continue;
        }

        if (!inTable) {
          inTable = true;
          tableRows = [];
        }

        const cells = line.split('|')
          .slice(1, -1)
          .map(cell => cell.trim());

        tableRows.push(cells);
      } else {
        if (inTable) {
          let tableHTML = '<div class="brainzly-table-container"><table class="brainzly-table">';
          tableRows.forEach((row, rowIndex) => {
            tableHTML += '<tr>';
            row.forEach(cell => {
              if (rowIndex === 0) {
                tableHTML += `<th>${cell}</th>`;
              } else {
                tableHTML += `<td>${cell}</td>`;
              }
            });
            tableHTML += '</tr>';
          });
          tableHTML += '</table></div>';
          parsedLines.push(tableHTML);
          inTable = false;
        }

        parsedLines.push(lines[i]);
      }
    }

    if (inTable) {
      let tableHTML = '<div class="brainzly-table-container"><table class="brainzly-table">';
      tableRows.forEach((row, rowIndex) => {
        tableHTML += '<tr>';
        row.forEach(cell => {
          if (rowIndex === 0) {
            tableHTML += `<th>${cell}</th>`;
          } else {
            tableHTML += `<td>${cell}</td>`;
          }
        });
        tableHTML += '</tr>';
      });
      tableHTML += '</table></div>';
      parsedLines.push(tableHTML);
    }

    let processedText = parsedLines.join('\n');

    // Headers
    processedText = processedText.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    processedText = processedText.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');

    // Horizontal Rule
    processedText = processedText.replace(/^---$/gm, '<hr class="brainzly-hr">');

    // Blockquotes
    processedText = processedText.replace(/^&gt;\s?\*(.*?)\*$/gm, '<blockquote class="brainzly-quote">$1</blockquote>');
    processedText = processedText.replace(/^&gt;\s?(.*?)$/gm, '<blockquote class="brainzly-quote">$1</blockquote>');

    // Bullet Lists
    processedText = processedText.replace(/^\-\s(.*)$/gm, '<ul><li>$1</li></ul>');
    processedText = processedText.replace(/<\/ul>\n<ul>/g, '\n');

    // Ordered Lists
    processedText = processedText.replace(/^\d+\.\s(.*)$/gm, '<ol><li>$1</li></ol>');
    processedText = processedText.replace(/<\/ol>\n<ol>/g, '\n');

    // Bold tags
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Links: [Text](Url) -> Premium button
    processedText = processedText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="brainzly-link-btn" target="_blank">$1</a>');

    // Convert newlines in paragraphs to <br> where safe
    processedText = processedText.split('\n').map(l => {
      if (!l.trim()) return '<br>';
      if (l.startsWith('<div') || l.startsWith('<tr') || l.startsWith('<td') || l.startsWith('<th') || l.startsWith('<table') || l.startsWith('<ul') || l.startsWith('<ol') || l.startsWith('<li') || l.startsWith('<h3') || l.startsWith('<h4') || l.startsWith('<hr') || l.startsWith('<block')) {
        return l;
      }
      return l + '<br>';
    }).join('\n');

    processedText = processedText
      .replace(/<br>\n<br>/g, '<br>')
      .replace(/<br>\n<(ul|ol|table|blockquote|h3|h4|hr|div)/g, '\n<$1')
      .replace(/<\/(ul|ol|table|blockquote|h3|h4|hr|div)>\n<br>/g, '</$1>\n');

    return processedText;
  }

  async function handleUserMessage(text) {
    const attachment = currentFileAttachment;
    let displayText = text;
    if (attachment) {
      displayText = `<div class="brainzly-attachment-badge">📎 ${attachment.name}</div>${text || 'Uploaded file for analysis'}`;
    }

    appendMessageBubble('user', displayText, true);
    userInput.value = '';
    clearFilePreview();
    sendBtn.disabled = true;

    let payloadText = text;
    if (attachment) {
      payloadText = `[Attached File: ${attachment.name}]\n\n--- File Content Start ---\n${attachment.content}\n--- File Content End ---\n\n${text || "Please analyze this attached file."}`;
    }

    conversationHistory.push({ role: 'user', content: payloadText });
    try {
      sessionStorage.setItem('brainzly_chat_history', JSON.stringify(conversationHistory));
    } catch (e) {}

    const typingBubble = showTypingIndicator();
    chatFeed.scrollTop = chatFeed.scrollHeight;

    try {
      const botBubble = appendMessageBubble('bot', '');
      const contentEl = botBubble.querySelector('.brainzly-text-content');

      let responseText = '';
      await callGroqAPI(conversationHistory, (chunk) => {
        if (typingBubble) typingBubble.remove();
        responseText += chunk;
        contentEl.innerHTML = formatMessageHTML(responseText);
        chatFeed.scrollTop = chatFeed.scrollHeight;
      });

      conversationHistory.push({ role: 'assistant', content: responseText });
      try {
        sessionStorage.setItem('brainzly_chat_history', JSON.stringify(conversationHistory));
      } catch (e) {}
      addMessageActions(botBubble, responseText, conversationHistory.length - 1);

    } catch (err) {
      if (typingBubble) typingBubble.remove();
      const errMsg = `⚠️ **Connection Notice:** Having trouble reaching the AI assistant at the moment (Error: ${err.message || 'Check connection'}). Please contact the school office directly at +91 9105014545 for immediate assistance.`;
      appendMessageBubble('bot', errMsg);
      conversationHistory.push({ role: 'assistant', content: errMsg });
      try {
        sessionStorage.setItem('brainzly_chat_history', JSON.stringify(conversationHistory));
      } catch (e) {}
    }

    chatFeed.scrollTop = chatFeed.scrollHeight;
  }

  function appendMessageBubble(sender, text, isHTML = false) {
    const bubble = document.createElement('div');
    bubble.className = `brainzly-msg brainzly-msg-${sender}`;

    const content = document.createElement('div');
    content.className = 'brainzly-text-content';
    if (isHTML) {
      content.innerHTML = text;
    } else {
      content.innerHTML = formatMessageHTML(text);
    }
    bubble.appendChild(content);

    chatFeed.appendChild(bubble);
    chatFeed.scrollTop = chatFeed.scrollHeight;
    return bubble;
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'brainzly-typing-bubble';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    chatFeed.appendChild(indicator);
    return indicator;
  }

  function addMessageActions(bubble, text, messageIndex) {
    const actions = document.createElement('div');
    actions.className = 'brainzly-msg-actions';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'brainzly-msg-action-btn';
    copyBtn.title = 'Copy response';
    copyBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
    copyBtn.addEventListener('click', () => {
      const plainText = text.replace(/<[^>]*>?/gm, '');
      navigator.clipboard.writeText(plainText);
    });

    const speakBtn = document.createElement('button');
    speakBtn.className = 'brainzly-msg-action-btn';
    speakBtn.title = 'Speak response';
    speakBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.536 8.464a5 5 0 0 1 0 7.072m2.828-9.9a9 9 0 0 1 0 12.728M5.586 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>`;
    speakBtn.addEventListener('click', () => {
      window.speechSynthesis.cancel();
      const plainText = text.replace(/<[^>]*>?/gm, '');
      const utterance = new SpeechSynthesisUtterance(plainText);
      window.speechSynthesis.speak(utterance);
    });

    actions.appendChild(copyBtn);
    actions.appendChild(speakBtn);
    bubble.appendChild(actions);
  }

  async function callGroqAPI(history, onChunk) {
    const apiKey = GROQ_CONFIG.apiKey;
    const modelName = GROQ_CONFIG.model;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: "system",
            content: `You are Brainzly, the official AI assistant and digital receptionist of Brainz Edu World school.
Your responses are live, intelligent, helpful, warm, and precise.
Provide fully AI-generated assistance regarding admissions, academics (CBSE curriculum, Science/Commerce/Humanities streams), school facilities (STEAM & Robotics automation labs, sports, smart classes), transport, fee structure, timings, contact info, and attached files/documents.

Context about Brainz Edu World:
- Standard: CBSE Curriculum from Pre-Primary (Ages 3-5) up to Senior Secondary (Grades XI-XII).
- Facilities: Smart Classrooms, Experienced Faculty, Digital Learning, Sports Academy (Football, Indoor sports, Athletic complex), Safe Gated Campus with 24/7 CCTV, Robotics & STEAM automation lab.
- Location: Kila Road, Village Bhavanpur, Meerut, Uttar Pradesh 250001, India.
- Phone: +91 9105014545 / +91 8192004545.
- Email: contact@brainzeduworld.com.
- Admissions: Open for academic session 2026-2027.`
          },
          ...history
        ],
        stream: true
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      let errMsg = response.statusText;
      try {
        const errObj = JSON.parse(errText);
        errMsg = errObj.error?.message || response.statusText;
      } catch(e) {}
      throw new Error(errMsg);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let hasReceivedChunk = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const cleanedLine = line.trim();
        if (!cleanedLine || cleanedLine === "data: [DONE]") continue;

        if (cleanedLine.startsWith("data: ")) {
          try {
            const parsed = JSON.parse(cleanedLine.substring(6));
            const chunk = parsed.choices[0]?.delta?.content || "";
            if (chunk) {
              hasReceivedChunk = true;
              onChunk(chunk);
            }
          } catch (e) {}
        }
      }
    }

    if (!hasReceivedChunk) {
      throw new Error("No response content received from AI API.");
    }
  }

  function loadStoredChatSession() {
    if (sessionStorage.getItem('brainzly_chat_open') === 'true') {
      chatWindow.classList.add('active');
      toggleBtn.style.display = 'none';
    }

    if (conversationHistory.length > 0) {
      conversationHistory.forEach((msg, idx) => {
        const isHTML = msg.content.includes("brainzly-attachment-badge") || msg.content.includes("Connection Notice");
        const bubble = appendMessageBubble(msg.role === 'user' ? 'user' : 'bot', msg.content, isHTML);
        if (msg.role === 'assistant' && !msg.content.includes("Connection Notice")) {
          addMessageActions(bubble, msg.content, idx);
        }
      });
      chatFeed.scrollTop = chatFeed.scrollHeight;
    }
  }

  loadStoredChatSession();
});



/* ==========================================================
   Brainz Edu World - School Life specific JavaScript Logic (Cleansed Content)
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================
  // 1. CLEANSED DATA STORES (Preserving ONLY original content)
  // ==========================================================

  // A. Celebrations (Purged of fabricated summaries & dates)
  const celebrationsData = [
    {
      id: 1,
      title: "Celebrating Kranti Diwas!",
      date: "Date to be added",
      year: "all",
      category: "national",
      summary: "Content will be added from the official Brainz archives.",
      image: "placeholder"
    },
    {
      id: 2,
      title: "Labour Day Celebration",
      date: "Date to be added",
      year: "all",
      category: "cultural",
      summary: "Content will be added from the official Brainz archives.",
      image: "placeholder"
    },
    {
      id: 3,
      title: "First Day, First Smiles",
      date: "Date to be added",
      year: "all",
      category: "academic",
      summary: "Content will be added from the official Brainz archives.",
      image: "placeholder"
    },
    {
      id: 4,
      title: "Kindergarten Graduation Ceremony",
      date: "Date to be added",
      year: "all",
      category: "academic",
      summary: "Content will be added from the official Brainz archives.",
      image: "placeholder"
    },
    {
      id: 5,
      title: "Republic Day Celebration",
      date: "Date to be added",
      year: "all",
      category: "national",
      summary: "Content will be added from the official Brainz archives.",
      image: "placeholder"
    },
    {
      id: 6,
      title: "Farewell Ceremony",
      date: "Date to be added",
      year: "all",
      category: "cultural",
      summary: "Content will be added from the official Brainz archives.",
      image: "placeholder"
    },
    {
      id: 7,
      title: "Children's Day Celebration",
      date: "Date to be added",
      year: "all",
      category: "cultural",
      summary: "Content will be added from the official Brainz archives.",
      image: "placeholder"
    },
    {
      id: 8,
      title: "Dussehra Celebration",
      date: "Date to be added",
      year: "all",
      category: "cultural",
      summary: "Content will be added from the official Brainz archives.",
      image: "placeholder"
    }
  ];

  // B. Experiential Learning (Using original content from index.html where available, else placeholders)
  const learningData = [
    {
      title: "Career Awareness",
      description: "Content will be added from the official Brainz archives.",
      image: "placeholder",
      icon: "users"
    },
    {
      title: "Project Based Learning",
      description: "Content will be added from the official Brainz archives.",
      image: "placeholder",
      icon: "cpu"
    },
    {
      title: "Earth Day",
      description: "Students conducted hands-on science activities, demonstrating solar energy models by lighting bulbs and learning about sustainability on Earth Day.",
      image: "placeholder",
      icon: "globe"
    },
    {
      title: "School Picnics",
      description: "Content will be added from the official Brainz archives.",
      image: "placeholder",
      icon: "compass"
    },
    {
      title: "Camping Trips",
      description: "Content will be added from the official Brainz archives.",
      image: "placeholder",
      icon: "tent"
    },
    {
      title: "Army Visit",
      description: "Content will be added from the official Brainz archives.",
      image: "placeholder",
      icon: "shield"
    },
    {
      title: "Student Exhibitions",
      description: "Content will be added from the official Brainz archives.",
      image: "placeholder",
      icon: "presentation"
    },
    {
      title: "NCC Activities",
      description: "Content will be added from the official Brainz archives.",
      image: "placeholder",
      icon: "award"
    },
    {
      title: "Kindness Matters",
      description: "An interactive neighborhood outreach drive that raised resources, blankets, and school kits for underserved communities.",
      image: "placeholder",
      icon: "heart"
    }
  ];

  // C. Competitions & Achievements (Preserved original Zonal Science Exhibition content, else placeholders)
  const competitionsData = [
    {
      title: "CBSE Zonal Science Exhibition",
      date: "June 24, 2026",
      summary: "Our innovative smart-automation models won the gold ribbon at the regional competition, earning entry to the Nationals.",
      badge: "Zonal Gold Winner",
      image: "placeholder"
    },
    {
      title: "Football Champions",
      date: "Date to be added",
      summary: "Content will be added from the official Brainz archives.",
      badge: "Pending Verification",
      image: "placeholder"
    },
    {
      title: "Debate Competition",
      date: "Date to be added",
      summary: "Content will be added from the official Brainz archives.",
      badge: "Pending Verification",
      image: "placeholder"
    },
    {
      title: "IIT Delhi Ideathon",
      date: "Date to be added",
      summary: "Content will be added from the official Brainz archives.",
      badge: "Pending Verification",
      image: "placeholder"
    },
    {
      title: "IIT Bombay Eureka Junior",
      date: "Date to be added",
      summary: "Content will be added from the official Brainz archives.",
      badge: "Pending Verification",
      image: "placeholder"
    },
    {
      title: "University of Melbourne Competition",
      date: "Date to be added",
      summary: "Content will be added from the official Brainz archives.",
      badge: "Pending Verification",
      image: "placeholder"
    },
    {
      title: "IGBC Challenge",
      date: "Date to be added",
      summary: "Content will be added from the official Brainz archives.",
      badge: "Pending Verification",
      image: "placeholder"
    },
    {
      title: "Katha Utsav",
      date: "Date to be added",
      summary: "Content will be added from the official Brainz archives.",
      badge: "Pending Verification",
      image: "placeholder"
    },
    {
      title: "Kalakriti",
      date: "Date to be added",
      summary: "Content will be added from the official Brainz archives.",
      badge: "Pending Verification",
      image: "placeholder"
    }
  ];

  // D. Student Newsletter (The Robin)
  const newsletterData = [
    { issue: "Issue 5", date: "Date to be added", title: "Content will be added from the official Brainz archives.", file: "#" },
    { issue: "Issue 4", date: "Date to be added", title: "Content will be added from the official Brainz archives.", file: "#" },
    { issue: "Issue 3", date: "Date to be added", title: "Content will be added from the official Brainz archives.", file: "#" },
    { issue: "Issue 2", date: "Date to be added", title: "Content will be added from the official Brainz archives.", file: "#" },
    { issue: "Issue 1", date: "Date to be added", title: "Content will be added from the official Brainz archives.", file: "#" }
  ];

  // E. Founder's Day Awards
  const awardsData = [
    { title: "Student of the Year", recipient: "Recipient to be added", desc: "Content will be added from the official Brainz archives." },
    { title: "Investiture Ceremony", recipient: "Recipient to be added", desc: "Content will be added from the official Brainz archives." },
    { title: "Birth Anniversary of Mr Rajiv Goyal", recipient: "Awards Archive", desc: "Content will be added from the official Brainz archives." }
  ];

  // F. Professional Development Timeline
  const trainingData = [
    { title: "CBSE Hindi Training", desc: "Content will be added from the official Brainz archives." },
    { title: "AI in Education", desc: "Content will be added from the official Brainz archives." },
    { title: "Belongingness", desc: "Content will be added from the official Brainz archives." },
    { title: "SMART Lesson Planning", desc: "Content will be added from the official Brainz archives." },
    { title: "Project Based Learning", desc: "Content will be added from the official Brainz archives." },
    { title: "Google Applications", desc: "Content will be added from the official Brainz archives." },
    { title: "Canva Workshop", desc: "Content will be added from the official Brainz archives." },
    { title: "Science Workshop", desc: "Content will be added from the official Brainz archives." },
    { title: "Tata Class Edge", desc: "Content will be added from the official Brainz archives." },
    { title: "Phonics", desc: "Content will be added from the official Brainz archives." }
  ];

  // G. Teacher Certifications
  const certificationsData = [
    { title: "Google Certified Educator Level 1", count: "Details", icon: "award" },
    { title: "Google Certified Educator Level 2", count: "Details", icon: "shield" },
    { title: "British Council Core Skills", count: "Details", icon: "globe" },
    { title: "CBSE Master Trainer", count: "Details", icon: "check-circle" }
  ];


  // ==========================================================
  // 2. DYNAMIC RENDERING CONTROLLER
  // ==========================================================

  // Mount elements
  const celebrationsGrid = document.getElementById('celebrations-grid');
  const experientialGrid = document.getElementById('experiential-grid');
  const competitionsGrid = document.getElementById('competitions-grid');
  const issueGrid = document.getElementById('issue-grid');
  const awardsGrid = document.getElementById('awards-grid');
  const trainingTimeline = document.getElementById('training-timeline');
  const certsGrid = document.getElementById('certs-grid');

  // Search/Filters elements
  const searchInput = document.getElementById('event-search');
  const filterYear = document.getElementById('filter-year');
  const filterCategory = document.getElementById('filter-category');

  // Helper to render image or placeholder
  const getImageHTML = (imgSrc, altText) => {
    if (!imgSrc || imgSrc === "placeholder") {
      return `
        <div class="elegant-img-placeholder">
          <i data-lucide="image"></i>
          <span>Image Archive Pending</span>
        </div>
      `;
    }
    return `<img src="${imgSrc}" alt="${altText}" loading="lazy">`;
  };

  // Renders Celebrations list
  const renderCelebrations = () => {
    if (!celebrationsGrid) return;

    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const selectedYear = filterYear ? filterYear.value : "all";
    const selectedCategory = filterCategory ? filterCategory.value : "all";

    const filtered = celebrationsData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(query) || item.summary.toLowerCase().includes(query);
      const matchesYear = (selectedYear === "all" || item.year === selectedYear);
      const matchesCategory = (selectedCategory === "all" || item.category === selectedCategory);
      return matchesSearch && matchesYear && matchesCategory;
    });

    if (filtered.length === 0) {
      celebrationsGrid.innerHTML = `
        <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--color-text-muted);">
          <i data-lucide="info" style="margin: 0 auto 1rem; width:48px; height:48px; stroke-width:1.5;"></i>
          <p>No celebrations found matching the filter criteria.</p>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    celebrationsGrid.innerHTML = filtered.map(item => `
      <article class="event-card fade-up-element visible spotlight-card">
        <div class="event-img-wrapper">
          ${getImageHTML(item.image, item.title)}
          <span class="event-badge">${item.category.toUpperCase()}</span>
        </div>
        <div class="event-content">
          <div class="event-meta">
            <i data-lucide="calendar"></i>
            <span>${item.date}</span>
          </div>
          <h3 class="event-title">${item.title}</h3>
          <p class="event-desc">${item.summary}</p>
          <a href="#" class="btn btn-outline-dark btn-sm read-more-placeholder" onclick="event.preventDefault(); alert('Content will be added from the official Brainz archives.')">Read More</a>
        </div>
      </article>
    `).join('');

    lucide.createIcons();
    attachSpotlight();
  };

  // Renders Experiential Learning grid
  const renderExperiential = () => {
    if (!experientialGrid) return;
    experientialGrid.innerHTML = learningData.map(item => `
      <div class="learning-card fade-up-element visible spotlight-card">
        <div class="learning-img-wrapper">
          ${getImageHTML(item.image, item.title)}
        </div>
        <div class="learning-content">
          <div class="learning-icon-box"><i data-lucide="${item.icon}"></i></div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </div>
    `).join('');
  };

  // Renders Achievements/Competitions grid
  const renderCompetitions = () => {
    if (!competitionsGrid) return;
    competitionsGrid.innerHTML = competitionsData.map(item => `
      <article class="comp-card fade-up-element visible spotlight-card">
        <div class="comp-img-wrapper">
          ${getImageHTML(item.image, item.title)}
          <span class="comp-badge-tag"><i data-lucide="award"></i> ${item.badge}</span>
        </div>
        <div class="comp-content">
          <span class="comp-date">${item.date}</span>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
        </div>
      </article>
    `).join('');
  };

  // Renders Robin Issues cards
  const renderNewsletters = () => {
    if (!issueGrid) return;
    issueGrid.innerHTML = newsletterData.map(item => `
      <div class="issue-card fade-up-element visible spotlight-card">
        <div class="issue-cover-mock">
          <div class="issue-mock-overlay"></div>
          <i data-lucide="book-open" class="issue-mock-icon"></i>
          <h4>THE ROBIN</h4>
          <span class="issue-badge">${item.issue}</span>
        </div>
        <div class="issue-details">
          <span class="issue-date">${item.date}</span>
          <h3>${item.title}</h3>
          <a href="${item.file}" class="btn btn-outline-dark btn-sm text-center" style="display:block; margin-top:1rem;" onclick="event.preventDefault(); alert('Content will be added from the official Brainz archives.')">View Issue</a>
        </div>
      </div>
    `).join('');
  };

  // Renders Founder's Day Awards
  const renderAwards = () => {
    if (!awardsGrid) return;
    awardsGrid.innerHTML = awardsData.map(item => `
      <div class="award-card fade-up-element visible spotlight-card">
        <div class="award-icon-box"><i data-lucide="shield"></i></div>
        <h3>${item.title}</h3>
        <p class="award-recipient">${item.recipient}</p>
        <p class="award-desc">${item.desc}</p>
      </div>
    `).join('');
  };

  // Renders Professional Development timeline nodes
  const renderTraining = () => {
    if (!trainingTimeline) return;
    trainingTimeline.innerHTML = trainingData.map((item, idx) => `
      <div class="timeline-node fade-up-element visible">
        <div class="timeline-dot"><i data-lucide="book-open"></i></div>
        <div class="timeline-content">
          <h3>${item.title} <span class="timeline-step-tag">Node ${idx + 1}</span></h3>
          <p>${item.desc}</p>
        </div>
      </div>
    `).join('');
  };

  // Renders Teacher Certifications grid
  const renderCertifications = () => {
    if (!certsGrid) return;
    certsGrid.innerHTML = certificationsData.map(item => `
      <div class="cert-card fade-up-element visible spotlight-card">
        <div class="cert-icon-box"><i data-lucide="${item.icon}"></i></div>
        <h3>${item.title}</h3>
        <div class="cert-count-badge">Details in Archive</div>
      </div>
    `).join('');
  };

  // Trigger initial renders
  renderCelebrations();
  renderExperiential();
  renderCompetitions();
  renderNewsletters();
  renderAwards();
  renderTraining();
  renderCertifications();

  // Attach search event listeners
  if (searchInput) searchInput.addEventListener('input', renderCelebrations);
  if (filterCategory) filterCategory.addEventListener('change', renderCelebrations);
  if (filterYear) filterYear.addEventListener('change', renderCelebrations);


  // ==========================================================
  // 3. SPOTLIGHT CONTROLLER (3D tilt removed)
  // ==========================================================
  function attachSpotlight() {
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        // Update spotlight custom properties
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // Initial trigger for static templates
  attachSpotlight();


  // ==========================================================
  // 4. SUB-NAV STICKY SCROLLSPY TRACKER
  // ==========================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.subnav-link');

  const updateActiveLink = () => {
    let scrollPos = window.scrollY || document.documentElement.scrollTop;
    
    sections.forEach(section => {
      const top = section.offsetTop - 140; 
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Trigger initially

  // Smooth scroll links click handler
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 120;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });


  // ==========================================================
  // 5. ANIMATED HERO SUBTITLE SHIFTER (Handled by main.js typewriter engine)
  // ==========================================================

});

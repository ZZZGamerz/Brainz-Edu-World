/* ==========================================================
   Brainz Edu World - School Life specific JavaScript Logic (Cleansed Content)
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================
  // 1. CLEANSED DATA STORES (Preserving ONLY original content)
  // ==========================================================

  // A. Celebrations (Populated with real school calendar and photography)
  const celebrationsData = [
    {
      id: 1,
      title: "Celebrating Kranti Diwas!",
      date: "May 10",
      year: "all",
      category: "national",
      summary: "Students paid homage to the brave martyrs of the 1857 First War of Independence with patriotic dramas, presentations, and assemblies.",
      image: "assets/Home/Images/republic_day_salute.jpg"
    },
    {
      id: 2,
      title: "Labour Day Celebration",
      date: "May 1",
      year: "all",
      category: "cultural",
      summary: "Students expressed heartfelt gratitude to the campus support staff, presenting handmade cards, tokens of appreciation, and refreshments.",
      image: "assets/Home/Images/kindness_matters_activity.jpg"
    },
    {
      id: 3,
      title: "First Day, First Smiles",
      date: "April 4",
      year: "all",
      category: "academic",
      summary: "Welcoming students back to campus with colorful classroom orientations, friendly icebreakers, and interactive creative tasks.",
      image: "assets/Home/Images/school_reopening_activity.jpg"
    },
    {
      id: 4,
      title: "Kindergarten Graduation Ceremony",
      date: "March 20",
      year: "all",
      category: "academic",
      summary: "Celebrating the joyful milestone of our foundational stage learners transitioning to Primary Wing with scrolls, music, and pride.",
      image: "assets/Home/Images/painting_UKG.jpg"
    },
    {
      id: 5,
      title: "Republic Day Celebration",
      date: "January 26",
      year: "all",
      category: "national",
      summary: "Ceremonial flag hoisting, national anthem, parade drills, and vibrant tricolor cultural dances showcasing India's rich heritage.",
      image: "assets/Home/Images/republic_day_salute.jpg"
    },
    {
      id: 6,
      title: "Farewell Ceremony",
      date: "February 15",
      year: "all",
      category: "cultural",
      summary: "A fond send-off for our graduating Grade XII batch featuring custom titles, musical tributes, and memorable student journeys.",
      image: "assets/Home/Images/discussion.jpg"
    },
    {
      id: 7,
      title: "Children's Day Celebration",
      date: "November 14",
      year: "all",
      category: "cultural",
      summary: "A joyful day dedicated to our students with humorous skits performed by faculty, campus fun games, and sweet distribution.",
      image: "assets/Home/Images/fun_activity.jpeg"
    },
    {
      id: 8,
      title: "Dussehra Cultural Celebration",
      date: "October 18",
      year: "all",
      category: "cultural",
      summary: "Enactments depicting the timeless victory of virtue over vice, accompanied by festive art, music, and campus celebrations.",
      image: "assets/Home/Images/dance_activity.jpg"
    }
  ];

  // B. Experiential Learning (Paired with genuine campus activity images)
  const learningData = [
    {
      title: "Career Awareness & Fairs",
      description: "University fairs and expert counselor sessions to help students make informed higher education decisions.",
      image: "assets/Home/Images/university_fair.jpg",
      icon: "users"
    },
    {
      title: "Project Based Learning",
      description: "Hands-on projects bridging STEM principles with prototype models and collaborative scientific problem-solving.",
      image: "assets/Home/Images/problem_solving.jpeg",
      icon: "cpu"
    },
    {
      title: "Earth Day & Solar Science",
      description: "Students conducted hands-on experiments demonstrating solar energy conversion, circuits, and sustainability models.",
      image: "assets/Home/Images/solar_energy_activity.jpg",
      icon: "globe"
    },
    {
      title: "School Picnics & Outings",
      description: "Carefully curated educational excursions that foster social empathy, team bonding, and joyful peer connections.",
      image: "assets/Home/Images/fun_time.jpg",
      icon: "compass"
    },
    {
      title: "Camping & Outdoor Leadership",
      description: "Adventure camps teaching survival basics, obstacle navigation, navigation, and collaborative discipline.",
      image: "assets/Home/Images/corridor.jpg",
      icon: "tent"
    },
    {
      title: "Army & Defense Interaction",
      description: "Motivational interactions with Armed Forces officers, building deep patriotic values and defense career awareness.",
      image: "assets/Home/Images/selected_NCC_cadets.jpg",
      icon: "shield"
    },
    {
      title: "Student Exhibitions",
      description: "Multidisciplinary exhibitions where students showcase robotics models, working science setups, and visual arts.",
      image: "assets/Home/Images/exhibition.jpg",
      icon: "presentation"
    },
    {
      title: "NCC Activities & Cadets",
      description: "Rigorous drills, leadership camps, discipline drills, and community welfare initiatives by our trained NCC squad.",
      image: "assets/Home/Images/NCC_briefing_session.jpg",
      icon: "award"
    },
    {
      title: "Kindness Matters Outreach",
      description: "Community welfare drives where students distribute winter warmers, learning materials, and food supplies to the underprivileged.",
      image: "assets/Home/Images/kindness_matters_activity.jpg",
      icon: "heart"
    }
  ];

  // C. Competitions & Achievements
  const competitionsData = [
    {
      title: "CBSE Zonal Science Exhibition",
      date: "Regional Meet",
      summary: "Our innovative smart-automation models won the gold ribbon at the regional competition, earning entry to the Nationals.",
      badge: "Zonal Gold Winner",
      image: "assets/Home/Images/problem_solving.jpeg"
    },
    {
      title: "Inter-School Basketball Champions",
      date: "District Sports League",
      summary: "Our senior basketball squad clinched 1st place in the district tournament through remarkable teamwork and defensive precision.",
      badge: "Champions Trophy",
      image: "assets/Home/Images/basketball_match1.png"
    },
    {
      title: "National Debate Competition",
      date: "Annual Inter-School",
      summary: "Brainz speakers secured top positions addressing modern ethics, digital transformation, and global citizenship.",
      badge: "Best Speaker Award",
      image: "assets/Home/Images/discussion.jpg"
    },
    {
      title: "IIT Delhi Ideathon",
      date: "Innovation Summit",
      summary: "Presented an automated water conservation valve system designed to optimize institutional resource conservation.",
      badge: "Top 10 Finalist",
      image: "assets/Home/Images/aqau_lock_valve_system_idea.jpeg"
    },
    {
      title: "IIT Bombay Eureka Junior",
      date: "National Qualifier",
      summary: "Selected among top junior teams for presenting viable social entrepreneurship models solving local civic challenges.",
      badge: "National Finalist",
      image: "assets/Home/Images/exhibition.jpg"
    },
    {
      title: "University of Melbourne Competition",
      date: "Global Academic Challenge",
      summary: "International competition entry highlighting intercultural collaborative research and critical inquiry.",
      badge: "International Honor",
      image: "assets/Home/Images/university_fair.jpg"
    },
    {
      title: "IGBC Green Building Challenge",
      date: "State Chapter",
      summary: "Students designed campus carbon-reduction and sustainable waste recycling strategies, winning state recognition.",
      badge: "Sustainability Excellence",
      image: "assets/Home/Images/solar_energy_activity.jpg"
    },
    {
      title: "Katha Utsav Creative Writing",
      date: "Literary Festival",
      summary: "Original student poetry and creative prose recognized for vivid emotional expression and literary artistry.",
      badge: "Literary Excellence",
      image: "assets/Home/Images/junior_class_pledge_board.jpeg"
    },
    {
      title: "Kalakriti Fine Arts Festival",
      date: "Inter-School Arts",
      summary: "Students swept top honors across watercolor landscapes, acrylic compositions, and sculptural installations.",
      badge: "Best Art Delegation",
      image: "assets/Home/Images/painting_activity.jpg"
    }
  ];

  // D. Student Newsletter (The Robin)
  const newsletterData = [
    {
      issue: "Issue 05",
      date: "Winter Term 2026",
      theme: "Science & Innovation",
      title: "Innovations in Science & Student Voices",
      summary: "Exploring student-led robotics prototypes, AI learning exhibits, and peer research columns.",
      icon: "atom",
      colorClass: "issue-theme-science"
    },
    {
      issue: "Issue 04",
      date: "Autumn Term 2025",
      theme: "Sports & Culture",
      title: "Sports Triumphs & Cultural Chronicles",
      summary: "Celebrating district basketball championship gold, inter-house dance showcases, and heritage week.",
      icon: "trophy",
      colorClass: "issue-theme-sports"
    },
    {
      issue: "Issue 03",
      date: "Monsoon Edition 2025",
      theme: "Eco & Robotics",
      title: "Environmental Action & Robotics Lab Highlights",
      summary: "Spotlighting campus carbon audits, rainwater harvesting designs, and national ideathon finalists.",
      icon: "leaf",
      colorClass: "issue-theme-eco"
    },
    {
      issue: "Issue 02",
      date: "Summer Edition 2025",
      theme: "Literature & Arts",
      title: "Creative Literature, Artistry & Academic Honors",
      summary: "An anthology of original student poetry, fine arts gallery winners, and CBSE board merit achievers.",
      icon: "palette",
      colorClass: "issue-theme-arts"
    },
    {
      issue: "Issue 01",
      date: "Inaugural Edition 2024",
      theme: "Pedagogy & Vision",
      title: "Welcoming 21st Century Pedagogy at Brainz",
      summary: "Foundational publication outlining student council leadership charters, campus values, and future horizons.",
      icon: "compass",
      colorClass: "issue-theme-inaugural"
    }
  ];

  // E. Founder's Day Awards
  const awardsData = [
    { title: "Student of the Year", recipient: "Annual Excellence Roll", desc: "Conferred upon the student exemplifying scholastic distinction, exemplary discipline, community leadership, and sporting spirit." },
    { title: "Investiture Ceremony", recipient: "Prefectorial Board & House Captains", desc: "Formal installation of the Student Council body entrusted with campus governance, discipline, peer mentorship, and house activities." },
    { title: "Birth Anniversary of Mr Rajiv Goyal", recipient: "Founder's Commemoration Awards", desc: "Special assembly honoring the visionary founder Late Shri Rajiv Goyal through merit scholarships, certificates of honour, and community service." }
  ];

  // F. Professional Development Timeline
  const trainingData = [
    { title: "CBSE Hindi Training", desc: "Pedagogical alignment with updated CBSE guidelines, enhancing student linguistic proficiency, grammar drills, and experiential literature modules." },
    { title: "AI in Education", desc: "Faculty masterclass on integrating responsible AI, adaptive learning tools, and digital assessments to tailor instruction to individual learner paces." },
    { title: "Belongingness & Inclusive Classrooms", desc: "Socio-emotional wellbeing symposium dedicated to cultivating a welcoming, nurturing environment where every child feels recognized and valued." },
    { title: "SMART Lesson Planning", desc: "Interactive workshop focusing on specific, measurable, achievable, relevant, and time-bound instructional designs to elevate student comprehension." },
    { title: "Project Based Learning (PBL)", desc: "Hands-on pedagogy training empowering students to master STEAM concepts through inquiry-driven research, collaboration, and real-world problem solving." },
    { title: "Google Applications for Education", desc: "Comprehensive certification course on Google Workspace for Education, Google Classroom, Forms, and collaborative Docs for paperless workflows." },
    { title: "Canva Digital Design Workshop", desc: "Creative visual design masterclass for educators to build engaging visual presentations, multimedia infographics, and dynamic digital learning aids." },
    { title: "Experiential Science Workshop", desc: "Lab safety protocols, inquiry-driven experiment design, and experiential scientific demonstrations aligned with national STEM curriculum guidelines." },
    { title: "Tata Class Edge Technology", desc: "Effective deployment of interactive digital whiteboards, 3D animated simulations, and mapped multimedia assets for classroom concept clarity." },
    { title: "Foundational Phonics & Literacy", desc: "Early childhood foundational literacy module emphasizing phonetic awareness, blending techniques, and progressive reading competence for pre-primary learners." }
  ];

  // G. Teacher Certifications
  const certificationsData = [
    { title: "Google Certified Educator Level 1", count: "25+ Educators", icon: "award" },
    { title: "Google Certified Educator Level 2", count: "12+ Educators", icon: "shield" },
    { title: "British Council Core Skills", count: "Certified Faculty", icon: "globe" },
    { title: "CBSE Master Trainer Accreditation", count: "Accredited Mentors", icon: "check-circle" }
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
          <span style="display:inline-flex; align-items:center; gap:5px; font-size:0.8rem; font-weight:600; color:var(--color-primary); margin-top:0.75rem;"><i data-lucide="check-circle-2" style="width:14px;height:14px;"></i> Campus Archive Event</span>
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
      <article class="issue-card fade-up-element visible spotlight-card ${item.colorClass}">
        <div class="issue-cover-mock ${item.colorClass}">
          <div class="issue-cover-header">
            <span class="issue-pub-tag">BRAINZ EDITORIAL</span>
            <span class="issue-badge">${item.issue}</span>
          </div>
          <div class="issue-cover-body">
            <div class="issue-cover-motif"><i data-lucide="${item.icon}"></i></div>
            <h4 class="issue-cover-title">THE ROBIN</h4>
            <span class="issue-cover-theme">${item.theme}</span>
          </div>
          <div class="issue-cover-footer">
            <span class="issue-date-tag">${item.date}</span>
            <span class="issue-vol">Vol. ${item.issue.replace('Issue ', '')}</span>
          </div>
        </div>
        <div class="issue-details">
          <div class="issue-meta-row">
            <span class="issue-date">${item.date}</span>
            <span class="issue-theme-pill">${item.theme}</span>
          </div>
          <h3 class="issue-title">${item.title}</h3>
          <p class="issue-desc">${item.summary}</p>
          <div class="issue-footer-action">
            <span class="issue-library-pill">
              <i data-lucide="book-marked"></i>
              <span>Available in Campus Library</span>
            </span>
          </div>
        </div>
      </article>
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
        <div class="cert-count-badge">${item.count}</div>
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

  // Create all dynamic Lucide icons
  if (window.lucide && window.lucide.createIcons) {
    window.lucide.createIcons();
  }

  // Attach search event listeners
  if (searchInput) searchInput.addEventListener('input', () => {
    renderCelebrations();
    if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
  });
  if (filterCategory) filterCategory.addEventListener('change', () => {
    renderCelebrations();
    if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
  });
  if (filterYear) filterYear.addEventListener('change', () => {
    renderCelebrations();
    if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
  });


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
        const offsetTop = targetSection.offsetTop - 145;
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

/**
 * Brainz Edu World - Live Admissions Status Controller & Hydration System
 * Synchronizes Admissions Open/Closed state in real-time across the website.
 * Data flow: Supabase Cloud Database -> data/admissions.json -> localStorage cache.
 */

(function () {
  const SUPABASE_URL = "https://zywgmcmsgirdazrtkhlk.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5d2dtY21zZ2lyZGF6cnRraGxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNTg3NTQsImV4cCI6MjEwNTgzNDc1NH0.40XvGIbRKrGvP3okpgUJLf-Y1VPQAr80zP0tJ8cRg0A";

  const STORAGE_KEY = 'brainz_admissions_status';

  // Default baseline configuration
  const defaultStatus = {
    isOpen: true,
    session: "2026–27",
    gradeRange: "Pre-Primary to Grade XI",
    notice: "Registrations and interactive admissions are now open for Pre-Primary up to Grade XI. Secure your child's future today.",
    closedNotice: "Admissions for the current academic session are now closed. You may submit an inquiry or join the waitlist for the upcoming academic year.",
    updatedAt: new Date().toISOString()
  };

  function getLocalStatus() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Object.assign({}, defaultStatus, parsed);
      }
    } catch (e) {
      console.warn("[Admissions Status] Could not read from localStorage:", e);
    }
    return defaultStatus;
  }

  function applyAdmissionsUI(status) {
    if (!status) return;
    const isOpen = Boolean(status.isOpen);
    const session = status.session || "2026–27";
    const gradeRange = status.gradeRange || "Pre-Primary to Grade XI";
    const notice = isOpen
      ? (status.notice || defaultStatus.notice)
      : (status.closedNotice || defaultStatus.closedNotice);

    // 1. Update explicit data-admissions attributes
    document.querySelectorAll('[data-admissions="badge"]').forEach(badge => {
      badge.textContent = isOpen ? `Admissions Open (${session})` : `Admissions Closed (${session})`;
      badge.classList.toggle('status-badge-open', isOpen);
      badge.classList.toggle('status-badge-closed', !isOpen);
    });

    document.querySelectorAll('[data-admissions="session"]').forEach(el => {
      el.textContent = session;
    });

    document.querySelectorAll('[data-admissions="notice"]').forEach(el => {
      el.textContent = notice;
    });

    // 2. Navbar CTA Buttons (#nav-apply-btn, .nav-apply-btn)
    const applyButtons = document.querySelectorAll('#nav-apply-btn, .nav-apply-btn, [data-admissions="apply-btn"]');
    applyButtons.forEach(btn => {
      if (isOpen) {
        btn.textContent = "Apply Now";
        btn.setAttribute('href', 'admissions.html');
        btn.classList.add('btn-accent');
        btn.classList.remove('btn-outline-dark', 'btn-closed');
      } else {
        btn.textContent = "Inquire / Waitlist";
        btn.setAttribute('href', 'admissions.html#inquiry-form-section');
        btn.classList.remove('btn-accent');
        btn.classList.add('btn-outline-dark');
      }
    });

    // 3. Admissions Page Hero Badge & Status Card (#status-card-section)
    const admHeroBadge = document.querySelector('.admissions-hero .hero-badge');
    if (admHeroBadge) {
      admHeroBadge.textContent = isOpen ? `Admissions ${session}` : `Admissions Closed (${session})`;
      if (!isOpen) {
        admHeroBadge.style.background = 'rgba(239, 68, 68, 0.2)';
        admHeroBadge.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        admHeroBadge.style.color = '#FCA5A5';
      } else {
        admHeroBadge.style.background = '';
        admHeroBadge.style.borderColor = '';
        admHeroBadge.style.color = '';
      }
    }

    const statusSection = document.getElementById('status-card-section');
    if (statusSection) {
      const card = statusSection.querySelector('.status-card');
      const iconBox = statusSection.querySelector('.status-icon-box');
      const heading = statusSection.querySelector('.status-content h3');
      const desc = statusSection.querySelector('.status-content p');

      if (card && heading && desc) {
        if (isOpen) {
          card.style.borderLeft = '4px solid #10b981';
          if (iconBox) {
            iconBox.style.background = 'rgba(16, 185, 129, 0.15)';
            iconBox.style.color = '#059669';
            iconBox.innerHTML = '<i data-lucide="check-circle-2" style="width: 22px; height: 22px;"></i>';
          }
          heading.style.color = '#065f46';
          heading.textContent = `Admissions Open (Session ${session})`;
          desc.textContent = notice;
        } else {
          card.style.borderLeft = '4px solid #ef4444';
          if (iconBox) {
            iconBox.style.background = 'rgba(239, 68, 68, 0.15)';
            iconBox.style.color = '#dc2626';
            iconBox.innerHTML = '<i data-lucide="alert-circle" style="width: 22px; height: 22px;"></i>';
          }
          heading.style.color = '#991b1b';
          heading.textContent = `Admissions Closed (Session ${session})`;
          desc.textContent = notice;
        }
        if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
      }
    }

    // 4. Admissions Page Inquiry Form (#admission-enquiry-form / #inquiry-form)
    const admForm = document.getElementById('admission-enquiry-form') || document.getElementById('inquiry-form');
    if (admForm) {
      const submitBtn = admForm.querySelector('button[type="submit"]');
      const formSubtitle = document.querySelector('#inquiry-form-section .admission-form-header .section-subtitle, #inquiry-form-section .section-subtitle');
      const formHeading = document.querySelector('#inquiry-form-section .admission-form-header h2, #inquiry-form-section .inquiry-header h2, #inquiry-form-section h2');
      const formDesc = document.querySelector('#inquiry-form-section .admission-form-header p, #inquiry-form-section .inquiry-header p, #inquiry-form-section p');

      if (submitBtn) {
        submitBtn.innerHTML = isOpen
          ? '<i data-lucide="send" style="width: 16px; height: 16px; margin-right: 6px; vertical-align: middle;"></i> Submit Admission Application'
          : '<i data-lucide="clipboard-list" style="width: 16px; height: 16px; margin-right: 6px; vertical-align: middle;"></i> Submit Waitlist Inquiry';
      }
      if (formSubtitle) {
        formSubtitle.textContent = isOpen ? `Admissions ${session}` : `Admissions Closed (${session})`;
      }
      if (formHeading) {
        formHeading.textContent = isOpen ? "Apply For Admission" : "Admissions Waitlist & Inquiry";
      }
      if (formDesc) {
        formDesc.textContent = isOpen
          ? `Fill out the form below to begin the admissions journey for Session ${session} (${gradeRange}). Our admissions office will reach out within 24 working hours.`
          : `Applications for Session ${session} are currently at capacity. Submit your inquiry below to join the waitlist for the upcoming academic session.`;
      }
      if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
    }

    // 5. Call To Action Banners (.cta-section, .contact-cta-section)
    document.querySelectorAll('.cta-section').forEach(cta => {
      const title = cta.querySelector('h2');
      const subtitle = cta.querySelector('.section-subtitle');
      const desc = cta.querySelector('p');
      const applyBtn = cta.querySelector('.cta-actions .btn-accent, .cta-actions a:first-child');

      if (subtitle) {
        subtitle.textContent = isOpen ? "Join The Brainz Family" : "Admissions Update";
      }
      if (desc && !desc.getAttribute('data-static')) {
        desc.textContent = isOpen
          ? `Admissions are now open for the upcoming academic session (${session}) from Pre-Primary through Senior Secondary Grade XII.`
          : `Admissions for Session ${session} are currently at capacity. Inquiries for the upcoming session are welcome.`;
      }
      if (applyBtn) {
        applyBtn.textContent = isOpen ? "Apply for Admission" : "Inquire / Waitlist";
      }
    });
  }

  // 1. Instant render from cached state
  const cachedStatus = getLocalStatus();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyAdmissionsUI(cachedStatus));
  } else {
    applyAdmissionsUI(cachedStatus);
  }

  // 2. Asynchronous live hydration from Cloud (Supabase) & data/admissions.json
  async function hydrateLiveAdmissions() {
    let freshData = null;

    // A. Check Supabase site_settings table
    if (typeof window.supabase !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        const { data, error } = await client
          .from('site_settings')
          .select('value')
          .eq('key', 'admissions')
          .single();

        if (!error && data && data.value) {
          freshData = data.value;
        }

        // Subscribe to real-time database broadcast
        try {
          client
            .channel('site_settings_admissions')
            .on('postgres_changes', {
              event: '*',
              schema: 'public',
              table: 'site_settings',
              filter: 'key=eq.admissions'
            }, payload => {
              if (payload.new && payload.new.value) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(payload.new.value));
                applyAdmissionsUI(payload.new.value);
              }
            })
            .subscribe();
        } catch (subErr) {
          // Non-blocking
        }
      } catch (err) {
        console.warn("[Admissions Status] Supabase fetch error:", err);
      }
    }

    // B. Fallback to data/admissions.json if Supabase gave no data
    if (!freshData) {
      try {
        const res = await fetch('data/admissions.json?t=' + Date.now());
        if (res.ok) {
          freshData = await res.json();
        }
      } catch (fetchErr) {
        // Fallback remains on cachedStatus
      }
    }

    // C. Apply fresh data and update cache
    if (freshData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(freshData));
      applyAdmissionsUI(freshData);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrateLiveAdmissions);
  } else {
    hydrateLiveAdmissions();
  }

  // Global helper API
  window.BrainzAdmissions = {
    getStatus: getLocalStatus,
    applyUI: applyAdmissionsUI,
    hydrate: hydrateLiveAdmissions
  };
})();

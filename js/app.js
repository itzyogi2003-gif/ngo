/**
 * HIND RAKSHA SAMITI (हिंद रक्षा समिति)
 * Main Interactive Application Logic
 * Bilingual, Themeable, Dynamic NGO Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Language Toggle System (English / Hindi)
  initLanguageSwitcher();

  // 2. Dark/Light Theme System
  initThemeSwitcher();

  // 3. Mobile Navigation Drawer
  initMobileNav();

  // 4. Animated Impact Numbers
  initImpactCounters();

  // 5. Multi-Sector Filtering System
  initSectorFilter();

  // 6. SOS Incident Reporting Engine
  initIncidentReporting();

  // 8. Donation Calculator & 80G Receipt System
  initDonationCalculator();

  // 9. Event RSVP System
  initEventRSVP();

  // 10. Volunteer Modal System
  initVolunteerModal();

  // 11. FAQ Accordion
  initFaqAccordion();
});

/* ==========================================================================
   1. BILINGUAL LANGUAGE SWITCHER
   ========================================================================== */
function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.lang-btn');
  let currentLang = localStorage.getItem('hrs_lang') || 'en';

  setLanguage(currentLang);

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.lang;
      if (selected !== currentLang) {
        currentLang = selected;
        localStorage.setItem('hrs_lang', currentLang);
        setLanguage(currentLang);
        showToast(currentLang === 'hi' ? 'भाषा बदलकर हिन्दी कर दी गई है' : 'Language switched to English');
      }
    });
  });

  function setLanguage(lang) {
    document.documentElement.lang = lang;
    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    const translatableElements = document.querySelectorAll('[data-en]');
    translatableElements.forEach(el => {
      const text = lang === 'hi' ? (el.getAttribute('data-hi') || el.getAttribute('data-en')) : el.getAttribute('data-en');
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.innerHTML = text;
      }
    });
  }
}

/* ==========================================================================
   2. THEME SWITCHER (Dark/Light)
   ========================================================================== */
function initThemeSwitcher() {
  const themeBtn = document.getElementById('themeToggleBtn');
  let currentTheme = localStorage.getItem('hrs_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('hrs_theme', currentTheme);
      updateThemeIcon(currentTheme);
      showToast(currentTheme === 'dark' ? 'Dark theme enabled' : 'Light theme enabled');
    });
  }

  function updateThemeIcon(theme) {
    if (!themeBtn) return;
    themeBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    themeBtn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburger.innerHTML = navMenu.classList.contains('open') ? '✕' : '☰';
    });

    // Close when clicking nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.innerHTML = '☰';
      });
    });
  }
}

/* ==========================================================================
   4. IMPACT COUNTERS
   ========================================================================== */
function initImpactCounters() {
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const suffix = counter.getAttribute('data-suffix') || '+';
          let count = 0;
          const duration = 2000;
          const step = Math.ceil(target / (duration / 25));

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              counter.textContent = target.toLocaleString('en-IN') + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = count.toLocaleString('en-IN') + suffix;
            }
          }, 25);
        });
      }
    });
  }, { threshold: 0.2 });

  const statsSection = document.getElementById('statsTicker');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   5. MULTI-SECTOR FILTERING ENGINE
   ========================================================================== */
function initSectorFilter() {
  const filterBtns = document.querySelectorAll('.sector-filter-btn');
  const sectorCards = document.querySelectorAll('.sector-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      sectorCards.forEach(card => {
        if (filter === 'all' || card.dataset.sectorCategory === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}



/* ==========================================================================
   6. INCIDENT SOS REPORTING ENGINE
   ========================================================================== */
function initIncidentReporting() {
  const form = document.getElementById('sosForm');
  const fileInput = document.getElementById('sosFileInput');
  const dropArea = document.getElementById('sosDropArea');
  const previewWrap = document.getElementById('sosPreviewWrap');
  const fileNameDisplay = document.getElementById('sosFileName');

  if (dropArea && fileInput) {
    dropArea.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
        previewWrap.classList.add('active');
      }
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropArea.style.borderColor = 'var(--saffron-500)';
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropArea.style.borderColor = 'var(--border-subtle)';
      });
    });

    dropArea.addEventListener('drop', (e) => {
      if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        fileNameDisplay.textContent = fileInput.files[0].name;
        previewWrap.classList.add('active');
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = document.getElementById('sosType').value;
      const location = document.getElementById('sosLocation').value;
      const desc = document.getElementById('sosDesc').value;
      const phone = document.getElementById('sosPhone').value;

      if (!location || !phone) {
        showToast('Please provide location and contact phone number', 'error');
        return;
      }

      // Generate Ticket
      const ticketId = 'HRS-SOS-' + Math.floor(100000 + Math.random() * 900000);
      
      openModal(`
        <div class="text-center">
          <div style="font-size:3rem; margin-bottom:12px;">🚨</div>
          <h3 style="font-size:1.8rem; margin-bottom:8px; color:var(--saffron-500);">Incident Dispatched!</h3>
          <p style="color:var(--text-secondary); margin-bottom:20px;">
            Your report has been logged into the Hind Raksha Samiti emergency response dispatch system.
          </p>
          <div style="background:rgba(255,255,255,0.05); padding:16px; border-radius:12px; margin-bottom:20px; text-align:left;">
            <p><strong>Tracking Ticket:</strong> <span style="color:var(--emerald-400); font-family:monospace; font-weight:700;">#${ticketId}</span></p>
            <p><strong>Category:</strong> ${type}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Contact Verified:</strong> +91 ${phone}</p>
            <p><strong>Dispatch Unit:</strong> Nearest Chapter Rapid Response Team Alerted</p>
          </div>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:24px;">
            Our volunteer coordinator in your region will call you shortly. For immediate life-saving support, call <strong>+91 98765 43210</strong>.
          </p>
          <button class="btn btn-primary" onclick="closeModal()">Close & Track Ticket</button>
        </div>
      `);

      form.reset();
      if (previewWrap) previewWrap.classList.remove('active');
      showToast(`Emergency Ticket #${ticketId} registered successfully!`);
    });
  }
}

/* ==========================================================================
   7. DONATION & 80G RECEIPT GENERATION
   ========================================================================== */
function initDonationCalculator() {
  const freqBtns = document.querySelectorAll('.freq-btn');
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customInput = document.getElementById('customAmountInput');
  const impactText = document.getElementById('impactOutcomeText');
  const impactIcon = document.getElementById('impactOutcomeIcon');
  const donateSubmitBtn = document.getElementById('donateSubmitBtn');

  let currentAmount = 1000;
  let currentFreq = 'one-time';

  freqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      freqBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFreq = btn.dataset.freq;
      updateImpactDescription();
    });
  });

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentAmount = parseInt(btn.dataset.amount, 10);
      if (customInput) customInput.value = '';
      updateImpactDescription();
    });
  });

  if (customInput) {
    customInput.addEventListener('input', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
      const val = parseInt(customInput.value, 10);
      currentAmount = isNaN(val) || val <= 0 ? 0 : val;
      updateImpactDescription();
    });
  }

  function updateImpactDescription() {
    if (!impactText) return;

    if (currentAmount < 500) {
      impactIcon.textContent = '🌱';
      impactText.innerHTML = `<strong>Community Support:</strong> Contributes directly to emergency veterinary first-aid and bird water-feeders across public parks.`;
    } else if (currentAmount >= 500 && currentAmount < 1000) {
      impactIcon.textContent = '🐾';
      impactText.innerHTML = `<strong>Animal First Aid Kit:</strong> Covers life-saving anti-rabies vaccines, wound dressing, and antibiotics for <strong>2 injured street animals</strong>.`;
    } else if (currentAmount >= 1000 && currentAmount < 2500) {
      impactIcon.textContent = '🌳';
      impactText.innerHTML = `<strong>5 Native Peepal/Neem Trees:</strong> Funds procurement of 5 native climate-resilient saplings, protective tree guards, and 12-month organic nourishment.`;
    } else if (currentAmount >= 2500 && currentAmount < 5000) {
      impactIcon.textContent = '🏛️';
      impactText.innerHTML = `<strong>Heritage Cleanup & Restoration Gear:</strong> Funds non-destructive natural stone cleaning supplies, protective dust masks, and safety gear for a full monument preservation camp.`;
    } else {
      impactIcon.textContent = '🚑';
      impactText.innerHTML = `<strong>Mobile Ambulance & Wildlife Rescue Patrol:</strong> Sustains fuel, medical supplies, and on-call veterinary crew for a full week of emergency calls.`;
    }
  }

  if (donateSubmitBtn) {
    donateSubmitBtn.addEventListener('click', () => {
      const donationVal = currentAmount > 0 ? currentAmount : 1000;
      const receiptNo = 'HRS-80G-' + Math.floor(10000 + Math.random() * 90000);
      const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

      openModal(`
        <div class="text-center">
          <div style="font-size:2.5rem; margin-bottom:10px;">🙏</div>
          <h3 style="font-size:1.6rem; margin-bottom:4px; color:var(--saffron-500);">Complete Your Seva Contribution</h3>
          <p style="font-size:0.95rem; color:var(--text-secondary); margin-bottom:18px;">
            Pledge Amount: <strong style="font-size:1.3rem; color:#FFF;">₹${donationVal.toLocaleString('en-IN')}</strong> (${currentFreq === 'monthly' ? 'Monthly Supporter' : 'One-Time Contribution'})
          </p>

          <div class="upi-simulation-box" style="margin-bottom:20px; text-align:left;">
            <div class="qr-code-placeholder">
              <svg viewBox="0 0 100 100" width="70" height="70" style="background:#fff;">
                <rect width="100" height="100" fill="#fff"/>
                <rect x="10" y="10" width="30" height="30" fill="#000"/>
                <rect x="15" y="15" width="20" height="20" fill="#fff"/>
                <rect x="20" y="20" width="10" height="10" fill="#000"/>
                <rect x="60" y="10" width="30" height="30" fill="#000"/>
                <rect x="65" y="15" width="20" height="20" fill="#fff"/>
                <rect x="70" y="20" width="10" height="10" fill="#000"/>
                <rect x="10" y="60" width="30" height="30" fill="#000"/>
                <rect x="15" y="65" width="20" height="20" fill="#fff"/>
                <rect x="20" y="70" width="10" height="10" fill="#000"/>
                <circle cx="50" cy="50" r="10" fill="#F59E0B"/>
              </svg>
            </div>
            <div class="upi-text" style="flex:1;">
              <h6>Scan using any UPI App (GPay / PhonePe / Paytm)</h6>
              <div class="upi-id">hindraksha@sbi</div>
              <button class="btn btn-sm btn-outline" style="margin-top:6px; padding:4px 12px;" onclick="copyUpiId()">Copy UPI ID</button>
            </div>
          </div>

          <div class="receipt-card">
            <div class="receipt-header">
              <h5 style="margin:0; font-family:'Cinzel', serif;">HIND RAKSHA SAMITI</h5>
              <div style="font-size:0.75rem; color:#64748B;">PROVISIONAL SECTION 80G TAX EXEMPTION RECEIPT</div>
            </div>
            <table class="receipt-table">
              <tr>
                <td>Receipt No:</td>
                <td>#${receiptNo}</td>
              </tr>
              <tr>
                <td>Date of Issuance:</td>
                <td>${today}</td>
              </tr>
              <tr>
                <td>Contribution Amount:</td>
                <td>₹${donationVal.toLocaleString('en-IN')} (Eligible for 50% Tax Deduction)</td>
              </tr>
              <tr>
                <td>Statutory Exemption:</td>
                <td>Section 80G of Income Tax Act, 1961</td>
              </tr>
            </table>
            <div style="font-size:0.75rem; color:#64748B; text-align:center;">
              Official 80G Certificate will be emailed to your registered address upon UPI clearance.
            </div>
          </div>

          <div style="display:flex; gap:12px; margin-top:20px; justify-content:center;">
            <button class="btn btn-primary" onclick="simulatePaymentSuccess('${receiptNo}')">Confirm Contribution</button>
            <button class="btn btn-outline" onclick="closeModal()">Close</button>
          </div>
        </div>
      `);
    });
  }

  // Trigger default
  updateImpactDescription();
}

window.copyUpiId = function() {
  navigator.clipboard.writeText('hindraksha@sbi').then(() => {
    showToast('UPI ID copied to clipboard: hindraksha@sbi');
  }).catch(() => {
    showToast('UPI ID: hindraksha@sbi');
  });
};

window.simulatePaymentSuccess = function(receiptNo) {
  closeModal();
  showToast(`Dhanyawad! Contribution acknowledged. Receipt #${receiptNo} dispatched.`);
};

/* ==========================================================================
   8. EVENT RSVP SYSTEM
   ========================================================================== */
function initEventRSVP() {
  const rsvpBtns = document.querySelectorAll('.event-rsvp-btn');
  rsvpBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.dataset.eventTitle || 'Community Drive';
      const date = btn.dataset.eventDate || 'Upcoming Weekend';

      openModal(`
        <div class="text-center">
          <div style="font-size:2.5rem; margin-bottom:12px;">🌿</div>
          <h3 style="font-size:1.6rem; margin-bottom:6px; color:var(--saffron-500);">Volunteer Drive Registration</h3>
          <p style="color:var(--text-secondary); margin-bottom:18px;">
            You are registering for: <strong>${title}</strong><br>
            <span style="color:var(--emerald-400); font-weight:600;">🗓️ ${date}</span>
          </p>

          <form id="rsvpForm" onsubmit="handleEventRsvp(event, '${title}')" style="display:flex; flex-direction:column; gap:14px; text-align:left;">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-control" required placeholder="e.g. Aarav Sharma">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">WhatsApp Mobile</label>
                <input type="tel" class="form-control" required placeholder="e.g. 9876543210">
              </div>
              <div class="form-group">
                <label class="form-label">City / Chapter</label>
                <input type="text" class="form-control" required placeholder="e.g. Gurugram / Delhi">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Will you bring any equipment?</label>
              <select class="form-control">
                <option>None (I will use community kits)</option>
                <option>Gardening tools / watering bucket</option>
                <option>Stray animal carrier / leash</option>
                <option>Camera / photography gear</option>
              </select>
            </div>
            <div style="display:flex; gap:12px; margin-top:10px;">
              <button type="submit" class="btn btn-primary" style="flex:1;">Confirm RSVP & Get Pass</button>
              <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
            </div>
          </form>
        </div>
      `);
    });
  });
}

window.handleEventRsvp = function(e, title) {
  e.preventDefault();
  closeModal();
  const passId = 'HRS-PASS-' + Math.floor(1000 + Math.random() * 9000);
  showToast(`Registration Confirmed for "${title}"! Entry Pass #${passId} sent via WhatsApp.`);
};

/* ==========================================================================
   9. VOLUNTEER ONBOARDING MODAL SYSTEM
   ========================================================================== */
function initVolunteerModal() {
  const volunteerTriggers = document.querySelectorAll('.open-volunteer-modal');
  volunteerTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(`
        <div>
          <div class="text-center" style="margin-bottom:20px;">
            <div class="section-badge">Join the movement</div>
            <h3 style="font-size:1.8rem; color:#FFF; margin-bottom:6px;">Become a Rashtriya Sevak</h3>
            <p style="color:var(--text-secondary); font-size:0.95rem;">
              Protect Animals • Preserve Nature • Safeguard Heritage
            </p>
          </div>

          <form id="volunteerForm" onsubmit="handleVolunteerSubmit(event)" style="display:flex; flex-direction:column; gap:16px;">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" id="volName" class="form-control" required placeholder="Your full name">
              </div>
              <div class="form-group">
                <label class="form-label">Phone / WhatsApp</label>
                <input type="tel" id="volPhone" class="form-control" required placeholder="+91 98765 43210">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" id="volEmail" class="form-control" required placeholder="name@example.com">
              </div>
              <div class="form-group">
                <label class="form-label">City & State</label>
                <input type="text" id="volCity" class="form-control" required placeholder="e.g. Rohtak, Haryana">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Select Seva Wing / Sector of Interest</label>
              <select id="volPillar" class="form-control">
                <option value="All Key Sectors">All Key Sectors (General Rashtriya Sevak)</option>
                <option value="Animal Welfare & Rescue">🐾 Animal Welfare & Rescue Patrol (जीव रक्षा)</option>
                <option value="Nature & Native Forestry">🌱 Nature & Native Forest Conservation (पर्यावरण एवं वृक्षारोपण)</option>
                <option value="Historical Heritage & Monuments">🏛️ Historical Heritage & Monument Preservation (धरोहर संरक्षण)</option>
                <option value="Water Conservation & Stepwells">💧 Water Rejuvenation & Stepwell Restoration (जल संरक्षण)</option>
                <option value="Youth Leadership & Nation Building">🚩 Youth Leadership & Community Seva (युवा नेतृत्व)</option>
                <option value="Culture & Traditional Arts">🎨 Cultural Preservation & Folk Traditions (संस्कृति एवं कला)</option>
                <option value="Legal, RTI & Compliance">⚖️ Legal, RTI & Statutory Compliance (विधिक एवं अनुसंधान)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Weekly Hours Available</label>
              <select class="form-control">
                <option>2–4 hours (Weekend Drives)</option>
                <option>5–10 hours (Active Volunteer)</option>
                <option>10+ hours (Chapter Lead / Core Member)</option>
              </select>
            </div>

            <div style="display:flex; gap:12px; margin-top:10px;">
              <button type="submit" class="btn btn-emerald" style="flex:1;">Submit Volunteer Enrollment</button>
              <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
            </div>
          </form>
        </div>
      `);
    });
  });
}

window.handleVolunteerSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('volName').value || 'Friend';
  const pillar = document.getElementById('volPillar').value;
  const volId = 'HRS-VOL-' + Math.floor(1000 + Math.random() * 9000);

  openModal(`
    <div class="text-center">
      <div style="font-size:3rem; margin-bottom:10px;">🇮🇳</div>
      <h3 style="font-size:1.8rem; color:var(--saffron-500); margin-bottom:6px;">Welcome to Hind Raksha Samiti!</h3>
      <p style="color:var(--text-secondary); margin-bottom:20px;">
        Dhanyawad <strong>${name}</strong> for standing up for India's voiceless animals, lush nature, and priceless heritage.
      </p>

      <div style="background:linear-gradient(135deg, rgba(6,78,59,0.4) 0%, rgba(15,31,26,0.8) 100%); border:1px solid var(--border-glow); border-radius:16px; padding:20px; margin-bottom:20px; text-align:left;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:8px;">
          <strong style="color:var(--saffron-500); font-family:'Cinzel', serif;">HIND RAKSHA SAMITI</strong>
          <span style="font-size:0.75rem; background:var(--emerald-500); color:#000; padding:2px 8px; border-radius:12px; font-weight:700;">ACTIVE SEVAK</span>
        </div>
        <p><strong>Volunteer ID:</strong> <span style="font-family:monospace; color:var(--text-highlight); font-weight:700;">#${volId}</span></p>
        <p><strong>Seva Wing:</strong> ${pillar}</p>
        <p><strong>Status:</strong> Digital Onboarding Kit & WhatsApp Chapter Link Dispatched</p>
      </div>

      <button class="btn btn-primary" onclick="closeModal()">Complete Registration</button>
    </div>
  `);

  showToast(`Volunteer Registration Confirmed! ID: #${volId}`);
};

/* ==========================================================================
   10. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });
}

/* ==========================================================================
   MODAL & TOAST UTILITIES
   ========================================================================== */
window.openModal = function(contentHtml) {
  let modalOverlay = document.getElementById('globalModalOverlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'globalModalOverlay';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
      <div class="modal-card">
        <button class="modal-close-btn" onclick="closeModal()">✕</button>
        <div id="modalDynamicBody"></div>
      </div>
    `;
    document.body.appendChild(modalOverlay);

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  const modalBody = document.getElementById('modalDynamicBody');
  modalBody.innerHTML = contentHtml;
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
  const modalOverlay = document.getElementById('globalModalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.showToast = function(msg, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color:${type === 'error' ? '#EF4444' : 'var(--saffron-500)'}; font-size:1.1rem;">
      ${type === 'error' ? '⚠️' : '🔔'}
    </span>
    <span>${msg}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

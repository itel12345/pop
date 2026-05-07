(function() {
    // ----- PUPPY DATA (CHANGE IMAGES HERE!) -----
    const puppies = [
      {
        id: 1,
        name: "Bella",
        breed: "Golden Retriever",
        age: "3 months",
        ageMonths: 3,
        gender: "Female",
        fee: "$450",
        description: "Friendly, playful and great with kids. Loves belly rubs and fetch.",
        health: "Vaccinated, dewormed, microchipped",
        personality: "Outgoing, affectionate, eager to please",
        comesWith: "Starter food pack, blanket, toy, care guide",
        // ✅ CHANGE IMAGE: Put your real image URL here
        photo: "https://placehold.co/400x400/f9c79a/5e3e1c?text=Bella",
        // ✅ Add a video URL if available (or leave empty string)
        videoUrl: ""
      },
      {
        id: 2,
        name: "Max",
        breed: "German Shepherd",
        age: "4 months",
        ageMonths: 4,
        gender: "Male",
        fee: "$550",
        description: "Loyal, smart and protective. Already knows sit, stay, and come.",
        health: "Fully vaccinated, neutered, microchipped",
        personality: "Confident, calm, highly trainable",
        comesWith: "Leash, collar, training guide, toy",
        photo: "https://placehold.co/400x400/d9a066/3e2c1b?text=Max",
        videoUrl: ""
      },
      {
        id: 3,
        name: "Luna",
        breed: "Poodle",
        age: "2.5 months",
        ageMonths: 2.5,
        gender: "Female",
        fee: "$600",
        description: "Curly, hypoallergenic and loves to cuddle. Perfect for apartments.",
        health: "Vaccinated, health certificate, microchipped",
        personality: "Gentle, playful, lap-dog energy",
        comesWith: "Grooming kit, small bed, toy, food samples",
        photo: "https://placehold.co/400x400/e6c9a8/4a3724?text=Luna",
        videoUrl: ""
      },
      {
        id: 4,
        name: "Buddy",
        breed: "Golden Retriever",
        age: "3.5 months",
        ageMonths: 3.5,
        gender: "Male",
        fee: "$475",
        description: "Energetic and loving. Great companion for active families.",
        health: "Vaccinated, dewormed, microchipped",
        personality: "Playful, loyal, loves water",
        comesWith: "Food pack, leash, chew toy, blanket",
        photo: "https://placehold.co/400x400/f0c78e/4a3724?text=Buddy",
        videoUrl: ""
      }
    ];

    const pages = {
      home: document.getElementById('homePage'),
      puppies: document.getElementById('puppiesPage'),
      detail: document.getElementById('detailPage'),
      faq: document.getElementById('faqPage'),
      testimonials: document.getElementById('testimonialsPage'),
      contact: document.getElementById('contactPage')
    };

    const navButtons = document.querySelectorAll('.nav-btn[data-page]');
    const viewPuppiesBtn = document.getElementById('viewPuppiesBtn');
    const backToPuppiesBtn = document.getElementById('backToPuppiesBtn');
    const puppyGrid = document.getElementById('puppyGrid');
    const detailContent = document.getElementById('detailContent');

    // ✅ FILTER ELEMENTS
    const filterBreed = document.getElementById('filterBreed');
    const filterGender = document.getElementById('filterGender');
    const filterAge = document.getElementById('filterAge');
    const filterSearch = document.getElementById('filterSearch');
    const filterReset = document.getElementById('filterReset');

    let currentFilters = { breed: '', gender: '', age: '', search: '' };

    function switchPage(pageId) {
      Object.values(pages).forEach(p => p?.classList.remove('active-page'));
      if (pages[pageId]) pages[pageId].classList.add('active-page');
      
      navButtons.forEach(btn => {
        const page = btn.getAttribute('data-page');
        if (page === pageId) {
          btn.classList.add('active');
          btn.setAttribute('aria-current', 'page');
        } else {
          btn.classList.remove('active');
          btn.removeAttribute('aria-current');
        }
      });

      if (pageId === 'puppies') {
        resetFilters();
        renderPuppyGrid();
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ✅ FILTER LOGIC
    function getFilteredPuppies() {
      return puppies.filter(pup => {
        if (currentFilters.breed && pup.breed !== currentFilters.breed) return false;
        if (currentFilters.gender && pup.gender !== currentFilters.gender) return false;
        if (currentFilters.age) {
          const ageThreshold = parseInt(currentFilters.age);
          if (ageThreshold === 2 && pup.ageMonths >= 3) return false;
          if (ageThreshold === 3 && (pup.ageMonths < 3 || pup.ageMonths >= 4)) return false;
          if (ageThreshold === 4 && pup.ageMonths < 4) return false;
        }
        if (currentFilters.search && !pup.name.toLowerCase().includes(currentFilters.search.toLowerCase()) && !pup.breed.toLowerCase().includes(currentFilters.search.toLowerCase())) return false;
        return true;
      });
    }

    function applyFilters() {
      currentFilters.breed = filterBreed?.value || '';
      currentFilters.gender = filterGender?.value || '';
      currentFilters.age = filterAge?.value || '';
      currentFilters.search = filterSearch?.value || '';
      renderPuppyGrid();
    }

    function resetFilters() {
      if (filterBreed) filterBreed.value = '';
      if (filterGender) filterGender.value = '';
      if (filterAge) filterAge.value = '';
      if (filterSearch) filterSearch.value = '';
      currentFilters = { breed: '', gender: '', age: '', search: '' };
      renderPuppyGrid();
    }

    if (filterBreed) filterBreed.addEventListener('change', applyFilters);
    if (filterGender) filterGender.addEventListener('change', applyFilters);
    if (filterAge) filterAge.addEventListener('change', applyFilters);
    if (filterSearch) filterSearch.addEventListener('input', applyFilters);
    if (filterReset) filterReset.addEventListener('click', resetFilters);

    // ✅ RENDER PUPPY GRID with image error fallback & video badge
    function renderPuppyGrid() {
      if (!puppyGrid) return;
      const filtered = getFilteredPuppies();
      
      if (filtered.length === 0) {
        puppyGrid.innerHTML = `<div class="no-results">🐾 No puppies match your filters. Try adjusting! <br><button class="filter-reset" style="margin-top:1rem;" onclick="document.getElementById('filterReset').click()">Reset Filters</button></div>`;
        return;
      }
      
      puppyGrid.innerHTML = filtered.map(pup => {
        const hasVideo = pup.videoUrl && pup.videoUrl.trim() !== '';
        return `
        <div class="puppy-card" data-puppy-id="${pup.id}" tabindex="0" role="button" aria-label="View details for ${pup.name}">
          <div class="puppy-video-thumb" data-video-url="${hasVideo ? pup.videoUrl : ''}">
            <img src="${pup.photo}" alt="${pup.name} the ${pup.breed}" loading="lazy" 
                 onerror="this.src='https://placehold.co/400x400/fadcc5/5e3e1c?text=${encodeURIComponent(pup.name)}'; this.classList.add('error-fallback')">
            ${hasVideo ? '<span class="play-icon-overlay">▶️</span>' : ''}
          </div>
          <div class="puppy-info">
            <h3>${pup.name}</h3>
            <span class="badge">${pup.breed}</span>
            ${hasVideo ? '<span class="badge video-badge">🎥 Video</span>' : ''}
            <p>🐾 ${pup.age} · ${pup.gender}</p>
            <p><strong>${pup.fee}</strong></p>
            <small>${pup.description}</small>
          </div>
        </div>
      `}).join('');

      // ✅ Click handlers for cards and video thumbnails
      document.querySelectorAll('.puppy-card').forEach(card => {
        card.addEventListener('click', (e) => {
          // Don't trigger detail if clicking the video play area specifically
          if (e.target.closest('.puppy-video-thumb') && e.target.closest('.puppy-video-thumb').dataset.videoUrl) {
            // Video click handled separately
          } else {
            const id = card.getAttribute('data-puppy-id');
            showPuppyDetail(id);
          }
        });
        
        // Keyboard accessibility
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const id = card.getAttribute('data-puppy-id');
            showPuppyDetail(id);
          }
        });
      });
      
      // ✅ Video thumbnail click
      document.querySelectorAll('.puppy-video-thumb[data-video-url]').forEach(thumb => {
        if (!thumb.dataset.videoUrl) return;
        thumb.addEventListener('click', (e) => {
          e.stopPropagation();
          openVideoModal(thumb.dataset.videoUrl);
        });
      });
    }

    // ✅ VIDEO MODAL
    const videoModal = document.getElementById('videoModal');
    const puppyVideo = document.getElementById('puppyVideo');
    const closeVideoModal = document.getElementById('closeVideoModal');

    function openVideoModal(videoUrl) {
      if (!videoUrl) return;
      puppyVideo.querySelector('source').src = videoUrl;
      puppyVideo.load();
      videoModal.classList.add('active');
      puppyVideo.play().catch(() => {});
    }

    function closeVideo() {
      videoModal.classList.remove('active');
      puppyVideo.pause();
      puppyVideo.querySelector('source').src = '';
    }

    if (closeVideoModal) closeVideoModal.addEventListener('click', closeVideo);
    if (videoModal) {
      videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) closeVideo();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) closeVideo();
    });

    // ✅ SHOW PUPPY DETAIL
    function showPuppyDetail(puppyId) {
      const pup = puppies.find(p => p.id == puppyId);
      if (!pup) return;
      
      switchPage('detail');
      
      if (detailContent) {
        const hasVideo = pup.videoUrl && pup.videoUrl.trim() !== '';
        detailContent.innerHTML = `
          <img src="${pup.photo}" alt="${pup.name}" class="detail-photo" style="width:100%; max-width:400px; border-radius:2.5rem;"
               onerror="this.src='https://placehold.co/400x400/fadcc5/5e3e1c?text=${encodeURIComponent(pup.name)}'">
          <div class="detail-content">
            <h2 style="font-size:2.5rem; color:#4b2e1a;">${pup.name}</h2>
            <p><strong>${pup.breed}</strong> · ${pup.age} · ${pup.gender}</p>
            <p style="font-size:1.8rem; font-weight:700; color:#b45f3a;">${pup.fee}</p>
            <p>✨ ${pup.description}</p>
            <hr style="margin:1rem 0; border-color:#f0dcc8;">
            <p>🩺 <strong>Health:</strong> ${pup.health}</p>
            <p>🧸 <strong>Personality:</strong> ${pup.personality}</p>
            <p>🎁 <strong>Comes with:</strong> ${pup.comesWith}</p>
            ${hasVideo ? `<button class="cta-button" style="background:#ff8c75; margin-bottom:0.5rem;" onclick="document.querySelector('[data-video-url=\\'${pup.videoUrl}\\']')?.click(); openVideoModalDirect('${pup.videoUrl}')">▶️ Watch ${pup.name}'s video</button>` : ''}
            <a href="https://wa.me/2330508437839?text=Hi%20I'm%20interested%20in%20adopting%20${encodeURIComponent(pup.name)}%20the%20${encodeURIComponent(pup.breed)}" target="_blank" rel="noopener" class="whatsapp-btn">
              💬 WhatsApp about ${pup.name}
            </a>
            <p><a href="tel:+2330508437839" style="color:#5e3e1c; min-height:44px; display:inline-block;">📞 Call now: (233) 0508437839</a></p>
          </div>
        `;
      }
    }

    // Helper for detail page video button
    window.openVideoModalDirect = function(videoUrl) {
      openVideoModal(videoUrl);
    };

    // ✅ FAQ ACCORDION
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isOpen = faqItem.classList.contains('open');
        
        // Close all others
        document.querySelectorAll('.faq-item.open').forEach(item => {
          item.classList.remove('open');
          item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        
        // Toggle current
        if (!isOpen) {
          faqItem.classList.add('open');
          question.setAttribute('aria-expanded', 'true');
        }
      });
      
      // Keyboard support
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });

    // ✅ FORM HANDLING with simulated backend (replace action URL with real Formspree/Web3Forms)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '⏳ Sending...';
        submitBtn.disabled = true;
        
        // Try Formspree submission (falls back to demo if URL not configured)
        const formAction = contactForm.getAttribute('action');
        if (formAction && !formAction.includes('your-form-id')) {
          try {
            const formData = new FormData(contactForm);
            const response = await fetch(formAction, {
              method: 'POST',
              body: formData,
              headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
              showFormStatus('success', '✅ Message sent! We\'ll contact you within minutes.');
              contactForm.reset();
            } else {
              throw new Error('Form submission failed');
            }
          } catch (err) {
            showFormStatus('error', '❌ Oops! Please try again or call us directly.');
          }
        } else {
          // Demo mode — simulate success
          await new Promise(resolve => setTimeout(resolve, 800));
          showFormStatus('success', '✅ Demo: Message received! (Connect Formspree for real submissions)');
          contactForm.reset();
        }
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        setTimeout(() => {
          if (formStatus) formStatus.style.display = 'none';
        }, 5000);
      });
    }
    
    function showFormStatus(type, message) {
      if (!formStatus) return;
      formStatus.textContent = message;
      formStatus.className = 'form-status ' + type;
      formStatus.style.display = 'block';
    }

    // ✅ NAVIGATION
    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const page = btn.getAttribute('data-page');
        if (page) switchPage(page);
      });
    });

    if (viewPuppiesBtn) {
      viewPuppiesBtn.addEventListener('click', () => switchPage('puppies'));
    }

    if (backToPuppiesBtn) {
      backToPuppiesBtn.addEventListener('click', () => switchPage('puppies'));
    }

    // ✅ INITIAL LOAD
    renderPuppyGrid();
    switchPage('home');
    
    console.log('🐾 Happy Paws Adoption ready!');
    console.log('📝 To connect real form: replace "your-form-id" in form action with your Formspree ID');
    console.log('🖼️ To change puppy images: edit the "photo" URLs in the puppies array');
    console.log('🎥 To add videos: add videoUrl to any puppy object');
  })();
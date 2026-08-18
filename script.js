/* ==========================================================
   منطق الموقع: يعرض كل المحتوى من config.js
   لست بحاجة لتعديل هذا الملف — كل التعديلات في config.js
   ========================================================== */

(function () {
  "use strict";

  /* حماية النطاق — يمنع تشغيل الموقع على أي نطاق غير مصرح به */
  var ALLOWED_HOSTS = ["motaz.is-a.dev", "motaz4edit.vercel.app", "my-website1-motaz4.vercel.app", "localhost", "127.0.0.1"];
  var isLocal = window.location.protocol === "file:" || ALLOWED_HOSTS.indexOf(window.location.hostname) !== -1;
  if (!isLocal) {
    document.documentElement.innerHTML = "";
    document.documentElement.innerHTML = '<head><meta charset="UTF-8"><title>Motaz — Video Editor</title></head><body style="margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#090909;color:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;text-align:center;padding:20px;"><div><h1 style="font-size:1.5rem;margin-bottom:12px;">This portfolio belongs to Motaz</h1><p style="color:#94A3B8;font-size:0.95rem;">Unauthorized copies are not permitted.</p><p style="color:#94A3B8;font-size:0.8rem;margin-top:20px;">Original: <a href="https://motaz.is-a.dev" style="color:#2563EB;">motaz.is-a.dev</a></p></div></body>';
    return;
  }

  /* ---------- وضع المعاينة ---------- */
  var isPreview = false;
  try {
    var previewData = localStorage.getItem("motaz-preview-config");
    if (previewData) {
      var parsed = JSON.parse(previewData);
      if (parsed && parsed.name) {
        Object.assign(SITE, parsed);
        isPreview = true;
      }
    }
  } catch (e) {}

  function addPreviewBanner() {
    if (!isPreview) return;
    var banner = document.createElement("div");
    banner.id = "preview-banner";
    banner.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:9999;background:linear-gradient(135deg,#2563EB,#60A5FA);color:#fff;text-align:center;padding:10px 20px;font-size:0.9rem;font-weight:700;display:flex;align-items:center;justify-content:center;gap:12px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;";
    banner.innerHTML = "👁 وضع المعاينة — التغييرات غير محفوظة";
    var btn = document.createElement("button");
    btn.textContent = "إغلاق المعاينة";
    btn.style.cssText = "background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.3);color:#fff;padding:5px 14px;border-radius:8px;cursor:pointer;font-weight:700;font-size:0.82rem;";
    btn.addEventListener("click", function () {
      localStorage.removeItem("motaz-preview-config");
      location.reload();
    });
    banner.appendChild(btn);
    document.body.prepend(banner);
    document.body.style.paddingTop = "48px";
  }

  const LS_THEME = "motaz-theme";
  const LS_LANG = "motaz-lang";

  /* ---------- أيقونات SVG للخدمات ووسائل التواصل والأدوات ---------- */
  const ICONS = {
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>',
    smartphone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    wand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h.01"/><path d="M17.8 6.2 19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    music: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    scissors: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>',
    website: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    arrowUpRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>'
  };

  /* ---------- الحالة ---------- */
  let lang = localStorage.getItem(LS_LANG) || SITE.language;
  let theme = localStorage.getItem(LS_THEME) || SITE.theme;

  const t = (obj) => (obj && obj[lang]) ? obj[lang] : obj;

  const $ = (id) => document.getElementById(id);

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ---------- إعدادات أولية ---------- */
  function init() {
    document.body.classList.add("js");

    applyTheme(theme);
    applyAccent(SITE.accent);
    applyFont(SITE.font);

    document.title = t(SITE.metaTitle) || (SITE.name + " — Video Editor Portfolio");
    $("logoBadge").textContent = SITE.logoLetter || SITE.name[0];
    $("logoText").textContent = SITE.name;
    $("heroName").textContent = SITE.name;
    $("heroPhoto").src = SITE.avatar;
    $("heroPhoto").alt = SITE.name;
    $("year").textContent = new Date().getFullYear();
    $("footerTagline").textContent = t(SITE.tagline);

    renderNav();
    renderHero();
    renderTools();
    renderClients();
    renderVideos();
    renderServices();
    renderProcess();
    renderSocials();
    renderContact();
    renderShowreel();
    renderTestimonials();
    renderAvailability();
    renderStats();
    setupVideoFilters();
    setupReveal();
    applyLang(lang);
    addPreviewBanner();

    /* النافبار يتغير عند التمرير */
    window.addEventListener("scroll", () => {
      $("navbar").classList.toggle("scrolled", window.scrollY > 10);
    });

    /* زر القائمة للجوال */
    $("menuToggle").addEventListener("click", () => {
      document.body.classList.toggle("menu-open");
    });
    document.querySelectorAll(".nav-links a").forEach(a =>
      a.addEventListener("click", () => document.body.classList.remove("menu-open"))
    );

    /* إغلاق النافذة بزر Esc */
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  /* ---------- القائمة ---------- */
  function renderNav() {
    const ul = $("navLinks");
    ul.innerHTML = SITE.nav.map(n =>
      `<li><a href="${esc(n.href)}" data-i18n-nav="${esc(n.href)}">${esc(t(n.label))}</a></li>`
    ).join("");
  }

  /* ---------- الهيرو (الملف الشخصي) ---------- */
  function renderHero() {
    $("heroName").textContent = SITE.name;
    const locEl = $("heroLocation");
    const loc = t(SITE.location);
    locEl.textContent = loc || "";
    if (locEl.closest) locEl.closest(".meta-item").hidden = !loc;
    $("heroLanguages").textContent = t(SITE.languages);
    $("heroDesc").textContent = t(SITE.heroDesc);
  }

  /* ---------- أدوات العمل والذكاء الاصطناعي ---------- */
  function toolCardHTML(tool) {
    let iconHTML = '';
    if (tool.icon === 'pr') {
      iconHTML = '<span class="tool-badge-icon tool-badge-pr">Pr</span>';
    } else if (tool.icon === 'ae') {
      iconHTML = '<span class="tool-badge-icon tool-badge-ae">Ae</span>';
    } else if (tool.icon === 'mj') {
      iconHTML = '<span class="tool-badge-icon tool-badge-mj"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></span>';
    } else {
      iconHTML = `<span class="tool-badge-icon">${esc(tool.name.substring(0, 2))}</span>`;
    }
    return `
      <div class="tool-card glass">
        ${iconHTML}
        <span class="tool-name">${esc(tool.name)}</span>
      </div>
    `;
  }

  function renderTools() {
    const editGroup = $("editingToolsGrid") ? $("editingToolsGrid").closest(".tools-group") : null;
    const aiGroup = $("aiToolsGrid") ? $("aiToolsGrid").closest(".tools-group") : null;
    if (editGroup) editGroup.style.display = (SITE.editingTools && SITE.editingTools.length) ? "" : "none";
    if (aiGroup) aiGroup.style.display = (SITE.aiTools && SITE.aiTools.length) ? "" : "none";

    if ($("editingToolsTitle") && SITE.toolsSection) {
      $("editingToolsTitle").textContent = t(SITE.toolsSection.editing);
    }
    if ($("aiToolsTitle") && SITE.toolsSection) {
      $("aiToolsTitle").textContent = t(SITE.toolsSection.ai);
    }
    if ($("editingToolsGrid") && SITE.editingTools) {
      $("editingToolsGrid").innerHTML = SITE.editingTools.map(toolCardHTML).join("");
    }
    if ($("aiToolsGrid") && SITE.aiTools) {
      $("aiToolsGrid").innerHTML = SITE.aiTools.map(toolCardHTML).join("");
    }
  }

  /* ---------- الأرقام والمؤشرات ---------- */
  function renderStats() {
    const sec = $("stats");
    const grid = $("statsGrid");
    if (!sec || !grid) return;
    const items = (SITE.stats || []).filter(s => s && s.value);
    if (!items.length) { sec.hidden = true; return; }
    sec.hidden = false;
    grid.innerHTML = items.map(s => `
      <div class="stat-card glass">
        <span class="stat-value">${esc(s.value)}</span>
        <span class="stat-label">${esc(t(s.label))}</span>
      </div>`).join("");
  }

  /* ---------- العملاء (Edited For) ---------- */
  function clientCardHTML(c) {
    const hasAvatar = c.avatar && c.avatar.trim() !== "";
    const letter = esc(c.name.charAt(0).toUpperCase());
    const platformIcon = ICONS[c.platform] || ICONS.website;
    return `
      <a class="client-card glass" href="${esc(c.url)}" target="_blank" rel="noopener" title="${esc(c.name)}">
        <span class="client-avatar">
          ${hasAvatar ? `<img src="${esc(c.avatar)}" alt="${esc(c.name)}" loading="lazy" />` : letter}
        </span>
        <span class="client-info">
          <span class="client-name">${esc(c.name)}</span>
          <span class="client-handle">${esc(c.handle || "")}</span>
        </span>
        ${c.tag ? `<span class="client-tag">${esc(c.tag)}</span>` : ""}
        <span class="client-arrow">${ICONS.arrowUpRight}</span>
      </a>`;
  }

  function renderClients() {
    const grid = $("clientsGrid");
    if (!grid || !SITE.clients) return;
    grid.innerHTML = SITE.clients.filter(c => c.url).map(clientCardHTML).join("");

    if (SITE.editedFor) {
      $("editedForTitle").textContent = t(SITE.editedFor.title);
      $("editedForDesc").textContent = t(SITE.editedFor.desc);
    }
  }

  /* ---------- الفيديوهات ---------- */
  function videoCardHTML(v) {
    const isAr = lang === "ar";
    const title = (isAr && v.titleAr) ? v.titleAr : v.title;
    const desc = (isAr && v.descriptionAr) ? v.descriptionAr : v.description;
    return `
      <button class="video-card glass" data-video="${esc(v.embedUrl)}" data-title="${encodeURIComponent(title)}" data-desc="${encodeURIComponent(desc)}" data-portrait="${v.portrait || false}">
        <div class="video-thumb-wrap">
          <img class="video-thumb" src="${esc(v.thumbnail)}" alt="${esc(title)}" loading="lazy" />
          <div class="video-thumb-overlay"></div>
          <span class="duration-badge">${esc(v.duration)}</span>
          <span class="play-btn">${ICONS.play}</span>
        </div>
        <div class="video-body">
          <h3 class="video-title">${esc(title)}</h3>
          <p class="video-desc">${esc(desc)}</p>
          <div class="video-tags">${v.tags.map(tag => `<span class="video-tag">${esc(tag)}</span>`).join("")}</div>
        </div>
      </button>`;
  }

  function renderVideos() {
    const longGrid = $("longGrid");
    const shortGrid = $("shortGrid");
    longGrid.innerHTML = SITE.longForm.map(videoCardHTML).join("");
    shortGrid.innerHTML = SITE.shortForm.map(v => videoCardHTML({ ...v, portrait: true })).join("");

    $("longTitle").textContent = t(SITE.sections.long.title);
    $("longDesc").textContent = t(SITE.sections.long.desc);
    $("shortTitle").textContent = t(SITE.sections.short.title);
    $("shortDesc").textContent = t(SITE.sections.short.desc);

    document.querySelectorAll(".video-card").forEach(card =>
      card.addEventListener("click", () => openModal(card))
    );
  }

  /* ---------- الخدمات ---------- */
  function renderServices() {
    const sec = $("process");
    const items = SITE.services || [];
    $("servicesGrid").innerHTML = items.map(s => `
      <div class="service-card glass">
        <div class="service-icon">${ICONS[s.icon] || ICONS.scissors}</div>
        <h3 class="service-title">${esc(t(s.title))}</h3>
        <p class="service-text">${esc(t(s.text))}</p>
      </div>`).join("");
    $("processTitle").textContent = t(SITE.sections.process.title);
    toggleProcessSection();
  }

  /* ---------- خطوات العمل ---------- */
  function renderProcess() {
    const items = (SITE.process || []).filter(p => p && p.step);
    $("processGrid").innerHTML = items.map(p => `
      <div class="process-step">
        <span class="process-num">${esc(p.step)}</span>
        <h4 class="process-title">${esc(t(p.title))}</h4>
        <p class="process-text">${esc(t(p.text))}</p>
      </div>`).join("");
    toggleProcessSection();
  }

  /* إظهار/إخفاء القسم حسب المحتوى */
  function toggleProcessSection() {
    const sec = $("process");
    if (!sec) return;
    const hasServices = SITE.services && SITE.services.length > 0;
    const hasProcess = SITE.process && SITE.process.filter(p => p && p.step).length > 0;
    sec.hidden = !hasServices && !hasProcess;
  }

  /* ---------- وسائل التواصل ---------- */
  function renderSocials() {
    const socials = SITE.socials.filter(s => s.url);
    $("heroSocials").innerHTML = socials.map(s => {
      const isMail = s.url.startsWith("mailto:");
      return `
        <a class="social-btn" href="${esc(s.url)}" ${isMail ? '' : 'target="_blank" rel="noopener"'} title="${esc(s.name)}" aria-label="${esc(s.name)}">
          ${ICONS[s.name] || ""}
        </a>
      `;
    }).join("");
  }

  /* ---------- التواصل ---------- */
  function renderContact() {
    const wa = SITE.contact.whatsapp;
    const floatBtn = $("waFloat");
    if (!floatBtn) return;
    if (wa) {
      floatBtn.href = "https://wa.me/" + wa;
      floatBtn.hidden = false;
    } else {
      floatBtn.hidden = true;
    }
  }

  /* ---------- الشوريل (Showreel) ---------- */
  function renderShowreel() {
    const sec = $("showreel");
    const frame = $("showreelFrame");
    const title = $("showreelTitle");
    if (!sec || !frame || !SITE.showreel) return;
    if (SITE.showreel.url) {
      sec.hidden = false;
      frame.src = SITE.showreel.url;
      if (title && SITE.showreel.title) title.textContent = t(SITE.showreel.title);
    } else {
      sec.hidden = true;
      frame.src = "";
    }
  }

  /* ---------- آراء العملاء ---------- */
  function testimonialCardHTML(tm) {
    const hasAvatar = tm.avatar && tm.avatar.trim() !== "";
    const letter = esc((tm.name || "?").charAt(0).toUpperCase());
    const proof = tm.proof && tm.proof.trim() !== "" ? tm.proof : "";
    return `
      <div class="testimonial-card glass">
        <span class="testimonial-quote">&ldquo;</span>
        <div class="testimonial-head">
          <span class="testimonial-avatar">
            ${hasAvatar ? `<img src="${esc(tm.avatar)}" alt="${esc(tm.name)}" loading="lazy" />` : letter}
          </span>
          <span class="testimonial-meta">
            <strong>${esc(tm.name)}</strong>
            <span>${esc(t(tm.role))}</span>
          </span>
        </div>
        <p class="testimonial-text">${esc(t(tm.text))}</p>
        ${proof ? `<a class="testimonial-proof" href="${esc(proof)}" target="_blank" rel="noopener" title="${esc(t(LABELS.proof))}">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          ${esc(t(LABELS.proof))}</a>` : ""}
      </div>`;
  }

  function renderTestimonials() {
    const sec = $("testimonials");
    const grid = $("testimonialsGrid");
    if (!sec || !grid) return;
    const items = (SITE.testimonials || []).filter(tm => tm && tm.text);
    if (!items.length) { sec.hidden = true; return; }
    sec.hidden = false;
    grid.innerHTML = items.map(testimonialCardHTML).join("");
  }

  /* ---------- شارة التوفر ---------- */
  function renderAvailability() {
    const badge = $("availBadge");
    const label = $("availLabel");
    if (!badge || !label) return;
    const a = SITE.availability;
    if (a) {
      const off = a.available === false;
      label.textContent = t(off ? (a.unavailableLabel || a.label) : a.label);
      badge.classList.toggle("off", off);
      badge.hidden = false;
    } else {
      badge.hidden = true;
    }
  }

  /* ---------- فلترة الفيديوهات ---------- */
  function setupVideoFilters() {
    const chips = document.querySelectorAll(".filter-chip");
    if (!chips.length) return;
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const f = chip.dataset.filter;
        const longSec = $("long-form");
        const shortSec = $("short-form");
        if (longSec) longSec.style.display = (f === "all" || f === "long") ? "" : "none";
        if (shortSec) shortSec.style.display = (f === "all" || f === "short") ? "" : "none";
      });
    });
  }

  /* ---------- حركات الظهور ---------- */
  function setupReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
  }

  /* ---------- نافذة تشغيل الفيديو ---------- */
  function openModal(card) {
    const modal = $("videoModal");
    $("modalTitle").textContent = decodeURIComponent(card.dataset.title);
    $("modalDesc").textContent = decodeURIComponent(card.dataset.desc);
    $("modalFrame").src = card.dataset.video + (card.dataset.video.includes("?") ? "&" : "?") + "autoplay=1";
    const wrap = $("modalFrameWrap");
    wrap.classList.toggle("portrait", card.dataset.portrait === "true");
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  window.closeModal = function () {
    const modal = $("videoModal");
    $("modalFrame").src = "";
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  /* ---------- نموذج التواصل ---------- */
  window.handleSubmit = function (e) {
    e.preventDefault();
    if ($("website") && $("website").value) return false;
    const name = $("name").value.trim();
    const email = $("email").value.trim();
    const message = $("message").value.trim();
    const status = $("formStatus");
    const isAr = document.documentElement.lang === "ar";

    const method = SITE.contact.receiveMethod;
    let link;

    if (method === "whatsapp" && SITE.contact.whatsapp) {
      const text = encodeURIComponent(
        (isAr ? `الاسم: ${name}\nالبريد: ${email}\n\n${message}` : `Name: ${name}\nEmail: ${email}\n\n${message}`)
      );
      link = `https://wa.me/${SITE.contact.whatsapp}?text=${text}`;
    } else {
      const subject = encodeURIComponent(isAr ? "رسالة من موقعي" : "Portfolio message");
      const body = encodeURIComponent(`${name}\n${email}\n\n${message}`);
      link = `mailto:${SITE.contact.email}?subject=${subject}&body=${body}`;
    }

    status.hidden = false;
    status.textContent = isAr ? "شكراً لك! سأتواصل معك قريباً." : "Thanks! I'll get back to you soon.";
    status.style.color = "var(--primary)";
    window.location.href = link;
    e.target.reset();
    setTimeout(() => { status.hidden = true; }, 6000);
    return false;
  };

  /* ---------- اللغة ---------- */
  function applyLang(l) {
    lang = l;
    localStorage.setItem(LS_LANG, l);

    const html = document.documentElement;
    html.lang = l;
    html.dir = l === "ar" ? "rtl" : "ltr";

    document.title = t(SITE.metaTitle) || (SITE.name + " — Video Editor Portfolio");

    const btn = $("langToggle");
    btn.textContent = l === "ar" ? "EN" : "ع";
    btn.title = l === "ar" ? "English" : "العربية";
    btn.setAttribute("aria-label", btn.title);

    /* تحديث كل النصوص */
    renderHero();
    renderTools();
    renderClients();
    $("footerTagline").textContent = t(SITE.tagline);
    $("longTitle").textContent = t(SITE.sections.long.title);
    $("longDesc").textContent = t(SITE.sections.long.desc);
    $("shortTitle").textContent = t(SITE.sections.short.title);
    $("shortDesc").textContent = t(SITE.sections.short.desc);
    $("processTitle").textContent = t(SITE.sections.process.title);

    document.querySelectorAll(".nav-links a").forEach(a =>
      a.textContent = t(SITE.nav.find(n => n.href === a.dataset.i18nNav).label)
    );

    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = t(LABELS[el.dataset.i18n]);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      el.placeholder = t(LABELS[el.dataset.i18nPlaceholder]);
    });

    /* إعادة رسم الفيديوهات والخدمات والخطوات لتبديل اللغة */
    renderVideos();
    renderServices();
    renderProcess();
    renderContact();
    renderShowreel();
    renderTestimonials();
    renderAvailability();
    renderStats();
    document.body.classList.remove("menu-open");
  }

  const LABELS = {
    contact_title: { ar: "لنصنع شيئاً رائعاً", en: "Let's make something" },
    contact_desc: { ar: "عندك لقطات أو قناة أو مجرد فكرة؟ أخبرني عنها وسأقطعها.", en: "Got footage, a channel or just an idea? Tell me about it and I'll cut it." },
    send_form: { ar: "إرسال الرسالة", en: "Send message" },
    ph_name: { ar: "اسمك", en: "Your name" },
    ph_email: { ar: "بريدك الإلكتروني", en: "Your email" },
    ph_message: { ar: "رسالتك...", en: "Your message..." },
    testimonials_title: { ar: "آراء العملاء", en: "Testimonials" },
    testimonials_desc: { ar: "ماذا يقول من عملت معهم عن تجربتهم", en: "What people I've worked with say" },
    proof: { ar: "دليل المحادثة", en: "Conversation proof" },
    filter_all: { ar: "الكل", en: "All" },
    filter_long: { ar: "أعمال طويلة", en: "Long Form" },
    filter_short: { ar: "أعمال قصيرة", en: "Short Form" }
  };

  /* ---------- الثيم ---------- */
  function applyTheme(mode) {
    if (mode === "system") {
      mode = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    document.body.dataset.theme = mode;
    localStorage.setItem(LS_THEME, mode);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = mode === "light" ? "#F1F5F9" : "#090909";
  }

  /* ---------- اللون المميز ---------- */
  function applyAccent(c) {
    document.body.dataset.accent = c;
  }

  /* ---------- الخط ---------- */
  function applyFont(f) {
    const FONTS = {
      Apple: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Segoe UI", Roboto, "Cairo", Arial, sans-serif',
      Cairo: '"Cairo", sans-serif',
      Tajawal: '"Tajawal", sans-serif',
      KufiHamid: '"KufiHamid", "Cairo", sans-serif',
      Thmanyah_Serif_Text: '"Thmanyah_Serif_Text", "Cairo", serif',
      Thmanyah_Sans: '"Thmanyah_Sans", "Cairo", sans-serif',
      Thmanyah_Serif_Display: '"Thmanyah_Serif_Display", "Cairo", serif'
    };
    document.documentElement.style.setProperty("--font-body", FONTS[f] || FONTS.Apple);
  }

  /* ---------- أزرار ---------- */
  function wireControls() {
    $("themeToggle").addEventListener("click", () => {
      applyTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
    });
    $("langToggle").addEventListener("click", () => {
      applyLang(lang === "ar" ? "en" : "ar");
    });
  }

  /* ---------- حماية المحتوى ---------- */
  function setupContentProtection() {
    document.addEventListener("dragstart", function(e) {
      if (e.target.tagName === "IMG") { e.preventDefault(); }
    });
    document.addEventListener("contextmenu", function(e) {
      if (e.target.tagName === "IMG" || e.target.closest(".video-card") || e.target.closest(".hero-photo")) {
        e.preventDefault();
      }
    });
    document.addEventListener("selectstart", function(e) {
      if (e.target.tagName === "IMG") { e.preventDefault(); }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    init();
    wireControls();
    setupContentProtection();

    var modal = $("videoModal");
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal();
      });
    }
    var closeBtn = modal && modal.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }
    var form = $("contactForm");
    if (form) {
      form.addEventListener("submit", function (e) { handleSubmit(e); });
    }
  });
})();

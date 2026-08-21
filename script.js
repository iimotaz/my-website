/* ==========================================================
   V3 — Motaz Video Editor Portfolio
   ========================================================== */

(function () {
  "use strict";

  var ALLOWED_HOSTS = ["motaz.is-a.dev", "motaz4edit.vercel.app", "my-website1-motaz4.vercel.app", "localhost", "127.0.0.1"];
  var isLocal = window.location.protocol === "file:" || ALLOWED_HOSTS.indexOf(window.location.hostname) !== -1;
  if (!isLocal) {
    document.documentElement.innerHTML = '<head><meta charset="UTF-8"><title>Motaz</title></head><body style="margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#090909;color:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,sans-serif;text-align:center;padding:20px;"><div><h1 style="font-size:1.5rem;margin-bottom:12px;">This portfolio belongs to Motaz</h1><p style="color:#94A3B8;">Unauthorized copies are not permitted.</p><p style="margin-top:20px;"><a href="https://motaz.is-a.dev" style="color:#F97316;">motaz.is-a.dev</a></p></div></body>';
    return;
  }

  var isPreview = false;
  try {
    var previewData = localStorage.getItem("motaz-preview-config");
    if (previewData) {
      var parsed = JSON.parse(previewData);
      if (parsed && parsed.name) { Object.assign(SITE, parsed); isPreview = true; }
    }
  } catch (e) {}

  function addPreviewBanner() {
    if (!isPreview) return;
    var banner = document.createElement("div");
    banner.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:9999;background:linear-gradient(135deg,#F97316,#fb923c);color:#fff;text-align:center;padding:10px 20px;font-size:0.9rem;font-weight:700;display:flex;align-items:center;justify-content:center;gap:12px;";
    banner.textContent = "\u205F Preview Mode \u2014 Changes not saved";
    var closeBtn = document.createElement("button");
    closeBtn.textContent = "\u2715";
    closeBtn.style.cssText = "background:none;border:none;color:#fff;font-size:1.1rem;cursor:pointer;padding:0 4px;line-height:1;";
    closeBtn.title = "Dismiss";
    closeBtn.addEventListener("click", function() {
      localStorage.removeItem("motaz-preview-config");
      banner.remove();
      document.body.style.paddingTop = "";
    });
    banner.appendChild(closeBtn);
    document.body.prepend(banner);
    document.body.style.paddingTop = "48px";
  }

  var LS_THEME = "motaz-theme";
  var LS_LANG = "motaz-lang";

  var ICONS = {
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',
    smartphone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    wand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="m3 21 9-9"/></svg>',
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
    arrowUpRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>',
    hook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    retention: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    story: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
    payoff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    dr: '<span style="font-weight:800;font-size:0.85rem">DR</span>',
    ps: '<span style="font-weight:800;font-size:0.85rem">Ps</span>',
    pr: '<span style="font-weight:800;font-size:0.85rem">Pr</span>',
    ae: '<span style="font-weight:800;font-size:0.85rem">Ae</span>',
    mj: '<span style="font-weight:800;font-size:0.85rem">MJ</span>'
  };

  var lang = localStorage.getItem(LS_LANG) || SITE.language;
  var theme = localStorage.getItem(LS_THEME) || SITE.theme;
  var t = function(obj) { return (obj && obj[lang]) ? obj[lang] : obj; };
  var $ = function(id) { return document.getElementById(id); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ====================== INIT ====================== */
  function init() {
    document.body.classList.add("js");
    applyTheme(theme);
    applyAccent(SITE.accent);
    applyFont(SITE.font);
    document.title = t(SITE.metaTitle) || (SITE.name + " \u2014 Video Editor & Storyteller");
    $("logoBadge").textContent = SITE.logoLetter || SITE.name[0];
    $("logoText").textContent = SITE.name;
    $("heroName").textContent = SITE.name;
    $("heroPhoto").src = SITE.avatar;
    $("heroPhoto").alt = SITE.name;
    $("year").textContent = new Date().getFullYear();
    $("footerTagline").textContent = t(SITE.tagline);
    $("footerLogo").textContent = SITE.logoLetter || SITE.name[0];

    renderNav();
    renderHero();
    renderTools();
    renderClients();
    renderVideos();
    renderServices();
    renderProcess();
    renderPhilosophy();
    renderSocials();
    renderContact();
    renderShowreel();
    renderTestimonials();
    renderAvailability();
    renderStats();
    renderFAQ();
    renderFooterLinks();
    renderFooterSocials();
    renderAbout();
    setupVideoFilters();
    setupReveal();
    applyLang(lang);
    addPreviewBanner();

    window.addEventListener("scroll", function() {
      $("navbar").classList.toggle("scrolled", window.scrollY > 10);
      updateActiveNav();
    });
    $("menuToggle").addEventListener("click", function() {
      document.body.classList.toggle("menu-open");
    });
    document.querySelectorAll(".nav-links a").forEach(function(a) {
      a.addEventListener("click", function() { document.body.classList.remove("menu-open"); });
    });
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") closeModal();
    });
  }

  /* ====================== NAV ====================== */
  function renderNav() {
    $("navLinks").innerHTML = SITE.nav.map(function(n) {
      return '<li><a href="' + esc(n.href) + '" data-i18n-nav="' + esc(n.href) + '">' + esc(t(n.label)) + '</a></li>';
    }).join("");
  }

  /* ====================== HERO ====================== */
  function renderHero() {
    $("heroName").textContent = SITE.name;
    var locEl = $("heroLocation");
    var loc = t(SITE.location);
    locEl.textContent = loc || "";
    if (locEl.closest) locEl.closest(".meta-item").hidden = !loc;
    $("heroLanguages").textContent = t(SITE.languages);
    $("heroSubline").textContent = t(SITE.heroSubline);
    if ($("heroTagline")) $("heroTagline").textContent = t(SITE.heroTagline);
    if ($("heroDesc")) $("heroDesc").textContent = t(SITE.heroDesc);
  }

  /* ====================== TOOLS ====================== */
  function toolCardHTML(tool) {
    var iconHTML = '';
    if (ICONS[tool.icon]) {
      iconHTML = '<span class="tool-badge-icon tool-badge-' + esc(tool.icon) + '">' + ICONS[tool.icon] + '</span>';
    } else {
      iconHTML = '<span class="tool-badge-icon">' + esc(tool.name.substring(0, 2)) + '</span>';
    }
    return '<div class="tool-card glass">' + iconHTML + '<span class="tool-name">' + esc(tool.name) + '</span></div>';
  }

  function renderTools() {
    var editGroup = $("editingToolsGrid") ? $("editingToolsGrid").closest(".tools-group") : null;
    var aiGroup = $("aiToolsGrid") ? $("aiToolsGrid").closest(".tools-group") : null;
    if (editGroup) editGroup.style.display = (SITE.editingTools && SITE.editingTools.length) ? "" : "none";
    if (aiGroup) aiGroup.style.display = (SITE.aiTools && SITE.aiTools.length) ? "" : "none";
    if ($("editingToolsTitle") && SITE.toolsSection) $("editingToolsTitle").textContent = t(SITE.toolsSection.editing);
    if ($("aiToolsTitle") && SITE.toolsSection) $("aiToolsTitle").textContent = t(SITE.toolsSection.ai);
    if ($("editingToolsGrid") && SITE.editingTools) $("editingToolsGrid").innerHTML = SITE.editingTools.map(toolCardHTML).join("");
    if ($("aiToolsGrid") && SITE.aiTools) $("aiToolsGrid").innerHTML = SITE.aiTools.map(toolCardHTML).join("");
  }

  /* ====================== STATS ====================== */
  function renderStats() {
    var sec = $("stats");
    var grid = $("statsGrid");
    if (!sec || !grid) return;
    var items = (SITE.stats || []).filter(function(s) { return s && s.value; });
    if (!items.length) { sec.hidden = true; return; }
    sec.hidden = false;
    grid.innerHTML = items.map(function(s) {
      var num = s.value.toString().match(/(\d+)/);
      var countAttr = num ? ' data-count="' + num[1] + '"' : '';
      var suffix = num ? s.value.toString().replace(num[1], '') : '';
      var suffixAttr = suffix ? ' data-suffix="' + esc(suffix) + '"' : '';
      return '<div class="stat-card glass"><span class="stat-value"' + countAttr + suffixAttr + '>' + esc(s.value) + '</span><span class="stat-label">' + esc(t(s.label)) + '</span></div>';
    }).join("");
  }

  /* ====================== CLIENTS ====================== */
  function clientCardHTML(c) {
    var hasAvatar = c.avatar && c.avatar.trim() !== "";
    var letter = esc(c.name.charAt(0).toUpperCase());
    var platformIcon = ICONS[c.platform] || ICONS.website;
    return '<a class="client-card glass" href="' + esc(c.url) + '" target="_blank" rel="noopener" title="' + esc(c.name) + '">' +
      '<span class="client-avatar">' + (hasAvatar ? '<img src="' + esc(c.avatar) + '" alt="' + esc(c.name) + '" loading="lazy" />' : letter) + '</span>' +
      '<span class="client-info"><span class="client-name">' + esc(c.name) + '</span><span class="client-handle">' + esc(c.handle || "") + '</span></span>' +
      (c.tag ? '<span class="client-tag">' + esc(c.tag) + '</span>' : '') +
      '<span class="client-arrow">' + ICONS.arrowUpRight + '</span></a>';
  }

  function renderClients() {
    var grid = $("clientsGrid");
    if (!grid) return;
    var items = (SITE.clients || []).filter(function(c) { return c && c.url; });
    if (!items.length) {
      grid.innerHTML = '<p class="section-desc">' + esc(t({
        ar: "القطاعات: صناع محتوى · إنتاج · علامات تجارية · تعليم",
        en: "Sectors: Content creators · Production · Brands · Educational"
      })) + '</p>';
    } else {
      grid.innerHTML = items.map(clientCardHTML).join("");
    }
    if (SITE.editedFor) {
      $("editedForTitle").textContent = t(SITE.editedFor.title);
      $("editedForDesc").textContent = t(SITE.editedFor.desc);
    }
  }

  /* ====================== VIDEOS ====================== */
  function videoCardHTML(v) {
    var isAr = lang === "ar";
    var title = (isAr && v.titleAr) ? v.titleAr : v.title;
    var desc = (isAr && v.descriptionAr) ? v.descriptionAr : v.description;
    var isPortrait = v.orientation === "portrait";
    var isSpec = v.type === "spec";
    var brief = (isAr && v.brief) ? v.brief : (v.brief || "");
    return '<button class="video-card glass' + (v.featured ? ' featured' : '') + '" data-video="' + esc(v.embedUrl) + '" data-title="' + encodeURIComponent(title) + '" data-desc="' + encodeURIComponent(desc) + '" data-portrait="' + isPortrait + '" data-id="' + esc(v.id) + '" data-type="' + esc(v.type || '') + '">' +
      '<div class="video-thumb-wrap">' +
      '<img class="video-thumb" src="' + esc(v.thumbnail) + '" alt="' + esc(title) + '" loading="lazy" />' +
      '<div class="video-thumb-overlay"></div>' +
      '<span class="duration-badge">' + esc(v.duration) + '</span>' +
      '<span class="play-btn">' + ICONS.play + '</span>' +
      '</div>' +
      '<div class="video-body">' +
      '<h3 class="video-title">' + esc(title) + '</h3>' +
      (brief ? '<p class="video-brief">' + esc(brief) + '</p>' : '') +
      '<p class="video-desc">' + esc(desc) + '</p>' +
      '<div class="video-tags">' + v.tags.map(function(tag) { return '<span class="video-tag">' + esc(tag) + '</span>'; }).join("") + '</div>' +
      (isSpec ? '<span class="case-study-link">' + (isAr ? 'عرض دراسة الحالة' : 'View Case Study') + ' →</span>' : '') +
      '</div></button>';
  }

  function renderVideos() {
    var longGrid = $("longGrid");
    var shortGrid = $("shortGrid");
    if (longGrid) longGrid.innerHTML = SITE.longForm.map(videoCardHTML).join("");
    if (shortGrid) shortGrid.innerHTML = SITE.shortForm.map(function(v) { return videoCardHTML(Object.assign({}, v, { orientation: "portrait" })); }).join("");
    if ($("longTitle")) $("longTitle").textContent = t(SITE.sections.long.title);
    if ($("longDesc")) $("longDesc").textContent = t(SITE.sections.long.desc);
    if ($("shortTitle")) $("shortTitle").textContent = t(SITE.sections.short.title);
    if ($("shortDesc")) $("shortDesc").textContent = t(SITE.sections.short.desc);
    document.querySelectorAll(".video-card").forEach(function(card) {
      card.addEventListener("click", function() {
        if (card.dataset.type === "spec") {
          openCaseStudy(card.dataset.id);
        } else {
          openModal(card);
        }
      });
    });
  }

  /* ====================== SERVICES ====================== */
  function renderServices() {
    var grid = $("servicesGrid");
    if (!grid) return;
    var items = SITE.services || [];
    grid.innerHTML = items.map(function(s) {
      return '<div class="service-card glass"><div class="service-icon">' + (ICONS[s.icon] || ICONS.scissors) + '</div><h3 class="service-title">' + esc(t(s.title)) + '</h3><p class="service-text">' + esc(t(s.text)) + '</p></div>';
    }).join("");
    if ($("servicesTitle")) $("servicesTitle").textContent = t(SITE.sections.services.title);
    if ($("servicesDesc")) $("servicesDesc").textContent = t(SITE.sections.services.desc);
  }

  /* ====================== PROCESS ====================== */
  function renderProcess() {
    var grid = $("processGrid");
    if (!grid) return;
    var items = (SITE.process || []).filter(function(p) { return p && p.step; });
    grid.innerHTML = items.map(function(p) {
      return '<div class="process-step"><span class="process-num">' + esc(p.step) + '</span><h4 class="process-title">' + esc(t(p.title)) + '</h4><p class="process-text">' + esc(t(p.text)) + '</p></div>';
    }).join("");
    if ($("processTitle")) $("processTitle").textContent = t(SITE.sections.process.title);
  }

  /* ====================== PHILOSOPHY ====================== */
  function renderPhilosophy() {
    var grid = $("philosophyGrid");
    if (!grid) return;
    var items = SITE.philosophy || [];
    grid.innerHTML = items.map(function(p) {
      return '<div class="philosophy-card glass"><div class="philosophy-icon">' + (ICONS[p.icon] || ICONS.play) + '</div><h3 class="philosophy-title">' + esc(t(p.title)) + '</h3><p class="philosophy-text">' + esc(t(p.text)) + '</p></div>';
    }).join("");
  }

  /* ====================== SOCIALS ====================== */
  function renderSocials() {
    var socials = SITE.socials.filter(function(s) { return s.url; });
    $("heroSocials").innerHTML = socials.map(function(s) {
      var isMail = s.url.startsWith("mailto:");
      return '<a class="social-btn" href="' + esc(s.url) + '" ' + (isMail ? '' : 'target="_blank" rel="noopener"') + ' title="' + esc(s.name) + '" aria-label="' + esc(s.name) + '">' + (ICONS[s.name] || "") + '</a>';
    }).join("");
  }

  /* ====================== CONTACT ====================== */
  function renderContact() {
    var wa = SITE.contact.whatsapp;
    var floatBtn = $("waFloat");
    if (!floatBtn) return;
    if (wa) { floatBtn.href = "https://wa.me/" + wa; floatBtn.hidden = false; } else { floatBtn.hidden = true; }
    if ($("contactTitle")) $("contactTitle").textContent = t(SITE.sections.contact.title);
    if ($("contactDesc")) $("contactDesc").textContent = t(SITE.sections.contact.desc);
  }

  /* ====================== SHOWREEL ====================== */
  function renderShowreel() {
    var sec = $("showreel");
    var frame = $("showreelFrame");
    var title = $("showreelTitle");
    var posterImg = $("showreelPosterImg");
    var posterWrap = $("showreelPoster");
    var playBtn = $("showreelPlay");
    if (!sec || !SITE.showreel) return;
    if (SITE.showreel.url) {
      sec.hidden = false;
      if (title && SITE.showreel.title) title.textContent = t(SITE.showreel.title);
      if (posterImg && SITE.showreel.poster) posterImg.src = SITE.showreel.poster;
      if (playBtn) {
        playBtn.addEventListener("click", function() {
          posterWrap.style.display = "none";
          frame.style.display = "block";
          frame.src = SITE.showreel.url + (SITE.showreel.url.includes("?") ? "&" : "?") + "autoplay=1";
        });
      }
    } else {
      sec.hidden = true;
    }
  }

  /* ====================== TESTIMONIALS ====================== */
  function testimonialCardHTML(tm) {
    var hasAvatar = tm.avatar && tm.avatar.trim() !== "";
    var letter = esc((tm.name || "?").charAt(0).toUpperCase());
    var proof = tm.proof && tm.proof.trim() !== "" ? tm.proof : "";
    return '<div class="testimonial-card glass">' +
      '<span class="testimonial-quote">&ldquo;</span>' +
      '<div class="testimonial-head">' +
      '<span class="testimonial-avatar">' + (hasAvatar ? '<img src="' + esc(tm.avatar) + '" alt="' + esc(tm.name) + '" loading="lazy" />' : letter) + '</span>' +
      '<span class="testimonial-meta"><strong>' + esc(tm.name) + '</strong><span>' + esc(t(tm.role)) + '</span></span>' +
      '</div>' +
      '<p class="testimonial-text">' + esc(t(tm.text)) + '</p>' +
      (proof ? '<a class="testimonial-proof" href="' + esc(proof) + '" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> ' + esc(t(LABELS.proof)) + '</a>' : '') +
      '</div>';
  }

  function renderTestimonials() {
    var sec = $("testimonials");
    var grid = $("testimonialsGrid");
    if (!sec || !grid) return;
    var items = (SITE.testimonials || []).filter(function(tm) { return tm && tm.text; });
    if (!items.length) { sec.hidden = true; return; }
    sec.hidden = false;
    grid.innerHTML = items.map(testimonialCardHTML).join("");
    if ($("testimonialsTitle")) $("testimonialsTitle").textContent = t(SITE.sections.testimonials.title);
    if ($("testimonialsDesc")) $("testimonialsDesc").textContent = t(SITE.sections.testimonials.desc);
  }

  /* ====================== AVAILABILITY ====================== */
  function renderAvailability() {
    var badge = $("availBadge");
    var label = $("availLabel");
    if (!badge || !label) return;
    var a = SITE.availability;
    if (a) {
      var off = a.available === false;
      label.textContent = t(off ? (a.unavailableLabel || a.label) : a.label);
      badge.classList.toggle("off", off);
      badge.hidden = false;
    } else { badge.hidden = true; }
  }

  /* ====================== FAQ ====================== */
  function renderFAQ() {
    var sec = $("faq");
    var list = $("faqList");
    if (!sec || !list) return;
    var items = (SITE.faq || []);
    if (!items.length) { sec.hidden = true; return; }
    sec.hidden = false;
    list.innerHTML = items.map(function(item, i) {
      return '<div class="faq-item">' +
        '<button class="faq-question" aria-expanded="false" data-faq="' + i + '">' +
        '<span>' + esc(t(item.question)) + '</span>' +
        '<svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>' +
        '</button>' +
        '<div class="faq-answer"><p>' + esc(t(item.answer)) + '</p></div>' +
        '</div>';
    }).join("");
    list.querySelectorAll(".faq-question").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", !expanded);
        btn.closest(".faq-item").classList.toggle("open");
      });
    });
  }

  /* ====================== ABOUT ====================== */
  function renderAbout() {
    if ($("aboutTitle")) $("aboutTitle").textContent = t(SITE.sections.about.title);
    if ($("aboutBio")) $("aboutBio").textContent = t(SITE.heroDesc);
    var locEl = $("aboutLocation");
    var langEl = $("aboutLanguages");
    if (locEl) {
      var locText = locEl.querySelector("svg") ? locEl.querySelector("svg").outerHTML + " " + t(SITE.location) : t(SITE.location);
      locEl.innerHTML = locText;
    }
    if (langEl) {
      var langText = langEl.querySelector("svg") ? langEl.querySelector("svg").outerHTML + " " + t(SITE.languages) : t(SITE.languages);
      langEl.innerHTML = langText;
    }
  }

  /* ====================== FOOTER ====================== */
  function renderFooterLinks() {
    var el = $("footerLinks");
    if (!el) return;
    el.innerHTML = SITE.nav.map(function(n) {
      return '<a href="' + esc(n.href) + '">' + esc(t(n.label)) + '</a>';
    }).join("");
  }
  function renderFooterSocials() {
    var el = $("footerSocials");
    if (!el) return;
    el.innerHTML = SITE.socials.filter(function(s) { return s.url; }).map(function(s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="' + esc(s.name) + '" title="' + esc(s.name) + '">' + (ICONS[s.name] || "") + '</a>';
    }).join("");
  }

  /* ====================== FILTERS ====================== */
  function setupVideoFilters() {
    document.querySelectorAll(".filter-chip").forEach(function(chip) {
      chip.addEventListener("click", function() {
        document.querySelectorAll(".filter-chip").forEach(function(c) { c.classList.remove("active"); });
        chip.classList.add("active");
        var f = chip.dataset.filter;
        var longSec = $("long-form");
        var shortSec = $("short-form");
        if (longSec) longSec.style.display = (f === "all" || f === "long") ? "" : "none";
        if (shortSec) shortSec.style.display = (f === "all" || f === "short") ? "" : "none";
      });
    });
  }

  /* ====================== REVEAL ====================== */
  function setupReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function(el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    els.forEach(function(el) { io.observe(el); });
  }

  /* ====================== MODAL ====================== */
  function openModal(card) {
    var modal = $("videoModal");
    $("modalTitle").textContent = decodeURIComponent(card.dataset.title);
    $("modalDesc").textContent = decodeURIComponent(card.dataset.desc);
    var frameWrap = $("modalFrameWrap");
    frameWrap.innerHTML = '<iframe id="modalFrame" src="" title="Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    frameWrap.classList.remove("case-study-open");
    $("modalFrame").src = card.dataset.video + (card.dataset.video.includes("?") ? "&" : "?") + "autoplay=1";
    $("modalFrameWrap").classList.toggle("portrait", card.dataset.portrait === "true");
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  /* ====================== CASE STUDY ====================== */
  function findProject(id) {
    var all = (SITE.longForm || []).concat(SITE.shortForm || []);
    for (var i = 0; i < all.length; i++) { if (all[i].id === id) return all[i]; }
    return null;
  }

  function buildCaseStudyHTML(p) {
    var isAr = lang === "ar";
    var title = (isAr && p.titleAr) ? p.titleAr : p.title;
    var desc = (isAr && p.descriptionAr) ? p.descriptionAr : p.description;
    var brief = p.brief || "";
    var role = p.role || "";
    var tools = (p.tools || []).join(" · ");
    var challenge = p.challenge || "";
    var approach = p.approach || "";
    var tags = (p.tags || []).map(function(tag) { return '<span class="video-tag">' + esc(tag) + '</span>'; }).join("");
    return '<div class="case-study-inner">' +
      '<div class="case-study-embed">' +
        '<iframe src="' + esc(p.embedUrl) + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen loading="lazy"></iframe>' +
      '</div>' +
      '<div class="case-study-meta">' +
        '<h2>' + esc(title) + '</h2>' +
        (brief ? '<p class="case-study-brief">' + esc(brief) + '</p>' : '') +
        '<div class="case-study-details">' +
          (role ? '<div><strong>' + (isAr ? 'الدور' : 'Role') + ':</strong> ' + esc(role) + '</div>' : '') +
          (tools ? '<div><strong>' + (isAr ? 'الأدوات' : 'Tools') + ':</strong> ' + esc(tools) + '</div>' : '') +
          (p.duration ? '<div><strong>' + (isAr ? 'المدة' : 'Duration') + ':</strong> ' + esc(p.duration) + '</div>' : '') +
          (p.year ? '<div><strong>' + (isAr ? 'السنة' : 'Year') + ':</strong> ' + esc(p.year) + '</div>' : '') +
        '</div>' +
        (challenge ? '<div class="case-study-section"><h3>' + (isAr ? 'التحدي' : 'Challenge') + '</h3><p>' + esc(challenge) + '</p></div>' : '') +
        (approach ? '<div class="case-study-section"><h3>' + (isAr ? 'المنهجية' : 'Approach') + '</h3><p>' + esc(approach) + '</p></div>' : '') +
        '<div class="video-tags" style="margin-top:16px">' + tags + '</div>' +
      '</div>' +
    '</div>';
  }

  function openCaseStudy(id) {
    var p = findProject(id);
    if (!p) return;
    var modal = $("videoModal");
    $("modalTitle").textContent = (lang === "ar" && p.titleAr) ? p.titleAr : p.title;
    $("modalDesc").textContent = "";
    var frameWrap = $("modalFrameWrap");
    frameWrap.innerHTML = buildCaseStudyHTML(p);
    frameWrap.classList.remove("portrait");
    frameWrap.classList.add("case-study-open");
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  window.closeModal = function() {
    var modal = $("videoModal");
    var frameWrap = $("modalFrameWrap");
    var iframe = frameWrap.querySelector("iframe");
    if (iframe) iframe.src = "";
    frameWrap.classList.remove("case-study-open", "portrait");
    frameWrap.innerHTML = '<iframe id="modalFrame" src="" title="Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  /* ====================== FORM ====================== */
  window.handleSubmit = function(e) {
    e.preventDefault();
    var honeypots = e.target.querySelectorAll('[name="website"],[name="phone"],[name="fax"]');
    for (var i = 0; i < honeypots.length; i++) { if (honeypots[i].value) return false; }
    var name = $("name").value.trim();
    var email = $("email").value.trim();
    var message = $("message").value.trim();
    var status = $("formStatus");
    var isAr = document.documentElement.lang === "ar";
    var method = SITE.contact.receiveMethod;
    var link;
    if (method === "whatsapp" && SITE.contact.whatsapp) {
      var text = encodeURIComponent((isAr ? "\u0627\u0644\u0627\u0633\u0645: " + name + "\n\u0627\u0644\u0628\u0631\u064A\u062F: " + email + "\n\n" + message : "Name: " + name + "\nEmail: " + email + "\n\n" + message));
      link = "https://wa.me/" + SITE.contact.whatsapp + "?text=" + text;
    } else {
      var subject = encodeURIComponent(isAr ? "\u0631\u0633\u0627\u0644\u0629 \u0645\u0646 \u0645\u0648\u0642\u0639\u064A" : "Portfolio message");
      var body = encodeURIComponent(name + "\n" + email + "\n\n" + message);
      link = "mailto:" + SITE.contact.email + "?subject=" + subject + "&body=" + body;
    }
    status.hidden = false;
    status.textContent = isAr ? "\u0634\u0643\u0631\u0627\u064B \u0644\u0643! \u0633\u0623\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0642\u0631\u064A\u0628\u0627\u064B." : "Thanks! I'll get back to you soon.";
    status.style.color = "var(--primary)";
    window.location.href = link;
    e.target.reset();
    setTimeout(function() { status.hidden = true; }, 6000);
    return false;
  };

  /* ====================== LANGUAGE ====================== */
  var LABELS = {
    contact_title: { ar: "\u0644\u0646\u0635\u0646\u0639 \u0634\u064A\u0626\u0627\u064B \u0631\u0627\u0626\u0639\u0627\u064B", en: "Let's make something worth watching" },
    contact_desc: { ar: "\u0639\u0646\u062F\u0643 \u0644\u0642\u0637\u0627\u062A \u0623\u0648 \u0641\u0643\u0631\u0629\u061F \u0623\u062E\u0628\u0631\u0646\u064A \u0639\u0646\u0647\u0627 \u0648\u0633\u0623\u062D\u0648\u0644\u0647\u0627.", en: "Got footage or an idea? Tell me about it and I'll cut it." },
    send_form: { ar: "\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0633\u0627\u0644\u0629", en: "Send message" },
    ph_name: { ar: "\u0627\u0633\u0645\u0643", en: "Your name" },
    ph_email: { ar: "\u0628\u0631\u064A\u062F\u0643 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A", en: "Your email" },
    ph_message: { ar: "\u0631\u0633\u0627\u0644\u062A\u0643\u062E\u0628\u0631\u0646\u064A...", en: "Tell me about your project..." },
    testimonials_title: { ar: "\u0622\u0631\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u0627\u0621", en: "Testimonials" },
    testimonials_desc: { ar: "\u0645\u0627\u0630\u0627 \u064A\u0642\u0648\u0644 \u0645\u0646 \u0639\u0645\u0644\u062A \u0645\u0639\u0647\u0645", en: "What people I've worked with say" },
    proof: { ar: "\u062F\u0644\u064A\u0644 \u0627\u0644\u0645\u062D\u0627\u062F\u062B\u0629", en: "Conversation proof" },
    filter_all: { ar: "\u0627\u0644\u0643\u0644", en: "All" },
    filter_long: { ar: "\u0623\u0639\u0645\u0627\u0644 \u0637\u0648\u064A\u0644\u0629", en: "Long Form" },
    filter_short: { ar: "\u0623\u0639\u0645\u0627\u0644 \u0642\u0635\u064A\u0631\u0629", en: "Short Form" },
    work_title: { ar: "\u0623\u0639\u0645\u0627\u0644 \u0645\u062D\u062F\u062F\u0629", en: "Selected Work" },
    philosophy_title: { ar: "\u0641\u0644\u0633\u0641\u062A\u064A \u0641\u064A \u0627\u0644\u062A\u062D\u0631\u064A\u0631", en: "My Editing Philosophy" },
    philosophy_desc: { ar: "\u0627\u0644\u062A\u062D\u0631\u064A\u0631 \u0644\u064A\u0633 \u0645\u062C\u0631\u062F \u0642\u0635 \u0645\u0642\u0627\u0637\u0639\u2014\u0647\u0648 \u0641\u0646 \u0628\u0646\u0627\u0621 \u0627\u0644\u062A\u062C\u0631\u0628\u0629.", en: "Editing isn't just cutting clips \u2014 it's the art of crafting experience." },
    faq_title: { ar: "\u0623\u0633\u0626\u0644\u0629 \u0634\u0627\u0626\u0639\u0629", en: "Frequently Asked Questions" },
    showreel_label: { ar: "\u0639\u0631\u0636 \u0628\u0631\u064a\u0632", en: "Showreel" },
    nav_cta: { ar: "ابدأ مشروعك", en: "Start a Project" }
  };

  function applyLang(l) {
    lang = l;
    localStorage.setItem(LS_LANG, l);
    var html = document.documentElement;
    html.lang = l;
    html.dir = l === "ar" ? "rtl" : "ltr";
    document.title = t(SITE.metaTitle) || (SITE.name + " \u2014 Video Editor & Storyteller");
    var btn = $("langToggle");
    btn.textContent = l === "ar" ? "EN" : "\u0639";
    btn.title = l === "ar" ? "English" : "\u0627\u0644\u0639\u0631\u0628\u064A\u0629";
    btn.setAttribute("aria-label", btn.title);

    renderHero();
    renderTools();
    renderClients();
    $("footerTagline").textContent = t(SITE.tagline);
    if ($("longTitle")) $("longTitle").textContent = t(SITE.sections.long.title);
    if ($("longDesc")) $("longDesc").textContent = t(SITE.sections.long.desc);
    if ($("shortTitle")) $("shortTitle").textContent = t(SITE.sections.short.title);
    if ($("shortDesc")) $("shortDesc").textContent = t(SITE.sections.short.desc);
    if ($("processTitle")) $("processTitle").textContent = t(SITE.sections.process.title);
    if ($("servicesTitle")) $("servicesTitle").textContent = t(SITE.sections.services.title);
    if ($("servicesDesc")) $("servicesDesc").textContent = t(SITE.sections.services.desc);
    if ($("contactTitle")) $("contactTitle").textContent = t(SITE.sections.contact.title);
    if ($("contactDesc")) $("contactDesc").textContent = t(SITE.sections.contact.desc);
    if ($("ctaTitle")) $("ctaTitle").textContent = t(SITE.sections.finalCta.title);
    if ($("ctaDesc")) $("ctaDesc").textContent = t(SITE.sections.finalCta.desc);

    document.querySelectorAll(".nav-links a").forEach(function(a) {
      var navItem = SITE.nav.find(function(n) { return n.href === a.dataset.i18nNav; });
      if (navItem) a.textContent = t(navItem.label);
    });
    document.querySelectorAll("[data-i18n]").forEach(function(el) {
      if (LABELS[el.dataset.i18n]) el.textContent = t(LABELS[el.dataset.i18n]);
    });
    document.querySelectorAll("[data-i18n-nav-cta]").forEach(function(el) {
      if (LABELS.nav_cta) el.textContent = t(LABELS.nav_cta);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function(el) {
      if (LABELS[el.dataset.i18nPlaceholder]) el.placeholder = t(LABELS[el.dataset.i18nPlaceholder]);
    });

    renderVideos();
    renderServices();
    renderProcess();
    renderPhilosophy();
    renderContact();
    renderShowreel();
    renderTestimonials();
    renderAvailability();
    renderStats();
    renderFAQ();
    renderAbout();
    document.body.classList.remove("menu-open");
  }

  /* ====================== THEME ====================== */
  function applyTheme(mode) {
    if (mode === "system") mode = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    document.body.dataset.theme = mode;
    localStorage.setItem(LS_THEME, mode);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = mode === "light" ? "#F1F5F9" : "#090909";
  }
  function applyAccent(c) { document.body.dataset.accent = c; }
  function applyFont(f) {
    var FONTS = {
      Qomra: '"ITF Qomra Arabic", "Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Arial, sans-serif',
      Apple: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Segoe UI", Roboto, Arial, sans-serif',
      Cairo: '"Cairo", sans-serif',
      Tajawal: '"Tajawal", sans-serif'
    };
    document.documentElement.style.setProperty("--font-body", FONTS[f] || FONTS.Apple);
  }

  /* ====================== CONTROLS ====================== */
  function wireControls() {
    $("themeToggle").addEventListener("click", function() {
      applyTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
    });
    $("langToggle").addEventListener("click", function() {
      applyLang(lang === "ar" ? "en" : "ar");
    });
  }

  /* ====================== CONTENT PROTECTION ====================== */
  function setupContentProtection() {
    document.addEventListener("dragstart", function(e) { if (e.target.tagName === "IMG") e.preventDefault(); });
    document.addEventListener("contextmenu", function(e) {
      if (e.target.tagName === "IMG" || e.target.closest(".video-card") || e.target.closest(".hero-photo")) e.preventDefault();
    });
  }

  /* ====================== COUNTERS ====================== */
  function setupCounters() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute("data-count"), 10);
          var suffix = el.getAttribute("data-suffix") || "";
          var duration = 2000;
          var startTime = null;
          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll("[data-count]").forEach(function(el) { observer.observe(el); });
  }

  /* ====================== BACK TO TOP ====================== */
  function setupBackToTop() {
    var btn = $("backToTop");
    if (!btn) return;
    window.addEventListener("scroll", function() {
      btn.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener("click", function() { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* ====================== LOADER ====================== */
  function setupLoader() {
    var loader = $("loaderScreen");
    if (!loader) return;
    window.addEventListener("load", function() {
      setTimeout(function() { loader.classList.add("loaded"); }, 800);
    });
    setTimeout(function() { loader.classList.add("loaded"); }, 3000);
  }

  /* ====================== BLUR REVEAL ====================== */
  function setupBlurReveal() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll(".video-thumb, .client-avatar img").forEach(function(img) {
      img.classList.add("blur-reveal");
      observer.observe(img);
    });
  }

  /* ====================== SCROLL PROGRESS ====================== */
  function setupScrollProgress() {
    var bar = document.createElement("div");
    bar.className = "scroll-progress-bar";
    document.body.appendChild(bar);
    window.addEventListener("scroll", function() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + "%";
    });
  }

  /* ====================== ACTIVE NAV ====================== */
  function updateActiveNav() {
    var sections = document.querySelectorAll("main > section[id], main section[id]");
    var scrollPos = window.scrollY + 120;
    var current = "";
    sections.forEach(function(sec) {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    });
    document.querySelectorAll(".nav-links a").forEach(function(a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }

  /* ====================== DOMContentLoaded ====================== */
  document.addEventListener("DOMContentLoaded", function() {
    init();
    wireControls();
    setupContentProtection();
    setupScrollProgress();
    setupCounters();
    setupBackToTop();
    setupLoader();
    setupBlurReveal();
    var modal = $("videoModal");
    if (modal) {
      modal.addEventListener("click", function(e) { if (e.target === modal) closeModal(); });
      var closeBtn = modal.querySelector(".modal-close");
      if (closeBtn) closeBtn.addEventListener("click", closeModal);
    }
    var form = $("contactForm");
    if (form) form.addEventListener("submit", function(e) { handleSubmit(e); });
  });
})();

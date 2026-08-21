/* ==========================================================
   editor.js — V3 Admin Panel for Motaz Portfolio
   Lazy rendering: sections only build fields when opened.
   ========================================================== */
(function () {
  "use strict";

  const LS_KEY = "motaz-preview-config";

  // ── Helpers ──
  function esc(s) { return String(s ?? "").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function text(val, key, label) {
    return `<div class="field"><label>${label}</label><input type="text" id="field-${key}" value="${esc(val)}" /></div>`;
  }
  function textarea(val, key, label) {
    return `<div class="field"><label>${label}</label><textarea id="field-${key}" rows="3">${esc(val)}</textarea></div>`;
  }
  function color(val, key, label) {
    return `<div class="field"><label>${label}</label><input id="field-${key}" type="color" value="${esc(val)}" /></div>`;
  }
  function select(val, key, label, opts) {
    const options = opts.map(([v, t]) => `<option value="${v}" ${val === v ? "selected" : ""}>${t}</option>`).join("");
    return `<div class="field"><label>${label}</label><select id="field-${key}">${options}</select></div>`;
  }
  function toggleField(val, key, label) {
    return `<div class="field row"><label>${label}</label><input id="field-${key}" type="checkbox" ${val ? "checked" : ""} /></div>`;
  }
  function h3(t) {
    return `<div style="margin:8px 0 4px;padding-top:8px;font-weight:600;font-size:11px;color:#777;text-transform:uppercase;letter-spacing:.5px;border-top:1px solid #222">${t}</div>`;
  }
  function addBtn(path, label) {
    return `<button class="add" onclick="window.__editor.addItem('${path}')">${label}</button>`;
  }

  // ── State ──
  let state = { config: null, lang: "en" };

  function load() {
    try { state.config = JSON.parse(localStorage.getItem(LS_KEY)) || JSON.parse(JSON.stringify(DEFAULT)); }
    catch (e) { state.config = JSON.parse(JSON.stringify(DEFAULT)); }
  }
  function save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state.config)); } catch (e) {}
  }
  function reset() {
    if (!confirm("Reset all fields to defaults?")) return;
    state.config = JSON.parse(JSON.stringify(DEFAULT));
    save(); render();
  }
  function resetAll() {
    if (!confirm("Clear everything and reset to defaults?")) return;
    state.config = JSON.parse(JSON.stringify(DEFAULT));
    save(); render();
  }

  // ── Item management ──
  function addItem(path) {
    apply();
    const arr = (function (o, p) { return p.split(".").reduce((a, k) => a && a[k], o); })(state.config, path);
    if (!arr || !Array.isArray(arr)) return;
    const templates = {
      editingTools: { name: "", icon: "" },
      aiTools: { name: "", icon: "" },
      clients: "",
      services: { icon: "film", title: { ar: "", en: "" }, text: { ar: "", en: "" } },
      process: { step: String(arr.length + 1).padStart(2, "0"), title: { ar: "", en: "" }, text: { ar: "", en: "" } },
      philosophy: { icon: "hook", title: { ar: "", en: "" }, text: { ar: "", en: "" } },
      longForm: { id: "lf-" + Date.now(), title: "", titleAr: "", type: "spec", brief: "", role: "", tools: [], challenge: "", approach: "", description: "", descriptionAr: "", tags: [], duration: "", thumbnail: "", embedUrl: "", category: "long", year: "2025", featured: false },
      shortForm: { id: "sf-" + Date.now(), title: "", titleAr: "", type: "spec", brief: "", role: "", tools: [], challenge: "", approach: "", description: "", descriptionAr: "", tags: [], duration: "", thumbnail: "", embedUrl: "", category: "short", orientation: "portrait", year: "2025", featured: false },
      faq: { question: { ar: "", en: "" }, answer: { ar: "", en: "" } },
      socials: { name: "", url: "" },
      nav: { href: "#", label: { ar: "", en: "" } },
      stats: { number: "", label: { ar: "", en: "" } },
      testimonials: { name: "", role: "", company: "", text: { ar: "", en: "" } }
    };
    var template = null;
    for (var key of Object.keys(templates)) {
      if (path === key || path.startsWith(key + ".")) { template = templates[key]; break; }
    }
    arr.push(template !== null ? JSON.parse(JSON.stringify(template)) : "");
    save(); render();
  }

  function removeItem(path, index) {
    apply();
    var arr = (function (o, p) { return p.split(".").reduce((a, k) => a && a[k], o); })(state.config, path);
    if (!arr || !Array.isArray(arr)) return;
    arr.splice(index, 1);
    save(); render();
  }

  // ── DEFAULT ──
  var DEFAULT = {
    language: "en",
    font: "Qomra",
    accent: "orange",
    theme: "dark",
    tagline: { ar: "محرر فيديو وراوي قصص", en: "Video Editor & Storyteller" },
    name: "Motaz",
    logoLetter: "M",
    metaTitle: { ar: "Motaz | محرر فيديو", en: "Motaz — Video Editor & Storyteller" },
    avatar: "assets/avatar.png",
    location: { ar: "Algeria", en: "Algeria" },
    languages: { ar: "الإنجليزية، العربية", en: "English, Arabic" },
    heroDesc: {
      ar: "أحوّل اللقطات الخام إلى قصص ممتعة مبنية على الانتباه والإيقاع والسرد.",
      en: "I turn raw footage into engaging stories built around attention, pacing and storytelling."
    },
    heroTagline: { ar: "محرر فيديو وراوي قصص", en: "Video Editor & Storyteller" },
    heroSubline: { ar: "تحريرات طويلة وقصيرة مبنية على الانتباه والإيقاع والسرد", en: "Long-form & Short-form editing built around attention, pacing and storytelling" },
    availability: { available: false, label: { ar: "متاح للعمل", en: "Available for work" }, unavailableLabel: { ar: "غير متاح للعمل حاليًا", en: "Not available for work" } },
    stats: [],
    toolsSection: { editing: { ar: "أدوات المونتاج", en: "Editing Tools" }, ai: { ar: "أدوات الذكاء الاصطناعي", en: "AI Tools" } },
    editingTools: [{ name: "Premiere Pro", icon: "pr" }, { name: "After Effects", icon: "ae" }, { name: "DaVinci Resolve", icon: "dr" }, { name: "Photoshop", icon: "ps" }],
    aiTools: [{ name: "Midjourney", icon: "mj" }],
    editedFor: { title: { ar: "القطاعات", en: "Sectors" }, desc: { ar: "sectors شُغّلت فيها كمحرر فيديو.", en: "Sectors I've worked in as a video editor." } },
    clients: [],
    nav: [
      { href: "#home", label: { ar: "الرئيسية", en: "Home" } },
      { href: "#work", label: { ar: "الأعمال", en: "Work" } },
      { href: "#services", label: { ar: "الخدمات", en: "Services" } },
      { href: "#about", label: { ar: "عني", en: "About" } },
      { href: "#contact", label: { ar: "تواصل", en: "Contact" } }
    ],
    sections: {
      showreel: { title: { ar: "Showreel 2026", en: "Showreel 2026" }, desc: { ar: "نظرة سريعة على أبرز ما قدمته", en: "A look at my best work" } },
      long: { title: { ar: "الأعمال الطويلة", en: "Long Form" }, desc: { ar: "تحريرات متكاملة يقودها القصص والإيقاع والصوت.", en: "Full edits where story, pacing and sound carry the whole piece." } },
      short: { title: { ar: "الأعمال القصيرة", en: "Short Form" }, desc: { ar: "تحريرات مصممة لإيقاف التمرير.", en: "Vertical edits made to stop the scroll." } },
      process: { title: { ar: "كيف أعمل", en: "How I Work" } },
      services: { title: { ar: "الخدمات", en: "Services" }, desc: { ar: "كيف أساعدك في تحويل فكرتك إلى فيديو.", en: "What I offer to turn your idea into a video that delivers results." } },
      philosophy: { title: { ar: "فلسفتي في التحرير", en: "My Editing Philosophy" }, desc: { ar: "التحرير ليس مجرد قص مقاطع.", en: "Editing isn't just cutting clips." } },
      about: { title: { ar: "عني", en: "About Me" }, desc: { ar: "من خلف المونتاج؟", en: "Who is behind the edits?" } },
      testimonials: { title: { ar: "آراء العملاء", en: "Testimonials" }, desc: { ar: "ماذا يقول عملائي عني؟", en: "What people say" } },
      contact: { title: { ar: "لنصنع شيئاً يستحق المشاهدة", en: "Let's make something worth watching" }, desc: { ar: "لديك لقطات أو فكرة؟", en: "Got footage or an idea?" } },
      finalCta: { title: { ar: "لديك مشروع تفكر فيه؟", en: "Have a project in mind?" }, desc: { ar: "لنصنع شيئاً يستحق المشاهدة.", en: "Let's make something worth watching." } }
    },
    philosophy: [
      { icon: "hook", title: { ar: "الخطاف", en: "Hook" }, text: { ar: "أول 3 ثوانٍ تحدد ما إذا كان المشاهد سيستمر.", en: "The first 3 seconds decide if the viewer stays." } },
      { icon: "retention", title: { ar: "الاحتفاظ", en: "Retention" }, text: { ar: "أحافظ على الاهتمام عبر الإيقاع.", en: "I sustain attention through pacing." } },
      { icon: "story", title: { ar: "القصة", en: "Story" }, text: { ar: "كل فيديو يحكي قصة.", en: "Every video tells a story." } },
      { icon: "payoff", title: { ar: "النتيجة", en: "Payoff" }, text: { ar: "النهاية تترك أثراً.", en: "The ending leaves a mark." } }
    ],
    process: [
      { step: "01", title: { ar: "فهم", en: "Understand" }, text: { ar: "أفهم المحتوى والجمهور والهدف.", en: "Understand the content, audience and objective." } },
      { step: "02", title: { ar: "بنية", en: "Structure" }, text: { ar: "ابنِ القصة والإيقاع.", en: "Build the story and pacing." } },
      { step: "03", title: { ar: "تحرير", en: "Edit" }, text: { ar: "أنشئ الإيقاع البصري.", en: "Create the visual rhythm." } },
      { step: "04", title: { ar: "تحسين", en: "Enhance" }, text: { ar: "أضِف الحركة والتعليقات والصوت.", en: "Add motion, captions, sound and color." } },
      { step: "05", title: { ar: "إتقان", en: "Polish" }, text: { ar: "مراقبة الجودة النهائية.", en: "Final quality control and delivery." } }
    ],
    services: [
      { icon: "film", title: { ar: "تحرير طويل", en: "Long-Form Editing" }, text: { ar: "يوتيوب · وثائقي · بودكاست", en: "YouTube · Documentary · Podcast" } },
      { icon: "smartphone", title: { ar: "تحرير قصير", en: "Short-Form Editing" }, text: { ar: "ريلز · تيك توك · شورتس", en: "Reels · TikTok · Shorts" } },
      { icon: "wand", title: { ar: "تجاري", en: "Commercial" }, text: { ar: "إعلانات · منتجات · علامات تجارية", en: "Ads · Products · Brands" } },
      { icon: "palette", title: { ar: "حركة", en: "Motion" }, text: { ar: "عناوين · رسومات · تعليقات", en: "Titles · Graphics · Captions" } },
      { icon: "music", title: { ar: "ما بعد الإنتاج", en: "Post-Production" }, text: { ar: "صوت · ألوان · تشطيب", en: "Sound · Color · Finishing" } }
    ],
    longForm: [
      { id: "lf-1", title: "Night City", titleAr: "مدينة الليل", type: "spec", brief: "Cinematic city walk cut to a slow-building score", role: "Editor & Colorist", tools: ["Premiere Pro", "DaVinci Resolve"], challenge: "Transform raw footage into a cinematic mood piece.", approach: "Built the edit around a slow-building score.", description: "A moody city walk cut to a slow-building score.", descriptionAr: "جولة في مدينة ممطرة مقطوعة على موسيقى متصاعدة.", tags: ["Cinematic", "Colour grade"], duration: "8:12", thumbnail: "assets/thumb-long-1.jpg", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "long", year: "2025", featured: true },
      { id: "lf-2", title: "The Grind", titleAr: "المثابرة", type: "spec", brief: "Short documentary following a training block", role: "Editor", tools: ["Premiere Pro"], challenge: "Tell a compelling training story.", approach: "Used interview soundbites as the narrative backbone.", description: "Short documentary following a training block.", descriptionAr: "فيلم وثائقي قصير يتبع فترة تدريب.", tags: ["Documentary"], duration: "12:40", thumbnail: "assets/thumb-long-2.jpg", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "long", year: "2025", featured: false },
      { id: "lf-3", title: "Motion Study", titleAr: "دراسة الحركة", type: "spec", brief: "Motion graphics experiment with animated typography", role: "Motion Designer & Editor", tools: ["After Effects", "Premiere Pro"], challenge: "Create a visually striking motion piece.", approach: "Built each scene around a typographic element.", description: "An experiment in motion graphics.", descriptionAr: "تجربة في رسومات الحركة.", tags: ["Motion graphics"], duration: "4:05", thumbnail: "assets/thumb-long-3.jpg", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "long", year: "2025", featured: false }
    ],
    showreel: { title: { ar: "Showreel 2026", en: "Showreel 2026" }, url: "https://www.youtube.com/embed/dQw4w9WgXcQ", poster: "assets/thumb-long-1.jpg" },
    shortForm: [
      { id: "sf-1", title: "Edit Like This", titleAr: "حرر هكذا", type: "spec", brief: "30-second timeline workflow breakdown", role: "Editor", tools: ["Premiere Pro"], challenge: "Show a complex workflow in under 30 seconds.", approach: "Used text overlays and speed ramps.", description: "A 30-second breakdown of my timeline workflow.", descriptionAr: "شرح 30 ثانية لطريقة عملي على الجدول الزمني.", tags: ["Tutorial"], duration: "0:30", thumbnail: "assets/thumb-short-1.jpg", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "short", orientation: "portrait", year: "2025", featured: false },
      { id: "sf-2", title: "Street Session", titleAr: "جلسة شارع", type: "spec", brief: "Sports edit with speed ramps and impact frames", role: "Editor", tools: ["Premiere Pro", "After Effects"], challenge: "Create high-energy sports edit.", approach: "Mapped each impact frame to the audio waveform.", description: "Speed ramps and impact frames cut to the beat.", descriptionAr: "تسارعات وإطارات صادمة مقطوعة على الإيقاع.", tags: ["Sports"], duration: "0:18", thumbnail: "assets/thumb-short-2.jpg", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "short", orientation: "portrait", year: "2025", featured: false },
      { id: "sf-3", title: "Round One", titleAr: "الجولة الأولى", type: "spec", brief: "Boxing edit with hard cuts and silhouette lighting", role: "Editor", tools: ["Premiere Pro"], challenge: "Capture the intensity of boxing.", approach: "Used hard cuts synced to punch sounds.", description: "Hard cuts, punch sound design.", descriptionAr: "قصات حادة، تصميم صوتي قوي.", tags: ["Sports"], duration: "0:24", thumbnail: "assets/thumb-short-3.jpg", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "short", orientation: "portrait", year: "2025", featured: false },
      { id: "sf-4", title: "Morning Ritual", titleAr: "طقوس الصباح", type: "spec", brief: "Lifestyle edit with macro b-roll and transitions", role: "Editor", tools: ["Premiere Pro"], challenge: "Turn mundane morning routine into a satisfying edit.", approach: "Used macro b-roll and smooth transitions.", description: "Macro b-roll and satisfying transitions.", descriptionAr: "لقطات ماكرو وانتقالات مريحة للعين.", tags: ["Lifestyle"], duration: "0:21", thumbnail: "assets/thumb-short-4.jpg", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "short", orientation: "portrait", year: "2025", featured: false }
    ],
    faq: [
      { question: { ar: "ما هي أدوات التحرير التي تستخدمها؟", en: "What editing tools do you use?" }, answer: { ar: "Premiere Pro للتحرير الأساسي، After Effects للرسوم، DaVinci Resolve للألوان.", en: "Premiere Pro for editing, After Effects for motion, DaVinci Resolve for color." } },
      { question: { ar: "كيف يبدأ العمل معاك؟", en: "How does the workflow start?" }, answer: { ar: "تواصل معي وأخبرني عن المشروع.", en: "Reach out and tell me about the project." } },
      { question: { ar: "ما الفرق بين التحرير الطويل والقصير؟", en: "Long-form vs short-form?" }, answer: { ar: "الطويل يُركّز على القصة، القصير يُركّز على الخطاف.", en: "Long-form focuses on story, short-form on the hook." } },
      { question: { ar: "هل تقدم خدمات تصحيح ألوان؟", en: "Standalone color grading?" }, answer: { ar: "نعم، باستخدام DaVinci Resolve.", en: "Yes, using DaVinci Resolve." } },
      { question: { ar: "هل تعمل مع عملاء خارج الجزائر؟", en: "International clients?" }, answer: { ar: "نعم، أعمل مع عملاء من جميع أنحاء العالم.", en: "Yes, I work with clients worldwide." } }
    ],
    contact: { whatsapp: "213666873109", email: "motazeditroforbusiness@gmail.com", receiveMethod: "whatsapp" },
    testimonials: [],
    socials: [
      { name: "email", url: "https://mail.google.com/mail/?view=cm&fs=1&to=motazeditroforbusiness@gmail.com" },
      { name: "instagram", url: "https://www.instagram.com/islameditro/" },
      { name: "youtube", url: "https://www.youtube.com/@motaz4edit" }
    ]
  };

  // ══════════════════════════════════════════════════════
  //  SECTION DEFINITIONS — each returns fields HTML only
  // ══════════════════════════════════════════════════════
  var SECTIONS = [
    { id: "sec-general", label: "General", build: function (c) {
      return text(c.name,"name","Name")+text(c.logoLetter,"logoLetter","Logo Letter")+text(c.avatar,"avatar","Avatar Path")+
        textarea(c.tagline?.en,"tagline.en","Tagline (EN)")+textarea(c.tagline?.ar,"tagline.ar","Tagline (AR)")+
        textarea(c.metaTitle?.en,"metaTitle.en","Meta Title (EN)")+textarea(c.metaTitle?.ar,"metaTitle.ar","Meta Title (AR)");
    }},
    { id: "sec-hero", label: "Hero", build: function (c) {
      return text(c.heroTagline?.en,"heroTagline.en","Tagline (EN)")+text(c.heroTagline?.ar,"heroTagline.ar","Tagline (AR)")+
        textarea(c.heroSubline?.en,"heroSubline.en","Subline (EN)")+textarea(c.heroSubline?.ar,"heroSubline.ar","Subline (AR)")+
        textarea(c.heroDesc?.en,"heroDesc.en","Description (EN)")+textarea(c.heroDesc?.ar,"heroDesc.ar","Description (AR)")+
        text(c.location?.en,"location.en","Location (EN)")+text(c.location?.ar,"location.ar","Location (AR)")+
        text(c.languages?.en,"languages.en","Languages (EN)")+text(c.languages?.ar,"languages.ar","Languages (AR)");
    }},
    { id: "sec-appearance", label: "Appearance", build: function (c) {
      return select(c.font,"font","Font",[["Qomra","Qomra"],["Inter","Inter"],["Poppins","Poppins"],["IBM Plex Sans","IBM Plex Sans"],["Tajawal","Tajawal"],["Noto Sans Arabic","Noto Sans Arabic"],["Geist Mono","Geist Mono"]])+
        select(c.accent,"accent","Accent",[["orange","Orange (#F97316)"],["blue","Blue (#3B82F6)"],["green","Green (#22C55E)"],["purple","Purple (#A855F7)"],["red","Red (#EF4444)"],["teal","Teal (#14B8A6)"],["pink","Pink (#EC4899)"],["yellow","Yellow (#EAB308)"],["slate","Slate (#64748B)"]])+
        select(c.theme||"dark","theme","Theme",[["dark","Dark"],["light","Light"]]);
    }},
    { id: "sec-availability", label: "Availability", build: function (c) {
      var a=c.availability||{};
      return toggleField(a.available,"availability.available","Available for work")+
        text(a.label?.en,"availability.label.en","Available Label (EN)")+text(a.label?.ar,"availability.label.ar","Available Label (AR)")+
        text(a.unavailableLabel?.en,"availability.unavailableLabel.en","Unavailable Label (EN)")+text(a.unavailableLabel?.ar,"availability.unavailableLabel.ar","Unavailable Label (AR)");
    }},
    { id: "sec-sections", label: "Section Titles", build: function (c) {
      var s=c.sections||{}; var h="";
      Object.keys(s).forEach(function(k){
        h+=h3(k)+text(s[k]?.title?.en,"sections."+k+".title.en","Title (EN)")+text(s[k]?.title?.ar,"sections."+k+".title.ar","Title (AR)")+
          text(s[k]?.desc?.en,"sections."+k+".desc.en","Description (EN)")+text(s[k]?.desc?.ar,"sections."+k+".desc.ar","Description (AR)");
      }); return h;
    }},
    { id: "sec-tools", label: "Tools", build: function (c) {
      var h=h3("Section Titles")+text(c.toolsSection?.editing?.en,"toolsSection.editing.en","Editing Title (EN)")+text(c.toolsSection?.editing?.ar,"toolsSection.editing.ar","Editing Title (AR)")+
        text(c.toolsSection?.ai?.en,"toolsSection.ai.en","AI Title (EN)")+text(c.toolsSection?.ai?.ar,"toolsSection.ai.ar","AI Title (AR)")+h3("Editing Tools");
      (c.editingTools||[]).forEach(function(t,i){h+='<div class="field"><button class="remove" onclick="window.__editor.removeItem(\'editingTools\','+i+')">✕</button><div class="subsec-head">'+esc(t.name||"Tool")+'</div>'+text(t.name,"editingTools."+i+".name","Name")+text(t.icon,"editingTools."+i+".icon","Icon ID")+'</div>';});
      h+=addBtn("editingTools","+ Add Editing Tool")+h3("AI Tools");
      (c.aiTools||[]).forEach(function(t,i){h+='<div class="field"><button class="remove" onclick="window.__editor.removeItem(\'aiTools\','+i+')">✕</button><div class="subsec-head">'+esc(t.name||"Tool")+'</div>'+text(t.name,"aiTools."+i+".name","Name")+text(t.icon,"aiTools."+i+".icon","Icon ID")+'</div>';});
      h+=addBtn("aiTools","+ Add AI Tool"); return h;
    }},
    { id: "sec-sectors", label: "Sectors", build: function (c) {
      var h=text(c.editedFor?.title?.en,"editedFor.title.en","Section Title (EN)")+text(c.editedFor?.title?.ar,"editedFor.title.ar","Section Title (AR)")+
        textarea(c.editedFor?.desc?.en,"editedFor.desc.en","Description (EN)")+textarea(c.editedFor?.desc?.ar,"editedFor.desc.ar","Description (AR)")+h3("Sector List");
      (c.clients||[]).forEach(function(s,i){h+='<div class="field"><button class="remove" onclick="window.__editor.removeItem(\'clients\','+i+')">✕</button>'+text(s,"clients."+i,"Sector")+'</div>';});
      h+=addBtn("clients","+ Add Sector"); return h;
    }},
    { id: "sec-services", label: "Services", build: function (c) {
      var h="";
      (c.services||[]).forEach(function(s,i){h+='<div class="field"><button class="remove" onclick="window.__editor.removeItem(\'services\','+i+')">✕</button><div class="subsec-head">'+esc(s.title?.en||"Service")+'</div>'+
        text(s.icon,"services."+i+".icon","Icon")+text(s.title?.en,"services."+i+".title.en","Title (EN)")+text(s.title?.ar,"services."+i+".title.ar","Title (AR)")+
        text(s.text?.en,"services."+i+".text.en","Text (EN)")+text(s.text?.ar,"services."+i+".text.ar","Text (AR)")+'</div>';});
      h+=addBtn("services","+ Add Service"); return h;
    }},
    { id: "sec-process", label: "Process", build: function (c) {
      var h="";
      (c.process||[]).forEach(function(p,i){h+='<div class="field"><button class="remove" onclick="window.__editor.removeItem(\'process\','+i+')">✕</button><div class="subsec-head">Step '+esc(p.step||"")+'</div>'+
        text(p.step,"process."+i+".step","Step #")+text(p.title?.en,"process."+i+".title.en","Title (EN)")+text(p.title?.ar,"process."+i+".title.ar","Title (AR)")+
        textarea(p.text?.en,"process."+i+".text.en","Text (EN)")+textarea(p.text?.ar,"process."+i+".text.ar","Text (AR)")+'</div>';});
      h+=addBtn("process","+ Add Step"); return h;
    }},
    { id: "sec-philosophy", label: "Philosophy", build: function (c) {
      var h="";
      (c.philosophy||[]).forEach(function(p,i){h+='<div class="field"><button class="remove" onclick="window.__editor.removeItem(\'philosophy\','+i+')">✕</button><div class="subsec-head">'+esc(p.title?.en||"Item")+'</div>'+
        text(p.icon,"philosophy."+i+".icon","Icon")+text(p.title?.en,"philosophy."+i+".title.en","Title (EN)")+text(p.title?.ar,"philosophy."+i+".title.ar","Title (AR)")+
        textarea(p.text?.en,"philosophy."+i+".text.en","Text (EN)")+textarea(p.text?.ar,"philosophy."+i+".text.ar","Text (AR)")+'</div>';});
      h+=addBtn("philosophy","+ Add Item"); return h;
    }},
    { id: "sec-projects", label: "Projects", build: function (c) {
      function pFields(items,path,cat){
        var h="";
        (items||[]).forEach(function(p,i){
          h+='<div class="field"><button class="remove" onclick="window.__editor.removeItem(\''+path+'\','+i+')">✕</button><div class="subsec-head">'+esc(p.title||p.titleAr||"Project")+'</div>'+
            text(p.id,path+"."+i+".id","ID")+text(p.title,path+"."+i+".title","Title (EN)")+text(p.titleAr,path+"."+i+".titleAr","Title (AR)")+
            textarea(p.brief,path+"."+i+".brief","Brief")+text(p.role,path+"."+i+".role","Role")+
            text(Array.isArray(p.tools)?p.tools.join(", "):(p.tools||""),path+"."+i+".tools","Tools (comma-sep)")+
            textarea(p.challenge,path+"."+i+".challenge","Challenge")+textarea(p.approach,path+"."+i+".approach","Approach")+
            textarea(p.description,path+"."+i+".description","Description (EN)")+textarea(p.descriptionAr,path+"."+i+".descriptionAr","Description (AR)")+
            text(Array.isArray(p.tags)?p.tags.join(", "):(p.tags||""),path+"."+i+".tags","Tags (comma-sep)")+
            text(p.duration,path+"."+i+".duration","Duration")+text(p.thumbnail,path+"."+i+".thumbnail","Thumbnail")+
            text(p.embedUrl,path+"."+i+".embedUrl","Embed URL")+text(p.year,path+"."+i+".year","Year")+
            toggleField(p.featured,path+"."+i+".featured","Featured")+
            (cat==="short"?text(p.orientation||"portrait",path+"."+i+".orientation","Orientation"):"")+'</div>';
        }); return h;
      }
      return h3("Long Form")+pFields(c.longForm,"longForm","long")+addBtn("longForm","+ Add Long Form")+h3("Short Form")+pFields(c.shortForm,"shortForm","short")+addBtn("shortForm","+ Add Short Form");
    }},
    { id: "sec-showreel", label: "Showreel", build: function (c) {
      var sr=c.showreel||{};
      return text(sr.title?.en,"showreel.title.en","Title (EN)")+text(sr.title?.ar,"showreel.title.ar","Title (AR)")+
        text(sr.url,"showreel.url","YouTube Embed URL")+text(sr.poster,"showreel.poster","Poster Image");
    }},
    { id: "sec-faq", label: "FAQ", build: function (c) {
      var h="";
      (c.faq||[]).forEach(function(f,i){h+='<div class="field"><button class="remove" onclick="window.__editor.removeItem(\'faq\','+i+')">✕</button><div class="subsec-head">'+esc(f.question?.en||"Question")+'</div>'+
        text(f.question?.en,"faq."+i+".question.en","Question (EN)")+text(f.question?.ar,"faq."+i+".question.ar","Question (AR)")+
        textarea(f.answer?.en,"faq."+i+".answer.en","Answer (EN)")+textarea(f.answer?.ar,"faq."+i+".answer.ar","Answer (AR)")+'</div>';});
      h+=addBtn("faq","+ Add FAQ"); return h;
    }},
    { id: "sec-contact", label: "Contact", build: function (c) {
      var h=text(c.contact?.whatsapp,"contact.whatsapp","WhatsApp Number")+text(c.contact?.email,"contact.email","Email")+
        select(c.contact?.receiveMethod,"contact.receiveMethod","Receive Method",[["whatsapp","WhatsApp"],["email","Email"],["both","Both"]])+h3("Social Links");
      (c.socials||[]).forEach(function(s,i){h+='<div class="field"><button class="remove" onclick="window.__editor.removeItem(\'socials\','+i+')">✕</button>'+
        text(s.name,"socials."+i+".name","Platform")+text(s.url,"socials."+i+".url","URL")+'</div>';});
      h+=addBtn("socials","+ Add Social Link"); return h;
    }},
    { id: "sec-nav", label: "Navigation", build: function (c) {
      var h="";
      (c.nav||[]).forEach(function(n,i){h+='<div class="field"><button class="remove" onclick="window.__editor.removeItem(\'nav\','+i+')">✕</button>'+
        text(n.href,"nav."+i+".href","Href")+text(n.label?.en,"nav."+i+".label.en","Label (EN)")+text(n.label?.ar,"nav."+i+".label.ar","Label (AR)")+'</div>';});
      h+=addBtn("nav","+ Add Nav Item"); return h;
    }}
  ];

  // ══════════════════════════════════════════════════════
  //  MAIN RENDER — only headers, no field content
  // ══════════════════════════════════════════════════════
  function render() {
    var html = "";
    SECTIONS.forEach(function (sec) {
      html += '<div class="sec" id="'+sec.id+'">'+
        '<div class="sec-head" onclick="toggle(\''+sec.id+'\')"><span>'+sec.label+'</span><span class="arr">▸</span></div>'+
        '<div class="fields" id="'+sec.id+'-fields"></div></div>';
    });
    document.getElementById("panels").innerHTML = html;
  }

  // ══════════════════════════════════════════════════════
  //  TOGGLE — lazy-loads content on first open
  // ══════════════════════════════════════════════════════
  window.toggle = function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    var fields = el.querySelector(".fields");
    var arr = el.querySelector(".arr");
    if (!fields) return;
    var visible = window.getComputedStyle(fields).display !== "none";
    if (visible) {
      fields.style.display = "none";
      if (arr) arr.textContent = "▸";
    } else {
      if (!fields.innerHTML.trim()) {
        var sec = SECTIONS.find(function (s) { return s.id === id; });
        if (sec) fields.innerHTML = sec.build(state.config);
      }
      fields.style.display = "block";
      if (arr) arr.textContent = "▾";
    }
  };

  // ══════════════════════════════════════════════════════
  //  PUBLIC API
  // ══════════════════════════════════════════════════════
  window.__editor = { addItem: addItem, removeItem: removeItem };

  // ══════════════════════════════════════════════════════
  //  APPLY — reads all currently rendered fields
  // ══════════════════════════════════════════════════════
  function apply() {
    var c = state.config;
    var v;
    // General
    v=document.getElementById("field-name"); if(v)c.name=v.value;
    v=document.getElementById("field-logoLetter"); if(v)c.logoLetter=v.value;
    v=document.getElementById("field-avatar"); if(v)c.avatar=v.value;
    c.tagline=c.tagline||{};
    v=document.getElementById("field-tagline.en"); if(v)c.tagline.en=v.value;
    v=document.getElementById("field-tagline.ar"); if(v)c.tagline.ar=v.value;
    c.metaTitle=c.metaTitle||{};
    v=document.getElementById("field-metaTitle.en"); if(v)c.metaTitle.en=v.value;
    v=document.getElementById("field-metaTitle.ar"); if(v)c.metaTitle.ar=v.value;
    // Hero
    c.heroTagline=c.heroTagline||{};
    v=document.getElementById("field-heroTagline.en"); if(v)c.heroTagline.en=v.value;
    v=document.getElementById("field-heroTagline.ar"); if(v)c.heroTagline.ar=v.value;
    c.heroSubline=c.heroSubline||{};
    v=document.getElementById("field-heroSubline.en"); if(v)c.heroSubline.en=v.value;
    v=document.getElementById("field-heroSubline.ar"); if(v)c.heroSubline.ar=v.value;
    c.heroDesc=c.heroDesc||{};
    v=document.getElementById("field-heroDesc.en"); if(v)c.heroDesc.en=v.value;
    v=document.getElementById("field-heroDesc.ar"); if(v)c.heroDesc.ar=v.value;
    c.location=c.location||{};
    v=document.getElementById("field-location.en"); if(v)c.location.en=v.value;
    v=document.getElementById("field-location.ar"); if(v)c.location.ar=v.value;
    c.languages=c.languages||{};
    v=document.getElementById("field-languages.en"); if(v)c.languages.en=v.value;
    v=document.getElementById("field-languages.ar"); if(v)c.languages.ar=v.value;
    // Appearance
    v=document.getElementById("field-font"); if(v)c.font=v.value;
    v=document.getElementById("field-accent"); if(v)c.accent=v.value;
    v=document.getElementById("field-theme"); if(v)c.theme=v.value;
    // Availability
    c.availability=c.availability||{};
    v=document.getElementById("field-availability.available"); if(v)c.availability.available=v.checked;
    c.availability.label=c.availability.label||{};
    v=document.getElementById("field-availability.label.en"); if(v)c.availability.label.en=v.value;
    v=document.getElementById("field-availability.label.ar"); if(v)c.availability.label.ar=v.value;
    c.availability.unavailableLabel=c.availability.unavailableLabel||{};
    v=document.getElementById("field-availability.unavailableLabel.en"); if(v)c.availability.unavailableLabel.en=v.value;
    v=document.getElementById("field-availability.unavailableLabel.ar"); if(v)c.availability.unavailableLabel.ar=v.value;
    // Sections titles
    c.sections=c.sections||{};
    Object.keys(c.sections).forEach(function(k){
      if(!c.sections[k])return;
      c.sections[k].title=c.sections[k].title||{};
      v=document.getElementById("field-sections."+k+".title.en"); if(v)c.sections[k].title.en=v.value;
      v=document.getElementById("field-sections."+k+".title.ar"); if(v)c.sections[k].title.ar=v.value;
      c.sections[k].desc=c.sections[k].desc||{};
      v=document.getElementById("field-sections."+k+".desc.en"); if(v)c.sections[k].desc.en=v.value;
      v=document.getElementById("field-sections."+k+".desc.ar"); if(v)c.sections[k].desc.ar=v.value;
    });
    // Tools
    c.toolsSection=c.toolsSection||{};
    c.toolsSection.editing=c.toolsSection.editing||{};
    v=document.getElementById("field-toolsSection.editing.en"); if(v)c.toolsSection.editing.en=v.value;
    v=document.getElementById("field-toolsSection.editing.ar"); if(v)c.toolsSection.editing.ar=v.value;
    c.toolsSection.ai=c.toolsSection.ai||{};
    v=document.getElementById("field-toolsSection.ai.en"); if(v)c.toolsSection.ai.en=v.value;
    v=document.getElementById("field-toolsSection.ai.ar"); if(v)c.toolsSection.ai.ar=v.value;
    c.editingTools=c.editingTools||[];
    c.editingTools.forEach(function(t,i){v=document.getElementById("field-editingTools."+i+".name"); if(v)t.name=v.value;v=document.getElementById("field-editingTools."+i+".icon"); if(v)t.icon=v.value;});
    c.aiTools=c.aiTools||[];
    c.aiTools.forEach(function(t,i){v=document.getElementById("field-aiTools."+i+".name"); if(v)t.name=v.value;v=document.getElementById("field-aiTools."+i+".icon"); if(v)t.icon=v.value;});
    // Sectors
    c.editedFor=c.editedFor||{};
    c.editedFor.title=c.editedFor.title||{};
    v=document.getElementById("field-editedFor.title.en"); if(v)c.editedFor.title.en=v.value;
    v=document.getElementById("field-editedFor.title.ar"); if(v)c.editedFor.title.ar=v.value;
    c.editedFor.desc=c.editedFor.desc||{};
    v=document.getElementById("field-editedFor.desc.en"); if(v)c.editedFor.desc.en=v.value;
    v=document.getElementById("field-editedFor.desc.ar"); if(v)c.editedFor.desc.ar=v.value;
    c.clients=c.clients||[];
    c.clients.forEach(function(s,i){v=document.getElementById("field-clients."+i); if(v)c.clients[i]=v.value;});
    // Services
    c.services=c.services||[];
    c.services.forEach(function(s,i){
      v=document.getElementById("field-services."+i+".icon"); if(v)s.icon=v.value;
      s.title=s.title||{};v=document.getElementById("field-services."+i+".title.en"); if(v)s.title.en=v.value;v=document.getElementById("field-services."+i+".title.ar"); if(v)s.title.ar=v.value;
      s.text=s.text||{};v=document.getElementById("field-services."+i+".text.en"); if(v)s.text.en=v.value;v=document.getElementById("field-services."+i+".text.ar"); if(v)s.text.ar=v.value;
    });
    // Process
    c.process=c.process||[];
    c.process.forEach(function(p,i){
      v=document.getElementById("field-process."+i+".step"); if(v)p.step=v.value;
      p.title=p.title||{};v=document.getElementById("field-process."+i+".title.en"); if(v)p.title.en=v.value;v=document.getElementById("field-process."+i+".title.ar"); if(v)p.title.ar=v.value;
      p.text=p.text||{};v=document.getElementById("field-process."+i+".text.en"); if(v)p.text.en=v.value;v=document.getElementById("field-process."+i+".text.ar"); if(v)p.text.ar=v.value;
    });
    // Philosophy
    c.philosophy=c.philosophy||[];
    c.philosophy.forEach(function(p,i){
      v=document.getElementById("field-philosophy."+i+".icon"); if(v)p.icon=v.value;
      p.title=p.title||{};v=document.getElementById("field-philosophy."+i+".title.en"); if(v)p.title.en=v.value;v=document.getElementById("field-philosophy."+i+".title.ar"); if(v)p.title.ar=v.value;
      p.text=p.text||{};v=document.getElementById("field-philosophy."+i+".text.en"); if(v)p.text.en=v.value;v=document.getElementById("field-philosophy."+i+".text.ar"); if(v)p.text.ar=v.value;
    });
    // Projects helper
    function readProj(arr,path){
      arr=arr||[];
      arr.forEach(function(p,i){
        v=document.getElementById("field-"+path+"."+i+".id"); if(v)p.id=v.value;
        v=document.getElementById("field-"+path+"."+i+".title"); if(v)p.title=v.value;
        v=document.getElementById("field-"+path+"."+i+".titleAr"); if(v)p.titleAr=v.value;
        v=document.getElementById("field-"+path+"."+i+".brief"); if(v)p.brief=v.value;
        v=document.getElementById("field-"+path+"."+i+".role"); if(v)p.role=v.value;
        v=document.getElementById("field-"+path+"."+i+".tools"); if(v)p.tools=v.value.split(",").map(function(s){return s.trim();}).filter(Boolean);
        v=document.getElementById("field-"+path+"."+i+".challenge"); if(v)p.challenge=v.value;
        v=document.getElementById("field-"+path+"."+i+".approach"); if(v)p.approach=v.value;
        v=document.getElementById("field-"+path+"."+i+".description"); if(v)p.description=v.value;
        v=document.getElementById("field-"+path+"."+i+".descriptionAr"); if(v)p.descriptionAr=v.value;
        v=document.getElementById("field-"+path+"."+i+".tags"); if(v)p.tags=v.value.split(",").map(function(s){return s.trim();}).filter(Boolean);
        v=document.getElementById("field-"+path+"."+i+".duration"); if(v)p.duration=v.value;
        v=document.getElementById("field-"+path+"."+i+".thumbnail"); if(v)p.thumbnail=v.value;
        v=document.getElementById("field-"+path+"."+i+".embedUrl"); if(v)p.embedUrl=v.value;
        v=document.getElementById("field-"+path+"."+i+".year"); if(v)p.year=v.value;
        v=document.getElementById("field-"+path+"."+i+".featured"); if(v)p.featured=v.checked;
        v=document.getElementById("field-"+path+"."+i+".orientation"); if(v)p.orientation=v.value;
      });
    }
    readProj(c.longForm,"longForm");readProj(c.shortForm,"shortForm");
    // Showreel
    c.showreel=c.showreel||{};
    c.showreel.title=c.showreel.title||{};
    v=document.getElementById("field-showreel.title.en"); if(v)c.showreel.title.en=v.value;
    v=document.getElementById("field-showreel.title.ar"); if(v)c.showreel.title.ar=v.value;
    v=document.getElementById("field-showreel.url"); if(v)c.showreel.url=v.value;
    v=document.getElementById("field-showreel.poster"); if(v)c.showreel.poster=v.value;
    // FAQ
    c.faq=c.faq||[];
    c.faq.forEach(function(f,i){
      f.question=f.question||{};v=document.getElementById("field-faq."+i+".question.en"); if(v)f.question.en=v.value;v=document.getElementById("field-faq."+i+".question.ar"); if(v)f.question.ar=v.value;
      f.answer=f.answer||{};v=document.getElementById("field-faq."+i+".answer.en"); if(v)f.answer.en=v.value;v=document.getElementById("field-faq."+i+".answer.ar"); if(v)f.answer.ar=v.value;
    });
    // Contact
    c.contact=c.contact||{};
    v=document.getElementById("field-contact.whatsapp"); if(v)c.contact.whatsapp=v.value;
    v=document.getElementById("field-contact.email"); if(v)c.contact.email=v.value;
    v=document.getElementById("field-contact.receiveMethod"); if(v)c.contact.receiveMethod=v.value;
    c.socials=c.socials||[];
    c.socials.forEach(function(s,i){v=document.getElementById("field-socials."+i+".name"); if(v)s.name=v.value;v=document.getElementById("field-socials."+i+".url"); if(v)s.url=v.value;});
    // Nav
    c.nav=c.nav||[];
    c.nav.forEach(function(n,i){
      v=document.getElementById("field-nav."+i+".href"); if(v)n.href=v.value;
      n.label=n.label||{};v=document.getElementById("field-nav."+i+".label.en"); if(v)n.label.en=v.value;v=document.getElementById("field-nav."+i+".label.ar"); if(v)n.label.ar=v.value;
    });
    state.config=c;
    save();
  }

  // ══════════════════════════════════════════════════════
  //  PREVIEW / DOWNLOAD / COPY
  // ══════════════════════════════════════════════════════
  function preview() {
    apply();
    var iframe = document.getElementById("prev-frame");
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = "prev-frame";
      iframe.style.cssText = "position:fixed;inset:0;width:100%;height:100%;border:none;z-index:99999;background:#000";
      document.body.appendChild(iframe);
    }
    iframe.src = "index.html";
    document.getElementById("close-btn").style.display = "block";
  }
  function closePreview() {
    var iframe = document.getElementById("prev-frame");
    if (iframe) iframe.remove();
    document.getElementById("close-btn").style.display = "none";
    localStorage.removeItem(LS_KEY);
  }
  function download() {
    apply();
    var code = "const SITE = " + JSON.stringify(state.config, null, 2) + ";";
    var blob = new Blob([code], { type: "text/plain" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "config.js";
    a.click();
  }
  function copyConfig() {
    apply();
    var code = "const SITE = " + JSON.stringify(state.config, null, 2) + ";";
    navigator.clipboard.writeText(code).then(function () {
      var toast = document.getElementById("toast");
      toast.textContent = "Copied to clipboard!";
      toast.classList.add("show");
      setTimeout(function () { toast.classList.remove("show"); toast.textContent = "Saved to memory."; }, 2000);
    }).catch(function () { download(); });
  }

  // ══════════════════════════════════════════════════════
  //  INIT
  // ══════════════════════════════════════════════════════
  document.addEventListener("DOMContentLoaded", function () {
    load();
    render();
    document.getElementById("preview-btn").addEventListener("click", preview);
    document.getElementById("close-btn").addEventListener("click", closePreview);
    document.getElementById("download-btn").addEventListener("click", download);
    document.getElementById("copy-btn").addEventListener("click", copyConfig);
    document.getElementById("reset-btn").addEventListener("click", reset);
    document.getElementById("clear-btn").addEventListener("click", resetAll);
    window.addEventListener("beforeunload", function () { apply(); });
  });
})();

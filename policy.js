(function () {
  "use strict";

  var LS_THEME = "motaz-theme";
  var LS_LANG = "motaz-lang";

  var TRANSLATIONS = {
    back: { en: "Back to Portfolio", ar: "العودة إلى المعرض" },
    title: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    updated: { en: "Last updated: November 2026", ar: "آخر تحديث: نوفمبر 2026" },
    h1: { en: "1. Information I Collect", ar: "1. المعلومات التي أجمعها" },
    p1: { en: "This portfolio website is a personal showcase. I do not collect personal data automatically. The only information collected is what you voluntarily provide through the contact form:", ar: "هذا الموقع الشخصي لعرض أعمالني. لا أجمع بيانات شخصية تلقائياً. المعلومات الوحيدة التي تُجمع هي ما تقدمه طوعاً عبر نموذج التواصل:" },
    li1a: { en: "Your name", ar: "اسمك" },
    li1b: { en: "Your email address", ar: "بريدك الإلكتروني" },
    li1c: { en: "Your message", ar: "رسالتك" },
    h2: { en: "2. How I Use Your Information", ar: "2. كيف أستخدم معلوماتك" },
    p2: { en: "The information you submit through the contact form reaches me only through the channel you choose: email (delivered to my inbox by FormSubmit) or WhatsApp. In both cases it is used solely to respond to your inquiry. I do not store, sell, or share your data with third parties.", ar: "المعلومات التي ترسلها عبر نموذج التواصل تصل إليّ عبر القناة التي تختارها فقط: البريد الإلكتروني (يوصّلها FormSubmit إلى بريدي) أو واتساب. وفي الحالتين تُستخدم فقط للرد على استفسارك. لا أخزن أو أبيع أو أشارك بياناتك مع أطراف ثالثة." },
    h3: { en: "3. Analytics", ar: "3. التحليلات" },
    p3: { en: 'This site uses <a href="https://www.goatcounter.com/" target="_blank" rel="noopener">GoatCounter</a>, a privacy-friendly analytics tool. GoatCounter collects anonymous, aggregated data such as:', ar: 'يستخدم هذا الموقع <a href="https://www.goatcounter.com/" target="_blank" rel="noopener">GoatCounter</a>، أداة تحليلات صديقة للخصوصية. يجمع GoatCounter بيانات مجهولة المصدر ومجمعة مثل:' },
    li3a: { en: "Pages visited", ar: "الصفحات التي تمت زيارتها" },
    li3b: { en: "Referrers", ar: "المراجع" },
    li3c: { en: "Browser type", ar: "نوع المتصفح" },
    li3d: { en: "Country (approximate, based on IP)", ar: "البلد (تقريبياً بناءً على IP)" },
    p3b: { en: "GoatCounter does <strong>not</strong> use cookies and does <strong>not</strong> track individual users across sites.", ar: "GoatCounter <strong>لا</strong> يستخدم ملفات تعريف الارتباط و<strong>لا</strong> يتعقب المستخدمين عبر المواقع." },
    h4: { en: "4. Cookies", ar: "4. ملفات تعريف الارتباط" },
    p4: { en: "This website does not use any cookies except for GoatCounter's optional cookie-free analytics. No advertising or tracking cookies are used.", ar: "لا يستخدم هذا الموقع أي ملفات تعريف ارتباط باستثناء تحليلات GoatCounter بدون ملفات تعريف. لا تُستخدم ملفات تعريف تتبع أو إعلانات." },
    h5: { en: "5. Third-Party Services", ar: "5. الخدمات من أطراف ثالثة" },
    li5a: { en: "<strong>YouTube</strong> — embedded videos may set cookies when played.", ar: "<strong>YouTube</strong> — مقاطع الفيديو المضمنة قد تضع ملفات تعريف عند التشغيل." },
    li5b: { en: "<strong>WhatsApp</strong> — clicking the WhatsApp link opens an external site with its own privacy policy.", ar: "<strong>واتساب</strong> — رابط واتساب يفتح موقع خارجياً بخصوصيته الخاصة." },
    li5c: { en: "<strong>Instagram</strong> — external link with its own privacy policy.", ar: "<strong>إنستغرام</strong> — رابط خارجي بخصوصيته الخاصة." },
    li5d: { en: "<strong>FormSubmit</strong> — the contact form's email channel is delivered by FormSubmit, so the message passes through their servers before reaching my inbox.", ar: "<strong>FormSubmit</strong> — قناة البريد في نموذج التواصل تُوصَّل عبر FormSubmit، فتمر الرسالة بخوادمه قبل وصولها إلى بريدي." },
    h6: { en: "6. Data Security", ar: "6. أمن البيانات" },
    p6: { en: "This website is hosted on Vercel with HTTPS encryption enabled by default. While I take reasonable measures to protect the site, no method of transmission over the Internet is 100% secure.", ar: "يُستضاف هذا الموقع على Vercel مع تشفير HTTPS مفعّلاً بشكل افتراضي. رغم أنني أتخذ تدابير معقولة لحماية الموقع، إلا أن أي طريقة نقل عبر الإنترنت ليست آمنة بنسبة 100%." },
    h7: { en: "7. Children's Privacy", ar: "7. خصوصية الأطفال" },
    p7: { en: "This website is not directed at children under 13 and does not knowingly collect personal information from children.", ar: "هذا الموقع غير موجه للأطفال تحت سن 13 ولا يجمع عن علم معلومات شخصية من الأطفال." },
    h8: { en: "8. Changes to This Policy", ar: "8. التغييرات على هذه السياسة" },
    p8: { en: "I may update this privacy policy from time to time. Any changes will be reflected on this page with an updated date.", ar: "قد أُحدّث سياسة الخصوصية هذه من وقت لآخر. انعكاس أي تغييرات سيكون على هذه الصفحة مع تاريخ مُحدّث." },
    h9: { en: "9. Contact", ar: "9. التواصل" },
    p9: { en: "If you have questions about this privacy policy, you can reach me via:", ar: "إذا كانت لديك أسئلة حول سياسة الخصوصية هذه، يمكنك التواصل معي عبر:" }
  };

  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  var lang = read(LS_LANG) || "en";
  var theme = read(LS_THEME) || "dark";

  function applyLang(l) {
    lang = l;
    write(LS_LANG, l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    document.title = l === "ar" ? "سياسة الخصوصية — Motaz" : "Privacy Policy — Motaz";
    var btn = document.getElementById("langToggle");
    if (btn) {
      btn.textContent = l === "ar" ? "EN" : "ع";
      btn.title = l === "ar" ? "English" : "العربية";
    }
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.dataset.i18n;
      if (TRANSLATIONS[key]) el.innerHTML = TRANSLATIONS[key][l] || TRANSLATIONS[key].en;
    });
  }

  function applyTheme(mode) {
    document.body.dataset.theme = mode;
    write(LS_THEME, mode);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = mode === "light" ? "#F8FAFC" : "#090909";
  }

  applyTheme(theme);
  applyLang(lang);

  var themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      applyTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
    });
  }
  var langBtn = document.getElementById("langToggle");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      applyLang(lang === "ar" ? "en" : "ar");
    });
  }
})();
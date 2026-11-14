(function () {
  "use strict";

  var TR = {
    msg: { en: "This page doesn't exist. Let's get you back.", ar: "هذه الصفحة غير موجودة. دعنا نعيدك." },
    btn: { en: "Back to Portfolio", ar: "العودة إلى المعرض" }
  };

  var lang;
  try { lang = localStorage.getItem("motaz-lang") || "en"; } catch (e) { lang = "en"; }

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = "404 — Motaz";

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.dataset.i18n;
    if (TR[key]) el.textContent = TR[key][lang] || TR[key].en;
  });
})();
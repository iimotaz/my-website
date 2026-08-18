/* ==========================================================
   config.js - ملف إعدادات موقع Motaz
   تم إنشاؤه من لوحة التعديل (edit.html) - عدّل منه مباشرة
   ========================================================== */

const SITE = {
  "language": "en",
  "font": "Apple",
  "accent": "blue",
  "theme": "dark",
  "tagline": {
    "ar": "كل شيء صُنع بحب",
    "en": "Everything made with love"
  },
  "name": "Motaz",
  "logoLetter": "M",
  "metaTitle": {
    "ar": "Motaz | فيديو إيديتور",
    "en": "Motaz — Video Editor"
  },
  "avatar": "assets/avatar.png",
  "location": {
    "ar": "الجزائر",
    "en": "Algeria"
  },
  "languages": {
    "ar": "الإنجليزية، العربية",
    "en": "English, Arabic"
  },
  "heroDesc": {
    "ar": "محرر فيديو للمقاطع الطويلة والقصيرة لصناع المحتوى والإعلانات الترويجية. إبراز هويتك التجارية من خلال محتوى فيديو جذاب يخطف الأنظار ويحقق نتائج ملموسة.",
    "en": "Long-form and short-form video editor for content creators and promotional videos. Bringing your brand to life through engaging video content that captures attention and delivers results."
  },
  "availability": {
    "available": false,
    "label": {
      "ar": "متاح للعمل",
      "en": "Available for work"
    },
    "unavailableLabel": {
      "ar": "غير متاح للعمل حاليًا",
      "en": "Not available for work"
    }
  },
  "stats": [],
  "toolsSection": {
    "editing": {
      "ar": "أدوات المونتاج",
      "en": "Editing Tools"
    },
    "ai": {
      "ar": "أدوات الذكاء الاصطناعي",
      "en": "AI Tools"
    }
  },
  "editingTools": [
    {
      "name": "Adobe Premiere Pro",
      "icon": "pr"
    },
    {
      "name": "Adobe After Effects",
      "icon": "ae"
    }
  ],
  "aiTools": [],
  "editedFor": {
    "title": {
      "ar": "حررت لـ",
      "en": "Edited For"
    },
    "desc": {
      "ar": "صناع محتوى وقنوات وعلامات تجارية تشرفت بالعمل معهم وتطوير محتواهم.",
      "en": "Creators, channels and brands I've had the pleasure of crafting videos for."
    }
  },
  "clients": [
    {
      "id": "client-1",
      "name": "Yaser Samer",
      "handle": "@yasersamer",
      "avatar": "",
      "url": "https://portfolio.malloy.sg/yasersamer",
      "platform": "youtube",
      "tag": "Creator"
    }
  ],
  "nav": [
    {
      "href": "#home",
      "label": {
        "ar": "الرئيسية",
        "en": "Home"
      }
    },
    {
      "href": "#edited-for",
      "label": {
        "ar": "العملاء",
        "en": "Edited For"
      }
    },
    {
      "href": "#long-form",
      "label": {
        "ar": "الأعمال الطويلة",
        "en": "Long Form"
      }
    },
    {
      "href": "#short-form",
      "label": {
        "ar": "الأعمال القصيرة",
        "en": "Short Form"
      }
    },
    {
      "href": "#testimonials",
      "label": {
        "ar": "آراء العملاء",
        "en": "Testimonials"
      }
    },
    {
      "href": "#contact",
      "label": {
        "ar": "تواصل",
        "en": "Contact"
      }
    }
  ],
  "sections": {
    "long": {
      "title": {
        "ar": "الأعمال الطويلة",
        "en": "Long Form"
      },
      "desc": {
        "ar": "تحريرات كاملة حيث تحمل القصة والإيقاع والصوت القطعة بأكملها.",
        "en": "Full edits where story, pacing and sound carry the whole piece."
      }
    },
    "short": {
      "title": {
        "ar": "الأعمال القصيرة",
        "en": "Short Form"
      },
      "desc": {
        "ar": "تحريرات عمودية مصممة لإيقاف التمرير — خطافات وتسارعات وصوت قوي.",
        "en": "Vertical edits made to stop the scroll — hooks, speed ramps and punchy sound."
      }
    },
    "process": {
      "title": {
        "ar": "ماذا أقدم",
        "en": "What I Do"
      }
    }
  },
  "longForm": [
    {
      "id": "lf-1",
      "title": "Night City — Cinematic Edit",
      "titleAr": "مدينة الليل — تحرير سينمائي",
      "description": "A moody city walk cut to a slow-building score. Colour graded for deep blacks and neon spill.",
      "descriptionAr": "جولة في مدينة ممطرة مقطوعة على موسيقى متصاعدة. تصحيح ألوان لدرجات داكنة عميقة وانعكاسات نيون.",
      "tags": [
        "Cinematic",
        "Colour grade",
        "Sound design"
      ],
      "duration": "8:12",
      "thumbnail": "assets/thumb-long-1.jpg",
      "embedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      "id": "lf-2",
      "title": "The Grind — Training Documentary",
      "titleAr": "المثابرة — فيلم وثائقي عن التدريب",
      "description": "Short documentary following a training block. Interview cut against b-roll and ambient sound.",
      "descriptionAr": "فيلم وثائقي قصير يتبع فترة تدريب. مقابلات مقطوعة بين لقطات حية وصوت محيطي.",
      "tags": [
        "Documentary",
        "Storytelling",
        "B-roll"
      ],
      "duration": "12:40",
      "thumbnail": "assets/thumb-long-2.jpg",
      "embedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      "id": "lf-3",
      "title": "Motion Study — Light & Type",
      "titleAr": "دراسة الحركة — ضوء وطابع",
      "description": "An experiment in motion graphics: animated typography, light trails and beat-matched cuts.",
      "descriptionAr": "تجربة في رسومات الحركة: طابع متحرك، آثار ضوئية وقصات متوافقة مع الإيقاع.",
      "tags": [
        "Motion graphics",
        "Typography",
        "Experimental"
      ],
      "duration": "4:05",
      "thumbnail": "assets/thumb-long-3.jpg",
      "embedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ],
  "showreel": {
    "title": {
      "ar": "أبرز أعمالي",
      "en": "Showreel"
    },
    "url": "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "shortForm": [
    {
      "id": "sf-1",
      "title": "Edit Like This",
      "titleAr": "حرر هكذا",
      "description": "A 30-second breakdown of my timeline workflow.",
      "descriptionAr": "شرح 30 ثانية لطريقة عملي على الجدول الزمني.",
      "tags": [
        "Tutorial"
      ],
      "duration": "0:30",
      "thumbnail": "assets/thumb-short-1.jpg",
      "embedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      "id": "sf-2",
      "title": "Street Session",
      "titleAr": "جلسة شارع",
      "description": "Speed ramps and impact frames cut to the beat.",
      "descriptionAr": "تسارعات وإطارات صادمة مقطوعة على الإيقاع.",
      "tags": [
        "Sports"
      ],
      "duration": "0:18",
      "thumbnail": "assets/thumb-short-2.jpg",
      "embedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      "id": "sf-3",
      "title": "Round One",
      "titleAr": "الجولة الأولى",
      "description": "Hard cuts, punch sound design, silhouette lighting.",
      "descriptionAr": "قصات حادة، تصميم صوتي قوي، إضاءة ظلال.",
      "tags": [
        "Sports"
      ],
      "duration": "0:24",
      "thumbnail": "assets/thumb-short-3.jpg",
      "embedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      "id": "sf-4",
      "title": "Morning Ritual",
      "titleAr": "طقوس الصباح",
      "description": "Macro b-roll and satisfying transitions.",
      "descriptionAr": "لقطات ماكرو وانتقالات مريحة للعين.",
      "tags": [
        "Lifestyle"
      ],
      "duration": "0:21",
      "thumbnail": "assets/thumb-short-4.jpg",
      "embedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ],
  "services": [],
  "process": [],
  "contact": {
    "whatsapp": "213666873109",
    "email": "motazeditroforbusiness@gmail.com",
    "receiveMethod": "whatsapp"
  },
  "testimonials": [
    {
      "id": "tm-1",
      "name": "Yaser Samer",
      "role": {
        "ar": "صانع محتوى",
        "en": "Content Creator"
      },
      "text": {
        "ar": "مونتاج احترافي وملتزم بالمواعيد. حوّل لقطاتي الخام إلى فيديو نهائي تجاوزت نتيجته توقعاتي.",
        "en": "Professional editing, always on time. He turned my raw footage into a final video that exceeded my expectations."
      },
      "proof": "",
      "avatar": ""
    },
    {
      "id": "tm-2",
      "name": "Apex Studio",
      "role": {
        "ar": "استوديو إنتاج",
        "en": "Production Studio"
      },
      "text": {
        "ar": "تعامل مع عدة مشاريع باحترافية حقيقية — إيقاع ممتاز وحس تصميمي عالٍ.",
        "en": "Handled multiple projects with real professionalism — great pacing and strong design sense."
      },
      "avatar": ""
    }
  ],
  "socials": [
    {
      "name": "email",
      "url": "https://mail.google.com/mail/?view=cm&fs=1&to=motazeditroforbusiness@gmail.com"
    },
    {
      "name": "instagram",
      "url": "https://www.instagram.com/islameditro/"
    }
  ]
};

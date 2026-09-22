/* ============================================================================
   PORTFOLIO — M & M  |  Moataz Mohamed
   الملف الرئيسي للجافاسكربت (script.js) — مسؤول عن:
     1) الترجمة بين العربية والإنجليزية (Language / i18n)
     2) تبديل الوضع اللي/الأبيض (Theme)
     3) شريط البحث وتمييز النتائج (Search)
     4) تسجيل الدخول المحلي (Sign In)
     5) لوحة بيانات المطور (Developer Panel)
     6) كارت المشاريع (Portfolio)
     7) شاشة التحميل (Preloader)
   ============================================================================ */

'use strict';

/* ============================================================================
   1) الترجمة (Translations)
   كل مفتاح هنا بيتطابق مع data-i18n أو data-i18n-placeholder في index.html
   ============================================================================ */
const translations = {
  /* ---------------------------------- العربية ---------------------------------- */
  ar: {
    /* الهيدر والتنقل */
    home: 'الرئيسية',
    about: 'عني',
    portfolio: 'المشاريع',
    contact: 'تواصل',
    signin: 'تسجيل الدخول',
    search: 'بحث...',

    /* نافذة تسجيل الدخول */
    signinTitle: 'تسجيل الدخول',
    signinSubtitle: 'استخدم بريدك الإلكتروني أو رقم الهاتف للمتابعة.',
    signinFieldLabel: 'البريد الإلكتروني أو رقم الهاتف',
    signinPlaceholder: 'البريد الإلكتروني أو رقم الهاتف',
    signinSubmit: 'متابعة',
    signinError: 'يرجى إدخال بريد إلكتروني أو رقم هاتف صحيح.',
    signinSuccess: 'تم تسجيل الدخول بنجاح.',

    /* لوحة المطور */
    developerView: 'بيانات المطور',
    developerTitle: 'تسجيلات المطور',
    developerClear: 'مسح',

    /* قسم الهيرو */
    welcome: 'مرحبًا! أنا معتز محمد',
    heroTitle: 'ملفي الشخصي، سيرتي الذاتية، ومشاريعي البرمجية كلهم في مكان واحد',
    heroDescription: 'أنا طالب IT شغوف بالبرمجة والتقنية وبناء الأشياء التي تحدث تأثيرًا. أتعلم باستمرار وأحسن مهاراتي وأحوّل الأفكار إلى مشاريع حقيقية.',
    viewWork: 'عرض الأعمال',
    letsTalk: 'تحدث معي',
    downloadCv: 'تحميل السيرة الذاتية',

    /* كارت المهارات داخل الهيرو */
    itStudent: 'طالب IT',
    turnIdeas: 'تحويل الأفكار إلى مشاريع حقيقية',
    cardText: 'نتعلم اليوم، ونقود الغد. نركز على تطوير البرمجيات، تطبيقات الويب، وهندسة قواعد البيانات.',
    programming: 'البرمجة',
    cleanScalable: 'نظيف وقابل للتطوير',
    webDev: 'تطوير الويب',
    responsiveApps: 'تطبيقات متجاوبة',
    databases: 'قواعد البيانات',
    sqlSystems: 'SQL والأنظمة',
    itDepartment: 'قسم IT',
    networksLogic: 'الشبكات والمنطق',
    keepLearning: 'استمر في التعلم، واستمر في النمو',

    /* قسم من أنا */
    aboutTitle: 'من أنا',
    education: 'التعليم',
    educationText: 'طالب IT يبني قاعدة قوية في علوم الحاسوب والأنظمة وهندسة البرمجيات.',
    development: 'التطوير',
    developmentText: 'أقوم بإنشاء تطبيقات نظيفة ومتجاوبة وقوية باستخدام تقنيات الويب الحديثة.',
    goals: 'الأهداف',
    goalsText: 'أتعلم باستمرار لحل المشكلات المعقدة وتقديم حلول رقمية عالية الجودة.',

    /* قسم الشهادات */
    certificates: 'الشهادات',
    certificatesText: 'شهاداتي المهنية وانتهاء الدورات التي أكملتها.',
    html: 'HTML',
    css: 'CSS',
    java: 'JavaScript',
    htmlNote: 'هذه الشهادة تعكس أهمية تعلم أساسيات تطوير الويب وبناء قاعدة قوية في HTML.',
    cssNote: 'هذه الشهادة تعكس أهمية إتقان التصميم، التخطيط، الاستجابة، والتنسيق البصري في تطوير المواقع الحديثة.',
    beforeBrandTitle: 'حدث Before Brand',
    beforeBrandDate: '27 أغسطس 2026',
    issuerLabel: 'المصدر:',
    beforeBrandIssuer: 'أكاديمية العربية وفريق Before Brand',
    locationLabel: 'المكان:',
    beforeBrandLocation: 'الإسكندرية، مصر',
    completed2026: 'مكتمل في 2026',
    completed2025: 'مكتمل في 2025',
    comingSoon: 'قريبًا',
    viewLabel: 'عرض',
    downloadLabel: 'تحميل',
    javaNote: 'شهادة JavaScript قادمة قريبًا، وسيتم تحديث هذه البطاقة بصورة الشهادة الرسمية عند توفرها.',
    javascriptnote: 'هذه الشهادة تعكس إتمام دورة تمهيدية في JavaScript تشمل التعامل مع DOM والأحداث ومنطق البرمجة الأساسي.',

    /* قسم المشاريع */
    portfolioKicker: 'مشروع مميز',
    portfolioTitle: 'المشاريع',
    projectTag: 'أول مشروع',
    projectName: 'موقع الملف الشخصي',
    projectDescription: 'موقع شخصي حديث بتصميم متجاوب، إمكانية تبديل اللغة، وقسم عرض الشهادات.',
    viewProject: 'عرض المشروع',
    githubProject: 'جيت هاب',
    changeProject: 'تغيير المشروع',

    /* التواصل */
    contactKicker: 'دعنا نتواصل',
    contactTitle: 'هل تحتاج إلى مشروع أو تعاون أو مجرد دردشة سريعة؟',
    contactButton: 'تواصل معي',

    /* الفوتر: الجملة الكرييتف + مواقع التواصل + الحقوق */
    footerQuote: 'صُمِّم وطُوِّر بكل شغف | Designed & Developed with passion',
    footerSocialTitle: 'خلّينا على تواصل دايمًا',
    footerSocialSubtitle: 'تابعني على مواقع التواصل — دايمًا مبسوط أتعرف على ناس جديدة.',
    footerCredo: 'بنحوّل القهوة لكود، والأفكار لواقع.',
    allRightsReserved: '© 2026 معتز محمد. جميع الحقوق محفوظة.',
    footerSignature: 'مكتوب سطر بسطر بكل شغف — من الإسكندرية، مصر 🇪🇬',

    /* مساعد الذكاء الاصطناعي */
    aiTitle: 'مساعد M & M الذكي',
    aiSubtitle: 'اسألني عن معتز، مشاريعه، مهاراته، أو أي حاجة عن الموقع.',
    aiPlaceholder: 'اسأل الذكاء الاصطناعي...',
    aiSend: 'إرسال',
    aiThinking: '...جاري التفكير',
    aiWaiting: 'الإجابة ستظهر هنا...',
    aiEmpty: 'من فضلك اكتب سؤال أولًا.',
    aiError: 'تعذر الاتصال بالمساعد، تحقق من اتصال الإنترنت وحاول تاني.',
    aiOffline: 'المساعد غير متاح حاليًا.',

    /* الإعدادات */
    settings: 'الإعدادات',
    primaryMode: 'الوضع الأساسي',
    whiteMode: 'الوضع الأبيض'
  },

  /* ---------------------------------- English ---------------------------------- */
  en: {
    /* Header & Navigation */
    home: 'Home',
    about: 'About Me',
    portfolio: 'Portfolio',
    contact: 'Contact',
    signin: 'Sign In',
    search: 'Search...',

    /* Sign In modal */
    signinTitle: 'Sign In',
    signinSubtitle: 'Use your email or phone number to continue.',
    signinFieldLabel: 'Email or phone number',
    signinPlaceholder: 'Email or phone number',
    signinSubmit: 'Continue',
    signinError: 'Please enter a valid email or phone number.',
    signinSuccess: 'You have signed in successfully.',

    /* Developer panel */
    developerView: 'Developer Data',
    developerTitle: 'Developer Registrations',
    developerClear: 'Clear',

    /* Hero section */
    welcome: "Welcome! I'm Moataz Mohamed",
    heroTitle: 'My personal portfolio, CV, and software projects all in one place',
    heroDescription: "I'm an IT student passionate about programming, technology, and building things that make an impact. I'm constantly learning, improving my skills, and turning ideas into real projects.",
    viewWork: 'View Work',
    letsTalk: "Let's Talk",
    downloadCv: 'Download CV',

    /* Skills card inside hero */
    itStudent: 'IT Student',
    turnIdeas: 'Turning Ideas Into Real Projects',
    cardText: 'Learning today, leading tomorrow. Focused on software development, web applications, and database engineering.',
    programming: 'Programming',
    cleanScalable: 'Clean & Scalable',
    webDev: 'Web Dev',
    responsiveApps: 'Responsive Apps',
    databases: 'Databases',
    sqlSystems: 'SQL & Systems',
    itDepartment: 'IT Department',
    networksLogic: 'Networks & Logic',
    keepLearning: 'Keep Learning, Keep Growing',

    /* About section */
    aboutTitle: 'About Me',
    education: 'Education',
    educationText: 'IT Student building a strong foundation in Computer Science, Systems, and Software Architecture.',
    development: 'Development',
    developmentText: 'Creating clean, responsive, and robust applications using modern programming web tech.',
    goals: 'Goals',
    goalsText: 'Continuously learning to solve complex problems and deliver high-quality digital solutions.',

    /* Certificates */
    certificates: 'Certificates',
    certificatesText: 'My professional certificates and course completions.',
    html: 'HTML',
    css: 'CSS',
    java: 'JavaScript',
    htmlNote: 'Completed an introductory HTML course covering structure, semantic tags, and HTML5 fundamentals.',
    cssNote: 'Completed a beginner CSS course focusing on styling, layout, responsiveness, and visual design basics.',
    beforeBrandTitle: 'Before Brand Event',
    beforeBrandDate: 'August 27, 2026',
    issuerLabel: 'Issuer:',
    beforeBrandIssuer: 'Arabian Academy & Before Brand Team',
    locationLabel: 'Location:',
    beforeBrandLocation: 'Alexandria, Egypt',
    completed2026: 'Completed in 2026',
    completed2025: 'Completed in 2025',
    comingSoon: 'Coming soon',
    viewLabel: 'View',
    downloadLabel: 'Download',
    javaNote: 'The JavaScript certificate is coming soon, and this card will be updated with the official certificate image once it becomes available.',
    javascriptnote: 'Completed an introductory JavaScript course covering dynamic scripting, DOM manipulation, event handling, and core programming logic.',

    /* Portfolio section */
    portfolioKicker: 'Featured Project',
    portfolioTitle: 'Projects',
    projectTag: 'First Project',
    projectName: 'Portfolio Website',
    projectDescription: 'A modern personal portfolio with a responsive interface, language switcher, and certificate display section.',
    viewProject: 'View Project',
    githubProject: 'GitHub',
    changeProject: 'Change Project',

    /* Contact */
    contactKicker: "Let's Connect",
    contactTitle: 'Need a project, collaboration, or just a quick chat?',
    contactButton: 'Contact Me',

    /* Footer: credo + social links + copyright */
    footerQuote: 'Designed & Developed with passion | صُمِّم وطُوِّر بكل شغف',
    footerSocialTitle: "Let's stay connected",
    footerSocialSubtitle: "Follow me on social media — I'm always happy to connect with new people.",
    footerCredo: 'Turning coffee into code, and ideas into reality.',
    allRightsReserved: '© 2026 Moataz Mohamed. All rights reserved.',
    footerSignature: 'Handcrafted line by line with passion — from Alexandria, Egypt 🇪🇬',

    /* AI Assistant */
    aiTitle: 'M & M AI Assistant',
    aiSubtitle: 'Ask me about Moataz, his projects, his skills, or anything on this site.',
    aiPlaceholder: 'Ask the AI assistant...',
    aiSend: 'Send',
    aiThinking: 'Thinking...',
    aiWaiting: 'The answer will appear here...',
    aiEmpty: 'Please type a question first.',
    aiError: 'Could not reach the assistant. Check your connection and try again.',
    aiOffline: 'The assistant is unavailable right now.',

    /* Settings */
    settings: 'Settings',
    primaryMode: 'Primary Mode',
    whiteMode: 'White Mode'
  }
};

/* ============================================================================
   2) بيانات المشاريع (Project Data)
   كل مشروع له نص عربي/إنجليزي + روابط زر "عرض المشروع" و"جيت هاب"
   ============================================================================ */
const projectData = [
  /* --- المشروع الأول: موقع الملف الشخصي --- */
  {
    tag: { ar: 'الأول', en: 'First' },
    name: { ar: 'موقع الملف الشخصي', en: 'Portfolio Website' },
    description: {
      ar: 'موقع شخصي حديث بتصميم متجاوب، إمكانية تبديل اللغة، وقسم عرض الشهادات.',
      en: 'A modern personal portfolio with a responsive interface, language switcher, and certificate display section.'
    },
    primaryText: { ar: 'عرض المشروع', en: 'View Project' },
    primaryLink: 'index.html',
    secondaryText: { ar: 'جيت هاب', en: 'GitHub' },
    secondaryLink: 'https://github.com/',
    previewImage: 'img/Screenshot 2026-09-22 133437.png'
  },

  /* --- المشروع الثاني: تافرا (متجر أزياء) --- */
  {
    tag: { ar: 'الثاني', en: 'Second' },
    name: { ar: 'تافرا - متجر أزياء', en: 'TAFRA - Fashion Store' },
    description: {
      ar: 'متجر أزياء إلكتروني بهوية بصرية فاخرة، يعرض تشكيلة تافرا مع تصميم عصري ومتجاوب.',
      en: 'An e-commerce fashion store with a luxury visual identity, showcasing the TAFRA collection with a modern, responsive design.'
    },
    primaryText: { ar: 'عرض المشروع', en: 'View Project' },
    primaryLink: 'https://mtzm2225-ship-it.github.io/12.tafra/',
    secondaryText: { ar: 'جيت هاب', en: 'GitHub' },
    secondaryLink: 'https://github.com/mtzm2225-ship-it/12.tafra',
    previewImage: 'img/Screenshot 2026-09-16 164001.png'
  },

  /* --- مشروع سيتم إضافته لاحقًا --- */
  {
    tag: { ar: 'قريبًا', en: 'Coming Soon' },
    name: { ar: 'قريبًا', en: 'Coming Soon' },
    description: {
      ar: 'سيتم إضافة هذا المشروع قريبًا.',
      en: 'This project will be added soon.'
    },
    primaryText: { ar: 'قريبًا', en: 'Coming Soon' },
    primaryLink: '#portfolio',
    secondaryText: { ar: 'قريبًا', en: 'Coming Soon' },
    secondaryLink: '#portfolio'
  }
];

/* ============================================================================
   3) مراجع عناصر الصفحة (DOM References)
   بنمسك كل العناصر مرة واحدة في الأول بدل ما ندوّر عليها كل مرة
   ============================================================================ */

/* --- الهيدر والتنقل --- */
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-links a');
const langButtons = document.querySelectorAll('.lang-btn');
const nightModeButton = document.querySelector('.night-mode-btn');

/* --- البحث --- */
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-btn');

/* --- تسجيل الدخول --- */
const signInButton = document.querySelector('.signin-btn');
const signInModal = document.querySelector('#signin-modal');
const signInForm = document.querySelector('#signin-form');
const signInInput = document.querySelector('#signin-identifier');
const signInMessage = document.querySelector('#signin-message');
const signInClose = document.querySelector('.signin-close');

/* --- لوحة المطور --- */
const developerToggle = document.querySelector('#developer-toggle');
const developerPanel = document.querySelector('#developer-panel');
const developerList = document.querySelector('#developer-list');
const developerClose = document.querySelector('.developer-close');
const developerClear = document.querySelector('.developer-clear');

/* --- عناصر الترجمة --- */
const i18nElements = document.querySelectorAll('[data-i18n]');
const i18nPlaceholders = document.querySelectorAll('[data-i18n-placeholder]');

/* --- كارت المشاريع --- */
const projectTag = document.querySelector('.project-tag');
const projectName = document.querySelector('.project-info h3');
const projectDescription = document.querySelector('.project-info p');
const projectCard = document.querySelector('.project-card');
const projectPrimaryBtn = document.querySelector('.project-btn.primary');
const projectSecondaryBtn = document.querySelector('.project-btn.secondary');
const projectChangeButton = document.querySelector('.project-btn.change');
const projectPrevButton = document.querySelector('.project-nav-btn.prev');
const projectNextButton = document.querySelector('.project-nav-btn.next');
const projectPreviewImage = document.querySelector('.project-preview-image');
const previewWindow = document.querySelector('.preview-window');

/* --- سلايدر الشهادات --- */
const certificatesList = document.querySelector('.certificates-list');
const scrollLeftButton = document.querySelector('.scroll-left');
const scrollRightButton = document.querySelector('.scroll-right');

/* --- الإعدادات المحفوظة في المتصفح --- */
const savedLanguage = localStorage.getItem('portfolioLanguage') || 'en';
const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';

/* رقم المشروع الحالي المعروض في الكارت */
let currentProjectIndex = 0;

/* ============================================================================
   4) أدوات مساعدة عامة (Helpers)
   ============================================================================ */

/**
 * قراءة اللغة الحالية المحفوظة في المتصفح
 * @returns {string} كود اللغة: 'ar' أو 'en'
 */
function getCurrentLanguage() {
  return localStorage.getItem('portfolioLanguage') || 'en';
}

/**
 * قراءة قاموس الترجمة الخاص باللغة المطلوبة
 * @param {string} language - كود اللغة
 * @returns {Object} قاموس الترجمة
 */
function getDictionary(language) {
  return translations[language] || translations.en;
}

/**
 * التحقق من صحة البريد الإلكتروني
 * @param {string} value - القيمة المدخلة
 * @returns {boolean} صحيح أم لا
 */
function isValidEmail(value) {
    if (!value || typeof value !== 'string') return false;
    
    // تعبير نمطي بسيط ومباشر بدون التراجع العكسي (Non-backtracking Regex)
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
    return emailRegex.test(value.trim());
}

/**س
 * التحقق من صحة رقم الهاتف
 * (من 10 إلى 15 رقم، ولا يكون كل الأرقام متشابهة)
 * @param {string} value - القيمة المدخلة
 * @returns {boolean} صحيح أم لا
 */
function isValidPhoneNumber(value) {
  const normalized = value.replace(/[\s\-+()]/g, '');

  /* لازم يكون أرقام فقط */
  if (!/^\d+$/.test(normalized)) {
    return false;
  }

  /* الطول المسموح به */
  if (normalized.length < 10 || normalized.length > 15) {
    return false;
  }

  /* رفض الأرقام المتكررة زي 1111 */
  if (/^(\d)\1+$/.test(normalized)) {
    return false;
  }

  return true;
}

/* ============================================================================
   5) الهيدر (Header Scroll State)
   بيضيف كلاس .scrolled على الهيدر عند النزول بالصفحة
   ============================================================================ */
if (header) {
  const updateHeaderScrollState = function () {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };

  updateHeaderScrollState();
  window.addEventListener('scroll', updateHeaderScrollState, { passive: true });
}

/* ============================================================================
   6) البحث (Search)
   بيدوّر على كلمة داخل الصفحة وبيحدد أول نتيجة ويوصل المستخدم ليها
   ============================================================================ */

/**
 * تنظيف النص قبل المقارنة (حروف صغيرة + توحيد المسافات)
 * @param {string} text - النص الخام
 * @returns {string} النص المنظّف
 */
function normalizeSearchText(text) {
  return (text || '').toLowerCase().normalize('NFKC').replace(/\s+/g, ' ').trim();
}

/** إزالة كل تمييز نتائج البحث القديم من الصفحة */
function clearSearchHighlights() {
  document.querySelectorAll('.search-match').forEach(function (element) {
    element.classList.remove('search-match');
  });
}

/** تنفيذ البحث: تمييز النتائج والانتقال لأول نتيجة */
function performSearch() {
  const query = normalizeSearchText(searchInput ? searchInput.value : '');
  clearSearchHighlights();

  /* لو خانة البحث فاضية مفيش حاجة نعملها */
  if (!query || !searchInput) {
    return;
  }

  let firstMatch = null;

  /* كل العناصر اللي ممكن ندوّر جواها */
  const searchTargets = document.querySelectorAll(
    '[data-i18n], .section-title, .project-tag, .project-info h3, .project-info p, ' +
    '.certificate-item h4, .certificate-note, .certificate-item p, .contact-strip h3, ' +
    '.contact-strip p, .main-title, .description, .welcome-pill span, .card-body h2, ' +
    '.card-text, .card-footer-motto span, .footer-quote'
  );

  searchTargets.forEach(function (element) {
    const text = normalizeSearchText(element.textContent);

    if (text.includes(query)) {
      element.classList.add('search-match');

      if (!firstMatch) {
        firstMatch = element;
      }
    }
  });

  /* ننقل المستخدم لأول نتيجة نلاقيها */
  if (firstMatch) {
    firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/* ربط البحث بالكتابة، الضغط على Enter، وزر البحث */
if (searchInput) {
  searchInput.addEventListener('input', performSearch);

  searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      performSearch();
    }
  });

  if (searchButton) {
    searchButton.addEventListener('click', function (event) {
      event.preventDefault();
      performSearch();
    });
  }
}

/* ============================================================================
   7) الثيم (Theme: الوضع الأساسي / الأبيض)
   ============================================================================ */

/** تحديث نص زر الوضع حسب الحالة الحالية واللغة */
function updateThemeButtonLabel() {
  const dictionary = getDictionary(getCurrentLanguage());
  const label = nightModeButton ? nightModeButton.querySelector('span') : null;

  if (label) {
    const isWhiteMode = document.body.classList.contains('light-mode');
    label.textContent = isWhiteMode ? dictionary.whiteMode : dictionary.primaryMode;
  }
}

/**
 * تطبيق الوضع (أبيض أو أساسي) وحفظه في المتصفح
 * @param {boolean} isWhiteMode - true للوضع الأبيض، false للوضع الأساسي
 */
function applyTheme(isWhiteMode) {
  document.body.classList.toggle('light-mode', isWhiteMode);

  if (nightModeButton) {
    nightModeButton.classList.toggle('is-active', isWhiteMode);
    nightModeButton.setAttribute('aria-pressed', String(isWhiteMode));
  }

  localStorage.setItem('portfolioTheme', isWhiteMode ? 'light' : 'dark');
  updateThemeButtonLabel();
}

/* زر تبديل الوضع */
if (nightModeButton) {
  nightModeButton.addEventListener('click', function () {
    applyTheme(!document.body.classList.contains('light-mode'));
  });
}

/* ============================================================================
   8) كارت المشاريع (Portfolio Card)
   ============================================================================ */

/**
 * تحديث محتوى كارت المشروع حسب المشروع الحالي واللغة
 * @param {string} [language] - كود اللغة (اختياري، وبيقرا من المتصفح لو مش موجود)
 */
function updateProjectCard(language) {
  const currentLanguage = language || getCurrentLanguage();
  const project = projectData[currentProjectIndex];

  /* حماية لو العناصر أو المشروع غير متاحين */
  if (!project || !projectCard || !projectTag || !projectName || !projectDescription) {
    return;
  }

  projectTag.textContent = project.tag[currentLanguage] || project.tag.en;
  projectName.textContent = project.name[currentLanguage] || project.name.en;
  projectDescription.textContent = project.description[currentLanguage] || project.description.en;

  /* تحديث صورة المعاينة حسب المشروع الحالي (لو المشروع له صورة) */
  if (projectPreviewImage) {
    if (project.previewImage) {
      projectPreviewImage.src = project.previewImage;
      projectPreviewImage.alt = project.name.en + ' preview';
      projectPreviewImage.style.display = 'block';

      if (previewWindow) {
        previewWindow.classList.add('has-image');
      }
    } else {
      /* المشروع من غير صورة (زي "قريبًا") — نخفي الصورة ونظهر الشكل الوهمي */
      projectPreviewImage.removeAttribute('src');
      projectPreviewImage.style.display = 'none';

      if (previewWindow) {
        previewWindow.classList.remove('has-image');
      }
    }
  }

  if (projectPrimaryBtn) {
    projectPrimaryBtn.textContent = project.primaryText[currentLanguage] || project.primaryText.en;
    projectPrimaryBtn.setAttribute('href', project.primaryLink);
  }

  if (projectSecondaryBtn) {
    projectSecondaryBtn.textContent = project.secondaryText[currentLanguage] || project.secondaryText.en;
    projectSecondaryBtn.setAttribute('href', project.secondaryLink);
  }
}

/* زر "تغيير المشروع" — بينقل للمشروع اللي بعده */
if (projectChangeButton) {
  projectChangeButton.addEventListener('click', function () {
    currentProjectIndex = (currentProjectIndex + 1) % projectData.length;
    updateProjectCard();
  });
}

/* أسهم التنقل بين المشاريع (السابق / التالي) */
if (projectPrevButton && projectNextButton) {
  projectPrevButton.addEventListener('click', function () {
    currentProjectIndex = (currentProjectIndex - 1 + projectData.length) % projectData.length;
    updateProjectCard();
  });

  projectNextButton.addEventListener('click', function () {
    currentProjectIndex = (currentProjectIndex + 1) % projectData.length;
    updateProjectCard();
  });
}

/* ============================================================================
   9) الترجمة (Language / i18n)
   ============================================================================ */

/**
 * تطبيق اللغة على كل الصفحة (النصوص + الـ placeholders + الاتجاه)
 * @param {string} language - كود اللغة: 'ar' أو 'en'
 */
function applyLanguage(language) {
  const dictionary = getDictionary(language);

  /* ترجمة كل العناصر اللي عندها data-i18n */
  i18nElements.forEach(function (element) {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  /* ترجمة كل الـ placeholders اللي عندها data-i18n-placeholder */
  i18nPlaceholders.forEach(function (element) {
    const key = element.dataset.i18nPlaceholder;
    if (dictionary[key]) {
      element.placeholder = dictionary[key];
    }
  });

  /* تحديد زر اللغة النشط */
  langButtons.forEach(function (button) {
    button.classList.toggle('active', button.dataset.lang === language);
  });

  /* نحفظ اللغة الأول عشان updateProjectCard تقراها صح */
  localStorage.setItem('portfolioLanguage', language);

  /* تحديث كارت المشروع + لغة الصفحة + نص زر الوضع */
  updateProjectCard(language);
  document.documentElement.lang = language;

  /* العربي بيتكتب من اليمين للشمال — الزر العائم واللوحة بيتقلبوا للجنب التاني */
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

  updateThemeButtonLabel();
}

/* أزرار تبديل اللغة AR / EN */
langButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    applyLanguage(button.dataset.lang);
  });
});

/* ============================================================================
   10) تسجيل الدخول (Sign In Modal)
   ============================================================================ */

/** فتح نافذة تسجيل الدخول */
function openSignInModal() {
  if (!signInModal) {
    return;
  }

  signInModal.classList.remove('hidden');
  signInModal.setAttribute('aria-hidden', 'false');

  /* نركّز على خانة الإدخال بعد ظهور النافذة */
  if (signInInput) {
    setTimeout(function () {
      signInInput.focus();
    }, 50);
  }
}

/** إغلاق نافذة تسجيل الدخول */
function closeSignInModal() {
  if (!signInModal) {
    return;
  }

  signInModal.classList.add('hidden');
  signInModal.setAttribute('aria-hidden', 'true');
}

if (signInButton) {
  signInButton.addEventListener('click', openSignInModal);
}

if (signInClose) {
  signInClose.addEventListener('click', closeSignInModal);
}

/* الإغلاق بالضغط على الخلفية المعتمة */
if (signInModal) {
  signInModal.addEventListener('click', function (event) {
    if (event.target === signInModal) {
      closeSignInModal();
    }
  });
}

/* ============================================================================
   11) تسجيلات المطور (Developer Registrations)
   ============================================================================ */

/**
 * قراءة التسجيلات المحفوظة من المتصفح
 * @returns {Array} مصفوفة التسجيلات
 */
function getRegistrations() {
  try {
    const saved = localStorage.getItem('portfolioRegistrations');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    /* لو البيانات محفوظة بشكل غلط نرجّع مصفوفة فاضية بدل ما الكود يقع */
    return [];
  }
}

/**
 * حفظ التسجيلات في المتصفح
 * @param {Array} registrations - مصفوفة التسجيلات
 */
function saveRegistrations(registrations) {
  localStorage.setItem('portfolioRegistrations', JSON.stringify(registrations));
}

/** عرض كل التسجيلات داخل لوحة المطور */
function renderDeveloperRegistrations() {
  if (!developerList) {
    return;
  }

  const registrations = getRegistrations();
  developerList.innerHTML = '';

  /* لو مفيش تسجيلات نعرض رسالة */
  if (!registrations.length) {
    const emptyItem = document.createElement('li');
    emptyItem.textContent = 'No registrations yet.';
    emptyItem.className = 'developer-empty';
    developerList.appendChild(emptyItem);
    return;
  }

  registrations.forEach(function (entry, index) {
    const item = document.createElement('li');
    item.className = 'developer-item';

    const label = document.createElement('span');
    label.textContent = '#' + (index + 1) + ' - ' + entry.identifier;

    /* بنحدد نوع رابط التواصل حسب المدخل (إيميل ولا رقم واتساب) */
    let actionLink = null;
    const trimmedIdentifier = (entry.identifier || '').trim();

    if (isValidEmail(trimmedIdentifier)) {
      actionLink = document.createElement('a');
      actionLink.href = 'mailto:' + trimmedIdentifier;
      actionLink.textContent = 'Email';
      actionLink.target = '_blank';
      actionLink.rel = 'noopener noreferrer';
      actionLink.className = 'developer-action';
    } else {
      const normalizedPhone = trimmedIdentifier.replace(/[^\d]/g, '');

      if (normalizedPhone.length >= 10 && normalizedPhone.length <= 15 && !/^(\d)\1+$/.test(normalizedPhone)) {
        actionLink = document.createElement('a');
        actionLink.href = 'https://wa.me/' + normalizedPhone;
        actionLink.textContent = 'WhatsApp';
        actionLink.target = '_blank';
        actionLink.rel = 'noopener noreferrer';
        actionLink.className = 'developer-action';
      }
    }

    item.appendChild(label);

    if (actionLink) {
      item.appendChild(actionLink);
    }

    developerList.appendChild(item);
  });
}

/** فتح لوحة المطور وعرض التسجيلات */
function openDeveloperPanel() {
  if (developerToggle) {
    developerToggle.classList.remove('hidden');
  }

  if (!developerPanel) {
    return;
  }

  developerPanel.classList.remove('hidden');
  developerPanel.setAttribute('aria-hidden', 'false');
  renderDeveloperRegistrations();
}

/** إغلاق لوحة المطور */
function closeDeveloperPanel() {
  if (!developerPanel) {
    return;
  }

  developerPanel.classList.add('hidden');
  developerPanel.setAttribute('aria-hidden', 'true');
}

if (developerToggle) {
  developerToggle.addEventListener('click', openDeveloperPanel);
}

if (developerClose) {
  developerClose.addEventListener('click', closeDeveloperPanel);
}

/* زر مسح كل التسجيلات */
if (developerClear) {
  developerClear.addEventListener('click', function () {
    saveRegistrations([]);
    renderDeveloperRegistrations();
  });
}

/* الإغلاق بالضغط على الخلفية المعتمة */
if (developerPanel) {
  developerPanel.addEventListener('click', function (event) {
    if (event.target === developerPanel) {
      closeDeveloperPanel();
    }
  });
}

/* اختصار لوحة المطور: Ctrl + Shift + R */
document.addEventListener('keydown', function (event) {
  const isDeveloperShortcut = (event.ctrlKey || event.metaKey) &&
    event.shiftKey &&
    event.key.toLowerCase() === 'r';

  if (isDeveloperShortcut) {
    event.preventDefault();
    openDeveloperPanel();
  }
});

/* ============================================================================
   12) إرسال نموذج تسجيل الدخول (Sign In Submit)
   بيدعم: الإيميل، رقم الهاتف، وكود المطور السري
   ============================================================================ */
if (signInForm && signInInput && signInMessage) {
  signInForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const identifier = signInInput.value.trim();
    const dictionary = getDictionary(getCurrentLanguage());

    /* كود المطور السري: بيفتح لوحة التسجيلات بدل تسجيل الدخول العادي */
    if (identifier === '23121975') {
      signInInput.value = '';
      closeSignInModal();
      openDeveloperPanel();
      return;
    }

    const isValidIdentifier = isValidEmail(identifier) || isValidPhoneNumber(identifier);

    /* لو المدخل غير صالح نعرض رسالة خطأ */
    if (!identifier || !isValidIdentifier) {
      signInMessage.textContent = dictionary.signinError;
      signInMessage.style.color = '#fca5a5';
      return;
    }

    /* نحفظ التسجيل الجديد (بحد أقصى 50 تسجيل) */
    const registrations = getRegistrations();
    registrations.unshift({ identifier: identifier, createdAt: new Date().toISOString() });
    saveRegistrations(registrations.slice(0, 10000));

    localStorage.setItem('portfolioUser', identifier);
    signInMessage.textContent = dictionary.signinSuccess;
    signInMessage.style.color = '#86efac';
    signInInput.value = '';

    /* نقفل النافذة بعد ثانية وربع */
    setTimeout(function () {
      closeSignInModal();
      signInMessage.textContent = '';
    }, 1200);
  });
}

/* ============================================================================
   13) شريط التنقل وسلايدر الشهادات (Navigation & Certificates Slider)
   ============================================================================ */

/* تحديد الرابط النشط عند الضغط عليه */
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.forEach(function (item) {
      item.classList.remove('active');
    });

    link.classList.add('active');
  });
});

/* أسهم تمرير قائمة الشهادات يمين وشمال */
if (scrollLeftButton && scrollRightButton && certificatesList) {
  scrollLeftButton.addEventListener('click', function () {
    certificatesList.scrollBy({ left: -260, behavior: 'smooth' });
  });

  scrollRightButton.addEventListener('click', function () {
    certificatesList.scrollBy({ left: 260, behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('techSlider');
  const prevBtn = document.getElementById('techPrevBtn');
  const nextBtn = document.getElementById('techNextBtn');

  if (slider && prevBtn && nextBtn) {
    // التمرير جهة اليمين أو اليسار بمقدار 200 بكسل
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: 200, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -200, behavior: 'smooth' });
    });
  }
});

/* ============================================================================
   14) شاشة التحميل (Preloader) + شاشة الاسم اللامع (Name Intro)
   ----------------------------------------------------------------------------
   الترتيب:
     شاشة التحميل  →  تختفي تمامًا  →  شاشة الاسم اللامع  →  الموقع عادي

   شاشة الاسم:
     • بتظهر بعد اختفاء شاشة التحميل بالكامل (مفيش تراكب بين الاتنين).
     • شعاع اللمعة بيعدّي على الاسم تلقائيًا في لوب.
     • حرّك الماوس على الاسم → اللمعة تستجيب (hover).
     • كليك على الاسم أو ضغط Enter → أفيكت ضوئي والاسم يتشال من الصفحة.
     • لو الزائر لا عمل حاجة، الشاشة تختفي لوحدها بعد مدة.
   ============================================================================ */

/* مدد العرض (بالميلي ثانية) — عدّل الأرقام دي لو حابب تطول/تقصّر */
const PRELOADER_FADE_TIME = 550;      /* مدة اختفاء شاشة التحميل (لازم تطابق الـ CSS) */
const NAME_INTRO_AUTO_HIDE = 6000;    /* اختفاء تلقائي لو الزائر ما داسش */
const NAME_INTRO_FADE_TIME = 700;     /* مدة اختفاء شاشة الاسم (لازم تطابق الـ CSS) */

/* عنصر شاشة الاسم */
const nameIntro = document.getElementById('name-intro');

/* عناصر التفاعل جوه شاشة الاسم */
const nameIntroText = nameIntro ? nameIntro.querySelector('.name-intro-text') : null;

/* حالة المقدمة */
let nameIntroReady = false;   /* بقت معروض وقابلة للتفاعل */
let nameIntroLeaving = false; /* بقت بتخرج (بنمنع أي تفاعل تاني) */
let nameIntroAutoTimer = null;

/* ----------------------------------------------------------------------------
   إخفاء/خروج شاشة الاسم
   ---------------------------------------------------------------------------- */

/**
 * إخفاء شاشة الاسم (لو خلصت لوحدها أو الزائر اختار يدخل)
 * @param {boolean} withEffect - true لو عايزين أفيكت الضوء قبل الخروج
 */
function hideNameIntro(withEffect) {
  if (!nameIntro || nameIntroLeaving) {
    return;
  }
  nameIntroLeaving = true;

  /* نلغي أي مؤقت تلقائي معلّق */
  if (nameIntroAutoTimer) {
    window.clearTimeout(nameIntroAutoTimer);
    nameIntroAutoTimer = null;
  }

  /* نسحب التركيز من شاشة الاسم */
  nameIntroReady = false;

  const fadeDuration = withEffect ? NAME_INTRO_FADE_TIME : NAME_INTRO_FADE_TIME;

  if (withEffect) {
    /* أفيكت الكليك/Enter: نبضة ضوئية + فلاش + الاسم يطير */
    nameIntro.classList.add('is-bursting', 'is-leaving');
  }

  /* نأخر الإخفاء التام عشان الأفيكت يبان */
  window.setTimeout(function () {
    nameIntro.classList.add('is-done');
    nameIntro.setAttribute('aria-hidden', 'true');
  }, withEffect ? 520 : 0);

  /* ننضّف العنصر من الصفحة بعد الاختفاء */
  window.setTimeout(function () {
    if (nameIntro && nameIntro.parentNode) {
      nameIntro.parentNode.removeChild(nameIntro);
    }
  }, (withEffect ? 520 : 0) + fadeDuration + 100);
}

/* ----------------------------------------------------------------------------
   تفاعل الماوس: اللمعة تستجيب لما المؤشر يمر على الاسم
   ---------------------------------------------------------------------------- */
if (nameIntro && nameIntroText) {
  nameIntroText.addEventListener('mouseenter', function () {
    if (nameIntroReady) {
      nameIntro.classList.add('is-name-hover');
    }
  });

  nameIntroText.addEventListener('mouseleave', function () {
    nameIntro.classList.remove('is-name-hover');
  });
}

/* ----------------------------------------------------------------------------
   الكليك على الاسم → أفيكت ودخول الموقع
   ---------------------------------------------------------------------------- */
if (nameIntroText) {
  nameIntroText.addEventListener('click', function () {
    if (!nameIntroReady) {
      return;
    }

    /* نبضة لحظية قبل الخروج */
    nameIntro.classList.add('is-pressing');
    window.setTimeout(function () {
      if (nameIntro) {
        nameIntro.classList.remove('is-pressing');
      }
    }, 160);

    hideNameIntro(true);
  });
}

/* ----------------------------------------------------------------------------
   ضغط Enter (أو Space) → نفس أفيكت الكليك
   ---------------------------------------------------------------------------- */
document.addEventListener('keydown', function (event) {
  if (!nameIntroReady) {
    return;
  }

  if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
    event.preventDefault();
    hideNameIntro(true);
  }
});

/* ----------------------------------------------------------------------------
   تشغيل شاشة الاسم (بتشتغل مرة واحدة بس)
   ---------------------------------------------------------------------------- */
function startNameIntro() {
  if (!nameIntro || nameIntroReady || nameIntroLeaving) {
    return;
  }

  /* لو الجهاز مفعّل تقليل الحركة: نخفيها على طول من غير انتظار */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hideNameIntro(false);
    return;
  }

  nameIntroReady = true;
  nameIntro.setAttribute('aria-hidden', 'false');

  /* اختفاء تلقائي لو الزائر ما داسش (بعد اللمعة تكون عدّت مرتين) */
  nameIntroAutoTimer = window.setTimeout(function () {
    hideNameIntro(true);
  }, NAME_INTRO_AUTO_HIDE);
}

/* ----------------------------------------------------------------------------
   إخفاء شاشة التحميل، وبعدها نبتدي شاشة الاسم
   مهم: بنستنى شاشة التحميل تختفي بالكامل (مدة الاختفاء + هامش) قبل
   ما نعرض شاشة الاسم، عشان مفيش تراكب بينهم.
   ---------------------------------------------------------------------------- */
function hidePreloader() {
  const preloader = document.getElementById('preloader');

  if (preloader && !preloader.classList.contains('fade-out')) {
    preloader.classList.add('fade-out');

    /* نستنى اختفاء شاشة التحميل بالكامل، وبعدين نعرض شاشة الاسم */
    window.setTimeout(startNameIntro, PRELOADER_FADE_TIME + 250);
  } else if (!preloader) {
    /* مفيش شاشة تحميل أصلًا → نعرض شاشة الاسم على طول */
    startNameIntro();
  }
}

/* الحالة العادية: تختفي بعد تحميل كل حاجة */
window.addEventListener('load', hidePreloader);

/* حماية: تختفي حتى لو الـ load اتأخر (صور كتير/نت بطيء) */
window.addEventListener('DOMContentLoaded', function () {
  setTimeout(hidePreloader, 2500);
});

/* حماية أخيرة: لو حصل أي خطأ في التحميل، تختفي على طول */
window.addEventListener('error', hidePreloader);

/* ============================================================================
   15) التشغيل الأولي (Init)
   بنطبّق اللغة والثيم المحفوظين من آخر زيارة للمستخدم
   ============================================================================ */
applyLanguage(savedLanguage);
applyTheme(savedTheme === 'light');

/* ============================================================================
   15.0) ظهور المحتوى عند النزول (Scroll Reveal)
   ----------------------------------------------------------------------------
   الفكرة: بنخفي العناصر الأول (opacity: 0) عن طريق كلاس .reveal-init،
   وبعدين IntersectionObserver لما العنصر يدخل الشاشة بنضيف .is-visible
   فيظهر بحركة ناعمة. أول ما يظهر بنلغيه من المراقبة عشان ميخفيش تاني.
   ============================================================================ */
(function initScrollReveal() {
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if (!revealTargets.length) {
    return;
  }

  /* لو المستخدم مفعّل "تقليل الحركة"، مفيش داعي نخفي أي حاجة */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  /* المتصفحات القديمة اللي مفيهاش IntersectionObserver: نظهر كل حاجة على طول */
  if (!('IntersectionObserver' in window)) {
    return;
  }

  /* ملاحظة: العناصر اللي فوق الشاشة أصلًا بنخليها تظهر بدون تأخير
     والفيديو بيشتغل عليها وقت دخولها */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,                    /* يظهر لما 15% من العنصر يدخل الشاشة */
    rootMargin: '0px 0px -60px 0px'     /* نبدأ شوية قبل ما يختفي خالص */
  });

  revealTargets.forEach(function (target) {
    /* بنضيف كلاس البداية (مخفي)، وبناخد نوع الحركة من data-reveal-visual */
    target.classList.add('reveal-init');

    const visual = target.getAttribute('data-reveal');
    if (visual && visual !== 'up') {
      target.classList.add('reveal-' + visual);
    }

    observer.observe(target);
  });
})();

/* ============================================================================
   15.1) تفاعل حركة الماوس مع الخلفية (Cursor Glow)
   ----------------------------------------------------------------------------
   بنقرا مكان الماوس وبنسجّله في متغيرات CSS على الـ body:
     --cursor-x / --cursor-y  →  الإحداثيات بالبكسل
     --cursor-active          →  1 لو الماوس جوه الشاشة، 0 لو خرج
   والـ CSS هو اللي بيحرّك التوهج عن طريق transform (أسرع من تغيير top/left).
   ============================================================================ */
(function initCursorBackground() {
  const cursorGlow = document.querySelector('.cursor-glow');
  const cursorSpotlight = document.querySelector('.cursor-spotlight');

  /* لو العناصر مش موجودة في الصفحة أو الجهاز مش داعم ماوس: نوقف بدري */
  if (!cursorGlow || !cursorSpotlight) {
    return;
  }

  /* جهاز بلمس بس (موبايل/تابلت)؟ نبطل عشان الأداء */
  if (window.matchMedia('(hover: none)').matches) {
    return;
  }

  /* لو المستخدم طالب تقليل الحركة، نحترم رغبته */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const root = document.body;
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let hasPointer = false;
  let frameId = null;

  /* بننقل الحركة من قراءة الماوس للـ DOM جوه requestAnimationFrame،
     عشان نحدّث الشاشة مرة واحدة في كل فريم بدل كل حركة ماوس */
  function render() {
    /* تنعيم الحركة (easing): التوهج بيجري ورا الماوس بنعومة مش بيلزق فيه */
    currentX += (targetX - currentX) * 0.16;
    currentY += (targetY - currentY) * 0.16;

    root.style.setProperty('--cursor-x', currentX + 'px');
    root.style.setProperty('--cursor-y', currentY + 'px');

    /* لو لسه فيه فرق ملحوظ، نكمل الفريم الجاي */
    if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
      frameId = requestAnimationFrame(render);
    } else {
      frameId = null;
    }
  }

  /** تشغيل اللوب لو مش شغال أصلًا (عشان مايبقاش فيه أكتر من لوب واحد) */
  function scheduleRender() {
    if (frameId === null) {
      frameId = requestAnimationFrame(render);
    }
  }

  window.addEventListener('mousemove', function (event) {
    targetX = event.clientX;
    targetY = event.clientY;

    /* أول حركة: نلزق التوهج في مكان الماوس فورًا بدل ما يجري من نص الشاشة */
    if (!hasPointer) {
      hasPointer = true;
      currentX = targetX;
      currentY = targetY;
      root.style.setProperty('--cursor-active', '1');
    }

    scheduleRender();
  }, { passive: true });

  /* الماوس خرج من الصفحة: نطفي التوهج */
  document.addEventListener('mouseleave', function () {
    root.style.setProperty('--cursor-active', '0');
  });

  /* رجع تاني: نولّعه */
  document.addEventListener('mouseenter', function () {
    root.style.setProperty('--cursor-active', '1');
  });

  /* لو النافذة اتغير حجمها والماوس برة، نرجّع التوهج للنص */
  window.addEventListener('resize', function () {
    if (!hasPointer) {
      targetX = window.innerWidth / 2;
      targetY = window.innerHeight / 2;
      scheduleRender();
    }
  }, { passive: true });
})();



/* ============================================================================
   16) مساعد الذكاء الاصطناعي (AI Assistant / Chat)
   ----------------------------------------------------------------------------
   الموقع بيكلم الـ Cloudflare Worker (الملف worker.js في نفس المجلد)،
   والـ Worker هو اللي بيمسك مفتاح الـ AI وبيكلم Gemini.
   السبب: لو المفتاح اتحط هنا في script.js هيبقى مكشوف لأي زائر.

   الـ Worker لازم يرجّع JSON بالشكل:  { "reply": "..." }  أو  { "error": "..." }
   ============================================================================ */

/* رابط الـ Worker (نفس الـ Worker المفروض يكون منشور من ملف worker.js) */
const AI_WORKER_URL = 'https://restless-frog-eb20.mtzm2225.workers.dev';

/* أقصى مدة نستنى فيها رد السيرفر (40 ثانية) */
const AI_REQUEST_TIMEOUT = 40000;

/* أقصى عدد رسائل نحتفظ بيها كسياق عشان المساعد يفتكر المحادثة */
const AI_MAX_HISTORY = 6;

/* تاريخ المحادثة — بيتبعت مع كل سؤال */
const aiConversationHistory = [];

/* --- مراجع عناصر واجهة المساعد --- */
const aiInput = document.getElementById('userInput');
const aiResponse = document.getElementById('aiResponse');
const aiSendButton = document.getElementById('aiSendButton');
const aiToggle = document.getElementById('aiToggle');
const aiPanel = document.getElementById('aiPanel');
const aiCloseButton = document.querySelector('.ai-close');

/** فتح لوحة المساعد والتركيز على خانة السؤال */
function openAiPanel() {
  if (!aiPanel) {
    return;
  }

  aiPanel.classList.remove('hidden');

  if (aiToggle) {
    aiToggle.classList.add('is-open');
    aiToggle.setAttribute('aria-expanded', 'true');
    aiToggle.setAttribute('aria-label', 'Close AI assistant');
  }

  /* نركّز على الإدخال بعد ظهور اللوحة عشان الزائر يكتب على طول */
  if (aiInput) {
    setTimeout(function () {
      aiInput.focus();
    }, 60);
  }
}

/** إغلاق لوحة المساعد */
function closeAiPanel() {
  if (!aiPanel) {
    return;
  }

  aiPanel.classList.add('hidden');

  if (aiToggle) {
    aiToggle.classList.remove('is-open');
    aiToggle.setAttribute('aria-expanded', 'false');
    aiToggle.setAttribute('aria-label', 'Open AI assistant');
  }
}

/** فتح/إغلاق اللوحة بالزر العائم */
function toggleAiPanel() {
  if (aiPanel && aiPanel.classList.contains('hidden')) {
    openAiPanel();
  } else {
    closeAiPanel();
  }
}

if (aiToggle) {
  aiToggle.addEventListener('click', toggleAiPanel);
}

if (aiCloseButton) {
  aiCloseButton.addEventListener('click', closeAiPanel);
}

/* الإغلاق بمفتاح Escape */
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && aiPanel && !aiPanel.classList.contains('hidden')) {
    closeAiPanel();
  }
});

/** التحقق إن الرد جاي من الـ Worker بالشكل المتفق عليه */
function isAiPayload(data) {
  return data && typeof data === 'object' && typeof data.reply === 'string' && data.reply.trim();
}

/**
 * إرسال سؤال للـ Worker وإرجاع الإجابة
 * @param {string} userMessage - سؤال المستخدم
 * @returns {Promise<string>} إجابة الذكاء الاصطناعي
 */
async function askAI(userMessage) {
  const dictionary = getDictionary(getCurrentLanguage());

  /* لو الجهاز مش متصل بالنت من الأساس مش محتاجين نستنى */
  if (navigator.onLine === false) {
    return dictionary.aiError;
  }

  /* مؤقت لإلغاء الطلب لو أخد وقت طويل */
  const controller = new AbortController();
  const timeoutId = setTimeout(function () {
    controller.abort();
  }, AI_REQUEST_TIMEOUT);

  try {
    const response = await fetch(AI_WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        history: aiConversationHistory.slice(-AI_MAX_HISTORY)
      }),
      signal: controller.signal
    });

    /* بنقرا JSON حتى مع ردود الأخطاء عشان الـ Worker بيرجّع { error: "..." } */
    let data = null;
    try {
      data = await response.json();
    } catch (parseError) {
      data = null;
    }

    if (response.ok && isAiPayload(data)) {
      return data.reply.trim();
    }

    /* رسالة الخطأ الآتية من السيرفر */
    if (data && typeof data.error === 'string' && data.error.trim()) {
      return data.error.trim();
    }

    return dictionary.aiOffline;
  } catch (error) {
    console.error('[AI] فشل الاتصال بالـ Worker:', error);
    return dictionary.aiError;
  } finally {
    clearTimeout(timeoutId);
  }
}

/** تثبيت حالة واجهة المساعد (جاري التفكير / خطأ) */
function setAiBusy(isBusy) {
  if (aiSendButton) {
    aiSendButton.disabled = isBusy;
    aiSendButton.classList.toggle('is-loading', isBusy);
  }

  if (aiInput) {
    aiInput.disabled = isBusy;
  }
}

/**
 * عرض الإجابة داخل الصندوق
 * @param {string} text - النص المعروض
 * @param {boolean} isError - هل النص رسالة خطأ
 */
function showAiReply(text, isError) {
  if (!aiResponse) {
    return;
  }

  aiResponse.textContent = text;
  aiResponse.classList.toggle('is-error', Boolean(isError));
  aiResponse.classList.add('has-content');
}

/** التعامل مع زر الإرسال: قراءة السؤال ثم عرض الإجابة */
async function handleAskAI() {
  if (!aiInput || !aiResponse) {
    return;
  }

  const dictionary = getDictionary(getCurrentLanguage());
  const userText = aiInput.value.trim();

  /* مفيش سؤال؟ ننبّه المستخدم */
  if (!userText) {
    showAiReply(dictionary.aiEmpty, true);
    aiInput.focus();
    return;
  }

  /* نعرض حالة الانتظار */
  setAiBusy(true);
  aiResponse.classList.remove('is-error');
  aiResponse.textContent = dictionary.aiThinking;

  /* نحفظ سؤال المستخدم في تاريخ المحادثة قبل ما نبعته */
  aiConversationHistory.push({ role: 'user', content: userText });

  const aiReply = await askAI(userText);

  /* لو رجع أي رسالة خطأ معروفة نعتبرها خطأ */
  const isError = aiReply === dictionary.aiError || aiReply === dictionary.aiOffline;

  /* نحفظ رد المساعد لو كان رد حقي */
  if (!isError) {
    aiConversationHistory.push({ role: 'assistant', content: aiReply });

    /* نقلّم التاريخ لو كبر عن الحد */
    if (aiConversationHistory.length > AI_MAX_HISTORY) {
      aiConversationHistory.splice(0, aiConversationHistory.length - AI_MAX_HISTORY);
    }
  }

  showAiReply(aiReply, isError);
  setAiBusy(false);

  aiInput.value = '';
  aiInput.focus();
}

/* --- ربط الأحداث بواجهة المساعد --- */
if (aiSendButton) {
  aiSendButton.addEventListener('click', handleAskAI);
}

if (aiInput) {
  /* Enter يرسل، وShift + Enter سطر جديد */
  aiInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleAskAI();
    }
  });
}


const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname);

const server = http.createServer((req, res) => {
    // 1. تنظيف المسار المكتوب لمنع التلاعب (مثل ../)
    const safePath = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
    let filePath = path.join(PUBLIC_DIR, safePath);

    // 2. التحقق من أن المسار المطلوبة لا يخرج عن مجلد المشروع
    if (!filePath.startsWith(PUBLIC_DIR)) {
        res.statusCode = 403;
        return res.end('Access Denied');
    }

    // إذا كان المسار هو الصفحة الرئيسية
    if (filePath === PUBLIC_DIR || filePath === PUBLIC_DIR + path.sep) {
        filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    // 3. قراءة الملف بأمان
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.end('File Not Found');
        } else {
            res.statusCode = 200;
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
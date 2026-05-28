/* ATHENA'S — shared app logic */
(function () {
  const LS_LANG = 'athenas.lang';
  const LS_CONSENT = 'athenas.cookie-consent';
  const _ls = { get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }, set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} } };

  /* ---- Cookie Consent (GDPR-compliant, no external dependencies) ---- */
  const COOKIE_STYLES = `
    .cc-banner {
      position: fixed; left: 16px; right: 16px; bottom: 16px;
      max-width: 720px; margin: 0 auto;
      background: rgba(26,26,26,.97);
      color: #f3eee4;
      padding: 22px 26px;
      z-index: 9998;
      font-family: var(--sans, system-ui, sans-serif);
      box-shadow: 0 12px 48px rgba(0,0,0,.35);
      backdrop-filter: blur(20px);
      opacity: 0; pointer-events: none;
      transform: translateY(20px);
      transition: opacity .4s cubic-bezier(.22,.61,.36,1), transform .4s cubic-bezier(.22,.61,.36,1);
    }
    .cc-banner.is-open { opacity: 1; pointer-events: auto; transform: translateY(0); }
    .cc-banner__title { font-family: var(--display, serif); font-size: 18px; font-weight: 400; margin-bottom: 6px; letter-spacing: -0.01em; }
    .cc-banner__text { font-size: 13px; line-height: 1.55; opacity: .72; margin-bottom: 14px; }
    .cc-banner__text a { color: #c9a96e; text-decoration: underline; }
    .cc-banner__actions { display: flex; flex-wrap: wrap; gap: 8px; }
    .cc-btn {
      flex: 1 1 auto; min-width: 110px;
      padding: 11px 14px;
      font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
      font-family: inherit; cursor: pointer; border: none;
      transition: .25s;
      text-align: center;
    }
    .cc-btn--accept { background: #c9a96e; color: #1a1a1a; }
    .cc-btn--accept:hover { background: #d5b97e; }
    .cc-btn--reject { background: transparent; color: #f3eee4; border: 1px solid rgba(243,238,228,.3); }
    .cc-btn--reject:hover { border-color: rgba(243,238,228,.6); }
    .cc-btn--prefs { background: transparent; color: #f3eee4; border: 1px solid rgba(243,238,228,.3); }
    .cc-btn--prefs:hover { border-color: rgba(243,238,228,.6); }
    .cc-prefs { display: none; margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(243,238,228,.12); }
    .cc-prefs.is-open { display: block; }
    .cc-pref-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; padding: 8px 0; }
    .cc-pref-info { font-size: 12px; }
    .cc-pref-info strong { display: block; margin-bottom: 2px; }
    .cc-pref-info span { opacity: .6; line-height: 1.45; }
    .cc-toggle { position: relative; width: 38px; height: 22px; flex-shrink: 0; }
    .cc-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
    .cc-toggle .cc-slider {
      position: absolute; inset: 0;
      background: rgba(255,255,255,.2);
      border-radius: 999px;
      cursor: pointer;
      transition: .25s;
    }
    .cc-toggle .cc-slider::before {
      content: ''; position: absolute;
      width: 16px; height: 16px;
      left: 3px; top: 3px;
      background: #f3eee4;
      border-radius: 50%;
      transition: .25s;
    }
    .cc-toggle input:checked + .cc-slider { background: #c9a96e; }
    .cc-toggle input:checked + .cc-slider::before { transform: translateX(16px); background: #1a1a1a; }
    .cc-toggle input:disabled + .cc-slider { opacity: .5; cursor: not-allowed; }
    @media (max-width: 560px) {
      .cc-banner { padding: 18px 20px; left: 8px; right: 8px; bottom: 8px; }
      .cc-banner__title { font-size: 16px; }
    }
  `;
  function loadConsent() {
    try {
      const raw = _ls.get(LS_CONSENT);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      // Expire after 12 months
      if (parsed.ts && (Date.now() - parsed.ts) > 365 * 24 * 60 * 60 * 1000) return null;
      return parsed;
    } catch(e) { return null; }
  }
  function saveConsent(c) {
    const data = { ts: Date.now(), necessary: true, analytics: !!c.analytics, marketing: !!c.marketing };
    _ls.set(LS_CONSENT, JSON.stringify(data));
    document.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: data }));
    return data;
  }
  function buildBanner() {
    if (document.querySelector('.cc-banner')) return document.querySelector('.cc-banner');
    if (!document.querySelector('#cc-styles')) {
      const s = document.createElement('style');
      s.id = 'cc-styles';
      s.textContent = COOKIE_STYLES;
      document.head.appendChild(s);
    }
    const banner = document.createElement('div');
    banner.className = 'cc-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    const isIt = (window.ATH && window.ATH.lang) === 'it' || !window.ATH;
    const t = isIt ? {
      title: 'Rispetto della tua privacy',
      text: 'Usiamo cookie tecnici per il funzionamento del sito e, con il tuo consenso, cookie analitici e di marketing. Per i dettagli vedi la <a href="/cookie-policy.html">Cookie Policy</a>.',
      accept: 'Accetta tutti',
      reject: 'Rifiuta',
      prefs: 'Preferenze',
      save: 'Salva preferenze',
      necTitle: 'Cookie tecnici',
      necDesc: 'Necessari al funzionamento (lingua, preferenze). Sempre attivi.',
      anaTitle: 'Cookie analitici',
      anaDesc: 'Misurazione anonima del traffico (Google Analytics) per migliorare il sito.',
      mktTitle: 'Cookie di marketing',
      mktDesc: 'Profilazione e remarketing (es. Facebook Pixel) per pubblicità mirata.'
    } : {
      title: 'Respect for your privacy',
      text: 'We use technical cookies for site operation and, with your consent, analytics and marketing cookies. Details in the <a href="/cookie-policy.html">Cookie Policy</a>.',
      accept: 'Accept all',
      reject: 'Reject',
      prefs: 'Preferences',
      save: 'Save preferences',
      necTitle: 'Technical cookies',
      necDesc: 'Necessary for site operation (language, preferences). Always on.',
      anaTitle: 'Analytics cookies',
      anaDesc: 'Anonymous traffic measurement (Google Analytics) to improve the site.',
      mktTitle: 'Marketing cookies',
      mktDesc: 'Profiling and remarketing (e.g. Facebook Pixel) for targeted advertising.'
    };
    banner.innerHTML = `
      <div class="cc-banner__title">${t.title}</div>
      <p class="cc-banner__text">${t.text}</p>
      <div class="cc-banner__actions">
        <button class="cc-btn cc-btn--reject" data-action="reject">${t.reject}</button>
        <button class="cc-btn cc-btn--prefs" data-action="prefs">${t.prefs}</button>
        <button class="cc-btn cc-btn--accept" data-action="accept">${t.accept}</button>
      </div>
      <div class="cc-prefs">
        <div class="cc-pref-row">
          <div class="cc-pref-info"><strong>${t.necTitle}</strong><span>${t.necDesc}</span></div>
          <label class="cc-toggle"><input type="checkbox" checked disabled/><span class="cc-slider"></span></label>
        </div>
        <div class="cc-pref-row">
          <div class="cc-pref-info"><strong>${t.anaTitle}</strong><span>${t.anaDesc}</span></div>
          <label class="cc-toggle"><input type="checkbox" data-pref="analytics"/><span class="cc-slider"></span></label>
        </div>
        <div class="cc-pref-row">
          <div class="cc-pref-info"><strong>${t.mktTitle}</strong><span>${t.mktDesc}</span></div>
          <label class="cc-toggle"><input type="checkbox" data-pref="marketing"/><span class="cc-slider"></span></label>
        </div>
        <div style="text-align:right; margin-top:12px;">
          <button class="cc-btn cc-btn--accept" data-action="save" style="flex:0 0 auto; padding:10px 18px;">${t.save}</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);
    const prefsEl = banner.querySelector('.cc-prefs');
    banner.addEventListener('click', (e) => {
      const a = e.target.closest('[data-action]');
      if (!a) return;
      const act = a.dataset.action;
      if (act === 'accept') { saveConsent({ analytics: true, marketing: true }); hideBanner(); }
      else if (act === 'reject') { saveConsent({ analytics: false, marketing: false }); hideBanner(); }
      else if (act === 'prefs') { prefsEl.classList.toggle('is-open'); }
      else if (act === 'save') {
        const ana = banner.querySelector('[data-pref="analytics"]').checked;
        const mkt = banner.querySelector('[data-pref="marketing"]').checked;
        saveConsent({ analytics: ana, marketing: mkt });
        hideBanner();
      }
    });
    return banner;
  }
  function showBanner() {
    const b = buildBanner();
    const existing = loadConsent();
    if (existing) {
      b.querySelector('[data-pref="analytics"]').checked = !!existing.analytics;
      const m = b.querySelector('[data-pref="marketing"]');
      if (m) m.checked = !!existing.marketing;
      b.querySelector('.cc-prefs').classList.add('is-open');
    }
    requestAnimationFrame(() => b.classList.add('is-open'));
  }
  function hideBanner() {
    const b = document.querySelector('.cc-banner');
    if (b) b.classList.remove('is-open');
  }
  window.CookieConsent = {
    show: showBanner,
    hide: hideBanner,
    get: loadConsent,
    accepted: function(category) {
      const c = loadConsent();
      return c && c[category] === true;
    }
  };

  /* ---- Google Analytics 4 (loaded only after consent) ---- */
  const GA_MEASUREMENT_ID = 'G-11CJ431D6Y';
  function loadGoogleAnalytics() {
    if (window.__gaLoaded || !GA_MEASUREMENT_ID) return;
    window.__gaLoaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  }

  /* ---- Facebook Pixel (loaded only after marketing consent) ---- */
  // const FB_PIXEL_ID = 'XXXXXXXXXX'; // TODO: aggiungere quando si ha il Pixel ID
  function loadFacebookPixel() {
    if (window.__fbqLoaded || typeof FB_PIXEL_ID === 'undefined' || !FB_PIXEL_ID) return;
    window.__fbqLoaded = true;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', FB_PIXEL_ID);
    fbq('track', 'PageView');
  }

  // Apply current consent on page load
  document.addEventListener('DOMContentLoaded', function(){
    const c = loadConsent();
    if (!c) {
      showBanner();
    } else {
      if (c.analytics) loadGoogleAnalytics();
      if (c.marketing)  loadFacebookPixel();
    }
  });

  // React to consent changes (e.g. user opens "Preferenze cookie" and toggles)
  document.addEventListener('cookie-consent-change', function(e){
    if (e.detail.analytics) loadGoogleAnalytics();
    if (e.detail.marketing)  loadFacebookPixel();
    // Note: if user revokes consent, trackers loaded in this session stay
    // until next page load (full unload only happens on reload).
  });

  /* ---- Custom GA4 events (only fire if gtag is loaded — i.e. consent given) ---- */
  function gaEvent(name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    }
  }
  window.gaEvent = gaEvent;

  document.addEventListener('DOMContentLoaded', function(){
    // 1. Click "Acquista su erboristica.com" — conversion tracking B2C
    document.body.addEventListener('click', function(e){
      const link = e.target.closest('a[href*="erboristica.com"]');
      if (!link) return;
      const card = link.closest('.ev-card, .kf-frag, .mini-card, .tl-slide');
      const productName = (card && (card.querySelector('h3, .mini-card__name, .kf-frag__name') || {}).textContent || '').trim();
      gaEvent('click_acquista', {
        link_url: link.href,
        link_text: link.textContent.trim().slice(0, 100),
        product_name: productName,
        page: location.pathname
      });
    });

    // 2. Form contatti — submit success
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(){
        const tab = document.querySelector('.form-tab.active');
        gaEvent('form_submit', {
          form_id: 'contact',
          category: tab ? tab.textContent.trim() : 'generic'
        });
      });
    }

    // 3. Click su contatti diretti (email, telefono)
    document.body.addEventListener('click', function(e){
      const a = e.target.closest('a[href^="mailto:"], a[href^="tel:"]');
      if (!a) return;
      gaEvent('click_contact', {
        type: a.href.startsWith('mailto:') ? 'email' : 'phone',
        value: a.href.replace(/^(mailto|tel):/, '').slice(0, 80)
      });
    });

    // 4. Click sui social del footer
    document.body.addEventListener('click', function(e){
      const a = e.target.closest('.footer__social a, footer a[href*="instagram.com"], footer a[href*="facebook.com"], footer a[href*="linkedin.com"]');
      if (!a) return;
      let network = 'other';
      if (a.href.indexOf('instagram') >= 0) network = 'instagram';
      else if (a.href.indexOf('facebook') >= 0) network = 'facebook';
      else if (a.href.indexOf('linkedin') >= 0) network = 'linkedin';
      gaEvent('click_social', { network: network, url: a.href });
    });

    // 5. Click su consensus banner (capire come reagiscono)
    document.body.addEventListener('click', function(e){
      const btn = e.target.closest('.cc-btn');
      if (!btn) return;
      gaEvent('cookie_banner', { action: btn.dataset.action || 'unknown' });
    });

    // 6. Scroll depth — 25, 50, 75, 100%
    let scrollMarks = { 25: false, 50: false, 75: false, 100: false };
    let scrollTimeout;
    window.addEventListener('scroll', function(){
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function(){
        const docH = document.documentElement.scrollHeight - innerHeight;
        if (docH <= 0) return;
        const pct = Math.round((window.scrollY / docH) * 100);
        [25, 50, 75, 100].forEach(function(m){
          if (pct >= m && !scrollMarks[m]) {
            scrollMarks[m] = true;
            gaEvent('scroll_depth', { percent: m, page: location.pathname });
          }
        });
      }, 200);
    }, { passive: true });

    // 7. Lang switch (capire bilanciamento IT/EN)
    document.addEventListener('lang-change', function(e){
      gaEvent('lang_change', { lang: e.detail });
    });

    // 8. Tab switch form contatti
    document.body.addEventListener('click', function(e){
      const tab = e.target.closest('.form-tab');
      if (!tab) return;
      gaEvent('tab_switch_form', {
        tab_label: tab.textContent.trim(),
        tab_value: tab.dataset.target || tab.dataset.fieldset || tab.textContent.trim()
      });
    });

    // 9. Funnel — page-level tracking (dove sta l'utente nel flusso B2C)
    // Step 1 (homepage) → coperto da page_view automatico GA4
    // Step 2 (brand category) → linee.html
    // Step 3 (line detail) → linee/erboristica.html, linee/everby.html, etc.
    // Step 4 (product detail) → linee/prodotto-sphea.html (gli altri sono redirect a erboristica.com)
    //   TODO: aggiungere step 4 per prodotti Everby/Kaley quando avranno pagine dedicate
    // Step 5 (purchase intent) → click_acquista (event già definito sopra)
    (function trackFunnelStep(){
      const path = location.pathname;
      const isHome = path === '/' || /\/index\.html$/.test(path);
      let step = null, brand = null;
      if (isHome)                                step = { num: 1, name: 'home' };
      else if (/\/linee\.html$/.test(path))      step = { num: 2, name: 'brand_overview' };
      else if (/\/catalogo\.html$/.test(path))   step = { num: 2, name: 'catalog' };
      else if (/\/linee\/erboristica\.html/.test(path)) { step = { num: 3, name: 'brand_hub' }; brand = 'erboristica'; }
      else if (/\/linee\/everby\.html/.test(path))      { step = { num: 3, name: 'brand_hub' }; brand = 'everby'; }
      else if (/\/linee\/kaley\.html/.test(path))       { step = { num: 3, name: 'brand_hub' }; brand = 'kaley'; }
      else if (/\/linee\/sphea\.html/.test(path))       { step = { num: 3, name: 'brand_hub' }; brand = 'sphea'; }
      else if (/\/linee\/linea\.html/.test(path)) {
        step = { num: 3, name: 'line_detail' };
        brand = 'erboristica';
        const lineId = new URLSearchParams(location.search).get('id');
        if (lineId) step.line_id = lineId;
      }
      else if (/\/linee\/prodotto-sphea\.html/.test(path)) {
        step = { num: 4, name: 'product_detail' };
        brand = 'sphea';
        const pid = new URLSearchParams(location.search).get('id');
        if (pid) step.product_id = pid;
      }
      // TODO: when single product pages exist for Everby/Kaley/Erboristica, add them here as step 4
      if (step) {
        gaEvent('funnel_step', Object.assign({
          step_num: step.num,
          step_name: step.name,
          brand: brand
        }, step.line_id ? { line_id: step.line_id } : {}, step.product_id ? { product_id: step.product_id } : {}));
      }
    })();
  });

  window.ATH = {
    lang: _ls.get(LS_LANG) || 'it',
    setLang(l) {
      this.lang = l;
      _ls.set(LS_LANG, l);
      this.applyLang();
      document.documentElement.lang = l;
      document.dispatchEvent(new CustomEvent('lang-change', { detail: l }));
    },
    t(k) { if (!window.I18N) return k; return (window.I18N[this.lang] || window.I18N.it)[k] || k; },
    applyLang() {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = this.t(el.dataset.i18n);
      });
      document.querySelectorAll('[data-it]').forEach(el => {
        const val = this.lang === 'it' ? el.dataset.it : (el.dataset.en || el.dataset.it);
        if (val.includes('<')) el.innerHTML = val; else el.textContent = val;
      });
      document.querySelectorAll('.lang-switch button').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === this.lang);
      });
    }
  };

  /* ---- Site hierarchy back navigation ---- */
  window.getHierarchyParent = function () {
    const p = window.location.pathname.replace(/\\/g, '/');
    const file = p.split('/').pop() || 'index.html';
    // brand product pages â†’ brand page
    if (/\/linee\/prodotto-sphea\.html/.test(p))   return 'sphea.html';
    if (/\/linee\/prodotto-kaley\.html/.test(p))   return 'kaley.html';
    if (/\/linee\/prodotto-everby\.html/.test(p))  return 'everby.html';
    if (/\/linee\/prodotto[-_]/.test(p))           return 'erboristica.html';
    // linea.html â†’ pagina brand erboristica
    if (/\/linee\/linea\.html/.test(p)) return 'erboristica.html';
    // brand pages â†’ brand overview
    if (/\/linee\//.test(p)) return '../linee.html';
    // erboristica product page (root level) â†’ linea della linea del prodotto
    if (file === 'prodotto.html') {
      try {
        const pid = new URLSearchParams(window.location.search).get('id');
        if (pid && window.ATH_DATA_JSON && window.ATH_DATA_JSON.products) {
          const prod = window.ATH_DATA_JSON.products.find(pr => pr.id === pid);
          if (prod) {
            const brand = prod.brand || prod.line;
            // I brand non-Erboristica non hanno una pagina linea: vai alla hub del brand
            if (brand === 'everby') return 'linee/everby.html';
            if (brand === 'kaley')  return 'linee/kaley.html';
            if (brand === 'sphea')  return 'linee/sphea.html';
            if (prod.line) return 'linee/linea.html?id=' + prod.line;
          }
        }
      } catch(e) {}
      return 'linee/erboristica.html';
    }
    return null;
  };

  /* ---- Topbar ---- */
  window.renderTopbar = function (activeKey, opts) {
    const r = /\/linee\//.test(window.location.pathname) ? '../' : '';

    const parentUrl = window.getHierarchyParent();
    const hasHistory = window.history.length > 1 && document.referrer !== '';
    const backBtn = parentUrl
      ? `<a class="topbar__back" href="${parentUrl}" aria-label="Torna indietro" id="topbarBack">
          <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M10 7H4M4 7L6.5 4.5M4 7L6.5 9.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span data-it="Indietro" data-en="Back">Indietro</span>
        </a>`
      : `<div class="topbar__back-placeholder"></div>`;
    const el = document.createElement('header');
    el.className = 'topbar' + (opts && opts.light ? ' topbar--light' : '');
    const navLinks = `
      <a href="${r}index.html" data-i18n="nav_company" class="${activeKey==='company'?'active':''}">Azienda</a>
      <a href="${r}linee.html" data-i18n="nav_brands" class="${activeKey==='brands'?'active':''}">Linee</a>
      <a href="${r}laboratorio.html" data-i18n="nav_lab" class="${activeKey==='lab'?'active':''}">Laboratorio</a>
      <a href="${r}sostenibilita.html" data-i18n="nav_eco" class="${activeKey==='eco'?'active':''}">Sostenibilità </a>
      <a href="${r}catalogo.html" data-i18n="nav_catalog" class="${activeKey==='catalog'?'active':''}">Catalogo</a>
      <a href="${r}terzisti.html" data-i18n="nav_terzisti" class="${activeKey==='terzisti'?'active':''}">Terzisti</a>
      <a href="${r}contatti.html" data-i18n="nav_contact" class="${activeKey==='contact'?'active':''}">Contatti</a>`;
    el.innerHTML = `
      <div class="topbar__left">
        ${backBtn}
        <a href="${r}index.html" class="topbar__logo">Athena's<span class="dot">.</span></a>
      </div>
      <div class="topbar__right-wrap">
        <nav class="topbar__nav">${navLinks}</nav>
        <div class="lang-switch">
          <button data-lang="it">IT</button>
          <button data-lang="en">EN</button>
        </div>
        <button class="topbar__search-btn" aria-label="Cerca nel sito" data-open-search>
          <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <circle cx="9" cy="9" r="6"/><path d="m17 17-3.5-3.5"/>
          </svg>
        </button>
        <button class="topbar__burger" aria-label="Apri menu" aria-expanded="false" aria-controls="mobileMenu">
          <span></span><span></span><span></span>
        </button>
      </div>
    `;
    document.body.prepend(el);

    // Mobile menu drawer
    const drawer = document.createElement('div');
    drawer.id = 'mobileMenu';
    drawer.className = 'mobile-menu';
    drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML = `
      <nav class="mobile-menu__nav">${navLinks}</nav>
      <div class="mobile-menu__lang lang-switch">
        <button data-lang="it">IT</button>
        <button data-lang="en">EN</button>
      </div>
    `;
    document.body.appendChild(drawer);

    const burger = el.querySelector('.topbar__burger');
    const closeMenu = () => {
      el.classList.remove('topbar--menu-open');
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    const openMenu = () => {
      el.classList.add('topbar--menu-open');
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    burger.addEventListener('click', () => {
      drawer.classList.contains('open') ? closeMenu() : openMenu();
    });
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeMenu();
    });

    document.querySelectorAll('.lang-switch button').forEach(b => {
      b.addEventListener('click', () => ATH.setLang(b.dataset.lang));
    });

    // Back button: naviga SEMPRE al parent gerarchico (href=parentUrl) — deterministico, niente loop di history.back()

    // Scroll state
    let _lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > _lastY;
      if (y < 10) {
        el.classList.remove('topbar--hidden', 'solid');
      } else if (goingDown && y > 60) {
        el.classList.add('topbar--hidden');
      } else {
        el.classList.remove('topbar--hidden');
        el.classList.toggle('solid', y > 80);
      }
      _lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  };

  /* ---- Footer ---- */
  window.renderFooter = function () {
    const r = /\/linee\//.test(window.location.pathname) ? '../' : '';
    const el = document.createElement('footer');
    el.className = 'footer';
    el.innerHTML = `
      <div class="footer__content">
        <div class="footer__grid">
          <div>
            <div style="font-family:var(--serif); font-weight:300; font-size:22px; letter-spacing:0.22em; text-transform:uppercase; color:var(--cream);">Athena's</div>
            <p style="margin-top:12px; opacity:.6; font-family:var(--serif); font-style:italic; font-size:17px; max-width:26ch; line-height:1.6;" data-it="Artigiani della cosmetica naturale dal 1969. Una passione di famiglia, una storia italiana." data-en="Artisans of natural cosmetics since 1969. A family passion, an Italian story.">Artigiani della cosmetica naturale dal 1969. Una passione di famiglia, una storia italiana.</p>
          </div>
          <div>
            <div class="footer__title" data-it="Azienda" data-en="Company">Azienda</div>
            <a class="footer__link" href="${r}index.html" data-it="Storia" data-en="History">Storia</a>
            <a class="footer__link" href="${r}laboratorio.html" data-it="Laboratorio" data-en="Laboratory">Laboratorio</a>
            <a class="footer__link" href="${r}sostenibilita.html" data-it="Sostenibilità " data-en="Sustainability">Sostenibilità </a>
            <a class="footer__link" href="${r}sostenibilita.html#certs" data-it="Certificazioni" data-en="Certifications">Certificazioni</a>
          </div>
          <div>
            <div class="footer__title" data-it="Linee" data-en="Lines">Linee</div>
            <a class="footer__link" href="${r}linee/erboristica.html">l'Erboristica</a>
            <a class="footer__link" href="${r}linee/everby.html">Everby</a>
            <a class="footer__link" href="${r}linee/kaley.html">Kaley</a>
            <a class="footer__link" href="${r}linee/sphea.html">Sphea</a>
          </div>
          <div>
            <div class="footer__title" data-it="B2B" data-en="B2B">B2B</div>
            <a class="footer__link" href="${r}catalogo.html" data-it="Catalogo prodotti" data-en="Product catalogue">Catalogo prodotti</a>
            <a class="footer__link" href="${r}contatti.html#partner" data-it="Diventa partner" data-en="Become a partner">Diventa partner</a>
            <a class="footer__link" href="${r}contatti.html" data-it="Contatti" data-en="Contact">Contatti</a>
          </div>
          <div>
            <div class="footer__title" data-i18n="newsletter">Newsletter</div>
            <p style="margin-top:6px; margin-bottom:14px; font-family:var(--serif); font-style:italic; font-size:16px; opacity:.45; line-height:1.5;" data-it="Ricevi aggiornamenti sui nostri prodotti e le novità  Athena's." data-en="Stay updated on our products and Athena's news.">Ricevi aggiornamenti sui nostri prodotti e le novità  Athena's.</p>
            <form onsubmit="event.preventDefault(); this.querySelector('button').textContent='✓“';" style="display:flex; gap:8px;">
              <input type="email" required placeholder="email" style="flex:1; min-width:0; padding:7px 0; background:transparent; border:0; border-bottom:1px solid rgba(255,255,255,.3); color:inherit; font-size:13px; font-family:inherit; outline:none;"/>
              <button type="submit" style="padding:7px 16px; border:1px solid rgba(255,255,255,.4); font-size:9px; letter-spacing:.18em; text-transform:uppercase; color:inherit; white-space:nowrap; transition:.3s;" onmouseover="this.style.background='rgba(255,255,255,.1)'" onmouseout="this.style.background='transparent'" data-i18n="subscribe">Iscriviti</button>
            </form>
          </div>
        </div>
        <div class="footer__contact">
          <span data-it="Via del Lavoro, 32 — 40065 Pianoro (BO) — Italy" data-en="Via del Lavoro, 32 — 40065 Pianoro (BO) — Italy">Via del Lavoro, 32 — 40065 Pianoro (BO) — Italy</span>
          <span>Tel <a href="tel:+390510925111">051 0925111</a></span>
          <span>Fax 051 0925122</span>
          <a href="mailto:info@athenas.it">info@athenas.it</a>
          <span class="footer__social">
            <a href="https://www.instagram.com/athenasitaly/" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>
            <a href="https://www.facebook.com/athenasofficial/" target="_blank" rel="noopener" aria-label="Facebook">Facebook</a>
            <a href="https://www.linkedin.com/company/athena's-srl/" target="_blank" rel="noopener" aria-label="LinkedIn">LinkedIn</a>
          </span>
        </div>
        <div class="footer__bottom">
          <div data-it="© 2026 Athena's s.r.l. — P.IVA 01457020392 — R.E.A. BO 404236 — Cap. soc. € 52.000 i.v." data-en="© 2026 Athena's s.r.l. — VAT 01457020392 — R.E.A. BO 404236 — Share cap. € 52,000 paid-up">© 2026 Athena's s.r.l. — P.IVA 01457020392 — R.E.A. BO 404236 — Cap. soc. € 52.000 i.v.</div>
          <div style="display:flex; gap:24px; flex-wrap:wrap;">
            <a href="${r}privacy.html" data-it="Privacy" data-en="Privacy">Privacy</a>
            <a href="${r}cookie-policy.html" data-it="Cookie Policy" data-en="Cookie Policy">Cookie Policy</a>
            <a href="#" data-cookie-prefs data-it="Preferenze cookie" data-en="Cookie preferences">Preferenze cookie</a>
          </div>
        </div>
      </div>
      <div class="footer__big">ATHENA'S</div>
    `;
    document.body.appendChild(el);

    /* ---- Search overlay (built lazily on first open) ---- */
    let searchOverlay = null;
    function buildSearchOverlay(){
      if (searchOverlay) return searchOverlay;
      const isIt = (window.ATH && window.ATH.lang) === 'it' || !window.ATH;
      const t = isIt
        ? { placeholder: 'Cerca prodotti, brand, linee…', empty: 'Nessun risultato. Prova "argan", "antietà", "Sphea"…', close: 'Chiudi' }
        : { placeholder: 'Search products, brands, lines…', empty: 'No results. Try "argan", "anti-aging", "Sphea"…', close: 'Close' };
      const ov = document.createElement('div');
      ov.className = 'search-overlay';
      ov.setAttribute('role', 'dialog');
      ov.innerHTML = `
        <div class="search-overlay__inner">
          <button class="search-overlay__close" aria-label="${t.close}">×</button>
          <div class="search-overlay__box">
            <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="9" cy="9" r="6"/><path d="m17 17-3.5-3.5"/></svg>
            <input class="search-overlay__input" type="text" placeholder="${t.placeholder}" autocomplete="off" spellcheck="false">
          </div>
          <div class="search-overlay__results" aria-live="polite"></div>
          <div class="search-overlay__empty" hidden>${t.empty}</div>
        </div>
      `;
      document.body.appendChild(ov);
      const input  = ov.querySelector('.search-overlay__input');
      const resBox = ov.querySelector('.search-overlay__results');
      const empty  = ov.querySelector('.search-overlay__empty');
      function render(q){
        if (!q.trim()) { resBox.innerHTML = ''; empty.hidden = true; return; }
        const hits = (window.ATH_SEARCH && window.ATH_SEARCH.search(q, 8)) || [];
        if (!hits.length) { resBox.innerHTML = ''; empty.hidden = false; return; }
        empty.hidden = true;
        resBox.innerHTML = hits.map(h => {
          const r = /\/linee\//.test(location.pathname) && h.url.indexOf('/') === 0 && !h.external ? '..' + h.url : h.url;
          const target = h.external ? ' target="_blank" rel="noopener"' : '';
          const titleHtml = (h.type === 'product' && h.lineName)
            ? `<span class="search-result__line">${h.lineName}</span> — ${h.title}`
            : h.title;
          return `<a class="search-result" href="${r}"${target}>
            <span class="search-result__type">${h.type}</span>
            <span class="search-result__title">${titleHtml}</span>
            ${h.desc ? `<span class="search-result__desc">${h.desc}</span>` : ''}
          </a>`;
        }).join('');
      }
      let debounceT;
      input.addEventListener('input', e => {
        clearTimeout(debounceT);
        debounceT = setTimeout(() => render(input.value), 80);
      });
      ov.addEventListener('click', e => { if (e.target === ov || e.target.closest('.search-overlay__close')) closeSearch(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape' && ov.classList.contains('open')) closeSearch(); });
      searchOverlay = ov;
      return ov;
    }
    function openSearch(){
      const ov = buildSearchOverlay();
      ov.classList.add('open');
      document.body.style.overflow = 'hidden';
      const inp = ov.querySelector('.search-overlay__input');
      inp.focus();
      setTimeout(() => inp.focus(), 100);
      if (typeof window.gaEvent === 'function') window.gaEvent('search_open', {});
    }
    function closeSearch(){
      if (searchOverlay) searchOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    document.querySelectorAll('[data-open-search]').forEach(b => b.addEventListener('click', openSearch));
    window.ATH_OPEN_SEARCH = openSearch;

    // Wire "Preferenze cookie" link in footer to reopen the banner
    el.querySelectorAll('[data-cookie-prefs]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        if (window.CookieConsent) window.CookieConsent.show();
      });
    });

    const big = el.querySelector('.footer__big');

    const applyFit = () => {
      const W = el.offsetWidth;
      if (!W) return;

      const probe = document.createElement('span');
      probe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;white-space:nowrap;visibility:hidden;font-family:"Cormorant Garamond",serif;font-weight:300;font-size:100px;letter-spacing:0px';
      probe.textContent = big.textContent;
      document.body.appendChild(probe);
      const naturalW100 = probe.scrollWidth;
      document.body.removeChild(probe);

      const ratio = naturalW100 / 100;
      const chars = big.textContent.length;
      const lsEm = -0.04;
      const maxBigW = Math.min(W, 1100);
      const fontSize = maxBigW / (ratio + chars * lsEm);
      big.style.fontSize = fontSize + 'px';
      big.style.letterSpacing = (lsEm * fontSize) + 'px';

      // Shift text down so the visible letter bottom (baseline for caps) rests on the footer bottom edge
      const cv = document.createElement('canvas');
      const ctx = cv.getContext('2d');
      ctx.font = `300 ${fontSize}px "Cormorant Garamond", serif`;
      const m = ctx.measureText(big.textContent);
      const shift = Math.max(0, fontSize - m.fontBoundingBoxAscent - m.actualBoundingBoxDescent);
      big.style.transform = `translateY(${shift}px)`;
    };

    document.fonts.load('300 100px "Cormorant Garamond"').then(applyFit);
    window.addEventListener('resize', applyFit, { passive: true });
  };

  /* ---- Reveal on scroll ---- */
  window.initReveal = function () {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('[data-reveal]:not([data-reveal-repeat])').forEach(el => io.observe(el));
  };

  /* ---- Repeat reveal "” sia a scendere che a salire ---- */
  window.initRepeatReveal = function () {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        e.target.classList.toggle('is-visible', e.isIntersecting);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('[data-reveal-repeat]').forEach(el => io.observe(el));
  };

  /* ---- Custom cursor ---- */
  window.initCursor = function () {
    if (window.matchMedia('(max-width: 900px)').matches) return;
    const c = document.createElement('div'); c.className = 'cursor';
    document.body.appendChild(c);
    let x=0,y=0,tx=0,ty=0;
    document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
    const tick = () => { x += (tx-x)*0.2; y += (ty-y)*0.2; c.style.transform = `translate(${x-4}px,${y-4}px)`; requestAnimationFrame(tick); };
    tick();
    document.querySelectorAll('a, button, .tile, .interactive').forEach(el => {
      el.addEventListener('mouseenter', () => c.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => c.classList.remove('is-hover'));
    });
  };

  /* ---- Product mock visual ---- */
  window.productMock = function (palette, name = '', shape = 'bottle') {
    const colors = {
      argan: ['#c9a96e','#9a7f4a','#f0e6d2'],
      cocco: ['#ffffff','#e8dcc0','#d4b896'],
      mandorle: ['#e8d4b8','#b89572','#f2e6d0'],
      purysens: ['#a8b8a0','#5a6b4e','#e4ebdf'],
      antieta: ['#b89572','#8a5a3a','#ead8c8'],
      illumia: ['#e8cfa0','#c9a96e','#f7ead0'],
      nutra: ['#9a7a5a','#6a4a2a','#e8d9c2'],
      estratti: ['#7a8a6a','#3a4a2a','#dfe5d3'],
      uomo: ['#3a4a3a','#1a2a1a','#d8dcd0'],
      innovation: ['#2a2a2a','#1a1a1a','#e5e0d6'],
      everby: ['#e8a8b8','#c878a0','#f5e0e6'],
      kaley: ['#8a5a3a','#5a3a1a','#ead8c8'],
      sphea: ['#1a1a1a','#3a3a3a','#c9a96e'],
    };
    const [c1, c2, c3] = colors[palette] || colors.argan;
    const shapes = {
      bottle: `<rect x="40" y="22" width="20" height="8" fill="${c2}" rx="1"/><rect x="35" y="30" width="30" height="80" fill="${c1}" rx="4"/><rect x="38" y="50" width="24" height="30" fill="${c3}" opacity=".4"/><text x="50" y="68" text-anchor="middle" font-family="serif" font-size="5" fill="${c2}" font-style="italic">${name}</text><text x="50" y="76" text-anchor="middle" font-family="sans-serif" font-size="3.5" fill="${c2}" letter-spacing="1">ATHENA'S</text>`,
      jar: `<ellipse cx="50" cy="35" rx="28" ry="5" fill="${c2}"/><rect x="22" y="35" width="56" height="55" fill="${c1}"/><ellipse cx="50" cy="35" rx="28" ry="5" fill="${c3}" opacity=".3"/><rect x="30" y="55" width="40" height="20" fill="${c3}" opacity=".3"/><text x="50" y="68" text-anchor="middle" font-family="serif" font-size="5" fill="${c2}" font-style="italic">${name}</text>`,
      tube: `<rect x="32" y="22" width="36" height="6" fill="${c2}" rx="2"/><path d="M32 28 L68 28 L70 115 L30 115 Z" fill="${c1}"/><rect x="38" y="55" width="24" height="40" fill="${c3}" opacity=".4"/><text x="50" y="80" text-anchor="middle" font-family="serif" font-size="5" fill="${c2}" font-style="italic">${name}</text>`,
      pipette: `<rect x="42" y="18" width="16" height="16" fill="${c2}" rx="1"/><rect x="36" y="34" width="28" height="80" fill="${c1}" rx="3"/><rect x="44" y="50" width="12" height="55" fill="${c3}" opacity=".5" rx="1"/><text x="50" y="90" text-anchor="middle" font-family="serif" font-size="4" fill="${c2}" font-style="italic">${name}</text>`,
    };
    return `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><defs><linearGradient id="grad-${palette}-${shape}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${c1}" stop-opacity="1"/><stop offset="100%" stop-color="${c2}" stop-opacity=".8"/></linearGradient></defs>${shapes[shape] || shapes.bottle}</svg>`;
  };

  /* ---- Lenis smooth scroll ---- */
  function initLenis() {
    if (window.innerWidth <= 860) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof Lenis === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    window.lenis = lenis;
  }

  /* ---- Magnetic buttons ---- */
  function initMagneticButtons() {
    if ('ontouchstart' in window) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const selectors = '.btn, .lab-btn, .ev-btn, .kh-btn, .coh-btn, .eco-btn, .btn--magnetic';
    document.querySelectorAll(selectors).forEach(el => {
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - rect.left - rect.width / 2;
        const dy = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ---- SideNav ---- */
  function initSideNav(activeKey) {
    const path = window.location.pathname.replace(/\\/g, '/');
    const file = path.split('/').pop() || 'index.html';

    const skipList = ['contatti.html', 'index.html', 'linee.html', 'brand.html', 'privacy.html', 'catalogo.html'];
    if (skipList.includes(file)) return;
    if (/prodotto|linea\.html/.test(file)) return;

    function getLabel(el) {
      function clean(s) {
        return s.split('\n')[0]
          .replace(/\s+/g, ' ')
          .replace(/^[^a-zA-ZÀ-ſ]+/, '')
          .split(/\s*[·\/]\s*/)[0]
          .trim()
          .slice(0, 28);
      }
      const secLabel = el.querySelector('.sec-label');
      if (secLabel) {
        const ey = secLabel.querySelector('.eyebrow');
        if (ey) return clean(ey.textContent);
      }
      const phase = el.querySelector('.lab-phase__n');
      if (phase) return clean(phase.textContent);
      const ey = el.querySelector('[class*="eyebrow"]');
      if (ey) return clean(ey.textContent);
      const h = el.querySelector('h1, h2');
      if (h) return clean(h.innerText || h.textContent);
      return '';
    }

    const allSections = [...document.querySelectorAll('section')];
    const topSections = allSections.filter(el => !el.parentElement?.closest('section'));

    const items = [];
    topSections.forEach(el => {
      if (el.offsetHeight < 200) return;
      const label = getLabel(el);
      if (!label) return;
      items.push({ el, label });
    });

    if (items.length < 4) return;

    const nav = document.createElement('nav');
    nav.className = 'sidenav';
    nav.setAttribute('aria-hidden', 'true');

    // Pre-load all lazy images on first SideNav click: avoids "ritardo immagini"
    // quando l'utente salta da una sezione all'altra
    let lazyEagerized = false;
    const eagerizeAllLazyImages = () => {
      if (lazyEagerized) return;
      lazyEagerized = true;
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.loading = 'eager';
        // Trick: forces browser to start fetch immediately even before paint
        if (!img.complete && img.dataset && img.src) img.fetchPriority = 'high';
      });
    };

    const dots = items.map(({ el, label }) => {
      const btn = document.createElement('button');
      btn.className = 'sidenav__dot';
      btn.setAttribute('data-label', label);
      btn.setAttribute('aria-label', label);
      btn.addEventListener('click', () => {
        eagerizeAllLazyImages();
        if (window.lenis) {
          window.lenis.scrollTo(el, { offset: -80 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
      nav.appendChild(btn);
      return { btn, el };
    });

    document.body.appendChild(nav);

    // Active dot tracking (scroll-based)
    const updateActive = () => {
      const threshold = window.scrollY + window.innerHeight * 0.5;
      let active = 0;
      dots.forEach(({ el }, i) => {
        if (el.getBoundingClientRect().top + window.scrollY <= threshold) active = i;
      });
      dots.forEach(({ btn }, i) => btn.classList.toggle('is-active', i === active));
    };
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();

    // Mood detection
    function getLuminance(rgb) {
      const m = rgb.match(/\d+\.?\d*/g);
      if (!m || m.length < 3) return 1;
      const [R, G, B] = m.slice(0, 3).map(c => {
        c = Number(c) / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    }

    function detectSidenavMood() {
      const rect = nav.getBoundingClientRect();
      const sampleX = 50;
      const sampleY = rect.top + rect.height / 2;
      let el = document.elementFromPoint(sampleX, sampleY);
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const bgImage = style.backgroundImage;
        const bgColor = style.backgroundColor;
        if (bgImage && bgImage !== 'none') {
          const fallback = el.closest('[data-mood-fallback]');
          return fallback ? fallback.dataset.moodFallback : 'dark';
        }
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          return getLuminance(bgColor) < 0.5 ? 'dark' : 'light';
        }
        el = el.parentElement;
      }
      return 'light';
    }

    let _lastMoodCheck = 0;
    let _rafPending = false;

    const updateMood = () => {
      const now = Date.now();
      if (now - _lastMoodCheck < 100) return;
      _lastMoodCheck = now;
      const mood = detectSidenavMood();
      nav.classList.toggle('sidenav--on-dark', mood === 'dark');
      nav.classList.toggle('sidenav--on-light', mood === 'light');
    };

    const onScrollMood = () => {
      if (_rafPending) return;
      _rafPending = true;
      requestAnimationFrame(() => {
        updateMood();
        _rafPending = false;
      });
    };

    window.addEventListener('scroll', onScrollMood, { passive: true });
    updateMood();
  }

  /* ---- Init ---- */
  function initVanishOnScroll() {
    const els = document.querySelectorAll('.vanish-on-scroll');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.intersectionRatio < 0.3 && e.boundingClientRect.top < 0) {
          e.target.setAttribute('data-scroll-state', 'exiting');
        } else {
          e.target.removeAttribute('data-scroll-state');
        }
      });
    }, { threshold: [0, 0.3, 1] });
    els.forEach(el => obs.observe(el));
  }

  window.initAthenas = function (activeKey, opts) {
    renderTopbar(activeKey, opts);
    renderFooter();
    ATH.applyLang();
    initReveal();
    initRepeatReveal();
    initCursor();
    initLenis();
    initMagneticButtons();
    initSideNav(activeKey);
    initVanishOnScroll();
  };
})();

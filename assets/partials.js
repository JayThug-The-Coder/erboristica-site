/* Shared partials — Italian-first, aligned with erboristica.com taxonomy */
(function(){
  const PAGES = {
    home:        'home.html',
    viso:        'category-viso.html',
    corpo:       'category-corpo.html',
    capelli:     'category-capelli.html',
    occhi:       'category-occhi.html',
    novita:      'category-novita.html',
    linee:       'lines.html',
    product:     'product.html',
    about:       'about.html',
    ingredients: 'ingredients.html',
    journal:     'journal.html',
    stores:      'stores.html',
    contact:     'contact.html',
    cart:        'cart.html',
    checkout:    'checkout.html',
  };

  function topbar(){
    return `
      <div class="topbar">
        <span>— Manufacturer di cosmetica naturale dal 1969 · Pianoro, Bologna · 100% Made in Italy —</span>
        <div style="display:flex; gap:18px; position:absolute; right:32px;">
          <span class="lang active" data-lang="it">IT</span>
          <span class="lang" data-lang="en">EN</span>
        </div>
      </div>
    `;
  }

  function nav(active){
    const is = k => active === k ? 'active' : '';
    return `
      <nav class="nav">
        <div class="nav-inner">
          <div class="nav-links">
            <div class="nav-item"><a href="${PAGES.viso}" class="${is('viso')}">Viso</a>
              <div class="megamenu">${mm('viso')}</div>
            </div>
            <div class="nav-item"><a href="${PAGES.corpo}" class="${is('corpo')}">Corpo</a>
              <div class="megamenu">${mm('corpo')}</div>
            </div>
            <div class="nav-item"><a href="${PAGES.capelli}" class="${is('capelli')}">Capelli</a>
              <div class="megamenu">${mm('capelli')}</div>
            </div>
            <div class="nav-item"><a href="${PAGES.occhi}" class="${is('occhi')}">Occhi</a>
              <div class="megamenu">${mm('occhi')}</div>
            </div>
            <div class="nav-item"><a href="${PAGES.linee}" class="${is('linee')}">Linee</a>
              <div class="megamenu">${mmLines()}</div>
            </div>
            <a href="${PAGES.novita}" class="${is('novita')}">Novità</a>
          </div>
          <a href="${PAGES.home}" class="brand">
            Erboristica<small>[ logo placeholder · dal 1969 ]</small>
          </a>
          <div class="nav-utils">
            <button aria-label="Cerca">Cerca</button>
            <a href="#">Account</a>
            <a href="${PAGES.cart}" class="bag">Carrello (<span id="bag-count">2</span>)</a>
          </div>
        </div>
      </nav>
    `;
  }

  const MM = {
    viso: {
      step: ['Detergere', 'Preparare', 'Trattare', 'Idratare', 'Maschere'],
      concern: ['Antietà', 'Idratazione', 'Luminosità', 'Imperfezioni', 'Pelli sensibili'],
      ingredient: ['Niacinamide', 'Retinolo', 'Vitamina C', 'Acido Ialuronico', 'Estratti botanici'],
      featureLabel: 'Il rituale in 4 gesti',
      featureDesc: '[ Copy a cura del brand: descrizione breve del rituale viso. ]',
    },
    corpo: {
      step: ['Bagno & Doccia', 'Crema Corpo', 'Olio Corpo', 'Scrub', 'Mani'],
      concern: ['Secchezza', 'Elasticità', 'Tonificazione'],
      ingredient: ['Cocco', 'Argan', 'Mandorle dolci', 'Piante alpine'],
      featureLabel: 'Rituale corpo',
      featureDesc: '[ Copy a cura del brand: tono e filosofia corpo. ]',
    },
    capelli: {
      step: ['Shampoo', 'Balsamo', 'Maschera', 'Oli', 'Trattamenti'],
      concern: ['Crespo', 'Capelli colorati', 'Volume', 'Cute sensibile'],
      ingredient: ['Argan', 'Cocco', 'Mandorle', 'Estratti botanici'],
      featureLabel: 'Nutra Repair',
      featureDesc: '[ Copy a cura del brand: introduzione linea capelli. ]',
    },
    occhi: {
      step: ['Contorno Occhi', 'Struccanti', 'Patch', 'Sieri'],
      concern: ['Occhiaie', 'Borse', 'Rughe'],
      ingredient: ['Caffeina', 'Acido Ialuronico', 'Peptidi'],
      featureLabel: 'Sguardo fresco',
      featureDesc: '[ Copy a cura del brand: filosofia cura occhi. ]',
    },
  };

  function mm(k){
    const d = MM[k];
    const li = arr => arr.map(x=>`<li><a href="category-${k}.html">${x}</a></li>`).join('');
    return `
      <div class="mm-inner">
        <div class="mm-col">
          <h4>Per rituale</h4>
          <ul>${li(d.step)}</ul>
        </div>
        <div class="mm-col">
          <h4>Per esigenza</h4>
          <ul>${li(d.concern)}</ul>
        </div>
        <div class="mm-col">
          <h4>Per ingrediente</h4>
          <ul>${li(d.ingredient)}</ul>
        </div>
        <div class="mm-feature">
          <div class="ph ph--alt" data-label="[ immagine menu · ${k} ]"></div>
          <div>
            <div class="eyebrow" style="margin-bottom:4px;">${d.featureLabel}</div>
            <div class="cap">${d.featureDesc}</div>
          </div>
        </div>
      </div>
    `;
  }

  function mmLines(){
    const lines = ['Everby','Kaley','Pearls','Mineral Infusions','Doppia Detersione','Illumià','Antietà Globale','Cocco','Olio di Argan','Olio di Mandorle','Nutra Repair','Purysens','Uomo','Estratti Botanici','Deodorina','Articoli da Regalo'];
    const col1 = lines.slice(0,6), col2 = lines.slice(6,11), col3 = lines.slice(11);
    const li = arr => arr.map(x=>`<li><a href="line.html">${x}</a></li>`).join('');
    return `
      <div class="mm-inner">
        <div class="mm-col"><h4>In evidenza</h4><ul>${li(col1)}</ul></div>
        <div class="mm-col"><h4>Classiche</h4><ul>${li(col2)}</ul></div>
        <div class="mm-col"><h4>Specifiche</h4><ul>${li(col3)}</ul></div>
        <div class="mm-feature">
          <div class="ph" data-label="[ immagine linea in evidenza ]"></div>
          <div>
            <div class="eyebrow" style="margin-bottom:4px;">Nuova linea</div>
            <div class="cap">[ Testo breve di lancio della linea in evidenza. ]</div>
          </div>
        </div>
      </div>
    `;
  }

  function footer(){
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <div class="brand-lg">Erboristica</div>
              <p style="opacity:.7; font-size:13px; line-height:1.6; max-width:340px;">
                [ Claim brand · "0% derivati petrolchimici, siliconi, coloranti — 100% attivi di origine naturale". Sostituire con copy definitivo. ]
              </p>
              <div style="margin-top:28px;">
                <div style="font-family: var(--font-mono); font-size:10px; letter-spacing:0.18em; text-transform:uppercase; opacity:0.6; margin-bottom:12px;">Iscriviti alla newsletter</div>
                <div style="display:flex; border-bottom:1px solid oklch(0.5 0.02 130); max-width:340px; padding-bottom:4px;">
                  <input placeholder="la-tua@email.it" style="flex:1; background:transparent; border:none; color:inherit; outline:none; padding: 10px 0; font-family: var(--font-sans); font-size: 14px;"/>
                  <button style="font-family:var(--font-mono); font-size:10px; letter-spacing:0.2em; text-transform:uppercase; opacity:0.9;">Iscriviti →</button>
                </div>
              </div>
            </div>
            <div>
              <h5>Shop</h5>
              <ul>
                <li><a href="${PAGES.viso}">Viso</a></li>
                <li><a href="${PAGES.corpo}">Corpo</a></li>
                <li><a href="${PAGES.capelli}">Capelli</a></li>
                <li><a href="${PAGES.occhi}">Occhi</a></li>
                <li><a href="${PAGES.linee}">Tutte le linee</a></li>
                <li><a href="${PAGES.novita}">Novità</a></li>
              </ul>
            </div>
            <div>
              <h5>Scopri</h5>
              <ul>
                <li><a href="${PAGES.about}">Chi siamo</a></li>
                <li><a href="${PAGES.ingredients}">Ingredienti</a></li>
                <li><a href="${PAGES.journal}">News</a></li>
                <li><a href="${PAGES.stores}">Punti vendita</a></li>
                <li><a href="#">Routine finder</a></li>
                <li><a href="#">Sostenibilità</a></li>
              </ul>
            </div>
            <div>
              <h5>Assistenza</h5>
              <ul>
                <li><a href="${PAGES.contact}">Contatti</a></li>
                <li><a href="#">Spedizioni</a></li>
                <li><a href="#">Resi</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Traccia ordine</a></li>
                <li><a href="#">Condizioni di vendita</a></li>
                <li><a href="#">Privacy · Cookie</a></li>
              </ul>
            </div>
            <div>
              <h5>Seguici</h5>
              <ul>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">TikTok</a></li>
                <li><a href="#">YouTube</a></li>
                <li><a href="#">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© 2026 · Mock scheletro · testi e foto da inserire</span>
            <span>Privacy · Cookie · Centro Privacy · Legal</span>
          </div>
        </div>
      </footer>
    `;
  }

  window.ErbPartials = { topbar, nav, footer };
})();

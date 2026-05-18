/* ATHENA'S — Data store (JSON master loader)
 * Carica assets/data.json e fornisce un'API globale per accedere
 * a prodotti, linee, brand, certificazioni, info azienda.
 *
 * Pattern d'uso nelle pagine:
 *   <script src="assets/datastore.js"></script>
 *   <script>
 *     ATH_DATA.ready(() => {
 *       const p = ATH_DATA.product('antieta-fiale-concentrato-rimpolpante');
 *       const products = ATH_DATA.byLine('antieta');
 *       const certs = ATH_DATA.certifications();
 *     });
 *   </script>
 */
(function () {
  const DATA_URL = (() => {
    // Permette di usare datastore.js anche da pagine in /linee/
    const inSubfolder = location.pathname.includes('/linee/');
    return inSubfolder ? '../assets/data.json' : 'assets/data.json';
  })();

  let _data = null;
  let _readyCallbacks = [];
  let _loadPromise = null;

  function _xhrLoad() {
    // Se data-inline.js è già stato caricato, usa quello (funziona via file://)
    if (window.ATH_DATA_JSON) return Promise.resolve(window.ATH_DATA_JSON);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', DATA_URL, true);
      xhr.responseType = 'json';
      xhr.onload = () => {
        if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 300)) {
          const j = xhr.response || JSON.parse(xhr.responseText);
          resolve(j);
        } else {
          reject(new Error('data.json xhr failed: ' + xhr.status));
        }
      };
      xhr.onerror = () => reject(new Error('data.json xhr network error'));
      xhr.send();
    });
  }

  function load() {
    if (_loadPromise) return _loadPromise;
    _loadPromise = _xhrLoad()
      .then(j => {
        _data = j;
        _readyCallbacks.forEach(cb => {
          try { cb(j); } catch (e) { console.error('ATH_DATA callback error', e); }
        });
        _readyCallbacks = [];
        return j;
      })
      .catch(err => {
        console.error('[ATH_DATA] load error', err);
        throw err;
      });
    return _loadPromise;
  }

  // Public API
  window.ATH_DATA = {
    /** Esegue cb quando i dati sono caricati (o subito se già pronti) */
    ready(cb) {
      if (_data) { cb(_data); return; }
      _readyCallbacks.push(cb);
      load();
    },

    /** Promise dei dati (per await) */
    load() { return load(); },

    /** Tutti i dati grezzi */
    all() { return _data; },

    /** Trova un prodotto per id (slug del prodotto). Ritorna null se non esiste. */
    product(id) {
      if (!_data) return null;
      return _data.products.find(p => p.id === id) || null;
    },

    /** Trova un prodotto per SKU. Ritorna null se non esiste. */
    productBySku(sku) {
      if (!_data) return null;
      return _data.products.find(p => p.sku === sku) || null;
    },

    /** Tutti i prodotti di una linea (ordinati per nome) */
    byLine(lineId) {
      if (!_data) return [];
      return _data.products
        .filter(p => p.line === lineId)
        .sort((a, b) => a.name_it.localeCompare(b.name_it));
    },

    /** Tutti i prodotti di un brand */
    byBrand(brandId) {
      if (!_data) return [];
      return _data.products.filter(p => p.brand === brandId);
    },

    /** Tutte le linee di un brand (ordinate per sort_order) */
    linesOfBrand(brandId) {
      if (!_data) return [];
      return Object.entries(_data.lines)
        .filter(([id, l]) => l.brand === brandId)
        .map(([id, l]) => ({ id, ...l }))
        .sort((a, b) => (a.sort_order || 999) - (b.sort_order || 999));
    },

    /** Metadati di una linea per id */
    line(id) {
      return _data ? _data.lines[id] : null;
    },

    /** Metadati di un brand per id */
    brand(id) {
      return _data ? _data.brands[id] : null;
    },

    /** Tutte le certificazioni (object) */
    certifications() {
      return _data ? _data.certifications : {};
    },

    /** Una certificazione per id */
    cert(id) {
      return _data && _data.certifications[id] ? _data.certifications[id] : null;
    },

    /** Info azienda */
    company() {
      return _data ? _data.company : null;
    },

    /** Partnership (Università, OPIMM, LifeGate, Bioagricert) */
    partnerships() {
      return _data ? _data.partnerships : {};
    },

    /** Tutte le linee come array ordinato per sort_order */
    allLines() {
      if (!_data) return [];
      return Object.entries(_data.lines)
        .map(([id, l]) => ({ id, ...l }))
        .sort((a, b) => (a.sort_order || 999) - (b.sort_order || 999));
    },

    /** Tutti i brand come array */
    allBrands() {
      if (!_data) return [];
      return Object.entries(_data.brands)
        .map(([id, b]) => ({ id, ...b }));
    },

    /** Tutti i prodotti */
    allProducts() {
      return _data ? _data.products : [];
    },

    /** Filtro generico: { line, brand, has_cert, search } */
    filter(criteria = {}) {
      if (!_data) return [];
      let out = _data.products.slice();
      if (criteria.line) out = out.filter(p => p.line === criteria.line);
      if (criteria.brand) out = out.filter(p => p.brand === criteria.brand);
      if (criteria.has_cert) out = out.filter(p => (p.certifications || []).includes(criteria.has_cert));
      if (criteria.search) {
        const q = criteria.search.toLowerCase();
        out = out.filter(p =>
          (p.name_it || '').toLowerCase().includes(q) ||
          (p.subtitle_it || '').toLowerCase().includes(q) ||
          (p.inci || '').toLowerCase().includes(q)
        );
      }
      return out;
    },

    /** Restituisce il path immagine del prodotto, oppure null se la foto non esiste ancora */
    imagePath(productId, kind = 'hero') {
      const p = this.product(productId);
      if (!p || !p.images) return null;
      return p.images[kind] || null;
    },
  };

  // Auto-load on script include
  load();
})();

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

/* ── Glossario attivi IT → EN ───────────────────────────────────────────────
 * actives_main nel master JSON e' solo in italiano. Questo glossario traduce i
 * nomi descrittivi degli attivi per card e liste in lingua EN. I termini gia
 * inglesi / INCI / latini e i nomi propri di brand (Aloe Vera, Niacinamide,
 * Bakuchiol, Ectoin, Argireline, Capixyl, MAXI-LIP, Luminescine, Pumpcoll,
 * Centella Asiatica, Ginkgo Biloba, Tea Tree, ecc.) non sono mappati: ricadono
 * sul fallback che mantiene il valore originale. */
window.ATH_ATTIVI_EN = {
  'Acidi grassi Omega-9': 'Omega-9 Fatty Acids',
  'Acido Ialuronico': 'Hyaluronic Acid',
  'Acido Ialuronico HMW': 'High Molecular Weight Hyaluronic Acid',
  'Acido Ialuronico LMW': 'Low Molecular Weight Hyaluronic Acid',
  'Acido Ialuronico a diverso peso molecolare': 'Multi-weight Hyaluronic Acid',
  'Acido Salicilico': 'Salicylic Acid',
  'Acido Succinico': 'Succinic Acid',
  'Acqua di Riso Fermentata': 'Fermented Rice Water',
  'Amido di Riso': 'Rice Starch',
  'Argilla Rosa': 'Pink Clay',
  'Bergamotto': 'Bergamot',
  'Bisabololo': 'Bisabolol',
  'Burri Vegetali': 'Plant Butters',
  'Burro di Cocco': 'Coconut Butter',
  'Burro di Karité': 'Shea Butter',
  'Caffeina': 'Caffeine',
  'Camomilla': 'Chamomile',
  'Cedro': 'Cedar',
  'Cellule Meristematiche di Vite Rossa': 'Red Vine Meristem Cells',
  'Cellule Meristematiche Vite Rossa': 'Red Vine Meristem Cells',
  'Cellule Staminali Vegetali': 'Plant Stem Cells',
  'Cellule Staminali Curcuma': 'Turmeric Stem Cells',
  'Cheratina idrolizzata': 'Hydrolysed Keratin',
  'Cheratina vegetale': 'Plant Keratin',
  'Coenzima Q10': 'Coenzyme Q10',
  'Collagene marino idrolizzato': 'Hydrolysed Marine Collagen',
  'Collagene vegetale': 'Plant Collagen',
  'Collagene vegetale idrolizzato': 'Hydrolysed Plant Collagen',
  'Estratto di Abete Bianco': 'White Fir Extract',
  'Estratto di Agrumi': 'Citrus Extract',
  'Estratto di Bambù': 'Bamboo Extract',
  'Estratto di Betulla': 'Birch Extract',
  'Estratto di Caffè': 'Coffee Extract',
  'Estratto di Camelia Japonica': 'Camellia Japonica Extract',
  'Estratto di Tè Verde': 'Green Tea Extract',
  'Fitosteroli': 'Phytosterols',
  'Genziana alpina': 'Alpine Gentian',
  'Glicerina': 'Glycerin',
  'Glicerina naturale': 'Natural Glycerin',
  'Glicerina naturale di processo': 'Natural Process Glycerin',
  'Granuli di Albicocca': 'Apricot Granules',
  'Kaolino': 'Kaolin',
  'Menta Piperita': 'Peppermint',
  'Micro-granuli di Jojoba': 'Jojoba Micro-granules',
  'Microperle Minerali Illuminanti': 'Illuminating Mineral Micro-pearls',
  'Microperle Illuminanti': 'Illuminating Micro-pearls',
  'Monoï di Tahiti': 'Tahitian Monoï',
  'Olio Essenziale di Bergamotto': 'Bergamot Essential Oil',
  'Olio Essenziale di Neroli': 'Neroli Essential Oil',
  'Olio Essenziale di Patchouli': 'Patchouli Essential Oil',
  'Olio Essenziale di Rosa': 'Rose Essential Oil',
  'Olio Puro di Baobab Biologico': 'Pure Organic Baobab Oil',
  'Olio di Argan': 'Argan Oil',
  'Olio di Argan Virgin 100%': '100% Virgin Argan Oil',
  'Olio di Argan biologico': 'Organic Argan Oil',
  'Olio di Baobab Biologico': 'Organic Baobab Oil',
  'Olio di Camelia': 'Camellia Oil',
  'Olio di Cocco': 'Coconut Oil',
  'Olio di Cocco Virgin': 'Virgin Coconut Oil',
  'Olio di Cocco saponificato': 'Saponified Coconut Oil',
  'Olio di Girasole': 'Sunflower Oil',
  'Olio di Girasole biologico': 'Organic Sunflower Oil',
  'Olio di Jojoba': 'Jojoba Oil',
  'Olio di Lampone': 'Raspberry Oil',
  'Olio di Mandorle Dolci': 'Sweet Almond Oil',
  'Olio di Mandorle Dolci Virgin': 'Virgin Sweet Almond Oil',
  'Olio di Monoi di Tahiti': 'Tahitian Monoï Oil',
  'Olio di Oliva': 'Olive Oil',
  'Olio di Oliva saponificato': 'Saponified Olive Oil',
  'Olio di Palma sostenibile saponificato': 'Saponified Sustainable Palm Oil',
  'Olio di Ricino': 'Castor Oil',
  'Olio di Riso': 'Rice Oil',
  'Olio di Semi di Cotone': 'Cottonseed Oil',
  'Olio di Semi di Lino': 'Linseed Oil',
  'Olio essenziale di Arancio dolce': 'Sweet Orange Essential Oil',
  'Pantenolo': 'Panthenol',
  'Pepe Rosa': 'Pink Pepper',
  'Peptidi': 'Peptides',
  'Peptidi anti-età': 'Anti-ageing Peptides',
  'Peptidi anti-rughe': 'Anti-wrinkle Peptides',
  'Peptidi vegetali': 'Plant Peptides',
  'Pigmenti Minerali Perlati': 'Pearlescent Mineral Pigments',
  'Pigmenti ottici riflettenti': 'Reflective Optical Pigments',
  'Polvere detergente vegetale': 'Plant Cleansing Powder',
  'Proteine della seta': 'Silk Proteins',
  'Resveratrolo': 'Resveratrol',
  'Retinolo': 'Retinol',
  'Sambuco nero': 'Black Elderberry',
  'Saponificazione a freddo': 'Cold Saponification',
  'Squalene naturale': 'Natural Squalene',
  'Tensioattivi dolci di origine vegetale': 'Gentle Plant-derived Surfactants',
  'Tensioattivi vegetali': 'Plant Surfactants',
  'Tensioattivi vegetali delicati': 'Gentle Plant Surfactants',
  'Tensioattivi vegetali dolci': 'Mild Plant Surfactants',
  'Vitamina A': 'Vitamin A',
  'Vitamina A-C-E': 'Vitamin A-C-E',
  'Vitamina C': 'Vitamin C',
  'Vitamina C Stabilizzata': 'Stabilised Vitamin C',
  'Vitamina C stabilizzata': 'Stabilised Vitamin C',
  'Vitamina E': 'Vitamin E',
  'Vitamina E naturale': 'Natural Vitamin E',
  'Zinco PCA': 'Zinc PCA',
  'Zinco Ricinoleato': 'Zinc Ricinoleate',
};

/* Traduce il nome di un singolo attivo. Se lang != 'en' o il termine non e' nel
 * glossario, ritorna il valore originale. Ripulisce eventuali suffissi ' — ...'
 * e '(...)' prima del lookup. */
window.translateActive = function (name, lang) {
  if (lang !== 'en' || !name) return name;
  const clean = String(name).split('—')[0].split('(')[0].trim();
  return window.ATH_ATTIVI_EN[clean] || name;
};

/* Traduce una stringa di chip "A · B · C". I segmenti che contengono <strong>
 * (nomi propri di brand) restano invariati. */
window.translateActivesString = function (str, lang) {
  if (lang !== 'en' || !str) return str;
  return str.split('·')
    .map(s => /<strong/i.test(s) ? s.trim() : window.translateActive(s.trim(), 'en'))
    .join(' · ');
};

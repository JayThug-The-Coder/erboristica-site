/* Athena's — Search index (custom JS, no external dependencies)
 * Struttura: lista di documenti indicizzati con tags/sinonimi.
 * Cerca con normalizzazione (case + accenti) e match parziale.
 */
(function(){
  'use strict';

  // ───────────────────────────────────────────────────────────────
  // SINONIMI / VARIANTI italiane settore cosmetico
  // Espande automaticamente la query: cercare "antietà" trova anche "antirughe", "lifting", ecc.
  // ───────────────────────────────────────────────────────────────
  const SYNONYMS = {
    'antieta':   ['antieta', 'antieta globale', 'antiage', 'anti-age', 'antiaging', 'anti-aging', 'antirughe', 'anti-rughe', 'rughe', 'lifting', 'ridensificante', 'rassodante', 'compatto', 'invecchiamento', 'maturita', 'eta matura'],
    'argan':     ['argan', 'olio di argan', 'marocchino', 'argania', 'nutriente'],
    'cocco':     ['cocco', 'coconut', 'noce di cocco', 'monoi', 'tahiti', 'tropicale'],
    'mandorle':  ['mandorle', 'mandorla', 'mandorle dolci', 'almond', 'emolliente'],
    'estratti':  ['estratti botanici', 'botanica', 'erbe', 'calendula', 'camomilla', 'echinacea', 'rosmarino', 'lavanda', 'melissa', 'erbe officinali'],
    'purysens':  ['purysens', 'pelle sensibile', 'hypoallergenico', 'ipoallergenico', 'parfum free', 'senza profumo', 'delicato', 'reattiva'],
    'illumia':   ['illumia', 'illuminante', 'macchie', 'iperpigmentazione', 'discromia', 'niacinamide', 'vitamina c', 'liposomiale', 'liquirizia', 'glow'],
    'nutra':     ['nutra repair', 'nutrizione', 'baobab', 'karite', 'burro karite', 'ceramidi', 'pelle secca', 'secchezza'],
    'pearls':    ['pearls', 'perle', 'microsfere', 'sfere'],
    'mineral':   ['mineral infusions', 'bifasici', 'mineral', 'minerali', 'spray'],
    'doppia':    ['doppia detersione', 'double cleansing', 'k-beauty', 'detersione', 'doppia pulizia', 'olio detergente'],
    'uomo':      ['uomo', 'men', 'maschile', 'barba', 'dopobarba', 'aftershave', 'rasatura', 'shaving'],
    'pelle':     ['pelle', 'cute', 'epidermide', 'skin'],
    'viso':      ['viso', 'volto', 'faccia', 'face'],
    'corpo':     ['corpo', 'body', 'tronco'],
    'capelli':   ['capelli', 'capello', 'chioma', 'hair', 'tricologia', 'cuoio capelluto', 'scalp'],
    'crema':     ['crema', 'emulsione', 'lozione', 'cream'],
    'siero':     ['siero', 'serum', 'concentrato', 'fiale', 'booster'],
    'bagno':     ['bagno', 'bagnoschiuma', 'bagno schiuma', 'doccia', 'shower', 'gel doccia'],
    'detergente':['detergente', 'detergenza', 'cleanser', 'sapone', 'mousse', 'schiuma detergente', 'pulizia'],
    'maschera':  ['maschera', 'mask', 'impacco', 'face mask'],
    'struccante':['struccante', 'demaquillage', 'rimuovi trucco', 'makeup remover'],
    'profumo':   ['profumo', 'fragranza', 'eau de parfum', 'parfum', 'perfume', 'roll-on', 'rollon', 'olfattivo'],
    'olio':      ['olio', 'oil', 'olio corpo', 'olio capelli', 'olio viso'],
    'balsamo':   ['balsamo', 'conditioner', 'condizionatore'],
    'shampoo':   ['shampoo', 'sciampo'],
    'contorno':  ['contorno occhi', 'eye contour', 'occhiaie', 'borse', 'eye cream', 'crema occhi'],
    'naturale':  ['naturale', 'natural', 'vegetale', 'plant-based', 'origine vegetale', 'green'],
    'vegan':     ['vegan', 'vegano', 'vegana'],
    'spf':       ['spf', 'solare', 'protezione', 'sole', 'sun', 'sunscreen', 'antisolare'],
    'idratante': ['idratante', 'moisturizer', 'idratazione', 'hydra', 'umidita'],
    'nutriente': ['nutriente', 'nutrizione', 'nourishing', 'nutritivo'],
    'lenitivo':  ['lenitivo', 'calmante', 'soothing', 'lenisce', 'rossori'],
    // Brand keywords
    'erboristica': ['erboristica', 'l erboristica', 'erbe', 'naturale'],
    'sphea':       ['sphea', 'biopolimeri', 'marini', 'perle bio', 'alta gamma', 'premium'],
    'everby':      ['everby', 'k-beauty', 'kbeauty', 'glass skin', 'gen z', 'fermentata'],
    'kaley':       ['kaley', 'roll-on', 'profumo tasca', 'fragranza tasca'],
    // Section navigation
    'sostenibilita': ['sostenibilita', 'sostenibile', 'green', 'eco', 'ambiente', 'pianeta'],
    'laboratorio':   ['laboratorio', 'r&s', 'ricerca', 'sviluppo', 'r&d', 'innovazione', 'attivi', 'principi attivi'],
    'terzisti':      ['terzisti', 'conto terzi', 'private label', 'manifattura', 'manufacturer', 'contract', 'oem'],
    'contatti':      ['contatti', 'contact', 'email', 'telefono', 'indirizzo', 'spaccio', 'sede'],
    'azienda':       ['azienda', 'storia', 'history', 'famiglia', 'familiare', 'venturino', 'sanguettoli', 'pianoro', 'about', 'chi siamo'],
    'catalogo':      ['catalogo', 'catalog', 'tutti i prodotti', 'lista', 'gamma', 'assortimento']
  };

  // ───────────────────────────────────────────────────────────────
  // INDEX: documenti ricercabili (pagine principali)
  // ───────────────────────────────────────────────────────────────
  const PAGES = [
    { type: 'page', title: "Athena's · l'azienda", title_en: "Athena's · the company", url: '/', desc: 'Storia, fondatori, timeline, valori', desc_en: 'History, founders, timeline, values', tags: ['azienda', 'storia', 'home', 'chi siamo', 'about'] },
    { type: 'page', title: 'I nostri brand', title_en: 'Our brands', url: '/linee.html', desc: "L'Erboristica, Everby, Kaley, Sphea", desc_en: "L'Erboristica, Everby, Kaley, Sphea", tags: ['brand', 'linee', 'marchi', 'prodotti', 'catalogo', 'referenze'] },
    { type: 'page', title: 'Laboratorio R&S', title_en: 'R&D Lab', url: '/laboratorio.html', desc: 'Ricerca, innovazione, attivi cosmetici', desc_en: 'Research, innovation, cosmetic actives', tags: ['laboratorio'] },
    { type: 'page', title: 'Sostenibilità', title_en: 'Sustainability', url: '/sostenibilita.html', desc: 'Energia rinnovabile, scelte etiche, formule vegan', desc_en: 'Renewable energy, ethical choices, vegan formulas', tags: ['sostenibilita'] },
    { type: 'page', title: 'Conto Terzi B2B', title_en: 'B2B Private Label', url: '/terzisti.html', desc: 'Manifattura private label per cosmetica naturale', desc_en: 'Private-label manufacturing for natural cosmetics', tags: ['terzisti', 'b2b', 'private label'] },
    { type: 'page', title: 'Contatti', title_en: 'Contact', url: '/contatti.html', desc: 'Sede, telefono, email, spaccio aziendale', desc_en: 'Address, phone, email, factory outlet', tags: ['contatti', 'sede', 'spaccio'] }
  ];

  const BRANDS = [
    { type: 'brand', title: "l'Erboristica", title_en: "l'Erboristica", url: '/linee/erboristica.html', desc: "Il brand storico Athena's, cosmetica naturale, 10 linee", desc_en: "Athena's historic brand, natural cosmetics, 10 lines", tags: ['erboristica', 'naturale', 'erbe'] },
    { type: 'brand', title: 'Everby', title_en: 'Everby', url: '/linee/everby.html', desc: 'K-beauty contemporanea Gen Z, texture innovative', desc_en: 'Contemporary Gen Z K-beauty, innovative textures', tags: ['everby', 'k-beauty', 'gen z', 'glass skin'] },
    { type: 'brand', title: 'Kaley', title_en: 'Kaley', url: '/linee/kaley.html', desc: 'Profumi roll-on in olio concentrato, senza alcol', desc_en: 'Roll-on concentrated oil perfumes, alcohol-free', tags: ['kaley', 'profumo', 'fragranza', 'roll-on'] },
    { type: 'brand', title: 'Sphea', title_en: 'Sphea', url: '/linee/sphea.html', desc: 'Alta gamma, perle di biopolimeri marini, peptidi brevettati', desc_en: 'Premium, marine biopolymer pearls, patented peptides', tags: ['sphea', 'premium', 'perle', 'biopolimeri'] }
  ];

  const LINES = [
    { type: 'line', title: 'Antietà Globale', title_en: 'Global Anti-Aging', url: '/linee/linea.html?id=antieta', tags: ['antieta', 'rughe', 'rassodante', 'collagene', 'peptide'] },
    { type: 'line', title: 'Argan', title_en: 'Argan', url: '/linee/linea.html?id=argan', tags: ['argan', 'olio argan'] },
    { type: 'line', title: 'Cocco & Monoï', title_en: 'Coconut & Monoï', url: '/linee/linea.html?id=cocco', tags: ['cocco', 'monoi', 'tropicale'] },
    { type: 'line', title: 'Mandorle Dolci', title_en: 'Sweet Almonds', url: '/linee/linea.html?id=mandorle', tags: ['mandorle', 'emolliente'] },
    { type: 'line', title: 'Estratti Botanici', title_en: 'Botanical Extracts', url: '/linee/linea.html?id=estratti', tags: ['estratti', 'botanica', 'erbe officinali'] },
    { type: 'line', title: 'Purysens', title_en: 'Purysens', url: '/linee/linea.html?id=purysens', tags: ['purysens', 'pelle sensibile', 'parfum free'] },
    { type: 'line', title: 'Illumià', title_en: 'Illumià', url: '/linee/linea.html?id=illumia', tags: ['illumia', 'macchie', 'niacinamide', 'vitamina c'] },
    { type: 'line', title: 'Nutra Repair', title_en: 'Nutra Repair', url: '/linee/linea.html?id=nutra', tags: ['nutra', 'pelle secca', 'baobab', 'karite'] },
    { type: 'line', title: 'Pearls', title_en: 'Pearls', url: '/linee/linea.html?id=pearls', tags: ['pearls', 'perle', 'microsfere'] },
    { type: 'line', title: 'Mineral Infusions', title_en: 'Mineral Infusions', url: '/linee/linea.html?id=mineral-infusions', tags: ['mineral', 'bifasici', 'spray'] },
    { type: 'line', title: 'Doppia Detersione', title_en: 'Double Cleansing', url: '/linee/linea.html?id=doppia-detersione', tags: ['doppia detersione', 'k-beauty', 'olio detergente'] },
    { type: 'line', title: 'Uomo', title_en: 'Men', url: '/linee/linea.html?id=uomo', tags: ['uomo', 'rasatura', 'aftershave', 'barba'] }
  ];

  // ───────────────────────────────────────────────────────────────
  // NORMALIZATION + MATCHING
  // ───────────────────────────────────────────────────────────────
  function normalize(s) {
    return String(s || '')
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  function expandQuery(q) {
    const tokens = normalize(q).split(' ').filter(Boolean);
    const expanded = new Set(tokens);
    tokens.forEach(t => {
      for (const key in SYNONYMS) {
        const variants = SYNONYMS[key].map(normalize);
        if (variants.includes(t) || normalize(key) === t) {
          variants.forEach(v => expanded.add(v));
          expanded.add(normalize(key));
        }
      }
    });
    return [...expanded].filter(Boolean);
  }
  function scoreDoc(doc, queryTokens) {
    if (!queryTokens.length) return 0;
    const haystack = normalize([doc.title, doc.desc, (doc.tags || []).join(' '), doc.name || '', doc.sub || '', (doc.actives || []).join(' '), doc.brand || '', doc.line || '', doc.alt || ''].join(' '));
    let score = 0;
    queryTokens.forEach(t => {
      if (!t) return;
      const safeT = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (new RegExp('\\b' + safeT + '\\b').test(haystack)) score += 10;
      else if (haystack.indexOf(t) >= 0) score += 4;
      if (normalize(doc.title || doc.name).indexOf(t) >= 0) score += 5;
      if ((doc.tags || []).some(tag => normalize(tag) === t)) score += 8;
    });
    return score;
  }
  function getIndex() {
    const en = !!(typeof window !== 'undefined' && window.ATH && window.ATH.lang === 'en');
    // Pagine/brand/linee: risolvi titolo+descrizione nella lingua attiva, ma mantieni
    // entrambe le lingue in `alt` così la ricerca trova sia in IT che in EN.
    const idx = [].concat(PAGES, BRANDS, LINES).map(d => {
      const title = (en && d.title_en) ? d.title_en : d.title;
      const desc  = (en && d.desc_en)  ? d.desc_en  : d.desc;
      const alt   = [d.title, d.title_en, d.desc, d.desc_en].filter(Boolean).join(' ');
      return Object.assign({}, d, { title: title, desc: desc, alt: alt });
    });
    try {
      const data = window.ATH_DATA_JSON;
      if (data && data.products) {
        data.products.forEach(p => {
          if (!p.id || !p.name_it) return;
          const rawName = (en && p.name_en) ? p.name_en : p.name_it;
          const nice = (rawName || '').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
          const desc = ((en && p.subtitle_en ? p.subtitle_en : p.subtitle_it) || '').slice(0, 100);
          idx.push({
            type: 'product',
            title: nice,
            lineName: p.line_name || '',
            url: p.url || ('/linee/linea.html?id=' + p.line),
            external: !!p.url,
            desc: desc,
            brand: p.brand,
            line: p.line,
            name: p.name_it,
            sub: p.subtitle_it || '',
            alt: [p.name_it, p.name_en, p.subtitle_it, p.subtitle_en].filter(Boolean).join(' '),
            actives: p.actives_main || [],
            tags: [p.brand, p.line].concat(p.actives_main || [])
          });
        });
      }
    } catch (e) {}
    return idx;
  }
  function search(query, maxResults) {
    maxResults = maxResults || 10;
    if (!query || !query.trim()) return [];
    const tokens = expandQuery(query);
    const idx = getIndex();
    const results = [];
    idx.forEach(doc => {
      const s = scoreDoc(doc, tokens);
      if (s > 0) results.push({ doc: doc, score: s });
    });
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, maxResults).map(r => r.doc);
  }

  window.ATH_SEARCH = { search: search, getIndex: getIndex };
})();

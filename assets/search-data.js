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
    'vegan':     ['vegan', 'vegano', 'vegana', 'cruelty free', 'cruelty-free', 'animal free'],
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
    { type: 'page', title: "Athena's · l'azienda", url: '/', desc: 'Storia, fondatori, timeline, valori', tags: ['azienda', 'storia', 'home', 'chi siamo', 'about'] },
    { type: 'page', title: 'I nostri brand', url: '/linee.html', desc: "L'Erboristica, Everby, Kaley, Sphea", tags: ['brand', 'linee', 'marchi', 'prodotti', 'catalogo', 'referenze'] },
    { type: 'page', title: 'Laboratorio R&S', url: '/laboratorio.html', desc: 'Ricerca, innovazione, attivi cosmetici', tags: ['laboratorio'] },
    { type: 'page', title: 'Sostenibilità', url: '/sostenibilita.html', desc: 'Energia rinnovabile, scelte etiche, formule vegan', tags: ['sostenibilita'] },
    { type: 'page', title: 'Conto Terzi B2B', url: '/terzisti.html', desc: 'Manifattura private label per cosmetica naturale', tags: ['terzisti', 'b2b', 'private label'] },
    { type: 'page', title: 'Contatti', url: '/contatti.html', desc: 'Sede, telefono, email, spaccio aziendale', tags: ['contatti', 'sede', 'spaccio'] }
  ];

  const BRANDS = [
    { type: 'brand', title: "l'Erboristica", url: '/linee/erboristica.html', desc: "Il brand storico Athena's, cosmetica naturale, 10 linee", tags: ['erboristica', 'naturale', 'erbe'] },
    { type: 'brand', title: 'Everby', url: '/linee/everby.html', desc: 'K-beauty contemporanea Gen Z, texture innovative', tags: ['everby', 'k-beauty', 'gen z', 'glass skin'] },
    { type: 'brand', title: 'Kaley', url: '/linee/kaley.html', desc: 'Profumi roll-on in olio concentrato, senza alcol', tags: ['kaley', 'profumo', 'fragranza', 'roll-on'] },
    { type: 'brand', title: 'Sphea', url: '/linee/sphea.html', desc: 'Alta gamma, perle di biopolimeri marini, peptidi brevettati', tags: ['sphea', 'premium', 'perle', 'biopolimeri'] }
  ];

  const LINES = [
    { type: 'line', title: 'Antietà Globale', url: '/linee/linea.html?id=antieta', tags: ['antieta', 'rughe', 'rassodante', 'collagene', 'peptide'] },
    { type: 'line', title: 'Argan', url: '/linee/linea.html?id=argan', tags: ['argan', 'olio argan'] },
    { type: 'line', title: 'Cocco & Monoï', url: '/linee/linea.html?id=cocco', tags: ['cocco', 'monoi', 'tropicale'] },
    { type: 'line', title: 'Mandorle Dolci', url: '/linee/linea.html?id=mandorle', tags: ['mandorle', 'emolliente'] },
    { type: 'line', title: 'Estratti Botanici', url: '/linee/linea.html?id=estratti', tags: ['estratti', 'botanica', 'erbe officinali'] },
    { type: 'line', title: 'Purysens', url: '/linee/linea.html?id=purysens', tags: ['purysens', 'pelle sensibile', 'parfum free'] },
    { type: 'line', title: 'Illumià', url: '/linee/linea.html?id=illumia', tags: ['illumia', 'macchie', 'niacinamide', 'vitamina c'] },
    { type: 'line', title: 'Nutra Repair', url: '/linee/linea.html?id=nutra', tags: ['nutra', 'pelle secca', 'baobab', 'karite'] },
    { type: 'line', title: 'Pearls', url: '/linee/linea.html?id=pearls', tags: ['pearls', 'perle', 'microsfere'] },
    { type: 'line', title: 'Mineral Infusions', url: '/linee/linea.html?id=mineral-infusions', tags: ['mineral', 'bifasici', 'spray'] },
    { type: 'line', title: 'Doppia Detersione', url: '/linee/linea.html?id=doppia-detersione', tags: ['doppia detersione', 'k-beauty', 'olio detergente'] },
    { type: 'line', title: 'Uomo', url: '/linee/linea.html?id=uomo', tags: ['uomo', 'rasatura', 'aftershave', 'barba'] }
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
    const haystack = normalize([doc.title, doc.desc, (doc.tags || []).join(' '), doc.name || '', doc.sub || '', (doc.actives || []).join(' '), doc.brand || '', doc.line || ''].join(' '));
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
    const idx = [].concat(PAGES, BRANDS, LINES);
    try {
      const data = window.ATH_DATA_JSON;
      if (data && data.products) {
        data.products.forEach(p => {
          if (!p.id || !p.name_it) return;
          const nice = (p.name_it || '').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
          idx.push({
            type: 'product',
            title: nice,
            lineName: p.line_name || '',
            url: p.url || ('/linee/linea.html?id=' + p.line),
            external: !!p.url,
            desc: (p.subtitle_it || '').slice(0, 100),
            brand: p.brand,
            line: p.line,
            name: p.name_it,
            sub: p.subtitle_it || '',
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

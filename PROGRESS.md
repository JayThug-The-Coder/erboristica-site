# Athena's — Erboristica Site · Progress

> Questo file traccia tutto quello che è stato fatto sul sito e contiene la mappa **"Se voglio cambiare X, devo modificare Y"** — utile per modifiche future.

---

# 🗺️ MAPPA — Se voglio cambiare X, dove tocco?

## Testi e dati aziendali

| Cosa voglio cambiare | File da aprire | Punto |
|----------------------|---------------|-------|
| **Capitale sociale** (oggi € 52.000) | `assets/app.js` | cerca `Cap. soc.` |
| **P.IVA / REA / Cod. Fiscale** | `assets/app.js` | cerca `P.IVA 01457020392` |
| **Indirizzo Pianoro** | `assets/app.js` | cerca `Via del Lavoro` |
| **Telefono / Fax / Email** | `assets/app.js` | cerca `0510925111` |
| **Link Instagram / Facebook / LinkedIn** | `assets/app.js` | cerca `footer__social` |
| **Schema.org info Google** (orari spaccio, founders, geo) | `index.html` | cerca `application/ld+json` |
| **Voci del menu** (Azienda / Linee / Laboratorio / ecc.) | `assets/app.js` | cerca `navLinks` dentro `renderTopbar` |
| **Newsletter form (footer)** | `assets/app.js` | dentro `renderFooter` cerca `Newsletter` |
| **Banner cookie** (testo, categorie) | `assets/app.js` | cerca `buildBanner` |

## Contenuti delle pagine

| Cosa voglio cambiare | File da aprire | Punto |
|----------------------|---------------|-------|
| **Timeline storia azienda** (8 tappe 1969→2025) | `index.html` | cerca `tl-track` |
| **Hero home** (titolo + sottotitolo) | `index.html` | cerca `pg-hero` |
| **Frase Acqua di Parma / La Perla** | `terzisti.html` | cerca `maison italiane di prestigio` |
| **Certificazioni nel footer terzisti** | `terzisti.html` | cerca `tz-cert-pill` |
| **Lista clienti / settori** (chi rifornisce) | `terzisti.html` | cerca `Lavoriamo con brand` |
| **Schede prodotti Everby** (11 cards) | `linee/everby.html` | cerca `ev-grid` |
| **Profumi Kaley** (7 cards) | `linee/kaley.html` | cerca `kf-frag` |
| **Sieri Sphea** | `linee/sphea.html` | cerca le card |
| **10 linee L'Erboristica** | `linee/erboristica.html` | cerca line cards |
| **Dettagli prodotto Sphea** | `linee/prodotto-sphea.html` | cerca `sp-pearl` |
| **Privacy policy testo** | `privacy.html` | testo libero |
| **Cookie policy testo** | `cookie-policy.html` | testo libero |
| **Pagina 404** | `404.html` | testo libero |

## Link verso erboristica.com

| Cosa | File | Note |
|------|------|------|
| **URL prodotti** (singoli prodotti Erboristica/Everby/Kaley) | `assets/data.json` | campo `url` di ogni prodotto. Modifica qui, è la fonte di verità |
| **Slug categoria Erboristica** (fallback) | `linee/linea.html` | cerca `ctaHref` |

## SEO e meta tags

| Cosa voglio cambiare | Dove |
|----------------------|------|
| **Titolo Google (`<title>`)** di una pagina | Dentro la `<head>` della pagina specifica |
| **Descrizione Google** | Stessa pagina, `<meta name="description">` |
| **Foto anteprima social** (Open Graph) | `<meta property="og:image">` su ogni pagina (path da popolare) |
| **Foto OG fisiche** | `immagini/og/` (vedi README dentro la cartella) |
| **Sitemap (lista pagine indicizzate)** | `sitemap.xml` |
| **robots.txt** | `robots.txt` |

## Aspetto visuale

| Cosa voglio cambiare | File | Punto |
|----------------------|------|-------|
| **Colori del sito** (cream, gold, sage, forest) | `assets/tokens.css` | variabili `--cream` `--gold` etc. in `:root` |
| **Font (Fraunces / Cormorant / Inter)** | `assets/tokens.css` | `--display`, `--serif`, `--sans` |
| **Caricamento font Google** | ogni pagina HTML | `<link href="https://fonts.googleapis.com/...">` in `<head>` |
| **Hamburger menu mobile** | `assets/app.js` (logica) + `assets/tokens.css` (CSS) | cerca `topbar__burger` |
| **Animazione timeline azienda** | `index.html` | sezione `tl-pin-outer` |

## Form contatti (quando arriva API Brevo)

**File**: `contatti.html` — riga ~695
```js
const BREVO_ENDPOINT = '/api/contact'; // TODO: sostituire con URL reale
```

## Configurazione server (`.htaccess`)

**File**: `.htaccess` nella root
- Forza HTTPS, security headers, cache, compressione
- **Quando si avranno i redirect 301 dal vecchio sito**: aggiungere righe sotto la sezione "Force HTTPS"

---

# ⚠️ DECISIONI PRESE — NON RIFARE GLI STESSI ERRORI

## Cosa NON dire sul sito

| Da NON dire | Perché |
|-------------|--------|
| "Biologico certificato" / Bioagricert / COSMOS | Non più certificati oggi |
| Partnership USA / Export USA | Decisione comunicativa |
| "Mass market" / "GDO" / "Grande distribuzione" | Svaluta percezione premium |
| "Era gourmand" / Mojito / Biscotto / Piña Colada | Decisione comunicativa |
| Tricobio (brand storico 2018) | Non più attivo |

## Fatti chiave (per evitare errori futuri)

- **L'Erboristica nasce nel 2010** (NON 1969 — il 1969 è solo Athena's azienda)
- **Fondatori = Antonio Venturino + Luisa Sanguettoli** (Luisa è la nonna del committente)
- **Brand naming = Kaley** (no H)
- **Inglese = UK English** (non US: "colour" non "color")
- **Vegan da sempre** (no certificato bio attuale)

---

# 📅 SESSIONE Maggio 2026 — Deploy GitHub, Cleanup, Revisione UI

## 🌐 Hosting & Deploy — INFRASTRUTTURA ATTUALE
- Sito online su **Netlify**: https://creative-sunburst-9a3c92.netlify.app
- Repository GitHub: **github.com/JayThug-The-Coder/erboristica-site** (privato)
- **Deploy automatico**: ogni `git push` su `main` → Netlify ripubblica da solo. Niente più drag & drop.
- `netlify.toml` in root: charset UTF-8; cache CSS/JS `max-age=0, must-revalidate` (niente versioni vecchie in cache); cache lunga font/immagini; redirect `/index.html` → `/`
- Build command vuoto (sito statico)

## 🧹 Pulizia repository
- File non usati dal sito spostati nel backup **`Desktop/erboristica-site-utilizzo`** (copia completa) e rimossi dalla cartella sito: `uploads/`, PDF e `.docx` in root, video segnaposto 71MB
- `.gitignore`: ignora `uploads/`, `*.pdf`, `*.docx`, `*.zip`, `.claude/`, `scraps/`
- Cartella sito da ~200MB → ~54MB

## 🔒 Iubenda
- `privacy.html` e `cookie-policy.html`: contenuto sostituito con embed Iubenda (ID **85420717**)

## 📱 Fix mobile (post-deploy)
- Timeline `index.html`: meccanismo pin come desktop anche su mobile (scroll verticale → movimento orizzontale automatico); loop `requestAnimationFrame` per fluidità; niente blur su mobile
- Footer: `.footer__content` sempre in flusso normale (non `absolute`) → intestazioni colonne non più tagliate; layout centrato sotto 600px
- Menu hamburger: z-index alzati (topbar 201, menu 200)
- Ricerca: fix bug listener (`document.querySelectorAll` invece di `el.`), aggiunto `ATH_DATA_JSON` a `data.js`
- `linee.html`: pannelli testo + foto interlacciati su mobile (`display:contents` + `order`)
- `laboratorio.html`: atlante 2 colonne su mobile, accordion globo sempre espanso

## 🎨 Revisione UI (lista 20 modifiche utente)
- Catalogo: Sphea/Kaley/Everby in cima (sia linee sia "Sfoglia per brand")
- Pagine brand (sphea/kaley/everby/erboristica): **titolo testo → immagine logo** (`immagini/brand-*/logo.png`)
- Erboristica: banner linee con Skincare Innovation in cima; menu "Scopri per categoria" stile catalogo; effetto hover solo sul pulsante "Scopri"
- Contatti: orari telefono **8:00–17:00**; font consenso GDPR / "Aggiungi file" / pulsante invia uniformati (display + colore titoletti ink .55)
- Footer: rimossa voce "Area stampa"
- Sphea: CTA "Scopri il siero" oro tenue + linea animata; fix zigzag mobile
- (dettaglio completo nel git log)

## ⚠️ CORREZIONE nota i18n (SUPERA la vecchia nota in "CSS Architecture")
`applyLang()` in `app.js` ora controlla se il valore `data-it`/`data-en` contiene `<`:
- se contiene markup → usa `innerHTML` (HTML preservato)
- altrimenti → `textContent`
Quindi gli elementi con `data-it`/`data-en` **POSSONO** contenere `<a>`, `<strong>` ecc.

---

# 📅 SESSIONE 12 maggio 2026 — SEO + Infrastruttura + Mobile

## Aggiunto / creato
- [x] `index.html` come home (rinominato da `azienda.html`)
- [x] `404.html` branded
- [x] `cookie-policy.html` completa con GA4 + FB Pixel + Tag Manager
- [x] `sitemap.xml` (12 URL)
- [x] `robots.txt`
- [x] `.htaccess` Apache completo (HTTPS, security, gzip, cache)
- [x] `PROGRESS.md` aggiornato con mappa "cosa cambiare → dove"
- [x] `immagini/og/` cartella + README istruzioni foto Open Graph
- [x] Schema.org JSON-LD: Organization + LocalBusiness + Manufacturer + WebSite + WebPage sulla home
- [x] BreadcrumbList schema su 13 pagine interne
- [x] Hamburger menu mobile (drawer fullscreen) in `app.js`
- [x] Cookie banner GDPR self-hosted (3 categorie: tecnici / analytics / marketing)
- [x] Link Privacy / Cookie Policy / "Preferenze cookie" nel footer
- [x] Form contatti: honeypot anti-spam + checkbox GDPR + submit pronto per Brevo (con fallback mailto)
- [x] Frase partnership Acqua di Parma / La Perla in `terzisti.html`

## Modificato
- [x] Eliminate `brand.html`, `home.html`, vecchio `index.html` (obsolete)
- [x] Meta description + Open Graph + Twitter Cards su tutte le 15 pagine reali
- [x] Footer aggiornato: **capitale sociale € 52.000** + social URL veri (IG/FB/LinkedIn)
- [x] Rimossi GDO e certificazioni Bioagricert/COSMOS da `terzisti.html`
- [x] Fix mobile: footer 1-col sotto 560px, loghi brand più piccoli su `linee.html`, schede attivi Everby stackano

## Cleanup
- [x] Encoding rotto fixato in ~9 file (45 occorrenze: `â€"` → `—`, `Ã ` → `à`, ecc.)
- [x] 84 link interni verificati: 0 rotti

---

# 📋 ROADMAP COMPLETA — DA CHIEDERE, DA DECIDERE, OPZIONALI

## 1. COSA CHIEDERE — info necessarie da fonti esterne

### Da papà / tecnico Siteground
| # | Cosa serve | A chi | Perché |
|---|-----------|-------|--------|
| 1 | **API key Brevo** + URL endpoint backend per inviare email | Tecnico | Senza, il form contatti apre il client email locale (mailto) — non sempre funziona su mobile |
| 2 | **Indirizzo email destinatario** dei messaggi del form | Papà | Dove arrivano oggi le richieste? Vogliono cambiare? |
| 3 | **Indirizzi email separati** per categorie B2B | Papà | Rivenditori → un'email? Stampa → un'altra? Conto terzi → un'altra? |
| 4 | **Lista URL del vecchio sito** indicizzati su Google | Papà → Search Console | Per i redirect 301 (se non li fai, perdi la SEO) |
| 5 | **Credenziali Iubenda** (URL script) | Papà → account Iubenda | Per sostituire il banner cookie attuale |
| 6 | **Facebook Pixel ID** | Papà → Business Manager Meta | Solo se vogliono fare campagne Meta Ads. Il codice è già pronto |

### Da papà / legale
| # | Cosa | Perché |
|---|------|--------|
| 7 | **Conferma DPO** (Data Protection Officer) | Va indicato in privacy se ne hanno uno |
| 8 | **Testo ufficiale Privacy Policy** da Iubenda o consulente | Per sostituire la versione attuale (presa dal sito vecchio) |
| 9 | ~~Claim cosmetici~~ | ✅ Confermato |
| 10 | ~~Partnership Acqua di Parma / La Perla~~ | ✅ Confermato, inserito in `terzisti.html` |

### Da Athena's (foto + contenuti)
| # | Cosa | Quantità |
|---|------|----------|
| 11 | **11 foto Open Graph** (1200×630 px) per anteprime social | 1 per tipo di pagina |
| 12 | **Foto reali contenuto pagine** | 77 placeholder distribuiti su 16 pagine |
| 13 | **Foto del team / persone designate** in `contatti.html` | 3-4 (Commerciale IT, Export EU, ecc.) |
| 14 | **Logo Athena's PNG** ad alta risoluzione | 1 (600×200 px ca, sfondo trasparente) per schema.org |

---

## 2. COSA DECIDERE — scelte strategiche prima di implementare

| Decisione | Opzioni | Impatto |
|-----------|---------|---------|
| **Newsletter footer**: oggi è un placeholder che fa ✓ ma non iscrive niente | A) Collegare a lista Brevo B) Disabilitare finché non c'è strategia C) "Iscriviti per news prodotti" | Influenza la strategia marketing |
| **Lingue extra oltre IT/EN** | FR + DE per export EU? | Raddoppia il lavoro traduzione |
| **WhatsApp / live chat** | Pulsante "chatta con noi" su WhatsApp Business per B2B? | Conversion B2B +30-40% |
| **Mappa Google** in contatti | Embed interattivo (richiede consenso cookie) o screenshot statico? | Statico è veloce, embed è professionale |
| **Pagina "Lavora con noi"** | Volete ricevere CV via sito? | Va creata + gestita privacy CV |
| **Press kit scaricabile** | PDF con foto, logo, testi pronti per giornalisti | Utile area stampa |
| **Hosting finale** | Restare su Siteground o migrare (Netlify/Vercel)? | Migrazione = sito più veloce ma tecnico attuale non lo gestirebbe |

---

## 3. COSA SI PUÒ AGGIUNGERE — opzionali raccomandati

### Implementati ✅
- ✅ **B — Self-host Google Fonts** (privacy + velocità)
- ✅ **D — Eventi GA4 personalizzati** (7 eventi tracciati)
- ✅ **H — Performance ottimizzazioni** (preload, defer, lazy loading)

### Da fare quando ha senso

#### A — Google Tag Manager (GTM)
**Cosa**: Pannello visuale per gestire tutti i tag (GA, FB Pixel, LinkedIn Ads, ecc.) senza toccare il codice.
**Pro**: Autonomia marketing, 90+ tag pre-configurati, versioning, anteprima.
**Contro**: Curva apprendimento, ~30-50 KB peso extra.
**Quando sì**: se faranno più campagne pubblicitarie o hanno un marketing manager interno.
**Tempo**: 30-60 min.

#### C — Schema Product (rich snippets prodotti)
**Cosa**: Aggiunge dati strutturati ai prodotti → Google mostra stelle/prezzo/disponibilità nei risultati.
**Pro**: CTR +20-40%, ranking migliore, base per Google Shopping.
**Contro**: Servono dati prezzo/rating, manutenzione, Sphea oggi non è su erboristica.com.
**Quando sì**: quando i dati prodotto sono completi.
**Tempo**: 2-4 ore.

#### E — Sitemap immagini
**Cosa**: File XML che lista le foto del sito → Google le indicizza in Google Images.
**Pro**: Visibilità in tab "Immagini" di Google, traffico aggiuntivo.
**Contro**: Va popolata dopo le foto reali, serve alt text descrittivi.
**Quando sì**: dopo aver caricato le foto reali.
**Tempo**: 30 min.

#### F — Breadcrumb visivi
**Cosa**: Percorso "Home › Linee › Sphea" sopra al contenuto pagina.
**Pro**: UX migliore, riduce bounce, SEO.
**Contro**: 30-40 px extra ingombro verticale, ridondante con topbar.
**Quando sì**: opzionale (struttura sito già piatta).
**Tempo**: 1-2 ore.

#### G — Accessibilità WCAG 2.1 AA
**Cosa**: Sito utilizzabile da non-vedenti (screen reader), ipovedenti, daltonici, disabilità motorie.
**Pro**: Etico, SEO +, UX universale, reputazione.
**Contro**: 4-6 ore audit + fix, testing con screen reader, possibili compromessi design.
**Quando sì**: prima del go-live, raccomandato per brand etici come Athena's.
**Tempo**: 4-6 ore.

#### I — Search interno
**Cosa**: Barra ricerca che indicizza prodotti/pagine, dropdown con suggerimenti live.
**Pro**: UX B2B esperti, conversion, analytics su ricerche.
**Contro**: Serve servizio esterno (Algolia gratis fino a 10k searches/mese).
**Quando sì**: se catalogo cresce, utenti B2B esperti.
**Tempo**: 2-3 ore.

#### J — Dark mode automatico
**Cosa**: Sito si adatta automaticamente al tema scuro del device.
**Pro**: Percezione modernità, accessibilità.
**Contro**: 4-6 ore, dilutisce identità brand cream/gold, pochi lo usano davvero.
**Quando sì**: **NO** — la palette cream è caratterizzante di Athena's.
**Tempo**: 4-6 ore.

---

# 🚧 IN ATTESA (per andare online)

## Bloccante

| # | Cosa | Chi fornisce | Dove va inserito |
|---|------|--------------|------------------|
| 1 | **API key Brevo** + endpoint email destinatario | Tecnico Siteground | `contatti.html` riga ~695 → variabile `BREVO_ENDPOINT` |
| 2 | ~~Tracking ID Google Analytics~~ | ~~Account aziendale~~ | ✅ **Installato G-11CJ431D6Y** (12 maggio) |
| 3 | **Lista URL vecchio sito** | Search Console (papà ha accesso) | `.htaccess` → blocco redirect 301 |
| 4 | **Credenziali Iubenda** | Account aziendale Iubenda | Sostituirà banner cookie attuale |
| 5 | **11 foto Open Graph** (1200×630 JPG) | Da preparare | `immagini/og/` |

## Conferme ricevute (papà / utente)
- ✅ Claim cosmetici (es. "antietà") — confermati ok da utilizzare
- ✅ Partnership Acqua di Parma / La Perla — confermata comunicabile (paragrafo in `terzisti.html`)

## Non bloccante (può andare live senza)

| # | Cosa | Note |
|---|------|------|
| 1 | 77 foto reali pagine | Placeholder `<!-- SOSTITUIRE -->` distribuiti |
| 2 | Facebook Pixel ID | Per campagne Meta Ads future. Codice già pronto in `app.js` (riga ~215), basta decommentare `FB_PIXEL_ID` |
| 3 | Foto persone designate `contatti.html` | Commerciale IT, Export EU, ecc. |
| 4 | Mappa Google in contatti | Embed iframe o screenshot |
| 5 | Schema Product per Sphea | Quando sarà online su erboristica.com |

---

# 📊 GOOGLE ANALYTICS 4 — INSTALLATO

- **Measurement ID**: `G-11CJ431D6Y`
- **File**: `assets/app.js` (costante `GA_MEASUREMENT_ID` riga ~206)
- **Comportamento**:
  - GA **non** si carica al primo accesso (rispetto GDPR)
  - Si attiva **solo dopo** "Accetta tutti" o spunta "Analitici" nel banner
  - Si auto-attiva al refresh successivo se l'utente ha già accettato
  - Si riattiva subito anche se l'utente cambia preferenze in corsa
  - IP utente anonimizzato (`anonymize_ip: true`)
- **CSP aggiornata**: `.htaccess` autorizza `googletagmanager.com` + `google-analytics.com` + `connect.facebook.net`
- **Verifica nei dati**: andare su https://analytics.google.com → Rapporti in tempo reale dopo aver visitato il sito (i dati appaiono entro ~30 sec)

## Eventi GA4 personalizzati tracciati (`gaEvent()` in app.js)

Tutti gli eventi si attivano **solo se** l'utente ha accettato i cookie analitici.

| Evento GA4 | Quando si attiva | Parametri inviati |
|-----------|------------------|-------------------|
| `click_acquista` | Click su qualsiasi link a `erboristica.com` (CTA "Acquista") | `link_url`, `link_text`, `product_name`, `page` |
| `form_submit` | Invio form contatti | `form_id: 'contact'`, `category` (tab selezionato) |
| `click_contact` | Click su email/telefono nel sito | `type: 'email'/'phone'`, `value` |
| `click_social` | Click sui social del footer | `network: 'instagram'/'facebook'/'linkedin'`, `url` |
| `cookie_banner` | Click su un bottone del banner cookie | `action: 'accept'/'reject'/'prefs'/'save'` |
| `scroll_depth` | Scroll che attraversa 25%, 50%, 75%, 100% della pagina | `percent`, `page` |
| `lang_change` | Switch IT ↔ EN | `lang: 'it'/'en'` |
| `tab_switch_form` | Switch tra i tab del form contatti (Privato, Rivenditore, Internazionale, Conto Terzi, Stampa) | `tab_label`, `tab_value` |
| `funnel_step` | Visualizzazione di una pagina nel funnel di conversione | `step_num`, `step_name`, `brand`, opz. `line_id`, `product_id` |

### Funnel mappato (step automatici per page_view)
- **Step 1** (home): `/` o `/index.html`
- **Step 2** (overview brand/catalogo): `/linee.html`, `/catalogo.html`
- **Step 3** (brand hub o line detail): `/linee/erboristica.html`, `/linee/everby.html`, `/linee/kaley.html`, `/linee/sphea.html`, `/linee/linea.html?id=...`
- **Step 4** (product detail): `/linee/prodotto-sphea.html?id=...` — **TODO**: aggiungere step 4 per prodotti Everby/Kaley/Erboristica quando avranno pagine dedicate single-product
- **Step 5** (purchase intent): `click_acquista` event sopra

### Funnel events da aggiungere quando sezioni dedicate esisteranno
- [ ] Pagine singolo prodotto Everby → step 4 con `brand: 'everby'`
- [ ] Pagine singolo prodotto Kaley → step 4 con `brand: 'kaley'`
- [ ] Pagine singolo prodotto L'Erboristica → step 4 con `brand: 'erboristica'`
- [ ] `pdf_download` event quando esisteranno PDF (listini, press kit)
- [ ] `video_play/pause/complete` event quando esisteranno video promozionali
- [ ] `view_product_card` (Intersection Observer) quando le foto prodotti saranno reali

**Come vedere i dati in GA**: Configura → Eventi (custom events) — appaiono entro 24-48h.
**In tempo reale**: Rapporti → Tempo reale → vedi gli eventi che arrivano live.

---

# ⚡ PERFORMANCE — OTTIMIZZAZIONI APPLICATE

## Self-hosted Google Fonts ✅
- **36 file `.woff2`** in `assets/fonts/` (Fraunces, Cormorant Garamond, Inter) — pesi 200-700, latin + latin-ext
- **`assets/fonts.css`** con tutte le `@font-face` declarations + `font-display: swap`
- **Zero richieste a Google** da nessuna pagina (verificato: 0 chiamate a `googleapis.com`/`gstatic.com`)
- **Vantaggio privacy**: niente trasferimento dati a USA via font CDN, niente consenso cookie per i font
- **Vantaggio performance**: ~200-300ms più veloce, font cachati per 1 anno (vedi `.htaccess`)

## Preload font critical
- `<link rel="preload" href="...fraunces-200-normal-latin.woff2" as="font" crossorigin>` su tutte le 20 pagine
- Carica il font usato nei grandi titoli hero in parallelo all'HTML, senza attendere il CSS

## Defer JavaScript non-critical
- `data.js` e `lenis.min.js` ora hanno attributo `defer` → vengono caricati in parallelo all'HTML ma eseguiti dopo il rendering
- `app.js` rimane non-defer perché alcune pagine lo chiamano inline (`initAthenas(...)`)

## Lazy loading universale
- Tutte le `<img>` senza `loading=` esplicito → aggiunto `loading="lazy" decoding="async"`
- Le immagini sotto il fold caricano solo quando l'utente scrolla → caricamento iniziale più veloce
- **Foto hero (prima `<img>` di ogni pagina)**: invece settata su `loading="eager" fetchpriority="high"` per caricarsi subito (riguarda 7 pagine)
- **Fix SideNav (puntini laterali)**: al primo click su un puntino della SideNav, tutte le immagini `lazy` vengono convertite in `eager` istantaneamente → nessun ritardo quando l'utente salta tra sezioni distanti

## Risultato atteso su PageSpeed
- LCP < 2.5s (Largest Contentful Paint)
- CLS < 0.1 (Cumulative Layout Shift)
- Lighthouse Mobile: dovrebbe essere >85/100 (era ~60-70 prima)

## Test
- https://pagespeed.web.dev/ → inserisci URL del sito quando online
- DevTools → Lighthouse tab → Run audit Mobile + Desktop

---

# 🔧 COMANDI UTILI

## Aprire il sito in locale per testare
```bash
cd "C:/Users/jagio/Desktop/erboristica-site"
python -m http.server 8088
# poi vai su http://localhost:8088
```

## Resettare il banner cookie (per testarlo)
Apri Console del browser (F12) e scrivi:
```js
localStorage.removeItem('athenas.cookie-consent');
location.reload();
```

## Verificare la SEO di una pagina
- Schema.org: https://validator.schema.org/
- Google Rich Results: https://search.google.com/test/rich-results
- Anteprima Facebook: https://developers.facebook.com/tools/debug/
- Anteprima LinkedIn: https://www.linkedin.com/post-inspector/

## Accedere a Google Analytics
1. https://analytics.google.com → login Google aziendale
2. Menu Properties → seleziona Athena's
3. Admin (ingranaggio in basso a sinistra) → Property details → **Measurement ID** `G-XXXXXXXXXX`

---

---

# 📚 STORIA DELLE SESSIONI PRECEDENTI

### Completato in questa sessione (sessione UI topbar/footer/linee — Maggio 2026)
- [x] Topbar logo: font Cormorant Garamond (serif), weight 300, uppercase, letter-spacing 0.22em — niente mix-blend-mode
- [x] Rimosso punto dal topbar logo (`.topbar .dot { display:none }`)
- [x] Nav "Brand" → "Linee" in topbar (app.js, data.js)
- [x] `brand.html` rinominato → `linee.html`; cartella `brand/` → `linee/`; `brand.html` mantenuto come redirect
- [x] H1 linee.html: "Quattro linee, una sola casa"
- [x] Lead paragraph linee.html aggiornato con "Ogni linea soddisfa..."
- [x] `azienda.html` topbar: sempre `.solid` (crema) fin dall'inizio
- [x] Topbar hide-on-scroll-down / show-on-scroll-up globale (con threshold 60px)
- [x] Logo spostato a sinistra (grid `auto 1fr`, logo in `.topbar__left`)
- [x] `laboratorio.html` + `sostenibilita.html`: topbar con `.topbar--light` (testo bianco su hero scuro)
- [x] l'Erboristica: "L'" → "l'" in tutto il sito
- [x] `datastore.js`: path `/brand/` → `/linee/`
- [x] linee.html panels: rimossi numeri, nome brand come titolo grande top-left, scroll sync fixato
- [x] `.ep-panel__body` con `position: absolute; bottom: fixed` per spaziatura consistente
- [x] Footer: dati reali (tel, fax, email, indirizzo, P.IVA, REA)
- [x] Footer links: Cormorant Garamond weight 300
- [x] Footer watermark ATHENA'S: font-size = altezza footer * 0.9, letter-spacing per coprire larghezza

### Pending — ATHENA'S watermark
- [ ] Footer watermark: "va abbastanza bene la dimensione ma non è completo il nome" — lettera-spacing calc non mostra il nome completo. Verificare che `overflow:hidden` su `.footer` non clippi e che `big.scrollWidth` sia misurato correttamente dopo font-size

### Completato in questa sessione (sessione sidenav/lenis/azienda — Maggio 2026)
- [x] Lenis smooth scroll v1.1.13 integrato su tutti i 20 file HTML (`assets/vendor/lenis.min.js`, `initLenis()` in app.js, duration 1.05)
- [x] Lenis CSS corretto in tokens.css: `height:auto` + `scroll-behavior:auto !important` (rimosso `overflow:clip` che rompeva lo scroll)
- [x] `azienda.html`: rimossa carousel `.ve-stories`, aggiunta sezione `.az-bands` con 3 photo band parallax full-bleed (— 02 Territorio)
- [x] `azienda.html`: sezione "In numeri" → "Curiosità" con 4 nuove card editoriali (1969, 80%, 100%, 6)
- [x] `azienda.html`: sezione Pilastri sbloccata + rinominata "Le quattro partnership che ci tengono in piedi." — 4 portal-card (Università Ferrara, Bioagricert, OPIMM, Cooperativa argan)
- [x] `laboratorio.html`: filtri globo — archi oro presenti su tutti i filtri; tag pin nascosti in "tutti", visibili per filtro brand o hover
- [x] `laboratorio.html`: testo "Il processo che non scende a compromessi" non più tagliato (padding-bottom + line-height)
- [x] `laboratorio.html`: scroll reveal più graduale (`cubic-bezier(.16,1,.3,1)`, `translateY(30px)`), bidirezionale (riappare a salire)
- [x] SideNav verticale sticky: `initSideNav()` in app.js, CSS in tokens.css — dot dorati a destra, tooltip label a sinistra su hover, tracking scroll attivo, skip pagine corte/contatti/linee

### Completato in questa sessione (sessione globo laboratorio — Maggio 2026)
- [x] `privacy.html` creato — pagina GDPR completa, hero editorial con watermark Privacy
- [x] Footer: rimossi link Cookie e Credits, lasciato solo Privacy
- [x] Footer: tagline brand "Artigiani della cosmetica naturale dal 1969..." (font-size 17px)
- [x] Footer: newsletter description font-size 16px
- [x] `prodotto.html` topbar: forzata `.solid` come azienda.html
- [x] `laboratorio.html` globo interattivo con cobe v2.0.1:
  - Upgrade da cobe 0.6.3 → 2.0.1 (CSS Anchor Positioning + arcs)
  - 6 marker ingredienti (Argan, Monoï, Mandorle, Karité, Luminescine, Biopolimeri)
  - HQ Athena's Pianoro (44.35, 11.33) come marker dorato speciale
  - Archi che convergono da ogni ingrediente a Pianoro (arcColor oro)
  - Label con `position-anchor: --cobe-{id}` + `var(--cobe-visible-{id})`
  - Side configurabile per pin (top/bottom/left/right) per evitare sovrapposizioni
  - Drag con velocity tracking + inerzia + bounds theta ±0.4

### Completato in sessioni precedenti
- [x] `linee/everby.html` — rimosso blocco duplicato tendina routine, aggiornati 5 attivi brevettati in `ev-intro__actives` (Pumpcoll®, Argireline® Amplified, MAXI-LIP®, Capixyl®, Ectoin® natural) con dati dal documento "Ingredienti Brevettati"
- [x] `brand/sphea.html` — aggiornate tutte e 8 le righe accordion attivi con descrizioni corrette da documento. Testo meccanismo diviso in 2 paragrafi, font più grande (`clamp(15px,1.35vw,19px)`), stats grid grandi in gold, linea dorata separatrice. CSS: rimosse classi sp-num/sp-badge.
- [x] `brand/prodotto-sphea.html` — ACTIVES_LIB aggiornato: Ectoin (bitop AG, Halomonas elongata), Uplevity E-Lift (Tetrapeptide-1, microcorrente), Argireline Amplified (Hexapeptide-8, 2a gen), Actigym (Bacillus sp. Bermuda, NON Laminaria), Nocturshape (Fuente de Piedra, NON pepe nero)
- [x] `brand/prodotto-everby.html` — ACTIVES_LIB: aggiunte entries capixyl, pumpcoll, argireline-amplified, maxi-lip. ING_KEY_MAP aggiornato.
- [x] `brand/everby.html` — card prodotti: `<strong>` SOLO per ingredienti brevettati con ® (Pumpcoll®, Argireline Amplified®, MAXI-LIP®, Capixyl®, Luminescine®, Ectoin® natural). CSS ev-card__actives: base 9px uppercase, strong = Fraunces italic 14px rosa `#c878a0`, bordo rosa separatore sopra.
- [x] `brand.html` — dissolvenza scroll: rimosso translateY, `opacity .75s ease-in-out`, RAF throttle
- [x] `brand.html` — rimossi tutti i punti finali da h1, h2, tag, paragrafi (mantenuti i punti interni divisori di frase)
- [x] `assets/tokens.css` — topbar logo: `font-weight 400→300`, `.topbar .dot { display:none }` (punto rimosso solo dalla topbar, resta nel footer)

### Da fare — prossimi task
- [ ] Pagina `linee/erboristica.html` — da creare (analoga a everby.html e sphea.html)
- [ ] Pagina `linee/kaley.html` — da creare
- [ ] Pagine linee prodotto `catalogo/argan.html` ecc.
- [ ] Inserire foto/video reali (tutti i `<!-- SOSTITUIRE -->`)
- [ ] Valutare redesign `index.html` / `home.html`

---

## Decisioni Architetturali Prese

### SideNav
- `initSideNav(activeKey)` in app.js — si attiva automaticamente su pagine con ≥4 sezioni labelate
- Cerca `<section>` top-level (non nested); estrae label con priorità: `.sec-label .eyebrow` → `.lab-phase__n` → `[class*="eyebrow"]` → `h1/h2` (innerText, prima riga, max 28 chars)
- `clean()`: normalizza whitespace, strip prefix non-lettera, split su `·` e `/` per prendere solo la parte principale
- Tracking attivo: `scrollY + innerHeight * 0.5` come threshold, last section con top ≤ threshold = active
- Click dot: `window.lenis.scrollTo(el, {offset:-80})` oppure `scrollIntoView`
- Pagine escluse: contatti, index, linee, brand, privacy, catalogo, prodotto*, linea.html
- `data-page-mood` su body: `dark` per lab e sphea, `light` per resto — controlla colore base dot (gold su dark, ink su light)
- CSS: right:24px, top:50%, nascosto ≤960px

### Lenis smooth scroll
- v1.1.13 in `assets/vendor/lenis.min.js` (locale, zero CDN)
- CSS corretto: `html.lenis, html.lenis body { height: auto }` — NON usare `overflow: clip` (rompe window.scrollTo)
- duration: 1.05, wheelMultiplier: 1.1, smoothTouch: false
- Guard: skip ≤860px e `prefers-reduced-motion`
- `window.lenis` esposto globalmente per uso in sidenav e altri moduli

### Topbar behavior
- `.topbar--hidden { transform: translateY(-100%) }` — hide on scroll down (> 60px)
- `.topbar--light` — testo bianco (per hero scuri: laboratorio, sostenibilita)
- `.solid` — sfondo crema opaco (si attiva su scroll up, forzato su azienda e linee)
- Logo sempre sinistra, nav sempre destra

### Footer ATHENA'S watermark
- JS: `font-size = el.offsetHeight * 0.9`, poi `letter-spacing = (el.offsetWidth - big.scrollWidth) / chars`
- Problema aperto: il nome non appare completo — possibile che `scrollWidth` post-layout non sia misurato bene

### Rinomina brand → linee
- `brand.html` → `linee.html` (con redirect file brand.html per compatibilità)
- Cartella `brand/` → `linee/` (i file interni rimangono `linee/sphea.html` ecc.)
- `data.js`: chiave `nav_brands` → valore `'Linee'` / `'Lines'`
- `datastore.js`: path check `/linee/` (era `/brand/`)



### Ingredienti Brevettati — coerenza cross-page
Il documento "Ingredienti Brevettati® — Everby Beauty + Sphea by Athena's" è la **fonte unica di verità** per tutti i dati sugli attivi. Le stesse descrizioni, meccanismi e claim devono apparire uguali in:
- Pagina brand (tendine/sezioni intro)
- Pagina prodotto (ACTIVES_LIB in JS)

**Argireline® Amplified** è l'unico ingrediente condiviso tra Everby (Pump & Plump) e Sphea (Eyelift Perfector) — i dati devono essere identici in entrambe le pagine.

**Correzioni critiche applicate** (errori precedenti):
- Actigym® NON è "alga bruna Laminaria Digitata" → è EPS da Bacillus sp. acque profonde Bermuda (BIOINTEC)
- Nocturshape® NON è "pepe nero Piper Nigrum" → è EPS da microrganismo planctonico Laguna Fuente de Piedra (Malaga)
- Uplevity® in sphea NON è il vecchio dipeptide → è il nuovo E-Lift Tetrapeptide-1 (WO2018071640A1, microcorrente)
- Argireline® in sphea era Hexapeptide-3 → corretto in Hexapeptide-8

### CSS Architecture
- `assets/tokens.css` — tutti i token globali + stili topbar/footer iniettati da app.js
- `assets/app.js` — inietta topbar + footer via `initAthenas(pageKey)`, gestisce i18n con `data-it`/`data-en`
- **i18n (aggiornato)**: `applyLang()` usa `innerHTML` se il valore contiene `<`, altrimenti `textContent`. Gli elementi `data-it`/`data-en` **possono** contenere markup HTML (`<a>`, `<strong>`).

### Sphea accordion (sphea.html)
Struttura finale delle tendine:
1. `<p class="sp-active__mechanism">` — prosa originale (prima parte)
2. `<p class="sp-active__mechanism">` — seconda parte (stile più piccolo/sfumato via CSS `+` selector)
3. `<div class="sp-active__divider">` — linea oro separatrice
4. `<div class="sp-active__stats">` — griglia 4 colonne con numeri grandi in gold (Fraunces)

`max-height` del body espandibile: 900px (era 280px — aumentato per contenere il layout ricco).

### Everby card attivi (everby.html)
- CSS `.ev-card__actives`: 9px uppercase sans leggero, bordo rosa `rgba(200,120,160,.14)` sopra
- CSS `.ev-card__actives strong`: Fraunces italic 14px, `#c878a0` (rosa Everby), weight 300
- Regola: `<strong>` SOLO per ingredienti con ® brevettato. Gli altri in plain text.
- Cards senza brevettati: usano `data-it`/`data-en` (i18n funzionante)
- Cards con brevettati: NO `data-it`/`data-en` (markup HTML preservato)

### Brand page scroll (brand.html)
- Transizione panel: `opacity .75s ease-in-out` (rimosso translateY per dissolvenza pura)
- Throttle scroll: `requestAnimationFrame` per evitare flickering

---

## File Principali

| File | Descrizione |
|------|-------------|
| `assets/tokens.css` | Token globali + stili topbar/footer |
| `assets/app.js` | Logica condivisa: topbar, footer, scroll reveal, i18n |
| `assets/data.js` | Dati prodotti |
| `brand.html` | Portfolio brand con sticky scroll editorial |
| `brand/everby.html` | Pagina brand Everby (K-beauty Gen Z) |
| `brand/sphea.html` | Pagina brand Sphea (alta gamma, biopolimeri) |
| `brand/prodotto-everby.html` | Scheda prodotto Everby con accordion attivi |
| `brand/prodotto-sphea.html` | Scheda prodotto Sphea con accordion attivi |

---

## Bug Risolti

| Bug | Fix |
|-----|-----|
| Duplicato tendina routine in everby.html | Rimosso blocco orfano linee 1028-1157 (era rimasto da operazione move precedente) |
| Actigym descritto come "alga bruna Laminaria" | Corretto in EPS Bacillus sp. Bermuda (BIOINTEC) |
| Nocturshape descritto come "pepe nero Piper Nigrum" | Corretto in EPS Fuente de Piedra planctonico |
| Uplevity descritto come dipeptide COL1A1/COL3A1 | Corretto in Tetrapeptide-1 / microcorrente / MBNL1 |
| Argireline denominato Hexapeptide-3 | Corretto in Hexapeptide-8 |
| `data-it`/`data-en` su elementi con `<strong>` in everby cards | Rimossi da cards con brevettati, mantenuti su plain text cards |
| Punto nel logo topbar | `.topbar .dot { display:none }` in tokens.css |
| Logo topbar in grassetto | `font-weight: 400 → 300` in tokens.css |

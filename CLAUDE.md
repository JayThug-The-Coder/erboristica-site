# Athena's — Erboristica Site · Contesto Progetto

> **⚠️ IMPORTANTE PER CLAUDE**: prima di lavorare leggi sempre [PROGRESS.md](PROGRESS.md), che contiene la mappa **"Se voglio cambiare X → tocco Y"**, lo storico delle decisioni prese e l'inventario di placeholder/file editabili. Aggiornalo dopo ogni modifica significativa.

## Cos'è questo progetto
Sito web statico per **Athena's s.r.l.**, manufacturer di cosmetica naturale dal 1969, Pianoro (BO).
HTML puro + CSS tokens, zero framework. Niente TypeScript, niente build step.

## Stack tecnico
- HTML statico, un file per pagina
- `assets/tokens.css` — tutti i design token (colori, font, spacing, motion)
- `assets/app.js` — logica condivisa: `initAthenas(pageKey)` inietta topbar + footer + scroll reveal + i18n
- `assets/data.js` — dati prodotti
- Font: Fraunces (display), Cormorant Garamond (serif), Inter (sans)
- Niente dipendenze esterne oltre Google Fonts

## Struttura pagine
| File | Pagina | Hero style |
|------|--------|-----------|
| `azienda.html` | Homepage/Azienda | Dark botanico con parallax JS, 3D tilt cards, word-by-word reveal |
| `brand.html` | Portfolio brand | Editorial Presence — sticky scroll, pannello testo sx cambia con slide dx |
| `catalogo.html` | Linee prodotto | Split dark + 10 linee alternanti testo/immagine con filtri brand |
| `sostenibilita.html` | Sostenibilità | Full-height verde foresta + numeri impatto + pilastri + 8 certificazioni |
| `laboratorio.html` | Laboratorio R&S | Scuro scientifico con cerchi concentrici animati + 4 fasi processo |
| `contatti.html` | Contatti | Minimal crema + form + spaccio aziendale + placeholder mappa |

## Regole di sviluppo
- Leggere sempre il file prima di modificarlo
- Un file alla volta, confermare se tocca più di 2 file
- Niente TypeScript, niente framework, niente dipendenze
- Niente commenti ridondanti nel codice
- Niente emoji nel codice o nei file
- I commenti `<!-- SOSTITUIRE: ... -->` vanno preservati finché non ci sono immagini reali
- Scroll reveal: `[data-reveal]` + `.is-visible` via IntersectionObserver (già in app.js)
- i18n: `data-it="..."` `data-en="..."` su ogni elemento testuale

---

## INFO AZIENDA (da DOCX "TESTI PER SITO")

### Athena's s.r.l.
- **Fondata**: 1969 da **Antonio Venturino e Luisa Sanguettoli** a Pianoro (BO)
- **Sede produzione**: Via del Lavoro 32, 40065 Pianoro (BO) — stessa fabbrica dal 1969
- **Origini**: detergenza + oggettistica regalo (saponi artistici scolpiti, bagni schiuma, sali profumati). Cosmetica trattante dal 2000
- **Seconda generazione**: figli **Alessandro** e **Gloria** entrati in azienda fine anni '80 / inizio '90
- **Vegan da sempre** — scelta dell'azienda da prima che diventasse trend
- **Fotovoltaico**: copre oltre **80%** del fabbisogno energetico
- **Certificazioni**: ISO 22716 (GMP), Vegan OK, Cruelty Free, ISO 14001, Dermatest, Made in Italy. **NON più certificati biologici** (lo erano in passato, oggi non lo sono più). Verificare quali sono ancora attive
- **Spaccio aziendale**: ogni **venerdì 12:00–18:00**, ingresso libero senza appuntamento
- **Formula**: 0% petrolchimici, siliconi, coloranti sintetici — 95%+ ingredienti naturali

### Cose da NON dire sul sito (decisioni utente)
- Niente "biologico" / "bio certificato" (anche se storicamente vero, non lo siamo più)
- Niente partnership USA / export
- Niente "mass market" né "grande distribuzione" / "GDO" (svaluta percezione)
- Niente "era gourmand" (Mojito, biscotto, ecc. → evitare)
- Tricobio (brand storico 2018, NON più attivo) — non menzionare

---

## I 4 BRAND

### 1. L'Erboristica (dal 2010)
Primo brand di casa Athena's. Cosmetica naturale per viso, capelli, corpo. 10 linee, 250+ referenze.
Colori: verde/forest `#2d3a2e`, gold `#c9a96e`, sage `#5a6b4e`
**10 linee prodotto:**

| # | Linea | Prodotti | Attivi chiave | Palette visiva |
|---|-------|----------|---------------|----------------|
| 01 | Antietà Globale | 8 | Peptidi biomimetici, HA multimolecolare, rosa selvatica | Ambra scuro / driftwood editorial |
| 02 | Estratti Botanici | 25 | Calendula, camomilla, echinacea, rosmarino, lavanda, melissa | Verde botanico |
| 03 | Argan | 9 | Olio argan biologico estratto a freddo | Amber/gold, noci di argan, superficie sabbiosa |
| 04 | Cocco & Monoï | 7 | Olio di cocco + monoï di Tahiti | Bianco/azzurro chiaro, tropicale |
| 05 | Mandorle Dolci | 6 | Olio mandorle dolci emolliente | Rosa/soft rose, piedistalli ceramica, fiori mandorlo |
| 06 | Purysens | 4 | Hypoallergenico, parfum free, testato dermato | Azzurro polvere, minimal |
| 07 | Skincare Innovation | 12+ | Doppia Detersione (K-beauty), Pearls (microsfere), Mineral Infusions (bifasici) | Lavanda/viola (detersione), perle colorate (pearls), teal/acqua (infusions) |
| 08 | Illumià | 2 | Niacinamide, vitamina C liposomiale, estratto liquirizia | Oro caldo/ocra |
| 09 | Nutra Repair | 4 | Olio baobab, burro karité, ceramidi vegetali | Terracotta/ruggine arancio |
| 10 | Uomo | 12 | Dopobarba, idratanti, detergenti, balsami | Navy scuro/gold, maschile |

---

### 2. Everby (dal 2024)
K-beauty Gen Z con etica Athena's. Texture gel, formule waterless, packaging iridescente/teal.
Colori: rosa `#e8a8b8`, teal/mint, iridescente.
**Prodotti su erboristica.com (5):**
- Cica Cloud
- Milky Rice
- No Cry Zone
- Pepti Boom
- (+ 1 extra)

**Prodotti named (6):**
- Don't Call Me Panda
- Feel Butter
- Lash Me
- Pump & Plump
- Stay Porefect
- Yes I Glow

---

### 3. Kaley (dal 2022)
Profumi roll-on in olio concentrato, senza alcol. 10ml, €19,60 cad.
Colori: jewel-tone geometrici (teal, burgundy, purple, orange, ambra).
**6 fragranze (+1):**
- Crystal Rouge
- Dark Sea
- Golden Hour
- Monty Tonka
- Spring Symphony
- Sweet Whisper
- Moka Rose

---

### 4. Sphea (dal 2025)
Alta gamma. Tecnologia perle di biopolimeri marini che rilasciano il principio attivo per pressione.
Colori: nero/bianco premium, gold.
**5 sieri:**
- Anti Pollution Face Serum (Ectoin)
- Eyelift Perfector (Argireline + Uplevity)
- Radiant Up-Lift (Uplevity + Vitamina C)
- Sculpt & Firm Body Serum (Actigym)
- Slim Silhouette Body Serum (Nocturshape)

---

## VISUAL LANGUAGE DAL CATALOGO (JPG analizzati)

### Copertina catalogo
4 quadranti: Antietà (ambra su legno galleggiante, moody), Everby (holographic teal), Kaley (scatola rosa Moka Rose), L'Erboristica Argan (gold).
Titolo: "ATHENA'S ITALY MANUFACTURER SINCE 1969"

### Palette fotografica per linea
- **Antietà**: dark moody editorial, sieri ambra su driftwood, molto premium
- **Argan**: ambra/gold caldo, noci di argan, superficie sabbiosa
- **Cocco/Monoï**: bianco/azzurro chiaro, estetica tropicale
- **Mandorle Dolci**: rosa/soft rose, piedistalli ceramica, fiori
- **Nutra Repair**: terracotta/ruggine, olio di baobab
- **Purysens**: azzurro polvere, clean minimal
- **Doppia Detersione**: lavanda/viola, sistema due flaconi
- **Illumià**: oro caldo/ocra, ritratto pelle luminosa
- **Pearls Face Serum**: 3 sieri con perle colorate (rosa/blu/giallo) su superfici geometriche, molto premium
- **Mineral Infusions**: teal/acqua, spray bifasici, splash d'acqua
- **Everby**: holographic iridescente, teal/mint, spread Gen Z
- **Kaley**: packaging jewel-tone geometrico (teal, burgundy, purple, orange), editoriale tropicale
- **Uomo**: navy scuro/gold, editoriale maschile

---

## STATO ATTUALE (Aprile 2026)

### Completato
- [x] Design token system (`tokens.css`)
- [x] `azienda.html` — redesign immersivo (parallax, 3D tilt cards, word reveal, stats, timeline)
- [x] `brand.html` — Editorial Presence con sticky scroll 4 brand
- [x] `catalogo.html` — split hero + 10 linee alternanti + filtri
- [x] `sostenibilita.html` — hero verde + numeri + 3 pilastri + 8 certificazioni + CTA 2030
- [x] `laboratorio.html` — hero scientifico + numeri R&S + 4 fasi + 4 tecnologie
- [x] `contatti.html` — hero minimal + 3 contatti + spaccio + mappa placeholder + form

### Da fare
- [ ] Inserire foto/video reali (tutti i `<!-- SOSTITUIRE -->`)
- [ ] Pagine brand individuali: `brand/erboristica.html`, `brand/everby.html`, `brand/kaley.html`, `brand/sphea.html`
- [ ] Pagine linee prodotto: `catalogo/argan.html`, ecc.

---

## STRUTTURA SITO (post-cleanup maggio 2026)

### Pagine top-level
- `index.html` — HOME (era `azienda.html`, rinominata). Contiene storia + timeline + brand showcase + quote + banner conto terzi.
- `linee.html` — Editorial Presence dei 4 brand (sostituisce vecchia `brand.html`)
- `catalogo.html` — Catalogo 10 linee L'Erboristica
- `laboratorio.html` — R&S, attivi, tecnologie
- `sostenibilita.html` — Pilastri eco + certificazioni
- `terzisti.html` — Conto terzi B2B
- `contatti.html` — Sede + form + spaccio
- `privacy.html` — Privacy policy
- `cookie-policy.html` — Cookie policy (nuova)
- `404.html` — Errore branded
- `presentazione.html` — Brand presentation 2026 (uso interno)

### Pagine linee/*
- `erboristica.html`, `everby.html`, `kaley.html`, `sphea.html` — hub brand
- `linea.html` — pagina dinamica linea singola (carica da `?id=`)
- `prodotto-sphea.html` — scheda prodotto Sphea
- `prodotto-everby.html`, `prodotto-kaley.html` — redirect a erboristica.com

### File eliminati
- ❌ `brand.html` (sostituita da `linee.html`)
- ❌ `home.html` (obsoleta)
- ❌ vecchio `index.html` (era indice dev)

---

## INFRASTRUTTURA & SEO (maggio 2026)

### File di configurazione root
- `sitemap.xml` — 12 URL pubblici con priorità
- `robots.txt` — Allow / + Sitemap + Disallow private (data.json, uploads/, presentazione.html)
- `.htaccess` — Apache config (DirectoryIndex, force HTTPS, security headers HSTS+X-Frame+CSP, Gzip, Cache, block file sensibili)

### Meta tags
- Su tutte le 15 pagine reali: `<meta name="description">`, Open Graph completo (og:type, og:url, og:title, og:description, og:image, og:locale, og:site_name), Twitter Cards, `<link rel="canonical">`
- Foto OG path predisposti: `immagini/og/<pagina>.jpg` (1200x630px da caricare)

### Schema.org JSON-LD
Sulla home `index.html` c'è `@graph` con 3 nodi:
- Organization + LocalBusiness + Manufacturer (con vatID, geo, openingHoursSpecification venerdì 12-18, brand, contactPoint, sameAs placeholder per social)
- WebSite (publisher → Organization)
- WebPage

### Cookie consent
File: `assets/app.js` — banner self-hosted GDPR-compliant (gratuito, no dipendenze esterne). API esposta: `window.CookieConsent.{show, hide, get, accepted}`. Salva preferenze in `localStorage` chiave `athenas.cookie-consent` con scadenza 12 mesi. Evento `cookie-consent-change` per attivare GA quando arriva.

**Iubenda**: l'azienda ha account Iubenda. Quando arrivano le credenziali, il banner attuale va sostituito (basta rimuovere il blocco `COOKIE_STYLES` + `setupCookieConsent` da app.js e includere lo script Iubenda).

### Encoding fix
Diversi file avevano caratteri rotti (`â€"`, `Ã `, ecc.) da decodifica errata UTF-8. Fixati in batch su tutti gli HTML reali + `app.js`. Se vedi questi pattern in nuove modifiche, applica encoding UTF-8 senza BOM.

---

## DATI AZIENDA CONFERMATI (maggio 2026)

- Capitale sociale: **€ 52.000 i.v.**
- P.IVA / Cod. Fiscale: **01457020392**
- R.E.A.: BO 404236
- Tel: +39 051 0925111
- Email: info@athenas.it
- Instagram: https://www.instagram.com/athenasitaly/
- Facebook: https://www.facebook.com/athenasofficial/
- LinkedIn: https://www.linkedin.com/company/athena's-srl/
- Privacy policy pubblica originale: https://www.athenas.it/privacy-policy/
- Tracker dichiarati (ufficiale): Google Analytics + Facebook Pixel + Google Tag Manager
- Acqua di Parma / La Perla: possono essere menzionati come clienti private label (no sezione dedicata per ora)

---

## BREADCRUMB SCHEMA (maggio 2026)
Aggiunto su 13 pagine interne: linee, catalogo, laboratorio, sostenibilita, terzisti, contatti, privacy, cookie-policy, linee/* (5 brand hub + prodotto-sphea).

---

## FORM CONTATTI (contatti.html)
- Honeypot anti-spam (campo `name="website"` nascosto)
- Checkbox GDPR obbligatoria con link a privacy.html
- Submit fa POST JSON a `BREVO_ENDPOINT` (oggi `/api/contact` placeholder — **da configurare quando arriva API key**)
- Fallback automatico a `mailto:info@athenas.it` se l'endpoint non risponde
- Stato success/error inline visibile

---

## ACTION ITEMS IN ATTESA DI DATI ESTERNI

| Task | Cosa serve |
|------|-----------|
| Form contatti via Brevo | API key + endpoint server side (sostituire `BREVO_ENDPOINT` in contatti.html) |
| Google Analytics install | Tracking ID GA4 (account esiste). Va inserito **dopo** consenso cookie tramite listener `cookie-consent-change` |
| Facebook Pixel install | Pixel ID + listener consenso marketing |
| Redirect 301 vecchi URL | Export URL da Search Console (papà ha accesso) |
| Iubenda cookie banner | Credenziali Iubenda (sostituisce banner self-hosted; struttura 3 categorie già allineata) |
| Foto OG | 11 file 1200x630 in `immagini/og/` (vedi `immagini/og/README.md`) |
| Foto reali contenuto pagine | 77 placeholder con `<!-- SOSTITUIRE -->` distribuiti su 16 pagine |

---

## DESIGN TOKEN PRINCIPALI
```css
--cream: #f3eee4
--cream-2: #ede6d7
--ink: #1a1a1a
--forest: #2d3a2e
--gold: #c9a96e
--gold-deep: #9a7f4a
--sage-deep: #5a6b4e
--sage: #8a9a7b
--display: 'Fraunces'
--serif: 'Cormorant Garamond'
--sans: 'Inter'
--ease: cubic-bezier(.22,.61,.36,1)
```

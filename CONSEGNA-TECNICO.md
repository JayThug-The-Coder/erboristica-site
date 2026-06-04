# Athena's — Consegna al tecnico per la messa online

> Sito che sostituisce l'attuale **athenas.it**. Questo documento spiega **com'è fatto il sito**, **cosa è già pronto**, **cosa manca**, **dove sono le foto** e **cosa NON toccare per non rompere il sito**.
>
> **Ultimo aggiornamento: giugno 2026.** Le novità di quest'ultima fase sono raccolte nella **Sezione 7** in fondo (favicon, immagine social, ottimizzazioni, e i punti critici da non rompere). Leggi quella per prima se conosci già il resto.

---

## ⭐ COSA CONSEGNARE (leggi prima questo)

**In una frase:** consegna il **repository GitHub** `JayThug-The-Coder/erboristica-site`. Quello **è** il sito completo, già pulito e pronto da pubblicare. **Non serve preparare, copiare o selezionare cartelle a mano.**

**Cosa dare:**
1. **Il sito** = accesso al **repository GitHub** (oppure uno **ZIP del repository**). Contiene tutto ciò che serve: HTML, CSS, JavaScript, font self-hosted e **solo le foto effettivamente usate dal sito**.
2. **Gli accessi (dal cliente):** DNS del dominio **athenas.it** + hosting attuale. (Il repo è già collegato a **Netlify** — URL di test: `https://creative-sunburst-9a3c92.netlify.app`.)
3. **I dati che arriveranno più avanti** (NON bloccano la messa online): API key Brevo, Facebook Pixel ID, elenco vecchi URL per i redirect 301, eventuali credenziali Iubenda. → dettaglio in **Sezione 6**.

**Come va online (due strade, sceglie il tecnico):**
- **A)** Puntare il dominio **athenas.it** alla versione già su **Netlify** (la più semplice: il sito è già lì e si riaggiorna da solo a ogni modifica del repo).
- **B)** Caricare i file del repo nella **web root** dell'hosting attuale (al posto del vecchio WordPress). È un sito statico: si pubblica copiando i file così come sono. Su Apache è già pronto `.htaccess`.

### 📸 Le foto — la parte che preoccupa (tranquillo)
- Il sito usa **soltanto** le immagini dentro `immagini/...` che sono **nel repository**. Sono già quelle giuste e bastano così.
- Sul computer esistono **altre cartelle con foto simili o doppione** (archivi di lavorazione: `immagini/_GALLERIA/`, `_hero_backup_*`, `higgsfield/`, i sorgenti `.png` pesanti…). **NON fanno parte del sito**, sono **già escluse da Git** e **non devono andare online**.
- 👉 **Non c'è niente da aprire, capire o spostare a mano in quelle cartelle.** Pubblicando dal repository, vengono ignorate automaticamente: la selezione "cosa va online / cosa no" l'ha già fatta il `.gitignore`.
- (Elenco preciso di cosa è escluso: **Sezione 8**.)

> ✅ **In pratica:** dai il repository al tecnico → lui lo pubblica → online finisce **solo ciò che serve**. Gli archivi di foto restano sul computer e non c'entrano con il sito.

### ✉️ Form contatti
La mail del **form** ("Scrivici") è indirizzata a **info@athenas.it**. Finché non c'è l'endpoint Brevo (Sezione 1), all'invio si apre il client di posta del visitatore già pre-compilato verso info@athenas.it. Quando si configurerà Brevo, impostarlo perché consegni **sempre a info@athenas.it**.

---

## 🔌 COSA ABBIAMO GIÀ COLLEGATO E CONFIGURATO (tutto spiegato)

Riepilogo di **tutto ciò che è già impostato** nel sito, con lo stato di ciascuna cosa.
**Legenda:** ✅ pronto e attivo · ⚠️ pronto, manca solo un dato dal cliente · ⚙️ dipende dall'hosting.

### Analytics e tracciamento
- ✅ **Google Analytics 4 (GA4)** — ID `G-11CJ431D6Y` (in `assets/app.js`), con **IP anonimizzato**. **Parte SOLO dopo il consenso ai cookie "statistiche"** (mai prima): è a norma GDPR. → Unica cosa da fare: verificare che sia la property GA4 corretta del cliente.
- ⚠️ **Facebook Pixel** — il codice è **già pronto** in `assets/app.js`, ma l'**ID è da inserire** (riga oggi commentata, `FB_PIXEL_ID`). Parte solo dopo consenso "marketing". → Serve il **Pixel ID** dal cliente.
- ✅ **Banner cookie (consenso GDPR)** — banner **self-hosted** (gestito da `app.js`), **3 categorie**: Necessari · Statistiche · Marketing. Le preferenze sono salvate nel browser del visitatore. **GA4 e Pixel non partono finché l'utente non acconsente.** Niente da fare.

### Privacy e testi legali
- ✅ **Iubenda** — le pagine **Privacy Policy** (`privacy.html`) e **Cookie Policy** (`cookie-policy.html`) **incorporano i testi legali presi da Iubenda** (account del cliente, documento ID `85420717`, script caricato da `cdn.iubenda.com`). I testi si aggiornano **da Iubenda**, non dal codice del sito.
- ℹ️ Il **banner** di consenso, invece, è quello **self-hosted** (vedi sopra), non quello di Iubenda. Va benissimo così ed è a norma. Se il cliente preferisce usare il banner di Iubenda, si può sostituire (servono le **credenziali Iubenda** — vedi checklist Sezione 6).

### Sicurezza e prestazioni
- ✅ ⚙️ **File di sicurezza `.htaccess`** (per hosting **Apache**, com'è l'attuale WordPress) — già pronto. In pratica fa: **forza HTTPS**; **HSTS** (HTTPS obbligatorio per 1 anno); **X-Frame-Options** (anti-clickjacking); **X-Content-Type-Options** (anti MIME-sniffing); **Referrer-Policy**; **Permissions-Policy** (camera/microfono/geolocalizzazione disattivati di default); **CSP / Content-Security-Policy** (consente già Google Analytics, Tag Manager, Facebook, Brevo); **compressione Gzip**; **cache**; **niente elenco delle cartelle**; e **blocca i file sensibili** (`.git`, `.env`, i documenti interni `.md`, `.docx`, `.zip`). ⚠️ Vale **solo su Apache**: se il sito va su **Netlify**, il `.htaccess` viene **ignorato** (lì vale `netlify.toml`).
- ✅ ⚙️ **`netlify.toml`** (per **Netlify**) — header di sicurezza equivalenti + **cache**: CSS/JS/immagini in `must-revalidate` (così gli aggiornamenti si vedono **subito**, niente foto "vecchie"), font 1 anno; redirect `/index.html` → `/`.
- ✅ **HTTPS** — già forzato dalla configurazione. ⚙️ Va solo verificato che l'**SSL** sia attivo sul dominio (lato hosting).

### SEO e condivisione social
- ✅ **sitemap.xml** + **robots.txt** + **canonical** su tutte le pagine.
- ✅ **Meta description** + **Open Graph** + **Twitter Card** su ogni pagina, con **un'unica immagine social** `immagini/og/athenas-share.jpg` (1200×630). ⚠️ L'anteprima social funziona **solo quando il sito è live su athenas.it** (vedi 7.2).
- ✅ **Dati strutturati Schema.org** (JSON-LD): Organization / LocalBusiness / Manufacturer (P.IVA, indirizzo, orari spaccio, contatti, social) + WebSite + Breadcrumb sulle pagine interne.
- ✅ **Favicon** (la "A" di Athena's) in root.

### Contatti
- ⚠️ **Form contatti** — indirizzato a **info@athenas.it**. Oggi l'invio avviene via `mailto` (apre il client di posta del visitatore, già pre-compilato). Per l'**invio automatico server-side** serve l'**endpoint Brevo** (API key dal cliente): vedi Sezione 1, punto 4. Quando si configura Brevo, impostarlo perché consegni **sempre a info@athenas.it**.

### Base tecnica (già a posto, niente da fare)
- ✅ **Font self-hosted** (niente Google Fonts) · ✅ **pagina 404** brandizzata · ✅ **bilingue IT/EN** lato browser · ✅ **smooth scroll** (si disattiva da solo su mobile/`reduced-motion`).

> 🧾 **In sintesi per il cliente:** GA4, banner cookie, Iubenda, sicurezza, SEO e form sono **già collegati e funzionanti**. Dal cliente servono solo, quando disponibili: **Pixel ID**, **API key Brevo**, **elenco vecchi URL** (per i redirect), e l'attivazione **SSL/DNS**. Tutto il resto è pronto. (Dettaglio operativo nelle Sezioni 1 e 6.)

---

## 0. Cos'è il sito (in breve)

- **Sito statico**: solo HTML, CSS e JavaScript. **Nessun build, nessun framework, nessun database, nessun backend.** Si pubblica copiando i file così come sono.
- Una pagina = un file `.html`. Le parti condivise (barra in alto, footer, ricerca, banner cookie, traduzioni, smooth scroll) sono iniettate da `assets/app.js`.
- I dati dei prodotti stanno in `assets/data.js` e `assets/data-inline.js` (caricati dal browser, niente server).
- **Bilingue IT/EN**: il cambio lingua è lato browser (ogni testo ha `data-it="..."` e `data-en="..."`). Non esistono URL separati per l'inglese.
- **Font: tutti self-hosted** in `assets/fonts/` (caricati via `assets/fonts.css`). **Nessuna dipendenza esterna, niente Google Fonts.** (Vedi 7.4 — è importante.)

### Dove pubblicarlo
La cartella va messa nella **root del dominio** (athenas.it punta a questa cartella).

L'attuale athenas.it è in **WordPress** (hosting Apache/PHP): questo nuovo sito è **HTML statico** e va sullo **stesso hosting**, sostituendo i file del vecchio sito nella web root.

- **Su Apache** (stesso hosting di WordPress): il file **`.htaccess` è già pronto** (home, 404, HTTPS, header di sicurezza, gzip, cache, blocco file sensibili). Attenzione a non lasciare attive le regole di WordPress che potrebbero interferire. ⚠️ **Vedi 7.3** sulla cache delle immagini.
- **Su Netlify** (dove gira la versione di test): vale `netlify.toml` (già presente) e **il `.htaccess` viene ignorato**.

> Versione di test attuale: `https://creative-sunburst-9a3c92.netlify.app`. I meta tag, la sitemap e i link interni puntano **già** a `https://athenas.it`.

---

## 1. ESSENZIALE — da fare prima del go-live

| # | Cosa | Stato | Chi/come |
|---|------|-------|----------|
| 1 | **Redirect 301 dai vecchi URL WordPress** | ❌ Da fare | Esportare l'elenco dei vecchi URL da Google Search Console (accesso lato cliente). Per ognuno una regola 301 in `.htaccess` (Apache) o `_redirects`/`netlify.toml` (Netlify). **Importante per non perdere il posizionamento Google.** |
| 2 | **Favicon** (icona scheda browser) | ✅ **FATTA** | Aggiunta in questa fase: la **"A" di Athena's** su sfondo bianco, dimensionata per stare dentro un'icona tonda. File in **root**: `favicon-16.png`, `favicon-32.png`, `favicon-512.png`, `apple-touch-icon.png`. I `<link rel="icon">` sono in tutte le pagine, con `?v=2` per forzare l'aggiornamento. (Vedi 7.1.) |
| 3 | **Foto anteprima link (WhatsApp/Facebook/Open Graph)** | ✅ **FATTA** (unica) | Aggiunta un'unica immagine social per **tutte** le pagine: `immagini/og/athenas-share.jpg` (1200×630, "ATHENA'S ITALY — Manufacturer since 1969"). Tutti i meta `og:image`/`twitter:image` puntano lì. ⚠️ **L'URL è `https://athenas.it/...` → l'anteprima si vede solo quando il sito è live su athenas.it** (sul link Netlify l'immagine non carica). Vedi 7.2. |
| 4 | **Form contatti — invio reale** | ⚠️ Funziona in fallback | Il form fa POST a `BREVO_ENDPOINT = '/api/contact'` (`contatti.html`) che **non esiste ancora**: se fallisce, **ricade su `mailto:` verso info@athenas.it**. Per l'invio server-side vero serve un endpoint Brevo (API key lato cliente). |
| 5 | **Facebook Pixel** | ⚠️ Codice pronto, ID mancante | In `assets/app.js` la riga `const FB_PIXEL_ID` è **commentata**: inserire l'ID quando arriva. Parte solo dopo consenso "marketing". |
| 6 | **Google Analytics 4** | ✅ Configurato — da verificare | L'ID `G-11CJ431D6Y` è già inserito (`app.js`), si carica **solo dopo consenso** "statistiche". Verificare che sia la property GA4 corretta. |
| 7 | **HTTPS / certificato SSL** | ⚙️ Lato hosting | Il `.htaccess` forza già HTTPS. Assicurarsi che l'SSL sia attivo sul dominio. |

---

## 2. COME FUNZIONA (da sapere per non rompere nulla)

### 2a. Sistema foto prodotti (schede `prodotto.html`)
- Le schede prodotto mostrano i file ai percorsi "piatti": `immagini/<linea>/<prodotto>/hero.webp`, `det-01.webp`, `det-02.webp`.
- `hero.webp` = packaging; `det-01.webp` = ingrediente chiave; `det-02.webp` = foto ambient (volutamente disattivata: quando manca, la sezione si dispone a tutta larghezza — è il comportamento desiderato).
- I percorsi sono in `assets/data.json` / `assets/data-inline.js` (campo `images`).
- ⚠️ **La fonte di verità è ciò che si vede sul sito.** Se sostituisci una foto, modifica il percorso e **verifica a occhio** (niente stiramenti, colore giusto).

### 2b. Bilingue (IT/EN)
- Ogni testo ha `data-it` e `data-en`. Cambio lingua via `app.js`, salvato nel browser (localStorage).
- **Regola d'oro**: aggiungendo testo nuovo, mettere SEMPRE sia `data-it` sia `data-en`, altrimenti l'inglese resta vuoto.

### 2c. URL "puliti" — attenzione
- Su **Netlify** gli URL funzionano anche senza `.html`. Su **Apache** valgono gli URL con `.html`.
- **I link interni usano sempre `.html`**, quindi funzionano su entrambi. (Se attivi la riscrittura URL su Apache, testa bene: alcuni controlli JS dipendono dal percorso.)

### 2d. Pagina 404
- `404.html` brandizzato. Su Apache via `.htaccess` (`ErrorDocument 404`), su Netlify automatico. Già testato a qualsiasi profondità.

### 2e. Banner cookie
- Banner **GDPR self-hosted** (in `app.js`), 3 categorie. Analytics/Pixel partono **solo dopo** consenso. Il cliente ha un account **Iubenda** se vuole sostituirlo (non obbligatorio, l'attuale è a norma).

### 2f. Smooth scroll (Lenis) — novità
- Lo **smooth scroll Lenis** è ora attivo su tutto il sito (`assets/app.js`). Era caricato ma non partiva per un problema di timing; ora `initLenis` ritenta al `DOMContentLoaded`.
- Si disattiva da solo su mobile (≤860px) e con `prefers-reduced-motion`. **Non è un problema se un giorno lo si vuole togliere** (basta non chiamarlo), ma sappi che è lui a gestire lo scroll fluido.

### 2g. Header di sicurezza / CSP
- Il `.htaccess` imposta header di sicurezza e una **CSP** che già consente GA, GTM, Facebook, Brevo. Aggiungendo servizi esterni (mappe, chat), aggiornare la CSP.

---

## 3. DOVE SONO LE FOTO (mappa rapida)

> Tutte le immagini servite stanno in **`immagini/`**. Le foto si sostituiscono **mantenendo lo stesso nome file** (i percorsi sono cablati nel codice). ⚠️ Dopo aver sostituito una foto vedi la **Sezione 7.3** (cache) per non vederla "vecchia" online.

**Hero pagine LINEA** (`linee/linea.html?id=<linea>`) — formato orizzontale 16:9:
`immagini/<linea>/hero.jpg`
→ linee: `argan, cocco, mandorle, antieta, illumia, purysens, nutra, estratti, uomo, pearls`
⚠️ Mappature non ovvie: **`pearls` = Skincare Innovation** (foto Mineral Infusions) · **`estratti` = Estratti Botanici** (foto "Saponi") · **`uomo` = linea Uomo** (foto "Active").

**Card linee** nella pagina L'Erboristica (`linee/erboristica.html`) — formato 7:5:
`immagini/<linea>/card.jpg` (stesse linee qui sopra).

**Hero pagine BRAND** (le 4 pagine marchio):
- L'Erboristica (`linee/erboristica.html`) → `immagini/brand-erboristica/hero.jpg`
- Everby (`linee/everby.html`) → `immagini/everby/hero-gruppo.jpg`
- Kaley (`linee/kaley.html`) → `immagini/kaley/collection.jpg`
- Sphea (`linee/sphea.html`) → foto interna alla pagina Sphea (non modificata in questa fase).

**Portfolio brand** (`linee.html`, i 4 riquadri):
- L'Erboristica → `immagini/brand-erboristica/cover-linee.jpg`
- Everby → `immagini/everby/cover-linee.jpg`
- Kaley / Sphea → foto interne dei rispettivi riquadri.

**Altre foto chiave:**
- Hero **Contatti** (`contatti.html`) → `immagini/contatti/hero.jpg` (con velo scuro a sinistra per leggere il titolo; il menu in alto è in versione chiara).
- Intro **Kaley** ("Un profumo che appartiene solo a te") → `immagini/kaley/lifestyle-01.jpg`.
- Banner fragranze Kaley → `immagini/kaley/<fragranza>/pack-gradiente.webp`.
- **Sphea** "The science of pearls" → `immagini/sphea/stilllife.jpg`.
- **Loghi brand** → `immagini/brand-<brand>/logo.png` (il logo L'Erboristica è stato ripulito, vedi 7.5).
- **Immagine social WhatsApp/Facebook** → `immagini/og/athenas-share.jpg` (1200×630).
- **Favicon** → in **root**: `favicon-16.png`, `favicon-32.png`, `favicon-512.png`, `apple-touch-icon.png`.
- **Loghi certificazioni** (Sostenibilità + schede prodotto) → NON sono file immagine ma **maschere CSS in `assets/cert-masks.css`** (PNG in base64). Il "Plant Based" è il logo Bioagricert. Per cambiarli serve rigenerare la maschera.

---

## 4. COSA MANCA (contenuti, non codice)

Dove la foto manca compare un placeholder discreto, quindi il sito resta a posto anche senza:

- **1** foto squadra/famiglia in **home** (`index.html`).
- **5** foto dei referenti in **`contatti.html`**.
- **2-3** foto **Sphea** aggiuntive in `linee/prodotto-sphea.html`.
- (Le foto delle linee, dei brand, dell'editoriale L'Erboristica e l'immagine social/favicon sono **già state inserite** in questa fase.)

---

## 5. NON FONDAMENTALE — migliorie future

- **Anteprima link in inglese**: non possibile con questa architettura (i crawler social non eseguono JS → leggono i meta IT). Servirebbero **URL separati `/en/`**. Per il lancio tenere le anteprime in italiano.
- **`hreflang`** / **`<title>` dinamici EN per le schede prodotto**: collegati al punto sopra.
- **Mobile hero**: gli hero linea/prodotto si adattano (larghezza piena, si impilano), ma il layout mobile è **in corso di rifinitura**. Da rivedere su telefono reale.

---

## 6. CHECKLIST — dati/credenziali dal cliente

- [ ] **Elenco vecchi URL** (export Search Console) → redirect 301.
- [ ] **Facebook Pixel ID**.
- [ ] **API key Brevo** (+ endpoint) → invio form.
- [ ] Conferma **property GA4** (ID già nel codice).
- [ ] **~6 foto di contenuto** rimanenti (team home, 5 referenti contatti, extra Sphea).
- [ ] Eventuali **credenziali Iubenda**.
- [ ] Accesso **DNS** athenas.it + **SSL** attivo.

---

## 7. ⚠️ AGGIORNAMENTI RECENTI (giugno 2026) — e COSA NON ROMPERE

Questa fase ha sistemato molte cose e ne ha cambiate alcune **strutturali**. Leggi con attenzione: i punti contrassegnati ⚠️ sono **trappole** in cui è facile ricadere.

### 7.1 Favicon
- È la **"A"** di Athena's (file in root, vedi Sezione 1.2 e 3). Sostituibile mantenendo gli stessi nomi file. Se la cambi, **alza il numero in `?v=2`** nei `<link rel="icon">` (le favicon sono tenute in cache in modo molto aggressivo dai browser).

### 7.2 Immagine social (Open Graph) — WhatsApp/Facebook
- Unica per tutte le pagine: `immagini/og/athenas-share.jpg`. Tutti i meta puntano lì.
- ⚠️ L'URL nei meta è **`https://athenas.it/immagini/og/athenas-share.jpg`** (assoluto). **L'anteprima funziona solo quando il sito è live su athenas.it.** Sul link di test Netlify l'immagine non si vede (è normale). Dopo il go-live, per forzare l'aggiornamento delle anteprime usare il **Facebook Sharing Debugger**.
- I vecchi file per-pagina `immagini/og/<pagina>.jpg` **non sono più usati**.

### 7.3 ⚠️⚠️ CACHE DELLE IMMAGINI (il punto più importante)
- **Problema risolto in questa fase**: le immagini avevano `Cache-Control: max-age=31536000` (**1 anno**). Sostituendo una foto **con lo stesso nome file**, i browser dei visitatori continuavano a mostrare la **versione vecchia** anche dopo il deploy (online "sbagliato", in locale giusto).
- **Fix applicato in `netlify.toml`**: le immagini (`jpg/jpeg/png/webp`) ora hanno `Cache-Control: public, max-age=0, must-revalidate` (come css/js). Così ad ogni cambio foto i browser prendono la versione nuova.
- ⚠️ **NON rimettere la cache lunga (`max-age=31536000`) sulle immagini** se prevedi di sostituirle mantenendo lo stesso nome: torneresti al problema delle foto vecchie online.
- ⚠️ **Su APACHE (`.htaccess`)**: lì c'è ancora `ExpiresByType image/... "access plus 1 year"`. Se pubblichi su Apache e sostituisci immagini per nome, **riduci quel valore** (o aggiungi `?v=N` ai percorsi immagine) per evitare lo stesso problema di foto stale.

### 7.4 ⚠️ FONT (niente Google Fonts)
- Tutti i font sono **self-hosted** (`assets/fonts.css` + file in `assets/fonts/`), con **`font-display: swap`**. Le pagine **precaricano** i font degli hero (Fraunces 200/300 normale+italico, Cormorant 400 italico).
- ⚠️ **Era `font-display: optional`** e va lasciato **`swap`**: con `optional`, se i font non arrivavano entro ~100ms (es. dopo un hard-reload o a cache vuota) il browser restava sul **font di sistema su TUTTO il sito** e non lo sostituiva più. Con `swap` il font del brand viene **sempre** mostrato appena caricato. **Non rimettere `optional`.**
- ⚠️ **Non re-introdurre Google Fonts** (`fonts.googleapis.com`): i self-hosted servono a evitare dipendenze esterne e il "lampo" di font.

### 7.5 ⚠️ HERO PAGINE LINEA = `background-image`, NON un `<img>`
- L'hero delle pagine linea (`linee/linea.html`) imposta la foto come **`background-image` del contenitore `#heroBg`** (via JS), non come un `<img>`.
- **Perché**: un `<img>` iniettato via JS, pur essendo caricato e visibile nel DOM, **su alcuni render del sito live NON veniva ridipinto** → si vedeva solo il gradiente di sfondo (sembrava che le foto hero fossero "sbagliate" online ma giuste in locale). Il passaggio a `background-image` ha risolto.
- ⚠️ **NON riconvertire l'hero linea in un `<img>` iniettato via JS**: tornerebbe il bug "hero non visibile online".
- Nota: mentre la foto carica si vede un **fallback scuro neutro** (prima era verde per un bug: la mappa `palettes` è indicizzata per nome colore ma il codice cercava con l'id linea → ricadeva sempre su "sage"=verde. Ora fallback neutro).

### 7.6 ⚠️ `app.js` ha una versione (`?v=14`)
- `assets/app.js` è incluso come **`app.js?v=14`** in tutte le **16** pagine (cache-busting).
- ⚠️ **Se modifichi `app.js`, alza il numero** (`?v=15`, ecc.) in tutte le pagine, altrimenti i browser dei visitatori continuano a usare la versione vecchia in cache. (CSS e `search-data.js` non hanno `?v=` perché `netlify.toml` li serve in `must-revalidate`: si aggiornano da soli.)

### 7.7 Testi/etichette cambiati
- **Terzisti → in inglese è "Contract Manufacturing"** (menu, titoli, ruolo di Gloria in Contatti, tab del form, ricerca). La pagina resta `terzisti.html` (i link non cambiano).
- Rimosso ovunque il termine **"private label"** (→ contract manufacturing) e il claim **"250 referenze"** (numero e parola tolti).
- Catalogo: niente "Edizione 2026" → "Ultima edizione".

### 7.8 Ottimizzazione immagini pesanti
- Ridotte le immagini più grosse servite: `immagini/azienda/hero-laghetto.jpg` (3.2MB→~400KB), loghi Sphea `brand-sphea/logo-clean.png` e `logo.png`, `mineral-infusions/*`. Logo L'Erboristica `brand-erboristica/logo.png` ripulito (829KB→40KB: era pieno di rumore/artefatti, si vedevano "puntini" da grande).

### 7.9 Altri fix di questa fase
- Eliminato il "lampo" del segnaposto a forma di boccetta sulle schede prodotto (la foto reale appare senza scatto).
- Sistemati vari flash/scatti al refresh (immagini con decode asincrono, dissolvenze rimosse dove causavano scatti/jank).
- Hero contatti con foto + menu chiaro; separatori in home; logo certificazione Plant Based (Bioagricert).

---

## 8. File/cartelle da NON pubblicare (pulizia consigliata)

**Consigliato: pubblicare il contenuto del repository Git** (`JayThug-The-Coder/erboristica-site`), che esclude già tutto questo via `.gitignore`. Se pubblichi la cartella locale, escludi:

- `immagini/_GALLERIA/`, `immagini/higgsfield/`, `immagini/_inbox/`, `immagini/_hero_backup_*`, `immagini/_backup_*`, `_orphan`, `_concept`, `_reambient`, `_ecommerce` — archivi/scarti di lavorazione foto (**molto pesanti, ~2.3 GB complessivi**, già esclusi da Git).
- **Backup foto `*-OLD.jpg` / `*-OLD.png` / `*-OLD.webp`** — creati durante le sostituzioni (già esclusi da Git).
- **Sorgenti PNG enormi delle foto prodotto** (es. `immagini/<linea>/<prodotto>/hero.png`, `det-*.png`): il sito usa le versioni `.webp`, questi `.png` sono solo sorgenti (già esclusi da Git via `immagini/**/hero.png` e `det-*.png`).
- `_docs/`, `*.docx`, `*.pdf`, `*.zip` — documenti sorgente.
- `_preview/`, `immagini/kaley/index.html`, PNG di prova con prefisso `_`.
- Documentazione interna: `CLAUDE.md`, `PROGRESS.md`, `HANDOFF.md`, `KNOWLEDGE.md`, `AUDIT-*.md`, questo `CONSEGNA-TECNICO.md`.

> ✅ Le cartelle sorgente pesanti e i backup **sono già nel `.gitignore`**, quindi **pubblicando dal repository Git non finiscono online** automaticamente.

---

## Riepilogo a colpo d'occhio

**Pronto e funzionante:** tutte le pagine (IT/EN), schede prodotto, ricerca, 404, banner cookie GDPR, sitemap/robots, header di sicurezza, GA4 (post-consenso), form contatti (fallback mailto), **favicon**, **immagine social unica**, font self-hosted, smooth scroll, foto linee/brand/contatti/Sphea inserite.

**Da chiudere prima/al go-live (essenziale):** redirect 301 vecchi URL · endpoint form Brevo · Facebook Pixel ID · verifica GA4 · SSL · **sito live su athenas.it perché l'anteprima social funzioni**.

**⚠️ NON rompere:** cache immagini = `must-revalidate` (non 1 anno) · niente Google Fonts · hero linea = `background-image` (non `<img>`) · alza `?v=` se modifichi `app.js` · sempre `data-it` + `data-en` sui testi nuovi.

**Migliorie future (non bloccanti):** anteprime link in inglese (URL `/en/`) · hreflang · rifinitura mobile degli hero.

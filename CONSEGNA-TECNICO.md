# Athena's — Consegna al tecnico per la messa online

> Sito che sostituisce l'attuale **athenas.it**. Questo documento spiega **com'è fatto il sito**, **cosa è già pronto**, **cosa manca** e **cosa va fatto prima e dopo il go-live**, in ordine di priorità.

---

## 0. Cos'è il sito (in breve)

- **Sito statico**: solo HTML, CSS e JavaScript. **Nessun build, nessun framework, nessun database, nessun backend.** Si pubblica copiando i file così come sono.
- Una pagina = un file `.html`. Le parti condivise (barra in alto, footer, ricerca, banner cookie, traduzioni) sono iniettate da `assets/app.js`.
- I dati dei prodotti stanno in `assets/data.js` e `assets/data-inline.js` (caricati dal browser, niente server).
- **Bilingue IT/EN**: il cambio lingua è lato browser (ogni testo ha `data-it="..."` e `data-en="..."`). Non esistono URL separati per l'inglese.
- Font: self-hosted in `assets/fonts/` (nessuna dipendenza esterna a parte, eventualmente, Google Fonts come fallback).

### Dove pubblicarlo
La cartella va messa nella **root del dominio** (athenas.it punta a questa cartella). Due strade possibili:

L'attuale athenas.it è in **WordPress** (hosting Apache/PHP): questo nuovo sito è **HTML statico** e va sullo **stesso hosting**, sostituendo i file del vecchio sito nella web root. Userai l'ambiente che già gestisci — qui sotto solo ciò che è specifico di questo sito:

- **Su Apache** (caso tuo, stesso hosting di WordPress): il file **`.htaccess` è già pronto** (home, 404, HTTPS, header di sicurezza, gzip, cache, blocco file sensibili). Attenzione a non lasciare attivi i file/regole di WordPress che potrebbero interferire.
- **Su Netlify** (dove gira la versione di test): vale `netlify.toml` (già presente) e **il `.htaccess` viene ignorato**.

> Versione di test attuale: `https://creative-sunburst-9a3c92.netlify.app`. I meta tag, la sitemap e i link interni puntano **già** a `https://athenas.it`, quindi non serve cambiare URL nel codice.

---

## 1. ESSENZIALE — da fare prima del go-live

Queste cose vanno sistemate **prima** o **al momento** della pubblicazione.

| # | Cosa | Stato | Chi/come |
|---|------|-------|----------|
| 1 | **Redirect 301 dai vecchi URL WordPress** | ❌ Da fare | Esportare l'elenco dei vecchi URL da Google Search Console (l'accesso ce l'ha il cliente). Per ognuno aggiungere una regola 301 nel `.htaccess` (Apache) o in `_redirects`/`netlify.toml` (Netlify). **Importante per non perdere il posizionamento Google** e per non lasciare link rotti. |
| 2 | **Favicon** (icona scheda browser) | ❌ Manca nel sito | Questo sito non include una favicon. Se non la gestisci già tu a livello di dominio, aggiungere `favicon.ico` + `apple-touch-icon.png` in root e i `<link rel="icon">` nelle pagine (o iniettarli da `app.js`). Operazione minima. |
| 3 | **Foto anteprima link (Open Graph)** | ❌ Mancano | Sono le immagini che compaiono quando si condivide un link (WhatsApp, Facebook, LinkedIn). I meta tag esistono già e puntano a `immagini/og/*.jpg`, ma **i file non ci sono** (c'è solo `immagini/og/README.md` con l'elenco e le specifiche: 11 file, 1200×630px). Finché mancano, l'anteprima esce senza immagine. |
| 4 | **Form contatti — invio reale** | ⚠️ Funziona in fallback | Oggi il form fa un POST a `BREVO_ENDPOINT = '/api/contact'` (`contatti.html`, riga ~825) che **non esiste ancora**: se fallisce, **ricade automaticamente su `mailto:` verso info@athenas.it** (apre il client email dell'utente). Per un invio server-side vero serve un endpoint che giri il messaggio a Brevo (API key Brevo lato cliente). Se non lo si fa, il form resta comunque usabile via mailto. |
| 5 | **Facebook Pixel** | ⚠️ Codice pronto, ID mancante | In `assets/app.js` (riga ~271) la riga `const FB_PIXEL_ID` è **commentata**: finché non si inserisce il Pixel ID reale, il Pixel **non si carica**. Decommentare e mettere l'ID quando il cliente lo fornisce. Si attiva solo dopo consenso "marketing" del banner cookie. |
| 6 | **Google Analytics 4** | ✅ Configurato — da verificare | L'ID `G-11CJ431D6Y` è già inserito (`app.js` riga ~255) e si carica **solo dopo consenso** "statistiche". Verificare che sia la property GA4 corretta del cliente e che i dati arrivino dopo il go-live. |
| 7 | **HTTPS / certificato SSL** | ⚙️ Lato hosting | Il `.htaccess` forza già HTTPS (redirect 301). Assicurarsi che il certificato SSL sia attivo sul dominio (di solito incluso nell'hosting / Let's Encrypt). |

---

## 2. COME FUNZIONA (da sapere per non rompere nulla)

### 2a. Sistema foto prodotti
- Il sito mostra **solo** i file `.webp` ai percorsi "piatti": `immagini/<linea>/<prodotto>/hero.webp`, `det-01.webp`, `det-02.webp`.
- `hero.webp` = packaging (foto grande + mini-card); `det-01.webp` = ingrediente chiave; `det-02.webp` = foto ambient.
- **La terza foto (`det-02`, "ambient") è stata volutamente disattivata**: quando manca, la scheda L'Erboristica/Everby non mostra alcun buco — la sezione "Cosa non c'è" si dispone elegantemente a tutta larghezza. È il comportamento desiderato, non un bug. (Se un giorno si vorranno reintrodurre foto ambient valide, ricompaiono da sole appena il file esiste.)
- I percorsi sono dichiarati in `assets/data.json` / `assets/data-inline.js` (campo `images`). Se il file non c'è, compare un placeholder discreto (o il layout a tutta larghezza di cui sopra).
- Esiste un archivio master `immagini/_GALLERIA/` ma **NON va pubblicato** (è pesante, ~1.6 GB, ed è già escluso dal repo Git). Il sito non lo usa: carica solo i file "piatti" qui sopra.
- ⚠️ **La fonte di verità è ciò che si vede sul sito**, non l'archivio. I file effettivamente caricati dal sito sono quelli ai percorsi piatti (es. Everby e Uomo prendono il pack da una copia già verificata). Nell'archivio `_GALLERIA` (organizzato per tipo, es. `prodotto-pack/`) alcune versioni avevano **difetti**: foto **stirate ai lati** (proporzioni sbagliate) o **colore prodotto errato**. Quindi: se devi sostituire/aggiungere una foto, modifica il percorso piatto in `data.json`/`data-inline.js` e **verifica a occhio sul sito** (niente stiramento ai bordi, colore giusto) — non ricopiare alla cieca dall'archivio.

### 2b. Bilingue (IT/EN)
- Ogni testo ha `data-it` e `data-en`. Il cambio lingua è gestito da `app.js` lato browser e **salvato nel browser dell'utente** (localStorage).
- **Regola d'oro se si aggiunge testo nuovo**: mettere SEMPRE sia `data-it` sia `data-en`, altrimenti la versione inglese resta vuota.

### 2c. URL "puliti" — attenzione
- Su **Netlify** gli URL funzionano anche senza `.html` (es. `/prodotto`). Su **Apache** no: lì valgono gli URL con `.html`.
- **I link interni del sito usano sempre `.html`**, quindi funzionano su entrambi. Non serve attivare la riscrittura URL su Apache. (Se la si attiva comunque, testare bene perché alcuni controlli JS dipendono dal percorso.)

### 2d. Pagina di errore 404
- Esiste `404.html` brandizzato. Si attiva da sola: su Apache via `.htaccess` (`ErrorDocument 404 /404.html`), su Netlify in automatico.
- Quando un utente sbaglia indirizzo (es. `athenas.it/percorso-inesistente`) vede questa pagina con HTTP 404 corretto e i pulsanti "Torna alla home" / "Scopri i brand". **Già testato e funzionante a qualsiasi profondità di URL.**

### 2e. Banner cookie
- Banner **GDPR self-hosted** (gratuito, in `app.js`), con 3 categorie e gestione del consenso. Gli analytics/Pixel partono **solo dopo** il consenso.
- Il cliente ha un account **Iubenda**: se si vuole usare quello, va sostituito il banner attuale (le istruzioni sono nel codice/commenti). **Non obbligatorio**: l'attuale è già a norma.

### 2f. Header di sicurezza / CSP
- Il `.htaccess` imposta header di sicurezza e una **Content-Security-Policy**. La CSP **già consente** Google Analytics, Google Tag Manager, Facebook e Brevo. Se si aggiungono altri servizi esterni (mappe, chat, ecc.), va aggiornata la CSP altrimenti vengono bloccati.

---

## 3. COSA MANCA (contenuti, non codice)

**Foto di contenuto da aggiungere — circa 10**, le fornisce il cliente. Dove la foto manca, oggi compare un placeholder grafico discreto, quindi il sito resta a posto anche senza:

- **1** foto squadra/famiglia in **home** (`index.html`).
- **1** foto editoriale L'Erboristica (verticale) in **`linee.html`**.
- **5** foto dei referenti in **`contatti.html`** (Cortinovis, Buratto, Verzani, Venturino, Lasagna).
- **2-3** foto **Sphea** (foto prodotto + before/after clinica) in `linee/prodotto-sphea.html`.
- **Foto Open Graph** (vedi punto 1.3): 11 immagini 1200×630 da creare — queste sono le "foto anteprima link", una categoria a sé.

---

## 4. NON FONDAMENTALE — migliorie future (si possono fare dopo)

- **Anteprima link in inglese** (richiesta del cliente): **al momento non è possibile** con questa architettura. Le anteprime social (titolo "Manifattura italiana…" + descrizione) sono lette dai crawler di Facebook/WhatsApp/LinkedIn, che **non eseguono JavaScript** e quindi non sanno in che lingua stava navigando l'utente: leggono i meta tag statici, che sono in italiano. Per avere anteprime in inglese servirebbero **URL separati per l'inglese** (es. `/en/...`), ognuno con i propri meta tag statici — è un intervento strutturale. **Raccomandazione**: per il lancio tenere le anteprime in italiano (standard per un sito a dominio unico con cambio lingua lato browser); valutare gli URL inglesi solo se l'inglese diventa un canale importante.
- **`hreflang`**: collegato al punto sopra. Senza URL separati per lingua non è applicabile. Da considerare insieme agli URL `/en/`.
- **Tag `<title>` e meta description dinamici per le schede prodotto in inglese**: i titoli delle pagine statiche sono già bilingui; le schede prodotto dinamiche mostrano il titolo nella lingua scelta lato browser ma il `<title>` "di partenza" è IT (stesso motivo dei crawler).
- **Ottimizzazione immagini**: le foto sono già in `.webp`; eventuale ulteriore compressione/`srcset` responsive è un plus, non un blocco.

---

## 5. CHECKLIST — dati/credenziali che servono dal cliente

Da raccogliere per chiudere i punti della Sezione 1:

- [ ] **Elenco vecchi URL** del sito attuale (export da Google Search Console) → per i redirect 301.
- [ ] **Facebook Pixel ID** → per attivare il Pixel.
- [ ] **API key Brevo** (+ eventuale endpoint) → per l'invio reale del form contatti.
- [ ] Conferma **property GA4** corretta (l'ID `G-11CJ431D6Y` è già nel codice).
- [ ] **Foto Open Graph** (11 file 1200×630) e le **~10 foto di contenuto** della Sezione 3 (team, editoriale linee, 5 referenti contatti, Sphea).
- [ ] Eventuali **credenziali Iubenda**, se si vuole sostituire il banner cookie.
- [ ] Accesso **DNS del dominio** athenas.it (per puntarlo al nuovo hosting) e **certificato SSL** attivo.

---

## 6. File/cartelle da NON pubblicare (pulizia consigliata)

Se si consegna l'**intera cartella locale**, contiene materiale di lavoro che non serve al sito (ed è pesante). **Consigliato: pubblicare il contenuto del repository Git** (`JayThug-The-Coder/erboristica-site`), che esclude già tutto questo tramite `.gitignore`. Se invece si pubblica la cartella, escludere:

- `immagini/_GALLERIA/` e `immagini/_hero_backup_*` / `immagini/_backup_*` — archivi/backup foto (pesanti).
- `_docs/`, file `*.docx`, `*.pdf`, `*.zip` — documenti sorgente.
- `_preview/`, `immagini/kaley/index.html`, e i PNG di prova in `immagini/` con prefisso `_` (es. `_ing2_*`, `_new_*`, `_test_*`, `_prova_*`) — scarti di lavorazione.
- File interni di documentazione: `CLAUDE.md`, `PROGRESS.md`, `HANDOFF.md`, `KNOWLEDGE.md`, `AUDIT-*.md`, questo stesso `CONSEGNA-TECNICO.md`.
  - Su Apache il `.htaccess` **già blocca** la visualizzazione pubblica di molti di questi (CLAUDE/PROGRESS/AUDIT/README/docx/zip). Gli altri `.md` interni conviene comunque non caricarli o bloccarli.

---

## Riepilogo a colpo d'occhio

**Pronto e funzionante:** tutte le pagine (IT/EN), schede prodotto, ricerca, 404, banner cookie GDPR, sitemap/robots, header di sicurezza, GA4 (post-consenso), form contatti (fallback mailto), meta tag e URL già su `athenas.it`.

**Da chiudere prima/al go-live (essenziale):** redirect 301 vecchi URL · favicon · foto anteprima link (OG) · endpoint form Brevo · Facebook Pixel ID · verifica GA4 · SSL.

**Migliorie future (non bloccanti):** anteprime link in inglese (richiede URL `/en/` separati) · hreflang · ottimizzazioni immagini.

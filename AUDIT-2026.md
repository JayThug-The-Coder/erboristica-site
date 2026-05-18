# Athena's — Audit critico (versione 2, basata sul rendered) · Maggio 2026

> Questo audit sostituisce la prima versione, che era stata scritta solo leggendo i file dal sandbox e si era persa contenuti che ESISTONO già nel sito servito da `localhost:8088`. Le diagnosi qui sotto sono dopo un giro completo del sito in browser.

---

## 1. Stato reale del sito (cosa funziona già bene)

Il sito è molto più completo di quanto sembrava dal codice statico. Visto pagina per pagina:

### azienda.html — 4 atti, sostanzialmente solido
1. **Hero cinematografico** "Una storia italiana" + 1969.
2. **Valori (— 01)** con 3 zigzag (Natura / Ricerca / Famiglia) + carosello "Dietro ogni formula" con **7 stories** (Laboratorio · Materie prime · Riempimento · Ferrara · Pianoro · OPIMM · 80% solare).
3. **In numeri (— 02)** con 4 grandi button cliccabili (55+ / 80% / certificazioni / 95%+) che aprono un dialog.
4. **La nostra storia (— 03)** è già una **timeline orizzontale con prev/next** sulle 7 milestones (1969 · '80-'90 · 1999-2001 · 2003 · Kaley 2022 · Everby 2024 · Sphea 2025).
5. Sezione **team** con kinetic typography ("rimane un'impresa di famiglia, con un grande valore aggiunto: il suo team").
6. **I quattro pilastri (— 04)** con 4 articles ricchi: Famiglia Venturino · Università Ferrara · OPIMM Bologna · Eco Friendly Packaging.
7. Footer.

Conclusione: la struttura narrativa c'è. La timeline che la prima versione dell'audit "chiedeva" esiste già.

### laboratorio.html — la pagina più completa del sito
Hero con diagramma molecolare + 4 specifiche tecniche · statement · 4 numeri (12 / 55+ / 250+ / 100%) · 4 fasi processo (Selezione → Formulazione → Validazione → Produzione) con dettagli operativi reali (cutometro/tewameter/corneometro, retention 36 mesi, CAPA) · 4 tecnologie proprietarie con accordion ricco (Peptidi biomimetici, Biopolimeri marini, Biofermentazione botanica, Estrazione a freddo) · **globo interattivo cobe** con 6 ingredienti che convergono in archi su Pianoro · GMP certs · CTA visite.

Conclusione: pochissimo da toccare. Pagina-padrona della "scienza".

### sostenibilita.html
Hero "La terra prima di tutto" · quote Antonio Venturino · 4 numeri d'impatto · 3 pilastri (Energia rinnovabile / Ingredienti rispettosi / Packaging consapevole) · **7 certificazioni clickable con dialog** (Plant Based, Vegan, Dermatologicamente Testato, Energia Solare, Test Nichel/Cromo/Cobalto, OPIMM, 100% Made in Italy) · CTA verso azienda.

Conclusione: solida. Mancano solo dati LIVE e la roadmap 2030 esplicita (vedi §3).

### linee.html
Editorial sticky scroll con 4 panel (Sphea / Everby / Kaley / l'Erboristica) + lineup card preview. Pulito, calmo, B2B-readable.

### catalogo.html
Hero + 4 filtri brand + 13 line-section ricche (10 linee l'Erboristica + Everby + Kaley + Sphea), ognuna con descrizione, target ("Per: pelle matura..."), copy lungo. Gli SVG decorativi per linea funzionano bene come fallback in attesa di foto.

### linee/sphea.html
Senza dubbio la più "premium": badge **Finalista Cosmoprof Awards 2026**, spiegazione in 4 step della Pearl Technology, **8 attivi brevettati con dossier clinico completo** (Ectoin, Uplevity E-Lift, Argireline Amplified, Niacinamide, CoQ10, Vitamina C, Actigym, Nocturshape) — con tutti i numeri trial (-12.3% rughe in 5 gg, +94.6% lifting vs placebo, ecc.). 5 sieri showcase + lineup grid + B2B CTA "Richiedi campioni / Scarica scheda tecnica".

### linee/kaley.html
7 fragranze (Crystal Rouge, Dark Sea, Golden Hour, Moka Rose, Monty Tonka, Spring Symphony, Sweet Whisper) + B2B CTA "Richiedi campioni / Scarica catalogo" + "Listino B2B".

### linee/everby.html
11 prodotti, philosophy, B2B CTA "Porta Everby nel tuo assortimento".

### linee/erboristica.html
Più sobria: 10 line-card + catalogo prodotti con SKU. Va bene come "pillar" sintetico, ma è la meno emotiva delle 4. Gli altri brand vendono storia, qui c'è solo l'inventario.

---

## 2. Difetti reali (ordine di gravità)

Dopo il giro vero, restano questi problemi concreti.

### 2.1 BUG — link rotti
- **`certificazioni.html` → 404**. È linkato dal footer di TUTTE le pagine ("Azienda → Certificazioni"). Click = pagina di errore. Va creata o il link va rediretto a `sostenibilita.html#certs`.

### 2.2 BUG — sezione spaccio aziendale assente da contatti
Nel CSS di `contatti.html` esistono le classi `.spaccio-card`, `.spaccio-title`, `.spaccio-tag`, `.spaccio-hours` (con anche il watermark "venerdì" decorativo) ma il body NON contiene markup che le usi. Lo spaccio del venerdì 12-18 in Via della Cooperazione 20 — uno degli asset più memorabili dell'azienda — semplicemente non si vede sul sito.

### 2.3 contatti.html — la pagina più povera del sito
Oltre allo spaccio mancante:
- Mappa è ancora il **placeholder** SVG con la nota "sostituire con embed Google Maps".
- **Via della Cooperazione 20** (logistica + spaccio) non è citata.
- Il form ha un solo motivo di contatto in `<select>`. Per un sito B2B serve **multi-track** (rivenditore / distributore internazionale / private label / press / cliente privato), ognuno con campi specifici.
- Manca foto + nome + email diretta del responsabile commerciale Italia / export EU / export world. I buyer cercano quello.
- Manca social (LinkedIn esiste, Instagram, Facebook).
- Manca WhatsApp Business se attivo.

### 2.4 Pagina "Athena's per terzi" inesistente
Il `docx-extracted.txt` la cita esplicitamente: *"Lavoriamo principalmente per il nostro marchio, ma siamo anche ottimi sviluppatori di progetti a marchio privato."*

Sul sito B2B non esiste un capitolo dedicato. È **il singolo gap di contenuto più costoso**. Per un buyer dermo-cosmetico francese che valuta partner per private label, è la pagina che vende tutto.

### 2.5 Press kit / area download mancante
Footer ha il link "Area stampa → contatti.html#stampa" ma non c'è una vera press section. Per i media e i distributori esteri serve:
- Catalogo PDF 2026 (esiste già in `uploads/CATALOGO_ATH_2026.pdf`, 47 pagine).
- Logo pack + brand guidelines.
- Foto stabilimento HD (quando disponibili).
- Factsheet aziendale + factsheet certificazioni.
- Comunicato Cosmoprof Awards 2026 (Sphea finalist!) — è un asset PR importante e oggi vive solo come badge sulla pagina Sphea.

### 2.6 Placeholder ancora visibili al pubblico
- `linee/sphea.html` mostra ancora "**[Altre certificazioni in attesa di verifica]**" sopra alla CTA finale. Va sostituito con la lista certs reale (Plant Based, Vegan, Made in Italy, Bioagricert) o rimosso.
- Foto: tutte le pagine usano placeholder (gradient, SVG decorativi, `Foto · ...`). Non è un bug, è il next step.

### 2.7 Ripetizioni testuali — non gravi ma presenti
Visti dal browser:
- "Università di Ferrara" compare con frasi simili in azienda story-04, lab fase-04, lab num-100%, lab GMP, sostenibilità cert. È citata 5 volte sul sito con copy molto vicino.
- "Riempimento automatizzato senza contatto con operatori" è in azienda story-03, lab fase-04 e lab GMP.
- "0% petrolchimici / 95% naturale" è la stessa headline in azienda zigzag-01, sostenibilità impact-numbers, sostenibilità pilastro-02, lab fase-01.
- "Tre generazioni / una sola fabbrica" 3 volte in azienda + sostenibilità CTA finale.

Non è un disastro perché il sito è grande e l'utente non legge tutto in fila. Ma con piccole varianti di copy si toglie il sapore di brochure.

### 2.8 Asset narrativi non sfruttati
Nel sito ci sono argomenti **molto forti** che meritano più spazio:
- **Sphea finalista Cosmoprof Awards 2026** — è solo un badge piccolo nel hero della pagina sphea. Dovrebbe essere un highlight in homepage (azienda hero o sotto), in linee.html, nel footer come "news".
- **OPIMM** — storia di inclusione lavorativa con persone disabili. Oggi è citato con 1 paragrafo nei pilastri di azienda + 1 cert in sostenibilità. Mai una vera storia / foto / quote. Il pubblico B2B europeo lo apprezza moltissimo.
- **Cooperativa femminile argan in Marocco** — è citata in 1 riga sotto la legenda del globo in laboratorio. Storia da raccontare con un breve focus.
- **Brevetti Sphea** — sono il vero asset tecnologico (Argireline, Uplevity, Actigym, Nocturshape...). Esistono nelle 8 schede ma non vengono mai usati come "trophy wall" trasversale.

### 2.9 Nessuna landing/home reale
`index.html` è dichiaratamente un "indice di navigazione" con bottone "Vai al sito → azienda.html". Va bene come dashboard di sviluppo. In produzione, la home effettiva è `azienda.html`. Da decidere: chiudere `index.html` per il pubblico (rinominarlo `_index.html` o `dev.html`), e fare un redirect server-side `/` → `/azienda.html`. Oppure trasformare `index.html` in una vera home (più snella di azienda).

### 2.10 erboristica.html è asciutta rispetto ai fratelli
Sphea racconta la Pearl Technology, i premi e gli 8 attivi. Everby racconta gli attivi e la routine. Kaley racconta le 7 firme olfattive. **L'Erboristica** invece presenta solo le 10 linee + un catalogo griglia. È la più anziana, ha più storia, ha 250 referenze, ma sul sito è la più piatta. Una sezione dedicata alla "filosofia originaria" dal 1969 (l'erbario, la cooperativa, la prima formula, l'archivio etichette vintage) la trasformerebbe nella home emotiva del brand-padre.

---

## 3. Cosa aggiungere — sezioni e funzioni mancanti

Ordine di priorità B2B.

### 3.1 Pagina nuova: `terzisti.html` (private label / contract manufacturing)
Architettura proposta:
1. Hero scuro con i 3 numeri di credibilità: paesi di export, anni di esperienza, formule sviluppate.
2. **Cosa possiamo fare** in 3 cards: Sviluppo formula custom · Fill su packaging fornito · Linea completa marca privata.
3. **Capability matrix** tabellare: tipologie prodotto (creme, sieri, oli, scrub, profumi roll-on, deodoranti, after-sun...), MOQ tipici per formato, lead time medio, certificazioni applicabili al partner.
4. Process flow 5 step (kickoff → brief → POC → industrializzazione → produzione).
5. Casi studio anonimizzati (3-4): "Cliente dermo francese, 8 prodotti in 14 mesi"; "Catena retail tedesca, 12.000 pezzi/mese, 18 mesi".
6. Form dedicato con NDA-toggle, tipo prodotto, MOQ stimato, brief allegato.

**Tono**: serio, datato, "industrial-elegant", non "consumer-fancy".

### 3.2 Pagina nuova: `press.html` (o `risorse.html`)
- Catalogo PDF 2026 (link diretto a `uploads/CATALOGO_ATH_2026.pdf`).
- Logo pack ZIP / link Figma.
- Brand guidelines.
- Foto stabilimento HD (cartella `immagini/azienda/`).
- Comunicati: Cosmoprof Awards 2026 (Sphea finalista), lancio Sphea 2025, lancio Everby 2024.
- Contatto press dedicato (email diretta).

### 3.3 Pagina (o sezione in azienda) `certificazioni.html`
Per chiudere il 404. Può essere semplicemente un wrapper della sezione certs già in sostenibilità, o una pagina autonoma con dossier per ogni cert (PDF, ente, ambito, audit cycle, prodotti coperti, link a ente certificatore).

### 3.4 In contatti — re-inserire spaccio + tab form
Vedi §2.2 e §2.3.

### 3.5 In sostenibilità — live impact dashboard + roadmap 2030
- Aggiungere un blocco in cima all'impact-section che legge da `assets/impact.json` (creabile con valori statici aggiornabili a mano due volte l'anno): kWh fotovoltaico anno corrente, kg CO₂ compensati Impatto Zero® LifeGate, ore lavoro OPIMM, n. prodotti vegan, n. paesi export.
- Roadmap 2030 esplicita con target plastica vergine, packaging 100% riciclato, neutralità Scope 1+2, % packaging biobased.
- Link "Scarica report sostenibilità (PDF)" — anche se è un placeholder per ora, dichiara intenzione.

### 3.6 In azienda — promuovere Cosmoprof Awards 2026
La pagina ha 4 sezioni numerate (— 01 valori, — 02 numeri, — 03 storia, — 04 pilastri). Aggiungere — 05 (o inserire dopo numeri): **"Riconoscimenti recenti"** con il badge Cosmoprof Awards Sphea + altre eventuali recensioni stampa. Ad oggi questo è l'asset PR più grosso del 2026, vive solo nascosto nella pagina Sphea.

### 3.7 In linee/erboristica — capitolo "filosofia originaria"
Aggiungere prima della griglia delle 10 linee una sezione narrativa breve: l'erbario di Antonio Venturino, le prime ricerche '70-'80 (calendula, camomilla, rosmarino), un'archivio etichette vintage, l'arrivo dei figli, la transizione al digitale e i 250 referenze di oggi. Differenzia il brand-padre dai fratelli più "contemporanei".

### 3.8 Newsletter footer — manca confirmation/feedback
Il footer ha un campo email + "Iscriviti" su ogni pagina. Ad oggi non c'è uno stato di conferma, è il pattern classico in cui il bottone non fa nulla di percepibile. Aggiungere stato "Iscritto ✓" + GDPR-checkbox.

---

## 4. Linguaggi visivi 2026 — opportunità immersive concrete

In linea col globo cobe già fatto in laboratorio.

### 4.1 Quick wins (1-2 ore di Claude Code)
- **Promuovere Cosmoprof Awards a vista globale**: piccolo "ribbon" oro nel topbar che porta a `linee/sphea.html#cosmoprof`.
- **Kinetic typography on H1 di tutte le pagine**: parole che si compongono dall'alto al caricamento, stagger 60ms. Il sito già ha kinetic in azienda team-section, generalizzarlo in `app.js` con `initKineticHero()`.
- **Variable font weight on scroll** sui H1 (Fraunces da 200 a 400 in funzione dello scroll progress dell'hero).
- **Anchor nav sticky a destra** sulle pagine lunghe (laboratorio, sostenibilità, catalogo, sphea) con dot per ogni sezione, tooltip al hover.
- **Cursor custom dorato** su pagine scure (laboratorio, sphea, kaley, sezioni dark di azienda).
- **Section noise** (grano CSS animato 0.04 opacity) sui passaggi tra dark e cream.
- **Testi senza `.` finali** uniformemente sui titoli editorial (alcuni h2/h3 li hanno, altri no — uniformare verso senza-punto come scelta editoriale).

### 4.2 Effort medio (mezza giornata)
- **Live impact dashboard** in sostenibilità (§3.5).
- **Bento grid esploratore prodotto** in catalogo: 6 card asimmetriche random, ricaricabili, link a `prodotto.html?id=...`.
- **Trophy wall brevetti** in laboratorio: griglia dedicata con i 9 ingredienti brevettati (Argireline®, Uplevity®, Actigym®, Nocturshape®, Pumpcoll®, Argireline Amplified®, MAXI-LIP®, Capixyl®, Ectoin®, Luminescine®) con badge "patent active until YYYY".
- **Globo replicato in scala mini** in azienda (sotto i numeri): 2 marker — Pianoro + un ingrediente che ruota tra i 6 ogni 4 secondi. Riutilizza la stessa libreria cobe.
- **Sankey diagram materia prima → flacone** in sostenibilità (D3, leggero): mostra in flusso quante grammi vegetali, quanta acqua, quanto packaging per un prodotto medio.
- **Pearl Technology animation** in sphea: una micro-animazione canvas 2D dove la perla si schiaccia e libera l'attivo dorato. Non serve WebGL.
- **Marquee infinito** con i nomi dei prodotti più rappresentativi in linee.html ("MOKA ROSE · DARK SEA · PEPTI BOOM · EYELIFT PERFECTOR · MANDORLE DOLCI · ARGAN BIO · LUMINESCINE · ECTOIN").
- **Compact view toggle** in linee.html: passare da editorial sticky a 4-card-confronto.

### 4.3 Effort alto (1-2 giornate, ma "wow")
- **WebGL parallax foglia/oleolito** in hero azienda, sostituisce il gradient CSS attuale (Three.js già nel toolkit).
- **Tour 3D laboratorio** stilizzato low-poly: 5 inquadrature in scroll progressivo (banco lavoro → vasca formulazione → linea fill → cella stabilità → archivio retention).
- **Timelapse stabilimento 18-22 secondi** integrato come `<video autoplay muted loop>` con poster — necessita footage reale.
- **Audio-reactive ambient** opzionale in laboratorio (off di default, on toggle in basso a sinistra).
- **Generative botanical SVG** che cambia leggermente forma a ogni reload (silhouette di foglia con seedrandom). Da usare come watermark in azienda e sostenibilità.

### 4.4 Trend visivi 2026 a cui ancorarsi
- **Editoriale-as-data**: i numeri grandi hanno la dignità di un titolo, non della metrica. Sostenibilità e laboratorio già lo fanno, espandere in azienda e nelle pagine brand.
- **Color drained / botanic restraint**: sei già lì col gold + sage + cream + ink. Tenere la disciplina — niente palette accessorie.
- **Bento asimmetrico** invece di griglie regolari (per il catalogo e per la sezione brand portfolio).
- **Soft 3D mock-up** dei flaconi (Spline / glTF) finché non si hanno foto prodotto.
- **Anti-trend AI**: ostentare "fatto a mano". L'archivio polaroid stabilimento, la firma del fondatore in scrittura manuale come watermark, le etichette vintage. È il contropunto al saturation di immagini AI generate che sta arrivando.
- **Kinetic editorial sobrio** (à la Apple "Designed in California" 2026, à la Pentagram, Dia Studio). Lettere che si stabilizzano, non balletti.

### 4.5 Cosa NON fare
- Niente parallax al cursore generico (è 2022).
- Niente gradient meshs animati saturi (Sphea fa eccezione perché il nero/oro lo regge).
- Niente video di sottofondo che parte ad alto volume.
- Niente cookie banner aggressivo: la home B2B di un manifatturiero deve sembrare un'agenzia, non un e-commerce.

---

## 5. Riscritture di copy — sostituzioni concrete

### 5.1 Hero azienda (più caratteriale)
Attuale: *"Oltre cinquantacinque anni di passione per la cosmetica naturale. Tre generazioni, una sola fabbrica, tra Bologna e l'Appennino."*

Proposta:
> IT: "Cinquantasette anni nello stesso edificio, vicino Bologna. Tre generazioni di una stessa famiglia. Una squadra che ogni mattina arriva da Pianoro, Bologna, San Lazzaro. È così che si fa cosmetica naturale, da noi."
>
> EN: "Fifty-seven years in the same building, near Bologna. Three generations of the same family. A team that arrives every morning from Pianoro, Bologna, San Lazzaro. That's how natural cosmetics are made — here."

### 5.2 Sostenibilità lead — sostituire con dati
Attuale: *"Non è una scelta di marketing. È il motivo per cui siamo nati."*

Proposta:
> IT: "L'80% dell'energia che usiamo viene dal sole sopra il nostro tetto. Il 95% degli ingredienti che mettiamo in flacone è di origine vegetale. Lo zero per cento dei nostri prodotti contiene petrolchimici. Sono i tre numeri intorno a cui costruiamo tutto."
>
> EN: "80% of the energy we use comes from the sun above our roof. 95% of the ingredients we put in our bottles are plant-derived. 0% of our products contain petrochemicals. These are the three numbers we build everything around."

### 5.3 Linee — CTA brand-specific al posto del generico "Esplora il brand"
- **Sphea**: "Apri il sigillo nero" / "Open the black seal"
- **Everby**: "Entra nel rituale" / "Step into the ritual"
- **Kaley**: "Scegli la tua firma" / "Pick your signature"
- **l'Erboristica**: "Sfoglia il giardino" / "Browse the garden"

### 5.4 Catalogo hero
Attuale: *"Ogni formula racconta una storia."*

Proposta:
> IT: "250 referenze. Una sola filiera. Dieci linee, quattro brand: il catalogo Athena's letto come un atlante, non come un listino."
> EN: "250 references. One single supply chain. Ten lines, four brands: the Athena's catalogue read as an atlas — not a price list."

### 5.5 Laboratorio H2 — cliché da togliere
Attuale: *"Il processo che non scende a compromessi."*

Proposta:
> IT: "Quattro fasi, una sola cucina."
> EN: "Four phases, one kitchen."

---

## 6. Prompt pronti per Claude Code

Ognuno autonomo, da incollare in un terminale Claude Code aperto nella cartella `erboristica-site/`.

### Prompt 1 — chiudere link rotti + spaccio
> "Sul progetto Athena's: (a) la pagina `certificazioni.html` non esiste ma è linkata dal footer di tutte le pagine. Creare un wrapper che reindirizza a `sostenibilita.html#certs`, oppure se preferisci una pagina autonoma con un dossier breve per ogni delle 7 certificazioni (Plant Based, Vegan, Dermatologico, Energia Solare, Test Nichel, OPIMM, 100% Made in Italy) — usando lo stesso stile editorial della pagina sostenibilità. (b) In `contatti.html` esistono CSS per `.spaccio-card` ecc. ma manca il markup. Aggiungere una sezione subito dopo `.location-section` con eyebrow '— 04 / Spaccio aziendale', titolo 'Vienici a trovare il <em>venerdì</em>.', body bilingue IT/EN con indirizzo Via della Cooperazione 20, Pianoro (BO), orario 12:00-18:00, ingresso libero senza appuntamento. (c) Sostituire il placeholder mappa con un embed Google Maps reale, mostrando entrambi i pin (HQ Via del Lavoro 32 + spaccio Via della Cooperazione 20)."

### Prompt 2 — promuovere Cosmoprof Awards a livello globale
> "Aggiungere a tutte le pagine principali (azienda, linee, sostenibilità, laboratorio, contatti) un piccolo 'ribbon' nel topbar appena sotto la nav: badge oro che dice 'Sphea — Finalista Cosmoprof Awards 2026 · categoria Body' bilingue, con link a `linee/sphea.html#cosmoprof`. Ribbon dismissable (X chiude per la sessione corrente, salva in sessionStorage). Inoltre aggiungere a `azienda.html` una nuova sezione `— 05 / Riconoscimenti` subito dopo i 4 pilastri, con il badge Cosmoprof a sinistra e quote stampa a destra (per ora placeholder)."

### Prompt 3 — pagina nuova `terzisti.html`
> "Creare nuova pagina `terzisti.html` per attività di private label / contract manufacturing. Struttura: hero scuro (variante della palette laboratorio) con 3 counter ('47+ paesi · 250+ formule sviluppate · 90 giorni medi sviluppo'). Sezione 'Cosa sviluppiamo per te' con 3 capability cards (Custom formulation · Fill su packaging fornito · Linea completa marca privata). Capability matrix tabellare: tipologia prodotto (creme, sieri, oli, scrub, profumi roll-on, deodoranti, after-sun) × MOQ tipici × lead time × certificazioni applicabili. Process flow 5 step orizzontale (kickoff → brief → POC → industrializzazione → produzione). Casi studio anonimizzati (3 placeholder con metriche). Form dedicato con campi: tipo prodotto (select), MOQ stimato, paesi target, brief allegato (file input), NDA toggle. Bilingue IT/EN. Aggiungere link 'Per terzi / B2B' nella nav topbar (dopo Catalogo) e nella sezione B2B del footer."

### Prompt 4 — pagina `press.html` con catalogo PDF
> "Creare pagina `press.html` (Area stampa). Hero minimal cream con titolo 'Press kit & risorse'. 4 sezioni: (1) Catalogo prodotti — link diretto a `uploads/CATALOGO_ATH_2026.pdf` con anteprima copertina. (2) Logo pack & brand guidelines (placeholder ZIP). (3) Foto archivio — galleria che pesca da `immagini/azienda/`, `immagini/laboratorio/`, `immagini/sostenibilita/` se ci sono file, altrimenti placeholder grid. (4) Comunicati & news — 3 entry: 'Sphea finalista Cosmoprof Awards 2026' (full text bilingue da scrivere), 'Sphea: alta gamma con perle biopolimeriche · 2025', 'Everby: K-beauty con anima italiana · 2024'. Email press dedicata press@athenas.it nella CTA finale. Aggiornare il footer link 'Area stampa' da `contatti.html#stampa` a `press.html`."

### Prompt 5 — live impact dashboard sostenibilità
> "In `sostenibilita.html` sostituire la sezione `.impact-section` (— 01 Il nostro impatto) con un blocco 'live dashboard' che legga da nuovo file `assets/impact.json` (creare con valori placeholder ragionevoli: kwh_solar_2025, kg_co2_compensated_2025_lifegate, hours_opimm_2025, vegan_products_count, plant_based_products_count, paesi_export, formule_sviluppate). Dashboard a 6 tile asimmetriche (1 grande + 2 medie + 3 piccole, bento), ogni tile con: numero grande Fraunces, unità, claim breve, sub-label 'aggiornato Q1 2026'. Mantenere palette forest e watermark 'eco.'. Sotto la dashboard, una nuova sezione 'Roadmap 2030' come timeline orizzontale con 4 target (plastica vergine 0%, packaging 100% riciclato, neutralità Scope 1+2, biobased >70%). CTA 'Scarica report sostenibilità (PDF)' — placeholder."

### Prompt 6 — form contatti multi-track + responsabili
> "In `contatti.html` ristrutturare il form. Sostituire il `<select>` 'Motivo del contatto' con tab cliccabili in alto al form: 'Diventare rivenditore', 'Distribuzione internazionale', 'Private label / per terzi', 'Press & media', 'Cliente privato'. Ogni tab cambia i campi: rivenditore (nome, azienda, città, n. punti vendita), internazionale (paese, volumi attesi, paesi target), per terzi (tipo prodotto, MOQ stimato, brief), press (testata, deadline), privato (solo nome ed email). Submit cambia bottone in 'Inviato ✓'. Sotto il form aggiungere 3 contact-block 'Persona designata': Italia (foto placeholder + ruolo + email), Export EU, Export world. Mantenere bilingue IT/EN."

### Prompt 7 — capitolo filosofia originaria in erboristica brand
> "In `linee/erboristica.html` aggiungere prima della griglia 10-linee una nuova sezione `.eb-origin` che racconta la filosofia originaria. Architettura: eyebrow '— 02 / Filosofia originaria, dal 1969'; titolo 'L'erbario di una vita.'; 3 paragrafi che raccontino l'inizio (le prime erbe, calendula camomilla rosmarino, l'incontro col territorio bolognese, i primi prodotti, l'arrivo della seconda generazione che porta argan e cocco/monoï, i 250 referenze di oggi); a destra una colonna 'archivio' con 3 oggetti placeholder (etichetta vintage 1972, prima formula scritta a mano, pannello fotovoltaico installato 2014). Stile editorial sobrio cream + sage_deep, niente animazioni pesanti. Bilingue IT/EN."

### Prompt 8 — quick wins design 2026 (5 mini-task)
> "Sul progetto Athena's eseguire 5 micro-task editoriali: (1) Aggiungere a `assets/app.js` una funzione `initKineticHero()` che splitta in parole il primo h1 di ogni pagina, wrappa ogni parola in `<span class=\"k-word\"><span class=\"k-word-inner\">`, applica un'animazione CSS con stagger 60ms, durata 700ms, ease `--ease`, partenza 200ms dopo DOMContentLoaded. CSS in `tokens.css`. Non rompere `data-it/data-en`. (2) Sticky nav verticale a destra (dot + tooltip) su pagine lunghe: laboratorio, sostenibilità, catalogo, linee/sphea, linee/everby, linee/erboristica. (3) Cursor custom 8px gold con trail leggero su pagine dark (laboratorio, linee/sphea, linee/kaley, sezioni dark di azienda). Disattivato su touch devices. (4) Uniformare i punti finali nei titoli H2/H3 — togliere tutti i `.` finali (la convenzione editoriale 2026 è no-period). Aggiornare data-it/data-en di conseguenza. (5) Aggiungere allo stato 'iscritto' della newsletter nel footer un feedback visibile (testo 'Grazie ✓' che sostituisce il bottone 3 secondi)."

### Prompt 9 — globo replicato mini in azienda + sezione roadmap
> "Replicare la logica del globo cobe già in `laboratorio.html` (sezione lab-origin) come elemento secondario in `azienda.html`, dopo la sezione '— 02 In numeri', come una sezione '— 02b / Filiera globale'. Versione più piccola (canvas 360px), 2 marker visibili — Pianoro fisso + un ingrediente che ruota tra i 6 ogni 4 secondi (Argan, Monoï, Mandorle, Karité, Luminescine, Biopolimeri). Velocità rotazione doppia, drag disabilitato. Sotto al canvas, copy breve 'Sourcing globale, lavorazione locale' con 6 chip cliccabili che cambiano l'ingrediente highlight. Mantenere il marker dorato per Pianoro come nel lab."

### Prompt 10 — tip CTA brand-specific in linee.html
> "In `linee.html` cambiare il CTA delle 4 schede sticky e delle 4 lineup-card preview: invece di 'Esplora il brand' generico, usare frasi brand-specific: Sphea = 'Apri il sigillo nero' / 'Open the black seal'; Everby = 'Entra nel rituale' / 'Step into the ritual'; Kaley = 'Scegli la tua firma' / 'Pick your signature'; l'Erboristica = 'Sfoglia il giardino' / 'Browse the garden'. Bilingue. Mantieni la freccia →."

---

## 7. Decisioni che spettano a te (servono prima dei prompt)

1. **`certificazioni.html` autonoma o redirect?** Influenza Prompt 1.
2. **`index.html` di sviluppo va chiuso al pubblico?** O resta accessibile come "navigation overview"?
3. **Catalogo PDF in press.html — open access o gated?** Se gated, serve un mini-form pre-download.
4. **OPIMM citabile per nome con foto/quote?** Se sì, possiamo costruire una storia dedicata. Se no, restiamo sui paragrafi attuali.
5. **Capability matrix per terzisti — numeri reali o stimati?** Per `terzisti.html` Prompt 3.
6. **Foto reali in arrivo?** Se sì, in che mese? Influenza il timing dei prompt che dipendono da imagery (timelapse stabilimento, archivio etichette, family portrait Venturino, OPIMM, cooperativa argan).
7. **Domini e mail dedicate** — esistono `press@athenas.it`, `b2b@athenas.it`, `terzisti@athenas.it` o tutti su `info@`? Influenza copy contatti.
8. **Cosmoprof Awards** — la finale è quando? Possiamo costruire un piccolo countdown nel ribbon.
9. **Vuoi un blog/news ricorrente** o solo un press archive statico?

---

## 8. Ordine di esecuzione consigliato

1. ⚙️ **Prompt 1** — chiudere link rotti + spaccio (bloccante per credibilità: oggi i visitatori atterrano su 404).
2. 🏆 **Prompt 2** — Cosmoprof Awards in primo piano (asset PR del 2026, oggi nascosto).
3. 🆕 **Prompt 3** — `terzisti.html` (la pagina che oggi manca davvero per il B2B).
4. 📚 **Prompt 4** — `press.html` (sblocca il catalogo PDF).
5. 📨 **Prompt 6** — form multi-track contatti (aumenta conversione lead).
6. 📊 **Prompt 5** — live dashboard sostenibilità (segnale di maturità per buyer ESG-conscious).
7. ✨ **Prompt 8** — quick wins design 2026 (mezza giornata, alza tutto il sito di un livello).
8. 🌍 **Prompt 9** — globo replicato in azienda.
9. 📖 **Prompt 7** — capitolo origine in l'Erboristica.
10. 🔤 **Prompt 10** — CTA brand-specific (mini-task, ma molto editoriale).

Fra il 4 e il 5 conviene una review insieme: a quel punto il sito ha tre nuove pagine (terzisti, press, certificazioni risolta) e ha senso decidere se la home da mostrare al pubblico resta `azienda.html` o se costruiamo un'index più snella.

---

## 9. Riepilogo errori del primo audit (per trasparenza)

La prima versione di questo file conteneva 5 affermazioni sbagliate, basate solo sulla lettura del filesystem dal sandbox:

- ❌ "5 file HTML troncati" → in realtà il `localhost:8088` serve i file completi. Il sandbox aveva una vista disallineata.
- ❌ "Story carousel ha solo 5 entry" → ne ha 7 (incluse OPIMM e 80% solare).
- ❌ "Timeline storia mancante in azienda" → è già una timeline orizzontale con prev/next sulle 7 milestones.
- ❌ "Family portrait sezione mancante" → esiste come pilastro 01 in azienda.
- ❌ "Brand pages tutte deboli" → sphea e kaley hanno B2B CTA già pronti; sphea ha 8 schede attivi cliniche; kaley ha 7 fragranze + listino B2B.

Le diagnosi corrette sono in §2.

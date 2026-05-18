# Cartella immagini Athena's

Tutto il sistema visivo del sito legge le foto da questa cartella in modo automatico.
Quando carichi una foto nel posto giusto, il sito la mostra subito — senza modifiche al codice.

## Struttura

```
immagini/
├── {linea}/                        ← una cartella per ogni linea prodotto
│   └── {prodotto-slug}/            ← una sottocartella per ogni prodotto
│       ├── hero.webp               ← foto principale (formato 4:5 verticale)
│       ├── det-01.webp             ← dettaglio 1 (texture, ingredienti, ecc.)
│       └── det-02.webp             ← dettaglio 2 (utilizzo, packaging aperto)
│
├── azienda/                        ← foto pagina azienda.html
│   ├── carosello-01.webp           ← foto carosello "Dietro ogni formula" (sez 01)
│   ├── carosello-02.webp
│   ├── ...                         (7 foto totali per il carosello)
│   ├── numeri-01.webp              ← foto sopra ogni numero (sez 02)
│   ├── numeri-02.webp
│   ├── numeri-03.webp
│   ├── numeri-04.webp
│   ├── team.webp                   ← foto laterale alla quote
│   ├── timeline-1969.webp          ← foto timeline
│   ├── timeline-1990.webp
│   ├── timeline-1999.webp
│   ├── timeline-2003.webp
│   ├── timeline-2022.webp          (Kaley)
│   ├── timeline-2024.webp          (Everby)
│   └── timeline-2025.webp          (Sphea)
│
├── brand-erboristica/              ← foto hero pagina brand
├── brand-everby/
├── brand-kaley/
├── brand-sphea/
│
├── laboratorio/                    ← foto laboratorio R&S
└── sostenibilita/                  ← foto sostenibilità (fotovoltaico, riforestazione, ecc.)
```

## Convenzioni file

- **Formato:** WebP (preferito) o JPG. Usa WebP per pesi ridotti e qualità migliore.
- **Naming:** tutto minuscolo, separato da trattini. Niente spazi, niente caratteri speciali.
- **Estensione:** `.webp` (in alternativa `.jpg`)

## Dimensioni consigliate

| Tipo | Aspect ratio | Dimensioni minime | Note |
|------|--------------|-------------------|------|
| `hero.webp` (prodotto) | 4:5 verticale | 1200×1500 px | foto principale prodotto, mostrata grande |
| `det-01.webp`, `det-02.webp` | 1:1 quadrato | 1000×1000 px | dettagli prodotto |
| `carosello-NN.webp` (azienda) | 4:5 verticale | 800×1000 px | foto carosello laterale |
| `numeri-NN.webp` (azienda) | 1:1 quadrato | 800×800 px | mini-foto sopra i numeri |
| `team.webp` (azienda) | 4:5 verticale | 1000×1250 px | foto laterale alla quote |
| `timeline-YYYY.webp` (azienda) | 4:3 orizzontale | 1200×900 px | foto storia |
| `hero.webp` (brand-XXX) | 16:9 orizzontale | 1920×1080 px | foto hero pagina brand |

## Come trovare il nome della cartella per un prodotto

Il sito genera automaticamente lo slug del prodotto dal nome. Esempio:
- "FIALE CONCENTRATO RIMPOLPANTE" → `fiale-concentrato-rimpolpante`
- "Crema Viso Giorno" → `crema-viso-giorno`

L'elenco completo è in `assets/data.json` → ogni prodotto ha il campo `images.hero` che indica il path esatto.

Per vedere l'elenco veloce, apri la console del browser su una qualsiasi pagina del sito e digita:
```js
ATH_DATA.allProducts().forEach(p => console.log(p.images.hero))
```

## Cosa succede se manca una foto

Le sezioni che non trovano la foto mostrano il **placeholder gradient** colorato della linea (con etichetta).
Quando la foto viene caricata nella posizione corretta, sostituisce automaticamente il placeholder al refresh successivo.

## Workflow consigliato

1. Crea le foto rispettando dimensioni e aspect ratio della tabella.
2. Esportale come WebP (con `cwebp` o tool grafico) — qualità 80-85, dimensione tipica 80-200 KB.
3. Caricale nella cartella corretta usando il nome esatto indicato in `data.json`.
4. Ricarica la pagina del sito — la foto compare automaticamente.

## Esempio pratico — caricare le foto del prodotto "Contorno Occhi" della linea Antietà

```
immagini/antieta/contorno-occhi/hero.webp     ← foto principale
immagini/antieta/contorno-occhi/det-01.webp   ← dettaglio texture
immagini/antieta/contorno-occhi/det-02.webp   ← dettaglio applicatore/packaging
```

Una volta caricate, vai su `prodotto.html?id=antieta-contorno-occhi` e le vedi subito.

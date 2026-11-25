/* ─────────────────────────────────────────────────────────────
   ELENCO DEI MATERIALI — sezione "Materiali" dell'Archivio
   Il modo più semplice per aggiungerne uno è lo script:
       python3 aggiungi_materiale.py ~/Downloads/nome-file.pdf
   Se preferisci a mano: copia un blocco { ... } dentro la lista,
   separandolo dagli altri con una virgola.

   Campi:
     titolo       testo della scheda
     descrizione  una o due frasi
     categoria    schede | docente | collaborazioni   (le schede in CAA stanno in materiali/caa/caa.js)
     discipline   una o più tra: italiano, matematica, scienze, storia,
                  geografia, inglese, arte, musica, ed-fisica, tecnologia,
                  ed-civica, autonomie, emozioni, trasversale
     ordine       facoltativo, es. "Infanzia", "Primaria", "Primaria · classe 1ª"
     formato      pdf | pagina | presentazione | video | doc | zip
     file         nome del file dentro materiali/file/   (oppure)
     pagina       percorso di una pagina del sito (di solito non serve: qui vanno i file)
     link         indirizzo esterno, es. un video YouTube
     anteprima    facoltativo: immagine dentro materiali/file/
     tag          parole chiave facoltative
     data         AAAA-MM, serve per l'ordine (prima i più recenti)

   Esempio:
     {
       "titolo": "Vado dal parrucchiere",
       "descrizione": "Storia sociale in CAA per anticipare il taglio dei capelli.",
       "categoria": "storie-caa",
       "discipline": ["autonomie"],
       "ordine": "Infanzia e primaria",
       "formato": "pdf",
       "file": "vado-dal-parrucchiere.pdf",
       "tag": ["storia sociale", "ARASAAC"],
       "data": "2026-10"
     }
   ───────────────────────────────────────────────────────────── */
window.MATERIALI = /*INIZIO-ELENCO*/[
  {
    "titolo": "Percezione. Chi decide cos'è normale?",
    "descrizione": "Carosello a più voci sugli stereotipi di genere dall'infanzia alla scuola: le etichette che limitano i bambini, il filtro della percezione, la libertà di essere se stessi, il digitale che abbatte le barriere e piccole scelte quotidiane per cambiare. In chiusura un confronto in inglese tra Australia e Italia.",
    "categoria": "collaborazioni",
    "discipline": [
      "ed-civica",
      "emozioni",
      "inglese",
      "trasversale"
    ],
    "ordine": "Infanzia e primaria",
    "formato": "pdf",
    "file": "percezione-chi-decide-cosa-e-normale.pdf",
    "crediti": [
      {
        "nome": "@maestra_eliisa_",
        "handle": "@maestra_eliisa_"
      },
      {
        "nome": "@lamaestracolconiglio",
        "handle": "@lamaestracolconiglio"
      },
      {
        "nome": "@renneantonella",
        "handle": "@renneantonella"
      },
      {
        "nome": "@amicidipenna_global",
        "handle": "@amicidipenna_global"
      }
    ],
    "originale": "https://www.instagram.com/p/DfZY95TmoLS/",
    "tag": [
      "stereotipi di genere",
      "parità",
      "STEM",
      "identità",
      "linguaggio",
      "famiglia e scuola"
    ],
    "data": "2026-11",
    "anteprima": "percezione-chi-decide-cosa-e-normale-anteprima.png"
  },
  {
    "titolo": "Quaderno o tablet? Imparare tra carta, digitale e social",
    "descrizione": "Carosello a più voci sull'apprendimento oggi: perché il lavoro tradizionale resta insostituibile, la tecnologia come strumento di inclusione (sintesi vocale, mappe, timer, CAA), i social da usare con criterio e una pagina per i bambini su come verificare ciò che vedono online.",
    "categoria": "collaborazioni",
    "discipline": [
      "tecnologia",
      "ed-civica",
      "trasversale"
    ],
    "ordine": "Primaria",
    "formato": "pdf",
    "file": "apprendimento-digitale-social.pdf",
    "crediti": [
      {
        "nome": "@maestra_eliisa_",
        "handle": "@maestra_eliisa_"
      },
      {
        "nome": "@lamaestracolconiglio",
        "handle": "@lamaestracolconiglio"
      },
      {
        "nome": "@renneantonella",
        "handle": "@renneantonella"
      },
      {
        "nome": "@amicidipenna_global",
        "handle": "@amicidipenna_global"
      }
    ],
    "tag": [
      "digitale",
      "social media",
      "inclusione",
      "CAA",
      "UDL",
      "cittadinanza digitale"
    ],
    "data": "2026-10",
    "anteprima": "apprendimento-digitale-social-anteprima.png",
    "originale": "https://www.instagram.com/p/DfBKNtWj2Ux/"
  },
  {
    "titolo": "Crescere, imparare, concentrarsi",
    "descrizione": "Guida illustrata per genitori e docenti: concentrazione e scrittura, tempo e memoria di lavoro, pause, strumenti digitali e CAA, rituali di passaggio in classe.",
    "categoria": "collaborazioni",
    "discipline": [
      "italiano",
      "trasversale"
    ],
    "ordine": "Primaria",
    "formato": "pdf",
    "file": "crescere-imparare-concentrarsi.pdf",
    "crediti": [
      {
        "nome": "@lamaestracolconiglio",
        "handle": "@lamaestracolconiglio"
      },
      {
        "nome": "@renneantonella",
        "handle": "@renneantonella"
      },
      {
        "nome": "@maestra_eliisa_",
        "handle": "@maestra_eliisa_"
      },
      {
        "nome": "@amicidipenna_global",
        "handle": "@amicidipenna_global"
      }
    ],
    "tag": [
      "concentrazione",
      "scrittura",
      "funzioni esecutive",
      "CAA",
      "famiglia e scuola"
    ],
    "data": "2026-10",
    "anteprima": "crescere-imparare-concentrarsi-anteprima.png",
    "originale": "https://www.instagram.com/p/DedBFZID4Ps/"
  },
  {
    "titolo": "Come avvicinare i bambini alla scrittura",
    "descrizione": "Carosello illustrato sul pregrafismo creativo e sul Pen Pal: scrittura come gioco, comunicazione ed emozione, CAA e parole chiave, ambiente e autonomia (5-7 anni).",
    "categoria": "collaborazioni",
    "discipline": [
      "italiano",
      "autonomie"
    ],
    "ordine": "Infanzia e primaria · 5-7 anni",
    "formato": "pdf",
    "file": "come-avvicinare-i-bambini-alla-scrittura.pdf",
    "crediti": [
      {
        "nome": "@amicidipenna_global",
        "handle": "@amicidipenna_global"
      },
      {
        "nome": "@lamaestracolconiglio",
        "handle": "@lamaestracolconiglio"
      },
      {
        "nome": "@renneantonella",
        "handle": "@renneantonella"
      },
      {
        "nome": "@maestra_eliisa_",
        "handle": "@maestra_eliisa_"
      }
    ],
    "originale": "https://www.instagram.com/p/DdyF0Jqky1G/",
    "tag": [
      "scrittura",
      "pregrafismo",
      "Pen Pal",
      "CAA",
      "curiosità"
    ],
    "data": "2026-09",
    "anteprima": "come-avvicinare-i-bambini-alla-scrittura-anteprima.png"
  },
  {
    "titolo": "Il DNA",
    "descrizione": "Cinque schede di studio sul DNA con parole chiave evidenziate a colori: che cos'è, nucleotidi e doppia elica, il DNA come un libro, la mappa riassuntiva e le domande per il ripasso con l'autovalutazione.",
    "categoria": "schede",
    "discipline": [
      "scienze"
    ],
    "ordine": "Il DNA",
    "formato": "pdf",
    "file": "il-dna.pdf",
    "anteprima": "il-dna-anteprima.png",
    "tag": [
      "metodo di studio",
      "evidenziatori",
      "mappa",
      "ripasso"
    ],
    "data": "2026-11"
  },
  {
    "titolo": "La bussola del nonno",
    "descrizione": "Un racconto breve con tre schede di comprensione: domande a colori sui paragrafi, la teoria della mente (chi sa che cosa, che cosa pensano i personaggi, gli indizi nel testo) e i simboli nel racconto.",
    "categoria": "schede",
    "discipline": [
      "italiano"
    ],
    "ordine": "Comprensione del testo",
    "formato": "pdf",
    "file": "la-bussola-del-nonno.pdf",
    "anteprima": "la-bussola-del-nonno-anteprima.png",
    "tag": [
      "comprensione",
      "inferenze",
      "teoria della mente",
      "racconto"
    ],
    "data": "2026-11"
  },
  {
    "titolo": "Monarchie e imperi",
    "descrizione": "Otto schede di studio sul Basso Medioevo con il codice colori: la guerra dei Cent'anni, i regni della Penisola iberica, l'Impero e i regni d'Europa, l'Impero ottomano e il Giappone, la mappa con la linea del tempo, le domande per il ripasso e le frasi da completare per prepararsi alla verifica.",
    "categoria": "schede",
    "discipline": [
      "storia"
    ],
    "ordine": "Il Medioevo",
    "formato": "pdf",
    "file": "monarchie-e-imperi.pdf",
    "anteprima": "monarchie-e-imperi-anteprima.png",
    "tag": [
      "metodo di studio",
      "codice colori",
      "mappa",
      "linea del tempo",
      "ripasso"
    ],
    "data": "2026-11"
  },
  {
    "titolo": "La cellula",
    "descrizione": "Sette schede di studio sulla cellula con il codice colori: che cos'è e quali tipi esistono, la cellula procariote, la cellula animale come una città, la cellula vegetale, la respirazione cellulare, la mappa e le domande per il ripasso.",
    "categoria": "schede",
    "discipline": [
      "scienze"
    ],
    "ordine": "La cellula",
    "formato": "pdf",
    "file": "la-cellula.pdf",
    "anteprima": "la-cellula-anteprima.png",
    "tag": [
      "metodo di studio",
      "codice colori",
      "mappa",
      "ripasso"
    ],
    "data": "2026-11"
  },
  {
    "titolo": "Il Dolce Stil Novo",
    "descrizione": "Un testo di studio da sottolineare in due giri (matita e colori), con l'esempio svolto, il paragrafo da fare insieme e quello da fare da soli, e poi la mappa da completare a testo girato, solo con parole chiave.",
    "categoria": "schede",
    "discipline": [
      "italiano"
    ],
    "ordine": "Letteratura",
    "formato": "pdf",
    "file": "il-dolce-stil-novo.pdf",
    "anteprima": "il-dolce-stil-novo-anteprima.png",
    "tag": [
      "metodo di studio",
      "sottolineare",
      "codice colori",
      "mappa"
    ],
    "data": "2026-11"
  },
  {
    "titolo": "La ginnastica artistica",
    "descrizione": "Quattro schede sullo stesso tema: un testo informativo da sottolineare con i colori e trasformare in mappa, e un racconto su una ragazza alla gara di trave con le domande a colori sui paragrafi e le domande per verificare se ho capito.",
    "categoria": "schede",
    "discipline": [
      "italiano",
      "ed-fisica"
    ],
    "ordine": "Comprensione del testo",
    "formato": "pdf",
    "file": "la-ginnastica-artistica.pdf",
    "anteprima": "la-ginnastica-artistica-anteprima.png",
    "tag": [
      "comprensione",
      "sottolineare",
      "codice colori",
      "mappa",
      "compito a casa"
    ],
    "data": "2026-11"
  },
  {
    "titolo": "Il Mar Baltico",
    "descrizione": "Cinque schede per studiare un testo di geografia: sottolineo con la guida a colori, ricostruisco il testo a pagina girata, coloro e ordino le informazioni sparse da ritagliare, ricostruisco la mappa. Con le soluzioni per l'adulto.",
    "categoria": "schede",
    "discipline": [
      "geografia"
    ],
    "ordine": "I mari d'Europa",
    "formato": "pdf",
    "file": "il-mar-baltico.pdf",
    "anteprima": "il-mar-baltico-anteprima.png",
    "tag": [
      "metodo di studio",
      "codice colori",
      "mappa",
      "soluzioni"
    ],
    "data": "2026-11"
  },
  {
    "titolo": "Il Mar Nero",
    "descrizione": "Due schede per allenare la memoria visiva nello studio: leggo con la matita, coloro di giallo al massimo tre parole per paragrafo, giro la pagina e ricordo dove erano le parole, poi passo dal giallo alla mappa.",
    "categoria": "schede",
    "discipline": [
      "geografia"
    ],
    "ordine": "I mari d'Europa",
    "formato": "pdf",
    "file": "il-mar-nero.pdf",
    "anteprima": "il-mar-nero-anteprima.png",
    "tag": [
      "metodo di studio",
      "parole chiave",
      "memoria",
      "mappa"
    ],
    "data": "2026-11"
  },
  {
    "titolo": "Leggo tra le righe",
    "descrizione": "Un racconto breve di amicizia e un malinteso, con le domande a colori sui paragrafi e una scheda sulle inferenze: le risposte non sono scritte nel testo, si capiscono dagli indizi da sottolineare.",
    "categoria": "schede",
    "discipline": [
      "italiano",
      "emozioni"
    ],
    "ordine": "Comprensione del testo",
    "formato": "pdf",
    "file": "leggo-tra-le-righe.pdf",
    "anteprima": "leggo-tra-le-righe-anteprima.png",
    "tag": [
      "comprensione",
      "inferenze",
      "indizi",
      "racconto"
    ],
    "data": "2026-11"
  },
  {
    "titolo": "Il mio codice colori",
    "descrizione": "La legenda del metodo di studio con i colori (giallo, verde, azzurro, arancione, matita) con un testo per esercitarsi, e i cartoncini da ritagliare da tenere nell'astuccio o nel diario.",
    "categoria": "schede",
    "discipline": [
      "trasversale"
    ],
    "ordine": "Metodo di studio",
    "formato": "pdf",
    "file": "il-mio-codice-colori.pdf",
    "anteprima": "il-mio-codice-colori-anteprima.png",
    "tag": [
      "metodo di studio",
      "codice colori",
      "legenda",
      "da ritagliare"
    ],
    "data": "2026-11"
  },
  {
    "titolo": "L'intelligenza artificiale a scuola: quadro normativo, governance e strumenti",
    "descrizione": "La mia sintesi del corso sull'IA a scuola di Vargiu Scuola, rivista e aggiornata: AI Act e AI literacy, GDPR, legge italiana 132/2025, Linee guida AgID e MIM, ruoli nella scuola, Piano d'Istituto e Regolamento, maturità digitale, casi d'uso e rischi, Google Workspace e Microsoft 365, scelta degli strumenti di IA generativa e i documenti da predisporre.",
    "categoria": "docente",
    "discipline": [
      "trasversale",
      "tecnologia"
    ],
    "ordine": "Intelligenza artificiale",
    "formato": "pdf",
    "file": "intelligenza-artificiale-a-scuola-sintesi.pdf",
    "anteprima": "intelligenza-artificiale-a-scuola-sintesi-anteprima.png",
    "tag": [
      "intelligenza artificiale",
      "AI Act",
      "GDPR",
      "regolamento IA",
      "governance",
      "privacy"
    ],
    "data": "2026-11"
  }
]/*FINE-ELENCO*/;

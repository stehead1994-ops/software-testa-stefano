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
  }
]/*FINE-ELENCO*/;

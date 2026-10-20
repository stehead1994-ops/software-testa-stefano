/* ─────────────────────────────────────────────────────────────
   ELENCO DEI MATERIALI — sezione "Materiali" dell'Archivio
   Il modo più semplice per aggiungerne uno è lo script:
       python3 aggiungi_materiale.py ~/Downloads/nome-file.pdf
   Se preferisci a mano: copia un blocco { ... } dentro la lista,
   separandolo dagli altri con una virgola.

   Campi:
     titolo       testo della scheda
     descrizione  una o due frasi
     categoria    storie-caa | tabelle-caa | schede | docente
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
  }
]/*FINE-ELENCO*/;

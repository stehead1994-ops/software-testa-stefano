/* ─────────────────────────────────────────────────────────────
   MATERIALE IN CAA — elenco delle schede, diviso per disciplina
   Per aggiungere una scheda:
     1. metti il PDF in materiali/caa/file/ (e, se vuoi, un'immagine
        della prima pagina in materiali/caa/anteprime/)
     2. copia un blocco { ... } qui sotto e cambia i campi
   Discipline possibili: italiano, matematica, inglese, storia,
   geografia, scienze, religione, ed-civica, arte, musica, autonomie
   ───────────────────────────────────────────────────────────── */
window.CAA_DISCIPLINE = [
  {id: "italiano",   nome: "Italiano",          ico: "📖"},
  {id: "matematica", nome: "Matematica",        ico: "🔢"},
  {id: "inglese",    nome: "Inglese",           ico: "🇬🇧"},
  {id: "storia",     nome: "Storia",            ico: "⏳"},
  {id: "geografia",  nome: "Geografia",         ico: "🗺️"},
  {id: "scienze",    nome: "Scienze",           ico: "🔬"},
  {id: "religione",  nome: "Religione",         ico: "🕊️"},
  {id: "ed-civica",  nome: "Educazione civica", ico: "🏛️"},
  {id: "arte",       nome: "Arte e immagine",   ico: "🎨"},
  {id: "musica",     nome: "Musica",            ico: "🎵"},
  {id: "autonomie",  nome: "Autonomie",         ico: "🧺"}
];

window.CAA_SCHEDE = [
  {
    "disciplina": "matematica",
    "argomento": "I numeri fino a 15",
    "titolo": "Numeri fino a 15",
    "descrizione": "Contare, collegare quantità e numero, colorare la quantità, linea dei numeri, prima e dopo, maggiore e minore.",
    "file": "numeri-fino-a-15-caa.pdf",
    "anteprima": "numeri-fino-a-15.jpg",
    "pagine": 12,
    "livello": "Primo livello"
  },
  {
    "disciplina": "matematica",
    "argomento": "I numeri fino a 15",
    "titolo": "Numeri 1-15: quantità e confronti",
    "descrizione": "Conta e scegli, di più o di meno, uguale o diverso, decina e unità, metti in ordine, le colonne dei numeri.",
    "file": "numeri-1-15-quantita-e-confronti-caa.pdf",
    "anteprima": "numeri-1-15-quantita-e-confronti.jpg",
    "pagine": 12,
    "livello": "Secondo livello"
  },
  {
    "disciplina": "inglese",
    "argomento": "Colors, numbers, food, school objects",
    "titolo": "English worksheets",
    "descrizione": "Schede in inglese con consegne anche in italiano: i colori, i numeri da 1 a 9, il cibo (I like… I don't like…), gli oggetti della scuola.",
    "file": "english-worksheets-caa.pdf",
    "anteprima": "english-worksheets.jpg",
    "pagine": 26
  },
  {
    "disciplina": "storia",
    "argomento": "Il tempo",
    "titolo": "Prima, adesso, dopo",
    "descrizione": "La successione temporale con situazioni di tutti i giorni: che cosa viene prima e dopo, collega, ritaglia e incolla in ordine.",
    "file": "prima-adesso-dopo-caa.pdf",
    "anteprima": "prima-adesso-dopo.jpg",
    "pagine": 10
  },
  {
    "disciplina": "geografia",
    "argomento": "Lo spazio e i luoghi",
    "titolo": "Concetti topologici e luoghi",
    "descrizione": "In mezzo, tra, accanto, intorno, destra e sinistra, linee aperte e chiuse, il recinto, spazi aperti e chiusi, i luoghi del mio paese.",
    "file": "concetti-topologici-e-luoghi-caa.pdf",
    "anteprima": "concetti-topologici-e-luoghi.jpg",
    "pagine": 12
  },
  {
    "disciplina": "religione",
    "argomento": "San Francesco e il Cantico delle Creature",
    "titolo": "Il Cantico delle Creature, testo completo",
    "descrizione": "Il Cantico intero in simboli, strofa per strofa.",
    "file": "cantico-delle-creature-completo-caa.pdf",
    "anteprima": "cantico-delle-creature-completo.jpg",
    "pagine": 4,
    "livello": "Versione completa"
  },
  {
    "disciplina": "religione",
    "argomento": "San Francesco e il Cantico delle Creature",
    "titolo": "Il Cantico delle Creature, versione semplificata",
    "descrizione": "Il Cantico in frasi brevi: Francesco dice grazie per il sole, la luna e le stelle, il vento, l'acqua, il fuoco, la terra.",
    "file": "cantico-delle-creature-semplificato-caa.pdf",
    "anteprima": "cantico-delle-creature-semplificato.jpg",
    "pagine": 2,
    "livello": "Versione semplificata"
  },
  {
    "disciplina": "religione",
    "argomento": "San Francesco e il Cantico delle Creature",
    "titolo": "San Francesco: schede di lavoro",
    "descrizione": "Copertina da colorare, il Cantico da ricomporre con ritaglia e incolla, le tessere delle creature.",
    "file": "san-francesco-schede-caa.pdf",
    "anteprima": "san-francesco-schede.jpg",
    "pagine": 3
  },
  {
    "disciplina": "religione",
    "argomento": "Mosè",
    "titolo": "Mosè e il viaggio del popolo",
    "descrizione": "La storia di Mosè in sequenze illustrate, le regole di Dio ed esercizi: collega immagine e parola, cerchia la risposta, metti in ordine la storia.",
    "file": "mose-storia-ed-esercizi-caa.pdf",
    "anteprima": "mose-storia-ed-esercizi.jpg",
    "pagine": 7
  },
  {
    "disciplina": "ed-civica",
    "argomento": "La Costituzione",
    "titolo": "La Costituzione: articoli 1-12",
    "descrizione": "I principi fondamentali in simboli, un articolo per pagina, con un esempio «in classe» per ciascuno e il riepilogo dei 12 articoli.",
    "file": "costituzione-articoli-1-12-caa.pdf",
    "anteprima": "costituzione-articoli-1-12.jpg",
    "pagine": 14
  },
  {
    "disciplina": "italiano",
    "argomento": "Fiabe e favole in CAA",
    "titolo": "I tre porcellini",
    "descrizione": "La fiaba dei tre porcellini in frasi brevi e simboli: le tre case di paglia, legno e mattoni, il lupo che soffia e le domande di comprensione.",
    "file": "tre-porcellini-caa.pdf",
    "anteprima": "tre-porcellini.jpg",
    "pagine": 16
  },
  {
    "disciplina": "italiano",
    "argomento": "Fiabe e favole in CAA",
    "titolo": "Riccioli d'oro e i tre orsi",
    "descrizione": "Riccioli d'oro entra nella casa dei tre orsi: tre ciotole, tre sedie, tre letti. Grande, medio e piccolo in simboli, con le domande finali.",
    "file": "riccioli-doro-caa.pdf",
    "anteprima": "riccioli-doro.jpg",
    "pagine": 18
  },
  {
    "disciplina": "italiano",
    "argomento": "Fiabe e favole in CAA",
    "titolo": "Il leone e il topolino",
    "descrizione": "La favola di Esopo raccontata in simboli: il topolino che il leone lascia andare torna ad aiutarlo. Anche i piccoli possono aiutare i grandi.",
    "file": "leone-e-topolino-caa.pdf",
    "anteprima": "leone-e-topolino.jpg",
    "pagine": 16
  },
  {
    "disciplina": "italiano",
    "argomento": "Fiabe e favole in CAA",
    "titolo": "La cicala e la formica",
    "descrizione": "La favola della cicala e della formica in simboli, con le stagioni che passano e un finale gentile: la formica aiuta la cicala e l'anno dopo lavorano insieme.",
    "file": "cicala-e-formica-caa.pdf",
    "anteprima": "cicala-e-formica.jpg",
    "pagine": 16
  },
  {
    "disciplina": "italiano",
    "argomento": "Fiabe e favole in CAA",
    "titolo": "Il lupo e il cane",
    "descrizione": "La favola di Esopo in simboli: il lupo affamato incontra il cane ben nutrito, ma quando vede il collare sceglie di restare libero.",
    "file": "lupo-e-cane-caa.pdf",
    "anteprima": "lupo-e-cane.jpg",
    "pagine": 16
  },
  {
    "disciplina": "italiano",
    "argomento": "Filastrocche e canzoni in CAA",
    "titolo": "Giro giro tondo",
    "descrizione": "La filastrocca popolare in simboli, un verso per pagina, con la pagina finale che la raccoglie tutta: da cantare facendo il girotondo.",
    "file": "giro-giro-tondo-caa.pdf",
    "anteprima": "giro-giro-tondo.jpg",
    "pagine": 7
  },
  {
    "disciplina": "italiano",
    "argomento": "Filastrocche e canzoni in CAA",
    "titolo": "Cinque scimmiette",
    "descrizione": "La filastrocca delle scimmiette che saltano sul letto, in una versione in simboli: si conta all'indietro da cinque a zero e si ripete la frase del dottore.",
    "file": "cinque-scimmiette-caa.pdf",
    "anteprima": "cinque-scimmiette.jpg",
    "pagine": 13
  },
  {
    "disciplina": "italiano",
    "argomento": "Filastrocche e canzoni in CAA",
    "titolo": "Se sei felice",
    "descrizione": "La canzone dei gesti in simboli: battere le mani, battere i piedi, saltare, salutare, abbracciare un amico. Ogni strofa un gesto da fare insieme.",
    "file": "se-sei-felice-caa.pdf",
    "anteprima": "se-sei-felice.jpg",
    "pagine": 9
  },
  {
    "disciplina": "italiano",
    "argomento": "Filastrocche e canzoni in CAA",
    "titolo": "Whisky il ragnetto",
    "descrizione": "La filastrocca del ragnetto che sale sulla grondaia, viene portato giù dalla pioggia e risale quando torna il sole. Da cantare con i gesti.",
    "file": "whisky-il-ragnetto-caa.pdf",
    "anteprima": "whisky-il-ragnetto.jpg",
    "pagine": 10
  },
  {
    "disciplina": "scienze",
    "argomento": "Le stagioni",
    "titolo": "Le stagioni",
    "descrizione": "Le quattro stagioni in simboli: che cosa succede in natura, che cosa facciamo, come ci vestiamo. Con le domande finali.",
    "file": "le-stagioni-caa.pdf",
    "anteprima": "le-stagioni.jpg",
    "pagine": 13
  },
  {
    "disciplina": "scienze",
    "argomento": "Il tempo atmosferico",
    "titolo": "Che tempo fa?",
    "descrizione": "Sole, nuvole, pioggia, neve, vento, temporale, nebbia e arcobaleno in simboli, con che cosa usiamo quando cambia il tempo. Utile anche per il calendario del mattino.",
    "file": "il-tempo-atmosferico-caa.pdf",
    "anteprima": "il-tempo-atmosferico.jpg",
    "pagine": 12
  },
  {
    "disciplina": "scienze",
    "argomento": "I cinque sensi",
    "titolo": "I cinque sensi",
    "descrizione": "Vista, udito, olfatto, gusto e tatto in simboli: quale parte del corpo usiamo e che cosa scopriamo con ciascun senso. Con le domande finali.",
    "file": "i-cinque-sensi-caa.pdf",
    "anteprima": "i-cinque-sensi.jpg",
    "pagine": 14
  },
  {
    "disciplina": "italiano",
    "argomento": "Le vocali",
    "titolo": "Le vocali",
    "descrizione": "Le cinque vocali in maiuscolo, ciascuna con parole in simboli che iniziano con quella lettera, e un esercizio finale: con quale vocale inizia la parola?",
    "file": "le-vocali-caa.pdf",
    "anteprima": "le-vocali.jpg",
    "pagine": 8
  },
  {
    "disciplina": "arte",
    "argomento": "I colori",
    "titolo": "I colori",
    "descrizione": "Dieci colori in simboli, ciascuno con una cosa di tutti i giorni: la fragola rossa, il sole giallo, il mare blu, l'erba verde e gli altri. Con le domande finali.",
    "file": "i-colori-caa.pdf",
    "anteprima": "i-colori.jpg",
    "pagine": 13
  }
];

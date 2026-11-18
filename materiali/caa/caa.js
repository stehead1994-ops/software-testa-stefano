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
  },
  {
    "disciplina": "scienze",
    "argomento": "Il corpo umano",
    "titolo": "Il corpo umano",
    "descrizione": "Le parti del corpo in simboli, dalla testa ai piedi: capelli, faccia, collo, pancia, braccia, mani, gambe. Con le domande finali.",
    "file": "il-corpo-umano-caa.pdf",
    "anteprima": "il-corpo-umano.jpg",
    "pagine": 14
  },
  {
    "disciplina": "matematica",
    "argomento": "Le forme geometriche",
    "titolo": "Le forme",
    "descrizione": "Cerchio, quadrato, triangolo e rettangolo in simboli, con il numero dei lati e una cosa di tutti i giorni per ogni forma. Con le domande finali.",
    "file": "le-forme-caa.pdf",
    "anteprima": "le-forme.jpg",
    "pagine": 11
  },
  {
    "disciplina": "ed-civica",
    "argomento": "I mestieri",
    "titolo": "I mestieri",
    "descrizione": "Dieci mestieri in simboli, ciascuno con quello che fa: il medico cura, il pompiere spegne il fuoco, il panettiere fa il pane. Con le domande finali.",
    "file": "i-mestieri-caa.pdf",
    "anteprima": "i-mestieri.jpg",
    "pagine": 13
  },
  {
    "disciplina": "autonomie",
    "argomento": "I negozi",
    "titolo": "I negozi",
    "descrizione": "Dove compro che cosa: panetteria, macelleria, fruttivendolo, pescheria, farmacia, cartoleria e supermercato in simboli, fino alla cassa. Con le domande finali.",
    "file": "i-negozi-caa.pdf",
    "anteprima": "i-negozi.jpg",
    "pagine": 11
  },
  {
    "disciplina": "ed-civica",
    "argomento": "La raccolta differenziata",
    "titolo": "La raccolta differenziata",
    "descrizione": "Come si separano i rifiuti, in simboli: carta, plastica, vetro, umido e indifferenziato, ciascuno nel suo bidone. Con le domande finali per esercitarsi.",
    "file": "raccolta-differenziata-caa.pdf",
    "anteprima": "raccolta-differenziata.jpg",
    "pagine": 10
  },
  {
    "disciplina": "ed-civica",
    "argomento": "Educazione stradale",
    "titolo": "Per strada",
    "descrizione": "Educazione stradale in simboli: il semaforo, le strisce pedonali, guardare a destra e a sinistra, la mano all'adulto, la cintura e il casco. Con le domande finali.",
    "file": "segnali-stradali-caa.pdf",
    "anteprima": "segnali-stradali.jpg",
    "pagine": 12
  },
  {
    "disciplina": "emozioni",
    "argomento": "Le emozioni e la gentilezza",
    "titolo": "Le emozioni e la gentilezza",
    "descrizione": "Felice, triste, arrabbiato, paura e sorpresa in situazioni di tutti i giorni, che cosa posso fare quando sono arrabbiato e le parole gentili: per favore, grazie, scusa, aspetto il mio turno.",
    "file": "emozioni-e-gentilezza-caa.pdf",
    "anteprima": "emozioni-e-gentilezza.jpg",
    "pagine": 15
  },
  {
    "disciplina": "storia",
    "argomento": "Il tempo",
    "titolo": "I giorni della settimana",
    "descrizione": "I sette giorni della settimana in simboli, i giorni di scuola e di festa, ieri oggi e domani, e due pagine da completare ogni mattina: oggi è…, domani sarà…",
    "file": "giorni-della-settimana-caa.pdf",
    "anteprima": "giorni-della-settimana.jpg",
    "pagine": 11
  },
  {
    "disciplina": "geografia",
    "argomento": "Lo spazio e i luoghi",
    "titolo": "Sopra, sotto, dentro, fuori",
    "descrizione": "I concetti spaziali in simboli con oggetti e animali di tutti i giorni: sopra e sotto, dentro e fuori, davanti e dietro, vicino e lontano, in mezzo. Con le domande finali.",
    "file": "sopra-sotto-dentro-fuori-caa.pdf",
    "anteprima": "sopra-sotto-dentro-fuori.jpg",
    "pagine": 12
  },
  {
    "disciplina": "autonomie",
    "argomento": "La casa",
    "titolo": "La casa",
    "descrizione": "Le stanze della casa e che cosa ci facciamo, in simboli: cucina, soggiorno, camera, bagno e giardino. Con le domande finali.",
    "file": "la-casa-caa.pdf",
    "anteprima": "la-casa.jpg",
    "pagine": 11
  },
  {
    "disciplina": "italiano",
    "argomento": "Le sillabe",
    "titolo": "Le sillabe: fusione, inversione e riordino",
    "descrizione": "Dieci schede di letto-scrittura con simboli e sillabe a colori: unire le sillabe, completare le parole bisillabe, mettere in ordine e ritagliare, scambiare le sillabe per creare parole nuove e riconoscere la sillaba uguale.",
    "file": "sillabe-fusione-inversione-riordino-caa.pdf",
    "anteprima": "sillabe-fusione-inversione-riordino.jpg",
    "pagine": 10
  },
  {
    "disciplina": "religione",
    "argomento": "La Pasqua",
    "titolo": "La Pasqua ebraica e la Pasqua cristiana",
    "descrizione": "Otto schede in simboli: la storia della Pasqua ebraica da riordinare, i cibi della cena e il loro significato, il confronto tra Pasqua ebraica e cristiana, vero o falso e le parole della Pasqua da completare.",
    "file": "pasqua-ebraica-e-cristiana-caa.pdf",
    "anteprima": "pasqua-ebraica-e-cristiana.jpg",
    "pagine": 8
  },
  {
    "disciplina": "matematica",
    "argomento": "Classificare",
    "titolo": "Le categorie",
    "descrizione": "Mettere insieme le cose che si somigliano: animali, frutta, vestiti, mezzi di trasporto, oggetti della scuola e cibo, in simboli. Con le domande finali per classificare.",
    "file": "le-categorie-caa.pdf",
    "anteprima": "le-categorie.jpg",
    "pagine": 9
  },
  {
    "disciplina": "scienze",
    "argomento": "Viventi e non viventi",
    "titolo": "Viventi e non viventi",
    "descrizione": "Che cosa vuol dire essere vivente, in simboli: nascere, crescere, mangiare, respirare. Persone, animali e piante a confronto con la sedia, il tavolo e la palla. Con le domande finali.",
    "file": "viventi-e-non-viventi-caa.pdf",
    "anteprima": "viventi-e-non-viventi.jpg",
    "pagine": 12
  },
  {
    "disciplina": "autonomie",
    "argomento": "Chi sono",
    "titolo": "Chi sono",
    "descrizione": "Le pagine per presentarsi in simboli, da completare con l'alunno: nome, età, dove abito, la famiglia, la scuola, le cose che piacciono e quelle che non piacciono, e uno spazio per il ritratto.",
    "file": "chi-sono-caa.pdf",
    "anteprima": "chi-sono.jpg",
    "pagine": 13
  },
  {
    "disciplina": "italiano",
    "argomento": "Feste e ricorrenze",
    "titolo": "La festa del papà",
    "descrizione": "La festa del papà del 19 marzo in simboli: che cosa faccio con il papà, il regalo, gli auguri e l'abbraccio. Con una pagina per festeggiare anche il nonno o chi si prende cura di me.",
    "file": "festa-del-papa-caa.pdf",
    "anteprima": "festa-del-papa.jpg",
    "pagine": 13
  },
  {
    "disciplina": "italiano",
    "argomento": "Feste e ricorrenze",
    "titolo": "Carnevale",
    "descrizione": "Il carnevale in simboli: le maschere e i travestimenti, coriandoli e stelle filanti, chiacchiere e frittelle. Con una pagina per chi ha bisogno di cuffie quando il rumore è troppo forte.",
    "file": "carnevale-caa.pdf",
    "anteprima": "carnevale.jpg",
    "pagine": 11
  },
  {
    "disciplina": "autonomie",
    "argomento": "Storie sociali",
    "titolo": "Andiamo in biblioteca",
    "descrizione": "Storia sociale in simboli per preparare l'uscita in biblioteca con la classe: la fila, la strada, il silenzio, scegliere un libro e riportarlo. Con le domande finali.",
    "file": "andiamo-in-biblioteca-caa.pdf",
    "anteprima": "andiamo-in-biblioteca.jpg",
    "pagine": 14
  },
  {
    "disciplina": "ed-civica",
    "argomento": "La sicurezza a scuola",
    "titolo": "La prova di evacuazione",
    "descrizione": "Storia sociale in simboli su che cosa si fa quando suona l'allarme a scuola: lasciare le cose, mettersi in fila, uscire con calma dietro alla maestra e aspettare al punto di raccolta. Utile prima delle prove.",
    "file": "prova-di-evacuazione-caa.pdf",
    "anteprima": "prova-di-evacuazione.jpg",
    "pagine": 15
  },
  {
    "disciplina": "autonomie",
    "argomento": "Storie sociali",
    "titolo": "L'ora della mensa",
    "descrizione": "Storia sociale in simboli sul pranzo a scuola: lavare le mani, sedersi al proprio posto, assaggiare, chiedere ancora o dire basta, parlare a voce bassa. Con le domande finali.",
    "file": "l-ora-della-mensa-caa.pdf",
    "anteprima": "l-ora-della-mensa.jpg",
    "pagine": 14
  },
  {
    "disciplina": "autonomie",
    "argomento": "Storie sociali",
    "titolo": "Mi soffio il naso",
    "descrizione": "Storia sociale in simboli per imparare a soffiarsi il naso: perché si fa, il fazzoletto, soffiare piano, buttarlo nel cestino e lavare le mani.",
    "file": "soffiarsi-il-naso-caa.pdf",
    "anteprima": "soffiarsi-il-naso.jpg",
    "pagine": 13
  },
  {
    "disciplina": "emozioni",
    "argomento": "Storie sociali",
    "titolo": "La voce giusta",
    "descrizione": "Storia sociale in simboli sul volume della voce: quando si parla piano, quando si può alzare la voce e che cosa fare quando ci si arrabbia. Con le domande finali.",
    "file": "la-voce-giusta-caa.pdf",
    "anteprima": "la-voce-giusta.jpg",
    "pagine": 13
  },
  {
    "disciplina": "autonomie",
    "argomento": "Storie sociali",
    "titolo": "Al parco giochi",
    "descrizione": "Storia sociale in simboli sul parco giochi: quando si va, stare vicino all'adulto, aspettare il turno sull'altalena e sullo scivolo, giocare con gli altri e tornare a casa.",
    "file": "al-parco-giochi-caa.pdf",
    "anteprima": "al-parco-giochi.jpg",
    "pagine": 13
  },
  {
    "disciplina": "autonomie",
    "argomento": "Storie sociali",
    "titolo": "Vado dal dottore",
    "descrizione": "Storia sociale in simboli per preparare la visita dal pediatra: la sala d'attesa, il lettino, lo stetoscopio, la gola e le orecchie, la bilancia, e alla fine si torna a casa.",
    "file": "vado-dal-dottore-caa.pdf",
    "anteprima": "vado-dal-dottore.jpg",
    "pagine": 14
  },
  {
    "disciplina": "autonomie",
    "argomento": "Storie sociali",
    "titolo": "Vado dal dentista",
    "descrizione": "Storia sociale in simboli per preparare la visita dal dentista: la poltrona, la luce, lo specchietto, aprire la bocca, contare i denti, e come lavarli bene ogni giorno.",
    "file": "vado-dal-dentista-caa.pdf",
    "anteprima": "vado-dal-dentista.jpg",
    "pagine": 15
  },
  {
    "disciplina": "italiano",
    "argomento": "Fiabe e favole in CAA",
    "titolo": "Cappuccetto Rosso",
    "descrizione": "La fiaba di Cappuccetto Rosso raccontata in simboli con un testo nuovo e semplice: il cestino per la nonna, il lupo nel bosco, il cacciatore. Con le domande di comprensione.",
    "file": "cappuccetto-rosso-caa.pdf",
    "anteprima": "cappuccetto-rosso.jpg",
    "pagine": 16
  },
  {
    "disciplina": "italiano",
    "argomento": "Fiabe e favole in CAA",
    "titolo": "I musicanti di Brema",
    "descrizione": "La fiaba dei musicanti di Brema in simboli, con un testo nuovo: l'asino, il cane, il gatto e il gallo diventano amici, cantano insieme e trovano una casa. Con le domande di comprensione.",
    "file": "musicanti-di-brema-caa.pdf",
    "anteprima": "musicanti-di-brema.jpg",
    "pagine": 15
  },
  {
    "disciplina": "italiano",
    "argomento": "Fiabe e favole in CAA",
    "titolo": "La bella addormentata",
    "descrizione": "La fiaba della bella addormentata in simboli, con un testo nuovo: la festa, il dono della fata, il fuso, il lungo sonno nel castello e il risveglio. Con le domande di comprensione.",
    "file": "bella-addormentata-caa.pdf",
    "anteprima": "bella-addormentata.jpg",
    "pagine": 16
  },
  {
    "disciplina": "italiano",
    "argomento": "Fiabe e favole in CAA",
    "titolo": "La volpe e la cicogna",
    "descrizione": "La favola di Esopo della volpe e della cicogna in simboli, con un testo nuovo: due inviti a cena, un piatto piatto e un vaso lungo, e la morale. Con le domande di comprensione.",
    "file": "volpe-e-cicogna-caa.pdf",
    "anteprima": "volpe-e-cicogna.jpg",
    "pagine": 15
  },
  {
    "disciplina": "italiano",
    "argomento": "Fiabe e favole in CAA",
    "titolo": "Il lupo e i sette capretti",
    "descrizione": "La fiaba dei fratelli Grimm del lupo e dei sette capretti in simboli, con un testo nuovo: la mamma capra esce, il lupo bussa, il capretto nascosto nell'orologio aiuta a salvare i fratelli. Con le domande di comprensione.",
    "file": "lupo-e-sette-capretti-caa.pdf",
    "anteprima": "lupo-e-sette-capretti.jpg",
    "pagine": 16
  },
  {
    "disciplina": "italiano",
    "argomento": "Fiabe e favole in CAA",
    "titolo": "I giorni della merla",
    "descrizione": "La leggenda dei giorni della merla in simboli, con un testo nuovo: la merla bianca, gennaio dispettoso, il comignolo caldo e le piume diventate nere. Gli ultimi giorni di gennaio sono i più freddi dell'anno.",
    "file": "giorni-della-merla-caa.pdf",
    "anteprima": "giorni-della-merla.jpg",
    "pagine": 16
  },
  {
    "disciplina": "italiano",
    "argomento": "Fiabe e favole in CAA",
    "titolo": "Pinocchio",
    "descrizione": "La storia di Pinocchio, dal romanzo di Collodi, raccontata in simboli con un testo nuovo: Geppetto, il burattino di legno, le bugie e il naso lungo, la balena e il ritorno a casa. Con le domande di comprensione.",
    "file": "pinocchio-caa.pdf",
    "anteprima": "pinocchio.jpg",
    "pagine": 17
  },
  {
    "disciplina": "italiano",
    "argomento": "Fiabe e favole in CAA",
    "titolo": "Alice nel paese delle meraviglie",
    "descrizione": "Alice nel paese delle meraviglie, dal libro di Lewis Carroll, in simboli con un testo nuovo: il coniglio bianco con l'orologio, la buca, la bottiglia e il dolce, il tè e la regina di cuori. Con le domande di comprensione.",
    "file": "alice-nel-paese-delle-meraviglie-caa.pdf",
    "anteprima": "alice-nel-paese-delle-meraviglie.jpg",
    "pagine": 16
  },
  {
    "disciplina": "italiano",
    "argomento": "Fiabe e favole in CAA",
    "titolo": "Il libro della giungla",
    "descrizione": "La storia di Mowgli, dai racconti di Rudyard Kipling, in simboli con un testo nuovo: il bambino cresciuto dai lupi, l'orso Baloo, la pantera Bagheera, la tigre Shere Khan e il fuoco. Con le domande di comprensione.",
    "file": "il-libro-della-giungla-caa.pdf",
    "anteprima": "il-libro-della-giungla.jpg",
    "pagine": 16
  },
  {
    "disciplina": "italiano",
    "argomento": "Feste e ricorrenze",
    "titolo": "Il Natale",
    "descrizione": "Il Natale in simboli: dicembre, l'albero e il presepe, la lettera a Babbo Natale, la slitta e le renne, i regali sotto l'albero e la festa in famiglia. Con le domande finali.",
    "file": "il-natale-caa.pdf",
    "anteprima": "il-natale.jpg",
    "pagine": 15
  },
  {
    "disciplina": "storia",
    "argomento": "Feste e ricorrenze",
    "titolo": "Il Giorno della Memoria",
    "descrizione": "Il Giorno della Memoria spiegato in simboli con parole semplici e rispettose: il 27 gennaio ricordiamo le persone perseguitate durante la guerra, diciamo no all'odio e diamo valore alla pace e ai diritti di tutti.",
    "file": "giorno-della-memoria-caa.pdf",
    "anteprima": "giorno-della-memoria.jpg",
    "pagine": 14
  },
  {
    "disciplina": "scienze",
    "argomento": "Gli animali",
    "titolo": "Dove vivono gli animali?",
    "descrizione": "Gli ambienti degli animali in simboli: il mare, il bosco, la fattoria, la savana, il polo e la casa. Con le domande finali per abbinare ogni animale al suo ambiente.",
    "file": "dove-vivono-gli-animali-caa.pdf",
    "anteprima": "dove-vivono-gli-animali.jpg",
    "pagine": 10
  },
  {
    "disciplina": "tecnologia",
    "argomento": "Il computer",
    "titolo": "Il computer",
    "descrizione": "Il computer in simboli: le parti (schermo, tastiera, mouse), che cosa ci possiamo fare, come si accende e si spegne, e le regole per usarlo bene. Con le domande finali.",
    "file": "il-computer-caa.pdf",
    "anteprima": "il-computer.jpg",
    "pagine": 13
  },
  {
    "disciplina": "scienze",
    "argomento": "Gli animali",
    "titolo": "I dinosauri",
    "descrizione": "I dinosauri in simboli: quando vivevano, le uova, chi mangiava le piante e chi la carne, i dinosauri grandi e piccoli, i fossili e il museo. Con le domande finali.",
    "file": "i-dinosauri-caa.pdf",
    "anteprima": "i-dinosauri.jpg",
    "pagine": 13
  },
  {
    "disciplina": "autonomie",
    "argomento": "Vestirsi",
    "titolo": "Come mi vesto?",
    "descrizione": "Vestirsi in simboli: che cosa metto quando fa caldo, quando fa freddo e quando piove, e l'ordine giusto per vestirsi la mattina. Con le domande finali.",
    "file": "come-mi-vesto-caa.pdf",
    "anteprima": "come-mi-vesto.jpg",
    "pagine": 11
  },
  {
    "disciplina": "arte",
    "argomento": "I colori",
    "titolo": "Memory: la frutta e i colori",
    "descrizione": "Un memory da ritagliare in simboli: ogni frutto va in coppia con il suo colore. Con le istruzioni del gioco in simboli e la tabella delle soluzioni.",
    "file": "memory-frutta-e-colori-caa.pdf",
    "anteprima": "memory-frutta-e-colori.jpg",
    "pagine": 4
  },
  {
    "disciplina": "emozioni",
    "argomento": "Le emozioni e la gentilezza",
    "titolo": "Il dado delle emozioni",
    "descrizione": "Un dado da ritagliare e costruire con sei emozioni in simboli, le istruzioni del gioco e le carte \"Mi sento… quando…\" da completare a voce o per iscritto.",
    "file": "dado-delle-emozioni-caa.pdf",
    "anteprima": "dado-delle-emozioni.jpg",
    "pagine": 4
  },
  {
    "disciplina": "autonomie",
    "argomento": "La scuola",
    "titolo": "Il gioco della scuola",
    "descrizione": "Un gioco dell'oca in simboli per il rientro a scuola: 24 caselle con gli oggetti e i momenti della giornata, caselle speciali per andare avanti, tornare indietro o stare fermi, e le istruzioni in simboli.",
    "file": "gioco-della-scuola-caa.pdf",
    "anteprima": "gioco-della-scuola.jpg",
    "pagine": 3
  }
];

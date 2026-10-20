#!/usr/bin/env python3
"""Aggiunge un materiale alla sezione Materiali dell'Archivio.

Uso (dalla cartella del repo):
    python3 aggiungi_materiale.py ~/Downloads/mia-storia.pdf   ← con un file
    python3 aggiungi_materiale.py                              ← per un link (video, pagina)

Lo script fa qualche domanda, copia il file in materiali/file/,
crea l'anteprima dei PDF (sul Mac), aggiorna materiali/materiali.js
e alla fine ti chiede se pubblicare subito su GitHub."""
import json, os, re, shutil, subprocess, sys, unicodedata
from datetime import date

ROOT = os.path.dirname(os.path.abspath(__file__))
DIR = os.path.join(ROOT, "materiali")
JS = os.path.join(DIR, "materiali.js")
FILES = os.path.join(DIR, "file")

CATEGORIE = [("storie-caa", "Storie in CAA"), ("tabelle-caa", "Tabelle e simboli CAA"),
             ("schede", "Schede e attività"),
             ("docente", "Strumenti per il docente"),
             ("collaborazioni", "Con altre creator (post condivisi)")]
DISCIPLINE = [("italiano", "Italiano"), ("matematica", "Matematica"), ("scienze", "Scienze"),
              ("storia", "Storia"), ("geografia", "Geografia"), ("inglese", "Inglese"),
              ("arte", "Arte e immagine"), ("musica", "Musica"), ("ed-fisica", "Educazione fisica"),
              ("tecnologia", "Tecnologia"), ("ed-civica", "Educazione civica"),
              ("autonomie", "Autonomie e vita quotidiana"), ("emozioni", "Emozioni e relazioni"),
              ("trasversale", "Trasversale")]
FORMATI = {".pdf": "pdf", ".ppt": "presentazione", ".pptx": "presentazione", ".key": "presentazione",
           ".doc": "doc", ".docx": "doc", ".odt": "doc", ".zip": "zip", ".mp4": "video",
           ".html": "pagina"}

def chiedi(domanda, obbligatoria=True):
    while True:
        r = input(domanda).strip()
        if r or not obbligatoria: return r
        print("  (serve una risposta)")

def scegli(titolo, voci, multipla=False):
    print("\n" + titolo)
    for i, (_, nome) in enumerate(voci, 1): print(f"  {i:>2}. {nome}")
    while True:
        r = input("  Numero" + (" (anche più di uno, es. 1 4)" if multipla else "") + ": ")
        try:
            n = [int(x) for x in re.split(r"[ ,]+", r.strip()) if x]
            if n and all(1 <= x <= len(voci) for x in n) and (multipla or len(n) == 1):
                sel = [voci[x - 1][0] for x in dict.fromkeys(n)]
                return sel if multipla else sel[0]
        except ValueError: pass
        print("  Numero non valido, riprova.")

def chiedi_crediti():
    print("\nCreator con cui hai realizzato il PDF.")
    print("  Scrivi nome e handle, es.  Maria Rossi @mariarossi   (Invio vuoto per finire)")
    out = []
    while True:
        r = input("  Creator: ").strip()
        if not r: break
        m = re.search(r"@?([A-Za-z0-9._]{2,30})\s*$", r) if "@" in r else None
        if m and "@" in r:
            handle = "@" + r[r.rindex("@") + 1:].strip().split()[0]
            nome = r[:r.rindex("@")].strip() or handle
            out.append({"nome": nome, "handle": handle})
        else:
            out.append({"nome": r})
    return out

def slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-") or "materiale"

def leggi_elenco():
    s = open(JS, encoding="utf-8").read()
    m = re.search(r"/\*INIZIO-ELENCO\*/(.*)/\*FINE-ELENCO\*/", s, re.S)
    if not m: sys.exit("Non trovo i segni INIZIO-ELENCO / FINE-ELENCO in materiali.js")
    return s, m, json.loads(m.group(1))

def main():
    if not os.path.isfile(JS):
        sys.exit("Non trovo materiali/materiali.js: lancia lo script dalla cartella del repo.")
    os.makedirs(FILES, exist_ok=True)
    sorgente = os.path.expanduser(sys.argv[1]) if len(sys.argv) > 1 else ""
    if sorgente and not os.path.isfile(sorgente): sys.exit(f"File non trovato: {sorgente}")

    print("\n— Nuovo materiale per la sezione Materiali —")
    voce = {}
    voce["titolo"] = chiedi("\nTitolo: ")
    voce["descrizione"] = chiedi("Descrizione (una o due frasi): ")
    voce["categoria"] = scegli("Categoria:", CATEGORIE)
    voce["discipline"] = scegli("Disciplina:", DISCIPLINE, multipla=True)
    if voce["categoria"] == "collaborazioni":
        cr = chiedi_crediti()
        if cr: voce["crediti"] = cr
        orig = chiedi("Link al post su Instagram (Invio per saltare): ", False)
        if orig: voce["originale"] = orig
    o = chiedi("\nOrdine o classe (es. Primaria · classe 1ª — Invio per saltare): ", False)
    if o: voce["ordine"] = o

    if sorgente:
        est = os.path.splitext(sorgente)[1].lower()
        nome = slug(voce["titolo"]) + est
        dest = os.path.join(FILES, nome)
        if os.path.exists(dest) and input(f"\nEsiste già file/{nome}. Lo sostituisco? (s/n) ").lower() != "s":
            sys.exit("Annullato, non ho cambiato niente.")
        shutil.copy2(sorgente, dest)
        voce["formato"] = FORMATI.get(est, "doc")
        voce["file"] = nome
        mb = os.path.getsize(dest) / 1e6
        print(f"\n✓ Copiato in materiali/file/{nome} ({mb:.1f} MB)")
        if mb > 50: print("  ⚠ GitHub accetta file fino a 100 MB, ma sopra i 50 MB conviene alleggerirlo.")
        if est == ".pdf" and shutil.which("qlmanage"):
            try:
                subprocess.run(["qlmanage", "-t", "-s", "900", "-o", FILES, dest],
                               capture_output=True, timeout=60)
                png = dest + ".png"
                if os.path.exists(png):
                    finale = os.path.join(FILES, slug(voce["titolo"]) + "-anteprima.png")
                    os.replace(png, finale)
                    voce["anteprima"] = os.path.basename(finale)
                    print("✓ Anteprima creata dalla prima pagina")
            except Exception: pass
    else:
        voce["link"] = chiedi("\nIndirizzo del materiale (YouTube, Drive, pagina…): ")
        voce["formato"] = "video" if re.search(r"youtu|vimeo", voce["link"]) else "pagina"

    t = chiedi("Parole chiave separate da virgola (Invio per saltare): ", False)
    if t: voce["tag"] = [x.strip() for x in t.split(",") if x.strip()]
    voce["data"] = date.today().strftime("%Y-%m")

    s, m, elenco = leggi_elenco()
    elenco.append(voce)
    nuovo = json.dumps(elenco, ensure_ascii=False, indent=2)
    s = s[:m.start(1)] + nuovo + s[m.end(1):]
    open(JS, "w", encoding="utf-8").write(s)
    print(f"✓ Aggiunto all'elenco: ora i materiali sono {len(elenco)}")

    if input("\nPubblico subito su GitHub? (s/n) ").lower() == "s":
        os.chdir(ROOT)
        subprocess.run(["git", "add", "materiali"], check=True)
        subprocess.run(["git", "commit", "-m", f"Materiali: {voce['titolo']}"], check=True)
        subprocess.run(["git", "push", "origin", "main"], check=True)
        print("✓ Pubblicato. Online tra un paio di minuti.")
    else:
        print("Quando vuoi:  git add materiali && git commit -m \"Nuovi materiali\" && git push origin main")

if __name__ == "__main__":
    try: main()
    except KeyboardInterrupt: print("\nAnnullato.")

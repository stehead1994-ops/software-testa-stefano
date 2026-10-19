#!/usr/bin/env python3
"""Rende pubblica la sezione Materiali del portale.
Uso (dalla cartella del repo):  python3 attiva_materiali.py
- aggiunge "🧩 Materiali" nella barra di navigazione di tutte le pagine (dopo Formazione)
- toglie il blocco all'indicizzazione (noindex) da materiali/
- aggiunge la pagina alla sitemap
Si può rilanciare senza problemi: non duplica nulla."""
import os, re
BASE = "https://stehead1994-ops.github.io/software-testa-stefano/"
root = os.path.dirname(os.path.abspath(__file__))
nav_n = idx_n = 0
for d, _, files in os.walk(root):
    if os.sep + ".git" in d: continue
    for f in files:
        if not f.endswith(".html"): continue
        p = os.path.join(d, f); rel = os.path.relpath(p, root)
        s = open(p, encoding="utf-8").read(); o = s
        if rel.startswith("materiali" + os.sep):
            s = s.replace('<meta name="robots" content="noindex, nofollow">\n', "").replace('<meta name="robots" content="noindex, nofollow">', "")
            if s != o: idx_n += 1
        elif 'class="navbar-links"' in s and "materiali/index.html" not in s:
            up = "../" * rel.count(os.sep)
            link = (f'<a href="{up}materiali/index.html" class="navbar-link navbar-link-mat" '
                    'style="background:#1D9E75;color:#fff;font-weight:700">🧩 Materiali</a>\n      ')
            m = re.search(r'<a [^>]*navbar-link-pod', s)
            if m: s = s[:m.start()] + link + s[m.start():]
            else: s = re.sub(r'(<div class="navbar-links">.*?)(\s*</div>)', lambda x: x.group(1) + "\n      " + link.strip() + x.group(2), s, count=1, flags=re.S)
            if s != o: nav_n += 1
        if s != o: open(p, "w", encoding="utf-8").write(s)
sm = os.path.join(root, "sitemap.xml"); s = open(sm, encoding="utf-8").read()
if "materiali/" not in s:
    add = (f"\n  <!-- Materiali -->\n  <url>\n    <loc>{BASE}materiali/index.html</loc>\n"
           "    <priority>0.8</priority>\n    <changefreq>weekly</changefreq>\n  </url>\n")
    s = s.replace("</urlset>", add + "\n</urlset>"); open(sm, "w", encoding="utf-8").write(s); print("sitemap aggiornata")
print(f"Link Materiali aggiunto in {nav_n} pagine; noindex tolto da {idx_n} pagine.")

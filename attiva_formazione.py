#!/usr/bin/env python3
"""Rende pubblica la sezione Formazione del portale.
Uso (dalla cartella del repo):  python3 attiva_formazione.py
- aggiunge "🎓 Formazione" alla barra di navigazione di tutte le pagine
- toglie il blocco all'indicizzazione (noindex) dalle pagine di formazione/
- aggiunge le pagine alla sitemap
Si può rilanciare senza problemi: non duplica nulla."""
import os, re
BASE = "https://stehead1994-ops.github.io/software-testa-stefano/"
root = os.path.dirname(os.path.abspath(__file__))
nav_n = idx_n = 0
for d, _, files in os.walk(root):
    if "/.git" in d: continue
    for f in files:
        if not f.endswith(".html"): continue
        p = os.path.join(d, f); rel = os.path.relpath(p, root)
        s = open(p, encoding="utf-8").read(); o = s
        if rel.startswith("formazione" + os.sep):
            s = s.replace('<meta name="robots" content="noindex, nofollow">\n', "").replace('<meta name="robots" content="noindex, nofollow">', "")
            if s != o: idx_n += 1
        elif 'class="navbar-links"' in s and "formazione/index.html" not in s:
            up = "../" * rel.count(os.sep)
            link = (f'<a href="{up}formazione/index.html" class="navbar-link navbar-link-for" '
                    'style="background:#003087;color:#fff;font-weight:700;border-color:#C8A84B">🎓 Formazione</a>\n      ')
            m = re.search(r'<a [^>]*navbar-link-pod', s)
            if m: s = s[:m.start()] + link + s[m.start():]
            else: s = re.sub(r'(<div class="navbar-links">.*?)(\s*</div>)', lambda x: x.group(1) + "\n      " + link.strip() + x.group(2), s, count=1, flags=re.S)
            if s != o: nav_n += 1
        if s != o: open(p, "w", encoding="utf-8").write(s)
sm = os.path.join(root, "sitemap.xml"); s = open(sm, encoding="utf-8").read()
if "formazione/" not in s:
    add = "\n  <!-- Formazione -->\n" + "".join(
        f"  <url>\n    <loc>{BASE}{u}</loc>\n    <priority>{pr}</priority>\n    <changefreq>monthly</changefreq>\n  </url>\n"
        for u, pr in [("formazione/index.html", "0.8"), ("formazione/laboratorio-tic/index.html", "0.7")])
    s = s.replace("</urlset>", add + "\n</urlset>"); open(sm, "w", encoding="utf-8").write(s); print("sitemap aggiornata")
print(f"Link Formazione aggiunto in {nav_n} pagine; noindex tolto da {idx_n} pagine.")

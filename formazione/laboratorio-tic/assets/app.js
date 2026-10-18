/* Laboratorio TIC per includere — navigazione condivisa
   prof. Stefano Testa · Adelia */
(function () {
  "use strict";

  var COURSE = "Laboratorio TIC per includere";
  var AUTHOR = "prof. Stefano Testa";

  // Elenco moduli: per aggiungerne uno basta una riga qui + la pagina .html
  var MODULES = [
    { group: "Fondamenti", items: [
      { id: "tic-netiquette", n: "01", t: "TIC, Netiquette e Universal Design", f: "01-tic-netiquette.html" },
      { id: "udl",            n: "02", t: "Universal Design for Learning",     f: "02-udl.html" },
      { id: "samr",           n: "03", t: "Il modello SAMR",                   f: "03-samr.html" }
    ]},
    { group: "Ambienti e strumenti", items: [
      { id: "ddi",            n: "04", t: "Didattica digitale e Classroom",    f: "04-ddi-classroom.html" },
      { id: "mappe",          n: "05", t: "Mappe mentali e concettuali",       f: "05-mappe.html" },
      { id: "app",            n: "06", t: "App per il potenziamento",          f: "", soon: true },
      { id: "bacheche",       n: "07", t: "Presentazioni e bacheche virtuali", f: "", soon: true }
    ]},
    { group: "Creare e programmare", items: [
      { id: "robotica",       n: "08", t: "Robotica educativa e coding",       f: "08-robotica.html" },
      { id: "storytelling",   n: "09", t: "Digital storytelling",              f: "09-storytelling.html" },
      { id: "caa",            n: "10", t: "CAA con AraWord",                   f: "10-caa-araword.html" }
    ]},
    { group: "Coinvolgere e innovare", items: [
      { id: "gamification",   n: "11", t: "Gamification e Game-Based Learning", f: "11-gamification.html" },
      { id: "ia",             n: "12", t: "Intelligenza artificiale a scuola",  f: "12-ia.html" }
    ]},
    { group: "Risorse", items: [
      { id: "curricolo",      n: "13", t: "Curricolo digitale: un esempio",    f: "13-curricolo-digitale.html" },
      { id: "bibliografia",   n: "14", t: "Bibliografia",                      f: "14-bibliografia.html" }
    ]}
  ];
  window.TIC_MODULES = MODULES;

  var flat = [];
  MODULES.forEach(function (g) { g.items.forEach(function (m) { if (!m.soon) flat.push(m); }); });

  var page = document.body.getAttribute("data-page") || "home";
  var idx = flat.findIndex(function (m) { return m.id === page; });
  var LOGO = "assets/adelia.png";

  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  // Tema
  var saved = store("tic-theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  // Barra superiore
  var top = el(
    '<header class="topbar">' +
      '<button class="btn" id="menuBtn" aria-label="Apri indice">☰</button>' +
      '<a class="brand" href="index.html">' +
        '<img class="adelia" src="' + LOGO + '" alt="Adelia" onerror="this.outerHTML=\'<span class=adelia-fallback>ST</span>\'">' +
        '<span><span class="t1">' + COURSE + '</span><br><span class="t2">' + AUTHOR + ' · con Adelia</span></span>' +
      '</a>' +
      '<span class="spacer"></span>' +
      '<button class="btn" id="themeBtn" aria-label="Cambia tema">◐</button>' +
      (page !== "home" ? '<button class="btn gold" id="presentBtn">▶ <span class="lbl">Presenta</span></button>' : '') +
    '</header>');
  document.body.insertBefore(top, document.body.firstChild);

  // Layout con indice laterale
  var main = document.querySelector("main");
  var layout = el('<div class="layout"></div>');
  var side = el('<nav class="sidebar" aria-label="Moduli del laboratorio"></nav>');
  var html = '<a href="../index.html" style="font-size:13.5px;color:var(--muted)"><span class="n">←</span>Formazione · L\'Archivio</a>' +
    '<a href="index.html"' + (page === "home" ? ' class="active"' : '') + '><span class="n">◆</span>Programma del laboratorio</a>';
  MODULES.forEach(function (g) {
    html += "<h4>" + g.group + "</h4>";
    g.items.forEach(function (m) {
      html += m.soon
        ? '<a class="soon" aria-disabled="true"><span class="n">' + m.n + "</span>" + m.t + " · in arrivo</a>"
        : '<a href="' + m.f + '"' + (m.id === page ? ' class="active" aria-current="page"' : "") + '><span class="n">' + m.n + "</span>" + m.t + "</a>";
    });
  });
  side.innerHTML = html;
  main.parentNode.insertBefore(layout, main);
  layout.appendChild(side);
  layout.appendChild(main);

  // Precedente / successivo
  if (idx >= 0) {
    var prev = flat[idx - 1], next = flat[idx + 1];
    var pager = el('<div class="pager"></div>');
    pager.innerHTML =
      (prev ? '<a href="' + prev.f + '"><small>← Modulo precedente</small>' + prev.n + " · " + prev.t + "</a>" : '<a href="index.html"><small>← Torna al</small>Programma</a>') +
      (next ? '<a class="next" href="' + next.f + '"><small>Modulo successivo →</small>' + next.n + " · " + next.t + "</a>" : '<a class="next" href="index.html"><small>Fine percorso →</small>Programma</a>');
    main.appendChild(pager);
  }

  // Piè di pagina
  document.body.appendChild(el(
    '<footer class="site"><img src="' + LOGO + '" alt="" onerror="this.remove()">' +
    '<span>' + COURSE + ' · ' + AUTHOR + ' · <a href="../index.html" style="color:#C8A84B">Formazione</a> · <a href="../../index.html" style="color:#C8A84B">L\'Archivio del Maestro Stefano Testa</a></span></footer>'));

  // Menu mobile e tema
  document.getElementById("menuBtn").onclick = function () { document.body.classList.toggle("nav-open"); };
  document.getElementById("themeBtn").onclick = function () {
    var cur = document.documentElement.getAttribute("data-theme");
    var dark = cur ? cur === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    var nt = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nt);
    store("tic-theme", nt);
  };

  // ---------- Modalità presentazione ----------
  var slides = [], cur = 0, pbar;
  function buildCover() {
    var h = document.querySelector(".hero");
    var title = h ? h.querySelector("h1").innerHTML : document.title;
    var sub = h && h.querySelector("p") ? h.querySelector("p").innerHTML : "";
    var mod = idx >= 0 ? "Modulo " + flat[idx].n : "";
    var c = el(
      '<section class="slide cover" style="display:none;background:linear-gradient(135deg,#003087,#0a3f9e);color:#fff;border-top-color:#C8A84B">' +
        '<div style="display:flex;align-items:center;gap:4vw;min-height:70vh;flex-wrap:wrap">' +
          '<img src="' + LOGO + '" alt="Adelia" style="width:min(22vw,200px);background:#fff;border-radius:24px;padding:12px" onerror="this.remove()">' +
          '<div style="flex:1;min-width:260px">' +
            '<div style="color:#C8A84B;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.7em">' + COURSE + (mod ? " · " + mod : "") + "</div>" +
            '<h2 style="color:#fff;font-size:clamp(36px,5vw,72px);margin:.2em 0">' + title + "</h2>" +
            '<p style="opacity:.9">' + sub + "</p>" +
            '<p style="margin-top:1.5em;font-weight:600">' + AUTHOR + "</p>" +
          "</div></div></section>");
    main.insertBefore(c, main.querySelector(".slide"));
  }
  function show(i) {
    cur = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach(function (s, k) { s.classList.toggle("on", k === cur); });
    pbar.querySelector(".cnt").textContent = (cur + 1) + " / " + slides.length;
    window.scrollTo(0, 0);
  }
  function enter() {
    if (!document.querySelector(".slide.cover")) buildCover();
    slides = Array.prototype.slice.call(document.querySelectorAll("main .slide"));
    if (!pbar) {
      pbar = el('<div class="pbar"><img src="' + LOGO + '" alt="" onerror="this.remove()"><span>' + AUTHOR + ' · ' + COURSE + '</span><span class="grow"></span>' +
        '<button class="btn" data-a="p" aria-label="Slide precedente">←</button><span class="cnt"></span><button class="btn" data-a="n" aria-label="Slide successiva">→</button><button class="btn" data-a="x">Esci</button></div>');
      pbar.addEventListener("click", function (e) {
        var a = e.target.getAttribute("data-a");
        if (a === "p") show(cur - 1); else if (a === "n") show(cur + 1); else if (a === "x") exit();
      });
      document.body.appendChild(pbar);
    }
    document.body.classList.add("present");
    var c = document.querySelector(".slide.cover"); if (c) c.style.display = "";
    show(0);
    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(function () {});
  }
  function exit() {
    document.body.classList.remove("present");
    var c = document.querySelector(".slide.cover"); if (c) c.style.display = "none";
    slides.forEach(function (s) { s.classList.remove("on"); });
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(function () {});
  }
  var pb = document.getElementById("presentBtn");
  if (pb) pb.onclick = function (e) { e.stopPropagation(); enter(); };
  document.addEventListener("keydown", function (e) {
    if (!document.body.classList.contains("present")) return;
    if (["ArrowRight", "PageDown", " ", "Enter"].indexOf(e.key) >= 0) { e.preventDefault(); show(cur + 1); }
    else if (["ArrowLeft", "PageUp", "Backspace"].indexOf(e.key) >= 0) { e.preventDefault(); show(cur - 1); }
    else if (e.key === "Home") show(0);
    else if (e.key === "End") show(slides.length - 1);
    else if (e.key === "Escape") exit();
  });
  document.addEventListener("click", function (e) {
    if (!document.body.classList.contains("present") || e.target.closest(".pbar") || e.target.closest("a")) return;
    show(e.clientX < window.innerWidth / 3 ? cur - 1 : cur + 1);
  });
  if (/[?&]presenta=1/.test(location.search) && pb) enter();
})();

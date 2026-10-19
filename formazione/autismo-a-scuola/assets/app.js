/* Autismo a scuola — navigazione condivisa
   Stefano Testa · Adelia */
(function () {
  "use strict";

  var COURSE = "Autismo a scuola";
  var AUTHOR = "Stefano Testa";

  // Elenco moduli: per aggiungerne uno basta una riga qui + la pagina .html
  var MODULES = [
    { group: "Conoscere", items: [
      { id: "miti",        n: "01", t: "Miti da smontare",                 f: "01-miti.html" },
      { id: "mente",       n: "02", t: "Teoria della mente",               f: "02-teoria-mente.html" }
    ]},
    { group: "Organizzare", items: [
      { id: "cornice",     n: "03", t: "Spazi e tempi chiari",             f: "03-spazi-tempi.html" },
      { id: "comunicare",  n: "04", t: "Comunicare con l'aiuto visivo",    f: "04-comunicare.html" }
    ]},
    { group: "Capire e intervenire", items: [
      { id: "comportamenti", n: "05", t: "I comportamenti problema",       f: "05-comportamenti.html" },
      { id: "storie",      n: "06", t: "Le storie sociali",                f: "06-storie-sociali.html" }
    ]},
    { group: "In classe", items: [
      { id: "differenziare", n: "07", t: "Differenziare la didattica",     f: "07-differenziare.html" },
      { id: "tecnologie",  n: "08", t: "Tecnologie che aiutano",           f: "08-tecnologie.html" }
    ]},
    { group: "Risorse", items: [
      { id: "risorse",     n: "09", t: "Strumenti e bibliografia",         f: "09-risorse.html" }
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
  var saved = store("aut-theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  // Barra superiore
  var top = el(
    '<header class="topbar">' +
      '<button class="btn" id="menuBtn" aria-label="Apri indice">☰</button>' +
      '<a class="brand" href="index.html">' +
        '<img class="adelia" src="' + LOGO + '" alt="Adelia" onerror="this.outerHTML=\'<span class=adelia-fallback>ST</span>\'">' +
        '<span><span class="t1">' + COURSE + '</span><br><span class="t2">' + AUTHOR + '</span></span>' +
      '</a>' +
      '<span class="spacer"></span>' +
      '<button class="btn" id="themeBtn" aria-label="Cambia tema chiaro o scuro">Tema</button>' +
      (page !== "home" ? '<button class="btn gold" id="presentBtn">▶ <span class="lbl">Presenta</span></button>' : '') +
    '</header>');
  document.body.insertBefore(top, document.body.firstChild);

  // Layout con indice laterale
  var main = document.querySelector("main");
  var layout = el('<div class="layout"></div>');
  var side = el('<nav class="sidebar" aria-label="Moduli del percorso"></nav>');
  var html = '<a href="../index.html"><span class="n"></span>← Formazione</a>' +
    '<a href="index.html"' + (page === "home" ? ' class="active"' : '') + '><span class="n"></span>Programma del percorso</a>';
  MODULES.forEach(function (g) {
    html += "<h4>" + g.group + "</h4>";
    g.items.forEach(function (m) {
      html += m.soon
        ? '<a class="soon" aria-disabled="true"><span class="n">' + m.n + "</span>" + m.t + " (in arrivo)</a>"
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
      (prev ? '<a href="' + prev.f + '"><small>Modulo precedente</small>' + prev.t + "</a>" : '<a href="index.html"><small>Torna al</small>programma</a>') +
      (next ? '<a class="next" href="' + next.f + '"><small>Modulo successivo</small>' + next.t + "</a>" : '<a class="next" href="index.html"><small>Fine del percorso</small>programma</a>');
    main.appendChild(pager);
  }

  // Piè di pagina
  document.body.appendChild(el(
    '<footer class="site"><img src="' + LOGO + '" alt="" onerror="this.remove()">' +
    '<span>' + COURSE + ', ' + AUTHOR + '. <a href="../index.html">Formazione</a>, <a href="../../index.html">L\'Archivio del Maestro Stefano Testa</a>.</span></footer>'));

  // Menu mobile e tema
  document.getElementById("menuBtn").onclick = function () { document.body.classList.toggle("nav-open"); };
  document.getElementById("themeBtn").onclick = function () {
    var cur = document.documentElement.getAttribute("data-theme");
    var dark = cur ? cur === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    var nt = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nt);
    store("aut-theme", nt);
  };

  // ---------- Modalità presentazione ----------
  var slides = [], cur = 0, pbar;
  function buildCover() {
    var h = document.querySelector(".hero");
    var title = h ? h.querySelector("h1").innerHTML : document.title;
    var lead = h ? h.querySelector(".lead") : null;
    var mod = idx >= 0 ? "modulo " + parseInt(flat[idx].n, 10) : "";
    var c = el(
      '<section class="slide cover row"><div class="cover-in">' +
        '<p class="hand cover-mod">' + COURSE + (mod ? ", " + mod : "") + '</p>' +
        '<h2 class="cover-title">' + title + '</h2>' +
        (lead ? '<p class="cover-lead">' + lead.innerHTML + '</p>' : '') +
        '<p class="cover-author"><img src="' + LOGO + '" alt="" onerror="this.remove()">' + AUTHOR.replace("prof. ", "prof. ") + '</p>' +
      '</div></section>');
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

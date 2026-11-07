/* Vetrina: in cima l'ultimo uscito, sotto i riquadri delle categorie.
   Si aggancia ai filtri che la pagina ha già: un clic su un riquadro
   equivale al clic sulla categoria nella colonna laterale.
   Configurazione con gli attributi data-* del tag <script>. */
(function () {
  "use strict";
  var me = document.currentScript;
  function opt(k, d) { var v = me && me.getAttribute("data-" + k); return v == null ? d : v; }

  var CFG = {
    cards:   opt("cards", ".card"),
    filters: opt("filters", "#cat-list li"),
    key:     opt("key", "data-cat"),
    cardKey: opt("card-key", "data-cats"),
    list:    opt("list", ".content-header, #grid-articoli"),
    mount:   opt("mount", ".content-header"),
    search:  opt("search", "#search-input"),
    ultimo:  opt("ultimo", "data"),
    noun:    opt("noun", "articolo|articoli").split("|"),
    icons:   JSON.parse(opt("icons", "{}") || "{}"),
    titolo:  opt("titolo", "Sfoglia per categoria")
  };

  var MESI = {gen:1,gennaio:1,feb:2,febbraio:2,mar:3,marzo:3,apr:4,aprile:4,mag:5,maggio:5,giu:6,giugno:6,
              lug:7,luglio:7,ago:8,agosto:8,set:9,settembre:9,ott:10,ottobre:10,nov:11,novembre:11,dic:12,dicembre:12};
  function dataDi(card) {
    var d = card.getAttribute("data-date");
    if (d) return d.replace(/-/g, "");
    var el = card.querySelector(".card-date, .card-foot, time");
    var t = (el ? el.textContent : card.textContent).toLowerCase();
    var m = t.match(/(?:(\d{1,2})\s+)?(gen(?:naio)?|feb(?:braio)?|mar(?:zo)?|apr(?:ile)?|mag(?:gio)?|giu(?:gno)?|lug(?:lio)?|ago(?:sto)?|set(?:tembre)?|ott(?:obre)?|nov(?:embre)?|dic(?:embre)?)\.?\s+(\d{4})/);
    if (!m) return "";
    var g = m[1] ? ("0" + m[1]).slice(-2) : "00";
    return m[3] + ("0" + MESI[m[2]]).slice(-2) + g;
  }
  function chiaveDi(el) { return el.getAttribute(CFG.key); }
  function etichetta(el) {
    var c = el.cloneNode(true);
    c.querySelectorAll("[class*=count]").forEach(function (x) { x.remove(); });
    return c.textContent.replace(/\s+/g, " ").trim();
  }
  function separaIcona(s) {
    var m = s.match(/^(\p{Extended_Pictographic}(?:️|‍\p{Extended_Pictographic})*|\p{Regional_Indicator}{2})\s*/u);
    return m ? [m[1], s.slice(m[0].length)] : ["", s];
  }
  function nCard(k, cards) {
    return cards.filter(function (c) {
      var v = (c.getAttribute(CFG.cardKey) || "").split(/\s+/);
      return v.indexOf(k) >= 0;
    }).length;
  }
  function parola(n) { return n + " " + (n === 1 ? CFG.noun[0] : CFG.noun[1]); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

  function css() {
    var s = document.createElement("style");
    s.textContent =
      ".vt{margin:0 0 1.8rem}" +
      ".vt-label{font:700 11px 'DM Sans',sans-serif;letter-spacing:1.6px;text-transform:uppercase;color:#7a5d12;margin:0 0 .6rem;display:flex;align-items:center;gap:8px}" +
      ".vt-label::after{content:'';flex:1;height:1px;background:#e2d6ae}" +
      ".vt-hero{margin-bottom:2rem}" +
      ".vt-hero .card{width:100%;max-width:none;opacity:1!important;transform:none;animation:none!important;box-shadow:0 6px 26px rgba(0,48,135,.10)}" +
      ".vt-hero .card .card-title{font-size:clamp(20px,2.4vw,26px)!important;line-height:1.25}" +
      ".vt-hero .card .card-desc{font-size:15px;-webkit-line-clamp:unset;display:block;overflow:visible}" +
      "@media(min-width:760px){.vt-hero .card:has(.card-thumb){display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr)}" +
      ".vt-hero .card:has(.card-thumb) .card-thumb{aspect-ratio:auto;min-height:100%;border-bottom:0;border-right:1px solid #e2e8f0}}" +
      ".vt-tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(165px,1fr));gap:12px}" +
      ".vt-tile{display:flex;flex-direction:column;align-items:flex-start;gap:4px;text-align:left;background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;padding:14px 14px 13px;cursor:pointer;font:inherit;color:inherit;text-decoration:none;transition:border-color .15s,box-shadow .15s,transform .15s}" +
      ".vt-tile:hover{border-color:#C8A84B;box-shadow:0 8px 22px rgba(0,48,135,.08);transform:translateY(-2px)}" +
      ".vt-tile:focus-visible,.vt-back:focus-visible{outline:3px solid #C8A84B;outline-offset:2px}" +
      ".vt-ico{font-size:26px;line-height:1.1}" +
      ".vt-nome{font-family:'Playfair Display',serif;font-weight:700;font-size:16px;line-height:1.25;color:#0b2a5c}" +
      ".vt-n{font-size:12px;color:#5b6474}" +
      ".vt-tile.tutti{background:#fdf6e3;border-color:#efe0b3}" +
      ".vt-tile.link .vt-n::after{content:' \\2192'}" +
      ".vt-back{display:inline-flex;align-items:center;gap:6px;margin:0 0 1rem;background:none;border:0;padding:0;font:600 13px 'DM Sans',sans-serif;color:#0b6e55;cursor:pointer}" +
      ".vt-back:hover{text-decoration:underline}" +
      "[data-vt-hidden]{display:none!important}" +
      "@media(prefers-reduced-motion:reduce){.vt-tile:hover{transform:none}}";
    document.head.appendChild(s);
  }

  function init() {
    var mount = document.querySelector(CFG.mount);
    if (!mount) return;
    var cards = Array.prototype.slice.call(document.querySelectorAll(CFG.cards));
    var vere = cards.filter(function (c) { return !c.classList.contains("soon") && (c.tagName === "A" || c.querySelector("a[href]")); });
    if (!vere.length) return;
    css();

    // L'ultimo uscito
    var ultimo = vere[0];
    if (CFG.ultimo === "last") ultimo = vere[vere.length - 1];
    else if (CFG.ultimo === "data") {
      var best = "";
      vere.forEach(function (c) { var d = dataDi(c); if (d > best) { best = d; ultimo = c; } });
    }
    var hero = document.createElement("section");
    hero.className = "vt vt-hero";
    hero.innerHTML = '<p class="vt-label">In evidenza · l\'ultimo uscito</p>';
    var copia = ultimo.cloneNode(true);
    copia.classList.remove("fade-up"); copia.removeAttribute("id"); copia.removeAttribute("style");
    copia.querySelectorAll("[id]").forEach(function (x) { x.removeAttribute("id"); });
    hero.appendChild(copia);

    // I riquadri delle categorie
    var tiles = document.createElement("section");
    tiles.className = "vt vt-cat";
    var filtri = Array.prototype.slice.call(document.querySelectorAll(CFG.filters));
    var h = '<p class="vt-label">' + esc(CFG.titolo) + '</p><div class="vt-tiles">';
    var ok = 0;
    filtri.forEach(function (f) {
      var k = chiaveDi(f), a = f.querySelector("a[href]") || (f.tagName === "A" && f.getAttribute("href") ? f : null);
      var parti = separaIcona(etichetta(f));
      var ico = parti[0] || CFG.icons[k] || "📂", nome = parti[1];
      var cnt = f.querySelector("[class*=count]"), n = cnt && /^\d+$/.test(cnt.textContent.trim()) ? +cnt.textContent.trim() : (k ? nCard(k, cards) : 0);
      if (a) {
        var testoN = f.getAttribute("data-vt-n") || (n ? parola(n) : "Apri la sezione");
        h += '<a class="vt-tile link" href="' + esc(a.getAttribute("href")) + '"><span class="vt-ico" aria-hidden="true">' + ico + '</span><span class="vt-nome">' + esc(nome) + '</span><span class="vt-n">' + esc(testoN) + '</span></a>';
        ok++; return;
      }
      if (!k || k === "tutti" || !n) return;
      h += '<button type="button" class="vt-tile" data-vt="' + esc(k) + '"><span class="vt-ico" aria-hidden="true">' + ico + '</span><span class="vt-nome">' + esc(nome) + '</span><span class="vt-n">' + parola(n) + '</span></button>';
      ok++;
    });
    h += '<button type="button" class="vt-tile tutti" data-vt="tutti"><span class="vt-ico" aria-hidden="true">📚</span><span class="vt-nome">Vedi tutti</span><span class="vt-n">' + parola(vere.length) + '</span></button></div>';
    tiles.innerHTML = h;

    var back = document.createElement("button");
    back.type = "button"; back.className = "vt-back"; back.textContent = "← Tutte le categorie";

    mount.parentNode.insertBefore(hero, mount);
    mount.parentNode.insertBefore(tiles, mount);
    mount.parentNode.insertBefore(back, mount);

    var lista = function () { return Array.prototype.slice.call(document.querySelectorAll(CFG.list)); };
    var inLista = false, daVetrina = false;
    function modo(l) {
      inLista = l;
      hero.toggleAttribute("data-vt-hidden", l);
      tiles.toggleAttribute("data-vt-hidden", l);
      back.toggleAttribute("data-vt-hidden", !l);
      lista().forEach(function (el) { el.toggleAttribute("data-vt-hidden", !l); });
    }
    function filtro(k) { return document.querySelector(CFG.filters.split(",").map(function (s) { return s.trim() + "[" + CFG.key + '="' + k + '"]'; }).join(",")); }
    function cerca() { return document.querySelector(CFG.search); }

    tiles.addEventListener("click", function (e) {
      var t = e.target.closest("button[data-vt]"); if (!t) return;
      var f = filtro(t.getAttribute("data-vt"));
      daVetrina = true; if (f) f.click(); daVetrina = false;
      modo(true);
      var top = back.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({top: top, behavior: "smooth"});
    });
    back.addEventListener("click", function () {
      var s = cerca(); if (s && s.value) { s.value = ""; s.dispatchEvent(new Event("input", {bubbles: true})); }
      var f = filtro("tutti");
      daVetrina = true; if (f) f.click(); daVetrina = false;
      modo(false);
    });
    // I filtri della colonna laterale e la ricerca aprono l'elenco
    document.addEventListener("click", function (e) {
      if (daVetrina || e.target.closest(".vt")) return;
      var f = e.target.closest(CFG.filters); if (!f || f.querySelector("a[href]")) return;
      var k = chiaveDi(f);
      setTimeout(function () { modo(k !== "tutti" || !!(cerca() && cerca().value)); }, 0);
    }, true);
    var s = cerca();
    if (s) s.addEventListener("input", function () {
      if (s.value.trim()) modo(true);
      else { var att = document.querySelector(CFG.filters.split(",").map(function (x) { return x.trim() + ".active"; }).join(",")); if (!att || chiaveDi(att) === "tutti") modo(false); }
    });

    var attivo = document.querySelector(CFG.filters.split(",").map(function (x) { return x.trim() + ".active"; }).join(","));
    modo(!!(attivo && chiaveDi(attivo) && chiaveDi(attivo) !== "tutti"));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

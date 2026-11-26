/* Statistiche anonime con GoatCounter: visite alle pagine e download dei file. Nessun cookie. */
(function () {
  var CODICE = "maestrotesta"; // nome dell'account: https://CODICE.goatcounter.com
  var h = location.hostname;
  if (h !== "maestrotesta.com" && h !== "www.maestrotesta.com") return; // non conta le prove in locale
  window.goatcounter = window.goatcounter || {};
  // conta ogni pagina con il solo percorso, senza ?v=... o altri parametri
  window.goatcounter.path = function () { return location.pathname; };
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.setAttribute("data-goatcounter", "https://" + CODICE + ".goatcounter.com/count");
  document.head.appendChild(s);
  function pulisci(x) { return (x || "").replace(/\s+/g, " ").trim(); }
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var file = href.split("#")[0].split("?")[0];
    if (!a.hasAttribute("download") && !/\.(pdf|docx?|xlsx?|pptx?|odt|zip)$/i.test(file)) return;
    var nome = decodeURIComponent(file.split("/").pop() || file);
    // titolo della scheda: aria-label, altrimenti il titolo dentro la scheda, altrimenti il testo del link
    var titolo = pulisci(a.getAttribute("aria-label"));
    if (!titolo) {
      var t = a.querySelector(".card-title, h1, h2, h3, h4");
      if (!t) { var c = a.closest("article, .card, li"); t = c ? c.querySelector(".card-title, h1, h2, h3, h4") : null; }
      titolo = pulisci(t ? t.textContent : a.textContent);
    }
    if (titolo.length > 80) titolo = titolo.slice(0, 77) + "...";
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: "download/" + nome, title: "Download: " + (titolo || nome), event: true });
    }
  }, true);
})();

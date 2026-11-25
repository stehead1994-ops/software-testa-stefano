/* Statistiche anonime con GoatCounter: visite alle pagine e download dei file. Nessun cookie. */
(function () {
  var CODICE = "maestrotesta"; // nome dell'account: https://CODICE.goatcounter.com
  var h = location.hostname;
  if (h !== "maestrotesta.com" && h !== "www.maestrotesta.com") return; // non conta le prove in locale
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.setAttribute("data-goatcounter", "https://" + CODICE + ".goatcounter.com/count");
  document.head.appendChild(s);
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var file = href.split("#")[0].split("?")[0];
    if (!a.hasAttribute("download") && !/\.(pdf|docx?|xlsx?|pptx?|odt|zip)$/i.test(file)) return;
    var nome = decodeURIComponent(file.split("/").pop() || file);
    var testo = (a.getAttribute("aria-label") || a.textContent || "").replace(/\s+/g, " ").trim();
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: "download/" + nome, title: "Download: " + nome + (testo ? " (" + testo + ")" : ""), event: true });
    }
  }, true);
})();

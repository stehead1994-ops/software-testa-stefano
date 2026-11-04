/* Selettore di lingua (traduzione automatica con Google Traduttore).
   Lo script di Google viene caricato SOLO se la persona sceglie una lingua diversa dall'italiano. */
(function () {
  if (window.__snLingua) return; window.__snLingua = true;
  var LANGS = [["it","Italiano"],["en","English"],["fr","Français"],["es","Español"],["de","Deutsch"],["pt","Português"],
    ["ro","Română"],["sq","Shqip"],["ar","العربية"],["zh-CN","中文"],["uk","Українська"],["ru","Русский"],["ur","اردو"],["hi","हिन्दी"]];

  function current() {
    var m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^\/;]*\/([^;]+)/);
    var l = m ? decodeURIComponent(m[1]) : "it";
    return LANGS.some(function (x) { return x[0] === l; }) ? l : "it";
  }
  function setCookie(v, expire) {
    var host = location.hostname, e = expire ? ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : "";
    document.cookie = "googtrans=" + v + ";path=/" + e;
    if (host.indexOf(".") > -1) document.cookie = "googtrans=" + v + ";path=/;domain=." + host.replace(/^www\./, "") + e;
  }
  function setLang(l) {
    if (l === "it") setCookie("/it/it", true); else setCookie("/it/" + l, false);
    location.reload();
  }

  var css = document.createElement("style");
  css.textContent =
    ".sn-lang{position:fixed;right:14px;bottom:14px;z-index:2000;font-family:'DM Sans','Segoe UI',Arial,sans-serif}" +
    ".sn-lang select{appearance:auto;font:600 13px/1.2 inherit;font-family:inherit;color:#fff;background:#00205c;border:1px solid rgba(255,255,255,.3);border-radius:999px;padding:8px 12px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25)}" +
    ".sn-lang select:focus-visible{outline:3px solid #c8a84b;outline-offset:2px}" +
    "#sn-gt{position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden}" +
    "body{top:0!important}.skiptranslate iframe,.goog-te-banner-frame{display:none!important}#goog-gt-tt,.goog-te-balloon-frame{display:none!important}" +
    ".goog-text-highlight{background:none!important;box-shadow:none!important}" +
    "@media print{.sn-lang{display:none!important}}body.present .sn-lang{display:none}";
  document.head.appendChild(css);

  var cur = current();
  var wrap = document.createElement("div");
  wrap.className = "sn-lang notranslate"; wrap.setAttribute("translate", "no");
  var sel = document.createElement("select");
  sel.setAttribute("aria-label", "Lingua / Language");
  sel.title = "Traduzione automatica (Google Traduttore)";
  LANGS.forEach(function (x) {
    var o = document.createElement("option"); o.value = x[0]; o.textContent = "🌐 " + x[1];
    if (x[0] === cur) o.selected = true; sel.appendChild(o);
  });
  sel.addEventListener("change", function () { setLang(sel.value); });
  wrap.appendChild(sel);
  var holder = document.createElement("div"); holder.id = "sn-gt"; holder.className = "notranslate";
  function mount() { document.body.appendChild(wrap); document.body.appendChild(holder); }
  if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);

  if (cur !== "it") {
    window.snGT = function () {
      new google.translate.TranslateElement({ pageLanguage: "it", autoDisplay: false }, "sn-gt");
    };
    var s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=snGT"; s.async = true;
    document.head.appendChild(s);
  }
})();

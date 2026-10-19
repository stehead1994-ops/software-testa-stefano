/* Disegni esplicativi "a mano" (rough.js): scene composte da oggetti riconoscibili.
   Uso: <svg class="sketch" data-sketch="scene" data-items="laptop 120 130|kid 300 150 1|t 200 30 testo|a 150 90 260 90" viewBox="0 0 600 260">
   Stefano Testa · Adelia */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var K = "#1d1f24", Y = "#f5cf1d", Y2 = "#ffe36a", B = "#2f6fd6", LB = "#a9cdf2", G = "#3cb04a", LG = "#b9e3a8", R = "#e0483e",
      O = "#f26b21", SK = "#f4cfae", W = "#ffffff", GR = "#c9ced6", DG = "#7b828c", WD = "#c98a4b", PU = "#8e5bd0", PK = "#f29bb5", BG = "#2e5d3a";
  function node(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  var css, ink, biro, red;
  function colors() {
    css = getComputedStyle(document.documentElement);
    ink = (css.getPropertyValue("--graphite") || K).trim() || K;
    biro = (css.getPropertyValue("--biro") || B).trim() || B;
    red = (css.getPropertyValue("--red") || R).trim() || R;
  }

  // ---- penna: disegna dentro un gruppo trasformato ----
  function P(svg, g, seed) {
    var rc = window.rough ? window.rough.svg(svg) : null, s = seed || 7;
    function o(x) { var r = { roughness: 1.1, bowing: 1, seed: s++, stroke: K, strokeWidth: 2 }; for (var k in x) r[k] = x[k]; if (r.fill && !r.fillStyle) r.fillStyle = "solid"; return r; }
    function add(el) { g.appendChild(el); return el; }
    function raw(tag, a) { return node(tag, a, g); }
    return {
      path: function (d, x) { x = o(x); return rc ? add(rc.path(d, x)) : raw("path", { d: d, fill: x.fill || "none", stroke: x.stroke, "stroke-width": x.strokeWidth }); },
      rect: function (X, Y_, w, h, x) { return this.path("M" + X + " " + Y_ + "h" + w + "v" + h + "h" + (-w) + "Z", x); },
      ell: function (cx, cy, w, h, x) { x = o(x); return rc ? add(rc.ellipse(cx, cy, w, h, x)) : raw("ellipse", { cx: cx, cy: cy, rx: w / 2, ry: h / 2, fill: x.fill || "none", stroke: x.stroke, "stroke-width": x.strokeWidth }); },
      line: function (x1, y1, x2, y2, x) { return this.path("M" + x1 + " " + y1 + "L" + x2 + " " + y2, x); },
      text: function (x, y, t, size, col, weight) { var e = node("text", { x: x, y: y, "text-anchor": "middle", style: "font:" + (weight || 700) + " " + (size || 12) + "px var(--print,sans-serif);fill:" + (col || K) }, g); e.textContent = t; return e; }
    };
  }

  // ---- oggetti (coordinate locali, circa -60..60) ----
  var OBJ = {
    laptop: function (p) {
      p.path("M-48 -50 L48 -50 L48 14 L-48 14 Z", { fill: GR });
      p.path("M-40 -42 L40 -42 L40 6 L-40 6 Z", { fill: LB, strokeWidth: 1.4 });
      p.path("M-62 14 L62 14 L70 30 L-70 30 Z", { fill: GR });
      p.line(-14, 22, 14, 22, { strokeWidth: 1.4 });
      p.path("M-30 -30 L10 -30 M-30 -20 L22 -20 M-30 -10 L0 -10", { stroke: B, strokeWidth: 2.4, roughness: 0.6 });
    },
    tablet: function (p) {
      p.path("M-36 -54 L36 -54 L36 54 L-36 54 Z", { fill: K });
      p.path("M-29 -45 L29 -45 L29 42 L-29 42 Z", { fill: W, strokeWidth: 1 });
      p.ell(0, 48, 6, 6, { fill: GR, strokeWidth: 1 });
      [[-16, -30, Y], [6, -30, G], [-16, -6, R], [6, -6, B]].forEach(function (c) { p.rect(c[0], c[1], 16, 16, { fill: c[2], strokeWidth: 1.2 }); });
      p.path("M-18 22 L18 22 M-18 32 L8 32", { strokeWidth: 1.6 });
    },
    phone: function (p) {
      p.path("M-22 -44 L22 -44 L22 44 L-22 44 Z", { fill: K });
      p.path("M-17 -36 L17 -36 L17 34 L-17 34 Z", { fill: LB, strokeWidth: 1 });
      p.ell(0, 39, 5, 5, { fill: GR, strokeWidth: 1 });
      p.path("M-11 -24 L9 -24 L9 -14 L-11 -14 Z", { fill: W, strokeWidth: 1 });
      p.path("M-9 -2 L11 -2 L11 8 L-9 8 Z", { fill: Y, strokeWidth: 1 });
    },
    monitor: function (p) {
      p.path("M-56 -48 L56 -48 L56 22 L-56 22 Z", { fill: K });
      p.path("M-48 -40 L48 -40 L48 14 L-48 14 Z", { fill: LB, strokeWidth: 1 });
      p.path("M-8 22 L8 22 L12 40 L-12 40 Z", { fill: GR });
      p.line(-28, 42, 28, 42, { strokeWidth: 2.6 });
    },
    board: function (p) {
      p.path("M-70 -46 L70 -46 L70 40 L-70 40 Z", { fill: WD, strokeWidth: 2 });
      p.path("M-62 -38 L62 -38 L62 32 L-62 32 Z", { fill: BG, strokeWidth: 1.4 });
      p.path("M-48 -20 C-38 -30,-30 -10,-20 -20 M-10 -20 L30 -20 M-48 4 L10 4 M20 2 C 28 -6, 40 10, 48 0", { stroke: W, strokeWidth: 2, roughness: 1.3 });
      p.path("M-40 40 L-40 46 L40 46 L40 40", { strokeWidth: 1.6 });
      p.rect(24, 36, 14, 5, { fill: W, strokeWidth: 1 });
    },
    lim: function (p) {
      p.path("M-74 -46 L74 -46 L74 40 L-74 40 Z", { fill: GR });
      p.path("M-66 -38 L66 -38 L66 32 L-66 32 Z", { fill: W, strokeWidth: 1.4 });
      p.rect(-56, -28, 40, 28, { fill: LB, strokeWidth: 1.2 });
      p.ell(18, -14, 26, 26, { fill: Y, strokeWidth: 1.2 });
      p.path("M-50 16 L40 16", { stroke: B, strokeWidth: 2.4 });
      p.path("M50 30 L66 6", { strokeWidth: 4, stroke: DG });
    },
    book: function (p) {
      p.path("M0 -30 C -20 -40, -50 -40, -66 -32 L-66 30 C -50 22, -20 22, 0 32 Z", { fill: W });
      p.path("M0 -30 C 20 -40, 50 -40, 66 -32 L66 30 C 50 22, 20 22, 0 32 Z", { fill: W });
      p.path("M-70 -26 L-70 36 C -50 28, -20 28, 0 38 C 20 28, 50 28, 70 36 L70 -26", { stroke: B, strokeWidth: 2.4 });
      p.path("M-54 -20 L-14 -16 M-54 -8 L-14 -4 M-54 4 L-24 8 M14 -16 L54 -20 M14 -4 L54 -8 M14 8 L44 4", { strokeWidth: 1.2, stroke: DG });
    },
    books: function (p) {
      p.rect(-50, 20, 100, 18, { fill: B }); p.rect(-44, 2, 90, 18, { fill: R }); p.rect(-38, -16, 80, 18, { fill: Y }); p.rect(-46, -34, 86, 18, { fill: G });
      p.line(-30, 29, 30, 29, { stroke: W, strokeWidth: 1.4 }); p.line(-20, -25, 24, -25, { stroke: W, strokeWidth: 1.4 });
    },
    notebook: function (p) {
      p.path("M-40 -50 L40 -50 L40 50 L-40 50 Z", { fill: R });
      p.path("M-30 -42 L36 -42 L36 44 L-30 44 Z", { fill: W, strokeWidth: 1 });
      for (var i = -30; i <= 34; i += 10) p.line(-24, i, 30, i, { stroke: LB, strokeWidth: 1, roughness: 0.4 });
      for (var j = -44; j <= 40; j += 12) p.ell(-40, j, 7, 7, { fill: GR, strokeWidth: 1 });
    },
    pencil: function (p) {
      p.path("M-56 8 L36 8 L36 -8 L-56 -8 Z", { fill: Y });
      p.path("M36 -8 L58 0 L36 8 Z", { fill: SK }); p.path("M52 -2 L58 0 L52 2 Z", { fill: K });
      p.path("M-56 -8 L-68 -8 L-68 8 L-56 8 Z", { fill: PK });
      p.line(-56, 0, 36, 0, { strokeWidth: 1, stroke: O });
    },
    clock: function (p) {
      p.ell(0, 0, 110, 110, { fill: W, strokeWidth: 2.6 });
      for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6; p.line(Math.cos(a) * 42, Math.sin(a) * 42, Math.cos(a) * 50, Math.sin(a) * 50, { strokeWidth: 1.6, roughness: 0.3 }); }
      p.line(0, 0, 0, -36, { strokeWidth: 3, roughness: 0.4 }); p.line(0, 0, 26, 12, { strokeWidth: 3, stroke: red, roughness: 0.4 });
      p.ell(0, 0, 8, 8, { fill: K });
    },
    hourglass: function (p) {
      p.rect(-34, -56, 68, 10, { fill: WD }); p.rect(-34, 46, 68, 10, { fill: WD });
      p.path("M-26 -46 C -26 -14, -4 -8, -4 0 C -4 8, -26 14, -26 46 L26 46 C 26 14, 4 8, 4 0 C 4 -8, 26 -14, 26 -46 Z", { fill: "#eef6fb" });
      p.path("M-16 -30 L16 -30 C 10 -16, 2 -10, 0 -4 C -2 -10, -10 -16, -16 -30 Z", { fill: Y, strokeWidth: 1 });
      p.path("M-22 44 C -14 30, 14 30, 22 44 Z", { fill: Y, strokeWidth: 1 });
      p.line(0, -2, 0, 32, { stroke: O, strokeWidth: 1.4 });
    },
    calendar: function (p) {
      p.rect(-50, -44, 100, 92, { fill: W });
      p.rect(-50, -44, 100, 22, { fill: R });
      p.ell(-26, -46, 8, 14, { fill: GR }); p.ell(26, -46, 8, 14, { fill: GR });
      for (var r = 0; r < 4; r++) for (var c = 0; c < 5; c++) p.rect(-42 + c * 17, -14 + r * 15, 12, 10, { fill: (r === 1 && c === 2) ? Y : W, strokeWidth: 1, roughness: 0.6 });
    },
    kid: function (p, v) {
      var shirt = [R, B, G, O, PU][v % 5], hair = ["#5a3a1e", "#e0b100", "#2a2a2a", "#a0522d", "#5a3a1e"][v % 5];
      p.path("M-8 30 L-12 70 M8 30 L12 70", { strokeWidth: 5, stroke: B, roughness: 0.6 });
      p.path("M-14 72 L-4 72 M6 72 L16 72", { strokeWidth: 5, roughness: 0.4 });
      p.path("M-22 -6 C -22 -14, 22 -14, 22 -6 L18 32 L-18 32 Z", { fill: shirt });
      p.path("M-22 -4 L-34 22 M22 -4 L34 22", { strokeWidth: 5, stroke: shirt, roughness: 0.6 });
      p.ell(-35, 25, 9, 9, { fill: SK, strokeWidth: 1.2 }); p.ell(35, 25, 9, 9, { fill: SK, strokeWidth: 1.2 });
      p.ell(0, -32, 40, 42, { fill: SK });
      p.path(v % 2 ? "M-20 -36 C -20 -60, 20 -60, 20 -36 C 12 -46, -6 -46, -20 -36 Z M-20 -36 C -26 -24, -24 -14, -20 -10 M20 -36 C 26 -24, 24 -14, 20 -10" : "M-20 -34 C -22 -58, 22 -60, 20 -34 C 10 -44, -8 -46, -20 -34 Z", { fill: hair, stroke: hair, strokeWidth: 3 });
      if (v >= 10) { p.path("M-21 -34 C -24 -60, 24 -60, 21 -34 C 22 -22, 16 -14, 0 -12 C -16 -14, -22 -22, -21 -34 Z", { fill: hair, stroke: hair, strokeWidth: 2 }); return; }
      p.ell(-7, -32, 4, 5, { fill: K }); p.ell(7, -32, 4, 5, { fill: K });
      p.path("M-7 -22 C -3 -17, 3 -17, 7 -22", { strokeWidth: 1.6 });
    },
    teacher: function (p, v) {
      var top = [PU, G, B][v % 3];
      p.path("M-10 34 L-12 84 M10 34 L12 84", { strokeWidth: 6, stroke: K, roughness: 0.5 });
      p.path("M-26 -10 C -26 -20, 26 -20, 26 -10 L22 38 L-22 38 Z", { fill: top });
      p.path("M-26 -8 L-40 26 M26 -8 L44 -30", { strokeWidth: 6, stroke: top, roughness: 0.5 });
      p.ell(-40, 29, 10, 10, { fill: SK, strokeWidth: 1.2 }); p.ell(46, -33, 10, 10, { fill: SK, strokeWidth: 1.2 });
      p.ell(0, -40, 42, 46, { fill: SK });
      p.path("M-22 -44 C -22 -72, 22 -72, 22 -44 C 22 -20, 30 -14, 26 -6 C 18 -30, 18 -40, 10 -52 C 0 -44, -14 -44, -22 -44 Z", { fill: "#6b4423", stroke: "#6b4423" });
      p.ell(-8, -40, 4, 5, { fill: K }); p.ell(8, -40, 4, 5, { fill: K });
      p.path("M-8 -28 C -3 -23, 3 -23, 8 -28", { strokeWidth: 1.6 });
    },
    desk: function (p) {
      p.path("M-70 -10 L70 -10 L70 0 L-70 0 Z", { fill: WD });
      p.path("M-62 0 L-62 44 M62 0 L62 44", { strokeWidth: 4, roughness: 0.5 });
    },
    chair: function (p) {
      p.path("M-20 -50 L-20 0 L24 0", { strokeWidth: 4, stroke: B });
      p.rect(-22, -4, 48, 8, { fill: B }); p.path("M-18 4 L-18 40 M22 4 L22 40", { strokeWidth: 4, roughness: 0.5 });
    },
    card: function (p, v) {
      p.path("M-34 -40 L34 -40 L34 40 L-34 40 Z", { fill: W, strokeWidth: 2.4, stroke: [Y, G, O, B, PK][v % 5] });
      [function () { p.ell(0, -8, 30, 30, { fill: Y }); for (var i = 0; i < 8; i++) { var a = i * Math.PI / 4; p.line(Math.cos(a) * 20, -8 + Math.sin(a) * 20, Math.cos(a) * 28, -8 + Math.sin(a) * 28, { stroke: O, strokeWidth: 1.6 }); } },
       function () { p.path("M-14 -24 L14 -24 L10 10 L-10 10 Z", { fill: LB }); p.line(-12, -12, 12, -12, { stroke: B, strokeWidth: 1.4 }); },
       function () { p.ell(0, -6, 34, 34, { fill: R }); p.path("M0 -22 C 2 -30, 8 -32, 10 -32", { strokeWidth: 1.6 }); },
       function () { p.ell(0, -6, 32, 32, { fill: W }); p.path("M-16 -6 C -6 -2, 6 -2, 16 -6 M0 -22 C -8 -10, -8 6, 0 10", { strokeWidth: 1.4 }); },
       function () { p.ell(0, -8, 30, 30, { fill: SK }); p.ell(-5, -10, 3, 4, { fill: K }); p.ell(5, -10, 3, 4, { fill: K }); p.path("M-6 -2 C -2 2, 2 2, 6 -2", { strokeWidth: 1.4 }); }][v % 5]();
      p.line(-18, 26, 18, 26, { strokeWidth: 2.4, roughness: 0.5 });
    },
    cboard: function (p) {
      p.rect(-74, -50, 148, 100, { fill: W });
      var cols = [Y, G, G, O, O, PK];
      for (var i = 0; i < 6; i++) { var x = -66 + (i % 3) * 46, y = -42 + Math.floor(i / 3) * 46; p.rect(x, y, 40, 40, { fill: W, stroke: cols[i], strokeWidth: 2.6, roughness: 0.6 }); }
      p.ell(-46, -26, 16, 16, { fill: SK, strokeWidth: 1 }); p.path("M-4 -32 L6 -14 M8 -32 L-2 -14", { strokeWidth: 1.6 }); p.ell(46, -24, 18, 18, { fill: R, strokeWidth: 1 });
      p.ell(-46, 22, 18, 18, { fill: Y, strokeWidth: 1 }); p.rect(-6, 14, 14, 18, { fill: LB, strokeWidth: 1 }); p.path("M38 22 L54 22 M46 14 L46 30", { strokeWidth: 2.4 });
    },
    bubble: function (p, v) {
      p.path("M-56 -36 C -56 -50, 56 -50, 56 -36 L56 14 C 56 28, -10 28, -20 28 L-36 46 L-30 28 C -56 28, -56 22, -56 14 Z", { fill: W });
      if (!v) p.path("M-38 -22 L34 -22 M-38 -6 L20 -6 M-38 10 L8 10", { strokeWidth: 1.8, stroke: DG });
    },
    thought: function (p) {
      p.path("M-40 0 C -64 -4, -60 -36, -36 -34 C -34 -56, 0 -58, 6 -40 C 18 -58, 54 -50, 46 -26 C 66 -18, 58 12, 34 10 C 28 26, -2 28, -8 12 C -20 22, -42 18, -40 0 Z", { fill: W });
      p.ell(-38, 30, 14, 12, { fill: W, strokeWidth: 1.6 }); p.ell(-48, 46, 8, 7, { fill: W, strokeWidth: 1.4 });
    },
    bulb: function (p) {
      p.path("M-14 22 C -16 8, -34 0, -34 -20 C -34 -44, 34 -44, 34 -20 C 34 0, 16 8, 14 22 Z", { fill: Y2 });
      p.rect(-14, 22, 28, 16, { fill: GR }); p.line(-14, 30, 14, 30, { strokeWidth: 1.2 });
      p.path("M-6 20 L-6 0 L0 -6 L6 0 L6 20", { strokeWidth: 1.4, stroke: O });
      [[-52, -30, -42, -26], [52, -30, 42, -26], [0, -62, 0, -52], [-38, -58, -32, -50], [38, -58, 32, -50]].forEach(function (l) { p.line(l[0], l[1], l[2], l[3], { strokeWidth: 2, stroke: O }); });
    },
    magnifier: function (p) {
      p.ell(-10, -10, 70, 70, { fill: "#eef6fb", strokeWidth: 4 }); p.path("M16 16 L48 48", { strokeWidth: 9, stroke: WD, roughness: 0.5 });
      p.path("M-28 -22 C -24 -32, -16 -36, -8 -36", { stroke: W, strokeWidth: 3 });
    },
    checklist: function (p) {
      p.rect(-40, -52, 80, 104, { fill: W }); p.rect(-14, -58, 28, 12, { fill: GR });
      for (var i = 0; i < 4; i++) { var y = -32 + i * 22; p.rect(-30, y - 7, 12, 12, { fill: W, strokeWidth: 1.4 }); p.line(-10, y, 28, y, { strokeWidth: 1.6, stroke: DG }); if (i < 2) p.path("M-30 " + (y - 2) + " L-25 " + (y + 4) + " L-16 " + (y - 10), { stroke: G, strokeWidth: 2.6 }); }
    },
    doc: function (p) {
      p.path("M-38 -50 L22 -50 L38 -34 L38 50 L-38 50 Z", { fill: W }); p.path("M22 -50 L22 -34 L38 -34", { strokeWidth: 1.4 });
      for (var i = 0; i < 6; i++) p.line(-28, -28 + i * 13, i === 5 ? 6 : 28, -28 + i * 13, { strokeWidth: 1.4, stroke: DG });
    },
    folder: function (p) { p.path("M-56 -32 L-20 -32 L-12 -22 L56 -22 L56 38 L-56 38 Z", { fill: Y }); p.path("M-56 -14 L56 -14", { strokeWidth: 1.2 }); },
    cloud: function (p) { p.path("M-50 20 C -70 18, -66 -12, -42 -10 C -40 -36, 0 -40, 6 -18 C 18 -34, 52 -26, 46 -4 C 66 -2, 66 22, 46 22 Z", { fill: "#eef6fb" }); },
    lock: function (p) { p.path("M-20 -10 L-20 -28 C -20 -54, 20 -54, 20 -28 L20 -10", { strokeWidth: 6, stroke: GR }); p.rect(-32, -12, 64, 54, { fill: Y }); p.ell(0, 10, 12, 12, { fill: K }); p.line(0, 14, 0, 28, { strokeWidth: 4 }); },
    warning: function (p) { p.path("M0 -52 L54 44 L-54 44 Z", { fill: Y, strokeWidth: 2.6 }); p.line(0, -20, 0, 14, { strokeWidth: 7, roughness: 0.4 }); p.ell(0, 30, 9, 9, { fill: K }); },
    headphones: function (p) { p.path("M-40 16 C -46 -50, 46 -50, 40 16", { strokeWidth: 7, stroke: DG }); p.rect(-52, 6, 20, 36, { fill: R }); p.rect(32, 6, 20, 36, { fill: R }); },
    robot: function (p) {
      p.line(0, -62, 0, -48, { strokeWidth: 2.4 }); p.ell(0, -66, 10, 10, { fill: R });
      p.rect(-30, -48, 60, 42, { fill: GR }); p.ell(-12, -30, 14, 14, { fill: Y }); p.ell(12, -30, 14, 14, { fill: Y }); p.path("M-12 -14 L12 -14", { strokeWidth: 2.4 });
      p.rect(-36, 0, 72, 52, { fill: LB }); p.ell(0, 24, 18, 18, { fill: R, strokeWidth: 1.4 });
      p.path("M-36 10 L-52 34 M36 10 L52 34", { strokeWidth: 6, stroke: DG, roughness: 0.5 });
      p.path("M-18 52 L-18 66 M18 52 L18 66", { strokeWidth: 7, stroke: DG, roughness: 0.4 });
    },
    camera: function (p) { p.rect(-50, -26, 76, 52, { fill: DG }); p.path("M26 -10 L54 -26 L54 26 L26 10 Z", { fill: GR }); p.ell(-12, 0, 30, 30, { fill: LB }); p.ell(-12, 0, 12, 12, { fill: K }); p.ell(14, -16, 7, 7, { fill: R }); },
    mic: function (p) { p.rect(-14, -50, 28, 50, { fill: GR }); p.path("M-24 -12 C -24 22, 24 22, 24 -12", { strokeWidth: 3 }); p.path("M0 12 L0 40 M-18 40 L18 40", { strokeWidth: 3.6 }); p.path("M-14 -38 L14 -38 M-14 -26 L14 -26", { strokeWidth: 1.2 }); },
    globe: function (p) {
      p.ell(0, -8, 92, 92, { fill: LB }); p.path("M-24 -38 C -10 -42, -2 -26, -14 -18 C -28 -10, -20 4, -32 8 C -40 -6, -40 -24, -24 -38 Z M8 -20 C 22 -32, 40 -24, 36 -6 C 30 10, 14 14, 16 30 C 4 26, 0 8, 10 -2 C 14 -8, 4 -12, 8 -20 Z", { fill: G, strokeWidth: 1.4 });
      p.path("M-30 46 L30 46 M0 38 L0 46", { strokeWidth: 3 });
    },
    puzzle: function (p) {
      p.path("M-40 -40 L-8 -40 C -14 -56, 14 -56, 8 -40 L40 -40 L40 -8 C 56 -14, 56 14, 40 8 L40 40 L8 40 C 14 24, -14 24, -8 40 L-40 40 L-40 8 C -24 14, -24 -14, -40 -8 Z", { fill: B });
    },
    die: function (p) { p.rect(-36, -36, 72, 72, { fill: W, strokeWidth: 2.6 }); [[-18, -18], [18, -18], [0, 0], [-18, 18], [18, 18]].forEach(function (d) { p.ell(d[0], d[1], 11, 11, { fill: K }); }); },
    ball: function (p) { p.ell(0, 0, 76, 76, { fill: R }); p.path("M-38 0 C -14 10, 14 10, 38 0 M0 -38 C -12 -12, -12 12, 0 38", { stroke: W, strokeWidth: 4 }); },
    hoop: function (p, v) { p.ell(0, 0, 110, 36, { stroke: [B, R, Y, G][v % 4], strokeWidth: 6, roughness: 0.8 }); },
    rope: function (p) { p.path("M-70 0 C -40 -20, -20 20, 0 0 C 20 -20, 40 20, 70 0", { stroke: WD, strokeWidth: 5 }); p.rect(-84, -8, 16, 16, { fill: R }); p.rect(68, -8, 16, 16, { fill: R }); },
    house: function (p) { p.path("M-50 -6 L0 -50 L50 -6", { fill: R, strokeWidth: 2.4 }); p.rect(-40, -10, 80, 56, { fill: Y2 }); p.rect(-10, 14, 20, 32, { fill: WD }); p.rect(-32, 0, 16, 14, { fill: LB, strokeWidth: 1.4 }); p.rect(16, 0, 16, 14, { fill: LB, strokeWidth: 1.4 }); },
    door: function (p) { p.rect(-30, -60, 60, 120, { fill: WD }); p.ell(18, 4, 8, 8, { fill: Y }); p.rect(-20, -48, 40, 40, { fill: "none", strokeWidth: 1.2 }); },
    trophy: function (p) { p.path("M-30 -46 L30 -46 C 30 -6, 12 6, 0 6 C -12 6, -30 -6, -30 -46 Z", { fill: Y }); p.path("M-30 -36 C -50 -36, -50 -12, -24 -12 M30 -36 C 50 -36, 50 -12, 24 -12", { strokeWidth: 3, stroke: O }); p.path("M-6 6 L-6 24 L6 24 L6 6", { fill: Y }); p.rect(-24, 24, 48, 14, { fill: WD }); },
    map: function (p) { p.path("M-60 -40 L-20 -50 L20 -40 L60 -50 L60 40 L20 50 L-20 40 L-60 50 Z", { fill: LG }); p.path("M-20 -50 L-20 40 M20 -40 L20 50", { strokeWidth: 1.2, stroke: DG }); p.path("M-46 20 C -30 -10, 0 20, 10 -10 S 40 -30, 44 -20", { stroke: R, strokeWidth: 2.4, strokeLineDash: [6, 5] }); p.ell(44, -22, 10, 10, { fill: R }); },
    chart: function (p) { p.rect(-56, -46, 112, 96, { fill: W }); p.path("M-44 38 L46 38 M-44 38 L-44 -36", { strokeWidth: 2 }); [[-34, 20, B], [-14, 40, G], [6, 28, Y], [26, 58, R]].forEach(function (b) { p.rect(b[0], 38 - b[1], 14, b[1], { fill: b[2], strokeWidth: 1.4 }); }); },
    eye: function (p) { p.path("M-56 0 C -30 -36, 30 -36, 56 0 C 30 36, -30 36, -56 0 Z", { fill: W }); p.ell(0, 0, 40, 40, { fill: B }); p.ell(0, 0, 16, 16, { fill: K }); p.ell(6, -6, 6, 6, { fill: W, stroke: W }); },
    ear: function (p) { p.path("M-10 46 C -40 40, -40 -50, 10 -50 C 46 -50, 46 -4, 20 6 C 6 12, 14 30, 0 40", { fill: SK, strokeWidth: 2.4 }); p.path("M4 -26 C 22 -26, 22 -6, 8 -6", { strokeWidth: 2 }); [[34, -10], [46, -24], [44, 6]].forEach(function (s, i) { p.path("M" + (s[0] + 10) + " " + (s[1] - 8) + " C " + (s[0] + 18) + " " + s[1] + ", " + (s[0] + 18) + " " + (s[1] + 8) + ", " + (s[0] + 10) + " " + (s[1] + 16), { stroke: B, strokeWidth: 1.6 }); }); },
    hand: function (p) { p.path("M-30 50 L-30 6 C -42 -6, -36 -18, -26 -8 L-22 -2 L-22 -44 C -22 -54, -10 -54, -10 -44 L-10 -12 L-10 -52 C -10 -62, 2 -62, 2 -52 L2 -12 L2 -48 C 2 -58, 14 -58, 14 -48 L14 -10 L14 -38 C 14 -48, 26 -48, 26 -38 L26 18 C 26 40, 14 50, 4 50 Z", { fill: SK }); },
    heart: function (p) { p.path("M0 40 C -60 0, -50 -48, -18 -44 C -6 -42, 0 -32, 0 -26 C 0 -32, 6 -42, 18 -44 C 50 -48, 60 0, 0 40 Z", { fill: R }); },
    gear: function (p) { var d = ""; for (var i = 0; i < 16; i++) { var a = i * Math.PI / 8, r = i % 2 ? 34 : 46; d += (i ? "L" : "M") + (Math.cos(a) * r).toFixed(1) + " " + (Math.sin(a) * r).toFixed(1); } p.path(d + "Z", { fill: GR }); p.ell(0, 0, 26, 26, { fill: W }); },
    scissors: function (p) { p.ell(-34, 22, 26, 26, { stroke: R, strokeWidth: 4 }); p.ell(-34, -22, 26, 26, { stroke: R, strokeWidth: 4 }); p.path("M-22 16 L50 -16 M-22 -16 L50 16", { strokeWidth: 4, stroke: DG }); p.ell(2, 0, 6, 6, { fill: K }); },
    glue: function (p) { p.rect(-18, -36, 36, 76, { fill: W }); p.rect(-18, -6, 36, 30, { fill: R, strokeWidth: 1.4 }); p.rect(-14, -52, 28, 16, { fill: B }); },
    printer: function (p) { p.rect(-30, -50, 60, 30, { fill: W }); p.rect(-56, -20, 112, 46, { fill: GR }); p.rect(-30, 14, 60, 34, { fill: W }); p.line(-20, 26, 20, 26, { strokeWidth: 1.2, stroke: DG }); p.line(-20, 36, 10, 36, { strokeWidth: 1.2, stroke: DG }); p.ell(40, -8, 7, 7, { fill: G }); },
    gamepad: function (p) { p.path("M-50 -16 C -50 -30, 50 -30, 50 -16 L60 24 C 62 40, 42 42, 34 26 L-34 26 C -42 42, -62 40, -60 24 Z", { fill: DG }); p.path("M-34 -6 L-34 14 M-44 4 L-24 4", { stroke: W, strokeWidth: 4 }); p.ell(28, -2, 10, 10, { fill: R }); p.ell(40, 10, 10, 10, { fill: Y }); },
    stopwatch: function (p) { p.rect(-8, -62, 16, 12, { fill: DG }); p.ell(0, 0, 100, 100, { fill: W, strokeWidth: 3 }); p.path("M0 0 L0 -36", { strokeWidth: 3 }); p.path("M0 -38 A 38 38 0 0 1 36 -12 L0 0 Z", { fill: Y2, strokeWidth: 1 }); p.ell(0, 0, 8, 8, { fill: K }); },
    envelope: function (p) { p.rect(-56, -34, 112, 72, { fill: W }); p.path("M-56 -34 L0 10 L56 -34", { strokeWidth: 2 }); },
    brain: function (p) { p.path("M0 -44 C -30 -54, -60 -30, -50 -6 C -66 10, -50 40, -24 34 C -14 50, 6 46, 0 30 Z M0 -44 C 30 -54, 60 -30, 50 -6 C 66 10, 50 40, 24 34 C 14 50, -6 46, 0 30 Z", { fill: PK }); p.path("M-34 -20 C -20 -14, -26 0, -14 4 M30 -22 C 18 -10, 30 4, 16 10 M-34 16 C -24 12, -18 22, -8 18 M34 16 C 24 10, 18 22, 8 18", { strokeWidth: 1.6 }); },
    plant: function (p) { p.path("M-26 10 L26 10 L18 48 L-18 48 Z", { fill: O }); p.path("M0 10 L0 -30", { stroke: G, strokeWidth: 3 }); p.path("M0 -10 C -30 -10, -36 -36, -36 -36 C -10 -36, 0 -24, 0 -10 Z M0 -24 C 26 -26, 34 -52, 34 -52 C 10 -52, 0 -38, 0 -24 Z", { fill: G }); },
    sun: function (p) { p.ell(0, 0, 54, 54, { fill: Y }); for (var i = 0; i < 10; i++) { var a = i * Math.PI / 5; p.line(Math.cos(a) * 34, Math.sin(a) * 34, Math.cos(a) * 50, Math.sin(a) * 50, { stroke: O, strokeWidth: 3 }); } },
    drop: function (p) { p.path("M0 -46 C 16 -16, 30 0, 30 16 C 30 34, 16 44, 0 44 C -16 44, -30 34, -30 16 C -30 0, -16 -16, 0 -46 Z", { fill: LB }); },
    stairs: function (p) { p.path("M-60 50 L-60 26 L-30 26 L-30 2 L0 2 L0 -22 L30 -22 L30 -46 L60 -46 L60 50 Z", { fill: Y2 }); },
    ramp: function (p) { p.path("M-66 40 L60 -20 L60 40 Z", { fill: GR }); p.path("M-60 30 L54 -24", { strokeWidth: 2.4, stroke: B }); },
    flag: function (p) { p.line(-30, 50, -30, -50, { strokeWidth: 4, stroke: DG }); p.path("M-30 -50 C 0 -60, 10 -36, 40 -46 L40 -6 C 10 4, 0 -20, -30 -10 Z", { fill: R }); },
    target: function (p) { p.ell(0, 0, 100, 100, { fill: W }); p.ell(0, 0, 70, 70, { fill: R }); p.ell(0, 0, 40, 40, { fill: W }); p.ell(0, 0, 14, 14, { fill: R }); p.path("M60 -60 L4 -4", { strokeWidth: 3 }); p.path("M60 -60 L50 -66 M60 -60 L66 -50", { strokeWidth: 3 }); },
    blocks: function (p) { p.rect(-50, 10, 40, 34, { fill: R }); p.rect(-6, 10, 40, 34, { fill: B }); p.rect(-28, -24, 40, 34, { fill: Y }); p.path("M-42 10 L-42 4 L-30 4 L-30 10 M2 10 L2 4 L14 4 L14 10 M-20 -24 L-20 -30 L-8 -30 L-8 -24", { strokeWidth: 1.6 }); },
    star: function (p) { var d = ""; for (var i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 20 : 46; d += (i ? "L" : "M") + (Math.cos(a) * r).toFixed(1) + " " + (Math.sin(a) * r).toFixed(1); } p.path(d + "Z", { fill: Y }); },
    token: function (p, v) { p.ell(0, 0, 50, 50, { fill: v ? Y2 : W, strokeWidth: 2.4 }); if (v) { var d = ""; for (var i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 7 : 16; d += (i ? "L" : "M") + (Math.cos(a) * r).toFixed(1) + " " + (Math.sin(a) * r).toFixed(1); } p.path(d + "Z", { fill: Y }); } },
    bus: function (p) { p.rect(-74, -34, 148, 60, { fill: Y }); for (var i = 0; i < 4; i++) p.rect(-62 + i * 30, -24, 22, 20, { fill: LB, strokeWidth: 1.4 }); p.rect(58, -24, 12, 34, { fill: LB, strokeWidth: 1.4 }); p.ell(-44, 28, 22, 22, { fill: K }); p.ell(44, 28, 22, 22, { fill: K }); },
    tap: function (p) { p.path("M-50 -20 L10 -20 L10 -4 L-50 -4 Z", { fill: GR }); p.path("M10 -20 L28 -20 L28 10 L14 10 L14 -4", { fill: GR }); p.rect(-28, -34, 16, 14, { fill: B }); p.path("M21 16 L21 28 M17 36 L17 46 M25 34 L25 44", { stroke: B, strokeWidth: 2.4 }); },
    soap: function (p) { p.path("M-40 0 C -40 -20, 40 -20, 40 0 L36 20 C 36 30, -36 30, -36 20 Z", { fill: Y2 }); p.ell(-10, -26, 14, 14, { stroke: LB, strokeWidth: 1.6 }); p.ell(8, -36, 10, 10, { stroke: LB, strokeWidth: 1.6 }); p.ell(20, -22, 8, 8, { stroke: LB, strokeWidth: 1.6 }); },
    towel: function (p) { p.line(-50, -44, 50, -44, { strokeWidth: 4, stroke: DG }); p.path("M-36 -44 L36 -44 L32 40 L-32 40 Z", { fill: G }); p.path("M-34 26 L34 26 M-34 32 L34 32", { stroke: W, strokeWidth: 1.6 }); },
    plate: function (p) { p.ell(0, 0, 100, 40, { fill: W }); p.ell(0, 0, 64, 24, { fill: W, strokeWidth: 1.2 }); p.path("M-66 -20 L-66 20 M-72 -20 L-72 -6 C -72 0, -60 0, -60 -6 L-60 -20 M66 -20 C 74 -10, 74 0, 66 4 L66 20", { strokeWidth: 2.4 }); },
    cup: function (p) { p.path("M-22 -30 L22 -30 L18 34 L-18 34 Z", { fill: LB }); p.path("M-21 -10 L21 -10", { strokeWidth: 1.2, stroke: B }); },
    key: function (p) { p.path("M-30 -26 L30 -26 L30 26 L-30 26 Z", { fill: GR, strokeWidth: 2.2 }); p.path("M-22 -18 L22 -18 L22 14 L-22 14 Z", { fill: W, strokeWidth: 1.2 }); },
    toy: function (p) { p.ell(0, 10, 50, 50, { fill: O }); p.ell(-16, -16, 22, 22, { fill: O }); p.ell(16, -16, 22, 22, { fill: O }); p.ell(0, -6, 36, 32, { fill: "#f6b26b" }); p.ell(-7, -10, 5, 6, { fill: K }); p.ell(7, -10, 5, 6, { fill: K }); p.ell(0, 0, 8, 6, { fill: K }); }
  };

  function arrow(p, x1, y1, x2, y2, col, curve) {
    var mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - (curve || 0);
    p.path("M" + x1 + " " + y1 + " Q" + mx + " " + my + " " + x2 + " " + y2, { stroke: col, strokeWidth: 2.2, roughness: 0.9 });
    var a = Math.atan2(y2 - my, x2 - mx), l = 13;
    p.path("M" + (x2 + l * Math.cos(a + 2.6)) + " " + (y2 + l * Math.sin(a + 2.6)) + " L" + x2 + " " + y2 + " L" + (x2 + l * Math.cos(a - 2.6)) + " " + (y2 + l * Math.sin(a - 2.6)), { stroke: col, strokeWidth: 2.2, roughness: 0.6 });
  }
  function text(svg, x, y, s, cls, anchor) {
    var t = node("text", { x: x, y: y, "class": cls, "text-anchor": anchor || "middle" }, svg); t.textContent = s; return t;
  }

  function scene(svg, seed) {
    var items = (svg.getAttribute("data-items") || "").split("|");
    items.forEach(function (it, n) {
      var a = it.trim().split(/\s+/), k = a[0];
      if (!k) return;
      var g0 = node("g", {}, svg), p0 = P(svg, g0, seed + n * 17);
      if (k === "t" || k === "s" || k === "h" || k === "r") {
        var cls = { t: "t-node", s: "t-sub", h: "t-center", r: "t-node" }[k];
        var el = text(svg, +a[1], +a[2], a.slice(3).join(" ").replace(/_/g, " "), cls);
        if (k === "r") el.setAttribute("style", "fill:" + red + ";font-size:40px;font-weight:700");
        return;
      }
      if (k === "a") { arrow(p0, +a[1], +a[2], +a[3], +a[4], a[6] === "r" ? red : biro, +(a[5] || 0)); return; }
      if (k === "d") { p0.path("M" + a[1] + " " + a[2] + "L" + a[3] + " " + a[4], { stroke: red, strokeWidth: 2, strokeLineDash: [8, 6] }); return; }
      if (k === "x") { p0.path("M" + (a[1] - 14) + " " + (a[2] - 14) + "L" + (+a[1] + 14) + " " + (+a[2] + 14) + "M" + (+a[1] + 14) + " " + (a[2] - 14) + "L" + (a[1] - 14) + " " + (+a[2] + 14), { stroke: red, strokeWidth: 3.4 }); return; }
      if (k === "v") { p0.path("M" + (a[1] - 14) + " " + a[2] + "L" + (a[1] - 3) + " " + (+a[2] + 12) + "L" + (+a[1] + 16) + " " + (a[2] - 14), { stroke: "#1f8a5b", strokeWidth: 3.6 }); return; }
      if (k === "line") { p0.path("M" + a[1] + " " + a[2] + "L" + a[3] + " " + a[4], { stroke: ink, strokeWidth: 1.8 }); return; }
      if (k === "ground") { p0.path("M" + a[1] + " " + a[2] + "L" + a[3] + " " + a[2], { stroke: "#7b828c", strokeWidth: 1.6 }); return; }
      var f = OBJ[k]; if (!f) return;
      var x = +a[1], y = +a[2], s = a[3] ? +a[3] : 1, v = a[4] ? +a[4] : 0, rot = a[5] ? +a[5] : 0;
      g0.setAttribute("transform", "translate(" + x + " " + y + ") rotate(" + rot + ") scale(" + s + ")");
      f(p0, v);
    });
  }

  function draw() {
    colors();
    [].forEach.call(document.querySelectorAll('svg[data-sketch="scene"]'), function (svg, i) {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      scene(svg, 11 + i * 101);
    });
  }
  window.drawScenes = draw;
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw); else draw();
  var btn = document.getElementById("themeBtn");
  if (btn) btn.addEventListener("click", function () { setTimeout(draw, 40); });
})();

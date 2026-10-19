/* Disegni "a mano" del quaderno: mappa degli autori e cicli 4C / TMI.
   Usa rough.js (incluso nel sito); senza rough.js disegna linee normali. */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var css = getComputedStyle(document.documentElement);
  var pencil = (css.getPropertyValue("--muted") || "#5b6474").trim();
  var biro = (css.getPropertyValue("--biro") || "#1f45b5").trim();
  var red = (css.getPropertyValue("--red") || "#c2362f").trim();

  function node(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function text(svg, x, y, str, cls, anchor) {
    var t = node("text", { x: x, y: y, "class": cls, "text-anchor": anchor || "middle" }, svg);
    t.textContent = str;
    return t;
  }
  function pen(svg, seed) {
    var rc = window.rough ? window.rough.svg(svg) : null;
    var base = { roughness: 1.4, bowing: 1.2, seed: seed || 3 };
    function opt(o) { var r = {}; for (var k in base) r[k] = base[k]; for (var j in o) r[j] = o[j]; return r; }
    return {
      line: function (x1, y1, x2, y2, o) {
        svg.appendChild(rc ? rc.line(x1, y1, x2, y2, opt(o)) :
          node("line", { x1: x1, y1: y1, x2: x2, y2: y2, stroke: (o && o.stroke) || pencil, "stroke-width": 1.6 }));
      },
      ellipse: function (cx, cy, w, h, o) {
        svg.appendChild(rc ? rc.ellipse(cx, cy, w, h, opt(o)) :
          node("ellipse", { cx: cx, cy: cy, rx: w / 2, ry: h / 2, fill: "none", stroke: (o && o.stroke) || pencil, "stroke-width": 2 }));
      },
      path: function (d, o) {
        svg.appendChild(rc ? rc.path(d, opt(o)) :
          node("path", { d: d, fill: "none", stroke: (o && o.stroke) || pencil, "stroke-width": 2 }));
      }
    };
  }
  function arrow(p, x, y, angle, color) {
    var a = angle * Math.PI / 180, l = 13;
    var a1 = a + 2.6, a2 = a - 2.6;
    p.path("M" + (x + l * Math.cos(a1)) + " " + (y + l * Math.sin(a1)) + " L" + x + " " + y + " L" + (x + l * Math.cos(a2)) + " " + (y + l * Math.sin(a2)),
      { stroke: color, strokeWidth: 2.2, roughness: 0.8 });
  }

  // Mappa: sei autori che convergono su Papert
  function map(svg) {
    var p = pen(svg, 7);
    var cx = 480, cy = 238;
    var nodes = [].slice.call(svg.parentNode.querySelectorAll("[data-node]")).map(function (li) {
      return { name: li.querySelector("b").textContent, idea: li.getAttribute("data-node").split("|") };
    });
    var pos = [[160, 64], [480, 50], [800, 64], [160, 360], [480, 372], [800, 360]];
    pos.forEach(function (q, i) {
      var top = q[1] < cy;
      var ey = top ? q[1] + 22 + nodes[i].idea.length * 21 : q[1] - 30;
      p.line(q[0] + (cx - q[0]) * 0.08, ey, cx + (q[0] - cx) * 0.33, cy + (top ? -36 : 36), { stroke: pencil, strokeWidth: 1.5 });
      text(svg, q[0], q[1], nodes[i].name, "t-name");
      nodes[i].idea.forEach(function (ln, k) { text(svg, q[0], q[1] + 24 + k * 21, ln, "t-idea"); });
    });
    p.ellipse(cx, cy, 300, 90, { stroke: red, strokeWidth: 2.2 });
    text(svg, cx, cy - 6, "Costruzionismo", "t-center");
    text(svg, cx, cy + 20, "Seymour Papert", "t-sub");
  }

  // Ciclo generico: parole su un cerchio, frecce tra una e l'altra
  function cycle(svg, words, subs, seed) {
    var p = pen(svg, seed);
    var W = 460, H = 300, cx = W / 2, cy = H / 2 + 4, rx = 150, ry = 104, n = words.length;
    var start = -90;
    var pts = words.map(function (w, i) {
      var a = (start + i * 360 / n) * Math.PI / 180;
      return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
    });
    for (var i = 0; i < n; i++) {
      var a1 = (start + i * 360 / n + (n === 4 ? 26 : 30)) * Math.PI / 180;
      var a2 = (start + (i + 1) * 360 / n - (n === 4 ? 26 : 30)) * Math.PI / 180;
      var x1 = cx + rx * Math.cos(a1), y1 = cy + ry * Math.sin(a1);
      var x2 = cx + rx * Math.cos(a2), y2 = cy + ry * Math.sin(a2);
      p.path("M" + x1 + " " + y1 + " A" + rx + " " + ry + " 0 0 1 " + x2 + " " + y2, { stroke: pencil, strokeWidth: 1.8 });
      var tang = Math.atan2(ry * Math.cos(a2), -rx * Math.sin(a2)) * 180 / Math.PI;
      arrow(p, x2, y2, tang, pencil);
    }
    pts.forEach(function (q, i) {
      p.ellipse(q[0], q[1] + (subs ? 4 : 0), words[i].length * 13 + 40, subs ? 58 : 46, { stroke: biro, strokeWidth: 1.8 });
      text(svg, q[0], q[1] + (subs ? 2 : 7), words[i], "t-node");
      if (subs) text(svg, q[0], q[1] + 22, subs[i], "t-sub");
    });
  }


  function items(svg) {
    return (svg.getAttribute("data-items") || "").split("|").map(function (it) {
      var parts = it.split("~");
      return { t: parts[0], s: parts[1] ? parts[1].split("/") : [] };
    });
  }
  function lines(svg, x, y, arr, cls, gap, anchor) {
    arr.forEach(function (ln, k) { text(svg, x, y + k * (gap || 20), ln, cls, anchor); });
  }

  // Scala (SAMR): gradini che salgono verso destra
  function ladder(svg) {
    var p = pen(svg, 13), it = items(svg), n = it.length;
    var W = 800, stepW = (W - 40) / n, stepH = 58, base = 330;
    it.forEach(function (o, i) {
      var x = 20 + i * stepW, top = base - (i + 1) * stepH;
      p.path("M" + x + " " + base + " L" + x + " " + top + " L" + (x + stepW) + " " + top,
        { stroke: i < 2 ? biro : red, strokeWidth: 2.4 });
      text(svg, x + 12, top - 14 - o.s.length * 19, o.t, "t-node", "start");
      lines(svg, x + 12, top - 10 - (o.s.length - 1) * 19, o.s, "t-sub", 19, "start");
    });
    p.line(20, base, W - 20, base, { stroke: pencil, strokeWidth: 1.6 });
    text(svg, 20 + stepW, base + 30, "migliorare", "t-sub", "middle");
    text(svg, 20 + 3 * stepW, base + 30, "trasformare", "t-sub", "middle");
    p.path("M" + (24) + " " + (base + 12) + " L" + (W / 2 - 8) + " " + (base + 12), { stroke: biro, strokeWidth: 1.4 });
    p.path("M" + (W / 2 + 8) + " " + (base + 12) + " L" + (W - 24) + " " + (base + 12), { stroke: red, strokeWidth: 1.4 });
  }

  // Tre lenti (UDL)
  function lenses(svg) {
    var p = pen(svg, 21), it = items(svg);
    var xs = [170, 400, 630], cols = [biro, (css.getPropertyValue("--green") || "#1f8a5b").trim() || "#1f8a5b", red];
    it.forEach(function (o, i) {
      p.ellipse(xs[i], 150, 250, 230, { stroke: cols[i] || biro, strokeWidth: 2.2 });
      text(svg, xs[i], 118, o.t, "t-node");
      lines(svg, xs[i], 148, o.s, "t-sub", 21);
    });
  }

  // Sequenza di riquadri con frecce
  function flow(svg) {
    var p = pen(svg, 31), it = items(svg), n = it.length;
    var bw = 220, gap = 60, W = n * bw + (n - 1) * gap, H = 190;
    svg.setAttribute("viewBox", "0 0 " + (W + 20) + " " + H);
    it.forEach(function (o, i) {
      var x = 10 + i * (bw + gap);
      p.path("M" + x + " 20 L" + (x + bw) + " 22 L" + (x + bw - 2) + " 170 L" + (x + 2) + " 168 Z", { stroke: i === n - 1 ? red : biro, strokeWidth: 2 });
      text(svg, x + bw / 2, 58, o.t, "t-node");
      lines(svg, x + bw / 2, 88, o.s, "t-sub", 20);
      if (i < n - 1) {
        p.line(x + bw + 8, 95, x + bw + gap - 8, 95, { stroke: pencil, strokeWidth: 1.8 });
        arrow(p, x + bw + gap - 8, 95, 0, pencil);
      }
    });
  }

  // Mappa mentale in stile Buzan: rami colorati che si assottigliano, parole sui rami
  function radial(svg) {
    var p = pen(svg, 41), it = items(svg), n = it.length - 1;
    var cx = 300, cy = 190;
    var cols = [biro, "#1f8a5b", red, "#c08a00", "#7a3fb0", "#0f7c8c"];
    var ew = Math.max(160, it[0].t.length * 15 + 50), erx = ew / 2, ery = 39;
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2 - Math.PI / 2 + 0.35;
      var c = cols[i % cols.length], dir = Math.cos(a) >= 0 ? 1 : -1;
      var x0 = cx + Math.cos(a) * (erx - 4), y0 = cy + Math.sin(a) * (ery - 3);
      var x1 = cx + Math.cos(a) * (erx + 70), y1 = cy + Math.sin(a) * 115;
      var x2 = x1 + dir * 95, y2 = y1 + 4;
      // tratto spesso vicino al centro, sottile verso l'esterno
      p.path("M" + x0 + " " + y0 + " Q" + (x0 + x1) / 2 + " " + (y1 + (y0 - y1) * 0.15) + " " + x1 + " " + y1, { stroke: c, strokeWidth: 6, roughness: 0.9 });
      p.path("M" + x1 + " " + y1 + " L" + x2 + " " + y2, { stroke: c, strokeWidth: 2.4, roughness: 0.8 });
      var t = text(svg, (x1 + x2) / 2, y1 - 8, it[i + 1].t, "t-node");
      t.setAttribute("style", "fill:" + c);
    }
    p.ellipse(cx, cy, ew, 78, { stroke: red, strokeWidth: 2.4, fill: "rgba(255,228,92,.55)", fillStyle: "hachure", hachureGap: 5 });
    text(svg, cx, cy + 8, it[0].t, "t-center");
  }

  // Mappa concettuale: gerarchia con legami etichettati su sfondo pulito
  function tree(svg) {
    var p = pen(svg, 51), it = items(svg);
    var top = it[0], kids = it.slice(1), n = kids.length;
    var paper = (css.getPropertyValue("--paper") || "#fdfdfb").trim();
    var tw = Math.max(170, top.t.length * 14 + 40);
    p.path("M" + (300 - tw / 2) + " 16 L" + (300 + tw / 2) + " 18 L" + (300 + tw / 2 - 2) + " 70 L" + (300 - tw / 2 + 2) + " 68 Z", { stroke: red, strokeWidth: 2.4, fill: "rgba(255,228,92,.5)", fillStyle: "hachure", hachureGap: 5 });
    text(svg, 300, 50, top.t, "t-node");
    kids.forEach(function (k, i) {
      var x = 100 + i * (400 / Math.max(n - 1, 1)), y = 250;
      p.line(300, 72, x, y - 28, { stroke: pencil, strokeWidth: 1.6 });
      arrow(p, x, y - 28, Math.atan2(y - 28 - 72, x - 300) * 180 / Math.PI, pencil);
    });
    kids.forEach(function (k, i) {
      var x = 100 + i * (400 / Math.max(n - 1, 1)), y = 250;
      var t = Math.abs(x - 300) < 5 ? 0.42 : 0.55, lx = 300 + (x - 300) * t, ly = 72 + (y - 100) * t;
      if (k.s[0]) {
        var w = k.s[0].length * 7.6 + 14;
        node("rect", { x: lx - w / 2, y: ly - 15, width: w, height: 22, rx: 4, fill: paper }, svg);
        text(svg, lx, ly + 1, k.s[0], "t-link");
      }
      var bw = Math.max(130, k.t.length * 12 + 30);
      p.path("M" + (x - bw / 2) + " " + (y - 26) + " L" + (x + bw / 2) + " " + (y - 24) + " L" + (x + bw / 2 - 1) + " " + (y + 22) + " L" + (x - bw / 2 + 1) + " " + (y + 20) + " Z", { stroke: biro, strokeWidth: 2 });
      text(svg, x, y + 5, k.t, "t-node");
    });
  }

  // Linea del tempo
  function timeline(svg) {
    var p = pen(svg, 61), it = items(svg), n = it.length;
    var x0 = 40, x1 = 860, y = 120;
    p.line(x0, y, x1, y, { stroke: pencil, strokeWidth: 2 });
    arrow(p, x1, y, 0, pencil);
    it.forEach(function (o, i) {
      var x = x0 + 60 + i * ((x1 - x0 - 160) / Math.max(n - 1, 1));
      p.ellipse(x, y, 16, 16, { stroke: red, strokeWidth: 2, fill: red, fillStyle: "solid" });
      text(svg, x, y - 26, o.t, "t-node");
      lines(svg, x, y + 38, o.s, "t-sub", 20);
    });
  }


  // Varianti verticali per schermi stretti
  function narrow(svg) { var w = svg.getBoundingClientRect().width; return (w || window.innerWidth) < 520 && window.innerWidth < 760; }
  function ladderV(svg) {
    var p = pen(svg, 13), it = items(svg), n = it.length, H = n * 95 + 40;
    svg.setAttribute("viewBox", "0 0 360 " + H);
    it.forEach(function (o, i) {
      var x = 20 + i * 36, y = H - 30 - (i + 1) * 95;
      p.path("M" + x + " " + (y + 95) + " L" + x + " " + y + " L" + (x + 150) + " " + y, { stroke: i < 2 ? biro : red, strokeWidth: 2.4 });
      text(svg, x + 12, y + 28, o.t, "t-node", "start");
      lines(svg, x + 12, y + 50, o.s, "t-sub", 19, "start");
    });
  }
  function timelineV(svg) {
    var p = pen(svg, 61), it = items(svg), n = it.length, H = n * 120 + 30;
    svg.setAttribute("viewBox", "0 0 360 " + H);
    p.line(30, 10, 30, H - 10, { stroke: pencil, strokeWidth: 2 });
    it.forEach(function (o, i) {
      var y = 40 + i * 120;
      p.ellipse(30, y, 16, 16, { stroke: red, strokeWidth: 2, fill: red, fillStyle: "solid" });
      text(svg, 56, y + 7, o.t, "t-node", "start");
      lines(svg, 56, y + 34, o.s, "t-sub", 21, "start");
    });
  }
  function lensesV(svg) {
    var p = pen(svg, 21), it = items(svg), cols = [biro, "#1f8a5b", red];
    svg.setAttribute("viewBox", "0 0 360 " + (it.length * 200 + 20));
    it.forEach(function (o, i) {
      var cy = 110 + i * 200;
      p.ellipse(180, cy, 300, 190, { stroke: cols[i] || biro, strokeWidth: 2.2 });
      text(svg, 180, cy - 22, o.t, "t-node");
      lines(svg, 180, cy + 8, o.s, "t-sub", 21);
    });
  }
  function flowV(svg) {
    var p = pen(svg, 31), it = items(svg), n = it.length, bh = 130, gap = 46;
    svg.setAttribute("viewBox", "0 0 360 " + (n * bh + (n - 1) * gap + 20));
    it.forEach(function (o, i) {
      var y = 10 + i * (bh + gap);
      p.path("M30 " + y + " L330 " + (y + 2) + " L328 " + (y + bh) + " L32 " + (y + bh - 2) + " Z", { stroke: i === n - 1 ? red : biro, strokeWidth: 2 });
      text(svg, 180, y + 40, o.t, "t-node");
      lines(svg, 180, y + 70, o.s, "t-sub", 20);
      if (i < n - 1) { p.line(180, y + bh + 6, 180, y + bh + gap - 6, { stroke: pencil, strokeWidth: 1.8 }); arrow(p, 180, y + bh + gap - 6, 90, pencil); }
    });
  }


  // Robot da pavimento a forma di ape, vista di tre quarti (come Bee-Bot)
  function bot(svg) {
    var p = pen(svg, 71);
    var dark = "#1d1f24", yellow = "#f5cf1d", yellow2 = "#ffe36a", orange = "#f26b21";
    var uid = "c" + Math.random().toString(36).slice(2, 8);
    // ombra
    p.ellipse(175, 222, 290, 26, { stroke: "none", fill: "rgba(0,0,0,.12)", fillStyle: "solid", roughness: 0.4 });
    // corpo a cupola
    var body = "M38 210 C 34 120, 100 50, 190 46 C 268 44, 318 110, 316 210 Z";
    p.path(body, { stroke: dark, strokeWidth: 2.4, fill: yellow, fillStyle: "solid" });
    // strisce nere tagliate sulla forma del corpo
    var defs = node("defs", {}, svg), cp = node("clipPath", { id: uid }, defs);
    node("path", { d: body }, cp);
    var g = node("g", { "clip-path": "url(#" + uid + ")" }, svg);
    var rc = window.rough ? window.rough.svg(svg) : null;
    [["M58 240 C 56 140, 110 64, 210 26", 20], ["M112 240 C 112 150, 160 86, 270 50", 20]].forEach(function (s) {
      var el = rc ? rc.path(s[0], { stroke: dark, strokeWidth: s[1], roughness: 0.8, seed: 9 }) : node("path", { d: s[0], stroke: dark, "stroke-width": s[1], fill: "none" });
      g.appendChild(el);
    });
    // base
    p.path("M40 206 L314 206 L312 216 L42 216 Z", { stroke: dark, strokeWidth: 1.8, fill: yellow2, fillStyle: "solid" });
    // muso
    p.ellipse(262, 150, 120, 112, { stroke: dark, strokeWidth: 2, fill: yellow2, fillStyle: "solid" });
    // occhi con palpebre
    [[236, 122], [290, 128]].forEach(function (e) {
      p.ellipse(e[0], e[1], 44, 44, { stroke: dark, strokeWidth: 2, fill: yellow, fillStyle: "solid" });
      p.ellipse(e[0] + 2, e[1] + 4, 30, 30, { stroke: dark, strokeWidth: 1.6, fill: "#ffffff", fillStyle: "solid" });
      p.ellipse(e[0] + 6, e[1] + 6, 11, 13, { stroke: dark, fill: dark, fillStyle: "solid" });
    });
    // sorriso
    p.path("M232 168 C 246 190, 282 192, 300 170", { stroke: dark, strokeWidth: 2.6, roughness: 0.7 });
    // tasti sul dorso: frecce arancioni, GO verde, tasti blu
    function chevron(cx, cy, ang) {
      var a = ang * Math.PI / 180, pts = [[10, 0], [-6, -9], [-6, 9]].map(function (q) {
        return [cx + q[0] * Math.cos(a) - q[1] * Math.sin(a), cy + q[0] * Math.sin(a) + q[1] * Math.cos(a)];
      });
      p.path("M" + pts.map(function (q) { return q[0].toFixed(1) + " " + q[1].toFixed(1); }).join(" L") + " Z", { stroke: dark, strokeWidth: 1.2, fill: orange, fillStyle: "solid", roughness: 0.5 });
    }
    var cx0 = 150, cy0 = 84, base = -28;
    [0, 180, -90, 90].forEach(function (d) {
      var a = (base + d) * Math.PI / 180;
      chevron(cx0 + Math.cos(a) * 22, cy0 + Math.sin(a) * 15, base + d);
    });
    p.ellipse(cx0, cy0, 15, 12, { stroke: dark, strokeWidth: 1.2, fill: "#3cb04a", fillStyle: "solid" });
    var ab = (base + 180) * Math.PI / 180;
    p.ellipse(cx0 + Math.cos(ab) * 46 - 8, cy0 + Math.sin(ab) * 30 + 10, 13, 10, { stroke: dark, strokeWidth: 1.2, fill: "#2f6fd6", fillStyle: "solid" });
    p.ellipse(cx0 + Math.cos(ab) * 46 + 10, cy0 + Math.sin(ab) * 30 - 8, 13, 10, { stroke: dark, strokeWidth: 1.2, fill: "#2f6fd6", fillStyle: "solid" });
  }

  // Kit di robotica a mattoncini (come LEGO Education SPIKE Essential)
  function kit(svg) {
    var p = pen(svg, 81);
    var dark = "#1d1f24", teal = "#38c4d6", white = "#fbfbfb";
    function box(x, y, w, h, d, fill) {
      var dx = d * 0.6, dy = -d * 0.4;
      p.path("M" + x + " " + y + " l" + w + " 0 l0 " + h + " l" + (-w) + " 0 Z", { stroke: dark, strokeWidth: 1.8, fill: fill, fillStyle: "solid" });
      p.path("M" + x + " " + y + " l" + dx + " " + dy + " l" + w + " 0 l" + (-dx) + " " + (-dy) + " Z", { stroke: dark, strokeWidth: 1.6, fill: fill, fillStyle: "solid" });
      p.path("M" + (x + w) + " " + y + " l" + dx + " " + dy + " l0 " + h + " l" + (-dx) + " " + (-dy) + " Z", { stroke: dark, strokeWidth: 1.6, fill: fill, fillStyle: "hachure", hachureGap: 3.5 });
    }
    function studs(x, y, w, d, nx, fill) {
      var dx = d * 0.6, dy = -d * 0.4;
      for (var r = 0; r < 2; r++) for (var c = 0; c < nx; c++) {
        var sx = x + (c + 0.5) * (w / nx) + (r + 0.5) * dx / 2, sy = y + (r + 0.5) * dy / 2;
        p.path("M" + (sx - 6) + " " + sy + " l0 -4 l12 0 l0 4", { stroke: dark, strokeWidth: 1.2, fill: fill, fillStyle: "solid", roughness: 0.4 });
        p.ellipse(sx, sy - 4, 12, 5, { stroke: dark, strokeWidth: 1.2, fill: fill, fillStyle: "solid", roughness: 0.4 });
      }
    }
    // mattoncino giallo 2x4 e piastra blu
    box(18, 214, 92, 30, 30, "#f5c518"); studs(18, 214, 92, 30, 4, "#f5c518");
    box(60, 160, 84, 12, 30, "#3d6fd6"); studs(60, 160, 84, 30, 4, "#3d6fd6");
    // matrice di luci 3x3
    box(150, 186, 48, 48, 10, white);
    var lc = ["#f4a259", "#9fd8a1", "#c7a3e0", "#f28da0", "#e63946", "#7cc4f2", "#ffd166", "#8f9ce8", "#f7a1c4"];
    for (var i = 0; i < 9; i++) {
      var lx = 155 + (i % 3) * 14, ly = 191 + Math.floor(i / 3) * 14;
      p.path("M" + lx + " " + ly + " l11 0 l0 11 l-11 0 Z", { stroke: dark, strokeWidth: 0.8, fill: lc[i], fillStyle: "solid", roughness: 0.3 });
    }
    // unità centrale (hub) bianca con tasto
    box(214, 132, 96, 96, 34, white);
    p.path("M248 196 l26 0 l0 20 l-26 0 Z", { stroke: dark, strokeWidth: 1.6, fill: "#e9edf3", fillStyle: "solid", roughness: 0.5 });
    p.line(261, 220, 261, 228, { stroke: teal, strokeWidth: 3 });
    text(svg, 236, 148, "A", "t-sub"); text(svg, 290, 148, "B", "t-sub");
    // sensore di colore sopra il hub
    box(262, 76, 44, 40, 18, white);
    p.ellipse(284, 96, 26, 26, { stroke: dark, strokeWidth: 2, fill: "#2b2d33", fillStyle: "solid" });
    p.ellipse(284, 96, 10, 10, { stroke: "#ffffff", strokeWidth: 1.6, fill: "#5b6474", fillStyle: "solid" });
    // due motori con il disco turchese
    [[350, 86], [350, 168]].forEach(function (m) {
      box(m[0], m[1], 70, 62, 26, white);
      p.ellipse(m[0] + 36, m[1] + 31, 50, 50, { stroke: dark, strokeWidth: 1.8, fill: teal, fillStyle: "solid" });
      p.line(m[0] + 30, m[1] + 31, m[0] + 42, m[1] + 31, { stroke: dark, strokeWidth: 2.6 });
      p.line(m[0] + 36, m[1] + 25, m[0] + 36, m[1] + 37, { stroke: dark, strokeWidth: 2.6 });
      for (var k = 0; k < 6; k++) {
        var a = k * Math.PI / 3;
        p.ellipse(m[0] + 36 + Math.cos(a) * 16, m[1] + 31 + Math.sin(a) * 16, 6, 6, { stroke: dark, strokeWidth: 1, fill: "#1f8fa0", fillStyle: "solid", roughness: 0.3 });
      }
    });
    // cavi
    p.path("M310 158 C 330 150, 330 118, 350 118", { stroke: "#9aa3b2", strokeWidth: 3 });
    p.path("M310 198 C 330 198, 330 200, 350 200", { stroke: "#9aa3b2", strokeWidth: 3 });
    // etichette
    text(svg, 70, 268, "mattoncini", "t-sub"); text(svg, 175, 268, "luci", "t-sub");
    text(svg, 262, 268, "hub", "t-sub"); text(svg, 390, 268, "motori", "t-sub"); text(svg, 284, 58, "sensore di colore", "t-sub");
  }

  function draw() {
    [].forEach.call(document.querySelectorAll("svg[data-sketch]"), function (svg) {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var k = svg.getAttribute("data-sketch");
      if (k === "map") map(svg);
      if (k === "c4") cycle(svg, ["Connetti", "Costruisci", "Contempla", "Continua"], null, 11);
      if (k === "tmi") cycle(svg, ["Think", "Make", "Improve"], ["pensa", "realizza", "migliora"], 5);
      var nr = narrow(svg);
      if (svg.getAttribute("data-vb")) svg.setAttribute("viewBox", svg.getAttribute("data-vb"));
      else svg.setAttribute("data-vb", svg.getAttribute("viewBox"));
      if (k === "ladder") (nr ? ladderV : ladder)(svg);
      if (k === "lenses") (nr ? lensesV : lenses)(svg);
      if (k === "flow") (nr ? flowV : flow)(svg);
      if (k === "radial") radial(svg);
      if (k === "tree") tree(svg);
      if (k === "timeline") (nr ? timelineV : timeline)(svg);
      if (k === "bot") bot(svg);
      if (k === "kit") kit(svg);
    });
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw); else draw();
  var lastW = window.innerWidth;
  window.addEventListener("resize", function () {
    if ((lastW < 1000) !== (window.innerWidth < 1000)) draw();
    lastW = window.innerWidth;
  });
  // ridisegna se cambia il tema (i colori vengono letti dalle variabili)
  var btn = document.getElementById("themeBtn");
  if (btn) btn.addEventListener("click", function () {
    setTimeout(function () {
      css = getComputedStyle(document.documentElement);
      pencil = css.getPropertyValue("--muted").trim(); biro = css.getPropertyValue("--biro").trim(); red = css.getPropertyValue("--red").trim();
      draw();
    }, 30);
  });
})();

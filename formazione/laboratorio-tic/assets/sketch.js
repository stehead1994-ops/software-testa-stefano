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

  // Mappa mentale: rami liberi dal centro
  function radial(svg) {
    var p = pen(svg, 41), it = items(svg), n = it.length - 1;
    var cx = 300, cy = 190;
    p.ellipse(cx, cy, 150, 70, { stroke: red, strokeWidth: 2.2 });
    text(svg, cx, cy + 7, it[0].t, "t-center");
    for (var i = 0; i < n; i++) {
      var a = (-150 + i * 300 / Math.max(n - 1, 1)) * Math.PI / 180;
      if (n > 1) a = (i / n) * Math.PI * 2 - Math.PI / 2 + 0.3;
      var x = cx + Math.cos(a) * 225, y = cy + Math.sin(a) * 150;
      var mx = cx + Math.cos(a + 0.25) * 120, my = cy + Math.sin(a + 0.25) * 85;
      p.path("M" + (cx + Math.cos(a) * 75) + " " + (cy + Math.sin(a) * 36) + " Q" + mx + " " + my + " " + (x - Math.cos(a) * 40) + " " + (y - Math.sin(a) * 14),
        { stroke: biro, strokeWidth: 2 });
      text(svg, x, y + 6, it[i + 1].t, "t-node");
    }
  }

  // Mappa concettuale: gerarchia con legami etichettati
  function tree(svg) {
    var p = pen(svg, 51), it = items(svg);
    var top = it[0], kids = it.slice(1), n = kids.length;
    p.path("M220 18 L380 20 L378 70 L222 68 Z", { stroke: red, strokeWidth: 2.2 });
    text(svg, 300, 51, top.t, "t-node");
    kids.forEach(function (k, i) {
      var x = 100 + i * (400 / Math.max(n - 1, 1)), y = 250;
      p.line(300, 72, x, y - 30, { stroke: pencil, strokeWidth: 1.6 });
      var lx = (300 + x) / 2, ly = (72 + y - 30) / 2;
      if (k.s[0]) text(svg, lx + (x < 300 ? -8 : x > 300 ? 8 : 6), ly, k.s[0], "t-sub", x < 300 ? "end" : "start");
      p.path("M" + (x - 75) + " " + (y - 28) + " L" + (x + 75) + " " + (y - 26) + " L" + (x + 74) + " " + (y + 22) + " L" + (x - 74) + " " + (y + 20) + " Z", { stroke: biro, strokeWidth: 2 });
      text(svg, x, y + 4, k.t, "t-node");
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
  function narrow(svg) { return svg.getBoundingClientRect().width < 520; }
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

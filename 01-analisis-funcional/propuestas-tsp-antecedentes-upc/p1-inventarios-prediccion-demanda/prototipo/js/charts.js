/* Gráficos SVG sin dependencias. Marcas finas, rejilla recesiva, etiquetas directas selectivas,
   tooltip con cursor vertical, tabla alternativa en cada gráfico y colores de la paleta validada (ver README). */
(function () {
  'use strict';
  var App = window.App, U = App.U, esc = U.esc;
  var C = (App.Charts = { reg: {} });
  var NS = 'http://www.w3.org/2000/svg';
  var COL = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)', 'var(--series-4)', 'var(--series-5)'];
  C.COL = COL;

  function nice(max, n) {
    if (max <= 0) return { max: 1, step: 0.25 };
    var raw = max / (n || 4), p = Math.pow(10, Math.floor(Math.log10(raw))), f = raw / p;
    var st = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
    return { max: Math.ceil(max / st) * st, step: st };
  }
  C.compact = function (v) { return Math.abs(v) >= 10000 ? (v / 1000).toFixed(v % 1000 ? 1 : 0).replace('.', ',') + ' mil' : U.num(v); };
  function legend(series) {
    if (series.length < 2) return '';
    return '<ul class="legend">' + series.map(function (s, i) { return '<li><i style="background:' + (s.color || COL[i]) + (s.dash ? ';height:3px;border-radius:2px' : '') + '"></i>' + esc(s.name) + '</li>'; }).join('') + '</ul>';
  }
  function wrap(cfg, plot, table) {
    return '<figure class="ch' + (cfg.cls ? ' ' + cfg.cls : '') + '"><figcaption><div><b>' + cfg.title + '</b>' + (cfg.sub ? '<span>' + cfg.sub + '</span>' : '') + '</div>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="ch.table" aria-pressed="false">' + App.ic('list', 14) + 'Ver tabla</button></figcaption>' +
      '<div class="ch-plot">' + plot + '</div><div class="ch-table">' + table + '</div>' + (cfg.note ? '<p class="ch-note">' + cfg.note + '</p>' : '') + '</figure>';
  }
  App.acts['ch.table'] = function (el) {
    var f = el.closest('figure'), on = f.classList.toggle('show-table');
    el.setAttribute('aria-pressed', on); el.lastChild.textContent = on ? 'Ver gráfico' : 'Ver tabla';
  };
  function tbl(head, rows) {
    return '<div class="tbl-wrap"><table><thead><tr>' + head.map(function (h, i) { return '<th' + (i ? ' class="right"' : '') + '>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return '<td' + (i ? ' class="right num"' : '') + '>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }

  /* ---------- líneas con cursor ---------- */
  C.line = function (id, cfg) {
    var W = 720, H = cfg.h || 240, m = { l: cfg.ml || 46, r: cfg.mr || 54, t: 14, b: 26 }, iw = W - m.l - m.r, ih = H - m.t - m.b, n = cfg.x.length;
    var all = []; cfg.series.forEach(function (s) { s.data.forEach(function (v) { if (v != null) all.push(v); }); });
    var lo = cfg.yMin != null ? cfg.yMin : Math.min(0, Math.min.apply(null, all)), hi = Math.max.apply(null, all.concat([1]));
    var nz = nice(hi - lo, 4), top = lo + nz.max;
    var X = function (i) { return m.l + (n < 2 ? iw / 2 : i * iw / (n - 1)); }, Y = function (v) { return m.t + ih - (v - lo) / (top - lo) * ih; };
    var g = '', i;
    for (var t = lo; t <= top + 1e-9; t += nz.step) g += '<line class="grid" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + Y(t) + '" y2="' + Y(t) + '"/><text class="axis" x="' + (m.l - 8) + '" y="' + (Y(t) + 4) + '" text-anchor="end">' + (cfg.fmtY ? cfg.fmtY(t) : C.compact(t)) + '</text>';
    var every = Math.max(1, Math.round(n / (cfg.ticks || 6)));
    for (i = 0; i < n; i += every) g += '<text class="axis" x="' + X(i) + '" y="' + (H - 6) + '" text-anchor="middle">' + esc(cfg.xl ? cfg.xl(i) : cfg.x[i]) + '</text>';
    g += '<line class="base" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + Y(lo) + '" y2="' + Y(lo) + '"/>';
    (cfg.bands || []).forEach(function (b) { g += '<rect x="' + X(b[0]) + '" y="' + m.t + '" width="' + Math.max(2, X(b[1]) - X(b[0])) + '" height="' + ih + '" fill="' + (b[2] || 'var(--bad)') + '" opacity=".1"><title>' + esc(b[3] || '') + '</title></rect>'; });
    cfg.series.forEach(function (s, k) {
      var col = s.color || COL[k], d = '', pen = false;
      s.data.forEach(function (v, j) { if (v == null) { pen = false; return; } d += (pen ? 'L' : 'M') + X(j).toFixed(1) + ' ' + Y(v).toFixed(1); pen = true; });
      if (s.area) g += '<path d="' + d + 'L' + X(n - 1) + ' ' + Y(lo) + 'L' + X(0) + ' ' + Y(lo) + 'Z" fill="' + col + '" opacity=".1"/>';
      g += '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' + (s.dash ? ' stroke-dasharray="5 4"' : '') + '/>';
      var last = -1; for (var j = s.data.length - 1; j >= 0; j--) if (s.data[j] != null) { last = j; break; }
      if (last >= 0 && s.label !== false) {
        g += '<circle cx="' + X(last) + '" cy="' + Y(s.data[last]) + '" r="4" fill="' + col + '" class="ring"/>';
        g += '<text class="dlabel" x="' + (X(last) + 8) + '" y="' + (Y(s.data[last]) + 4) + '">' + (cfg.fmtV ? cfg.fmtV(s.data[last]) : C.compact(s.data[last])) + '</text>';
      }
    });
    (cfg.marks || []).forEach(function (mk) {
      g += '<g class="mk" data-tip="' + esc(mk.tip) + '" tabindex="0"><circle cx="' + X(mk.i) + '" cy="' + Y(mk.y) + '" r="5" fill="' + (mk.color || 'var(--ink)') + '" class="ring"/><circle cx="' + X(mk.i) + '" cy="' + Y(mk.y) + '" r="13" fill="transparent"/></g>';
    });
    g += '<line class="xh" x1="0" x2="0" y1="' + m.t + '" y2="' + (H - m.b) + '" stroke="var(--ink-3)" stroke-width="1" style="display:none"/>';
    g += '<g class="xd"></g>';
    var plot = '<div class="ch-wrap"><svg class="svgc" data-ch="' + id + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" tabindex="0" aria-label="' + esc(cfg.title.replace(/<[^>]+>/g, '')) + '">' + g + '</svg><div class="ch-tip" hidden></div></div>' + legend(cfg.series);
    C.reg[id] = { cfg: cfg, m: m, W: W, H: H, X: X, Y: Y, n: n };
    var head = [esc(cfg.xTitle || 'Fecha')].concat(cfg.series.map(function (s) { return esc(s.name); })), rows = [];
    var step = Math.max(1, Math.ceil(n / 40));
    for (i = 0; i < n; i += step) rows.push([esc(cfg.xl ? cfg.xl(i) : cfg.x[i])].concat(cfg.series.map(function (s) { return s.data[i] == null ? '—' : (cfg.fmtV ? cfg.fmtV(s.data[i]) : U.num(s.data[i])); })));
    return wrap(cfg, plot, tbl(head, rows));
  };
  function moveCursor(svg, clientX) {
    var r = C.reg[svg.dataset.ch]; if (!r) return;
    var bb = svg.getBoundingClientRect(), x = (clientX - bb.left) / bb.width * r.W;
    var i = Math.round((x - r.m.l) / ((r.W - r.m.l - r.m.r) / Math.max(1, r.n - 1)));
    showAt(svg, r, Math.max(0, Math.min(r.n - 1, i)));
  }
  function showAt(svg, r, i) {
    var cfg = r.cfg, xh = svg.querySelector('.xh'), xd = svg.querySelector('.xd'), tip = svg.parentNode.querySelector('.ch-tip'), px = r.X(i);
    svg.dataset.i = i; xh.setAttribute('x1', px); xh.setAttribute('x2', px); xh.style.display = '';
    while (xd.firstChild) xd.removeChild(xd.firstChild);
    cfg.series.forEach(function (s, k) {
      if (s.data[i] == null) return;
      var c = document.createElementNS(NS, 'circle'); c.setAttribute('cx', px); c.setAttribute('cy', r.Y(s.data[i])); c.setAttribute('r', 4); c.setAttribute('fill', s.color || COL[k]); c.setAttribute('class', 'ring'); xd.appendChild(c);
    });
    tip.hidden = false; tip.textContent = '';
    var h = document.createElement('div'); h.className = 'ch-tip-h'; h.textContent = cfg.xl ? cfg.xl(i, true) : cfg.x[i]; tip.appendChild(h);
    cfg.series.forEach(function (s, k) {
      if (s.data[i] == null) return;
      var row = document.createElement('div'); row.className = 'ch-tip-r';
      var key = document.createElement('i'); key.style.background = s.color || COL[k]; row.appendChild(key);
      var v = document.createElement('b'); v.textContent = cfg.fmtV ? cfg.fmtV(s.data[i]) : U.num(s.data[i]); row.appendChild(v);
      var nm = document.createElement('span'); nm.textContent = s.name; row.appendChild(nm); tip.appendChild(row);
    });
    var pct = px / r.W, flip = pct > 0.62;
    tip.style.left = flip ? 'auto' : (pct * 100) + '%'; tip.style.right = flip ? ((1 - pct) * 100) + '%' : 'auto';
  }
  function hideCursor(svg) {
    var xh = svg.querySelector('.xh'), xd = svg.querySelector('.xd'), tip = svg.parentNode.querySelector('.ch-tip');
    if (xh) xh.style.display = 'none'; if (xd) while (xd.firstChild) xd.removeChild(xd.firstChild); if (tip) tip.hidden = true;
  }
  C.init = function () {
    document.addEventListener('pointermove', function (e) {
      var svg = e.target.closest && e.target.closest('svg[data-ch]');
      document.querySelectorAll('svg[data-ch]').forEach(function (s) { if (s !== svg && s.dataset.i != null) { hideCursor(s); delete s.dataset.i; } });
      if (svg && !e.target.closest('.mk')) moveCursor(svg, e.clientX);
    });
    document.addEventListener('keydown', function (e) {
      var svg = e.target.closest && e.target.closest('svg[data-ch]'); if (!svg || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
      var r = C.reg[svg.dataset.ch]; if (!r) return; e.preventDefault();
      var i = svg.dataset.i != null ? +svg.dataset.i : r.n - 1; i = Math.max(0, Math.min(r.n - 1, i + (e.key === 'ArrowRight' ? 1 : -1))); showAt(svg, r, i);
    });
    document.addEventListener('focusout', function (e) { var svg = e.target.closest && e.target.closest('svg[data-ch]'); if (svg && !svg.contains(e.relatedTarget)) { hideCursor(svg); delete svg.dataset.i; } });
  };

  /* ---------- columnas (simples o apiladas) ---------- */
  C.bars = function (id, cfg) {
    var W = 720, H = cfg.h || 200, m = { l: 40, r: 10, t: 16, b: 26 }, iw = W - m.l - m.r, ih = H - m.t - m.b, n = cfg.x.length;
    var ser = cfg.series, tot = cfg.x.map(function (_, i) { return U.sum(ser.map(function (s) { return s.data[i] || 0; })); });
    var nz = nice(Math.max.apply(null, tot.concat([1])), 4), Y = function (v) { return m.t + ih - v / nz.max * ih; }, band = iw / n, bw = Math.min(24, band * 0.62), g = '', i;
    for (var t = 0; t <= nz.max + 1e-9; t += nz.step) g += '<line class="grid" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + Y(t) + '" y2="' + Y(t) + '"/><text class="axis" x="' + (m.l - 8) + '" y="' + (Y(t) + 4) + '" text-anchor="end">' + C.compact(t) + '</text>';
    g += '<line class="base" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + Y(0) + '" y2="' + Y(0) + '"/>';
    var every = Math.max(1, Math.ceil(n / (cfg.ticks || 12))), maxI = tot.indexOf(Math.max.apply(null, tot));
    for (i = 0; i < n; i++) {
      var cx = m.l + band * i + band / 2, acc = 0, tipTxt = cfg.x[i] + ': ' + ser.map(function (s) { return s.name + ' ' + U.num(s.data[i] || 0); }).join(' · ');
      g += '<g class="col" tabindex="0" data-tip="' + esc(tipTxt) + '"><rect class="hit" x="' + (cx - band / 2) + '" y="' + m.t + '" width="' + band + '" height="' + (ih + 2) + '"/>';
      ser.forEach(function (s, k) {
        var v = s.data[i] || 0; if (!v) return;
        var y1 = Y(acc + v), y0 = Y(acc), h = Math.max(1, y0 - y1 - (acc ? 2 : 0)), isTop = k === ser.length - 1 || ser.slice(k + 1).every(function (z) { return !(z.data[i] || 0); });
        var col = s.color || COL[k], x0 = cx - bw / 2, r = isTop ? Math.min(4, h) : 0;
        g += '<path d="M' + x0 + ' ' + (y1 + h) + 'V' + (y1 + r) + (r ? 'Q' + x0 + ' ' + y1 + ' ' + (x0 + r) + ' ' + y1 + 'H' + (x0 + bw - r) + 'Q' + (x0 + bw) + ' ' + y1 + ' ' + (x0 + bw) + ' ' + (y1 + r) : 'H' + (x0 + bw)) + 'V' + (y1 + h) + 'Z" fill="' + col + '"/>';
        acc += v;
      });
      g += '</g>';
      if (i % every === 0) g += '<text class="axis" x="' + cx + '" y="' + (H - 6) + '" text-anchor="middle">' + esc(cfg.xl ? cfg.xl(i) : cfg.x[i]) + '</text>';
    }
    if (tot[maxI] > 0) g += '<text class="vlabel" x="' + (m.l + band * maxI + band / 2) + '" y="' + (Y(tot[maxI]) - 6) + '" text-anchor="middle">' + U.num(tot[maxI]) + '</text>';
    var plot = '<svg class="svgc" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(cfg.title.replace(/<[^>]+>/g, '')) + '">' + g + '</svg>' + legend(ser);
    var rows = cfg.x.map(function (x, i) { return [esc(x)].concat(ser.map(function (s) { return U.num(s.data[i] || 0); })); });
    return wrap(cfg, plot, tbl([esc(cfg.xTitle || 'Día')].concat(ser.map(function (s) { return esc(s.name); })), rows));
  };

  /* ---------- barras horizontales ---------- */
  C.hbars = function (cfg) {
    var mx = Math.max.apply(null, cfg.rows.map(function (r) { return r.v; }).concat([cfg.max || 0, 1e-9]));
    var h = '<div class="hbars">' + cfg.rows.map(function (r) {
      return '<div class="hb" data-tip="' + esc(r.tip || (r.l + ': ' + (cfg.fmt ? cfg.fmt(r.v) : r.v))) + '" tabindex="0"><span class="hb-l">' + esc(r.l) + '</span><span class="hb-t"><i class="hb-f" style="width:' + Math.max(0, r.v / mx * 100) + '%;background:' + (r.color || 'var(--series-1)') + '"></i></span><b class="hb-v">' + (cfg.fmt ? cfg.fmt(r.v) : U.num(r.v)) + '</b></div>';
    }).join('') + '</div>';
    return wrap(cfg, h, tbl([esc(cfg.head || 'Elemento'), esc(cfg.vhead || 'Valor')], cfg.rows.map(function (r) { return [esc(r.l), cfg.fmt ? cfg.fmt(r.v) : U.num(r.v)]; })));
  };

  /* ---------- barra segmentada (una parte del todo) ---------- */
  C.segbar = function (parts, tall) {
    var tot = U.sum(parts.map(function (p) { return p.v; })) || 1;
    var bar = '<div class="segbar' + (tall ? ' tall' : '') + '" role="img" aria-label="' + esc(parts.map(function (p) { return p.l + ' ' + p.v; }).join(', ')) + '">' + parts.filter(function (p) { return p.v > 0; }).map(function (p) {
      var pc = p.v / tot * 100;
      return '<i style="width:' + pc + '%;background:' + p.color + '" data-tip="' + esc(p.l + ': ' + p.v + ' (' + pc.toFixed(0) + '%)') + '" tabindex="0">' + (tall && pc >= 9 ? '<em style="color:' + (p.ink || '#fff') + '">' + pc.toFixed(0) + '%</em>' : '') + '</i>';
    }).join('') + '</div>';
    return bar + (tall ? '<ul class="legend">' + parts.map(function (p) { return '<li><i style="background:' + p.color + '"></i>' + esc(p.l) + '</li>'; }).join('') + '</ul>' : '');
  };

  /* ---------- mapa de calor (secuencial, un solo tono) ---------- */
  C.heat = function (id, cfg) {
    var steps = cfg.steps || [0.1, 0.25, 0.5, 1], cols = ['var(--seq-1)', 'var(--seq-2)', 'var(--seq-3)', 'var(--seq-4)', 'var(--seq-5)'], inks = ['#10243a', '#10243a', '#10243a', '#fff', '#fff'];
    var pick = function (v) { for (var i = 0; i < steps.length; i++) if (v <= steps[i]) return i; return steps.length; };
    var h = '<div class="heat" style="--cols:' + cfg.cols.length + '"><span class="heat-c0">' + esc(cfg.corner || '') + '</span>' + cfg.cols.map(function (c) { return '<span class="heat-ch">' + esc(c) + '</span>'; }).join('');
    cfg.rows.forEach(function (r, i) {
      h += '<span class="heat-rh">' + esc(r) + '</span>';
      cfg.v[i].forEach(function (v, j) {
        var k = v == null ? 0 : pick(v), t = cfg.tip(i, j, v);
        h += '<span class="heat-c" tabindex="0" data-tip="' + esc(t) + '" style="background:' + cols[k] + ';color:' + inks[k] + '">' + (v == null ? '—' : cfg.fmt(v)) + '</span>';
      });
    });
    h += '</div><ul class="legend">' + steps.map(function (s, i) { return '<li><i style="background:' + cols[i] + '"></i>' + (i ? '> ' + cfg.fmt(steps[i - 1]) + ' y ≤ ' : '≤ ') + cfg.fmt(s) + '</li>'; }).join('') + '<li><i style="background:' + cols[steps.length] + '"></i>> ' + cfg.fmt(steps[steps.length - 1]) + '</li></ul>';
    return wrap(cfg, h, tbl([esc(cfg.corner || '')].concat(cfg.cols.map(esc)), cfg.rows.map(function (r, i) { return [esc(r)].concat(cfg.v[i].map(function (v) { return v == null ? '—' : cfg.fmt(v); })); })));
  };

  C.spark = function (data, color, w, h) {
    w = w || 92; h = h || 26; var mx = Math.max.apply(null, data.concat([1e-9])), mn = Math.min.apply(null, data.concat([0]));
    var d = data.map(function (v, i) { return (i ? 'L' : 'M') + (i * (w - 6) / Math.max(1, data.length - 1) + 3).toFixed(1) + ' ' + (h - 3 - (v - mn) / (mx - mn || 1) * (h - 6)).toFixed(1); }).join('');
    var lx = (data.length - 1) * (w - 6) / Math.max(1, data.length - 1) + 3, ly = h - 3 - (data[data.length - 1] - mn) / (mx - mn || 1) * (h - 6);
    return '<svg class="spark" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true"><path d="' + d + '" fill="none" stroke="var(--ink-3)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="' + lx + '" cy="' + ly + '" r="3" fill="' + (color || 'var(--series-1)') + '" class="ring"/></svg>';
  };
})();

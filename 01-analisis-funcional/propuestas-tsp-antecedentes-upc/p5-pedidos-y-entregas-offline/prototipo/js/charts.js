/* Gráficos en SVG/HTML sin dependencias. Siguen las especificaciones de la skill dataviz:
   marcas finas, rejilla de 1 px, extremos redondeados de 4 px, leyenda siempre que hay 2+ series,
   etiquetas directas selectivas, tooltip por marca y vista de tabla. */
(function () {
  'use strict';
  var App = window.App, U = App.U, esc = U.esc;
  var C = (App.Charts = {});
  var SER = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)', 'var(--series-4)'];
  C.SER = SER;

  /* Tarjeta de gráfico con título, subtítulo y vista de tabla */
  C.card = function (o) {
    var id = 'ch' + Math.random().toString(36).slice(2, 8);
    var tbl = '';
    if (o.table) {
      tbl = '<div class="ch-table" hidden id="' + id + '-t"><table><thead><tr>' + o.table.cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        o.table.rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
    }
    return '<figure class="ch"' + (o.rf ? ' data-rf="' + o.rf + '"' : '') + '><figcaption><div><b>' + o.title + '</b>' + (o.sub ? '<span>' + o.sub + '</span>' : '') + '</div>' +
      (o.table ? '<button class="btn btn-ghost btn-sm" data-act="chart.table" data-t="' + id + '">Ver tabla</button>' : '') + '</figcaption>' +
      '<div class="ch-plot" id="' + id + '-p">' + o.body + '</div>' + tbl + (o.legend || '') + (o.note ? '<p class="ch-note">' + o.note + '</p>' : '') + '</figure>';
  };
  App.acts['chart.table'] = function (el) {
    var id = el.dataset.t, t = document.getElementById(id + '-t'), p = document.getElementById(id + '-p');
    var showT = t.hidden; t.hidden = !showT; p.hidden = showT; el.textContent = showT ? 'Ver gráfico' : 'Ver tabla';
  };
  C.legend = function (items) {
    return '<ul class="legend">' + items.map(function (it, i) { return '<li><i style="background:' + (it.color || SER[i]) + '"></i>' + esc(it.label) + '</li>'; }).join('') + '</ul>';
  };

  /* Barras horizontales ordenadas, una tonalidad, valor en la punta */
  C.hbars = function (items, o) {
    o = o || {};
    var max = o.max || Math.max.apply(null, items.map(function (i) { return i.value; }).concat([1]));
    var fmt = o.fmt || function (v) { return U.num(v); };
    return '<div class="hbars">' + items.map(function (it) {
      var w = Math.max(0.5, (it.value / max) * 100);
      return '<div class="hb" tabindex="0" data-tip="' + esc((it.tip || it.label + ': ' + fmt(it.value))) + '"><span class="hb-l">' + esc(it.label) + '</span><span class="hb-t"><span class="hb-f" style="width:' + w + '%;background:' + (it.color || o.color || SER[0]) + '"></span></span><span class="hb-v">' + fmt(it.value) + '</span></div>';
    }).join('') + '</div>';
  };

  /* Columnas verticales (SVG). items: [{label, value, tip, hi}] */
  C.columns = function (items, o) {
    o = o || {};
    var W = o.w || 520, H = o.h || 170, pl = 30, pb = 26, pt = 14, pr = 6;
    var max = o.max || Math.max.apply(null, items.map(function (i) { return i.value; }).concat([1]));
    var nice = Math.max(1, Math.ceil(max / 4) * 4), step = nice / 4;
    var iw = W - pl - pr, ih = H - pt - pb, band = iw / items.length, bw = Math.min(24, band * 0.62);
    var g = '';
    for (var t = 0; t <= 4; t++) {
      var y = pt + ih - (t * step / nice) * ih;
      g += '<line class="grid" x1="' + pl + '" x2="' + (W - pr) + '" y1="' + y + '" y2="' + y + '"/><text class="axis" x="' + (pl - 6) + '" y="' + (y + 3.5) + '" text-anchor="end">' + Math.round(t * step) + '</text>';
    }
    var bars = items.map(function (it, i) {
      var h = (it.value / nice) * ih, x = pl + band * i + (band - bw) / 2, y = pt + ih - h, r = Math.min(4, h);
      var col = it.color || o.color || SER[0];
      var path = h <= 0 ? '' : 'M' + x + ',' + (pt + ih) + 'V' + (y + r) + 'Q' + x + ',' + y + ' ' + (x + r) + ',' + y + 'H' + (x + bw - r) + 'Q' + (x + bw) + ',' + y + ' ' + (x + bw) + ',' + (y + r) + 'V' + (pt + ih) + 'Z';
      var lab = (o.showAll || it.hi) && it.value > 0 ? '<text class="vlabel" x="' + (x + bw / 2) + '" y="' + (y - 4) + '" text-anchor="middle">' + it.value + '</text>' : '';
      return '<g class="col" tabindex="0" data-tip="' + esc(it.tip || it.label + ': ' + it.value) + '"><rect class="hit" x="' + (pl + band * i) + '" y="' + pt + '" width="' + band + '" height="' + ih + '"/><path d="' + path + '" style="fill:' + col + '"/>' + lab + '<text class="axis" x="' + (x + bw / 2) + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(it.label) + '</text></g>';
    }).join('');
    return '<svg class="svgc" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.aria || 'Gráfico de columnas') + '">' + g + '<line class="base" x1="' + pl + '" x2="' + (W - pr) + '" y1="' + (pt + ih) + '" y2="' + (pt + ih) + '"/>' + bars + '</svg>';
  };

  /* Líneas (SVG) con etiqueta directa al final y tooltip por posición X */
  C.lines = function (labels, series, o) {
    o = o || {};
    var W = o.w || 520, H = o.h || 190, pl = 34, pb = 26, pt = 14, pr = 74;
    var all = [].concat.apply([], series.map(function (s) { return s.points; }));
    var max = o.max || Math.max.apply(null, all.concat([1]));
    var nice = Math.max(4, Math.ceil(max / 4) * 4), step = nice / 4;
    var iw = W - pl - pr, ih = H - pt - pb, n = labels.length;
    var X = function (i) { return pl + (n === 1 ? iw / 2 : (iw * i) / (n - 1)); };
    var Y = function (v) { return pt + ih - (v / nice) * ih; };
    var g = '';
    for (var t = 0; t <= 4; t++) { var y = Y(t * step); g += '<line class="grid" x1="' + pl + '" x2="' + (W - pr) + '" y1="' + y + '" y2="' + y + '"/><text class="axis" x="' + (pl - 6) + '" y="' + (y + 3.5) + '" text-anchor="end">' + Math.round(t * step) + '</text>'; }
    var xl = labels.map(function (l, i) { return '<text class="axis" x="' + X(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(l) + '</text>'; }).join('');
    var ln = series.map(function (s, k) {
      var col = s.color || SER[k];
      var d = s.points.map(function (v, i) { return (i ? 'L' : 'M') + X(i) + ',' + Y(v); }).join('');
      var last = s.points.length - 1;
      return '<path d="' + d + '" fill="none" style="stroke:' + col + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' +
        '<circle cx="' + X(last) + '" cy="' + Y(s.points[last]) + '" r="4" style="fill:' + col + '" class="ring"/>' +
        '<text class="dlabel" x="' + (X(last) + 9) + '" y="' + (Y(s.points[last]) + 4) + '">' + esc(s.points[last]) + ' ' + esc(s.short || '') + '</text>';
    }).join('');
    var hits = labels.map(function (l, i) {
      var tip = l + ': ' + series.map(function (s) { return s.name + ' ' + s.points[i]; }).join(', ');
      var w = n === 1 ? iw : iw / (n - 1);
      return '<rect class="hit" tabindex="0" x="' + (X(i) - w / 2) + '" y="' + pt + '" width="' + w + '" height="' + ih + '" data-tip="' + esc(tip) + '"/>';
    }).join('');
    return '<svg class="svgc" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.aria || 'Gráfico de líneas') + '">' + g + '<line class="base" x1="' + pl + '" x2="' + (W - pr) + '" y1="' + (pt + ih) + '" y2="' + (pt + ih) + '"/>' + xl + ln + hits + '</svg>';
  };

  C.spark = function (vals, o) {
    o = o || {}; var W = 84, H = 26, max = Math.max.apply(null, vals.concat([1])), min = Math.min.apply(null, vals.concat([0]));
    var X = function (i) { return 2 + (i * (W - 4)) / Math.max(1, vals.length - 1); }, Y = function (v) { return H - 3 - ((v - min) / Math.max(1, max - min)) * (H - 6); };
    var d = vals.map(function (v, i) { return (i ? 'L' : 'M') + X(i).toFixed(1) + ',' + Y(v).toFixed(1); }).join('');
    return '<svg class="spark" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" aria-hidden="true"><path d="' + d + '" fill="none" stroke="var(--ink-3)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="' + X(vals.length - 1) + '" cy="' + Y(vals[vals.length - 1]) + '" r="3" style="fill:' + (o.color || SER[0]) + '"/></svg>';
  };

  /* Barra segmentada fina (reparto dentro de una fila de tabla) */
  C.seg = function (parts, o) {
    o = o || {};
    var tot = parts.reduce(function (a, p) { return a + p.value; }, 0) || 1;
    return '<span class="segbar' + (o.tall ? ' tall' : '') + '" role="img" aria-label="' + esc(parts.map(function (p) { return p.label + ' ' + Math.round((p.value / tot) * 100) + '%'; }).join(', ')) + '">' +
      parts.filter(function (p) { return p.value > 0; }).map(function (p, i) {
        var pc = (p.value / tot) * 100;
        return '<i tabindex="0" style="width:' + pc + '%;background:' + (p.color || SER[i]) + '" data-tip="' + esc(p.label + ': ' + (o.fmt ? o.fmt(p.value) : p.value) + ' (' + Math.round(pc) + '%)') + '">' + (o.tall && pc > 14 ? '<em>' + Math.round(pc) + '%</em>' : '') + '</i>';
      }).join('') + '</span>';
  };

  /* Indicador de nivel del balón: el elemento memorable de la V6 */
  C.cyl = function (nivel, o) {
    o = o || {};
    var size = o.size || 38, lv = Math.max(U.clamp(nivel, 0, 1), 0.09);
    var cls = o.tipo === 'agua' ? 'agua' : 'gas';
    var low = lv <= 0.15;
    var h = 40 * lv; // altura de líquido sobre el interior
    var id = 'cy' + Math.random().toString(36).slice(2, 7);
    var body = 'M8 17a8 8 0 0 1 16 0v18a5 5 0 0 1-5 5h-6a5 5 0 0 1-5-5z';
    if (cls === 'agua') body = 'M10 8h12l3 7v21a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4V15z';
    return '<svg class="cyl ' + cls + (low ? ' low' : '') + '" width="' + size * 0.8 + '" height="' + size + '" viewBox="0 0 32 44" aria-hidden="true">' +
      '<defs><clipPath id="' + id + '"><path d="' + body + '"/></clipPath></defs>' +
      '<g clip-path="url(#' + id + ')"><rect class="cyl-bg" x="0" y="0" width="32" height="44"/><rect class="cyl-fill" x="0" y="' + (40 - h + 2) + '" width="32" height="' + (h + 4) + '"/></g>' +
      '<path class="cyl-line" d="' + body + '" fill="none"/>' +
      (cls === 'gas' ? '<path class="cyl-line" d="M12 3h8M13 3v3M19 3v3" fill="none"/>' : '<path class="cyl-line" d="M12 8V5h8v3" fill="none"/>') + '</svg>';
  };

  /* Intervalos de confianza (comparación aviso / control) */
  C.ci = function (rows, diff) {
    var W = 520, rowH = 34, pl = 150, pr = 24, H = rows.length * rowH + 74;
    var X = function (p) { return pl + p * (W - pl - pr); };
    var g = '';
    [0, 0.25, 0.5, 0.75, 1].forEach(function (t) { g += '<line class="grid" x1="' + X(t) + '" x2="' + X(t) + '" y1="8" y2="' + (rows.length * rowH + 10) + '"/><text class="axis" x="' + X(t) + '" y="' + (rows.length * rowH + 24) + '" text-anchor="middle">' + Math.round(t * 100) + '%</text>'; });
    var r = rows.map(function (row, i) {
      var y = 24 + i * rowH, col = row.color;
      return '<g tabindex="0" data-tip="' + esc(row.tip) + '"><text class="rowl" x="0" y="' + (y + 4) + '">' + esc(row.label) + '</text><line x1="' + X(row.lo) + '" x2="' + X(row.hi) + '" y1="' + y + '" y2="' + y + '" style="stroke:' + col + '" stroke-width="2" stroke-linecap="round"/><circle class="ring" cx="' + X(row.p) + '" cy="' + y + '" r="5" style="fill:' + col + '"/><text class="dlabel" x="' + X(row.p) + '" y="' + (y - 11) + '" text-anchor="middle">' + Math.round(row.p * 100) + '%</text></g>';
    }).join('');
    // eje de la diferencia (puntos porcentuales)
    var y0 = rows.length * rowH + 52, dMin = -0.2, dMax = 0.6, DX = function (v) { return pl + ((v - dMin) / (dMax - dMin)) * (W - pl - pr); };
    var gd = [-0.2, 0, 0.2, 0.4, 0.6].map(function (t) { return '<line class="' + (t === 0 ? 'zero' : 'grid') + '" x1="' + DX(t) + '" x2="' + DX(t) + '" y1="' + (y0 - 14) + '" y2="' + (y0 + 8) + '"/><text class="axis" x="' + DX(t) + '" y="' + (y0 + 22) + '" text-anchor="middle">' + (t > 0 ? '+' : '') + Math.round(t * 100) + '</text>'; }).join('');
    var inc = diff.lo > 0;
    var dr = '<g tabindex="0" data-tip="' + esc('Diferencia: ' + (diff.d * 100).toFixed(1) + ' puntos (IC 95%: ' + (diff.lo * 100).toFixed(1) + ' a ' + (diff.hi * 100).toFixed(1) + ')') + '"><text class="rowl" x="0" y="' + (y0 + 4) + '">Diferencia (puntos)</text><line x1="' + DX(diff.lo) + '" x2="' + DX(diff.hi) + '" y1="' + y0 + '" y2="' + y0 + '" style="stroke:var(--ink)" stroke-width="2" stroke-linecap="round"/><circle class="ring" cx="' + DX(diff.d) + '" cy="' + y0 + '" r="5" style="fill:var(--ink)"/></g>';
    return '<svg class="svgc" viewBox="0 0 ' + W + ' ' + (H + 20) + '" role="img" aria-label="Recompra a 30 días por grupo con intervalos de confianza">' + g + r + gd + dr + '</svg>';
  };
})();

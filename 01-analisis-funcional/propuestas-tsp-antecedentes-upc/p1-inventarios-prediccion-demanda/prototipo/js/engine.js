/* Motor del sistema: emparejamiento, libro de movimientos, confianza, pronóstico, reposición, ingesta UBL y pruebas.
   Todo corre en el navegador sobre datos simulados (D). No hay servidor. */
(function (root) {
  'use strict';
  var App = (root.App = root.App || {});
  var U = App.U;
  var E = (App.E = {});

  /* ================= normalización y similitud ================= */
  var STOP = { de: 1, x: 1, con: 1, para: 1, el: 1, la: 1, caja: 1, cja: 1, paquete: 1, paq: 1, pqt: 1, unidad: 1, bolsa: 1, saco: 1, rollo: 1, un: 1, c: 1, en: 1, por: 1 };
  var ABBR = { cem: 'cemento', tub: 'tubo', gl: 'galon', gln: 'galon', galon: 'galon', cja: 'caja', pqt: 'paquete', paq: 'paquete', und: 'unidad', unid: 'unidad', bol: 'bolsa', galv: 'galvanizada', glv: 'galvanizada', ceramico: 'ceramica', hex: 'hexagonal', termomagnetico: 'termico', diluyente: 'thinner', ahorrador: 'led', electrico: 'cable' };
  E.norm = function (s) {
    s = U.deacc(String(s == null ? '' : s)).toLowerCase();
    s = s.replace(/\btipo (i{1,3})\b/g, function (m, r) { return 'tipo ' + r.length; }).replace(/½/g, '1/2').replace(/¾/g, '3/4').replace(/¼/g, '1/4').replace(/°/g, 'g');
    s = s.replace(/["”″'`]/g, ' ').replace(/\bpulgadas?\b|\bpulg\b/g, ' ');
    s = s.replace(/\bmedia\b/g, '1/2').replace(/\btres cuartos\b/g, '3/4');
    s = s.replace(/[^a-z0-9\/\. ]+/g, ' ').replace(/(\d)\s*x\s*(\d)/g, '$1 x $2');
    return s.split(/\s+/).filter(Boolean).map(function (t) { return ABBR[t] || t; }).join(' ').trim();
  };
  function toks(n) { return n.split(' ').filter(function (t, i, a) { return t && !STOP[t] && a.indexOf(t) === i; }); }
  function measOf(tokens) {
    var m = [];
    tokens.forEach(function (t) {
      var x = t.match(/^(\d+(?:[\/.]\d+)?)(mm|m|kg|w|a|gl|oz|g|mt|lt|l)?$/);
      if (x) m.push(x[1]);
    });
    return m;
  }
  function trig(s) { var o = {}; s = '  ' + s + ' '; for (var i = 0; i < s.length - 2; i++) o[s.substr(i, 3)] = (o[s.substr(i, 3)] || 0) + 1; return o; }
  function cos(a, b) {
    var d = 0, na = 0, nb = 0, k;
    for (k in a) { na += a[k] * a[k]; if (b[k]) d += a[k] * b[k]; }
    for (k in b) nb += b[k] * b[k];
    return na && nb ? d / Math.sqrt(na * nb) : 0;
  }
  /* devuelve {s, reglas, sim, med} entre dos descripciones normalizadas */
  E.sim = function (na, nb) {
    var UN = /(mm|m|kg|w|a|gl|oz|g|mt|lt|l)$/;
    var ta = toks(na), tb = toks(nb), ma = measOf(ta), mb = measOf(tb);
    var wa = ta.filter(function (t) { return ma.indexOf(t.replace(UN, '')) < 0 && !/^\d/.test(t); });
    var wb = tb.filter(function (t) { return mb.indexOf(t.replace(UN, '')) < 0 && !/^\d/.test(t); });
    var inter = wa.filter(function (t) { return wb.indexOf(t) >= 0; }).length, uni = wa.length + wb.length - inter;
    var jac = uni ? inter / uni : 0, cont = wa.length ? inter / wa.length : 0, tri = cos(trig(na), trig(nb)), med = 1;
    /* las boletas suelen abreviar la descripción de la factura: se premia que lo escrito esté contenido en el candidato */
    if (ma.length) {
      if (mb.length) {
        var f = ma.filter(function (t) { return mb.indexOf(t) >= 0; }).length / ma.length;
        med = f === 1 ? (mb.length > ma.length ? 0.95 : 1) : 0.18 + 0.4 * f;
      } else med = 0.75;
    } else if (mb.length) med = 0.9;
    return { s: (0.35 * jac + 0.25 * cont + 0.4 * tri) * med, reglas: Math.max(jac, cont), sim: tri, med: med };
  };
  E.aliases = function (D, pid) {
    var p = D.prods[pid], a = [p.nombre, p.fact, p.bol];
    (D.aliasExtra && D.aliasExtra[pid] || []).forEach(function (x) { a.push(x); });
    return a;
  };

  /* cascada de emparejamiento. Devuelve {auto, cands, trace} */
  E.cascada = function (D, l, dir) {
    var trace = [], cands = [], auto = null, key, m;
    var provRuc = l.provRuc || null;
    key = dir === 'compra' ? 'C|' + provRuc + '|' + l.cod : 'V|' + E.norm(l.desc);
    m = D.mapas[key];
    if (m) {
      trace.push({ paso: 1, nombre: 'Mapa confirmado del comercio', ok: true, det: 'Clave «' + key.replace(/^[CV]\|/, '') + '» → ' + (m.prod === '__NOINV__' ? 'no es inventario' : D.prods[m.prod] ? D.prods[m.prod].nombre : m.prod) });
      return { auto: { prod: m.prod, factor: m.factor, via: 'mapa', origen: m.origen }, cands: [], trace: trace };
    }
    trace.push({ paso: 1, nombre: 'Mapa confirmado del comercio', ok: false, det: 'No hay mapa para «' + key.replace(/^[CV]\|/, '') + '»' });
    /* 2) GTIN o código SUNAT */
    var byG = null;
    if (l.gtin) D.prodList.forEach(function (p) { if (p.gtin && p.gtin === l.gtin) byG = p; });
    if (byG) { cands.push({ prod: byG.id, score: 0.99, via: 'GTIN ' + l.gtin }); trace.push({ paso: 2, nombre: 'GTIN o código SUNAT', ok: true, det: 'El GTIN ' + l.gtin + ' coincide con ' + byG.nombre + ' (queda como candidato: toda regla nueva se confirma una vez)' }); }
    else trace.push({ paso: 2, nombre: 'GTIN o código SUNAT', ok: false, det: l.gtin ? 'GTIN ' + l.gtin + ' sin coincidencias' : (l.sunat ? 'Código SUNAT ' + l.sunat + ' es de categoría, no identifica al producto' : 'La línea no trae GTIN ni código SUNAT') });
    /* 3) catálogo compartido */
    if (dir === 'compra' && l.cod) {
      var cs = D.compartido[provRuc + '|' + l.cod];
      if (cs && cs.estado === 'ok' && cs.n >= 2) {
        var own = D.prodList.filter(function (p) { return p.nombre === cs.nombre; })[0];
        if (own) {
          trace.push({ paso: 3, nombre: 'Catálogo compartido', ok: true, det: 'Confirmado por ' + cs.n + ' comercios: ' + cs.nombre + ' (factor ' + cs.factor + ')' });
          return { auto: { prod: own.id, factor: cs.factor, via: 'compartido', origen: 'compartido', n: cs.n }, cands: cands, trace: trace };
        }
        trace.push({ paso: 3, nombre: 'Catálogo compartido', ok: true, det: 'Confirmado por ' + cs.n + ' comercios como «' + cs.nombre + '», que este comercio aún no tiene en su catálogo' });
        cands.push({ prod: null, nuevo: cs.nombre, score: 0.9, via: 'compartido (' + cs.n + ' comercios)', factor: cs.factor });
      } else trace.push({ paso: 3, nombre: 'Catálogo compartido', ok: false, det: cs ? (cs.estado === 'conflicto' ? 'Hay un conflicto abierto para este código: espera a la curaduría' : 'Solo ' + cs.n + ' comercio lo confirmó (se exigen 2 o más)') : 'Ningún comercio ha confirmado este código' });
    } else trace.push({ paso: 3, nombre: 'Catálogo compartido', ok: false, det: dir === 'compra' ? 'La línea no trae código del vendedor' : 'Solo aplica a compras (código del proveedor)' });
    /* 4-5) reglas + similitud */
    var nd = E.norm(l.desc), best = {};
    D.prodList.forEach(function (p) {
      var top = null;
      E.aliases(D, p.id).forEach(function (a) { var r = E.sim(nd, E.norm(a)); if (!top || r.s > top.s) top = r; });
      if (top) best[p.id] = top;
    });
    var arr = Object.keys(best).map(function (id) { return { prod: id, score: best[id].s, via: 'reglas ' + Math.round(best[id].reglas * 100) + '% · similitud ' + Math.round(best[id].sim * 100) + '%' + (best[id].med < 1 ? ' · medidas distintas' : ''), r: best[id] }; })
      .sort(function (a, b) { return b.score - a.score; }).slice(0, 3);
    arr.forEach(function (c) { if (!cands.some(function (x) { return x.prod === c.prod; })) cands.push(c); });
    cands.sort(function (a, b) { return b.score - a.score; }); cands = cands.slice(0, 3);
    trace.push({ paso: 4, nombre: 'Reglas de normalización', ok: true, det: '«' + l.desc + '» → «' + nd + '» (abreviaturas, medidas y unidades)' });
    trace.push({ paso: 5, nombre: 'Similitud semántica', ok: arr.length > 0, det: arr.length ? 'Mejores: ' + arr.map(function (c) { return D.prods[c.prod].nombre + ' (' + Math.round(c.score * 100) + '%)'; }).join(' · ') : 'Sin candidatos' });
    return { auto: null, cands: cands, trace: trace };
  };
  E.factorSugerido = function (desc) {
    var s = String(desc).toLowerCase(), m;
    if ((m = s.match(/(?:cja|caja|paq|pqt|paquete|bolsa|saco|rollo)\s*x?\s*(\d{1,4})\b/))) return +m[1];
    if ((m = s.match(/\bx\s*(\d{1,4})\b/))) return +m[1];
    if ((m = s.match(/rollo\s*(\d+)\s*m/))) return +m[1];
    return 1;
  };

  /* ================= cachés y libro de movimientos ================= */
  E.touch = function (D) { D.rev++; };
  function cache(D) {
    if (D._crev !== D.rev) { D._crev = D.rev; D._idx = null; D._cnt = null; D._led = {}; D._ana = null; D._cal = null; D._sim = null; D._pp = null; }
  }
  E.di = function (date) { return U.diff(date, App.D0); };
  function build(D) {
    cache(D);
    if (D._idx) return;
    var idx = {}, cnt = {};
    D.lin.forEach(function (l) { if (l.est === 'emp' && l.prod && D.prods[l.prod]) (idx[l.prod] = idx[l.prod] || []).push(l); });
    D.conteos.forEach(function (c) { (cnt[c.prod] = cnt[c.prod] || []).push(c); });
    Object.keys(cnt).forEach(function (k) { cnt[k].sort(function (a, b) { return a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0; }); });
    D._idx = idx; D._cnt = cnt;
  }
  E.delta = function (l) { return (l.dir === 'compra' ? 1 : -1) * (l.sg || 1) * l.cant * (l.factor || 1); };
  E.led = function (D, pid) {
    build(D);
    if (D._led[pid]) return D._led[pid];
    var N = App.NDIAS, net = new Array(N).fill(0), ls = D._idx[pid] || [], cs = D._cnt[pid] || [], cAt = {};
    ls.forEach(function (l) { var d = E.di(l.fecha); if (d >= 0 && d < N) net[d] += E.delta(l); });
    cs.forEach(function (c) { cAt[E.di(c.fecha)] = c; });
    var run = null, daily = new Array(N), counts = [], first = null;
    for (var d = 0; d < N; d++) {
      if (run !== null) run += net[d];
      var c = cAt[d];
      if (c) {
        var te = run, delta = run === null ? null : c.contado - run;
        counts.push({ id: c.id, fecha: c.fecha, d: d, contado: c.contado, teorico: te, delta: delta, err: te === null ? null : Math.abs(delta) / Math.max(c.contado, 1), user: c.user });
        if (first === null) first = d;
        run = c.contado;
      }
      daily[d] = run;
    }
    var out = { daily: daily, counts: counts, now: daily[N - 1], first: first };
    return (D._led[pid] = out);
  };
  E.movs = function (D, pid) {
    var o = [];
    build(D);
    (D._idx[pid] || []).forEach(function (l) { o.push({ fecha: l.fecha, tipo: l.dir === 'compra' ? (l.sg < 0 ? 'Nota de crédito (compra)' : 'Compra') : (l.sg < 0 ? 'Devolución (NC)' : 'Venta'), q: E.delta(l), doc: l.comp, linea: l }); });
    E.led(D, pid).counts.forEach(function (c) { o.push({ fecha: c.fecha, tipo: c.delta === null ? 'Conteo inicial' : 'Conteo (ajuste)', q: c.delta === null ? c.contado : c.delta, doc: c.id, conteo: c }); });
    return o.sort(function (a, b) { return a.fecha < b.fecha ? 1 : a.fecha > b.fecha ? -1 : 0; });
  };
  E.confianza = function (D, pid) {
    var L = E.led(D, pid), N = App.NDIAS;
    if (L.now === null) return { nivel: 'desconocida', dias: null, err: null, motivo: 'Todavía no se ha contado este producto' };
    var last = L.counts[L.counts.length - 1], dias = N - 1 - last.d, err = last.err == null ? 0 : last.err;
    if (L.now < 0 || (L.now === 0 && dias > 2)) return { nivel: 'requiere', dias: dias, err: err, motivo: 'El stock teórico es ' + Math.round(L.now) + ': hace falta contar' };
    var nivel = dias <= 21 && err <= 0.20 ? 'alta' : dias <= 45 && err <= 0.40 ? 'media' : 'baja';
    var mot = 'Último conteo hace ' + dias + ' días, con diferencia de ' + U.pct(err);
    return { nivel: nivel, dias: dias, err: err, motivo: mot };
  };
  E.stockNow = function (D, pid) { return E.led(D, pid).now; };

  /* ================= series semanales, ABC, patrón ================= */
  function weeksCompleto() { return Math.floor(App.NDIAS / 7); }
  E.analisis = function (D) {
    cache(D);
    if (D._ana) return D._ana;
    build(D);
    var N = App.NDIAS, W = weeksCompleto(), A = { weekly: {}, cens: {}, abc: {}, pat: {}, met: {}, sel: {}, fc: {}, sigma: {}, seg: {}, rev: {}, W: W }, ids = D.prodList.map(function (p) { return p.id; });
    ids.forEach(function (pid) {
      var y = new Array(W).fill(0), ce = new Array(W).fill(false), rv = 0, L = E.led(D, pid);
      (D._idx[pid] || []).forEach(function (l) {
        var d = E.di(l.fecha), w = Math.floor(d / 7);
        if (l.dir === 'venta' && w < W) y[w] += (l.sg || 1) * l.cant;
        if (l.dir === 'venta' && d >= N - 91) rv += (l.sg || 1) * l.cant * l.vu;
      });
      for (var d = 0; d < W * 7; d++) if (L.daily[d] !== null && L.daily[d] <= 0) ce[Math.floor(d / 7)] = true;
      A.weekly[pid] = y; A.cens[pid] = ce; A.rev[pid] = rv;
    });
    var tot = U.sum(ids.map(function (i) { return A.rev[i]; })), acc = 0;
    ids.slice().sort(function (a, b) { return A.rev[b] - A.rev[a]; }).forEach(function (pid) {
      var before = acc / (tot || 1); acc += A.rev[pid];
      A.abc[pid] = before < 0.8 ? 'A' : before < 0.95 ? 'B' : 'C';
    });
    ids.forEach(function (pid) {
      var y = A.weekly[pid], nz = y.filter(function (v) { return v > 0; }), adi = nz.length ? y.length / nz.length : 99, m = U.mean(nz), cv2 = nz.length > 1 ? Math.pow(Math.sqrt(U.mean(nz.map(function (v) { return (v - m) * (v - m); }))) / m, 2) : 0;
      A.pat[pid] = { adi: adi, cv2: cv2, tipo: adi < 1.32 ? (cv2 < 0.49 ? 'suave' : 'errática') : (cv2 < 0.49 ? 'intermitente' : 'irregular') };
    });
    /* modelo global (regresión ridge sobre rezagos; en producción: LightGBM) */
    var feats = function (y, t) {
      var s = 0.5, k, z = 0; for (k = t - 8; k < t; k++) { s += y[k] / 8; if (y[k] === 0) z++; }
      return { x: [1, y[t - 1] / s, y[t - 2] / s, (y[t - 1] + y[t - 2] + y[t - 3] + y[t - 4]) / 4 / s, z / 8], s: s };
    };
    var XtX = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], Xty = [0, 0, 0, 0, 0], i, j;
    ids.forEach(function (pid) {
      var y = A.weekly[pid];
      for (var t = 8; t < W - 8; t++) {
        var f = feats(y, t), tg = y[t] / f.s;
        for (i = 0; i < 5; i++) { Xty[i] += f.x[i] * tg; for (j = 0; j < 5; j++) XtX[i][j] += f.x[i] * f.x[j]; }
      }
    });
    for (i = 0; i < 5; i++) XtX[i][i] += 1;
    var w = solve(XtX, Xty);
    var mGlobal = function (y) { if (y.length < 9) return U.mean(y); var f = feats(y, y.length); var p = 0; for (var q = 0; q < 5; q++) p += w[q] * f.x[q]; return Math.max(0, p * f.s); };
    A.methods = { naive: ['Ingenuo (última semana)', mNaive], ses: ['Suavizado exponencial (ETS simple)', mSES], croston: ['Croston', function (y) { return mCroston(y, false); }], sba: ['Croston-SBA', function (y) { return mCroston(y, true); }], tsb: ['TSB', mTSB], global: ['Modelo global (ridge; en producción LightGBM)', mGlobal] };
    var keys = Object.keys(A.methods), t0 = W - 8;
    ids.forEach(function (pid) {
      var y = A.weekly[pid], sc = 0;
      for (var t = 1; t < t0; t++) sc += Math.abs(y[t] - y[t - 1]);
      sc /= (t0 - 1);
      A.met[pid] = {};
      keys.forEach(function (k) {
        var f = A.methods[k][1], ea = 0, es = 0, sy = 0, se = 0, errs = [];
        for (var t = t0; t < W; t++) { var p = f(y.slice(0, t)), e = y[t] - p; ea += Math.abs(e); es += e; sy += y[t]; se += e * e; errs.push(e); }
        A.met[pid][k] = { mase: sc > 0 ? (ea / 8) / sc : null, wape: sy > 0 ? ea / sy : null, sesgo: sy > 0 ? es / sy : null, rmse: Math.sqrt(se / 8), ea: ea, sy: sy };
      });
    });
    /* selección por segmento (clase × patrón; si hay < 3 productos, solo patrón) */
    var segs = {};
    ids.forEach(function (pid) { var k1 = A.abc[pid] + ' · ' + A.pat[pid].tipo, k2 = A.pat[pid].tipo; (segs[k1] = segs[k1] || []).push(pid); (segs[k2] = segs[k2] || []).push(pid); });
    var pick = function (list) {
      var tabla = {}, bestK = null, bestV = 1e9;
      keys.forEach(function (k) {
        var v = list.map(function (pid) { return A.met[pid][k].mase; }).filter(function (x) { return x != null; });
        tabla[k] = v.length ? U.mean(v) : null;
        if (tabla[k] != null && tabla[k] < bestV - 1e-9) { bestV = tabla[k]; bestK = k; }
      });
      return { n: list.length, tabla: tabla, best: bestK || 'ses' };
    };
    Object.keys(segs).forEach(function (k) { A.seg[k] = pick(segs[k]); });
    ids.forEach(function (pid) {
      var k1 = A.abc[pid] + ' · ' + A.pat[pid].tipo, k2 = A.pat[pid].tipo, k = segs[k1].length >= 3 ? k1 : k2;
      var m = A.seg[k].best, y = A.weekly[pid];
      A.sel[pid] = { metodo: m, seg: k };
      A.fc[pid] = A.methods[m][1](y);
      var r = A.met[pid][m].rmse; A.sigma[pid] = r;
    });
    return (D._ana = A);
  };
  function solve(M, b) {
    var n = b.length, a = M.map(function (r, i) { return r.concat([b[i]]); }), i, j, k;
    for (i = 0; i < n; i++) {
      var p = i; for (k = i + 1; k < n; k++) if (Math.abs(a[k][i]) > Math.abs(a[p][i])) p = k;
      var t = a[i]; a[i] = a[p]; a[p] = t;
      for (k = i + 1; k < n; k++) { var f = a[k][i] / a[i][i]; for (j = i; j <= n; j++) a[k][j] -= f * a[i][j]; }
    }
    var x = new Array(n).fill(0);
    for (i = n - 1; i >= 0; i--) { var s = a[i][n]; for (j = i + 1; j < n; j++) s -= a[i][j] * x[j]; x[i] = s / a[i][i]; }
    return x;
  }
  function mNaive(y) { return y.length ? y[y.length - 1] : 0; }
  function mSES(y) {
    if (!y.length) return 0;
    var best = null, bl = 0, al = [0.1, 0.2, 0.3, 0.4, 0.5];
    al.forEach(function (a) { var l = y[0], sse = 0; for (var t = 1; t < y.length; t++) { sse += (y[t] - l) * (y[t] - l); l = l + a * (y[t] - l); } if (best == null || sse < best) { best = sse; bl = l; } });
    return bl;
  }
  function mCroston(y, sba) {
    var a = 0.1, z = null, p = null, q = 1;
    for (var t = 0; t < y.length; t++) {
      if (y[t] > 0) { if (z === null) { z = y[t]; p = q; } else { z = z + a * (y[t] - z); p = p + a * (q - p); } q = 1; } else q++;
    }
    if (z === null) return 0;
    return z / p * (sba ? 1 - a / 2 : 1);
  }
  function mTSB(y) {
    var a = 0.1, b = 0.1, z = null, p = 0, k = Math.min(y.length, 8), t;
    for (t = 0; t < k; t++) p += (y[t] > 0 ? 1 : 0) / (k || 1);
    for (t = 0; t < y.length; t++) {
      p = p + b * ((y[t] > 0 ? 1 : 0) - p);
      if (y[t] > 0) z = z === null ? y[t] : z + a * (y[t] - z);
    }
    return z === null ? 0 : p * z;
  }

  /* ================= calendario y reposición ================= */
  E.openDays = function (from, n) { var c = 0; for (var i = 0; i < n; i++) if (U.dow(U.addDays(from, i)) !== 0) c++; return c; };
  E.proxVisita = function (D, prov, desde) {
    var d = desde || App.HOY;
    for (var i = 0; i < 30; i++) { var x = U.addDays(d, i); if (App.isVisit(D.provs[prov] || prov, x)) return x; }
    return d;
  };
  var ZT = [[0.5, 0], [0.8, 0.8416], [0.85, 1.0364], [0.9, 1.2816], [0.95, 1.6449], [0.975, 1.96], [0.99, 2.3263]];
  E.z = function (p) {
    if (p <= ZT[0][0]) return 0; if (p >= ZT[ZT.length - 1][0]) return ZT[ZT.length - 1][1];
    for (var i = 1; i < ZT.length; i++) if (p <= ZT[i][0]) { var a = ZT[i - 1], b = ZT[i]; return a[1] + (b[1] - a[1]) * (p - a[0]) / (b[0] - a[0]); }
    return 2;
  };
  E.enTransito = function (D, pid) {
    var q = 0;
    D.pedidos.forEach(function (pd) { if (pd.estado === 'en_transito') pd.lineas.forEach(function (l) { if (l.prod === pid) q += l.qBase; }); });
    return q;
  };
  E.plazoReal = function (D, provId) {
    var v = [];
    D.pedidos.forEach(function (pd) { if (pd.prov === provId && pd.estado === 'facturado' && pd.facturaFecha) v.push(U.diff(pd.facturaFecha, pd.fecha)); });
    return v.length >= 3 ? U.median(v) : D.provs[provId].plazo;
  };
  E.plural = function (w, n) {
    if (n === 1 || /^(kg|m)$/.test(w)) return w;
    return /[dn]$/.test(w) ? w.replace('ón', 'on') + 'es' : w + 's';
  };
  E.cant = function (p, qC) {
    var u = E.plural(p.uc.split(' ')[0], qC), t = qC + ' ' + u;
    return p.factor > 1 ? t + ' (' + U.num(qC * p.factor) + ' ' + E.plural(p.ub, qC * p.factor) + ')' : t;
  };
  E.reponer = function (D, provId, opt) {
    opt = opt || {};
    var A = E.analisis(D), pv = D.provs[provId], hoy = App.HOY, V = E.proxVisita(D, provId), dtV = U.diff(V, hoy), R = pv.cada * 7;
    var Ld = opt.plazo != null ? opt.plazo : E.plazoReal(D, provId), out = [], noPedir = [], total = 0;
    D.prodList.filter(function (p) { return p.prov === provId; }).forEach(function (p) {
      var cf = E.confianza(D, p.id), st = E.stockNow(D, p.id), fc = A.fc[p.id] || 0, sg = A.sigma[p.id] || 0, cls = A.abc[p.id];
      var tr = E.enTransito(D, p.id), dayRate = fc / 6;
      var dV = dayRate * E.openDays(hoy, dtV), stockV = (st == null ? 0 : st) + tr - dV;
      var H = R + Ld, Dh = dayRate * E.openDays(V, Math.round(H)), z = E.z(D.cfg.nivel[cls]), ss = z * sg * Math.sqrt(H / 7);
      var objetivo = Dh + ss, need = objetivo - stockV, qC = need > 0.15 * p.factor || (need > 0 && p.factor === 1) ? Math.max(1, Math.ceil(need / p.factor)) : 0;
      var bloq = cf.nivel === 'baja' || cf.nivel === 'desconocida' || cf.nivel === 'requiere';
      var riesgo = stockV < 0.25 * fc ? 'alto' : stockV < 0.6 * fc ? 'medio' : 'bajo';
      var o = { prod: p.id, cls: cls, conf: cf, stock: st, tr: tr, fc: fc, sigma: sg, stockV: stockV, objetivo: objetivo, ss: ss, need: need, qC: qC, qBase: qC * p.factor, costo: qC * p.factor * p.costo, bloq: bloq, riesgo: riesgo, L: Ld, R: R, V: V, metodo: A.sel[p.id].metodo };
      o.explica = qC > 0
        ? 'Pide ' + E.cant(p, qC) + ': vendes ~' + U.dec(fc, fc < 10 ? 1 : 0) + ' por semana, el proveedor tarda ' + Ld + ' días y vuelve en ' + R + '; tienes ' + (st == null ? '?' : st <= 0 ? '0' : U.num(st)) + (tr ? ' y llegan ' + U.num(tr) : '') + '.'
        : 'No hace falta pedir: te alcanza para ' + (dayRate > 0 ? Math.round(Math.max(0, stockV + dV) / dayRate) : '—') + ' días hábiles' + (tr ? ' con lo que viene en camino' : '') + '.';
      if (qC > 0) out.push(o); else noPedir.push(o);
    });
    /* tope de caja: priorizar clase A y riesgo */
    var score = function (o) { return (o.riesgo === 'alto' ? 3 : o.riesgo === 'medio' ? 2 : 1) * 10 + (o.cls === 'A' ? 3 : o.cls === 'B' ? 2 : 1); };
    out.sort(function (a, b) { return score(b) - score(a) || b.costo - a.costo; });
    var tope = D.cfg.topeCaja, acc = 0, recortadas = 0;
    out.forEach(function (o) {
      if (o.bloq && !D.cfg.referencial) { o.recortada = false; return; }
      if (tope > 0 && acc + o.costo > tope) { o.recortada = true; recortadas++; return; }
      acc += o.costo;
    });
    total = acc;
    return { prov: pv, V: V, dtV: dtV, R: R, L: Ld, lineas: out, noPedir: noPedir, total: total, recortadas: recortadas, tope: tope };
  };
  E.quiebres = function (D) {
    var A = E.analisis(D), r = [];
    D.provList.forEach(function (pv) {
      var rp = E.reponer(D, pv.id);
      rp.lineas.concat(rp.noPedir).forEach(function (o) { if ((o.cls === 'A') && o.riesgo === 'alto' && o.conf.nivel !== 'desconocida') r.push(o); });
    });
    return r;
  };
  E.parados = function (D) {
    var last = {}, out = [], N = App.NDIAS;
    build(D);
    D.prodList.forEach(function (p) {
      var ls = D._idx[p.id] || [], ld = null;
      ls.forEach(function (l) { if (l.dir === 'venta' && (l.sg || 1) > 0 && (ld === null || l.fecha > ld)) ld = l.fecha; });
      var dias = ld ? U.diff(App.HOY, ld) : N, st = E.stockNow(D, p.id);
      if (dias >= D.cfg.diasParado && st != null && st > 0) out.push({ prod: p.id, dias: dias, ult: ld, stock: st, capital: st * p.costo });
    });
    return out.sort(function (a, b) { return b.capital - a.capital; });
  };

  /* ================= calidad de datos y desempeño ================= */
  E.calidad = function (D) {
    cache(D);
    if (D._cal) return D._cal;
    var c = { n: 0, emp: 0, pend: 0, gen: 0, noinv: 0, pendref: 0, vEmp: 0, vAll: 0, conCod: 0, conGtin: 0, conSunat: 0, nCompra: 0, nVenta: 0 };
    D.lin.forEach(function (l) {
      c.n++;
      if (l.est === 'emp') c.emp++; else if (l.est === 'pend') c.pend++; else if (l.est === 'gen') c.gen++; else if (l.est === 'noinv') c.noinv++; else if (l.est === 'pendref') c.pendref++;
      var v = l.cant * l.vu; c.vAll += v; if (l.est === 'emp' || l.est === 'pend') c.vEmp += v;
      if (l.dir === 'compra') { c.nCompra++; if (l.cod) c.conCod++; if (l.gtin) c.conGtin++; if (l.sunat) c.conSunat++; } else c.nVenta++;
    });
    var consid = c.n - c.noinv;
    c.ident = consid ? (c.emp + c.pend) / consid : 0; c.identV = c.vAll ? c.vEmp / c.vAll : 0;
    c.empPct = consid ? c.emp / consid : 0; c.genPct = consid ? c.gen / consid : 0; c.pendPct = consid ? c.pend / consid : 0;
    c.codPct = c.nCompra ? c.conCod / c.nCompra : 0; c.gtinPct = c.nCompra ? c.conGtin / c.nCompra : 0; c.sunatPct = c.nCompra ? c.conSunat / c.nCompra : 0;
    var A = E.analisis(D), errs = { A: [], B: [], C: [] };
    D.prodList.forEach(function (p) { E.led(D, p.id).counts.forEach(function (k) { if (k.err != null) errs[A.abc[p.id]].push(k.err); }); });
    c.errMed = { A: U.median(errs.A), B: U.median(errs.B), C: U.median(errs.C) }; c.nConteos = { A: errs.A.length, B: errs.B.length, C: errs.C.length };
    var tl = 0, ig = 0; D.pedidos.forEach(function (pd) { pd.lineas.forEach(function (l) { if (l.sugerido != null) { tl++; if (l.sugerido === l.qCompra) ig++; } }); });
    c.aceptacion = tl ? ig / tl : null; c.nAcept = tl;
    c.conXml = D.comp.filter(function (x) { return x.dir === 'compra'; }).length; c.sinXml = D.sinXml.length;
    c.xmlPct = c.conXml + c.sinXml ? c.conXml / (c.conXml + c.sinXml) : 1;
    return (D._cal = c);
  };
  E.veredicto = function (ident) {
    if (ident >= 0.8) return { k: 'ok', t: 'V7 viable', d: 'Más del 80% de las líneas es identificable.' };
    if (ident >= 0.6) return { k: 'warn', t: 'V7 con riesgo', d: 'Entre 60% y 80%: el stock teórico depende de contar más seguido.' };
    return { k: 'bad', t: 'Descartar V7', d: 'Menos de 60% identificable: volver a V2 (ventas del POS, modo planilla).' };
  };
  E.stockHash = function (D) {
    var s = D.prodList.map(function (p) { var l = E.led(D, p.id); return p.id + ':' + l.daily.map(function (v) { return v == null ? 'n' : Math.round(v); }).join(','); }).join('|');
    return U.hashHex(s);
  };

  /* ================= simulación de la política de reposición (objetivo 4) ================= */
  E.simPolitica = function (D, pid) {
    var A = E.analisis(D), p = D.prods[pid], T = D.truth[pid], N = App.NDIAS, pv = D.provs[p.prov], W = 12, d0 = N - W * 7;
    if (!T) return null;
    var res = {};
    ['ingenuo', 'sugerida'].forEach(function (pol) {
      var stock = T.stock[d0 - 1], ord = [], weeksQ = {}, perdido = 0, invDays = 0, dem = T.dem, ser = [];
      for (var d = d0; d < N; d++) {
        var date = D.dates[d];
        ord = ord.filter(function (o) { if (o.arr === d) { stock += o.q; return false; } return true; });
        if (App.isVisit(pv, date)) {
          var R = pv.cada * 7, L = pv.plazo, onO = U.sum(ord.map(function (o) { return o.q; })), q;
          if (pol === 'ingenuo') { var s = 0; for (var k = d - R; k < d; k++) s += dem[k] || 0; q = Math.max(0, s * (R + L) / R - stock - onO); }   // «pido lo que vendí la vez pasada»
          else {
            var W2 = Math.floor(d / 7), y = []; for (var w = 0; w < W2; w++) { var sm = 0; for (var x = w * 7; x < w * 7 + 7; x++) sm += dem[x] || 0; y.push(sm); }
            var fc = y.length > 10 ? A.methods[A.sel[pid].metodo][1](y) : U.mean(y), dr = fc / 6, H = R + L;
            var z = E.z(D.cfg.nivel[A.abc[pid]]), ss = z * (A.sigma[pid] || 0) * Math.sqrt(H / 7);
            q = Math.max(0, dr * E.openDays(date, H) + ss - stock - onO);
          }
          if (q > 0) { var qq = Math.ceil(q / p.factor) * p.factor; ord.push({ arr: d + L, q: qq }); }
        }
        var dm = dem[d] || 0;
        if (dm > stock) { perdido += dm - stock; weeksQ[Math.floor((d - d0) / 7)] = 1; stock = 0; } else stock -= dm;
        invDays += stock; ser.push(stock);
      }
      res[pol] = { semQ: Object.keys(weeksQ).length, perdido: perdido, invProm: invDays / (W * 7), ser: ser };
    });
    return res;
  };
  E.simTodo = function (D) {
    cache(D);
    if (D._sim) return D._sim;
    var A = E.analisis(D), o = { ingenuo: { A: 0, B: 0, C: 0, T: 0 }, sugerida: { A: 0, B: 0, C: 0, T: 0 }, n: { A: 0, B: 0, C: 0, T: 0 }, per: {}, perd: { ingenuo: 0, sugerida: 0 }, inv: { ingenuo: 0, sugerida: 0 } };
    D.prodList.forEach(function (p) {
      var r = E.simPolitica(D, p.id), c = A.abc[p.id]; if (!r) return;
      o.per[p.id] = r; o.n[c]++; o.n.T++;
      ['ingenuo', 'sugerida'].forEach(function (k) { o[k][c] += r[k].semQ; o[k].T += r[k].semQ; o.perd[k] += r[k].perdido * p.precio; o.inv[k] += r[k].invProm * p.costo; });
    });
    o.red = {}; ['A', 'B', 'C', 'T'].forEach(function (c) { o.red[c] = o.ingenuo[c] > 0 ? 1 - o.sugerida[c] / o.ingenuo[c] : null; });
    return (D._sim = o);
  };
  E.simUna = function (D, pid) { return E.simPolitica(D, pid); };

  /* ================= sensibilidad: error del stock según ruido y días sin contar ================= */
  E.sensibilidad = function (D) {
    var A = E.analisis(D), N = App.NDIAS, fr = [0, 0.1, 0.25, 0.4, 0.6], dd = [7, 14, 30, 60, 90];
    var aIds = D.prodList.filter(function (p) { return A.abc[p.id] === 'A' || A.abc[p.id] === 'B'; });
    build(D);
    var byP = {}; D.lin.forEach(function (l) { var pr = l.est === 'emp' ? l.prod : (l.est === 'pend' ? l.prodReal : null); if (pr) (byP[pr] = byP[pr] || []).push(l); });
    var base = E.calidad(D), h0 = 1 - base.ident, grid = [];
    dd.forEach(function (dias) {
      var row = [];
      fr.forEach(function (f, fi) {
        var errs = [];
        aIds.forEach(function (p) {
          var c0 = N - 1 - dias, T = D.truth[p.id]; if (!T || T.stock[N - 1] < 5) return;
          var stock = T.stock[c0], ls = byP[p.id] || [], th = stock;
          ls.forEach(function (l) {
            var d = E.di(l.fecha); if (d <= c0 || d >= N) return;
            if (f > 0 && l.dir === 'venta' && U.hash(l.comp + l.i + 'x') < f) return;       // línea que habría quedado sin identificar
            th += (l.dir === 'compra' ? 1 : -1) * (l.sg || 1) * l.cant * (l.factor && l.factor > 1 ? l.factor : (l.dir === 'compra' ? D.prods[p.id].factor : 1));
          });
          errs.push(Math.abs(th - T.stock[N - 1]) / Math.max(T.stock[N - 1], 1));
        });
        row.push({ f: f, h: 1 - (1 - h0) * (1 - f), dias: dias, err: U.median(errs), n: errs.length });
      });
      grid.push(row);
    });
    return { grid: grid, fr: fr, dd: dd, h0: h0 };
  };
  E.reconstruccion = function (D, pid) {
    var A = E.analisis(D), N = App.NDIAS, T = D.truth[pid], L = E.led(D, pid);
    return { real: T.stock, teorico: L.daily };
  };

  /* ================= XML UBL 2.1: escritura y lectura ================= */
  var NS = 'xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"';
  var NSNC = NS.replace('Invoice-2', 'CreditNote-2');
  function x(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  E.fakeDoc = function (comp) {
    var h = Math.floor(U.hash(comp.id) * 1e8);
    return comp.adq === 'RUC' ? { tipo: '6', num: '20' + String(h).padStart(9, '0').slice(0, 9), nombre: 'CONSTRUCTORA EJEMPLO ' + (h % 90 + 10) + ' S.A.C.' } : { tipo: '1', num: String(40000000 + h % 5000000), nombre: 'CLIENTE EJEMPLO ' + (h % 900 + 100) };
  };
  E.xmlOf = function (D, comp, o) {
    o = o || {};
    var isNC = comp.tipo === '07', root = isNC ? 'CreditNote' : 'Invoice', lt = isNC ? 'CreditNoteLine' : 'InvoiceLine', qt = isNC ? 'CreditedQuantity' : 'InvoicedQuantity';
    var em = comp.dir === 'venta' ? { ruc: D.comercio.ruc, nom: D.comercio.nombre } : (function () { var p = D.provList.filter(function (v) { return v.ruc === comp.ruc; })[0]; return { ruc: comp.ruc, nom: p ? p.nombre : 'PROVEEDOR ' + comp.ruc }; })();
    var ad = comp.dir === 'venta' ? (comp.adq ? E.fakeDoc(comp) : { tipo: '0', num: '-', nombre: 'CLIENTES VARIOS' }) : { tipo: '6', num: D.comercio.ruc, nombre: D.comercio.nombre };
    var supr = comp.dir === 'venta' && comp.adq && !o.pii;
    var s = '<?xml version="1.0" encoding="UTF-8"?>\n<' + root + ' ' + (isNC ? NSNC : NS) + '>\n  <cbc:UBLVersionID>2.1</cbc:UBLVersionID>\n  <cbc:CustomizationID>2.0</cbc:CustomizationID>\n  <cbc:ID>' + x(comp.id) + '</cbc:ID>\n  <cbc:IssueDate>' + comp.fecha + '</cbc:IssueDate>\n  <cbc:' + (isNC ? 'CreditNoteTypeCode' : 'InvoiceTypeCode') + '>' + comp.tipo + '</cbc:' + (isNC ? 'CreditNoteTypeCode' : 'InvoiceTypeCode') + '>\n  <cbc:DocumentCurrencyCode>' + comp.mon + '</cbc:DocumentCurrencyCode>\n';
    if (isNC) s += '  <cac:BillingReference><cac:InvoiceDocumentReference><cbc:ID>' + x(comp.ref || '') + '</cbc:ID></cac:InvoiceDocumentReference></cac:BillingReference>\n';
    s += '  <cac:AccountingSupplierParty><cac:Party><cac:PartyIdentification><cbc:ID schemeID="6">' + em.ruc + '</cbc:ID></cac:PartyIdentification><cac:PartyLegalEntity><cbc:RegistrationName>' + x(em.nom) + '</cbc:RegistrationName></cac:PartyLegalEntity></cac:Party></cac:AccountingSupplierParty>\n';
    s += '  <cac:AccountingCustomerParty><cac:Party><cac:PartyIdentification><cbc:ID schemeID="' + ad.tipo + '">' + (supr ? '[suprimido]' : ad.num) + '</cbc:ID></cac:PartyIdentification><cac:PartyLegalEntity><cbc:RegistrationName>' + (supr ? '[suprimido]' : x(ad.nombre)) + '</cbc:RegistrationName></cac:PartyLegalEntity></cac:Party></cac:AccountingCustomerParty>\n';
    for (var i = comp.l0, n = 1; i < comp.l1; i++, n++) {
      var l = D.lin[i];
      s += '  <cac:' + lt + '>\n    <cbc:ID>' + n + '</cbc:ID>\n    <cbc:' + qt + ' unitCode="' + l.un + '">' + l.cant + '</cbc:' + qt + '>\n    <cbc:LineExtensionAmount currencyID="' + comp.mon + '">' + (l.cant * l.vu).toFixed(2) + '</cbc:LineExtensionAmount>\n    <cac:Item>\n      <cbc:Description>' + x(l.desc) + '</cbc:Description>\n';
      if (l.cod) s += '      <cac:SellersItemIdentification><cbc:ID>' + x(l.cod) + '</cbc:ID></cac:SellersItemIdentification>\n';
      if (l.gtin) s += '      <cac:StandardItemIdentification><cbc:ID schemeID="GTIN">' + l.gtin + '</cbc:ID></cac:StandardItemIdentification>\n';
      if (l.sunat) s += '      <cac:CommodityClassification><cbc:ItemClassificationCode listID="UNSPSC">' + l.sunat + '</cbc:ItemClassificationCode></cac:CommodityClassification>\n';
      s += '    </cac:Item>\n    <cac:Price><cbc:PriceAmount currencyID="' + comp.mon + '">' + l.vu.toFixed(l.vu < 1 ? 3 : 2) + '</cbc:PriceAmount></cac:Price>\n  </cac:' + lt + '>\n';
    }
    return s + '</' + root + '>\n';
  };
  function kids(el, name) { var o = []; for (var c = el.firstElementChild; c; c = c.nextElementSibling) if (c.localName === name) o.push(c); return o; }
  function path(el, p) {
    var cur = el, parts = p.split('/');
    for (var i = 0; i < parts.length && cur; i++) cur = kids(cur, parts[i])[0] || null;
    return cur;
  }
  function tx(el, p) { var n = p ? path(el, p) : el; return n ? n.textContent.trim() : ''; }
  E.parseUBL = function (text) {
    if (!text || typeof text !== 'string') return { ok: false, err: 'Archivo vacío' };
    if (text.length > 2000000) return { ok: false, err: 'El archivo supera el límite de 2 MB', code: 'tam' };
    if (/<!DOCTYPE|<!ENTITY/i.test(text)) return { ok: false, err: 'Se rechazó: contiene DOCTYPE o ENTITY (prevención de XXE)', code: 'xxe' };
    var doc;
    try { doc = new root.DOMParser().parseFromString(text, 'application/xml'); } catch (e) { return { ok: false, err: 'No se pudo leer el XML' }; }
    if (doc.getElementsByTagName('parsererror').length) return { ok: false, err: 'XML mal formado', code: 'xml' };
    var r = doc.documentElement, rn = r.localName;
    if (rn !== 'Invoice' && rn !== 'CreditNote') return { ok: false, err: 'No es una factura, boleta ni nota de crédito UBL 2.1 (raíz «' + rn + '»)', code: 'raiz' };
    var id = tx(r, 'ID'), m = id.match(/^([A-Z0-9]{4})-(\d{1,8})$/);
    if (!m) return { ok: false, err: 'El identificador «' + id + '» no tiene el formato serie-número', code: 'id' };
    var isNC = rn === 'CreditNote', lt = isNC ? 'CreditNoteLine' : 'InvoiceLine', qn = isNC ? 'CreditedQuantity' : 'InvoicedQuantity';
    var sp = path(r, 'AccountingSupplierParty/Party'), cp = path(r, 'AccountingCustomerParty/Party');
    var out = {
      ok: true, id: id, serie: m[1], num: +m[2], fecha: tx(r, 'IssueDate'), tipo: isNC ? '07' : (tx(r, 'InvoiceTypeCode') || '01'), mon: tx(r, 'DocumentCurrencyCode') || 'PEN',
      emisor: { ruc: sp ? tx(sp, 'PartyIdentification/ID') : '', nombre: sp ? tx(sp, 'PartyLegalEntity/RegistrationName') : '' },
      adq: cp ? { tipo: (path(cp, 'PartyIdentification/ID') || { getAttribute: function () { return ''; } }).getAttribute('schemeID'), num: tx(cp, 'PartyIdentification/ID'), nombre: tx(cp, 'PartyLegalEntity/RegistrationName') } : null,
      ref: tx(r, 'BillingReference/InvoiceDocumentReference/ID'), lines: [], avisos: []
    };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(out.fecha)) return { ok: false, err: 'Fecha de emisión inválida', code: 'fecha' };
    if (!/^\d{11}$/.test(out.emisor.ruc)) return { ok: false, err: 'RUC del emisor inválido', code: 'ruc' };
    var ls = kids(r, lt);
    if (!ls.length) return { ok: false, err: 'El comprobante no tiene líneas', code: 'lineas' };
    if (ls.length > 500) return { ok: false, err: 'Demasiadas líneas (límite 500)', code: 'tam' };
    ls.forEach(function (ln, n) {
      var qe = kids(ln, qn)[0], it = path(ln, 'Item');
      out.lines.push({
        n: n + 1, cant: qe ? parseFloat(qe.textContent) : NaN, un: qe ? qe.getAttribute('unitCode') || 'NIU' : 'NIU', monto: parseFloat(tx(ln, 'LineExtensionAmount')) || 0,
        desc: it ? tx(it, 'Description') : '', cod: it ? tx(it, 'SellersItemIdentification/ID') : '', gtin: it ? tx(it, 'StandardItemIdentification/ID') : '', sunat: it ? tx(it, 'CommodityClassification/ItemClassificationCode') : '',
        vu: parseFloat(tx(ln, 'Price/PriceAmount'))
      });
    });
    var bad = out.lines.filter(function (l) { return !(l.cant > 0) || !l.desc; });
    if (bad.length) return { ok: false, err: 'Línea ' + bad[0].n + ': falta la cantidad o la descripción', code: 'linea' };
    out.lines.forEach(function (l) { if (!(l.vu >= 0)) l.vu = l.monto / l.cant; });
    return out;
  };
  E.GENERICAS = ['varios', 'producto', 'mercaderia', 'ferreteria', 'venta', 'articulo', 'item', 'productos varios'];
  E.esGenerica = function (desc) { var n = E.norm(desc); return n.length < 4 || E.GENERICAS.indexOf(n) >= 0; };

  /* ================= ingesta ================= */
  E.audit = function (D, user, acc, det) { D.audit.unshift({ t: App.HOY + ' ' + (new Date().toTimeString().slice(0, 5)), user: user || 'Sistema', acc: acc, det: det }); if (D.audit.length > 200) D.audit.pop(); };
  E.ingest = function (D, text, src, nombre) {
    var P = E.parseUBL(text), log = { t: App.HOY, src: src || 'carga', nombre: nombre || '(sin nombre)' };
    D.rech = D.rech || [];
    if (!P.ok) { log.estado = 'invalido'; log.motivo = P.err; log.code = P.code; D.rech.unshift(log); E.touch(D); return { estado: 'invalido', motivo: P.err, code: P.code }; }
    var dir = P.emisor.ruc === D.comercio.ruc ? 'venta' : (P.adq && P.adq.num === D.comercio.ruc ? 'compra' : null);
    log.id = P.id;
    if (!dir) { log.estado = 'rechazado'; log.motivo = 'No involucra el RUC del comercio (' + P.emisor.ruc + ' → ' + (P.adq ? P.adq.num : '—') + ')'; D.rech.unshift(log); E.touch(D); return { estado: 'rechazado', motivo: log.motivo, id: P.id }; }
    if (!(P.fecha >= App.D0 && P.fecha <= App.HOY)) { log.estado = 'rechazado'; log.motivo = 'La fecha ' + P.fecha + ' está fuera del período del historial'; D.rech.unshift(log); E.touch(D); return { estado: 'rechazado', motivo: log.motivo, id: P.id }; }
    var key = P.emisor.ruc + '|' + P.tipo + '|' + P.serie + '|' + P.num;
    D._keys = D._keys || {};
    if (!D._keys._built) { D.comp.forEach(function (c) { D._keys[c.ruc + '|' + c.tipo + '|' + c.serie + '|' + c.num] = 1; }); D._keys._built = 1; }
    if (D._keys[key]) { log.estado = 'duplicado'; log.motivo = 'Clave RUC + tipo + serie + número ya procesada (idempotencia)'; D.rech.unshift(log); D.dups = (D.dups || 0) + 1; return { estado: 'duplicado', motivo: log.motivo, id: P.id }; }
    D._keys[key] = 1;
    var supr = dir === 'venta' && P.adq && P.adq.tipo !== '0';
    var comp = { id: P.id, tipo: P.tipo, dir: dir, ruc: P.emisor.ruc, serie: P.serie, num: P.num, fecha: P.fecha, mon: P.mon, estado: 'procesado', src: src || 'carga', adq: supr ? (P.adq.tipo === '6' ? 'RUC' : 'DNI') : null, l0: D.lin.length, l1: 0, total: 0, ref: P.ref || null };
    var res = { estado: 'ok', id: P.id, dir: dir, emp: 0, pend: 0, gen: 0, avisos: [], comp: comp, auto: [] };
    var refc = isNCref(D, P);
    P.lines.forEach(function (l) {
      var o = { i: D.lin.length, comp: P.id, fecha: P.fecha, desc: l.desc, cod: l.cod || null, gtin: l.gtin || null, sunat: l.sunat || null, un: l.un, cant: l.cant, vu: l.vu, prod: null, factor: 1, est: 'pend', dir: dir, sg: P.tipo === '07' ? -1 : 1 };
      comp.total += l.cant * l.vu;
      if (dir === 'venta' && E.esGenerica(l.desc)) { o.est = 'gen'; res.gen++; }
      else {
        var c = E.cascada(D, { desc: l.desc, cod: l.cod, gtin: l.gtin, sunat: l.sunat, provRuc: dir === 'compra' ? P.emisor.ruc : null }, dir);
        if (c.auto) {
          if (c.auto.prod === '__NOINV__') { o.est = 'noinv'; }
          else { o.est = 'emp'; o.prod = c.auto.prod; o.factor = c.auto.factor; o.via = c.auto.via; if (c.auto.via !== 'mapa') res.auto.push(l.desc + ' → ' + D.prods[c.auto.prod].nombre + ' (' + c.auto.via + ')'); }
        }
      }
      if (o.est === 'emp') res.emp++; else if (o.est === 'pend') res.pend++;
      if (P.tipo === '07' && o.est === 'emp') {
        if (!refc) { o.est = 'pendref'; res.emp--; res.avisos.push('La nota de crédito referencia «' + P.ref + '», que no está en el sistema: queda pendiente.'); }
        else {
          var disp = 0; for (var k = refc.l0; k < refc.l1; k++) { var rl = D.lin[k]; if (rl.prod === o.prod && rl.est === 'emp') disp += rl.cant * (rl.factor || 1); }
          var qb = o.cant * (o.factor || 1);
          if (qb > disp + 1e-9) { res.avisos.push('Se recortó «' + l.desc + '»: la nota pedía ' + qb + ' y el original tiene ' + disp + ' (RN-02).'); o.cant = disp / (o.factor || 1); }
        }
      }
      D.lin.push(o);
    });
    comp.l1 = D.lin.length; comp.total = Math.round(comp.total * 100) / 100;
    D.comp.push(comp);
    if (dir === 'venta') comp.xmlGuardado = true;
    D.xml = D.xml || {};
    D.xml[P.id] = dir === 'venta' && supr ? text.replace(/(<cac:AccountingCustomerParty>[\s\S]*?<cbc:ID[^>]*>)[^<]*(<\/cbc:ID>[\s\S]*?<cbc:RegistrationName>)[^<]*/, '$1[suprimido]$2[suprimido]') : text;
    if (res.pend) res.avisos.push(res.pend + ' línea(s) por confirmar (no afectan el stock hasta emparejarlas).');
    /* cierra pedidos en tránsito si la factura trae productos del pedido */
    if (dir === 'compra' && P.tipo === '01') {
      var pv = D.provList.filter(function (v) { return v.ruc === P.emisor.ruc; })[0];
      if (pv) {
        var pd = D.pedidos.filter(function (x) { return x.prov === pv.id && x.estado === 'en_transito'; }).sort(function (a, b) { return a.fecha < b.fecha ? -1 : 1; })[0];
        if (pd) { pd.estado = 'facturado'; pd.facturaFecha = P.fecha; pd.facturaId = P.id; res.cierre = pd.id; pd.facturado = {}; for (var k2 = comp.l0; k2 < comp.l1; k2++) { var fl = D.lin[k2]; if (fl.prod) pd.facturado[fl.prod] = (pd.facturado[fl.prod] || 0) + fl.cant; } }
      }
    }
    E.touch(D);
    return res;
  };
  function isNCref(D, P) { if (P.tipo !== '07') return null; return D.comp.filter(function (c) { return c.id === P.ref; })[0] || null; }

  E.pendPorProducto = function (D) {
    cache(D);
    if (D._pp) return D._pp;
    var o = {}, ps = E.pendientes(D);
    ps.forEach(function (g) {
      var c = E.cascada(D, { desc: g.desc, cod: g.cod, gtin: g.gtin, provRuc: g.provRuc }, g.dir), top = c.cands[0];
      if (top && top.prod) { var r = o[top.prod] || (o[top.prod] = { unidades: 0, grupos: 0, valor: 0 }); r.unidades += g.unidades; r.grupos++; r.valor += g.valor; }
    });
    return (D._pp = o);
  };

  /* confirmar un emparejamiento (confirma una vez) */
  E.confirmar = function (D, lineIdx, prodId, factor, opts) {
    opts = opts || {};
    var l = D.lin[lineIdx], dir = l.dir, pv = null;
    if (dir === 'compra') pv = D.provList.filter(function (v) { return v.ruc === D.comp.filter(function (c) { return c.id === l.comp; })[0].ruc; })[0];
    var key = dir === 'compra' ? 'C|' + pv.ruc + '|' + l.cod : 'V|' + E.norm(l.desc);
    if (prodId === '__NOINV__') { D.mapas[key] = { prod: '__NOINV__', factor: 1, origen: 'confirmado', por: opts.user || 'Encargado', fecha: App.HOY }; }
    else {
      factor = Math.max(1, +factor || 1);
      D.mapas[key] = { prod: prodId, factor: dir === 'compra' ? factor : 1, origen: 'confirmado', por: opts.user || 'Encargado', fecha: App.HOY };
      D.aliasExtra = D.aliasExtra || {}; (D.aliasExtra[prodId] = D.aliasExtra[prodId] || []).push(l.desc);
      if (dir === 'compra') {                                    // publica solo el mapa (RN-08)
        var ck = pv.ruc + '|' + l.cod, cs = D.compartido[ck];
        if (cs && cs.nombre === D.prods[prodId].nombre) cs.n++;
        else if (!cs) D.compartido[ck] = { key: ck, prov: pv.id, desc: l.desc, nombre: D.prods[prodId].nombre, cat: D.prods[prodId].cat, ub: D.prods[prodId].ub, factor: factor, n: 1, estado: 'ok' };
        else { cs.estado = 'conflicto'; cs.alt = { nombre: D.prods[prodId].nombre, n: 1 }; }
      }
    }
    var n = 0;
    D.lin.forEach(function (x) {
      if (x.est !== 'pend' || x.dir !== dir) return;
      var k2 = dir === 'compra' ? 'C|' + (D.comp.filter(function (c) { return c.id === x.comp; })[0] || {}).ruc + '|' + x.cod : 'V|' + E.norm(x.desc);
      if (k2 !== key) return;
      if (prodId === '__NOINV__') x.est = 'noinv'; else { x.est = 'emp'; x.prod = prodId; x.factor = D.mapas[key].factor; x.via = 'confirmado'; }
      n++;
    });
    E.audit(D, opts.user || 'Encargado de compras', 'Confirmación de mapa', '«' + l.desc + '» → ' + (prodId === '__NOINV__' ? 'no es inventario' : D.prods[prodId].nombre + (dir === 'compra' ? ' · factor ' + factor : '')) + ' (' + n + ' línea(s))');
    E.touch(D);
    return n;
  };
  E.crearProducto = function (D, o) {
    var id = (o.id || o.nombre).toUpperCase().replace(/[^A-Z0-9]+/g, '-').slice(0, 14);
    var p = { id: id, nombre: o.nombre, prov: o.prov, cat: App.CATEGORIAS[o.prov] || 'Otros', ub: o.ub || 'unidad', costo: +o.costo || 0, precio: +o.precio || 0, mu: 0, pat: 'i', factor: o.factor || 1, uc: o.uc || 'unidad', fact: o.nombre.toUpperCase(), bol: o.nombre.toLowerCase(), cod: o.cod || '', un: 'NIU', maxChunk: 4 };
    D.prods[id] = p; D.prodList.push(p); E.touch(D);
    return p;
  };
  E.pendientes = function (D) {
    var g = {};
    D.lin.forEach(function (l) {
      if (l.est !== 'pend') return;
      var comp = null, ruc = null;
      if (l.dir === 'compra') { comp = D.comp.filter(function (c) { return c.id === l.comp; })[0]; ruc = comp ? comp.ruc : null; }
      var key = l.dir === 'compra' ? 'C|' + ruc + '|' + l.cod : 'V|' + E.norm(l.desc);
      var o = g[key] || (g[key] = { key: key, dir: l.dir, desc: l.desc, cod: l.cod, gtin: l.gtin, sunat: l.sunat, provRuc: ruc, lineas: [], unidades: 0, valor: 0, ultima: l.fecha, idx: l.i });
      o.lineas.push(l.i); o.unidades += l.cant; o.valor += l.cant * l.vu; if (l.fecha > o.ultima) o.ultima = l.fecha;
    });
    return Object.keys(g).map(function (k) { return g[k]; }).sort(function (a, b) { return b.valor - a.valor; });
  };

  /* ================= registrar conteo / pedido ================= */
  E.contar = function (D, pid, contado, user) {
    var L = E.led(D, pid), te = L.now;
    var c = { id: 'C' + String(D.conteos.length + 1).padStart(4, '0'), prod: pid, fecha: App.HOY, contado: contado, user: user || 'Ayudante' };
    D.conteos = D.conteos.filter(function (x) { return !(x.prod === pid && x.fecha === App.HOY); });
    D.conteos.push(c);
    E.touch(D);
    var L2 = E.led(D, pid), k = L2.counts[L2.counts.length - 1];
    E.audit(D, user || 'Ayudante', 'Conteo', D.prods[pid].nombre + ': contó ' + contado + (te == null ? ' (conteo inicial)' : ', teórico ' + Math.round(te) + ', ajuste ' + (k.delta > 0 ? '+' : '') + Math.round(k.delta)));
    return { teorico: te, contado: contado, delta: te == null ? null : contado - te, err: k.err };
  };
  E.listaConteo = function (D, n) {
    var A = E.analisis(D), N = App.NDIAS, hoy = App.HOY;
    var sc = D.prodList.map(function (p) {
      var cf = E.confianza(D, p.id), pv = D.provs[p.prov], V = E.proxVisita(D, p.prov), dtV = U.diff(V, hoy);
      var inc = cf.nivel === 'desconocida' ? 60 : cf.nivel === 'requiere' ? 80 : cf.dias == null ? 60 : cf.dias;
      var val = (A.rev[p.id] || 0) + 1, cercania = dtV <= 1 ? 2.2 : dtV <= 3 ? 1.5 : 1;
      var done = D.conteos.some(function (c) { return c.prod === p.id && c.fecha === hoy; });
      return { prod: p.id, score: done ? -1 : Math.log(val) * inc * cercania * (cf.nivel === 'requiere' ? 3 : 1), conf: cf, cls: A.abc[p.id], V: V, dtV: dtV, done: done };
    });
    return sc.sort(function (a, b) { return b.score - a.score; }).slice(0, n || D.cfg.nConteo);
  };
  E.registrarPedido = function (D, provId, items, user) {
    var pv = D.provs[provId], id = 'PED-' + provId + '-' + App.HOY.replace(/-/g, '') + (D.pedidos.some(function (p) { return p.id.indexOf('PED-' + provId + '-' + App.HOY.replace(/-/g, '')) === 0; }) ? '-B' : '');
    var pd = { id: id, prov: provId, fecha: App.HOY, plazoEsp: pv.plazo, lineas: items.map(function (i) { var p = D.prods[i.prod]; return { prod: i.prod, qCompra: i.qCompra, qBase: i.qCompra * p.factor, sugerido: i.sugerido, costoU: p.costo }; }), estado: 'en_transito', facturaFecha: null, nuevo: true };
    D.pedidos.push(pd); E.audit(D, user || 'Encargado de compras', 'Pedido registrado', id + ' · ' + items.length + ' líneas'); E.touch(D);
    return pd;
  };
  /* XML de una factura que correspondería a un pedido en tránsito (para simular su llegada) */
  E.facturaDePedido = function (D, pd, o) {
    o = o || {};
    var pv = D.provs[pd.prov], num = 9000 + D.comp.length, id = pv.serie + '-' + String(num).padStart(8, '0');
    var lines = pd.lineas.filter(function (l, n) { return !(o.faltante && n === 0); }).map(function (l, n) {
      var p = D.prods[l.prod];
      return { i: 0, desc: p.fact, cod: p.codNuevo && n === 1 && o.codNuevo ? p.codNuevo : p.cod, gtin: p.gtin, sunat: null, un: 'BX', cant: l.qCompra, vu: Math.round(p.costo * p.factor * 100) / 100 };
    });
    var fake = D.lin, saved = D.lin.length; D.lin = D.lin.concat(lines.map(function (l, n) { return Object.assign({}, l, { i: saved + n }); }));
    var comp = { id: id, tipo: '01', dir: 'compra', ruc: pv.ruc, serie: pv.serie, num: num, fecha: App.HOY, mon: 'PEN', l0: saved, l1: saved + lines.length };
    var xml = E.xmlOf(D, comp); D.lin = fake;
    return xml;
  };

  /* arma el XML de un comprobante a medida (para las muestras de la demostración) */
  E.xmlManual = function (D, sp) {
    var saved = D.lin.length, lines = sp.lines.map(function (l, n) { return Object.assign({ i: saved + n, gtin: null, sunat: null, cod: null, un: 'NIU', vu: 0 }, l); });
    D.lin = D.lin.concat(lines);
    var comp = { id: sp.serie + '-' + String(sp.num).padStart(8, '0'), tipo: sp.tipo, dir: sp.dir, ruc: sp.ruc, serie: sp.serie, num: sp.num, fecha: sp.fecha || App.HOY, mon: 'PEN', l0: saved, l1: saved + lines.length, adq: sp.adq || null, ref: sp.ref || null };
    var xml;
    try {
      xml = E.xmlOf(D, comp, { pii: true });
      if (sp.otro) xml = xml.replace(/<cbc:RegistrationName>[^<]*<\/cbc:RegistrationName>/, '<cbc:RegistrationName>' + sp.otro + '</cbc:RegistrationName>');
    } finally { D.lin = D.lin.slice(0, saved); }
    return xml;
  };
  E.anular = function (D, compId, anular) {
    var c = D.comp.filter(function (x) { return x.id === compId; })[0]; if (!c) return;
    for (var i = c.l0; i < c.l1; i++) {
      var l = D.lin[i];
      if (anular && l.est === 'emp') { l._est = 'emp'; l.est = 'anul'; } else if (!anular && l.est === 'anul') { l.est = 'emp'; }
    }
    c.estado = anular ? 'anulado' : 'procesado';
    E.audit(D, 'Plataforma', anular ? 'Comprobante anulado' : 'Anulación revertida', compId); E.touch(D);
  };
  E.numero = function (D) { D._sn = (D._sn || 9000) + 1; return D._sn; };

  /* ================= pruebas ejecutables ================= */
  E.clonar = function (D) {
    var keep = {}, k; ['_crev', '_idx', '_cnt', '_led', '_ana', '_cal', '_sim', '_keys'].forEach(function (key) { keep[key] = D[key]; D[key] = undefined; });
    var c = JSON.parse(JSON.stringify(D));
    Object.keys(keep).forEach(function (key) { D[key] = keep[key]; });
    c.provs = {}; c.provList.forEach(function (p) { c.provs[p.id] = p; });
    return c;
  };
  E.pruebas = {};
  function ejemploCompra(D) {
    var pd = D.pedidos.filter(function (p) { return p.estado === 'en_transito'; })[0];
    return pd ? E.facturaDePedido(D, pd) : null;
  }
  E.pruebas.idempotencia = function (D) {
    var C = E.clonar(D), xml = ejemploCompra(C), t0 = Date.now(); if (!xml) return { ok: false, det: 'No hay pedido en tránsito para generar la factura de prueba.' };
    var hs = E.stockHash(C), r1 = E.ingest(C, xml, 'carga', 'prueba.xml'), n1 = C.comp.length, h1 = E.stockHash(C), dup = 0;
    for (var i = 0; i < 1000; i++) { var r = E.ingest(C, xml, 'carga', 'prueba.xml'); if (r.estado === 'duplicado') dup++; }
    var ok = r1.estado === 'ok' && dup === 1000 && C.comp.length === n1 && E.stockHash(C) === h1;
    return { ok: ok, det: 'Primera carga: ' + r1.estado + '. Reenvíos: 1 000 → ' + dup + ' duplicados, 0 comprobantes nuevos, stock sin cambios (' + (Date.now() - t0) + ' ms).', ms: Date.now() - t0 };
  };
  E.pruebas.xxe = function () {
    var a = E.parseUBL('<?xml version="1.0"?><!DOCTYPE x [<!ENTITY a SYSTEM "file:///etc/passwd">]><Invoice><ID>F001-1</ID></Invoice>');
    var big = E.parseUBL('<Invoice>' + new Array(2100000).join('a') + '</Invoice>');
    var mal = E.parseUBL('<Invoice><cbc:ID>x</Invoice>');
    var ok = !a.ok && a.code === 'xxe' && !big.ok && big.code === 'tam' && !mal.ok;
    return { ok: ok, det: 'DOCTYPE/ENTITY → «' + a.err + '». Archivo de 2,1 MB → «' + big.err + '». XML mal formado → «' + mal.err + '».' };
  };
  E.pruebas.notaCredito = function (D) {
    var C = E.clonar(D), orig = null;
    C.comp.forEach(function (c) { if (!orig && c.dir === 'venta' && c.tipo === '03' && c.fecha >= U.addDays(App.HOY, -6) && C.lin.slice(c.l0, c.l1).some(function (l) { return l.est === 'emp'; })) orig = c; });
    if (!orig) return { ok: false, det: 'No se encontró una boleta reciente con productos emparejados.' };
    var ln = C.lin.slice(orig.l0, orig.l1).filter(function (l) { return l.est === 'emp'; })[0], p = C.prods[ln.prod];
    var mk = function (id, ref, q) {
      return '<?xml version="1.0"?><CreditNote xmlns="urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"><cbc:ID>' + id + '</cbc:ID><cbc:IssueDate>' + App.HOY + '</cbc:IssueDate><cbc:DocumentCurrencyCode>PEN</cbc:DocumentCurrencyCode><cac:BillingReference><cac:InvoiceDocumentReference><cbc:ID>' + ref + '</cbc:ID></cac:InvoiceDocumentReference></cac:BillingReference><cac:AccountingSupplierParty><cac:Party><cac:PartyIdentification><cbc:ID schemeID="6">' + C.comercio.ruc + '</cbc:ID></cac:PartyIdentification></cac:Party></cac:AccountingSupplierParty><cac:CreditNoteLine><cbc:ID>1</cbc:ID><cbc:CreditedQuantity unitCode="NIU">' + q + '</cbc:CreditedQuantity><cbc:LineExtensionAmount>1</cbc:LineExtensionAmount><cac:Item><cbc:Description>' + ln.desc + '</cbc:Description></cac:Item><cac:Price><cbc:PriceAmount>' + ln.vu + '</cbc:PriceAmount></cac:Price></cac:CreditNoteLine></CreditNote>';
    };
    var r1 = E.ingest(C, mk('BC01-00009001', orig.id, ln.cant + 50), 'api', 'nc1'); var nl = C.lin[C.lin.length - 1];
    var r2 = E.ingest(C, mk('BC01-00009002', 'B001-99999999', 1), 'api', 'nc2'); var nl2 = C.lin[C.lin.length - 1];
    var ok = nl.cant <= ln.cant + 1e-9 && nl2.est === 'pendref';
    return { ok: ok, det: 'La nota pidió ' + (ln.cant + 50) + ' unidades de «' + p.nombre + '» y el original tiene ' + ln.cant + ': se recortó a ' + nl.cant + '. Otra nota que referencia un comprobante inexistente quedó «pendiente de original».' };
  };
  E.pruebas.supresion = function (D) {
    var C = E.clonar(D), cand = null;
    C.comp.forEach(function (c) { if (!cand && c.dir === 'venta' && c.adq) cand = c; });
    if (!cand) return { ok: false, det: 'No hay ventas con adquirente en los datos.' };
    var nc = Object.assign({}, cand, { id: 'F001-00009555', num: 9555, fecha: App.HOY }), f = E.fakeDoc(nc), xml = E.xmlOf(C, nc, { pii: true });
    var r = E.ingest(C, xml, 'api', 'venta.xml'), saved = C.xml['F001-00009555'] || '';
    var ok = r.estado === 'ok' && xml.indexOf(f.num) >= 0 && saved.indexOf(f.num) < 0 && saved.indexOf(f.nombre) < 0;
    return { ok: ok, det: 'El archivo original traía el documento ' + f.num + ' y el nombre del cliente. En el almacén quedó «[suprimido]»; solo se conserva el tipo de adquirente (' + (cand.adq === 'RUC' ? 'RUC' : 'DNI') + ').' };
  };
  E.pruebas.aislamiento = function (D) {
    var perm = { key: 1, prov: 1, desc: 1, nombre: 1, cat: 1, ub: 1, factor: 1, n: 1, estado: 1, alt: 1 }, bad = [];
    Object.keys(D.compartido).forEach(function (k) { Object.keys(D.compartido[k]).forEach(function (f) { if (!perm[f]) bad.push(f); }); });
    var A = JSON.stringify(D.compartido), prohib = /empresa|cantidad|cant|precio|costo|stock|ruc_comercio|vu/i.test(Object.keys(D.compartido[Object.keys(D.compartido)[0]]).join(','));
    return { ok: bad.length === 0 && !prohib, det: 'Se revisaron ' + Object.keys(D.compartido).length + ' entradas del catálogo compartido: sus campos son solo clave, descripción, categoría, unidad, factor y n.º de confirmaciones. No hay cantidades, precios, costos ni identidad del comercio.' };
  };
  E.pruebas.reproceso = function (D) {
    var t0 = Date.now(), h0 = E.stockHash(D), C = E.clonar(D);
    var comps = C.comp.slice(), xmls = comps.map(function (c) { return E.xmlOf(C, c, { pii: false }); });
    C.comp = []; C.lin = []; C.rech = []; C._keys = null; C.pedidos.forEach(function (p) { if (p.estado === 'facturado') p._ok = 1; });
    var okN = 0, bad = 0;
    xmls.forEach(function (x, n) {
      // los XML de ventas con adquirente suprimido se rehacen con el adquirente de ejemplo para probar la lectura completa
      var c = comps[n]; if (c.dir === 'venta' && c.adq) x = x.replace('[suprimido]', E.fakeDoc(c).num).replace('[suprimido]', E.fakeDoc(c).nombre);
      var r = E.ingest(C, x, 'reproceso', c.id); if (r.estado === 'ok') okN++; else bad++;
    });
    C.pedidos.forEach(function (p) { if (p.estado !== 'en_transito') return; });
    var h1 = E.stockHash(C), ms = Date.now() - t0;
    return { ok: h0 === h1 && bad === 0, det: 'Se regeneraron y volvieron a leer ' + U.num(comps.length) + ' XML (' + U.num(C.lin.length) + ' líneas) en ' + U.num(ms) + ' ms. Huella del stock antes: ' + h0 + ' · después: ' + h1 + (h0 === h1 ? ' → idéntica.' : ' → distinta.'), ms: ms };
  };
  E.pruebas.cascada = function (D) {
    var fake = { mapas: {}, compartido: D.compartido, prods: D.prods, prodList: D.prodList, aliasExtra: {} };
    var casos = [['tubo agua 1/2 pvc 5m', 'PVC-SAP12'], ['FIERRO 3/8 CORRUGADO', 'FIE-38'], ['foco ahorrador led 9 w', 'FOC-LED9'], ['clavos de 3 pulg', 'CLA-3'], ['cemento tipo 1 bolsa', 'CEM-I42'], ['tornillo punta fina 6 x 1', 'TOR-DRY'], ['codo agua 1/2', 'COD-12'], ['cable electrico n14', 'CAB-14']], ok = 0, det = [];
    casos.forEach(function (c) { var r = E.cascada(fake, { desc: c[0] }, 'venta'); var top = r.cands[0]; var hit = top && top.prod === c[1]; if (hit) ok++; det.push(c[0] + ' → ' + (top ? D.prods[top.prod].id : '—') + (hit ? ' ✓' : ' ✗ (esperado ' + c[1] + ')')); });
    return { ok: ok / casos.length >= 0.875, det: ok + ' de ' + casos.length + ' descripciones nuevas quedan con el candidato correcto en primer lugar: ' + det.join(' · ') };
  };
})(typeof window !== 'undefined' ? window : globalThis);

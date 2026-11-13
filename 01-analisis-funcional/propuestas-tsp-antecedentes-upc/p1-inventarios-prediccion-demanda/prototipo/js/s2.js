/* S2 — Plataforma central (consola técnica, tema oscuro): flujo, comprobantes, cascada, pronóstico, datos sintéticos y pruebas */
(function () {
  'use strict';
  var App = window.App, U = App.U, UI = App.UI, ic = App.ic, E = App.E, C = App.Charts, H = App.H, esc = U.esc, rf = App.rf;
  var S2 = (App.s2 = { casc: { desc: 'tubo agua 1/2 pvc 5m', cod: '', dir: 'venta', prov: 'PA' }, prod: 'CEM-I42', xml: null, tests: {}, syn: null });
  var P = {};
  var NAV = [['pipeline', 'Flujo de datos', 'layers'], ['xml', 'Comprobantes y UBL', 'file'], ['cascada', 'Cascada de emparejamiento', 'link'], ['pronostico', 'Pronóstico y política', 'activity'], ['sintetico', 'Datos sintéticos', 'flask'], ['pruebas', 'Pruebas automáticas', 'shield']];

  App.views.s2 = {
    render: function (r, host) {
      var page = P[r.page] ? r.page : 'pipeline';
      host.innerHTML = '<div class="cwrap"><aside><h4>Plataforma central · S2</h4>' + NAV.map(function (n) { return '<a href="#/s2/' + n[0] + '" class="' + (n[0] === page ? 'on' : '') + '">' + ic(n[2], 18) + n[1] + '</a>'; }).join('') + '<div class="foot mt" style="font-size:12.5px;color:var(--ink-3);padding:10px">Monolito modular en Python (FastAPI) con PostgreSQL. Aquí todo corre en el navegador sobre datos simulados.</div></aside><section class="console">' + P[page](r) + '</section></div>';
      if (S2.after[page]) S2.after[page](r);
    }
  };
  S2.after = {};

  /* ---------- flujo ---------- */
  P.pipeline = function () {
    var D = App.D, q = E.calidad(D), A = E.analisis(D), bySrc = {}; D.comp.forEach(function (c) { bySrc[c.src] = (bySrc[c.src] || 0) + 1; });
    var movs = D.lin.filter(function (l) { return l.est === 'emp'; }).length + D.conteos.length, meth = {}; D.prodList.forEach(function (p) { var m = A.sel[p.id].metodo; meth[m] = (meth[m] || 0) + 1; });
    var top = Object.keys(meth).sort(function (a, b) { return meth[b] - meth[a]; })[0];
    var nodes = [
      ['Correo entrante', 'Reenvío del comercio → servicio de correo → webhook', bySrc.correo || 0, 'comprobantes por correo', 'RF-ING-02'],
      ['Ingesta idempotente', 'Clave RUC + tipo + serie + número', U.num(D.comp.length), (D.dups || 0) + ' duplicados · ' + ((D.rech || []).filter(function (r) { return r.estado !== 'duplicado'; }).length) + ' rechazados', 'RF-ING-04'],
      ['Lector UBL 2.1', 'Sin entidades externas, con límites de tamaño', U.num(q.n), 'líneas leídas', 'RF-UBL-01'],
      ['Emparejamiento', 'Cascada de 5 pasos + confirma una vez', U.pct(q.empPct), q.pend + ' por confirmar', 'RF-EMP-02'],
      ['Libro de movimientos', 'Solo inserción; el stock es una suma', U.num(movs), 'movimientos', 'RF-STK-01'],
      ['Pronóstico nocturno', '6 métodos, selección por segmento', D.prodList.length, 'productos · gana «' + top + '» en ' + meth[top], 'RF-PRO-02'],
      ['Reposición', 'Revisión periódica por proveedor', D.provList.length, 'listas para la visita', 'RF-REP-01']
    ];
    var fl = '<div class="flow">' + nodes.map(function (n, i) { return '<div class="node" ' + rf(n[4]) + '><b>' + n[0] + '</b><small class="mut">' + n[1] + '</small><span class="n">' + n[2] + '</span><small>' + n[3] + '</small></div>'; }).join('') + '</div>';
    var mb = D.comp.length * 1.4 / 1024;
    return H.head('Flujo de datos', 'De la factura del proveedor a la lista para la visita. Cada número es en vivo: pruebe cargar un comprobante en el portal y vuelva.') + fl +
      '<div class="grid2 mt"><div class="card"><h3>Decisiones de arquitectura</h3><ul class="mut2" style="margin:8px 0 0 18px;padding:0;line-height:1.6"><li><b>XML originales inmutables.</b> Si mejora el lector o el emparejamiento se reprocesa todo y el stock se recalcula desde cero.</li><li><b>Libro de solo inserción.</b> El stock y su confianza son sumas; un ajuste es un movimiento nuevo.</li><li><b>Sin LLM en el núcleo.</b> La similitud usa <i>embeddings</i> pequeños en CPU para proponer candidatos; la decisión la confirma una persona.</li><li><b>Catálogo compartido en un esquema aparte,</b> sin <span class="mono">empresa_id</span>.</li></ul></div>' +
      '<div class="card"><h3>Almacén y colas</h3><dl class="kv" style="margin-top:8px"><dt>XML guardados</dt><dd>' + U.num(D.comp.length) + ' archivos · ≈ ' + mb.toFixed(1).replace('.', ',') + ' MB</dd><dt>Cola por confirmar</dt><dd>' + q.pend + ' líneas · ' + E.pendientes(D).length + ' productos distintos</dd><dt>Compras sin XML</dt><dd>' + D.sinXml.length + ' (solo PDF en la web)</dd><dt>Semilla de los datos</dt><dd class="mono">' + D.params.seed + '</dd><dt>Huella del stock</dt><dd class="mono">' + E.stockHash(D) + '</dd></dl></div></div>';
  };

  /* ---------- comprobantes y UBL ---------- */
  P.xml = function () {
    var D = App.D, list = D.comp.slice().reverse().slice(0, 300), id = S2.xml && D.comp.some(function (c) { return c.id === S2.xml; }) ? S2.xml : list[0].id, c = D.comp.filter(function (x) { return x.id === id; })[0];
    var orig = (D.xml && D.xml[id] && c.dir === 'compra') ? D.xml[id] : E.xmlOf(D, c, { pii: true }), saved = (D.xml && D.xml[id]) || E.xmlOf(D, c, { pii: false });
    var pr = E.parseUBL(orig), tot = c.l1 - c.l0, suma = 0; D.lin.slice(c.l0, c.l1).forEach(function (l) { suma += l.cant * l.vu; });
    var chk = [['Esquema UBL 2.1', pr.ok], ['Firma digital (simulada)', true], ['Los totales cuadran con las líneas', Math.abs(suma - c.total) < 0.05], ['Fecha dentro del período', c.fecha >= App.D0 && c.fecha <= App.HOY], ['El RUC del comercio es emisor o adquirente', c.dir === 'venta' ? c.ruc === D.comercio.ruc : true]];
    var rows = list.map(function (x) { return '<option value="' + x.id + '"' + (x.id === id ? ' selected' : '') + '>' + x.id + ' · ' + U.dm(x.fecha) + ' · ' + (x.dir === 'compra' ? 'compra' : 'venta') + (x.tipo === '07' ? ' · nota de crédito' : '') + '</option>'; }).join('');
    var parsed = pr.ok ? JSON.stringify({ id: pr.id, tipo: pr.tipo, fecha: pr.fecha, emisor: pr.emisor, adq: pr.adq ? { tipo: pr.adq.tipo, num: pr.adq.num === '[suprimido]' ? pr.adq.num : pr.adq.num.replace(/./g, '•'), nombre: pr.adq.nombre ? pr.adq.nombre.replace(/./g, '•') : '' } : null, ref: pr.ref || undefined, lineas: pr.lines.slice(0, 3).concat(pr.lines.length > 3 ? [{ '…': (pr.lines.length - 3) + ' más' }] : []) }, null, 2) : pr.err;
    return H.head('Comprobantes y lectura UBL 2.1', 'Elija un comprobante: a la izquierda lo que llegó, en el centro lo que se guarda y a la derecha lo que el lector entendió.', '<select class="select" style="min-width:340px" data-chg="s2.xml">' + rows + '</select>') +
      '<div class="row wrap gap-s" ' + rf('RF-UBL-02') + '>' + chk.map(function (k) { return UI.pill(k[1] ? 'ok' : 'bad', k[0], k[1] ? 'check' : 'x'); }).join('') + '</div>' +
      '<div class="grid3 mt"><div><h4 style="margin-bottom:6px">Original recibido</h4><div class="xmlbox" style="max-height:520px">' + S1h(orig) + '</div></div><div ' + rf('RF-ING-09') + '><h4 style="margin-bottom:6px">Lo que se guarda</h4><div class="xmlbox" style="max-height:520px">' + S1h(saved) + '</div><p class="ch-note">' + (c.dir === 'venta' && c.adq ? 'El nombre y el documento del cliente se reemplazaron por <b>[suprimido]</b> antes de guardar (RN-06). Solo queda el tipo (' + c.adq + ').' : c.dir === 'compra' ? 'Las compras se guardan sin cambios: el adquirente es el propio comercio.' : 'Boleta a clientes varios: no hay datos personales.') + '</p></div><div><h4 style="margin-bottom:6px">Lectura estructurada</h4><div class="xmlbox" style="max-height:520px">' + esc(parsed) + '</div><div class="row mt-s gap-s">' + (c.estado === 'anulado' ? '<button class="btn btn-sm" data-act="s2.anular" data-id="' + id + '" data-v="0" ' + rf('RF-UBL-04') + '>Revertir anulación</button>' : '<button class="btn btn-sm" data-act="s2.anular" data-id="' + id + '" data-v="1" ' + rf('RF-UBL-04') + '>' + ic('x', 14) + 'Anular comprobante</button>') + '<span class="mut">' + tot + ' línea(s)' + (c.estado === 'anulado' ? ' · anulado' : '') + '</span></div></div></div>';
  };
  function S1h(x) { return App.s1.hl(x); }
  App.chg['s2.xml'] = function (el) { S2.xml = el.value; App.render(); };
  App.acts['s2.anular'] = function (el) { E.anular(App.D, el.dataset.id, el.dataset.v === '1'); UI.toast(el.dataset.v === '1' ? 'Comprobante anulado: el stock se recalculó desde los movimientos' : 'Anulación revertida', 'ok'); App.render(); };

  /* ---------- cascada ---------- */
  P.cascada = function () {
    var D = App.D, c = S2.casc, ruc = c.dir === 'compra' ? D.provs[c.prov].ruc : null;
    var res = E.cascada(D, { desc: c.desc, cod: c.cod, provRuc: ruc }, c.dir), ej = [['tubo agua 1/2 pvc 5m', 'venta', ''], ['foco ahorrador led 9 w', 'venta', ''], ['CLAVOS DE 3 PULG', 'venta', ''], ['cemento sol 42.5', 'venta', ''], ['TUBO PVC SAP 1/2" X 5M PAQ X10', 'compra', 'PA-1057'], ['martillo de uña 16 oz', 'venta', ''], ['disco de corte 7 pulgadas', 'venta', '']];
    var cand = res.cands.map(function (x) { var p = x.prod ? D.prods[x.prod] : null; return '<tr><td><b>' + esc(p ? p.nombre : x.nuevo) + '</b></td><td class="right num">' + Math.round(x.score * 100) + '%</td><td class="mut2">' + esc(x.via) + '</td></tr>'; }).join('') || '<tr><td colspan="3" class="tbl-empty">Sin candidatos</td></tr>';
    return H.head('Cascada de emparejamiento', 'Escriba una descripción tal como llega en un comprobante y vea qué hace cada paso. Solo el mapa del comercio y el catálogo compartido se aplican solos; lo demás se propone y una persona confirma.') +
      '<div class="card" ' + rf('RF-EMP-02') + '><div class="form3"><div class="field" style="grid-column:span 2"><label>Descripción de la línea</label><input class="input" data-inp="s2.desc" value="' + esc(c.desc) + '" placeholder="Por ejemplo: tubo agua 1/2 pvc 5m"></div>' + UI.field('Sentido', '<select class="select" data-chg="s2.dir"><option value="venta"' + (c.dir === 'venta' ? ' selected' : '') + '>Venta (boleta)</option><option value="compra"' + (c.dir === 'compra' ? ' selected' : '') + '>Compra (factura)</option></select>') + '</div>' +
      (c.dir === 'compra' ? '<div class="form3">' + UI.field('Proveedor', '<select class="select" data-chg="s2.prov">' + D.provList.map(function (v) { return '<option value="' + v.id + '"' + (c.prov === v.id ? ' selected' : '') + '>' + esc(v.nombre) + '</option>'; }).join('') + '</select>') + UI.field('Código del vendedor', '<input class="input mono" data-inp="s2.cod" value="' + esc(c.cod) + '" placeholder="PA-1057">') + '</div>' : '') +
      '<div class="row wrap gap-s">' + ej.map(function (e, i) { return '<button class="btn btn-sm btn-ghost" data-act="s2.ej" data-i="' + i + '">' + esc(e[0]) + '</button>'; }).join('') + '</div></div>' +
      '<div class="grid-main mt"><div><h4 style="margin-bottom:8px">Los 5 pasos</h4><div class="trace">' + res.trace.map(function (t) { return '<div class="tr ' + (t.ok ? 'ok' : '') + '"><span class="num">' + t.paso + '</span><div><b>' + esc(t.nombre) + '</b><br><span class="mut2">' + esc(t.det) + '</span></div></div>'; }).join('') + '</div></div><div><h4 style="margin-bottom:8px">Resultado</h4>' + (res.auto ? '<div class="res ok"><b>Se aplica solo</b> (' + res.auto.via + ')<br>' + esc(res.auto.prod === '__NOINV__' ? 'No es inventario' : D.prods[res.auto.prod].nombre) + (res.auto.factor > 1 ? ' · factor ×' + res.auto.factor : '') + '</div>' : '<div class="res warn"><b>Queda en «Confirma una vez»</b><br>Ninguna regla es lo bastante segura: una persona debe confirmar el candidato.</div>') + '<div class="tbl-wrap mt"><table><thead><tr><th>Candidato</th><th class="right">Puntaje</th><th>Por qué</th></tr></thead><tbody>' + cand + '</tbody></table></div><p class="ch-note">Similitud = 55% palabras en común + 45% trigramas de letras; si las medidas difieren («1/2» frente a «3/4») el puntaje se reduce a una fracción. En producción: <i>embeddings</i> multilingües con <span class="mono">pgvector</span>.</p></div></div>';
  };
  App.inp['s2.desc'] = function (el) { S2.casc.desc = el.value; clearTimeout(S2._t); S2._t = setTimeout(function () { var pos = el.selectionStart; App.render(); var n = document.querySelector('[data-inp="s2.desc"]'); if (n) { n.focus(); n.setSelectionRange(pos, pos); } }, 250); };
  App.inp['s2.cod'] = function (el) { S2.casc.cod = el.value; clearTimeout(S2._t); S2._t = setTimeout(function () { App.render(); var n = document.querySelector('[data-inp="s2.cod"]'); if (n) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); } }, 250); };
  App.chg['s2.dir'] = function (el) { S2.casc.dir = el.value; App.render(); };
  App.chg['s2.prov'] = function (el) { S2.casc.prov = el.value; App.render(); };
  App.acts['s2.ej'] = function (el) { var e = [['tubo agua 1/2 pvc 5m', 'venta', ''], ['foco ahorrador led 9 w', 'venta', ''], ['CLAVOS DE 3 PULG', 'venta', ''], ['cemento sol 42.5', 'venta', ''], ['TUBO PVC SAP 1/2" X 5M PAQ X10', 'compra', App.D.prods['PVC-SAP12'].cod], ['martillo de uña 16 oz', 'venta', ''], ['disco de corte 7 pulgadas', 'venta', '']][+el.dataset.i]; S2.casc = { desc: e[0], dir: e[1], cod: e[2], prov: 'PA' }; App.render(); };

  /* ---------- pronóstico y política ---------- */
  P.pronostico = function () {
    var D = App.D, A = E.analisis(D), pid = S2.prod, p = D.prods[pid], sim = E.simTodo(D), r = sim.per[pid], keys = Object.keys(A.methods);
    var sel = A.sel[pid], met = A.met[pid], seg = A.seg[sel.seg];
    var mrows = keys.map(function (k) {
      var m = met[k], best = k === sel.metodo;
      return '<tr' + (best ? ' style="background:var(--acc-soft)"' : '') + '><td>' + esc(A.methods[k][0]) + (best ? ' ' + UI.pill('info', 'Elegido', 'check') : '') + '</td><td class="right num">' + (m.mase == null ? '—' : U.dec(m.mase, 2)) + '</td><td class="right num">' + (m.wape == null ? '—' : U.pct(m.wape, 0)) + '</td><td class="right num">' + (m.sesgo == null ? '—' : U.pct(m.sesgo, 0)) + '</td><td class="right num">' + U.dec(m.rmse, 1) + '</td><td class="right num mut2">' + (seg.tabla[k] == null ? '—' : U.dec(seg.tabla[k], 2)) + '</td></tr>';
    }).join('');
    var W = A.W, y = A.weekly[pid], t0 = W - 8, xl = []; for (var w = 0; w <= W; w++) xl.push(U.dm(U.addDays(App.D0, w * 7)));
    var series = [{ name: 'Ventas semanales', data: y.concat([null]), color: 'var(--series-1)' }];
    ['naive', sel.metodo].filter(function (v, i, a) { return a.indexOf(v) === i; }).forEach(function (k, i) { var f = A.methods[k][1], d = new Array(W + 1).fill(null); for (var t = t0; t < W; t++) d[t] = f(y.slice(0, t)); if (k === sel.metodo) d[W] = A.fc[pid]; series.push({ name: A.methods[k][0], data: d, color: i ? 'var(--series-2)' : 'var(--series-3)', dash: true }); });
    var ch = C.line('s2wk', { title: 'Backtesting de origen móvil (últimas 8 semanas)', sub: 'Cada punto punteado es el pronóstico de una semana hecho solo con lo anterior.', x: xl, xl: function (i, full) { return full ? 'Semana del ' + xl[i] : xl[i]; }, series: series, h: 220, ticks: 8, fmtV: function (v) { return U.dec(v, v < 10 ? 1 : 0); }, fmtY: U.num, bands: A.cens[pid].map(function (c, i) { return c ? [i, i + 1, 'var(--bad)', 'Semana censurada (stock agotado)'] : null; }).filter(Boolean) });
    var segs = Object.keys(A.seg).filter(function (k) { return k.indexOf('·') > 0; }).sort().map(function (k) { var s = A.seg[k]; return '<tr><td>' + esc(k) + '</td><td class="right num">' + s.n + '</td><td>' + esc(A.methods[s.best][0]) + '</td><td class="right num">' + U.dec(s.tabla[s.best], 2) + '</td></tr>'; }).join('');
    var rs = r ? C.line('s2sim', { title: 'Simulación de 12 semanas: stock con cada política', sub: 'Mismo comportamiento de la demanda; cambia cómo se decide cuánto pedir.', x: D.dates.slice(-84).map(function (d) { return U.dm(d); }), xl: function (i, f) { return f ? U.dmy(D.dates.slice(-84)[i]) : U.dm(D.dates.slice(-84)[i]); }, series: [{ name: 'Pido lo de la vez pasada', data: r.ingenuo.ser, color: 'var(--series-2)' }, { name: 'Sugerencia del sistema', data: r.sugerida.ser, color: 'var(--series-1)' }], h: 200, ticks: 7, fmtV: U.num }) : '';
    var red = sim.red, hb = C.hbars({ title: 'Semanas con quiebre en 12 semanas, todos los productos', sub: 'Suma de semanas en que faltó producto. Menos es mejor.', rows: ['A', 'B', 'C'].map(function (c) { return [{ l: 'Clase ' + c + ' · ingenuo', v: sim.ingenuo[c], color: 'var(--series-2)' }, { l: 'Clase ' + c + ' · sugerida', v: sim.sugerida[c], color: 'var(--series-1)' }]; }).reduce(function (a, b) { return a.concat(b); }, []), fmt: U.num, head: 'Política', vhead: 'Semanas con quiebre', note: 'Objetivo ≥ 30% menos semanas con quiebre. Resultado en clase A: <b>' + U.pct(red.A) + '</b> menos; en todo el catálogo: <b>' + U.pct(red.T) + '</b>.' });
    var opts = D.prodList.map(function (x) { return '<option value="' + x.id + '"' + (x.id === pid ? ' selected' : '') + '>' + esc(x.nombre) + ' (' + A.abc[x.id] + ' · ' + A.pat[x.id].tipo + ')</option>'; }).join('');
    return H.head('Pronóstico y política de reposición', 'Seis métodos compiten por segmento (clase × patrón de demanda). Gana el de menor MASE en el backtesting; el stock de seguridad sale del error observado.', '<select class="select" style="min-width:320px" data-chg="s2.prod">' + opts + '</select>') +
      '<div class="three" ' + rf('RF-PRO-01') + ' style="margin-bottom:14px"><div><b>' + A.abc[pid] + '</b><small>clase por valor vendido</small></div><div><b>' + A.pat[pid].tipo + '</b><small>ADI ' + U.dec(A.pat[pid].adi, 2) + ' · CV² ' + U.dec(A.pat[pid].cv2, 2) + '</small></div><div><b>' + U.dec(A.fc[pid], 1) + '</b><small>pronóstico próxima semana (' + p.ub + ')</small></div></div>' +
      '<div class="card" ' + rf('RF-MED-02') + '>' + ch + '</div>' +
      '<div class="grid2 mt"><div class="card" ' + rf('RF-PRO-03') + '><h3>Métricas de este producto</h3><div class="tbl-wrap mt-s"><table><thead><tr><th>Método</th><th class="right">MASE</th><th class="right">WAPE</th><th class="right">Sesgo</th><th class="right">RMSE</th><th class="right">MASE del segmento</th></tr></thead><tbody>' + mrows + '</tbody></table></div><p class="ch-note">MASE &lt; 1 es mejor que repetir la semana anterior. Segmento: <b>' + esc(sel.seg) + '</b> (' + seg.n + ' productos).</p></div>' +
      '<div class="card"><h3>Método ganador por segmento</h3><div class="tbl-wrap mt-s"><table><thead><tr><th>Segmento</th><th class="right">Productos</th><th>Método</th><th class="right">MASE</th></tr></thead><tbody>' + segs + '</tbody></table></div><p class="ch-note" ' + rf('RF-PRO-06') + '>Productos con menos de 8 semanas de historial usarían el pronóstico de su categoría (representado).</p></div></div>' +
      '<div class="grid2 mt"><div class="card" ' + rf('RF-REP-01') + '>' + rs + '<p class="ch-note">Quiebres en 12 semanas para este producto: ingenuo <b>' + (r ? r.ingenuo.semQ : '—') + '</b> · sugerida <b>' + (r ? r.sugerida.semQ : '—') + '</b>.</p></div><div class="card">' + hb + '</div></div>' +
      '<p class="ch-note">La demanda de la simulación es una mezcla de procesos suaves, erráticos e intermitentes generada con una semilla fija. Sirve para ver cómo se mide, no como evidencia de que el sistema funcione con ferreterías reales.</p>';
  };
  App.chg['s2.prod'] = function (el) { S2.prod = el.value; App.render(); };

  /* ---------- datos sintéticos y sensibilidad ---------- */
  P.sintetico = function () {
    var D = App.D, q = E.calidad(D), v = E.veredicto(q.ident), sn = E.sensibilidad(D), pr = D.params, s = S2.syn || { seed: pr.seed, gen: pr.genFrac, sin: pr.sinComp };
    var heat = C.heat('sens', {
      title: 'Error del stock teórico según el ruido y los días sin contar', sub: 'Mediana del error en productos clase A y B. Fila: días desde el último conteo. Columna: % de ventas que no se identifican.', cols: sn.fr.map(function (f, i) { return U.pct(sn.grid[0][i].h, 0); }), rows: sn.dd.map(function (d) { return d + ' días'; }), v: sn.grid.map(function (row) { return row.map(function (c) { return c.err; }); }), fmt: function (x) { return U.pct(x, 0); }, steps: [0.1, 0.25, 0.5, 1], corner: 'Sin contar',
      tip: function (i, j, v) { var c = sn.grid[i][j]; return 'Con ' + U.pct(c.h, 0) + ' de ventas no identificadas y ' + c.dias + ' días sin contar, el stock teórico se aparta ' + U.pct(c.err, 0) + ' (mediana de ' + c.n + ' productos)'; },
      note: 'Cada fila de abajo cuesta más: por eso el conteo cíclico es parte del producto y no un extra. Compare la columna del ' + U.pct(sn.grid[0][0].h, 0) + ' (los datos actuales) con la del ' + U.pct(sn.grid[0][4].h, 0) + '.'
    });
    return H.head('Datos sintéticos y sensibilidad', 'El generador crea 26 semanas de una ferretería (demanda real, compras, boletas, conteos) y las convierte en XML UBL 2.1 con ruido controlado. Sirve para medir el sistema sin depender de un cliente.') +
      '<div class="grid-main"><div class="card" ' + rf('RF-MED-03') + '><h3>Generar otro conjunto</h3><p class="mut2">Los parámetros quedan registrados con la semilla; con la misma semilla se obtiene exactamente el mismo conjunto.</p>' +
      '<div class="field"><label>Líneas genéricas (VARIOS, PRODUCTO…): <b id="gv">' + U.pct(s.gen, 0) + '</b></label><div class="slider"><input type="range" min="0" max="0.6" step="0.01" value="' + s.gen + '" data-inp="s2.gen"></div></div>' +
      '<div class="field"><label>Ventas sin comprobante: <b id="sv">' + U.pct(s.sin, 0) + '</b></label><div class="slider"><input type="range" min="0" max="0.3" step="0.01" value="' + s.sin + '" data-inp="s2.sin"></div></div>' +
      '<div class="field"><label>Semilla</label><input class="input" style="max-width:160px" type="number" value="' + s.seed + '" data-inp="s2.seed"></div>' +
      '<div class="row gap-s"><button class="btn btn-primary" data-act="s2.gen">' + ic('flask', 15) + 'Generar y cargar en el portal</button><button class="btn btn-ghost" data-act="s2.genreset">Volver a los valores originales</button></div></div>' +
      '<div><div class="verdict ' + v.k + '"><div class="big">' + U.pct(q.ident, 1) + '</div><div><b>' + v.t + '</b><br><span class="mut2">líneas identificables del conjunto actual (semilla ' + pr.seed + ')</span></div></div><div class="note mt-s">Pruebe 40% de líneas genéricas: el veredicto pasa a «V7 con riesgo», y con 60% a «Descartar V7».</div></div></div>' +
      '<div class="card mt" ' + rf('RF-MED-04') + '>' + heat + '</div>';
  };
  App.inp['s2.gen'] = function (el) { S2.syn = S2.syn || {}; S2.syn.gen = +el.value; var s0 = App.D.params; S2.syn.sin = S2.syn.sin != null ? S2.syn.sin : s0.sinComp; S2.syn.seed = S2.syn.seed || s0.seed; document.getElementById('gv').textContent = U.pct(+el.value, 0); };
  App.inp['s2.sin'] = function (el) { S2.syn = S2.syn || {}; S2.syn.sin = +el.value; var s0 = App.D.params; S2.syn.gen = S2.syn.gen != null ? S2.syn.gen : s0.genFrac; S2.syn.seed = S2.syn.seed || s0.seed; document.getElementById('sv').textContent = U.pct(+el.value, 0); };
  App.inp['s2.seed'] = function (el) { S2.syn = S2.syn || {}; S2.syn.seed = Math.round(+el.value) || 1; var s0 = App.D.params; S2.syn.gen = S2.syn.gen != null ? S2.syn.gen : s0.genFrac; S2.syn.sin = S2.syn.sin != null ? S2.syn.sin : s0.sinComp; };
  App.acts['s2.gen'] = function () {
    var s = S2.syn || App.D.params, t0 = Date.now(), flags = App.S.flags;
    App.D = App.generate({ seed: s.seed, genFrac: s.gen != null ? s.gen : s.genFrac, sinComp: s.sin != null ? s.sin : s.sinComp }); App.S.flags = flags; App.s1.reset();
    App.flag('sintetico'); UI.toast('Conjunto generado en ' + (Date.now() - t0) + ' ms · semilla ' + App.D.params.seed, 'ok'); App.render();
  };
  App.acts['s2.genreset'] = function () { S2.syn = null; App.D = App.generate(); App.s1.reset(); UI.toast('Valores originales restablecidos', 'ok'); App.render(); };

  /* ---------- pruebas ---------- */
  var TESTS = [
    ['idempotencia', 'Idempotencia: 1 000 reenvíos del mismo comprobante', 'RF-ING-04', 'El mismo comprobante no se procesa dos veces ni cambia el stock.'],
    ['reproceso', 'Reproceso determinista desde los XML', 'RF-ING-09', 'Se regeneran todos los XML, se leen de nuevo y el stock da la misma huella.'],
    ['cascada', 'Cascada: descripciones nunca vistas', 'RF-EMP-02', 'El candidato correcto queda en primer lugar para variantes de la descripción.'],
    ['notaCredito', 'Notas de crédito: nunca más de lo facturado', 'RF-UBL-03', 'Se recorta al original y, sin original, queda pendiente.'],
    ['supresion', 'Supresión del adquirente', 'RF-ING-09', 'El documento y el nombre del cliente no quedan en el almacén.'],
    ['aislamiento', 'Catálogo compartido sin datos del comercio', 'RF-CAT-01', 'Solo campos de mapa: sin cantidades, precios ni identidad.'],
    ['xxe', 'Seguridad del lector XML', 'RF-UBL-02', 'DOCTYPE y ENTITY, archivos de más de 2 MB y XML mal formado se rechazan.']
  ];
  P.pruebas = function () {
    var D = App.D, T = S2.tests, done = TESTS.filter(function (t) { return T[t[0]] && T[t[0]].ok; }).length;
    return H.head('Pruebas automáticas', 'Se ejecutan aquí mismo contra una copia de los datos: demuestran la regla, no prueban un sistema en producción.', '<button class="btn btn-primary" data-act="s2.runall">' + ic('play', 15) + 'Ejecutar todas</button>') +
      '<div class="verdict ' + (done === TESTS.length ? 'ok' : 'warn') + '" style="margin-bottom:16px"><div class="big">' + done + '/' + TESTS.length + '</div><div><b>' + (done === TESTS.length ? 'Todas las pruebas pasaron' : 'Pruebas ejecutadas con éxito') + '</b><br><span class="mut2">En producción se corren en cada cambio (RNF-13).</span></div></div>' +
      '<div class="card" style="padding:0">' + TESTS.map(function (t) {
        var r = T[t[0]], k = !r ? '' : r.run ? 'run' : r.ok ? 'ok' : 'bad';
        return '<div class="test ' + k + '" ' + rf(t[2]) + '>' + (r && !r.run ? ic(r.ok ? 'checkc' : 'xc', 22) : r && r.run ? ic('refresh', 22) : ic('shield', 22)) + '<div><b>' + t[1] + '</b><p>' + (r && !r.run ? esc(r.det) : t[3]) + '</p></div><button class="btn btn-sm" data-act="s2.run" data-id="' + t[0] + '">' + (r && !r.run ? 'Repetir' : 'Ejecutar') + '</button></div>';
      }).join('') + '</div>';
  };
  function runOne(id, cb) {
    S2.tests[id] = { run: true }; App.render();
    setTimeout(function () {
      var r; try { r = E.pruebas[id](App.D); } catch (e) { r = { ok: false, det: 'Error: ' + e.message }; }
      S2.tests[id] = r; App.flag('pruebas'); App.render(); if (cb) cb();
    }, 40);
  }
  App.acts['s2.run'] = function (el) { runOne(el.dataset.id); };
  App.acts['s2.runall'] = function () { var q = TESTS.map(function (t) { return t[0]; }); (function next() { if (!q.length) return; runOne(q.shift(), next); })(); };
})();

/* S1 — Portal del comercio: marco, inicio, productos y conteo cíclico */
(function () {
  'use strict';
  var App = window.App, U = App.U, UI = App.UI, ic = App.ic, E = App.E, C = App.Charts, esc = U.esc, rf = App.rf;
  var S1 = (App.s1 = { cnt: { sel: null, res: null }, tab: {} });
  var H = (App.H = {});
  S1.reset = function () { S1.cnt = { sel: null, res: null }; S1.tab = {}; S1.fx = {}; };

  H.CF = { alta: 'Alta', media: 'Media', baja: 'Baja', desconocida: 'Desconocida', requiere: 'Requiere conteo' };
  H.cf = function (n) { return '<span class="cf ' + n + '">' + H.CF[n] + '</span>'; };
  H.cls = function (c) { return '<span class="cls ' + c + '" data-tip="Clase ' + c + ' por valor vendido en 90 días">' + c + '</span>'; };
  H.stock = function (pid) {
    var D = App.D, cf = E.confianza(D, pid), L = E.led(D, pid), p = D.prods[pid];
    if (cf.nivel === 'requiere') return '<span class="cf requiere">Requiere conteo</span>';
    if (L.now === null) return '<span class="mut">—</span>';
    return '<b class="num">' + U.num(L.now) + '</b> <small>' + esc(p.ub) + '</small>';
  };
  H.sn = function (v, ub) { return v == null ? '—' : v <= 0 ? 'requiere conteo' : U.num(v) + (ub ? ' ' + ub : ''); };
  H.money = function (v) { return App.can('costos') ? U.money0(v) : '<span class="mut" data-tip="Su rol no ve costos (el dueño puede habilitarlo)">•••</span>'; };
  H.head = function (title, sub, acts) { return '<div class="pagehead"><div><h1>' + title + '</h1>' + (sub ? '<p>' + sub + '</p>' : '') + '</div>' + (acts ? '<div class="acts">' + acts + '</div>' : '') + '</div>'; };
  H.short = function (n) { return n.replace(/ (S\.A\.C\.|S\.A\.|E\.I\.R\.L\.|S\.R\.L\.)$/, ''); };
  H.fecha = function (d) {
    var dt = U.diff(d, App.HOY);
    return dt === 0 ? 'hoy' : dt === 1 ? 'mañana' : dt === -1 ? 'ayer' : U.dowName(d) + ' ' + U.dm(d);
  };
  H.kpi = function (l, v, d, tip) { return '<div class="kpi"><div class="l">' + l + (tip ? ' <span class="mut" data-tip="' + esc(tip) + '">' + ic('info', 13) + '</span>' : '') + '</div><div class="v">' + v + '</div><div class="d">' + (d || '') + '</div></div>'; };
  H.blocked = function (what) { return '<div class="note warn"><b>Su rol no puede ' + what + '.</b> Cambie de rol en la barra superior para ver esta pantalla como el dueño o el encargado de compras.</div>'; };

  /* ---------- marco con navegación lateral ---------- */
  var NAV = [
    ['panel', 'Inicio', 'home', 'RF-PAR-01', ['dueno', 'compras']],
    ['fuentes', 'Fuentes', 'inbox', 'RF-ING-01', ['dueno', 'compras']],
    ['emparejar', 'Confirma una vez', 'link', 'RF-EMP-03', ['dueno', 'compras']],
    ['productos', 'Productos y stock', 'box', 'RF-STK-03', ['dueno', 'compras']],
    ['conteo', 'Conteo cíclico', 'checkc', 'RF-CON-01', ['dueno', 'compras', 'ayudante']],
    ['visitas', 'Visitas y pedidos', 'cal', 'RF-REP-04', ['dueno', 'compras']],
    ['parados', 'Productos parados', 'dollar', 'RF-PAR-01', ['dueno', 'compras']],
    ['calidad', 'Calidad de datos', 'chart', 'RF-MED-01', ['dueno', 'compras']],
    ['config', 'Configuración', 'cog', 'RF-SEG-02', ['dueno', 'compras']]
  ];
  S1.pages = {};
  App.views.s1 = {
    render: function (r, host) {
      var D = App.D, rol = App.S.rol, R = App.ROLES[rol], page = r.page;
      var allowed = NAV.filter(function (n) { return n[4].indexOf(rol) >= 0; });
      if (!allowed.some(function (n) { return n[0] === page; })) page = allowed[0][0];
      var pend = E.pendientes(D).length, cnt = E.listaConteo(D).filter(function (c) { return !c.done; }).length;
      var nav = allowed.map(function (n) {
        var c = n[0] === 'emparejar' && pend ? pend : n[0] === 'conteo' && cnt ? cnt : '';
        return '<a href="#/s1/' + n[0] + '" class="' + (n[0] === page ? 'on' : '') + '">' + ic(n[2], 18) + n[1] + (c ? '<span class="count">' + c + '</span>' : '') + '</a>';
      }).join('');
      var side = '<aside class="side"><div class="who">' + UI.avatar(R.who) + '<div><b>' + esc(R.who) + '</b><small>' + R.n + '</small></div></div><nav aria-label="Portal del comercio">' + nav + '</nav>' +
        '<div class="foot"><b>' + esc(D.comercio.nombre) + '</b><br>RUC ' + D.comercio.ruc + '<br><span class="mut">Datos simulados · ' + U.dmy(App.HOY) + '</span></div></aside>';
      host.innerHTML = '<div class="app-s1">' + side + '<section class="page" id="page">' + (S1.pages[page] ? S1.pages[page](r) : '') + '</section></div>';
      if (S1.after[page]) S1.after[page](r);
    }
  };
  S1.after = {};

  /* ---------- Inicio ---------- */
  S1.pages.panel = function () {
    var D = App.D, A = E.analisis(D), q = E.calidad(D), par = E.parados(D), qb = E.quiebres(D), pend = E.pendientes(D), N = App.NDIAS;
    var capital = U.sum(par.map(function (x) { return x.capital; }));
    var conf = { alta: 0, media: 0, baja: 0, requiere: 0, desconocida: 0 };
    D.prodList.forEach(function (p) { conf[E.confianza(D, p.id).nivel]++; });
    var pendLin = D.lin.filter(function (l) { return l.est === 'pend'; }).length;
    var hero = App.can('costos')
      ? '<div class="hero-n">' + U.money0(capital) + '</div><p class="mut2" style="margin:6px 0 0">de <b>capital parado</b> en ' + par.length + ' productos sin venta hace ' + D.cfg.diasParado + ' días o más. <a href="#/s1/parados">Ver detalle</a></p>'
      : '<div class="hero-n">' + par.length + '<small>productos parados</small></div><p class="mut2" style="margin:6px 0 0">Su rol no ve montos en soles. <a href="#/s1/parados">Ver detalle</a></p>';
    var kpis = '<div class="kpis" style="--n:4" ' + rf('RF-EMP-07') + '>' +
      H.kpi('Líneas identificables', U.pct(q.ident, 1), '<span class="' + (q.ident >= 0.8 ? 'up' : 'dn') + '">' + (q.ident >= 0.8 ? 'Sobre el 80%' : 'Bajo el 80%') + '</span> · corte 60%', 'Porcentaje de líneas de comprobantes cuya descripción no es genérica (VARIOS, PRODUCTO…)') +
      H.kpi('Stock con confianza alta', conf.alta + '<small>de ' + D.prodList.length + '</small>', conf.baja + conf.requiere + conf.desconocida + ' necesitan contarse') +
      H.kpi('Quiebres probables (clase A)', qb.length, qb.length ? 'antes de la próxima visita' : 'ninguno por ahora') +
      H.kpi('Líneas por confirmar', pendLin, pend.length + ' productos distintos', 'No afectan el stock hasta emparejarlas (RN-04)') + '</div>';
    /* visitas */
    var vis = D.provList.map(function (pv) { var rp = E.reponer(D, pv.id); return { pv: pv, rp: rp }; }).sort(function (a, b) { return a.rp.V < b.rp.V ? -1 : 1; });
    var vcards = vis.map(function (x) {
      var n = x.rp.lineas.filter(function (l) { return !l.bloq; }).length, b = x.rp.lineas.filter(function (l) { return l.bloq; }).length;
      var hoy = x.rp.dtV === 0;
      return '<a class="prov-tab" href="#/s1/visitas/' + x.pv.id + '" style="text-decoration:none"><small class="' + (hoy ? 'today' : 'mut') + '">' + H.fecha(x.rp.V) + '</small><b>' + esc(H.short(x.pv.nombre)) + '</b><small class="mut">' + n + ' por pedir' + (b ? ' · ' + b + ' por contar' : '') + '</small></a>';
    }).join('');
    /* ventas semanales */
    var W = A.W, wk = new Array(W).fill(0), lab = [];
    D.lin.forEach(function (l) { if (l.dir === 'venta' && (l.est === 'emp')) { var w = Math.floor(E.di(l.fecha) / 7); if (w < W) wk[w] += (l.sg || 1) * l.cant * l.vu; } });
    for (var w = 0; w < W; w++) lab.push(U.dm(U.addDays(App.D0, w * 7)));
    var ch = C.bars('ventas', { title: 'Ventas semanales identificadas', sub: 'En soles, según las boletas y facturas emparejadas. Semana que empieza el…', x: lab, xTitle: 'Semana', series: [{ name: 'Ventas (S/)', data: wk.map(Math.round), color: 'var(--series-1)' }], h: 190, ticks: 9 });
    var seg = C.segbar([{ l: 'Alta', v: conf.alta, color: 'var(--series-1)' }, { l: 'Media', v: conf.media, color: 'var(--series-4)', ink: '#0b0b0b' }, { l: 'Baja', v: conf.baja, color: 'var(--series-2)' }, { l: 'Requiere conteo o desconocida', v: conf.requiere + conf.desconocida, color: 'var(--ink-3)' }], true);
    var qrows = qb.length ? qb.map(function (o) { var p = D.prods[o.prod]; return '<tr><td class="name"><b>' + esc(p.nombre) + '</b><small>' + esc(App.PROVEEDORES.filter(function (x) { return x.id === p.prov; })[0].nombre) + '</small></td><td class="right num">' + H.sn(o.stock) + '</td><td class="right num">' + U.dec(o.fc, 1) + '/sem</td><td>' + H.fecha(o.V) + '</td></tr>'; }).join('') : '<tr><td colspan="4" class="tbl-empty">Ningún producto de clase A se acabaría antes de su próxima visita.</td></tr>';
    var tasks = [];
    if (pend.length) tasks.push(['link', 'Confirmar ' + pendLin + ' líneas (' + pend.length + ' productos)', 'Sus ventas y compras no cuentan en el stock hasta que las confirme.', '#/s1/emparejar']);
    var cnt = E.listaConteo(D).filter(function (c) { return !c.done; });
    if (cnt.length) tasks.push(['checkc', 'Contar ' + cnt.length + ' productos hoy', 'Empiezan por los que requieren conteo y los de clase A.', '#/s1/conteo']);
    D.sinXml.forEach(function (s) { tasks.push(['alert', 'Falta la factura de ' + esc(H.short(D.provs[s.prov].nombre)), 'Solo hay PDF en la web del proveedor (' + U.dm(s.fecha) + '). Descargue el XML y cárguelo.', '#/s1/fuentes/cargar']); });
    var tr = D.pedidos.filter(function (p) { return p.estado === 'en_transito'; });
    if (tr.length) tasks.push(['truck' in App.ICONS ? 'truck' : 'box', tr.length + ' pedidos en tránsito', 'Cuando llegue cada factura se cierra el ciclo: sugerido, pedido y facturado.', '#/s1/visitas']);
    var tk = '<div class="cardrow" ' + rf('RF-ING-08') + '>' + tasks.map(function (t) { return '<a class="card" href="' + t[3] + '" style="color:inherit"><div class="row gap-s">' + ic(t[0], 18) + '<b>' + t[1] + '</b></div><p class="mut2" style="margin-top:6px">' + t[2] + '</p></a>'; }).join('') + '</div>';
    return H.head('Buen día, ' + esc(App.ROLES[App.S.rol].who.split(' ')[0]), 'Esto es lo que el sistema sabe de ' + esc(D.comercio.nombre) + ' a partir de sus comprobantes electrónicos, sin que haya digitado un inventario.') +
      '<div class="grid-main"><div ' + rf('RF-PAR-01') + '>' + hero + '</div><div class="card" ' + rf('RF-STK-04') + '><h4>Confianza del stock teórico</h4><p class="mut2" style="font-size:12.5px;margin:2px 0 10px">Cuántos productos tienen un conteo reciente y poca diferencia.</p>' + seg + '</div></div>' +
      '<div class="mt">' + kpis + '</div>' +
      '<div class="sect"><div class="sect-h"><h2>Próximas visitas</h2><a href="#/s1/visitas">Ver todas las listas</a></div><div ' + rf('RF-REP-04') + '><div class="prov-grid">' + vcards + '</div></div></div>' +
      '<div class="sect"><div class="sect-h"><h2>Pendiente de usted</h2></div>' + tk + '</div>' +
      '<div class="sect grid2"><div class="card" ' + rf('RF-REP-09') + '><h3>Quiebres probables de clase A</h3><p class="mut2" style="margin-bottom:8px">Se acabarían antes de la próxima visita, contando lo que viene en camino.</p><div class="tbl-wrap"><table><thead><tr><th>Producto</th><th class="right">Stock</th><th class="right">Vende</th><th>Visita</th></tr></thead><tbody>' + qrows + '</tbody></table></div></div><div class="card">' + ch + '</div></div>';
  };

  /* ---------- Productos y stock ---------- */
  S1.pages.productos = function () {
    var D = App.D;
    if (!App.can('stock')) return H.blocked('ver el stock');
    var A = E.analisis(D), pp = E.pendPorProducto(D);
    var rows = function () {
      return D.prodList.map(function (p) {
        var cf = E.confianza(D, p.id), L = E.led(D, p.id);
        return { p: p, cf: cf, L: L, cls: A.abc[p.id], pat: A.pat[p.id].tipo, pend: pp[p.id], tr: E.enTransito(D, p.id), ult: L.counts.length ? L.counts[L.counts.length - 1] : null };
      });
    };
    var tabla = UI.table('tbl-prod', {
      rows: rows, rowId: function (r) { return r.p.id; }, rowAct: 's1.prod', rowRf: 'RF-STK-03', pageSize: 14,
      search: function (r) { return r.p.nombre + ' ' + r.p.id + ' ' + r.p.cat; }, placeholder: 'Buscar producto o categoría',
      filters: [
        { k: 'prov', label: 'Proveedor', options: D.provList.map(function (v) { return [v.id, v.nombre.split(' ').slice(0, 2).join(' ')]; }), test: function (r, v) { return r.p.prov === v; } },
        { k: 'cls', label: 'Clase', options: [['A', 'A'], ['B', 'B'], ['C', 'C']], test: function (r, v) { return r.cls === v; } },
        { k: 'cf', label: 'Confianza', options: Object.keys(H.CF).map(function (k) { return [k, H.CF[k]]; }), test: function (r, v) { return r.cf.nivel === v; } }
      ],
      cols: [
        { label: 'Producto', render: function (r) { return '<div class="name"><b>' + esc(r.p.nombre) + '</b><small>' + esc(r.p.cat) + ' · ' + esc(r.p.id) + '</small></div>'; }, sort: function (r) { return r.p.nombre; } },
        { label: 'Clase', align: 'center', render: function (r) { return H.cls(r.cls); }, sort: function (r) { return r.cls; } },
        { label: 'Patrón', render: function (r) { return '<span class="tag">' + r.pat + '</span>'; }, sort: function (r) { return r.pat; } },
        { label: 'Stock teórico', align: 'right', render: function (r) { return H.stock(r.p.id); }, sort: function (r) { return r.L.now == null ? -1e9 : r.L.now; } },
        { label: 'Confianza', render: function (r) { return H.cf(r.cf.nivel); }, sort: function (r) { return r.cf.nivel; } },
        { label: 'Último conteo', render: function (r) { return r.ult ? U.dm(r.ult.fecha) + ' <small class="mut">hace ' + r.cf.dias + ' d</small>' : '<span class="mut">nunca</span>'; }, sort: function (r) { return r.ult ? r.ult.fecha : ''; } },
        { label: 'En tránsito', align: 'right', render: function (r) { return r.tr ? '<span class="num">' + U.num(r.tr) + '</span>' : '<span class="mut">—</span>'; }, sort: function (r) { return r.tr; } },
        { label: 'Por confirmar', align: 'right', render: function (r) { return r.pend ? '<a href="#/s1/emparejar" class="chip-r" data-tip="Líneas pendientes cuyo mejor candidato es este producto">' + U.num(r.pend.unidades) + ' un.</a>' : '<span class="mut">—</span>'; }, sort: function (r) { return r.pend ? r.pend.unidades : 0; } }
      ]
    });
    return H.head('Productos y stock', 'El catálogo se armó con las líneas de los comprobantes. El stock teórico es el último conteo más las compras, menos las ventas.') +
      '<div class="note" style="margin-bottom:14px" ' + rf('RF-STK-05') + '><b>Nunca verá un stock negativo.</b> Si las cuentas no cuadran, el producto aparece como «Requiere conteo» y sube en la lista del conteo cíclico.</div>' + tabla;
  };
  App.acts['s1.prod'] = function (el) { S1.openProd(el.dataset.id); };

  S1.openProd = function (pid) {
    var D = App.D, p = D.prods[pid], A = E.analisis(D), L = E.led(D, pid), cf = E.confianza(D, pid), N = App.NDIAS;
    var x = D.dates.map(function (d, i) { return U.dm(d); });
    var marks = L.counts.map(function (c) { return { i: c.d, y: c.contado, tip: 'Conteo ' + U.dmy(c.fecha) + ': contó ' + U.num(c.contado) + (c.teorico == null ? ' (inicial)' : ', teórico ' + U.num(c.teorico) + ' → ajuste ' + (c.delta > 0 ? '+' : '') + U.num(c.delta)), color: 'var(--ink)' }; });
    var ch1 = C.line('stk-' + pid, { title: 'Stock teórico diario', sub: 'Línea: libro de movimientos. Puntos negros: conteos físicos.', x: x, xl: function (i, full) { return full ? U.dmy(D.dates[i]) : x[i]; }, series: [{ name: 'Stock teórico (' + p.ub + ')', data: L.daily.map(function (v) { return v == null ? null : Math.max(0, v); }), color: 'var(--series-1)', area: true }], marks: marks, h: 210, ticks: 7 });
    var y = A.weekly[pid], W = A.W, fm = A.methods[A.sel[pid].metodo][1], t0 = W - 8, pr = new Array(W + 1).fill(null);
    for (var t = t0; t < W; t++) pr[t] = fm(y.slice(0, t)); pr[W] = A.fc[pid];
    var xl = []; for (var w = 0; w <= W; w++) xl.push(U.dm(U.addDays(App.D0, w * 7)));
    var ch2 = C.line('wk-' + pid, { title: 'Ventas semanales y pronóstico', sub: 'Método elegido para su segmento: ' + A.methods[A.sel[pid].metodo][0] + '.', x: xl, xl: function (i, full) { return full ? (i === W ? 'Próxima semana ' : 'Semana del ') + xl[i] : xl[i]; }, series: [{ name: 'Ventas (' + p.ub + ')', data: y.concat([null]), color: 'var(--series-1)' }, { name: 'Pronóstico', data: pr, color: 'var(--series-2)', dash: true }], h: 190, ticks: 7, fmtV: function (v) { return U.dec(v, v < 10 ? 1 : 0); }, fmtY: function (v) { return U.num(v); }, bands: A.cens[pid].map(function (c, i) { return c ? [i, i + 1, 'var(--bad)', 'Semana con stock agotado: ventas censuradas (RN-10)'] : null; }).filter(Boolean) });
    var mv = E.movs(D, pid).slice(0, 12).map(function (m) { return '<tr><td>' + U.dm(m.fecha) + '</td><td>' + m.tipo + '</td><td class="right num ' + (m.q < 0 ? 'dn' : 'up') + '">' + (m.q > 0 ? '+' : '') + U.num(m.q) + '</td><td class="mono">' + esc(m.doc) + '</td></tr>'; }).join('');
    var pp = E.pendPorProducto(D)[pid];
    var met = A.met[pid][A.sel[pid].metodo];
    var body = '<div class="row wrap gap-s" style="margin-bottom:10px">' + H.cls(A.abc[pid]) + '<span class="tag">' + A.pat[pid].tipo + '</span>' + H.cf(cf.nivel) + '<span class="mut">' + esc(cf.motivo) + '</span></div>' +
      '<div class="three" style="margin-bottom:14px"><div><b>' + (L.now == null ? '—' : L.now <= 0 ? 'Requiere conteo' : U.num(L.now)) + '</b><small>stock teórico (' + p.ub + ')</small></div><div><b>' + U.num(E.enTransito(D, pid)) + '</b><small>en tránsito</small></div><div><b>' + U.dec(A.fc[pid], 1) + '</b><small>pronóstico por semana</small></div></div>' +
      (pp ? '<div class="note warn" style="margin-bottom:12px">Hay <b>' + U.num(pp.unidades) + ' unidades</b> en líneas por confirmar cuyo mejor candidato es este producto. No cuentan en el stock hasta que las <a href="#/s1/emparejar">confirme</a>.</div>' : '') +
      ch1 + '<div class="mt">' + ch2 + '</div>' +
      '<p class="ch-note">Calidad del método en las últimas 8 semanas: MASE ' + (met.mase == null ? '—' : U.dec(met.mase, 2)) + ' (menor que 1 es mejor que repetir la semana anterior) · WAPE ' + U.pct(met.wape) + ' · sesgo ' + U.pct(met.sesgo) + '.</p>' +
      '<h4 class="mt">Últimos movimientos</h4><div class="tbl-wrap" ' + rf('RF-STK-01') + '><table><thead><tr><th>Fecha</th><th>Tipo</th><th class="right">Cantidad</th><th>Documento</th></tr></thead><tbody>' + mv + '</tbody></table></div><p class="ch-note">El libro solo se escribe: una corrección es un movimiento nuevo (RN-03).</p>';
    UI.modal({ title: esc(p.nombre), body: body, drawer: true, wide: true, actions: [{ label: 'Contar ahora', kind: 'btn-primary', onClick: function () { S1.cnt.sel = pid; S1.cnt.res = null; App.go('#/s1/conteo'); } }, { label: 'Cerrar' }] });
  };

  /* ---------- Conteo cíclico ---------- */
  S1.pages.conteo = function () {
    var D = App.D, cl = E.listaConteo(D), q = E.calidad(D), N = App.NDIAS, st = S1.cnt;
    if (!st.sel) { var first = cl.filter(function (c) { return !c.done; })[0]; st.sel = first ? first.prod : null; }
    var items = cl.map(function (c) {
      var p = D.prods[c.prod];
      return '<button class="qitem' + (c.prod === st.sel ? ' on' : '') + '" data-act="cnt.pick" data-id="' + c.prod + '" ' + (c.done ? 'style="opacity:.55"' : '') + '><b>' + (c.done ? ic('checkc', 15) + ' ' : '') + esc(p.nombre) + '</b><small>' + H.cls(c.cls) + H.cf(c.conf.nivel) + (c.conf.nivel === 'requiere' ? '<span class="chip-r">Prioridad</span>' : '') + '<span class="mut">visita ' + H.fecha(c.V) + '</span></small></button>';
    }).join('');
    var p = st.sel ? D.prods[st.sel] : null, scr = '';
    if (!p) scr = UI.empty('Todo contado por hoy', 'No quedan productos en la lista del día.');
    else if (st.res) {
      var r = st.res, big = r.delta == null ? 'Conteo inicial' : (r.delta === 0 ? 'Sin diferencia' : (r.delta > 0 ? '+' : '') + U.num(r.delta));
      scr = '<h3>' + esc(p.nombre) + '</h3><div class="reveal mt-s"><div class="row sb"><span class="mut2">Usted contó</span><b style="font-size:26px">' + U.num(r.contado) + '</b></div><div class="row sb"><span class="mut2">El sistema calculaba</span><b>' + (r.teorico == null ? '—' : r.teorico <= 0 ? 'Requería conteo' : U.num(Math.round(r.teorico))) + '</b></div><div class="divider" style="margin:8px 0"></div><div class="row sb"><span class="mut2">Ajuste registrado</span><b class="' + (r.delta > 0 ? 'up' : r.delta < 0 ? 'dn' : '') + '">' + big + '</b></div><div class="row sb"><span class="mut2">Error del stock teórico</span><b>' + (r.err == null ? '—' : U.pct(r.err, 1)) + '</b></div></div>' +
        '<p class="mut2 mt-s" style="font-size:12.5px">El ajuste es un movimiento nuevo con motivo «conteo»; el libro no se edita (RF-CON-03).</p><button class="btn btn-primary btn-block mt" data-act="cnt.next" ' + rf('RF-CON-03') + '>Siguiente producto</button>';
    } else {
      scr = '<small class="mut">Conteo ciego: el sistema no muestra su cálculo hasta que usted cuente.</small><h3 style="margin:2px 0 4px">' + esc(p.nombre) + '</h3><p class="mut2" style="margin-bottom:12px">Cuente lo que hay en el estante y el almacén, en ' + E.plural(p.ub, 2) + '.</p><input class="bigin" id="cnt-in" type="number" inputmode="numeric" min="0" placeholder="0" aria-label="Cantidad contada" ' + rf('RF-CON-02') + '><button class="btn btn-ghost btn-sm btn-block btn-wrap mt-s" data-act="cnt.auto">' + ic('flask', 14) + 'Autocompletar con lo que hay en el estante (simulado)</button><button class="btn btn-primary btn-block mt" data-act="cnt.ok">Registrar conteo</button>';
    }
    var phone = '<div class="phone"><div class="bar"><span>9:41</span><span>Tuerca · ' + esc(App.ROLES[App.S.rol].n) + '</span></div><div class="scr">' + scr + '</div></div>';
    var errs = ['A', 'B', 'C'].map(function (c) {
      var v = q.errMed[c], obj = c === 'A' ? 0.10 : null, ok = v != null && (obj == null || v <= obj);
      return '<tr><td>' + H.cls(c) + '</td><td class="right num">' + q.nConteos[c] + '</td><td class="right num"><b>' + (v == null ? '—' : U.pct(v, 1)) + '</b></td><td>' + (obj == null ? '<span class="mut">sin meta</span>' : (ok ? UI.pill('ok', 'Cumple ≤ 10%', 'checkc') : UI.pill('warn', 'Objetivo ≤ 10%', 'alert'))) + '</td></tr>';
    }).join('');
    var right = '<div class="card"><div class="row sb" style="margin-bottom:8px"><h3>Lista de hoy</h3><span class="mut">' + D.cfg.nConteo + ' productos · por valor, incertidumbre y cercanía de la visita</span></div><div class="qlist" ' + rf('RF-CON-01') + '>' + items + '</div></div>' +
      '<div class="card mt" ' + rf('RF-CON-04') + '><h3>Error del stock teórico en cada conteo</h3><p class="mut2" style="margin-bottom:8px">Mediana de |teórico − contado| ÷ contado, de todos los conteos históricos.</p><div class="tbl-wrap"><table><thead><tr><th>Clase</th><th class="right">Conteos</th><th class="right">Error mediano</th><th>Estado</th></tr></thead><tbody>' + errs + '</tbody></table></div></div>' +
      '<div class="card mt" ' + rf('RF-CON-05') + '><h3>Verificación para la validación (30 productos)</h3><p class="mut2">Días 5–8 del plan de 2 semanas: contar 30 productos al azar y comparar con el stock reconstruido. Criterio: si el error mediano supera 25%, replantear la propuesta.</p>' + (st.verif ? '<div class="res ' + (st.verif.med > 0.25 ? 'bad' : st.verif.med > 0.10 ? 'warn' : 'ok') + '" style="margin-top:10px"><b>Error mediano en ' + st.verif.n + ' productos: ' + U.pct(st.verif.med, 1) + '</b><br><span class="mut2">' + (st.verif.med > 0.25 ? 'Supera el 25%: replantear.' : st.verif.med > 0.10 ? 'Entre 10% y 25%: seguir, contando con más frecuencia.' : 'Dentro del objetivo.') + '</span></div>' : '') + '<button class="btn mt-s" data-act="cnt.verif">' + ic('flask', 15) + 'Contar 30 productos con lo que hay en el estante (simulado)</button></div>';
    return H.head('Conteo cíclico', 'Diez productos al día, elegidos por lo que más valor mueve y menos se conoce. Un conteo de 20 segundos por producto corrige el stock teórico.') + '<div class="conteo-grid"><div>' + phone + '</div><div>' + right + '</div></div>';
  };
  App.acts['cnt.pick'] = function (el) { S1.cnt.sel = el.dataset.id; S1.cnt.res = null; App.render(); };
  App.acts['cnt.auto'] = function () {
    var pid = S1.cnt.sel, T = App.D.truth[pid], v = T.stock[App.NDIAS - 1];
    document.getElementById('cnt-in').value = Math.max(0, Math.round(v * (1 + (U.hash(pid + 'c') - 0.5) * 0.03)));
  };
  App.acts['cnt.ok'] = function () {
    var inp = document.getElementById('cnt-in'), v = inp.value;
    if (v === '' || isNaN(+v) || +v < 0) { UI.toast('Escriba la cantidad contada (0 o más)', 'bad'); inp.focus(); return; }
    S1.cnt.res = E.contar(App.D, S1.cnt.sel, Math.round(+v), App.ROLES[App.S.rol].n);
    App.flag('conto'); App.changed();
  };
  App.acts['cnt.next'] = function () {
    S1.cnt.res = null; var cl = E.listaConteo(App.D).filter(function (c) { return !c.done; }); S1.cnt.sel = cl.length ? cl[0].prod : null; App.render();
  };
  App.acts['cnt.verif'] = function () {
    var D = App.D, ids = D.prodList.map(function (p) { return p.id; }).filter(function (id) { return E.led(D, id).now != null; }).sort(function (a, b) { return U.hash(a + 'v') - U.hash(b + 'v'); }).slice(0, 30), errs = [];
    ids.forEach(function (id) { var T = D.truth[id], v = Math.max(0, Math.round(T.stock[App.NDIAS - 1] * (1 + (U.hash(id + 'q') - 0.5) * 0.02))), r = E.contar(D, id, v, 'Verificación'); if (r.err != null) errs.push(r.err); });
    S1.cnt.verif = { n: ids.length, med: U.median(errs) }; App.flag('conto'); App.changed();
  };
})();

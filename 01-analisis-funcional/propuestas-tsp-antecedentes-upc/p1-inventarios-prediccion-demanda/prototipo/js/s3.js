/* S3 — Consola SaaS (empresas, planes, catálogo compartido, soporte) y S4 — Vista de la marca (fase 3) */
(function () {
  'use strict';
  var App = window.App, U = App.U, UI = App.UI, ic = App.ic, E = App.E, C = App.Charts, H = App.H, esc = U.esc, rf = App.rf;
  var S3 = (App.s3 = { emp: null, tickets: null, sim: null });
  var NAV = [['empresas', 'Empresas', 'building'], ['planes', 'Planes y costos', 'dollar'], ['catalogo', 'Catálogo compartido', 'layers'], ['soporte', 'Soporte', 'bell']];
  var plan = { piloto: ['Piloto', 29, 'Un mes de prueba con sus datos'], esencial: ['Esencial', 39, 'Hasta 1 000 productos'], completo: ['Completo', 79, 'Hasta 5 000 productos'] };

  function emps() {
    if (S3.emp) return S3.emp;
    return (S3.emp = [
      { id: 'don-lucho', nombre: 'Ferretería Don Lucho E.I.R.L.', ruc: '20999000001', plan: 'esencial', alta: '2026-05-04', estado: 'activa', real: true },
      { id: 'el-clavo', nombre: 'El Clavo Dorado S.A.C.', ruc: '20999000021', plan: 'esencial', alta: '2026-08-12', estado: 'activa', prods: 612, comp: 840, pend: 0.04 },
      { id: 'mega-obra', nombre: 'Mega Obra Comas E.I.R.L.', ruc: '20999000022', plan: 'completo', alta: '2026-09-02', estado: 'activa', prods: 2380, comp: 2210, pend: 0.09 },
      { id: 'tornillo', nombre: 'Tornillo y Tuerca S.R.L.', ruc: '20999000023', plan: 'piloto', alta: '2026-10-28', estado: 'prueba', prods: 143, comp: 96, pend: 0.31 },
      { id: 'sin-xml', nombre: 'Materiales Santa Rosa', ruc: '20999000024', plan: 'esencial', alta: '2026-09-19', estado: 'en riesgo', prods: 520, comp: 130, pend: 0.12, nota: 'Solo 41% de sus compras llega con XML' }
    ]);
  }
  App.views.s3 = {
    render: function (r, host) {
      var page = ['empresas', 'planes', 'catalogo', 'soporte'].indexOf(r.page) >= 0 ? r.page : 'empresas';
      host.innerHTML = '<div class="cwrap" style="--x:1"><aside style="background:var(--surface)"><h4>Consola SaaS · S3</h4>' + NAV.map(function (n) { return '<a href="#/s3/' + n[0] + '" class="' + (n[0] === page ? 'on' : '') + '">' + ic(n[2], 18) + n[1] + '</a>'; }).join('') + '<div class="foot mt" style="font-size:12.5px;color:var(--ink-3);padding:10px">Solo la usa el equipo que opera el servicio. En el MVP el alta puede hacerse con un script.</div></aside><section class="console">' + S3.pages[page](r) + '</section></div>';
    }
  };
  S3.pages = {};

  S3.pages.empresas = function () {
    var D = App.D, q = E.calidad(D), list = emps();
    var rows = list.map(function (e) {
      var real = e.real, prods = real ? D.prodList.length : e.prods, comp = real ? D.comp.length : e.comp, pend = real ? q.pendPct : e.pend;
      return '<tr><td class="name"><b>' + esc(e.nombre) + '</b><small class="mono">RUC ' + e.ruc + '</small></td><td>' + esc(plan[e.plan][0]) + ' <small class="mut">' + U.money0(plan[e.plan][1]) + '/mes</small></td><td class="right num">' + U.num(prods) + '</td><td class="right num">' + U.num(comp) + (real ? '' : ' <small class="mut">/mes</small>') + '</td><td class="right num">' + U.pct(pend, 0) + '</td><td>' + (e.estado === 'activa' ? UI.pill('ok', 'Activa', 'checkc') : e.estado === 'prueba' ? UI.pill('info', 'En prueba', 'clock') : UI.pill('warn', 'En riesgo', 'alert')) + (e.nota ? '<small class="sub">' + esc(e.nota) + '</small>' : '') + '</td></tr>';
    }).join('');
    var infra = list.length * 4;
    return H.head('Empresas', 'Alta de comercios, plan contratado y uso. Cada comercio tiene sus datos aislados: ninguna consulta cruza empresas.', '<button class="btn btn-primary" data-act="s3.alta" ' + rf('RF-SEG-05') + '>' + ic('plus', 15) + 'Dar de alta una empresa</button>') +
      '<div class="kpis" style="--n:4"><div class="kpi"><div class="l">Empresas</div><div class="v">' + list.length + '</div><div class="d">' + list.filter(function (e) { return e.estado === 'activa'; }).length + ' activas</div></div><div class="kpi"><div class="l">Ingreso mensual</div><div class="v">' + U.money0(U.sum(list.map(function (e) { return e.estado === 'prueba' ? 0 : plan[e.plan][1]; }))) + '</div><div class="d">sin contar pruebas</div></div><div class="kpi"><div class="l">Infraestructura</div><div class="v">≈ ' + U.money0(infra) + '</div><div class="d">S/ 2–5 por cliente (estimado)</div></div><div class="kpi"><div class="l">Compras con XML (este comercio)</div><div class="v">' + U.pct(q.xmlPct, 0) + '</div><div class="d">meta ≥ 80%</div></div></div>' +
      '<div class="sect"><div class="tbl-wrap" ' + rf('RF-SEG-01') + '><table><thead><tr><th>Empresa</th><th>Plan</th><th class="right">Productos</th><th class="right">Comprobantes</th><th class="right">Por confirmar</th><th>Estado</th></tr></thead><tbody>' + rows + '</tbody></table></div><p class="ch-note">Don Lucho usa los datos reales de la demostración; las otras empresas son de relleno.</p></div>';
  };
  App.acts['s3.alta'] = function () {
    UI.modal({ title: 'Dar de alta una empresa', body: '<div class="form2">' + UI.field('Razón social', '<input class="input" name="n" placeholder="Ferretería …">') + UI.field('RUC', '<input class="input" name="r" maxlength="11" placeholder="20…">') + UI.field('Plan', '<select class="select" name="p">' + Object.keys(plan).map(function (k) { return '<option value="' + k + '">' + plan[k][0] + ' · ' + U.money0(plan[k][1]) + '</option>'; }).join('') + '</select>') + '</div><p class="mut2">Crea el buzón de ingesta y el aislamiento de datos. Simulado.</p>', actions: [{ label: 'Cancelar' }, { label: 'Crear', kind: 'btn-primary', onClick: function (m) { var n = m.val('n'), r = m.val('r'); if (!n || !/^\d{11}$/.test(r)) { UI.toast('Escriba la razón social y un RUC de 11 dígitos', 'bad'); return false; } emps().push({ id: r, nombre: n, ruc: r, plan: m.val('p'), alta: App.HOY, estado: 'prueba', prods: 0, comp: 0, pend: 0 }); UI.toast('Empresa creada', 'ok'); App.render(); } }] });
  };

  S3.pages.planes = function () {
    var cards = Object.keys(plan).map(function (k) { return '<div class="card"><small class="mut">' + plan[k][2] + '</small><h2>' + plan[k][0] + '</h2><div class="hero-n" style="font-size:40px">' + U.money0(plan[k][1]) + '<small>/ mes</small></div></div>'; }).join('');
    var esc3 = [[6, 20], [12, 80], [24, 300]], ing = esc3.map(function (x) { return x[1] * 59; });
    var ch = C.bars('esc', { title: 'Ingreso mensual del escenario ilustrativo', sub: 'Con un ticket promedio de S/ 59. Son hipótesis, no proyecciones.', x: esc3.map(function (x) { return 'Mes ' + x[0] + ' · ' + x[1] + ' clientes'; }), xTitle: 'Escenario', series: [{ name: 'Ingreso mensual (S/)', data: ing, color: 'var(--series-1)' }], h: 190, ticks: 3 });
    return H.head('Planes y costos', 'Suscripción por tienda. El plan se elige por cantidad de productos. Cifras en soles, todas hipótesis a validar con comercios reales.') + '<div class="cardrow" ' + rf('RF-SEG-05') + '>' + cards + '</div>' +
      '<div class="grid2 mt"><div class="card"><h3>Costo de servir por cliente</h3><div class="tbl-wrap mt-s"><table><thead><tr><th>Concepto</th><th class="right">Por mes</th></tr></thead><tbody><tr><td>Infraestructura</td><td class="right num">S/ 2 – 5</td></tr><tr><td>Soporte (carga de datos, dudas)</td><td class="right num">S/ 10 – 30 al inicio</td></tr><tr><td><b>Margen bruto estimado</b></td><td class="right num"><b>60% – 85%</b></td></tr></tbody></table></div><p class="ch-note">Valor para un minimarket de ejemplo: ≈ S/ 186 al mes (ventas recuperadas, capital liberado y horas ahorradas). Si el quiebre real es 1%, baja a ≈ S/ 110.</p></div><div class="card">' + ch + '</div></div>';
  };

  /* ---------- catálogo compartido ---------- */
  S3.pages.catalogo = function () {
    var D = App.D, ent = Object.keys(D.compartido).map(function (k) { return D.compartido[k]; }), conf = ent.filter(function (x) { return x.estado === 'conflicto'; });
    var dist = [1, 2, 3, 4, 5].map(function (n) { return { l: n === 5 ? '5 o más' : n === 1 ? '1 comercio' : n + ' comercios', v: ent.filter(function (e) { return n === 5 ? e.n >= 5 : e.n === n; }).length, color: n === 1 ? 'var(--ink-3)' : 'var(--series-1)', tip: ent.filter(function (e) { return n === 5 ? e.n >= 5 : e.n === n; }).length + ' mapas confirmados por ' + n + ' comercio(s)' }; });
    var cf = conf.length ? conf.map(function (c) { return '<div class="card" style="margin-bottom:10px"><div class="row sb wrap"><div><small class="mut mono">' + esc(c.key) + ' · ' + esc(c.desc) + '</small><br><b>¿Qué producto es?</b></div></div><div class="row gap-s mt-s wrap"><button class="btn" data-act="s3.res" data-k="' + esc(c.key) + '" data-v="a">' + esc(c.nombre) + ' <span class="chip-r">' + c.n + ' comercios</span></button><button class="btn" data-act="s3.res" data-k="' + esc(c.key) + '" data-v="b">' + esc(c.alt.nombre) + ' <span class="chip-r">' + c.alt.n + ' comercios</span></button></div></div>'; }).join('') : '<div class="empty-note">Sin conflictos abiertos.</div>';
    var tabla = UI.table('tbl-comp-sh', { rows: function () { return ent.slice(); }, pageSize: 8, search: function (e) { return e.key + ' ' + e.nombre + ' ' + e.desc; }, placeholder: 'Buscar un código o producto', cols: [{ label: 'Proveedor · código', render: function (e) { return '<span class="mono">' + esc(e.key.replace(/^\d+\|/, e.prov + ' · ')) + '</span>'; }, sort: function (e) { return e.key; } }, { label: 'Producto', render: function (e) { return '<div class="name"><b>' + esc(e.nombre) + '</b><small>' + esc(e.desc) + '</small></div>'; }, sort: function (e) { return e.nombre; } }, { label: 'Factor', align: 'right', render: function (e) { return '×' + e.factor; } }, { label: 'Confirmado por', align: 'right', render: function (e) { return e.n + ' comercio(s)'; }, sort: function (e) { return e.n; } }, { label: 'Estado', render: function (e) { return e.estado === 'conflicto' ? UI.pill('warn', 'Conflicto', 'alert') : e.n >= 2 ? UI.pill('ok', 'Activo', 'check') : UI.pill('mute', 'Falta 1 confirmación', 'clock'); } }] });
    var sim = S3.sim ? simHtml(S3.sim) : '';
    return H.head('Catálogo compartido', 'El mapa de productos que confirman todos los comercios: código del proveedor ↔ producto ↔ factor. Nunca guarda cantidades, precios ni quién lo confirmó.') +
      '<div class="grid2"><div class="card" ' + rf('RF-CAT-03') + '><h3>Curaduría de conflictos (' + conf.length + ')</h3><p class="mut2" style="margin-bottom:10px">Dos comercios confirmaron productos distintos para el mismo código. Se resuelve a mano y el mapa queda activo.</p>' + cf + '</div><div class="card" ' + rf('RF-CAT-02') + '>' + C.hbars({ title: 'Mapas según cuántos comercios los confirmaron', sub: 'Se aplican solos desde 2 comercios (o del curador).', rows: dist, fmt: U.num, head: 'Confirmaciones', vhead: 'Mapas', max: undefined }) + '</div></div>' +
      '<div class="card mt" ' + rf('RF-CAT-04') + '><div class="row sb wrap"><div><h3>Efecto de red: una ferretería nueva que compra a los mismos proveedores</h3><p class="mut2" style="margin:2px 0 0">Se procesan las facturas de este comercio como si el catálogo propio estuviera vacío y se mide qué parte resuelve el catálogo compartido.</p></div><button class="btn btn-brand" data-act="s3.sim">' + ic('play', 15) + 'Simular el alta</button></div>' + sim + '</div>' +
      '<div class="sect"><div class="sect-h"><h2>Todos los mapas</h2></div>' + tabla + '</div>';
  };
  function simHtml(s) {
    return '<div class="three mt"><div><b>' + U.pct(s.comp, 0) + '</b><small>resueltas por el catálogo compartido</small></div><div><b>' + U.pct(s.cand, 0) + '</b><small>con candidato; falta confirmar</small></div><div><b>' + U.pct(s.nada, 0) + '</b><small>sin candidato</small></div></div>' + C.segbar([{ l: 'Catálogo compartido', v: s.nComp, color: 'var(--series-1)' }, { l: 'Candidato por reglas o similitud', v: s.nCand, color: 'var(--series-4)', ink: '#0b0b0b' }, { l: 'Sin candidato', v: s.nNada, color: 'var(--ink-3)' }], true) + '<p class="ch-note">Sobre ' + U.num(s.n) + ' líneas de compra de ' + s.cods + ' códigos distintos. La primera ferretería de un proveedor parte en 0%; cada confirmación ayuda a la siguiente.</p>';
  }
  App.acts['s3.sim'] = function () {
    var D = App.D, fake = { mapas: {}, compartido: D.compartido, prods: D.prods, prodList: D.prodList, aliasExtra: {} }, seen = {}, n = 0, c = 0, ca = 0, na = 0;
    D.lin.forEach(function (l) {
      if (l.dir !== 'compra') return;
      var comp = D.comp.filter(function (x) { return x.id === l.comp; })[0]; if (!comp) return;
      var k = comp.ruc + '|' + l.cod; seen[k] = seen[k] || (function () { var r = E.cascada(fake, { desc: l.desc, cod: l.cod, gtin: l.gtin, provRuc: comp.ruc }, 'compra'); return r.auto ? 'c' : (r.cands[0] && r.cands[0].score >= 0.5 ? 'a' : 'n'); })();
      n++; if (seen[k] === 'c') c++; else if (seen[k] === 'a') ca++; else na++;
    });
    S3.sim = { n: n, nComp: c, nCand: ca, nNada: na, comp: c / n, cand: ca / n, nada: na / n, cods: Object.keys(seen).length };
    App.flag('red'); App.render();
  };
  App.acts['s3.res'] = function (el) {
    var D = App.D, c = D.compartido[el.dataset.k]; if (!c) return;
    if (el.dataset.v === 'b') { c.nombre = c.alt.nombre; c.n = c.alt.n; }
    c.estado = 'ok'; delete c.alt; E.audit(D, 'Curador', 'Conflicto resuelto', c.key + ' → ' + c.nombre); UI.toast('Conflicto resuelto: el mapa queda activo', 'ok'); App.render();
  };

  S3.pages.soporte = function () {
    var D = App.D, t = S3.tickets || (S3.tickets = [
      { id: 'T-104', e: 'Materiales Santa Rosa', t: 'Solo 41% de sus compras llega con XML: los proveedores publican en su web.', est: 'abierto', pr: 'alta' },
      { id: 'T-103', e: 'Tornillo y Tuerca S.R.L.', t: 'Quiere cargar un mes de boletas en una sola operación.', est: 'abierto', pr: 'media' },
      { id: 'T-101', e: 'Ferretería Don Lucho E.I.R.L.', t: 'Un proveedor cambió el código de «Cemento Tipo MS»: vuelve a confirmación.', est: 'resuelto', pr: 'baja' }
    ]);
    return H.head('Soporte', 'Incidencias de los comercios. La mayoría se resuelve ayudándolos a que los XML lleguen.') + '<div class="tbl-wrap" ' + rf('RF-SEG-05') + '><table><thead><tr><th>Caso</th><th>Empresa</th><th>Problema</th><th>Prioridad</th><th>Estado</th><th></th></tr></thead><tbody>' + t.map(function (x) { return '<tr><td class="mono">' + x.id + '</td><td>' + esc(x.e) + '</td><td>' + esc(x.t) + '</td><td>' + UI.pill(x.pr === 'alta' ? 'bad' : x.pr === 'media' ? 'warn' : 'mute', x.pr) + '</td><td>' + (x.est === 'abierto' ? UI.pill('warn', 'Abierto', 'clock') : UI.pill('ok', 'Resuelto', 'checkc')) + '</td><td class="right">' + (x.est === 'abierto' ? '<button class="btn btn-sm" data-act="s3.cerrar" data-id="' + x.id + '">Marcar resuelto</button>' : '') + '</td></tr>'; }).join('') + '</tbody></table></div>';
  };
  App.acts['s3.cerrar'] = function (el) { S3.tickets.forEach(function (x) { if (x.id === el.dataset.id) x.est = 'resuelto'; }); App.render(); };

  /* ---------- S4: vista de la marca ---------- */
  App.s4 = { prov: 'PA' };
  App.views.s4 = {
    render: function (r, host) {
      var D = App.D, id = App.s4.prov, pv = D.provs[id], con = D.cfg.consent && D.cfg.consent[id], rp = E.reponer(D, id);
      var opts = D.provList.map(function (v) { return '<option value="' + v.id + '"' + (v.id === id ? ' selected' : '') + '>' + esc(v.nombre) + '</option>'; }).join('');
      var body;
      if (!con) body = '<div class="card" style="text-align:center;padding:34px">' + UI.empty('Sin consentimiento', 'El comercio todavía no autorizó a ' + esc(pv.nombre) + ' a ver la sugerencia de sus productos. El dueño puede otorgarlo (y revocarlo) en Configuración › Marcas.') + '<div class="row gap-s" style="justify-content:center"><button class="btn btn-primary" data-act="s4.dar" ' + rf('RF-MAR-01') + '>Otorgar consentimiento (como dueño)</button><a class="btn" href="#/s1/config/marcas">Ir a Configuración</a></div></div>';
      else {
        var lines = rp.lineas.filter(function (o) { return !o.bloq; });
        body = '<div class="vend" ' + rf('RF-MAR-02') + '><div class="row sb wrap"><div><small class="mut">Para su visita ' + H.fecha(rp.V) + ' · ' + U.dowName(rp.V) + ' ' + U.dm(rp.V) + '</small><h2 style="margin:2px 0">' + esc(App.D.comercio.nombre) + '</h2></div>' + UI.pill('ok', 'El comercio le dio acceso', 'check') + '</div><div class="tbl-wrap mt"><table><thead><tr><th>Producto de su marca</th><th class="right">Sugerencia</th></tr></thead><tbody>' +
          (lines.map(function (o) { var p = D.prods[o.prod]; return '<tr><td><b>' + esc(p.nombre) + '</b></td><td class="right num"><b>' + E.cant(p, o.qC) + '</b></td></tr>'; }).join('') || '<tr><td colspan="2" class="tbl-empty">Sin productos por pedir en esta visita.</td></tr>') + '</tbody></table></div><div class="note mt" style="font-size:12.5px"><b>Lo que NO ve:</b> el stock del comercio, sus ventas totales, los productos de otras marcas ni sus precios de venta. Solo la sugerencia de sus propios productos.</div></div>' +
          '<div class="grid2 mt"><div class="card" ' + rf('RF-MAR-03') + '><h3>Prueba de neutralidad</h3><p class="mut2">La sugerencia debe ser idéntica con o sin marca pagadora. Se calcula dos veces y se comparan.</p><label class="check mt-s"><span class="switch"><input type="checkbox" ' + (D.cfg.marcaPaga === id ? 'checked' : '') + ' data-chg="s4.paga"><i></i></span>La marca paga por tienda activa (modelo a probar)</label><button class="btn mt" data-act="s4.test">' + ic('shield', 15) + 'Comparar sugerencias</button><div id="s4res" class="mt">' + (App.s4.res || '') + '</div></div><div class="card"><h3>Por qué sería creíble</h3><ul class="mut2" style="margin:6px 0 0 18px;padding:0;line-height:1.6"><li>El ferretero usa el sistema gratis y la marca paga por tienda activa.</li><li>Las reglas son transparentes y no dependen de quién pague.</li><li>Riesgo: si el ferretero siente que la marca sesga la sugerencia, la deja de usar.</li></ul></div></div>';
      }
      host.innerHTML = '<div class="page"><div class="pagehead"><div><span class="chip-r">Fase 3 · solo con consentimiento</span><h1>Vista de la marca</h1><p>Lo que vería el vendedor de un proveedor antes de pasar por la ferretería.</p></div><div class="acts"><select class="select" style="min-width:300px" data-chg="s4.prov" aria-label="Proveedor">' + opts + '</select></div></div>' + body + '</div>';
    }
  };
  App.chg['s4.prov'] = function (el) { App.s4.prov = el.value; App.s4.res = ''; App.render(); };
  App.acts['s4.dar'] = function () { App.D.cfg.consent = App.D.cfg.consent || {}; App.D.cfg.consent[App.s4.prov] = true; E.audit(App.D, 'Dueño', 'Consentimiento', App.D.provs[App.s4.prov].nombre + ': otorgado'); App.flag('consent'); App.render(); };
  App.chg['s4.paga'] = function (el) { App.D.cfg.marcaPaga = el.checked ? App.s4.prov : null; App.render(); };
  App.acts['s4.test'] = function () {
    var D = App.D, id = App.s4.prov, prev = D.cfg.marcaPaga;
    D.cfg.marcaPaga = null; var a = E.reponer(D, id).lineas.map(function (o) { return o.prod + ':' + o.qC; }).join('|');
    D.cfg.marcaPaga = id; var b = E.reponer(D, id).lineas.map(function (o) { return o.prod + ':' + o.qC; }).join('|');
    D.cfg.marcaPaga = prev; var ok = a === b;
    App.s4.res = '<div class="res ' + (ok ? 'ok' : 'bad') + '"><b>' + (ok ? 'Idénticas' : 'Distintas') + '</b> · ' + a.split('|').filter(Boolean).length + ' líneas comparadas, con y sin marca pagadora.</div>';
    App.flag('neutral'); App.render();
  };
})();

/* S2 — Portal del distribuidor: marco, panel, reposición anticipada y pedidos */
(function () {
  'use strict';
  var App = window.App, U = App.U, UI = App.UI, C = App.Charts, ic = App.ic, esc = U.esc, rf = App.rf, srv = App.srv, est = App.est;
  var S = function () { return App.S; };
  var X = (App.s2 = { pages: {}, st: { sel: null, modo: 'manual', day: 1, probar: 'H-001', ordenCtl: 0 } });
  var st = X.st;

  /* ---------- permisos (matriz de 14 §4) ---------- */
  X.can = function (a) {
    var s = S();
    if (s.rolPortal === 'dueno') return true;
    if (a === 'verificar') return !!s.permisoDespVerifica;
    return ['config', 'precios', 'envases_cfg', 'usuarios', 'anular', 'ajustar_env', 'resultados'].indexOf(a) < 0;
  };
  X.solo = function (a) { return X.can(a) ? '' : ' disabled data-tip="Solo el dueño puede hacerlo"'; };
  X.deny = function (a) { if (!X.can(a)) { UI.toast(a === 'verificar' ? 'El dueño no habilitó al despachador para verificar cobros ni cerrar cuadres.' : 'Solo el dueño puede hacerlo.', 'bad'); return true; } return false; };
  var hg = App.hogar;
  X.nombre = function (id) { var h = hg(id); return h ? h.nombre : id; };
  X.consentPill = function (h) {
    var e = h.consent.estado;
    return e === 'vigente' ? UI.pill('ok', 'Acepta avisos', 'check') : e === 'baja' ? UI.pill('bad', 'Dio de baja', 'x') : UI.pill('mute', 'Sin consentimiento', 'lock');
  };
  X.prodTxt = function (it) { return it.qty + ' × ' + S().productos[it.p].corto; };
  X.cyl = function (e, size) { return C.cyl(e.nivel == null ? 0.5 : e.nivel, { tipo: S().productos[e.prodId].tipo, size: size || 40 }); };
  X.explica = function (e) {
    if (e.sinEstimacion) return 'Sin estimación: ' + e.razon;
    if (e.usado === 'historial') return 'Dura unos ' + Math.round(e.med) + ' días por unidad (entre ' + Math.round(e.min) + ' y ' + Math.round(e.max) + '), con ' + e.n + ' entregas';
    return 'Usa la referencia de ' + S().productos[e.prodId].ref + ' días: ' + e.razon;
  };
  X.dias = function (e) { return e.diasRest <= 0 ? 'Se agota hoy' : 'Se agota en ' + e.diasRest + (e.diasRest === 1 ? ' día' : ' días'); };

  /* ---------- navegación ---------- */
  var NAV = [
    ['Operación', [['panel', 'Panel', 'grid'], ['reposicion', 'Reposición', 'flame', 'rep'], ['pedidos', 'Pedidos', 'inbox', 'ped'], ['dia', 'Planificación del día', 'route'], ['mensajes', 'Mensajes', 'msg', null, 'RF-MSG-01']]],
    ['Clientes y envases', [['hogares', 'Hogares', 'users'], ['envases', 'Libro de envases', 'cyl'], ['catalogo', 'Catálogo y precios', 'tag']]],
    ['Dinero', [['cobros', 'Cobros', 'wallet', 'cob'], ['cuadre', 'Cuadre', 'ledger', 'cua']]],
    ['Gestión', [['resultados', 'Resultados', 'flask', null, null, 'resultados'], ['equipo', 'Equipo y seguridad', 'shield', null, null, 'usuarios'], ['glp', 'Complemento GLP', 'flame', null, 'RF-GLP-01']]]
  ];
  function counts() {
    var s = S();
    return {
      rep: srv.sugeridos().filter(function (x) { return !x.motivo; }).length,
      ped: s.pedidos.filter(function (p) { return p.estado === 'por_confirmar'; }).length,
      cob: s.cobros.filter(function (c) { return c.estado === 'por_verificar' && !c.anulado; }).length,
      cua: s.jornadas.filter(function (j) { return j.fecha === s.hoy && j.estado === 'cerrada_app'; }).length
    };
  }
  function shell(r, content) {
    var s = S(), cn = counts(), u = s.rolPortal === 'dueno' ? 'Rosa Medina' : 'Julio Ramos';
    var nav = NAV.map(function (g) {
      return '<div class="nav-g">' + g[0] + '</div>' + g[1].map(function (n) {
        var locked = n[5] && !X.can(n[5]); var rr = n[4] && App.REQ[n[4]], tg = (rr && S().showRF) ? '<span class="phase-tag prio-' + rr.prio + '">' + UI.PRIO[rr.prio].label + '</span>' : '';
        var b = n[3] && cn[n[3]] ? '<span class="badge' + (n[3] === 'cua' ? '' : '') + '">' + cn[n[3]] + '</span>' : '';
        return '<a href="#/s2/' + n[0] + '" class="' + (r.page === n[0] ? 'on' : '') + '"' + (n[4] ? ' data-rf="' + n[4] + '" data-rf-pos="none"' : '') + (locked ? ' data-tip="Solo el dueño" style="opacity:.5"' : '') + '>' + ic(n[2], 18) + n[1] + (locked ? ic('lock', 13) : tg || b) + '</a>';
      }).join('');
    }).join('');
    var al = s.alertas.filter(function (a) { return !a.leida; }).length;
    return '<div class="portal"><aside class="sidebar"><div class="org"><span class="logo">' + ic('flame', 18) + '</span><div><b>' + esc(s.empresa.nombre) + '</b><small class="mut">Plan ' + s.empresa.plan + '</small></div></div><nav class="nav">' + nav + '</nav>' +
      '<div class="who"><small class="mut">Ver el portal como</small>' + UI.seg('rol', [['dueno', 'Dueño'], ['despachador', 'Despachador']], s.rolPortal, 's2.role') + '<div class="row" style="gap:8px">' + UI.avatar(u) + '<div><b>' + u + '</b><small style="display:block">' + (s.rolPortal === 'dueno' ? 'Dueña del negocio' : 'Despachador') + '</small></div></div></div></aside>' +
      '<div class="main"><div class="topbar"><span class="date">' + U.dow(s.hoy).replace(/^./, function (c) { return c.toUpperCase(); }) + ' ' + U.dmy(s.hoy) + '</span><div class="row"><span class="mut" style="font-size:13px">Reloj simulado ' + App.clock.hhmm() + '</span><button class="btn btn-ghost btn-icon" data-act="s2.alertas" aria-label="Alertas" style="position:relative">' + ic('bell', 19) + (al ? '<span style="position:absolute;top:2px;right:2px;background:var(--llama);color:#fff;border-radius:9px;font-size:10.5px;min-width:16px;height:16px;display:grid;place-items:center;font-weight:700">' + al + '</span>' : '') + '</button></div></div><div class="page">' + content + '</div></div></div>';
  }
  App.acts['s2.role'] = function (el) { S().rolPortal = el.dataset.v; var r = App.route; if ((r.page === 'resultados' || r.page === 'equipo') && !X.can(r.page === 'resultados' ? 'resultados' : 'usuarios')) { App.go('#/s2/panel'); UI.toast('Esa sección es solo para el dueño.', 'info'); return; } App.render(); };
  App.acts['s2.alertas'] = function () {
    var s = S(); s.alertas.forEach(function (a) { a.leida = true; });
    var body = s.alertas.length ? s.alertas.slice(0, 12).map(function (a) { return '<div class="row" style="padding:9px 0;border-bottom:1px solid var(--line);align-items:flex-start">' + ic(a.tipo === 'conflicto' ? 'alert' : 'bell', 18) + '<div class="grow"><div>' + esc(a.texto) + '</div><small>' + a.ts.slice(0, 10) + ' ' + a.ts.slice(11) + '</small></div></div>'; }).join('') : UI.empty('Sin alertas', 'Aquí aparecen los conflictos de sincronización, los avisos fallidos y los límites superados.');
    UI.modal({ title: 'Alertas', body: body, actions: [{ label: 'Cerrar', kind: 'btn-primary' }] });
    App.render();
  };
  function head(title, sub, actions) {
    return '<div class="page-head"><div><h1>' + title + '</h1>' + (sub ? '<p>' + sub + '</p>' : '') + '</div>' + (actions ? '<div class="actions">' + actions + '</div>' : '') + '</div>';
  }
  X.head = head;
  X.lock = function (que) { return '<div class="empty" style="padding:70px 20px"><div class="empty-ic">' + ic('lock', 26) + '</div><b>' + que + ' es solo para el dueño</b><p>Cambie a «Dueño» en el menú lateral para verlo.</p></div>'; };

  App.views.s2 = {
    render: function (r, host) {
      var pg = X.pages[r.page] || X.pages.panel;
      var rr = X.pages[r.page] ? r : { sys: 's2', page: 'panel', sub: '' };
      host.innerHTML = shell(rr, pg(rr.sub, rr));
    }
  };

  /* =====================================================
     Panel
     ===================================================== */
  X.pages.panel = function () {
    var s = S(), sug = srv.sugeridos().filter(function (x) { return !x.motivo; });
    var hor = srv.horizonte(7), prox = hor.slice(1).reduce(function (a, b) { return a + b.n; }, 0);
    var peds = s.pedidos.filter(function (p) { return p.estado !== 'cancelado'; });
    var hechas = s.pedidos.filter(function (p) { return p.estado === 'entregado'; }).length;
    var cobrado = s.cobros.filter(function (c) { return !c.anulado && !c.contra && c.medio !== 'abono' && c.medio !== 'fiado'; }).reduce(function (a, c) { return a + c.monto; }, 0);
    var porVer = s.cobros.filter(function (c) { return c.estado === 'por_verificar' && !c.anulado; });
    var calle = {}; s.hogares.forEach(function (h) { Object.keys(h.envSaldo).forEach(function (e) { calle[e] = (calle[e] || 0) + h.envSaldo[e]; }); });
    var calleTot = Object.keys(calle).reduce(function (a, k) { return a + calle[k]; }, 0);
    var med = { efectivo: 0, qr_negocio: 0, enlace: 0, fiado: 0 };
    s.cobros.forEach(function (c) { if (!c.anulado && !c.contra && med[c.medio] != null) med[c.medio] += c.monto; });
    var wk = X.weekly[X.weekly.length - 1], mt = srv.metricas();
    var fuel = sug.slice(0, 14).map(function (x) {
      return '<a class="fuel-i today" href="#/s2/reposicion" data-tip="' + esc(x.hogar.nombre + ': ' + X.dias(x.est)) + '">' + X.cyl(x.est, 46) + '<b>' + esc(x.hogar.nombre.split(' ')[0]) + '</b><span>' + (x.est.diasRest <= 0 ? 'hoy' : x.est.diasRest + ' d') + '</span></a>';
    }).join('');
    var rutas = ['U-R1', 'U-R2'].map(function (id) {
      var u = s.usuarios.filter(function (x) { return x.id === id; })[0], dv = s.dispositivos[id];
      var mine = s.pedidos.filter(function (p) { return p.repartidorId === id && p.estado !== 'cancelado'; });
      var done = mine.filter(function (p) { return p.estado === 'entregado' || p.estado === 'no_entregado'; }).length;
      var cob = s.cobros.filter(function (c) { return c.userId === id && !c.anulado && !c.contra; }).reduce(function (a, c) { return a + c.monto; }, 0);
      var stt = dv.ultimoContacto ? UI.pill(dv.pendientesRep ? 'warn' : 'ok', dv.pendientesRep ? dv.pendientesRep + ' por enviar' : 'Al día', dv.pendientesRep ? 'clock' : 'check') : UI.pill('mute', 'Sin contacto hoy', 'wifioff');
      return '<tr><td><div class="row">' + UI.avatar(u.nombre) + '<div><b>' + esc(u.nombre) + '</b><span class="sub">' + esc(u.vehiculo) + '</span></div></div></td><td class="num">' + done + ' de ' + mine.length + '</td><td class="num right">' + U.money(cob) + '</td><td>' + stt + '<span class="sub">' + (dv.ultimoContacto ? 'Último contacto ' + dv.ultimoContacto.slice(11) : 'La app no se ha conectado') + '</span></td></tr>';
    }).join('');
    var al = s.alertas.slice(0, 4).map(function (a) { return '<div class="row" style="padding:8px 0;border-bottom:1px solid var(--line);align-items:flex-start">' + ic(a.tipo === 'conflicto' ? 'alert' : 'bell', 17) + '<div style="font-size:13px">' + esc(a.texto) + '</div></div>'; }).join('') || '<p class="mut" style="margin:0">Sin alertas por ahora.</p>';
    return head('Buenos días, ' + (s.rolPortal === 'dueno' ? 'Rosa' : 'Julio'), 'Lo que pasa hoy en ' + esc(s.empresa.nombre) + ': a quién avisar, qué se reparte y cómo va el dinero.', '<a class="btn btn-primary" href="#/s2/reposicion">' + ic('flame', 17) + 'Revisar avisos de hoy</a>') +
      '<div class="fuel"><div class="fuel-top"><div><div class="fuel-fig">' + sug.length + '<small>hogares por avisar hoy</small></div><p class="mut2" style="margin:8px 0 0;max-width:62ch">Se les acaba el producto mañana o pasado según su ritmo de compra. Avisarles hoy es vender antes que el local de la esquina.</p></div><div style="text-align:right"><div class="mut" style="font-size:13px">Más en los próximos 7 días</div><b style="font-size:24px">' + prox + ' hogares</b></div></div><div class="fuel-row">' + (fuel || '<span class="mut">No hay hogares por avisar.</span>') + '</div><div class="fuel-axis"><span>Cada balón muestra cuánto le queda al hogar. En rojo: se acaba en menos de 2 días.</span><a href="#/s2/reposicion/horizonte">Ver el calendario de reposición</a></div></div>' +
      '<div class="kpis mt" style="--n:5">' +
      '<div class="kpi"><div class="l">Pedidos de hoy</div><div class="v">' + peds.length + '</div><div class="d">' + s.pedidos.filter(function (p) { return p.estado === 'por_confirmar'; }).length + ' por confirmar</div></div>' +
      '<div class="kpi"><div class="l">Entregas hechas</div><div class="v">' + hechas + '<small>de ' + peds.length + '</small></div><div class="d">' + s.pedidos.filter(function (p) { return p.estado === 'no_entregado'; }).length + ' no entregadas</div></div>' +
      '<div class="kpi"><div class="l">Cobrado hoy</div><div class="v">' + U.money(cobrado) + '</div><div class="d">' + porVer.length + ' por verificar</div></div>' +
      '<div class="kpi"><div class="l">Envases en la calle</div><div class="v">' + calleTot + '</div><div class="d">' + U.money(calleTot * 45) + ' en garantías [H]</div></div>' +
      '<div class="kpi" data-rf="RF-EXP-04"><div class="l">Pedidos por avisos, semana</div><div class="v">' + wk.pedidos + '</div><div class="d">' + C.spark(X.weekly.map(function (w) { return w.pedidos; })) + ' neto estimado ' + Math.max(0, Math.round(mt.incremental / 5)) + '</div></div></div>' +
      '<div class="grid-main mt-l"><div><div class="sect" style="margin-top:0"><div class="sect-h"><h2>Rutas de hoy</h2><a href="#/s2/dia">Planificación del día</a></div><div class="tbl-wrap"><table><thead><tr><th>Repartidor</th><th>Entregas</th><th class="right">Cobrado</th><th>Teléfono</th></tr></thead><tbody>' + rutas + '</tbody></table></div></div>' +
      '<div class="sect"><div class="sect-h"><h2>Cobrado hoy por medio de pago</h2></div>' + C.card({ title: 'Reparto del dinero cobrado', sub: 'Efectivo, QR del negocio, enlace de pago y fiado', body: C.seg([{ label: 'Efectivo', value: med.efectivo, color: C.SER[0] }, { label: 'QR del negocio', value: med.qr_negocio, color: C.SER[1] }, { label: 'Enlace de pago', value: med.enlace, color: C.SER[2] }, { label: 'Fiado', value: med.fiado, color: C.SER[3] }], { tall: true, fmt: U.money }), legend: C.legend([{ label: 'Efectivo ' + U.money(med.efectivo) }, { label: 'QR del negocio ' + U.money(med.qr_negocio) }, { label: 'Enlace de pago ' + U.money(med.enlace) }, { label: 'Fiado ' + U.money(med.fiado) }]), table: { cols: ['Medio', 'Monto'], rows: [['Efectivo', U.money(med.efectivo)], ['QR del negocio', U.money(med.qr_negocio)], ['Enlace de pago', U.money(med.enlace)], ['Fiado', U.money(med.fiado)]] } }) + '</div></div>' +
      '<div><div class="panel"><div class="panel-h"><h3>Alertas</h3><button class="btn btn-ghost btn-sm" data-act="s2.alertas">Ver todas</button></div><div class="panel-b">' + al + '</div></div>' +
      '<div class="panel mt"><div class="panel-h"><h3>Envases en la calle</h3></div><div class="panel-b">' + C.hbars(Object.keys(calle).map(function (k) { return { label: s.envases[k].nombre, value: calle[k] }; }), { color: C.SER[0] }) + '</div></div></div></div>';
  };

  /* =====================================================
     Reposición anticipada (RF-REP-*, RN-01..03, RN-08, RN-09)
     ===================================================== */
  var TABS = [['hoy', 'Avisos de hoy'], ['horizonte', 'Calendario'], ['perdidos', 'Posibles perdidos', 'RF-REP-09'], ['respuestas', 'Respuestas'], ['parametros', 'Parámetros']];
  function repTabs(act) {
    var sg = srv.sugeridos().filter(function (x) { return !x.motivo; }).length;
    return UI.tabs(TABS.map(function (t, i) { return [t[0], t[1], t[2], i === 0 ? sg : i === 2 ? srv.perdidos().length : null]; }), act, 's2/reposicion');
  }
  X.pages.reposicion = function (sub) {
    sub = sub || 'hoy';
    var body = ({ hoy: repHoy, horizonte: repHor, perdidos: repPer, respuestas: repRes, parametros: repPar }[sub] || repHoy)();
    return head('Reposición anticipada', 'El sistema estima cuándo se le acaba el producto a cada hogar y le avisa el día anterior. Usted aprueba la lista antes de que se envíe nada.') + repTabs(sub) + body;
  };
  function repHoy() {
    var s = S(), all = srv.sugeridos(), ok = all.filter(function (x) { return !x.motivo; }), ex = all.filter(function (x) { return x.motivo; });
    if (st.sel == null) { st.sel = {}; ok.forEach(function (x) { st.sel[x.key] = true; }); }
    var nSel = ok.filter(function (x) { return st.sel[x.key]; }).length;
    var costo = nSel * s.config.tarifaMarketing;
    var rows = ok.map(function (x) {
      return '<div class="aviso"><label class="check"><input type="checkbox" data-chg="rep.sel" data-k="' + x.key + '" ' + (st.sel[x.key] ? 'checked' : '') + '></label>' + X.cyl(x.est, 44) +
        '<div class="who2"><b>' + esc(x.hogar.nombre) + '</b><small>' + esc(x.hogar.distrito) + ', ' + esc(x.hogar.tel) + '</small></div>' +
        '<div><b>' + X.prodTxt({ p: x.prodId, qty: x.qty }) + '</b><small class="mut" style="display:block">' + esc(X.explica(x.est)) + '</small></div>' +
        '<div><b>' + X.dias(x.est) + '</b><small class="mut" style="display:block">Avisar hoy, entregar mañana</small></div><div class="row" style="justify-content:flex-end">' + (x.est.usado === 'referencia' ? UI.pill('warn', 'Referencia', 'info') : '') + (x.hogar.grupo === 'aviso' ? UI.pill('info', 'Grupo aviso') : '') + '<button class="btn btn-ghost btn-sm" data-act="rep.explicar" data-k="' + x.key + '">Cómo se calculó</button></div></div>';
    }).join('');
    var exr = ex.map(function (x) {
      return '<div class="aviso ex"><span></span>' + X.cyl(x.est, 36) + '<div class="who2"><b>' + esc(x.hogar.nombre) + '</b><small>' + esc(x.hogar.tel) + '</small></div><div>' + X.prodTxt({ p: x.prodId, qty: x.qty }) + '</div><div>' + UI.pill('mute', 'Excluido', 'x') + '</div><small style="text-align:right">' + esc(x.motivo) + '</small></div>';
    }).join('');
    var env = s.avisos.filter(function (a) { return a.fecha === s.hoy; });
    var envHtml = env.length ? '<div class="sect"><div class="sect-h"><h2>Envíos de hoy</h2><span class="mut">' + env.length + ' avisos</span></div><div class="aviso-list">' + env.map(avisoRow).join('') + '</div></div>' : '';
    var h = '<div class="aviso-list"><div class="aviso-h"' + rf('RF-REP-03,RF-REP-01') + '><span>' + ok.length + ' hogares sugeridos</span><span class="mut" style="font-weight:500">Se excluyen los que no cumplen las reglas de consentimiento, horario y grupo de control.</span><span class="grow"></span><button class="btn btn-sm" data-act="rep.todos">Marcar todos</button><button class="btn btn-sm" data-act="rep.ninguno">Quitar todos</button></div>' + (rows || '<div class="empty"><b>No hay avisos por enviar hoy</b><p>Vuelva mañana o revise el calendario.</p></div>') + '</div>';
    if (ex.length) h += '<div class="sect"><div class="sect-h"' + rf('RF-REP-04') + '><h2>Excluidos de hoy</h2><span class="mut">Cada exclusión queda registrada con su motivo</span></div><div class="aviso-list">' + exr + '</div></div>';
    h += '<div class="sticky-bar" data-rf="RF-REP-05" data-rf-pos="none"><span><b>' + nSel + '</b> seleccionados</span>' + UI.seg('modo', [['manual', 'Manual, sin costo'], ['api', 'Por la API de WhatsApp']], st.modo, 'rep.modo').replace('class="seg"', 'class="seg" style="background:#1d3d5e;border-color:#2d5580"') +
      '<span style="opacity:.8;font-size:13px">' + (st.modo === 'api' ? 'Costo estimado ' + U.money(costo) + ' (categoría marketing, tarifa de ejemplo)' : 'Se abre WhatsApp con el texto ya escrito') + '</span><span class="grow"></span><button class="btn btn-llama" data-act="rep.aprobar"' + (nSel ? '' : ' disabled') + '>' + ic('check', 17) + 'Aprobar lista</button></div>';
    return h + envHtml;
  }
  function avisoRow(a) {
    var h = hg(a.hogarId), s = S();
    var est = { manual: a.estado === 'por_enviar' ? UI.pill('warn', 'Por enviar a mano', 'clock') : UI.pill('ok', 'Enviado', 'check'), api: null }[a.modo];
    if (a.modo === 'api') est = ({ enviado: UI.pill('info', 'Enviado', 'send'), entregado: UI.pill('ok', 'Entregado', 'check'), leido: UI.pill('ok', 'Leído', 'eye'), fallido: UI.pill('bad', 'Falló: llamar', 'alert') })[a.estado];
    var resp = a.respuesta ? ({ si: UI.pill('ok', 'Respondió sí', 'check'), todavia: UI.pill('warn', 'Todavía tiene', 'clock'), no: UI.pill('bad', 'Pidió no recibir más', 'x'), libre: UI.pill('info', 'Escribió un mensaje', 'msg'), sin: UI.pill('mute', 'Sin respuesta') }[a.respuesta]) : '';
    var acts = '';
    if (a.modo === 'manual' && a.estado === 'por_enviar') acts = '<button class="btn btn-sm btn-primary" data-act="rep.wa" data-id="' + a.id + '"' + rf('RF-REP-06') + '>' + ic('msg', 15) + 'Abrir WhatsApp</button>';
    else if (!a.respuesta && a.estado !== 'fallido') acts = (a.modo === 'manual' ? '<span class="row" style="gap:4px"' + rf('RF-REP-06') + '>' + [['si', 'Sí'], ['todavia', 'Todavía tengo'], ['no', 'No'], ['sin', 'Sin respuesta']].map(function (r) { return '<button class="btn btn-sm" data-act="rep.resp" data-id="' + a.id + '" data-r="' + r[0] + '">' + r[1] + '</button>'; }).join('') + '</span>' : '<button class="btn btn-sm" data-act="rep.simresp" data-id="' + a.id + '">Simular respuesta del hogar</button>');
    else if (a.estado === 'fallido') acts = '<span class="mut" style="font-size:13px">Pasa a llamadas (RF-MSG-06)</span>';
    return '<div class="aviso" style="grid-template-columns:56px minmax(0,1.2fr) minmax(0,1fr) 190px auto"><div>' + C.cyl(0.4, { tipo: s.productos[a.prodId].tipo, size: 40 }) + '</div><div class="who2"><b>' + esc(h.nombre) + '</b><small>' + esc(h.tel) + ', ' + (a.modo === 'api' ? 'API' : 'manual') + ' ' + a.hora + '</small></div><div>' + X.prodTxt({ p: a.prodId, qty: a.qty }) + '</div><div class="col" style="gap:4px;align-items:flex-start">' + est + resp + '</div><div class="row wrap" style="justify-content:flex-end">' + acts + '</div></div>';
  }
  App.chg['rep.sel'] = function (el) { st.sel[el.dataset.k] = el.checked; App.render(); };
  App.acts['rep.todos'] = function () { st.sel = null; App.render(); };
  App.acts['rep.ninguno'] = function () { st.sel = {}; App.render(); };
  App.acts['rep.modo'] = function (el) { st.modo = el.dataset.v; App.render(); };
  App.acts['rep.explicar'] = function (el) {
    var x = srv.sugeridos().filter(function (i) { return i.key === el.dataset.k; })[0], e = x.est, s = S();
    var body = '<p class="lead">' + esc(x.hogar.nombre) + ': ' + X.prodTxt({ p: x.prodId, qty: x.qty }) + '</p><dl class="kv"><dt>Última entrega</dt><dd>' + U.dmy(e.last) + ' (' + e.lastQty + ' u)</dd><dt>Duraciones por unidad</dt><dd>' + (e.perUnit.length ? e.perUnit.map(function (v) { return v.toFixed(1); }).join(', ') + ' días' : 'No hay suficientes entregas') + '</dd><dt>Mediana</dt><dd>' + (e.med != null ? e.med.toFixed(1) + ' días (rango ' + e.min.toFixed(1) + ' a ' + e.max.toFixed(1) + ')' : '—') + '</dd><dt>Duración usada</dt><dd>' + e.dur.toFixed(1) + ' días por unidad (' + e.usado + ')</dd><dt>Se agota</dt><dd>' + U.dmy(e.agotamiento) + ' = ' + U.dmy(e.last) + ' + ' + e.ciclo + ' días</dd><dt>Fecha de aviso</dt><dd>' + U.dmy(e.fechaAviso) + ' (anticipación de ' + s.config.anticipacion + ' día)</dd></dl>' + (e.razon ? '<div class="note warn mt-s">' + esc(e.razon) + '</div>' : '') + '<p class="mut mt-s" style="font-size:13px">Es una mediana de intervalos, no aprendizaje profundo. Si el hogar responde «todavía tengo», el aviso se pospone ' + s.config.posponerDias + ' días.</p>';
    UI.modal({ title: 'Cómo se calculó', body: body, actions: [{ label: 'Entendido', kind: 'btn-primary' }] });
  };
  App.acts['rep.aprobar'] = function () {
    var items = srv.sugeridos().filter(function (x) { return !x.motivo && st.sel && st.sel[x.key]; });
    if (!items.length) return;
    var r = srv.aprobarAvisos(items, st.modo);
    if (!r.ok) { UI.toast(r.motivo, 'bad'); return; }
    st.sel = null; UI.toast(r.creados.length + ' avisos aprobados' + (st.modo === 'manual' ? ': ábralos uno por uno' : ' y enviados por la API'), 'ok'); App.render();
  };
  App.acts['rep.wa'] = function (el) {
    var a = S().avisos.filter(function (x) { return x.id === el.dataset.id; })[0], h = hg(a.hogarId);
    var url = 'https://wa.me/51' + h.tel.replace(/\D/g, '') + '?text=' + encodeURIComponent(a.texto);
    UI.modal({ title: 'WhatsApp del negocio', body: '<p class="mut">Vista previa: en el teléfono real se abre WhatsApp con este texto escrito. No se envía nada desde el prototipo.</p><div class="wa">' + esc(a.texto) + '<span class="wa-btn">Sí, mañana</span><span class="wa-btn">Todavía tengo</span><span class="wa-btn">No volver a escribir</span></div><p class="mt-s"><small>Enlace que se abriría</small></p><div class="code">' + esc(url) + '</div>', actions: [{ label: 'Cancelar' }, { label: 'Ya lo envié', kind: 'btn-primary', onClick: function () { srv.marcarEnviado(a); App.render(); } }] });
  };
  App.acts['rep.resp'] = function (el) {
    var a = S().avisos.filter(function (x) { return x.id === el.dataset.id; })[0];
    srv.responder(a, el.dataset.r); UI.toast(el.dataset.r === 'si' ? 'Se creó un pedido confirmado con el producto de la última entrega (RN-10).' : el.dataset.r === 'todavia' ? 'Aviso pospuesto ' + S().config.posponerDias + ' días.' : el.dataset.r === 'no' ? 'Baja registrada: no se le volverá a escribir.' : 'Registrado sin respuesta.', 'ok'); App.render();
  };
  App.acts['rep.simresp'] = function (el) { App.simRespuesta(el.dataset.id); };

  function repHor() {
    var s = S(), hor = srv.horizonte(14);
    var items = hor.map(function (b) { return { label: b.d === 0 ? 'Hoy' : U.dm(U.addDays(s.hoy, b.d)).slice(0, 5), value: b.n, hi: b.d === st.day, tip: (b.d === 0 ? 'Hoy' : U.dmy(U.addDays(s.hoy, b.d))) + ': ' + b.n + ' hogares por avisar', color: b.d === 0 ? C.SER[1] : C.SER[0] }; });
    var sel = hor[st.day] || hor[1];
    var chips = '<div class="row wrap" style="margin:6px 0 14px">' + hor.map(function (b) { return '<button class="btn btn-sm ' + (b.d === st.day ? 'btn-primary' : '') + '" data-act="rep.dia" data-d="' + b.d + '">' + (b.d === 0 ? 'Hoy' : '+' + b.d + ' d') + ' (' + b.n + ')</button>'; }).join('') + '</div>';
    var list = sel.items.map(function (id) { var h = hg(id), e = est.estimar(h, h.productos[0].p); return '<tr><td><b>' + esc(h.nombre) + '</b><span class="sub">' + esc(h.distrito) + '</span></td><td>' + X.prodTxt({ p: h.productos[0].p, qty: e.lastQty }) + '</td><td>' + U.dmy(e.agotamiento) + '</td><td>' + X.consentPill(h) + '</td><td>' + (h.grupo === 'control' ? UI.pill('mute', 'Control, no se avisa') : h.grupo === 'aviso' ? UI.pill('info', 'Aviso') : '') + '</td></tr>'; }).join('');
    return '<div class="grid-main"><div>' + C.card({ title: 'Hogares por avisar en los próximos 14 días', sub: 'Según la fecha estimada de aviso de cada hogar. Haga clic en un día para ver quiénes son.', body: C.columns(items, { aria: 'Hogares por avisar por día', showAll: false }), table: { cols: ['Día', 'Hogares'], rows: hor.map(function (b) { return [b.d === 0 ? 'Hoy' : U.dmy(U.addDays(s.hoy, b.d)), b.n]; }) }, note: 'La carga de avisos por día sirve para planificar repartidores y carga de envases.' }) + '</div><div class="panel"><div class="panel-b"><h4>Cómo leer el calendario</h4><p class="mut2" style="font-size:13.5px;margin-top:6px">Cada columna es un día. Los hogares del grupo de control del experimento aparecen aquí, pero no reciben aviso (RN-08). Los hogares sin consentimiento tampoco.</p></div></div></div>' + chips +
      '<div class="tbl-wrap"><table><thead><tr><th>Hogar</th><th>Producto</th><th>Se agota</th><th>Consentimiento</th><th>Experimento</th></tr></thead><tbody>' + (list || '<tr><td colspan="5" class="tbl-empty">Nadie por avisar ese día.</td></tr>') + '</tbody></table></div>';
  }
  App.acts['rep.dia'] = function (el) { st.day = +el.dataset.d; App.render(); };

  function repPer() {
    var per = srv.perdidos();
    return '<div class="note" style="margin-bottom:14px"' + rf('RF-REP-09') + '>Hogares que pasaron su fecha prevista por más de ' + S().config.perdidoDias + ' días sin comprar. Llámelos: pueden estar comprando en otro local, que aparece más barato en Facilito.</div>' + UI.table('perdidos', { rows: function () { return srv.perdidos(); }, rowId: function (r) { return r.hogar.id; }, search: function (r) { return r.hogar.nombre + r.hogar.tel; }, cols: [
      { label: 'Hogar', render: function (r) { return '<b>' + esc(r.hogar.nombre) + '</b><span class="sub">' + esc(r.hogar.tel) + '</span>'; }, sort: function (r) { return r.hogar.nombre; } },
      { label: 'Producto', render: function (r) { return X.prodTxt({ p: r.prodId, qty: r.est.lastQty }); } },
      { label: 'Última compra', render: function (r) { return U.dmy(r.est.last); }, sort: function (r) { return r.est.last; } },
      { label: 'Días de atraso', align: 'right', render: function (r) { return '<b class="' + (r.late > 30 ? 'dn' : '') + '">' + r.late + '</b>'; }, sort: function (r) { return r.late; } },
      { label: 'Envases prestados', align: 'right', render: function (r) { return Object.keys(r.hogar.envSaldo).reduce(function (a, k) { return a + r.hogar.envSaldo[k]; }, 0); } },
      { label: '', nosort: true, render: function (r) { return '<button class="btn btn-sm" data-act="rep.llamar" data-id="' + r.hogar.id + '">' + ic('phone', 14) + 'Llamar</button> <button class="btn btn-sm btn-primary" data-act="rep.pedir" data-id="' + r.hogar.id + '">Crear pedido</button>'; } }
    ], empty: 'No hay hogares atrasados.' });
  }
  App.acts['rep.llamar'] = function (el) { var h = hg(el.dataset.id); UI.modal({ title: 'Llamar a ' + esc(h.nombre), body: '<p class="lead">' + esc(h.tel) + '</p><div class="field"><label>Resultado de la llamada</label><select class="select" name="r"><option>Dijo que sí, quiere un pedido</option><option>Ya compró en otro local</option><option>No contesta</option><option>Se mudó</option></select></div>', actions: [{ label: 'Cancelar' }, { label: 'Guardar', kind: 'btn-primary', onClick: function (m) { srv.audit('Llamada de recuperación', h.id + ': ' + m.val('r')); UI.toast('Llamada registrada', 'ok'); } }] }); };
  App.acts['rep.pedir'] = function (el) { var h = hg(el.dataset.id), pr = h.productos[0]; var p = srv.crearPedido({ hogarId: h.id, items: [{ p: pr.p, qty: pr.qty }], origen: 'llamada', estado: 'confirmado', notas: 'Recuperado desde posibles perdidos' }); UI.toast('Pedido ' + p.id + ' creado y confirmado', 'ok'); App.render(); };

  function repRes() {
    var s = S();
    return UI.table('resp', { rows: function () { return s.avisos.slice().reverse(); }, rowId: function (r) { return r.id; }, search: function (r) { return X.nombre(r.hogarId); }, cols: [
      { label: 'Aviso', render: function (r) { return '<b>' + r.id + '</b><span class="sub">' + U.dm(r.fecha) + ' ' + r.hora + '</span>'; } },
      { label: 'Hogar', render: function (r) { return esc(X.nombre(r.hogarId)); } },
      { label: 'Modo', render: function (r) { return r.modo === 'api' ? 'API' : 'Manual'; } },
      { label: 'Estado', render: function (r) { return r.estado; } },
      { label: 'Respuesta', render: function (r) { return r.respuesta ? ({ si: 'Sí', todavia: 'Todavía tengo', no: 'No volver a escribir', libre: 'Mensaje libre', sin: 'Sin respuesta' })[r.respuesta] : '<span class="mut">Pendiente</span>'; } },
      { label: 'Pedido', render: function (r) { return r.pedidoId || '—'; } },
      { label: 'Costo', align: 'right', render: function (r) { return r.costo ? U.money(r.costo) : 'Sin costo'; } }
    ], empty: 'Todavía no se enviaron avisos.' });
  }

  function repPar() {
    var s = S(), c = s.config, dis = X.can('config') ? '' : ' disabled';
    var h = hg(st.probar) || hg('H-001'), e = est.estimar(h, h.productos[0].p);
    return '<div class="grid-main"><div><div class="panel"><div class="panel-h"><h3>Cómo se calcula el aviso</h3>' + (X.can('config') ? '' : UI.pill('mute', 'Solo el dueño puede cambiarlos', 'lock')) + '</div><div class="panel-b">' +
      '<div class="form2"><div class="field"' + rf('RF-REP-01') + '><label>Entregas que se usan (k)</label><select class="select" name="k" data-chg="rep.cfg" data-f="k"' + dis + '>' + [2, 3, 4, 5, 6].map(function (v) { return '<option' + (c.k === v ? ' selected' : '') + '>' + v + '</option>'; }).join('') + '</select><small>Mediana de las últimas k duraciones por unidad.</small></div>' +
      '<div class="field"' + rf('RF-REP-03') + '><label>Anticipación del aviso (días)</label><select class="select" data-chg="rep.cfg" data-f="anticipacion"' + dis + '>' + [0, 1, 2, 3].map(function (v) { return '<option' + (c.anticipacion === v ? ' selected' : '') + '>' + v + '</option>'; }).join('') + '</select><small>Se avisa este número de días antes de que se agote.</small></div></div>' +
      '<div class="field"' + rf('RF-REP-02') + '><label>Hogares con menos de 2 entregas</label><select class="select" data-chg="rep.cfg" data-f="sinHistorial"' + dis + '><option value="referencia"' + (c.sinHistorial === 'referencia' ? ' selected' : '') + '>Usar la duración de referencia del producto</option><option value="noavisar"' + (c.sinHistorial === 'noavisar' ? ' selected' : '') + '>No avisar hasta tener historial</option></select></div>' +
      '<div class="form3"><div class="field"><label>Pospuesto por «todavía tengo» (días)</label><input class="input" type="number" min="1" max="14" value="' + c.posponerDias + '" data-chg="rep.cfg" data-f="posponerDias"' + dis + ' ' + rf('RF-REP-08') + '></div><div class="field"><label>Posible perdido tras (días)</label><input class="input" type="number" min="7" max="60" value="' + c.perdidoDias + '" data-chg="rep.cfg" data-f="perdidoDias"' + dis + '></div><div class="field"><label>Avisos por ciclo (máx. 2)</label><select class="select" data-chg="rep.cfg" data-f="maxAvisos"' + dis + '><option' + (c.maxAvisos === 1 ? ' selected' : '') + '>1</option><option' + (c.maxAvisos === 2 ? ' selected' : '') + '>2</option></select></div></div>' +
      '<div class="form2"><div class="field"><label>Horario permitido, desde</label><input class="input" type="time" value="' + c.horaIni + '" data-chg="rep.cfg" data-f="horaIni"' + dis + '></div><div class="field"><label>Hasta</label><input class="input" type="time" value="' + c.horaFin + '" data-chg="rep.cfg" data-f="horaFin"' + dis + '></div></div>' +
      '<div class="setting" ' + rf('RF-REP-05') + '><div><b>Enviar automáticamente la lista sin aprobación</b><span class="d">Apagado por defecto: nada se envía sin que usted apruebe la lista.</span></div><label class="switch"><input type="checkbox" ' + (c.envioAuto ? 'checked' : '') + ' data-chg="rep.auto"' + dis + '><i></i></label></div></div></div>' +
      '<div class="panel mt"><div class="panel-h"><h3>Duración de referencia y rango por producto</h3></div><div class="panel-b"><div class="tbl-wrap"><table><thead><tr><th>Producto</th><th class="right">Referencia (días)</th><th class="right">Rango válido</th></tr></thead><tbody>' + Object.keys(s.productos).map(function (k) { var p = s.productos[k]; return '<tr><td>' + esc(p.nombre) + '</td><td class="right"><input class="input sm" style="width:80px;text-align:right" type="number" min="1" value="' + p.ref + '" data-chg="rep.ref" data-p="' + k + '"' + dis + '></td><td class="right">' + p.rango[0] + ' a ' + p.rango[1] + ' días</td></tr>'; }).join('') + '</tbody></table></div><small class="mut">Si la mediana del hogar queda fuera del rango, se usa la referencia (RN-09).</small></div></div></div>' +
      '<div class="panel"><div class="panel-h"><h3>Probar con un hogar</h3></div><div class="panel-b"><div class="field"><label>Hogar</label><select class="select" data-chg="rep.probar">' + ['H-001', 'H-003', 'H-014', 'H-015', 'H-005', 'H-022'].map(function (id) { return '<option value="' + id + '"' + (st.probar === id ? ' selected' : '') + '>' + id + ' ' + esc(hg(id).nombre) + '</option>'; }).join('') + '</select></div><div class="row" style="gap:16px;align-items:center">' + X.cyl(e, 64) + '<div><b style="font-size:17px">' + X.dias(e) + '</b><div class="mut2">' + esc(X.explica(e)) + '</div></div></div><dl class="kv mt"><dt>Fecha de aviso</dt><dd><b>' + U.dmy(e.fechaAviso) + '</b></dd><dt>Se agota</dt><dd>' + U.dmy(e.agotamiento) + '</dd><dt>Duración usada</dt><dd>' + e.dur.toFixed(1) + ' días por unidad</dd><dt>Origen</dt><dd>' + e.usado + '</dd></dl>' + (e.razon ? '<div class="note warn mt-s">' + esc(e.razon) + '</div>' : '') + '</div></div></div>';
  }
  App.chg['rep.cfg'] = function (el) {
    if (X.deny('config')) { App.render(); return; }
    var f = el.dataset.f, v = el.value; var c = S().config;
    c[f] = (f === 'horaIni' || f === 'horaFin' || f === 'sinHistorial') ? v : +v;
    srv.audit('Cambió parámetro de reposición', f + ' = ' + v); App.render();
  };
  App.chg['rep.auto'] = function (el) { if (X.deny('config')) { App.render(); return; } S().config.envioAuto = el.checked; srv.audit('Cambió el envío automático', String(el.checked)); UI.toast(el.checked ? 'Envío automático activado: la lista se enviará sin aprobación.' : 'Envío automático apagado.', el.checked ? 'info' : 'ok'); };
  App.chg['rep.ref'] = function (el) { if (X.deny('config')) { App.render(); return; } S().productos[el.dataset.p].ref = Math.max(1, +el.value); srv.audit('Cambió la duración de referencia', el.dataset.p + ' = ' + el.value); App.render(); };
  App.chg['rep.probar'] = function (el) { st.probar = el.value; App.render(); };

  /* =====================================================
     Pedidos (RF-PED-01 a 05)
     ===================================================== */
  X.pages.pedidos = function (sub) {
    sub = sub || 'bandeja';
    var s = S();
    var by = function (e) { return s.pedidos.filter(function (p) { return p.estado === e; }).length; };
    var kp = '<div class="kpis" style="--n:4;margin-bottom:18px"><div class="kpi"><div class="l">Por confirmar</div><div class="v">' + by('por_confirmar') + '</div></div><div class="kpi"><div class="l">Confirmados sin asignar</div><div class="v">' + s.pedidos.filter(function (p) { return p.estado === 'confirmado'; }).length + '</div></div><div class="kpi"><div class="l">Asignados y en ruta</div><div class="v">' + (by('asignado') + by('en_ruta')) + '</div></div><div class="kpi"><div class="l">Entregados</div><div class="v">' + by('entregado') + '</div></div></div>';
    var body = sub === 'recurrentes' ? pedRec() : pedBandeja();
    return head('Pedidos', 'Una sola bandeja para lo que llega por mensaje, llamada, aviso, ruta o recurrencia.', '<button class="btn btn-primary" data-act="ped.nuevo"' + rf('RF-PED-01') + '>' + ic('plus', 17) + 'Pedido telefónico</button>') + kp + UI.tabs([['bandeja', 'Bandeja'], ['recurrentes', 'Recurrentes', 'RF-PED-05']], sub, 's2/pedidos') + body;
  };
  function dupDe(p) {
    return S().pedidos.some(function (q) { return q.id !== p.id && q.hogarId === p.hogarId && ['por_confirmar', 'confirmado', 'asignado', 'en_ruta'].indexOf(q.estado) >= 0 && q.items[0].p === p.items[0].p && ['por_confirmar', 'confirmado', 'asignado', 'en_ruta'].indexOf(p.estado) >= 0; });
  }
  function pedBandeja() {
    return UI.table('ped', { rows: function () { return S().pedidos.slice().reverse(); }, rowId: function (r) { return r.id; }, rowAct: 'ped.ver', search: function (r) { return r.id + X.nombre(r.hogarId); }, rowRf: 'RF-PED-01', filters: [
      { k: 'estado', label: 'Estado', options: [['por_confirmar', 'Por confirmar'], ['confirmado', 'Confirmado'], ['asignado', 'Asignado'], ['en_ruta', 'En ruta'], ['entregado', 'Entregado'], ['no_entregado', 'No entregado'], ['cancelado', 'Cancelado']], test: function (r, v) { return r.estado === v; } },
      { k: 'origen', label: 'Origen', options: [['aviso', 'Aviso'], ['mensaje', 'Mensaje libre'], ['llamada', 'Llamada'], ['ruta', 'Venta en ruta'], ['recurrente', 'Recurrente']], test: function (r, v) { return r.origen === v; } }
    ], cols: [
      { label: 'Pedido', render: function (r) { return '<b>' + r.id + '</b><span class="sub">' + r.creado.slice(11) + '</span>'; }, sort: function (r) { return r.id; } },
      { label: 'Hogar', render: function (r) { return esc(X.nombre(r.hogarId)) + (dupDe(r) ? ' <span class="pill st-warn" data-rf="RF-PED-04" data-rf-pos="none" data-tip="Ya hay otro pedido abierto del mismo producto para este hogar (RF-PED-04)">' + ic('alert', 12) + 'Posible duplicado</span>' : ''); } },
      { label: 'Producto', render: function (r) { return r.items.map(X.prodTxt).join(', '); } },
      { label: 'Total', align: 'right', render: function (r) { return '<span class="num">' + U.money(r.total) + '</span>'; }, sort: function (r) { return r.total; } },
      { label: 'Origen', render: function (r) { return UI.origen(r.origen); } },
      { label: 'Estado', render: function (r) { return UI.estadoPedido(r.estado); } },
      { label: 'Repartidor', render: function (r) { return r.repartidorId ? esc(App.nombreUsuario(r.repartidorId)) : '<span class="mut">Sin asignar</span>'; } }
    ], pageSize: 10 });
  }
  App.acts['ped.ver'] = function (el) {
    var p = App.pedido(el.dataset.id), h = hg(p.hogarId), s = S();
    var tl = '<ul class="tl"' + rf('RF-PED-02') + '>' + p.hist.map(function (x) { return '<li class="' + (x.estado === 'entregado' ? 'ok' : x.estado === 'cancelado' || x.estado === 'no_entregado' ? 'bad' : '') + '"><b>' + UI.estadoPedido(x.estado).replace(/<[^>]+>/g, '') + '</b><div class="mut">' + x.ts.slice(0, 10) + ' ' + x.ts.slice(11) + ', ' + esc(x.por) + (x.motivo ? ': ' + esc(x.motivo) : '') + '</div></li>'; }).join('') + '</ul>';
    var acts = [];
    if (p.estado === 'por_confirmar') acts.push({ label: 'Confirmar pedido', kind: 'btn-primary', onClick: function () { srv.confirmar(p); UI.toast('Pedido confirmado con el precio vigente (RN-06).', 'ok'); App.render(); } });
    if (p.estado === 'confirmado') acts.push({ label: 'Asignar a Luis', kind: 'btn-primary', onClick: function () { srv.asignar([p.id], 'U-R1'); UI.toast('Asignado a Luis. ' + (s.devices['U-R1'] && s.devices['U-R1'].pkg ? 'Llegará a su teléfono cuando tenga señal.' : 'Estará en su paquete del día.'), 'ok'); App.render(); } }, { label: 'Asignar a Marco', onClick: function () { srv.asignar([p.id], 'U-R2'); UI.toast('Asignado a Marco', 'ok'); App.render(); } });
    if (['por_confirmar', 'confirmado', 'asignado'].indexOf(p.estado) >= 0) acts.push({ label: 'Cancelar pedido', kind: 'btn-danger', onClick: function () { srv.cancelarPedido(p, 'Cancelado por el despachador'); UI.toast('Pedido cancelado' + (p.repartidorId ? ': el repartidor lo verá al sincronizar.' : ''), 'ok'); App.render(); } });
    acts.unshift({ label: 'Cerrar' });
    UI.modal({ title: 'Pedido ' + p.id, wide: true, body: '<div class="grid2"><div><dl class="kv"><dt>Hogar</dt><dd><b>' + esc(h.nombre) + '</b><br>' + esc(h.dir) + ', ' + esc(h.distrito) + '<br>' + esc(h.tel) + '</dd><dt>Producto</dt><dd>' + p.items.map(X.prodTxt).join(', ') + '</dd><dt>Total</dt><dd><b>' + U.money(p.total) + '</b> <small>(precio vigente al confirmar, RN-06)</small></dd><dt>Origen</dt><dd>' + UI.origen(p.origen) + '</dd><dt>Estado</dt><dd>' + UI.estadoPedido(p.estado) + '</dd><dt>Repartidor</dt><dd>' + (p.repartidorId ? esc(App.nombreUsuario(p.repartidorId)) : 'Sin asignar') + '</dd></dl>' + (p.notas ? '<div class="note mt-s"' + rf('RF-PED-03') + '>' + esc(p.notas) + (p.origen === 'mensaje' ? '<br><small>Convierta el mensaje en pedido con un clic: confirme abajo. No se interpreta automáticamente.</small>' : '') + '</div>' : '') + (p.estado === 'entregado' ? '<p class="mt-s"><a href="#/s3/eventos">Ver los eventos que lo respaldan en S3</a></p>' : '') + '</div><div><h4 style="margin-bottom:10px">Historial</h4>' + tl + '</div></div>', actions: acts });
  };
  App.acts['ped.nuevo'] = function () {
    var s = S(), t0 = Date.now();
    var opts = s.hogares.slice(0, 60).map(function (h) { return '<option value="' + h.id + '">' + h.id + ' ' + esc(h.nombre) + ' (' + esc(h.tel) + ')</option>'; }).join('');
    UI.modal({ title: 'Pedido telefónico', body: '<div class="field"><label>Hogar</label><select class="select" name="h">' + opts + '</select></div><div class="form2"><div class="field"><label>Producto</label><select class="select" name="p">' + Object.keys(s.productos).map(function (k) { return '<option value="' + k + '">' + esc(s.productos[k].nombre) + '</option>'; }).join('') + '</select></div><div class="field"><label>Cantidad</label><input class="input" name="q" type="number" min="1" value="1"></div></div><div class="field"><label>Notas</label><input class="input" name="n" placeholder="Opcional"></div><small class="mut">Meta: registrar un pedido telefónico en menos de 30 segundos.</small>', actions: [{ label: 'Cancelar' }, { label: 'Registrar pedido', kind: 'btn-primary', onClick: function (m) {
      var h = hg(m.val('h')), it = { p: m.val('p'), qty: Math.max(1, +m.val('q')) };
      var dup = s.pedidos.some(function (q) { return q.hogarId === h.id && q.items[0].p === it.p && ['por_confirmar', 'confirmado', 'asignado', 'en_ruta'].indexOf(q.estado) >= 0; });
      var p = srv.crearPedido({ hogarId: h.id, items: [it], origen: 'llamada', estado: 'confirmado', notas: m.val('n') });
      var seg = Math.max(1, Math.round((Date.now() - t0) / 1000));
      UI.toast('Pedido ' + p.id + ' registrado en ' + seg + ' s.' + (dup ? ' Atención: ya había otro pedido abierto de este producto para el hogar.' : ''), dup ? 'info' : 'ok'); App.render();
    } }] });
  };
  function pedRec() {
    var s = S();
    var rows = s.hogares.filter(function (h) { return h.productos[0].p === 'AGUA20'; }).slice(0, 6);
    return '<div class="note" style="margin-bottom:14px"' + rf('RF-PED-05') + '>Los pedidos recurrentes se generan la noche anterior. Sirven para agua y para clientes con comprobante fijo, como pollerías o comedores.</div><div class="tbl-wrap"' + rf('RF-PED-05') + '><table><thead><tr><th>Hogar</th><th>Producto</th><th>Frecuencia</th><th>Próximo pedido</th><th></th></tr></thead><tbody>' + rows.map(function (h, i) { var f = [3, 4, 5, 3, 6, 4][i]; return '<tr><td><b>' + esc(h.nombre) + '</b><span class="sub">' + esc(h.distrito) + '</span></td><td>' + X.prodTxt(h.productos[0]) + '</td><td>Cada ' + f + ' días</td><td>' + U.dmy(U.addDays(s.hoy, i % 3 + 1)) + '</td><td class="right"><button class="btn btn-sm" data-act="ped.recurrente" data-id="' + h.id + '">Generar ahora</button></td></tr>'; }).join('') + '</tbody></table></div>';
  }
  App.acts['ped.recurrente'] = function (el) { var h = hg(el.dataset.id), pr = h.productos[0]; var p = srv.crearPedido({ hogarId: h.id, items: [{ p: pr.p, qty: pr.qty }], origen: 'recurrente', estado: 'confirmado', recurrente: true, notas: 'Pedido recurrente' }); UI.toast('Se generó el pedido ' + p.id, 'ok'); };

  /* datos simulados del reporte semanal (se usan en el panel y en resultados) */
  X.weekly = [
    { sem: 'Sem 1', enviados: 38, resp: 21, pedidos: 14, bajas: 1, costo: 9.5 },
    { sem: 'Sem 2', enviados: 52, resp: 31, pedidos: 21, bajas: 1, costo: 13 },
    { sem: 'Sem 3', enviados: 49, resp: 30, pedidos: 22, bajas: 0, costo: 12.25 },
    { sem: 'Sem 4', enviados: 55, resp: 34, pedidos: 25, bajas: 2, costo: 13.75 },
    { sem: 'Sem 5', enviados: 20, resp: 12, pedidos: 9, bajas: 0, costo: 5 }
  ];
})();

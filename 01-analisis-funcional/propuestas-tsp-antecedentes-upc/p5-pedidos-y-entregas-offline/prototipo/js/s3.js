/* S3 — Plataforma central: consola técnica. Muestra lo que normalmente nadie ve:
   registro de eventos, sincronización, motor de reposición, adaptadores y seguridad. */
(function () {
  'use strict';
  var App = window.App, U = App.U, UI = App.UI, C = App.Charts, ic = App.ic, esc = U.esc, rf = App.rf, srv = App.srv, est = App.est;
  var S = function () { return App.S; };
  var P = {}, st = { tests: {}, jobs: [], lastRun: null, evSel: null };

  var NAV = [
    ['resumen', 'Resumen', 'activity'], ['eventos', 'Registro de eventos', 'db'], ['sync', 'Sincronización', 'refresh'], ['reposicion', 'Motor de reposición', 'flame'],
    ['mensajeria', 'Adaptador de mensajería', 'msg'], ['pagos', 'Adaptador de pagos', 'wallet'], ['experimento', 'Experimento', 'flask'], ['seguridad', 'Seguridad y auditoría', 'shield']
  ];
  App.views.s3 = {
    render: function (r, host) {
      var pg = P[r.page] ? r.page : 'resumen';
      host.innerHTML = '<div class="console"><aside class="sidebar"><div class="org"><span class="logo" style="background:var(--agua);color:#0e1924">' + ic('layers', 18) + '</span><div><b>Plataforma central</b><small class="mut">S3, monolito modular</small></div></div><nav class="nav">' + NAV.map(function (n) { return '<a href="#/s3/' + n[0] + '" class="' + (pg === n[0] ? 'on' : '') + '">' + ic(n[2], 18) + n[1] + '</a>'; }).join('') + '</nav><div class="who"><small class="mut">Esta consola no la usa el cliente: es lo que ocurre detrás de la app y el portal.</small></div></aside><div class="main"><div class="page">' + P[pg](r.sub) + '</div></div></div>';
    }
  };
  function head(t, s, a) { return '<div class="page-head"><div><h1>' + t + '</h1>' + (s ? '<p>' + s + '</p>' : '') + '</div>' + (a ? '<div class="actions">' + a + '</div>' : '') + '</div>'; }
  var svcRow = function (n, d, k, t) { return '<div class="svc"><span class="dot ' + k + '"></span><b>' + n + '</b><span class="mut2 grow">' + d + '</span>' + UI.pill(k === 'ok' ? 'ok' : k === 'warn' ? 'warn' : 'bad', t, k === 'ok' ? 'check' : 'alert') + '</div>'; };

  /* ---------- resumen ---------- */
  P.resumen = function () {
    var s = S(), ev = s.eventLog, ac = ev.filter(function (e) { return e.estado === 'aceptado'; }).length, rj = ev.filter(function (e) { return e.estado === 'rechazado'; }).length;
    var disp = Object.keys(s.dispositivos).filter(function (k) { return s.dispositivos[k].ultimoContacto; }).length;
    return head('Resumen de la plataforma', 'Estado de los servicios internos y de los adaptadores hacia WhatsApp y la pasarela de pagos.') +
      '<div class="kpis" style="--n:4"><div class="kpi"><div class="l">Eventos recibidos hoy</div><div class="v">' + ev.length + '</div><div class="d">' + ac + ' aceptados, ' + rj + ' rechazados</div></div><div class="kpi"><div class="l">Dispositivos con contacto</div><div class="v">' + disp + '<small>de 2</small></div></div><div class="kpi"><div class="l">Última tarea de reposición</div><div class="v" style="font-size:22px">' + (st.lastRun || 'Hoy 03:00') + '</div><div class="d">Corre cada madrugada</div></div><div class="kpi"><div class="l">Costo de infraestructura</div><div class="v">USD 30–80<small>al mes</small></div><div class="d">Estimación del MVP [H]</div></div></div>' +
      '<div class="grid-main mt-l"><div class="panel"><div class="panel-h"><h3>Servicios</h3><span class="mut">Simulados</span></div><div class="panel-b">' + svcRow('API de sincronización', 'Idempotente, por lotes, con acuses', 'ok', 'Operativo') + svcRow('Registro de eventos', 'Solo inserción, fuente de verdad', 'ok', 'Operativo') + svcRow('Motor de reposición', 'Tarea diaria de madrugada', 'ok', 'Corrió hoy') + svcRow('Adaptador de mensajería', s.flags.whatsappApi ? 'WhatsApp Cloud API (simulada)' : 'Solo modo manual', 'ok', s.flags.whatsappApi ? 'Operativo' : 'Modo manual') + svcRow('Adaptador de pagos', 'Pasarela con Yape (simulada)', 'ok', 'Operativo') + svcRow('PostgreSQL por empresa', 'Datos aislados por empresa', 'ok', 'Operativo') + svcRow('Respaldo diario', 'Último respaldo hoy 02:00', 'ok', 'Al día') + '</div></div>' +
      '<div class="panel"><div class="panel-b"><h4>Cómo se conectan</h4><div style="margin-top:10px">' + App.archSvg() + '</div></div></div></div>';
  };

  /* ---------- registro de eventos (RF-SYN-01 a 04, RN-04) ---------- */
  var TIPOS = { 'entrega.registrada': 'Entrega registrada', 'envase.movimiento': 'Movimiento de envases', 'cobro.registrado': 'Cobro registrado', 'entrega.no_realizada': 'Entrega no realizada', 'hogar.alta': 'Hogar nuevo', 'consentimiento.registrado': 'Consentimiento', 'pedido.creado': 'Venta en ruta', 'carga.confirmada': 'Carga confirmada', 'jornada.cerrada': 'Jornada cerrada' };
  P.eventos = function () {
    var s = S(), ev = s.eventLog;
    var acc = ev.filter(function (e) { return e.estado === 'aceptado'; }).length, rej = ev.filter(function (e) { return e.estado === 'rechazado'; }).length;
    return head('Registro de eventos', 'Toda operación de la app llega como un evento con identificador único. Pedidos, envases, cobros y cuadre se calculan a partir de aquí. Solo se insertan eventos: nunca se editan ni se borran.') +
      '<div class="kpis" style="--n:3;margin-bottom:16px"><div class="kpi"><div class="l">Eventos guardados</div><div class="v">' + ev.length + '</div></div><div class="kpi"><div class="l">Aceptados</div><div class="v">' + acc + '</div></div><div class="kpi"><div class="l">Rechazados</div><div class="v">' + rej + '</div><div class="d">Con motivo visible para el dispositivo</div></div></div><div ' + rf('RF-SYN-01') + '>' +
      UI.table('ev', { rows: function () { return S().eventLog.slice().reverse(); }, rowId: function (r) { return r.uuid; }, rowAct: 's3.ev', search: function (r) { return r.uuid + r.tipo + r.dispositivo; }, pageSize: 12, filters: [
        { k: 't', label: 'Tipo', options: Object.keys(TIPOS).map(function (k) { return [k, TIPOS[k]]; }), test: function (r, v) { return r.tipo === v; } },
        { k: 'e', label: 'Estado', options: [['aceptado', 'Aceptado'], ['rechazado', 'Rechazado']], test: function (r, v) { return r.estado === v; } },
        { k: 'd', label: 'Dispositivo', options: [['DEV-R1', 'DEV-R1'], ['DEV-R2', 'DEV-R2']], test: function (r, v) { return r.dispositivo === v; } }
      ], cols: [
        { label: 'N.º', align: 'right', render: function (r) { return r.seq; }, sort: function (r) { return r.seq; } },
        { label: 'Identificador', render: function (r) { return '<span class="num">' + U.short(r.uuid) + '</span>'; } },
        { label: 'Tipo', render: function (r) { return TIPOS[r.tipo] || r.tipo; } },
        { label: 'Dispositivo', render: function (r) { return r.dispositivo; } },
        { label: 'Hora del teléfono', render: function (r) { return r.horaDisp.slice(11); } },
        { label: 'Hora del servidor', render: function (r) { return r.horaSrv.slice(11); } },
        { label: 'Resultado', render: function (r) { return r.estado === 'aceptado' ? UI.pill('ok', 'Aceptado', 'check') : UI.pill('bad', 'Rechazado', 'xc'); } }
      ], empty: 'Aún no llegaron eventos. Registre entregas en S1 y sincronice.' }) + '</div>';
  };
  App.acts['s3.ev'] = function (el) {
    var e = S().eventLog.filter(function (x) { return x.uuid === el.dataset.id; })[0];
    UI.modal({ title: 'Evento ' + U.short(e.uuid), drawer: true, body: '<dl class="kv" style="grid-template-columns:130px 1fr"><dt>Tipo</dt><dd>' + (TIPOS[e.tipo] || e.tipo) + '</dd><dt>Identificador</dt><dd class="num" style="word-break:break-all">' + e.uuid + '</dd><dt>Dispositivo</dt><dd>' + e.dispositivo + ', secuencia ' + e.seq + '</dd><dt>Hora del teléfono</dt><dd>' + e.horaDisp.replace('T', ' ') + '</dd><dt>Hora del servidor</dt><dd>' + e.horaSrv.replace('T', ' ') + '</dd><dt>Resultado</dt><dd>' + e.estado + (e.motivo ? ': ' + esc(e.motivo) : '') + '</dd></dl><h4 style="margin:14px 0 6px">Contenido</h4><div class="jsonv">' + esc(JSON.stringify(e.p, null, 2)) + '</div><div class="note mt-s">RN-04: un evento no se edita. Las correcciones son eventos nuevos que referencian al original.</div><button class="btn btn-danger btn-sm mt-s" data-act="s3.editar" data-id="' + e.uuid + '">Intentar editar este evento</button>', actions: [{ label: 'Cerrar', kind: 'btn-primary' }] });
  };
  App.acts['s3.editar'] = function (el) {
    srv.audit('Intento de edición denegado', 'UPDATE sobre el evento ' + U.short(el.dataset.id) + ': el registro es de solo inserción', 'Plataforma');
    UI.toast('Denegado: el registro de eventos es de solo inserción. El intento quedó en la auditoría.', 'bad');
  };

  /* ---------- sincronización y pruebas (RF-SYN-02 a 05) ---------- */
  App.sandbox = function (fn) {
    var backup = App.S, seqSave = null;
    App.S = JSON.parse(JSON.stringify(backup));
    // cada prueba parte de un registro vacío para contar solo lo que ella misma produce
    var c = App.S; c.eventLog = []; c.cobros = []; c.entregas = []; c.movEnv = []; c.alertas = [];
    try { return fn(); } finally { App.S = backup; }
  };
  function mkEv(tipo, p, i, hora) { return { uuid: U.uuid(), seq: i || 1, tipo: tipo, hora: hora || App.clock.stamp(), p: p }; }
  var TESTS = [
    { id: 'idem', rf: 'RF-SYN-03', nombre: 'Idempotencia: reenviar mil veces el mismo evento', run: function () {
      return App.sandbox(function () {
        var s = S(), ped = srv.crearPedido({ hogarId: 'H-050', items: [{ p: 'GLP10', qty: 1 }], estado: 'asignado', repartidorId: 'U-R1' });
        var ev = mkEv('entrega.registrada', { pedidoId: ped.id, hogarId: 'H-050', items: ped.items, total: ped.total }, 1);
        srv.recibirLote('U-R1', [ev], 0);
        var ents = s.entregas.length, log = s.eventLog.length, dup = 0;
        for (var i = 0; i < 1000; i++) { var r = srv.recibirLote('U-R1', [ev], 0); if (r.acuses[0].estado === 'duplicado') dup++; }
        var ok = dup === 1000 && s.entregas.length === ents && s.eventLog.length === log;
        return { pass: ok, detalle: dup + ' de 1 000 reenvíos respondieron «duplicado». Entregas: ' + ents + ' antes y ' + s.entregas.length + ' después. Eventos guardados: ' + log + ' antes y ' + s.eventLog.length + ' después.' };
      });
    } },
    { id: 'cortes', rf: 'RF-SYN-04', nombre: 'Cortes de red: 200 eventos sin pérdidas', run: function () {
      return App.sandbox(function () {
        var s = S(), R = U.rng(2026), q = [], i, perdidos = 0, cortes = 0, intentos = 0, dups = 0;
        for (i = 0; i < 200; i++) q.push(mkEv('cobro.registrado', { pedidoId: 'P-' + (2000 + i), hogarId: 'H-050', medio: 'efectivo', monto: 12 }, i + 1));
        while (q.length && intentos < 4000) {
          intentos++;
          var b = q.slice(0, 20), r = R();
          if (r < 0.3) { cortes++; continue; } // el lote no llegó
          var res = srv.recibirLote('U-R1', b, 0);
          res.acuses.forEach(function (a) { if (a.estado === 'duplicado') dups++; });
          if (r < 0.55) { perdidos++; continue; } // el servidor aplicó, pero el acuse se perdió: el teléfono reintenta
          q = q.slice(b.length);
        }
        var ok = q.length === 0 && s.eventLog.length === 200 && s.cobros.length === 200;
        return { pass: ok, detalle: '200 eventos enviados en ' + intentos + ' intentos: ' + cortes + ' lotes cortados antes de llegar, ' + perdidos + ' acuses perdidos y ' + dups + ' duplicados ignorados. En el servidor quedaron ' + s.eventLog.length + ' eventos y ' + s.cobros.length + ' cobros: ni pérdidas ni duplicados. Cola del teléfono: ' + q.length + '.' };
      });
    } },
    { id: 'primero', rf: 'RF-SYN-05', nombre: 'Dos repartidores marcan el mismo pedido: gana el primero', run: function () {
      return App.sandbox(function () {
        var ped = srv.crearPedido({ hogarId: 'H-051', items: [{ p: 'GLP10', qty: 1 }], estado: 'asignado', repartidorId: 'U-R1' });
        var p = { pedidoId: ped.id, hogarId: 'H-051', items: ped.items, total: ped.total };
        var a = srv.recibirLote('U-R1', [mkEv('entrega.registrada', p, 1)], 0).acuses[0], b = srv.recibirLote('U-R2', [mkEv('entrega.registrada', p, 1)], 0).acuses[0];
        var ok = a.estado === 'aceptado' && b.estado === 'rechazado' && ped.entregadoPor === 'U-R1';
        return { pass: ok, detalle: 'Luis llegó primero: ' + a.estado + '. Marco llegó después: ' + b.estado + (b.motivo ? ' («' + b.motivo + '»)' : '') + '. Entregado por ' + App.nombreUsuario(ped.entregadoPor) + '.' };
      });
    } },
    { id: 'cancel', rf: 'RF-SYN-05', nombre: 'Cancelación contra entrega sin señal: la entrega prevalece', run: function () {
      return App.sandbox(function () {
        var s = S(), ped = srv.crearPedido({ hogarId: 'H-052', items: [{ p: 'GLP10', qty: 1 }], estado: 'asignado', repartidorId: 'U-R1' });
        srv.cancelarPedido(ped, 'Cancelado por el despachador mientras el repartidor estaba sin señal');
        var n0 = s.alertas.length;
        var a = srv.recibirLote('U-R1', [mkEv('entrega.registrada', { pedidoId: ped.id, hogarId: 'H-052', items: ped.items, total: ped.total }, 1)], 0).acuses[0];
        var ok = a.estado === 'aceptado' && ped.estado === 'entregado' && s.alertas.length === n0 + 1;
        return { pass: ok, detalle: 'El pedido estaba cancelado. Llegó la entrega: ' + a.estado + '; estado final «' + ped.estado + '» y se avisó al despachador (' + (s.alertas.length - n0) + ' alerta nueva).' };
      });
    } },
    { id: 'cobro', rf: 'RF-SYN-05', nombre: 'Cobro registrado dos veces por reintento: imposible', run: function () {
      return App.sandbox(function () {
        var s = S(), ev = mkEv('cobro.registrado', { pedidoId: 'P-3000', hogarId: 'H-053', medio: 'efectivo', monto: 52 }, 1);
        srv.recibirLote('U-R1', [ev], 0); var r2 = srv.recibirLote('U-R1', [ev, ev], 0).acuses;
        var ok = s.cobros.length === 1 && r2.every(function (a) { return a.estado === 'duplicado'; });
        return { pass: ok, detalle: 'El cobro se envió 3 veces con el mismo identificador. Cobros en el servidor: ' + s.cobros.length + '. Respuestas a los reenvíos: ' + r2.map(function (a) { return a.estado; }).join(', ') + '.' };
      });
    } },
    { id: 'reloj', rf: 'RF-SYN-05', nombre: 'Reloj del teléfono desfasado: se guardan ambas horas', run: function () {
      return App.sandbox(function () {
        var s = S(), ev = mkEv('cobro.registrado', { pedidoId: 'P-3001', hogarId: 'H-054', medio: 'efectivo', monto: 12 }, 1, '2026-11-06T03:12');
        srv.recibirLote('U-R1', [ev], 0); var e = s.eventLog[0];
        var ok = e.horaDisp === '2026-11-06T03:12' && e.horaSrv !== e.horaDisp;
        return { pass: ok, detalle: 'Hora del teléfono ' + e.horaDisp.slice(11) + ' (desfasada) y hora del servidor ' + e.horaSrv.slice(11) + ': ambas quedan en el registro para auditar.' };
      });
    } }
  ];
  P.sync = function () {
    var s = S();
    var devs = Object.keys(s.dispositivos).map(function (k) { var d = s.dispositivos[k]; return '<tr><td><b>' + d.id + '</b></td><td>' + esc(App.nombreUsuario(d.userId)) + '</td><td>' + (d.ultimoContacto ? d.ultimoContacto.slice(11) : 'Sin contacto') + '</td><td class="right">' + d.pendientesRep + '</td><td>' + (d.revocado ? UI.pill('bad', 'Revocado') : UI.pill('ok', 'Activo', 'check')) + '</td></tr>'; }).join('');
    var tests = TESTS.map(function (t) {
      var r = st.tests[t.id];
      return '<div class="testrow" ' + rf(t.rf) + '><div><b>' + t.nombre + '</b>' + (r ? '<div class="mut2" style="font-size:13px;margin-top:3px">' + esc(r.detalle) + '</div>' : '<div class="mut" style="font-size:13px">Sin ejecutar</div>') + '</div><div>' + (r ? UI.pill(r.pass ? 'ok' : 'bad', r.pass ? 'Pasó' : 'Falló', r.pass ? 'check' : 'xc') : '') + '</div><button class="btn btn-sm" data-act="s3.test" data-id="' + t.id + '">Ejecutar</button></div>';
    }).join('');
    return head('Sincronización', 'La API recibe lotes de eventos, los aplica una sola vez y devuelve un acuse por evento. Aquí se ejecutan, en el navegador y sobre una copia de los datos, las pruebas de las reglas.', '<button class="btn btn-primary" data-act="s3.testall">' + ic('play', 15) + 'Ejecutar todas</button>') +
      '<div class="grid-main"><div class="panel"><div class="panel-h"><h3>Pruebas de sincronización y conflictos</h3><span class="mut">Una por regla de 14 §6.11</span></div><div class="panel-b">' + tests + '</div></div><div><div class="panel"><div class="panel-h"><h3>Dispositivos</h3></div><div class="panel-b"><div class="tbl-wrap"><table><thead><tr><th>Dispositivo</th><th>Repartidor</th><th>Contacto</th><th class="right">Pend.</th><th>Estado</th></tr></thead><tbody>' + devs + '</tbody></table></div></div></div><div class="note warn mt" style="font-size:12.5px">Estas pruebas corren en el navegador con datos simulados: demuestran la regla, no prueban el sistema real. En el TSP serían pruebas automatizadas contra la API.</div></div></div>' +
      '<div class="panel mt-l"' + rf('RF-SYN-06') + '><div class="panel-h"><h3>Compatibilidad de versiones de la app</h3>' + UI.pill('mute', 'Representado', 'eye') + '</div><div class="panel-b"><p class="mut2" style="font-size:13px">Durante una actualización, la API sigue aceptando eventos de la versión anterior para que ningún teléfono pierda trabajo. Las versiones y fechas son de ejemplo.</p><div class="tbl-wrap"><table><thead><tr><th>Versión</th><th>Estado</th><th class="right">Dispositivos</th></tr></thead><tbody><tr><td>0.9.3</td><td>' + UI.pill('ok', 'Vigente', 'check') + '</td><td class="right">2</td></tr><tr><td>0.9.2</td><td>' + UI.pill('warn', 'En transición', 'clock') + '</td><td class="right">0</td></tr><tr><td>0.9.0</td><td>' + UI.pill('mute', 'Sin soporte', 'x') + '</td><td class="right">0</td></tr></tbody></table></div></div></div>' +
      '<div class="panel mt-l"' + rf('RF-SYN-02') + '><div class="panel-h"><h3>Últimos acuses enviados</h3></div><div class="panel-b"><div class="tbl-wrap"><table><thead><tr><th>Lote</th><th>Evento</th><th>Dispositivo</th><th>Acuse</th><th>Motivo</th></tr></thead><tbody>' + (s.eventLog.slice(-8).reverse().map(function (e, i) { return '<tr><td>' + Math.ceil((s.eventLog.length - i) / 20) + '</td><td>' + (TIPOS[e.tipo] || e.tipo) + '<span class="sub">' + U.short(e.uuid) + '</span></td><td>' + e.dispositivo + '</td><td>' + (e.estado === 'aceptado' ? UI.pill('ok', 'aceptado', 'check') : UI.pill('bad', 'rechazado', 'xc')) + '</td><td>' + esc(e.motivo || '—') + '</td></tr>'; }).join('') || '<tr><td colspan="5" class="tbl-empty">Todavía no hay lotes.</td></tr>') + '</tbody></table></div></div></div>';
  };
  App.acts['s3.test'] = function (el) { var t = TESTS.filter(function (x) { return x.id === el.dataset.id; })[0]; st.tests[t.id] = t.run(); App.render(); };
  App.acts['s3.testall'] = function () { TESTS.forEach(function (t) { st.tests[t.id] = t.run(); }); var ok = TESTS.every(function (t) { return st.tests[t.id].pass; }); UI.toast(ok ? 'Las 6 pruebas pasaron' : 'Alguna prueba falló', ok ? 'ok' : 'bad'); App.render(); };

  /* ---------- motor de reposición (RF-REP-01 a 03, 07) ---------- */
  P.reposicion = function () {
    var s = S(), sug = srv.sugeridos();
    var last = s.eventLog.filter(function (e) { return e.tipo === 'entrega.registrada'; }).slice(-5).reverse();
    return head('Motor de reposición', 'Tarea diaria: calcula, por hogar y producto, cuántos días dura una unidad y cuándo avisar. Es una mediana de intervalos sobre PostgreSQL, no aprendizaje profundo.', '<button class="btn btn-primary" data-act="s3.job">' + ic('play', 15) + 'Ejecutar la tarea ahora</button>') +
      '<div class="kpis" style="--n:4;margin-bottom:18px"><div class="kpi"><div class="l">Hogares evaluados</div><div class="v">' + s.hogares.length + '</div></div><div class="kpi"><div class="l">Por avisar hoy</div><div class="v">' + sug.filter(function (x) { return !x.motivo; }).length + '</div></div><div class="kpi"><div class="l">Excluidos hoy</div><div class="v">' + sug.filter(function (x) { return x.motivo; }).length + '</div></div><div class="kpi"><div class="l">Con duración de referencia</div><div class="v">' + sug.filter(function (x) { return x.est.usado === 'referencia'; }).length + '</div></div></div>' +
      '<div class="grid-main"><div ' + rf('RF-REP-01') + '>' + UI.table('estm', { rows: function () { return S().hogares.filter(function (h) { return h.productos.length; }).map(function (h) { return { h: h, e: est.estimar(h, h.productos[0].p) }; }); }, rowId: function (r) { return r.h.id; }, search: function (r) { return r.h.nombre + r.h.id; }, pageSize: 10, filters: [{ k: 'u', label: 'Origen', options: [['historial', 'Historial'], ['referencia', 'Referencia']], test: function (r, v) { return r.e.usado === v; } }], cols: [
        { label: 'Hogar', render: function (r) { return '<b>' + esc(r.h.nombre) + '</b><span class="sub">' + r.h.id + '</span>'; }, sort: function (r) { return r.h.id; } },
        { label: 'Producto', render: function (r) { return esc(S().productos[r.e.prodId].corto); } },
        { label: 'Entregas', align: 'right', render: function (r) { return r.e.n; }, sort: function (r) { return r.e.n; } },
        { label: 'Duración por unidad', align: 'right', render: function (r) { return r.e.dur != null ? r.e.dur.toFixed(1) + ' d' : '—'; } },
        { label: 'Origen', render: function (r) { return r.e.usado === 'historial' ? UI.pill('ok', 'Historial') : UI.pill('warn', 'Referencia'); } },
        { label: 'Fecha de aviso', render: function (r) { return r.e.fechaAviso ? U.dmy(r.e.fechaAviso) : '—'; }, sort: function (r) { return r.e.fechaAviso || ''; } }
      ] }) + '</div><div class="stack"><div class="panel"' + rf('RF-REP-07') + '><div class="panel-h"><h3>Recálculo tras cada entrega</h3></div><div class="panel-b">' + (last.length ? last.map(function (e) { var ped = App.pedido(e.p.pedidoId), h = ped ? App.hogar(ped.hogarId) : null; if (!h) return ''; var x = est.estimar(h, h.productos[0].p); return '<div class="row sb" style="padding:7px 0;border-bottom:1px solid var(--line)"><span><b>' + esc(h.nombre) + '</b><small style="display:block">Entrega sincronizada ' + e.horaSrv.slice(11) + '</small></span><span class="mut2">próximo aviso <b>' + U.dm(x.fechaAviso) + '</b></span></div>'; }).join('') : '<p class="mut" style="margin:0">Aún no hay entregas sincronizadas. Cada una dispara el recálculo del hogar.</p>') + '</div></div><div class="panel"><div class="panel-h"><h3>Corridas de la tarea</h3></div><div class="panel-b">' + ([{ t: 'Hoy 03:00', n: s.hogares.length }].concat(st.jobs).map(function (j) { return '<div class="row sb" style="padding:6px 0;border-bottom:1px solid var(--line)"><span>' + j.t + '</span><span class="mut2">' + j.n + ' hogares evaluados</span></div>'; }).join('')) + '</div></div></div></div>';
  };
  App.acts['s3.job'] = function () { var t = 'Hoy ' + App.clock.hhmm() + ' (manual)'; st.jobs.unshift({ t: t, n: S().hogares.length }); st.lastRun = App.clock.hhmm(); UI.toast('Tarea ejecutada: ' + S().hogares.length + ' hogares reevaluados.', 'ok'); App.render(); };

  /* ---------- adaptador de mensajería (RF-MSG-01 a 06) ---------- */
  P.mensajeria = function () {
    var s = S(), c = s.config; s.webhookLog = s.webhookLog || [];
    var pend = s.avisos.filter(function (a) { return a.modo === 'api' && !a.respuesta && a.estado !== 'fallido'; });
    return head('Adaptador de mensajería', 'Traduce entre el dominio y WhatsApp. Puede pasar del modo manual a la API de Cloud sin tocar el resto del sistema.') +
      '<div class="grid2"><div class="panel"' + rf('RF-MSG-05') + '><div class="panel-h"><h3>Tarifas por categoría</h3>' + UI.pill('warn', 'De ejemplo', 'alert') + '</div><div class="panel-b"><p class="mut2" style="font-size:13px">Meta cobra por mensaje entregado según la categoría y el país. Estas tarifas son de ejemplo: la de Perú está por confirmar.</p><div class="form3"><div class="field"><label>Marketing (S/)</label><input class="input" type="number" step="0.01" min="0" value="' + c.tarifaMarketing + '" data-chg="s3.tarifa" data-f="tarifaMarketing"></div><div class="field"><label>Utilidad (S/)</label><input class="input" type="number" step="0.01" min="0" value="' + c.tarifaUtilidad + '" data-chg="s3.tarifa" data-f="tarifaUtilidad"></div><div class="field"><label>Servicio (S/)</label><input class="input" type="number" step="0.01" min="0" value="' + c.tarifaServicio + '" data-chg="s3.tarifa" data-f="tarifaServicio"></div></div><small class="mut">Desde el 1 de octubre de 2026 también se cobran los mensajes de utilidad dentro de la ventana de 24 h y los de servicio sobre 1 000 al mes por número [F1].</small></div></div>' +
      '<div class="panel"' + rf('RF-MSG-02') + '><div class="panel-h"><h3>Simulador del webhook de WhatsApp</h3></div><div class="panel-b"><p class="mut2" style="font-size:13px;margin-bottom:10px">Responda como si fuera el hogar. Los webhooks llegan firmados: uno con firma inválida se rechaza.</p>' + (pend.length ? '<div class="field"><label>Aviso enviado por la API</label><select class="select" id="wh-av">' + pend.map(function (a) { return '<option value="' + a.id + '">' + a.id + ' ' + esc(App.hogar(a.hogarId).nombre) + '</option>'; }).join('') + '</select></div><div class="row wrap"><button class="btn btn-sm" data-act="s3.wh" data-r="si">Sí, mañana</button><button class="btn btn-sm" data-act="s3.wh" data-r="todavia">Todavía tengo</button><button class="btn btn-sm" data-act="s3.wh" data-r="no">No volver a escribir</button><button class="btn btn-sm" data-act="s3.wh" data-r="libre">Mensaje libre</button></div>' : '<div class="note">No hay avisos pendientes de respuesta por la API. En <a href="#/s2/reposicion">S2, Reposición</a> apruebe una lista con el modo «Por la API de WhatsApp».</div>') + '<div class="row wrap mt-s"><button class="btn btn-sm btn-danger" data-act="s3.whbad">Webhook con firma inválida</button></div></div></div></div>' +
      '<div class="panel mt"' + rf('RF-MSG-03') + '><div class="panel-h"><h3>Registro de webhooks</h3></div><div class="panel-b"><div class="tbl-wrap"><table><thead><tr><th>Hora</th><th>Evento</th><th>Firma</th><th>Resultado</th></tr></thead><tbody>' + (s.webhookLog.slice().reverse().map(function (w) { return '<tr><td>' + w.t + '</td><td>' + esc(w.ev) + '</td><td>' + (w.firma ? UI.pill('ok', 'Válida', 'check') : UI.pill('bad', 'Inválida', 'x')) + '</td><td>' + esc(w.res) + '</td></tr>'; }).join('') || '<tr><td colspan="4" class="tbl-empty">Sin webhooks todavía.</td></tr>') + '</tbody></table></div></div></div>';
  };
  App.chg['s3.tarifa'] = function (el) { S().config[el.dataset.f] = Math.max(0, +el.value); srv.audit('Cambió una tarifa de mensajería (ejemplo)', el.dataset.f + ' = ' + el.value); UI.toast('Tarifa actualizada', 'ok'); };
  function whLog(ev, firma, res) { var s = S(); s.webhookLog = s.webhookLog || []; s.webhookLog.push({ t: App.clock.hhmm(), ev: ev, firma: firma, res: res }); }
  App.acts['s3.wh'] = function (el) {
    var sel = document.getElementById('wh-av'); if (!sel) return;
    var a = S().avisos.filter(function (x) { return x.id === sel.value; })[0];
    whLog('Respuesta «' + el.dataset.r + '» del aviso ' + a.id, true, el.dataset.r === 'si' ? 'Se creó el pedido confirmado (RN-10)' : el.dataset.r === 'todavia' ? 'Aviso pospuesto' : el.dataset.r === 'no' ? 'Baja registrada (RF-CLI-03)' : 'Mensaje libre: pedido por confirmar (RF-PED-03)');
    srv.responder(a, el.dataset.r); UI.toast('Respuesta procesada por el webhook', 'ok'); App.render();
  };
  App.acts['s3.whbad'] = function () { whLog('Webhook de estado de mensaje', false, 'Rechazado con 401: la firma no coincide'); UI.toast('Rechazado: la firma del webhook no es válida (401).', 'bad'); App.render(); };
  App.simRespuesta = function (avisoId) {
    var a = S().avisos.filter(function (x) { return x.id === avisoId; })[0], h = App.hogar(a.hogarId);
    UI.modal({ title: 'Simular la respuesta de ' + esc(h.nombre), body: '<p class="mut">Es lo que enviaría WhatsApp a la plataforma por webhook cuando el hogar toca un botón.</p><div class="wa">' + esc(a.texto) + '</div><div class="opt3" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">' + [['si', 'Sí, mañana'], ['todavia', 'Todavía tengo'], ['no', 'No volver a escribir'], ['libre', 'Escribe: «mándeme 2 balones»']].map(function (r) { return '<button class="btn" data-act="s3.simr" data-id="' + avisoId + '" data-r="' + r[0] + '">' + r[1] + '</button>'; }).join('') + '</div>' });
  };
  App.acts['s3.simr'] = function (el) {
    var a = S().avisos.filter(function (x) { return x.id === el.dataset.id; })[0];
    whLog('Respuesta «' + el.dataset.r + '» del aviso ' + a.id, true, 'Procesada');
    srv.responder(a, el.dataset.r, el.dataset.r === 'libre' ? 'Mándeme 2 balones por favor' : null);
    document.querySelectorAll('.overlay').forEach(function (o) { o.remove(); });
    UI.toast({ si: 'Se creó un pedido confirmado en la bandeja.', todavia: 'Aviso pospuesto.', no: 'Baja registrada: no se le volverá a escribir.', libre: 'Llegó un mensaje libre: quedó un pedido por confirmar.' }[el.dataset.r], 'ok'); App.render();
  };

  /* ---------- adaptador de pagos (RF-COB-03) ---------- */
  P.pagos = function () {
    var s = S();
    var abiertos = s.pedidos.filter(function (p) { return ['confirmado', 'asignado', 'en_ruta'].indexOf(p.estado) >= 0 && !s.pagoLinks[p.id]; }).slice(0, 12);
    return head('Adaptador de pagos', 'La plataforma crea el cargo en la pasarela con la llave privada; ni la app ni el portal tocan datos de Yape.') +
      '<div class="grid2"><div class="panel"' + rf('RF-COB-03') + '><div class="panel-h"><h3>Probar la página de pago del hogar</h3></div><div class="panel-b"><div class="field"><label>Pedido</label><select class="select" id="pg-p">' + abiertos.map(function (p) { return '<option value="' + p.id + '" data-m="' + p.total + '">' + p.id + ' ' + esc(App.hogar(p.hogarId).nombre) + ', ' + U.money(p.total) + '</option>'; }).join('') + '</select></div><div class="field"><label>Monto a cobrar (S/)</label><input class="input" id="pg-m" type="number" min="1" placeholder="Igual al total del pedido"><small>Pruebe 2500 para ver el tope de Yape.</small></div><button class="btn btn-primary" data-act="s3.pagar">' + ic('phone', 16) + 'Abrir la página de pago</button></div></div>' +
      '<div class="panel"><div class="panel-b"><h4>Reglas de Yape con la pasarela</h4><ul style="margin:8px 0 0;padding-left:18px;color:var(--ink-2)"><li>El hogar ingresa su celular y un código de aprobación que genera en su app Yape.</li><li>El código vale <b>2 minutos</b> como máximo.</li><li>Tope de <b>S/ 2,000</b> por pago y solo en soles.</li><li>La API directa de tokens exige cumplir PCI DSS (SAQ-D): por eso se usa el checkout de la pasarela.</li></ul><div class="note warn mt-s" style="font-size:12.5px">La confirmación por webhook y la comisión están por confirmar [PI]. Esta pantalla simula la pasarela.</div></div></div></div>' +
      '<div class="panel mt"><div class="panel-h"><h3>Cargos</h3></div><div class="panel-b"><div class="tbl-wrap"><table><thead><tr><th>Cargo</th><th>Pedido</th><th>Celular</th><th class="right">Monto</th><th>Moneda</th><th>Estado</th></tr></thead><tbody>' + (s.pagos.slice().reverse().map(function (p) { return '<tr><td><b>' + p.id + '</b></td><td>' + p.pedidoId + '</td><td>' + p.celular + '</td><td class="right num">' + U.money(p.monto) + '</td><td>' + p.moneda + '</td><td>' + UI.pill('ok', 'Pagado', 'check') + '</td></tr>'; }).join('') || '<tr><td colspan="6" class="tbl-empty">Todavía no hay cargos.</td></tr>') + '</tbody></table></div></div></div>';
  };
  App.acts['s3.pagar'] = function () {
    var sel = document.getElementById('pg-p'); if (!sel || !sel.value) { UI.toast('No hay pedidos abiertos para cobrar.', 'bad'); return; }
    var m = +document.getElementById('pg-m').value || +sel.selectedOptions[0].dataset.m;
    App.pagoModal({ pedidoId: sel.value, monto: m, fijo: false });
  };
  App.pagoModal = function (o) {
    var code = String(100000 + Math.floor(Math.random() * 900000)), end = Date.now() + 120000, msg = '';
    var modal = UI.modal({ title: 'Celular del hogar', noFocus: false, body: '<div class="phone-mini"><div class="pscr"><div class="pasarela-h"><span>Pago seguro (simulación)</span><span>' + U.money(o.monto) + '</span></div><div class="p-body"><p class="mut" style="font-size:13px;margin:0 0 8px">Pedido ' + o.pedidoId + '. Pagar con Yape:</p><label class="p-lbl" style="margin-top:0">Celular de Yape</label><input class="p-in" id="py-cel" inputmode="tel" placeholder="9XX XXX XXX" value="900 000 238"><div class="note mt-s" style="font-size:12.5px"><b>App Yape (simulada)</b><br>Código de aprobación: <b id="py-show" style="font-size:18px;letter-spacing:.1em">' + code + '</b><br><span id="py-t">Vence en 2:00</span> <button class="btn btn-sm btn-ghost" id="py-new" type="button">Generar otro</button></div><label class="p-lbl">Código de aprobación</label><input class="p-in" id="py-cod" inputmode="numeric" maxlength="6" placeholder="6 dígitos"><div id="py-msg" class="mt-s"></div><button class="pbtn mt-s" id="py-pay" style="background:var(--ink)">Pagar ' + U.money(o.monto) + '</button></div></div></div>', actions: [{ label: 'Cerrar' }], onOpen: function (m) {
      var q = function (id) { return m.el.querySelector('#' + id); }, tick = setInterval(function () { if (!document.body.contains(m.el)) { clearInterval(tick); return; } var left = Math.max(0, Math.round((end - Date.now()) / 1000)); q('py-t').textContent = left ? 'Vence en ' + Math.floor(left / 60) + ':' + U.pad(left % 60) : 'El código venció'; }, 500);
      q('py-new').onclick = function () { code = String(100000 + Math.floor(Math.random() * 900000)); end = Date.now() + 120000; q('py-show').textContent = code; q('py-msg').innerHTML = ''; };
      q('py-pay').onclick = function () {
        var r = srv.cargoYape({ pedidoId: o.pedidoId, monto: o.monto, celular: q('py-cel').value, codigo: q('py-cod').value, vencido: Date.now() > end });
        if (!r.ok) { q('py-msg').innerHTML = '<div class="note bad" style="font-size:12.5px">' + esc(r.motivo) + '</div>'; return; }
        clearInterval(tick);
        q('py-msg').innerHTML = '<div class="note ok" style="font-size:13px"><b>Pago confirmado.</b> Cargo ' + r.cargo.id + '. Puede cerrar esta ventana.</div>'; q('py-pay').disabled = true;
        UI.toast('Pago confirmado por la pasarela: el cobro del pedido queda verificado.', 'ok'); App.emit('change');
      };
    } });
  };

  /* ---------- experimento (RF-EXP-01, 02, 03) ---------- */
  function checksum(S0) { var h = 0, t = S0.hogares.filter(function (x) { return x.grupo; }).map(function (x) { return x.id + x.grupo; }).join(','); for (var i = 0; i < t.length; i++) h = ((h * 31) + t.charCodeAt(i)) >>> 0; return h.toString(16).toUpperCase().padStart(8, '0'); }
  P.experimento = function () {
    var s = S(), ex = s.experimento, m = srv.metricas();
    var muestra = s.hogares.filter(function (h) { return h.grupo; }).slice(0, 10);
    return head('Experimento ' + ex.id, 'Asignación al azar de los hogares elegibles a «aviso» o «control». La asignación no cambia durante el experimento y se puede reproducir con la semilla.', '<button class="btn" disabled data-tip="La asignación está bloqueada mientras dure el experimento (RN-08)">' + ic('lock', 15) + 'Nueva asignación</button>') +
      '<div class="kpis" style="--n:4;margin-bottom:18px"><div class="kpi"><div class="l">Semilla</div><div class="v" style="font-size:22px">' + ex.semilla + '</div></div><div class="kpi"><div class="l">Inicio</div><div class="v" style="font-size:22px">' + U.dmy(ex.inicio) + '</div></div><div class="kpi"><div class="l">Grupo aviso</div><div class="v">' + m.nAviso + '</div></div><div class="kpi"><div class="l">Grupo control</div><div class="v">' + m.nControl + '</div></div></div>' +
      '<div class="grid2"><div class="panel"' + rf('RF-EXP-01') + '><div class="panel-h"><h3>Reproducibilidad</h3></div><div class="panel-b"><p class="mut2">Suma de verificación de la asignación actual: <b class="num">' + checksum(s) + '</b>. Se puede reasignar con la misma semilla en una copia y comprobar que sale igual.</p><button class="btn btn-primary btn-sm" data-act="s3.reasig">Reasignar en una copia</button><div id="reasig-out" class="mt-s"></div></div></div><div class="panel"' + rf('RF-EXP-03') + '><div class="panel-h"><h3>Métrica principal</h3></div><div class="panel-b"><p class="mut2">Recompra con el distribuidor dentro de los 30 días siguientes a la fecha prevista. Se calcula desde los eventos, nunca se escribe a mano.</p><button class="btn btn-sm" data-act="s3.recalc">Recalcular desde los eventos</button><div id="recalc-out" class="mt-s"></div></div></div></div>' +
      '<div class="sect"><div class="sect-h"><h2>Muestra de la asignación</h2></div><div class="tbl-wrap"' + rf('RF-EXP-02') + '><table><thead><tr><th>Hogar</th><th>Grupo</th><th>Recibe avisos</th><th>Sus compras se registran</th></tr></thead><tbody>' + muestra.map(function (h) { return '<tr><td><b>' + esc(h.nombre) + '</b><span class="sub">' + h.id + '</span></td><td>' + (h.grupo === 'aviso' ? UI.pill('info', 'Aviso') : UI.pill('mute', 'Control')) + '</td><td>' + (h.grupo === 'aviso' ? 'Sí' : 'No') + '</td><td>Sí</td></tr>'; }).join('') + '</tbody></table></div></div>';
  };
  App.acts['s3.reasig'] = function () {
    var cur = checksum(S()), nuevo = App.sandbox(function () { var s = S(); s.hogares.forEach(function (h) { h.grupo = null; h.exp = null; }); srv.asignarExperimento(); return checksum(s); });
    document.getElementById('reasig-out').innerHTML = '<div class="note ' + (cur === nuevo ? 'ok' : 'bad') + '">Suma de la copia: <b class="num">' + nuevo + '</b>. ' + (cur === nuevo ? 'Idéntica: la asignación es reproducible con la semilla.' : 'No coincide.') + '</div>';
  };
  App.acts['s3.recalc'] = function () {
    var a = srv.metricas(), b = srv.metricas();
    document.getElementById('recalc-out').innerHTML = '<div class="note ok">Diferencia ' + (a.d * 100).toFixed(2) + ' puntos (IC ' + (a.lo * 100).toFixed(1) + ' a ' + (a.hi * 100).toFixed(1) + '). Recalculada dos veces: ' + (a.d === b.d ? 'mismo resultado.' : 'distinto.') + '</div>';
  };

  /* ---------- seguridad y auditoría (RF-SEG-01, 02, 04) ---------- */
  var RECURSOS = [{ n: 'Pedido P-1006 de E-001', e: 'E-001' }, { n: 'Hogar H-010 de E-001', e: 'E-001' }, { n: 'Pedido P-4021 de E-002', e: 'E-002' }, { n: 'Cobros de E-002', e: 'E-002' }, { n: 'Dispositivos de E-003', e: 'E-003' }];
  P.seguridad = function () {
    var s = S(), pr = st.probes;
    var filas = RECURSOS.map(function (r) { return { actor: 'Usuario de E-001', rec: r.n, e: r.e }; });
    return head('Seguridad y auditoría', 'Aislamiento entre empresas, permisos por rol y un registro que solo permite insertar.', '<button class="btn btn-primary" data-act="s3.probes">' + ic('play', 15) + 'Ejecutar pruebas de aislamiento</button>') +
      '<div class="grid-main"><div class="panel"' + rf('RF-SEG-01') + '><div class="panel-h"><h3>Aislamiento multiempresa</h3><span class="mut">Simulación de las pruebas</span></div><div class="panel-b"><p class="mut2" style="font-size:13px">Cada registro pertenece a una empresa y ninguna consulta cruza empresas. Cada consulta recibe el identificador de empresa del token, nunca del pedido del usuario.</p><div class="tbl-wrap"><table><thead><tr><th>Quién</th><th>Intenta leer</th><th>Respuesta esperada</th><th>Resultado</th></tr></thead><tbody>' + filas.map(function (f, i) { var allowed = f.e === 'E-001'; var r = pr ? pr[i] : null; return '<tr><td>' + f.actor + '</td><td>' + esc(f.rec) + '</td><td>' + (allowed ? '200, es suyo' : '403, es de otra empresa') + '</td><td>' + (r ? UI.pill(r.ok ? 'ok' : 'bad', r.txt, r.ok ? 'check' : 'xc') : '<span class="mut">Sin ejecutar</span>') + '</td></tr>'; }).join('') + '</tbody></table></div><div class="note warn mt-s" style="font-size:12.5px">En el sistema real son pruebas automatizadas contra la API. Aquí se evalúa la misma regla sobre datos de ejemplo.</div></div></div>' +
      '<div class="panel"' + rf('RF-SEG-04') + '><div class="panel-h"><h3>Auditoría de solo inserción</h3></div><div class="panel-b"><p class="mut2" style="font-size:13px">' + s.auditoria.length + ' registros. No existe «editar» ni «borrar».</p>' + s.auditoria.slice(0, 5).map(function (a) { return '<div style="padding:7px 0;border-bottom:1px solid var(--line);font-size:13px"><b>' + esc(a.accion) + '</b><div class="mut2">' + esc(a.detalle) + '</div><small>' + a.ts.slice(0, 10) + ' ' + a.ts.slice(11) + ', ' + esc(a.quien) + '</small></div>'; }).join('') + '<button class="btn btn-danger btn-sm mt-s" data-act="s3.audedit">Intentar borrar un registro</button></div></div></div>' +
      '<div class="grid2 mt-l"><div class="panel"><div class="panel-h"><h3>Sesiones de los dispositivos</h3></div><div class="panel-b"><div class="tbl-wrap"><table><thead><tr><th>Dispositivo</th><th>Credencial</th><th>Vence</th><th>Datos locales</th></tr></thead><tbody>' + Object.keys(s.dispositivos).map(function (k) { var d = s.dispositivos[k]; return '<tr><td>' + d.id + '</td><td>Token de dispositivo + PIN</td><td>Fin de la jornada</td><td>' + (d.revocado ? UI.pill('bad', 'Borrado remoto pendiente') : UI.pill('ok', 'Cifrados', 'lock')) + '</td></tr>'; }).join('') + '</tbody></table></div></div></div><div class="panel"><div class="panel-b"><h4>Medidas de la plataforma</h4><ul style="margin:8px 0 0;padding-left:18px;color:var(--ink-2)"><li>Base local del teléfono cifrada.</li><li>Webhooks verificados por firma.</li><li>Respaldo diario y eventos conservados en el teléfono hasta recibir su acuse.</li><li>Datos personales mínimos (Ley 29733).</li></ul></div></div></div>';
  };
  st.probes = null;
  App.acts['s3.probes'] = function () {
    var guard = function (actor, rec) { return rec.e === actor ? 200 : 403; };
    st.probes = RECURSOS.map(function (r) { var code = guard('E-001', r), esperado = r.e === 'E-001' ? 200 : 403; return { ok: code === esperado, txt: code === 200 ? '200, acceso permitido' : '403, acceso denegado' }; });
    UI.toast('Pruebas de aislamiento ejecutadas: ' + st.probes.filter(function (x) { return x.ok; }).length + ' de ' + st.probes.length + ' correctas.', 'ok'); App.render();
  };
  App.acts['s3.audedit'] = function () { srv.audit('Intento de borrado denegado', 'DELETE sobre la auditoría: el registro es de solo inserción', 'Plataforma'); UI.toast('Denegado: la auditoría es de solo inserción. El intento quedó registrado.', 'bad'); App.render(); };
  App.s3 = { reset: function () { st.tests = {}; st.jobs = []; st.lastRun = null; st.probes = null; } };
})();

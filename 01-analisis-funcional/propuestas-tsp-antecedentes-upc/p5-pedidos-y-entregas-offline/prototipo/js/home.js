/* Inicio, recorrido guiado y cobertura de requerimientos */
(function () {
  'use strict';
  var App = window.App, U = App.U, UI = App.UI, C = App.Charts, ic = App.ic, esc = U.esc, srv = App.srv, est = App.est;
  var S = function () { return App.S; };
  App.views = App.views || {};

  /* ---------- diagrama de arquitectura (SVG) ---------- */
  App.archSvg = function () {
    var b = function (x, y, w, h, cls, t, sub) { return '<rect class="box ' + cls + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8"/><text x="' + (x + w / 2) + '" y="' + (y + (sub ? h / 2 - 2 : h / 2 + 4)) + '" text-anchor="middle">' + t + '</text>' + (sub ? '<text class="sub" x="' + (x + w / 2) + '" y="' + (y + h / 2 + 12) + '" text-anchor="middle">' + sub + '</text>' : ''); };
    var l = function (d, dash) { return '<path class="ln' + (dash ? ' dash' : '') + '" d="' + d + '" marker-end="url(#ar)"/>'; };
    return '<svg viewBox="0 0 740 398" role="img" aria-label="Arquitectura: app, portal y consola conectados a la plataforma central, que usa WhatsApp, la pasarela de pagos y mapas"><defs><marker id="ar" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="var(--ink-3)"/></marker></defs>' +
      b(150, 8, 170, 54, 's1', 'S1 App del repartidor', 'Android, sin conexión') + b(345, 8, 170, 54, 's2', 'S2 Portal del distribuidor', 'Dueño y despachador') + b(540, 8, 170, 54, 's4', 'S4 Consola SaaS', 'Equipo del producto') +
      '<rect class="box s3" x="150" y="108" width="560" height="168" rx="12" style="fill:var(--agua-soft)"/><text x="166" y="128" style="font-size:12.5px">S3 Plataforma central, monolito modular</text>' +
      b(166, 142, 120, 40, '', 'Sincronización', 'idempotente') + b(300, 142, 120, 40, '', 'Registro de eventos', 'solo inserción') + b(434, 142, 120, 40, '', 'Motor de reposición', 'tarea diaria') + b(568, 142, 126, 40, '', 'PostgreSQL', 'por empresa') +
      b(166, 214, 150, 44, '', 'Adaptador de mensajería', 'plantillas y webhooks') + b(330, 214, 150, 44, '', 'Adaptador de pagos', 'página de pago') + b(494, 214, 200, 44, '', 'Pedidos, envases, cobros', 'y cuadre') +
      b(150, 324, 150, 54, '', 'E1 WhatsApp', 'Cloud API o modo manual') + b(330, 324, 150, 54, '', 'E2 Pasarela con Yape', 'Culqi o Kushki') + b(510, 324, 90, 54, '', 'E3 Mapas', 'enlace desde S1') + b(620, 324, 90, 54, '', 'E4 Facturación', 'futuro') +
      '<rect class="box" x="8" y="150" width="112" height="80" rx="10" style="fill:var(--llama-soft);stroke:var(--series-2)"/><text x="64" y="186" text-anchor="middle">Hogar</text><text class="sub" x="64" y="202" text-anchor="middle">sin app, solo</text><text class="sub" x="64" y="214" text-anchor="middle">WhatsApp y celular</text>' +
      l('M226 62 L226 108') + l('M430 62 L430 108') + l('M625 62 L625 108') + l('M241 258 L225 324') + l('M405 258 L405 324') + l('M120 200 C140 200 150 250 190 324', true) + l('M64 230 V389 H405 V381', true) + '</svg>';
  };

  /* =====================================================
     Inicio
     ===================================================== */
  App.views.inicio = {
    render: function (r, host) {
      var s = S(), sug = srv.sugeridos().filter(function (x) { return !x.motivo; }).slice(0, 8);
      var cils = sug.map(function (x) { return '<div class="fuel-i" style="min-width:56px">' + C.cyl(x.est.nivel, { tipo: s.productos[x.prodId].tipo, size: 52 }) + '<b>' + esc(x.hogar.nombre.split(' ')[0]) + '</b><span>' + (x.est.diasRest <= 0 ? 'se agota hoy' : x.est.diasRest + ' d') + '</span></div>'; }).join('');
      var nR = App.REQS.length, nD = App.REQS.filter(function (q) { return q.prio === 'debe'; }).length, nP = App.REQS.filter(function (q) { return q.prio === 'deberia'; }).length, nF = nR - nD - nP;
      var sys = [
        ['S1', 'App del repartidor', 'Android, funciona completa sin conexión.', ['Entrega en 3 toques', 'Libro de envases', 'Cobro con efectivo, QR y enlace', 'Cola de eventos y sincronización'], '#/s1'],
        ['S2', 'Portal del distribuidor', 'Para el dueño y el despachador, en el computador o el celular.', ['Reposición anticipada', 'Pedidos y planificación', 'Cuadre de dinero y envases', 'Resultados del experimento'], '#/s2/panel'],
        ['S3', 'Plataforma central', 'Lo que ocurre detrás: eventos, motor, adaptadores y seguridad.', ['Sincronización sin duplicados', 'Motor de reposición', 'WhatsApp y pagos', 'Pruebas ejecutables'], '#/s3/resumen'],
        ['S4', 'Consola SaaS', 'Para el equipo del producto: empresas, planes, uso y soporte.', ['Alta de empresas', 'Planes y tarifas', 'Uso y costos', 'Funciones por empresa'], '#/s4/empresas']
      ];
      host.innerHTML = '<div class="home"><section class="hero"><div><h1>Avisar antes de que se acabe el balón</h1><p class="lead">Prototipo navegable de P5, versión 6: reparto de gas y agua en envases retornables. El distribuidor llama primero, sabe dónde está cada envase y cierra el día con el dinero cuadrado, aunque el repartidor no tenga señal.</p><div class="row wrap mt"><a class="btn btn-primary" href="#/recorrido">' + ic('play', 16) + 'Hacer el recorrido guiado</a><a class="btn" href="#/s2/panel">Abrir el portal</a><a class="btn" href="#/cobertura">Ver los 83 requerimientos</a></div><p class="mut mt" style="max-width:62ch;font-size:13px">Todo es simulado: personas, precios, mensajes y resultados no vienen de clientes reales. La demanda de esta propuesta sigue sin validar; el prototipo sirve para entender el producto y decidir qué construir primero.</p></div>' +
        '<div class="hero-art"><b style="font-size:15px">Hogares por avisar hoy</b><p class="mut" style="margin:2px 0 10px;font-size:13px">Cada balón muestra cuánto le queda al hogar según su ritmo de compra.</p><div class="fuel-row" style="padding:6px 0 4px">' + cils + '</div><div class="divider"></div><div class="row sb"><span class="mut2">' + sug.length + ' de ' + srv.sugeridos().filter(function (x) { return !x.motivo; }).length + ' mostrados</span><a href="#/s2/reposicion">Aprobar la lista</a></div></div></section>' +
        '<section class="sys-grid">' + sys.map(function (q) { return '<div class="sys"><span class="sid">' + q[0] + '</span><h3>' + q[1] + '</h3><p class="mut2" style="margin:0;font-size:13.5px">' + q[2] + '</p><ul>' + q[3].map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul><a class="btn btn-sm" href="' + q[4] + '">Abrir ' + q[0] + '</a></div>'; }).join('') + '</section>' +
        '<section class="sect"><div class="sect-h"><h2>Cómo se conectan</h2><span class="mut">El hogar no instala nada</span></div><div class="arch">' + App.archSvg() + '</div></section>' +
        '<section class="sect"><div class="sect-h"><h2>De la señal al dinero: el flujo que demuestra el prototipo</h2></div><div class="flowline" style="border:1px solid var(--line);border-radius:var(--r-m);background:var(--surface)">' + [['S3', 'Se estima el aviso', 'El motor calcula cuándo se acaba el producto de cada hogar.'], ['S2', 'Se aprueba la lista', 'El despachador excluye, aprueba y envía.'], ['S3', 'El hogar responde', 'Un botón crea el pedido confirmado.'], ['S1', 'Se entrega sin señal', 'Entrega, envases y cobro quedan en el teléfono.'], ['S3', 'Se sincroniza una vez', 'Cada evento se aplica una sola vez.'], ['S2', 'Se cuadra el día', 'Dinero y envases, con motivo por cada diferencia.']].map(function (f) { return '<div class="flowstep"><span class="sidc">' + f[0] + '</span><b>' + f[1] + '</b><span class="mut2">' + f[2] + '</span></div>'; }).join('') + '</div></section>' +
        '<section class="sect"><div class="sect-h"><h2>Qué entra en cada fase</h2><span class="mut">Use el selector «Fase a mostrar» de la barra superior</span></div><div class="grid3">' +
        '<div class="panel"><div class="panel-b"><span class="pill prio-debe">MVP</span><div style="font:700 34px var(--font-display);margin:8px 0 2px">' + nD + '</div><p class="mut2" style="margin:0;font-size:13.5px">Requerimientos «Debe». Es lo que necesita el TSP y el primer cliente: sincronización, reposición manual, envases y cuadre.</p></div></div>' +
        '<div class="panel"><div class="panel-b"><span class="pill prio-deberia">Piloto</span><div style="font:700 34px var(--font-display);margin:8px 0 2px">' + nP + '</div><p class="mut2" style="margin:0;font-size:13.5px">Requerimientos «Debería»: WhatsApp por API, enlace de pago, fiado, recurrentes y probables. Se activan cuando un distribuidor paga.</p></div></div>' +
        '<div class="panel"><div class="panel-b"><span class="pill prio-podria">Futuro</span><div style="font:700 34px var(--font-display);margin:8px 0 2px">' + nF + '</div><p class="mut2" style="margin:0;font-size:13.5px">Requerimientos «Podría»: trazabilidad de GLP y fotos de evidencia. Dependen de normas que aún no se aprueban.</p></div></div></div></section></div>';
    }
  };

  /* =====================================================
     Recorrido guiado
     ===================================================== */
  var STEPS = [
    ['Mire los hogares por avisar hoy', 'Cada balón indica cuánto le queda al hogar. Los excluidos aparecen aparte con su motivo.', '#/s2/reposicion', function () { return false; }, 'Abrir reposición'],
    ['Apruebe la lista de avisos (modo manual)', 'Deje marcados los sugeridos, elija «Manual, sin costo» y apruebe. Si la hora simulada está fuera de 08:00 a 20:00, se bloquea.', '#/s2/reposicion', function () { return S().avisos.some(function (a) { return a.fecha === S().hoy; }); }, 'Ir a aprobar'],
    ['Marque una respuesta «Sí»', 'Abra WhatsApp, marque «Ya lo envié» y luego «Sí»: se crea un pedido confirmado con el producto de su última entrega.', '#/s2/reposicion', function () { var s = S(); return s.pedidos.some(function (p) { return p.avisoId && s.avisos.some(function (a) { return a.id === p.avisoId && a.fecha === s.hoy; }); }); }, 'Ir a las respuestas'],
    ['Asigne pedidos a Luis y registre su carga', 'Seleccione pedidos confirmados, asígnelos a Luis y registre cuántos llenos salen en su moto.', '#/s2/dia', function () { var s = S(); return s.pedidos.some(function (p) { return p.repartidorId === 'U-R1' && p.avisoId; }); }, 'Ir a planificación'],
    ['Abra la app como Luis y descargue el paquete', 'PIN de prueba 1234. El paquete trae los pedidos, el saldo de envases y la deuda de cada hogar.', '#/s1', function () { var d = S().devices['U-R1']; return !!(d && d.pkg); }, 'Abrir la app'],
    ['Pase a «Sin señal» y registre entregas', 'En el panel de simulación elija «Sin señal». Registre dos o tres entregas: la cola de eventos crece en el teléfono.', '#/s1', function () { var d = S().devices['U-R1']; return !!(d && d.events.filter(function (e) { return e.tipo === 'entrega.registrada'; }).length >= 2); }, 'Volver a la app'],
    ['Vuelva a «En línea»', 'Los eventos se envían por lotes y el servidor los aplica una sola vez. Pruebe «Reenviar último lote»: responde «duplicado».', '#/s1', function () { return S().eventLog.some(function (e) { return e.userId === 'U-R1' && e.estado === 'aceptado'; }); }, 'Volver a la app'],
    ['Cierre la jornada en la app', 'Resuelva los pedidos pendientes (entregado o no entregado) y cierre. El resumen debe coincidir con el cuadre.', '#/s1', function () { var d = S().devices['U-R1']; return !!(d && d.jornadaCerrada); }, 'Ir al cierre'],
    ['Haga el cuadre en el portal', 'Cuente el efectivo y los envases, verifique los cobros con QR y cierre. Pruebe también con el cuadre de Marco, que ya viene listo.', '#/s2/cuadre', function () { var s = S(), j = s.jornadas.filter(function (x) { return x.id.indexOf('U-R1') > 0 && x.fecha === s.hoy; })[0]; return !!(j && j.estado === 'cuadrada'); }, 'Ir al cuadre'],
    ['Mire el registro de eventos y ejecute las pruebas', 'Cada operación quedó como un evento. Ejecute las pruebas de idempotencia, cortes de red y conflictos.', '#/s3/sync', function () { return false; }, 'Ir a S3']
  ];
  App.tour = { reset: function () {} };
  App.views.recorrido = {
    render: function (r, host) {
      var done = STEPS.filter(function (s) { return s[3](); }).length;
      host.innerHTML = '<div class="home" style="max-width:900px"><h1>Recorrido guiado</h1><p class="lead" style="margin-top:8px">Diez pasos para ver el producto completo de punta a punta. Cada paso se marca solo cuando lo hace; los dos que no cambian el estado se recorren con el botón.</p><div class="row mt" style="gap:14px"><div class="meter grow"><i style="width:' + Math.round(done / STEPS.length * 100) + '%;background:var(--ok)"></i></div><b>' + done + ' de ' + STEPS.length + '</b></div><div class="panel mt"><div class="panel-b" style="padding-top:6px;padding-bottom:6px">' +
        STEPS.map(function (s, i) { var d = s[3](); return '<div class="step ' + (d ? 'done' : '') + '"><span class="n">' + (d ? ic('check', 16) : i + 1) + '</span><div><b>' + s[0] + '</b><span class="d">' + s[1] + '</span></div><a class="btn btn-sm ' + (d ? '' : 'btn-primary') + '" href="' + s[2] + '">' + s[4] + '</a></div>'; }).join('') + '</div></div><div class="row mt"><button class="btn btn-danger btn-sm" data-act="shell.reset">' + ic('refresh', 14) + 'Empezar de nuevo</button></div></div>';
    }
  };

  /* =====================================================
     Cobertura de requerimientos
     ===================================================== */
  var RN = [
    ['RN-01', 'Sin consentimiento vigente no hay avisos.', [['/s2/reposicion', 'Los excluidos muestran «Sin consentimiento»']], 'Aprobar la lista: los hogares sin consentimiento no se pueden seleccionar.'],
    ['RN-02', 'Un aviso por ciclo; sin respuesta no se reenvía en el mismo ciclo (máximo configurable: 2).', [['/s2/reposicion', 'H-012 ya recibió el aviso'], ['/s2/reposicion/parametros', 'Avisos por ciclo']], 'Mire a Luis Castro entre los excluidos.'],
    ['RN-03', 'Avisos solo entre las 8:00 y las 20:00, hora de Lima.', [['/s2/reposicion', 'Aprobar lista']], 'Cambie la hora simulada a 21:30 y apruebe la lista: se bloquea.'],
    ['RN-04', 'Un evento no se edita: las correcciones son eventos nuevos.', [['/s3/eventos', 'Registro de eventos']], 'Abra un evento y pulse «Intentar editar este evento».'],
    ['RN-05', 'Si se recogen más vacíos de los prestados, el exceso se registra como «envase recibido sin préstamo».', [['/s1', 'Entrega, cambiar envases'], ['/s2/envases/mov', 'Movimientos']], 'En una entrega aumente los vacíos por encima del saldo del hogar.'],
    ['RN-06', 'El precio del pedido es el vigente al confirmarlo.', [['/s2/catalogo', 'Cambiar precio'], ['/s2/pedidos', 'Confirmar pedido']], 'Cambie un precio y confirme un pedido por confirmar: toma el nuevo.'],
    ['RN-07', 'Un cuadre cerrado no se reabre: los ajustes van a la jornada siguiente.', [['/s2/cuadre', 'Cuadre']], 'Cierre el cuadre de Marco y pruebe el ajuste diferido.'],
    ['RN-08', 'La asignación al grupo de control no cambia durante el experimento.', [['/s3/experimento', 'Experimento']], 'El botón «Nueva asignación» está bloqueado.'],
    ['RN-09', 'La duración estimada se limita a un rango por producto; fuera de él se usa la referencia.', [['/s2/reposicion/parametros', 'Probar con H-015']], 'Elija H-015: su mediana queda fuera del rango.'],
    ['RN-10', 'La respuesta «Sí» a un aviso crea un pedido con el producto y la cantidad de la última entrega.', [['/s2/reposicion', 'Respuestas'], ['/s3/mensajeria', 'Webhook']], 'Marque «Sí» en un aviso aprobado.']
  ];
  var PR = [
    ['PR1', 'Alta del hogar y consentimiento', 'S1, S2, S3', [['/s1', 'S1'], ['/s2/hogares', 'S2']]],
    ['PR2', 'Reposición anticipada', 'S3, S2', [['/s2/reposicion', 'Avisos de hoy']]],
    ['PR3', 'Recepción del pedido', 'WhatsApp, S3, S2', [['/s3/mensajeria', 'Webhook'], ['/s2/pedidos', 'Bandeja']]],
    ['PR4', 'Planificación del día', 'S2, S3', [['/s2/dia', 'Planificación']]],
    ['PR5', 'Entrega sin conexión', 'S1', [['/s1', 'S1']]],
    ['PR6', 'Sincronización', 'S1 y S3', [['/s1', 'Pantalla Sincro'], ['/s3/sync', 'Pruebas']]],
    ['PR7', 'Cobro digital', 'S1, S3 y pasarela', [['/s3/pagos', 'Página de pago']]],
    ['PR8', 'Cuadre', 'S1, S3, S2', [['/s2/cuadre', 'Cuadre']]],
    ['PR9', 'Conteo de envases', 'S2', [['/s2/envases/conteo', 'Conteo semanal']]],
    ['PR10', 'Medición', 'S3, S2', [['/s2/resultados', 'Resultados'], ['/s3/experimento', 'Asignación']]]
  ];
  App.views.cobertura = {
    render: function (r, host) {
      var sub = r.page || 'rf';
      var T = [['rf', 'Requerimientos funcionales'], ['rn', 'Reglas de negocio'], ['pr', 'Procesos'], ['roles', 'Roles y permisos']];
      var body = ({ rf: covRf, rn: covRn, pr: covPr, roles: covRoles }[sub] || covRf)();
      host.innerHTML = '<div class="home"><h1>Cobertura del análisis funcional</h1><p class="lead" style="margin:8px 0 18px">Dónde está cada requerimiento, regla y proceso de <code>14_analisis_funcional_y_requerimientos.md</code> dentro del prototipo, y con qué fidelidad.</p>' + UI.tabs(T, sub, 'cobertura') + body + '</div>';
    }
  };
  function nivelPill(n) { return n === 'inter' ? UI.pill('ok', 'Interactivo', 'check') : n === 'sim' ? UI.pill('warn', 'Simulado', 'info') : UI.pill('mute', 'Representado', 'eye'); }
  function covRf() {
    var tot = App.REQS.length, by = function (f) { return App.REQS.filter(f).length; };
    var nivel = { inter: 0, sim: 0, vis: 0 }; App.REQS.forEach(function (q) { nivel[App.WHERE[q.id].nivel]++; });
    var mods = App.REQS.reduce(function (a, q) { if (a.indexOf(q.mod) < 0) a.push(q.mod); return a; }, []);
    return '<div class="cov-bar"><div><div class="big">' + tot + '<small>requerimientos funcionales</small></div></div><div><span class="pill prio-debe">MVP ' + by(function (q) { return q.prio === 'debe'; }) + '</span> <span class="pill prio-deberia">Piloto ' + by(function (q) { return q.prio === 'deberia'; }) + '</span> <span class="pill prio-podria">Futuro ' + by(function (q) { return q.prio === 'podria'; }) + '</span></div><div class="grow"></div><div>' + UI.pill('ok', nivel.inter + ' interactivos', 'check') + ' ' + UI.pill('warn', nivel.sim + ' simulados', 'info') + ' ' + UI.pill('mute', nivel.vis + ' representados', 'eye') + '</div></div>' +
      UI.table('cov', { rows: function () { return App.REQS; }, rowId: function (r) { return r.id; }, rowAct: 'cov.ver', search: function (r) { return r.id + r.text + r.mod; }, pageSize: 14, placeholder: 'Buscar por código o texto', filters: [
        { k: 'sys', label: 'Sistema', options: [['S1', 'S1'], ['S2', 'S2'], ['S3', 'S3'], ['S4', 'S4']], test: function (r, v) { return r.sys.indexOf(v) >= 0; } },
        { k: 'prio', label: 'Prioridad', options: [['debe', 'MVP (Debe)'], ['deberia', 'Piloto (Debería)'], ['podria', 'Futuro (Podría)']], test: function (r, v) { return r.prio === v; } },
        { k: 'mod', label: 'Módulo', options: mods.map(function (m) { return [m, m]; }), test: function (r, v) { return r.mod === v; } },
        { k: 'niv', label: 'Fidelidad', options: [['inter', 'Interactivo'], ['sim', 'Simulado'], ['vis', 'Representado']], test: function (r, v) { return App.WHERE[r.id].nivel === v; } }
      ], cols: [
        { label: 'Código', render: function (r) { return '<b class="num">' + r.id + '</b>'; }, sort: function (r) { return r.id; } },
        { label: 'Módulo', render: function (r) { return esc(r.mod); } },
        { label: 'Requerimiento', render: function (r) { return '<span style="display:block;max-width:520px">' + esc(r.text) + '</span>'; } },
        { label: 'Sistemas', render: function (r) { return esc(r.sys); } },
        { label: 'Prioridad', render: function (r) { return '<span class="pill prio-' + r.prio + '">' + UI.PRIO[r.prio].label + '</span>'; }, sort: function (r) { return r.prio; } },
        { label: 'Fidelidad', render: function (r) { return nivelPill(App.WHERE[r.id].nivel); } },
        { label: 'Dónde verlo', nosort: true, render: function (r) { return App.WHERE[r.id].donde.map(function (d) { return '<a href="#' + d[0] + '" onclick="event.stopPropagation()">' + esc(d[1]) + '</a>'; }).join('<br>'); } }
      ] });
  }
  App.acts['cov.ver'] = function (el) { App.acts['rf.info']({ dataset: { id: el.dataset.id } }); };
  function covRn() {
    return '<div class="tbl-wrap"><table><thead><tr><th>Regla</th><th>Qué dice</th><th>Dónde se aplica</th><th>Cómo probarla</th></tr></thead><tbody>' + RN.map(function (r) { return '<tr><td><b>' + r[0] + '</b></td><td>' + esc(r[1]) + '</td><td>' + r[2].map(function (d) { return '<a href="#' + d[0] + '">' + esc(d[1]) + '</a>'; }).join('<br>') + '</td><td>' + esc(r[3]) + '</td></tr>'; }).join('') + '</tbody></table></div>';
  }
  function covPr() {
    return '<div class="tbl-wrap"><table><thead><tr><th>Proceso</th><th>Nombre</th><th>Sistemas</th><th>Dónde verlo</th></tr></thead><tbody>' + PR.map(function (r) { return '<tr><td><b>' + r[0] + '</b></td><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + r[3].map(function (d) { return '<a href="#' + d[0] + '">' + esc(d[1]) + '</a>'; }).join(', ') + '</td></tr>'; }).join('') + '</tbody></table></div>';
  }
  function covRoles() {
    var si = '<span class="yes">Sí</span>', no = '<span class="no">—</span>';
    var M = [['Configurar empresa, precios, envases y usuarios', si, no, no, 'Solo el alta'], ['Registrar hogares y pedidos', si, si, 'Sí, en ruta', no], ['Aprobar la lista de avisos del día', si, si, no, no], ['Planificar el día y asignar pedidos', si, si, no, no], ['Registrar entregas, envases y cobros', no, no, si, no], ['Verificar cobros digitales y cerrar el cuadre', si, 'Si el dueño lo habilita', no, no], ['Anular cobros y ajustar envases', si, no, no, no], ['Ver resultados del experimento y el retorno', si, no, no, 'Para soporte']];
    return '<p class="mut2" style="margin-bottom:12px">Para comprobarlo, cambie entre «Dueño» y «Despachador» en el menú lateral de S2, y active el permiso en <a href="#/s2/equipo">Equipo y seguridad</a>.</p><div class="tbl-wrap perm"><table><thead><tr><th>Acción</th><th>Dueño</th><th>Despachador</th><th>Repartidor</th><th>Administrador SaaS</th></tr></thead><tbody>' + M.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + r[3] + '</td><td>' + r[4] + '</td></tr>'; }).join('') + '</tbody></table></div>';
  }
})();

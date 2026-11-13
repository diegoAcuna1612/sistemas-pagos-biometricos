/* S2 — Planificación, hogares, catálogo, libro de envases, cobros y cuadre */
(function () {
  'use strict';
  var App = window.App, U = App.U, UI = App.UI, C = App.Charts, ic = App.ic, esc = U.esc, rf = App.rf, srv = App.srv, est = App.est, X = App.s2;
  var S = function () { return App.S; };
  var hg = App.hogar, head = X.head;
  var st = X.st; st.selPed = {};

  /* =====================================================
     Planificación del día (RF-DIA-01 a 04, 06)
     ===================================================== */
  X.pages.dia = function () {
    var s = S();
    var libres = s.pedidos.filter(function (p) { return p.estado === 'confirmado' && !p.repartidorId; });
    var nSel = libres.filter(function (p) { return st.selPed[p.id]; }).length;
    var lane0 = '<div class="lane"' + rf('RF-DIA-01') + '><div class="lane-h"><div><b>Pedidos por asignar</b><small style="display:block">' + libres.length + ' confirmados</small></div><label class="check" style="font-weight:600"><input type="checkbox" data-chg="dia.todos" ' + (libres.length && nSel === libres.length ? 'checked' : '') + '>Todos</label></div><div class="lane-b">' +
      (libres.map(function (p) { return '<label class="pcard' + (st.selPed[p.id] ? ' sel' : '') + '" style="cursor:pointer"><input type="checkbox" data-chg="dia.sel" data-id="' + p.id + '" ' + (st.selPed[p.id] ? 'checked' : '') + ' style="accent-color:var(--agua)"><div class="grow"><b>' + esc(X.nombre(p.hogarId)) + '</b><small class="mut">' + p.items.map(X.prodTxt).join(', ') + ', ' + esc(hg(p.hogarId).distrito) + '</small></div><span class="pill st-mute">' + UI.origen(p.origen) + '</span></label>'; }).join('') || '<div class="empty" style="padding:20px"><b>Todo asignado</b><p>No quedan pedidos confirmados sin repartidor.</p></div>') + '</div>' +
      '<div class="panel-b" style="border-top:1px solid var(--line);display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-primary btn-sm" data-act="dia.asignar" data-u="U-R1"' + (nSel ? '' : ' disabled') + '>Asignar a Luis</button><button class="btn btn-sm" data-act="dia.asignar" data-u="U-R2"' + (nSel ? '' : ' disabled') + '>Asignar a Marco</button></div></div>';
    return head('Planificación del día', 'Asigne los pedidos, registre qué carga sale en cada vehículo y deje listo el paquete que el repartidor descarga al iniciar.') +
      '<div class="plan">' + lane0 + repLane('U-R1') + repLane('U-R2') + '</div>' + probables();
  };
  function repLane(uid) {
    var s = S(), u = s.usuarios.filter(function (x) { return x.id === uid; })[0], j = srv.jornada(uid), dv = s.dispositivos[uid], d = s.devices[uid];
    var mine = s.pedidos.filter(function (p) { return p.repartidorId === uid && p.estado !== 'cancelado'; });
    var abiertos = mine.filter(function (p) { return p.estado === 'asignado' || p.estado === 'en_ruta'; });
    var dem = {}; abiertos.forEach(function (p) { p.items.forEach(function (i) { var e = s.productos[i.p].envase; dem[e] = (dem[e] || 0) + i.qty; }); });
    var envs = Object.keys(s.envases);
    var carga = envs.map(function (e) {
      var v = j.carga.llenos[e] != null ? j.carga.llenos[e] : (dem[e] ? Math.ceil(dem[e] * 1.1) : 0);
      return '<div class="carga-row" style="display:grid;grid-template-columns:1fr 70px;gap:8px;padding:5px 0"><span style="font-size:13px">' + esc(s.envases[e].nombre) + ' <small class="mut">(piden ' + (dem[e] || 0) + ')</small></span><input class="input sm" type="number" min="0" value="' + v + '" data-carga="' + uid + '" data-e="' + e + '" ' + (j.estado === 'cuadrada' ? 'disabled' : '') + '></div>';
    }).join('');
    var kb = Math.round(38 + 0.9 * mine.length + 0.4 * (s.avisos.length)), seg = Math.max(1, Math.round(kb / 50));
    return '<div class="lane"><div class="lane-h"><div class="row">' + UI.avatar(u.nombre) + '<div><b>' + esc(u.nombre) + '</b><small style="display:block">' + esc(u.vehiculo) + ', ' + abiertos.length + ' pedidos abiertos</small></div></div></div><div class="lane-b">' +
      (mine.map(function (p) { return '<div class="pcard"><div class="grow"><b>' + esc(X.nombre(p.hogarId)) + '</b><small class="mut">' + p.items.map(X.prodTxt).join(', ') + '</small></div>' + UI.estadoPedido(p.estado) + ((p.estado === 'asignado') ? '<button class="btn btn-ghost btn-icon btn-sm" data-act="dia.quitar" data-id="' + p.id + '" aria-label="Quitar">' + ic('x', 14) + '</button>' : '') + '</div>'; }).join('') || '<div class="mut" style="padding:12px">Sin pedidos asignados.</div>') + '</div>' +
      '<div class="panel-b" style="border-top:1px solid var(--line)"' + rf('RF-DIA-03') + '><h4>Carga del vehículo</h4><p class="mut" style="font-size:12.5px;margin:2px 0 6px">Llenos que salen. Es la base del cuadre de envases.</p>' + carga +
      '<div class="row sb" style="margin-top:8px"><span>' + (j.cargaConfirmada ? UI.pill('ok', 'Confirmada por el repartidor', 'check') : UI.pill('mute', 'Sin confirmar', 'clock')) + '</span><button class="btn btn-sm btn-primary" data-act="dia.carga" data-u="' + uid + '"' + (j.estado === 'cuadrada' ? ' disabled' : '') + '>Registrar carga</button></div></div>' +
      '<div class="panel-b" style="border-top:1px solid var(--line)"' + rf('RF-DIA-04') + '><h4>Paquete del día</h4><dl class="kv" style="grid-template-columns:120px 1fr;margin-top:6px"><dt>Contenido</dt><dd>' + mine.length + ' pedidos, precios, saldo de envases y deuda por hogar</dd><dt>Tamaño</dt><dd>' + kb + ' KB, unos ' + seg + ' s en 3G [H]</dd><dt>Descargado</dt><dd>' + (d && d.pkg ? d.pkg.descargado.slice(11) + ' (hoy)' : '<span class="mut">Todavía no</span>') + '</dd><dt>Teléfono</dt><dd>' + (dv.ultimoContacto ? 'Último contacto ' + dv.ultimoContacto.slice(11) : 'Sin contacto') + '</dd></dl><div class="note mt-s" style="font-size:12.5px"' + rf('RF-DIA-06') + '>Si asigna o cancela un pedido después de la descarga, el cambio llega al teléfono cuando tenga señal.</div></div></div>';
  }
  function probables() {
    var s = S();
    var list = s.avisos.filter(function (a) { return !a.respuesta && (a.estado === 'enviado' || a.estado === 'entregado') && !s.pedidos.some(function (p) { return p.avisoId === a.id; }); });
    return '<div class="sect" ' + rf('RF-DIA-02') + '><div class="sect-h"><h2>Probables para ofrecer en ruta</h2><label class="row" style="gap:8px;font-weight:600"><span class="switch"><input type="checkbox" data-chg="dia.prob" ' + (s.flags.probables ? 'checked' : '') + '><i></i></span>Incluir en el paquete</label></div><p class="mut2" style="margin-top:-4px">Hogares avisados que aún no respondieron y están cerca de su fecha. El repartidor los ve como una lista secundaria.</p><div class="tbl-wrap"><table><thead><tr><th>Hogar</th><th>Producto</th><th>Aviso</th><th>Zona</th></tr></thead><tbody>' + (list.map(function (a) { var h = hg(a.hogarId); return '<tr><td><b>' + esc(h.nombre) + '</b><span class="sub">' + esc(h.tel) + '</span></td><td>' + X.prodTxt({ p: a.prodId, qty: a.qty }) + '</td><td>' + U.dm(a.fecha) + ' ' + a.hora + '</td><td>' + esc(h.distrito) + '</td></tr>'; }).join('') || '<tr><td colspan="4" class="tbl-empty">No hay hogares avisados sin respuesta. Apruebe la lista de reposición para generar probables.</td></tr>') + '</tbody></table></div></div>';
  }
  App.chg['dia.sel'] = function (el) { st.selPed[el.dataset.id] = el.checked; App.render(); };
  App.chg['dia.todos'] = function (el) { S().pedidos.forEach(function (p) { if (p.estado === 'confirmado' && !p.repartidorId) st.selPed[p.id] = el.checked; }); App.render(); };
  App.chg['dia.prob'] = function (el) { S().flags.probables = el.checked; };
  App.acts['dia.asignar'] = function (el) {
    var ids = Object.keys(st.selPed).filter(function (k) { return st.selPed[k]; });
    if (!ids.length) return;
    srv.asignar(ids, el.dataset.u); st.selPed = {};
    var dv = S().devices[el.dataset.u];
    UI.toast(ids.length + ' pedido(s) asignados a ' + App.nombreUsuario(el.dataset.u) + (dv && dv.pkg ? '. Llegarán a su teléfono cuando tenga señal.' : '.'), 'ok'); App.render();
  };
  App.acts['dia.quitar'] = function (el) { var p = App.pedido(el.dataset.id); p.repartidorId = null; srv.setEstado(p, 'confirmado'); UI.toast('Pedido devuelto a la lista por asignar', 'ok'); App.render(); };
  App.acts['dia.carga'] = function (el) {
    var llenos = {}; document.querySelectorAll('[data-carga="' + el.dataset.u + '"]').forEach(function (i) { if (+i.value > 0) llenos[i.dataset.e] = +i.value; });
    srv.setCarga(el.dataset.u, llenos); UI.toast('Carga registrada. El repartidor la confirma en su app.', 'ok'); App.render();
  };

  /* =====================================================
     Hogares (RF-CLI-01 a 06)
     ===================================================== */
  X.pages.hogares = function () {
    var s = S();
    var distritos = s.hogares.reduce(function (a, h) { if (a.indexOf(h.distrito) < 0) a.push(h.distrito); return a; }, []);
    var tbl = UI.table('hog', { rows: function () { return S().hogares; }, rowId: function (r) { return r.id; }, rowAct: 'hog.ver', search: function (r) { return r.id + r.nombre + r.tel + r.dir; }, placeholder: 'Buscar por nombre, celular o dirección', pageSize: 12, filters: [
      { k: 'c', label: 'Consentimiento', options: [['vigente', 'Acepta avisos'], ['ninguno', 'Sin consentimiento'], ['baja', 'Dio de baja']], test: function (r, v) { return r.consent.estado === v; } },
      { k: 'g', label: 'Experimento', options: [['aviso', 'Grupo aviso'], ['control', 'Grupo control']], test: function (r, v) { return r.grupo === v; } },
      { k: 'd', label: 'Distrito', options: distritos.map(function (d) { return [d, d]; }), test: function (r, v) { return r.distrito === v; } }
    ], cols: [
      { label: 'Hogar', render: function (r) { return '<b>' + esc(r.nombre) + '</b><span class="sub">' + r.id + ', ' + esc(r.tel) + '</span>'; }, sort: function (r) { return r.nombre; } },
      { label: 'Ubicación', render: function (r) { return esc(r.distrito) + '<span class="sub">' + esc(r.dir) + '</span>'; } },
      { label: 'Compra habitual', render: function (r) { return r.productos.length ? X.prodTxt(r.productos[0]) : '—'; } },
      { label: 'Consentimiento', render: function (r) { return X.consentPill(r); } },
      { label: 'Envases', align: 'right', render: function (r) { return Object.keys(r.envSaldo).reduce(function (a, k) { return a + r.envSaldo[k]; }, 0); }, sort: function (r) { return Object.keys(r.envSaldo).reduce(function (a, k) { return a + r.envSaldo[k]; }, 0); } },
      { label: 'Deuda', align: 'right', render: function (r) { return r.deuda ? '<span class="dn">' + U.money(r.deuda) + '</span>' : '<span class="mut">—</span>'; }, sort: function (r) { return r.deuda; } },
      { label: 'Próximo aviso', render: function (r) { if (!r.productos.length) return '—'; var e = est.estimar(r, r.productos[0].p); return e.fechaAviso ? U.dm(e.fechaAviso) : '—'; } }
    ] });
    return head('Hogares', s.hogares.length + ' hogares con su historial, envases, deuda y consentimiento.', '<button class="btn" data-act="hog.importar"' + rf('RF-CLI-04') + '>' + ic('upload', 16) + 'Importar historial</button><button class="btn btn-primary" data-act="hog.nuevo"' + rf('RF-CLI-01') + '>' + ic('plus', 16) + 'Nuevo hogar</button>') + tbl;
  };
  App.acts['hog.nuevo'] = function () {
    var s = S(), t0 = Date.now();
    UI.modal({ title: 'Nuevo hogar', body: '<div class="form2"><div class="field"><label>Nombre o alias</label><input class="input" name="n" placeholder="Rosa Quispe"></div><div class="field"><label>Celular (+51)</label><input class="input" name="t" placeholder="9XX XXX XXX"><small>No puede repetirse dentro del negocio.</small></div></div><div class="form2"><div class="field"><label>Dirección</label><input class="input" name="d"></div><div class="field"><label>Referencia</label><input class="input" name="r" placeholder="Casa verde, portón negro"></div></div><div class="form2"><div class="field"><label>Compra habitual</label><select class="select" name="p">' + Object.keys(s.productos).map(function (k) { return '<option value="' + k + '">' + esc(s.productos[k].nombre) + '</option>'; }).join('') + '</select></div><div class="field"><label>Cantidad</label><input class="input" name="q" type="number" min="1" value="1"></div></div><label class="check" ' + rf('RF-CLI-02') + '><input type="checkbox" name="c"><span><b>El hogar aceptó los avisos de reposición por WhatsApp</b><br><small>Se guarda la fecha, el medio, el texto mostrado y quién lo registró. Sin esto no se le avisará.</small></span></label>', actions: [{ label: 'Cancelar' }, { label: 'Guardar hogar', kind: 'btn-primary', onClick: function (m) {
      if (!m.val('n').trim() || m.val('t').replace(/\D/g, '').length < 9 || !m.val('d').trim()) { UI.toast('Complete nombre, celular de 9 dígitos y dirección.', 'bad'); return false; }
      var consent = m.val('c') ? { estado: 'vigente', fecha: s.hoy, medio: 'formulario', texto: 'Aviso de reposición por WhatsApp', por: App.actor() } : undefined;
      var r = srv.crearHogar({ nombre: m.val('n').trim(), tel: m.val('t').trim(), dir: m.val('d').trim(), ref: m.val('r'), productos: [{ p: m.val('p'), qty: Math.max(1, +m.val('q')) }], consent: consent });
      if (!r.ok) { UI.toast(r.motivo, 'bad'); return false; }
      UI.toast('Hogar ' + r.hogar.id + ' registrado en ' + Math.max(1, Math.round((Date.now() - t0) / 1000)) + ' s', 'ok'); App.render();
    } }] });
  };
  App.acts['hog.ver'] = function (el) {
    var h = hg(el.dataset.id), s = S(), pr = h.productos[0], e = pr ? est.estimar(h, pr.p) : null;
    var cobros = s.cobros.filter(function (c) { return c.hogarId === h.id; }).slice(-4).reverse();
    var avs = s.avisos.filter(function (a) { return a.hogarId === h.id; }).slice(-3).reverse();
    var ent = pr ? (h.entregas[pr.p] || []).slice(-6).reverse() : [];
    var body = '<div class="grid2"><div><dl class="kv" ' + rf('RF-CLI-05') + '><dt>Nombre</dt><dd><b>' + esc(h.nombre) + '</b> ' + h.id + '</dd><dt>Celular</dt><dd>' + esc(h.tel) + '</dd><dt>Dirección</dt><dd>' + esc(h.dir) + ', ' + esc(h.distrito) + '<br><span class="mut">' + esc(h.ref) + '</span></dd><dt>Compra habitual</dt><dd>' + (pr ? X.prodTxt(pr) : '—') + '</dd><dt>Experimento</dt><dd>' + (h.grupo ? (h.grupo === 'aviso' ? 'Grupo aviso' : 'Grupo de control (no recibe avisos)') : 'No participa') + '</dd><dt>Deuda</dt><dd>' + (h.deuda ? '<b class="dn">' + U.money(h.deuda) + '</b>' : 'Sin deuda') + '</dd></dl>' +
      '<h4 style="margin:16px 0 6px">Consentimiento</h4><div class="note ' + (h.consent.estado === 'vigente' ? 'ok' : 'warn') + '"' + rf('RF-CLI-02,RF-CLI-03') + '>' + X.consentPill(h) + (h.consent.fecha ? '<dl class="kv" style="margin-top:8px;grid-template-columns:90px 1fr"><dt>Fecha</dt><dd>' + U.dmy(h.consent.fecha) + '</dd><dt>Medio</dt><dd>' + esc(h.consent.medio || '') + '</dd><dt>Texto</dt><dd>' + esc(h.consent.texto || '') + '</dd><dt>Registró</dt><dd>' + esc(h.consent.por || '') + '</dd></dl>' : '<p style="margin:6px 0 0">No se le enviarán avisos hasta que acepte.</p>') + (h.consent.bajaFecha ? '<p style="margin:6px 0 0">Baja registrada el ' + U.dmy(h.consent.bajaFecha) + '.</p>' : '') + '</div></div>' +
      '<div>' + (e ? '<h4 style="margin-bottom:8px">Reposición</h4><div class="row" style="gap:14px">' + X.cyl(e, 60) + '<div><b>' + X.dias(e) + '</b><div class="mut2" style="font-size:13px">' + esc(X.explica(e)) + '</div>' + (h.todavia[pr.p] ? '<small>Respondió «todavía tengo» ' + h.todavia[pr.p] + ' vez(ces): este ciclo se pospone.</small>' : '') + '</div></div><h4 style="margin:16px 0 6px">Últimas entregas</h4><div class="tbl-wrap"><table><tbody>' + ent.map(function (x) { return '<tr><td>' + U.dmy(x.fecha) + '</td><td>' + x.qty + ' u</td></tr>'; }).join('') + '</tbody></table></div>' : '') +
      '<h4 style="margin:16px 0 6px">Envases</h4><div class="tbl-wrap"><table><tbody>' + (Object.keys(h.envSaldo).map(function (k) { return '<tr><td>' + esc(s.envases[k].nombre) + '</td><td class="right">' + h.envSaldo[k] + ' prestado(s)</td></tr>'; }).join('') || '<tr><td class="mut">Sin envases prestados</td></tr>') + '<tr><td>Garantía en poder del negocio</td><td class="right">' + U.money(h.garantia) + '</td></tr></tbody></table></div>' +
      '<h4 style="margin:16px 0 6px">Avisos y cobros recientes</h4><div style="font-size:13px">' + (avs.map(function (a) { return '<div>' + U.dm(a.fecha) + ' aviso ' + a.id + ': ' + (a.respuesta || a.estado) + '</div>'; }).join('') + cobros.map(function (c) { return '<div>' + UI.medio(c.medio) + ' ' + U.money(c.monto) + ' (' + c.estado + ')</div>'; }).join('') || '<span class="mut">Sin movimientos todavía</span>') + '</div></div></div>' +
      '<div class="divider"></div><div class="row wrap" ' + rf('RF-CLI-06') + '><b>Datos personales</b><span class="grow"></span><button class="btn btn-sm" data-act="hog.exportar" data-id="' + h.id + '">' + ic('download', 14) + 'Exportar sus datos</button><button class="btn btn-sm btn-danger" data-act="hog.eliminar" data-id="' + h.id + '">' + ic('trash', 14) + 'Eliminar sus datos</button></div>';
    var acts = [{ label: 'Cerrar' }];
    if (h.consent.estado === 'vigente') acts.push({ label: 'Dar de baja los avisos', onClick: function () { srv.baja(h, 'pedido del hogar al dueño'); UI.toast('Baja registrada', 'ok'); App.render(); } });
    else if (h.consent.estado !== 'baja') acts.push({ label: 'Registrar consentimiento', kind: 'btn-primary', onClick: function () { srv.consentir(h, 'formulario', 'Aviso de reposición por WhatsApp'); UI.toast('Consentimiento registrado', 'ok'); App.render(); } });
    UI.modal({ title: esc(h.nombre), wide: true, body: body, actions: acts });
  };
  App.acts['hog.exportar'] = function (el) {
    var h = hg(el.dataset.id), s = S();
    var data = { hogar: { id: h.id, nombre: h.nombre, celular: h.tel, direccion: h.dir, distrito: h.distrito }, consentimiento: h.consent, entregas: h.entregas, envases: h.envSaldo, deuda: h.deuda, cobros: s.cobros.filter(function (c) { return c.hogarId === h.id; }).map(function (c) { return { id: c.id, medio: c.medio, monto: c.monto, estado: c.estado }; }), avisos: s.avisos.filter(function (a) { return a.hogarId === h.id; }).map(function (a) { return { id: a.id, fecha: a.fecha, respuesta: a.respuesta }; }) };
    var json = JSON.stringify(data, null, 2);
    s.solicitudesDatos.unshift({ id: 'SOL-' + (s.solicitudesDatos.length + 1), tipo: 'Exportación', hogar: h.id, ts: App.clock.stamp(), estado: 'Atendida' });
    srv.audit('Exportó los datos de un hogar', h.id);
    UI.modal({ title: 'Datos de ' + esc(h.nombre), body: '<p class="mut">Archivo listo para entregar al titular. La solicitud quedó registrada.</p><div class="jsonv">' + esc(json) + '</div>', actions: [{ label: 'Cerrar' }, { label: 'Descargar JSON', kind: 'btn-primary', keep: true, onClick: function () { var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' })); a.download = 'datos-' + h.id + '.json'; a.click(); return false; } }] });
  };
  App.acts['hog.eliminar'] = function (el) {
    var h = hg(el.dataset.id);
    UI.confirm('Eliminar los datos de ' + esc(h.nombre) + '?', 'Se borran el hogar y su historial. Los cobros pasados se conservan sin datos personales para el cuadre. Esta acción no se puede deshacer.', 'Eliminar datos', 'btn-danger', function () {
      S().solicitudesDatos.unshift({ id: 'SOL-' + (S().solicitudesDatos.length + 1), tipo: 'Eliminación', hogar: h.id, ts: App.clock.stamp(), estado: 'Atendida' });
      srv.eliminarHogar(h); document.querySelectorAll('.overlay').forEach(function (o) { o.remove(); }); UI.toast('Datos eliminados', 'ok'); App.render();
    });
  };
  App.acts['hog.importar'] = function () {
    var ejemplo = 'fecha,hogar,producto,cantidad\n2026-09-14,H-004,GLP5,1\n2026-09-30,H-004,GLP5,1\n2026-10-15,H-999,GLP10,1\n2026-10-10,H-016,GLP10,1\n2026/10/20,H-016,GLP10,1\n2026-10-18,H-017,AGUA20,2';
    UI.modal({ title: 'Importar historial de compras', wide: true, body: '<p class="mut">Pegue las filas de su planilla: <span class="kbd">fecha,hogar,producto,cantidad</span>. El historial alimenta el cálculo de reposición.</p><div class="field"><textarea class="textarea" name="csv" rows="7" style="font-family:ui-monospace,Consolas,monospace;font-size:12.5px">' + esc(ejemplo) + '</textarea></div><button class="btn btn-sm" data-act="hog.validar">Revisar filas</button><div id="imp-out" class="mt"></div>', actions: [{ label: 'Cerrar' }, { label: 'Importar filas válidas', kind: 'btn-primary', keep: true, onClick: function (m) { var r = parseCsv(m.val('csv')); r.ok.forEach(function (x) { var h = hg(x.hogar); (h.entregas[x.prod] = h.entregas[x.prod] || []).push({ fecha: x.fecha, qty: x.qty }); h.entregas[x.prod].sort(function (a, b) { return a.fecha < b.fecha ? -1 : 1; }); }); srv.audit('Importó historial', r.ok.length + ' filas'); UI.toast(r.ok.length + ' filas importadas, ' + r.err.length + ' con error', r.err.length ? 'info' : 'ok'); document.querySelectorAll('.overlay').forEach(function (o) { o.remove(); }); App.render(); return false; } }] });
  };
  function parseCsv(txt) {
    var ok = [], err = [], s = S();
    txt.split(/\r?\n/).forEach(function (l, i) {
      if (!l.trim() || i === 0) return;
      var c = l.split(',').map(function (x) { return x.trim(); }), m = [];
      if (!/^\d{4}-\d{2}-\d{2}$/.test(c[0] || '')) m.push('fecha inválida (use AAAA-MM-DD)');
      if (!hg(c[1])) m.push('el hogar ' + c[1] + ' no existe');
      if (!s.productos[c[2]]) m.push('producto desconocido');
      if (!(+c[3] > 0)) m.push('cantidad inválida');
      if (m.length) err.push({ n: i + 1, l: l, m: m.join('; ') }); else ok.push({ fecha: c[0], hogar: c[1], prod: c[2], qty: +c[3] });
    });
    return { ok: ok, err: err };
  }
  App.acts['hog.validar'] = function () {
    var r = parseCsv(document.querySelector('.modal [name="csv"]').value);
    document.getElementById('imp-out').innerHTML = '<div class="row" style="gap:10px;margin-bottom:8px">' + UI.pill('ok', r.ok.length + ' filas válidas', 'check') + UI.pill(r.err.length ? 'bad' : 'mute', r.err.length + ' con error', r.err.length ? 'alert' : 'check') + '</div>' + (r.err.length ? '<div class="tbl-wrap"><table><thead><tr><th>Fila</th><th>Contenido</th><th>Error</th></tr></thead><tbody>' + r.err.map(function (e) { return '<tr><td>' + e.n + '</td><td><span class="kbd">' + esc(e.l) + '</span></td><td>' + esc(e.m) + '</td></tr>'; }).join('') + '</tbody></table></div>' : '');
  };

  /* =====================================================
     Catálogo y precios (RF-CAT-01 a 03)
     ===================================================== */
  X.pages.catalogo = function () {
    var s = S();
    var prods = Object.keys(s.productos).map(function (k) {
      var p = s.productos[k], hist = s.precioHist[k], last = hist[hist.length - 1];
      return '<tr><td><b>' + esc(p.nombre) + '</b></td><td class="num right"><b>' + U.money(p.precio) + '</b></td><td>' + esc(s.envases[p.envase].nombre) + '</td><td>Desde ' + U.dmy(last.fecha) + '</td><td class="right"><button class="btn btn-sm" data-act="cat.hist" data-p="' + k + '">Historial</button> <button class="btn btn-sm btn-primary" data-act="cat.precio" data-p="' + k + '"' + X.solo('precios') + '>Cambiar precio</button></td></tr>';
    }).join('');
    var envs = Object.keys(s.envases).map(function (k) {
      var e = s.envases[k], usan = Object.keys(s.productos).filter(function (p) { return s.productos[p].envase === k; }).map(function (p) { return s.productos[p].corto; }).join(', ');
      return '<tr><td><b>' + esc(e.nombre) + '</b></td><td>' + esc(usan) + '</td><td class="right"><input class="input sm" style="width:90px;text-align:right" type="number" min="0" value="' + e.garantia + '" data-chg="cat.gar" data-e="' + k + '"' + X.solo('envases_cfg') + '> <small>soles</small></td></tr>';
    }).join('');
    var marcas = s.marcas.map(function (m, i) { return '<div class="setting"><div><b>' + esc(m.nombre) + '</b><span class="d">' + (m.id === 'propia' || m.id === 'manantial' ? 'Marca del distribuidor' : 'Envase de otra envasadora') + '</span></div><label class="switch"><input type="checkbox" data-chg="cat.marca" data-i="' + i + '" ' + (m.acepta ? 'checked' : '') + (m.id === 'propia' || m.id === 'manantial' ? ' disabled' : '') + X.solo('envases_cfg') + '><i></i></label></div>'; }).join('');
    return head('Catálogo y precios', 'Productos, precios con historial, tipos de envase con su garantía y marcas de envase que se aceptan.') +
      '<div class="tbl-wrap"' + rf('RF-CAT-01') + '><table><thead><tr><th>Producto</th><th class="right">Precio vigente</th><th>Envase</th><th>Vigente</th><th></th></tr></thead><tbody>' + prods + '</tbody></table></div><p class="mut mt-s" style="font-size:13px">Un cambio de precio no altera los pedidos ya confirmados: el precio queda fijo al confirmar (RN-06). Los precios de este prototipo son de ejemplo.</p>' +
      '<div class="grid2 mt-l"><div><h2 style="font-size:17px;margin-bottom:10px">Tipos de envase y garantía</h2><div class="tbl-wrap"' + rf('RF-CAT-02') + '><table><thead><tr><th>Envase</th><th>Productos</th><th class="right">Garantía</th></tr></thead><tbody>' + envs + '</tbody></table></div></div>' +
      '<div><h2 style="font-size:17px;margin-bottom:10px">Marcas de envase aceptadas</h2><div class="panel"' + rf('RF-CAT-03') + '><div class="panel-b">' + marcas + '</div></div><div class="note warn mt-s" style="font-size:12.5px">La norma de locales de venta multimarca de Osinergmin sigue en trámite: su publicación final está por confirmar. Esta opción solo prepara el registro de envases de otras marcas.</div></div></div>';
  };
  App.acts['cat.hist'] = function (el) {
    var s = S(), p = s.productos[el.dataset.p], h = s.precioHist[el.dataset.p];
    UI.modal({ title: 'Historial de ' + esc(p.nombre), body: '<div class="tbl-wrap"><table><thead><tr><th>Vigente desde</th><th class="right">Precio</th></tr></thead><tbody>' + h.slice().reverse().map(function (x) { return '<tr><td>' + U.dmy(x.fecha) + '</td><td class="right num">' + U.money(x.precio) + '</td></tr>'; }).join('') + '</tbody></table></div>', actions: [{ label: 'Cerrar', kind: 'btn-primary' }] });
  };
  App.acts['cat.precio'] = function (el) {
    if (X.deny('precios')) return;
    var s = S(), p = s.productos[el.dataset.p];
    UI.modal({ title: 'Cambiar el precio de ' + esc(p.corto), body: '<div class="field"><label>Precio nuevo (S/)</label><input class="input" name="v" type="number" step="0.5" min="1" value="' + p.precio + '"></div><div class="note">Los pedidos ya confirmados conservan su precio. Los pedidos por confirmar se recalculan al confirmarlos (RN-06).</div>', actions: [{ label: 'Cancelar' }, { label: 'Guardar precio', kind: 'btn-primary', onClick: function (m) { var v = +m.val('v'); if (!(v > 0)) { UI.toast('Ingrese un precio válido.', 'bad'); return false; } srv.audit('Cambió precio', p.corto + ': ' + U.money(p.precio) + ' a ' + U.money(v)); p.precio = v; s.precioHist[el.dataset.p].push({ fecha: s.hoy, precio: v }); UI.toast('Precio actualizado', 'ok'); App.render(); } }] });
  };
  App.chg['cat.gar'] = function (el) { if (X.deny('envases_cfg')) { App.render(); return; } S().envases[el.dataset.e].garantia = Math.max(0, +el.value); srv.audit('Cambió la garantía', el.dataset.e + ' = ' + el.value); UI.toast('Garantía actualizada', 'ok'); };
  App.chg['cat.marca'] = function (el) { if (X.deny('envases_cfg')) { App.render(); return; } S().marcas[+el.dataset.i].acepta = el.checked; srv.audit('Cambió marcas aceptadas', S().marcas[+el.dataset.i].nombre + ': ' + el.checked); };

  /* =====================================================
     Libro de envases (RF-ENV-01 a 06, RN-05)
     ===================================================== */
  X.pages.envases = function (sub) {
    sub = sub || 'saldo';
    var s = S();
    var T = [['saldo', 'Saldo por hogar'], ['vehiculos', 'Vehículos'], ['inventario', 'Inventario del local'], ['conteo', 'Conteo semanal'], ['garantias', 'Garantías', 'RF-ENV-05'], ['riesgo', 'En riesgo', 'RF-ENV-06'], ['mov', 'Movimientos']];
    var body = ({ saldo: envSaldo, vehiculos: envVeh, inventario: envInv, conteo: envConteo, garantias: envGar, riesgo: envRiesgo, mov: envMov }[sub] || envSaldo)();
    return head('Libro de envases', 'Cuántos balones y bidones tiene cada hogar, cada vehículo y el local. El saldo es una suma de movimientos: no se edita, se corrige con un movimiento nuevo.') + UI.tabs(T, sub, 's2/envases') + body;
  };
  function valor(h) { var s = S(); return Object.keys(h.envSaldo).reduce(function (a, k) { return a + h.envSaldo[k] * s.envases[k].garantia; }, 0); }
  function envSaldo() {
    return '<div ' + rf('RF-ENV-01') + '>' + UI.table('envs', { rows: function () { return S().hogares.filter(function (h) { return Object.keys(h.envSaldo).some(function (k) { return h.envSaldo[k] > 0; }); }); }, rowId: function (r) { return r.id; }, rowAct: 'hog.ver', search: function (r) { return r.nombre + r.id; }, pageSize: 12, cols: [
      { label: 'Hogar', render: function (r) { return '<b>' + esc(r.nombre) + '</b><span class="sub">' + r.id + '</span>'; }, sort: function (r) { return r.nombre; } },
      { label: 'Envases prestados', render: function (r) { return Object.keys(r.envSaldo).filter(function (k) { return r.envSaldo[k] > 0; }).map(function (k) { return r.envSaldo[k] + ' × ' + esc(S().envases[k].nombre); }).join(', '); } },
      { label: 'Valorizado en garantías', align: 'right', render: function (r) { return U.money(valor(r)); }, sort: valor },
      { label: 'Garantía en poder', align: 'right', render: function (r) { return U.money(r.garantia); } }
    ] }) + '</div>';
  }
  function envVeh() {
    var s = S();
    return '<div class="grid2">' + ['U-R1', 'U-R2'].map(function (id) {
      var j = srv.jornada(id), r = srv.resumenJornada(j), u = s.usuarios.filter(function (x) { return x.id === id; })[0];
      return '<div class="panel"' + rf('RF-ENV-02') + '><div class="panel-h"><h3>' + esc(u.nombre) + ', ' + esc(u.vehiculo) + '</h3>' + (j.estado === 'cuadrada' ? UI.pill('ok', 'Cuadrada') : j.cierreApp ? UI.pill('warn', 'Jornada cerrada en la app') : UI.pill('info', 'En ruta')) + '</div><div class="panel-b"><div class="tbl-wrap"><table><thead><tr><th>Envase</th><th class="right">Carga</th><th class="right">Entregados</th><th class="right">Llenos que vuelven</th></tr></thead><tbody>' + Object.keys(j.carga.llenos).map(function (k) { return '<tr><td>' + esc(s.envases[k].nombre) + '</td><td class="right">' + j.carga.llenos[k] + '</td><td class="right">' + (r.llenosEnt[k] || 0) + '</td><td class="right"><b>' + r.esperLlenos[k] + '</b></td></tr>'; }).join('') + '</tbody></table></div><p class="mut mt-s" style="font-size:13px">Vacíos recogidos: <b>' + Object.keys(r.vaciosRec).reduce(function (a, k) { return a + r.vaciosRec[k]; }, 0) + '</b>. Saldo = carga − entregados + recogidos.</p></div></div>';
    }).join('') + '</div>';
  }
  function envInv() {
    var s = S();
    return '<div class="tbl-wrap"' + rf('RF-ENV-03') + '><table><thead><tr><th>Envase</th><th class="right">Llenos</th><th class="right">Vacíos propios</th><th>Vacíos de otras marcas</th></tr></thead><tbody>' + Object.keys(s.inventario).map(function (k) { var inv = s.inventario[k], propia = Object.keys(inv.vacios).filter(function (m) { return m === 'propia' || m === 'manantial'; }).reduce(function (a, m) { return a + inv.vacios[m]; }, 0); var otras = Object.keys(inv.vacios).filter(function (m) { return m !== 'propia' && m !== 'manantial'; }).map(function (m) { var mm = s.marcas.filter(function (x) { return x.id === m; })[0]; return inv.vacios[m] + ' ' + esc(mm ? mm.nombre : m); }); return '<tr><td><b>' + esc(s.envases[k].nombre) + '</b></td><td class="right num">' + inv.llenos + '</td><td class="right num">' + propia + '</td><td>' + (otras.join(', ') || '<span class="mut">Ninguno</span>') + '</td></tr>'; }).join('') + '</tbody></table></div>';
  }
  function libro(k) { var inv = S().inventario[k]; return inv.llenos + Object.keys(inv.vacios).reduce(function (a, m) { return a + inv.vacios[m]; }, 0); }
  function envConteo() {
    var s = S();
    var rows = Object.keys(s.inventario).map(function (k) {
      return '<tr><td><b>' + esc(s.envases[k].nombre) + '</b></td><td class="right num">' + libro(k) + '</td><td class="right"><input class="input sm" style="width:90px;text-align:right" type="number" min="0" value="' + libro(k) + '" data-conteo="' + k + '"></td></tr>';
    }).join('');
    var hist = s.conteos.map(function (c) { return '<tr><td>' + c.fecha + '</td><td>' + esc(c.env) + '</td><td class="right">' + c.libro + '</td><td class="right">' + c.contado + '</td><td class="right ' + (c.pct <= 2 ? 'diff0' : 'diffn') + '">' + c.pct.toFixed(1) + '%</td><td>' + esc(c.motivo) + '</td></tr>'; }).join('');
    return '<div class="grid-main"><div class="panel"' + rf('RF-ENV-04') + '><div class="panel-h"><h3>Conteo físico de la semana</h3><button class="btn btn-primary btn-sm" data-act="env.contar">Comparar con el libro</button></div><div class="panel-b"><p class="mut">Cuente todo lo que hay en el local (llenos y vacíos). La meta es una diferencia de 2% o menos al cierre de la semana.</p><div class="tbl-wrap"><table><thead><tr><th>Envase</th><th class="right">Según el libro</th><th class="right">Contado</th></tr></thead><tbody>' + rows + '</tbody></table></div></div></div><div class="panel"><div class="panel-h"><h3>Conteos anteriores</h3></div><div class="panel-b">' + (hist ? '<div class="tbl-wrap"><table><thead><tr><th>Fecha</th><th>Envase</th><th class="right">Libro</th><th class="right">Contado</th><th class="right">Dif.</th><th>Motivo</th></tr></thead><tbody>' + hist + '</tbody></table></div>' : '<p class="mut" style="margin:0">Todavía no hay conteos.</p>') + '</div></div></div>';
  }
  App.acts['env.contar'] = function () {
    var s = S(), res = [];
    document.querySelectorAll('[data-conteo]').forEach(function (i) { var k = i.dataset.conteo, l = libro(k), c = +i.value, pct = l ? Math.abs(c - l) / l * 100 : 0; res.push({ k: k, l: l, c: c, pct: pct }); });
    var bad = res.filter(function (r) { return r.c !== r.l; });
    var body = '<div class="tbl-wrap"><table><thead><tr><th>Envase</th><th class="right">Libro</th><th class="right">Contado</th><th class="right">Diferencia</th></tr></thead><tbody>' + res.map(function (r) { return '<tr><td>' + esc(s.envases[r.k].nombre) + '</td><td class="right">' + r.l + '</td><td class="right">' + r.c + '</td><td class="right ' + (r.pct <= 2 ? 'diff0' : 'diffn') + '">' + (r.c - r.l) + ' (' + r.pct.toFixed(1) + '%)</td></tr>'; }).join('') + '</tbody></table></div>';
    if (!bad.length) { UI.modal({ title: 'Conteo semanal', body: body + '<div class="note ok mt-s">El conteo coincide con el libro: no hay nada que ajustar.</div>', actions: [{ label: 'Cerrar', kind: 'btn-primary' }] }); return; }
    var can = X.can('ajustar_env');
    UI.modal({ title: 'Conteo semanal', body: body + '<div class="field mt-s"><label>Motivo del ajuste</label><input class="input" name="m" placeholder="Ej.: envases devueltos sin registrar"' + (can ? '' : ' disabled') + '></div>' + (can ? '' : '<div class="note warn">Solo el dueño puede ajustar el libro. El ajuste siempre es un movimiento nuevo con motivo.</div>'), actions: [{ label: 'Cerrar' }, { label: 'Registrar ajuste', kind: 'btn-primary', onClick: function (m) {
      if (X.deny('ajustar_env')) return false;
      if (!m.val('m').trim()) { UI.toast('Escriba el motivo del ajuste.', 'bad'); return false; }
      bad.forEach(function (r) { var inv = s.inventario[r.k], d = r.c - r.l; inv.vacios.propia = (inv.vacios.propia || inv.vacios.manantial || 0) + d; if (r.k === 'BID20') { inv.vacios.manantial = (inv.vacios.manantial || 0); } s.conteos.unshift({ fecha: U.dmy(s.hoy), env: s.envases[r.k].nombre, libro: r.l, contado: r.c, pct: r.pct, motivo: m.val('m') }); });
      srv.audit('Ajustó el libro de envases', bad.length + ' tipo(s): ' + m.val('m')); UI.toast('Ajuste registrado como movimiento nuevo', 'ok'); App.render();
    } }] });
  };
  function envGar() {
    var s = S();
    var c = 0, d = 0;
    s.movEnv.forEach(function (m) { if (m.garantia) { if (m.garantia.tipo === 'cobrada') c += m.garantia.monto; else d += m.garantia.monto; } });
    return '<div class="kpis" style="--n:3;margin-bottom:16px"><div class="kpi"><div class="l">Garantías cobradas hoy</div><div class="v">' + U.money(c) + '</div></div><div class="kpi"><div class="l">Devueltas hoy</div><div class="v">' + U.money(d) + '</div></div><div class="kpi"><div class="l">En poder del negocio</div><div class="v">' + U.money(s.hogares.reduce(function (a, h) { return a + h.garantia; }, 0)) + '</div></div></div>' +
      '<div ' + rf('RF-ENV-05') + '>' + UI.table('gar', { rows: function () { return S().hogares.filter(function (h) { return h.garantia > 0; }); }, rowId: function (r) { return r.id; }, rowAct: 'hog.ver', cols: [{ label: 'Hogar', render: function (r) { return '<b>' + esc(r.nombre) + '</b>'; } }, { label: 'Garantía en poder', align: 'right', render: function (r) { return U.money(r.garantia); } }], empty: 'Todavía no se cobraron garantías. Se registran desde la entrega en la app del repartidor.' }) + '</div>';
  }
  function envRiesgo() {
    var s = S();
    var rows = s.hogares.filter(function (h) { return valor(h) > 0 && h.productos[0]; }).map(function (h) { var e = est.estimar(h, h.productos[0].p); return { h: h, e: e, dias: e.last ? U.diff(s.hoy, e.last) : 0, val: valor(h) }; }).filter(function (r) { return r.dias > 20; }).sort(function (a, b) { return b.val - a.val; });
    return '<div class="note" style="margin-bottom:14px"' + rf('RF-ENV-06') + '>Hogares con envases prestados que no compran hace más de 20 días. Valorizados con la garantía de cada envase: es plata que no ha vuelto.</div><div class="kpis" style="--n:2;margin-bottom:16px"><div class="kpi"><div class="l">Hogares en riesgo</div><div class="v">' + rows.length + '</div></div><div class="kpi"><div class="l">Envases en riesgo, valorizados</div><div class="v">' + U.money(rows.reduce(function (a, r) { return a + r.val; }, 0)) + '</div></div></div><div class="tbl-wrap"><table><thead><tr><th>Hogar</th><th>Envases</th><th class="right">Días sin comprar</th><th class="right">Valor</th></tr></thead><tbody>' + (rows.slice(0, 14).map(function (r) { return '<tr class="click" data-act="hog.ver" data-id="' + r.h.id + '"><td><b>' + esc(r.h.nombre) + '</b><span class="sub">' + esc(r.h.tel) + '</span></td><td>' + Object.keys(r.h.envSaldo).filter(function (k) { return r.h.envSaldo[k] > 0; }).map(function (k) { return r.h.envSaldo[k] + ' ' + esc(s.envases[k].nombre); }).join(', ') + '</td><td class="right ' + (r.dias > 40 ? 'dn' : '') + '">' + r.dias + '</td><td class="right num">' + U.money(r.val) + '</td></tr>'; }).join('') || '<tr><td colspan="4" class="tbl-empty">No hay hogares en riesgo.</td></tr>') + '</tbody></table></div>';
  }
  function envMov() {
    var s = S();
    return '<div ' + rf('RF-ENV-01') + '>' + UI.table('mov', { rows: function () { return S().movEnv.slice().reverse(); }, rowId: function (r) { return r.id; }, search: function (r) { return X.nombre(r.hogarId) + r.envase; }, cols: [
      { label: 'Movimiento', render: function (r) { return '<b>' + r.id + '</b><span class="sub">' + r.ts.slice(11) + '</span>'; } },
      { label: 'Hogar', render: function (r) { return esc(X.nombre(r.hogarId)); } },
      { label: 'Envase', render: function (r) { return esc(s.envases[r.envase].nombre); } },
      { label: 'Llenos entregados', align: 'right', render: function (r) { return r.llenos; } },
      { label: 'Vacíos recogidos', align: 'right', render: function (r) { return r.vacios; } },
      { label: 'Marca', render: function (r) { return esc(r.marca); } },
      { label: 'Nota', render: function (r) { return r.sinPrestamo ? UI.pill('warn', 'Recibido sin préstamo (' + r.sinPrestamo + ')', 'alert') : r.garantia ? UI.pill('info', 'Garantía ' + r.garantia.tipo) : ''; } }
    ], empty: 'Los movimientos aparecen cuando el repartidor sincroniza sus entregas.' }) + '</div>';
  }

  /* =====================================================
     Cobros (RF-COB-01 a 05)
     ===================================================== */
  X.pages.cobros = function (sub) {
    sub = sub || 'hoy';
    var s = S(), nv = s.cobros.filter(function (c) { return c.estado === 'por_verificar' && !c.anulado; }).length;
    var T = [['hoy', 'Cobros de hoy'], ['verificar', 'Por verificar', 'RF-COB-02', nv], ['fiado', 'Fiado', 'RF-COB-04'], ['pasarela', 'Enlaces de pago', 'RF-COB-03']];
    var body = ({ hoy: cobHoy, verificar: cobVer, fiado: cobFiado, pasarela: cobPas }[sub] || cobHoy)();
    return head('Cobros', 'Cada cobro es un evento que no se edita: si hay un error, se anula con un contra-asiento y queda el rastro.') + UI.tabs(T, sub, 's2/cobros') + body;
  };
  function cobHoy() {
    return '<div ' + rf('RF-COB-01') + '>' + UI.table('cob', { rows: function () { return S().cobros.slice().reverse(); }, rowId: function (r) { return r.id; }, rowAct: 'cob.ver', search: function (r) { return r.id + X.nombre(r.hogarId); }, pageSize: 10, filters: [{ k: 'm', label: 'Medio', options: [['efectivo', 'Efectivo'], ['qr_negocio', 'QR del negocio'], ['enlace', 'Enlace de pago'], ['fiado', 'Fiado'], ['abono', 'Abono']], test: function (r, v) { return r.medio === v; } }], cols: [
      { label: 'Cobro', render: function (r) { return '<b>' + r.id + '</b><span class="sub">' + (r.ts || '').slice(11) + '</span>'; } },
      { label: 'Hogar', render: function (r) { return esc(X.nombre(r.hogarId)); } },
      { label: 'Medio', render: function (r) { return UI.medio(r.medio); } },
      { label: 'Monto', align: 'right', render: function (r) { return '<span class="num ' + (r.monto < 0 ? 'dn' : '') + '">' + U.money(r.monto) + '</span>'; }, sort: function (r) { return r.monto; } },
      { label: 'Estado', render: function (r) { return UI.estadoCobro(r); } },
      { label: 'Repartidor', render: function (r) { return r.userId ? esc(App.nombreUsuario(r.userId)) : '—'; } }
    ] }) + '</div>';
  }
  App.acts['cob.ver'] = function (el) {
    var c = S().cobros.filter(function (x) { return x.id === el.dataset.id; })[0];
    var acts = [{ label: 'Cerrar' }];
    if (!c.anulado && !c.contra && c.medio !== 'abono') acts.push({ label: 'Anular cobro', kind: 'btn-danger', onClick: function () { if (X.deny('anular')) return false; setTimeout(function () { anular(c); }, 0); } });
    UI.modal({ title: 'Cobro ' + c.id, body: '<dl class="kv"><dt>Medio</dt><dd>' + UI.medio(c.medio) + '</dd><dt>Monto</dt><dd><b>' + U.money(c.monto) + '</b>' + (c.recibido ? ' (pagó con ' + U.money(c.recibido) + ', vuelto ' + U.money(c.vuelto) + ')' : '') + '</dd><dt>Estado</dt><dd>' + UI.estadoCobro(c) + '</dd><dt>Hogar</dt><dd>' + esc(X.nombre(c.hogarId)) + '</dd><dt>Pedido</dt><dd>' + (c.pedidoId || '—') + '</dd><dt>Repartidor</dt><dd>' + (c.userId ? esc(App.nombreUsuario(c.userId)) : '—') + '</dd><dt>Identificador</dt><dd class="num">' + (c.uuid || 'creado en el portal') + '</dd></dl><div class="note mt-s" ' + rf('RF-COB-05') + '>El cobro es un evento de solo inserción. Para corregirlo se anula con un contra-asiento; no se edita.</div>' + (c.motivoAnulacion ? '<div class="note warn mt-s">Anulado: ' + esc(c.motivoAnulacion) + '</div>' : ''), actions: acts });
  };
  function anular(c) {
    UI.modal({ title: 'Anular cobro ' + c.id, body: '<div class="field"><label>Motivo de la anulación</label><input class="input" name="m" placeholder="Ej.: cobro duplicado"></div><div class="note">Se crea un contra-asiento por ' + U.money(-c.monto) + '. El cobro original queda visible, tachado.</div>', actions: [{ label: 'Cancelar' }, { label: 'Anular', kind: 'btn-danger', onClick: function (m) { if (!m.val('m').trim()) { UI.toast('Escriba el motivo.', 'bad'); return false; } srv.anularCobro(c, m.val('m')); UI.toast('Cobro anulado con contra-asiento', 'ok'); App.render(); } }] });
  }
  function cobVer() {
    var s = S(), list = s.cobros.filter(function (c) { return c.estado === 'por_verificar' && !c.anulado; });
    var perm = X.can('verificar');
    return (perm ? '' : '<div class="note warn" style="margin-bottom:14px">' + ic('lock', 15) + ' El dueño no habilitó al despachador para verificar cobros. Cambie a «Dueño» o active el permiso en <a href="#/s2/equipo">Equipo y seguridad</a>.</div>') + '<div class="note" style="margin-bottom:14px"' + rf('RF-COB-02') + '>Pagos al Yape o Plin del negocio que el repartidor registró. Ningún cobro digital cuenta como verificado hasta que alguien lo confirme contra el historial de la billetera.</div>' +
      '<div class="tbl-wrap"><table><thead><tr><th>Cobro</th><th>Hogar</th><th>Repartidor</th><th class="right">Monto</th><th></th></tr></thead><tbody>' + (list.map(function (c) { var cu = srv.cuadre(srv.jornada(c.userId)); return '<tr><td><b>' + c.id + '</b><span class="sub">' + (c.ts || '').slice(11) + '</span></td><td>' + esc(X.nombre(c.hogarId)) + '</td><td>' + esc(App.nombreUsuario(c.userId)) + '</td><td class="right num"><b>' + U.money(c.monto) + '</b></td><td class="right">' + (cu.noEncontrados[c.id] ? UI.pill('bad', 'No encontrado', 'x') : '<button class="btn btn-sm btn-primary" data-act="cob.verificar" data-id="' + c.id + '">Confirmar</button> <button class="btn btn-sm" data-act="cob.noenc" data-id="' + c.id + '">No lo veo</button>') + '</td></tr>'; }).join('') || '<tr><td colspan="5" class="tbl-empty">No hay cobros por verificar.</td></tr>') + '</tbody></table></div>';
  }
  App.acts['cob.verificar'] = function (el) { if (X.deny('verificar')) return; var c = S().cobros.filter(function (x) { return x.id === el.dataset.id; })[0]; srv.cuadre(srv.jornada(c.userId)).verificados[c.id] = true; srv.verificarCobro(c); UI.toast('Cobro verificado', 'ok'); App.render(); };
  App.acts['cob.noenc'] = function (el) { if (X.deny('verificar')) return; var c = S().cobros.filter(function (x) { return x.id === el.dataset.id; })[0]; srv.cuadre(srv.jornada(c.userId)).noEncontrados[c.id] = true; srv.audit('Marcó cobro no encontrado', c.id + ' ' + U.money(c.monto)); UI.toast('Marcado como no encontrado: aparecerá como diferencia en el cuadre.', 'info'); App.render(); };
  function cobFiado() {
    var s = S(), lim = s.config.limiteFiado;
    return '<div class="note" style="margin-bottom:14px"' + rf('RF-COB-04') + '>Deuda por hogar con abonos y un límite configurable de ' + U.money(lim) + '. La app del repartidor no permite fiar por encima del límite.</div>' + UI.table('fiado', { rows: function () { return S().hogares.filter(function (h) { return h.deuda > 0; }); }, rowId: function (r) { return r.id; }, cols: [
      { label: 'Hogar', render: function (r) { return '<b>' + esc(r.nombre) + '</b><span class="sub">' + esc(r.tel) + '</span>'; } },
      { label: 'Deuda', align: 'right', render: function (r) { return '<b class="dn num">' + U.money(r.deuda) + '</b>'; }, sort: function (r) { return r.deuda; } },
      { label: 'Uso del límite', render: function (r) { return '<div class="meter" style="width:120px"><i style="width:' + Math.min(100, r.deuda / lim * 100) + '%;background:' + (r.deuda / lim > 0.8 ? 'var(--bad)' : 'var(--series-1)') + '"></i></div><span class="sub">' + Math.round(r.deuda / lim * 100) + '%</span>'; } },
      { label: '', nosort: true, align: 'right', render: function (r) { return '<button class="btn btn-sm btn-primary" data-act="cob.abono" data-id="' + r.id + '">Registrar abono</button>'; } }
    ], empty: 'No hay hogares con deuda.' });
  }
  App.acts['cob.abono'] = function (el) {
    var h = hg(el.dataset.id);
    UI.modal({ title: 'Abono de ' + esc(h.nombre), body: '<p>Deuda actual: <b>' + U.money(h.deuda) + '</b></p><div class="field"><label>Monto del abono (S/)</label><input class="input" name="m" type="number" min="1" max="' + h.deuda + '" value="' + h.deuda + '"></div>', actions: [{ label: 'Cancelar' }, { label: 'Registrar abono', kind: 'btn-primary', onClick: function (m) { var v = +m.val('m'); if (!(v > 0) || v > h.deuda) { UI.toast('Ingrese un monto entre 1 y la deuda.', 'bad'); return false; } srv.abonar(h, v); UI.toast('Abono registrado', 'ok'); App.render(); } }] });
  };
  function cobPas() {
    var s = S();
    return '<div class="note" style="margin-bottom:14px"' + rf('RF-COB-03') + '>El hogar paga con Yape desde su propio celular en una página de pago. La app del repartidor no captura datos de Yape. Los cargos se ven aquí y en <a href="#/s3/pagos">S3, Pagos</a>.</div><div class="tbl-wrap"><table><thead><tr><th>Cargo</th><th>Pedido</th><th>Celular</th><th class="right">Monto</th><th>Pasarela</th><th>Estado</th></tr></thead><tbody>' + (s.pagos.slice().reverse().map(function (p) { return '<tr><td><b>' + p.id + '</b><span class="sub">' + p.ts.slice(11) + '</span></td><td>' + p.pedidoId + '</td><td>' + p.celular + '</td><td class="right num">' + U.money(p.monto) + '</td><td>' + esc(p.pasarela) + '</td><td>' + UI.pill('ok', 'Pagado', 'check') + '</td></tr>'; }).join('') || '<tr><td colspan="6" class="tbl-empty">Todavía no hay pagos con enlace.</td></tr>') + '</tbody></table></div><div class="row mt"><a class="btn" href="#/s3/pagos">Abrir el simulador de la página de pago</a></div>';
  }

  /* =====================================================
     Cuadre (RF-CUA-01 a 05, RN-07)
     ===================================================== */
  X.pages.cuadre = function (sub) {
    if (sub) { var j = S().jornadas.filter(function (x) { return x.id === sub; })[0]; if (j && !j.historico) return cuadreDetalle(j); }
    return cuadreLista();
  };
  function estadoJ(j) { return j.estado === 'cuadrada' ? UI.pill('ok', 'Cuadrada', 'check') : j.cierreApp ? UI.pill('warn', 'Lista para cuadrar', 'ledger') : UI.pill('info', 'En ruta', 'truck'); }
  function cuadreLista() {
    var s = S();
    var hoy = s.jornadas.filter(function (j) { return j.fecha === s.hoy; });
    var hist = s.jornadas.filter(function (j) { return j.historico; }).sort(function (a, b) { return a.fecha < b.fecha ? -1 : 1; });
    var porDia = {};
    hist.forEach(function (j) { var d = j.historico; porDia[j.fecha] = (porDia[j.fecha] || 0) + (d.real - d.esperado); });
    var cols = Object.keys(porDia).map(function (f) { return { label: U.dm(f), value: Math.abs(porDia[f]), tip: U.dmy(f) + ': diferencia de ' + U.money(porDia[f]), color: porDia[f] < 0 ? C.SER[1] : C.SER[2] }; });
    var durs = hist.map(function (j) { return j.historico.dur; }), durProm = durs.reduce(function (a, b) { return a + b; }, 0) / (durs.length || 1);
    return head('Cuadre', 'Compare lo que el repartidor dice que cobró y entregó con lo que usted recibe. Un cuadre solo se cierra cuando la jornada terminó y no queda nada pendiente de sincronizar.') +
      '<div class="kpis" style="--n:3;margin-bottom:20px"><div class="kpi"><div class="l">Jornadas de hoy</div><div class="v">' + hoy.length + '</div><div class="d">' + hoy.filter(function (j) { return j.estado === 'cuadrada'; }).length + ' cuadradas</div></div><div class="kpi" data-rf="RF-CUA-05"><div class="l">Tiempo medio de cuadre</div><div class="v">' + durProm.toFixed(1) + '<small>min</small></div><div class="d">Línea base en papel: 45 min [H], meta: bajar 50% o más</div></div><div class="kpi"><div class="l">Diferencia acumulada, últimos días</div><div class="v ' + (Object.keys(porDia).reduce(function (a, f) { return a + porDia[f]; }, 0) < 0 ? 'dn' : '') + '">' + U.money(Object.keys(porDia).reduce(function (a, f) { return a + porDia[f]; }, 0)) + '</div></div></div>' +
      '<div class="tbl-wrap"><table><thead><tr><th>Jornada</th><th>Repartidor</th><th class="right">Entregas</th><th class="right">Cobrado</th><th>Estado</th><th></th></tr></thead><tbody>' + hoy.map(function (j) { var r = srv.resumenJornada(j), u = s.usuarios.filter(function (x) { return x.id === j.userId; })[0]; return '<tr class="click" data-act="cua.abrir" data-id="' + j.id + '"><td><b>' + U.dmy(j.fecha) + '</b><span class="sub">' + j.id + '</span></td><td>' + esc(u.nombre) + '<span class="sub">' + esc(u.vehiculo) + '</span></td><td class="right">' + r.entregas + '</td><td class="right num">' + U.money(r.total) + '</td><td>' + estadoJ(j) + '</td><td class="right"><button class="btn btn-sm ' + (j.cierreApp && j.estado !== 'cuadrada' ? 'btn-primary' : '') + '">' + (j.estado === 'cuadrada' ? 'Ver' : 'Abrir') + '</button></td></tr>'; }).join('') + '</tbody></table></div>' +
      '<div class="grid2 mt-l"><div class="panel"><div class="panel-b">' + C.card({ title: 'Diferencia de caja por día', sub: 'En soles, valor absoluto. Naranja: faltó dinero; verde: sobró.', body: C.columns(cols, { aria: 'Diferencia de caja por día', showAll: true, h: 160 }), table: { cols: ['Día', 'Diferencia'], rows: Object.keys(porDia).map(function (f) { return [U.dmy(f), U.money(porDia[f])]; }) }, legend: C.legend([{ label: 'Faltó dinero', color: C.SER[1] }, { label: 'Sobró dinero', color: C.SER[2] }]), note: 'Datos simulados de días anteriores.' }) + '</div></div>' +
      '<div><h2 style="font-size:17px;margin-bottom:10px">Cuadres anteriores</h2><div class="tbl-wrap"><table><thead><tr><th>Día</th><th>Repartidor</th><th class="right">Diferencia</th><th class="right">Duración</th></tr></thead><tbody>' + hist.slice().reverse().map(function (j) { var d = j.historico, dif = d.real - d.esperado; return '<tr><td>' + U.dm(j.fecha) + '</td><td>' + esc(App.nombreUsuario(j.userId)) + (d.motivo ? '<span class="sub">' + esc(d.motivo) + '</span>' : '') + '</td><td class="right ' + (dif ? 'diffn' : 'diff0') + '">' + U.money(dif) + '</td><td class="right">' + d.dur + ' min</td></tr>'; }).join('') + '</tbody></table></div></div></div>';
  }
  App.acts['cua.abrir'] = function (el) { App.go('#/s2/cuadre/' + el.dataset.id); };
  function cuadreDetalle(j) {
    var s = S(), r = srv.resumenJornada(j), cu = srv.cuadre(j), u = s.usuarios.filter(function (x) { return x.id === j.userId; })[0], dv = s.dispositivos[j.userId];
    if (!cu.inicioMs && !cu.cerrado) cu.inicioMs = Date.now();
    var perm = X.can('verificar'), cerrado = cu.cerrado, dis = (perm && !cerrado) ? '' : ' disabled';
    var bl = srv.bloqueos(j), dif = srv.diferencias(j);
    var qr = s.cobros.filter(function (c) { return c.jornadaId === j.id && c.medio === 'qr_negocio' && !c.anulado && !c.contra; });
    var qrVer = qr.filter(function (c) { return c.estado === 'verificado'; }).reduce(function (a, c) { return a + c.monto; }, 0);
    var enl = s.cobros.filter(function (c) { return c.jornadaId === j.id && c.medio === 'enlace' && !c.anulado && !c.contra; });
    var enlVer = enl.filter(function (c) { return c.estado === 'verificado'; }).reduce(function (a, c) { return a + c.monto; }, 0);
    var efReal = cu.efectivoContado;
    var fila = function (lbl, esp, real, nota, extra) { var dd = real == null ? null : Math.round((real - esp) * 100) / 100; return '<tr><td><b>' + lbl + '</b>' + (nota ? '<span class="sub">' + nota + '</span>' : '') + '</td><td class="right num">' + U.money(esp) + '</td><td class="right">' + (extra || (real == null ? '<span class="mut">Pendiente</span>' : '<span class="num">' + U.money(real) + '</span>')) + '</td><td class="right num ' + (dd == null ? 'mut' : dd === 0 ? 'diff0' : 'diffn') + '">' + (dd == null ? '—' : U.money(dd)) + '</td></tr>'; };
    var efIn = '<input class="input sm" style="width:110px;text-align:right" type="number" step="0.5" min="0" value="' + (efReal == null ? '' : efReal) + '" placeholder="Contar" data-chg="cua.ef" data-j="' + j.id + '"' + dis + '>';
    var ledger = '<div class="ledger"' + rf('RF-CUA-01') + '><table><thead><tr><th>Medio de pago</th><th class="right">Esperado según la app</th><th class="right">Recibido o verificado</th><th class="right">Diferencia</th></tr></thead><tbody>' +
      fila('Efectivo', r.by.efectivo.monto, efReal, r.by.efectivo.n + ' cobros. Cuente el efectivo que entrega el repartidor.', efIn) +
      fila('QR del negocio', r.by.qr_negocio.monto, qrVer, qr.length + ' cobros. Verifique cada uno contra el historial de la billetera.') +
      fila('Enlace de pago', r.by.enlace.monto, enlVer, 'Se verifica solo con la confirmación de la pasarela.') +
      fila('Fiado', r.by.fiado.monto, r.by.fiado.monto, 'No entra dinero: queda como deuda del hogar.') +
      '</tbody><tfoot><tr><td>Total</td><td class="right num">' + U.money(r.total) + '</td><td></td><td></td></tr></tfoot></table></div>';
    var verList = r.porVerificar.length ? '<div class="panel mt"><div class="panel-h"><h3>Cobros con QR por verificar</h3></div><div class="panel-b">' + r.porVerificar.map(function (c) { return '<div class="row sb" style="padding:7px 0;border-bottom:1px solid var(--line)"><span><b>' + c.id + '</b> ' + esc(X.nombre(c.hogarId)) + ', ' + U.money(c.monto) + '</span>' + (cu.noEncontrados[c.id] ? UI.pill('bad', 'No encontrado', 'x') : '<span class="row" style="gap:6px"><button class="btn btn-sm btn-primary" data-act="cob.verificar" data-id="' + c.id + '"' + dis + '>Confirmar</button><button class="btn btn-sm" data-act="cob.noenc" data-id="' + c.id + '"' + dis + '>No lo veo</button></span>') + '</div>'; }).join('') + '</div></div>' : '';
    var envRows = Object.keys(r.esperLlenos).map(function (k) { var v = cu.envContado['llenos|' + k]; var dd = v == null ? null : v - r.esperLlenos[k]; return '<tr><td><b>' + esc(s.envases[k].nombre) + '</b><span class="sub">Carga ' + j.carga.llenos[k] + ', entregados ' + (r.llenosEnt[k] || 0) + '</span></td><td class="right num">' + r.esperLlenos[k] + '</td><td class="right"><input class="input sm" style="width:80px;text-align:right" type="number" min="0" value="' + (v == null ? '' : v) + '" placeholder="Contar" data-chg="cua.env" data-j="' + j.id + '" data-e="' + k + '"' + dis + '></td><td class="right num ' + (dd == null ? 'mut' : dd === 0 ? 'diff0' : 'diffn') + '">' + (dd == null ? '—' : dd) + '</td></tr>'; }).join('');
    var vac = Object.keys(r.vaciosRec).map(function (k) { var p = k.split('|'); var mm = s.marcas.filter(function (x) { return x.id === p[1]; })[0]; return '<div class="row sb" style="padding:5px 0"><span>' + esc(s.envases[p[0]].nombre) + ' vacíos, ' + esc(mm ? mm.nombre : p[1]) + '</span><b>' + r.vaciosRec[k] + '</b></div>'; }).join('');
    var motivos = dif.filter(function (d) { return d.monto !== 0; }).map(function (d) { return '<div class="field"><label>Motivo de la diferencia: ' + esc(d.label) + ' (' + (d.unidad ? d.monto + ' u' : U.money(d.monto)) + ')</label><input class="input" value="' + esc(cu.motivos[d.key] || '') + '" placeholder="Ej.: vuelto mal dado, cliente dijo «ya pagué»" data-chg="cua.mot" data-j="' + j.id + '" data-k="' + d.key + '"' + dis + '></div>'; }).join('');
    var durTxt = cerrado && cu.duracionSeg != null ? 'Duración del cuadre: ' + Math.floor(cu.duracionSeg / 60) + ' min ' + (cu.duracionSeg % 60) + ' s en este prototipo, frente a 45 min en papel [H].' : 'El tiempo corre desde que abrió esta pantalla.';
    return head('Cuadre de ' + esc(u.nombre), U.dmy(j.fecha) + ', ' + esc(u.vehiculo), '<a class="btn" href="#/s2/cuadre">Volver a la lista</a>') +
      '<div class="row wrap" style="margin-bottom:14px;gap:10px">' + estadoJ(j) + '<span class="mut">Dispositivo ' + dv.id + ': ' + (dv.ultimoContacto ? 'último contacto ' + dv.ultimoContacto.slice(11) + ', ' + dv.pendientesRep + ' pendientes informados' : 'sin contacto') + '</span><span class="mut" ' + rf('RF-CUA-05') + '>' + durTxt + '</span></div>' +
      (cerrado ? '<div class="note ok" style="margin-bottom:14px"' + rf('RF-CUA-03') + '>' + ic('lock', 15) + ' Cuadre cerrado por ' + esc(cu.cerradoPor) + '. No se reabre (RN-07): cualquier ajuste va a la jornada siguiente con referencia a este cuadre.</div>' : (bl.length ? '<div class="note warn" style="margin-bottom:14px"' + rf('RF-CUA-04') + '><b>Cierre provisional.</b> Falta resolver:<ul class="blockers" style="margin-top:6px">' + bl.map(function (b) { return '<li>' + ic('clock', 14) + esc(b) + '</li>'; }).join('') + '</ul></div>' : '<div class="note ok" style="margin-bottom:14px">Todo está sincronizado y resuelto. Puede cerrar el cuadre.</div>')) +
      (!perm && !cerrado ? '<div class="note warn" style="margin-bottom:14px">' + ic('lock', 15) + ' Solo el dueño, o el despachador si el dueño lo habilitó, puede verificar cobros y cerrar el cuadre.</div>' : '') +
      '<div class="grid-main"><div>' + ledger + verList + '<div class="mt-l"><h2 style="font-size:17px;margin-bottom:10px">Envases</h2><div class="ledger"' + rf('RF-CUA-02') + '><table><thead><tr><th>Envase</th><th class="right">Llenos que deben volver</th><th class="right">Contados</th><th class="right">Diferencia</th></tr></thead><tbody>' + (envRows || '<tr><td colspan="4" class="tbl-empty">La carga del vehículo no se registró.</td></tr>') + '</tbody></table></div><div class="panel mt-s"><div class="panel-b">' + (vac || '<span class="mut">Sin vacíos recogidos.</span>') + '</div></div></div></div>' +
      '<div><div class="panel"' + rf('RF-CUA-03') + '><div class="panel-h"><h3>Diferencias y motivos</h3></div><div class="panel-b">' + (motivos || '<p class="mut" style="margin:0">' + (dif.length ? 'No hay diferencias: todo cuadra.' : 'Cuente el efectivo y los envases para ver las diferencias.') + '</p>') + '</div></div>' +
      '<div class="panel mt"><div class="panel-b"><h4>Resumen de la jornada</h4><dl class="kv mt-s" style="grid-template-columns:130px 1fr"><dt>Entregas</dt><dd>' + r.entregas + ' hechas, ' + r.noEnt + ' no entregadas</dd><dt>Total cobrado</dt><dd><b>' + U.money(r.total) + '</b></dd><dt>Efectivo a recibir</dt><dd><b>' + U.money(r.by.efectivo.monto) + '</b></dd></dl>' + (cerrado ? '<button class="btn btn-block mt" data-act="cua.ajuste">Registrar ajuste en la jornada siguiente</button>' : '<button class="btn btn-llama btn-block mt" data-act="cua.cerrar" data-j="' + j.id + '"' + (bl.length || !perm ? ' disabled' : '') + '>' + ic('lock', 16) + 'Cerrar cuadre</button>') + '</div></div></div></div>';
  }
  App.chg['cua.ef'] = function (el) { var j = S().jornadas.filter(function (x) { return x.id === el.dataset.j; })[0]; srv.cuadre(j).efectivoContado = el.value === '' ? null : +el.value; App.render(); };
  App.chg['cua.env'] = function (el) { var j = S().jornadas.filter(function (x) { return x.id === el.dataset.j; })[0]; srv.cuadre(j).envContado['llenos|' + el.dataset.e] = el.value === '' ? null : +el.value; App.render(); };
  App.chg['cua.mot'] = function (el) { var j = S().jornadas.filter(function (x) { return x.id === el.dataset.j; })[0]; srv.cuadre(j).motivos[el.dataset.k] = el.value; App.render(); };
  App.acts['cua.cerrar'] = function (el) {
    if (X.deny('verificar')) return;
    var j = S().jornadas.filter(function (x) { return x.id === el.dataset.j; })[0];
    UI.confirm('Cerrar el cuadre?', 'Una vez cerrado no se reabre (RN-07). Los llenos que vuelven y los vacíos recogidos entran al inventario del local.', 'Cerrar cuadre', 'btn-primary', function () { srv.cerrarCuadre(j); UI.toast('Cuadre cerrado y registrado en la auditoría', 'ok'); App.render(); });
  };
  App.acts['cua.ajuste'] = function () { UI.modal({ title: 'Ajuste en la jornada siguiente', body: '<p class="lead">Un cuadre cerrado no se reabre. Si descubre un error, registre el ajuste en la jornada de mañana con referencia a este cuadre.</p><div class="field"><label>Descripción</label><input class="input" name="d" placeholder="Ej.: faltaron S/ 6 por un vuelto"></div>', actions: [{ label: 'Cancelar' }, { label: 'Registrar', kind: 'btn-primary', onClick: function (m) { srv.audit('Ajuste diferido por cuadre cerrado', m.val('d') || '(sin descripción)'); UI.toast('Ajuste registrado para la jornada siguiente', 'ok'); } }] }); };
})();

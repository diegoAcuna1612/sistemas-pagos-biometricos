/* S4 — Consola SaaS: administración de empresas, planes, uso y soporte. La usa el equipo del producto. */
(function () {
  'use strict';
  var App = window.App, U = App.U, UI = App.UI, C = App.Charts, ic = App.ic, esc = U.esc, rf = App.rf, srv = App.srv;
  var S = function () { return App.S; };
  var P = {}, st = { emp: 'E-001', flags: { 'E-002': { whatsappApi: false, pasarela: false, fiado: false, recurrentes: true, probables: false, glp: false }, 'E-003': { whatsappApi: false, pasarela: false, fiado: false, recurrentes: false, probables: false, glp: false } } };

  var NAV = [['empresas', 'Empresas', 'building'], ['planes', 'Planes y tarifas', 'tag'], ['uso', 'Uso y costos', 'chart'], ['soporte', 'Soporte', 'handshake'], ['funciones', 'Funciones por empresa', 'sliders']];
  App.views.s4 = {
    render: function (r, host) {
      var pg = P[r.page] ? r.page : 'empresas';
      host.innerHTML = '<div class="portal"><aside class="sidebar"><div class="org"><span class="logo" style="background:var(--series-3)">' + ic('cog', 18) + '</span><div><b>Consola SaaS</b><small class="mut">Equipo del producto</small></div></div><nav class="nav">' + NAV.map(function (n) { return '<a href="#/s4/' + n[0] + '" class="' + (pg === n[0] ? 'on' : '') + '">' + ic(n[2], 18) + n[1] + '</a>'; }).join('') + '</nav><div class="who"><small class="mut">El administrador del SaaS no ve los datos de los hogares: solo el alta, el plan, el uso y el soporte.</small><div class="row" style="gap:8px">' + UI.avatar('Administrador SaaS') + '<div><b>Administrador SaaS</b><small style="display:block">Cuenta interna</small></div></div></div></aside><div class="main"><div class="topbar"><span class="date">Consola interna, ' + U.dmy(S().hoy) + '</span>' + UI.pill('mute', 'Datos simulados') + '</div><div class="page">' + P[pg](r.sub) + '</div></div></div>';
    }
  };
  function head(t, s, a) { return '<div class="page-head"><div><h1>' + t + '</h1>' + (s ? '<p>' + s + '</p>' : '') + '</div>' + (a ? '<div class="actions">' + a + '</div>' : '') + '</div>'; }
  var PLANES = { 'Básico': { rep: 3, precio: 59 }, 'Negocio': { rep: 10, precio: 149 } };
  function estadoE(e) { return e === 'activa' ? UI.pill('ok', 'Activa', 'check') : UI.pill('warn', 'En prueba', 'clock'); }

  /* ---------- empresas (RF-SEG-05) ---------- */
  P.empresas = function () {
    var s = S();
    return head('Empresas', 'Cada distribuidor es una empresa con sus propios datos, usuarios y dispositivos.', '<button class="btn btn-primary" data-act="s4.alta"' + rf('RF-SEG-05') + '>' + ic('plus', 16) + 'Dar de alta una empresa</button>') +
      '<div class="kpis" style="--n:3;margin-bottom:18px"><div class="kpi"><div class="l">Empresas</div><div class="v">' + s.empresas.length + '</div></div><div class="kpi"><div class="l">Activas</div><div class="v">' + s.empresas.filter(function (e) { return e.estado === 'activa'; }).length + '</div></div><div class="kpi"><div class="l">Repartidores</div><div class="v">' + s.empresas.reduce(function (a, e) { return a + e.repartidores; }, 0) + '</div></div></div>' +
      UI.table('emp', { rows: function () { return S().empresas; }, rowId: function (r) { return r.id; }, rowAct: 's4.ver', search: function (r) { return r.nombre + r.id; }, cols: [
        { label: 'Empresa', render: function (r) { return '<b>' + esc(r.nombre) + '</b><span class="sub">' + r.id + '</span>'; }, sort: function (r) { return r.nombre; } },
        { label: 'Plan', render: function (r) { return r.plan; } },
        { label: 'Repartidores', align: 'right', render: function (r) { return r.repartidores; } },
        { label: 'Dispositivos', align: 'right', render: function (r) { return r.dispositivos; } },
        { label: 'Estado', render: function (r) { return estadoE(r.estado); } },
        { label: 'Alta', render: function (r) { return U.dmy(r.alta); } },
        { label: 'Último uso', render: function (r) { return r.ult; } }
      ] });
  };
  App.acts['s4.ver'] = function (el) {
    var e = S().empresas.filter(function (x) { return x.id === el.dataset.id; })[0];
    UI.modal({ title: esc(e.nombre), body: '<dl class="kv"><dt>Identificador</dt><dd>' + e.id + '</dd><dt>Plan</dt><dd><select class="select" name="plan"><option' + (e.plan === 'Básico' ? ' selected' : '') + '>Básico</option><option' + (e.plan === 'Negocio' ? ' selected' : '') + '>Negocio</option></select></dd><dt>Repartidores</dt><dd>' + e.repartidores + ' (el plan ' + e.plan + ' admite hasta ' + PLANES[e.plan].rep + ')</dd><dt>Estado</dt><dd>' + estadoE(e.estado) + '</dd><dt>Último uso</dt><dd>' + e.ult + '</dd></dl>', actions: [{ label: 'Cerrar' }, { label: 'Guardar plan', kind: 'btn-primary', onClick: function (m) { e.plan = m.val('plan'); if (e.id === 'E-001') S().empresa.plan = e.plan; srv.audit('Cambió el plan de una empresa', e.nombre + ': ' + e.plan, 'Administrador SaaS'); UI.toast('Plan actualizado', 'ok'); App.render(); } }] });
  };
  App.acts['s4.alta'] = function () {
    UI.modal({ title: 'Dar de alta una empresa', wide: true, body: '<div class="grid2"><div><div class="field"><label>Nombre del distribuidor</label><input class="input" name="n" placeholder="Gasocentro El Sol"></div><div class="form2"><div class="field"><label>Dueño</label><input class="input" name="d" placeholder="Nombre y apellido"></div><div class="field"><label>Celular del dueño</label><input class="input" name="t" placeholder="9XX XXX XXX"></div></div><div class="form2"><div class="field"><label>Plan</label><select class="select" name="p"><option>Básico</option><option>Negocio</option></select></div><div class="field"><label>Repartidores</label><input class="input" name="r" type="number" min="1" max="10" value="2"></div></div></div><div><h4>Qué se crea</h4><ol style="padding-left:18px;color:var(--ink-2);margin-top:6px"><li>La empresa y su espacio de datos aislado.</li><li>El usuario dueño con su celular.</li><li>El plan y los límites de repartidores.</li><li>Las claves de la empresa para los adaptadores.</li></ol><div class="note warn mt-s" style="font-size:12.5px">En el MVP, el alta puede hacerse con un script en vez de esta pantalla.</div><details class="mt-s"><summary style="cursor:pointer;font-weight:600">Ver el script de alta de ejemplo</summary><div class="code mt-s">crear_empresa(nombre, plan)\ncrear_usuario(rol = dueño, celular)\nasignar_limites(plan)\ngenerar_claves(adaptadores)\nregistrar_auditoría("alta de empresa")</div></details></div></div>', actions: [{ label: 'Cancelar' }, { label: 'Crear empresa', kind: 'btn-primary', onClick: function (m) {
      var n = m.val('n').trim(); if (!n || !m.val('d').trim()) { UI.toast('Complete el nombre de la empresa y del dueño.', 'bad'); return false; }
      var s = S(), id = 'E-' + String(s.empresas.length + 1).padStart(3, '0');
      s.empresas.push({ id: id, nombre: n, plan: m.val('p'), repartidores: Math.min(10, Math.max(1, +m.val('r'))), estado: 'en prueba', alta: s.hoy, msgs: 0, costoMsgs: 0, cargos: 0, comisiones: 0, dispositivos: 0, ult: 'sin uso' });
      st.flags[id] = { whatsappApi: false, pasarela: false, fiado: false, recurrentes: false, probables: false, glp: false };
      srv.audit('Alta de empresa', n + ' (' + id + ')', 'Administrador SaaS'); UI.toast('Empresa ' + id + ' creada en periodo de prueba', 'ok'); App.render();
    } }] });
  };

  /* ---------- planes y tarifas ---------- */
  P.planes = function () {
    var c = S().config;
    return head('Planes y tarifas', 'Hipótesis de precio para validar con los primeros distribuidores. Ninguna cifra viene de un cliente real.') +
      '<div class="tbl-wrap"><table><thead><tr><th>Plan</th><th class="right">Repartidores</th><th class="right">Precio mensual</th><th>Estado</th></tr></thead><tbody><tr><td><b>Básico</b></td><td class="right">Hasta 3</td><td class="right num">S/ 59</td><td>' + UI.pill('warn', 'Hipótesis [H]', 'alert') + '</td></tr><tr><td><b>Negocio</b></td><td class="right">Hasta 10</td><td class="right num">S/ 149</td><td>' + UI.pill('warn', 'Hipótesis [H]', 'alert') + '</td></tr><tr><td><b>Repartidor adicional</b></td><td class="right">Cada uno</td><td class="right num">S/ 15</td><td>' + UI.pill('warn', 'Hipótesis [H]', 'alert') + '</td></tr><tr><td><b>Por pedido confirmado</b></td><td class="right">Sin tope</td><td class="right mut">Por definir</td><td>' + UI.pill('mute', 'Opción a validar', 'clock') + '</td></tr></tbody></table></div>' +
      '<div class="note mt-s">Los planes por repartidor vienen de la V2 de la primera iteración. Para la V6 el cobro «por pedido confirmado» alinea el precio con la plata recuperada, pero no tiene cifras todavía: es lo primero que hay que validar en las entrevistas.</div>' +
      '<div class="grid2 mt-l"><div class="panel"><div class="panel-h"><h3>Tarifas de mensajería (ejemplo)</h3>' + UI.pill('warn', 'Por confirmar', 'alert') + '</div><div class="panel-b"><dl class="kv"><dt>Marketing</dt><dd>' + U.money(c.tarifaMarketing) + ' por mensaje entregado</dd><dt>Utilidad</dt><dd>' + U.money(c.tarifaUtilidad) + ' por mensaje entregado</dd><dt>Servicio</dt><dd>' + U.money(c.tarifaServicio) + ' (1 000 gratis al mes por número)</dd></dl><p class="mut mt-s" style="font-size:12.5px">Se editan en S3, Adaptador de mensajería. La tarifa real de Meta para Perú está por confirmar.</p></div></div><div class="panel"><div class="panel-h"><h3>Costo de servir</h3></div><div class="panel-b"><dl class="kv"><dt>Infraestructura</dt><dd>USD 30 a 80 al mes en el MVP [H]</dd><dt>Soporte de instalación</dt><dd>Alto al inicio: capacitar repartidores</dd><dt>Pasarela</dt><dd>Comisión por confirmar [PI]</dd></dl></div></div></div>';
  };

  /* ---------- uso y costos (RNF-12) ---------- */
  P.uso = function () {
    var s = S(), em = s.empresas;
    var mensajesHoy = s.mensajes.filter(function (m) { return m.dir === 'out' && m.tipo === 'plantilla'; });
    var costoHoy = mensajesHoy.reduce(function (a, m) { return a + m.costo; }, 0);
    return head('Uso y costos por empresa', 'Mensajes y comisiones visibles por empresa para saber cuánto cuesta servir a cada una antes de cobrar.') +
      '<div class="note warn" style="margin-bottom:16px">Todas las cifras son de ejemplo. Las tarifas de Meta para Perú y la comisión de la pasarela están por confirmar.</div>' +
      '<div class="grid-main"><div class="panel"><div class="panel-b">' + C.card({ title: 'Costo de mensajes del mes por empresa', sub: 'Soles, tarifas de ejemplo', body: C.hbars(em.map(function (e, i) { return { label: e.nombre, value: e.costoMsgs + (e.id === 'E-001' ? costoHoy : 0), tip: e.nombre + ': ' + U.money(e.costoMsgs) + ' en mensajes' }; }), { fmt: U.money, color: C.SER[0] }), table: { cols: ['Empresa', 'Mensajes', 'Costo de mensajes', 'Cargos', 'Comisiones'], rows: em.map(function (e) { return [e.nombre, e.msgs, U.money(e.costoMsgs), e.cargos, U.money(e.comisiones)]; }) }, note: 'Una empresa sin plantillas por la API aparece en cero: usa el modo manual.' }) + '</div></div>' +
      '<div class="panel"><div class="panel-b"><h4>Hoy en la empresa de la demostración</h4><dl class="kv mt-s" style="grid-template-columns:140px 1fr"><dt>Plantillas enviadas</dt><dd>' + mensajesHoy.length + '</dd><dt>Costo de hoy</dt><dd>' + U.money(costoHoy) + '</dd><dt>Cargos con enlace</dt><dd>' + s.pagos.length + '</dd><dt>Dispositivos activos</dt><dd>' + Object.keys(s.dispositivos).filter(function (k) { return s.dispositivos[k].ultimoContacto; }).length + ' de 2</dd></dl></div></div></div>' +
      '<div class="tbl-wrap mt-l"><table><thead><tr><th>Empresa</th><th class="right">Mensajes</th><th class="right">Costo de mensajes</th><th class="right">Cargos con enlace</th><th class="right">Comisiones</th></tr></thead><tbody>' + em.map(function (e) { return '<tr><td><b>' + esc(e.nombre) + '</b></td><td class="right">' + e.msgs + '</td><td class="right num">' + U.money(e.costoMsgs) + '</td><td class="right">' + e.cargos + '</td><td class="right num">' + U.money(e.comisiones) + '</td></tr>'; }).join('') + '</tbody></table></div>';
  };

  /* ---------- soporte (RF-SEG-05, resultados solo lectura) ---------- */
  P.soporte = function () {
    var s = S(), emps = s.empresas, e = emps.filter(function (x) { return x.id === st.emp; })[0] || emps[0];
    var sel = '<div class="field" style="max-width:340px"><label>Empresa</label><select class="select" data-chg="s4.emp">' + emps.map(function (x) { return '<option value="' + x.id + '"' + (x.id === e.id ? ' selected' : '') + '>' + esc(x.nombre) + '</option>'; }).join('') + '</select></div>';
    var cuerpo;
    if (e.id !== 'E-001') cuerpo = '<div class="note">La demostración solo tiene datos operativos de ' + esc(emps[0].nombre) + '. Elija esa empresa para ver dispositivos, sincronización y resultados.</div>';
    else {
      var m = srv.metricas();
      cuerpo = '<div class="grid2"><div class="panel"><div class="panel-h"><h3>Dispositivos y sincronización</h3></div><div class="panel-b"><div class="tbl-wrap"><table><thead><tr><th>Dispositivo</th><th>Contacto</th><th class="right">Pend.</th><th></th></tr></thead><tbody>' + Object.keys(s.dispositivos).map(function (k) { var d = s.dispositivos[k]; return '<tr><td><b>' + d.id + '</b><span class="sub">' + esc(App.nombreUsuario(d.userId)) + '</span></td><td>' + (d.ultimoContacto ? d.ultimoContacto.slice(11) : 'Sin contacto') + '</td><td class="right">' + d.pendientesRep + '</td><td class="right"><button class="btn btn-sm ' + (d.revocado ? '' : 'btn-danger') + '" data-act="eq.rev" data-id="' + k + '">' + (d.revocado ? 'Restaurar' : 'Revocar') + '</button></td></tr>'; }).join('') + '</tbody></table></div></div></div>' +
        '<div class="panel"' + rf('RF-EXP-03') + '><div class="panel-h"><h3>Resultados del experimento</h3>' + UI.pill('mute', 'Solo lectura, para soporte', 'eye') + '</div><div class="panel-b"><dl class="kv" style="grid-template-columns:150px 1fr"><dt>Grupo aviso</dt><dd>' + m.nAviso + ' hogares, recompra ' + Math.round(m.p1 * 100) + '%</dd><dt>Grupo control</dt><dd>' + m.nControl + ' hogares, recompra ' + Math.round(m.p2 * 100) + '%</dd><dt>Diferencia</dt><dd><b>' + (m.d * 100).toFixed(1) + ' puntos</b> (IC ' + (m.lo * 100).toFixed(1) + ' a ' + (m.hi * 100).toFixed(1) + ')</dd></dl><p class="mut mt-s" style="font-size:12.5px">El administrador puede ver el resultado para ayudar, pero no modificar la asignación (RN-08).</p></div></div></div>' +
        '<div class="panel mt"><div class="panel-h"><h3>Últimos eventos de auditoría</h3></div><div class="panel-b"><div class="tbl-wrap"><table><tbody>' + s.auditoria.slice(0, 5).map(function (a) { return '<tr><td>' + a.ts.slice(0, 10).split('-').reverse().join('/') + ' ' + a.ts.slice(11) + '</td><td><b>' + esc(a.accion) + '</b><span class="sub">' + esc(a.detalle) + '</span></td><td>' + esc(a.quien) + '</td></tr>'; }).join('') + '</tbody></table></div></div></div>';
    }
    return head('Soporte', 'Diagnóstico de una empresa sin entrar a sus datos personales.') + sel + cuerpo;
  };
  App.chg['s4.emp'] = function (el) { st.emp = el.value; App.render(); };

  /* ---------- funciones por empresa ---------- */
  var FL = [['whatsappApi', 'Mensajería por la API de WhatsApp', 'RF-MSG-01', 'Piloto'], ['pasarela', 'Enlace de pago con Yape (pasarela)', 'RF-COB-03', 'Piloto'], ['fiado', 'Fiado con límite y abonos', 'RF-COB-04', 'Piloto'], ['recurrentes', 'Pedidos recurrentes', 'RF-PED-05', 'Piloto'], ['probables', 'Probables en el paquete del repartidor', 'RF-DIA-02', 'Piloto'], ['glp', 'Complemento GLP (trazabilidad, FISE)', 'RF-GLP-01', 'Futuro']];
  P.funciones = function () {
    var s = S(), emps = s.empresas;
    return head('Funciones por empresa', 'El MVP funciona con lo esencial. Las funciones del piloto y las futuras se activan empresa por empresa cuando un distribuidor las necesita.') +
      '<div class="tbl-wrap"><table><thead><tr><th>Función</th><th>Fase</th>' + emps.map(function (e) { return '<th class="center">' + esc(e.nombre) + '</th>'; }).join('') + '</tr></thead><tbody>' + FL.map(function (f) {
        return '<tr data-rf="' + f[2] + '" data-rf-pos="none"><td><b>' + f[1] + '</b><span class="sub">' + f[2] + '</span></td><td>' + UI.pill(f[3] === 'Piloto' ? 'warn' : 'info', f[3]) + '</td>' + emps.map(function (e) { var on = e.id === 'E-001' ? s.flags[f[0]] : (st.flags[e.id] || {})[f[0]]; return '<td class="center"><label class="switch" style="display:inline-block"><input type="checkbox" data-chg="s4.flag" data-e="' + e.id + '" data-f="' + f[0] + '" ' + (on ? 'checked' : '') + '><i></i></label></td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table></div><div class="note mt-s">Para la empresa de la demostración, estas opciones cambian lo que ve la app del repartidor y el portal (por ejemplo, los probables).</div>';
  };
  App.chg['s4.flag'] = function (el) {
    var e = el.dataset.e, f = el.dataset.f;
    if (e === 'E-001') S().flags[f] = el.checked; else { st.flags[e] = st.flags[e] || {}; st.flags[e][f] = el.checked; }
    srv.audit('Cambió una función de una empresa', e + ': ' + f + ' = ' + el.checked, 'Administrador SaaS'); UI.toast('Función ' + (el.checked ? 'activada' : 'desactivada'), 'ok');
  };
})();

/* Lógica simulada de S3 (plataforma) y del dispositivo S1. Todo en memoria. */
(function () {
  'use strict';
  var App = window.App, U = App.U;
  var S = function () { return App.S; };
  var srv = (App.srv = {});
  var est = (App.est = {});
  var dev = (App.dev = {});

  /* ---------- bus de eventos ---------- */
  var handlers = {};
  App.on = function (n, f) { (handlers[n] = handlers[n] || []).push(f); };
  App.emit = function (n, a) { (handlers[n] || []).forEach(function (f) { f(a); }); };

  var seq = { ped: 1000, av: 0, cob: 0, ent: 0, mov: 0, msg: 0, aud: 0, hog: 200, alerta: 0, cargo: 0, sol: 0 };
  function nid(k, pre) { seq[k]++; return pre + String(seq[k]).padStart(k === 'ped' ? 0 : 3, '0'); }
  var nombreUsuario = function (id) { var u = S().usuarios.filter(function (x) { return x.id === id; })[0]; return u ? u.nombre : id; };
  App.nombreUsuario = nombreUsuario;
  var hogar = (App.hogar = function (id) { return S().hogares.filter(function (h) { return h.id === id; })[0]; });
  var pedido = (App.pedido = function (id) { return S().pedidos.filter(function (p) { return p.id === id; })[0]; });

  /* ---------- auditoría (solo inserción, RF-SEG-04) ---------- */
  srv.audit = function (accion, detalle, quien, ref) {
    S().auditoria.unshift({ id: nid('aud', 'AUD-'), ts: App.clock.stamp(), accion: accion, detalle: detalle, quien: quien || App.actor(), ref: ref || null });
  };
  App.actor = function () {
    var s = S();
    if (App.route && App.route.sys === 's1') return s.deviceUser ? nombreUsuario(s.deviceUser) : 'Repartidor';
    if (App.route && App.route.sys === 's4') return 'Administrador SaaS';
    if (App.route && App.route.sys === 's3') return 'Plataforma';
    return s.rolPortal === 'dueno' ? 'Rosa Medina (dueña)' : 'Julio Ramos (despachador)';
  };
  srv.alerta = function (tipo, texto, ref) {
    S().alertas.unshift({ id: nid('alerta', 'AL-'), ts: App.clock.stamp(), tipo: tipo, texto: texto, ref: ref || null, leida: false });
  };

  /* ---------- estimación de reposición (RF-REP-01 a 03, RN-09) ---------- */
  est.estimar = function (h, prodId) {
    var s = S(), cfg = s.config, p = s.productos[prodId];
    var ent = (h.entregas[prodId] || []).slice().sort(function (a, b) { return a.fecha < b.fecha ? -1 : 1; });
    var n = ent.length, last = ent[n - 1];
    var out = { prodId: prodId, n: n, last: last ? last.fecha : null, lastQty: last ? last.qty : 0, usado: 'historial', razon: '', perUnit: [], med: null, min: null, max: null };
    if (!last) { out.sinEstimacion = true; out.razon = 'Sin entregas'; return out; }
    if (n >= 2) {
      var ints = [];
      for (var i = 1; i < n; i++) ints.push(U.diff(ent[i].fecha, ent[i - 1].fecha) / ent[i - 1].qty);
      var win = ints.slice(-cfg.k);
      out.perUnit = win; out.med = U.median(win); out.min = Math.min.apply(null, win); out.max = Math.max.apply(null, win);
      if (out.med < p.rango[0] || out.med > p.rango[1]) { out.usado = 'referencia'; out.razon = 'La mediana (' + out.med.toFixed(1) + ' días) está fuera del rango ' + p.rango[0] + '–' + p.rango[1] + ' (RN-09)'; }
    } else {
      out.usado = 'referencia'; out.razon = 'Menos de 2 entregas';
      if (cfg.sinHistorial === 'noavisar') { out.sinEstimacion = true; return out; }
    }
    out.dur = out.usado === 'historial' ? out.med : p.ref;
    out.ciclo = Math.round(out.dur * out.lastQty);
    out.agotamiento = U.addDays(out.last, out.ciclo);
    out.fechaAvisoOrig = U.addDays(out.agotamiento, -cfg.anticipacion);
    out.fechaAviso = out.fechaAvisoOrig;
    var pp = h.posponer && h.posponer[prodId];
    if (pp && pp > out.fechaAviso) { out.fechaAviso = pp; out.pospuestoHasta = pp; }
    out.diasRest = U.diff(out.agotamiento, s.hoy);
    out.nivel = U.clamp(out.diasRest / Math.max(out.ciclo, 1), 0, 1);
    return out;
  };

  /* evaluación retrospectiva (RF-EXP-05): predice cada entrega con las anteriores */
  est.backtest = function () {
    var s = S(), errs = [], k = s.config.k;
    s.hogares.forEach(function (h) {
      Object.keys(h.entregas).forEach(function (pid) {
        var ent = h.entregas[pid].slice().sort(function (a, b) { return a.fecha < b.fecha ? -1 : 1; });
        for (var j = 2; j < ent.length; j++) {
          var ints = [];
          for (var i = 1; i < j; i++) ints.push(U.diff(ent[i].fecha, ent[i - 1].fecha) / ent[i - 1].qty);
          var med = U.median(ints.slice(-k));
          var pred = U.addDays(ent[j - 1].fecha, Math.round(med * ent[j - 1].qty));
          errs.push(Math.abs(U.diff(pred, ent[j].fecha)));
        }
      });
    });
    var med = U.median(errs), dentro = errs.filter(function (e) { return e <= 3; }).length;
    return { n: errs.length, mae: med, pct3: errs.length ? dentro / errs.length : 0, errs: errs };
  };

  /* ---------- pedidos ---------- */
  var pedidoAbierto = function (h) {
    return S().pedidos.some(function (p) { return p.hogarId === h.id && ['por_confirmar', 'confirmado', 'asignado', 'en_ruta'].indexOf(p.estado) >= 0; });
  };
  srv.pedidoAbierto = pedidoAbierto;
  srv.totalItems = function (items) { return items.reduce(function (a, i) { return a + i.qty * i.precio; }, 0); };
  srv.crearPedido = function (o) {
    var s = S();
    var items = o.items.map(function (i) { return { p: i.p, qty: i.qty, precio: s.productos[i.p].precio }; });
    var ped = {
      id: o.id || nid('ped', 'P-'), hogarId: o.hogarId, items: items, total: srv.totalItems(items), origen: o.origen || 'llamada',
      estado: o.estado || 'por_confirmar', repartidorId: o.repartidorId || null, creado: App.clock.stamp(), notas: o.notas || '',
      avisoId: o.avisoId || null, motivo: null, recurrente: !!o.recurrente, hist: []
    };
    ped.hist.push({ ts: ped.creado, estado: ped.estado, por: o.por || App.actor() });
    s.pedidos.push(ped);
    return ped;
  };
  srv.setEstado = function (ped, estado, por, motivo) {
    ped.estado = estado; if (motivo) ped.motivo = motivo;
    ped.hist.push({ ts: App.clock.stamp(), estado: estado, por: por || App.actor(), motivo: motivo || null });
  };
  srv.confirmar = function (ped) {
    // RN-06: el precio es el vigente al confirmar
    var s = S();
    ped.items.forEach(function (i) { i.precio = s.productos[i.p].precio; });
    ped.total = srv.totalItems(ped.items);
    srv.setEstado(ped, 'confirmado');
  };
  srv.asignar = function (ids, userId) {
    var s = S();
    ids.forEach(function (id) {
      var ped = pedido(id); if (!ped) return;
      ped.repartidorId = userId;
      srv.setEstado(ped, 'asignado');
      var d = s.devices[userId];
      if (d && d.pkg) { (s.cambios[userId] = s.cambios[userId] || []).push({ tipo: 'asignado', pedidoId: id }); }
    });
    srv.audit('Asignó pedidos', ids.join(', ') + ' a ' + nombreUsuario(userId));
  };
  srv.cancelarPedido = function (ped, motivo) {
    var s = S();
    srv.setEstado(ped, 'cancelado', null, motivo);
    if (ped.repartidorId) { (s.cambios[ped.repartidorId] = s.cambios[ped.repartidorId] || []).push({ tipo: 'cancelado', pedidoId: ped.id }); }
    srv.audit('Canceló pedido', ped.id + ': ' + motivo);
  };
  srv.jornada = function (userId) {
    var s = S(), id = 'J-' + s.hoy.replace(/-/g, '') + '-' + userId;
    var j = s.jornadas.filter(function (x) { return x.id === id; })[0];
    if (!j) {
      j = { id: id, fecha: s.hoy, userId: userId, estado: 'en_curso', carga: { llenos: {}, vacios: {} }, cargaConfirmada: false, cierreApp: null };
      s.jornadas.push(j);
    }
    return j;
  };
  srv.setCarga = function (userId, llenos) {
    var j = srv.jornada(userId);
    j.carga = { llenos: llenos, vacios: {} };
    srv.audit('Registró la carga del vehículo', nombreUsuario(userId) + ': ' + Object.keys(llenos).map(function (k) { return llenos[k] + ' ' + k; }).join(', '));
  };

  /* ---------- hogares ---------- */
  srv.crearHogar = function (d) {
    var s = S();
    var dup = s.hogares.filter(function (h) { return h.tel.replace(/\s/g, '') === d.tel.replace(/\s/g, ''); })[0];
    if (dup) return { ok: false, motivo: 'El celular ya está registrado en ' + dup.id + ' (' + dup.nombre + ')', dup: dup };
    var h = {
      id: d.id || nid('hog', 'H-'), nombre: d.nombre, negocio: null, distrito: d.distrito || 'Comas', dir: d.dir, ref: d.ref || '', tel: d.tel, loc: d.loc || null,
      productos: d.productos || [], entregas: {}, envSaldo: {}, deuda: 0, garantia: 0,
      consent: d.consent || { estado: 'ninguno', fecha: null, medio: null, texto: null, por: null },
      grupo: null, exp: null, posponer: {}, todavia: {}, notas: d.notas || ''
    };
    s.hogares.push(h);
    srv.audit('Registró hogar', h.id + ' ' + h.nombre);
    return { ok: true, hogar: h };
  };
  srv.consentir = function (h, medio, texto, por) {
    h.consent = { estado: 'vigente', fecha: S().hoy, medio: medio, texto: texto, por: por || App.actor() };
    srv.audit('Registró consentimiento', h.id + ' (' + medio + ')');
  };
  srv.baja = function (h, via) {
    h.consent.estado = 'baja'; h.consent.bajaFecha = S().hoy;
    srv.audit('Baja de avisos', h.id + ' vía ' + via);
  };
  srv.eliminarHogar = function (h) {
    var s = S();
    s.hogares = s.hogares.filter(function (x) { return x.id !== h.id; });
    srv.audit('Eliminó datos del hogar', h.id + ' (a solicitud del titular)');
  };

  /* ---------- reposición: sugeridos, avisos, respuestas ---------- */
  srv.sugeridos = function () {
    var s = S(), cfg = s.config, out = [];
    s.hogares.forEach(function (h) {
      h.productos.forEach(function (pr) {
        var e = est.estimar(h, pr.p);
        if (e.sinEstimacion || !e.last) return;
        var dif = U.diff(e.fechaAvisoOrig, s.hoy);
        if (dif > 0) return;
        if (U.diff(s.hoy, e.agotamiento) > cfg.perdidoDias) return; // posible perdido
        var av = s.avisos.filter(function (a) { return a.hogarId === h.id && a.prodId === pr.p && a.ciclo === e.last; });
        var motivo = null;
        if (av.some(function (a) { return a.respuesta === 'si'; })) return;
        if (h.consent.estado === 'baja') motivo = 'Dio de baja los avisos';
        else if (h.consent.estado !== 'vigente') motivo = 'Sin consentimiento (RN-01)';
        else if (pedidoAbierto(h)) motivo = 'Tiene un pedido abierto';
        else if (h.grupo === 'control' && s.experimento.activo) motivo = 'Grupo de control del experimento (RN-08)';
        else if (e.pospuestoHasta && e.pospuestoHasta > s.hoy) motivo = 'Pospuesto por «todavía tengo» hasta ' + U.dm(e.pospuestoHasta);
        else if (av.length >= cfg.maxAvisos) motivo = 'Ya recibió el aviso de este ciclo (RN-02)';
        else if (av.length && U.diff(s.hoy, av[av.length - 1].fecha) < 2) motivo = 'Aviso reciente sin respuesta (RN-02)';
        out.push({ key: h.id + '|' + pr.p, hogar: h, prodId: pr.p, est: e, motivo: motivo, qty: e.lastQty });
      });
    });
    return out;
  };
  srv.perdidos = function () {
    var s = S(), out = [];
    s.hogares.forEach(function (h) {
      h.productos.forEach(function (pr) {
        var e = est.estimar(h, pr.p);
        if (e.sinEstimacion || !e.last) return;
        var late = U.diff(s.hoy, e.agotamiento);
        if (late > s.config.perdidoDias && h.consent.estado !== 'baja') out.push({ hogar: h, prodId: pr.p, est: e, late: late });
      });
    });
    return out.sort(function (a, b) { return a.late - b.late; });
  };
  srv.horizonte = function (dias) {
    var s = S(), buckets = [];
    for (var i = 0; i <= dias; i++) buckets.push({ d: i, n: 0, items: [] });
    s.hogares.forEach(function (h) {
      h.productos.forEach(function (pr) {
        var e = est.estimar(h, pr.p);
        if (e.sinEstimacion || !e.last) return;
        var d = U.diff(e.fechaAvisoOrig, s.hoy);
        if (d >= 0 && d <= dias) { buckets[d].n++; buckets[d].items.push(h.id); }
      });
    });
    return buckets;
  };
  srv.textoAviso = function (h, prodId) {
    var p = S().productos[prodId];
    return 'Hola ' + h.nombre.split(' ')[0] + ', ¿le llevamos mañana su ' + p.nombre.toLowerCase() + '? Responda con un botón.';
  };
  srv.aprobarAvisos = function (items, modo) {
    var s = S();
    if (!App.clock.inWindow(s.config)) return { ok: false, motivo: 'Fuera del horario permitido (' + s.config.horaIni + '–' + s.config.horaFin + ', RN-03). Cambie la hora simulada o espere.' };
    var creados = [];
    items.forEach(function (it) {
      var h = it.hogar;
      if (h.consent.estado !== 'vigente') return; // RN-01
      var a = {
        id: nid('av', 'AV-'), hogarId: h.id, prodId: it.prodId, ciclo: it.est.last, fecha: s.hoy, hora: App.clock.hhmm(), modo: modo,
        estado: modo === 'manual' ? 'por_enviar' : 'enviado', respuesta: null, pedidoId: null, plantilla: 'T1', categoria: 'marketing',
        costo: modo === 'api' ? s.config.tarifaMarketing : 0, texto: srv.textoAviso(h, it.prodId), grupo: h.grupo, qty: it.qty
      };
      s.avisos.push(a); creados.push(a);
      if (modo === 'api') {
        srv.msg(h, 'out', a.texto, { tipo: 'plantilla', plantilla: 'T1', estado: 'enviado', costo: a.costo, categoria: 'marketing', avisoId: a.id });
      }
    });
    srv.audit('Aprobó lista de avisos', creados.length + ' avisos (' + (modo === 'api' ? 'API' : 'manual') + ')');
    if (modo === 'api') creados.forEach(function (a, i) { srv.progresoEntrega(a, i); });
    return { ok: true, creados: creados };
  };
  srv.progresoEntrega = function (a, i) {
    var h = hogar(a.hogarId);
    setTimeout(function () {
      var m = S().mensajes.filter(function (x) { return x.avisoId === a.id && x.dir === 'out'; })[0];
      if (!m) return;
      if (h.sinWhatsapp) { m.estado = 'fallido'; m.codigo = '131026 (número sin WhatsApp)'; a.estado = 'fallido'; srv.alerta('aviso', 'El aviso a ' + h.nombre + ' falló: pasa a la lista de llamadas.', a.id); }
      else { m.estado = 'entregado'; a.estado = 'entregado'; }
      App.emit('change');
    }, 700 + i * 120);
  };
  srv.msg = function (h, dir, texto, o) {
    o = o || {};
    var m = { id: nid('msg', 'M-'), hogarId: h.id, dir: dir, t: App.clock.min, ts: App.clock.stamp(), texto: texto, tipo: o.tipo || 'libre', plantilla: o.plantilla || null, estado: o.estado || (dir === 'in' ? 'recibido' : 'enviado'), costo: o.costo || 0, categoria: o.categoria || null, avisoId: o.avisoId || null };
    S().mensajes.push(m); return m;
  };
  srv.ventanaAbierta = function (h) {
    return S().mensajes.some(function (m) { return m.hogarId === h.id && m.dir === 'in' && m.tipo !== 'baja' && App.clock.min - m.t <= 1440 && m.t <= App.clock.min; });
  };
  srv.marcarEnviado = function (a) { a.estado = 'enviado'; srv.msg(hogar(a.hogarId), 'out', a.texto, { tipo: 'plantilla', plantilla: 'T1', estado: 'enviado', costo: 0, categoria: 'marketing', avisoId: a.id }); };
  /* respuesta del hogar: 'si' | 'todavia' | 'no' | 'libre' | 'sin' */
  srv.responder = function (a, resp, texto) {
    var s = S(), h = hogar(a.hogarId);
    a.respuesta = resp;
    if (resp === 'si') {
      var pr = h.productos.filter(function (x) { return x.p === a.prodId; })[0];
      var ped = srv.crearPedido({ hogarId: h.id, items: [{ p: a.prodId, qty: a.qty || (pr ? pr.qty : 1) }], origen: 'aviso', estado: 'confirmado', avisoId: a.id, por: 'Respuesta de ' + h.nombre.split(' ')[0] });
      a.pedidoId = ped.id;
      srv.msg(h, 'in', 'Sí, mañana', { tipo: 'respuesta' });
    } else if (resp === 'todavia') {
      h.posponer[a.prodId] = U.addDays(s.hoy, s.config.posponerDias);
      h.todavia[a.prodId] = (h.todavia[a.prodId] || 0) + 1;
      srv.msg(h, 'in', 'Todavía tengo', { tipo: 'respuesta' });
    } else if (resp === 'no') {
      srv.baja(h, 'respuesta «No volver a escribir»');
      srv.msg(h, 'in', 'No volver a escribir', { tipo: 'baja' });
    } else if (resp === 'libre') {
      srv.msg(h, 'in', texto || 'Mándeme 2 balones por favor', { tipo: 'libre' });
      srv.crearPedido({ hogarId: h.id, items: [{ p: a.prodId, qty: 2 }], origen: 'mensaje', estado: 'por_confirmar', notas: 'Mensaje libre: «' + (texto || 'Mándeme 2 balones por favor') + '»', avisoId: a.id, por: 'Mensaje de ' + h.nombre.split(' ')[0] });
    }
    return a;
  };

  /* ---------- cobros ---------- */
  srv.verificarCobro = function (c, quien) {
    c.estado = 'verificado'; c.verificadoPor = quien || App.actor();
    srv.audit('Verificó cobro', c.id + ' ' + U.money(c.monto));
  };
  srv.anularCobro = function (c, motivo) {
    c.anulado = true; c.motivoAnulacion = motivo;
    S().cobros.push({ id: nid('cob', 'C-'), pedidoId: c.pedidoId, hogarId: c.hogarId, userId: c.userId, jornadaId: c.jornadaId, medio: c.medio, monto: -c.monto, estado: 'anulacion', ref: c.id, ts: App.clock.stamp(), anulado: false, contra: true });
    if (c.medio === 'fiado') { var h = hogar(c.hogarId); if (h) h.deuda = Math.max(0, h.deuda - c.monto); }
    srv.audit('Anuló cobro', c.id + ' (contra-asiento): ' + motivo);
  };
  srv.abonar = function (h, monto) {
    h.deuda = Math.max(0, h.deuda - monto);
    S().cobros.push({ id: nid('cob', 'C-'), pedidoId: null, hogarId: h.id, userId: null, jornadaId: null, medio: 'abono', monto: monto, estado: 'registrado', ts: App.clock.stamp(), anulado: false });
    srv.audit('Registró abono de fiado', h.id + ' ' + U.money(monto));
  };
  /* pasarela (simulada). Reglas verificadas de Yape con Culqi: código de 2 min, tope S/ 2 000, solo soles */
  srv.cargoYape = function (o) {
    var s = S();
    if (o.monto > 2000) return { ok: false, codigo: 'monto_maximo', motivo: 'Yape permite pagos de hasta S/ 2,000.' };
    if (!/^\d{6}$/.test(o.codigo || '')) return { ok: false, codigo: 'codigo_invalido', motivo: 'El código de aprobación debe tener 6 dígitos.' };
    if (o.vencido) return { ok: false, codigo: 'codigo_vencido', motivo: 'El código venció (vigencia máxima de 2 minutos). Genere uno nuevo en Yape.' };
    var cargo = { id: nid('cargo', 'CH-'), pedidoId: o.pedidoId, monto: o.monto, celular: '•••• ••• ' + (o.celular || '').replace(/\D/g, '').slice(-3), estado: 'pagado', ts: App.clock.stamp(), pasarela: 'Culqi (simulada)', moneda: 'PEN' };
    s.pagos.push(cargo);
    s.pagoLinks[o.pedidoId] = { estado: 'pagado', cargo: cargo.id };
    s.cobros.forEach(function (c) { if (c.pedidoId === o.pedidoId && c.medio === 'enlace' && c.estado === 'esperando_pasarela') { c.estado = 'verificado'; c.origen = 'pasarela'; } });
    return { ok: true, cargo: cargo };
  };

  /* ---------- aplicar eventos del dispositivo (idempotente) ---------- */
  var ok = function () { return { estado: 'aceptado' }; };
  var rej = function (m) { return { estado: 'rechazado', motivo: m }; };
  srv.apply = function (ev, userId) {
    var s = S(), p = ev.p, j, ped, h, d;
    switch (ev.tipo) {
      case 'carga.confirmada':
        j = srv.jornada(userId); j.carga = p; j.cargaConfirmada = true; return ok();
      case 'hogar.alta': {
        var r = srv.crearHogar(Object.assign({}, p, { id: p.id }));
        if (!r.ok) return rej(r.motivo);
        return ok();
      }
      case 'consentimiento.registrado':
        h = hogar(p.hogarId); if (!h) return rej('El hogar no existe en el servidor');
        srv.consentir(h, p.medio, p.texto, nombreUsuario(userId)); return ok();
      case 'pedido.creado':
        h = hogar(p.hogarId); if (!h) return rej('El hogar no existe en el servidor');
        srv.crearPedido({ id: p.id, hogarId: p.hogarId, items: p.items, origen: 'ruta', estado: 'en_ruta', repartidorId: userId, por: nombreUsuario(userId) });
        return ok();
      case 'entrega.registrada': {
        ped = pedido(p.pedidoId); if (!ped) return rej('El pedido no existe');
        if (ped.estado === 'entregado') return rej('Ya fue entregado por ' + nombreUsuario(ped.entregadoPor) + ': gana el primero en llegar al servidor');
        var alerta = null;
        if (ped.estado === 'cancelado') { alerta = 'La entrega de ' + ped.id + ' prevalece sobre la cancelación'; srv.alerta('conflicto', alerta + ': revisar con el repartidor.', ped.id); }
        j = srv.jornada(userId);
        srv.setEstado(ped, 'entregado', nombreUsuario(userId)); ped.entregadoPor = userId;
        var ent = { id: nid('ent', 'E-'), pedidoId: ped.id, hogarId: ped.hogarId, userId: userId, jornadaId: j.id, items: p.items, total: p.total, horaDisp: ev.hora, horaSrv: App.clock.stamp(), foto: !!p.foto };
        s.entregas.push(ent);
        h = hogar(ped.hogarId);
        if (h) p.items.forEach(function (i) { (h.entregas[i.p] = h.entregas[i.p] || []).push({ fecha: s.hoy, qty: i.qty }); });
        return alerta ? { estado: 'aceptado', motivo: alerta } : ok();
      }
      case 'entrega.no_realizada':
        ped = pedido(p.pedidoId); if (!ped) return rej('El pedido no existe');
        if (ped.estado === 'entregado') return rej('El pedido ya figura como entregado');
        srv.setEstado(ped, 'no_entregado', nombreUsuario(userId), p.motivo); return ok();
      case 'envase.movimiento': {
        j = srv.jornada(userId); h = hogar(p.hogarId);
        var env = p.envase, saldo = h ? (h.envSaldo[env] || 0) : 0;
        var mov = { id: nid('mov', 'MV-'), jornadaId: j.id, userId: userId, hogarId: p.hogarId, pedidoId: p.pedidoId, envase: env, llenos: p.llenos, vacios: p.vacios, marca: p.marca || 'propia', garantia: p.garantia || null, ts: ev.hora, sinPrestamo: 0 };
        if (h) {
          var nuevo = saldo + p.llenos - p.vacios;
          if (nuevo < 0) { mov.sinPrestamo = -nuevo; nuevo = 0; } // RN-05
          h.envSaldo[env] = nuevo;
          if (p.garantia) h.garantia += (p.garantia.tipo === 'cobrada' ? p.garantia.monto : -p.garantia.monto);
        }
        s.movEnv.push(mov); return ok();
      }
      case 'cobro.registrado': {
        j = srv.jornada(userId);
        var c = { id: nid('cob', 'C-'), uuid: ev.uuid, pedidoId: p.pedidoId, hogarId: p.hogarId, userId: userId, jornadaId: j.id, medio: p.medio, monto: p.monto, recibido: p.recibido || null, vuelto: p.vuelto || null, estado: 'registrado', ts: ev.hora, anulado: false };
        if (p.medio === 'qr_negocio') c.estado = 'por_verificar';
        else if (p.medio === 'enlace') {
          var pl = s.pagoLinks[p.pedidoId];
          if (pl && pl.estado === 'pagado') { c.estado = 'verificado'; c.origen = 'pasarela'; } else c.estado = 'esperando_pasarela';
        } else if (p.medio === 'fiado') { c.estado = 'fiado'; h = hogar(p.hogarId); if (h) h.deuda += p.monto; }
        s.cobros.push(c); return ok();
      }
      case 'jornada.cerrada':
        j = srv.jornada(userId); j.cierreApp = { ts: ev.hora, totales: p.totales, envases: p.envases }; j.estado = 'cerrada_app';
        return ok();
      default: return rej('Tipo de evento desconocido');
    }
  };
  srv.recibirLote = function (userId, evs, pendientesRestantes) {
    var s = S(), dv = s.dispositivos[userId];
    var res = { acuses: [], revocado: false };
    if (dv && dv.revocado) { res.revocado = true; return res; }
    evs.forEach(function (ev) {
      var yaRecibido = s.eventLog.filter(function (x) { return x.uuid === ev.uuid; })[0];
      var ac;
      if (yaRecibido) ac = { uuid: ev.uuid, estado: 'duplicado' }; // idempotencia: no cambia el estado
      else {
        var r = srv.apply(ev, userId);
        ac = { uuid: ev.uuid, estado: r.estado, motivo: r.motivo };
        s.eventLog.push({ uuid: ev.uuid, seq: ev.seq, tipo: ev.tipo, userId: userId, dispositivo: dv ? dv.id : '?', horaDisp: ev.hora, horaSrv: App.clock.stamp(), estado: r.estado, motivo: r.motivo || null, p: ev.p });
      }
      res.acuses.push(ac);
    });
    if (dv) { dv.ultimoContacto = App.clock.stamp(); dv.pendientesRep = pendientesRestantes || 0; }
    return res;
  };

  /* ---------- cuadre (RF-CUA) ---------- */
  var MEDIOS = ['efectivo', 'qr_negocio', 'enlace', 'fiado'];
  srv.MEDIOS = MEDIOS;
  srv.resumenJornada = function (j) {
    var s = S();
    var by = {}; MEDIOS.forEach(function (m) { by[m] = { n: 0, monto: 0 }; });
    s.cobros.forEach(function (c) {
      if (c.jornadaId !== j.id || c.anulado || c.contra || !by[c.medio]) return;
      by[c.medio].n++; by[c.medio].monto += c.monto;
    });
    var llenosEnt = {}, vaciosRec = {};
    s.movEnv.forEach(function (m) {
      if (m.jornadaId !== j.id) return;
      llenosEnt[m.envase] = (llenosEnt[m.envase] || 0) + m.llenos;
      var k = m.envase + '|' + m.marca; vaciosRec[k] = (vaciosRec[k] || 0) + m.vacios;
    });
    var esperLlenos = {};
    Object.keys(j.carga.llenos || {}).forEach(function (k) { esperLlenos[k] = (j.carga.llenos[k] || 0) - (llenosEnt[k] || 0); });
    var ents = s.entregas.filter(function (e) { return e.jornadaId === j.id; });
    var noEnt = s.pedidos.filter(function (p) { return p.repartidorId === j.userId && p.estado === 'no_entregado'; }).length;
    var pend = s.pedidos.filter(function (p) { return p.repartidorId === j.userId && ['asignado', 'en_ruta'].indexOf(p.estado) >= 0; }).length;
    var porVerificar = s.cobros.filter(function (c) { return c.jornadaId === j.id && c.estado === 'por_verificar' && !c.anulado; });
    var total = MEDIOS.reduce(function (a, m) { return a + by[m].monto; }, 0);
    return { by: by, total: total, entregas: ents.length, noEnt: noEnt, pendientes: pend, esperLlenos: esperLlenos, llenosEnt: llenosEnt, vaciosRec: vaciosRec, porVerificar: porVerificar };
  };
  srv.cuadre = function (j) {
    var s = S();
    if (!s.cuadres[j.id]) s.cuadres[j.id] = { jornadaId: j.id, inicioMs: null, efectivoContado: null, verificados: {}, noEncontrados: {}, envContado: {}, motivos: {}, cerrado: false };
    return s.cuadres[j.id];
  };
  srv.bloqueos = function (j) {
    var s = S(), r = srv.resumenJornada(j), cu = srv.cuadre(j), dv = s.dispositivos[j.userId], b = [];
    if (!j.cierreApp) b.push('La app de ' + nombreUsuario(j.userId) + ' aún no cerró la jornada.');
    if (dv && dv.pendientesRep > 0) b.push('El dispositivo informó ' + dv.pendientesRep + ' eventos pendientes de enviar (RF-CUA-04).');
    var sinRes = r.porVerificar.filter(function (c) { return !cu.verificados[c.id] && !cu.noEncontrados[c.id]; });
    if (sinRes.length) b.push(sinRes.length + ' cobro(s) con QR del negocio sin verificar.');
    if (cu.efectivoContado == null) b.push('Falta contar el efectivo recibido.');
    var dif = srv.diferencias(j);
    dif.forEach(function (d) { if (d.monto !== 0 && !cu.motivos[d.key]) b.push('La diferencia «' + d.label + '» necesita un motivo (RF-CUA-03).'); });
    return b;
  };
  srv.diferencias = function (j) {
    var s = S(), r = srv.resumenJornada(j), cu = srv.cuadre(j), out = [];
    if (cu.efectivoContado != null) out.push({ key: 'efectivo', label: 'Efectivo', monto: Math.round((cu.efectivoContado - r.by.efectivo.monto) * 100) / 100, esperado: r.by.efectivo.monto, real: cu.efectivoContado });
    var noEnc = r.porVerificar.filter(function (c) { return cu.noEncontrados[c.id]; }).reduce(function (a, c) { return a + c.monto; }, 0);
    if (noEnc) out.push({ key: 'qr', label: 'QR del negocio no encontrados', monto: -noEnc, esperado: noEnc, real: 0 });
    Object.keys(r.esperLlenos).forEach(function (env) {
      var v = cu.envContado['llenos|' + env];
      if (v != null) out.push({ key: 'env|' + env, label: 'Envases llenos que vuelven (' + s.envases[env].nombre + ')', monto: v - r.esperLlenos[env], esperado: r.esperLlenos[env], real: v, unidad: 'u' });
    });
    return out;
  };
  srv.cerrarCuadre = function (j) {
    var s = S(), cu = srv.cuadre(j);
    cu.cerrado = true; cu.cerradoPor = App.actor(); cu.cerradoTs = App.clock.stamp();
    cu.duracionSeg = cu.inicioMs ? Math.max(1, Math.round((Date.now() - cu.inicioMs) / 1000)) : null;
    cu.snapshot = { resumen: srv.resumenJornada(j), dif: srv.diferencias(j) };
    j.estado = 'cuadrada';
    var r = cu.snapshot.resumen;
    // inventario del local: vuelven los llenos sobrantes y los vacíos recogidos
    Object.keys(r.esperLlenos).forEach(function (env) { var v = cu.envContado['llenos|' + env]; if (v == null) v = r.esperLlenos[env]; s.inventario[env].llenos += v; });
    Object.keys(r.vaciosRec).forEach(function (k) { var pr = k.split('|'); var inv = s.inventario[pr[0]]; inv.vacios[pr[1]] = (inv.vacios[pr[1]] || 0) + r.vaciosRec[k]; });
    srv.audit('Cerró cuadre', j.id + ' (' + nombreUsuario(j.userId) + '), diferencias: ' + cu.snapshot.dif.filter(function (d) { return d.monto; }).length);
  };

  /* ---------- experimento (RF-EXP) ---------- */
  srv.metricas = function () {
    var s = S(), a = { n: 0, k: 0 }, c = { n: 0, k: 0 }, pend = 0;
    s.hogares.forEach(function (h) {
      if (!h.exp) return;
      if (h.exp.recompro30 == null) { pend++; return; }
      var t = h.exp.grupo === 'aviso' ? a : c; t.n++; if (h.exp.recompro30) t.k++;
    });
    var p1 = a.n ? a.k / a.n : 0, p2 = c.n ? c.k / c.n : 0, d = p1 - p2;
    var se = Math.sqrt(p1 * (1 - p1) / Math.max(a.n, 1) + p2 * (1 - p2) / Math.max(c.n, 1));
    var asignados = s.hogares.filter(function (h) { return h.exp; });
    var nAviso = asignados.filter(function (h) { return h.exp.grupo === 'aviso'; }).length;
    var nControl = asignados.length - nAviso;
    return { a: a, c: c, p1: p1, p2: p2, d: d, lo: d - 1.96 * se, hi: d + 1.96 * se, pend: pend, nAviso: nAviso, nControl: nControl, incremental: d * a.n };
  };
  srv.asignarExperimento = function () {
    var s = S(), R = U.rng(s.experimento.semilla);
    var elig = s.hogares.filter(function (h) {
      return h.consent.estado === 'vigente' && Object.keys(h.entregas).some(function (k) { return h.entregas[k].length >= 2; });
    });
    var forced = {};
    s.hogares.forEach(function (h) { if (h._flags && h._flags.grupo) forced[h.id] = h._flags.grupo; });
    var sinForzar = elig.filter(function (h) { return !forced[h.id]; });
    // las 8 primeras (H-001..H-008) y las sugeridas de hoy quedan en «aviso» para la demostración
    // asignación estable: depende solo de la semilla y del identificador del hogar, no del orden ni del tamaño de la población
    sinForzar.forEach(function (h) { h.grupo = U.hash(s.experimento.semilla + ':' + h.id) < 0.5 ? 'aviso' : 'control'; });
    elig.forEach(function (h) { if (forced[h.id]) h.grupo = forced[h.id]; });
    for (var i = 1; i <= 8; i++) { var hh = hogar('H-00' + i); if (hh) hh.grupo = 'aviso'; }
    ['H-011', 'H-014', 'H-015', 'H-029'].forEach(function (id) { var x = hogar(id); if (x && x.consent.estado === 'vigente') x.grupo = 'aviso'; });
    var R2 = U.rng(4242);
    elig.forEach(function (h) {
      var g = h.grupo, done = R2() > 0.17;
      h.exp = { grupo: g, recompro30: done ? (R2() < (g === 'aviso' ? 0.74 : 0.55)) : null };
    });
  };

  /* ---------- semilla de eventos (jornada de Marco ya sincronizada) ---------- */
  srv.sembrar = function () {
    var s = S(), R = U.rng(99);
    srv.asignarExperimento();
    function suu() { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = (R() * 16) | 0; return (c === 'x' ? r : (r & 3) | 8).toString(16); }); }
    // avisos de ayer
    var hc = hogar('H-012');
    s.avisos.push({ id: nid('av', 'AV-'), hogarId: 'H-012', prodId: 'GLP10', ciclo: est.estimar(hc, 'GLP10').last, fecha: U.addDays(s.hoy, -1), hora: '10:20', modo: 'manual', estado: 'enviado', respuesta: null, pedidoId: null, plantilla: 'T1', categoria: 'marketing', costo: 0, texto: srv.textoAviso(hc, 'GLP10'), grupo: hc.grupo, qty: 1 });
    srv.msg(hc, 'out', s.avisos[0].texto, { tipo: 'plantilla', plantilla: 'T1', estado: 'entregado', avisoId: s.avisos[0].id }); s.mensajes[0].t = App.clock.min - 1440 + 70;
    // un hogar que escribió hace poco (ventana de 24 h abierta)
    var hm = hogar('H-020');
    var m = srv.msg(hm, 'in', 'Buenas, ¿tienen balón de 10 para hoy en la tarde?', { tipo: 'libre' }); m.t = App.clock.min - 95;
    // pedidos de hoy
    function P(hid, items, origen, estado, rep, notas) { return srv.crearPedido({ hogarId: hid, items: items, origen: origen, estado: estado, repartidorId: rep, notas: notas || '', por: 'Julio Ramos' }); }
    var abierto = P('H-011', [{ p: 'GLP10', qty: 1 }], 'llamada', 'confirmado', null, 'Pidió por teléfono ayer');
    var lm = P('H-020', [{ p: 'GLP10', qty: 1 }], 'mensaje', 'por_confirmar', null, 'Mensaje libre: «¿tienen balón de 10 para hoy en la tarde?»');
    P('H-016', [{ p: 'GLP10', qty: 1 }], 'recurrente', 'confirmado', null, 'Pedido recurrente: cada 29 días');
    P('H-030', [{ p: 'GLP10', qty: 2 }], 'llamada', 'confirmado', null);
    P('H-019', [{ p: 'GLP5', qty: 1 }], 'aviso', 'confirmado', null);
    var luisIds = [
      P('H-017', [{ p: 'AGUA20', qty: 2 }], 'recurrente', 'asignado', 'U-R1', 'Pedido recurrente: cada 3 días'),
      P('H-021', [{ p: 'GLP10', qty: 1 }], 'llamada', 'asignado', 'U-R1'),
      P('H-022', [{ p: 'GLP45', qty: 1 }], 'llamada', 'asignado', 'U-R1', 'Pollería: entrega por la puerta trasera'),
      P('H-023', [{ p: 'AGUA20', qty: 1 }], 'aviso', 'asignado', 'U-R1'),
      P('H-024', [{ p: 'GLP10', qty: 1 }], 'aviso', 'asignado', 'U-R1'),
      P('H-031', [{ p: 'GLP10', qty: 1 }], 'llamada', 'asignado', 'U-R1', 'Cobra con Yape'),
      P('H-032', [{ p: 'GLP5', qty: 1 }], 'recurrente', 'asignado', 'U-R1')
    ];
    // cancelado
    var cx = P('H-033', [{ p: 'GLP10', qty: 1 }], 'llamada', 'por_confirmar', null); srv.cancelarPedido(cx, 'El cliente ya compró en otro local');
    // carga de Luis
    var jl = srv.jornada('U-R1'); jl.carga = { llenos: { BAL10: 10, BAL5: 3, BAL45: 1, BID20: 12 }, vacios: {} };
    // jornada de Marco: 8 pedidos ya sincronizados y jornada cerrada en la app
    var jm = srv.jornada('U-R2'); jm.carga = { llenos: { BAL10: 14, BAL5: 4, BID20: 25 }, vacios: {} }; jm.cargaConfirmada = true;
    var hs = ['H-034', 'H-035', 'H-036', 'H-037', 'H-038', 'H-039', 'H-040', 'H-041'];
    var plan = [
      ['GLP10', 1, 'efectivo'], ['GLP10', 1, 'qr_negocio'], ['AGUA20', 2, 'efectivo'], ['GLP5', 1, 'efectivo'],
      ['GLP10', 1, 'enlace'], ['AGUA20', 1, 'efectivo'], ['GLP10', 1, 'fiado'], ['GLP10', 1, 'qr_negocio']
    ];
    var seqM = 0, t0 = 7 * 60 + 40;
    function hh(min) { return s.hoy + 'T' + U.pad(Math.floor(min / 60)) + ':' + U.pad(min % 60); }
    var evs = [];
    function E(tipo, p, min) { seqM++; evs.push({ uuid: suu(), seq: seqM, tipo: tipo, hora: hh(min), p: p }); }
    plan.forEach(function (pl, i) {
      var hid = hs[i], pr = s.productos[pl[0]];
      var ped = srv.crearPedido({ hogarId: hid, items: [{ p: pl[0], qty: pl[1] }], origen: i % 3 === 0 ? 'recurrente' : 'llamada', estado: 'asignado', repartidorId: 'U-R2', por: 'Julio Ramos' });
      var total = pr.precio * pl[1], min = t0 + i * 24;
      E('entrega.registrada', { pedidoId: ped.id, items: ped.items, total: total, hogarId: hid }, min);
      E('envase.movimiento', { pedidoId: ped.id, hogarId: hid, envase: pr.envase, llenos: pl[1], vacios: pl[1], marca: 'propia' }, min);
      var cp = { pedidoId: ped.id, hogarId: hid, medio: pl[2], monto: total };
      if (pl[2] === 'efectivo') { cp.recibido = Math.ceil(total / 10) * 10; cp.vuelto = cp.recibido - total; }
      E('cobro.registrado', cp, min);
      if (pl[2] === 'enlace') s.pagoLinks[ped.id] = { estado: 'pagado', cargo: 'CH-seed' };
    });
    var nped = srv.crearPedido({ hogarId: 'H-042', items: [{ p: 'GLP10', qty: 1 }], origen: 'llamada', estado: 'asignado', repartidorId: 'U-R2', por: 'Julio Ramos' });
    E('entrega.no_realizada', { pedidoId: nped.id, motivo: 'No estaba' }, t0 + 8 * 24);
    var tot = { efectivo: 0, qr_negocio: 0, enlace: 0, fiado: 0 };
    plan.forEach(function (pl) { tot[pl[2]] += s.productos[pl[0]].precio * pl[1]; });
    E('jornada.cerrada', { totales: tot, envases: {} }, t0 + 9 * 24);
    var d2 = s.dispositivos['U-R2'];
    var batch = evs.map(function (e) { return e; });
    srv.recibirLote('U-R2', batch, 0);
    s.pagos.push({ id: 'CH-seed', pedidoId: s.pedidos.filter(function (p) { return p.hogarId === 'H-038'; })[0].id, monto: 52, celular: '•••• ••• 238', estado: 'pagado', ts: hh(t0 + 5 * 24), pasarela: 'Culqi (simulada)', moneda: 'PEN' });
    d2.ultimoContacto = hh(t0 + 9 * 24 + 2);
    // cuadres de días anteriores (histórico)
    [['2026-11-05', 'U-R1', 412, 412, ''], ['2026-11-05', 'U-R2', 530, 524, 'Vuelto mal dado en una entrega de agua'], ['2026-11-04', 'U-R1', 388, 388, ''], ['2026-11-04', 'U-R2', 466, 466, ''], ['2026-11-03', 'U-R1', 351, 345, 'Cliente dijo «ya pagué» sin comprobante'], ['2026-11-03', 'U-R2', 498, 498, '']].forEach(function (x, i) {
      s.jornadas.push({ id: 'J-' + x[0].replace(/-/g, '') + '-' + x[1], fecha: x[0], userId: x[1], estado: 'cuadrada', carga: { llenos: {}, vacios: {} }, cierreApp: { ts: x[0] + 'T18:30' }, historico: { esperado: x[2], real: x[3], motivo: x[4], dur: [4.5, 6.2, 3.8, 3.1, 7.4, 3.9][i] } });
    });
    // auditoría de ejemplo
    srv.audit('Cambió precio', 'GLP 10 kg: S/ 50.00 → S/ 52.00', 'Rosa Medina (dueña)');
    srv.audit('Anuló cobro', 'C-018 (contra-asiento): cobro duplicado por reintento del cliente', 'Rosa Medina (dueña)');
    srv.audit('Dio de baja avisos', 'H-010 vía «No volver a escribir»', 'Plataforma');
    s.auditoria.forEach(function (a, i) { a.ts = U.addDays(s.hoy, -(i + 1)) + 'T1' + (i % 9) + ':0' + (i % 6); });
    s.dispositivos['U-R1'].ultimoContacto = null;
  };

  /* =====================================================
     Dispositivo S1 (teléfono del repartidor)
     ===================================================== */
  App.initSim = function () { App.sim = { net: 'online', auto: true, syncing: false, kb: 0, msg: null }; };
  App.initSim();
  srv.resetSeq = function () { Object.keys(seq).forEach(function (k) { seq[k] = k === 'ped' ? 1000 : k === 'hog' ? 200 : 0; }); };
  dev.get = function () { var s = S(); return s.deviceUser ? s.devices[s.deviceUser] : null; };
  dev.ensure = function (userId) {
    var s = S();
    if (!s.devices[userId]) s.devices[userId] = { userId: userId, logged: false, pkg: null, events: [], seq: 0, cobros: [], envMov: [], lastSync: null, jornadaCerrada: false, revocado: false, historial: [] };
    return s.devices[userId];
  };
  dev.login = function (userId, pin) {
    var s = S(), u = s.usuarios.filter(function (x) { return x.id === userId; })[0];
    if (s.dispositivos[userId].revocado) return { ok: false, motivo: 'Este dispositivo fue revocado por el dueño. Contacte al distribuidor.' };
    if (!u || u.pin !== pin) return { ok: false, motivo: 'PIN incorrecto. Para la demostración, el PIN es 1234.' };
    s.deviceUser = userId; var d = dev.ensure(userId); d.logged = true;
    if (userId === 'U-R2' && !d.pkg) dev.cargarMarco(d);
    return { ok: true };
  };
  dev.cargarMarco = function (d) {
    var s = S();
    var peds = s.pedidos.filter(function (p) { return p.repartidorId === 'U-R2'; });
    d.pkg = { descargado: s.hoy + 'T07:35', carga: s.jornadas.filter(function (j) { return j.userId === 'U-R2' && j.fecha === s.hoy; })[0].carga, pedidos: peds.map(dev.itemPaquete), probables: [], hogares: {} };
    d.jornadaCerrada = true; d.lastSync = s.hoy + 'T09:02';
  };
  dev.itemPaquete = function (p) {
    var h = hogar(p.hogarId), s = S();
    return { id: p.id, hogarId: p.hogarId, nombre: h ? h.nombre : '?', dir: h ? h.dir : '', ref: h ? h.ref : '', distrito: h ? h.distrito : '', tel: h ? h.tel : '', items: p.items.map(function (i) { return { p: i.p, qty: i.qty, precio: i.precio }; }), total: p.total, estado: p.estado === 'entregado' ? 'entregado' : p.estado === 'no_entregado' ? 'no_entregado' : 'pendiente', origen: p.origen, notas: p.notas, orden: 0, saldoEnv: h ? JSON.parse(JSON.stringify(h.envSaldo)) : {}, deuda: h ? h.deuda : 0, nuevo: false, cancelado: false, garantia: h ? h.garantia : 0, consent: h ? h.consent.estado : 'ninguno' };
  };
  dev.descargar = function () {
    var s = S(), d = dev.get();
    if (App.sim.net === 'offline') return { ok: false, motivo: 'Sin señal. Para iniciar la jornada necesita conectarse y descargar el paquete del día (RF-APP-01).' };
    var j = srv.jornada(d.userId);
    var peds = s.pedidos.filter(function (p) { return p.repartidorId === d.userId && ['asignado', 'en_ruta'].indexOf(p.estado) >= 0; });
    var probables = s.flags.probables ? s.avisos.filter(function (a) { return !a.respuesta && (a.estado === 'enviado' || a.estado === 'entregado') && !s.pedidos.some(function (p) { return p.avisoId === a.id; }); }).map(function (a) {
      var h = hogar(a.hogarId); return { avisoId: a.id, hogarId: h.id, nombre: h.nombre, dir: h.dir, ref: h.ref, tel: h.tel, p: a.prodId, qty: a.qty || 1, fecha: a.fecha };
    }) : [];
    d.pkg = { descargado: App.clock.stamp(), carga: JSON.parse(JSON.stringify(j.carga)), pedidos: peds.map(dev.itemPaquete), probables: probables, hogares: {} };
    d.pkg.pedidos.forEach(function (p, i) { p.orden = i + 1; });
    d.cobros = []; d.envMov = []; d.cargaOk = j.cargaConfirmada;
    App.sim.kb += 38;
    s.dispositivos[d.userId].ultimoContacto = App.clock.stamp();
    srv.audit('Descargó el paquete del día', nombreUsuario(d.userId) + ' (' + peds.length + ' pedidos)', nombreUsuario(d.userId));
    return { ok: true };
  };

  dev.enqueue = function (tipo, p) {
    var d = dev.get();
    d.seq++;
    var ev = { uuid: U.uuid(), seq: d.seq, tipo: tipo, hora: App.clock.stamp(), p: p, estado: 'pendiente', intentos: 0, motivo: null, tSeg: Date.now() };
    d.events.push(ev);
    App.clock.tick(1);
    App.emit('device');
    if (App.sim.auto && App.sim.net !== 'offline') dev.programarSync();
    return ev;
  };
  var syncTimer = null;
  dev.programarSync = function (ms) {
    clearTimeout(syncTimer);
    syncTimer = setTimeout(function () { dev.sync(); }, ms || 1300);
  };
  dev.pendientes = function () { var d = dev.get(); return d ? d.events.filter(function (e) { return e.estado === 'pendiente' || e.estado === 'reintentar'; }) : []; };
  dev.sync = function () {
    var s = S(), d = dev.get();
    if (!d || !d.logged) return;
    if (App.sim.net === 'offline') { App.sim.msg = 'Sin señal: los eventos siguen guardados en el teléfono.'; App.emit('device'); return; }
    if (App.sim.syncing) return;
    var pend = dev.pendientes();
    if (!pend.length) { dev.traerCambios(d); App.emit('device'); return; }
    App.sim.syncing = true; App.sim.msg = null; App.emit('device');
    var batches = [], i;
    for (i = 0; i < pend.length; i += 20) batches.push(pend.slice(i, i + 20));
    var step = function (bi) {
      if (bi >= batches.length) { App.sim.syncing = false; dev.traerCambios(d); d.lastSync = App.clock.stamp(); App.emit('change'); return; }
      setTimeout(function () {
        if (App.sim.net === 'offline') { App.sim.syncing = false; App.sim.msg = 'Se perdió la señal durante el envío: los eventos pendientes se conservan.'; App.emit('change'); return; }
        if (App.sim.net === 'debil' && Math.random() < 0.45) {
          batches[bi].forEach(function (e) { e.intentos++; e.estado = 'reintentar'; });
          App.sim.syncing = false; App.sim.msg = 'Señal débil: el lote no llegó. Reintentando en unos segundos.'; App.emit('change');
          dev.programarSync(2600); return;
        }
        var restantes = pend.length - (bi + 1) * 20;
        var res = srv.recibirLote(d.userId, batches[bi], Math.max(0, restantes));
        if (res.revocado) { dev.revocar(d); return; }
        res.acuses.forEach(function (ac) {
          var ev = d.events.filter(function (x) { return x.uuid === ac.uuid; })[0]; if (!ev) return;
          ev.estado = ac.estado; ev.motivo = ac.motivo || null;
        });
        App.sim.kb += Math.max(1, Math.round(batches[bi].length * 0.4));
        App.emit('change');
        step(bi + 1);
      }, App.sim.net === 'debil' ? 1100 : 500);
    };
    step(0);
  };
  dev.reenviarUltimoLote = function () {
    // prueba de idempotencia: reenvía eventos ya aceptados
    var d = dev.get(), s = S();
    var acked = d.events.filter(function (e) { return e.estado === 'aceptado' || e.estado === 'duplicado'; }).slice(-6);
    if (!acked.length) return { n: 0, dup: 0 };
    var res = srv.recibirLote(d.userId, acked, 0), dup = 0;
    res.acuses.forEach(function (a) { if (a.estado === 'duplicado') dup++; });
    App.emit('change');
    return { n: acked.length, dup: dup };
  };
  dev.traerCambios = function (d) {
    var s = S(), ch = s.cambios[d.userId] || [];
    if (!ch.length || !d.pkg) return;
    ch.forEach(function (c) {
      var ped = pedido(c.pedidoId); if (!ped) return;
      if (c.tipo === 'asignado') {
        if (!d.pkg.pedidos.some(function (x) { return x.id === ped.id; })) { var it = dev.itemPaquete(ped); it.nuevo = true; it.orden = d.pkg.pedidos.length + 1; d.pkg.pedidos.push(it); }
      } else if (c.tipo === 'cancelado') {
        var loc = d.pkg.pedidos.filter(function (x) { return x.id === ped.id; })[0];
        if (loc && loc.estado === 'pendiente') loc.cancelado = true;
      }
    });
    s.cambios[d.userId] = [];
  };
  dev.revocar = function (d) {
    var s = S();
    App.sim.syncing = false;
    d.logged = false; d.pkg = null; d.events = []; d.revocado = true; s.deviceUser = null;
    App.sim.msg = 'Dispositivo revocado por el dueño: se cerró la sesión y se borraron los datos locales.';
    App.emit('change');
  };

  /* ---------- acciones del repartidor ---------- */
  dev.pedidoLocal = function (id) { var d = dev.get(); return d.pkg.pedidos.filter(function (p) { return p.id === id; })[0]; };
  dev.confirmarCarga = function (llenos) {
    var d = dev.get(); d.pkg.carga = { llenos: llenos, vacios: {} }; d.cargaOk = true;
    dev.enqueue('carga.confirmada', { llenos: llenos, vacios: {} });
  };
  dev.registrarEntrega = function (o) {
    var d = dev.get(), p = dev.pedidoLocal(o.pedidoId);
    if (d.jornadaCerrada) return { ok: false, motivo: 'La jornada ya está cerrada.' };
    var total = o.items.reduce(function (a, i) { return a + i.qty * i.precio; }, 0);
    if (o.cobro.medio === 'fiado') {
      var lim = S().config.limiteFiado;
      if ((p.deuda || 0) + total > lim) return { ok: false, motivo: 'Supera el límite de fiado de ' + U.money(lim) + ' (deuda actual ' + U.money(p.deuda || 0) + ').' };
    }
    p.items = o.items; p.total = total; p.estado = 'entregado'; p.foto = !!o.foto;
    dev.enqueue('entrega.registrada', { pedidoId: p.id, hogarId: p.hogarId, items: o.items, total: total, foto: !!o.foto });
    var env = {};
    o.items.forEach(function (i) { var e = S().productos[i.p].envase; env[e] = env[e] || { llenos: 0, vacios: 0 }; env[e].llenos += i.qty; });
    Object.keys(o.vacios || {}).forEach(function (e) { env[e] = env[e] || { llenos: 0, vacios: 0 }; env[e].vacios += o.vacios[e]; });
    Object.keys(env).forEach(function (e) {
      var ev = { pedidoId: p.id, hogarId: p.hogarId, envase: e, llenos: env[e].llenos, vacios: env[e].vacios, marca: o.marca || 'propia' };
      if (o.garantia && o.garantia.tipo !== 'ninguna' && o.garantia.envase === e) ev.garantia = { tipo: o.garantia.tipo, monto: o.garantia.monto };
      dev.enqueue('envase.movimiento', ev);
      d.envMov.push(ev);
      p.saldoEnv[e] = Math.max(0, (p.saldoEnv[e] || 0) + env[e].llenos - env[e].vacios);
    });
    var cp = { pedidoId: p.id, hogarId: p.hogarId, medio: o.cobro.medio, monto: total };
    if (o.cobro.medio === 'efectivo') { cp.recibido = o.cobro.recibido || total; cp.vuelto = Math.max(0, cp.recibido - total); }
    if (o.cobro.medio === 'fiado') p.deuda = (p.deuda || 0) + total;
    dev.enqueue('cobro.registrado', cp);
    d.cobros.push(cp);
    if (o.consent) dev.enqueue('consentimiento.registrado', { hogarId: p.hogarId, medio: 'verbal_entrega', texto: 'Aviso de reposición por WhatsApp (leído al hogar)' });
    return { ok: true };
  };
  dev.noEntregado = function (id, motivo) {
    var p = dev.pedidoLocal(id); p.estado = 'no_entregado'; p.motivo = motivo;
    dev.enqueue('entrega.no_realizada', { pedidoId: id, motivo: motivo });
  };
  dev.altaHogar = function (o) {
    var d = dev.get(), s = S();
    var dup = s.hogares.filter(function (h) { return h.tel.replace(/\s/g, '') === o.tel.replace(/\s/g, ''); })[0];
    if (dup) return { ok: false, motivo: 'El celular ya está registrado en ' + dup.id + ' (' + dup.nombre + '). Búsquelo en la lista.' };
    var id = 'H-L' + U.short(U.uuid()).slice(0, 5).toUpperCase();
    var consent = o.consent ? { estado: 'vigente', fecha: s.hoy, medio: 'verbal_entrega', texto: 'Aviso de reposición por WhatsApp (leído al hogar)', por: nombreUsuario(d.userId) } : undefined;
    dev.enqueue('hogar.alta', { id: id, nombre: o.nombre, tel: o.tel, dir: o.dir, ref: o.ref, loc: o.loc || null, distrito: 'Comas', productos: o.productos, consent: consent });
    d.pkg.hogares[id] = { id: id, nombre: o.nombre, tel: o.tel, dir: o.dir, ref: o.ref, productos: o.productos, saldoEnv: {}, deuda: 0, nuevo: true };
    return { ok: true, id: id };
  };
  dev.ventaRuta = function (o) {
    var d = dev.get(), s = S();
    var hg = o.hogarId;
    var id = 'PL-' + U.short(U.uuid()).slice(0, 6).toUpperCase();
    var items = o.items.map(function (i) { return { p: i.p, qty: i.qty, precio: s.productos[i.p].precio }; });
    var total = srv.totalItems(items);
    var h = hogar(hg), loc = d.pkg.hogares[hg];
    var base = h ? { nombre: h.nombre, dir: h.dir, ref: h.ref, tel: h.tel, saldoEnv: JSON.parse(JSON.stringify(h.envSaldo)), deuda: h.deuda } : { nombre: loc.nombre, dir: loc.dir, ref: loc.ref, tel: loc.tel, saldoEnv: {}, deuda: 0 };
    d.pkg.pedidos.push({ id: id, hogarId: hg, nombre: base.nombre, dir: base.dir, ref: base.ref, distrito: '', tel: base.tel, items: items, total: total, estado: 'pendiente', origen: 'ruta', notas: 'Venta en ruta', orden: d.pkg.pedidos.length + 1, saldoEnv: base.saldoEnv, deuda: base.deuda, nuevo: false, cancelado: false, local: true });
    dev.enqueue('pedido.creado', { id: id, hogarId: hg, items: items });
    return { ok: true, id: id };
  };
  dev.resumen = function () {
    var d = dev.get(), r = { entregados: 0, noEnt: 0, pend: 0, by: { efectivo: 0, qr_negocio: 0, enlace: 0, fiado: 0 }, total: 0, llenosVeh: {}, vaciosRec: 0 };
    if (!d || !d.pkg) return r;
    d.pkg.pedidos.forEach(function (p) {
      if (p.cancelado && p.estado === 'pendiente') return;
      if (p.estado === 'entregado') r.entregados++; else if (p.estado === 'no_entregado') r.noEnt++; else r.pend++;
    });
    (d.cobros || []).forEach(function (c) { r.by[c.medio] += c.monto; r.total += c.monto; });
    var lleno = JSON.parse(JSON.stringify(d.pkg.carga.llenos || {}));
    (d.envMov || []).forEach(function (m) { lleno[m.envase] = (lleno[m.envase] || 0) - m.llenos; r.vaciosRec += m.vacios; });
    r.llenosVeh = lleno;
    return r;
  };
  dev.cerrarJornada = function () {
    var d = dev.get(), r = dev.resumen();
    if (r.pend > 0) return { ok: false, motivo: 'Quedan ' + r.pend + ' pedidos sin resolver. Marque cada uno como entregado o no entregado.' };
    d.jornadaCerrada = true;
    dev.enqueue('jornada.cerrada', { totales: r.by, envases: r.llenosVeh });
    return { ok: true };
  };
  dev.cerrarApp = function () { var s = S(); App.emit('device-kill'); };
})();

/* S1 — App del repartidor (teléfono simulado). Funciona sin conexión: todo se guarda primero en el teléfono. */
(function () {
  'use strict';
  var App = window.App, U = App.U, UI = App.UI, ic = App.ic, esc = U.esc, rf = App.rf, dev = App.dev, srv = App.srv;
  var S = function () { return App.S; };
  var st = { screen: 'login', params: {}, forms: {}, sheet: null, pin: '', user: 'U-R1', filtro: 'todos', q: '', ordenar: false, vq: '', altaT0: null, msg: null, ventaSel: null };
  var NAV = [['inicio', 'Hoy', 'home'], ['lista', 'Lista', 'list'], ['sync', 'Sincro', 'refresh'], ['cierre', 'Cierre', 'ledger']];
  var FORM_SCREENS = ['entrega', 'alta', 'venta'];

  function d() { return dev.get(); }
  function pkg() { var x = d(); return x && x.pkg; }
  function minOf(iso) { var t = iso.split('T')[1].split(':'); return +t[0] * 60 + +t[1]; }
  function go(screen, params) { st.screen = screen; st.params = params || {}; st.sheet = null; render(); }
  App.s1 = {
    reset: function () { st = { screen: 'login', params: {}, forms: {}, sheet: null, pin: '', user: 'U-R1', filtro: 'todos', q: '', ordenar: false, vq: '', altaT0: null, msg: null, ventaSel: null }; },
    go: go,
    onDevice: function () {
      if (FORM_SCREENS.indexOf(st.screen) >= 0 || st.sheet) { chrome(); return; }
      render();
    }
  };
  App.on('device-kill', function () {
    var x = d(); var n = x ? x.events.filter(function (e) { return e.estado === 'pendiente' || e.estado === 'reintentar'; }).length : 0;
    st.screen = x && x.logged ? 'inicio' : 'login'; st.sheet = null; st.forms = {};
    render(); UI.toast('La app se cerró a la fuerza. ' + n + ' evento(s) siguen guardados en el teléfono.', 'info');
  });

  /* ---------- piezas del marco del teléfono ---------- */
  function pillHtml() {
    var x = d(), pend = x ? dev.pendientes().length : 0, sim = App.sim;
    var k, txt;
    if (sim.syncing) { k = 'busy'; txt = 'Enviando…'; }
    else if (sim.net === 'offline') { k = 'off'; txt = pend ? 'Sin conexión, ' + pend + ' por enviar' : 'Sin conexión'; }
    else if (sim.net === 'debil') { k = pend ? 'pend' : 'on'; txt = pend ? 'Señal débil, ' + pend + ' por enviar' : 'Señal débil, al día'; }
    else if (pend) { k = 'pend'; txt = 'En línea, ' + pend + ' por enviar'; }
    else { k = 'on'; txt = 'En línea, al día'; }
    if (sim.msg && !sim.syncing && sim.net !== 'offline' && /Reintentando/.test(sim.msg)) { k = 'err'; txt = 'Error, reintentando'; }
    return '<button class="sync ' + k + '" id="s1-pill" data-act="s1.nav" data-v="sync"' + rf('RF-APP-10') + '><span class="dot"></span>' + txt + '</button>';
  }
  function bannerHtml() {
    var sim = App.sim, x = d(), h = '';
    if (sim.net === 'offline') h += '<div class="p-offline">' + ic('wifioff', 16) + '<span>Modo sin conexión: todo se guarda en el teléfono y se envía solo cuando vuelva la señal.</span></div>';
    else if (sim.net === 'debil') h += '<div class="p-offline weak">' + ic('signal', 16) + '<span>Señal débil: los envíos pueden fallar y se reintentan solos.</span></div>';
    if (x && x.logged) {
      var old = x.events.filter(function (e) { return (e.estado === 'pendiente' || e.estado === 'reintentar') && App.clock.min - minOf(e.hora) > S().config.pendienteHoras * 60; });
      if (old.length) h += '<div class="p-offline" style="background:#fdeaea;color:#a12626;border-color:#f3b8b8">' + ic('alert', 16) + '<span>Hay ' + old.length + ' evento(s) sin enviar hace más de ' + S().config.pendienteHoras + ' h. Busque señal para sincronizar.</span></div>';
    }
    return '<div id="s1-banner">' + h + '</div>';
  }
  function chrome() {
    var p = document.getElementById('s1-pill'); if (p) p.outerHTML = pillHtml();
    var b = document.getElementById('s1-banner'); if (b) b.outerHTML = bannerHtml();
    var sp = document.getElementById('s1-sim'); if (sp) sp.innerHTML = simInner();
    UI.decorate(document.getElementById('view'));
    var cl = document.getElementById('s1-clock'); if (cl) cl.textContent = App.clock.hhmm();
  }

  function title() {
    return { login: 'Ingreso', inicio: 'Mi jornada', lista: 'Entregas del día', entrega: 'Entrega', venta: 'Venta en ruta', alta: 'Hogar nuevo', sync: 'Sincronización', cierre: 'Cierre de jornada' }[st.screen];
  }
  function badge(n) { return n > 0 ? '<span class="cnt">' + n + '</span>' : ''; }

  function render() {
    var host = document.getElementById('view'); if (!host || App.route.sys !== 's1') return;
    host.innerHTML = '<div class="s1-stage">' + leftCol() + phoneHtml() + '<aside class="s1-side" id="s1-sim">' + simInner() + '</aside></div>';
    UI.mountTables(host); UI.decorate(host);
    var b = host.querySelector('.p-body'); if (b && st._sc != null && st._scKey === st.screen) b.scrollTop = st._sc;
  }
  function phoneHtml() {
    var x = d(), logged = x && x.logged, sim = App.sim;
    var net = sim.net === 'offline' ? ic('wifioff', 14) + '<span>Sin servicio</span>' : sim.net === 'debil' ? ic('signal', 14) + '<span>3G</span>' : ic('wifi', 14) + '<span>4G</span>';
    var back = ['entrega', 'venta', 'alta'].indexOf(st.screen) >= 0;
    var pend = x ? dev.pendientes().length : 0;
    var p = pkg(), nPend = p ? p.pedidos.filter(function (q) { return q.estado === 'pendiente' && !(q.cancelado); }).length : 0;
    var h = '<div class="phone"><div class="pscr">' +
      '<div class="p-status"><span id="s1-clock">' + App.clock.hhmm() + '</span><span class="r">' + net + '</span></div>';
    if (logged) {
      h += '<div class="p-head">' + (back ? '<button class="p-back" data-act="s1.back" aria-label="Volver">' + ic('chevl', 22) + '</button>' : '') + '<h1>' + title() + '</h1>' + pillHtml() + '</div>';
      h += bannerHtml();
    } else h += '<div id="s1-banner"></div>';
    h += '<div class="p-body" id="s1-body">' + body() + '</div>';
    if (logged) {
      h += '<nav class="p-nav">' + NAV.map(function (n) {
        var c = n[0] === 'lista' ? badge(nPend) : n[0] === 'sync' ? badge(pend) : '';
        return '<button class="' + (st.screen === n[0] ? 'on' : '') + '" data-act="s1.nav" data-v="' + n[0] + '">' + ic(n[2], 22) + n[1] + c + '</button>';
      }).join('') + '</nav>';
    }
    if (st.sheet) h += sheetHtml();
    return h + '</div></div>';
  }
  function body() {
    var x = d();
    if (!x || !x.logged) return loginBody();
    switch (st.screen) {
      case 'inicio': return inicioBody();
      case 'lista': return listaBody();
      case 'entrega': return entregaBody();
      case 'venta': return ventaBody();
      case 'alta': return altaBody();
      case 'sync': return syncBody();
      case 'cierre': return cierreBody();
    }
    return '';
  }

  /* ---------- ingreso (RF-SEG-03) ---------- */
  function loginBody() {
    var us = S().usuarios.filter(function (u) { return u.rol === 'repartidor'; });
    var dots = '<div class="pin-dots">' + [0, 1, 2, 3].map(function (i) { return '<i class="' + (i < st.pin.length ? 'f' : '') + '"></i>'; }).join('') + '</div>';
    var keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map(function (k) { return k === '' ? '<span></span>' : '<button data-act="s1.key" data-v="' + k + '">' + k + '</button>'; }).join('');
    var msg = App.sim.msg && /revocado/i.test(App.sim.msg) ? '<div class="note bad" style="margin-bottom:10px">' + esc(App.sim.msg) + '</div>' : '';
    return '<div' + rf('RF-SEG-03') + '>' + msg + '<div class="login-art">' + App.brandMark('cyl-mark') + '<h2>Retorna Reparto</h2><p class="mut">' + esc(S().empresa.nombre) + '</p></div>' +
      '<div class="p-chips" style="justify-content:center">' + us.map(function (u) { return '<button class="' + (st.user === u.id ? 'on' : '') + '" data-act="s1.user" data-v="' + u.id + '">' + esc(u.nombre) + '</button>'; }).join('') + '</div>' +
      '<p class="center mut" style="font-size:13px;margin:0">Ingrese su PIN de 4 dígitos (de prueba: 1234)</p>' + dots + '<div class="keypad">' + keys + '</div>' +
      '<p class="center mut" style="font-size:12.5px;margin-top:14px">La sesión sigue válida sin red durante toda la jornada.</p></div>';
  }
  App.acts['s1.user'] = function (el) { st.user = el.dataset.v; st.pin = ''; render(); };
  App.acts['s1.key'] = function (el) {
    var k = el.dataset.v;
    if (k === '⌫') st.pin = st.pin.slice(0, -1); else if (st.pin.length < 4) st.pin += k;
    if (st.pin.length === 4) {
      var r = dev.login(st.user, st.pin);
      st.pin = '';
      if (!r.ok) { UI.toast(r.motivo, 'bad'); render(); return; }
      App.sim.msg = null; st.screen = 'inicio'; UI.toast('Sesión iniciada', 'ok'); render(); return;
    }
    render();
  };

  /* ---------- inicio de jornada ---------- */
  function inicioBody() {
    var x = d(), p = pkg(), s = S(), us = s.usuarios.filter(function (u) { return u.id === x.userId; })[0];
    var h = '<div class="row sb" style="margin-bottom:12px"><div><b style="font-size:17px">Hola, ' + esc(us.nombre.split(' ')[0]) + '</b><div class="mut" style="font-size:13.5px">' + U.dow(s.hoy) + ' ' + U.dmy(s.hoy) + ', ' + esc(us.vehiculo) + '</div></div></div>';
    if (!p) {
      h += '<div class="pcard2"><b style="font-size:17px">Inicie su jornada</b><p class="sub" style="margin:6px 0 12px">Descargue el paquete del día mientras tenga señal: pedidos, datos mínimos del hogar, precios, saldo de envases y deuda por hogar. Después trabaja sin red.</p>' +
        '<button class="pbtn" data-act="s1.descargar"' + rf('RF-APP-01,RF-DIA-04') + '>' + ic('download', 22) + 'Descargar paquete del día</button>' +
        (App.sim.net === 'offline' ? '<div class="note warn" style="margin-top:10px">Sin señal: conéctese para descargar. Solo el inicio de la jornada exige red.</div>' : '') + '</div>';
      return h;
    }
    var r = dev.resumen(), pend = p.pedidos.filter(function (q) { return q.estado === 'pendiente' && !q.cancelado; });
    var nuevos = p.pedidos.filter(function (q) { return q.nuevo && q.estado === 'pendiente'; });
    var canc = p.pedidos.filter(function (q) { return q.cancelado && q.estado === 'pendiente'; });
    if (x.jornadaCerrada) h += '<div class="note ok" style="margin-bottom:12px">Jornada cerrada. El despachador hará el cuadre en el portal.</div>';
    if (nuevos.length || canc.length) h += '<div class="note" style="margin-bottom:12px"' + rf('RF-DIA-06') + '>' + (nuevos.length ? ic('inbox', 15) + ' ' + nuevos.length + ' pedido(s) nuevo(s) asignado(s) desde su descarga. ' : '') + (canc.length ? ic('alert', 15) + ' ' + canc.length + ' pedido(s) cancelado(s) por el despachador.' : '') + '</div>';
    h += '<div class="p-tiles"><div class="p-tile"><div class="v">' + r.entregados + '<small class="mut" style="font-size:15px">/' + (r.entregados + r.noEnt + r.pend) + '</small></div><div class="l">Entregas hechas</div></div>' +
      '<div class="p-tile"><div class="v">' + U.money(r.total) + '</div><div class="l">Cobrado hoy</div></div>' +
      '<div class="p-tile"><div class="v">' + Object.keys(r.llenosVeh).reduce(function (a, k) { return a + Math.max(0, r.llenosVeh[k]); }, 0) + '</div><div class="l">Llenos en el vehículo</div></div>' +
      '<div class="p-tile"><div class="v">' + dev.pendientes().length + '</div><div class="l">Eventos por enviar</div></div></div>';
    if (!x.cargaOk && !x.jornadaCerrada) h += '<div class="pcard2 tap" style="margin-top:12px" data-act="s1.carga"' + rf('RF-DIA-03') + '><div class="top"><span class="ord">' + ic('box', 16) + '</span><div><div class="ttl">Confirme la carga del vehículo</div><div class="sub">Llenos y vacíos que salen. Es la base del cuadre de envases.</div></div></div></div>';
    else h += '<div class="p-sec" style="margin-top:14px">Carga del vehículo</div><div class="pcard2" style="padding:6px 14px"' + rf('RF-DIA-03') + '>' + Object.keys(p.carga.llenos).map(function (k) { return '<div class="sumrow"><span>' + esc(s.envases[k].nombre) + ' llenos</span><b>' + Math.max(0, (r.llenosVeh[k] != null ? r.llenosVeh[k] : p.carga.llenos[k])) + ' de ' + p.carga.llenos[k] + '</b></div>'; }).join('') + '</div>';
    if (pend.length && !x.jornadaCerrada) {
      var n = pend[0];
      h += '<div class="p-sec" style="margin-top:14px">Siguiente entrega</div><div class="pcard2 tap" data-act="s1.abrir" data-id="' + n.id + '"><div class="top"><span class="ord">' + n.orden + '</span><div><div class="ttl">' + esc(n.nombre) + '</div><div class="sub">' + esc(n.dir) + '</div></div></div><div class="meta">' + n.items.map(itemChip).join('') + '</div></div>';
    }
    if (p.probables.length && !x.jornadaCerrada) {
      h += '<div class="p-sec" style="margin-top:14px">Probables en su ruta</div><p class="mut" style="font-size:13px;margin:0 0 8px">Recibieron el aviso y aún no respondieron. Ofrézcales el producto si pasa cerca.</p>' + '<div' + rf('RF-DIA-02') + '>' + p.probables.map(function (q) {
        return '<div class="pcard2"><div class="ttl" style="font-size:15.5px">' + esc(q.nombre) + '</div><div class="sub">' + esc(q.dir) + '</div><div class="meta"><span class="pill st-llama">' + ic('flame', 13) + 'Aviso sin respuesta</span></div><button class="pbtn sm ghost" style="margin-top:10px" data-act="s1.ofrecer" data-id="' + q.hogarId + '" data-p="' + q.p + '" data-q="' + q.qty + '">Ofrecer ahora</button></div>';
      }).join('') + '</div>';
    }
    return h;
  }
  function itemChip(i) { return '<span class="pill st-info">' + i.qty + ' × ' + esc(S().productos[i.p].corto) + '</span>'; }
  App.acts['s1.descargar'] = function () {
    var r = dev.descargar();
    if (!r.ok) { UI.toast(r.motivo, 'bad'); return; }
    UI.toast('Paquete descargado. Ya puede trabajar sin conexión.', 'ok'); App.emit('change'); render();
  };
  App.acts['s1.carga'] = function () {
    var p = pkg(); var f = {}; Object.keys(p.carga.llenos).forEach(function (k) { f[k] = p.carga.llenos[k]; });
    st.sheet = { tipo: 'carga', f: f }; render();
  };
  App.acts['s1.cargaStep'] = function (el) { var f = st.sheet.f; f[el.dataset.k] = Math.max(0, f[el.dataset.k] + +el.dataset.d); render(); };
  App.acts['s1.cargaOk'] = function () { dev.confirmarCarga(st.sheet.f); st.sheet = null; UI.toast('Carga confirmada', 'ok'); render(); };

  /* ---------- lista del día (RF-APP-02, RF-DIA-05) ---------- */
  function listaBody() {
    var p = pkg(), x = d();
    if (!p) return '<div class="note warn">Aún no descargó el paquete del día.</div><button class="pbtn mt-s" data-act="s1.nav" data-v="inicio">Ir a mi jornada</button>';
    var peds = p.pedidos.slice().sort(function (a, b) { return a.orden - b.orden; });
    var q = st.q.trim().toLowerCase();
    if (q) peds = peds.filter(function (o) { return (o.nombre + ' ' + o.dir).toLowerCase().indexOf(q) >= 0; });
    var cnt = { todos: peds.length, pendiente: 0, entregado: 0, no_entregado: 0 };
    peds.forEach(function (o) { cnt[o.estado]++; });
    if (st.filtro !== 'todos') peds = peds.filter(function (o) { return o.estado === st.filtro; });
    var h = '<div class="p-search"' + rf('RF-APP-02') + '>' + ic('search', 18) + '<input id="s1q" data-inp="s1.q" placeholder="Buscar por nombre o dirección" value="' + esc(st.q) + '"></div>';
    h += '<div class="p-chips">' + [['todos', 'Todos'], ['pendiente', 'Pendientes'], ['entregado', 'Entregados'], ['no_entregado', 'No entregados']].map(function (c) { return '<button class="' + (st.filtro === c[0] ? 'on' : '') + '" data-act="s1.filtro" data-v="' + c[0] + '">' + c[1] + ' ' + (cnt[c[0]] || 0) + '</button>'; }).join('') + '</div>';
    h += '<div class="row sb" style="margin-bottom:8px"><span class="mut" style="font-size:13px">Orden de visita manual</span><button class="btn btn-sm ' + (st.ordenar ? 'btn-primary' : '') + '" data-act="s1.ordenar"' + rf('RF-DIA-05') + '>' + ic('route', 14) + (st.ordenar ? 'Listo' : 'Ordenar') + '</button></div>';
    if (!peds.length) h += UI.empty('Sin resultados', 'Pruebe con otro filtro o búsqueda.');
    peds.forEach(function (o) {
      var done = o.estado !== 'pendiente';
      h += '<div class="pcard2 ' + (done ? 'done' : 'tap') + '" ' + (done ? '' : 'data-act="s1.abrir" data-id="' + o.id + '"') + '><div class="top"><span class="ord">' + (done ? ic(o.estado === 'entregado' ? 'check' : 'x', 16) : o.orden) + '</span><div class="grow"><div class="ttl">' + esc(o.nombre) + '</div><div class="sub">' + esc(o.dir) + '</div></div>' +
        (st.ordenar && !done ? '<div class="col" style="gap:4px"><button class="btn btn-icon btn-sm" data-act="s1.mover" data-id="' + o.id + '" data-d="-1" aria-label="Subir">' + ic('up', 15) + '</button><button class="btn btn-icon btn-sm" data-act="s1.mover" data-id="' + o.id + '" data-d="1" aria-label="Bajar">' + ic('down', 15) + '</button></div>' : '<b class="num">' + U.money(o.total) + '</b>') + '</div>' +
        '<div class="meta">' + o.items.map(itemChip).join('') + (o.deuda ? '<span class="pill st-warn">' + ic('wallet', 13) + 'Debe ' + U.money(o.deuda) + '</span>' : '') + (o.nuevo ? '<span class="pill st-llama">Nuevo</span>' : '') + (o.cancelado ? '<span class="pill st-bad">' + ic('alert', 13) + 'Cancelado por el despachador</span>' : '') + (o.local ? '<span class="pill st-mute">Venta en ruta</span>' : '') + (o.estado === 'no_entregado' ? '<span class="pill st-bad">' + esc(o.motivo || '') + '</span>' : '') + '</div></div>';
    });
    if (!x.jornadaCerrada) h += '<button class="pbtn llama" style="margin-top:6px" data-act="s1.venta"' + rf('RF-APP-05') + '>' + ic('plus', 20) + 'Venta en ruta</button>';
    return h;
  }
  App.inp['s1.q'] = function (el) {
    st.q = el.value;
    var pos = el.selectionStart;
    render(); var i = document.getElementById('s1q'); if (i) { i.focus(); try { i.setSelectionRange(pos, pos); } catch (e) { /* noop */ } }
  };
  App.acts['s1.filtro'] = function (el) { st.filtro = el.dataset.v; render(); };
  App.acts['s1.ordenar'] = function () { st.ordenar = !st.ordenar; render(); };
  App.acts['s1.mover'] = function (el) {
    var p = pkg(), list = p.pedidos.slice().sort(function (a, b) { return a.orden - b.orden; });
    var i = list.findIndex(function (o) { return o.id === el.dataset.id; }), j = i + +el.dataset.d;
    if (j < 0 || j >= list.length) return;
    var t = list[i].orden; list[i].orden = list[j].orden; list[j].orden = t; render();
  };
  App.acts['s1.abrir'] = function (el) {
    var o = dev.pedidoLocal(el.dataset.id);
    if (!st.forms[o.id]) {
      var vac = {}; o.items.forEach(function (i) { var e = S().productos[i.p].envase; vac[e] = (vac[e] || 0) + i.qty; });
      st.forms[o.id] = { items: o.items.map(function (i) { return { p: i.p, qty: i.qty, precio: i.precio }; }), vacios: vac, marca: 'propia', garantia: { tipo: 'ninguna' }, medio: 'efectivo', recibido: 0, consent: false, foto: false, ok1: false, ok2: false, edit1: false, edit2: false, otro: false, taps: 0 };
    }
    go('entrega', { id: o.id });
  };
  App.acts['s1.nav'] = function (el) { go(el.dataset.v); };
  App.acts['s1.back'] = function () { go(st.screen === 'alta' ? 'venta' : 'lista'); };

  /* ---------- entrega en 3 toques (RF-APP-03 a RF-APP-09, RF-APP-12) ---------- */
  function entregaBody() {
    var o = dev.pedidoLocal(st.params.id), f = st.forms[o.id], s = S();
    var total = f.items.reduce(function (a, i) { return a + i.qty * i.precio; }, 0);
    var envs = {}; f.items.forEach(function (i) { var e = s.productos[i.p].envase; envs[e] = (envs[e] || 0) + i.qty; });
    Object.keys(f.vacios).forEach(function (e) { if (envs[e] == null) envs[e] = 0; });
    var saldo = o.saldoEnv || {};
    var h = '<div class="pcard2"><div class="ttl">' + esc(o.nombre) + '</div><div class="sub">' + esc(o.dir) + (o.ref ? ', ' + esc(o.ref) : '') + '</div><div class="row" style="margin-top:10px;gap:8px">' +
      '<a class="btn btn-sm" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(o.dir + ', ' + (o.distrito || 'Lima') + ', Lima, Perú') + '"' + rf('RF-DIA-05') + '>' + ic('pin', 15) + 'Cómo llegar</a><a class="btn btn-sm" href="tel:' + o.tel.replace(/\s/g, '') + '">' + ic('phone', 15) + 'Llamar</a>' +
      '<span class="touchcount" style="margin-left:auto">Toques ' + Math.min(f.taps, 3) + '/3</span></div>' +
      (o.deuda ? '<div class="meta"><span class="pill st-warn">' + ic('wallet', 13) + 'Debe ' + U.money(o.deuda) + '</span></div>' : '') + '</div>';
    if (o.cancelado) h += '<div class="note bad" style="margin-bottom:10px">El despachador canceló este pedido. Si ya lo entregó, regístrelo igual: la entrega prevalece.</div>';

    /* paso 1: producto */
    h += '<div class="pcard2" ' + rf('RF-APP-03') + '><div class="row sb"><b>1. Producto</b>' + (f.ok1 ? UI.pill('ok', 'Confirmado', 'check') : '') + '</div>' +
      f.items.map(function (i, k) {
        return '<div class="carga-row"><div><b>' + esc(s.productos[i.p].nombre) + '</b><div class="sub">' + U.money(i.precio) + ' c/u</div></div>' + (f.edit1 ? '<div class="stepper" style="min-width:150px"><button data-act="s1.qty" data-k="' + k + '" data-d="-1">−</button><b>' + i.qty + '</b><button data-act="s1.qty" data-k="' + k + '" data-d="1">+</button></div>' : '<b style="font-size:20px">× ' + i.qty + '</b>') + '</div>';
      }).join('') +
      '<div class="row sb" style="margin-top:10px"><span class="mut">Total</span><b class="num" style="font-size:20px">' + U.money(total) + '</b></div>' +
      '<div class="row" style="margin-top:10px;gap:8px"><button class="pbtn sm grow" data-act="s1.ok1">' + ic('check', 19) + (f.edit1 ? 'Confirmar cambios' : 'Mismo producto y cantidad') + '</button>' + (!f.edit1 ? '<button class="pbtn sm ghost" style="width:auto;padding:0 14px" data-act="s1.edit1">Cambiar</button>' : '') + '</div></div>';

    /* paso 2: envases */
    var marcas = s.marcas.filter(function (m) { return m.acepta; });
    h += '<div class="pcard2" ' + rf('RF-APP-06') + '><div class="row sb"><b>2. Envases</b>' + (f.ok2 ? UI.pill('ok', 'Confirmado', 'check') : '') + '</div>' +
      Object.keys(envs).map(function (e) {
        var lleno = envs[e], vac = f.vacios[e] || 0, sd = saldo[e] || 0, exceso = vac > sd + lleno - 0 && vac > sd;
        return '<div style="padding:8px 0;border-bottom:1px solid var(--line)"><div class="row sb"><b>' + esc(s.envases[e].nombre) + '</b><span class="mut" style="font-size:13px">Saldo del hogar: ' + sd + '</span></div><div class="row sb" style="margin-top:6px"><span>Entrega <b>' + lleno + ' lleno(s)</b></span>' +
          (f.edit2 ? '<div class="stepper" style="min-width:170px"><button data-act="s1.vac" data-e="' + e + '" data-d="-1">−</button><b>' + vac + '<small>vacío(s)</small></b><button data-act="s1.vac" data-e="' + e + '" data-d="1">+</button></div>' : '<span>Recoge <b>' + vac + ' vacío(s)</b></span>') + '</div>' +
          (vac > sd + 0 && vac > lleno ? '<div class="note warn" style="margin-top:6px;font-size:12.5px">Recoge más vacíos de los prestados: se registrará como envase recibido sin préstamo (RN-05).</div>' : '') + '</div>';
      }).join('') +
      (f.edit2 ? '<label class="p-lbl">Marca del envase vacío' + (s.config.exigeMarcaVacio ? '' : ' (opcional)') + '</label><select class="p-in" data-chg="s1.marca">' + marcas.map(function (m) { return '<option value="' + m.id + '"' + (f.marca === m.id ? ' selected' : '') + '>' + esc(m.nombre) + '</option>'; }).join('') + '</select>' +
        '<label class="p-lbl">Garantía</label><div class="opt3" style="grid-template-columns:1fr 1fr 1fr">' + [['ninguna', 'Ninguna'], ['cobrada', 'Cobrar'], ['devuelta', 'Devolver']].map(function (g) { return '<button class="opt ' + (f.garantia.tipo === g[0] ? 'on' : '') + '" data-act="s1.gar" data-v="' + g[0] + '">' + g[1] + '<small>' + (g[0] === 'ninguna' ? '' : U.money(s.envases[Object.keys(envs)[0]].garantia)) + '</small></button>'; }).join('') + '</div>' : '') +
      '<div class="row" style="margin-top:10px;gap:8px"><button class="pbtn sm grow" data-act="s1.ok2">' + ic('check', 19) + (f.edit2 ? 'Confirmar envases' : 'Envase 1 por 1') + '</button>' + (!f.edit2 ? '<button class="pbtn sm ghost" style="width:auto;padding:0 14px" data-act="s1.edit2">Cambiar</button>' : '') + '</div></div>';

    /* paso 3: cobro */
    var qrUrl = 'pago.retorna.example/' + o.id;
    h += '<div class="pcard2" ' + rf('RF-APP-07') + '><b>3. Cobro</b>';
    if (!f.otro) {
      h += '<div class="row sb" style="margin:8px 0"><span class="mut">Efectivo exacto</span><b class="num" style="font-size:22px">' + U.money(total) + '</b></div>' +
        '<button class="pbtn llama" data-act="s1.pagar" data-m="efectivo">' + ic('dollar', 21) + 'Cobrar en efectivo y registrar</button>' +
        '<button class="pbtn sm ghost" style="margin-top:8px" data-act="s1.otro">Otro medio de pago o con vuelto</button>';
    } else {
      h += '<div class="opt3" style="margin:10px 0">' +
        '<button class="opt ' + (f.medio === 'efectivo' ? 'on' : '') + '" data-act="s1.medio" data-v="efectivo">' + ic('dollar', 20) + 'Efectivo</button>' +
        '<button class="opt ' + (f.medio === 'qr_negocio' ? 'on' : '') + '" data-act="s1.medio" data-v="qr_negocio">' + ic('qr', 20) + 'QR del negocio<small>Por verificar</small></button>' +
        '<button class="opt ' + (f.medio === 'enlace' ? 'on' : '') + '" data-act="s1.medio" data-v="enlace"' + rf('RF-APP-08') + '>' + ic('link', 20) + 'Enlace de pago<small>Yape en su celular</small></button>' +
        '<button class="opt ' + (f.medio === 'fiado' ? 'on' : '') + '" data-act="s1.medio" data-v="fiado"' + rf('RF-COB-04') + '>' + ic('wallet', 20) + 'Fiado<small>Límite ' + U.money(s.config.limiteFiado) + '</small></button></div>';
      if (f.medio === 'efectivo') {
        var rec = f.recibido || total;
        h += '<label class="p-lbl">El hogar paga con</label><div class="p-chips">' + [total, 20, 50, 100, 200].filter(function (v, i, a) { return v >= total && a.indexOf(v) === i; }).map(function (v) { return '<button class="' + (rec === v ? 'on' : '') + '" data-act="s1.rec" data-v="' + v + '">' + (v === total ? 'Exacto' : U.money(v)) + '</button>'; }).join('') + '</div><div class="row sb"><span>Vuelto</span><b class="num" style="font-size:20px">' + U.money(Math.max(0, rec - total)) + '</b></div>';
      } else if (f.medio === 'qr_negocio') {
        h += '<div class="note">El hogar paga al Yape o Plin del negocio. No se confirma aquí: el pago queda «por verificar» hasta que el dueño lo vea en su historial (cuadre).</div>';
      } else if (f.medio === 'enlace') {
        if (o.local) h += '<div class="note warn">Las ventas en ruta creadas sin señal no tienen enlace de pago porque el pedido aún no existe en el servidor. Cobre en efectivo, con el QR del negocio o fiado.</div>';
        else h += '<div class="row" style="gap:12px;align-items:flex-start"><div class="qrbox">' + UI.qrSvg(qrUrl, 118) + '</div><div><p style="font-size:13.5px;margin:0 0 8px">El hogar escanea y paga con Yape desde su celular. La app <b>no captura datos de Yape</b>.</p><code style="font-size:11px;word-break:break-all">' + qrUrl + '</code></div></div>' +
          '<button class="pbtn sm ghost" style="margin-top:10px" data-act="s1.simpago" data-id="' + o.id + '" data-m="' + total + '">' + ic('phone', 17) + 'Simular el celular del hogar</button>';
      } else if (f.medio === 'fiado') {
        h += '<div class="note ' + ((o.deuda || 0) + total > s.config.limiteFiado ? 'bad' : '') + '">Deuda actual ' + U.money(o.deuda || 0) + ' más esta venta ' + U.money(total) + ' = ' + U.money((o.deuda || 0) + total) + '. Límite: ' + U.money(s.config.limiteFiado) + '.</div>';
      }
      h += '<button class="pbtn llama" style="margin-top:10px" data-act="s1.pagar" data-m="' + f.medio + '">' + ic('check', 21) + 'Registrar entrega</button><button class="pbtn sm ghost" style="margin-top:8px" data-act="s1.otro">Volver al efectivo exacto</button>';
    }
    h += '</div>';

    /* consentimiento y foto */
    h += '<div class="p-sec">Opcional</div>';
    var cons = o.consent === 'vigente';
    h += '<div class="togrow" ' + rf('RF-APP-09,RF-CLI-02') + ' style="flex-wrap:wrap">' + ic('msg', 20) + '<span class="grow">' + (cons ? 'Ya aceptó los avisos por WhatsApp' : 'El hogar acepta avisos por WhatsApp') + '</span>' + (cons ? '' : '<label class="switch"><input type="checkbox" data-chg="s1.consent" ' + (f.consent ? 'checked' : '') + '><i></i></label>') +
      (!cons ? '<small style="width:100%;color:var(--ink-2)">Lea al hogar: «Podemos avisarle por WhatsApp antes de que se acabe su producto. Puede dejar de recibir mensajes escribiendo SALIR.»</small>' : '') + '</div>';
    h += '<button class="pbtn sm ghost" style="margin-top:8px" data-act="s1.foto"' + rf('RF-APP-12') + '>' + ic('camera', 18) + (f.foto ? 'Foto adjunta (toque para quitar)' : 'Adjuntar foto de evidencia') + '</button>';
    h += '<button class="pbtn sm danger" style="margin-top:8px" data-act="s1.noent"' + rf('RF-APP-04') + '>' + ic('xc', 18) + 'No se pudo entregar</button>';
    return h;
  }
  function F() { return st.forms[st.params.id]; }
  function tap(f) { f.taps++; }
  App.acts['s1.qty'] = function (el) { var f = F(), i = f.items[+el.dataset.k]; i.qty = Math.max(1, i.qty + +el.dataset.d); var e = S().productos[i.p].envase; if (!f.vaciosManual) { f.vacios = {}; f.items.forEach(function (x) { var en = S().productos[x.p].envase; f.vacios[en] = (f.vacios[en] || 0) + x.qty; }); } f.ok1 = false; render(); };
  App.acts['s1.edit1'] = function () { F().edit1 = true; render(); };
  App.acts['s1.ok1'] = function () { var f = F(); f.ok1 = true; f.edit1 = false; tap(f); render(); };
  App.acts['s1.vac'] = function (el) { var f = F(); f.vaciosManual = true; f.vacios[el.dataset.e] = Math.max(0, (f.vacios[el.dataset.e] || 0) + +el.dataset.d); f.ok2 = false; render(); };
  App.acts['s1.edit2'] = function () { F().edit2 = true; render(); };
  App.acts['s1.ok2'] = function () { var f = F(); f.ok2 = true; f.edit2 = false; tap(f); render(); };
  App.chg['s1.marca'] = function (el) { F().marca = el.value; };
  App.acts['s1.gar'] = function (el) { F().garantia = { tipo: el.dataset.v }; render(); };
  App.acts['s1.otro'] = function () { var f = F(); f.otro = !f.otro; f.medio = 'efectivo'; render(); };
  App.acts['s1.medio'] = function (el) { F().medio = el.dataset.v; render(); };
  App.acts['s1.rec'] = function (el) { F().recibido = +el.dataset.v; render(); };
  App.chg['s1.consent'] = function (el) { F().consent = el.checked; };
  App.acts['s1.foto'] = function () { var f = F(); f.foto = !f.foto; render(); };
  App.acts['s1.simpago'] = function (el) { App.pagoModal({ pedidoId: el.dataset.id, monto: +el.dataset.m, fijo: true }); };
  App.acts['s1.pagar'] = function (el) {
    var f = F(), o = dev.pedidoLocal(st.params.id), s = S();
    if (!f.ok1 || !f.ok2) { UI.toast('Confirme primero el producto y los envases.', 'bad'); return; }
    var total = f.items.reduce(function (a, i) { return a + i.qty * i.precio; }, 0), medio = el.dataset.m;
    var env0 = s.productos[f.items[0].p].envase;
    var cobro = { medio: medio, recibido: medio === 'efectivo' ? (f.recibido || total) : null };
    var garantia = f.garantia.tipo !== 'ninguna' ? { tipo: f.garantia.tipo, monto: s.envases[env0].garantia, envase: env0 } : { tipo: 'ninguna' };
    if (medio !== 'efectivo' || f.otro) tap(f);
    if (!f.otro) tap(f);
    var r = dev.registrarEntrega({ pedidoId: o.id, items: f.items, vacios: f.vacios, marca: f.marca, garantia: garantia, cobro: cobro, foto: f.foto, consent: f.consent });
    if (!r.ok) { UI.toast(r.motivo, 'bad'); return; }
    delete st.forms[o.id];
    UI.toast('Entrega registrada y guardada en el teléfono' + (App.sim.net === 'offline' ? ' (sin señal: se enviará después)' : ''), 'ok');
    go('lista');
  };
  App.acts['s1.noent'] = function () { st.sheet = { tipo: 'noent', motivo: 'No estaba' }; render(); };
  App.acts['s1.motivo'] = function (el) { st.sheet.motivo = el.dataset.v; render(); };
  App.acts['s1.noentOk'] = function () {
    dev.noEntregado(st.params.id, st.sheet.motivo); delete st.forms[st.params.id]; st.sheet = null;
    UI.toast('Registrado como no entregado', 'ok'); go('lista');
  };

  /* ---------- venta en ruta y alta rápida (RF-APP-05, RF-CLI-01) ---------- */
  function ventaBody() {
    var s = S(), p = pkg(), q = st.vq.trim().toLowerCase(), h = '';
    if (st.ventaSel) {
      var v = st.ventaSel, hg = App.hogar(v.hogarId) || p.hogares[v.hogarId];
      h += '<div class="pcard2"><div class="ttl">' + esc(hg.nombre) + '</div><div class="sub">' + esc(hg.dir || '') + '</div></div>';
      h += '<label class="p-lbl">Producto</label><div class="opt3">' + Object.keys(s.productos).map(function (k) { return '<button class="opt ' + (v.p === k ? 'on' : '') + '" data-act="s1.vprod" data-v="' + k + '">' + esc(s.productos[k].corto) + '<small>' + U.money(s.productos[k].precio) + '</small></button>'; }).join('') + '</div>';
      h += '<label class="p-lbl">Cantidad</label><div class="stepper"><button data-act="s1.vqty" data-d="-1">−</button><b>' + v.qty + '</b><button data-act="s1.vqty" data-d="1">+</button></div>';
      h += '<div class="row sb" style="margin:14px 0"><span class="mut">Total</span><b class="num" style="font-size:22px">' + U.money(v.qty * s.productos[v.p].precio) + '</b></div>';
      h += '<button class="pbtn llama" data-act="s1.vcrear">' + ic('check', 20) + 'Crear pedido y entregar</button><button class="pbtn sm ghost" style="margin-top:8px" data-act="s1.vcancel">Elegir otro hogar</button>';
      return h;
    }
    h += '<p class="mut" style="font-size:13.5px;margin:0 0 10px">Busque al hogar en el directorio descargado o regístrelo en menos de un minuto.</p>';
    h += '<div class="p-search">' + ic('search', 18) + '<input id="s1vq" data-inp="s1.vq" placeholder="Nombre, celular o dirección" value="' + esc(st.vq) + '"></div>';
    var list = S().hogares.filter(function (x) { return !q || (x.nombre + ' ' + x.tel + ' ' + x.dir).toLowerCase().indexOf(q) >= 0; }).slice(0, q ? 8 : 5);
    var loc = Object.keys(p.hogares).map(function (k) { return p.hogares[k]; }).filter(function (x) { return !q || (x.nombre + x.tel).toLowerCase().indexOf(q) >= 0; });
    loc.concat(list).forEach(function (x) {
      h += '<div class="pcard2 tap" data-act="s1.vsel" data-id="' + x.id + '"><div class="ttl" style="font-size:15.5px">' + esc(x.nombre) + (x.nuevo ? ' <span class="pill st-llama">Nuevo</span>' : '') + '</div><div class="sub">' + esc(x.dir) + ', ' + esc(x.tel) + '</div></div>';
    });
    h += '<button class="pbtn ghost" style="margin-top:6px" data-act="s1.alta"' + rf('RF-CLI-01') + '>' + ic('plus', 20) + 'Hogar nuevo (alta rápida)</button>';
    return h;
  }
  App.inp['s1.vq'] = function (el) { st.vq = el.value; var pos = el.selectionStart; render(); var i = document.getElementById('s1vq'); if (i) { i.focus(); try { i.setSelectionRange(pos, pos); } catch (e) { /* noop */ } } };
  App.acts['s1.venta'] = function () { st.ventaSel = null; st.vq = ''; go('venta'); };
  App.acts['s1.ofrecer'] = function (el) { st.ventaSel = { hogarId: el.dataset.id, p: el.dataset.p, qty: +el.dataset.q }; go('venta'); };
  App.acts['s1.vsel'] = function (el) { var hh = App.hogar(el.dataset.id) || pkg().hogares[el.dataset.id]; var pr = (hh.productos && hh.productos[0]) || { p: 'GLP10', qty: 1 }; st.ventaSel = { hogarId: el.dataset.id, p: pr.p, qty: pr.qty }; render(); };
  App.acts['s1.vprod'] = function (el) { st.ventaSel.p = el.dataset.v; render(); };
  App.acts['s1.vqty'] = function (el) { st.ventaSel.qty = Math.max(1, st.ventaSel.qty + +el.dataset.d); render(); };
  App.acts['s1.vcancel'] = function () { st.ventaSel = null; render(); };
  App.acts['s1.vcrear'] = function () {
    var v = st.ventaSel, r = dev.ventaRuta({ hogarId: v.hogarId, items: [{ p: v.p, qty: v.qty }] });
    st.ventaSel = null;
    App.acts['s1.abrir']({ dataset: { id: r.id } });
  };
  function altaBody() {
    var f = st.forms.alta || (st.forms.alta = { nombre: '', tel: '', dir: '', ref: '', loc: null, p: 'GLP10', qty: 1, consent: false });
    var s = S();
    return '<div' + rf('RF-CLI-01') + '><p class="mut" style="font-size:13.5px;margin:0 0 4px">Datos mínimos. Alta en menos de 60 segundos.</p>' +
      '<label class="p-lbl">Nombre o alias</label><input class="p-in" data-inp="s1.af" data-k="nombre" value="' + esc(f.nombre) + '" placeholder="Ej.: Rosa Quispe">' +
      '<label class="p-lbl">Celular (+51)</label><input class="p-in" inputmode="tel" data-inp="s1.af" data-k="tel" value="' + esc(f.tel) + '" placeholder="9XX XXX XXX">' +
      '<label class="p-lbl">Dirección</label><input class="p-in" data-inp="s1.af" data-k="dir" value="' + esc(f.dir) + '" placeholder="Jr. Los Pinos 123">' +
      '<label class="p-lbl">Referencia</label><input class="p-in" data-inp="s1.af" data-k="ref" value="' + esc(f.ref) + '" placeholder="Casa verde, portón negro">' +
      '<button class="pbtn sm ghost" style="margin-top:10px" data-act="s1.loc">' + ic('pin', 18) + (f.loc ? 'Ubicación guardada' : 'Usar mi ubicación (opcional)') + '</button>' +
      '<label class="p-lbl">Compra habitual</label><div class="opt3">' + Object.keys(s.productos).map(function (k) { return '<button class="opt ' + (f.p === k ? 'on' : '') + '" data-act="s1.ap" data-v="' + k + '">' + esc(s.productos[k].corto) + '</button>'; }).join('') + '</div>' +
      '<div class="stepper" style="margin-top:8px"><button data-act="s1.aq" data-d="-1">−</button><b>' + f.qty + '</b><button data-act="s1.aq" data-d="1">+</button></div>' +
      '<div class="togrow" style="margin-top:12px;flex-wrap:wrap" ' + rf('RF-CLI-02') + '>' + ic('msg', 20) + '<span class="grow">Acepta avisos por WhatsApp</span><label class="switch"><input type="checkbox" data-chg="s1.ac" ' + (f.consent ? 'checked' : '') + '><i></i></label><small style="width:100%;color:var(--ink-2)">Se guarda el texto leído, la fecha y quién lo registró.</small></div>' +
      '<button class="pbtn llama" style="margin-top:14px" data-act="s1.asave">' + ic('check', 20) + 'Guardar hogar</button></div>';
  }
  App.acts['s1.alta'] = function () { st.forms.alta = null; st.altaT0 = Date.now(); go('alta'); };
  App.inp['s1.af'] = function (el) { st.forms.alta[el.dataset.k] = el.value; };
  App.acts['s1.ap'] = function (el) { st.forms.alta.p = el.dataset.v; render(); };
  App.acts['s1.aq'] = function (el) { st.forms.alta.qty = Math.max(1, st.forms.alta.qty + +el.dataset.d); render(); };
  App.chg['s1.ac'] = function (el) { st.forms.alta.consent = el.checked; };
  App.acts['s1.loc'] = function () { st.forms.alta.loc = { lat: -11.9403, lng: -77.0508 }; render(); };
  App.acts['s1.asave'] = function () {
    var f = st.forms.alta;
    if (!f.nombre.trim() || f.tel.replace(/\D/g, '').length < 9 || !f.dir.trim()) { UI.toast('Complete nombre, celular de 9 dígitos y dirección.', 'bad'); return; }
    var r = dev.altaHogar({ nombre: f.nombre.trim(), tel: f.tel.trim(), dir: f.dir.trim(), ref: f.ref, loc: f.loc, productos: [{ p: f.p, qty: f.qty }], consent: f.consent });
    if (!r.ok) { UI.toast(r.motivo, 'bad'); return; }
    var seg = Math.max(1, Math.round((Date.now() - st.altaT0) / 1000));
    UI.toast('Hogar registrado en ' + seg + ' s. Ya puede venderle.', 'ok');
    st.ventaSel = { hogarId: r.id, p: f.p, qty: f.qty }; st.forms.alta = null; go('venta');
  };

  /* ---------- sincronización (RF-APP-10, RF-SYN-01, 02, 04) ---------- */
  function syncBody() {
    var x = d(), sim = App.sim, pend = dev.pendientes(), s = S();
    var h = '<div class="pcard2"><div class="row sb"><b style="font-size:17px">' + (sim.syncing ? 'Enviando eventos…' : sim.net === 'offline' ? 'Sin conexión' : pend.length ? 'Hay eventos por enviar' : 'Todo sincronizado') + '</b>' + pillHtml().replace('id="s1-pill"', '') + '</div>' +
      '<p class="sub" style="margin:6px 0 10px">' + (sim.msg ? esc(sim.msg) : sim.net === 'offline' ? 'Todo lo que registre se guarda en el teléfono con un identificador único. Se envía solo cuando vuelva la señal.' : 'La última sincronización fue ' + (x.lastSync ? U.dmy(x.lastSync.slice(0, 10)) + ' ' + x.lastSync.slice(11) : 'aún no ocurrió') + '.') + '</p>' +
      '<button class="pbtn" data-act="s1.sync">' + ic('refresh', 20) + 'Sincronizar ahora</button></div>';
    h += '<div class="p-tiles" style="margin-top:12px"><div class="p-tile"><div class="v">' + pend.length + '</div><div class="l">Por enviar</div></div><div class="p-tile"><div class="v">' + sim.kb + ' KB</div><div class="l">Datos usados hoy</div></div></div>';
    h += '<div class="p-sec" style="margin-top:14px">Cola de eventos</div><div' + rf('RF-SYN-01,RF-SYN-02,RF-SYN-04') + '>';
    var evs = x.events.slice().reverse().slice(0, 14);
    if (!evs.length) h += '<div class="pcard2 mut">Todavía no hay eventos. Registre una entrega.</div>';
    evs.forEach(function (e) { h += '<div class="pcard2" style="padding:10px 12px"><div class="row sb"><b style="font-size:14.5px">' + tipoEv(e.tipo) + '</b>' + estadoEv(e) + '</div><div class="sub" style="font-size:12.5px">N.º ' + e.seq + ' · ' + U.short(e.uuid) + ' · ' + e.hora.slice(11) + (e.intentos ? ' · ' + e.intentos + ' reintento(s)' : '') + '</div>' + (e.motivo ? '<div class="note ' + (e.estado === 'rechazado' ? 'bad' : '') + '" style="margin-top:6px;font-size:12.5px">' + esc(e.motivo) + '</div>' : '') + '</div>'; });
    h += '</div>';
    h += '<div class="p-sec" style="margin-top:14px">Este dispositivo</div><div class="pcard2" style="padding:6px 14px"><div class="sumrow"><span>Repartidor</span><b>' + esc(App.nombreUsuario(x.userId)) + '</b></div><div class="sumrow"><span>Dispositivo</span><b>' + s.dispositivos[x.userId].id + '</b></div><div class="sumrow"><span>Versión</span><b>' + s.dispositivos[x.userId].version + '</b></div></div>';
    h += '<button class="pbtn sm ghost" style="margin-top:10px" data-act="s1.salir">' + ic('out', 18) + 'Cerrar sesión</button>';
    return h;
  }
  function tipoEv(t) { return { 'entrega.registrada': 'Entrega registrada', 'envase.movimiento': 'Movimiento de envases', 'cobro.registrado': 'Cobro registrado', 'entrega.no_realizada': 'Entrega no realizada', 'hogar.alta': 'Hogar nuevo', 'consentimiento.registrado': 'Consentimiento', 'pedido.creado': 'Venta en ruta', 'carga.confirmada': 'Carga confirmada', 'jornada.cerrada': 'Jornada cerrada' }[t] || t; }
  function estadoEv(e) {
    var m = { pendiente: ['warn', 'Por enviar', 'clock'], reintentar: ['warn', 'Reintentando', 'refresh'], aceptado: ['ok', 'Aceptado', 'check'], duplicado: ['mute', 'Duplicado ignorado', 'check'], rechazado: ['bad', 'Rechazado', 'xc'] }[e.estado] || ['mute', e.estado, 'info'];
    return UI.pill(m[0], m[1], m[2]);
  }
  App.acts['s1.sync'] = function () { if (App.sim.net === 'offline') { App.sim.msg = 'Sin señal: los eventos siguen guardados en el teléfono.'; UI.toast('Sin señal: no se puede sincronizar.', 'bad'); chrome(); render(); return; } dev.sync(); };
  App.acts['s1.salir'] = function () { var x = d(); if (dev.pendientes().length) { UI.toast('Hay eventos por enviar. Sincronice antes de cerrar la sesión.', 'bad'); return; } x.logged = false; S().deviceUser = null; st.screen = 'login'; render(); };

  /* ---------- cierre de jornada (RF-APP-11) ---------- */
  function cierreBody() {
    var x = d(), p = pkg(), s = S();
    if (!p) return '<div class="note warn">Aún no descargó el paquete del día.</div>';
    var r = dev.resumen(), h = '';
    if (x.jornadaCerrada) h += '<div class="note ok" style="margin-bottom:12px">Jornada cerrada. Si hay eventos por enviar, se mandarán al volver la señal.</div>';
    h += '<div' + rf('RF-APP-11') + '><div class="p-sec">Cobrado por medio de pago</div><div class="pcard2" style="padding:6px 14px">' +
      [['efectivo', 'Efectivo'], ['qr_negocio', 'QR del negocio'], ['enlace', 'Enlace de pago'], ['fiado', 'Fiado']].map(function (m) { return '<div class="sumrow"><span>' + m[1] + '</span><b>' + U.money(r.by[m[0]]) + '</b></div>'; }).join('') + '<div class="sumrow"><span><b>Total</b></span><b>' + U.money(r.total) + '</b></div></div>' +
      '<div class="pcard2" style="background:var(--llama-soft);border-color:#f6c9b6"><div class="row sb"><span><b>Efectivo a entregar</b></span><b class="num" style="font-size:24px">' + U.money(r.by.efectivo) + '</b></div></div>' +
      '<div class="p-sec">Envases en el vehículo</div><div class="pcard2" style="padding:6px 14px">' + Object.keys(r.llenosVeh).map(function (k) { return '<div class="sumrow"><span>' + esc(s.envases[k].nombre) + ' llenos que vuelven</span><b>' + Math.max(0, r.llenosVeh[k]) + '</b></div>'; }).join('') + '<div class="sumrow"><span>Vacíos recogidos</span><b>' + r.vaciosRec + '</b></div></div></div>';
    if (r.pend > 0 && !x.jornadaCerrada) h += '<div class="note warn">Quedan ' + r.pend + ' pedido(s) sin resolver. Márquelos como entregados o no entregados para cerrar.</div>';
    if (!x.jornadaCerrada) h += '<button class="pbtn llama" style="margin-top:10px" data-act="s1.cerrar" ' + (r.pend > 0 ? 'aria-disabled="true"' : '') + '>' + ic('lock', 20) + 'Cerrar jornada</button>';
    return h;
  }
  App.acts['s1.cerrar'] = function () {
    var r = dev.cerrarJornada();
    if (!r.ok) { UI.toast(r.motivo, 'bad'); return; }
    UI.toast('Jornada cerrada.', 'ok'); render();
  };

  /* ---------- hojas inferiores ---------- */
  function sheetHtml() {
    var sh = st.sheet, s = S();
    if (sh.tipo === 'carga') {
      return '<div class="sheet-ov"><div class="sheet"><h3>Carga del vehículo</h3><p class="mut" style="font-size:13.5px;margin-top:-6px">Confirme cuántos llenos salen. Los vacíos salen en 0.</p>' + Object.keys(sh.f).map(function (k) { return '<div class="carga-row"><b>' + esc(s.envases[k].nombre) + ' llenos</b><div class="stepper" style="min-width:150px"><button data-act="s1.cargaStep" data-k="' + k + '" data-d="-1">−</button><b>' + sh.f[k] + '</b><button data-act="s1.cargaStep" data-k="' + k + '" data-d="1">+</button></div></div>'; }).join('') + '<button class="pbtn" style="margin-top:14px" data-act="s1.cargaOk">Confirmar carga</button></div></div>';
    }
    if (sh.tipo === 'noent') {
      return '<div class="sheet-ov"><div class="sheet"><h3>Motivo de no entrega</h3><div class="opt3">' + ['No estaba', 'No quiso', 'Dirección errada', 'Sin stock'].map(function (m) { return '<button class="opt ' + (sh.motivo === m ? 'on' : '') + '" data-act="s1.motivo" data-v="' + m + '">' + m + '</button>'; }).join('') + '</div><button class="pbtn danger" style="margin-top:14px" data-act="s1.noentOk">Registrar no entrega</button><button class="pbtn sm ghost" style="margin-top:8px" data-act="s1.sheetx">Cancelar</button></div></div>';
    }
    return '';
  }
  App.acts['s1.sheetx'] = function () { st.sheet = null; render(); };

  /* ---------- columnas laterales ---------- */
  function leftCol() {
    return '<aside class="s1-side"><h2>S1 · App del repartidor</h2><p class="lead">Android, pensada para una mano y para el sol. Funciona completa sin red: cada operación se guarda primero en el teléfono como un evento con identificador único y se envía cuando hay señal.</p>' +
      '<div class="panel"><div class="panel-b"><h4>Cómo probarla</h4><ol style="padding-left:18px;margin:8px 0 0;color:var(--ink-2)"><li>Ingrese como Luis (PIN 1234) y descargue el paquete.</li><li>Pase la red a <b>Sin señal</b> en el panel de la derecha.</li><li>Registre dos o tres entregas: observe la cola crecer.</li><li>Vuelva a <b>En línea</b>: los eventos se envían una sola vez.</li><li>Abra <b>S2, Cuadre</b> para ver el resultado.</li></ol></div></div>' +
      '<div class="panel"><div class="panel-b"><h4>Qué demuestra</h4><div class="stack" style="font-size:13.5px;color:var(--ink-2)"><div>' + ic('check', 15) + ' Entrega típica en 3 toques (producto, envase, efectivo).</div><div>' + ic('check', 15) + ' Libro de envases por hogar con saldo y garantía.</div><div>' + ic('check', 15) + ' Cobro con QR del negocio «por verificar» y enlace de pago sin datos de Yape.</div><div>' + ic('check', 15) + ' Consentimiento verbal con el texto leído.</div><div>' + ic('check', 15) + ' Cambios del despachador al volver la señal.</div></div></div></div></aside>';
  }
  function simInner() {
    var x = d(), sim = App.sim, pend = x ? dev.pendientes() : [];
    var h = '<h2>Panel de simulación</h2><p class="mut" style="margin:4px 0 0">Controles del prototipo; no existen en la app real.</p><div class="panel"><div class="panel-b">' +
      '<div class="sim-row"><b>Red del teléfono</b>' + UI.seg('net', [['online', 'En línea'], ['debil', 'Débil'], ['offline', 'Sin señal']], sim.net, 's1.net') + '</div>' +
      '<div class="sim-row"><div><b>Sincronizar solo</b><div class="mut" style="font-size:12.5px">Al haber señal y eventos</div></div><label class="switch"><input type="checkbox" data-chg="s1.auto" ' + (sim.auto ? 'checked' : '') + '><i></i></label></div>' +
      '<div class="sim-row"><b>Cola en el teléfono</b><span>' + pend.length + ' por enviar</span></div>' +
      '<div class="row wrap" style="padding-top:10px"><button class="btn btn-sm" data-act="s1.sync">' + ic('refresh', 14) + 'Sincronizar ahora</button><button class="btn btn-sm" data-act="s1.reenviar" data-tip="Reenvía eventos ya aceptados: el servidor debe responder «duplicado» sin cambiar nada">' + ic('upload', 14) + 'Reenviar último lote</button><button class="btn btn-sm" data-act="s1.kill" data-tip="Cierra la app: la cola local no se pierde">' + ic('x', 14) + 'Forzar cierre de la app</button></div></div></div>';
    if (x && x.logged) {
      h += '<div class="panel"><div class="panel-h"><h3>Atajos de pantalla</h3></div><div class="panel-b row wrap">' + [['inicio', 'Hoy'], ['lista', 'Lista'], ['sync', 'Sincro'], ['cierre', 'Cierre']].map(function (n) { return '<button class="btn btn-sm" data-act="s1.nav" data-v="' + n[0] + '">' + n[1] + '</button>'; }).join('') + '</div></div>';
      h += '<div class="panel"><div class="panel-h"><h3>Eventos recientes</h3><span class="mut">' + x.events.length + ' en total</span></div><div class="panel-b queue">' + (x.events.slice(-8).reverse().map(function (e) { return '<div class="qrow"><span class="dot ' + ({ aceptado: 'ok', duplicado: 'info', rechazado: 'bad' }[e.estado] || 'warn') + '"></span><span>' + tipoEv(e.tipo) + '</span><span class="mut">' + e.estado + '</span></div>'; }).join('') || '<span class="mut">Sin eventos todavía</span>') + '</div></div>';
    }
    h += '<div class="row wrap" style="margin-top:12px"><a class="btn btn-sm" href="#/s2/cuadre">Ver el cuadre en S2</a><a class="btn btn-sm" href="#/s3/eventos">Ver el registro de eventos en S3</a></div>';
    return h;
  }
  App.acts['s1.net'] = function (el) {
    var prev = App.sim.net; App.sim.net = el.dataset.v; App.sim.msg = null;
    if (prev === 'offline' && App.sim.net !== 'offline' && d() && d().logged && App.sim.auto && dev.pendientes().length) { UI.toast('Volvió la señal: enviando eventos…', 'info'); dev.programarSync(700); }
    chrome(); if (st.screen === 'sync' || st.screen === 'inicio') render(); else chrome();
  };
  App.chg['s1.auto'] = function (el) { App.sim.auto = el.checked; };
  App.acts['s1.reenviar'] = function () { if (!d() || !d().logged) { UI.toast('Ingrese a la app primero.', 'bad'); return; } var r = dev.reenviarUltimoLote(); UI.toast(r.n ? r.n + ' evento(s) reenviado(s): el servidor respondió ' + r.dup + ' duplicado(s) y no cambió nada.' : 'Todavía no hay eventos aceptados para reenviar.', r.n ? 'ok' : 'info'); };
  App.acts['s1.kill'] = function () { if (!d() || !d().logged) { UI.toast('La app no está abierta.', 'info'); return; } App.emit('device-kill'); };

  App.views.s1 = { render: function () { render(); } };
})();

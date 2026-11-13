/* S1 — Fuentes (ingesta de comprobantes) y «Confirma una vez» (emparejamiento) */
(function () {
  'use strict';
  var App = window.App, U = App.U, UI = App.UI, ic = App.ic, E = App.E, C = App.Charts, H = App.H, S1 = App.s1, esc = U.esc, rf = App.rf;
  S1.fx = S1.fx || {};

  /* ---------- muestras de comprobantes para probar el flujo ---------- */
  S1.samples = function (D) {
    var tr = D.pedidos.filter(function (p) { return p.estado === 'en_transito'; }).sort(function (a, b) { return a.fecha < b.fecha ? -1 : 1; });
    var P = D.provs, byId = function (id) { return D.prods[id]; };
    var lnV = function (id, cant, useAlt) { var p = byId(id); return { desc: useAlt || p.bol, cant: cant, vu: p.precio, un: p.un }; };
    var lnC = function (id, cant, cod) { var p = byId(id); return { desc: p.fact, cod: cod || p.cod, gtin: p.gtin, cant: cant, vu: Math.round(p.costo * p.factor * 100) / 100, un: 'BX' }; };
    var recent = D.comp.slice().reverse().filter(function (c) { return c.dir === 'venta' && c.tipo === '03' && c.fecha >= U.addDays(App.HOY, -4) && D.lin.slice(c.l0, c.l1).some(function (l) { return l.est === 'emp'; }); })[0];
    var recentC = D.comp.slice().reverse().filter(function (c) { return c.dir === 'compra' && c.tipo === '01'; })[0];
    var out = [];
    if (tr[0]) out.push({ id: 'compra', ic: 'inbox', t: 'Factura de ' + P[tr[0].prov].nombre.split(' ').slice(0, 2).join(' ') + ' (llega el pedido ' + tr[0].id.replace('PED-', '') + ')', d: 'Cierra un pedido en tránsito: sugerido, pedido y facturado.', src: 'correo', build: function () { return E.facturaDePedido(D, tr[0]); } });
    if (tr[1]) out.push({ id: 'compra_falt', ic: 'inbox', t: 'Factura con un faltante (pedido ' + tr[1].id.replace('PED-', '') + ')', d: 'El proveedor no entregó la primera línea: el cierre muestra la diferencia.', src: 'correo', build: function () { return E.facturaDePedido(D, tr[1], { faltante: true }); } });
    out.push({ id: 'codigo', ic: 'link', t: 'Factura de Cementos con un código nuevo', d: 'El proveedor cambió el código de un producto ya confirmado: vuelve a «Confirma una vez» (RF-EMP-05).', src: 'correo', build: function () { var n = E.numero(D); return E.xmlManual(D, { dir: 'compra', ruc: P.CN.ruc, serie: 'F101', num: n, tipo: '01', lines: [lnC('CEM-I42', 40), lnC('CEM-MS', 20, byId('CEM-MS').codNuevo || 'CN-5555')] }); } });
    out.push({ id: 'varios', ic: 'file', t: 'Boleta con líneas «VARIOS» y «PRODUCTO»', d: 'Las genéricas no se asignan a ningún producto: bajan el % identificable (RN-05).', src: 'api', build: function () { var n = E.numero(D); return E.xmlManual(D, { dir: 'venta', ruc: D.comercio.ruc, serie: 'B001', num: n, tipo: '03', lines: [lnV('CEM-I42', 3), lnV('FIE-12', 2), { desc: 'VARIOS', cant: 1, vu: 18.5 }, { desc: 'PRODUCTO', cant: 1, vu: 6 }] }); } });
    out.push({ id: 'alias', ic: 'search', t: 'Boleta con descripciones nunca vistas', d: 'Genera líneas «por confirmar» con candidatos, para practicar la pantalla «Confirma una vez».', src: 'api', build: function () { var n = E.numero(D); return E.xmlManual(D, { dir: 'venta', ruc: D.comercio.ruc, serie: 'B001', num: n, tipo: '03', lines: [lnV('PVC-SAP34', 2, 'TUBO PVC AGUA 3/4 DE 5 MTS'), lnV('TEE-12', 6, 'TEE MEDIA PVC'), lnV('PIN-LAT-BL', 1, 'PINTURA LATEX BLANCA GALON'), lnV('CIN-AIS', 3, 'CINTA AISLANTE 3M NEGRA')] }); } });
    out.push({ id: 'constructora', ic: 'building', t: 'Factura de venta a una constructora (con RUC y razón social)', d: 'Se lee todo, pero el adquirente se suprime antes de guardar (RN-06).', src: 'api', build: function () { var n = E.numero(D); return E.xmlManual(D, { dir: 'venta', ruc: D.comercio.ruc, serie: 'F001', num: n, tipo: '01', adq: 'RUC', lines: [lnV('CEM-I42', 40), lnV('FIE-38', 30), lnV('ALA-16', 10)] }); } });
    if (recent) out.push({ id: 'nc', ic: 'refresh', t: 'Nota de crédito de venta por una devolución', d: 'Referencia a la boleta ' + recent.id + ': revierte solo lo que esa boleta vendió.', src: 'api', build: function () { var ln = D.lin.slice(recent.l0, recent.l1).filter(function (l) { return l.est === 'emp'; })[0], n = E.numero(D); return E.xmlManual(D, { dir: 'venta', ruc: D.comercio.ruc, serie: 'BC01', num: n, tipo: '07', ref: recent.id, lines: [{ desc: ln.desc, cant: Math.min(1, ln.cant), vu: ln.vu, un: ln.un }] }); } });
    if (recentC) out.push({ id: 'ncc', ic: 'refresh', t: 'Nota de crédito de compra (devolución al proveedor)', d: 'Referencia a la factura ' + recentC.id + ': baja el stock.', src: 'correo', build: function () { var ln = D.lin.slice(recentC.l0, recentC.l1).filter(function (l) { return l.est === 'emp'; })[0], n = E.numero(D); return E.xmlManual(D, { dir: 'compra', ruc: recentC.ruc, serie: 'FC' + recentC.serie.slice(2), num: n, tipo: '07', ref: recentC.id, lines: [{ desc: ln.desc, cod: ln.cod, cant: 1, vu: ln.vu, un: 'BX' }] }); } });
    out.push({ id: 'ajeno', ic: 'x', t: 'Comprobante de otro RUC', d: 'No involucra al comercio: se rechaza con motivo (RF-ING-06).', src: 'correo', build: function () { var n = E.numero(D); return E.xmlManual(D, { dir: 'compra', ruc: '20555000777', serie: 'F777', num: n, tipo: '01', otro: 'OTRO COMERCIO S.A.C.', lines: [{ desc: 'CEMENTO', cant: 5, vu: 30, un: 'NIU' }] }).replace(D.comercio.ruc, '20111222333'); } });
    out.push({ id: 'xxe', ic: 'lock', t: 'XML malicioso (DOCTYPE con ENTITY)', d: 'Se rechaza antes de leerlo: prevención de XXE.', src: 'correo', build: function () { return '<?xml version="1.0"?>\n<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>\n<Invoice><ID>F101-00000001</ID><Note>&xxe;</Note></Invoice>'; } });
    out.push({ id: 'dup', ic: 'refresh', t: 'Repetir el último comprobante procesado', d: 'Misma clave RUC + tipo + serie + número: se reconoce como duplicado y no cambia nada (RN-01).', src: 'carga', build: function () { var c = D.comp[D.comp.length - 1]; return E.xmlOf(D, c, { pii: true }); } });
    return out;
  };
  S1.lastRes = null;
  S1.runIngest = function (xml, src, name) {
    var D = App.D, r = E.ingest(D, xml, src, name); r.nombre = name; S1.lastRes = r; S1.lastXml = xml;
    if (r.estado === 'ok') {
      App.flag(r.dir === 'compra' ? 'ingCompra' : 'ingVenta'); if (r.gen) App.flag('ingVarios'); if (r.cierre) App.flag('cierre');
      UI.toast('Procesado ' + r.id + ' · ' + r.emp + ' emparejadas' + (r.pend ? ', ' + r.pend + ' por confirmar' : ''), 'ok');
    } else { if (r.estado === 'rechazado' || r.estado === 'invalido') App.flag('ingRechazo'); UI.toast((r.estado === 'duplicado' ? 'Duplicado: ' : 'Rechazado: ') + r.motivo, r.estado === 'duplicado' ? 'info' : 'bad'); }
    return r;
  };
  function resHtml(r) {
    if (!r) return '';
    var k = r.estado === 'ok' ? (r.pend || r.gen || (r.avisos && r.avisos.length) ? 'warn' : 'ok') : r.estado === 'duplicado' ? 'warn' : 'bad', t = { ok: 'Procesado', duplicado: 'Duplicado: no cambió nada', rechazado: 'Rechazado', invalido: 'Inválido' }[r.estado];
    var h = '<div class="res ' + k + '"><div class="row sb"><b>' + t + (r.id ? ' · <span class="mono">' + esc(r.id) + '</span>' : '') + '</b><span class="mut">' + esc(r.nombre || '') + '</span></div>';
    if (r.estado === 'ok') h += '<p style="margin:6px 0 0">Es una <b>' + (r.dir === 'compra' ? 'compra' : 'venta') + '</b> · ' + r.emp + ' línea(s) emparejada(s)' + (r.pend ? ' · <b>' + r.pend + ' por confirmar</b> (<a href="#/s1/emparejar">confirmar</a>)' : '') + (r.gen ? ' · ' + r.gen + ' genérica(s)' : '') + '.</p>' + ((r.auto && r.auto.length) ? '<ul><li>' + r.auto.map(esc).join('</li><li>') + '</li></ul>' : '') + ((r.avisos && r.avisos.length) ? '<ul><li>' + r.avisos.map(esc).join('</li><li>') + '</li></ul>' : '') + (r.cierre ? '<p style="margin:6px 0 0">Cerró el pedido <b>' + esc(r.cierre) + '</b>. <a href="#/s1/visitas">Ver el cierre del ciclo</a></p>' : '');
    else h += '<p style="margin:6px 0 0">' + esc(r.motivo) + '</p>';
    return h + '</div>';
  }

  /* ---------- Fuentes ---------- */
  var TABS = [['correo', 'Correo y buzón', 'RF-ING-01'], ['cargar', 'Cargar archivos', 'RF-ING-03'], ['comprobantes', 'Comprobantes', 'RF-UBL-01'], ['reporte', 'Reporte de ingesta', 'RF-ING-08']];
  S1.pages.fuentes = function (r) {
    var D = App.D;
    if (!App.can('fuentes')) return H.blocked('conectar fuentes');
    var tab = r.sub || 'correo', body = '';
    if (tab === 'correo') {
      var rows = D.provList.map(function (pv) {
        var cs = D.comp.filter(function (c) { return c.dir === 'compra' && c.ruc === pv.ruc; }), last = cs.length ? cs[cs.length - 1].fecha : null, d = last ? U.diff(App.HOY, last) : null, sx = D.sinXml.filter(function (s) { return s.prov === pv.id; });
        var late = d != null && d > pv.cada * 7 + pv.plazo + 3;
        return '<tr><td class="name"><b>' + esc(pv.nombre) + '</b><small>RUC ' + pv.ruc + '</small></td><td>' + (pv.web ? UI.pill('warn', 'Sube la factura a su web', 'alert') : UI.pill('ok', 'Envía el XML por correo', 'check')) + '</td><td class="right num">' + cs.length + '</td><td>' + (last ? U.dm(last) + ' <small class="mut">hace ' + d + ' d</small>' : '—') + '</td><td>' + (sx.length ? UI.pill('bad', 'Falta 1 XML', 'alert') : late ? UI.pill('warn', 'Sin facturas hace ' + d + ' días', 'clock') : UI.pill('ok', 'Al día', 'checkc')) + '</td></tr>';
      }).join('');
      body = '<div class="grid2"><div class="card" ' + rf('RF-ING-01') + '><h3>1. Reenvíe sus facturas a este buzón</h3><p class="mut2">En el correo donde los proveedores le envían las facturas, cree una regla que mande una copia a esta dirección. El sistema <b>nunca entra a su correo</b> ni le pide la contraseña.</p>' +
        '<div class="mailbox"><span id="mbx">' + esc(D.buzon) + '@ingesta.tuerca.example</span><button class="btn btn-sm" data-act="fx.copy">' + ic('link', 14) + 'Copiar</button></div>' +
        '<ol class="steps mt"><li><span><b>Gmail:</b> Configuración › Reenvío › «Agregar una dirección de reenvío» y un filtro «De: facturacion».</span></li><li><span><b>Outlook:</b> Reglas › «Reenviar a» con la condición «tiene un archivo adjunto .xml».</span></li><li><span>Pida a sus proveedores que le envíen el XML y no solo el PDF.</span></li></ol>' +
        '<div class="row mt gap-s"><button class="btn btn-primary" data-act="fx.rotar" ' + rf('RF-SEG-04') + '>' + ic('refresh', 15) + 'Rotar la dirección</button><span class="mut">Los correos a la dirección anterior se rechazan.</span></div></div>' +
        '<div class="card" ' + rf('RF-ING-02') + '><h3>2. Simule la llegada de un correo</h3><p class="mut2">El servicio de correo entrante extrae los adjuntos XML y ZIP y los manda a la ingesta. Un PDF sin XML se registra como «compra sin XML».</p><button class="btn btn-brand" data-act="fx.correo">' + ic('send', 15) + 'Recibir la factura de un pedido en tránsito</button><div id="fx-res" class="mt">' + resHtml(S1.lastRes) + '</div>' +
        (D.sinXml.length ? '<div class="note warn mt"><b>Compras sin XML (' + D.sinXml.length + ').</b> ' + D.sinXml.map(function (s) { return esc(D.provs[s.prov].nombre) + ' · factura ' + esc(s.ref) + ' del ' + U.dm(s.fecha) + ' · ≈ ' + H.money(s.total) + '. ' + esc(s.nota) + '.'; }).join(' ') + ' <a href="#/s1/fuentes/cargar">Cargar el XML</a></div>' : '') + '</div></div>' +
        '<div class="sect"><div class="sect-h"><h2>Cómo entrega cada proveedor sus facturas</h2></div><div class="tbl-wrap"><table><thead><tr><th>Proveedor</th><th>Medio</th><th class="right">Facturas XML</th><th>Última</th><th>Estado</th></tr></thead><tbody>' + rows + '</tbody></table></div><p class="ch-note">El emisor elige cómo entrega la factura (web, correo, servicio web). Por eso se mide el % de compras que llegan con XML.</p></div>';
    } else if (tab === 'cargar') {
      var smp = S1.samples(D).map(function (s) { return '<button class="sample" data-act="fx.sample" data-id="' + s.id + '">' + ic(s.ic, 20) + '<span><b>' + esc(s.t) + '</b><small class="mut">' + esc(s.d) + '</small></span>' + ic('chevr', 16) + '</button>'; }).join('');
      body = '<div class="grid-main"><div><div class="drop" id="drop" ' + rf('RF-ING-03') + '>' + ic('upload', 30) + '<b>Arrastre aquí archivos XML</b><span>o</span> <label class="btn btn-sm" style="margin-left:6px">Elegir archivos<input type="file" id="fx-file" accept=".xml,.XML,text/xml" multiple hidden></label><p class="mut" style="font-size:12.5px;margin:10px 0 0">Los ZIP se descomprimen en el servidor (límite de 200 archivos y 20 MB). Aquí solo se leen XML.</p></div>' +
        '<div class="card mt"><h4>O pegue el XML</h4><textarea class="textarea mono" id="fx-paste" rows="5" placeholder="&lt;Invoice …&gt;…"></textarea><div class="row mt-s"><button class="btn btn-primary" data-act="fx.paste">Procesar</button></div></div>' +
        '<div id="fx-res" class="mt">' + resHtml(S1.lastRes) + '</div>' +
        '<div class="card mt" ' + rf('RF-ING-05') + '><div class="row sb"><div><h4>Modo planilla (sin XML de ventas)</h4><p class="mut2" style="margin:2px 0 0">Para comercios del Nuevo RUS o que no pueden exportar XML: Excel o CSV con la plantilla.</p></div><div class="row gap-s"><button class="btn btn-sm" data-act="fx.plantilla">' + ic('download', 14) + 'Plantilla</button><button class="btn btn-sm" data-act="fx.planilla">Cargar planilla de ejemplo</button></div></div></div></div>' +
        '<div><div class="card"><h3>Muestras para probar</h3><p class="mut2" style="margin-bottom:10px">Cada una genera un XML UBL 2.1 y lo manda por la misma tubería que un archivo real.</p><div class="col gap-s">' + smp + '</div></div></div></div>';
    } else if (tab === 'comprobantes') {
      body = UI.table('tbl-comp', {
        rows: function () { return D.comp.slice().reverse(); }, rowId: function (c) { return c.id; }, rowAct: 'fx.comp', pageSize: 14, rowRf: 'RF-UBL-01',
        search: function (c) { return c.id + ' ' + c.ruc; }, placeholder: 'Buscar por número de comprobante',
        filters: [{ k: 'dir', label: 'Tipo', options: [['compra', 'Compras'], ['venta', 'Ventas']], test: function (c, v) { return c.dir === v; } }, { k: 'doc', label: 'Documento', options: [['01', 'Factura'], ['03', 'Boleta'], ['07', 'Nota de crédito']], test: function (c, v) { return c.tipo === v; } }, { k: 'src', label: 'Origen', options: [['correo', 'Correo'], ['api', 'API del facturador'], ['carga', 'Carga manual']], test: function (c, v) { return c.src === v; } }],
        cols: [
          { label: 'Fecha', render: function (c) { return U.dmy(c.fecha); }, sort: function (c) { return c.fecha; } },
          { label: 'Comprobante', render: function (c) { return '<span class="mono">' + esc(c.id) + '</span>'; }, sort: function (c) { return c.id; } },
          { label: 'Documento', render: function (c) { return { '01': 'Factura', '03': 'Boleta', '07': 'Nota de crédito' }[c.tipo] || c.tipo; } },
          { label: 'Sentido', render: function (c) { return c.dir === 'compra' ? UI.pill('info', 'Compra', 'down') : UI.pill('mute', 'Venta', 'up'); } },
          { label: 'Emisor', render: function (c) { var pv = D.provList.filter(function (v) { return v.ruc === c.ruc; })[0]; return pv ? esc(pv.nombre.split(' ').slice(0, 2).join(' ')) : 'Este comercio'; } },
          { label: 'Líneas', align: 'right', render: function (c) { var n = c.l1 - c.l0, p = D.lin.slice(c.l0, c.l1).filter(function (l) { return l.est === 'pend' || l.est === 'pendref'; }).length; return n + (p ? ' <span class="chip-r">' + p + ' por confirmar</span>' : ''); }, sort: function (c) { return c.l1 - c.l0; } },
          { label: 'Total', align: 'right', render: function (c) { return '<span class="num">' + U.money(c.total) + '</span>'; }, sort: function (c) { return c.total; } },
          { label: 'Origen', render: function (c) { return { correo: 'Correo', api: 'API', carga: 'Carga manual', reproceso: 'Reproceso', planilla: 'Planilla' }[c.src] || c.src; } }
        ]
      });
    } else {
      var days = 30, x = [], cv = [], vv = [];
      for (var i = days - 1; i >= 0; i--) { var d = U.addDays(App.HOY, -i); x.push(U.dm(d)); cv.push(D.comp.filter(function (c) { return c.fecha === d && c.dir === 'compra'; }).length); vv.push(D.comp.filter(function (c) { return c.fecha === d && c.dir === 'venta'; }).length); }
      var ch = C.bars('ing', { title: 'Comprobantes recibidos por día', sub: 'Últimos 30 días, según su fecha de emisión.', x: x, xTitle: 'Día', series: [{ name: 'Ventas', data: vv, color: 'var(--series-1)' }, { name: 'Compras', data: cv, color: 'var(--series-2)' }], h: 200, ticks: 10 });
      var rech = (D.rech || []).slice(0, 12).map(function (g) { return '<tr><td>' + U.dmy(g.t) + '</td><td>' + UI.pill(g.estado === 'duplicado' ? 'warn' : 'bad', g.estado === 'duplicado' ? 'Duplicado' : g.estado === 'rechazado' ? 'Rechazado' : 'Inválido', g.estado === 'duplicado' ? 'refresh' : 'x') + '</td><td class="mono">' + esc(g.id || g.nombre) + '</td><td>' + esc(g.motivo) + '</td></tr>'; }).join('') || '<tr><td colspan="4" class="tbl-empty">Todavía no se rechazó nada. Pruebe «Comprobante de otro RUC» o «XML malicioso» en Cargar archivos.</td></tr>';
      var api = S1.fx.api || {};
      body = '<div class="card">' + ch + '</div><div class="sect"><div class="sect-h"><h2>Rechazados y duplicados</h2></div><div class="tbl-wrap" ' + rf('RF-ING-06') + '><table><thead><tr><th>Fecha</th><th>Estado</th><th>Comprobante</th><th>Motivo</th></tr></thead><tbody>' + rech + '</tbody></table></div></div>' +
        '<div class="sect"><div class="sect-h"><h2>Conectores del facturador</h2></div><div class="cardrow" ' + rf('RF-ING-07') + '>' + [['bsale', 'Bsale', 'API REST: documentos, detalles y stock. Trae las ventas cada día sin exportar a mano.'], ['pse', 'Otro PSE (por ejemplo, Nubefact)', 'Ventas por API del proveedor. La documentación oficial está pendiente de revisar.']].map(function (c) { var on = api[c[0]]; return '<div class="card"><div class="row sb"><h3>' + c[1] + '</h3>' + (on ? UI.pill('ok', 'Conectado', 'checkc') : UI.pill('mute', 'Sin conectar', 'x')) + '</div><p class="mut2">' + c[2] + '</p>' + (on ? '<p class="mut" style="font-size:12.5px">Última sincronización: hoy 06:00 · 0 errores · simulado</p>' : '') + '<button class="btn btn-sm mt-s" data-act="fx.api" data-id="' + c[0] + '">' + (on ? 'Desconectar' : 'Conectar (simulado)') + '</button></div>'; }).join('') + '<div class="card" ' + rf('RF-STK-08') + '><h3>Stock del POS</h3><p class="mut2">Si el comercio ya tiene inventario en Bsale, se usaría ese stock en lugar de reconstruirlo. Fase 3.</p></div></div></div>';
    }
    return H.head('Fuentes', 'Las facturas de sus proveedores y las boletas que usted emite. Con eso se arma el inventario, sin digitarlo.') + UI.tabs(TABS.map(function (t) { return [t[0], t[1], t[2]]; }), tab, '/s1/fuentes') + body;
  };
  S1.after.fuentes = function () {
    var f = document.getElementById('fx-file'), drop = document.getElementById('drop');
    var read = function (files) {
      var n = 0, tot = files.length, last = null; if (!tot) return;
      Array.prototype.forEach.call(files, function (file) { var fr = new FileReader(); fr.onload = function () { last = S1.runIngest(fr.result, 'carga', file.name); n++; if (n === tot) App.changed(); }; fr.readAsText(file); });
    };
    if (f) f.addEventListener('change', function () { read(f.files); });
    if (drop) {
      ['dragenter', 'dragover'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('over'); }); });
      ['dragleave', 'drop'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('over'); }); });
      drop.addEventListener('drop', function (e) { read(e.dataTransfer.files); });
    }
  };
  App.acts['fx.copy'] = function () { var t = document.getElementById('mbx').textContent; if (navigator.clipboard) navigator.clipboard.writeText(t); UI.toast('Dirección copiada', 'ok'); };
  App.acts['fx.rotar'] = function () { var D = App.D; D.buzon = 'c8f3-' + U.hashHex(String(Math.random())).slice(0, 12); E.audit(D, App.ROLES[App.S.rol].n, 'Buzón rotado', 'La dirección anterior queda revocada.'); UI.toast('Nueva dirección generada; la anterior ya no recibe', 'ok'); App.changed(); };
  App.acts['fx.correo'] = function () {
    var s = S1.samples(App.D).filter(function (x) { return x.id === 'compra' || x.id === 'compra_falt'; })[0];
    if (!s) { UI.toast('No hay pedidos en tránsito: registre uno en «Visitas y pedidos»', 'info'); return; }
    S1.runIngest(s.build(), 'correo', 'correo-' + s.id + '.xml'); App.changed();
  };
  App.acts['fx.sample'] = function (el) {
    var s = S1.samples(App.D).filter(function (x) { return x.id === el.dataset.id; })[0]; if (!s) return;
    S1.runIngest(s.build(), s.src, s.id + '.xml'); App.changed();
  };
  App.acts['fx.paste'] = function () { var t = document.getElementById('fx-paste').value; if (!t.trim()) { UI.toast('Pegue un XML primero', 'bad'); return; } S1.runIngest(t, 'carga', 'pegado.xml'); App.changed(); };
  App.acts['fx.plantilla'] = function () {
    var csv = 'fecha;descripcion;cantidad;precio_unitario\n2026-11-06;cemento sol 42.5;3;32\n2026-11-06;fierro 1/2;2;39\n', a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'plantilla-ventas.csv'; a.click();
  };
  App.acts['fx.planilla'] = function () {
    var D = App.D, n = E.numero(D);
    var xml = E.xmlManual(D, { dir: 'venta', ruc: D.comercio.ruc, serie: 'PLN1', num: n, tipo: '03', lines: [{ desc: 'cemento sol 42.5', cant: 4, vu: 32 }, { desc: 'fierro 1/2', cant: 3, vu: 39 }, { desc: 'cable 12 x metro', cant: 20, vu: 3.2, un: 'MTR' }, { desc: 'cinta aislante', cant: 5, vu: 3 }] });
    S1.runIngest(xml, 'planilla', 'planilla-ejemplo.csv'); App.changed();
  };
  App.acts['fx.api'] = function (el) { S1.fx.api = S1.fx.api || {}; S1.fx.api[el.dataset.id] = !S1.fx.api[el.dataset.id]; App.render(); };
  function hl(xml) {
    return esc(xml).replace(/(&lt;\/?)([\w:]+)/g, '$1<span class="t">$2</span>').replace(/([\w:]+)=(&quot;[^&]*?&quot;)/g, '<span class="a">$1</span>=<span class="s">$2</span>').replace(/\[suprimido\]/g, '<span class="x">[suprimido]</span>');
  }
  S1.hl = hl;
  App.acts['fx.comp'] = function (el) {
    var D = App.D, c = D.comp.filter(function (x) { return x.id === el.dataset.id; })[0]; if (!c) return;
    var ls = D.lin.slice(c.l0, c.l1).map(function (l) {
      var st = { emp: UI.pill('ok', 'Emparejada', 'check'), pend: UI.pill('warn', 'Por confirmar', 'clock'), gen: UI.pill('mute', 'Genérica', 'minus'), noinv: UI.pill('mute', 'No es inventario', 'x'), pendref: UI.pill('warn', 'Sin original', 'alert') }[l.est];
      return '<tr><td>' + esc(l.desc) + (l.cod ? '<small class="sub mono">' + esc(l.cod) + (l.gtin ? ' · GTIN ' + l.gtin : '') + '</small>' : '') + '</td><td class="right num">' + U.num(l.cant) + '</td><td class="right num">' + U.money(l.vu) + '</td><td>' + st + (l.prod ? '<small class="sub">' + esc(D.prods[l.prod].nombre) + (l.factor > 1 ? ' · ×' + l.factor : '') + '</small>' : '') + '</td></tr>';
    }).join('');
    var xml = (D.xml && D.xml[c.id]) || E.xmlOf(D, c, { pii: false });
    UI.modal({ title: 'Comprobante ' + esc(c.id), drawer: true, wide: true, body: '<dl class="kv" style="margin-bottom:12px"><dt>Fecha</dt><dd>' + U.dmy(c.fecha) + '</dd><dt>Sentido</dt><dd>' + (c.dir === 'compra' ? 'Compra (el comercio es el adquirente)' : 'Venta (el comercio es el emisor)') + '</dd><dt>Adquirente</dt><dd>' + (c.adq ? 'Se guardó solo el tipo: ' + c.adq + '. El nombre y el documento se suprimieron.' : c.dir === 'venta' ? 'Clientes varios' : 'Este comercio') + '</dd><dt>Total</dt><dd>' + U.money(c.total) + '</dd></dl><div class="tbl-wrap"><table><thead><tr><th>Descripción</th><th class="right">Cant.</th><th class="right">V. unit.</th><th>Estado</th></tr></thead><tbody>' + ls + '</tbody></table></div><h4 class="mt">XML guardado</h4><div class="xmlbox">' + hl(xml) + '</div>', actions: [{ label: 'Cerrar', kind: 'btn-primary' }] });
  };

  /* ---------- Confirma una vez ---------- */
  S1.pair = { key: null, cand: null, factor: 1 };
  S1.pages.emparejar = function () {
    var D = App.D;
    if (!App.can('emparejar')) return H.blocked('confirmar emparejamientos');
    var q = E.calidad(D), ps = E.pendientes(D), P = S1.pair;
    if (!ps.some(function (g) { return g.key === P.key; })) { P.key = ps[0] ? ps[0].key : null; P.cand = null; }
    var sel = ps.filter(function (g) { return g.key === P.key; })[0];
    var items = ps.map(function (g) {
      var pv = g.dir === 'compra' ? D.provList.filter(function (v) { return v.ruc === g.provRuc; })[0] : null;
      return '<button class="qitem' + (g.key === P.key ? ' on' : '') + '" data-act="pr.pick" data-key="' + esc(g.key) + '"><b>' + esc(g.desc) + '</b><small>' + (g.dir === 'compra' ? UI.pill('info', 'Compra', 'down') : UI.pill('mute', 'Venta', 'up')) + '<span>' + g.lineas.length + ' línea(s)</span><span>' + U.money0(g.valor) + '</span>' + (g.cod ? '<span class="mono">' + esc(g.cod) + '</span>' : '') + '</small></button>';
    }).join('') || '<div class="empty-note">No queda nada por confirmar.</div>';
    var det = '';
    if (!sel) det = '<div class="card">' + UI.empty('Todo emparejado', 'Las nuevas descripciones y códigos aparecerán aquí. Pruebe una boleta con descripciones nunca vistas en Fuentes › Cargar archivos.') + '</div>';
    else {
      var casc = E.cascada(D, { desc: sel.desc, cod: sel.cod, gtin: sel.gtin, provRuc: sel.provRuc }, sel.dir);
      if (P.cand == null || P.lastKey !== sel.key) { P.cand = casc.cands[0] ? casc.cands[0].prod : null; P.factor = sel.dir === 'compra' ? ((casc.cands[0] && casc.cands[0].prod && D.prods[casc.cands[0].prod].factor > 1 && E.factorSugerido(sel.desc) === D.prods[casc.cands[0].prod].factor) ? D.prods[casc.cands[0].prod].factor : (E.factorSugerido(sel.desc) || (casc.cands[0] && casc.cands[0].prod ? D.prods[casc.cands[0].prod].factor : 1))) : 1; P.lastKey = sel.key; }
      var cand = casc.cands.map(function (c) {
        var p = c.prod ? D.prods[c.prod] : null;
        return '<button class="cand' + (P.cand === c.prod && c.prod ? ' on' : '') + '" data-act="pr.cand" data-id="' + (c.prod || '') + '" ' + (p ? '' : 'disabled') + '><span><b>' + esc(p ? p.nombre : c.nuevo + ' (nuevo)') + '</b><small class="mut" style="display:block">' + esc(c.via) + '</small><span class="sc"><i style="width:' + Math.round(c.score * 100) + '%"></i></span></span><b class="num">' + Math.round(c.score * 100) + '%</b></button>';
      }).join('') || '<p class="mut">Sin candidatos: cree el producto o márquelo como «no es inventario».</p>';
      var pr = P.cand ? D.prods[P.cand] : null, impact = '';
      if (pr) {
        var L = E.led(D, pr.id), lastD = L.counts.length ? L.counts[L.counts.length - 1].d : -1, dsum = 0;
        sel.lineas.forEach(function (i) { var l = D.lin[i]; if (E.di(l.fecha) > lastD) dsum += (l.dir === 'compra' ? 1 : -1) * (l.sg || 1) * l.cant * (l.dir === 'compra' ? P.factor : 1); });
        impact = L.now == null ? '<p class="mut2">El producto aún no tiene conteo: el stock teórico seguirá desconocido hasta contarlo.</p>' : '<div class="note ' + (L.now + dsum < 0 ? 'warn' : '') + '" style="margin-top:10px">Al confirmar, el stock teórico de <b>' + esc(pr.nombre) + '</b> pasa de <b>' + H.sn(L.now) + '</b> a <b>' + H.sn(L.now + dsum) + '</b>' + (L.now + dsum <= 0 ? '. Conviene contarlo enseguida.' : ' ' + esc(E.plural(pr.ub, 2)) + '.') + '</div>';
      }
      var fact = sel.dir === 'compra' ? '<div class="field" style="margin-top:12px" ' + rf('RF-EMP-04') + '><label>Factor de conversión: unidades de venta por unidad comprada</label><div class="row"><input class="input" style="max-width:130px" type="number" min="1" step="1" value="' + P.factor + '" data-inp="pr.factor"><span class="mut2">«' + esc(sel.desc) + '» → sugerido ×' + (E.factorSugerido(sel.desc)) + (pr && pr.factor > 1 ? ' · el catálogo usa ×' + pr.factor + ' (' + esc(pr.uc) + ')' : '') + '</span></div><small>Sin factor confirmado, la compra no toca el stock (RN-11).</small></div>' : '';
      det = '<div class="card"><div class="row sb"><div><small class="mut">' + (sel.dir === 'compra' ? 'Línea de compra' : 'Línea de venta') + ' · última ' + U.dm(sel.ultima) + '</small><h2 style="margin:2px 0 4px">' + esc(sel.desc) + '</h2></div><span class="chip-r">' + sel.lineas.length + ' línea(s) · ' + U.num(sel.unidades) + ' un.</span></div>' +
        (sel.cod ? '<p class="mut2" style="margin:0">Código del vendedor <span class="mono">' + esc(sel.cod) + '</span>' + (sel.gtin ? ' · GTIN <span class="mono">' + sel.gtin + '</span>' : '') + (sel.sunat ? ' · código SUNAT <span class="mono">' + sel.sunat + '</span>' : '') + '</p>' : '') +
        '<h4 class="mt" ' + rf('RF-EMP-02') + '>Candidatos</h4><div class="col gap-s" style="margin-top:8px">' + cand + '</div>' + fact + impact +
        '<div class="row mt gap-s wrap"><button class="btn btn-primary" data-act="pr.ok" ' + (pr ? '' : 'disabled') + '>' + ic('check', 15) + 'Confirmar y aplicar a ' + sel.lineas.length + ' línea(s)</button><button class="btn" data-act="pr.nuevo">' + ic('plus', 15) + 'Crear producto</button><button class="btn btn-ghost" data-act="pr.noinv">No es inventario</button></div></div>' +
        '<details class="card mt" style="padding:10px 16px"><summary style="cursor:pointer;font-weight:600">Cómo decidió el sistema (5 pasos de la cascada)</summary><div class="trace mt-s">' + casc.trace.map(function (t) { return '<div class="tr ' + (t.ok ? 'ok' : '') + '"><span class="num">' + t.paso + '</span><div><b>' + esc(t.nombre) + '</b><br><span class="mut2">' + esc(t.det) + '</span></div></div>'; }).join('') + '</div></details>';
    }
    var chips = '<div class="row wrap gap-s" ' + rf('RF-EMP-07') + '>' + UI.pill('ok', 'Emparejadas ' + U.pct(q.empPct, 1), 'check') + UI.pill(q.pend ? 'warn' : 'ok', 'Por confirmar ' + U.pct(q.pendPct, 1) + ' (' + q.pend + ')', 'clock') + UI.pill('mute', 'Genéricas ' + U.pct(q.genPct, 1) + ' (' + q.gen + ')', 'minus') + '<span class="mut">En valor: ' + U.pct(q.identV, 1) + ' identificable</span></div>';
    var maps = UI.table('tbl-mapas', { rows: function () { return Object.keys(D.mapas).map(function (k) { return Object.assign({ k: k }, D.mapas[k]); }).reverse(); }, search: function (m) { return m.k + ' ' + (D.prods[m.prod] ? D.prods[m.prod].nombre : ''); }, placeholder: 'Buscar un mapa', pageSize: 8, cols: [{ label: 'Clave', render: function (m) { return '<span class="mono">' + esc(m.k.replace(/^C\|/, 'compra · ').replace(/^V\|/, 'venta · ')) + '</span>'; }, sort: function (m) { return m.k; } }, { label: 'Producto', render: function (m) { return m.prod === '__NOINV__' ? '<span class="mut">No es inventario</span>' : esc(D.prods[m.prod] ? D.prods[m.prod].nombre : m.prod); }, sort: function (m) { return m.prod; } }, { label: 'Factor', align: 'right', render: function (m) { return m.k[0] === 'C' ? '×' + m.factor : '—'; } }, { label: 'Origen', render: function (m) { return m.origen; } }, { label: 'Por', render: function (m) { return esc(m.por || ''); } }] });
    return H.head('Confirma una vez', 'Cada descripción o código nuevo se confirma una sola vez. Después se aplica solo, en todas las líneas, hasta que el proveedor cambie el código.') + chips + '<div class="pairs mt"><div><div class="qlist" ' + rf('RF-EMP-03') + '>' + items + '</div></div><div>' + det + '</div></div><div class="sect"><div class="sect-h"><h2>Mapas confirmados del comercio</h2></div>' + maps + '<p class="ch-note" ' + rf('RF-EMP-05') + '>Si el proveedor cambia el código de un producto, la línea vuelve a esta cola aunque la descripción sea la misma.</p></div>';
  };
  App.acts['pr.pick'] = function (el) { S1.pair.key = el.dataset.key; S1.pair.cand = null; App.render(); };
  App.acts['pr.cand'] = function (el) { var D = App.D, p = D.prods[el.dataset.id]; S1.pair.cand = el.dataset.id; var g = E.pendientes(D).filter(function (x) { return x.key === S1.pair.key; })[0]; if (g && g.dir === 'compra') S1.pair.factor = E.factorSugerido(g.desc) > 1 ? E.factorSugerido(g.desc) : p.factor; App.render(); };
  App.inp['pr.factor'] = function (el) { S1.pair.factor = Math.max(1, +el.value || 1); };
  function confirmar(prodId) {
    var D = App.D, g = E.pendientes(D).filter(function (x) { return x.key === S1.pair.key; })[0]; if (!g) return;
    var f = S1.pair.factor, n = E.confirmar(D, g.idx, prodId, f, { user: App.ROLES[App.S.rol].n });
    App.flag('confirmo'); S1.pair.cand = null; S1.pair.key = null; UI.toast(n + ' línea(s) aplicada(s)' + (prodId === '__NOINV__' ? ' como «no es inventario»' : ' a ' + D.prods[prodId].nombre), 'ok'); App.changed();
  }
  App.acts['pr.ok'] = function () { if (S1.pair.cand) confirmar(S1.pair.cand); };
  App.acts['pr.noinv'] = function () { confirmar('__NOINV__'); };
  App.acts['pr.nuevo'] = function () {
    var D = App.D, g = E.pendientes(D).filter(function (x) { return x.key === S1.pair.key; })[0]; if (!g) return;
    var pv = g.dir === 'compra' ? D.provList.filter(function (v) { return v.ruc === g.provRuc; })[0] : null;
    UI.modal({ title: 'Crear un producto nuevo', body: '<div class="form2">' + UI.field('Nombre', '<input class="input" name="nombre" value="' + esc(g.desc.toLowerCase().replace(/^./, function (c) { return c.toUpperCase(); })) + '">') + UI.field('Proveedor', '<select class="select" name="prov">' + D.provList.map(function (v) { return '<option value="' + v.id + '"' + (pv && pv.id === v.id ? ' selected' : '') + '>' + esc(v.nombre) + '</option>'; }).join('') + '</select>') + UI.field('Unidad de venta', '<input class="input" name="ub" value="unidad">') + UI.field('Factor de compra', '<input class="input" name="factor" type="number" min="1" value="' + (E.factorSugerido(g.desc) || 1) + '">') + UI.field('Costo por unidad (S/)', '<input class="input" name="costo" type="number" step="0.01" value="1">') + UI.field('Precio de venta (S/)', '<input class="input" name="precio" type="number" step="0.01" value="2">') + '</div>', actions: [{ label: 'Cancelar' }, { label: 'Crear y confirmar', kind: 'btn-primary', onClick: function (m) { var p = E.crearProducto(D, { nombre: m.val('nombre'), prov: m.val('prov'), ub: m.val('ub'), factor: +m.val('factor') || 1, costo: m.val('costo'), precio: m.val('precio'), cod: g.cod || '' }); S1.pair.factor = p.factor; confirmar(p.id); } }] });
  };
})();

/* Retorna (nombre de trabajo) — prototipo P5-V6
   Datos y utilidades. TODO es simulado: no hay clientes, precios ni resultados reales. */
(function () {
  'use strict';
  var App = (window.App = window.App || {});

  /* ---------- utilidades ---------- */
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var U = (App.U = {
    pad: pad,
    parse: function (iso) { var p = iso.split('-').map(Number); return Date.UTC(p[0], p[1] - 1, p[2]); },
    fmt: function (ms) { var d = new Date(ms); return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()); },
    addDays: function (iso, n) { return U.fmt(U.parse(iso) + n * 864e5); },
    diff: function (a, b) { return Math.round((U.parse(a) - U.parse(b)) / 864e5); },
    dmy: function (iso) { return iso ? iso.slice(8, 10) + '/' + iso.slice(5, 7) + '/' + iso.slice(0, 4) : ''; },
    dm: function (iso) { return iso ? iso.slice(8, 10) + '/' + iso.slice(5, 7) : ''; },
    dow: function (iso) { return ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'][new Date(U.parse(iso)).getUTCDay()]; },
    median: function (a) {
      if (!a.length) return null;
      var s = a.slice().sort(function (x, y) { return x - y; }), m = s.length >> 1;
      return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
    },
    money: function (n) {
      var neg = n < 0; n = Math.abs(n);
      var s = n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return (neg ? '−' : '') + 'S/ ' + s;
    },
    num: function (n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ','); },
    clamp: function (v, a, b) { return Math.max(a, Math.min(b, v)); },
    uuid: function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 3) | 8).toString(16);
      });
    },
    short: function (u) { return u ? u.slice(0, 8) : ''; },
    rng: function (seed) {
      var a = seed >>> 0;
      return function () {
        a |= 0; a = (a + 0x6d2b79f5) | 0;
        var t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    },
    esc: function (s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    },
    hash: function (str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16; return (h >>> 0) / 4294967296; },
    initials: function (n) { return n.split(' ').slice(0, 2).map(function (x) { return x[0]; }).join('').toUpperCase(); }
  });

  App.HOY = '2026-11-06';

  /* ---------- reloj simulado ---------- */
  App.clock = {
    min: 9 * 60 + 10,
    hhmm: function () { return pad(Math.floor(this.min / 60) % 24) + ':' + pad(this.min % 60); },
    set: function (hhmm) { var p = hhmm.split(':'); this.min = +p[0] * 60 + +p[1]; },
    tick: function (n) { this.min = Math.min(this.min + (n == null ? 1 : n), 23 * 60 + 59); },
    stamp: function () { return App.HOY + 'T' + this.hhmm(); },
    inWindow: function (cfg) {
      var a = cfg.horaIni.split(':'), b = cfg.horaFin.split(':');
      return this.min >= +a[0] * 60 + +a[1] && this.min <= +b[0] * 60 + +b[1];
    }
  };

  /* ---------- catálogo base ---------- */
  var PRODUCTOS = {
    GLP10: { id: 'GLP10', nombre: 'Balón de gas 10 kg', corto: 'Gas 10 kg', tipo: 'gas', envase: 'BAL10', precio: 52, ref: 30, rango: [7, 90] },
    GLP5: { id: 'GLP5', nombre: 'Balón de gas 5 kg', corto: 'Gas 5 kg', tipo: 'gas', envase: 'BAL5', precio: 31, ref: 18, rango: [5, 60] },
    GLP45: { id: 'GLP45', nombre: 'Balón de gas 45 kg', corto: 'Gas 45 kg', tipo: 'gas', envase: 'BAL45', precio: 205, ref: 60, rango: [20, 150] },
    AGUA20: { id: 'AGUA20', nombre: 'Bidón de agua 20 L', corto: 'Agua 20 L', tipo: 'agua', envase: 'BID20', precio: 12, ref: 4, rango: [1, 21] }
  };
  var ENVASES = {
    BAL10: { id: 'BAL10', nombre: 'Balón 10 kg', garantia: 60 },
    BAL5: { id: 'BAL5', nombre: 'Balón 5 kg', garantia: 40 },
    BAL45: { id: 'BAL45', nombre: 'Balón 45 kg', garantia: 150 },
    BID20: { id: 'BID20', nombre: 'Bidón 20 L', garantia: 15 }
  };

  /* ---------- hogares (generados con semilla fija) ---------- */
  var NOMBRES = ['Rosa', 'Juan', 'María', 'Carlos', 'Elena', 'Pedro', 'Luz', 'Jorge', 'Ana', 'Víctor', 'Carmen', 'Luis', 'Julia', 'Miguel', 'Sofía', 'Raúl', 'Teresa', 'Hugo', 'Gladys', 'Óscar', 'Mirian', 'Walter', 'Norma', 'Percy', 'Delia', 'Edwin', 'Yolanda', 'César', 'Pilar', 'Manuel'];
  var APELL = ['Quispe', 'Huamán', 'Flores', 'Rojas', 'Mamani', 'Chávez', 'Gutiérrez', 'Torres', 'Condori', 'Vargas', 'Ramos', 'Castro', 'Salazar', 'Paredes', 'Ccori', 'Yupanqui', 'Villanueva', 'Mendoza', 'Ruiz', 'Cárdenas'];
  var DISTRITOS = ['Comas', 'Independencia', 'Los Olivos', 'Carabayllo', 'San Martín de Porres'];
  var CALLES = ['Jr. Los Pinos', 'Av. Las Flores', 'Jr. Huáscar', 'Psje. San Judas', 'Av. Tupac Amaru', 'Jr. Lima', 'Calle Los Cedros', 'Av. Universitaria'];
  var REFS = ['casa verde, portón negro', 'frente a la bodega', '2.º piso, timbre malogrado', 'sticker del balón en la puerta', 'al costado del colegio', 'esquina con paradero', 'puerta azul, perro en la azotea', 'tienda de abarrotes en el primer piso'];

  function buildHogares(hoy) {
    var R = U.rng(20261106), out = [];
    var CAL = {};
    function pick(a) { return a[Math.floor(R() * a.length)]; }
    function histGen(cycle, qty, lastAgo, n, noise, rr) {
      // genera entregas hacia atrás: la última hace lastAgo días
      var arr = [], d = U.addDays(hoy, -lastAgo);
      arr.unshift({ fecha: d, qty: qty });
      for (var i = 1; i < n; i++) {
        var gap = Math.max(1, Math.round(cycle * qty * (1 + (noise ? (rr() - 0.5) * 2 * noise : 0))));
        d = U.addDays(d, -gap);
        arr.unshift({ fecha: d, qty: qty });
      }
      return arr;
    }
    // [id, nombre, distrito, prod, qty, cycle, off, n, extra]
    // off = días hasta la fecha de aviso (0 = hoy). lastAgo = cycle*qty - anticipación - off
    var H = [
      ['H-001', 'Rosa Quispe', 0, 'GLP10', 1, 30, 0, 6],
      ['H-002', 'Juan Huamán', 1, 'GLP10', 1, 28, 0, 5],
      ['H-003', 'María Flores', 2, 'AGUA20', 2, 4, 0, 7],
      ['H-004', 'Carlos Rojas', 3, 'GLP5', 1, 17, 0, 5],
      ['H-005', 'Elena Mamani', 0, 'GLP10', 2, 26, 0, 4],
      ['H-006', 'Pedro Chávez', 4, 'GLP10', 1, 33, 0, 5],
      ['H-007', 'Luz Gutiérrez', 1, 'AGUA20', 1, 5, 0, 8, { sinWhatsapp: true }],
      ['H-008', 'Jorge Torres', 0, 'GLP10', 1, 31, 0, 6],
      ['H-009', 'Ana Condori', 2, 'GLP10', 1, 29, 0, 4, { consent: 'ninguno' }],
      ['H-010', 'Víctor Vargas', 3, 'GLP10', 1, 32, 0, 5, { consent: 'baja' }],
      ['H-011', 'Carmen Ramos', 0, 'GLP10', 1, 30, 0, 5, { pedidoAbierto: true }],
      ['H-012', 'Luis Castro', 1, 'GLP10', 1, 27, -1, 5, { avisoAyer: true }],
      ['H-013', 'Julia Salazar', 4, 'GLP10', 1, 31, 0, 5, { grupo: 'control' }],
      ['H-014', 'Miguel Paredes', 2, 'GLP10', 1, 30, 0, 1],
      ['H-015', 'Sofía Yupanqui', 3, 'GLP10', 1, 5, 0, 5, { fueraRango: true, lastAgoFix: 29 }],
      ['H-016', 'Raúl Villanueva', 0, 'GLP10', 1, 29, 1, 5],
      ['H-017', 'Teresa Mendoza', 1, 'AGUA20', 2, 3, 1, 8],
      ['H-018', 'Hugo Ruiz', 2, 'GLP10', 1, 34, 2, 5],
      ['H-019', 'Gladys Cárdenas', 3, 'GLP5', 1, 16, 2, 6],
      ['H-020', 'Óscar Quispe', 4, 'GLP10', 1, 30, 3, 5],
      ['H-021', 'Mirian Huamán', 0, 'GLP10', 1, 28, 4, 4],
      ['H-022', 'Walter Flores', 1, 'GLP45', 1, 55, 3, 4, { negocio: 'Pollería El Fogón' }],
      ['H-023', 'Norma Rojas', 2, 'AGUA20', 1, 6, 5, 7],
      ['H-024', 'Percy Mamani', 3, 'GLP10', 1, 31, 6, 5],
      ['H-025', 'Delia Chávez', 4, 'GLP10', 1, 30, -18, 5, { perdido: true }],
      ['H-026', 'Edwin Gutiérrez', 0, 'GLP10', 1, 29, -24, 4, { perdido: true }],
      ['H-027', 'Yolanda Torres', 1, 'GLP5', 1, 18, -21, 5, { perdido: true }],
      ['H-028', 'César Condori', 2, 'GLP10', 1, 33, -41, 4, { perdido: true }],
      ['H-029', 'Pilar Vargas', 3, 'GLP10', 1, 30, 0, 5, { pospuesto: true }],
      ['H-030', 'Manuel Ramos', 4, 'GLP10', 2, 25, 1, 4]
    ];
    var rr = U.rng(777);
    H.forEach(function (s, idx) {
      var ex = s[8] || {};
      var anticip = 1;
      var lastAgo = ex.lastAgoFix != null ? ex.lastAgoFix : Math.round(s[5] * s[4]) - anticip - s[6];
      var h = {
        id: s[0], nombre: s[1], negocio: ex.negocio || null,
        distrito: DISTRITOS[s[2]], dir: pick(CALLES) + ' ' + (100 + Math.floor(R() * 900)), ref: pick(REFS),
        tel: '900 000 ' + (100 + idx), loc: null,
        productos: [{ p: s[3], qty: s[4] }],
        entregas: {}, envSaldo: {}, deuda: 0, garantia: 0,
        consent: { estado: ex.consent === 'ninguno' ? 'ninguno' : ex.consent === 'baja' ? 'baja' : 'vigente', fecha: U.addDays(hoy, -90 - idx), medio: 'verbal_entrega', texto: 'Aviso de reposición por WhatsApp', por: 'U-R1' },
        grupo: null, exp: null, posponer: {}, todavia: {}, notas: ex.fueraRango ? 'Cocina con leña la mayor parte del mes' : ''
      };
      if (ex.consent === 'ninguno') { h.consent.fecha = null; h.consent.medio = null; h.consent.texto = null; h.consent.por = null; }
      if (ex.consent === 'baja') h.consent.bajaFecha = U.addDays(hoy, -12);
      var noise = ex.fueraRango ? 0 : 0.0;
      h.entregas[s[3]] = histGen(s[5], s[4], lastAgo, s[7], noise, rr);
      if (ex.pospuesto) { h.posponer[s[3]] = U.addDays(hoy, 2); h.todavia[s[3]] = 1; }
      if (ex.grupo) h.grupo = ex.grupo;
      h._flags = ex; h.sinWhatsapp = !!ex.sinWhatsapp;
      h.envSaldo[PRODUCTOS[s[3]].envase] = s[4];
      out.push(h);
    });

    // hogares generados
    for (var i = 31; i <= 132; i++) {
      var r = R(), prod, qty = 1, cycle;
      if (r < 0.7) { prod = 'GLP10'; cycle = 24 + R() * 18; qty = R() < 0.12 ? 2 : 1; }
      else if (r < 0.82) { prod = 'GLP5'; cycle = 14 + R() * 10; }
      else if (r < 0.86) { prod = 'GLP45'; cycle = 45 + R() * 25; }
      else { prod = 'AGUA20'; cycle = 3 + R() * 4; qty = 1 + Math.floor(R() * 3); }
      var total = Math.round(cycle * qty);
      var lastAgo = Math.floor(R() * total * 0.88);
      var n = 2 + Math.floor(R() * 5);
      var consent = R() < 0.06 ? 'ninguno' : 'vigente';
      var nm = pick(NOMBRES) + ' ' + pick(APELL);
      var h = {
        id: 'H-' + String(i).padStart(3, '0'), nombre: nm, negocio: null, distrito: pick(DISTRITOS),
        dir: pick(CALLES) + ' ' + (100 + Math.floor(R() * 900)), ref: pick(REFS), tel: '900 000 ' + (100 + i), loc: null,
        productos: [{ p: prod, qty: qty }], entregas: {}, envSaldo: {}, deuda: 0, garantia: 0,
        consent: { estado: consent, fecha: consent === 'vigente' ? U.addDays(hoy, -Math.floor(20 + R() * 200)) : null, medio: consent === 'vigente' ? 'verbal_entrega' : null, texto: consent === 'vigente' ? 'Aviso de reposición por WhatsApp' : null, por: 'U-R1' },
        grupo: null, exp: null, posponer: {}, todavia: {}, notas: ''
      };
      h.entregas[prod] = histGen(cycle, qty, lastAgo, n, 0.1, R);
      h.envSaldo[PRODUCTOS[prod].envase] = qty + (R() < 0.08 ? 1 : 0);
      if (R() < 0.07) h.deuda = [12, 24, 31, 52][Math.floor(R() * 4)];
      out.push(h);
    }
    return out;
  }

  /* ---------- estado inicial ---------- */
  App.seed = function () {
    var hoy = App.HOY;
    var S = {
      hoy: hoy,
      empresa: { id: 'E-001', nombre: 'Gas y Agua Santa Rosa', ruc: 'Ejemplo (sin RUC real)', distrito: 'Comas', plan: 'Negocio', registroHidrocarburos: '' },
      rolPortal: 'dueno',
      permisoDespVerifica: false,
      fase: 'todo',
      usuarios: [
        { id: 'U-D1', nombre: 'Rosa Medina', rol: 'dueno', tel: '900 000 001', activo: true },
        { id: 'U-P1', nombre: 'Julio Ramos', rol: 'despachador', tel: '900 000 002', activo: true },
        { id: 'U-R1', nombre: 'Luis Quispe', rol: 'repartidor', tel: '900 000 011', pin: '1234', vehiculo: 'Moto 1', activo: true },
        { id: 'U-R2', nombre: 'Marco Huamán', rol: 'repartidor', tel: '900 000 012', pin: '1234', vehiculo: 'Camioneta', activo: true }
      ],
      productos: JSON.parse(JSON.stringify(PRODUCTOS)),
      envases: JSON.parse(JSON.stringify(ENVASES)),
      precioHist: {
        GLP10: [{ fecha: '2026-07-01', precio: 48 }, { fecha: '2026-09-15', precio: 50 }, { fecha: '2026-10-20', precio: 52 }],
        GLP5: [{ fecha: '2026-07-01', precio: 29 }, { fecha: '2026-10-20', precio: 31 }],
        GLP45: [{ fecha: '2026-07-01', precio: 190 }, { fecha: '2026-10-20', precio: 205 }],
        AGUA20: [{ fecha: '2026-07-01', precio: 10 }, { fecha: '2026-10-01', precio: 12 }]
      },
      marcas: [
        { id: 'propia', nombre: 'Gasandina (propia)', acepta: true },
        { id: 'fuegoalto', nombre: 'Fuegoalto', acepta: true },
        { id: 'cumbre', nombre: 'Cumbre Gas', acepta: false },
        { id: 'manantial', nombre: 'Manantial (propia, agua)', acepta: true },
        { id: 'cristalina', nombre: 'Cristalina (agua)', acepta: true }
      ],
      config: {
        k: 4, anticipacion: 1, maxAvisos: 1, horaIni: '08:00', horaFin: '20:00', envioAuto: false,
        sinHistorial: 'referencia', posponerDias: 3, perdidoDias: 15, limiteFiado: 150,
        exigeMarcaVacio: true, pendienteHoras: 2,
        tarifaMarketing: 0.25, tarifaUtilidad: 0.05, tarifaServicio: 0.0
      },
      inventario: {
        BAL10: { llenos: 46, vacios: { propia: 31, fuegoalto: 4 } },
        BAL5: { llenos: 18, vacios: { propia: 12 } },
        BAL45: { llenos: 6, vacios: { propia: 3 } },
        BID20: { llenos: 70, vacios: { manantial: 44, cristalina: 6 } }
      },
      hogares: buildHogares(hoy),
      pedidos: [], avisos: [], mensajes: [], cobros: [], entregas: [], movEnv: [], eventLog: [],
      auditoria: [], cambios: {}, jornadas: [], cuadres: {}, alertas: [], pagos: [], pagoLinks: {},
      conteos: [], solicitudesDatos: [],
      dispositivos: {
        'U-R1': { id: 'DEV-R1', userId: 'U-R1', modelo: 'Android 11, 2 GB', version: '0.9.3', ultimoContacto: null, pendientesRep: 0, revocado: false },
        'U-R2': { id: 'DEV-R2', userId: 'U-R2', modelo: 'Android 9, 2 GB', version: '0.9.3', ultimoContacto: null, pendientesRep: 0, revocado: false }
      },
      devices: {}, deviceUser: null,
      plantillas: [
        { id: 'T1', nombre: 'reposicion_anticipada', categoria: 'marketing', estado: 'aprobada', texto: 'Hola {{1}}, ¿le llevamos mañana su {{2}}? Responda con un botón.', botones: ['Sí, mañana', 'Todavía tengo', 'No volver a escribir'] },
        { id: 'T2', nombre: 'pedido_en_camino', categoria: 'utilidad', estado: 'aprobada', texto: 'Su pedido {{1}} sale hoy. Total: {{2}}. Puede pagar con Yape en este enlace: {{3}}', botones: [] },
        { id: 'T3', nombre: 'recojo_de_envase', categoria: 'utilidad', estado: 'en_revision', texto: 'Le recordamos que tiene {{1}} envase(s) prestado(s). ¿Coordinamos el recojo?', botones: ['Sí', 'Después'] }
      ],
      experimento: { id: 'EXP-01', activo: true, semilla: 20261012, inicio: '2026-10-12', semanas: 6, fin: '2026-11-23', producto: 'GLP10 y GLP5', bloqueado: true },
      flags: { whatsappApi: true, pasarela: true, fiado: true, recurrentes: true, probables: true, glp: false },
      empresas: [
        { id: 'E-001', nombre: 'Gas y Agua Santa Rosa', plan: 'Negocio', repartidores: 2, estado: 'activa', alta: '2026-09-02', msgs: 214, costoMsgs: 53.5, cargos: 38, comisiones: 22.4, dispositivos: 2, ult: 'hoy' },
        { id: 'E-002', nombre: 'Distribuidora Aguas del Norte', plan: 'Básico', repartidores: 3, estado: 'activa', alta: '2026-09-16', msgs: 0, costoMsgs: 0, cargos: 0, comisiones: 0, dispositivos: 3, ult: 'ayer' },
        { id: 'E-003', nombre: 'Gasocentro Los Olivos', plan: 'Básico', repartidores: 1, estado: 'en prueba', alta: '2026-10-28', msgs: 0, costoMsgs: 0, cargos: 0, comisiones: 0, dispositivos: 1, ult: 'hace 3 días' }
      ]
    };
    App.S = S;
    App.clock.min = 9 * 60 + 10;
    return S;
  };
})();

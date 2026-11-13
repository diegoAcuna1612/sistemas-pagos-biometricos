/* Generador de datos sintéticos (semilla fija).
   Simula una ferretería: demanda real, compras a 6 proveedores, ventas con comprobantes, conteos y pedidos.
   El «mundo real» (stock físico y demanda perdida) queda oculto en D.truth; el sistema solo ve los comprobantes. */
(function (root) {
  'use strict';
  var App = (root.App = root.App || {});
  var U = App.U;

  var CATS = {
    CN: 'Cementos y morteros', PA: 'Tubería y accesorios PVC', AL: 'Fierro y clavos',
    ES: 'Material eléctrico', PP: 'Pinturas y accesorios', HF: 'Herramientas y fijaciones'
  };
  var SUNAT = { CN: '30111500', PA: '40142000', AL: '30102200', ES: '39121400', PP: '31211500', HF: '27112000' };

  var PROVS = [
    { id: 'CN', ruc: '20999000101', nombre: 'Cementos y Morteros del Norte S.A.C.', vendedor: 'Rolando Paz', cel: '999 000 101', dow: 1, cada: 1, ancla: null, plazo: 2, minimo: 500, serie: 'F101', web: false },
    { id: 'PA', ruc: '20999000102', nombre: 'PVC Andino S.A.', vendedor: 'Mirta Soto', cel: '999 000 102', dow: 2, cada: 1, ancla: null, plazo: 5, minimo: 400, serie: 'F102', web: false },
    { id: 'AL', ruc: '20999000103', nombre: 'Aceros Lima E.I.R.L.', vendedor: 'Gustavo Rey', cel: '999 000 103', dow: 3, cada: 1, ancla: null, plazo: 4, minimo: 800, serie: 'F103', web: false },
    { id: 'ES', ruc: '20999000104', nombre: 'Eléctrica Sur S.A.C.', vendedor: 'Karina Bravo', cel: '999 000 104', dow: 4, cada: 1, ancla: null, plazo: 3, minimo: 300, serie: 'F104', web: false },
    { id: 'PP', ruc: '20999000105', nombre: 'Pinturas del Pacífico S.A.', vendedor: 'Dante Ruiz', cel: '999 000 105', dow: 5, cada: 2, ancla: '2026-10-23', plazo: 7, minimo: 600, serie: 'F105', web: true },
    { id: 'HF', ruc: '20999000106', nombre: 'Herramientas y Fijaciones Perú S.R.L.', vendedor: 'Elsa Calle', cel: '999 000 106', dow: 6, cada: 1, ancla: null, plazo: 3, minimo: 350, serie: 'F106', web: false }
  ];

  /* id, nombre, prov, ubase, costo, precio, mu/sem, patrón, factor, unidad de compra, desc. factura, desc. boleta, alias nuevo (últimos días) */
  var CAT = [
    ['CEM-I42', 'Cemento Portland Tipo I 42.5 kg', 'CN', 'bolsa', 27.5, 32, 70, 's', 1, 'bolsa', 'CEMENTO PORTLAND TIPO I BOL 42.5 KG', 'cemento sol 42.5', 'CEMENTO TIPO 1 BOLSA'],
    ['CEM-MS', 'Cemento Tipo MS 42.5 kg', 'CN', 'bolsa', 29.5, 34, 10, 'e', 1, 'bolsa', 'CEMENTO PORTLAND TIPO MS BOL 42.5 KG', 'cemento ms'],
    ['CAL-20', 'Cal hidratada 20 kg', 'CN', 'bolsa', 11, 15, 3, 'i', 1, 'bolsa', 'CAL HIDRATADA BOLSA 20 KG', 'cal 20kg'],
    ['YES-25', 'Yeso 25 kg', 'CN', 'bolsa', 13, 18, 3, 'i', 1, 'bolsa', 'YESO CERAMICO BOLSA 25 KG', 'yeso bolsa'],
    ['PEG-25', 'Pegamento para cerámica 25 kg', 'CN', 'bolsa', 21, 28, 6, 'e', 1, 'bolsa', 'PEGAMENTO CERAMICO GRIS BOL 25KG', 'pegamento ceramica'],
    ['FRA-1', 'Fragua 1 kg', 'CN', 'unidad', 2.8, 4.5, 8, 's', 20, 'caja x 20', 'FRAGUA BLANCA 1KG CJA X 20', 'fragua blanca'],
    ['ARE-FIN', 'Arena fina (saco)', 'CN', 'saco', 4.5, 7, 25, 's', 1, 'saco', 'ARENA FINA SACO 40KG', 'arena fina saco'],
    ['PVC-SAP12', 'Tubo PVC SAP 1/2" x 5 m', 'PA', 'unidad', 9.8, 14, 14, 's', 10, 'paquete x 10', 'TUBO PVC SAP 1/2" X 5M PAQ X10', 'tubo media', 'TUBO AGUA 1/2 PVC 5M'],
    ['PVC-SAP34', 'Tubo PVC SAP 3/4" x 5 m', 'PA', 'unidad', 13.5, 19, 9, 's', 10, 'paquete x 10', 'TUBO PVC SAP 3/4" X 5M PAQ X10', 'tubo 3/4 agua'],
    ['PVC-SAP1', 'Tubo PVC SAP 1" x 5 m', 'PA', 'unidad', 19, 27, 5, 'e', 10, 'paquete x 10', 'TUBO PVC SAP 1" X 5M PAQ X10', 'tubo 1 pulgada'],
    ['PVC-DES4', 'Tubo PVC desagüe 4" x 3 m', 'PA', 'unidad', 24, 34, 6, 'e', 5, 'paquete x 5', 'TUBO PVC DESAGUE 4" X 3M PAQ X5', 'tubo desague 4'],
    ['PVC-DES2', 'Tubo PVC desagüe 2" x 3 m', 'PA', 'unidad', 11, 16, 5, 'e', 10, 'paquete x 10', 'TUBO PVC DESAGUE 2" X 3M PAQ X10', 'tubo desague 2'],
    ['COD-12', 'Codo PVC SAP 1/2" 90°', 'PA', 'unidad', 0.9, 1.8, 60, 's', 100, 'caja x 100', 'CODO PVC SAP 1/2" 90G CJA X100', 'codo media', 'CODO AGUA 1/2'],
    ['UNI-12', 'Unión PVC SAP 1/2"', 'PA', 'unidad', 0.7, 1.5, 40, 's', 100, 'caja x 100', 'UNION PVC SAP 1/2" CJA X100', 'union media'],
    ['TEE-12', 'Tee PVC SAP 1/2"', 'PA', 'unidad', 1.1, 2, 22, 's', 100, 'caja x 100', 'TEE PVC SAP 1/2" CJA X100', 'tee media'],
    ['PEG-PVC', 'Pegamento PVC 1/4 gal', 'PA', 'unidad', 18, 26, 4, 'i', 6, 'caja x 6', 'PEGAMENTO PVC 1/4 GL CJA X6', 'pegamento pvc'],
    ['CIN-TEF', 'Cinta teflón 3/4"', 'PA', 'unidad', 0.8, 1.5, 30, 's', 50, 'caja x 50', 'CINTA TEFLON 3/4" CJA X50', 'teflon'],
    ['FIE-38', 'Fierro corrugado 3/8" x 9 m', 'AL', 'varilla', 17, 22, 55, 's', 1, 'varilla', 'FIERRO CORRUGADO 3/8" X 9M', 'fierro 3/8', 'FIERRO 3/8 CORRUGADO'],
    ['FIE-12', 'Fierro corrugado 1/2" x 9 m', 'AL', 'varilla', 31, 39, 40, 's', 1, 'varilla', 'FIERRO CORRUGADO 1/2" X 9M', 'fierro 1/2'],
    ['FIE-14', 'Fierro liso 1/4" x 9 m', 'AL', 'varilla', 8, 12, 15, 'e', 1, 'varilla', 'FIERRO LISO 1/4" X 9M', 'fierro 1/4 liso'],
    ['ALA-16', 'Alambre negro N°16 (kg)', 'AL', 'kg', 5.5, 8, 45, 's', 25, 'rollo 25 kg', 'ALAMBRE NEGRO N16 ROLLO 25KG', 'alambre 16'],
    ['CLA-3', 'Clavo 3" (kg)', 'AL', 'kg', 5.2, 7.5, 20, 'e', 25, 'saco 25 kg', 'CLAVO 3" SACO 25KG', 'clavo 3', 'CLAVOS DE 3 PULG'],
    ['CLA-2', 'Clavo 2" (kg)', 'AL', 'kg', 5.2, 7.5, 12, 'e', 25, 'saco 25 kg', 'CLAVO 2" SACO 25KG', 'clavo 2'],
    ['MAL-Q', 'Malla electrosoldada Q-188', 'AL', 'unidad', 78, 105, 2, 'i', 1, 'unidad', 'MALLA ELECTROSOLDADA Q188 2.4X6M', 'malla q188'],
    ['CAL-GAL', 'Calamina galvanizada 3.6 m', 'AL', 'unidad', 22, 31, 6, 'i', 1, 'unidad', 'CALAMINA GALV 3.6M 0.30MM', 'calamina 3.6'],
    ['CAB-14', 'Cable THW 14 AWG (m)', 'ES', 'metro', 1.3, 2.2, 90, 's', 100, 'rollo 100 m', 'CABLE THW 14 AWG ROLLO 100M', 'cable 14 x metro', 'CABLE ELECTRICO N14'],
    ['CAB-12', 'Cable THW 12 AWG (m)', 'ES', 'metro', 2, 3.2, 60, 's', 100, 'rollo 100 m', 'CABLE THW 12 AWG ROLLO 100M', 'cable 12 x metro'],
    ['INT-SIM', 'Interruptor simple', 'ES', 'unidad', 2.4, 5, 14, 'e', 10, 'caja x 10', 'INTERRUPTOR SIMPLE BLANCO CJA X10', 'interruptor simple'],
    ['TOM-DOB', 'Tomacorriente doble', 'ES', 'unidad', 3, 6, 16, 'e', 10, 'caja x 10', 'TOMACORRIENTE DOBLE CON TIERRA CJA X10', 'tomacorriente doble'],
    ['FOC-LED9', 'Foco LED 9 W', 'ES', 'unidad', 2.3, 5, 35, 's', 24, 'caja x 24', 'FOCO LED 9W LUZ FRIA CJA X24', 'foco led 9w', 'FOCO AHORRADOR LED 9 W'],
    ['FOC-LED12', 'Foco LED 12 W', 'ES', 'unidad', 3.4, 7, 18, 'e', 24, 'caja x 24', 'FOCO LED 12W LUZ FRIA CJA X24', 'foco led 12w'],
    ['TER-2P', 'Térmico 2 x 20 A', 'ES', 'unidad', 14, 26, 3, 'i', 6, 'caja x 6', 'INTERRUPTOR TERMOMAGNETICO 2X20A CJA X6', 'termico 2x20'],
    ['CIN-AIS', 'Cinta aislante negra', 'ES', 'unidad', 1.4, 3, 28, 's', 10, 'caja x 10', 'CINTA AISLANTE NEGRA 18MM CJA X10', 'cinta aislante'],
    ['TUB-ELE', 'Tubo conduit PVC 3/4" x 3 m', 'ES', 'unidad', 3.1, 5.5, 12, 'e', 25, 'paquete x 25', 'TUBO CONDUIT PVC 3/4" X 3M PAQ X25', 'conduit 3/4'],
    ['PIN-LAT-BL', 'Pintura látex blanco 1 gal', 'PP', 'galón', 38, 55, 6, 'e', 4, 'caja x 4', 'PINTURA LATEX BLANCO GL CJA X4', 'latex blanco galon'],
    ['PIN-LAT-BE', 'Pintura látex beige 1 gal', 'PP', 'galón', 38, 55, 3, 'i', 4, 'caja x 4', 'PINTURA LATEX BEIGE GL CJA X4', 'latex beige galon'],
    ['PIN-ESM', 'Esmalte sintético blanco 1 gal', 'PP', 'galón', 52, 76, 2, 'i', 4, 'caja x 4', 'ESMALTE SINTETICO BLANCO GL CJA X4', 'esmalte blanco galon'],
    ['THI-GAL', 'Thinner 1 gal', 'PP', 'galón', 14, 22, 5, 'e', 4, 'caja x 4', 'DILUYENTE THINNER ACRILICO GL CJA X4', 'thinner galon'],
    ['BRO-4', 'Brocha 4"', 'PP', 'unidad', 3, 6.5, 7, 'e', 12, 'caja x 12', 'BROCHA CERDA 4" CJA X12', 'brocha 4'],
    ['ROD-9', 'Rodillo 9" con mango', 'PP', 'unidad', 5.5, 11, 4, 'i', 12, 'caja x 12', 'RODILLO FELPA 9" C/MANGO CJA X12', 'rodillo 9'],
    ['TOR-DRY', 'Tornillo drywall 6 x 1"', 'HF', 'unidad', 0.03, 0.1, 300, 's', 1000, 'caja x 1000', 'TORNILLO DRYWALL 6X1" CJA X1000', 'tornillo drywall 6x1', 'TORNILLO PUNTA FINA 6 X 1'],
    ['PER-14', 'Perno hexagonal 1/4" x 2"', 'HF', 'unidad', 0.35, 0.8, 40, 'e', 100, 'caja x 100', 'PERNO HEX 1/4" X 2" CJA X100', 'perno 1/4 x 2'],
    ['TAR-6', 'Tarugo plástico 6 mm', 'HF', 'unidad', 0.05, 0.15, 200, 's', 500, 'bolsa x 500', 'TARUGO PLASTICO 6MM BOLSA X500', 'tarugo 6mm'],
    ['LIJ-100', 'Lija al agua N°100', 'HF', 'unidad', 0.9, 1.8, 20, 'e', 50, 'paquete x 50', 'LIJA AGUA N100 PQT X50', 'lija 100'],
    ['MAR-16', 'Martillo carpintero 16 oz', 'HF', 'unidad', 15, 28, 2, 'i', 6, 'caja x 6', 'MARTILLO CARPINTERO 16OZ CJA X6', 'martillo 16'],
    ['DES-PH', 'Destornillador Phillips', 'HF', 'unidad', 3, 7, 4, 'i', 12, 'caja x 12', 'DESTORNILLADOR PHILLIPS 1/4X4 CJA X12', 'destornillador phillips'],
    ['CAN-50', 'Candado 50 mm', 'HF', 'unidad', 9, 18, 3, 'i', 12, 'caja x 12', 'CANDADO LATON 50MM CJA X12', 'candado 50'],
    ['DIS-COR', 'Disco de corte 4 1/2"', 'HF', 'unidad', 2.6, 6, 25, 'e', 25, 'caja x 25', 'DISCO CORTE METAL 4 1/2" CJA X25', 'disco corte 4 1/2']
  ];
  var FADE = { 'CAL-20': 100, 'PIN-LAT-BE': 110, 'THI-GAL': 95, 'MAR-16': 120, 'CAN-50': 125 };
  var NEWCODE = { 'CEM-MS': 1, 'FIE-14': 1 };         // el proveedor cambió el código en las últimas facturas
  var NEVER_COUNTED = { 'MAL-Q': 1, 'PIN-ESM': 1 };
  var WK = [0, 1, 0.95, 0.95, 1, 1.15, 1.5];          // domingo..sábado
  var WK_SUM = 6.55;
  var GENERIC = ['VARIOS', 'PRODUCTO', 'MERCADERIA', 'FERRETERIA'];

  function ean13(seed) {
    var d = String(7750000000000 + Math.floor(U.hash(seed) * 99999999)).slice(0, 12).split('').map(Number), s = 0;
    for (var i = 0; i < 12; i++) s += d[i] * (i % 2 ? 3 : 1);
    return d.join('') + ((10 - (s % 10)) % 10);
  }
  function poisson(R, lam) {
    if (lam <= 0) return 0;
    if (lam > 30) { var u1 = Math.max(R(), 1e-9), u2 = R(); return Math.max(0, Math.round(lam + Math.sqrt(lam) * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2))); }
    var L = Math.exp(-lam), k = 0, p = 1;
    do { k++; p *= R(); } while (p > L);
    return k - 1;
  }
  function shuffle(R, a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(R() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function isVisit(prov, date) {
    if (U.dow(date) !== prov.dow) return false;
    if (prov.cada === 1) return true;
    return (Math.round(U.diff(date, prov.ancla) / 7) % prov.cada + prov.cada) % prov.cada === 0;
  }
  function openDays(n) { return n * 6 / 7; }

  App.CATALOGO = CAT; App.PROVEEDORES = PROVS; App.CATEGORIAS = CATS; App.isVisit = isVisit;

  App.generate = function (opts) {
    opts = opts || {};
    var seed = opts.seed || 20261106, R = U.rng(seed);
    var genFrac = opts.genFrac != null ? opts.genFrac : 0.04;
    var sinComp = opts.sinComp != null ? opts.sinComp : 0.03;
    var N = App.NDIAS, dates = [], i, k;
    for (i = 0; i < N; i++) dates.push(U.addDays(App.D0, i));

    var D = {
      comercio: { ruc: '20999000001', nombre: 'Ferretería Don Lucho E.I.R.L.', zona: 'Av. Argentina, Lima' },
      dates: dates, provs: {}, provList: PROVS.map(function (p) { return Object.assign({}, p); }),
      prods: {}, prodList: [], comp: [], lin: [], conteos: [], pedidos: [], sinXml: [], truth: {},
      mapas: {}, compartido: {}, audit: [], rev: 1, xml: {}, cfg: null, ciclos: [], seed: seed, params: { seed: seed, genFrac: genFrac, sinComp: sinComp }
    };
    D.provList.forEach(function (p) { D.provs[p.id] = p; });
    D.cfg = { nivel: { A: 0.95, B: 0.90, C: 0.80 }, topeCaja: 0, verCostos: false, diasParado: 60, nConteo: 10, ahorro: 'pn' };

    /* ---- catálogo del comercio ---- */
    var idxByProv = {};
    CAT.forEach(function (r, n) {
      var pv = r[2]; idxByProv[pv] = (idxByProv[pv] || 0) + 1;
      var cod = pv + '-' + String(1000 + n * 7 + 1);
      var p = {
        id: r[0], nombre: r[1], prov: pv, cat: CATS[pv], ub: r[3], costo: r[4], precio: r[5], mu: r[6], pat: r[7],
        factor: r[8], uc: r[9], fact: r[10], bol: r[11], alt: r[12] || null, cod: cod, codNuevo: NEWCODE[r[0]] ? pv + '-' + String(5000 + n) : null,
        gtin: (n % 3 === 0) ? ean13(r[0]) : null, sunat: (n % 2 === 0) ? SUNAT[pv] : null, fade: FADE[r[0]] || null,
        maxChunk: Math.max(4, Math.round(r[6] / 6 * 1.2)), un: r[3] === 'kg' ? 'KGM' : r[3] === 'metro' ? 'MTR' : 'NIU'
      };
      D.prods[p.id] = p; D.prodList.push(p);
    });

    /* ---- simulación del mundo real ---- */
    var st = {}, ruled = D.prodList;
    ruled.forEach(function (p) {
      var md = p.mu / WK_SUM;
      st[p.id] = { stock: Math.round(openDays(14) * (p.mu / 6) * (0.8 + 0.8 * R())), orders: [], phase: R() * 6.28 };
      D.truth[p.id] = { stock: new Array(N), dem: new Array(N), perdida: new Array(N) };
      p.md = md;
    });
    var boletaN = 1000, facturaN = 200, ncN = 10, provNo = {}; PROVS.forEach(function (p, n) { provNo[p.id] = 400 + n * 40; });
    var returns = {}, arrivalsByProvDay = {}, ventasLineas = [], devs = [];
    var visits = {};
    D.provList.forEach(function (pv) { visits[pv.id] = dates.map(function (d) { return isVisit(pv, d); }); });

    for (i = 0; i < N; i++) {
      var date = dates[i], dw = U.dow(date), dayLines = [];
      /* 1) llegadas y devoluciones */
      ruled.forEach(function (p) {
        var s = st[p.id], rest = [];
        s.orders.forEach(function (o) {
          if (o.arr === i) {
            s.stock += o.qCompra * p.factor;
            var key = p.prov + '|' + i;
            (arrivalsByProvDay[key] = arrivalsByProvDay[key] || { prov: p.prov, idx: i, items: [], ped: new Set() }).items.push({ p: p, o: o });
            arrivalsByProvDay[key].ped.add(o.pedido);
          } else rest.push(o);
        });
        s.orders = rest;
      });
      (returns[i] || []).forEach(function (r) { st[r.prod].stock += r.qty; });
      /* 2) demanda y ventas */
      ruled.forEach(function (p) {
        var s = st[p.id], w = WK[dw] / WK_SUM, md = p.mu * w, dem = 0;
        if (p.fade && i > p.fade) dem = R() < 0.03 ? 1 : 0;
        else if (w > 0) {
          if (p.pat === 's') dem = poisson(R, md * (1 + 0.15 * Math.sin(i / 14.3 + s.phase)));
          else if (p.pat === 'e') { var pe = Math.min(0.85, md * 0.9); dem = R() < pe ? Math.max(1, Math.round(md / pe * (0.4 + 1.6 * R() * R()))) : 0; }
          else { var pi = Math.min(0.6, md / 1.4); dem = R() < pi ? 1 + (R() < 0.3 ? 1 : 0) + (R() < 0.1 ? 1 : 0) : 0; }
        }
        var sold = Math.min(s.stock, dem); s.stock -= sold;
        D.truth[p.id].dem[i] = dem; D.truth[p.id].perdida[i] = dem - sold;
        var rem = sold;
        while (rem > 0) {
          var c = Math.min(rem, 1 + Math.floor(R() * p.maxChunk)); rem -= c;
          var r1 = R(), cod = null;
          if (r1 < sinComp * (p.factor >= 100 ? 1.6 : 1)) continue;                       // venta sin comprobante
          if (r1 < sinComp * (p.factor >= 100 ? 1.6 : 1) + genFrac) {                     // línea genérica
            dayLines.push({ gen: true, vu: Math.round(p.precio * c * 100) / 100, prod: null, desc: GENERIC[Math.floor(R() * GENERIC.length)] });
            continue;
          }
          var useAlt = p.alt && i >= N - 3 && R() < 0.85;
          var ln = { prod: p.id, cant: c, vu: p.precio, desc: useAlt ? p.alt : p.bol, cod: null, gtin: null, sunat: null, un: p.un };
          if (R() < 0.012 && i + 4 < N) { var i2 = i + 1 + Math.floor(R() * 3); (returns[i2] = returns[i2] || []).push({ prod: p.id, qty: Math.min(c, 1 + Math.floor(R() * 2)), line: ln, dia: i2 }); }
          dayLines.push(ln);
        }
        D.truth[p.id].stock[i] = s.stock;
      });
      /* boletas del día */
      shuffle(R, dayLines);
      var pos = 0;
      while (pos < dayLines.length) {
        var n = 1 + Math.floor(R() * 6), chunk = dayLines.slice(pos, pos + n); pos += n;
        var total = 0; chunk.forEach(function (l) { total += l.vu * (l.cant || 1); });
        var big = chunk.some(function (l) { return l.prod && l.cant >= 12; });
        var esF = total >= 400 && (big || R() < 0.25);
        var serie = esF ? 'F001' : 'B001', num = esF ? ++facturaN : ++boletaN;
        var cid = serie + '-' + String(num).padStart(8, '0');
        var comp = { id: cid, tipo: esF ? '01' : '03', dir: 'venta', ruc: D.comercio.ruc, serie: serie, num: num, fecha: date, mon: 'PEN', estado: 'procesado', src: 'api', adq: esF ? 'RUC' : (total > 700 ? 'DNI' : null), l0: D.lin.length, l1: 0, total: Math.round(total * 100) / 100 };
        chunk.forEach(function (l) {
          var o = { i: D.lin.length, comp: cid, fecha: date, desc: l.desc, cod: l.cod || null, gtin: null, sunat: null, un: l.un || 'NIU', cant: l.gen ? 1 : l.cant, vu: l.vu, prod: l.prod, factor: 1, est: l.gen ? 'gen' : 'pend', dir: 'venta', sg: 1 };
          D.lin.push(o); if (l.ref) l.ref = o; l.lineObj = o;
        });
        comp.l1 = D.lin.length; D.comp.push(comp);
        chunk.forEach(function (l) { if (l.prod) l.cid = cid; });
      }
      /* 3) pedidos en las visitas */
      D.provList.forEach(function (pv) {
        if (!visits[pv.id][i]) return;
        var lines = [], pid = 'PED-' + pv.id + '-' + date.replace(/-/g, '');
        ruled.filter(function (p) { return p.prov === pv.id; }).forEach(function (p) {
          var s = st[p.id], Rr = pv.cada * 7, L = pv.plazo;
          if (p.fade && i > p.fade + 14) return;
          var mp = p.mu * (0.85 + 0.4 * R()), target = (Rr + L) / 7 * mp, onO = 0;
          s.orders.forEach(function (o) { onO += o.qCompra * p.factor; });
          var need = target - s.stock - onO;
          if (p.fade && i >= p.fade - 9 && i <= p.fade - 3 && !p.fadeDone) { need = Math.max(need, 0) + 3 * target; p.fadeDone = true; }
          if (need <= 0.25 * p.factor && need < target * 0.5) return;
          var q = Math.max(1, Math.ceil(need / p.factor)), jit = R() < 0.2 ? 1 : 0;
          s.orders.push({ arr: i + L + jit, qCompra: q, pedido: pid, ord: i });
          var sug = i >= N - 56 ? Math.max(0, q + (R() < 0.35 ? (R() < 0.5 ? -1 : 1) : 0)) : null;
          lines.push({ prod: p.id, qCompra: q, qBase: q * p.factor, sugerido: sug, costoU: p.costo });
        });
        if (lines.length) D.pedidos.push({ id: pid, prov: pv.id, fecha: date, plazoEsp: pv.plazo, lineas: lines, estado: 'en_transito', facturaFecha: null, arrIdx: i + pv.plazo });
      });
    }

    /* ---- facturas de compra (llegadas) ---- */
    var arrs = Object.keys(arrivalsByProvDay).map(function (k2) { return arrivalsByProvDay[k2]; }).sort(function (a, b) { return a.idx - b.idx; });
    var lastPP = null; arrs.forEach(function (a) { if (a.prov === 'PP') lastPP = a; });
    arrs.forEach(function (a) {
      var pv = D.provs[a.prov], date = dates[a.idx], cid = pv.serie + '-' + String(++provNo[pv.id]).padStart(8, '0'), total = 0;
      var late = a.idx >= N - 12;
      if (pv.web && a === lastPP) {              // este proveedor publica en su web: la última factura no llegó por correo
        var tt = 0; a.items.forEach(function (it) { tt += it.o.qCompra * it.p.factor * it.p.costo; });
        D.sinXml.push({ prov: pv.id, fecha: date, ref: cid, total: Math.round(tt), nota: 'Solo PDF en la web del proveedor' });
      } else {
        var comp = { id: cid, tipo: '01', dir: 'compra', ruc: pv.ruc, serie: pv.serie, num: provNo[pv.id], fecha: date, mon: 'PEN', estado: 'procesado', src: 'correo', adq: null, l0: D.lin.length, l1: 0, total: 0 };
        a.items.forEach(function (it, n) {
          var p = it.p, vu = Math.round(p.costo * p.factor * 100) / 100, cod = (late && p.codNuevo) ? p.codNuevo : p.cod;
          total += vu * it.o.qCompra;
          D.lin.push({ i: D.lin.length, comp: cid, fecha: date, desc: p.fact, cod: cod, gtin: p.gtin, sunat: (n % 2 ? null : p.sunat), un: 'BX', cant: it.o.qCompra, vu: vu, prod: p.id, factor: p.factor, est: 'pend', dir: 'compra', sg: 1, nuevoCod: (late && p.codNuevo) ? 1 : 0 });
        });
        comp.l1 = D.lin.length; comp.total = Math.round(total * 100) / 100; D.comp.push(comp);
      }
      a.ped.forEach(function (pid) { var pd = D.pedidos.filter(function (x) { return x.id === pid; })[0]; if (pd) { pd.estado = 'facturado'; if (!pd.facturaFecha || date < pd.facturaFecha) { pd.facturaFecha = date; pd.facturaId = cid; } } });
    });

    /* ---- notas de crédito por devoluciones ---- */
    Object.keys(returns).forEach(function (di) {
      returns[di].forEach(function (r) {
        var ln = r.line.lineObj; if (!ln || r.dia > N - 1) return;
        var cid = 'BC01-' + String(++ncN).padStart(8, '0'), date = dates[r.dia];
        var comp = { id: cid, tipo: '07', dir: 'venta', ruc: D.comercio.ruc, serie: 'BC01', num: ncN, fecha: date, mon: 'PEN', estado: 'procesado', src: 'api', adq: null, l0: D.lin.length, l1: 0, ref: ln.comp, total: r.qty * ln.vu };
        D.lin.push({ i: D.lin.length, comp: cid, fecha: date, desc: ln.desc, cod: null, gtin: null, sunat: null, un: ln.un, cant: r.qty, vu: ln.vu, prod: ln.prod, factor: 1, est: 'pend', dir: 'venta', sg: -1, refLin: ln.i });
        comp.l1 = D.lin.length; D.comp.push(comp);
      });
    });
    D.comp.sort(function (a, b) { return a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0; });

    /* ---- mapas confirmados del comercio y emparejamiento de las líneas ---- */
    var norm = App.E ? App.E.norm : null;
    D.prodList.forEach(function (p) {
      var pv = D.provs[p.prov];
      D.mapas['C|' + pv.ruc + '|' + p.cod] = { prod: p.id, factor: p.factor, origen: 'confirmado', por: 'Encargado', fecha: dates[3] };
      D.mapas['V|' + norm(p.bol)] = { prod: p.id, factor: 1, origen: 'confirmado', por: 'Encargado', fecha: dates[3] };
    });
    D.lin.forEach(function (l) {
      if (l.est === 'gen') return;
      var comp = null;
      var key = l.dir === 'compra' ? 'C|' + D.provs[D.prods[l.prod].prov].ruc + '|' + l.cod : 'V|' + norm(l.desc);
      var m = D.mapas[key];
      if (m) { l.est = 'emp'; l.prod = m.prod; l.factor = m.factor; l.via = 'mapa'; }
      else { l.est = 'pend'; l.prodReal = l.prod; l.prod = null; l.factor = 1; }
    });

    /* ---- conteos históricos ---- */
    var ranked = D.prodList.slice().sort(function (a, b) { return b.mu * b.precio - a.mu * a.precio; });
    var cn = 0;
    ranked.forEach(function (p, rk) {
      if (NEVER_COUNTED[p.id]) return;
      var iv = rk < 17 ? 10 + Math.floor(R() * 8) : rk < 32 ? 21 + Math.floor(R() * 12) : 40 + Math.floor(R() * 26);
      var d = Math.floor(R() * iv);
      while (d < N) {
        if (R() > 0.1 || d < 30) {
          var tru = D.truth[p.id].stock[d], noise = tru > 30 ? Math.round(tru * (R() - 0.5) * 0.03) : 0;
          D.conteos.push({ id: 'C' + String(++cn).padStart(4, '0'), prod: p.id, fecha: dates[d], contado: Math.max(0, tru + noise), user: R() < 0.7 ? 'Ayudante' : 'Encargado' });
        }
        d += iv + Math.floor((R() - 0.5) * 6);
      }
    });
    D.conteos.sort(function (a, b) { return a.fecha < b.fecha ? -1 : 1; });

    /* ---- catálogo compartido (otros comercios) ---- */
    D.prodList.forEach(function (p) {
      var pv = D.provs[p.prov], n = U.hash(p.id + 'n') < 0.18 ? 1 : 2 + Math.floor(U.hash(p.id + 'm') * 5);
      D.compartido[pv.ruc + '|' + p.cod] = { key: pv.ruc + '|' + p.cod, prov: pv.id, desc: p.fact, nombre: p.nombre, cat: p.cat, ub: p.ub, factor: p.factor, n: n, estado: 'ok' };
    });
    var cm = D.prodList.filter(function (p) { return p.id === 'PEG-25'; })[0];
    D.compartido[D.provs.CN.ruc + '|CN-9001'] = { key: D.provs.CN.ruc + '|CN-9001', prov: 'CN', desc: 'PEGAMENTO ESPECIAL GRIS 25KG', nombre: 'Pegamento para cerámica 25 kg', cat: CATS.CN, ub: 'bolsa', factor: 1, n: 3, estado: 'conflicto', alt: { nombre: 'Pegamento para porcelanato 25 kg', n: 2 } };
    D.compartido[D.provs.PA.ruc + '|PA-9002'] = { key: D.provs.PA.ruc + '|PA-9002', prov: 'PA', desc: 'TUBO PVC SAP 1" X 5M', nombre: 'Tubo PVC SAP 1" x 5 m', cat: CATS.PA, ub: 'unidad', factor: 10, n: 2, estado: 'conflicto', alt: { nombre: 'Tubo PVC SAP 1" x 3 m', n: 2 } };

    D.audit.push({ t: dates[3] + ' 09:12', user: 'Dueño', acc: 'Alta del comercio', det: 'Se creó el buzón de ingesta y se configuró el reenvío de facturas.' });
    D.audit.push({ t: dates[3] + ' 10:40', user: 'Encargado de compras', acc: 'Confirmación de mapas', det: D.prodList.length + ' productos confirmados con su factor de conversión.' });
    D.buzon = 'c8f3-' + U.hashHex('buzon' + seed).slice(0, 12);
    return D;
  };
})(typeof window !== 'undefined' ? window : globalThis);

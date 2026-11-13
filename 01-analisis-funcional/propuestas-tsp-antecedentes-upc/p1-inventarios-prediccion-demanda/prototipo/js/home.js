/* Inicio, recorrido guiado y cobertura de requerimientos */
(function () {
  'use strict';
  var App = window.App, U = App.U, UI = App.UI, ic = App.ic, E = App.E, H = App.H, esc = U.esc, rf = App.rf;

  /* ---------- Inicio ---------- */
  App.views.inicio = {
    render: function (r, host) {
      var D = App.D, q = E.calidad(D);
      var cards = [
        ['s1', 'Portal del comercio', 'Web y celular. El dueño, el encargado de compras y el ayudante ven stock, confirman productos, cuentan y preparan la lista para cada vendedor.', '#/s1/panel', 'home'],
        ['s2', 'Plataforma central', 'Recibe los XML, los lee, los empareja, mantiene el libro de movimientos, pronostica y propone cuánto pedir. Con pruebas que se ejecutan aquí.', '#/s2/pipeline', 'layers'],
        ['s3', 'Consola SaaS', 'Alta de comercios, planes, soporte y la curaduría del catálogo compartido entre ferreterías.', '#/s3/empresas', 'building'],
        ['s4', 'Vista de la marca', 'Fase 3: con permiso del comercio, el vendedor ve solo la sugerencia de sus propios productos.', '#/s4/marca', 'handshake']
      ].map(function (c) { return '<a class="syscard" href="' + c[3] + '"><span class="sid">' + c[0].toUpperCase() + '</span><h3>' + c[1] + '</h3><p>' + c[2] + '</p></a>'; }).join('');
      var steps = [['inbox', 'Facturas XML', 'Los proveedores las envían; el comercio las reenvía a un buzón.'], ['file', 'Lector UBL 2.1', 'Se leen compras y ventas. Los datos del cliente se borran.'], ['link', 'Confirma una vez', 'Cada descripción nueva se empareja con un producto, una sola vez.'], ['box', 'Stock teórico', 'Último conteo + compras − ventas, con un nivel de confianza.'], ['cal', 'Lista para la visita', 'Qué pedir, cuánto y por qué, la tarde antes de que pase el vendedor.']];
      host.innerHTML = '<div class="hero"><div style="max-width:1100px;margin:0 auto;position:relative;z-index:1"><span class="chip-r" style="margin-bottom:14px">Prototipo navegable · P1-V7 · datos simulados</span><h1>El inventario de tu ferretería, armado con tus comprobantes</h1><p>Una ferretería ya recibe facturas XML de sus proveedores y emite boletas electrónicas. Tuerca las lee, reconstruye el stock y prepara, para la visita de cada vendedor, la lista de qué pedir. Sin POS nuevo y sin digitar un inventario.</p><div class="acts"><a class="btn btn-brand" href="#/s1/panel">Entrar al portal del comercio</a><a class="btn" href="#/recorrido">Recorrido guiado</a><a class="btn" href="#/s2/pipeline">Ver la plataforma</a></div></div></div>' +
        '<div class="inner">' +
        '<div class="sect" style="margin-top:6px"><div class="sect-h"><h2>El problema</h2></div><div class="cardrow">' +
        '<div class="card"><h3>Se acaba lo que más sale</h3><p class="mut2">El dueño pide «lo mismo que la vez pasada» al vendedor que pasa el martes. Los productos de más rotación se agotan antes de la siguiente visita.</p></div>' +
        '<div class="card"><h3>Dinero parado en el estante</h3><p class="mut2">Lo que no rota se acumula. Hoy, en esta demostración, hay ' + H.money(U.sum(E.parados(D).map(function (x) { return x.capital; }))) + ' en productos sin venta hace más de ' + D.cfg.diasParado + ' días.</p></div>' +
        '<div class="card"><h3>«No sé mi stock real»</h3><p class="mut2">No digita su inventario y no lo va a digitar. La propuesta elimina esa carga: el stock sale de los comprobantes que ya existen.</p></div></div></div>' +
        '<div class="sect"><div class="sect-h"><h2>Cómo funciona</h2></div><ol class="phases" style="grid-template-columns:repeat(5,1fr);list-style:none;margin:0;padding:0">' + steps.map(function (s, i) { return '<li style="padding:14px 16px;border-left:' + (i ? '1px solid var(--line)' : '0') + '">' + ic(s[0], 22) + '<b style="display:block;margin:8px 0 3px">' + (i + 1) + '. ' + s[1] + '</b><span class="mut2" style="font-size:13px">' + s[2] + '</span></li>'; }).join('') + '</ol></div>' +
        '<div class="sect"><div class="sect-h"><h2>Los cuatro sistemas</h2></div><div class="syscards">' + cards + '</div></div>' +
        '<div class="sect grid2"><div class="card"><h3>Lo que funciona de verdad en este prototipo</h3><ul class="mut2" style="margin:8px 0 0 18px;padding:0;line-height:1.65"><li>Un <b>lector UBL 2.1</b> que interpreta XML reales con <span class="mono">DOMParser</span> y rechaza DOCTYPE y archivos grandes.</li><li>Ingesta <b>idempotente</b>: el mismo comprobante, mil veces, cuenta una.</li><li>La <b>cascada de emparejamiento</b> con 5 pasos y puntajes.</li><li>Un <b>libro de movimientos</b> del que se calculan stock y confianza.</li><li><b>Seis métodos de pronóstico</b> con backtesting y selección por segmento.</li><li>La <b>lista para la visita</b>, la política de reposición y el cierre del ciclo.</li><li><b>Pruebas</b> que se ejecutan en el navegador.</li></ul></div>' +
        '<div class="card"><h3>Lo que es simulación</h3><ul class="mut2" style="margin:8px 0 0 18px;padding:0;line-height:1.65"><li>Todos los comercios, proveedores, personas, RUC y precios son inventados.</li><li>El historial de 26 semanas lo genera un programa con semilla fija; el desempeño que se ve <b>no es evidencia</b> de que funcione con ferreterías reales.</li><li>No hay correo, API de facturador, WhatsApp ni servidor: se simulan.</li><li>La demanda del producto <b>sigue sin validar</b> (puntaje D = 3, sin entrevistas).</li><li>Líneas identificables ahora: <b>' + U.pct(q.ident, 1) + '</b>. Con menos de 60% se descarta V7 (ver «Datos sintéticos»).</li></ul></div></div>' +
        '<div class="sect"><div class="sect-h"><h2>Fases</h2></div><div class="phases"><div><b>0 · Validación</b><span class="mut2">2 semanas, sin desarrollo. XML reales de 3–5 ferreterías; si menos de 60% de las líneas es identificable, se descarta V7.</span></div><div><b>1 · MVP y TSP</b><span class="mut2">14–16 semanas, 2 personas. Los 52 requerimientos «Debe».</span></div><div><b>2 · Piloto pagado</b><span class="mut2">Los 17 «Debería»: catálogo compartido, conector de Bsale, tope de caja.</span></div><div><b>3 · Después</b><span class="mut2">Los 5 «Podría»: vista de la marca y modo stock del POS.</span></div></div><p class="ch-note">Use el selector <b>Fase</b> de la barra superior para atenuar lo que no pertenece a cada etapa.</p></div>' +
        '</div>';
    }
  };

  /* ---------- Recorrido guiado ---------- */
  var STEPS = [
    ['ingCompra', 'Reciba la factura de un proveedor', 'En Fuentes › Correo, simule la llegada de la factura de un pedido en tránsito. Se lee, se empareja y cierra el pedido.', '#/s1/fuentes/correo'],
    ['ingVarios', 'Cargue una boleta con líneas «VARIOS»', 'En Cargar archivos, pruebe la muestra con descripciones genéricas. No se asignan a ningún producto.', '#/s1/fuentes/cargar'],
    ['ingRechazo', 'Pruebe un comprobante ajeno y un XML malicioso', 'Se rechazan con motivo; el reporte de ingesta los lista.', '#/s1/fuentes/cargar'],
    ['confirmo', 'Confirme un producto en «Confirma una vez»', 'Cargue primero la muestra «descripciones nunca vistas». Elija el candidato y vea cómo cambia el stock.', '#/s1/emparejar'],
    ['verProd', 'Mire un producto: stock, movimientos y pronóstico', 'Abra cualquier fila de Productos y revise el libro de movimientos.', '#/s1/productos'],
    ['conto', 'Cuente a ciegas un producto', 'El sistema no muestra su cálculo hasta que usted cuenta. Se registra un ajuste.', '#/s1/conteo'],
    ['verLista', 'Revise la lista para la visita de mañana', 'Herramientas y Fijaciones pasa mañana; también está la de hoy (Pinturas).', '#/s1/visitas'],
    ['pedido', 'Edite una cantidad y registre el pedido', 'Pruebe también WhatsApp, imprimir y el tope de caja.', '#/s1/visitas'],
    ['cierre', 'Simule la llegada de la factura y vea el cierre del ciclo', 'Sugerido, pedido y facturado, y el plazo real del proveedor.', '#/s1/visitas'],
    ['pruebas', 'Ejecute las pruebas de la plataforma', 'Idempotencia, reproceso desde los XML, notas de crédito y seguridad del lector.', '#/s2/pruebas']
  ];
  App.views.recorrido = {
    render: function (r, host) {
      var F = App.S.flags, done = STEPS.filter(function (s) { return F[s[0]] || (s[0] === 'verProd' && F.verProd); }).length;
      host.innerHTML = '<div class="inner"><div class="pagehead"><div><h1>Recorrido guiado</h1><p>Diez pasos de punta a punta. Cada uno se marca solo cuando usted lo hace en el prototipo.</p></div><div class="acts"><button class="btn" data-act="shell.sim">' + ic('refresh', 15) + 'Reiniciar demostración</button></div></div>' +
        '<div class="verdict ' + (done === STEPS.length ? 'ok' : '') + '" style="margin-bottom:16px"><div class="big">' + done + '/' + STEPS.length + '</div><div><b>' + (done === STEPS.length ? 'Recorrido completo' : 'Siga los pasos en orden') + '</b><br><span class="mut2">Los pasos 1 a 3 y 4 se pueden hacer en otro orden.</span></div></div>' +
        '<div class="tour">' + STEPS.map(function (s, i) { var ok = F[s[0]]; return '<div class="tstep ' + (ok ? 'done' : '') + '"><span class="n">' + (ok ? ic('check', 16) : i + 1) + '</span><div><b>' + s[1] + '</b><p>' + s[2] + '</p></div><a class="btn btn-sm ' + (ok ? '' : 'btn-primary') + '" href="' + s[3] + '">' + (ok ? 'Repetir' : 'Ir') + '</a></div>'; }).join('') + '</div></div>';
    }
  };
  /* abrir un producto cuenta como paso 5 */
  var oldOpen = null;
  document.addEventListener('click', function (e) { var t = e.target.closest && e.target.closest('[data-act="s1.prod"]'); if (t) App.flag('verProd'); }, true);

  /* ---------- Cobertura ---------- */
  var PROC = [
    ['PR1', 'Alta y configuración', 'S1 → S2', ['s1/config', 'Configuración']], ['PR2', 'Conexión de fuentes', 'E1, S1 → S2', ['s1/fuentes', 'Fuentes']], ['PR3', 'Ingesta', 'E1, S1 → S2', ['s1/fuentes/cargar', 'Cargar archivos']],
    ['PR4', 'Emparejamiento', 'S2 → S1', ['s1/emparejar', 'Confirma una vez']], ['PR5', 'Arranque del inventario', 'S2 → S1', ['s1/conteo', 'Conteo']], ['PR6', 'Stock teórico', 'S2', ['s1/productos', 'Productos']],
    ['PR7', 'Conteo cíclico', 'S2 → S1 → S2', ['s1/conteo', 'Conteo']], ['PR8', 'Pronóstico y reposición', 'S2', ['s2/pronostico', 'Pronóstico']], ['PR9', 'Lista para la visita', 'S2 → S1 → E3', ['s1/visitas', 'Visitas']],
    ['PR10', 'Cierre del ciclo', 'E1 → S2', ['s1/visitas', 'Visitas']], ['PR11', 'Medición', 'S2 → S1', ['s1/calidad', 'Calidad de datos']]
  ];
  var CF = { tab: 'rf' };
  App.views.cobertura = {
    render: function (r, host) {
      var tab = r.page || 'rf', L = App.REQLIST, W = App.WHERE, cnt = { i: 0, s: 0, r: 0 }; L.forEach(function (x) { cnt[W[x.id].nivel]++; });
      var tabs = UI.tabs([['rf', 'Requerimientos (' + L.length + ')'], ['rn', 'Reglas de negocio (' + App.RN.length + ')'], ['procesos', 'Procesos (' + PROC.length + ')']], tab, '/cobertura'), body = '';
      if (tab === 'rf') {
        body = '<div class="kpis" style="--n:4;margin-bottom:16px"><div class="kpi"><div class="l">Requerimientos</div><div class="v">' + L.length + '</div><div class="d">52 Debe · 17 Debería · 5 Podría</div></div><div class="kpi"><div class="l"><span class="fid i"></span>Interactivos</div><div class="v">' + cnt.i + '</div><div class="d">responden a lo que usted hace</div></div><div class="kpi"><div class="l"><span class="fid s"></span>Simulados</div><div class="v">' + cnt.s + '</div><div class="d">sin integración real</div></div><div class="kpi"><div class="l"><span class="fid r"></span>Representados</div><div class="v">' + cnt.r + '</div><div class="d">solo se ven</div></div></div>' +
          UI.table('tbl-cob', {
            rows: function () { return L; }, pageSize: 15, search: function (x) { return x.id + ' ' + x.text; }, placeholder: 'Buscar un requerimiento',
            filters: [{ k: 'prio', label: 'Prioridad', options: [['debe', 'Debe (MVP)'], ['deberia', 'Debería (piloto)'], ['podria', 'Podría (después)']], test: function (x, v) { return x.prio === v; } }, { k: 'niv', label: 'Nivel', options: [['i', 'Interactivo'], ['s', 'Simulado'], ['r', 'Representado']], test: function (x, v) { return W[x.id].nivel === v; } }],
            cols: [
              { label: 'ID', render: function (x) { return '<span class="mono" style="white-space:nowrap"><b>' + x.id + '</b></span>'; }, sort: function (x) { return x.id; } },
              { label: 'Requerimiento', render: function (x) { return esc(x.text); } },
              { label: 'Prioridad', render: function (x) { return '<span class="pill prio-' + x.prio + '">' + UI.PRIO[x.prio].label + '</span>'; }, sort: function (x) { return x.prio; } },
              { label: 'Nivel', render: function (x) { var n = W[x.id].nivel; return '<span style="white-space:nowrap"><span class="fid ' + n + '"></span>' + { i: 'Interactivo', s: 'Simulado', r: 'Representado' }[n] + '</span>'; }, sort: function (x) { return W[x.id].nivel; } },
              { label: 'Dónde verlo', render: function (x) { return W[x.id].donde.map(function (d) { return '<a href="#' + d[0] + '">' + esc(d[1]) + '</a>'; }).join('<br>'); } }
            ]
          });
      } else if (tab === 'rn') {
        body = '<div class="tbl-wrap"><table><thead><tr><th>ID</th><th>Regla</th></tr></thead><tbody>' + App.RN.map(function (x) { return '<tr><td class="mono"><b>' + x[0] + '</b></td><td>' + esc(x[1]) + '</td></tr>'; }).join('') + '</tbody></table></div>';
      } else {
        body = '<div class="tbl-wrap"><table><thead><tr><th>Proceso</th><th>Nombre</th><th>Sistemas</th><th>Dónde verlo</th></tr></thead><tbody>' + PROC.map(function (x) { return '<tr><td class="mono"><b>' + x[0] + '</b></td><td>' + x[1] + '</td><td>' + x[2] + '</td><td><a href="#/' + x[3][0] + '">' + x[3][1] + '</a></td></tr>'; }).join('') + '</tbody></table></div>';
      }
      host.innerHTML = '<div class="inner"><div class="pagehead"><div><h1>Cobertura de requerimientos</h1><p>Dónde está cada requerimiento del análisis funcional y con qué fidelidad se representa en este prototipo.</p></div></div>' + tabs + body + '</div>';
    }
  };
})();

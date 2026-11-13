/* Los 74 requerimientos funcionales de ../14_analisis_funcional_y_requerimientos.md (resumidos) y dónde se ven en el prototipo.
   Prioridad: d = Debe (MVP y TSP) · b = Debería (piloto pagado) · p = Podría (después).
   Nivel: i = interactivo con datos simulados · s = simulado (se muestra el comportamiento, no hay integración real) · r = representado (solo se ve). */
(function (root) {
  'use strict';
  var App = (root.App = root.App || {});
  var P = { d: 'debe', b: 'deberia', p: 'podria' };
  var NV = { i: 'Interactivo: responde a lo que usted hace, con datos simulados', s: 'Simulado: muestra el comportamiento, sin integración real', r: 'Representado: se ve la pantalla, sin lógica detrás' };
  var R = [
    /* id, prio, sistema, requerimiento, criterio, nivel, [[ruta, etiqueta], …] */
    ['RF-COM-01', 'd', 'S1', 'Registrar el comercio: RUC, razón social, facturador o PSE usado y régimen tributario.', 'Si el régimen es Nuevo RUS, advierte que no hay XML de ventas y ofrece el modo POS o planilla.', 'i', [['s1/config', 'Configuración › Comercio']]],
    ['RF-COM-02', 'd', 'S1', 'Proveedores: RUC, vendedor y su celular, días de visita, plazo de entrega y lote o monto mínimo.', 'El proveedor se crea solo con su primera factura; el dueño completa visita y plazo.', 'i', [['s1/config', 'Configuración › Proveedores']]],
    ['RF-COM-03', 'd', 'S1, S2', 'Calendario de visitas: semanal o cada N semanas, con excepciones por feriado.', 'La lista se genera la tarde anterior a cada visita.', 'i', [['s1/config', 'Configuración › Proveedores'], ['s1/visitas', 'Visitas']]],
    ['RF-COM-04', 'b', 'S2', 'Estimar el plazo real del proveedor como mediana de (fecha de factura − fecha del pedido) con 3 pedidos o más.', 'Reemplaza al plazo declarado cuando difiere en más de 2 días.', 'i', [['s1/config', 'Configuración › Proveedores']]],
    ['RF-COM-05', 'd', 'S1', 'Nivel de servicio objetivo por clase ABC, configurable.', 'Cambia el stock de seguridad de la lista.', 'i', [['s1/config', 'Configuración › Parámetros']]],

    ['RF-ING-01', 'd', 'S2', 'Buzón por comercio con dirección única y no adivinable, para la regla de reenvío del correo.', 'Guía para Gmail y Outlook; primer XML recibido el mismo día.', 'i', [['s1/fuentes', 'Fuentes']]],
    ['RF-ING-02', 'd', 'S2', 'Extraer los adjuntos XML y ZIP de cada correo. Un PDF sin XML se registra como «compra sin XML».', '100% de XML válidos procesados.', 's', [['s1/fuentes', 'Fuentes › Correo simulado'], ['s2/pipeline', 'Plataforma › Flujo']]],
    ['RF-ING-03', 'd', 'S1', 'Carga manual de XML o ZIP desde el portal.', 'Carga de un mes de comprobantes en una sola operación.', 'i', [['s1/fuentes', 'Fuentes › Cargar archivos']]],
    ['RF-ING-04', 'd', 'S2', 'Idempotencia por clave del comprobante: RUC del emisor + tipo + serie + número.', '0 duplicados al recibir el mismo comprobante 1 000 veces.', 'i', [['s2/pruebas', 'Plataforma › Pruebas'], ['s1/fuentes', 'Fuentes']]],
    ['RF-ING-05', 'd', 'S1', 'Modo POS o planilla: importar ventas desde Excel o CSV con plantilla.', 'Es la ruta de los comercios sin XML de ventas y la vuelta a V2.', 's', [['s1/fuentes', 'Fuentes › Modo planilla']]],
    ['RF-ING-06', 'd', 'S2', 'Clasificar cada comprobante como compra o venta. Rechazar los que no involucran su RUC.', 'Rechazo con motivo, visible en el reporte de ingesta.', 'i', [['s1/fuentes', 'Fuentes › Rechazados']]],
    ['RF-ING-07', 'b', 'S2', 'Conector de API del facturador o POS (primero Bsale) para traer las ventas cada día.', 'Reintentos y registro de cada sincronización.', 's', [['s1/fuentes', 'Fuentes › Conectores']]],
    ['RF-ING-08', 'd', 'S1', 'Reporte de ingesta: recibidos por día, rechazados con motivo, compras sin XML y proveedores sin facturas.', 'Visible en el portal.', 'i', [['s1/fuentes', 'Fuentes']]],
    ['RF-ING-09', 'd', 'S2', 'Guardar el XML original de compras sin cambios y el de ventas con los datos del adquirente suprimidos.', 'Ningún nombre, DNI ni RUC de cliente final queda almacenado.', 'i', [['s2/xml', 'Plataforma › Comprobantes'], ['s2/pruebas', 'Pruebas']]],

    ['RF-UBL-01', 'd', 'S2', 'Leer factura, boleta, nota de crédito y de débito en UBL 2.1: emisor, adquirente, fecha, moneda y líneas.', '100% de campos obligatorios leídos.', 'i', [['s2/xml', 'Plataforma › Comprobantes']]],
    ['RF-UBL-02', 'b', 'S2', 'Validar el esquema y la firma digital; marcar los inválidos sin descartarlos.', 'Se ven en el reporte de ingesta.', 's', [['s2/xml', 'Plataforma › Comprobantes']]],
    ['RF-UBL-03', 'd', 'S2', 'Las notas de crédito revierten solo las líneas y cantidades que referencian; sin original, quedan pendientes.', 'Nunca más de lo facturado.', 'i', [['s2/pruebas', 'Plataforma › Pruebas']]],
    ['RF-UBL-04', 'b', 'S1, S2', 'Marcar un comprobante como anulado y revertir su efecto con movimientos inversos.', 'El stock se recalcula desde los movimientos.', 's', [['s2/xml', 'Plataforma › Comprobantes']]],
    ['RF-UBL-05', 'b', 'S2', 'Convertir a soles las compras en dólares con el tipo de cambio de su fecha.', 'Fuente oficial por definir.', 'r', [['s1/fuentes', 'Fuentes']]],
    ['RF-UBL-06', 'd', 'S2', 'Marcar líneas genéricas con una lista configurable: «VARIOS», «PRODUCTO», «MERCADERIA».', 'Es la métrica de corte (< 60%) de la validación.', 'i', [['s1/calidad', 'Calidad de datos']]],

    ['RF-EMP-01', 'd', 'S1, S2', 'Catálogo del comercio armado a partir de las líneas, no digitado.', 'Nombre normalizado, categoría, unidad base y clase ABC.', 'i', [['s1/productos', 'Productos']]],
    ['RF-EMP-02', 'd', 'S2', 'Cascada por línea: mapa del comercio, GTIN o código SUNAT, catálogo compartido, reglas de normalización y similitud semántica. Hasta 3 candidatos.', '≥ 90% de exactitud del primer candidato.', 'i', [['s2/cascada', 'Plataforma › Cascada'], ['s1/emparejar', 'Confirma una vez']]],
    ['RF-EMP-03', 'd', 'S1', 'Pantalla «confirma una vez»: líneas sin mapa ordenadas por valor vendido; elegir candidato, crear producto o marcar «no es inventario».', '≤ 1 confirmación humana por producto.', 'i', [['s1/emparejar', 'Confirma una vez']]],
    ['RF-EMP-04', 'd', 'S1, S2', 'Factor de conversión en cada emparejamiento de compra, sugerido desde la descripción y confirmado.', 'Ninguna compra afecta el stock sin factor confirmado.', 'i', [['s1/emparejar', 'Confirma una vez']]],
    ['RF-EMP-05', 'd', 'S2', 'Aplicar los mapas confirmados; pedir nueva confirmación si cambia el código del proveedor.', 'Un código nuevo vuelve a la cola.', 'i', [['s1/emparejar', 'Confirma una vez']]],
    ['RF-EMP-06', 'b', 'S1', 'Fusionar o separar productos del catálogo del comercio.', 'El stock se recalcula desde los movimientos.', 'r', [['s1/productos', 'Productos']]],
    ['RF-EMP-07', 'd', 'S1, S2', 'Métricas: % de líneas emparejadas, por confirmar y genéricas, en valor y en cantidad.', 'Visibles en el inicio y en calidad de datos.', 'i', [['s1/calidad', 'Calidad de datos'], ['s1/panel', 'Inicio']]],

    ['RF-CAT-01', 'b', 'S2', 'Publicar en el catálogo compartido cada mapa de compra confirmado, sin cantidades, precios ni identidad del comercio.', 'Prueba automatizada de campos permitidos.', 'i', [['s3/catalogo', 'Consola › Catálogo compartido'], ['s2/pruebas', 'Pruebas']]],
    ['RF-CAT-02', 'b', 'S2', 'Aplicar un mapa compartido solo si lo confirmaron 2 comercios o más, o el curador.', 'Queda marcado «por catálogo compartido» y se puede corregir.', 'i', [['s3/catalogo', 'Consola › Catálogo compartido'], ['s2/cascada', 'Cascada']]],
    ['RF-CAT-03', 'b', 'S3', 'Curaduría de conflictos: dos comercios confirmaron productos distintos para el mismo código.', 'El curador resuelve y el mapa queda activo.', 'i', [['s3/catalogo', 'Consola › Catálogo compartido']]],
    ['RF-CAT-04', 'b', 'S2', 'Medir el efecto de red: % de líneas de un comercio nuevo emparejadas por el catálogo compartido en su primera semana.', 'Reporte por cohorte de alta.', 'i', [['s3/catalogo', 'Consola › Comercio nuevo simulado']]],

    ['RF-STK-01', 'd', 'S2', 'Libro de movimientos de solo inserción por producto: compra, venta, nota, inicial, ajuste por conteo y merma.', 'El stock es una suma; no hay campo editable.', 'i', [['s1/productos', 'Productos › Movimientos']]],
    ['RF-STK-02', 'd', 'S1, S2', 'Arranque: inventario inicial por conteo de los productos clase A; el resto empieza como «desconocido».', 'Arranque en ≤ 2 horas de trabajo.', 'i', [['s1/productos', 'Productos'], ['s1/conteo', 'Conteo']]],
    ['RF-STK-03', 'd', 'S2', 'Stock teórico diario = último conteo + compras − ventas ± notas y ajustes.', 'Reproducible desde los movimientos.', 'i', [['s1/productos', 'Productos']]],
    ['RF-STK-04', 'd', 'S2', 'Confianza por producto (alta, media o baja) según días desde el conteo, diferencia de ese conteo y movimientos.', 'Visible junto al stock y en la lista para la visita.', 'i', [['s1/productos', 'Productos'], ['s1/panel', 'Inicio']]],
    ['RF-STK-05', 'd', 'S2', 'Un stock negativo o imposible se muestra como «requiere conteo» y entra con prioridad al conteo cíclico.', 'Nunca se muestra un stock negativo.', 'i', [['s1/productos', 'Productos'], ['s1/conteo', 'Conteo']]],
    ['RF-STK-06', 'b', 'S2', 'Merma no explicada por categoría, estimada con las diferencias de conteo.', 'Se muestra como «estimado», separada de los movimientos reales.', 'i', [['s1/calidad', 'Calidad de datos › Merma']]],
    ['RF-STK-07', 'b', 'S2', 'Compras en tránsito: pedidos registrados cuya factura no llegó.', 'Descuentan de la cantidad a pedir.', 'i', [['s1/visitas', 'Visitas › Pedidos en tránsito']]],
    ['RF-STK-08', 'p', 'S2', 'Modo stock del POS: si el comercio tiene POS con inventario (Bsale por API), usar ese stock en lugar de reconstruirlo.', 'Fase 3.', 'r', [['s1/fuentes', 'Fuentes › Conectores']]],

    ['RF-CON-01', 'd', 'S1, S2', 'Lista diaria de N productos a contar, priorizada por valor, por incertidumbre y por cercanía de la visita.', 'N = 10 por defecto.', 'i', [['s1/conteo', 'Conteo']]],
    ['RF-CON-02', 'd', 'S1', 'Registrar el conteo desde el celular, sin mostrar el stock teórico antes de contar (conteo ciego).', '≤ 20 s por producto.', 'i', [['s1/conteo', 'Conteo']]],
    ['RF-CON-03', 'd', 'S2', 'Cada conteo genera un ajuste = contado − teórico, como movimiento nuevo con motivo.', 'Visible en los movimientos del producto.', 'i', [['s1/conteo', 'Conteo'], ['s1/productos', 'Productos › Movimientos']]],
    ['RF-CON-04', 'd', 'S2', 'Registrar el error del stock teórico en cada conteo, por clase.', 'Error mediano ≤ 10% en clase A.', 'i', [['s1/calidad', 'Calidad de datos'], ['s1/conteo', 'Conteo']]],
    ['RF-CON-05', 'd', 'S1, S2', 'Conteo de verificación de 30 productos al azar por clase, para la validación y el TSP.', 'Días 5–8 de la validación.', 'i', [['s1/conteo', 'Conteo › Verificación']]],

    ['RF-PRO-01', 'd', 'S2', 'Clasificar cada mes los productos por ABC y por patrón de demanda (ADI y CV²).', 'Suave, errática, intermitente o irregular.', 'i', [['s2/pronostico', 'Plataforma › Pronóstico'], ['s1/productos', 'Productos']]],
    ['RF-PRO-02', 'd', 'S2', 'Pronóstico semanal por producto con 4 métodos o más: ingenuo, ETS, Croston, SBA, TSB y un modelo global.', 'Todos corren en CPU.', 'i', [['s2/pronostico', 'Plataforma › Pronóstico']]],
    ['RF-PRO-03', 'd', 'S2', 'Elegir el método por segmento ABC × patrón con backtesting de origen móvil. Métrica principal MASE; también WAPE y sesgo.', 'MASE < 1 en clase A.', 'i', [['s2/pronostico', 'Plataforma › Pronóstico']]],
    ['RF-PRO-04', 'd', 'S2', 'Excluir o corregir las semanas censuradas (stock teórico ≤ 0) al ajustar los modelos.', 'Marcadas en la serie.', 'i', [['s2/pronostico', 'Plataforma › Pronóstico']]],
    ['RF-PRO-05', 'b', 'S2', 'Calendario peruano (feriados, quincenas, campañas) como variables del modelo global.', 'Mejora del modelo global.', 'r', [['s2/pronostico', 'Plataforma › Pronóstico']]],
    ['RF-PRO-06', 'd', 'S2', 'Pronóstico por categoría, repartido por participación, para productos con menos de 8 semanas de historial.', 'Evita sugerir con historial corto.', 's', [['s2/pronostico', 'Plataforma › Pronóstico']]],

    ['RF-REP-01', 'd', 'S2', 'Revisión periódica por proveedor: nivel objetivo = demanda en (plazo + intervalo) + stock de seguridad; cantidad redondeada al empaque.', '≥ 30% menos semanas con quiebre que el método ingenuo.', 'i', [['s1/visitas', 'Visitas'], ['s2/pronostico', 'Plataforma › Simulación']]],
    ['RF-REP-02', 'd', 'S2', 'Si la confianza del stock es baja, no sugerir cantidad: mostrar «cuenta antes de pedir» y agregarlo al conteo.', 'Se puede contar desde la propia lista.', 'i', [['s1/visitas', 'Visitas']]],
    ['RF-REP-03', 'd', 'S1, S2', 'Explicación simple por línea, generada con una plantilla a partir de los números, sin LLM.', 'Por ejemplo: «Pide 12: vendes 3 por semana…».', 'i', [['s1/visitas', 'Visitas']]],
    ['RF-REP-04', 'd', 'S1', 'Lista para la visita de cada proveedor: qué pedir, stock, confianza, qué no hace falta pedir y total en soles.', 'Generada la tarde anterior.', 'i', [['s1/visitas', 'Visitas']]],
    ['RF-REP-05', 'b', 'S1, S2', 'Tope de caja semanal: si la lista lo supera, se recorta priorizando clase A y riesgo de quiebre.', 'Muestra qué se recortó.', 'i', [['s1/visitas', 'Visitas']]],
    ['RF-REP-06', 'd', 'S1', 'Editar la lista y compartirla impresa, en PDF o por WhatsApp con el texto ya escrito (wa.me).', 'Sin API ni costo por mensaje.', 'i', [['s1/visitas', 'Visitas']]],
    ['RF-REP-07', 'd', 'S1', 'Registrar lo pedido realmente como pedido en tránsito.', 'Por defecto, la lista editada.', 'i', [['s1/visitas', 'Visitas']]],
    ['RF-REP-08', 'd', 'S2', 'Cerrar el ciclo cuando llega la factura del proveedor: sugerido, pedido y facturado, y plazo real.', 'Aceptación de la sugerencia ≥ 60%.', 'i', [['s1/visitas', 'Visitas › Cierre del ciclo'], ['s1/fuentes', 'Fuentes']]],
    ['RF-REP-09', 'b', 'S2', 'Alertar un quiebre probable de clase A antes de la próxima visita.', 'En el portal y por correo.', 'i', [['s1/panel', 'Inicio']]],

    ['RF-PAR-01', 'd', 'S1, S2', 'Productos sin venta en X días con stock teórico > 0, valorizados al último costo.', 'El total de «capital parado» aparece en el inicio.', 'i', [['s1/parados', 'Productos parados'], ['s1/panel', 'Inicio']]],
    ['RF-PAR-02', 'p', 'S1', 'Sugerir una acción informativa: no volver a pedir, devolver al proveedor o liquidar.', 'Fase 3.', 'r', [['s1/parados', 'Productos parados']]],

    ['RF-MED-01', 'd', 'S1, S2', 'Reporte semanal de calidad de datos: % de líneas identificables, emparejadas y con código.', 'Es la métrica de corte de la validación.', 'i', [['s1/calidad', 'Calidad de datos']]],
    ['RF-MED-02', 'd', 'S2', 'Backtesting del pronóstico y simulación de la política con el historial, reproducibles.', 'Mismo resultado con la misma semilla.', 'i', [['s2/pronostico', 'Plataforma › Pronóstico']]],
    ['RF-MED-03', 'd', 'S2', 'Generador de datos sintéticos: convierte ventas públicas en XML UBL 2.1 con ruido controlado y semilla.', 'Registra la semilla.', 'i', [['s2/sintetico', 'Plataforma › Datos sintéticos']]],
    ['RF-MED-04', 'd', 'S2', 'Sensibilidad: error del stock y del pronóstico en función del % de líneas genéricas y de ventas sin comprobante.', 'Curva de error por nivel de ruido.', 'i', [['s2/sintetico', 'Plataforma › Datos sintéticos']]],
    ['RF-MED-05', 'b', 'S1', 'Reporte mensual al dueño: quiebres de clase A, capital parado, aceptación y error del stock.', 'Imprimible.', 'i', [['s1/calidad', 'Calidad de datos › Informe']]],

    ['RF-SEG-01', 'd', 'S2', 'Multiempresa: cada tabla lleva empresa y ninguna consulta cruza empresas; el catálogo compartido vive aparte.', 'Pruebas de aislamiento.', 's', [['s2/pruebas', 'Plataforma › Pruebas'], ['s3/empresas', 'Consola › Empresas']]],
    ['RF-SEG-02', 'd', 'S1, S2', 'Roles y permisos: dueño, encargado de compras, ayudante.', 'Cambie de rol en la barra superior.', 'i', [['s1/panel', 'Portal (selector de rol)'], ['s1/config', 'Configuración › Equipo']]],
    ['RF-SEG-03', 'd', 'S1', 'Acceso por correo y segundo factor opcional para el dueño.', 'Sesiones revocables.', 's', [['s1/config', 'Configuración › Seguridad']]],
    ['RF-SEG-04', 'd', 'S2', 'Auditoría de solo inserción: confirmaciones, ajustes, cambios de parámetros y sugerido frente a pedido.', 'Nadie edita ni borra.', 'i', [['s1/config', 'Configuración › Auditoría']]],
    ['RF-SEG-05', 'b', 'S3', 'Alta de empresas, planes y soporte.', 'En el MVP puede hacerse por script.', 'i', [['s3/empresas', 'Consola › Empresas'], ['s3/planes', 'Consola › Planes']]],

    ['RF-MAR-01', 'p', 'S1', 'Consentimiento del comercio por marca o proveedor, revocable en cualquier momento.', 'Fase 3.', 'i', [['s1/config', 'Configuración › Marcas'], ['s4/marca', 'Vista de la marca']]],
    ['RF-MAR-02', 'p', 'S4', 'El vendedor ve antes de la visita solo la sugerencia de sus productos.', 'Sin stock de otras marcas ni ventas totales.', 'i', [['s4/marca', 'Vista de la marca']]],
    ['RF-MAR-03', 'p', 'S2', 'La sugerencia es idéntica con o sin marca pagadora.', 'Prueba automatizada de neutralidad.', 'i', [['s4/marca', 'Vista de la marca']]]
  ];

  App.REQ = {}; App.WHERE = {}; App.REQLIST = [];
  R.forEach(function (r) {
    var o = { id: r[0], prio: P[r[1]], sys: r[2], text: r[3], crit: r[4] };
    App.REQ[r[0]] = o; App.REQLIST.push(o);
    App.WHERE[r[0]] = { nivel: r[5], nivelTxt: NV[r[5]], donde: r[6].map(function (d) { return ['/' + d[0], d[1]]; }) };
  });

  App.RN = [
    ['RN-01', 'Un comprobante se identifica por RUC del emisor + tipo + serie + número y se procesa una sola vez.'],
    ['RN-02', 'Una nota de crédito revierte solo las líneas y cantidades que referencia; nunca más de lo facturado.'],
    ['RN-03', 'Un movimiento registrado no se edita: las correcciones son movimientos nuevos que referencian al original.'],
    ['RN-04', 'Una línea no afecta el stock hasta estar emparejada; mientras tanto suma en «por confirmar».'],
    ['RN-05', 'Las líneas genéricas no se asignan a ningún producto; suman en «no identificable».'],
    ['RN-06', 'Los datos del adquirente de las ventas se suprimen al ingerir; solo se guarda si fue boleta o factura.'],
    ['RN-07', 'La sugerencia es la misma con o sin marca pagadora.'],
    ['RN-08', 'El catálogo compartido guarda solo el mapa de productos; nunca cantidades, precios ni la identidad del comercio.'],
    ['RN-09', 'Cada mapa nuevo requiere una confirmación humana; después se aplica solo, salvo cambios de código del proveedor.'],
    ['RN-10', 'Las semanas con stock teórico ≤ 0 se marcan como censuradas para el pronóstico.'],
    ['RN-11', 'La unidad base del producto es la de venta; las compras se convierten con el factor confirmado.'],
    ['RN-12', 'No se pide ni se usa la Clave SOL del comercio.'],
    ['RN-13', 'Un stock negativo no se muestra como número: se muestra «requiere conteo».']
  ];
})(typeof window !== 'undefined' ? window : globalThis);

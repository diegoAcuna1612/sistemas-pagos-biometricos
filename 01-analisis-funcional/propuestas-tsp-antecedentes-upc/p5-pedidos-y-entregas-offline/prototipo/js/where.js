/* Dónde está cada requerimiento en el prototipo y con qué nivel de fidelidad.
   inter  = interactivo: la regla funciona con datos simulados y cambia el estado
   sim    = simulado: la pantalla existe y responde con un comportamiento acotado
   vis    = representado: el elemento se muestra, sin la lógica completa */
(function () {
  'use strict';
  var App = (window.App = window.App || {});
  var NIVEL = { inter: 'Interactivo: la regla funciona con datos simulados', sim: 'Simulado: la pantalla responde con un comportamiento acotado', vis: 'Representado: se muestra el elemento, sin la lógica completa' };
  App.NIVEL = NIVEL;
  var W = (App.WHERE = {});
  var L = {
    s1: ['/s1', 'S1, app del repartidor'], hog: ['/s2/hogares', 'S2, Hogares'], cat: ['/s2/catalogo', 'S2, Catálogo'], ped: ['/s2/pedidos', 'S2, Pedidos'], rec: ['/s2/pedidos/recurrentes', 'S2, Pedidos recurrentes'],
    rep: ['/s2/reposicion', 'S2, Avisos de hoy'], par: ['/s2/reposicion/parametros', 'S2, Parámetros de reposición'], per: ['/s2/reposicion/perdidos', 'S2, Posibles perdidos'], cal: ['/s2/reposicion/horizonte', 'S2, Calendario'],
    msg: ['/s2/mensajes', 'S2, Mensajes'], mpl: ['/s2/mensajes/plantillas', 'S2, Plantillas'], mes: ['/s2/mensajes/estados', 'S2, Estados y costos'], mll: ['/s2/mensajes/llamadas', 'S2, Llamadas pendientes'],
    dia: ['/s2/dia', 'S2, Planificación del día'], env: ['/s2/envases', 'S2, Libro de envases'], evh: ['/s2/envases/vehiculos', 'S2, Envases en vehículos'], evi: ['/s2/envases/inventario', 'S2, Inventario del local'], evc: ['/s2/envases/conteo', 'S2, Conteo semanal'],
    evg: ['/s2/envases/garantias', 'S2, Garantías'], evr: ['/s2/envases/riesgo', 'S2, Envases en riesgo'], cob: ['/s2/cobros', 'S2, Cobros'], cov: ['/s2/cobros/verificar', 'S2, Cobros por verificar'], cof: ['/s2/cobros/fiado', 'S2, Fiado'], cop: ['/s2/cobros/pasarela', 'S2, Enlaces de pago'],
    cua: ['/s2/cuadre', 'S2, Cuadre'], res: ['/s2/resultados', 'S2, Resultados'], eqp: ['/s2/equipo', 'S2, Usuarios y roles'], eqd: ['/s2/equipo/dispositivos', 'S2, Dispositivos'], eqa: ['/s2/equipo/auditoria', 'S2, Auditoría'], glp: ['/s2/glp', 'S2, Complemento GLP'],
    s3e: ['/s3/eventos', 'S3, Registro de eventos'], s3s: ['/s3/sync', 'S3, Sincronización'], s3r: ['/s3/reposicion', 'S3, Motor de reposición'], s3m: ['/s3/mensajeria', 'S3, Mensajería'], s3p: ['/s3/pagos', 'S3, Pagos'], s3x: ['/s3/experimento', 'S3, Experimento'], s3g: ['/s3/seguridad', 'S3, Seguridad'],
    s4e: ['/s4/empresas', 'S4, Empresas'], s4f: ['/s4/funciones', 'S4, Funciones por empresa']
  };
  function def(id, nivel, txt, keys) { W[id] = { nivel: nivel, nivelTxt: NIVEL[nivel] + (txt ? '. ' + txt : ''), donde: keys.map(function (k) { return L[k]; }) }; }

  def('RF-CLI-01', 'inter', 'Alta en S1 con cronómetro y en S2; el celular no puede repetirse.', ['s1', 'hog']);
  def('RF-CLI-02', 'inter', 'Se guarda fecha, medio, texto leído y quién lo registró.', ['s1', 'hog']);
  def('RF-CLI-03', 'inter', 'Una respuesta «No volver a escribir» da de baja y bloquea los avisos.', ['s3m', 'hog']);
  def('RF-CLI-04', 'inter', 'Valida cada fila y muestra los errores antes de importar.', ['hog']);
  def('RF-CLI-05', 'inter', 'Ficha con pedidos, entregas, envases, cobros, deuda, avisos y consentimiento.', ['hog']);
  def('RF-CLI-06', 'inter', 'Exporta un JSON y elimina los datos, dejando la solicitud registrada.', ['hog', 'eqp']);
  def('RF-CAT-01', 'inter', 'El cambio de precio no altera pedidos ya confirmados (RN-06).', ['cat']);
  def('RF-CAT-02', 'inter', 'Garantía editable por tipo de envase.', ['cat']);
  def('RF-CAT-03', 'sim', 'Prepara el registro de marcas; la norma multimarca sigue sin confirmar.', ['cat']);
  def('RF-PED-01', 'inter', 'Bandeja única con origen y registro telefónico con cronómetro.', ['ped']);
  def('RF-PED-02', 'inter', 'Estados con historial de cambios por pedido.', ['ped']);
  def('RF-PED-03', 'inter', 'El mensaje libre llega a la bandeja; se confirma con un clic, sin interpretarlo.', ['ped', 's3m']);
  def('RF-PED-04', 'inter', 'Marca «Posible duplicado» y avisa al registrar.', ['ped']);
  def('RF-PED-05', 'sim', 'Genera el pedido recurrente a pedido; la programación nocturna es ilustrativa.', ['rec']);
  def('RF-REP-01', 'inter', 'Mediana de las últimas k duraciones por unidad, con su rango.', ['par', 's3r']);
  def('RF-REP-02', 'inter', 'Referencia por producto o no avisar, según el parámetro.', ['par', 'rep']);
  def('RF-REP-03', 'inter', 'Fecha de aviso = agotamiento − anticipación, con rango válido (RN-09).', ['rep', 'par']);
  def('RF-REP-04', 'inter', 'Cada exclusión muestra su motivo (consentimiento, pedido abierto, control, horario).', ['rep']);
  def('RF-REP-05', 'inter', 'Nada se envía sin aprobar la lista; el envío automático es opcional.', ['rep', 'par']);
  def('RF-REP-06', 'inter', 'Vista previa de WhatsApp con el texto escrito y registro de la respuesta.', ['rep']);
  def('RF-REP-07', 'inter', 'Cada entrega sincronizada recalcula la estimación del hogar.', ['s3r', 'hog']);
  def('RF-REP-08', 'inter', '«Todavía tengo» pospone el aviso y se usa en la estimación.', ['rep', 's3m']);
  def('RF-REP-09', 'inter', 'Lista de hogares atrasados con acciones de llamada y pedido.', ['per']);
  def('RF-MSG-01', 'sim', 'Plantillas con categoría y estado de aprobación simulados.', ['mpl', 's3m']);
  def('RF-MSG-02', 'sim', 'Estados enviado, entregado y fallido; webhook con firma.', ['mes', 's3m']);
  def('RF-MSG-03', 'inter', 'El botón «Sí» crea un pedido confirmado con el producto de la última entrega.', ['s3m', 'rep']);
  def('RF-MSG-04', 'inter', 'Mensaje libre solo con la ventana de 24 h abierta; si no, solo plantillas.', ['msg']);
  def('RF-MSG-05', 'inter', 'Costo por mensaje con tarifas de ejemplo editables.', ['mes', 's3m']);
  def('RF-MSG-06', 'inter', 'Los avisos fallidos pasan a la lista de llamadas.', ['mll', 'rep']);
  def('RF-DIA-01', 'inter', 'Asignación de pedidos a Luis o Marco.', ['dia']);
  def('RF-DIA-02', 'inter', 'Probables en el portal y en el paquete del repartidor.', ['dia', 's1']);
  def('RF-DIA-03', 'inter', 'La carga se registra en el portal y se confirma en la app.', ['dia', 's1']);
  def('RF-DIA-04', 'sim', 'Tamaño y tiempo estimados del paquete; la descarga real ocurre en S1.', ['dia', 's1']);
  def('RF-DIA-05', 'inter', 'Orden de visita manual y enlace a Google Maps.', ['s1']);
  def('RF-DIA-06', 'inter', 'Asignaciones y cancelaciones llegan al teléfono al sincronizar.', ['dia', 's1']);
  def('RF-APP-01', 'inter', 'La jornada se descarga con señal; sin señal el inicio se bloquea y el resto funciona.', ['s1']);
  def('RF-APP-02', 'inter', 'Búsqueda por nombre o dirección y filtros por estado.', ['s1']);
  def('RF-APP-03', 'inter', 'Tres toques: producto, envase, efectivo exacto.', ['s1']);
  def('RF-APP-04', 'inter', 'Cuatro motivos de no entrega.', ['s1']);
  def('RF-APP-05', 'inter', 'Hogar existente o nuevo; el pedido nace en el teléfono.', ['s1']);
  def('RF-APP-06', 'inter', 'Llenos, vacíos, marca y garantía por entrega; avisa si recoge más vacíos de los prestados (RN-05).', ['s1', 'env']);
  def('RF-APP-07', 'inter', 'Efectivo con vuelto y QR del negocio por verificar.', ['s1']);
  def('RF-APP-08', 'inter', 'Enlace de pago con QR y fiado con límite.', ['s1']);
  def('RF-APP-09', 'inter', 'Consentimiento verbal con el texto leído.', ['s1']);
  def('RF-APP-10', 'inter', 'Estado de sincronización, cola y alerta de eventos viejos.', ['s1']);
  def('RF-APP-11', 'inter', 'Resumen por medio de pago y envases; coincide con el cuadre.', ['s1', 'cua']);
  def('RF-APP-12', 'sim', 'Se marca la foto adjunta; no se captura imagen real.', ['s1']);
  def('RF-ENV-01', 'inter', 'Saldo calculado desde los movimientos; no se edita.', ['env']);
  def('RF-ENV-02', 'inter', 'Saldo por vehículo durante la jornada.', ['evh']);
  def('RF-ENV-03', 'inter', 'Llenos, vacíos propios y de otras marcas.', ['evi']);
  def('RF-ENV-04', 'inter', 'Conteo físico frente al libro; el ajuste es un movimiento nuevo con motivo.', ['evc']);
  def('RF-ENV-05', 'inter', 'Garantías cobradas, devueltas y saldo por hogar.', ['evg']);
  def('RF-ENV-06', 'inter', 'Hogares con envases y sin compras, valorizados.', ['evr']);
  def('RF-COB-01', 'inter', 'Cada cobro es un evento con identificador; no se edita.', ['cob', 's3e']);
  def('RF-COB-02', 'inter', 'Ningún cobro digital cuenta como verificado sin confirmación.', ['cov', 'cua']);
  def('RF-COB-03', 'inter', 'Página de pago simulada con las reglas verificadas de Yape.', ['s3p', 'cop', 's1']);
  def('RF-COB-04', 'inter', 'Deuda, abonos y límite que bloquea el fiado en la app.', ['cof', 's1']);
  def('RF-COB-05', 'inter', 'Solo el dueño anula, con contra-asiento y motivo.', ['cob']);
  def('RF-CUA-01', 'inter', 'Esperado frente a recibido por medio de pago.', ['cua']);
  def('RF-CUA-02', 'inter', 'Esperado frente a contado de envases llenos y vacíos recogidos.', ['cua']);
  def('RF-CUA-03', 'inter', 'Cada diferencia exige un motivo; el cuadre cerrado no se edita.', ['cua']);
  def('RF-CUA-04', 'inter', 'El cierre queda provisional si hay pendientes o falta resolver algo.', ['cua']);
  def('RF-CUA-05', 'inter', 'Cronómetro del cuadre frente a la línea base manual.', ['cua']);
  def('RF-SYN-01', 'inter', 'Cada operación es un evento con UUID, secuencia y hora del teléfono.', ['s1', 's3e']);
  def('RF-SYN-02', 'inter', 'Lotes con acuse por evento: aceptado, duplicado o rechazado.', ['s1', 's3s']);
  def('RF-SYN-03', 'inter', 'Prueba ejecutable con mil reenvíos.', ['s3s', 's1']);
  def('RF-SYN-04', 'inter', 'Un evento sale de la cola solo con su acuse; prueba de cortes de red.', ['s3s', 's1']);
  def('RF-SYN-05', 'inter', 'Una prueba por cada regla de conflicto.', ['s3s']);
  def('RF-SYN-06', 'vis', 'Se muestra la compatibilidad de versiones; no hay versiones reales.', ['s3s']);
  def('RF-EXP-01', 'inter', 'Asignación con semilla, bloqueada y reproducible.', ['s3x', 'res']);
  def('RF-EXP-02', 'inter', 'El grupo de control no recibe avisos pero sus compras se registran.', ['s3x', 'rep']);
  def('RF-EXP-03', 'inter', 'Diferencia con intervalo de confianza calculada desde los datos.', ['res', 's3x']);
  def('RF-EXP-04', 'inter', 'Retorno bruto y neto con costo de mensajes.', ['res']);
  def('RF-EXP-05', 'inter', 'Error mediano y porcentaje dentro de ±3 días calculados sobre el historial.', ['res']);
  def('RF-SEG-01', 'sim', 'Pruebas de aislamiento sobre datos de ejemplo.', ['s3g']);
  def('RF-SEG-02', 'inter', 'El portal cambia entre dueño y despachador y aplica los permisos.', ['eqp']);
  def('RF-SEG-03', 'inter', 'Ingreso con celular y PIN; revocación remota del dispositivo.', ['s1', 'eqd']);
  def('RF-SEG-04', 'inter', 'Auditoría de solo inserción; los intentos de borrado quedan registrados.', ['eqa', 's3g']);
  def('RF-SEG-05', 'sim', 'Alta de empresas, planes y soporte; en el MVP puede ser un script.', ['s4e']);
  def('RF-GLP-01', 'sim', 'Registro de recepción y procedencia.', ['glp']);
  def('RF-GLP-02', 'sim', 'Canje de vale FISE sin guardar el DNI.', ['glp']);
  def('RF-GLP-03', 'sim', 'Exportación bloqueada hasta que se apruebe la norma.', ['glp']);
  def('RF-GLP-04', 'sim', 'Número de registro de hidrocarburos del local.', ['glp']);
})();

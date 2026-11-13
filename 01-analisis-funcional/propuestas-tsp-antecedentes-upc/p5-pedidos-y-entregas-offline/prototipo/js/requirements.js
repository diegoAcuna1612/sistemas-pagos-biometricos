/* Generado desde 14_analisis_funcional_y_requerimientos.md (83 requerimientos funcionales). */
(function(){var App=window.App=window.App||{};
App.REQS=[
 {
  "id": "RF-CLI-01",
  "mod": "Hogares y consentimiento",
  "text": "Registrar el hogar con datos mínimos: nombre o alias, celular (+51), dirección con referencia, ubicación opcional, productos y cantidades habituales",
  "sys": "S1, S2",
  "prio": "debe",
  "crit": "Alta en ruta en ≤ 60 s [H]; un celular no se repite dentro de la empresa"
 },
 {
  "id": "RF-CLI-02",
  "mod": "Hogares y consentimiento",
  "text": "Registrar el consentimiento para recibir avisos: fecha, medio (verbal en la entrega, mensaje del hogar o formulario), texto mostrado y quién lo registró",
  "sys": "S1, S2",
  "prio": "debe",
  "crit": "0 avisos a hogares sin consentimiento vigente, comprobado en la auditoría"
 },
 {
  "id": "RF-CLI-03",
  "mod": "Hogares y consentimiento",
  "text": "Dar de baja los avisos cuando el hogar responde \"No volver a escribir\" o \"SALIR\", o cuando lo pide al dueño",
  "sys": "S3",
  "prio": "debe",
  "crit": "Ningún aviso después de la baja; la baja queda registrada"
 },
 {
  "id": "RF-CLI-04",
  "mod": "Hogares y consentimiento",
  "text": "Importar hogares e historial de compras desde una planilla: fecha, hogar, producto y cantidad",
  "sys": "S2",
  "prio": "deberia",
  "crit": "El historial importado alimenta el motor (RF-REP-01); errores reportados por fila"
 },
 {
  "id": "RF-CLI-05",
  "mod": "Hogares y consentimiento",
  "text": "Ver la ficha del hogar: pedidos, entregas, envases, cobros, deuda, avisos y respuestas",
  "sys": "S2",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-CLI-06",
  "mod": "Hogares y consentimiento",
  "text": "Exportar o eliminar los datos de un hogar a su pedido",
  "sys": "S2, S3",
  "prio": "deberia",
  "crit": "Se atiende sin intervención técnica (derechos del titular, Ley 29733)"
 },
 {
  "id": "RF-CAT-01",
  "mod": "Catálogo, precios y envases",
  "text": "Productos (por ejemplo, GLP 10 kg, 5 kg y 45 kg; agua 20 L) con precio vigente e historial de precios",
  "sys": "S2",
  "prio": "debe",
  "crit": "Un cambio de precio no altera pedidos ya confirmados (RN-06)"
 },
 {
  "id": "RF-CAT-02",
  "mod": "Catálogo, precios y envases",
  "text": "Tipos de envase retornable asociados a cada producto, con garantía configurable",
  "sys": "S2",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-CAT-03",
  "mod": "Catálogo, precios y envases",
  "text": "Marcas de envase (propia y de otras envasadoras) y opción \"acepta envases de otras marcas\"",
  "sys": "S2",
  "prio": "deberia",
  "crit": "Configurable por empresa mientras se define la norma multimarca (12 §3)"
 },
 {
  "id": "RF-PED-01",
  "mod": "Pedidos",
  "text": "Bandeja única de pedidos que registre el origen: respuesta al aviso, mensaje libre, llamada, venta en ruta o pedido recurrente",
  "sys": "S2",
  "prio": "debe",
  "crit": "Pedido telefónico registrado en ≤ 30 s [H]"
 },
 {
  "id": "RF-PED-02",
  "mod": "Pedidos",
  "text": "Estados del pedido: por confirmar → confirmado → asignado → en ruta → entregado, no entregado (con motivo) o cancelado. Cada cambio es un evento",
  "sys": "S3",
  "prio": "debe",
  "crit": "Historial completo de cambios por pedido"
 },
 {
  "id": "RF-PED-03",
  "mod": "Pedidos",
  "text": "Mostrar el mensaje libre del hogar al despachador para convertirlo en pedido con un clic, sin interpretación automática",
  "sys": "S2",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-PED-04",
  "mod": "Pedidos",
  "text": "Alertar si un hogar tiene dos pedidos abiertos del mismo producto",
  "sys": "S3",
  "prio": "deberia",
  "crit": "—"
 },
 {
  "id": "RF-PED-05",
  "mod": "Pedidos",
  "text": "Pedidos recurrentes programados: cada N días o un día fijo",
  "sys": "S2, S3",
  "prio": "deberia",
  "crit": "Se generan la noche anterior"
 },
 {
  "id": "RF-REP-01",
  "mod": "Reposición anticipada",
  "text": "Estimar, por hogar y producto, la **duración por unidad**: mediana de (días entre entregas ÷ unidades entregadas) en las últimas k entregas (k = 4 por defecto [H]), con su rango mínimo–máximo",
  "sys": "S3",
  "prio": "debe",
  "crit": "Error absoluto mediano ≤ 3 días en evaluación retrospectiva (13 §6, objetivo 2)"
 },
 {
  "id": "RF-REP-02",
  "mod": "Reposición anticipada",
  "text": "Para hogares con menos de 2 entregas, usar una duración de referencia configurable por producto, o no avisar",
  "sys": "S3",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-REP-03",
  "mod": "Reposición anticipada",
  "text": "Fecha de aviso = última entrega + duración por unidad × unidades entregadas − anticipación (1 día por defecto)",
  "sys": "S3",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-REP-04",
  "mod": "Reposición anticipada",
  "text": "Excluir del aviso a hogares sin consentimiento, dados de baja, con pedido abierto, con aviso reciente sin respuesta (RN-02), del grupo de control o fuera del horario permitido (RN-03)",
  "sys": "S3",
  "prio": "debe",
  "crit": "Cada exclusión queda registrada con su motivo"
 },
 {
  "id": "RF-REP-05",
  "mod": "Reposición anticipada",
  "text": "Mostrar al despachador la lista diaria de avisos sugeridos, para aprobarla completa o excluir hogares antes del envío",
  "sys": "S2",
  "prio": "debe",
  "crit": "Nada se envía sin aprobación, salvo que el dueño active el envío automático"
 },
 {
  "id": "RF-REP-06",
  "mod": "Reposición anticipada",
  "text": "**Modo manual:** cada aviso de la lista abre WhatsApp en el celular del negocio con el texto ya escrito (enlace wa.me). El despachador marca la respuesta: sí, todavía tengo, no, sin respuesta",
  "sys": "S2",
  "prio": "debe",
  "crit": "Permite el Mago de Oz y el MVP sin API ni costo por mensaje"
 },
 {
  "id": "RF-REP-07",
  "mod": "Reposición anticipada",
  "text": "Recalcular la estimación del hogar después de cada entrega sincronizada",
  "sys": "S3",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-REP-08",
  "mod": "Reposición anticipada",
  "text": "Si el hogar responde \"todavía tengo\", posponer el aviso (3 días por defecto [H]) y usar el dato en la estimación",
  "sys": "S3",
  "prio": "deberia",
  "crit": "—"
 },
 {
  "id": "RF-REP-09",
  "mod": "Reposición anticipada",
  "text": "Listar los hogares que pasaron su fecha prevista por más de X días sin comprar (posible cliente perdido), para llamarlos",
  "sys": "S2",
  "prio": "deberia",
  "crit": "—"
 },
 {
  "id": "RF-MSG-01",
  "mod": "Mensajería por API",
  "text": "Enviar plantillas aprobadas por Meta con variables (nombre, producto, fecha) y botones de respuesta rápida: \"Sí, mañana\", \"Todavía tengo\", \"No volver a escribir\"",
  "sys": "S3",
  "prio": "deberia",
  "crit": "—"
 },
 {
  "id": "RF-MSG-02",
  "mod": "Mensajería por API",
  "text": "Recibir por webhook el estado de cada mensaje: enviado, entregado, leído o fallido con su código",
  "sys": "S3",
  "prio": "deberia",
  "crit": "Estado visible por aviso"
 },
 {
  "id": "RF-MSG-03",
  "mod": "Mensajería por API",
  "text": "Asociar la respuesta del botón al hogar y a su aviso. \"Sí\" crea un pedido confirmado con el producto y la cantidad de la última entrega",
  "sys": "S3",
  "prio": "deberia",
  "crit": "Sin intervención del despachador"
 },
 {
  "id": "RF-MSG-04",
  "mod": "Mensajería por API",
  "text": "Permitir mensajes libres del despachador solo dentro de la ventana de 24 h abierta por el hogar; fuera de ella, solo plantillas [F1]",
  "sys": "S2, S3",
  "prio": "deberia",
  "crit": "—"
 },
 {
  "id": "RF-MSG-05",
  "mod": "Mensajería por API",
  "text": "Registrar el costo de cada mensaje según una tarifa configurable por categoría",
  "sys": "S3",
  "prio": "deberia",
  "crit": "Costo por empresa y por pedido obtenido (RF-EXP-04)"
 },
 {
  "id": "RF-MSG-06",
  "mod": "Mensajería por API",
  "text": "Pasar a la lista de llamadas los avisos que fallen",
  "sys": "S2",
  "prio": "deberia",
  "crit": "—"
 },
 {
  "id": "RF-DIA-01",
  "mod": "Planificación del día",
  "text": "Asignar pedidos confirmados a repartidores",
  "sys": "S2",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-DIA-02",
  "mod": "Planificación del día",
  "text": "Agregar al paquete una lista secundaria de \"probables\": hogares avisados sin respuesta y cerca de su fecha, para ofrecerles en la ruta (12 §6 A, paso 3)",
  "sys": "S2, S3",
  "prio": "deberia",
  "crit": "—"
 },
 {
  "id": "RF-DIA-03",
  "mod": "Planificación del día",
  "text": "Registrar la carga del vehículo: llenos y vacíos que salen",
  "sys": "S2, S1",
  "prio": "debe",
  "crit": "Es la base del cuadre de envases (RF-CUA-02)"
 },
 {
  "id": "RF-DIA-04",
  "mod": "Planificación del día",
  "text": "Generar el paquete del día: pedidos, datos mínimos del hogar, precios, saldo de envases y deuda por hogar",
  "sys": "S3",
  "prio": "debe",
  "crit": "Descarga completa en < 30 s con 3G [H]"
 },
 {
  "id": "RF-DIA-05",
  "mod": "Planificación del día",
  "text": "Orden de visita manual y enlace a Google Maps o Waze",
  "sys": "S1",
  "prio": "debe",
  "crit": "Sin ruteo automático"
 },
 {
  "id": "RF-DIA-06",
  "mod": "Planificación del día",
  "text": "Enviar al repartidor los pedidos nuevos o cancelados del día cuando tenga señal",
  "sys": "S3, S1",
  "prio": "deberia",
  "crit": "—"
 },
 {
  "id": "RF-APP-01",
  "mod": "App del repartidor",
  "text": "Iniciar la jornada descargando el paquete; después, la app funciona completa sin red",
  "sys": "S1",
  "prio": "debe",
  "crit": "Jornada completa en modo avión (RNF-01)"
 },
 {
  "id": "RF-APP-02",
  "mod": "App del repartidor",
  "text": "Lista del día con búsqueda por nombre o dirección",
  "sys": "S1",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-APP-03",
  "mod": "App del repartidor",
  "text": "Registrar la entrega típica en **3 toques**: mismo producto y cantidad, envase intercambiado, pago en efectivo",
  "sys": "S1",
  "prio": "debe",
  "crit": "Mediana < 10 s (06 §5)"
 },
 {
  "id": "RF-APP-04",
  "mod": "App del repartidor",
  "text": "Registrar \"no entregado\" con motivo: no estaba, no quiso, dirección errada o sin stock",
  "sys": "S1",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-APP-05",
  "mod": "App del repartidor",
  "text": "Vender en ruta a un hogar no programado, existente o nuevo (alta rápida, RF-CLI-01)",
  "sys": "S1",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-APP-06",
  "mod": "App del repartidor",
  "text": "Registrar los envases de cada entrega: llenos entregados, vacíos recogidos, marca del vacío (si la empresa lo exige) y garantía cobrada o devuelta",
  "sys": "S1",
  "prio": "debe",
  "crit": "Valores por defecto: 1 por 1"
 },
 {
  "id": "RF-APP-07",
  "mod": "App del repartidor",
  "text": "Registrar el cobro en efectivo (con vuelto) o con el QR del negocio",
  "sys": "S1",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-APP-08",
  "mod": "App del repartidor",
  "text": "Registrar el cobro por enlace de pago o como fiado",
  "sys": "S1",
  "prio": "deberia",
  "crit": "Ver RF-COB-03 y RF-COB-04"
 },
 {
  "id": "RF-APP-09",
  "mod": "App del repartidor",
  "text": "Registrar el consentimiento verbal del hogar para recibir avisos",
  "sys": "S1",
  "prio": "debe",
  "crit": "Guarda el texto que se leyó al hogar"
 },
 {
  "id": "RF-APP-10",
  "mod": "App del repartidor",
  "text": "Mostrar el estado de sincronización (eventos pendientes y última sincronización) y alertar si hay pendientes de más de N horas",
  "sys": "S1",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-APP-11",
  "mod": "App del repartidor",
  "text": "Cerrar la jornada con un resumen: cobrado por medio de pago, envases en el vehículo y efectivo a entregar",
  "sys": "S1",
  "prio": "debe",
  "crit": "Coincide con el cuadre del portal (RF-CUA-01)"
 },
 {
  "id": "RF-APP-12",
  "mod": "App del repartidor",
  "text": "Foto opcional como evidencia, comprimida",
  "sys": "S1",
  "prio": "podria",
  "crit": "—"
 },
 {
  "id": "RF-ENV-01",
  "mod": "Libro de envases",
  "text": "Saldo por hogar y tipo de envase = llenos entregados − vacíos recogidos ± ajustes",
  "sys": "S3",
  "prio": "debe",
  "crit": "Se calcula desde los eventos; no se edita"
 },
 {
  "id": "RF-ENV-02",
  "mod": "Libro de envases",
  "text": "Saldo por vehículo durante la jornada = carga − entregados + recogidos",
  "sys": "S3",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-ENV-03",
  "mod": "Libro de envases",
  "text": "Inventario del local: llenos, vacíos propios y vacíos de otras marcas",
  "sys": "S3, S2",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-ENV-04",
  "mod": "Libro de envases",
  "text": "Conteo físico semanal con su diferencia frente al libro; el ajuste es un movimiento nuevo con motivo",
  "sys": "S2",
  "prio": "debe",
  "crit": "Diferencia ≤ 2% al cierre de semana (13 §6, objetivo 4)"
 },
 {
  "id": "RF-ENV-05",
  "mod": "Libro de envases",
  "text": "Garantías cobradas, devueltas y saldo por hogar",
  "sys": "S3, S2",
  "prio": "deberia",
  "crit": "—"
 },
 {
  "id": "RF-ENV-06",
  "mod": "Libro de envases",
  "text": "Listar los hogares con envases prestados y sin compras en más de X días",
  "sys": "S2",
  "prio": "deberia",
  "crit": "Envases en riesgo, valorizados en soles"
 },
 {
  "id": "RF-COB-01",
  "mod": "Cobros",
  "text": "Cada cobro es un evento inmutable con UUID, ligado a la entrega y al hogar",
  "sys": "S1, S3",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-COB-02",
  "mod": "Cobros",
  "text": "Los pagos con el QR del negocio (Yape o Plin) quedan \"por verificar\" hasta que el dueño o el despachador los confirmen en el cuadre contra su historial",
  "sys": "S2",
  "prio": "debe",
  "crit": "Ningún cobro digital cuenta como verificado sin confirmación"
 },
 {
  "id": "RF-COB-03",
  "mod": "Cobros",
  "text": "**Enlace de pago:** página de pago de la plataforma con el checkout de la pasarela; el hogar paga desde su celular y el backend crea el cargo. Para pedidos que ya existen en el servidor, el enlace se envía por WhatsApp o se muestra como QR en la app; como la URL lleva el identificador del pedido, la app lo genera sin señal. Las ventas en ruta creadas sin señal se cobran en efectivo, con el QR del negocio o como fiado",
  "sys": "S1, S3, E2",
  "prio": "deberia",
  "crit": "La app no captura datos de Yape (H3); el pago se concilia aunque el repartidor siga sin señal"
 },
 {
  "id": "RF-COB-04",
  "mod": "Cobros",
  "text": "Fiado: deuda por hogar, abonos y límite configurable",
  "sys": "S1, S3",
  "prio": "deberia",
  "crit": "—"
 },
 {
  "id": "RF-COB-05",
  "mod": "Cobros",
  "text": "Solo el dueño anula cobros, como contra-asiento con motivo",
  "sys": "S2",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-CUA-01",
  "mod": "Cuadre",
  "text": "Cuadre por repartidor y jornada: esperado por medio de pago frente a lo entregado o verificado, con la diferencia",
  "sys": "S2",
  "prio": "debe",
  "crit": "Tiempo de cuadre −50% frente al papel (06 §5)"
 },
 {
  "id": "RF-CUA-02",
  "mod": "Cuadre",
  "text": "Cuadre de envases del vehículo: esperado frente a devuelto",
  "sys": "S2",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-CUA-03",
  "mod": "Cuadre",
  "text": "Registrar cada diferencia con responsable y motivo, sin edición posterior",
  "sys": "S2, S3",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-CUA-04",
  "mod": "Cuadre",
  "text": "Calcular el cuadre solo con eventos sincronizados. Si el dispositivo tiene eventos pendientes, el cierre queda provisional",
  "sys": "S3",
  "prio": "debe",
  "crit": "No se cierra un cuadre con pendientes conocidos"
 },
 {
  "id": "RF-CUA-05",
  "mod": "Cuadre",
  "text": "Medir la duración del cuadre, del inicio al cierre",
  "sys": "S2",
  "prio": "debe",
  "crit": "Métrica del TSP (11 §6, objetivo 4)"
 },
 {
  "id": "RF-SYN-01",
  "mod": "Sincronización",
  "text": "Toda operación de la app se guarda primero en la base local, en una transacción, como evento con UUID generado en el dispositivo, número de secuencia y hora del dispositivo",
  "sys": "S1",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-SYN-02",
  "mod": "Sincronización",
  "text": "Enviar los eventos por lotes, con reintentos. El servidor responde un acuse por evento: aceptado, duplicado o rechazado con motivo",
  "sys": "S1, S3",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-SYN-03",
  "mod": "Sincronización",
  "text": "Idempotencia: un UUID ya recibido no cambia el estado",
  "sys": "S3",
  "prio": "debe",
  "crit": "0 duplicados en 1 000 reenvíos (13 §6, objetivo 1)"
 },
 {
  "id": "RF-SYN-04",
  "mod": "Sincronización",
  "text": "Un evento sale de la cola local solo después de su acuse",
  "sys": "S1",
  "prio": "debe",
  "crit": "0 pérdidas con cortes simulados: modo avión, cierre forzado y apagado"
 },
 {
  "id": "RF-SYN-05",
  "mod": "Sincronización",
  "text": "Reglas de conflicto de 06 §3: gana el primero que llega al servidor; la entrega prevalece sobre la cancelación, con alerta; se guardan la hora del dispositivo y la del servidor",
  "sys": "S3",
  "prio": "debe",
  "crit": "Una prueba automatizada por regla"
 },
 {
  "id": "RF-SYN-06",
  "mod": "Sincronización",
  "text": "Aceptar eventos de versiones anteriores de la app durante un período de transición",
  "sys": "S3",
  "prio": "deberia",
  "crit": "—"
 },
 {
  "id": "RF-EXP-01",
  "mod": "Medición y experimento",
  "text": "Asignar al azar los hogares elegibles a \"aviso\" o \"control\" al inicio del experimento, por producto; la asignación no cambia",
  "sys": "S3",
  "prio": "debe",
  "crit": "Se registran la semilla y la fecha"
 },
 {
  "id": "RF-EXP-02",
  "mod": "Medición y experimento",
  "text": "El grupo de control no recibe avisos y sus compras se registran igual",
  "sys": "S3",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-EXP-03",
  "mod": "Medición y experimento",
  "text": "Métrica principal: recompra con el distribuidor dentro de los 30 días siguientes a la fecha prevista. Secundarias: tasa de respuesta, días de adelanto y bajas. Se reporta la diferencia con su intervalo de confianza",
  "sys": "S3, S2",
  "prio": "debe",
  "crit": "Reproducible desde los eventos (H6)"
 },
 {
  "id": "RF-EXP-04",
  "mod": "Medición y experimento",
  "text": "Reporte semanal de retorno: pedidos originados por avisos (bruto), incremento frente al control (neto) y costo de los mensajes",
  "sys": "S2",
  "prio": "debe",
  "crit": "Distingue bruto y neto. Es la mitigación del abandono a los dos meses (12 §8)"
 },
 {
  "id": "RF-EXP-05",
  "mod": "Medición y experimento",
  "text": "Evaluación retrospectiva del motor: error absoluto mediano en días y % de hogares dentro de ±3 días",
  "sys": "S3",
  "prio": "debe",
  "crit": "Objetivo 2 de 13 §6"
 },
 {
  "id": "RF-SEG-01",
  "mod": "Usuarios, empresas y auditoría",
  "text": "Multiempresa: cada registro pertenece a una empresa y ninguna consulta cruza empresas",
  "sys": "S3",
  "prio": "debe",
  "crit": "Pruebas de aislamiento"
 },
 {
  "id": "RF-SEG-02",
  "mod": "Usuarios, empresas y auditoría",
  "text": "Roles y permisos de §4",
  "sys": "S2, S3",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-SEG-03",
  "mod": "Usuarios, empresas y auditoría",
  "text": "Ingreso del repartidor con celular y PIN; sesión válida sin red durante la jornada; revocación remota del dispositivo",
  "sys": "S1, S3",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-SEG-04",
  "mod": "Usuarios, empresas y auditoría",
  "text": "Auditoría de solo inserción para anulaciones, ajustes, cambios de precio, bajas y exportaciones",
  "sys": "S3",
  "prio": "debe",
  "crit": "—"
 },
 {
  "id": "RF-SEG-05",
  "mod": "Usuarios, empresas y auditoría",
  "text": "Alta de empresas, planes y soporte",
  "sys": "S4",
  "prio": "deberia",
  "crit": "En el MVP, el alta puede hacerse por script"
 },
 {
  "id": "RF-GLP-01",
  "mod": "Complemento GLP: alternativa B",
  "text": "Registrar la envasadora o marca del cilindro al recibir stock (rotulado de procedencia, 12 §3)",
  "sys": "S2",
  "prio": "podria",
  "crit": "—"
 },
 {
  "id": "RF-GLP-02",
  "mod": "Complemento GLP: alternativa B",
  "text": "Registrar el canje de un vale FISE como medio de pago: código del vale y monto",
  "sys": "S1",
  "prio": "podria",
  "crit": "No guarda el DNI"
 },
 {
  "id": "RF-GLP-03",
  "mod": "Complemento GLP: alternativa B",
  "text": "Exportar compras y ventas por cilindro si se aprueba la trazabilidad propuesta por el Minem",
  "sys": "S2",
  "prio": "podria",
  "crit": "Condicionado a la norma [PI]"
 },
 {
  "id": "RF-GLP-04",
  "mod": "Complemento GLP: alternativa B",
  "text": "Guardar el número de registro de hidrocarburos del local",
  "sys": "S2",
  "prio": "podria",
  "crit": "—"
 }
];
App.REQ={};App.REQS.forEach(function(r){App.REQ[r.id]=r;});})();

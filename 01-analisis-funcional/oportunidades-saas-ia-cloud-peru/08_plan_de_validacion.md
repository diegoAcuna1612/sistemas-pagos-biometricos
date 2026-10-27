# 08 — Plan de validación

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Reglas comunes

1. **Antes de programar el producto, conseguir:** entrevistas, acceso a procesos reales y compromisos de piloto.
2. **"Me gusta la idea" no cuenta.** Cuentan:
   - Datos del pasado ("¿cuánto tardó la última vez?").
   - Documentos reales entregados.
   - Tiempo del cliente comprometido.
   - Dinero o una carta de intención con precio.
3. **Preguntas no inductivas:**
   - Preguntar por lo que hicieron, no por lo que harían.
   - No describir el producto hasta el final de la entrevista.
4. **Confidencialidad:** pedir documentos solo con un acuerdo de confidencialidad, anonimizar y borrar al terminar. Si hay datos personales, aplica el DS 016-2024-JUS [S61].
5. **Contactar empresas requiere la autorización del equipo.** Este informe **no contactó a nadie**.

## 2. O1 — DAM Asistida (prioridad 1)

### 2.1 Entrevistados

| Perfil | Por qué | Meta |
|---|---|---|
| Liquidador o liquidadora de importaciones (2+ años) | Hace la tarea; conoce los tiempos reales | 5 |
| Jefe de operaciones o de liquidación de una agencia | Ve el volumen, los errores y el costo | 3 |
| Gerente o dueño de agencia | Decide la compra | 2 |
| Encargado de importaciones de una empresa con aduana propia | Segmento alternativo | 1–2 |

### 2.2 Cómo encontrarlos

1. **Avisos de empleo de liquidadores** (Computrabajo, LinkedIn) de los últimos 60 días: la empresa que contrata tiene el dolor ahora [S15–S17].
2. **Ranking de agentes de aduana de SUNAT** y **relación de asociados de la AAAP** (aaap.org.pe) para armar una lista de unas 40 agencias (P1).
3. **LinkedIn:** búsqueda por "liquidador de aduanas", "jefe de operaciones aduaneras", Callao.
4. **Red personal y universitaria:** egresados de negocios internacionales; docentes de comercio exterior.
5. **Eventos:** BASC Perú, capacitaciones de la AAAP [S72] [PI: calendario].

### 2.3 Guía de entrevista (sin mostrar el producto)

1. Cuéntame cómo fue la **última DAM** que liquidaste: desde que llegaron los documentos hasta que se numeró.
2. ¿Cuánto tiempo te tomó? ¿Qué parte tomó más?
3. ¿Cuántos ítems tenía la factura? ¿Es lo normal? ¿Cuál fue el caso más largo del último mes?
4. ¿Cómo pasas los datos de la factura al sistema? ¿Tecleas línea por línea, copias o importas un archivo?
5. ¿Qué errores encontraste en las últimas semanas? ¿Quién los detectó y cuándo? ¿Qué costó corregirlos?
6. ¿Cómo decides la partida cuando el producto es nuevo? ¿Usas un historial?
7. ¿Qué herramientas has probado para acelerar esto? ¿Por qué las dejaste o las sigues usando?
8. (Al gerente) ¿Cuántas DAM numeran al mes? ¿Cuántos liquidadores tienen? ¿Contrataron en el último año por volumen?
9. (Al gerente) ¿Cuánto pagan por SINTAD o SOFTPAD? ¿Quién lo decidió? ¿Cuándo se renueva?
10. ¿Qué pasaría si mañana la transcripción tomara la mitad? ¿Qué harían con ese tiempo? *(Única pregunta hipotética; va al final.)*

### 2.4 Proceso que hay que observar

- **Sentarse junto a un liquidador durante 2–3 liquidaciones reales.**
- Cronometrar cada paso: lectura, transcripción, clasificación, revisión, numeración.
- Anotar dónde copia y pega, dónde teclea, dónde consulta.

### 2.5 Evidencias que hay que pedir

| Evidencia | Uso |
|---|---|
| 10–20 expedientes anonimizados (factura, packing list, B/L) con su DAM final | Conjunto de evaluación (`06` §7) |
| Captura o manual de la pantalla de ingreso de ítems de SINTAD/SOFTPAD; **¿importa desde Excel?** | Resuelve P2 |
| Volumen mensual de DAM y número de liquidadores | Economía (`07` §3) |
| Ejemplos de rectificaciones u observaciones por errores de transcripción | Costo del error |

### 2.6 Prototipo mínimo (después de las entrevistas)

- **Mago de Oz:** el equipo procesa a mano, con ayuda de un asistente de IA genérico, 5 expedientes reales que la agencia envía.
- Devuelve en 24 horas un Excel con cabecera, ítems y validaciones, en el formato de su sistema.
- La agencia mide cuánto tarda en revisarlo y cargarlo frente a su método actual.
- No se construye software hasta ver el resultado.

### 2.7 Señales de interés comercial

| Señal | Fuerza |
|---|---|
| Entrega expedientes reales | Alta |
| Presenta a su jefe o gerente | Alta |
| Pregunta por el precio o la fecha | Media-alta |
| Pide procesar más expedientes | Alta |
| "Interesante, avísame" | **Nula** |

### 2.8 Disposición a pagar

1. Al final de la prueba con el prototipo, presentar un precio concreto. Ejemplo para la prueba [H]: USD 1,50 por expediente con un mínimo mensual.
2. Pedir una **carta de intención** o un **piloto pagado** de 4–6 semanas (aunque sea simbólico).
3. Preguntar: "¿Qué tendría que pasar en el piloto para que lo contraten?" Anotar los criterios del cliente.

### 2.9 Criterios de decisión

| Decisión | Criterio |
|---|---|
| **Continuar** | ≥ 5 de 8 entrevistados describen ≥ 20 minutos de transcripción en DAM frecuentes, **y** ≥ 2 agencias entregan expedientes, **y** ≥ 1 acepta un piloto con precio, **y** existe una forma de cargar los datos (importación o copiado aceptable) |
| **Modificar** | El dolor real es la **clasificación** (partida), no la transcripción → pivotar a un asistente de clasificación. Solo los expedientes con muchos ítems duelen → enfocar el segmento. Las agencias no compran pero los **importadores** sí → cambiar de cliente |
| **Descartar** | < 3 de 8 confirman el dolor, **o** nadie entrega documentos, **o** SINTAD/SOFTPAD ya lo resuelven, **o** la transcripción toma pocos minutos |

## 3. O2 — PedidoListo (prioridad 2, plan B)

| Elemento | Contenido |
|---|---|
| Entrevistados | 5 asistentes comerciales o de ventas internas; 3 gerentes comerciales de distribuidoras **sin** ERP Softland |
| Cómo encontrarlos | Avisos de "asistente comercial" o "ventas internas" de distribuidoras; zonas mayoristas de Lima; implementadores de ERP; LinkedIn |
| Preguntas | ¿Cómo llegó el último pedido? ¿Cuánto tardaste en ingresarlo? ¿Cuántos pedidos al día y por qué canal? ¿Qué error de pedido ocurrió el último mes y qué costó? ¿Qué ERP usan y cómo se cargan los pedidos? ¿Conocen o evaluaron Softland Pedidos IA u otro? |
| Observar | Una mañana de recepción de pedidos: canales, tiempos, búsquedas de códigos |
| Evidencias | 50 pedidos históricos (mensajes y PDF) con el pedido final; catálogo; formato de importación del ERP |
| Prototipo | Mago de Oz: procesar los 50 pedidos y medir el % de líneas correctas sin edición |
| Señales | Entrega el catálogo y los pedidos; involucra a sistemas para la integración |
| Disposición a pagar | Precio mensual por tramo; piloto de 4 semanas |
| **Continuar** | ≥ 4 de 8 con ≥ 30 pedidos diarios por canales no estructurados; acierto ≥ 80% en el prototipo; ≥ 1 piloto con precio |
| **Modificar** | Si todos usan el mismo ERP, enfocarse en ese conector |
| **Descartar** | Pocos pedidos no estructurados; Softland u otro ERP ya lo ofrecen a sus clientes a un precio bajo |

## 4. O4 — Estudio360 (plan C)

| Elemento | Contenido |
|---|---|
| Entrevistados | 8 contadores titulares de estudios con 20 o más RUC |
| Cómo encontrarlos | Colegios de contadores, grupos de Facebook y WhatsApp de contadores, docentes |
| Preguntas | En el último cierre, ¿cuántos clientes entregaron tarde? ¿Cuántas horas persiguiendo documentos? ¿Cómo revisan el buzón SOL de cada cliente? ¿Alguna vez una notificación pasó desapercibida? ¿Qué software pagan hoy y cuánto? |
| Prototipo | Un número de WhatsApp que recibe documentos de 5 clientes de un estudio y los ordena en una carpeta por RUC (manual por detrás) |
| **Antes de cualquier prototipo** | Opinión legal sobre el uso de la Clave SOL de terceros (P7) |
| **Continuar** | ≥ 5 de 8 pagan hoy algún software y dedican ≥ 10 horas al mes a recolectar documentos; ≥ 2 aceptan un piloto pagado |
| **Descartar** | Disposición a pagar menor que el costo de WhatsApp más el soporte |

## 5. O11 — CobraB2B

| Elemento | Contenido |
|---|---|
| Entrevistados | 6 responsables de créditos y cobranzas de empresas que venden a crédito |
| Preguntas | ¿Cuántas facturas vencidas hay hoy? ¿Cómo identifican a quién corresponde un abono? ¿Cuánto tiempo toma la conciliación? ¿Qué herramienta usan para recordar? |
| Prototipo | Conciliar un mes de abonos de un extracto real contra las facturas |
| **Continuar** | La conciliación toma ≥ 1 día al mes y nadie la resuelve; ≥ 1 piloto |
| **Descartar** | Basta con un recordatorio genérico de WhatsApp |

## 6. O3 — CxP Perú

| Elemento | Contenido |
|---|---|
| Entrevistados | 6 jefes de contabilidad de medianas empresas con ERP diferentes |
| Preguntas | ¿Qué comprobantes del SIRE no estaban en su registro el mes pasado? ¿Cómo calcularon y depositaron las detracciones? ¿Qué hace su ERP y qué hacen en Excel? |
| **Continuar** | Hay una tarea concreta, de ≥ 1 día al mes, que el ERP no cubre, en ≥ 4 de 6 empresas |
| **Descartar** | El ERP o Contasis ya lo resuelven |

## 7. Cronograma sugerido

| Semana | O1 | O2 |
|---|---|---|
| 1 | Lista de 40 agencias; 20 contactos; P2 (importación en SINTAD/SOFTPAD); 4 entrevistas | 10 contactos |
| 2 | 4 entrevistas más; 1–2 observaciones; pedir expedientes; **decisión preliminar** | 3 entrevistas de contraste |
| 3–4 | Prototipo Mago de Oz con 5–20 expedientes; precio y carta de intención | Solo si O1 falla en la semana 2 |
| 5–6 | Piloto pagado o decisión de descartar | — |

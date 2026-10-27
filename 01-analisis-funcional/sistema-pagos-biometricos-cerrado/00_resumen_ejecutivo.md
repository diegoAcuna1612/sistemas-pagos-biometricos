# 00 — Resumen ejecutivo: sistema cerrado de consumos con huella

**Fecha:** 27/10/2026.
**Documento de partida:** `../sistema-pagos-biometricos-general/investigacion_pagos_biometricos/11_hoja_de_ruta_comercial_sistema_cerrado.md` (`ref-11`). No se modificó.
**Fuentes y etiquetas:** `10_fuentes_y_evidencias.md`.

## Decisión

| Ámbito | Recomendación |
|---|---|
| **Negocio** | **VALIDAR ANTES DE DESARROLLAR**, cambiando la propuesta: de "comedor con huella" a **gestión y conciliación de consumos con varias credenciales, con la huella como opción** |
| **TSP** | **CONTINUAR CON CAMBIOS**, condicionado a que la UPC confirme la modalidad (si no, tesis con el mismo contenido) |

## Los cinco hallazgos que más pesan

1. **Hay un competidor directo en Perú.**
   - GeoVictoria vende "Control de Comedor": ticket de comida con huella o rostro, una ración por turno, límites, integración con asistencia y el terminal "Box Comedor" para 8 000 huellas y 10 000 tarjetas.
   - Muestra logos de Ripley, SENATI, Tambo y BRECA. No publica precios [C1, C3].
   - Esto **confirma que el problema existe y se paga**, pero **quita a la huella su papel de diferenciador**.
2. **La ley obliga a ofrecer una alternativa sin huella.**
   - El reglamento de datos personales (DS 016-2024-JUS) dice que el consentimiento no es libre si se condiciona un servicio a datos "no indispensables" (art. 3.2).
   - El consentimiento para datos sensibles debe ser escrito (art. 8), y la carga de la prueba es del responsable (art. 9) [C16].
   - El producto debe funcionar igual de bien **sin** huella.
3. **El costo del problema no está demostrado en Perú.**
   - No se encontraron datos de préstamo de credenciales, colas ni conciliación en organizaciones peruanas.
   - **No se hizo ninguna entrevista**: es lo primero que hay que hacer (E2).
4. **Técnicamente es viable**, con una salvedad:
   - Hay lectores de S/ 199–209 con SDK y un comparador abierto en C# [F33, F34]. Hace falta un agente local en la PC del comedor.
   - La salvedad: en trabajadores manuales hay reportes de rechazos frecuentes de la huella (anecdóticos) [C14]. Por eso la minería y la industria no son el mejor primer segmento.
5. **La economía depende del soporte por sede y del precio**, que no se conocen.
   - Sin precios del competidor ni entrevistas, solo se pueden dar fórmulas y una sensibilidad ilustrativa (`07` §4).

## Respuestas a las 10 preguntas

| # | Pregunta | Respuesta | Confianza |
|---|---|---|---|
| 1 | ¿Hay un problema real y frecuente? | **Probablemente sí** en empresas grandes (existe un mercado pagado [C1]); **su costo en Perú no está demostrado** | Media |
| 2 | ¿Qué usan hoy y qué limitaciones tienen? | GeoVictoria (huella, rostro, tarjeta) [C1]; código de barras con DNI, RFID o desarrollos propios en universidades [C10]; vales de Sodexo (modalidad indirecta) [C8]; papel o fotocheck (HP). Limitaciones: préstamo de credenciales, dependencia del proveedor de asistencia, modo sin conexión no documentado | Media |
| 3 | ¿Hay competidores? | **Sí:** GeoVictoria (directo, Perú); ZKTeco (plataforma de comedor) [C5]; CBORD + MorphoWave (universidades de EE. UU.) [C6]; además, tarjeta, QR y desarrollos propios como sustitutos | Alta |
| 4 | ¿La huella aporta una ventaja demostrable? | **No demostrada.** Evita el préstamo, pero la ley exige una alternativa, el competidor ya la tiene, añade costo y falla más en trabajadores manuales. Hay que medirlo (E4) | Media |
| 5 | ¿Quién paga y cuánto? | Paga el **concesionario** o la **empresa o universidad**, no el comensal. **Cuánto: desconocido** (sin precios públicos) | Alta (quién) / ND (cuánto) |
| 6 | ¿Es viable un prototipo con hardware comercial? | **Sí** (`04`) | Alta |
| 7 | ¿Qué obligaciones legales hay? | Dato sensible; consentimiento escrito y libre; alternativa; información (10 puntos); inscripción del banco de datos (gratuita); incidentes en 48 h; contrato de encargo y supresión al terminar; Oficial de Datos Personales según cronograma; flujo transfronterizo si la nube está fuera; excluir menores (`06`) | Media-alta (textos leídos, copias no oficiales) |
| 8 | ¿Puede ser un SaaS sostenible? | **Solo como nicho y si se valida** un dolor de conciliación con costo; depende del soporte por sede | Baja |
| 9 | ¿Sirve como TSP? | **Sí como tema** (complejidad, medición, validación); **el encaje en la modalidad TSP no está confirmado** | Media / Baja |
| 10 | ¿Continuar, modificar o descartar? | **Modificar y validar antes de desarrollar** (negocio); **continuar con cambios** (TSP) | Media |

## Qué cambió respecto de `ref-11`

| Tema | `ref-11` | Ahora |
|---|---|---|
| Competencia | "No investigada"; la huella como ventaja | Competidor directo con huella y rostro [C1] |
| Segmento inicial | Corporativo o campamento | **Concesionario mediano**; campamentos más adelante (venta difícil y huellas desgastadas) |
| Alternativa sin huella | Recomendada (I) | **Obligatoria por el reglamento** (DS art. 3.2) [C16] |
| Obligaciones de datos | Resúmenes de terceros | Articulado leído: tercerización (arts. 28–33), Oficial de Datos (art. 37 y cronograma), flujo transfronterizo (art. 21.2) [C16] |
| Huella como centro del producto | Sí | **No:** es una credencial opcional |

## Riesgos principales

Detalle en `09` §4:
- **R3:** competidor consolidado.
- **R2:** baja disposición de pago.
- **R1:** problema sin costo suficiente.
- **R9:** consentimiento laboral cuestionable.
- **R7:** rechazos de huella en trabajadores manuales.
- **R16:** que la UPC no acepte el TSP.

## Próximos pasos

1. Consultar a la UPC (semana 1).
2. Entrevistas con concesionarios y empresas (semanas 1–6, con las autorizaciones que correspondan).
3. Prueba de concepto con 2 lectores (semanas 2–4).
4. Conocer el producto y el precio del competidor (requiere autorización para contactarlo).
5. Puerta G1 en la semana 6.

## Mapa de documentos

| Archivo | Contenido |
|---|---|
| `01_mapa_de_competidores.md` | Competidores por categoría, fichas y espacios de diferenciación |
| `02_segmentos_y_clientes_potenciales.md` | 11 segmentos, priorización y cliente objetivo |
| `03_validacion_del_problema.md` | 10 problemas, guías de entrevista por rol, criterios de decisión |
| `04_hardware_y_viabilidad_tecnica.md` | Tipos de dispositivo, 1:1 frente a 1:N, contingencias, prueba de concepto |
| `05_arquitectura_y_seguridad.md` | Arquitectura, flujos, sin conexión, modelo de datos, MVP, seguridad |
| `06_marco_legal_peru.md` | Obligaciones verificadas, defensa de la proporcionalidad, roles, preguntas para un abogado |
| `07_modelo_de_negocio_y_viabilidad_economica.md` | Ingresos, costos, fórmulas, escenarios, método de TAM |
| `08_viabilidad_tsp_upc.md` | Requisitos, formulación, objetivos y criterios de aceptación |
| `09_plan_experimental_y_riesgos.md` | E1–E9, puertas de decisión, cronograma, 18 riesgos |
| `10_fuentes_y_evidencias.md` | 22 fuentes nuevas, registro de búsquedas, fuentes no accesibles |
| `11_recomendacion_final.md` | Decisión, alternativas, condiciones y acciones |

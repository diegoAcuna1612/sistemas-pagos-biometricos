# 13 — Iteración 2: matriz reevaluada y recomendación (P6)

**Fecha:** 05/11/2026. Base: `09_matriz_de_evaluacion.md` y `12_innovacion_y_diferenciacion_competitiva.md`.

## 1. Reglas (sin cambios)

Misma matriz y pesos (P 20% · D 20% · Dif 15% · A 15% · T 10% · R 10% · E 5% · N 5%). D ≤ 3 sin entrevistas.

## 2. Puntaje

Se compara con V3 genérica (65), la variante recomendada en la iteración 1. V5 (66) era la O11 ya descartada.

| Criterio | Peso | V3 Documento → sistema (it. 1) | **V6 Auditoría de gastos locales (it. 2)** | Cambio | Justificación |
|---|---:|---:|---:|---|---|
| P | 20% | 4 | 4 | = | Cobros no pactados documentados por gremios [N1, N3]; monto por contenedor no medido |
| D | 20% | 3? | 3? | = | Tope sin entrevistas; los casos internacionales [N8–N10] son indirectos |
| Dif | 15% | 2 | **4** | **+2** | Reglas peruanas (DL 1492) + pago por éxito + historial de resultados por naviera; sin competidor local o en español identificado. Mismo nivel que O1 |
| A | 15% | 3 | 3 | = | Importadores pymes alcanzables vía agentes de aduana y gremios; no listados |
| T | 10% | 3 | 3 | = | Extracción de liquidaciones variadas + reglas; mismo motor |
| R | 10% | 4 | **3** | −1 | El ingreso depende de que haya montos recuperables cada mes |
| E | 5% | 4 | **3** | −1 | Las reglas son peruanas; en otros países hay normas distintas |
| N | 5% | 4 | **3** | −1 | Disputas con terceros; riesgo de derogación de la norma [N4] |
| **Total** | | **65** | **67** | **+2** | |

## 3. Qué mejora y qué no

- **Mejora:**
  - Diferenciación (+2): por primera vez P6 tiene un proceso propio, distinto de O1, O3, O4 y O11.
- **Empeora:**
  - Recurrencia, expansión y normativo: el ingreso es variable, las reglas son locales y la norma está en disputa.
- **No cambia:**
  - Problema y acceso.
  - Demanda: sin entrevistas.
  - Viabilidad técnica.

## 4. Comparación con O1 (70) y O2 (71)

| Propuesta | Puntaje |
|---|---:|
| O2 | 71 |
| O1 | 70 |
| **P6-V6** | **67** |
| **O1 + P6-V6 como suite de comercio exterior** | **~72** (ver `../iteracion-2_01_integraciones_y_suite_distribuidoras.md` §3) |

Sola, P6-V6 queda debajo. **Su mayor valor es como segundo producto de O1**: mismo canal, mismo motor documental, otro problema del mismo cliente final.

## 5. Sensibilidad

| Escenario | Efecto |
|---|---|
| Con 20 liquidaciones reales: ≥ US$ 50 reclamables por contenedor en promedio y ≥ 30% de reclamos aceptados (D 3 → 4) | Sube a 71 |
| Se deroga el DL 1492 (Dif 4 → 3, N 3 → 2) | Baja a 63; quedan las reglas contractuales |
| Las navieras no reembolsan nunca (P 4 → 3) | Baja a 63 |

## 6. Viabilidad como TSP (actualizada)

| Criterio | It. 1 | It. 2 | Comentario |
|---|---|---|---|
| Problema concreto | Alto (si se elige un proceso) | **Alto** | Liquidaciones de gastos locales |
| Medición | Alta | **Alta** | Exactitud por concepto; detección de cobros no pactados sembrados; monto identificado |
| Datos sin cliente | Media | Media | Liquidaciones sintéticas basadas en tarifarios públicos [PI]; idealmente 20 reales anonimizadas |
| Originalidad | Media | **Alta** | Auditoría normativa de cobros logísticos: no se encontraron antecedentes peruanos |

**Objetivos específicos sugeridos:**
1. Modelar las reglas del DL 1492 y de la cotización frente a la factura como reglas verificables.
2. Extraer conceptos de liquidaciones. Criterio: exactitud ≥ 95% por concepto.
3. Detectar ≥ 90% de los cobros no pactados sembrados con ≤ 10% de falsas alarmas.
4. Generar el reclamo con trazabilidad a cada documento y regla.

## 7. Recomendación actualizada

**P6 deja de ser "solo tecnología" y gana un proceso propio.** Aun así, lo más sensato es tratarla como **módulo de O1** y no como negocio aparte.

**Validación de 2 semanas:**

| Día | Acción | Criterio de corte |
|---|---|---|
| 1–3 | Leer el DL 1492, su reglamento (DS 001-2021-MINCETUR) y confirmar su vigencia | **Derogado: descartar la base legal; mantener solo cotización frente a factura** |
| 2–8 | Conseguir 20 liquidaciones (2–3 importadores o un agente de aduana) | < 10 liquidaciones: el acceso falla |
| 5–9 | Revisarlas a mano con las reglas | **< US$ 30 reclamables por contenedor en promedio: descartar** |
| 8–10 | Enviar 5 reclamos de prueba con el importador | Medir respuesta a 30 días (fuera de las 2 semanas) |

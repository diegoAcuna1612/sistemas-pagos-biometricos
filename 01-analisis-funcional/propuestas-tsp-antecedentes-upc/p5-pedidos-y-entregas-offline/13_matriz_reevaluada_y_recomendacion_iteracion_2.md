# 13 — Iteración 2: matriz reevaluada y recomendación (P5)

**Fecha:** 05/11/2026. Base: `09_matriz_de_evaluacion.md` y `12_innovacion_y_diferenciacion_competitiva.md`.

## 1. Reglas (sin cambios)

Misma matriz y pesos (P 20% · D 20% · Dif 15% · A 15% · T 10% · R 10% · E 5% · N 5%). D ≤ 3 sin entrevistas.

## 2. Puntaje

| Criterio | Peso | V2 Reparto de pymes (it. 1) | **V6 GLP y agua (it. 2)** | Cambio | Justificación |
|---|---:|---:|---:|---|---|
| P | 20% | 4 | 4 | = | Mismo dolor diario ligado a dinero; se agrega la presión de precios de Facilito [N2], sin medirla |
| D | 20% | 3? | 3? | = | Tope sin entrevistas |
| Dif | 15% | 3 | 3 | = | Reposición anticipada + envases + cuadre. TrackMyVend ya controla garrafones en México [N1]: no sube a 4 |
| A | 15% | 3 | **4** | **+1** | Los locales de GLP autorizados son públicos y ubicables (Facilito, Registro de Hidrocarburos) [N2] |
| T | 10% | 4 | 4 | = | Predicción de intervalos simple; ingeniería conocida |
| R | 10% | 3 | 3 | = | Mensual; el abandono de micronegocios sigue siendo un riesgo |
| E | 5% | 4 | 4 | = | El reparto de envases retornables existe en toda la región |
| N | 5% | 4 | 4 | = | Datos de hogares (nombre, dirección, teléfono) manejables |
| **Total** | | **68** | **71** | **+3** | |

## 3. Qué mejora y qué no

- **Mejora:**
  - Acceso (+1). Es el único cambio, y está respaldado por un registro público.
- **No cambia:**
  - Problema.
  - Demanda: sin entrevistas.
  - Diferenciación: la idea es más fuerte, pero ya existe un competidor regional con control de envases.
  - Viabilidad técnica, recurrencia, expansión y normativo.

## 4. Comparación con O1 (70) y O2 (71)

| Propuesta | Puntaje |
|---|---:|
| **P5-V6** | **71** |
| O2 PedidoListo | 71 |
| O1 DAM Asistida | 70 |

**P5-V6 empata con O2 y supera a O1 por un punto**, dentro del margen de error. Es la mejor de las 8 propuestas en esta iteración.

## 5. Sensibilidad

| Escenario | Efecto |
|---|---|
| ≥ 25% de respuesta al mensaje anticipado en el Mago de Oz y 1 distribuidor paga (D 3 → 4) | Sube a 75 |
| Se aprueba la trazabilidad de compras y ventas del Minem (P 4 → 5) | Sube a 75 |
| TrackMyVend o similar entra a Perú (Dif 3 → 2) | Baja a 68 |
| Abandono alto de micro distribuidores (R 3 → 2) | Baja a 69 |

## 6. Viabilidad como TSP (actualizada)

| Criterio | It. 1 | It. 2 | Comentario |
|---|---|---|---|
| Complejidad | Alta | **Alta** | Sin conexión, idempotencia, conflictos, más predicción por hogar y libro de envases |
| Medición | Alta | **Muy alta** | 0 duplicados y 0 pérdidas; error del intervalo de reposición; **experimento con grupo de control** del mensaje anticipado (recompra a 30 días) |
| Datos sin cliente | Alta | Alta | Hogares simulados para el modelo; un distribuidor real solo para el experimento |
| Originalidad | Media | **Media-alta** | Combina sincronización probada con retención predictiva en un rubro regulado |

**Objetivos específicos sugeridos (complementan `11` §6):**
1. Sincronización idempotente: 0 duplicados en 1 000 reenvíos; 0 pérdidas con cortes simulados.
2. Modelo de intervalo de reposición. Criterio: error absoluto mediano ≤ 3 días en datos históricos.
3. Experimento de 4–6 semanas con un distribuidor: recompra del grupo que recibe el mensaje frente al grupo de control.
4. Libro de envases. Criterio: diferencia de envases contados frente al libro ≤ 2% al cierre de semana.

## 7. Recomendación actualizada

**P5-V6 es la mejor de las 8 propuestas** como negocio (71) y una de las mejores como TSP. Recomendación: **validar primero P5-V6**.

**Validación de 2 semanas:**

| Día | Acción | Criterio de corte |
|---|---|---|
| 1–2 | Listar 30 locales de GLP y 10 distribuidores de agua en 2–3 distritos (Facilito + recorrido) | — |
| 2–7 | 8 entrevistas a dueños (`08` §2.2) + preguntas sobre clientes perdidos, envases y Facilito | **< 4 de 8 reportan clientes que se van o envases perdidos: pasar a V1/O2** |
| 5–10 | Mago de Oz con 1 distribuidor: mensaje anticipado a 50 hogares con historial (manual, desde su WhatsApp) | **< 10% de respuesta: descartar la alternativa A**; ≥ 25%: piloto pagado |
| 8–10 | Confirmar el estado de la norma multimarca y de la propuesta de trazabilidad | Ajustar la alternativa B |

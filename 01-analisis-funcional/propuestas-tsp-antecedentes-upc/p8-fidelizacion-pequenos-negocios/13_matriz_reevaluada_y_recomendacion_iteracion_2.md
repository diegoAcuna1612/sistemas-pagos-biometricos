# 13 — Iteración 2: matriz reevaluada y recomendación (P8)

**Fecha:** 05/11/2026. Base: `09_matriz_de_evaluacion.md` y `12_innovacion_y_diferenciacion_competitiva.md`.

## 1. Reglas (sin cambios)

Misma matriz y pesos (P 20% · D 20% · Dif 15% · A 15% · T 10% · R 10% · E 5% · N 5%). D ≤ 3 sin entrevistas.

## 2. Puntaje

| Criterio | Peso | V4 Lealtad B2B (it. 1) | **V6 Multimarca financiada (it. 2)** | Cambio | Justificación |
|---|---:|---:|---:|---|---|
| P | 20% | 3 | **4** | +1 | Los fabricantes grandes invierten S/ 36 M+ al año en lealtad del bodeguero [N1] y concentran la venta en sus apps [N2]: la presión sobre la distribuidora independiente es verificable |
| D | 20% | 3? | 3? | = | Tope sin entrevistas; nadie pagó todavía por esta solución |
| Dif | 15% | 3 | 3 | = | Multimarca + libro de fondos + medición causal; BEES y YOM existen [N1–N3, N7]. No llega a 4 |
| A | 15% | 3 | 3 | = | Distribuidoras identificables; además hay que convencer a las marcas |
| T | 10% | 4 | **3** | −1 | Tres partes, libro de fondos auditable y experimentos: más complejo |
| R | 10% | 4 | 4 | = | Mensual por bodega activa + comisión por campaña |
| E | 5% | 4 | 4 | = | El canal tradicional es igual en la región |
| N | 5% | 4 | 4 | = | B2B; datos personales limitados |
| **Total** | | **66** | **68** | **+2** | |

## 3. Qué mejora y qué no

- **Mejora:**
  - Problema (+1): la urgencia ahora tiene respaldo público.
- **Empeora:**
  - Viabilidad técnica (−1).
- **No cambia:**
  - Demanda: sin entrevistas.
  - Diferenciación: hay competidores fuertes en el mismo trabajo, aunque para otro cliente.
  - Acceso.
  - Recurrencia, expansión y normativo.

## 4. Comparación con O1 (70) y O2 (71)

P8-V6 (68) queda a 2–3 puntos. **Sola es más débil que como módulo:** comparte cliente, datos y canal con O2, P5-V1 y P1-V6. La suite se evalúa en `../iteracion-2_01_integraciones_y_suite_distribuidoras.md`.

## 5. Sensibilidad

| Escenario | Efecto |
|---|---|
| 2 marcas representadas financian un piloto (D 3 → 4) | Sube a 72 |
| Un aliado financiero acepta la alternativa B (R 4 → 5) | +2 |
| BEES se abre a distribuidoras independientes multimarca (Dif 3 → 2) | Baja a 65 |

## 6. Viabilidad como TSP (actualizada)

| Criterio | It. 1 | It. 2 | Comentario |
|---|---|---|---|
| Originalidad | Riesgo (antecedente UPC parecido) | **Media-alta** | Libro de fondos multimarca + inferencia causal: distinto de "enviar campañas" |
| Medición | Alta | **Alta** | Efecto incremental con grupo de control; conciliación del libro de fondos |
| Datos sin cliente | Media | Media | Simulación de campañas con datos sintéticos de pedidos; piloto con una distribuidora |

## 7. Recomendación actualizada

**No desarrollar P8 sola.** Si se elige, como **módulo de la suite para distribuidoras**, después del módulo de pedidos.

**Validación de 2 semanas** (en paralelo con la de la suite):

| Día | Acción | Criterio de corte |
|---|---|---|
| 1–5 | 4 entrevistas con distribuidoras multimarca: ¿pierden bodegas frente a apps de fabricantes? | < 2 lo confirman: descartar |
| 5–10 | Preguntar a 2–3 marcas medianas representadas si financiarían una campaña medida | **0 marcas interesadas: descartar A**; quedarse con C (alerta de fuga) |

# 13 — Iteración 2: matriz reevaluada y recomendación (P1)

**Fecha:** 05/11/2026. Base: `09_matriz_de_evaluacion.md` (iteración 1) y `12_innovacion_y_diferenciacion_competitiva.md`.

## 1. Reglas (sin cambios)

- Misma matriz, mismos pesos: P 20% · D 20% · Dif 15% · A 15% · T 10% · R 10% · E 5% · N 5%. **Puntaje = Σ (puntaje × peso) × 20.**
- **Sin entrevistas, D no pasa de 3.** Ninguna búsqueda nueva aportó clientes pagando por esta solución en Perú, así que D sigue en 3.
- Un criterio solo cambia si hay una fuente o un mecanismo nuevo que lo justifique. Las bajas también se registran.

## 2. Puntaje: mejor variante de la iteración 1 frente a la nueva

| Criterio | Peso | V2 (it. 1) | **V7 (it. 2)** | Cambio | Justificación |
|---|---:|---:|---:|---|---|
| P — Problema | 20% | 4 | 4 | = | Es el mismo problema; no se midió su costo |
| D — Demanda y pago | 20% | 3? | 3? | = | Tope sin entrevistas; sin evidencia nueva de pago |
| Dif — Diferenciación | 15% | 2 | **3** | **+1** | Quita la barrera de datos (XML de SUNAT [N8]); Bsale no muestra reposición [N1]; catálogo compartido con efecto de red. No llega a 4: el pronóstico sigue siendo copiable |
| A — Acceso | 15% | 4 | 4 | = | Mismos comercios |
| T — Viabilidad técnica | 10% | 4 | **3** | **−1** | Emparejar descripciones de distintos proveedores y la calidad de las líneas de boleta son inciertos |
| R — Recurrencia | 10% | 3 | 3 | = | Ticket bajo y riesgo de abandono iguales |
| E — Expansión | 5% | 4 | 4 | = | Chile, Colombia y México también tienen factura electrónica; el método se adapta cambiando el formato [I] |
| N — Normativo | 5% | 4 | 4 | = | No usa la Clave SOL; datos comerciales |
| **Total** | | **68** | **69** | **+1** | |

## 3. Qué mejora y qué no

- **Mejora:** la diferenciación (+1). El cambio no es "mejor IA": es **otra fuente de datos**, que elimina la barrera de adopción.
- **Empeora:** la viabilidad técnica (−1). El riesgo pasa del modelo a los datos.
- **No cambia:**
  - Demanda: sigue sin entrevistas.
  - Recurrencia: el ticket sigue siendo bajo.
  - Acceso, expansión y normativo.

## 4. Comparación con O1 (70) y O2 (71)

| Propuesta | Puntaje | Lectura |
|---|---:|---|
| O2 PedidoListo | 71 | Sigue arriba |
| O1 DAM Asistida | 70 | Sigue arriba |
| **P1-V7** | **69** | A 1 punto de O1, dentro del margen de error |

## 5. Sensibilidad

| Escenario | Efecto |
|---|---|
| ≥ 80% de líneas de boleta identificables en 3 ferreterías (T 3 → 4) | Sube a 71 |
| La marca paga la sugerencia (alternativa C; R 3 → 4) | Sube a 71 |
| Ambos | Sube a 73 |
| La mayoría de líneas dice "VARIOS" (T 3 → 2, Dif 3 → 2) | Baja a 64: volver a V2 (POS) |
| Un ferretero paga el piloto (D 3 → 4) | +4 puntos |

## 6. Viabilidad como TSP (actualizada)

| Criterio | It. 1 | It. 2 | Comentario |
|---|---|---|---|
| Originalidad | Media | **Alta** | **Reconstruir inventario desde UBL 2.1** es un problema propio del contexto peruano y medible |
| Medición | Alta | **Alta** | Error del stock teórico frente al conteo físico + MASE/WAPE del pronóstico |
| Datos sin cliente | Alta | **Alta** | **XML sintéticos** generados desde un conjunto público de ventas (por ejemplo, Favorita [PI: licencia]) convertidos a UBL, con ruido controlado ("VARIOS", ventas sin comprobante) |
| Complejidad | Media-alta | **Alta** | Lectura de XML, emparejamiento de productos, series intermitentes, políticas de reposición |

**Objetivos específicos sugeridos (reemplazan o complementan los de `11` §7):**
1. Implementar la ingesta y el lector UBL 2.1. Criterio: 100% de XML válidos procesados.
2. Emparejar descripciones. Criterio: ≥ 90% de exactitud con un conjunto etiquetado y ≤ 1 confirmación humana por producto.
3. Reconstruir el stock. Criterio: error absoluto mediano ≤ 10% frente al conteo físico en productos clase A.
4. Comparar ≥ 4 métodos de pronóstico (criterios de `11` §7).
5. Medir con datos sintéticos el efecto de las líneas genéricas y de las ventas sin comprobante sobre el error.

## 7. Recomendación actualizada

**P1 mejora poco como negocio (+1) y bastante como TSP.** Si P1 sigue siendo la favorita, conviene hacer el TSP con la **variante V7**: es más original que el antecedente UPC y no depende de que el comercio tenga POS.

**Validación de 2 semanas (reemplaza a la de `11` §4):**

| Día | Acción | Criterio de corte |
|---|---|---|
| 1–3 | Pedir a 3–5 ferreterías los XML de un mes de compras y ventas | Si < 2 los entregan: el acceso es el problema → volver a V2 |
| 3–5 | Medir el % de líneas de boleta identificables | **< 60%: descartar V7** y volver a V2 (POS) |
| 5–8 | Emparejar y reconstruir el stock; contar 30 productos físicamente | Error mediano > 25%: replantear |
| 6–10 | 8 entrevistas (`08` §2.3) + preguntar si aceptarían que la marca vea la sugerencia de sus productos | Si ≥ 4 aceptan: probar la alternativa C |

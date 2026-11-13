# 11 — Recomendación final

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Decisión

**Investigar primero V4 — Lealtad B2B: la distribuidora premia a sus bodegas. VALIDAR ANTES DE DESARROLLAR.**

**Plan B: V2 — Sellos digitales y campañas para cafeterías y restaurantes**, sin app y con grupo de control.

**Respuesta honesta:** el programa de puntos para pequeños negocios, tal como está planteado, **ya existe gratis** [S5] y el antecedente UPC 2023 ya demostró campañas por WhatsApp en MYPE de alimentos [S1]. P8 solo es viable si cambia de cliente (la distribuidora) o si su aporte es la **medición causal** del efecto de las campañas.

## 2. Por qué V4

| Criterio | Puntos para comercios (V1/V2) | V4 |
|---|---|---|
| Competidor gratuito | Sí (Loyverse) | No identificado |
| Datos | Hay que registrarlos | Ya existen (pedidos por bodega) |
| Ticket | Bajo | Medio-alto |
| Datos personales | Consumidores | Negocios |
| Sinergia | — | Mismo cliente que P1-V6, P5-V1 y O2 |

## 3. Las 10 respuestas

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | Producto | Programa de lealtad B2B: puntos y metas por compras, alerta de bodegas en caída, campañas con grupo de control |
| 2 | Cliente | Distribuidoras medianas del canal tradicional |
| 3 | Problema | Pérdida silenciosa de bodegas [H] |
| 4 | Referencia | Kangaroo, TapMango (B2C) [S6]; programas de marcas para bodegas [PI] |
| 5 | Diferenciador | Diseñado para el proveedor; efecto medido contra control |
| 6 | Cobro | Por bodega activa con mínimo [H] |
| 7 | MVP | `06` §3 |
| 8 | Primeros entrevistados | Jefes comerciales de distribuidoras; preventistas; bodegueros |
| 9 | Validar en 2 semanas | Tasa de pérdida de bodegas y existencia de programas de marcas |
| 10 | Continuar / pivotar / descartar | `08` §2.5 |

## 4. Plan de dos semanas

| Día | Acción | Salida |
|---|---|---|
| 1–3 | Resolver P1 de `10` (programas de marcas) | ¿Hay espacio? |
| 2–8 | 9 entrevistas | Pérdida de bodegas; retención actual |
| 8–10 | Conseguir el historial de una ruta | Segmentación de prueba |
| 10 | Decisión | V4, alerta sin puntos o V2 |

## 5. Riesgos

| Riesgo | Qué se hace |
|---|---|
| Parecido con el antecedente UPC | Formular el aporte como B2B + medición causal |
| Costo de premios mayor al beneficio | Simular antes del piloto; metas escalonadas |
| Las marcas ya cubren a las bodegas | Pivotar a alerta de caída sin puntos |

## 6. Relación con el proyecto académico (TSP UPC)

- **Encaje: medio-alto**, condicionado a diferenciarse del antecedente [S1], que ya reporta +8% de fidelización con campañas.
- **Aporte propuesto:** pasar de "enviar campañas" a **medir su efecto causal** (asignación aleatoria, grupo de control, intervalos de confianza) y a **predecir el abandono**.
- **Objetivos específicos sugeridos:**
  1. Caracterizar la retención de bodegas en ≥ 2 distribuidoras.
  2. Implementar el libro de puntos auditable; criterio: saldo = suma de movimientos en el 100% de las pruebas.
  3. Construir el modelo de abandono; criterio: AUC ≥ 0,70 con datos históricos.
  4. Ejecutar un experimento con grupo de control; reportar la diferencia de recompra con intervalo de confianza.
  5. Reducir ≥ 50% el tiempo de preparación de campañas frente al proceso manual.
- **Riesgo institucional [S10]:** confirmar modalidad TSP con la UPC.

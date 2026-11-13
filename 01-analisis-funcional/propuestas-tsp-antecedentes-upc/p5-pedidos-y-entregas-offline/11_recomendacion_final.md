# 11 — Recomendación final

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Decisión

**Investigar primero V2 — Reparto recurrente de pymes con cobro contra entrega. VALIDAR ANTES DE DESARROLLAR.**

**Plan B: V1 — Preventa sin conexión para distribuidoras**, combinable con O2 PedidoListo.

**Respuesta honesta:** P5 es de las propuestas **más equilibradas** (68): buen problema, buena ingeniería y un nicho sin competidor identificado. Pero la falta de competidor tiene confianza baja, y el cliente (pyme informal) paga poco y abandona fácil.

## 2. Por qué V2 y no V1, si empatan

| Criterio | V2 | V1 |
|---|---|---|
| Diferenciación | **3:** cuadre de cobros, recurrentes, sin conexión | 2: compite con Softland, Yalo y SFA |
| Integración con ERP | No necesaria | Necesaria |
| Acceso | Medio | **Alto** |
| Ticket | Bajo | Medio |

Igual que en la investigación de oportunidades (`../../oportunidades-saas-ia-cloud-peru/11` §2), se prioriza la **posición competitiva** sobre el acceso.

## 3. Las 10 respuestas

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | Producto | Bandeja de pedidos + app del repartidor sin conexión + cuadre automático de cobros |
| 2 | Cliente | Pymes con 2–10 repartidores (agua, gas, panaderías, lácteos, abarrotes) |
| 3 | Problema | Pedidos en cuaderno, olvidos, diferencias de caja [H] |
| 4 | Referencia | SimpliRoute, DispatchTrack para empresas mayores [S1, S2] |
| 5 | Diferenciador | Cuadre auditable y pedidos recurrentes a precio de pyme |
| 6 | Cobro | S/ 59–149 al mes [H] |
| 7 | MVP | `06` §4 |
| 8 | Primeros entrevistados | Distribuidoras de agua y gas, panaderías con reparto |
| 9 | Validar en 2 semanas | Frecuencia y monto de diferencias de caja y olvidos |
| 10 | Continuar / pivotar / descartar | `08` §2.5 |

## 4. Plan de dos semanas

| Día | Acción | Salida |
|---|---|---|
| 1–2 | Lista de 20 negocios; resolver P2 de `10` | Materiales; competidores |
| 3–8 | 8 entrevistas; 1 observación de cuadre | Tiempos y diferencias |
| 8–10 | Acordar un Mago de Oz | Piloto |
| 10 | Decisión | V2, V1 u O2 |

## 5. Riesgos

| Riesgo | Qué se hace |
|---|---|
| Existe una app popular que no se detectó | Resolver P2 antes de entrevistar |
| Repartidores no usan la app | Diseño de 3 toques por entrega; capacitación en el piloto |
| Abandono de micro clientes | Canal a través de proveedores (embotelladoras, gas) |

## 6. Relación con el proyecto académico (TSP UPC)

- **Encaje: alto.** Es la propuesta con el núcleo técnico más claro y verificable sin depender del cliente.
- **Antecedente:** "aplicación móvil para optimizar ventas del canal tradicional (2023)" **no confirmado** [PI]. P5 se diferencia por la sincronización sin pérdidas probada y el cuadre de cobros.
- **Reutiliza** el diseño sin conexión e idempotente de la investigación de pagos biométricos (`../../sistema-pagos-biometricos-cerrado/`).
- **Objetivos específicos sugeridos:**
  1. Caracterizar el proceso de pedido, reparto y cuadre en ≥ 3 pymes.
  2. Implementar la sincronización idempotente; criterio: 0 duplicados en 1 000 reenvíos y 0 pérdidas con cortes simulados.
  3. Implementar las reglas de conflicto y probarlas con escenarios automatizados.
  4. Medir tiempo de registro por entrega (mediana, p95) y tiempo de cuadre frente al papel.
  5. Evaluar la usabilidad con repartidores (SUS ≥ 70).
- **Riesgo institucional [S10]:** confirmar modalidad TSP con la UPC.

# 09 — Matriz de evaluación

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Método

Misma matriz de `../../oportunidades-saas-ia-cloud-peru/09_matriz_de_evaluacion.md` (P 20%, D 20%, Dif 15%, A 15%, T 10%, R 10%, E 5%, N 5%). **Puntaje = Σ (puntaje × peso) × 20.** Sin entrevistas, D ≤ 3. Dif ≤ 1 excluye.

## 2. Puntuaciones

| # | ID | Variante | P | D | Dif | A | T | R | E | N | **Total** | Confianza |
|---|---|---|---|---|---|---|---|---|---|---|---:|---|
| 1 | V2 | Reparto de pymes con cobro | 4 | 3? | 3 | 3 | 4 | 3 | 4 | 4 | **68** | Baja |
| 2 | V1 | Preventa sin conexión | 4 | 3? | 2 | 4 | 3 | 4 | 4 | 4 | **68** | Baja-media |
| — | V4 | Pedidos de bodegas | 3 | 3 | **1** | 4 | 3 | 3 | 4 | 4 | 59 (excluida) | Media |
| — | V3 | Última milla | 3 | 3 | **1** | 3 | 3 | 4 | 4 | 4 | 58 (excluida) | Media |
| — | V5 | Delivery de restaurantes | 3 | 3 | **1** | 3 | 4 | 3 | 3 | 4 | 57 (excluida) | Media |

## 3. Fundamento (V2)

| Criterio | Puntaje | Fundamento |
|---|---|---|
| P | 4 | Diario y ligado a dinero (cuadre) [H]; no medido |
| D | 3? | Indirecta: las empresas medianas pagan ruteo [S1, S2]; sin evidencia en pymes |
| Dif | 3 | Cuadre + recurrentes + sin conexión a precio de pyme; ningún competidor identificado en ese segmento |
| A | 3 | Negocios visibles; dueños ocupados y desconfiados [I] |
| T | 4 | Ingeniería conocida |
| R | 3 | Mensual, pero abandono probable en micro negocios |
| E | 4 | Igual en la región |
| N | 4 | Datos de clientes y ubicación manejables |

## 4. Sensibilidad

| Escenario | Efecto |
|---|---|
| Un dueño paga el piloto (V2 D 3 → 4) | V2 sube a **72** |
| Se encuentra una app de reparto para pymes popular en Perú (V2 Dif 3 → 2) | V2 baja a 65; V1 queda primera |
| Softland abre Pedidos IA a otros ERP (V1 Dif 2 → 1) | V1 **excluida** |

## 5. Comparación

P5 (68) queda **cerca de O1 (70) y O2 (71)**. V1 es prácticamente la versión móvil de O2.

## 6. Viabilidad como TSP

| Criterio | Valoración | Comentario |
|---|---|---|
| Problema concreto | Alto | Reparto y cobro de un tipo de pyme |
| Complejidad | **Alta** | Sin conexión, idempotencia, conflictos, multiempresa |
| Medición | **Alta** | 0 duplicados, 0 pérdidas, tiempos, diferencias de caja |
| Datos sin cliente | Alta | Simulación de cortes y cargas |
| Originalidad | Media | Las apps de pedidos son comunes; el aporte es la sincronización probada y el cuadre |
| Riesgo | Bajo | |

# 09 — Matriz de evaluación

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Método

Misma matriz de `../../oportunidades-saas-ia-cloud-peru/09_matriz_de_evaluacion.md` (pesos P 20%, D 20%, Dif 15%, A 15%, T 10%, R 10%, E 5%, N 5%). **Puntaje = Σ (puntaje × peso) × 20.** Sin entrevistas, D ≤ 3. Dif ≤ 1 excluye.

## 2. Puntuaciones

| # | ID | Variante | P | D | Dif | A | T | R | E | N | **Total** | Confianza |
|---|---|---|---|---|---|---|---|---|---|---|---:|---|
| 1 | V3 | Evidencias y certificación | 4 | 3? | 2 | 3 | 4 | 3 | 3 | 3 | **63** | Baja |
| 2 | V2 | Casos de API con IA | 3 | 3? | 2 | 3 | 3 | 4 | 5 | 4 | **62** | Baja |
| 3 | V4 | Facturación electrónica | 3 | 2? | 3 | 3 | 4 | 3 | 2 | 4 | **58** | Baja |
| — | V1 | Plataforma genérica | 3 | 3 | **1** | 3 | 4 | 4 | 5 | 5 | 62 (excluida) | Media |
| — | V5 | QA como servicio | 3 | 3 | **1** | 4 | 4 | 4 | 3 | 4 | 62 (excluida) | Media |

## 3. Fundamento (V3)

| Criterio | Puntaje | Fundamento |
|---|---|---|
| P | 4 | Cada versión exige evidencias; el antecedente apunta a reducir tiempos de certificación [S1]. No es 5: no se midió |
| D | 3? | Indirecta: los bancos pagan consultoras de QA [S2, S3]; no hay evidencia de pago por esta herramienta |
| Dif | 2 | Xray/TestRail cubren la trazabilidad; el diferenciador (plantilla local, instalable, varios frameworks) es copiable |
| A | 3 | QA accesible por LinkedIn; compradores en banca, difíciles |
| T | 4 | Parsers y plantillas: ingeniería conocida |
| R | 3 | Recurrente por equipo; pocos clientes grandes |
| E | 3 | El formato de evidencia es local; la necesidad no |
| N | 3 | Datos de prueba sensibles; exige instalación en el cliente o enmascarado |

## 4. Sensibilidad

| Escenario | Efecto |
|---|---|
| Una consultora firma piloto pagado (V3 D 3 → 4) | V3 sube a 67 |
| Xray/TestRail resuelven la plantilla local (V3 Dif 2 → 1) | V3 excluida; P2 queda sin variante defendible como producto |
| Se permite SaaS con datos enmascarados (V3 N 3 → 4) | V3 sube a 64 |

## 5. Comparación con la investigación de oportunidades

P2 (63) queda **por debajo de O1 (70) y O2 (71)**: diferenciación baja y compradores difíciles.

## 6. Viabilidad como TSP

| Criterio | Valoración | Comentario |
|---|---|---|
| Problema concreto | Medio-alto | La certificación de versiones |
| Complejidad de ingeniería | Media-alta | Orquestación, parsers, trazabilidad, generación documental, IA |
| Medición objetiva | **Alta** | Tiempos, cobertura, defectos, aceptación de casos IA |
| Datos sin cliente | Media | Aplicación de ejemplo (por ejemplo, un sistema de demostración propio) |
| Novedad frente al antecedente | **Riesgo:** el antecedente UPC 2023 es casi el mismo tema [S1] | Hay que diferenciarse (V3 o V2) |
| Riesgo de ejecución | Bajo |

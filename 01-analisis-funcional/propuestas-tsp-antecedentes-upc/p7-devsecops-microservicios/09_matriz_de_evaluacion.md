# 09 — Matriz de evaluación

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Método

Misma matriz de `../../oportunidades-saas-ia-cloud-peru/09_matriz_de_evaluacion.md` (P 20%, D 20%, Dif 15%, A 15%, T 10%, R 10%, E 5%, N 5%). **Puntaje = Σ (puntaje × peso) × 20.** Sin entrevistas, D ≤ 3. Dif ≤ 1 excluye.

## 2. Puntuaciones

| # | ID | Variante | P | D | Dif | A | T | R | E | N | **Total** | Confianza |
|---|---|---|---|---|---|---|---|---|---|---|---:|---|
| 1 | V3 | Evidencias de cumplimiento | 3 | 3? | 3 | 2 | 3 | 4 | 3 | 3 | **59** | Baja |
| 2 | V2 | Plantillas para pymes | 3 | 2? | 2 | 3 | 4 | 3 | 4 | 4 | **57** | Baja |
| 3 | V5 | Laboratorio educativo | 2 | 2 | 2 | 3 | 4 | 3 | 4 | 5 | **54** | Baja |
| 4 | V4 | SBOM para el Estado | 2 | 2 | 2 | 2 | 4 | 3 | 4 | 4 | **50** | Baja |
| — | V1 | Plataforma SaaS | 3 | 3 | **1** | 2 | 2 | 4 | 5 | 4 | 54 (excluida) | Media |

## 3. Fundamento (V3)

| Criterio | Puntaje | Fundamento |
|---|---|---|
| P | 3 | Auditorías periódicas; costo no medido [H] |
| D | 3? | Se pagan auditorías y certificaciones [I]; sin evidencia de pago por esta herramienta |
| Dif | 3 | Mapeo a controles locales; sin competidor local identificado |
| A | 2 | Entidades reguladas: acceso difícil |
| T | 3 | Conectores a varias plataformas |
| R | 4 | Suscripción |
| E | 3 | Normas distintas por país |
| N | 3 | Datos de seguridad sensibles del cliente |

## 4. Sensibilidad

| Escenario | Efecto |
|---|---|
| La norma SBS exige evidencias del ciclo de desarrollo (P 3 → 4) | V3 sube a 63 |
| La norma no lo exige (P 3 → 2, D 3 → 2) | V3 baja a 51 |

## 5. Comparación

P7 (59) es **la propuesta con menor puntaje comercial** de las 8, lejos de O1 (70) y O2 (71).

## 6. Viabilidad como TSP

| Criterio | Valoración | Comentario |
|---|---|---|
| Problema concreto | Medio | Depende del sistema objeto |
| Complejidad | **Alta** | Kubernetes, CI/CD, seguridad, GitOps, observabilidad |
| Medición | **Alta** | Métricas DORA y vulnerabilidades sembradas |
| Datos sin cliente | Media | Aplicación de referencia o propia |
| Originalidad | Media-baja | Tema común en la industria; el aporte es la medición antes/después y la capa de evidencias |
| Riesgo | Medio | Alcance excesivo; acceso a un sistema real |

# 00 — Resumen ejecutivo: P4 Aplicación de aprendizaje personalizado

**Fecha:** 05/11/2026.
**Propuesta evaluada:** app móvil que organice sesiones de estudio y adapte las preguntas según el rendimiento del estudiante, con repetición espaciada y evaluación del progreso. Medición: retención, rendimiento antes/después y tiempo de estudio.
**Estructura:** la de `../../oportunidades-saas-ia-cloud-peru/` (00 a 11), adaptada a una propuesta con **variantes**.
**Fuentes y etiquetas:** `10_fuentes_y_evidencias.md`.

## Veredicto

| Dimensión | Resultado |
|---|---|
| **Viabilidad como producto** | **Baja como app genérica** (Anki es gratuito y de código abierto; Quizlet y otros dominan [PI]). **Media como plataforma para academias** que convierte su material en práctica adaptativa |
| **Viabilidad como TSP** | **Alta en medición, media en ejecución:** el efecto de la repetición espaciada se puede medir con rigor, pero medir retención exige semanas y voluntarios con consentimiento |
| **Mejor variante** | **V3 — Práctica adaptativa para academias y docentes**, con generación de preguntas desde su propio material (64/100) |
| **Decisión** | **Validar antes de desarrollar.** Para el TSP, el caso ENAM (V2) es el más fácil de experimentar con estudiantes de medicina |

## Los hallazgos que más pesan

1. **El ENAM es un examen de alto valor y formato estable:** 180 preguntas de opción múltiple en 3 horas, sin puntaje negativo, requisito para postular al residentado; el banco de preguntas es de ASPEFAM [S1, S2]. Hay motivación para practicar.
2. **Para el ENAM ya hay oferta:** DrQuiz (gratis, bancos de ENAM y residentado) [S3] y AMBOSS (más de 10 000 preguntas con casos clínicos y página para el ENAM) [S4]. Las academias locales no se verificaron [PI].
3. **El costo real no es el software, es el contenido:** preguntas médicas correctas requieren expertos. La IA abarata la **generación desde material propio**, pero la revisión sigue siendo humana [I].
4. **Las academias ya tienen el contenido y los alumnos.** Una plataforma B2B les da práctica adaptativa sin que el producto tenga que escribir preguntas [I].
5. **El antecedente citado no se encontró** ("aplicación híbrida para sesiones de estudio de Medicina, UPC 2023") [PI].

## Ranking de variantes

| # | ID | Variante | Puntaje |
|---|---|---|---:|
| 1 | V3 | Plataforma B2B para academias y docentes | **64** |
| 2 | V4 | Microaprendizaje para capacitación corporativa | 63 |
| 3 | V2 | Preparación ENAM / residentado (B2C) | 62 |
| 4 | V5 | Colegios (escolar) | 56 |
| — | V1 | App genérica de tarjetas | (**excluida:** diferenciación 1) |

## Índice

`01` variantes · `02` competencia · `03` problema · `04` fichas · `05` finalistas · `06` arquitectura · `07` negocio · `08` validación · `09` matriz · `10` fuentes · `11` recomendación y TSP.

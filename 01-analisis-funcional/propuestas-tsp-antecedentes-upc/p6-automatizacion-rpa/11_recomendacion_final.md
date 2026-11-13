# 11 — Recomendación final

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Decisión

**No construir una plataforma RPA.** Si se elige P6, **aplicarla a un proceso vertical con IA documental (V3)**. El vertical con mejor posición es el de **aduanas (O1)**.

**Respuesta honesta:** P6 no es una oportunidad nueva, sino **la tecnología de varias oportunidades ya analizadas**. Como plataforma genérica no es viable (57, excluida). Como automatización vertical vale lo que valga el vertical: hasta ~70 si es O1.

## 2. Por qué V3 y no V5, si V5 puntúa un punto más (66 vs 65)

| Criterio | V3 | V5 |
|---|---|---|
| Coincide con la descripción de la propuesta | **Sí** (archivos, extracción, validación, reportes, trazabilidad) | Parcialmente |
| Diferenciación con vertical | Hasta 4 (O1) | 2 (igual que O11) |
| Precedente en la investigación de oportunidades | O1 recomendada | O11 descartada |

La diferencia de un punto está dentro del margen de error.

## 3. Las 10 respuestas

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | Producto | Automatización documental vertical: ingreso → extracción IA → validaciones → excepciones → carga al sistema → trazabilidad |
| 2 | Cliente | El del vertical elegido (recomendado: agencias de aduana) |
| 3 | Problema | Transcripción manual de documentos sin estructura |
| 4 | Referencia | Expedock, Raft, Rossum; Rocketbot como RPA local [S1–S4] |
| 5 | Diferenciador | Reglas del vertical + trazabilidad completa |
| 6 | Cobro | Por documento con mínimo mensual |
| 7 | MVP | `06` §3 |
| 8 | Primeros entrevistados | Los del plan de O1 |
| 9 | Validar en 2 semanas | El plan de O1 + preguntas de `08` §2.2 |
| 10 | Continuar / pivotar / descartar | `08` §2.3 |

## 4. Plan de dos semanas

Ejecutar el plan de O1 (`../../oportunidades-saas-ia-cloud-peru/11` §4) agregando las preguntas sobre bots existentes y trazabilidad.

## 5. Riesgos

| Riesgo | Qué se hace |
|---|---|
| Duplicar esfuerzo con O1 | Tratar P6 como la arquitectura de O1, no como proyecto aparte |
| Bot de pantalla frágil | Importación de archivo como vía principal |
| Antecedentes RPA en la UPC | Diferenciarse por la IA documental y la medición por campo |

## 6. Relación con el proyecto académico (TSP UPC)

- **Encaje: alto**, sobre todo si el autor trabaja en un área con procesos documentales (encaja con un TSP de experiencia profesional).
- **Antecedente:** "Automatización de procesos internos mediante RPA (2023)" no confirmado; hay dos trabajos UPC 2023 cercanos [S5, S6].
- **Objetivos específicos sugeridos:**
  1. Caracterizar el proceso documental elegido (tiempos, errores) en ≥ 3 empresas o áreas.
  2. Implementar el orquestador con trazabilidad completa; criterio: 100% de tareas con rastro auditable.
  3. Extraer cabecera e ítems; criterio: exactitud ≥ 95% en campos críticos con un conjunto etiquetado.
  4. Lograr ≥ 50% de documentos sin intervención humana.
  5. Reducir ≥ 50% los minutos por documento frente al proceso manual.
- **Riesgo institucional [S8]:** confirmar modalidad TSP con la UPC.

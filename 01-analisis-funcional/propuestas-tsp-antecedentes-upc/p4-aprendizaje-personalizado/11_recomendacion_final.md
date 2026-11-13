# 11 — Recomendación final

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Decisión

**No desarrollar una app de estudio genérica.** Si se elige P4: **V3 (plataforma para academias y docentes) como producto** y **V2 (ENAM) como caso de estudio del TSP**.

**Respuesta honesta:** como producto, P4 tiene viabilidad **baja-media** (64): Anki es gratuito, DrQuiz es gratuito para el ENAM y el contenido es caro. Como TSP es **interesante y medible**, pero depende de voluntarios y de un experimento de al menos 4 semanas.

## 2. Por qué V3 + V2

| Criterio | App B2C genérica | V3 (negocio) + V2 (TSP) |
|---|---|---|
| Contenido | Lo tiene que crear el producto | Lo aporta la academia; en el TSP, un tema acotado |
| Competencia | Gratuita | Herramientas sin espaciado ni generación |
| Experimento | Difícil de controlar | Estudiantes de medicina accesibles |

## 3. Las 10 respuestas

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | Producto | Plataforma donde el docente convierte su material en preguntas (IA + aprobación) y el alumno practica con repetición espaciada en una app sin conexión |
| 2 | Cliente | Academias de preparación y docentes; en el TSP, estudiantes de medicina |
| 3 | Problema | Práctica personalizada sin multiplicar el trabajo docente [H] |
| 4 | Referencia | AMBOSS [S4], Anki [PI] |
| 5 | Diferenciador | Preguntas desde material propio con trazabilidad a la fuente; analítica por tema |
| 6 | Cobro | Por alumno activo con mínimo por academia [H] |
| 7 | MVP | `06` §3 |
| 8 | Primeros entrevistados | Coordinadores de academias; docentes; internos de medicina |
| 9 | Validar en 2 semanas | Aprobación docente de preguntas IA; interés de 2 academias |
| 10 | Continuar / pivotar / descartar | `08` §2.4 |

## 4. Plan de dos semanas

| Día | Acción | Salida |
|---|---|---|
| 1–2 | Consultar a la UPC sobre ética (P4 de `10`) | Plazo y requisitos |
| 2–8 | 8 entrevistas (academias y estudiantes) | Hábitos, herramientas, pagos |
| 5–10 | Generar 30 preguntas de un capítulo real; revisión de un docente | % aprobado, minutos por pregunta |
| 10 | Decisión | V3, V4 o descarte comercial |

## 5. Riesgos

| Riesgo | Qué se hace |
|---|---|
| Preguntas médicas incorrectas | Revisión de un docente médico como asesor |
| El experimento no alcanza la duración | Empezarlo en la semana 5, en paralelo al desarrollo |
| Ética no aprobada a tiempo | Tema no médico con adultos y riesgo mínimo como plan B |

## 6. Relación con el proyecto académico (TSP UPC)

- **Encaje: alto en medición, medio en ejecución.**
- **Antecedente:** "aplicación híbrida para sesiones de estudio de Medicina (2023)" **no encontrado** [PI]. Si existe, P4 se diferencia con la generación de preguntas desde material propio y el experimento controlado de retención.
- **Preguntas de investigación sugeridas:**
  - PI1: ¿La repetición espaciada adaptativa mejora la retención a 28 días frente a la práctica masiva con el mismo tiempo de estudio?
  - PI2: ¿Qué proporción de preguntas generadas con IA aprueba un docente sin cambios mayores?
- **Objetivos específicos sugeridos:**
  1. Implementar la app sin conexión con sincronización sin pérdidas (0 intentos perdidos en pruebas con cortes de red).
  2. Implementar y comparar SM-2 y FSRS.
  3. Generar preguntas con trazabilidad a la fuente; criterio: ≥ 70% aprobadas.
  4. Ejecutar el experimento con 30+ voluntarios; reportar retención con intervalos de confianza.
  5. Evaluar la usabilidad (SUS ≥ 70).
- **Riesgo institucional [S5]:** confirmar modalidad TSP y comité de ética.

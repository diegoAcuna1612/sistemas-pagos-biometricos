# 11 — Recomendación final

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Decisión

**No desarrollar P7 como producto.** Elegirla solo como **TSP de implementación**, idealmente sobre un sistema real del trabajo del autor. La única variante con forma de producto (V3, evidencias de cumplimiento) depende de una norma no verificada [PI].

**Respuesta honesta:** P7 tiene la **viabilidad comercial más baja** de las 8 propuestas (59). Su fortaleza es técnica: demuestra dominio de cloud, seguridad y automatización, y se mide con métricas estándar (DORA).

## 2. Cuándo sí elegir P7

| Condición | ¿Se cumple? |
|---|---|
| El autor trabaja en DevOps, desarrollo o infraestructura y puede implementarlo en su empresa | A confirmar |
| La UPC acepta un TSP de implementación técnica sin componente de producto | A confirmar [S9] |
| Hay un sistema de microservicios con despliegues frecuentes para medir antes/después | A confirmar |

Si las tres se cumplen, P7 es un **TSP fuerte**. Si no, conviene otra propuesta.

## 3. Las 10 respuestas

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | Producto | Como TSP: pipeline DevSecOps completo con política como código, GitOps, observabilidad y registro de evidencias. Como producto: capa de evidencias de cumplimiento (V3), condicionada |
| 2 | Cliente | El equipo del autor; para V3, fintechs y proveedores de entidades supervisadas |
| 3 | Problema | Despliegues lentos o riesgosos; vulnerabilidades tardías; evidencias de auditoría manuales [H] |
| 4 | Referencia | GitHub Advanced Security, GitLab Ultimate; herramientas libres [I] |
| 5 | Diferenciador | Ninguno como producto; en el TSP, la medición antes/después |
| 6 | Cobro | No aplica (V3: suscripción, condicionada) |
| 7 | MVP | `06` §4 |
| 8 | Primeros entrevistados | Para el TSP, el equipo donde se implementa |
| 9 | Validar en 2 semanas | Norma SBS (V3); sistema objeto y modalidad UPC (TSP) |
| 10 | Continuar / pivotar / descartar | `08` §2.4 y §3 |

## 4. Plan de dos semanas

| Día | Acción | Salida |
|---|---|---|
| 1–3 | Leer la norma SBS (P1 de `10`) | ¿V3 tiene base? |
| 1–5 | Consultar a la UPC sobre la modalidad | Sí / no |
| 3–10 | Elegir el sistema objeto y empezar la línea base | Métricas "antes" |

## 5. Riesgos

| Riesgo | Qué se hace |
|---|---|
| Alcance excesivo | Una herramienta por etapa; congelar alcance en la semana 4 |
| Sin sistema real | Aplicación de referencia con vulnerabilidades sembradas |
| Jurado ve "solo integración de herramientas" | Formular preguntas de investigación con métricas DORA y comparar antes/después |

## 6. Relación con el proyecto académico (TSP UPC)

- **Encaje: alto si es TSP de experiencia profesional en DevOps; medio si es un proyecto independiente.**
- **Antecedente:** "Implementación de DevSecOps en arquitectura de microservicios (2023)" no encontrado [PI].
- **Preguntas de investigación sugeridas:**
  - PI1: ¿El pipeline reduce el tiempo de entrega de cambios y la tasa de fallas de cambio frente a la línea base?
  - PI2: ¿Qué proporción de vulnerabilidades sembradas se detecta antes de producción, por tipo de análisis (SAST, SCA, DAST)?
- **Objetivos específicos sugeridos:**
  1. Medir la línea base (4 métricas DORA) durante ≥ 2 semanas.
  2. Implementar CI con SAST, SCA, escaneo de imágenes y SBOM.
  3. Implementar CD con GitOps, DAST y reversión automática.
  4. Detectar ≥ 90% de las vulnerabilidades sembradas antes de producción.
  5. Reducir ≥ 50% el tiempo de entrega de cambios y el MTTR frente a la línea base.

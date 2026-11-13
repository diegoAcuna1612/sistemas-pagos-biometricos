# 11 — Recomendación final

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Decisión

**No desarrollar una "plataforma de pruebas" genérica.** Si se elige P2, **validar V3 — Evidencias y certificación automática**, con **V2 (casos de API con IA)** como módulo.

**Respuesta honesta:** como producto, P2 tiene viabilidad **baja-media** (63): el mercado de herramientas está cubierto y el comprador (banca) es difícil. Como TSP, es **viable y técnicamente rico**, pero el antecedente UPC 2023 es casi el mismo tema [S1]: el jurado preguntará qué hay de nuevo.

## 2. Por qué V3

| Criterio | Plataforma genérica (V1) | V3 |
|---|---|---|
| Diferenciación | 1 | 2 (plantilla local, instalable, varios frameworks) |
| Relación con el antecedente | Repite | Continúa: del "ejecutar más rápido" al "certificar más rápido" |
| Encaje con el mercado laboral | Compite con herramientas que el equipo ya usa | Las aprovecha |

## 3. Las 10 respuestas

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | Producto | Capa de certificación que consume resultados de Selenium/Playwright/Karate/Newman y genera evidencias, trazabilidad y el informe de certificación |
| 2 | Cliente | Consultoras de QA que atienden banca; después, equipos internos de bancos |
| 3 | Problema | Documentar a mano cada versión [H] |
| 4 | Referencia | Xray, TestRail [PI]; Katalon, mabl para la parte de IA [S4, S5] |
| 5 | Diferenciador | No cambia el framework; plantilla del cliente; instalación local |
| 6 | Cobro | Por equipo (nube) o licencia anual (instalado) [H] |
| 7 | MVP | `06` §3 |
| 8 | Primeros entrevistados | QA de banca y consultoras vía LinkedIn; autores de tesis similares |
| 9 | Validar en 2 semanas | Horas de documentación reales y si las plantillas pueden automatizarse |
| 10 | Continuar / pivotar / descartar | `08` §2.7 |

## 4. Plan de dos semanas

| Día | Acción | Salida |
|---|---|---|
| 1–3 | Resolver P1 (Xray/TestRail) y P2 (norma SBS) | Hay o no hay espacio |
| 2–8 | 8 entrevistas | Horas de documentación por versión |
| 6–10 | 2 plantillas reales; script prototipo | Tiempo antes/después |
| 10 | Decisión | Continuar, pivotar a V2 o descartar como producto |

## 5. Descartadas

| ID | Motivo |
|---|---|
| V1 | Herramientas libres y comerciales cubren todo |
| V5 | Es una consultora, no un producto |
| V4 | Mercado pequeño; se puede incluir como caso de prueba de demostración |

## 6. Riesgos

| Riesgo | Qué se hace |
|---|---|
| Parecido con el antecedente UPC | Formular el aporte como certificación + IA, con comparación explícita |
| No hay equipo real para medir | Experimento controlado (§7) |
| Datos bancarios | Instalación local; datos sintéticos en el TSP |

## 7. Relación con el proyecto académico (TSP UPC)

- **Encaje: alto, con riesgo de originalidad.**
- **Experimento posible sin banco:** una aplicación web y una API de demostración con defectos sembrados; dos grupos (o el mismo grupo en dos rondas) certifican una versión con y sin la herramienta. Se mide tiempo de certificación, horas de documentación, defectos encontrados y % de casos IA aceptados.
- **Objetivos específicos sugeridos:**
  1. Caracterizar el proceso de certificación en ≥ 3 equipos de QA.
  2. Implementar la recepción de resultados de ≥ 3 frameworks con trazabilidad completa.
  3. Generar evidencias en plantilla configurable; criterio: aceptadas sin cambios por un revisor en ≥ 80% de los casos.
  4. Generar casos de API con IA; criterio: ≥ 60% aceptados y ≥ 1 defecto sembrado encontrado solo por ellos.
  5. Reducir el tiempo de certificación ≥ 40% en el experimento controlado.
- **Riesgo institucional [S9]:** si el TSP debe ser un informe de experiencia, este tema encaja bien si el autor trabaja en QA. Confirmar con la UPC.

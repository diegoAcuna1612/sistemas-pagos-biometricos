# 01 — Mapa de oportunidades (variantes de P2)

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Cómo se construyó

1. "Plataforma de pruebas" abarca desde un ejecutor hasta un servicio gestionado. Se separó en **5 variantes** según qué parte del ciclo de QA se automatiza y para quién.
2. Para cada una: señales del problema (avisos de empleo, tesis), herramientas existentes y presencia en Perú.

## 2. Mapa

| ID | Cliente | Problema | Referencia internacional | Competencia en Perú | Estado |
|---|---|---|---|---|---|
| V1 | Cualquier equipo de desarrollo | Ejecutar pruebas web y API | Katalon, mabl, Testim, BrowserStack [S4, S5] | Herramientas libres + consultoras [S2, S3] | Excluida (diferenciación 1) |
| V2 | Equipos con APIs documentadas | Escribir casos de prueba toma tiempo | IA de Katalon, mabl, QA Wolf [S4–S6] | No identificada (local) | Finalista |
| **V3** | QA de banca y consultoras de QA | Armar evidencias y el informe de certificación a mano | Xray, TestRail (gestión de pruebas) [PI] | Plantillas propias de cada banco [H] | **Finalista** |
| V4 | Casas de software que emiten CPE | Probar la integración con OSE/SUNAT en cada versión | — | No identificada | Top |
| V5 | Pymes de software sin QA | No tienen probadores | QA Wolf (servicio) [S6] | Consultoras locales [S2] | Excluida (servicio) |

## 3. Vista por tipo

| Tipo | Variantes | Comentario |
|---|---|---|
| Proceso manual automatizable | **V3** | La evidencia se arma a mano [H] |
| Funcionalidad avanzada ahora accesible | V2 | Los LLM generan casos desde una especificación |
| Nicho desatendido | V4 | Muy peruano; mercado pequeño |
| Mercado consolidado | V1, V5 | Sin diferenciador |

## 4. Mapa de calor

| ID | Problema | Pago evidenciado | Diferenciación | Acceso | Riesgo principal |
|---|---|---|---|---|---|
| V3 | Alto [H] | Medio (los bancos pagan QA [S2]) | Media-baja | Medio | Instalación en el banco; ciclo de venta |
| V2 | Medio | Medio | Baja | Medio | Plataformas globales ya lo hacen |
| V4 | Medio | Bajo | Media | Medio | Mercado pequeño |
| V1 | Bajo | Medio | Muy baja | Medio | Herramientas gratuitas |
| V5 | Medio | Alto | Muy baja | Alto | Es consultoría, no producto |

# 00 — Resumen ejecutivo: P6 Plataforma de automatización de tareas mediante RPA

**Fecha:** 05/11/2026.
**Propuesta evaluada:** herramienta que procese archivos, extraiga información, valide registros y genere reportes, con monitoreo y trazabilidad de cada tarea automatizada. Medición: tiempo ahorrado por proceso, exactitud de extracción y tasa de tareas completadas.
**Estructura:** la de `../../oportunidades-saas-ia-cloud-peru/` (00 a 11), adaptada a una propuesta con **variantes**.
**Fuentes y etiquetas:** `10_fuentes_y_evidencias.md`.

## Veredicto

| Dimensión | Resultado |
|---|---|
| **Viabilidad como producto** | **Baja como plataforma RPA.** UiPath, Automation Anywhere, Power Automate [PI] y Rocketbot (chilena, con country manager en Perú, más de 500 clientes y fuerte en banca) [S1–S4] cubren el mercado. **Media** si se aplica a **un proceso vertical concreto** |
| **Viabilidad como TSP** | **Alta:** tiene un núcleo medible (exactitud de extracción, tasa de éxito, tiempo ahorrado) y la UPC ya tiene antecedentes de RPA [S5, S6] |
| **Mejor variante** | **V3 — Extracción y validación documental con carga al sistema destino** para un proceso vertical (65/100). V5 (conciliación de abonos) puntúa 66, pero es la O11 de la investigación de oportunidades, ya descartada por diferenciación débil |
| **Decisión** | **No construir una plataforma RPA.** Si se elige P6, aplicarla a un proceso concreto; el mejor candidato es el de O1 (DAM) o el de cuentas por pagar con facturas extranjeras |

## Los hallazgos que más pesan

1. **RPA ya se vende en Perú:** Rocketbot reporta que la banca es ~30% de sus clientes y que las empresas de servicios (luz, seguridad) son ~40% [S1]; tiene presencia en Perú desde al menos 2022 [S3].
2. **RPA clásico (clics sobre pantallas) es frágil;** el valor nuevo está en la **IA que lee documentos sin estructura** antes de cargarlos [I].
3. **Las mejores variantes de P6 son oportunidades ya analizadas:** V3 = O1/O3 (documento → datos), V5 = O11 (conciliación), V2 = O4 (portales de SUNAT, riesgo con la Clave SOL).
4. **El monitoreo y la trazabilidad de la propuesta son necesarios, pero no se venden solos:** las plataformas RPA ya traen orquestador [PI].

## Ranking de variantes

| # | ID | Variante | Puntaje | Nota |
|---|---|---|---:|---|
| 1 | V5 | Conciliación de abonos (Yape, transferencias) contra ventas | 66 | = O11 (ya descartada por diferenciación) |
| 2 | V3 | Extracción y validación documental con carga al sistema | **65** | **Recomendada**; = O1/O3 |
| 3 | V2 | Bots para portales del Estado (estudios contables) | 62 | = O4; riesgo con la Clave SOL |
| 4 | V4 | Monitoreo de bots existentes | 60 | Comprador escaso |
| — | V1 | Plataforma RPA genérica | 57 (**excluida**) | |

## Índice

`01` variantes · `02` competencia · `03` problema · `04` fichas · `05` finalistas · `06` arquitectura · `07` negocio · `08` validación · `09` matriz · `10` fuentes · `11` recomendación y TSP.

# 04 — Top de variantes

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`. Puntajes en `09`.

## 1. V3 — Evidencias y certificación automática (63)

| Campo | Contenido |
|---|---|
| Cliente | Consultoras de QA que atienden bancos; equipos de QA internos de bancos y financieras |
| Comprador / usuario | Gerente de QA o de la cuenta / analista y automatizador QA |
| Problema | Armar a mano las evidencias y el informe de certificación de cada versión [H] |
| Solución | Recibe los resultados de las herramientas que ya usan (JUnit XML, Karate, Playwright, Postman/Newman) → los asocia a requisitos e historias → genera la evidencia (capturas, pasos, datos) en la **plantilla del cliente** (Word/PDF) → tablero de avance de la certificación |
| Diferenciador | No reemplaza el framework; genera el documento que el banco exige; instalable en el cliente |
| Métrica | Horas de documentación por versión; tiempo total de certificación; % de casos con evidencia completa |
| Precio tentativo [H] | Por equipo de QA: S/ 1 500–3 000 al mes (`07`) |
| Riesgo | Xray/TestRail cubren parte; cada banco tiene su formato; venta larga |

## 2. V2 — Generación de pruebas de API con IA (62)

| Campo | Contenido |
|---|---|
| Solución | Lee OpenAPI e historias de usuario → propone casos (felices, límites, errores) → genera código Karate o Playwright → el analista revisa |
| Diferenciador | Español, formato de los frameworks locales; revisión humana obligatoria |
| Riesgo | Katalon, mabl y los asistentes de código ya generan pruebas [S4, S5] |
| Uso recomendado | **Módulo de V3**, no producto independiente |

## 3. V4 — Pruebas de facturación electrónica (58)

| Campo | Contenido |
|---|---|
| Solución | Batería de casos de CPE (factura, boleta, notas, GRE) contra el entorno de pruebas del OSE; reporte de regresión |
| Riesgo | Pocos clientes; los OSE ofrecen entornos y validadores [PI] |

## 4. Excluidas

| ID | Motivo |
|---|---|
| V1 — Plataforma genérica | Diferenciación 1: herramientas libres y comerciales cubren todo [S3–S6] |
| V5 — QA como servicio | Es una consultora; compite con Choucair, Inetum y otras [S2, S3] |

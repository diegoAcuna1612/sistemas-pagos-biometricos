# 00 — Resumen ejecutivo: P2 Plataforma de automatización de pruebas de software

**Fecha:** 05/11/2026.
**Propuesta evaluada:** sistema para registrar proyectos, ejecutar pruebas automáticas de aplicaciones web y APIs, detectar errores y generar reportes de calidad. Medición: tiempo de pruebas, cobertura, defectos detectados y reducción del trabajo manual.
**Estructura:** la de `../../oportunidades-saas-ia-cloud-peru/` (00 a 11), adaptada a una propuesta con **variantes**.
**Fuentes y etiquetas:** `10_fuentes_y_evidencias.md`. [V] · [S] · [C] · [I] · [H] · [PI].

## Veredicto

| Dimensión | Resultado |
|---|---|
| **Viabilidad como producto (mercado)** | **Baja como plataforma genérica.** Compite con herramientas libres (Selenium, Playwright, Cypress, Karate, Postman), con plataformas comerciales (Katalon, mabl, QA Wolf) y con consultoras de QA que ya operan en Lima (Choucair, Inetum, NTT) [S2–S6] |
| **Viabilidad como TSP** | **Alta**, con una condición: el antecedente UPC (2023) es casi idéntico [S1]. Hay que aportar algo nuevo y medible |
| **Mejor variante** | **V3 — Evidencias y certificación automática para equipos de QA en banca y consultoras** (63/100) |
| **Decisión** | **Validar antes de desarrollar.** Para el TSP: enfocarse en la variante V3 o V2, no en "otra plataforma de pruebas" |

## Los hallazgos que más pesan

1. **El antecedente existe y está verificado:** "Solución de automatización de pruebas de calidad en empresa bancaria para reducir tiempos de certificación" (UPC, nov. 2023): Selenium, integración continua, meta de 50% menos tiempo [S1]. Repetirlo no aporta.
2. **Las herramientas de ejecución son gratuitas** y son las que piden los avisos de empleo en Perú (Selenium, Karate, Playwright, Cypress, JMeter, Postman, Appium) [S3]. El valor no está en ejecutar.
3. **El dolor local probable está en la "certificación":** armar evidencias (capturas, documentos) y trazabilidad para que el banco apruebe el pase a producción [H, apoyado en S1].
4. **Los bancos no suben datos de prueba a un SaaS externo** con facilidad [I]: la variante bancaria necesita instalación en el cliente.
5. **Las plataformas con IA son caras** (mabl desde ~USD 500/mes; QA Wolf ~USD 8 000/mes según agregadores) [S5, S6]: hay espacio para algo local y barato, pero no para competir en funciones.

## Ranking de variantes

| # | ID | Variante | Puntaje |
|---|---|---|---:|
| 1 | V3 | Evidencias y certificación automática (banca y consultoras de QA) | **63** |
| 2 | V2 | Generación de pruebas de API con IA desde OpenAPI e historias de usuario | 62 |
| 3 | V4 | Pruebas de integración de facturación electrónica (SUNAT) para casas de software | 58 |
| — | V1 | Plataforma genérica de pruebas web y API | 62 (**excluida:** diferenciación 1) |
| — | V5 | QA como servicio para pymes de software | 62 (**excluida:** servicio, diferenciación 1) |

## Índice

| Archivo | Contenido |
|---|---|
| `01` | Variantes | 
| `02` | Herramientas y consultoras |
| `03` | Problema en el contexto peruano |
| `04` | Fichas de variantes |
| `05` | Finalistas |
| `06` | Arquitectura y MVP |
| `07` | Negocio y precios |
| `08` | Validación |
| `09` | Matriz |
| `10` | Fuentes |
| `11` | Recomendación y TSP |

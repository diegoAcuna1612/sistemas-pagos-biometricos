# 04 — Top de variantes

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`. Puntajes en `09`.

## 1. V3 — Extracción y validación documental con carga al sistema (65)

| Campo | Contenido |
|---|---|
| Cliente | Backoffice de un proceso con documentos sin estructura: agencias de aduana (O1), cuentas por pagar con facturas extranjeras (O3), distribuidoras con órdenes en PDF (O2) |
| Solución | Ingreso de archivos (correo, carpeta, carga) → clasificación → extracción con IA → validaciones por reglas → revisión de excepciones → carga al sistema destino (API, archivo o bot) → trazabilidad y reportes |
| Diferenciador | Depende del vertical: en aduanas, las reglas de la DAM (O1); genérico, bajo |
| Métrica | Exactitud por campo; % de documentos sin intervención; minutos por documento; tasa de tareas completadas |
| Riesgo | Si no se elige un vertical, compite con IDP genéricos |

## 2. V5 — Conciliación de abonos (66)

| Campo | Contenido |
|---|---|
| Solución | Carga de extractos y reportes de Yape/Plin → emparejamiento con facturas → pendientes → recordatorios |
| Riesgo | Igual que O11: diferenciador débil frente a herramientas genéricas; extractos manuales |

## 3. V2 — Bots para portales del Estado (62)

| Campo | Contenido |
|---|---|
| Solución | Descarga de comprobantes y notificaciones para muchos RUC |
| Riesgo | Clave SOL de terceros; captchas; términos de uso de SUNAT [PI] |

## 4. V4 — Monitoreo de bots (60)

| Campo | Contenido |
|---|---|
| Solución | Tablero de ejecuciones, fallas, tiempos y SLA para bots de varias plataformas |
| Riesgo | Las plataformas ya lo incluyen; compradores escasos |

## 5. Excluida

| ID | Motivo |
|---|---|
| V1 Plataforma RPA | Rocketbot, UiPath, Automation Anywhere, Power Automate [S1–S4] [PI] |

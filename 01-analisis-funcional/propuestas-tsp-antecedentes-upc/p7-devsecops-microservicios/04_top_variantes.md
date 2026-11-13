# 04 — Top de variantes

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`. Puntajes en `09`.

## 1. V3 — Evidencias de cumplimiento desde el pipeline (59)

| Campo | Contenido |
|---|---|
| Cliente | Fintechs, cooperativas, proveedores de software de bancos y aseguradoras |
| Comprador / usuario | Oficial de seguridad de la información o jefe de TI / equipo de desarrollo |
| Problema | Reconstruir evidencias para auditorías [H] |
| Solución | Conectores a GitHub/GitLab/Jenkins → registro inmutable de cada versión (commit, escaneos, vulnerabilidades, aceptaciones de riesgo, aprobaciones, despliegue) → mapeo a controles (ISO 27001, norma SBS [PI]) → reporte de auditoría |
| Diferenciador | Mapeo a controles locales; no reemplaza el pipeline |
| Riesgo | Norma por confirmar; las plataformas integradas tienen reportes de cumplimiento [PI]; venta a entidades reguladas |

## 2. V2 — Plantillas DevSecOps para pymes (57)

| Campo | Contenido |
|---|---|
| Solución | Repositorio de plantillas (pipeline, escaneos, despliegue a Kubernetes) + instalación asistida |
| Riesgo | Es consultoría; plantillas libres abundan [I] |

## 3. V5 — Laboratorio educativo (54) y V4 — SBOM para el Estado (50)

Sin evidencia de pago ni obligación.

## 4. Excluida

| ID | Motivo |
|---|---|
| V1 Plataforma DevSecOps SaaS | Diferenciación 1: GitHub, GitLab y herramientas libres cubren todo [I] [S3] |

# 00 — Resumen ejecutivo: P7 Plataforma DevSecOps para aplicaciones basadas en microservicios

**Fecha:** 05/11/2026.
**Propuesta evaluada:** solución que automatice compilación, pruebas, análisis de vulnerabilidades, despliegues y auditoría de versiones. Medición: duración del despliegue, vulnerabilidades detectadas, errores de liberación y tiempo de recuperación.
**Estructura:** la de `../../oportunidades-saas-ia-cloud-peru/` (00 a 11), adaptada a una propuesta con **variantes**.
**Fuentes y etiquetas:** `10_fuentes_y_evidencias.md`.

## Veredicto

| Dimensión | Resultado |
|---|---|
| **Viabilidad como producto** | **Muy baja.** Es el mercado más consolidado de las 8 propuestas: GitHub, GitLab, Jenkins, SonarQube, Snyk, Trivy, OWASP ZAP, Argo CD [I]; GitLab y sus socios hacen eventos de DevSecOps en Perú [S3]; los bancos grandes tienen tribus propias de DevSecOps (BCP) [S1] |
| **Viabilidad como TSP** | **Alta en ingeniería, media en encaje.** Muy buen tema de **implementación** (pipeline completo con métricas DORA), sobre todo si el autor lo hace en su trabajo. Como "producto" no aporta |
| **Mejor variante** | **V3 — Evidencias de cumplimiento generadas desde el pipeline** para fintechs, cooperativas y proveedores de entidades supervisadas (59/100) |
| **Decisión** | **No desarrollar como producto.** Elegir P7 solo como **TSP de implementación**, idealmente en una organización real |

## Los hallazgos que más pesan

1. **Las herramientas son gratuitas o ya están en la plataforma de código** que usa el cliente [I]. Un producto nuevo no tiene dónde diferenciarse.
2. **Hay demanda del perfil, no del producto:** ofertas de "Líder DevSecOps" para banca en la región [S2] y equipos internos en bancos [S1].
3. **Las encuestas globales de DevSecOps no desglosan Perú** [S4, S5]: no hay datos locales de adopción.
4. **El hueco posible es el cumplimiento:** convertir lo que ya hace el pipeline (escaneos, aprobaciones, versiones) en **evidencia de auditoría** para reguladores o clientes corporativos [I]. Requiere confirmar la norma SBS vigente [PI].
5. **El antecedente citado no se encontró** ("Implementación de DevSecOps en arquitectura de microservicios, UPC 2023") [PI]; hay una tesis PUCP sobre patrones de microservicios en DevOps [S8].

## Ranking de variantes

| # | ID | Variante | Puntaje |
|---|---|---|---:|
| 1 | V3 | Evidencias de cumplimiento desde el pipeline | **59** |
| 2 | V2 | Plantillas DevSecOps listas para casas de software pymes | 57 |
| 3 | V5 | Laboratorio DevSecOps educativo | 54 |
| 4 | V4 | SBOM y vulnerabilidades para proveedores del Estado | 50 |
| — | V1 | Plataforma DevSecOps SaaS | 54 (**excluida:** diferenciación 1) |

## Índice

`01` variantes · `02` competencia · `03` problema · `04` fichas · `05` finalistas · `06` arquitectura · `07` negocio · `08` validación · `09` matriz · `10` fuentes · `11` recomendación y TSP.

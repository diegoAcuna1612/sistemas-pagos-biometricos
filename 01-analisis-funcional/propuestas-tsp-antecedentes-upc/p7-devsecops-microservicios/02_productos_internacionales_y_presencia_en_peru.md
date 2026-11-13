# 02 — Productos y su presencia en Perú

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Herramientas (todas disponibles desde Perú)

| Etapa | Herramientas libres o incluidas | Comerciales | Fuente |
|---|---|---|---|
| CI/CD | GitHub Actions, GitLab CI, Jenkins, Azure DevOps | — | [I]; Jenkins/Azure DevOps/GitHub Actions aparecen en avisos de QA en Perú (P2 S3) |
| Análisis estático (SAST) | SonarQube Community, Semgrep | SonarQube de pago, Checkmarx | [S6] [I] |
| Dependencias (SCA) | OWASP Dependency-Check, Trivy, Dependency-Track | Snyk, Mend | [I] |
| Contenedores | Trivy, Grype | — | [I] |
| Pruebas dinámicas (DAST) | OWASP ZAP | Burp Suite | [I] |
| Despliegue | Argo CD, Flux, Helm | — | [I] |
| Plataformas integradas | — | GitHub Advanced Security, GitLab Ultimate | [S3] [I] |

**Nota:** las herramientas marcadas [I] son conocimiento general del área; **no se verificaron precios ni licencias en esta sesión** [PI].

## 2. Presencia en Perú

| Actor | Evidencia | Fuente |
|---|---|---|
| GitLab + Epidata | Eventos de DevSecOps en Perú (2023 y 2024) | [S3] |
| BCP | Líder de tribu de DevSecOps y resiliencia | [S1] |
| Redbee | Busca líder DevSecOps para un banco de la región | [S2] |
| SonarSource | Caso bancario con SonarQube + GitLab (Europa) | [S6] |

## 3. Desarrollar, adaptar, integrar o revender

| Opción | Evaluación |
|---|---|
| Plataforma DevSecOps propia | **No** |
| **Capa de evidencia de cumplimiento** que lee los resultados del pipeline existente | Posible (V3), si la norma lo exige |
| Integración/consultoría (implementar el pipeline en un cliente) | **El camino natural para un TSP de experiencia profesional** |
| Revender GitLab o Snyk | Fuera del alcance |

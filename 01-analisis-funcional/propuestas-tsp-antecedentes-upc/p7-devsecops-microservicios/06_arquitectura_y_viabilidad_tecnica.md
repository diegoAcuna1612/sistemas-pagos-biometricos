# 06 — Arquitectura y viabilidad técnica

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Principio de diseño

- **Componer herramientas libres**, no reescribirlas.
- **Política como código:** las reglas de bloqueo (por ejemplo, "no desplegar con vulnerabilidades críticas sin aceptación") son archivos versionados.
- **Todo deja evidencia inmutable:** cada versión tiene su registro firmado.

## 2. Arquitectura preliminar (TSP de implementación + capa V3)

```
Desarrollador ──► Repositorio (GitLab/GitHub)
                       │ push / merge request
                       ▼
Pipeline CI: compilar → pruebas unitarias → SAST (SonarQube/Semgrep) → SCA (Trivy/Dependency-Check)
             → construir imagen → escaneo de imagen → firmar imagen → SBOM
                       │
             Política (bloquear o pedir aceptación de riesgo)
                       ▼
Pipeline CD (GitOps, Argo CD) → staging → DAST (OWASP ZAP) → aprobación → producción (Kubernetes)
                       │
           Observabilidad (métricas, logs, alertas) → reversión automática
                       │
 Capa V3: registro de evidencias por versión → mapeo a controles → reporte de auditoría
                       │
           Tablero DORA (frecuencia, tiempo de entrega, tasa de fallas, tiempo de recuperación)
```

## 3. Sistema objeto de estudio

| Opción | Ventaja | Riesgo |
|---|---|---|
| Sistema real del trabajo del autor | Encaja con TSP de experiencia; métricas reales | Permisos de la empresa |
| Aplicación de microservicios de referencia de código abierto (p. ej., demos de tiendas en línea) | Sin permisos | Métricas sintéticas [PI: licencia] |
| Aplicación propia de 4–6 microservicios | Control total | Esfuerzo adicional |

## 4. MVP (10–12 semanas, estimación [H])

1. Clúster (k3s/kind local o Kubernetes gestionado).
2. Pipeline CI con SAST, SCA, escaneo de imagen y SBOM.
3. Política de bloqueo y aceptación de riesgo.
4. CD con GitOps y DAST en staging.
5. Observabilidad y reversión.
6. Registro de evidencias y tablero DORA.

## 5. Métricas

| Métrica | Cómo se mide |
|---|---|
| Duración del despliegue / tiempo de entrega de cambios | Del commit a producción |
| Frecuencia de despliegue | Por semana |
| Tasa de fallas de cambio | Despliegues que requieren reversión o corrección |
| Tiempo de recuperación (MTTR) | De la alerta a la recuperación |
| Vulnerabilidades detectadas antes de producción | Por severidad, con vulnerabilidades sembradas para validar |

## 6. Costos [H]

| Concepto | Estimación |
|---|---|
| Clúster local (k3s/kind) | USD 0 |
| Kubernetes gestionado pequeño | USD 70–150 al mes |
| Herramientas | Libres; ediciones de pago opcionales |

## 7. Riesgos técnicos

| Riesgo | Mitigación |
|---|---|
| Alcance excesivo (demasiadas herramientas) | Una herramienta por etapa; congelar el alcance en la semana 4 |
| Falsos positivos de escáneres | Política de triaje y aceptación documentada |
| Métricas sin línea base | Medir el proceso "antes" durante 2–4 semanas |

## 8. ¿Requiere algo desproporcionado?

**No en dinero.** Sí en **acceso**: para métricas reales hace falta un sistema y un equipo reales.

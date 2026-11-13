# 06 — Arquitectura y viabilidad técnica

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Principio de diseño

- **No reemplazar el framework de pruebas.** El sistema consume resultados (JUnit XML, JSON de Karate, trazas de Playwright, Newman) y orquesta ejecuciones existentes.
- **Instalable en el cliente** (contenedores) además de nube, porque los datos de prueba bancarios no salen [I].
- **IA solo como asistente:** propone casos y redacta descripciones; un humano aprueba.

## 2. Arquitectura preliminar

```
Repositorio / CI (Jenkins, Azure DevOps, GitHub Actions)
        │  webhook o CLI
        ▼
API de recepción ──► Normalizador de resultados (parsers por framework)
        │                        │
        ▼                        ▼
Ejecutor opcional          Almacén: proyectos, requisitos, casos, ejecuciones,
(workers en contenedor)     defectos, artefactos (capturas, videos, logs)
                                 │
                 ┌───────────────┼────────────────┐
                 ▼               ▼                ▼
        Trazabilidad      Generador de evidencias   Panel de calidad
   (requisito↔caso↔        (plantillas Word/PDF      (cobertura, tasa de
    ejecución↔defecto)      por cliente)              falla, pruebas inestables)
                                 │
                       Integración Jira / Azure Boards
```

| Componente | Tecnología sugerida |
|---|---|
| Backend | Java (Spring) o Python (FastAPI) |
| Ejecutores | Contenedores con Playwright, Karate, Newman |
| Artefactos | Almacenamiento de objetos (S3 o MinIO en el cliente) |
| Plantillas | docx-template / generación PDF |
| IA (módulo V2) | LLM vía API con datos anonimizados, o modelo local en instalación bancaria |

## 3. MVP (10–12 semanas, estimación [H])

1. Proyectos, requisitos e historias (importables desde Jira).
2. Recepción de resultados de 3 formatos: JUnit XML, Karate JSON, Playwright.
3. Asociación caso ↔ requisito y matriz de trazabilidad.
4. Generación de evidencia con una plantilla configurable.
5. Panel: avance de certificación, defectos, pruebas inestables.
6. Módulo IA: casos de API sugeridos desde un OpenAPI.
7. Auditoría y roles (analista, líder, aprobador).

## 4. Métricas

| Métrica | Cómo se mide |
|---|---|
| Tiempo de certificación por versión | Desde el primer caso ejecutado hasta la aprobación |
| Horas de documentación | Cronometradas antes y después |
| % de casos con evidencia completa | Automático |
| Tasa de pruebas inestables | Fallas que pasan al reintentar |
| Calidad de casos generados por IA | % aceptados sin cambios; defectos que encontraron |

## 5. Costos [H]

| Concepto | Estimación |
|---|---|
| Infraestructura del MVP en nube | USD 50–150 al mes (ejecutores bajo demanda) |
| IA por generación de casos (un OpenAPI mediano) | Centavos a pocos dólares según el modelo |
| Instalación en cliente | Costo de soporte, no de infraestructura |

## 6. Seguridad

- Las capturas pueden contener datos personales de ambientes de prueba: enmascarado configurable y retención limitada.
- Secretos (credenciales de ambientes) en un gestor de secretos, nunca en los resultados.
- Pruebas automáticas de aislamiento entre proyectos y clientes.

## 7. Riesgos técnicos

| Riesgo | Mitigación |
|---|---|
| Formatos de resultados distintos por versión de framework | Parsers con pruebas de contrato |
| Plantillas de cada banco | Motor de plantillas configurable, no código |
| Casos de IA incorrectos | Revisión obligatoria; métrica de aceptación |

## 8. ¿Requiere algo desproporcionado?

**No**, salvo acceso a un equipo de QA real para medir horas. Sin él, el TSP se puede demostrar con una aplicación de ejemplo y un experimento controlado (`11` §7).

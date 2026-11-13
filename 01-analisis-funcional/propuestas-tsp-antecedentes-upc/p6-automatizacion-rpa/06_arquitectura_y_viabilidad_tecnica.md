# 06 — Arquitectura y viabilidad técnica

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Principio de diseño

- **Pipeline determinista con pasos de IA acotados**, no agentes autónomos (mismo criterio que `../../oportunidades-saas-ia-cloud-peru/06` §1).
- **Jerarquía de integración:** API → archivo de importación → bot de pantalla.
- **Cada tarea deja rastro:** entrada, versión del modelo y de las reglas, salida, quién revisó, resultado de la carga.

## 2. Arquitectura preliminar

```
Fuentes (correo, carpeta, carga web)
        │
        ▼
Orquestador de tareas (cola, reintentos, estados)
        │
  ┌─────┴────────────────────────────────────────────┐
  ▼                     ▼                             ▼
Clasificación     Extracción (LLM multimodal,    Validaciones (reglas:
(tipo de doc)     salida JSON con esquema)       totales, fechas, catálogos)
                                │
                     ¿Confianza suficiente?
                     ├─ sí ─► Carga al sistema destino (API / archivo / bot)
                     └─ no ─► Bandeja de excepciones (revisión lado a lado)
                                │
                 Trazabilidad + tablero (tareas, éxito, tiempos, errores)
```

| Componente | Tecnología sugerida |
|---|---|
| Orquestador | Python + cola (Celery/RQ) o servicio de flujos (Temporal) |
| Extracción | LLM multimodal vía API |
| Bot de pantalla (si no hay otra vía) | Playwright (web) o Power Automate Desktop / Rocketbot como conector |
| Almacenamiento | PostgreSQL + objetos; multiempresa |
| Tablero | Web con métricas por tarea y por flujo |

## 3. MVP (8–10 semanas, estimación [H])

Un solo flujo vertical. Propuesta: **factura comercial extranjera → datos → archivo de importación** (sirve a O1 y O3).

1. Ingreso por correo y carga web.
2. Extracción de cabecera e ítems.
3. Validaciones (suma de ítems = total, moneda, fechas, proveedor conocido).
4. Bandeja de excepciones.
5. Exportación al formato del sistema destino.
6. Trazabilidad completa y tablero.

## 4. Métricas

| Métrica | Uso |
|---|---|
| Exactitud por campo (cabecera e ítems) | Calidad de extracción |
| % de documentos procesados sin intervención | Automatización real |
| Tasa de tareas completadas / fallidas por causa | Confiabilidad |
| Minutos por documento antes y después | Tiempo ahorrado |
| Falsos positivos de validación | Ruido para el revisor |

## 5. Costos [H]

- IA por documento: centavos de dólar (estimación de `../../oportunidades-saas-ia-cloud-peru/06` §5).
- Infraestructura del MVP: USD 50–100 al mes.

## 6. Seguridad

- Documentos comerciales; datos personales mínimos.
- Credenciales de sistemas destino en gestor de secretos.
- Si hay bot de pantalla: cuenta de servicio con permisos mínimos.

## 7. Riesgos técnicos

| Riesgo | Mitigación |
|---|---|
| Cambios en la pantalla del sistema destino | Preferir importación de archivo; pruebas de humo diarias |
| Alucinación en extracción | Esquema estricto y validaciones cruzadas |
| Volumen bajo de documentos de prueba | Conjunto sintético + documentos públicos de ejemplo |

## 8. ¿Requiere algo desproporcionado?

**No.**

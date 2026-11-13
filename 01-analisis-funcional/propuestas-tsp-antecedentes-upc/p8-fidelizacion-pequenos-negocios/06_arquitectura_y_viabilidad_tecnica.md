# 06 — Arquitectura y viabilidad técnica

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Principio de diseño

- **Libro de puntos de solo inserción:** cada acumulación y canje es un movimiento; el saldo es una suma auditable.
- **Toda campaña tiene grupo de control** asignado al azar; el reporte muestra el efecto incremental, no el total.
- **Consentimiento registrado** antes de cualquier mensaje (B2C).

## 2. Arquitectura preliminar

```
Historial de pedidos / ventas (importación del ERP o POS)
        │
        ▼
Almacén por empresa ──► Motor de puntos (reglas: por monto, por meta, por producto)
        │                         │
        ▼                         ▼
Segmentación (RFM)        Libro de movimientos (acumulación, canje, vencimiento)
y alerta de caída                 │
        │                         ▼
        ▼                 Portal / WhatsApp del bodeguero (saldo, metas, premios)
Diseñador de campañas ──► Asignación aleatoria: tratamiento / control
        │
        ▼
Envío (WhatsApp Business API / SMS) ──► Medición: recompra tratamiento vs control ──► Reporte de efecto
```

| Componente | Tecnología sugerida |
|---|---|
| Backend | Python (FastAPI) o Node.js; PostgreSQL multiempresa |
| Segmentación y modelos | RFM; modelo de propensión de abandono (regresión logística o árboles) |
| Mensajería | WhatsApp Business API con plantillas aprobadas |
| Experimentos | Asignación aleatoria estratificada; prueba de diferencia de proporciones |

## 3. MVP (8–10 semanas, estimación [H])

1. Importación de historial de pedidos por bodega.
2. Reglas de puntos y metas; libro de movimientos.
3. Segmentación RFM y alerta de bodegas en caída.
4. Portal o mensaje con saldo y metas.
5. Campañas con grupo de control y reporte de efecto.
6. Catálogo de premios y canje.
7. Auditoría y antifraude básico (canjes anómalos).

## 4. Métricas

| Métrica | Uso |
|---|---|
| Tasa de recompra (30/60 días) tratamiento vs control | Efecto causal |
| Bodegas recuperadas (volvieron a comprar tras la alerta) | Valor |
| Tiempo de preparación de una campaña | Eficiencia (métrica de la propuesta) |
| Precisión del modelo de abandono (AUC) | Calidad de la segmentación |

## 5. Costos [H]

| Concepto | Estimación |
|---|---|
| Infraestructura | USD 30–80 al mes |
| WhatsApp Business API | Por conversación según tarifas de Meta [PI] |
| Premios | Los paga la distribuidora (fuera del software) |

## 6. Privacidad

- V4 (B2B): datos de negocios; el bodeguero persona natural con RUC sigue siendo dato personal en parte [I].
- V2/V3 (B2C): consentimiento expreso para publicidad; baja fácil; registro del consentimiento [S9].

## 7. Riesgos técnicos

| Riesgo | Mitigación |
|---|---|
| Fraude en canjes | Reglas y límites; revisión de canjes atípicos |
| Muestras pequeñas para el grupo de control | Campañas con suficientes bodegas; reportar intervalos de confianza |
| Plantillas de WhatsApp rechazadas | Diseño previo y aprobación |

## 8. ¿Requiere algo desproporcionado?

**No.**

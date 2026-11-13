# 06 — Arquitectura y viabilidad técnica

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Principio de diseño

- **Flujo determinista + validación asistida.** El estado del expediente lo decide una máquina de estados con reglas; la IA solo clasifica, extrae y señala.
- **Revisión humana obligatoria** antes de aprobar.
- **Privacidad por diseño:** mínimo de datos, retención limitada, cifrado.

## 2. Arquitectura preliminar

```
Cliente final (enlace web / WhatsApp) ──► Recepción de archivos ──► Almacén cifrado
                                                │
                                Pipeline de documentos:
             clasificación → extracción (LLM multimodal) → validaciones por reglas
                                                │
                          Lista de verificación por expediente
                  (falta / vencido / no coincide / ilegible / OK)
                                                │
         ┌──────────────────────┬───────────────┴──────────────┐
         ▼                      ▼                              ▼
  Aviso al cliente      Bandeja del analista            Seguimiento por código
  (qué falta)           (revisión lado a lado)          y auditoría
```

| Componente | Tecnología sugerida |
|---|---|
| Backend | Node.js/NestJS o Python/FastAPI |
| Flujo | Máquina de estados explícita (borrador → recibido → observado → completo → en evaluación → cerrado) |
| IA | LLM multimodal vía API; salida JSON con esquema; sin agentes |
| Reglas | Configurables por tipo de producto (crédito, seguro, venta) |
| Almacenamiento | Objetos cifrados; borrado programado |

## 3. MVP (8–10 semanas, estimación [H])

1. Configuración de tipos de expediente y requisitos.
2. Portal del cliente con código de seguimiento.
3. Clasificación de 5 tipos de documento (DNI, boleta de pago, recibo de servicio, constancia, declaración).
4. Extracción y validaciones: nombre/DNI coincidentes, fechas vigentes, legibilidad.
5. Aviso automático de observaciones.
6. Bandeja del analista con revisión lado a lado.
7. Auditoría, métricas y borrado.

## 4. Métricas

| Métrica | Uso |
|---|---|
| Exactitud de clasificación y extracción por campo | Calidad de la IA (con conjunto etiquetado) |
| % de expedientes completos al primer envío | Valor para el negocio |
| Días hasta expediente completo | Valor |
| Minutos de revisión por expediente | Eficiencia |
| Tasa de falsos "OK" | Riesgo: debe ser ~0 en campos críticos |

## 5. Costos [H]

| Concepto | Estimación |
|---|---|
| IA por expediente (5–10 páginas) | Centavos de dólar con un modelo pequeño o mediano (ver la tabla de precios de la investigación de oportunidades, S65) |
| Infraestructura del MVP | USD 50–100 al mes |

## 6. Seguridad y privacidad

- Ley 29733 y DS 016-2024-JUS: la empresa cliente es la responsable; el producto es **encargado del tratamiento** [I].
- Si se usa un LLM externo hay **flujo transfronterizo**: informarlo en el contrato y en la política de privacidad [I].
- Para el TSP: documentos **sintéticos** (DNI y boletas ficticias), nunca reales.

## 7. Riesgos técnicos

| Riesgo | Mitigación |
|---|---|
| Fotos de mala calidad | Validación de legibilidad y pedido inmediato de nueva foto |
| Falsificación de documentos | Fuera del alcance; señalar inconsistencias, no certificar autenticidad |
| Alucinación en extracción | Esquema estricto, comparación con datos del formulario, revisión humana |

## 8. ¿Requiere algo desproporcionado?

**No.** El reto es construir un buen conjunto de evaluación sintético y respetar la privacidad.

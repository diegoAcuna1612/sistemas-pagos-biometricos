# 08 — Plan de validación

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Reglas comunes

- Elegir **un** proceso antes de entrevistar.
- Pedir documentos anonimizados y el formato de carga del sistema destino.
- Contactar empresas requiere la autorización del equipo.

## 2. V3 — Documento → sistema (prioridad 1)

### 2.1 Elección del proceso

| Proceso candidato | Plan de validación disponible |
|---|---|
| DAM en agencias de aduana | **`../../oportunidades-saas-ia-cloud-peru/08` §2** (completo) |
| Facturas extranjeras en cuentas por pagar | `../../oportunidades-saas-ia-cloud-peru/08` §6 |
| Órdenes de compra en PDF en distribuidoras | `../../oportunidades-saas-ia-cloud-peru/08` §3 |

**Recomendación:** usar el plan de O1 sin cambios. No tiene sentido duplicarlo.

### 2.2 Preguntas adicionales propias de P6

1. ¿Ya tienen bots (Rocketbot, UiPath, Power Automate)? ¿Qué procesos automatizaron y cuáles fallaron?
2. ¿Cómo saben hoy qué tarea automatizada falló y por qué?
3. ¿El sistema destino tiene API o importación de archivos?

### 2.3 Criterios de decisión

| Resultado | Decisión |
|---|---|
| Los criterios del plan de O1 se cumplen | Continuar (es O1) |
| Las empresas ya tienen bots y el dolor es saber cuál falló | Pivotar a V4 (monitoreo) |
| El sistema destino no admite importación y los bots de pantalla fallan seguido | Replantear el vertical |

## 3. V5 — Conciliación (alternativa)

Usar el plan de O11 (`../../oportunidades-saas-ia-cloud-peru/08` §5).

## 4. Cronograma

Igual al de O1: 2 semanas de entrevistas y expedientes, decisión el día 10.

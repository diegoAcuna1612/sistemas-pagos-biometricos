# 03 — Problemas y necesidades del mercado peruano

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Rasgos del contexto

| Rasgo | Efecto | Fuente |
|---|---|---|
| Bancos grandes con equipos DevSecOps propios | El cliente con más presupuesto lo hace internamente | [S1] |
| Demanda de perfiles DevSecOps | Hay mercado laboral; no necesariamente de producto | [S2] |
| Regulación de seguridad de la información y ciberseguridad de la SBS | Puede exigir controles y evidencias en el desarrollo [PI: confirmar norma y artículos] | — |
| Encuestas de adopción sin desglose peruano | No se puede dimensionar la brecha | [S4, S5] |

## 2. Problemas por variante

### 2.1 Evidencias de cumplimiento (V3)

- **Qué pasa hoy [H]:** ante una auditoría (regulador, cliente corporativo, certificación ISO 27001), el equipo reconstruye a mano qué versión se desplegó, qué escaneos se hicieron, qué vulnerabilidades se aceptaron y quién aprobó.
- **Aporte:** el pipeline ya genera esos datos; falta consolidarlos como evidencia firmada y consultable.

### 2.2 Plantillas para pymes de software (V2)

- Equipos pequeños sin especialista DevOps; despliegues manuales [H]. Lo resuelve una plantilla bien hecha o una consultoría corta.

### 2.3 Formación (V5) y vulnerabilidades para el Estado (V4)

- Necesidad real, pero sin evidencia de pago ni obligación identificada.

## 3. Patrones transversales [I]

1. **DevSecOps se implementa, no se compra como un producto aparte.**
2. **El dato de auditoría ya existe en el pipeline;** el valor está en consolidarlo y conservarlo.
3. **Las métricas DORA** (frecuencia de despliegue, tiempo de entrega de cambios, tasa de fallas de cambio, tiempo de recuperación) son el lenguaje común para medir el resultado.

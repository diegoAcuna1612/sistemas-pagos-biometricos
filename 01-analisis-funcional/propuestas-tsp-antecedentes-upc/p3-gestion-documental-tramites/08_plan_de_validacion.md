# 08 — Plan de validación

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Reglas comunes

- Preguntar por el último expediente, no por opiniones.
- **No pedir documentos reales de clientes**: pedir la lista de requisitos y un expediente **ficticio** o totalmente anonimizado.
- Contactar empresas requiere la autorización del equipo.

## 2. V4 — Expedientes con IA (prioridad 1)

### 2.1 Entrevistados

| Perfil | Cantidad |
|---|---:|
| Asesores o jefes de ventas de inmobiliarias (crédito hipotecario) | 3 |
| Analistas de crédito de financieras o cooperativas | 3 |
| Corredores de seguros (siniestros o pólizas) | 2 |

### 2.2 Guía

1. ¿Qué documentos le pides al cliente? ¿Cómo te los envía?
2. ¿Cuántas veces vuelves a pedir algo en un expediente típico? ¿Por qué?
3. ¿Cuánto tardas en revisar un expediente? ¿Cuánto tarda en estar completo?
4. ¿Has perdido clientes por lo largo del proceso?
5. ¿Qué sistema usas (CRM, Excel, correo)?
6. ¿Quién decidiría comprar algo así y qué pagan hoy en software?

### 2.3 Evidencias

- Lista de requisitos por producto.
- Volumen mensual de expedientes y tiempo hasta expediente completo.

### 2.4 Prototipo mínimo

- Formulario + LLM que revisa documentos **ficticios** preparados por el equipo y produce la lista de observaciones. Se muestra al entrevistado en la segunda reunión.

### 2.5 Criterios de decisión

| Resultado | Decisión |
|---|---|
| ≥ 5 de 8 reportan ≥ 2 idas y vueltas por expediente y volumen ≥ 50/mes | **Continuar** con V4 |
| El dolor está en el seguimiento (no saber en qué va el trámite), no en la revisión | **Pivotar a V2/V3** (flujo + código) |
| < 3 de 8 confirman o el CRM ya valida documentos | **Descartar** como producto |

## 3. V2/V3 (plan B)

- 3 entrevistas con secretarías académicas de institutos y 2 con colegios profesionales. Pregunta clave: ¿cuántas solicitudes al mes y cuántas consultas de "en qué va mi trámite"?

## 4. Cronograma

| Semana | Actividad |
|---|---|
| 1 | Lista de 25 contactos; documentos ficticios |
| 2 | 8 entrevistas |
| 3–4 | Prototipo con documentos ficticios |
| 5–6 | Piloto con una empresa (documentos reales solo con acuerdo de confidencialidad y encargo de tratamiento) |

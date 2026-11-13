# 08 — Plan de validación

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Reglas comunes

- Preguntar por la última auditoría o el último incidente de despliegue.
- Contactar empresas requiere la autorización del equipo.

## 2. V3 — Evidencias de cumplimiento (si se quiere explorar como producto)

### 2.1 Primero, la norma (días 1–3)

- Leer la norma SBS vigente de seguridad de la información y ciberseguridad y sus requisitos para el desarrollo y la tercerización [PI].
- **Si no exige evidencias del ciclo de desarrollo, descartar V3** sin entrevistas.

### 2.2 Entrevistados (si la norma lo justifica)

| Perfil | Cantidad |
|---|---:|
| Oficiales de seguridad de fintechs o cooperativas | 3 |
| Jefes de desarrollo de proveedores de bancos | 3 |
| Auditor de TI | 1 |

### 2.3 Guía

1. ¿Qué te pidieron en la última auditoría sobre el desarrollo y los despliegues?
2. ¿Cuántas horas tomó prepararlo? ¿Qué observaciones recibiste?
3. ¿Qué herramientas usan en el pipeline? ¿Qué reportes sacan hoy?

### 2.4 Criterios

| Resultado | Decisión |
|---|---|
| La norma exige evidencias y ≥ 3 de 6 tuvieron observaciones por falta de ellas | Explorar V3 |
| Caso contrario | **Descartar** como producto |

## 3. Validación como TSP (prioridad real)

| Paso | Qué hacer |
|---|---|
| 1 | Conseguir el sistema objeto (trabajo del autor, aplicación de referencia o propia) |
| 2 | Medir la línea base 2–4 semanas: duración del despliegue, fallas, vulnerabilidades |
| 3 | Confirmar con la UPC la modalidad (TSP de experiencia o tesis) |

## 4. Cronograma

| Semana | Actividad |
|---|---|
| 1 | Norma SBS; consulta a la UPC; elección del sistema objeto |
| 2–4 | Línea base de métricas |
| 5+ | Implementación por etapas |

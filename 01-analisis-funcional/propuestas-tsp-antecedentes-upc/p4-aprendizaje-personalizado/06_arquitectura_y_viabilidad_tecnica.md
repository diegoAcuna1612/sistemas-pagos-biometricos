# 06 — Arquitectura y viabilidad técnica

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Principio de diseño

- **El planificador es un algoritmo conocido y auditable** (SM-2 o FSRS para el espaciado; modelo de dominio por tema). La IA solo **propone** preguntas.
- **Ninguna pregunta llega al alumno sin aprobación del docente.**
- **Funciona sin conexión** en el móvil (estudio en transporte) y sincroniza después.

## 2. Arquitectura preliminar

```
Docente (web) ──► Carga de material ──► Generador de preguntas (LLM) ──► Cola de revisión ──► Banco aprobado
                                                                                       │
Alumno (app móvil, offline-first) ◄── Planificador (espaciado + dificultad) ◄──────────┘
        │  respuestas (con tiempo y confianza)
        ▼
Sincronización ──► Registro de intentos ──► Modelo de dominio por tema ──► Panel de academia/docente
```

| Componente | Tecnología sugerida |
|---|---|
| App | Flutter o React Native con base local (SQLite) |
| Backend | Node.js o Python; PostgreSQL multiacademia |
| Espaciado | FSRS (código abierto) o SM-2 como línea base [PI: verificar licencia de FSRS] |
| Generación | LLM vía API con salida estructurada (enunciado, 4 opciones, clave, explicación, tema, fuente en el material) |
| Analítica | Agregados por tema y alumno |

## 3. MVP (10–12 semanas, estimación [H])

1. Academias, cursos, temas, docentes y alumnos (multiempresa).
2. Carga de material y generación de preguntas con referencia a la página fuente.
3. Revisión docente (aprobar, editar, descartar).
4. App con sesiones diarias, espaciado y modo sin conexión.
5. Simulacro cronometrado.
6. Panel: dominio por tema, alumnos en riesgo, preguntas con mayor error.

## 4. Métricas

| Métrica | Uso |
|---|---|
| Retención a 7 y 28 días (preguntas no vistas desde la última sesión) | Resultado principal |
| Puntaje en simulacro pre/post | Rendimiento |
| Tiempo de estudio para un nivel de dominio | Eficiencia |
| % de preguntas IA aprobadas sin cambios; errores detectados | Calidad de la generación |
| Minutos del docente por pregunta aprobada | Costo del contenido |

## 5. Costos [H]

| Concepto | Estimación |
|---|---|
| Generar 100 preguntas desde un capítulo | Centavos a pocos dólares según el modelo |
| Infraestructura del MVP | USD 30–80 al mes |

## 6. Privacidad

- Datos de rendimiento de estudiantes: datos personales (Ley 29733) [I].
- Menores de edad (V5): consentimiento de padres; fuera del MVP.
- Material del docente: derechos de autor; la academia declara que tiene derecho a usarlo.

## 7. Riesgos técnicos

| Riesgo | Mitigación |
|---|---|
| Preguntas con errores (especialmente médicas) | Revisión docente obligatoria; reporte de errores del alumno |
| Conflictos de sincronización | Registro de intentos solo de inserción; el planificador recalcula |
| Pocos datos para personalizar | Valores iniciales por tema; FSRS funciona con pocos intentos [PI] |

## 8. ¿Requiere algo desproporcionado?

**No en tecnología.** Sí en **tiempo**: la retención necesita un experimento de al menos 4 semanas (`11` §7).

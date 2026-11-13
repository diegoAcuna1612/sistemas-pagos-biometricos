# 13 — Iteración 2: matriz reevaluada y recomendación (P4)

**Fecha:** 05/11/2026. Base: `09_matriz_de_evaluacion.md` y `12_innovacion_y_diferenciacion_competitiva.md`.

## 1. Reglas (sin cambios)

Misma matriz y pesos (P 20% · D 20% · Dif 15% · A 15% · T 10% · R 10% · E 5% · N 5%). D ≤ 3 sin entrevistas, salvo clientes pagando por la misma solución en Perú (no es el caso: `12` §3).

## 2. Puntaje

| Criterio | Peso | V3 Academias (it. 1) | **V6 Prueba docente (it. 2)** | Cambio | Justificación |
|---|---:|---:|---:|---|---|
| P | 20% | 3 | **4** | +1 | Más de 223 000 rindieron y menos de 30% aprobó [N2]; alto impacto en la carrera. No es 5: la frecuencia es anual |
| D | 20% | 3? | 3? | = | Hay oferta pagada de preparación [N5], pero no de la misma solución; tope sin entrevistas |
| Dif | 15% | 3 | 3 | = | Calibración TRI y probabilidad de aprobar no identificadas en competidores; la técnica es conocida. El activo de datos aún no existe |
| A | 15% | 3 | **4** | +1 | Docentes alcanzables en grupos y comunidades masivas; población grande y visible [N1] |
| T | 10% | 3 | 3 | = | App sin conexión + TRI + banco revisado: viable, con arranque en frío |
| R | 10% | 4 | **3** | −1 | B2C por temporada (nombramiento, ascenso, directivos) |
| E | 5% | 4 | **3** | −1 | Examen peruano; hay concursos docentes en Colombia (Geard opera allí [N5]) y en otros países [I] |
| N | 5% | 4 | 4 | = | Adultos; datos personales comunes; contenido propio |
| **Total** | | **64** | **68** | **+4** | |

## 3. Qué mejora y qué no

- **Mejora:**
  - Problema y acceso: el mercado está **verificado y es grande**.
- **Empeora:**
  - Recurrencia y expansión: es B2C, por temporada y local.
- **No cambia:**
  - Demanda: tope sin entrevistas.
  - Diferenciación: la ventaja de datos se construye con el tiempo; hoy es una promesa.
  - Viabilidad técnica y normativo.

## 4. Comparación con O1 (70) y O2 (71)

P4-V6 (68) queda a 2–3 puntos, dentro del margen de error. **Es la propuesta con el mercado más grande y mejor documentado** de las 8.

## 5. Sensibilidad

| Escenario | Efecto |
|---|---|
| 100+ docentes pagan una preventa antes de la próxima prueba (D 3 → 4) | Sube a 72 |
| Tras un concurso, la predicción acierta con error bajo y hay 1 000+ resultados reales (Dif 3 → 4) | Sube a 71 |
| Ambos | **75** |
| Una institución licencia para sus afiliados (R 3 → 4) | +2 |
| Geard lanza un simulador adaptativo (Dif 3 → 2) | Baja a 65 |

## 6. Viabilidad como TSP (actualizada)

| Criterio | It. 1 | It. 2 | Comentario |
|---|---|---|---|
| Problema concreto | Medio-alto | **Alto** | Una prueba nacional con estructura conocida |
| Medición | Alta | **Muy alta** | Error de calibración, validez predictiva, ganancia de aprendizaje, exactitud del test adaptativo |
| Datos sin cliente | Media | **Media-alta** | Validar el algoritmo con examinados simulados (práctica estándar en TRI) + piloto con 100–300 docentes voluntarios |
| Ética | Estudiantes | **Adultos voluntarios** | Consentimiento informado; consultar a la UPC |

**Preguntas de investigación sugeridas:**
- **PI1:** ¿Con cuántas preguntas adaptativas se estima el nivel por subprueba con un error estándar menor a un umbral, frente a un simulacro fijo?
- **PI2:** ¿Qué tan bien predice el sistema la aprobación real? Medido con los resultados oficiales compartidos voluntariamente.

**Objetivos específicos sugeridos:**
1. Construir un banco de ≥ 600 ítems alineados al temario, revisados por 2 expertos.
2. Implementar la calibración (Rasch/2PL) y el test adaptativo; validar con simulación.
3. Piloto con ≥ 100 docentes: estabilidad de la estimación y usabilidad (SUS ≥ 70).
4. App sin conexión: 0 respuestas perdidas en pruebas con cortes de red.
5. Si los plazos del concurso lo permiten: validez predictiva con resultados reales.

## 7. Recomendación actualizada

**Si se elige P4, cambiar a V6 (Prueba Nacional docente).** Sube 4 puntos, tiene el mercado más grande y verificable y es un TSP de investigación sólido. Su debilidad es comercial: B2C por temporada, con competidores que regalan simulacros.

**Validación de 2 semanas:**

| Día | Acción | Criterio de corte |
|---|---|---|
| 1–3 | Revisar el calendario de concursos 2026–2027 y los temarios vigentes | Si no hay concurso en los próximos 9 meses: postergar |
| 2–7 | Publicar un diagnóstico gratuito de 20 preguntas en 3 grupos de docentes | **< 200 diagnósticos completados: descartar** |
| 5–10 | Ofrecer una preventa (precio de temporada) a quienes completaron el diagnóstico | ≥ 2% de conversión: continuar |
| 5–10 | 6 entrevistas a docentes que rindieron en 2024 o 2025 (`08` §2.2, adaptada) | ≥ 4 describen no saber qué estudiar |

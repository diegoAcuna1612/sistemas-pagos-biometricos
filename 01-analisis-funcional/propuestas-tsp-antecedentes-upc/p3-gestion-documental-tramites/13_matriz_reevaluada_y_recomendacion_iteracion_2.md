# 13 — Iteración 2: matriz reevaluada y recomendación (P3)

**Fecha:** 05/11/2026. Base: `09_matriz_de_evaluacion.md` y `12_innovacion_y_diferenciacion_competitiva.md`.

## 1. Reglas (sin cambios)

Misma matriz y pesos (P 20% · D 20% · Dif 15% · A 15% · T 10% · R 10% · E 5% · N 5%). D ≤ 3 sin entrevistas.

## 2. Puntaje

| Criterio | Peso | V4 Expedientes genéricos (it. 1) | **V7 Techo Propio (it. 2)** | Cambio | Justificación |
|---|---:|---:|---:|---|---|
| P | 20% | 3 | **4** | +1 | Plazo de 30 días y cupo que se agota [N4]: el expediente incompleto cuesta una obra |
| D | 20% | 3? | 3? | = | Tope sin entrevistas |
| Dif | 15% | 3 | 3 | = | Reglas públicas por convocatoria; no se identificó un competidor, pero es copiable por un desarrollador local |
| A | 15% | 3 | **4** | +1 | 1 221 entidades técnicas autorizadas y listadas [N2] |
| T | 10% | 3 | 3 | = | Extracción + motor de reglas, igual que antes |
| R | 10% | 4 | **3** | −1 | Uso concentrado en las convocatorias (dos en 2025 [N2, N3]) |
| E | 5% | 4 | **2** | −2 | Programa peruano; hay programas parecidos en otros países, con otras reglas [I] |
| N | 5% | 4 | **3** | −1 | Datos personales de familias vulnerables |
| **Total** | | **64** | **66** | **+2** | |

## 3. Qué mejora y qué no

- **Mejora:**
  - Problema (+1): la urgencia ahora es verificable.
  - Acceso (+1): los clientes se pueden listar.
- **Empeora:**
  - Recurrencia, expansión y normativo: es un nicho estacional, local y con datos sensibles.
- **No cambia:**
  - Demanda: sin entrevistas.
  - Diferenciación.
  - Viabilidad técnica.

## 4. Comparación con O1 (70) y O2 (71)

P3-V7 (66) **sigue por debajo**. Gana urgencia y acceso, pero pierde recurrencia y mercado.

## 5. Sensibilidad

| Escenario | Efecto |
|---|---|
| ≥ 3 entidades técnicas confirman expedientes perdidos por observación o plazo y 1 paga un piloto (D 3 → 4) | Sube a 70 |
| El armado en campo (alternativa B) extiende el uso fuera de las convocatorias (R 3 → 4) | Sube a 68 |
| El Fondo incorpora la validación en su plataforma (Dif 3 → 1) | **Queda excluida** |

## 6. Viabilidad como TSP (actualizada)

| Criterio | It. 1 | It. 2 | Comentario |
|---|---|---|---|
| Originalidad | Media-alta (con IA) | **Alta** | Validación normativa de expedientes de un programa social, con reglas versionadas |
| Datos sin cliente | Alta (sintéticos) | **Alta** | Familias y documentos sintéticos; reglas públicas [N1] |
| Impacto | Medio | **Alto** | Vivienda social; fácil de explicar al jurado |
| Riesgo | Bajo | Bajo | Sin datos reales en el prototipo |

**Objetivos específicos sugeridos:**
1. Modelar como reglas versionadas los requisitos de dos convocatorias de 2025.
2. Validar expedientes sintéticos. Criterio: detectar ≥ 95% de los errores sembrados con ≤ 5% de falsas alarmas.
3. Medir el tiempo de armado por expediente frente al proceso manual (experimento con 2–3 personas).
4. Implementar la app de campo sin conexión con sincronización sin pérdidas.

## 7. Recomendación actualizada

**Si se elige P3, cambiar a V7 (Techo Propio).** Es más concreta y más original que la versión municipal y que la genérica. Comercialmente sigue debajo de O1 y O2.

**Validación de 2 semanas:**

| Día | Acción | Criterio de corte |
|---|---|---|
| 1–3 | Leer la RM 0104-2025 y las resoluciones de convocatoria; listar 30 entidades técnicas | — |
| 3–8 | 6 entrevistas con gerentes o tramitadores de entidades técnicas | **< 2 reportan expedientes perdidos por plazo u observación: descartar** |
| 5–10 | Preguntar al Fondo Mivivienda (o revisar su plataforma) si ya valida la completitud antes del ingreso | Si ya lo hace: pasar a la alternativa B o descartar |

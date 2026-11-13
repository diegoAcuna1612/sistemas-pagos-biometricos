# 13 — Iteración 2: matriz reevaluada y recomendación (P7)

**Fecha:** 05/11/2026. Base: `09_matriz_de_evaluacion.md` y `12_innovacion_y_diferenciacion_competitiva.md`.

## 1. Reglas (sin cambios)

Misma matriz y pesos (P 20% · D 20% · Dif 15% · A 15% · T 10% · R 10% · E 5% · N 5%). D ≤ 3 sin entrevistas.

## 2. Puntaje

| Criterio | Peso | V3 Evidencias (it. 1) | **V6 Proveedores SBS (it. 2)** | Cambio | Justificación |
|---|---:|---:|---:|---|---|
| P | 20% | 3 | **4** | +1 | Obligación anual de acreditar controles del proveedor [N1]; confianza baja: resumen de terceros, no el texto oficial |
| D | 20% | 3? | 3? | = | Tope sin entrevistas |
| Dif | 15% | 3 | 3 | = | Mapeo SBS + evidencia nativa del pipeline + cuestionarios peruanos; Hackmetrix ya cubre ISO en la región [N4] |
| A | 15% | 2 | **3** | +1 | Proveedores de software y servicios: más numerosos y accesibles que las entidades reguladas [I] |
| T | 10% | 3 | 3 | = | Conectores + mapeo + lectura de cuestionarios |
| R | 10% | 4 | 4 | = | Suscripción; obligación anual |
| E | 5% | 3 | 3 | = | Cada país tiene su regulador; ISO es común |
| N | 5% | 3 | 3 | = | Evidencias de seguridad sensibles |
| **Total** | | **59** | **66** | **+7** | |

## 3. Qué mejora y qué no

- **Mejora:**
  - Problema y acceso (+1 cada uno): se cambió de cliente, de la entidad regulada a su proveedor, y apareció un motor regulatorio.
  - Es la **mayor subida** de las 8 propuestas.
  - También es **la menos verificada**: depende de un resumen legal [N1].
- **No cambia:**
  - Demanda: sin entrevistas.
  - Diferenciación: el competidor regional existe.
  - Viabilidad técnica, recurrencia, expansión y normativo.

## 4. Comparación con O1 (70) y O2 (71)

P7-V6 (66) **sigue por debajo**, pero deja de ser la última. Si el texto oficial no confirma la obligación anual para el proveedor, vuelve a ~62.

## 5. Sensibilidad

| Escenario | Efecto |
|---|---|
| El texto consolidado no confirma la verificación anual (P 4 → 3) | Baja a 62 |
| ≥ 3 proveedores muestran cuestionarios de 2+ bancos con más de 100 preguntas (D 3 → 4) | Sube a 70 |
| Hackmetrix lanza mapeo SBS en Perú (Dif 3 → 2) | Baja a 63 |

## 6. Viabilidad como TSP (actualizada)

| Criterio | It. 1 | It. 2 | Comentario |
|---|---|---|---|
| Encaje | Alto como implementación en un trabajo real | **Alto** | Pipeline DevSecOps + capa de evidencias + respuesta asistida a cuestionarios |
| Medición | Alta (DORA) | **Alta** | DORA + horas por cuestionario + % de respuestas con evidencia trazable |
| Datos sin cliente | Media | Media | Cuestionarios de ejemplo basados en ISO 27001; pipeline de una aplicación propia |
| Originalidad | Media-baja | **Media** | La respuesta con citas a evidencias del pipeline es menos común que "implementar DevSecOps" |

**Objetivos específicos sugeridos (complementan `11` §6):**
1. Implementar el pipeline con evidencias inmutables por versión.
2. Mapear ≥ 30 controles a ISO 27001 y a los artículos aplicables de la SBS 504-2021.
3. Responder un cuestionario de ≥ 100 preguntas. Criterio: ≥ 80% de respuestas con evidencia citada, aprobadas por un revisor.
4. Reducir ≥ 60% las horas de respuesta frente a la línea base manual.

## 7. Recomendación actualizada

**P7 sigue sin ser la mejor opción comercial**, pero V6 la vuelve defendible. **Es la mejor opción si el autor trabaja en una casa de software que atiende bancos:** encaja con un TSP de experiencia profesional y tiene cliente propio.

**Validación de 2 semanas:**

| Día | Acción | Criterio de corte |
|---|---|---|
| 1–3 | Leer la Res. SBS 504-2021 consolidada (artículos de servicios de terceros) | **Si no exige acreditación periódica del proveedor: descartar V6** |
| 3–8 | 6 entrevistas a responsables de seguridad o gerentes de casas de software y fintechs que atienden bancos | ≥ 3 reciben cuestionarios anuales de 2+ clientes |
| 6–10 | Pedir un cuestionario real (anonimizado) y responderlo con el prototipo | Tiempo frente a su línea base |

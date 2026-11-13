# 13 — Iteración 2: matriz reevaluada y recomendación (P2)

**Fecha:** 05/11/2026. Base: `09_matriz_de_evaluacion.md` y `12_innovacion_y_diferenciacion_competitiva.md`.

## 1. Reglas (sin cambios)

Misma matriz y pesos (P 20% · D 20% · Dif 15% · A 15% · T 10% · R 10% · E 5% · N 5%). D ≤ 3 sin entrevistas. Un criterio cambia solo con fuente o mecanismo nuevo.

## 2. Puntaje

| Criterio | Peso | V3 Evidencias (it. 1) | **V6 Accesibilidad (it. 2)** | Cambio | Justificación |
|---|---:|---:|---:|---|---|
| P | 20% | 4 | **3** | −1 | La obligación existe [N1], pero no se sabe si se fiscaliza ni si aparece en los contratos |
| D | 20% | 3? | 3? | = | Tope sin entrevistas |
| Dif | 15% | 2 | **3** | +1 | Informe mapeado al lineamiento + recorridos de trámites + revisión manual guiada; las herramientas libres no lo dan. Xray debilitó V3 [N6] |
| A | 15% | 3 | 3 | = | Proveedores accesibles; entidades difíciles |
| T | 10% | 4 | 4 | = | Motores libres + recorridos con Playwright |
| R | 10% | 3 | **4** | +1 | Monitoreo continuo por sitio y por versión |
| E | 5% | 3 | **4** | +1 | WCAG es global; otros países de la región tienen normas similares [I] |
| N | 5% | 3 | **4** | +1 | Páginas públicas; sin datos bancarios |
| **Total** | | **63** | **66** | **+3** | |

## 3. Qué mejora y qué no

- **Mejora:**
  - Diferenciación, recurrencia, expansión y normativo: la nueva variante tiene cliente, motor regulatorio y datos menos sensibles.
- **Empeora:**
  - Problema (−1): la obligación no garantiza dolor si no se fiscaliza.
- **No cambia:**
  - Demanda: sin entrevistas.
  - Acceso y viabilidad técnica.

## 4. Comparación con O1 (70) y O2 (71)

P2-V6 (66) **sigue por debajo** de O1 y O2. Es la propuesta que más cambió de enfoque: pasó de un mercado sin motor de compra a uno con obligación normativa.

## 5. Sensibilidad

| Escenario | Efecto |
|---|---|
| ≥ 3 de 10 bases de contratación recientes exigen WCAG (P 3 → 4) | Sube a 70 |
| Se confirma que el art. 23 obliga a privados que atienden por web (A 3 → 4) | Sube a 69 |
| Ambos | **73** |
| Nadie exige accesibilidad en contratos (P 3 → 2, D 3 → 2) | Baja a 58 |

## 6. Viabilidad como TSP (actualizada)

| Criterio | It. 1 | It. 2 | Comentario |
|---|---|---|---|
| Originalidad | Riesgo alto (antecedente casi idéntico) | **Alta** | Accesibilidad en servicios públicos peruanos; otro problema y otro cliente |
| Datos sin cliente | Media | **Muy alta** | Se pueden evaluar portales públicos del Estado de forma pasiva, a ritmo bajo y sin datos personales |
| Medición | Alta | **Alta** | Violaciones por criterio; cobertura automática frente a una auditoría manual de referencia; regresiones por versión |

**Pregunta de investigación sugerida:** ¿Qué proporción de los criterios WCAG 2.2 del lineamiento puede verificarse automáticamente en trámites reales del Estado, y cuánto tiempo ahorra la revisión guiada frente a una auditoría manual?

**Objetivos específicos sugeridos:**
1. Evaluar una muestra de ≥ 30 portales o trámites públicos y reportar el estado por criterio.
2. Implementar recorridos automáticos de ≥ 5 trámites típicos con informe mapeado al lineamiento.
3. Comparar con una auditoría manual de referencia en 5 trámites; reportar sensibilidad y precisión de la detección automática.
4. Reducir ≥ 50% el tiempo de auditoría con la revisión guiada.
5. Integrar al pipeline CI de una aplicación de ejemplo: 0 regresiones de nivel A no detectadas.

## 7. Recomendación actualizada

**Si se elige P2, cambiar a V6 (accesibilidad).** Así se resuelve el problema de originalidad frente al antecedente UPC y P2 gana un motor de demanda.

**Validación de 2 semanas:**

| Día | Acción | Criterio de corte |
|---|---|---|
| 1–3 | Revisar 10 bases de contratación de software del Estado de 2025–2026 buscando requisitos de accesibilidad [PI] | **0 de 10: descartar V6 como negocio** (se mantiene como TSP) |
| 1–3 | Leer la RSGTD 001-2025 completa y el art. 23 de la Ley 29973 | Confirmar plazos, fiscalización y alcance privado |
| 3–8 | 6 entrevistas: 3 proveedores de software del Estado, 2 jefes de OGTI, 1 especialista de accesibilidad | ≥ 3 reportan que se lo exigen o se lo exigirán |
| 8–10 | Prototipo sobre 3 portales públicos; mostrar el informe | ≥ 2 piden repetirlo en su sistema |

# 11 — Recomendación final

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Decisión

**No desarrollar un sistema de trámite documentario para municipalidades ni uno genérico.** Si se elige P3, **validar V4 — Recepción y validación de expedientes de clientes con IA** para empresas privadas.

**Respuesta honesta:** como producto, P3 tiene viabilidad **baja-media** (64). El flujo de trámites ya es gratuito en el sector público [S3, S4] y común en el privado. Solo la validación del contenido aporta algo nuevo, y eso la acerca a O1/O3 y a P6.

## 2. Por qué V4 y no la versión municipal

| Criterio | Municipal (V1) | V4 |
|---|---|---|
| Alternativa gratuita | **Sí** (SGD-PCM) | No |
| Comprador | Compra pública, evaluación formal | Gerente comercial |
| Qué automatiza | Flujo (ya resuelto) | Revisión del contenido |
| Originalidad para el TSP | Baja | Media-alta |

## 3. Las 10 respuestas

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | Producto | Portal para que el cliente suba documentos con validación automática (completo, vigente, coherente, legible) y seguimiento por código |
| 2 | Cliente | Inmobiliarias, financieras y cooperativas pequeñas, corredores de seguros |
| 3 | Problema | Expedientes incompletos e idas y vueltas [H] |
| 4 | Referencia | IDP (Rossum, Nanonets); flujo: SGD-PCM como referencia funcional [S3] |
| 5 | Diferenciador | Reglas de requisitos por producto con validación del contenido |
| 6 | Cobro | Por expediente con mínimo mensual [H] |
| 7 | MVP | `06` §3 |
| 8 | Primeros entrevistados | Asesores inmobiliarios, analistas de crédito, corredores |
| 9 | Validar en 2 semanas | Idas y vueltas por expediente y volumen mensual |
| 10 | Continuar / pivotar / descartar | `08` §2.5 |

## 4. Plan de dos semanas

| Día | Acción | Salida |
|---|---|---|
| 1–3 | Documentos ficticios; resolver P3 de `10` | Materiales |
| 2–8 | 8 entrevistas | Idas y vueltas, volumen, abandono |
| 8–10 | Prototipo con documentos ficticios | Reacción en 2ª reunión |
| 10 | Decisión | V4, V2/V3 o descarte |

## 5. Riesgos

| Riesgo | Qué se hace |
|---|---|
| Datos personales sensibles | Encargo de tratamiento; retención mínima; datos sintéticos en el TSP |
| Solapamiento con P6 y O1/O3 | Elegir una sola propuesta del patrón "documento → datos" |
| El tema parece "otro sistema de trámites" | Formular el aporte como validación inteligente medible |

## 6. Relación con el proyecto académico (TSP UPC)

- **Encaje: medio.** La versión municipal repite un tema frecuente y enfrenta software gratuito; un jurado puede preguntar por qué no usar el SGD-PCM.
- **Si se mantiene el antecedente municipal (S1):** reformular como **validación automática de requisitos del TUPA** en la mesa de partes (¿el expediente cumple los requisitos antes de derivarlo?), integrable con el SGD-PCM, no como sistema nuevo [I].
- **Objetivos específicos sugeridos (V4):**
  1. Caracterizar el proceso de recepción en ≥ 3 empresas.
  2. Implementar el flujo con máquina de estados y seguimiento por código.
  3. Clasificar y extraer 5 tipos de documentos sintéticos; criterio: exactitud ≥ 95% por campo crítico.
  4. Reducir ≥ 40% los minutos de revisión en un experimento con analistas.
  5. Cumplir el diseño de privacidad (evaluación de impacto, borrado verificable).
- **Riesgo institucional [S10]:** confirmar con la UPC si el TSP debe basarse en la experiencia laboral del autor.

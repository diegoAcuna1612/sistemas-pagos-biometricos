# 07 — Viabilidad académica: TSP en la UPC

## 1. Requisitos confirmados vs. por consultar

| Tema | Estado | Detalle | Fuente |
|---|---|---|---|
| Modalidades de sustentación | **Confirmado** | La UPC ofrece **Tesis** o **Trabajo de Suficiencia Profesional (TSP)**, además de un Programa de Titulación si la carrera lo ofrece | [F38] (Explora UPC) |
| Requisito previo | **Confirmado** | Grado de Bachiller y tema aprobado y vigente | [F38] |
| Costo del trámite de sustentación | **Confirmado** | S/ 2 122,00 | [F38] |
| Normativa aplicable | Identificada, no leída | SICA-REG-06 (Reglamento General de Grado de Bachiller y Título Profesional) y SICA-REG-34 (normas sobre las características de trabajos de investigación, tesis y TSP). Existe un documento de "Lineamientos del Programa de Titulación a través del TSP" aplicable a pregrado y EPE (excepto Medicina y Arquitectura); solo se pudo leer su introducción | [F39] |
| ¿El TSP exige acreditar experiencia profesional (años) o un vínculo con una organización? | **POR CONSULTAR** | No se encontró en las fuentes de la UPC. En otras universidades peruanas el TSP suele exigir experiencia: UDEP pide 2 años; PUCP Comunicaciones, 2 años desde el egreso (2025). **Esto no son reglas de la UPC** | [F40] |
| ¿Puede hacerse entre dos personas? | **POR CONSULTAR** | La página de la UPC menciona "integrantes del grupo" solo para tesis | [F38] |
| ¿Se acepta un proyecto independiente (no ligado al empleo actual)? | **POR CONSULTAR** | Es crítico, por la confidencialidad del trabajo actual del autor | — |
| ¿Se requiere revisión de un comité de ética para usar datos biométricos de voluntarios? | **POR CONSULTAR** | — | — |

**Riesgo académico principal (I):** en el Perú, el TSP suele concebirse como un informe sobre **experiencia profesional**. Si la UPC lo exige así, un proyecto independiente podría no encajar, y la **tesis** (o el Programa de Titulación) sería la vía correcta. **Hay que confirmarlo antes de invertir tiempo de desarrollo.**

**Preguntas exactas para el coordinador:**
1. ¿El TSP de Ingeniería de Software puede consistir en el desarrollo de un prototipo de software independiente, no vinculado a una organización empleadora?
2. ¿Se exige un mínimo de experiencia profesional? ¿Cuánta y cómo se acredita?
3. ¿Puede desarrollarse en pareja?
4. ¿Qué evidencia experimental se espera?
5. ¿El uso de datos biométricos de voluntarios requiere aprobación ética institucional?
6. ¿Dónde se obtiene la versión vigente de SICA-REG-34 y de los lineamientos del TSP?

## 2. Delimitación del trabajo

| Alternativa | Medible | Dependencias externas | Riesgo de alcance | Evaluación |
|---|---|---|---|---|
| A. Sistema completo de pagos biométricos | Sí | **Alta** (proveedor real, regulación) | Muy alto | No recomendada |
| **B. Prototipo de autorización de pagos con huella y transacciones simuladas** | Sí | Baja (solo el lector) | Medio | **Recomendada (núcleo)** |
| C. Integración biométrica con un proveedor en sandbox | Parcial | Media (acceso al sandbox) | Medio | Opcional, como extensión de B |
| **D. Evaluación experimental de identificación y autorización biométrica** | **Sí (fuerte)** | Baja | Bajo | **Recomendada (componente de investigación)** |

**Recomendación:** combinar **B + D**. Se construye el prototipo con el motor de transacciones simulado y se evalúa experimentalmente. C es opcional si sobra tiempo.

## 3. Propuesta de investigación

**Título propuesto:**
*Prototipo de autorización de pagos presenciales mediante verificación de huella dactilar con detección de presentación: diseño, implementación y evaluación experimental en transacciones simuladas.*

**Problema:**
En el Perú no existe una solución documentada que permita autorizar pagos presenciales mediante huella dactilar sin presentar tarjeta ni celular. Tampoco hay evidencia local sobre la precisión, los tiempos, la resistencia a suplantación y la aceptación de este mecanismo en un flujo de compra.

**Objetivo general:**
Diseñar, implementar y evaluar un prototipo que autorice pagos presenciales simulados mediante la verificación de la huella dactilar, midiendo su desempeño biométrico, su seguridad y su usabilidad.

**Objetivos específicos:**
1. Diseñar una arquitectura que separe la identificación biométrica, la intención de pago y la autorización transaccional.
2. Implementar el registro biométrico con consentimiento, la verificación 1:1 y un motor de transacciones simulado con idempotencia y auditoría.
3. Medir FAR/FMR, FRR/FNMR, FTA, tiempos y la tasa de detección de ataques de presentación.
4. Evaluar la usabilidad (SUS) y la intención de uso con voluntarios.
5. Comparar la verificación 1:1 con la identificación 1:N en el mismo conjunto de datos.

**Preguntas de investigación:**
- PI1: ¿Qué FNMR y FMR alcanza el prototipo en el umbral operativo elegido, con el lector y el motor seleccionados?
- PI2: ¿Cuál es el tiempo total de una compra simulada con huella frente a un pago con QR simulado?
- PI3: ¿Qué proporción de huellas falsas artesanales detecta el lector?
- PI4: ¿Cómo cambia la tasa de falsa identificación al pasar de 1:1 a 1:N con N creciente?
- PI5: ¿Cuál es la usabilidad percibida (SUS) y la intención de uso?

**Indicadores, metodología y criterios:** ver `08_riesgos_y_plan_experimental.md`.

**Metodología de desarrollo:** iterativa (Scrum ligero), con las 6 etapas de `10`.

**Alcance razonable para dos estudiantes (I):**
- Un lector y un terminal.
- 30–60 voluntarios.
- Dinero simulado.
- Unas 18 semanas en total, incluido el informe (ver `10`).

## 4. Limitaciones a declarar en el informe
- La muestra es pequeña: **no** demuestra seguridad de nivel comercial.
- El motor es abierto y no está evaluado por NIST para este caso.
- No hay integración financiera real.
- La modalidad huella va contra la tendencia del mercado hacia palma y rostro sin contacto (ver `01`, `03`).

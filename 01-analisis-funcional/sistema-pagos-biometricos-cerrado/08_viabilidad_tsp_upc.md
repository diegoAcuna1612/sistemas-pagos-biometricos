# 08 — Viabilidad como TSP de la UPC

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Requisitos institucionales

**No se encontró documentación nueva de la UPC.** Lo verificado sigue siendo lo de la investigación general (`../sistema-pagos-biometricos-general/investigacion_pagos_biometricos/07_viabilidad_tsp_upc.md`).

| Tema | Estado | Fuente |
|---|---|---|
| Modalidades: tesis o TSP | **Oficial (UPC)** | [F38] |
| Requisito previo: bachiller y tema aprobado | **Oficial (UPC)** | [F38] |
| Costo del trámite: S/ 2 122 | **Oficial (UPC)** | [F38] |
| Normas internas SICA-REG-06 y SICA-REG-34; lineamientos del programa de titulación por TSP | Existen; **no se leyeron** | [F39] |
| Base legal general: el título profesional requiere tesis o TSP (Ley Universitaria 30220, art. 45) | Citado en la directiva de otra universidad (no se leyó la ley) | [C22] |
| Experiencia profesional mínima | **No encontrado para la UPC.** Otras universidades: PUCP Comunicaciones 3 años (2021) o 2 años (2025); UNPRG 18 meses; UDEP 2 años | [C22, F40] |
| Trabajo en pareja, proyecto independiente, comité de ética | **No encontrado** | — |

**Riesgo principal (sin cambios):** si la UPC concibe el TSP como un informe de experiencia profesional, este proyecto encajaría mejor como **tesis**. Hay que confirmarlo antes de desarrollar (E9 de `09`).

## 2. Por qué esta versión es mejor tema que la de pagos

| Criterio | Pagos biométricos (versión general) | Sistema cerrado de consumos |
|---|---|---|
| Dependencia de terceros financieros | Alta (adquirente, SBS) | **Ninguna** (modelo pospago) |
| Problema concreto y delimitado | Difuso | **Concreto:** atribuir consumos y conciliar |
| Posibilidad de validar con usuarios | Baja | **Media:** comedores accesibles para entrevistas |
| Complejidad de ingeniería | Alta | Alta: hardware, sin conexión, idempotencia, multiempresa, privacidad |
| Riesgo legal en el prototipo | Medio | Bajo con datos sintéticos; medio con voluntarios |
| Competencia | No es relevante para el TSP | Es relevante como justificación (hay que diferenciarse, `01`) |

## 3. ¿Hacen falta datos biométricos reales?

**No para todo.** Se propone **separar** la demostración del producto de la evaluación biométrica:

| Parte | Datos | Riesgo | Qué demuestra |
|---|---|---|---|
| **A. Flujo de negocio y arquitectura** | Personas, consumos y credenciales **sintéticos**; un lector real solo en la demostración, con la huella de los propios autores (consentimiento propio) | Bajo | Registro de consumos, políticas, sin conexión, idempotencia, multiempresa, auditoría, reportes, borrado |
| **B. Evaluación biométrica** | **B1:** bases públicas de huellas para investigación (por ejemplo, las de las competencias FVC de la Universidad de Bolonia o bases del NIST). **No verificado en esta investigación: confirmar disponibilidad y licencia.** **B2:** 20–40 voluntarios con consentimiento escrito, protocolo de borrado y, si la UPC lo exige, aprobación ética | Bajo (B1) / medio (B2) | FMR, FNMR, FTE, tiempos; comparación de 1:1 y 1:N |
| **C. Validación del problema** | Entrevistas (sin biometría) | Bajo | Que el problema existe y cómo se resuelve hoy |

**Ventaja:** si la UPC no aprueba el uso de voluntarios, o lo retrasa, el proyecto puede demostrarse con A + C + B1.

## 4. Formulación inicial

**Título propuesto:**
*Sistema de registro y conciliación de consumos para comedores de organizaciones cerradas con identificación multicredencial y verificación biométrica opcional: diseño, implementación y evaluación.*

**Problema:**
Los comedores corporativos, universitarios y concesionados necesitan atribuir cada consumo a la persona correcta y conciliarlo con la planilla, el subsidio o la facturación. Las credenciales tradicionales (fotocheck, ticket, carné) pueden prestarse o perderse. Las soluciones biométricas existentes vienen ligadas a un proveedor de asistencia y a su hardware [C1]. Además, el uso de huellas está sujeto a exigencias de consentimiento libre y proporcionalidad (DS 016-2024-JUS, art. 3.2) [C16].

*Nota:* la magnitud del problema en Perú **no está demostrada**. La formulación debe ajustarse con los resultados de las entrevistas (E2).

**Objetivo general:**
Diseñar, implementar y evaluar un sistema que registre y concilie consumos en comedores de organizaciones cerradas con varias credenciales (código, tarjeta o QR y huella opcional). Evaluar su confiabilidad transaccional, su desempeño biométrico y su usabilidad frente a las credenciales tradicionales.

**Objetivos específicos y criterios de aceptación:**

Los umbrales son **criterios de diseño por validar**, no exigencias normativas. Se justifican en `09`.

| # | Objetivo específico | Criterio de aceptación |
|---|---|---|
| OE1 | Caracterizar el proceso actual de registro y conciliación en al menos 3 comedores (entrevistas y observación) | Informe con el proceso, tiempos y problemas por comedor |
| OE2 | Diseñar una arquitectura que separe la identificación, el registro de consumos y la base biométrica, con funcionamiento sin conexión | Documento de arquitectura revisado por el asesor; amenazas y controles trazados |
| OE3 | Implementar el MVP de `05` §7 | Pruebas automáticas: aislamiento entre organizaciones; idempotencia (0 duplicados en 1 000 envíos repetidos); 0 pérdidas con cortes de red simulados |
| OE4 | Implementar el ciclo de vida del dato biométrico (consentimiento, registro, revocación, borrado) | Prueba que demuestra el borrado de las plantillas en la baja y la revocación, con evidencia auditada |
| OE5 | Evaluar el desempeño biométrico (1:1 y 1:N) con el lector y el comparador elegidos | FNMR, FMR (con intervalo de confianza), FTE y tiempos reportados; curva DET |
| OE6 | Comparar el tiempo y los errores de atención con huella, código y tarjeta o QR | Tiempo por persona (mediana, p95) y tasa de error por método |
| OE7 | Evaluar la usabilidad y la aceptación | SUS por rol (cajero, comensal) e intención de uso de la huella |

**Preguntas de investigación:**
- **PI1:** ¿La identificación por huella reduce el tiempo de atención frente al código y la tarjeta o QR en un comedor simulado?
- **PI2:** ¿Qué tasa de falsa identificación tiene el 1:N con galerías por sede (N = 50, 100, 500 si los datos lo permiten) frente al 1:1 con código?
- **PI3:** ¿Qué proporción de usuarios no puede registrar su huella (FTE) y qué proporción elige la alternativa?
- **PI4:** ¿El diseño garantiza cero duplicados y cero pérdidas ante fallos de red?

## 5. Evidencias para el jurado

1. Demostración en vivo: estación con lector → consumo → reporte; corte de red → cola → sincronización sin duplicados.
2. Resultados de las pruebas automáticas (idempotencia, aislamiento, borrado).
3. Métricas biométricas con intervalos de confianza y sus limitaciones.
4. Comparación de métodos de identificación (E4).
5. Resumen de las entrevistas de validación (anonimizado).
6. Análisis legal preliminar y diseño de privacidad (`06`).
7. Evaluación de impacto de protección de datos para el prototipo (DS art. 40) [C16].

## 6. Metodología y calidad

- Iteraciones de 2 semanas (Scrum ligero); alcance congelado tras la iteración 2.
- Calidad: pruebas unitarias y de integración, análisis estático, revisión de código en pareja, OWASP ASVS como lista de control (sin afirmar cumplimiento formal).
- Trazabilidad de requisitos, pruebas y riesgos.

## 7. Alcance para dos estudiantes (I)

| Bloque | Semanas (orientativo) |
|---|---|
| Consulta a la UPC; entrevistas de descubrimiento; prueba de concepto de hardware (`04` §9) | 1–4 |
| Núcleo: organizaciones, personas, credenciales sin huella, políticas, consumos, ajustes, auditoría | 5–9 |
| Agente local, lector, servicio biométrico, consentimiento y borrado | 8–11 |
| Sin conexión y sincronización; reportes y exportación | 10–12 |
| Experimentos E4–E7 | 12–15 |
| Informe y sustentación | 15–18 |

## 8. Riesgos específicos del TSP

| Riesgo | Mitigación |
|---|---|
| La UPC no acepta el proyecto como TSP | Consultar en la semana 1; plan B: tesis |
| Retraso en el hardware | Comprar 2 lectores en la semana 2; el núcleo no depende de la huella |
| No hay acceso a comedores reales | El proyecto se sostiene con A + B1 (§3); las entrevistas fortalecen, no bloquean |
| Ética para voluntarios no aprobada a tiempo | Usar bases públicas (B1), verificando la licencia |
| Exceso de alcance | El MVP de `05` §7 es el límite; la fase 2 queda como trabajo futuro |

## 9. Conclusión

| Dimensión | Valoración |
|---|---|
| Problema concreto y delimitado | Sí (falta su magnitud) |
| Complejidad de ingeniería | **Suficiente:** hardware + agente local, sin conexión, idempotencia, multiempresa, ciclo de vida del dato sensible |
| Innovación | Moderada: la biometría en comedores existe [C1, C6]; el aporte es la arquitectura con la biometría opcional y la evaluación comparativa |
| Posibilidad de validación | Buena con datos sintéticos y bases públicas; mejor con entrevistas |
| Encaje con la modalidad TSP | **Desconocido** hasta consultar a la UPC |

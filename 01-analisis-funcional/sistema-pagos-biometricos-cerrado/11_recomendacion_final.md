# 11 — Recomendación final

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Decisión

### Como negocio: **VALIDAR ANTES DE DESARROLLAR**, con cambio de propuesta

- No hay evidencia suficiente para invertir en un producto comercial.
- La evidencia nueva obliga a **cambiar la propuesta de valor** antes de validarla:

| Antes (`ref-11`) | Ahora |
|---|---|
| "Comedor con huella": la huella como diferenciador | **Registro y conciliación de consumos con varias credenciales**; la huella es una opción |
| Segmento inicial: corporativo o campamento | **Concesionarios medianos** y empresas con comedor; campamentos más adelante |
| Competencia "no investigada" | **Competidor directo en Perú** (GeoVictoria) [C1] |
| Consentimiento libre "a confirmar con abogado" | **Verificado en el reglamento** (DS art. 3.2) [C16]: la alternativa sin huella es obligatoria |

### Como TSP: **CONTINUAR CON CAMBIOS**

- El tema es sólido como proyecto de ingeniería aunque el negocio no se confirme.
- Cambios: el alcance y el título de `08` §4, la separación de la demostración con datos sintéticos y la evaluación biométrica, y la comparación de métodos de identificación como pregunta central.
- **Condición previa:** confirmación escrita de la UPC (E9). Si no lo acepta como TSP, el mismo contenido sirve para una tesis.

## 2. Argumentos

**A favor de seguir:**
1. **El problema existe y alguien paga por resolverlo:** un proveedor regional vende el control de comedor en Perú y muestra clientes conocidos [C1].
2. **No depende de bancos ni de reguladores financieros** con el modelo pospago [F5] (P).
3. **Técnicamente viable** con hardware barato y un comparador abierto [F30, F33, F34].
4. **Hay espacios de diferenciación posibles** (`01` §4): facturación para concesionarios, subsidios con monto, sin conexión, independencia del hardware, privacidad por diseño. Ninguno está validado.
5. **Buen tema académico:** complejidad de ingeniería suficiente y preguntas medibles (`08`).

**En contra:**
1. **Competidor directo con distribución:** GeoVictoria ya ofrece el mismo flujo con huella o rostro, y lo vende sobre su base de asistencia [C1, C3].
2. **La huella no es un diferenciador** y la ley obliga a ofrecer una alternativa (DS art. 3.2) [C16]. El producto debe valer **sin** huella.
3. **El costo del problema no está demostrado** en ninguna organización peruana.
4. **La economía depende del soporte por sede** y de un precio que no se conoce (`07` §4.1).
5. **Riesgos de la huella en trabajadores manuales** [C14], justo en los segmentos con más volumen (minería, industria).

## 3. Alternativas evaluadas

| Alternativa | Descripción | Evaluación |
|---|---|---|
| A. Seguir con "comedor con huella" como está | Producto centrado en la huella | **No recomendada:** no se diferencia de [C1]; la ley obliga a una alternativa |
| **B. Gestión de consumos con varias credenciales, para concesionarios y empresas** | Huella opcional; foco en la conciliación y la facturación | **Recomendada para validar** |
| C. Capa de integración independiente del hardware para quien ya tiene terminales | Software que trabaja con los terminales que ya existen | Posible variante de B; depende de los protocolos de los fabricantes (NV) |
| D. Solo proyecto académico | Sin intención comercial | Plan de respaldo si fallan las puertas G1 o G3 |
| E. Proveedor biométrico para bancos (modelo A de la investigación general) | — | Fuera del alcance de esta etapa |

## 4. Condiciones para continuar

| # | Condición | Plazo | Si no se cumple |
|---|---|---|---|
| 1 | La UPC confirma por escrito la modalidad (TSP o tesis) | Semana 1–2 | Cambiar a tesis |
| 2 | ≥ 3 organizaciones confirman un problema con costo concreto (P1, P6, P7 u P8) | Semana 6 (G1) | Un cambio de segmento; luego, solo académico |
| 3 | ≥ 2 organizaciones aceptan un piloto con pago simbólico o carta de intención | Semana 15 (G3) | Descartar como negocio |
| 4 | Existe una diferencia que el cliente valora frente a GeoVictoria o su proveedor actual | G1–G3 | Descartar como negocio |
| 5 | Opinión legal favorable a la huella opcional en el ámbito laboral, antes del primer piloto con personas reales | Antes del piloto | Producto sin huella |
| 6 | Margen por sede positivo con el precio declarado y las horas reales de soporte | G3 | Descartar como negocio |

## 5. Qué evidencia cambiaría la decisión

| Evidencia nueva | Efecto |
|---|---|
| Concesionarios que concilian a mano con un costo alto y sin un proveedor que lo resuelva | Sube a **Continuar** (negocio) |
| GeoVictoria u otro ya resuelve la facturación por empresa y los subsidios con monto a un precio bajo | Baja a **Descartar** (negocio) |
| E4/E7 muestran que la huella es claramente más rápida y preferida | La huella sube de "opción" a "método principal sugerido" |
| E6 muestra un FTE alto o rechazos frecuentes | Huella secundaria; evaluar el rostro como trabajo futuro |
| La ANPD o un abogado consideran ilegítima la huella incluso opcional en el ámbito laboral | Producto sin huella; el TSP se reorienta a la gestión de consumos |
| La UPC no acepta el TSP | Tesis con el mismo contenido |

## 6. Próximas acciones prioritarias

| # | Acción | Responsable | Plazo | Salida |
|---|---|---|---|---|
| 1 | Consultar a la UPC (preguntas de E9) | Estudiantes | Semana 1 | Respuesta escrita |
| 2 | Decidir a quién contactar y pedir las autorizaciones necesarias; preparar las guías de `03` §3 | Estudiantes | Semana 1 | Lista de contactos y guías |
| 3 | Entrevistas E2, empezando por concesionarios medianos | Estudiantes | Semanas 1–6 | Matriz de hallazgos |
| 4 | Pedir una demostración o cotización de GeoVictoria para conocer sus funciones reales y su precio. **Requiere la autorización de los estudiantes: no se contactó a la empresa** | Estudiantes | Semanas 2–4 | Comparativa real (`01` §3.1) |
| 5 | Comprar 2 lectores y hacer la prueba de concepto (`04` §9) | Estudiantes | Semanas 2–4 | Informe de la prueba |
| 6 | Verificar la disponibilidad y la licencia de bases públicas de huellas | Estudiantes | Semanas 2–3 | Decisión B1/B2 de `08` §3 |
| 7 | Puerta G1 | Estudiantes + asesor | Semana 6 | Seguir, cambiar de segmento o quedarse solo con lo académico |
| 8 | Conseguir el texto oficial de la Ley 29733 y del DS 016-2024-JUS en El Peruano y cotejarlo con las copias usadas [C15, C16] | Estudiantes | Semana 3 | Citas verificadas |
| 9 | Opinión legal sobre las preguntas de `06` §7 (antes de cualquier piloto real) | Abogado | Antes del piloto | Informe |

## 7. Revisión de coherencia

- **Etiquetas:** cada documento distingue (H), (DC), (O), (E), (I), (HP) y NV; los umbrales están marcados como criterios de diseño.
- **Sin datos inventados:**
  - No hay precios de competidores.
  - No hay TAM numérico.
  - No hay entrevistas.
  - El ejemplo económico (`07` §4.1) está marcado como supuesto arbitrario.
- **Contradicciones con `ref-11`:** explicadas en §1 y en `01` §1, `02` §4 y `06` (introducción).
- **Contradicciones de las fuentes:**
  - PRODUCE: 99,1 % frente a 99,3 % de mype [C13].
  - Vigencia del DS: 30 o 31 de marzo de 2025 [C17].
- **Separación de conclusiones:** la viabilidad técnica (alta) y la académica (media, con la UPC sin confirmar) se separan de la comercial (sin validar), igual que en la investigación general.

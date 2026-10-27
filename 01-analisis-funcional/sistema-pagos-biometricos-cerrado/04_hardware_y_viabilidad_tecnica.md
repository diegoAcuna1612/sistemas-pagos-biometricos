# 04 — Hardware y viabilidad técnica

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

Este documento **amplía** `../sistema-pagos-biometricos-general/investigacion_pagos_biometricos/02_proveedores_y_hardware.md` y no repite su tabla completa. La comparativa de lectores USB (SecuGen Hamster Pro 20, DigitalPersona 4500, BioMini Slim 2, ZKTeco SLK20R y ZK9500) y del motor SourceAFIS sigue vigente [F30–F34].

## 1. Tres tipos de dispositivo

| Tipo | Qué hace | Ejemplos | Dónde quedan las plantillas | Ventajas | Desventajas |
|---|---|---|---|---|---|
| **A. Lector de captura (USB)** | Entrega la imagen o la plantilla a la aplicación de la PC o tableta | SecuGen Hamster Pro 20; BioMini Slim 2; ZK9500 [F30–F33] | En el software propio (local o servidor) | Barato; control total del flujo y de los datos; SDK disponible (según fabricantes) | Requiere PC o tableta y un componente local; hay que programar la comparación |
| **B. Terminal con comparación interna** | Guarda plantillas y compara dentro del equipo; envía "persona X identificada" | Box Comedor (8 000 huellas) [C1]; terminales de asistencia ZKTeco [C5] | Dentro del terminal | Rápido; funciona sin PC | Atado al fabricante; plantillas en un equipo físico que puede robarse; integración por el protocolo del fabricante (NV) |
| **C. Plataforma con gestión de plantillas** | Un software central administra plantillas y las distribuye a los terminales | ZKBio CVSecurity [C5]; CBORD CS Gold + MorphoWave [C6] | Central + caché en los terminales | Administración centralizada | Dependencia total del ecosistema y licencias (NV) |

**Recomendación (I):**
- **Prototipo del TSP:** tipo A. Permite medir y controlar el almacenamiento.
- **Producto:** diseñar una capa de abstracción (`IIdentificationDevice`) para poder conectar un terminal tipo B en el futuro sin cambiar el núcleo.

## 2. Compatibilidad verificada

| Afirmación | Estado | Fuente |
|---|---|---|
| SecuGen ofrece SDK gratuitos para Windows, Linux y Android, y una WebAPI (JavaScript/REST) mediante un servicio local | **DC** (documentación del fabricante) | [F30] |
| Un navegador puede leer un lector USB sin un componente local | **No hay evidencia.** La WebAPI de SecuGen es precisamente un servicio local instalado en el equipo | [F30] |
| BioMini Slim 2 tiene SDK para Windows, Linux y Android y declara detección de dedo vivo según ISO/IEC 30107-3 | **DC**; sin certificado independiente encontrado | [F32] |
| SDK de ZKTeco para .NET | **NV** (la documentación es irregular) | [F33] |
| SourceAFIS para .NET 3.14.0 compara plantillas en C# (1:1 y 1:N), licencia Apache 2.0 | **H** (NuGet) | [F34] |
| Box Comedor de GeoVictoria: API o integración con terceros | **No publicado** | [C1] |

**Consecuencia para la arquitectura:** la estación del comedor necesita un **agente local** (servicio de Windows en .NET, o una app Android si se usa el SDK de Android). La web en Next.js habla con ese agente por `localhost`. Ver `05`.

## 3. Identificación 1:1 frente a 1:N en un comedor

En un comedor hay dos formas de identificar:
- **1:N:** la persona solo pone el dedo y el sistema busca entre todos los registrados. Es más rápido para el usuario.
- **1:1:** la persona dice quién es (código, DNI parcial o tarjeta) y el sistema verifica contra esa sola plantilla. Es más preciso, pero añade un paso.

**Riesgo de falsa identificación en 1:N.** Probabilidad aproximada de que un dedo coincida por error con alguna otra persona de la galería: P ≈ 1 − (1 − f)^(N−1). Supone comparaciones independientes; es una aproximación conservadora (E).

| Personas en la galería (N) | f = 1/10 000 (mínimo de NIST [F9]) | f = 1/100 000 (umbral más estricto) |
|---|---|---|
| 100 | ~1,0 % | ~0,1 % |
| 500 | ~4,9 % | ~0,5 % |
| 1 000 | ~9,5 % | ~1,0 % |
| 8 000 (capacidad declarada del Box Comedor [C1]) | ~55 % | ~7,7 % |

**Interpretación (I):**
- Con galerías de cientos de personas por sede, el 1:N puede ser aceptable si se usa un **umbral estricto**, se muestra el **nombre y la foto en pantalla** para que el cajero confirme y se limita la galería a **la sede y el turno**.
- Un umbral más estricto **aumenta los rechazos** de personas legítimas. Ese equilibrio solo se conoce midiendo (E6 de `09`).
- Un error de 1:N en un comedor cuesta **una ración mal atribuida**, no un pago bancario. El riesgo es menor que en el modelo de pagos, pero afecta la confianza en la facturación.

**Propuesta:** el prototipo implementa **ambos modos** y el experimento compara tiempo y error. Es una buena pregunta de investigación para el TSP (`08`).

## 4. Rendimiento y errores

| Indicador | Dato verificado | Comentario |
|---|---|---|
| Tiempo de captura y comparación | **No hay datos independientes** para los lectores evaluados | Medir en E5 |
| FAR/FMR y FRR/FNMR de SourceAFIS | No hay benchmark oficial para .NET. Una tesis midió EER = 1,04 % en la versión Java (no comparable) [F34] | Medir con datos propios |
| Rechazo en trabajadores manuales | Reportes anecdóticos: 15–20 % de fallos en raciones en Gujarat; 36 % en Telangana [C14] | Riesgo alto en minería e industria |
| Huellas deterioradas en Perú | RENIEC tiene un trámite especial; hay casos en la banca [F35] | Existe en la población peruana |

## 5. Condiciones de uso en un comedor

| Condición | Efecto esperado (I) | Mitigación |
|---|---|---|
| Manos húmedas o con grasa (cocina, tras lavarse) | Más rechazos | Toalla de papel junto al lector; limpieza del sensor por turno; registrar 2 dedos |
| Huellas desgastadas (trabajo manual, edad) | Más fallos de registro y de verificación [C14] | Medir el FTE en el registro; alternativa sin huella desde el primer día |
| Higiene (sensor compartido) | Rechazo de usuarios; exigencia sanitaria | Limpieza; considerar rostro o huella sin contacto (MorphoWave [C6]) en el futuro |
| Hora punta | Cola si cada intento tarda o falla | Un intento máximo y paso inmediato a código o tarjeta; dos estaciones |
| Polvo, golpes (campamento, planta) | Daño del lector | Carcasa; repuesto en sitio |

## 6. Plan de contingencia (siempre activo)

1. **Alternativa sin huella para cualquier persona y sin justificación:** código personal + foto en pantalla, tarjeta o QR. Es una exigencia legal (ver `06` §3) y operativa.
2. **Lector caído:** la estación pasa automáticamente a código o tarjeta.
3. **Sin internet:** la estación registra en una cola local y sincroniza después (ver `05`).
4. **Estación caída:** registro manual en papel con el código de la persona y digitación posterior auditada.

## 7. Qué datos biométricos guardar y dónde

| Opción | Qué se guarda | Dónde | Funcionamiento sin conexión | Riesgo |
|---|---|---|---|---|
| **1. Solo plantillas, comparación central** | Plantilla (ISO 19794-2 o formato SourceAFIS), cifrada | Base separada en el servidor | No: sin internet se usa la alternativa | Medio: una sola base que proteger |
| **2. Plantillas en caché local cifrada** | Plantillas de la sede, cifradas con una llave protegida por el sistema operativo (DPAPI o TPM, NV para la implementación) | Estación + servidor | Sí | Mayor: un equipo físico puede robarse |
| **3. Plantilla en una tarjeta del usuario** (comparación en la tarjeta) | Plantilla en la tarjeta | Tarjeta | Sí | Bajo en el servidor; requiere tarjetas especiales (NV, no investigado) |

**Nunca guardar imágenes de huellas** salvo en el experimento, si el protocolo ético lo aprueba, y con borrado al terminar.

**Recomendación:**
- **MVP:** opción 1. Sin conexión se usa la alternativa: es más simple y más defendible legalmente.
- La opción 2 se evalúa solo si los clientes con mala conectividad la necesitan.

## 8. Costos de hardware

| Concepto | Monto | Tipo |
|---|---|---|
| ZKTeco ZK9500 (Perú) | S/ 199–209 | Precio publicado [F33] |
| SecuGen Hamster Pro 20 | US$ 71,40 (revendedor de EE. UU., sin importación ni IGV) | Precio publicado [F30] |
| BioMini Slim 2 | Sin precio publicado | ND [F32] |
| PC o tableta de la estación | No cotizado | ND |
| Box Comedor de GeoVictoria, terminales de comedor ZKTeco | No publicados | ND [C1, C5] |
| MorphoWave (sin contacto) | No encontrado | ND [C6] |
| Licencias de SDK | "Gratuitos" según SecuGen; resto NV | DC [F30] |
| Instalación y mantenimiento | No hay datos | ND; estimar en el piloto (horas registradas) |

## 9. Prueba de concepto

**Objetivo:** demostrar en 3–4 semanas, antes de construir el producto, que el flujo técnico funciona con hardware real.

| Paso | Qué se prueba | Criterio de éxito (de diseño, por validar) | Si falla |
|---|---|---|---|
| PoC-1 | Captura con el SDK desde un servicio .NET local | Se obtiene la plantilla de forma estable en 20 capturas seguidas | Cambiar de lector (tener 2 modelos) |
| PoC-2 | Comparación 1:1 y 1:N con SourceAFIS en 10–20 voluntarios con consentimiento | Funciona; registrar puntajes y tiempos | Probar el comparador del SDK del fabricante |
| PoC-3 | Página Next.js → agente local por `localhost` (WebSocket) → resultado en pantalla | Ciclo completo en una sola estación | Estudiar la WebAPI del fabricante |
| PoC-4 | Desconexión: registro en una cola local y sincronización sin duplicados | 0 duplicados y 0 pérdidas en 100 registros con cortes simulados | Rediseñar la idempotencia |
| PoC-5 | Ritmo de atención: personas por minuto con huella, código y tarjeta | Medir; no hay meta previa | Insumo para E4 |

**Salida:** un informe corto con tiempos, fallos y decisiones. Si PoC-1 a PoC-3 no funcionan con ningún lector, la viabilidad técnica del prototipo baja y hay que replantear el alcance.

## 10. Conclusión técnica

| Pregunta | Respuesta | Confianza |
|---|---|---|
| ¿Se puede construir un prototipo funcional con hardware comercial? | **Sí.** Hay lectores baratos con SDK y un comparador abierto en C# | Alta |
| ¿Puede un navegador leer el lector directamente? | **No** sin un componente local | Alta |
| ¿La huella es adecuada para todos los segmentos? | **No.** Hay riesgo alto en trabajadores manuales [C14] | Media |
| ¿Se conoce el rendimiento real en un comedor peruano? | **No.** Hay que medirlo | — |

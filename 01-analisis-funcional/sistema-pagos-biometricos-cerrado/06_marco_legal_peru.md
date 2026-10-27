# 06 — Marco legal y privacidad en Perú

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

> **Esto no es asesoría legal.** Se distinguen tres niveles:
> - **[V] Verificado:** texto normativo leído en esta investigación. Ley 29733 en una copia con texto [C15]; DS 016-2024-JUS en la transcripción de LP Derecho [C16]. Ninguno es la publicación oficial: hay que cotejarlos con El Peruano.
> - **[P] Interpretación preliminar** propia.
> - **[A] Requiere abogado.**

**Mejora respecto de `ref-11` y de la investigación general:** antes, el reglamento se conocía por resúmenes de estudios jurídicos [F7]. Ahora **se leyó su articulado** [C16]. Varias afirmaciones de `ref-11` pasan de "a confirmar" a verificadas, y aparecen obligaciones nuevas: el consentimiento libre del art. 3.2, la tercerización, el flujo transfronterizo y el cronograma del Oficial de Datos Personales.

## 1. ¿La huella recibe protección especial?

**Sí [V].**
- Ley 29733, art. 2.5: son datos sensibles "los datos biométricos que por sí mismos pueden identificar al titular" [C15].
- DS 016-2024-JUS, art. 2.6: datos sensibles incluye la "información relativa a datos genéticos o biométricos" [C16].
- Ley, art. 3: "Son objeto de especial protección los datos sensibles" [C15].

## 2. Obligaciones verificadas

| # | Obligación | Norma | Quién la cumple | Estado |
|---|---|---|---|---|
| 1 | Consentimiento **libre, previo, expreso e inequívoco, e informado** | DS art. 2 [C16]; Ley art. 13.5 [C15] | Cliente (responsable) | [V] |
| 2 | **Por escrito** para datos sensibles: firma manuscrita, digital, electrónica u otra modalidad que garantice la voluntad | Ley art. 13.6 [C15]; DS art. 8 [C16] | Cliente | [V] |
| 3 | El consentimiento **no es libre** si se condiciona un servicio o beneficio "si los datos solicitados no son indispensables" | DS art. 3.2 [C16] | Cliente; el diseño del producto debe permitirlo | [V] |
| 4 | La **carga de la prueba** del consentimiento es del responsable | DS art. 9 [C16] | Cliente; el sistema debe guardar la evidencia | [V] |
| 5 | Información previa: identidad del responsable, finalidad, destinatarios, banco de datos, consecuencias de negarse, transferencias, plazo de conservación, cómo ejercer derechos, entre otros (10 puntos) | DS art. 6.1 [C16]; Ley art. 18 [C15] | Cliente; el sistema puede mostrar el texto | [V] |
| 6 | Revocación con mecanismos "fácilmente accesibles e incondicionales, sencillos, rápidos y gratuitos" | DS art. 10.4 [C16]; Ley art. 13.9 [C15] | Cliente + sistema | [V] |
| 7 | **Proporcionalidad:** "adecuado, relevante y no excesivo" para la finalidad | Ley art. 7 [C15] | Cliente | [V] (su aplicación al caso es [P], ver §3) |
| 8 | Suprimir los datos cuando dejan de ser necesarios | Ley art. 28.7 [C15] | Cliente + sistema | [V] |
| 9 | Medidas de seguridad técnicas, organizativas y legales acordes a la categoría del dato | Ley arts. 9 y 16 [C15] | Cliente y proveedor | [V] |
| 10 | **Inscribir el banco de datos** en el Registro Nacional; trámite gratuito y de aprobación automática | DS arts. 42, 43.3, 45.2 [C16] | Titular del banco = cliente [P] | [V] |
| 11 | Notificar incidentes con datos sensibles a la Autoridad **en máximo 48 h**, y al titular cuando le afecte; si es digital, también al Centro Nacional de Seguridad Digital | DS art. 34 [C16] | Cliente; el proveedor debe avisarle **"de forma inmediata"** (DS art. 36) | [V] |
| 12 | Documentar todo incidente | DS art. 35 [C16] | Cliente | [V] |
| 13 | **Oficial de Datos Personales** cuando se traten datos sensibles (art. 37.1.2) o cuando el giro del negocio comprenda datos sensibles (art. 37.1.3). Se comunica a la Autoridad en 15 días | DS art. 37 [C16] | **Cliente y proveedor** | [V] |
| 14 | Cronograma del Oficial para los supuestos 2 y 3, contado desde la publicación (30/11/2024): grandes empresas (> 2 300 UIT) 1 año; medianas 2 años; pequeñas 3 años; microempresas 4 años | DS, Disposición Complementaria Final Primera [C16] | — | [V] (fechas calculadas: 30/11/2025, 30/11/2026, 30/11/2027 y 30/11/2028 [P]) |
| 15 | Evaluación de impacto **facultativa**, "especialmente cuando se trate de datos sensibles"; haberla hecho antes de un procedimiento sancionador cuenta como atenuante | DS arts. 40.1 y 125.4 [C16] | Cliente (recomendable) | [V] |
| 16 | Plazos de respuesta a derechos: información 8 días; acceso 20 días; rectificación, cancelación u oposición 10 días | DS art. 69 [C16] | Cliente; el proveedor traslada las solicitudes en 3 días (art. 66.4) | [V] |
| 17 | **Flujo transfronterizo:** el país receptor debe tener protección adecuada o deben darse garantías (cláusulas contractuales); en todo caso, debe **comunicarse** a la Autoridad para su inscripción | Ley art. 15 [C15]; DS arts. 18, 20, 21.2 [C16] | Cliente (y el proveedor si usa nube fuera de Perú) | [V] |
| 18 | Menores de edad: menores de 14 necesitan el consentimiento de quien ejerce la patria potestad; de 14 a 18 pueden consentir con información comprensible | DS art. 22 [C16] | — | [V] |

## 3. ¿Es defendible tratar huellas en un comedor?

### 3.1 Base jurídica

| Base posible | Análisis | Nivel |
|---|---|---|
| **Consentimiento escrito** (Ley art. 13.6) | Es la vía natural. **Debe ser libre** (DS art. 3.2): si la huella no es indispensable para comer, condicionar la comida a ella invalida el consentimiento | [V] la norma / [P] su aplicación |
| **Ejecución de un contrato** (Ley art. 14.5: no se requiere consentimiento cuando los datos "sean necesarios para la ejecución de una relación contractual") | Para la huella habría que demostrar que es **necesaria** para el contrato laboral o de servicios. Existen alternativas (tarjeta, código), así que **es difícil sostener que lo sea**. Además, no está claro si esta excepción libera del requisito escrito de los datos sensibles; ninguna fuente lo aclaró | [P]; [A] |
| **Ley autoritativa** (Ley art. 13.6 in fine) | No se encontró ninguna ley que autorice tratar biometría para controlar comedores | [P] |

### 3.2 Necesidad y proporcionalidad

- **Finalidad:** atribuir cada consumo a la persona correcta y evitar el préstamo de credenciales.
- **¿Hay medios menos invasivos?** Sí: tarjeta, código con foto en pantalla, QR. Cumplen la finalidad, aunque con menos garantía contra el préstamo.
- **Criterios de otros países** (orientativos, no son derecho peruano) [C20]:
  - **Ecuador (SPDP, 2025):** la biometría para la asistencia laboral no es legítima; el consentimiento del trabajador no se considera libre por la subordinación.
  - **España (AEPD, 2015):** la huella para el acceso escolar es desproporcionada. Cita a la CNIL francesa, que rechazó la huella en comedores escolares.
  - **Chile (comentario doctrinal):** el empleador debe acreditar una necesidad real, no una comodidad de gestión.
  - **Reino Unido:** permite la biometría en comedores escolares **con consentimiento y alternativa obligatoria** [C7].
- **Perú:** no se encontró ninguna opinión de la ANPD sobre biometría en relaciones laborales. Un artículo de prensa indica que el empleador debe demostrar que usa los datos solo para la finalidad declarada [C21] (O).

### 3.3 Conclusión preliminar [P]

1. **La huella obligatoria** como única forma de acceder al comedor es **difícilmente defendible**: viola la libertad del consentimiento (DS art. 3.2) y probablemente la proporcionalidad (Ley art. 7).
2. **La huella opcional**, con una alternativa equivalente y sin penalización, consentimiento escrito y revocable, finalidad limitada, sin imágenes y con borrado al terminar la relación, es **la configuración más defendible**.
3. En relaciones laborales, el desequilibrio entre las partes hace que la autoridad pueda examinar con más rigor si el consentimiento fue libre. Conviene que la elección sea **realmente libre**: sin presión de supervisores y sin consecuencias. **[A]**
4. **Los menores de edad deben quedar fuera** del producto (colegios).

**Implicación para el producto:** la alternativa sin huella **no es opcional en el diseño**. Por tanto, el producto **debe funcionar igual de bien sin huella**. Eso refuerza la conclusión de `01` §4: lo que se vende es la gestión de consumos, y la huella es un complemento.

## 4. Roles y responsabilidades

| Actor | Rol probable | Fundamento | Obligaciones principales |
|---|---|---|---|
| Empresa, universidad o concesionario cliente | **Titular del banco de datos / responsable del tratamiento**: decide la finalidad | Ley art. 2.15 [C15] | Consentimiento, información, inscripción del banco, seguridad, derechos ARCO, incidentes 48 h, Oficial de Datos (según su tamaño), evaluación de impacto (recomendable) |
| Plataforma SaaS | **Encargado del tratamiento** por medios tecnológicos tercerizados | Ley arts. 2.6 y 30 [C15]; DS arts. 28–33 [C16] | No usar los datos para otro fin; no transferirlos sin autorización; garantizar la confidencialidad, la integridad y la disponibilidad; **no asumir la titularidad del banco**; informar los cambios de política; permitir que el cliente limite el tratamiento; **evidenciar la supresión al terminar** (DS arts. 29–30); conservar como máximo **2 años** después del último encargo (DS art. 31.2); avisar de inmediato los incidentes (art. 36); Oficial de Datos si su giro comprende datos sensibles (art. 37.1.3) |
| Proveedor de nube | Subcontratista del encargado | DS art. 32 [C16] | Autorización previa del responsable (puede constar en el contrato); el subcontratista asume las obligaciones del encargado (art. 33) |
| Concesionario que opera el comedor de una empresa | **[A]**: según quién decida la finalidad, podría ser responsable conjunto o encargado de la empresa | — | Definir en el contrato |

**Documentos que el proveedor debe preparar** [P]:
- Contrato de encargo de tratamiento con las cláusulas de los arts. 29–31 del DS.
- Política de privacidad del servicio.
- Modelo de consentimiento escrito para que el cliente lo use.
- Procedimiento de incidentes.
- Procedimiento de borrado con constancia.
- Lista de subcontratistas (nube) para informar a los titulares (DS art. 29.1).

**Oficial de Datos Personales del proveedor** [P]:
- Si su giro de negocio comprende datos sensibles (art. 37.1.3), está obligado.
- Como microempresa, la obligación rige desde el **30/11/2028**, según el cronograma calculado.
- Los clientes **grandes** ya están obligados desde el **30/11/2025** si tratan datos sensibles. Contratar una plataforma que trate huellas puede activarles esa obligación si aún no la tenían [P].

## 5. Conservación, eliminación y derechos

| Dato | Conservación sugerida [P] | Fundamento |
|---|---|---|
| Plantilla biométrica | Mientras la persona esté activa y no revoque; borrado automático en la baja o revocación | Ley art. 28.7 [C15]; DS art. 10.3 [C16] |
| Evidencia del consentimiento | Mientras dure el tratamiento y el plazo para defenderse de una reclamación **[A]** | DS art. 9 (carga de la prueba) [C16] |
| Consumos | Plazo que defina el cliente según sus obligaciones contables o laborales **[A]** | Ley art. 8 (solo el tiempo necesario) [C15] |
| Todo, al terminar el contrato con el cliente | Devolución y supresión con constancia; máximo 2 años | DS arts. 30.4 y 31.2 [C16] |

## 6. Otras normas que pueden aplicar

| Tema | Hallazgo | Nivel |
|---|---|---|
| **Prestaciones alimentarias (Ley 28051)** | Distingue la modalidad **directa** (comedor o concesionario en el centro de trabajo) de la **indirecta** (vales mediante empresas administradoras **inscritas en el MTPE**, con topes) [C18] | [V] vía resumen |
| ¿El producto podría volverse una "empresa administradora" de vales? | Si emitiera vales o credenciales para consumir en **varios establecimientos afiliados**, podría acercarse a la modalidad indirecta. **Mantenerse en la modalidad directa:** solo registrar lo consumido en el comedor del cliente | [P]; [A] |
| Descuentos por planilla | Requerirían autorización expresa del trabajador, mandato legal o judicial, según una fuente débil [C19]. No se verificó la norma ni un tope general | [A] |
| Carácter remunerativo de la alimentación | Puede tener efectos laborales y tributarios según la modalidad [C18] | Es un tema del cliente, no del producto; [A] |
| Servicios de pago y dinero electrónico | En el modelo pospago, la plataforma **no recibe ni liquida dinero ni emite saldo prepagado**: queda fuera del alcance de la Circular 0026-2026-BCRP como aceptador de pagos [F5] [P]. Si en el futuro se añaden recargas, revisar la Ley 29985 (no verificada) | [P]; [A] si cambia el modelo |
| Facturación electrónica | Si el producto no emite comprobantes (no es POS), no aplica al producto [P] | [P] |
| Contrataciones del Estado | Vender a universidades u hospitales públicos implica procedimientos de contratación pública (no investigado) | NV |

## 7. Preguntas para un abogado especialista

1. En una relación laboral, ¿qué condiciones deben cumplirse para que la ANPD considere **libre** el consentimiento para usar la huella en el comedor (DS art. 3.2)? ¿Basta una alternativa equivalente?
2. ¿Puede invocarse la excepción contractual (Ley art. 14.5) para datos sensibles, o siempre se exige el consentimiento escrito (art. 13.6)?
3. En un comedor operado por un concesionario para una empresa, ¿quién es el responsable del tratamiento y quién el encargado?
4. ¿Debe la plataforma designar ya un Oficial de Datos Personales, o le aplica el cronograma de microempresa (30/11/2028)?
5. Si la nube está fuera de Perú, ¿qué cláusulas y comunicaciones exige el flujo transfronterizo (DS arts. 20–21)?
6. ¿Qué plazo de conservación de consumos y evidencia de consentimiento es razonable?
7. ¿El registro de consumos para descuento por planilla requiere una autorización específica del trabajador? ¿Hay un tope?
8. ¿En qué punto el producto podría considerarse empresa administradora de la modalidad indirecta de la Ley 28051?

## 8. Recomendación preventiva

1. Diseñar con **privacidad por defecto**: huella opcional, sin imágenes, borrado automático y evidencia de consentimiento (ver `05`).
2. Preparar una **plantilla de evaluación de impacto** para que el cliente la complete (el DS sugiere tomar como referencia la NTP-ISO/IEC 27005 y la NTP-ISO 31000, art. 40.2) [C16].
3. **Consulta formal** a la ANPD sobre biometría opcional en comedores laborales. El DS prevé la absolución de consultas (Sexta Disposición Complementaria Final) [C16]. Hacerla requiere la decisión de los estudiantes: **esta investigación no contactó a la Autoridad**.
4. Opinión de un abogado **antes del primer piloto con personas reales**.

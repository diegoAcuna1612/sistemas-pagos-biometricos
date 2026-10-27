# 05 — Marco legal y regulatorio (Perú)

> **Aviso:** este documento es un análisis técnico para planificar el proyecto. **No es asesoría legal.** Las incertidumbres se listan al final para consultarlas con un abogado especializado en pagos y datos personales.

## 1. Protección de datos personales

### 1.1 Normas
| Norma | Estado | Fuente |
|---|---|---|
| Ley N.º 29733, Ley de Protección de Datos Personales | Vigente | Texto oficial (gob.pe / El Peruano). No se descargó en esta sesión; citas de artículos según el texto conocido → **verificar** |
| Reglamento aprobado por **D.S. N.º 016-2024-JUS** | Publicado el 30/11/2024; **vigente desde el 30/03/2025** (120 días calendario). Hay fuentes que dicen 29/03 o 31/03 → verificar en El Peruano | [F7] |

### 1.2 Implicancias para la plataforma
| Tema | Contenido | Fuente / confianza |
|---|---|---|
| Biometría = dato sensible | La ley considera sensibles los datos biométricos que por sí mismos identifican al titular (art. 2). El nuevo reglamento amplía la lista de categorías sensibles e incluye expresamente los biométricos | [F7] media-alta; art. 2 de la ley: **verificar** |
| Consentimiento | Para datos sensibles, el consentimiento debe ser **expreso y por escrito** (art. 13.6 de la ley, según el texto conocido) | Media → **verificar** |
| Finalidad y proporcionalidad | Solo para autenticar pagos; no reutilizar la biometría para marketing ni analítica | Principios de la ley |
| Minimización | No guardar imágenes; solo plantillas protegidas | Recomendación |
| Derechos ARCO y portabilidad | Acceso, rectificación, cancelación y oposición. **Portabilidad exigible desde el 30/09/2025** | [F7] |
| Incidentes de seguridad | Reporte a la autoridad en **48 horas** | [F7] (resumen de firma legal) |
| Oficial de Datos Personales | Obligatorio para ciertas empresas, con plazos escalonados según tamaño (p. ej. ventas > 2 300 UIT: 1 año desde la publicación) | [F7] |
| Decisiones automatizadas | Obligación de informar sobre decisiones automatizadas y perfilamiento (un rechazo automático de pago podría estar incluido → I) | [F7] |
| Transferencia internacional | Si las plantillas se alojan en una nube fuera de Perú, aplican las reglas de flujo transfronterizo | Ley / reglamento → **verificar requisitos** |
| Registro de bancos de datos | Inscripción del banco de datos ante la Autoridad Nacional de Protección de Datos Personales | Ley → **verificar** con el nuevo reglamento |

### 1.3 Por etapa
| Etapa | Obligaciones mínimas |
|---|---|
| **Prototipo académico** | Consentimiento escrito informado de cada voluntario. Finalidad limitada al estudio. Sin imágenes. Cifrado. Borrado al terminar. Revisión ética de la UPC si la exige (ver `07`). La exención por fines académicos **no se asume** → verificar |
| **Piloto con usuarios reales** | Todo lo anterior, más inscripción del banco de datos, política de privacidad, procedimiento ARCO, procedimiento de incidentes (48 h), contratos de encargo de tratamiento con el comercio y la nube |
| **Plataforma comercial** | Lo anterior, más Oficial de Datos (según tamaño), evaluaciones de impacto, auditorías y transferencias internacionales formalizadas |

## 2. Sistema de pagos (BCRP)

### 2.1 Normas
| Norma | Contenido relevante | Vigencia | Fuente |
|---|---|---|---|
| Ley N.º 29440 (modificada por el D. Leg. 1665) | El BCRP es el órgano rector del Sistema Nacional de Pagos | Vigente | [F5] (considerandos) |
| Circular N.º 0022-2025-BCRP, Reglamento General del SNP | Régimen de registro y autorización de las Entidades de Servicios de Pago | Desde el 01/04/2026 (según prensa) | [F6] |
| **Circular N.º 0026-2026-BCRP, Reglamento del Servicio de Aceptación de Pagos** (2/10/2026, publicada en El Peruano el 3/10/2026) | Ver 2.2 | **Entra en vigor el 01/01/2027** (Disp. Final Primera) | [F5] (texto primario leído) |
| Circular N.º 0027-2022-BCRP | Adquirentes y facilitadores de pago; sus sujetos pasan a ser "Aceptadores de Pagos" | Vigente en lo no regulado por la 0026 | [F5] |

### 2.2 Puntos clave de la Circular 0026-2026-BCRP (texto primario)
- **Art. 3.2:** una entidad es **Aceptador de Pagos** cuando realiza **a la vez**:
  - (a) contratar con comercios, y
  - (b) gestionar la liquidación a comercios.
  - Habilitar dispositivos o canales (c) o transmitir y enrutar información (d) **no determina por sí solo** esa calificación.
- **Art. 3.4:** quien hace solo (c) y/o (d) para un aceptador, sin contratar con el comercio ni asumir la liquidación, es un **"Proveedor de Servicios Tecnológicos"**.
- **Art. 2.f:** un "Dispositivo Tecnológico de Venta" incluye POS, QR, botón de pago, integraciones web y apps. Un terminal biométrico encaja aquí (I).
- **Art. 3.3 y Disp. Final Sexta:** solo el BCRP determina si un modelo está sujeto al reglamento. **Debe consultarse antes de implementar modelos con incertidumbre** (correo `Dpto.AnalisisSistPagos@bcrp.gob.pe`, Disp. Final Octava).
- **Art. 5.1:**
  - Los fondos deben estar en una Cuenta Recaudadora separada.
  - Conciliación diaria.
  - Conservación de los registros por 5 años.
- **Art. 5.2:** el aceptador que califique como Entidad de Servicios de Pago necesita autorización o registro ante el BCRP.
- **Art. 6.2:** los **cambios en los "mecanismos de autenticación"** son "modificaciones relevantes" que el aceptador debe comunicar al BCRP con **30 días** de anticipación. Por eso, si un adquirente incorporara el pago con huella, debería notificarlo (I).
- **Art. 6.4:** la "marcha blanca" (operaciones reales con un grupo limitado) cuenta como despliegue. Las **pruebas internas, ambientes de calidad o pilotos sin despliegue efectivo al mercado no**.
- **Art. 12:** la liquidación a comercios debe hacerse en un máximo de 48 horas hábiles.
- **Art. 15:** multas de hasta 20 UIT, nuevas multas de 50 UIT y suspensión si el incumplimiento persiste.

### 2.3 Implicancia por estructura de negocio (I, validar con un abogado)
| Estructura | Calificación probable |
|---|---|
| Prototipo académico con dinero simulado | Fuera del ámbito: no hay comercios contratados ni fondos |
| Plataforma que **solo** provee la tecnología biométrica y el enrutamiento a un adquirente con licencia, que es quien contrata y liquida | **Proveedor de Servicios Tecnológicos** (art. 3.4); obligaciones contractuales frente al aceptador |
| Plataforma que contrata con comercios **y** liquida fondos | **Aceptador de Pagos** → registro o autorización BCRP, cuenta recaudadora, etc. |
| Plataforma que mantiene **saldos prepagados** de los usuarios | Posible **emisión de dinero electrónico** (Ley N.º 29985, supervisión de la SBS). **No verificado en esta sesión → consulta legal obligatoria** |

## 3. Tarjetas (SBS)
| Norma | Contenido | Fuente |
|---|---|---|
| Reglamento de Tarjetas de Crédito y Débito (Res. SBS 6523-2013), modificado por la **Res. SBS N.º 2286-2024** | Operaciones **presenciales**: dos factores, el **chip (o su versión digital) + PIN** u otro factor que establezca la SBS. El banco asume las pérdidas de operaciones no reconocidas en canal digital sin autenticación reforzada | [F8] |
| Fecha de aplicación | Fijada originalmente para el 01/07/2025; hay señales de **prórroga** (una nota menciona abril de 2026) → **verificar en El Peruano** | [F8] |

**Implicancia (I):**
- Cobrar una tarjeta en caja solo con la huella del cliente, capturada por un dispositivo de un tercero, **no encaja** en el esquema "chip + PIN" de tarjeta presente.
- Hacerlo como cargo con token sin tarjeta presente traslada el riesgo y depende del emisor y del adquirente.
- La vía regulatoriamente más limpia es que **el emisor** registre la huella como factor de autenticación de **su** cliente (como Biopago [F16]). En ese caso, la SBS debería reconocer ese factor.

## 4. Otros
- **Protección al consumidor** (Código de Protección y Defensa del Consumidor): información clara del cobro, comprobante y reclamos (I).
- **Comprobantes electrónicos (SUNAT):** los emite el comercio; la plataforma solo podría integrarlos (I).
- **PCI DSS** (estándar contractual de las marcas, no una ley): no almacenar PAN ni CVV; usar tokenización del proveedor. Culqi exige SAQ-D si se usa su API de tokens directamente [F28].

## 5. Incertidumbres para un abogado especializado
1. ¿La plataforma, en el modelo elegido, califica como Aceptador de Pagos o como Proveedor de Servicios Tecnológicos según la Circular 0026-2026-BCRP?
2. ¿Mantener saldos de usuarios en un sistema cerrado constituye emisión de dinero electrónico (Ley 29985) o tiene alguna excepción?
3. ¿La SBS reconoce la biometría capturada por un tercero como segundo factor en operaciones presenciales? ¿Cuál es la fecha efectiva de la Res. SBS 2286-2024?
4. ¿Quién responde ante una operación no reconocida autorizada con huella: la plataforma, el comercio, el adquirente o el emisor?
5. ¿El uso de datos biométricos en un estudio académico requiere inscribir el banco de datos? ¿Hay alguna excepción por investigación?
6. ¿Qué requisitos aplican si las plantillas se alojan en una nube fuera de Perú?

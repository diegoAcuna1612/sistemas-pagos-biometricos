# 01 — Mapa de competidores

Fecha de consulta de todas las fuentes: 27/10/2026. Las referencias `[Fxx]` remiten a `09_fuentes_y_evidencias.md`.

**Leyenda del tipo de información:**
- **H:** hecho confirmado por una fuente primaria.
- **C:** declaración comercial de la empresa.
- **I:** inferencia del investigador.
- **Hist:** información histórica.
- **NV:** no verificado.

## 1. Perú: hallazgos

| Actor | Qué ofrece | Relación con la propuesta | Evidencia |
|---|---|---|---|
| BCP / Yape | Acceso a la app con rostro o huella (2025) | No es un pago en caja; es la biometría del celular | C [F37] |
| BBVA Perú (GloMo) | Rostro o huella para iniciar sesión y confirmar operaciones | Biometría en el celular, no en el comercio | C [F36] |
| Mastercard + Alignet (2020) | Anuncio de autenticación con huella o rostro en el celular para compras digitales | Comercio electrónico, no presencial | Hist/C [F1] |
| Niubiz, Izipay | POS con chip, contactless y QR | No se encontró biometría en sus POS | I [F41] |
| RENIEC | Verificación biométrica de identidad para empresas (huella / facial) | Infraestructura de identidad, no de pago. Posible insumo para el registro (KYC) | NV en tarifas [F35] |
| Ecosistema general | Biometría concentrada en el sector financiero; la regulación y el costo son los retos | Contexto | C [F36] |

**Conclusión para Perú:** no se encontró competencia **directa** operativa.

**Búsquedas realizadas** (español e inglés):
- "pago con huella dactilar Perú banco comercios"
- "pagos biométricos Perú 2025 2026 fintech"
- "Niubiz Izipay biometría huella pago POS Perú"
- "Perú pago con rostro o huella banco BCP Interbank BBVA Yape biometría 2026"
- "RENIEC verificación biométrica huella…"

**Límites:**
- No se consultó directamente a bancos ni adquirentes, porque el encargo lo prohíbe.
- Tampoco se revisaron registros de patentes de INDECOPI.
- Pueden existir pilotos privados o cerrados (universidades, clubes, comedores corporativos) sin cobertura de prensa.

## 2. Matriz de competidores (directos, indirectos, históricos)

| Empresa / producto | País / mercados | Tipo | Biometría | Flujo de pago | Medio de pago | Hardware | Qué necesita el cliente | Comercios | Integración | Estado | Presencia en Perú | Modelo de negocio | Evidencia | Implicación |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Biopago (Banco de Venezuela)** | Venezuela | Directa | Huella | Huella en dispositivo del banco adquirente → débito de la tarjeta asociada | Tarjetas del banco (débito; en 2024, también crédito y alimentación) | Dispositivo biométrico del banco | Solo el dedo, con huella previamente asociada | Comercios afiliados al BDV | Propietario del banco adquirente | Operativo, con fallas reportadas 2021-2024 | No | Comisión por terminal según categoría | C/H [F16] | Prueba que el modelo funciona **cuando el banco es dueño de la cadena**. Los reclamos muestran el riesgo operativo |
| **Aadhaar Pay / AePS (NPCI)** | India | Directa (infraestructura nacional) | Huella (también iris) | Comercio ingresa número Aadhaar + huella del cliente → débito de la cuenta vinculada | Cuenta bancaria vinculada a Aadhaar | Smartphone Android + lector certificado | Número Aadhaar + dedo; sin tarjeta ni teléfono | Comercios y corresponsales bancarios | App del banco; red NPCI | Operativo; volumen +14 % interanual (feb. 2025) | No | Comisión por transacción (cifras dispares; NV) | H/NV [F17] | El referente más masivo, y usa **1:1 (número + huella)**, no 1:N. Depende de una identidad nacional estatal |
| **Liquid "Touch & Pay"** | Japón | Directa | Huella (2-3 dedos) | Registro en aeropuerto o parque → pago con dedos | Tarjeta de crédito o depósito | Lector propio | Solo dedos | Turismo, hoteles, Huis Ten Bosch | Alianza con gobierno (METI) y KDDI | Pilotos 2016-2017; estado actual desconocido | No | NV | Hist/C [F15] | Usa varios dedos para reducir errores en 1:N. No se confirmó un despliegue masivo |
| **Ove Touch & Go + Green Payments** | EE. UU. | Directa | Huella | App asocia tarjetas o cuentas a cada dedo → sensor en el POS | Tarjeta, cuenta bancaria, cripto | Sensor Ove añadido al POS | Dedo; registro en la app | Restaurantes, retail | Alianza con procesador | Anuncio 2022; beta planificada en 2023; sin evidencia posterior | No | NV | C [F12] | Es el modelo más parecido a la propuesta. **No hay evidencia de éxito** |
| **Sthaler Fingopay** | Reino Unido, Dinamarca | Directa | Venas del dedo | Dedo en lector → Worldpay cobra la tarjeta guardada | Tarjeta almacenada en Worldpay | Lector Hitachi de venas | Solo dedo | Campus, tiendas de conveniencia | Alianza con Worldpay y Visa Europe | Pilotos 2015-2017; estado actual NV | No | NV | Hist [F14] | Modelo técnico equivalente con un adquirente grande. No se encontró escala comercial posterior |
| **Pay By Touch (Solidus Networks)** | EE. UU., Reino Unido | Directa (histórica) | Huella | Huella + número → débito, tarjeta o fidelización | Cuenta, tarjeta | Lectores en caja | Dedo + número | ~400 supermercados (Piggly Wiggly, Co-op) | Integración con POS de supermercados | **Quiebra 2007-2008; servicio apagado el 19/03/2008** | No | Comisión y fidelización | Hist/H [F10, F13] | Principal caso de fracaso: gobierno corporativo y financiación. Su base de huellas generó preocupación de privacidad |
| **Hitachi finger vein — İşbank "Biyokimlik"** | Turquía, Polonia | Directa / infraestructura | Venas del dedo | Cajeros y sucursales; pilotos de POS biométrico | Cuenta / tarjeta | Lector Hitachi | Dedo | Banca | Banco propietario | Cajeros operativos (2012-2014); POS solo en piloto | No | — | Hist/C [F24] | Las venas funcionan bien en banca. No hay evidencia de POS masivo |
| **Mastercard Biometric Checkout** | Global; pilotos en Brasil y Uruguay | Indirecta / infraestructura | Rostro, palma | Registro en tienda; pago con palma o rostro vinculado a la tarjeta | Tarjetas Mastercard | Terminal Ingenico + sensor Fujitsu de venas de la palma | Mano o rostro | Retail (Tienda Inglesa / Red Expres, St Marché) | Programa con proveedores certificados | Lanzado en 2022; piloto con palma en Uruguay (jun. 2024); escala NV | No confirmada | NV | C [F18] | **Competidor potencial más fuerte**: la red de tarjetas define estándares y socios. Una plataforma nueva tendría que encajar en este tipo de marco |
| **PopID + J.P. Morgan Payments** | EE. UU. | Indirecta | Rostro | Registro con selfie; plantilla cifrada en la nube de PopID; J.P. Morgan procesa el pago | Tarjeta | Cámara / quiosco | Rostro (opt-in) | Restaurantes de comida rápida (Whataburger), más de 380 locales | Alianza con adquirente | Pilotos ampliados en 2024 | No | NV | C [F19] | Muestra el modelo correcto: **identidad biométrica (startup) + procesamiento (adquirente)** |
| **Payface** | Brasil | Indirecta | Rostro | Rostro en caja → tarjeta o *private label*; PixFace en desarrollo (2023) | Tarjeta, private label | Cámara | Rostro | Supermercados, farmacias | Alianzas con retail | Operativo (según prensa); PixFace NV | No | NV | C [F20] | Competidor regional que podría expandirse |
| **Amazon One** | EE. UU. | Indirecta | Palma | Palma vinculada a tarjeta | Tarjeta | Lector propio | Mano | Amazon Go/Fresh, Whole Foods, estadios | Propietario | **Discontinuado; lectores retirados hasta el 03/06/2026, por "adopción limitada"** | No | — | H [F11] | **Señal fuerte de riesgo de demanda**: ni Amazon logró adopción suficiente |
| **Alipay "Smile to Pay" / WeChat palma** | China | Indirecta | Rostro, palma | Rostro o palma vinculados a la billetera | Billetera | Cámara / sensor | Rostro o mano | Retail masivo | Ecosistema propio | Operativo; Alipay ahora prioriza NFC y WeChat combina QR con palma | No | — | C [F25] | Incluso en China, la biometría convive con QR y NFC y no los sustituye |
| **Handwave + Visa** | Europa / EE. UU. | Indirecta | Palma | Palma integrada en la red Visa | Tarjeta Visa | Sensor | Mano | Retail | Acuerdo con Visa | Acuerdo anunciado | No | NV | C [F26] | Las redes de tarjetas eligen la **palma**, no la huella, para POS |
| **Tarjetas con sensor de huella** (BBVA México "Aqua", Mastercard, Visa) | México, Sudáfrica, Turquía, Corea | Indirecta | Huella **en la tarjeta** | Huella reemplaza el PIN; la tarjeta sigue presente | Tarjeta | Sensor en la tarjeta | La tarjeta | Todos los POS EMV | Estándar EMV | Pilotos 2019-2021; escala NV | No confirmada | Emisor | C [F23] | Resuelve "huella en vez de PIN" sin hardware en el comercio, pero **no** elimina la tarjeta |
| **Visa / Mastercard Payment Passkey** | Latinoamérica (Brasil, Guatemala; Mastercard vía Yuno) | Indirecta | Biometría del celular (FIDO) | Rostro o huella en el celular + token | Tarjeta tokenizada | Celular del cliente | Celular | Comercio electrónico | API de la red | Pilotos 2025-2026 | Posible vía pasarelas regionales (NV) | Red | C [F22] | Ocupa el espacio de la autenticación biométrica **en línea** |
| **dLocal "Pix with biometrics"** | Brasil | Indirecta | Rostro o huella del celular | Confirmación de Pix en el checkout | Cuenta | Celular | Celular | Comercio en línea | API | Operativo (según prensa) | No | NV | C [F21] | Igual al anterior |
| **Yape / Plin + QR interoperable** | Perú | Sustituto | — (biometría solo para abrir la app) | QR o número de celular | Cuenta / billetera | Celular del cliente | Celular | Masivo, incluye bodegas | QR interoperable regulado por el BCRP | Operativo y dominante | Sí | Gratis para personas; comisiones a comercios | H/C [F3, F4] | **Principal sustituto real en Perú**: casi sin costo para el comercio y ya adoptado |

## 3. Competidores potenciales que podrían incorporar la función rápidamente

**Inferencia (I):**
- Niubiz e Izipay, por ser adquirentes con parque de POS.
- BCP/Yape e Interbank, por tener base de clientes y app para registrar la huella.
- Mastercard y Visa, que ya tienen programas biométricos.
- Mercado Pago, que tiene card-on-file y su propio POS.

Cualquiera de ellos tiene la base de clientes, la licencia y la red de comercios de la que carecería una startup.

## 4. Lecciones de los casos históricos

| Caso | Qué pasó | Lección |
|---|---|---|
| Pay By Touch (2008) | Quiebra por financiación y gobierno corporativo; apagado de un día para otro en unos 400 supermercados [F10] | El costo de hardware y despliegue exige mucho capital. Si el proveedor cae, los comercios pierden el servicio y queda un pasivo de datos biométricos |
| Amazon One (2026) | Cierre por "adopción limitada" [F11] | La biometría en caja no aportó suficiente ventaja frente a tarjeta, celular y QR, ni siquiera con el capital y el retail de Amazon |
| Liquid, Sthaler, Ove | Pilotos sin evidencia pública de escala posterior [F12, F14, F15] | Ausencia de evidencia ≠ fracaso, pero ninguno muestra un camino de crecimiento verificable |
| Biopago, AePS | Funcionan a escala | Los casos exitosos los opera **un banco o el Estado**, dueños de la cuenta y de la identidad. AePS usa 1:1 (número + huella) |

## 5. Preguntas abiertas
- ¿Existen soluciones cerradas en Perú (comedores universitarios o corporativos con huella) sin presencia en prensa? Validar con entrevistas.
- ¿Cuál es el estado actual de Ove, Sthaler y Liquid? Solo hay fuentes de 2017-2022.
- ¿Mastercard planea su Biometric Checkout en Perú? No hay evidencia.

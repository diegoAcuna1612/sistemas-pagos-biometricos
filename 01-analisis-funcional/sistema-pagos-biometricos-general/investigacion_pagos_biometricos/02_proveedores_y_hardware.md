# 02 — Proveedores y hardware

Fecha de consulta: 27/10/2026. Los precios son de **revendedores** y **no incluyen** importación, IGV, envío ni soporte, salvo que se indique.

## 1. Lectores de huella

### 1.1 Distinción clave
- **Lectores "Windows Hello" / del sistema operativo:** autentican al usuario ante el SO. **No sirven**, porque no dan acceso a la imagen ni a la plantilla.
- **Lectores con SDK de captura:** entregan la imagen y/o una plantilla (ISO 19794-2 / ANSI 378) a la aplicación. **Son los necesarios.**

El lector del celular **tampoco sirve**: Android e iOS solo devuelven "coincide / no coincide" con la huella del dueño del teléfono.

### 1.2 Comparativa

| Fabricante / modelo | Sensor | SDK y plataformas | .NET / web | Detección de dedo vivo (PAD) | Certificaciones | Precio de referencia | Disponible en Perú | Dificultad | Fuentes |
|---|---|---|---|---|---|---|---|---|---|
| **SecuGen Hamster Pro 20** | Óptico | SDK gratuitos para Windows, Linux y Android; **WebAPI** gratuita (JavaScript/REST) | Sí (Windows SDK); la WebAPI resuelve el acceso desde el navegador mediante un servicio local | Demostración de liveness con Precise Biometrics en 2014; **disponibilidad actual NV** | FAP 20, PIV (según el fabricante) | US$ 71.40 (revendedor EE. UU.); ₹3,147 (tienda del gobierno de la India) | NV; importación | Baja | [F30] |
| **HID DigitalPersona U.are.U 4500** | Óptico | SDK para Windows, Android, Java y Linux según revendedores; **licencia del SDK NV** (puede venderse aparte) | Sí (SDK .NET histórico) | No confirmada en las fuentes | — | CAD 198.99 (CDW Canadá); US$ 86–142 (marketplaces) | NV | Media (licenciamiento poco claro) | [F31] |
| **Xperix (ex Suprema) BioMini Slim 2** | Óptico (MDR) | BioMini SDK para Windows, Linux y Android; soportado por VeriFinger y MegaMatcher | Sí | **LFD por IA "conforme a ISO/IEC 30107-3 PAD nivel 1 y 2"** (declaración del fabricante; sin certificado independiente encontrado) | FBI PIV, Mobile ID FAP20 | **Sin precio publicado** (cotización) | NV | Media | [F32] |
| **ZKTeco SLK20R** | Óptico | SDK disponible (según hoja técnica) | Windows y Android | NV | FBI PIV, FAP20 (hoja técnica) | COP 316.200 (Colombia, con IVA); MXN 1.839 (México) | Vendido en la región; precio en Perú NV | Media (documentación del SDK irregular, NV) | [F33] |
| **ZKTeco ZK9500** | Óptico | SDK (NV) | NV | NV | NV | **S/ 199–209** (Falabella Perú) | **Sí** | Media | [F33] |

**Inferencia para el prototipo:**
- **SecuGen Hamster Pro 20** es la opción de menor riesgo de integración: SDK gratuito, WebAPI y precio bajo.
- **BioMini Slim 2** conviene si el objetivo experimental incluye **detección de huellas falsas** con un dispositivo que declara cumplir ISO 30107-3.
- Lo ideal es comprar uno de cada si el presupuesto lo permite, para comparar.

### 1.3 Motores de comparación (matching)

| Opción | Licencia | Plataforma | 1:1 / 1:N | Precisión publicada | Notas |
|---|---|---|---|---|---|
| **SourceAFIS para .NET 3.14.0** | Apache 2.0 (gratuita) | C# puro (NuGet) | Ambos | No hay benchmark oficial para .NET. Una tesis ucraniana midió EER = 1,04 % en la versión Java (no comparable con motores comerciales) | Ideal para un TSP porque se puede medir con el propio dataset. Plantilla propia (importa ISO 19794-2) [F34] |
| SDK del fabricante (SecuGen, BioMini) | Gratis con el hardware (según fabricante) | Windows / .NET | Normalmente 1:1; 1:N limitado | Declarada por el fabricante | Algunos SDK 1:N pueden requerir licencia (NV) |
| Neurotechnology VeriFinger / MegaMatcher | Comercial | .NET, Java, C | Ambos, escala alta | Participa en evaluaciones NIST (NV en esta investigación) | Costo de licencia NV; relevante para un piloto comercial |
| Verificación RENIEC | Servicio pagado por consulta | API | 1:1 contra el DNI | — | Útil para **KYC en el registro**, no para cada compra. Tarifa S/ 0,90–1,60 por consulta según una guía no oficial (**NV**) [F35] |

## 2. Proveedores de pagos

Se distingue entre funcionalidad **documentada (D)**, la que **requiere aprobación comercial (A)** y la **no confirmada (NC)**.

| Proveedor | Clientes / tokenización | Card-on-file / cobro iniciado por el comercio | 3DS / autenticación | Sandbox | Webhooks | Requisitos de acceso | Perú | Fuentes |
|---|---|---|---|---|---|---|---|---|
| **Mercado Pago — "Pagos Automáticos"** | D: crear `customer` y asociar tarjeta (`customer_id` + `card_token`) | D/A: cobros con tarjeta guardada **sin CVV**. **"Necesitas autorización del equipo de ventas"**; producto exclusivo | Primer pago con tarjeta presente. Los emisores pueden exigir 3DS (D en la doc. general; NV para este producto) | D (Checkout API / Bricks) | D | **A** | **Página para Perú NC**; solo se hallaron las de MX, BR, AR, CO y CL | [F27] |
| **Culqi** | D: tokens con número + CVV + vencimiento vía Culqi JS / Checkout v4 | **NC**: no se encontró cobro sin CVV en las fuentes revisadas | NC | D (llaves de prueba) | NC | Si se llama a la API de tokens directamente: **PCI DSS + SAQ-D** | Sí (peruana) | [F28] |
| **Niubiz** | **NC**: no se encontró documentación oficial pública de tokenización ni recurrencia | NC | NC | NC | NC | Contrato de comercio | Sí (mayor adquirente) | [F29] |
| **Izipay** | NC | NC | NC | NC | NC | Contrato | Sí | [F41] |

**Conclusiones:**
1. **Para el TSP:** basta con un **motor de transacciones simulado** propio y, opcionalmente, el **sandbox** de Mercado Pago o Culqi para mostrar el flujo de tokenización. La plataforma no debe almacenar PAN ni CVV; solo tokens del proveedor.
2. **Para pagos reales:** no hay una vía pública. Mercado Pago es el único con card-on-file sin CVV documentado, y exige **aprobación comercial**. Además está pensado para **cobros recurrentes**, no para compras puntuales en caja autorizadas con biometría.
3. **Restricción regulatoria:** la Resolución SBS 2286-2024 exige chip + PIN (u otro factor definido por la SBS) para **tarjeta presente** [F8]. La huella no es hoy un factor reconocido para reemplazar la tarjeta en ese canal (**I**, confirmar con un especialista). Un cobro con token iniciado por el comercio es un **cargo sin tarjeta presente**, con otras reglas de responsabilidad y autenticación reforzada para el canal digital.

**Alternativas para resolver la restricción (I):**
- **(a)** Alianza con un **emisor**: el banco registra la huella como factor de **su** cliente; es el modelo Biopago.
- **(b)** Alianza con un **adquirente**: el modelo PopID + J.P. Morgan o Sthaler + Worldpay.
- **(c)** **Sistema cerrado** (comedor universitario o corporativo) con saldo descontado por planilla o cuenta interna. Riesgo legal: emisión de dinero electrónico (ver `05`).
- **(d)** Usar la huella como **factor adicional** sobre la tarjeta o el celular, no como su reemplazo.

## 3. Preguntas de validación prioritarias
1. ¿Mercado Pago Perú habilita "Pagos Automáticos" para cobros puntuales iniciados por el comercio? → consulta comercial.
2. ¿Niubiz o Izipay ofrecen tokenización y cobro con token para comercios presenciales? → consulta comercial.
3. ¿La SBS reconoce la biometría del cliente, capturada en un dispositivo de un tercero, como segundo factor? → asesoría legal.
4. ¿El SDK de BioMini o SecuGen incluye detección de dedo vivo sin licencia adicional? → consulta al fabricante.

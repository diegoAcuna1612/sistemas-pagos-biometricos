# 02 — Productos internacionales y su presencia en Perú

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Criterio de clasificación de la presencia

| Estado | Definición |
|---|---|
| **Consolidada** | Comercialización o adopción local claramente demostrada (oficina, clientes peruanos nombrados, oferta en soles) |
| **Limitada** | Hay oferta local, pero con señales de cobertura o adaptación parcial |
| **No identificada** | No se encontró evidencia de comercialización o adopción en Perú |
| **Incierta** | La evidencia es contradictoria o insuficiente |

"No identificada" **no** significa "no existe en Perú": solo que estas búsquedas no lo encontraron.

## 2. Catálogo

### 2.1 Documentos de comercio exterior y aduanas

| Producto | Empresa y país | Mercado | Tracción | Funciones | Modelo y precio | Presencia en Perú | Competidores peruanos |
|---|---|---|---|---|---|---|---|
| **Expedock** | Expedock (EE. UU., fundadores filipinos) | Forwarders y agentes de aduana en Norteamérica | US$ 17,5 M levantados; clientes nombrados (ClearFreight, Ascent, JUSDA) [S12, S13] | Extracción y conciliación de facturas, estados de cuenta y archivos aduaneros, con revisión humana | Servicio con IA y revisión humana; **sin precio público** | **No identificada** | No se identificaron competidores con IA |
| **Raft** | Raft (Reino Unido) | Forwarders globales | US$ 30 M Serie B (2023); 60 clientes; 300 000 envíos al mes [S14] | Cuentas por pagar y **preparación de la declaración aduanera** | Sin precio público | **No identificada** | Ídem |
| SINTAD / SOFTPAD | Desarrolladores no identificados [PI] | Agencias de aduana peruanas | Exigidos en avisos de liquidador [S15, S18] | Gestión de órdenes y transmisión de la DAM (inferido de los avisos) | **[PI]** | Local (no son extranjeros) | Son los **incumbentes**: el nuevo producto debe **complementarlos**, no reemplazarlos |

**Posibilidad de adaptación:** alta. Expedock y Raft muestran que preparar la declaración desde documentos tiene valor pagado [S12–S14]. Ninguno se orienta a la DAM peruana, a las tablas de SUNAT ni a los sistemas locales [I]. **Construir una versión local** parece más viable que revenderlos [I].

### 2.2 Captura de pedidos B2B

| Producto | Empresa y país | Mercado | Tracción | Funciones | Modelo y precio | Presencia en Perú | Competidores peruanos |
|---|---|---|---|---|---|---|---|
| **Conexiom** | Conexiom (Canadá) | Distribuidores y fabricantes de Norteamérica | Afirma 16 de los 20 mayores distribuidores de Norteamérica [S11] | PDF, correo y Excel → orden de venta en el ERP; validación contra datos maestros | Cotización; sin precio público | **No identificada** | Softland Pedidos IA |
| **Esker** (Order Management) | Esker (Francia) | Empresas medianas y grandes | Casos en España y despliegue LatAm de Aliaxis [S27] | Captura de pedidos con IA integrada con SAP | Sin precio público | **Incierta**: hay despliegue regional, pero no se encontraron clientes peruanos | Ídem |
| **Lucy**, **Lleverage** | Advantive / CommerceVision (EE. UU., Australia); Lleverage (Países Bajos) | Pymes con ERP | Sin cifras públicas [S28] | PDF → pedido del ERP | Sin precio público; Lucy dice costar menos que un empleado | **No identificada** | Ídem |
| **Yalo** | Yalo (origen centroamericano, opera en LatAm) | Grandes marcas de consumo masivo y sus tiendas | Coca-Cola, Nestlé, Unilever; 1,6 millones de tiendas con Coca-Cola [S26] | Venta conversacional por WhatsApp con IA | Contratos empresariales | **Incierta**: opera en LatAm; sin evidencia peruana | — |
| **Softland Pedidos IA** | Softland / Ofisis (grupo chileno con operación peruana) | Mayoristas y distribuidoras **que usan el ERP Softland** | Lanzado en 2025 [S24] | WhatsApp, correo, PDF, Excel, audio e imagen; bandeja de aprobación; envío al ERP Softland | Sin precio público | **Consolidada** (producto local) | Es el competidor local |

**Brecha observada [I]:**
- El competidor local está atado a su propio ERP.
- Los productos extranjeros apuntan al correo y el PDF de Norteamérica y Europa, no a WhatsApp.
- Hay espacio para un producto **independiente del ERP**, pero la ventaja es frágil: cualquier ERP puede agregar la función.

### 2.3 Cuentas por pagar y cobrar

| Producto | Empresa y país | Tracción | Funciones | Precio | Presencia en Perú | Competidores peruanos |
|---|---|---|---|---|---|---|
| **Bemmbo** | Bemmbo (Chile), comprada por Buk en 2025 | Más de 100 clientes; compra de ~US$ 6 M (una fuente) [S38] | Automatiza cobros y pagos de pymes | Sin precio público | **No identificada** (anunció llegar a Perú en 2023) | Módulos de ERP (Softland, Siigo, Odoo) [S41] |
| Esker, Basware, Tipalti | Francia, Finlandia, EE. UU. | Grandes clientes | Cuentas por pagar de punta a punta | Empresarial | **Incierta** | Ídem |
| Wati, Aurora Inbox | Proveedores de WhatsApp | Casos comerciales [S58] | Recordatorios de cobro por WhatsApp | Por suscripción | **Limitada**: tienen páginas para Perú, pero son herramientas genéricas | — |

**Particularidad peruana [V/S]:** casi todas las facturas son XML con CDR [S39]. Hay detracciones con depósito masivo [S40] y un registro de compras propuesto por SUNAT [S3]. Por eso el valor de la IA es **menor** que en mercados con facturas en papel o PDF: buena parte del trabajo es **determinista** [I].

### 2.4 Estudios contables

| Producto | País | Tracción | Precio | Presencia en Perú | Competidores peruanos |
|---|---|---|---|---|---|
| **TaxDome** | EE. UU. | — | USD 800–1 200 por usuario al año [S36] | **No identificada** | Contasis (Darwin IA) [S30], Defontana Contadores [S31], CONCAR [S32], DSCONT |
| **Karbon** | Australia / EE. UU. | Afirma más de 30 000 profesionales [S36] | USD 59–89 por usuario al mes [S36] | **No identificada** | Ídem |
| **Gestta** | Brasil (Thomson Reuters) | 600 000 empresas en los estudios que lo usan [S35] | — | **No identificada** | Ídem |
| **Nubox** | Chile | 13 852 clientes en Chile (2021) [S34] | — | **Incierta**: anunció su llegada en 2022; no se confirmó | Ídem |

**Brecha observada [I]:** los incumbentes peruanos automatizan la **contabilidad** (registro, SIRE). No se encontró oferta de **gestión del estudio**: portal del cliente, recolección de documentos, calendario de vencimientos, buzón SOL de muchos clientes. Precios en dólares como los de Karbon o TaxDome probablemente sean altos para un estudio peruano [H].

### 2.5 Compras públicas

| Producto | País | Tracción | Precio | Presencia en Perú |
|---|---|---|---|---|
| **LicitaLAB** | Chile | US$ 450 000 levantados; más de 1 500 clientes entre Chile y Perú [S5] | Sin precio público | **Consolidada** (sitio .pe, clientes peruanos, prensa local) [S6, S10] |
| LicitAlertas, Afentu, laLicita.ai | Chile, España | — | — | **No identificada** |
| Licisoft, Licitaciones MYPE, LicitiGo | Perú / locales | — | Licitaciones MYPE desde S/ 49 [S8] | **Consolidada** |

**Conclusión:** mercado **saturado** en búsqueda de procesos y análisis de bases. No se recomienda entrar con otro buscador.

### 2.6 Seguridad laboral, contratistas, obra y campo

| Producto | País | Tracción o precio | Presencia en Perú | Competidores o sustitutos peruanos |
|---|---|---|---|---|
| **SafetyCulture** | Australia | ~USD 24 por usuario al mes; plan gratuito hasta 10 usuarios [S46] | **Incierta**: en español y usable desde Perú, sin evidencia de clientes peruanos | Excel y consultores SST (avisos de SSOMA) [PI: software local] |
| **Avetta** | EE. UU. | Afirma 130 000 empresas [S48] | **Incierta** | **Subcontrataley Perú** (Top Partners), 18 años en Chile [S47] |
| **Procore / Autodesk Construction Cloud** | EE. UU. | Empresas cotizadas en bolsa o globales | **No identificada** en las búsquedas | S10 para presupuestos (dominante según el conocimiento sectorial; **[PI]** confirmar), desarrollos propios [S53] |
| ObraPlanner | México | — | **No identificada** [S54] | — |
| **Fracttal** | Chile | 800+ clientes (2021) [S57] | **Incierta**: distribuidores en más de 15 países, Perú no figura en la lista directa | — |
| **Sofía (Reset)** | Chile | — | **Limitada**: llegó a Perú en 2021 [S56] | Agrosoft (35+ agroexportadoras, origen discutido) [S56] |
| **TrackTik / SoftGuard** | Canadá / Argentina | — | **Incierta** [S55] | No identificados |

### 2.7 Mercados ya consolidados en Perú (referencia, no oportunidad)

| Producto | Evidencia |
|---|---|
| **Buk** (RR. HH. y planillas, Chile) | 1 500 empresas clientes en Perú [S62] |
| **GeoVictoria** (asistencia y comedor, Chile) | Ya vende control de comedor en Perú (investigación previa) [S64] |
| **Sperant** (CRM inmobiliario, Perú) | Clientes inmobiliarios peruanos [S63] |

## 3. Respuestas a las 10 preguntas de presencia, para los productos clave

| Pregunta | Expedock / Raft (O1) | Conexiom / Esker (O2) | TaxDome / Karbon (O4) |
|---|---|---|---|
| 1. ¿Oficina, distribuidor o partner? | No identificado | No identificado | No identificado |
| 2. ¿Clientes peruanos públicos? | No | No | No |
| 3. ¿Oferta específica para Perú? | No | No | No |
| 4. ¿Español, soles y procesos peruanos? | No hay evidencia de soporte para la DAM | Esker sí tiene español; no hay evidencia de WhatsApp | TaxDome tiene interfaz en varios idiomas [PI]; no maneja SUNAT |
| 5. ¿Integración con sistemas peruanos? | No (SINTAD, SOFTPAD) | No (Starsoft, Concar, Siigo Perú…) | No (Clave SOL, SIRE) |
| 6. ¿Competidores nacionales? | No identificados con IA; SINTAD y SOFTPAD como base | **Sí:** Softland Pedidos IA | Parcial: Contasis, Defontana |
| 7. ¿Alternativas locales similares? | No identificadas | Sí (para clientes de Softland) | No para gestión del estudio |
| 8. ¿Uso legal y técnico desde Perú? | Técnicamente sí; **flujo transfronterizo** de datos personales si los hay (S61) | Ídem | Ídem; más el riesgo de guardar Clave SOL de terceros |
| 9. ¿Barreras de adopción? | Precio en dólares, falta de localización, integración | Ídem | Precio por usuario en dólares, falta de localización |
| 10. ¿Evidencia de oportunidad local? | Avisos de liquidadores que arman la DAM a mano [S15–S17] | El incumbente local lanzó el producto [S24] (señal de demanda) | Carga de libros y SIRE [S70]; no se midió el dolor de gestión |

## 4. Desarrollar, adaptar, revender o integrar

| Opción | O1 Aduanas | O2 Pedidos | O4 Estudios contables |
|---|---|---|---|
| **Desarrollar tecnología propia** | **Recomendada:** el valor está en la localización (DAM, SUNAT, SINTAD) [I] | Recomendada si se elige O2 | Recomendada |
| Adaptar un producto existente | No hay producto que licenciar (Expedock y Raft venden servicio final) | Posible con plataformas genéricas de extracción, pero el emparejamiento de productos es el núcleo | — |
| Revender | Sin evidencia de programas de reventa [PI] | Esker tiene partners [PI] | TaxDome o Karbon sin localización: valor bajo |
| Integrar | Obligatorio con SINTAD y SOFTPAD | Obligatorio con cada ERP | Con Contasis y Concar (exportación) |

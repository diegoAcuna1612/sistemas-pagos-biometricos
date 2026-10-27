# 04 — Top 10 oportunidades

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`. Puntajes en `09`.

Cada ficha sigue los 20 puntos del enunciado (§7). El diferenciador responde las cinco preguntas exigidas: qué limitación resuelve, para quién, cómo, qué beneficio medible y cómo comprobar que se valora.

| Rank | ID | Nombre provisional | Puntaje |
|---|---|---|---:|
| 1 | O2 | **PedidoListo**: captura de pedidos B2B multicanal | 71 |
| 2 | O1 | **DAM Asistida**: preliquidación de la DAM para agencias de aduana | 70 |
| 3 | O4 | **Estudio360**: gestión operativa para estudios contables | 68 |
| 4 | O11 | **CobraB2B**: cobranza y conciliación de abonos | 66 |
| 5 | O3 | **CxP Perú**: recepción y validación de comprobantes | 65 |
| 6 | O5 | Inteligencia de licitaciones | 65 (excluida) |
| 7 | O10 | Tareo y partes diarios de obra | 61 |
| 8 | O8 | SST digital para pymes | 60 |
| 9 | O9 | Acreditación de contratistas | 60 |
| 10 | O6 | Ejecución contractual con el Estado | 58 |

---

## 1. O2 — PedidoListo: captura de pedidos B2B multicanal (71)

| # | Punto | Contenido |
|---|---|---|
| 1 | Nombre | PedidoListo |
| 2 | Sector | Distribución mayorista: ferretería e insumos industriales, repuestos, materiales, consumo |
| 3 | Cliente objetivo | Distribuidora mediana (rango a validar [H]: 5–50 vendedores y asistentes) que **no** usa el ERP Softland |
| 4 | Comprador / usuario | Comprador: gerente comercial o de operaciones. Usuario: asistente comercial o de ventas internas |
| 5 | Problema | Los pedidos llegan por WhatsApp (texto, audio, foto), correo y órdenes de compra en PDF. Alguien los interpreta, busca códigos y los digita |
| 6 | Cómo se resuelve hoy | Digitación manual en el ERP o en Excel [H]; Softland Pedidos IA para sus clientes [S24] |
| 7 | Consecuencias | Demoras, códigos o cantidades equivocados, pedidos olvidados [H] |
| 8 | Producto | Bandeja que recibe los pedidos de todos los canales, propone las líneas con su código y precio, y deja que el asistente apruebe y exporte al ERP |
| 9 | Flujo | Mensaje o PDF → transcripción del audio → extracción de líneas → **búsqueda de productos candidatos** (catálogo e historial del cliente) → propuesta → revisión humana → exportación (CSV, API del ERP) → confirmación al cliente |
| 10 | Tecnologías | API de WhatsApp Business, LLM multimodal con salida estructurada, búsqueda difusa o semántica sobre el catálogo, PostgreSQL, colas |
| 11 | Referencia | Conexiom, Esker, Lucy [S11, S27, S28] |
| 12 | Competidores en Perú | **Softland Pedidos IA** [S24]; Yalo para grandes marcas [S26] |
| 13 | Diferenciador | **Limitación:** Softland Pedidos IA solo integra con el ERP Softland [S24]; las extranjeras no priorizan WhatsApp ni español peruano. **Para quién:** distribuidoras con SAP B1, Odoo, Starsoft u otro ERP [PI: cuáles predominan, P6]. **Cómo:** conectores por ERP más exportación CSV universal; el emparejamiento aprende de las correcciones. **Beneficio medible:** minutos por pedido y porcentaje de líneas correctas sin edición. **Comprobación:** prueba con 50 pedidos reales históricos; medir la tasa de acierto y pedir un piloto pagado |
| 14 | Cobro | Mensualidad por tramos de pedidos [H] (`07`) |
| 15 | Dificultad de implementación | Media-alta: catálogo de cada cliente, integración por ERP |
| 16 | Dificultad de conseguir clientes | Baja-media |
| 17 | Riesgos | Técnico: errores de emparejamiento. Comercial: Softland u otros ERP extienden su producto. Regulatorio: políticas de WhatsApp y datos personales de los compradores |
| 18 | Evidencia | Producto del incumbente [S24]; tracción extranjera [S11, S27]; cifras de pedidos manuales del proveedor con atribución inconsistente [S25] |
| 19 | Incertidumbres | Volumen por canal; ERP predominantes; precio de Softland |
| 20 | Experimento | Ver `08` §3 |

## 2. O1 — DAM Asistida: preliquidación para agencias de aduana (70)

| # | Punto | Contenido |
|---|---|---|
| 1 | Nombre | DAM Asistida |
| 2 | Sector | Comercio exterior: agencias de aduana, luego forwarders e importadores con aduana propia |
| 3 | Cliente objetivo | Agencia de aduana mediana del Callao o Lima (tamaño a validar [H]) |
| 4 | Comprador / usuario | Comprador: gerente general o de operaciones. Usuario: liquidador y asistente de aduanas |
| 5 | Problema | El liquidador transcribe la factura comercial, el packing list, el B/L o AWB y los certificados al software de la agencia, y clasifica la mercancía [S15–S17] |
| 6 | Cómo se resuelve hoy | A mano en SINTAD o SOFTPAD [S15, S18] |
| 7 | Consecuencias | Horas de digitación; errores con riesgo de observaciones o multas [PI: P3]; cuellos de botella en temporada alta [H] |
| 8 | Producto | Sube el expediente; recibe un **borrador de datos de la DAM** con validaciones cruzadas y **partidas sugeridas** (no decididas); el liquidador revisa y exporta |
| 9 | Flujo | Carga (correo o portal) → clasificación de documentos → extracción de cabecera e ítems → validaciones (suma factura = packing list, pesos, incoterm, moneda, origen) → sugerencia de partida con el historial de la agencia → revisión lado a lado → exportación en el formato que acepte SINTAD/SOFTPAD (P2) o Excel |
| 10 | Tecnologías | LLM multimodal con salida estructurada; reglas deterministas; búsqueda sobre el arancel y el historial; PostgreSQL; almacenamiento de objetos; colas |
| 11 | Referencia | Expedock, Raft [S12–S14] |
| 12 | Competidores en Perú | No se identificaron con IA [baja confianza]; SINTAD/SOFTPAD son la base, no competencia directa |
| 13 | Diferenciador | **Limitación:** Expedock y Raft no manejan la DAM ni los sistemas peruanos; SINTAD y SOFTPAD (según los avisos) solo registran y transmiten. **Para quién:** agencias con muchos ítems por factura (retail, repuestos, tecnología). **Cómo:** extracción y validaciones con las reglas de la DAM, sin cambiar el sistema de transmisión. **Beneficio medible:** minutos de liquidación por DAM y errores detectados antes de numerar. **Comprobación:** 20 expedientes reales procesados en paralelo con el liquidador; comparar tiempo y errores; carta de intención con precio |
| 14 | Cobro | Por expediente procesado, con un mínimo mensual [H] (`07`) |
| 15 | Dificultad de implementación | Media; alta si no se puede exportar a SINTAD/SOFTPAD |
| 16 | Dificultad de conseguir clientes | Media: sector pequeño y de confianza; el gremio puede abrir puertas |
| 17 | Riesgos | Técnico: facturas de mala calidad, cientos de ítems, integración. Comercial: SINTAD/SOFTPAD agregan IA o bloquean la importación. Regulatorio: el agente responde por la declaración; confidencialidad de la información comercial |
| 18 | Evidencia | Avisos de empleo [S15–S18]; comisión mínima de USD 150 [S20]; productos extranjeros financiados [S12–S14] |
| 19 | Incertidumbres | Minutos por DAM; capacidad de importación de SINTAD/SOFTPAD; número actual de agencias; sueldo del liquidador |
| 20 | Experimento | Ver `08` §2 |

## 3. O4 — Estudio360: gestión operativa para estudios contables (68)

| # | Punto | Contenido |
|---|---|---|
| 1 | Nombre | Estudio360 |
| 2 | Sector | Estudios contables que atienden mypes |
| 3 | Cliente objetivo | Estudio con 2–15 personas y decenas de RUC [H] |
| 4 | Comprador / usuario | Comprador: contador titular. Usuarios: asistentes contables y los clientes del estudio |
| 5 | Problema | Pedir y ordenar documentos de muchos clientes, controlar vencimientos y vigilar el buzón SOL de cada RUC |
| 6 | Cómo se resuelve hoy | WhatsApp, Excel, ingreso manual a SOL [I]; software contable para el registro [S30–S32] |
| 7 | Consecuencias | Notificaciones válidas aunque no se lean [S37]; vencimientos perdidos; tiempo de persecución de documentos |
| 8 | Producto | Portal y WhatsApp para recibir documentos clasificados; calendario por RUC; tablero de pendientes; **buzón SOL consolidado** solo si es legal y técnicamente posible (P7) |
| 9 | Flujo | El cliente envía fotos o PDF por WhatsApp → clasificación y archivo por RUC y periodo → checklist del mes → recordatorios automáticos → exportación al software contable |
| 10 | Tecnologías | WhatsApp Business, LLM para clasificar, almacenamiento, calendario tributario, cifrado de credenciales si aplica |
| 11 | Referencia | TaxDome, Karbon, Gestta [S35, S36] |
| 12 | Competidores en Perú | Contasis (Darwin IA), Defontana Contadores, CONCAR (contabilidad) [S30–S32] |
| 13 | Diferenciador | **Limitación:** los incumbentes automatizan el asiento, no la relación con el cliente; TaxDome y Karbon no conocen SUNAT y cobran en dólares por usuario. **Para quién:** estudios con muchos RUC pequeños. **Cómo:** recolección por WhatsApp más un calendario peruano. **Beneficio medible:** documentos completos al día X del mes; horas de persecución. **Comprobación:** piloto con 3 estudios durante un cierre mensual |
| 14 | Cobro | Por estudio, con tramos por número de RUC [H] |
| 15 | Dificultad de implementación | Media |
| 16 | Dificultad de conseguir clientes | Baja (colegios, comunidades), pero ticket bajo |
| 17 | Riesgos | Seguridad de la Clave SOL; Contasis amplía su producto; precio |
| 18 | Evidencia | Análogos pagados [S35, S36]; 63 000+ contadores [S33] |
| 19 | Incertidumbres | Disposición a pagar; legalidad del acceso al buzón |
| 20 | Experimento | Ver `08` §4 |

## 4. O11 — CobraB2B: cobranza y conciliación de abonos (66)

| # | Punto | Contenido |
|---|---|---|
| 1–4 | Nombre, sector, cliente, roles | CobraB2B · empresas que venden a crédito (distribuidoras, servicios) · comprador: gerente de finanzas; usuario: créditos y cobranzas |
| 5 | Problema | Facturas vencidas, seguimiento manual, abonos sin identificar en el extracto |
| 6 | Hoy | Excel, llamadas, WhatsApp manual; herramientas genéricas [S58] |
| 7 | Consecuencias | Atraso del 36% y 81 días de cobro en un caso peruano [S59] |
| 8–9 | Producto y flujo | Importa facturas (XML) → secuencias de recordatorio por WhatsApp y correo → el cliente sube la constancia → la IA lee la constancia o el extracto y propone la conciliación → revisión |
| 10 | Tecnologías | WhatsApp Business, extracción de constancias (imágenes de Yape, Plin, transferencias), reglas de conciliación |
| 11 | Referencia | Bemmbo, Upflow, Chaser [S38] |
| 12 | Competidores en Perú | Wati, Aurora Inbox y otros genéricos [S58]; módulos de ERP |
| 13 | Diferenciador | **Limitación:** las herramientas de WhatsApp no concilian; los ERP no persiguen. **Para quién:** empresas con muchos clientes pequeños que pagan por transferencia. **Cómo:** lectura de constancias más emparejamiento con facturas, considerando detracciones y retenciones. **Beneficio:** días de cobro y horas de conciliación. **Comprobación:** cartera real de un mes. Diferenciación **débil** (2/5) |
| 14 | Cobro | Mensualidad por facturas gestionadas [H] |
| 15–16 | Dificultad | Implementación media (sin banca abierta); clientes de acceso fácil |
| 17 | Riesgos | Producto genérico; bloqueo del número de WhatsApp por reportes [S58] |
| 18–19 | Evidencia e incertidumbres | Tesis [S59], compra de Bemmbo [S38] · disposición a pagar y diferencia frente a herramientas baratas |
| 20 | Experimento | Ver `08` §5 |

## 5. O3 — CxP Perú: recepción y validación de comprobantes (65)

| # | Punto | Contenido |
|---|---|---|
| 1–4 | Nombre, sector, cliente, roles | CxP Perú · medianas empresas sin ERP robusto · comprador: contador general o jefe de finanzas; usuario: analista de cuentas por pagar |
| 5 | Problema | Validar comprobantes, cruzarlos con la orden de compra, la GRE y la conformidad, calcular detracciones y conciliar con la propuesta del SIRE |
| 6 | Hoy | Módulos de ERP, Excel, revisión manual del SIRE [S41] |
| 7 | Consecuencias | Crédito fiscal perdido, detracciones mal depositadas [S40] [H] |
| 8–9 | Producto y flujo | Buzón de comprobantes → validación del XML y del CDR → reglas (detracción, retención, RUC habido) → cruce con la orden y la guía → archivo de pago masivo de detracciones → conciliación con el SIRE → exportación |
| 10 | Tecnologías | **Mayormente determinista** (XML UBL, reglas); IA solo para documentos sin XML |
| 11 | Referencia | Tipalti, Esker, Bemmbo |
| 12 | Competidores en Perú | Softland, Siigo, Odoo (módulo SIRE), Contasis Darwin IA [S30, S41] |
| 13 | Diferenciador | **Limitación:** los ERP de pymes cubren el registro, no siempre el cruce de tres vías ni la detracción masiva [PI]. Diferenciación **débil** (2/5): depende de hallar un segmento mal atendido |
| 14 | Cobro | Por comprobantes al mes [H] |
| 15–16 | Dificultad | Implementación baja-media; clientes medios |
| 17 | Riesgos | Commodity; los ERP lo agregan |
| 18–19 | Evidencia e incertidumbres | Normas [S1–S4, S40] · qué parte no cubren los ERP |
| 20 | Experimento | Ver `08` §6 |

## 6. Resto del top 10 (fichas resumidas)

| ID | Problema | Comprador | Propuesta | Competencia | Diferenciador posible | Cobro | Por qué no avanza |
|---|---|---|---|---|---|---|---|
| **O5** Licitaciones | Buscar procesos y leer bases | Gerente comercial de un proveedor del Estado | Alertas y análisis de bases con IA | LicitaLAB, Licisoft, Licitaciones MYPE, LicitiGo [S5–S9] | Ninguno verificable | Suscripción desde S/ 49 (competidor) [S8] | **Clonaría productos existentes** |
| **O10** Obra | Tareo y partes diarios a mano; mano de obra = 30–40% del costo [S53] | Gerente de proyectos de una constructora mediana | App de campo con voz y foto → parte diario y tareo → valorización | S10 [PI], desarrollos propios | Parte diario dictado por voz | Por obra activa [H] | Sin evidencia de pago |
| **O8** SST | Registros e IPERC en Excel; 5 421 multas en 2020–2022 [S44] | Jefe SSOMA o consultor SST | Registros obligatorios con plantillas de la Ley 29783 | SafetyCulture (~USD 24 por usuario) [S46]; locales [PI] | Plantillas peruanas listas para Sunafil | Por usuario | Diferenciación débil; datos médicos sensibles |
| **O9** Contratistas | Paquetes documentales por mandante [S49] | Área de contratos o SSOMA de la minera | Acreditación con lectura automática de documentos | Subcontrataley Perú [S47], Avetta [S48] | Lectura de documentos con IA | Pago del contratista o del mandante | Competidor local; ciclo de venta largo |
| **O6** Ejecución contractual | Plazos, penalidades, cartas fianza [S52] | Contratista del Estado | Calendario contractual y alertas | No identificada | Lectura del contrato y las bases con IA | Suscripción | Sin evidencia de demanda |

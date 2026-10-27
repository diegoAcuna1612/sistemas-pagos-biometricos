# 03 — Problemas y necesidades del mercado peruano

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

**Advertencia:** todo lo que sigue sale de fuentes de escritorio: normas, avisos de empleo, prensa, tesis y páginas de proveedores. **Ningún problema se confirmó con entrevistas.** La columna "Evidencia" indica qué tan sólido es cada uno.

## 1. Rasgos del contexto peruano que crean o cambian oportunidades

| Rasgo | Efecto en el diseño de productos | Fuente |
|---|---|---|
| **Factura electrónica casi universal** (XML UBL, CDR, PSE/OSE) | Leer facturas **nacionales** no requiere OCR ni IA: el XML ya está estructurado. La IA aporta en documentos **sin XML**: extranjeros, órdenes de compra, correos, WhatsApp | [S39] [I] |
| **SIRE:** SUNAT propone el registro de compras y ventas cada mes | Conciliar contra la propuesta es una tarea nueva y obligatoria; los incumbentes ya la atienden (Contasis, Defontana, Odoo) | [S1–S4, S30, S31, S41] |
| **GRE obligatoria con brecha:** 65 071 de ~140 323 transportistas la habían emitido a dic-2025 | Hay un mercado sin servir, aunque la no sanción se extendió hasta el 28/02/2027 | [S42] [V] |
| **WhatsApp es el canal comercial dominante** | Los pedidos, cobros y documentos llegan por WhatsApp, no por EDI ni portales | [S29] (consumidor) [I] para B2B |
| **Ley 32069 y Pladicop** (desde el 22/04/2025) | Cambio de plataforma en compras públicas; demanda de herramientas, ya atendida por varios proveedores | [S50, S5–S9] |
| **Nuevo reglamento de datos personales** (DS 016-2024-JUS) | Todo SaaS que procese datos de personas es **encargado del tratamiento**; si la nube está fuera de Perú hay **flujo transfronterizo** | [S61] |
| **Agentes de aduana con software local** (SINTAD, SOFTPAD) y despacho digital | Un producto nuevo debe **alimentar** esos sistemas, no reemplazarlos | [S15, S18, S23] |

## 2. Problemas investigados por sector

Formato: **problema** · quién lo sufre · cómo se resuelve hoy · consecuencia · evidencia.

### 2.1 Comercio exterior: preparación de la DAM

- **Problema:** el liquidador lee la factura comercial, el packing list, el B/L o AWB y los certificados de origen, y transcribe los datos al software de la agencia (series, cantidades, valores, pesos, origen). Además clasifica la mercancía.
- **Afectados:** agencias de aduana (unas 291 en 2017 [S19]) y áreas de importación de empresas grandes.
- **Hoy:** a mano, en SINTAD o SOFTPAD [S15–S18].
- **Consecuencias [H]:**
  - Horas de digitación.
  - Errores de valor, cantidad o partida, que pueden causar observaciones, rectificaciones o multas ([PI] tabla de sanciones, P3).
  - Cuellos de botella en temporadas altas.
- **Evidencia:** avisos de empleo que describen la tarea [S15–S17]; comisión mínima de USD 150 por B/L [S20]; productos extranjeros financiados que automatizan exactamente esto [S12–S14].
- **Faltan:** el tiempo por DAM, la frecuencia de errores y su costo.

### 2.2 Distribución mayorista: captura de pedidos

- **Problema:** los clientes (ferreterías, bodegas mayoristas, mineras, constructoras) piden por WhatsApp (texto, audio, foto), por correo o con una orden de compra en PDF. Un asistente interpreta, busca los códigos y digita en el ERP o en Excel.
- **Afectados:** distribuidoras con equipos de ventas y atención.
- **Hoy:** digitación manual; para clientes de Softland, Softland Pedidos IA [S24].
- **Consecuencias [H]:** demoras, códigos equivocados, pedidos perdidos fuera del horario de oficina.
- **Evidencia:**
  - Un incumbente lanzó el producto en 2025 [S24]: señal de demanda.
  - Cifras de 65–76% de pedidos manuales, pero citadas por el proveedor con atribución inconsistente [S25].
  - Productos extranjeros con tracción [S11, S27].
- **Faltan:** el volumen de pedidos por canal y los minutos por pedido.

### 2.3 Cuentas por pagar en medianas empresas

- **Problema:** recibir comprobantes de proveedores (XML, PDF y comprobantes no electrónicos), validarlos, cruzarlos con la orden de compra, la guía y la conformidad, calcular y pagar detracciones, registrarlos y conciliarlos contra el SIRE.
- **Hoy:** módulos de ERP, Excel, revisión manual del SIRE [S41]. En los estudios contables, Contasis Darwin IA [S30].
- **Consecuencias [H]:**
  - Crédito fiscal perdido por comprobantes no anotados o inválidos.
  - Detracciones mal depositadas: SUNAT tiene procedimientos de corrección, lo que indica que ocurre [S40].
- **Evidencia:** normas y procedimientos [S1–S4, S40]; productos de incumbentes. Mercado **atendido**.

### 2.4 Estudios contables: gestión de muchos clientes

- **Problema:** cada estudio atiende muchos RUC. Debe pedirles documentos (por WhatsApp), vigilar el buzón SOL de cada uno, cumplir el calendario de vencimientos y preparar el SIRE.
- **Hoy:** WhatsApp, Excel, ingreso manual a SOL cliente por cliente [I]; software contable para el registro [S30–S32].
- **Consecuencias:** las notificaciones son válidas desde que se depositan en el buzón, aunque nadie las lea [S37]. Un estudio que no revisa a tiempo expone a su cliente.
- **Evidencia:** más de 63 000 contadores colegiados [S33]; mercados análogos con productos pagados en EE. UU. y Brasil [S35, S36].
- **Faltan:** cuántos clientes atiende cada estudio y cuánto pagan por software.

### 2.5 Compras públicas

- **Problema:** monitorear el SEACE o Pladicop, leer bases y TDR, preparar propuestas; después, controlar plazos, penalidades y cartas fianza durante la ejecución.
- **Hoy:** monitoreo manual [S51] o con alguna de las cuatro o más plataformas existentes [S5–S9].
- **Evidencia de pago:** LicitaLAB, con más de 1 500 clientes entre dos países [S5], y planes desde S/ 49 [S8]. La **búsqueda** de procesos está resuelta.
- **Ejecución contractual:** hay riesgos documentados (cartas fianza falsas) [S52], pero **no** hay evidencia de demanda de software.

### 2.6 Transporte de carga

- **Problema:** emitir la GRE transportista, liquidar viajes, facturar y manejar detracciones.
- **Hoy:** el 54% de las empresas de carga aún no había emitido la GRE a dic-2025 [S42] [V].
- **Lectura [I]:** la brecha es grande, pero emitir la GRE ya lo ofrecen SUNAT y muchos PSE. Las empresas que faltan son probablemente las más pequeñas e informales: baja disposición a pagar [H].

### 2.7 Seguridad y salud en el trabajo

- **Problema:** mantener los registros obligatorios, el IPERC, las inspecciones y capacitaciones, y el comité o supervisor (desde 20 trabajadores).
- **Hoy:** Excel y consultores SST (avisos de SSOMA piden Excel) [I].
- **Evidencia:** 5 421 multas SST entre 2020 y 2022, la mayoría por gestión interna y por la matriz IPER (dato de una consultora) [S44]; 12% de las infracciones de Sunafil son de SST [S45].
- **Competencia:** SafetyCulture es accesible y barato [S46]; los competidores peruanos no se identificaron [PI].

### 2.8 Contratistas de minería e industria

- **Problema:** cada mandante exige su paquete documental (SCTR, homologación, SST) y lo revisa a mano [S49].
- **Competencia:** Subcontrataley Perú ya acredita tercerizadas [S47].
- **Venta:** a mandantes grandes; ciclo largo [I].

### 2.9 Construcción

- **Problema:** tareo de mano de obra (30–40% del costo), partes diarios, valorizaciones.
- **Hoy:** flujos manuales incluso en la empresa líder del rubro, según una tesis [S53].
- **Competencia:** S10 en presupuestos [PI], desarrollos propios, Procore sin presencia identificada.
- **Evidencia de pago:** ninguna.

### 2.10 Otros problemas revisados

| Sector | Problema | Evidencia | Por qué no avanza al top |
|---|---|---|---|
| Seguridad privada | Supervisión manual de rondas | Tesis [S55] | Clientes sensibles al precio; herramientas regionales ya existen |
| Agroexportación | Tareo y control de cosecha | Productos chilenos y locales operando [S56] | Mercado atendido |
| Mantenimiento industrial | Órdenes de trabajo en Excel | Fracttal y otros [S57] | Mercado atendido por un líder regional |
| Hostigamiento sexual laboral | Comité, canal de denuncias, plazos | Norma [S60] | Compra por obligación, presupuesto bajo; lo resuelven abogados y sistemas de ética |
| Datos personales | Nuevas obligaciones del reglamento | [S61] | Servicio más legal que de software |
| Cobranza B2B | Cartera vencida, conciliación de abonos | Tesis: 36% de atraso, 81 días de cobro [S59] | Pasa al top 10 (O11) |
| RR. HH., CRM inmobiliario, comedores | — | Buk, Sperant, GeoVictoria [S62–S64] | Mercados consolidados |

## 3. Patrones transversales [I]

1. **El documento llega por WhatsApp o correo y alguien lo transcribe.** Se repite en aduanas, pedidos, cuentas por pagar y estudios contables. Es el tipo 3 del enunciado y donde la IA multimodal aporta más.
2. **Los incumbentes locales ya agregan IA** dentro de su propio producto: Contasis (Darwin IA), Softland (Pedidos IA). La ventaja de un recién llegado está donde los incumbentes **no** llegan: nichos verticales o integración con varios sistemas.
3. **Lo peruano es la regla de negocio, no la IA.** Estructuras de la DAM, detracciones, SIRE, GRE, Clave SOL. Ese conocimiento es la barrera de entrada y el diferenciador.
4. **El XML reduce el valor de la IA en las facturas nacionales.** No conviene vender "OCR de facturas" en Perú.

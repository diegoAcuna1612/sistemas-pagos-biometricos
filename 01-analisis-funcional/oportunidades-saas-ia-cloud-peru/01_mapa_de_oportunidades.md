# 01 — Mapa de oportunidades

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Cómo se construyó el mapa

1. Se revisaron **20 sectores** (los del enunciado más comercio exterior y compras públicas).
2. Por cada uno se buscaron tres cosas:
   - Señales del problema en Perú: normas, avisos de empleo, prensa, tesis.
   - Un producto extranjero con tracción.
   - Competidores locales.
3. Salió una **lista amplia de 18 oportunidades** (O1–O18).
4. Se descartaron las que caen en mercados consolidados o sin diferenciador posible.
5. Las 10 restantes se puntuaron con la matriz del enunciado (`09`).

## 2. Mapa: sector → problema → referencia → oportunidad

| ID | Sector | Problema (detalle en `03`) | Referencia internacional | Competencia en Perú | Tipo (enunciado §3) | Estado |
|---|---|---|---|---|---|---|
| **O1** | Comercio exterior | Transcribir facturas y packing lists a la DAM | Expedock, Raft [S12–S14] | SINTAD/SOFTPAD (base, sin IA identificada) | 1, 3, 5 | **Finalista** |
| **O2** | Distribución mayorista | Pedidos por WhatsApp, correo o PDF digitados a mano | Conexiom, Esker, Lucy [S11, S27, S28] | **Softland Pedidos IA** [S24] | 2, 3, 5 | **Finalista** |
| **O3** | Administración (CxP) | Recepción, validación y conciliación de comprobantes de proveedores | Bemmbo, Esker, Tipalti [S38] | ERP (Softland, Siigo, Odoo), Contasis [S30, S41] | 4 | **Finalista** |
| **O4** | Estudios contables | Documentos de clientes, buzón SOL y vencimientos de muchos RUC | TaxDome, Karbon, Gestta [S35, S36] | Contasis, Defontana, CONCAR (contabilidad; no gestión del estudio) | 2, 6 | **Finalista** |
| **O5** | Compras públicas | Buscar procesos y leer bases | LicitaLAB, LicitAlertas | LicitaLAB, Licisoft, Licitaciones MYPE, LicitiGo [S5–S9] | 1 | Top 10; **excluida de finalistas** (diferenciación 1/5) |
| **O6** | Compras públicas | Control de ejecución contractual: plazos, penalidades, cartas fianza | Software de gestión de contratos (genérico) | No identificada | 2 | Top 10 |
| **O7** | Transporte de carga | GRE transportista y liquidación de viajes | TMS ligeros | SUNAT gratuito, PSE, SimpliRoute/Beetrack (ruteo) [PI] | 3 | Descartada (53/100, fuera del top 10) |
| **O8** | SST | Registros obligatorios, IPERC, inspecciones | SafetyCulture [S46] | No identificada [PI]; consultores | 1, 2 | Top 10 |
| **O9** | Minería e industria | Acreditación documental de contratistas | Avetta [S48] | **Subcontrataley Perú** [S47] | 2 | Top 10 |
| **O10** | Construcción | Tareo, partes diarios, valorizaciones | Raken, Procore, ObraPlanner [S54] | S10 [PI], desarrollos propios [S53] | 2, 3 | Top 10 |
| **O11** | Ventas B2B / tesorería | Cobranza y conciliación de abonos | Upflow, Chaser, Bemmbo [S38] | Herramientas genéricas de WhatsApp [S58] | 2, 4 | **Finalista** |
| O12 | Seguridad privada | Rondas y supervisión de puestos | TrackTik, SoftGuard [S55] | No identificada | 2 | Descartada: cliente sensible al precio; producto regional disponible |
| O13 | Agroexportación | Tareo y cosecha | — | Sofía, Agrosoft [S56] | 2 | Descartada: mercado atendido |
| O14 | Manufactura | Mantenimiento (CMMS) | MaintainX, Fracttal [S57] | Fracttal (por distribuidores) | 2 | Descartada: líder regional consolidado |
| O15 | RR. HH. / cumplimiento | Canal de denuncias y casos de hostigamiento | NAVEX, EthicsPoint | Estudios de abogados, EthicsPoint [S60] | 6 | Descartada: compra por obligación, poco presupuesto |
| O16 | Cumplimiento | Adecuación al DS 016-2024-JUS | OneTrust | Estudios de abogados | 6 | Descartada: servicio legal más que software |
| O17 | Concesionarios | Consumos en comedores | CBORD | GeoVictoria [S64] | 1 | Ya analizada en `../sistema-pagos-biometricos-cerrado/` |
| O18 | RR. HH., CRM inmobiliario | Planillas, ventas inmobiliarias | — | Buk (1 500 empresas) [S62], Sperant [S63] | — | Descartada: mercados consolidados |

## 3. Vista por tipo de oportunidad

| Tipo del enunciado | Mejores ejemplos | Comentario |
|---|---|---|
| 1. Producto extranjero poco adaptado | **O1** (Expedock/Raft sin DAM), O8 (SafetyCulture sin normas peruanas) | La adaptación tiene valor cuando la regla local es compleja (DAM) |
| 2. Nicho desatendido | O4 (gestión del estudio), O10 (obra), O6 | Hay que validar el pago |
| 3. Proceso manual automatizable | **O1, O2**, O3 | El patrón "documento → transcripción" de `03` §3 |
| 4. Sistemas que no se comunican | O3, O11 | Los ERP ya cubren buena parte |
| 5. Funcionalidad avanzada ahora accesible | **O1, O2** | La IA multimodal abarata leer documentos variados; su costo es de centavos (`06` §5) |
| 6. Producto internacional como servicio local | O4, O15, O16 | Sin evidencia de programas de reventa |

## 4. Mapa de calor

Resumen cualitativo; la puntuación formal está en `09`.

| ID | Problema | Pago evidenciado | Diferenciación | Acceso a clientes | Riesgo principal |
|---|---|---|---|---|---|
| O1 | Alto | Medio (indirecto) | **Alta** | Medio | Integración con SINTAD/SOFTPAD; conocimiento aduanero |
| O2 | Alto | Medio | Media | **Alto** | Competidor local; integración con muchos ERP |
| O4 | Alto | Medio | Media | **Alto** | Seguridad de la Clave SOL; precio bajo |
| O11 | Alto | Medio | Baja-media | Alto | Producto genérico; sin APIs bancarias |
| O3 | Alto | Medio | Baja | Medio | ERP y Contasis ya lo cubren |
| O5 | Medio | **Alto** | **Muy baja** | Alto | Saturado |
| O10 | Alto | Bajo | Media | Medio | Sin evidencia de pago |
| O8 | Medio | Medio | Baja | Medio | SafetyCulture barato; datos médicos sensibles |
| O9 | Alto | Medio | Baja | Bajo | Competidor local; ventas a mineras |
| O6 | Medio | Bajo | Media | Medio | Demanda sin evidencia |

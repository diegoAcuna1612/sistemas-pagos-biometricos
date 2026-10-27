# 05 — Análisis de los 5 finalistas

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

Finalistas: **O2** PedidoListo (71), **O1** DAM Asistida (70), **O4** Estudio360 (68), **O11** CobraB2B (66), **O3** CxP Perú (65). Las fichas completas están en `04`; aquí se comparan.

## 1. Comparación lado a lado

| Dimensión | O2 Pedidos | O1 DAM | O4 Estudios | O11 Cobranza | O3 CxP |
|---|---|---|---|---|---|
| Quién paga | Distribuidora (gerencia comercial) | Agencia de aduana (gerencia) | Estudio contable (titular) | Empresa que vende a crédito (finanzas) | Mediana empresa (contabilidad) |
| Cuántos compradores [I] | Miles en Perú (sin cifra; CIIU 46 [PI]) | ~291 agencias (2017) [S19] más forwarders | 63 000+ contadores; los estudios son menos [S33] | Miles | Miles |
| Valor por transacción | Un pedido (bajo-medio) | Un despacho (comisión ≥ USD 150 [S20]) | Un cliente del estudio al mes | Una factura cobrada | Un comprobante |
| ¿Dónde está la IA? | Esencial: texto libre y audio → productos | Esencial: documentos extranjeros variados → DAM | Auxiliar: clasificar documentos | Auxiliar: leer constancias | Marginal: el XML ya está estructurado |
| Competidor local más cercano | **Softland Pedidos IA** [S24] | **No identificado** | Contasis Darwin IA (parcial) [S30] | Herramientas genéricas de WhatsApp [S58] | ERP y Contasis [S30, S41] |
| Barrera que protege al entrante | Baja-media: integraciones | **Media-alta: conocimiento de la DAM** | Media: el WhatsApp del estudio | Baja | Baja |
| Riesgo que puede matar la idea | Que Softland u otro ERP lo ofrezcan a todos | Que SINTAD/SOFTPAD no permitan importar y el copiado asistido no ahorre tiempo | Que no sea legal ni seguro manejar la Clave SOL; que paguen muy poco | Que no se distinga de un bot barato | Que los ERP ya lo hagan bien |
| Dato que hay que conseguir primero | Minutos por pedido y ERP usado | Minutos de transcripción por DAM e importación en SINTAD | Cuánto pagaría un estudio | Días de cobro y cómo se concilia | Qué no cubre su ERP |

## 2. Análisis económico y comercial (enunciado §9)

### O1 — DAM Asistida

| Pregunta | Respuesta | Etiqueta |
|---|---|---|
| ¿Quién tiene presupuesto? | La agencia: cobra USD 150 o más por despacho [S20] y paga liquidadores | [V]/[I] |
| ¿Cómo decide? | Probablemente el gerente o dueño. Al menos una tesis de la UPC estudia una agencia de aduanas como empresa familiar [S71]; que esto sea común es una hipótesis | [H] |
| ¿Qué usa hoy? | SINTAD o SOFTPAD y liquidadores | [S] |
| ¿Cuánto cuesta el problema? | Minutos por DAM × costo por minuto del liquidador. **Ambos sin dato** (P4) | [PI] |
| ¿Cómo cobrar? | Por expediente procesado con un mínimo mensual | [H] |
| Costos recurrentes | IA: centavos por expediente (`06` §5); nube; soporte | [I] |
| Soporte | Al inicio, alto: calibrar con los documentos de cada agencia | [H] |
| Personalización | Mapear al formato de importación del sistema de cada agencia; historial de clasificación | [H] |
| Dependencia de APIs de IA | Sí, del LLM; mitigable con una capa intercambiable y pruebas de regresión | [I] |
| Barreras de retención | Si no se integra con SINTAD/SOFTPAD, el ahorro puede ser pequeño | [H] |
| Qué demostrar | Reducir de forma medible el tiempo por DAM y detectar errores antes de numerar | [H] |

### O2 — PedidoListo

| Pregunta | Respuesta | Etiqueta |
|---|---|---|
| ¿Quién tiene presupuesto? | Gerencia comercial u operaciones de la distribuidora | [H] |
| ¿Cómo decide? | Gerente más área de sistemas (por la integración con el ERP) | [H] |
| ¿Qué usa hoy? | Digitación; Softland Pedidos IA para sus clientes | [S24] |
| ¿Cuánto cuesta el problema? | Pedidos al día × minutos × costo del asistente; más errores y pedidos perdidos [PI] | [PI] |
| ¿Cómo cobrar? | Mensualidad por tramos de pedidos | [H] |
| Costos recurrentes | IA ~USD 0,003–0,05 por pedido (`06` §5); número de WhatsApp Business; nube | [I] |
| Soporte | Carga del catálogo, sinónimos, revisión de errores | [H] |
| Personalización | **Una integración por ERP**: el costo principal | [I] |
| Barreras de retención | Si el ERP ofrece algo parecido "gratis", se cambian | [H] |
| Qué demostrar | Porcentaje de líneas correctas sin edición y minutos ahorrados | [H] |

### O4 — Estudio360

| Pregunta | Respuesta | Etiqueta |
|---|---|---|
| ¿Quién paga y cómo decide? | El titular del estudio, rápido y con poco presupuesto | [H] |
| ¿Cuánto cuesta el problema? | Horas de persecución de documentos; riesgo de notificaciones no vistas [S37] | [H] |
| Costos | Bajos de IA; mensajería de WhatsApp; seguridad (credenciales) | [I] |
| Barreras | Precio; costumbre del WhatsApp personal | [H] |
| Qué demostrar | Cierre mensual con documentos completos antes y menos horas de seguimiento | [H] |

### O11 — CobraB2B y O3 — CxP Perú

| Pregunta | O11 | O3 |
|---|---|---|
| Presupuesto | Finanzas | Contabilidad |
| Costo del problema | Días de cobro (81 en un caso [S59]) × costo financiero | Crédito fiscal perdido + horas [PI] |
| Costos del servicio | Bajos | Bajos (determinista) |
| Barrera | Producto genérico | Los ERP ya lo hacen |
| Qué demostrar | Menos días de cobro | Cero comprobantes perdidos en el SIRE |

## 3. Riesgos comparados

| Riesgo | O2 | O1 | O4 | O11 | O3 |
|---|---|---|---|---|---|
| Técnico | Alto (emparejamiento, ERP) | Medio-alto (integración, facturas de mala calidad) | Medio (buzón SOL) | Medio (extractos sin API) | Bajo |
| Comercial | **Alto (incumbente)** | Medio (sector cerrado) | Medio (precio) | Alto (genérico) | Alto (commodity) |
| Regulatorio y privacidad | Medio (WhatsApp, datos de compradores) | Medio (confidencialidad; el agente responde por la DAM) | **Alto (Clave SOL)** | Medio | Bajo |
| Dependencia de proveedores | LLM, Meta (WhatsApp) | LLM; SINTAD/SOFTPAD | Meta, SUNAT | Meta | SUNAT |

## 4. Conclusión del análisis

1. **O1 y O2 son claramente superiores** a O4, O11 y O3: son los únicos donde la IA es **esencial** y no auxiliar.
2. **Entre O1 y O2 decide la competencia**:
   - O2 ya tiene un incumbente local con IA, atado a su ERP pero capaz de abrirse.
   - O1 no tiene un competidor de IA identificado, y su diferenciador (las reglas de la DAM) es más difícil de copiar.
   - A cambio, O1 tiene peor acceso a clientes y una integración incierta.
3. **O4 es el mejor plan C:** acceso fácil y bajo costo técnico, si se resuelve el tema de la Clave SOL (o se excluye esa función).
4. **O11 y O3 no se recomiendan** como primer producto. Les falta un diferenciador defendible. O3 puede ser un módulo futuro de un producto contable.

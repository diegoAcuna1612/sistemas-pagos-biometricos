# 11 — Recomendación final

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Decisión

**Investigar primero O1 — DAM Asistida**: preliquidación de la DAM con IA para agencias de aduana. **VALIDAR ANTES DE DESARROLLAR.**

**Plan B: O2 — PedidoListo**, captura de pedidos B2B multicanal para distribuidoras.

**Respuesta honesta al enunciado (§14):** **ninguna oportunidad cumple todavía todas las condiciones.** A todas les falta lo mismo:
- Evidencia directa de **disposición a pagar en Perú**.
- El **costo medido** del problema.

Ambas cosas solo se obtienen con entrevistas, que este informe no hizo. O1 es la que reúne más condiciones con la evidencia disponible.

## 2. Por qué O1 y no O2, si O2 puntúa un punto más (71 vs 70)

La diferencia de un punto está **dentro del margen de error** (`09` §5). El desempate se hizo con los criterios del enunciado (§14):

| Criterio del §14 | O1 Aduanas | O2 Pedidos |
|---|---|---|
| Competencia analizable con una **brecha concreta** | **Sí:** no se identificó IA local; Expedock y Raft no manejan la DAM [S12–S14] | Débil: **Softland Pedidos IA** ya existe [S24]; la brecha (otros ERP) es copiable |
| Tecnología avanzada con **valor medible** | Sí: minutos por DAM, errores antes de numerar | Sí: % de líneas correctas, minutos por pedido |
| Diferenciador difícil de copiar | **Medio-alto:** las reglas de la DAM | Bajo: integraciones |
| Valor por transacción | **Alto:** comisión ≥ USD 150 por despacho [S20] | Bajo: un pedido |
| Acceso a los primeros clientes | Medio: sector pequeño y cerrado | **Alto** |
| Tamaño del mercado peruano | **Pequeño** (~291 agencias en 2017 [S19]) | Grande |

**Resumen:** O1 tiene **mejor posición competitiva** y O2 **mejor acceso y mercado**.
- Para una empresa nueva, competir contra un incumbente que ya puso IA en su ERP es más arriesgado que enfrentar un mercado pequeño sin competidor visible.
- Por eso se prueba O1 primero, con criterios de corte rápidos: si falla en la semana 2, se pasa a O2.

## 3. Las 10 respuestas pedidas

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | **Producto que investigaría primero** | **DAM Asistida:** convierte la factura comercial, el packing list y los documentos de transporte en un **borrador validado de los datos de la DAM**, con partidas **sugeridas**, para que el liquidador revise y cargue en su sistema actual |
| 2 | **Cliente** | Agencias de aduana medianas de Lima y Callao con muchos expedientes de **facturas con muchos ítems** (retail, repuestos, tecnología). Comprador: gerente u operaciones. Usuario: liquidador |
| 3 | **Problema** | El liquidador transcribe y cruza a mano los datos de los documentos al software de la agencia y clasifica la mercancía [S15–S17]; se pierde tiempo y se cometen errores que cuesta corregir [H] |
| 4 | **Referencia** | **Expedock** (US$ 17,5 M) y **Raft** (US$ 30 M Serie B, empezó por la preparación de la declaración aduanera) [S12–S14]. Sistemas incumbentes que hay que complementar: **SINTAD, SOFTPAD** |
| 5 | **Diferenciador a probar** | **Localización a la DAM peruana sin cambiar de sistema.** Extracción más validaciones cruzadas con las reglas de la DAM y exportación en el formato de SINTAD/SOFTPAD. Se mide en **minutos ahorrados por DAM** y **errores detectados antes de numerar**, en expedientes reales |
| 6 | **Cobro** | **Por expediente procesado con un mínimo mensual**, más un cobro de configuración. El precio se fija con datos de la validación. Solo se sostiene si el ahorro es de **20–30 min o más por DAM** (`07` §3.2) |
| 7 | **MVP** | Carga de expediente → extracción de factura y packing list (cabecera e ítems) → validaciones → revisión lado a lado → exportación a Excel en el formato del sistema de la agencia → auditoría. Sin transmisión a SUNAT ni clasificación automática. Pipeline determinista con LLM; **sin agentes** (`06` §3.1) |
| 8 | **Primeros entrevistados y clientes** | Empresas que publican avisos de **liquidador** (señal de dolor actual); ranking de agentes de SUNAT y asociados de la AAAP; LinkedIn (liquidadores, jefes de operaciones); red universitaria de comercio exterior; eventos de BASC y AAAP (`08` §2.2) |
| 9 | **Qué validar en 2 semanas** | Ver §4 |
| 10 | **Qué justifica desarrollar, pivotar o descartar** | Ver §5 |

## 4. Plan de las próximas dos semanas

| Día | Acción | Salida |
|---|---|---|
| 1–2 | Armar la lista de 40 agencias (P1); preparar la guía (`08` §2.3) y el acuerdo de confidencialidad | Lista y materiales |
| 1–3 | **Resolver P2:** ¿SINTAD/SOFTPAD importan ítems desde Excel u otro archivo? (manuales, tutoriales, preguntar a liquidadores) | Sí / no / parcial |
| 2–5 | 20 contactos; 4 entrevistas con liquidadores | Notas con tiempos reales |
| 6–9 | 4 entrevistas más (2 con jefes o gerentes); 1–2 observaciones de liquidación cronometradas | Tiempos por paso; volumen mensual |
| 8–10 | Pedir 10–20 expedientes anonimizados a las agencias más interesadas | Conjunto de evaluación |
| 10 | **Decisión preliminar** con los criterios de §5 | Continuar con O1, modificar o pasar a O2 |
| En paralelo | 3 entrevistas de contraste con distribuidoras (O2) | Comparación |

**Qué debe quedar respondido al día 10:**
1. ¿Cuántos minutos de transcripción hay por DAM y en qué tipo de expediente?
2. ¿Cómo se cargan hoy los ítems en SINTAD o SOFTPAD?
3. ¿Quién decide y cuánto pagan hoy por software?
4. ¿Qué errores ocurren y cuánto cuestan?
5. ¿Hay al menos dos agencias dispuestas a entregar expedientes reales?

## 5. Criterios de decisión

| Resultado | Decisión |
|---|---|
| ≥ 5 de 8 confirman ≥ 20 min de transcripción en DAM frecuentes; ≥ 2 entregan expedientes; existe una vía de carga (importación o copiado aceptado) | **Continuar:** prototipo Mago de Oz (semanas 3–4) y piloto con precio (semanas 5–6). **Desarrollar** solo si ≥ 1 agencia firma un piloto pagado o una carta de intención con precio |
| El dolor está en la **clasificación** y no en la transcripción | **Pivotar** a un asistente de clasificación arancelaria (con revisión humana) |
| Las agencias no compran, pero los **importadores con aduana propia** o los **forwarders** sí muestran dolor | **Pivotar de cliente** |
| < 3 de 8 confirman el dolor, nadie comparte documentos, la transcripción toma pocos minutos o SINTAD/SOFTPAD ya lo resuelven | **Descartar O1** y aplicar el mismo plan a **O2** (`08` §3) |
| O1 y O2 fallan | Evaluar **O4** previa opinión legal sobre la Clave SOL; si tampoco, volver a la lista amplia (`01`) |

## 6. Alternativas descartadas y por qué

| ID | Oportunidad | Motivo |
|---|---|---|
| O5 | Licitaciones con IA | Mercado **saturado**: LicitaLAB (más de 1 500 clientes entre Chile y Perú), Licisoft, Licitaciones MYPE (desde S/ 49), LicitiGo [S5–S9]. Sería un clon |
| O3 | Cuentas por pagar | El XML hace innecesaria la IA para la mayoría de las facturas; ERP y Contasis ya lo cubren [S30, S41] |
| O11 | Cobranza B2B | Diferenciador débil frente a herramientas genéricas de WhatsApp [S58] |
| O4 | Estudios contables | Buen acceso, pero riesgo legal y de seguridad de la Clave SOL sin resolver y ticket bajo. **Plan C** |
| O7 | GRE para transportistas | Brecha real (65 071 de ~140 323 [S42]), pero GRE gratuita o barata y segmento informal |
| O9 | Acreditación de contratistas | Subcontrataley Perú ya opera [S47]; venta a mineras lenta |
| O8 | SST | SafetyCulture barato [S46]; datos médicos sensibles |
| O10, O6 | Obra, ejecución contractual | Sin evidencia de pago |
| O12–O18 | Seguridad privada, agro, CMMS, denuncias, datos personales, comedores, RR. HH. | Mercados atendidos o compra por obligación con poco presupuesto (`01` §2) |

## 7. Riesgos de la recomendación

| Riesgo | Efecto | Qué se hace |
|---|---|---|
| **Mercado peruano pequeño** | Techo de ingresos bajo solo con agencias peruanas (`07` §3.4) | Desde el diseño, separar reglas por país; validar forwarders e importadores; investigar los formatos de Chile, Colombia y Ecuador [PI] |
| El equipo no conoce aduanas | Mala calidad del producto | Sumar un **liquidador asesor** desde la validación |
| SINTAD o SOFTPAD agregan IA | Pérdida del diferenciador | Explorar una **alianza** con ellos como canal |
| Responsabilidad por errores | Reclamos | La revisión humana es obligatoria; el contrato limita la responsabilidad; el agente sigue siendo el declarante |
| Confidencialidad | Desconfianza para compartir documentos | Acuerdo de confidencialidad, retención mínima, borrado verificable |

## 8. Relación con el proyecto académico

- Si este trabajo alimenta un **TSP o una tesis**, O1 ofrece un núcleo de ingeniería medible:
  - Extracción multimodal con evaluación por campo.
  - Validaciones de reglas de negocio.
  - Revisión humana y auditoría.
  - Arquitectura multiempresa.
- **[PI]:** confirmar con la universidad si el tema y la modalidad son aceptables, como en la investigación previa (`../sistema-pagos-biometricos-cerrado/11_recomendacion_final.md` §6).

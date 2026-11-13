# 12 — Iteración 2: innovación y diferenciación competitiva (P6)

**Fecha:** 05/11/2026. Segunda iteración. Los archivos 00–11 no se modificaron.
**Fuentes nuevas:** N1–N10 en §9. Etiquetas como en `10_fuentes_y_evidencias.md`.

## 1. Método

Skill `creative-ideation`:
- **Encuadre:** *Jobs to Be Done* (Christensen; fuerzas de Moesta).
- **Ruptura del marco:** provocaciones PO (de Bono).
- **Selección:** premortem (Klein).
- **Terreno de alto riesgo** ("RPA con IA"): se descartaron las 5 primeras ideas.

**Punto de partida:** la iteración 1 concluyó que P6 no tiene oportunidad propia. Sus variantes eran O1, O3, O4 y O11 vistas desde la tecnología. Esta iteración buscó **un proceso documental distinto de esas oportunidades**, donde la automatización recupere dinero y no solo ahorre minutos.

## 2. Hallazgo: cobros a importadores con base legal para disputarlos

| Hecho | Fuente |
|---|---|
| El **Decreto Legislativo 1492** (El Peruano, 10/05/2020) establece que los servicios deben estar consignados en el documento de transporte, salvo los solicitados de forma adicional; el dueño de la carga solo paga lo contratado de común acuerdo | [N1, N2] |
| La SNI identificó tres cobros que las pymes "ya no tendrían que pagar": **gate in** (devolución del contenedor al depósito de vacíos), **vistos buenos** (endoso del B/L, cobrado 2–3 veces) y **movimiento de contenedor no contratado**. Estimó **más de 39 000 exportadores e importadores** beneficiados | [N1] (L) |
| La SNI denunció que **14 navieras y más de diez almaceneras o depósitos** cobraban por servicios no solicitados, no prestados o duplicados | [N3] |
| La AAAP señaló que las navieras **"hacen caso omiso"** de esas disposiciones y propuso sancionar el incumplimiento (PL 2801-2022) | [N5] |
| La SNI pidió al Congreso **no derogar** el DL 1492 (hay iniciativas en contra; la vigencia debe verificarse) | [N4] |
| Un estudio de la APN estimó sobrecostos en la cadena logística portuaria de **US$ 280 M al año** (fecha no clara) | [N7] |

**Lectura [I]:** la norma da al importador una **base para disputar** cobros que no figuran en el documento de transporte. El problema es práctico: el importador pyme paga para que le liberen la carga y no tiene tiempo ni conocimiento para revisar cada factura.

## 3. Qué ofrecen hoy los competidores

| Actor | Qué ofrece | Mercado | Fuente |
|---|---|---|---|
| **BlueCargo** | Auditoría de fletes con IA; declara más de US$ 350 M ahorrados en *detention & demurrage* y 99% de automatización | Norteamérica | [N8] |
| **Windward** | Automatización de *detention & demurrage* con IA generativa para agentes de carga (marzo 2025) | Global | [N9] |
| **DemurrageIQ** | Prevención de sobrestadías; recupera facturas incorrectas de navieras | EE. UU. | [N10] |
| Abogados, agentes de aduana, consultores logísticos | Reclamos caso por caso | Perú | [PI] |
| Producto en español o en Latinoamérica para esto | **No identificado** (confianza baja) | — | — |

## 4. El trabajo del cliente (JTBD)

> **Cuando** recibo la liquidación de la naviera, del agente de carga o del depósito temporal para liberar mi contenedor, **quiero** saber qué cobros no corresponden y recuperarlos sin pelearme solo, **para** no perder margen en cada importación.

| Fuerza | En este caso [H] |
|---|---|
| Empuje | Cobros no pactados documentados [N1, N3]; la carga no sale hasta pagar |
| Atracción | **Pago solo si se recupera** (sin costo inicial) |
| Ansiedad | Represalias de la naviera o del agente; "no vale la pena por US$ 80" |
| Hábito | Pagar y olvidarse |

## 5. Ideas rechazadas (las 5 obvias)

Plataforma RPA propia · IDP genérico · bots para portales de SUNAT · orquestador con tablero de bots · "agente de IA" que opera sistemas solo. Todas fueron evaluadas o excluidas en la iteración 1 o en la investigación de oportunidades.

## 6. Alternativas de diferenciación

### A. "Auditoría de gastos locales con pago por resultado" — **aterrizada**

- **Provocación PO (pensamiento imposible):** *po, el importador recupera dinero sin hacer nada.*
- **Mecanismo:**
  1. **Ingesta:** el importador reenvía las liquidaciones (PDF), el B/L y la cotización o el contrato de flete.
  2. **Extracción:** cada concepto cobrado se extrae con IA (el motor documental de O1 y P3).
  3. **Comparación:** contra lo que dice el documento de transporte, contra la cotización y contra las reglas del DL 1492 y su reglamento [PI: DS 001-2021-MINCETUR no leído].
  4. **Hallazgos:** cobros duplicados, no pactados, días libres mal contados.
  5. **Reclamo:** carta con base normativa y documental, lista para que el importador o su agente la envíe.
  6. **Seguimiento:** estado del reclamo y del reembolso.
  7. **Base de conocimiento:** cada resultado (aceptado o rechazado, por naviera y por concepto) la alimenta.
- **Tipo:** comercial (pago por éxito) y tecnológica con conocimiento local (normas y tarifarios).
- **Por qué pagaría:** solo paga un porcentaje de lo recuperado; no tiene que revisar nada.
- **Difícil de copiar:** **media-alta**. El historial de resultados por naviera y concepto se acumula. Los competidores internacionales no tienen las reglas peruanas.
- **Modo de falla:**
  - Las navieras ignoran los reclamos (lo que reporta la AAAP [N5]) y no hay reembolsos que cobrar.
  - Se deroga el DL 1492 [N4].
  - **Primera métrica a validar:** monto reclamable por contenedor en 20 liquidaciones reales.

### B. "Módulo importador de O1"

- **Provocación PO (inversión):** *po, el agente de aduana cobra por lo que su cliente recupera.*
- **Mecanismo:** el agente de aduana (cliente de O1) ofrece la auditoría A a sus importadores con su marca y comparte el pago por éxito.
- **Tipo:** comercial (canal).
- **Por qué:** el agente ya ve las liquidaciones y tiene la relación con el importador.
- **Modo de falla:** conflicto de intereses si el agente también es agente de carga y emite esos cobros.

### C. Observabilidad de bots (V4 de la iteración 1)

Se mantiene **descartada**: comprador escaso y las plataformas ya lo incluyen.

## 7. Diferenciador elegido: nueva variante V6

**V6 — Auditoría de gastos locales y sobrestadías para importadores pymes, con pago por resultado.** Usa la arquitectura de P6 (`06` §2): ingesta, extracción, validaciones por reglas, excepciones, trazabilidad.

| Qué cambia | V3 (it. 1) | V6 (it. 2) |
|---|---|---|
| Valor | Minutos ahorrados por documento | **Dinero recuperado** |
| Cobro | Por documento | **Porcentaje de lo recuperado** |
| Reglas | Genéricas o las de la DAM (O1) | **Normas de cobros de comercio exterior** [N1, N2] |
| Relación con O1 | La duplica | **La complementa:** mismo cliente final, otro proceso |

## 8. Ventajas y riesgos (premortem)

| Narrativa de fracaso (junio 2027) | Probabilidad [H] | Mitigación |
|---|---|---|
| Las navieras rechazaron todos los reclamos; no hubo reembolsos y no se cobró nada | **Alta** | Validar antes con 20 reclamos manuales; incluir la vía ante Indecopi o el regulador competente [PI] |
| El Congreso derogó o modificó el DL 1492 | Media | Mantener reglas contractuales (cotización frente a factura), útiles con o sin la norma |
| Los importadores temieron represalias | Media | El reclamo lo envía el importador o su agente; el producto no aparece |
| El monto por contenedor era muy bajo | Media | Agregar por importador y por año; priorizar a los de mayor volumen |

| Ventaja | Por qué |
|---|---|
| Pago alineado con el resultado | El cliente no arriesga dinero |
| Base legal verificable | DL 1492 [N1, N2] |
| Refuerza O1 | Mismo canal (agentes de aduana) y mismo motor documental |

## 9. Evidencia de mercado (fuentes nuevas)

| ID | Fuente | Qué respalda | Tipo | Lect. |
|---|---|---|---|---|
| N1 | SNI (10/06/2020) — https://sni.org.pe/sni-tres-cobros-poco-transparentes-que-pymes-peruanas-ya-no-tendran-que-pagar-a-las-navieras/ | DL 1492; gate in, vistos buenos, movimiento de contenedor; +39 000 exportadores e importadores | [S] | **L** |
| N2 | Congreso, informe sobre el DL 1492 — https://www.congreso.gob.pe/Docs/comisiones2020/ConstitucionReglamento/files/informe_dl_1492-2020.pdf | Publicado el 10/05/2020; contenido de la norma | [V] | B |
| N3 | SNI, "Congreso no debe permitir que regresen los cobros abusivos" — https://sni.org.pe/sni-congreso-no-debe-permitir-que-regresen-los-cobros-abusivos-en-comercio-exterior/ | 14 navieras y +10 almaceneras con cobros no solicitados, no prestados o duplicados | [S] | B |
| N4 | SNI, "no derogar norma que frenó abusos" — https://sni.org.pe/sni-invoca-al-congreso-no-derogar-norma-que-freno-abusos-de-oligopolio-maritimo/ | Riesgo de derogación | [S] | B |
| N5 | AAAP, carta al Congreso — https://api.congreso.gob.pe/spley-portal-service/archivo/MjQ2MTI1/pdf | Las navieras hacen caso omiso; PL 2801-2022 propone sanciones | [S] | B |
| N6 | La Cámara — https://lacamara.pe/dl-1492-permite-transparencia-y-predictibilidad-para-consignatarios-y-duenos-de-la-carga-de-comercio-exterior/ | La CCL respalda el DL 1492 | [S] | B |
| N7 | Mundo Marítimo — https://www.mundomaritimo.cl/noticias/concesiones-no-ayudaron-a-reducir-sobrecostos-logisticos-portuarios | Sobrecostos de US$ 280 M al año (APN; fecha no clara) | [S] | B |
| N8 | BlueCargo — https://bluecargo.io/ | Auditoría de fletes con IA; más de US$ 350 M ahorrados (declarado) | [C] | B |
| N9 | Windward (marzo 2025) — https://windward.ai/news/windward-launches-detention-demurrage-automation-solution/ | Automatización de sobrestadías con IA generativa | [C] | B |
| N10 | StartupHub, DemurrageIQ — https://www.startuphub.ai/startups/demurrageiq | Prevención de sobrestadías y recuperación de facturas | [S] | B |

**Sin evidencia de disposición a pagar** en Perú. El modelo de pago por éxito reduce la barrera, pero solo funciona si hay montos recuperables. Esa es la primera pregunta.

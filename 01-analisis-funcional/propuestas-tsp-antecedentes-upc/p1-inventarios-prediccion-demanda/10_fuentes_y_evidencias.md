# 10 — Fuentes y evidencias

**Fecha de consulta:** 05/11/2026.
**Alcance:** búsqueda web de escritorio. **No se hizo ninguna entrevista ni se contactó a ningún comercio.**

## 1. Etiquetas

| Etiqueta | Significado |
|---|---|
| **[V]** | Verificado en fuente primaria |
| **[S]** | Fuente secundaria: prensa, tesis, agregador |
| **[C]** | Declaración comercial del proveedor |
| **[I]** | Inferencia del análisis |
| **[H]** | Hipótesis a validar |
| **[PI]** | Pendiente de investigación |

**Lectura:** **L** = página leída; **B** = solo fragmento del buscador (menor confianza).

## 2. Fuentes

| ID | Fuente | Qué respalda | Tipo | Lect. |
|---|---|---|---|---|
| S1 | La República (04/09/2025) — https://larepublica.pe/economia/2025/09/04/bsale-busca-digitalizar-a-2000-pymes-en-peru-y-facturar-us15-millones-en-2025-hnews-136872 | Bsale: 1 500 clientes en Perú, meta de 2 000 | [S] | B |
| S2 | Bsale (Perú) en Shopify — https://apps.shopify.com/bsale-peru | Plan avanzado ~USD 60/mes de la app (no del POS) | [C] | B |
| S3 | Software Advice, Treinta — https://www.softwareadvice.com.au/software/552153/Treinta ; Valora Analitik — https://www.valoraanalitik.com/?p=170876 | Precios USD 8,99 / 17,99; más de 4 millones de usuarios en 18 países (fecha inconsistente) | [S] | B |
| S4 | Tesis UPAO (2023), Treinta en el control de inventario de MYPES — https://repositorio.upao.edu.pe/handle/20.500.12759/41731 | 785 negocios en el grupo "Treinta-Perú"; muestra de 258 | [S] | B |
| S5 | ComparaSoftware, Loyverse — https://www.comparasoftware.com/loyverse-pos ; Capterra, Loyverse vs Kyte — https://www.capterra.es/compare/150632/206450/loyverse-pos/vs/kyte | Loyverse gratis con complementos; ambos con stock, historial de clientes y fidelización | [S] | B |
| S6 | Perú Retail — https://www.peru-retail.com/?p=293321 ; Revista Economía — https://www.revistaeconomia.com/?p=103249 | Onebeat lanzó IA de inventario en Perú (2023); Suplos; mercado de software de cadena de suministro de US$ 46,8 M (2025). **[PI] confirmar qué dato corresponde a cada URL** | [S] | B |
| S7 | Infomercado, Ordéname — https://infomercado.pe/ordename-la-app-que-busca-digitalizar-la-venta-de-bodegueros-y-potenciar-su-rentabilidad/ | App de compra con IA para bodegueros; ~414 mil bodegas (estimación del proveedor) | [S] | B |
| S8 | Perú Retail — https://www.peru-retail.com/el-28-de-las-bodegas-peruanas-utiliza-algun-aplicativo-para-impulsar-sus-ventas/ | 28% de las bodegas usa algún aplicativo | [S] | B |
| S9 | PRODUCE (nota de prensa) — https://www.gob.pe/institucion/produce/noticias/1168972-produce-peru-cerro-el-2024-con-2-34-millones-de-empresas-formales | 2 346 592 empresas formales en 2024; 99,1% MYPE | [V] | B |
| S10 | Forbes Perú (08/08/2024) — https://forbes.pe/economia-y-finanzas/2024-08-08/el-863-de-las-mype-es-informal-segun-un-estudio-de-comexperu/ | 86,3% de las MYPE es informal (ComexPerú) | [S] | B |
| S11 | UPC, "A Predictive Sales System Based on Deep Learning" (2024) — https://alicia.concytec.gob.pe/vufind/Record/UUPC_3246eaaa04f393ce428ebbf85f8a6200/Details | Antecedente UPC cercano: sistema predictivo de ventas para una comercializadora de Lima | [S] | B |
| S12 | Tesis USAT (2026) — https://repositorio.usat.edu.pe/items/9c1bcb16-f956-4a83-ac8c-6a4fab6a9a4c | XGBoost con mejor precisión para predecir demanda de inventario (caso minero) | [S] | B |
| S12b | Tesis PUCP (citada por el buscador, sin URL confirmada) | USD 52 469 de ahorro en un año con planeamiento cuantitativo de la demanda | [S] | B — **[PI] URL** |
| S13 | Perú Retail, canal tradicional — https://www.peru-retail.com/canal-tradicional-en-el-peru-un-sector-que-se-mantiene-en-la-cima/ | Peso alto del canal tradicional en el consumo (cifra citada: 70%; atribución no confirmada) | [S] | B |
| S14 | Investigación previa — `../../sistema-pagos-biometricos-cerrado/08_viabilidad_tsp_upc.md` | Requisitos de la UPC conocidos (modalidades, costo, riesgo del TSP como informe de experiencia) | [V] (en esa investigación) | L |

## 3. Afirmaciones clave y su respaldo

| Afirmación | Respaldo | Confianza |
|---|---|---|
| Los pequeños comercios peruanos ya tienen POS con inventario a bajo costo | S1–S5 | Media-alta |
| La mayoría de las bodegas no tiene historial digital | S8, S10 | Media |
| Ningún POS local recomienda la orden de compra por proveedor | Ausencia de resultados | **Baja** |
| Existe un antecedente UPC exacto ("predicción de ventas B2C con ML y Python, 2023") | No encontrado; el más cercano es S11 (2024) | **[PI]** |

## 4. Limitaciones

1. Sin entrevistas: el costo de los quiebres es hipótesis.
2. Casi todas las fuentes son "B".
3. No se revisaron las funciones completas de Bsale, Treinta, Loyverse ni Kyte: alguno podría ya sugerir compras.

## 5. Búsquedas pendientes

| # | Pregunta | Dónde buscar |
|---|---|---|
| P1 | ¿Algún POS local sugiere órdenes de compra? | Demos y centros de ayuda de Bsale, Treinta, Loyverse, Kyte |
| P2 | ¿Bsale y Loyverse tienen API pública de ventas e inventario? | Documentación para desarrolladores |
| P3 | Antecedente UPC exacto citado en la propuesta | repositorioacademico.upc.edu.pe, filtro 2023, "predicción de ventas" |
| P4 | Licencia de uso académico de los conjuntos públicos (Favorita, M5) | Kaggle |
| P5 | Software de boticas y de restaurantes usado en Lima | Directorios, entrevistas |

# Evaluación de 8 propuestas con antecedentes UPC

**Fecha:** 05/11/2026.
**Origen:** 8 propuestas planteadas a partir de antecedentes encontrados en ALICIA/UPC.
**Método:** cada carpeta replica la estructura 00–11 de `../oportunidades-saas-ia-cloud-peru/`. Dentro de cada propuesta, las "oportunidades" son **variantes** (segmentos o enfoques). Se usa **la misma matriz ponderada**, así que los puntajes se pueden comparar con O1 (70) y O2 (71).
**Alcance:** investigación de escritorio con búsqueda web. **No se hizo ninguna entrevista.** Sin entrevistas, ningún criterio de "evidencia de pago" supera 3/5.

## Ranking

| # | Propuesta | Mejor variante | Puntaje comercial | Viabilidad como TSP | Antecedente citado |
|---|---|---|---:|---|---|
| 1 | **P1** Inventarios y predicción de demanda | Reposición sugerida para ferreterías y minimarkets con POS | **68** | **Alta** (se mide con datos públicos) | No encontrado exacto; el más cercano es de 2024 |
| 1 | **P5** Pedidos y entregas sin conexión | Reparto de pymes con cobro contra entrega | **68** | **Alta** (sincronización medible) | No confirmado |
| 3 | P8 Fidelización | Lealtad B2B: la distribuidora premia a sus bodegas | 66 | Media-alta | **Verificado y muy parecido** (2023) |
| 4 | P6 RPA | Extracción documental vertical (≈ O1 si es aduanas) | 65 (≈ 70 en aduanas) | Alta | Hay dos trabajos UPC 2023 cercanos |
| 5 | P3 Gestión documental | Expedientes de clientes con validación IA | 64 | Media | Registro UPC (año no confirmado) |
| 5 | P4 Aprendizaje personalizado | Plataforma para academias (+ caso ENAM para el TSP) | 64 | Alta en medición, media en ejecución | No encontrado |
| 7 | P2 Automatización de pruebas | Evidencias y certificación para QA bancario | 63 | Alta, con riesgo de originalidad | **Verificado y casi idéntico** (2023) |
| 8 | P7 DevSecOps | Evidencias de cumplimiento desde el pipeline | 59 | Alta solo como implementación en un trabajo real | No encontrado |
| — | *Referencia:* O2 PedidoListo / O1 DAM Asistida | — | *71 / 70* | — | — |

## Lo que más pesa

1. **Ninguna propuesta supera a O1 ni a O2 en lo comercial.** Las dos mejores (P1 y P5) quedan a 2–3 puntos, dentro del margen de error.
2. **Como producto genérico, casi todas tienen un competidor gratuito o consolidado:** POS con inventario (Bsale, Treinta, Loyverse), herramientas libres de pruebas y DevSecOps, software público de trámites (SGD-PCM), Anki, puntos gratis en Loyverse, Rocketbot en RPA. Cada propuesta solo se vuelve viable al **acotar un nicho** (ver la mejor variante).
3. **La distribuidora del canal tradicional se repite como cliente:** P1-V6 (pedido sugerido), P5-V1 (preventa sin conexión), P8-V4 (lealtad de bodegas) y O2 (captura de pedidos). Juntas forman una **suite para distribuidoras** con un mismo cliente y los mismos datos [I].
4. **El patrón "documento → datos" se repite:** P3-V4 y P6-V3 son variantes de O1/O3. Si interesa esa línea, O1 sigue siendo la mejor posicionada.
5. **Dos antecedentes UPC son casi el mismo tema (P2 y P8).** Si se elige alguno, hay que formular un aporte distinto: certificación + IA en P2, medición causal con grupo de control en P8.

## Recomendación

| Si el objetivo es… | Elegir | Por qué |
|---|---|---|
| **Un TSP sólido y medible sin depender de un cliente** | **P1** (inventarios) o **P5** (sin conexión) | Datos públicos o simulación; métricas objetivas (MASE/WAPE; 0 duplicados y 0 pérdidas) |
| **Un TSP que además pueda ser negocio** | **P5-V2** o la suite para distribuidoras (P5-V1 + P1-V6 + O2) | Problema ligado a dinero; cliente con ticket medio |
| **Un TSP de experiencia profesional** | P2, P6 o P7, según el trabajo del autor | Se implementan en la empresa donde trabaja |
| **Un negocio con mejor posición competitiva** | Seguir con **O1** (`../oportunidades-saas-ia-cloud-peru/11`) | Sigue siendo la mejor diferenciada |

**Riesgo común a todas:** confirmar con la UPC si el TSP debe ser un informe de experiencia profesional (`../sistema-pagos-biometricos-cerrado/08_viabilidad_tsp_upc.md`).

## Carpetas

| Carpeta | Propuesta |
|---|---|
| `p1-inventarios-prediccion-demanda/` | P1 |
| `p2-automatizacion-pruebas-software/` | P2 |
| `p3-gestion-documental-tramites/` | P3 |
| `p4-aprendizaje-personalizado/` | P4 |
| `p5-pedidos-y-entregas-offline/` | P5 |
| `p6-automatizacion-rpa/` | P6 |
| `p7-devsecops-microservicios/` | P7 |
| `p8-fidelizacion-pequenos-negocios/` | P8 |

Cada una contiene 12 archivos: `00_resumen_ejecutivo` · `01_mapa_de_oportunidades` · `02_productos_internacionales_y_presencia_en_peru` · `03_problemas_y_necesidades_del_mercado_peruano` · `04_top_variantes` · `05_analisis_de_finalistas` · `06_arquitectura_y_viabilidad_tecnica` · `07_modelo_de_negocio_y_precios` · `08_plan_de_validacion` · `09_matriz_de_evaluacion` · `10_fuentes_y_evidencias` · `11_recomendacion_final`.

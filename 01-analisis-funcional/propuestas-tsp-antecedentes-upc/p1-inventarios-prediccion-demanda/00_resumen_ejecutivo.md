# 00 — Resumen ejecutivo: P1 Sistema inteligente de inventarios y predicción de demanda

**Fecha:** 05/11/2026.
**Propuesta evaluada:** plataforma web para pequeños comercios que pronostique ventas, recomiende cuánto comprar y avise de productos próximos a agotarse. Medición: error del pronóstico, quiebres de stock y tiempo de planificación.
**Estructura:** la misma de `../../oportunidades-saas-ia-cloud-peru/` (00 a 11), adaptada a una sola propuesta: las "oportunidades" son aquí **variantes** (segmentos o enfoques) de la misma idea.
**Fuentes y etiquetas:** `10_fuentes_y_evidencias.md`. [V] verificado · [S] secundaria · [C] declaración comercial · [I] inferencia · [H] hipótesis · [PI] pendiente.

## Veredicto

| Dimensión | Resultado |
|---|---|
| **Viabilidad como producto (mercado)** | **Media.** El pronóstico es una *función*, no un producto: los POS que ya usan los comercios (Bsale, Treinta, Loyverse, Kyte) controlan el inventario [S1–S5]. Solo se sostiene como **complemento sobre datos que el comercio ya tiene** |
| **Viabilidad como TSP** | **Alta.** Se puede medir con datos públicos, sin depender de un cliente; el núcleo de ingeniería (series de tiempo, políticas de reposición, multiempresa) es sólido |
| **Mejor variante** | **V2 — Reposición sugerida para ferreterías y minimarkets que ya usan POS** (68/100) |
| **Decisión** | **Validar antes de desarrollar** (2 semanas). Desarrollar el TSP aunque la validación comercial sea tibia, siempre que el comercio piloto entregue historial de ventas |

## Los hallazgos que más pesan

1. **Sin historial digital no hay pronóstico.** Solo el 28% de las bodegas usa algún aplicativo [S8] y el 86% de las MYPE es informal [S10]. La bodega sin POS (V1) queda descartada.
2. **Los POS locales ya cubren el inventario básico.** Bsale declara 1 500 clientes en Perú [S1]; Treinta cuesta desde USD 8,99 al mes [S3]; Loyverse es gratuito [S5]. Competir como "otro POS" no tiene diferenciador.
3. **El hueco está en la decisión de compra, no en el registro:** cuánto pedir a cada proveedor, con su plazo de entrega y su lote mínimo. Ninguna fuente revisada mostró que los POS locales lo hagan [I] (confianza baja).
4. **La demanda de una ferretería es intermitente** (muchos productos que se venden poco). Es el caso donde los métodos simples fallan y la ingeniería aporta (Croston/TSB, modelos globales) [I].
5. **El ticket es bajo:** el valor estimado para un minimarket es de decenas de soles al mes (`07` §3). El negocio necesita cientos de clientes o un canal (el propio POS o una distribuidora).

## Ranking de variantes

| # | ID | Variante | Puntaje | Nota |
|---|---|---|---:|---|
| 1 | V2 | Ferreterías y minimarkets con POS: reposición sugerida | **68** | Datos disponibles; demanda intermitente |
| 2 | V4 | Restaurantes: insumos por receta | 65 | Perecibles; POS de restaurante con inventario [PI] |
| 3 | V6 | Distribuidoras: pedido sugerido a sus bodegas | 64 | Un cliente con muchos puntos de venta |
| 4 | V3 | Boticas independientes: reposición y vencimientos | 63 | Regulación DIGEMID; software de farmacia existente [PI] |
| — | V5 | Tiendas online (Shopify, WooCommerce) | 58 | **Excluida:** oferta internacional consolidada |
| — | V1 | Bodegas sin POS | 53 | **Excluida:** sin datos y sin disposición de pago |

## Próximos pasos

1. Conseguir **2 comercios con POS** que exporten 12+ meses de ventas (Excel/CSV).
2. Ocho entrevistas a dueños o encargados de compras de ferreterías y minimarkets.
3. Medir con *backtesting* el error del pronóstico frente al método actual del comercio ("pido lo mismo que la vez pasada").
4. Decisión el día 10 (`11` §5).

## Índice

| Archivo | Contenido |
|---|---|
| `01_mapa_de_oportunidades.md` | Variantes por segmento |
| `02_productos_internacionales_y_presencia_en_peru.md` | POS locales y herramientas de pronóstico |
| `03_problemas_y_necesidades_del_mercado_peruano.md` | Problema por segmento |
| `04_top_variantes.md` | Fichas de las variantes |
| `05_analisis_de_finalistas.md` | Comparación de V2, V4 y V6 |
| `06_arquitectura_y_viabilidad_tecnica.md` | MVP, modelos, métricas, costos |
| `07_modelo_de_negocio_y_precios.md` | Valor, precio, escenarios |
| `08_plan_de_validacion.md` | Entrevistas, datos, criterios |
| `09_matriz_de_evaluacion.md` | Puntajes y sensibilidad |
| `10_fuentes_y_evidencias.md` | Fuentes y búsquedas pendientes |
| `11_recomendacion_final.md` | Decisión, plan y encaje con el TSP |

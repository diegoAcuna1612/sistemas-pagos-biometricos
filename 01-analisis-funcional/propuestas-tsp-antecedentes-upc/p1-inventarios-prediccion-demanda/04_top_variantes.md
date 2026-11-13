# 04 — Top de variantes

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`. Puntajes en `09`.

## 1. V2 — Reposición sugerida para ferreterías y minimarkets con POS (68)

| Campo | Contenido |
|---|---|
| Cliente | Ferreterías y minimarkets formales de Lima con POS y 500–5 000 productos |
| Comprador / usuario | Dueño / encargado de compras |
| Problema | Decidir cuánto pedir a cada proveedor sin quedarse sin los productos que más venden |
| Solución | Importa ventas e inventario del POS → pronóstico por producto → orden de compra sugerida por proveedor (con plazo de entrega y lote mínimo) → alertas de quiebre |
| Referencia | Inventory Planner, Netstock [PI] |
| Competencia local | POS con inventario sin reposición sugerida identificada (Bsale, Loyverse, Kyte) [S1, S5] |
| Diferenciador | Demanda intermitente bien tratada; orden de compra por proveedor; explicación en lenguaje simple ("pide 12 porque vendiste 3 por semana y el proveedor tarda 5 días") |
| Datos | Exportación del POS (Excel/CSV); API del POS [PI] |
| Métrica de valor | Días de quiebre en clase A; capital en sobrestock; minutos para armar el pedido |
| Precio tentativo | S/ 39–79 por tienda al mes [H] (`07`) |
| Riesgo principal | Que el POS agregue la función; que el dueño no confíe en la sugerencia |

## 2. V4 — Insumos por receta para restaurantes (65)

| Campo | Contenido |
|---|---|
| Cliente | Restaurantes y cafeterías de 1–3 locales |
| Solución | Pronóstico por plato y día → explosión por receta → lista de compra de insumos |
| Diferenciador | Combina calendario (feriados, quincenas) con recetas |
| Riesgo | POS de restaurante con inventario por receta [PI]; rotación alta de negocios; recetas no documentadas |

## 3. V6 — Pedido sugerido para distribuidoras (64)

| Campo | Contenido |
|---|---|
| Cliente | Distribuidoras medianas con 500–5 000 bodegas atendidas por preventistas |
| Solución | Para cada bodega y visita: pedido sugerido según su historial; alerta de bodegas que dejaron de comprar |
| Diferenciador | Funciona aunque la bodega no tenga POS; se vende a un solo cliente con muchos puntos |
| Riesgo | Ordéname y plataformas como Yalo [S7] [PI]; integración con el sistema de preventa; venta más larga |
| Relación | Se combina con P5 (app de pedidos) y con O2 de la investigación de oportunidades |

## 4. V3 — Boticas independientes (63)

| Campo | Contenido |
|---|---|
| Solución | Reposición + alertas de vencimiento por lote |
| Riesgo | Software de farmacia existente [PI]; normativa DIGEMID; datos de salud no, pero sí productos controlados |

## 5. Excluidas

| ID | Motivo |
|---|---|
| V5 — Tiendas online | Diferenciación 1: hay apps de reposición para Shopify disponibles globalmente [PI] |
| V1 — Bodegas sin POS | Sin datos; el producto tendría que ser primero un POS (Treinta ya lo es) [S3, S8] |

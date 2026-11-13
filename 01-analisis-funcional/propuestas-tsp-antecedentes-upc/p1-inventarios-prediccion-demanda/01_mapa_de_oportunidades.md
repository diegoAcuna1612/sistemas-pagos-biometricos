# 01 — Mapa de oportunidades (variantes de P1)

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Cómo se construyó el mapa

1. La propuesta original ("pequeños comercios") es demasiado amplia: un comercio sin POS y una ferretería con 3 000 productos tienen problemas distintos.
2. Se separó en **6 variantes** por tipo de comercio y por quién paga.
3. Para cada una se buscó: señales del problema, competidores locales y la existencia de datos de ventas.
4. Se puntuaron con la misma matriz ponderada de la investigación de oportunidades (`09`).

## 2. Mapa: segmento → problema → referencia → variante

| ID | Segmento | Problema | Referencia internacional | Competencia en Perú | ¿Hay datos de ventas? | Estado |
|---|---|---|---|---|---|---|
| V1 | Bodegas sin POS | Comprar "a ojo" al preventista | — | Treinta, Ordéname, preventistas de las marcas [S3, S7] | **No** (28% usa algún aplicativo [S8]) | Descartada |
| **V2** | Ferreterías y minimarkets con POS | Quiebres en productos de alta rotación y sobrestock en los de baja | Inventory Planner, Netstock [PI] | Bsale, Loyverse, Kyte: inventario sin reposición sugerida identificada [S1, S5] | **Sí** (exportación del POS) | **Finalista** |
| V3 | Boticas independientes | Quiebres, vencimientos y lotes | Software de farmacia con reposición [PI] | Software local de boticas [PI] | Sí, si usan sistema | Top |
| **V4** | Restaurantes y cafeterías | Compra de perecibles; merma | Apicbase, MarketMan [PI] | POS de restaurante con inventario por receta [PI] | Sí (ventas por plato) | **Finalista** |
| V5 | Tiendas online pymes | Reposición en Shopify/WooCommerce | Prediko, Inventory Planner [PI] | Apps de Shopify disponibles globalmente | Sí | Excluida (diferenciación 1) |
| **V6** | Distribuidoras del canal tradicional | Sugerir a cada bodega qué pedir en la visita | Yalo (pedido sugerido) [PI] | Ordéname (IA para abastecimiento de bodegas) [S7] | Sí (historial de pedidos por bodega) | **Finalista** |

## 3. Vista por tipo de oportunidad

| Tipo | Variantes | Comentario |
|---|---|---|
| Funcionalidad avanzada ahora accesible | V2, V4, V6 | Los modelos de series de tiempo son libres (Python) y baratos de ejecutar |
| Sistemas que no se comunican | V2 | El POS registra; nadie convierte el registro en una orden de compra |
| Nicho desatendido | V2 (ferreterías), V3 | Hay que validar el pago |
| Producto extranjero poco adaptado | V5 | Los productos existen y funcionan; no hay brecha local |

## 4. Mapa de calor

| ID | Problema | Pago evidenciado | Diferenciación | Acceso a clientes | Riesgo principal |
|---|---|---|---|---|---|
| V2 | Alto | Medio (pagan POS [S1]) | Media-baja | **Alto** | El POS agrega la función |
| V4 | Alto | Medio | Baja | Medio | Rotación alta de restaurantes; POS especializados |
| V6 | Medio | Medio | Media | Medio | Venta larga a la distribuidora |
| V3 | Alto | Medio | Baja | Medio | Regulación y software de farmacia existente |
| V5 | Medio | Alto | **Muy baja** | Medio | Saturado |
| V1 | Medio | **Bajo** | Muy baja | Alto | Sin datos |

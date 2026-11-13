# 03 — Problemas y necesidades del mercado peruano

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Rasgos del contexto peruano

| Rasgo | Efecto sobre P1 | Fuente |
|---|---|---|
| 2,35 millones de empresas formales, 99% MYPE | Mercado grande en número, de ticket bajo | [S9] |
| ~86% de las MYPE es informal | Muchas no tienen POS ni facturación electrónica: sin datos | [S10] |
| ~414 mil bodegas (estimación de un proveedor) | El segmento más numeroso es también el más difícil | [S7] |
| 28% de las bodegas usa algún aplicativo | El historial digital es la excepción en bodegas | [S8] |
| Canal tradicional con un peso alto en el consumo | El abastecimiento lo decide en parte el preventista de la distribuidora | [S13] |
| POS con facturación electrónica crecen (Bsale, Treinta) | Los comercios formales sí generan datos aprovechables | [S1, S3] |

## 2. Problemas por segmento

### 2.1 Ferreterías y minimarkets con POS (V2)

- **Qué pasa hoy [H]:** el dueño revisa los estantes o el reporte de stock y pide "lo mismo que la vez pasada" a cada proveedor.
- **Costo [H]:** ventas perdidas por quiebre en los productos de alta rotación y capital inmovilizado en los de baja.
- **Particularidad:** la ferretería tiene miles de productos con **demanda intermitente** (semanas sin venta). El promedio simple sobrestima o subestima [I].
- **Evidencia:** indirecta. Una tesis de la PUCP reporta ahorros de USD 52 469 en un año con planeamiento cuantitativo de la demanda, en una empresa mayor [S12b].

### 2.2 Restaurantes y cafeterías (V4)

- Compran perecibles a diario; la merma y el quiebre de un insumo detienen platos [H].
- El pronóstico por plato se convierte en insumos con la receta (explosión de materiales) [I].

### 2.3 Distribuidoras del canal tradicional (V6)

- El preventista visita a cada bodega y "sugiere" el pedido de memoria [H].
- La distribuidora tiene el historial de pedidos de cada bodega: hay datos aunque la bodega no tenga POS [I].
- Ordéname ya trabaja el abastecimiento de bodegas con IA [S7].

### 2.4 Boticas independientes (V3)

- Además del quiebre: **vencimientos** y control de lotes [H].
- Sujetas a DIGEMID; el software de boticas suele traer control de vencimientos [PI].

### 2.5 Bodegas sin POS (V1)

- Problema real, pero **sin datos**: habría que registrar cada venta primero. Es lo que intentan Treinta y otros [S3]; la predicción llegaría meses después.

## 3. Patrones transversales [I]

1. **El valor está en la orden de compra, no en el gráfico del pronóstico.** El comercio quiere saber "qué le pido mañana a cada proveedor".
2. **El dato existe donde ya hay un POS o una distribuidora.** Sin esa fuente, el producto tiene que convertirse en POS y pierde el foco.
3. **El error que importa es el de los productos que más venden** (clase A). Un buen MVP prioriza el 20% de los productos que hace el 80% de la venta.

# 02 — Productos internacionales y su presencia en Perú

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Criterio de presencia

| Nivel | Significado |
|---|---|
| **Opera** | Clientes o equipo en Perú documentados |
| **Disponible** | Se puede contratar desde Perú, sin presencia local documentada |
| **No identificado** | No se encontró evidencia (no prueba ausencia) |

## 2. Catálogo

### 2.1 POS e inventario para pequeños comercios (la base que ya existe)

| Producto | Origen | Qué hace | Presencia en Perú | Precio | Fuente |
|---|---|---|---|---|---|
| **Bsale** | Chile | POS, inventario, facturación electrónica, e-commerce; reportes de márgenes y productos más rentables | **Opera:** 1 500 clientes, meta de 2 000 (2025) | App de Shopify: plan avanzado ~USD 60/mes (no es el precio del POS) | [S1, S2] |
| **Treinta** | Colombia | App para micronegocios: ventas, inventario, conteos de stock | **Opera:** comunidad "Treinta-Perú" con 785 negocios estudiada en una tesis | USD 8,99 (app) y 17,99 (app + web) al mes | [S3, S4] |
| **Loyverse** | Internacional | POS gratuito con inventario y fidelización; módulos pagados | Disponible | Gratis + complementos | [S5] |
| **Kyte** | Brasil | POS, inventario, pedidos, tienda online | Disponible | [PI] | [S5] |
| Odoo, Siigo, Alegra | Varios | ERP/POS con inventario | Disponibles [PI] | [PI] | — |

### 2.2 IA para inventario y abastecimiento

| Producto | Qué hace | Presencia | Fuente |
|---|---|---|---|
| **Onebeat** (Israel) | Predicción de demanda de corto plazo y reabastecimiento automático para retail | Lanzó su solución en Perú en 2023 | [S6] |
| **Ordéname** (Perú) | App de compra para bodegueros con IA, orientada al abastecimiento del canal tradicional | Opera | [S7] |
| **Suplos** (Perú) | Abastecimiento y compras para empresas medianas y grandes | Opera | [S6] |
| Inventory Planner, Prediko, Netstock, Slimstock | Planificación de reposición para pymes y e-commerce | Disponibles [PI] | No consultadas en esta investigación |

## 3. Respuestas clave

| Pregunta | Respuesta |
|---|---|
| ¿Existe ya en Perú un POS barato con inventario? | **Sí**, varios (Bsale, Treinta, Loyverse) [S1–S5] |
| ¿Algún POS local recomienda cuánto comprar por proveedor? | **No se identificó** [I]; confianza baja: no se revisaron las funciones completas de cada POS |
| ¿Hay IA de inventario en Perú? | Sí, para retail mediano (Onebeat) y para bodegas desde el lado del abastecimiento (Ordéname) [S6, S7] |
| ¿Qué tan fácil es que un POS agregue pronóstico? | **Fácil** técnicamente [I]. Es el riesgo principal de V2 |

## 4. Desarrollar, adaptar, integrar o revender

| Opción | Evaluación |
|---|---|
| Desarrollar un POS nuevo con pronóstico | **No:** compite con Bsale, Treinta y Loyverse en su terreno |
| **Complemento sobre el POS existente** (importa ventas e inventario, entrega órdenes de compra sugeridas) | **Sí:** el comercio no cambia de sistema. Requiere exportación o API del POS [PI] |
| Alianza con un POS como canal (módulo de "reposición inteligente") | **Plan de salida natural** si el complemento funciona |
| Revender Onebeat | No: apunta a cadenas, no a pequeños comercios [I] |

# 00 — Resumen ejecutivo: P5 Sistema móvil de gestión de pedidos y entregas

**Fecha:** 05/11/2026.
**Propuesta evaluada:** app para registrar pedidos, asignar responsables y actualizar entregas incluso sin conexión, sincronizada con una plataforma web. Medición: tiempo de registro, errores de entrega, pedidos procesados y sincronización.
**Estructura:** la de `../../oportunidades-saas-ia-cloud-peru/` (00 a 11), adaptada a una propuesta con **variantes**.
**Fuentes y etiquetas:** `10_fuentes_y_evidencias.md`.

## Veredicto

| Dimensión | Resultado |
|---|---|
| **Viabilidad como producto** | **Media.** La última milla grande está cubierta (SimpliRoute con 80+ empresas en Perú; DispatchTrack/Beetrack con 850 clientes en la región) [S1, S2] y el pedido de bodegas tiene varias apps [S4–S6]. Queda espacio en **pymes con reparto propio y cobro contra entrega** |
| **Viabilidad como TSP** | **Alta.** El núcleo (sin conexión, sincronización sin pérdidas ni duplicados, conflictos, multiempresa) es ingeniería sólida y medible sin cliente |
| **Mejor variante** | **V2 — Reparto recurrente de pymes con cobro contra entrega** (agua, gas, panaderías, lácteos, abarrotes al por mayor) (68/100) |
| **Plan B** | **V1 — Preventa sin conexión para distribuidoras del canal tradicional** (68/100), que se acerca a O2 PedidoListo de la investigación de oportunidades |
| **Decisión** | **Validar antes de desarrollar** |

## Los hallazgos que más pesan

1. **El ruteo no es el diferenciador:** SimpliRoute y DispatchTrack ya ofrecen optimización de rutas con IA en Lima [S1–S3].
2. **El pedido de la bodega al proveedor tiene muchas apps** (Ordéname, Aló Bodega, Almacén Gurú, plataformas como Yalo) [S4, S5, S7, S13]. Otra app de bodega no aporta.
3. **El hueco probable está en la pyme que reparte con 2–10 motos o camionetas** y cobra en efectivo o Yape: pedidos por WhatsApp, hoja de ruta en papel y **cuadre de caja por repartidor al final del día** [H].
4. **Sin conexión es un requisito real** para repartidores y vendedores en zonas con mala señal o con planes de datos limitados [I].
5. **Hay evidencia académica de mejora:** una app de ventas en una empresa de Cajamarca redujo 56,45% el tiempo de pedido [S8].

## Ranking de variantes

| # | ID | Variante | Puntaje |
|---|---|---|---:|
| 1 | V2 | Reparto recurrente de pymes con cobro contra entrega | **68** |
| 2 | V1 | Preventa sin conexión para distribuidoras | **68** |
| — | V4 | App de pedidos de bodegas a proveedores | 59 (**excluida**) |
| — | V3 | Última milla de e-commerce | 58 (**excluida**) |
| — | V5 | Delivery propio de restaurantes | 57 (**excluida**) |

**V1 y V2 empatan.** Se prioriza V2 por mejor diferenciación (3 frente a 2): V1 compite con Softland Pedidos IA, Yalo y software de fuerza de ventas (`11` §2).

## Índice

`01` variantes · `02` competencia · `03` problema · `04` fichas · `05` finalistas · `06` arquitectura · `07` negocio · `08` validación · `09` matriz · `10` fuentes · `11` recomendación y TSP.

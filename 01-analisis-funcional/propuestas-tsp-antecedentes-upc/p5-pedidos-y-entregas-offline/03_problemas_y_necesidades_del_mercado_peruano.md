# 03 — Problemas y necesidades del mercado peruano

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Rasgos del contexto

| Rasgo | Efecto | Fuente |
|---|---|---|
| Canal tradicional con ~414 mil bodegas (estimación de un proveedor) | Muchas entregas pequeñas y frecuentes | [S4] |
| Bodegas que usan WhatsApp Business como canal de pedidos subieron ventas 15–25% (estudio de la Asociación de Bodegueros, citado) | El pedido por WhatsApp ya es normal | [S6] |
| ~86% de las MYPE es informal | Muchos repartidores sin sistema; pagos en efectivo | P1 S10 |
| Yape y Plin generalizados [I] | El cobro contra entrega se hace por QR o efectivo; hay que cuadrar | [PI] |
| Tráfico de Lima | Las rutas cambian; el ruteo con IA ya existe | [S3] |

## 2. Problemas por variante

### 2.1 Reparto recurrente de pymes (V2)

- **Qué pasa hoy [H]:** los pedidos llegan por WhatsApp o llamada; alguien los copia en un cuaderno; el repartidor sale con una lista; al volver, se cuadra el efectivo y los Yape contra la lista.
- **Errores [H]:** pedidos olvidados, entregas duplicadas, diferencias de caja, clientes que dicen "ya pagué".
- **Por qué sin conexión:** el repartidor entra a edificios, sótanos y zonas sin señal; necesita marcar la entrega y el cobro en el momento.

### 2.2 Preventa del canal tradicional (V1)

- El preventista visita 30–60 bodegas al día [H]; si la app falla sin señal, vuelve al papel.
- La evidencia académica muestra mejoras grandes con una app (−56,45% en tiempo de pedido en Cajamarca [S8]).

### 2.3 Última milla, bodegas y restaurantes (V3–V5)

- Problemas reales, pero con competidores establecidos (`02`).

## 3. Patrones transversales [I]

1. **El dinero es la parte crítica:** el cuadre de cobros es donde se pierde plata y confianza.
2. **"Sin conexión" no es una función, es la arquitectura**: cola local, identificadores únicos, sincronización idempotente.
3. **WhatsApp es la entrada de pedidos**; el producto no debe obligar al cliente final a descargar otra app.

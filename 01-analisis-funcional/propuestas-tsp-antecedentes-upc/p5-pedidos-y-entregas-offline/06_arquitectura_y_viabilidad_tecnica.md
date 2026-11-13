# 06 — Arquitectura y viabilidad técnica

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Principio de diseño

- **Offline-first:** la app funciona completa sin red; la red solo sincroniza.
- **Cada operación tiene un identificador único generado en el dispositivo** (UUID) y se envía de forma **idempotente**: reenviar nunca duplica (mismo principio que el registro de consumos de `../../sistema-pagos-biometricos-cerrado/`).
- **Registro de eventos de solo inserción** para entregas y cobros: el cuadre es una suma auditable, no un campo editable.

## 2. Arquitectura preliminar

```
WhatsApp / llamada / pedido recurrente ──► Bandeja de pedidos (web) ──► Asignación a repartidor
                                                                              │
                                                       Paquete del día (descarga al iniciar)
                                                                              ▼
                     App del repartidor (SQLite local): entregar / no entregar / foto / cobro
                                         │  cola de eventos con UUID
                                         ▼
                 API de sincronización (idempotente, por lotes, con reintentos)
                                         │
              Registro de eventos ──► Estado de pedidos ──► Cuadre por repartidor ──► Reportes
```

| Componente | Tecnología sugerida |
|---|---|
| App | Flutter o React Native + SQLite; sincronización en segundo plano |
| Backend | Node.js (NestJS) o Java (Spring); PostgreSQL con `empresa_id` |
| Sincronización | Lotes con UUID por evento; respuesta con acuses; resolución de conflictos por reglas |
| Mensajería | WhatsApp Business API (o, en el MVP, carga manual del pedido) |
| Mapas | Enlace a Google Maps / Waze; ruteo de terceros solo si se necesita |

## 3. Conflictos que hay que resolver

| Conflicto | Regla propuesta |
|---|---|
| Dos repartidores marcan el mismo pedido | Gana el primero en el servidor; el segundo recibe aviso |
| Se cancela un pedido que el repartidor ya entregó sin señal | La entrega prevalece; alerta al despachador |
| Cobro registrado dos veces por reintento | Imposible por idempotencia (mismo UUID) |
| Reloj del celular desfasado | Se guarda hora del dispositivo y hora del servidor |

## 4. MVP (8–10 semanas, estimación [H])

1. Empresas, repartidores, clientes, productos y precios.
2. Bandeja de pedidos y pedidos recurrentes.
3. Asignación y paquete del día.
4. App sin conexión: entregas, fotos, cobros.
5. Sincronización idempotente y pruebas de cortes de red.
6. Cuadre por repartidor y reporte diario.
7. Auditoría.

## 5. Métricas

| Métrica | Meta para el TSP |
|---|---|
| Duplicados tras 1 000 reenvíos | **0** |
| Pérdidas con cortes de red simulados | **0** |
| Tiempo de registro de una entrega | < 10 s (mediana) [H] |
| Diferencia de caja por repartidor | Reducción frente al registro en papel |
| Tiempo de cuadre al final del día | Reducción ≥ 50% [H] |

## 6. Costos [H]

| Concepto | Estimación |
|---|---|
| Infraestructura del MVP | USD 30–80 al mes |
| WhatsApp Business API | Costo por conversación según tarifas de Meta [PI] |
| Almacenamiento de fotos | Compresión y retención limitada |

## 7. Seguridad y privacidad

- Datos de clientes finales (nombre, dirección, teléfono): Ley 29733; mínimo necesario [I].
- Ubicación del repartidor: solo durante la jornada y con aviso [I].
- Cifrado del almacenamiento local del móvil.

## 8. ¿Requiere algo desproporcionado?

**No.** Es ingeniería conocida; el reto es hacerla bien (sincronización y conflictos).

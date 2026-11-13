# Iteración 2 — Integraciones entre propuestas y suite para distribuidoras

**Fecha:** 05/11/2026. Complementa `iteracion-2_00_resumen_ranking_y_recomendacion.md`.
**Fuentes:** se citan por carpeta (p. ej., `p8/12` N1 = fuente N1 del archivo 12 de P8). Etiquetas como en los archivos `10`.

## 1. Por qué integrar

En la iteración 1 la **distribuidora del canal tradicional** apareció como cliente de cuatro ideas:

| Pieza | Origen | Qué hace |
|---|---|---|
| M1 Captura de pedidos multicanal | O2 PedidoListo (investigación de oportunidades) | Convierte pedidos por WhatsApp, correo y PDF en pedidos del ERP |
| M2 Preventa y reparto sin conexión | P5-V1 + motor de P5 | App del preventista y del repartidor; sincronización sin pérdidas ni duplicados; cuadre |
| M3 Pedido sugerido y alerta de fuga | P1-V6 + P8 alternativa C | Sugiere qué ofrecer a cada bodega; detecta caídas por categoría |
| M4 Lealtad multimarca financiada | P8-V6 | Puntos y campañas financiadas por las marcas, medidas con grupo de control |

**Pregunta de la iteración 2:** ¿la suma es más defendible que cada pieza? Se aplicaron *Jobs to Be Done* al cliente común y un premortem a la suite.

## 2. Suite para distribuidoras multimarca

### 2.1 El hueco

| Actor | A quién sirve | Qué tiene | Fuente |
|---|---|---|---|
| BEES (AB InBev) | Fabricantes (Backus; socios como Gloria) | Pedidos, pedido sugerido, puntos (S/ 36 M+ al año en Backus), promociones | `p8/12` N1–N3 |
| Arca Continental Lindley | Sus bodegas | Pedido sugerido, Yape | `p8/12` N4 |
| YOM (Chile) | Fabricantes de consumo masivo | Venta en campo, portales, representantes con IA; Perú no confirmado | `p8/12` N7 |
| Softland Pedidos IA | Clientes del ERP Softland | Captura de pedidos con IA | Oportunidades S24 |
| CPG Soft | Distribuidores | Preventa, autoventa, cobranza; Perú no confirmado | `p8/12` N8 |
| Tienda Pago | Bodegas, vía distribuidores | Crédito de inventario | `p8/12` N5 |

**Lectura [I]:** los fabricantes grandes ya tienen **las cuatro piezas** para su propia venta. La **distribuidora multimarca independiente** (vende marcas de varios fabricantes medianos y compite por la misma bodega) no tiene un equivalente identificado. Además, la herramienta de los grandes es **monomarca**: la bodega pide gaseosas en una app y fideos en otra.

### 2.2 Trabajo del cliente (JTBD)

> **Cuando** un fabricante grande digitaliza a mis bodegas con su app, **quiero** que mis vendedores lleguen con algo igual o mejor para todas mis marcas, **para** que la bodega no me deje como proveedor de las demás categorías.

| Fuerza | En este caso [H] |
|---|---|
| Empuje | Apps de fabricantes con puntos y sugerido; pedidos que llegan desordenados por WhatsApp |
| Atracción | Una sola herramienta para todas las marcas, sin cambiar de ERP |
| Ansiedad | "Otra implementación"; "mis vendedores no la van a usar"; costo |
| Hábito | ERP + Excel + WhatsApp + vendedores con libreta |

### 2.3 Dónde está la defensa

| Fuente de ventaja | Tipo | Difícil de copiar |
|---|---|---|
| Historial de pedidos **por bodega y por categoría de varias marcas**: solo lo tiene la distribuidora | Datos | Alta (el fabricante solo ve lo suyo) |
| Uso diario por preventistas y repartidores | Costo de cambio operativo | Media-alta |
| Contratos de financiamiento con marcas (M4) | Comercial, tres partes | Media-alta |
| Sincronización sin conexión probada (0 duplicados, 0 pérdidas) | Tecnológica | Media |
| Cada módulo por separado | — | **Baja-media** (por eso no se venden por separado) |

### 2.4 Secuencia de construcción (cuña)

No se construye todo a la vez: la suite completa tiene viabilidad técnica 2/5 para un equipo pequeño.

| Fase | Módulos | Por qué en ese orden | Requisito |
|---|---|---|---|
| **1 (meses 0–4)** | **M1 + M2** | Resuelven la operación diaria; generan el historial que necesitan M3 y M4 | 1 distribuidora piloto |
| 2 (meses 4–8) | M3 | Necesita 3+ meses de historial por bodega | Datos de la fase 1 |
| 3 (meses 8–12) | M4 | Necesita contratos con marcas y un efecto medido | ≥ 2 marcas aportantes |

### 2.5 Modelo de cobro (hipótesis)

| Componente | Precio [H] |
|---|---|
| Por preventista o repartidor activo | S/ 60–120 al mes |
| Por bodega activa (M3, M4) | S/ 0,50–1 al mes |
| Por campaña financiada (M4) | % del fondo de la marca |

**Ejemplo ilustrativo [H]:** 20 preventistas × S/ 90 + 3 000 bodegas × S/ 0,70 = **S/ 3 900 al mes** por distribuidora. Sin entrevistas, este número **no** prueba disposición a pagar.

### 2.6 Matriz (misma de las carpetas)

| Criterio | Peso | Puntaje | Justificación |
|---|---:|---:|---|
| P | 20% | 4 | Presión verificable de apps de fabricantes (`p8/12` N1–N3) y pedidos desordenados (O2) |
| D | 20% | 3? | Tope sin entrevistas |
| Dif | 15% | **4?** | Multimarca, independiente del ERP, sin conexión, con datos por bodega que solo tiene la distribuidora; sin competidor identificado para este cliente. "?" porque YOM y CPG Soft podrían operar en Perú |
| A | 15% | 4 | Distribuidoras visibles y alcanzables (igual que O2) |
| T | 10% | **2** | Alcance grande: integración con varios ERP, app sin conexión, modelos, libro de fondos |
| R | 10% | **5** | Uso diario de varios roles; cobro por usuario, por bodega y por campaña |
| E | 5% | 4 | El canal tradicional es igual en la región |
| N | 5% | 4 | B2B; políticas de WhatsApp Business |
| **Total** | | **74** | **Confianza baja** |

### 2.7 Sensibilidad

| Escenario | Efecto |
|---|---|
| YOM o CPG Soft operan en Perú para distribuidoras multimarca (Dif 4 → 3) | Baja a 71 |
| Solo se construye la fase 1 (equivale a O2 + P5-V1) | ~71 (el valor de O2) |
| Una distribuidora firma un piloto pagado de la fase 1 (D 3 → 4) | Sube a 78 |
| BEES se abre a distribuidoras independientes multimarca (Dif 4 → 2) | Baja a 68 |

### 2.8 Premortem

| Narrativa de fracaso (junio 2027) | Mitigación |
|---|---|
| La distribuidora ya tenía preventa del proveedor de su ERP y no quiso otra app | Empezar por distribuidoras sin preventa digital; M1 se integra a cualquier ERP |
| El equipo intentó construir los cuatro módulos y no terminó ninguno | Fase 1 congelada; M3 y M4 solo con piloto pagado |
| Las marcas no financiaron campañas (M4) | M4 es opcional; la suite se sostiene con M1–M3 |
| Los preventistas no usaron la app | Diseño de 3 toques por pedido; sin conexión real; incentivo por uso |

### 2.9 Validación de la suite (2 semanas, en paralelo con P5)

| Día | Acción | Criterio de corte |
|---|---|---|
| 1–3 | Resolver las búsquedas pendientes: ¿YOM y CPG Soft operan en Perú? ¿con qué distribuidoras? | Si ya atienden a distribuidoras medianas peruanas: bajar Dif y replantear |
| 2–8 | 5 entrevistas a gerentes comerciales de distribuidoras multimarca (guía de `p5/08` §3 + O2 + P8) | ≥ 3 sienten la presión de apps de fabricantes **y** no tienen preventa digital |
| 6–10 | Pedir el historial de pedidos de una ruta | Si 1 lo entrega: preparar un piloto de la fase 1 |

## 3. Suite de comercio exterior: O1 + P6-V6

| Pieza | Qué hace | Cliente | Canal |
|---|---|---|---|
| O1 DAM Asistida | Preliquidación de la DAM desde factura y packing list | Agencia de aduana | Directo |
| P6-V6 Auditoría de gastos locales | Detecta cobros no pactados de navieras y depósitos, con base en el DL 1492 | Importador | **A través de la agencia de aduana** |

- **Por qué juntas:**
  - Mismo motor documental (extracción + reglas + excepciones + trazabilidad).
  - Mismo canal: la agencia ve las liquidaciones.
  - Dos fuentes de ingreso por cliente: por DAM y por éxito.
- **Estimación:** O1 (70) con recurrencia R 4 → 5 por la segunda línea de ingreso = **~72** (confianza baja; detalle en `p6/13` §4).
- **Riesgo propio:** conflicto de intereses si la agencia también actúa como agente de carga que emite esos cobros.

## 4. Motores compartidos (para un equipo de dos personas)

Construir **un** motor bien hecho habilita varias propuestas. Esta es la conexión entre el TSP y un negocio posterior.

| Motor | Lo usan | Núcleo técnico |
|---|---|---|
| **Sin conexión e idempotente** | P5-V6, suite M2, P3-V7 (campo), P4-V6 (app) | Cola local con UUID, sincronización por lotes, conflictos por reglas, registro de solo inserción |
| **Documental con reglas** | O1, P6-V6, P3-V7 | Extracción con esquema, validaciones cruzadas, revisión lado a lado, trazabilidad |
| **Predicción de series cortas** | P1-V7, P5-V6 (intervalos de reposición), suite M3 | Demanda intermitente, intervalos por cliente, evaluación con MASE |

**Lectura:** el motor **sin conexión + predicción de series cortas** (P5-V6) sirve a la mejor propuesta individual y a la fase 1 de la suite. Es el que más opciones abre (`iteracion-2_00` §7).

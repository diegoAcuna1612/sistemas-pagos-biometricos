# 08 — Plan de validación

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Reglas comunes

- Entrevistar sobre el **comportamiento pasado**, no sobre la intención ("¿cuándo fue la última vez que se te acabó algo?").
- No mostrar el producto antes de entender el proceso actual.
- Pedir siempre un dato verificable: la exportación del POS.
- **Contactar comercios requiere la autorización del equipo.** Este informe no contactó a nadie.

## 2. V2 — Ferreterías y minimarkets con POS (prioridad 1)

### 2.1 Entrevistados

| Perfil | Cantidad |
|---|---:|
| Dueños de ferreterías con POS | 4 |
| Dueños o encargados de minimarkets con POS | 4 |
| Proveedor mayorista de ferretería (contraste) | 1 |
| Vendedor o soporte de un POS local (contraste) | 1 |

### 2.2 Cómo encontrarlos

- Comercios que entregan boleta electrónica de un POS conocido (se ve en el comprobante) [I].
- Red familiar y de compañeros de la universidad.
- Grupos de Facebook y WhatsApp de ferreteros y bodegueros.

### 2.3 Guía de entrevista

1. ¿Cómo decides qué pedir y cuánto? ¿Cada cuánto pides a cada proveedor?
2. ¿Cuándo fue la última vez que se te acabó un producto que vendes mucho? ¿Qué pasó con el cliente?
3. ¿Tienes productos que no se mueven? ¿Cuánto dinero crees que hay ahí?
4. ¿Cuánto tiempo te toma armar los pedidos a la semana?
5. ¿Qué te muestra hoy tu POS sobre el stock? ¿Lo usas para pedir?
6. ¿Cuánto pagas por tu POS? ¿Pagarías por algo que te arme el pedido?
7. ¿Me compartirías la exportación de ventas de los últimos 12 meses para probar?

### 2.4 Evidencias que hay que pedir

- Exportación de ventas e inventario (anonimizada si lo prefieren).
- Lista de proveedores con frecuencia de pedido y plazo de entrega.
- Un pedido real reciente, para compararlo con la sugerencia.

### 2.5 Prototipo mínimo (semanas 3–4)

- **Mago de Oz:** con la exportación del comercio, el equipo calcula en un cuaderno de Python la orden sugerida y se la entrega en una hoja de cálculo.
- Durante 2–4 semanas se compara la sugerencia con lo que el dueño pidió y con lo que realmente se vendió.

### 2.6 Señales de interés comercial

| Señal | Peso |
|---|---|
| Entrega su exportación del POS | Alta |
| Usa la sugerencia para un pedido real | **Muy alta** |
| Pregunta el precio sin que se lo ofrezcan | Alta |
| "Interesante" sin compartir datos | Nula |

### 2.7 Disposición a pagar

- Preguntar cuánto paga hoy por su POS y anclar el precio como fracción de ese monto.
- Ofrecer un piloto de 1 mes a S/ 29 como prueba de pago real [H].

### 2.8 Criterios de decisión

| Resultado | Decisión |
|---|---|
| ≥ 5 de 8 reportan quiebres frecuentes en productos clave; ≥ 2 entregan datos; MASE < 1 en clase A | **Continuar** con V2 |
| Los dueños no ven el problema, pero el mayorista sí | **Pivotar a V6** (distribuidoras) |
| < 3 de 8 reportan el problema o nadie comparte datos | **Descartar V2** y evaluar V4 |
| El POS más usado ya hace reposición sugerida | **Descartar** el producto; mantener solo el TSP |

## 3. V6 — Distribuidoras (plan B)

- 3 entrevistas con jefes comerciales o de ventas de distribuidoras.
- Pregunta clave: ¿el preventista sugiere el pedido? ¿con qué información?
- Evidencia: historial de pedidos por bodega de 1 ruta (anonimizado).

## 4. V4 — Restaurantes (plan C)

- 3 entrevistas con dueños o jefes de cocina; pregunta clave: ¿cuánto botan por semana y cómo deciden la compra del día?

## 5. Cronograma sugerido

| Semana | Actividad |
|---|---|
| 1 | Lista de 30 comercios; guía; plantilla de exportación |
| 2 | 8 entrevistas; 2 exportaciones de datos; decisión preliminar |
| 3–4 | Mago de Oz con 2 comercios; *backtesting* |
| 5–6 | Piloto pagado (S/ 29) o pivote |

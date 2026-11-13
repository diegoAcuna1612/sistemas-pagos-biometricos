# 12 — Iteración 2: innovación y diferenciación competitiva (P5)

**Fecha:** 05/11/2026. Segunda iteración. Los archivos 00–11 no se modificaron.
**Fuentes nuevas:** N1–N9 en §9. Etiquetas como en `10_fuentes_y_evidencias.md`.

## 1. Método

Skill `creative-ideation`:
- **Encuadre:** *Jobs to Be Done* (Christensen; fuerzas de Moesta).
- **Ruptura del marco:** provocaciones PO (de Bono).
- **Selección:** premortem (Klein).
- **Terreno de alto riesgo** ("app de delivery"): se descartaron las 5 primeras ideas.

## 2. Qué ofrecen hoy los competidores (actualizado)

| Actor | Qué ofrece | Presencia | Fuente |
|---|---|---|---|
| SimpliRoute, DispatchTrack | Ruteo y última milla para empresas medianas y grandes | Operan en Perú | `10` S1–S3 |
| **TrackMyVend (México)** | Plataforma de reparto de agua para Latinoamérica: rutas, flota, **control de garrafones**, app del operador; desde MX$ 89 | Perú no confirmado; sin reseñas | [N1] |
| **Llamagas** (envasadora) | App propia de pedido de balones con instalación gratuita; alianza con PedidosYa | Opera | [N6] |
| **Facilito (Osinergmin)** | Ubicación de **locales de venta de GLP autorizados** y sus **precios**, que los locales deben reportar | Oficial | [N2] |
| Culqi, Kushki | Cobros con **Yape por API** (tokens, confirmación del pago) | Operan | [N7] |
| Treinta | Registro de ventas y deudas de micronegocios | Opera | P1 S3 |

**Lectura:** Facilito hace **comparables los precios** de los locales de GLP [N2]. Para un distribuidor pequeño, **retener al hogar** pasa a ser tan importante como repartir. Nadie en Perú ofrece al distribuidor una herramienta para eso [I] (confianza baja).

## 3. Hallazgos regulatorios del rubro GLP

| Hecho | Fuente |
|---|---|
| Osinergmin tramitó en 2025 la norma de **locales de venta multimarca** (cilindros de dos o más envasadoras); exposición de motivos de abril 2025 (RCD 75-2025-OS/CD, publicación final por confirmar) | [N3] |
| El Minem propuso **trazabilidad de compras y ventas**, prohibir el comercio de cilindros entre locales y distribuidores y regular el abastecimiento con facturación mensual (fecha y estado no confirmados) | [N4] |
| Los cilindros deben exhibir el rotulado de procedencia; un local no debe recibir cilindros sin él | [N5] |
| El vale FISE se canjea en agentes GLP autorizados con DNI y código digital; en 2023 se anunciaron 235 000 hogares nuevos beneficiarios | [N8] |

## 4. El trabajo del cliente (JTBD)

> **Cuando** a una familia se le acaba el balón un domingo a las 7 p. m., llama al primer número que tiene pegado en la cocina. **Quiero** que ese número sea el mío, y llamarla yo antes de que se le acabe, **para** no perderla frente al local de la esquina que aparece más barato en Facilito.

| Fuerza | En este caso [H] |
|---|---|
| Empuje | Precios comparables en Facilito [N2]; clientes que se van; envases que no vuelven; cuadre de efectivo y Yape |
| Atracción | Vender antes que el competidor; rutas con pedidos confirmados |
| Ansiedad | "Otra app para mis repartidores"; costo de los mensajes; que el cliente lo sienta como spam |
| Hábito | Cuaderno, llamadas, stickers en la puerta |

## 5. Ideas rechazadas (las 5 obvias)

Seguimiento GPS del repartidor · notificación de "su pedido está en camino" · optimización de rutas con IA · chatbot de pedidos por WhatsApp · tablero de entregas. Las tres primeras ya las tienen SimpliRoute y DispatchTrack. Las otras dos no cambian la decisión de compra del hogar.

## 6. Alternativas de diferenciación

### A. "El distribuidor llama antes de que se acabe el balón" + libro de envases — **aterrizada**

- **Provocación PO (distorsión del orden):** *po, el reparto ocurre antes del pedido.*
- **Mecanismo:**
  1. **Intervalo por hogar:** con el historial de pedidos se estima cuántos días dura un balón o un bidón en cada hogar (mediana e intervalo; un modelo simple de intervalos, no aprendizaje profundo).
  2. **Mensaje anticipado:** el día anterior al agotamiento previsto se envía una plantilla de WhatsApp: "¿Le llevamos su balón mañana? Responda 1".
  3. **Ruta del día:** se arma con pedidos confirmados más los probables.
  4. **Libro de envases:** cuántos balones o bidones tiene cada hogar, garantías cobradas y envases de otras marcas recibidos (relevante si se aprueba el esquema multimarca [N3]).
  5. **Cobro:** QR o enlace de Yape mediante una pasarela con confirmación automática [N7].
  6. **Cuadre:** automático por repartidor, con la sincronización sin conexión de la iteración 1.
- **Tipo:** operativa y comercial (retención), apoyada en una predicción simple.
- **Por qué pagaría:** vende antes que el competidor; recupera envases; no cuadra a mano.
- **Difícil de copiar:** **media**. TrackMyVend podría adaptarse y entrar a Perú. Una envasadora con app (Llamagas) apunta al hogar, no a los distribuidores independientes.
- **Modo de falla:**
  - Los hogares no responden o lo sienten como spam.
  - El consumo es irregular (cocina con leña a veces, varios balones).
  - El costo por conversación de WhatsApp [PI].
  - **Primera métrica a validar:** la tasa de respuesta al mensaje anticipado.

### B. "Cumplimiento GLP listo para lo que venga"

- **Provocación PO (escape):** *po, el fiscalizador ya tiene el registro de cada balón vendido.*
- **Mecanismo:** registro de compras y ventas por cilindro (marca, procedencia, cliente), canje FISE con evidencia, y reportes listos si se aprueba la trazabilidad propuesta por el Minem [N4].
- **Tipo:** regulatoria.
- **Modo de falla:** las propuestas no se aprueban; el canje FISE ya es simple [N8].
- **Uso recomendado:** **complemento** de A, no producto.

### C. "Los envases vuelven a su dueño"

- **Provocación PO (exageración):** *po, ningún envase vuelve.*
- **Mecanismo:** compensación de envases de otras marcas entre locales multimarca.
- **Tipo:** efecto de red.
- **Modo de falla:** especulativa; depende de la norma multimarca y de que los distribuidores colaboren. **Se descarta por ahora.**

## 7. Diferenciador elegido: nueva variante V6

**V6 — Reparto de GLP y agua en envases retornables, con reposición anticipada.** A es el núcleo y B un complemento.

| Qué cambia | V2 (it. 1) | V6 (it. 2) |
|---|---|---|
| Segmento | Pymes con reparto (agua, gas, panaderías, lácteos, abarrotes) | **GLP y agua en envases retornables** |
| Valor principal | Cuadre de cobros | **Vender antes que el competidor** + envases + cuadre |
| Cómo se encuentran clientes | Visitas | **Registro de locales autorizados (Facilito)** [N2] + stickers |
| Motor externo | Ninguno | Transparencia de precios y normas en movimiento [N2–N5] |

## 8. Ventajas y riesgos (premortem)

| Narrativa de fracaso (junio 2027) | Probabilidad [H] | Mitigación |
|---|---|---|
| Menos del 10% de los hogares respondió el mensaje anticipado; el distribuidor lo apagó | Media | Medirlo en la semana 2 con un Mago de Oz; cambiar la hora y el texto |
| Los distribuidores pagaron dos meses y se fueron | Alta | Precio por pedido confirmado; mostrar las ventas recuperadas cada semana |
| La norma de trazabilidad cambió el modelo de distribución | Media | B convierte el cambio en una razón de compra |
| Meta subió el costo de las conversaciones | Media | Agrupar mensajes; SMS como alternativa |

| Ventaja | Por qué |
|---|---|
| Clientes listables | Registro de Hidrocarburos y Facilito [N2] |
| Uso diario y retorno visible | Pedidos recuperados medibles por semana |
| Reutiliza la ingeniería de la iteración 1 | Sin conexión, idempotencia, cuadre |

## 9. Evidencia de mercado (fuentes nuevas)

| ID | Fuente | Qué respalda | Tipo | Lect. |
|---|---|---|---|---|
| N1 | Capterra, TrackMyVend — https://www.capterra.com/p/10043111/Reparto-de-TrackMyVend/ | Reparto de agua en Latinoamérica con control de garrafones; desde MX$ 89 | [S] | B |
| N2 | Proactivo, mejoras de Facilito — https://proactivo.com.pe/osinergmin-incorpora-mejoras-en-el-aplicativo-facilito-balon-de-glp-para-que-agentes-cumplan-con-actualizar-sus-precios/ ; DPL News — https://dplnews.com/?p=100910 | Facilito ubica locales de GLP autorizados y sus precios; obligación de reportar precios | [S] | B |
| N3 | Osinergmin, exposición de motivos multimarca (23/04/2025) — https://cdn.www.gob.pe/uploads/document/file/8216368/6865739-exposicion-de-motivos_multimarca-final-23-04-25.pdf ; RP 32-2025-OS/PRES — https://www.gob.pe/institucion/osinergmin/normas-legales/6545770-32-2025-os-pres | Proyecto de locales multimarca (2025); publicación final por confirmar | [V] | B |
| N4 | Proactivo, Minem — https://proactivo.com.pe/minem-plantea-medidas-para-fortalecer-la-industria-del-glp-en-todas-sus-actividades-para-combatir-la-informalidad/ | Trazabilidad de compras y ventas; prohibición de comercio entre locales y distribuidores (propuesta; fecha no confirmada) | [S] | B |
| N5 | Osinergmin, rotulado de procedencia — https://www.gob.pe/institucion/osinergmin/noticias/907142-osinergmin-balones-de-glp-deben-exhibir-informacion-de-su-procedencia | Rotulado obligatorio de los cilindros | [V] | B |
| N6 | App Store, Llamagas — https://apps.apple.com/cy/app/limagas/id1094052942 ; Energiminas — https://energiminas.com/?p=10832 | App de pedido de una envasadora; alianza con PedidosYa | [C]/[S] | B |
| N7 | Culqi, tokens Yape — https://docs.culqi.com/es/documentacion/pagos-online/cargo-unico/tokens-yape/ ; Kushki, Yape — https://docs.kushki.com/pe/apm/yape-payments | Cobro con Yape por API (Kushki en beta) | [C] | B |
| N8 | Trámites Perú, vale FISE — https://tramitesperu.com/bonos/vale-fise-gas/ ; Energiminas (12/06/2023) — https://energiminas.com/2023/06/12/mas-de-235-mil-hogares-se-incorporaran-como-nuevos-beneficiarios-del-programa-vale-de-descuento-glp-del-fise-minem | Canje con DNI y código digital en agente GLP autorizado; 235 000 hogares nuevos (2023) | [S] | B |
| N9 | Revista Economía, Arca Continental y Yape — https://www.revistaeconomia.com/arca-continental-en-peru-impulsara-la-inclusion-financiera-y-digital-de-las-bodegas-a-nivel-nacional-a-traves-de-yape/ | Pago con Yape a distribuidores (370 000 puntos de venta); el pago digital en reparto ya es habitual | [S] | B |

**Sin evidencia de disposición a pagar** de distribuidores de GLP o agua. Lo nuevo respalda el acceso (registro público), la presión competitiva (Facilito) y la viabilidad del cobro digital.

# 12 — Iteración 2: innovación y diferenciación competitiva (P1)

**Fecha:** 05/11/2026. Segunda iteración. Los archivos 00–11 no se modificaron.
**Fuentes nuevas:** N1–N11 en §9. Las etiquetas son las de `10_fuentes_y_evidencias.md`: [V] verificado · [S] secundaria · [C] comercial · [I] inferencia · [H] hipótesis · [PI] pendiente. Las S1–S14 siguen siendo las de `10`.

## 1. Método

Se usó la skill `creative-ideation` (NousResearch/hermes-agent, instalada con `npx skills add`):
- **Ruta:** dominio PRODUCTO en terreno de alto riesgo de ideas genéricas ("IA para inventarios"). La skill obliga en ese caso a combinar dos métodos y a descartar las 5 primeras ideas.
- **Métodos:** *Jobs to Be Done* (Christensen, *Competing Against Luck*, 2016; fuerzas de cambio de Moesta) para encuadrar el trabajo del cliente, y provocaciones **PO** (de Bono, *Lateral Thinking*, 1970) para romper el marco.
- **Selección:** premortem (Klein, *HBR*, 2007).

## 2. Qué ofrecen hoy los competidores (actualizado)

| Actor | Qué ofrece | Lo que no se vio | Fuente |
|---|---|---|---|
| **Bsale** | Inventario en tiempo real por sucursal; cada venta e ingreso actualiza el stock; reportes de ventas | Su página principal **no menciona** compras, proveedores, reposición ni pronóstico | [N1] (L) |
| Treinta, Loyverse, Kyte | Stock, conteos de inventario, POS | Reposición sugerida (no identificada) | [S3, S5] |
| Odoo y ERP similares | **Reglas mín./máx. que generan órdenes de compra automáticamente** | Requieren ERP, catálogo limpio y parámetros que el ferretero no tiene | [N11] |
| **Holcim — app INDAR** | Pedidos, garantías y devoluciones para ferreterías, solo de sus marcas | País de la nota no confirmado | [N6] |
| **Progresol (UNACEM)** | Red de ~1 000 puntos de venta ferreteros | Herramienta de reposición no identificada | [N5] |
| **TüL** (Colombia) | Plataforma B2B de abastecimiento: conecta ferreterías con proveedores; ahorro declarado de 3–8% en compras | Anunció Perú en 2021; **no se confirmó que opere** | [N7] |
| Ordéname, Onebeat | Abastecimiento de bodegas / IA para retail mediano | No apuntan a ferreterías | [S6, S7] |

**Lectura:** la regla "stock mínimo → orden de compra" **ya existe** en los ERP [N11]. No es diferenciador. Lo que falta es que funcione **para quien no tiene ERP, ni catálogo limpio, ni ganas de digitar**.

## 3. El trabajo del cliente (JTBD)

> **Cuando** el vendedor de la marca de tubos o de la distribuidora de fierro pasa por mi ferretería el martes y me pregunta qué necesito, **quiero** saber en ese momento qué se me va a acabar antes de su próxima visita y qué tengo parado, **para** pedir lo justo sin gastar la caja de la semana.

| Fuerza (Moesta) | En este caso [H] |
|---|---|
| **Empuje** (dolor actual) | Quiebre de los productos que más salen; capital parado en lo que no rota |
| **Atracción** (lo nuevo) | Llegar a la visita con el pedido armado |
| **Ansiedad** (miedo a lo nuevo) | "No sé mi stock real"; "tendría que cargar todo"; "la máquina no conoce mi negocio" |
| **Hábito** | Pedir de memoria al vendedor |

**Hallazgo del método:** la iteración 1 diseñó para la **atracción** (mejor pronóstico). El obstáculo real está en la **ansiedad y el hábito**: el ferretero no tiene su inventario cargado y no lo va a cargar. El diferenciador tiene que **eliminar la carga de datos**, no mejorar el modelo.

## 4. Necesidades desatendidas

1. **Conocer el stock sin POS ni conteo completo.** El ferretero formal está obligado a emitir comprobantes electrónicos (salvo el Nuevo RUS [N8]) y recibe facturas XML de sus proveedores. Nadie usa esos dos flujos juntos para reconstruir el inventario [I].
2. **Emparejar nombres.** El mismo producto aparece como "TUBO PVC SAP 1/2 X 5M" en la factura del proveedor y como "tubo media" en la boleta. Ese emparejamiento es el trabajo que nadie hace [I].
3. **El momento de decidir es la visita del vendedor**, no un tablero.

## 5. Ideas rechazadas (las 5 obvias)

Tablero de stock con gráficos · alertas de stock bajo por WhatsApp · chatbot "pregúntale a tu inventario" · "IA que predice tus ventas" · integración con Bsale como única fuente de datos. Todas suponen que el comercio ya tiene datos limpios. Es justo lo que no tiene.

## 6. Alternativas de diferenciación

### A. "El inventario se arma con los comprobantes" — **aterrizada (se puede empezar ya)**

- **Provocación PO (escape):** *po, el ferretero nunca registra su inventario.*
- **Mecanismo:**
  - **Compras:** una regla de reenvío en el correo donde llegan las facturas XML de los proveedores manda copia a una dirección del sistema.
  - **Ventas:** se toman las boletas y facturas emitidas (XML) desde el facturador o PSE que el comercio ya usa (exportación o API).
  - **Procesamiento:** se leen los XML (formato UBL 2.1 de SUNAT) y se emparejan las descripciones con un catálogo normalizado (reglas + similitud semántica + una confirmación humana por producto).
  - **Stock teórico:** compras − ventas + ajustes. Un **conteo cíclico guiado** de 10 productos al día corrige la deriva.
- **Tipo:** tecnológica, con conocimiento local (formato y catálogos de SUNAT).
- **Funcionalidades:**
  - Buzón de ingesta.
  - Conectores de exportación para 2–3 facturadores [PI: cuáles tienen API].
  - Pantalla de "confirma una vez".
  - Stock teórico con nivel de confianza por producto.
  - Conteo cíclico priorizado por valor y por incertidumbre.
- **Por qué pagaría:** ve su stock por primera vez **sin digitar ni cambiar de POS**.
- **Difícil de copiar:** **media**. Un facturador podría hacerlo para sus propios clientes. Pero unir compras de muchos proveedores con ventas de distintos facturadores exige trabajo que ninguno tiene incentivo a hacer solo.
- **Modo de falla:**
  - Boletas con descripciones genéricas ("VARIOS", "PRODUCTO") [H].
  - Ventas sin comprobante, que inflan el stock teórico.
  - Comercios del Nuevo RUS, que quedan fuera [N8].
  - **Por eso la primera métrica a validar es el % de líneas de boleta con una descripción identificable.**

### B. "Catálogo ferretero compartido"

- **Provocación PO (exageración):** *po, una ferretería con un millón de productos.*
- **Mecanismo:** cada emparejamiento confirmado alimenta un mapa compartido: código del proveedor ↔ descripción normalizada ↔ categoría ↔ unidad (rollo, metro, unidad, bolsa).
  - **Solo se comparte el mapa de productos, nunca cantidades ni precios.**
  - La segunda ferretería que compra al mismo proveedor arranca con la mayoría de productos ya emparejados [H].
- **Tipo:** tecnológica, con efecto de red de datos.
- **Difícil de copiar:** **alta con el tiempo**: el mapa se acumula y no se compra.
- **Modo de falla:** sin densidad suficiente (pocas tiendas por proveedor) el efecto no aparece. Los proveedores cambian códigos.

### C. "El sugerido lo paga el proveedor"

- **Provocación PO (inversión):** *po, el proveedor arma el pedido del ferretero.*
- **Mecanismo:** con consentimiento del ferretero, el vendedor de una marca ve antes de la visita **solo la sugerencia de sus productos**. La marca paga por tienda activa y el ferretero lo usa gratis.
- **Tipo:** comercial.
- **Referentes:** Arca Continental Lindley ya usa "Pedido Sugerido" en bebidas (P8, N4); Holcim tiene app propia de pedidos [N6].
- **Por qué pagaría la marca:** gana participación frente a las marcas competidoras y evita quiebres de sus productos.
- **Difícil de copiar:** **media**. Un fabricante grande puede construir lo suyo, como ACL; uno mediano no.
- **Modo de falla:** el ferretero desconfía si la marca sesga la sugerencia (conflicto de interés). Se mitiga con reglas transparentes: la sugerencia es la misma con o sin marca pagadora.

## 7. Diferenciador elegido: nueva variante V7

**V7 — Reposición para ferreterías a partir de comprobantes electrónicos**, con catálogo compartido. **A** es el núcleo, **B** la protección a mediano plazo y **C** queda como modelo de cobro a probar en la fase 2.

| Qué cambia frente a V2 (iteración 1) | V2 | V7 |
|---|---|---|
| Fuente de datos | Exportación del POS | **XML de compras y ventas** (con o sin POS) |
| Requisito de adopción | Tener POS con historial | Ser emisor electrónico y reenviar un correo |
| Salida | Orden de compra sugerida | **Lista para la visita de cada vendedor** + productos parados valorizados en soles |
| Protección | Ninguna | Catálogo compartido (efecto de red) |
| Clave SOL | No aplica | **No se usa** (lección de O4 en la investigación de oportunidades) |

**Funcionalidades nuevas del MVP** (sobre `06` §3):
1. Buzón de ingesta de XML.
2. Lector UBL 2.1.
3. Emparejamiento con confirmación.
4. Stock teórico con confianza por producto.
5. Conteo cíclico.
6. Lista por proveedor y día de visita.

## 8. Ventajas y riesgos (premortem)

> *"Es junio de 2027 y V7 fracasó."* Las narrativas más probables:

| Narrativa de fracaso | Probabilidad [H] | Mitigación |
|---|---|---|
| La mayoría de las líneas de boleta decía "VARIOS" y el stock teórico nunca cuadró | **Alta** | Medir el % de líneas identificables en los días 1–3 de la validación, con XML reales de 3–5 ferreterías; criterio de corte en `13` §7 |
| Las ventas sin comprobante hicieron que el stock real fuera siempre menor | Media | Conteo cíclico y ajuste automático de "merma no explicada" por categoría |
| El facturador no exporta el detalle por ítem | Media | El XML siempre existe: pedirlo al PSE o al SEE |
| Un POS grande copió la función para sus clientes | Media | El catálogo compartido y el enfoque multifacturador; buscar la alianza antes |

| Ventaja | Por qué |
|---|---|
| Quita la barrera de adopción principal | No exige POS nuevo ni digitar el inventario |
| Usa una particularidad peruana verificable | La factura electrónica obligatoria [N8] |
| Abre el cobro a la marca (C) | Ticket mayor sin cobrar más al ferretero |

## 9. Evidencia de mercado (fuentes nuevas)

| ID | Fuente | Qué respalda | Tipo | Lect. |
|---|---|---|---|---|
| N1 | Bsale Perú — https://www.bsale.com.pe/ | Inventario en tiempo real; no menciona compras, reposición ni pronóstico | [C] | **L** |
| N2 | Perú Retail, etiqueta ferreterías — https://www.peru-retail.com/tag/ferreterias/ | Mercado ferretero de ~US$ 4 500 M; canal tradicional 78% y home centers 22% (otra nota da 40% a home centers). **[PI] URL exacta y fecha** | [S] | B |
| N3 | Perú Retail (2023) — https://www.peru-retail.com/mercado-de-ferreterias-preve-caida-en-ventas-durante-el-2023-que-factores-influyen/ | Caída de ventas por desaceleración de la autoconstrucción; ferreterías y depósitos de Lima urbana +8% entre 2017 y 2022 (Total Market Solutions) | [S] | B |
| N4 | Gestión, etiqueta ferreterías — https://gestion.pe/noticias/ferreterias/ | Holcim Perú prevé abrir 100 "ferreterías de barrio" al año (mayo 2025; solo titular) | [S] | B |
| N5 | Mercado Negro — https://www.mercadonegro.pe/retail/progresol-se-consolida-como-la-red-de-ferreterias-mas-grande-del-peru | Red Progresol (UNACEM), ~1 000 puntos de venta; fecha no confirmada | [S] | B |
| N6 | Revista Equipar — https://www.revistaequipar.com/noticia/indar-digitalizacion-ferretera-en-la-palma-de-la-mano | App INDAR de Holcim: pedidos, garantías, devoluciones; 65% de ferreterías familiares (país no confirmado) | [S] | B |
| N7 | Perú Retail, TüL — https://www.peru-retail.com/tul-propuesta-digital-sector-ferretero-peruano/ ; Valora Analitik — https://www.valoraanalitik.com/?p=360629 | TüL planeó centros de distribución en Lima (2021); marketplace abierto a distribuidores (2024); 11 000 ferreterías en Colombia | [S] | B |
| N8 | SUNAT, obligados a emitir CPE — https://cpe.sunat.gob.pe/informacion_general/obligados_cpe ; RS 279-2019 — https://ww3.sunat.gob.pe/legislacion/superin/2019/279-2019.pdf | Obligación general de emisión electrónica; el Nuevo RUS no está obligado | [V] | B |
| N9 | SUNAT, servicio web de consultas — https://orientacion.sunat.gob.pe/node/736 | La consulta pública valida comprobantes; las facturas recibidas emitidas fuera del portal SUNAT no siempre aparecen en SOL: el XML del proveedor es la vía práctica | [V] | B |
| N10 | Forbes Perú (28/08/2025), Fesepsa — https://forbes.pe/brand-voice/2025-08-28/como-fesepsa-logro-consolidarse-como-un-actor-clave-en-el-canal-ferretero-tradicional/ | El canal ferretero tradicional tiene proveedores que compiten por la ferretería | [C] | B |
| N11 | Odoo, reglas de reabastecimiento — https://www.odoo.com/documentation/17.0/es/applications/inventory_and_mrp/inventory/warehouses_storage/replenishment/reordering_rules.html | La regla mín./máx. con orden de compra automática ya existe en los ERP | [C] | B |

**Sin evidencia nueva de disposición a pagar.** Lo nuevo respalda la diferenciación (N1, N8, N11) y el canal (N4–N7, N10), no la demanda.

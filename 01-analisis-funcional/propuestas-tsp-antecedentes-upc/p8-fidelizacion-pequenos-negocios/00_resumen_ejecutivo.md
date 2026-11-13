# 00 — Resumen ejecutivo: P8 Plataforma de fidelización inteligente para pequeños negocios

**Fecha:** 05/11/2026.
**Propuesta evaluada:** sistema para registrar compras, segmentar clientes, gestionar puntos de fidelización y recomendar campañas personalizadas. Medición: repetición de compra, tasa de respuesta a campañas y tiempo de preparación de promociones.
**Estructura:** la de `../../oportunidades-saas-ia-cloud-peru/` (00 a 11), adaptada a una propuesta con **variantes**.
**Fuentes y etiquetas:** `10_fuentes_y_evidencias.md`.

## Veredicto

| Dimensión | Resultado |
|---|---|
| **Viabilidad como producto** | **Baja como programa de puntos genérico:** Loyverse incluye fidelización gratis y Kyte también la ofrece [S5]; hay plataformas internacionales (Kangaroo, TapMango, Fivestars) [S6]. **Media** como **programa de lealtad de una distribuidora hacia sus bodegas** (B2B) |
| **Viabilidad como TSP** | **Media-alta**, con el mismo problema de P2: el antecedente UPC (2023) es muy parecido: sistema web de campañas para MYPE de alimentos, con SMS y WhatsApp y +8% de fidelización [S1]. El aporte debe ser la **segmentación y la medición causal** (grupo de control) |
| **Mejor variante** | **V4 — Lealtad B2B: la distribuidora premia a sus bodegas** por compras y recompra (66/100) |
| **Plan B** | **V2 — Tarjeta digital de sellos y campañas para cafeterías y restaurantes**, sin app (63/100) |
| **Decisión** | **Validar antes de desarrollar** |

## Los hallazgos que más pesan

1. **Los peruanos sí usan programas de lealtad:** 3 de cada 5 adultos urbanos conectados usan al menos uno (Ipsos, citado) [S2]; pero el 56% no pertenece a ningún programa minorista (Nielsen, citado) [S3]. Hay espacio, pero los programas grandes concentran el uso.
2. **Los puntos ya vienen gratis en los POS** que usan los pequeños comercios [S5]. Un producto de "puntos" no se diferencia.
3. **La parte "inteligente" (segmentar, predecir quién dejará de comprar, medir si la campaña funcionó) es lo que falta** en las herramientas básicas [I].
4. **La distribuidora aparece como cliente común** en varias propuestas (P1-V6, P5-V1, O2): tiene datos de compra de miles de bodegas y presupuesto para retenerlas [I].
5. **Los datos personales son un límite real:** campañas por WhatsApp o SMS requieren consentimiento (Ley 29733, DS 016-2024-JUS) [S9].

## Ranking de variantes

| # | ID | Variante | Puntaje |
|---|---|---|---:|
| 1 | V4 | Lealtad B2B distribuidora → bodegas | **66** |
| 2 | V2 | Cafeterías y restaurantes: sellos digitales y campañas | 63 |
| 3 | V3 | Servicios recurrentes: recordatorio de próxima visita | 63 |
| — | V1 | Puntos genéricos | 56 (**excluida**) |
| — | V5 | Coalición de puntos entre comercios | 49 |

## Índice

`01` variantes · `02` competencia · `03` problema · `04` fichas · `05` finalistas · `06` arquitectura · `07` negocio · `08` validación · `09` matriz · `10` fuentes · `11` recomendación y TSP.

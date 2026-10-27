# 00 — Resumen ejecutivo: oportunidades de SaaS con IA y Cloud en Perú

**Fecha:** 27/10/2026.
**Carpeta nueva.** No se modificó ninguna investigación anterior de `01-analisis-funcional/`.
**Fuentes y etiquetas:** `10_fuentes_y_evidencias.md`. [V] verificado · [S] secundaria · [C] declaración comercial · [I] inferencia · [H] hipótesis · [PI] pendiente.

## Recomendación

| Prioridad | Oportunidad | Puntaje | Decisión |
|---|---|---:|---|
| **1** | **O1 — DAM Asistida:** preliquidación de la DAM con IA para agencias de aduana | 70 | **Validar antes de desarrollar** (2 semanas) |
| 2 (plan B) | **O2 — PedidoListo:** captura de pedidos B2B por WhatsApp, correo y PDF para distribuidoras | 71 | Validar si O1 falla |
| 3 (plan C) | **O4 — Estudio360:** gestión operativa para estudios contables | 68 | Solo con opinión legal sobre la Clave SOL |

**Ninguna oportunidad cumple todavía todas las condiciones del enunciado.** A todas les falta evidencia directa de disposición a pagar en Perú y el costo medido del problema. **No se hizo ninguna entrevista.**

## Metodología

1. **20 sectores revisados** con búsqueda web: normas, avisos de empleo, prensa, tesis, páginas de productos.
2. **Lista amplia de 18 oportunidades** (`01`). **Top 10 puntuado** con la matriz ponderada del enunciado (`09`).
3. **Reglas:**
   - Sin entrevistas, la evidencia de demanda no pasa de 3 sobre 5.
   - Una diferenciación de 1 sobre 5 excluye de los finalistas.
4. **5 finalistas** comparados (`05`), con arquitectura (`06`), economía (`07`) y validación (`08`).
5. Cada afirmación lleva su etiqueta. La mayoría de las fuentes se vio solo como fragmento del buscador: **confianza media-baja** (`10` §4).

## Los hallazgos que más pesan

1. **El patrón de mayor valor es "documento → transcripción manual".** Se repite en aduanas, pedidos, cuentas por pagar y estudios contables. Es donde la IA multimodal aporta más (`03` §3).
2. **En Perú, el XML de la factura electrónica le quita valor a la IA en las facturas nacionales.** La IA rinde en documentos **sin estructura**: facturas extranjeras, WhatsApp, órdenes en PDF [S39] [I].
3. **Los incumbentes locales ya agregan IA en su propio producto:**
   - Softland lanzó **Pedidos IA** (2025) [S24].
   - Contasis lanzó **Darwin IA** sobre el SIRE [S30].
   - El recién llegado debe ir donde ellos no llegan.
4. **Las licitaciones públicas con IA están saturadas:** LicitaLAB declara más de 1 500 clientes entre Chile y Perú [S5]; Licisoft, LicitiGo y Licitaciones MYPE desde S/ 49 [S7–S9].
5. **Aduanas: hay una brecha visible.**
   - Los avisos de empleo describen al liquidador armando la DAM a mano desde facturas [S15–S17].
   - Afuera, Expedock (US$ 17,5 M) y Raft (US$ 30 M) venden justo eso [S12–S14].
   - **No se identificó** un competidor peruano con IA (confianza baja: la ausencia de resultados no prueba la ausencia).
6. **El costo de la IA no es la restricción:** centavos de dólar por expediente frente a una comisión mínima de USD 150 por despacho [S20, S65] (`06` §5). Las restricciones son la **integración** (SINTAD, SOFTPAD, ERP), el **soporte** y el **tamaño del mercado**.
7. **Brecha regulatoria verificada en transporte:** solo 65 071 de ~140 323 empresas de carga habían emitido la GRE transportista a dic-2025 [S42] [V]. Se descartó por baja disposición a pagar y oferta gratuita.

## Ranking

| # | ID | Oportunidad | Puntaje | Nota |
|---|---|---|---:|---|
| 1 | O2 | Captura de pedidos B2B | 71 | Competidor local con IA (Softland) |
| 2 | O1 | Preliquidación de la DAM | 70 | Sin competidor de IA local identificado; mercado pequeño |
| 3 | O4 | Gestión de estudios contables | 68 | Riesgo con la Clave SOL |
| 4 | O11 | Cobranza B2B | 66 | Diferenciación débil |
| 5 | O3 | Cuentas por pagar | 65 | Cubierto por ERP |
| 6 | O5 | Licitaciones | 65 | **Excluida:** saturado |
| 7–10 | O10, O8, O9, O6 | Obra, SST, contratistas, ejecución contractual | 58–61 | Sin evidencia de pago o con competidor local |

**O1 y O2 empatan dentro del margen de error** (`09` §5). O1 se prioriza por su **posición competitiva** (`11` §2): competir contra un incumbente que ya puso IA en su ERP es más riesgoso que un mercado pequeño sin competidor visible.

## Próximos pasos (2 semanas, detalle en `11` §4)

1. Lista de 40 agencias de aduana y contactos priorizados por avisos de "liquidador".
2. **Resolver si SINTAD/SOFTPAD importan ítems desde un archivo.** Es la pregunta técnica número uno.
3. Ocho entrevistas y 1–2 observaciones cronometradas de liquidación.
4. Pedir 10–20 expedientes anonimizados.
5. Decisión el día 10: continuar con O1, pivotar (clasificación, importadores) o pasar a O2.

**Contactar empresas requiere la autorización del equipo:** este informe no contactó a nadie.

## Índice

| Archivo | Contenido |
|---|---|
| `01_mapa_de_oportunidades.md` | 18 oportunidades por sector y tipo |
| `02_productos_internacionales_y_presencia_en_peru.md` | Catálogo de productos extranjeros y su presencia |
| `03_problemas_y_necesidades_del_mercado_peruano.md` | Problemas por sector y patrones |
| `04_top_10_oportunidades.md` | Fichas de 20 puntos |
| `05_analisis_de_los_5_finalistas.md` | Comparación profunda |
| `06_arquitectura_y_viabilidad_tecnica.md` | MVP, arquitectura, costos de IA, riesgos |
| `07_modelo_de_negocio_y_precios.md` | Fórmulas, comparables, escenarios |
| `08_plan_de_validacion.md` | Entrevistas, prototipos, criterios |
| `09_matriz_de_evaluacion.md` | Puntajes, fundamentos, sensibilidad |
| `10_fuentes_y_evidencias.md` | Fuentes, limitaciones, búsquedas pendientes |
| `11_recomendacion_final.md` | Decisión y plan |

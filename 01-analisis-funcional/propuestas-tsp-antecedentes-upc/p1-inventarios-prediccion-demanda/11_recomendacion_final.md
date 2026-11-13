# 11 — Recomendación final

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Decisión

**Investigar primero V2 — Reposición sugerida para ferreterías y minimarkets que ya usan POS. VALIDAR ANTES DE DESARROLLAR.**

**Plan B: V6 — Pedido sugerido para distribuidoras** (mismo motor, cliente de ticket alto).

**Respuesta honesta:** como **producto**, P1 es viable solo como complemento de un POS y con ticket bajo; su mayor riesgo es que el POS agregue la función. Como **TSP**, es una de las propuestas más sólidas: se puede medir con rigor sin depender de un cliente.

## 2. Por qué V2 y no "pequeños comercios" en general

| Criterio | Propuesta original (todos los comercios) | V2 |
|---|---|---|
| Datos disponibles | No en la mayoría (86% informal [S10]) | Sí (POS) |
| Competencia | POS completos (Bsale, Treinta) | Complemento del POS |
| Problema técnico | Genérico | Demanda intermitente: interesante |
| Acceso | Alto pero disperso | Alto y concreto |

## 3. Las 10 respuestas

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | Producto | Complemento web que importa ventas e inventario del POS y entrega la **orden de compra sugerida por proveedor** con alertas de quiebre |
| 2 | Cliente | Ferreterías y minimarkets formales de Lima con POS. Comprador y usuario: el dueño o el encargado de compras |
| 3 | Problema | Deciden la compra de memoria; se quedan sin los productos que más venden y acumulan los que no rotan [H] |
| 4 | Referencia | Inventory Planner, Netstock [PI]; en Perú, Onebeat para cadenas [S6] |
| 5 | Diferenciador | Tratamiento de demanda intermitente, orden por proveedor con plazo y lote mínimo, explicación simple. Medido con MASE y quiebres simulados |
| 6 | Cobro | Suscripción por tienda, S/ 39–79 al mes [H] |
| 7 | MVP | Carga Excel/CSV → ABC + intermitencia → pronóstico con selección por *backtesting* → orden sugerida editable → panel de quiebres → auditoría (`06` §3) |
| 8 | Primeros entrevistados | Ferreterías y minimarkets con boleta electrónica de un POS; red de contactos; grupos de comerciantes |
| 9 | Qué validar en 2 semanas | §4 |
| 10 | Qué justifica continuar, pivotar o descartar | `08` §2.8 |

## 4. Plan de las próximas dos semanas

| Día | Acción | Salida |
|---|---|---|
| 1–2 | Lista de 30 comercios; guía; plantilla de exportación | Materiales |
| 1–3 | Resolver P1 y P2 de `10` (¿algún POS ya sugiere compras? ¿hay API?) | Sí / no |
| 3–8 | 8 entrevistas | Notas; frecuencia de quiebres |
| 6–10 | Conseguir 2 exportaciones de 12 meses; *backtesting* | MASE por clase ABC |
| 10 | Decisión preliminar | Continuar, pivotar a V6 o descartar |

## 5. Alternativas descartadas

| ID | Motivo |
|---|---|
| V1 Bodegas sin POS | Sin datos; habría que construir un POS (Treinta ya existe) |
| V5 Tiendas online | Oferta internacional consolidada |
| V3 Boticas | Regulación y software de farmacia existente; se reabre si las entrevistas lo justifican |

## 6. Riesgos

| Riesgo | Qué se hace |
|---|---|
| El POS agrega la función | Buscar la alianza antes de competir |
| El dueño no confía en la sugerencia | Explicación por producto; empezar por la clase A |
| Datos de mala calidad | Reporte de calidad en la ingesta; plantilla clara |
| Ticket insuficiente | Evolucionar a V6 |

## 7. Relación con el proyecto académico (TSP UPC)

- **Encaje: alto.** Núcleo medible: comparación de modelos (ingenuo, ETS, Croston/TSB, LightGBM) con WAPE y MASE; simulación de la política de reposición (nivel de servicio, días de inventario); arquitectura multiempresa.
- **Antecedente:** la propuesta cita "Diseño de software para predicción de ventas B2C usando ML y Python (2023)". **No se encontró ese registro exacto** [PI]; el más cercano es un sistema predictivo de ventas con deep learning de la UPC (2024) [S11]. P1 se diferencia al pasar del **pronóstico** a la **decisión de compra**.
- **Riesgo institucional (de la investigación previa [S14]):** si la UPC exige que el TSP sea un informe de experiencia profesional, el tema debería salir del trabajo real del autor (por ejemplo, la empresa donde trabaja). Confirmar con la UPC en la semana 1.
- **Objetivos específicos sugeridos:**
  1. Caracterizar el proceso de compra en al menos 3 comercios.
  2. Implementar la ingesta multiempresa con validación de calidad de datos.
  3. Comparar ≥ 4 métodos de pronóstico; criterio: MASE < 1 en clase A.
  4. Simular la política de reposición; criterio: ≥ 30% menos semanas con quiebre frente al método ingenuo.
  5. Evaluar la usabilidad (SUS ≥ 70) y la aceptación de la sugerencia con usuarios reales.

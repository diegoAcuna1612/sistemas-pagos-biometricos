# Iteración 2 — Resumen, nuevo ranking y recomendación

**Fecha:** 05/11/2026.
**Qué se hizo:** una segunda iteración de diferenciación para P1–P8. **No se modificó ningún archivo de la iteración 1** (00–11 de cada carpeta ni `README.md`).
- **Por cada propuesta**, dos archivos nuevos:
  - `12_innovacion_y_diferenciacion_competitiva.md`: competidores actualizados, trabajo del cliente, necesidades desatendidas, alternativas de diferenciación, evidencia, ventajas y riesgos.
  - `13_matriz_reevaluada_y_recomendacion_iteracion_2.md`: matriz criterio por criterio, sensibilidad, TSP y validación.
- **Integraciones:** `iteracion-2_01_integraciones_y_suite_distribuidoras.md`.
**Alcance:** unas 50 búsquedas web nuevas y lectura directa de algunas páginas. **No se hizo ninguna entrevista ni se contactó a nadie.**
**Notación:** `p5/13` significa el archivo 13 de la carpeta de P5 (`p5-pedidos-y-entregas-offline/`); lo mismo para las demás.

## 1. Método

1. **Skill `creative-ideation`** (NousResearch/hermes-agent, v2.1.0), instalada con `npx skills add NousResearch/hermes-agent --skill creative-ideation --agent claude-code --global`. Antes de instalarla se revisó su contenido: solo markdown, sin scripts.
2. **Ruta de la skill:**
   - Dominio PRODUCTO en "terreno de alto riesgo" (ideas de IA y de startups).
   - La skill obliga a combinar **Jobs to Be Done** (Christensen, 2016; fuerzas de cambio de Moesta) con **provocaciones PO** (de Bono, 1970).
   - Hay que **descartar las 5 primeras ideas**; están listadas en cada archivo 12 (§5).
   - La selección final usó **premortem** (Klein, 2007).
3. **Reglas contra la inflación de puntajes:**
   - Misma matriz y mismos pesos de la iteración 1 (P 20% · D 20% · Dif 15% · A 15% · T 10% · R 10% · E 5% · N 5%).
   - **D sigue con tope 3 sin entrevistas:** no subió en ninguna propuesta.
   - Un criterio solo cambia con una fuente o un mecanismo nuevo. **Las bajas también se registran.**
   - Cada propuesta gana una **variante nueva** (V6 o V7). Las variantes de la iteración 1 siguen documentadas.

## 2. Nuevo ranking

| # | Propuesta | Variante de la iteración 2 | It. 1 | **It. 2** | Δ | Qué la mueve |
|---|---|---|---:|---:|---:|---|
| 1 | **P5** Pedidos y entregas | **V6** Reparto de GLP y agua en envases retornables, con reposición anticipada | 68 | **71** | +3 | Clientes listables en el registro público de GLP; vender antes que el competidor |
| 2 | **P1** Inventarios | **V7** Reposición para ferreterías a partir de comprobantes electrónicos | 68 | **69** | +1 | Inventario sin POS a partir de los XML de SUNAT |
| 3 | **P4** Aprendizaje | **V6** Preparación adaptativa para la Prueba Nacional docente | 64 | **68** | +4 | 270 000+ inscritos, < 30% aprueba; calibración TRI |
| 3 | **P8** Fidelización | **V6** Lealtad multimarca financiada por fabricantes | 66 | **68** | +2 | BEES invierte S/ 36 M+ al año; la distribuidora independiente no tiene equivalente |
| 5 | **P6** RPA | **V6** Auditoría de gastos locales para importadores (pago por éxito) | 65 | **67** | +2 | DL 1492 y cobros no pactados documentados |
| 6 | **P2** Pruebas | **V6** Accesibilidad WCAG 2.2 continua para el Estado y sus proveedores | 63 | **66** | +3 | Lineamiento RSGTD 001-2025 |
| 6 | **P3** Documental | **V7** Expedientes Techo Propio para entidades técnicas | 64 | **66** | +2 | Plazo de 30 días y cupo; 1 221 entidades técnicas |
| 6 | **P7** DevSecOps | **V6** Evidencia continua para proveedores de entidades SBS | 59 | **66** | +7 | Verificación anual de proveedores (SBS 504-2021) — **la menos verificada** |
| — | *Integración* | **Suite para distribuidoras multimarca** (O2 + P5-V1 + P1-V6 + P8-V6) | — | **74** | — | Confianza baja; viabilidad técnica 2/5 |
| — | *Integración* | **Suite de comercio exterior** (O1 + P6-V6) | — | **~72** | — | Confianza baja |
| — | *Referencia* | O2 PedidoListo / O1 DAM Asistida | 71 / 70 | 71 / 70 | — | Sin reevaluar |

**Lectura:** el rango de las 8 se comprimió de 59–68 a **66–71**. Todas las diferencias caben en el margen de error de la matriz (±3).

## 3. Qué criterios cambiaron y cuáles no

| Criterio | Sube | Baja | Igual | Comentario |
|---|---|---|---|---|
| **P** Problema | P3, P4, P7, P8 | P2 | P1, P5, P6 | Sube donde apareció urgencia verificable (plazo, examen, norma, competencia de fabricantes) |
| **D** Demanda | — | — | **Todas** | **Tope sin entrevistas.** La iteración mejora el posicionamiento, no prueba la demanda |
| **Dif** Diferenciación | P1, P2, **P6 (+2)** | — | P3, P4, P5, P7, P8 | Sube cuando se encontró una regla local o una fuente de datos que el competidor no usa |
| **A** Acceso | P3, P4, P5, P7 | — | P1, P2, P6, P8 | Sube cuando el cliente es listable (registros públicos) o se cambió a un comprador más accesible |
| **T** Viabilidad técnica | — | P1, P8 | El resto | Los diferenciadores agregan complejidad: no se escondió |
| **R** Recurrencia | P2 | P3, P4, P6 | P1, P5, P7, P8 | Los nichos con temporadas o pago por éxito pierden recurrencia |
| **E** Expansión | P2 | P3 (−2), P4, P6 | P1, P5, P7, P8 | Lo más local diferencia más, pero escala menos |
| **N** Normativo | P2 | P3, P6 | El resto | Datos de familias vulnerables y disputas legales bajan N |

## 4. Comparación con O1 (70) y O2 (71)

| Resultado | Propuestas |
|---|---|
| **Igualan o superan a O2 (71)** | P5-V6 (71); suite para distribuidoras (74); suite de comercio exterior (~72) |
| **A 1–2 puntos de O1** | P1-V7 (69), P4-V6 (68), P8-V6 (68) |
| **Por debajo** | P6-V6 (67), P2-V6, P3-V7, P7-V6 (66) |

- **Ninguna propuesta individual supera claramente a O1 ni a O2.** Solo P5-V6 los alcanza.
- **Las dos integraciones los superan**, pero con viabilidad técnica más baja (suite) o dependiendo de O1 (comercio exterior).

## 5. Las 3 oportunidades con mayor potencial de negocio SaaS

| # | Oportunidad | Puntaje | Por qué | Su mayor riesgo (premortem) |
|---|---|---:|---|---|
| **1** | **Suite para distribuidoras multimarca** (fase 1: O2 + preventa sin conexión) | 74 | Datos por bodega de varias marcas que solo tiene la distribuidora; uso diario; tres fuentes de ingreso; el hueco frente a BEES y las apps de fabricantes es verificable | Construir demasiado: la fase 1 debe estar congelada. Que YOM o CPG Soft ya atiendan a distribuidoras peruanas [PI] |
| **2** | **P5-V6 Reparto de GLP y agua** | 71 | Clientes listables por registro público; vender antes que el competidor da un retorno visible cada semana; reutiliza ingeniería probada | Que los hogares no respondan al mensaje anticipado; abandono de micro distribuidores |
| **3** | **P4-V6 Prueba Nacional docente** | 68 | El mercado más grande y mejor documentado de las 8 (270 000+ inscritos; 90 000+ en ascenso); ya existe oferta pagada de preparación; el banco calibrado acumula valor | B2C por temporada; los simulacros gratuitos de Geard; calidad del banco de preguntas |

**Alternativa fuera de las 8:** la **suite de comercio exterior (O1 + P6-V6, ~72)** es la mejor ruta si el equipo tiene acceso a agencias de aduana.

## 6. Las 3 más sólidas para un TSP

| # | Propuesta | Por qué es sólida | Qué se mide |
|---|---|---|---|
| **1** | **P5-V6** | Ingeniería exigente y verificable sin cliente (sin conexión, idempotencia, conflictos). Agrega un experimento con grupo de control. Reutiliza el diseño de la investigación de pagos | 0 duplicados / 0 pérdidas; error del intervalo de reposición; recompra frente al control |
| **2** | **P1-V7** | Problema propio del contexto peruano (inventario desde UBL 2.1); datos sintéticos generados desde un conjunto público; distinto del antecedente UPC | Error del stock reconstruido; exactitud del emparejamiento; MASE/WAPE |
| **3** | **P2-V6** | Datos públicos (portales del Estado) sin permisos ni datos personales; norma nueva; resuelve el problema de originalidad frente al antecedente UPC | Cobertura automática frente a una auditoría manual; tiempo de auditoría; regresiones por versión |

**Mención:** P4-V6 es la de mayor profundidad de investigación (TRI, test adaptativo, validez predictiva). Depende de voluntarios y del calendario del concurso, y por eso queda cuarta.

## 7. Recomendación final

**Validar primero P5-V6 y construir el TSP sobre su motor (sin conexión + predicción de reposición). En paralelo, hacer 5 entrevistas con distribuidoras multimarca para la fase 1 de la suite.**

**Por qué:**
1. **Es la mejor propuesta individual** (71, igual a O2) y una de las 3 más sólidas como TSP. Un solo esfuerzo sirve para el título y para un posible negocio.
2. **Su motor es el mismo que necesita la fase 1 de la suite** (M2: preventa y reparto sin conexión; `iteracion-2_01` §4). Si P5-V6 falla como negocio, el trabajo del TSP no se pierde: pasa a la suite, la oportunidad de mayor potencial.
3. **Su validación es barata y rápida:**
   - Un Mago de Oz con un distribuidor y 50 hogares responde la pregunta crítica (¿contestan el mensaje anticipado?) en menos de dos semanas.
   - No requiere datos sensibles ni permisos regulatorios.
4. **No depende de supuestos legales sin verificar**, a diferencia de P6-V6 (DL 1492 en disputa) y P7-V6 (texto de la SBS no leído).

**Plan de 2 semanas:**

| Día | P5-V6 (principal) | Suite (paralelo) |
|---|---|---|
| 1–2 | Listar 30 locales de GLP y 10 distribuidores de agua (Facilito + recorrido) | Confirmar si YOM y CPG Soft operan en Perú |
| 2–7 | 8 entrevistas a dueños | 5 entrevistas a distribuidoras multimarca |
| 5–10 | Mago de Oz: mensaje anticipado a 50 hogares | Pedir el historial de pedidos de una ruta |
| 10 | **Decisión** con los criterios de `p5/13` §7 | Decisión con `iteracion-2_01` §2.9 |

**Árbol de decisión al día 10:**
- **P5-V6 ≥ 25% de respuesta y 1 distribuidor dispuesto a pagar →** continuar P5-V6 (negocio + TSP).
- **P5-V6 < 10% de respuesta, pero la suite confirma presión y falta de preventa digital →** TSP sobre el motor sin conexión aplicado a la **preventa de la suite (fase 1)**.
- **Ambas fallan →** volver a **O1** (`../oportunidades-saas-ia-cloud-peru/11`) o a **P1-V7** si prima el TSP.

**Si la preferencia personal sigue siendo P1 (la favorita):** P1-V7 es un **TSP sólido y original** (segundo de la lista). Como negocio sube poco (69): el ticket del ferretero es bajo y la escala depende de que una marca pague la sugerencia (`p1/12` §6 C).

## 8. Limitaciones

1. **Ninguna entrevista.** D se mantuvo en 3 en todas las propuestas: ningún puntaje prueba demanda.
2. **La mayoría de las fuentes nuevas son fragmentos del buscador (B).** Las leídas directamente (L): la página de Bsale, la nota de la SNI sobre el DL 1492 y el archivo de la skill.
3. **Supuestos críticos sin verificar [PI]:**
   - El alcance exacto de la SBS 504-2021 sobre proveedores (P7).
   - La vigencia del DL 1492 (P6).
   - La aprobación final de la norma multimarca de GLP (P5).
   - Si YOM y CPG Soft operan en Perú (suite).
   - El art. 23 de la Ley 29973 para privados (P2).
4. **"No se identificó un competidor" tiene confianza baja** en todos los casos: el buscador devuelve sobre todo resultados de EE. UU.
5. **O1 y O2 no se reevaluaron.** La comparación usa sus puntajes de la investigación de oportunidades.

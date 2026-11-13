# 09 — Matriz de evaluación

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Método

Se usa **la misma matriz** de `../../oportunidades-saas-ia-cloud-peru/09_matriz_de_evaluacion.md`, para que los puntajes sean comparables con O1 (70) y O2 (71).

- Escala de 1 a 5. **Puntaje sobre 100 = Σ (puntaje × peso) × 20.**
- Sin entrevistas, "Evidencia de demanda y pago" no pasa de 3.
- Diferenciación ≤ 1 excluye de los finalistas.
- "?" = criterio incierto.

| Criterio | Peso | Clave |
|---|---:|---|
| Intensidad y frecuencia del problema | 20% | P |
| Evidencia de demanda y disposición de pago | 20% | D |
| Diferenciación competitiva alcanzable | 15% | Dif |
| Acceso a potenciales clientes | 15% | A |
| Viabilidad técnica y costo del MVP | 10% | T |
| Potencial de ingresos recurrentes | 10% | R |
| Expansión a otros mercados | 5% | E |
| Implementación y cumplimiento normativo | 5% | N |

## 2. Puntuaciones

| # | ID | Variante | P | D | Dif | A | T | R | E | N | **Total** | Confianza |
|---|---|---|---|---|---|---|---|---|---|---|---:|---|
| 1 | V2 | Ferreterías y minimarkets con POS | 4 | 3? | 2 | 4 | 4 | 3 | 4 | 4 | **68** | Baja-media |
| 2 | V4 | Restaurantes: insumos por receta | 4 | 3? | 2 | 3 | 3 | 4 | 4 | 4 | **65** | Baja |
| 3 | V6 | Distribuidoras: pedido sugerido | 3 | 3? | 3 | 3 | 3 | 4 | 4 | 4 | **64** | Baja |
| 4 | V3 | Boticas: reposición y vencimientos | 4 | 3? | 2 | 3 | 3 | 4 | 3 | 3 | **63** | Baja |
| — | V5 | Tiendas online | 3 | 3 | **1** | 3 | 4 | 3 | 4 | 4 | 58 (excluida) | Media |
| — | V1 | Bodegas sin POS | 3 | 2 | **1** | 4 | 3 | 2 | 4 | 4 | 53 (excluida) | Media |

## 3. Fundamento (V2)

| Criterio | Puntaje | Fundamento |
|---|---|---|
| P | 4 | Decisión semanal y repetitiva; la demanda intermitente de la ferretería hace difícil el cálculo a mano [I]. No es 5: el costo del quiebre no está medido |
| D | 3? | Indirecta: los comercios ya pagan POS [S1, S3]. Nadie pagó todavía por reposición sugerida en Perú (no se encontró evidencia) |
| Dif | 2 | La función es fácil de copiar para el POS. El diferenciador (intermitencia, orden por proveedor, explicación) es real pero no protegido |
| A | 4 | Comercios visibles y numerosos; se puede entrar caminando [I] |
| T | 4 | Bibliotecas libres, cómputo barato; el reto es la calidad de datos |
| R | 3 | Suscripción mensual, pero ticket bajo y abandono probable de micro comercios [H] |
| E | 4 | El problema es igual en toda la región |
| N | 4 | Datos comerciales; sin regulación especial |

## 4. Sensibilidad

| Escenario | Efecto |
|---|---|
| Bsale u otro POS lanza reposición sugerida (V2 Dif 2 → 1) | V2 queda **excluida**; V4 o V6 pasan a primera |
| 5 comercios confirman el dolor y 1 paga el piloto (V2 D 3 → 4) | V2 sube a **72**, por encima de O1 y O2 |
| Los POS no permiten exportar (V2 T 4 → 3) | V2 baja a 66 |
| Una distribuidora firma un piloto (V6 D 3 → 4) | V6 sube a 68 y empata con V2 |

## 5. Comparación con la investigación de oportunidades

| Propuesta | Puntaje | Lectura |
|---|---:|---|
| O2 PedidoListo | 71 | Mejor acceso y evidencia indirecta |
| O1 DAM Asistida | 70 | Mejor diferenciación |
| **P1-V2** | **68** | Menor diferenciación; mayor facilidad técnica y de acceso |

## 6. Viabilidad como TSP (evaluación aparte)

| Criterio | Valoración | Comentario |
|---|---|---|
| Problema concreto y delimitado | Alto | Reposición en un tipo de comercio |
| Complejidad de ingeniería | Media-alta | Series de tiempo, intermitencia, políticas de inventario, multiempresa |
| Medición objetiva | **Alta** | WAPE, MASE, nivel de servicio simulado: medibles sin usuarios |
| Datos sin depender de un cliente | **Alta** | Conjuntos públicos [PI: licencia] |
| Novedad frente al antecedente | Media | El antecedente predice ventas [S11]; P1 agrega la decisión de compra y la intermitencia |
| Riesgo de ejecución | Bajo | Sin hardware ni regulación |

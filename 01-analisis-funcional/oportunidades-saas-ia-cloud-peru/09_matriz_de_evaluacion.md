# 09 — Matriz de evaluación

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Método

- Escala de 1 a 5 por criterio, con los pesos del enunciado.
- **Puntaje sobre 100 = Σ (puntaje × peso) × 20.**
- Reglas aplicadas:
  1. **Sin entrevistas, "Evidencia de demanda y pago" no pasa de 3**, salvo prueba pública de clientes pagando por la misma solución en Perú. Solo O5 la tiene [S5, S8].
  2. **Diferenciación ≤ 1 excluye de los finalistas**, aunque el puntaje total sea alto. El enunciado prohíbe clonar sin un diferenciador verificable.
  3. **Acceso a clientes** mide qué tan fácil es que una empresa nueva consiga los **primeros 10 interesados**, no el tamaño del mercado.
  4. Un "?" junto al puntaje indica que el criterio es **incierto**.

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

| # | ID | Oportunidad | P | D | Dif | A | T | R | E | N | **Total** | Confianza |
|---|---|---|---|---|---|---|---|---|---|---|---:|---|
| 1 | O2 | Captura de pedidos B2B multicanal | 4 | 3? | 3 | 4 | 3 | 4 | 4 | 4 | **71** | Baja-media |
| 2 | O1 | Preliquidación de la DAM para agencias de aduana | 4 | 3? | 4 | 3? | 3? | 4 | 3 | 4 | **70** | Baja-media |
| 3 | O4 | Gestión operativa para estudios contables | 4 | 3? | 3 | 4 | 3 | 4 | 3 | 2? | **68** | Baja |
| 4 | O11 | Cobranza B2B y conciliación de abonos | 4 | 3? | 2 | 4 | 3 | 4 | 3 | 3 | **66** | Baja |
| 5 | O3 | Recepción y validación de comprobantes (CxP) | 4 | 3? | 2 | 3 | 4 | 4 | 2 | 4 | **65** | Media |
| 6 | O5 | Inteligencia de licitaciones | 3 | 4 | **1** | 4 | 4 | 4 | 2 | 4 | **65** (excluida) | Media |
| 7 | O10 | Tareo y partes diarios de obra | 4 | 2? | 3 | 3 | 3 | 3 | 3 | 4 | **61** | Baja |
| 8 | O8 | SST digital para pymes | 3 | 3? | 2 | 3 | 4 | 4 | 2 | 3 | **60** | Baja |
| 9 | O9 | Acreditación de contratistas | 4 | 3 | 2 | 2 | 3 | 4 | 3 | 3 | **60** | Media |
| 10 | O6 | Ejecución contractual con el Estado | 3 | 2? | 3 | 3 | 4 | 3 | 2 | 4 | **58** | Baja |
| — | O7 | GRE y liquidación de viajes | 3 | 2 | 2 | 3 | 4 | 3 | 1 | 3 | 53 | Media |

**Finalistas** (`05`): O2, O1, O4, O11, O3. O5 queda fuera por la regla 2.

## 3. Fundamento de cada puntuación (finalistas)

### O2 — Pedidos B2B (71)

| Criterio | Puntaje | Fundamento |
|---|---|---|
| P | 4 | Diario y repetitivo; un incumbente invirtió en resolverlo [S24]. No es 5 porque el volumen por empresa no está medido |
| D | 3? | Indirecta: Softland lanzó el producto [S24]; Conexiom y Esker tienen tracción afuera [S11, S27]. Sin precios ni clientes peruanos |
| Dif | 3 | Independiente del ERP y nativo de WhatsApp, frente a un competidor atado a su ERP. Ventaja copiable |
| A | 4 | Las distribuidoras son numerosas, visibles y fáciles de contactar [I] |
| T | 3 | Extraer es sencillo; **emparejar el texto libre con el código del producto** y la integración con cada ERP son difíciles |
| R | 4 | Uso diario, cobro por pedido o por mes |
| E | 4 | El mismo problema existe en toda LatAm |
| N | 4 | Datos comerciales; cumplir las políticas de WhatsApp Business |

### O1 — DAM para agencias de aduana (70)

| Criterio | Puntaje | Fundamento |
|---|---|---|
| P | 4 | Tarea central del liquidador según los avisos [S15–S17]. No se midió su duración |
| D | 3? | Indirecta: la comisión de USD 150 o más por B/L [S20] deja margen para pagar software; Expedock y Raft venden lo mismo afuera [S12–S14]. Sin datos de pago peruanos |
| Dif | 4 | No se identificó IA local para la DAM. La localización (estructura de la DAM, tablas SUNAT, SINTAD/SOFTPAD) es difícil de copiar para un extranjero. No es 5 porque los incumbentes podrían agregarla |
| A | 3? | Comprador concentrado y listable (~291 agencias en 2017 [S19], gremio AAAP), pero sector cerrado y se desconoce su receptividad |
| T | 3? | Extraer es viable; **no se sabe si SINTAD/SOFTPAD aceptan importar datos** (P2). Sin integración, el producto se reduce a un "copiado asistido" |
| R | 4 | Cada despacho genera uso; se puede cobrar por expediente |
| E | 3 | Otros países tienen declaraciones parecidas, pero cada uno tiene su formato |
| N | 4 | Datos comerciales; el agente sigue siendo responsable de la declaración; solo sugerencias con revisión humana |

### O4 — Estudios contables (68)

| Criterio | Puntaje | Fundamento |
|---|---|---|
| P | 4 | Muchos RUC por estudio; el buzón obliga aunque nadie lo lea [S37] |
| D | 3? | Análogos pagados en EE. UU. y Brasil [S35, S36]. Los estudios peruanos podrían pagar poco [H] |
| Dif | 3 | Los incumbentes cubren contabilidad, no la gestión del estudio. Contasis puede extenderse |
| A | 4 | 63 000+ contadores [S33], colegios, grupos |
| T | 3 | Portal y calendario: fácil. Buzón SOL automatizado: incierto (P7) |
| R | 4 | Suscripción mensual por estudio o por RUC |
| E | 3 | Cada país tiene su autoridad tributaria |
| N | 2? | Guardar la Clave SOL de terceros tiene un riesgo legal y de seguridad sin resolver |

### O11 — Cobranza B2B (66)

| Criterio | Puntaje | Fundamento |
|---|---|---|
| P | 4 | Atrasos del 36% y 81 días de cobro en un caso peruano [S59] |
| D | 3? | Bemmbo vendió y fue comprada [S38]; herramientas genéricas venden en Perú [S58] |
| Dif | 2 | Los recordatorios por WhatsApp son genéricos; la conciliación con extractos bancarios sin API es un diferenciador débil |
| A | 4 | Toda empresa que vende a crédito |
| T | 3 | Sin banca abierta en Perú [I]: extractos subidos a mano |
| R | 4 | Uso mensual |
| E | 3 | — |
| N | 3 | Datos de contactos de clientes; reglas de cobranza de Indecopi si hay consumidores [S58] |

### O3 — Cuentas por pagar (65)

| Criterio | Puntaje | Fundamento |
|---|---|---|
| P | 4 | Obligación mensual con riesgo de perder crédito fiscal |
| D | 3? | Los ERP lo venden como módulo [S41]; Contasis lanza IA para ello [S30] |
| Dif | 2 | Atendido por ERP y software contable; la IA aporta poco con XML |
| A | 3 | Comprador: jefe de contabilidad o tesorería de una mediana empresa |
| T | 4 | Mayormente determinista (XML, reglas) |
| R | 4 | Mensual |
| E | 2 | Reglas muy peruanas (detracciones, SIRE) |
| N | 4 | Datos tributarios de empresas |

## 4. Fundamento resumido (resto del top 10)

| ID | Por qué no es finalista |
|---|---|
| O5 | Demanda probada (D=4), pero **cuatro o más competidores**, uno desde S/ 49 [S5–S9]. Solo cabría un nicho (O6) |
| O10 | Problema caro [S53], pero **ninguna evidencia de que paguen**; S10 y los desarrollos propios dominan [PI] |
| O8 | SafetyCulture cuesta unos USD 24 por usuario [S46]; maneja datos médicos (sensibles) |
| O9 | Subcontrataley Perú ya opera [S47]; vender a mineras toma ciclos largos |
| O6 | Riesgos documentados [S52], demanda no |

## 5. Sensibilidad: ¿qué cambia el orden?

| Escenario | Efecto |
|---|---|
| Softland ofrece Pedidos IA para cualquier ERP (O2 Dif 3 → 2) | O2 baja a 68: **O1 queda primero** |
| SINTAD/SOFTPAD no permiten importar y los liquidadores rechazan el copiado asistido (O1 T 3 → 2) | O1 baja a 68: empata con O4 |
| Las agencias no responden a la prospección (O1 A 3 → 2) | O1 baja a 67 |
| Cinco o más agencias confirman el dolor y una firma un piloto pagado (O1 D 3 → 4) | O1 sube a 74 |
| Cinco o más distribuidoras confirman el dolor y una firma un piloto pagado (O2 D 3 → 4) | O2 sube a 75 |
| Se resuelve legalmente el acceso al buzón SOL (O4 N 2 → 4) | O4 sube a 70 |

**Lectura:** O1 y O2 están **empatadas dentro del margen de error**: un punto en un solo criterio las invierte. La elección entre ambas debe salir de la validación de dos semanas (`08`, `11`), no de esta matriz.

## 6. Distinción pedida en el enunciado (§8)

| ID | Potencial de mercado | Evidencia de demanda real | Viabilidad de construir | Facilidad de los primeros clientes |
|---|---|---|---|---|
| O1 | Medio: ~300 agencias más forwarders e importadores; alto valor por cliente | Indirecta | Media (depende de la integración) | Media |
| O2 | Alto: miles de distribuidoras en LatAm | Indirecta (el incumbente invierte) | Media (emparejamiento de productos, ERP) | Alta |
| O4 | Alto en número, bajo en ticket | Indirecta (análogos extranjeros) | Media | Alta |
| O11 | Alto | Indirecta | Media | Alta |
| O3 | Medio | Indirecta | Alta | Media |

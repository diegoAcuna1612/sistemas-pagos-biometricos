# 07 — Modelo de negocio y precios

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

**Advertencia:** **no hay precios validados.**
- Los competidores directos peruanos no publican precios (Softland Pedidos IA, SINTAD, SOFTPAD).
- No se hicieron entrevistas.
- Por eso este documento da **fórmulas, comparables y escenarios ilustrativos** con supuestos marcados [H]. Ningún número de este archivo debe usarse como precio de venta sin la validación de `08`.

## 1. Comparables de precio encontrados

| Producto | Precio público | Unidad | Fuente |
|---|---|---|---|
| Licitaciones MYPE (Perú) | Desde S/ 49 | Mes | [S8] [C] |
| SafetyCulture Premium | ~USD 24 | Usuario al mes | [S46] [S] |
| Karbon | USD 59–89 | Usuario al mes | [S36] [C] |
| TaxDome | USD 800–1 200 | Usuario al año | [S36] [C] |
| Nanonets (extracción genérica) | ~USD 0,30 | Página | [S66] [S] |
| Módulo SIRE para Odoo | USD 152,94 | Pago único | [S41] [C] |
| Comisión de agencia de aduana (importación) | Mínimo USD 150 | B/L | [S20] [V] |
| Conexiom, Expedock, Raft, Esker, Lucy, Softland Pedidos IA | No publicado | — | [S11–S14, S24, S27, S28] |

## 2. Modelo propuesto por finalista

| | O1 DAM Asistida | O2 PedidoListo | O4 Estudio360 |
|---|---|---|---|
| Unidad de cobro | **Expediente procesado**, con un mínimo mensual | **Tramos de pedidos al mes** | **Por estudio**, con tramos de RUC |
| Por qué esa unidad | Se alinea con cómo cobra la agencia (por despacho) | Se alinea con el volumen y el costo variable | Simple; los estudios cobran por cliente |
| Implementación | Cobro único por configuración y calibración [H] | Cobro único por carga del catálogo e integración [H] | Sin cobro único |
| Piloto | 4–6 semanas con pago simbólico o carta de intención | Ídem | 1 cierre mensual |

## 3. Economía de O1

### 3.1 Valor para la agencia (fórmula)

```
Valor mensual = N_DAM × (t_ahorro / 60) × c_hora  +  errores evitados × costo por error
```

| Variable | Significado | Dato |
|---|---|---|
| N_DAM | DAM procesadas al mes por la agencia | [PI] (P1) |
| t_ahorro | Minutos de transcripción y revisión ahorrados por DAM | [PI]: medir en `08` |
| c_hora | Costo por hora del liquidador (sueldo + cargas) | [PI] (P4) |
| Costo por error | Multa, rectificación o demora | [PI] (P3) |

### 3.2 Sensibilidad ilustrativa: valor por DAM, solo tiempo

Los costos por hora son **supuestos [H]** para mostrar la forma del cálculo, no datos.

| t_ahorro | c_hora = USD 5 [H] | c_hora = USD 8 [H] |
|---:|---:|---:|
| 10 min | USD 0,83 | USD 1,33 |
| 30 min | USD 2,50 | USD 4,00 |
| 60 min | USD 5,00 | USD 8,00 |

**Lectura [I]:**
- Un precio de USD 1–3 por expediente solo se sostiene si el ahorro es de **20–30 minutos o más** por DAM.
- Eso apunta a **expedientes con muchos ítems** (retail, repuestos, tecnología), no a despachos de un solo producto.
- Es una hipótesis de segmentación que la validación debe confirmar.
- Como referencia, USD 1–3 equivale al **0,7–2%** de la comisión mínima de USD 150 [S20].

### 3.3 Costo de servir un cliente [I/H]

```
Costo mensual por agencia = N_DAM × costo_IA  +  infra prorrateada  +  horas_soporte × costo_hora_soporte
```

- **Costo de IA:** ≤ USD 0,16 por expediente con Sonnet 5.5 en el caso alto (`06` §5). Con 300 DAM, ≤ USD 48 al mes.
- **Lo dominante es el soporte:** calibración, formatos nuevos, dudas. Medirlo en el piloto.
- **Margen bruto** = precio × N_DAM − costo de servir. Es positivo con claridad si el precio por DAM supera USD 1 y el soporte baja de unas pocas horas al mes por cliente [H].

### 3.4 Escenario ilustrativo [H]

Todos los números son supuestos, no proyecciones.

| Supuesto | Valor |
|---|---|
| Agencias cliente al año 1 | 10 |
| DAM por agencia al mes | 300 |
| Precio por DAM | USD 1,50 |
| Ingreso mensual | 10 × 300 × 1,50 = **USD 4 500** |
| IA (Sonnet, caso alto) | ≤ USD 480 |
| Infra y WhatsApp | ~USD 200 |

**Lectura:** cubre la operación, pero no un equipo a tiempo completo. Para ser un negocio:
- Hacen falta **más agencias**, más volumen por agencia o un precio mayor en el segmento de muchos ítems.
- O hay que expandirse a **forwarders, importadores** y otros países (Chile, Colombia, Ecuador; formatos distintos [PI]).
- El mercado peruano de agencias es **pequeño** (~291 en 2017 [S19]).
- **Es el principal límite de O1.**

## 4. Economía de O2

### 4.1 Valor para la distribuidora

```
Valor mensual = pedidos_mes × (t_ahorro / 60) × c_hora_asistente  +  pedidos recuperados × margen
```

### 4.2 Escenario ilustrativo [H]

| Supuesto | Valor |
|---|---|
| Pedidos al día | 80 |
| Minutos ahorrados por pedido | 4 |
| Días hábiles | 22 |
| Horas ahorradas al mes | 80 × 4 × 22 / 60 ≈ **117 h** |
| Costo por hora del asistente | USD 4 [H] |
| Valor del tiempo | ≈ **USD 470 al mes** |

**Lectura [I]:**
- El ahorro de tiempo justifica un precio del orden de **USD 100–200 al mes** en una distribuidora de este tamaño.
- Es un ticket bajo para el costo de integrar cada ERP.
- El argumento de venta más fuerte serían los **pedidos recuperados** (fuera de horario, no perdidos) y los **errores evitados**, que no están medidos.
- **O2 necesita volumen de clientes:** su modelo se parece más a un SaaS de pymes que a uno vertical de alto ticket.

## 5. Canales comerciales

| Canal | O1 | O2 | O4 |
|---|---|---|---|
| Venta directa de los fundadores | **Principal:** sector pequeño | Principal al inicio | Principal |
| Gremio | AAAP, BASC Perú (la AAAP está en su consejo directivo) [S72] | Cámaras de comercio, gremios ferreteros [PI] | Colegios de contadores |
| Aliados | **Proveedores de SINTAD/SOFTPAD** (aliado o amenaza) | Implementadores de ERP (SAP B1, Odoo) | Proveedores de software contable |
| Señal de prospección | **Avisos de empleo de liquidadores** (quien contrata liquidadores tiene el dolor) [S15–S17] | Avisos de "asistente comercial" o "digitador" [PI] | Grupos de contadores |
| Contenido | Comparativas de tiempo por DAM | Casos con pedidos reales | Guías del SIRE y vencimientos |

## 6. Alternativas de cobro descartadas

| Alternativa | Por qué no |
|---|---|
| Licencia perpetua | Costo variable de IA y soporte continuo |
| Cobro por usuario (O1) | Desalienta que todos los liquidadores lo usen; el valor está en el expediente |
| Gratis con publicidad | Datos confidenciales; compradores B2B |
| Porcentaje del ahorro | Difícil de auditar al inicio |

## 7. Qué debe demostrar el producto para justificar la suscripción

| ID | Prueba mínima |
|---|---|
| O1 | En 20 expedientes reales: **≥ 30% menos tiempo** de liquidación y **cero errores introducidos** por el sistema; al menos un error del documento detectado antes de numerar [H: umbrales a acordar con el cliente] |
| O2 | En 50 pedidos reales: **≥ 80% de líneas correctas** sin edición y tiempo de captura reducido a la mitad [H] |
| O4 | En un cierre mensual: documentos completos antes y menos horas de persecución [H] |

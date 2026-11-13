# 06 — Arquitectura y viabilidad técnica

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Principio de diseño

- **El producto entrega órdenes de compra, no gráficos.** El pronóstico es un paso intermedio.
- **Determinista donde se pueda:** la política de reposición (punto de reorden, stock de seguridad, lote mínimo) es una fórmula auditable; solo el pronóstico es estadístico.
- **Sin LLM en el núcleo.** Un LLM puede redactar la explicación de la sugerencia, pero el número sale del modelo de series de tiempo [I].

## 2. Arquitectura preliminar

```
POS (Excel/CSV o API) ──► Ingesta y validación ──► Almacén de ventas e inventario (PostgreSQL, por empresa)
                                                           │
                                     Trabajo nocturno ◄────┘
                                           │
                         Clasificación ABC/XYZ + detección de intermitencia
                                           │
                     Pronóstico por producto (modelo según patrón de demanda)
                                           │
                 Política de reposición (lead time, lote mínimo, nivel de servicio)
                                           │
              Orden de compra sugerida por proveedor ──► Web (revisar, editar, exportar) ──► Alertas (correo/WhatsApp)
```

| Componente | Tecnología sugerida | Comentario |
|---|---|---|
| Backend | Python (FastAPI) | Mismo lenguaje que los modelos; coincide con el antecedente UPC [S11] |
| Modelos | `statsforecast` (AutoETS, Croston, TSB), LightGBM global | Libres; corren en CPU |
| Base de datos | PostgreSQL con `empresa_id` en cada tabla | Multiempresa desde el inicio |
| Frontend | Web responsiva | El dueño revisa desde el celular |
| Tareas | Cola simple (cron + worker) | Un cálculo por noche por empresa |

## 3. MVP (8–10 semanas, estimación [H])

1. Carga de ventas e inventario desde Excel/CSV con plantilla y validación.
2. Catálogo de proveedores con plazo de entrega y lote mínimo.
3. Clasificación ABC y detección de demanda intermitente.
4. Pronóstico semanal por producto con tres modelos y selección por *backtesting*.
5. Orden de compra sugerida editable y exportable.
6. Panel: quiebres de la semana, productos sin movimiento, error del pronóstico.
7. Auditoría: qué sugirió el sistema y qué pidió el usuario.

**Fuera del MVP:** integración por API con cada POS, precios dinámicos, varios almacenes.

## 4. Métricas de calidad del pronóstico

| Métrica | Uso |
|---|---|
| **WAPE** (error absoluto ponderado) | Error general, ponderado por volumen |
| **MASE** | Compara contra el método ingenuo ("lo mismo que la semana pasada"); MASE < 1 = mejor que el método actual |
| **Sesgo** | ¿Sobrestima o subestima de forma sistemática? |
| Nivel de servicio simulado | % de semanas sin quiebre al seguir la sugerencia |
| Días de inventario | Capital inmovilizado |

**Datos para el experimento sin cliente:** conjuntos públicos de ventas minoristas (por ejemplo, "Corporación Favorita" de Kaggle, supermercados de Ecuador, o M5) [PI: verificar licencia de uso académico].

## 5. Costos estimados [H]

| Concepto | Estimación |
|---|---|
| Cómputo por empresa (1 000–5 000 productos, cálculo nocturno) | Minutos de CPU por noche: centavos de dólar |
| Infraestructura del MVP (un servidor pequeño + base gestionada) | USD 30–80 al mes |
| IA generativa (si se usa para explicaciones) | Opcional; despreciable con un modelo pequeño |

## 6. Seguridad y privacidad

- Datos comerciales, no personales (salvo si el POS exporta clientes: **no importarlos**).
- Aislamiento por empresa probado con pruebas automáticas.
- Ley 29733 y DS 016-2024-JUS solo aplican si se importan datos de clientes [I].

## 7. Riesgos técnicos

| Riesgo | Mitigación |
|---|---|
| Datos sucios (códigos duplicados, ventas negativas, devoluciones) | Validación en la ingesta y reporte de calidad de datos |
| Historial corto (< 6 meses) | Modelos simples y pronóstico por categoría |
| Quiebres pasados ocultan la demanda real (si no había stock, no hubo venta) | Marcar semanas con stock cero y excluirlas o corregirlas |
| El POS no exporta inventario | Inventario inicial manual + movimientos de venta [H] |

## 8. ¿Requiere algo desproporcionado?

**No.** Todo es software libre y cómputo barato. La dificultad está en la calidad de los datos y en la adopción, no en la tecnología.

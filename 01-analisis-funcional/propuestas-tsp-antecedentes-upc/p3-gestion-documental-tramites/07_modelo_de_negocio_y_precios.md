# 07 — Modelo de negocio y precios

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`. Cifras **ilustrativas [H]**.

## 1. Comparables

| Producto | Precio | Fuente |
|---|---|---|
| SGD-PCM / software público | **Gratis** para entidades | [S3, S4] |
| IDP (Nanonets, Rossum) | ~USD 0,30 por página; Rossum desde miles de USD al año | Investigación de oportunidades, S66 |
| ECM | [PI] | — |

## 2. Modelo propuesto (V4)

| Elemento | Propuesta [H] |
|---|---|
| Cobro | Por expediente procesado con mínimo mensual |
| Precio | S/ 4–8 por expediente; mínimo S/ 800/mes |
| Configuración | S/ 1 500 por tipo de producto (reglas y plantillas) |

## 3. Economía de V4

### 3.1 Valor (fórmula)

```
Valor = (minutos de revisión ahorrados × costo por minuto)
      + (días ganados hasta expediente completo × valor de cerrar antes)
      + (expedientes perdidos por abandono evitados × margen)
```

### 3.2 Ejemplo ilustrativo [H]

| Supuesto | Valor |
|---|---|
| Expedientes al mes (inmobiliaria mediana) | 200 |
| Revisión actual | 40 min por expediente (con idas y vueltas) |
| Reducción | 50% → 20 min × 200 = 67 h/mes |
| Costo por hora del asesor | S/ 20 → **S/ 1 340** |
| Abandonos evitados | 2 al mes × margen S/ 1 000 → **S/ 2 000** |
| **Valor** | **~S/ 3 340 al mes** frente a un costo de ~S/ 1 200 |

El abandono evitado pesa más que el tiempo ahorrado: **hay que validarlo** en entrevistas.

### 3.3 Costo de servir [H]

- IA + infraestructura: < S/ 0,50 por expediente.
- Configuración inicial y soporte: el costo principal.

## 4. Canales

- Inmobiliarias y corredores (gremios inmobiliarios) [PI].
- Cooperativas de ahorro y crédito pequeñas [PI: regulación SBS para cooperativas].
- Proveedores de CRM inmobiliario como aliados (Sperant fue citado en la investigación de oportunidades, S63).

## 5. Qué debe demostrar

1. ≥ 30% más expedientes completos al primer envío.
2. ≥ 40% menos minutos de revisión.
3. 0 falsos "OK" en campos críticos (DNI, nombre) en el conjunto de prueba.

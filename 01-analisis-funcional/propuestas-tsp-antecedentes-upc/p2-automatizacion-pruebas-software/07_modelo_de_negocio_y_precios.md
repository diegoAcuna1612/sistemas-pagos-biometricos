# 07 — Modelo de negocio y precios

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`. Cifras **ilustrativas [H]** salvo las que llevan fuente.

## 1. Comparables

| Producto | Precio | Fuente |
|---|---|---|
| Katalon | Gratis (comunitaria); ~USD 170/usuario/mes | [S4] |
| mabl | ~USD 500+/mes | [S5] |
| QA Wolf | ~USD 8 000/mes (servicio) | [S6] |
| Xray / TestRail | [PI] | — |

## 2. Modelo propuesto

| Variante | Modelo | Precio tentativo [H] |
|---|---|---|
| V3 nube | Por equipo de QA (hasta 10 usuarios) | S/ 1 500/mes |
| V3 instalado en cliente | Licencia anual + soporte | S/ 30 000–60 000/año |
| Módulo V2 | Complemento por equipo | S/ 500/mes |

## 3. Economía de V3

### 3.1 Valor (fórmula)

```
Valor mensual = analistas × horas de documentación al mes × % reducido × costo por hora
```

### 3.2 Ejemplo ilustrativo [H]

| Supuesto | Valor |
|---|---|
| Analistas de QA en una consultora | 20 |
| Horas de documentación por analista al mes | 24 (6 por semana) |
| Reducción | 50% → 240 h liberadas |
| Costo por hora del analista [PI: sueldos] | S/ 25 |
| **Valor** | **S/ 6 000 al mes** |

Con un precio de S/ 1 500–3 000, el cliente obtiene 2–4 veces el valor **si** las horas de documentación son las supuestas. Si son 2 h por semana, el valor cae a S/ 2 000 y el precio alto no se sostiene.

### 3.3 Costo de servir [H]

- Nube: infraestructura < 10% del precio.
- Instalación en cliente: soporte y adaptación de plantillas, el costo principal.

### 3.4 Escenario [H]

| Mes | Clientes | Ingreso mensual (S/ 1 800 promedio) |
|---|---:|---:|
| 6 | 2 | S/ 3 600 |
| 12 | 6 | S/ 10 800 |
| 24 | 15 | S/ 27 000 |

## 4. Canales

- Consultoras de QA (multiplican: un contrato cubre varios equipos).
- Comunidades de testing en Perú y LinkedIn.
- Alianza con consultoras como herramienta propia de su servicio.

## 5. Qué debe demostrar

1. ≥ 40% menos horas de documentación en un equipo real.
2. Evidencia aceptada por el aprobador del cliente sin rehacerla.
3. Integración con al menos 2 frameworks que el equipo ya usa.

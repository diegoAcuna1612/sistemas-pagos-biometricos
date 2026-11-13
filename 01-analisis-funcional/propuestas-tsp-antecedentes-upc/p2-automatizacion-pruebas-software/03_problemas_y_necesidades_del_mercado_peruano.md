# 03 — Problemas y necesidades del mercado peruano

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Rasgos del contexto

| Rasgo | Efecto | Fuente |
|---|---|---|
| La banca es el principal empleador de QA automatizado | El comprador con presupuesto es el banco o su consultora | [S2, S3, S7, S8] |
| Varias tesis peruanas automatizan pruebas en bancos (UPC 2023, UCV-BCP, UPLA 2022) | El problema es conocido y recurrente | [S1, S7, S8] |
| Los avisos piden herramientas libres | El equipo ya sabe ejecutar; le falta tiempo [I] | [S3] |
| Regulación de seguridad de la información de la SBS | Los datos del banco no salen con facilidad a un SaaS [I]; [PI] confirmar la norma vigente | — |

## 2. Problemas por variante

### 2.1 Evidencias y certificación (V3)

- **Qué pasa hoy [H]:** el analista de QA ejecuta (manual o automático), toma capturas, las pega en un documento con la plantilla del banco, lo sube y espera la aprobación. Cada pase a producción exige ese paquete.
- **Señal:** el antecedente UPC busca explícitamente "reducir tiempos de **certificación**" [S1].
- **Costo [H]:** horas de analista por versión dedicadas a documentar, no a probar.

### 2.2 Escritura de casos de API (V2)

- Escribir y mantener casos para cada endpoint consume tiempo; las especificaciones OpenAPI suelen estar desactualizadas [H].

### 2.3 Facturación electrónica (V4)

- Las casas de software que integran con un OSE deben probar en cada versión que los comprobantes se aceptan [H]. Mercado reducido.

## 3. Patrones transversales [I]

1. **El cuello de botella no es ejecutar, es demostrar que se probó.**
2. **La herramienta no puede pedir que el equipo cambie de framework:** debe leer los resultados que ya produce (JUnit XML, reportes de Karate, trazas de Playwright).
3. **En banca, "instalable en el cliente" es un requisito**, no una opción.

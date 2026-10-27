# 06 — Evaluación económica

**Fecha de consulta de los precios:** 27/10/2026.

**Convenciones:**
- **P** = precio publicado (con fuente).
- **E** = estimación propia.
- **ND** = no determinable con fuentes públicas.

Los precios en USD no incluyen importación, IGV (18 %), envío ni soporte. Para convertir a soles se debe usar el tipo de cambio del día de compra; aquí **no se fija uno**.

## Escenario A — Prototipo académico

| Concepto | Tipo | Única / recurrente | Monto | Fuente / supuesto |
|---|---|---|---|---|
| Lector SecuGen Hamster Pro 20 | P | Única | US$ 71,40 (revendedor EE. UU.) | [F30] |
| Alternativa local: ZKTeco ZK9500 | P | Única | S/ 199–209 (Falabella Perú) | [F33] |
| Lector con PAD declarado (BioMini Slim 2), opcional | ND | Única | Requiere cotización | [F32] |
| SDK del lector | P | — | Gratuito según el fabricante (SecuGen) | [F30] |
| Motor de comparación SourceAFIS | P | — | US$ 0 (Apache 2.0) | [F34] |
| Herramientas de desarrollo (.NET, Next.js, SQL Server Express / Developer) | E | — | US$ 0 con ediciones gratuitas; **verificar los términos de licencia** | Supuesto |
| Infraestructura en la nube para la demo | E | Recurrente | Bajo; posible con créditos educativos o capa gratuita. **ND** sin cotizar | Supuesto |
| Desarrollo | E | — | Tiempo de los 2 estudiantes (costo de oportunidad, no desembolso) | — |
| Insumos para pruebas de ataque (silicona o gelatina para huellas falsas **de los propios voluntarios con consentimiento**) | E | Única | Bajo; ND | Supuesto |
| Trámite de sustentación UPC | P | Única | **S/ 2 122,00** | [F38] |

**Desembolso del prototipo, sin contar el trámite de la UPC (E):** del orden de **US$ 70–300** en hardware, más la nube. Es un costo bajo.

## Escenario B — Prototipo integrado

| Concepto | Tipo | Única / recurrente | Monto |
|---|---|---|---|
| 2–3 lectores (incluido uno con PAD) | P/ND | Única | US$ 150–600 aprox. (E, según los precios de A; BioMini sin cotizar) |
| Sandbox de pasarela (Mercado Pago / Culqi) | P | — | Generalmente gratuito para pruebas (E; confirmar) |
| Nube: API + BD + KMS + almacenamiento | ND | Recurrente | Cotizar en la calculadora del proveedor |
| Pruebas de seguridad (escáneres OWASP ZAP, revisión entre pares) | E | — | US$ 0 con herramientas libres |
| Dominio y certificados TLS | E | Recurrente | Bajo (Let's Encrypt gratuito) |

## Escenario C — Piloto comercial

| Concepto | Tipo | Única / recurrente | Monto |
|---|---|---|---|
| Lectores con PAD certificado × N terminales | ND | Única | Cotización por volumen |
| Licencia de un motor biométrico comercial (si SourceAFIS no alcanza el FMR requerido) | ND | Recurrente | Cotización |
| Integración financiera (certificación con adquirente o emisor) | ND | Única | Depende del contrato |
| Comisiones por transacción (MDR del adquirente) | ND | Recurrente | Según contrato. La Circular 0026 obliga a publicarlas a partir de 2027 [F5] |
| Asesoría legal (pagos + datos personales) | ND | Única y recurrente | Cotizar |
| Prueba de penetración independiente | ND | Anual | Cotizar |
| Evaluación PAD en un laboratorio (ISO 30107-3) | ND | Única | Cotizar |
| Oficial de Datos Personales, cumplimiento y seguros | ND | Recurrente | — |
| Soporte e instalación del agente en terminales | ND | Recurrente | — |
| Verificación RENIEC en el registro | NV | Por consulta | S/ 0,90–1,60 (guía no oficial; **verificar**) [F35] |
| Registro o autorización BCRP (solo si se actúa como Aceptador de Pagos) | ND | — | Requiere estructura societaria, capital y cumplimiento |

**Conclusión:**
- **A y B son económicamente viables** para dos estudiantes.
- **C no se puede estimar** con fuentes públicas: la mayoría de sus costos dependen de contratos y cotizaciones. Además, la experiencia de Pay By Touch muestra que el despliegue de hardware exige mucho capital [F10].

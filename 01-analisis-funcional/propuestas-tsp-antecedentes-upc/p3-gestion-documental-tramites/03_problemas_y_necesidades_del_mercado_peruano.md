# 03 — Problemas y necesidades del mercado peruano

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Rasgos del contexto

| Rasgo | Efecto | Fuente |
|---|---|---|
| Mesa de partes digital exigida a entidades (DL 1310, art. 8, citado en directivas) | El sector público ya se digitalizó o tiene la vía gratuita | [S11] |
| Software público y soporte de la PCM | Sin espacio para un producto pagado municipal | [S3, S4] |
| Tesis con mejoras grandes (52,2 → 6,6 min por trámite) | El problema del flujo es fácil de resolver con software básico | [S7] |
| Muchas empresas privadas no gestionan sus documentos como tales | Hay necesidad, pero también baja madurez | [S12] |
| Créditos, seguros y ventas inmobiliarias exigen expedientes con documentos de clientes | El cuello de botella es revisar que estén completos y correctos [H] |

## 2. Problemas por variante

### 2.1 Expedientes de clientes (V4)

- **Qué pasa hoy [H]:** el cliente envía DNI, boletas de pago, recibos de servicios y declaraciones por WhatsApp o correo; un asesor revisa uno por uno, pide lo que falta y vuelve a revisar.
- **Costo [H]:** días de demora por idas y vueltas; expedientes que llegan incompletos a evaluación.
- **Lo que aporta la IA:** clasificar cada archivo, extraer datos, verificar coherencia (mismo nombre y DNI en todo), vigencia (boleta de los últimos 3 meses) y legibilidad.

### 2.2 Trámites académicos (V2)

- Constancias y certificados con pago previo y firma; seguimiento por correo [H]. Muchas instituciones lo tienen en su sistema académico [PI].

### 2.3 Colegios profesionales (V3)

- Habilitación y certificados con verificación de pagos de cuotas [H]. Organizaciones con poco presupuesto de TI [I].

### 2.4 Municipalidades (V1)

- El problema existe, pero la solución base es gratuita y la compra pública es lenta [S3, S9].

## 3. Patrones transversales [I]

1. **El flujo (recibir, derivar, consultar estado) ya es una mercancía.** El valor está en reducir la revisión humana del contenido.
2. **"Expediente completo al primer intento"** es la métrica que importa para el cliente y para la empresa.
3. Los documentos contienen **datos personales**: el diseño de privacidad es parte del producto.

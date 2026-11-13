# 03 — Problemas y necesidades del mercado peruano

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Rasgos del contexto

| Rasgo | Efecto | Fuente |
|---|---|---|
| La banca y los servicios lideran la demanda de RPA | El comprador grande ya está atendido | [S1, S2] |
| Factura electrónica XML en Perú | Las facturas nacionales no necesitan IA; las extranjeras y los documentos sin estructura sí | Oportunidades S39 |
| Sin banca abierta | La conciliación depende de extractos subidos a mano | Oportunidades `09` (O11) |
| Portales del Estado cambian y usan captchas [I] | Los bots de portales son frágiles | [PI] |

## 2. Problemas por variante

### 2.1 Documento → datos → sistema (V3)

- **Qué pasa hoy:** alguien transcribe datos de documentos (facturas extranjeras, packing lists, órdenes en PDF) a un sistema. Es el patrón dominante de la investigación de oportunidades (`../../oportunidades-saas-ia-cloud-peru/03` §3).
- **Aporte:** extracción con IA + validaciones + carga (API, archivo de importación o bot de pantalla como último recurso) + trazabilidad.

### 2.2 Conciliación de abonos (V5)

- Cobros por Yape, Plin y transferencias que hay que asociar a facturas; atrasos de cobro altos en casos peruanos (36% de atraso, 81 días promedio en una tesis) (oportunidades S59).

### 2.3 Portales del Estado (V2)

- Descargar comprobantes, revisar el buzón SOL y consultar estados para muchos RUC. Riesgo legal y de seguridad por guardar la Clave SOL de terceros (oportunidades P7).

### 2.4 Monitoreo de bots (V4)

- Las empresas con bots necesitan saber cuáles fallaron y por qué [H]; las plataformas ya lo ofrecen [PI].

## 3. Patrones transversales [I]

1. **El RPA de pantalla es el último recurso:** primero API, luego importación de archivo, al final clics.
2. **El valor está en la excepción:** lo que el bot no pudo procesar debe llegar a una persona con contexto.
3. **La trazabilidad es la evidencia** de que la automatización es confiable; es indispensable, pero no es el producto.

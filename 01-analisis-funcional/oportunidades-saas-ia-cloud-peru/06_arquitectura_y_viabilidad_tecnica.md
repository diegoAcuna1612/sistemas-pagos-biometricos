# 06 — Arquitectura y viabilidad técnica

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

**Esta fase no incluye código.** Lo que sigue es una propuesta preliminar para estimar la viabilidad y el costo. Debe revisarse después de la validación (`08`).

## 1. Principio de diseño

Los dos finalistas principales (O1 y O2) comparten un patrón:

> **documento o mensaje no estructurado → extracción → validación con reglas → revisión humana → exportación a un sistema existente**

Conclusiones:

1. **No hace falta una arquitectura de agentes.** El flujo es fijo y conocido; basta un **pipeline determinista** que llama al LLM en pasos acotados (clasificar, extraer) con salida estructurada [I].
2. **La revisión humana es obligatoria**, no opcional:
   - En O1, el agente de aduana responde por la declaración.
   - En O2, un pedido equivocado se despacha.
3. **Las reglas valen más que el modelo.** La consistencia factura–packing list y los totales se validan con código, no con IA.
4. **Integrar, no reemplazar.** El producto alimenta SINTAD, SOFTPAD o el ERP; no compite con ellos.

## 2. Arquitectura común preliminar

```
 Canales de entrada                 Núcleo                                   Salidas
 ─────────────────                 ──────                                   ───────
 Correo (buzón por cliente) ─┐
 Portal web (carga de PDF) ──┼─► API (Next.js / TypeScript) ─► Cola de trabajos (en PostgreSQL al inicio)
 WhatsApp Business API ──────┘            │                          │
                                          │                          ▼
                                          │              Worker de documentos (Python)
                                          │              1. Normalizar (PDF, imagen, audio → texto/imagen)
                                          │              2. Clasificar tipo de documento (LLM pequeño)
                                          │              3. Extraer a un esquema JSON (LLM, salida estructurada)
                                          │              4. Validar con reglas deterministas
                                          │              5. Sugerir (partida o producto) con búsqueda en historial
                                          ▼                          │
                               PostgreSQL (multiempresa, RLS)  ◄─────┘
                               Almacenamiento de objetos (documentos originales)
                                          │
                                          ▼
                       Bandeja de revisión (lado a lado: documento ↔ campos)
                                          │
                                          ▼
                       Exportación: Excel/CSV con el formato del sistema destino,
                       API del ERP cuando exista, registro de auditoría
```

| Componente | Elección propuesta | Alternativa | Motivo |
|---|---|---|---|
| Interfaz y API | Next.js + TypeScript | .NET | Un solo lenguaje para la interfaz y la API; equipo pequeño |
| Worker de documentos | Python (FastAPI o worker simple) | Node | Mejores bibliotecas de PDF, imagen y texto |
| Base de datos | PostgreSQL gestionado; multiempresa con `tenant_id` y seguridad por filas (RLS) | — | Un solo motor para datos, colas y búsqueda vectorial (pgvector) |
| Cola | Tabla de trabajos en PostgreSQL al inicio | Cola gestionada (SQS u otra) cuando el volumen lo pida | Menos piezas en el MVP |
| Archivos | Almacenamiento de objetos con cifrado y vencimiento | — | Retención por contrato |
| LLM | API de un proveedor con salida estructurada; **capa propia que permita cambiar de modelo** | Modelos abiertos autoalojados | Calidad multimodal y costo bajo (§5); evitar dependencia |
| Búsqueda de productos o partidas | Búsqueda difusa (rapidfuzz) + pgvector | Motor de búsqueda dedicado | Suficiente para catálogos de miles de ítems |
| Transcripción de audio (O2) | Whisper (abierto) u otro servicio de voz a texto | — | **[PI]** costo y calidad con español peruano |
| OCR de respaldo | Tesseract u OCR en la nube | — | Para escaneos que el LLM lea mal |
| Observabilidad | Logs estructurados; **costo y tiempo por documento**; tasa de corrección humana | — | Es la métrica del negocio |

**Licencias [PI]:** revisar cada biblioteca. Por ejemplo, algunas bibliotecas de PDF populares son AGPL; pdfplumber es MIT.

## 3. MVP por finalista

### 3.1 O1 — DAM Asistida (MVP de 8–10 semanas, estimación [H])

| Incluye | No incluye |
|---|---|
| Carga de expediente (PDF, imagen) por portal y correo | Transmisión a SUNAT (la hace SINTAD/SOFTPAD) |
| Extracción de factura comercial y packing list: cabecera e ítems | Clasificación arancelaria automática sin revisión |
| Validaciones: totales, pesos, cantidades, moneda, incoterm, coherencia entre documentos | B/L, certificados y seguros (segunda iteración) |
| Revisión lado a lado con resaltado de campos dudosos | Integración directa por API, salvo que SINTAD/SOFTPAD la ofrezcan |
| **Exportación a Excel** en el formato que el liquidador pueda importar o copiar (P2) | Multiusuario avanzado |
| Partida **sugerida** a partir del historial de la agencia | — |
| Registro de auditoría: quién aprobó cada campo | — |

**Dependencias críticas:**
- **¿SINTAD o SOFTPAD importan ítems desde un archivo?** (P2). Si no, el valor se limita a extraer y validar, y el liquidador sigue tecleando en el sistema. **Esta es la pregunta técnica número uno.**
- Arancel vigente en formato procesable [PI].
- Muestras reales (20 o más expedientes) con acuerdo de confidencialidad.

### 3.2 O2 — PedidoListo (MVP de 8–12 semanas [H])

| Incluye | No incluye |
|---|---|
| Un número de WhatsApp Business y un buzón de correo por cliente | Pagos |
| Texto, PDF e imagen; audio en la segunda iteración | Recomendaciones de venta |
| Carga del catálogo y lista de precios por Excel | Integración con más de un ERP en el MVP |
| Emparejamiento de líneas con productos más el historial del cliente | — |
| Bandeja de aprobación; exportación CSV del pedido | — |
| Confirmación al cliente por WhatsApp | — |

**Dependencia crítica:** formato de importación del ERP del cliente piloto (P6).

### 3.3 O4, O11 y O3

| ID | MVP | Uso real de IA | Alternativa determinista |
|---|---|---|---|
| O4 | Recolección por WhatsApp, archivo por RUC y periodo, calendario de vencimientos | Clasificar el tipo de documento | Que el cliente elija el tipo en un menú |
| O11 | Importar facturas XML, recordatorios, leer constancias de pago | Leer imágenes de constancias | Formulario donde el cliente escribe el número de operación |
| O3 | Validar XML y CDR, reglas de detracción, cruce con el SIRE | Casi ninguno | **Todo determinista**: no venderlo como "IA" |

## 4. Integraciones

| Integración | O1 | O2 | O4 | Riesgo |
|---|---|---|---|---|
| SINTAD / SOFTPAD | Por archivo (P2) | — | — | **Alto**: desconocido |
| ERP del cliente | — | CSV primero; API después | Exportación a Contasis o Concar | Medio |
| WhatsApp Business API (Meta, vía proveedor) | Opcional | **Sí** | **Sí** | Medio: políticas, plantillas aprobadas, calidad del número [S58] |
| SUNAT (validez de comprobantes, SIRE) | — | — | Sí (P7) | Medio-alto |
| Arancel de Aduanas | Sí | — | — | Bajo, si está publicado en formato procesable |

## 5. Costos estimados

### 5.1 IA por unidad (supuestos explícitos)

**Precios [C, S65]** (USD por millón de tokens, API de Anthropic, caché del 06/10/2026):

| Modelo | Entrada | Salida |
|---|---|---|
| Haiku 5.5 (prompts ≤ 100K tokens) | 0,10 | 0,50 |
| Sonnet 5.5 | 2 | 10 |
| Opus 5.5 | 4 | 20 |

La Batch API cobra 50% menos. Otros proveedores no se cotizaron.

**Supuestos [H]** (medirlos con un conteo real de tokens antes de fijar precios):
- Una página de PDF equivale a 1 500–3 000 tokens de entrada.
- Un expediente de O1 tiene 6–10 páginas: 9 000–30 000 tokens de entrada y 2 000–10 000 de salida (facturas con cientos de ítems).
- Un pedido de O2 usa 3 000–15 000 tokens de entrada (mensaje, candidatos del catálogo e instrucciones) y 500–2 000 de salida.
- El razonamiento interno del modelo se factura como salida: hay que agregar margen.

| Unidad | Haiku 5.5 | Sonnet 5.5 | Opus 5.5 |
|---|---:|---:|---:|
| Expediente O1 (caso alto: 30k entrada, 10k salida) | ≤ USD 0,008 | ≤ USD 0,16 | ≤ USD 0,32 |
| Pedido O2 (caso alto: 15k entrada, 2k salida) | ≤ USD 0,003 | ≤ USD 0,05 | ≤ USD 0,10 |

**Lectura [I]:**
- En O1, aun con el modelo más caro y el doble de margen, la IA cuesta **menos del 0,5%** de la comisión mínima de USD 150 [S20].
- **El costo de la IA no es la restricción.** Lo son la **revisión humana**, el **soporte** y la **integración**.
- Estrategia sugerida:
  - Modelo barato para clasificar.
  - Modelo medio para extraer.
  - El mejor modelo solo cuando las validaciones fallen.
  - Elegir el modelo con un **conjunto de prueba** de documentos reales, no por intuición.

### 5.2 Infraestructura del MVP [H]

- **Orden de magnitud:** decenas a pocos cientos de dólares al mes (base de datos gestionada pequeña, cómputo, almacenamiento, WhatsApp por conversación).
- **[PI]:** cotizar en la calculadora del proveedor de nube elegido.
- **[PI]:** confirmar si el proveedor tiene región en Perú. Si los datos se alojan fuera, aplica el **flujo transfronterizo** del DS 016-2024-JUS. Ver el resumen de obligaciones en `../sistema-pagos-biometricos-cerrado/06_marco_legal_peru.md` [S61].

## 6. Seguridad y privacidad

| Tema | Medida |
|---|---|
| Rol legal | El SaaS es **encargado del tratamiento** de los datos personales que contengan los documentos: nombres de consignatarios, compradores, teléfonos [S61] |
| Confidencialidad comercial | Facturas y precios son información sensible para el negocio: acuerdo de confidencialidad, cifrado, retención limitada, borrado al terminar |
| Aislamiento | Multiempresa con RLS; pruebas automáticas de que ninguna empresa ve datos de otra |
| Proveedor de LLM | Revisar sus términos: retención y si usa los datos para entrenar [PI]; elegir opciones sin retención si existen |
| Inyección de instrucciones | Los documentos son **datos no confiables**: el LLM solo llena campos de un esquema; ningún texto del documento ejecuta acciones |
| Auditoría | Registro de quién aprobó o corrigió cada campo; versión del modelo y de las instrucciones usadas |
| Credenciales de terceros (O4) | **No guardar la Clave SOL** hasta tener una opinión legal (P7) |

## 7. Calidad de la IA

1. **Conjunto de evaluación** antes de programar el producto: 50–100 documentos reales anonimizados, con la respuesta correcta.
2. **Métricas:**
   - Precisión por campo.
   - Porcentaje de documentos sin ninguna corrección.
   - Tiempo de revisión humana.
3. **Regresión:** todo cambio de modelo o de instrucciones se prueba contra ese conjunto.
4. **Confianza por campo:** los campos que no pasan una validación se resaltan; nunca se exportan sin revisión.

## 8. Riesgos técnicos

| Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|
| SINTAD/SOFTPAD sin importación de archivos (O1) | Media [PI] | **Alto** | Validarlo en la semana 1; plan B: copiado asistido o exportación del borrador |
| Facturas escaneadas de mala calidad | Media | Medio | OCR de respaldo; marcar para revisión |
| Facturas con cientos de ítems | Media | Medio | Procesar por páginas; validar sumas |
| Emparejamiento de productos impreciso (O2) | Alta | Alto | Historial del cliente, sinónimos aprendidos de las correcciones |
| Cambio de precios o modelos del proveedor de LLM | Media | Medio | Capa intercambiable; evaluación con varios modelos |
| Políticas de WhatsApp (bloqueos, plantillas) | Media | Medio | Proveedor oficial; consentimiento; buenas prácticas [S58] |
| Mantenimiento por cliente (formatos distintos) | Alta | Medio | Plantillas configurables, no código por cliente |

## 9. ¿Requiere algo desproporcionado?

| Requisito | O1 | O2 |
|---|---|---|
| Hardware costoso | No | No |
| Datos imposibles de conseguir | No; requiere expedientes reales con acuerdo de confidencialidad | No; requiere catálogo e historial |
| Integración con una gran empresa | Con el proveedor de SINTAD/SOFTPAD (o archivo) | Con el ERP del cliente |
| Equipo especializado | **Conocimiento aduanero** (un liquidador asesor) | Conocimiento del ERP del piloto |

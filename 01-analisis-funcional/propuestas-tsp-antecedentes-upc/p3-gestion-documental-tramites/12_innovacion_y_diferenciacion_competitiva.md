# 12 — Iteración 2: innovación y diferenciación competitiva (P3)

**Fecha:** 05/11/2026. Segunda iteración. Los archivos 00–11 no se modificaron.
**Fuentes nuevas:** N1–N9 en §9. Etiquetas como en `10_fuentes_y_evidencias.md`.

## 1. Método

Skill `creative-ideation`:
- **Encuadre:** *Jobs to Be Done* (Christensen; fuerzas de Moesta).
- **Ruptura del marco:** provocaciones PO (de Bono).
- **Selección:** premortem (Klein).
- **Terreno de alto riesgo** ("IA documental"): se descartaron las 5 primeras ideas.

## 2. Qué ofrecen hoy los competidores (actualizado)

| Actor | Qué ofrece | Fuente |
|---|---|---|
| SGD-PCM, Facilita Perú, software público | Trámite documentario gratuito para entidades | `10` S3–S5 |
| IDP genéricos (Rossum, Nanonets) | Extracción de documentos, sin reglas locales | Oportunidades S66 |
| Fondo Mivivienda | **Monitor VIS:** app para supervisar el avance de obras de Techo Propio (el Estado ya digitaliza partes del programa) | [N7] |
| Software para entidades técnicas de Techo Propio | **No identificado** [PI] | — |
| Verificación de identidad y KYC para cooperativas | Proveedores regionales de identidad digital [PI: no verificados en esta sesión] | — |

## 3. Hallazgo: un nicho con plazo, cupo y reglas públicas

El **Programa Techo Propio** (Fondo Mivivienda) tiene una mecánica que convierte la completitud del expediente en dinero:

| Hecho | Fuente |
|---|---|
| 1ª convocatoria nacional 2025: hasta **26 604 bonos** de construcción en sitio propio | [N2] |
| 2ª convocatoria 2025: **6 698 bonos**; inscripción del 18 al 22 de agosto | [N3] |
| **1 221 entidades técnicas** autorizadas a nivel nacional | [N2] |
| Las entidades técnicas tienen **30 días calendario** para presentar los expedientes; el Fondo **los recibe solo hasta cubrir los bonos convocados**; si una familia no tiene expediente a tiempo, otra entidad técnica puede atenderla | [N4] |
| Bono de construcción en sitio propio: ~**S/ 37 625** (agosto 2025) | [N5] |
| Normativa vigente con artículos sobre "expedientes en trámite" | [N1] |

**Lectura [I]:** es una **carrera**. La entidad técnica que ingresa primero expedientes completos se queda con las obras. Un expediente observado o tardío puede pasar a otra entidad.

## 4. El trabajo del cliente (JTBD)

> **Cuando** se publica la lista de familias elegibles y tengo 30 días para ingresar expedientes antes de que el Fondo complete el cupo, **quiero** que cada expediente entre completo y sin observaciones, **para** asegurar la obra de esa familia antes que otra entidad técnica.

| Fuerza | En este caso [H] |
|---|---|
| Empuje | Plazo corto, cupo que se agota, observaciones que retrasan |
| Atracción | Más expedientes ingresados a tiempo y menos devueltos |
| Ansiedad | "Las reglas cambian en cada convocatoria"; datos de familias vulnerables |
| Hábito | Excel, carpetas físicas, tramitadores |

## 5. Ideas rechazadas (las 5 obvias)

OCR de documentos · mesa de partes con IA · chatbot "¿en qué va mi trámite?" · clasificación automática genérica · firma digital. Son funciones de producto genéricas y están en los ECM o en el software público.

## 6. Alternativas de diferenciación

### A. "El expediente se valida contra la resolución de la convocatoria vigente" — **aterrizada**

- **Provocación PO (pensamiento imposible):** *po, ningún expediente sale observado.*
- **Mecanismo:**
  - **Motor de reglas versionado por convocatoria:** requisitos, plazos y montos de cada resolución, cargados como reglas y no como código.
  - **Lista de verificación por familia:** DNI, partida registral del predio, declaraciones juradas, plano y presupuesto.
  - **Extracción y validaciones cruzadas:** mismo nombre y DNI en todos los documentos; titularidad del predio coherente con el postulante; datos del lote.
  - **Tablero de la carrera:** días restantes, expedientes completos, observados y pendientes por promotor.
  - **Registro de observaciones:** cada observación que llega se convierte en una regla nueva.
- **Tipo:** operativa y tecnológica vertical.
- **Por qué pagaría:** cada expediente ingresado a tiempo es una obra financiada (~S/ 37 625 de bono por vivienda [N5]). El margen de la entidad técnica sobre esa obra [PI] es lo que se protege.
- **Difícil de copiar:** **media**. Las reglas son públicas, pero mantenerlas por convocatoria y acumular el historial de observaciones es trabajo continuo.
- **Modo de falla:** el Fondo incorpora la validación en su propia plataforma (ya digitaliza el monitoreo de obras [N7]); pocas entidades técnicas pagan; demanda concentrada en las convocatorias.

### B. "El expediente se arma antes de que abra la convocatoria"

- **Provocación PO (distorsión):** *po, el expediente existe antes que la convocatoria.*
- **Mecanismo:** app sin conexión para los promotores de campo. En la visita a la familia capturan documentos y fotos del lote y se hace una prevalidación. Cuando abre la convocatoria, el expediente está listo el primer día.
  - Reutiliza el motor sin conexión de P5.
- **Tipo:** operativa.
- **Modo de falla:** la elegibilidad de la familia cambia; las reglas exactas se conocen tarde.

### C. Prevalidación de expedientes de facturación clínica (EPS, SOAT, SIS)

- **Provocación PO (inversión):** *po, el auditor de la aseguradora revisa antes de que se facture.*
- **Evidencia:** débil en Perú. Una tesis UPCH (2025) documenta observaciones por errores en el FUA del SIS [N9]; no hay cifras de observaciones de EPS verificables.
- **Datos de salud (sensibles):** N bajaría a 2.
- **Se descarta en esta iteración**; queda como búsqueda pendiente.

## 7. Diferenciador elegido: nueva variante V7

**V7 — Expedientes Techo Propio para entidades técnicas.** A es el núcleo y B la ventaja operativa de la fase 2.

| Qué cambia | V4 (it. 1) | V7 (it. 2) |
|---|---|---|
| Cliente | Inmobiliarias, financieras, corredores (genérico) | **1 221 entidades técnicas** listables [N2] |
| Motor de urgencia | Idas y vueltas [H] | **Plazo de 30 días y cupo que se agota** [N4] |
| Reglas | Configurables por el cliente | **Públicas, versionadas por resolución** [N1] |
| Valor por expediente | Tiempo del asesor | Una obra financiada |

## 8. Ventajas y riesgos (premortem)

| Narrativa de fracaso (junio 2027) | Probabilidad [H] | Mitigación |
|---|---|---|
| El Fondo Mivivienda agregó validación automática a su plataforma de postulación | Media | Ofrecer la validación como paso previo; si el Fondo lo hace, quedarse con el armado en campo (B) |
| Las entidades técnicas grandes ya tenían su sistema; las pequeñas no pagaron | Media | Precio por expediente ingresado, no suscripción fija |
| Una convocatoria cambió reglas a mitad de año y el motor quedó obsoleto | Media | Reglas como datos, actualizables en horas |
| Filtración de datos de familias | Baja-media, grave | Cifrado, retención mínima, encargo de tratamiento |

## 9. Evidencia de mercado (fuentes nuevas)

| ID | Fuente | Qué respalda | Tipo | Lect. |
|---|---|---|---|---|
| N1 | RM 0104-2025-VIVIENDA — https://cdn.www.gob.pe/uploads/document/file/7910323/6659441-rm-0104-2025-vivienda.pdf | Normativa de Techo Propio; artículo sobre expedientes en trámite | [V] | B |
| N2 | El Tiempo, 1ª convocatoria 2025 — https://eltiempo.pe/bonos-y-subsidios/primera-convocatoria-nacional-del-programa-techo-propio-2025-que-entidades-tecnicas-son-las-autorizadas/ | Hasta 26 604 bonos; 1 221 entidades técnicas autorizadas | [S] | B |
| N3 | El Tiempo, 2ª convocatoria 2025 — https://eltiempo.pe/bonos-y-subsidios/techo-propio-2025-inscripciones-agosto-segunda-convocatoria-requisitos-y-todos-los-detalles-que-debes-saber-construccion-en-sitio-propio-ru/ | 6 698 bonos; inscripción del 18 al 22/08/2025 | [S] | B |
| N4 | El Peruano, dispositivos de convocatoria — https://busquedas.elperuano.pe/dispositivo/NL/2425440-1 ; https://busquedas.elperuano.pe/dispositivo/NL/2367659-1 | 30 días calendario para presentar expedientes; recepción hasta cubrir el cupo; reasignación a otra entidad técnica. **[PI] confirmar cuál de los dos dispositivos contiene cada regla** | [V] | B |
| N5 | El Tiempo, monto del bono — https://eltiempo.pe/economia/bono-techo-propio-2025-como-acceder-al-subsidio-de-s-37-625-para-construir-tu-vivienda-en-agosto/ | Bono de S/ 37 625 (agosto 2025) | [S] | B |
| N6 | Panamericana, Contraloría — https://panamericana.pe/nacionales/369583-fondo-mivivienda-perdio-s-41-millones-ejecutar-garantias-bonos-habitacionales | S/ 41 M de perjuicio por garantías no ejecutadas: el programa está bajo control | [S] | B |
| N7 | Infomercado, Monitor VIS — https://infomercado.pe/fondo-mivivienda-lanza-app-para-monitorear-construccion-de-viviendas-de-techo-propio/ | El Fondo digitaliza la supervisión de obras | [S] | B |
| N8 | SBS (11/11/2025), Coopac — https://www.sbs.gob.pe/noticia/detallenoticia/idnoticia/3884/trk//coopac ; Perú21 — https://peru21.pe/economia/desde-enero-de-2024-la-sbs-cerro-40-cooperativas-de-ahorro-y-credito/ | Coopac con 2,9 M socios; 40 disueltas desde 2024 (alternativa no elegida: KYC de cooperativas) | [V]/[S] | B |
| N9 | Tesis UPCH (2025) — https://repositorio.upch.edu.pe/bitstreams/5b3cc9bf-6fc0-44ea-8f7c-d78d610aca2b/download | Errores en el FUA generan observaciones y pérdidas (alternativa C) | [S] | B |

**Sin evidencia de disposición a pagar** de las entidades técnicas. La evidencia nueva respalda la urgencia (plazo y cupo) y el tamaño del grupo de clientes.

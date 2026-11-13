# 12 — Iteración 2: innovación y diferenciación competitiva (P2)

**Fecha:** 05/11/2026. Segunda iteración. Los archivos 00–11 no se modificaron.
**Fuentes nuevas:** N1–N8 en §9. Etiquetas como en `10_fuentes_y_evidencias.md`.

## 1. Método

Skill `creative-ideation`:
- **Encuadre:** *Jobs to Be Done* (Christensen; fuerzas de Moesta).
- **Ruptura del marco:** provocaciones PO (de Bono).
- **Selección:** premortem (Klein).
- **Terreno de alto riesgo** ("IA para QA"): se descartaron las 5 primeras ideas.

## 2. Qué ofrecen hoy los competidores (actualizado)

| Actor | Qué ofrece | Fuente |
|---|---|---|
| Selenium, Playwright, Cypress, Karate, Postman | Ejecución libre; son las herramientas que piden los avisos en Perú | `10` S3 |
| Katalon, mabl, QA Wolf | Plataformas con agentes de IA, autocuración, servicio gestionado | `10` S4–S6 |
| **Xray (Jira)** | **Document Generator**: informes de pruebas en DOCX o PDF; las plantillas pueden incluir evidencias. Un usuario reporta que la plantilla estándar lista los nombres de las capturas sin incrustarlas, y soporte sugiere una plantilla personalizada | [N6] |
| Herramientas libres de accesibilidad (axe-core, WAVE, Lighthouse) | Detectan automáticamente parte de los errores WCAG | [PI] (conocimiento general, no verificado en esta sesión) |
| Plataformas comerciales de accesibilidad (Siteimprove, Deque) | Monitoreo y auditoría, orientadas a grandes organizaciones | [PI] |

**Lectura:** la variante V3 de la iteración 1 (evidencias de certificación) **pierde fuerza**: Xray ya genera el documento con plantillas [N6]. El diferenciador quedaba en "la plantilla de cada banco", que es copiable.

## 3. Hallazgo regulatorio nuevo

- **Norma:** la **Resolución de Secretaría de Gobierno y Transformación Digital N.° 001-2025-PCM/SGTD** aprueba el lineamiento para el diseño y desarrollo de servicios o plataformas digitales accesibles. Se apoya en **WCAG 2.2**.
- **Alcance:** todas las entidades de la Administración Pública (nacional, regional y local) y las empresas públicas bajo FONAFE [N1, N2].
- **Sanciones:** la página oficial de gob.pe indica que el incumplimiento puede acarrear sanciones económicas. La misma página aún cita WCAG 2.0 (RM 126-2009-PCM) [N3].
- **Base legal y supervisión:** la Ley 29973; supervisa el CONADIS [N1].
- **Sector privado:** un proveedor afirma que el art. 23 de la Ley 29973 obliga también a las empresas que informan al consumidor por web [N4]. **[PI] verificar el texto legal.**

Es el primer **motor regulatorio** encontrado para P2.

## 4. El trabajo del cliente (JTBD)

> **Cuando** mi empresa de software entrega un sistema a un ministerio o a una empresa de FONAFE y el lineamiento de 2025 exige WCAG 2.2, **quiero** demostrar en la conformidad del entregable que el sistema cumple, criterio por criterio, **para** que no me observen la entrega ni me retengan el pago.

| Fuerza | En este caso [H] |
|---|---|
| Empuje | Obligación nueva (2025); posibles sanciones; observaciones en la conformidad |
| Atracción | Un informe aceptado por la entidad sin rehacerlo |
| Ansiedad | "Las herramientas automáticas no cubren todo"; "no sé qué criterios revisa la entidad" |
| Hábito | No hacer nada hasta que lo pidan; una auditoría manual puntual |

## 5. Ideas rechazadas (las 5 obvias)

IA que genera casos de prueba · tablero de calidad · autocuración de selectores · "superposición" que promete arreglar la accesibilidad sin tocar el código · chatbot de QA. Las cuatro primeras ya las ofrecen Katalon y mabl. La quinta no resuelve un problema concreto.

## 6. Alternativas de diferenciación

### A. "La accesibilidad se prueba en cada versión, con el informe que pide el lineamiento" — **aterrizada**

- **Provocación PO (escape):** *po, el sitio no se audita una vez: se prueba en cada versión.*
- **Mecanismo:**
  1. **Recorrido:** Playwright recorre los **trámites clave**, no solo la portada: formulario de mesa de partes, pago, consulta de expediente.
  2. **Reglas automáticas:** se ejecuta un motor libre de reglas (axe-core) en cada paso.
  3. **Mapeo:** cada falla se asocia a su criterio de éxito WCAG 2.2 y a la sección del lineamiento peruano.
  4. **Revisión manual guiada:** para los criterios que no se pueden automatizar (orden del foco, lector de pantalla, subtítulos) hay una lista guiada que guarda grabaciones como evidencia.
  5. **Informe de conformidad:** comparación entre versiones y pendientes para el equipo de desarrollo.
- **Tipo:** tecnológica, con especialización regulatoria local.
- **Funcionalidades:**
  - Biblioteca de recorridos de servicios públicos típicos.
  - Integración con CI (falla el pipeline si aparece un error nuevo de nivel A).
  - Informe por criterio.
  - Registro de evidencias manuales.
  - Historial por versión.
- **Por qué pagaría:**
  - El proveedor, para que le den conformidad.
  - La entidad, para responder a la SGTD o al CONADIS.
  - Las herramientas gratuitas dan una lista de errores en inglés, no un informe de cumplimiento del lineamiento [I].
- **Difícil de copiar:** **baja-media**. El motor es libre; la protección está en el mapeo al lineamiento, la biblioteca de recorridos y la revisión manual guiada.
- **Modo de falla:** si la norma no se fiscaliza, nadie paga. Se evalúa en §8.

### B. "Simuladores de servicios peruanos para QA"

- **Provocación PO (exageración):** *po, todos los servicios externos están caídos durante las pruebas.*
- **Mecanismo:** servidores simulados con respuestas realistas de:
  - El OSE y SUNAT (CDR aceptado, observado, rechazado).
  - Pagos QR interoperables con el estándar EMV que adoptó el BCRP [N7].
  - Pasarelas con Yape.
  - Así se prueban casos de error que el ambiente de pruebas real no reproduce.
- **Tipo:** tecnológica vertical.
- **Difícil de copiar:** media.
- **Modo de falla:** mercado pequeño (casas de software y fintechs); SUNAT ya tiene un ambiente de pruebas [PI].

### C. Evidencias de certificación (V3 de la iteración 1)

Se mantiene como **complemento** de A: la evidencia manual de accesibilidad usa el mismo motor documental. No se sostiene sola por Xray [N6].

## 7. Diferenciador elegido: nueva variante V6

**V6 — Accesibilidad continua (WCAG 2.2) para entidades públicas, empresas FONAFE y sus proveedores de software.**

| Qué cambia | V3 (it. 1) | V6 (it. 2) |
|---|---|---|
| Comprador | Consultoras de QA y bancos | **Proveedores de software del Estado**; después, entidades |
| Motor de demanda | Hipótesis (horas de documentación) | **Obligación normativa de 2025** [N1] |
| Competencia directa | Xray y TestRail | Herramientas genéricas sin informe local |
| Datos sensibles | Altos (banca) | **Bajos** (páginas públicas; cuentas de prueba en trámites con sesión) |
| Relación con el antecedente UPC | Muy parecido | **Distinto:** otra calidad, otro cliente |

## 8. Ventajas y riesgos (premortem)

| Narrativa de fracaso (junio 2027) | Probabilidad [H] | Mitigación |
|---|---|---|
| Nadie fiscalizó el lineamiento y las entidades no lo exigieron en los contratos | **Alta** | Antes de construir, revisar 10 bases de contratación recientes del Estado (SEACE/Pladicop) buscando el requisito de accesibilidad [PI] |
| Las entidades compraron la consultoría más barata | Media | Vender al proveedor, que factura más y decide más rápido |
| Una herramienta global sacó un informe "Perú" | Baja-media | Biblioteca de recorridos y revisión manual guiada, difíciles de copiar |

| Ventaja | Por qué |
|---|---|
| Única variante de P2 con motor regulatorio verificado | RSGTD 001-2025 [N1] |
| Datos públicos para el TSP | Se puede medir en portales del Estado sin pedir permisos de datos |
| Continúa P2 | Es automatización de pruebas, especializada |

## 9. Evidencia de mercado (fuentes nuevas)

| ID | Fuente | Qué respalda | Tipo | Lect. |
|---|---|---|---|---|
| N1 | gob.pe, "Lineamiento para el diseño y desarrollo de servicios o plataformas digitales accesibles" — https://www.gob.pe/96953-lineamiento-para-el-diseno-y-desarrollo-de-servicios-o-plataformas-digitales-accesibles | RSGTD 001-2025-PCM/SGTD; WCAG 2.2; alcance: administración pública y empresas FONAFE; CONADIS supervisa (según resumen) | [V] | B |
| N2 | PCM, "Normativas que regulan la accesibilidad digital en Perú" — https://www.gob.pe/institucion/pcm/colecciones/73043-normativas-que-regulan-la-accesibilidad-digital-en-peru | Compendio oficial de normas | [V] | B |
| N3 | gob.pe, "Evaluar la accesibilidad de tu sitio web" — https://www.gob.pe/1100-evaluar-la-accesibilidad-de-tu-sitio-web | WCAG 2.0 (RM 126-2009-PCM); el incumplimiento puede generar sanciones económicas. La página no se pudo abrir (HTTP 418) | [V] | B |
| N4 | KOM, accesibilidad web obligatoria — https://kom.pe/accesibilidad-web-obligatoria-peru-ley/ | Afirma que el art. 23 de la Ley 29973 alcanza a privados que informan por web. **[PI] verificar** | [C] | B |
| N5 | Accesstive, Ley 29973 — https://accesstive.com/compliance-hub/law-no-29973/ | Resumen comercial del marco | [C] | B |
| N6 | Xray, Document Generator — https://confluence.getxray.app/display/XRAY/Document+Generator+Template%3A+Test+Report ; comunidad Atlassian — https://community.atlassian.com/forums/Jira-questions/How-to-export-XRay-test-cases-with-the-screenshots/qaq-p/2029420 | Informes DOCX/PDF con evidencias mediante plantillas; las capturas no siempre se incrustan | [C]/[S] | B |
| N7 | BCRP, Circular 0003-2020 (estándar QR) — https://www.bcrp.gob.pe/docs/Transparencia/Normas-Legales/Circulares/2020/circular-0003-2020-bcrp.pdf ; Circular 0024-2022 (interoperabilidad) — https://www.bcrp.gob.pe/docs/Transparencia/Normas-Legales/Circulares/2022/circular-0024-2022-bcrp.pdf | Estándar EMV QR; obligación de interoperar (alternativa B) | [V] | B |
| N8 | Investigación previa — `10_fuentes_y_evidencias.md` S1–S8 | Antecedente UPC y herramientas usadas en Perú | — | — |

**Sin evidencia de disposición a pagar.** La norma crea una obligación; no prueba que alguien pague por cumplirla.

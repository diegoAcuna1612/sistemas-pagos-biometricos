# 12 — Iteración 2: innovación y diferenciación competitiva (P7)

**Fecha:** 05/11/2026. Segunda iteración. Los archivos 00–11 no se modificaron.
**Fuentes nuevas:** N1–N7 en §9. Etiquetas como en `10_fuentes_y_evidencias.md`.

## 1. Método

Skill `creative-ideation`:
- **Encuadre:** *Jobs to Be Done* (Christensen; fuerzas de Moesta).
- **Ruptura del marco:** provocaciones PO (de Bono).
- **Selección:** premortem (Klein).
- **Terreno de alto riesgo** ("DevSecOps con IA"): se descartaron las 5 primeras ideas.

## 2. Hallazgo regulatorio: el proveedor de la entidad financiera también es auditado

| Hecho | Fuente |
|---|---|
| La **Resolución SBS 504-2021** (19/02/2021, vigente desde el 01/07/2021) exige a las empresas supervisadas un sistema de gestión de seguridad de la información y ciberseguridad con **evaluación independiente periódica** | [N2, N3] |
| Según un resumen de CMS: la empresa supervisada debe **verificar anualmente** que su proveedor de servicios significativos cuenta con controles de seguridad, **acreditados con informes independientes o reportes de auditoría**, y fijar por contrato las responsabilidades del proveedor. Cita ISO/IEC 27001, 27017 y 27018 como referencia | [N1] (B; la página no se pudo abrir) |
| Modificada por las Resoluciones SBS 01515-2021 (servicios significativos de procesamiento de datos) y 02286-2024 | [N2] |
| Están en curso un proyecto de ley de ciberseguridad (PL 9906/2024-CR, con delegado de ciberseguridad y notificación de incidentes) y la Estrategia Nacional de Ciberseguridad (consulta en agosto de 2025) | [N5, N6] |

**Lectura [I]:** la iteración 1 buscó vender evidencias **a la entidad regulada**, un comprador difícil (A = 2). La norma traslada parte de la carga **a sus proveedores**: casas de software, fintechs que procesan datos, centros de datos. Ellos deben demostrar sus controles **cada año, ante cada cliente financiero**.

## 3. Qué ofrecen hoy los competidores

| Actor | Qué ofrece | Presencia | Fuente |
|---|---|---|---|
| **Hackmetrix** (Chile) | SaaS de cumplimiento con IA para startups y pymes (ISO 27001, PCI DSS, SOC 2); +100 clientes en 2023 (MercadoLibre, Buk, Talana); expansión a México y Colombia | **Perú no confirmado** | [N4] |
| Plataformas globales de cumplimiento continuo y "trust center" (Vanta, Drata, SafeBase) | Evidencias automáticas, portal de confianza, respuesta a cuestionarios | En inglés; sin mapeo SBS identificado [PI] | — |
| GitHub, GitLab, SonarQube, Trivy, OWASP ZAP | Los controles técnicos del pipeline | Disponibles | `10` [I] |
| Consultoras ISO 27001 locales | Implementación y auditoría | [PI] | — |

## 4. El trabajo del cliente (JTBD)

> **Cuando** el banco o la caja municipal me envía su cuestionario anual de seguridad de proveedores, con anexos y evidencias que pide por la norma SBS, **quiero** responderlo con evidencia real de mi pipeline y de mis controles en días y no en semanas, **para** renovar el contrato sin que mi equipo de desarrollo se detenga.

| Fuerza | En este caso [H] |
|---|---|
| Empuje | Cuestionarios distintos por cada cliente financiero; evidencias armadas a mano cada año |
| Atracción | Responder una vez y reutilizar; un portal que el cliente puede consultar |
| Ansiedad | "Si muestro evidencias automáticas y algo falla, lo ven todos"; confidencialidad |
| Hábito | Excel de respuestas, capturas, correos al equipo de TI |

## 5. Ideas rechazadas (las 5 obvias)

Plataforma CI/CD propia · escáner de vulnerabilidades con IA · tablero DORA · chatbot de seguridad · generador de SBOM. Todas las cubren herramientas libres o las plataformas de código.

## 6. Alternativas de diferenciación

### A. "El cuestionario del banco se responde desde el pipeline" — **aterrizada**

- **Provocación PO (inversión):** *po, el cliente audita al proveedor en tiempo real, sin pedirle nada.*
- **Mecanismo:**
  1. **Conectores** a GitLab/GitHub, al escáner de vulnerabilidades, al gestor de identidades y a la nube. Recolectan evidencias con fecha: revisiones de código, escaneos, aprobaciones de despliegue, accesos, copias de respaldo.
  2. **Catálogo de controles** mapeado a ISO 27001 y a los requisitos de la SBS 504-2021 para proveedores [N1, N2] [PI: verificar los artículos].
  3. **Respuesta asistida:** el cuestionario de cada banco (Excel o PDF) se lee y se responde **con citas a la evidencia**; la IA propone y una persona aprueba.
  4. **Portal de confianza** con acceso por cliente: estado de los controles y documentos vigentes.
- **Tipo:** comercial (cumplimiento regulatorio local) y tecnológica (evidencia continua desde DevSecOps).
- **Por qué pagaría:** menos horas por cuestionario; renovaciones más rápidas; una sola fuente de verdad para varios clientes financieros.
- **Difícil de copiar:** **media**. Hackmetrix u otra plataforma regional puede agregar el mapeo SBS. Lo que se acumula es la biblioteca de cuestionarios peruanos ya respondidos y la evidencia nativa del pipeline.
- **Modo de falla:** los bancos no aceptan el portal y siguen pidiendo su Excel (se mitiga respondiendo su Excel). Hackmetrix entra a Perú con el mapeo.

### B. "Pruebas de seguridad de aplicaciones con IA generativa"

- **Provocación PO (exageración):** *po, cada microservicio tiene un modelo de lenguaje adentro.*
- **Mecanismo:** pruebas automáticas de inyección de instrucciones y fuga de datos para asistentes y chatbots en el pipeline.
- **Tipo:** tecnológica.
- **Modo de falla:** herramientas libres y comerciales globales [PI]; demanda local no evidenciada. **Se descarta por ahora.**

### C. "TSP de implementación" (iteración 1)

Se mantiene como la vía académica si el autor trabaja en DevOps.

## 7. Diferenciador elegido: nueva variante V6

**V6 — Evidencia continua para proveedores de entidades supervisadas por la SBS:** cuestionarios, portal de confianza y evidencias desde el pipeline.

| Qué cambia | V3 (it. 1) | V6 (it. 2) |
|---|---|---|
| Cliente | Entidad regulada (difícil) | **Su proveedor** de software o servicios |
| Motor | Norma no verificada | **Verificación anual de proveedores (SBS 504-2021)** [N1] |
| Entregable | Reporte de auditoría | **Cuestionario respondido con citas + portal** |
| Competidor más cercano | Plataformas integradas | Hackmetrix (regional, sin SBS confirmada) |

## 8. Ventajas y riesgos (premortem)

| Narrativa de fracaso (junio 2027) | Probabilidad [H] | Mitigación |
|---|---|---|
| Los bancos siguieron enviando su Excel y no miraron el portal | Alta | El producto llena su Excel; el portal es extra |
| Hackmetrix entró a Perú con mapeo SBS y precio bajo | Media | Alianza o enfoque en casas de software con pipeline propio |
| Los proveedores pequeños no tenían controles que mostrar | Media | Paquete inicial de controles mínimos (servicio) |
| El resumen de CMS no reflejaba el texto vigente | Media | **Leer el reglamento consolidado antes de construir** |

## 9. Evidencia de mercado (fuentes nuevas)

| ID | Fuente | Qué respalda | Tipo | Lect. |
|---|---|---|---|---|
| N1 | CMS, resumen del reglamento SBS — https://cms.law/en/per/publication/sbs-emite-el-reglamento-para-la-gestion-de-la-seguridad-de-la-informacion-y-la-ciberseguridad-y-dictamina-otras-disposiciones | Verificación anual de controles del proveedor con informes independientes o auditorías; ISO 27001/27017/27018 (la página devolvió HTTP 410 al abrirla) | [S] | B |
| N2 | El Peruano, Res. SBS 504-2021 — https://busquedas.elperuano.pe/normaslegales/aprueban-el-reglamento-para-la-gestion-de-la-seguridad-de-la-resolucion-no-504-2021-1929393-1/ ; modificación 01515-2021 — https://busquedas.elperuano.pe/normaslegales/modifican-el-reglamento-para-la-gestion-de-la-seguridad-de-l-resolucion-no-01515-2021-1955432-1/ | Texto oficial y modificaciones (02286-2024 mencionada, no leída) | [V] | B |
| N3 | SBS, nota de prensa — https://www.sbs.gob.pe/noticia/detallenoticia/idnoticia/2545 | Vigencia desde el 01/07/2021; autenticación desde el 01/07/2022 | [V] | B |
| N4 | Descubre, Hackmetrix — https://www.descubre.vc/e/hackmetrix ; LatamFintech — https://www.latamfintech.co/articles/regtech-hackmetrix-levanta-us-1-5-m-en-busca-de-lanzar-nuevos-productos-para-pymes-en-latam | Competidor regional: ISO 27001, PCI DSS, SOC 2; +100 clientes (2023) | [S] | B |
| N5 | LP Derecho, PL 9906/2024-CR — https://lpderecho.pe/futura-ley-de-ciberseguridad-peruana-comentarios-al-proyecto-de-ley-9906-2024-cr/ | Proyecto de ley de ciberseguridad (no vigente) | [S] | B |
| N6 | TeleSemana (18/08/2025) — https://www.telesemana.com/blog/2025/08/18/peru-busca-definir-los-lineamientos-de-su-estrategia-nacional-de-ciberseguridad-con-una-consulta-publica/ | Estrategia Nacional de Ciberseguridad en consulta | [S] | B |
| N7 | IUS 360, Marco de Confianza Digital — https://ius360.com/la-nueva-sensacion-confianza-digital-para-interacciones-en-el-entorno-digital/ | DU 007-2020 y Centro Nacional de Seguridad Digital | [S] | B |

**Sin evidencia de disposición a pagar.** La norma crea una obligación anual para los proveedores, pero falta confirmar en el texto oficial cuánto de esa carga recae en ellos.

# 00 — Resumen ejecutivo: P3 Sistema de gestión documental y trámites automatizados

**Fecha:** 05/11/2026.
**Propuesta evaluada:** plataforma para que una organización reciba solicitudes, valide documentos, distribuya expedientes y permita consultar su estado con un código de seguimiento. Medición: tiempo promedio de atención, errores de registro y expedientes procesados.
**Estructura:** la de `../../oportunidades-saas-ia-cloud-peru/` (00 a 11), adaptada a una propuesta con **variantes**.
**Fuentes y etiquetas:** `10_fuentes_y_evidencias.md`.

## Veredicto

| Dimensión | Resultado |
|---|---|
| **Viabilidad como producto** | **Baja en el sector público, media en un nicho privado.** El Estado ya distribuye **gratis** su Sistema de Gestión Documental (SGD-PCM), Facilita Perú y un catálogo de software público de trámite documentario [S3–S5]. En el sector privado hay ECM consolidados (DocuWare, M-Files, SharePoint) [PI] |
| **Viabilidad como TSP** | **Media.** Tema muy frecuente en tesis peruanas (hay una con 52 → 6,6 minutos por trámite [S7]); la originalidad es baja salvo que se agregue validación inteligente de documentos |
| **Mejor variante** | **V4 — Recepción y validación de expedientes de clientes con IA** para empresas privadas que exigen requisitos documentales (inmobiliarias, financieras y aseguradoras pequeñas) (64/100) |
| **Decisión** | **No desarrollar la versión municipal.** Validar V4 si se elige P3 |

## Los hallazgos que más pesan

1. **El antecedente municipal enfrenta software público gratuito:** la PCM ofrece el SGD con soporte de su equipo técnico [S3] y publica sistemas de trámite de ONPE, OSITRAN, GORE Loreto y otros como software público [S4]. La Municipalidad de Lima ya tiene su Plataforma de Operaciones Virtuales desde 2020 [S2].
2. **Las entidades públicas compran con evaluación técnica formal** (informes técnicos previos de evaluación de software [S9]) y tiempos largos.
3. **El "seguimiento con código" ya no diferencia:** es una función estándar [I].
4. **El valor nuevo está en validar el contenido del expediente** (¿está completo? ¿el DNI coincide? ¿la boleta de pago es reciente?) antes de que una persona lo revise. Es el mismo patrón "documento → datos" que lideró la investigación de oportunidades (`../../oportunidades-saas-ia-cloud-peru/03` §3).

## Ranking de variantes

| # | ID | Variante | Puntaje |
|---|---|---|---:|
| 1 | V4 | Expedientes de clientes con validación IA (privado) | **64** |
| 2 | V2 | Trámites académicos en institutos y colegios privados | 62 |
| 3 | V3 | Colegios profesionales y gremios | 62 |
| — | V1 | Municipalidades y entidades públicas | 52 (**excluida**) |
| — | V5 | Libro de reclamaciones virtual | (**excluida**, oferta abundante [I]) |
| — | V6 | Gestión documental genérica (ECM) | (**excluida**) |

## Índice

`01` variantes · `02` competencia · `03` problema · `04` fichas · `05` finalistas · `06` arquitectura · `07` negocio · `08` validación · `09` matriz · `10` fuentes · `11` recomendación y TSP.

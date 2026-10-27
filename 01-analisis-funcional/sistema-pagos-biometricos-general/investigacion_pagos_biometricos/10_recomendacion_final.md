# 10 — Recomendación final y plan de acción

## Decisión

### TSP (prototipo académico): **GO CONDICIONADO**
- **Alcance:** alternativas B + D de `07`. Prototipo de autorización de pagos presenciales con **verificación de huella 1:1**, **dinero simulado** y **evaluación experimental**.
- **Condiciones:**
  1. Confirmación escrita de la UPC de que el proyecto es admisible como TSP (o cambio a tesis).
  2. Sin dinero real ni integración productiva.
  3. Protocolo de consentimiento y borrado aprobado.

### Producto comercial abierto en Perú ("solo huella" sobre tarjetas): **PIVOTAR**
Motivos:
- No hay una vía confirmada para cobrar solo con huella. La SBS exige chip + PIN en tarjeta presente, y el card-on-file depende de una aprobación comercial [F8, F27].
- La evidencia internacional de adopción es negativa (Pay By Touch 2008, Amazon One 2026) [F10, F11].
- El sustituto local (Yape/QR, contactless) ya está muy adoptado [F3, F4].

Pivotes con más sentido, a validar después del TSP:
1. **Sistema cerrado** (campus, comedores corporativos, gimnasios). N es pequeño, hay un operador único y el cobro es interno. Requiere consulta sobre dinero electrónico.
2. **Proveedor de servicios tecnológicos de identidad biométrica** para un emisor o adquirente con licencia (art. 3.4 de la Circular 0026-2026-BCRP) [F5]. Es el modelo PopID + J.P. Morgan [F19].
3. Biometría como **factor adicional**, no como reemplazo de la tarjeta o el celular.

## Puntuación

| # | Dimensión | Puntaje (1–5) | Justificación | Confianza |
|---|---|---|---|---|
| 1 | Viabilidad técnica del prototipo | **4** | Lectores baratos con SDK, motor abierto en C#, arquitectura conocida. Resta un punto por el agente local y por la limitación del PAD | Alta |
| 2 | Integración con pagos | **2** | Sandbox posible; cobro real con solo huella no confirmado y regulatoriamente difícil | Media |
| 3 | Viabilidad comercial en Perú | **2** | Sin demanda demostrada; sustitutos fuertes; fracasos internacionales. Hay un nicho posible en sistemas cerrados | Media-baja |
| 4 | Seguridad y protección de datos | **3 / 2** | Controlable en el prototipo (cifrado, sin imágenes, borrado); costosa y de alto impacto en producción | Media |
| 5 | Viabilidad legal para operar comercialmente | **2** | BCRP (aceptación de pagos desde 2027), SBS (tarjetas), Ley 29733 (datos sensibles); varias incertidumbres | Media |
| 6 | Viabilidad académica como TSP | **3** | Buen tema medible, pero el encaje en la modalidad TSP no está confirmado | **Baja** |
| 7 | Viabilidad económica | **4 / 2** | Prototipo: menos de unos US$ 300 en hardware más el trámite de S/ 2 122. Piloto: costos no estimables y hardware intensivo en capital | Media |
| 8 | Diferenciación competitiva | **2** | Sin competidor directo hallado en Perú, pero el concepto tiene más de 20 años y las redes de tarjetas apuestan por palma y rostro | Media |

**Barrera crítica:** la dimensión 2 (pagos) bloquea un lanzamiento comercial aunque el resto mejore. No afecta al TSP si se usan transacciones simuladas.

## Plan de acción priorizado

| Prioridad | Acción | Responsable | Plazo sugerido | Criterio de salida |
|---|---|---|---|---|
| 1 | Consultar a la coordinación de Ingeniería de Software de la UPC (preguntas de `07` §1) y obtener la versión vigente de SICA-REG-34 y de los lineamientos del TSP | Estudiantes | Semana 1 | Respuesta escrita; elegir TSP o tesis |
| 2 | Definir con el asesor el alcance B + D y congelarlo | Estudiantes + asesor | Semana 2 | Documento de alcance aprobado |
| 3 | Comprar un lector (SecuGen Hamster Pro 20 o ZK9500 local; BioMini Slim 2 si se quiere medir PAD) | Estudiantes | Semana 2 | Lector en mano |
| 4 | Prueba técnica: agente .NET + captura + SourceAFIS 1:1 + página web que lo invoque | Estudiantes | Semanas 3–4 | Demo de captura y comparación |
| 5 | Redactar el protocolo de consentimiento, datos y borrado (y el de ética si la UPC lo exige) | Estudiantes | Semanas 3–4 | Protocolo aprobado |
| 6 | Backend: usuarios, consentimiento, plantillas cifradas, órdenes, motor de transacciones simulado (idempotencia, auditoría) | Estudiantes | Semanas 5–9 | Flujo completo con dinero simulado |
| 7 | Terminal Next.js y portal de administración | Estudiantes | Semanas 8–11 | Experiencia de caja completa |
| 8 | (Opcional) Adaptador para el sandbox de Mercado Pago o Culqi | Estudiantes | Semanas 11–12 | Tokenización demostrada en sandbox |
| 9 | Experimentos (`08`) con voluntarios | Estudiantes | Semanas 12–15 | Dataset de puntajes y métricas |
| 10 | Análisis, informe y sustentación | Estudiantes | Semanas 15–18 | Informe final |
| Paralelo | 5–10 entrevistas exploratorias con comercios de entornos cerrados (`04` §6) | Estudiantes | Semanas 4–12 | Evidencia para la sección de trabajo futuro |

## Preguntas de validación prioritarias (antes de ir más allá del TSP)
1. **UPC:** ¿se admite el proyecto como TSP independiente y en pareja?
2. **Legal:** ¿cómo se califica la plataforma según la Circular 0026-2026-BCRP? ¿El saldo cerrado constituye dinero electrónico? ¿La SBS reconoce la biometría de un tercero como factor presencial?
3. **Proveedores:** ¿Mercado Pago Perú, Niubiz o Izipay permiten cobros con token iniciados por el comercio en un canal presencial?
4. **Mercado:** ¿hay al menos 3 operadores de entornos cerrados dispuestos a pilotear?

## Revisión de consistencia (hecha antes de concluir)
- **Anuncio vs. operación:** Ove, Sthaler, Liquid y el piloto de Mastercard en Uruguay se clasificaron como pilotos o anuncios, no como operación.
- **Supuestos de pagos no confirmados:** se marcaron como NC o A en `02`.
- **Contradicciones documentadas:**
  - BCRP 625 vs. 655 pagos por adulto.
  - Vigencia del DS 016-2024-JUS: 29, 30 o 31 de marzo.
  - Posible prórroga de la Res. SBS 2286-2024.
- **Costos no comparables:** se separaron precios publicados, estimaciones y costos no determinables (`06`).
- **Técnico vs. comercial:** el prototipo es viable (4) y el negocio débil (2). Por eso la decisión se separa en TSP = GO CONDICIONADO y producto = PIVOTAR.

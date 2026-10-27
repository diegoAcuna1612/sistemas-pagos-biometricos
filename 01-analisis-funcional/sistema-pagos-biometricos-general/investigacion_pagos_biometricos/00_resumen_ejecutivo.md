# 00 — Resumen ejecutivo

**Proyecto:** plataforma de pagos en comercios mediante huella dactilar (Perú)
**Fecha de la investigación:** 27/10/2026
**Fuentes:** ver `09_fuentes_y_evidencias.md` (las referencias `[Fxx]` remiten a ese registro)

---

## Recomendación

| Pregunta | Decisión |
|---|---|
| ¿Desarrollarlo como TSP? | **GO CONDICIONADO.** El alcance debe ser un *prototipo de autorización de pagos con huella y transacciones simuladas, con evaluación experimental* (alternativas B + D de `07_viabilidad_tsp_upc.md`). |
| ¿Lanzarlo como producto comercial abierto en Perú, con "solo huella" sobre tarjetas reales? | **PIVOTAR.** No se encontró una vía regulatoria ni comercial confirmada para cobrar tarjetas en caja solo con huella, y la evidencia de adopción internacional es desfavorable. |

**Condiciones para el GO del TSP (en este orden):**
1. Confirmar por escrito con la coordinación de Ingeniería de Software de la UPC que el proyecto puede presentarse como TSP. Esto incluye resolver si la modalidad exige acreditar experiencia profesional o vínculo con una organización, y si puede hacerse entre dos personas. Si no se confirma, evaluar la modalidad de **tesis**.
2. Usar **dinero simulado** (sin custodiar fondos reales) y, como máximo, un **sandbox** de un proveedor de pagos.
3. Usar solo voluntarios con **consentimiento escrito** (Ley 29733, datos sensibles), sin almacenar imágenes de huellas y con eliminación de las plantillas al cerrar el estudio.

---

## Respuestas directas

### ¿Existe competencia directa en Perú?
**No se encontró** ningún producto operativo en Perú que permita pagar en caja solo con la huella. Se revisaron bancos (BCP/Yape, BBVA, Interbank), adquirentes (Niubiz, Izipay), pasarelas (Culqi, Mercado Pago) y prensa especializada [F1, F36, F37, F41].

Lo que existe en Perú:
- Biometría para **acceder a apps** o **confirmar operaciones en el celular** (Yape, BBVA GloMo) [F37, F36].
- **Verificación de identidad contra RENIEC** en bancos y telcos [F35].
- Un anuncio de 2020 de Mastercard y Alignet sobre autenticación con huella en el celular para **comercio electrónico** [F1].

Esto **no prueba** que no exista competencia: es lo que muestran las fuentes públicas consultadas. Los límites de la búsqueda están en `01_mapa_de_competidores.md`.

### ¿Qué soluciones internacionales son comparables?
- **Directas (huella o dedo):**
  - Biopago BDV (Venezuela, operativo con fallas reportadas) [F16].
  - Aadhaar Pay / AePS (India, a escala nacional; usa número Aadhaar + huella) [F17].
  - Liquid Touch & Pay (Japón, pilotos turísticos 2016-2017) [F15].
  - Ove Touch & Go + Green Payments (EE. UU., anuncio 2022, estado desconocido) [F12].
  - Sthaler Fingopay (Reino Unido, venas del dedo, pilotos 2015-2017) [F14].
  - Pay By Touch (EE. UU., quebró en 2008) [F10].
- **Indirectas:**
  - Mastercard Biometric Checkout (rostro o palma; piloto con palma en Uruguay en 2024) [F18].
  - PopID + J.P. Morgan (rostro, más de 380 locales en EE. UU.) [F19].
  - Payface (rostro, Brasil) [F20].
  - Amazon One (palma; **discontinuado en 2026 por "adopción limitada"**) [F11].
  - Tarjetas con sensor de huella (BBVA México, Mastercard) [F23].
  - Passkeys de pago de Visa y Mastercard (biometría en el celular, en línea) [F22].

### ¿La idea está diferenciada?
**Poco.** El concepto existe desde 2002 (Pay By Touch). La diferenciación posible es local (no hay oferta en Perú) y de arquitectura (plataforma multiadquirente). El mercado peruano ya tiene alternativas de muy baja fricción: Yape/Plin y QR interoperable, y tarjetas sin contacto [F3, F4].

### ¿Es técnicamente posible?
**Sí, para un prototipo.**
- Hay lectores con SDK gratuito y soporte para Windows/.NET desde unos US$ 70–200 [F30, F31, F33].
- Existe un comparador de huellas de código abierto en C# (SourceAFIS, licencia Apache 2.0) [F34].
- El terminal web necesitará un **agente local** para acceder al lector.

### ¿Es viable procesar pagos con este enfoque?
**No confirmado para pagos reales.**
- La Resolución SBS 2286-2024 exige, para operaciones con **tarjeta presente**, chip (o su versión digital) más un segundo factor como el PIN [F8]. La huella sola no reemplaza la tarjeta en ese esquema.
- Un cobro con tarjeta tokenizada iniciado por el comercio sería un cargo **sin tarjeta presente**. Su uso depende de que el proveedor lo autorice (Mercado Pago lo exige expresamente para "Pagos Automáticos") [F27], y los emisores pueden exigir autenticación reforzada.
- Las alternativas viables son: dinero simulado (TSP), sandbox de pasarela y, a futuro, alianzas con un emisor o adquirente.

### Principales impedimentos
1. Falta una vía de pago autorizada para cobrar solo con huella (regulación SBS + reglas de proveedores) [F8, F27].
2. Adopción: Pay By Touch quebró en 2008 y Amazon One cerró en 2026 por baja adopción [F10, F11]. Además, la competencia de Yape/QR y del pago sin contacto es fuerte en Perú.
3. Riesgo y carga legal de custodiar biometría, un dato sensible e irrevocable (Ley 29733 y su reglamento DS 016-2024-JUS, vigente desde el 30/03/2025) [F7].
4. Precisión en búsquedas 1:N: con "solo dedo", la probabilidad de falsa coincidencia crece con el número de usuarios (ver `03`).

### ¿Tiene sentido como TSP?
**Sí, condicionado** a la confirmación de la UPC. Un prototipo con transacciones simuladas y una evaluación experimental (FAR/FRR, tiempos, usabilidad, resistencia a huellas falsas) da resultados medibles sin depender de bancos.

### ¿Qué hacer a continuación?
Ver el plan priorizado en `10_recomendacion_final.md`. En resumen:
1. Consultar a la UPC.
2. Comprar un lector con detección de dedo vivo y SDK .NET.
3. Hacer una prueba técnica de captura + comparación en 2 semanas.
4. Redactar el protocolo de consentimiento.
5. Construir el prototipo con dinero simulado.

---

## Puntuaciones (1 = muy desfavorable, 5 = muy favorable)

| Dimensión | Puntaje | Confianza |
|---|---|---|
| Viabilidad técnica del prototipo | 4 | Alta |
| Integración con pagos reales | 2 | Media |
| Viabilidad comercial en Perú | 2 | Media-baja |
| Seguridad y protección de datos | 3 (prototipo) / 2 (comercial) | Media |
| Viabilidad legal para operar comercialmente | 2 | Media |
| Viabilidad académica como TSP | 3 | Baja (falta confirmación de la UPC) |
| Viabilidad económica | 4 (prototipo) / 2 (piloto) | Media |
| Diferenciación competitiva | 2 | Media |

No se promedian. La barrera de pagos (puntaje 2) bloquea un lanzamiento comercial aunque el prototipo sea viable.

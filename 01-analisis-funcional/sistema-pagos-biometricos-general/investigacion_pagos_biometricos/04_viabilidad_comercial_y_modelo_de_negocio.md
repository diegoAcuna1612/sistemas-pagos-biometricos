# 04 — Viabilidad comercial y modelo de negocio

## 1. Contexto de mercado en Perú (datos verificables)

| Dato | Valor | Fuente | Nota |
|---|---|---|---|
| Pagos digitales por adulto (2025) | 655 (+45,8 % vs. 2024) | BCRP, Reporte del Sistema Nacional de Pagos, marzo 2026 [F3] | **Contradicción:** otra nota que cita al BCRP da 625 [F4]. Verificar en la tabla del reporte |
| Pagos digitales por adulto (2021 → 2025) | 90 → 625 | La Cámara (CCL), citando al BCRP [F4] | Atribuido a Yape, Plin y tarjetas |
| Pagos digitales diarios por adulto | ~1,7 | [F4] | |
| Participación de Yape (sept. 2023) | 88 % de las operaciones de billeteras | [F4] | Dato antiguo |
| QR interoperable | En vigor desde la fase 2 (sept. 2023) | [F4] | |
| Biometría en el sistema financiero | El sector financiero lidera; la regulación y el costo son las barreras | Forbes Perú, ene. 2026 [F36] | Cualitativo |
| Preferencia por la biometría (LatAm, en línea) | 85 % prefiere autenticación biométrica para pagos en línea | Encuesta de Mastercard [F42] | **Declaración comercial**; trata pagos en línea, no en caja |

**No hay datos públicos** sobre la demanda de pagos con huella en caja en Perú. **No se calcula TAM/SAM/SOM con cifras inventadas.**

**Método transparente propuesto para estimarlo después:**
- **TAM:** número de POS y QR activos de comercios en Perú (BCRP/adquirentes) × transacciones presenciales por año × tarifa por transacción hipotética.
- **SAM:** segmento con flujo recurrente de clientes identificables (comedores corporativos y universitarios, gimnasios, clubes, cadenas con programa de fidelización) × penetración de registro biométrico observada en entrevistas.
- **SOM:** comercios alcanzables en 3 años con el canal comercial disponible (p. ej. un adquirente aliado) × tasa de conversión de pilotos.

Cada factor debe salir de una fuente (BCRP, INEI, entrevistas) o declararse como supuesto.

## 2. ¿Qué problema resuelve y para quién?

| Actor | Problema hipotético | Evidencia de que existe | Alternativa actual |
|---|---|---|---|
| Consumidor | Pagar sin llevar celular, tarjeta ni efectivo | Ninguna local; Amazon One cerró por baja adopción [F11] | Celular con Yape (casi universal en zonas urbanas), tarjeta sin contacto |
| Comercio | Filas más rápidas | PopID declara hasta 90 s menos por pedido (dato del proveedor) [F19]; Piggly Wiggly declaró un tercio menos de tiempo (2000s) [F13] | El contactless y el QR ya son rápidos |
| Comercio | Menos fraude y contracargos | Declaración de Green Payments [F12] | Chip + PIN, 3DS |
| Entornos cerrados (universidades, comedores, gimnasios) | Identificar y cobrar a miembros recurrentes sin credenciales | Casos Brunel/CBS (Sthaler), Huis Ten Bosch (Liquid) [F14, F15] | Carnés, credenciales, QR |

**Inferencia:** la ventaja frente a Yape/QR y contactless es **marginal** en el retail general. El mejor encaje está en **entornos cerrados con usuarios recurrentes** (campus, comedores corporativos, clubes, gimnasios), donde:
- el registro se hace una vez en un lugar controlado;
- N es pequeño, lo que reduce el problema 1:N (ver `03`);
- el operador ya tiene una relación de cobro con el usuario (planilla, cuota, cuenta interna).

## 3. Barreras de adopción
1. **Confianza:** entregar una huella a una empresa nueva. La biometría es irrevocable.
2. **Inclusión:** usuarios con huellas deterioradas. En Perú existe un trámite especial en RENIEC [F35].
3. **Hardware en el comercio:** ¿quién lo paga? Pay By Touch quebró financiando el despliegue [F10].
4. **Doble sistema:** el comercio debe mantener los otros medios de pago para los clientes no registrados.
5. **Fallo del lector:** se necesita un método alternativo inmediato (QR o tarjeta).
6. **Efecto red:** el cliente solo se registra si muchos comercios aceptan el método, y los comercios solo lo instalan si hay muchos clientes registrados.

## 4. Socios estratégicos necesarios para operar con dinero real
- **Adquirente o pasarela** (Niubiz, Izipay, Mercado Pago, Culqi), o **emisor** (banco o EEDE).
- Fabricante o distribuidor de lectores.
- Asesoría legal en pagos y datos personales.
- Primer cliente ancla (universidad o corporativo) para el piloto.

## 5. Modelos de ingresos (evaluación cualitativa)

| Modelo | A favor | En contra |
|---|---|---|
| Suscripción por terminal | Ingreso predecible | El comercio ya paga MDR al adquirente |
| Comisión por transacción | Alineado al uso | Compite con las comisiones del adquirente; requiere volumen |
| Licencia de software o *white label* a bancos o adquirentes | No custodia fondos y reduce la carga regulatoria (ver `05`) | Ciclo de venta largo; el banco puede desarrollarlo internamente |
| API como servicio (identidad biométrica) | Escalable; modelo PopID [F19] | Requiere la confianza de un socio grande |
| **Sistema cerrado (campus o corporativo)** | Problema concreto, N pequeño, registro controlado | Mercado pequeño; posible regulación de dinero electrónico si se maneja saldo (ver `05`) |
| Híbrido: licencia a socio financiero + piloto cerrado | Reduce el riesgo | Complejidad |

**Recomendación (I):** si se continúa después del TSP, pivotar a **"proveedor de servicios tecnológicos de identidad biométrica"** para un aceptador o emisor, o a un **sistema cerrado**. No ser una plataforma de pagos abierta.

## 6. Plan de validación comercial (no inducir respuestas)

**Consumidores** (n ≥ 30, segmentos variados):
- "Cuéntame la última vez que pagaste en una tienda. ¿Qué usaste y por qué?"
- "¿Alguna vez no pudiste pagar algo? ¿Qué pasó?"
- "¿Qué datos personales te incomoda compartir con un comercio? ¿Por qué?"
- Después de mostrar el prototipo: "¿Qué tendría que pasar para que lo uses? ¿Y para que no lo uses nunca?"

**Comercios** (n ≥ 15: retail, comedores, gimnasios, campus):
- "¿Cuánto tarda hoy un cobro en hora punta? ¿Lo han medido?"
- "¿Qué medios aceptan y cuánto les cuestan?"
- "¿Qué problemas tienen con contracargos o fraude?"
- "¿Quién decidiría instalar un nuevo dispositivo de pago y con qué criterio?"

**Adquirentes y pasarelas** (2–4 entrevistas):
- "¿Bajo qué condiciones permiten cargos con token iniciados por el comercio en un canal presencial?"
- "¿Cómo tratarían la responsabilidad ante una operación no reconocida autorizada con biometría de un tercero?"

**Criterio para continuar:**
- Al menos 3 comercios declaran un problema concreto y medible que la solución resuelve y que aceptarían pilotear.
- Al menos 1 proveedor financiero acepta evaluar una integración.

# Resumen de la conversación con IA: Sistema de pagos biométricos

## Contexto

- Propuesta para un **Trabajo de Suficiencia Profesional (TSP)** de Ingeniería de Software en la UPC.
- Debe ser independiente del trabajo actual del autor (por confidencialidad).
- Idea: un sistema donde una persona pague en un establecimiento usando solo su biometría, sin tarjeta, efectivo ni celular.

## Evolución de la idea

1. **Planteamiento inicial:** pago mediante reconocimiento facial (cámara web, OpenCV + SFace/YuNet).
2. **Corrección del usuario:** la biometría sería de **los dedos**, no del rostro.
3. **Tecnologías evaluadas:**
   - **Huella dactilar:** más accesible para un prototipo.
   - **Venas del dedo:** usa luz infrarroja, más especializada y requiere lector dedicado.
4. **Decisión pendiente:** elegir entre huella y venas del dedo (comparar seguridad, costo y desarrollo).

## Viabilidad

| Aspecto | Nivel |
|---|---|
| Prototipo técnico | Alta |
| Académica | Alta |
| Integración con pagos reales | Media (depende del proveedor) |
| Lanzamiento comercial | Compleja (seguridad y cumplimiento) |

## Flujo de uso (ejemplo: cafetería)

1. El cajero registra el consumo (ej. S/ 20).
2. El cliente coloca el dedo en el lector biométrico.
3. El sistema identifica su cuenta con la biometría registrada.
4. El cliente confirma el monto.
5. Se solicita el cobro al medio de pago vinculado.
6. Se aprueba la transacción y se entrega el comprobante.

Requisito previo: registro único con consentimiento, biometría y medio de pago.

## Arquitectura propuesta

- **Terminal comercial:** Next.js + Tailwind CSS.
- **API central:** C# / ASP.NET Core (.NET 10) — identidades, autorización, reglas de seguridad y transacciones.
- **Base de datos:** SQL Server + EF Core, con plantillas biométricas protegidas.
- **Lector biométrico físico + SDK** compatible (el lector del celular no sirve: el SO no expone las huellas).
- **Pasarela de pagos:** sandbox o API autorizada, webhooks y tokenización.
- **Opcional:** app móvil (React Native + Expo) para registrar medios de pago y consultar movimientos.
- *(Versión facial original: servicio Python + FastAPI para reconocimiento y detección de vida.)*

Regla clave: el terminal no puede ordenar cobros sin autorización del backend.

## Desafío central: cobrar el dinero

- **Identificar** a la persona no equivale a **autorizar** un pago.
- Opción real: *Card on File* con tarjeta tokenizada (ej. Mercado Pago), que requiere habilitación comercial específica.
- Algunas operaciones pueden exigir 3DS por decisión del emisor, impidiendo pagar solo con biometría.
- No se desarrollaría un procesador bancario propio; se delega a un proveedor autorizado.

| Versión | Método de pago |
|---|---|
| MVP académico | Saldo de prueba simulado |
| Prototipo integrado | Pasarela en sandbox |
| Piloto comercial | Tarjeta tokenizada con proveedor habilitado |

## Problemas técnicos a resolver

- **Identificación:** verificación 1:1 vs. búsqueda 1:N.
- **Detección de vida / ataques de presentación** (huellas falsas, fotos, etc.).
- **Autorización del cliente:** mostrar el monto y exigir confirmación; controles adicionales para montos altos (NIST SP 800-63B-4).
- **Protección de datos:** no guardar contraseñas en texto plano ni números completos de tarjeta; cifrar y eliminar plantillas biométricas cuando corresponda.

## Marco legal (Perú)

- **Ley N.º 29733:** los datos biométricos son sensibles; el nuevo reglamento rige desde el 31/03/2025. Requiere consentimiento válido, finalidad específica, mecanismos de eliminación y seguridad.
- **BCRP:** nueva regulación de servicios de aceptación de pagos (aprobada oct. 2026, vigencia prevista 01/01/2027); revisar su alcance antes de una implementación comercial.

## Plan de desarrollo por etapas

1. Prueba del reconocimiento/lectura biométrica (voluntarios con consentimiento).
2. Sistema de usuarios (autenticación, consentimiento, almacenamiento protegido, revocación) en .NET.
3. Terminal de pagos (productos, monto, captura biométrica, confirmación).
4. Motor de transacciones con dinero simulado (límites, auditoría, estados, anti-duplicados, historial).
5. Integración financiera en sandbox (cobros reales solo con autorización).
6. Evaluación y sustentación (pruebas controladas).

Estimado: **12 a 16 semanas** para un prototipo completo con pagos simulados (sin certificación de seguridad ni integración bancaria comercial).

## Enfoque como TSP

- **Título preliminar:** *Diseño e implementación de un prototipo de sistema de autorización de pagos mediante reconocimiento biométrico para establecimientos comerciales.*
- **Indicadores a medir (con experimentos reales):**
  - Tiempo de reconocimiento
  - Tasa de falsos positivos
  - Tasa de falsos rechazos
  - Detección de ataques
  - Tiempo total de compra
  - Usabilidad
- Definir muestra de participantes, condiciones de prueba, criterios de aceptación y tratamiento de datos.
- **Verificar con los lineamientos vigentes de la UPC** si el proyecto puede sustentarse como desarrollo independiente o debe vincularse a una experiencia laboral.

## Decisiones tomadas

- **Idea principal:** pagar en un establecimiento únicamente con biometría, sin tarjeta, efectivo ni celular.
- **Público objetivo:** plataforma general de pagos biométricos que cualquier comercio pueda integrar, no solo pequeños negocios.
- **Tecnología biométrica:** huella dactilar, por ser la opción más accesible para el prototipo.

## Decisiones pendientes

- **Hardware:** seleccionar un lector de huella compatible con un SDK que pueda integrarse con la aplicación.
- **Proveedor de pagos:** determinar cuál proveedor y qué alcance de integración se utilizarán.

## Próximos pasos sugeridos por la IA

- Plan de siguientes pasos para el prototipo con huella dactilar.
- Pros y contras: huella vs. venas del dedo.
- Definir flujo de usuario y ajustes de arquitectura para el sistema basado en dedos.

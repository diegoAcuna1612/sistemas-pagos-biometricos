# 03 — Validación del problema

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

**No se hizo ninguna entrevista.** Este documento reúne la evidencia indirecta disponible y diseña cómo confirmar o refutar cada hipótesis. Ninguna opinión de clientes que aparezca aquí es real.

## 1. Qué indica la evidencia indirecta

| Señal | Qué sugiere | Fuerza |
|---|---|---|
| Un proveedor regional vende "Control de Comedor" en Perú y muestra clientes conocidos [C1] | Hay empresas que **pagan** por controlar raciones; el problema existe al menos en empresas grandes | **Media-alta** para la existencia del problema (DC: los logos no prueban el uso del módulo de comedor) |
| El proveedor promete "no podrá almorzar 2 veces" y "evitar mermas" [C1] | Los dolores que vende son la repetición de raciones y la merma | Media (es su argumento de venta, no un dato) |
| Universidades de EE. UU. usan biometría en planes ilimitados [C6] | El préstamo de credenciales es caro cuando el consumo es ilimitado | Media (otro contexto) |
| Universidades peruanas usan código de barras, RFID o desarrollos propios [C10] | Controlan quién come, pero con soluciones baratas | Media |
| Colegios del Reino Unido usan biometría con alternativa obligatoria [C7] | Funciona a escala cuando es opcional | Media |
| Los concesionarios grandes atienden decenas de miles de raciones al día [C9] | Volumen alto, con facturación a la minera | Baja como prueba del problema (volumen ≠ dolor) |

**Conclusión preliminar (I):**
- El problema de **atribuir raciones a la persona correcta** existe y tiene mercado.
- **No hay evidencia de que la huella sea la solución que el cliente prefiere** frente a una tarjeta, el rostro o un QR.
- **No hay evidencia** del costo concreto del problema en organizaciones peruanas.

## 2. Problemas investigados

| # | Problema (HP) | Evidencia de existencia | Segmentos más probables | Impacto operativo y económico | Soluciones actuales | Limitaciones de esas soluciones | ¿Se puede entrevistar? | Preguntas para confirmar o refutar |
|---|---|---|---|---|---|---|---|---|
| P1 | Préstamo de credenciales (fotocheck, carné, ticket) | Indirecta: GeoVictoria vende la prevención [C1]; Maryland justificó la biometría en planes ilimitados [C6] | Universidades con plan o beca; empresas con ración gratuita | Raciones pagadas por la organización que consume otra persona (I) | Fotocheck, ticket, RFID | Se prestan | Sí: administradores de comedor y bienestar | "¿Cuándo fue la última vez que detectaron a alguien comiendo con el carné de otro? ¿Cómo se enteraron? ¿Qué hicieron?" |
| P2 | Pérdida u olvido de tickets o credenciales | Sin evidencia | Universidades; plantas | Colas; reemisión de carnés (I) | Reimpresión; lista manual | Costo administrativo | Sí | "¿Qué pasa hoy cuando alguien llega sin su carné? ¿Cuántas veces por semana ocurre?" |
| P3 | Colas en hora punta | Sin evidencia local; Maryland eligió un lector sin contacto por velocidad [C6] | Comedores grandes con horario fijo | Tiempo productivo perdido (I) | Turnos escalonados (GeoVictoria asigna horarios por grupo [C1]) | — | Sí: medirlo (E3) | "¿Cuánto dura la cola un día normal? ¿Alguien se queja?" + cronometraje |
| P4 | Errores al identificar usuarios | Sin evidencia | Todos | Consumos mal atribuidos | Verificación visual del cajero | Depende del cajero | Sí | "¿Cómo sabe el cajero que la persona es quien dice ser?" |
| P5 | Registro manual de consumos | UNAP usa código de barras (no es manual) [C10]; el resto, sin evidencia | Concesionarios pequeños y medianos (HP) | Horas de digitación; errores (I) | Papel, Excel | Lento, propenso a errores | Sí | "Muéstreme cómo registran hoy un consumo, de principio a fin." |
| P6 | Falta de trazabilidad | Sin evidencia | Concesionarios que facturan a una empresa | Disputas en la facturación (I) | Reportes manuales | No auditables | Sí | "¿Han tenido alguna disputa con un cliente por la cantidad de raciones facturadas? ¿Cómo se resolvió?" |
| P7 | Errores de conciliación (concesionario ↔ empresa ↔ planilla) | Sin evidencia | **Concesionarios medianos**; RR. HH. | Horas de trabajo; cobros no recuperados (I) | Excel | Manual | Sí | "¿Quién arma el reporte mensual? ¿Cuántas horas le toma? ¿Cuántas correcciones hay que hacer después?" |
| P8 | Control de subsidios o límites | GeoVictoria ofrece límites configurables [C1] | Empresas con ración subsidiada; universidades con becas | Sobrecosto del subsidio (I) | Tickets por persona | No limitan en tiempo real | Sí | "¿Cómo definen quién tiene derecho a qué? ¿Cómo controlan que no se exceda?" |
| P9 | Falta de información sobre consumos | GeoVictoria vende reportes [C1] | Empresas; concesionarios | Mala planificación; desperdicio (I) | Estimación empírica | Desperdicio de comida (I) | Sí | "¿Cómo deciden cuántas raciones preparar? ¿Cuánto se desperdicia?" |
| P10 | Integraciones deficientes (comedor, POS y sistemas administrativos) | Sin evidencia | Concesionarios; empresas con ERP | Doble digitación (I) | Exportaciones manuales | — | Sí: entrevista a TI | "¿Qué sistemas reciben los datos del comedor? ¿Cómo llegan?" |

## 3. Guía de entrevistas

### 3.1 Reglas para todas las entrevistas

- **No presentar la solución** en la primera ronda. Preguntar por hechos pasados y concretos, no por opiniones sobre el futuro.
- Evitar preguntas como "¿Le gustaría…?" o "¿Usaría…?".
- Pedir números aproximados y ejemplos recientes ("la última vez que…").
- Pedir ver el proceso o un documento real (un reporte, la planilla anonimizada), con permiso.
- Cerrar siempre con: "¿Con quién más debería hablar?".
- Registrar textualmente y separar **hechos** de **opiniones** al analizar.
- **Antes de contactar a cualquier organización hace falta la autorización de los estudiantes y, si la UPC lo exige, de la universidad. Esta investigación no contactó a nadie.**

### 3.2 Concesionario (dueño o gerente de operaciones)

1. ¿A cuántas empresas o sedes atienden? ¿Cuántas raciones por día en una sede típica?
2. Cuénteme cómo se registra hoy quién comió y cuánto, desde que la persona entra hasta que la empresa paga.
3. ¿Cómo factura a cada empresa? ¿Quién prepara el reporte y cuánto tiempo le toma?
4. ¿Ha tenido diferencias con una empresa cliente sobre cuántas raciones se entregaron? Cuénteme la última.
5. ¿Alguna empresa le exige un sistema o un formato determinado de control?
6. ¿Qué sistemas usan (POS, Excel, software)? ¿Cuánto pagan por ellos?
7. ¿Qué intentaron antes para mejorar esto? ¿Por qué no funcionó?
8. Si mañana desapareciera este problema, ¿qué ganaría? ¿Cuánto vale eso al mes?
9. ¿Quién decidiría una compra de software así? ¿Cómo suelen comprar?

### 3.3 Administrador de comedor (propio o del concesionario)

1. Describa la hora punta de ayer: ¿cuánta gente, cuánto tiempo, qué problemas hubo?
2. ¿Qué pasa cuando alguien llega sin credencial? ¿Y cuando no está en la lista?
3. ¿Ha detectado a alguien comiendo con la credencial de otro? ¿Cuántas veces en el último mes?
4. ¿Cómo se corrige un registro equivocado?
5. ¿Qué parte del proceso le quita más tiempo?

### 3.4 Recursos humanos

1. ¿Cómo está definido el beneficio de alimentación: gratuito, subsidiado o descontado? ¿Es la modalidad directa o la indirecta de la Ley 28051?
2. ¿Cómo llega la información del comedor a la planilla? ¿Cuánto tiempo toma y cuántos errores hay?
3. ¿Usan biometría para la asistencia? ¿Hubo objeciones de los trabajadores o del sindicato?
4. ¿Cómo manejan el consentimiento de esos datos? ¿Tienen inscrito el banco de datos?
5. ¿Qué tendría que demostrar un nuevo sistema para que lo aprobaran?

### 3.5 Operaciones

1. ¿Cuánto cuesta una ración para la empresa? ¿Cuántas se sirven al mes?
2. ¿Se pierde dinero por raciones no autorizadas o duplicadas? ¿Cómo lo saben?
3. ¿Qué ocurre si el sistema o el internet fallan en hora punta?

### 3.6 Tecnologías de la información

1. ¿Qué sistemas de asistencia, nómina o ERP usan? ¿Admiten integración (API, archivos)?
2. ¿Qué exigen a un proveedor SaaS en seguridad y datos personales?
3. ¿Dónde pueden estar los datos (nube, región, en sitio)?
4. ¿Cuál es la conectividad en cada comedor?

### 3.7 Usuario final (trabajador o estudiante)

1. Cuénteme cómo fue la última vez que comió en el comedor: desde que llegó hasta que salió.
2. ¿Ha tenido algún problema para que lo atiendan (credencial, lista, cola)?
3. ¿Usa huella en su trabajo o en el banco? ¿Le ha fallado alguna vez?
4. ¿Le han pedido sus datos biométricos? ¿Cómo se sintió? ¿Le dieron una alternativa?
5. ¿Cómo revisaría hoy lo que consumió o le descontaron?

### 3.8 Disposición a pagar y criterios de cambio

Para compradores, al final y sin mostrar precios propios:
1. ¿Cuánto les cuesta hoy el problema? (horas × costo; raciones mal atribuidas × costo de la ración)
2. ¿Tienen presupuesto asignado para esto? ¿De qué partida saldría?
3. ¿Qué pagan hoy por soluciones parecidas (asistencia, POS)?
4. ¿Qué tendría que demostrar un sistema nuevo para justificar el cambio? (ahorro, tiempo, cumplimiento legal)
5. **Compromiso real:** "¿Aceptaría un piloto de 8 semanas con un pago simbólico y métricas acordadas?" Una carta de intención cuenta como señal; un "me interesa" no.

## 4. Criterios de decisión del descubrimiento

Son criterios de diseño **por validar**. Están alineados con la fase 0 de `ref-11`.

| Resultado | Interpretación | Acción |
|---|---|---|
| ≥ 3 organizaciones describen P1, P6, P7 u P8 **con un costo concreto** y ≥ 2 aceptan un piloto pagado o con carta de intención | Problema validado | Continuar (`11`) |
| Los problemas existen pero ya están resueltos con GeoVictoria, una tarjeta o un sistema propio, y sin intención de cambiar | Mercado ocupado | Cambiar de segmento o propuesta; un intento más |
| Los problemas existen pero el costo es pequeño o nadie es dueño del presupuesto | Problema sin comprador | Descartar la comercialización |
| Los compradores rechazan la biometría y prefieren tarjeta o QR | La huella no aporta valor | Producto sin huella o descarte |

**¿Por qué 3 y 2?** Son umbrales mínimos de un descubrimiento cualitativo: menos de 3 casos no distingue un patrón de un caso aislado. **No son estadísticamente representativos**; solo sirven para decidir si invertir más.

## 5. ¿La huella aporta valor frente a algo más simple?

Esta es la pregunta central y se responde con el experimento E4 de `09`.

| Pregunta | Evidencia a obtener |
|---|---|
| ¿El préstamo de credenciales (P1) cuesta más que el costo y el riesgo de la biometría? | Incidentes al mes × costo de la ración (entrevistas) frente al costo de lectores, cumplimiento y soporte (`07`) |
| ¿La huella es más rápida que una tarjeta? | Medición del tiempo por persona (E4) |
| ¿Qué porcentaje no puede usar la huella (FTE/FTA)? | Medición (E6); en manuales podría ser alto [C14] |
| ¿Qué porcentaje acepta registrarse? | Prueba de aceptación (E7) |

**Regla de decisión (I):** si la huella no reduce un costo medible frente a la tarjeta o el QR, debe quedar como **opción**, no como base del producto. Si nadie la valora, se elimina.

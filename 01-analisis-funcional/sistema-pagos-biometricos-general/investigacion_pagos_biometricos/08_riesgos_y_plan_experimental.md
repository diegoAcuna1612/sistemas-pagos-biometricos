# 08 — Registro de riesgos y plan experimental

## 1. Registro de riesgos

Escalas: Probabilidad / Impacto = B (baja), M (media), A (alta).

| # | Riesgo | Clase | Prob. | Impacto | Evidencia | Mitigación | Riesgo residual |
|---|---|---|---|---|---|---|---|
| R1 | No existe un proveedor de pagos que permita cobrar solo con huella | Financiero / legal | A | A (comercial) / B (TSP) | Res. SBS 2286-2024: chip + PIN en tarjeta presente [F8]; card-on-file de Mercado Pago requiere aprobación [F27] | TSP con dinero simulado; a futuro, alianza con un emisor o adquirente | A para el producto; B para el TSP |
| R2 | Rechazo de bancos o adquirentes | Comercial | M-A | A | Los modelos exitosos son propiedad de un banco o del Estado [F16, F17] | Posicionarse como proveedor tecnológico, no como aceptador | M |
| R3 | Dependencia de hardware o SDK propietario | Técnico | M | M | SDK cerrados [F30–F33] | Capa de abstracción `ICaptureDevice`; formato ISO 19794-2; SourceAFIS | B |
| R4 | Costo de lectores en escala | Financiero | M | M | Pay By Touch [F10] | Modelo donde paga el socio; sistema cerrado | M |
| R5 | Precisión insuficiente en 1:N | Técnico | A (si 1:N) | A | Cálculo N·f en `03` | Verificación 1:1 + PIN o alias; 2 dedos | B-M |
| R6 | Suplantación con huellas falsas | Técnico / seguridad | M | A | Requiere PAD [F9, F32] | Lector con LFD; pruebas de ataque; límite de intentos | M |
| R7 | Filtración de plantillas biométricas | Seguridad / legal | B-M | **Muy A** (irrevocable) | Ley 29733; caso Pay By Touch [F7, F10] | Cifrado + KMS; plantillas cancelables; BD separada; sin imágenes | M |
| R8 | Desconfianza del consumidor | Comercial | A | A | Amazon One cerró por baja adopción [F11] | Opt-in, transparencia, revocación simple | A |
| R9 | Comercios no quieren otro dispositivo | Comercial / operativo | A | A | Yape/QR ya están adoptados [F3, F4] | Apuntar a entornos cerrados | M-A |
| R10 | Competencia de los medios existentes | Comercial | A | A | [F3, F4, F22] | Nicho; diferenciación por inclusión o uso sin celular | A |
| R11 | Complejidad regulatoria (BCRP / SBS / datos) | Legal | A | A | Circ. 0026-2026 [F5], DS 016-2024 [F7] | Consulta legal y al BCRP (Disp. Final Sexta) | M |
| R12 | Adopción masiva difícil (efecto red) | Comercial | A | A | [F10, F11, F12, F14] | Sistema cerrado (N pequeño, un solo operador) | M-A |
| R13 | Dependencia de acuerdos comerciales | Comercial | A | A | [F27] | No hacer depender el TSP de ellos | B (TSP) |
| R14 | Sobrecarga de alcance del TSP | Académico | M-A | A | — | Alcance B + D; congelar el alcance tras la semana 2 | B-M |
| R15 | La UPC no acepta el proyecto como TSP | Académico | M (desconocida) | **A** | Otras universidades exigen experiencia [F40] | Consultar **antes** de empezar; plan B: tesis | M |
| R16 | Huellas deterioradas o de mala calidad (FTE/FTA) | Técnico / inclusión | M | M | Trámite especial en RENIEC [F35] | 2 dedos; método alternativo; medir FTE | B-M |

**Tres riesgos que invalidarían la idea aunque el prototipo funcione:**
1. **R1:** no hay vía regulatoria ni de proveedor para cobrar solo con huella en Perú.
2. **R8/R12:** demanda insuficiente; Amazon One y Pay By Touch muestran que el problema no se resuelve con tecnología.
3. **R7/R11:** el costo y la responsabilidad de custodiar biometría irrevocable superan el beneficio para un actor pequeño.

## 2. Plan experimental

**Referencia metodológica:**
- ISO/IEC 19795-1 para medir el desempeño biométrico.
- ISO/IEC 30107-3 para la detección de ataques de presentación.

Ambas se citan como marco y **no se afirma cumplimiento formal**.

### 2.1 Diseño
- **Participantes:**
  - 30–60 voluntarios mayores de edad, con consentimiento escrito.
  - Diversidad de edad y ocupación (incluir personas con trabajo manual si es posible).
- **Enrolamiento:** 2 dedos (índices) × 3 capturas.
- **Sesiones:** al menos 2, separadas ≥ 1 semana, para captar variación temporal.
- **Condiciones:** dedo normal, húmedo y tras manipular objetos (polvo leve). Iluminación de oficina.
- **Datos guardados:** plantillas y puntajes; **no** imágenes (o imágenes temporales eliminadas al terminar, si el protocolo ético lo aprueba).
- **Ataques:** huellas falsas de silicona o gelatina hechas **solo** a partir de voluntarios que consientan expresamente, con moldes destruidos al terminar.

### 2.2 Indicadores
| Indicador | Qué mide | Cálculo | Instrumento | Cantidad de pruebas | Criterio preliminar (objetivo del proyecto, no normativo) | Limitación |
|---|---|---|---|---|---|---|
| Tiempo de captura | Desde que se apoya el dedo hasta la plantilla lista | Mediana y p95 (ms) | Logs del agente | ≥ 300 capturas | Mediana ≤ 2 s | Depende del hardware |
| Tiempo de verificación 1:1 | Duración de la comparación | Mediana y p95 | Logs del servicio | ≥ 300 | p95 ≤ 500 ms | Sin carga concurrente |
| FNMR / FRR | Rechazo de usuarios genuinos | Rechazos genuinos / intentos genuinos | Puntajes | ≥ 30 sujetos × 2 dedos × 5 intentos (≥ 300) | ≤ 5 % por intento; ≤ 1 % con 3 intentos | IC de Wilson al 95 % |
| FMR / FAR | Aceptación de impostores | Aceptaciones impostoras / intentos impostores | Matriz de comparaciones cruzadas | Todas las combinaciones entre dedos distintos (decenas de miles) | Reportar la curva DET y el umbral elegido | Las comparaciones no son independientes. **Con 0 errores en n intentos, el límite superior al 95 % es ≈ 3/n (regla del 3)**, y el número efectivo de comparaciones independientes es mucho menor que el total |
| FTA / FTE | Fallos de captura o enrolamiento | Fallos / intentos | Logs | Todos | FTE ≤ 5 % | Muestra pequeña |
| APCER / BPCER (PAD) | Huellas falsas aceptadas / dedos reales rechazados por PAD | Según ISO 30107-3 | Lector con LFD | ≥ 3 materiales × 10 especies × 5 intentos | Reportar; objetivo APCER ≤ 10 % | **No es una certificación**; ataques artesanales |
| Tiempo total de compra | De la orden creada al comprobante | Mediana y p95 | Cronómetro + logs | ≥ 100 compras simuladas | ≤ al tiempo medido con QR simulado | Escenario de laboratorio |
| Transacciones completadas | Éxito del flujo | Completadas / iniciadas | Logs | ≥ 100 | ≥ 95 % | — |
| Errores de integración | Fallos técnicos | Errores / llamadas | Logs | Pruebas de carga y caos (timeouts simulados) | 0 cobros duplicados | Proveedor simulado |
| Disponibilidad | Uptime de la demo | % | Monitoreo | Periodo de pruebas | ≥ 99 % durante las pruebas | Corto plazo |
| Usabilidad | Usabilidad percibida | Cuestionario SUS (0–100) | Cuestionario | Todos los voluntarios | SUS ≥ 68 (promedio de referencia de la escala) | Sesgo de novedad |
| Intención de adopción | Disposición a usarlo | Escala Likert (modelo tipo TAM) | Cuestionario + entrevistas | Voluntarios + ≥ 5 comercios | Reportar; sin meta | Declarado ≠ real |
| 1:1 vs. 1:N | Efecto del tamaño de la galería | Tasa de falsa identificación (FPIR) vs. N | Simulación sobre los datos | N = 10, 30, 60 | Reportar la tendencia | N máximo pequeño; extrapolar con N·f |

### 2.3 Tamaño de muestra
- **Regla del 3:** con 0 errores en n intentos independientes, el error real es < 3/n con 95 % de confianza.
- **Regla del 30 (Doddington):** para estimar un error p con ±30 % a 90 % de confianza se necesitan ~30 errores observados.

Con 30–60 personas solo pueden afirmarse tasas del orden de 10⁻² a 10⁻³. El informe debe decirlo explícitamente.

### 2.4 Ética y datos
- Consentimiento escrito con finalidad, plazo y derecho a retirarse.
- Seudonimización de los sujetos (IDs).
- Borrado verificable de plantillas y moldes al final.
- Aprobación de un comité de ética si la UPC la exige (ver `07`).

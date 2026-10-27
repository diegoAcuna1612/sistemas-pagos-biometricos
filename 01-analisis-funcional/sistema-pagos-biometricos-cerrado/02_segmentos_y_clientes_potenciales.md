# 02 — Segmentos y clientes potenciales

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

**Advertencia:** casi toda la información por segmento es **inferencia (I) o hipótesis (HP)**. No se hicieron entrevistas. Los datos verificados se señalan con su fuente. No hay evidencia que permita estimar el tiempo de venta en ningún segmento: se indica como **ND**.

## 1. Datos de contexto verificados

| Dato | Valor | Fuente |
|---|---|---|
| Empresas formales en Perú (2024) | 2 346 592; el 99,1 % son micro y pequeñas | [C13] |
| Empresas no mype (por diferencia) | ~20 000 (cálculo propio; las cifras de PRODUCE no cuadran entre sí) | (E) [C13] |
| Empleo privado (2024) | 11,8 millones; el 13,5 % en empresas no mype | [C13] |
| Sodexo Perú | Más de 100 empresas atendidas; proyecta ventas > S/ 1 000 millones en 2026; crece por la minería | [C8] |
| Aramark Perú | Más de 8 500 mineros atendidos; ~30 000 raciones al día | [C9] |
| Comedor de la UNSA | ~2 500 comensales que pagan, por semana (2023) | [C10] |
| Prestaciones alimentarias | Directa: comedor o concesionario en el centro de trabajo. Indirecta: vales mediante administradoras inscritas | [C18] |

**Inferencia de mercado:**
- El número de organizaciones que podrían tener un comedor propio o concesionado está acotado por las ~20 000 empresas no mype y por las universidades e instituciones grandes.
- **No se sabe cuántas tienen comedor.** Ver el método de estimación en `07` §6.

## 2. Análisis por segmento

| Segmento | Organización que compra | Usuario del sistema | Quién decide | Quién aprueba el presupuesto | Problemas más probables (HP) | Frecuencia y volumen | Sistemas actuales | Barreras de adopción | Capacidad / disposición de pago | Acceso comercial | Tiempo de venta |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Concesionario mediano** (varias empresas cliente) | Concesionario | Cajero o despachador; administrador del contrato | Gerente de operaciones o dueño | Dueño o gerente general | Conciliar y facturar cada empresa cliente; controlar subsidios por empresa; mermas | Diario; cientos de raciones por comedor (I) | NV: papel, Excel, POS o el sistema que exija la empresa cliente | Márgenes ajustados (I); depende de lo que exija cada cliente | Media (HP): el ahorro en conciliación es directo | Medio: pocos actores y accesibles por redes (I) | ND |
| **Concesionario grande** (Sodexo, Aramark) | Corporativo | Personal del comedor | Área corporativa, a veces global (I) | Corporativo | Estandarización entre sitios; auditoría para la minera | Muy alto: decenas de miles de raciones al día [C9] | NV; probablemente estándares globales (I) | Compras corporativas; sistemas propios | Alta capacidad, baja probabilidad de comprarle a una startup (I) | Muy difícil | ND (probablemente largo) |
| **Empresa con comedor propio o concesionado** (oficina, planta) | Empresa empleadora | Trabajador (comensal); personal del comedor; RR. HH. | RR. HH., servicios generales o administración | Gerencia de administración o finanzas | Repetición de raciones; préstamo de fotocheck; reporte a planilla; control de subsidio | Diario; una ración por turno | GeoVictoria en algunas [C1]; fotocheck, papel o lista (HP) | Ya tienen proveedor de asistencia; sensibilidad sindical a la biometría (I) | Media; depende del costo de la ración subsidiada | Medio | ND |
| **Campamento minero o remoto** | Minera o concesionario | Trabajador y contratista; personal del comedor | Operaciones de campamento o del concesionario | Minera o concesionario grande | Control de contratistas; raciones por turno; auditoría de facturación | Muy alto; 3–4 comidas por día (I) | NV | **Huellas desgastadas por trabajo manual** [C14]; conectividad; compras corporativas; ya existe control de acceso al campamento [C10: tesis UCSM sobre Antapaccay, vía resumen] | Alta capacidad, venta difícil | Difícil | ND |
| **Planta industrial** | Empresa industrial | Operarios | RR. HH. o planta | Gerencia | Igual que el corporativo, con turnos rotativos | Diario | Asistencia biométrica frecuente (I) | Huellas desgastadas o sucias [C14] | Media | Medio | ND |
| **Universidad privada** | Universidad o concesionario de cafetería | Estudiantes, personal | Bienestar universitario o administración | Administración | Becas y subsidios de comida; préstamo de carné; colas | Diario; miles de estudiantes (I) | Carné; pago directo en cafetería (I) | Los estudiantes pagan con Yape o efectivo; menos razones para identificarse (I) | Media-baja si no hay subsidio (I) | Medio | ND |
| **Universidad pública** | Universidad (vía contratación pública) | Estudiantes becados | Oficina de bienestar | Presupuesto público | Control de beneficiarios del comedor gratuito; duplicados | ~2 500 comensales por semana en la UNSA [C10] | Código de barras con DNI (UNAP), RFID (prototipo UNAMAD), desarrollos propios [C10] | Compras públicas; presupuesto rígido; desarrollo propio barato | Baja-media | Difícil (procedimientos públicos) | ND (probablemente largo) |
| **Hospital o institución con alimentación interna** | Hospital | Personal de turno | Administración | Dirección | Raciones de personal por turno | Diario, 24 h (I) | NV | Higiene: el contacto con el lector es un problema (I); sector público con compras públicas | Media | Difícil | ND |
| **Colegio** | Colegio | Alumnos menores de edad | Dirección | Promotora | Control de almuerzos pagados | Diario | NV | **Menores:** el consentimiento debe darlo quien ejerce la patria potestad si son menores de 14 (DS 016-2024-JUS art. 22) [C16]; las autoridades europeas consideran desproporcionada la huella en colegios [C20] | — | — | **Excluir** |
| **Gimnasio o club** | Club | Socios | Gerencia | Gerencia | Consumos internos (bar) cargados a la cuenta del socio | Bajo y esporádico (I) | POS | Poco volumen de consumo | Baja | Fácil | ND |
| **Hotel (comedor de personal)** | Hotel | Personal | RR. HH. | Gerencia | Raciones del personal | Diario | Software de RR. HH. [C12] | Volumen pequeño por hotel | Baja | Medio | ND |

## 3. Priorización

Criterios, de 1 (peor) a 5 (mejor). Son valoraciones propias **(I)** para decidir a quién entrevistar primero, no un resultado.

| Segmento | Problema probable | Pagador claro | Acceso | Encaje de la huella | Riesgo legal (5 = bajo) | Competencia (5 = baja) | Total /30 |
|---|---|---|---|---|---|---|---|
| Concesionario mediano | 4 | 4 | 3 | 3 | 3 | 3 | **20** |
| Empresa con comedor (oficina) | 3 | 4 | 3 | 3 | 2 | 2 | **17** |
| Universidad privada (subsidio o beca) | 3 | 3 | 3 | 3 | 3 | 3 | **18** |
| Planta industrial | 3 | 4 | 3 | 2 | 2 | 2 | **16** |
| Campamento minero | 4 | 4 | 1 | 2 | 2 | 2 | **15** |
| Universidad pública | 3 | 3 | 1 | 3 | 3 | 3 | **16** |
| Hospital | 2 | 3 | 1 | 2 | 2 | 3 | **13** |
| Gimnasio o club | 1 | 3 | 4 | 2 | 3 | 4 | **17** |
| Colegio | — | — | — | — | 1 | — | **Excluido** |

**Por qué la huella encaja menos en minería e industria:**
- Hay reportes de rechazos frecuentes en trabajadores manuales: en Gujarat, un funcionario estimó fallos en el 15–20 % de las transacciones de raciones [C14].
- Son reportes anecdóticos, no un estudio controlado. Aun así, es un riesgo serio para la operación en hora punta.
- El rostro o una tarjeta podrían funcionar mejor ahí (I).

## 4. Cliente objetivo recomendado para validar

Prioridad de las entrevistas (fase de descubrimiento, `09` E2):

1. **Concesionarios medianos** que atienden a varias empresas. Es la hipótesis D1 + D2 de `01` §4: el problema sería la conciliación y facturación por empresa.
2. **Empresas medianas o grandes con comedor** y ración subsidiada. Hay que preguntar si ya usan GeoVictoria u otro sistema.
3. **Universidades privadas** con becas o planes de alimentación.

**Cambio respecto de `ref-11`:** ese documento recomendaba empezar por "comedores corporativos o de campamento con consumo subsidiado". Con la nueva evidencia:
- Los **campamentos** bajan de prioridad: los dominan concesionarios grandes con compras corporativas [C8, C9], hay huellas desgastadas [C14] y la venta es difícil.
- **Se añade el concesionario mediano** como primera hipótesis de comprador.

## 5. Barreras de entrada comunes

1. **Sistema ya instalado:** quien tiene GeoVictoria u otro sistema de asistencia puede activar el comedor con su mismo proveedor [C1] (I).
2. **Responsabilidad legal del cliente:** el cliente sería el responsable del tratamiento de las huellas (ver `06`). Eso añade trabajo y riesgo de su lado.
3. **Rechazo de los trabajadores o del sindicato** a la biometría. No hay datos de Perú: es (HP).
4. **Instalación física:** lectores, red y capacitación en cada comedor.
5. **Venta consultiva:** el competidor vende así [C3], lo que sugiere ciclos con demostraciones y pruebas (I).

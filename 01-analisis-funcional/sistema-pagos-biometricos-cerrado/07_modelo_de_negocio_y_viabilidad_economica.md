# 07 — Modelo de negocio y viabilidad económica

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

**Advertencia:** no hay precios de mercado verificables.
- El competidor principal no publica tarifas: cobra "una mensualidad por usuario activo" y vende de forma consultiva [C3, C4].
- Talana cotiza por trabajadores activos y módulos [C12].
- Por eso este documento trabaja con **variables y fórmulas**. Los números de ejemplo están marcados como **(E) supuestos arbitrarios para ilustrar el cálculo**: no son datos de mercado y deben reemplazarse con entrevistas y cotizaciones.

Amplía el §5 de `ref-11` (componentes de ingreso y fórmula del margen) sin repetirlo.

## 1. Quién paga y quién usa

| Rol | Corporativo (comedor propio) | Concesionario | Universidad |
|---|---|---|---|
| Paga | Empresa (RR. HH. o administración) | Concesionario | Universidad (bienestar) o su concesionario |
| Usa a diario | Cajero del comedor | Cajero del concesionario | Cajero |
| Se beneficia | RR. HH. (planilla), finanzas (subsidio) | Administración (facturación por empresa) | Bienestar (control de becas) |
| Se identifica | Trabajador | Trabajadores de varias empresas | Estudiante |

**Implicación:** el comensal **no paga ni elige** el sistema. La venta depende de que el comprador perciba ahorro o control. La adopción de la huella depende del comensal (opcional por ley, `06`). Hay que convencer a dos públicos distintos.

## 2. Componentes de ingreso

| Componente | ¿Conviene? | Razón |
|---|---|---|
| Implementación inicial (registro de personas, configuración, capacitación) | **Sí**, cobrarla | Cubre las horas en sitio; filtra a los clientes sin compromiso (I) |
| Suscripción por sede o comedor | **Sí (preferible al inicio)** | Fácil de entender y predecir; el costo de soporte crece por sede (I) |
| Suscripción por usuario activo | Alternativa | Es el modelo del competidor [C3]; sirve para compararse. Desventaja: penaliza a clientes grandes con consumo bajo (I) |
| Tarifa por transacción | **No al inicio** | Variable e impredecible para el cliente; incentiva a evitar el registro (I) |
| Venta del lector | Sí, al costo + margen pequeño | Evita financiar hardware (lección de Pay By Touch [F10]) |
| Alquiler del lector | Solo con un contrato mínimo | Inmoviliza capital |
| Soporte y mantenimiento | Incluido en la suscripción (niveles) | Simplicidad |
| Integraciones a medida (POS, ERP, nómina) | Proyecto aparte | Alto costo; solo con demanda |

## 3. Estructura de costos

| Costo | Tipo | Monto | Cómo obtenerlo |
|---|---|---|---|
| Lector por estación | Variable, único | S/ 199–209 (ZK9500) [F33]; US$ 71,40 + importación (SecuGen) [F30] | Precio publicado |
| PC o tableta por estación | Variable, único | ND | Cotizar; puede usarse la del cliente |
| Instalación y registro inicial | Variable, por sede | ND: horas × costo por hora | Medir en el piloto |
| Soporte | Variable, mensual por sede | ND: horas × costo por hora | Medir en el piloto |
| Nube (API, bases, gestor de llaves, copias) | Semifijo | ND | Calculadora del proveedor de nube |
| Asesoría legal inicial (contratos, política, opinión) | Fijo, único | ND | Cotizar |
| Prueba de penetración | Fijo, anual | ND | Cotizar |
| Seguro de ciberriesgo | Fijo, anual | ND | Cotizar |
| Oficial de Datos Personales (puede ser externo o a tiempo parcial, DS art. 38.2 [C16]) | Fijo | ND | Cotizar |
| Constitución y contabilidad de la empresa | Fijo | ND | Cotizar |
| Adquisición de clientes (tiempo de venta, demostraciones) | Variable | ND; venta consultiva [C3] | Registrar las horas en la fase 0 |

## 4. Economía por sede

**Margen mensual por sede (MS):**

```
MS = P_s − (h_s × c_h) − (C_nube / N) − A_hw
```

| Variable | Significado | Fuente para reemplazarla |
|---|---|---|
| P_s | Precio mensual por sede | Entrevistas de disposición a pagar (`03` §3.8) + piloto pagado |
| h_s | Horas de soporte por sede al mes | Registro de horas en el piloto |
| c_h | Costo por hora del equipo | Sueldos o valor del tiempo de los fundadores |
| C_nube | Costo mensual de la nube | Cotización |
| N | Número de sedes activas | — |
| A_hw | Amortización del hardware, si lo financia la empresa (si se vende al cliente, 0) | Política comercial |

**Punto de equilibrio:**

```
N* = C_fijo_mensual / MS
```

**Valor para el cliente (techo de precio):**

```
V = (consumos indebidos al mes × costo de la ración)
  + (horas de conciliación ahorradas × costo por hora administrativa)
  + (desperdicio evitado, si se demuestra)
```

Si P_s se acerca a V o lo supera, el cliente no tiene incentivo. Hace falta un margen de ahorro visible (I).

### 4.1 Ejemplo ilustrativo de sensibilidad

**Todos los valores son (E) supuestos arbitrarios** para mostrar cómo se usa la fórmula:
- c_h = S/ 40.
- C_nube = S/ 300 al mes.
- C_fijo = S/ 3 000 al mes (cumplimiento, contabilidad, seguro prorrateados).
- Hardware vendido al cliente (A_hw = 0).

| P_s (prueba) | h_s = 4 h/mes | h_s = 2 h/mes | h_s = 1 h/mes |
|---|---|---|---|
| S/ 200 | MS ≈ 40 − 300/N → N* ≈ 83 (**no realista** para un nicho) | MS ≈ 120 − 300/N → N* ≈ 28 | MS ≈ 160 − 300/N → N* ≈ 21 |
| S/ 400 | MS ≈ 240 − 300/N → N* ≈ 14 | MS ≈ 320 − 300/N → N* ≈ 11 | MS ≈ 360 − 300/N → N* ≈ 10 |
| S/ 800 | MS ≈ 640 − 300/N → N* ≈ 6 | N* ≈ 5 | N* ≈ 5 |

N* se obtiene resolviendo N × (P_s − h_s × c_h) − C_nube ≥ C_fijo, es decir, N ≥ (C_fijo + C_nube) / (P_s − h_s × c_h).

**Lectura (I):** con estos supuestos, la viabilidad depende más de **las horas de soporte por sede** y del **precio** que de la tecnología. Por eso el piloto debe medir las horas reales.

## 5. Escenarios

Los escenarios se definen por **supuestos**, no por cifras de mercado.

| Supuesto | Conservador | Base | Optimista | Procedencia |
|---|---|---|---|---|
| Problema validado | Solo en algunos casos; nadie paga más de lo simbólico | ≥ 3 organizaciones con costo concreto | Varios concesionarios con un dolor fuerte de conciliación | Fase 0 (`03` §4) |
| Segmento que compra | Empresas sueltas | Concesionarios medianos | Concesionarios + empresas con varias sedes | `02` §3 |
| Sedes por cliente | 1 | 2–5 (E) | > 5 (E) | Entrevistas |
| Adopción de la huella entre comensales | Baja: la mayoría usa código o tarjeta | Media | Alta | E7 de `09` |
| Soporte por sede | Alto: instalación y fallos frecuentes | Medio | Bajo, con un proceso estandarizado | Piloto |
| Competencia | El cliente prefiere GeoVictoria o su proveedor de asistencia | Se gana donde D1/D2 de `01` §4 importan | Diferenciación clara en concesionarios | Entrevistas + demostraciones |
| Ciclo de venta | Largo (venta consultiva [C3]) | Medio | Corto vía referidos | Registro de la fase 0 |
| **Resultado esperado (I)** | **No alcanza N*; se cierra como proyecto académico** | **Negocio de nicho pequeño; llega a N* en el mediano plazo si el soporte se controla** | **Negocio B2B sostenible en el nicho; posible expansión regional** | — |

## 6. Tamaño de mercado: método, sin cifras inventadas

No hay estudios con metodología para el mercado de software de comedores en Perú. Estimación de abajo hacia arriba:

1. **Organizaciones con comedor:** partir de las ~20 000 empresas no mype [C13] (E) y estimar qué fracción tiene comedor propio o concesionado. **Dato ND**: obtenerlo con la Planilla Electrónica del MTPE (empresas por tamaño) y con entrevistas.
2. **Concesionarios:** la Ley 28051 prevé un Registro Nacional de Empresas Administradoras y Proveedoras de Alimentos en el MTPE [C18]. **Verificar si es público**: podría servir para listar concesionarios.
3. **Sedes por organización** y **precio por sede**: de las entrevistas.
4. Mercado alcanzable = organizaciones del segmento × sedes × precio × % alcanzable frente a GeoVictoria y otros (I).

**No se presenta un TAM numérico** porque los pasos 1 a 3 no tienen datos.

## 7. ¿A quién venderle?

| Criterio | Empresa individual | Concesionario con varios comedores | Organización grande con varias sedes |
|---|---|---|---|
| Sedes por venta | 1 | Varias (HP) | Muchas |
| Dolor probable | Raciones repetidas, reporte a planilla | **Conciliación y facturación por empresa** (HP) | Estandarización y reportes consolidados |
| Competencia | Alta: proveedor de asistencia ya instalado [C1] | Desconocida: no se encontró software para concesionarios en Perú | Alta: proveedores establecidos, compras formales |
| Ciclo de venta | Medio (I) | Medio (I) | Largo (I) |
| Exigencias de seguridad y legales | Medias | Medias | Altas (auditorías, pentest, contratos) |
| Ingreso por cliente | Bajo | Medio | Alto |
| Riesgo de dependencia de un cliente | Bajo | Medio | Alto |
| **Recomendación (I)** | Segundo | **Primero para validar** | Más adelante, con referencias |

## 8. Retención, dependencia y barreras

- **Retención (I):** una vez instalado e integrado con la planilla, cambiar de sistema cuesta (re-registro de personas y huellas). Eso favorece la retención, pero **también favorece al competidor ya instalado**.
- **Dependencia:** pocos clientes grandes concentran el ingreso; un concesionario que pierde el contrato con una empresa se lleva esas sedes.
- **Barreras de entrada para nosotros:** proveedor de asistencia ya instalado; exigencias de seguridad y legales; venta consultiva.
- **Barreras que podríamos crear:** integración con los procesos de facturación del concesionario; historial de consumos; cumplimiento legal "listo para usar".

## 9. Conclusión económica

| Pregunta | Respuesta | Confianza |
|---|---|---|
| ¿Puede ser un SaaS sostenible? | **Posible solo como nicho**, si (a) se valida un dolor de conciliación con costo concreto, (b) el soporte por sede es bajo y (c) se gana frente a soluciones instaladas | Baja (sin datos de clientes) |
| ¿Cuál es el principal factor económico? | Horas de soporte e instalación por sede y precio aceptado | Media |
| ¿La huella mejora la economía? | **No es evidente:** añade costo (lector, cumplimiento, soporte) y su beneficio (menos préstamo) no está cuantificado | Media |
| ¿Qué datos faltan? | Precio aceptado, horas de soporte, número de concesionarios, adopción de la huella, precio del competidor | — |

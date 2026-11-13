# Prototipo navegable de P1-V7 (nombre de trabajo: Tuerca)

Prototipo en **HTML, CSS y JavaScript puros**, sin servidor, sin base de datos y sin librerías externas. Representa los cuatro sistemas de `../14_analisis_funcional_y_requerimientos.md` y cómo se conectan (`../15_diagrama_de_arquitectura.md`).

## Cómo abrirlo

Abra `index.html` con doble clic. Funciona sin internet y desde el disco. La única salida a internet es el botón «WhatsApp» de la lista para la visita, que abre `wa.me` con el texto del pedido ya escrito.

Todo es **simulado**: la ferretería, los seis proveedores, las personas, los RUC, los precios y las 26 semanas de historia. El estado vive en memoria: al recargar la página se reinicia (también con «Reiniciar» en la barra superior).

## Qué hay en cada sistema

| Sistema | Ruta | Qué se puede hacer |
|---|---|---|
| Inicio | `#/inicio` | La idea, cómo funciona, los cuatro sistemas, qué es real y qué es simulación, las fases |
| Recorrido guiado | `#/recorrido` | Diez pasos de punta a punta que se marcan solos |
| **S1** Portal del comercio | `#/s1/panel` | **Inicio** (capital parado, confianza del stock, quiebres probables, próximas visitas, pendientes) · **Fuentes** (buzón y reenvío de correo, carga de XML por archivo, arrastre o pegado, 11 muestras de comprobantes, listado de comprobantes con su XML, reporte de ingesta, conectores) · **Confirma una vez** (cola de líneas sin emparejar, candidatos con puntaje, factor de conversión, crear producto, «no es inventario», impacto en el stock) · **Productos y stock** (tabla con filtros y ficha con libro de movimientos, stock diario, ventas y pronóstico) · **Conteo cíclico** (teléfono simulado con conteo ciego, error por clase, verificación de 30 productos) · **Visitas y pedidos** (lista por proveedor, cantidades editables, tope de caja, WhatsApp, imprimir, registrar pedido, pedidos en tránsito, cierre del ciclo) · **Productos parados** · **Calidad de datos** (veredicto, objetivos del TSP, merma estimada, informe) · **Configuración** (comercio, proveedores y visitas, parámetros, equipo y permisos, auditoría, consentimiento por marca) |
| **S2** Plataforma central | `#/s2/pipeline` | Consola técnica en tema oscuro: flujo de datos con cifras en vivo · comprobantes (original, lo que se guarda y lectura estructurada; anular) · cascada de emparejamiento con los 5 pasos · pronóstico (seis métodos, MASE, WAPE, sesgo, selección por segmento, simulación de la política) · datos sintéticos y mapa de sensibilidad · siete pruebas ejecutables |
| **S3** Consola SaaS | `#/s3/empresas` | Empresas y alta, planes y costos, catálogo compartido (curaduría de conflictos y simulación del alta de una ferretería nueva), soporte |
| **S4** Vista de la marca | `#/s4/marca` | Lo que vería el vendedor de un proveedor, solo con consentimiento, y la prueba de neutralidad |
| Cobertura | `#/cobertura` | Dónde está cada uno de los 74 requerimientos, las 13 reglas de negocio y los 11 procesos |

**Roles.** El selector «Rol» de la barra superior (visible en el portal) cambia entre dueño, encargado de compras y ayudante, con los permisos de `../14` §4: el ayudante solo ve el conteo; el encargado no ve costos a menos que el dueño lo habilite; solo el dueño configura y da consentimiento a las marcas.

## Cómo se distinguen MVP, piloto y futuro

- El selector **Fase** tiene *Todas*, *MVP* (los 52 «Debe») y *MVP + piloto* (agrega los 17 «Debería»). Lo que no pertenece a la fase elegida queda atenuado y no responde.
- El interruptor **Requerimientos** muestra en cada elemento su etiqueta (**MVP**, **Piloto** o **Futuro**) con el código; al tocarla se abre su texto, su criterio de aceptación, el nivel de fidelidad y dónde verlo.
- Los 5 «Podría» (vista de la marca, modo stock del POS y acciones sobre parados) solo se activan en *Todas*.

## Qué funciona de verdad (con datos simulados)

- **Lector UBL 2.1.** Interpreta XML reales con `DOMParser`: factura, boleta y nota de crédito; emisor, adquirente, líneas, códigos y GTIN. Rechaza `DOCTYPE`/`ENTITY` (XXE), archivos de más de 2 MB y XML mal formado. Puede cargar un XML propio en Fuentes › Cargar archivos.
- **Ingesta idempotente.** La clave RUC + tipo + serie + número hace que un comprobante repetido no cambie nada. El adquirente de las ventas se suprime antes de guardar.
- **Cascada de emparejamiento.** Mapa del comercio, GTIN, catálogo compartido (solo si lo confirmaron 2 comercios o más), normalización de abreviaturas y medidas, y similitud de texto. Solo los dos primeros mapas se aplican solos; lo demás queda en «Confirma una vez».
- **Libro de movimientos.** El stock teórico y su confianza se calculan a partir de conteos, compras, ventas y notas. Un stock negativo nunca se muestra como número.
- **Pronóstico.** Seis métodos (ingenuo, suavizado exponencial, Croston, Croston-SBA, TSB y un modelo global de regresión *ridge*) con backtesting de origen móvil sobre las últimas 8 semanas; MASE, WAPE y sesgo; elección por segmento clase × patrón.
- **Reposición.** Revisión periódica por proveedor con stock de seguridad según el nivel de servicio; «cuenta antes de pedir» cuando la confianza es baja; tope de caja; pedido en tránsito; cierre del ciclo con sugerido, pedido y facturado.
- **Datos sintéticos.** El generador (semilla, % de líneas genéricas y % de ventas sin comprobante) crea un conjunto completo y lo carga en el portal. Con 40% de líneas genéricas el veredicto baja a «V7 con riesgo»; con 60%, a «Descartar V7».
- **Pruebas.** Las siete de S2 corren en el navegador sobre una copia de los datos: idempotencia con 1 000 reenvíos, reproceso de todos los XML con la misma huella del stock, cascada, notas de crédito, supresión del adquirente, catálogo compartido sin datos del comercio y seguridad del lector.

## Qué es simulación y no debe leerse como evidencia

- **Todo el historial** lo genera un programa con semilla fija (`js/gen.js`): demanda suave, errática e intermitente, compras con plazo, ventas con comprobante, conteos y pedidos. Los números de desempeño (error del stock, MASE, menos quiebres, aceptación de la sugerencia) **demuestran cómo se medirá, no que funcione** con ferreterías reales. La demanda de la propuesta sigue sin validar (D = 3).
- Los parámetros del generador (4% de líneas genéricas, 3% de ventas sin comprobante, frecuencia de conteos) son supuestos del autor.
- La prueba de la cascada usa 8 descripciones elegidas por el autor: sirve para ver el mecanismo, no es una medición de exactitud. La meta de ≥ 90% requiere un conjunto etiquetado de verdad.
- La **simulación de política** compara «pido lo que vendí la vez pasada» con la sugerencia sobre la misma demanda simulada; el resultado depende de cómo se construyó el comportamiento del dueño en el generador.
- **Correo, API del facturador (Bsale, PSE), WhatsApp, firma digital, ZIP, dos factores y sesiones** están simulados o solo representados. Los ZIP no se descomprimen aquí.
- El **catálogo compartido** parte de datos inventados (50 mapas, 2 en conflicto); el «efecto de red» que se mide sale de esa semilla.
- Los **precios y planes**, y los códigos SUNAT y GTIN, son de ejemplo.
- Los RUC y nombres son ficticios y no corresponden a ninguna empresa real.

## Fidelidad por requerimiento

Los 74 requerimientos funcionales están presentes: **61 interactivos**, **8 simulados** y **5 representados** (por ejemplo, la fusión de productos y el calendario peruano del modelo). La pestaña «Cobertura» los lista con su fidelidad y un enlace a la pantalla donde se ven.

## Cómo se probó

Con Microsoft Edge sin interfaz, mediante scripts:
- Las 31 pantallas se dibujan sin errores en los 3 roles y las 3 fases (279 combinaciones).
- Los flujos principales se recorrieron por script: las 11 muestras de comprobantes, la confirmación de todas las líneas pendientes, el conteo, la verificación de 30 productos, el pedido, la llegada de la factura y el cierre, el generador, el consentimiento y la neutralidad.
- Las 7 pruebas de la plataforma pasan.
- Se revisaron capturas a 1 440 px y a 500 px de ancho.

**No se probó** con personas, en Chrome, Firefox ni Safari, ni en un celular real; tampoco la carga de archivos con el selector del sistema (sí con las muestras y el pegado).

## Estructura de archivos

```
index.html            Marco de la página
css/base.css          Tokens, tipografía y componentes (partiendo de los de P5, con otra identidad)
css/app.css           Marco, portal S1, consola S2, consola S3, vista S4, inicio y recorrido
js/util.js            Utilidades y fechas
js/gen.js             Generador de datos sintéticos (semilla fija) y catálogo de ejemplo
js/engine.js          Motor: cascada, libro de movimientos, confianza, pronóstico, reposición, lector UBL, ingesta, pruebas
js/requirements.js    Los 74 requerimientos y las 13 reglas de negocio, con su fidelidad y su ubicación
js/ui.js, icons.js    Componentes, etiquetas de fase y requerimiento, iconos
js/charts.js          Líneas con cursor, columnas, barras, barra segmentada y mapa de calor, todos con vista de tabla
js/s1a.js … s1c.js    Portal del comercio
js/s2.js              Plataforma
js/s3.js              Consola SaaS y vista de la marca
js/home.js            Inicio, recorrido y cobertura
js/main.js            Arranque, estado, roles y enrutador
```

## Decisiones de diseño

- **Identidad.** Grafito cálido y naranja de tuerca; las acciones principales son oscuras y el naranja queda para la marca y los avisos. El nombre «Tuerca» es de trabajo y no corresponde a ninguna marca real.
- **Elemento central:** la lista para la visita, donde cada línea explica en una frase por qué se pide esa cantidad y muestra la confianza del stock. Los productos que no se pueden sugerir con honestidad aparecen rayados con «Cuenta antes de pedir» y un botón para contar ahí mismo.
- **Portal con tablas y líneas finas**, no con tarjetas idénticas; la plataforma en tema oscuro porque es una consola técnica.
- **Gráficos.** Paleta categórica validada para daltonismo con el validador de la skill de visualización (pasa los umbrales en claro y oscuro). En modo claro el amarillo y el aqua quedan bajo 3:1 de contraste, por eso cada gráfico tiene etiquetas directas selectivas y un botón «Ver tabla». Marcas finas; rejilla discreta; tooltip con cursor vertical y teclado (flechas).
- **Honestidad en pantalla.** Cada cifra de desempeño lleva su criterio y su estado (cumple, por mejorar); el veredicto de la validación (≥ 60% de líneas identificables) está en el inicio, en calidad de datos y en datos sintéticos.

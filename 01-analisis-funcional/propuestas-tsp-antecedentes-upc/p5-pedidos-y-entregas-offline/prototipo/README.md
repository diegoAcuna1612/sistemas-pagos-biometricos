# Prototipo navegable de P5-V6 (nombre de trabajo: Retorna)

Prototipo en **HTML, CSS y JavaScript puros**, sin servidor, sin base de datos y sin frameworks. Representa los cuatro sistemas de `../14_analisis_funcional_y_requerimientos.md` y cómo se conectan (`../15_diagrama_de_arquitectura.md`).

## Cómo abrirlo

Abra `index.html` con doble clic. Funciona sin internet y desde el disco (no usa fuentes ni librerías externas). La única llamada a internet es el botón «Cómo llegar» de la app del repartidor, que abre Google Maps.

Todo es **simulado**: personas, hogares, precios, mensajes, pagos y resultados del experimento. Nada viene de clientes reales, y la demanda de la propuesta sigue sin validar. El estado vive en memoria: al recargar la página se reinicia (también con «Restablecer la demostración» en el reloj de la barra superior).

## Qué hay en cada sistema

| Sistema | Ruta | Qué se puede hacer |
|---|---|---|
| Inicio | `#/inicio` | Visión del producto, los cuatro sistemas, la arquitectura y las fases |
| Recorrido guiado | `#/recorrido` | Diez pasos de punta a punta que se marcan solos |
| **S1** App del repartidor | `#/s1` | Teléfono simulado: ingreso con PIN, paquete del día, lista con búsqueda y orden manual, entrega en 3 toques, envases con garantía, cobro en efectivo, QR del negocio, enlace de pago y fiado, venta en ruta, alta rápida de hogares, consentimiento verbal, cierre de jornada y cola de sincronización. Panel lateral para cambiar la red entre en línea, débil y sin señal |
| **S2** Portal del distribuidor | `#/s2/panel` | Panel, reposición anticipada (lista, calendario, posibles perdidos, respuestas, parámetros), pedidos, planificación del día, hogares, catálogo, libro de envases, cobros, cuadre, mensajes, resultados del experimento, equipo y seguridad, complemento GLP. Cambia entre dueño y despachador |
| **S3** Plataforma central | `#/s3/resumen` | Consola técnica en tema oscuro: registro de eventos, pruebas ejecutables de sincronización, motor de reposición, adaptador de mensajería con simulador de webhook, adaptador de pagos con la página de pago del hogar, experimento y seguridad |
| **S4** Consola SaaS | `#/s4/empresas` | Alta de empresas, planes y tarifas, uso y costos, soporte y funciones por empresa |
| Cobertura | `#/cobertura` | Dónde está cada uno de los 83 requerimientos, las 10 reglas de negocio, los 10 procesos y los permisos por rol |

## Cómo se distinguen MVP, piloto y futuro

- La **barra superior** tiene el selector «Fase»: *Todas*, *MVP* (los 56 «Debe») y *MVP + piloto* (agrega los 22 «Debería»). Lo que no pertenece a la fase elegida queda atenuado y no responde.
- El interruptor **Requerimientos** muestra en cada elemento su etiqueta: **MVP**, **Piloto** o **Futuro**, con el código del requerimiento. Al tocarla se abre su texto, su criterio de aceptación y dónde verlo.
- Los 5 «Podría» (complemento GLP y fotos de evidencia) solo se activan en *Todas*.

## Qué funciona de verdad (con datos simulados)

- **Sincronización sin duplicados:** cada operación de S1 es un evento con UUID que se guarda en el teléfono y se envía por lotes. El servidor aplica cada UUID una sola vez; «Reenviar último lote» responde «duplicado» sin cambiar nada. Con «Sin señal» la cola crece y al volver la señal se vacía.
- **Reglas de conflicto:** gana el primer repartidor en llegar, la entrega prevalece sobre una cancelación hecha sin señal, y se guardan la hora del teléfono y la del servidor. En S3, «Sincronización» ejecuta una prueba por cada regla (mil reenvíos, 200 eventos con cortes de red, etc.).
- **Reposición:** la fecha de aviso sale de la mediana de las últimas k duraciones por unidad de cada hogar, con duración de referencia y rango válido. Se aplican las reglas de consentimiento, horario (cambie la hora simulada a 21:30), pedido abierto, aviso previo y grupo de control.
- **Cuadre:** esperado frente a recibido por medio de pago y por envases, con motivo obligatorio por diferencia, cobros por verificar y cierre que no se reabre. El cierre queda provisional si falta algo.
- **Permisos:** el despachador no anula cobros, no ajusta envases ni cambia precios, y solo verifica cobros si el dueño lo habilita.
- **Experimento:** asignación estable con semilla, diferencia de recompra con intervalo de confianza calculado desde los datos y evaluación del cálculo de reposición sobre el historial.

## Qué es simulación y no debe leerse como evidencia

- El **historial de los hogares** es sintético y regular: el error de la predicción (1 día) demuestra el procedimiento, no el desempeño con hogares reales.
- Los **resultados del experimento** se generan con una semilla fija. Con unos 50 a 60 hogares por grupo el intervalo incluye cero: la pantalla lo dice y calcula la diferencia mínima detectable.
- **WhatsApp, la pasarela con Yape y Maps** están simuladas. Las reglas de Yape (código de 2 minutos, tope de S/ 2,000, solo soles) vienen de la documentación de la pasarela; la categoría de la plantilla, las tarifas de Meta para Perú y la comisión de la pasarela siguen **por confirmar**.
- Las **pruebas de S3** y las de aislamiento entre empresas corren en el navegador sobre una copia de los datos: demuestran la regla, no prueban el sistema real.
- Los **precios** de productos y planes son de ejemplo.

## Fidelidad por requerimiento

Los 83 requerimientos funcionales están presentes: **70 interactivos**, **12 simulados** y **1 representado** (RF-SYN-06, compatibilidad de versiones). La pestaña «Cobertura» los lista con su fidelidad y un enlace a la pantalla donde se ven.

## Estructura de archivos

```
index.html            Marco de la página
css/base.css          Tokens, tipografía y componentes
css/portal.css        Marco, portal S2, consola S3, S4 e inicio
css/s1.css            Teléfono de S1
js/data.js            Utilidades y datos simulados (semilla fija)
js/store.js           Lógica: estimación, sincronización idempotente, cuadre, experimento, dispositivo
js/requirements.js    Los 83 requerimientos (generado desde el documento 14)
js/where.js           Dónde está cada requerimiento y su fidelidad
js/ui.js, charts.js   Componentes, etiquetas de fase y gráficos
js/s1.js … s4.js      Los cuatro sistemas
js/home.js            Inicio, recorrido y cobertura
js/main.js            Arranque y enrutador
```

## Decisiones de diseño

- **Elemento central:** el indicador de nivel del balón, un cilindro que se vacía según los días que le quedan al hogar. Resume en un vistazo la idea de la V6.
- **Colores:** tinta petróleo, azul agua para las acciones y naranja llama solo para reposición y gas. Las series de los gráficos siguen una paleta validada para daltonismo, con etiquetas directas y vista de tabla en cada gráfico.
- **Portal con tablas y líneas finas**, no con tarjetas idénticas; S3 en tema oscuro porque es una consola técnica.
- El nombre «Retorna» es de trabajo y no corresponde a ninguna marca real.

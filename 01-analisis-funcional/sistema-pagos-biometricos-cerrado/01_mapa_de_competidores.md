# 01 — Mapa de competidores

**Fecha:** 27/10/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Hallazgo principal

**Ya existe en Perú un producto que resuelve el mismo problema con huella.**

GeoVictoria vende "Control de Comedor" en Perú [C1]:
- Emite tickets de comida al validar huella o rostro.
- Impide repetir comida en el mismo turno.
- Configura hasta 6 tipos de ración y límites de consumo.
- Se integra con su control de asistencia: quien no marcó entrada no recibe ticket.
- Usa su propio terminal, el "Box Comedor", para 8 000 huellas y 10 000 tarjetas.
- Muestra en su página los logos de Ripley, SENATI, Tambo y BRECA.

Todo esto es **(DC)**: declaración del proveedor, no verificada de forma independiente.

**Esto contradice un supuesto de `ref-11`.** Ese documento marcaba la competencia de proveedores de asistencia como "no investigada" y suponía que la ventaja de la huella era que "no se presta ni se olvida". Con lo encontrado:
1. La huella **no es un diferenciador**. El competidor más visible ya la ofrece, junto con rostro y tarjeta.
2. Ese competidor tiene una **ventaja de distribución**: vende el comedor como complemento de su control de asistencia, que ya está instalado en sus clientes (I).
3. Hay otros competidores indirectos: tarjetas, códigos de barras, RFID, QR y procesos manuales.

## 2. Mapa por categoría

| # | Categoría pedida | Qué se encontró | Relación con la propuesta |
|---|---|---|---|
| 1 | Software de gestión de comedores y concesionarios | GeoVictoria [C1]; ZKTeco "easy Cafeteria" [C5]. **No se encontró software peruano especializado para concesionarios** | Directo |
| 2 | Control de consumos corporativos | GeoVictoria (raciones, límites, turnos) [C1] | Directo |
| 3 | Identificación con huella | GeoVictoria, ZKTeco, terminales de asistencia [C1, C5]; lectores USB [F30–F33] | Directo / insumo |
| 4 | Biometría de acceso y asistencia | GeoVictoria, ZKTeco; software de RR. HH. con marcaciones, como Talana [C12] | Indirecto (pueden añadir un módulo de comedor) |
| 5 | POS para restaurantes y cafeterías | Niubiz, Izipay y otros POS de cobro [F41]. No se investigó POS de restaurante con cuentas internas | Sustituto parcial (cobro, no atribución a la empresa) |
| 6 | Tarjetas RFID y credenciales | Box Comedor (10 000 tarjetas) [C1]; prototipo RFID en UNAMAD [C10] | Sustituto |
| 7 | Subsidios y beneficios alimentarios | Sodexo: vales electrónicos con QR en la red Niubiz (2020) [C8]; empresas administradoras de vales (Ley 28051) [C18] | Sustituto (modalidad indirecta) |
| 8 | Comedores universitarios | CBORD (Transact+CBORD) con IDEMIA MorphoWave en EE. UU. [C6]; huella en UNCUYO (Argentina) [C11]; código de barras con DNI en UNAP (Perú) [C10] | Directo fuera de Perú; sustituto en Perú |
| 9 | Campamentos | Sodexo y Aramark operan comedores mineros [C8, C9]. **No se encontró qué sistema de identificación usan** | Cliente potencial o competidor (desarrollo propio, NV) |
| 10 | Desarrollos a medida o locales | SysCom (UNAP, .NET) y prototipos de tesis [C10] | Sustituto (bajo costo, poca mantención) |
| — | Status quo | Tickets de papel, listas, fotocheck mostrado al cajero (I, sin fuente cuantitativa) | Sustituto más común (HP) |

## 3. Fichas de competidores relevantes

### 3.1 GeoVictoria — Control de Comedor (competidor directo)

| Campo | Contenido | Evidencia |
|---|---|---|
| Empresa | GeoVictoria (origen en Chile, oficinas en Perú) | [C1, C3] |
| Mercado | Perú, Chile, México, Colombia, Argentina, Ecuador, Centroamérica, España; empresas medianas y grandes | [C1, C2] |
| Web | https://www.geovictoria.com/es-pe/servicios/control-de-comedor/ | [C1] |
| Funciones | Ticket por huella o rostro; una ración por turno; 6 tipos de ración; límites configurables; asignación según turnos y marcaciones; reportes consolidados por comedor y sucursal | DC [C1] |
| Identificación | Huella, rostro y tarjeta; palma y contraseña en el módulo de asistencia | DC [C1] |
| Registro de consumos | Tickets y raciones entregadas | DC [C1] |
| Cuentas, límites, subsidios | Límites y raciones sí. **Subsidios con precio, división empresa/trabajador y exportación a planilla: no se mencionan** | DC [C1] |
| Integraciones | Con su propio control de asistencia. **Nómina: no se menciona** | DC [C1] |
| Sin conexión | **No se menciona** | [C1] |
| Modelo y precios | Mensualidad por usuario activo; venta consultiva; **sin precios públicos** | DC [C3]; O [C4] |
| Ventajas | Marca y base instalada de asistencia; hardware propio; presencia regional; clientes peruanos visibles | (I) |
| Limitaciones | No se pudieron verificar: funcionamiento sin conexión, facturación a varias empresas (concesionario), consumos con precio, integración con POS | (I) |
| Similitud | Prácticamente el mismo flujo de identificación y ración | (I) |
| Diferencia posible | Ver §4. Todas son **hipótesis** | (HP) |

### 3.2 ZKTeco — solución de comedor (competidor directo / proveedor de hardware)

| Campo | Contenido | Evidencia |
|---|---|---|
| Empresa | ZKTeco (fabricante chino de biometría) | [C5] |
| Producto | Plataforma web "easy Cafeteria" con verificación biométrica y tickets; módulo "Consumption Management (Online & Offline)" en ZKBio CVSecurity | DC [C5] |
| Identificación | Huella; rostro en algunos terminales | DC [C5] |
| Sin conexión | El módulo de ZKBio declara un modo offline | DC [C5] |
| Precios | No publicados | — |
| En Perú | Hay lectores ZKTeco en retail (ZK9500, S/ 199–209) [F33]. **No se encontró un distribuidor que ofrezca el software de comedor** | NV |
| Relevancia | Un integrador local podría ofrecer hardware y software ZKTeco a bajo costo (I) | (I) |

### 3.3 CBORD / Transact + CBORD con IDEMIA MorphoWave (referencia internacional)

| Campo | Contenido | Evidencia |
|---|---|---|
| Uso | Acceso a comedores universitarios con planes ilimitados ("all-you-care-to-eat") en EE. UU. | H [C6] |
| Identificación | Huella 3D sin contacto (pasar la mano); integración con CBORD CS Gold | H [C6] |
| Ejemplos | University of Maryland (10 lectores, desde 2016); URI (2021); WMU (2023) | H [C6] |
| Lección | Se usa donde el **préstamo de carné** es caro para la institución (plan ilimitado). La universidad eligió la huella sobre el iris porque esperaba más aceptación | H [C6] |
| Relevancia para Perú | Muestra el caso de uso con mejor ajuste. No es un competidor local | (I) |

### 3.4 Comedores escolares del Reino Unido (referencia de práctica y regulación)

- Muchos colegios usan biometría para el comedor sin efectivo [C7].
- La ley exige consentimiento escrito de los padres, derecho del alumno a objetar y una **alternativa** (normalmente una tarjeta) [C7].
- Se guarda una plantilla, no la imagen, y se borra al egresar [C7].
- **Lección:** el modelo viable a escala es **biometría opcional con una alternativa obligatoria**. Coincide con la exigencia peruana de consentimiento libre (ver `06`).
- En España y Francia las autoridades consideraron desproporcionada la huella para menores en el colegio [C20].

### 3.5 Sustitutos y competidores indirectos

| Solución | Identificación | Ventajas | Limitaciones | Evidencia |
|---|---|---|---|---|
| Fotocheck o carné con código de barras | Visual o lector de código | Muy barato; ya existe en la mayoría de organizaciones (I) | Se presta; se olvida | [C10] (UNAP); (I) |
| Tarjeta RFID o de proximidad | Tarjeta | Rápida; barata; sin datos sensibles | Se presta o se pierde | [C1, C10] |
| QR en el celular | QR | Sin hardware especial (cámara o lector) | Captura de pantalla compartible; requiere celular | (I) |
| Vales (modalidad indirecta de la Ley 28051) | Tarjeta o QR del administrador | Beneficio no remunerativo dentro de los topes | Solo aplica fuera del comedor propio; las administradoras deben inscribirse en el MTPE | [C8, C18] |
| Software de RR. HH. con marcaciones (Talana y otros) | Asistencia | Ya contratado por el cliente | Sin módulo de comedor encontrado | [C12] |
| Desarrollo a medida (TI interna o tesis) | Variable | Bajo costo inicial | Mantenimiento y seguridad débiles (I) | [C10] |
| Papel o lista | Ninguna | Costo cero | Sin trazabilidad (HP) | (I) |

## 4. Espacios donde podría haber diferenciación

Todas son **hipótesis (HP)**. Deben validarse con entrevistas (`03`) y con una demostración del competidor si se consigue autorización.

| # | Hipótesis de diferenciación | Por qué podría importar | Riesgo de que no sea diferenciación |
|---|---|---|---|
| D1 | **Facturación para concesionarios**: un concesionario que atiende a varias empresas factura los consumos de cada una | El que paga sería el concesionario, con un problema de conciliación (I) | GeoVictoria podría cubrirlo sin publicarlo; los concesionarios grandes pueden tener sistemas propios |
| D2 | **Consumos con precio y subsidio dividido** (parte empresa, parte trabajador) y exportación a planilla | La página de GeoVictoria habla de raciones y límites, no de montos [C1] | Puede existir y no estar en la web |
| D3 | **Funcionamiento sin conexión documentado** | Comedores remotos (I) | ZKTeco ya declara modo offline [C5] |
| D4 | **Independencia del hardware y varias credenciales** (huella, tarjeta, QR, código) | No obliga a comprar un terminal propietario (I) | El cliente puede preferir el paquete completo |
| D5 | **Privacidad por diseño**: biometría opcional, borrado automático, evidencia de consentimiento, apoyo al cliente para cumplir la ley | La responsabilidad legal recae en el cliente (ver `06`) | Difícil de cobrar; el cliente puede no valorarlo hasta una fiscalización |
| D6 | Precio menor para medianas empresas | GeoVictoria vende de forma consultiva [C3] | Sin precios del competidor no se puede comparar |

**Conclusión:**
- **"Comedor con huella" no es una propuesta defendible.**
- Lo que podría serlo es **D1 + D2** (gestión de consumos y conciliación para concesionarios y empresas), con la biometría como **una credencial más**.
- Esto cambia el producto: la biometría pasa de ser el centro a ser un componente.

## 5. Vacíos de información

1. Precio, funciones reales y adopción del Control de Comedor de GeoVictoria. **No se pidió cotización**: requiere autorización.
2. Qué sistema usan Sodexo, Aramark y los concesionarios medianos. No es información pública.
3. Si hay distribuidores locales de ZKTeco, Hikvision o Anviz que vendan software de comedor. No se encontraron.
4. Software de POS de cafetería con cuentas internas en Perú. No se investigó a fondo.
5. Soluciones a medida de grandes empresas. Solo se sabrá por entrevistas.

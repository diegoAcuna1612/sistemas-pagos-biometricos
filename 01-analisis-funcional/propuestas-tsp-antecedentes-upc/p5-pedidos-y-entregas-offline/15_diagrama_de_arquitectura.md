# 15 — Diagrama de arquitectura (P5-V6)

**Fecha:** 06/11/2026. Complementa `14_analisis_funcional_y_requerimientos.md` y actualiza para la V6 el esquema de `06` §2. Los sistemas S1–S4 y E1–E4 son los de `14` §3.

## 1. Cómo se conectan los sistemas

```mermaid
flowchart TB
    subgraph USR["Usuarios del distribuidor"]
        direction LR
        S1["S1 App del repartidor<br/>Android, sin conexión"]
        DB1[("SQLite cifrada<br/>cola de eventos")]
        S2["S2 Portal web<br/>dueño y despachador"]
        WAN["WhatsApp del negocio<br/>modo manual"]
        S4["S4 Consola SaaS"]
        S1 --- DB1
    end

    subgraph NUBE["S3 Plataforma central: monolito modular"]
        SYNC["Sincronización<br/>idempotente"]
        API["API y acceso<br/>por empresa"]
        DOM["Pedidos, envases,<br/>cobros y cuadre"]
        REP["Motor de reposición<br/>tarea diaria"]
        EXP["Medición y<br/>experimento"]
        MSG["Adaptador de<br/>mensajería"]
        PAY["Adaptador de pagos<br/>y página de pago"]
        EV[("Registro de eventos<br/>solo inserción")]
        PG[("PostgreSQL<br/>datos por empresa")]
    end

    subgraph EXT["Servicios externos"]
        direction LR
        MAP["E3 Google Maps<br/>o Waze"]
        WA["E1 WhatsApp<br/>Cloud API"]
        PSP["E2 Pasarela con Yape<br/>Culqi o Kushki"]
        FE["E4 Facturación<br/>electrónica, futuro"]
    end

    H["Hogar, sin app<br/>WhatsApp y su celular"]

    S1 -- "lotes de eventos con UUID" --> SYNC
    SYNC -- "acuses y paquete del día" --> S1
    S2 -- "HTTPS" --> API
    S4 -- "HTTPS" --> API
    S2 -. "enlace wa.me" .-> WAN
    SYNC --> EV
    API --> DOM
    EV --> DOM
    DOM --> PG
    REP -- "lee historial" --> PG
    REP -- "lista de avisos" --> DOM
    EXP -- "lee eventos" --> EV
    DOM --> MSG
    DOM --> PAY
    MSG -- "plantillas" --> WA
    WA -- "webhooks" --> MSG
    PAY -- "cargo" --> PSP
    PSP -- "resultado" --> PAY
    S1 -. "enlace de dirección" .-> MAP
    DOM -. "futuro" .-> FE
    WA -- "aviso con botones" --> H
    H -- "respuesta" --> WA
    WAN -. "aviso manual" .-> H
    H -. "paga desde su celular" .-> PAY
```

Líneas continuas: conexiones del sistema. Líneas punteadas: enlaces que abre una persona (WhatsApp manual, mapas, página de pago) o integraciones futuras.

**Lectura:**

- **El hogar no instala nada.** Recibe el aviso por WhatsApp: en el MVP, desde el celular del negocio mediante un enlace `wa.me`; en el piloto, por la API con botones. También paga desde su propio celular.
- **La app del repartidor escribe primero en su base local.** Cuando hay señal, envía lotes de eventos con UUID; el servidor los acepta una sola vez y devuelve acuses (`14` RF-SYN).
- **El registro de eventos es la fuente de verdad.** Pedidos, saldo de envases, cobros y cuadre se calculan a partir de él.
- **El motor de reposición es una tarea diaria** que lee el historial y deja la lista de avisos para que el despachador la apruebe (`14` RF-REP-05).
- **WhatsApp y la pasarela entran por adaptadores.** Se puede pasar del modo manual a la API, o de Culqi a Kushki, sin tocar el resto.

## 2. Flujo principal: del aviso al cuadre

```mermaid
sequenceDiagram
    autonumber
    participant M as Motor de reposición
    participant D as Despachador S2
    participant P as Plataforma S3
    participant W as WhatsApp
    participant H as Hogar
    participant R as App del repartidor S1
    participant G as Pasarela

    M->>P: Calcula las fechas de aviso de madrugada
    P->>D: Lista de avisos sugeridos
    D->>P: Aprueba la lista
    P->>W: Envía la plantilla
    W->>H: Aviso para el día siguiente
    H->>W: Botón "Sí, mañana"
    W->>P: Webhook con la respuesta
    P->>P: Crea el pedido confirmado
    D->>P: Asigna pedidos y registra la carga
    R->>P: Descarga el paquete del día
    Note over R: Desde aquí puede no haber señal
    R->>R: Entrega, envases y cobro<br/>evento con UUID en la cola local
    opt El hogar paga con Yape por enlace
        R->>H: Muestra el QR del enlace de pago
        H->>P: Abre la página de pago
        H->>G: Celular y código de aprobación de Yape
        P->>G: Crea el cargo con el token
        G->>P: Resultado del cargo
    end
    Note over R: Vuelve la señal
    R->>P: Lote de eventos con UUID
    P->>R: Acuses: aceptado o duplicado
    P->>D: Cuadre por repartidor en dinero y envases
```

**En el MVP, los pasos 4 a 8 son manuales.** El despachador abre cada aviso con el enlace `wa.me`, marca la respuesta en el portal y, si es "sí", el pedido se crea al marcarla (`14` RF-REP-06). El resto del flujo no cambia.

## 3. Conexiones

| Origen → destino | Qué viaja | Protocolo | ¿Funciona sin señal? |
|---|---|---|---|
| S1 → S3 | Lotes de eventos con UUID | HTTPS, JSON, token del dispositivo | Sí: se guardan en la cola y se envían después |
| S3 → S1 | Paquete del día, acuses y cambios | HTTPS | Se descarga al empezar la jornada |
| S2 → S3 | Operación del local | HTTPS, sesión de usuario | No: el local necesita internet |
| S2 → WhatsApp del negocio | Aviso con el texto ya escrito (modo manual) | Enlace `wa.me` | — |
| S3 → E1 | Plantillas | HTTPS (Cloud API) | — |
| E1 → S3 | Respuestas y estados | Webhook verificado por firma | — |
| Hogar → S3 y E2 | Pago | Página de pago con el checkout de la pasarela | Usa la señal del hogar, no la del repartidor |
| S3 ↔ E2 | Cargo y resultado | HTTPS con llave privada; webhooks [PI] | — |
| S1 → E3 | Dirección | Enlace a la app de mapas | Depende de la app de mapas |

## 4. Decisiones de arquitectura

| Decisión | Por qué |
|---|---|
| Monolito modular, no microservicios | Equipo de dos personas; mismo criterio que `../../sistema-pagos-biometricos-cerrado/05_arquitectura_y_seguridad.md` §2.1 |
| Registro de eventos de solo inserción como fuente de verdad | El cuadre y el saldo de envases son sumas auditables (`06` §1) |
| Adaptadores para WhatsApp y pagos | Cambiar de proveedor o de modo sin tocar el dominio |
| Motor de reposición como tarea diaria sobre PostgreSQL | Son medianas por hogar: no hace falta infraestructura de aprendizaje automático |
| La app no maneja datos de Yape | Evita la exigencia de PCI DSS SAQ-D de la API directa (`14` F3) |
| Tecnologías | Las de `06` §2: Flutter o React Native con SQLite; NestJS o Spring con PostgreSQL. Si el equipo ya usa .NET, como en el proyecto cerrado, ASP.NET Core también sirve |

## 5. Reutilización en la suite para distribuidoras

La app S1, la sincronización y el registro de eventos son el mismo núcleo que el módulo M2 (preventa y reparto sin conexión) de `../iteracion-2_01_integraciones_y_suite_distribuidoras.md` §2.4. Para la suite cambian el cliente atendido (bodegas en vez de hogares) y el catálogo, que pasa a ser multimarca.

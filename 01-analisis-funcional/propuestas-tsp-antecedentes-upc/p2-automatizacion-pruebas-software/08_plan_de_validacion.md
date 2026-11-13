# 08 — Plan de validación

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Reglas comunes

- Preguntar por la última versión certificada, no por opiniones.
- Pedir una evidencia real (anonimizada) y la plantilla vacía.
- **Contactar empresas requiere la autorización del equipo.** No se contactó a nadie.

## 2. V3 — Evidencias y certificación (prioridad 1)

### 2.1 Entrevistados

| Perfil | Cantidad |
|---|---:|
| Analistas y automatizadores QA en banca | 4 |
| Líderes o gerentes de QA en consultoras | 3 |
| Aprobador o responsable de pase a producción en un banco | 1 |

### 2.2 Cómo encontrarlos

- LinkedIn: "QA Automation" + banco o consultora (Choucair, Inetum, NTT, Entelgy) [S2, S3].
- Egresados UPC en QA; autores de las tesis peruanas de automatización bancaria [S1, S7, S8].
- Comunidades de testing.

### 2.3 Guía

1. Cuéntame cómo certificaste la última versión: pasos y tiempos.
2. ¿Qué documentos te exigen? ¿Quién los aprueba? ¿Cuántas veces te los devuelven?
3. ¿Cuántas horas a la semana dedicas a capturas y documentos?
4. ¿Usas Xray, TestRail u otra herramienta de gestión? ¿Qué no resuelve?
5. ¿Qué datos aparecen en las capturas? ¿Pueden salir del banco?
6. ¿Quién compra herramientas en tu equipo y cuánto pagan hoy?

### 2.4 Evidencias a pedir

- Plantilla de evidencia vacía; un ejemplo anonimizado.
- Número de versiones por mes y casos por versión.

### 2.5 Prototipo mínimo

- Script que lee un JUnit XML y capturas de Playwright y llena la plantilla del entrevistado. Se mide el tiempo contra su forma actual.

### 2.6 Señales de interés

| Señal | Peso |
|---|---|
| Entrega su plantilla real | Alta |
| Pide probar el script en su próxima versión | **Muy alta** |
| Ya usa Xray/TestRail y está satisfecho | Negativa |

### 2.7 Criterios de decisión

| Resultado | Decisión |
|---|---|
| ≥ 5 de 8 dedican ≥ 4 h/semana a evidencias; ≥ 2 entregan plantilla; hay forma de instalar o anonimizar | **Continuar** con V3 |
| El dolor está en escribir casos, no en documentar | **Pivotar a V2** |
| Las herramientas de gestión ya lo resuelven | **Descartar** como producto; mantener el TSP con foco en la medición |

## 3. V2 (plan B)

- 3 entrevistas con desarrolladores backend y QA de APIs. Pregunta clave: ¿cuánto tardan en escribir los casos de un endpoint nuevo y qué asistente de IA usan hoy?

## 4. Cronograma

| Semana | Actividad |
|---|---|
| 1 | Lista de 25 contactos; guía; script base |
| 2 | 8 entrevistas; 2 plantillas reales |
| 3–4 | Prototipo con 1–2 equipos |
| 5–6 | Piloto (consultora) o pivote |

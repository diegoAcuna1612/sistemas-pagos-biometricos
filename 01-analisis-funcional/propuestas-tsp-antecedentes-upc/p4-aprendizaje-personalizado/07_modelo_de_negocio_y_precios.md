# 07 — Modelo de negocio y precios

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`. Cifras **ilustrativas [H]**.

## 1. Comparables

| Producto | Precio | Fuente |
|---|---|---|
| DrQuiz | Gratis | [S3] |
| AMBOSS | [PI] | [S4] |
| Anki | Gratis (escritorio/Android) [PI] | — |
| Academias de preparación | [PI] | — |

## 2. Modelo propuesto (V3)

| Elemento | Propuesta [H] |
|---|---|
| Cobro | Por alumno activo al mes |
| Precio | S/ 4 por alumno; mínimo S/ 300/mes por academia |
| Generación de preguntas | Incluida hasta un límite; paquetes adicionales |

## 3. Economía de V3

### 3.1 Valor para la academia (fórmula)

```
Valor = (alumnos retenidos al siguiente ciclo × precio del ciclo)
      + (horas docentes ahorradas en armar práctica × costo por hora)
      + (mejores resultados → más matrículas, no cuantificable aún)
```

### 3.2 Ejemplo ilustrativo [H]

| Supuesto | Valor |
|---|---|
| Alumnos de una academia mediana | 300 |
| Costo de la plataforma | 300 × S/ 4 = S/ 1 200/mes |
| Retención adicional al siguiente ciclo | 3% → 9 alumnos × S/ 500 = **S/ 4 500 por ciclo** |
| Horas docentes ahorradas | 20 h × S/ 30 = **S/ 600/mes** |

Si el ciclo dura 4 meses, el valor mensual es ~S/ 1 725 frente a S/ 1 200: **margen estrecho**; depende de la retención, que hay que medir.

### 3.3 Costo de servir [H]

- IA + infraestructura: < S/ 0,50 por alumno al mes.
- Soporte a docentes: el costo principal al inicio.

## 4. Canales

- Academias de preparación (admisión, ENAM).
- Docentes universitarios como usuarios gratuitos que llevan la herramienta a su institución.
- Plugin para Moodle [I].

## 5. Qué debe demostrar

1. Retención a 28 días ≥ 15 puntos porcentuales mayor que la práctica tradicional en el experimento.
2. ≥ 70% de preguntas generadas aprobadas por el docente con edición menor.
3. ≥ 50% de alumnos activos al menos 3 días por semana durante un ciclo.

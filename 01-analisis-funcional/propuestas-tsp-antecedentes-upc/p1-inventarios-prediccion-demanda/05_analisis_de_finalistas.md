# 05 — Análisis de los finalistas

**Fecha:** 05/11/2026. Etiquetas y fuentes en `10_fuentes_y_evidencias.md`.

## 1. Comparación lado a lado

| Criterio | V2 Ferreterías/minimarkets | V4 Restaurantes | V6 Distribuidoras |
|---|---|---|---|
| Quién paga | El comercio | El restaurante | La distribuidora |
| Ticket por cliente [H] | S/ 39–79/mes | S/ 49–99/mes | S/ 1 500–5 000/mes |
| Clientes necesarios para S/ 20 000/mes | 250–500 | 200–400 | 4–13 |
| Datos | Exportación del POS | POS + recetas (a construir) | Historial de pedidos |
| Dificultad técnica | Media (intermitencia, muchos productos) | Media-alta (recetas, perecibles) | Media (muchas series cortas) |
| Competidor más cercano | El propio POS | POS de restaurante [PI] | Ordéname, Yalo [S7] [PI] |
| Acceso a los primeros 10 | **Alto** (visitas a tiendas) | Medio | Medio-bajo |
| Encaje TSP | **Alto** | Medio | Alto |

## 2. Análisis económico y comercial

### V2
- **Por qué pagaría:** cada quiebre de un producto clase A es venta perdida; cada exceso es capital inmovilizado [H].
- **Por qué no pagaría:** el beneficio por tienda es pequeño (`07` §3) y el dueño ya "sabe" qué pedir.
- **Cómo se vende:** demostración con sus propios datos ("esta semana te faltaron 14 productos; con la sugerencia habrían sido 3"). La prueba es la venta.

### V4
- Merma visible y diaria; pero el restaurante pequeño no documenta recetas y su margen de tiempo para adoptar software es bajo [H].

### V6
- Un cliente grande paga más y aporta muchos datos. La venta necesita convencer a gerencia comercial y a TI; el producto compite con la plataforma de preventa que ya tengan [H].

## 3. Riesgos comparados

| Riesgo | V2 | V4 | V6 |
|---|---|---|---|
| Un incumbente agrega la función | **Alto** | Medio | Medio |
| No hay datos suficientes | Bajo | Medio | Bajo |
| El usuario ignora la sugerencia | Medio | Medio | **Alto** (el preventista) |
| Ticket insuficiente | **Alto** | Alto | Bajo |

## 4. Conclusión

- **V2 es la mejor variante para validar y para el TSP:** datos accesibles, clientes fáciles de encontrar y un problema técnico interesante (demanda intermitente).
- **V6 es el mejor negocio si V2 confirma el valor del pronóstico:** mismo motor, cliente con ticket alto. Puede ser la evolución comercial.
- V4 queda como alternativa si en las entrevistas aparece más dolor en restaurantes.

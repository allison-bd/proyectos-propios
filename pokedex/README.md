<div align="center">

<img src="./assets/img/pokedex-banner.png" alt="Pokédex Banner" width="700">

# Pokédex

🔴 Una Pokédex interactiva con estética pixel art 🎮

[🌐 Ver demo en vivo](https://allison-bd.github.io/proyectos-propios/pokedex/)

---

</div>

## 🔴 ¿Qué es una Pokédex?

<div align="justify">

En el universo Pokémon, la Pokédex es una enciclopedia electrónica portátil que los entrenadores usan para registrar información sobre las distintas especies de pokémon que encuentran en su viaje. Cada entrada incluye datos como el nombre, tipo, descripción, estadísticas y cadena evolutiva del pokémon.

Esta versión web recrea esa experiencia: permite explorar, buscar y conocer en detalle los **151 pokémon de la primera generación**, consumiendo datos reales directamente desde la [PokeAPI](https://pokeapi.co).

</div>

## 🎮 Sobre este proyecto

<div align="justify">

Esta Pokédex nació como proyecto integrador del **Módulo 4: Programación Avanzada en JavaScript** de mi bootcamp de desarrollo Full Stack. Reúne en una sola aplicación los cinco ejes del módulo: orientación a objetos, características ES6+, manipulación del DOM y eventos, asincronía, y consumo de APIs.

La estética pixel art sigue la misma línea visual de mi proyecto [Pomodoro Timer](../pomodoro), manteniendo coherencia en mi portafolio personal.

</div>

## ✨ Funcionalidades

### 📋 Catálogo completo
<div align="justify">

- Carga los **151 pokémon** de la primera generación de una sola vez, en paralelo con `Promise.all`, para que la búsqueda y el filtrado funcionen sobre el conjunto completo.
- Cada tarjeta muestra la imagen (sprite), nombre, número de pokédex y tipos, con un **fondo degradado** que cambia según los tipos del pokémon.
- **Paginación** que divide el catálogo en grupos de 20, navegable con botones "Anterior" y "Siguiente".

</div>

### 🔍 Búsqueda y filtro
<div align="justify">

- **Buscador en tiempo real** (evento `keyup`): filtra por nombre mientras se escribe, sobre los 151 pokémon completos.
- **Filtro por tipo**: una fila de chips de colores (generados dinámicamente desde un diccionario de tipos) permite mostrar solo los pokémon de un tipo específico.
- Ambos filtros se combinan: se puede buscar por nombre dentro de un tipo seleccionado.

</div>

### 📖 Modal de detalle
<div align="justify">

- Al hacer clic en una tarjeta se abre un modal con información completa: imagen, nombre, número, categoría (ej: "Pokémon Llama"), tipos, descripción en español, habilidades traducidas al español, estadísticas base con barras de colores individuales, y línea evolutiva con niveles de evolución.
- Los datos que no están disponibles de inmediato (descripción, categoría, habilidades traducidas, línea evolutiva) se cargan de forma asíncrona, mostrando un estado de "Cargando..." mientras llegan.
- La etapa actual del pokémon se resalta con borde rojo en la línea evolutiva.
- Protección contra **condiciones de carrera**: si se abre otro modal antes de que termine de cargar el anterior, los datos desactualizados se descartan automáticamente.

</div>

### ♥ Favoritos
<div align="justify">

- Cada tarjeta tiene un botón de corazón para marcar o desmarcar favoritos.
- Los favoritos se guardan en **localStorage**, persistiendo entre sesiones.
- Un **drawer lateral** muestra la lista completa de favoritos, con opción de eliminarlos desde ahí.
- El contador de favoritos se actualiza en tiempo real en el encabezado y en el drawer.
- Al marcar o desmarcar un favorito aparece una **notificación temporal** (toast) que se oculta sola a los 2 segundos usando `setTimeout`.

</div>

### 🌙 Modo claro / oscuro
<div align="justify">

- Botón de alternancia en el encabezado que cambia toda la paleta de colores de la aplicación.
- Configurado con la estrategia `darkMode: 'class'` de Tailwind CSS.
- La preferencia se guarda en **localStorage** y se recupera automáticamente al recargar.

</div>

## 🛠️ Tecnologías utilizadas

<div align="justify">

- **HTML5** — estructura semántica (nav, main, footer)
- **Tailwind CSS** (vía CDN) — diseño responsive, modo oscuro, utilidades de diseño
- **JavaScript (ES6+)** — módulos nativos, clases con campos privados, async/await, Promise.all, destructuring, template literals, arrow functions
- **PokeAPI** — fuente de datos (endpoints: pokemon, pokemon-species, evolution-chain, ability)
- **localStorage** — persistencia de favoritos y preferencia de tema

</div>

## 📁 Estructura del proyecto

```
pokedex/
├── README.md
├── index.html
└── assets/
    ├── css/
    │   └── styles.css
    ├── fonts/
    │   ├── PixeloidMono.woff
    │   ├── PixeloidMono.woff2
    │   ├── PixeloidSans.woff
    │   ├── PixeloidSans.woff2
    │   ├── PixeloidSans-Bold.woff
    │   └── PixeloidSans-Bold.woff2
    ├── img/
    │   └── pokedex-banner.png
    └── js/
        ├── app.js          (orquesta la interfaz: eventos, render, estado)
        ├── api.js          (todas las llamadas fetch a la PokeAPI)
        └── models/
            ├── pokemon.js  (clase que modela un pokémon)
            └── pokedex.js  (clase que administra los favoritos)
```

## 👩‍💻 Autora

<div align="justify">

Desarrollado por **Allison Barra Díaz** como proyecto integrador del Módulo 4 durante su formación como desarrolladora Full Stack JavaScript.

<a href="https://github.com/allison-bd" target="_blank"><img src="https://img.shields.io/badge/GitHub-allison--bd-181717?style=flat&logo=github" alt="GitHub"></a>

</div>

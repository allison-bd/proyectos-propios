# Guía de estudio interactiva: Node.js & Express

Una aplicación web interactiva, construida desde cero, para aprender los fundamentos de Node.js y Express.js explicando no solo **qué** hace cada cosa, sino **cómo funciona por dentro** y **por qué se escribe así**.

## Objetivo del proyecto

Este proyecto nace de una necesidad concreta detectada durante los Módulos 6, 7 y 8 del bootcamp de JavaScript Full Stack: los materiales de estudio explican bien los conceptos, pero suelen saltarse la **capa procedimental**, es decir, de dónde salen objetos como `req`, `res` o `app`, qué hace cada método exactamente, y cómo fluye la ejecución del código paso a paso.

La meta no es solo entender la teoría, sino lograr **fluidez de implementación**: poder leer, escribir y razonar sobre código de Node.js, Express, bases de datos y APIs línea por línea, sin dar nada por sentado.

## Público objetivo

Esta guía nació como una herramienta de estudio personal mientras curso el bootcamp, pero está pensada para que cualquier persona que esté aprendiendo Node.js y Express pueda usarla, sin importar si viene del mismo programa o no. No reemplaza el material oficial ni un curso estructurado; es un complemento pensado para quien necesita entender no solo los conceptos, sino la capa procedimental del código: de dónde sale cada objeto, qué hace cada método y cómo fluye la ejecución paso a paso.

## El problema que resuelve

| Lo que suele pasar | Lo que esta guía busca hacer |
|---|---|
| Se explica el concepto, pero no la sintaxis exacta | Cada línea de código nueva se explica la primera vez que aparece |
| Los ejemplos se leen, pero no se manipulan | Cada concepto viene acompañado de un elemento interactivo: se toca, se compara, se predice un resultado |
| El texto es denso y uniforme | El contenido se apoya en tablas, diagramas y consola simulada en vez de párrafos largos |
| Es fácil memorizar sin entender el flujo | Los ejercicios piden razonar ("¿qué pasa si...?"), no solo recordar una definición |

## Cobertura curricular

La guía está diseñada para cubrir el temario completo de tres módulos del bootcamp:

- **Módulo 6** — Desarrollo de Aplicaciones Web Node Express
- **Módulo 7** — Acceso a Datos en Aplicaciones Node
- **Módulo 8** — Implementación de API Backend Node Express

Para asegurar esa cobertura, se generó un inventario de temario de cada módulo (sin explicaciones, solo el listado de conceptos, métodos y herramientas que cubre cada clase) y se comparó contra el contenido ya construido. Las fases de la guía se ajustaron y ampliaron a partir de esa comparación, en vez de definirse solo de forma intuitiva.

## Metodología de trabajo

La construcción de esta guía sigue un proceso repetible:

1. **Definición de tarjetas pequeñas**: cada fase se divide en conceptos acotados (una tarjeta = una idea), para no mezclar demasiado contenido en una sola pantalla.
2. **Generación de contenido base con NotebookLM**: se cargan las fuentes oficiales (documentación de Node.js, Express, manuales y clases del bootcamp) y se generan explicaciones conceptuales con prompts diseñados para pedir profundidad, evitar analogías forzadas y no dar por sentado ningún término.
3. **Transformación a formato interactivo**: el contenido generado se revisa, se corrige y se convierte en tarjetas con capas progresivas, elementos interactivos (comparadores, simuladores de consola, diagramas clickeables) y ejercicios de práctica, eligiendo en cada caso el formato de ejercicio que mejor pone a prueba ese contenido específico.
4. **Revisión iterativa**: cada tarjeta se revisa y se ajusta antes de pasar a la siguiente. No se avanza en bloque.

Este proceso combina herramientas de investigación asistida (NotebookLM) y de desarrollo asistido (Claude) bajo dirección y revisión propia en cada paso: el criterio sobre qué explicar, cómo estructurarlo y qué tan profundo llegar es siempre una decisión personal, no delegada.

## Estructura del contenido

| Fase | Tema | Módulo de origen |
|---|---|---|
| 0 | Herramientas del proyecto | M6 |
| 1 | Cimientos de JavaScript en el servidor | M6 |
| 2 | Red y servidor nativo | M6 |
| 3 | Express.js (rutas, middlewares, plantillas, validación, consumo de APIs) | M6 |
| 4 | Persistencia en archivos planos | M6 |
| 5 | Bases de datos con PostgreSQL | M7 |
| 6 | ORM con Sequelize | M7 |
| 7 | Diseño de APIs REST | M8 |
| 8 | Subida de archivos | M8 |
| 9 | Autenticación con JWT | M8 |
| 10 | Procesos, escalabilidad y producción | M6 |

## Características

- **Formato de tarjeta en capas**: cada tarjeta revela su contenido en pasos (por ejemplo: ¿Qué es? → cómo funciona → un caso de uso), en vez de mostrar todo de golpe. El ejercicio interactivo de cada tarjeta también vive como una capa más dentro de esa misma secuencia, no como un elemento aparte.
- **Elementos interactivos por tarjeta**: comparadores de código (por ejemplo, CommonJS vs ESM), simuladores de consola que muestran el resultado real de ejecutar un fragmento, diagramas clickeables, y ejercicios de predicción ("¿qué pasará si...?").
- **9 formatos de ejercicio interactivo**, elegidos según el tipo de contenido de cada tarjeta (no aplicados al azar): opción múltiple simple, opción múltiple con caso planteado, verdadero o falso, términos pareados (con líneas conectoras dinámicas), completar código con alternativas, completar código de escritura libre con pista, arrastrar elementos a la categoría correcta, ordenar pasos de un proceso, encontrar el error en un fragmento de código, y predecir la salida de un fragmento antes de ejecutarlo. Todos con retroalimentación explicada tanto en aciertos como en errores.
- **Sin dependencias de build**: HTML, CSS (Tailwind vía CDN) y JavaScript (ESM) puro, sin framework ni paso de compilación, para mantener el proyecto simple de mantener y desplegar.

## Stack tecnológico

- **HTML + JavaScript (ESM)**: sin frameworks de frontend.
- **Tailwind CSS** vía CDN, con paleta y tipografía personalizadas.
- **Tipografías**: Fredoka (títulos), Nunito (texto), JetBrains Mono (código).
- **Sin backend**: es una aplicación estática, pensada para desplegarse en GitHub Pages.

## Estructura de archivos

```
/index.html           → Estructura de la aplicación (menú + vista de estudio)
/css/estilos.css       → Estilos personalizados (código, tablas, ejercicios, interactivos)
/js/app.js             → Lógica de navegación, renderizado y funciones interactivas
/js/datos.js           → Contenido de la Fase 0
/js/datos_fase1.js     → Contenido de la Fase 1
/js/datos_fase2.js     → Contenido de la Fase 2
/js/datos_fase3.js     → Contenido de la Fase 3
/js/datos_fase4.js     → Contenido de la Fase 4
/js/datos_fase5.js     → Contenido de la Fase 5
/js/datos_fase6.js     → Contenido de la Fase 6
/js/datos_fase7.js     → Contenido de la Fase 7
/js/datos_fase8.js     → Contenido de la Fase 8
/js/datos_fase9.js     → Contenido de la Fase 9
/js/datos_fase10.js    → Contenido de la Fase 10
```

Cada fase vive en su propio archivo de datos para mantener el proyecto ordenado y fácil de ajustar sin tocar el resto.

## Estado actual

- ✅ Fases 0 a 10 completas, con contenido conceptual e interactivo.
- ✅ 9 formatos de ejercicio interactivo diseñados, construidos y aplicados en las 11 fases.
- 🔜 Despliegue en GitHub Pages.
- 🔜 Adaptar el arrastre (términos pareados, categorías, ordenar pasos) para pantallas táctiles.

## Cómo verlo

Al ser una aplicación estática sin build, basta con abrir `index.html` en un navegador, o servirlo con cualquier servidor local simple. Una vez desplegado, estará disponible directamente vía GitHub Pages.

## Autora

Allison Barra Díaz — estudiante del Bootcamp Full Stack JavaScript Trainee, construyendo esta guía como parte de su proceso de aprendizaje de los Módulos 6, 7 y 8.

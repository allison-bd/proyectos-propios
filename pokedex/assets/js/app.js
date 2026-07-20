// L2 - Módulos ES6+
import { obtenerPokemon, obtenerVariosPokemon, obtenerListaNombres, obtenerInfoEspecie, obtenerLineaEvolutiva, obtenerHabilidadesTraducidas } from "./api.js";
import { Pokedex } from "./models/Pokedex.js";

// ~~~~~~~~~~~~~~~~~~~~~~ ESTADO GENERAL ~~~~~~~~~~~~~~~~~~~~~~
const miPokedex = new Pokedex();
const contenedor = document.querySelector("#lista-pokemon");

let todosLosPokemon = [];
let pokemonFiltrados = [];
let paginaActual = 1;
const tamanoPagina = 20;
let tipoFiltroActual = null;

function formatearNumero(numero) {
    return String(numero).padStart(3, "0");
}

function capitalizarPrimeraLetra(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// ~~~~~~~~~~~~~~~~~~~~~~ DICCIONARIOS DE TRADUCCIÓN Y ESTILO ~~~~~~~~~~~~~~~~~~~~~~
const diccionarioTipos = {
    normal: { nombre: "Normal", color: "bg-gray-400", base: "gray" },
    fire: { nombre: "Fuego", color: "bg-orange-500", base: "orange" },
    water: { nombre: "Agua", color: "bg-blue-500", base: "blue" },
    electric: { nombre: "Eléctrico", color: "bg-yellow-400", base: "yellow" },
    grass: { nombre: "Planta", color: "bg-green-500", base: "green" },
    ice: { nombre: "Hielo", color: "bg-cyan-300", base: "cyan" },
    fighting: { nombre: "Lucha", color: "bg-red-700", base: "red" },
    poison: { nombre: "Veneno", color: "bg-purple-500", base: "purple" },
    ground: { nombre: "Tierra", color: "bg-amber-600", base: "amber" },
    flying: { nombre: "Volador", color: "bg-indigo-300", base: "indigo" },
    psychic: { nombre: "Psíquico", color: "bg-pink-500", base: "pink" },
    bug: { nombre: "Bicho", color: "bg-lime-500", base: "lime" },
    rock: { nombre: "Roca", color: "bg-yellow-700", base: "yellow" },
    ghost: { nombre: "Fantasma", color: "bg-purple-700", base: "purple" },
    dragon: { nombre: "Dragón", color: "bg-indigo-600", base: "indigo" },
    dark: { nombre: "Siniestro", color: "bg-gray-700", base: "gray" },
    steel: { nombre: "Acero", color: "bg-gray-500", base: "gray" },
    fairy: { nombre: "Hada", color: "bg-pink-300", base: "pink" },
};

const diccionarioEstadisticas = {
    hp: { abrev: "HP", color: "bg-red-400" },
    attack: { abrev: "ATK", color: "bg-orange-400" },
    defense: { abrev: "DEF", color: "bg-yellow-400" },
    "special-attack": { abrev: "SP.ATK", color: "bg-blue-400" },
    "special-defense": { abrev: "SP.DEF", color: "bg-green-400" },
    speed: { abrev: "SPD", color: "bg-pink-400" },
};

function fondoTarjeta(tipos) {
    if (tipos.length === 1) {
        const base = diccionarioTipos[tipos[0]].base;
        return `bg-${base}-400`;
    }
    const base1 = diccionarioTipos[tipos[0]].base;
    const base2 = diccionarioTipos[tipos[1]].base;
    return `bg-gradient-to-br from-${base1}-400 to-${base2}-600`;
}

// ~~~~~~~~~~~~~~~~~~~~~~ TARJETAS (L3 - DOM) ~~~~~~~~~~~~~~~~~~~~~~
function renderizarPokemon(pokemon) {
    const { nombre, numero, tipo, imagen } = pokemon;
    const esFavorito = miPokedex.esFavorito(numero);
    const fondo = fondoTarjeta(tipo);

    const tarjeta = `
    <div class="border-4 border-black cursor-pointer relative" data-numero="${numero}">
      <button class="btn-favorito absolute top-2 right-2 text-2xl z-10 ${esFavorito ? "text-red-600" : "text-white"}" data-numero="${numero}">
        ${esFavorito ? "♥" : "♡"}
      </button>
      <div class="${fondo} p-4 relative flex items-center justify-center">
        <span class="absolute top-2 left-2 text-xs font-bold text-white">#${formatearNumero(numero)}</span>
        <img src="${imagen}" alt="${nombre}" class="w-32 h-32">
      </div>
      <div class="bg-white dark:bg-gray-800 p-3 text-center border-t-4 border-black">
        <h2 class="font-bold text-lg capitalize text-gray-900 dark:text-white">${nombre}</h2>
        <div class="flex justify-center gap-2 mt-2">
          ${tipo.map((t) => `<span class="${diccionarioTipos[t].color} text-white text-xs px-2 py-1 capitalize">${diccionarioTipos[t].nombre}</span>`).join("")}
        </div>
      </div>
    </div>
  `;

    contenedor.innerHTML += tarjeta;
}

// ~~~~~~~~~~~~~~~~~~~~~~ FILTRO POR TIPO ~~~~~~~~~~~~~~~~~~~~~~
function renderizarFiltroTipos() {
    const filtroTipos = document.querySelector("#filtro-tipos");

    const activoTodos = tipoFiltroActual === null ? "ring-4 ring-yellow-400" : "";
    const botonTodos = `<button class="btn-filtro-tipo bg-gray-300 dark:bg-gray-600 dark:text-white border-2 border-black px-3 py-1 text-xs font-bold ${activoTodos}" data-tipo="">TODOS</button>`;

    const botonesTipos = Object.entries(diccionarioTipos)
        .map(([clave, datos]) => {
            const activo = tipoFiltroActual === clave ? "ring-4 ring-yellow-400" : "";
            return `<button class="btn-filtro-tipo ${datos.color} text-white border-2 border-black px-3 py-1 text-xs font-bold ${activo}" data-tipo="${clave}">${datos.nombre.toUpperCase()}</button>`;
        })
        .join("");

    filtroTipos.innerHTML = botonTodos + botonesTipos;
}

document.querySelector("#filtro-tipos").addEventListener("click", function (event) {
    const boton = event.target.closest(".btn-filtro-tipo");
    if (!boton) return;

    const tipoSeleccionado = boton.dataset.tipo;
    tipoFiltroActual = tipoSeleccionado === "" ? null : tipoSeleccionado;

    renderizarFiltroTipos();
    aplicarFiltros();
});

// ~~~~~~~~~~~~~~~~~~~~~~ BÚSQUEDA + FILTRO + PAGINACIÓN ~~~~~~~~~~~~~~~~~~~~~~
// Trabajan sobre los 151 pokémon ya cargados en memoria, sin fetch adicionales.
function aplicarFiltros() {
    const textoBusqueda = buscador.value.toLowerCase();

    pokemonFiltrados = todosLosPokemon.filter((pokemon) => {
        const coincideNombre = pokemon.nombre.toLowerCase().includes(textoBusqueda);
        const coincideTipo = tipoFiltroActual === null || pokemon.tipo.includes(tipoFiltroActual);
        return coincideNombre && coincideTipo;
    });

    paginaActual = 1;
    renderizarPaginaActual();
}

function renderizarPaginaActual() {
    const indiceInicio = (paginaActual - 1) * tamanoPagina;
    const indiceFin = indiceInicio + tamanoPagina;
    const pokemonPagina = pokemonFiltrados.slice(indiceInicio, indiceFin);

    if (pokemonFiltrados.length === 0) {
        contenedor.innerHTML = `<p class="col-span-full text-center text-gray-400 py-8">No se encontraron pokémon.</p>`;
    } else {
        contenedor.innerHTML = "";
        pokemonPagina.forEach((pokemon) => renderizarPokemon(pokemon));
    }

    actualizarControlesPaginacion();
}

const buscador = document.querySelector("#buscador");
buscador.addEventListener("keyup", function () {
    aplicarFiltros();
});

const formulario = document.querySelector("#formulario-busqueda");
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
});

const botonAnterior = document.querySelector("#pagina-anterior");
const botonSiguiente = document.querySelector("#pagina-siguiente");
const textoPagina = document.querySelector("#pagina-actual-texto");

function actualizarControlesPaginacion() {
    const totalPaginas = Math.max(Math.ceil(pokemonFiltrados.length / tamanoPagina), 1);
    textoPagina.textContent = `Página ${paginaActual} de ${totalPaginas}`;
    botonAnterior.disabled = paginaActual === 1;
    botonSiguiente.disabled = paginaActual === totalPaginas;
}

function cambiarPagina(nuevaPagina) {
    paginaActual = nuevaPagina;
    renderizarPaginaActual();
}

botonAnterior.addEventListener("click", () => cambiarPagina(paginaActual - 1));
botonSiguiente.addEventListener("click", () => cambiarPagina(paginaActual + 1));

// ~~~~~~~~~~~~~~~~~~~~~~ MODAL DE DETALLE ~~~~~~~~~~~~~~~~~~~~~~
const modal = document.querySelector("#modal-detalle");
const botonCerrarModal = document.querySelector("#cerrar-modal");

/* Evita que datos de un pokémon anterior lleguen tarde y sobrescriban al pokémon que se está viendo ahora (condición de carrera entre fetch). */
let idModalActual = 0;

async function abrirModal(numero) {
    idModalActual++;
    const idPeticionActual = idModalActual;

    const numeroBuscado = Number(numero);
    const pokemon = todosLosPokemon.find((p) => p.numero === numeroBuscado);

    const fondoModal = fondoTarjeta(pokemon.tipo);
    const imagenContenedor = document.querySelector("#modal-imagen-contenedor");
    imagenContenedor.className = `h-40 flex items-center justify-center relative ${fondoModal}`;

    const imagenModal = document.querySelector("#modal-imagen");
    imagenModal.src = pokemon.imagen;
    imagenModal.alt = pokemon.nombre;

    const nombreModal = document.querySelector("#modal-nombre");
    nombreModal.textContent = pokemon.nombre;

    const numeroModal = document.querySelector("#modal-numero");
    numeroModal.textContent = `N°${formatearNumero(pokemon.numero)}`;

    const tiposModal = document.querySelector("#modal-tipos");
    tiposModal.innerHTML = pokemon.tipo
        .map((t) => `<span class="${diccionarioTipos[t].color} text-white text-xs px-2 py-1 capitalize">${diccionarioTipos[t].nombre}</span>`)
        .join("");

    const habilidadesModal = document.querySelector("#modal-habilidades");
    habilidadesModal.innerHTML = pokemon.habilidades
        .map((h) => `<span class="bg-gray-200 dark:bg-gray-700 border border-black dark:border-gray-500 text-gray-700 dark:text-gray-200 text-xs px-2 py-1 capitalize">${h}</span>`)
        .join("");

    const estadisticasModal = document.querySelector("#modal-estadisticas");
    estadisticasModal.innerHTML = pokemon.estadisticas
        .map((s) => {
            const stat = diccionarioEstadisticas[s.nombre];
            const porcentaje = Math.min((s.valor / 150) * 100, 100);
            return `
                <div class="flex items-center gap-2 text-xs mb-1">
                    <span class="w-14 text-gray-500 dark:text-gray-400">${stat.abrev}</span>
                    <div class="flex-1 bg-gray-200 dark:bg-gray-700 border border-black dark:border-gray-500 h-3">
                        <div class="${stat.color} h-full" style="width: ${porcentaje}%"></div>
                    </div>
                    <span class="w-6 text-right text-gray-900 dark:text-white">${s.valor}</span>
                </div>
            `;
        })
        .join("");

    const descripcionModal = document.querySelector("#modal-descripcion");
    const lineaEvolutivaModal = document.querySelector("#modal-linea-evolutiva");

    descripcionModal.textContent = "Cargando descripción...";
    lineaEvolutivaModal.innerHTML = "";

    modal.classList.remove("hidden");

    // Las tres peticiones viajan en paralelo con Promise.all.
    const [infoEspecie, resultadoEvolutivo, nombresHabilidades] = await Promise.all([
        obtenerInfoEspecie(pokemon.numero),
        obtenerLineaEvolutiva(pokemon.numero),
        obtenerHabilidadesTraducidas(pokemon.habilidadesUrls),
    ]);

    if (idPeticionActual !== idModalActual) return;

    descripcionModal.textContent = infoEspecie.descripcion;
    numeroModal.textContent = `N°${formatearNumero(pokemon.numero)}  ·  ${infoEspecie.categoria}`;

    habilidadesModal.innerHTML = nombresHabilidades
        .map((nombreTraducido, indice) => {
            const texto = nombreTraducido || pokemon.habilidades[indice];
            return `<span class="bg-gray-200 dark:bg-gray-700 border border-black dark:border-gray-500 text-gray-700 dark:text-gray-200 text-xs px-2 py-1 capitalize">${texto}</span>`;
        })
        .join("");

    lineaEvolutivaModal.innerHTML = resultadoEvolutivo.etapas
        .map((etapa, indice) => {
            const esUltima = indice === resultadoEvolutivo.etapas.length - 1;
            const esActual = etapa.numero === pokemon.numero;
            const nivel = resultadoEvolutivo.niveles[indice];

            const bordeEtapa = esActual ? "border-red-600" : "border-black";
            const nombreEtapa = esActual ? "text-red-600 font-bold" : "text-gray-900 dark:text-white";

            const flecha = esUltima
                ? ""
                : `<div class="flex flex-col items-center">
                     <span class="text-gray-400">▶</span>
                     ${nivel ? `<span class="text-[10px] text-gray-400">NV.${nivel}</span>` : ""}
                   </div>`;

            return `
                <div class="flex items-center gap-2">
                    <div class="flex flex-col items-center border-2 ${bordeEtapa} p-2 bg-white dark:bg-gray-800 w-28">
                        <img src="${etapa.imagen}" alt="${etapa.nombre}" class="w-14 h-14 object-contain">
                        <p class="text-xs text-center capitalize w-full break-words ${nombreEtapa}">${etapa.nombre}</p>
                    </div>
                    ${flecha}
                </div>
            `;
        })
        .join("");
}

function cerrarModal() {
    modal.classList.add("hidden");
}

botonCerrarModal.addEventListener("click", cerrarModal);

// ~~~~~~~~~~~~~~~~~~~~~~ CLICS EN TARJETAS (favoritos / abrir detalle) ~~~~~~~~~~~~~~~~~~~~~~
contenedor.addEventListener("click", function (event) {
    const botonFavorito = event.target.closest(".btn-favorito");

    if (botonFavorito) {
        const numero = Number(botonFavorito.dataset.numero);
        const pokemon = todosLosPokemon.find((p) => p.numero === numero);

        if (miPokedex.esFavorito(numero)) {
            miPokedex.quitarFavorito(numero);
            mostrarNotificacion(`${capitalizarPrimeraLetra(pokemon.nombre)} eliminado de favoritos`);
        } else {
            miPokedex.agregarFavorito(pokemon);
            mostrarNotificacion(`${capitalizarPrimeraLetra(pokemon.nombre)} añadido a favoritos`);
        }

        const esFavoritoAhora = miPokedex.esFavorito(numero);
        botonFavorito.textContent = esFavoritoAhora ? "♥" : "♡";
        botonFavorito.className = `btn-favorito absolute top-2 right-2 text-2xl z-10 ${esFavoritoAhora ? "text-red-600" : "text-white"}`;
        actualizarContadores();
        return;
    }

    const tarjetaClickeada = event.target.closest("[data-numero]");
    if (tarjetaClickeada) {
        const numeroSeleccionado = tarjetaClickeada.dataset.numero;
        abrirModal(numeroSeleccionado);
    }
});

contenedor.addEventListener("mouseover", function (event) {
    const tarjeta = event.target.closest("[data-numero]");
    if (tarjeta) {
        tarjeta.classList.add("ring-4", "ring-yellow-400");
    }
});

contenedor.addEventListener("mouseout", function (event) {
    const tarjeta = event.target.closest("[data-numero]");
    if (tarjeta) {
        tarjeta.classList.remove("ring-4", "ring-yellow-400");
    }
});

// ~~~~~~~~~~~~~~~~~~~~~~ DRAWER DE FAVORITOS ~~~~~~~~~~~~~~~~~~~~~~
const drawerFavoritos = document.querySelector("#drawer-favoritos");
const botonFavoritosNav = document.querySelector("#boton-favoritos");
const cerrarDrawerBtn = document.querySelector("#cerrar-drawer");
const listaFavoritosDrawer = document.querySelector("#lista-favoritos");
const drawerContador = document.querySelector("#drawer-contador");
const contadorFavoritosNav = document.querySelector("#contador-favoritos");

function actualizarContadores() {
    const total = miPokedex.obtenerFavoritos().length;
    contadorFavoritosNav.textContent = total;
    drawerContador.textContent = total;
}

function renderizarDrawer() {
    const favoritos = miPokedex.obtenerFavoritos();

    if (favoritos.length === 0) {
        listaFavoritosDrawer.innerHTML = `<p class="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">Pulsa ♥ en un pokémon para guardarlo</p>`;
        return;
    }

    listaFavoritosDrawer.innerHTML = favoritos
        .map((p) => `
            <div class="flex items-center gap-2 border-b-2 border-black dark:border-gray-600 py-2">
                <img src="${p.imagen}" alt="${p.nombre}" class="w-10 h-10">
                <div class="flex-1">
                    <p class="font-bold text-sm capitalize text-gray-900 dark:text-white">${p.nombre}</p>
                    <div class="flex gap-1">
                        ${p.tipo.map((t) => `<span class="${diccionarioTipos[t].color} text-white text-[10px] px-1">${diccionarioTipos[t].nombre}</span>`).join("")}
                    </div>
                </div>
                <button class="btn-quitar-favorito bg-red-600 text-white w-6 h-6 text-xs" data-numero="${p.numero}">✖</button>
            </div>
        `)
        .join("");
}

function abrirDrawer() {
    renderizarDrawer();
    drawerFavoritos.classList.remove("hidden");
}

function cerrarDrawer() {
    drawerFavoritos.classList.add("hidden");
}

botonFavoritosNav.addEventListener("click", abrirDrawer);
cerrarDrawerBtn.addEventListener("click", cerrarDrawer);

listaFavoritosDrawer.addEventListener("click", function (event) {
    const botonQuitar = event.target.closest(".btn-quitar-favorito");
    if (!botonQuitar) return;

    const numero = Number(botonQuitar.dataset.numero);
    miPokedex.quitarFavorito(numero);

    const corazonEnGrid = contenedor.querySelector(`[data-numero="${numero}"] .btn-favorito`);
    if (corazonEnGrid) {
        corazonEnGrid.textContent = "♡";
        corazonEnGrid.className = "btn-favorito absolute top-2 right-2 text-2xl z-10 text-white";
    }

    renderizarDrawer();
    actualizarContadores();
});

// ~~~~~~~~~~~~~~~~~~~~~~ NOTIFICACIÓN TEMPORAL ~~~~~~~~~~~~~~~~~~~~~~
const notificacion = document.querySelector("#notificacion");
let idNotificacion = null; // guarda el temporizador activo para poder cancelarlo

function mostrarNotificacion(mensaje) {
    notificacion.textContent = mensaje;
    notificacion.classList.remove("hidden");

    if (idNotificacion) {
        clearTimeout(idNotificacion);
    }

    idNotificacion = setTimeout(function () {
        notificacion.classList.add("hidden");
    }, 2000);
}

// ~~~~~~~~~~~~~~~~~~~~~~ MODO CLARO/OSCURO ~~~~~~~~~~~~~~~~~~~~~~
const botonTema = document.querySelector("#boton-tema");

function aplicarTemaGuardado() {
    const temaGuardado = localStorage.getItem("tema");
    if (temaGuardado === "dark") {
        document.documentElement.classList.add("dark");
        botonTema.textContent = "☀";
    }
}

botonTema.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark");
    const esOscuro = document.documentElement.classList.contains("dark");
    botonTema.textContent = esOscuro ? "☀" : "☾";
    localStorage.setItem("tema", esOscuro ? "dark" : "light");
});

aplicarTemaGuardado();

// ~~~~~~~~~~~~~~~~~~~~~~ CARGA INICIAL ~~~~~~~~~~~~~~~~~~~~~~
renderizarFiltroTipos();

contenedor.innerHTML = `<p class="col-span-full text-center text-gray-400 py-8">Cargando los 151 pokémon...</p>`;

const todosLosNombres = await obtenerListaNombres(151);
todosLosPokemon = await obtenerVariosPokemon(todosLosNombres);

aplicarFiltros();
actualizarContadores();
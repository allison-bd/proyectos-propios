// L4/L5 - Asincronía y consumo de API: todas las peticiones fetch del proyecto.
import { Pokemon } from "./models/Pokemon.js";

export async function obtenerPokemon(nombre) {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        const datos = await respuesta.json();
        const pokemonInstancia = new Pokemon(datos);
        return pokemonInstancia;
    } catch (error) {
        console.error("No se pudo obtener el pokémon:", error);
    }
}

// Usa Promise.all para pedir todos los pokémon en paralelo, no en fila.
export async function obtenerVariosPokemon(listaNombres) {
    const promesas = listaNombres.map((nombre) => obtenerPokemon(nombre));
    const resultado = await Promise.all(promesas);
    return resultado;
}

export async function obtenerListaNombres(limite) {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limite}`);
        const datos = await respuesta.json();
        return datos.results.map((p) => p.name);
    } catch (error) {
        console.error("No se pudo obtener la lista de nombres:", error);
        return [];
    }
}

export async function obtenerInfoEspecie(numero) {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${numero}`);
        const datos = await respuesta.json();

        const entradaEspanol = datos.flavor_text_entries.find(
            (entrada) => entrada.language.name === "es"
        );
        const descripcion = entradaEspanol.flavor_text.replace(/[\n\f\r]/g, " ");

        const generoEspanol = datos.genera.find(
            (genero) => genero.language.name === "es"
        );
        const categoria = generoEspanol.genus;

        return { descripcion, categoria };
    } catch (error) {
        console.error("No se pudo obtener la información de la especie:", error);
        return { descripcion: "", categoria: "" };
    }
}

export async function obtenerLineaEvolutiva(numero) {
    try {
        const respuestaEspecie = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${numero}`);
        const datosEspecie = await respuestaEspecie.json();

        const respuestaCadena = await fetch(datosEspecie.evolution_chain.url);
        const datosCadena = await respuestaCadena.json();

        const nombresCadena = [];
        const nivelesCadena = [];
        let etapaActual = datosCadena.chain;

        // La cadena viene anidada (cada etapa contiene a la siguiente);
        // se recorre hasta que ya no hay más evoluciones.
        while (etapaActual) {
            nombresCadena.push(etapaActual.species.name);

            const siguienteEtapa = etapaActual.evolves_to[0];
            if (siguienteEtapa) {
                const detalle = siguienteEtapa.evolution_details[0];
                const nivel = detalle && detalle.min_level ? detalle.min_level : null;
                nivelesCadena.push(nivel);
            }

            etapaActual = siguienteEtapa;
        }

        const etapas = await obtenerVariosPokemon(nombresCadena);
        return { etapas, niveles: nivelesCadena };
    } catch (error) {
        console.error("No se pudo obtener la línea evolutiva:", error);
        return { etapas: [], niveles: [] };
    }
}

export async function obtenerNombreHabilidad(url) {
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        const nombreEspanol = datos.names.find((n) => n.language.name === "es");
        return nombreEspanol ? nombreEspanol.name : null;
    } catch (error) {
        console.error("No se pudo traducir la habilidad:", error);
        return null;
    }
}

export async function obtenerHabilidadesTraducidas(urls) {
    const promesas = urls.map((url) => obtenerNombreHabilidad(url));
    return await Promise.all(promesas);
}
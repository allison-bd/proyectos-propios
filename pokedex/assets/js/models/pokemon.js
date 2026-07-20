// L1 - POO: modela un único pokémon a partir del JSON de la PokeAPI.
export class Pokemon {
    constructor(pokemon) {
        this.nombre = pokemon.name;
        this.numero = pokemon.id;
        this.altura = pokemon.height;
        this.peso = pokemon.weight;

        // types/abilities/stats llegan como arreglos de objetos anidados;
        // se simplifican a arreglos planos.
        this.tipo = pokemon.types.map((t) => t.type.name);
        this.imagen = pokemon.sprites.front_default;
        this.habilidades = pokemon.abilities.map((a) => a.ability.name);
        this.habilidadesUrls = pokemon.abilities.map((a) => a.ability.url);
        this.estadisticas = pokemon.stats.map((s) => ({
            nombre: s.stat.name,
            valor: s.base_stat,
        }));

        this.descripcion = null;
        this.lineaEvolutiva = null;
    }
}
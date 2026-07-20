// L1 - POO: administra la colección de pokémon favoritos.
export class Pokedex {
    #favoritos = [];

    constructor() {
        const favoritosGuardados = localStorage.getItem("favoritos");
        if (favoritosGuardados) {
            this.#favoritos = JSON.parse(favoritosGuardados);
        }
    }

    #guardarEnLocalStorage() {
        localStorage.setItem("favoritos", JSON.stringify(this.#favoritos));
    }

    agregarFavorito(pokemon) {
        const yaExiste = this.esFavorito(pokemon.numero);
        if (!yaExiste) {
            this.#favoritos.push(pokemon);
            this.#guardarEnLocalStorage();
        }
    }

    quitarFavorito(numero) {
        this.#favoritos = this.#favoritos.filter((p) => p.numero !== numero);
        this.#guardarEnLocalStorage();
    }

    esFavorito(numero) {
        return this.#favoritos.some((p) => p.numero === numero);
    }

    obtenerFavoritos() {
        return this.#favoritos;
    }
}
import { PokemonResumo } from "../models/Pokemon";

export class CatalogoPokemon {
    private cache:Map<number, PokemonResumo> = new Map<number, PokemonResumo>;

    adicionaPokemon(pokemon:PokemonResumo) {
        if(!this.cache.has(pokemon.id)) {
            this.cache.set(pokemon.id, pokemon);
        }
    }
    
}
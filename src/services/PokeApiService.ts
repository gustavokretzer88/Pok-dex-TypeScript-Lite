// camada responsável pela integração externa
import {
    PokemonApiResponse,
    PokemonResumo,
    PokeAPIparaPokemonResumo
} from "../models/Pokemon";

export class PokeApiService {

    async buscarPokemon(
        nomeOuId: string
    ): Promise<PokemonResumo> {
        var urlPokeAPI = "https://pokeapi.co/api/v2/pokemon/" + nomeOuId;
        try {
            const resposta = await fetch(urlPokeAPI);
            if(!resposta.ok) {
                throw new Error("[ERRO] Pokémon não encontrado. " + nomeOuId + " - " + resposta.statusText);
            }
            return PokeAPIparaPokemonResumo(await resposta.json());
        }
        catch(erro) {
            throw new Error("[ERRO] Não foi possível buscar o Pokémon. ");
        }
    }

}
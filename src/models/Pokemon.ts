// RF02 - Pokémon simplificado
export interface PokemonResumo {
    id: number;
    nome: string;
    tipos: string[];
    altura: number;
    peso: number;
}

// RF03 - Estrutura dos dados recebidos da PokeAPI
export interface PokemonApiResponse {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: {
        type: {
            name: string;
        };
    }[];
}

export function PokeAPIparaPokemonResumo(apiPokemon: PokemonApiResponse): PokemonResumo {
  return {
    id: apiPokemon.id,
    nome: apiPokemon.name,
    tipos: apiPokemon.types.map(item => item.type.name),
    altura: apiPokemon.height,
    peso: apiPokemon.weight,
  };
}
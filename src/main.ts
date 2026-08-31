
import { PokemonResumo } from "./models/Pokemon";
import { PokeApiService } from "./services/PokeApiService";

let pokeApiService = new PokeApiService();

let pokemonNames: string[] = ["bulbasaur", "charizard", "butterfree", "notAPokemon"]

let catalogo: PokemonResumo[] = [];

function pokemonCatalogado(nome: string) : boolean {
    return catalogo.find((element) => element.nome === nome) !== undefined;
}

function pokemonCatalogadoId(id: number) {
    return catalogo.find((element) => element.id === id) !== undefined;
}

async function adicionaPokemonCatalogo(nomePokemon: string) : Promise<PokemonResumo | null> {
    if(pokemonCatalogado(nomePokemon)) {
        console.log("[AVISO] ${nomePokemon} já está no catálogo.");
        return null; // já está no catalogo
    }
    try {
        const result = await pokeApiService.buscarPokemon(nomePokemon);
        catalogo.push(result);
        console.log(`[OK] ${nomePokemon} adicionado ao catálogo.`);
        return result;
    } catch {
        console.log(`[ERRO] Erro ao buscar o Pokémon: ${nomePokemon}`);
        return null;
    }

    return null;
}

async function obtemPokemon(nomePokemon: string) : Promise<PokemonResumo | null> {
    var pokemon = catalogo.find((element) => element.nome === nomePokemon)
    if(pokemon !== undefined) {
        console.log("[OK] Obtido pokem ${nomePokemon} da cache.");
        return pokemon;
    }
    console.log(`[INFO] Pokemon ${nomePokemon} não disponível em cache`);
    return adicionaPokemonCatalogo(nomePokemon);

}

function listarPokemons() {
    console.log(`Listando ${catalogo.length} pokemons:`)
    catalogo.forEach((pokemon) => {
        console.log(`#${pokemon.id} | ${pokemon.nome} | Tipos: ${pokemon.tipos.join(", ")} | Peso: ${pokemon.peso} | Altura: ${pokemon.altura}`);
    })
}

function removePokemonPorId(id: number) {
    const indexPoke = catalogo.findIndex((poke) => poke.id === id);
    if(indexPoke === -1) {
        console.log(`[ERRO] Pokemon #${id} não encontrado`)
        return;
    }
    catalogo.splice(indexPoke, 1);
    console.log(`[OK] Pokemon #${id} removido do catalogo`);
}

function removePokemon(nome: string) {
    const indexPoke = catalogo.findIndex((poke) => poke.nome === nome);
    if(indexPoke === -1) {
        console.log(`[ERRO] Pokemon ${nome} não encontrado`)
        return;
    }
    catalogo.splice(indexPoke, 1);
    console.log(`[OK] Pokemon ${nome} removido do catalogo`);
}

async function preencheCatalogo() : Promise<void>  {
    await Promise.all(
        pokemonNames.map(nome => adicionaPokemonCatalogo(nome))
    );
}

async function main() {
    await preencheCatalogo();
    listarPokemons();    
    removePokemon("butterfree");
    removePokemonPorId(1);
    listarPokemons();
    var pok = obtemPokemon("charizard");
    pok.then((item) => {
        console.log(item?.nome);
    })
    var poke = obtemPokemon("caterpie");
    
    
}

main().catch(console.error);




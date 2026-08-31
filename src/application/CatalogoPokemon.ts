import { PokemonResumo } from "../models/Pokemon";
import { PokeApiService } from "../services/PokeApiService";



export class CatalogoDePokemon {


    private catalogo: PokemonResumo[] = [];

    CatalogoDePokemon() {
    }

    pokemonCatalogado(nome: string) : boolean {
        return this.catalogo.find((element) => element.nome === nome) !== undefined;
    }

    pokemonCatalogadoId(id: number) {
        return this.catalogo.find((element) => element.id === id) !== undefined;
    }



    async  adicionaPokemonCatalogo(nomePokemon: string) : Promise<PokemonResumo | null> {
        if(this.pokemonCatalogado(nomePokemon)) {
            console.log("[AVISO] ${nomePokemon} já está no catálogo.");
            return null; // já está no catalogo
        }
        try {
            let pokeApiService = new PokeApiService();
            const result = await pokeApiService.buscarPokemon(nomePokemon);
            this.catalogo.push(result);
            console.log(`[OK] ${nomePokemon} adicionado ao catálogo.`);
            return result;
        } catch {
            console.log(`[ERRO] Erro ao buscar o Pokémon: ${nomePokemon}`);
            return null;
        }

        return null;
    }

    async obtemPokemon(nomePokemon: string) : Promise<PokemonResumo | null> {
        var pokemon = this.catalogo.find((element) => element.nome === nomePokemon)
        if(pokemon !== undefined) {
            console.log("[OK] Obtido pokemon ${nomePokemon} da cache.");
            return pokemon;
        }
        console.log(`[INFO] Pokemon ${nomePokemon} não disponível em cache`);
        return this.adicionaPokemonCatalogo(nomePokemon);

    }

    listarPokemons() {
        console.log(`Listando ${this.catalogo.length} pokemons:`)
        this.catalogo.forEach((pokemon) => {
            console.log(`#${pokemon.id} | ${pokemon.nome}`);
        })
    }

     removePokemonPorId(id: number) {
        const indexPoke = this.catalogo.findIndex((poke) => poke.id === id);
        if(indexPoke === -1) {
            console.log(`[ERRO] Pokemon #${id} não encontrado`)
            return;
        }
        this.catalogo.splice(indexPoke, 1);
        console.log(`[OK] Pokemon #${id} removido do catalogo`);
    }

    removePokemon(nome: string) {
        const indexPoke = this.catalogo.findIndex((poke) => poke.nome === nome);
        if(indexPoke === -1) {
            console.log(`[ERRO] Pokemon ${nome} não encontrado`)
            return;
        }
        this.catalogo.splice(indexPoke, 1);
        console.log(`[OK] Pokemon ${nome} removido do catalogo`);
    }

    async preencheCatalogo() : Promise<void>  {
        let pokemonNames: string[] = ["bulbasaur", "ivysaur", "venusaur","charmander","charmeleon","charizard","squirtle","wartortle","blastoise","caterpie"];
        await Promise.all(
            pokemonNames.map(nome => this.adicionaPokemonCatalogo(nome))
        );
    }
}


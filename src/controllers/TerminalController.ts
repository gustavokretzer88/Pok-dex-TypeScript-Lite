import { readFileSync } from "node:fs";
import { join } from "node:path";

import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { CatalogoDePokemon } from "../application/CatalogoPokemon";
import { PokemonResumo } from "../models/Pokemon";

//const terminal = readline.createInterface({ input, output });

function imprimeInfoPokemon(pokemon: PokemonResumo) {
  console.log(
    `Número: ${pokemon.id}\nNome: ${pokemon.nome}\nTipos: ${pokemon.tipos.join(", ")}\nPeso: ${pokemon.peso}\nAltura: ${pokemon.altura}`,
  );
}

export class TerminalController {
  private catalogo: CatalogoDePokemon;

  constructor(catalogo: CatalogoDePokemon) {
    this.catalogo = catalogo;
  }

static imprimeAsciiArt(arquivoArte: string) {
    const caminhoArte = join(process.cwd(), "assets", arquivoArte);
    const asciiart = readFileSync(caminhoArte, "utf-8");
    console.log(asciiart);
}

  static mostrarBoasVindas(): void {
    console.clear();
    console.log("╔══════════════════════════════════════════════════╗");
    console.log("║               BEM-VINDO À POKÉDEX                ║");
    console.log("╚══════════════════════════════════════════════════╝");
    TerminalController.imprimeAsciiArt("asciiart_charizard.txt");
  }

  static agradecimentoSaida(): void {
    TerminalController.imprimeAsciiArt("asciiart_pikachu.txt");
    console.log("Obrigado por usar o PokeDex! Até mais!");
  }

  comandoListar() {
    this.catalogo.listarPokemons();
  }

  async comandoBuscar(nomeOuId: string | undefined) {
    if (!nomeOuId) {
      console.log("Informe o nome ou id do Pokémon.");
      return;
    }
    try {
      const id = Number(nomeOuId.trim());
      var pokemonPromisse = await this.catalogo.obtemPokemon(nomeOuId); 
      if (pokemonPromisse != null) imprimeInfoPokemon(pokemonPromisse);
    } catch (err) {
      console.log(`Erro ao obter pokemon: ${err}`);
    }
  }

  async comandoRemover(nomeOuId: string | undefined) {
    if (!nomeOuId) {
      console.log("Informe o nome ou id do Pokémon.");
      return;
    }
    this.catalogo.removePokemon(nomeOuId);
  }

  async comandoPreencherValores() {
    await this.catalogo.preencheCatalogo();
  }

  comandoAjuda() {
    console.log(
      "Manual de uso da PokeDex:\n\
Comando:             | Descrição:                                                | Exemplo de uso:\n\
--------------------------------------------------------------------------------------------------\n\
listar               | Lista os Pokémon armazenados na cache local.              | listar\n\
buscar <nome ou ID>  | Consulta um Pokémon; usa a cache quando disponível.       | buscar pikachu\n\
remover<nome ou ID>  | Remove um Pokémon da cache local pelo nome ou ID.         | remover pikachu\n\
preencher            | Busca lista de Pokémons pré-definidos.                    | preencher\n\
ajuda                | Exibe instruções de uso da PokeDex                        | ajuda\n\
sair                 | Encerra a PokeDex persistindo em disco Pokémons em cache. | sair",
    );
  }

  async iniciarMenu(): Promise<void> {
    const terminal = readline.createInterface({ input, output });

    let executando = true;
    do {
      const comando = await terminal.question(
        "\nComando [listar | buscar <nome ou id> | remover <nome ou id> | preencher | sair | ajuda]: \n> ",
      );

      const [acao, valor] = comando.trim().toLowerCase().split(" ");

      switch (acao) {
        case "listar":
          this.comandoListar();
          break;
        case "buscar":
          await this.comandoBuscar(valor);
          break;
        case "remover":
          await this.comandoRemover(valor);
          break;
        case "preencher":
          await this.comandoPreencherValores();
          break;
        case "sair":
          TerminalController.agradecimentoSaida();
          executando = false;
          break;
        case "ajuda":
          this.comandoAjuda();
          break;
        default:
          console.log("Comando inválido.");
      }

    } while (executando);

    terminal.close();
  }
}

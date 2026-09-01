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

  static mostrarBoasVindas(): void {
    const caminhoArte = join(process.cwd(), "assets", "asciiart_charizard.txt");
    console.log(caminhoArte);
    const asciiart = readFileSync(caminhoArte, "utf-8");

    console.clear();
    console.log("╔══════════════════════════════════════════════════╗");
    console.log("║               BEM-VINDO À POKÉDEX                ║");
    console.log("╚══════════════════════════════════════════════════╝");
    console.log(asciiart);
  }

  async iniciarMenu(): Promise<void> {
    const terminal = readline.createInterface({ input, output });

    let executando = true;
    do {
      const comando = await terminal.question(
        "\nComando [listar | buscar <nome> | remover <nome> | removerid <id> | preencher | sair]: \n> ",
      );
      console.log("\n");

      const [acao, valor] = comando.trim().toLowerCase().split(" ");

      switch (acao) {
        case "listar":
          this.catalogo.listarPokemons();
          break;

        case "buscar":
          if (!valor) {
            console.log("Informe o nome do Pokémon.");
            break;
          }
          try {
            var pokemonPromisse = await this.catalogo.obtemPokemon(valor);
            if (pokemonPromisse != null) imprimeInfoPokemon(pokemonPromisse);
          } catch (err) {
            console.log("Erro ao obter pokemon: " + err);
          }
          break;

        case "buscarid":
          // TODO: IMPLEMENTAR....
          console.log("[ERRO] Função não implementada");
          break;
        case "remover":
          if (!valor) {
            console.log("Informe o nome do Pokémon.");
            break;
          }
          this.catalogo.removePokemon(valor);
          break;
        case "removerid":
          if (!valor) {
            console.log("Informe o nome do Pokémon.");
            break;
          }
          const id = Number(valor.trim());
          if (Number.isNaN(id)) {
            console.log("Digite um número válido.");
          }
          this.catalogo.removePokemonPorId(id);
          break;

        case "preencher":
          await this.catalogo.preencheCatalogo();
          break;
        case "sair":
          executando = false;
          console.log("Obrigado por usar o PokeDex!\nAté mais!");
          break;

        default:
          console.log("Comando inválido.");
      }

      console.log("\n");
    } while (executando);

    terminal.close();
  }
}

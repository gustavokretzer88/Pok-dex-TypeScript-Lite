
import { CatalogoDePokemon } from "./application/CatalogoPokemon";
import { TerminalController } from "./controllers/TerminalController";
import { PokemonResumo } from "./models/Pokemon";
import { BoxService } from "./services/BoxService";


async function main(): Promise<void> {  
  TerminalController.mostrarBoasVindas();

    
  var persistencia: BoxService = new BoxService();
  var pokDoBD: PokemonResumo[] = await persistencia.carregar();
  var catalogo: CatalogoDePokemon = new CatalogoDePokemon(pokDoBD);
  var terminal: TerminalController = new TerminalController(catalogo);

  terminal.iniciarMenu().then(() => {
    persistencia.salvar(catalogo.getCatalogo());
  }).catch((error) => {
    console.log(`[ERRO]: ${error}`);
  });

}

main().catch(console.error);
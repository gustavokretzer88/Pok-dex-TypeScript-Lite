
import { TerminalController } from "./controllers/TerminalController";


async function main(): Promise<void> {
   
  var terminal: TerminalController = new TerminalController();
  terminal.mostrarBoasVindas();
  terminal.iniciarMenu();  
}

main().catch(console.error);
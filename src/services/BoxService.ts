import { readFile, writeFile } from "node:fs/promises";
import { PokemonResumo } from "../models/Pokemon.js";

export class BoxService {
    private readonly caminhoArquivo = "pc_box.json";

    async carregar(): Promise<PokemonResumo[]> {
        try {
            const conteudo = await readFile(this.caminhoArquivo, "utf-8");

            const pokemons: PokemonResumo[] = JSON.parse(conteudo);

            return pokemons;
        } catch (erro) {
            console.error("[ERRO] Não foi possível carregar o pc_box.json.");
            return [];
        }
    }

    async salvar(pokemons: PokemonResumo[]): Promise<void> {
        try {
            const conteudo = JSON.stringify(pokemons, null, 2);

            await writeFile(
                this.caminhoArquivo,
                conteudo,
                "utf-8"
            );

            console.log("[OK] Catálogo salvo.");
        } catch (erro) {
            console.error("[ERRO] Não foi possível salvar o pc_box.json.");
        }
    }
}
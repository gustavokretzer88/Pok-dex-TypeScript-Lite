# Pokédex TypeScript Lite

Uma aplicação de linha de comando (CLI) em TypeScript que consulta Pokémon na [PokéAPI](https://pokeapi.co/) e mantém um catálogo em memória enquanto a sessão está ativa.

> Projeto educacional para praticar Node.js, TypeScript, APIs REST, programação assíncrona e organização em camadas.

## Objetivo

Permitir a consulta de dados resumidos de Pokémon — número, nome, tipos, altura e peso — pelo terminal. Cada Pokémon consultado é colocado em uma cache local, que pode ser listada e alterada durante a execução.

## Funcionalidades

- Tela de boas-vindas com arte ASCII.
- Busca de Pokémon por nome na PokéAPI.
- Conversão da resposta da API para o modelo interno `PokemonResumo`.
- Cache em memória que evita inclusões duplicadas.
- Listagem dos Pokémon catalogados.
- Remoção por nome ou número da Pokédex.
- Preenchimento em paralelo com uma lista predefinida de Pokémon.
- Mensagens para erros de consulta e comandos inválidos.

## Tecnologias

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [`tsx`](https://tsx.is/) para desenvolvimento
- `fetch` e `readline`, módulos nativos do Node.js
- [PokéAPI v2](https://pokeapi.co/docs/v2)

## Pré-requisitos

- Node.js 18 ou superior
- npm
- Acesso à internet para consultar a PokéAPI

## Instalação

```bash
git clone https://github.com/gustavokretzer88/Pok-dex-TypeScript-Lite.git
cd Pok-dex-TypeScript-Lite
npm install
```

## Execução

Modo de desenvolvimento:

```bash
npm run dev
```

## Comandos disponíveis

| Comando | Descrição | Exemplo |
| --- | --- | --- |
| `listar` | Lista os Pokémon na cache. | `listar` |
| `buscar <nome>` | Consulta um Pokémon; usa a cache quando disponível. | `buscar pikachu` |
| `remover <nome>` | Remove um Pokémon pelo nome. | `remover pikachu` |
| `removerid <id>` | Remove um Pokémon pelo número. | `removerid 25` |
| `preencher` | Busca uma lista de Pokémons predefinidos. | `preencher` |
| `sair` | Encerra a aplicação. | `sair` |

## Exemplo de uso

```text
> buscar pikachu
[OK] pikachu adicionado ao catálogo.
Número: 25
Nome: pikachu
Tipos: electric
Peso: 60
Altura: 4

> listar
Listando 1 pokemons:
#25 | pikachu

> removerid 25
[OK] Pokemon #25 removido do catalogo
```

## Estrutura do projeto

```text
src/
├── application/CatalogoPokemon.ts     # Cache e regras do catálogo
├── controllers/TerminalController.ts  # Menu do terminal
├── models/Pokemon.ts                  # Interfaces e mapeamento da API
├── services/PokeApiService.ts         # Integração com a PokéAPI
└── main.ts                            # Ponto de entrada
assets/asciiart_charizard.txt          # Arte da abertura
```

## Fluxo dos dados

```text
Terminal → CatalogoDePokemon → PokeApiService → PokéAPI
                ↓
     cache em memória (PokemonResumo[])
```

O mapeamento converte a estrutura recebida da API para o modelo da aplicação:

```ts
{
  id: 25,
  nome: "pikachu",
  tipos: ["electric"],
  altura: 4,
  peso: 60,
}
```

## Kanban do projeto

| Etapa | Status |
| --- | --- |
| Estrutura inicial | Concluído |
| Integração com PokéAPI | Concluído |
| Mapeamento para `PokemonResumo` | Concluído |
| Cache em memória | Concluído |
| Menu interativo | Concluído |
| Documentação | Concluído |
| Testes automatizados | Pendente |

## Links

- [Repositório no GitHub](https://github.com/gustavokretzer88/Pok-dex-TypeScript-Lite)
- [PokéAPI](https://pokeapi.co/)
- [Documentação da PokéAPI v2](https://pokeapi.co/docs/v2)
- [Endpoint de exemplo: Pikachu](https://pokeapi.co/api/v2/pokemon/pikachu)

## Observações

O catálogo é temporário: os itens em cache são perdidos ao encerrar a aplicação.

---

Projeto para fins educacionais. Pokémon é uma marca registrada de seus respectivos proprietários; esta aplicação não possui afiliação oficial com a franquia.

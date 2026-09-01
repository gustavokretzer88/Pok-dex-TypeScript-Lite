# Pokédex TypeScript Lite

Uma aplicação de linha de comando (CLI) desenvolvida em **TypeScript** que consulta dados de Pokémon na **PokéAPI** e mantém um catálogo local de Pokémon com persistência em arquivo JSON.

> Projeto educacional para praticar Node.js, TypeScript, APIs REST, programação assíncrona, orientação a objetos, organização em camadas e persistência de dados.

## Objetivo

Permitir a consulta de dados resumidos de Pokémon — número, nome, tipos, altura e peso — pelo terminal.

Os Pokémon consultados são armazenados no catálogo da aplicação. O catálogo é carregado do arquivo `pc_box.json` ao iniciar a aplicação e pode ser salvo novamente durante a execução.

## Funcionalidades

* Tela de boas-vindas com arte ASCII.
* Busca de Pokémon por nome na PokéAPI.
* Conversão da resposta da API para o modelo interno `PokemonResumo`.
* Catálogo de Pokémon mantido em memória durante a execução.
* Carregamento do catálogo a partir do arquivo `pc_box.json`.
* Persistência do catálogo em `pc_box.json`.
* Prevenção de inclusões duplicadas.
* Listagem dos Pokémon catalogados.
* Remoção por nome ou número da Pokédex.
* Preenchimento em paralelo com uma lista predefinida de Pokémon.
* Mensagens para erros de consulta e comandos inválidos.

## Tecnologias

* **Node.js** — ambiente de execução.
* **TypeScript** — linguagem principal.
* **tsx** — execução do TypeScript durante o desenvolvimento.
* **Node.js `fetch`** — comunicação com a PokéAPI.
* **Node.js `readline`** — interação com o terminal.
* **Node.js `fs/promises`** — leitura e escrita do arquivo de persistência.
* **PokéAPI v2** — fonte dos dados dos Pokémon.

## Pré-requisitos

* Node.js 18 ou superior.
* npm.
* Acesso à internet para consultar a PokéAPI.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/gustavokretzer88/Pok-dex-TypeScript-Lite.git
```

Entre no diretório:

```bash
cd Pok-dex-TypeScript-Lite
```

Instale as dependências:

```bash
npm install
```

## Execução

### Modo de desenvolvimento

```bash
npm run dev
```

### Compilação

Para compilar o projeto TypeScript:

```bash
npm run build
```

Os arquivos JavaScript gerados são direcionados para a pasta `dist/`.

### Execução da versão compilada

```bash
npm start
```

O fluxo de execução da versão compilada é:

```text
src/*.ts
   │
   │ npm run build
   ▼
dist/*.js
   │
   │ npm start
   ▼
Node.js
```

## Persistência

O catálogo é persistido no arquivo:

```text
pc_box.json
```

O arquivo utiliza JSON para armazenar os objetos `PokemonResumo`.

Inicialmente, o arquivo pode estar vazio:

```json
[]
```

Durante a execução, os Pokémon catalogados podem ser armazenados, por exemplo:

```json
[
  {
    "id": 25,
    "nome": "pikachu",
    "tipos": [
      "electric"
    ],
    "altura": 4,
    "peso": 60
  }
]
```

A classe `BoxService` é responsável pela persistência:

```text
BoxService
    │
    ├── carregar()
    │      ↓
    │   pc_box.json
    │
    └── salvar()
           ↓
       pc_box.json
```

A implementação utiliza `readFile` e `writeFile` do módulo `node:fs/promises`.

## Comandos disponíveis

| Comando                | Descrição                                                      | Exemplo           |
| ---------------------- | -------------------------------------------------------------- | ----------------- |
| `listar`               | Lista os Pokémon presentes no catálogo                         | `listar`          |
| `buscar <nome ou ID>`  | Consulta um Pokémon e o adiciona ao catálogo quando necessário | `buscar pikachu`  |
| `remover <nome ou ID>` | Remove um Pokémon pelo nome ou ID                              | `remover pikachu` |
| `preencher`            | Busca uma lista predefinida de Pokémon                         | `preencher`       |
| `ajuda`                | Exibe instruções de uso da PokeDex                             | `ajuda`           |
| `sair`                 |  Encerra a PokeDex persistindo em disco Pokémons em cache.     | `sair`            |

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
Pok-dex-TypeScript-Lite/
│
├── assets/
│   └── asciiart_charizard.txt
│
├── src/
│   ├── application/
│   │   └── CatalogoPokemon.ts
│   │
│   ├── controllers/
│   │   └── TerminalController.ts
│   │
│   ├── models/
│   │   └── Pokemon.ts
│   │
│   ├── services/
│   │   ├── BoxService.ts
│   │   └── PokeApiService.ts
│   │
│   └── main.ts
│
├── pc_box.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── .gitignore
```

### Responsabilidade dos principais componentes

| Arquivo                             | Responsabilidade                                            |
| ----------------------------------- | ----------------------------------------------------------- |
| `models/Pokemon.ts`                 | Define as interfaces e os modelos relacionados aos Pokémon  |
| `services/PokeApiService.ts`        | Realiza a integração com a PokéAPI                          |
| `services/BoxService.ts`            | Realiza a leitura e a gravação do catálogo em `pc_box.json` |
| `application/CatalogoPokemon.ts`    | Mantém o catálogo e implementa suas regras de operação      |
| `controllers/TerminalController.ts` | Controla a interação com o usuário pelo terminal            |
| `main.ts`                           | Inicializa e integra os componentes da aplicação            |
| `pc_box.json`                       | Arquivo utilizado para persistência do catálogo             |

## Fluxo dos dados

O fluxo principal da aplicação é:

```text
                 ┌──────────────┐
                 │   Terminal   │
                 └──────┬───────┘
                        │
                        ▼
              ┌───────────────────┐
              │ TerminalController│
              └─────────┬─────────┘
                        │
                        ▼
              ┌───────────────────┐
              │ CatalogoPokemon   │
              └──────┬───────┬────┘
                     │       │
          consulta   │       │ persistência
                     │       │
                     ▼       ▼
             ┌────────────┐ ┌─────────────┐
             │PokeApiService│ │ BoxService │
             └──────┬─────┘ └──────┬──────┘
                    │              │
                    ▼              ▼
                PokéAPI        pc_box.json
```

### Modelo `PokemonResumo`

A resposta da PokéAPI é convertida para um modelo simplificado utilizado pela aplicação:

```typescript
{
  id: 25,
  nome: "pikachu",
  tipos: ["electric"],
  altura: 4,
  peso: 60
}
```

Esse modelo evita que as demais partes da aplicação dependam diretamente da estrutura completa retornada pela PokéAPI.

## Kanban do projeto

| Etapa                           | Status         |
| ------------------------------- | -------------- |
| Estrutura inicial               | Concluído      |
| Integração com PokéAPI          | Concluído      |
| Mapeamento para `PokemonResumo` | Concluído      |
| Catálogo em memória             | Concluído      |
| Menu interativo                 | Concluído      |
| Persistência em `pc_box.json`   | Concluído      |
| `BoxService`                    | Concluído      |
| Documentação                    | Em atualização |
| Testes automatizados            | Pendente       |

## Links

* [Repositório no GitHub](https://github.com/gustavokretzer88/Pok-dex-TypeScript-Lite)
* [PokéAPI](https://pokeapi.co/)
* [Documentação da PokéAPI](https://pokeapi.co/docs/v2)
* [Endpoint de exemplo — Pikachu](https://pokeapi.co/api/v2/pokemon/pikachu)

## Observações

O projeto utiliza `pc_box.json` como mecanismo simples de persistência local. O arquivo contém os dados do catálogo em formato JSON.

O projeto possui finalidade educacional e não possui afiliação oficial com a franquia Pokémon.
